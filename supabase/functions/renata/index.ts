// =====================================================================
// SALUTE 02 · Edge Function "renata"
// Ponte entre o sistema e as IAs (Google Gemini, Claude e ElevenLabs). As chaves ficam no
// cofre do Supabase (Vault) ou nos segredos da função e nunca vão para o navegador.
//
// Ações (POST, com o login do usuário no cabeçalho Authorization):
//   status       diz se há chave de IA (Gemini ou Claude) e da ElevenLabs para a clínica
//   chat         repassa a conversa para a IA, em streaming, e soma o consumo
//   testar       testa a chave de IA da clínica
//   voz          transforma texto em fala pela ElevenLabs (devolve audio/mpeg)
//   transcrever  transforma fala em texto pela ElevenLabs (multipart com o arquivo)
//
// IA usada, nesta ordem: Gemini da clínica, Claude da clínica, Gemini padrão da
// Salute (cofre ou segredo GEMINI_API_KEY) e Claude padrão (cofre ou ANTHROPIC_API_KEY).
// O front sempre conversa no formato do Claude; o Gemini é traduzido em gemini.ts.
//
// Proteções do chat (S2): só modelos conhecidos, tamanho máximo de pedido e
// limite mensal de mensagens quando a clínica usa a chave da Salute.
// =====================================================================
import { createClient } from 'npm:@supabase/supabase-js@2';
import { eventosClaude, GEMINI_MODELO, GEMINI_URL, paraGemini, statusGemini } from './gemini.ts';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const json = (obj: unknown, status = 200) => new Response(JSON.stringify(obj), { status, headers: { ...CORS, 'content-type': 'application/json' } });

// modelos que o front usa; qualquer outro é recusado
const MODELOS = /^claude-(haiku-4-5|sonnet-4-5|sonnet-5-5)(-\d{8})?$/;
// mensagens por mês quando a clínica não tem plano com limite e usa a chave da Salute
const LIMITE_PADRAO = Number(Deno.env.get('RENATA_LIMITE_PADRAO') || 300);
const MAX_MENSAGENS = 100, MAX_FERRAMENTAS = 40, MAX_BYTES = 400_000;

