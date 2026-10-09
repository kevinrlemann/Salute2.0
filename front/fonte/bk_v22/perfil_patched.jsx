const { Avatar: FAv, Icon: FIcon, Button: FBtn, Input: FInput } = window.SaluteProjetoDesigner_8b4683;

const SET_ITEMS = [['conta', 'Conta', 'user'], ['seguranca', 'Segurança', 'lock'], ['plano', 'Plano e cobrança', 'credit-card'], ['notif', 'Notificações', 'bell'], ['idioma', 'Idioma', 'globe']];
const field = { height: 52, borderRadius: 14, background: 'rgba(255,255,255,.75)', border: '1.5px solid #fff', padding: '0 18px', fontFamily: 'inherit', fontSize: 15, color: 'var(--text-strong)', outline: 'none', width: '100%', boxSizing: 'border-box' };
function Field({ label, value, type }) {
  return <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: 'var(--text-muted)' }}>{label}<input defaultValue={value} type={type} style={field} /></label>;
}
const PLAN_LIMIT = 10000;
const PLANS = [
  { id: 'inicial', nome: 'Inicial', preco: 197, sub: 'Para organizar a clínica inteira em um só lugar.', itens: ['Todos os módulos do sistema', 'Pacientes, prontuário e agenda', 'Mensagens com a equipe e WhatsApp', 'Estoque e financeiro', 'Saluteflix e Salute Cast'] },
  { id: 'iapro', nome: 'IA Pro', preco: 997, sub: 'A Renata IA atende, agenda e confirma por você.', destaque: true, itens: ['Tudo do plano Inicial', 'Renata IA no WhatsApp 24 horas', `Até ${(PLAN_LIMIT / 1000).toLocaleString('pt-BR')} mil mensagens de IA por mês`, 'Agendamento e confirmação automáticos', 'Envio automático de anamnese'] },
  { id: 'enterprise', nome: 'Enterprise', preco: null, sub: 'Para quem passa do limite ou precisa de mais de uma IA.', itens: ['Tudo do plano IA Pro', `Mais de ${(PLAN_LIMIT / 1000).toLocaleString('pt-BR')} mil mensagens por mês`, 'Várias IAs, por unidade ou especialidade', 'Plano montado conforme o volume', 'Acompanhamento de um consultor'] },
];
const PLAN_STORE = makeStore('iapro');

