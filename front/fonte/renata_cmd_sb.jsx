/* =====================================================================
   COMANDO DE VOZ EM TODO O SISTEMA
   Botão de microfone no topo (e Ctrl + M): fala um pedido e a Renata age.
   Consultas e navegação acontecem na hora. Tudo que grava vira um cartão
   para confirmar (falando "sim" ou tocando em Confirmar), respeita o acesso
   de cada usuário e fica registrado como feito pela Renata IA.
   Com um campo de texto selecionado, Ctrl + M dita direto no campo.
   ===================================================================== */
const { IconButton: VIconBtn } = window.SaluteProjetoDesigner_8b4683;

/* ---------- acesso, nomes, datas e horários ---------- */
function rnPode(id) {
  const meus = SESSAO.v && SESSAO.v.modulos; const va = VIEW_AS.v;
  const m = va ? (TEAM_STORE.v || []).find((x) => x.id === va) : null;
  return (!meus || meus.includes(id)) && (!m || m.dono || (m.acc || []).includes(id));
}
const RN_SEM_ACESSO = { agenda: 'a Agenda', pacientes: 'Pacientes', mensagens: 'Mensagens', 'gestao.financeiro': 'o Financeiro', 'gestao.estoque': 'o Estoque' };
const rnSemAcesso = (id) => ({ erro: 'Seu usuário não tem acesso a ' + (RN_SEM_ACESSO[id] || 'essa área') + '. Peça ao gestor da clínica para liberar em Equipe e acessos.' });
function rnAcharPaciente(nome) {
  const t = rnNorm(nome).replace(/[^a-z0-9 ]/g, ' ').replace(/\b(paciente|cliente|dona|senhora|senhor|sr|sra|da|do|de|dos|das|a|o)\b/g, ' ').replace(/\s+/g, ' ').trim();
  if (!t) return { erro: 'De qual paciente?' };
  const n = (p) => rnNorm(p.nome).replace(/[^a-z0-9 ]/g, ' ');
  let c = PAC.filter((p) => p.nome && n(p).replace(/\s+/g, ' ').trim() === t);
  if (!c.length) { const ws = t.split(' ').filter((w) => w.length > 1); c = PAC.filter((p) => p.nome && ws.length && ws.every((w) => n(p).split(/\s+/).some((x) => x === w || (w.length > 3 && x.startsWith(w))))); }
  if (c.length === 1) return { p: c[0] };
  if (c.length > 1) return { erro: 'Encontrei mais de um paciente com esse nome: ' + c.slice(0, 5).map((p) => p.nome).join(', ') + '. Qual deles?' };
  return { erro: 'Não encontrei paciente com o nome ' + String(nome || '').trim() + ' no cadastro.', naoEncontrado: true };
}
function rnAcharProf(nome) {
  const t = rnNorm(nome).replace(/[^a-z0-9 ]/g, ' ').replace(/\b(dra|dr|doutora|doutor|com|a|o|da|do)\b/g, ' ').replace(/\s+/g, ' ').trim();
  if (!t) return null;
  const ws = t.split(' ').filter((w) => w.length > 2);
  const i = PROS.findIndex((p) => { const x = rnNorm(p.n); return ws.length && ws.every((w) => x.includes(w)); });
  return i >= 0 ? { ...PROS[i], i } : null;
}
function rnProcNome(t) {
  if (!t) return null;
  const q = rnNorm(t);
  const ex = FIN_PROCS.find((x) => rnNorm(x.n) === q); if (ex) return ex.n;
  const s = rnProcOf(t); if (s && FIN_PROCS.some((x) => x.n === s)) return s;
  const pa = FIN_PROCS.find((x) => rnNorm(x.n).includes(q) || q.includes(rnNorm(x.n))); return pa ? pa.n : null;
}
const rnDataOk = (s) => (/^\d{4}-\d{2}-\d{2}$/.test(String(s || '')) ? String(s) : null);
const rnHora = (h) => { const m = String(h || '').trim().toLowerCase().match(/^(\d{1,2})(?:\s*(?::|h)\s*(\d{2})?)?/); if (!m) return null; const H = +m[1], M = +(m[2] || 0); if (H > 23 || M > 59) return null; return String(H).padStart(2, '0') + ':' + String(M).padStart(2, '0'); };
const rnDec = (hh) => { const [a, b] = hh.split(':'); return +a + +b / 60; };
const rnHM2 = (t) => String(Math.floor(t + 1e-6)).padStart(2, '0') + ':' + String(Math.round((t - Math.floor(t + 1e-6)) * 60)).padStart(2, '0');
const rnDiaTxt = (iso) => { const d = new Date(iso + 'T12:00:00'); const s = iso === TODAY_ISO ? 'hoje' : iso === rnIso(addD(TODAY, 1)) ? 'amanhã' : RN_DIAS_SEMANA[d.getDay()]; return s + ', ' + dBR(iso).slice(0, 5); };
const rnPrimeiro = (nome) => String(nome || '').split(' ')[0];
const rnHmAg = (a) => (a.ini ? BR.hm(a.ini) : qHH(a.h));
function rnExpediente(iso) {
  const dw = new Date(iso + 'T12:00:00').getDay();
  if (SB_ON) {
    const h = (CAT.v.horarios || []).find((x) => x.dia_semana === dw);
    if (!h) return dw === 0 ? null : [8, 19];
    if (!h.aberto) return null;
    const f = (s) => { const [a, b] = String(s || '0:0').split(':'); return +a + (+b || 0) / 60; };
    return [f(h.hora_inicio), f(h.hora_fim)];
  }
  return dw === 0 ? null : dw === 6 ? [8, 12] : [8, 19];
}
async function rnBloqueios(iso) {
  if (!SB_ON) return [];
  const a = BR.instante(iso, '00:00'), b = new Date(BR.instante(iso, '23:59').getTime() + 59000); // o dia inteiro no horário de Brasília
  const rows = await DB.ler(DB.sel('bloqueios_horario', 'profissional_id,inicio,fim,dia_inteiro').lt('inicio', b.toISOString()).gt('fim', a.toISOString())).catch(() => []);
  return rows.map((r) => { const i = new Date(r.inicio), f = new Date(r.fim); return { prof: r.profissional_id, a: r.dia_inteiro || i < a ? 0 : BR.horaDec(i), b: r.dia_inteiro || f > b ? 24 : BR.horaDec(f) }; });
}
// horários ocupados de um profissional (coluna da agenda) num dia, em horas
const rnOcupados = (iso, col, semId) => slotsFor(new Date(iso + 'T00:00:00')).filter((s) => s.col === col && (!semId || s.id !== semId)).map((s) => [9 + s.row, 9 + s.row + Math.max(0.25, s.span || 1)]);
async function rnLivres(iso, pr, durH, semId) {
  const exp = rnExpediente(iso); if (!exp) return null;
  const bl = (await rnBloqueios(iso)).filter((b) => !b.prof || b.prof === pr.id).map((b) => [b.a, b.b]);
  const occ = rnOcupados(iso, pr.i, semId).concat(bl);
  const agora = iso === TODAY_ISO ? BR.horaDec() : -1;
  const out = [];
  for (let t = exp[0]; t + durH <= exp[1] + 1e-9; t += 0.5) { if (t < agora) continue; if (occ.some(([a, b]) => t < b - 1e-9 && t + durH > a + 1e-9)) continue; out.push(t); }
  return { exp, livres: out, occ };
}

/* ---------- ação para confirmar ---------- */
function rnCmd(registro, titulo, rows, resumo, run, dados) {
  const a = { id: 'a' + (__rnActId++), kind: 'cmd', registro, titulo, rows, resumo, run, items: [], dados: dados || {} };
  rnSetPending(a);
  return { status: 'aguardando confirmação da pessoa', resumo: rnPlain(resumo) };
}
async function rnExecCmd(a) {
  try {
    const r = (await a.run()) || {};
    if (SB_ON) { const acaoId = novoId(); rnRegistrarAcao(a, 'lancado', acaoId).then(() => { if (r.gerados && r.gerados.length) SB.from('renata_acoes').update({ registros_gerados: r.gerados }).eq('id', acaoId).then(() => {}); }).catch(() => {}); }
    return r.texto || 'Pronto!';
  } catch (e) {
    a.falhou = true;
    return 'Não consegui concluir agora: ' + (typeof MSG_ERRO === 'function' ? MSG_ERRO(e) : String((e && e.message) || e)) + '.';
  }
}
const rnErroDemo = (o) => ({ texto: 'No modo demonstração isso não é gravado, mas no sistema conectado eu ' + o + '.' });

/* ---------- ficha do paciente aberta de qualquer tela ---------- */
const FICHA_GLOBAL = makeStore(null);
function rnAbrirFicha(p, aba) {
  FICHA_GLOBAL.v = { p, aba: { conversa: 'conversa', dados: 'dados', prontuario: 'pront', 'prontuário': 'pront' }[aba] || 'dados', t: Date.now() }; avisar(FICHA_GLOBAL);
  RN_STORE.v = { ...RN_STORE.v, nav: Date.now() }; avisar(RN_STORE);
}
function FichaGlobal({ mobile }) {
  const [f, setF] = useStore(FICHA_GLOBAL);
  if (!f) return null;
  return <PacienteFicha key={f.t} p={f.p} initialTab={f.aba} mobile={mobile} onClose={() => setF(null)}
    onUpdate={(np) => { setF({ ...f, p: np }); if (!SB_ON) { PAC_STORE.v = PAC_STORE.v.map((x) => (x.nome === f.p.nome ? np : x)); avisar(PAC_STORE); } }} />;
}

