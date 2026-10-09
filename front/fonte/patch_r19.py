# Rodada 19: remove o rodapé "Tempo ativo / Média de retorno / Melhor dia"
# do calendário de Atividade mensal na tela de Agenda
import sys

s = open('pacientes_patched.jsx', encoding='utf8').read()

def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit('patch_r19: esperava %d ocorrência(s), achei %d:\n%s' % (n, c, old[:200]))
    s = s.replace(old, new)

# Remove o bloco do rodapé do calendário de Atividade mensal
rep(
    """          {SB_ON ? <MonthGrid compact {...mesGrade(day)} /> : <MonthGrid compact />}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
            {[['Tempo ativo', resumo ? resumo.tempo : '4h 32m'], ['Média de retorno', resumo ? resumo.media : '17 dias'], ['Melhor dia', resumo ? resumo.melhor : 'Segunda']].map(([k, v], i) => (
              <div key={k} style={{ paddingLeft: i ? 12 : 0, borderLeft: i ? '1px solid rgba(214,226,242,.9)' : 0 }}><p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)' }}>{k}</p><p style={{ margin: '4px 0 0', fontSize: 16, fontWeight: 500, color: 'var(--text-strong)' }}>{v}</p></div>
            ))}
          </div>""",
    "          {SB_ON ? <MonthGrid compact {...mesGrade(day)} /> : <MonthGrid compact />}"
)

open('pacientes_patched.jsx', 'w', encoding='utf8').write(s)
print('ok patch_r19')
