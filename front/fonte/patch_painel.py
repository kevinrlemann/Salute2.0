# Liga o Painel ao Supabase (função painel_resumo). Visual igual.
import sys
P = 'painel_patched.jsx'
s = open('bk_v22/painel_patched.jsx', encoding='utf8').read()
def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n: sys.exit('esperava %d ocorrência(s), achei %d:\n%s' % (n, c, old[:200]))
    s = s.replace(old, new)

# divisões seguras quando a clínica ainda não tem leads
rep("const n = stages.length, W = 1000, H = 200, mid = H / 2, top = stages[0].value;", "const n = stages.length, W = 1000, H = 200, mid = H / 2, top = stages[0].value || 1;")
rep("{fmtPct(s.value / stages[0].value * 100)}", "{fmtPct(s.value / (stages[0].value || 1) * 100)}")
rep("{fmtPct(s.value / stages[i - 1].value * 100)}", "{fmtPct(s.value / (stages[i - 1].value || 1) * 100)}")
# canais vêm do banco
rep("const CHANNELS = [", "const CANAIS0 = [")
rep("function LeadsPorCanal() {\n  const total = CHANNELS.reduce((a, c) => a + c.value, 0);",
    "function LeadsPorCanal({ canais }) {\n  const CHANNELS = canais || CANAIS0;\n  const total = CHANNELS.reduce((a, c) => a + c.value, 0) || 1;")
# tendência negativa aparece para baixo
rep("{trend ? <TrendPill value={trend} /> : null}", "{trend ? <TrendPill value={String(trend).replace(/^-/, '')} direction={String(trend).startsWith('-') ? 'down' : 'up'} /> : null}")

rep("function PainelScreen({ mobile, onNavigate }) {\n  const stats = [",
    "function PainelScreen({ mobile, onNavigate }) {\n  const [pv] = useStore(PAINEL);\n  const carga = useCarga('painel');\n  const D = SB_ON ? painelTela(pv) : null;\n  const stats = D ? D.stats : [")
rep("  const narrow = useNarrow();\n", "  const narrow = useNarrow();\n  if (SB_ON && carga !== 'ok') return <CargaEstado estado={carga} onRetry={() => carregar('painel', true)} />;\n")
rep("<BigNum trend=\"9,4%\" sub=\"leads no funil\">186</BigNum>", "<BigNum trend={D ? D.funilTrend : '9,4%'} sub=\"leads no funil\">{D ? D.funilTotal : 186}</BigNum>")
rep("<FlowFunnel stages={FUNNEL}", "<FlowFunnel stages={D ? D.funil : FUNNEL}")
rep(">24,7%</b> de conversão", ">{D ? D.conv : '24,7%'}</b> de conversão")
rep(">6 dias</b></span>", ">{D ? D.diasMedios : '6 dias'}</b></span>")
rep("<BigNum sub=\"Leads\">186</BigNum>\n          <LeadsPorCanal />", "<BigNum sub=\"Leads\">{D ? D.leads : 186}</BigNum>\n          <LeadsPorCanal canais={D ? D.canais : null} />")
rep("letterSpacing: '-0.02em' }}>48</span>\n            <TrendPill value=\"0,8%\" />",
    "letterSpacing: '-0.02em' }}>{D ? D.atend : 48}</span>\n            <TrendPill value={D ? D.atendTrend.replace(/^-/, '') : '0,8%'} direction={D && D.atendTrend.startsWith('-') ? 'down' : 'up'} />")
rep("<BarChart data={WEEK} max={65}", "<BarChart data={D ? D.week : WEEK} max={D ? D.weekMax : 65}")
rep("letterSpacing: '-0.02em' }}>102</span><span style={{ fontSize: 15, color: 'var(--text-muted)' }}>Pacientes</span>",
    "letterSpacing: '-0.02em' }}>{D ? D.total : 102}</span><span style={{ fontSize: 15, color: 'var(--text-muted)' }}>Pacientes</span>")
rep("Homens <b style={{ color: 'var(--text-strong)', fontWeight: 600 }}>35%</b>", "Homens <b style={{ color: 'var(--text-strong)', fontWeight: 600 }}>{D ? D.homens : '35%'}</b>")
rep("Mulheres <b style={{ color: 'var(--text-strong)', fontWeight: 600 }}>15%</b>", "Mulheres <b style={{ color: 'var(--text-strong)', fontWeight: 600 }}>{D ? D.mulheres : '15%'}</b>")
rep("display=\"1000+\"", "display={D ? D.gauge : '1000+'}")
rep(">Outubro 2026</span>", ">{D ? D.mesNome : 'Outubro 2026'}</span>")
rep("          <MonthGrid compact />", "          {D ? <MonthGrid compact {...D.mes} /> : <MonthGrid compact />}")
rep("<PatientsTable rows={PATIENTS.slice(0, 4)} />", "<PatientsTable rows={D ? D.recentes : PATIENTS.slice(0, 4)} />")

rep("<td style={td}>{r.age} anos</td>", "<td style={td}>{r.age === '' || r.age === null || r.age === undefined ? '' : r.age + ' anos'}</td>")
open(P, 'w', encoding='utf8').write(s)
print('ok painel')
