# Adiciona 'Agente IA' em CONFIG_TABS e exporta IA_STORE.
# Roda sobre shared_patched.jsx, antes de patch_agente_ia.py.
import sys

P = 'shared_patched.jsx'
s = open(P, encoding='utf8').read()

def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit('patch_agente_shared: esperava %d ocorrencia(s), achei %d:\n%s' % (n, c, old[:200]))
    s = s.replace(old, new)

# Adiciona nova aba Agente IA após Canais
rep(
    "['canais', 'Canais', 'radio-tower'], ['flix',",
    "['canais', 'Canais', 'radio-tower'], ['agenteia', 'Agente IA', 'bot'], ['flix',"
)

open(P, 'w', encoding='utf8').write(s)
print('ok patch_agente_shared')
