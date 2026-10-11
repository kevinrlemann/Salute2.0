// =====================================================================
// SALUTE 02 · WhatsApp não oficial: tradução dos provedores (Evolution e Z-API)
// Sem dependências: dá para testar com node --experimental-strip-types.
// =====================================================================

export type Provedor = 'evolution' | 'zapi';

// evento no formato que public.n8n_ingerir_evento entende
export type Evento = {
  // mensagem e status vão ao banco (n8n_ingerir_evento); reacao, apagar e editar são tratados pela função
  tipo: 'mensagem' | 'status' | 'reacao' | 'apagar' | 'editar';
  id_externo: string;
  // id da mensagem alvo (reação, apagada, editada) ou da mensagem citada (resposta)
  alvo?: string;
  resposta_a?: string;
  telefone?: string;
  nome?: string;
  texto?: string;
  tipo_msg?: string;
  de_mim?: boolean;
  timestamp?: number;
  status?: string;
  // mídia recebida (não vai para o banco: a função baixa e guarda no armazenamento da clínica)
  midia?: { url?: string; mime?: string; nome?: string };
  // anúncio de onde veio a conversa (click-to-WhatsApp); não vai para o banco, a função guarda na conversa
  anuncio?: { titulo?: string; corpo?: string; url?: string; ctwa_clid?: string };
  // quando a mensagem traz contexto mas não traz anúncio: só os nomes dos campos (nunca o conteúdo)
  campos_contexto?: string;
};

// mudança de conexão do aparelho (QR lido, celular desconectado)
export type Conexao = { conexao: 'conectado' | 'conectando' | 'desconectado'; numero?: string };

type Obj = Record<string, unknown>;
const o = (v: unknown): Obj => (v && typeof v === 'object' && !Array.isArray(v) ? v as Obj : {});
const s = (v: unknown): string => (typeof v === 'string' ? v : typeof v === 'number' ? String(v) : '');
const digitos = (v: string) => v.replace(/\D/g, '');

// número de um JID do WhatsApp ("5519999999999@s.whatsapp.net"); grupo, canal e status não entram
export const telefoneDoJid = (jid: string): string | null => {
  if (!jid || /@(g\.us|broadcast|newsletter)$/.test(jid) || jid.startsWith('status@')) return null;
  const n = digitos(jid.split('@')[0].split(':')[0]);
  return n.length >= 8 ? n : null;
};

