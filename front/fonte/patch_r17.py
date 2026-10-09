# Rodada de 04/10 (tarde): estoque com lançamento de entrada ou baixa, períodos de 7 a 90 dias,
# painel mês a mês, várias clínicas, Painel Master com logins e primeiros passos.
# Roda depois do patch_novo.py.
import sys
def rep(s, old, new, n=1):
    c = s.count(old)
    if c != n: sys.exit('patch_r17: esperava %d ocorrência(s), achei %d:\n%s' % (n, c, old[:200]))
    return s.replace(old, new)

P = 'pacientes_patched.jsx'
s = open(P, encoding='utf8').read()
# ---------- períodos de 7, 14, 30, 60 e 90 dias (financeiro e relatórios do estoque) ----------
s = rep(s, "{[30, 60, 90].map((d) => <option key={d} value={d}>Últimos {d} dias</option>)}", "{[7, 14, 30, 60, 90].map((d) => <option key={d} value={d}>Últimos {d} dias</option>)}")
# ---------- estoque: lançar entrada ou baixa ----------
s = rep(s, "function ProdutosTab({ prods, setProds, cats, setCats, unis, mobile }) {\n  const [nc, setNc] = React.useState(null);",
        open('estoque_mov.jsx', encoding='utf8').read() + "\nfunction ProdutosTab({ prods, setProds, cats, setCats, unis, mobile }) {\n  const [nc, setNc] = React.useState(null);\n  const [mov, setMov] = React.useState(null);")
s = rep(s, "  const save = () => { if (!f.nome.trim()) return; const nid = SB_ON ? novoId() : Date.now(); const np = { id: nid, ...(SB_ON ? { dbId: nid, consP: { 30: 0, 60: 0, 90: 0 } } : {}), nome: f.nome.trim(), cat: f.cat, un: f.un, qtd: +f.qtd || 0, min: +f.min || 0, val: f.val || (SB_ON ? '' : '2027-12-31'), vm: +String(f.vm).replace(',', '.') || 0, cons: 0 }; setProds((ps) => [np, ...ps]); if (SB_ON) bg(EstSvc.criar(np), () => setProds((ps) => ps.filter((p) => p.id !== nid))); setNovo(false); setF({ nome: '', cat: cats[0], un: unis[0], qtd: '', min: '', val: '', vm: '' }); };",
         "  const save = () => { if (!f.nome.trim()) return; const nid = SB_ON ? novoId() : Date.now(); const np = { id: nid, ...(SB_ON ? { dbId: nid, consP: { 7: 0, 14: 0, 30: 0, 60: 0, 90: 0 } } : {}), nome: f.nome.trim(), cat: f.cat, un: f.un, qtd: +f.qtd || 0, min: +f.min || 0, val: f.val || (SB_ON ? '' : '2027-12-31'), vm: +String(f.vm).replace(',', '.') || 0, cons: 0 }; setProds((ps) => [np, ...ps]); if (SB_ON) bg(EstSvc.criar(np), () => setProds((ps) => ps.filter((p) => p.id !== nid))); setNovo(false); setF({ nome: '', cat: cats[0], un: unis[0], qtd: '', min: '', val: '', vm: '' }); };")
s = rep(s, "        <OBtn size=\"sm\" iconLeft=\"plus\" onClick={() => setNovo(true)}>{mobile ? 'Novo' : 'Cadastrar insumo'}</OBtn>\n",
        "        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' }}>\n"
        "          <OBtn size=\"sm\" variant=\"secondary\" iconLeft=\"arrow-left-right\" onClick={() => setMov('')}>{mobile ? 'Lançar' : 'Lançar entrada ou baixa'}</OBtn>\n"
        "          <OBtn size=\"sm\" iconLeft=\"plus\" onClick={() => setNovo(true)}>{mobile ? 'Novo' : 'Cadastrar insumo'}</OBtn>\n"
        "        </div>\n")
s = rep(s, "      <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Use os botões da quantidade para dar baixa ou registrar entrada.</span>\n",
        "      <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Use os botões da quantidade para ajustar de 1 em 1, ou Lançar entrada ou baixa para quantidades maiores.</span>\n"
        "      <MovEstoqueDialog open={mov !== null} onClose={() => setMov(null)} prods={prods} setProds={setProds} inicial={mov || ''} />\n")
# ---------- Configurações > Cadastro > Procedimentos (preço, duração, marcados ou não) ----------
s = rep(s, "const CAD_ITEMS = [['clinica', 'Clínica', 'building-2'], ['anamnese', 'Modelos de anamnese', 'clipboard-list'], ['equipe', 'Equipe e acessos', 'shield-check'], ['profissionais', 'Profissionais', 'stethoscope']];",
        open('procedimentos_cad.jsx', encoding='utf8').read() + "\nconst CAD_ITEMS = [['clinica', 'Clínica', 'building-2'], ['anamnese', 'Modelos de anamnese', 'clipboard-list'], ['equipe', 'Equipe e acessos', 'shield-check'], ['profissionais', 'Profissionais', 'stethoscope'], ['procedimentos', 'Procedimentos', 'syringe']];")
