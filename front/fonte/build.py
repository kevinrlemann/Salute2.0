import os
import subprocess
# roda sempre a partir da pasta deste arquivo, de onde quer que seja chamado
os.chdir(os.path.dirname(os.path.abspath(__file__)))
# patch_r18.py fica fora da lista: ele altera app_patched.jsx antes de este build recriar o arquivo,
# entao a mudanca dele nunca chegava ao index.html (ver README desta pasta). O resultado do build e o mesmo.
for _p in ['patch_renata.py','patch_painel.py','patch_perfil.py','patch_shared.py','patch_shared2.py','patch_pac.py','patch_r19.py','patch_gestao.py','patch_config.py','patch_pront.py','patch_mens.py','patch_novo.py','patch_r17.py','patch_painel2.py','patch_shell.py','patch_agente_shared.py','patch_agente_ia.py']: subprocess.run(['python3',_p],check=True)
import re,json,base64,gzip,io
_a=open('app_pre_renata.jsx').read()
_a=_a.replace("\nfunction App() {","\n"+open('renata_kb_sb.jsx').read()+"\n"+open('renata_acoes_sb.jsx').read()+"\n"+open('renata_ui_sb.jsx').read()+"\n"+open('renata_cmd_sb.jsx').read()+"\nfunction App() {",1)
_a=_a.replace("<AppShell items={navItems} active={route} onNavigate={setRoute}","<AppShell items={navItems} active={route} onNavigate={setRoute} topExtra={<><VozBotao mobile={mobile} /><RenataButton mobile={mobile} /></>}")
_a=_a.replace("      {member ? <div style={{ position: 'fixed', zIndex: 150,","      <RenataRoot mobile={mobile} />\n      {member ? <div style={{ position: 'fixed', zIndex: 150,")
_a=_a.replace("  const r = ROUTES[route]; const Screen = r.C;","  React.useEffect(() => { window.RN_NAV = (t) => { if (!ROUTES[t] || !can(t)) return false; setRoute(t); RN_STORE.v = { ...RN_STORE.v, nav: Date.now() }; RN_STORE.subs.forEach((f) => f()); return true; }; });\n  const r = ROUTES[route]; const Screen = r.C;",1)
_a=_a.replace("      <RenataRoot mobile={mobile} />\n","      <RenataRoot mobile={mobile} />\n      <FichaGlobal mobile={mobile} />\n      <VozRoot mobile={mobile} />\n      <AvisoDemo mobile={mobile} />\n      <AvisoGravacao mobile={mobile} />\n",1)
assert '<VozRoot' in _a and 'renata_cmd' not in _a
_a=_a.replace("return ROUTES[r] ? r : 'painel'; });","if (SB_ON && !ROUTES[r] && PREF.v && PREF.v.ultima_tela) r = PREF.v.ultima_tela; return ROUTES[r] ? r : 'painel'; });",1)
_a=_a.replace("React.useEffect(() => { try { localStorage.setItem('salute-kit:route', route0); } catch (e) {} }, [route0]);","React.useEffect(() => { try { localStorage.setItem('salute-kit:route', route0); } catch (e) {} if (SB_ON && PREF.v && PREF.v.ultima_tela !== route0) salvarPref({ ultima_tela: route0 }); }, [route0]);",1)
assert "PREF.v.ultima_tela !== route0" in _a
_a=_a.replace("  painel: { title: 'Bom dia, Dra. Camila',","  painel: { get title() { return SB_ON ? saudacao() : 'Bom dia, Dra. Camila'; },",1)
assert 'saudacao()' in _a
_NV = "{ pac: '', pro: '', hora: '09:00', wpp: true }"
_a=_a.replace("  const [toast, setToast] = React.useState(null);\n","  const [toast, setToast] = React.useState(null);\n  const [nv, setNv] = React.useState(" + _NV + ");\n",1)
_a=_a.replace("<XButton iconLeft=\"check\" onClick={() => { setNovo(false); setToast({ tone: 'success', title: 'Agendamento criado', description: 'Ronald Richards · 2 out · 09:00' }); }}>Agendar</XButton>","<XButton iconLeft=\"check\" onClick={() => { if (SB_ON) { agendarRapido(nv, setToast).then((ok) => { if (ok) { setNovo(false); setNv(" + _NV + "); } }); return; } setNovo(false); setToast({ tone: 'success', title: 'Agendamento criado', description: 'Ronald Richards · 2 out · 09:00' }); }}>Agendar</XButton>",1)
_a=_a.replace("""          <XInput label="Paciente" iconLeft="search" defaultValue="Ronald Richards" style={{ gridColumn: '1 / -1' }} />
          <XSelect label="Profissional" options={['Darlene Robertson', 'Michael Thompson', 'Max Worthington', 'Dr. McCoy']} />
          <XInput label="Horário" type="time" defaultValue="09:00" />
          <div style={{ gridColumn: '1 / -1' }}><XSwitch defaultChecked label="Enviar confirmação por WhatsApp" /></div>""","""          {SB_ON ? <>
          <XInput label="Paciente" iconLeft="search" value={nv.pac} onChange={(e) => setNv({ ...nv, pac: e.target.value })} list="sb-pacientes" placeholder="Nome do paciente" style={{ gridColumn: '1 / -1' }} />
          <datalist id="sb-pacientes">{PAC.slice(0, 500).map((x) => <option key={x.dbId || x.nome} value={x.nome} />)}</datalist>
          <XSelect label="Profissional" options={PROS.map((x) => x.n)} value={nv.pro || (PROS[0] || {}).n || ''} onChange={(e) => setNv({ ...nv, pro: e.target.value })} />
          <XInput label="Horário" type="time" value={nv.hora} onChange={(e) => setNv({ ...nv, hora: e.target.value })} />
          <div style={{ gridColumn: '1 / -1' }}><XSwitch checked={nv.wpp} onChange={(v) => setNv({ ...nv, wpp: v })} label="Enviar confirmação por WhatsApp" /></div>
          </> : <>
          <XInput label="Paciente" iconLeft="search" defaultValue="Ronald Richards" style={{ gridColumn: '1 / -1' }} />
          <XSelect label="Profissional" options={['Darlene Robertson', 'Michael Thompson', 'Max Worthington', 'Dr. McCoy']} />
          <XInput label="Horário" type="time" defaultValue="09:00" />
          <div style={{ gridColumn: '1 / -1' }}><XSwitch defaultChecked label="Enviar confirmação por WhatsApp" /></div>
          </>}""",1)
