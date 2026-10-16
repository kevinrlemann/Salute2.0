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
import { Image } from 'https://deno.land/x/imagescript@1.3.0/mod.ts';
import { lerContatos, lerEstado, lerEventos, lerFotoUrl, lerQr, nomeArquivo, pedidoContatos, pedidoDesconectar, pedidoEstado, pedidoFoto, pedidoMidia, pedidosConectar, provedorDe, type Evento, type Inst, type Pedido } from './provedores.ts';

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

// a foto do WhatsApp também vira foto do paciente (lista e ficha), se ele ainda não tem uma
async function levarFotoAoPaciente(clinicaId: unknown, conversaId: string, fotoPath: string) {
  try {
    const { data: cv } = await adm.from('conversas').select('paciente_id').eq('id', conversaId).maybeSingle();
    if (!cv?.paciente_id) return;
    const { data: pac } = await adm.from('pacientes').select('foto_path').eq('id', cv.paciente_id).maybeSingle();
    if (!pac || pac.foto_path) return;
    const dl = await adm.storage.from('mensagens').download(fotoPath);
    if (dl.error || !dl.data) return;
    const destino = `${clinicaId}/pacientes/${cv.paciente_id}/foto.jpg`;
    const up = await adm.storage.from('clinica').upload(destino, dl.data, { contentType: 'image/jpeg', upsert: true });
    if (up.error) { console.warn('[whatsapp] foto do paciente não copiada'); return; }
    await adm.from('pacientes').update({ foto_path: destino }).eq('id', cv.paciente_id).is('foto_path', null);
  } catch (e) {
    console.warn('[whatsapp] foto do paciente', (e as Error).name);
  }
}

// foto de perfil do contato (200 x 200, bucket privado "mensagens"). Busca quando a conversa não tem foto ou
// quando o banco pediu (foto_buscar: mais de 7 dias e não trocada pela clínica). Até 3 tentativas com intervalo
// crescente; falha final fica em silêncio (só no registro da entrada). Responde ao provedor antes: roda em waitUntil.
const FOTO_LADO = 200;
async function reduzirFoto(bytes: Uint8Array): Promise<{ bytes: Uint8Array; mime: string }> {
  try {
    const img = await Image.decode(bytes);
    const lado = Math.min(img.width, img.height);
    const recorte = img.crop(Math.floor((img.width - lado) / 2), Math.floor((img.height - lado) / 2), lado, lado);
    const menor = recorte.resize(FOTO_LADO, FOTO_LADO);
    return { bytes: await menor.encodeJPEG(82), mime: 'image/jpeg' };
  } catch {
    return { bytes, mime: 'image/jpeg' }; // formato que a biblioteca não lê: guarda a original
  }
}
async function registrarFoto(entradaId: string | undefined, resultado: string) {
  if (!entradaId) return;
  try {
    const { data } = await adm.from('entrada_webhook').select('payload_redigido').eq('id', entradaId).maybeSingle();
    const cap = { ...((data?.payload_redigido as Record<string, unknown> | null)?.capturado as Record<string, unknown> || {}), foto: resultado };
    await adm.from('entrada_webhook').update({ payload_redigido: { ...(data?.payload_redigido as Record<string, unknown> || {}), capturado: cap } }).eq('id', entradaId);
  } catch { /* registro é melhor esforço */ }
}
async function guardarFoto(inst: Record<string, unknown>, conversaId: string, telefone: string, forcar = false, entradaId?: string): Promise<boolean> {
  try {
    const { data: cv } = await adm.from('conversas').select('foto_contato_path, foto_editada_manualmente').eq('id', conversaId).maybeSingle();
    if (cv?.foto_editada_manualmente) { await registrarFoto(entradaId, 'mantida_pela_clinica'); return !!cv.foto_contato_path; }
    if (cv?.foto_contato_path && !forcar) { await levarFotoAoPaciente(inst.clinica_id, conversaId, cv.foto_contato_path); return true; }
    const prov = provedorDe(inst.provedor_nao_oficial as string);
    if (prov !== 'evolution' || !inst.api_url || !inst.nome_instancia) return false;
    const { data: seg } = await adm.rpc('ler_segredo', { p_clinica: inst.clinica_id, p_provedor: 'whatsapp_nao_oficial' });
    if (!seg) return false;
    const ped = pedidoFoto(prov, { api_url: String(inst.api_url), nome_instancia: String(inst.nome_instancia) }, String(seg), telefone);
    if (!ped) return false;
    const agora = new Date().toISOString();
    let bytes: Uint8Array | null = null; let semFoto = false;
    for (const espera of [0, 2_000, 6_000]) {
      if (espera) await new Promise((r) => setTimeout(r, espera));
      const info = await chamar(ped);
      if (info.ok && !lerFotoUrl(info.dados)) { semFoto = true; break; } // sem foto pública ou privacidade do contato
      const url = info.ok ? lerFotoUrl(info.dados) : null;
      if (!url) continue;
      try {
        const r = await fetch(url, { signal: AbortSignal.timeout(15_000) });
        if (!r.ok) continue;
        const mime = (r.headers.get('content-type') || 'image/jpeg').split(';')[0].trim();
        const b = new Uint8Array(await r.arrayBuffer());
        if (b.length && b.length <= 2_000_000 && mime.startsWith('image/')) { bytes = b; break; }
      } catch { /* tenta de novo */ }
    }
    if (semFoto) {
      // marca a data para não perguntar de novo por 7 dias; a tela mostra o avatar padrão
      await adm.from('conversas').update({ foto_contato_atualizada_em: agora }).eq('id', conversaId);
      await registrarFoto(entradaId, 'sem_foto');
      return !!cv?.foto_contato_path;
    }
    if (!bytes) { await registrarFoto(entradaId, 'falhou'); return !!cv?.foto_contato_path; }
    const red = await reduzirFoto(bytes);
    const path = `${inst.clinica_id}/contatos/${conversaId}.jpg`;
    const up = await adm.storage.from('mensagens').upload(path, red.bytes, { contentType: red.mime, upsert: true });
    if (up.error) { console.warn('[whatsapp] foto não guardada'); await registrarFoto(entradaId, 'falhou_storage'); return false; }
    // o caminho é o mesmo de antes: a tela recebe a conversa pelo tempo real e assina a URL de novo
    await adm.from('conversas').update({ foto_contato_path: path, foto_contato_atualizada_em: agora }).eq('id', conversaId);
    await levarFotoAoPaciente(inst.clinica_id, conversaId, path);
    await registrarFoto(entradaId, 'ok');
    console.log('[whatsapp] foto guardada', conversaId.slice(0, 8), red.bytes.length, 'bytes');
    return true;
  } catch (e) {
    console.warn('[whatsapp] foto', (e as Error).name);
    await registrarFoto(entradaId, 'erro');
    return false;
  }
}