// ---------- Evolution API (v2) ----------
const MIDIA_EVOLUTION = ['imageMessage', 'videoMessage', 'audioMessage', 'documentMessage', 'documentWithCaptionMessage', 'stickerMessage', 'ptvMessage'];
const midiaEvolution = (m: Obj): Evento['midia'] => {
  for (const k of MIDIA_EVOLUTION) {
    let x = o(m[k]);
    if (k === 'documentWithCaptionMessage') x = o(o(x.message).documentMessage);
    if (Object.keys(x).length) return { mime: s(x.mimetype) || (k === 'stickerMessage' ? 'image/webp' : undefined), nome: s(x.fileName) || undefined };
  }
  return undefined;
};
// mensagens embrulhadas (visualização única, temporárias, com documento e legenda): abre até chegar na mensagem real
export const desembrulhar = (m: Obj): Obj => {
  let x = m;
  for (let i = 0; i < 4; i++) {
    const w = x.viewOnceMessage || x.viewOnceMessageV2 || x.viewOnceMessageV2Extension || x.ephemeralMessage || x.documentWithCaptionMessage;
    if (!w || !o(o(w).message) || !Object.keys(o(o(w).message)).length) break;
    x = o(o(w).message);
  }
  return x;
};
// cartão de contato (vCard): nome e telefones, sem o resto do cartão
const contatoDoVcard = (c: Obj): string => {
  const v = s(c.vcard);
  const nome = s(c.displayName) || (v.match(/^FN:(.+)$/m) || [])[1] || '';
  const tels = Array.from(v.matchAll(/^TEL[^:]*:(.+)$/gm)).map((x) => x[1].trim()).filter(Boolean);
  const unicos = Array.from(new Set(tels)).slice(0, 3);
  return [nome.trim(), unicos.join(' · ')].filter(Boolean).join(' · ');
};
const textoEvolution = (m: Obj): { texto: string; tipo: string } => {
  if (s(m.conversation)) return { texto: s(m.conversation), tipo: 'text' };
  if (s(o(m.extendedTextMessage).text)) return { texto: s(o(m.extendedTextMessage).text), tipo: 'text' };
  if (m.imageMessage) return { texto: s(o(m.imageMessage).caption), tipo: 'image' };
  if (m.videoMessage) return { texto: s(o(m.videoMessage).caption), tipo: 'video' };
  if (m.ptvMessage) return { texto: '', tipo: 'video' };
  if (m.audioMessage) return { texto: '', tipo: 'audio' };
  if (m.documentMessage) return { texto: s(o(m.documentMessage).caption) || s(o(m.documentMessage).fileName), tipo: 'document' };
  if (m.stickerMessage) return { texto: '', tipo: 'sticker' };
  if (s(o(m.buttonsResponseMessage).selectedDisplayText)) return { texto: s(o(m.buttonsResponseMessage).selectedDisplayText), tipo: 'text' };
  if (s(o(o(m.listResponseMessage)).title)) return { texto: s(o(m.listResponseMessage).title), tipo: 'text' };
  // localização (fixa ou em tempo real): vira um link de mapa
  const loc = o(m.locationMessage || m.liveLocationMessage);
  if (Object.keys(loc).length) {
    const lat = Number(loc.degreesLatitude), lng = Number(loc.degreesLongitude);
    const nome = [s(loc.name), s(loc.address)].filter(Boolean).join(', ');
    const link = Number.isFinite(lat) && Number.isFinite(lng) ? `https://maps.google.com/?q=${lat.toFixed(6)},${lng.toFixed(6)}` : '';
    return { texto: ['📍 Localização' + (m.liveLocationMessage ? ' em tempo real' : ''), nome, link].filter(Boolean).join('\n'), tipo: 'text' };
  }
  // cartão de contato (um ou vários)
  if (m.contactMessage) return { texto: '👤 Contato: ' + contatoDoVcard(o(m.contactMessage)), tipo: 'text' };
  if (m.contactsArrayMessage) {
    const lista = (Array.isArray(o(m.contactsArrayMessage).contacts) ? o(m.contactsArrayMessage).contacts as unknown[] : []).map((c) => contatoDoVcard(o(c))).filter(Boolean);
    return { texto: '👤 Contatos:\n' + lista.slice(0, 10).join('\n'), tipo: 'text' };
  }
  // enquete: pergunta e opções
  const poll = o(m.pollCreationMessage || m.pollCreationMessageV2 || m.pollCreationMessageV3);
  if (Object.keys(poll).length) {
    const ops = (Array.isArray(poll.options) ? poll.options as unknown[] : []).map((x) => s(o(x).optionName)).filter(Boolean);
    return { texto: '📊 Enquete: ' + s(poll.name) + (ops.length ? '\n• ' + ops.slice(0, 12).join('\n• ') : ''), tipo: 'text' };
  }
  if (m.eventMessage) return { texto: '📅 Evento: ' + s(o(m.eventMessage).name), tipo: 'text' };
  return { texto: '', tipo: 'outro' };
};
// id da mensagem citada (responder): vem no contextInfo de qualquer parte da mensagem
const citadaEvolution = (m: Obj): string | undefined => {
  for (const v of Object.values(m)) {
    const id = s(o(o(v).contextInfo).stanzaId);
    if (id) return id;
  }
  return undefined;
};

