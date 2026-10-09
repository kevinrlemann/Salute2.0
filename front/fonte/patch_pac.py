# Liga Pacientes, Prontuário, Agenda rápida, Agenda e Modelos de anamnese ao Supabase.
# Só troca de onde os dados vêm e para onde vão; o visual fica igual.
import sys
P = 'pacientes_patched.jsx'
s = open('bk_v22/pacientes_patched.jsx', encoding='utf8').read()
def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n: sys.exit('esperava %d ocorrência(s), achei %d:\n%s' % (n, c, old[:200]))
    s = s.replace(old, new)

# ---------- datas que passam a ser a de hoje no modo conectado ----------
rep("const HOJE = '02/10/2026';", "let HOJE = '02/10/2026';")
rep("const TODAY_ISO = isoOf(TODAY);", "let TODAY_ISO = isoOf(TODAY);")

# ---------- lista de pacientes vira store ----------
rep("const FILTER_DEFS = [", "const PAC_STORE = makeStore(PAC);\nconst FILTER_DEFS = [")

# ---------- modelos e imagens ----------
rep("const isImg = (bg) => typeof bg === 'string' && (bg.startsWith('data:') || bg.startsWith('blob:'));",
    "const isImg = (bg) => typeof bg === 'string' && (bg.startsWith('data:') || bg.startsWith('blob:') || /^https?:/.test(bg));")
rep("if (f) { const src = await readFile(f); setModels((l) => [...l, { id: 'm' + Date.now(), name: f.name.replace(/\\.[^.]+$/, ''), src }]); onPick(src, 'modelo'); } e.target.value = ''; }}",
    "if (f) { const src = await readFile(f); const nm = f.name.replace(/\\.[^.]+$/, ''); const mid = 'm' + Date.now(); setModels((l) => [...l, { id: mid, name: nm, src }]); onPick(src, 'modelo'); if (SB_ON) ProntSvc.addModelo(src, nm).then((dbId) => setModels((l) => l.map((x) => x.id === mid ? { ...x, dbId } : x))).catch(() => {}); } e.target.value = ''; }}")

# ---------- Agendamento rápido ----------
rep("  const prox = appts.filter((a) => a.pac === p.nome && a.date >= TODAY_ISO).sort((a, b) => (a.date + a.h).localeCompare(b.date + b.h))[0];",
    "  const prox = appts.filter((a) => (SB_ON ? a.pacId === p.dbId && a.status !== 'cancelado' && (a.date > TODAY_ISO || (a.date === TODAY_ISO && new Date(a.ini) >= new Date())) : a.pac === p.nome && a.date >= TODAY_ISO)).sort((a, b) => (a.date + String(a.h).padStart(2, '0') + String(a.m || 0).padStart(2, '0')).localeCompare(b.date + String(b.h).padStart(2, '0') + String(b.m || 0).padStart(2, '0')))[0];\n  const proxPro = prox ? (prox.profId ? (PROS.find((x) => x.id === prox.profId) || { n: '' }).n : PROS[prox.col].n) : '';\n  const proxHora = prox ? (prox.ini ? BR.hm(prox.ini) : qHH(prox.h)) : '';\n  const [salvando, setSalvando] = React.useState(false);")
rep("""  const confirmar = () => {
    if (h == null) return;
    const pro = PROS[col].n, first = p.nome.split(' ')[0];
    APPT_STORE.v = [...APPT_STORE.v, { id: Date.now(), pac: p.nome, col, date: isoOf(day), h, proc }]; APPT_STORE.subs.forEach((f) => f());""",
"""  const confirmar = async () => {
    if (h == null || salvando) return;
    const pro = PROS[col].n, first = p.nome.split(' ')[0];
    if (SB_ON) {
      setSalvando(true);
      const ini = new Date(day); ini.setHours(h, 0, 0, 0);
      try { await AgSvc.criar({ pacienteId: p.dbId, profissionalId: PROS[col].id, inicio: ini, minutos: proc ? PROC_DUR[proc] : 60, procedimento: proc, duplicado: !!conflito, whatsapp: zap, tipo: 'consulta' }); } catch (e) { setSalvando(false); return; }
      setSalvando(false);
    } else { APPT_STORE.v = [...APPT_STORE.v, { id: Date.now(), pac: p.nome, col, date: isoOf(day), h, proc }]; APPT_STORE.subs.forEach((f) => f()); }""")
rep("{prox ? `${qDia(new Date(prox.date + 'T00:00:00'))} às ${qHH(prox.h)} com ${PROS[prox.col].n}` : 'Nenhuma consulta marcada'}",
    "{prox ? `${qDia(new Date(prox.date + 'T00:00:00'))} às ${proxHora} com ${proxPro}` : 'Nenhuma consulta marcada'}")
