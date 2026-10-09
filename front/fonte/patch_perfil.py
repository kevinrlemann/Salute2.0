# Liga Minha conta ao Supabase: perfil, foto, senha, plano, notificações, idioma, sair e troca de clínica.
import sys
P = 'perfil_patched.jsx'
s = open('bk_v22/perfil_patched.jsx', encoding='utf8').read()
def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n: sys.exit('esperava %d ocorrência(s), achei %d:\n%s' % (n, c, old[:200]))
    s = s.replace(old, new)

rep("function Field({ label, value, type }) {\n  return <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: 'var(--text-muted)' }}>{label}<input defaultValue={value} type={type} style={field} /></label>;",
    "function Field({ label, value, type, onChange, readOnly }) {\n  return <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: 'var(--text-muted)' }}>{label}<input defaultValue={value} type={type} onChange={onChange} readOnly={readOnly} style={field} /></label>;")
rep("const PLAN_LIMIT = 10000;", "let PLAN_LIMIT = 10000;")

# ---------- Plano e cobrança ----------
rep("  const [cur, setCur] = useStore(PLAN_STORE);", "  const [cur, setCur] = useStore(PLAN_STORE);\n  useStore(CAT);")
rep("  const used = 6240, pct = used / PLAN_LIMIT * 100;", "  const used = SB_ON ? consumoMes() : 6240, pct = used / PLAN_LIMIT * 100;")
rep("Plano atual: <B>{PLANS.find((p) => p.id === cur).nome}</B> · próxima cobrança em 10/10/2026",
    "Plano atual: <B>{(PLANS.find((p) => p.id === cur) || { nome: '' }).nome}</B> · próxima cobrança em {SB_ON ? proxCobranca() : '10/10/2026'}")
rep("usadas · renova dia 10", "usadas · renova dia {SB_ON ? diaRenova() : 10}")
rep("onClick={() => { if (p.preco) { setCur(p.id);",
    "onClick={() => { if (SB_ON) { if (p.preco) ContaSvc.trocarPlano(p.id).then(() => setMsg(`Pronto! Seu plano mudou para ${p.nome}. A diferença aparece na próxima cobrança.`), () => {}); else ContaSvc.consultor(p.id).then(() => setMsg('Recebemos seu pedido. Um consultor vai chamar você no WhatsApp para montar o plano Enterprise.'), () => {}); return; } if (p.preco) { setCur(p.id);")

# ---------- Segurança ----------
rep("  const [twofa, setTwofa] = React.useState(false);",
    "  const [twofa, setTwofa0] = React.useState(SB_ON ? !!(SESSAO.v.perfil && SESSAO.v.perfil.dois_fatores_ativo) : false);\n  const setTwofa = (v) => { setTwofa0(v); if (SB_ON) ContaSvc.doisFatores(v).catch(() => setTwofa0(!v)); };")
rep("onClick={() => { setDone(true); setF({ atual: '', nova: '', conf: '' }); }}",
    "onClick={() => { if (SB_ON) { ContaSvc.trocarSenha(f.atual, f.nova).then(() => { setDone(true); setF({ atual: '', nova: '', conf: '' }); }, () => {}); return; } setDone(true); setF({ atual: '', nova: '', conf: '' }); }}")
rep("O link vai para <B>camila@bellaforma.com.br</B>", "O link vai para <B>{SB_ON ? (SESSAO.v.perfil || {}).email : 'camila@bellaforma.com.br'}</B>")
rep("onClick={() => setSent(true)}>Solicitar troca de senha", "onClick={() => { if (SB_ON) { ContaSvc.linkSenha().then(() => setSent(true), () => {}); return; } setSent(true); }}>Solicitar troca de senha")

# ---------- Idioma e notificações ----------
rep("onClick={() => setLang(k)}", "onClick={() => { setLang(k); if (SB_ON) salvarPref({ idioma: k }); }}")
rep("  const [n, setN] = React.useState({ ag: true, anam: true, est: true, fin: false });",
    "  const [n, setN0] = React.useState(SB_ON ? notifTela() : { ag: true, anam: true, est: true, fin: false });\n  const setN = (v) => { setN0(v); if (SB_ON) salvarNotif(v); };")

# ---------- Conta ----------
rep("  const [tab, setTab] = React.useState('conta');",
    "  const [tab, setTab] = SB_ON ? usePrefFiltro('conta.aba', 'conta') : React.useState('conta');\n  const [sess] = useStore(SESSAO); useStore(CAT);\n  const vals = React.useRef({}); const fotoRef = React.useRef(null);\n  const pf = sess.perfil || {}; const vv = (k, d) => (vals.current[k] !== undefined ? vals.current[k] : d);\n  const anota = (k) => (e) => { vals.current[k] = e.target.value; };")
