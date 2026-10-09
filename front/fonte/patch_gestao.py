# Liga Financeiro e Estoque ao Supabase. Roda depois do patch_pac.py, sobre o mesmo arquivo.
# Só troca de onde os dados vêm e para onde vão; o visual fica igual.
import sys
P = 'pacientes_patched.jsx'
s = open(P, encoding='utf8').read()
def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n: sys.exit('esperava %d ocorrência(s), achei %d:\n%s' % (n, c, old[:200]))
    s = s.replace(old, new)

# =====================================================================
# FINANCEIRO
# =====================================================================
# filtro de status de receitas e despesas fica salvo por usuário
rep("""function LancamentosTab({ kind, list, setList, cats, mobile }) {
  const isR = kind === 'rec';
  const [q, setQ] = React.useState('');
  const [st, setSt] = React.useState('Todos');""", """function LancamentosTab({ kind, list, setList, cats, mobile }) {
  const isR = kind === 'rec';
  const [q, setQ] = React.useState('');
  const [st, setSt] = SB_ON ? usePrefFiltro('financeiro.' + kind + '.status', 'Todos') : React.useState('Todos');""")
# formulário em branco não quebra quando a clínica ainda não tem procedimentos
rep("const blank = isR ? { pac: PAC_NOMES[0], proc: FIN_PROCS[0].n, pro: FIN_PROS[0], cat: 'Estética', atend: 'Particular', total: String(FIN_PROCS[0].v),",
    "const blank = isR ? { pac: PAC_NOMES[0] || '', proc: (FIN_PROCS[0] || {}).n || '', pro: FIN_PROS[0] || '', cat: SB_ON ? (FIN_PROCS[0] && cats.includes(FIN_PROCS[0].cat) ? FIN_PROCS[0].cat : cats[0] || '') : 'Estética', atend: 'Particular', total: String((FIN_PROCS[0] || {}).v || ''),")
# marcar como recebido ou pago grava a baixa no banco
rep("  const toggle = (id) => setList((l) => l.map((r) => r.id === id ? { ...r, status: r.status === 'Pendente' ? done : 'Pendente' } : r));",
    """  const toggle = (id) => {
    const r0 = list.find((r) => r.id === id); if (!r0) return;
    const novoSt = r0.status === 'Pendente' ? done : 'Pendente';
    setList((l) => l.map((r) => r.id === id ? { ...r, status: novoSt } : r));
    if (SB_ON) bg(FinSvc.status(kind, r0, novoSt), () => setList((l) => l.map((r) => r.id === id ? { ...r, status: r0.status } : r)));
  };""")
# nova receita ou despesa vai para o banco (com parcelas)
rep("""    const base = { id: Date.now(), data: TODAY_ISO, total: totalN, forma: f.forma, parc: parcOn ? +f.parc : 1, venc: f.venc || TODAY_ISO, status: f.status };
    setList((l) => [isR ? { ...base, pac: f.pac, proc: f.proc, pro: f.pro, cat: f.cat, atend: f.atend, desc: descN } : { ...base, desc: f.desc.trim(), cat: f.cat, forn: f.forn || 'Não informado' }, ...l]);
    setNovo(false); setF(blank);""", """    const nid = SB_ON ? novoId() : Date.now();
    const base = { id: nid, ...(SB_ON ? { dbId: nid } : {}), data: TODAY_ISO, total: totalN, forma: f.forma, parc: parcOn ? +f.parc : 1, venc: f.venc || TODAY_ISO, status: f.status };
    const novoR = isR ? { ...base, pac: f.pac, proc: f.proc, pro: f.pro, cat: f.cat, atend: f.atend, desc: descN } : { ...base, desc: f.desc.trim(), cat: f.cat, forn: f.forn || 'Não informado' };
    setList((l) => [novoR, ...l]);
    if (SB_ON) bg(FinSvc.criar(kind, novoR), () => setList((l) => l.filter((x) => x.id !== nid)));
    setNovo(false); setF(blank);""")

# Salute Pay: saldo inicial vem da conta bancária da clínica
rep("function SalutePay({ rec, desp, mobile }) {", "function SalutePay({ rec, desp, mobile }) {\n  useStore(CAT);\n  const s0 = SB_ON ? saldoPay(rec, desp) : SALDO_INICIAL;")
rep("  let bal = SALDO_INICIAL; all.forEach(", "  let bal = s0; all.forEach(")
rep("Saldo inicial do período: {brl(SALDO_INICIAL)}.", "Saldo inicial do período: {brl(s0)}.")

