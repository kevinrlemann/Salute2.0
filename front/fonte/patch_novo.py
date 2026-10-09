# Rodada de 03/10: horário de Brasília, procedimento com anexos e campos livres,
# abas sem permissão com cadeado (Gestão e Configurações) e CPF da clínica.
# Roda depois do patch_mens.py.
import sys
def rep(s, old, new, n=1):
    c = s.count(old)
    if c != n: sys.exit('patch_novo: esperava %d ocorrência(s), achei %d:\n%s' % (n, c, old[:200]))
    return s.replace(old, new)

P = 'pacientes_patched.jsx'
s = open(P, encoding='utf8').read()
# ---------- data e hora sempre no horário de Brasília ----------
s = rep(s, "let HOJE = '02/10/2026';", "let HOJE = BR.dataTela(BR.hoje()); // hoje no horário de Brasília")
s = rep(s, "const TODAY = new Date(2026, 9, 2);", "const TODAY = BR.dia(); // hoje no horário de Brasília, em qualquer aparelho")
s = rep(s, "const nowHM = () => { const d = new Date(); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); };",
        "const nowHM = () => BR.agoraHM(); // hora atual em Brasília")
s = rep(s, "  const now = new Date();\n  const past = (d, h) => d < TODAY || (sameDay(d, TODAY) && sameDay(now, TODAY) && now.getHours() >= h);",
        "  const past = (d, h) => d < TODAY || (sameDay(d, TODAY) && BR.horaDec() >= h);")
s = rep(s, "      const ini = new Date(day); ini.setHours(h, 0, 0, 0);", "      const ini = BR.instante(isoOf(day), qHH(h));")
s = rep(s, "  const agoraH = SB_ON ? new Date().getHours() + new Date().getMinutes() / 60 : 10.45;", "  const agoraH = BR.horaDec();")
# ---------- procedimento: nome livre, região, valor e anexos ----------
a = s.index('function ProcWorkspace({ onSave, onBack, wide, inicial }) {'); b = s.index('/* ---- Documentos ---- */', a)
s = s[:a] + open('proc_novo.jsx', encoding='utf8').read() + '\n' + s[b:]
# ---------- Gestão: áreas sem permissão aparecem com cadeado ----------
s = rep(s, """  const { can } = useAccess();
  const areas = GESTAO_AREAS.filter(([k]) => can('gestao.' + k));""", """  const { can } = useAccess();
  const areas = GESTAO_AREAS.map((x) => [...x, !can('gestao.' + x[0])]);
  const livres = areas.filter((x) => !x[4]);
  const [bloqSel, setBloqSel] = React.useState(null);""")
s = rep(s, """  const area = areas.some((x) => x[0] === area0) ? area0 : (areas[0] || [''])[0];
  const pick = (a) => { if (SB_ON) { setAreaP(a); return; } setAreaL(a); try { localStorage.setItem('salute-kit:gestao', a); } catch (e) {} };""",
        """  const area = bloqSel || (livres.some((x) => x[0] === area0) ? area0 : (livres[0] || [''])[0]);
  const pick = (a, trancada) => { if (trancada) { setBloqSel(a); return; } setBloqSel(null); if (SB_ON) { setAreaP(a); return; } setAreaL(a); try { localStorage.setItem('salute-kit:gestao', a); } catch (e) {} };""")
s = rep(s, """        {areas.map(([k, l, ic, d]) => {
          const on = area === k;
          return (
            <button key={k} type="button" onClick={() => pick(k)} aria-pressed={on} style={{""", """        {areas.map(([k, l, ic, d, trancada]) => {
          const on = area === k;
          return (
            <button key={k} type="button" onClick={() => pick(k, trancada)} aria-pressed={on} aria-label={trancada ? l + ', sem acesso' : undefined} title={trancada ? 'Sem acesso a ' + l : undefined} style={{ opacity: trancada && !on ? 0.72 : 1,""")
