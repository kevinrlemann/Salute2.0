/* =====================================================================
   RENATA IA no modo conectado (Supabase)
   A Renata lê só os dados da clínica ativa, que vêm do banco com a
   segurança de cada tabela. A conversa com o Claude e a voz passam pela
   função "renata" do servidor; as chaves nunca chegam ao navegador.
   Cada pergunta e resposta e cada lançamento confirmado ficam gravados.
   ===================================================================== */
const RN_DIAS_SEMANA = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
function rnHojeTxt() { return RN_DIAS_SEMANA[TODAY.getDay()] + ', ' + dBR(TODAY_ISO); }
function rnQuem() {
  if (!SB_ON) return 'a Dra. Camila Rocha, administradora da clínica';
  const p = SESSAO.v.perfil || {};
  return [[p.tratamento, nomeCompleto()].filter(Boolean).join(' '), papelTela()].filter(Boolean).join(', ') + ' da clínica';
}
function rnPrimeiroNome() { return String((SESSAO.v.perfil || {}).nome || '').split(' ')[0] || 'tudo bem'; }

/* ---------- chamada à função do servidor ---------- */
async function rnFn(body, signal) {
  const { data } = await SB.auth.getSession();
  const tok = data && data.session ? data.session.access_token : SB_CFG.key;
  const form = typeof FormData !== 'undefined' && body instanceof FormData;
  return sbFetch(SB_CFG.url + '/functions/v1/renata', { method: 'POST', signal, headers: { Authorization: 'Bearer ' + tok, apikey: SB_CFG.key, ...(form ? {} : { 'content-type': 'application/json' }) },
    body: form ? body : JSON.stringify({ clinica_id: CLI(), ...body }) });
}
let RN_STATUS_OK = false;
async function rnStatusServidor() {
  let j = {};
  try { const r = await rnFn({ acao: 'status' }); if (r.ok) { j = await r.json(); RN_STATUS_OK = true; } } catch (e) { console.warn('[renata] função do servidor indisponível', e); }
  const voz = CAT.v.voz || {};
  RN_AI.v = { key: j.claude ? SENHA_GUARDADA : '' }; avisar(RN_AI);
  RN_VOICE.v = { key: j.voz ? SENHA_GUARDADA : '', voiceId: voz.voice_id || RN_VOZ_OFICIAL, model: voz.modelo || 'eleven_flash_v2_5' }; avisar(RN_VOICE);
  rnRefreshMode();
}
async function rnTestarServidor(key) {
  try {
    if (key && key !== SENHA_GUARDADA) await DB.rpc('salvar_segredo', { p_clinica: CLI(), p_provedor: 'anthropic', p_segredo: key.trim() }, 'Não foi possível guardar a chave do Claude');
    const r = await rnFn({ acao: 'testar' });
    const j = await r.json().catch(() => ({}));
    await rnStatusServidor();
    return j.ok ? { ok: true } : { ok: false, why: j.motivo || rnApiWhy(j.status || r.status) };
  } catch (e) { return { ok: false, why: MSG_ERRO(e) }; }
}
async function rnSalvarConexoes(k, f) {
  const segredo = async (prov, valor, antes) => {
    if (valor && valor !== SENHA_GUARDADA) await DB.rpc('salvar_segredo', { p_clinica: CLI(), p_provedor: prov, p_segredo: valor.trim() }, 'Não foi possível guardar a chave');
    else if (!valor && antes === SENHA_GUARDADA) await DB.rpc('salvar_segredo', { p_clinica: CLI(), p_provedor: prov, p_segredo: null }, 'Não foi possível remover a chave');
  };
  await segredo('anthropic', String(k || '').trim(), RN_AI.v.key);
  await segredo('elevenlabs', String(f.key || '').trim(), RN_VOICE.v.key);
  const voz = CAT.v.voz, dados = { voice_id: f.voiceId || RN_VOZ_OFICIAL, modelo: f.model || 'eleven_flash_v2_5' };
  const row = voz ? await DB.upd('renata_voz', voz.id, dados, 'Não foi possível salvar a voz') : await DB.ins('renata_voz', dados, 'Não foi possível salvar a voz');
  catSet({ voz: row });
  await rnStatusServidor();
  avisoOk('Conexões da Renata salvas');
}