# Nota fiscal: certificado vai para a pasta privada; configuração salva com um clique
rep("onChange={(e) => { const f = e.target.files && e.target.files[0]; if (f) setCfg({ ...cfg, cert: f.name }); e.target.value = ''; }}",
    "onChange={(e) => { const f = e.target.files && e.target.files[0]; if (f) { setCfg({ ...cfg, cert: f.name }); if (SB_ON) FinSvc.enviarCertificado(f).catch(() => setCfg((c) => ({ ...c, cert: CAT.v.nf ? CAT.v.nf.certificado_nome_arquivo || null : null }))); } e.target.value = ''; }}")
rep("              <SavedBar saved={saved} onSave={() => setSaved(true)} />",
    "              <SavedBar saved={saved} onSave={() => { if (!SB_ON) return setSaved(true); FinSvc.salvarNF(cfg).then(() => setSaved(true), () => {}); }} />")

# Tela: aba e período salvos por usuário; categorias do banco; carga com aviso
rep("""function FinanceiroScreen({ mobile }) {
  const [tab, setTab] = React.useState('geral');
  const [per, setPer] = React.useState(30);
  const [cats, setCats] = React.useState({ rec: ['Estética', 'Odontologia', 'Consulta', 'Venda de produto'], desp: DESP_CATS });""", """function FinanceiroScreen({ mobile }) {
  const [tab, setTab] = SB_ON ? usePrefFiltro('financeiro.aba', 'geral') : React.useState('geral');
  const [per, setPer] = SB_ON ? usePrefFiltro('financeiro.periodo', 30) : React.useState(30);
  const [cats0, setCats0] = React.useState({ rec: ['Estética', 'Odontologia', 'Consulta', 'Venda de produto'], desp: DESP_CATS });
  const [catv] = useStore(CAT);
  const cats = SB_ON ? { rec: catsFin(catv, 'receita'), desp: catsFin(catv, 'despesa') } : cats0;
  const setCats = SB_ON ? (n) => { FinSvc.categorias(cats, typeof n === 'function' ? n(cats) : n); } : setCats0;
  const carga = useCarga('financeiro');
  const pronto = !SB_ON || carga === 'ok';""")
rep("      {tab === 'geral' ? <VisaoGeral rec={rec} desp={desp} per={per} mobile={mobile} /> : null}",
    "      {!pronto ? <CargaEstado estado={carga} onRetry={() => carregar('financeiro', true)} /> : null}\n      {pronto && tab === 'geral' ? <VisaoGeral rec={rec} desp={desp} per={per} mobile={mobile} /> : null}")
for a in ["{tab === 'rec' ? <LancamentosTab", "{tab === 'desp' ? <LancamentosTab", "{tab === 'cats' ? <CategoriasFin", "{tab === 'pay' ? <SalutePay", "{tab === 'nf' ? <NotaFiscal"]:
    rep(a, a.replace("{tab ===", "{pronto && tab ==="))

# =====================================================================
# ESTOQUE
# =====================================================================
rep("""function ProdutosTab({ prods, setProds, cats, setCats, unis, mobile }) {
  const [nc, setNc] = React.useState(null);
  const [q, setQ] = React.useState('');
  const [st, setSt] = React.useState('todos');""", """function ProdutosTab({ prods, setProds, cats, setCats, unis, mobile }) {
  const [nc, setNc] = React.useState(null);
  const [q, setQ] = React.useState('');
  const [st, setSt] = SB_ON ? usePrefFiltro('estoque.status', 'todos') : React.useState('todos');""")
# mais e menos viram entrada e saída no banco
rep("  const adj = (id, d) => setProds((ps) => ps.map((p) => p.id === id ? { ...p, qtd: Math.max(0, p.qtd + d), cons: d < 0 ? p.cons + 1 : p.cons } : p));",
    """  const adj = (id, d) => {
    const p0 = prods.find((p) => p.id === id); if (!p0) return;
    const dd = d < 0 ? -Math.min(1, p0.qtd) : d;
    if (SB_ON && !dd) return;
    setProds((ps) => ps.map((p) => p.id === id ? { ...p, qtd: Math.max(0, p.qtd + d), cons: d < 0 ? p.cons + 1 : p.cons } : p));
    if (SB_ON) bg(EstSvc.mover(p0, dd), () => EstSvc.recarregar(id));
  };""")