s = rep(s, """              <span style={{ minWidth: 0 }}><span style={{ display: 'block', fontSize: 17, fontWeight: 600 }}>{l}</span>{mobile ? null : <span style={{ fontSize: 13, opacity: .8 }}>{d}</span>}</span>
            </button>""", """              <span style={{ minWidth: 0, flex: 1 }}><span style={{ display: 'block', fontSize: 17, fontWeight: 600 }}>{l}</span>{mobile ? null : <span style={{ fontSize: 13, opacity: .8 }}>{trancada ? 'Sem acesso para o seu usuário' : d}</span>}</span>
              {trancada ? <span style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: on ? 'rgba(255,255,255,.22)' : '#fff', color: on ? '#fff' : '#6B7A93', boxShadow: on ? 'none' : '0 3px 8px -3px rgba(23,73,170,.35)' }}><OIcon name="lock" size={14} /></span> : null}
            </button>""")
s = rep(s, """      {area === 'estoque' ? <EstoqueScreen mobile={mobile} /> : area === 'financeiro' ? <FinanceiroScreen mobile={mobile} /> : <section style={{ ...glass, padding: 30, fontSize: 15, color: 'var(--text-muted)' }}>Sem acesso a nenhuma área de Gestão.</section>}""",
        """      {bloqSel ? <SemAcesso titulo={(GESTAO_AREAS.find((x) => x[0] === bloqSel) || [0, 'esta área'])[1]} /> : area === 'estoque' ? <EstoqueScreen mobile={mobile} /> : area === 'financeiro' ? <FinanceiroScreen mobile={mobile} /> : <SemAcesso titulo="Gestão" />}""")
# ---------- Configurações: abas sem permissão aparecem com cadeado ----------
s = rep(s, """  const { can, member } = useAccess();
  const tabs = CONFIG_TABS.filter(([k]) => can('perfil.' + k));
  const [tab, setTab] = SB_ON ? usePrefFiltro('config.aba', (tabs[0] || ['conta'])[0]) : React.useState(() => (tabs[0] || ['conta'])[0]);
  React.useEffect(() => { if (tabs.length && !tabs.some((t) => t[0] === tab)) setTab(tabs[0][0]); }, [member && member.id]);
  if (!tabs.length) return <section style={{ ...glass, padding: 30, fontSize: 15, color: 'var(--text-muted)' }}>Sem acesso a nenhuma área de Configurações.</section>;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 14 : 22 }}>
      <GTabs items={tabs} value={tab} onChange={setTab} />""", """  const { can, member } = useAccess();
  const tabs = CONFIG_TABS.filter(([k]) => can('perfil.' + k));
  const todas = CONFIG_TABS.map(([k, l, ic]) => (can('perfil.' + k) ? [k, l, ic] : [k, l, 'lock']));
  const [tab, setTab] = SB_ON ? usePrefFiltro('config.aba', (tabs[0] || ['conta'])[0]) : React.useState(() => ABA_CONFIG.v || (tabs[0] || ['conta'])[0]);
  const [pedida] = useStore(ABA_CONFIG);
  React.useEffect(() => { if (pedida) { if (pedida !== tab) setTab(pedida); ABA_CONFIG.v = null; } }, [pedida]);
  React.useEffect(() => { if (tabs.length && !tabs.some((t) => t[0] === tab)) setTab(tabs[0][0]); }, [member && member.id]);
  const trancada = !can('perfil.' + tab), nomeAba = (CONFIG_TABS.find((x) => x[0] === tab) || [0, 'esta aba'])[1];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 14 : 22 }}>
      <GTabs items={todas} value={tab} onChange={setTab} />
      {trancada ? <SemAcesso titulo={nomeAba} /> : null}""")
for k in ['cadastro', 'canais', 'flix', 'parcerias', 'cert']:
    pass
s = rep(s, """      {tab === 'cadastro' ? <CadastroTab mobile={mobile} /> : null}
      {tab === 'canais' ? <CanaisTab mobile={mobile} /> : null}
      {tab === 'flix' ? <SaluteflixTab mobile={mobile} /> : null}
      {tab === 'parcerias' ? <ParceriasTab mobile={mobile} /> : null}
      {tab === 'cert' ? <CertificacoesTab mobile={mobile} /> : null}
      {tab === 'conta' ? <PerfilScreen mobile={mobile} /> : null}""", """      {trancada ? null : <>
      {tab === 'cadastro' ? <CadastroTab mobile={mobile} /> : null}
      {tab === 'canais' ? <CanaisTab mobile={mobile} /> : null}
      {tab === 'flix' ? <SaluteflixTab mobile={mobile} /> : null}
      {tab === 'parcerias' ? <ParceriasTab mobile={mobile} /> : null}
      {tab === 'cert' ? <CertificacoesTab mobile={mobile} /> : null}
      {tab === 'conta' ? <PerfilScreen mobile={mobile} /> : null}
      </>}""")
