/* =====================================================================
   RENATA IA · lançamentos pela conversa (financeiro e estoque)
   A Renata só PROPÕE. Nada é gravado sem a confirmação da pessoa.
   ===================================================================== */
const RN_PENDING = makeStore(null);
const RN_NUMW = { um: 1, uma: 1, dois: 2, duas: 2, tres: 3, quatro: 4, cinco: 5, seis: 6, sete: 7, oito: 8, nove: 9, dez: 10, onze: 11, doze: 12, treze: 13, quatorze: 14, catorze: 14, quinze: 15, dezesseis: 16, dezessete: 17, dezoito: 18, dezenove: 19, vinte: 20, trinta: 30, quarenta: 40, cinquenta: 50, sessenta: 60, setenta: 70, oitenta: 80, noventa: 90, cem: 100, cento: 100, duzentos: 200, trezentos: 300, quatrocentos: 400, quinhentos: 500, seiscentos: 600, setecentos: 700, oitocentos: 800, novecentos: 900 };
const rnWords2Num = (q) => {
  let t = String(q).replace(/\b[a-z]+\b/g, (w) => (RN_NUMW[w] !== undefined ? String(RN_NUMW[w]) : w));
  for (let k = 0; k < 2; k++) t = t.replace(/\b(\d+)\s+e\s+(\d+)\b/g, (m, a, b) => (+a >= 20 && +a % 10 === 0 && +b < +a && b.length < a.length ? String(+a + +b) : m));
  return t;
};
const RN_UNIT_RE = /^\s*(frascos?|seringas?|unidades?|un\b|kits?|caixas?|tubetes?|ampolas?|pacotes?|potes?|pecas?|vezes|x\b|parcelas?|%|dias?|horas?|meses|anos?)/;
function rnMoneys(q0) {
  const q = rnWords2Num(q0); const out = [];
  const re = /(r\$\s*)?(\d+(?:\.\d{3})+(?:,\d{1,2})?|\d+(?:,\d{1,2})?)?(\s*mil\b(?:\s+e\s+(\d+))?|\s*k\b)?(\s*(?:reais|real|conto|contos)\b)?/g;
  let m;
  while ((m = re.exec(q))) {
    if (!m[0].trim()) { re.lastIndex++; continue; }
    const [all, rs, num, mil, extra, reais] = m; const i = m.index; const after = q.slice(i + all.length);
    if (!num && !mil) continue;
    if (num && /dia\s*$/.test(q.slice(Math.max(0, i - 5), i))) continue;
    if (num && /^\s*\//.test(after)) continue;
    if (!mil && !rs && !reais && RN_UNIT_RE.test(after)) continue;
    let v = num ? parseFloat(num.replace(/\./g, '').replace(',', '.')) : 1;
    if (mil) v = v * 1000 + (extra ? +extra : 0);
    if (!rs && !mil && !reais && v < 10) continue;
    out.push({ v: Math.round(v * 100) / 100, i });
  }
  return out;
}
function rnDue(q) {
  const t = new Date(TODAY);
  let m = q.match(/\b(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?\b/);
  if (m) { const y = m[3] ? (+m[3] < 100 ? 2000 + +m[3] : +m[3]) : t.getFullYear(); return rnIso(new Date(y, +m[2] - 1, +m[1])); }
  m = q.match(/\bdia\s+(\d{1,2})\b/);
  if (m) { const d = +m[1]; let x = new Date(t.getFullYear(), t.getMonth(), d); if (d < t.getDate()) x = new Date(t.getFullYear(), t.getMonth() + 1, d); return rnIso(x); }
  if (/\bamanha\b/.test(q)) return rnIso(addD(TODAY, 1));
  if (/semana que vem|proxima semana/.test(q)) return rnIso(addD(TODAY, 7));
  if (/mes que vem|proximo mes/.test(q)) return rnIso(new Date(t.getFullYear(), t.getMonth() + 1, t.getDate()));
  return null;
}
const RN_PROC_SIN = [['toxina|botox|botulinica', 'Toxina botulínica'], ['preenchimento', 'Preenchimento labial'], ['bioestimulador|sculptra|radiesse', 'Bioestimulador'], ['fios|pdo', 'Fios de PDO'], ['harmonizacao', 'Harmonização facial'], ['limpeza de pele', 'Limpeza de pele'], ['peeling', 'Peeling químico'], ['clareamento', 'Clareamento dental'], ['limpeza dental|profilaxia', 'Limpeza dental'], ['restauracao', 'Restauração'], ['canal', 'Tratamento de canal'], ['avaliacao|consulta', 'Avaliação']];
const rnProcOf = (t) => { const q = rnNorm(t); const f = RN_PROC_SIN.find(([re]) => new RegExp(re).test(q)); return f ? f[1] : null; };
const rnFormaOf = (t) => { const q = rnNorm(t); return /credito/.test(q) ? 'Cartão de crédito' : /debito/.test(q) ? 'Cartão de débito' : /dinheiro|especie/.test(q) ? 'Dinheiro' : /boleto/.test(q) ? 'Boleto' : /convenio/.test(q) ? 'Convênio' : /cartao/.test(q) ? 'Cartão de crédito' : /pix/.test(q) ? 'Pix' : null; };
const RN_DESP_SIN = [['energia|luz|eletrica|elektro|cpfl', 'Energia e água', 'Energia elétrica'], ['agua|saae|esgoto', 'Energia e água', 'Água e esgoto'], ['aluguel|condominio', 'Aluguel', 'Aluguel da clínica'], ['salario|folha|funcionari|comissao', 'Folha de pagamento', 'Salários e comissões'], ['marketing|anuncio|trafego|meta ads|google ads|agencia|social media', 'Marketing', 'Marketing'], ['imposto|simples|das\\b|iss\\b|darf', 'Impostos', 'Impostos'], ['laboratorio|protese', 'Laboratório', 'Laboratório'], ['internet|software|sistema|telefone|contador|contabil', 'Serviços e software', 'Serviços e software'], ['manutencao|conserto|reparo|limpeza da clinica', 'Manutenção', 'Manutenção'], ['insumo|fornecedor|material|descartave|luva|seringa|toxina|acido', 'Insumos e fornecedores', 'Insumos']];
const rnDespOf = (t) => { const q = rnNorm(t); const f = RN_DESP_SIN.find(([re]) => new RegExp(re).test(q)); return f ? { cat: f[1], desc: f[2] } : null; };
function rnProdOf(t) {
  const q = rnNorm(t).replace(/\bbotox\b/g, 'toxina botulinica').replace(/\bhialuronico\b/g, 'acido hialuronico');
  let best = null, sc = 0;
  PROD_STORE.v.forEach((p) => { const ws = rnNorm(p.nome).split(/[^a-z0-9]+/).filter((w) => w.length > 3); const s = ws.filter((w) => q.includes(w)).length; if (s > sc) { sc = s; best = p; } });
  return best;
}
const RN_STOP = new Set(['falta', 'faltam', 'faltou', 'ainda', 'que', 'ficou', 'pro', 'pra', 'para', 'dia', 'de', 'do', 'da', 'dos', 'das', 'e', 'no', 'na', 'mas', 'com', 'em', 'via', 'por', 'pix', 'cartao', 'dinheiro', 'boleto', 'hoje', 'ontem', 'amanha', 'pagou', 'pago', 'paga', 'restante', 'resto', 'saldo', 'referente', 'ao', 'a', 'o', 'reais', 'mil', 'vai', 'pagar', 'vence']);
function rnPacOf(t) {
  const nt = rnNorm(t);
  const full = PAC_NOMES.find((n) => { const p = rnNorm(n).split(' '); return nt.includes(p[0] + ' ' + p[1]) || nt.includes(rnNorm(n)); });
  if (full) return full;
  const cap = (ws) => ws.slice(0, 3).map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  const m = t.match(/(?:cliente|paciente)\s+([A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+){0,4})/i);
  if (m) { const keep = []; for (const w of m[1].split(/\s+/)) { if (RN_STOP.has(rnNorm(w))) break; keep.push(w); } if (keep.length) return cap(keep); }
  const c = t.match(/\b(?:da|do|de)\s+([A-ZÀ-Ý][a-zà-ÿ]+(?:\s+[A-ZÀ-Ý][a-zà-ÿ]+){1,2})/);
  if (c) return cap(c[1].split(/\s+/));
  return null;
}

/* ---------- monta a proposta (usada pela conversa e pela IA) ---------- */
let __rnActId = 1;
function rnBuildFin(items) {
  const out = [];
  for (const x of items || []) {
    const valor = Math.round(Number(x.valor) * 100) / 100;
    if (!(valor > 0)) return { erro: 'Qual é o valor do lançamento?', need: 'valor' };
    const tipo = x.tipo === 'despesa' ? 'despesa' : 'receita';
    const pago = x.status !== 'pendente';
    const data = /^\d{4}-\d{2}-\d{2}$/.test(String(x.data || '')) ? x.data : TODAY_ISO;
    if (tipo === 'receita') {
      const pac = String(x.paciente || '').trim(); if (!pac) return { erro: 'De qual paciente é esse pagamento?', need: 'paciente' };
      const proc = rnProcOf(x.procedimento || '') || (x.procedimento ? String(x.procedimento) : 'Atendimento');
      const fp = FIN_PROCS.find((f) => f.n === proc);
      out.push({ tipo, valor, pago, data: pago ? TODAY_ISO : data, venc: pago ? (x.data && x.data <= TODAY_ISO ? x.data : TODAY_ISO) : data, paciente: pac, procedimento: proc, cat: fp ? fp.cat : 'Consulta', profissional: FIN_PROS.find((p) => rnNorm(p).includes(rnNorm(x.profissional || '#'))) || 'Dra. Camila Rocha', forma: rnFormaOf(x.forma || '') || (pago ? 'Pix' : 'Boleto') });
    } else {
      const d0 = rnDespOf((x.categoria || '') + ' ' + (x.descricao || ''));
      const cat = DESP_CATS.find((c) => rnNorm(c) === rnNorm(x.categoria || '')) || (d0 ? d0.cat : 'Manutenção');
      out.push({ tipo, valor, pago, data, venc: data, descricao: String(x.descricao || (d0 ? d0.desc : 'Despesa')).trim(), cat, fornecedor: String(x.fornecedor || 'Não informado'), forma: rnFormaOf(x.forma || '') || (pago ? 'Pix' : 'Boleto') });
    }
  }
  if (!out.length) return { erro: 'O que você quer lançar?' };
  return { action: { id: 'a' + (__rnActId++), kind: 'fin', items: out } };
}
function rnBuildEst(items) {
  const out = [];
  for (const x of items || []) {
    const p = typeof x.produto === 'object' ? x.produto : (PROD_STORE.v.find((q) => rnNorm(q.nome) === rnNorm(x.produto || '')) || rnProdOf(x.produto || ''));
    if (!p) return { erro: 'Não encontrei esse produto no estoque. Os produtos cadastrados são: ' + PROD_STORE.v.map((q) => q.nome).join(', ') + '.' };
    const n = Math.round(Number(x.quantidade));
    if (!(n > 0)) return { erro: 'Qual é a quantidade?', need: 'quantidade' };
    const tipo = x.tipo === 'saida' ? 'saida' : 'entrada';
    if (tipo === 'saida' && n > p.qtd) return { erro: `Só tem ${rnUnPl(p.qtd, p.un)} de ${p.nome} no estoque. Quer dar baixa de quanto?`, need: 'quantidade' };
    out.push({ tipo, prodId: p.id, produto: p.nome, un: p.un, quantidade: n, de: p.qtd, para: tipo === 'saida' ? p.qtd - n : p.qtd + n, valorTotal: x.valorTotal > 0 ? Math.round(x.valorTotal * 100) / 100 : 0 });
  }
  if (!out.length) return { erro: 'O que você quer movimentar no estoque?' };
  return { action: { id: 'a' + (__rnActId++), kind: 'est', items: out } };
}
const rnUnPl = (n, un) => n + ' ' + un.toLowerCase() + (n > 1 ? (/[aeiou]$/i.test(un) ? 's' : 'es') : '');
const rnHojeOu = (iso) => iso === TODAY_ISO ? 'hoje' : 'em ' + dBR(iso);
function rnResumo(a) {
  if (a.kind === 'est') {
    const parts = a.items.map((x) => `${x.tipo === 'saida' ? 'dar baixa de' : 'dar entrada de'} **${rnUnPl(x.quantidade, x.un)}** de **${x.produto}** (de ${x.de} para ${x.para})${x.valorTotal ? `, com compra de ${brl(x.valorTotal)} paga hoje` : ''}`);
    const t = parts.join(' e '); return t.charAt(0).toUpperCase() + t.slice(1) + '?';
  }
  const rec = a.items.filter((x) => x.tipo === 'receita'), des = a.items.filter((x) => x.tipo === 'despesa');
  const ps = [];
  if (rec.length) { const pac = rec[0].paciente; ps.push(rec.map((x) => `**${brl(x.valor)}** ${x.pago ? 'como recebido ' + rnHojeOu(x.data) : 'a receber em **' + dBR(x.venc) + '**'}`).join(' e ') + ` de **${pac}**${rec[0].procedimento !== 'Atendimento' ? ' (' + rec[0].procedimento + ')' : ''}`); }
  des.forEach((x) => ps.push(`a despesa **${x.descricao}** de **${brl(x.valor)}** ${x.pago ? 'como paga ' + rnHojeOu(x.data) : 'a pagar em **' + dBR(x.venc) + '**'}`));
  return 'Lançar ' + ps.join(' e ') + '?';
}
function rnApply(a) {
  if (a.kind === 'est') {
    PROD_STORE.v = PROD_STORE.v.map((p) => { const x = a.items.find((i) => i.prodId === p.id); if (!x) return p; return { ...p, qtd: x.tipo === 'saida' ? Math.max(0, p.qtd - x.quantidade) : p.qtd + x.quantidade, cons: x.tipo === 'saida' ? (p.cons || 0) + x.quantidade : p.cons }; });
    PROD_STORE.subs.forEach((f) => f());
    const compras = a.items.filter((x) => x.tipo === 'entrada' && x.valorTotal);
    if (compras.length) { let id = DESP_STORE.v.reduce((m, d) => Math.max(m, d.id || 0), 0); DESP_STORE.v = [...compras.map((x) => ({ id: ++id, desc: `${x.produto} (${rnUnPl(x.quantidade, x.un)})`, cat: 'Insumos e fornecedores', forn: 'Não informado', total: x.valorTotal, forma: 'Pix', data: TODAY_ISO, venc: TODAY_ISO, parc: 1, status: 'Pago', ia: true })), ...DESP_STORE.v]; DESP_STORE.subs.forEach((f) => f()); }
    return 'Pronto! Estoque atualizado: ' + a.items.map((x) => `**${x.produto}** agora tem ${rnUnPl(x.para, x.un)}`).join('; ') + '.';
  }
  const rec = a.items.filter((x) => x.tipo === 'receita'), des = a.items.filter((x) => x.tipo === 'despesa');
  if (rec.length) {
    let id = REC_STORE.v.reduce((m, r) => Math.max(m, r.id || 0), 0);
    REC_STORE.v = [...rec.map((x) => ({ id: ++id, data: TODAY_ISO, pac: x.paciente, proc: x.procedimento, pro: x.profissional, cat: x.cat, atend: x.forma === 'Convênio' ? 'Convênio' : 'Particular', total: x.valor, desc: 0, forma: x.forma, parc: 1, venc: x.venc, status: x.pago ? 'Recebido' : 'Pendente', ia: true })), ...REC_STORE.v];
    REC_STORE.subs.forEach((f) => f());
  }
  if (des.length) {
    let id = DESP_STORE.v.reduce((m, d) => Math.max(m, d.id || 0), 0);
    DESP_STORE.v = [...des.map((x) => ({ id: ++id, desc: x.descricao, cat: x.cat, forn: x.fornecedor, total: x.valor, forma: x.forma, data: x.data, venc: x.venc, parc: 1, status: x.pago ? 'Pago' : 'Pendente', ia: true })), ...DESP_STORE.v];
    DESP_STORE.subs.forEach((f) => f());
  }
  const ps = a.items.map((x) => x.tipo === 'receita' ? `${brl(x.valor)} ${x.pago ? 'recebido' : 'a receber em ' + dBR(x.venc)}` : `despesa ${x.descricao} de ${brl(x.valor)} ${x.pago ? 'paga' : 'a pagar em ' + dBR(x.venc)}`);
  return `Pronto! Lancei no financeiro: ${ps.join(' e ')}${rec.length ? ', de ' + rec[0].paciente : ''}.`;
}

/* ---------- entende o pedido sem IA (modo demonstração) ---------- */
function rnParseAction(question) {
  const raw = String(question || ''); const q = rnNorm(raw);
  const isEst = /\b(estoque|dar entrada|dei entrada|da entrada|entrada de|chegou|chegaram|comprei|compramos|baixa|usei|usamos|consumi|consumimos|retirei|tirar|tira|saiu|sairam|descartei|descarta|perdemos|perdi)\b/.test(q) && rnProdOf(raw);
  const isDesp = /\b(despesa|paguei|pagamos|conta de|gasto|gastei|boleto de|fatura de)\b/.test(q);
  const isRec = /\b(lanc\w*|registr\w*|recebi|recebemos|pagou|pagamento|entrada de dinheiro|deu de entrada|sinal)\b/.test(q);
  if (isEst) {
    const qq = rnWords2Num(q);
    const um = qq.match(/(\d+)\s*(frascos?|seringas?|unidades?|un\b|kits?|caixas?|tubetes?|ampolas?|pacotes?|potes?|pecas?)/) || qq.match(/\b(\d{1,3})\b(?!\s*(mil|reais|\/|%))/);
    const saida = /\b(baixa|usei|usamos|consumi|consumimos|retirei|tirar|tira|saiu|sairam|descartei|descarta|perdemos|perdi)\b/.test(q);
    const money = rnMoneys(q).filter((x) => x.v >= 10);
    const r = rnBuildEst([{ tipo: saida ? 'saida' : 'entrada', produto: rnProdOf(raw), quantidade: um ? +um[1] : 0, valorTotal: !saida && money.length ? money[money.length - 1].v : 0 }]);
    return r;
  }
  if (!isDesp && !isRec) return null;
  const qn = rnWords2Num(q);
  const ms = rnMoneys(qn); if (!ms.length) return { erro: 'Qual é o valor?', need: 'valor' };
  const due = rnDue(qn);
  if (isDesp && !/cliente|paciente/.test(q)) {
    const d0 = rnDespOf(q) || { cat: 'Manutenção', desc: 'Despesa' };
    const pend = /\b(vence|vencimento|a pagar|pagar dia|pagar no dia|pendente|boleto)\b/.test(q) && !/\b(paguei|pagamos|ja paguei|pago)\b/.test(q);
    return rnBuildFin([{ tipo: 'despesa', valor: ms[0].v, status: pend || (due && due > TODAY_ISO) ? 'pendente' : 'pago', data: due || TODAY_ISO, categoria: d0.cat, descricao: d0.desc, forma: raw }]);
  }
  const pac = rnPacOf(raw);
  const restIdx = qn.search(/\b(falta|faltam|faltou|restante|resto|saldo|ficou|vai pagar|a receber|depois|parcela)\b/);
  const items = [];
  const proc = rnProcOf(raw); const forma = rnFormaOf(raw);
  if (restIdx >= 0) {
    const before = ms.filter((x) => x.i < restIdx), after = ms.filter((x) => x.i > restIdx);
    if (before.length) items.push({ tipo: 'receita', valor: before[0].v, status: 'pago', paciente: pac, procedimento: proc, forma });
    if (after.length) items.push({ tipo: 'receita', valor: after[0].v, status: 'pendente', data: due || rnIso(addD(TODAY, 30)), paciente: pac, procedimento: proc });
    if (!before.length && !after.length) items.push({ tipo: 'receita', valor: ms[0].v, status: 'pago', paciente: pac, procedimento: proc, forma });
  } else {
    const pend = (due && due > TODAY_ISO) || /\b(a receber|vai pagar|pendente|fiado)\b/.test(q);
    items.push({ tipo: 'receita', valor: ms[0].v, status: pend ? 'pendente' : 'pago', data: due || TODAY_ISO, paciente: pac, procedimento: proc, forma });
  }
  return rnBuildFin(items);
}
const rnIsYes = (q) => { const n = rnNorm(q).replace(/[^a-z ]/g, ' ').trim(); return n.split(/\s+/).length <= 7 && !/\bnao\b/.test(n) && /^(sim|pode|pode lancar|pode sim|lanca|lance|lancar|confirmo|confirma|confirmar|confirmado|isso|isso mesmo|correto|certo|ok|okay|manda|beleza|perfeito|exato|claro|uhum|aham|bora|fechado|tudo certo|ta certo|esta certo|positivo)\b/.test(n); };
const rnIsNo = (q) => { const n = rnNorm(q).replace(/[^a-z ]/g, ' ').trim(); return n.split(/\s+/).length <= 4 && /^(nao|cancela|cancelar|cancele|errado|esquece|deixa|negativo|nao lanca|para)\b/.test(n); };

RENATA_TOOLS.push(
  { name: 'propor_lancamento_financeiro', description: 'Prepara, SEM gravar, um ou mais lançamentos financeiros para a pessoa confirmar: receitas de pacientes (pagamentos recebidos ou a receber) e despesas da clínica (pagas ou a pagar). Ex.: "recebi 3 mil da Joana Xavier e falta mil para o dia 10" vira duas receitas: 3000 pago hoje e 1000 pendente com data do dia 10. Depois de chamar, faça UMA pergunta curta de confirmação resumindo valores, status e datas. O sistema só grava quando a pessoa disser sim.', inputSchema: { type: 'object', properties: { lancamentos: { type: 'array', items: { type: 'object', properties: { tipo: { type: 'string', enum: ['receita', 'despesa'] }, valor: { type: 'number', description: 'Valor em reais' }, status: { type: 'string', enum: ['pago', 'pendente'], description: 'pago = recebido ou pago hoje; pendente = a receber ou a pagar' }, data: { type: 'string', description: 'AAAA-MM-DD. Para pendente, a data de vencimento. Para pago, hoje.' }, paciente: { type: 'string', description: 'Obrigatório em receita' }, procedimento: { type: 'string' }, profissional: { type: 'string' }, forma: { type: 'string', description: 'Pix, Cartão de crédito, Cartão de débito, Dinheiro, Boleto ou Convênio' }, descricao: { type: 'string', description: 'Obrigatório em despesa' }, categoria: { type: 'string', enum: DESP_CATS }, fornecedor: { type: 'string' } }, required: ['tipo', 'valor', 'status'] } } }, required: ['lancamentos'] },
    execute: (i) => { const r = rnBuildFin(i.lancamentos); if (r.erro) return { erro: r.erro }; RN_PENDING.v = r.action; RN_PENDING.subs.forEach((f) => f()); return { status: 'aguardando confirmação da pessoa', resumo: rnResumo(r.action).replace(/\*\*/g, '') }; } },
  { name: 'propor_movimentacao_estoque', description: 'Prepara, SEM gravar, entradas ou baixas de produtos no estoque para a pessoa confirmar. Use o nome do produto como está no estoque. Depois de chamar, faça UMA pergunta curta de confirmação. O sistema só grava quando a pessoa disser sim.', inputSchema: { type: 'object', properties: { movimentos: { type: 'array', items: { type: 'object', properties: { tipo: { type: 'string', enum: ['entrada', 'saida'] }, produto: { type: 'string' }, quantidade: { type: 'number' }, valorTotal: { type: 'number', description: 'Valor total pago na compra, se informado (só entrada)' } }, required: ['tipo', 'produto', 'quantidade'] } } }, required: ['movimentos'] },
    execute: (i) => { const r = rnBuildEst(i.movimentos); if (r.erro) return { erro: r.erro }; RN_PENDING.v = r.action; RN_PENDING.subs.forEach((f) => f()); return { status: 'aguardando confirmação da pessoa', resumo: rnResumo(r.action).replace(/\*\*/g, '') }; } },
);
const rnSetPending = (v) => { RN_PENDING.v = v; RN_PENDING.subs.forEach((f) => f()); };
let RN_DRAFT = null;
/* modo demonstração: entende o pedido, pede o que faltar e monta a proposta */
function rnLocalAction(question) {
  let r = null;
  if (RN_DRAFT) {
    const n = String(question).trim().split(/\s+/).length;
    if (n <= 6) r = rnParseAction(RN_DRAFT.q + (RN_DRAFT.need === 'paciente' ? ' da cliente ' : RN_DRAFT.need === 'quantidade' ? ' ' : ' ') + question + (RN_DRAFT.need === 'quantidade' && /^\s*\d+\s*$/.test(question) ? ' unidades' : ''));
    RN_DRAFT = null;
  }
  if (!r) r = rnParseAction(question);
  if (!r) return null;
  if (r.erro) { if (r.need) RN_DRAFT = { q: question, need: r.need }; return { text: r.erro }; }
  rnSetPending(r.action);
  return { text: rnResumo(r.action) };
}
Object.assign(window, { rnSetPending, rnLocalAction, RN_PENDING, rnParseAction, rnApply, rnResumo, rnIsYes, rnIsNo });