function PlanosSection({ mobile }) {
  const [cur, setCur] = useStore(PLAN_STORE);
  const [msg, setMsg] = React.useState(null);
  const used = 6240, pct = used / PLAN_LIMIT * 100;
  const brl = (n) => 'R$ ' + n.toLocaleString('pt-BR');
  return (
    <section style={{ ...glass, padding: mobile ? 16 : 26, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
        <div><h3 style={{ margin: 0, fontSize: mobile ? 19 : 22, fontWeight: 600, color: 'var(--text-strong)' }}>Plano e cobrança</h3><p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-muted)' }}>Plano atual: <B>{PLANS.find((p) => p.id === cur).nome}</B> · próxima cobrança em 10/10/2026</p></div>
        {cur === 'iapro' ? <div style={{ minWidth: 260, flex: mobile ? 1 : 'none', padding: '12px 14px', borderRadius: 16, background: 'rgba(255,255,255,.65)', border: '1.5px solid rgba(255,255,255,.95)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-muted)' }}><span>Mensagens de IA este mês</span><B>{pct.toFixed(0)}%</B></div>
          <div style={{ height: 8, borderRadius: 999, background: 'rgba(214,226,242,.8)', overflow: 'hidden', margin: '6px 0' }}><div style={{ width: pct + '%', height: '100%', borderRadius: 999, background: 'var(--gradient-brand)' }} /></div>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{used.toLocaleString('pt-BR')} de {PLAN_LIMIT.toLocaleString('pt-BR')} usadas · renova dia 10</span>
        </div> : null}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3, minmax(0,1fr))', gap: 16, alignItems: 'stretch' }}>
        {PLANS.map((p) => { const atual = cur === p.id; const dark = p.destaque; return (
          <div key={p.id} style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 14, padding: 22, borderRadius: 24, overflow: 'hidden',
            background: dark ? 'linear-gradient(160deg,#0A2A8F 0%,#0B4BEB 55%,#7B4BC4 130%)' : 'linear-gradient(160deg,rgba(255,255,255,.88),rgba(225,236,255,.7))', color: dark ? '#fff' : 'var(--text-strong)',
            border: atual && !dark ? '2px solid #1F5EFF' : '1.5px solid rgba(255,255,255,.95)', boxShadow: dark ? '0 24px 44px -24px rgba(11,75,235,.85)' : '0 14px 30px -24px rgba(23,73,170,.45)' }}>
            {dark ? <span style={{ position: 'absolute', right: -30, top: -30, width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,.2), rgba(255,255,255,0) 70%)' }} /> : null}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.12em' }}>{p.nome.toUpperCase()}</span>
              {atual ? <span style={{ fontSize: 11.5, fontWeight: 600, padding: '4px 10px', borderRadius: 999, background: dark ? 'rgba(255,255,255,.2)' : 'rgba(31,94,255,.1)', color: dark ? '#fff' : '#1F5EFF' }}>Seu plano</span> : null}
            </div>
            <div>{p.preco ? <span style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em' }}>{brl(p.preco)}<span style={{ fontSize: 15, fontWeight: 400, opacity: .8 }}>/mês</span></span> : <span style={{ fontSize: 30, fontWeight: 700 }}>Sob consulta</span>}
              <p style={{ margin: '6px 0 0', fontSize: 13.5, lineHeight: 1.5, opacity: dark ? .88 : 1, color: dark ? '#fff' : 'var(--text-muted)' }}>{p.sub}</p></div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
              {p.itens.map((t) => <li key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, lineHeight: 1.4 }}><span style={{ width: 20, height: 20, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: dark ? 'rgba(255,255,255,.2)' : 'rgba(31,94,255,.1)', color: dark ? '#fff' : '#1F5EFF' }}><FIcon name="check" size={12} strokeWidth={3} /></span>{t}</li>)}
            </ul>
            {atual ? <button type="button" disabled style={{ height: 48, borderRadius: 999, border: dark ? '1.5px solid rgba(255,255,255,.5)' : '1.5px solid rgba(214,226,242,.95)', background: 'transparent', color: 'inherit', fontFamily: 'inherit', fontSize: 15, fontWeight: 500, opacity: .85 }}>Plano atual</button>
              : <button type="button" onClick={() => { if (p.preco) { setCur(p.id); setMsg(`Pronto! Seu plano mudou para ${p.nome}. A diferença aparece na próxima cobrança.`); } else setMsg('Recebemos seu pedido. Um consultor vai chamar você no WhatsApp para montar o plano Enterprise.'); }}
                style={{ height: 48, borderRadius: 999, border: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, background: dark ? '#fff' : 'linear-gradient(90deg,#0B3FD9,#1F7BFF)', color: dark ? '#0B4BEB' : '#fff', boxShadow: dark ? 'none' : '0 10px 22px -10px rgba(11,63,217,.7)' }}>{p.preco ? 'Mudar para este plano' : 'Falar com consultor'}</button>}
          </div>); })}
      </div>
      {msg ? <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 16, background: 'rgba(45,191,106,.1)', color: '#1E8E4E', fontSize: 14 }}><FIcon name="circle-check" size={17} />{msg}</div> : null}
      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Ao chegar perto do limite de mensagens, avisamos por aqui e pelo WhatsApp. Ninguém fica sem atendimento: acima do limite, sugerimos o plano Enterprise.</span>
    </section>
  );
}