# ---------- Clínica: CPF para quem cadastrou com CPF ----------
s = rep(s, "resp: 'Dra. Camila Rocha', cnpj: '12.345.678/0001-90', email: 'contato@bellaforma.com.br',", "resp: 'Dra. Camila Rocha', cnpj: '12.345.678/0001-90', cpf: '', email: 'contato@bellaforma.com.br',")
s = rep(s, "{inp('cnpj', 'CNPJ', { inputMode: 'numeric' })}{inp('email', 'E-mail', { type: 'email', iconLeft: 'mail' })}",
        "{inp('cnpj', 'CNPJ', { inputMode: 'text' })}{inp('cpf', 'CPF', { inputMode: 'numeric', placeholder: 'Para quem atende como pessoa física' })}{inp('email', 'E-mail', { type: 'email', iconLeft: 'mail' })}")
# ---------- arquivos enviados pelo paciente (QR Code ou link) aparecem sozinhos no prontuário ----------
s = rep(s, """  }); }, [p.dbId]);
  const [hist, setHist] = React.useState(() => SB_ON ? [] : [""", """  }); }, [p.dbId]);
  React.useEffect(() => { if (!SB_ON || !p.dbId) return undefined; return tempoReal('docs-ficha', ['documentos_paciente'], (t, ev) => {
    const row = ev.new || {}; if (ev.eventType !== 'INSERT' || row.paciente_id !== p.dbId || row.origem !== 'link_paciente') return;
    ProntSvc.carregar(p).then((pr) => { setDocs(pr.docs); setFolders(pr.folders); pastasRef.current = pr.pastas; }).catch(() => {});
  }); }, [p.dbId]);
  const [hist, setHist] = React.useState(() => SB_ON ? [] : [""")
s = rep(s, """  const [copied, setCopied] = React.useState(false);
  const upRef = React.useRef(null);
  const list = docs.filter((d) => folder === 'Todos' || d.folder === folder);""", """  const [copied, setCopied] = React.useState(false);
  const upRef = React.useRef(null);
  const list = docs.filter((d) => folder === 'Todos' || d.folder === folder);
  const qrBase = React.useRef(0);
  React.useEffect(() => { if (qr) qrBase.current = docs.length; }, [qr]);
  const chegaram = qr ? Math.max(0, docs.length - qrBase.current) : 0;""")
s = rep(s, "boxShadow: '0 0 0 4px rgba(45,191,106,.2)' }} />Aguardando arquivos. O link vale por 24 horas.</div>",
        "boxShadow: '0 0 0 4px rgba(45,191,106,.2)' }} />{chegaram ? (chegaram === 1 ? '1 arquivo recebido. Já está no prontuário.' : chegaram + ' arquivos recebidos. Já estão no prontuário.') : 'Aguardando arquivos. O link vale por 24 horas.'}</div>")
for x in ['new Date(2026, 9, 2)', "'02/10/2026';\n", 'sameDay(now, TODAY)']:
    assert x not in s, x
open(P, 'w', encoding='utf8').write(s)

M = 'mens_patched.jsx'
m = open(M, encoding='utf8').read()
m = rep(m, "const nowHM2 = () => { const d = new Date(); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); };", "const nowHM2 = () => BR.agoraHM(); // hora atual em Brasília")
m = rep(m, "const crmAt = (d, hm) => { const x = addD(TODAY, d); const [h, m] = hm.split(':'); x.setHours(+h, +m, 0, 0); return x.getTime(); };", "const crmAt = (d, hm) => BR.instante(isoOf(addD(TODAY, d)), hm).getTime();")
m = rep(m, "const crmWhen = (t) => { const d = new Date(t); return CRM_WD[d.getDay()] + ', ' + String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + ' · ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); };",
        "const crmWhen = (t) => { const d = BR.partes(t); return CRM_WD[d.dow] + ', ' + String(d.dia).padStart(2, '0') + '/' + String(d.mes).padStart(2, '0') + ' · ' + d.hm; };")
open(M, 'w', encoding='utf8').write(m)
print('patch_novo ok')