/* ---------- navegação por telas e abas ---------- */
const RN_DESTINOS = [
  ['financeiro.receitas', /\breceitas?\b|contas a receber/, 'as receitas', 'gestao', { 'gestao.area': 'financeiro', 'financeiro.aba': 'rec' }, 'gestao.financeiro'],
  ['financeiro.despesas', /\bdespesas?\b|contas a pagar/, 'as despesas', 'gestao', { 'gestao.area': 'financeiro', 'financeiro.aba': 'desp' }, 'gestao.financeiro'],
  ['financeiro.nota_fiscal', /nota fiscal|notas fiscais/, 'a nota fiscal', 'gestao', { 'gestao.area': 'financeiro', 'financeiro.aba': 'nf' }, 'gestao.financeiro'],
  ['financeiro.salute_pay', /salute pay/, 'o Salute Pay', 'gestao', { 'gestao.area': 'financeiro', 'financeiro.aba': 'pay' }, 'gestao.financeiro'],
  ['financeiro.categorias', /categorias (do )?financeir/, 'as categorias do financeiro', 'gestao', { 'gestao.area': 'financeiro', 'financeiro.aba': 'cats' }, 'gestao.financeiro'],
  ['financeiro', /financeiro|fluxo de caixa|\bcaixa\b|faturamento/, 'o financeiro', 'gestao', { 'gestao.area': 'financeiro', 'financeiro.aba': 'geral' }, 'gestao.financeiro'],
  ['estoque.relatorios', /relatorios? (do |de )?estoque|consumo do estoque/, 'os relatórios do estoque', 'gestao', { 'gestao.area': 'estoque', 'estoque.aba': 'relatorios' }, 'gestao.estoque'],
  ['estoque', /estoque|insumos|\bprodutos\b/, 'o estoque', 'gestao', { 'gestao.area': 'estoque', 'estoque.aba': 'produtos' }, 'gestao.estoque'],
  ['crm', /\bcrm\b|\bfunil\b|\bleads?\b/, 'o CRM', 'mensagens', { 'mensagens.crm': true }, 'mensagens'],
  ['mensagens.equipe', /(chat|mensagens|conversas?) da equipe|equipe interna/, 'o chat da equipe', 'mensagens', { 'mensagens.crm': false, 'mensagens.aba': 'd' }, 'mensagens'],
  ['mensagens', /mensage|conversas|whatsapp|inbox/, 'as mensagens', 'mensagens', { 'mensagens.crm': false, 'mensagens.aba': 'p' }, 'mensagens'],
  ['agenda', /\bagenda\b|agendamentos|calendario/, 'a agenda', 'agenda', {}, 'agenda'],
  ['configuracoes.anamnese', /modelos? de anamnese/, 'os modelos de anamnese', 'perfil', { 'config.aba': 'cadastro', 'config.cadastro': 'anamnese' }, 'perfil.cadastro'],
  ['configuracoes.equipe', /equipe e acessos|\bacessos\b|permissoes/, 'a equipe e acessos', 'perfil', { 'config.aba': 'cadastro', 'config.cadastro': 'equipe' }, 'perfil.cadastro'],
  ['configuracoes.profissionais', /\bprofissionais\b/, 'os profissionais', 'perfil', { 'config.aba': 'cadastro', 'config.cadastro': 'profissionais' }, 'perfil.cadastro'],
  ['configuracoes.procedimentos', /\bprocedimentos\b|tabela de precos|lista de precos|precos dos procedimentos/, 'os procedimentos', 'perfil', { 'config.aba': 'cadastro', 'config.cadastro': 'procedimentos' }, 'perfil.cadastro'],
  ['configuracoes.clinica', /dados da clinica|cadastro da clinica/, 'os dados da clínica', 'perfil', { 'config.aba': 'cadastro', 'config.cadastro': 'clinica' }, 'perfil.cadastro'],
  ['configuracoes.canais', /\bcanais\b|conexao do whatsapp|instagram/, 'os canais', 'perfil', { 'config.aba': 'canais' }, 'perfil.canais'],
  ['configuracoes.saluteflix', /saluteflix|cursos|salute cast|podcast/, 'o Saluteflix', 'perfil', { 'config.aba': 'flix' }, 'perfil.flix'],
  ['configuracoes.parcerias', /parcerias|parceiros|cupons?/, 'as parcerias', 'perfil', { 'config.aba': 'parcerias' }, 'perfil.parcerias'],
  ['configuracoes.certificacoes', /certificac|\bselos?\b/, 'as certificações', 'perfil', { 'config.aba': 'cert' }, 'perfil.cert'],
  ['minha_conta', /minha conta|meu perfil|meu plano|minha senha/, 'a sua conta', 'perfil', { 'config.aba': 'conta' }, 'perfil.conta'],
  ['configuracoes', /configurac|ajustes/, 'as configurações', 'perfil', {}, 'perfil'],
  ['pacientes', /\bpacientes?\b/, 'os pacientes', 'pacientes', {}, 'pacientes'],
  ['painel', /\bpainel\b|\binicio\b|dashboard|tela inicial/, 'o painel', 'painel', {}, 'painel'],
];
function rnIrPara(chave) {
  const d = RN_DESTINOS.find((x) => x[0] === chave); if (!d) return { aberta: false, erro: 'Tela desconhecida' };
  if (d[5] && d[5].includes('.') && !rnPode(d[5])) return { aberta: false, erro: 'Seu usuário não tem acesso a ' + d[2] + '.' };
  const prefs = d[4];
  if (Object.keys(prefs).length) {
    if (SB_ON && PREF.v) salvarPref({ filtros: { ...((PREF.v && PREF.v.filtros) || {}), ...prefs } });
    else if (prefs['gestao.area']) { try { localStorage.setItem('salute-kit:gestao', prefs['gestao.area']); } catch (e) {} }
  }
  const ok = window.RN_NAV ? window.RN_NAV(d[3]) : false;
  return ok ? { aberta: true, tela: d[2] } : { aberta: false, erro: 'Seu usuário não tem acesso a ' + d[2] + '.' };
}
const RN_UN_FALADA = [[/\bunidades?\b|\bu\b/, 'U'], [/\bmililitros?\b|\bml\b/, 'ml'], [/\bseringas?\b/, 'seringa'], [/\bmiligramas?\b|\bmg\b/, 'mg'], [/\bcentimetros?\b|\bcm\b/, 'cm'], [/\bsess(ao|oes)\b/, 'sessão'], [/\baplicac(ao|oes)\b/, 'aplicação']];
// comandos curtos resolvidos sem IA: abrir telas, abrir a ficha de alguém e ajustar o ponto do mapa aberto
function rnComandoLocal(question) {
  const q = rnNorm(question).replace(/[?!.,;:]/g, ' ').replace(/\s+/g, ' ').trim();
  if (!q) return null;
  if (window.RN_MAPA) {
    const m = rnWords2Num(q).match(/^(?:no |o )?ponto (\d+)\s*(?:com |para |pra |fica |ficou |passa para |muda para )?(?:(\d+(?:[.,]\d+)?)\s*(.*))?$/);
    if (m && m[2]) { const un = (RN_UN_FALADA.find(([re]) => re.test(m[3] || '')) || [])[1]; const r = window.RN_MAPA.ajustar(+m[1], { quantidade: +m[2].replace(',', '.'), unidade: un }); return r.erro ? r.erro : 'Pronto, o ponto ' + m[1] + ' ficou com ' + r.agora + '.'; }
  }
  if (q.split(' ').length > 9 || /\b(quanto|quantos|quem|qual|quais|como|porque|por que|me diz|me fala|e me|resume|resumo)\b/.test(q)) return null;
  if (!/^(abr[ae]|abrir|abra|vai|va|ir|me leva|leva|leve|mostra|mostre|mostrar|entra|entre|entrar|quero ver|ver|exibe|exibir)\b/.test(q)) return null;
  const fm = q.match(/\b(ficha|prontuario|cadastro|conversa)\b.*?\b(?:da|do|de)\s+(?:paciente\s+)?(.+)$/);
  if (fm) {
    if (!rnPode('pacientes')) return rnSemAcesso('pacientes').erro;
    const r = rnAcharPaciente(fm[2]); if (r.erro) return r.erro;
    rnAbrirFicha(r.p, fm[1] === 'prontuario' ? 'prontuario' : fm[1] === 'conversa' ? 'conversa' : 'dados');
    return 'Abri ' + (fm[1] === 'prontuario' ? 'o prontuário' : fm[1] === 'conversa' ? 'a conversa' : 'a ficha') + ' de ' + r.p.nome + '.';
  }
  const d = RN_DESTINOS.find(([, re]) => re.test(q)); if (!d) return null;
  const r = rnIrPara(d[0]);
  return r.aberta ? 'Pronto, abri ' + d[2] + '.' : r.erro;
}

/* =====================================================================
   FERRAMENTAS NOVAS DA RENATA
   ===================================================================== */
const RN_ABRIR = RENATA_TOOLS.findIndex((t) => t.name === 'abrir_tela');
const RN_TOOL_ABRIR = { name: 'abrir_tela', description: 'Abre uma tela ou aba do sistema Salute IA para a pessoa. Use quando ela pedir para abrir, ir para ou mostrar uma tela ou aba.', inputSchema: { type: 'object', properties: { tela: { type: 'string', enum: RN_DESTINOS.map((d) => d[0]), description: 'gestao fica dentro de estoque e financeiro; configuracoes.* são as abas de Configurações' } }, required: ['tela'] },
  execute: (i) => { const k = String(i.tela || ''); const d = RN_DESTINOS.find((x) => x[0] === k) || RN_DESTINOS.find((x) => x[0] === { gestao: 'estoque', perfil: 'configuracoes' }[k]); return d ? rnIrPara(d[0]) : { aberta: false, erro: 'Tela desconhecida' }; } };
if (RN_ABRIR >= 0) RENATA_TOOLS[RN_ABRIR] = RN_TOOL_ABRIR; else RENATA_TOOLS.push(RN_TOOL_ABRIR);