assert 'agendarRapido(nv' in _a and 'sb-pacientes' in _a and 'const [nv, setNv]' in _a
_a=_a.replace("ReactDOM.createRoot(document.getElementById('root')).render(<App />);","ReactDOM.createRoot(document.getElementById('root')).render(<RaizSalute />);",1)
assert '<AvisoDemo' in _a and '<RaizSalute />' in _a
assert 'topExtra=' in _a and '<RenataRoot' in _a
assert 'window.RN_NAV' in _a
import ds_extra
_a=ds_extra.app(_a)
_a=_a.replace("const [route0, setRoute] = React.useState(() => { let r = null;","const [route0, setRoute] = React.useState(() => { const ru = rotaInicialUrl(); if (ru) return ru; let r = null;",1)
assert 'rotaInicialUrl()' in _a
_a=_a.replace("      <ContaMenu mobile={mobile} onNavigate={navegar} />\n","      <ContaMenu mobile={mobile} onNavigate={navegar} />\n      <SincronizaUrl route={route} ir={navegar} />\n",1)
assert '<SincronizaUrl' in _a
open('app_patched.jsx','w').write(_a)
from PIL import Image
im=Image.open('assets/logo.png').convert('RGBA')
im=im.crop(im.split()[3].getbbox()); buf=io.BytesIO(); im.save(buf,'PNG',optimize=True)
uri='data:image/png;base64,'+base64.b64encode(buf.getvalue()).decode()
h=open('orig.html').read()
m=re.search(r'(<script type="__bundler/manifest">)(.*?)(</script>)',h,re.S)
man=json.loads(m.group(2))
def get(u): return gzip.decompress(base64.b64decode(man[u]['data'])).decode()
# mtime=0: o mesmo código gera sempre os mesmos bytes (sem diferença falsa no Git)
def put(u,s): man[u]['data']=base64.b64encode(gzip.compress(s.encode(),mtime=0)).decode()
OLD="'../../assets/logo/salute-symbol.png'"
DS='7bf00496-6fbf-4ada-843a-7cfa5fe32f77'
ds=get(DS).replace(OLD,"'"+uri+"'")
old_img="""      top: 22,
      transform: 'translateX(-50%)',
      height: 40,
      width: 'auto',
      filter: 'brightness(0) invert(1)',
      opacity: .98
    }
  }) : null"""
