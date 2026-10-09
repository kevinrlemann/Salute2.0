// =====================================================================
// Tradução entre o formato da Anthropic, que o front da Renata usa, e o
// Groq (endpoint compatível com OpenAI). O front não muda: o pedido chega no
// formato do Claude e a resposta volta nos mesmos eventos do Claude.
// =====================================================================

export const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
// em ordem de preferência; o próximo entra quando o anterior bate no limite do plano grátis.
// Cada modelo tem o próprio limite por minuto, então a troca soma a capacidade dos três.
export const GROQ_MODELOS = ['openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'qwen/qwen3.8-27b'];
// ajustes por modelo: menos "raciocínio" gasta menos tokens e responde mais rápido
const EXTRAS: Record<string, Record<string, unknown>> = {
  'openai/gpt-oss-120b': { reasoning_effort: 'low' },
  'openai/gpt-oss-20b': { reasoning_effort: 'low' },
  'qwen/qwen3.8-27b': { reasoning_effort: 'none' },
};

// o plano grátis do Groq aceita ~8 mil tokens por minuto em cada modelo (pedido + resposta).
// O resumo da clínica é cortado nesse tamanho; o resto a Renata consulta pelas ferramentas.
export const MAX_SISTEMA = 7000, MAX_DESC_FERRAMENTA = 200, MAX_DESC_CAMPO = 80, MAX_RESPOSTA = 1000;
// espera máxima (segundos) quando os três modelos estão no limite por minuto
export const MAX_ESPERA = 20;
// só o código do erro do provedor vai para os registros (nada do conteúdo do pedido ou da resposta)
export const codigoErro = (txt: string) => {
  try {
    const e = JSON.parse(txt);
    const x = e && (e.error || e.detail || e);
    return String((x && (x.code || x.type || x.status)) || 'sem_codigo').slice(0, 60);
  } catch (_) { return 'sem_codigo'; }
};
const corta = (t: string, n: number) => (t.length > n ? t.slice(0, n - 1) + '…' : t);

type Bloco = { type?: string; text?: string; id?: string; name?: string; input?: unknown; tool_use_id?: string; content?: unknown };
type Mensagem = { role: string; content: unknown };
type Ferramenta = { name: string; description?: string; input_schema?: unknown };

// só a parte do JSON Schema que todos os modelos aceitam nas ferramentas
const CAMPOS_SCHEMA = new Set(['type', 'description', 'properties', 'required', 'items', 'enum', 'format', 'nullable',
  'minimum', 'maximum', 'minItems', 'maxItems', 'anyOf']);

export function limparSchema(s: unknown): unknown {
  if (Array.isArray(s)) return s.map(limparSchema);
  if (!s || typeof s !== 'object') return s;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(s as Record<string, unknown>)) {
    if (!CAMPOS_SCHEMA.has(k)) continue;
    if (k === 'properties' && v && typeof v === 'object') {
      out[k] = Object.fromEntries(Object.entries(v as Record<string, unknown>).map(([n, p]) => [n, limparSchema(p)]));
    } else if (k === 'type' && Array.isArray(v)) {
      // ["string","null"] vira type string + nullable
      const tipos = v.filter((t) => t !== 'null');
      out.type = tipos[0] || 'string';
      if (tipos.length < v.length) out.nullable = true;
    } else if (k === 'description' && typeof v === 'string') {
      out[k] = corta(v, MAX_DESC_CAMPO);
    } else {
      out[k] = k === 'items' || k === 'anyOf' ? limparSchema(v) : v;
    }
  }
  return out;
}

const textoDe = (c: unknown): string =>
  typeof c === 'string' ? c
    : Array.isArray(c) ? c.map((b) => (b && (b as Bloco).type === 'text' ? (b as Bloco).text || '' : '')).join('\n')
      : '';