// anúncio do clique no WhatsApp: vem no contextInfo.externalAdReply de alguma parte da mensagem
let avisosContexto = 0;
const anuncioEvolution = (d: Obj): Evento['anuncio'] => {
  const cis: Obj[] = [];
  for (const v of Object.values(o(d.message))) {
    const ci = o(o(v).contextInfo);
    if (Object.keys(ci).length) cis.push(ci);
  }
  const topo = o(d.contextInfo);
  if (Object.keys(topo).length) cis.push(topo);
  for (const ci of cis) {
    const ad = o(ci.externalAdReply);
    if (Object.keys(ad).length) {
      return {
        titulo: s(ad.title) || undefined, corpo: s(ad.body) || undefined, url: s(ad.sourceUrl) || undefined,
        ctwa_clid: s(ci.ctwaClid) || s(ad.ctwaClid) || undefined,
      };
    }
  }
  return undefined;
};

// nomes dos campos do contexto (sem conteúdo): para conferir o formato real quando não vier anúncio
const camposContexto = (d: Obj): string | undefined => {
  const nomes: string[] = [];
  for (const v of Object.values(o(d.message))) {
    const ci = o(o(v).contextInfo);
    if (Object.keys(ci).length) nomes.push(Object.keys(ci).join(','));
  }
  const topo = o(d.contextInfo);
  if (Object.keys(topo).length) nomes.push(Object.keys(topo).join(','));
  return nomes.length ? nomes.join(' | ').slice(0, 300) : undefined;
};

const STATUS_EVOLUTION: Record<string, string> = {
  SERVER_ACK: 'sent', DELIVERY_ACK: 'delivered', READ: 'read', PLAYED: 'read', ERROR: 'failed',
  '1': 'sent', '2': 'sent', '3': 'delivered', '4': 'read', '5': 'read', '0': 'failed',
};

export function lerEvolution(corpo: Obj): Array<Evento | Conexao> {
  const ev = s(corpo.event).toLowerCase().replace(/_/g, '.');
  const lista = Array.isArray(corpo.data) ? corpo.data as unknown[] : [corpo.data];
  const out: Array<Evento | Conexao> = [];
  for (const item of lista) {
    const d = o(item);
    if (ev === 'messages.upsert') {
      const k = o(d.key);
      let jid = s(k.remoteJid);
      // conversas com identificador oculto (@lid): o número real vem em outro campo
      if (jid.endsWith('@lid')) jid = s(k.remoteJidAlt) || s(k.senderPn) || s(d.senderPn) || jid;
      const tel = telefoneDoJid(jid);
      const id = s(k.id);
      if (!tel || !id) continue;
      const m = desembrulhar(o(d.message));
      const deMim = k.fromMe === true;
      // reação a uma mensagem (emoji vazio = reação retirada)
      const re = o(m.reactionMessage);
      if (Object.keys(re).length) {
        const alvo = s(o(re.key).id);
        if (alvo) out.push({ tipo: 'reacao', id_externo: id, alvo, telefone: tel, texto: s(re.text), de_mim: deMim });
        continue;
      }
      // mensagem apagada para todos
      const pr = o(m.protocolMessage);
      if (Object.keys(pr).length) {
        const tipoPr = s(pr.type).toUpperCase();
        const alvo = s(o(pr.key).id);
        if (alvo && (tipoPr === 'REVOKE' || tipoPr === '0')) out.push({ tipo: 'apagar', id_externo: id, alvo, telefone: tel, de_mim: deMim });
        else if (alvo && (tipoPr === 'MESSAGE_EDIT' || tipoPr === '14')) {
          const { texto } = textoEvolution(desembrulhar(o(pr.editedMessage)));
          if (texto) out.push({ tipo: 'editar', id_externo: id, alvo, telefone: tel, texto, de_mim: deMim });
        }
        continue;
      }
      // edição no formato novo (editedMessage com protocolMessage dentro)
      const ed = o(o(o(m.editedMessage).message).protocolMessage);
      if (Object.keys(ed).length) {
        const alvo = s(o(ed.key).id);
        const { texto } = textoEvolution(desembrulhar(o(ed.editedMessage)));
        if (alvo && texto) out.push({ tipo: 'editar', id_externo: id, alvo, telefone: tel, texto, de_mim: deMim });
        continue;
      }
      const { texto, tipo } = textoEvolution(m);
      const anuncio = anuncioEvolution(d);
      out.push({
        tipo: 'mensagem', id_externo: id, telefone: tel, nome: s(d.pushName) || undefined,
        texto, tipo_msg: tipo, de_mim: deMim, timestamp: Number(d.messageTimestamp) || undefined,
        midia: midiaEvolution(m), anuncio, resposta_a: citadaEvolution(m),
        campos_contexto: anuncio ? undefined : camposContexto(d),
      });
    } else if (ev === 'messages.update') {
      const id = s(d.keyId) || s(o(d.key).id) || s(d.messageId);
      const st = STATUS_EVOLUTION[s(d.status).toUpperCase()];
      if (id && st) out.push({ tipo: 'status', id_externo: id, status: st });
    } else if (ev === 'connection.update') {
      const st = s(d.state).toLowerCase();
      const numero = telefoneDoJid(s(d.wuid)) || undefined;
      out.push({ conexao: st === 'open' ? 'conectado' : st === 'connecting' ? 'conectando' : 'desconectado', numero });
    }
  }
  return out;
}