rep("<OBtn size=\"sm\" iconLeft={conflito ? 'triangle-alert' : 'check'} disabled={h == null} onClick={confirmar}>",
    "<OBtn size=\"sm\" iconLeft={conflito ? 'triangle-alert' : 'check'} disabled={h == null} loading={salvando} onClick={confirmar}>")
rep("<OSelect label=\"Procedimento (opcional)\" options={['Não informado', ...FIN_PROCS.map((f) => f.n)]}", "<OSelect label=\"Procedimento (opcional)\" options={['Não informado', ...FIN_PROCS.map((f) => f.n)]}")

# ---------- Anamnese na ficha ----------
rep("const useAnamModels = () => { if (ANAM_STORE.v === null) ANAM_STORE.v = ANAM0; return useStore(ANAM_STORE); };",
    "const useAnamModels = () => { if (ANAM_STORE.v === null) ANAM_STORE.v = SB_ON ? [] : ANAM0; return useStore(ANAM_STORE); };")
rep("""  const m = models.find((x) => x.id === sel);
  const link = m ? `salute.app/a/${slug(m.nome)}/${onlyDigits(p.cpf).slice(0, 3)}${onlyDigits(p.cpf).slice(-2)}` : '';
  const saveNew = () => { if (!ed.nome.trim()) return; const n = { ...ed, nome: ed.nome.trim(), qs: ed.qs.filter((q) => q.t.trim()) }; setModels((l) => [...l, n]); setSel(n.id); setEd(null); };""",
"""  React.useEffect(() => { if (!sel && models[0]) setSel(models[0].id); }, [models.length]);
  const m = models.find((x) => x.id === sel);
  const [envio, setEnvio] = React.useState(null);
  const [gerando, setGerando] = React.useState(false);
  const link = SB_ON ? (m && envio && envio.m === m.id ? envio.link : '') : m ? `salute.app/a/${slug(m.nome)}/${onlyDigits(p.cpf).slice(0, 3)}${onlyDigits(p.cpf).slice(-2)}` : '';
  const garantirEnvio = async () => { if (!SB_ON) return { link }; if (envio && envio.m === m.id) return envio; setGerando(true); try { const r = await ProntSvc.enviarAnamnese(p, m.nome); const e = { m: m.id, ...r }; setEnvio(e); return e; } finally { setGerando(false); } };
  const copiar = async () => { try { const e = await garantirEnvio(); navigator.clipboard && navigator.clipboard.writeText('https://' + e.link); setCopied(true); } catch (x) {} };
  const enviar = async () => { try { const e = await garantirEnvio(); onSend(m, e.link, e.id); } catch (x) {} };
  const saveNew = async () => { if (!ed.nome.trim()) return; const n = { ...ed, nome: ed.nome.trim(), qs: ed.qs.filter((q) => q.t.trim()) }; if (SB_ON) { try { const sv = await AnamSvc.salvar(n); setModels((l) => [...l, sv]); setSel(sv.id); setEd(null); } catch (e) {} return; } setModels((l) => [...l, n]); setSel(n.id); setEd(null); };""")
rep("<OBtn size=\"sm\" variant=\"secondary\" iconLeft={copied ? 'check' : 'copy'} onClick={() => { try { navigator.clipboard && navigator.clipboard.writeText('https://' + link); } catch (e) {} setCopied(true); }}>{copied ? 'Copiado' : 'Copiar link'}</OBtn>\n            <OBtn size=\"sm\" iconLeft=\"send\" onClick={() => onSend(m, link)}>Enviar no WhatsApp</OBtn>",
    "<OBtn size=\"sm\" variant=\"secondary\" iconLeft={copied ? 'check' : 'copy'} onClick={copiar}>{copied ? 'Copiado' : 'Copiar link'}</OBtn>\n            <OBtn size=\"sm\" iconLeft=\"send\" loading={gerando} onClick={enviar}>Enviar no WhatsApp</OBtn>")

# ---------- Documentos ----------
rep("function DocsWorkspace({ p, docs, setDocs, folders, setFolders, onUploaded, onSendLink, onBack, wide }) {",
    "function DocsWorkspace({ p, docs, setDocs, folders, setFolders, onUploaded, onSendLink, onBack, wide, pastas = [] }) {")
