/* =====================================================================
   RENATA IA · base de conhecimento da clínica (dados de demonstração)
   Tudo aqui vem SOMENTE da clínica logada. Com o banco de dados real,
   estas funções passam a consultar o Supabase filtrando pelo clinic_id.
   ===================================================================== */
const RN_CLINICA = {
  fantasia: 'Clínica Bella Forma', razao: 'Bella Forma Estética e Odontologia Ltda', responsavel: 'Dra. Camila Rocha', cnpj: '12.345.678/0001-90',
  email: 'contato@bellaforma.com.br', telefone: '(19) 3863-4100', whatsapp: '(19) 99800-4100',
  endereco: 'Rua Comendador João Cintra, 415, Sala 2, Centro, Itapira/SP, CEP 13970-000',
  estrutura: ['Estacionamento para pacientes', 'Acessibilidade (rampa e banheiro adaptado)', 'Wi-Fi para pacientes'],
  horarios: 'Segunda a sexta 08:00 às 19:00; sábado 08:00 às 12:00; domingo fechado',
  pagamentos: 'Pix, dinheiro, cartão de débito e cartão de crédito em até 6 vezes',
};
const RN_PAINEL = {
  totalPacientes: { valor: 102, novos: 48, antigos: 54, variacao: '+12,8% no último mês' },
  agendamentosMes: { valor: 254, novos: 56, retornos: 43, variacao: '+1,9% no último mês' },
  iaEconomizou: { horas: 27, conversas: 412, agendamentosFeitosPelaIA: 64, variacao: '+11,5% no último mês' },
  atendimentosSemana: { total: 48, variacao: '+0,8% vs mês anterior' },
  genero: 'Painel mostra 102 pacientes: homens 35%, mulheres 15% (indicador do painel)',
};
const rnHM = (h) => String(Math.floor(h)).padStart(2, '0') + ':' + (h % 1 ? '30' : '00');
const rnIso = (d) => isoOf(d);
const rnMoney = (n) => brl(n);
const rnSum = (a, f) => a.reduce((s, x) => s + f(x), 0);
const rnGroup = (arr, key, val) => { const o = {}; arr.forEach((x) => { const k = typeof key === 'function' ? key(x) : x[key]; o[k] = (o[k] || 0) + val(x); }); return Object.entries(o).sort((a, b) => b[1] - a[1]).map(([k, v]) => ({ nome: k, valor: Math.round(v * 100) / 100 })); };