RENATA_TOOLS.push(
  { name: 'horarios_livres', description: 'Lista os horários livres de um dia, por profissional, já descontando agendamentos, bloqueios e o horário de funcionamento. Use antes de propor um agendamento quando a pessoa não disser a hora ou houver conflito.',
    inputSchema: { type: 'object', properties: { data: { type: 'string', description: 'AAAA-MM-DD' }, profissional: { type: 'string' }, duracao_minutos: { type: 'number' } }, required: ['data'] },
    execute: async (i) => {
      if (!rnPode('agenda')) return rnSemAcesso('agenda');
      const iso = rnDataOk(i.data); if (!iso) return { erro: 'Informe a data no formato AAAA-MM-DD.' };
      if (SB_ON) await agendaGarantirMes(new Date(iso + 'T12:00:00'));
      const pros = i.profissional ? [rnAcharProf(i.profissional)].filter(Boolean) : PROS.map((p, k) => ({ ...p, i: k }));
      if (!pros.length) return { erro: 'Não encontrei esse profissional. Profissionais: ' + PROS.map((p) => p.n).join(', ') };
      const durH = Math.max(15, Number(i.duracao_minutos) || 60) / 60, out = [];
      for (const pr of pros) { const l = await rnLivres(iso, pr, durH); if (!l) return { data: dBR(iso), fechado: true }; out.push({ profissional: pr.n, livres: l.livres.slice(0, 16).map(rnHM2), total: l.livres.length }); }
      const exp = rnExpediente(iso);
      return { data: dBR(iso), dia: rnDiaTxt(iso), expediente: rnHM2(exp[0]) + ' às ' + rnHM2(exp[1]), duracaoMinutos: Math.round(durH * 60), profissionais: out };
    } },
  { name: 'propor_agendamento', description: 'Prepara, SEM gravar, um agendamento para a pessoa confirmar. Confere conflito de horário e o funcionamento da clínica. Se o paciente não existir, ofereça cadastrar antes.',
    inputSchema: { type: 'object', properties: { paciente: { type: 'string' }, data: { type: 'string', description: 'AAAA-MM-DD' }, hora: { type: 'string', description: 'HH:MM' }, profissional: { type: 'string' }, procedimento: { type: 'string' }, duracao_minutos: { type: 'number' }, tipo: { type: 'string', enum: ['consulta', 'primeira_consulta', 'retorno'] }, enviar_confirmacao_whatsapp: { type: 'boolean' } }, required: ['paciente', 'data', 'hora'] },
    execute: async (i) => {
      if (!rnPode('agenda')) return rnSemAcesso('agenda');
      const rp = rnAcharPaciente(i.paciente); if (rp.erro) return rp; const p = rp.p;
      const iso = rnDataOk(i.data), hh = rnHora(i.hora); if (!iso || !hh) return { erro: 'Qual dia e horário?' };
      if (iso < TODAY_ISO || (iso === TODAY_ISO && rnDec(hh) < BR.horaDec())) return { erro: 'Esse horário já passou.' };
      const proc = i.procedimento ? rnProcNome(i.procedimento) : null;
      if (i.procedimento && !proc) return { erro: 'Não achei o procedimento ' + i.procedimento + '. Procedimentos: ' + FIN_PROCS.map((x) => x.n).join(', ') };
      let pr = i.profissional ? rnAcharProf(i.profissional) : null;
      if (i.profissional && !pr) return { erro: 'Não achei o profissional ' + i.profissional + '. Profissionais: ' + PROS.map((x) => x.n).join(', ') };
      if (!pr) { const aptos = proc ? PROF0.filter((x) => (x.procs || []).includes(proc)) : []; const k = aptos.length === 1 ? PROS.findIndex((x) => x.n === aptos[0].nome) : PROS.length === 1 ? 0 : -1; if (k < 0) return { erro: 'Com qual profissional? ' + PROS.map((x) => x.n).join(', ') }; pr = { ...PROS[k], i: k }; }
      if (SB_ON) await agendaGarantirMes(new Date(iso + 'T12:00:00'));
      const dur = Number(i.duracao_minutos) || (proc && PROC_DUR[proc]) || 60, durH = dur / 60, t = rnDec(hh);
      const l = await rnLivres(iso, pr, durH);
      if (!l) return { erro: 'A clínica não atende nesse dia (' + rnDiaTxt(iso) + ').' };
      if (t < l.exp[0] || t + durH > l.exp[1] + 1e-9) return { erro: 'Fora do horário de atendimento desse dia (' + rnHM2(l.exp[0]) + ' às ' + rnHM2(l.exp[1]) + ').' };
      if (l.occ.some(([a, b]) => t < b - 1e-9 && t + durH > a + 1e-9)) { const perto = l.livres.slice().sort((a, b) => Math.abs(a - t) - Math.abs(b - t)).slice(0, 3).sort((a, b) => a - b).map(rnHM2); return { erro: pr.n + ' já tem compromisso nesse horário.' + (perto.length ? ' Livres perto: ' + perto.join(', ') + '.' : ' Não há horário livre nesse dia.') }; }
      const resumo = 'Agendar **' + p.nome + '** para **' + rnDiaTxt(iso) + ' às ' + hh + '** com **' + pr.n + '**' + (proc ? ' (' + proc + ')' : '') + '?';
      return rnCmd('agendamento', 'AGENDAMENTO', [{ icon: 'calendar-plus', c: '#1F5EFF', t: 'Agendar · ' + p.nome, s: rnDiaTxt(iso) + ' às ' + hh + ' · ' + pr.n + (proc ? ' · ' + proc : ''), v: dur + ' min' }], resumo, async () => {
        if (!SB_ON) { APPT_STORE.v = [...APPT_STORE.v, { id: Date.now(), pac: p.nome, col: pr.i, date: iso, h: t, proc: proc || '' }]; avisar(APPT_STORE); return { texto: 'Pronto! Agendei ' + rnPrimeiro(p.nome) + ' para ' + rnDiaTxt(iso) + ' às ' + hh + ' com ' + pr.n + '.' }; }
        const ag = await AgSvc.criar({ pacienteId: p.dbId, pacienteNome: p.nome, profissionalId: pr.id, inicio: BR.instante(iso, hh), minutos: dur, procedimento: proc, whatsapp: i.enviar_confirmacao_whatsapp !== false, origem: 'renata_ia', tipo: i.tipo });
        PacSvc.hist(p, { t: 'Agendamento feito pela Renata IA', s: dBR(iso) + ' às ' + hh + ' · ' + pr.n + (proc ? ' · ' + proc : ''), c: '#7B4BC4', tipo: 'agendamento', origem: 'renata_ia', tabela: 'agendamentos', registro: ag.id });
        return { texto: 'Pronto! Agendei ' + rnPrimeiro(p.nome) + ' para ' + rnDiaTxt(iso) + ' às ' + hh + ' com ' + pr.n + '.', gerados: [{ tabela: 'agendamentos', id: ag.id }] };
      }, { paciente: p.nome, data: iso, hora: hh, profissional: pr.n, procedimento: proc, duracao: dur });
    } },
  { name: 'propor_alteracao_agendamento', description: 'Prepara, SEM gravar, a remarcação, o cancelamento ou a confirmação do agendamento de um paciente. Sem data atual, usa o próximo agendamento dele.',
    inputSchema: { type: 'object', properties: { paciente: { type: 'string' }, acao: { type: 'string', enum: ['remarcar', 'cancelar', 'confirmar'] }, data_atual: { type: 'string', description: 'AAAA-MM-DD do agendamento que vai mudar' }, hora_atual: { type: 'string' }, nova_data: { type: 'string' }, nova_hora: { type: 'string' } }, required: ['paciente', 'acao'] },
    execute: async (i) => {
      if (!rnPode('agenda')) return rnSemAcesso('agenda');
      const rp = rnAcharPaciente(i.paciente); if (rp.erro) return rp; const p = rp.p;
      const lista = APPT_STORE.v.filter((a) => (SB_ON ? a.pacId === p.dbId : a.pac === p.nome) && a.status !== 'cancelado' && a.date >= (i.data_atual ? '0000' : TODAY_ISO)).sort((a, b) => (a.date + rnHmAg(a)).localeCompare(b.date + rnHmAg(b)));
      const ag = i.data_atual ? lista.find((a) => a.date === rnDataOk(i.data_atual) && (!i.hora_atual || rnHmAg(a) === rnHora(i.hora_atual))) : lista[0];
      if (!ag) return { erro: 'Não encontrei agendamento ' + (i.data_atual ? 'de ' + p.nome + ' em ' + dBR(rnDataOk(i.data_atual) || '') : 'futuro de ' + p.nome) + '.' };
      const col = SB_ON ? PROS.findIndex((x) => x.id === ag.profId) : ag.col; const pr = { ...(PROS[col] || { n: '' }), i: col };
      const quando = rnDiaTxt(ag.date) + ' às ' + rnHmAg(ag);
      const stId = (k) => ((CAT.v.status || []).find((s) => s.chave === k) || {}).id;
      const recarregar = async () => { const full = await DB.ler(DB.sel('agendamentos', AG_SELECT).eq('id', ag.dbId)); if (full[0]) { APPT_STORE.v = APPT_STORE.v.map((x) => (x.id === ag.id ? agTela(full[0]) : x)); avisar(APPT_STORE); } };
      if (i.acao === 'cancelar' || i.acao === 'confirmar') {
        const cancelar = i.acao === 'cancelar';
        return rnCmd('alteracao_agendamento', cancelar ? 'CANCELAR AGENDAMENTO' : 'CONFIRMAR AGENDAMENTO', [{ icon: cancelar ? 'calendar-x' : 'calendar-check', c: cancelar ? '#E5484D' : '#7B4BC4', t: (cancelar ? 'Cancelar · ' : 'Confirmar · ') + p.nome, s: quando + (pr.n ? ' · ' + pr.n : '') + (ag.proc ? ' · ' + ag.proc : ''), v: '' }],
          (cancelar ? 'Cancelar o agendamento de **' : 'Marcar como confirmado o agendamento de **') + p.nome + '** de **' + quando + '**?', async () => {
            if (!SB_ON) { if (cancelar) { APPT_STORE.v = APPT_STORE.v.filter((x) => x.id !== ag.id); avisar(APPT_STORE); } return { texto: cancelar ? 'Pronto, cancelei o agendamento de ' + rnPrimeiro(p.nome) + '.' : 'Pronto, marquei como confirmado.' }; }
            await DB.upd('agendamentos', ag.dbId, { status_agendamento_id: stId(cancelar ? 'cancelado' : 'confirmado') }, 'Não foi possível atualizar o agendamento');
            await recarregar();
            PacSvc.hist(p, { t: (cancelar ? 'Agendamento cancelado' : 'Agendamento confirmado') + ' pela Renata IA', s: quando, c: cancelar ? '#E5484D' : '#7B4BC4', tipo: 'agendamento', origem: 'renata_ia', tabela: 'agendamentos', registro: ag.dbId });
            return { texto: cancelar ? 'Pronto, cancelei o agendamento de ' + rnPrimeiro(p.nome) + ' de ' + quando + '.' : 'Pronto, o agendamento de ' + rnPrimeiro(p.nome) + ' está confirmado.', gerados: [{ tabela: 'agendamentos', id: ag.dbId }] };
          }, { paciente: p.nome, acao: i.acao, quando });
      }
      const iso = rnDataOk(i.nova_data) || ag.date, hh = rnHora(i.nova_hora);
      if (!hh) return { erro: 'Para qual dia e horário vai remarcar?' };
      if (iso < TODAY_ISO) return { erro: 'Essa data já passou.' };
      const durH = Math.max(0.25, ag.span || 1), t = rnDec(hh);
      if (SB_ON) await agendaGarantirMes(new Date(iso + 'T12:00:00'));
      const l = await rnLivres(iso, pr, durH, ag.id);
      if (!l) return { erro: 'A clínica não atende nesse dia.' };
      if (t < l.exp[0] || t + durH > l.exp[1] + 1e-9) return { erro: 'Fora do horário de atendimento (' + rnHM2(l.exp[0]) + ' às ' + rnHM2(l.exp[1]) + ').' };
      if (l.occ.some(([a, b]) => t < b - 1e-9 && t + durH > a + 1e-9)) { const perto = l.livres.slice().sort((a, b) => Math.abs(a - t) - Math.abs(b - t)).slice(0, 3).sort((a, b) => a - b).map(rnHM2); return { erro: pr.n + ' já tem compromisso nesse horário.' + (perto.length ? ' Livres perto: ' + perto.join(', ') + '.' : '') }; }
      const novo = rnDiaTxt(iso) + ' às ' + hh;
      return rnCmd('alteracao_agendamento', 'REMARCAR AGENDAMENTO', [{ icon: 'calendar-clock', c: '#1F5EFF', t: 'Remarcar · ' + p.nome, s: 'De ' + quando + ' para ' + novo + (pr.n ? ' · ' + pr.n : ''), v: Math.round(durH * 60) + ' min' }],
        'Remarcar **' + p.nome + '** de ' + quando + ' para **' + novo + '**?', async () => {
          if (!SB_ON) { APPT_STORE.v = APPT_STORE.v.map((x) => (x.id === ag.id ? { ...x, date: iso, h: t } : x)); avisar(APPT_STORE); return { texto: 'Pronto, remarquei para ' + novo + '.' }; }
          const ini = BR.instante(iso, hh), fim = new Date(ini.getTime() + durH * 3600000);
          await DB.upd('agendamentos', ag.dbId, { inicio: ini.toISOString(), fim: fim.toISOString(), status_agendamento_id: stId('agendado') || undefined }, 'Não foi possível remarcar');
          await recarregar();
          PacSvc.hist(p, { t: 'Agendamento remarcado pela Renata IA', s: 'De ' + quando + ' para ' + novo, c: '#1F5EFF', tipo: 'agendamento', origem: 'renata_ia', tabela: 'agendamentos', registro: ag.dbId });
          return { texto: 'Pronto, remarquei ' + rnPrimeiro(p.nome) + ' para ' + novo + '.', gerados: [{ tabela: 'agendamentos', id: ag.dbId }] };
        }, { paciente: p.nome, acao: 'remarcar', de: quando, para: novo });
    } },
  { name: 'propor_cadastro_paciente', description: 'Prepara, SEM gravar, o cadastro de um paciente novo. Precisa do nome completo e do WhatsApp com DDD.',
    inputSchema: { type: 'object', properties: { nome: { type: 'string' }, whatsapp: { type: 'string' }, cpf: { type: 'string' }, nascimento: { type: 'string', description: 'AAAA-MM-DD' }, sexo: { type: 'string', enum: ['Feminino', 'Masculino', 'Prefiro não informar'] }, email: { type: 'string' }, tipo: { type: 'string', enum: ['Particular', 'Convênio', 'Empresarial'] }, convenio: { type: 'string' }, empresa: { type: 'string' } }, required: ['nome', 'whatsapp'] },
    execute: (i) => {
      if (!rnPode('pacientes')) return rnSemAcesso('pacientes');
      const nome = String(i.nome || '').trim().replace(/\s+/g, ' ').split(' ').map((w) => (/^(da|de|do|das|dos|e)$/i.test(w) ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())).join(' ');
      if (nome.split(' ').length < 2) return { erro: 'Qual é o nome completo do paciente?' };
      const tel = BR.tel(i.whatsapp); if (!tel) return { erro: 'Qual é o WhatsApp com DDD?' };
      const dup = PAC.find((p) => BR.tel(p.tel) === tel); if (dup) return { erro: 'Já existe paciente com esse WhatsApp: ' + dup.nome + '.' };
      if (PAC.some((p) => rnNorm(p.nome) === rnNorm(nome))) return { erro: 'Já existe um paciente chamado ' + nome + '.' };
      const cpf = i.cpf ? onlyDigits(i.cpf) : ''; if (cpf && cpf.length !== 11) return { erro: 'O CPF precisa ter 11 números.' };
      const nasc = i.nascimento ? BR.dataTela(rnDataOk(i.nascimento) || BR.data(i.nascimento) || '') : '';
      const tipo = i.tipo || (i.convenio ? 'Convênio' : 'Particular');
      const conv = i.convenio ? ((CAT.v.convenios || []).find((c) => rnNorm(c.nome).includes(rnNorm(i.convenio))) || {}).nome || null : null;
      if (i.convenio && SB_ON && !conv) return { erro: 'Não achei o convênio ' + i.convenio + ' no cadastro da clínica.' };
      const d = { nome, tel: BR.telTela(tel), cpf: cpf ? cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4') : '', nasc, sexo: i.sexo || '', email: i.email || '', tipo, conv: conv || (i.convenio ? i.convenio : ''), empresa: i.empresa || '' };
      return rnCmd('cadastro_paciente', 'CADASTRO DE PACIENTE', [{ icon: 'user-plus', c: '#2DBF6A', t: 'Cadastrar · ' + nome, s: [d.tel, d.cpf && 'CPF ' + d.cpf, nasc && 'nasc. ' + nasc, d.conv].filter(Boolean).join(' · '), v: tipo }],
        'Cadastrar **' + nome + '** com o WhatsApp **' + d.tel + '**?', async () => {
          if (!SB_ON) { const np = { ...d, conv: d.conv || 'Sem convênio' }; PAC_STORE.v = [...PAC_STORE.v, np]; avisar(PAC_STORE); return { texto: 'Pronto! Cadastrei ' + nome + '.' }; }
          const np = await PacSvc.criar({ ...d, conv: conv || '' }, 'renata_ia');
          return { texto: 'Pronto! Cadastrei ' + nome + '. Quer que eu já agende ou envie a anamnese?', gerados: [{ tabela: 'pacientes', id: np.dbId }] };
        }, { nome, whatsapp: d.tel, cpf: d.cpf, nascimento: nasc, tipo });
    } },
  { name: 'propor_atualizacao_paciente', description: 'Prepara, SEM gravar, a atualização do cadastro de um paciente (WhatsApp, e-mail, CPF, nascimento, sexo, tipo, convênio, empresa ou nome).',
    inputSchema: { type: 'object', properties: { paciente: { type: 'string' }, nome: { type: 'string' }, whatsapp: { type: 'string' }, email: { type: 'string' }, cpf: { type: 'string' }, nascimento: { type: 'string', description: 'AAAA-MM-DD' }, sexo: { type: 'string', enum: ['Feminino', 'Masculino', 'Prefiro não informar'] }, tipo: { type: 'string', enum: ['Particular', 'Convênio', 'Empresarial'] }, convenio: { type: 'string' }, empresa: { type: 'string' } }, required: ['paciente'] },
    execute: (i) => {
      if (!rnPode('pacientes')) return rnSemAcesso('pacientes');
      const rp = rnAcharPaciente(i.paciente); if (rp.erro) return rp; const p = rp.p;
      const mud = {}, extra = {}, linhas = [];
      if (i.whatsapp) { const t = BR.tel(i.whatsapp); if (!t) return { erro: 'Esse WhatsApp não parece válido. Fale com DDD.' }; mud.tel = BR.telTela(t); linhas.push('WhatsApp ' + mud.tel); }
      if (i.nome) { mud.nome = String(i.nome).trim(); linhas.push('nome ' + mud.nome); }
      if (i.nascimento) { const n = rnDataOk(i.nascimento) || BR.data(i.nascimento); if (!n) return { erro: 'Qual a data de nascimento?' }; mud.nasc = BR.dataTela(n); linhas.push('nascimento ' + mud.nasc); }
      if (i.sexo) { mud.sexo = i.sexo; linhas.push('sexo ' + i.sexo.toLowerCase()); }
      if (i.tipo) { mud.tipo = i.tipo; linhas.push('tipo ' + i.tipo.toLowerCase()); }
      if (i.empresa) { mud.empresa = i.empresa; linhas.push('empresa ' + i.empresa); }
      if (i.convenio) { const c = (CAT.v.convenios || []).find((x) => rnNorm(x.nome).includes(rnNorm(i.convenio))); if (SB_ON && !c) return { erro: 'Não achei o convênio ' + i.convenio + '.' }; mud.conv = c ? c.nome : i.convenio; if (!i.tipo) mud.tipo = 'Convênio'; linhas.push('convênio ' + mud.conv); }
      if (i.email) { if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.email)) return { erro: 'Esse e-mail não parece válido.' }; extra.email = String(i.email).trim().toLowerCase(); linhas.push('e-mail ' + extra.email); }
      if (i.cpf) { const c = onlyDigits(i.cpf); if (c.length !== 11) return { erro: 'O CPF precisa ter 11 números.' }; extra.cpf = c.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4'); linhas.push('CPF ' + extra.cpf); }
      if (!linhas.length) return { erro: 'O que você quer atualizar no cadastro?' };
      return rnCmd('atualizacao_paciente', 'ATUALIZAR CADASTRO', [{ icon: 'user-pen', c: '#1F5EFF', t: 'Atualizar · ' + p.nome, s: linhas.join(' · '), v: '' }],
        'Atualizar o cadastro de **' + p.nome + '**: ' + linhas.join(', ') + '?', async () => {
          if (!SB_ON) { const np = { ...p, ...mud, ...extra }; PAC_STORE.v = PAC_STORE.v.map((x) => (x.nome === p.nome ? np : x)); avisar(PAC_STORE); return { texto: 'Pronto, atualizei o cadastro de ' + rnPrimeiro(p.nome) + '.' }; }
          let cur = p;
          if (mud.tel && mud.tel !== p.tel) cur = await PacSvc.trocarNumero(cur, mud.tel);
          const resto = { ...mud }; delete resto.tel; // sem desestruturação com resto: o ajudante do Babel é global e colide entre arquivos
          if (Object.keys(resto).length) cur = await PacSvc.salvar(cur, { ...cur, ...resto });
          if (Object.keys(extra).length) { await DB.upd('pacientes', p.dbId, extra, 'Não foi possível atualizar o cadastro'); cur = { ...cur, ...extra }; publicarPacientes(PAC.map((x) => (x.dbId === p.dbId ? cur : x))); }
          PacSvc.hist(p, { t: 'Cadastro atualizado pela Renata IA', s: linhas.join(', '), c: '#1F5EFF', tipo: 'dados', origem: 'renata_ia' });
          return { texto: 'Pronto, atualizei o cadastro de ' + rnPrimeiro(p.nome) + '.', gerados: [{ tabela: 'pacientes', id: p.dbId }] };
        }, { paciente: p.nome, mudancas: linhas });
    } },
  { name: 'abrir_paciente', description: 'Abre a ficha de um paciente em qualquer tela, na aba de dados, prontuário ou conversa.',
    inputSchema: { type: 'object', properties: { nome: { type: 'string' }, aba: { type: 'string', enum: ['dados', 'prontuario', 'conversa'] } }, required: ['nome'] },
    execute: (i) => { if (!rnPode('pacientes')) return rnSemAcesso('pacientes'); const rp = rnAcharPaciente(i.nome); if (rp.erro) return rp; rnAbrirFicha(rp.p, i.aba); return { aberta: true, paciente: rp.p.nome, aba: i.aba || 'dados' }; } },
  { name: 'propor_envio_anamnese', description: 'Prepara, SEM enviar, o envio do link de anamnese para o WhatsApp do paciente. Sem modelo, usa o padrão da clínica.',
    inputSchema: { type: 'object', properties: { paciente: { type: 'string' }, modelo: { type: 'string' } }, required: ['paciente'] },
    execute: (i) => {
      if (!rnPode('pacientes')) return rnSemAcesso('pacientes');
      const rp = rnAcharPaciente(i.paciente); if (rp.erro) return rp; const p = rp.p;
      const ms = ANAM_STORE.v || []; if (!ms.length) return { erro: 'A clínica ainda não tem modelos de anamnese. Crie em Configurações, Cadastro, Modelos de anamnese.' };
      const m = i.modelo ? ms.find((x) => rnNorm(x.nome).includes(rnNorm(i.modelo)) || rnNorm(i.modelo).includes(rnNorm(x.nome))) : ms.find((x) => x.padrao) || ms[0];
      if (!m) return { erro: 'Não achei esse modelo. Modelos: ' + ms.map((x) => x.nome).join(', ') };
      if (!p.tel) return { erro: p.nome + ' não tem WhatsApp no cadastro.' };
      return rnCmd('envio_anamnese', 'ENVIO DE ANAMNESE', [{ icon: 'clipboard-list', c: '#1F5EFF', t: 'Enviar · ' + m.nome, s: 'Para ' + p.nome + ' no WhatsApp ' + p.tel + ' · link vale 7 dias', v: '' }],
        'Enviar a **' + m.nome + '** para **' + p.nome + '** no WhatsApp?', async () => {
          if (!SB_ON) return { texto: 'Pronto! Enviei a ' + m.nome + ' para ' + rnPrimeiro(p.nome) + ' no WhatsApp.' };
          const r = await ProntSvc.enviarAnamnese(p, m.nome, 'link');
          await MsgSvc.enviarTextoPaciente(p, 'Olá, ' + rnPrimeiro(p.nome) + '! Para deixarmos tudo pronto para o seu atendimento, responda a ' + m.nome.toLowerCase() + ' neste link: https://' + r.link);
          ANAM_STORE.v = ms.map((x) => (x.id === m.id ? { ...x, usos: (x.usos || 0) + 1 } : x)); avisar(ANAM_STORE);
          PacSvc.hist(p, { t: 'Anamnese enviada pela Renata IA: ' + m.nome, c: KINDS.anamnese.c, tipo: 'anamnese', origem: 'renata_ia', tabela: 'anamnese_envios', registro: r.id });
          return { texto: 'Pronto! Enviei a ' + m.nome + ' para ' + rnPrimeiro(p.nome) + ' no WhatsApp.', gerados: [{ tabela: 'anamnese_envios', id: r.id }] };
        }, { paciente: p.nome, modelo: m.nome });
    } },
  { name: 'propor_mensagem_paciente', description: 'Prepara, SEM enviar, uma mensagem de WhatsApp para um paciente. Escreva o texto final, curto e cordial, em nome da clínica.',
    inputSchema: { type: 'object', properties: { paciente: { type: 'string' }, texto: { type: 'string' } }, required: ['paciente', 'texto'] },
    execute: (i) => {
      if (!rnPode('mensagens')) return rnSemAcesso('mensagens');
      const rp = rnAcharPaciente(i.paciente); if (rp.erro) return rp; const p = rp.p;
      const texto = String(i.texto || '').trim(); if (!texto) return { erro: 'O que você quer que eu escreva?' };
      if (!p.tel) return { erro: p.nome + ' não tem WhatsApp no cadastro.' };
      return rnCmd('mensagem_paciente', 'MENSAGEM NO WHATSAPP', [{ icon: 'message-circle', c: '#2DBF6A', t: 'Para ' + p.nome, s: texto, v: '' }],
        'Enviar para **' + p.nome + '**: "' + texto + '"?', async () => {
          if (!SB_ON) return { texto: 'Pronto! Mensagem enviada para ' + rnPrimeiro(p.nome) + '.' };
          await MsgSvc.enviarTextoPaciente(p, texto);
          PacSvc.hist(p, { t: 'Mensagem enviada pela Renata IA', s: texto.slice(0, 120), c: '#2DBF6A', tipo: 'mensagem', origem: 'renata_ia' });
          return { texto: 'Pronto! Mensagem enviada para ' + rnPrimeiro(p.nome) + '.' };
        }, { paciente: p.nome, texto });
    } },
  { name: 'propor_registro_procedimento', description: 'Prepara, SEM gravar, o registro de um procedimento no prontuário do paciente, com materiais usados (que dão baixa no estoque quando realizado) e observações ditadas.',
    inputSchema: { type: 'object', properties: { paciente: { type: 'string' }, procedimento: { type: 'string' }, profissional: { type: 'string' }, data: { type: 'string', description: 'AAAA-MM-DD' }, hora: { type: 'string' }, status: { type: 'string', enum: ['Realizado', 'Agendado', 'Cancelado'] }, materiais: { type: 'array', items: { type: 'object', properties: { produto: { type: 'string' }, quantidade: { type: 'number' } }, required: ['produto', 'quantidade'] } }, observacoes: { type: 'string' }, regiao: { type: 'string', description: 'Região tratada, ex.: testa e glabela' } }, required: ['paciente', 'procedimento'] },
    execute: (i) => {
      if (!rnPode('pacientes')) return rnSemAcesso('pacientes');
      const rp = rnAcharPaciente(i.paciente); if (rp.erro) return rp; const p = rp.p;
      const proc = rnProcNome(i.procedimento); if (!proc) return { erro: 'Não achei o procedimento ' + i.procedimento + '. Procedimentos: ' + FIN_PROCS.map((x) => x.n).join(', ') };
      let pro = i.profissional ? (PROF0.find((x) => { const n = rnNorm(x.nome); return rnNorm(i.profissional).split(/\s+/).filter((w) => w.length > 2 && !/^(dra|doutora|doutor)$/.test(w)).every((w) => n.includes(w)); }) || {}).nome : null;
      if (i.profissional && !pro) return { erro: 'Não achei o profissional ' + i.profissional + '.' };
      if (!pro) { const eu = SB_ON ? PROF0.find((x) => x.usuarioId && x.usuarioId === UID()) : null; const apto = PROF0.find((x) => (x.procs || []).includes(proc)); pro = (eu || apto || PROF0[0] || {}).nome || ''; }
      const iso = rnDataOk(i.data) || TODAY_ISO, hh = rnHora(i.hora) || nowHM(), status = i.status || 'Realizado';
      let mats = [];
      if (i.materiais && i.materiais.length) { for (const m of i.materiais) { const pd = rnProdOf(m.produto); if (!pd) return { erro: 'Não achei ' + m.produto + ' no estoque.' }; const q = Math.round(Number(m.quantidade) * 100) / 100; if (!(q > 0)) return { erro: 'Qual a quantidade de ' + pd.nome + '?' }; mats.push({ nome: pd.nome, q }); } }
      else mats = (MAT_SUG[proc] || []).map(([nome, q]) => ({ nome, q }));
      const obs = String(i.observacoes || '').trim(), regiao = String(i.regiao || '').trim();
      return rnCmd('registro_procedimento', 'PROCEDIMENTO NO PRONTUÁRIO', [{ icon: 'syringe', c: '#22C3F2', t: proc + ' · ' + p.nome, s: dBR(iso).slice(0, 5) + ' às ' + hh + ' · ' + pro + (regiao ? ' · ' + regiao : '') + (obs ? ' · ' + obs.slice(0, 80) : ''), v: status }].concat(mats.map((m) => ({ icon: 'package-minus', c: '#E5484D', t: m.nome, s: status === 'Realizado' ? 'Baixa automática no estoque' : 'Sem baixa enquanto não for realizado', v: qFmt(m.q) + ' ' + unPl(unOf(m.nome), m.q < 2 ? 1 : m.q) }))),
        'Registrar **' + proc + '** no prontuário de **' + p.nome + '**' + (mats.length ? ' com ' + mats.map((m) => qFmt(m.q) + ' ' + unPl(unOf(m.nome), m.q < 2 ? 1 : m.q) + ' de ' + m.nome).join(' e ') : '') + '?', async () => {
          if (!SB_ON) return rnErroDemo('registraria o procedimento no prontuário e daria baixa no estoque');
          const id = (await ProntSvc.salvarProc(p, { title: proc, pro, dt: iso + 'T' + hh, dur: PROC_DUR[proc] || 30, status, mats, obs, regiao })).id;
          if (CARGA.v.estoque === 'ok') carregar('estoque', true);
          PacSvc.hist(p, { t: 'Procedimento: ' + proc + ' (registrado pela Renata IA)', s: pro, c: KINDS.proc.c, tipo: 'procedimento', origem: 'renata_ia', tabela: 'procedimentos_realizados', registro: id });
          return { texto: 'Pronto! Registrei ' + proc + ' no prontuário de ' + rnPrimeiro(p.nome) + (mats.length && status === 'Realizado' ? ' e dei baixa dos materiais no estoque.' : '.'), gerados: [{ tabela: 'procedimentos_realizados', id }] };
        }, { paciente: p.nome, procedimento: proc, profissional: pro, data: iso, hora: hh, status, materiais: mats, observacoes: obs, regiao: regiao || undefined });
    } },
  { name: 'propor_baixa_lancamento', description: 'Prepara, SEM gravar, a baixa de uma conta pendente: receita de paciente recebida ou despesa paga. Use quando disserem que alguém pagou o que devia ou que uma conta foi paga.',
    inputSchema: { type: 'object', properties: { tipo: { type: 'string', enum: ['receita', 'despesa'] }, paciente: { type: 'string', description: 'Para receita' }, descricao: { type: 'string', description: 'Para despesa: o que foi pago ou o fornecedor' }, valor: { type: 'number' }, forma: { type: 'string', description: 'Pix, Cartão de crédito, Cartão de débito, Dinheiro, Boleto ou Convênio' } }, required: ['tipo'] },
    execute: (i) => {
      if (!rnPode('gestao.financeiro')) return rnSemAcesso('gestao.financeiro');
      const rec = i.tipo !== 'despesa';
      const alvo = rnNorm(rec ? i.paciente : i.descricao); if (!alvo) return { erro: rec ? 'De qual paciente é o pagamento?' : 'Qual conta foi paga?' };
      const ws = alvo.split(/\s+/).filter((w) => w.length > 2);
      let c = (rec ? REC_STORE.v : DESP_STORE.v).filter((r) => r.status === 'Pendente' && ws.length && ws.every((w) => rnNorm(rec ? r.pac : r.desc + ' ' + r.forn + ' ' + r.cat).includes(w)));
      if (i.valor) { const v = Number(i.valor); const exato = c.filter((r) => Math.abs((rec ? liq(r) : r.total) - v) < 0.01); if (exato.length) c = exato; }
      c = c.sort((a, b) => a.venc.localeCompare(b.venc));
      if (!c.length) return { erro: 'Não encontrei conta pendente ' + (rec ? 'de ' + i.paciente : 'de ' + i.descricao) + (i.valor ? ' de ' + brl(i.valor) : '') + '.' };
      if (c.length > 1 && !i.valor) return { erro: 'Há ' + c.length + ' pendências: ' + c.slice(0, 4).map((r) => brl(rec ? liq(r) : r.total) + ' com vencimento em ' + dBR(r.venc)).join('; ') + '. Qual delas?' };
      const r = c[0], valor = rec ? liq(r) : r.total, forma = i.forma ? rnFormaOf(i.forma) : null;
      return rnCmd('baixa_financeira', rec ? 'RECEBIMENTO' : 'PAGAMENTO', [{ icon: rec ? 'arrow-down-left' : 'arrow-up-right', c: rec ? '#1E9E57' : '#E5484D', t: (rec ? 'Recebido · ' + r.pac : 'Pago · ' + r.desc), s: 'Vencimento ' + dBR(r.venc) + (r.proc ? ' · ' + r.proc : r.cat ? ' · ' + r.cat : '') + ' · ' + (forma || r.forma || 'forma não informada'), v: brl(valor) }],
        'Dar baixa de **' + brl(valor) + '** ' + (rec ? 'recebido de **' + r.pac + '**' : 'pago em **' + r.desc + '**') + ' hoje?', async () => {
          const st = rec ? 'Recebido' : 'Pago';
          if (SB_ON) {
            await FinSvc.status(rec ? 'rec' : 'desp', r, st);
            if (forma) await DB.upd(rec ? 'contas_receber' : 'contas_pagar', r.dbId, { forma_pagamento_id: catId('formas', forma) }, 'Não foi possível salvar a forma de pagamento');
          }
          const S = rec ? REC_STORE : DESP_STORE; S.v = S.v.map((x) => (x.id === r.id ? { ...x, status: st, forma: forma || x.forma } : x)); avisar(S);
          return { texto: 'Pronto! Dei baixa de ' + brl(valor) + (rec ? ' recebido de ' + rnPrimeiro(r.pac) : ' pago em ' + r.desc) + '.', gerados: SB_ON ? [{ tabela: rec ? 'contas_receber' : 'contas_pagar', id: r.dbId }] : [] };
        }, { tipo: rec ? 'receita' : 'despesa', referencia: rec ? r.pac : r.desc, valor, forma });
    } },
  { name: 'contas_a_vencer', description: 'Lista as contas a receber e a pagar que vencem nos próximos dias e as que estão em atraso.',
    inputSchema: { type: 'object', properties: { dias: { type: 'number', description: 'Quantos dias para frente (padrão 7)' } } },
    execute: (i) => {
      if (!rnPode('gestao.financeiro')) return rnSemAcesso('gestao.financeiro');
      const ate = rnIso(addD(TODAY, Math.max(1, Math.min(90, Number(i.dias) || 7))));
      const rec = REC_STORE.v.filter((r) => r.status === 'Pendente'), des = DESP_STORE.v.filter((d) => d.status === 'Pendente');
      const fr = (r) => ({ paciente: r.pac, valor: liq(r), vencimento: dBR(r.venc), procedimento: r.proc || undefined }), fd = (d) => ({ descricao: d.desc, valor: d.total, vencimento: dBR(d.venc), fornecedor: d.forn });
      const vr = rec.filter((r) => r.venc >= TODAY_ISO && r.venc <= ate).sort((a, b) => a.venc.localeCompare(b.venc)), vd = des.filter((d) => d.venc >= TODAY_ISO && d.venc <= ate).sort((a, b) => a.venc.localeCompare(b.venc));
      const ar = rec.filter((r) => r.venc < TODAY_ISO), ad = des.filter((d) => d.venc < TODAY_ISO);
      return { ate: dBR(ate), aReceber: { total: Math.round(rnSum(vr, liq)), itens: vr.slice(0, 15).map(fr) }, aPagar: { total: Math.round(rnSum(vd, (d) => d.total)), itens: vd.slice(0, 15).map(fd) }, emAtraso: { receber: Math.round(rnSum(ar, liq)), lancamentosReceber: ar.length, pagar: Math.round(rnSum(ad, (d) => d.total)), lancamentosPagar: ad.length } };
    } },
  { name: 'saldo_estoque', description: 'Diz o saldo de um produto do estoque (quantidade, mínimo e validade) ou, sem produto, o que está abaixo do mínimo e vencendo.',
    inputSchema: { type: 'object', properties: { produto: { type: 'string' } } },
    execute: (i) => {
      if (!rnPode('gestao.estoque')) return rnSemAcesso('gestao.estoque');
      if (i.produto) { const p = rnProdOf(i.produto); if (!p) return { erro: 'Não achei ' + i.produto + ' no estoque.' }; return { produto: p.nome, quantidade: p.qtd, unidade: p.un, minimo: p.min, validade: p.val ? dBR(p.val) : 'não informada', status: STATUS_EST[estStatus(p)][0] }; }
      const e = rnEstoque(); return { abaixoDoMinimo: e.abaixoDoMinimo, vencendoEm60dias: e.venceEmBreve60dias, vencidos: e.vencidos };
    } },
  { name: 'propor_etapa_lead', description: 'Prepara, SEM gravar, a mudança de etapa de um lead no CRM (Novo, Aguardando atendente, Agendado, Confirmado, Em atendimento, Finalizado ou Perdido).',
    inputSchema: { type: 'object', properties: { lead: { type: 'string', description: 'Nome ou telefone do lead' }, etapa: { type: 'string' }, motivo_perda: { type: 'string' } }, required: ['lead', 'etapa'] },
    execute: async (i) => {
      if (!rnPode('mensagens')) return rnSemAcesso('mensagens');
      if (SB_ON) await carregar('crm');
      const l = rnAcharLead(i.lead); if (l.erro) return l;
      const t = rnNorm(i.etapa); const et = CRM_STAGES.find((s) => s.id === i.etapa || rnNorm(s.label) === t) || CRM_STAGES.find((s) => rnNorm(s.label).includes(t) || t.includes(rnNorm(s.label)));
      if (!et) return { erro: 'Etapas do CRM: ' + CRM_STAGES.map((s) => s.label).join(', ') + '.' };
      const motivo = et.id === 'perdido' ? (CRM_MOTIVOS.find((m) => rnNorm(m).includes(rnNorm(i.motivo_perda || '#'))) || (i.motivo_perda ? 'Outro' : null)) : null;
      if (et.id === 'perdido' && !motivo) return { erro: 'Qual o motivo da perda? ' + CRM_MOTIVOS.join(', ') + '.' };
      const de = (CRM_STAGES.find((s) => s.id === l.lead.stage) || { label: l.lead.stage }).label;
      return rnCmd('etapa_lead', 'CRM', [{ icon: 'kanban', c: et.c || '#7B4BC4', t: 'Mover · ' + crmName(l.lead), s: de + ' para ' + et.label + (motivo ? ' · ' + motivo : ''), v: '' }],
        'Mover **' + crmName(l.lead) + '** de ' + de + ' para **' + et.label + '**?', async () => {
          if (SB_ON) await CrmSvc.mover(l.lead, et.id, motivo);
          LEADS_STORE.v = LEADS_STORE.v.map((x) => (x.id === l.lead.id ? { ...x, stage: et.id, motivo: motivo || undefined } : x)); avisar(LEADS_STORE);
          return { texto: 'Pronto, ' + crmName(l.lead) + ' está em ' + et.label + '.', gerados: SB_ON ? [{ tabela: 'leads', id: l.lead.dbId }] : [] };
        }, { lead: crmName(l.lead), de, para: et.label, motivo });
    } },
  { name: 'propor_ia_lead', description: 'Prepara, SEM gravar, ligar ou pausar a Renata no atendimento de um lead do WhatsApp (quando pausada, a equipe assume a conversa).',
    inputSchema: { type: 'object', properties: { lead: { type: 'string' }, ligar: { type: 'boolean' } }, required: ['lead', 'ligar'] },
    execute: async (i) => {
      if (!rnPode('mensagens')) return rnSemAcesso('mensagens');
      if (SB_ON) await carregar('crm');
      const l = rnAcharLead(i.lead); if (l.erro) return l;
      const ligar = !!i.ligar;
      if (!!l.lead.ia === ligar) return { erro: 'A IA já está ' + (ligar ? 'ligada' : 'pausada') + ' para ' + crmName(l.lead) + '.' };
      return rnCmd('ia_lead', ligar ? 'RETOMAR IA' : 'PAUSAR IA', [{ icon: ligar ? 'bot' : 'user-round-check', c: ligar ? '#7B4BC4' : '#F2694A', t: (ligar ? 'Retomar a IA · ' : 'Pausar a IA · ') + crmName(l.lead), s: ligar ? 'A Renata volta a responder' : 'A equipe assume a conversa', v: '' }],
        (ligar ? 'Retomar a Renata no atendimento de **' : 'Pausar a Renata e passar para a equipe o atendimento de **') + crmName(l.lead) + '**?', async () => {
          if (SB_ON) await CrmSvc.ia(l.lead, ligar);
          LEADS_STORE.v = LEADS_STORE.v.map((x) => (x.id === l.lead.id ? { ...x, ia: ligar } : x)); avisar(LEADS_STORE);
          return { texto: ligar ? 'Pronto, a Renata voltou a responder ' + crmName(l.lead) + '.' : 'Pronto, pausei a IA. A equipe assume a conversa com ' + crmName(l.lead) + '.', gerados: SB_ON ? [{ tabela: 'leads', id: l.lead.dbId }] : [] };
        }, { lead: crmName(l.lead), ligar });
    } },
  { name: 'ajustar_ponto_mapa', description: 'Ajusta um ponto do mapeamento que está aberto na tela, pelo número do ponto: quantidade, unidade, produto ou comentário, ou exclui o ponto. A mudança aparece na hora e é salva sozinha.',
    inputSchema: { type: 'object', properties: { numero: { type: 'number' }, quantidade: { type: 'number' }, unidade: { type: 'string', enum: ['U', 'ml', 'seringa', 'mg', 'un', 'cm', 'sessão', 'aplicação'] }, produto: { type: 'string' }, comentario: { type: 'string' }, excluir: { type: 'boolean' } }, required: ['numero'] },
    execute: (i) => (window.RN_MAPA ? window.RN_MAPA.ajustar(Number(i.numero), i) : { erro: 'Nenhum mapeamento aberto. Abra o mapeamento no prontuário do paciente e peça de novo.' }) },
);
function rnAcharLead(q) {
  const t = rnNorm(q).replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim(), dig = onlyDigits(q);
  const c = LEADS_STORE.v.filter((l) => (dig.length >= 8 && onlyDigits(l.tel).endsWith(dig.slice(-8))) || (t && l.nome && t.split(' ').filter((w) => w.length > 2).every((w) => rnNorm(l.nome).includes(w))));
  if (c.length === 1) return { lead: c[0] };
  if (c.length > 1) return { erro: 'Encontrei mais de um lead: ' + c.slice(0, 5).map(crmName).join(', ') + '. Qual deles?' };
  return { erro: 'Não encontrei esse lead no CRM.' };
}
Object.assign(RN_TOOL_LABEL, { horarios_livres: 'Vendo os horários livres', propor_agendamento: 'Preparando o agendamento', propor_alteracao_agendamento: 'Preparando a alteração', propor_cadastro_paciente: 'Preparando o cadastro', propor_atualizacao_paciente: 'Preparando a atualização', abrir_paciente: 'Abrindo a ficha', propor_envio_anamnese: 'Preparando o envio', propor_mensagem_paciente: 'Preparando a mensagem', propor_registro_procedimento: 'Preparando o registro', propor_baixa_lancamento: 'Preparando a baixa', contas_a_vencer: 'Vendo as contas', saldo_estoque: 'Consultando o estoque', propor_etapa_lead: 'Preparando a mudança no CRM', propor_ia_lead: 'Preparando a mudança na IA', ajustar_ponto_mapa: 'Ajustando o mapa' });

