/* =====================================================================
   SERVIÇOS DE DADOS: Financeiro e Estoque (Supabase)
   As telas continuam as mesmas. No modo conectado, receitas, despesas,
   categorias, metas, configuração fiscal e produtos vêm do banco e cada
   ação da tela grava lá.
   ===================================================================== */
Object.assign(ENUM, {
  regime: { 'Simples Nacional': 'simples_nacional', MEI: 'mei', 'Lucro Presumido': 'lucro_presumido', 'Lucro Real': 'lucro_real' },
  ambiente: { 'Homologação (testes)': 'homologacao', 'Produção': 'producao' },
});
const SENHA_GUARDADA = '••••••••';
const numTela = (v) => (v === null || v === undefined || v === '' ? '' : String(Number(v)).replace('.', ','));

// No modo conectado nenhum lançamento, produto ou dado fiscal de exemplo aparece
if (SB_ON) {
  REC_STORE.v = []; DESP_STORE.v = []; PROD_STORE.v = []; PAC_NOMES.length = 0; FIN_METAS.length = 0;
  NF_STORE.v = { ...NF_STORE.v, cnpj: '', razao: '', im: '', municipio: '', codMun: '', aliq: '', cert: null, certSenha: '' };
  // a lista de pacientes do lançamento acompanha o cadastro
  PAC_STORE.subs.add(() => substituir(PAC_NOMES, Array.from(new Set(PAC.map((p) => p.nome)))));
  // os materiais do prontuário acompanham o saldo do estoque
  PROD_STORE.subs.add(() => substituir(PRODUTOS0, PROD_STORE.v.map((p) => ({ id: p.id, nome: p.nome, un: p.un, qtd: p.qtd }))));
}

/* =====================================================================
   FINANCEIRO
   ===================================================================== */
