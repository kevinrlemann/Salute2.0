/* =====================================================================
   SERVIÇOS DE DADOS: Configurações (Supabase)
   Clínica, equipe e acessos, profissionais, WhatsApp, som e os conteúdos
   da Salute (Saluteflix, Salute Cast, Parcerias e Certificações).
   ===================================================================== */
if (SB_ON) {
  TEAM_STORE.v = []; CAST_STORE.v = []; SELOS_STORE.v = [];
  WA_STORE.v = { status: 'off', modo: 'oficial', numero: '', desde: '', oficial: { phone: '', phoneId: '', waba: '', token: '' } };
}

/* ---------- Clínica ---------- */
CARGAS.clinica = async () => {
  await carregar('catalogos');
  const r = await DB.ler(SB.from('clinicas').select('*').eq('id', CLI()));
  catSet({ clinica: r[0] || null });
};
const clinTela = () => {
  const c = CAT.v.clinica || {};
  return { fantasia: c.nome_fantasia || '', razao: c.razao_social || '', resp: c.responsavel_nome || '', cnpj: c.cnpj || '', cpf: c.cpf || '', email: c.email || '', tel: BR.telTela(c.telefone), whats: BR.telTela(c.whatsapp),
    cep: c.cep || '', end: c.logradouro || '', num: c.numero || '', comp: c.complemento || '', bairro: c.bairro || '', cidade: c.cidade || '', uf: c.uf || '', maps: c.link_google_maps || '' };
};
const estTela = () => { const g = CAT.v.config || {}; return { estac: !!g.tem_estacionamento, acess: !!g.tem_acessibilidade, wifi: !!g.tem_wifi_pacientes }; };
// DIAS começa na segunda; no banco 0 é domingo
const horTela = () => DIAS.map((d, i) => { const h = (CAT.v.horarios || []).find((x) => x.dia_semana === (i + 1) % 7); return { d, on: h ? !!h.aberto : false, a: h && h.hora_inicio ? h.hora_inicio.slice(0, 5) : '08:00', f: h && h.hora_fim ? h.hora_fim.slice(0, 5) : '18:00' }; });
const pgTela = () => (CAT.v.formas || []).filter((f) => f.aceita && f.ativo).map((f) => f.nome);
const parcTela = () => String((CAT.v.config || {}).parcelas_maximas_credito || 6);
const ClinSvc = {
  async salvar({ c, est, hor, pg, parc }) {
    const tel = String(c.tel || '').trim(), wpp = String(c.whats || '').trim(), uf = String(c.uf || '').trim().toUpperCase();
    if (tel && !BR.tel(tel)) { avisoErro('Confira o telefone', 'Use DDD e número, por exemplo (19) 3863-4100.'); throw new Error('telefone'); }
    if (wpp && !BR.tel(wpp)) { avisoErro('Confira o WhatsApp', 'Use DDD e número, por exemplo (19) 99800-4100.'); throw new Error('whatsapp'); }
    if (uf && !/^[A-Z]{2}$/.test(uf)) { avisoErro('Confira o estado', 'Use a sigla com 2 letras, por exemplo SP.'); throw new Error('uf'); }
    if (!String(c.fantasia || '').trim()) { avisoErro('Falta o nome fantasia', 'É o nome que aparece para os pacientes.'); throw new Error('nome'); }
    const n = (v) => (String(v || '').trim() || null);
    const cli = await DB.gravar(SB.from('clinicas').update({ nome_fantasia: c.fantasia.trim(), razao_social: n(c.razao), responsavel_nome: n(c.resp), cnpj: n(c.cnpj), cpf: n(c.cpf), email: n(c.email), telefone: BR.tel(tel), whatsapp: BR.tel(wpp),
      cep: n(c.cep), logradouro: n(c.end), numero: n(c.num), complemento: n(c.comp), bairro: n(c.bairro), cidade: n(c.cidade), uf: uf || null, link_google_maps: n(c.maps) }).eq('id', CLI()).select().single(), 'Não foi possível salvar os dados da clínica');
    const cfg = { tem_estacionamento: !!est.estac, tem_acessibilidade: !!est.acess, tem_wifi_pacientes: !!est.wifi, parcelas_maximas_credito: parseInt(parc, 10) || 1 };
    const conf = CAT.v.config ? await DB.upd('configuracoes_clinica', CAT.v.config.id, cfg, 'Não foi possível salvar a estrutura da clínica') : await DB.ins('configuracoes_clinica', cfg, 'Não foi possível salvar a estrutura da clínica');
    // horários: um registro por dia da semana
    const hs = [];
    for (let i = 0; i < hor.length; i++) {
      const h = hor[i], dia = (i + 1) % 7, ex = (CAT.v.horarios || []).find((x) => x.dia_semana === dia);
      const dados = { dia_semana: dia, aberto: !!h.on, hora_inicio: h.a || null, hora_fim: h.f || null };
      hs.push(ex ? await DB.upd('horarios_funcionamento', ex.id, dados, 'Não foi possível salvar os horários') : await DB.ins('horarios_funcionamento', dados, 'Não foi possível salvar os horários'));
    }
    // formas de pagamento aceitas e parcelamento do crédito
    const formas = [];
    for (const f of CAT.v.formas || []) {
      const aceita = pg.includes(f.nome), patch = {};
      if (aceita !== f.aceita) patch.aceita = aceita;
      if (f.chave === 'credito' && f.parcelas_maximas !== cfg.parcelas_maximas_credito) patch.parcelas_maximas = cfg.parcelas_maximas_credito;
      formas.push(Object.keys(patch).length ? await DB.upd('formas_pagamento', f.id, patch, 'Não foi possível salvar as formas de pagamento') : f);
    }
    catSet({ clinica: cli, config: conf, horarios: hs.sort((a, b) => a.dia_semana - b.dia_semana), formas });
    if (SESSAO.v.clinica) setSessao({ clinica: { ...SESSAO.v.clinica, nome: cli.nome_fantasia } });
    avisoOk('Dados da clínica salvos');
  },
};