rep("  const addFiles = (fs) => { const arr = Array.from(fs || []); if (!arr.length) return; const nd = arr.map((f, i) => ({ id: 'u' + Date.now() + i, name: f.name, folder: target, date: HOJE, type: /pdf$/i.test(f.type) || /\\.pdf$/i.test(f.name) ? 'pdf' : 'img', url: f.type.startsWith('image/') ? URL.createObjectURL(f) : null })); setDocs((d) => [...nd, ...d]); onUploaded(nd, target); };",
    "  const addFiles = (fs) => { const arr = Array.from(fs || []); if (!arr.length) return; const nd = arr.map((f, i) => ({ id: 'u' + Date.now() + i, name: f.name, folder: target, date: HOJE, type: /pdf$/i.test(f.type) || /\\.pdf$/i.test(f.name) ? 'pdf' : 'img', url: f.type.startsWith('image/') ? URL.createObjectURL(f) : null })); setDocs((d) => [...nd, ...d]); onUploaded(nd, target);\n    if (SB_ON) ProntSvc.enviarArquivos(p, arr, target, pastas).then((rs) => setDocs((d) => d.map((x) => { const i = nd.findIndex((y) => y.id === x.id); return i >= 0 && rs[i] ? { ...x, dbId: rs[i].id, path: rs[i].path } : x; }))).catch(() => setDocs((d) => d.filter((x) => !nd.some((y) => y.id === x.id)))); };\n  const [linkR, setLinkR] = React.useState(null);\n  React.useEffect(() => { if (!SB_ON || !qr || !qrFolder) return; let vivo = true; setLinkR(null); ProntSvc.linkDocumentos(p, qrFolder, pastas).then((l) => vivo && setLinkR(l)).catch(() => {}); return () => { vivo = false; }; }, [qr, qrFolder]);")
rep("  const link = `salute.app/u/${onlyDigits(p.cpf).slice(0, 3)}${slug(qrFolder || '')}`;",
    "  const link = SB_ON ? (linkR || '') : `salute.app/u/${onlyDigits(p.cpf).slice(0, 3)}${slug(qrFolder || '')}`;")
rep("onKeyDown={(e) => { if (e.key === 'Enter' && nf.trim()) { setFolders([...folders, nf.trim()]); setFolder(nf.trim()); setNf(null); }",
    "onKeyDown={(e) => { if (e.key === 'Enter' && nf.trim()) { setFolders([...folders, nf.trim()]); setFolder(nf.trim()); if (SB_ON) ProntSvc.pastaId(p, nf.trim(), pastas).catch(() => {}); setNf(null); }")
rep("<select value={cur.folder} onChange={(e) => setDocs((ds) => ds.map((x) => x.id === cur.id ? { ...x, folder: e.target.value } : x))}",
    "<select value={cur.folder} onChange={(e) => { const nfo = e.target.value; setDocs((ds) => ds.map((x) => x.id === cur.id ? { ...x, folder: nfo } : x)); if (SB_ON && cur.dbId && cur.type !== 'compare') ProntSvc.moverDoc(p, cur, nfo, pastas).catch(() => {}); }}")
rep("<button type=\"button\" onClick={() => { setDocs((ds) => ds.filter((x) => x.id !== cur.id)); setView(null); }}",
    "<button type=\"button\" onClick={() => { setDocs((ds) => ds.filter((x) => x.id !== cur.id)); setView(null); if (SB_ON && cur.dbId) (cur.type === 'compare' ? DB.del('comparacoes_antes_depois', cur.dbId) : ProntSvc.excluirDoc(cur)).catch(() => {}); }}")
rep("<FakeQR seed={p.cpf + qrFolder} size={168} />", "{SB_ON ? (link ? <QRCodigo valor={'https://' + link} size={168} /> : <div style={{ width: 168, height: 168, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 13 }}>Gerando...</div>) : <FakeQR seed={p.cpf + qrFolder} size={168} />}")
rep("<OBtn variant=\"secondary\" iconLeft={copied ? 'check' : 'copy'} onClick={() => { try { navigator.clipboard && navigator.clipboard.writeText('https://' + link); } catch (e) {} setCopied(true); }}>{copied ? 'Copiado' : 'Copiar link'}</OBtn>\n            <OBtn iconLeft=\"send\" onClick={() => { onSendLink(link, qrFolder); setQr(false); }}>Enviar link no WhatsApp</OBtn>",
    "<OBtn variant=\"secondary\" disabled={!link} iconLeft={copied ? 'check' : 'copy'} onClick={() => { try { navigator.clipboard && navigator.clipboard.writeText('https://' + link); } catch (e) {} setCopied(true); }}>{copied ? 'Copiado' : 'Copiar link'}</OBtn>\n            <OBtn iconLeft=\"send\" disabled={!link} onClick={() => { onSendLink(link, qrFolder); setQr(false); }}>Enviar link no WhatsApp</OBtn>")
rep("        setDocs((d) => [cmp, ...fresh, ...d]); onUploaded([cmp], 'Antes e Depois'); setAb(false); setFolder('Antes e Depois');",
    "        setDocs((d) => [cmp, ...fresh, ...d]); onUploaded([cmp], 'Antes e Depois'); setAb(false); setFolder('Antes e Depois');\n        if (SB_ON) ProntSvc.salvarComparacao(p, a, b, pastas).then((id) => setDocs((d) => d.map((x) => x.id === cmp.id ? { ...x, dbId: id } : x))).catch(() => {});")