// uma pergunta nova da pessoa (não conta as voltas de resultado de ferramenta)
const ehPerguntaNova = (msgs: unknown[]) => {
  const u = msgs[msgs.length - 1] as { role?: string; content?: unknown } | undefined;
  if (!u || u.role !== 'user') return false;
  if (typeof u.content === 'string') return true;
  return Array.isArray(u.content) && !u.content.some((b) => b && (b as { type?: string }).type === 'tool_result');
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ erro: 'Use POST' }, 405);

  const adm = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false } });

  // quem está chamando
  const jwt = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  const { data: quem } = await adm.auth.getUser(jwt);
  if (!quem || !quem.user) return json({ erro: 'Entre de novo no sistema.' }, 401);

  // corpo: JSON ou multipart (transcrição)
  const tipo = req.headers.get('content-type') || '';
  let corpo: Record<string, unknown> = {};
  let form: FormData | null = null;
  if (tipo.includes('multipart/form-data')) {
    form = await req.formData();
    corpo = { acao: form.get('acao'), clinica_id: form.get('clinica_id'), segundos: Number(form.get('segundos') || 0) };
  } else {
    corpo = await req.json().catch(() => ({}));
  }
  const clinica = String(corpo.clinica_id || '');
  const acao = String(corpo.acao || '');

  // só quem é membro ativo da clínica usa a Renata dela
  // (ou a equipe de suporte da Salute, com a entrada registrada e dentro do prazo)
  const { data: vinc } = await adm.from('usuarios_clinicas').select('id')
    .eq('clinica_id', clinica).eq('usuario_id', quem.user.id).eq('ativo', true).eq('status_convite', 'aceito').is('excluido_em', null).limit(1);
  let liberado = !!(vinc && vinc.length);
  if (!liberado) {
    const { data: perf } = await adm.from('perfis_usuario').select('admin_plataforma').eq('id', quem.user.id).limit(1);
    if (perf && perf[0] && perf[0].admin_plataforma) {
      const { data: sup } = await adm.from('acessos_suporte').select('id').eq('clinica_id', clinica).eq('usuario_id', quem.user.id)
        .is('encerrado_em', null).is('excluido_em', null).gt('expira_em', new Date().toISOString()).limit(1);
      liberado = !!(sup && sup.length);
    }
  }
  if (!liberado) return json({ erro: 'Sem acesso a esta clínica.' }, 403);

  const chave = async (provedor: string, env: string) => {
    const { data } = await adm.rpc('ler_segredo', { p_clinica: clinica, p_provedor: provedor });
    return (typeof data === 'string' && data) || Deno.env.get(env) || '';
  };
  const consumo = (p: { mensagens?: number; tin?: number; tout?: number; chars?: number; segs?: number }) =>
    adm.rpc('renata_registrar_consumo', {
      p_clinica: clinica, p_mensagens: p.mensagens || 0, p_tokens_entrada: p.tin || 0, p_tokens_saida: p.tout || 0,
      p_caracteres_voz: p.chars || 0, p_segundos: p.segs || 0,
    });

  // qual IA atende esta clínica (o Gemini tem preferência)
  const escolherIA = async () => {
    const { data: proprias } = await adm.from('segredos_integracao').select('provedor')
      .eq('clinica_id', clinica).in('provedor', ['google', 'anthropic']).is('excluido_em', null);
    const tem = (p: string) => (proprias || []).some((x: { provedor: string }) => x.provedor === p);
    if (tem('google')) return { ia: 'gemini', key: await chave('google', 'GEMINI_API_KEY'), propria: true };
    if (tem('anthropic')) return { ia: 'claude', key: await chave('anthropic', 'ANTHROPIC_API_KEY'), propria: true };
    const g = await chave('google', 'GEMINI_API_KEY');
    if (g) return { ia: 'gemini', key: g, propria: false };
    const a = await chave('anthropic', 'ANTHROPIC_API_KEY');
    if (a) return { ia: 'claude', key: a, propria: false };
    return null;
  };

  if (acao === 'status') {
    const [ia, v] = await Promise.all([escolherIA(), chave('elevenlabs', 'ELEVENLABS_API_KEY')]);
    return json({ claude: !!ia, ia: ia ? ia.ia : null, voz: !!v });
  }

  if (acao === 'testar') {
    const ia = await escolherIA();
    if (!ia) return json({ ok: false, motivo: 'sem chave' });
    const r = ia.ia === 'gemini'
      ? await fetch(GEMINI_URL, {
        method: 'POST', headers: { authorization: `Bearer ${ia.key}`, 'content-type': 'application/json' },
        body: JSON.stringify({ model: GEMINI_MODELO, max_tokens: 8, reasoning_effort: 'none', messages: [{ role: 'user', content: 'Responda apenas: ok' }] }),
      })
      : await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST', headers: { 'x-api-key': ia.key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
        body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 8, messages: [{ role: 'user', content: 'Responda apenas: ok' }] }),
      });
    const ok = r.ok;
    const status = ia.ia === 'gemini' && !ok ? statusGemini(r.status, await r.text()) : r.status;
    await adm.from('renata_configuracoes').update({ claude_status_teste: ok ? 'ok' : 'erro ' + r.status, claude_testado_em: new Date().toISOString() })
      .eq('clinica_id', clinica).is('excluido_em', null);
    return json({ ok, status, ia: ia.ia });
  }

  if (acao === 'chat') {
    const ia = await escolherIA();
    if (!ia || !ia.key) return json({ erro: 'sem_chave' }, 412);
    const p = (corpo.payload || {}) as Record<string, unknown>;
    if (!MODELOS.test(String(p.model || ''))) return json({ erro: 'Modelo inválido' }, 400);
    const msgs = Array.isArray(p.messages) ? p.messages : [];
    const tools = Array.isArray(p.tools) ? p.tools : undefined;
    if (!msgs.length || msgs.length > MAX_MENSAGENS || (tools && tools.length > MAX_FERRAMENTAS) ||
        JSON.stringify(p).length > MAX_BYTES) {
      return json({ erro: 'Conversa grande demais. Comece uma conversa nova com a Renata.' }, 413);
    }

    // limite mensal: vale quando a clínica usa a chave da Salute (sem chave própria no cofre)
    const nova = ehPerguntaNova(msgs);
    if (!ia.propria && nova) {
      const { data: lim } = await adm.rpc('renata_limite_mes', { p_clinica: clinica });
      const usadas = Number(lim?.usadas || 0);
      const limite = lim?.limite == null ? LIMITE_PADRAO : Number(lim.limite);
      if (!lim?.ilimitado && usadas >= limite) {
        return json({ erro: `A Renata chegou ao limite de ${limite} mensagens deste mês. Fale com a Salute para ampliar.` }, 429);
      }
    }

    const maxTokens = Math.min(Number(p.max_tokens) || 1000, 2000);

    if (ia.ia === 'gemini') {
      const corpoG = paraGemini({ system: p.system, messages: msgs as { role: string; content: unknown }[], tools: tools as { name: string }[] | undefined, max_tokens: maxTokens });
      const rg = await fetch(GEMINI_URL, {
        method: 'POST', headers: { authorization: `Bearer ${ia.key}`, 'content-type': 'application/json' }, body: JSON.stringify(corpoG),
      });
      if (!rg.ok || !rg.body) {
        const txt = await rg.text();
        return new Response(txt, { status: statusGemini(rg.status, txt), headers: { ...CORS, 'content-type': 'application/json' } });
      }
      const traduz = eventosClaude((tin, tout) => { consumo({ mensagens: nova ? 1 : 0, tin, tout }); });
      return new Response(rg.body.pipeThrough(traduz), { headers: { ...CORS, 'content-type': 'text/event-stream', 'cache-control': 'no-cache' } });
    }

    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST', headers: { 'x-api-key': ia.key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({ model: p.model, max_tokens: maxTokens, system: p.system, tools, messages: msgs, stream: true }),
    });
    if (!r.ok || !r.body) return new Response(await r.text(), { status: r.status, headers: { ...CORS, 'content-type': 'application/json' } });
    // repassa o streaming e conta os tokens no caminho
    let tin = 0, tout = 0, buf = '';
    const dec = new TextDecoder();
    const conta = new TransformStream<Uint8Array, Uint8Array>({
      transform(pedaco, ctl) {
        ctl.enqueue(pedaco);
        buf += dec.decode(pedaco, { stream: true });
        let k: number;
        while ((k = buf.indexOf('\n\n')) >= 0) {
          const ev = buf.slice(0, k); buf = buf.slice(k + 2);
          const linha = ev.split('\n').find((l) => l.startsWith('data:'));
          if (!linha) continue;
          try {
            const d = JSON.parse(linha.slice(5));
            if (d.type === 'message_start' && d.message && d.message.usage) tin += (d.message.usage.input_tokens || 0) + (d.message.usage.cache_creation_input_tokens || 0) + (d.message.usage.cache_read_input_tokens || 0);
            if (d.type === 'message_delta' && d.usage) tout += d.usage.output_tokens || 0;
          } catch (_) { /* pedaço incompleto */ }
        }
      },
      // a mensagem é contada pelo servidor, não pelo que o navegador manda
      async flush() { await consumo({ mensagens: nova ? 1 : 0, tin, tout }); },
    });
    return new Response(r.body.pipeThrough(conta), { headers: { ...CORS, 'content-type': 'text/event-stream', 'cache-control': 'no-cache' } });
  }

  if (acao === 'voz') {
    const key = await chave('elevenlabs', 'ELEVENLABS_API_KEY');
    if (!key) return json({ erro: 'sem_chave' }, 412);
    const { data: cfg } = await adm.from('renata_voz').select('voice_id,modelo,estabilidade,similaridade,estilo').eq('clinica_id', clinica).is('excluido_em', null).limit(1);
    const v = (cfg && cfg[0]) || {};
    const texto = String(corpo.texto || '').slice(0, 1600);
    const voz = String(corpo.voice_id || v.voice_id || 'RGymW84CSmfVugnA5tvA');
    const modelo = String(corpo.modelo || v.modelo || 'eleven_flash_v2_5');
    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voz)}?output_format=mp3_44100_128`, {
      method: 'POST', headers: { 'xi-api-key': key, 'content-type': 'application/json', accept: 'audio/mpeg' },
      body: JSON.stringify({ text: texto, model_id: modelo, ...(/v2_5/.test(modelo) ? { language_code: 'pt' } : {}),
        voice_settings: { stability: Number(v.estabilidade ?? 0.45), similarity_boost: Number(v.similaridade ?? 0.8), style: Number(v.estilo ?? 0.2) } }),
    });
    if (!r.ok || !r.body) return new Response(await r.text(), { status: r.status, headers: { ...CORS, 'content-type': 'application/json' } });
    await consumo({ chars: texto.length });
    return new Response(r.body, { headers: { ...CORS, 'content-type': 'audio/mpeg' } });
  }

  if (acao === 'transcrever' && form) {
    const key = await chave('elevenlabs', 'ELEVENLABS_API_KEY');
    if (!key) return json({ erro: 'sem_chave' }, 412);
    const arq = form.get('file');
    if (!(arq instanceof File)) return json({ erro: 'Falta o áudio' }, 400);
    const fd = new FormData();
    fd.append('model_id', String(form.get('model_id') || 'scribe_v1'));
    fd.append('file', arq, arq.name || 'fala.webm');
    const r = await fetch('https://api.elevenlabs.io/v1/speech-to-text', { method: 'POST', headers: { 'xi-api-key': key }, body: fd });
    const corpoR = await r.text();
    if (r.ok) await consumo({ segs: Number(corpo.segundos || 0) });
    return new Response(corpoR, { status: r.status, headers: { ...CORS, 'content-type': 'application/json' } });
  }

  return json({ erro: 'Ação desconhecida' }, 400);
});