# produto novo vai para o banco (o saldo inicial vira entrada no histórico)
rep("  const save = () => { if (!f.nome.trim()) return; setProds((ps) => [{ id: Date.now(), nome: f.nome.trim(), cat: f.cat, un: f.un, qtd: +f.qtd || 0, min: +f.min || 0, val: f.val || '2027-12-31', vm: +String(f.vm).replace(',', '.') || 0, cons: 0 }, ...ps]); setNovo(false);",
    "  const save = () => { if (!f.nome.trim()) return; const nid = SB_ON ? novoId() : Date.now(); const np = { id: nid, ...(SB_ON ? { dbId: nid, consP: { 30: 0, 60: 0, 90: 0 } } : {}), nome: f.nome.trim(), cat: f.cat, un: f.un, qtd: +f.qtd || 0, min: +f.min || 0, val: f.val || (SB_ON ? '' : '2027-12-31'), vm: +String(f.vm).replace(',', '.') || 0, cons: 0 }; setProds((ps) => [np, ...ps]); if (SB_ON) bg(EstSvc.criar(np), () => setProds((ps) => ps.filter((p) => p.id !== nid))); setNovo(false);")
# relatório usa o consumo real do período (saídas registradas)
rep("  const consumo = prods.map((p) => ({ ...p, c: Math.max(Math.round(p.cons * k), p.cons ? 1 : 0), cv: Math.max(Math.round(p.cons * k), p.cons ? 1 : 0) * p.vm })).sort((a, b) => b.cv - a.cv);",
    "  const consumo = prods.map((p) => { const c = p.consP ? p.consP[per] || 0 : Math.max(Math.round(p.cons * k), p.cons ? 1 : 0); return { ...p, c, cv: c * p.vm }; }).sort((a, b) => b.cv - a.cv);")
rep("""function EstoqueScreen({ mobile }) {
  const [tab, setTab] = React.useState('produtos');
  const [per, setPer] = React.useState(30);
  const [prods, setProds] = useStore(PROD_STORE);
  const [cats, setCats] = React.useState(EST_CATS);
  const [unis, setUnis] = React.useState(UNIDADES);""", """function EstoqueScreen({ mobile }) {
  const [tab, setTab] = SB_ON ? usePrefFiltro('estoque.aba', 'produtos') : React.useState('produtos');
  const [per, setPer] = SB_ON ? usePrefFiltro('estoque.periodo', 30) : React.useState(30);
  const [prods, setProds] = useStore(PROD_STORE);
  const [cats0, setCats0] = React.useState(EST_CATS);
  const [unis0, setUnis0] = React.useState(UNIDADES);
  const [catv] = useStore(CAT);
  const cats = SB_ON ? catsEst(catv) : cats0, unis = SB_ON ? unisEst(catv) : unis0;
  const setCats = SB_ON ? (n) => { EstSvc.lista('catProd', 'categorias_produto', cats, typeof n === 'function' ? n(cats) : n); } : setCats0;
  const setUnis = SB_ON ? (n) => { EstSvc.lista('unidades', 'unidades_medida', unis, typeof n === 'function' ? n(unis) : n); } : setUnis0;
  const carga = useCarga('estoque');
  const pronto = !SB_ON || carga === 'ok';""")
rep("      {tab === 'produtos' ? <ProdutosTab",
    "      {!pronto ? <CargaEstado estado={carga} onRetry={() => carregar('estoque', true)} /> : null}\n      {pronto && tab === 'produtos' ? <ProdutosTab")
rep("      {tab === 'relatorios' ? <RelatoriosTab", "      {pronto && tab === 'relatorios' ? <RelatoriosTab")
rep("      {tab === 'cad' ? <CadastrosEstoque", "      {pronto && tab === 'cad' ? <CadastrosEstoque")

# Gestão: a área escolhida (Estoque ou Financeiro) fica salva por usuário, não no navegador
rep("""  const [area0, setArea] = React.useState(() => { try { return localStorage.getItem('salute-kit:gestao') || 'estoque'; } catch (e) { return 'estoque'; } });""",
    """  const [areaL, setAreaL] = React.useState(() => { try { return localStorage.getItem('salute-kit:gestao') || 'estoque'; } catch (e) { return 'estoque'; } });
  const [areaP, setAreaP] = usePrefFiltro('gestao.area', 'estoque');
  const area0 = SB_ON ? areaP : areaL;""")
rep("  const pick = (a) => { setArea(a); try { localStorage.setItem('salute-kit:gestao', a); } catch (e) {} };",
    "  const pick = (a) => { if (SB_ON) { setAreaP(a); return; } setAreaL(a); try { localStorage.setItem('salute-kit:gestao', a); } catch (e) {} };")

open(P, 'w', encoding='utf8').write(s)
print('ok financeiro/estoque')