# ---------- Prontuário: registros ----------
rep("function ProntuarioTab({ p, recs, setRecs, docs, setDocs, folders, setFolders, onEvent, mobile, wide, setWork }) {",
    "function ProntuarioTab({ p, recs, setRecs, docs, setDocs, folders, setFolders, onEvent, mobile, wide, setWork, pastas }) {\n  const filaMapa = React.useRef({});")
rep("""  if (view.v === 'anamnese') return <AnamneseWorkspace p={p} wide={wide} onBack={back} onSend={(m, link) => {
    addRec({ kind: 'anamnese', title: m.nome, status: 'pendente', link });""",
"""  if (view.v === 'anamnese') return <AnamneseWorkspace p={p} wide={wide} onBack={back} onSend={(m, link, envioId) => {
    addRec({ kind: 'anamnese', title: m.nome, status: 'pendente', link, dbId: envioId });
    if (SB_ON) ANAM_STORE.v = (ANAM_STORE.v || []).map((x) => x.id === m.id ? { ...x, usos: (x.usos || 0) + 1 } : x);""")
rep("""  if (view.v === 'mapa') return <MapEditor initial={view.rec} wide={wide} onBack={back} onSave={(r) => {
    if (r.id) { setRecs((a) => a.map((x) => x.id === r.id ? { ...x, ...r } : x)); return r.id; }
    const id = addRec(r); onEvent({ hist: { t: 'Mapeamento registrado: ' + r.title, c: KINDS.mapa.c }, toast: 'Mapeamento salvo no prontuário' }); return id;
  }} />;""",
"""  if (view.v === 'mapa') return <MapEditor initial={view.rec} wide={wide} onBack={back} onSave={(r) => {
    if (SB_ON) {
      const existe = !!r.id, id = r.id || novoId(), rr = { ...r, id, dbId: id };
      if (existe) setRecs((a) => a.map((x) => x.id === id ? { ...x, ...rr } : x));
      else { setRecs((a) => [{ ...rr, date: HOJE, ord: new Date().toISOString() }, ...a]); onEvent({ hist: { t: 'Mapeamento registrado: ' + r.title, c: KINDS.mapa.c, tipo: 'mapeamento', tabela: 'mapeamentos', registro: id }, toast: 'Mapeamento salvo no prontuário' }); }
      const ant = filaMapa.current[id] || Promise.resolve(existe);
      filaMapa.current[id] = ant.then((jaExiste) => ProntSvc.salvarMapa(p, rr, jaExiste).then(() => true), () => existe).catch(() => existe);
      return id;
    }
    if (r.id) { setRecs((a) => a.map((x) => x.id === r.id ? { ...x, ...r } : x)); return r.id; }
    const id = addRec(r); onEvent({ hist: { t: 'Mapeamento registrado: ' + r.title, c: KINDS.mapa.c }, toast: 'Mapeamento salvo no prontuário' }); return id;
  }} />;""")
rep("  if (view.v === 'proc') return <ProcWorkspace wide={wide} onBack={back} onSave={(r) => { addRec(r); onEvent({ hist: { t: 'Procedimento: ' + r.title, s: r.pro, c: KINDS.proc.c }, toast: 'Procedimento registrado' }); back(); }} />;",
    "  if (view.v === 'proc') return <ProcWorkspace wide={wide} onBack={back} onSave={async (r) => { if (SB_ON) { try { await ProntSvc.salvarProc(p, r); } catch (e) { return; } } addRec(r); onEvent({ hist: { t: 'Procedimento: ' + r.title, s: r.pro, c: KINDS.proc.c, tipo: 'procedimento' }, toast: 'Procedimento registrado' }); back(); }} />;")
rep("  if (view.v === 'docs') return <DocsWorkspace p={p} docs={docs} setDocs={setDocs} folders={folders} setFolders={setFolders} wide={wide} onBack={back}",
    "  if (view.v === 'docs') return <DocsWorkspace p={p} docs={docs} setDocs={setDocs} folders={folders} setFolders={setFolders} wide={wide} onBack={back} pastas={pastas}")

# ---------- Ficha do paciente ----------
rep("""  const ck = chatKey || ('pac:' + p.cpf);""", """  if (SB_ON) useStore(MSG_LISTA);
  React.useEffect(() => { if (SB_ON) carregar('mensagens'); }, []);
  const ck = chatKey || (SB_ON ? MsgSvc.chavePaciente(p) || 'pacc:' + p.dbId : 'pac:' + p.cpf);""")
rep("""  const [recs, setRecs] = React.useState(() => seedRecs(p));
  const [docs, setDocs] = React.useState(seedDocs);""", """  const [recs, setRecs] = React.useState(() => SB_ON ? [] : seedRecs(p));
  const [docs, setDocs] = React.useState(SB_ON ? [] : seedDocs);""")
