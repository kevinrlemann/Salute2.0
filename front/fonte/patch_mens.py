# Liga Mensagens (pacientes e equipe) e CRM ao Supabase sem mudar o visual.
import sys
P = 'mens_patched.jsx'
s = open('bk_v22/mens_patched.jsx', encoding='utf8').read()
def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n: sys.exit('esperava %d, achei %d:\n%s' % (n, c, old[:200]))
    s = s.replace(old, new)

# ---------- chat compartilhado ----------
rep("""  const msgs = all[chatKey] || chatGet(chatKey, seed);
  const typing = !!typingMap[chatKey];""", """  const msgs = all[chatKey] || (SB_ON ? [] : chatGet(chatKey, seed));
  const typing = !!typingMap[chatKey];
  React.useEffect(() => { if (SB_ON) abrirChat(chatKey); }, [chatKey]);""")
rep("  const send = (msg) => { chatSend(chatKey, { ...msg, ...replyOf() }, contactName); setReply(null); };",
    "  const send = (msg) => { if (SB_ON) MsgSvc.enviar(chatKey, { ...msg, ...replyOf() }, contactName); else chatSend(chatKey, { ...msg, ...replyOf() }, contactName); setReply(null); };")
rep("    if (act === 'react') chatSet(chatKey, (l) => l.map((x) => x.id === m.id ? { ...x, react: x.react === r ? null : r } : x));\n    if (act === 'delete') chatSet(chatKey, (l) => l.map((x) => x.id === m.id ? { ...x, deleted: true, react: null } : x));",
    "    if (act === 'react') { if (SB_ON) MsgSvc.reagir(chatKey, m, r); else chatSet(chatKey, (l) => l.map((x) => x.id === m.id ? { ...x, react: x.react === r ? null : r } : x)); }\n    if (act === 'delete') { if (SB_ON) MsgSvc.apagar(chatKey, m); else chatSet(chatKey, (l) => l.map((x) => x.id === m.id ? { ...x, deleted: true, react: null } : x)); }")

# ---------- CRM ----------
rep("""    setLeads((all) => all.map((x) => x.id === l.id ? { ...x, ia } : x));""", """    setLeads((all) => all.map((x) => x.id === l.id ? { ...x, ia } : x));
    if (SB_ON) bg(CrmSvc.ia(l, ia), () => setLeads((all) => all.map((x) => x.id === l.id ? { ...x, ia: !ia } : x)));""")
rep("""    setLeads((l) => l.map((x) => x.id === id ? { ...x, stage: to, motivo: undefined } : x));
  };""", """    const antes = leads.find((x) => x.id === id);
    setLeads((l) => l.map((x) => x.id === id ? { ...x, stage: to, motivo: undefined } : x));
    if (SB_ON && antes) bg(CrmSvc.mover(antes, to), () => setLeads((l) => l.map((x) => x.id === id ? { ...x, stage: antes.stage, motivo: antes.motivo } : x)));
  };""")
rep("onClick={() => { setLeads((l) => l.map((x) => x.id === lost ? { ...x, stage: 'perdido', motivo } : x)); setLost(null); }}>Confirmar</CrmBtn>",
    "onClick={() => { const antes = leads.find((x) => x.id === lost); setLeads((l) => l.map((x) => x.id === lost ? { ...x, stage: 'perdido', motivo } : x)); if (SB_ON && antes) bg(CrmSvc.mover(antes, 'perdido', motivo), () => setLeads((l) => l.map((x) => x.id === antes.id ? { ...x, stage: antes.stage, motivo: antes.motivo } : x))); setLost(null); }}>Confirmar</CrmBtn>")

# ---------- tela de Mensagens (só na versão WhatsApp, depois de MensagensWA) ----------
_i = s.index('function MensagensWA(')
_head, s = s[:_i], s[_i:]
rep("""function MensagensWA({ mobile }) {
  const [tab, setTabRaw] = React.useState('p');
  const [ficha, setFicha] = React.useState(null);
  const [crm, setCrm] = React.useState(false);
  const [q, setQ] = React.useState('');
  const [sel, setSel] = React.useState(mobile ? null : 3);""", """function MensagensWA({ mobile }) {
  const [tab, setTabRaw] = SB_ON ? usePrefFiltro('mensagens.aba', 'p') : React.useState('p');
  const [ficha, setFicha] = React.useState(null);
  const [crm, setCrm] = SB_ON ? usePrefFiltro('mensagens.crm', false) : React.useState(false);
  const [q, setQ] = React.useState('');
  const [sel, setSel] = React.useState(mobile || SB_ON ? null : 3);
  useStore(MSG_LISTA);
  const carga = useCarga('mensagens');
  const cargaCrm0 = useCarga('crm');
  const cargaCrm = SB_ON && crm ? cargaCrm0 : 'ok';""")
