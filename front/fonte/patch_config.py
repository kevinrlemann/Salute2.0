# Liga Configurações ao Supabase. Roda depois do patch_gestao.py, sobre o mesmo arquivo.
# Só troca de onde os dados vêm e para onde vão; o visual fica igual.
import sys
P = 'pacientes_patched.jsx'
s = open(P, encoding='utf8').read()
def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n: sys.exit('esperava %d ocorrência(s), achei %d:\n%s' % (n, c, old[:200]))
    s = s.replace(old, new)

# ---------- Clínica: abre com os dados do banco e salva com um clique ----------
rep("function ClinicaForm({ mobile }) {",
    "function ClinicaForm(props) {\n  const carga = useCarga('clinica');\n  if (SB_ON && carga !== 'ok') return <CargaEstado estado={carga} compact onRetry={() => carregar('clinica', true)} />;\n  return <ClinicaForm0 {...props} />;\n}\nfunction ClinicaForm0({ mobile }) {")
rep("const [c, setC] = React.useState({ fantasia: 'Clínica Bella Forma',", "const [c, setC] = React.useState(SB_ON ? clinTela() : { fantasia: 'Clínica Bella Forma',")
rep("const [est, setEst] = React.useState({ estac: true, acess: true, wifi: true });", "const [est, setEst] = React.useState(SB_ON ? estTela() : { estac: true, acess: true, wifi: true });")
rep("const [hor, setHor] = React.useState(DIAS.map(", "const [hor, setHor] = React.useState(SB_ON ? horTela() : DIAS.map(")
rep("const [pg, setPg] = React.useState(['Pix', 'Dinheiro', 'Cartão de débito', 'Cartão de crédito']);", "const [pg, setPg] = React.useState(SB_ON ? pgTela() : ['Pix', 'Dinheiro', 'Cartão de débito', 'Cartão de crédito']);")
rep("const [parc, setParc] = React.useState('6');", "const [parc, setParc] = React.useState(SB_ON ? parcTela() : '6');")
rep("      <SavedBar saved={saved} onSave={() => setSaved(true)} />",
    "      <SavedBar saved={saved} onSave={() => { if (!SB_ON) return setSaved(true); ClinSvc.salvar({ c, est, hor, pg, parc }).then(() => setSaved(true), () => {}); }} />")

# ---------- Equipe e acessos ----------
rep("function EquipeAcessos({ mobile }) {",
    "function EquipeAcessos(props) {\n  const carga = useCarga('equipe');\n  if (SB_ON && carga !== 'ok') return <CargaEstado estado={carga} compact onRetry={() => carregar('equipe', true)} />;\n  return <EquipeAcessos0 {...props} />;\n}\nfunction EquipeAcessos0({ mobile }) {")
rep("  const upd = (id, fn) => setList((l) => l.map((u) => u.id !== id || u.dono ? u : { ...u, acc: fn(u.acc) }));",
    "  const upd = (id, fn) => setList((l) => l.map((u) => { if (u.id !== id || u.dono) return u; const nu = { ...u, acc: fn(u.acc) }; if (SB_ON) EquipeSvc.acessos(nu); return nu; }));")
rep("onClick={() => { if (!f.nome.trim()) return; setList([...list, { id: Date.now(), nome: f.nome.trim(), email: f.email || '', funcao: f.funcao, acc: FUNC_PRESET()[f.funcao] || [] }]);",
    "onClick={() => { if (!f.nome.trim()) return; if (SB_ON) { if (!f.email.trim()) return avisoErro('Falta o e-mail', 'O convite vai para o e-mail da pessoa.'); const f0 = f; setNovo(false); setF({ nome: '', email: '', funcao: 'Recepção' }); EquipeSvc.convidar(f0).catch(() => {}); return; } setList([...list, { id: Date.now(), nome: f.nome.trim(), email: f.email || '', funcao: f.funcao, acc: FUNC_PRESET()[f.funcao] || [] }]);")

# ---------- Profissionais ----------
rep("  const save = () => { if (!ed.nome.trim()) return; setList((l) => l.some((x) => x.id === ed.id) ? l.map((x) => x.id === ed.id ? ed : x) : [...l, ed]); setEd(null); };",
    "  const save = () => { if (!ed.nome.trim()) return; setList((l) => l.some((x) => x.id === ed.id) ? l.map((x) => x.id === ed.id ? ed : x) : [...l, ed]); if (SB_ON) bg(ProfSvc.salvar(ed), () => carregar('catalogos', true)); setEd(null); };")