rep("""  const [hist, setHist] = React.useState(() => [
    { t: 'Retorno agendado pela Renata IA', d: '02/10/2026', s: 'Terça 07/10 às 10h', c: '#7B4BC4' },""", """  const [pront, setPront] = React.useState(SB_ON ? 'carregando' : 'ok');
  const pastasRef = React.useRef([]);
  const carregarFicha = () => { if (!SB_ON || !p.dbId) return () => {}; let vivo = true; setPront('carregando');
    Promise.all([ProntSvc.carregar(p), PacSvc.historico(p), carregar('anamnese')]).then(([pr, h]) => { if (!vivo) return; setRecs(pr.recs); setDocs(pr.docs); setFolders(pr.folders); pastasRef.current = pr.pastas; setHist(h); setPront('ok'); }).catch(() => { if (vivo) setPront('erro'); });
    return () => { vivo = false; }; };
  React.useEffect(carregarFicha, [p.dbId]);
  const [hist, setHist] = React.useState(() => SB_ON ? [] : [
    { t: 'Retorno agendado pela Renata IA', d: '02/10/2026', s: 'Terça 07/10 às 10h', c: '#7B4BC4' },""")
rep("""    if (h) setHist((x) => [{ d: HOJE, ...h }, ...x]);
    if (msg) { chatGet(ck, chatSeed); chatSet(ck, (l) => [...l, { id: waUid(), me: true, t: nowHM(), text: msg, s: 'sent' }]); }""",
"""    if (h) { setHist((x) => [{ d: HOJE, ...h }, ...x]); PacSvc.hist(p, h); }
    if (msg) { if (SB_ON && window.MsgSvc) MsgSvc.enviarTextoPaciente(p, msg, ck); else { chatGet(ck, chatSeed); chatSet(ck, (l) => [...l, { id: waUid(), me: true, t: nowHM(), text: msg, s: 'sent' }]); } }""")
rep("""    setHist((h) => [{ t: 'WhatsApp alterado', d: HOJE, s: `${p.tel} para ${n}`, c: '#F2694A' }, ...h]);
    onUpdate({ ...p, tel: n, telAnt: [...(p.telAnt || []), p.tel] }); setTroca(false);""",
"""    const hh = { t: 'WhatsApp alterado', s: `${p.tel} para ${n}`, c: '#F2694A', tipo: 'telefone' };
    if (SB_ON) { PacSvc.trocarNumero(p, n).then((np) => { setHist((h) => [{ d: HOJE, ...hh }, ...h]); PacSvc.hist(p, hh); onUpdate(np); setTroca(false); }).catch(() => {}); return; }
    setHist((h) => [{ d: HOJE, ...hh }, ...h]);
    onUpdate({ ...p, tel: n, telAnt: [...(p.telAnt || []), p.tel] }); setTroca(false);""")
rep("  const saveDados = (d) => { setHist((h) => [{ t: 'Dados do paciente editados', d: HOJE, s: 'Dra. Camila Rocha', c: '#1F5EFF' }, ...h]); onUpdate(d); };",
    "  const saveDados = (d) => { const hh = { t: 'Dados do paciente editados', s: SB_ON ? quemSou() : 'Dra. Camila Rocha', c: '#1F5EFF', tipo: 'dados' };\n    if (SB_ON) { PacSvc.salvar(p, d).then((np) => { setHist((h) => [{ d: HOJE, ...hh }, ...h]); PacSvc.hist(p, hh); onUpdate(np); }).catch(() => {}); return; }\n    setHist((h) => [{ d: HOJE, ...hh }, ...h]); onUpdate(d); };")
rep("CPF {p.cpf} · {p.conv || 'Sem convênio'}", "CPF {p.cpf || 'não informado'} · {p.conv || 'Sem convênio'}")
rep("          {tab === 'pront' ? <ProntuarioTab p={p} recs={recs} setRecs={setRecs} docs={docs} setDocs={setDocs} folders={folders} setFolders={setFolders} onEvent={onEvent} mobile={mobile} wide={wide} setWork={setWork} /> : null}",
    "          {tab === 'pront' ? (pront !== 'ok' ? <CargaEstado estado={pront} compact onRetry={carregarFicha} /> : <ProntuarioTab p={p} recs={recs} setRecs={setRecs} docs={docs} setDocs={setDocs} folders={folders} setFolders={setFolders} onEvent={onEvent} mobile={mobile} wide={wide} setWork={setWork} pastas={pastasRef.current} />) : null}")

