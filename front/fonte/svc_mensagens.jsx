/* =====================================================================
   SERVIÇOS DE DADOS: Mensagens (pacientes e equipe), CRM e notificações
   ===================================================================== */
const MSG_LISTA = makeStore(0);
const NOTIF = makeStore({ naoLidas: 0 });
const MSG_CONV = {};   // id da conversa -> registro do banco
const MSG_LIDA = {};   // chave do chat -> carregado
if (SB_ON) { INBOX.length = 0; EQUIPE.length = 0; LEADS_STORE.v = []; CHAT_STORE.v = {}; }

// hora na lista de conversas, sempre no horário de Brasília
const horaLista = (ts) => {
  if (!ts) return '';
  const dia = BR.diaDe(ts);
  if (dia === TODAY_ISO) return BR.hm(ts);
  if (dia === isoOf(addD(TODAY, -1))) return 'Ontem';
  return BR.dataTela(dia);
};
const KIND_DB = { text: 'texto', image: 'imagem', video: 'video', audio: 'audio', file: 'documento', sticker: 'figurinha' };
const KIND_UI = { texto: 'text', imagem: 'image', video: 'video', audio: 'audio', documento: 'file', figurinha: 'sticker', sistema: 'text' };
const TICK = { pendente: 'sent', enviada: 'sent', entregue: 'delivered', lida: 'read', falhou: 'sent' };
const ehUuid = (x) => typeof x === 'string' && /^[0-9a-f-]{36}$/.test(x);
const figurinhaUrl = (f) => (f ? waSticker(f.emoji || '✨', f.rotulo || '', f.cor_fundo || '#E7F0FF') : null);
let FIGS = [];

/* ---------- Listas de conversas ---------- */
const convTela = (c) => ({ id: c.id, n: c.nome_contato || (c.paciente && c.paciente.nome) || BR.telTela(c.telefone), m: c.ultima_mensagem_previa || '', t: horaLista(c.ultima_mensagem_em), u: c.nao_lidas || 0,
  pacId: c.paciente_id, tel: c.telefone, leadId: c.lead_id, ia: c.ia_ativa, ord: c.ultima_mensagem_em || c.criado_em });
function publicarInbox(list) { substituir(INBOX, list.sort((a, b) => String(b.ord).localeCompare(String(a.ord)))); MSG_LISTA.v = MSG_LISTA.v + 1; avisar(MSG_LISTA); }
CARGAS.mensagens = async () => {
  await carregar('catalogos');
  const [convs, canais, figs] = await Promise.all([
    DB.ler(DB.sel('conversas', '*, paciente:pacientes(nome)').order('ultima_mensagem_em', { ascending: false, nullsFirst: false }).limit(1000)),
    DB.ler(DB.sel('canais_equipe', 'id,nome,tipo,funcao,criado_em,participantes:participantes_canal(usuario_id,ultima_leitura_em,excluido_em)').order('criado_em')).catch(() => []),
    DB.ler(SB.from('figurinhas').select('id,rotulo,emoji,cor_fundo,ordem,clinica_id').is('excluido_em', null).order('ordem')).catch(() => []),
  ]);
  FIGS = figs;
  convs.forEach((c) => { MSG_CONV[c.id] = c; });
  publicarInbox(convs.map(convTela));
  await carregarCanais(canais);
  tempoReal('mensagens', ['mensagens', 'conversas', 'mensagens_equipe', 'reacoes_mensagem', 'canais_equipe'], aoMudarMensagens);
};
async function carregarCanais(canais) {
  const ult = canais.length ? await DB.ler(DB.sel('mensagens_equipe', 'canal_id,texto,tipo,enviada_em,autor_usuario_id,autor_nome,apagada').order('enviada_em', { ascending: false }).limit(2000)).catch(() => []) : [];
  const lista = canais.map((c) => {
    const ms = ult.filter((m) => m.canal_id === c.id);
    const eu = (c.participantes || []).find((p) => p.usuario_id === UID() && !p.excluido_em);
    const lido = eu && eu.ultima_leitura_em ? new Date(eu.ultima_leitura_em) : null;
    const u = ms.filter((m) => m.autor_usuario_id !== UID() && (!lido || new Date(m.enviada_em) > lido)).length;
    const l = ms[0];
    const prev = l ? (l.apagada ? 'Mensagem apagada' : (c.tipo === 'grupo' && l.autor_nome && l.autor_usuario_id !== UID() ? l.autor_nome + ': ' : '') + (l.texto || waPreview({ kind: KIND_UI[l.tipo] }))) : '';
    return { id: c.id, n: c.nome, r: c.funcao || (c.tipo === 'grupo' ? 'Grupo' : ''), m: prev, t: l ? horaLista(l.enviada_em) : '', u, grupo: c.tipo === 'grupo', ord: l ? l.enviada_em : c.criado_em };
  });
  substituir(EQUIPE, lista.sort((a, b) => String(b.ord).localeCompare(String(a.ord))));
  MSG_LISTA.v = MSG_LISTA.v + 1; avisar(MSG_LISTA);
}

