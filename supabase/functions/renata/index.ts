// =====================================================================
// SALUTE 02 · Edge Function "renata"
// Ponte entre o sistema e as IAs (Groq e ElevenLabs). As chaves ficam no
// cofre do Supabase (Vault) ou nos segredos da função e nunca vão para o navegador.
//
// Ações (POST, com o login do usuário no cabeçalho Authorization):
//   status       diz se há chave de IA (Groq) e da ElevenLabs para a clínica
//   chat         repassa a conversa para a IA, em streaming, e soma o consumo
//   testar       testa a chave de IA da clínica
//   voz          transforma texto em fala pela ElevenLabs (devolve audio/mpeg)
//   transcrever  transforma fala em texto pela ElevenLabs (multipart com o arquivo)
//
// IA usada: Groq, com a chave da clínica ou a padrão da Salute (cofre ou segredo
// GROQ_API_KEY). O front conversa no formato do Claude; groq.ts faz a tradução.
//
// Proteções do chat (S2): só modelos conhecidos, tamanho máximo de pedido e
// limite mensal de mensagens quando a clínica usa a chave da Salute.
// As regras do Agente de IA (tabela agente_ia) entram sempre no começo das instruções.
// =====================================================================
import { createClient } from 'npm:@supabase/supabase-js@2';
import { chamarGroq, codigoErro, eventosClaude, paraGroq } from './groq.ts';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Expose-Headers': 'x-salute-voz',
};
// voz padrão da ElevenLabs (premade "Sarah"), liberada no plano grátis: entra quando a voz escolhida exige plano pago
const VOZ_RESERVA = 'EXAVITQu4vr4xnSDxMaL';
// vozes que a ElevenLabs recusou por plano (402): pula direto para a reserva por 30 minutos (economiza uma ida e volta por fala)
const VOZ_PAGA = new Map<string, number>();
const json = (obj: unknown, status = 200) => new Response(JSON.stringify(obj), { status, headers: { ...CORS, 'content-type': 'application/json' } });

// o front ainda manda o nome do modelo do Claude; serve só para validar o pedido (o Groq usa os seus)
const MODELOS = /^claude-(haiku-4-5|sonnet-4-5|sonnet-5-5)(-\d{8})?$/;
// mensagens por mês quando a clínica não tem plano com limite e usa a chave da Salute
const LIMITE_PADRAO = Number(Deno.env.get('RENATA_LIMITE_PADRAO') || 300);
const MAX_MENSAGENS = 100, MAX_FERRAMENTAS = 40, MAX_BYTES = 400_000;