# ---------- Lista de pacientes ----------
rep("""function PacientesScreen({ mobile }) {
  const [list, setList] = React.useState(PAC);
  const [openId, setOpenId] = React.useState(null);
  const openP = list.find((x) => x.cpf === openId);""",
"""const NOVO_PAC = { nome: '', tipo: 'Particular', conv: 'Sem convênio', empresa: '', tel: '', nasc: '', sexo: 'Feminino', cpf: '' };
function PacientesScreen({ mobile }) {
  const [list] = useStore(PAC_STORE);
  const setList = (u) => { PAC_STORE.v = typeof u === 'function' ? u(PAC_STORE.v) : u; PAC_STORE.subs.forEach((f) => f()); };
  const carga = useCarga('pacientes');
  const [openId, setOpenId] = React.useState(null);
  const openP = list.find((x) => pk(x) === openId);
  const [nv, setNv] = React.useState(NOVO_PAC);
  const [salvandoNovo, setSalvandoNovo] = React.useState(false);
  const salvarNovo = async () => {
    if (!nv.nome.trim()) return;
    const d = { ...nv, nome: nv.nome.trim(), conv: nv.conv === 'Sem convênio' || nv.conv === 'Outro' ? '' : nv.conv, nasc: nv.nasc ? BR.dataTela(nv.nasc) : '' };
    if (SB_ON) { setSalvandoNovo(true); try { await PacSvc.criar(d); } catch (e) { setSalvandoNovo(false); return; } setSalvandoNovo(false); avisoOk('Paciente cadastrado', d.nome); }
    else setList((l) => [...l, d]);
    setNv(NOVO_PAC); setNovo(false);
  };""")
rep("<tr key={p.cpf} onClick={() => setOpenId(p.cpf)} style={{ cursor: 'pointer' }}", "<tr key={pk(p)} onClick={() => setOpenId(pk(p))} style={{ cursor: 'pointer' }}")
rep("onUpdate={(np) => setList((l) => l.map((x) => x.cpf === np.cpf ? np : x))} />", "onUpdate={(np) => setList((l) => l.map((x) => pk(x) === pk(np) ? np : x))} />")
rep("""        footer={<><OBtn variant="secondary" onClick={() => setNovo(false)}>Cancelar</OBtn><OBtn iconLeft="check" onClick={() => setNovo(false)}>Salvar paciente</OBtn></>}>""",
    """        footer={<><OBtn variant="secondary" onClick={() => setNovo(false)}>Cancelar</OBtn><OBtn iconLeft="check" disabled={!nv.nome.trim()} loading={salvandoNovo} onClick={salvarNovo}>Salvar paciente</OBtn></>}>""")
rep("""          <OInput label="Nome completo" placeholder="Ex.: Mariana Alves Costa" style={{ gridColumn: '1 / -1' }} />
          <OSelect label="Tipo" options={['Particular', 'Convênio', 'Empresarial']} />
          <OSelect label="Convênio" options={['Sem convênio', 'Unimed', 'Bradesco Saúde', 'SulAmérica', 'Amil', 'Outro']} />
          <OInput label="Empresa" placeholder="Se for paciente empresarial" />
          <OInput label="Telefone" iconLeft="phone" placeholder="(19) 99999-9999" inputMode="tel" />
          <OInput label="Data de nascimento" type="date" />
          <OSelect label="Sexo" options={['Feminino', 'Masculino', 'Prefiro não informar']} />
          <OInput label="CPF" placeholder="000.000.000-00" inputMode="numeric" style={{ gridColumn: '1 / -1' }} />""",
"""          <OInput label="Nome completo" placeholder="Ex.: Mariana Alves Costa" style={{ gridColumn: '1 / -1' }} value={nv.nome} onChange={(e) => setNv({ ...nv, nome: e.target.value })} />
          <OSelect label="Tipo" options={['Particular', 'Convênio', 'Empresarial']} value={nv.tipo} onChange={(e) => setNv({ ...nv, tipo: e.target.value })} />
          <OSelect label="Convênio" options={['Sem convênio', ...(SB_ON ? (CAT.v.convenios || []).filter((c) => c.ativo).map((c) => c.nome) : ['Unimed', 'Bradesco Saúde', 'SulAmérica', 'Amil']), 'Outro']} value={nv.conv} onChange={(e) => setNv({ ...nv, conv: e.target.value })} />
          <OInput label="Empresa" placeholder="Se for paciente empresarial" value={nv.empresa} onChange={(e) => setNv({ ...nv, empresa: e.target.value })} />
          <OInput label="Telefone" iconLeft="phone" placeholder="(19) 99999-9999" inputMode="tel" value={nv.tel} onChange={(e) => setNv({ ...nv, tel: e.target.value })} />
          <OInput label="Data de nascimento" type="date" value={nv.nasc} onChange={(e) => setNv({ ...nv, nasc: e.target.value })} />
          <OSelect label="Sexo" options={['Feminino', 'Masculino', 'Prefiro não informar']} value={nv.sexo} onChange={(e) => setNv({ ...nv, sexo: e.target.value })} />
          <OInput label="CPF" placeholder="000.000.000-00" inputMode="numeric" style={{ gridColumn: '1 / -1' }} value={nv.cpf} onChange={(e) => setNv({ ...nv, cpf: e.target.value })} />""")