// ---------- Z-API ----------
const STATUS_ZAPI: Record<string, string> = { SENT: 'sent', RECEIVED: 'delivered', READ: 'read', READ_BY_ME: '', PLAYED: 'read', FAILED: 'failed' };

export function lerZapi(d: Obj): Array<Evento | Conexao> {
  const tipo = s(d.type);
  if (tipo === 'ReceivedCallback') {
    if (d.isGroup === true || d.isNewsletter === true || d.broadcast === true) return [];
    const tel = digitos(s(d.phone));
    const id = s(d.messageId);
    if (tel.length < 8 || !id) return [];
    let texto = s(o(d.text).message), t = 'text';
    let midia: Evento['midia'];
    if (d.image) { texto = s(o(d.image).caption); t = 'image'; midia = { url: s(o(d.image).imageUrl), mime: s(o(d.image).mimeType) }; }
    else if (d.video) { texto = s(o(d.video).caption); t = 'video'; midia = { url: s(o(d.video).videoUrl), mime: s(o(d.video).mimeType) }; }
    else if (d.audio) { texto = ''; t = 'audio'; midia = { url: s(o(d.audio).audioUrl), mime: s(o(d.audio).mimeType) }; }
    else if (d.document) {
      texto = s(o(d.document).caption) || s(o(d.document).fileName); t = 'document';
      midia = { url: s(o(d.document).documentUrl), mime: s(o(d.document).mimeType), nome: s(o(d.document).fileName) || undefined };
    }
    else if (d.sticker) { texto = ''; t = 'sticker'; }
    else if (!texto && s(o(d.buttonsResponseMessage).message)) texto = s(o(d.buttonsResponseMessage).message);
    else if (!texto && s(o(d.listResponseMessage).title)) texto = s(o(d.listResponseMessage).title);
    else if (!texto) t = 'outro';
    const ms = Number(d.momment) || 0;
    return [{
      tipo: 'mensagem', id_externo: id, telefone: tel, nome: s(d.senderName) || s(d.chatName) || undefined,
      texto, tipo_msg: t, de_mim: d.fromMe === true, timestamp: ms ? Math.floor(ms / 1000) : undefined,
      ...(midia && midia.url ? { midia } : {}),
    }];
  }
  if (tipo === 'MessageStatusCallback') {
    const st = STATUS_ZAPI[s(d.status).toUpperCase()];
    const ids = Array.isArray(d.ids) ? d.ids.map(s) : [s(d.id)];
    return st ? ids.filter(Boolean).map((id) => ({ tipo: 'status' as const, id_externo: id, status: st })) : [];
  }
  if (tipo === 'ConnectedCallback') return [{ conexao: 'conectado', numero: digitos(s(d.phone)) || undefined }];
  if (tipo === 'DisconnectedCallback') return [{ conexao: 'desconectado' }];
  return [];
}

