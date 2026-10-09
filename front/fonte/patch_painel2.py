# Rodada painel2: GaugeChart com proporção real + FeriadoModal integrado
# Roda DEPOIS de patch_painel.py, modifica painel_patched.jsx
import sys

s = open('painel_patched.jsx', encoding='utf8').read()

def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit('patch_painel2: esperava %d ocorrência(s), achei %d:\n%s' % (n, c, old[:200]))
    s = s.replace(old, new)

# 1. GaugeChart com proporção real (gaugeHomens/gaugeMulheres do store)
rep(
    '<GaugeChart value={100} max={100} label="Total de pacientes" display={D ? D.gauge : \'1000+\'} size={420} />',
    '<GaugeChart value={D ? D.gaugeHomens : 35} max={D ? Math.max(D.gaugeHomens, D.gaugeMulheres) : 100} label="Total de pacientes" display={D ? D.gauge : \'1000+\'} size={420} />'
)

# 2. Adicionar estado do FeriadoModal e handleDayClick no PainelScreen
rep(
    'function PainelScreen({ mobile, onNavigate }) {\n  const [pv] = useStore(PAINEL);',
    'function PainelScreen({ mobile, onNavigate }) {\n  const [feriadoSel, setFeriadoSel] = React.useState(null);\n  const [pv] = useStore(PAINEL);'
)

# 3. Adicionar handleDayClick depois da linha do narrow = useNarrow()
rep(
    '  const narrow = useNarrow();\n  if (SB_ON && carga !== \'ok\')',
    '  const narrow = useNarrow();\n  const feriadoMap = React.useMemo(() => {\n    const m = {};\n    if (D && D.mes && D.mes.feriados) { D.mes.feriados.forEach((f) => { m[f.dia] = f; }); }\n    return m;\n  }, [D]);\n  function handleDayClick(dia) {\n    const f = feriadoMap[dia];\n    if (f) setFeriadoSel(f);\n  }\n  if (SB_ON && carga !== \'ok\')'
)

# 4. Passar onDayClick e feriadoMap para MonthGrid
rep(
    '{D ? <MonthGrid compact {...D.mes} /> : <MonthGrid compact />}',
    '{D ? <MonthGrid compact {...D.mes} feriadoMap={feriadoMap} onDayClick={handleDayClick} /> : <MonthGrid compact />}'
)

# 5. Adicionar FeriadoModal antes do fechamento do return principal
# Envolve o return inteiro em <> </> (Fragment) para suportar dois roots
rep(
    '  return (\n    <div style={{ display: \'flex\', flexDirection: \'column\', gap: g }}>',
    '  return (\n    <>\n    <div style={{ display: \'flex\', flexDirection: \'column\', gap: g }}>'
)
rep(
    '    </div>\n  );\n}\n\nObject.assign(window, { PainelScreen',
    '    </div>\n    {feriadoSel && <FeriadoModal feriado={feriadoSel} onClose={() => setFeriadoSel(null)} />}\n    </>\n  );\n}\n\nObject.assign(window, { PainelScreen'
)

open('painel_patched.jsx', 'w', encoding='utf8').write(s)
print('ok patch_painel2')