function SegurancaSection({ mobile }) {
  const [f, setF] = React.useState({ atual: '', nova: '', conf: '' });
  const [show, setShow] = React.useState(false);
  const [done, setDone] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [twofa, setTwofa] = React.useState(false);
  const rules = [['Pelo menos 8 caracteres', f.nova.length >= 8], ['Uma letra maiúscula', /[A-Z]/.test(f.nova)], ['Um número', /\d/.test(f.nova)], ['Um símbolo, como ! ou @', /[^A-Za-z0-9]/.test(f.nova)]];
  const score = rules.filter((r) => r[1]).length;
  const match = f.conf && f.conf === f.nova;
  const ok = f.atual && score === 4 && match;
  const inp = (k, l) => (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: 'var(--text-muted)' }}>{l}
      <span style={{ position: 'relative', display: 'block' }}><input type={show ? 'text' : 'password'} value={f[k]} onChange={(e) => { setF({ ...f, [k]: e.target.value }); setDone(false); }} style={{ ...field, paddingRight: 48 }} autoComplete={k === 'atual' ? 'current-password' : 'new-password'} />
        <button type="button" aria-label={show ? 'Esconder senha' : 'Mostrar senha'} onClick={() => setShow(!show)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', border: 0, background: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 6, display: 'flex' }}><FIcon name={show ? 'eye-off' : 'eye'} size={18} /></button></span>
    </label>
  );
  const sc = ['#E5484D', '#F2694A', '#F5B400', '#1F5EFF', '#2DBF6A'][score];
  return (
    <section style={{ ...glass, padding: mobile ? 16 : 26, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <h3 style={{ margin: 0, fontSize: mobile ? 19 : 22, fontWeight: 600, color: 'var(--text-strong)' }}>Segurança</h3>
      <Block title="Trocar senha" desc="Depois de trocar, os outros aparelhos conectados precisam entrar de novo.">
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'minmax(0,1fr) 260px', gap: 20, alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>{inp('atual', 'Senha atual')}{inp('nova', 'Nova senha')}{inp('conf', 'Confirmar nova senha')}
            {f.conf && !match ? <span style={{ fontSize: 13, color: '#E5484D', marginTop: -6 }}>As senhas não são iguais.</span> : null}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 14, borderRadius: 16, background: 'rgba(255,255,255,.7)' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-strong)' }}>Força da senha</span>
            <div style={{ display: 'flex', gap: 4 }}>{[0, 1, 2, 3].map((i) => <span key={i} style={{ flex: 1, height: 6, borderRadius: 999, background: i < score ? sc : 'rgba(214,226,242,.9)' }} />)}</div>
            {rules.map(([l, v]) => <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: v ? 'var(--text-strong)' : 'var(--text-muted)' }}><span style={{ width: 18, height: 18, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: v ? '#2DBF6A' : 'rgba(214,226,242,.9)', color: '#fff' }}>{v ? <FIcon name="check" size={11} strokeWidth={3} /> : null}</span>{l}</span>)}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 12 }}>{done ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#2DBF6A', fontWeight: 500 }}><FIcon name="check" size={15} />Senha alterada</span> : null}<FBtn iconLeft="lock" disabled={!ok} onClick={() => { setDone(true); setF({ atual: '', nova: '', conf: '' }); }}>Salvar nova senha</FBtn></div>
      </Block>
      <Block title="Esqueceu a senha atual?" desc="Enviamos um link seguro para você criar uma senha nova.">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ flex: 1, minWidth: 200, fontSize: 14, color: 'var(--text-body)' }}>O link vai para <B>camila@bellaforma.com.br</B> e vale por 30 minutos.</span>
          {sent ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#2DBF6A', fontWeight: 500 }}><FIcon name="mail-check" size={16} />Link enviado. Confira sua caixa de entrada.</span> : <FBtn variant="secondary" iconLeft="send" onClick={() => setSent(true)}>Solicitar troca de senha</FBtn>}
        </div>
      </Block>
      <Toggle on={twofa} onChange={setTwofa} label="Verificação em duas etapas" desc="Pede um código do WhatsApp sempre que entrar de um aparelho novo" />
    </section>
  );
}

function IdiomaSection({ mobile }) {
  const [lang] = useStore(LANG);
  return (
    <section style={{ ...glass, padding: mobile ? 16 : 26, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div><h3 style={{ margin: 0, fontSize: mobile ? 19 : 22, fontWeight: 600, color: 'var(--text-strong)' }}>Idioma</h3><p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-muted)' }}>O sistema muda na hora. Vale só para o seu usuário.</p></div>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(3, minmax(0,1fr))', gap: 12 }}>
        {LANGS.map(([k, l, s]) => { const on = lang === k; return (
          <button key={k} type="button" onClick={() => setLang(k)} aria-pressed={on} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, borderRadius: 20, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', border: on ? '2px solid #1F5EFF' : '2px solid rgba(255,255,255,.95)', background: on ? 'rgba(31,94,255,.07)' : 'rgba(255,255,255,.6)' }}>
            <span style={{ width: 42, height: 42, borderRadius: 14, background: on ? 'linear-gradient(180deg,#0B4BEB,#1FA8F5)' : 'rgba(31,94,255,.08)', color: on ? '#fff' : '#1F5EFF', fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s}</span>
            <span style={{ flex: 1, fontSize: 15, fontWeight: 600, color: 'var(--text-strong)' }}>{l}</span>
            <span style={{ width: 20, height: 20, borderRadius: '50%', border: on ? '6px solid #1F5EFF' : '2px solid rgba(150,175,210,.8)', boxSizing: 'border-box', background: '#fff' }} />
          </button>); })}
      </div>
      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Menus, títulos, abas e botões são traduzidos. Nomes de pacientes, valores e mensagens continuam como foram escritos.</span>
    </section>
  );
}