export const lerEventos = (p: Provedor, corpo: unknown) => (p === 'zapi' ? lerZapi(o(corpo)) : lerEvolution(o(corpo)));

// ---------- chamadas de gestão (QR Code, estado, webhook) ----------
export type Inst = { api_url: string; nome_instancia?: string | null };
export type Pedido = { url: string; method: string; headers: Record<string, string>; body?: string };

// segredo da Z-API guardado como "token|client-token" (o client-token é opcional)
const zapiTokens = (seg: string) => {
  const [tok, cli] = seg.split('|');
  return { tok: (tok || '').trim(), cli: (cli || '').trim() };
};
const base = (i: Inst) => i.api_url.replace(/\/+$/, '');

export function pedidoEstado(p: Provedor, i: Inst, seg: string): Pedido {
  if (p === 'zapi') {
    const { tok, cli } = zapiTokens(seg);
    return { url: `${base(i)}/token/${tok}/status`, method: 'GET', headers: cli ? { 'Client-Token': cli } : {} };
  }
  return { url: `${base(i)}/instance/connectionState/${encodeURIComponent(i.nome_instancia || '')}`, method: 'GET', headers: { apikey: seg } };
}

export function lerEstado(p: Provedor, r: unknown): 'conectado' | 'conectando' | 'desconectado' {
  const d = o(r);
  if (p === 'zapi') return d.connected === true ? 'conectado' : 'desconectado';
  const st = s(o(d.instance).state || d.state).toLowerCase();
  return st === 'open' ? 'conectado' : st === 'connecting' ? 'conectando' : 'desconectado';
}

export function pedidosConectar(p: Provedor, i: Inst, seg: string, webhook: string): { criar?: Pedido; webhook: Pedido; qr: Pedido } {
  if (p === 'zapi') {
    const { tok, cli } = zapiTokens(seg);
    const h: Record<string, string> = { 'content-type': 'application/json', ...(cli ? { 'Client-Token': cli } : {}) };
    return {
      webhook: { url: `${base(i)}/token/${tok}/update-every-webhooks`, method: 'PUT', headers: h, body: JSON.stringify({ value: webhook, notifySentByMe: true }) },
      qr: { url: `${base(i)}/token/${tok}/qr-code/image`, method: 'GET', headers: h },
    };
  }
  const nome = i.nome_instancia || '';
  const h = { apikey: seg, 'content-type': 'application/json' };
  const eventos = ['MESSAGES_UPSERT', 'MESSAGES_UPDATE', 'CONNECTION_UPDATE'];
  return {
    criar: { url: `${base(i)}/instance/create`, method: 'POST', headers: h, body: JSON.stringify({ instanceName: nome, integration: 'WHATSAPP-BAILEYS', qrcode: true }) },
    webhook: {
      url: `${base(i)}/webhook/set/${encodeURIComponent(nome)}`, method: 'POST', headers: h,
      body: JSON.stringify({ webhook: { enabled: true, url: webhook, byEvents: false, base64: false, events: eventos } }),
    },
    qr: { url: `${base(i)}/instance/connect/${encodeURIComponent(nome)}`, method: 'GET', headers: h },
  };
}

// imagem do QR Code (data URL) na resposta do provedor
export function lerQr(p: Provedor, r: unknown): string | null {
  const d = o(r);
  const v = p === 'zapi' ? s(d.value) : s(d.base64) || s(o(d.qrcode).base64);
  if (!v) return null;
  return v.startsWith('data:image') ? v : `data:image/png;base64,${v}`;
}

