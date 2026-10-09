"""Falha se algum JWT do repositório (front, docs, supabase) não for a chave pública anon.

Uso: python3 -I tools/verificar_segredos.py
"""
import base64
import json
import pathlib
import re
import sys

RAIZ = pathlib.Path(__file__).resolve().parent.parent
JWT = re.compile(r'eyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}')
PULAR = {'.git', 'node_modules'}

problemas = []
for arq in RAIZ.rglob('*'):
    if not arq.is_file() or PULAR & set(arq.parts) or arq.stat().st_size > 20_000_000 or arq == pathlib.Path(__file__).resolve():
        continue
    try:
        texto = arq.read_text(errors='ignore')
    except OSError:
        continue
    for m in JWT.finditer(texto):
        corpo = m.group(0).split('.')[1]
        try:
            dados = json.loads(base64.urlsafe_b64decode(corpo + '=' * (-len(corpo) % 4)))
        except ValueError:
            continue
        if dados.get('role') not in ('anon', None):
            problemas.append(f"{arq.relative_to(RAIZ)}: JWT com papel '{dados.get('role')}'")
    if re.search(r'sk_live_[A-Za-z0-9]{20,}|gsk_[A-Za-z0-9]{20,}|sk-ant-[A-Za-z0-9-]{20,}', texto):
        problemas.append(f"{arq.relative_to(RAIZ)}: parece conter chave de API")

if problemas:
    print('Segredos encontrados:\n' + '\n'.join(sorted(set(problemas))))
    sys.exit(1)
print('Nenhum segredo encontrado.')
