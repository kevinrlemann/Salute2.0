const { StatCard, BarChart, GaugeChart, TrendPill, SalesFunnel, Checkbox: PCheck, Avatar: PAv } = window.SaluteProjetoDesigner_8b4683;

const WEEK = [
  { label: 'Dom', value: 36, target: 46, base: 20 }, { label: 'Seg', value: 33, target: 41, base: 20 }, { label: 'Ter', value: 36, target: 46, base: 20 },
  { label: 'Qua', value: 47, target: 57, base: 20 }, { label: 'Qui', value: 30, target: 37, base: 20 }, { label: 'Sex', value: 35, target: 45, base: 20 }, { label: 'Sáb', value: 27, target: 37, base: 20 },
];

const DAILY = [
  ['19', 7], ['20', 3], ['21', 11], ['22', 9], ['23', 12], ['24', 10], ['25', 13],
  ['26', 8], ['27', 2], ['28', 12], ['29', 10], ['30', 14], ['01', 11], ['02', 9],
].map(([label, value]) => ({ label, value, target: 14, base: Math.min(value, 3) }));

const FUNNEL = [
  { label: 'Novo', value: 186 },
  { label: 'Aguardando atendente', value: 128 },
  { label: 'Agendado', value: 101 },
  { label: 'Confirmado', value: 77 },
  { label: 'Em atendimento', value: 59 },
  { label: 'Finalizado', value: 46 },
];

const fmtPct = (v) => (Math.round(v * 10) / 10).toFixed(1).replace('.', ',') + '%';

