/* =====================================================================
   SERVIÇOS DE DADOS: Pacientes, Prontuário e Agenda (Supabase)
   As telas continuam as mesmas. Em modo conectado, as listas que antes
   vinham fixas no código passam a ser preenchidas com o que está no banco.
   ===================================================================== */
const substituir = (arr, novos) => { arr.splice(0, arr.length, ...novos); return arr; };
const substituirObj = (obj, novo) => { Object.keys(obj).forEach((k) => delete obj[k]); Object.assign(obj, novo); return obj; };
const avisar = (st) => st.subs.forEach((f) => f());
const novoId = () => (window.crypto && crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => { const r = Math.random() * 16 | 0; return (c === 'x' ? r : (r & 3 | 8)).toString(16); }));
const hojeZero = () => BR.dia(); // hoje no horário de Brasília
const LINK_BASE = String((window.SALUTE_CONFIG && window.SALUTE_CONFIG.LINK_PUBLICO) || (location.host ? location.host + (ROTAS_URL ? BASE_PATH : location.pathname.replace(/[^/]*$/, '')) : 'salute.app')).replace(/^https?:\/\//, '').replace(/\/+$/, '');
const quemSou = () => (SESSAO.v.perfil ? [SESSAO.v.perfil.tratamento, SESSAO.v.perfil.nome, SESSAO.v.perfil.sobrenome].filter(Boolean).join(' ') : 'Equipe');

// No modo conectado a data de hoje é a data real e nenhum dado de exemplo aparece
if (SB_ON) { PAC.length = 0; PAC_STORE.v = []; APPT_STORE.v = []; ANAM_STORE.v = []; MODEL_STORE.v = []; TODAY.setTime(hojeZero().getTime()); TODAY_ISO = isoOf(TODAY); HOJE = BR.dataTela(TODAY_ISO); }

/* ---------- Catálogos dentro das listas que as telas já usam ---------- */
const CAT_EXTRA = makeStore({ produtos: [], kits: [] });
const CARGA_CATALOGOS_BASE = CARGAS.catalogos;
CARGAS.catalogos = async () => {
  await CARGA_CATALOGOS_BASE();
  const [produtos, kits] = await Promise.all([
    DB.ler(DB.sel('produtos', 'id,nome,quantidade_atual,usar_no_mapa,cor_mapa,unidade_mapa,passo_dose,dose_padrao,conteudo_por_unidade,unidade:unidades_medida(nome)').order('nome')),
    DB.ler(DB.sel('procedimento_kit_padrao', 'procedimento_id,produto_id,quantidade')),
  ]);
  CAT_EXTRA.v = { produtos, kits }; avisar(CAT_EXTRA);
  hidratarCatalogos();
  if (window.hidratarMapa) hidratarMapa();
};
function hidratarCatalogos() {
  if (!SB_ON) return;
  const c = CAT.v, profs = c.profissionais || [], procs = c.procedimentos || [];
  const nomeProc = (id) => (procs.find((p) => p.id === id) || {}).nome;
  substituir(PROF0, profs.map((p) => ({ id: p.id, dbId: p.id, nome: p.nome, esp: p.especialidade || '', reg: p.registro_conselho || '', cor: p.cor_agenda || '#1F5EFF', procs: (p.procs || []).map(nomeProc).filter(Boolean), fotoPath: p.foto_path, usuarioId: p.usuario_id })));
  substituir(PROS, profs.map((p) => ({ n: p.nome, r: p.especialidade || '', id: p.id })));
  substituir(FIN_PROS, profs.map((p) => p.nome));
  // procedimento desmarcado em Configurações sai das listas; o histórico continua achando o nome pelo id
  substituir(FIN_PROCS, procs.filter((pr) => pr.ativo !== false).map((pr) => ({ n: pr.nome, v: Number(pr.valor || 0), q: 0, cat: catNome('categorias', pr.categoria_financeira_id) || 'Consulta', pro: profs.map((p, i) => ((p.procs || []).includes(pr.id) ? i : -1)).filter((i) => i >= 0), id: pr.id })));
  substituirObj(PROC_DUR, Object.fromEntries(procs.map((p) => [p.nome, p.duracao_padrao_minutos || 30])));
  substituir(FORMAS, (c.formas || []).filter((f) => f.ativo).map((f) => f.nome));
  substituir(DESP_CATS, (c.categorias || []).filter((x) => x.tipo === 'despesa' && x.ativo).map((x) => x.nome));
  substituir(EST_CATS, (c.catProd || []).filter((x) => x.ativo).map((x) => x.nome));
  substituir(UNIDADES, (c.unidades || []).filter((x) => x.ativo).map((x) => x.nome));
  const cc = CAMPOS.find((x) => x.k === 'conv'); if (cc) substituir(cc.opts, ['', ...(c.convenios || []).filter((x) => x.ativo).map((x) => x.nome)]);
  const ex = CAT_EXTRA.v;
  substituir(PRODUTOS0, (ex.produtos || []).map((p) => ({ id: p.id, nome: p.nome, un: p.unidade ? p.unidade.nome : 'Unidade', qtd: Number(p.quantidade_atual) })));
  const kit = {};
  (ex.kits || []).forEach((k) => { const pn = nomeProc(k.procedimento_id), pr = (ex.produtos || []).find((x) => x.id === k.produto_id); if (pn && pr) (kit[pn] = kit[pn] || []).push([pr.nome, Number(k.quantidade)]); });
  substituirObj(MAT_SUG, kit);
  PROF_STORE.v = PROF0.map((p) => ({ ...p, foto: (PROF_STORE.v.find((x) => x.id === p.id) || {}).foto || null })); avisar(PROF_STORE);
  PROF0.forEach((p) => { if (p.fotoPath) ARQ.url('clinica', p.fotoPath).then((u) => { if (!u) return; PROF_STORE.v = PROF_STORE.v.map((x) => (x.id === p.id ? { ...x, foto: u } : x)); avisar(PROF_STORE); }); });
}

/* =====================================================================
   PACIENTES
   ===================================================================== */
const pk = (p) => (p ? p.dbId || p.cpf || p.nome : null);
const pacTela = (r) => ({
  id: r.id, dbId: r.id, nome: r.nome, tipo: el('tipo_paciente', r.tipo, 'Particular'), empresa: r.empresa || '', conv: r.convenio ? r.convenio.nome : '',
  tel: BR.telTela(r.whatsapp), nasc: BR.dataTela(r.data_nascimento), sexo: r.sexo ? el('sexo', r.sexo, '') : '', cpf: r.cpf || '', numero: r.numero_prontuario,
  email: r.email || '', status: r.status, origem: r.origem_cadastro, criado: r.criado_em, fotoPath: r.foto_path,
  telAnt: (r.telefones || []).filter((t) => !t.ativo && !t.excluido_em).sort((a, b) => String(a.substituido_em).localeCompare(String(b.substituido_em))).map((t) => BR.telTela(t.numero)),
});
const pacBanco = (d) => ({
  nome: String(d.nome || '').trim(), tipo: ek('tipo_paciente', d.tipo) || 'particular', empresa: d.empresa ? String(d.empresa).trim() : null,
  convenio_id: d.conv ? catId('convenios', d.conv) : null, data_nascimento: BR.data(d.nasc), sexo: ek('sexo', d.sexo),
});
function atualizarFiltrosPacientes() {
  const fc = FILTER_DEFS.find((x) => x.key === 'conv'), fe = FILTER_DEFS.find((x) => x.key === 'empresa');
  if (fc) substituir(fc.opts, [...Array.from(new Set(PAC.map((p) => p.conv).filter(Boolean))).sort(), 'Sem convênio']);
  if (fe) substituir(fe.opts, Array.from(new Set(PAC.map((p) => p.empresa).filter(Boolean))).sort());
}
function publicarPacientes(list) { substituir(PAC, list); PAC_STORE.v = list; atualizarFiltrosPacientes(); avisar(PAC_STORE); }
CARGAS.pacientes = async () => {
  await carregar('catalogos');
  const rows = await DB.tudo(() => DB.sel('pacientes', '*, convenio:convenios(nome), telefones:pacientes_telefones(numero,ativo,substituido_em,excluido_em)').order('nome').order('id'));
  publicarPacientes(rows.map(pacTela));
};
const PacSvc = {
  achar(nome) { const n = String(nome || '').trim().toLowerCase(); return PAC.find((p) => p.nome.toLowerCase() === n) || null; },
  async criar(d, origem) {
    const row = { ...pacBanco(d), whatsapp: BR.tel(d.tel), cpf: d.cpf ? String(d.cpf).trim() : null, email: d.email || null, origem_cadastro: origem || 'equipe' };
    const r = await DB.ins('pacientes', row, 'Não foi possível cadastrar o paciente');
    const full = await DB.ler(DB.sel('pacientes', '*, convenio:convenios(nome), telefones:pacientes_telefones(numero,ativo,substituido_em,excluido_em)').eq('id', r.id));
    const p = pacTela(full[0] || r);
    publicarPacientes([...PAC, p].sort((a, b) => a.nome.localeCompare(b.nome)));
    PacSvc.hist(p, { t: origem === 'renata_ia' ? 'Cadastro criado pela Renata IA' : 'Cadastro criado pela equipe', s: quemSou(), c: '#2DBF6A', tipo: 'cadastro', origem });
    return p;
  },
  async garantir(nome, tel) { return PacSvc.achar(nome) || PacSvc.criar({ nome, tel, tipo: 'Particular' }); },
  async salvar(p, d) {
    await DB.upd('pacientes', p.dbId, pacBanco(d), 'Não foi possível salvar os dados do paciente');
    const np = { ...p, ...d };
    publicarPacientes(PAC.map((x) => (x.dbId === p.dbId ? np : x)));
    return np;
  },
  async trocarNumero(p, novo) {
    const w = BR.tel(novo); if (!w) throw new Error('Número inválido');
    await DB.upd('pacientes', p.dbId, { whatsapp: w }, 'Não foi possível trocar o número');
    const np = { ...p, tel: BR.telTela(w), telAnt: [...(p.telAnt || []), p.tel].filter(Boolean) };
    publicarPacientes(PAC.map((x) => (x.dbId === p.dbId ? np : x)));
    return np;
  },
  async historico(p) {
    const rows = await DB.ler(DB.sel('historico_paciente', 'titulo,descricao,data,cor,origem').eq('paciente_id', p.dbId).order('data', { ascending: false }).limit(200));
    return rows.map((h) => ({ t: h.titulo, d: BR.dataTela(BR.diaDe(h.data)), s: h.descricao || undefined, c: h.cor || '#1F5EFF' }));
  },
  hist(p, h) {
    if (!SB_ON || !p || !p.dbId) return Promise.resolve();
    return bg(DB.ins('historico_paciente', { paciente_id: p.dbId, titulo: h.t, descricao: h.s || null, cor: h.c || null, tipo_evento: h.tipo || 'geral', origem: h.origem || 'equipe', registro_tabela: h.tabela || null, registro_id: h.registro || null }, 'Não foi possível registrar no histórico'));
  },
};

/* =====================================================================
   PRONTUÁRIO
   ===================================================================== */
const linkAnamnese = (token) => LINK_BASE + '/?a=' + token;
const linkDocs = (token) => LINK_BASE + '/?u=' + token;
const dtLocal = (ts) => BR.diaDe(ts) + 'T' + BR.hm(ts); // data e hora em Brasília, no formato do campo datetime-local
const pastaNome = (pastas, id) => (pastas.find((x) => x.id === id) || {}).nome || 'Documentação Clínica';
const ProntSvc = {
  async carregar(p) {
    const P = p.dbId;
    const [envs, mapas, procs, docs, comps, pastasPac, modelos] = await Promise.all([
      DB.ler(DB.sel('anamnese_envios', 'id,token,status,modo,enviado_em,expira_em,respondido_em,rascunho,assinatura,assinante_nome,assinante_cpf,assinado_em,ip_assinatura,texto_declaracao,hash_respostas,modelo_id,modelo:anamnese_modelos(nome),respostas:anamnese_respostas(ordem,pergunta_texto,resposta,detalhe,bloco_titulo,alerta,rotulo_alerta,excluido_em)').eq('paciente_id', P).order('enviado_em', { ascending: false })),
      DB.ler(DB.sel('mapeamentos', 'id,titulo,data,criado_em,imagem_path,origem_imagem,categoria,area_descricao,observacoes,modelo:mapeamento_modelos(chave_sistema,imagem_path,sistema),marcacoes:mapeamento_marcacoes(id,tipo,ordem,item_mapa,dose,unidade,posicao_x,posicao_y,pontos_tracado,cor,espessura,opacidade,comentario,excluido_em)').eq('paciente_id', P).order('criado_em', { ascending: false })),
      DB.ler(DB.sel('procedimentos_realizados', 'id,procedimento_nome,data_hora,duracao_minutos,status,observacoes,regiao,valor,criado_em,procedimento:procedimentos(nome),profissional:profissionais(nome),insumos:procedimento_insumos(produto_nome,quantidade,excluido_em)').eq('paciente_id', P).order('data_hora', { ascending: false })),
      DB.ler(DB.sel('documentos_paciente', 'id,nome_arquivo,arquivo_path,tipo_arquivo,mime_type,data,pasta_id,criado_em,origem,procedimento_realizado_id').eq('paciente_id', P).order('criado_em', { ascending: false })),
      DB.ler(DB.sel('comparacoes_antes_depois', 'id,nome,data,pasta_id,documento_antes_id,documento_depois_id,criado_em').eq('paciente_id', P).order('criado_em', { ascending: false })),
      DB.ler(DB.sel('pastas_documentos').eq('paciente_id', P).order('ordem')),
      ProntSvc.modelos(),
    ]);
    const pastas = [...(CAT.v.pastas || []), ...pastasPac];
    // documentos com link assinado
    const paths = docs.map((d) => d.arquivo_path).filter((x) => x && !/^demo:/.test(x));
    const urls = {};
    if (paths.length) { const { data } = await SB.storage.from('prontuario').createSignedUrls(paths, 3600); (data || []).forEach((u) => { if (u.signedUrl) urls[u.path] = u.signedUrl; }); }
    const docTela = (d) => {
      const demo = /^demo:/.test(d.arquivo_path || '') ? d.arquivo_path.split(':') : null;
      return { id: d.id, dbId: d.id, name: d.nome_arquivo, folder: pastaNome(pastas, d.pasta_id), pastaId: d.pasta_id, date: BR.dataTela(d.data), type: d.tipo_arquivo === 'pdf' ? 'pdf' : d.tipo_arquivo === 'outro' ? 'outro' : 'img', url: urls[d.arquivo_path] || null, art: demo && demo[1] !== 'pdf' ? demo[1] : undefined, tone: demo && demo[2] ? demo[2] : undefined, path: d.arquivo_path, criado: d.criado_em, procId: d.procedimento_realizado_id || null };
    };
    const docsT = docs.map(docTela);
    const byId = Object.fromEntries(docsT.map((d) => [d.id, d]));
    const compT = comps.filter((c) => byId[c.documento_antes_id] && byId[c.documento_depois_id]).map((c) => ({ id: c.id, dbId: c.id, name: c.nome, folder: pastaNome(pastas, c.pasta_id), date: BR.dataTela(c.data), type: 'compare', a: byId[c.documento_antes_id], b: byId[c.documento_depois_id], criado: c.criado_em }));
    const recs = [];
    envs.forEach((e) => recs.push(envioTela(e)));
    for (const m of mapas) {
      let bgv = m.modelo && m.modelo.sistema ? m.modelo.chave_sistema : null;
      const img = m.imagem_path || (m.modelo && !m.modelo.sistema ? m.modelo.imagem_path : null);
      if (img) bgv = await ARQ.url('prontuario', img);
      const mk = (m.marcacoes || []).filter((x) => !x.excluido_em).sort((a, b) => a.ordem - b.ordem);
      recs.push({ id: m.id, dbId: m.id, kind: 'mapa', date: BR.dataTela(m.data), ord: m.criado_em, title: m.titulo, bg: bgv, bgPath: img,
        cat: m.categoria || null, catDesc: m.area_descricao || '', obs: m.observacoes || '', dataIso: m.data,
        points: mk.filter((x) => x.tipo === 'ponto').map((x) => ({ id: x.id, x: Number(x.posicao_x), y: Number(x.posicao_y), prod: x.item_mapa || 'Só comentário', dose: Number(x.dose || 0), un: x.unidade, cor: x.cor, com: x.comentario || '' })),
        strokes: mk.filter((x) => x.tipo !== 'ponto').map((x) => ({ id: x.id, type: x.tipo === 'pincel' ? 'pen' : 'line', pts: x.pontos_tracado || [], color: x.cor || '#7B4BC4', w: x.espessura || 6, op: Number(x.opacidade || 0.9), com: x.comentario || '' })) });
    }
    procs.forEach((r) => { const nome = (r.procedimento ? r.procedimento.nome : r.procedimento_nome) || 'Procedimento'; recs.push({ id: r.id, dbId: r.id, kind: 'proc', date: BR.dataTela(BR.diaDe(r.data_hora)), ord: r.criado_em, title: nome, items: [nome], pro: r.profissional ? r.profissional.nome : '', dt: dtLocal(r.data_hora), dur: r.duracao_minutos, status: { realizado: 'Realizado', agendado: 'Agendado', cancelado: 'Cancelado' }[r.status], mats: (r.insumos || []).filter((x) => !x.excluido_em).map((x) => ({ nome: x.produto_nome, q: Number(x.quantidade) })), obs: r.observacoes || '', regiao: r.regiao || '', valor: r.valor != null ? Number(r.valor) : null, anexos: docsT.filter((d) => d.procId === r.id) }); });
    // documentos agrupados por envio (mesmo dia, mesma pasta); anexos de procedimento aparecem no próprio procedimento
    const grupos = {};
    docsT.filter((d) => !d.procId).forEach((d) => { const k = d.date + '|' + d.folder; (grupos[k] = grupos[k] || []).push(d); });
    Object.entries(grupos).forEach(([k, fs]) => { const folder = k.split('|')[1]; recs.push({ id: 'g' + k, kind: 'doc', date: fs[0].date, ord: fs[0].criado, title: `${fs.length} ${fs.length === 1 ? 'arquivo' : 'arquivos'} em ${folder}`, files: fs }); });
    compT.forEach((c) => recs.push({ id: 'g' + c.id, kind: 'doc', date: c.date, ord: c.criado, title: 'Antes e depois criado', files: [c] }));
    recs.sort((a, b) => String(b.ord).localeCompare(String(a.ord)));
    const nomesPadrao = (CAT.v.pastas || []).map((x) => x.nome).filter((n) => n !== 'Antes e Depois');
    const folders = Array.from(new Set([...nomesPadrao, ...pastasPac.map((x) => x.nome), ...(compT.length || docsT.some((d) => d.folder === 'Antes e Depois') ? ['Antes e Depois'] : [])]));
    return { recs, docs: [...compT, ...docsT], folders, pastas };
  },
  async modelos() {
    const rows = await DB.ler(SB.from('mapeamento_modelos').select('id,nome,imagem_path,sistema,chave_sistema,clinica_id').is('excluido_em', null).eq('clinica_id', CLI()).eq('sistema', false).order('criado_em'));
    const list = [];
    for (const m of rows) list.push({ id: m.id, dbId: m.id, name: m.nome, src: await ARQ.url('prontuario', m.imagem_path), path: m.imagem_path });
    MODEL_STORE.v = list; avisar(MODEL_STORE);
    return list;
  },
  async addModelo(src, nome) {
    const id = novoId(); const path = await ARQ.enviarDataUrl('prontuario', 'modelos', src, nomeSeguro(nome) + '.png');
    await DB.ins('mapeamento_modelos', { id, nome, imagem_path: path, sistema: false }, 'Não foi possível salvar o modelo');
    return id;
  },
  async pastaId(p, nome, pastas) {
    const ex = pastas.find((x) => x.nome === nome); if (ex) return ex.id;
    const r = await DB.ins('pastas_documentos', { paciente_id: p.dbId, nome, ordem: pastas.length + 1 }, 'Não foi possível criar a pasta');
    pastas.push(r); return r.id;
  },
  async enviarAnamnese(p, modeloNome, modo) {
    const m = (ANAM_STORE.v || []).find((x) => x.nome === modeloNome);
    const r = await DB.ins('anamnese_envios', { modelo_id: m && m.dbId, paciente_id: p.dbId, modo: modo || 'link' }, 'Não foi possível gerar o link da anamnese');
    return { id: r.id, token: r.token, link: linkAnamnese(r.token), expira: r.expira_em };
  },
  async salvarMapa(p, rec, existente) {
    const id = existente ? rec.id : rec.id || novoId();
    let modeloId = null, imgPath = null, origem = null;
    const sys = SYS_MODELS.find((x) => x[0] === rec.bg);
    if (sys) { const r = await DB.ler(SB.from('mapeamento_modelos').select('id').eq('sistema', true).eq('chave_sistema', sys[0]).limit(1)); modeloId = r[0] && r[0].id; origem = 'modelo_sistema'; }
    else if (typeof rec.bg === 'string' && /^(data:|blob:)/.test(rec.bg)) { const mm = (MODEL_STORE.v || []).find((x) => x.src === rec.bg); if (mm) { modeloId = mm.dbId; origem = 'modelo_clinica'; } else { imgPath = await ARQ.enviarDataUrl('prontuario', 'pacientes/' + p.dbId + '/mapeamentos', rec.bg, 'foto.png'); origem = 'foto_paciente'; } }
    else if (rec.bgPath) { imgPath = rec.bgPath; origem = 'foto_paciente'; }
    else if (typeof rec.bg === 'string' && /^https?:/.test(rec.bg)) { const mm = (MODEL_STORE.v || []).find((x) => x.src === rec.bg); if (mm) { modeloId = mm.dbId; origem = 'modelo_clinica'; } }
    const prof = PROF0.find((x) => x.usuarioId && x.usuarioId === UID());
    const base = { titulo: rec.title, modelo_id: modeloId, imagem_path: imgPath, origem_imagem: origem, categoria: rec.cat || null, area_descricao: rec.cat === 'outra' ? (String(rec.catDesc || '').trim() || null) : null, observacoes: String(rec.obs || '').trim() || null };
    if (existente) await DB.upd('mapeamentos', id, base, 'Não foi possível salvar o mapeamento');
    else await DB.ins('mapeamentos', { id, paciente_id: p.dbId, profissional_id: prof ? prof.dbId : null, ...base }, 'Não foi possível salvar o mapeamento');
    if (existente) await DB.updWhere('mapeamento_marcacoes', { excluido_em: agoraIso() }, { mapeamento_id: id, excluido_em: null });
    const prodId = (nome) => { const mp = mapProd(nome); if (mp && mp.prodId) return mp.prodId; const pr = nome && (CAT_EXTRA.v.produtos || []).find((x) => x.nome.toLowerCase().startsWith(String(nome).toLowerCase())); return pr ? pr.id : null; };
    const rows = [
      ...rec.points.map((x, i) => { const mp = mapProd(x.prod) || {}; const u = x.un != null ? x.un : mp.u; return { mapeamento_id: id, tipo: 'ponto', ordem: i + 1, produto_id: prodId(x.prod), item_mapa: x.prod, dose: x.dose || null, unidade: u ? String(u).trim() : null, posicao_x: Math.round(x.x * 100) / 100, posicao_y: Math.round(x.y * 100) / 100, cor: x.cor || mp.c || null, comentario: x.com || null }; }),
      ...rec.strokes.map((s, i) => ({ mapeamento_id: id, tipo: s.type === 'pen' ? 'pincel' : 'linha', ordem: rec.points.length + i + 1, pontos_tracado: s.pts.map((q) => [Math.round(q[0] * 10) / 10, Math.round(q[1] * 10) / 10]), cor: s.color, espessura: Math.round(s.w), opacidade: s.op, comentario: s.com || null })),
    ];
    if (rows.length) await DB.ins('mapeamento_marcacoes', rows, 'Não foi possível salvar as marcações');
    return id;
  },
  // procedimento registrado no prontuário; data e hora digitadas valem como horário de Brasília. Anexos vão para a pasta Procedimentos.
  async salvarProc(p, r, pastas) {
    const id = novoId(); const pr = (CAT.v.procedimentos || []).find((x) => x.nome === r.title); const prof = PROF0.find((x) => x.nome === r.pro);
    const dt = String(r.dt || ''), quando = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(dt) ? BR.instante(dt.slice(0, 10), dt.slice(11, 16)) : new Date();
    await DB.ins('procedimentos_realizados', { id, paciente_id: p.dbId, mapeamento_id: r.mapaId || null, procedimento_id: pr ? pr.id : null, procedimento_nome: r.title, profissional_id: prof ? prof.dbId : null, status: { Realizado: 'realizado', Agendado: 'agendado', Cancelado: 'cancelado' }[r.status] || 'realizado', data_hora: quando.toISOString(), duracao_minutos: r.dur, valor: r.valor != null ? r.valor : pr ? pr.valor : null, regiao: String(r.regiao || '').trim() || null, observacoes: r.obs || null }, 'Não foi possível registrar o procedimento');
    if (r.mats && r.mats.length) await DB.ins('procedimento_insumos', r.mats.map((m) => { const pd = (CAT_EXTRA.v.produtos || []).find((x) => x.nome === m.nome); return { procedimento_realizado_id: id, produto_id: pd ? pd.id : null, produto_nome: m.nome, quantidade: m.q, unidade: pd && pd.unidade ? pd.unidade.nome : null }; }), 'Não foi possível registrar os materiais');
    let docs = [];
    if (r.arquivos && r.arquivos.length) {
      const rows = await ProntSvc.enviarArquivos(p, r.arquivos, 'Procedimentos', pastas || [], 'upload_equipe', { procedimento_realizado_id: id });
      docs = await Promise.all(rows.map(async (d) => ({ id: d.id, dbId: d.id, name: d.nome_arquivo, folder: 'Procedimentos', pastaId: d.pasta_id, date: BR.dataTela(d.data), type: d.tipo_arquivo === 'pdf' ? 'pdf' : d.tipo_arquivo === 'outro' ? 'outro' : 'img', url: await ARQ.url('prontuario', d.path).catch(() => null), path: d.path, criado: d.criado_em, procId: id })));
    }
    return { id, docs };
  },
  async enviarArquivos(p, files, pastaNomeAlvo, pastas, origem, extra) {
    const pastaId = await ProntSvc.pastaId(p, pastaNomeAlvo, pastas);
    const out = [];
    for (const f of files) {
      const path = await ARQ.enviar('prontuario', 'pacientes/' + p.dbId + '/documentos', f);
      const tipo = /pdf$/i.test(f.type) || /\.pdf$/i.test(f.name) ? 'pdf' : f.type.startsWith('image/') ? 'imagem' : 'outro';
      const r = await DB.ins('documentos_paciente', { paciente_id: p.dbId, pasta_id: pastaId, nome_arquivo: f.name, arquivo_path: path, tipo_arquivo: tipo, mime_type: f.type || null, tamanho_bytes: f.size, origem: origem || 'upload_equipe', ...(extra || {}) }, 'Não foi possível salvar o documento');
      out.push({ ...r, path });
    }
    return out;
  },
  async moverDoc(p, doc, pasta, pastas) { const pid = await ProntSvc.pastaId(p, pasta, pastas); return DB.upd('documentos_paciente', doc.dbId, { pasta_id: pid }, 'Não foi possível mover o documento'); },
  excluirDoc(doc) { return DB.del('documentos_paciente', doc.dbId, 'Não foi possível excluir o documento'); },
  async salvarComparacao(p, a, b, pastas) {
    const garantirDoc = async (d, pasta) => {
      if (d.dbId) return d.dbId;
      const blob = await (await fetch(d.url)).blob(); const f = new File([blob], d.name, { type: blob.type || 'image/jpeg' });
      const [r] = await ProntSvc.enviarArquivos(p, [f], pasta, pastas); d.dbId = r.id; d.id = r.id; return r.id;
    };
    const ida = await garantirDoc(a, 'Antes'), idb = await garantirDoc(b, 'Depois');
    const pid = await ProntSvc.pastaId(p, 'Antes e Depois', pastas);
    const r = await DB.ins('comparacoes_antes_depois', { paciente_id: p.dbId, pasta_id: pid, nome: 'Antes e depois ' + HOJE.slice(0, 5), documento_antes_id: ida, documento_depois_id: idb }, 'Não foi possível salvar o antes e depois');
    return r.id;
  },
  async linkDocumentos(p, pastaNomeAlvo, pastas) {
    const pid = await ProntSvc.pastaId(p, pastaNomeAlvo, pastas);
    const r = await DB.ins('links_envio_documentos', { paciente_id: p.dbId, pasta_id: pid }, 'Não foi possível gerar o link de envio');
    return linkDocs(r.token);
  },
};

/* =====================================================================
   AGENDA
   ===================================================================== */
const AG_JANELA = { de: null, ate: null };
const agTela = (r) => {
  const ini = new Date(r.inicio), fim = new Date(r.fim), pz = BR.partes(ini);
  return { id: r.id, dbId: r.id, pac: r.paciente ? r.paciente.nome : (r.observacoes || 'Compromisso'), pacId: r.paciente_id, profId: r.profissional_id, date: pz.iso, h: pz.h, m: pz.m,
    span: Math.max(0.25, (fim - ini) / 3600000), ini: r.inicio, fim: r.fim, proc: r.procedimento ? r.procedimento.nome : '', orb: r.cor || (r.tipo && r.tipo.cor) || '#7C8CFF',
    status: r.status ? r.status.chave : null, tipo: r.tipo ? r.tipo.chave : null, duplicado: r.horario_duplicado, origem: r.origem };
};
const AG_SELECT = '*, paciente:pacientes(nome), procedimento:procedimentos(nome), status:status_agendamento(chave,nome,cor), tipo:tipos_agendamento(chave,nome,cor)';
CARGAS.agenda = async () => {
  await carregar('catalogos');
  const de = BR.instante(isoOf(addD(TODAY, -150))), ate = BR.instante(isoOf(addD(TODAY, 240)));
  AG_JANELA.de = de; AG_JANELA.ate = ate;
  const rows = await DB.tudo(() => DB.sel('agendamentos', AG_SELECT).gte('inicio', de.toISOString()).lt('inicio', ate.toISOString()).order('inicio').order('id'));
  APPT_STORE.v = rows.map(agTela); avisar(APPT_STORE);
  tempoReal('agenda', ['agendamentos'], async (t, ev) => {
    const id = (ev.new && ev.new.id) || (ev.old && ev.old.id); if (!id) return;
    const r = await DB.ler(DB.sel('agendamentos', AG_SELECT).eq('id', id)).catch(() => []);
    const resto = APPT_STORE.v.filter((a) => a.id !== id);
    APPT_STORE.v = r[0] ? [...resto, agTela(r[0])] : resto; avisar(APPT_STORE);
  });
};
// mês fora da janela carregada: busca e junta
async function agendaGarantirMes(mes) {
  if (!SB_ON || !AG_JANELA.de) return;
  const ini = BR.instante(isoOf(new Date(mes.getFullYear(), mes.getMonth(), 1))), fim = BR.instante(isoOf(new Date(mes.getFullYear(), mes.getMonth() + 1, 1)));
  if (ini >= AG_JANELA.de && fim <= AG_JANELA.ate) return;
  const rows = await DB.ler(DB.sel('agendamentos', AG_SELECT).gte('inicio', ini.toISOString()).lt('inicio', fim.toISOString()).order('inicio')).catch(() => []);
  const ids = new Set(APPT_STORE.v.map((a) => a.id));
  APPT_STORE.v = [...APPT_STORE.v, ...rows.map(agTela).filter((a) => !ids.has(a.id))]; avisar(APPT_STORE);
  if (ini < AG_JANELA.de) AG_JANELA.de = ini; if (fim > AG_JANELA.ate) AG_JANELA.ate = fim;
}
// blocos de um dia no formato da grade (coluna por profissional, linha a partir das 9h)
function agendaDoDia(d) {
  const iso = isoOf(d);
  return APPT_STORE.v.filter((a) => a.date === iso && a.status !== 'cancelado').map((a) => ({ col: PROS.findIndex((p) => p.id === a.profId), row: a.h - 9 + a.m / 60, n: a.pac, orb: a.orb, span: a.span, id: a.id, hi: BR.hm(a.ini), hf: BR.hm(a.fim), proc: a.proc })).filter((s) => s.col >= 0);
}
const AgSvc = {
  async criar({ pacienteId, pacienteNome, profissionalId, inicio, fim: fimParam, minutos, procedimento, duplicado, whatsapp, origem, tipo, conversaId }) {
    const pr = procedimento ? (CAT.v.procedimentos || []).find((x) => x.nome === procedimento) : null;
    // fim pode ser passado diretamente (horaFim) ou calculado por minutos/duração padrão
    const fim = fimParam instanceof Date ? fimParam : new Date(inicio.getTime() + (minutos || (pr && pr.duracao_padrao_minutos) || 60) * 60000);
    const st = (CAT.v.status || []).find((s) => s.chave === 'agendado'); const tp = (CAT.v.tipos || []).find((s) => s.chave === (tipo || 'consulta'));
    const r = await DB.ins('agendamentos', { paciente_id: pacienteId || null, profissional_id: profissionalId, procedimento_id: pr ? pr.id : null, inicio: inicio.toISOString(), fim: fim.toISOString(), status_agendamento_id: st ? st.id : null, tipo_agendamento_id: tp ? tp.id : null, horario_duplicado: !!duplicado, enviar_confirmacao_whatsapp: whatsapp !== false, origem: origem || 'equipe', observacoes: pacienteId ? null : pacienteNome || null, conversa_id: conversaId || null }, 'Não foi possível agendar');
    const full = await DB.ler(DB.sel('agendamentos', AG_SELECT).eq('id', r.id));
    const a = agTela(full[0] || r);
    APPT_STORE.v = [...APPT_STORE.v.filter((x) => x.id !== a.id), a]; avisar(APPT_STORE);
    return a;
  },
};
// números do quadro "Atividade mensal" e indicadores da Agenda
function agendaResumo(dia) {
  const ap = APPT_STORE.v.filter((a) => a.status !== 'cancelado');
  const doDia = ap.filter((a) => a.date === isoOf(dia));
  const min = doDia.reduce((s, a) => s + a.span * 60, 0);
  const tempo = min ? Math.floor(min / 60) + 'h ' + String(Math.round(min % 60)).padStart(2, '0') + 'm' : '0h 00m';
  const porPac = {};
  ap.filter((a) => a.pacId && a.date <= TODAY_ISO).forEach((a) => { (porPac[a.pacId] = porPac[a.pacId] || []).push(a.date); });
  const gaps = [];
  Object.values(porPac).forEach((ds) => { const u = Array.from(new Set(ds)).sort(); for (let i = 1; i < u.length; i++) gaps.push((new Date(u[i]) - new Date(u[i - 1])) / 86400000); });
  const media = gaps.length ? Math.round(gaps.reduce((s, x) => s + x, 0) / gaps.length) + ' dias' : 'Sem dados';
  const cont = [0, 0, 0, 0, 0, 0, 0], ini30 = isoOf(addD(TODAY, -30));
  ap.filter((a) => a.date >= ini30 && a.date <= TODAY_ISO).forEach((a) => { cont[new Date(a.date + 'T12:00:00').getDay()]++; });
  const mx = Math.max(...cont); const NOMES = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  return { tempo, media, melhor: mx ? NOMES[cont.indexOf(mx)] : 'Sem dados' };
}
function mesGrade(ref) {
  const ini = new Date(ref.getFullYear(), ref.getMonth(), 1), dias = new Date(ref.getFullYear(), ref.getMonth() + 1, 0).getDate();
  const pre = isoOf(ini).slice(0, 7);
  const bold = Array.from(new Set(APPT_STORE.v.filter((a) => a.status !== 'cancelado' && a.date.slice(0, 7) === pre).map((a) => +a.date.slice(8, 10))));
  return { startOffset: ini.getDay(), days: dias, today: TODAY.getFullYear() === ref.getFullYear() && TODAY.getMonth() === ref.getMonth() ? TODAY.getDate() : -1, bold };
}


Object.assign(window, { substituir, substituirObj, novoId, hidratarCatalogos, CAT_EXTRA, pk, pacTela, PacSvc, ProntSvc, AgSvc, agendaDoDia, agendaGarantirMes, agendaResumo, mesGrade, linkAnamnese, linkDocs, quemSou, LINK_BASE, avisar });

/* ---------- Novo agendamento rápido (botão global do topo) ---------- */
const MES_CURTO = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
async function agendarRapido(nv, setToast) {
  const nome = String(nv.pac || '').trim();
  if (!nome) { avisoErro('Falta o paciente', 'Digite o nome do paciente.'); return false; }
  const pro = PROS.find((x) => x.n === (nv.pro || (PROS[0] || {}).n));
  if (!pro) { avisoErro('Falta o profissional', 'Cadastre um profissional em Configurações.'); return false; }
  const hm = /^\d{1,2}:\d{2}$/.test(String(nv.hora || '')) ? String(nv.hora).padStart(5, '0') : '09:00';
  const hmFim = /^\d{1,2}:\d{2}$/.test(String(nv.horaFim || '')) ? String(nv.horaFim).padStart(5, '0') : null;
  let dia = TODAY_ISO, ini = BR.instante(dia, hm);
  if (ini < new Date()) { dia = isoOf(addD(TODAY, 1)); ini = BR.instante(dia, hm); } // horário que já passou vai para amanhã
  // fim: usa horaFim se fornecido, caso contrário +1h
  const fim = hmFim ? BR.instante(dia, hmFim) : new Date(ini.getTime() + 3600000);
  // garante que fim > ini (se horaFim inválido ou menor, +1h do início)
  const fimFinal = fim > ini ? fim : new Date(ini.getTime() + 3600000);
  try {
    await Promise.all([carregar('pacientes'), carregar('agenda')]);
    const p = await PacSvc.garantir(nome);
    const choca = APPT_STORE.v.some((a) => a.profId === pro.id && a.status !== 'cancelado' && new Date(a.ini) < fimFinal && new Date(a.fim) > ini);
    const a = await AgSvc.criar({ pacienteId: p.dbId, pacienteNome: p.nome, profissionalId: pro.id, inicio: ini, fim: fimFinal, duplicado: choca, whatsapp: nv.wpp, origem: 'equipe', conversaId: nv.conversaId || null });
    PacSvc.hist(p, { t: 'Agendamento criado', s: pro.n + ' · ' + dBR(dia) + ' às ' + hm, c: '#1F5EFF', tipo: 'agendamento', tabela: 'agendamentos', registro: a.id });
    setToast({ tone: 'success', title: 'Agendamento criado', description: p.nome + ' · ' + (+dia.slice(8, 10)) + ' ' + MES_CURTO[+dia.slice(5, 7) - 1] + ' · ' + hm });
    return true;
  } catch (e) { return false; }
}
window.agendarRapido = agendarRapido;

// demonstração: produtos do mapa ligados ao estoque de exemplo
if (!SB_ON) hidratarMapa();
