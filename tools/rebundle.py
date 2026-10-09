"""Regrava em front/index.html os scripts editados em front/extraido.

Uso: python3 -I tools/rebundle.py front/index.html front/extraido

Só os arquivos cujo conteúdo mudou são recompactados; o resto do bundle
fica byte a byte igual.
"""
import base64, gzip, json, os, re, sys

src, pasta = sys.argv[1], sys.argv[2]
html = open(src, encoding='utf8').read()
m = re.search(r'<script type="__bundler/manifest">(.*?)</script>', html, re.S)
manifest = json.loads(m.group(1))

trocados = 0
for uuid, e in manifest.items():
    arqs = [f for f in os.listdir(pasta) if f.startswith(uuid + '.')]
    if not arqs:
        continue
    novo = open(os.path.join(pasta, arqs[0]), 'rb').read()
    atual = base64.b64decode(e['data'])
    if e.get('compressed'):
        atual = gzip.decompress(atual)
    if novo == atual:
        continue
    dados = gzip.compress(novo, mtime=0) if e.get('compressed') else novo
    b64 = base64.b64encode(dados).decode()
    velho = '"data": "%s"' % e['data']
    assert html.count(velho) == 1, uuid
    html = html.replace(velho, '"data": "%s"' % b64)
    trocados += 1
    print('atualizado:', arqs[0])

open(src, 'w', encoding='utf8').write(html)
print(trocados, 'arquivo(s) regravado(s)')
