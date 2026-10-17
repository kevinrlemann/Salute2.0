#!/usr/bin/env python3
"""Gera a versão do site para o Netlify a partir do pacote único (front/index.html).

O pacote único guarda todos os scripts em base64 dentro do HTML (1,3 MB que o navegador baixa de novo a cada
visita, porque HTML não pode ficar em cache). Aqui os mesmos scripts e fontes viram arquivos separados em
front/site/assets/<uuid>.<hash>.js, com cache de um ano no Netlify (o nome muda quando o conteúdo muda), e o
index.html do site fica pequeno e aponta para eles. O carregador dentro do HTML passa a buscar cada arquivo
por URL quando a entrada do manifesto tem "url" em vez de "data". O artifact do claude.ai continua usando o
pacote único (front/index.html), que não muda.

Uso: python3 -I tools/site.py front/index.html front/site
"""
import base64, gzip, hashlib, json, os, re, shutil, sys

src, dest = sys.argv[1], sys.argv[2]
html = open(src, encoding='utf8').read()
m = re.search(r'<script type="__bundler/manifest">(.*?)</script>', html, re.S)
manifest = json.loads(m.group(1))
assets = os.path.join(dest, 'assets')
os.makedirs(assets, exist_ok=True)
novos = set()
leve = {}
for uuid, e in manifest.items():
    dados = base64.b64decode(e['data'])
    if e.get('compressed'):
        dados = gzip.decompress(dados)
    h = hashlib.sha256(dados).hexdigest()[:10]
    ext = '.js' if 'javascript' in e['mime'] else '.woff2' if 'font' in e['mime'] or 'woff' in e['mime'] else '.bin'
    nome = uuid + '.' + h + ext
    open(os.path.join(assets, nome), 'wb').write(dados)
    novos.add(nome)
    leve[uuid] = {'mime': e['mime'], 'compressed': False, 'url': 'assets/' + nome}
# apaga versões antigas dos mesmos arquivos
for f in os.listdir(assets):
    if f not in novos:
        os.remove(os.path.join(assets, f))
html = html[:m.start(1)] + json.dumps(leve, separators=(',', ':')) + html[m.end(1):]
# carregador: entrada com "url" é buscada pela rede (o Netlify entrega comprimida e com cache); sem "url", segue como antes
antigo = "      try {\n        const binaryStr = atob(entry.data);"
novo = ("      try {\n        if (entry.url) {\n          const resp = await fetch(entry.url, { cache: 'force-cache' });\n"
        "          if (!resp.ok) throw new Error('HTTP ' + resp.status + ' em ' + entry.url);\n"
        "          const bytes = new Uint8Array(await resp.arrayBuffer());\n"
        "          if (FONT_MIME.test(entry.mime) && MIME_TOKEN.test(entry.mime)) {\n"
        "            blobUrls[uuid] = 'data:' + entry.mime + ';base64,' + toBase64(bytes);\n"
        "          } else {\n"
        "            const blob = new Blob([bytes], { type: entry.mime });\n"
        "            blobUrls[uuid] = URL.createObjectURL(blob);\n"
        "            resourceBlobs[blobUrls[uuid]] = blob;\n"
        "          }\n"
        "          return;\n"
        "        }\n"
        "        const binaryStr = atob(entry.data);")
assert html.count(antigo) == 1, 'carregador do pacote mudou; ajuste tools/site.py'
html = html.replace(antigo, novo)
open(os.path.join(dest, 'index.html'), 'w', encoding='utf8').write(html)
# arquivos que acompanham o site (config pública, ícones, manifest do app)
raiz = os.path.dirname(os.path.abspath(src))
for f in os.listdir(raiz):
    p = os.path.join(raiz, f)
    if os.path.isfile(p) and f != 'index.html' and not f.startswith('.'):
        shutil.copy(p, os.path.join(dest, f))
# pastas estáticas que acompanham o site (ex.: modelos de mapeamento em front/modelos)
for pasta in ['modelos']:
    o = os.path.join(raiz, pasta)
    if os.path.isdir(o):
        d = os.path.join(dest, pasta); os.makedirs(d, exist_ok=True)
        for f in os.listdir(o):
            if not f.startswith('.'): shutil.copy(os.path.join(o, f), os.path.join(d, f))
print('site gerado em', dest, '| index.html', os.path.getsize(os.path.join(dest, 'index.html')), 'bytes |', len(novos), 'arquivos em assets/')