/* ---------- Mensagens de um chat ---------- */
const chaveConv = (id) => 'conv:' + id;
const idDaChave = (k) => String(k).split(':')[1];
async function msgTela(rows, equipe) {
  const paths = []; rows.forEach((r) => (r.anexos || []).filter((a) => !a.excluido_em).forEach((a) => paths.push(a.arquivo_path)));
  const urls = {};
  if (paths.length) { const { data } = await SB.storage.from('mensagens').createSignedUrls(paths, 3600); (data || []).forEach((u) => { if (u.signedUrl) urls[u.path] = u.signedUrl; }); }
  const byId = {};
  const out = rows.map((r) => {
    const an = (r.anexos || []).find((a) => !a.excluido_em);
    const kind = KIND_UI[r.tipo] || 'text';
    const fig = r.figurinha_id ? FIGS.find((f) => f.id === r.figurinha_id) : null;
    const reacoes = (r.reacoes || []).filter((x) => !x.excluido_em).sort((a, b) => String(b.criado_em).localeCompare(String(a.criado_em)));
    const me = equipe ? r.autor_usuario_id === UID() : r.direcao === 'enviada';
    const m = { id: r.id, me, t: BR.hm(r.enviada_em), s: TICK[r.status_entrega] || 'read', kind, text: kind === 'text' ? r.texto : (r.legenda || r.texto || undefined),
      url: kind === 'sticker' ? figurinhaUrl(fig) : an ? urls[an.arquivo_path] : undefined, name: an ? an.nome_arquivo : undefined, size: an ? Number(an.tamanho_bytes || 0) : undefined, dur: an ? Number(an.duracao_segundos || 0) : undefined,
      label: fig ? fig.rotulo : undefined, react: reacoes[0] ? reacoes[0].emoji : null, deleted: !!r.apagada && r.apagada_para !== 'so_para_mim', ia: !!r.enviada_por_ia,
      who: equipe && !me && r.grupo ? r.autor_nome : undefined, replyId: r.resposta_a_mensagem_id };
    byId[r.id] = m; return m;
  }).filter((m, i) => !(rows[i].apagada && rows[i].apagada_para === 'so_para_mim' && rows[i].apagada_por === UID()));
  out.forEach((m) => { if (m.replyId && byId[m.replyId]) { const o = byId[m.replyId]; m.reply = { id: o.id, me: o.me, prev: waPreview(o) }; } });
  return out;
}
const SEL_MSG = 'id,direcao,tipo,texto,legenda,enviada_em,enviada_por_ia,status_entrega,resposta_a_mensagem_id,figurinha_id,apagada,apagada_para,apagada_por,anexos:anexos_mensagem(arquivo_path,nome_arquivo,mime_type,tamanho_bytes,duracao_segundos,excluido_em),reacoes:reacoes_mensagem(emoji,usuario_id,criado_em,excluido_em)';
const SEL_MSG_EQ = 'id,canal_id,autor_usuario_id,autor_nome,tipo,texto,legenda,enviada_em,resposta_a_mensagem_id,figurinha_id,apagada,apagada_para,anexos:anexos_mensagem(arquivo_path,nome_arquivo,mime_type,tamanho_bytes,duracao_segundos,excluido_em),reacoes:reacoes_mensagem(emoji,usuario_id,criado_em,excluido_em)';
async function carregarChat(chave) {
  if (!SB_ON || !chave) return;
  const [tipo, id] = String(chave).split(':');
  if (tipo === 'pacc') { CHAT_STORE.v = { ...CHAT_STORE.v, [chave]: [] }; avisar(CHAT_STORE); return; }
  if (!ehUuid(id)) return;
  let lista;
  if (tipo === 'eq') {
    const canal = EQUIPE.find((c) => c.id === id);
    const rows = await DB.ler(DB.sel('mensagens_equipe', SEL_MSG_EQ).eq('canal_id', id).order('enviada_em').limit(1000));
    lista = await msgTela(rows.map((r) => ({ ...r, grupo: canal && canal.grupo })), true);
  } else {
    const rows = await DB.ler(DB.sel('mensagens', SEL_MSG).eq('conversa_id', id).order('enviada_em').limit(1000));
    lista = await msgTela(rows, false);
  }
  MSG_LIDA[chave] = true;
  CHAT_STORE.v = { ...CHAT_STORE.v, [chave]: lista }; avisar(CHAT_STORE);
}
function abrirChat(chave) { if (!SB_ON || MSG_LIDA[chave]) return; MSG_LIDA[chave] = true; carregarChat(chave).catch(() => { delete MSG_LIDA[chave]; }); }

