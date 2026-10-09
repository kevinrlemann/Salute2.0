import re,sys,json,base64,gzip,os
src,out=sys.argv[1],sys.argv[2]
s=open(src,encoding='utf8').read()
def tag(t):
    m=re.search(r'<script type="__bundler/%s">(.*?)</script>'%t,s,re.S); return json.loads(m.group(1)) if m else None
man=tag('manifest'); tpl=tag('template'); ext=tag('ext_resources'); po=tag('page_order')
open(os.path.join(out,'template.html'),'w').write(tpl)
idx=[]
for u,e in man.items():
    b=base64.b64decode(e['data'])
    if e.get('compressed'): b=gzip.decompress(b)
    ext_ = {'application/javascript':'.js','text/javascript':'.js','text/css':'.css','text/html':'.html','font/woff2':'.woff2','image/svg+xml':'.svg','image/png':'.png','image/jpeg':'.jpg','application/json':'.json'}.get(e['mime'],'.bin')
    open(os.path.join(out,u+ext_),'wb').write(b); idx.append((len(b),e['mime'],u+ext_))
for n,m,f in sorted(idx,reverse=True): print(n,m,f)
print('ext_resources:',ext); print('page_order:',po)