// pedido no formato Anthropic → corpo do Groq (sem o modelo, escolhido na chamada)
export function paraGroq(p: { system?: unknown; messages: Mensagem[]; tools?: Ferramenta[]; max_tokens?: number }) {
  const msgs: Record<string, unknown>[] = [];
  let sistema = textoDe(p.system);
  if (sistema.length > MAX_SISTEMA) {
    sistema = sistema.slice(0, MAX_SISTEMA) + '\n\n[Resumo da clínica cortado para caber no limite da IA. Para dados que não aparecem acima, use as ferramentas.]';
  }
  if (sistema) msgs.push({ role: 'system', content: sistema });
  for (const m of p.messages) {
    if (typeof m.content === 'string') { msgs.push({ role: m.role, content: m.content }); continue; }
    const blocos = (Array.isArray(m.content) ? m.content : []) as Bloco[];
    if (m.role === 'assistant') {
      const calls = blocos.filter((b) => b.type === 'tool_use').map((b) =>
        ({ id: b.id, type: 'function', function: { name: b.name, arguments: JSON.stringify(b.input ?? {}) } }));
      const t = textoDe(blocos);
      msgs.push({ role: 'assistant', content: t || null, ...(calls.length ? { tool_calls: calls } : {}) });
    } else {
      for (const b of blocos.filter((x) => x.type === 'tool_result')) {
        msgs.push({ role: 'tool', tool_call_id: b.tool_use_id,
          content: typeof b.content === 'string' ? b.content : JSON.stringify(b.content ?? '') });
      }
      const t = textoDe(blocos);
      if (t) msgs.push({ role: 'user', content: t });
    }
  }
  return {
    messages: msgs,
    max_tokens: Math.min(p.max_tokens || MAX_RESPOSTA, MAX_RESPOSTA),
    stream: true,
    ...(p.tools && p.tools.length ? {
      tools: p.tools.map((t) => ({ type: 'function', function: { name: t.name, description: corta(t.description || '', MAX_DESC_FERRAMENTA), parameters: limparSchema(t.input_schema || { type: 'object', properties: {} }) } })),
    } : {}),
  };
}

// streaming do Groq → eventos do Claude (message_start, content_block_*, message_delta, message_stop)
export function eventosClaude(onFim: (tin: number, tout: number) => void | Promise<void>) {
  const enc = new TextEncoder(), dec = new TextDecoder();
  let buf = '', iniciou = false, proximo = 0, textoAberto = -1, teveFerramenta = false, fim = '', tin = 0, tout = 0, terminou = false;
  const ferramentas: Record<string, number> = {};
  const evento = (ctl: TransformStreamDefaultController<Uint8Array>, d: Record<string, unknown>) =>
    ctl.enqueue(enc.encode(`event: ${d.type}\ndata: ${JSON.stringify(d)}\n\n`));

  const encerrar = async (ctl: TransformStreamDefaultController<Uint8Array>) => {
    if (terminou) return;
    terminou = true;
    if (!iniciou) evento(ctl, { type: 'message_start', message: { role: 'assistant', content: [], usage: { input_tokens: 0, output_tokens: 0 } } });
    for (let i = 0; i < proximo; i++) evento(ctl, { type: 'content_block_stop', index: i });
    const motivo = teveFerramenta || fim === 'tool_calls' ? 'tool_use' : fim === 'length' ? 'max_tokens' : 'end_turn';
    evento(ctl, { type: 'message_delta', delta: { stop_reason: motivo }, usage: { output_tokens: tout } });
    evento(ctl, { type: 'message_stop' });
    await onFim(tin, tout);
  };

  return new TransformStream<Uint8Array, Uint8Array>({
    async transform(pedaco, ctl) {
      buf += dec.decode(pedaco, { stream: true });
      let k: number;
      while ((k = buf.indexOf('\n')) >= 0) {
        const linha = buf.slice(0, k).trim(); buf = buf.slice(k + 1);
        if (!linha.startsWith('data:')) continue;
        const dado = linha.slice(5).trim();
        if (dado === '[DONE]') { await encerrar(ctl); continue; }
        let c: Record<string, any>;
        try { c = JSON.parse(dado); } catch (_) { continue; }
        if (c.error) {
          console.warn(`[groq] erro no streaming (${codigoErro(JSON.stringify(c))})`);
          evento(ctl, { type: 'error', error: { type: 'api_error', message: 'A IA interrompeu a resposta. Tente de novo.' } });
          continue;
        }
        if (!iniciou) { iniciou = true; evento(ctl, { type: 'message_start', message: { role: 'assistant', content: [], usage: { input_tokens: 0, output_tokens: 0 } } }); }
        // o Groq manda o consumo no último pedaço, em x_groq.usage (ou usage)
        const uso = c.usage || (c.x_groq && c.x_groq.usage);
        if (uso) { tin = uso.prompt_tokens || tin; tout = uso.completion_tokens || tout; }
        const ch = c.choices && c.choices[0];
        if (!ch) continue;
        const delta = ch.delta || {};
        if (typeof delta.content === 'string' && delta.content) {
          if (textoAberto < 0) {
            textoAberto = proximo++;
            evento(ctl, { type: 'content_block_start', index: textoAberto, content_block: { type: 'text', text: '' } });
          }
          evento(ctl, { type: 'content_block_delta', index: textoAberto, delta: { type: 'text_delta', text: delta.content } });
        }
        for (const tc of delta.tool_calls || []) {
          const chave = tc.id ? String(tc.id) : 'i' + (tc.index ?? 0);
          let idx = ferramentas[chave];
          if (idx === undefined && tc.index !== undefined && ferramentas['i' + tc.index] !== undefined && !tc.function?.name) idx = ferramentas['i' + tc.index];
          if (idx === undefined) {
            teveFerramenta = true;
            textoAberto = -1;
            idx = proximo++;
            ferramentas[chave] = idx;
            if (tc.index !== undefined) ferramentas['i' + tc.index] = idx;
            evento(ctl, { type: 'content_block_start', index: idx, content_block: { type: 'tool_use', id: tc.id || `chamada_${idx}`, name: tc.function?.name || '', input: {} } });
          }
          const args = tc.function?.arguments;
          if (args) evento(ctl, { type: 'content_block_delta', index: idx, delta: { type: 'input_json_delta', partial_json: typeof args === 'string' ? args : JSON.stringify(args) } });
        }
        if (ch.finish_reason) fim = ch.finish_reason;
      }
    },
    async flush(ctl) { await encerrar(ctl); },
  });
}