rep("  const term = q.trim().toLowerCase();\n  const filterRows = (vals) => list.filter((p) => {",
    "  if (SB_ON && carga !== 'ok') return <section style={{ ...glass, padding: mobile ? 16 : 26, display: 'flex', flexDirection: 'column', gap: 16 }}><CardTitle size={mobile ? 19 : 22}>Lista de pacientes</CardTitle><CargaEstado estado={carga} compact onRetry={() => carregar('pacientes', true)} /></section>;\n  const term = q.trim().toLowerCase();\n  const filterRows = (vals) => list.filter((p) => {")

# ---------- Agenda ----------
rep("const slotsFor = (d) => { const iso = isoOf(d); return [...slotsBase(d),",
    "const slotsFor = (d) => { if (SB_ON) return agendaDoDia(d); const iso = isoOf(d); return [...slotsBase(d),")
rep("""function AgendaScreen({ mobile, onNew }) {
  const narrow = useNarrow();
  useStore(APPT_STORE);""", """function AgendaScreen({ mobile, onNew }) {
  const narrow = useNarrow();
  useStore(APPT_STORE); useStore(CAT);
  const carga = useCarga('agenda');""")
rep("""  const [pros, setPros] = React.useState(PROS.map((p) => p.n));
  const RH = 96;""", """  const [pros0, setPros] = SB_ON ? usePrefFiltro('agenda.profissionais', null) : React.useState(PROS.map((p) => p.n));
  const prosOk = (pros0 || []).filter((n) => PROS.some((p) => p.n === n));
  const pros = SB_ON ? (prosOk.length ? prosOk : PROS.map((p) => p.n)) : pros0;
  React.useEffect(() => { if (SB_ON && view === 'Mês') agendaGarantirMes(month); }, [month, view]);
  const RH = 96;""")
rep("  const one = mobile || narrow;\n  const picker = <ProsPicker sel={pros} setSel={setPros} counts={countPro} compact={one} />;",
    """  const one = mobile || narrow;
  const picker = <ProsPicker sel={pros} setSel={setPros} counts={countPro} compact={one} />;
  const h0 = Math.min(9, ...daySlots.map((s) => Math.floor(9 + s.row))), h1 = Math.max(15, ...daySlots.map((s) => Math.ceil(9 + s.row + (s.span || 0.9))));
  const horas = Array.from({ length: h1 - h0 }, (_, i) => h0 + i);
  const agoraH = SB_ON ? new Date().getHours() + new Date().getMinutes() / 60 : 10.45;
  const resumo = SB_ON ? agendaResumo(day) : null;
  if (SB_ON && carga !== 'ok') return <CargaEstado estado={carga} onRetry={() => carregar('agenda', true)} />;""")
rep("<div>{[9, 10, 11, 12, 13, 14].map((h) => <div key={h}", "<div>{horas.map((h) => <div key={h}")
rep("{[0, 1, 2, 3, 4, 5].map((r) => <div key={r} style={{ height: RH,", "{horas.map((r) => <div key={r} style={{ height: RH,")
rep("{daySlots.filter((s) => s.col === pc.col).map((s) => (\n                    <div key={s.n} style={{ position: 'absolute', left: 6, right: 6, top: s.row * RH + 6,",
    "{daySlots.filter((s) => s.col === pc.col).map((s) => (\n                    <div key={s.id || s.n} style={{ position: 'absolute', left: 6, right: 6, top: (9 + s.row - h0) * RH + 6,")
rep("<span style={{ fontSize: 13, color: 'var(--text-strong)' }}>{String(9 + s.row).padStart(2, '0')}:00 às {String(9 + s.row + Math.max(1, Math.round(s.span || 1))).padStart(2, '0')}:00</span>",
    "<span style={{ fontSize: 13, color: 'var(--text-strong)' }}>{s.hi ? s.hi + ' às ' + s.hf : <>{String(9 + s.row).padStart(2, '0')}:00 às {String(9 + s.row + Math.max(1, Math.round(s.span || 1))).padStart(2, '0')}:00</>}</span>")
rep("{sameDay(day, TODAY) ? <div style={{ position: 'absolute', left: 72, right: 0, top: RH * 1.45,",
    "{sameDay(day, TODAY) && agoraH >= h0 && agoraH <= h1 ? <div style={{ position: 'absolute', left: 72, right: 0, top: RH * (agoraH - h0),")
rep("""          <CardTitle size={20} right={<Legend items={[['Consulta', '#1F5EFF'], ['Reunião', '#F2694A']]} />}>Atividade mensal</CardTitle>
          <MonthGrid compact />""", """          <CardTitle size={20} right={<Legend items={[['Consulta', '#1F5EFF'], ['Reunião', '#F2694A']]} />}>Atividade mensal</CardTitle>
          {SB_ON ? <MonthGrid compact {...mesGrade(day)} /> : <MonthGrid compact />}""")