s = rep(s, "        {sec === 'profissionais' ? <ProfissionaisCad mobile={mobile} /> : null}\n",
        "        {sec === 'profissionais' ? <ProfissionaisCad mobile={mobile} /> : null}\n        {sec === 'procedimentos' ? <ProcedimentosCad mobile={mobile} /> : null}\n")
s = rep(s, "  const cur = CAD_ITEMS.find((x) => x[0] === sec);", "  const cur = CAD_ITEMS.find((x) => x[0] === sec) || CAD_ITEMS[0];")
open(P, 'w', encoding='utf8').write(s)

# ---------- Painel mês a mês ----------
P2 = 'painel_patched.jsx'
s = open(P2, encoding='utf8').read()
s = rep(s, "function PainelScreen({ mobile, onNavigate }) {\n  const [pv] = useStore(PAINEL);",
        open('painel_novo.jsx', encoding='utf8').read() + "\nfunction PainelScreen({ mobile, onNavigate }) {\n  const [pv] = useStore(PAINEL);\n  const [mesSt] = useStore(PAINEL_MES);\n  const mesAgora = mesesPainel()[0].value, mesMin = mesesPainel()[11].value;")
s = rep(s, "<CardTitle right={<PillChip>Mensal</PillChip>}>Funil de vendas</CardTitle>", "<CardTitle right={<MesChip />}>Funil de vendas</CardTitle>")
s = rep(s, "<CardTitle right={<PillChip>Mensal</PillChip>}>Leads por canal</CardTitle>", "<CardTitle right={<MesChip />}>Leads por canal</CardTitle>")
s = rep(s, "<CardTitle right={<PillChip>Mensal</PillChip>}>Atendimentos</CardTitle>", "<CardTitle right={<MesChip />}>Atendimentos</CardTitle>")
s = rep(s, "<CardTitle right={<PillChip>Mensal</PillChip>}>Gênero</CardTitle>", "<CardTitle right={<MesChip />}>Gênero</CardTitle>")
s = rep(s, """<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-strong)' }}><SIcon name="chevron-left" size={20} /><span style={{ fontSize: 20, fontWeight: 500 }}>{D ? D.mesNome : 'Outubro 2026'}</span><SIcon name="chevron-right" size={20} /></div>""",
        """<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-strong)' }}>
            <button type="button" aria-label="Mês anterior" disabled={mesSt.iso <= mesMin} onClick={() => painelMudarMes(mesVizinho(mesSt.iso, -1))} style={{ border: 0, background: 'none', padding: 4, display: 'flex', color: 'inherit', cursor: mesSt.iso <= mesMin ? 'default' : 'pointer', opacity: mesSt.iso <= mesMin ? .35 : 1 }}><SIcon name="chevron-left" size={20} /></button>
            <span style={{ fontSize: 20, fontWeight: 500 }}>{D ? D.mesNome : mesNomeIso(mesSt.iso)}</span>
            <button type="button" aria-label="Próximo mês" disabled={mesSt.iso >= mesAgora} onClick={() => painelMudarMes(mesVizinho(mesSt.iso, 1))} style={{ border: 0, background: 'none', padding: 4, display: 'flex', color: 'inherit', cursor: mesSt.iso >= mesAgora ? 'default' : 'pointer', opacity: mesSt.iso >= mesAgora ? .35 : 1 }}><SIcon name="chevron-right" size={20} /></button>
          </div>""")
s = rep(s, """          <CardTitle right={<PillChip>Mensal</PillChip>}>Pacientes recentes</CardTitle>
          <PatientsTable rows={D ? D.recentes : PATIENTS.slice(0, 4)} />""", """          <AgendaRecentes D={D} mobile={mobile} />""")
assert 'Mensal</PillChip>' not in s
# ---------- Primeiros passos da clínica nova (no topo do Painel) ----------
s = rep(s, "function PainelScreen({ mobile, onNavigate }) {", open('passos_novo.jsx', encoding='utf8').read() + "\nfunction PainelScreen({ mobile, onNavigate }) {")
s = rep(s, """    <div style={{ display: 'flex', flexDirection: 'column', gap: g }}>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : narrow ? 'repeat(auto-fit, minmax(280px,1fr))' : 'repeat(3, minmax(0,1fr))', gap: g }}>""", """    <div style={{ display: 'flex', flexDirection: 'column', gap: g }}>
      <PrimeirosPassos mobile={mobile} />
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : narrow ? 'repeat(auto-fit, minmax(280px,1fr))' : 'repeat(3, minmax(0,1fr))', gap: g }}>""")
open(P2, 'w', encoding='utf8').write(s)
print('patch_r17 ok')