/* =====================================================================
   OUVIR: reconhecimento do navegador ou transcrição pela ElevenLabs
   ===================================================================== */
function rnOuvirWeb({ continuo, aoParcial, aoFim, aoErro }) {
  let r; try { r = new RN_SR(); } catch (e) { aoErro('nostt'); return null; }
  r.lang = 'pt-BR'; r.interimResults = true; r.continuous = !!continuo;
  let fin = '', inter = '', acabou = false, cancelado = false, timer = null;
  r.onresult = (e) => {
    fin = ''; inter = '';
    for (let k = 0; k < e.results.length; k++) { if (e.results[k].isFinal) fin += e.results[k][0].transcript; else inter += e.results[k][0].transcript; }
    aoParcial((fin + ' ' + inter).replace(/\s+/g, ' ').trim());
    if (continuo) { clearTimeout(timer); timer = setTimeout(() => { try { r.stop(); } catch (x) {} }, 2600); }
  };
  r.onerror = (e) => { if (e.error === 'no-speech' || e.error === 'aborted') return; acabou = true; clearTimeout(timer); aoErro(e.error === 'not-allowed' ? 'denied' : e.error === 'service-not-allowed' ? 'dictation' : e.error === 'audio-capture' ? 'nomic' : e.error === 'network' ? 'network' : 'nostt'); };
  r.onend = () => { clearTimeout(timer); if (acabou || cancelado) return; acabou = true; aoFim((fin + ' ' + inter).replace(/\s+/g, ' ').trim()); };
  try { r.start(); } catch (e) { aoErro('busy'); return null; }
  return { parar: () => { try { r.stop(); } catch (x) {} }, cancelar: () => { cancelado = true; clearTimeout(timer); try { r.abort(); } catch (x) {} } };
}
async function rnOuvirEleven({ aoParcial, aoFim, aoErro, longo }) {
  const c = await rnMicCheck(true); if (!c.ok) { aoErro(c.why); return null; }
  const s = c.stream, chunks = []; let rec, cancelado = false, ctx = null, an = null;
  try { rec = new MediaRecorder(s); } catch (e) { s.getTracks().forEach((x) => x.stop()); aoErro('nostt'); return null; }
  try { const AC = window.AudioContext || window.webkitAudioContext; ctx = new AC(); an = ctx.createAnalyser(); an.fftSize = 1024; ctx.createMediaStreamSource(s).connect(an); } catch (e) {}
  rec.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
  const buf = new Float32Array(1024); let falou = false, ult = Date.now(), piso = 0.008; const t0 = Date.now();
  const tick = () => {
    if (rec.state !== 'recording') return;
    let rms = 0; if (an) { an.getFloatTimeDomainData(buf); let sm = 0; for (let k = 0; k < buf.length; k++) sm += buf[k] * buf[k]; rms = Math.sqrt(sm / buf.length); }
    if (!falou) piso = piso * 0.9 + rms * 0.1;
    if (rms > Math.max(0.02, piso * 2.5)) { falou = true; ult = Date.now(); }
    const agora = Date.now();
    if ((falou && agora - ult > (longo ? 2600 : 1100)) || agora - t0 > (longo ? 90000 : 25000) || (!falou && agora - t0 > 12000)) { try { rec.stop(); } catch (e) {} return; }
    setTimeout(tick, 60);
  };
  rec.onstop = async () => {
    s.getTracks().forEach((x) => x.stop()); try { ctx && ctx.close(); } catch (e) {}
    if (cancelado) return;
    if (!falou && !chunks.length) { aoFim(''); return; }
    aoParcial('Entendendo o que você disse...');
    try {
      const type = rec.mimeType || 'audio/webm', fd = new FormData();
      fd.append('model_id', 'scribe_v1'); fd.append('file', new Blob(chunks, { type }), 'fala.' + (/mp4|aac/.test(type) ? 'm4a' : 'webm'));
      if (SB_ON) { fd.append('acao', 'transcrever'); fd.append('clinica_id', CLI()); fd.append('segundos', String(Math.round((Date.now() - t0) / 1000))); }
      const r = SB_ON ? await rnFn(fd) : await fetch('https://api.elevenlabs.io/v1/speech-to-text', { method: 'POST', headers: { 'xi-api-key': RN_VOICE.v.key }, body: fd });
      const j = await r.json().catch(() => ({})); if (!r.ok) throw j;
      aoFim(String(j.text || '').trim());
    } catch (e) { aoErro('eleven'); }
  };
  rec.start(); setTimeout(tick, 60);
  return { parar: () => { try { rec.stop(); } catch (e) {} }, cancelar: () => { cancelado = true; try { rec.stop(); } catch (e) {} } };
}
const rnMotorVoz = () => (RN_SR ? 'web' : RN_VOICE.v.key && window.MediaRecorder ? 'eleven' : null);

