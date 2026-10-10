// =====================================================================
// SALUTE 02 · Edge Function "whatsapp" (WhatsApp não oficial: Evolution API ou Z-API)
//
// 1) Webhook do provedor: POST /functions/v1/whatsapp?i=<instancia>&t=<segredo do webhook>
//    Traduz o evento e grava pelo banco (public.n8n_ingerir_evento), que confere o segredo,
//    não duplica, cria conversa e lead e põe na fila da IA. O n8n é acordado pela fila.
//    Mudanças de conexão (QR lido, celular desligado) atualizam instancias_whatsapp.status.
//
// 2) Tela de Integrações (com o login do usuário no cabeçalho Authorization):
//    { acao: 'conectar' | 'estado' | 'desconectar', instancia_id }
//    'conectar' cria a instância (Evolution), aponta o webhook para cá e devolve o QR Code.
//    Só quem pode editar a instância pelas regras do banco (RLS) consegue chamar.
//
// A chave do provedor fica no cofre (salvar_segredo 'whatsapp_nao_oficial') e nunca volta ao navegador.
// O envio das respostas continua com o n8n (n8n_envio_preflight monta o pedido para cada provedor).
// =====================================================================
import { createClient } from 'npm:@supabase/supabase-js@2';
import { lerEstado, lerEventos, lerQr, nomeArquivo, pedidoDesconectar, pedidoEstado, pedidoMidia, pedidosConectar, provedorDe, type Evento, type Inst, type Pedido } from './provedores.ts';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const json = (obj: unknown, status = 200) => new Response(JSON.stringify(obj), { status, headers: { ...CORS, 'content-type': 'application/json' } });
const URL_SB = Deno.env.get('SUPABASE_URL')!;
const MAX_BYTES = 1_000_000;
const MAX_MIDIA = 16 * 1024 * 1024;

const adm = createClient(URL_SB, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!, { auth: { persistSession: false } });

// chamada ao provedor com prazo; devolve o JSON (ou null) e o status
async function chamar(p: Pedido): Promise<{ ok: boolean; status: number; dados: unknown }> {
  try {
    const r = await fetch(p.url, { method: p.method, headers: p.headers, body: p.body, signal: AbortSignal.timeout(15_000) });
    const txt = await r.text();
    let dados: unknown = null;
    try { dados = txt ? JSON.parse(txt) : null; } catch { dados = null; }
    return { ok: r.ok, status: r.status, dados };
  } catch (e) {
    console.warn('[whatsapp] provedor sem resposta', (e as Error).name);
    return { ok: false, status: 0, dados: null };
  }
}

const erroProvedor = (status: number) =>
  status === 0 ? 'O servidor do WhatsApp não respondeu. Confira o endereço.'
  : status === 401 || status === 403 ? 'O provedor recusou a chave. Confira a chave ou o token.'
  : status === 404 ? 'Instância não encontrada no provedor. Confira o nome ou o ID da instância.'
  : 'O provedor do WhatsApp recusou o pedido (erro ' + status + ').';

async function gravarConexao(inst: Record<string, unknown>, estado: string, numero?: string) {
  const mud: Record<string, unknown> = { status: estado };
  if (estado === 'conectado' && inst.status !== 'conectado') { mud.conectado_em = new Date().toISOString(); mud.desconectado_em = null; }
  if (estado === 'desconectado' && inst.status !== 'desconectado') mud.desconectado_em = new Date().toISOString();
  if (inst.status !== estado) await adm.from('instancias_whatsapp').update(mud).eq('id', inst.id as string);
  // número no formato internacional (+55...); se o banco recusar, a conexão continua valendo
  if (numero && !inst.numero) await adm.from('instancias_whatsapp').update({ numero: '+' + numero }).eq('id', inst.id as string);
}

