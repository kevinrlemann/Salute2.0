/* =====================================================================
   SERVIÇOS DE DADOS: Painel e saudação (Supabase)
   Todos os números do Painel vêm da função painel_mes do banco,
   calculados só com os dados da clínica ativa, mês a mês.
   ===================================================================== */
const PAINEL = makeStore(null);
const mesIso = (ano, mes) => ano + '-' + String(mes).padStart(2, '0') + '-01';
const PAINEL_MES = makeStore({ iso: mesIso(BR.partes().ano, BR.partes().mes), carregando: false });
CARGAS.painel = async () => {
  const r = await DB.ler(SB.rpc('painel_mes', { p_clinica: CLI(), p_mes: PAINEL_MES.v.iso }), 'Não foi possível carregar o Painel');
  PAINEL.v = r; avisar(PAINEL);
};
// troca o mês de todos os cartões do Painel; os números antigos ficam na tela até os novos chegarem
async function painelMudarMes(iso) {
  if (!iso || iso === PAINEL_MES.v.iso) return;
  PAINEL_MES.v = { iso, carregando: true }; avisar(PAINEL_MES);
  if (!SB_ON) { PAINEL_MES.v = { iso, carregando: false }; avisar(PAINEL_MES); return; }
  try {
    const { data, error } = await SB.rpc('painel_mes', { p_clinica: CLI(), p_mes: iso });
    if (error) throw error;
    if (PAINEL_MES.v.iso === iso) { PAINEL.v = data; avisar(PAINEL); }
  } catch (e) { avisoErro('Não foi possível carregar o Painel', e); }
  if (PAINEL_MES.v.iso === iso) { PAINEL_MES.v = { iso, carregando: false }; avisar(PAINEL_MES); }
}
// meses que dá para escolher: o atual e os 11 anteriores
function mesesPainel() {
  const p = BR.partes(); const out = [];
  for (let i = 0; i < 12; i++) { const d = new Date(p.ano, p.mes - 1 - i, 1); out.push({ value: mesIso(d.getFullYear(), d.getMonth() + 1), label: MESES[d.getMonth()] + ' ' + d.getFullYear() }); }
  return out;
}
const mesNomeIso = (iso) => { const [a, m] = String(iso).split('-'); return MESES[+m - 1] + ' ' + a; };
const mesVizinho = (iso, d) => { const [a, m] = String(iso).split('-').map(Number); const x = new Date(a, m - 1 + d, 1); return mesIso(x.getFullYear(), x.getMonth() + 1); };
// variação em relação ao período anterior, no formato do TrendPill
const variacao = (a, b) => {
  const v = b ? (a - b) / b * 100 : a ? 100 : 0;
  return { value: (Math.round(Math.abs(v) * 10) / 10).toFixed(1).replace('.', ',') + '%', direction: v < 0 ? 'down' : 'up' };
};
const pctTxt = (a, b) => (b ? (Math.round(a / b * 1000) / 10).toFixed(1).replace('.', ',') : '0,0') + '%';
const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const STATUS_PAC = { em_tratamento: 'tratamento', consulta: 'consulta', concluido: 'concluido' };
function painelTela(r) {
  r = r || {};
  const pac = r.pacientes || {}, ag = r.agendamentos || {}, ia = r.ia || {}, at = r.atendimentos || {}, gen = r.genero || {}, fu = r.funil || {};
  const lbl = { value: '', label: 'vs mês anterior' };
  const horas = Math.round((ia.conversas || 0) * (ia.minutos_por_conversa || 5) / 60);
  const etapas = (fu.etapas || []).map((e) => ({ label: e.nome, value: Number(e.valor || 0) }));
  const canais = (r.canais || []).map((c) => ({
    label: c.nome, value: Number(c.valor || 0), color: c.cor || '#1F5EFF', icon: c.icone || 'megaphone',
    conv: c.valor ? Math.round(c.convertidos / c.valor * 100) + '%' : '0%',
    subcanais: (c.subcanais || []).map((f) => ({
      label: f.nome, value: Number(f.valor || 0), color: f.cor || '#1F5EFF', icon: f.icone || 'megaphone',
      conv: f.valor ? Math.round(f.convertidos / f.valor * 100) + '%' : '0%',
    })),
  }));
  const DIAS_C = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  // Corrige lógica: value=0 → sem barra (base=0); escala calculada sobre valores reais de atendimentos
  const week = DIAS_C.map((label, d) => {
    const x = (at.por_dia_semana || []).find((y) => y.dia === d) || {};
    const v = Number(x.atendimentos || 0), t = Number(x.agendados || 0);
    // base só é positivo quando há atendimento de fato; se v=0, base=0 garante sem coluna
    return { label, value: v, target: Math.max(t, v), base: v > 0 ? Math.min(v, 2) : 0 };
  });
  // topo baseado nos valores reais de atendimentos, não agendados, para escala fiel
  const topoReal = Math.max(1, ...week.map((w) => w.value));
  const hoje = BR.dia(), mIso = r.mes || PAINEL_MES.v.iso, [mA, mM] = String(mIso).split('-').map(Number), ini = new Date(mA, mM - 1, 1);
  const ativ = r.atividade_mes || [];
  const feriados = (r.feriados_mes || []).map((f) => ({ dia: f.dia, nome: f.nome, cidade: f.cidade || '', tipo: f.tipo, id: f.id, recorrente: !!f.recorrente }));
  const total = Number(gen.total || pac.total || 0);
  const tr = (a, b) => ({ ...lbl, ...variacao(a, b) });
  const tf = variacao(fu.total || 0, fu.anterior || 0), ta = variacao(at.total || 0, at.anterior || 0);
  return {
    stats: [
      { icon: 'users', title: 'Total de pacientes', value: String(pac.total || 0), trend: tr(pac.total || 0, pac.total_anterior || 0), breakdown: [{ label: 'Novos', value: pac.novos || 0 }, { label: 'Antigos', value: pac.antigos || 0 }] },
      { icon: 'calendar-days', title: 'Agendamentos', value: String(ag.total || 0), trend: tr(ag.total || 0, ag.anterior || 0), breakdown: [{ label: 'Novos', value: ag.novos || 0 }, { label: 'Retornos', value: ag.retornos || 0 }] },
      { icon: 'sparkles', title: 'IA economizou seu tempo', value: horas + 'h', trend: tr(ia.conversas || 0, ia.conversas_anterior || 0), breakdown: [{ label: 'Conversas', value: ia.conversas || 0 }, { label: 'Agendou', value: ia.agendou || 0 }] },
    ],
    funil: etapas.length ? etapas : [{ label: 'Novo', value: 0 }],
    funilTotal: fu.total || 0, funilTrend: (tf.direction === 'down' ? '-' : '') + tf.value,
    conv: etapas.length > 1 ? pctTxt(etapas[etapas.length - 1].value, etapas[0].value) : '0,0%',
    diasMedios: fu.dias_medios ? String(fu.dias_medios).replace('.', ',') + (Number(fu.dias_medios) === 1 ? ' dia' : ' dias') : 'sem dados',
    canais: canais.length ? canais : [], leads: canais.reduce((a, c) => a + c.value, 0),
    atend: at.total || 0, atendTrend: (ta.direction === 'down' ? '-' : '') + ta.value,
    week, weekMax: Math.ceil(topoReal * 1.25 / 5) * 5 || 5,
    total, homens: total ? Math.round(gen.masculino / total * 100) + '%' : '0%', mulheres: total ? Math.round(gen.feminino / total * 100) + '%' : '0%',
    // gauge usa proporção real: masculino e feminino como porcentagens do total
    gaugeHomens: total ? Math.round(gen.masculino / total * 100) : 0,
    gaugeMulheres: total ? Math.round(gen.feminino / total * 100) : 0,
    gauge: total >= 1000 ? '1000+' : String(total),
    mesNome: MESES[mM - 1] + ' ' + mA,
    mes: { startOffset: ini.getDay(), days: new Date(mA, mM, 0).getDate(), today: hoje.getFullYear() === mA && hoje.getMonth() === mM - 1 ? hoje.getDate() : 0, bold: Array.from(new Set(ativ.map((a) => a.dia))), feriados },
    mesAtual: !!r.mes_atual,
    profissionais: r.profissionais || [], meuProf: r.meu_profissional || null,
    agenda: (r.agenda_lista || []).map((a) => ({ id: a.id, inicio: a.inicio, prof: a.profissional_id, profNome: a.profissional || '', name: a.paciente, pront: a.numero_prontuario || '', age: a.idade === null || a.idade === undefined ? '' : a.idade, proc: a.procedimento, status: a.status || 'Agendado', cor: a.status_cor || '#1F5EFF', feito: !!a.realizado })),
  };
}
// saudação do Painel: bom dia, boa tarde ou boa noite, com o tratamento e o primeiro nome
function saudacao() {
  const h = BR.partes().h, p = SESSAO.v.perfil || {};
  const quem = [p.tratamento, String(p.nome || '').split(' ')[0]].filter(Boolean).join(' ');
  return (h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite') + (quem ? ', ' + quem : '');
}

Object.assign(window, { PAINEL, PAINEL_MES, painelTela, saudacao, painelMudarMes, mesesPainel, mesNomeIso, mesVizinho });