function FlowFunnel({ stages, height = 210, mobile }) {
  const n = stages.length, W = 1000, H = 200, mid = H / 2, top = stages[0].value;
  const cw = W / n;
  const hh = stages.map((s) => Math.max((s.value / top) * (H / 2) * 0.96, 10));
  let up = `M0 ${mid - hh[0]} L${cw * 0.62} ${mid - hh[0]}`;
  let dn = '';
  for (let i = 1; i < n; i++) {
    const x = cw * i;
    up += ` C${x} ${mid - hh[i - 1]} ${x} ${mid - hh[i]} ${x + cw * 0.38} ${mid - hh[i]} L${x + cw * 0.62} ${mid - hh[i]}`;
  }
  up += ` L${W} ${mid - hh[n - 1]} L${W} ${mid + hh[n - 1]} L${cw * (n - 1) + cw * 0.38} ${mid + hh[n - 1]}`;
  for (let i = n - 1; i >= 1; i--) {
    const x = cw * i;
    dn += ` C${x} ${mid + hh[i]} ${x} ${mid + hh[i - 1]} ${x - cw * 0.38} ${mid + hh[i - 1]}`;
    if (i > 1) dn += ` L${x - cw * 0.62} ${mid + hh[i - 1]}`;
  }
  const d = up + dn + ` L0 ${mid + hh[0]} Z`;
  const [hover, setHover] = React.useState(null);
  return (
    <div style={{ overflowX: mobile ? 'auto' : 'visible', margin: mobile ? '0 -4px' : 0, scrollbarWidth: 'thin' }}>
      <div style={{ minWidth: mobile ? 620 : 0, display: 'grid', gridTemplateColumns: `repeat(${n}, minmax(0,1fr))`, position: 'relative' }}>
        {stages.map((s, i) => (
          <div key={s.label} style={{ padding: '0 10px 12px', borderLeft: i ? '1.5px dashed rgba(150,175,210,.45)' : 'none', display: 'flex', flexDirection: 'column', gap: 4, minHeight: 52, justifyContent: 'flex-end' }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)', lineHeight: 1.25 }}>{s.label}</span>
            <span style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-strong)', letterSpacing: '-0.01em', fontVariantNumeric: 'tabular-nums' }}>{s.value}</span>
          </div>
        ))}
        <div style={{ gridColumn: `1 / span ${n}`, position: 'relative', height }}>
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', filter: 'drop-shadow(0 18px 24px rgba(10,92,255,.28))' }} aria-hidden="true">
            <defs>
              <linearGradient id="ffH" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#0A47E6" /><stop offset=".45" stopColor="#1F5EFF" /><stop offset=".75" stopColor="#4F7BE6" /><stop offset="1" stopColor="#7B4BC4" />
              </linearGradient>
              <linearGradient id="ffV" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#fff" stopOpacity=".38" /><stop offset=".5" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#2FD3FF" stopOpacity=".22" />
              </linearGradient>
            </defs>
            <path d={d} fill="url(#ffH)" />
            <path d={d} fill="url(#ffV)" />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: `repeat(${n}, minmax(0,1fr))` }}>
            {stages.map((s, i) => (
              <div key={s.label} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
                style={{ borderLeft: i ? '1.5px dashed rgba(150,175,210,.45)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'default', background: hover === i ? 'rgba(255,255,255,.12)' : 'transparent', transition: 'background var(--dur-base)' }}>
                <span style={{ fontSize: i === 0 ? 18 : 15, fontWeight: 600, color: '#fff', textShadow: '0 1px 6px rgba(10,40,140,.45)', fontVariantNumeric: 'tabular-nums' }}>{fmtPct(s.value / stages[0].value * 100)}</span>
              </div>
            ))}
          </div>
        </div>
        {stages.map((s, i) => (
          <div key={s.label + 'b'} style={{ padding: '12px 10px 0', borderLeft: i ? '1.5px dashed rgba(150,175,210,.45)' : 'none', fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.3 }}>
            {i === 0 ? 'Entrada' : <span><b style={{ color: 'var(--text-strong)', fontWeight: 600 }}>{fmtPct(s.value / stages[i - 1].value * 100)}</b> da etapa anterior</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

const CHANNELS = [
  { label: 'Tráfego pago', value: 98, color: '#0A3FE0', icon: 'megaphone', conv: '19%' },
  { label: 'Orgânico', value: 52, color: '#22C3F2', icon: 'sprout', conv: '25%' },
  { label: 'Indicação', value: 36, color: '#7B4BC4', icon: 'handshake', conv: '38%' },
];

const BigNum = ({ children, sub, trend }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
    <span style={{ fontSize: 38, fontWeight: 600, color: 'var(--text-strong)', letterSpacing: '-0.02em' }}>{children}</span>
    {trend ? <TrendPill value={trend} /> : null}
    {sub ? <span style={{ fontSize: 15, color: 'var(--text-muted)' }}>{sub}</span> : null}
  </div>
);

function LeadsPorCanal() {
  const total = CHANNELS.reduce((a, c) => a + c.value, 0);
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 18 }}>
      <div style={{ display: 'flex', height: 14, borderRadius: 999, overflow: 'hidden', gap: 3, background: 'rgba(255,255,255,.5)', border: '1.5px solid rgba(255,255,255,.95)' }}>
        {CHANNELS.map((c) => <span key={c.label} style={{ width: (c.value / total * 100) + '%', background: `linear-gradient(90deg, ${c.color}, color-mix(in srgb, ${c.color} 70%, white))`, borderRadius: 999 }} />)}
      </div>
      {CHANNELS.map((c) => {
        const pct = c.value / total * 100;
        return (
          <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 40, height: 40, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,.7)', border: '1.5px solid rgba(255,255,255,.95)', color: c.color, boxShadow: '0 4px 12px -8px rgba(23,73,170,.35)' }}><SIcon name={c.icon} size={18} strokeWidth={1.8} /></span>
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                <span style={{ fontSize: 15, color: 'var(--text-body)' }}>{c.label}</span>
                <span style={{ fontSize: 15, color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}><b style={{ color: 'var(--text-strong)', fontWeight: 600 }}>{c.value}</b> · {pct.toFixed(0)}%</span>
              </div>
              <div style={{ height: 6, borderRadius: 999, background: 'rgba(214,226,242,.7)', overflow: 'hidden' }}><div style={{ width: pct + '%', height: '100%', borderRadius: 999, background: c.color }} /></div>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Conversão <b style={{ color: 'var(--text-strong)', fontWeight: 600 }}>{c.conv}</b></span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function PatientsTable({ rows, big }) {
  const th = { textAlign: 'left', padding: big ? '16px 16px' : '12px 14px', fontSize: big ? 14 : 12, fontWeight: 500, color: 'var(--text-strong)', textTransform: 'uppercase', letterSpacing: '.02em', whiteSpace: 'nowrap' };
  const td = { padding: big ? '14px 16px' : '10px 14px', fontSize: big ? 15 : 13, color: 'var(--text-body)', borderTop: '1px solid rgba(214,226,242,.9)', whiteSpace: 'nowrap' };
  return (
    <div style={{ overflowX: 'auto', overflowY: 'hidden', scrollbarWidth: 'thin', scrollbarColor: 'rgba(150,175,210,.5) transparent', borderRadius: 18, background: 'rgba(255,255,255,.35)', border: '1.5px solid rgba(255,255,255,.9)' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
        <thead style={{ background: 'rgba(225,236,250,.7)' }}><tr>
          <th style={{ ...th, width: 36 }}><PCheck /></th><th style={th}>Nº Pront.</th><th style={th}>Nome do paciente</th><th style={th}>Idade</th><th style={th}>Procedimento</th><th style={th}>Status</th>
        </tr></thead>
        <tbody>{rows.map((r) => (
          <tr key={r.id + r.name}>
            <td style={td}><PCheck /></td><td style={td}>{r.id}</td>
            <td style={td}><span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><PAv name={r.name} size={big ? 40 : 30} /><span><span style={{ display: 'block', fontWeight: 600, color: 'var(--text-strong)' }}>{r.name}</span><span style={{ display: 'block', fontSize: big ? 13 : 11, color: 'var(--text-muted)' }}>{r.email}</span></span></span></td>
            <td style={td}>{r.age} anos</td><td style={td}>{r.proc}</td><td style={td}><StatusBadge s={r.status} /></td>
          </tr>))}</tbody>
      </table>
    </div>
  );
}

function PainelScreen({ mobile, onNavigate }) {
  const stats = [
    { icon: 'users', title: 'Total de pacientes', value: '102', trend: { value: '12,8%', label: 'no último mês' }, breakdown: [{ label: 'Novos', value: 48 }, { label: 'Antigos', value: 54 }] },
    { icon: 'calendar-days', title: 'Agendamentos', value: '254', trend: { value: '1,9%', label: 'no último mês' }, breakdown: [{ label: 'Novos', value: 56 }, { label: 'Retornos', value: 43 }] },
    { icon: 'sparkles', title: 'IA economizou seu tempo', value: '27h', trend: { value: '11,5%', label: 'no último mês' }, breakdown: [{ label: 'Conversas', value: 412 }, { label: 'Agendou', value: 64 }] },
  ];
  const narrow = useNarrow();
  const g = mobile ? 14 : 26;
  const one = mobile || narrow;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: g }}>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : narrow ? 'repeat(auto-fit, minmax(280px,1fr))' : 'repeat(3, minmax(0,1fr))', gap: g }}>
        {stats.map((s) => <StatCard key={s.title} {...s} onMenu={() => {}} style={{ ...glass, padding: mobile ? 18 : 22 }} />)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: one ? '1fr' : 'minmax(0,1.84fr) minmax(0,1fr)', gap: g }}>
        <section style={{ ...glass, padding: mobile ? 18 : 26, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <CardTitle right={<PillChip>Mensal</PillChip>}>Funil de vendas</CardTitle>
          <BigNum trend="9,4%" sub="leads no funil">186</BigNum>
          <FlowFunnel stages={FUNNEL} mobile={mobile} height={mobile ? 170 : 210} />
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', fontSize: 13, color: 'var(--text-muted)' }}>
            <span>Novo até Finalizado: <b style={{ color: 'var(--text-strong)', fontWeight: 600 }}>24,7%</b> de conversão</span>
            <span>Tempo médio no funil: <b style={{ color: 'var(--text-strong)', fontWeight: 600 }}>6 dias</b></span>
          </div>
        </section>
        <section style={{ ...glass, padding: mobile ? 18 : 26, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <CardTitle right={<PillChip>Mensal</PillChip>}>Leads por canal</CardTitle>
          <BigNum sub="Leads">186</BigNum>
          <LeadsPorCanal />
        </section>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: one ? '1fr' : 'minmax(0,1.84fr) minmax(0,1fr)', gap: g }}>
        <section style={{ ...glass, padding: mobile ? 18 : 26, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <CardTitle right={<PillChip>Mensal</PillChip>}>Atendimentos</CardTitle>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
            <span style={{ fontSize: 38, fontWeight: 600, color: 'var(--text-strong)', letterSpacing: '-0.02em' }}>48</span>
            <TrendPill value="0,8%" /><span style={{ fontSize: 15, color: 'var(--text-muted)' }}>vs mês anterior</span>
          </div>
          <BarChart data={WEEK} max={65} ticks={5} height={mobile ? 180 : 250} />
        </section>
        <section style={{ ...glass, padding: mobile ? 18 : 26, display: 'flex', flexDirection: 'column', gap: 12, overflow: 'hidden' }}>
          <CardTitle right={<PillChip>Mensal</PillChip>}>Gênero</CardTitle>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}><span style={{ fontSize: 38, fontWeight: 600, color: 'var(--text-strong)', letterSpacing: '-0.02em' }}>102</span><span style={{ fontSize: 15, color: 'var(--text-muted)' }}>Pacientes</span></div>
          <div style={{ display: 'flex', gap: 24, fontSize: 15 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0A3FE0' }} />Homens <b style={{ color: 'var(--text-strong)', fontWeight: 600 }}>35%</b></span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C3F2' }} />Mulheres <b style={{ color: 'var(--text-strong)', fontWeight: 600 }}>15%</b></span>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', margin: '0 -8px -28px' }}><GaugeChart value={100} max={100} label="Total de pacientes" display="1000+" size={420} /></div>
        </section>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: one ? '1fr' : 'minmax(0,1fr) minmax(0,1.84fr)', gap: g }}>
        <section style={{ ...glass, padding: mobile ? 18 : 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <CardTitle right={<Legend items={[['Consulta', '#1F5EFF'], ['Reunião', '#F2694A']]} />}>Atividade mensal</CardTitle>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-strong)' }}><SIcon name="chevron-left" size={20} /><span style={{ fontSize: 20, fontWeight: 500 }}>Outubro 2026</span><SIcon name="chevron-right" size={20} /></div>
          <MonthGrid compact />
        </section>
        <section style={{ ...glass, padding: mobile ? 18 : 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <CardTitle right={<PillChip>Mensal</PillChip>}>Pacientes recentes</CardTitle>
          <PatientsTable rows={PATIENTS.slice(0, 4)} />
        </section>
      </div>
    </div>
  );
}

Object.assign(window, { PainelScreen, PatientsTable });
