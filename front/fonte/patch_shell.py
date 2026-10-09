import sys
s = open('bk_v22/shell_patched.jsx', encoding='utf8').read()
def rep(old, new, n):
    global s
    if s.count(old) != n: sys.exit('shell: ' + old[:100])
    s = s.replace(old, new)
rep("  const mobile = useIsMobile();\n  const scroller = React.useRef(null);", "  const mobile = useIsMobile();\n  const scroller = React.useRef(null);\n  const [notif] = SB_ON ? useStore(NOTIF) : [null];\n  const nNotif = SB_ON ? notif.naoLidas : 1;", 1)
rep("notifications={1}", "notifications={nNotif}", 2)
# faixa do suporte acima do título, avatar abre Minha conta e a seta de sair fica ao lado do avatar
rep("function AppShell({ active, onNavigate, title, subtitle, children, items = KIT_NAV, topExtra }) {", "function AppShell({ active, onNavigate, title, subtitle, children, items = KIT_NAV, topExtra, banner }) {", 1)
rep("<TopBar compact title={title} notifications={nNotif} user={KIT_USER} logoMarkSrc={MARK} beforeAvatar={topExtra} />", "<TopBar compact title={title} notifications={nNotif} user={KIT_USER} logoMarkSrc={MARK} beforeAvatar={topExtra} onUser={abrirConta} onNotifications={abrirNotif} afterAvatar={<BotaoSair variante=\"compacto\" />} />", 1)
rep("          {children}\n        </div>\n        <MobileBottomNav", "          {banner}\n          {children}\n        </div>\n        <MobileBottomNav", 1)
rep("<Sidebar items={items} activeId={active} onSelect={onNavigate} logoMarkSrc={MARK} user={KIT_USER} onLogo={() => onNavigate('painel')} style={{ height: 'auto', flex: 1 }} />", "<Sidebar items={items} activeId={active} onSelect={onNavigate} logoMarkSrc={MARK} user={KIT_USER} onLogo={() => onNavigate('painel')} onUser={abrirConta} afterUser={<BotaoSair variante=\"lateral\" />} style={{ height: 'auto', flex: 1 }} />", 1)
rep("        <TopBar title={title} subtitle={subtitle} notifications={nNotif} messages={0} user={KIT_USER} onMessages={() => onNavigate('mensagens')} beforeAvatar={topExtra} />", "        {banner}\n        <TopBar title={title} subtitle={subtitle} notifications={nNotif} messages={0} user={KIT_USER} onMessages={() => onNavigate('mensagens')} beforeAvatar={topExtra} onUser={abrirConta} onNotifications={abrirNotif} afterAvatar={<BotaoSair variante=\"topo\" />} />", 1)
open('shell_patched.jsx', 'w', encoding='utf8').write(s)
print('ok shell')
