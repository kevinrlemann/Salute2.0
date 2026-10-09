# Prontuário novo: anamnese em blocos com assinatura, mapeamento com produtos do estoque, zoom e exportação,
# procedimento gerado a partir do mapa e selos de alerta na ficha. Roda depois do patch_config.py.
import sys, re
P = 'pacientes_patched.jsx'
s = open(P, encoding='utf8').read()
def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n: sys.exit('esperava %d ocorrência(s), achei %d:\n%s' % (n, c, old[:200]))
    s = s.replace(old, new)
def entre(ini, fim, novo):
    global s
    a = s.index(ini); b = s.index(fim, a)
    s = s[:a] + novo + s[b:]
def partes(arq):
    t = open(arq, encoding='utf8').read()
    out = {}
    for bloco in re.split(r'^//@@', t, flags=re.M)[1:]:
        k, corpo = bloco.split('\n', 1)
        out[k.strip()] = corpo
    return out

M = partes('mapa_novo.jsx')
R = partes('pront_novo.jsx')

# ---------- anamnese: o envio e os modelos agora vêm do svc_anamnese.jsx ----------
entre('function AnamneseWorkspace({ p, onSend, onBack, wide }) {', '/* ---- Mapeamento e marcação ---- */', '')
entre('function AnamneseModelos({ mobile }) {', '/* ---- Equipe e acessos ---- */', '')
rep("{sec === 'anamnese' ? <AnamneseModelos mobile={mobile} /> : null}", "{sec === 'anamnese' ? <AnamneseModelosLista mobile={mobile} /> : null}")

# ---------- mapeamento ----------
a = s.index('const doseLbl = (prod, d) =>'); b = s.index('\n', a) + 1
s = s[:a] + M['A'] + s[b:]
a = s.index('const mapTotals = (points) =>'); b = s.index('\n', a) + 1
s = s[:a] + M['B'] + s[b:]
entre('function BoardLayers({ bg, points, strokes, labels = true, sel, hover }) {', 'function MapThumb(', M['C'])
entre('function MapEditor({ initial, onSave, onBack, wide }) {', '/* ---- Procedimento ---- */', M['D'] + '\n')

# ---------- registros e prontuário ----------
entre('function RecordCard({ r, onOpen }) {', 'function ProntuarioTab(', R['R'] + '\n')
entre('function ProntuarioTab({ p, recs, setRecs, docs, setDocs, folders, setFolders, onEvent, mobile, wide, setWork, pastas }) {', '/* ---------- Painel do paciente ---------- */', R['P'] + '\n')

# ---------- procedimento: pode vir preenchido pelo mapeamento ----------
rep("function ProcWorkspace({ onSave, onBack, wide }) {", "function ProcWorkspace({ onSave, onBack, wide, inicial }) {\n  const ini = inicial || {};")
rep("  const [mats, setMats] = React.useState([]);\n  const [obs, setObs] = React.useState('');",
    "  const [mats, setMats] = React.useState(() => (ini.mats || []).map((m) => ({ ...m })));\n  const [obs, setObs] = React.useState(ini.obs || '');")
rep("setMats((MAT_SUG[n] || []).map(([nome, q]) => ({ nome, q }))); };",
    "const sug = (MAT_SUG[n] || []).map(([nome, q]) => ({ nome, q })); setMats((cur) => (ini.mats && ini.mats.length ? [...cur, ...sug.filter((x) => !cur.some((c) => c.nome === x.nome))] : sug)); };\n  React.useEffect(() => { if (ini.titulo && FIN_PROCS.some((x) => x.n === ini.titulo)) choose(ini.titulo); }, []);")
rep("<Stepper label={`${m.q} ${unPl(unOf(m.nome), m.q)}`} onDec={() => setMats(mats.map((x, j) => j === i ? { ...x, q: Math.max(1, x.q - 1) } : x))} onInc={() => setMats(mats.map((x, j) => j === i ? { ...x, q: x.q + 1 } : x))} />",
    "<Stepper label={`${qFmt(m.q)} ${unPl(unOf(m.nome), m.q < 2 ? 1 : m.q)}`} onDec={() => setMats(mats.map((x, j) => { if (j !== i) return x; const st = Number.isInteger(x.q) ? 1 : 0.1; return { ...x, q: Math.max(Number.isInteger(x.q) ? 1 : 0.01, Math.round((x.q - st) * 100) / 100) }; }))} onInc={() => setMats(mats.map((x, j) => { if (j !== i) return x; const st = Number.isInteger(x.q) ? 1 : 0.1; return { ...x, q: Math.round((x.q + st) * 100) / 100 }; }))} />")
rep("<span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Sugerimos os materiais mais usados neste procedimento. Ajuste se precisar.</span>",
    "<span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{ini.mapaId ? 'Quantidades calculadas pelo mapeamento, na unidade do estoque. Ao salvar como realizado, a baixa no estoque é automática.' : 'Sugerimos os materiais mais usados neste procedimento. Ajuste se precisar.'}</span>")