// mesmo pedido com o resumo da clínica pela metade (null quando não há o que cortar)
export function encolher(corpo: Record<string, unknown>) {
  const msgs = corpo.messages as { role: string; content: unknown }[] | undefined;
  const sis = msgs && msgs[0] && msgs[0].role === 'system' && typeof msgs[0].content === 'string' ? msgs[0].content : '';
  if (sis.length < 4000) return null;
  const novo = sis.slice(0, Math.floor(MAX_SISTEMA / 2)) + '\n\n[Resumo da clínica cortado para caber no limite da IA. Para dados que não aparecem acima, use as ferramentas.]';
  return { ...corpo, messages: [{ role: 'system', content: novo }, ...msgs!.slice(1)] };
}

// chama o Groq tentando os modelos em ordem: limite (429/413) ou modelo indisponível (404/400 de modelo) passa para o próximo
export async function chamarGroq(key: string, corpo: Record<string, unknown>, modelos = GROQ_MODELOS, nova = true): Promise<Response> {
  let ultima: Response | null = null, espera = Infinity;
  const enviar = (modelo: string, extras: Record<string, unknown>) => fetch(GROQ_URL, {
    method: 'POST', headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({ ...corpo, ...extras, model: modelo }),
  });
  for (const modelo of modelos) {
    let r = await enviar(modelo, EXTRAS[modelo] || {});
    // se o modelo não aceitar o ajuste de raciocínio, tenta de novo sem ele
    if (r.status === 400 && EXTRAS[modelo]) {
      const txt = await r.clone().text();
      if (/reasoning/i.test(txt)) { await r.body?.cancel(); r = await enviar(modelo, {}); }
    }
    // pedido grande demais para este modelo: tenta de novo com o resumo da clínica menor
    if (r.status === 413) {
      const menor = encolher(corpo);
      if (menor) { await r.body?.cancel(); r = await fetch(GROQ_URL, {
        method: 'POST', headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
        body: JSON.stringify({ ...menor, ...(EXTRAS[modelo] || {}), model: modelo }),
      }); }
    }
    if (r.ok) return r;
    if (r.status === 401 || r.status === 403) return r; // chave errada: não adianta trocar de modelo
    const txt = await r.text();
    console.warn(`[groq] ${modelo} respondeu ${r.status} (${codigoErro(txt)})`);
    ultima = new Response(txt, { status: r.status, headers: r.headers });
    const seg = /try again in ([\d.]+)s/i.exec(txt);
    if (r.status === 429 && seg) espera = Math.min(espera, Number(seg[1]));
    const deModelo = r.status === 400 && /model|reasoning/i.test(txt);
    if (![404, 413, 429, 498, 500, 502, 503].includes(r.status) && !deModelo) return ultima;
  }
  // todos no limite por minuto, mas por poucos segundos: espera e tenta uma vez mais
  if (nova && espera <= MAX_ESPERA) {
    await new Promise((ok) => setTimeout(ok, espera * 1000 + 300));
    return chamarGroq(key, corpo, modelos, false);
  }
  return ultima as Response;
}