// mídia recebida: baixa do provedor e guarda no armazenamento da clínica (bucket "mensagens"), ligada à mensagem
async function guardarMidia(inst: Record<string, unknown>, prov: 'evolution' | 'zapi', ev: Evento, mensagemId: string, conversaId: string) {
  try {
    let seg = '';
    if (prov === 'evolution') {
      const { data } = await adm.rpc('ler_segredo', { p_clinica: inst.clinica_id, p_provedor: 'whatsapp_nao_oficial' });
      seg = String(data || '');
      if (!seg || !inst.api_url) return;
    }
    const ped = pedidoMidia(prov, { api_url: String(inst.api_url || ''), nome_instancia: inst.nome_instancia as string }, seg, ev.id_externo, ev.midia?.url);
    if (!ped) return;
    const r = await fetch(ped.url, { method: ped.method, headers: ped.headers, body: ped.body, signal: AbortSignal.timeout(30_000) });
    if (!r.ok) { console.warn('[whatsapp] mídia não baixada', r.status); return; }
    let bytes: Uint8Array; let mime = ev.midia?.mime || '';
    if (prov === 'evolution') {
      const j = await r.json().catch(() => ({})) as { base64?: string; mimetype?: string };
      if (!j.base64) return;
      const b64 = j.base64.replace(/^data:[^,]*,/, '');
      if (b64.length > MAX_MIDIA * 1.37) return;
      bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
      mime = j.mimetype || mime;
    } else {
      const buf = new Uint8Array(await r.arrayBuffer());
      bytes = buf;
      mime = mime || r.headers.get('content-type') || '';
    }
    if (!bytes.length || bytes.length > MAX_MIDIA) return;
    mime = (mime || 'application/octet-stream').split(';')[0].trim();
    const nome = nomeArquivo(ev.tipo_msg || 'arquivo', mime, ev.midia?.nome);
    const path = `${inst.clinica_id}/conversas/${conversaId}/${Date.now().toString(36)}_${nome}`;
    const up = await adm.storage.from('mensagens').upload(path, bytes, { contentType: mime, upsert: false });
    if (up.error) { console.warn('[whatsapp] upload falhou'); return; }
    await adm.from('anexos_mensagem').insert({
      clinica_id: inst.clinica_id, mensagem_id: mensagemId, arquivo_path: path, nome_arquivo: nome, mime_type: mime, tamanho_bytes: bytes.length,
    });
  } catch (e) {
    console.warn('[whatsapp] mídia', (e as Error).name);
  }
}

// ---------- 1) webhook do provedor ----------
async function webhook(req: Request, id: string, token: string) {
  const tam = Number(req.headers.get('content-length') || 0);
  if (tam > MAX_BYTES) return json({ ok: false, motivo: 'grande_demais' }, 413);
  const { data: inst } = await adm.from('instancias_whatsapp')
    .select('id, clinica_id, status, numero, tipo_api, provedor_nao_oficial, webhook_token, api_url, nome_instancia')
    .eq('id', id).is('excluido_em', null).maybeSingle();
  if (!inst || inst.webhook_token !== token || inst.tipo_api !== 'nao_oficial') return json({ ok: false }, 401);

  const corpo = await req.json().catch(() => null);
  if (!corpo) return json({ ok: false, motivo: 'corpo_invalido' }, 400);
  const prov = provedorDe(inst.provedor_nao_oficial as string);
  const eventos = lerEventos(prov, corpo).slice(0, 50);
  let gravados = 0;
  const midias: Promise<void>[] = [];
  for (const ev of eventos) {
    if ('conexao' in ev) { await gravarConexao(inst, ev.conexao, ev.numero); continue; }
    const { midia, ...evento } = ev;
    const { data, error } = await adm.rpc('n8n_ingerir_evento', { p_provedor: prov, p_instancia_ref: inst.id, p_evento: evento, p_token: token });
    if (error) { console.warn('[whatsapp] ingestão falhou', error.code); continue; }
    const res = (data || {}) as { ok?: boolean; mensagem_id?: string; conversa_id?: string };
    if (res.ok) gravados++;
    if (res.ok && midia && res.mensagem_id && res.conversa_id) midias.push(guardarMidia(inst, prov, ev, res.mensagem_id, res.conversa_id));
  }
  // a mídia é baixada depois da resposta, para o provedor não esperar
  if (midias.length) {
    const todas = Promise.all(midias).then(() => undefined);
    const rt = (globalThis as { EdgeRuntime?: { waitUntil: (p: Promise<unknown>) => void } }).EdgeRuntime;
    if (rt) rt.waitUntil(todas); else await todas;
  }
  return json({ ok: true, eventos: eventos.length, gravados, midias: midias.length });
}

