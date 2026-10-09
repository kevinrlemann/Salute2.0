# Rodada shared2: MonthGrid com suporte a feriados (highlight laranja, tooltip, onDayClick) + FeriadoModal
# Roda DEPOIS de patch_shared.py, modifica shared_patched.jsx
import sys

s = open('shared_patched.jsx', encoding='utf8').read()

def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit('patch_shared2: esperava %d ocorrência(s), achei %d:\n%s' % (n, c, old[:200]))
    s = s.replace(old, new)

# 1. Substituir MonthGrid pelo novo com suporte a feriados
OLD_MONTH_GRID = """function MonthGrid({ today = 2, bold = [6, 7], startOffset = 4, days = 31, compact }) {
  const cells = [...Array(startOffset).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', rowGap: compact ? 6 : 14, textAlign: 'center' }}>
      {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'].map((d) => <span key={d} style={{ fontSize: 13, color: 'var(--text-body)', paddingBottom: compact ? 4 : 10 }}>{d}</span>)}
      {cells.map((d, i) => d === null ? <span key={'e' + i} /> : (
        <span key={d} style={{ justifySelf: 'center', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: d === today || bold.includes(d) || d > 7 ? 600 : 400,
          color: d === today ? '#1F5EFF' : d < 6 ? 'var(--text-muted)' : 'var(--text-strong)', background: d === today ? '#fff' : 'transparent', boxShadow: d === today ? '0 4px 12px -6px rgba(23,73,170,.4)' : 'none' }}>{d}</span>
      ))}
    </div>
  );
}"""

NEW_MONTH_GRID = """function MonthGrid({ today = 2, bold = [6, 7], startOffset = 4, days = 31, compact, feriadoMap = {}, onDayClick }) {
  const cells = [...Array(startOffset).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', rowGap: compact ? 6 : 14, textAlign: 'center' }}>
      {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'].map((d) => <span key={d} style={{ fontSize: 13, color: 'var(--text-body)', paddingBottom: compact ? 4 : 10 }}>{d}</span>)}
      {cells.map((d, i) => {
        if (d === null) return <span key={'e' + i} />;
        const isFeriado = !!feriadoMap[d];
        const isToday = d === today;
        const isBold = bold.includes(d);
        return (
          <div key={d} title={isFeriado ? feriadoMap[d].nome : undefined}
            onClick={isFeriado && onDayClick ? () => onDayClick(d) : undefined}
            style={{ justifySelf: 'center', position: 'relative', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
              cursor: isFeriado ? 'pointer' : 'default' }}>
            <span style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
              fontWeight: isToday || isBold || d > 7 ? 600 : 400,
              color: isToday ? '#1F5EFF' : isFeriado ? '#E56D26' : d < 6 ? 'var(--text-muted)' : 'var(--text-strong)',
              background: isToday ? '#fff' : isFeriado ? 'rgba(229,109,38,0.1)' : 'transparent',
              boxShadow: isToday ? '0 4px 12px -6px rgba(23,73,170,.4)' : 'none' }}>{d}</span>
            {isFeriado && <span style={{ position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)', width: 5, height: 5, borderRadius: '50%', background: '#E56D26' }} />}
          </div>
        );
      })}
    </div>
  );
}

function FeriadoModal({ feriado, onClose }) {
  if (!feriado) return null;
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 900, background: 'rgba(15,23,42,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: 20, padding: '28px 32px', maxWidth: 380, width: '100%', boxShadow: '0 20px 60px -16px rgba(15,23,42,0.25)', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(229,109,38,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <SIcon name="calendar-x" size={22} style={{ color: '#E56D26' }} />
          </span>
          <div>
            <p style={{ margin: 0, fontSize: 11, fontWeight: 600, color: '#E56D26', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Feriado</p>
            <p style={{ margin: 0, fontSize: 18, fontWeight: 700, color: 'var(--text-strong)' }}>{feriado.nome}</p>
          </div>
        </div>
        {feriado.tipo && <p style={{ margin: 0, fontSize: 14, color: 'var(--text-muted)', paddingLeft: 56 }}>{feriado.tipo === 'nacional' ? 'Feriado nacional' : feriado.tipo === 'estadual' ? 'Feriado estadual' : 'Feriado municipal'}</p>}
        <div style={{ borderTop: '1.5px solid rgba(214,226,242,.6)', paddingTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
          <button type="button" onClick={onClose} style={{ padding: '9px 22px', borderRadius: 10, border: 0, background: '#F1F5FF', color: '#1F5EFF', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Fechar</button>
        </div>
      </div>
    </div>
  );
}"""

rep(OLD_MONTH_GRID, NEW_MONTH_GRID)

# 2. Adicionar FeriadoModal ao Object.assign do window
rep(
    'Object.assign(window, { useNarrow, KIT_NAV, KIT_USER, PATIENTS, STATUS, glass, StatusBadge, PillChip, CardTitle, Legend, MonthGrid });',
    'Object.assign(window, { useNarrow, KIT_NAV, KIT_USER, PATIENTS, STATUS, glass, StatusBadge, PillChip, CardTitle, Legend, MonthGrid, FeriadoModal });'
)

open('shared_patched.jsx', 'w', encoding='utf8').write(s)
print('ok patch_shared2')