new_img="""      top: '50%',
      transform: 'translate(-50%,-50%)',
      height: 48,
      width: 'auto',
      filter: 'brightness(0) invert(1) drop-shadow(0 2px 6px rgba(10,40,140,.35))',
      opacity: 1
    }
  }) : null"""
assert ds.count(old_img)==1; ds=ds.replace(old_img,new_img)
i=ds.index(new_img)+len(new_img); end='strokeLinejoin: "round"\n  }))'
j=ds.index(end,i); assert 'M2 18 H18' in ds[i:j]
ds=ds[:i]+ds[j+len(end):]
old_tb='''logoMarkSrc ? /*#__PURE__*/React.createElement("img", {
      src: logoMarkSrc,
      alt: "Salute IA",
      style: {
        height: 28,
        width: 'auto'
      }
    }) : null'''
new_tb='''logoMarkSrc ? /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'relative', flexShrink: 0, width: 26, height: 40, borderRadius: 13, overflow: 'hidden',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(180deg,#5AA2FF 0%,#0A5CFF 42%,#0A7BFF 70%,#2FD3FF 100%)',
        boxShadow: '0 8px 18px -10px rgba(10,92,255,.7), inset 0 1px 0 rgba(255,255,255,.5)'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: logoMarkSrc,
      alt: "Salute IA",
      style: { height: 24, width: 'auto', filter: 'brightness(0) invert(1)' }
    })) : null'''
assert ds.count(old_tb)==1; ds=ds.replace(old_tb,new_tb)
ds=ds.replace("  compact = false,\n  logoMarkSrc,\n  style\n}) {","  compact = false,\n  logoMarkSrc,\n  beforeAvatar,\n  style\n}) {",1)
_c1="""}), user ? /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
      name: user.name,
      src: user.avatar,
      size: 40,
      ring: true"""
assert ds.count(_c1)==1; ds=ds.replace(_c1,_c1.replace("}), user ?","}), beforeAvatar || null, user ?",1))
_c2="""}), user ? /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    name: user.name,
    src: user.avatar,
    size: 40
  }) : null));"""
