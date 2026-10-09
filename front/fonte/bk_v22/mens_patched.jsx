const { Avatar: MAv, Icon: MIcon } = window.SaluteProjetoDesigner_8b4683;

const INBOX = [
  { id: 1, n: 'Dr. James Smith', m: 'A usabilidade é essencial em UX...', t: '14:30', u: 0 },
  { id: 2, n: 'Dr. Livia Siphron', m: 'Como podemos ajudar? Estamos aqui!', t: '14:30', u: 3 },
  { id: 3, n: 'Michael Thompson', m: 'Aguardando o resultado dos exames...', t: '14:02', u: 0 },
  { id: 4, n: 'Dr. Hanna Rosser', m: 'Como podemos ajudar? Estamos aqui!', t: '14:30', u: 3 },
  { id: 5, n: 'Sarah Scott', m: 'Como podemos ajudar? Estamos aqui!', t: '14:30', u: 0 },
  { id: 6, n: 'Adam Bridges', m: 'Como podemos ajudar? Estamos aqui!', t: '14:30', u: 3 },
  { id: 7, n: 'Sarah Scott', m: 'Como podemos ajudar? Estamos aqui!', t: '14:30', u: 0 },
];
const EQUIPE = [
  { id: 101, n: 'Darlene Robertson', r: 'Terapeuta', m: 'Pode encaixar a Mariana às 15h30?', t: '15:42', u: 2, msgs: [
    { me: false, t: '15:38', text: 'Camila, pode encaixar a Mariana Alves às 15h30? Ela pediu pelo WhatsApp.' },
    { me: true, t: '15:40', text: 'Posso sim. Deixa que eu confirmo com ela.' },
    { me: false, t: '15:42', text: 'Perfeito! Já separei o kit de toxina na sala 1.' }] },
  { id: 102, n: 'Ana Paula', r: 'Recepção', m: 'A Renata confirmou 6 retornos para amanhã.', t: '15:10', u: 0, msgs: [
    { me: false, t: '15:08', text: 'Boa tarde! A Renata IA confirmou 6 retornos para amanhã.' },
    { me: false, t: '15:10', text: 'Só o Thiago Rocha ainda não respondeu, vou ligar para ele.' }] },
  { id: 103, n: 'Max Worthington', r: 'Psicólogo', m: 'Chegou o pedido de ácido hialurônico.', t: '14:55', u: 1, msgs: [
    { me: false, t: '14:55', text: 'Chegou o pedido de ácido hialurônico. Já dei entrada no estoque.' }] },
  { id: 104, n: 'Michael Thompson', r: 'Psiquiatra', m: 'Ok, obrigado!', t: '13:20', u: 0, msgs: [
    { me: true, t: '13:18', text: 'Michael, a sala 2 fica livre a partir das 14h.' }, { me: false, t: '13:20', text: 'Ok, obrigado!' }] },
  { id: 105, n: 'Equipe clínica', r: '6 pessoas', m: 'Ana: reunião sexta às 18h', t: '10:30', u: 4, msgs: [
    { me: false, t: '10:30', text: 'Lembrete: reunião de alinhamento sexta às 18h. Pauta: metas de outubro e novo fluxo de anamnese.' }] },
];
const nowHM2 = () => { const d = new Date(); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); };
const circleBtn = { width: 40, height: 40, borderRadius: '50%', border: '1.5px solid rgba(214,226,242,.95)', background: 'rgba(255,255,255,.7)', color: 'var(--text-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 };

/* ===== VERSÃO 01: visual anterior de Mensagens (cards de vidro, bolhas azuis) ===== */
function MensagensV01({ mobile }) {
  const [tab, setTabRaw] = React.useState('p');
  const [ficha, setFicha] = React.useState(null);
  const [sel, setSel] = React.useState(mobile ? null : 3);
  const [conv, setConv] = React.useState({});
  const setTab = (k) => { setTabRaw(k); setSel(mobile ? null : k === 'p' ? 3 : 101); };
  const BASE = ([
    { me: true, t: '10:40', text: 'Olá, Dr. Michael Thompson!' },
    { me: false, t: '10:39', text: 'Olá, Corey Philips. Como posso ajudar hoje?' },
    { me: true, t: '10:40', text: 'Não estou me sentindo bem há alguns dias. Dores musculares, garganta irritada e um pouco de tosse.' },
    { me: false, t: '10:39', text: 'Entendo. Está sentindo mais alguma coisa?' },
  ]);
  const LIST = tab === 'p' ? INBOX : EQUIPE;
  const isTeam = tab === 'd';
  const [v, setV] = React.useState('');
  const cur = LIST.find((c) => c.id === sel);
  const msgs = conv[sel] || (cur && cur.msgs) || BASE;
  const convRef = React.useRef(conv); convRef.current = conv;
  const REPLIES = ['Perfeito, obrigada!', 'Combinado, até lá!', 'Pode ser sim. Me confirma o horário?', 'Entendi. Vou ver aqui e já te respondo.'];
  const send = () => {
    if (!v.trim()) return;
    const id = sel, who = cur, base = [...msgs, { me: true, t: nowHM2(), text: v.trim() }];
    setConv({ ...conv, [id]: base }); setV('');
    setTimeout(() => {
      const txt = REPLIES[Math.floor(Math.random() * REPLIES.length)];
      const now = convRef.current[id] || base;
      setConv({ ...convRef.current, [id]: [...now, { me: false, t: nowHM2(), text: txt }] });
      notifyIncoming(who.n, txt);
    }, 3500);
  };
  const list = (
    <section style={{ ...glass, padding: '20px 0 0', overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <CardTitle right={<button type="button" aria-label="Nova conversa" style={{ ...circleBtn, width: 44, height: 44 }}><MIcon name="plus" size={20} /></button>}>Caixa de entrada</CardTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: 4, borderRadius: 999, background: 'rgba(255,255,255,.4)', border: '1.5px solid rgba(255,255,255,.95)' }}>
          {[['p', 'Pacientes'], ['d', 'Equipe']].map(([k, l]) => <button key={k} type="button" onClick={() => setTab(k)} style={{ height: 48, borderRadius: 999, border: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 17, fontWeight: tab === k ? 600 : 400, color: 'var(--text-strong)', background: tab === k ? '#fff' : 'transparent', boxShadow: tab === k ? '0 4px 12px -6px rgba(23,73,170,.3)' : 'none' }}>{l}</button>)}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: 'rgba(150,175,210,.5) transparent', marginTop: 10 }}>
        {LIST.map((c) => {
          const on = c.id === sel;
          return (
            <button key={c.id} type="button" onClick={() => setSel(c.id)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '16px 20px', border: 0, borderTop: on ? 0 : '1px solid rgba(214,226,242,.7)', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', background: on ? 'linear-gradient(180deg,#0B4BEB 0%,#1FA8F5 100%)' : 'transparent', color: on ? '#fff' : 'inherit' }}>
              <MAv name={c.n} size={50} status="online" />
              <span style={{ flex: 1, minWidth: 0 }}>
                <span style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: 17, fontWeight: 500, color: on ? '#fff' : 'var(--text-strong)' }}>{c.n}</span><span style={{ fontSize: 13, color: on ? '#fff' : 'var(--text-strong)' }}>{c.t}</span></span>
                <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginTop: 4 }}><span style={{ fontSize: 13, color: on ? 'rgba(255,255,255,.88)' : 'var(--text-body)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.m}</span>{c.u && !on ? <span style={{ minWidth: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(180deg,#1F5EFF,#22C3F2)', color: '#fff', fontSize: 11, lineHeight: '22px', textAlign: 'center', flexShrink: 0 }}>{c.u}</span> : null}</span>
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
  const thread = cur ? (
    <section style={{ ...glass, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '18px 24px', borderBottom: '1px solid rgba(214,226,242,.8)', background: 'rgba(255,255,255,.35)' }}>
        {mobile ? <button type="button" aria-label="Voltar" onClick={() => setSel(null)} style={circleBtn}><MIcon name="arrow-left" size={18} /></button> : null}
        <button type="button" disabled={isTeam} onClick={() => setFicha({ p: waPaciente(cur), conv: waToFicha(msgs), key: 'v01c' + cur.id, name: cur.n })} title={isTeam ? undefined : 'Abrir ficha do paciente'} aria-label={isTeam ? cur.n : 'Abrir ficha de ' + cur.n} style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 14, border: 0, padding: 0, background: 'transparent', cursor: isTeam ? 'default' : 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
          <MAv name={cur.n} size={52} status="online" />
          <span style={{ flex: 1, minWidth: 0 }}><span style={{ display: 'block', fontSize: 20, fontWeight: 600, color: 'var(--text-strong)' }}>{cur.n}</span><span style={{ display: 'block', fontSize: 15, color: '#2DBF6A' }}>{cur.r ? cur.r + ' · ' : ''}Online{isTeam ? '' : <span style={{ color: 'var(--text-muted)' }}> · ver ficha</span>}</span></span>
        </button>
        {['phone', 'video', 'ellipsis-vertical'].map((i) => <button key={i} type="button" aria-label={i} style={{ border: 0, background: 'transparent', color: 'var(--text-strong)', cursor: 'pointer', padding: 6 }}><MIcon name={i} size={22} /></button>)}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: 'rgba(150,175,210,.5) transparent', padding: mobile ? '18px 14px' : '26px 26px', display: 'flex', flexDirection: 'column', gap: 26 }}>
        {msgs.map((m, i) => m.me ? (
          <div key={i} style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, maxWidth: '62%' }}>
              <span style={{ fontSize: 15, color: 'var(--text-muted)' }}>{m.t} <b style={{ color: 'var(--text-strong)', fontWeight: 600, marginLeft: 6 }}>Você</b></span>
              <div style={{ padding: '14px 20px', borderRadius: '18px 4px 18px 18px', background: 'linear-gradient(180deg,#0B4BEB 0%,#1FB6F5 100%)', color: '#fff', fontSize: 15, lineHeight: 1.5, boxShadow: '0 10px 24px -14px rgba(11,75,235,.7)' }}>{m.text}</div>
            </div>
            <MAv name={KIT_USER.name} size={48} status="online" />
          </div>
        ) : (
          <div key={i} style={{ display: 'flex', gap: 12 }}>
            <MAv name={cur.n} size={48} status="online" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: '62%' }}>
              <span style={{ fontSize: 17, fontWeight: 600, color: 'var(--text-strong)' }}>{cur.n} <span style={{ fontSize: 15, fontWeight: 400, color: 'var(--text-muted)', marginLeft: 8 }}>{m.t}</span></span>
              <div style={{ position: 'relative', padding: '14px 20px', borderRadius: '4px 18px 18px 18px', background: 'rgba(255,255,255,.9)', color: 'var(--text-strong)', fontSize: 15, lineHeight: 1.5 }}>{m.text}
                <span style={{ position: 'absolute', left: 14, bottom: -12, width: 26, height: 26, borderRadius: '50%', background: '#fff', boxShadow: '0 2px 6px rgba(23,73,170,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F5B400' }}><MIcon name="thumbs-up" size={13} strokeWidth={2.2} /></span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ padding: mobile ? '0 12px 12px' : '0 26px 24px' }}>
        <div style={{ borderRadius: 22, padding: 2, background: 'linear-gradient(90deg,#0B4BEB,#22C3F2)' }}>
          <div style={{ borderRadius: 20, background: 'rgba(250,252,255,.97)', padding: '16px 18px 14px', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><MIcon name="sparkles" size={20} color="#1F5EFF" /><input value={v} onChange={(e) => setV(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} placeholder={isTeam ? 'Mensagem para ' + cur.n.split(' ')[0] + '...' : 'Enviar mensagem...'} style={{ flex: 1, border: 0, outline: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: 17, color: 'var(--text-strong)' }} /></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {['paperclip', 'globe', 'camera', 'video'].map((i) => <button key={i} type="button" aria-label={i} style={{ ...circleBtn, width: 44, height: 44 }}><MIcon name={i} size={18} /></button>)}
              <span style={{ flex: 1 }} />
              <button type="button" aria-label="Enviar" onClick={send} style={{ width: 50, height: 50, borderRadius: '50%', border: 0, cursor: 'pointer', background: 'linear-gradient(180deg,#0B4BEB,#22C3F2)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 18px -8px rgba(11,75,235,.7)' }}><MIcon name="send" size={20} /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  ) : null;
  const fichaEl = ficha ? <PacienteFicha key={ficha.p.nome} p={ficha.p} conversa={ficha.conv} chatKey={ficha.key} contactName={ficha.name} mobile={mobile} initialTab="dados" onClose={() => setFicha(null)} onUpdate={(np) => setFicha((f) => ({ ...f, p: np }))} /> : null;
  if (mobile) return <><div style={{ height: 'calc(100vh - 190px)', minHeight: 520, display: 'flex', flexDirection: 'column' }}>{cur ? thread : list}</div>{fichaEl}</>;
  return <><div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px,440px) minmax(0,1fr)', gap: 26, height: 'calc(100vh - 170px)', minHeight: 620 }}>{list}{thread}</div>{fichaEl}</>;
}