/* ---------- Equipe e acessos ---------- */
const PERM_TIMER = {};
const EquipeSvc = {
  // cada toque liga ou desliga um módulo; grava a lista completa depois de meio segundo sem mexer
  acessos(u) {
    if (!u.dbId) return;
    clearTimeout(PERM_TIMER[u.dbId]);
    PERM_TIMER[u.dbId] = setTimeout(() => {
      const rows = allModuleIds().map((m) => ({ clinica_id: CLI(), usuario_clinica_id: u.dbId, modulo: m, permitido: u.acc.includes(m) }));
      DB.gravar(SB.from('permissoes').upsert(rows, { onConflict: 'usuario_clinica_id,modulo' }).select('id'), 'Não foi possível salvar os acessos de ' + u.nome).catch(() => carregar('equipe', true));
    }, 500);
  },
  async convidar(f) {
    const email = f.email.trim().toLowerCase(), nome = f.nome.trim();
    await DB.rpc('convidar_membro', { p_clinica: CLI(), p_email: email, p_nome: nome, p_funcao: f.funcao, p_papel: ek('papel', f.funcao) || 'recepcao', p_permitidos: FUNC_PRESET()[f.funcao] || [], p_todos: allModuleIds() }, 'Não foi possível convidar');
    await carregar('equipe', true);
    // email com o link de acesso: cliente separado para não mexer na sessão de quem convida
    try {
      const cli = window.supabase.createClient(SB_CFG.url, SB_CFG.key, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false, flowType: 'implicit', storageKey: 'salute02-convite' }, global: { fetch: sbFetch } });
      const { error } = await cli.auth.signInWithOtp({ email, options: { shouldCreateUser: true, emailRedirectTo: voltaAuth(), data: { nome: nome.split(' ')[0], sobrenome: nome.split(' ').slice(1).join(' '), convite: true } } });
      if (error) throw error;
      avisoOk('Convite enviado', 'O link de acesso chegou no e-mail ' + email + '.');
    } catch (e) {
      avisoErro('Convite salvo, mas o e-mail não saiu', 'A pessoa pode entrar em "Recebi um convite" com o e-mail ' + email + '.');
    }
  },
};