// ---------- 2) ações da tela ----------
async function gestao(req: Request) {
  const auth = req.headers.get('Authorization') || '';
  if (!/^Bearer\s+\S+/i.test(auth)) return json({ erro: 'Entre de novo no sistema.' }, 401);
  const corpo = await req.json().catch(() => ({})) as Record<string, unknown>;
  const acao = String(corpo.acao || '');
  const id = String(corpo.instancia_id || '');
  if (!['conectar', 'estado', 'desconectar'].includes(acao) || !/^[0-9a-f-]{36}$/i.test(id)) return json({ erro: 'Pedido inválido.' }, 400);

  // permissão: o próprio banco decide (a política de edição de instancias_whatsapp)
  const usu = createClient(URL_SB, Deno.env.get('SUPABASE_ANON_KEY')!, { auth: { persistSession: false }, global: { headers: { Authorization: auth } } });
  const { data: lin } = await usu.from('instancias_whatsapp').update({ atualizado_em: new Date().toISOString() })
    .eq('id', id).is('excluido_em', null).select('id').limit(1);
  if (!lin || !lin.length) return json({ erro: 'Sem permissão para as conexões de WhatsApp desta clínica.' }, 403);

  const { data: inst } = await adm.from('instancias_whatsapp')
    .select('id, clinica_id, status, numero, tipo_api, provedor_nao_oficial, api_url, nome_instancia, webhook_token')
    .eq('id', id).single();
  if (!inst || inst.tipo_api !== 'nao_oficial') return json({ erro: 'Esta conexão não é da API não oficial.' }, 400);
  const prov = provedorDe(inst.provedor_nao_oficial as string);
  // Evolution: sem endereço próprio, a clínica usa o servidor padrão da Salute e uma instância com nome automático
  let api = String(inst.api_url || '');
  let nome = String(inst.nome_instancia || '');
  if (prov === 'evolution' && !api) {
    const { data: cfg } = await adm.from('ia_plataforma_config').select('valor').eq('chave', 'evolution_url').maybeSingle();
    api = String(cfg?.valor || '').replace(/\/+$/, '');
    nome = nome || `salute-${String(inst.clinica_id).slice(0, 8)}`;
    if (api) await adm.from('instancias_whatsapp').update({ api_url: api, nome_instancia: nome }).eq('id', inst.id);
  }
  if (!/^https:\/\/[^\s/]+/i.test(api)) return json({ erro: 'O servidor do WhatsApp ainda não foi configurado pela equipe da Salute.' }, 400);
  if (prov === 'evolution' && !nome) return json({ erro: 'Informe o nome da instância.' }, 400);
  const { data: seg } = await adm.rpc('ler_segredo', { p_clinica: inst.clinica_id, p_provedor: 'whatsapp_nao_oficial' });
  if (!seg) return json({ erro: prov === 'zapi' ? 'Informe o token da instância.' : 'A chave do WhatsApp ainda não foi configurada pela equipe da Salute.' }, 400);
  const i: Inst = { api_url: api, nome_instancia: nome };

  if (acao === 'desconectar') {
    await chamar(pedidoDesconectar(prov, i, seg as string));
    await gravarConexao(inst, 'desconectado');
    return json({ estado: 'desconectado' });
  }

  const st = await chamar(pedidoEstado(prov, i, seg as string));
  const estado = st.ok ? lerEstado(prov, st.dados) : 'desconectado';
  if (acao === 'estado') {
    if (!st.ok && st.status !== 404) return json({ erro: erroProvedor(st.status) }, 502);
    await gravarConexao(inst, estado === 'conectado' ? 'conectado' : inst.status === 'conectando' ? 'conectando' : estado);
    return json({ estado });
  }

  // conectar: aponta o webhook para esta função e devolve o QR Code
  const hook = `${URL_SB}/functions/v1/whatsapp?i=${inst.id}&t=${inst.webhook_token}`;
  const p = pedidosConectar(prov, i, seg as string, hook);
  if (p.criar && !st.ok) {
    const c = await chamar(p.criar);
    // 403/409: a instância já existe no servidor; segue normalmente
    if (!c.ok && ![403, 409].includes(c.status)) return json({ erro: erroProvedor(c.status) }, 502);
  } else if (!st.ok) {
    return json({ erro: erroProvedor(st.status) }, 502);
  }
  const w = await chamar(p.webhook);
  if (!w.ok) return json({ erro: 'Não foi possível ligar o recebimento de mensagens. ' + erroProvedor(w.status) }, 502);
  await adm.from('instancias_whatsapp').update({ url_webhook: `${URL_SB}/functions/v1/whatsapp?i=${inst.id}` }).eq('id', inst.id);
  if (estado === 'conectado') {
    await gravarConexao(inst, 'conectado');
    return json({ estado: 'conectado' });
  }
  const q = await chamar(p.qr);
  const qr = q.ok ? lerQr(prov, q.dados) : null;
  if (!qr) return json({ erro: q.ok ? 'O provedor não devolveu o QR Code. Tente de novo em alguns segundos.' : erroProvedor(q.status) }, 502);
  await gravarConexao(inst, 'conectando');
  return json({ estado: 'conectando', qr });
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ erro: 'Use POST' }, 405);
  const u = new URL(req.url);
  const id = u.searchParams.get('i'), token = u.searchParams.get('t');
  try {
    if (id && token) return await webhook(req, id, token);
    return await gestao(req);
  } catch (e) {
    console.error('[whatsapp] erro', (e as Error).name);
    return json({ erro: 'Erro inesperado na conexão do WhatsApp.' }, 500);
  }
});