export function pedidoDesconectar(p: Provedor, i: Inst, seg: string): Pedido {
  if (p === 'zapi') {
    const { tok, cli } = zapiTokens(seg);
    return { url: `${base(i)}/token/${tok}/disconnect`, method: 'GET', headers: cli ? { 'Client-Token': cli } : {} };
  }
  return { url: `${base(i)}/instance/logout/${encodeURIComponent(i.nome_instancia || '')}`, method: 'DELETE', headers: { apikey: seg } };
}

export const provedorDe = (v: string | null | undefined): Provedor => (/^z[- ]?api$/i.test((v || '').trim()) ? 'zapi' : 'evolution');

// pedido para baixar a mídia de uma mensagem recebida
export function pedidoMidia(p: Provedor, i: Inst, seg: string, idMensagem: string, url?: string): Pedido | null {
  if (p === 'zapi') return url && /^https:\/\//i.test(url) ? { url, method: 'GET', headers: {} } : null;
  return {
    url: `${base(i)}/chat/getBase64FromMediaMessage/${encodeURIComponent(i.nome_instancia || '')}`, method: 'POST',
    headers: { apikey: seg, 'content-type': 'application/json' },
    body: JSON.stringify({ message: { key: { id: idMensagem } }, convertToMp4: false }),
  };
}

// foto de perfil do contato: pede o endereço da imagem (Evolution v2) e lê a resposta
export function pedidoFoto(p: Provedor, i: Inst, seg: string, telefone: string): Pedido | null {
  if (p === 'zapi') return null;
  return {
    url: `${base(i)}/chat/fetchProfilePictureUrl/${encodeURIComponent(i.nome_instancia || '')}`, method: 'POST',
    headers: { apikey: seg, 'content-type': 'application/json' },
    body: JSON.stringify({ number: digitos(telefone) }),
  };
}

// contatos da agenda do aparelho (Evolution v2): devolve a lista completa ou só um número
export function pedidoContatos(p: Provedor, i: Inst, seg: string, telefone?: string): Pedido | null {
  if (p === 'zapi') return null;
  const where = telefone ? { remoteJid: digitos(telefone) + '@s.whatsapp.net' } : {};
  return {
    url: `${base(i)}/chat/findContacts/${encodeURIComponent(i.nome_instancia || '')}`, method: 'POST',
    headers: { apikey: seg, 'content-type': 'application/json' },
    body: JSON.stringify({ where }),
  };
}

// nomes salvos na agenda, por telefone (só dígitos). Grupos, canais e contatos sem nome não entram.
export function lerContatos(r: unknown): Record<string, string> {
  const lista = Array.isArray(r) ? r as unknown[] : Array.isArray(o(r).contacts) ? o(r).contacts as unknown[] : [];
  const out: Record<string, string> = {};
  for (const item of lista) {
    const c = o(item);
    if (c.isGroup === true || c.isSaved === false) continue;
    const tel = telefoneDoJid(s(c.remoteJid) || s(c.id));
    const nome = (s(c.name) || s(c.pushName) || s(c.verifiedName)).trim();
    if (!tel || !nome || /^\+?\d[\d\s().-]*$/.test(nome)) continue;
    out[tel] = nome.slice(0, 120);
  }
  return out;
}

export function lerFotoUrl(r: unknown): string | null {
  const d = o(r);
  const u = s(d.profilePictureUrl) || s(d.profilePicUrl) || s(d.url);
  return /^https:\/\//i.test(u) ? u : null;
}

const EXT: Record<string, string> = {
  'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'video/mp4': 'mp4', 'audio/ogg': 'ogg', 'audio/mpeg': 'mp3',
  'audio/mp4': 'm4a', 'application/pdf': 'pdf',
};
// nome seguro para o arquivo guardado
export function nomeArquivo(tipo: string, mime: string, nome?: string): string {
  const limpo = (nome || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^\w.-]+/g, '_').slice(-80);
  if (limpo && /\.\w{2,5}$/.test(limpo)) return limpo;
  const base = (mime || '').split(';')[0].trim();
  return (limpo || tipo || 'arquivo') + '.' + (EXT[base] || base.split('/')[1] || 'bin');
}