assert ds.count(_c2)==1; ds=ds.replace(_c2,_c2.replace("}), user ?","}), beforeAvatar || null, user ?",1))
assert 'beforeAvatar,' in ds
import ds_extra
ds=ds_extra.aplicar(ds)
put(DS,ds)
SH='7af61c93-41a8-4b27-87e2-3463e7f4e93b'; put(SH,open('shell_patched.jsx').read().replace(OLD,"'"+uri+"'"))
put('30c3fd71-3bf2-4a37-94e0-a8dd31485d20',open('perfil_patched.jsx').read())
put('d47643ae-b8a0-4818-aa7e-589c16dc4060',open('pacientes_patched.jsx').read())
put('366b46a2-4378-451e-ae85-50751f4b7824',open('mens_patched.jsx').read())
put('d41989a4-213c-4f3a-8a4d-935c2550782f',open('shared_patched.jsx').read())
put('1b7a2c45-9aaa-498f-b865-94e5afcf4bea',open('app_patched.jsx').read())
put('25352dc7-ee87-41d7-8386-56468c9d6477',open('painel_patched.jsx').read())
SUPA='5a1e7e02-0000-4000-8000-00000000c001'; SBJS='5a1e7e02-0000-4000-8000-00000000c002'
man[SUPA]={'mime':'application/javascript','compressed':True,'data':''}; put(SUPA,open('supa_base.jsx').read())
man[SBJS]={'mime':'text/javascript','compressed':True,'data':''}; put(SBJS,open('vendor/supabase.umd.js').read())
SVCP='5a1e7e02-0000-4000-8000-00000000c003'; QRJS='5a1e7e02-0000-4000-8000-00000000c004'
man[SVCP]={'mime':'application/javascript','compressed':True,'data':''}; put(SVCP,open('svc_pacientes.jsx').read())
man[QRJS]={'mime':'text/javascript','compressed':True,'data':''}; put(QRJS,open('vendor/qrcode.js').read())
SVCM='5a1e7e02-0000-4000-8000-00000000c005'
man[SVCM]={'mime':'application/javascript','compressed':True,'data':''}; put(SVCM,open('svc_mensagens.jsx').read())
SVCG='5a1e7e02-0000-4000-8000-00000000c006'
man[SVCG]={'mime':'application/javascript','compressed':True,'data':''}; put(SVCG,open('svc_gestao.jsx').read())
SVCC='5a1e7e02-0000-4000-8000-00000000c007'
man[SVCC]={'mime':'application/javascript','compressed':True,'data':''}; put(SVCC,open('svc_config.jsx').read())
SVCA='5a1e7e02-0000-4000-8000-00000000c008'
man[SVCA]={'mime':'application/javascript','compressed':True,'data':''}; put(SVCA,open('svc_conta.jsx').read())
SVCPN='5a1e7e02-0000-4000-8000-00000000c009'
man[SVCPN]={'mime':'application/javascript','compressed':True,'data':''}; put(SVCPN,open('svc_painel.jsx').read())
SVCR='5a1e7e02-0000-4000-8000-00000000c00a'
SVCAN='5a1e7e02-0000-4000-8000-00000000c00b'
man[SVCAN]={'mime':'application/javascript','compressed':True,'data':''}; put(SVCAN,open('svc_anamnese.jsx').read())
man[SVCR]={'mime':'application/javascript','compressed':True,'data':''}; put(SVCR,open('svc_renata.jsx').read())
# ---- JSX compilado no build: o navegador não precisa mais do Babel (abre bem mais rápido) ----
BABEL='bd63e1d9-1a51-4713-96fa-c1d72153a872'
JSX=['d41989a4-213c-4f3a-8a4d-935c2550782f','7af61c93-41a8-4b27-87e2-3463e7f4e93b','25352dc7-ee87-41d7-8386-56468c9d6477','d47643ae-b8a0-4818-aa7e-589c16dc4060','366b46a2-4378-451e-ae85-50751f4b7824','30c3fd71-3bf2-4a37-94e0-a8dd31485d20','1b7a2c45-9aaa-498f-b865-94e5afcf4bea',SUPA,SVCP,SVCM,SVCG,SVCC,SVCA,SVCPN,SVCAN,SVCR]
import shutil, subprocess as _sp
_tmp='/tmp/salute_precomp'; shutil.rmtree(_tmp, ignore_errors=True); os.makedirs(_tmp)
open(_tmp+'/babel.min.js','w').write(get(BABEL))
for u in JSX: open(_tmp+'/'+u+'.jsx','w').write(get(u))
_sp.run(['node','precompilar.js',_tmp+'/babel.min.js',_tmp],check=True,stdout=_sp.DEVNULL)
for u in JSX:
    put(u,open(_tmp+'/'+u+'.js').read()); man[u]['mime']='application/javascript'
