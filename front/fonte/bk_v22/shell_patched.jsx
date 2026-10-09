// Shell: icon rail + top bar (desktop) · compact bar + bottom nav (mobile).
const { Sidebar, TopBar, MobileBottomNav } = window.SaluteProjetoDesigner_8b4683;
const MARK = '../../assets/logo/salute-symbol.png';

function useIsMobile() {
  const q = '(max-width: 767px)';
  const [m, setM] = React.useState(() => !!window.__FORCE_MOBILE || window.matchMedia(q).matches);
  React.useEffect(() => { if (window.__FORCE_MOBILE) return; const mq = window.matchMedia(q); const f = () => setM(mq.matches); mq.addEventListener('change', f); return () => mq.removeEventListener('change', f); }, []);
  return m;
}

function AppShell({ active, onNavigate, title, subtitle, children, items = KIT_NAV, topExtra }) {
  const mobile = useIsMobile();
  const scroller = React.useRef(null);
  React.useEffect(() => { if (scroller.current) scroller.current.scrollTop = 0; }, [active]);
  if (mobile) {
    return (
      <div data-screen-label={`Mobile · ${title}`} style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
        <div ref={scroller} style={{ height: '100%', overflowY: 'auto', scrollbarWidth: 'none', padding: '0 16px calc(104px + env(safe-area-inset-bottom))', boxSizing: 'border-box' }}>
          <div style={{ position: 'sticky', top: 0, zIndex: 5, margin: '0 -16px', padding: 'calc(8px + env(safe-area-inset-top)) 16px 10px', background: 'linear-gradient(180deg, rgba(226,238,250,.96) 70%, rgba(226,238,250,0))' }}>
            <TopBar compact title={title} notifications={1} user={KIT_USER} logoMarkSrc={MARK} beforeAvatar={topExtra} />
          </div>
          {children}
        </div>
        <MobileBottomNav items={items} activeId={active} onSelect={onNavigate} style={{ position: 'absolute', left: 12, right: 12, bottom: 'calc(12px + env(safe-area-inset-bottom))', zIndex: 10 }} />
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', gap: 44, minHeight: '100vh', padding: '40px 44px 28px 40px', boxSizing: 'border-box' }}>
      <div style={{ position: 'sticky', top: 40, height: 'calc(100vh - 68px)', minHeight: 640, flexShrink: 0, zIndex: 5, display: 'flex', flexDirection: 'column' }}>
        <Sidebar items={items} activeId={active} onSelect={onNavigate} logoMarkSrc={MARK} user={KIT_USER} onLogo={() => onNavigate('painel')} style={{ height: 'auto', flex: 1 }} />
      </div>
      <main data-screen-label={title} style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 30 }}>
        <TopBar title={title} subtitle={subtitle} notifications={1} messages={0} user={KIT_USER} onMessages={() => onNavigate('mensagens')} beforeAvatar={topExtra} />
        {children}
      </main>
    </div>
  );
}

Object.assign(window, { AppShell, useIsMobile });