/* ---------- Profissionais ---------- */
const PROF_SEL = 'id,nome,especialidade,registro_conselho,cor_agenda,foto_path,usuario_id,ordem,profissionais_procedimentos(procedimento_id,excluido_em)';
const ProfSvc = {
  async salvar(ed) {
    const existente = !!ed.dbId, id = ed.dbId || novoId();
    let foto = ed.fotoPath || null;
    if (ed.foto && /^data:/.test(ed.foto)) foto = await ARQ.enviarDataUrl('clinica', 'profissionais', ed.foto, 'foto.jpg');
    const dados = { nome: ed.nome.trim(), especialidade: ed.esp || null, registro_conselho: ed.reg || null, cor_agenda: ed.cor || null, foto_path: foto };
    if (existente) await DB.upd('profissionais', id, dados, 'Não foi possível salvar o profissional');
    else await DB.ins('profissionais', { id, ...dados, ordem: (CAT.v.profissionais || []).length + 1 }, 'Não foi possível cadastrar o profissional');
    const quer = (ed.procs || []).map((n) => catId('procedimentos', n)).filter(Boolean);
    const tem = existente ? ((CAT.v.profissionais || []).find((p) => p.id === id) || {}).procs || [] : [];
    for (const pid of tem.filter((x) => !quer.includes(x))) await DB.updWhere('profissionais_procedimentos', { excluido_em: agoraIso() }, { profissional_id: id, procedimento_id: pid, excluido_em: null }, 'Não foi possível atualizar os procedimentos');
    const entra = quer.filter((x) => !tem.includes(x));
    if (entra.length) await DB.ins('profissionais_procedimentos', entra.map((pid) => ({ profissional_id: id, procedimento_id: pid })), 'Não foi possível atualizar os procedimentos');
    const r = await DB.ler(DB.sel('profissionais', PROF_SEL).eq('id', id));
    const np = { ...r[0], procs: (r[0].profissionais_procedimentos || []).filter((x) => !x.excluido_em).map((x) => x.procedimento_id) };
    catSet({ profissionais: existente ? CAT.v.profissionais.map((p) => (p.id === id ? np : p)) : [...(CAT.v.profissionais || []), np] });
    hidratarCatalogos(); hidratarMetas();
    avisoOk('Profissional salvo');
  },
};

/* ---------- WhatsApp ---------- */
const waTela = () => {
  const i = CAT.v.instancia;
  if (!i) return { status: 'off', modo: 'oficial', numero: '', desde: '', oficial: { phone: '', phoneId: '', waba: '', token: '' } };
  return { status: i.status === 'conectado' ? 'on' : 'off', modo: i.tipo_api === 'nao_oficial' ? 'naoOficial' : 'oficial', numero: BR.telTela(i.numero), desde: i.conectado_em ? BR.dataTela(BR.diaDe(i.conectado_em)) : '',
    oficial: { phone: i.tipo_api === 'oficial' ? BR.telTela(i.numero) : '', phoneId: i.phone_number_id || '', waba: i.waba_id || '', token: i.token_configurado ? SENHA_GUARDADA : '' } };
};
const CARGA_CATALOGOS_CFG = CARGAS.catalogos;
CARGAS.catalogos = async () => { await CARGA_CATALOGOS_CFG(); WA_STORE.v = waTela(); avisar(WA_STORE); };
const WaSvc = {
  webhook() { const i = CAT.v.instancia; return (i && i.url_webhook) || SB_CFG.url + '/functions/v1/whatsapp?clinica=' + CLI(); },
  async conectar(m, numero, of) {
    const i = CAT.v.instancia, tel = BR.tel(numero || '') || (i ? i.numero : null);
    const dados = { nome: 'WhatsApp da clínica', tipo_api: m === 'oficial' ? 'oficial' : 'nao_oficial', status: 'conectado', conectado_em: agoraIso(), desconectado_em: null, numero: tel,
      phone_number_id: m === 'oficial' ? (of.phoneId || '').trim() || null : null, waba_id: m === 'oficial' ? (of.waba || '').trim() || null : null, url_webhook: WaSvc.webhook(), padrao: true };
    const row = i ? await DB.upd('instancias_whatsapp', i.id, dados, 'Não foi possível conectar o WhatsApp') : await DB.ins('instancias_whatsapp', dados, 'Não foi possível conectar o WhatsApp');
    // o token vai para o cofre; a tabela só guarda os 4 últimos caracteres
    if (m === 'oficial' && of.token && of.token !== SENHA_GUARDADA) await DB.rpc('salvar_segredo', { p_clinica: CLI(), p_provedor: 'whatsapp_meta', p_segredo: of.token }, 'Não foi possível guardar o token');
    const r = await DB.ler(DB.sel('instancias_whatsapp').eq('id', row.id));
    catSet({ instancia: r[0] || row }); WA_STORE.v = waTela(); avisar(WA_STORE);
    avisoOk('WhatsApp conectado');
  },
  async desconectar() {
    const i = CAT.v.instancia; if (!i) return;
    const row = await DB.upd('instancias_whatsapp', i.id, { status: 'desconectado', desconectado_em: agoraIso() }, 'Não foi possível desconectar');
    catSet({ instancia: row });
  },
};