/* =====================================================================
   PAINEL DO COMANDO DE VOZ
   ===================================================================== */
const VOZ = makeStore({ aberto: false, estado: 'parado', ouvido: '', resposta: '', rotulo: null, pend: null, pendEstado: null, erro: null, ditando: false, modo: 'comando' });
const vozSet = (p) => { VOZ.v = { ...VOZ.v, ...p }; VOZ.subs.forEach((f) => f()); };
let __vozEsc = null, __vozCtl = null, __vozFecha = null, __vozFalaDemo = true, __vozDita = null;
const vozFalaLigada = () => { if (!SB_ON) return __vozFalaDemo; const f = PREF.v && PREF.v.filtros; return !(f && f['voz.falar'] === false); };
function vozFalaSet(on) { if (SB_ON && PREF.v) salvarPref({ filtros: { ...((PREF.v && PREF.v.filtros) || {}), 'voz.falar': on } }); else __vozFalaDemo = on; if (!on) rnStopSpeak(); vozSet({}); }
function vozPararTudo() { if (__vozEsc) { __vozEsc.cancelar(); __vozEsc = null; } if (__vozCtl) { try { __vozCtl.abort(); } catch (e) {} __vozCtl = null; } clearTimeout(__vozFecha); rnStopSpeak(); }
function vozFechar() { vozPararTudo(); vozSet({ aberto: false, estado: 'parado', ouvido: '', resposta: '', rotulo: null, erro: null, pend: null, pendEstado: null }); }
function vozAutoFechar() { clearTimeout(__vozFecha); __vozFecha = setTimeout(() => { if (VOZ.v.aberto && VOZ.v.estado === 'pronto' && !VOZ.v.pend) vozFechar(); }, 14000); }
const vozSegurar = () => clearTimeout(__vozFecha);
async function vozOuvir(modo) {
  vozPararTudo();
  const eng = rnMotorVoz();
  const base = modo === 'confirmar' ? { estado: 'ouvindo', ouvido: '', erro: null, modo } : { estado: 'ouvindo', ouvido: '', resposta: '', rotulo: null, erro: null, pend: null, pendEstado: null, modo };
  vozSet({ aberto: true, ...base });
  if (!eng) { vozSet({ estado: 'erro', erro: 'nostt' }); return; }
  if (eng === 'web') { const c = await rnMicCheck(false); if (!VOZ.v.aberto) return; if (!c.ok) { vozSet(modo === 'confirmar' ? { estado: 'pronto' } : { estado: 'erro', erro: c.why }); return; } }
  const h = {
    aoParcial: (t) => vozSet({ ouvido: t }),
    aoFim: (t) => { __vozEsc = null; if (!VOZ.v.aberto) return; if (!t) { vozSet({ estado: VOZ.v.pend || VOZ.v.resposta ? 'pronto' : 'vazio', ouvido: '' }); return; } vozProcessar(t); },
    aoErro: (w) => { __vozEsc = null; if ((w === 'denied' || w === 'dictation') && eng === 'web' && RN_VOICE.v.key && window.MediaRecorder) { rnOuvirEleven(h).then((x) => { __vozEsc = x; }); return; } vozSet(modo === 'confirmar' ? { estado: 'pronto' } : { estado: 'erro', erro: w }); },
  };
  __vozEsc = eng === 'web' ? rnOuvirWeb({ ...h, continuo: false }) : await rnOuvirEleven(h);
}
function vozTerminarFala() { if (__vozEsc) __vozEsc.parar(); }
async function vozProcessar(q) {
  vozSet({ estado: 'pensando', ouvido: q, resposta: '', rotulo: null });
  const local = rnComandoLocal(q);
  let r;
  if (local) r = { text: local, mode: 'acao' };
  else {
    const hist = [...RN_STORE.v.msgs.filter((m) => !m.error && !m.pending && m.content).slice(-12), { role: 'user', content: q }];
    const ctl = new AbortController(); __vozCtl = ctl;
    try { r = await rnAnswer(hist, { voice: true, signal: ctl.signal, onText: (t) => vozSet({ resposta: t, rotulo: null }), onTool: (l) => vozSet({ rotulo: l }) }); }
    catch (e) { r = { text: (e && e.text) || '', mode: 'interrompida' }; }
    __vozCtl = null;
  }
  if (!VOZ.v.aberto) return;
  const id = Date.now();
  RN_STORE.v = { ...RN_STORE.v, msgs: [...RN_STORE.v.msgs.map((m) => (r.resolved && m.pend && m.pend.id === r.resolved.id ? { ...m, pendState: r.resolved.state } : m)), { role: 'user', content: q, id: id - 1 }, { role: 'assistant', content: r.text, id, mode: r.mode, pend: r.pending || undefined }] };
  avisar(RN_STORE);
  if (SB_ON && !local && r.mode !== 'interrompida') rnRegistrar(q, r, true, id);
  const pend = r.pending && RN_PENDING.v === r.pending ? r.pending : null;
  vozSet({ estado: 'falando', resposta: r.text, rotulo: null, ...(pend ? { pend, pendEstado: 'open' } : r.resolved ? { pendEstado: r.resolved.state } : {}) });
  const depois = () => { if (!VOZ.v.aberto || VOZ.v.estado !== 'falando') return; if (pend && RN_PENDING.v === pend) vozOuvir('confirmar'); else { vozSet({ estado: 'pronto' }); vozAutoFechar(); } };
  if (vozFalaLigada() && r.text) rnSpeak(rnVoice(r.text).now, depois); else depois();
}
function vozConfirmar(sim) { vozSegurar(); vozPararTudo(); vozProcessar(sim ? 'Sim, pode fazer' : 'Não, cancela'); }
function vozAlternar() {
  if (__vozDita) { __vozDita.parar(); return; }
  if (VOZ.v.aberto && VOZ.v.estado === 'ouvindo') { vozTerminarFala(); return; }
  rnUnlockAudio(); vozOuvir('comando');
}