rep("{[['Tempo ativo', '4h 32m'], ['Média de retorno', '17 dias'], ['Melhor dia', 'Segunda']].map(([k, v], i) => (",
    "{[['Tempo ativo', resumo ? resumo.tempo : '4h 32m'], ['Média de retorno', resumo ? resumo.media : '17 dias'], ['Melhor dia', resumo ? resumo.melhor : 'Segunda']].map(([k, v], i) => (")

# ---------- Configurações: modelos de anamnese ----------
rep("""function AnamneseModelos({ mobile }) {
  const [list, setList] = useAnamModels();
  const [ed, setEd] = React.useState(null);
  const [copied, setCopied] = React.useState(null);
  const copy = (m) => { try { navigator.clipboard && navigator.clipboard.writeText('https://salute.app/a/' + slug(m.nome)); } catch (e) {} setCopied(m.id); };
  const save = () => { if (!ed.nome.trim()) return; setList((l) => l.some((x) => x.id === ed.id) ? l.map((x) => x.id === ed.id ? ed : x) : [...l, ed]); setEd(null); };""",
"""function AnamneseModelos({ mobile }) {
  const [list, setList] = useAnamModels();
  const carga = useCarga('anamnese');
  const [ed, setEd] = React.useState(null);
  const [copied, setCopied] = React.useState(null);
  const [salvandoM, setSalvandoM] = React.useState(false);
  const copy = (m) => { try { navigator.clipboard && navigator.clipboard.writeText('https://' + (SB_ON ? AnamSvc.link(m) : 'salute.app/a/' + slug(m.nome))); } catch (e) {} setCopied(m.id); };
  const save = async () => { if (!ed.nome.trim()) return;
    if (SB_ON) { setSalvandoM(true); try { const sv = await AnamSvc.salvar(ed); setList((l) => l.some((x) => x.id === ed.id) ? l.map((x) => x.id === ed.id ? { ...sv, usos: x.usos } : x) : [...l, sv]); setEd(null); } catch (e) {} setSalvandoM(false); return; }
    setList((l) => l.some((x) => x.id === ed.id) ? l.map((x) => x.id === ed.id ? ed : x) : [...l, ed]); setEd(null); };
  if (SB_ON && carga !== 'ok') return <CargaEstado estado={carga} compact onRetry={() => carregar('anamnese', true)} />;""")
rep("""<div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}><OBtn variant="secondary" onClick={() => setEd(null)}>Cancelar</OBtn><OBtn iconLeft="check" onClick={save}>Salvar modelo</OBtn></div>""",
    """<div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}><OBtn variant="secondary" onClick={() => setEd(null)}>Cancelar</OBtn><OBtn iconLeft="check" loading={salvandoM} onClick={save}>Salvar modelo</OBtn></div>""")

# QR Code de verdade (mesmo desenho do QR atual)
rep("function FakeQR({ seed = 'salute', size = 132 }) {", """function QRCodigo({ valor, size = 132 }) {
  if (!window.qrcode) return <FakeQR seed={valor} size={size} />;
  const qr = window.qrcode(0, 'M'); qr.addData(valor); qr.make();
  const n = qr.getModuleCount(); const cells = [];
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (qr.isDark(y, x)) cells.push(<rect key={x + '_' + y} x={x} y={y} width="1.02" height="1.02" />);
  return <svg viewBox={`-2 -2 ${n + 4} ${n + 4}`} width={size} height={size} style={{ display: 'block', background: '#fff', borderRadius: 12 }} aria-label={'QR Code: ' + valor}><g fill="#0A2A6B">{cells}</g></svg>;
}
function FakeQR({ seed = 'salute', size = 132 }) {""")


# ---------- preferências que ficam salvas por usuário ----------
rep("  const [view, setView] = React.useState('Semana');\n  const [start, setStart] = React.useState(TODAY);", "  const [view, setView] = SB_ON ? usePrefFiltro('agenda.visao', 'Semana') : React.useState('Semana');\n  const [start, setStart] = React.useState(TODAY);")
rep("  const [f, setF] = React.useState(EMPTY);", "  const [f, setF] = SB_ON ? usePrefFiltro('pacientes.filtros', EMPTY) : React.useState(EMPTY);")
rep("  const [fk, setFk] = React.useState('all');", "  const [fk, setFk] = SB_ON ? usePrefFiltro('prontuario.filtro', 'all') : React.useState('all');")
rep("  const [eraser, setEraser] = React.useState(22);", "  const [eraser, setEraser] = SB_ON ? usePrefFiltro('mapa.borracha', 22) : React.useState(22);")

open(P, 'w', encoding='utf8').write(s)
print('ok pacientes/agenda')