del man[BABEL]
h=h[:m.start(2)]+json.dumps(man)+h[m.end(2):]
tm=re.search(r'(<script type="__bundler/template">)(.*?)(</script>)',h,re.S)
T=json.loads(tm.group(2))
a=T.index('<div id="__claude_design_branding">'); z=T.index('</div>',T.index('aria-label="Dismiss"',a))+len('</div>')
T=T[:a]+T[z:]
assert 'Made with' not in T
T=T.replace('<script src="7bf00496-6fbf-4ada-843a-7cfa5fe32f77"></script>','<script src="config.js"></script>\n<script src="'+SBJS+'"></script>\n<script src="7bf00496-6fbf-4ada-843a-7cfa5fe32f77"></script>',1)
T=T.replace('<script type="text/babel" src="d41989a4-213c-4f3a-8a4d-935c2550782f"></script>','<script type="text/babel" src="d41989a4-213c-4f3a-8a4d-935c2550782f"></script>\n<script type="text/babel" src="'+SUPA+'"></script>',1)
T=T.replace('<script src="'+SBJS+'"></script>','<script src="'+SBJS+'"></script>\n<script src="'+QRJS+'"></script>',1)
T=T.replace('<script type="text/babel" src="d47643ae-b8a0-4818-aa7e-589c16dc4060"></script>','<script type="text/babel" src="d47643ae-b8a0-4818-aa7e-589c16dc4060"></script>\n<script type="text/babel" src="'+SVCP+'"></script>\n<script type="text/babel" src="'+SVCG+'"></script>\n<script type="text/babel" src="'+SVCC+'"></script>\n<script type="text/babel" src="'+SVCAN+'"></script>',1)
T=T.replace('<script type="text/babel" src="366b46a2-4378-451e-ae85-50751f4b7824"></script>','<script type="text/babel" src="366b46a2-4378-451e-ae85-50751f4b7824"></script>\n<script type="text/babel" src="'+SVCM+'"></script>',1)
T=T.replace('<script type="text/babel" src="30c3fd71-3bf2-4a37-94e0-a8dd31485d20"></script>','<script type="text/babel" src="30c3fd71-3bf2-4a37-94e0-a8dd31485d20"></script>\n<script type="text/babel" src="'+SVCA+'"></script>\n<script type="text/babel" src="'+SVCPN+'"></script>',1)
T=T.replace('<script type="text/babel" src="1b7a2c45-9aaa-498f-b865-94e5afcf4bea"></script>','<script type="text/babel" src="1b7a2c45-9aaa-498f-b865-94e5afcf4bea"></script>\n<script type="text/babel" src="'+SVCR+'"></script>',1)
# ---- endereço do config.js certo em qualquer tela (/novoapp/crm, /novoapp/a/token...) e sem indexação ----
_BOOT = "<script>(function(){var R=['painel','pacientes','agenda','mensagens','crm','gestao','estoque','financeiro','configuracoes','perfil','login','cadastro','master','a','u','index.html'];var p=location.pathname.split('/'),b=[];for(var i=1;i<p.length;i++){if(!p[i]||R.indexOf(p[i])>=0)break;b.push(p[i]);}var d=b.length?'/'+b.join('/'):'';window.SALUTE_DIR=d;var c=document.querySelector('script[data-salute-config]');if(c)c.setAttribute('src',d+'/config.js');})();</script>\n"
T=T.replace('<script src="config.js"></script>',_BOOT+'<script data-salute-config src="config.js"></script>',1)
assert 'data-salute-config' in T
T=re.sub(r'<title>[^<]*</title>','<title>Salute IA</title>',T,1)
T=T.replace('<head>','<head>\n<meta name="robots" content="noindex, nofollow">',1)
_bt=re.search(r'<script src="'+BABEL+'"[^>]*></script>\n?',T); assert _bt, 'babel'
T=T[:_bt.start()]+T[_bt.end():]
assert T.count('<script type="text/babel" src=')==len(JSX), T.count('<script type="text/babel" src=')
T=T.replace('<script type="text/babel" src=','<script src=')
assert BABEL not in T and 'text/babel' not in T
assert SVCAN in T and SVCR in T and SVCPN in T and SVCA in T and SVCC in T and SVCG in T and SBJS in T and SUPA in T and 'config.js' in T and SVCP in T and QRJS in T and SVCM in T
h=h[:tm.start(2)]+json.dumps(T).replace('</','<\\/')+h[tm.end(2):]
h=h.replace('<title>Salute IA — Admin UI kit</title>','<title>Salute IA</title>').replace('Loading Salute IA — Admin UI kit...','Abrindo a Salute IA...').replace('<head>','<head>\n  <meta name="robots" content="noindex, nofollow">',1)
open('../index.html','w').write(h)