function rnFin(ini, fim) {
  const rec = REC_STORE.v, desp = DESP_STORE.v;
  const R = rec.filter((r) => r.data >= ini && r.data <= fim), D = desp.filter((d) => d.data >= ini && d.data <= fim);
  const fat = rnSum(R, liq), receb = rnSum(R.filter((r) => r.status === 'Recebido'), liq), pend = R.filter((r) => r.status === 'Pendente');
  const atras = pend.filter((r) => r.venc < TODAY_ISO);
  const tD = rnSum(D, (d) => d.total);
  return {
    periodo: dBR(ini) + ' a ' + dBR(fim), atendimentos: R.length, faturamento: Math.round(fat), recebido: Math.round(receb), aReceber: Math.round(rnSum(pend, liq)), emAtraso: Math.round(rnSum(atras, liq)), lancamentosEmAtraso: atras.length,
    despesas: Math.round(tD), lucroLiquido: Math.round(fat - tD), margemPct: fat ? Math.round((fat - tD) / fat * 1000) / 10 : 0, ticketMedio: R.length ? Math.round(fat / R.length) : 0,
    descontosConcedidos: Math.round(rnSum(R, (r) => r.desc || 0)),
    porProfissional: rnGroup(R, 'pro', liq), porProcedimento: rnGroup(R, 'proc', liq), porAtendimento: rnGroup(R, 'atend', liq), porFormaPagamento: rnGroup(R, 'forma', liq),
    despesasPorCategoria: rnGroup(D, 'cat', (d) => d.total),
  };
}
function rnInadimplencia() {
  const rec = REC_STORE.v.filter((r) => r.venc < TODAY_ISO);
  const tot = rnSum(rec, liq), atr = rec.filter((r) => r.status === 'Pendente');
  return { taxaPct: tot ? Math.round(rnSum(atr, liq) / tot * 1000) / 10 : 0, valorEmAtraso: Math.round(rnSum(atr, liq)), lancamentos: atr.slice().sort((x, y) => y.venc.localeCompare(x.venc)).map((r) => ({ paciente: r.pac, procedimento: r.proc, valor: liq(r), vencimento: dBR(r.venc), forma: r.forma })).slice(0, 15), totalLancamentosEmAtraso: atr.length };
}
function rnAgenda(iso) {
  const d = new Date(iso + 'T00:00:00');
  const s = slotsFor(d).map((x) => ({ inicio: 9 + x.row, horario: rnHM(9 + x.row) + ' às ' + rnHM(9 + x.row + Math.max(1, Math.round(x.span || 1))), paciente: x.n, profissional: PROS[x.col].n, especialidade: PROS[x.col].r })).sort((a, b) => a.inicio - b.inicio);
  return { data: dBR(iso), diaSemana: ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'][d.getDay()], fechado: d.getDay() === 0, total: s.length, agendamentos: s };
}
function rnPaciente(nome) {
  const t = String(nome || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const norm = (x) => x.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const p = PAC.find((x) => norm(x.nome).includes(t) || t.split(' ').filter((w) => w.length > 2).every((w) => norm(x.nome).includes(w)));
  const fin = REC_STORE.v.filter((r) => t && norm(r.pac).includes(t.split(' ')[0]));
  if (!p) return fin.length ? { encontrado: 'só no financeiro', nome: fin[0].pac, atendimentos: fin.map((r) => ({ data: dBR(r.data), procedimento: r.proc, profissional: r.pro, valor: liq(r), status: r.status })) } : { encontrado: false, pacientesCadastrados: PAC.map((x) => x.nome) };
  const recs = seedRecs(p).map((r) => ({ tipo: r.kind, data: r.date, titulo: r.title, status: r.status, observacoes: r.obs, profissional: r.pro, pontos: r.points ? r.points.length : undefined, respostasAnamnese: r.answers }));
  return {
    nome: p.nome, tipo: p.tipo, convenio: p.conv || 'Sem convênio', empresa: p.empresa || 'Não se aplica', whatsapp: p.tel, nascimento: p.nasc, sexo: p.sexo, cpf: p.cpf,
    prontuario: recs,
    historico: ['10/09/2026 cadastro criado pela Renata IA via WhatsApp', '15/09/2026 primeira consulta (Avaliação) com Dra. Camila Rocha', '18/09/2026 procedimento de toxina botulínica com Dra. Camila Rocha', '02/10/2026 retorno agendado pela Renata IA para terça 07/10 às 10h'],
    financeiro: REC_STORE.v.filter((r) => r.pac === p.nome).map((r) => ({ data: dBR(r.data), procedimento: r.proc, valor: liq(r), status: r.status })),
  };
}
function rnEstoque() {
  const P = PROD_STORE.v;
  const cat = (s) => P.filter((p) => estStatus(p) === s).map((p) => ({ produto: p.nome, quantidade: p.qtd, unidade: p.un, minimo: p.min, validade: dBR(p.val), valorMedio: p.vm }));
  const compras = DESP_STORE.v.filter((d) => d.cat === 'Insumos e fornecedores' && inWin(d.data, 30)).map((d) => ({ data: dBR(d.data), descricao: d.desc, fornecedor: d.forn, valor: d.total }));
  return {
    totalProdutos: P.length, unidadesEmEstoque: rnSum(P, (p) => p.qtd), valorEmEstoque: Math.round(rnSum(P, (p) => p.qtd * p.vm)),
    abaixoDoMinimo: cat('baixo'), venceEmBreve60dias: cat('vence'), vencidos: cat('vencido'), emDia: cat('ok').map((x) => x.produto),
    custoParaReporAbaixoDoMinimo: Math.round(rnSum(P.filter((p) => p.qtd < p.min), (p) => (p.min * 2 - p.qtd) * p.vm)),
    perdaComVencidos: Math.round(rnSum(P.filter((p) => estStatus(p) === 'vencido'), (p) => p.qtd * p.vm)),
    consumoUltimos30dias: P.map((p) => ({ produto: p.nome, saiu: p.cons, unidade: p.un, valor: Math.round(p.cons * p.vm) })).sort((a, b) => b.valor - a.valor),
    consumoTotal30diasValor: Math.round(rnSum(P, (p) => p.cons * p.vm)),
    entradasCompras30dias: compras,
    produtos: P.map((p) => ({ produto: p.nome, categoria: p.cat, unidade: p.un, quantidade: p.qtd, minimo: p.min, validade: dBR(p.val), valorMedio: p.vm, status: STATUS_EST[estStatus(p)][0] })),
  };
}
function rnMonths() {
  const out = []; const now = new Date(TODAY);
  for (let k = 0; k < 7; k++) { const a = new Date(now.getFullYear(), now.getMonth() - k, 1), b = new Date(now.getFullYear(), now.getMonth() - k + 1, 0); const f = rnFin(rnIso(a), rnIso(b < TODAY ? b : TODAY)); out.push({ mes: MESL[a.getMonth()] + '/' + a.getFullYear(), faturamento: f.faturamento, recebido: f.recebido, despesas: f.despesas, lucroLiquido: f.lucroLiquido, atendimentos: f.atendimentos, ticketMedio: f.ticketMedio }); }
  return out;
}
const rnRange = (days) => [rnIso(addD(TODAY, -(days - 1))), TODAY_ISO];

function rnSnapshot() {
  const r30 = rnRange(30), r7 = rnRange(7);
  const nf = NF_STORE.v, wa = WA_STORE.v;
  const nfBase = REC_STORE.v.filter((r) => r.status === 'Recebido' && inWin(r.data, 30));
  const nfOk = nfBase.filter((r) => r.atend === 'Convênio' || PAC.some((p) => p.nome === r.pac));
  const pay = (() => { const R = REC_STORE.v.filter((r) => r.status === 'Recebido' && inWin(r.data, 30)), D = DESP_STORE.v.filter((d) => d.status === 'Pago' && inWin(d.data, 30)); const e = rnSum(R, liq), s = rnSum(D, (d) => d.total); return { saldoInicial: SALDO_INICIAL, entradas30dias: Math.round(e), saidas30dias: Math.round(s), saldoAtual: Math.round(SALDO_INICIAL + e - s), status: 'Beta' }; })();
  const plan = (typeof PLANS !== 'undefined' ? PLANS : []).find((p) => p.id === (typeof PLAN_STORE !== 'undefined' ? PLAN_STORE.v : 'iapro'));
  const data = {
    hoje: 'sexta-feira, 02/10/2026', clinica: RN_CLINICA,
    painel: { ...RN_PAINEL, atendimentosPorDiaDaSemana: WEEK.map((w) => ({ dia: w.label, atendimentos: w.value, meta: w.target })), atendimentosUltimos14dias: DAILY.map((d) => ({ dia: d.label + (+d.label > 15 ? '/09' : '/10'), atendimentos: d.value, meta: d.target })),
      funilDeVendas: FUNNEL.map((f) => ({ etapa: f.label, leads: f.value })), leadsPorCanal: CHANNELS.map((c) => ({ canal: c.label, leads: c.value, conversao: c.conv })), atividadeMensal: 'Outubro 2026: consultas e reuniões nos dias marcados do calendário; hoje é dia 2' },
    pacientes: PAC.map((p) => ({ nome: p.nome, tipo: p.tipo, convenio: p.conv || 'Sem convênio', empresa: p.empresa || '', whatsapp: p.tel, nascimento: p.nasc, sexo: p.sexo })),
    pacientesRecentes: (typeof PATIENTS !== 'undefined' ? PATIENTS.slice(0, 4) : []).map((p) => ({ nome: p.name, procedimento: p.proc, status: p.status })),
    agendaHoje: rnAgenda(TODAY_ISO), agendaAmanha: rnAgenda(rnIso(addD(TODAY, 1))),
    conversasPacientes: INBOX.map((c) => ({ contato: c.n, ultimaMensagem: c.m, hora: c.t, naoLidas: c.u })),
    conversasEquipe: EQUIPE.map((c) => ({ membro: c.n, funcao: c.r, ultimaMensagem: c.m, naoLidas: c.u })),
    estoque: rnEstoque(),
    financeiro: { ultimos7dias: rnFin(...r7), ultimos30dias: rnFin(...r30), porMes: rnMonths(), inadimplencia: rnInadimplencia(), dadosDisponiveisDesde: dBR(REC_STORE.v.reduce((m, r) => r.data < m ? r.data : m, TODAY_ISO)),
      despesasPendentes: DESP_STORE.v.filter((d) => d.status === 'Pendente').map((d) => ({ descricao: d.desc, valor: d.total, vencimento: dBR(d.venc) })),
      metasMensaisPorProfissional: FIN_PROS.map((p, i) => ({ profissional: p, meta: FIN_METAS[i] })),
      categoriasReceita: ['Estética', 'Odontologia', 'Consulta', 'Venda de produto'], categoriasDespesa: DESP_CATS },
    notaFiscal: { status: 'Beta, emissão direta ainda em desenvolvimento', prontasParaEmitir30dias: nfOk.length, valorPronto: Math.round(rnSum(nfOk, liq)), semCpf: nfBase.length - nfOk.length, aliquotaISS: nf.aliq + '%', inscricaoMunicipal: nf.im || 'não preenchida', certificadoDigital: nf.cert ? 'enviado' : 'não enviado', regime: nf.regime, municipio: nf.municipio },
    salutePay: pay,
    configuracoes: {
      modelosAnamnese: (ANAM_STORE.v || ANAM0).map((m) => ({ nome: m.nome, area: m.uso, perguntas: m.qs.map((q) => q.t), enviado: m.usos })),
      equipeEAcessos: TEAM_STORE.v.map((u) => ({ nome: u.nome, funcao: u.funcao, email: u.email, acessos: u.dono ? 'acesso total' : moduleTree().filter((m) => u.acc.includes(m.id)).map((m) => m.label + (m.children.length ? ' (' + m.children.filter((c) => u.acc.includes(c.id)).map((c) => c.label).join(', ') + ')' : '')).join('; ') })),
      profissionais: PROF_STORE.v.map((p) => ({ nome: p.nome, especialidade: p.esp, registro: p.reg, procedimentos: p.procs })),
      canais: { whatsapp: wa.status === 'on' ? 'conectado no ' + wa.numero + ' pela ' + (wa.modo === 'oficial' ? 'API oficial' : 'API não oficial') + ' desde ' + wa.desde : 'desconectado', instagram: 'Beta, conexão em breve' },
      saluteflix: FLIX0.map((c) => ({ titulo: c.t, tipo: c.tipo, categoria: c.cat, duracao: c.dur, progresso: c.prog + '%' })),
      saluteCast: CAST_STORE.v.map((e) => ({ episodio: e.ep, titulo: e.t, convidado: e.conv, duracao: e.dur })),
      parcerias: PARC0.map((p) => ({ parceiro: p.nome, categoria: p.cat, beneficio: p.ben, cupom: p.cupom || 'sem cupom', oficial: p.of })),
      certificacoes: SELOS_STORE.v.map((c) => c.nome),
      minhaConta: { usuaria: 'Camila Rocha (Administradora)', plano: plan ? plan.nome + (plan.preco ? ' R$ ' + plan.preco + '/mês' : ' sob consulta') : 'IA Pro', mensagensIAEsteMes: '6.240 de 10.000', proximaCobranca: '10/10/2026', idioma: LANG.v, somNovaMensagem: SOUND.v.on ? 'ligado (' + SOUND.v.tone + ')' : 'desligado' },
      planosDisponiveis: 'Inicial R$ 197/mês (todos os módulos), IA Pro R$ 997/mês (Renata IA com limite mensal de mensagens), Enterprise sob consulta',
    },
  };
  return JSON.stringify(data);
}

/* ---------- respostas sem conexão com IA (modo demonstração) ---------- */
const rnNorm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const rnHas = (q, ...w) => w.some((x) => q.includes(x));
function rnPeriod(q) {
  const mm = ['janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  const n = q.match(/(\d+)\s*dias/);
  if (rnHas(q, 'hoje')) return [TODAY_ISO, TODAY_ISO, 'hoje'];
  if (rnHas(q, 'ontem')) { const y = rnIso(addD(TODAY, -1)); return [y, y, 'ontem']; }
  if (n) return [...rnRange(+n[1]), 'nos últimos ' + n[1] + ' dias'];
  if (rnHas(q, 'semana passada')) return [rnIso(addD(TODAY, -13)), rnIso(addD(TODAY, -7)), 'na semana passada'];
  if (rnHas(q, 'semana')) return [...rnRange(7), 'nos últimos 7 dias'];
  if (rnHas(q, 'mes passado')) return ['2026-09-01', '2026-09-30', 'em setembro'];
  for (let i = 0; i < 12; i++) if (q.includes(mm[i])) { const a = new Date(2026, i, 1), b = new Date(2026, i + 1, 0); return [rnIso(a), rnIso(b < TODAY ? b : TODAY), 'em ' + MESL[i]]; }
  if (rnHas(q, 'trimestre')) return [...rnRange(90), 'nos últimos 90 dias'];
  if (rnHas(q, 'semestre')) return [...rnRange(180), 'nos últimos 6 meses'];
  if (/\bano\b|2026/.test(q)) return ['2026-01-01', TODAY_ISO, 'em 2026 (dados desde abril)'];
  return [...rnRange(30), 'nos últimos 30 dias'];
}
const rnL = (arr) => arr.map((x) => '- ' + x).join('\n');
function rnCore(q, pq) {
  const [ini, fim, lbl] = rnPeriod(pq);
  // paciente específico
  const short = q.split(' ').length <= 4;
  const pac = PAC.find((p) => { const parts = rnNorm(p.nome).split(' '); return q.includes(parts[0] + ' ' + parts[1]) || (new RegExp('\\b' + parts[0] + '\\b').test(q) && (short || rnHas(q, 'paciente', 'atendimento', 'prontuario', 'como foi', 'como esta', 'historico'))); });
  if (pac) {
    const d = rnPaciente(pac.nome);
    const fin = d.financeiro, pend = fin.filter((f) => f.status === 'Pendente');
  return `**${d.nome}** é paciente ${d.tipo.toLowerCase()}${d.convenio !== 'Sem convênio' ? ' (' + d.convenio + ')' : ''}, WhatsApp ${d.whatsapp}.\n\nComo foi o atendimento:\n${rnL(d.historico)}\n\nNo prontuário: anamnese facial respondida (usa ácido retinoico à noite e quer tratar rugas na testa e pés de galinha), mapeamento de toxina com 24U no terço superior e 3 fotos de antes. A anamnese de retorno ainda está aguardando resposta.${fin.length ? `\n\nNo financeiro: ${fin.length} lançamentos somando **${brl(rnSum(fin, (f) => f.valor))}**${pend.length ? `, com ${brl(rnSum(pend, (f) => f.valor))} pendente` : ', tudo recebido'}.` : ''}`;
  }
  if (rnHas(q, 'proximo paciente', 'proximo atendimento', 'proxima consulta', 'proximo horario', 'quem e o proximo', 'quem vem agora', 'proximo agendamento')) {
    const now = new Date(), hm = now.getHours() + now.getMinutes() / 60, a = rnAgenda(TODAY_ISO), nx = a.agendamentos.find((x) => x.inicio > hm);
    if (nx) return `O próximo é **${nx.paciente}**, às ${nx.horario.slice(0, 5)}, com ${nx.profissional}.`;
    const b = rnAgenda(rnIso(addD(TODAY, 1)));
    return `Hoje não há mais atendimentos.${b.total ? ` Amanhã o primeiro é **${b.agendamentos[0].paciente}**, às ${b.agendamentos[0].horario.slice(0, 5)}, com ${b.agendamentos[0].profissional}.` : ''}`;
  }
  if (rnHas(q, 'agenda', 'agendamentos de hoje', 'agendamentos de amanha', 'consultas hoje', 'consultas amanha', 'quem eu atendo', 'horarios', 'compromisso')) {
    const am = rnHas(pq, 'amanha'), dia = am ? rnIso(addD(TODAY, 1)) : TODAY_ISO; const a = rnAgenda(dia);
    if (a.fechado || !a.total) return `Não há agendamentos ${am ? 'amanhã' : 'hoje'} (${a.diaSemana}, ${a.data}).`;
    return `Sua agenda de ${am ? 'amanhã' : 'hoje'} (${a.diaSemana}, ${a.data}) tem **${a.total} atendimentos**:\n${rnL(a.agendamentos.map((x) => `${x.horario}: ${x.paciente} com ${x.profissional}`))}`;
  }
  if (rnHas(q, 'outra clinica', 'outras clinicas', 'concorrente', 'clinica do lado', 'outra unidade')) return `Eu só tenho acesso aos dados da **${RN_CLINICA.fantasia}**. Não vejo nem uso informações de outras clínicas. Posso comparar seus números com referências gerais de mercado, se quiser.`;
  if (rnHas(q, 'mercado', 'media do setor', 'benchmark', 'referencia', 'e bom', 'esta bom', 'normal', 'comparad', 'preco medio', 'quanto cobram', 'quanto cobrar')) {
    const f = rnFin(...rnRange(90)), i = rnInadimplencia();
    if (rnHas(q, 'preco', 'cobra', 'toxina', 'botox', 'preenchimento', 'bioestimulador', 'harmonizacao')) return `Referências de mercado no Brasil (variam por cidade e profissional):\n- Toxina botulínica (terço superior): R$ 900 a R$ 2.000\n- Preenchimento labial (1 ml): R$ 1.200 a R$ 2.500\n- Bioestimulador de colágeno (sessão): R$ 1.800 a R$ 3.500\n- Limpeza de pele: R$ 150 a R$ 350\n- Clareamento dental: R$ 600 a R$ 1.500\n\nNa sua clínica a toxina sai por R$ 1.260 a R$ 1.400, dentro da faixa de mercado.`;
    return `Comparando seus últimos 90 dias com referências de mercado para clínicas de estética:\n- Margem líquida: **${String(f.margemPct).replace('.', ',')}%** (mercado costuma ficar entre 15% e 30%)\n- Inadimplência: **${String(i.taxaPct).replace('.', ',')}%** (até 5% é considerado saudável)\n- Ticket médio: **${brl(f.ticketMedio)}** (clínicas focadas em injetáveis ficam entre R$ 500 e R$ 1.200)\n- Conversão de leads: **24,7%** (no WhatsApp, entre 10% e 30% é comum)\n\nSão referências gerais de mercado, não dados de outras clínicas.`;
  }
  if (rnHas(q, 'funil')) return `Funil de vendas: ${FUNNEL.map((f) => `${f.label} ${f.value}`).join(', ')}. De 186 leads, 46 finalizaram (24,7% de conversão). A maior perda está entre Novo e Aguardando atendente (58 leads).`;
  if (/\bleads?\b/.test(q) || rnHas(q, 'canal', 'trafego', 'organico', 'indicacao')) return `Leads por canal (186 no total):\n${rnL(CHANNELS.map((c) => `${c.label}: ${c.value} leads, conversão de ${c.conv}`))}\n\nIndicação converte melhor; tráfego pago traz mais volume.`;
  if (rnHas(q, 'inadimpl', 'atrasad', 'devendo', 'calote')) { const i = rnInadimplencia(); return `A taxa de inadimplência está em **${String(i.taxaPct).replace('.', ',')}%**, com **${brl(i.valorEmAtraso)}** em atraso${i.lancamentos.length ? ` em ${i.lancamentos.length} lançamentos. Os mais recentes:\n` + rnL(i.lancamentos.slice(0, 5).map((l) => `${l.paciente}: ${brl(l.valor)}, venceu em ${l.vencimento}`)) + '\n\nReferência de mercado: em clínicas de estética, até 5% costuma ser considerado saudável.' : '.'}`; }
  if (rnHas(q, 'fluxo de caixa', 'fluxo')) { const f = rnFin(ini, fim); return `Fluxo de caixa ${lbl}: entrou **${brl(f.recebido)}** recebido, as despesas somaram **${brl(f.despesas)}** e o resultado foi **${brl(f.lucroLiquido)}**. Ainda há ${brl(f.aReceber)} a receber.`; }
  if (rnHas(q, 'salute pay', 'saldo')) { const s = JSON.parse(rnSnapshot()).salutePay; return `No Salute Pay (Beta) o saldo atual é **${brl(s.saldoAtual)}**. Nos últimos 30 dias entraram ${brl(s.entradas30dias)} e saíram ${brl(s.saidas30dias)}.`; }
  if (rnHas(q, 'nota fiscal', 'notas fiscais', 'nfs', 'nf ')) { const n = JSON.parse(rnSnapshot()).notaFiscal; return `A emissão de nota fiscal está em Beta. Nos últimos 30 dias há **${n.prontasParaEmitir30dias} atendimentos prontos** para nota (${brl(n.valorPronto)}) e ${n.semCpf} sem CPF no cadastro. ISS configurado em ${n.aliquotaISS}; falta a inscrição municipal e o certificado digital.`; }
  if (rnHas(q, 'por profissional', 'profissional que mais', 'quem mais faturou', 'faturamento de cada')) { const f = rnFin(ini, fim); return `Faturamento por profissional ${lbl}:\n${rnL(f.porProfissional.map((p) => `${p.nome}: ${brl(p.valor)}`))}`; }
  if (rnHas(q, 'por procedimento', 'procedimento que mais', 'procedimentos mais')) { const f = rnFin(ini, fim); return `Faturamento por procedimento ${lbl}:\n${rnL(f.porProcedimento.slice(0, 8).map((p) => `${p.nome}: ${brl(p.valor)}`))}`; }
  if (rnHas(q, 'por atendimento', 'convenio', 'particular')) { const f = rnFin(ini, fim); return `Faturamento por tipo de atendimento ${lbl}:\n${rnL(f.porAtendimento.map((p) => `${p.nome}: ${brl(p.valor)}`))}`; }
  if (rnHas(q, 'fatur', 'receita', 'vendi', 'ganhei', 'vendas', 'resumo financeiro', 'financeiro')) { const f = rnFin(ini, fim); return `O faturamento ${lbl} foi de **${brl(f.faturamento)}** em ${f.atendimentos} atendimentos.\n- Recebido: ${brl(f.recebido)}\n- A receber: ${brl(f.aReceber)}\n- Despesas: ${brl(f.despesas)}\n- Lucro líquido: **${brl(f.lucroLiquido)}** (margem de ${String(f.margemPct).replace('.', ',')}%)\n- Ticket médio: ${brl(f.ticketMedio)}`; }
  if (rnHas(q, 'ticket')) { const f = rnFin(ini, fim); return `O ticket médio ${lbl} foi de **${brl(f.ticketMedio)}** em ${f.atendimentos} atendimentos.`; }
  if (rnHas(q, 'lucro', 'margem', 'sobrou')) { const f = rnFin(ini, fim); return `O lucro líquido ${lbl} foi de **${brl(f.lucroLiquido)}**, margem de ${String(f.margemPct).replace('.', ',')}%. Faturamento ${brl(f.faturamento)} menos despesas ${brl(f.despesas)}.`; }
  if (rnHas(q, 'despesa', 'gasto', 'gastei', 'custo')) { const f = rnFin(ini, fim); return `As despesas ${lbl} somaram **${brl(f.despesas)}**. As maiores:\n${rnL(f.despesasPorCategoria.slice(0, 5).map((d) => `${d.nome}: ${brl(d.valor)}`))}`; }
  if (rnHas(q, 'a pagar', 'contas a pagar', 'boleto', 'pagar ainda')) { const p = DESP_STORE.v.filter((d) => d.status === 'Pendente').sort((a, b) => a.venc.localeCompare(b.venc)); return p.length ? `Há **${p.length} contas a pagar**, somando **${brl(rnSum(p, (d) => d.total))}**:\n${rnL(p.slice(0, 5).map((d) => `${d.desc}: ${brl(d.total)}, vence em ${dBR(d.venc)}`))}` : 'Não há contas pendentes a pagar.'; }
  if (rnHas(q, 'a receber', 'receber', 'pendente')) { const f = rnFin(ini, fim); return `Dos atendimentos ${lbl}, faltam receber **${brl(f.aReceber)}**${f.emAtraso ? `, sendo ${brl(f.emAtraso)} já em atraso` : ''}.`; }
  if (rnHas(q, 'recebi', 'recebido', 'entrou no caixa')) { const f = rnFin(ini, fim); return `Você recebeu **${brl(f.recebido)}** ${lbl}, de um faturamento de ${brl(f.faturamento)}.`; }
  if (rnHas(q, 'estoque', 'produto', 'insumo', 'falta', 'acabando', 'minimo', 'vencid', 'validade', 'vence', 'consumo', 'entrou', 'saiu', 'usar primeiro', 'utilizar primeiro', 'repor')) {
    const e = rnEstoque();
    if (rnHas(q, 'vencid', 'fora da validade')) return e.vencidos.length ? `Produtos vencidos (perda de ${brl(e.perdaComVencidos)}):\n${rnL(e.vencidos.map((p) => `${p.produto}: ${p.quantidade} ${p.unidade.toLowerCase()}, venceu em ${p.validade}`))}\n\nDescarte e dê baixa no estoque.` : 'Nenhum produto vencido.';
    if (rnHas(q, 'vence', 'validade', 'usar primeiro', 'utilizar', 'usar antes')) return `Use primeiro os que vencem em até 60 dias:\n${rnL(e.venceEmBreve60dias.map((p) => `${p.produto}: vence em ${p.validade}`))}`;
    if (rnHas(q, 'falta', 'acabando', 'minimo', 'baixo', 'repor', 'comprar')) return `Estão abaixo do mínimo:\n${rnL(e.abaixoDoMinimo.map((p) => `${p.produto}: tem ${p.quantidade}, mínimo ${p.minimo}`))}\n\nRepor tudo custa cerca de **${brl(e.custoParaReporAbaixoDoMinimo)}**.`;
    if (rnHas(q, 'consumo', 'saiu', 'usou', 'usamos')) return `Nos últimos 30 dias o consumo foi de **${brl(e.consumoTotal30diasValor)}**. Os que mais saíram:\n${rnL(e.consumoUltimos30dias.slice(0, 5).map((p) => `${p.produto}: ${p.saiu} ${p.unidade.toLowerCase()} (${brl(p.valor)})`))}`;
    if (rnHas(q, 'entrou', 'compra', 'chegou')) return `Entradas nos últimos 30 dias (compras de insumos):\n${rnL(e.entradasCompras30dias.map((c) => `${c.data}: ${c.descricao}, ${brl(c.valor)}`))}`;
    return `O estoque tem **${e.totalProdutos} produtos** (${e.unidadesEmEstoque} unidades) valendo **${brl(e.valorEmEstoque)}**. ${e.abaixoDoMinimo.length} abaixo do mínimo, ${e.venceEmBreve60dias.length} vencendo em breve e ${e.vencidos.length} vencido(s).`;
  }
  if (rnHas(q, 'conversa', 'mensagens nao lidas', 'nao lida', 'whatsapp')) { const u = INBOX.filter((c) => c.u); return `Há **${u.length} conversas de pacientes** com mensagens não lidas: ${u.map((c) => c.n + ' (' + c.u + ')').join(', ')}. O WhatsApp está ${WA_STORE.v.status === 'on' ? 'conectado no ' + WA_STORE.v.numero : 'desconectado'}.`; }
  if (rnHas(q, 'economiz', ' ia ', 'renata fez', 'inteligencia')) return `A IA economizou **27 horas** no último mês: atendeu 412 conversas e fez 64 agendamentos sozinha (+11,5% vs mês anterior).`;
  if (rnHas(q, 'genero', 'homens', 'mulheres', 'sexo')) { const f = PAC.filter((p) => p.sexo === 'Feminino').length; return `No painel: homens 35% e mulheres 15%. Entre os ${PAC.length} pacientes cadastrados na lista, ${f} são mulheres e ${PAC.length - f} homens.`; }
  if (rnHas(q, 'atendimentos por dia', 'por dia', 'dia da semana', 'melhor dia')) return `Nos últimos 14 dias foram **131 atendimentos**, média de 9,4 por dia. O melhor dia foi 30/09 (14) e o mais fraco 27/09 (2, domingo).\n\nNa semana, quarta é o dia mais forte (47) e sábado o mais fraco (27).`;
  if (rnHas(q, 'atendimento')) return `Foram **48 atendimentos** nesta semana (+0,8% vs mês anterior) e 131 nos últimos 14 dias.`;
  if (rnHas(q, 'recentes')) return `Pacientes recentes: ${PATIENTS.slice(0, 4).map((p) => p.name + ' (' + p.proc + ')').join(', ')}.`;
  if (rnHas(q, 'paciente')) return `A clínica tem **102 pacientes** (48 novos e 54 antigos), +12,8% no último mês. Na lista de cadastro estão: ${PAC.map((p) => p.nome).join(', ')}.`;
  if (rnHas(q, 'agendamento')) return `São **254 agendamentos** no mês (56 novos e 43 retornos), +1,9% no último mês. Hoje há ${rnAgenda(TODAY_ISO).total} na agenda.`;
  if (rnHas(q, 'anamnese')) return `Modelos de anamnese cadastrados:\n${rnL((ANAM_STORE.v || ANAM0).map((m) => `${m.nome} (${m.uso}, ${m.qs.length} perguntas)`))}`;
  if (rnHas(q, 'equipe', 'acesso', 'permiss')) return `Equipe e acessos:\n${rnL(TEAM_STORE.v.map((u) => `${u.nome}, ${u.funcao}: ${u.dono ? 'acesso total' : moduleTree().filter((m) => u.acc.includes(m.id)).map((m) => m.label).join(', ')}`))}`;
  if (rnHas(q, 'profission', 'dentista', 'biomedic', 'esteticista')) return `Profissionais:\n${rnL(PROF_STORE.v.map((p) => `${p.nome}, ${p.esp} (${p.reg})`))}`;
  if (rnHas(q, 'canais', 'instagram', 'conectad') || /\bapi\b/.test(q)) return `WhatsApp ${WA_STORE.v.status === 'on' ? 'conectado no ' + WA_STORE.v.numero + ' pela ' + (WA_STORE.v.modo === 'oficial' ? 'API oficial' : 'API não oficial') : 'desconectado'}. Instagram está em Beta, com conexão em breve.`;
  if (rnHas(q, 'saluteflix', 'curso')) return `No Saluteflix:\n${rnL(FLIX0.map((c) => `${c.t} (${c.tipo}${c.prog ? ', ' + c.prog + '% assistido' : ''})`))}`;
  if (rnHas(q, 'cast', 'podcast', 'episodio')) return `Salute Cast:\n${rnL(CAST_STORE.v.map((e) => `Ep. ${e.ep}: ${e.t} (${e.dur})`))}`;
  if (rnHas(q, 'parceri', 'parceiro', 'cupom')) return `Parceiros:\n${rnL(PARC0.map((p) => `${p.nome}: ${p.ben}${p.cupom ? ', cupom ' + p.cupom : ''}`))}`;
  if (rnHas(q, 'certifica', 'selo')) return `Certificações do sistema: ${SELOS_STORE.v.map((c) => c.nome).join(', ')}.`;
  if (rnHas(q, 'plano', 'conta', 'assinatura', 'cobranca')) return `Você está no plano **IA Pro** (R$ 997/mês), com 6.240 de 10.000 mensagens de IA usadas neste mês. Próxima cobrança em 10/10/2026.`;
  if (rnHas(q, 'clinica', 'endereco', 'cnpj', 'horario de funcionamento', 'estacionamento')) return `${RN_CLINICA.fantasia} (${RN_CLINICA.razao}), CNPJ ${RN_CLINICA.cnpj}. Endereço: ${RN_CLINICA.endereco}. Horário: ${RN_CLINICA.horarios}. Aceita ${RN_CLINICA.pagamentos}.`;
  if (rnHas(q, 'categoria')) return `Categorias de receita: Estética, Odontologia, Consulta e Venda de produto. Categorias de despesa: ${DESP_CATS.join(', ')}.`;
  return null;
}

/* ---------- conversa: contexto, conversa social e comandos ---------- */
const RN_CTX = { intent: null, period: null };
const rnResetCtx = () => { RN_CTX.intent = null; RN_CTX.period = null; };
const rnHasPeriod = (t) => /\b(hoje|ontem|amanha|\d+\s*dias|semana|mes|meses|janeiro|fevereiro|marco|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro|trimestre|semestre|ano|2026)\b/.test(t);
const RN_TELAS = [['painel', /painel|inicio|dashboard/, 'o painel'], ['pacientes', /pacientes?/, 'a tela de pacientes'], ['agenda', /agenda/, 'a agenda'], ['mensagens', /mensage|conversas|whatsapp/, 'as mensagens'], ['gestao', /gestao|estoque|financeiro/, 'a gestão'], ['perfil', /configurac|ajustes|minha conta/, 'as configurações']];
function rnNavIntent(q) {
  if (!/\b(abr[ae]|abrir|me leva|leva pra|leve|vai pra|va pra|va para|ir para|ir pra|entra na|entra no|entrar na|entrar no|mostra a tela|mostre a tela)\b/.test(q)) return null;
  const t = RN_TELAS.find(([, re]) => re.test(q)); if (!t) return null;
  const ok = window.RN_NAV ? window.RN_NAV(t[0]) : false;
  return ok ? `Pronto, abri ${t[2]} para você.` : `Você não tem acesso a ${t[2]} com o seu usuário.`;
}
function rnSmall(q) {
  const n = q.split(' ').length;
  if (/\b(quem e voce|qual (e )?o seu nome|seu nome|o que voce faz|o que voce sabe|como voce funciona|voce e quem)\b/.test(q)) return `Eu sou a Renata, a assistente de IA da ${RN_CLINICA.fantasia}. Vejo a agenda, os pacientes, as conversas, o estoque, o financeiro e as configurações da clínica, e respondo na hora. Também abro telas do sistema quando você pedir.`;
  if (n <= 5 && /^(obrigad\w*|brigad\w*|valeu|vlw|agradec\w*)\b/.test(q)) return 'Por nada! Quer ver mais alguma coisa da clínica?';
  if (n <= 4 && /^(show|perfeito|otimo|massa|beleza|top|legal|maravilha|entendi|certo|ok|blz|combinado)\b/.test(q)) return 'Combinado! Se quiser ver mais alguma coisa, é só falar.';
  if (n <= 5 && /^(tchau|ate mais|ate logo|ate amanha|falou|encerrar|so isso|era isso)\b/.test(q)) return 'Até mais, Camila! Quando precisar, é só me chamar.';
  if (n <= 6 && /\b(tudo bem|tudo bom|como voce esta|como vai)\b/.test(q)) return 'Tudo ótimo por aqui! E com você? Me fala o que quer ver da clínica.';
  if (n <= 5 && /^(oi|ola|opa|e ai|eai|hey|bom dia|boa tarde|boa noite|alo|renata)\b/.test(q)) { const h = new Date().getHours(); return `${h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite'}, Camila! Pode me perguntar o que quiser da clínica: agenda, pacientes, faturamento, estoque...`; }
  return null;
}
function renataLocal(question) {
  const q = rnNorm(question).replace(/[?!.,;:]/g, ' ').replace(/\s+/g, ' ').trim();
  const nav = rnNavIntent(q); if (nav) return nav;
  const small = rnSmall(q); if (small) return small;
  const follow = !!RN_CTX.intent && (/^e\b/.test(q) || (rnHasPeriod(q) && q.split(' ').length <= 5));
  const inherit = !!RN_CTX.intent && !rnHasPeriod(q) && q.split(' ').length <= 5;
  const pq = inherit ? (RN_CTX.period || q) : q;
  let a = rnCore(q, pq);
  if (a) { RN_CTX.intent = q; RN_CTX.period = pq; return a; }
  if (follow) { a = rnCore(RN_CTX.intent, pq); if (a) { RN_CTX.period = pq; return a; } }
  return 'Ainda não consegui responder essa por aqui. Posso falar sobre agenda, pacientes, atendimentos, funil, leads, estoque, faturamento, despesas, lucro, inadimplência, nota fiscal, Salute Pay, equipe, profissionais, canais, Saluteflix, parcerias, certificações e sua conta. Tente perguntar de outro jeito. Perguntas gerais fora da clínica eu respondo quando a IA estiver conectada.';
}

const RENATA_TOOLS = [
  { name: 'financeiro_periodo', description: 'Retorna faturamento, recebido, a receber, em atraso, despesas, lucro líquido, margem, ticket médio e quebras por profissional, procedimento, tipo de atendimento, forma de pagamento e categoria de despesa para um período qualquer. Use quando o período pedido não estiver no resumo.', inputSchema: { type: 'object', properties: { inicio: { type: 'string', description: 'Data inicial AAAA-MM-DD' }, fim: { type: 'string', description: 'Data final AAAA-MM-DD' } }, required: ['inicio', 'fim'] }, execute: (i) => rnFin(String(i.inicio), String(i.fim)) },
  { name: 'agenda_do_dia', description: 'Retorna os agendamentos de um dia (horário, paciente, profissional). Use para dias diferentes de hoje e amanhã.', inputSchema: { type: 'object', properties: { data: { type: 'string', description: 'AAAA-MM-DD' } }, required: ['data'] }, execute: (i) => rnAgenda(String(i.data)) },
  { name: 'dados_paciente', description: 'Retorna cadastro, prontuário (anamneses, procedimentos, mapeamentos, documentos), histórico e financeiro de um paciente pelo nome.', inputSchema: { type: 'object', properties: { nome: { type: 'string' } }, required: ['nome'] }, execute: (i) => rnPaciente(String(i.nome)) },
  { name: 'lancamentos', description: 'Lista até 40 lançamentos de receitas ou despesas de um período, com status. Use para perguntas sobre lançamentos específicos.', inputSchema: { type: 'object', properties: { tipo: { type: 'string', enum: ['receitas', 'despesas'] }, inicio: { type: 'string' }, fim: { type: 'string' } }, required: ['tipo', 'inicio', 'fim'] }, execute: (i) => (i.tipo === 'despesas' ? DESP_STORE.v.filter((d) => d.data >= i.inicio && d.data <= i.fim).map((d) => ({ data: dBR(d.data), descricao: d.desc, categoria: d.cat, valor: d.total, status: d.status })) : REC_STORE.v.filter((r) => r.data >= i.inicio && r.data <= i.fim).map((r) => ({ data: dBR(r.data), paciente: r.pac, procedimento: r.proc, profissional: r.pro, valor: liq(r), forma: r.forma, status: r.status, vencimento: dBR(r.venc) }))).slice(0, 40) },
];
RENATA_TOOLS.push({ name: 'abrir_tela', description: 'Abre uma tela do sistema Salute IA para a pessoa. Use quando ela pedir para abrir, ir para ou mostrar uma tela.', inputSchema: { type: 'object', properties: { tela: { type: 'string', enum: ['painel', 'pacientes', 'agenda', 'mensagens', 'gestao', 'perfil'], description: 'perfil = Configurações; gestao = Estoque e Financeiro' } }, required: ['tela'] }, execute: (i) => ({ aberta: window.RN_NAV ? window.RN_NAV(String(i.tela)) : false }) });
const RENATA_RULES = (voice) => `Você é a Renata, a assistente de IA da ${RN_CLINICA.fantasia}, dentro do sistema Salute IA. Está conversando com a Dra. Camila Rocha, administradora da clínica.

Regras:
1. Responda SOMENTE com base nos dados desta clínica, que estão no JSON abaixo ou nas ferramentas. Nunca use, cite ou invente dados de outras clínicas. Se a informação não existir nos dados, diga isso com clareza e sugira onde a pessoa pode ver ou cadastrar no sistema.
2. Nunca invente números. Calcule a partir dos dados. Para períodos, dias ou pacientes que não estão no resumo, use as ferramentas.
3. Você também pode trazer conhecimento de mercado (benchmarks de clínicas de estética e odontologia no Brasil, boas práticas de gestão, marketing e atendimento). Quando fizer isso, deixe claro que é referência de mercado e use faixas realistas e críveis, nunca números exagerados.
4. Hoje é sexta-feira, 02/10/2026. Valores em reais no formato brasileiro (R$ 1.234,56). Datas no formato dd/mm/aaaa.
5. Português do Brasil, tom acolhedor, direto e profissional, como uma colega de trabalho. Comece pela resposta. Não use travessões. Não narre o uso das ferramentas.
6. Você é um agente do próprio sistema: quando pedirem para abrir uma tela, use a ferramenta abrir_tela e confirme em uma frase.
7. Se a pessoa só cumprimentar, agradecer ou se despedir, responda de forma breve e calorosa. Para perguntas que dependem da conversa anterior (por exemplo "e em agosto?"), use o contexto das mensagens anteriores.
8. Lançamentos: quando a pessoa pedir para lançar, registrar, receber, pagar, dar entrada ou dar baixa, use as ferramentas de proposta (financeiro ou estoque). Nunca diga que lançou: o sistema só grava depois que a pessoa disser sim. Faça uma pergunta curta de confirmação, por exemplo "Lançar R$ 3.000 como recebido hoje e R$ 1.000 a receber em 10/10?". Se faltar algo essencial (valor, paciente ou produto), pergunte antes de propor.
${voice ? '9. MODO VOZ: é uma conversa falada, como uma ligação. Responda em até 3 frases curtas, sem listas, sem markdown e sem emojis, com números e datas escritos de forma natural para serem falados. Se houver muitos itens, diga os 3 principais e pergunte se a pessoa quer ouvir o resto.' : '9. Respostas curtas. Use **negrito** para o número principal e listas curtas com "- " quando ajudar. Sem tabelas.'}

DADOS DA CLÍNICA (JSON):
`;
Object.assign(window, { rnResetCtx, rnSnapshot, renataLocal, RENATA_TOOLS, RENATA_RULES, rnFin, rnAgenda, rnPaciente, rnEstoque, RN_CLINICA });