# ---------- Cadastro e abas de Configurações: escolha salva por usuário ----------
rep("  const [sec, setSec] = React.useState('clinica');", "  const [sec, setSec] = SB_ON ? usePrefFiltro('config.cadastro', 'clinica') : React.useState('clinica');")
rep("  const [tab, setTab] = React.useState(() => (tabs[0] || ['conta'])[0]);", "  const [tab, setTab] = SB_ON ? usePrefFiltro('config.aba', (tabs[0] || ['conta'])[0]) : React.useState(() => (tabs[0] || ['conta'])[0]);")

# ---------- WhatsApp: conexão e token no cofre ----------
rep("  const connect = (m, numero) => { setBusy(true); setTimeout(",
    "  const connect = (m, numero) => { setBusy(true); if (SB_ON) { WaSvc.conectar(m, numero, of).then(() => setBusy(false), () => setBusy(false)); return; } setTimeout(")
rep("  const hook = 'https://api.salute.app/webhooks/whatsapp/bellaforma';", "  const hook = SB_ON ? WaSvc.webhook() : 'https://api.salute.app/webhooks/whatsapp/bellaforma';")
rep("onClick={() => setWa({ ...wa, status: 'off' })}>Desconectar</OBtn>",
    "onClick={() => { setWa({ ...wa, status: 'off' }); if (SB_ON) bg(WaSvc.desconectar(), () => setWa({ ...WA_STORE.v, status: 'on' })); }}>Desconectar</OBtn>")
# som de nova mensagem vale em todos os aparelhos do usuário
rep("  const save = (v) => { setS(v); lsSet('salute-kit:sound', v); };",
    "  const save = (v) => { setS(v); lsSet('salute-kit:sound', v); if (SB_ON) salvarPref({ som_ativo: v.on, som_tom: v.tone, som_volume: v.vol }); };")

# ---------- Conteúdos da Salute ----------
rep("""function FlixCursos({ mobile }) {
  const [list, setList] = React.useState(FLIX0);""", """function FlixCursos({ mobile }) {
  const [list0, setList0] = React.useState(FLIX0);
  const [flixv] = useStore(FLIX_STORE);
  const cargaC = useCarga('conteudo');
  const list = SB_ON ? flixv : list0;
  const setList = SB_ON ? (nl) => { ContSvc.flix(list, typeof nl === 'function' ? nl(list) : nl).catch(() => {}); } : setList0;""")
rep("  const hero = list[1];", "  const hero = (SB_ON ? list.find((c) => c.destaque) || list[0] : list[1]) || { t: cargaC === 'carregando' ? 'Carregando...' : 'Novos conteúdos em breve', aulas: 0, dur: '', prog: 0 };")
rep("ic: f.tipo === 'Curso' ? 'graduation-cap' : 'briefcase-business' }]); setNovo(false);", "ic: f.tipo === 'Curso' ? 'graduation-cap' : 'briefcase-business', link: f.link.trim() }]); setNovo(false);")
rep("  const [list, setList] = React.useState(PARC0);", """  const [list0, setList0] = React.useState(PARC0);
  const [parcv] = useStore(PARC_STORE);
  useCarga('conteudo');
  const list = SB_ON ? parcv : list0;
  const setList = SB_ON ? (nl) => { ContSvc.parceiros(list, typeof nl === 'function' ? nl(list) : nl).catch(() => {}); } : setList0;""")
rep("  const [eps, setEps] = useStore(CAST_STORE);", """  const [eps, setEps0] = useStore(CAST_STORE);
  useCarga('conteudo');
  const setEps = SB_ON ? (nl) => { ContSvc.cast(eps, typeof nl === 'function' ? nl(eps) : nl).catch(() => {}); } : setEps0;""")
rep("  const [list, setList] = useStore(SELOS_STORE);", """  const [list, setList0] = useStore(SELOS_STORE);
  useCarga('conteudo');
  const setList = SB_ON ? (nl) => { ContSvc.selos(list, typeof nl === 'function' ? nl(list) : nl).catch(() => {}); } : setList0;""")

open(P, 'w', encoding='utf8').write(s)
print('ok configuracoes')