rep("  const setTab = (k) => { setTabRaw(k); setSel(mobile ? null : k === 'p' ? 3 : 101); };",
    "  const setTab = (k) => { setTabRaw(k); setSel(mobile ? null : SB_ON ? ((k === 'p' ? INBOX : EQUIPE)[0] || {}).id || null : k === 'p' ? 3 : 101); };")
rep("""  const keyOf = (c) => 'c' + c.id;
  const seedOf = (c) => () => (c.msgs || BASE).map((x) => ({ ...x }));
  const msgsOf = (c) => all[keyOf(c)] || chatGet(keyOf(c), seedOf(c));
  const typingOf = (c) => !!typingMap[keyOf(c)];
  const unreadOf = (c) => read[c.id] ? 0 : c.u;""", """  const keyOf = (c) => SB_ON ? (isTeam ? 'eq:' : 'conv:') + c.id : 'c' + c.id;
  const seedOf = (c) => () => SB_ON ? [] : (c.msgs || BASE).map((x) => ({ ...x }));
  const msgsOf = (c) => all[keyOf(c)] || (SB_ON ? [] : chatGet(keyOf(c), seedOf(c)));
  const typingOf = (c) => !!typingMap[keyOf(c)];
  const unreadOf = (c) => SB_ON ? (c.id === sel ? 0 : c.u) : read[c.id] ? 0 : c.u;""")
rep("  React.useEffect(() => { if (sel) setRead((r) => ({ ...r, [sel]: true })); }, [sel]);",
    "  React.useEffect(() => { if (sel) setRead((r) => ({ ...r, [sel]: true })); if (SB_ON && sel) MsgSvc.marcarLida(ALL.find((c) => c.id === sel), isTeam).catch(() => {}); }, [sel]);\n  React.useEffect(() => { if (SB_ON && !mobile && !sel && ALL[0] && carga === 'ok') setSel(ALL[0].id); }, [carga, tab, ALL.length]);")
rep("<button type=\"button\" disabled={isTeam} onClick={() => setFicha({ p: waPaciente(cur), key: keyOf(cur), name: cur.n })}",
    "<button type=\"button\" disabled={isTeam} onClick={() => { if (SB_ON) { MsgSvc.pacienteDaConversa(cur).then((p) => setFicha({ p, key: keyOf(cur), name: cur.n })).catch(() => {}); return; } setFicha({ p: waPaciente(cur), key: keyOf(cur), name: cur.n }); }}")
rep("      <CrmBoard mobile={mobile} onOpen={(l) => setFicha({ p: crmPaciente(l), key: 'lead:' + l.id, name: crmName(l), conv: crmConversa(l), tab: 'conversa' })} />",
    "      {cargaCrm !== 'ok' ? <div style={{ padding: 16 }}><CargaEstado estado={cargaCrm} compact onRetry={() => carregar('crm', true)} /></div> : <CrmBoard mobile={mobile} onOpen={(l) => { if (SB_ON) { CrmSvc.paciente(l).then((p) => setFicha({ p, key: l.conversaId ? chaveConv(l.conversaId) : MsgSvc.chavePaciente(p), name: crmName(l), conv: [], tab: 'conversa' })).catch(() => {}); return; } setFicha({ p: crmPaciente(l), key: 'lead:' + l.id, name: crmName(l), conv: crmConversa(l), tab: 'conversa' }); }} />}")
rep("  if (mobile) return <><div style={{ ...frame, height: 'calc(100vh - 190px)', minHeight: 520 }}>{cur ? thread : list}</div>{fichaEl}</>;",
    "  if (SB_ON && carga !== 'ok') return <CargaEstado estado={carga} onRetry={() => carregar('mensagens', true)} />;\n  if (mobile) return <><div style={{ ...frame, height: 'calc(100vh - 190px)', minHeight: 520 }}>{cur ? thread : list}</div>{fichaEl}</>;")

s = _head + s
open(P, 'w', encoding='utf8').write(s)
print('ok mensagens')