/* ---------- dados da clínica para a Renata ---------- */
function rnPreencherClinica() {
  const c = CAT.v.clinica || {}, g = CAT.v.config || {};
  const NOMES = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  const hs = [1, 2, 3, 4, 5, 6, 0].map((d) => { const h = (CAT.v.horarios || []).find((x) => x.dia_semana === d); return NOMES[d] + ' ' + (h && h.aberto ? String(h.hora_inicio || '').slice(0, 5) + ' às ' + String(h.hora_fim || '').slice(0, 5) : 'fechado'); });
  const formas = (CAT.v.formas || []).filter((f) => f.aceita && f.ativo).map((f) => (f.chave === 'credito' && g.parcelas_maximas_credito > 1 ? f.nome.toLowerCase() + ' em até ' + g.parcelas_maximas_credito + ' vezes' : f.nome.toLowerCase()));
  substituirObj(RN_CLINICA, {
    fantasia: c.nome_fantasia || 'clínica', razao: c.razao_social || '', responsavel: c.responsavel_nome || '', cnpj: c.cnpj || '', email: c.email || '',
    telefone: BR.telTela(c.telefone), whatsapp: BR.telTela(c.whatsapp),
    endereco: [[c.logradouro, c.numero].filter(Boolean).join(', '), c.complemento, c.bairro, [c.cidade, c.uf].filter(Boolean).join('/'), c.cep ? 'CEP ' + c.cep : ''].filter(Boolean).join(', '),
    estrutura: [g.tem_estacionamento ? 'Estacionamento para pacientes' : null, g.tem_acessibilidade ? 'Acessibilidade (rampa e banheiro adaptado)' : null, g.tem_wifi_pacientes ? 'Wi-Fi para pacientes' : null].filter(Boolean),
    horarios: hs.join('; '), pagamentos: formas.join(', '),
  });
  const sug = (CAT.v.renata && CAT.v.renata.sugestoes_iniciais) || [];
  const ICONES = ['calendar-days', 'banknote', 'triangle-alert', 'package', 'chart-column', 'user-round'];
  if (sug.length) substituir(RN_SUGS, sug.slice(0, 6).map((t, i) => [ICONES[i % ICONES.length], t]));
}
// Pacientes recentes do Painel: os próximos atendimentos e os últimos feitos (mesma lista da tela)
function rnPacientesRecentesDB() {
  const ag = painelTela(PAINEL.v).agenda || [], agora = Date.now(), t = (a) => new Date(a.inicio).getTime();
  const quando = (a) => { const p = BR.partes(a.inicio); return String(p.dia).padStart(2, '0') + '/' + String(p.mes).padStart(2, '0') + ' ' + p.hm; };
  const item = (a) => ({ nome: a.name, procedimento: a.proc, profissional: a.profNome, quando: quando(a), status: a.status });
  return {
    proximos: ag.filter((a) => t(a) >= agora).sort((a, b) => t(a) - t(b)).slice(0, 10).map(item),
    jaAtendidos: ag.filter((a) => t(a) < agora).sort((a, b) => t(b) - t(a)).slice(0, 10).map(item),
  };
}
function rnPainelDB() {
  const D = painelTela(PAINEL.v), s = D.stats, tx = (t) => (t.direction === 'down' ? '-' : '+') + t.value + ' vs mês anterior';
  const g = (PAINEL.v && PAINEL.v.genero) || {};
  const agora = Date.now(), prox = D.mesAtual ? (D.agenda || []).filter((a) => new Date(a.inicio).getTime() >= agora).length : null;
  return {
    periodo: D.mesNome + (D.mesAtual ? ' (mês atual)' : ' (mês escolhido no Painel)'),
    regras: 'Antigo é o paciente que já fez algum procedimento até o fim do mês; novo ainda não fez. Retorno é o agendamento de quem já tinha feito procedimento antes daquele dia.',
    totalPacientes: { valor: +s[0].value, novos: s[0].breakdown[0].value, antigos: s[0].breakdown[1].value, variacao: tx(s[0].trend) },
    agendamentosMes: { valor: +s[1].value, novos: s[1].breakdown[0].value, retornos: s[1].breakdown[1].value, variacao: tx(s[1].trend), proximos30dias: prox },
    iaEconomizou: { horas: parseInt(s[2].value, 10), conversas: s[2].breakdown[0].value, agendamentosFeitosPelaIA: s[2].breakdown[1].value, variacao: tx(s[2].trend) },
    atendimentos: { total: D.atend, variacao: D.atendTrend + ' vs mês anterior' },
    genero: { pacientes: D.total, homens: g.masculino || 0, mulheres: g.feminino || 0, semInformacao: Math.max(0, D.total - (g.masculino || 0) - (g.feminino || 0)) },
    atendimentosPorDiaDaSemana: D.week.map((w) => ({ dia: w.label, atendimentos: w.value, agendados: w.target })),
    funilDeVendas: D.funil.map((f) => ({ etapa: f.label, leads: f.value })), conversaoDoFunil: D.conv, tempoMedioNoFunil: D.diasMedios,
    leadsPorCanal: D.canais.map((c) => ({ canal: c.label, leads: c.value, conversao: c.conv })),
    atividadeMensal: D.mesNome + ': há agendamentos nos dias ' + D.mes.bold.join(', ') + '; hoje é dia ' + D.mes.today,
  };
}
function rnContaDB(plan) {
  return { usuario: nomeCompleto() + ' (' + papelTela() + ')', plano: plan ? plan.nome + (plan.preco ? ' R$ ' + plan.preco + '/mês' : ' sob consulta') : 'sem plano',
    mensagensIAEsteMes: consumoMes().toLocaleString('pt-BR') + ' de ' + PLAN_LIMIT.toLocaleString('pt-BR'), proximaCobranca: proxCobranca(), idioma: LANG.v,
    somNovaMensagem: SOUND.v.on ? 'ligado (' + SOUND.v.tone + ')' : 'desligado' };
}
// agenda de um dia com os horários reais
function rnAgendaDB(iso) {
  const d = new Date(iso + 'T00:00:00');
  const itens = APPT_STORE.v.filter((a) => a.date === iso && a.status !== 'cancelado').sort((a, b) => String(a.ini).localeCompare(String(b.ini))).map((a) => {
    const pr = PROS.find((p) => p.id === a.profId) || {};
    return { inicio: a.h + a.m / 60, horario: BR.hm(a.ini) + ' às ' + BR.hm(a.fim), paciente: a.pac, procedimento: a.proc || undefined, profissional: pr.n || '', especialidade: pr.r || '', status: a.status || undefined };
  });
  const h = (CAT.v.horarios || []).find((x) => x.dia_semana === d.getDay());
  return { data: dBR(iso), diaSemana: RN_DIAS_SEMANA[d.getDay()], fechado: h ? !h.aberto : false, total: itens.length, agendamentos: itens };
}
// ficha do paciente com o prontuário do banco; a leitura fica registrada na auditoria (LGPD)
async function rnPacienteDB(nome) {
  const base = rnPaciente(nome);
  const p = base && base.nome ? PAC.find((x) => x.nome === base.nome && x.dbId) : null;
  if (!p) return base;
  const [pr, hist] = await Promise.all([ProntSvc.carregar(p), PacSvc.historico(p)]);
  SB.rpc('registrar_leitura', { p_clinica: CLI(), p_tabela: 'pacientes', p_registro: p.dbId, p_motivo: 'Consulta pela Renata IA' }).then(() => {});
  return {
    ...base, numeroProntuario: p.numero,
    prontuario: pr.recs.filter((r) => r.kind !== 'doc').map((r) => ({ tipo: r.kind, data: r.date, titulo: r.title, status: r.status, observacoes: r.obs || undefined, profissional: r.pro || undefined, materiais: r.mats, pontos: r.points ? r.points.length : undefined, respostasAnamnese: r.answers })),
    documentos: pr.docs.filter((d) => d.type !== 'compare').map((d) => ({ nome: d.name, pasta: d.folder, data: d.date })),
    historico: hist.map((h) => h.d + ' ' + h.t + (h.s ? ' (' + h.s + ')' : '')),
    proximosAgendamentos: APPT_STORE.v.filter((a) => a.pacId === p.dbId && a.date >= TODAY_ISO && a.status !== 'cancelado').sort((a, b) => String(a.ini).localeCompare(String(b.ini))).slice(0, 5).map((a) => dBR(a.date) + ' às ' + BR.hm(a.ini) + (a.proc ? ' (' + a.proc + ')' : '')),
  };
}
let RN_PREP = null;
function rnPrepararDados() {
  if (!RN_PREP) RN_PREP = (async () => {
    await Promise.all(['catalogos', 'pacientes', 'agenda', 'financeiro', 'estoque', 'clinica', 'painel', 'conteudo', 'equipe', 'mensagens', 'anamnese'].map((n) => carregar(n)));
    rnPreencherClinica();
    if (!RN_STATUS_OK) await rnStatusServidor();
  })().catch((e) => { RN_PREP = null; console.error('[renata]', e); });
  return RN_PREP;
}
// sem IA ligada: diz isso com clareza e ainda prepara lançamentos
async function rnSemIA(question, voice, onText, signal, why) {
  const lc = window.rnComandoLocal ? rnComandoLocal(question) : null;
  if (lc) { if (voice) onText(lc); else await rnStream(lc, onText, signal); return { text: lc, mode: 'acao' }; }
  const la = rnLocalAction(question);
  if (la) { if (voice) onText(la.text); else await rnStream(la.text, onText, signal); return { text: la.text, mode: 'demo' }; }
  const t = why ? `Não consegui falar com a IA agora (${why}). Tente de novo em instantes.`
    : 'A Renata ainda não está ligada à IA nesta clínica. Em **Conexões da Renata**, aqui no chat, o dono ou gestor salva a chave do Claude. Enquanto isso, já consigo preparar lançamentos no financeiro e no estoque para você confirmar.';
  if (voice) onText(rnPlain(t)); else await rnStream(t, onText, signal);
  return { text: t, mode: 'demo' };
}