/* ---------- ditado no campo de texto selecionado ---------- */
function rnValorCampo(el, v) {
  const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  const d = Object.getOwnPropertyDescriptor(proto, 'value'); if (d && d.set) d.set.call(el, v); else el.value = v;
  el.dispatchEvent(new Event('input', { bubbles: true }));
}
const rnCampoEditavel = (el) => !!el && !el.readOnly && !el.disabled && (el.tagName === 'TEXTAREA' || (el.tagName === 'INPUT' && /^(text|search|email|tel|url|)$/i.test(el.getAttribute('type') || 'text')));
function vozDitar(el) {
  const eng = rnMotorVoz(); if (!eng) { vozSet({ aberto: true, estado: 'erro', erro: 'nostt' }); return; }
  const ini = el.selectionStart != null ? el.selectionStart : el.value.length, fim = el.selectionEnd != null ? el.selectionEnd : ini;
  const antes = el.value.slice(0, ini), depois = el.value.slice(fim), sep = antes && !/\s$/.test(antes) ? ' ' : '';
  const escreve = (t) => { if (!t || /^Entendendo/.test(t)) return; const tt = antes.trim() && !/[.!?]\s*$/.test(antes) ? t : t.charAt(0).toUpperCase() + t.slice(1); rnValorCampo(el, antes + sep + tt + depois); };
  const fimDita = () => { __vozDita = null; vozSet({ ditando: false }); try { el.focus(); } catch (e) {} };
  vozSet({ ditando: true });
  const h = { aoParcial: escreve, aoFim: (t) => { escreve(t); fimDita(); }, aoErro: (w) => { fimDita(); vozSet({ aberto: true, estado: 'erro', erro: w }); } };
  if (eng === 'web') __vozDita = rnOuvirWeb({ ...h, continuo: true });
  else rnOuvirEleven({ ...h, longo: true }).then((x) => { __vozDita = x; });
}

