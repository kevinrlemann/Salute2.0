const { Dialog: XDialog, Input: XInput, Select: XSelect, Switch: XSwitch, Button: XButton, Toast: XToast } = window.SaluteProjetoDesigner_8b4683;

const ROUTES = {
  painel: { title: 'Bom dia, Dra. Camila', mobileTitle: 'Painel', subtitle: 'Seu progresso esta semana está ótimo.', C: PainelScreen },
  pacientes: { title: 'Pacientes', C: PacientesScreen },
  agenda: { title: 'Agenda', C: AgendaScreen },
  mensagens: { title: 'Mensagens', C: MensagensScreen },
  gestao: { title: 'Gestão', C: GestaoScreen },
  perfil: { title: 'Configurações', C: ConfigScreen },
};

function App() {
  const mobile = useIsMobile();
  const { member, can } = useAccess();
  const [, setVA] = useStore(VIEW_AS);
  const [inc] = useStore(INCOMING);
  const [incShow, setIncShow] = React.useState(null);
  useStore(LANG);
  React.useEffect(() => { startLangObserver(); if (LANG.v !== 'pt') setLang(LANG.v); }, []);
  React.useEffect(() => { if (!inc) return; setIncShow(inc); const t = setTimeout(() => setIncShow(null), 4500); return () => clearTimeout(t); }, [inc && inc.id]);
  const navItems = KIT_NAV.filter((n) => can(n.id));
  const [route0, setRoute] = React.useState(() => { let r = null; try { r = localStorage.getItem('salute-kit:route'); } catch (e) {} return ROUTES[r] ? r : 'painel'; });
  const route = can(route0) ? route0 : (navItems[0] || { id: 'painel' }).id;
  const [novo, setNovo] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  React.useEffect(() => { try { localStorage.setItem('salute-kit:route', route0); } catch (e) {} }, [route0]);
  React.useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 3000); return () => clearTimeout(t); }, [toast]);
  const r = ROUTES[route]; const Screen = r.C;
  return (
    <>
      <AppShell items={navItems} active={route} onNavigate={setRoute} title={mobile ? r.mobileTitle || r.title : r.title} subtitle={mobile ? undefined : r.subtitle}>
        <Screen mobile={mobile} onNavigate={setRoute} onNew={() => setNovo(true)} />
      </AppShell>
      <XDialog open={novo} onClose={() => setNovo(false)} icon="calendar-plus" title="Novo agendamento" description="O paciente recebe a confirmação automaticamente."
        footer={<><XButton variant="secondary" onClick={() => setNovo(false)}>Cancelar</XButton><XButton iconLeft="check" onClick={() => { setNovo(false); setToast({ tone: 'success', title: 'Agendamento criado', description: 'Ronald Richards · 2 out · 09:00' }); }}>Agendar</XButton></>}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
          <XInput label="Paciente" iconLeft="search" defaultValue="Ronald Richards" style={{ gridColumn: '1 / -1' }} />
          <XSelect label="Profissional" options={['Darlene Robertson', 'Michael Thompson', 'Max Worthington', 'Dr. McCoy']} />
          <XInput label="Horário" type="time" defaultValue="09:00" />
          <div style={{ gridColumn: '1 / -1' }}><XSwitch defaultChecked label="Enviar confirmação por WhatsApp" /></div>
        </div>
      </XDialog>
      {member ? <div style={{ position: 'fixed', zIndex: 150, top: mobile ? 'auto' : 14, bottom: mobile ? 'calc(96px + env(safe-area-inset-bottom))' : 'auto', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 12, padding: '8px 8px 8px 16px', borderRadius: 999, background: 'linear-gradient(90deg,#0A2A8F,#7B4BC4)', color: '#fff', fontFamily: 'var(--font-sans)', fontSize: 14, boxShadow: '0 16px 30px -14px rgba(11,42,143,.7)', whiteSpace: 'nowrap', maxWidth: 'calc(100vw - 24px)' }}>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}><span style={{ opacity: .8 }}>Visualizando como </span><b>{member.nome}</b><span style={{ opacity: .8 }}> · {member.funcao}</span></span>
        <button type="button" onClick={() => setVA(null)} style={{ height: 34, padding: '0 14px', borderRadius: 999, border: 0, background: '#fff', color: '#0B4BEB', fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>Sair da visualização</button>
      </div> : null}
      {incShow ? <div onClick={() => { setIncShow(null); setRoute('mensagens'); }} style={{ position: 'fixed', zIndex: 140, right: mobile ? 12 : 24, left: mobile ? 12 : 'auto', top: mobile ? 70 : 24, cursor: 'pointer' }}><XToast tone="info" title={'Nova mensagem de ' + incShow.from} description={incShow.text} onClose={() => setIncShow(null)} style={{ width: mobile ? '100%' : 360 }} /></div> : null}
      {toast ? <div style={{ position: mobile ? 'absolute' : 'fixed', zIndex: 120, right: mobile ? 12 : 24, left: mobile ? 12 : 'auto', top: mobile ? 70 : 'auto', bottom: mobile ? 'auto' : 24 }}><XToast {...toast} onClose={() => setToast(null)} style={{ width: mobile ? '100%' : 360 }} /></div> : null}
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