/* ---------- conversa gravada (cada usuário só vê a própria) ---------- */
let RN_CONV = null, RN_CONV_P = null;
function rnConversa(titulo) {
  if (RN_CONV) return Promise.resolve(RN_CONV);
  if (!RN_CONV_P) RN_CONV_P = SB.from('renata_conversas').insert({ clinica_id: CLI(), titulo: String(titulo || 'Conversa').slice(0, 80) }).select('id').single()
    .then(({ data, error }) => { if (error) throw error; RN_CONV = data.id; return RN_CONV; }).finally(() => { RN_CONV_P = null; });
  return RN_CONV_P;
}
function rnRegistrar(q, r, voz, msgId, interrompida) {
  const idR = novoId();
  (async () => {
    const cid = await rnConversa(q);
    const modo = r && r.mode;
    const { error } = await SB.from('renata_mensagens').insert([
      { id: novoId(), clinica_id: CLI(), renata_conversa_id: cid, papel: 'usuario', conteudo: q, modo_resposta: null, erro: false, interrompida: false, ferramentas_usadas: null, modelo: null, via_voz: !!voz },
      { id: idR, clinica_id: CLI(), renata_conversa_id: cid, papel: 'renata', conteudo: (r && r.text) || '', modo_resposta: modo === 'interrompida' ? null : modo, erro: modo === 'erro', interrompida: !!interrompida,
        ferramentas_usadas: r && r.ferramentas && r.ferramentas.length ? Array.from(new Set(r.ferramentas)) : null, modelo: modo === 'api' ? (voz ? RN_MODELS.voz[0] : RN_MODELS.chat[0]) : null, via_voz: !!voz },
    ]);
    if (error) throw error;
    if (msgId !== undefined) { RN_STORE.v = { ...RN_STORE.v, msgs: RN_STORE.v.msgs.map((m) => (m.id === msgId ? { ...m, dbId: idR } : m)) }; avisar(RN_STORE); }
  })().catch((e) => console.error('[renata] conversa não gravada', e));
}
function rnFeedback(m, valor) {
  if (!m || !m.dbId) return;
  SB.from('renata_mensagens').update({ feedback: valor, feedback_em: valor ? agoraIso() : null }).eq('id', m.dbId).then(({ error }) => { if (error) console.error('[renata]', error); });
}
function rnSubstituida(m) {
  if (!m || !m.dbId) return;
  SB.from('renata_mensagens').update({ substituida: true }).eq('id', m.dbId).then(() => {});
}
function rnNovaConversa() {
  const id = RN_CONV; RN_CONV = null;
  if (id) SB.from('renata_conversas').update({ encerrada_em: agoraIso() }).eq('id', id).then(() => {});
}
async function rnRegistrarAcao(a, estado, id) {
  const cid = await rnConversa(a.kind === 'cmd' ? 'Comando pela Renata' : 'Lançamento pela Renata').catch(() => null);
  return DB.ins('renata_acoes', { id: id || novoId(), renata_conversa_id: cid, tipo: a.kind === 'cmd' ? a.registro : a.kind === 'est' ? 'movimentacao_estoque' : 'lancamento_financeiro', estado,
    resumo: rnPlain(rnResumo(a)), itens: a.kind === 'cmd' ? [a.dados || {}] : a.items, decidida_em: agoraIso(), decidida_por: UID() }, 'Não foi possível registrar a ação da Renata');
}