function NotifSection({ mobile }) {
  const [n, setN] = React.useState({ ag: true, anam: true, est: true, fin: false });
  return (
    <section style={{ ...glass, padding: mobile ? 16 : 26, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <h3 style={{ margin: 0, fontSize: mobile ? 19 : 22, fontWeight: 600, color: 'var(--text-strong)' }}>Notificações</h3>
      <SoundSettings />
      <Block title="Me avise quando">
        <div style={grid2(mobile, 240)}>
          <Toggle on={n.ag} onChange={(v) => setN({ ...n, ag: v })} label="Novo agendamento" desc="Feito pela Renata IA ou pela equipe" />
          <Toggle on={n.anam} onChange={(v) => setN({ ...n, anam: v })} label="Anamnese respondida" desc="O paciente terminou de preencher" />
          <Toggle on={n.est} onChange={(v) => setN({ ...n, est: v })} label="Estoque abaixo do mínimo" desc="Para repor antes de faltar" />
          <Toggle on={n.fin} onChange={(v) => setN({ ...n, fin: v })} label="Pagamento atrasado" desc="Receitas vencidas e não recebidas" />
        </div>
      </Block>
    </section>
  );
}

function PerfilScreen({ mobile }) {
  const [tab, setTab] = React.useState('conta');
  const g = mobile ? 14 : 26;
  const menu = mobile ? (
    <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>{SET_ITEMS.map(([k, l, i]) => <span key={k} style={{ flexShrink: 0 }}><FilterChip active={tab === k} onClick={() => setTab(k)}><FIcon name={i} size={14} />{l}</FilterChip></span>)}</div>
  ) : (
    <section style={{ ...glass, padding: '24px 0', display: 'flex', flexDirection: 'column', minHeight: 520 }}>
      <h3 style={{ margin: '0 24px 18px', fontSize: 22, fontWeight: 600, color: 'var(--text-strong)' }}>Configurações gerais</h3>
      {SET_ITEMS.map(([k, l, i]) => {
        const on = k === tab;
        return <button key={k} type="button" onClick={() => setTab(k)} style={{ display: 'flex', alignItems: 'center', gap: 12, height: 58, padding: '0 26px', border: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 17, textAlign: 'left',
          background: on ? 'linear-gradient(180deg,#0B4BEB 0%,#1FB6F5 100%)' : 'transparent', color: on ? '#fff' : 'var(--text-strong)' }}><FIcon name={i} size={19} />{l}</button>;
      })}
      <span style={{ flex: 1, minHeight: 24 }} />
      <button type="button" style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 26px', border: 0, background: 'transparent', color: '#EF4444', fontFamily: 'inherit', fontSize: 16, cursor: 'pointer', padding: 0 }}><FIcon name="trash-2" size={18} />Excluir conta</button>
    </section>
  );
  const conta = (
    <section style={{ ...glass, padding: 0, overflow: 'hidden' }}>
      <div style={{ height: 118, background: 'linear-gradient(100deg,#2ED39A 0%,#22E3F0 38%,#1FA8F5 62%,#0B4BEB 100%)' }} />
      <div style={{ padding: mobile ? '0 18px 22px' : '0 34px 30px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, marginTop: -44 }}>
          <span style={{ position: 'relative' }}><FAv name="Camila Rocha" size={92} ring /><span style={{ position: 'absolute', right: 2, bottom: 4, width: 24, height: 24, borderRadius: '50%', background: '#fff', color: '#1F5EFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}><FIcon name="pencil" size={12} /></span></span>
          <button type="button" style={{ height: 50, padding: '0 46px', borderRadius: 999, border: 0, background: 'linear-gradient(90deg,#0B3FD9,#1F7BFF)', color: '#fff', fontFamily: 'inherit', fontSize: 17, fontWeight: 500, cursor: 'pointer', boxShadow: '0 10px 22px -10px rgba(11,63,217,.7)' }}>Salvar</button>
        </div>
        <div style={{ margin: '14px 0 22px', paddingBottom: 18, borderBottom: '1px solid rgba(214,226,242,.9)' }}>
          <p style={{ margin: 0, fontSize: 22, fontWeight: 600, color: 'var(--text-strong)', display: 'flex', alignItems: 'center', gap: 8 }}>Camila Rocha <FIcon name="badge-check" size={20} color="#1F5EFF" /></p>
          <p style={{ margin: '4px 0 0', fontSize: 14, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}><FIcon name="map-pin" size={14} />Itapira, SP</p>
        </div>
        <p style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 600, color: 'var(--text-strong)' }}>Informações pessoais</p>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: '16px 22px' }}>
          <Field label="Nome" value="Camila" /><Field label="Sobrenome" value="Rocha" />
          <Field label="E-mail" value="camila@bellaforma.com.br" /><Field label="Telefone" value="(19) 99800-4100" />
          <Field label="Tipo de conta" value="Administradora" />
        </div>
      </div>
    </section>
  );
  const body = { conta, seguranca: <SegurancaSection mobile={mobile} />, plano: <PlanosSection mobile={mobile} />, notif: <NotifSection mobile={mobile} />, idioma: <IdiomaSection mobile={mobile} /> }[tab];
  return <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '300px minmax(0,1fr)', gap: g, alignItems: 'start' }}>{menu}{body}</div>;
}

Object.assign(window, { PerfilScreen });