// origem do lead a partir do link do anúncio (nomes iguais aos da tabela origens_lead)
function origemDoAnuncio(url?: string): string {
  const h = (url || '').toLowerCase();
  if (/instagram\.com|ig\.me/.test(h)) return 'Instagram';
  if (/facebook\.com|fb\.com|fb\.me|fb\.watch|messenger\.com/.test(h)) return 'Facebook';
  if (/tiktok\.com/.test(h)) return 'TikTok';
  if (/google\.|youtube\.com|youtu\.be|g\.co\//.test(h)) return 'Google';
  return 'Tráfego pago';
}

// guarda o anúncio na conversa (só no primeiro contato) e troca "Não informado" pela origem do anúncio
async function guardarAnuncio(clinicaId: unknown, conversaId: string, a: NonNullable<Evento['anuncio']>) {
  try {
    const { data: cv } = await adm.from('conversas').select('origem_anuncio, lead_id').eq('id', conversaId).maybeSingle();
    if (!cv) return;
    if (!cv.origem_anuncio) {
      await adm.from('conversas').update({ origem_anuncio: { ...a, recebido_em: new Date().toISOString() } })
        .eq('id', conversaId).is('origem_anuncio', null);
    }
    if (!cv.lead_id) return;
    const { data: nao } = await adm.from('origens_lead').select('id').eq('clinica_id', clinicaId).eq('nome', 'Não informado').is('excluido_em', null).limit(1).maybeSingle();
    const { data: alvo } = await adm.from('origens_lead').select('id').eq('clinica_id', clinicaId).eq('nome', origemDoAnuncio(a.url))
      .eq('ativo', true).is('excluido_em', null).order('ordem').limit(1).maybeSingle();
    if (!nao || !alvo) return;
    await adm.from('leads').update({ origem_id: alvo.id }).eq('id', cv.lead_id).eq('origem_id', nao.id);
  } catch (e) {
    console.warn('[whatsapp] anúncio', (e as Error).name);
  }
}

// guarda os nomes dos campos do contexto (sem conteúdo) na conversa, para a revisão do anúncio
async function guardarDiagnostico(conversaId: string, campos: string) {
  try {
    await adm.from('conversas').update({ diagnostico_anuncio: { campos, recebido_em: new Date().toISOString() } })
      .eq('id', conversaId).is('origem_anuncio', null);
  } catch (e) {
    console.warn('[whatsapp] diagnóstico', (e as Error).name);
  }
}

// segredo da instância (chave da API não oficial), já como texto
async function segredoDe(inst: Record<string, unknown>): Promise<string> {
  const { data } = await adm.rpc('ler_segredo', { p_clinica: inst.clinica_id, p_provedor: 'whatsapp_nao_oficial' });
  return String(data || '');
}
const instDe = (inst: Record<string, unknown>): Inst => ({ api_url: String(inst.api_url || ''), nome_instancia: String(inst.nome_instancia || '') });
const soDigitos = (v: unknown) => String(v || '').replace(/\D/g, '');
// variações do número brasileiro (com e sem o nono dígito), para casar agenda e conversa
function variantesTel(tel: string): string[] {
  const d = soDigitos(tel);
  const out = [d];
  if (/^55\d{10}$/.test(d)) out.push(d.slice(0, 4) + '9' + d.slice(4));
  if (/^55\d{2}9\d{8}$/.test(d)) out.push(d.slice(0, 4) + d.slice(5));
  return out;
}

// mensagem do banco pelo id do WhatsApp (dentro da clínica)
async function mensagemPorIdWa(clinicaId: unknown, idWa: string) {
  const { data } = await adm.from('mensagens').select('id, tipo, direcao').eq('clinica_id', clinicaId).eq('whatsapp_mensagem_id', idWa).is('excluido_em', null).limit(1).maybeSingle();
  return data;
}

// reação, mensagem apagada e mensagem editada: não passam pelo banco de ingestão, a função grava direto
async function tratarEdicao(inst: Record<string, unknown>, ev: Evento): Promise<boolean> {
  try {
    const alvo = ev.alvo ? await mensagemPorIdWa(inst.clinica_id, ev.alvo) : null;
    if (!alvo) return false;
    if (ev.tipo === 'reacao') {
      // o contato só tem uma reação por mensagem: a anterior sai e a nova entra (emoji vazio = retirou)
      await adm.from('reacoes_mensagem').update({ excluido_em: new Date().toISOString() }).eq('mensagem_id', alvo.id).eq('do_contato', !ev.de_mim).is('excluido_em', null);
      if (ev.texto) await adm.from('reacoes_mensagem').insert({ clinica_id: inst.clinica_id, mensagem_id: alvo.id, emoji: ev.texto.slice(0, 16), do_contato: !ev.de_mim, usuario_id: null });
      return true;
    }
    if (ev.tipo === 'apagar') {
      await adm.from('mensagens').update({ apagada: true, apagada_para: 'todos', apagada_em: new Date().toISOString() }).eq('id', alvo.id);
      return true;
    }
    if (ev.tipo === 'editar' && ev.texto) {
      const campo = alvo.tipo === 'texto' ? 'texto' : 'legenda';
      await adm.from('mensagens').update({ [campo]: ev.texto.slice(0, 8000), editada_em: new Date().toISOString() }).eq('id', alvo.id);
      return true;
    }
  } catch (e) {
    console.warn('[whatsapp] edição', (e as Error).name);
  }
  return false;
}

// nome salvo na agenda do aparelho vale mais que o nome que a pessoa usa no WhatsApp
async function aplicarNomeAgenda(clinicaId: unknown, conversa: { id: string; nome_contato: string | null; lead_id: string | null }, nome: string) {
  if (!nome || conversa.nome_contato === nome) return false;
  const antigo = conversa.nome_contato;
  await adm.from('conversas').update({ nome_contato: nome, nome_editado_manualmente: true }).eq('id', conversa.id);
  if (conversa.lead_id) {
    // o lead só muda se ainda estiver com o nome automático (telefone, "Contato ..." ou o nome do WhatsApp)
    const { data: lead } = await adm.from('leads').select('id, nome, telefone').eq('id', conversa.lead_id).maybeSingle();
    const n = String(lead?.nome || '').trim();
    const automatico = !n || /^\+?\d[\d\s().-]*$/.test(n) || /^Contato\b/i.test(n) || (antigo && n === antigo) || soDigitos(n) === soDigitos(lead?.telefone);
    if (lead && automatico) await adm.from('leads').update({ nome }).eq('id', lead.id);
  }
  return true;
}

// um contato: pede à agenda o nome deste número (quando a conversa ainda não tem nome da agenda)
async function guardarNomeAgenda(inst: Record<string, unknown>, conversaId: string, telefone: string, nomeWa?: string) {
  try {
    const { data: cv } = await adm.from('conversas').select('id, nome_contato, lead_id').eq('id', conversaId).maybeSingle();
    if (!cv) return;
    if (cv.nome_contato && cv.nome_contato !== nomeWa) return; // já tem nome da agenda (ou digitado)
    const prov = provedorDe(inst.provedor_nao_oficial as string);
    const seg = await segredoDe(inst);
    const ped = seg && inst.api_url && inst.nome_instancia ? pedidoContatos(prov, instDe(inst), seg, telefone) : null;
    if (!ped) return;
    const r = await chamar(ped);
    if (!r.ok) return;
    const nomes = lerContatos(r.dados);
    const nome = variantesTel(telefone).map((t) => nomes[t]).find(Boolean);
    if (nome) await aplicarNomeAgenda(inst.clinica_id, cv, nome);
  } catch (e) {
    console.warn('[whatsapp] agenda', (e as Error).name);
  }
}

// todas as conversas: casa a agenda inteira do aparelho com as conversas da clínica (agendador, de hora em hora)
async function sincronizarContatos() {
  const { data: lista } = await adm.from('instancias_whatsapp')
    .select('id, clinica_id, provedor_nao_oficial, api_url, nome_instancia')
    .eq('tipo_api', 'nao_oficial').is('excluido_em', null).eq('status', 'conectado');
  let instancias = 0, contatos = 0, atualizadas = 0;
  for (const inst of lista || []) {
    const prov = provedorDe(inst.provedor_nao_oficial as string);
    const seg = await segredoDe(inst);
    const ped = seg && inst.api_url && inst.nome_instancia ? pedidoContatos(prov, instDe(inst), seg) : null;
    if (!ped) continue;
    const r = await chamar(ped);
    if (!r.ok) continue;
    const nomes = lerContatos(r.dados);
    instancias++; contatos += Object.keys(nomes).length;
    const { data: convs } = await adm.from('conversas').select('id, telefone, nome_contato, lead_id')
      .eq('clinica_id', inst.clinica_id).is('excluido_em', null).limit(5000);
    for (const cv of convs || []) {
      const nome = variantesTel(String(cv.telefone || '')).map((t) => nomes[t]).find(Boolean);
      if (nome && await aplicarNomeAgenda(inst.clinica_id, cv, nome)) atualizadas++;
    }
  }
  // foto do WhatsApp que ainda não chegou ao paciente (vínculo feito depois da foto)
  let fotos = 0;
  const { data: semFoto } = await adm.from('conversas').select('id, clinica_id, foto_contato_path, paciente:pacientes!conversas_paciente_id_fkey(foto_path)')
    .not('foto_contato_path', 'is', null).not('paciente_id', 'is', null).is('excluido_em', null).limit(500);
  for (const cv of semFoto || []) {
    const pac = cv.paciente as unknown as { foto_path: string | null } | null;
    if (pac && !pac.foto_path) { await levarFotoAoPaciente(cv.clinica_id, cv.id, String(cv.foto_contato_path)); fotos++; }
  }
  return { instancias, contatos, atualizadas, fotos };
}

// figurinha recebida vira figurinha da clínica (biblioteca): copia o arquivo e cria o registro
async function salvarFigurinha(auth: string, mensagemId: string, rotulo: string) {
  const leitor = createClient(URL_SB, Deno.env.get('SUPABASE_ANON_KEY')!, { auth: { persistSession: false }, global: { headers: { Authorization: auth } } });
  const { data: m } = await leitor.from('mensagens').select('id, clinica_id, tipo, anexos:anexos_mensagem(arquivo_path, mime_type, excluido_em)').eq('id', mensagemId).maybeSingle();
  if (!m) return json({ erro: 'Sem permissão para esta mensagem.' }, 403);
  const an = (m.anexos || []).find((a: { excluido_em: string | null }) => !a.excluido_em);
  if (m.tipo !== 'figurinha' || !an) return json({ erro: 'Esta mensagem não é uma figurinha.' }, 400);
  const { data: ja } = await adm.from('figurinhas').select('id').eq('clinica_id', m.clinica_id).eq('imagem_path', an.arquivo_path).is('excluido_em', null).limit(1).maybeSingle();
  if (ja) return json({ ok: true, id: ja.id, repetida: true });
  const dl = await adm.storage.from('mensagens').download(an.arquivo_path);
  if (dl.error || !dl.data) return json({ erro: 'Não foi possível ler a figurinha.' }, 502);
  const destino = `${m.clinica_id}/figurinhas/${crypto.randomUUID()}.webp`;
  const up = await adm.storage.from('mensagens').upload(destino, dl.data, { contentType: an.mime_type || 'image/webp', upsert: false });
  if (up.error) return json({ erro: 'Não foi possível guardar a figurinha.' }, 502);
  const { count } = await adm.from('figurinhas').select('id', { count: 'exact', head: true }).eq('clinica_id', m.clinica_id).is('excluido_em', null);
  const { data: fig, error } = await adm.from('figurinhas').insert({
    clinica_id: m.clinica_id, rotulo: (rotulo || 'Figurinha').slice(0, 40), emoji: null, cor_fundo: null, imagem_path: destino, ordem: (count || 0) + 1,
  }).select('id, rotulo, emoji, cor_fundo, imagem_path, ordem, clinica_id').single();
  if (error || !fig) return json({ erro: 'Não foi possível salvar a figurinha.' }, 500);
  return json({ ok: true, figurinha: fig });
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
    if (ev.tipo === 'reacao' || ev.tipo === 'apagar' || ev.tipo === 'editar') { if (await tratarEdicao(inst, ev)) gravados++; continue; }
    const { midia, anuncio, campos_contexto, alvo: _alvo, ...evento } = ev;
    const { data, error } = await adm.rpc('n8n_ingerir_evento', { p_provedor: prov, p_instancia_ref: inst.id, p_evento: evento, p_token: token });
    if (error) { console.warn('[whatsapp] ingestão falhou', error.code); continue; }
    const res = (data || {}) as { ok?: boolean; mensagem_id?: string; conversa_id?: string; entrada_id?: string; foto_buscar?: boolean };
    if (res.ok) gravados++;
    if (res.ok && midia && res.mensagem_id && res.conversa_id) midias.push(guardarMidia(inst, prov, ev, res.mensagem_id, res.conversa_id));
    // veio de um anúncio (click-to-WhatsApp): guarda os dados do anúncio na conversa e ajusta a origem do lead
    if (res.ok && anuncio && res.conversa_id && !ev.de_mim) midias.push(guardarAnuncio(inst.clinica_id, res.conversa_id, anuncio));
    // contexto sem anúncio: guarda só os nomes dos campos na conversa, para conferir o formato
    if (res.ok && campos_contexto && res.conversa_id && !ev.de_mim) midias.push(guardarDiagnostico(res.conversa_id, campos_contexto));
    // contato que escreveu: busca a foto de perfil (uma vez por conversa) e o nome salvo na agenda do aparelho
    if (res.ok && res.conversa_id && ev.tipo === 'mensagem' && !ev.de_mim && ev.telefone) {
      if (res.foto_buscar !== false) midias.push(guardarFoto(inst, res.conversa_id, ev.telefone, res.foto_buscar === true, res.entrada_id).then(() => undefined));
      midias.push(guardarNomeAgenda(inst, res.conversa_id, ev.telefone, ev.nome));
    }
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
  if (acao === 'foto') {
    // a tela pede a foto ao abrir uma conversa sem foto; quem pode ver a conversa (RLS) consegue
    const cid = String(corpo.conversa_id || '');
    if (!/^[0-9a-f-]{36}$/i.test(cid)) return json({ erro: 'Pedido inválido.' }, 400);
    const leitor = createClient(URL_SB, Deno.env.get('SUPABASE_ANON_KEY')!, { auth: { persistSession: false }, global: { headers: { Authorization: auth } } });
    const { data: cv } = await leitor.from('conversas').select('id, telefone, instancia_whatsapp_id').eq('id', cid).is('excluido_em', null).maybeSingle();
    if (!cv) return json({ erro: 'Sem permissão para esta conversa.' }, 403);
    const { data: inst } = await adm.from('instancias_whatsapp')
      .select('id, clinica_id, provedor_nao_oficial, api_url, nome_instancia').eq('id', cv.instancia_whatsapp_id).maybeSingle();
    const ok = inst ? await guardarFoto(inst, cid, String(cv.telefone || '')) : false;
    const { data: fin } = ok ? await adm.from('conversas').select('foto_contato_path').eq('id', cid).maybeSingle() : { data: null };
    return json({ foto: ok, foto_path: fin?.foto_contato_path || null });
  }
  if (acao === 'figurinha') {
    const mid = String(corpo.mensagem_id || '');
    if (!/^[0-9a-f-]{36}$/i.test(mid)) return json({ erro: 'Pedido inválido.' }, 400);
    return await salvarFigurinha(auth, mid, String(corpo.rotulo || ''));
  }
  const id = String(corpo.instancia_id || '');
  if (!['conectar', 'estado', 'desconectar', 'contatos'].includes(acao) || !/^[0-9a-f-]{36}$/i.test(id)) return json({ erro: 'Pedido inválido.' }, 400);

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

  // contatos: a agenda do telefone conectado (nome + número), para a tela "Importar contatos"
  if (acao === 'contatos') {
    if (inst.status !== 'conectado') return json({ erro: 'Conecte o WhatsApp pelo QR Code antes de importar os contatos.' }, 400);
    const ped = pedidoContatos(prov, i, seg as string);
    if (!ped) return json({ erro: 'A Z-API não disponibiliza a agenda de contatos. A importação funciona com a Evolution API.' }, 400);
    const r = await chamar(ped);
    if (!r.ok) return json({ erro: erroProvedor(r.status) }, 502);
    const nomes = lerContatos(r.dados);
    const contatos = Object.entries(nomes).map(([telefone, nome]) => ({ nome, telefone: '+' + telefone }))
      .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    return json({ contatos });
  }
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

// ---------- 3) vigia: consulta as instâncias conectadas (chamado pelo agendador do banco a cada minuto) ----------
// Só responde com o segredo guardado no cofre do banco (x-vigia-token). Se o provedor não responder, não derruba o status.
async function vigiar() {
  const { data: lista } = await adm.from('instancias_whatsapp')
    .select('id, clinica_id, status, numero, tipo_api, provedor_nao_oficial, api_url, nome_instancia')
    .eq('tipo_api', 'nao_oficial').is('excluido_em', null).in('status', ['conectado', 'conectando']);
  let verificadas = 0, semResposta = 0, caidas = 0;
  for (const inst of lista || []) {
    if (!inst.api_url || !inst.nome_instancia) continue;
    const prov = provedorDe(inst.provedor_nao_oficial as string);
    const { data: seg } = await adm.rpc('ler_segredo', { p_clinica: inst.clinica_id, p_provedor: 'whatsapp_nao_oficial' });
    if (!seg) continue;
    const st = await chamar(pedidoEstado(prov, { api_url: String(inst.api_url), nome_instancia: String(inst.nome_instancia) }, String(seg)));
    if (!st.ok && st.status !== 404) { semResposta++; continue; }
    const estado = st.ok ? lerEstado(prov, st.dados) : 'desconectado';
    verificadas++;
    if (estado === 'desconectado') caidas++;
    if (estado !== inst.status) await gravarConexao(inst, estado);
  }
  return { verificadas, sem_resposta: semResposta, caidas };
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ erro: 'Use POST' }, 405);
  const u = new URL(req.url);
  const id = u.searchParams.get('i'), token = u.searchParams.get('t');
  try {
    const segredoVigia = req.headers.get('x-vigia-token');
    if (segredoVigia !== null) {
      const { data: ok } = await adm.rpc('vigia_token_valido', { p_token: segredoVigia });
      if (!ok) return json({ erro: 'Não autorizado.' }, 401);
      const corpo = await req.json().catch(() => ({})) as Record<string, unknown>;
      // { acao: 'contatos' } sincroniza a agenda; sem ação, confere as conexões
      return json(corpo.acao === 'contatos' ? await sincronizarContatos() : await vigiar());
    }
    if (id && token) return await webhook(req, id, token);
    return await gestao(req);
  } catch (e) {
    console.error('[whatsapp] erro', (e as Error).name);
    return json({ erro: 'Erro inesperado na conexão do WhatsApp.' }, 500);
  }
});