/* ---------- lançamentos confirmados: tela muda na hora, banco grava em seguida ---------- */
function rnApplyDB(a) {
  const acaoId = novoId(), ia = { criado_por_ia: true, renata_acao_id: acaoId };
  if (a.kind === 'est') {
    PROD_STORE.v = PROD_STORE.v.map((p) => { const x = a.items.find((i) => i.prodId === p.id); if (!x) return p; return { ...p, qtd: x.tipo === 'saida' ? Math.max(0, p.qtd - x.quantidade) : p.qtd + x.quantidade, cons: x.tipo === 'saida' ? (p.cons || 0) + x.quantidade : p.cons }; });
    avisar(PROD_STORE);
    const compras = a.items.filter((x) => x.tipo === 'entrada' && x.valorTotal).map((x) => { const id = novoId(); return { id, dbId: id, desc: `${x.produto} (${rnUnPl(x.quantidade, x.un)})`, cat: 'Insumos e fornecedores', forn: 'Não informado', total: x.valorTotal, forma: 'Pix', data: TODAY_ISO, venc: TODAY_ISO, parc: 1, status: 'Pago', ia: true }; });
    if (compras.length) { DESP_STORE.v = [...compras, ...DESP_STORE.v]; avisar(DESP_STORE); }
    bg((async () => {
      await rnRegistrarAcao(a, 'lancado', acaoId);
      const gerados = [];
      for (const x of a.items) { const p = PROD_STORE.v.find((q) => q.id === x.prodId) || {}; const r = await EstSvc.mover({ ...p, id: x.prodId, dbId: x.prodId }, x.tipo === 'saida' ? -x.quantidade : x.quantidade, { ...ia, motivo: 'Lançado pela Renata IA' }); gerados.push({ tabela: 'movimentacoes_estoque', id: r.id }); }
      for (const c of compras) { await FinSvc.criar('desp', c, { ...ia, silencioso: true }); gerados.push({ tabela: 'contas_pagar', id: c.id }); }
      await SB.from('renata_acoes').update({ registros_gerados: gerados }).eq('id', acaoId);
    })(), () => carregar('estoque', true));
    return 'Pronto! Estoque atualizado: ' + a.items.map((x) => `**${x.produto}** agora tem ${rnUnPl(x.para, x.un)}`).join('; ') + '.';
  }
  const rec = a.items.filter((x) => x.tipo === 'receita').map((x) => { const id = novoId(); return { id, dbId: id, data: TODAY_ISO, pac: x.paciente, proc: x.procedimento, pro: x.profissional, cat: x.cat, atend: x.forma === 'Convênio' ? 'Convênio' : 'Particular', total: x.valor, desc: 0, forma: x.forma, parc: 1, venc: x.venc, status: x.pago ? 'Recebido' : 'Pendente', ia: true }; });
  const des = a.items.filter((x) => x.tipo === 'despesa').map((x) => { const id = novoId(); return { id, dbId: id, desc: x.descricao, cat: x.cat, forn: x.fornecedor, total: x.valor, forma: x.forma, data: x.data, venc: x.venc, parc: 1, status: x.pago ? 'Pago' : 'Pendente', ia: true }; });
  if (rec.length) { REC_STORE.v = [...rec, ...REC_STORE.v]; avisar(REC_STORE); }
  if (des.length) { DESP_STORE.v = [...des, ...DESP_STORE.v]; avisar(DESP_STORE); }
  bg((async () => {
    await rnRegistrarAcao(a, 'lancado', acaoId);
    const gerados = [];
    for (const r of rec) { await FinSvc.criar('rec', r, { ...ia, silencioso: true }); gerados.push({ tabela: 'contas_receber', id: r.id }); }
    for (const d of des) { await FinSvc.criar('desp', d, { ...ia, silencioso: true }); gerados.push({ tabela: 'contas_pagar', id: d.id }); }
    await SB.from('renata_acoes').update({ registros_gerados: gerados }).eq('id', acaoId);
  })(), () => carregar('financeiro', true));
  const ps = a.items.map((x) => x.tipo === 'receita' ? `${brl(x.valor)} ${x.pago ? 'recebido' : 'a receber em ' + dBR(x.venc)}` : `despesa ${x.descricao} de ${brl(x.valor)} ${x.pago ? 'paga' : 'a pagar em ' + dBR(x.venc)}`);
  return `Pronto! Lancei no financeiro: ${ps.join(' e ')}${rec.length ? ', de ' + rec[0].pac : ''}.`;
}

// quando a clínica abre, já descobre se a IA e a voz estão ligadas no servidor
if (SB_ON) {
  let iniciou = false;
  const ver = () => { if (SESSAO.v.estado === 'pronto' && !iniciou) { iniciou = true; carregar('catalogos').then(() => { rnPreencherClinica(); return rnStatusServidor(); }); } };
  SESSAO.subs.add(ver); ver();
}

Object.assign(window, { rnFn, rnStatusServidor, rnTestarServidor, rnSalvarConexoes, rnPrepararDados, rnPacienteDB, rnAgendaDB, rnPainelDB, rnPacientesRecentesDB, rnContaDB, rnApplyDB, rnRegistrar, rnFeedback, rnSubstituida, rnRegistrarAcao, rnNovaConversa, rnSemIA, rnHojeTxt, rnQuem, rnPrimeiroNome });