/* ---------- Tempo real ---------- */
async function aoMudarMensagens(t, ev) {
  const n = ev.new || {}, o = ev.old || {};
  if (t === 'conversas') {
    if (n.id) { MSG_CONV[n.id] = { ...(MSG_CONV[n.id] || {}), ...n }; const pac = n.paciente_id ? PAC.find((p) => p.dbId === n.paciente_id) : null; const tela = convTela({ ...n, paciente: pac ? { nome: pac.nome } : null }); publicarInbox([...INBOX.filter((c) => c.id !== n.id), tela].filter((c) => !(MSG_CONV[c.id] || {}).excluido_em)); }
    return;
  }
  if (t === 'mensagens') {
    const ch = chaveConv(n.conversa_id || o.conversa_id);
    if (CHAT_STORE.v[ch]) await carregarChat(ch);
    if (ev.eventType === 'INSERT' && n.direcao === 'recebida') { const c = INBOX.find((x) => x.id === n.conversa_id); notifyIncoming(c ? c.n : BR.telTela(MSG_CONV[n.conversa_id] && MSG_CONV[n.conversa_id].telefone), n.texto || waPreview({ kind: KIND_UI[n.tipo] })); }
    return;
  }
  if (t === 'mensagens_equipe' || t === 'canais_equipe') {
    const canais = await DB.ler(DB.sel('canais_equipe', 'id,nome,tipo,funcao,criado_em,participantes:participantes_canal(usuario_id,ultima_leitura_em,excluido_em)').order('criado_em')).catch(() => null);
    if (canais) await carregarCanais(canais);
    const id = n.canal_id || o.canal_id; if (id && CHAT_STORE.v['eq:' + id]) await carregarChat('eq:' + id);
    if (t === 'mensagens_equipe' && ev.eventType === 'INSERT' && n.autor_usuario_id !== UID()) notifyIncoming(n.autor_nome || 'Equipe', n.texto || 'Nova mensagem');
    return;
  }
  if (t === 'reacoes_mensagem') {
    Object.keys(CHAT_STORE.v).forEach((k) => { if (MSG_LIDA[k]) carregarChat(k); });
  }
}