const REC_SEL = '*, paciente:pacientes(nome), procedimento:procedimentos(nome), profissional:profissionais(nome), categoria:categorias_financeiras(nome), forma:formas_pagamento(nome)';
const DESP_SEL = '*, fornecedor:fornecedores(nome), categoria:categorias_financeiras(nome), forma:formas_pagamento(nome)';
const recTela = (r) => ({
  id: r.id, dbId: r.id, data: r.data_competencia, pac: (r.paciente && r.paciente.nome) || r.paciente_nome || r.descricao || '', pacId: r.paciente_id,
  proc: (r.procedimento && r.procedimento.nome) || r.procedimento_nome || '', pro: (r.profissional && r.profissional.nome) || '', cat: (r.categoria && r.categoria.nome) || '',
  atend: r.tipo_atendimento === 'convenio' ? 'Convênio' : 'Particular', total: Number(r.valor_total), desc: Number(r.valor_desconto || 0), forma: (r.forma && r.forma.nome) || '',
  parc: r.numero_parcelas || 1, venc: r.data_vencimento || r.data_competencia, status: r.status === 'pago' ? 'Recebido' : 'Pendente', ia: !!r.criado_por_ia,
});
const despTela = (d) => ({
  id: d.id, dbId: d.id, desc: d.descricao, cat: (d.categoria && d.categoria.nome) || '', forn: (d.fornecedor && d.fornecedor.nome) || d.fornecedor_nome || 'Não informado',
  total: Number(d.valor_total), forma: (d.forma && d.forma.nome) || '', parc: d.numero_parcelas || 1, data: d.data_competencia, venc: d.data_vencimento || d.data_competencia,
  status: d.status === 'pago' ? 'Pago' : 'Pendente', ia: !!d.criado_por_ia,
});
const nfTela = (c) => ({
  cnpj: c.cnpj || '', razao: c.razao_social || '', im: c.inscricao_municipal || '', municipio: c.municipio_emissao || '', regime: el('regime', c.regime_tributario, 'Simples Nacional'),
  item: c.item_lc116_estetica || '6.02', itemOdonto: c.item_lc116_odontologia || '4.12', cnae: c.cnae_estetica || '9602-5/02', cnaeOdonto: c.cnae_odontologia || '8630-5/04',
  codMun: c.codigo_tributacao_municipal || '', aliq: numTela(c.aliquota_iss), issRet: !!c.iss_retido, serie: c.serie_rps || '', proxRps: String(c.proximo_numero_rps || 1),
  ambiente: el('ambiente', c.ambiente, 'Homologação (testes)'), cert: c.certificado_nome_arquivo || null, certPath: c.certificado_path || null,
  certSenha: c.certificado_senha_configurada ? SENHA_GUARDADA : '', envio: c.enviar_whatsapp !== false, cst: c.cst_ibs_cbs || '000', cclass: c.classificacao_tributaria || '000001',
  cbs: numTela(c.aliquota_cbs) || '0,9', ibs: numTela(c.aliquota_ibs) || '0,1', texto: c.texto_modelo_discriminacao || 'Serviço de {procedimento} realizado em {data} por {profissional}.', dbId: c.id,
});
const nfBanco = (f) => ({
  razao_social: f.razao.trim() || null, cnpj: f.cnpj.trim() || null, inscricao_municipal: f.im.trim() || null, municipio_emissao: f.municipio.trim() || null,
  regime_tributario: ek('regime', f.regime), item_lc116_estetica: f.item || null, item_lc116_odontologia: f.itemOdonto || null, cnae_estetica: f.cnae || null, cnae_odontologia: f.cnaeOdonto || null,
  codigo_tributacao_municipal: String(f.codMun || '').trim() || null, aliquota_iss: BR.num(f.aliq), iss_retido: !!f.issRet, serie_rps: String(f.serie || '').trim() || null,
  proximo_numero_rps: parseInt(f.proxRps, 10) || 1, ambiente: ek('ambiente', f.ambiente) || 'homologacao', enviar_whatsapp: !!f.envio, cst_ibs_cbs: f.cst || null,
  classificacao_tributaria: f.cclass || null, aliquota_cbs: BR.num(f.cbs), aliquota_ibs: BR.num(f.ibs), texto_modelo_discriminacao: f.texto || null,
});
let FIN_METAS_DB = [];
function hidratarMetas() {
  // meta do mês atual vale mais que a meta padrão (sem ano e mês)
  const a = TODAY.getFullYear(), m = TODAY.getMonth() + 1;
  substituir(FIN_METAS, PROF0.map((p) => {
    const doMes = FIN_METAS_DB.find((x) => x.profissional_id === p.dbId && x.ano === a && x.mes === m);
    const padrao = FIN_METAS_DB.find((x) => x.profissional_id === p.dbId && !x.ano && !x.mes);
    return Number((doMes || padrao || {}).valor_meta || 0);
  }));
}
CARGAS.financeiro = async () => {
  await Promise.all([carregar('catalogos'), carregar('pacientes')]);
  const desde = isoOf(addD(TODAY, -400));
  const [rec, desp, metas] = await Promise.all([
    DB.tudo(() => DB.sel('contas_receber', REC_SEL).neq('status', 'cancelado').or('data_competencia.gte.' + desde + ',status.eq.pendente').order('data_competencia', { ascending: false }).order('id')),
    DB.tudo(() => DB.sel('contas_pagar', DESP_SEL).neq('status', 'cancelado').or('data_competencia.gte.' + desde + ',status.eq.pendente').order('data_competencia', { ascending: false }).order('id')),
    DB.ler(DB.sel('metas_profissional').order('criado_em')),
  ]);
  REC_STORE.v = rec.map(recTela); avisar(REC_STORE);
  DESP_STORE.v = desp.map(despTela); avisar(DESP_STORE);
  FIN_METAS_DB = metas; hidratarMetas();
  if (CAT.v.nf) { NF_STORE.v = nfTela(CAT.v.nf); avisar(NF_STORE); }
  substituir(PAC_NOMES, Array.from(new Set(PAC.map((p) => p.nome))));
};
// categorias da tela, sempre do banco
const catsFin = (c, tipo) => (c.categorias || []).filter((x) => x.tipo === tipo && x.ativo).map((x) => x.nome);
const FinSvc = {
  baixa(pago, valor) { return pago ? { status: 'pago', data_pagamento: TODAY_ISO, valor_pago: valor, baixa_por: UID(), baixa_em: agoraIso() } : { status: 'pendente', data_pagamento: null, valor_pago: null, baixa_por: null, baixa_em: null }; },
  idCat(tipo, nome) { const c = (CAT.v.categorias || []).find((x) => x.tipo === tipo && x.nome === nome); return c ? c.id : null; },
  parcelas(isR, id, total, n, venc, pago) {
    const base = Math.floor(total / n * 100) / 100;
    return Array.from({ length: n }, (_, i) => {
      const v = i === n - 1 ? Math.round((total - base * (n - 1)) * 100) / 100 : base;
      const d = new Date(venc + 'T12:00:00'); d.setMonth(d.getMonth() + i);
      return { [isR ? 'conta_receber_id' : 'conta_pagar_id']: id, numero: i + 1, valor: v, vencimento: BR.isoDia(d), status: pago ? 'pago' : 'pendente', data_pagamento: pago ? TODAY_ISO : null, valor_pago: pago ? v : null };
    });
  },
  async fornecedor(nome) {
    const n = String(nome || '').trim(); if (!n || n === 'Não informado') return null;
    const ex = porNome(CAT.v.fornecedores, n); if (ex) return ex.id;
    const r = await DB.ins('fornecedores', { nome: n }, 'Não foi possível cadastrar o fornecedor');
    catSet({ fornecedores: [...(CAT.v.fornecedores || []), r] });
    return r.id;
  },
  // lançamento novo (receita ou despesa), com parcelas quando houver
  async criar(kind, r, extra) {
    const ext = { ...(extra || {}) }; delete ext.silencioso;
    const isR = kind === 'rec', pago = r.status !== 'Pendente', final = isR ? Math.max(r.total - (r.desc || 0), 0) : r.total;
    const comum = { id: r.id, forma_pagamento_id: catId('formas', r.forma), conta_bancaria_id: CAT.v.contaBancaria ? CAT.v.contaBancaria.id : null, valor_total: r.total, numero_parcelas: r.parc || 1,
      data_competencia: r.data, data_vencimento: r.venc || r.data, ...FinSvc.baixa(pago, final) };
    let p = null;
    if (isR) {
      p = PacSvc.achar(r.pac); const pr = porNome(CAT.v.procedimentos, r.proc), pf = PROF0.find((x) => x.nome === r.pro);
      await DB.ins('contas_receber', { ...comum, paciente_id: p ? p.dbId : null, paciente_nome: p ? null : (r.pac || null), procedimento_id: pr ? pr.id : null, procedimento_nome: r.proc || null,
        profissional_id: pf ? pf.dbId : null, categoria_financeira_id: FinSvc.idCat('receita', r.cat), tipo_atendimento: r.atend === 'Convênio' ? 'convenio' : 'particular',
        convenio_id: r.atend === 'Convênio' && p && p.conv ? catId('convenios', p.conv) : null, valor_desconto: r.desc || 0, ...ext }, 'Não foi possível salvar a receita');
    } else {
      const fid = await FinSvc.fornecedor(r.forn);
      await DB.ins('contas_pagar', { ...comum, descricao: r.desc, categoria_financeira_id: FinSvc.idCat('despesa', r.cat), fornecedor_id: fid, ...ext }, 'Não foi possível salvar a despesa');
    }
    if ((r.parc || 1) > 1) await DB.ins('parcelas', FinSvc.parcelas(isR, r.id, final, r.parc, r.venc || r.data, pago), 'Não foi possível salvar as parcelas');
    if (p) PacSvc.hist(p, { t: pago ? 'Pagamento recebido' : 'Pagamento lançado', s: [r.proc, brl(final), r.forma].filter(Boolean).join(' · '), c: '#2DBF6A', tipo: 'financeiro', tabela: 'contas_receber', registro: r.id, origem: ext.criado_por_ia ? 'renata_ia' : undefined });
    if (!silencioso) avisoOk(isR ? 'Receita salva' : 'Despesa salva');
  },
  // marcar como recebido/pago ou voltar para pendente
  async status(kind, r, novo) {
    const isR = kind === 'rec', pago = novo !== 'Pendente', final = isR ? liq(r) : r.total, fk = isR ? 'conta_receber_id' : 'conta_pagar_id';
    await DB.upd(isR ? 'contas_receber' : 'contas_pagar', r.dbId, FinSvc.baixa(pago, final), 'Não foi possível atualizar o status');
    if ((r.parc || 1) > 1) {
      const ps = await DB.ler(DB.sel('parcelas', 'id,valor').eq(fk, r.dbId));
      await Promise.all(ps.map((x) => DB.upd('parcelas', x.id, { status: pago ? 'pago' : 'pendente', data_pagamento: pago ? TODAY_ISO : null, valor_pago: pago ? x.valor : null }, 'Não foi possível atualizar as parcelas')));
    }
  },
  // categorias: a tela manda a lista nova; aqui vira inclusão ou exclusão no banco
  async categorias(antes, depois) {
    const ops = [];
    [['rec', 'receita', '#1F5EFF'], ['desp', 'despesa', '#7B4BC4']].forEach(([k, tipo, cor]) => {
      const lista = (CAT.v.categorias || []).filter((x) => x.tipo === tipo);
      (depois[k] || []).filter((n) => !(antes[k] || []).includes(n)).forEach((nome) => {
        const row = { id: novoId(), nome, tipo, cor, ordem: lista.reduce((m, x) => Math.max(m, x.ordem || 0), 0) + 1, ativo: true };
        catSet({ categorias: [...CAT.v.categorias, { ...row, clinica_id: CLI() }] });
        ops.push(DB.ins('categorias_financeiras', row, 'Não foi possível criar a categoria'));
      });
      (antes[k] || []).filter((n) => !(depois[k] || []).includes(n)).forEach((nome) => {
        const c = lista.find((x) => x.nome === nome); if (!c) return;
        catSet({ categorias: CAT.v.categorias.filter((x) => x.id !== c.id) });
        ops.push(DB.del('categorias_financeiras', c.id, 'Não foi possível remover a categoria'));
      });
    });
    hidratarCatalogos();
    try { await Promise.all(ops); } catch (e) { carregar('catalogos', true); }
  },
  async salvarNF(cfg) {
    const atual = CAT.v.nf;
    const row = atual ? await DB.upd('configuracao_nota_fiscal', atual.id, nfBanco(cfg), 'Não foi possível salvar a configuração fiscal') : await DB.ins('configuracao_nota_fiscal', nfBanco(cfg), 'Não foi possível salvar a configuração fiscal');
    // a senha do certificado vai para o cofre; o banco só guarda que ela existe
    if (cfg.certSenha && cfg.certSenha !== SENHA_GUARDADA) await DB.rpc('salvar_segredo', { p_clinica: CLI(), p_provedor: 'certificado_fiscal', p_segredo: cfg.certSenha }, 'Não foi possível guardar a senha do certificado');
    const fresco = await DB.ler(DB.sel('configuracao_nota_fiscal').eq('id', row.id));
    catSet({ nf: fresco[0] || row });
    NF_STORE.v = nfTela(fresco[0] || row); avisar(NF_STORE);
    avisoOk('Configuração fiscal salva');
  },
  async enviarCertificado(file) {
    const path = await ARQ.enviar('fiscal', 'certificado', file);
    const atual = CAT.v.nf;
    const dados = { certificado_path: path, certificado_nome_arquivo: file.name };
    const row = atual ? await DB.upd('configuracao_nota_fiscal', atual.id, dados, 'Não foi possível salvar o certificado') : await DB.ins('configuracao_nota_fiscal', dados, 'Não foi possível salvar o certificado');
    catSet({ nf: row });
    NF_STORE.v = { ...NF_STORE.v, cert: file.name, certPath: path }; avisar(NF_STORE);
    avisoOk('Certificado enviado', 'Fica guardado em pasta privada da clínica.');
  },
};
// saldo do início da janela de 30 dias do Salute Pay, a partir do saldo inicial da conta
function saldoPay(rec, desp) {
  const cb = CAT.v.contaBancaria; if (!cb) return 0;
  const ini = isoOf(addD(TODAY, -29)); let s = Number(cb.saldo_inicial || 0);
  if (cb.saldo_inicial_em) {
    rec.forEach((r) => { if (r.status === 'Recebido' && r.data >= cb.saldo_inicial_em && r.data < ini) s += liq(r); });
    desp.forEach((d) => { if (d.status === 'Pago' && d.data >= cb.saldo_inicial_em && d.data < ini) s -= d.total; });
  }
  return s;
}

