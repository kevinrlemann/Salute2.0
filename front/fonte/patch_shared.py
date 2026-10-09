# Ajustes no arquivo compartilhado (acesso por módulo e hook de store)
import sys
s = open('bk_v22/shared_patched.jsx', encoding='utf8').read()
def rep(old, new):
    global s
    if s.count(old) != 1: sys.exit('nao achei: ' + old[:120])
    s = s.replace(old, new)
rep("""  const [, force] = React.useState(0);
  React.useEffect(() => { const s = () => force((x) => x + 1); st.subs.add(s); return () => { st.subs.delete(s); }; }, [st]);""", """  const [, force] = React.useState(0);
  const visto = React.useRef(st.v); visto.current = st.v;
  React.useEffect(() => { const s = () => force((x) => x + 1); st.subs.add(s); if (st.v !== visto.current) s(); return () => { st.subs.delete(s); }; }, [st]);""")
rep("  return { member: m, can: (id) => !m || m.dono || m.acc.includes(id) };", "  const [ses] = useStore(SESSAO); const meus = ses && ses.modulos;\n  return { member: m, can: (id) => (!meus || meus.includes(id)) && (!m || m.dono || m.acc.includes(id)) };")
open('shared_patched.jsx', 'w', encoding='utf8').write(s)
print('ok shared')