/* ---------- Ações ---------- */
const MsgSvc = {
  chavePaciente(p) {
    if (!p || !p.dbId) return null;
    const tel = BR.tel(p.tel);
    const c = INBOX.find((x) => x.pacId === p.dbId) || (tel ? INBOX.find((x) => x.tel === tel) : null);
    return c ? chaveConv(c.id) : 'pacc:' + p.dbId;
  },
  async garantirConversaPaciente(p) {
    const k = MsgSvc.chavePaciente(p); if (k && k.startsWith('conv:')) return idDaChave(k);
    const tel = BR.tel(p.tel); if (!tel) throw new Error('Paciente sem WhatsApp cadastrado');
    const inst = CAT.v.instancia;
    const r = await DB.ins('conversas', { telefone: tel, nome_contato: p.nome, paciente_id: p.dbId, instancia_whatsapp_id: inst ? inst.id : null }, 'Não foi possível abrir a conversa');
    MSG_CONV[r.id] = r; publicarInbox([...INBOX, convTela({ ...r, paciente: { nome: p.nome } })]);
    return r.id;
  },
  async enviar(chave, msg, contato) {
    const local = { id: novoId(), me: true, t: nowHM2(), s: 'sent', ...msg };
    chatSet(chave, (l) => [...l, local]);
    try {
      let [tipo, id] = String(chave).split(':');
      if (tipo === 'pacc') {
        const p = PAC.find((x) => x.dbId === id); id = await MsgSvc.garantirConversaPaciente(p); tipo = 'conv';
        const nova = chaveConv(id); CHAT_STORE.v = { ...CHAT_STORE.v, [nova]: CHAT_STORE.v[chave] || [] }; MSG_LIDA[nova] = true; avisar(CHAT_STORE);
        chave = nova;
      }
      const fig = msg.kind === 'sticker' ? FIGS.find((f) => f.rotulo === msg.label) : null;
      const base = { id: local.id, tipo: KIND_DB[msg.kind || 'text'] || 'texto', texto: msg.kind === 'text' || !msg.kind ? msg.text : null, legenda: msg.kind !== 'text' && msg.text ? msg.text : null, resposta_a_mensagem_id: msg.reply && ehUuid(msg.reply.id) ? msg.reply.id : null, figurinha_id: fig ? fig.id : null };
      if (tipo === 'eq') await DB.ins('mensagens_equipe', { ...base, canal_id: id, autor_nome: quemSou() }, 'Mensagem não enviada');
      else await DB.ins('mensagens', { ...base, conversa_id: id, direcao: 'enviada', enviada_por_ia: false, status_entrega: 'pendente' }, 'Mensagem não enviada');
      if (msg.url && /^blob:/.test(msg.url) && msg.kind !== 'sticker') {
        const blob = await (await fetch(msg.url)).blob();
        const file = new File([blob], msg.name || 'arquivo', { type: blob.type || 'application/octet-stream' });
        const path = await ARQ.enviar('mensagens', (tipo === 'eq' ? 'equipe/' : 'conversas/') + id, file);
        await DB.ins('anexos_mensagem', { [tipo === 'eq' ? 'mensagem_equipe_id' : 'mensagem_id']: local.id, arquivo_path: path, nome_arquivo: msg.name || file.name, mime_type: file.type, tamanho_bytes: file.size, duracao_segundos: msg.dur || null }, 'Não foi possível enviar o arquivo');
      }
      if (tipo === 'eq') await SB.from('participantes_canal').upsert({ clinica_id: CLI(), canal_id: id, usuario_id: UID(), ultima_leitura_em: agoraIso() }, { onConflict: 'canal_id,usuario_id', ignoreDuplicates: false });
    } catch (e) {
      chatSet(chave, (l) => l.filter((x) => x.id !== local.id));
    }
  },
  enviarTextoPaciente(p, texto, chave) { return MsgSvc.enviar(chave || MsgSvc.chavePaciente(p), { kind: 'text', text: texto }, p.nome); },
  async reagir(chave, m, emoji) {
    const eq = String(chave).startsWith('eq:'); const col = eq ? 'mensagem_equipe_id' : 'mensagem_id';
    const novo = m.react === emoji ? null : emoji;
    chatSet(chave, (l) => l.map((x) => (x.id === m.id ? { ...x, react: novo } : x)));
    if (!ehUuid(m.id)) return;
    await DB.updWhere('reacoes_mensagem', { excluido_em: agoraIso() }, { [col]: m.id, usuario_id: UID(), excluido_em: null }).catch(() => {});
    if (novo) await DB.ins('reacoes_mensagem', { [col]: m.id, emoji: novo, usuario_id: UID() }, 'Não foi possível reagir').catch(() => {});
  },
  async apagar(chave, m) {
    const eq = String(chave).startsWith('eq:');
    chatSet(chave, (l) => l.map((x) => (x.id === m.id ? { ...x, deleted: true, react: null } : x)));
    if (!ehUuid(m.id)) return;
    await DB.upd(eq ? 'mensagens_equipe' : 'mensagens', m.id, { apagada: true, apagada_para: m.me ? 'todos' : 'so_para_mim', apagada_em: agoraIso(), ...(eq ? {} : { apagada_por: UID() }) }, 'Não foi possível apagar').catch(() => {});
  },
  async marcarLida(c, equipe) {
    if (!SB_ON || !c) return;
    if (equipe) { c.u = 0; MSG_LISTA.v++; avisar(MSG_LISTA); await SB.from('participantes_canal').upsert({ clinica_id: CLI(), canal_id: c.id, usuario_id: UID(), ultima_leitura_em: agoraIso() }, { onConflict: 'canal_id,usuario_id', ignoreDuplicates: false }); return; }
    if (c.u) { c.u = 0; MSG_LISTA.v++; avisar(MSG_LISTA); }
    await SB.rpc('marcar_conversa_lida', { p_conversa: c.id });
    carregarNotificacoes();
  },
  async pacienteDaConversa(c) {
    let p = c.pacId ? PAC.find((x) => x.dbId === c.pacId) : null;
    if (!p && c.tel) p = PAC.find((x) => BR.tel(x.tel) === c.tel);
    if (!p) {
      await carregar('pacientes'); p = c.pacId ? PAC.find((x) => x.dbId === c.pacId) : PAC.find((x) => BR.tel(x.tel) === c.tel);
    }
    if (!p) p = await PacSvc.criar({ nome: c.n && !/^\(?\+?\d/.test(c.n) ? c.n : 'Contato ' + BR.telTela(c.tel), tel: BR.telTela(c.tel), tipo: 'Particular' }, 'equipe');
    if (p && p.dbId && c.id && !c.pacId) { c.pacId = p.dbId; DB.upd('conversas', c.id, { paciente_id: p.dbId }).catch(() => {}); }
    return p;
  },
};

/* ---------- CRM ---------- */
const leadTela = (l) => {
  const ag = l.agendamento ? l.agendamento.inicio : l.agendado_para;
  return { id: l.id, dbId: l.id, nome: l.nome || '', tel: BR.telTela(l.telefone), proc: l.interesse || (l.procedimento ? l.procedimento.nome : ''), min: l.ultima_interacao_em ? Math.max(0, Math.round((Date.now() - new Date(l.ultima_interacao_em)) / 60000)) : 0,
    ia: l.ia_ativa, stage: l.etapa ? l.etapa.chave : 'novo', at: ag ? new Date(ag).getTime() : undefined, motivo: l.motivo ? l.motivo.nome : undefined, conversaId: l.conversa_id, pacId: l.paciente_id };
};
const SEL_LEAD = '*, etapa:etapas_funil(chave), motivo:motivos_perda(nome), procedimento:procedimentos(nome), agendamento:agendamentos!agendamento_id(inicio)';
CARGAS.crm = async () => {
  await carregar('catalogos');
  const rows = await DB.ler(DB.sel('leads', SEL_LEAD).order('ordem').order('criado_em', { ascending: false }).limit(2000));
  LEADS_STORE.v = rows.map(leadTela); avisar(LEADS_STORE);
  // etapas e motivos da clínica
  const et = CAT.v.etapas || []; if (et.length) substituir(CRM_STAGES, et.map((e) => ({ id: e.chave, label: e.nome, c: e.cor || '#1F5EFF', dbId: e.id })));
  if ((CAT.v.motivos || []).length) substituir(CRM_MOTIVOS, CAT.v.motivos.filter((m) => m.ativo).map((m) => m.nome));
  tempoReal('crm', ['leads'], async (t, ev) => {
    const id = (ev.new && ev.new.id) || (ev.old && ev.old.id); if (!id) return;
    const r = await DB.ler(DB.sel('leads', SEL_LEAD).eq('id', id)).catch(() => []);
    const resto = LEADS_STORE.v.filter((x) => x.id !== id);
    LEADS_STORE.v = r[0] ? [...resto, leadTela(r[0])] : resto; avisar(LEADS_STORE);
  });
};
const CrmSvc = {
  mover(l, para, motivo) {
    const et = (CAT.v.etapas || []).find((e) => e.chave === para); const mt = motivo ? (CAT.v.motivos || []).find((m) => m.nome === motivo) : null;
    return DB.upd('leads', l.dbId, { etapa_id: et ? et.id : null, motivo_perda_id: mt ? mt.id : null, motivo_perda_detalhe: null }, 'Não foi possível mover o lead');
  },
  ia(l, ativa) { return DB.upd('leads', l.dbId, { ia_ativa: ativa, ia_pausada_em: ativa ? null : agoraIso(), ia_pausada_por: ativa ? null : UID() }, 'Não foi possível mudar a IA deste lead'); },
  async paciente(l) {
    if (l.pacId) { await carregar('pacientes'); const p = PAC.find((x) => x.dbId === l.pacId); if (p) return p; }
    await carregar('pacientes');
    const tel = BR.tel(l.tel); let p = PAC.find((x) => BR.tel(x.tel) === tel);
    if (!p) p = await PacSvc.criar({ nome: l.nome || 'Contato ' + l.tel, tel: l.tel, tipo: 'Particular' }, 'equipe');
    DB.upd('leads', l.dbId, { paciente_id: p.dbId }).catch(() => {});
    if (l.conversaId) DB.upd('conversas', l.conversaId, { paciente_id: p.dbId }).catch(() => {});
    l.pacId = p.dbId;
    return p;
  },
};

/* ---------- Notificações (sino) ---------- */
async function carregarNotificacoes() {
  if (!SB_ON || !CLI()) return;
  const { count } = await SB.from('notificacoes').select('id', { count: 'exact', head: true }).eq('clinica_id', CLI()).eq('usuario_id', UID()).eq('lida', false).is('excluido_em', null);
  NOTIF.v = { naoLidas: count || 0 }; avisar(NOTIF);
}
CARGAS.notificacoes = async () => {
  // resumo diário de receitas vencidas (só para quem ligou esse aviso em Minha conta)
  try { await SB.rpc('avisar_receitas_vencidas', { p_clinica: CLI() }); } catch (e) {}
  await carregarNotificacoes();
  tempoReal('notificacoes', ['notificacoes'], () => carregarNotificacoes());
};

/* ---------- Lista do sino: abre ao tocar no sino da barra de cima ---------- */
const NOTIF_MENU = makeStore(null);
function abrirNotif(e) { const r = (e && e.currentTarget && e.currentTarget.getBoundingClientRect) ? e.currentTarget.getBoundingClientRect() : { left: innerWidth - 120, top: 20, width: 40, height: 40 }; NOTIF_MENU.v = NOTIF_MENU.v ? null : { x: r.left, y: r.top, w: r.width, h: r.height }; avisar(NOTIF_MENU); }
const fecharNotif = () => { NOTIF_MENU.v = null; avisar(NOTIF_MENU); };
const NOTIF_TIPO = { nova_mensagem: ['message-circle', '#1F5EFF'], novo_agendamento: ['calendar-plus', '#7B4BC4'], anamnese_respondida: ['clipboard-check', '#1E8E4E'], estoque_minimo: ['package', '#E5484D'], pagamento_atrasado: ['wallet', '#C2410C'], sistema: ['bell', '#5A6B8C'] };
// só no modo demonstração (sem banco), para o sino mostrar como fica
const NOTIF_DEMO = () => [{ id: 'demo1', tipo: 'anamnese_respondida', titulo: 'Anamnese respondida', descricao: 'Ronald Richards · Anamnese facial', lida: false, criado_em: new Date(Date.now() - 18 * 60000).toISOString() }];
function quandoNotif(ts) {
  const min = Math.max(0, Math.round((Date.now() - new Date(ts).getTime()) / 60000));
  if (min < 1) return 'agora';
  if (min < 60) return 'há ' + min + ' min';
  const dia = BR.diaDe(ts), hoje = BR.hoje();
  if (dia === hoje) return 'há ' + Math.round(min / 60) + ' h';
  const ontem = BR.diaDe(Date.now() - 86400000);
  return (dia === ontem ? 'ontem' : BR.dataTela(dia).slice(0, 5)) + ' às ' + BR.hm(ts);
}
async function marcarNotifLidas(ids) {
  if (!SB_ON || !CLI()) return;
  let q = SB.from('notificacoes').update({ lida: true, lida_em: agoraIso() }).eq('clinica_id', CLI()).eq('usuario_id', UID()).eq('lida', false);
  if (ids) q = q.in('id', ids);
  const { error } = await q;
  if (error) avisoErro('Não foi possível marcar como lida', error);
  carregarNotificacoes();
}
async function abrirDaNotif(n) {
  const ir = (k) => (window.rnIrPara ? window.rnIrPara(k) : null);
  if (n.tipo === 'nova_mensagem') return ir('mensagens');
  if (n.tipo === 'novo_agendamento') return ir('agenda');
  if (n.tipo === 'estoque_minimo') return ir('estoque');
  if (n.tipo === 'pagamento_atrasado') return ir('financeiro.receitas');
  if (n.tipo === 'anamnese_respondida') {
    if (SB_ON && n.registro_id) {
      const { data } = await SB.from('anamnese_envios').select('paciente_id').eq('id', n.registro_id).limit(1);
      const pid = data && data[0] && data[0].paciente_id;
      if (pid) { await carregar('pacientes'); const p = PAC.find((x) => x.dbId === pid); if (p && window.rnAbrirFicha) return window.rnAbrirFicha(p, 'prontuario'); }
    }
    return ir('pacientes');
  }
  return null;
}
function NotifMenu({ mobile }) {
  const [a] = useStore(NOTIF_MENU); const [nf] = useStore(NOTIF);
  const [lista, setLista] = React.useState(null);
  React.useEffect(() => {
    if (!a) return undefined;
    if (!SB_ON) { setLista((l) => l || NOTIF_DEMO()); return undefined; }
    let vivo = true;
    SB.from('notificacoes').select('id,tipo,titulo,descricao,lida,criado_em,conversa_id,registro_tabela,registro_id').eq('clinica_id', CLI()).eq('usuario_id', UID()).is('excluido_em', null).order('criado_em', { ascending: false }).limit(30)
      .then(({ data, error }) => { if (vivo) setLista(error ? [] : data || []); });
    return () => { vivo = false; };
  }, [!!a, nf.naoLidas]);
  React.useEffect(() => { if (!a) return undefined; const k = (e) => { if (e.key === 'Escape') fecharNotif(); }; window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, [!!a]);
  if (!a) return null;
  const W = Math.min(360, innerWidth - 24);
  const pos = { top: a.y + a.h + 10, left: Math.max(12, Math.min(innerWidth - W - 12, a.x + a.w - W)) };
  const naoLidas = (lista || []).filter((n) => !n.lida).length;
  const lerTodas = () => { setLista((l) => (l || []).map((n) => ({ ...n, lida: true }))); marcarNotifLidas(null).catch(() => {}); };
  const abrir = (n) => { fecharNotif(); if (!n.lida) { setLista((l) => (l || []).map((x) => (x.id === n.id ? { ...x, lida: true } : x))); marcarNotifLidas([n.id]).catch(() => {}); } abrirDaNotif(n).catch(() => {}); };
  return (
    <>
      <div onClick={fecharNotif} style={{ position: 'fixed', inset: 0, zIndex: 170 }} />
      <div role="dialog" aria-label="Notificações" style={{ position: 'fixed', zIndex: 171, width: W, boxSizing: 'border-box', ...pos, padding: 12, borderRadius: 24, background: 'rgba(255,255,255,.97)', border: '1.5px solid #fff', boxShadow: '0 26px 50px -22px rgba(23,73,170,.6)', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', gap: 6, backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '4px 6px 6px' }}>
          <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-strong)' }}>Notificações</span>
          {naoLidas ? <button type="button" onClick={lerTodas} style={{ border: 0, background: 'none', padding: 0, color: '#1F5EFF', fontFamily: 'inherit', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Marcar todas como lidas</button> : null}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', maxHeight: mobile ? '60vh' : 420, overflowY: 'auto', margin: '0 -4px', padding: '0 4px' }}>
          {!lista ? <div style={{ padding: 22, display: 'flex', justifyContent: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 14 }}><SIcon name="loader-circle" size={17} style={{ animation: 'sbgira 1s linear infinite' }} />Carregando...<style>{'@keyframes sbgira{to{transform:rotate(360deg)}}'}</style></div>
            : !lista.length ? <div style={{ padding: '22px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}><span style={{ width: 44, height: 44, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(31,94,255,.08)', color: '#1F5EFF' }}><SIcon name="bell" size={20} /></span>Nenhuma notificação por aqui.<span style={{ fontSize: 12, color: 'var(--text-subtle)' }}>Mensagens, agendamentos, anamneses, estoque e pagamentos aparecem aqui.</span></div>
            : lista.map((n) => { const t = NOTIF_TIPO[n.tipo] || NOTIF_TIPO.sistema; return (
              <button key={n.id} type="button" onClick={() => abrir(n)} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 10px', border: 0, borderRadius: 16, background: n.lida ? 'transparent' : 'rgba(31,94,255,.05)', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', width: '100%', marginBottom: 2 }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(31,94,255,.08)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = n.lida ? 'transparent' : 'rgba(31,94,255,.05)'; }}>
                <span style={{ width: 36, height: 36, borderRadius: 12, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'color-mix(in srgb, ' + t[1] + ' 12%, white)', color: t[1] }}><SIcon name={t[0]} size={17} /></span>
                <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <span style={{ fontSize: 14, fontWeight: n.lida ? 500 : 600, color: 'var(--text-strong)', lineHeight: 1.35 }}>{n.titulo}</span>
                  {n.descricao ? <span style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{n.descricao}</span> : null}
                  <span style={{ fontSize: 12, color: 'var(--text-subtle)' }}>{quandoNotif(n.criado_em)}</span>
                </span>
                {n.lida ? null : <span aria-label="Não lida" style={{ width: 8, height: 8, borderRadius: '50%', background: '#1F5EFF', flexShrink: 0, marginTop: 6 }} />}
              </button>); })}
        </div>
      </div>
    </>
  );
}

Object.assign(window, { MsgSvc, CrmSvc, MSG_LISTA, NOTIF, abrirChat, carregarChat, carregarNotificacoes, chaveConv, NOTIF_MENU, abrirNotif, fecharNotif, NotifMenu, marcarNotifLidas });