/* ---------- Conteúdo da Salute (vale para todas as clínicas) ---------- */
const FLIX_STORE = makeStore([]);
const PARC_STORE = makeStore([]);
let FLIX_CATS = [];
const ehAdmin = () => !!(SESSAO.v.perfil && SESSAO.v.perfil.admin_plataforma);
function soAdmin() { if (ehAdmin()) return true; avisoErro('Não foi possível publicar', 'Só a equipe da Salute publica conteúdo para todas as clínicas.'); return false; }
const glob = (t, cols) => SB.from(t).select(cols || '*').is('excluido_em', null);
const gravarGlobal = (q, titulo) => DB.gravar(q, titulo || 'Não foi possível salvar');
CARGAS.conteudo = async () => {
  const [cats, flix, prog, cast, parc, selos] = await Promise.all([
    DB.ler(glob('flix_categorias').order('ordem')),
    DB.ler(glob('flix_conteudos').eq('publicado', true).order('ordem')),
    DB.ler(SB.from('flix_progresso').select('conteudo_id,percentual').eq('usuario_id', UID()).is('excluido_em', null)),
    DB.ler(glob('cast_episodios').order('numero_episodio', { ascending: false })),
    DB.ler(glob('parceiros', '*, cupons:cupons_parceiros(codigo,ativo,excluido_em)').order('ordem')),
    DB.ler(glob('selos_certificacoes').order('ordem')),
  ]);
  FLIX_CATS = cats;
  const pr = Object.fromEntries(prog.map((x) => [x.conteudo_id, Math.round(Number(x.percentual))]));
  FLIX_STORE.v = flix.map((c) => ({ id: c.id, dbId: c.id, t: c.titulo, tipo: c.tipo === 'servico' ? 'Serviço' : 'Curso', cat: (cats.find((k) => k.id === c.categoria_id) || {}).nome || 'Sistema', dur: c.duracao || '', aulas: c.quantidade_aulas || 0, prog: pr[c.id] || 0,
    g: c.cores_capa && c.cores_capa.length === 2 ? c.cores_capa : ['#0B4BEB', '#22C3F2'], ic: c.icone || (c.tipo === 'servico' ? 'briefcase-business' : 'graduation-cap'), destaque: c.destaque, link: c.url_video || c.url_contratacao || '' }));
  avisar(FLIX_STORE);
  CAST_STORE.v = cast.map((e) => ({ id: e.id, dbId: e.id, ep: e.numero_episodio, t: e.titulo, conv: e.convidado || '', dur: e.duracao || '', data: e.data_publicacao, url: e.url_youtube || '', g: e.cores_capa && e.cores_capa.length === 2 ? e.cores_capa : ['#0B4BEB', '#7B4BC4'] }));
  avisar(CAST_STORE);
  PARC_STORE.v = parc.map((p) => { const cp = (p.cupons || []).find((x) => x.ativo && !x.excluido_em); return { id: p.id, dbId: p.id, nome: p.nome, cat: p.categoria, ben: p.beneficio || '', cupom: cp ? cp.codigo : '', site: p.site || '', of: !!p.oficial }; });
  avisar(PARC_STORE);
  const logos = await Promise.all(selos.map((s) => ARQ.url('conteudos', s.logo_path)));
  SELOS_STORE.v = selos.map((s, i) => ({ id: s.id, dbId: s.id, nome: s.nome, cat: s.categoria || '', desc: s.descricao || '', ic: s.icone || 'award', logo: logos[i] || null, logoPath: s.logo_path, pad: s.logo_espacamento || undefined }));
  avisar(SELOS_STORE);
};
const ContSvc = {
  async flix(antes, depois) {
    const novos = depois.filter((x) => !x.dbId);
    if (novos.length && !soAdmin()) return;
    for (const x of novos) {
      let cat = FLIX_CATS.find((k) => k.nome === x.cat);
      if (!cat) { cat = await gravarGlobal(SB.from('flix_categorias').insert({ nome: x.cat, ordem: FLIX_CATS.length }).select().single()); FLIX_CATS.push(cat); }
      const id = novoId();
      await gravarGlobal(SB.from('flix_conteudos').insert({ id, titulo: x.t, tipo: x.tipo === 'Serviço' ? 'servico' : 'curso', categoria_id: cat.id, quantidade_aulas: x.aulas || null, duracao: x.dur, cores_capa: x.g, icone: x.ic,
        url_video: x.tipo === 'Curso' ? x.link || null : null, url_contratacao: x.tipo === 'Serviço' ? x.link || null : null, ordem: depois.length }), 'Não foi possível publicar');
      x.id = id; x.dbId = id;
    }
    FLIX_STORE.v = depois; avisar(FLIX_STORE);
    if (novos.length) avisoOk('Conteúdo publicado', 'Já aparece para todas as clínicas.');
  },
  async parceiros(antes, depois) {
    const novos = depois.filter((x) => !x.dbId);
    if (novos.length && !soAdmin()) return;
    for (const x of novos) {
      const id = novoId();
      await gravarGlobal(SB.from('parceiros').insert({ id, nome: x.nome, categoria: x.cat, beneficio: x.ben || null, site: x.site || null, oficial: !!x.of, ordem: depois.length }), 'Não foi possível salvar o parceiro');
      if (x.cupom) await gravarGlobal(SB.from('cupons_parceiros').insert({ parceiro_id: id, codigo: x.cupom }), 'Não foi possível salvar o cupom');
      x.id = id; x.dbId = id;
    }
    PARC_STORE.v = depois; avisar(PARC_STORE);
    if (novos.length) avisoOk('Parceiro salvo');
  },
  async cast(antes, depois) {
    const novos = depois.filter((x) => !x.dbId);
    const mudou = depois.filter((x) => x.dbId && (antes.find((a) => a.id === x.id) || {}).url !== x.url);
    if ((novos.length || mudou.length) && !soAdmin()) return;
    for (const x of novos) {
      const id = novoId();
      await gravarGlobal(SB.from('cast_episodios').insert({ id, numero_episodio: x.ep, titulo: x.t, convidado: x.conv || null, duracao: x.dur || null, data_publicacao: x.data, cores_capa: x.g, url_youtube: x.url || null }), 'Não foi possível publicar o episódio');
      x.id = id; x.dbId = id;
    }
    for (const x of mudou) await gravarGlobal(SB.from('cast_episodios').update({ url_youtube: x.url || null }).eq('id', x.dbId).select('id'), 'Não foi possível salvar o link');
    CAST_STORE.v = depois; avisar(CAST_STORE);
  },
  async selos(antes, depois) {
    const novos = depois.filter((x) => !x.dbId);
    const logo = depois.filter((x) => x.dbId && x.logo && /^data:/.test(x.logo) && (antes.find((a) => a.id === x.id) || {}).logo !== x.logo);
    if ((novos.length || logo.length) && !soAdmin()) return;
    const subir = async (x) => (x.logo && /^data:/.test(x.logo) ? ARQ.enviarDataUrl('conteudos', 'selos', x.logo, 'logo.png') : null);
    for (const x of novos) {
      const id = novoId(), path = await subir(x);
      await gravarGlobal(SB.from('selos_certificacoes').insert({ id, nome: x.nome, categoria: x.cat || null, descricao: x.desc || null, icone: x.ic || 'award', logo_path: path, ordem: depois.length }), 'Não foi possível salvar a certificação');
      x.id = id; x.dbId = id; x.logoPath = path;
    }
    for (const x of logo) { const path = await subir(x); await gravarGlobal(SB.from('selos_certificacoes').update({ logo_path: path }).eq('id', x.dbId).select('id'), 'Não foi possível salvar o logo'); x.logoPath = path; }
    SELOS_STORE.v = depois; avisar(SELOS_STORE);
  },
};

Object.assign(window, { ClinSvc, EquipeSvc, ProfSvc, WaSvc, ContSvc, clinTela, estTela, horTela, pgTela, parcTela, waTela, FLIX_STORE, PARC_STORE, ehAdmin });