# sair (e excluir conta continua como está)
rep("      <span style={{ flex: 1, minHeight: 24 }} />\n",
    "      <span style={{ flex: 1, minHeight: 24 }} />\n      {SB_ON ? <button type=\"button\" onClick={sair} style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 26px 16px', border: 0, background: 'transparent', color: 'var(--text-strong)', fontFamily: 'inherit', fontSize: 16, cursor: 'pointer', padding: 0 }}><FIcon name=\"log-out\" size={18} />Sair</button> : null}\n")
rep("{SET_ITEMS.map(([k, l, i]) => <span key={k} style={{ flexShrink: 0 }}><FilterChip active={tab === k} onClick={() => setTab(k)}><FIcon name={i} size={14} />{l}</FilterChip></span>)}</div>",
    "{SET_ITEMS.map(([k, l, i]) => <span key={k} style={{ flexShrink: 0 }}><FilterChip active={tab === k} onClick={() => setTab(k)}><FIcon name={i} size={14} />{l}</FilterChip></span>)}{SB_ON ? <span style={{ flexShrink: 0 }}><FilterChip active={false} onClick={sair}><FIcon name=\"log-out\" size={14} />Sair</FilterChip></span> : null}</div>")
# foto do perfil
rep("<span style={{ position: 'relative' }}><FAv name=\"Camila Rocha\" size={92} ring />",
    "<span style={{ position: 'relative', cursor: SB_ON ? 'pointer' : undefined }} onClick={SB_ON ? () => fotoRef.current && fotoRef.current.click() : undefined}><FAv name={SB_ON ? nomeCompleto() : 'Camila Rocha'} src={SB_ON ? KIT_USER.avatar || undefined : undefined} size={92} ring />")
rep("          <button type=\"button\" style={{ height: 50, padding: '0 46px',",
    "          {SB_ON ? <input ref={fotoRef} type=\"file\" accept=\"image/*\" style={{ display: 'none' }} onChange={(e) => { const f = e.target.files && e.target.files[0]; if (f) ContaSvc.foto(f).catch(() => {}); e.target.value = ''; }} /> : null}\n"
    "          <button type=\"button\" onClick={SB_ON ? () => ContaSvc.salvarPerfil({ nome: vv('nome', pf.nome || ''), sobrenome: vv('sobrenome', pf.sobrenome || ''), email: vv('email', pf.email || ''), tel: vv('tel', BR.telTela(pf.telefone)) }).catch(() => {}) : undefined} style={{ height: 50, padding: '0 46px',")
rep("Camila Rocha <FIcon name=\"badge-check\" size={20} color=\"#1F5EFF\" />", "{SB_ON ? nomeCompleto() : 'Camila Rocha'} {!SB_ON || pf.verificado ? <FIcon name=\"badge-check\" size={20} color=\"#1F5EFF\" /> : null}")
rep("<FIcon name=\"map-pin\" size={14} />Itapira, SP", "<FIcon name=\"map-pin\" size={14} />{SB_ON ? cidadeClinica() : 'Itapira, SP'}")
rep("""          <Field label="Nome" value="Camila" /><Field label="Sobrenome" value="Rocha" />
          <Field label="E-mail" value="camila@bellaforma.com.br" /><Field label="Telefone" value="(19) 99800-4100" />
          <Field label="Tipo de conta" value="Administradora" />""",
    """          {SB_ON ? <><Field label="Nome" value={pf.nome || ''} onChange={anota('nome')} /><Field label="Sobrenome" value={pf.sobrenome || ''} onChange={anota('sobrenome')} />
          <Field label="E-mail" type="email" value={pf.email || ''} onChange={anota('email')} /><Field label="Telefone" value={BR.telTela(pf.telefone)} onChange={anota('tel')} />
          <Field label="Tipo de conta" value={papelTela()} readOnly />
          {sess.clinicas.length > 1 ? <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: 'var(--text-muted)' }}>Clínica<select value={CLI()} onChange={(e) => trocarClinica(e.target.value)} style={field}>{sess.clinicas.map((c) => <option key={c.id} value={c.id}>{c.nome}</option>)}</select></label> : null}</>
          : <><Field label="Nome" value="Camila" /><Field label="Sobrenome" value="Rocha" />
          <Field label="E-mail" value="camila@bellaforma.com.br" /><Field label="Telefone" value="(19) 99800-4100" />
          <Field label="Tipo de conta" value="Administradora" /></>}""")

open(P, 'w', encoding='utf8').write(s)
print('ok minha conta')