/* =====================================================================
   MENSAGENS · VISUAL WHATSAPP
   Para voltar ao visual anterior ("Versão 01"), troque para 'v01'.
   ===================================================================== */
const MENSAGENS_VERSAO = 'whatsapp';

const WA = { bg: '#0b141a', panel: '#111b21', head: '#202c33', field: '#2a3942', hover: '#202c33', sel: '#2a3942', line: '#222d34', text: '#e9edef', sub: '#8696a0', green: '#00a884', out: '#005c4b', inn: '#202c33', blue: '#53bdeb', chip: '#0a332c', date: '#182229' };
const WA_DOODLE = (() => {
  const s = 'none" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="220" viewBox="0 0 220 220">
  <path fill="${s}" d="M14 18h26a6 6 0 0 1 6 6v14a6 6 0 0 1-6 6H26l-8 7v-7h-4a6 6 0 0 1-6-6V24a6 6 0 0 1 6-6z"/>
  <path fill="${s}" d="M86 20c-6 0-10 5-9 11 1 7 4 18 7 18 2 0 3-5 4-9 1 4 2 9 4 9 3 0 6-11 7-18 1-6-3-11-9-11-1 0-2 1-2 1s-1-1-2-1z"/>
  <path fill="${s}" d="M160 16l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1z"/>
  <circle fill="${s}" cx="196" cy="34" r="9"/>
  <path fill="${s}" d="M30 92c0-8 6-12 12-8 6-4 12 0 12 8 0 8-12 16-12 16s-12-8-12-16z"/>
  <path fill="${s}" d="M96 86l6 6m0-6l-6 6M92 80h14v18H92z"/>
  <path fill="${s}" d="M140 80c10 0 18 8 18 18m-18-10c5 0 8 4 8 8"/>
  <path fill="${s}" d="M186 84c6 8 6 16 0 24m-8-20c3 4 3 10 0 14"/>
  <path fill="${s}" d="M22 150h20v24H22zM26 150v-6a6 6 0 0 1 12 0v6"/>
  <path fill="${s}" d="M78 148l18 18m0-18l-6 6m-6 6l-6 6M84 142l6 6"/>
  <path fill="${s}" d="M130 146a12 12 0 1 0 0 24 12 12 0 1 0 0-24zm-4 8l8 4-8 4z"/>
  <path fill="${s}" d="M176 140v30m-10-20l10-10 10 10m-20 22h20"/>
  <path fill="${s}" d="M40 200l6-12 6 12m-10-4h8"/>
  <path fill="${s}" d="M100 196c4-8 12-8 16 0s12 8 16 0"/>
  <path fill="${s}" d="M168 190h22m-11-11v22"/>
</svg>`;
  return 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")';
})();

function WaTicks({ s }) {
  if (!s) return null;
  const c = s === 'read' ? WA.blue : WA.sub;
  if (s === 'sent') return <svg width="12" height="11" viewBox="0 0 12 11" aria-label="Enviada" style={{ flexShrink: 0 }}><path d="M1 6l3.2 3.2L11 2" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  return <svg width="16" height="11" viewBox="0 0 16 11" aria-label={s === 'read' ? 'Lida' : 'Entregue'} style={{ flexShrink: 0 }}><path d="M1 6l3.2 3.2L11 2M6.5 8.6l.7.6L14 2" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
const waIcon = (name, label, onClick, size = 22) => <button type="button" aria-label={label} title={label} onClick={onClick} style={{ width: 40, height: 40, borderRadius: '50%', border: 0, background: 'transparent', color: WA.sub, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, flexShrink: 0 }}><MIcon name={name} size={size} /></button>;

function WaBubble({ m, first }) {
  const out = m.me;
  const bg = out ? WA.out : WA.inn;
  return (
    <div style={{ display: 'flex', justifyContent: out ? 'flex-end' : 'flex-start', padding: out ? '0 0 0 12%' : '0 12% 0 0', marginTop: first ? 10 : 2 }}>
      <div style={{ position: 'relative', maxWidth: '100%', padding: '6px 9px 8px 9px', borderRadius: 8, borderTopRightRadius: out && first ? 0 : 8, borderTopLeftRadius: !out && first ? 0 : 8, background: bg, color: WA.text, fontSize: 14.2, lineHeight: '19px', boxShadow: '0 1px .5px rgba(11,20,26,.13)', wordBreak: 'break-word' }}>
        {first ? <span style={{ position: 'absolute', top: 0, [out ? 'right' : 'left']: -8, width: 0, height: 0, borderTop: `0 solid transparent`, borderBottom: '13px solid transparent', [out ? 'borderLeft' : 'borderRight']: `8px solid ${bg}` }} /> : null}
        {m.ia ? <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12.5, fontWeight: 600, color: '#a78bfa', marginBottom: 2 }}><MIcon name="sparkles" size={12} />Renata IA</span> : null}
        {m.who ? <span style={{ display: 'block', fontSize: 12.8, fontWeight: 600, color: '#53bdeb', marginBottom: 2 }}>{m.who}</span> : null}
        <span>{m.text}</span>
        <span style={{ display: 'inline-block', width: out ? 64 : 46 }} />
        <span style={{ position: 'absolute', right: 8, bottom: 4, display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 11, color: out ? 'rgba(233,237,239,.6)' : WA.sub }}>{m.t}{out ? <WaTicks s={m.s || 'read'} /> : null}</span>
      </div>
    </div>
  );
}

/* =====================================================================
   CHAT WHATSAPP COMPARTILHADO
   O mesmo chat aparece em Mensagens e na aba Conversa da ficha do paciente.
   Responder citando, reagir, copiar, apagar, arquivos, fotos, áudio,
   emojis e figurinhas.
   ===================================================================== */
const CHAT_STORE = makeStore({});
const CHAT_TYPING = makeStore({});
const waUid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
function chatGet(key, seed) {
  if (!CHAT_STORE.v[key]) CHAT_STORE.v = { ...CHAT_STORE.v, [key]: (typeof seed === 'function' ? seed() : seed || []).map((m) => ({ id: m.id || waUid(), ...m })) };
  return CHAT_STORE.v[key];
}
const CHAT_TOUCHED = {};
function chatSet(key, fn) { CHAT_TOUCHED[key] = true; const cur = CHAT_STORE.v[key] || []; CHAT_STORE.v = { ...CHAT_STORE.v, [key]: fn(cur) }; CHAT_STORE.subs.forEach((f) => f()); }
function chatTyping(key, on) { CHAT_TYPING.v = { ...CHAT_TYPING.v, [key]: on }; CHAT_TYPING.subs.forEach((f) => f()); }
const WA_REPLIES = ['Perfeito, obrigada!', 'Combinado, até lá!', 'Pode ser sim. Me confirma o horário?', 'Entendi. Vou ver aqui e já te respondo.', 'Recebi aqui, obrigada!'];
function chatSend(key, msg, who) {
  const mine = { id: waUid(), me: true, t: nowHM2(), s: 'sent', ...msg };
  chatSet(key, (l) => [...l, mine]);
  const mark = (s) => chatSet(key, (l) => l.map((x) => x.me && !x.deleted && (x.id === mine.id || s === 'read') && x.s !== 'read' ? { ...x, s } : x));
  setTimeout(() => mark('delivered'), 900);
  setTimeout(() => { mark('read'); chatTyping(key, true); }, 1800);
  setTimeout(() => {
    const txt = msg.kind === 'audio' ? 'Ouvi seu áudio, obrigada!' : msg.kind === 'image' ? 'Que ótimo, recebi a foto!' : msg.kind === 'file' ? 'Recebi o arquivo, obrigada!' : WA_REPLIES[Math.floor(Math.random() * WA_REPLIES.length)];
    chatTyping(key, false);
    chatSet(key, (l) => [...l, { id: waUid(), me: false, t: nowHM2(), text: txt }]);
    if (who) notifyIncoming(who, txt);
  }, 3800);
}
const waPreview = (m) => !m ? '' : m.deleted ? 'Mensagem apagada' : m.kind === 'image' ? '📷 ' + (m.text || 'Foto') : m.kind === 'video' ? '🎥 ' + (m.text || 'Vídeo') : m.kind === 'audio' ? '🎤 Áudio ' + waDur(m.dur) : m.kind === 'file' ? '📄 ' + m.name : m.kind === 'sticker' ? '🏷️ Figurinha' : m.text;
const waDur = (s) => { s = Math.max(0, Math.round(s || 0)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
const waSize = (b) => b > 1048576 ? (b / 1048576).toFixed(1).replace('.', ',') + ' MB' : Math.max(1, Math.round(b / 1024)) + ' kB';
const WA_EMOJIS = ['😀', '😂', '😊', '😍', '🥰', '😉', '😎', '🤩', '😅', '🤔', '😮', '😢', '🙏', '👏', '👍', '👌', '💪', '🙌', '❤️', '💙', '✨', '🔥', '🎉', '💐', '💉', '🦷', '💆‍♀️', '💅', '📅', '⏰', '✅', '❌', '📍', '📞', '💬', '📷'];
const WA_REACTS = ['👍', '❤️', '😂', '😮', '😢', '🙏'];
function waSticker(e, t, c) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><defs><filter id="s" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="3" stdDeviation="3.5" flood-color="#000" flood-opacity=".35"/></filter></defs><g filter="url(#s)"><circle cx="100" cy="84" r="66" fill="#fff"/><circle cx="100" cy="84" r="58" fill="${c}"/><text x="100" y="110" font-size="72" text-anchor="middle" font-family="Apple Color Emoji,Segoe UI Emoji,Noto Color Emoji,sans-serif">${e}</text><g transform="rotate(-5 100 162)"><rect x="18" y="140" width="164" height="44" rx="22" fill="#fff"/><rect x="24" y="145" width="152" height="34" rx="17" fill="#0B3FD9"/><text x="100" y="169" font-size="21" font-weight="800" text-anchor="middle" fill="#fff" font-family="Arial, Helvetica, sans-serif">${t}</text></g></g></svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}
const WA_STICKERS = [['🙏', 'Obrigada!', '#E7F0FF'], ['✅', 'Agendado!', '#E6F8EE'], ['👋', 'Até já!', '#FFF3DD'], ['☀️', 'Bom dia!', '#FFF7CC'], ['😍', 'Que lindo!', '#FFE7EF'], ['🤝', 'Combinado', '#EAF2FD'], ['💙', 'Te espero!', '#E3EEFF'], ['✨', 'Resultado top!', '#F1E9FF']].map(([e, t, c], i) => ({ id: 'st' + i, url: waSticker(e, t, c), label: t }));
const waBars = (seed) => { let x = 0; for (const ch of String(seed)) x = (x * 31 + ch.charCodeAt(0)) % 9973; return Array.from({ length: 30 }, (_, i) => { x = (x * 9301 + 49297) % 233280; return 0.25 + 0.75 * Math.abs(Math.sin(i * 0.7 + x / 233280 * 6)); }); };

function WaAudio({ m, out }) {
  const ref = React.useRef(null);
  const [play, setPlay] = React.useState(false), [pos, setPos] = React.useState(0), [dur, setDur] = React.useState(m.dur || 0), [heard, setHeard] = React.useState(false);
  const bars = React.useMemo(() => waBars(m.id), [m.id]);
  const toggle = () => { const a = ref.current; if (!a) return; if (a.paused) { a.play().catch(() => {}); } else a.pause(); };
  const pct = dur ? pos / dur : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, width: 'min(300px, 62vw)', padding: '4px 2px 14px' }}>
      <audio ref={ref} src={m.url} preload="metadata" onLoadedMetadata={(e) => { if (isFinite(e.target.duration) && e.target.duration) setDur(e.target.duration); }} onTimeUpdate={(e) => setPos(e.target.currentTime)} onPlay={() => { setPlay(true); setHeard(true); }} onPause={() => setPlay(false)} onEnded={() => { setPlay(false); setPos(0); }} />
      <span style={{ position: 'relative', width: 44, height: 44, borderRadius: '50%', background: out ? '#0b7a63' : '#2a3942', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#d1d7db' }}>
        <MIcon name="mic" size={20} />
        <span style={{ position: 'absolute', right: -2, bottom: -2, width: 18, height: 18, borderRadius: '50%', background: out ? WA.out : WA.inn, display: 'flex', alignItems: 'center', justifyContent: 'center', color: heard ? WA.blue : WA.sub }}><MIcon name="mic" size={11} /></span>
      </span>
      <button type="button" aria-label={play ? 'Pausar áudio' : 'Ouvir áudio'} onClick={toggle} style={{ border: 0, background: 'transparent', color: '#d1d7db', cursor: 'pointer', padding: 0, display: 'flex' }}><MIcon name={play ? 'pause' : 'play'} size={24} /></button>
      <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 2, height: 26, cursor: 'pointer' }} onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); const a = ref.current; if (a && dur) { a.currentTime = ((e.clientX - r.left) / r.width) * dur; } }}>
          {bars.map((h, i) => <span key={i} style={{ flex: 1, height: Math.round(h * 24), borderRadius: 2, background: i / bars.length <= pct ? (heard ? WA.blue : '#d1d7db') : 'rgba(209,215,219,.45)' }} />)}
        </span>
        <span style={{ fontSize: 11, color: out ? 'rgba(233,237,239,.6)' : WA.sub }}>{waDur(play || pos ? pos : dur)}</span>
      </span>
    </div>
  );
}

function WaMsg({ m, first, onMenu, menuOpen, flash, contactName, onQuote, onOpenImg, menuUp }) {
  const out = m.me;
  const bg = out ? WA.out : WA.inn;
  const pressRef = React.useRef(null);
  const sticker = m.kind === 'sticker' && !m.deleted;
  const media = (m.kind === 'image' || m.kind === 'video') && !m.deleted;
  const time = <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 11, color: media && !m.text ? '#fff' : out ? 'rgba(233,237,239,.6)' : WA.sub }}>{m.t}{out && !m.deleted ? <WaTicks s={m.s || 'read'} /> : null}</span>;
  const startPress = () => { clearTimeout(pressRef.current); pressRef.current = setTimeout(() => onMenu(m.id), 450); };
  const endPress = () => clearTimeout(pressRef.current);
  return (
    <div id={'wam-' + m.id} style={{ display: 'flex', justifyContent: out ? 'flex-end' : 'flex-start', padding: out ? '0 0 0 12%' : '0 12% 0 0', marginTop: first ? 10 : 2, marginBottom: m.react ? 14 : 0, transition: 'background .4s', background: flash ? 'rgba(0,168,132,.18)' : 'transparent', borderRadius: 8 }}>
      <div className="wa-bub" onContextMenu={(e) => { e.preventDefault(); onMenu(m.id); }} onPointerDown={startPress} onPointerUp={endPress} onPointerLeave={endPress} onPointerMove={endPress}
        style={{ position: 'relative', maxWidth: '100%', padding: sticker ? 0 : media ? 3 : '6px 9px 8px 9px', borderRadius: 8, borderTopRightRadius: out && first && !sticker ? 0 : 8, borderTopLeftRadius: !out && first && !sticker ? 0 : 8, background: sticker ? 'transparent' : bg, color: WA.text, fontSize: 14.2, lineHeight: '19px', boxShadow: sticker ? 'none' : '0 1px .5px rgba(11,20,26,.13)', wordBreak: 'break-word', WebkitUserSelect: 'text', userSelect: 'text' }}>
        {first && !sticker ? <span style={{ position: 'absolute', top: 0, [out ? 'right' : 'left']: -8, width: 0, height: 0, borderBottom: '13px solid transparent', [out ? 'borderLeft' : 'borderRight']: `8px solid ${bg}` }} /> : null}
        {!m.deleted ? <button type="button" className="wa-chev" aria-label="Opções da mensagem" onClick={(e) => { e.stopPropagation(); onMenu(menuOpen ? null : m.id); }} style={{ position: 'absolute', top: 1, right: 2, zIndex: 2, width: 26, height: 20, opacity: menuOpen ? 1 : undefined, border: 0, borderRadius: 6, cursor: 'pointer', color: sticker || media ? '#fff' : WA.sub, background: sticker || media ? 'rgba(0,0,0,.35)' : `linear-gradient(90deg, transparent, ${bg} 40%)`, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 3px' }}><MIcon name="chevron-down" size={17} /></button> : null}
        {m.ia ? <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12.5, fontWeight: 600, color: '#a78bfa', marginBottom: 2 }}><MIcon name="sparkles" size={12} />Renata IA</span> : null}
        {m.who ? <span style={{ display: 'block', fontSize: 12.8, fontWeight: 600, color: '#53bdeb', marginBottom: 2 }}>{m.who}</span> : null}
        {m.reply && !m.deleted ? <button type="button" onClick={() => onQuote(m.reply.id)} style={{ display: 'block', width: '100%', textAlign: 'left', border: 0, cursor: 'pointer', margin: media ? '0 0 3px' : '0 0 5px', padding: '5px 8px 6px 9px', borderRadius: 6, borderLeft: `4px solid ${m.reply.me ? '#06cf9c' : '#53bdeb'}`, background: 'rgba(0,0,0,.18)', color: WA.text, fontFamily: 'inherit' }}>
          <span style={{ display: 'block', fontSize: 12.8, fontWeight: 600, color: m.reply.me ? '#06cf9c' : '#53bdeb' }}>{m.reply.me ? 'Você' : contactName}</span>
          <span style={{ display: 'block', fontSize: 13, color: 'rgba(233,237,239,.75)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 260 }}>{m.reply.prev}</span>
        </button> : null}
        {m.deleted ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontStyle: 'italic', color: 'rgba(233,237,239,.6)' }}><MIcon name="ban" size={15} />{out ? 'Você apagou esta mensagem' : 'Esta mensagem foi apagada'}</span>
          : sticker ? <span style={{ position: 'relative', display: 'block' }}><img src={m.url} alt={m.label || 'Figurinha'} style={{ width: 150, height: 150, display: 'block' }} /><span style={{ position: 'absolute', right: 4, bottom: 4, padding: '1px 6px', borderRadius: 8, background: 'rgba(11,20,26,.6)' }}>{time}</span></span>
          : m.kind === 'image' ? <span style={{ position: 'relative', display: 'block' }}><img src={m.url} alt={m.name || 'Foto'} onClick={() => onOpenImg(m)} style={{ display: 'block', maxWidth: 'min(300px, 62vw)', maxHeight: 340, borderRadius: 6, cursor: 'zoom-in', objectFit: 'cover' }} />{m.text ? null : <span style={{ position: 'absolute', right: 6, bottom: 5, padding: '1px 6px', borderRadius: 8, background: 'rgba(11,20,26,.45)' }}>{time}</span>}</span>
          : m.kind === 'video' ? <span style={{ position: 'relative', display: 'block' }}><video src={m.url} controls style={{ display: 'block', maxWidth: 'min(300px, 62vw)', maxHeight: 340, borderRadius: 6 }} /></span>
          : m.kind === 'audio' ? <WaAudio m={m} out={out} />
          : m.kind === 'file' ? <a href={m.url} download={m.name} style={{ display: 'flex', alignItems: 'center', gap: 10, width: 'min(300px, 62vw)', padding: '8px 10px', margin: '0 0 14px', borderRadius: 6, background: 'rgba(0,0,0,.18)', color: WA.text, textDecoration: 'none' }}>
              <span style={{ width: 34, height: 40, borderRadius: 4, background: /pdf$/i.test(m.name) ? '#e5484d' : '#53bdeb', color: '#fff', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 5, boxSizing: 'border-box', flexShrink: 0 }}>{(m.name.split('.').pop() || 'ARQ').slice(0, 4).toUpperCase()}</span>
              <span style={{ flex: 1, minWidth: 0 }}><span style={{ display: 'block', fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.name}</span><span style={{ fontSize: 12, color: WA.sub }}>{(m.name.split('.').pop() || '').toUpperCase()} · {waSize(m.size || 0)}</span></span>
              <span style={{ width: 32, height: 32, borderRadius: '50%', border: `1.5px solid ${WA.sub}`, color: WA.sub, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><MIcon name="download" size={15} /></span>
            </a> : null}
        {!m.deleted && m.text && (m.kind === 'image' || m.kind === 'video') ? <span style={{ display: 'block', padding: '5px 6px 2px' }}>{m.text}<span style={{ display: 'inline-block', width: out ? 64 : 46 }} /></span> : null}
        {!m.deleted && (!m.kind || m.kind === 'text') ? <span style={{ whiteSpace: 'pre-wrap' }}>{m.text}</span> : null}
        {!sticker && !(m.kind === 'image' && !m.text) ? <><span style={{ display: 'inline-block', width: (!m.kind || m.kind === 'text' || m.deleted) ? (out ? 64 : 46) : 0 }} /><span style={{ position: 'absolute', right: 8, bottom: 4 }}>{time}</span></> : null}
        {m.react ? <span style={{ position: 'absolute', bottom: -16, [out ? 'right' : 'left']: 8, padding: '1px 5px', borderRadius: 999, background: WA.inn, border: `2px solid ${WA.bg}`, fontSize: 14, lineHeight: '18px' }}>{m.react}</span> : null}
        {menuOpen ? <WaMenu m={m} up={menuUp} out={out} onClose={() => onMenu(null)} /> : null}
      </div>
    </div>
  );
}
let __waMenuAct = null;
function WaMenu({ m, up, out, onClose }) {
  React.useEffect(() => { const k = (e) => { if (!e.target.closest || !e.target.closest('[data-wamenu]')) onClose(); }; setTimeout(() => document.addEventListener('pointerdown', k), 0); return () => document.removeEventListener('pointerdown', k); }, []);
  const item = (icon, label, act) => <button type="button" onClick={() => { __waMenuAct(act, m); onClose(); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '9px 16px', border: 0, background: 'transparent', color: WA.text, fontFamily: 'inherit', fontSize: 14.5, cursor: 'pointer', textAlign: 'left' }} onMouseEnter={(e) => { e.currentTarget.style.background = WA.field; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}><MIcon name={icon} size={17} />{label}</button>;
  return (
    <div data-wamenu="1" onPointerDown={(e) => e.stopPropagation()} style={{ position: 'absolute', zIndex: 20, [up ? 'bottom' : 'top']: up ? '100%' : 26, [out ? 'right' : 'left']: 0, width: 210, padding: '6px 0', borderRadius: 12, background: '#233138', boxShadow: '0 12px 30px rgba(0,0,0,.45)', margin: up ? '0 0 6px' : 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '4px 8px 8px', borderBottom: `1px solid ${WA.line}` }}>
        {WA_REACTS.map((r) => <button key={r} type="button" aria-label={'Reagir com ' + r} onClick={() => { __waMenuAct('react', m, r); onClose(); }} style={{ border: 0, background: m.react === r ? WA.field : 'transparent', borderRadius: '50%', width: 30, height: 30, fontSize: 19, cursor: 'pointer', padding: 0 }}>{r}</button>)}
      </div>
      {item('reply', 'Responder', 'reply')}
      {m.kind === 'text' || !m.kind ? item('copy', 'Copiar', 'copy') : null}
      {m.kind === 'image' || m.kind === 'file' || m.kind === 'audio' || m.kind === 'video' ? item('download', 'Baixar', 'download') : null}
      {item('trash-2', out ? 'Apagar para todos' : 'Apagar para mim', 'delete')}
    </div>
  );
}

function WaChat({ chatKey, seed, contactName, notice, mobile, height, style }) {
  const [all] = useStore(CHAT_STORE);
  const [typingMap] = useStore(CHAT_TYPING);
  const msgs = all[chatKey] || chatGet(chatKey, seed);
  const typing = !!typingMap[chatKey];
  const [v, setV] = React.useState('');
  const [reply, setReply] = React.useState(null);
  const [menu, setMenu] = React.useState(null);
  const [panel, setPanel] = React.useState(null);
  const [ptab, setPtab] = React.useState('emoji');
  const [attach, setAttach] = React.useState(false);
  const [preview, setPreview] = React.useState(null);
  const [viewer, setViewer] = React.useState(null);
  const [flash, setFlash] = React.useState(null);
  const [rec, setRec] = React.useState(null);
  const [note, setNote] = React.useState(null);
  const endRef = React.useRef(null), inpRef = React.useRef(null), fileRef = React.useRef(null), recRef = React.useRef(null);
  React.useEffect(() => { const go = () => endRef.current && endRef.current.scrollIntoView({ block: 'end' }); go(); const t = setTimeout(go, 80); return () => clearTimeout(t); }, [chatKey, msgs.length, typing]);
  React.useEffect(() => () => { const r = recRef.current; if (r) { try { r.mr.state !== 'inactive' && r.mr.stop(); } catch (e) {} r.stream.getTracks().forEach((t) => t.stop()); clearInterval(r.iv); } }, []);
  React.useEffect(() => { if (!note) return; const t = setTimeout(() => setNote(null), 4500); return () => clearTimeout(t); }, [note]);
  const replyOf = () => reply ? { reply: { id: reply.id, me: reply.me, prev: waPreview(reply) } } : {};
  const send = (msg) => { chatSend(chatKey, { ...msg, ...replyOf() }, contactName); setReply(null); };
  const sendText = () => { const t = v.trim(); if (!t) return; send({ kind: 'text', text: t }); setV(''); setPanel(null); };
  __waMenuAct = (act, m, r) => {
    if (act === 'reply') { setReply(m); setTimeout(() => inpRef.current && inpRef.current.focus(), 0); }
    if (act === 'copy') { try { navigator.clipboard && navigator.clipboard.writeText(m.text || ''); } catch (e) {} setNote('Mensagem copiada'); }
    if (act === 'react') chatSet(chatKey, (l) => l.map((x) => x.id === m.id ? { ...x, react: x.react === r ? null : r } : x));
    if (act === 'delete') chatSet(chatKey, (l) => l.map((x) => x.id === m.id ? { ...x, deleted: true, react: null } : x));
    if (act === 'download' && m.url) { const a = document.createElement('a'); a.href = m.url; a.download = m.name || 'arquivo'; document.body.appendChild(a); a.click(); a.remove(); }
  };
  const quote = (id) => { const el = document.getElementById('wam-' + id); if (el) { el.scrollIntoView({ block: 'center', behavior: 'smooth' }); setFlash(id); setTimeout(() => setFlash(null), 1200); } };
  const pick = (accept, capture) => { const i = fileRef.current; if (!i) return; i.accept = accept; if (capture) i.setAttribute('capture', 'environment'); else i.removeAttribute('capture'); i.value = ''; i.click(); setAttach(false); };
  const onFiles = (files) => {
    const list = Array.from(files || []); if (!list.length) return;
    const f = list[0], url = URL.createObjectURL(f);
    if (/^image\//.test(f.type) || /^video\//.test(f.type)) { setPreview({ kind: /^image\//.test(f.type) ? 'image' : 'video', url, name: f.name, size: f.size, cap: v }); setV(''); return; }
    if (/^audio\//.test(f.type)) { send({ kind: 'audio', url, name: f.name, size: f.size, dur: 0 }); return; }
    send({ kind: 'file', url, name: f.name, size: f.size });
  };
  const startRec = async () => {
    const c = typeof rnMicCheck === 'function' ? await rnMicCheck(true) : { ok: false, why: 'frame' };
    if (!c.ok) { setNote((typeof RN_MIC_MSG !== 'undefined' && RN_MIC_MSG[c.why]) || 'Não consegui acessar o microfone.'); return; }
    let mr; try { mr = new MediaRecorder(c.stream); } catch (e) { c.stream.getTracks().forEach((t) => t.stop()); setNote('Este navegador não grava áudio.'); return; }
    const chunks = []; mr.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
    const t0 = Date.now(); const r = { mr, stream: c.stream, chunks, t0, iv: setInterval(() => setRec((x) => x ? { ...x, s: (Date.now() - t0) / 1000 } : x), 250) };
    recRef.current = r; mr.start(); setRec({ s: 0 }); setPanel(null); setAttach(false);
  };
  const stopRec = (doSend) => {
    const r = recRef.current; if (!r) return; recRef.current = null; clearInterval(r.iv); setRec(null);
    r.mr.onstop = () => { r.stream.getTracks().forEach((t) => t.stop()); if (!doSend) return; const type = r.mr.mimeType || 'audio/webm'; const blob = new Blob(r.chunks, { type }); send({ kind: 'audio', url: URL.createObjectURL(blob), dur: (Date.now() - r.t0) / 1000, size: blob.size, name: 'audio.' + (/mp4|aac/.test(type) ? 'm4a' : 'webm') }); };
    try { r.mr.stop(); } catch (e) {}
  };
  const ic = (name, label, onClick, active, size = 24) => <button type="button" aria-label={label} title={label} onClick={onClick} style={{ width: 40, height: 40, borderRadius: '50%', border: 0, background: active ? WA.field : 'transparent', color: active ? WA.green : WA.sub, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, flexShrink: 0 }}><MIcon name={name} size={size} /></button>;
  const ATT = [['file-text', 'Documento', '#7f66ff', () => pick('*/*')], ['image', 'Fotos e vídeos', '#007bfc', () => pick('image/*,video/*')], ['camera', 'Câmera', '#ff2e74', () => pick('image/*', true)], ['headphones', 'Áudio', '#fa6533', () => pick('audio/*')], ['sticker', 'Figurinha', '#02a698', () => { setAttach(false); setPtab('sticker'); setPanel('emoji'); }]];
  const total = msgs.length;
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', minHeight: 0, height: height || '100%', background: WA.bg, fontFamily: 'var(--font-sans)', ...style }}>
      <input ref={fileRef} type="file" style={{ display: 'none' }} onChange={(e) => onFiles(e.target.files)} />
      <div style={{ position: 'relative', flex: 1, minHeight: 0, overflowY: 'auto', overflowX: 'hidden', scrollbarWidth: 'thin', scrollbarColor: '#374248 transparent', padding: mobile ? '10px 14px 12px' : '12px 6% 14px' }} onClick={() => { setAttach(false); }}>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: WA_DOODLE, backgroundSize: '220px 220px', opacity: 0.055, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column' }}>
          <span style={{ alignSelf: 'center', margin: '6px 0 4px', padding: '5px 12px', borderRadius: 8, background: WA.date, color: WA.sub, fontSize: 12.5, boxShadow: '0 1px .5px rgba(11,20,26,.13)' }}>HOJE</span>
          {notice ? <span style={{ alignSelf: 'center', maxWidth: 520, margin: '6px 0 6px', padding: '6px 12px', borderRadius: 8, background: WA.date, color: '#ffd279', fontSize: 12.5, lineHeight: 1.45, textAlign: 'center', display: 'flex', alignItems: 'center', gap: 6 }}><MIcon name="lock" size={12} />{notice}</span> : null}
          {msgs.map((m, i) => <WaMsg key={m.id} m={m} first={i === 0 || msgs[i - 1].me !== m.me} menuOpen={menu === m.id} menuUp={i >= total - 3 && total > 4} onMenu={setMenu} flash={flash === m.id} contactName={contactName} onQuote={quote} onOpenImg={setViewer} />)}
          {typing ? <div style={{ display: 'flex', marginTop: 10 }}><span style={{ display: 'inline-flex', gap: 4, padding: '12px 14px', borderRadius: 8, borderTopLeftRadius: 0, background: WA.inn }}>{[0, 1, 2].map((d) => <span key={d} style={{ width: 7, height: 7, borderRadius: '50%', background: WA.sub, opacity: .4, animation: `waDot 1.2s ${d * .2}s infinite` }} />)}</span></div> : null}
          <span ref={endRef} />
        </div>
      </div>
      {note ? <div style={{ position: 'absolute', left: '50%', bottom: 76, transform: 'translateX(-50%)', zIndex: 6, maxWidth: '90%', padding: '9px 14px', borderRadius: 10, background: '#e9edef', color: '#111b21', fontSize: 13.5, lineHeight: 1.4, boxShadow: '0 8px 24px rgba(0,0,0,.4)', textAlign: 'center' }}>{note}</div> : null}
      {attach ? <div style={{ position: 'absolute', left: mobile ? 8 : 56, bottom: 68, zIndex: 6, padding: '8px 0', borderRadius: 16, background: '#233138', boxShadow: '0 12px 30px rgba(0,0,0,.45)', minWidth: 210 }}>
        {ATT.map(([icon, label, c, fn]) => <button key={label} type="button" onClick={fn} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '9px 18px', border: 0, background: 'transparent', color: WA.text, fontFamily: 'inherit', fontSize: 15, cursor: 'pointer', textAlign: 'left' }} onMouseEnter={(e) => { e.currentTarget.style.background = WA.field; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}><span style={{ color: c, display: 'flex' }}><MIcon name={icon} size={20} /></span>{label}</button>)}
      </div> : null}
      {panel ? <div style={{ flexShrink: 0, height: 250, background: WA.panel, borderTop: `1px solid ${WA.line}`, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', gap: 4, padding: '6px 10px', borderBottom: `1px solid ${WA.line}` }}>
          {[['emoji', 'smile', 'Emojis'], ['sticker', 'sticker', 'Figurinhas']].map(([k, icn, l]) => <button key={k} type="button" onClick={() => setPtab(k)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: 999, border: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13.5, background: ptab === k ? WA.chip : 'transparent', color: ptab === k ? WA.green : WA.sub }}><MIcon name={icn} size={16} />{l}</button>)}
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: 10, scrollbarWidth: 'thin', scrollbarColor: '#374248 transparent' }}>
          {ptab === 'emoji' ? <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))', gap: 2 }}>{WA_EMOJIS.map((e) => <button key={e} type="button" onClick={() => { setV((x) => x + e); inpRef.current && inpRef.current.focus(); }} style={{ height: 40, border: 0, background: 'transparent', fontSize: 24, cursor: 'pointer', borderRadius: 8 }}>{e}</button>)}</div>
            : <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(92px, 1fr))', gap: 8 }}>{WA_STICKERS.map((s) => <button key={s.id} type="button" aria-label={'Enviar figurinha ' + s.label} onClick={() => { send({ kind: 'sticker', url: s.url, label: s.label }); setPanel(null); }} style={{ border: 0, background: 'transparent', cursor: 'pointer', padding: 4, borderRadius: 10 }}><img src={s.url} alt={s.label} style={{ width: '100%', display: 'block' }} /></button>)}</div>}
        </div>
      </div> : null}
      {reply ? <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px 0', background: WA.head }}>
        <div style={{ flex: 1, minWidth: 0, padding: '7px 10px', borderRadius: 8, borderLeft: `4px solid ${reply.me ? '#06cf9c' : '#53bdeb'}`, background: WA.field }}>
          <span style={{ display: 'block', fontSize: 12.8, fontWeight: 600, color: reply.me ? '#06cf9c' : '#53bdeb' }}>{reply.me ? 'Você' : contactName}</span>
          <span style={{ display: 'block', fontSize: 13, color: WA.sub, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{waPreview(reply)}</span>
        </div>
        {ic('x', 'Cancelar resposta', () => setReply(null), false, 20)}
      </div> : null}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, minHeight: 62, padding: '8px 10px', background: WA.head, flexShrink: 0 }}>
        {rec ? <>
          {ic('trash-2', 'Descartar áudio', () => stopRec(false), false, 22)}
          <span style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, height: 42, padding: '0 14px', borderRadius: 999, background: WA.field, color: WA.text, fontSize: 15 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f15c6d', animation: 'waDot 1s infinite' }} />{waDur(rec.s)}
            <span style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2, height: 22, overflow: 'hidden' }}>{Array.from({ length: 40 }, (_, i) => <span key={i} style={{ flex: 1, height: 4 + ((i * 7 + Math.floor(rec.s * 4)) % 9) * 2, borderRadius: 2, background: 'rgba(233,237,239,.55)' }} />)}</span>
          </span>
          <button type="button" aria-label="Enviar áudio" onClick={() => stopRec(true)} style={{ width: 46, height: 46, borderRadius: '50%', border: 0, cursor: 'pointer', background: WA.green, color: '#111b21', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><MIcon name="send-horizontal" size={20} /></button>
        </> : <>
          {ic(panel ? 'x' : 'smile', panel ? 'Fechar emojis' : 'Emojis e figurinhas', () => { setPanel(panel ? null : 'emoji'); setAttach(false); }, !!panel)}
          {ic('plus', 'Anexar', () => { setAttach(!attach); setPanel(null); }, attach)}
          <input ref={inpRef} value={v} onChange={(e) => setV(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') sendText(); if (e.key === 'Escape') setReply(null); }} placeholder="Digite uma mensagem" aria-label="Digite uma mensagem"
            style={{ flex: 1, minWidth: 0, height: 42, borderRadius: 8, border: 0, outline: 'none', background: WA.field, color: WA.text, padding: '0 14px', fontFamily: 'inherit', fontSize: 15 }} />
          <button type="button" aria-label={v.trim() ? 'Enviar' : 'Gravar áudio'} title={v.trim() ? 'Enviar' : 'Gravar áudio'} onClick={() => (v.trim() ? sendText() : startRec())} style={{ width: 44, height: 44, borderRadius: '50%', border: 0, cursor: 'pointer', background: v.trim() ? WA.green : 'transparent', color: v.trim() ? '#111b21' : WA.sub, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><MIcon name={v.trim() ? 'send-horizontal' : 'mic'} size={22} /></button>
        </>}
      </div>
      {preview ? <div style={{ position: 'absolute', inset: 0, zIndex: 8, background: '#0b141a', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', color: WA.text }}>{ic('x', 'Cancelar envio', () => setPreview(null), false, 22)}<span style={{ fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{preview.name}</span></div>
        <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>{preview.kind === 'image' ? <img src={preview.url} alt={preview.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: 6 }} /> : <video src={preview.url} controls style={{ maxWidth: '100%', maxHeight: '100%' }} />}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px 14px' }}>
          <input autoFocus value={preview.cap} onChange={(e) => setPreview({ ...preview, cap: e.target.value })} onKeyDown={(e) => { if (e.key === 'Enter') { send({ kind: preview.kind, url: preview.url, name: preview.name, size: preview.size, text: preview.cap.trim() }); setPreview(null); } }} placeholder="Adicione uma legenda" aria-label="Legenda" style={{ flex: 1, minWidth: 0, height: 44, borderRadius: 8, border: 0, outline: 'none', background: WA.field, color: WA.text, padding: '0 14px', fontFamily: 'inherit', fontSize: 15 }} />
          <button type="button" aria-label="Enviar" onClick={() => { send({ kind: preview.kind, url: preview.url, name: preview.name, size: preview.size, text: preview.cap.trim() }); setPreview(null); }} style={{ width: 52, height: 52, borderRadius: '50%', border: 0, cursor: 'pointer', background: WA.green, color: '#111b21', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MIcon name="send-horizontal" size={22} /></button>
        </div>
      </div> : null}
      {viewer ? <div onClick={() => setViewer(null)} style={{ position: 'absolute', inset: 0, zIndex: 9, background: 'rgba(11,20,26,.96)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, cursor: 'zoom-out' }}>
        <img src={viewer.url} alt={viewer.name || 'Foto'} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
        <span style={{ position: 'absolute', top: 10, right: 10 }}>{ic('x', 'Fechar foto', () => setViewer(null), false, 22)}</span>
      </div> : null}
    </div>
  );
}
(function waStyles() { if (document.getElementById('wa-styles')) return; const st = document.createElement('style'); st.id = 'wa-styles'; st.textContent = '@keyframes waDot { 0%,100% { opacity:.35 } 50% { opacity:1 } } .wa-chev { opacity: 0; transition: opacity .12s } .wa-bub:hover .wa-chev, .wa-chev:focus-visible { opacity: 1 } @media (hover: none) { .wa-chev { display: none } }'; document.head.appendChild(st); })();

/* contato de paciente no WhatsApp vira ficha do paciente (Conversa, Dados e histórico, Prontuário) */
const WA_SEXO = { james: 'Masculino', livia: 'Feminino', michael: 'Masculino', hanna: 'Feminino', sarah: 'Feminino', adam: 'Masculino' };
function waPaciente(c) {
  const norm = (x) => String(x).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const found = PAC.find((p) => norm(p.nome) === norm(c.n) || norm(c.n).includes(norm(p.nome)));
  if (found) return found;
  const h = (k) => String((c.id * 7919 * (k + 11)) % 10000).padStart(4, '0');
  const first = norm(c.n.replace(/^dra?\.\s*/i, '')).split(' ')[0];
  return { nome: c.n, tipo: 'Particular', empresa: '', conv: '', tel: '(19) 9' + h(1) + '-' + h(2), nasc: String(1 + (c.id * 7) % 27).padStart(2, '0') + '/' + String(1 + (c.id * 5) % 12).padStart(2, '0') + '/' + (1978 + (c.id * 3) % 20), sexo: WA_SEXO[first] || 'Não informado', cpf: h(3).slice(0, 3) + '.***.***-' + h(4).slice(0, 2) };
}
const waToFicha = (l) => l.map((x) => ({ d: x.me ? 'out' : 'in', t: x.t, text: x.text, s: x.me ? (x.s || 'read') : undefined }));

/* =====================================================================
   CRM DE LEADS (quadro kanban dentro de Conversas)
   ===================================================================== */
const { Dialog: CrmDialog, Button: CrmBtn } = window.SaluteProjetoDesigner_8b4683;
const CRM_STAGES = [
  { id: 'novo', label: 'Novo', c: '#1F5EFF' },
  { id: 'aguardando', label: 'Aguardando atendente', c: '#F5B400' },
  { id: 'agendado', label: 'Agendado', c: '#22C3F2' },
  { id: 'confirmado', label: 'Confirmado', c: '#7B4BC4' },
  { id: 'atendimento', label: 'Em atendimento', c: '#F2694A' },
  { id: 'finalizado', label: 'Finalizado', c: '#2DBF6A' },
  { id: 'perdido', label: 'Perdido', c: '#E5484D' },
];
const CRM_MOTIVOS = ['Preço', 'Sem resposta', 'Escolheu outra clínica', 'Outro'];
const crmAt = (d, hm) => { const x = addD(TODAY, d); const [h, m] = hm.split(':'); x.setHours(+h, +m, 0, 0); return x.getTime(); };
const LEADS_STORE = makeStore([
  { id: 1, nome: 'Larissa Mendes', tel: '(19) 99621-4410', proc: 'Clareamento', min: 4, ia: true, stage: 'novo' },
  { id: 2, nome: '', tel: '(19) 99734-2210', proc: 'Lente de contato dental', min: 11, ia: true, stage: 'novo' },
  { id: 3, nome: 'Gabriel Souza', tel: '(19) 98157-3302', proc: 'Implante', min: 26, ia: true, stage: 'novo' },
  { id: 4, nome: 'Patrícia Lima', tel: '(19) 99480-1176', proc: 'Botox', min: 48, ia: true, stage: 'novo' },
  { id: 5, nome: '', tel: '(19) 98812-0457', proc: 'Limpeza', min: 80, ia: true, stage: 'novo' },
  { id: 6, nome: 'Renato Carvalho', tel: '(19) 99245-6618', proc: 'Implante', min: 18, ia: false, stage: 'aguardando' },
  { id: 7, nome: 'Aline Ferreira', tel: '(19) 99377-0921', proc: 'Harmonização facial', min: 35, ia: false, stage: 'aguardando' },
  { id: 8, nome: 'Bruno Teixeira', tel: '(19) 98654-7730', proc: 'Lente de contato dental', min: 52, ia: false, stage: 'aguardando' },
  { id: 9, nome: 'Juliana Prado', tel: '(19) 99118-2047', proc: 'Clareamento', min: 125, ia: false, stage: 'aguardando' },
  { id: 10, nome: 'Fernanda Alves', tel: '(19) 99802-3365', proc: 'Botox', min: 130, ia: true, stage: 'agendado', at: crmAt(3, '09:30') },
  { id: 11, nome: 'Thiago Ramos', tel: '(19) 98733-5190', proc: 'Limpeza', min: 190, ia: true, stage: 'agendado', at: crmAt(3, '14:00') },
  { id: 12, nome: 'Mariana Costa', tel: '(19) 99561-8824', proc: 'Harmonização facial', min: 300, ia: false, stage: 'agendado', at: crmAt(4, '10:30') },
  { id: 13, nome: 'Lucas Oliveira', tel: '(19) 99090-4471', proc: 'Clareamento', min: 1500, ia: true, stage: 'agendado', at: crmAt(5, '16:00') },
  { id: 14, nome: 'Beatriz Nogueira', tel: '(19) 98276-6013', proc: 'Implante', min: 1620, ia: true, stage: 'agendado', at: crmAt(6, '11:00') },
  { id: 15, nome: 'Ana Paula Ribeiro', tel: '(19) 99415-7782', proc: 'Lente de contato dental', min: 62, ia: true, stage: 'confirmado', at: crmAt(1, '09:00') },
  { id: 16, nome: 'Rodrigo Martins', tel: '(19) 99863-2209', proc: 'Botox', min: 175, ia: true, stage: 'confirmado', at: crmAt(3, '11:30') },
  { id: 17, nome: 'Vanessa Duarte', tel: '(19) 98190-6648', proc: 'Limpeza', min: 360, ia: false, stage: 'confirmado', at: crmAt(3, '15:30') },
  { id: 18, nome: 'Felipe Andrade', tel: '(19) 99527-3154', proc: 'Clareamento', min: 1480, ia: true, stage: 'confirmado', at: crmAt(4, '08:30') },
  { id: 19, nome: 'Carolina Pires', tel: '(19) 99702-8835', proc: 'Harmonização facial', min: 2, ia: false, stage: 'atendimento' },
  { id: 20, nome: 'Eduardo Lopes', tel: '(19) 98345-1902', proc: 'Implante', min: 15, ia: false, stage: 'atendimento' },
  { id: 21, nome: 'Isabela Freitas', tel: '(19) 99638-4417', proc: 'Botox', min: 40, ia: false, stage: 'atendimento' },
  { id: 22, nome: 'Rafaela Gomes', tel: '(19) 99271-5536', proc: 'Clareamento', min: 1410, ia: true, stage: 'finalizado' },
  { id: 23, nome: 'Marcelo Batista', tel: '(19) 98966-2081', proc: 'Limpeza', min: 2900, ia: true, stage: 'finalizado' },
  { id: 24, nome: 'Letícia Moraes', tel: '(19) 99154-7709', proc: 'Botox', min: 4400, ia: false, stage: 'finalizado' },
  { id: 25, nome: 'Gustavo Rezende', tel: '(19) 99843-0326', proc: 'Lente de contato dental', min: 7300, ia: true, stage: 'finalizado' },
  { id: 26, nome: 'Priscila Santana', tel: '(19) 99376-9158', proc: 'Implante', min: 5800, ia: true, stage: 'perdido', motivo: 'Preço' },
  { id: 27, nome: '', tel: '(19) 99105-7782', proc: 'Clareamento', min: 8700, ia: true, stage: 'perdido', motivo: 'Sem resposta' },
  { id: 28, nome: 'Diego Barros', tel: '(19) 98420-3361', proc: 'Harmonização facial', min: 13000, ia: false, stage: 'perdido', motivo: 'Escolheu outra clínica' },
]);
const crmName = (l) => l.nome || l.tel;
const crmAgo = (m) => m < 1 ? 'agora' : m < 60 ? 'há ' + m + ' min' : m < 1440 ? 'há ' + Math.floor(m / 60) + ' h' : m < 2880 ? 'ontem' : 'há ' + Math.floor(m / 1440) + ' dias';
const CRM_WD = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const crmWhen = (t) => { const d = new Date(t); return CRM_WD[d.getDay()] + ', ' + String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + ' · ' + String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); };
const CRM_SEXO = { larissa: 'Feminino', gabriel: 'Masculino', patricia: 'Feminino', renato: 'Masculino', aline: 'Feminino', bruno: 'Masculino', juliana: 'Feminino', fernanda: 'Feminino', thiago: 'Masculino', mariana: 'Feminino', lucas: 'Masculino', beatriz: 'Feminino', ana: 'Feminino', rodrigo: 'Masculino', vanessa: 'Feminino', felipe: 'Masculino', carolina: 'Feminino', eduardo: 'Masculino', isabela: 'Feminino', rafaela: 'Feminino', marcelo: 'Masculino', leticia: 'Feminino', gustavo: 'Masculino', priscila: 'Feminino', diego: 'Masculino' };
function crmPaciente(l) {
  const first = String(l.nome || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').split(' ')[0];
  return { nome: crmName(l), tipo: 'Particular', empresa: '', conv: '', tel: l.tel, nasc: 'Não informado', sexo: CRM_SEXO[first] || 'Não informado', cpf: 'Não informado' };
}
function crmConversa(l) {
  const first = l.nome ? l.nome.split(' ')[0] : '';
  const oi = first ? 'Olá, ' + first + '!' : 'Olá!';
  const proc = l.proc.toLowerCase();
  const base = [
    { d: 'in', t: '09:02', text: `Oi! Queria saber o valor ${/^[aeiou]/.test(proc) ? 'do ' : 'de '}${proc}.` },
    { d: 'out', ia: true, t: '09:02', text: `${oi} Aqui é a Renata, da Clínica Bella Forma. Para ${proc} fazemos uma avaliação antes, para indicar o melhor tratamento para você. Quer que eu veja um horário?`, s: 'read' },
  ];
  const fim = {
    novo: [],
    aguardando: [{ d: 'in', t: '09:05', text: 'Prefiro falar com alguém da equipe, pode ser?' }, { d: 'out', ia: true, t: '09:05', text: 'Claro! Já chamei a equipe e em instantes alguém te responde por aqui.', s: 'read' }],
    agendado: [{ d: 'in', t: '09:06', text: 'Quero sim!' }, { d: 'out', ia: true, t: '09:07', text: `Agendado! ${l.at ? crmWhen(l.at).replace(' · ', ' às ') : 'Te envio o horário em seguida'} com a Dra. Camila. Um dia antes eu te mando a confirmação.`, s: 'read' }],
    confirmado: [{ d: 'out', ia: true, t: '09:10', text: `${oi} Passando para confirmar sua avaliação${l.at ? ' ' + crmWhen(l.at).replace(' · ', ' às ') : ''}. Posso confirmar?`, s: 'read' }, { d: 'in', t: '09:12', text: 'Confirmado, estarei aí!' }],
    atendimento: [{ d: 'in', t: '09:20', text: 'Cheguei na recepção.' }, { d: 'out', t: '09:21', text: 'Perfeito! Já vamos te chamar.', s: 'read' }],
    finalizado: [{ d: 'out', t: '18:10', text: `Obrigada pela visita${first ? ', ' + first : ''}! Qualquer dúvida sobre os cuidados, é só chamar por aqui.`, s: 'read' }, { d: 'in', t: '18:15', text: 'Amei o resultado, obrigada!' }],
    perdido: [{ d: 'in', t: '09:30', text: l.motivo === 'Preço' ? 'Achei um pouco acima do que eu esperava, vou pensar.' : l.motivo === 'Escolheu outra clínica' ? 'Obrigado, mas acabei fechando com outra clínica.' : 'Vou ver e te retorno.' }],
  }[l.stage] || [];
  return [...base, ...fim];
}

function CrmCard({ l, st, dragging, onDown, onKey, onToggle }) {
  const showWhen = st.id === 'agendado' || st.id === 'confirmado';
  const c = l.ia ? '#a78bfa' : WA.blue;
  return (
    <div role="button" tabIndex={0} aria-label={`${crmName(l)}, ${l.proc}. Abrir conversa`} onPointerDown={onDown} onKeyDown={onKey}
      style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 6, padding: '11px 12px 10px', borderRadius: 12, background: WA.head, border: `1px solid ${WA.line}`, boxShadow: '0 1px .5px rgba(11,20,26,.13)', cursor: 'grab', userSelect: 'none', WebkitUserSelect: 'none', touchAction: 'pan-x pan-y', opacity: dragging ? .35 : 1, outline: 'none', textAlign: 'left' }}>
      <span style={{ fontSize: 14.5, fontWeight: 600, color: WA.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{crmName(l)}</span>
      <span style={{ display: 'flex', alignItems: 'baseline', gap: 6, minWidth: 0 }}><span style={{ flex: 1, minWidth: 0, fontSize: 13, color: WA.sub, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.proc}</span><span style={{ fontSize: 11.5, color: WA.sub, whiteSpace: 'nowrap', flexShrink: 0 }}>{crmAgo(l.min).replace('há ', '')}</span></span>
      {showWhen ? <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12.5, color: l.at ? WA.text : WA.sub }}><MIcon name="calendar-days" size={13} />{l.at ? crmWhen(l.at) : 'Horário a definir'}</span> : null}
      {st.id === 'perdido' && l.motivo ? <span style={{ fontSize: 12.5, color: st.c }}>Motivo: {l.motivo}</span> : null}
      <span style={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
        <button type="button" onPointerDown={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()} onClick={(e) => { e.stopPropagation(); onToggle && onToggle(); }}
          title={l.ia ? 'Pausar IA neste lead' : 'Retomar IA neste lead'} aria-label={l.ia ? 'Atendimento com a IA. Pausar IA' : 'Atendimento com humano. Retomar IA'} aria-pressed={!l.ia}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 24, padding: '0 3px 0 8px', borderRadius: 999, border: 0, background: l.ia ? 'rgba(167,139,250,.14)' : 'rgba(83,189,235,.14)', color: c, fontFamily: 'inherit', fontSize: 11.5, fontWeight: 600, cursor: 'pointer', flexShrink: 0, whiteSpace: 'nowrap' }}>
          <MIcon name={l.ia ? 'sparkles' : 'user-round'} size={12} />{l.ia ? 'IA' : 'Humano'}
          <span style={{ width: 18, height: 18, borderRadius: '50%', background: c, color: '#111b21', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginLeft: 2 }}><MIcon name={l.ia ? 'pause' : 'play'} size={10} strokeWidth={2.6} /></span>
        </button>
      </span>
    </div>
  );
}

const { Toast: CrmToast } = window.SaluteProjetoDesigner_8b4683;
function CrmBoard({ mobile, onOpen }) {
  const [leads, setLeads] = useStore(LEADS_STORE);
  const [drag, setDrag] = React.useState(null);
  const [lost, setLost] = React.useState(null);
  const [motivo, setMotivo] = React.useState(null);
  const [toast, setToast] = React.useState(null);
  const D = React.useRef(null), boardRef = React.useRef(null);
  React.useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 3200); return () => clearTimeout(t); }, [toast]);
  const toggleIA = (l) => {
    const ia = !l.ia;
    setLeads((all) => all.map((x) => x.id === l.id ? { ...x, ia } : x));
    setToast(ia ? { tone: 'success', title: 'IA retomada', description: `A Renata volta a responder ${crmName(l)}.` } : { tone: 'info', title: 'IA pausada', description: `A equipe assume a conversa com ${crmName(l)}.` });
  };
  const move = (id, to) => {
    if (to === 'perdido') { setMotivo(null); setLost(id); return; }
    setLeads((l) => l.map((x) => x.id === id ? { ...x, stage: to, motivo: undefined } : x));
  };
  const overAt = (x, y) => { const el = document.elementFromPoint(x, y); const c = el && el.closest && el.closest('[data-crm-stage]'); return c ? c.getAttribute('data-crm-stage') : null; };
  const cleanup = () => {
    const d = D.current; if (!d) return; clearTimeout(d.t);
    window.removeEventListener('pointermove', d.mv); window.removeEventListener('pointerup', d.up); window.removeEventListener('pointercancel', d.cancel); document.removeEventListener('touchmove', d.tm);
    D.current = null;
  };
  const onDown = (e, l) => {
    if (e.button !== undefined && e.button !== 0) return;
    cleanup();
    const r = e.currentTarget.getBoundingClientRect();
    const d = { id: l.id, from: l.stage, sx: e.clientX, sy: e.clientY, ox: e.clientX - r.left, oy: e.clientY - r.top, w: r.width, active: false, moved: false, touch: e.pointerType === 'touch', over: l.stage };
    const start = (x, y) => { d.active = true; setDrag({ id: l.id, x: x - d.ox, y: y - d.oy, w: d.w, over: d.over }); };
    d.mv = (ev) => {
      const dist = Math.hypot(ev.clientX - d.sx, ev.clientY - d.sy);
      if (!d.active) {
        if (d.touch) { if (dist > 8) { d.moved = true; cleanup(); } return; }
        if (dist < 6) return; start(ev.clientX, ev.clientY);
      }
      d.over = overAt(ev.clientX, ev.clientY);
      setDrag({ id: l.id, x: ev.clientX - d.ox, y: ev.clientY - d.oy, w: d.w, over: d.over });
      const b = boardRef.current;
      if (b) { const br = b.getBoundingClientRect(); if (ev.clientX > br.right - 48) b.scrollLeft += 14; else if (ev.clientX < br.left + 48) b.scrollLeft -= 14; }
    };
    d.up = () => {
      const wasActive = d.active, moved = d.moved, over = d.over; cleanup(); setDrag(null);
      if (!wasActive) { if (!moved) onOpen(l); return; }
      if (over && over !== d.from) move(l.id, over);
    };
    d.cancel = () => { cleanup(); setDrag(null); };
    d.tm = (ev) => { if (d.active) ev.preventDefault(); };
    if (d.touch) d.t = setTimeout(() => { if (D.current === d && !d.moved) { start(d.sx, d.sy); try { navigator.vibrate && navigator.vibrate(12); } catch (x) {} } }, 320);
    D.current = d;
    window.addEventListener('pointermove', d.mv); window.addEventListener('pointerup', d.up); window.addEventListener('pointercancel', d.cancel); document.addEventListener('touchmove', d.tm, { passive: false });
  };
  React.useEffect(() => () => cleanup(), []);
  const dragged = drag ? leads.find((x) => x.id === drag.id) : null;
  const lostLead = lost ? leads.find((x) => x.id === lost) : null;
  return (
    <>
      <div ref={boardRef} style={{ flex: 1, minHeight: 0, display: 'flex', gap: mobile ? 10 : 8, padding: mobile ? '4px 12px 12px' : '4px 14px 14px', overflowX: 'auto', overflowY: 'hidden', scrollSnapType: mobile && !drag ? 'x mandatory' : 'none', scrollbarWidth: 'thin', scrollbarColor: '#374248 transparent' }}>
        {CRM_STAGES.map((st) => {
          const items = leads.filter((x) => x.stage === st.id);
          const over = drag && drag.over === st.id && dragged && dragged.stage !== st.id;
          return (
            <section key={st.id} data-crm-stage={st.id} aria-label={st.label} style={{ flex: mobile ? '0 0 82%' : '1 1 0', minWidth: mobile ? 0 : 160, maxWidth: mobile ? 300 : 'none', display: 'flex', flexDirection: 'column', minHeight: 0, borderRadius: 14, background: WA.panel, border: over ? `2px dashed ${st.c}` : `2px solid ${WA.panel}`, scrollSnapAlign: 'start', transition: 'border-color .15s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, minHeight: 50, boxSizing: 'border-box', padding: '8px 12px', borderBottom: `1px solid ${WA.line}` }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: st.c, flexShrink: 0 }} />
                <span style={{ flex: 1, minWidth: 0, fontSize: 14, fontWeight: 600, lineHeight: 1.2, color: WA.text }}>{st.label}</span>
                <span style={{ minWidth: 22, height: 22, padding: '0 7px', boxSizing: 'border-box', borderRadius: 999, background: st.c + '26', color: st.c, fontSize: 12, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{items.length}</span>
              </div>
              <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: 8, display: 'flex', flexDirection: 'column', gap: 8, scrollbarWidth: 'thin', scrollbarColor: '#374248 transparent' }}>
                {items.map((l) => <CrmCard key={l.id} l={l} st={st} dragging={drag && drag.id === l.id} onToggle={() => toggleIA(l)} onDown={(e) => onDown(e, l)} onKey={(e) => { if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); onOpen(l); } }} />)}
                {!items.length ? <span style={{ margin: '18px 4px', textAlign: 'center', fontSize: 12.5, color: WA.sub, opacity: .8 }}>Nenhum lead nesta etapa</span> : null}
              </div>
            </section>
          );
        })}
      </div>
      {drag && dragged ? ReactDOM.createPortal(<div style={{ position: 'fixed', left: drag.x, top: drag.y, width: drag.w, zIndex: 400, pointerEvents: 'none', transform: 'rotate(2deg)', filter: 'drop-shadow(0 18px 30px rgba(0,0,0,.45))', fontFamily: 'var(--font-sans)' }}><CrmCard l={dragged} st={CRM_STAGES.find((s) => s.id === dragged.stage)} /></div>, document.body) : null}
      {toast ? ReactDOM.createPortal(<div style={{ position: 'fixed', zIndex: 260, right: mobile ? 12 : 24, left: mobile ? 12 : 'auto', bottom: mobile ? 'calc(96px + env(safe-area-inset-bottom))' : 24, fontFamily: 'var(--font-sans)' }}><CrmToast {...toast} onClose={() => setToast(null)} style={{ width: mobile ? '100%' : 360 }} /></div>, document.body) : null}
      <GPortal><CrmDialog open={!!lostLead} onClose={() => setLost(null)} icon="circle-x" title="Mover para Perdido" description={lostLead ? `Qual foi o motivo da perda de ${crmName(lostLead)}?` : ''}
        footer={<><CrmBtn variant="secondary" onClick={() => setLost(null)}>Cancelar</CrmBtn><CrmBtn iconLeft="check" disabled={!motivo} onClick={() => { setLeads((l) => l.map((x) => x.id === lost ? { ...x, stage: 'perdido', motivo } : x)); setLost(null); }}>Confirmar</CrmBtn></>}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{CRM_MOTIVOS.map((m) => <FilterChip key={m} active={motivo === m} onClick={() => setMotivo(m)}>{m}</FilterChip>)}</div>
      </CrmDialog></GPortal>
    </>
  );
}

function MensagensWA({ mobile }) {
  const [tab, setTabRaw] = React.useState('p');
  const [ficha, setFicha] = React.useState(null);
  const [crm, setCrm] = React.useState(false);
  const [q, setQ] = React.useState('');
  const [sel, setSel] = React.useState(mobile ? null : 3);
  const [read, setRead] = React.useState({});
  const [all] = useStore(CHAT_STORE);
  const [typingMap] = useStore(CHAT_TYPING);
  const setTab = (k) => { setTabRaw(k); setSel(mobile ? null : k === 'p' ? 3 : 101); };
  const BASE = [
    { me: true, t: '10:40', text: 'Olá, Dr. Michael Thompson!' },
    { me: false, t: '10:39', text: 'Olá, Corey Philips. Como posso ajudar hoje?' },
    { me: true, t: '10:40', text: 'Não estou me sentindo bem há alguns dias. Dores musculares, garganta irritada e um pouco de tosse.' },
    { me: false, t: '10:39', text: 'Entendo. Está sentindo mais alguma coisa?' },
  ];
  const isTeam = tab === 'd';
  const ALL = isTeam ? EQUIPE : INBOX;
  const keyOf = (c) => 'c' + c.id;
  const seedOf = (c) => () => (c.msgs || BASE).map((x) => ({ ...x }));
  const msgsOf = (c) => all[keyOf(c)] || chatGet(keyOf(c), seedOf(c));
  const typingOf = (c) => !!typingMap[keyOf(c)];
  const unreadOf = (c) => read[c.id] ? 0 : c.u;
  const term = q.trim().toLowerCase();
  const LIST = ALL.filter((c) => !term || c.n.toLowerCase().includes(term));
  const cur = ALL.find((c) => c.id === sel);
  React.useEffect(() => { if (sel) setRead((r) => ({ ...r, [sel]: true })); }, [sel]);
  const lastOf = (c) => { const l = msgsOf(c); return l[l.length - 1]; };
  const chip = (on, label, onClick) => <button key={label} type="button" onClick={onClick} style={{ height: 32, padding: '0 12px', borderRadius: 999, border: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, background: on ? WA.chip : WA.head, color: on ? WA.green : WA.sub, whiteSpace: 'nowrap' }}>{label}</button>;

  const list = (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, height: '100%', background: WA.panel, borderRight: mobile ? 0 : `1px solid ${WA.line}` }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 12px 8px 20px' }}>
        <span style={{ fontSize: 22, fontWeight: 700, color: WA.text }}>Conversas</span>
        <span style={{ display: 'flex', alignItems: 'center' }}><span style={{ marginRight: 4 }}>{chip(false, 'CRM', () => setCrm(true))}</span>{waIcon('message-square-plus', 'Nova conversa')}{waIcon('ellipsis-vertical', 'Mais opções')}</span>
      </div>
      <div style={{ padding: '0 12px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 38, borderRadius: 999, background: WA.head, padding: '0 14px', color: WA.sub }}>
          <MIcon name="search" size={17} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Pesquisar ou começar uma nova conversa" aria-label="Pesquisar conversa" style={{ flex: 1, minWidth: 0, border: 0, outline: 'none', background: 'transparent', color: WA.text, fontFamily: 'inherit', fontSize: 14.5 }} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8, padding: '2px 12px 10px', overflowX: 'auto', scrollbarWidth: 'none' }}>
        {chip(!isTeam, 'Pacientes', () => setTab('p'))}
        {chip(isTeam, 'Equipe', () => setTab('d'))}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: '#374248 transparent' }}>
        {LIST.map((c) => {
          const on = c.id === sel, last = lastOf(c), u = unreadOf(c);
          return (
            <button key={c.id} type="button" onClick={() => setSel(c.id)} onMouseEnter={(e) => { if (!on) e.currentTarget.style.background = WA.hover; }} onMouseLeave={(e) => { if (!on) e.currentTarget.style.background = 'transparent'; }}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: '0 14px 0 14px', height: 72, border: 0, cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', background: on ? WA.sel : 'transparent' }}>
              <MAv name={c.n} size={49} />
              <span style={{ flex: 1, minWidth: 0, alignSelf: 'stretch', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderBottom: `1px solid ${WA.line}` }}>
                <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}><span style={{ fontSize: 16.5, color: WA.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.n}</span><span style={{ fontSize: 12, color: u ? WA.green : WA.sub, flexShrink: 0 }}>{last && CHAT_TOUCHED[keyOf(c)] ? last.t : c.t}</span></span>
                <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginTop: 3 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 4, minWidth: 0, fontSize: 14, color: WA.sub }}>{last && CHAT_TOUCHED[keyOf(c)] && last.me && !typingOf(c) && !last.deleted ? <WaTicks s={last.s || 'read'} /> : null}<span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{typingOf(c) ? <span style={{ color: WA.green }}>digitando...</span> : last && CHAT_TOUCHED[keyOf(c)] ? waPreview(last) : c.m}</span></span>
                  {u ? <span style={{ minWidth: 20, height: 20, padding: '0 6px', boxSizing: 'border-box', borderRadius: 999, background: WA.green, color: '#111b21', fontSize: 12, fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{u}</span> : null}
                </span>
              </span>
            </button>
          );
        })}
        {!LIST.length ? <p style={{ textAlign: 'center', color: WA.sub, fontSize: 14, padding: 30 }}>Nenhuma conversa encontrada.</p> : null}
      </div>
    </div>
  );

  const thread = cur ? (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, height: '100%', background: WA.bg }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, height: 60, padding: '0 10px 0 ' + (mobile ? '4px' : '16px'), background: WA.head, flexShrink: 0 }}>
        {mobile ? waIcon('arrow-left', 'Voltar', () => setSel(null)) : null}
        <button type="button" disabled={isTeam} onClick={() => setFicha({ p: waPaciente(cur), key: keyOf(cur), name: cur.n })} title={isTeam ? undefined : 'Abrir ficha do paciente'} aria-label={isTeam ? cur.n : 'Abrir ficha de ' + cur.n}
          style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 12, height: '100%', border: 0, padding: 0, background: 'transparent', cursor: isTeam ? 'default' : 'pointer', textAlign: 'left', fontFamily: 'inherit' }}>
          <MAv name={cur.n} size={40} />
          <span style={{ flex: 1, minWidth: 0, display: 'block' }}>
            <span style={{ display: 'block', fontSize: 16, color: WA.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{cur.n}</span>
            <span style={{ display: 'block', fontSize: 13, color: typingOf(cur) ? WA.green : WA.sub, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{typingOf(cur) ? 'digitando...' : cur.r ? cur.r : mobile ? 'online · ver ficha' : 'online · clique para ver a ficha'}</span>
          </span>
        </button>
        {mobile ? null : waIcon('search', 'Pesquisar na conversa', null, 20)}
        {waIcon('video', 'Chamada de vídeo', null, 21)}{waIcon('phone', 'Ligar', null, 20)}{waIcon('ellipsis-vertical', 'Mais opções', null, 20)}
      </div>
      <WaChat key={keyOf(cur)} chatKey={keyOf(cur)} seed={seedOf(cur)} contactName={cur.n} mobile={mobile} height="auto" style={{ flex: 1 }} notice={isTeam ? 'Conversa interna da equipe. Só quem tem acesso ao sistema vê.' : 'Mensagens do WhatsApp da clínica, atendidas pela Renata IA e pela equipe.'} />
    </div>
  ) : (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14, background: WA.head, color: WA.sub, textAlign: 'center', padding: 30, borderBottom: `6px solid ${WA.green}` }}>
      <span style={{ width: 84, height: 84, borderRadius: '50%', background: WA.field, display: 'flex', alignItems: 'center', justifyContent: 'center', color: WA.sub }}><MIcon name="messages-square" size={38} /></span>
      <p style={{ margin: 0, fontSize: 28, fontWeight: 300, color: WA.text }}>Mensagens Salute</p>
      <p style={{ margin: 0, fontSize: 14, maxWidth: 420, lineHeight: 1.5 }}>Escolha uma conversa para responder. Pacientes chegam pelo WhatsApp da clínica, e a equipe conversa aqui dentro.</p>
    </div>
  );
  const frame = { borderRadius: mobile ? 18 : 22, overflow: 'hidden', boxShadow: '0 24px 50px -30px rgba(11,20,26,.75)', border: `1px solid ${WA.line}`, fontFamily: 'var(--font-sans)' };
  const fichaEl = ficha ? <PacienteFicha key={ficha.p.nome} p={ficha.p} chatKey={ficha.key} contactName={ficha.name} conversa={ficha.conv} mobile={mobile} initialTab={ficha.tab || 'dados'} onClose={() => setFicha(null)} onUpdate={(np) => setFicha((f) => ({ ...f, p: np }))} /> : null;
  if (crm) {
    const total = LEADS_STORE.v.length;
    return <><div style={{ ...frame, height: mobile ? 'calc(100vh - 190px)' : 'calc(100vh - 170px)', minHeight: mobile ? 520 : 620, display: 'flex', flexDirection: 'column', background: WA.bg }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: mobile ? '12px 12px 10px 6px' : '14px 14px 10px 10px', flexShrink: 0 }}>
        <button type="button" onClick={() => setCrm(false)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 36, padding: '0 12px 0 8px', borderRadius: 999, border: 0, background: 'transparent', color: WA.text, fontFamily: 'inherit', fontSize: 14.5, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}><MIcon name="arrow-left" size={19} />Voltar para lista</button>
        <span style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>{mobile ? null : <span style={{ fontSize: 13.5, color: WA.sub, whiteSpace: 'nowrap' }}>{total} leads</span>}{chip(true, 'CRM', () => setCrm(false))}</span>
      </div>
      <CrmBoard mobile={mobile} onOpen={(l) => setFicha({ p: crmPaciente(l), key: 'lead:' + l.id, name: crmName(l), conv: crmConversa(l), tab: 'conversa' })} />
    </div>{fichaEl}</>;
  }
  if (mobile) return <><div style={{ ...frame, height: 'calc(100vh - 190px)', minHeight: 520 }}>{cur ? thread : list}</div>{fichaEl}</>;
  return <><div style={{ ...frame, display: 'grid', gridTemplateColumns: 'minmax(320px,420px) minmax(0,1fr)', height: 'calc(100vh - 170px)', minHeight: 620 }}>{list}{thread}</div>{fichaEl}</>;
}

function MensagensScreen(props) {
  return MENSAGENS_VERSAO === 'v01' ? <MensagensV01 {...props} /> : <MensagensWA {...props} />;
}

Object.assign(window, { MensagensScreen });