/* =====================================================================
   ESTOQUE
   ===================================================================== */
const PROD_SEL = 'id,nome,quantidade_atual,estoque_minimo,validade,custo_medio,categoria:categorias_produto(nome),unidade:unidades_medida(nome)';
const prodTela = (p, c) => {
  const cp = c || { 7: 0, 14: 0, 30: 0, 60: 0, 90: 0 };
  return { id: p.id, dbId: p.id, nome: p.nome, cat: p.categoria ? p.categoria.nome : '', un: p.unidade ? p.unidade.nome : '', qtd: Number(p.quantidade_atual), min: Number(p.estoque_minimo),
    val: p.validade || '', vm: Number(p.custo_medio || 0), cons: cp[30], consP: cp };
};
let EST_CONS = {};
async function carregarConsumo() {
  const desde = addD(TODAY, -89);
  const movs = await DB.tudo(() => DB.sel('movimentacoes_estoque', 'produto_id,quantidade,data').eq('tipo', 'saida').gte('data', desde.toISOString()).order('data').order('id'));
  const out = {};
  movs.forEach((m) => {
    const dias = Math.round((TODAY - new Date(BR.diaDe(m.data) + 'T00:00:00')) / 86400000);
    const c = out[m.produto_id] = out[m.produto_id] || { 7: 0, 14: 0, 30: 0, 60: 0, 90: 0 };
    [7, 14, 30, 60, 90].forEach((k) => { if (dias < k) c[k] += Number(m.quantidade); });
  });
  EST_CONS = out;
}
CARGAS.estoque = async () => {
  await carregar('catalogos');
  const [prods] = await Promise.all([DB.ler(DB.sel('produtos', PROD_SEL).order('nome')), carregarConsumo()]);
  PROD_STORE.v = prods.map((p) => prodTela(p, EST_CONS[p.id])); avisar(PROD_STORE);
};
const qFmtE = (n) => (Number.isInteger(n) ? String(n) : Number(n).toLocaleString('pt-BR'));
const catsEst = (c) => (c.catProd || []).filter((x) => x.ativo).map((x) => x.nome);
const unisEst = (c) => (c.unidades || []).filter((x) => x.ativo).map((x) => x.nome);
const EstSvc = {
  async criar(p) {
    await DB.ins('produtos', { id: p.id, nome: p.nome, categoria_produto_id: catId('catProd', p.cat), unidade_medida_id: catId('unidades', p.un), quantidade_atual: p.qtd || 0,
      estoque_minimo: p.min || 0, validade: p.val || null, custo_medio: p.vm || null }, 'Não foi possível cadastrar o produto');
    CAT_EXTRA.v = { ...CAT_EXTRA.v, produtos: [...(CAT_EXTRA.v.produtos || []), { id: p.id, nome: p.nome, quantidade_atual: p.qtd || 0, unidade: { nome: p.un } }] }; avisar(CAT_EXTRA);
    avisoOk('Produto cadastrado');
  },
  // botões de mais e menos: viram entrada ou saída no banco; o saldo final vem do banco
  async mover(p, d, extra) {
    const r = await DB.ins('movimentacoes_estoque', { produto_id: p.dbId, tipo: d < 0 ? 'saida' : 'entrada', quantidade: Math.abs(d), custo_unitario: p.vm || null, motivo: d < 0 ? 'Baixa manual' : 'Entrada manual', ...(extra || {}) }, d < 0 ? 'Não foi possível dar baixa' : 'Não foi possível registrar a entrada');
    PROD_STORE.v = PROD_STORE.v.map((x) => (x.id === p.id ? { ...x, qtd: Number(r.quantidade_depois) } : x)); avisar(PROD_STORE);
    CAT_EXTRA.v = { ...CAT_EXTRA.v, produtos: (CAT_EXTRA.v.produtos || []).map((x) => (x.id === p.id ? { ...x, quantidade_atual: Number(r.quantidade_depois) } : x)) };
    return r;
  },
  // entrada (com lote, validade e custo opcionais) ou baixa com motivo; o saldo é calculado no banco
  async lancar(p, m) {
    const TIPO_BAIXA = { 'Uso em procedimento': 'saida', Outro: 'saida' };
    let loteId = null;
    if (m.tipo === 'entrada' && (m.lote || m.validade)) {
      const l = await DB.ins('lotes', { produto_id: p.dbId, numero_lote: m.lote || null, validade: m.validade || null, quantidade: m.qtd, custo_unitario: m.custo, recebido_em: BR.hoje() }, 'Não foi possível salvar o lote');
      loteId = l.id;
    }
    const motivo = m.tipo === 'entrada' ? ['Entrada', m.lote ? 'lote ' + m.lote : '', m.obs].filter(Boolean).join(' · ') : [m.motivo, m.obs].filter(Boolean).join(' · ');
    const r = await DB.ins('movimentacoes_estoque', { produto_id: p.dbId, lote_id: loteId, tipo: m.tipo === 'entrada' ? 'entrada' : (TIPO_BAIXA[m.motivo] || 'perda'), quantidade: m.qtd,
      custo_unitario: m.tipo === 'entrada' ? (m.custo != null ? m.custo : p.vm || null) : p.vm || null, motivo }, m.tipo === 'entrada' ? 'Não foi possível registrar a entrada' : 'Não foi possível dar baixa');
    if (m.validade && (!p.val || m.validade < p.val)) await DB.upd('produtos', p.dbId, { validade: m.validade }, 'Não foi possível atualizar a validade');
    if (m.tipo !== 'entrada' && (TIPO_BAIXA[m.motivo] || 'perda') === 'saida') {
      const c = EST_CONS[p.dbId] = EST_CONS[p.dbId] || { 7: 0, 14: 0, 30: 0, 60: 0, 90: 0 };
      Object.keys(c).forEach((k) => { c[k] += m.qtd; });
    }
    await EstSvc.recarregar(p.id);
    avisoOk(m.tipo === 'entrada' ? 'Entrada registrada' : 'Baixa registrada', p.nome + ': saldo ' + qFmtE(Number(r.quantidade_depois)));
    return r;
  },
  async recarregar(id) {
    const r = await DB.ler(DB.sel('produtos', PROD_SEL).eq('id', id)).catch(() => []);
    if (r[0]) { PROD_STORE.v = PROD_STORE.v.map((x) => (x.id === id ? { ...prodTela(r[0], EST_CONS[id] || x.consP) } : x)); avisar(PROD_STORE); CAT_EXTRA.v = { ...CAT_EXTRA.v, produtos: (CAT_EXTRA.v.produtos || []).map((x) => (x.id === id ? { ...x, quantidade_atual: Number(r[0].quantidade_atual) } : x)) }; }
  },
  // categorias e unidades: a tela manda a lista nova; aqui vira inclusão ou exclusão
  async lista(chave, tabela, antes, depois) {
    const ops = [], atuais = CAT.v[chave] || [];
    depois.filter((n) => !antes.includes(n)).forEach((nome) => {
      const row = chave === 'catProd' ? { id: novoId(), nome, ordem: atuais.reduce((m, x) => Math.max(m, x.ordem || 0), 0) + 1, ativo: true } : { id: novoId(), nome, ativo: true };
      catSet({ [chave]: [...(CAT.v[chave] || []), { ...row, clinica_id: CLI() }] });
      ops.push(DB.ins(tabela, row, 'Não foi possível salvar'));
    });
    antes.filter((n) => !depois.includes(n)).forEach((nome) => {
      const c = atuais.find((x) => x.nome === nome); if (!c) return;
      catSet({ [chave]: (CAT.v[chave] || []).filter((x) => x.id !== c.id) });
      ops.push(DB.del(tabela, c.id, 'Não foi possível remover'));
    });
    hidratarCatalogos();
    try { await Promise.all(ops); } catch (e) { carregar('catalogos', true); }
  },
};

Object.assign(window, { FinSvc, EstSvc, recTela, despTela, nfTela, saldoPay, catsFin, catsEst, unisEst, hidratarMetas, SENHA_GUARDADA });