// erro da ElevenLabs com o motivo em português (chave sem permissão é o caso comum)
const erroVoz = async (r: Response, permissao: string) => {
  const txt = await r.text();
  const semPermissao = /missing_permissions|missing the permission/i.test(txt);
  const pago = r.status === 402 || /paid_plan_required/i.test(txt);
  console.warn(`[elevenlabs] ${r.status} (${codigoErro(txt)})`);
  return json({ erro: semPermissao ? `A chave da ElevenLabs está sem a permissão "${permissao}". Crie outra chave com essa permissão ligada e salve nas Conexões da Renata.`
    : pago ? 'A ElevenLabs pede plano pago para este uso. Assine um plano ou use uma voz padrão.' : 'A ElevenLabs recusou o pedido.', status: r.status }, r.status);
};

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

  // chave do Groq desta clínica ou a padrão da Salute
  const escolherIA = async () => {
    const { data: propria } = await adm.from('segredos_integracao').select('id')
      .eq('clinica_id', clinica).eq('provedor', 'groq').is('excluido_em', null).limit(1);
    const key = await chave('groq', 'GROQ_API_KEY');
    return key ? { key, propria: !!(propria && propria.length) } : null;
  };

  if (acao === 'status') {
    const [ia, v] = await Promise.all([escolherIA(), chave('elevenlabs', 'ELEVENLABS_API_KEY')]);
    return json({ claude: !!ia, ia: ia ? 'groq' : null, voz: !!v });
  }

  if (acao === 'testar') {
    const ia = await escolherIA();
    if (!ia) return json({ ok: false, motivo: 'sem chave' });
    const r = await chamarGroq(ia.key, { max_tokens: 8, messages: [{ role: 'user', content: 'Responda apenas: ok' }] });
    const ok = r.ok;
    await r.body?.cancel();
    await adm.from('renata_configuracoes').update({ claude_status_teste: ok ? 'ok' : 'erro ' + r.status, claude_testado_em: new Date().toISOString() })
      .eq('clinica_id', clinica).is('excluido_em', null);
    return json({ ok, status: r.status, ia: 'groq' });
  }

  if (acao === 'chat') {
    const ia = await escolherIA();
    if (!ia) return json({ erro: 'sem_chave' }, 412);
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

    // regras do Agente de IA da clínica vêm do banco e entram no começo das instruções
    // (o começo nunca é cortado quando o pedido precisa encolher)
    const { data: regras } = await adm.rpc('agente_ia_regras', { p_clinica: clinica, p_canal: 'assistente' });
    const sisFront = typeof p.system === 'string' ? p.system
      : Array.isArray(p.system) ? p.system.map((b) => (b && typeof b === 'object' && 'text' in b ? String((b as { text: unknown }).text) : '')).join('\n') : '';
    const sistema = typeof regras === 'string' && regras ? regras + '\n\n' + sisFront : sisFront;

    const rg = await chamarGroq(ia.key, paraGroq({ system: sistema, messages: msgs as { role: string; content: unknown }[], tools: tools as { name: string }[] | undefined, max_tokens: maxTokens }));
    if (!rg.ok || !rg.body) {
      // o navegador recebe só o código e uma frase simples, nunca o texto cru do provedor
      const cod = codigoErro(await rg.text().catch(() => ''));
      const frase = rg.status === 401 || rg.status === 403 ? 'A chave da IA foi recusada. Confira nas Conexões da Renata.'
        : rg.status === 429 ? 'A IA está no limite por minuto. Tente de novo em instantes.'
        : rg.status === 413 ? 'Conversa grande demais. Comece uma conversa nova com a Renata.'
        : 'A IA não respondeu agora. Tente de novo.';
      return json({ erro: frase, codigo: cod }, rg.status);
    }
    // traduz o streaming para o formato do Claude e soma o consumo no fim
    // (a mensagem é contada pelo servidor, não pelo que o navegador manda)
    const traduz = eventosClaude((tin, tout) => { consumo({ mensagens: nova ? 1 : 0, tin, tout }); });
    return new Response(rg.body.pipeThrough(traduz), { headers: { ...CORS, 'content-type': 'text/event-stream', 'cache-control': 'no-cache' } });
  }

  if (acao === 'voz') {
    const key = await chave('elevenlabs', 'ELEVENLABS_API_KEY');
    if (!key) return json({ erro: 'sem_chave' }, 412);
    const { data: cfg } = await adm.from('renata_voz').select('voice_id,modelo,estabilidade,similaridade,estilo').eq('clinica_id', clinica).is('excluido_em', null).limit(1);
    const v = (cfg && cfg[0]) || {};
    const texto = String(corpo.texto || '').slice(0, 1600);
    const voz = String(corpo.voice_id || v.voice_id || 'RGymW84CSmfVugnA5tvA');
    const modelo = String(corpo.modelo || v.modelo || 'eleven_flash_v2_5');
    const falar = (id: string) => fetch(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(id)}?output_format=mp3_44100_128`, {
      method: 'POST', headers: { 'xi-api-key': key, 'content-type': 'application/json', accept: 'audio/mpeg' },
      body: JSON.stringify({ text: texto, model_id: modelo, ...(/v2_5/.test(modelo) ? { language_code: 'pt' } : {}),
        voice_settings: { stability: Number(v.estabilidade ?? 0.45), similarity_boost: Number(v.similaridade ?? 0.8), style: Number(v.estilo ?? 0.2) } }),
    });
    const recusada = (VOZ_PAGA.get(voz) || 0) > Date.now() - 30 * 60_000;
    let r = await falar(recusada ? VOZ_RESERVA : voz);
    let usada = recusada ? 'reserva' : 'escolhida';
    // voz da biblioteca da comunidade no plano grátis: a ElevenLabs pede plano pago (402); fala com a voz padrão
    if (r.status === 402 && !recusada && voz !== VOZ_RESERVA) {
      console.warn(`[elevenlabs] 402 (${codigoErro(await r.text())}): usando a voz reserva`);
      VOZ_PAGA.set(voz, Date.now());
      r = await falar(VOZ_RESERVA);
      usada = 'reserva';
    }
    if (!r.ok || !r.body) return erroVoz(r, 'Text to Speech');
    await consumo({ chars: texto.length });
    return new Response(r.body, { headers: { ...CORS, 'content-type': 'audio/mpeg', 'x-salute-voz': usada } });
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
    if (!r.ok) return erroVoz(r, 'Speech to Text');
    const corpoR = await r.text();
    await consumo({ segs: Number(corpo.segundos || 0) });
    return new Response(corpoR, { status: r.status, headers: { ...CORS, 'content-type': 'application/json' } });
  }

  return json({ erro: 'Ação desconhecida' }, 400);
});