rep("onClick={() => onSave({ kind: 'proc', title: proc, items: [proc], pro, dt, dur, status, mats, obs })}>Salvar procedimento</OBtn>",
    "onClick={() => onSave({ kind: 'proc', title: proc, items: [proc], pro, dt, dur, status, mats, obs, mapaId: ini.mapaId || null })}>Salvar procedimento</OBtn>")
rep("      {proc ? <>\n        {sec('Profissional',",
    "      {ini.mapaId && !proc ? <div style={{ display: 'flex', gap: 10, padding: '12px 14px', borderRadius: 16, background: 'rgba(31,94,255,.07)', fontSize: 14, color: 'var(--text-body)' }}><span style={{ color: '#1F5EFF', display: 'flex' }}><OIcon name=\"scan-face\" size={18} /></span>Os materiais e as observações já vieram do mapeamento. Escolha o procedimento para continuar.</div> : null}\n      {proc ? <>\n        {sec('Profissional',")

# ---------- ficha: selos de alerta da anamnese ----------
rep("""              <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>CPF {p.cpf || 'não informado'} · {p.conv || 'Sem convênio'}</p>
            </div>""", """              <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>CPF {p.cpf || 'não informado'} · {p.conv || 'Sem convênio'}</p>
              <AlertasPaciente recs={recs} />
            </div>""")

# ---------- ficha: quando o paciente responde pelo link, o registro e os alertas se atualizam sozinhos ----------
rep("  React.useEffect(carregarFicha, [p.dbId]);",
    """  React.useEffect(carregarFicha, [p.dbId]);
  React.useEffect(() => { if (!SB_ON || !p.dbId) return undefined; return tempoReal('anamnese-ficha', ['anamnese_envios'], (t, ev) => {
    const row = ev.new || {}; if (row.paciente_id !== p.dbId) return;
    const st = { respondido: 'respondida', expirado: 'expirada', cancelado: 'cancelada', recebido: 'respondida' }[row.status] || 'pendente';
    setRecs((a) => { const cur = a.find((x) => x.dbId === row.id); if (cur && cur.status === st && cur.token === row.token) return a;
      AnamSvc.envio(row.id).then((e) => { if (e) setRecs((b) => (b.some((x) => x.dbId === e.id) ? b.map((x) => (x.dbId === e.id ? { ...x, ...e, id: x.id, date: x.date } : x)) : [e, ...b])); }).catch(() => {});
      return a; });
  }); }, [p.dbId]);""")

# ---------- demonstração: registros de anamnese no formato novo ----------
rep("    { id: 1, kind: 'anamnese', date: HOJE, title: 'Anamnese de retorno', status: 'pendente', link: `salute.app/a/retorno/${base}` },",
    "    { id: 1, kind: 'anamnese', date: HOJE, title: 'Toxina botulínica', status: 'pendente', modo: 'link', link: `salute.app/?a=toxina${base}`, expira: new Date(Date.now() + 6 * 86400000).toISOString() },")
a = s.index("    { id: 5, kind: 'anamnese', date: '15/09/2026', title: 'Anamnese facial'"); b = s.index('\n', a) + 1
s = s[:a] + """    { id: 5, kind: 'anamnese', date: '15/09/2026', title: 'Anamnese estética', status: 'respondida', modo: 'link', link: `salute.app/?a=estetica${base}`, respondidoEm: '2026-09-15T14:32:00', assinante: p.nome, cpfAss: onlyDigits(p.cpf), assinadoEm: '2026-09-15T14:32:00', ip: '189.45.112.37', codigo: '7F3A9C21B04E',
      assinatura: { w: 320, h: 120, tracos: [[[22, 82], [34, 58], [46, 86], [60, 54], [74, 88], [92, 60], [110, 80], [128, 62], [150, 84], [176, 66], [204, 78], [236, 70], [292, 74]], [[64, 98], [250, 96]]] },
      answers: [['Qual é o principal motivo da sua consulta?', 'Rugas na testa e pés de galinha', '', 'Motivo da consulta', false, ''], ['Há quanto tempo isso incomoda você?', 'Mais de 1 ano', '', 'Motivo da consulta', false, ''], ['Marque as condições que você tem ou já teve', 'Nenhuma', '', 'Histórico de saúde', false, ''], ['Tem alergia a algum medicamento, cosmético ou alimento?', 'Sim', 'Dipirona', 'Histórico de saúde', true, 'Alergia'], ['Usa ácidos, retinoides ou isotretinoína?', 'Sim', 'Ácido retinoico à noite', 'Histórico estético', false, ''], ['Está grávida ou amamentando?', 'Não', '', 'Hábitos de vida', false, 'Gestante ou lactante'], ['Você fuma?', 'Não', '', 'Hábitos de vida', false, '']] },
""" + s[b:]

for x in ['AnamneseWorkspace', 'function AnamneseModelos(', 'onSend={(m, link']:
    assert x not in s, x
open(P, 'w', encoding='utf8').write(s)
print('patch_pront ok')