/* ---------- botão no topo e painel ---------- */
function VozBotao({ mobile }) {
  const [v] = useStore(VOZ);
  const ativo = (v.aberto && v.estado === 'ouvindo') || v.ditando;
  return <VIconBtn icon={ativo ? 'audio-lines' : 'mic'} label="Comando de voz (Ctrl + M)" variant={mobile ? 'glass' : 'ghost'} size="md" active={ativo} onClick={vozAlternar} style={ativo ? undefined : { color: 'var(--text-strong)' }} />;
}
const VOZ_LBL = { ouvindo: 'Pode falar, estou ouvindo', pensando: 'Pensando...', falando: 'Renata', pronto: 'Renata', vazio: 'Não ouvi nada', erro: 'Não deu para ouvir', parado: '' };
const VOZ_DICAS = ['Agenda a Mariana Alves amanhã às 10 com a Dra. Camila', 'Abre o prontuário da Juliana Ferreira', 'Quais horários livres na sexta?', 'A Beatriz pagou o que devia no Pix', 'Envia a anamnese para o Carlos Eduardo', 'Abre as despesas'];
function VozRoot({ mobile }) {
  const [v] = useStore(VOZ); useStore(PREF); useStore(RN_PENDING);
  React.useEffect(() => {
    const k = (e) => {
      if (e.ctrlKey && !e.altKey && !e.metaKey && !e.shiftKey && (e.key === 'm' || e.key === 'M' || e.code === 'KeyM')) {
        e.preventDefault(); e.stopPropagation();
        if (__vozDita) { __vozDita.parar(); return; }
        const el = document.activeElement;
        if (rnCampoEditavel(el) && !(VOZ.v.aberto && VOZ.v.estado === 'ouvindo')) { vozDitar(el); return; }
        vozAlternar(); return;
      }
      if (e.key === 'Escape' && VOZ.v.aberto) { e.preventDefault(); e.stopPropagation(); vozFechar(); }
    };
    window.addEventListener('keydown', k, true); return () => window.removeEventListener('keydown', k, true);
  }, []);
  const falar = vozFalaLigada();
  const dita = v.ditando ? (
    <div style={{ position: 'fixed', left: '50%', bottom: 'calc(22px + env(safe-area-inset-bottom))', transform: 'translateX(-50%)', zIndex: 400, display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px 10px 12px', borderRadius: 999, background: 'var(--surface-inverse, #0E2350)', color: '#fff', fontSize: 14, fontWeight: 500, boxShadow: '0 16px 30px -14px rgba(0,0,0,.5)', fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap' }}>
      <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#E5484D', animation: 'rnBreath 1.4s ease-in-out infinite' }} />Ditando no campo
      <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => __vozDita && __vozDita.parar()} style={{ height: 28, padding: '0 12px', borderRadius: 999, border: 0, background: 'rgba(255,255,255,.16)', color: '#fff', fontFamily: 'inherit', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Parar</button>
    </div>) : null;
  if (!v.aberto) return dita;
  const orbSt = v.estado === 'ouvindo' ? 'listening' : v.estado === 'pensando' ? 'thinking' : v.estado === 'falando' ? 'speaking' : 'idle';
  const mostra = v.estado === 'ouvindo' || v.estado === 'pensando' ? v.ouvido : '';
  const sem = !v.resposta && !mostra && v.estado === 'ouvindo';
  const btn = (icon, label, onClick, on) => <button type="button" aria-label={label} title={label} onClick={onClick} style={{ width: 34, height: 34, borderRadius: '50%', border: 0, cursor: 'pointer', background: 'transparent', color: on ? '#1F5EFF' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><RIcon name={icon} size={17} /></button>;
  return <>
    {dita}
    <div data-overlay="1" role="dialog" aria-label="Comando de voz" onMouseEnter={vozSegurar} style={{ position: 'fixed', left: '50%', bottom: mobile ? 'calc(12px + env(safe-area-inset-bottom))' : 24, transform: 'translateX(-50%)', zIndex: 400, width: mobile ? 'calc(100vw - 24px)' : 'min(560px, calc(100vw - 32px))', maxHeight: 'calc(100vh - 96px)', overflowY: 'auto', boxSizing: 'border-box', padding: mobile ? 14 : 18, borderRadius: 26, background: 'rgba(255,255,255,.95)', border: '1.5px solid rgba(255,255,255,.98)', boxShadow: '0 30px 60px -28px rgba(23,73,170,.6)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column', gap: 12, fontFamily: 'var(--font-sans)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button type="button" aria-label={v.estado === 'ouvindo' ? 'Terminar de falar' : 'Falar de novo'} onClick={() => (v.estado === 'ouvindo' ? vozTerminarFala() : v.estado === 'falando' ? (rnStopSpeak(), vozSet({ estado: 'pronto' })) : vozOuvir('comando'))} style={{ border: 0, padding: 0, background: 'transparent', borderRadius: '50%', cursor: 'pointer', flexShrink: 0 }}><RenataOrb size={44} state={orbSt} /></button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: 'var(--text-strong)' }}>{v.rotulo || VOZ_LBL[v.estado] || 'Renata'}</p>
          <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{v.estado === 'ouvindo' ? (v.modo === 'confirmar' ? 'Diga sim para confirmar ou não para cancelar' : 'Fale o que precisa. Eu entendo e faço por você.') : 'Comando de voz · Ctrl + M'}</p>
        </div>
        {btn(falar ? 'volume-2' : 'volume-x', falar ? 'Não responder em voz alta' : 'Responder em voz alta', () => vozFalaSet(!falar), falar)}
        {btn('message-square-text', 'Abrir no chat da Renata', () => { vozFechar(); RN_STORE.v = { ...RN_STORE.v, open: true }; avisar(RN_STORE); })}
        {btn('x', 'Fechar', vozFechar)}
      </div>
      {mostra ? <p style={{ margin: 0, fontSize: mobile ? 17 : 18, fontWeight: 500, color: 'var(--text-strong)', lineHeight: 1.4 }}>{mostra}</p> : null}
      {sem ? <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{VOZ_DICAS.slice(0, mobile ? 3 : 4).map((d) => <span key={d} style={{ fontSize: 12.5, color: 'var(--text-body)', padding: '6px 10px', borderRadius: 999, background: 'rgba(31,94,255,.06)' }}>"{d}"</span>)}</div> : null}
      {v.estado !== 'ouvindo' && v.estado !== 'pensando' && v.ouvido ? <p style={{ margin: 0, fontSize: 13, color: 'var(--text-muted)' }}>Você: {v.ouvido}</p> : null}
      {v.resposta ? <div className="rn-md" style={{ fontSize: 15, lineHeight: 1.55, color: 'var(--text-body)' }} dangerouslySetInnerHTML={{ __html: rnMd(v.resposta) }} /> : null}
      {v.pend ? <RnActionCard a={v.pend} state={v.pendEstado || (RN_PENDING.v && RN_PENDING.v.id === v.pend.id ? 'open' : 'old')} disabled={v.estado === 'pensando'} onYes={() => vozConfirmar(true)} onNo={() => vozConfirmar(false)} /> : null}
      {v.estado === 'vazio' ? <p style={{ margin: 0, fontSize: 14, color: 'var(--text-body)' }}>Não ouvi nada. Toque na Renata e fale de novo.</p> : null}
      {v.erro ? <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '12px 14px', borderRadius: 16, background: 'rgba(31,94,255,.05)' }}>
        <p style={{ margin: 0, fontSize: 14, color: 'var(--text-body)', lineHeight: 1.5 }}>{RN_MIC_MSG[v.erro] || 'Não consegui ouvir agora.'}</p>
        {RN_RETRY.includes(v.erro) ? <div><OBtn size="sm" iconLeft="mic" onClick={() => vozOuvir('comando')}>Tentar de novo</OBtn></div> : null}
      </div> : null}
      {v.estado === 'pronto' || v.estado === 'vazio' ? <div style={{ display: 'flex', justifyContent: 'flex-end' }}><OBtn size="sm" variant="secondary" iconLeft="mic" onClick={() => vozOuvir('comando')}>Falar de novo</OBtn></div> : null}
    </div>
  </>;
}
Object.assign(window, { rnComandoLocal, rnIrPara, rnAbrirFicha, FichaGlobal, VozRoot, VozBotao, rnExecCmd, rnPode, VOZ, vozOuvir, vozProcessar, rnAcharPaciente });
