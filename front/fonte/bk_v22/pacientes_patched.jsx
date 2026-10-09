const { Avatar: OAv, Icon: OIcon, SegmentedControl: OSeg, Button: OBtn, Input: OInput, Select: OSelect, Dialog: ODialog, Checkbox: OCheck } = window.SaluteProjetoDesigner_8b4683;

const TIPOS = {
  Particular: { c: '#1F5EFF', bg: 'rgba(31,94,255,.07)', bd: 'rgba(31,94,255,.28)' },
  'Convênio': { c: '#0B9BC9', bg: 'rgba(34,195,242,.09)', bd: 'rgba(34,195,242,.35)' },
  Empresarial: { c: '#7B4BC4', bg: 'rgba(123,75,196,.08)', bd: 'rgba(123,75,196,.28)' },
};

const PAC = [
  { nome: 'Mariana Alves Costa', tipo: 'Particular', empresa: '', conv: '', tel: '(19) 99812-4471', nasc: '14/03/1991', sexo: 'Feminino', cpf: '412.***.***-38' },
  { nome: 'Rafael Moreira Lima', tipo: 'Empresarial', empresa: 'Usina Santa Lúcia', conv: 'SulAmérica', tel: '(19) 99705-2289', nasc: '02/09/1986', sexo: 'Masculino', cpf: '309.***.***-14' },
  { nome: 'Juliana Ferreira Souza', tipo: 'Convênio', empresa: '', conv: 'Unimed', tel: '(19) 98144-6630', nasc: '27/11/1994', sexo: 'Feminino', cpf: '527.***.***-02' },
  { nome: 'Carlos Eduardo Pinto', tipo: 'Particular', empresa: '', conv: '', tel: '(19) 99631-0157', nasc: '08/06/1979', sexo: 'Masculino', cpf: '188.***.***-91' },
  { nome: 'Beatriz Ramos Oliveira', tipo: 'Empresarial', empresa: 'Cerâmica Itapira', conv: 'Bradesco Saúde', tel: '(19) 99288-7314', nasc: '19/01/1998', sexo: 'Feminino', cpf: '641.***.***-55' },
  { nome: 'Thiago Martins Rocha', tipo: 'Convênio', empresa: '', conv: 'Bradesco Saúde', tel: '(19) 98877-5402', nasc: '30/04/1989', sexo: 'Masculino', cpf: '274.***.***-63' },
  { nome: 'Fernanda Lopes Barbosa', tipo: 'Particular', empresa: '', conv: '', tel: '(19) 99456-1928', nasc: '11/12/1983', sexo: 'Feminino', cpf: '835.***.***-20' },
  { nome: 'Lucas Henrique Teixeira', tipo: 'Empresarial', empresa: 'Usina Santa Lúcia', conv: 'SulAmérica', tel: '(19) 99173-3846', nasc: '23/07/1996', sexo: 'Masculino', cpf: '156.***.***-87' },
  { nome: 'Camila Duarte Nunes', tipo: 'Convênio', empresa: '', conv: 'Unimed', tel: '(19) 98520-9067', nasc: '05/02/1990', sexo: 'Feminino', cpf: '703.***.***-46' },
  { nome: 'Gustavo Prado Ribeiro', tipo: 'Particular', empresa: '', conv: '', tel: '(19) 99364-2751', nasc: '17/10/1975', sexo: 'Masculino', cpf: '960.***.***-12' },
];

const GPortal = ({ children }) => ReactDOM.createPortal(<div style={{ fontFamily: 'var(--font-sans)' }}>{children}</div>, document.body);

function TipoBadge({ t }) {
  const v = TIPOS[t];
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 26, padding: '0 10px', borderRadius: 999, background: v.bg, border: `1px solid ${v.bd}`, color: v.c, fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap' }}>
    <span style={{ width: 6, height: 6, borderRadius: '50%', background: v.c }} />{t}</span>;
}

function FilterChip({ active, children, onClick }) {
  return <button type="button" onClick={onClick} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap',
    border: active ? '1.5px solid rgba(31,94,255,.35)' : '1.5px solid rgba(214,226,242,.9)', background: active ? 'rgba(31,94,255,.1)' : 'rgba(255,255,255,.7)', color: active ? '#1F5EFF' : 'var(--text-strong)' }}>{children}</button>;
}

function ActiveTag({ label, onRemove }) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 28, padding: '0 6px 0 12px', borderRadius: 999, background: 'rgba(31,94,255,.08)', border: '1px solid rgba(31,94,255,.25)', color: '#1F5EFF', fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap' }}>
    {label}<button type="button" aria-label={'Remover ' + label} onClick={onRemove} style={{ width: 20, height: 20, borderRadius: '50%', border: 0, background: 'transparent', color: 'inherit', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}><OIcon name="x" size={13} /></button></span>;
}

const onlyDigits = (s) => String(s).replace(/\D/g, '');
const ALL = 'Todos';
const FILTER_DEFS = [
  { key: 'tipo', label: 'Tipo', opts: ['Particular', 'Convênio', 'Empresarial'] },
  { key: 'conv', label: 'Convênio', opts: [...Array.from(new Set(PAC.map((p) => p.conv).filter(Boolean))), 'Sem convênio'] },
  { key: 'empresa', label: 'Empresa', opts: Array.from(new Set(PAC.map((p) => p.empresa).filter(Boolean))) },
  { key: 'sexo', label: 'Sexo', opts: ['Feminino', 'Masculino'] },
];
const EMPTY = { tipo: ALL, conv: ALL, empresa: ALL, sexo: ALL };
const match = (p, k, v) => v === ALL || (k === 'conv' && v === 'Sem convênio' ? !p.conv : p[k] === v);

const { MessageBubble: FMsg } = window.SaluteProjetoDesigner_8b4683;

const PROCS = ['Toxina botulínica', 'Preenchimento labial', 'Bioestimulador', 'Fios de PDO', 'Limpeza de pele', 'Peeling químico', 'Clareamento dental', 'Avaliação'];
const MODELOS = ['Anamnese facial', 'Toxina botulínica', 'Harmonização orofacial', 'Odontológica geral'];
const BANCO = [{ id: 'face', label: 'Rosto frontal' }, { id: 'sorriso', label: 'Sorriso' }];
const PRODUTOS = { Toxina: { c: '#1F5EFF', u: 'U', step: 2 }, Preenchedor: { c: '#7B4BC4', u: 'ml', step: 0.5 } };
const KINDS = {
  anamnese: { label: 'Anamnese', icon: 'clipboard-list', c: '#1F5EFF' },
  mapa: { label: 'Mapeamento', icon: 'scan-face', c: '#7B4BC4' },
  proc: { label: 'Procedimento', icon: 'syringe', c: '#22C3F2' },
  doc: { label: 'Documentos', icon: 'images', c: '#2DBF6A' },
};
const HOJE = '02/10/2026';
const fCircle = { width: 40, height: 40, borderRadius: '50%', border: '1.5px solid rgba(214,226,242,.95)', background: 'rgba(255,255,255,.7)', color: 'var(--text-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 };
const soft = { borderRadius: 18, background: 'rgba(255,255,255,.6)', border: '1.5px solid rgba(255,255,255,.95)' };
const lbl = { fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.04em' };
const linkBtn = { border: 0, background: 'none', color: '#1F5EFF', fontFamily: 'inherit', fontSize: 13, fontWeight: 500, cursor: 'pointer', padding: '4px 2px', display: 'inline-flex', alignItems: 'center', gap: 4 };
const fmtU = (n, u) => (u === 'ml' ? String(n).replace('.', ',') : n) + u;
const slug = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '');

function artContent(kind, smooth) {
  if (kind === 'sorriso') return (
    <g>
      <path d="M30 95 Q150 175 270 95 Q150 125 30 95Z" fill="#F3D6D2" stroke="#C99B95" strokeWidth="2" />
      <path d="M40 98 Q150 160 260 98 Q150 118 40 98Z" fill="#fff" stroke="#D9DEE8" strokeWidth="1.5" />
      {[-4, -3, -2, -1, 0, 1, 2, 3].map((i) => <line key={i} x1={150 + i * 26 + 13} y1={104 + Math.abs(i + 0.5) * 2} x2={150 + i * 26 + 13} y2={128 - Math.abs(i + 0.5) * 3} stroke="#D9DEE8" strokeWidth="1.5" />)}
      <path d="M30 95 Q150 60 270 95" fill="none" stroke="#C99B95" strokeWidth="2" />
    </g>
  );
  if (kind === 'corpo') return (
    <g fill="#FBEFEA" stroke="#C9B2A9" strokeWidth="2" strokeLinejoin="round">
      <circle cx="150" cy="40" r="24" />
      <path d="M138 63 L162 63 L164 74 Q200 80 214 96 L236 190 Q238 200 230 202 L212 128 L206 176 Q210 210 204 236 L196 352 L170 352 L156 250 L150 242 L144 250 L130 352 L104 352 L96 236 Q90 210 94 176 L88 128 L70 202 Q62 200 64 190 L86 96 Q100 80 136 74 Z" />
      <path d="M120 120 Q150 132 180 120 M150 140 L150 190" fill="none" stroke="#E6D3CC" strokeWidth="1.5" />
    </g>
  );
  if (kind === 'gluteo') return (
    <g fill="#FBEFEA" stroke="#C9B2A9" strokeWidth="2" strokeLinejoin="round">
      <path d="M92 30 Q150 50 208 30 L222 120 Q246 170 238 220 Q232 262 206 282 L200 352 L160 352 L154 272 Q150 264 146 272 L140 352 L100 352 L94 282 Q68 262 62 220 Q54 170 78 120 Z" />
      <path d="M150 150 Q148 210 150 262 M94 238 Q120 264 146 254 M206 238 Q180 264 154 254 M120 96 Q150 108 180 96" fill="none" stroke="#D9BFB6" strokeWidth="1.8" />
    </g>
  );
  return (
    <g>
      <path d="M150 28 C88 28 62 82 64 150 C66 228 104 300 150 316 C196 300 234 228 236 150 C238 82 212 28 150 28Z" fill="#FBEFEA" stroke="#C9B2A9" strokeWidth="2" />
      <path d="M96 128 Q118 116 136 126 M164 126 Q182 116 204 128" fill="none" stroke="#9C8077" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="117" cy="148" rx="15" ry="7" fill="#fff" stroke="#9C8077" strokeWidth="1.8" /><circle cx="117" cy="148" r="4" fill="#6B544C" />
      <ellipse cx="183" cy="148" rx="15" ry="7" fill="#fff" stroke="#9C8077" strokeWidth="1.8" /><circle cx="183" cy="148" r="4" fill="#6B544C" />
      <path d="M150 156 L144 204 Q150 210 156 204" fill="none" stroke="#B89A90" strokeWidth="2" strokeLinecap="round" />
      <path d="M124 242 Q150 232 176 242 Q150 258 124 242Z" fill="#E7A9A1" stroke="#C98B83" strokeWidth="1.5" />
      {smooth ? null : <><path d="M106 76 Q150 64 194 76" fill="none" stroke="#D8BFB6" strokeWidth="1.8" /><path d="M110 92 Q150 82 190 92" fill="none" stroke="#D8BFB6" strokeWidth="1.8" /><path d="M96 162 Q90 172 94 182 M204 162 Q210 172 206 182" fill="none" stroke="#E2CCC4" strokeWidth="1.5" /></>}
    </g>
  );
}
const artBox = (kind) => kind === 'sorriso' ? '0 0 300 200' : '0 0 300 360';
function FaceArt({ kind, smooth }) {
  return <svg viewBox={artBox(kind)} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', display: 'block', background: '#F4F7FC' }} aria-hidden="true">{artContent(kind, smooth)}</svg>;
}

function FakeQR({ seed = 'salute', size = 132 }) {
  const n = 25; let h = 0; for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const rnd = () => { h ^= h << 13; h >>>= 0; h ^= h >> 17; h ^= h << 5; h >>>= 0; return h / 4294967296; };
  const finder = (x, y) => [[0, 0], [n - 7, 0], [0, n - 7]].some(([a, b]) => x >= a && x < a + 7 && y >= b && y < b + 7);
  const cells = [];
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (!finder(x, y) && rnd() > 0.52) cells.push(<rect key={x + '_' + y} x={x} y={y} width="1" height="1" />);
  const F = ([a, b]) => <g key={a + '' + b}><rect x={a} y={b} width="7" height="7" fill="#0A2A6B" /><rect x={a + 1} y={b + 1} width="5" height="5" fill="#fff" /><rect x={a + 2} y={b + 2} width="3" height="3" fill="#0A2A6B" /></g>;
  return <svg viewBox={`-1 -1 ${n + 2} ${n + 2}`} width={size} height={size} style={{ display: 'block', background: '#fff', borderRadius: 12 }} aria-label="QR Code para envio de documentos"><g fill="#0A2A6B">{cells}</g>{[[0, 0], [n - 7, 0], [0, n - 7]].map(F)}</svg>;
}

function Seg({ items, value, onChange }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length}, minmax(0,1fr))`, padding: 4, borderRadius: 999, background: 'rgba(255,255,255,.45)', border: '1.5px solid rgba(255,255,255,.95)' }}>
      {items.map(([k, l]) => <button key={k} type="button" onClick={() => onChange(k)} style={{ height: 40, borderRadius: 999, border: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: value === k ? 600 : 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: '0 8px', color: value === k ? 'var(--text-strong)' : 'var(--text-muted)', background: value === k ? '#fff' : 'transparent', boxShadow: value === k ? '0 4px 12px -6px rgba(23,73,170,.3)' : 'none' }}>{l}</button>)}
    </div>
  );
}

/* ---------- Conversa ---------- */
const nowHM = () => { const d = new Date(); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); };
function seedMsgs(p) {
  const first = p.nome.split(' ')[0];
  return [
    { d: 'in', t: '09:12', text: 'Oi! Queria saber se tem horário para fazer o retorno do botox.' },
    { d: 'out', ia: true, t: '09:12', text: `Olá, ${first}! Aqui é a Renata, da clínica. Tenho horários na terça (07/10) às 10h ou 15h30. Qual fica melhor?`, s: 'read' },
    { d: 'in', t: '09:15', text: 'Terça às 10h fica ótimo.' },
    { d: 'out', ia: true, t: '09:15', text: 'Agendado! Terça, 07/10 às 10h com a Dra. Camila. Vou te enviar a anamnese de retorno para preencher antes, leva 3 minutinhos.', s: 'read' },
    { d: 'out', t: '09:40', text: 'Oi, tudo bem? Qualquer dúvida sobre o retorno é só chamar por aqui.', s: 'delivered' },
  ];
}
function ConversaTab({ p, msgs, setMsgs }) {
  const [v, setV] = React.useState('');
  const endRef = React.useRef(null);
  React.useEffect(() => { endRef.current && endRef.current.scrollIntoView({ block: 'end' }); }, [msgs.length]);
  const send = () => { if (!v.trim()) return; setMsgs((m) => [...m, { d: 'out', t: nowHM(), text: v.trim(), s: 'sent' }]); setV(''); setTimeout(() => { const txt = 'Obrigada! Recebi aqui.'; setMsgs((m) => [...m.map((x) => x.d === 'out' && !x.ia ? { ...x, s: 'read' } : x), { d: 'in', t: nowHM(), text: txt }]); notifyIncoming(p.nome, txt); }, 3500); };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0, flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)' }}><OIcon name="message-circle" size={15} />Conversa pelo WhatsApp {p.tel}</div>
      <div style={{ ...soft, flex: 1, minHeight: 260, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 14, scrollbarWidth: 'thin' }}>
        <span style={{ alignSelf: 'center', fontSize: 12, color: 'var(--text-muted)', padding: '4px 12px', borderRadius: 999, background: 'rgba(255,255,255,.8)' }}>Hoje</span>
        {msgs.map((m, i) => <div key={i} style={{ display: 'flex', justifyContent: m.d === 'out' ? 'flex-end' : 'flex-start' }}><FMsg direction={m.d} text={m.text} time={m.t} status={m.s} sender={m.ia ? 'ia' : undefined} style={{ maxWidth: '82%' }} /></div>)}
        <span ref={endRef} />
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ flex: 1 }}><OInput placeholder="Escreva uma mensagem" value={v} onChange={(e) => setV(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') send(); }} /></div>
        <OBtn iconLeft="send" onClick={send}>Enviar</OBtn>
      </div>
    </div>
  );
}

/* ---------- Dados e Histórico ---------- */
const CAMPOS = [
  { k: 'nome', l: 'Nome', full: true }, { k: 'tipo', l: 'Tipo', opts: ['Particular', 'Convênio', 'Empresarial'] },
  { k: 'conv', l: 'Convênio', opts: ['', 'Unimed', 'Bradesco Saúde', 'SulAmérica', 'Amil'] }, { k: 'empresa', l: 'Empresa' },
  { k: 'tel', l: 'WhatsApp', lock: true }, { k: 'nasc', l: 'Nascimento' }, { k: 'sexo', l: 'Sexo', opts: ['Feminino', 'Masculino', 'Prefiro não informar'] },
  { k: 'cpf', l: 'CPF', lock: true },
];

/* ---------- Agendamento rápido (dentro de Dados e Histórico) ---------- */
const { Switch: QSwitch } = window.SaluteProjetoDesigner_8b4683;
const QWD = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const qHoras = (d) => d.getDay() === 0 ? [] : d.getDay() === 6 ? [9, 10, 11] : [9, 10, 11, 12, 13, 14];
const qHH = (h) => String(h).padStart(2, '0') + ':00';
const qDia = (d) => QWD[d.getDay()] + ', ' + String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0');
function QuickAgendar({ p, onEvent }) {
  const [appts] = useStore(APPT_STORE);
  const [open, setOpen] = React.useState(false);
  const now = new Date();
  const past = (d, h) => d < TODAY || (sameDay(d, TODAY) && sameDay(now, TODAY) && now.getHours() >= h);
  const days = Array.from({ length: 8 }, (_, i) => addD(TODAY, i));
  const temLivre = (d) => qHoras(d).some((h) => !past(d, h));
  const [col, setCol] = React.useState(0);
  const [day, setDay] = React.useState(() => days.find(temLivre) || days[1]);
  const [h, setH] = React.useState(null);
  const [proc, setProc] = React.useState('');
  const [zap, setZap] = React.useState(true);
  const conflito = h != null ? agendaOcupado(col, day, h) : null;
  const livres = qHoras(day).filter((x) => !past(day, x) && !agendaOcupado(col, day, x));
  const prox = appts.filter((a) => a.pac === p.nome && a.date >= TODAY_ISO).sort((a, b) => (a.date + a.h).localeCompare(b.date + b.h))[0];
  const reset = () => { setH(null); setProc(''); setZap(true); };
  const confirmar = () => {
    if (h == null) return;
    const pro = PROS[col].n, first = p.nome.split(' ')[0];
    APPT_STORE.v = [...APPT_STORE.v, { id: Date.now(), pac: p.nome, col, date: isoOf(day), h, proc }]; APPT_STORE.subs.forEach((f) => f());
    onEvent({
      hist: { t: 'Consulta agendada', s: `${qDia(day)} às ${qHH(h)} com ${pro}${proc ? ', ' + proc : ''}${conflito ? ' (horário duplicado)' : ''}`, c: conflito ? '#F5B400' : '#1F5EFF' },
      msg: zap ? `Olá, ${first}! Sua consulta está agendada para ${qDia(day).toLowerCase()} às ${qHH(h)} com ${pro}. Qualquer dúvida, é só chamar por aqui.` : undefined,
      toast: conflito ? 'Agendado com aviso de horário duplicado' : 'Consulta agendada',
    });
    reset(); setOpen(false);
  };
  const chipBase = (on, dis) => ({ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1, minHeight: 32, padding: '4px 12px', borderRadius: 999, cursor: dis ? 'default' : 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', flexShrink: 0, opacity: dis ? .45 : 1,
    border: on ? '1.5px solid rgba(31,94,255,.35)' : '1.5px solid rgba(214,226,242,.9)', background: on ? 'rgba(31,94,255,.1)' : 'rgba(255,255,255,.7)', color: on ? '#1F5EFF' : 'var(--text-strong)' });
  if (!open) return (
    <div style={{ ...soft, padding: '14px 14px 14px 16px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
      <span style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(31,94,255,.1)', color: '#1F5EFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><OIcon name="calendar-days" size={19} /></span>
      <span style={{ flex: 1, minWidth: 160 }}>
        <span style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)' }}>Próxima consulta</span>
        <span style={{ display: 'block', fontSize: 15, fontWeight: 500, color: prox ? 'var(--text-strong)' : 'var(--text-subtle)' }}>{prox ? `${qDia(new Date(prox.date + 'T00:00:00'))} às ${qHH(prox.h)} com ${PROS[prox.col].n}` : 'Nenhuma consulta marcada'}</span>
      </span>
      <OBtn size="sm" iconLeft="calendar-plus" onClick={() => setOpen(true)}>Agendar</OBtn>
    </div>
  );
  return (
    <div style={{ ...soft, padding: 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}><span style={lbl}>Agendamento rápido</span><button type="button" aria-label="Fechar agendamento" onClick={() => { reset(); setOpen(false); }} style={{ width: 30, height: 30, borderRadius: '50%', border: 0, background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><OIcon name="x" size={17} /></button></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Profissional</span>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
          {PROS.map((pr, i) => <button key={pr.n} type="button" onClick={() => setCol(i)} style={{ ...chipBase(col === i), flexDirection: 'row', gap: 6, padding: '0 12px 0 4px', height: 36 }}><OAv name={pr.n} size={26} />{pr.n.split(' ')[0] === 'Dr.' ? pr.n : pr.n.split(' ')[0]}</button>)}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Dia</span>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 2 }}>
          {days.map((d) => { const dis = !temLivre(d); return <button key={d.toISOString()} type="button" disabled={dis} onClick={() => { setDay(d); setH(null); }} style={chipBase(sameDay(d, day), dis)}><span>{sameDay(d, TODAY) ? 'Hoje' : QWD[d.getDay()]} {String(d.getDate()).padStart(2, '0')}</span>{d.getDay() === 0 ? <span style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>Fechado</span> : null}</button>; })}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Horário</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(84px, 1fr))', gap: 8 }}>
          {qHoras(day).map((x) => { const oc = agendaOcupado(col, day, x), ps = past(day, x), on = h === x; return (
            <button key={x} type="button" disabled={ps} onClick={() => setH(x)} style={{ ...chipBase(on, ps), borderRadius: 14, minHeight: 46, border: on ? (oc ? '1.5px solid rgba(245,180,0,.7)' : '1.5px solid rgba(31,94,255,.35)') : '1.5px solid rgba(214,226,242,.9)', background: on ? (oc ? 'rgba(245,180,0,.12)' : 'rgba(31,94,255,.1)') : 'rgba(255,255,255,.7)' }}>
              <span style={{ fontSize: 14, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: on && !oc ? '#1F5EFF' : 'var(--text-strong)' }}>{qHH(x)}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, color: ps ? 'var(--text-subtle)' : oc ? '#B7791F' : '#2DBF6A' }}>{ps ? 'Passou' : oc ? <><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#F5B400' }} />Ocupado</> : 'Livre'}</span>
            </button>); })}
        </div>
      </div>
      {conflito ? <div role="alert" style={{ display: 'flex', gap: 10, padding: '12px 14px', borderRadius: 14, background: 'rgba(245,180,0,.12)', border: '1.5px solid rgba(245,180,0,.45)' }}>
        <span style={{ color: '#B7791F', display: 'flex', paddingTop: 1 }}><OIcon name="triangle-alert" size={18} /></span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
          <span style={{ fontSize: 14, color: 'var(--text-strong)', lineHeight: 1.45 }}><b style={{ fontWeight: 600 }}>Possível duplicidade de horário.</b> {PROS[col].n} já tem {conflito.n} às {qHH(9 + conflito.row)} neste dia.</span>
          {livres.length ? <span style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', fontSize: 13, color: 'var(--text-muted)' }}>Livres:{livres.map((x) => <button key={x} type="button" onClick={() => setH(x)} style={{ ...chipBase(false), minHeight: 28, padding: '0 10px', fontSize: 12.5 }}>{qHH(x)}</button>)}</span> : <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Sem horários livres para {PROS[col].n} neste dia.</span>}
        </div>
      </div> : null}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, alignItems: 'end' }}>
        <OSelect label="Procedimento (opcional)" options={['Não informado', ...FIN_PROCS.map((f) => f.n)]} value={proc || 'Não informado'} onChange={(e) => setProc(e.target.value === 'Não informado' ? '' : e.target.value)} />
        <div style={{ paddingBottom: 8 }}><QSwitch checked={zap} onChange={setZap} label="Enviar confirmação pelo WhatsApp" /></div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, flexWrap: 'wrap' }}>
        <OBtn size="sm" variant="secondary" onClick={() => { reset(); setOpen(false); }}>Cancelar</OBtn>
        <OBtn size="sm" iconLeft={conflito ? 'triangle-alert' : 'check'} disabled={h == null} onClick={confirmar}>{conflito ? 'Agendar mesmo assim' : h == null ? 'Escolha um horário' : `Agendar ${qDia(day)} às ${qHH(h)}`}</OBtn>
      </div>
    </div>
  );
}

function DadosTab({ p, onSave, hist, onEvent }) {
  const [edit, setEdit] = React.useState(false);
  const [d, setD] = React.useState(p);
  React.useEffect(() => { setD(p); setEdit(false); }, [p]);
  const show = (c) => c.k === 'conv' ? (p.conv || 'Sem convênio') : c.k === 'empresa' ? (p.empresa || 'Não se aplica') : p[c.k];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {onEvent ? <QuickAgendar p={p} onEvent={onEvent} /> : null}
      <div style={{ ...soft, padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
          <span style={lbl}>Dados do paciente</span>
          {edit ? <div style={{ display: 'flex', gap: 8 }}><OBtn size="sm" variant="secondary" onClick={() => { setD(p); setEdit(false); }}>Cancelar</OBtn><OBtn size="sm" iconLeft="check" onClick={() => { onSave(d); setEdit(false); }}>Salvar</OBtn></div>
            : <OBtn size="sm" variant="secondary" iconLeft="pencil" onClick={() => setEdit(true)}>Editar</OBtn>}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: edit ? 12 : 14 }}>
          {CAMPOS.map((c) => (
            <div key={c.k} style={{ gridColumn: c.full ? '1 / -1' : 'auto', minWidth: 0 }}>
              {edit && !c.lock ? (c.opts
                ? <OSelect label={c.l} options={c.opts.map((o) => o || 'Sem convênio')} value={(c.k === 'conv' && !d.conv) ? 'Sem convênio' : d[c.k]} onChange={(e) => setD({ ...d, [c.k]: c.k === 'conv' && e.target.value === 'Sem convênio' ? '' : e.target.value })} />
                : <OInput label={c.l} value={d[c.k]} onChange={(e) => setD({ ...d, [c.k]: e.target.value })} />)
                : (<div><p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)' }}>{c.l}{edit && c.lock ? <span style={{ marginLeft: 6, fontSize: 11 }}>{c.k === 'cpf' ? '(identificador fixo)' : '(troque no topo)'}</span> : null}</p>
                  <p style={{ margin: '3px 0 0', fontSize: 15, fontWeight: 500, color: (c.k === 'conv' && !p.conv) || (c.k === 'empresa' && !p.empresa) ? 'var(--text-subtle)' : 'var(--text-strong)', fontVariantNumeric: 'tabular-nums', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.k === 'tipo' ? <TipoBadge t={p.tipo} /> : show(c)}</p></div>)}
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <span style={lbl}>Histórico</span>
        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 14, paddingLeft: 22 }}>
          <span style={{ position: 'absolute', left: 6, top: 6, bottom: 6, width: 2, borderRadius: 2, background: 'rgba(150,175,210,.35)' }} />
          {hist.map((h, i) => (
            <div key={i} style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: -21, top: 4, width: 12, height: 12, borderRadius: '50%', background: '#fff', border: `3px solid ${h.c || '#1F5EFF'}`, boxSizing: 'border-box' }} />
              <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: 'var(--text-strong)' }}>{h.t}</p>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--text-muted)' }}>{h.d}{h.s ? ' · ' + h.s : ''}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- Prontuário ---------- */
const ANAM_STORE = makeStore(null);
const useAnamModels = () => { if (ANAM_STORE.v === null) ANAM_STORE.v = ANAM0; return useStore(ANAM_STORE); };
const MODEL_STORE = makeStore([]);
const readFile = (f) => new Promise((res) => { const r = new FileReader(); r.onload = () => res(r.result); r.readAsDataURL(f); });
const Overlay = ({ children }) => ReactDOM.createPortal(<div data-overlay="1" style={{ fontFamily: 'var(--font-sans)' }}>{children}</div>, document.body);

function PillSelect({ value, onChange, options, icon = 'sliders-horizontal', label }) {
  return (
    <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 8, height: 40, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,.95)', background: 'rgba(255,255,255,.7)', boxShadow: '0 4px 12px -8px rgba(23,73,170,.35)', color: 'var(--text-strong)', flexShrink: 0, maxWidth: '100%' }}>
      <OIcon name={icon} size={15} />
      <select aria-label={label} value={value} onChange={(e) => onChange(e.target.value)} style={{ appearance: 'none', WebkitAppearance: 'none', border: 0, background: 'transparent', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, color: 'inherit', cursor: 'pointer', outline: 'none', paddingRight: 22, minWidth: 0 }}>
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
      <span style={{ position: 'absolute', right: 12, pointerEvents: 'none', display: 'flex' }}><OIcon name="chevron-down" size={15} /></span>
    </label>
  );
}
const BackLink = ({ onClick, children = 'Voltar ao prontuário' }) => <button type="button" onClick={onClick} style={{ ...linkBtn, fontSize: 14, alignSelf: 'flex-start' }}><OIcon name="arrow-left" size={15} />{children}</button>;
const Stepper = ({ value, onDec, onInc, label }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, height: 40, padding: '0 4px', borderRadius: 999, background: '#fff', border: '1.5px solid rgba(214,226,242,.95)', minWidth: 120 }}>
    <button type="button" aria-label="Diminuir" onClick={onDec} style={{ ...fCircle, width: 30, height: 30 }}><OIcon name="minus" size={14} /></button>
    <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-strong)', whiteSpace: 'nowrap' }}>{label}</span>
    <button type="button" aria-label="Aumentar" onClick={onInc} style={{ ...fCircle, width: 30, height: 30 }}><OIcon name="plus" size={14} /></button>
  </div>
);

/* ---- Anamnese ---- */
function AnamneseWorkspace({ p, onSend, onBack, wide }) {
  const [models, setModels] = useAnamModels();
  const [sel, setSel] = React.useState(models[0] && models[0].id);
  const [ed, setEd] = React.useState(null);
  const [copied, setCopied] = React.useState(false);
  const m = models.find((x) => x.id === sel);
  const link = m ? `salute.app/a/${slug(m.nome)}/${onlyDigits(p.cpf).slice(0, 3)}${onlyDigits(p.cpf).slice(-2)}` : '';
  const saveNew = () => { if (!ed.nome.trim()) return; const n = { ...ed, nome: ed.nome.trim(), qs: ed.qs.filter((q) => q.t.trim()) }; setModels((l) => [...l, n]); setSel(n.id); setEd(null); };
  const setQ = (i, v) => setEd({ ...ed, qs: ed.qs.map((q, j) => j === i ? { ...q, ...v } : q) });
  if (ed) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <BackLink onClick={() => setEd(null)}>Voltar aos modelos</BackLink>
      <div style={{ ...soft, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <span style={lbl}>Nova anamnese</span>
        <OInput label="Nome" placeholder="Ex.: Pós procedimento" value={ed.nome} onChange={(e) => setEd({ ...ed, nome: e.target.value })} />
        {ed.qs.map((q, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(31,94,255,.1)', color: '#1F5EFF', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
            <div style={{ flex: 1, minWidth: 180 }}><OInput placeholder="Escreva a pergunta" value={q.t} onChange={(e) => setQ(i, { t: e.target.value })} /></div>
            <div style={{ width: 170 }}><OSelect options={TIPOS_Q} value={q.k} onChange={(e) => setQ(i, { k: e.target.value })} /></div>
            <button type="button" aria-label="Remover pergunta" onClick={() => setEd({ ...ed, qs: ed.qs.filter((_, j) => j !== i) })} style={{ ...fCircle, width: 34, height: 34 }}><OIcon name="trash-2" size={14} /></button>
          </div>
        ))}
        <button type="button" onClick={() => setEd({ ...ed, qs: [...ed.qs, { t: '', k: 'Texto' }] })} style={{ height: 42, borderRadius: 14, border: '1.5px dashed rgba(31,94,255,.4)', background: 'rgba(31,94,255,.04)', color: '#1F5EFF', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><OIcon name="plus" size={15} />Adicionar pergunta</button>
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}><OBtn size="sm" variant="secondary" onClick={() => setEd(null)}>Cancelar</OBtn><OBtn size="sm" iconLeft="check" onClick={saveNew}>Salvar e selecionar</OBtn></div>
      </div>
    </div>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <BackLink onClick={onBack} />
      <div style={{ display: 'grid', gridTemplateColumns: wide ? '300px minmax(0,1fr)' : '1fr', gap: 14, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={lbl}>1. Escolha a anamnese</span>
          {models.map((x) => { const on = x.id === sel; return (
            <button key={x.id} type="button" onClick={() => { setSel(x.id); setCopied(false); }} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 16, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', border: on ? '1.5px solid #1F5EFF' : '1.5px solid rgba(255,255,255,.95)', background: on ? 'rgba(31,94,255,.07)' : 'rgba(255,255,255,.6)' }}>
              <span style={{ width: 18, height: 18, borderRadius: '50%', border: on ? '5px solid #1F5EFF' : '2px solid rgba(150,175,210,.8)', boxSizing: 'border-box', background: '#fff', flexShrink: 0 }} />
              <span style={{ flex: 1, minWidth: 0 }}><span style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}>{x.nome}</span><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{x.uso} · {x.qs.length} perguntas</span></span>
            </button>); })}
          <button type="button" onClick={() => setEd({ id: Date.now(), nome: '', uso: 'Geral', usos: 0, qs: [{ t: '', k: 'Texto' }] })} style={{ height: 44, borderRadius: 16, border: '1.5px dashed rgba(31,94,255,.4)', background: 'rgba(31,94,255,.04)', color: '#1F5EFF', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><OIcon name="plus" size={15} />Criar nova anamnese</button>
        </div>
        {m ? <div style={{ ...soft, background: 'rgba(255,255,255,.8)', padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <span style={lbl}>2. Confira o que o paciente vai responder</span>
          <p style={{ margin: 0, fontSize: 17, fontWeight: 600, color: 'var(--text-strong)' }}>{m.nome}</p>
          <ol style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>{m.qs.map((q, i) => <li key={i} style={{ fontSize: 14, color: 'var(--text-body)' }}>{q.t || 'Pergunta sem texto'} <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>({q.k.toLowerCase()})</span></li>)}</ol>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', paddingTop: 14, borderTop: '1px solid rgba(214,226,242,.9)' }}>
            <span style={{ flex: 1, minWidth: 200, fontSize: 13, color: 'var(--text-muted)' }}>3. Vai direto para o WhatsApp <B>{p.tel}</B> com o link para responder.</span>
            <OBtn size="sm" variant="secondary" iconLeft={copied ? 'check' : 'copy'} onClick={() => { try { navigator.clipboard && navigator.clipboard.writeText('https://' + link); } catch (e) {} setCopied(true); }}>{copied ? 'Copiado' : 'Copiar link'}</OBtn>
            <OBtn size="sm" iconLeft="send" onClick={() => onSend(m, link)}>Enviar no WhatsApp</OBtn>
          </div>
        </div> : null}
      </div>
    </div>
  );
}

/* ---- Mapeamento e marcação ---- */
const BW = 600, BH = 720;
const SYS_MODELS = [['face', 'Facial'], ['corpo', 'Corporal'], ['gluteo', 'Glúteo'], ['sorriso', 'Dental']];
const MAP_PRODS = {
  'Toxina botulínica': { u: 'U', step: 1, def: 4, c: '#1F5EFF' },
  'Ácido hialurônico': { u: 'ml', step: 0.1, def: 0.5, c: '#7B4BC4' },
  'Bioestimulador': { u: 'ml', step: 0.5, def: 1, c: '#22C3F2' },
  'Fio de PDO': { u: ' fios', step: 1, def: 2, c: '#2DBF6A' },
  'Só comentário': { u: '', step: 0, def: 0, c: '#F5B400' },
};
const PEN_COLORS = ['#7B4BC4', '#1F5EFF', '#22C3F2', '#F2694A', '#E5484D', '#2DBF6A', '#0E2350'];
const doseLbl = (prod, d) => { const m = MAP_PRODS[prod] || MAP_PRODS['Só comentário']; if (!m.u) return ''; return (m.u === 'ml' ? String(Math.round(d * 100) / 100).replace('.', ',') : d) + m.u; };
const isImg = (bg) => typeof bg === 'string' && (bg.startsWith('data:') || bg.startsWith('blob:'));
const modelLabel = (bg) => { const s = SYS_MODELS.find((x) => x[0] === bg); return s ? 'Modelo ' + s[1].toLowerCase() : 'Imagem enviada'; };
const strokeD = (s) => s.pts.map((q, i) => (i ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1)).join(' ');
const distSeg = (p, a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], l = dx * dx + dy * dy; let t = l ? ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l : 0; t = Math.max(0, Math.min(1, t)); return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy); };
const hitStroke = (s, p, r) => s.pts.length === 1 ? Math.hypot(p[0] - s.pts[0][0], p[1] - s.pts[0][1]) < r : s.pts.some((q, i) => i && distSeg(p, s.pts[i - 1], q) < r);
const mapTotals = (points) => Object.keys(MAP_PRODS).map((k) => { const ps = points.filter((p) => p.prod === k); return { prod: k, n: ps.length, total: Math.round(ps.reduce((a, p) => a + (+p.dose || 0), 0) * 100) / 100 }; }).filter((t) => t.n);

function BoardLayers({ bg, points, strokes, labels = true, sel, hover }) {
  return (
    <>
      <rect x="0" y="0" width={BW} height={BH} fill="#F4F7FC" />
      {isImg(bg) ? <image href={bg} x="0" y="0" width={BW} height={BH} preserveAspectRatio="xMidYMid meet" /> : bg ? <svg x="0" y="0" width={BW} height={BH} viewBox={artBox(bg)} preserveAspectRatio="xMidYMid meet">{artContent(bg)}</svg> : null}
      {strokes.map((s) => <path key={s.id} data-sid={s.id} d={strokeD(s)} fill="none" stroke={s.color} strokeWidth={s.w} strokeOpacity={s.op} strokeLinecap="round" strokeLinejoin="round" style={{ filter: sel && sel.id === s.id ? 'drop-shadow(0 0 4px rgba(31,94,255,.9))' : 'none' }} />)}
      {points.map((p, i) => { const c = (MAP_PRODS[p.prod] || MAP_PRODS['Só comentário']).c, dl = doseLbl(p.prod, p.dose), on = (sel && sel.id === p.id) || hover === p.id; return (
        <g key={p.id} data-pid={p.id} style={{ cursor: 'pointer' }}>
          {on ? <circle cx={p.x} cy={p.y} r="19" fill={c} opacity=".22" /> : null}
          <circle cx={p.x} cy={p.y} r="12" fill={c} stroke="#fff" strokeWidth="3" />
          <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" style={{ pointerEvents: 'none' }}>{i + 1}</text>
          {labels && dl ? <g style={{ pointerEvents: 'none' }}><rect x={p.x + 15} y={p.y - 11} width={dl.length * 7.6 + 12} height="22" rx="11" fill="#fff" stroke={c} strokeWidth="1.5" /><text x={p.x + 21} y={p.y + 4} fontSize="12" fontWeight="700" fill={c}>{dl}</text></g> : null}
          {labels && p.com ? <circle cx={p.x + 10} cy={p.y - 10} r="4.5" fill="#F5B400" stroke="#fff" strokeWidth="1.5" style={{ pointerEvents: 'none' }} /> : null}
        </g>); })}
    </>
  );
}
function MapThumb({ r, h = 110 }) {
  return <svg viewBox={`0 0 ${BW} ${BH}`} style={{ width: h * BW / BH, height: h, borderRadius: 12, border: '1px solid rgba(214,226,242,.9)', flexShrink: 0, display: 'block', background: '#F4F7FC' }}><BoardLayers bg={r.bg} points={r.points} strokes={r.strokes} labels={false} /></svg>;
}

function ImagePicker({ onPick, compact }) {
  const [models, setModels] = useStore(MODEL_STORE);
  const photoRef = React.useRef(null), modelRef = React.useRef(null);
  const tile = (key, label, content, onClick, extra) => (
    <button key={key} type="button" onClick={onClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: 8, borderRadius: 16, cursor: 'pointer', fontFamily: 'inherit', border: '1.5px solid rgba(214,226,242,.95)', background: '#fff', position: 'relative', ...extra }}>
      <span style={{ width: compact ? 64 : 84, height: compact ? 76 : 100, borderRadius: 10, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F4F7FC' }}>{content}</span>
      <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-strong)', maxWidth: compact ? 70 : 92, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
    </button>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <OBtn iconLeft="camera" onClick={() => photoRef.current && photoRef.current.click()}>Subir foto do paciente</OBtn>
        <input ref={photoRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={async (e) => { const f = e.target.files && e.target.files[0]; if (f) onPick(await readFile(f), 'foto'); e.target.value = ''; }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={lbl}>Modelos do sistema</span>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{SYS_MODELS.map(([k, l]) => tile(k, l, <FaceArt kind={k} />, () => onPick(k, 'modelo')))}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={lbl}>Meus modelos</span>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {models.map((m) => tile(m.id, m.name, <img src={m.src} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />, () => onPick(m.src, 'modelo')))}
          {tile('add', 'Adicionar modelo', <span style={{ color: '#1F5EFF', display: 'flex' }}><OIcon name="image-plus" size={26} /></span>, () => modelRef.current && modelRef.current.click(), { borderStyle: 'dashed', borderColor: 'rgba(31,94,255,.45)', background: 'rgba(31,94,255,.04)' })}
        </div>
        <input ref={modelRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={async (e) => { const f = e.target.files && e.target.files[0]; if (f) { const src = await readFile(f); setModels((l) => [...l, { id: 'm' + Date.now(), name: f.name.replace(/\.[^.]+$/, ''), src }]); onPick(src, 'modelo'); } e.target.value = ''; }} />
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Modelos que você adiciona ficam salvos para usar com qualquer paciente.</span>
      </div>
    </div>
  );
}

function MapEditor({ initial, onSave, onBack, wide }) {
  const [name, setName] = React.useState(initial ? initial.title : 'Mapeamento ' + HOJE.slice(0, 5));
  const [bg, setBg] = React.useState(initial ? initial.bg : null);
  const [points, setPoints] = React.useState(initial ? initial.points : []);
  const [strokes, setStrokes] = React.useState(initial ? initial.strokes : []);
  const [tool, setTool] = React.useState('pontos');
  const [prod, setProd] = React.useState('Toxina botulínica');
  const [dose, setDose] = React.useState(4);
  const [color, setColor] = React.useState('#7B4BC4');
  const [width, setWidth] = React.useState(6);
  const [opacity, setOpacity] = React.useState(0.9);
  const [eraser, setEraser] = React.useState(22);
  const [hist, setHist] = React.useState({ past: [], future: [] });
  const [draft, setDraft] = React.useState(null);
  const [sel, setSel] = React.useState(null);
  const [hover, setHover] = React.useState(null);
  const [cursor, setCursor] = React.useState(null);
  const [imgMenu, setImgMenu] = React.useState(false);
  const [savedAt, setSavedAt] = React.useState(null);
  const svgRef = React.useRef(null), drag = React.useRef(null), recId = React.useRef(initial ? initial.id : null);
  const getPt = (e) => { const r = svgRef.current.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * BW, (e.clientY - r.top) / r.height * BH]; };
  const commit = (np, ns) => { setHist((h) => ({ past: [...h.past, { points, strokes }], future: [] })); setPoints(np); setStrokes(ns); setSavedAt(null); };
  const undo = () => { if (!hist.past.length) return; const last = hist.past[hist.past.length - 1]; setHist({ past: hist.past.slice(0, -1), future: [{ points, strokes }, ...hist.future] }); setPoints(last.points); setStrokes(last.strokes); setSel(null); };
  const redo = () => { if (!hist.future.length) return; const nx = hist.future[0]; setHist({ past: [...hist.past, { points, strokes }], future: hist.future.slice(1) }); setPoints(nx.points); setStrokes(nx.strokes); };
  const eraseAt = (pt) => { setPoints((ps) => ps.filter((p) => Math.hypot(p.x - pt[0], p.y - pt[1]) > eraser + 8)); setStrokes((ss) => ss.filter((s) => !hitStroke(s, pt, eraser + s.w / 2))); };
  const onDown = (e) => {
    if (!bg) return;
    const pt = getPt(e), tp = e.target.closest && e.target.closest('[data-pid]'), ts = e.target.closest && e.target.closest('[data-sid]');
    const pid = tp && tp.getAttribute('data-pid'), sid = ts && ts.getAttribute('data-sid');
    if (tool === 'pontos') {
      if (pid) setSel({ t: 'p', id: pid }); else if (sid) setSel({ t: 's', id: sid });
      else { commit([...points, { id: 'p' + Date.now(), x: pt[0], y: pt[1], prod, dose: MAP_PRODS[prod].u ? dose : 0, com: '' }], strokes); setSel(null); }
      return;
    }
    setSel(null);
    try { svgRef.current.setPointerCapture(e.pointerId); } catch (err) {}
    if (tool === 'pincel' || tool === 'linha') setDraft({ id: 's' + Date.now(), type: tool === 'pincel' ? 'pen' : 'line', pts: [pt, pt], color, w: width, op: opacity, com: '' });
    else if (tool === 'borracha') { drag.current = { mode: 'erase', snap: { points, strokes } }; eraseAt(pt); }
    else if (tool === 'mover') {
      if (pid) { const o = points.find((p) => p.id === pid); drag.current = { mode: 'mp', id: pid, start: pt, o: { x: o.x, y: o.y }, snap: { points, strokes } }; }
      else if (sid) { const o = strokes.find((s) => s.id === sid); drag.current = { mode: 'ms', id: sid, start: pt, o: o.pts, snap: { points, strokes } }; }
    }
  };
  const onMove = (e) => {
    if (!bg) return;
    const pt = getPt(e); setCursor(pt);
    if (draft) { setDraft((d) => d.type === 'pen' ? (Math.hypot(pt[0] - d.pts[d.pts.length - 1][0], pt[1] - d.pts[d.pts.length - 1][1]) > 2 ? { ...d, pts: [...d.pts, pt] } : d) : { ...d, pts: [d.pts[0], pt] }); return; }
    const g = drag.current; if (!g) return;
    if (g.mode === 'erase') eraseAt(pt);
    else if (g.mode === 'mp') setPoints((ps) => ps.map((p) => p.id === g.id ? { ...p, x: g.o.x + pt[0] - g.start[0], y: g.o.y + pt[1] - g.start[1] } : p));
    else if (g.mode === 'ms') setStrokes((ss) => ss.map((s) => s.id === g.id ? { ...s, pts: g.o.map((q) => [q[0] + pt[0] - g.start[0], q[1] + pt[1] - g.start[1]]) } : s));
  };
  const onUp = () => {
    if (draft) { const ok = draft.type === 'pen' ? draft.pts.length > 2 : Math.hypot(draft.pts[1][0] - draft.pts[0][0], draft.pts[1][1] - draft.pts[0][1]) > 6; if (ok) commit(points, [...strokes, draft.type === 'pen' ? { ...draft, pts: draft.pts.slice(1) } : draft]); setDraft(null); }
    const g = drag.current; if (g) { setHist((h) => ({ past: [...h.past, g.snap], future: [] })); setSavedAt(null); drag.current = null; }
  };
  const save = () => { const rec = { id: recId.current, kind: 'mapa', title: name.trim() || 'Mapeamento', bg, points, strokes }; const id = onSave(rec); recId.current = id; setSavedAt(nowHM()); };
  const exportPng = () => {
    const clone = svgRef.current.cloneNode(true); clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg'); clone.setAttribute('width', BW * 2); clone.setAttribute('height', BH * 2); clone.removeAttribute('style');
    const img = new Image();
    img.onload = () => { const c = document.createElement('canvas'); c.width = BW * 2; c.height = BH * 2; c.getContext('2d').drawImage(img, 0, 0, BW * 2, BH * 2); c.toBlob((b) => { const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = (name || 'mapeamento') + '.png'; document.body.appendChild(a); a.click(); a.remove(); }); };
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(clone));
  };
  const pick = (src) => { setBg(src); setImgMenu(false); setSavedAt(null); };
  const selP = sel && sel.t === 'p' ? points.find((p) => p.id === sel.id) : null;
  const selS = sel && sel.t === 's' ? strokes.find((s) => s.id === sel.id) : null;
  const updP = (id, v) => { setPoints((ps) => ps.map((p) => p.id === id ? { ...p, ...v } : p)); setSavedAt(null); };
  const updS = (id, v) => { setStrokes((ss) => ss.map((s) => s.id === id ? { ...s, ...v } : s)); setSavedAt(null); };
  const totals = mapTotals(points);
  const pm = MAP_PRODS[prod];
  const TOOLS = [['pontos', 'Pontos', 'map-pin'], ['pincel', 'Pincel', 'pencil'], ['linha', 'Linha', 'minus'], ['borracha', 'Borracha', 'eraser'], ['mover', 'Mover', 'hand']];
  const tb = (on) => ({ display: 'inline-flex', alignItems: 'center', gap: 6, height: 36, padding: '0 14px', borderRadius: 999, border: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap', color: on ? '#fff' : 'var(--text-strong)', background: on ? 'linear-gradient(180deg,#0B4BEB,#1FA8F5)' : 'transparent', boxShadow: on ? '0 6px 14px -8px rgba(11,75,235,.8)' : 'none' });
  const ic = { ...fCircle, width: 34, height: 34, background: 'transparent', border: 0 };
  const range = (v, set, min, max, step, fmt) => <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)' }}><input type="range" min={min} max={max} step={step} value={v} onChange={(e) => set(+e.target.value)} style={{ width: 110, accentColor: '#1F5EFF' }} /><b style={{ color: 'var(--text-strong)', minWidth: 34 }}>{fmt(v)}</b></span>;
  const sideCard = (title, n, children) => <div style={{ ...soft, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}><span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}>{title}{n !== undefined ? ` (${n})` : ''}</span>{children}</div>;
  const empty = (t) => <span style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{t}</span>;
  const inl = { flex: 1, minWidth: 0, height: 32, border: '1.5px solid rgba(214,226,242,.95)', borderRadius: 999, padding: '0 10px', fontFamily: 'inherit', fontSize: 13, outline: 'none', background: '#fff', color: 'var(--text-strong)' };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <button type="button" aria-label="Voltar ao prontuário" onClick={onBack} style={{ ...fCircle, width: 38, height: 38 }}><OIcon name="arrow-left" size={17} /></button>
        <input value={name} onChange={(e) => { setName(e.target.value); setSavedAt(null); }} aria-label="Nome do mapeamento" style={{ flex: 1, minWidth: 160, height: 40, borderRadius: 999, border: '1.5px solid rgba(255,255,255,.95)', background: 'rgba(255,255,255,.75)', padding: '0 16px', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: 'var(--text-strong)', outline: 'none' }} />
        {savedAt ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#2DBF6A' }}><OIcon name="check" size={13} />Salvo às {savedAt}</span> : null}
        <OBtn size="sm" variant="secondary" iconLeft="download" onClick={exportPng} disabled={!bg}>Exportar</OBtn>
        <OBtn size="sm" iconLeft="save" onClick={save} disabled={!bg}>Salvar</OBtn>
      </div>
      {!bg ? (
        <div style={{ ...soft, padding: wide ? 28 : 18, border: '2px dashed rgba(31,94,255,.3)', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div><p style={{ margin: 0, fontSize: 17, fontWeight: 600, color: 'var(--text-strong)' }}>Escolha a imagem para marcar</p><p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-muted)' }}>Serve para qualquer área: suba uma foto do paciente, use um modelo do sistema ou um modelo seu.</p></div>
          <ImagePicker onPick={pick} />
        </div>
      ) : <>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: 4, borderRadius: 999, background: 'rgba(255,255,255,.7)', border: '1.5px solid rgba(255,255,255,.95)', overflowX: 'auto', scrollbarWidth: 'none', position: 'relative' }}>
          {TOOLS.map(([k, l, i]) => <button key={k} type="button" onClick={() => { setTool(k); setSel(null); }} aria-pressed={tool === k} style={tb(tool === k)}><OIcon name={i} size={15} />{l}</button>)}
          <span style={{ width: 1, height: 22, background: 'rgba(150,175,210,.5)', margin: '0 6px', flexShrink: 0 }} />
          <button type="button" aria-label="Desfazer" title="Desfazer" onClick={undo} style={{ ...ic, opacity: hist.past.length ? 1 : .35 }}><OIcon name="undo-2" size={16} /></button>
          <button type="button" aria-label="Refazer" title="Refazer" onClick={redo} style={{ ...ic, opacity: hist.future.length ? 1 : .35 }}><OIcon name="redo-2" size={16} /></button>
          <button type="button" onClick={() => { if (points.length || strokes.length) { commit([], []); setSel(null); } }} style={{ ...tb(false), color: '#E5484D' }}>Limpar tudo</button>
          <span style={{ width: 1, height: 22, background: 'rgba(150,175,210,.5)', margin: '0 6px', flexShrink: 0 }} />
          <button type="button" onClick={() => setImgMenu(!imgMenu)} aria-expanded={imgMenu} style={{ ...tb(imgMenu), border: imgMenu ? 0 : '1.5px solid rgba(214,226,242,.95)' }}><OIcon name="image" size={15} />Imagem</button>
        </div>
        {imgMenu ? <div style={{ ...soft, background: 'rgba(255,255,255,.95)', padding: 16, boxShadow: '0 18px 36px -20px rgba(23,73,170,.5)' }}><ImagePicker onPick={pick} compact /></div> : null}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', minHeight: 36, padding: '2px 6px' }}>
          {tool === 'pontos' ? <>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Cada toque marca:</span>
            {Object.keys(MAP_PRODS).map((k) => <FilterChip key={k} active={prod === k} onClick={() => { setProd(k); setDose(MAP_PRODS[k].def); }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: MAP_PRODS[k].c }} />{k}</FilterChip>)}
            {pm.u ? <Stepper label={doseLbl(prod, dose)} onDec={() => setDose((d) => Math.max(pm.step, Math.round((d - pm.step) * 100) / 100))} onInc={() => setDose((d) => Math.round((d + pm.step) * 100) / 100)} /> : null}
          </> : null}
          {tool === 'pincel' || tool === 'linha' ? <>
            <span style={{ display: 'inline-flex', gap: 6 }}>{PEN_COLORS.map((c) => <button key={c} type="button" aria-label={'Cor ' + c} onClick={() => setColor(c)} style={{ width: 24, height: 24, borderRadius: '50%', border: 0, cursor: 'pointer', background: c, boxShadow: color === c ? `0 0 0 2px #fff, 0 0 0 4px ${c}` : 'none' }} />)}</span>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Espessura</span>{range(width, setWidth, 2, 24, 1, (v) => v + 'px')}
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Opacidade</span>{range(opacity, setOpacity, 0.2, 1, 0.05, (v) => Math.round(v * 100) + '%')}
          </> : null}
          {tool === 'borracha' ? <><span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Tamanho</span>{range(eraser, setEraser, 8, 60, 1, (v) => v + 'px')}<span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Passe sobre pontos ou traços para apagar.</span></> : null}
          {tool === 'mover' ? <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Arraste um ponto ou traço para mudar de lugar.</span> : null}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: wide ? 'minmax(0,1fr) 300px' : '1fr', gap: 14, alignItems: 'start' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: wide ? 'min(100%, calc((100vh - 290px) * 0.8333))' : '100%', margin: '0 auto' }}>
            <svg ref={svgRef} viewBox={`0 0 ${BW} ${BH}`} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={() => setCursor(null)}
              style={{ width: '100%', display: 'block', borderRadius: 18, border: '1.5px solid rgba(255,255,255,.95)', boxShadow: '0 14px 30px -20px rgba(23,73,170,.5)', touchAction: 'none', cursor: tool === 'borracha' ? 'none' : tool === 'mover' ? 'grab' : 'crosshair', userSelect: 'none' }}>
              <BoardLayers bg={bg} points={points} strokes={strokes} sel={sel} hover={hover} />
              {draft ? <path d={strokeD(draft)} fill="none" stroke={draft.color} strokeWidth={draft.w} strokeOpacity={draft.op} strokeLinecap="round" strokeLinejoin="round" /> : null}
              {tool === 'borracha' && cursor ? <circle cx={cursor[0]} cy={cursor[1]} r={eraser} fill="rgba(229,72,77,.08)" stroke="#E5484D" strokeWidth="1.5" strokeDasharray="4 3" style={{ pointerEvents: 'none' }} /> : null}
              {points.map((p) => <circle key={'h' + p.id} cx={p.x} cy={p.y} r="16" fill="transparent" data-pid={p.id} onMouseEnter={() => setHover(p.id)} onMouseLeave={() => setHover(null)} />)}
            </svg>
            {hover && !selP ? (() => { const p = points.find((x) => x.id === hover); if (!p) return null; return (
              <div style={{ position: 'absolute', left: `${p.x / BW * 100}%`, top: `${p.y / BH * 100}%`, transform: 'translate(-50%, calc(-100% - 22px))', padding: '8px 12px', borderRadius: 12, background: 'var(--surface-inverse, #0E2350)', color: '#fff', fontSize: 12, lineHeight: 1.5, pointerEvents: 'none', maxWidth: 220, whiteSpace: 'normal', boxShadow: '0 10px 20px -10px rgba(0,0,0,.5)' }}>
                <b>{p.prod}{doseLbl(p.prod, p.dose) ? ' · ' + doseLbl(p.prod, p.dose) : ''}</b>{p.com ? <><br />{p.com}</> : <><br /><span style={{ opacity: .7 }}>Toque no ponto para comentar</span></>}
              </div>); })() : null}
            {selP ? (
              <div onPointerDown={(e) => e.stopPropagation()} style={{ position: 'absolute', left: `clamp(8px, calc(${selP.x / BW * 100}% - 140px), calc(100% - 288px))`, top: `calc(${selP.y / BH * 100}% + 22px)`, width: 280, padding: 14, borderRadius: 18, background: '#fff', boxShadow: '0 20px 40px -18px rgba(23,73,170,.55)', display: 'flex', flexDirection: 'column', gap: 10, zIndex: 3 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}>Ponto {points.indexOf(selP) + 1}</span><button type="button" aria-label="Fechar" onClick={() => setSel(null)} style={{ ...ic, width: 28, height: 28 }}><OIcon name="x" size={15} /></button></div>
                <select value={selP.prod} onChange={(e) => updP(selP.id, { prod: e.target.value, dose: MAP_PRODS[e.target.value].def })} style={{ height: 36, borderRadius: 999, border: '1.5px solid rgba(214,226,242,.95)', padding: '0 12px', fontFamily: 'inherit', fontSize: 13 }}>{Object.keys(MAP_PRODS).map((k) => <option key={k}>{k}</option>)}</select>
                {MAP_PRODS[selP.prod].u ? <Stepper label={doseLbl(selP.prod, selP.dose)} onDec={() => updP(selP.id, { dose: Math.max(MAP_PRODS[selP.prod].step, Math.round((selP.dose - MAP_PRODS[selP.prod].step) * 100) / 100) })} onInc={() => updP(selP.id, { dose: Math.round((selP.dose + MAP_PRODS[selP.prod].step) * 100) / 100 })} /> : null}
                <textarea value={selP.com} onChange={(e) => updP(selP.id, { com: e.target.value })} placeholder="Comentário sobre este ponto" rows={2} style={{ borderRadius: 12, border: '1.5px solid rgba(214,226,242,.95)', padding: 10, fontFamily: 'inherit', fontSize: 13, resize: 'vertical', outline: 'none' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><button type="button" onClick={() => { commit(points.filter((p) => p.id !== selP.id), strokes); setSel(null); }} style={{ ...linkBtn, color: '#E5484D' }}><OIcon name="trash-2" size={14} />Excluir</button><OBtn size="sm" onClick={() => setSel(null)}>Pronto</OBtn></div>
              </div>) : null}
            {selS ? (
              <div onPointerDown={(e) => e.stopPropagation()} style={{ position: 'absolute', left: '50%', bottom: 12, transform: 'translateX(-50%)', width: 300, padding: 14, borderRadius: 18, background: '#fff', boxShadow: '0 20px 40px -18px rgba(23,73,170,.55)', display: 'flex', flexDirection: 'column', gap: 10, zIndex: 3 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}><span style={{ width: 22, height: 4, borderRadius: 2, background: selS.color }} />{selS.type === 'pen' ? 'Traço de pincel' : 'Linha'}</span>
                <textarea value={selS.com} onChange={(e) => updS(selS.id, { com: e.target.value })} placeholder="Comentário sobre este traço" rows={2} style={{ borderRadius: 12, border: '1.5px solid rgba(214,226,242,.95)', padding: 10, fontFamily: 'inherit', fontSize: 13, resize: 'vertical', outline: 'none' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><button type="button" onClick={() => { commit(points, strokes.filter((s) => s.id !== selS.id)); setSel(null); }} style={{ ...linkBtn, color: '#E5484D' }}><OIcon name="trash-2" size={14} />Excluir</button><OBtn size="sm" onClick={() => setSel(null)}>Pronto</OBtn></div>
              </div>) : null}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {sideCard('Totalizador', undefined, totals.length ? totals.map((t) => (
              <div key={t.prod} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}><span style={{ width: 9, height: 9, borderRadius: '50%', background: MAP_PRODS[t.prod].c }} /><span style={{ flex: 1, color: 'var(--text-body)' }}>{t.prod}</span><span style={{ color: 'var(--text-muted)' }}>{t.n} {t.n === 1 ? 'ponto' : 'pontos'}</span>{MAP_PRODS[t.prod].u ? <B>{doseLbl(t.prod, t.total)}</B> : null}</div>
            )) : empty('Nenhum produto marcado ainda.'))}
            {sideCard('Pontos e comentários', points.length, points.length ? points.map((p, i) => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }} onMouseEnter={() => setHover(p.id)} onMouseLeave={() => setHover(null)}>
                <button type="button" onClick={() => { setTool('pontos'); setSel({ t: 'p', id: p.id }); }} style={{ width: 24, height: 24, borderRadius: '50%', border: 0, cursor: 'pointer', background: MAP_PRODS[p.prod].c, color: '#fff', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</button>
                <span style={{ fontSize: 12, color: 'var(--text-muted)', width: 64, flexShrink: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{doseLbl(p.prod, p.dose) || 'nota'}</span>
                <input value={p.com} onChange={(e) => updP(p.id, { com: e.target.value })} placeholder="Comentário" style={inl} />
              </div>
            )) : empty('Use "Pontos" e toque na imagem. Passe o mouse sobre o ponto para ver o comentário.'))}
            {sideCard('Traços e comentários', strokes.length, strokes.length ? strokes.map((s) => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button type="button" aria-label="Selecionar traço" onClick={() => { setTool('pontos'); setSel({ t: 's', id: s.id }); }} style={{ width: 24, height: 24, borderRadius: 8, border: '1.5px solid rgba(214,226,242,.95)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><span style={{ width: 14, height: 3, borderRadius: 2, background: s.color }} /></button>
                <span style={{ fontSize: 12, color: 'var(--text-muted)', width: 64, flexShrink: 0 }}>{s.type === 'pen' ? 'Pincel' : 'Linha'}</span>
                <input value={s.com} onChange={(e) => updS(s.id, { com: e.target.value })} placeholder="Comentário" style={inl} />
              </div>
            )) : empty('Use o pincel ou a linha sobre a imagem. Depois escreva o comentário aqui.'))}
          </div>
        </div>
      </>}
    </div>
  );
}

/* ---- Procedimento ---- */
const PROC_DUR = { 'Toxina botulínica': 30, 'Preenchimento labial': 45, 'Bioestimulador': 45, 'Fios de PDO': 60, 'Harmonização facial': 90, 'Limpeza de pele': 60, 'Peeling químico': 40, 'Clareamento dental': 60, 'Limpeza dental': 40, 'Restauração': 50, 'Tratamento de canal': 90, 'Avaliação': 30 };
const MAT_SUG = { 'Toxina botulínica': [['Toxina botulínica 100U', 1]], 'Preenchimento labial': [['Ácido hialurônico 1ml', 1], ['Lidocaína 2% com vaso', 1]], 'Bioestimulador': [['Bioestimulador de colágeno', 1], ['Lidocaína 2% com vaso', 1]], 'Fios de PDO': [['Fio de PDO liso', 1], ['Lidocaína 2% com vaso', 2]], 'Harmonização facial': [['Ácido hialurônico 1ml', 2], ['Toxina botulínica 100U', 1], ['Lidocaína 2% com vaso', 2]], 'Peeling químico': [['Peeling ácido glicólico 70%', 1]], 'Clareamento dental': [['Gel clareador peróxido 35%', 1]], 'Restauração': [['Resina composta A2', 1], ['Lidocaína 2% com vaso', 1]], 'Tratamento de canal': [['Lidocaína 2% com vaso', 2]] };
const STATUS_PROC = { Realizado: '#2DBF6A', Agendado: '#1F5EFF', Cancelado: '#E5484D' };
const unOf = (nome) => { const p = PRODUTOS0.find((x) => x.nome === nome); return p ? p.un : 'Unidade'; };
function ProcWorkspace({ onSave, onBack, wide }) {
  const [proc, setProc] = React.useState(null);
  const [pro, setPro] = React.useState(PROF0[0].nome);
  const [dt, setDt] = React.useState(TODAY_ISO + 'T' + nowHM());
  const [dur, setDur] = React.useState(30);
  const [status, setStatus] = React.useState('Realizado');
  const [mats, setMats] = React.useState([]);
  const [obs, setObs] = React.useState('');
  const choose = (n) => { setProc(n); setDur(PROC_DUR[n] || 30); const pr = PROF0.find((x) => x.procs.includes(n)); if (pr) setPro(pr.nome); setMats((MAT_SUG[n] || []).map(([nome, q]) => ({ nome, q }))); };
  const sec = (t, children) => <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span style={lbl}>{t}</span>{children}</div>;
  const others = PRODUTOS0.filter((p) => !mats.some((m) => m.nome === p.nome));
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <BackLink onClick={onBack} />
      {sec('Procedimento', <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${wide ? 170 : 150}px, 1fr))`, gap: 8 }}>
        {FIN_PROCS.map((x) => { const on = proc === x.n; return (
          <button key={x.n} type="button" onClick={() => choose(x.n)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2, padding: '10px 12px', borderRadius: 14, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', border: on ? '1.5px solid #1F5EFF' : '1.5px solid rgba(255,255,255,.95)', background: on ? 'rgba(31,94,255,.08)' : 'rgba(255,255,255,.6)' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: on ? '#1F5EFF' : 'var(--text-strong)' }}>{x.n}</span><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{PROC_DUR[x.n]} min · {brl0(x.v)}</span>
          </button>); })}
      </div>)}
      {proc ? <>
        {sec('Profissional', <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{PROF0.map((x) => { const on = pro === x.nome; return (
          <button key={x.id} type="button" onClick={() => setPro(x.nome)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 44, padding: '0 14px 0 6px', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, border: on ? '1.5px solid #1F5EFF' : '1.5px solid rgba(214,226,242,.9)', background: on ? 'rgba(31,94,255,.08)' : 'rgba(255,255,255,.7)', color: on ? '#1F5EFF' : 'var(--text-strong)' }}><OAv name={x.nome} size={32} />{x.nome}{x.procs.includes(proc) ? null : <span style={{ fontSize: 11, color: 'var(--text-subtle)' }}>não costuma fazer</span>}</button>); })}</div>)}
        <div style={{ display: 'grid', gridTemplateColumns: wide ? '1fr auto auto' : '1fr', gap: 14, alignItems: 'end' }}>
          <OInput label="Data e hora" type="datetime-local" value={dt} onChange={(e) => setDt(e.target.value)} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}><span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-strong)' }}>Duração</span><Stepper label={dur + ' min'} onDec={() => setDur((d) => Math.max(5, d - 5))} onInc={() => setDur((d) => d + 5)} /></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-strong)' }}>Status</span>
            <div style={{ display: 'flex', gap: 6 }}>{Object.entries(STATUS_PROC).map(([k, c]) => <button key={k} type="button" onClick={() => setStatus(k)} style={{ height: 40, padding: '0 14px', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, border: status === k ? `1.5px solid ${c}` : '1.5px solid rgba(214,226,242,.9)', background: status === k ? `color-mix(in srgb, ${c} 10%, white)` : 'rgba(255,255,255,.7)', color: status === k ? c : 'var(--text-strong)' }}>{k}</button>)}</div></div>
        </div>
        {sec('Materiais utilizados', <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {mats.map((m, i) => (
            <div key={m.nome} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 8px 8px 14px', borderRadius: 16, background: 'rgba(255,255,255,.7)', border: '1.5px solid rgba(255,255,255,.95)', flexWrap: 'wrap' }}>
              <span style={{ flex: 1, minWidth: 140, fontSize: 14, fontWeight: 500, color: 'var(--text-strong)' }}>{m.nome}</span>
              <Stepper label={`${m.q} ${unPl(unOf(m.nome), m.q)}`} onDec={() => setMats(mats.map((x, j) => j === i ? { ...x, q: Math.max(1, x.q - 1) } : x))} onInc={() => setMats(mats.map((x, j) => j === i ? { ...x, q: x.q + 1 } : x))} />
              <button type="button" aria-label={'Remover ' + m.nome} onClick={() => setMats(mats.filter((_, j) => j !== i))} style={{ ...fCircle, width: 34, height: 34 }}><OIcon name="x" size={14} /></button>
            </div>
          ))}
          {others.length ? <PillSelect label="Adicionar material" icon="plus" value="" onChange={(v) => v && setMats([...mats, { nome: v, q: 1 }])} options={[['', mats.length ? 'Adicionar outro material' : 'Adicionar material'], ...others.map((p) => [p.nome, p.nome])]} /> : null}
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Sugerimos os materiais mais usados neste procedimento. Ajuste se precisar.</span>
        </div>)}
        {sec('Observações', <textarea value={obs} onChange={(e) => setObs(e.target.value)} rows={3} placeholder="Como foi o procedimento, reação do paciente, orientações passadas..." style={{ borderRadius: 16, border: '1.5px solid rgba(214,226,242,.95)', background: '#fff', padding: 12, fontFamily: 'inherit', fontSize: 14, outline: 'none', resize: 'vertical' }} />)}
      </> : <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Escolha o procedimento e o restante já vem preenchido.</span>}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}><OBtn variant="secondary" onClick={onBack}>Cancelar</OBtn><OBtn iconLeft="check" disabled={!proc} onClick={() => onSave({ kind: 'proc', title: proc, items: [proc], pro, dt, dur, status, mats, obs })}>Salvar procedimento</OBtn></div>
    </div>
  );
}

/* ---- Documentos ---- */
function DocMedia({ d, fit = 'cover' }) {
  if (d.type === 'compare') return <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', width: '100%', height: '100%', gap: 2, background: '#fff' }}><DocMedia d={d.a} fit={fit} /><DocMedia d={d.b} fit={fit} /></div>;
  if (d.url) return <img src={d.url} alt={d.name} style={{ width: '100%', height: '100%', objectFit: fit, display: 'block', background: '#0E2350' }} />;
  if (d.type === 'pdf') return <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, background: 'linear-gradient(135deg,#EAF1FF,#F6EFFF)', color: '#1F5EFF' }}><OIcon name="file-text" size={30} /><span style={{ fontSize: 11, fontWeight: 600 }}>PDF</span></div>;
  return <FaceArt kind={d.art || 'face'} smooth={d.tone === 'depois'} />;
}
function CompareSlider({ a, b, height = 420, big }) {
  const [pos, setPos] = React.useState(50);
  return (
    <div style={{ position: 'relative', width: '100%', height, borderRadius: big ? 22 : 18, overflow: 'hidden', background: '#0E2350', userSelect: 'none' }}>
      <div style={{ position: 'absolute', inset: 0 }}><DocMedia d={b} fit="contain" /></div>
      <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - pos}% 0 0)` }}><DocMedia d={a} fit="contain" /></div>
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: pos + '%', width: 3, marginLeft: -1.5, background: '#fff', boxShadow: '0 0 12px rgba(0,0,0,.35)', pointerEvents: 'none' }}>
        <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 44, height: 44, borderRadius: '50%', background: '#fff', color: '#1F5EFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 16px rgba(0,0,0,.3)' }}><OIcon name="chevrons-left-right" size={20} /></span>
      </div>
      <span style={{ position: 'absolute', left: 14, top: 14, padding: '6px 14px', borderRadius: 999, background: 'rgba(14,35,80,.7)', color: '#fff', fontSize: 13, fontWeight: 600 }}>Antes</span>
      <span style={{ position: 'absolute', right: 14, top: 14, padding: '6px 14px', borderRadius: 999, background: 'linear-gradient(90deg,#0B4BEB,#1FA8F5)', color: '#fff', fontSize: 13, fontWeight: 600 }}>Depois</span>
      <input type="range" min="0" max="100" value={pos} onChange={(e) => setPos(+e.target.value)} aria-label="Comparar antes e depois" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'ew-resize', margin: 0 }} />
    </div>
  );
}
function AntesDepois({ docs, onClose, onSave }) {
  const imgs = docs.filter((d) => d.type !== 'pdf' && d.type !== 'compare');
  const [a, setA] = React.useState(imgs.find((d) => d.folder === 'Antes') || null);
  const [b, setB] = React.useState(imgs.find((d) => d.folder === 'Depois') || null);
  const [show, setShow] = React.useState(false);
  const refA = React.useRef(null), refB = React.useRef(null);
  const up = async (e, set, folder) => { const f = e.target.files && e.target.files[0]; if (f) set({ id: 'u' + Date.now(), name: f.name, url: await readFile(f), folder, date: HOJE, type: 'img', fresh: true }); e.target.value = ''; };
  const slot = (t, v, set, ref, folder) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
      <span style={lbl}>{t}</span>
      <div style={{ height: 150, borderRadius: 16, overflow: 'hidden', border: '1.5px solid rgba(214,226,242,.95)', background: '#F4F7FC' }}>{v ? <DocMedia d={v} fit="cover" /> : <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: 'var(--text-muted)' }}>Escolha uma foto</div>}</div>
      <div style={{ display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'thin', paddingBottom: 4 }}>
        {imgs.map((d) => <button key={d.id} type="button" title={d.name} onClick={() => set(d)} style={{ width: 48, height: 48, flexShrink: 0, padding: 0, borderRadius: 10, overflow: 'hidden', cursor: 'pointer', border: v && v.id === d.id ? '2px solid #1F5EFF' : '1.5px solid rgba(214,226,242,.95)' }}><DocMedia d={d} /></button>)}
        <button type="button" onClick={() => ref.current && ref.current.click()} style={{ width: 48, height: 48, flexShrink: 0, borderRadius: 10, cursor: 'pointer', border: '1.5px dashed rgba(31,94,255,.45)', background: 'rgba(31,94,255,.04)', color: '#1F5EFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-label={'Subir foto ' + t}><OIcon name="upload" size={16} /></button>
        <input ref={ref} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => up(e, set, folder)} />
      </div>
    </div>
  );
  if (show && a && b) return (
    <Overlay><div style={{ position: 'fixed', inset: 0, zIndex: 400, background: 'rgba(8,20,48,.94)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 20 }}>
      <div style={{ width: 'min(1100px, 100%)' }}><CompareSlider a={a} b={b} height="min(78vh, 760px)" big /></div>
      <div style={{ display: 'flex', gap: 10 }}><span style={{ color: 'rgba(255,255,255,.75)', fontSize: 14, alignSelf: 'center' }}>Arraste para comparar</span><OBtn variant="secondary" onClick={() => setShow(false)}>Sair da apresentação</OBtn></div>
    </div></Overlay>
  );
  return (
    <Overlay><div style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(14,35,80,.35)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(860px, 100%)', maxHeight: '92vh', overflowY: 'auto', borderRadius: 28, background: 'linear-gradient(180deg,#F5F9FF,#EAF2FD)', boxShadow: '0 30px 60px -30px rgba(23,73,170,.6)', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><p style={{ margin: 0, fontSize: 20, fontWeight: 600, color: 'var(--text-strong)' }}>Criar antes e depois</p><p style={{ margin: '2px 0 0', fontSize: 13, color: 'var(--text-muted)' }}>Escolha as duas fotos e mostre na hora para o paciente.</p></div><button type="button" aria-label="Fechar" onClick={onClose} style={fCircle}><OIcon name="x" size={18} /></button></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 16 }}>{slot('Antes', a, setA, refA, 'Antes')}{slot('Depois', b, setB, refB, 'Depois')}</div>
        {a && b ? <CompareSlider a={a} b={b} height={360} /> : null}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, flexWrap: 'wrap' }}>
          <OBtn variant="secondary" iconLeft="presentation" disabled={!a || !b} onClick={() => setShow(true)}>Apresentar para o paciente</OBtn>
          <OBtn iconLeft="check" disabled={!a || !b} onClick={() => onSave(a, b)}>Salvar no prontuário</OBtn>
        </div>
      </div>
    </div></Overlay>
  );
}
function DocsWorkspace({ p, docs, setDocs, folders, setFolders, onUploaded, onSendLink, onBack, wide }) {
  const [folder, setFolder] = React.useState('Todos');
  const [view, setView] = React.useState(null);
  const [qr, setQr] = React.useState(false);
  const [ab, setAb] = React.useState(false);
  const [nf, setNf] = React.useState(null);
  const [qrFolder, setQrFolder] = React.useState(folders[0]);
  const [over, setOver] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const upRef = React.useRef(null);
  const list = docs.filter((d) => folder === 'Todos' || d.folder === folder);
  const target = folder === 'Todos' ? 'Documentação Clínica' : folder;
  const addFiles = (fs) => { const arr = Array.from(fs || []); if (!arr.length) return; const nd = arr.map((f, i) => ({ id: 'u' + Date.now() + i, name: f.name, folder: target, date: HOJE, type: /pdf$/i.test(f.type) || /\.pdf$/i.test(f.name) ? 'pdf' : 'img', url: f.type.startsWith('image/') ? URL.createObjectURL(f) : null })); setDocs((d) => [...nd, ...d]); onUploaded(nd, target); };
  const cnt = (f) => f === 'Todos' ? docs.length : docs.filter((d) => d.folder === f).length;
  const link = `salute.app/u/${onlyDigits(p.cpf).slice(0, 3)}${slug(qrFolder || '')}`;
  const cur = view !== null ? list[view] : null;
  const fBtn = (f) => { const on = folder === f; return <button key={f} type="button" onClick={() => setFolder(f)} style={{ display: 'flex', alignItems: 'center', gap: 10, width: wide ? '100%' : 'auto', flexShrink: 0, height: 42, padding: '0 14px', borderRadius: 14, border: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: on ? 600 : 500, textAlign: 'left', background: on ? 'rgba(31,94,255,.1)' : wide ? 'transparent' : 'rgba(255,255,255,.6)', color: on ? '#1F5EFF' : 'var(--text-strong)', whiteSpace: 'nowrap' }}><OIcon name={f === 'Todos' ? 'folders' : 'folder'} size={16} /><span style={{ flex: 1 }}>{f}</span><span style={{ fontSize: 12, color: on ? '#1F5EFF' : 'var(--text-muted)' }}>{cnt(f)}</span></button>; };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <BackLink onClick={onBack} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-strong)' }}>Documentos ({docs.length})</span>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <OBtn size="sm" variant="secondary" iconLeft="qr-code" onClick={() => { setQrFolder(folder === 'Todos' ? folders[0] : folder); setCopied(false); setQr(true); }}>QR Code</OBtn>
          <OBtn size="sm" variant="secondary" iconLeft="columns-2" onClick={() => setAb(true)}>Antes e depois</OBtn>
          <OBtn size="sm" iconLeft="upload" onClick={() => upRef.current && upRef.current.click()}>Upload</OBtn>
          <input ref={upRef} type="file" multiple accept="image/*,.pdf" style={{ display: 'none' }} onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: wide ? '230px minmax(0,1fr)' : '1fr', gap: 14, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: wide ? 'column' : 'row', gap: 4, overflowX: wide ? 'visible' : 'auto', scrollbarWidth: 'none', ...(wide ? { ...soft, padding: 8 } : {}) }}>
          {['Todos', ...folders].map(fBtn)}
          {nf !== null ? <span style={{ display: 'flex', gap: 6, padding: 4, flexShrink: 0 }}><input autoFocus value={nf} onChange={(e) => setNf(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && nf.trim()) { setFolders([...folders, nf.trim()]); setFolder(nf.trim()); setNf(null); } if (e.key === 'Escape') { e.stopPropagation(); setNf(null); } }} placeholder="Nome da pasta" style={{ flex: 1, minWidth: 120, height: 34, borderRadius: 999, border: '1.5px solid rgba(31,94,255,.35)', padding: '0 12px', fontFamily: 'inherit', fontSize: 13, outline: 'none' }} /></span>
            : <button type="button" onClick={() => setNf('')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flexShrink: 0, height: 40, padding: '0 14px', borderRadius: 14, border: '1.5px dashed rgba(31,94,255,.4)', background: 'rgba(31,94,255,.04)', color: '#1F5EFF', fontFamily: 'inherit', fontSize: 13, fontWeight: 500, cursor: 'pointer', marginTop: wide ? 6 : 0 }}><OIcon name="folder-plus" size={15} />Nova pasta</button>}
        </div>
        <div onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)} onDrop={(e) => { e.preventDefault(); setOver(false); addFiles(e.dataTransfer.files); }}
          style={{ ...soft, padding: 14, minHeight: 240, border: over ? '2px dashed #1F5EFF' : soft.border, background: over ? 'rgba(31,94,255,.06)' : soft.background }}>
          {list.length ? <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${wide ? 150 : 130}px, 1fr))`, gap: 12 }}>
            {list.map((d, i) => (
              <button key={d.id} type="button" onClick={() => setView(i)} style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: 6, borderRadius: 16, border: '1.5px solid rgba(255,255,255,.95)', background: 'rgba(255,255,255,.8)', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                <span style={{ display: 'block', width: '100%', aspectRatio: '1', borderRadius: 12, overflow: 'hidden', background: '#F4F7FC' }}><DocMedia d={d} /></span>
                <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-strong)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', padding: '0 4px' }}>{d.name}</span>
                <span style={{ fontSize: 11, color: 'var(--text-muted)', padding: '0 4px 4px' }}>{d.folder} · {d.date}</span>
              </button>
            ))}
          </div> : <div style={{ height: 210, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 14, textAlign: 'center' }}><OIcon name="file-image" size={28} />Nenhum documento nesta pasta.<span style={{ fontSize: 12 }}>Arraste arquivos para cá, use Upload ou o QR Code.</span></div>}
        </div>
      </div>
      {cur ? <Overlay><div style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(8,20,48,.92)', display: 'flex', flexDirection: 'column', padding: 20, gap: 14 }} onClick={() => setView(null)}>
        <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#fff', flexWrap: 'wrap' }}>
          <span style={{ flex: 1, minWidth: 160 }}><b style={{ fontSize: 16 }}>{cur.name}</b><br /><span style={{ fontSize: 12, opacity: .7 }}>{cur.date}</span></span>
          <span style={{ fontSize: 13, opacity: .8 }}>Pasta</span>
          <select value={cur.folder} onChange={(e) => setDocs((ds) => ds.map((x) => x.id === cur.id ? { ...x, folder: e.target.value } : x))} style={{ height: 36, borderRadius: 999, border: 0, padding: '0 12px', fontFamily: 'inherit', fontSize: 13 }}>{folders.map((f) => <option key={f}>{f}</option>)}</select>
          <button type="button" onClick={() => { setDocs((ds) => ds.filter((x) => x.id !== cur.id)); setView(null); }} style={{ ...linkBtn, color: '#FF8A8E' }}><OIcon name="trash-2" size={15} />Excluir</button>
          <button type="button" aria-label="Fechar" onClick={() => setView(null)} style={{ ...fCircle, background: 'rgba(255,255,255,.15)', color: '#fff', border: 0 }}><OIcon name="x" size={18} /></button>
        </div>
        <div onClick={(e) => e.stopPropagation()} style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', gap: 12 }}>
          <button type="button" aria-label="Anterior" onClick={() => setView((view - 1 + list.length) % list.length)} style={{ ...fCircle, background: 'rgba(255,255,255,.15)', color: '#fff', border: 0, flexShrink: 0 }}><OIcon name="chevron-left" size={20} /></button>
          <div style={{ flex: 1, height: '100%', borderRadius: 18, overflow: 'hidden' }}>{cur.type === 'compare' ? <CompareSlider a={cur.a} b={cur.b} height="100%" big /> : <DocMedia d={cur} fit="contain" />}</div>
          <button type="button" aria-label="Próximo" onClick={() => setView((view + 1) % list.length)} style={{ ...fCircle, background: 'rgba(255,255,255,.15)', color: '#fff', border: 0, flexShrink: 0 }}><OIcon name="chevron-right" size={20} /></button>
        </div>
      </div></Overlay> : null}
      {qr ? <Overlay><div style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(14,35,80,.35)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={() => setQr(false)}>
        <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(560px, 100%)', borderRadius: 28, background: 'linear-gradient(180deg,#F5F9FF,#EAF2FD)', boxShadow: '0 30px 60px -30px rgba(23,73,170,.6)', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><div><p style={{ margin: 0, fontSize: 20, fontWeight: 600, color: 'var(--text-strong)' }}>Receber pelo celular</p><p style={{ margin: '2px 0 0', fontSize: 13, color: 'var(--text-muted)' }}>Fotos e documentos entram direto no prontuário.</p></div><button type="button" aria-label="Fechar" onClick={() => setQr(false)} style={fCircle}><OIcon name="x" size={18} /></button></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><span style={lbl}>Enviar para a pasta</span><div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{folders.map((f) => <FilterChip key={f} active={qrFolder === f} onClick={() => setQrFolder(f)}>{f}</FilterChip>)}</div></div>
          <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ padding: 10, borderRadius: 18, background: '#fff', boxShadow: '0 10px 24px -14px rgba(23,73,170,.5)' }}><FakeQR seed={p.cpf + qrFolder} size={168} /></div>
            <ol style={{ flex: 1, minWidth: 200, margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: 'var(--text-body)' }}>
              <li>Aponte a câmera do celular para o QR Code.</li><li>Tire as fotos ou escolha da galeria.</li><li>Elas aparecem aqui na pasta <B>{qrFolder}</B>.</li>
            </ol>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#2DBF6A', boxShadow: '0 0 0 4px rgba(45,191,106,.2)' }} />Aguardando arquivos. O link vale por 24 horas.</div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, flexWrap: 'wrap' }}>
            <OBtn variant="secondary" iconLeft={copied ? 'check' : 'copy'} onClick={() => { try { navigator.clipboard && navigator.clipboard.writeText('https://' + link); } catch (e) {} setCopied(true); }}>{copied ? 'Copiado' : 'Copiar link'}</OBtn>
            <OBtn iconLeft="send" onClick={() => { onSendLink(link, qrFolder); setQr(false); }}>Enviar link no WhatsApp</OBtn>
          </div>
        </div>
      </div></Overlay> : null}
      {ab ? <AntesDepois docs={docs} onClose={() => setAb(false)} onSave={(a, b) => {
        const fresh = [a, b].filter((x) => x.fresh).map((x) => ({ ...x, fresh: false }));
        const cmp = { id: 'c' + Date.now(), name: 'Antes e depois ' + HOJE.slice(0, 5), folder: 'Antes e Depois', date: HOJE, type: 'compare', a, b };
        if (!folders.includes('Antes e Depois')) setFolders([...folders, 'Antes e Depois']);
        setDocs((d) => [cmp, ...fresh, ...d]); onUploaded([cmp], 'Antes e Depois'); setAb(false); setFolder('Antes e Depois');
      }} /> : null}
    </div>
  );
}

/* ---- Registros ---- */
function RecordCard({ r, onOpen }) {
  const k = KINDS[r.kind];
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ ...soft, padding: 14, display: 'flex', gap: 12 }}>
      <span style={{ width: 36, height: 36, borderRadius: 12, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `color-mix(in srgb, ${k.c} 12%, white)`, color: k.c }}><OIcon name={k.icon} size={17} /></span>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'baseline' }}><span style={{ fontSize: 12, fontWeight: 600, color: k.c }}>{k.label}</span><span style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{r.date}</span></div>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}>{r.title}</p>
        {r.kind === 'anamnese' ? <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <Badge2 c={r.status === 'respondida' ? '#2DBF6A' : '#F5B400'}>{r.status === 'respondida' ? 'Respondida' : 'Aguardando resposta'}</Badge2>
            <button type="button" style={linkBtn} onClick={() => { try { navigator.clipboard && navigator.clipboard.writeText('https://' + r.link); } catch (e) {} }}><OIcon name="copy" size={13} />Copiar link</button>
            {r.answers ? <button type="button" style={linkBtn} onClick={() => setOpen(!open)}><OIcon name={open ? 'chevron-up' : 'eye'} size={13} />{open ? 'Esconder respostas' : 'Ver respostas'}</button> : null}
          </div>
          {open && r.answers ? <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: 12, borderRadius: 14, background: 'rgba(255,255,255,.75)' }}>{r.answers.map(([q, a], i) => <div key={i}><p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)' }}>{q}</p><p style={{ margin: '2px 0 0', fontSize: 14, fontWeight: 500, color: 'var(--text-strong)' }}>{a}</p></div>)}</div> : null}
        </> : null}
        {r.kind === 'mapa' ? <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button type="button" onClick={() => onOpen(r)} style={{ padding: 0, border: 0, background: 'none', cursor: 'pointer' }} aria-label="Abrir mapeamento"><MapThumb r={r} h={104} /></button>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, color: 'var(--text-muted)' }}>
            <span>{modelLabel(r.bg)} · {r.points.length} pontos{r.strokes.length ? ` · ${r.strokes.length} traços` : ''}</span>
            {mapTotals(r.points).filter((t) => MAP_PRODS[t.prod].u).map((t) => <span key={t.prod}>{t.prod}: <B>{doseLbl(t.prod, t.total)}</B></span>)}
            <button type="button" style={linkBtn} onClick={() => onOpen(r)}><OIcon name="pencil" size={13} />Abrir e editar</button>
          </div>
        </div> : null}
        {r.kind === 'proc' ? <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', fontSize: 13, color: 'var(--text-muted)' }}><Badge2 c={STATUS_PROC[r.status] || '#2DBF6A'}>{r.status || 'Realizado'}</Badge2><span>{r.pro || 'Dra. Camila Rocha'}</span>{r.dt ? <span>· {dBR(r.dt.slice(0, 10)).slice(0, 5)} às {r.dt.slice(11, 16)}</span> : null}{r.dur ? <span>· {r.dur} min</span> : null}</div>
          {r.mats && r.mats.length ? <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{r.mats.map((m) => <span key={m.nome} style={{ fontSize: 12, padding: '3px 10px', borderRadius: 999, background: 'rgba(34,195,242,.1)', color: '#0B7FB3' }}>{m.q} {unPl(unOf(m.nome), m.q)} · {m.nome}</span>)}</div> : null}
          {r.obs ? <p style={{ margin: 0, fontSize: 13, color: 'var(--text-body)', lineHeight: 1.5 }}>{r.obs}</p> : null}
        </div> : null}
        {r.kind === 'doc' ? <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          {r.files.slice(0, 5).map((f, i) => <span key={i} title={f.name} style={{ width: 56, height: 56, borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(214,226,242,.9)', flexShrink: 0 }}><DocMedia d={f} /></span>)}
          {r.files.length > 5 ? <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>+{r.files.length - 5}</span> : null}
          <button type="button" style={linkBtn} onClick={() => onOpen(r)}><OIcon name="folder-open" size={13} />Ver documentos</button>
        </div> : null}
      </div>
    </div>
  );
}

function ProntuarioTab({ p, recs, setRecs, docs, setDocs, folders, setFolders, onEvent, mobile, wide, setWork }) {
  const [view, setView] = React.useState({ v: 'list' });
  const [fk, setFk] = React.useState('all');
  const go = (v) => { setView(v); setWork(v.v); };
  const back = () => go({ v: 'list' });
  const addRec = (r) => { const id = Date.now(); setRecs((a) => [{ ...r, id, date: HOJE }, ...a]); return id; };
  const pend = recs.filter((r) => r.kind === 'anamnese' && r.status === 'pendente').length;
  const list = recs.filter((r) => fk === 'all' || r.kind === fk);
  const cnt = (k) => recs.filter((r) => r.kind === k).length;
  if (view.v === 'anamnese') return <AnamneseWorkspace p={p} wide={wide} onBack={back} onSend={(m, link) => {
    addRec({ kind: 'anamnese', title: m.nome, status: 'pendente', link });
    onEvent({ hist: { t: 'Anamnese enviada: ' + m.nome, c: KINDS.anamnese.c }, msg: `Olá, ${p.nome.split(' ')[0]}! Para deixarmos tudo pronto para o seu atendimento, responda a ${m.nome.toLowerCase()} neste link: https://${link}`, toast: 'Anamnese enviada no WhatsApp de ' + p.nome.split(' ')[0] });
    back();
  }} />;
  if (view.v === 'mapa') return <MapEditor initial={view.rec} wide={wide} onBack={back} onSave={(r) => {
    if (r.id) { setRecs((a) => a.map((x) => x.id === r.id ? { ...x, ...r } : x)); return r.id; }
    const id = addRec(r); onEvent({ hist: { t: 'Mapeamento registrado: ' + r.title, c: KINDS.mapa.c }, toast: 'Mapeamento salvo no prontuário' }); return id;
  }} />;
  if (view.v === 'proc') return <ProcWorkspace wide={wide} onBack={back} onSave={(r) => { addRec(r); onEvent({ hist: { t: 'Procedimento: ' + r.title, s: r.pro, c: KINDS.proc.c }, toast: 'Procedimento registrado' }); back(); }} />;
  if (view.v === 'docs') return <DocsWorkspace p={p} docs={docs} setDocs={setDocs} folders={folders} setFolders={setFolders} wide={wide} onBack={back}
    onUploaded={(files, folder) => { addRec({ kind: 'doc', title: files[0].type === 'compare' ? 'Antes e depois criado' : `${files.length} ${files.length === 1 ? 'arquivo' : 'arquivos'} em ${folder}`, files }); onEvent({ hist: { t: files[0].type === 'compare' ? 'Antes e depois criado' : 'Documentos recebidos', c: KINDS.doc.c }, toast: files[0].type === 'compare' ? 'Antes e depois salvo' : 'Arquivos enviados para ' + folder }); }}
    onSendLink={(link, folder) => onEvent({ msg: `Oi, ${p.nome.split(' ')[0]}! Envie suas fotos por este link, elas vão direto para o seu prontuário: https://${link}`, toast: 'Link de envio mandado no WhatsApp', hist: { t: 'Link para envio de documentos enviado (' + folder + ')', c: KINDS.doc.c } })} />;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'repeat(2, minmax(0,1fr))' : 'repeat(4, minmax(0,1fr))', gap: 10 }}>
        {[['anamnese', 'Enviar anamnese', 'clipboard-list'], ['mapa', 'Mapeamento e marcação', 'scan-face'], ['proc', 'Registrar procedimento', 'syringe'], ['docs', 'Documentos', 'qr-code']].map(([k, l, i]) => { const K = KINDS[k === 'docs' ? 'doc' : k]; return (
          <button key={k} type="button" onClick={() => go({ v: k })} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10, padding: 14, borderRadius: 18, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', border: '1.5px solid rgba(255,255,255,.95)', background: 'rgba(255,255,255,.6)', boxShadow: '0 6px 16px -12px rgba(23,73,170,.4)' }}>
            <span style={{ width: 34, height: 34, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `color-mix(in srgb, ${K.c} 12%, white)`, color: K.c }}><OIcon name={i} size={17} /></span>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-strong)', lineHeight: 1.25 }}>{l}</span>
            {k === 'docs' ? <span style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: -6 }}>{docs.length} arquivos</span> : null}
          </button>); })}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
        <div><span style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-strong)' }}>Registros</span>{pend ? <span style={{ fontSize: 12, color: '#B98400', marginLeft: 10 }}>{pend} anamnese aguardando resposta</span> : null}</div>
        <PillSelect label="Filtrar registros" value={fk} onChange={setFk} options={[['all', `Todos os registros (${recs.length})`], ['anamnese', `Anamneses (${cnt('anamnese')})`], ['mapa', `Mapeamentos (${cnt('mapa')})`], ['proc', `Procedimentos (${cnt('proc')})`], ['doc', `Documentos (${cnt('doc')})`]]} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {list.map((r) => <RecordCard key={r.id} r={r} onOpen={(rec) => go(rec.kind === 'mapa' ? { v: 'mapa', rec } : { v: 'docs' })} />)}
        {!list.length ? <span style={{ fontSize: 14, color: 'var(--text-muted)', padding: 20, textAlign: 'center' }}>Nenhum registro deste tipo ainda.</span> : null}
      </div>
    </div>
  );
}

/* ---------- Painel do paciente ---------- */
function seedDocs() {
  return [
    { id: 'd1', name: 'Frente.jpg', folder: 'Antes', date: '15/09/2026', art: 'face', tone: 'antes', type: 'img' },
    { id: 'd2', name: 'Sorriso.jpg', folder: 'Antes', date: '15/09/2026', art: 'sorriso', type: 'img' },
    { id: 'd3', name: 'Corpo frente.jpg', folder: 'Antes', date: '15/09/2026', art: 'corpo', type: 'img' },
    { id: 'd4', name: 'Frente 15 dias.jpg', folder: 'Depois', date: '02/10/2026', art: 'face', tone: 'depois', type: 'img' },
    { id: 'd5', name: 'Termo de consentimento.pdf', folder: 'Documentação Clínica', date: '15/09/2026', type: 'pdf' },
  ];
}
function seedRecs(p) {
  const base = onlyDigits(p.cpf).slice(0, 3), d = seedDocs();
  return [
    { id: 1, kind: 'anamnese', date: HOJE, title: 'Anamnese de retorno', status: 'pendente', link: `salute.app/a/retorno/${base}` },
    { id: 6, kind: 'doc', date: HOJE, title: '1 arquivo em Depois', files: [d[3]] },
    { id: 2, kind: 'proc', date: '18/09/2026', title: 'Toxina botulínica', items: ['Toxina botulínica'], pro: 'Dra. Camila Rocha', dt: '2026-09-18T10:00', dur: 30, status: 'Realizado', mats: [{ nome: 'Toxina botulínica 100U', q: 1 }], obs: 'Aplicação em glabela, frontal e região periorbital. Paciente tolerou bem. Retorno em 15 dias.' },
    { id: 3, kind: 'mapa', date: '18/09/2026', title: 'Toxina terço superior', bg: 'face', strokes: [], points: [[38, 22, 4], [50, 20, 4], [62, 22, 4], [45, 31, 2], [55, 31, 2], [27, 42, 4], [73, 42, 4]].map(([x, y, q], i) => ({ id: 'sp' + i, x: x * 6, y: y * 7.2, prod: 'Toxina botulínica', dose: q, com: i === 5 ? 'Pés de galinha lado direito' : '' })) },
    { id: 4, kind: 'doc', date: '15/09/2026', title: '3 fotos de antes', files: [d[0], d[1], d[2]] },
    { id: 5, kind: 'anamnese', date: '15/09/2026', title: 'Anamnese facial', status: 'respondida', link: `salute.app/a/anamnesefacial/${base}`, answers: [['Possui alergia a algum medicamento ou cosmético?', 'Não'], ['Está grávida ou amamentando?', 'Não'], ['Faz uso de ácidos ou retinoides?', 'Sim, ácido retinoico à noite'], ['Qual o principal incômodo no rosto?', 'Rugas na testa e pés de galinha']] },
  ];
}

function PacienteFicha({ p, onClose, onUpdate, mobile, initialTab, conversa, chatKey, contactName }) {
  const ck = chatKey || ('pac:' + p.cpf);
  const chatSeed = () => (conversa && conversa.length ? conversa : seedMsgs(p)).map((x) => ({ me: x.d === 'out', t: x.t, text: x.text, s: x.s, ia: x.ia }));
  const [tab, setTab] = React.useState(initialTab || 'dados');
  const [expanded, setExpanded] = React.useState(false);
  const auto = React.useRef(false);
  const [recs, setRecs] = React.useState(() => seedRecs(p));
  const [docs, setDocs] = React.useState(seedDocs);
  const [folders, setFolders] = React.useState(['Antes', 'Depois', 'Documentação Clínica']);
  const [msgs, setMsgs] = React.useState(() => conversa && conversa.length ? conversa : seedMsgs(p));
  const [toast, setToast] = React.useState(null);
  const [hist, setHist] = React.useState(() => [
    { t: 'Retorno agendado pela Renata IA', d: '02/10/2026', s: 'Terça 07/10 às 10h', c: '#7B4BC4' },
    { t: 'Procedimento: Toxina botulínica', d: '18/09/2026', s: 'Dra. Camila Rocha', c: '#22C3F2' },
    { t: 'Primeira consulta (Avaliação)', d: '15/09/2026', s: 'Dra. Camila Rocha', c: '#1F5EFF' },
    { t: 'Cadastro criado pela Renata IA via WhatsApp', d: '10/09/2026', c: '#2DBF6A' },
  ]);
  const [troca, setTroca] = React.useState(false);
  const [num, setNum] = React.useState(p.tel);
  const wide = !mobile && expanded;
  React.useEffect(() => { const k = (e) => { if (e.key === 'Escape' && !document.querySelector('[data-overlay="1"]')) onClose(); }; window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, [onClose]);
  const setWork = (v) => { if ((v === 'mapa' || v === 'docs') && !expanded) { auto.current = true; setExpanded(true); } else if (v === 'list' && auto.current) { auto.current = false; setExpanded(false); } };
  const onEvent = ({ hist: h, msg, toast: t }) => {
    if (h) setHist((x) => [{ d: HOJE, ...h }, ...x]);
    if (msg) { chatGet(ck, chatSeed); chatSet(ck, (l) => [...l, { id: waUid(), me: true, t: nowHM(), text: msg, s: 'sent' }]); }
    if (t) { setToast(t); setTimeout(() => setToast(null), 3200); }
  };
  const saveNum = () => {
    const n = num.trim(); if (!n || n === p.tel) { setTroca(false); return; }
    setHist((h) => [{ t: 'WhatsApp alterado', d: HOJE, s: `${p.tel} para ${n}`, c: '#F2694A' }, ...h]);
    onUpdate({ ...p, tel: n, telAnt: [...(p.telAnt || []), p.tel] }); setTroca(false);
  };
  const saveDados = (d) => { setHist((h) => [{ t: 'Dados do paciente editados', d: HOJE, s: 'Dra. Camila Rocha', c: '#1F5EFF' }, ...h]); onUpdate(d); };
  return ReactDOM.createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', justifyContent: 'flex-end', fontFamily: 'var(--font-sans)' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(14,35,80,.28)', backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)' }} />
      <aside role="dialog" aria-label={'Paciente ' + p.nome} style={{ position: 'relative', margin: mobile ? 0 : 16, width: mobile ? '100%' : expanded ? 'calc(100vw - 32px)' : 'min(720px, calc(100vw - 32px))', transition: 'width .28s cubic-bezier(.2,.8,.2,1)', height: mobile ? '100%' : 'calc(100% - 32px)', borderRadius: mobile ? 0 : 28, overflow: 'hidden', display: 'flex', flexDirection: 'column',
        background: 'linear-gradient(180deg, #F3F8FF 0%, #E9F1FC 100%)', border: mobile ? 0 : '2px solid rgba(255,255,255,.95)', boxShadow: '0 30px 60px -30px rgba(23,73,170,.55)' }}>
        <div style={{ padding: mobile ? '16px 16px 12px' : '22px 24px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <OAv name={p.nome} size={mobile ? 48 : 56} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}><h2 style={{ margin: 0, fontSize: mobile ? 19 : 22, fontWeight: 600, color: 'var(--text-strong)', letterSpacing: '-0.01em' }}>{p.nome}</h2><TipoBadge t={p.tipo} /></div>
              <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>CPF {p.cpf} · {p.conv || 'Sem convênio'}</p>
            </div>
            {mobile ? null : <button type="button" aria-label={expanded ? 'Recolher painel' : 'Expandir painel'} title={expanded ? 'Recolher' : 'Expandir'} onClick={() => { auto.current = false; setExpanded(!expanded); }} style={{ ...fCircle, flexShrink: 0 }}><OIcon name={expanded ? 'minimize-2' : 'maximize-2'} size={17} /></button>}
            <button type="button" aria-label="Fechar" onClick={onClose} style={{ ...fCircle, flexShrink: 0 }}><OIcon name="x" size={18} /></button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 8px 8px 14px', borderRadius: 999, background: 'rgba(255,255,255,.7)', border: '1.5px solid rgba(255,255,255,.95)' }}>
            <span style={{ width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(45,191,106,.12)', color: '#2DBF6A', flexShrink: 0 }}><OIcon name="message-circle" size={15} /></span>
            {troca ? <>
              <input autoFocus value={num} onChange={(e) => setNum(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') saveNum(); if (e.key === 'Escape') { e.stopPropagation(); setTroca(false); setNum(p.tel); } }} placeholder="(19) 99999-9999" inputMode="tel"
                style={{ flex: 1, minWidth: 0, height: 32, border: '1.5px solid rgba(31,94,255,.35)', borderRadius: 999, padding: '0 12px', fontFamily: 'inherit', fontSize: 14, color: 'var(--text-strong)', outline: 'none', background: '#fff' }} />
              <OBtn size="sm" variant="secondary" onClick={() => { setTroca(false); setNum(p.tel); }}>Cancelar</OBtn><OBtn size="sm" onClick={saveNum}>Salvar</OBtn>
            </> : <>
              <span style={{ flex: 1, minWidth: 0 }}><span style={{ display: 'block', fontSize: 11, color: 'var(--text-muted)' }}>WhatsApp</span><span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-strong)', fontVariantNumeric: 'tabular-nums' }}>{p.tel}</span></span>
              <OBtn size="sm" variant="secondary" iconLeft="refresh-cw" onClick={() => { setNum(p.tel); setTroca(true); }}>Trocar número</OBtn>
            </>}
          </div>
          {p.telAnt && p.telAnt.length ? <p style={{ margin: '-6px 0 0 14px', fontSize: 12, color: 'var(--text-muted)' }}>Números anteriores: {p.telAnt.join(', ')}. Conversas e prontuário continuam neste cadastro.</p> : null}
          <div style={{ maxWidth: wide ? 640 : 'none' }}><Seg items={[['conversa', 'Conversa'], ['dados', mobile ? 'Dados' : 'Dados e Histórico'], ['pront', 'Prontuário']]} value={tab} onChange={setTab} /></div>
        </div>
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: mobile ? '4px 16px 24px' : '4px 24px 24px', display: 'flex', flexDirection: 'column', scrollbarWidth: 'thin', scrollbarColor: 'rgba(150,175,210,.5) transparent' }}>
          {tab === 'conversa' ? <WaChat chatKey={ck} seed={chatSeed} contactName={contactName || p.nome} mobile={mobile} height="auto" style={{ flex: 1, minHeight: mobile ? 420 : 460, borderRadius: 18, overflow: 'hidden', boxShadow: '0 18px 40px -26px rgba(11,20,26,.8)' }} notice={'Conversa pelo WhatsApp ' + p.tel + ', atendida pela Renata IA e pela equipe.'} /> : null}
          {tab === 'dados' ? <DadosTab p={p} onSave={saveDados} hist={hist} onEvent={onEvent} /> : null}
          {tab === 'pront' ? <ProntuarioTab p={p} recs={recs} setRecs={setRecs} docs={docs} setDocs={setDocs} folders={folders} setFolders={setFolders} onEvent={onEvent} mobile={mobile} wide={wide} setWork={setWork} /> : null}
        </div>
        {toast ? <div style={{ position: 'absolute', left: '50%', bottom: 22, transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 8, padding: '12px 18px', borderRadius: 999, background: 'var(--surface-inverse, #0E2350)', color: '#fff', fontSize: 14, fontWeight: 500, boxShadow: '0 16px 30px -14px rgba(0,0,0,.5)', whiteSpace: 'nowrap', zIndex: 5 }}><span style={{ width: 22, height: 22, borderRadius: '50%', background: '#2DBF6A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><OIcon name="check" size={13} strokeWidth={3} /></span>{toast}</div> : null}
      </aside>
    </div>,
    document.body
  );
}

function PacientesScreen({ mobile }) {
  const [list, setList] = React.useState(PAC);
  const [openId, setOpenId] = React.useState(null);
  const openP = list.find((x) => x.cpf === openId);
  const [page, setPage] = React.useState(1);
  const [q, setQ] = React.useState('');
  const [f, setF] = React.useState(EMPTY);
  const [open, setOpen] = React.useState(false);
  const [novo, setNovo] = React.useState(false);
  const boxRef = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const h = (e) => { if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false); };
    const k = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', h); window.addEventListener('keydown', k);
    return () => { document.removeEventListener('mousedown', h); window.removeEventListener('keydown', k); };
  }, [open]);
  const term = q.trim().toLowerCase();
  const filterRows = (vals) => list.filter((p) => {
    for (const d of FILTER_DEFS) if (!match(p, d.key, vals[d.key])) return false;
    if (!term) return true;
    const dg = onlyDigits(term);
    return p.nome.toLowerCase().includes(term) || p.empresa.toLowerCase().includes(term) || p.conv.toLowerCase().includes(term) || (dg.length >= 3 && (onlyDigits(p.tel).includes(dg) || onlyDigits(p.cpf).includes(dg)));
  });
  const rows = filterRows(f);
  const active = FILTER_DEFS.filter((d) => f[d.key] !== ALL);
  const set = (k, v) => setF((o) => ({ ...o, [k]: o[k] === v ? ALL : v }));
  const clearAll = () => { setF(EMPTY); setQ(''); };

  const th = { textAlign: 'left', padding: '16px 12px', fontSize: 12, fontWeight: 500, color: 'var(--text-strong)', textTransform: 'uppercase', letterSpacing: '.02em', whiteSpace: 'nowrap' };
  const td = { padding: '14px 12px', fontSize: 14, color: 'var(--text-body)', borderTop: '1px solid rgba(214,226,242,.9)', whiteSpace: 'nowrap' };
  const muted = { ...td, color: 'var(--text-subtle)' };

  return (
    <section style={{ ...glass, padding: mobile ? 16 : 26, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <CardTitle size={mobile ? 19 : 22} right={<OBtn size="sm" iconLeft="user-plus" onClick={() => setNovo(true)}>{mobile ? 'Novo' : 'Novo paciente'}</OBtn>}>Lista de pacientes</CardTitle>

      <div ref={boxRef} style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, minWidth: 0 }}><OInput variant="search" placeholder={mobile ? 'Buscar paciente' : 'Buscar por nome, CPF, telefone, convênio ou empresa'} value={q} onChange={(e) => setQ(e.target.value)} /></div>
          <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 40, padding: mobile ? '0 12px' : '0 16px', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap', flexShrink: 0,
            border: open || active.length ? '1.5px solid rgba(31,94,255,.35)' : '1.5px solid rgba(255,255,255,.95)', background: open || active.length ? 'rgba(31,94,255,.1)' : 'rgba(255,255,255,.55)', color: open || active.length ? '#1F5EFF' : 'var(--text-strong)', boxShadow: '0 4px 12px -8px rgba(23,73,170,.35)' }}>
            <OIcon name="sliders-horizontal" size={16} />{mobile ? null : 'Filtros'}
            {active.length ? <span style={{ minWidth: 20, height: 20, padding: '0 6px', borderRadius: 999, background: '#1F5EFF', color: '#fff', fontSize: 12, fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>{active.length}</span> : null}
          </button>
        </div>

        {active.length || q ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            {active.map((d) => <ActiveTag key={d.key} label={d.label + ': ' + f[d.key]} onRemove={() => setF((o) => ({ ...o, [d.key]: ALL }))} />)}
            <span style={{ fontSize: 13, color: 'var(--text-muted)', marginLeft: active.length ? 4 : 0 }}><b style={{ color: 'var(--text-strong)', fontWeight: 600 }}>{rows.length}</b> {rows.length === 1 ? 'paciente' : 'pacientes'}</span>
            <button type="button" onClick={clearAll} style={{ border: 0, background: 'none', color: '#1F5EFF', fontFamily: 'inherit', fontSize: 13, fontWeight: 500, cursor: 'pointer', padding: '4px 6px' }}>Limpar tudo</button>
          </div>
        ) : null}

        {open ? (
          <div role="dialog" aria-label="Filtros" style={{ position: 'absolute', top: 48, right: 0, left: mobile ? 0 : 'auto', width: mobile ? 'auto' : 380, zIndex: 30, padding: 18, borderRadius: 22, display: 'flex', flexDirection: 'column', gap: 16,
            background: 'rgba(255,255,255,.94)', border: '1.5px solid #fff', boxShadow: '0 24px 48px -20px rgba(23,73,170,.45)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)' }}>
            {FILTER_DEFS.map((d) => (
              <div key={d.key} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.04em' }}>{d.label}</span>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {d.opts.map((o) => <FilterChip key={o} active={f[d.key] === o} onClick={() => set(d.key, o)}>{o}</FilterChip>)}
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, paddingTop: 12, borderTop: '1px solid rgba(214,226,242,.9)' }}>
              <button type="button" onClick={() => setF(EMPTY)} style={{ border: 0, background: 'none', color: 'var(--text-muted)', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, cursor: 'pointer', padding: '6px 4px' }}>Limpar</button>
              <OBtn size="sm" onClick={() => setOpen(false)}>Ver {rows.length} {rows.length === 1 ? 'paciente' : 'pacientes'}</OBtn>
            </div>
          </div>
        ) : null}
      </div>

      <div style={{ overflowX: 'auto', overflowY: 'hidden', scrollbarWidth: 'thin', scrollbarColor: 'rgba(150,175,210,.5) transparent', borderRadius: 18, background: 'rgba(255,255,255,.35)', border: '1.5px solid rgba(255,255,255,.9)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 980 }}>
          <thead style={{ background: 'rgba(225,236,250,.7)' }}><tr>
            <th style={{ ...th, width: 36 }}><OCheck /></th><th style={th}>Nome</th><th style={th}>Tipo</th><th style={th}>Convênio</th><th style={th}>Empresa</th><th style={th}>Telefone</th><th style={th}>Nascimento</th><th style={th}>Sexo</th><th style={th}>CPF</th><th style={{ ...th, width: 30 }} />
          </tr></thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.cpf} onClick={() => setOpenId(p.cpf)} style={{ cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,.55)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
                <td style={td} onClick={(e) => e.stopPropagation()}><OCheck /></td>
                <td style={td}><span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><OAv name={p.nome} size={36} /><span style={{ fontWeight: 600, color: 'var(--text-strong)' }}>{p.nome}</span></span></td>
                <td style={td}><TipoBadge t={p.tipo} /></td>
                <td style={p.conv ? td : muted}>{p.conv || 'Sem convênio'}</td>
                <td style={p.empresa ? td : muted}>{p.empresa || 'Não se aplica'}</td>
                <td style={{ ...td, fontVariantNumeric: 'tabular-nums' }}>{p.tel}</td>
                <td style={{ ...td, fontVariantNumeric: 'tabular-nums' }}>{p.nasc}</td>
                <td style={td}>{p.sexo}</td>
                <td style={{ ...td, fontVariantNumeric: 'tabular-nums' }}>{p.cpf}</td>
                <td style={{ ...td, color: 'var(--text-subtle)', paddingRight: 16 }}><OIcon name="chevron-right" size={18} /></td>
              </tr>
            ))}
            {rows.length === 0 ? <tr><td colSpan={10} style={{ ...td, textAlign: 'center', padding: '40px 16px', color: 'var(--text-muted)' }}>Nenhum paciente encontrado. <button type="button" onClick={clearAll} style={{ border: 0, background: 'none', color: '#1F5EFF', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>Limpar filtros</button></td></tr> : null}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', fontSize: 14, color: 'var(--text-muted)' }}>
        <span>Exibindo {rows.length ? 1 : 0} a {rows.length} de {rows.length} registros</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <button type="button" onClick={() => setPage(Math.max(1, page - 1))} style={pgBtn(false)}><OIcon name="chevron-left" size={14} />Anterior</button>
          <button type="button" style={pgBtn(true, true)}>1</button>
          <button type="button" style={pgBtn(false)}>Próximo<OIcon name="chevron-right" size={14} /></button>
        </div>
      </div>

      {openP ? <PacienteFicha p={openP} mobile={mobile} onClose={() => setOpenId(null)} onUpdate={(np) => setList((l) => l.map((x) => x.cpf === np.cpf ? np : x))} /> : null}

      <GPortal><ODialog open={novo} onClose={() => setNovo(false)} icon="user-plus" title="Novo paciente" description="Preencha os dados de cadastro do paciente." width={620}
        footer={<><OBtn variant="secondary" onClick={() => setNovo(false)}>Cancelar</OBtn><OBtn iconLeft="check" onClick={() => setNovo(false)}>Salvar paciente</OBtn></>}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
          <OInput label="Nome completo" placeholder="Ex.: Mariana Alves Costa" style={{ gridColumn: '1 / -1' }} />
          <OSelect label="Tipo" options={['Particular', 'Convênio', 'Empresarial']} />
          <OSelect label="Convênio" options={['Sem convênio', 'Unimed', 'Bradesco Saúde', 'SulAmérica', 'Amil', 'Outro']} />
          <OInput label="Empresa" placeholder="Se for paciente empresarial" />
          <OInput label="Telefone" iconLeft="phone" placeholder="(19) 99999-9999" inputMode="tel" />
          <OInput label="Data de nascimento" type="date" />
          <OSelect label="Sexo" options={['Feminino', 'Masculino', 'Prefiro não informar']} />
          <OInput label="CPF" placeholder="000.000.000-00" inputMode="numeric" style={{ gridColumn: '1 / -1' }} />
        </div>
      </ODialog></GPortal>
    </section>
  );
}

function pgBtn(on, sq) {
  return { display: 'inline-flex', alignItems: 'center', gap: 4, height: 32, minWidth: sq ? 32 : undefined, padding: sq ? 0 : '0 12px', justifyContent: 'center', borderRadius: 10, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 500,
    border: on ? '1px solid rgba(31,94,255,.3)' : '1px solid rgba(255,255,255,.9)', background: on ? 'rgba(31,94,255,.1)' : 'rgba(255,255,255,.55)', color: on ? '#1F5EFF' : 'var(--text-strong)' };
}

const PROS = [{ n: 'Darlene Robertson', r: 'Terapeuta' }, { n: 'Michael Thompson', r: 'Psiquiatra' }, { n: 'Max Worthington', r: 'Psicólogo' }, { n: 'Dr. McCoy', r: 'Psiquiatra' }];
const SLOTS = [
  { col: 1, row: 0, n: 'Ronald Richards', orb: '#7C8CFF' }, { col: 2, row: 0, n: 'Ralph Edwards', orb: '#9AE072', span: 1.7 },
  { col: 0, row: 1, n: 'Darlene Robertson', orb: '#9AE072', span: 1.7 }, { col: 1, row: 2, n: 'Esther Howard', orb: '#5FB6F2', span: 1.5 }, { col: 3, row: 2, n: 'Theresa Webb', orb: '#5FB6F2' },
  { col: 0, row: 3, n: 'Marvin McKinney', orb: '#EEE260' }, { col: 2, row: 4, n: 'Kristin Watson', orb: '#7C8CFF', span: 1.6 }, { col: 0, row: 5, n: 'Cody Fisher', orb: '#5FB6F2' },
];
const orbBg = (c) => `radial-gradient(circle at 35% 30%, #fff 0%, ${c} 60%)`;

const WD = ['DOMINGO', 'SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO'];
const MES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const MESL = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const TODAY = new Date(2026, 9, 2);
const addD = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const dayOff = (d) => Math.round((d - TODAY) / 86400000);
const slotsBase = (d) => d.getDay() === 0 ? [] : SLOTS.filter((s, i) => { const k = ((dayOff(d) % 5) + 5) % 5; return k === 0 || (i + k) % 3 !== 0; });
const APPT_STORE = makeStore([]);
const slotsFor = (d) => { const iso = isoOf(d); return [...slotsBase(d), ...APPT_STORE.v.filter((a) => a.date === iso).map((a) => ({ col: a.col, row: a.h - 9, n: a.pac, orb: '#7C8CFF', span: 0.9, novo: true }))]; };
const agendaOcupado = (col, d, h) => slotsFor(d).filter((s) => s.col === col).find((s) => { const st = 9 + s.row, en = st + Math.max(1, Math.round(s.span || 1)); return h >= st && h < en; });
const sameDay = (a, b) => a.toDateString() === b.toDateString();

function DayStrip({ start, sel, onSel, onShift, counts, mobile }) {
  const days = Array.from({ length: 7 }, (_, i) => addD(start, i));
  const arrow = (dir) => <button type="button" aria-label={dir < 0 ? 'Semana anterior' : 'Próxima semana'} onClick={() => onShift(dir * 7)} disabled={dir < 0 && sameDay(start, TODAY)}
    style={{ width: 36, flexShrink: 0, alignSelf: 'stretch', borderRadius: 14, border: '1.5px solid rgba(255,255,255,.95)', background: 'rgba(255,255,255,.6)', color: 'var(--text-strong)', cursor: dir < 0 && sameDay(start, TODAY) ? 'default' : 'pointer', opacity: dir < 0 && sameDay(start, TODAY) ? .4 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}><OIcon name={dir < 0 ? 'chevron-left' : 'chevron-right'} size={18} /></button>;
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'stretch' }}>
      {arrow(-1)}
      <div style={{ flex: 1, minWidth: 0, overflowX: 'auto', scrollbarWidth: 'none' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(' + (mobile ? 76 : 0) + 'px, 1fr))', gap: 8 }}>
          {days.map((d) => {
            const on = sameDay(d, sel); const today = sameDay(d, TODAY); const c = counts(d);
            return (
              <button key={d.toISOString()} type="button" onClick={() => onSel(d)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, padding: '10px 4px', borderRadius: 16, cursor: 'pointer', fontFamily: 'inherit',
                border: on ? '2px solid #1F5EFF' : '2px solid rgba(255,255,255,.95)', background: on ? 'rgba(31,94,255,.08)' : 'rgba(255,255,255,.6)', boxShadow: on ? '0 8px 18px -12px rgba(31,94,255,.7)' : '0 4px 12px -10px rgba(23,73,170,.35)' }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '.04em', color: today ? '#1F5EFF' : 'var(--text-muted)' }}>{today ? 'HOJE' : WD[d.getDay()]}</span>
                <span style={{ fontSize: 22, fontWeight: 700, color: on ? '#1F5EFF' : 'var(--text-strong)', fontVariantNumeric: 'tabular-nums', lineHeight: 1.15 }}>{String(d.getDate()).padStart(2, '0')}</span>
                <span style={{ fontSize: 11, color: c ? 'var(--text-body)' : 'var(--text-subtle)', whiteSpace: 'nowrap' }}>{c ? c + (c === 1 ? ' agend.' : ' agend.') : d.getDay() === 0 ? 'Fechado' : 'Livre'}</span>
              </button>
            );
          })}
        </div>
      </div>
      {arrow(1)}
    </div>
  );
}

function ProsPicker({ sel, setSel, counts, compact }) {
  const all = sel.length === PROS.length;
  const tog = (n) => setSel((s) => s.includes(n) ? (s.length > 1 ? s.filter((x) => x !== n) : s) : PROS.map((p) => p.n).filter((x) => x === n || s.includes(x)));
  if (compact) return (
    <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 2 }}>
      <FilterChip active={all} onClick={() => setSel(PROS.map((p) => p.n))}>Todos</FilterChip>
      {PROS.map((p) => { const on = sel.includes(p.n) && !all; return (
        <button key={p.n} type="button" aria-pressed={sel.includes(p.n)} onClick={() => all ? setSel([p.n]) : tog(p.n)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 36, padding: '0 12px 0 4px', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', flexShrink: 0,
          border: on ? '1.5px solid rgba(31,94,255,.35)' : '1.5px solid rgba(214,226,242,.9)', background: on ? 'rgba(31,94,255,.1)' : 'rgba(255,255,255,.7)', color: on ? '#1F5EFF' : 'var(--text-strong)' }}>
          <OAv name={p.n} size={26} />{p.n.split(' ')[0] === 'Dr.' ? p.n : p.n.split(' ')[0]}<span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{counts(p.n) || 0}</span></button>); })}
    </div>
  );
  return (
    <section style={{ ...glass, padding: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <CardTitle size={20} right={<button type="button" onClick={() => setSel(all ? [PROS[0].n] : PROS.map((p) => p.n))} style={{ border: 0, background: 'none', color: '#1F5EFF', fontFamily: 'inherit', fontSize: 13, fontWeight: 500, cursor: 'pointer', padding: 4 }}>{all ? 'Ver só um' : 'Ver todos'}</button>}>Profissionais</CardTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {PROS.map((p) => {
          const on = sel.includes(p.n);
          return (
            <button key={p.n} type="button" onClick={() => tog(p.n)} aria-pressed={on} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 16, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
              border: on ? '1.5px solid rgba(31,94,255,.3)' : '1.5px solid rgba(255,255,255,.9)', background: on ? 'rgba(31,94,255,.07)' : 'rgba(255,255,255,.45)' }}>
              <span style={{ width: 20, height: 20, borderRadius: 6, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: on ? '#1F5EFF' : '#fff', border: on ? 0 : '1.5px solid rgba(150,175,210,.7)', color: '#fff' }}>{on ? <OIcon name="check" size={13} strokeWidth={3} /> : null}</span>
              <OAv name={p.n} size={34} />
              <span style={{ flex: 1, minWidth: 0 }}><span style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--text-strong)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.n}</span><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.r}</span></span>
              <span style={{ fontSize: 12, fontWeight: 600, color: counts(p.n) ? '#1F5EFF' : 'var(--text-subtle)', whiteSpace: 'nowrap' }}>{counts(p.n) || 0} no dia</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

const WDS = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
function MonthCal({ month, sel, onPick, counts, names, mobile }) {
  const y = month.getFullYear(), mo = month.getMonth();
  const lead = new Date(y, mo, 1).getDay(), n = new Date(y, mo + 1, 0).getDate();
  const cells = [...Array(lead).fill(null), ...Array.from({ length: n }, (_, i) => new Date(y, mo, i + 1))];
  while (cells.length % 7) cells.push(null);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0,1fr))', gap: mobile ? 5 : 8 }}>
      {WDS.map((w) => <span key={w} style={{ textAlign: 'center', fontSize: 11, fontWeight: 600, letterSpacing: '.04em', color: 'var(--text-muted)', padding: '2px 0 4px' }}>{w}</span>)}
      {cells.map((d, i) => {
        if (!d) return <span key={i} />;
        const c = counts(d), today = sameDay(d, TODAY), on = sameDay(d, sel), past = d < TODAY && !today, sun = d.getDay() === 0, list = names(d);
        return (
          <button key={i} type="button" onClick={() => onPick(d)} aria-label={`${d.getDate()} de ${MESL[mo]}: ${c ? c + ' agendamentos' : sun ? 'fechado' : 'livre'}. Abrir na semana`}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', gap: 4, minHeight: mobile ? 62 : 112, padding: mobile ? '6px 4px' : '8px 8px 10px', borderRadius: mobile ? 12 : 16, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', boxSizing: 'border-box', minWidth: 0,
              border: on ? '2px solid #1F5EFF' : '2px solid rgba(255,255,255,.95)', background: on ? 'rgba(31,94,255,.08)' : sun ? 'rgba(255,255,255,.35)' : 'rgba(255,255,255,.62)', boxShadow: on ? '0 8px 18px -12px rgba(31,94,255,.7)' : '0 4px 12px -10px rgba(23,73,170,.35)', opacity: past ? .62 : 1 }}>
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: mobile ? 'center' : 'space-between', gap: 4 }}>
              <span style={{ width: mobile ? 26 : 28, height: mobile ? 26 : 28, borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: mobile ? 14 : 15, fontWeight: 700, fontVariantNumeric: 'tabular-nums', background: today ? 'linear-gradient(180deg,#0B4BEB,#1F8BF5)' : 'transparent', color: today ? '#fff' : on ? '#1F5EFF' : 'var(--text-strong)' }}>{d.getDate()}</span>
              {!mobile && c ? <span style={{ fontSize: 11, fontWeight: 600, color: '#1F5EFF', background: 'rgba(31,94,255,.08)', padding: '2px 7px', borderRadius: 999, whiteSpace: 'nowrap' }}>{c} agend.</span> : null}
            </span>
            {mobile ? (c ? <span style={{ alignSelf: 'center', minWidth: 22, height: 18, padding: '0 6px', boxSizing: 'border-box', borderRadius: 999, background: 'rgba(31,94,255,.1)', color: '#1F5EFF', fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{c}</span> : <span style={{ textAlign: 'center', fontSize: 10, color: 'var(--text-subtle)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sun ? 'Fechado' : 'Livre'}</span>)
              : c ? <span style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
                {list.slice(0, 2).map((s) => <span key={s.n + s.h} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11.5, color: 'var(--text-body)', minWidth: 0 }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: s.orb, flexShrink: 0 }} /><span style={{ fontVariantNumeric: 'tabular-nums', color: 'var(--text-muted)' }}>{String(s.h).padStart(2, '0')}h</span><span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.n.split(' ')[0]}</span></span>)}
                {list.length > 2 ? <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>mais {list.length - 2}</span> : null}
              </span> : <span style={{ fontSize: 11.5, color: 'var(--text-subtle)' }}>{sun ? 'Fechado' : 'Livre'}</span>}
          </button>
        );
      })}
    </div>
  );
}

function AgendaScreen({ mobile, onNew }) {
  const narrow = useNarrow();
  useStore(APPT_STORE);
  const [view, setView] = React.useState('Semana');
  const [start, setStart] = React.useState(TODAY);
  const [day, setDay] = React.useState(TODAY);
  const [month, setMonth] = React.useState(new Date(TODAY.getFullYear(), TODAY.getMonth(), 1));
  const [pros, setPros] = React.useState(PROS.map((p) => p.n));
  const RH = 96;
  const cols = PROS.map((p, i) => ({ ...p, col: i })).filter((p) => pros.includes(p.n));
  const daySlots = slotsFor(day);
  const countDay = (d) => slotsFor(d).filter((s) => pros.includes(PROS[s.col].n)).length;
  const countPro = (n) => daySlots.filter((s) => PROS[s.col].n === n).length;
  const shift = (n) => { const ns = addD(start, n); const s2 = ns < TODAY ? TODAY : ns; setStart(s2); setDay(s2); };
  const one = mobile || narrow;
  const picker = <ProsPicker sel={pros} setSel={setPros} counts={countPro} compact={one} />;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: one ? '1fr' : 'minmax(0,1fr) 360px', gap: mobile ? 14 : 26, alignItems: 'start' }}>
      <section style={{ ...glass, padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: mobile ? '16px 16px 14px' : '24px 26px 18px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <CardTitle right={<OBtn size="sm" iconLeft="plus" onClick={onNew}>Novo</OBtn>}>Agendamentos</CardTitle>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
            {view === 'Mês' ? <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <button type="button" aria-label="Mês anterior" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))} style={{ width: 34, height: 34, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.95)', background: 'rgba(255,255,255,.6)', color: 'var(--text-strong)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><OIcon name="chevron-left" size={17} /></button>
              <span style={{ fontSize: 18, fontWeight: 500, color: 'var(--text-strong)', minWidth: 150, textAlign: 'center' }}>{MESL[month.getMonth()].charAt(0).toUpperCase() + MESL[month.getMonth()].slice(1)} de {month.getFullYear()}</span>
              <button type="button" aria-label="Próximo mês" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))} style={{ width: 34, height: 34, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,.95)', background: 'rgba(255,255,255,.6)', color: 'var(--text-strong)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><OIcon name="chevron-right" size={17} /></button>
            </span> : <span style={{ fontSize: 18, color: 'var(--text-strong)' }}>{WD[day.getDay()].charAt(0) + WD[day.getDay()].slice(1).toLowerCase()}, {day.getDate()} de {MESL[day.getMonth()]}</span>}
            <OSeg size="sm" options={['Semana', 'Mês']} value={view} onChange={(v) => { if (v === 'Mês') setMonth(new Date(day.getFullYear(), day.getMonth(), 1)); setView(v); }} />
          </div>
          {view === 'Mês' ? <MonthCal month={month} sel={day} mobile={mobile} counts={countDay} names={(d) => slotsFor(d).filter((s) => pros.includes(PROS[s.col].n)).sort((a, b) => a.row - b.row).map((s) => ({ n: s.n, h: 9 + s.row, orb: s.orb }))} onPick={(d) => { setDay(d); setStart(d); setView('Semana'); }} />
            : <DayStrip start={start} sel={day} onSel={setDay} onShift={shift} counts={countDay} mobile={mobile} />}
        </div>
        {one ? <div style={{ padding: mobile ? '0 16px 14px' : '0 26px 16px' }}>{picker}</div> : null}
        {view === 'Mês' ? null : <>
        <div style={{ overflowX: 'auto', overflowY: 'hidden', scrollbarWidth: 'thin', scrollbarColor: 'rgba(150,175,210,.5) transparent' }}>
          <div style={{ minWidth: 78 + cols.length * 170 }}>
            <div style={{ display: 'grid', gridTemplateColumns: `78px repeat(${cols.length}, 1fr)`, borderTop: '1px solid rgba(214,226,242,.9)' }}>
              <span />{cols.map((p) => <div key={p.n} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '14px 12px', borderLeft: '1px solid rgba(214,226,242,.9)' }}><OAv name={p.n} size={34} /><div style={{ minWidth: 0 }}><p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: 'var(--text-strong)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.n}</p><p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)' }}>{p.r}</p></div></div>)}
            </div>
            <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: `78px repeat(${cols.length}, 1fr)`, borderTop: '1px solid rgba(214,226,242,.9)' }}>
              <div>{[9, 10, 11, 12, 13, 14].map((h) => <div key={h} style={{ height: RH, boxSizing: 'border-box', padding: '20px 0 0 22px', fontSize: 17, color: 'var(--text-muted)', borderBottom: '1px solid rgba(214,226,242,.9)' }}>{h}h</div>)}</div>
              {cols.map((pc) => (
                <div key={pc.n} style={{ position: 'relative', borderLeft: '1px solid rgba(214,226,242,.9)' }}>
                  {[0, 1, 2, 3, 4, 5].map((r) => <div key={r} style={{ height: RH, boxSizing: 'border-box', borderBottom: '1px solid rgba(214,226,242,.9)' }} />)}
                  {daySlots.filter((s) => s.col === pc.col).map((s) => (
                    <div key={s.n} style={{ position: 'absolute', left: 6, right: 6, top: s.row * RH + 6, height: (s.span || 0.9) * RH - 6, boxSizing: 'border-box', padding: '10px 12px', borderRadius: 14, background: 'rgba(255,255,255,.88)', boxShadow: '0 6px 16px -10px rgba(23,73,170,.35)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div><p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: 'var(--text-strong)' }}>{s.n}</p><p style={{ margin: 0, fontSize: 11, color: 'var(--text-muted)' }}>{pc.r}</p></div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><span style={{ fontSize: 13, color: 'var(--text-strong)' }}>{String(9 + s.row).padStart(2, '0')}:00 às {String(9 + s.row + Math.max(1, Math.round(s.span || 1))).padStart(2, '0')}:00</span><span style={{ width: 22, height: 22, borderRadius: '50%', background: orbBg(s.orb), boxShadow: '0 3px 8px -2px rgba(23,73,170,.3)' }} /></div>
                    </div>
                  ))}
                </div>
              ))}
              {sameDay(day, TODAY) ? <div style={{ position: 'absolute', left: 72, right: 0, top: RH * 1.45, height: 2, background: 'linear-gradient(90deg,#0A46E4,#22C3F2)', pointerEvents: 'none' }}><span style={{ position: 'absolute', left: -5, top: -4, width: 10, height: 10, borderRadius: '50%', background: '#0A46E4' }} /></div> : null}
              {!daySlots.length ? <div style={{ position: 'absolute', left: 78, right: 0, top: 40, textAlign: 'center', fontSize: 15, color: 'var(--text-muted)' }}>{day.getDay() === 0 ? 'Clínica fechada aos domingos.' : 'Nenhum agendamento neste dia.'}</div> : null}
            </div>
          </div>
        </div>
        </>}
      </section>
      {one ? null : <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
        {picker}
        <section style={{ ...glass, padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <CardTitle size={20} right={<Legend items={[['Consulta', '#1F5EFF'], ['Reunião', '#F2694A']]} />}>Atividade mensal</CardTitle>
          <MonthGrid compact />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
            {[['Tempo ativo', '4h 32m'], ['Média de retorno', '17 dias'], ['Melhor dia', 'Segunda']].map(([k, v], i) => (
              <div key={k} style={{ paddingLeft: i ? 12 : 0, borderLeft: i ? '1px solid rgba(214,226,242,.9)' : 0 }}><p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)' }}>{k}</p><p style={{ margin: '4px 0 0', fontSize: 16, fontWeight: 500, color: 'var(--text-strong)' }}>{v}</p></div>
            ))}
          </div>
        </section>
      </div>}
    </div>
  );
}

/* ======================= GESTÃO ======================= */
const { StatCard: GStat, BarChart: GBar, TrendPill: GTrend, CardIcon: GCardIcon } = window.SaluteProjetoDesigner_8b4683;
const brl = (n) => 'R$ ' + Number(n).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const brl0 = (n) => 'R$ ' + Math.round(n).toLocaleString('pt-BR');
const brlK = (n) => Math.abs(n) >= 1000 ? 'R$ ' + (n / 1000).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + ' mil' : brl0(n);
const pct1 = (v) => (Math.round(v * 10) / 10).toLocaleString('pt-BR', { minimumFractionDigits: 1 }) + '%';
const pct0 = (v) => Math.round(v) + '%';
const dBR = (iso) => iso ? iso.slice(8, 10) + '/' + iso.slice(5, 7) + '/' + iso.slice(0, 4) : '';
const isoOf = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const TODAY_ISO = isoOf(TODAY);
const PAL = ['#0A3FE0', '#1F5EFF', '#4F7BE6', '#22C3F2', '#7B4BC4', '#A78BFA', '#9DB8F2', '#5FB6F2', '#C084FC', '#C9D6EA'];
const BRAND = { blue: '#1F5EFF', cyan: '#22C3F2', purple: '#7B4BC4', peri: '#9DB8F2', deep: '#0A3FE0' };
function gRand(seed) { let h = seed >>> 0; return () => { h ^= h << 13; h >>>= 0; h ^= h >> 17; h ^= h << 5; h >>>= 0; return h / 4294967296; }; }
const daysTo = (iso) => Math.round((new Date(iso + 'T00:00:00') - TODAY) / 86400000);
const inWin = (iso, per, prev) => { const d = daysTo(iso); return prev ? d <= -per && d > -2 * per : d <= 0 && d > -per; };
const trendOf = (cur, prev) => { if (!prev) return null; const v = (cur / prev - 1) * 100; return { value: pct1(Math.abs(v)), direction: v < 0 ? 'down' : 'up', label: 'vs período anterior' }; };

function Badge2({ c, children, onClick, title }) {
  const El = onClick ? 'button' : 'span';
  return <El type={onClick ? 'button' : undefined} title={title} onClick={onClick} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 26, padding: '0 10px', borderRadius: 999, background: `color-mix(in srgb, ${c} 9%, white)`, border: `1px solid color-mix(in srgb, ${c} 30%, white)`, color: c, fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap', fontFamily: 'inherit', cursor: onClick ? 'pointer' : 'default' }}>
    <span style={{ width: 6, height: 6, borderRadius: '50%', background: c }} />{children}</El>;
}

/* ---------- peças de UI ---------- */
function GTabs({ items, value, onChange }) {
  return (
    <div style={{ display: 'inline-flex', alignSelf: 'flex-start', gap: 4, padding: 4, borderRadius: 999, background: 'rgba(255,255,255,.45)', border: '1.5px solid rgba(255,255,255,.95)', maxWidth: '100%', overflowX: 'auto', scrollbarWidth: 'none' }}>
      {items.map(([k, l, ic]) => <button key={k} type="button" onClick={() => onChange(k)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 40, padding: '0 clamp(10px, 3vw, 18px)', borderRadius: 999, border: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: value === k ? 600 : 500, whiteSpace: 'nowrap', color: value === k ? 'var(--text-strong)' : 'var(--text-muted)', background: value === k ? '#fff' : 'transparent', boxShadow: value === k ? '0 4px 12px -6px rgba(23,73,170,.3)' : 'none' }}>{ic ? <OIcon name={ic} size={16} /> : null}{l}</button>)}
    </div>
  );
}

const pillSelect = { appearance: 'none', WebkitAppearance: 'none', border: 0, background: 'transparent', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, color: 'var(--text-strong)', cursor: 'pointer', outline: 'none', paddingRight: 22, height: '100%', minWidth: 0, textOverflow: 'ellipsis' };
function PeriodSelect({ value, onChange }) {
  return (
    <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 8, height: 42, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,.95)', background: 'rgba(255,255,255,.6)', boxShadow: '0 4px 12px -8px rgba(23,73,170,.35)', color: 'var(--text-strong)', flexShrink: 0 }}>
      <OIcon name="calendar" size={16} />
      <select aria-label="Período" value={value} onChange={(e) => onChange(+e.target.value)} style={pillSelect}>
        {[30, 60, 90].map((d) => <option key={d} value={d}>Últimos {d} dias</option>)}
      </select>
      <span style={{ position: 'absolute', right: 12, pointerEvents: 'none', display: 'flex' }}><OIcon name="chevron-down" size={15} /></span>
    </label>
  );
}

function OneFilter({ q, setQ, placeholder, value, onChange, options, mobile }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: 48, borderRadius: 999, background: 'rgba(255,255,255,.72)', border: '1.5px solid rgba(255,255,255,.98)', boxShadow: '0 6px 16px -12px rgba(23,73,170,.45)', minWidth: 0 }}>
      <span style={{ display: 'flex', padding: '0 10px 0 16px', color: 'var(--text-muted)' }}><OIcon name="search" size={18} /></span>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} aria-label="Buscar" style={{ flex: 1, minWidth: 0, height: '100%', border: 0, outline: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: 15, color: 'var(--text-strong)' }} />
      {q ? <button type="button" aria-label="Limpar busca" onClick={() => setQ('')} style={{ border: 0, background: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', padding: 6 }}><OIcon name="x" size={16} /></button> : null}
      <span style={{ width: 1, height: 26, background: 'rgba(150,175,210,.45)', margin: '0 4px 0 6px' }} />
      <label style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 6, height: '100%', padding: '0 16px 0 10px', color: value !== options[0][0] ? '#1F5EFF' : 'var(--text-strong)', maxWidth: mobile ? '46%' : 260 }}>
        <OIcon name="sliders-horizontal" size={15} />
        <select aria-label="Filtrar" value={value} onChange={(e) => onChange(e.target.value)} style={{ ...pillSelect, color: 'inherit' }}>
          {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
        <span style={{ position: 'absolute', right: 14, pointerEvents: 'none', display: 'flex' }}><OIcon name="chevron-down" size={15} /></span>
      </label>
    </div>
  );
}

function KpiTile({ icon, title, value, trend, note, bar, barBg, mobile }) {
  return (
    <section style={{ ...glass, padding: mobile ? 16 : 22, display: 'flex', flexDirection: 'column', gap: mobile ? 8 : 12, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><GCardIcon name={icon} size={mobile ? 32 : 40} /><span style={{ fontSize: mobile ? 13 : 16, fontWeight: 500, color: 'var(--text-strong)', lineHeight: 1.25 }}>{title}</span></div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <span style={{ fontSize: mobile ? 24 : 32, fontWeight: 600, lineHeight: 1.1, color: 'var(--text-strong)', letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{value}</span>
        {trend && !mobile ? <GTrend {...trend} /> : null}
      </div>
      {bar !== undefined ? <div style={{ height: 8, borderRadius: 999, background: 'rgba(214,226,242,.8)', overflow: 'hidden' }}><div style={{ width: Math.max(0, Math.min(bar, 100)) + '%', height: '100%', borderRadius: 999, background: barBg || 'var(--gradient-blue-h)' }} /></div> : null}
      <span style={{ fontSize: mobile ? 12 : 13.5, color: 'var(--text-muted)', lineHeight: 1.45 }}>{note}</span>
      {trend && mobile ? <GTrend {...trend} label="vs anterior" style={{ alignSelf: 'flex-start' }} /> : null}
    </section>
  );
}
const B = ({ children, c }) => <b style={{ color: c || 'var(--text-strong)', fontWeight: 600 }}>{children}</b>;

function ChartCard({ title, right, children, mobile, style }) {
  return <section style={{ ...glass, padding: mobile ? 18 : 26, display: 'flex', flexDirection: 'column', gap: 18, minWidth: 0, ...style }}><CardTitle size={mobile ? 19 : 22} right={right}>{title}</CardTitle>{children}</section>;
}

function ShareRows({ data, total, fmt = brl0, cols = 1 }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))`, gap: '14px 28px' }}>
      {data.map((d) => { const p = d.value / (total || 1) * 100; return (
        <div key={d.label} style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-body)', minWidth: 0, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, flexShrink: 0 }} />{d.label}</span>
            <span style={{ fontSize: 14, color: 'var(--text-muted)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}><B>{fmt(d.value)}</B> · {pct0(p)}</span>
          </div>
          <div style={{ height: 6, borderRadius: 999, background: 'rgba(214,226,242,.7)', overflow: 'hidden' }}><div style={{ width: p + '%', height: '100%', borderRadius: 999, background: d.grad || d.color }} /></div>
        </div>); })}
    </div>
  );
}

/* ---------- gráficos ---------- */
const polar = (cx, cy, r, a) => [cx + r * Math.cos(a - Math.PI / 2), cy + r * Math.sin(a - Math.PI / 2)];
function arcD(cx, cy, r, ri, a0, a1) {
  if (a1 - a0 >= Math.PI * 2 - 1e-4) a1 = a0 + Math.PI * 2 - 1e-4;
  const [x0, y0] = polar(cx, cy, r, a0), [x1, y1] = polar(cx, cy, r, a1), big = a1 - a0 > Math.PI ? 1 : 0;
  const [x2, y2] = polar(cx, cy, ri, a1), [x3, y3] = polar(cx, cy, ri, a0);
  return `M${x0} ${y0} A${r} ${r} 0 ${big} 1 ${x1} ${y1} L${x2} ${y2} A${ri} ${ri} 0 ${big} 0 ${x3} ${y3} Z`;
}
function GDonut({ data, size = 200, label = 'Total', fmt = brlK }) {
  const [hov, setHov] = React.useState(null);
  const total = data.reduce((a, d) => a + d.value, 0) || 1, c = size / 2, R = c - 6, ri = R * 0.66; let a = 0;
  const h = hov !== null ? data[hov] : null;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ display: 'block', flexShrink: 0, overflow: 'visible', filter: 'drop-shadow(0 12px 18px rgba(23,73,170,.18))' }}>
      {data.map((d, i) => { const a0 = a, a1 = a + d.value / total * Math.PI * 2; a = a1;
        return <path key={d.label} d={arcD(c, c, hov === i ? R + 4 : R, ri, a0, a1)} fill={d.color} stroke="#fff" strokeWidth="3" strokeLinejoin="round" onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)} style={{ transition: 'd .15s' }} />; })}
      <circle cx={c} cy={c} r={ri - 8} fill="rgba(255,255,255,.75)" />
      <text x={c} y={c - 6} textAnchor="middle" fontSize="12" fill="var(--text-muted)">{h ? h.label.slice(0, 18) : label}</text>
      <text x={c} y={c + 16} textAnchor="middle" fontSize="19" fontWeight="700" fill="var(--text-strong)">{fmt(h ? h.value : total)}</text>
    </svg>
  );
}
function GRings({ items, size = 210 }) {
  const total = items.reduce((a, d) => a + d.value, 0) || 1, c = size / 2, sw = 20;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} style={{ display: 'block', flexShrink: 0, filter: 'drop-shadow(0 12px 18px rgba(23,73,170,.18))' }}>
      <defs>{items.map((d, i) => <linearGradient key={i} id={'rg' + i} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={d.g[0]} /><stop offset="1" stopColor={d.g[1]} /></linearGradient>)}</defs>
      {items.map((d, i) => { const r = c - sw / 2 - 2 - i * (sw + 9), C = 2 * Math.PI * r, f = d.value / total;
        return <g key={d.label}><circle cx={c} cy={c} r={r} fill="none" stroke="rgba(214,226,242,.65)" strokeWidth={sw} />
          <circle cx={c} cy={c} r={r} fill="none" stroke={`url(#rg${i})`} strokeWidth={sw} strokeLinecap="round" strokeDasharray={`${Math.max(C * f - 2, 0.1)} ${C}`} transform={`rotate(-90 ${c} ${c})`}><title>{d.label}: {brl0(d.value)}</title></circle></g>; })}
      <text x={c} y={c - 5} textAnchor="middle" fontSize="12" fill="var(--text-muted)">Total</text>
      <text x={c} y={c + 17} textAnchor="middle" fontSize="19" fontWeight="700" fill="var(--text-strong)">{brlK(total)}</text>
    </svg>
  );
}
function smoothPath(pts) {
  if (pts.length < 2) return '';
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    d += ` C${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

/* ======================= ESTOQUE ======================= */
const EST_CATS = ['Injetáveis', 'Preenchedores', 'Anestésicos', 'Descartáveis', 'Fios', 'Odontologia', 'Dermocosméticos'];
const UNIDADES = ['Caixa', 'Tubete', 'Kit', 'Seringa', 'Frasco', 'Ampola', 'Unidade', 'Pacote'];
const PRODUTOS0 = [
  { id: 1, nome: 'Toxina botulínica 100U', cat: 'Injetáveis', un: 'Frasco', qtd: 6, min: 4, val: '2027-03-31', vm: 1150, cons: 9 },
  { id: 2, nome: 'Ácido hialurônico 1ml', cat: 'Preenchedores', un: 'Seringa', qtd: 14, min: 8, val: '2027-08-31', vm: 420, cons: 11 },
  { id: 3, nome: 'Bioestimulador de colágeno', cat: 'Injetáveis', un: 'Frasco', qtd: 3, min: 4, val: '2026-11-30', vm: 1380, cons: 6 },
  { id: 4, nome: 'Lidocaína 2% com vaso', cat: 'Anestésicos', un: 'Tubete', qtd: 120, min: 50, val: '2027-06-30', vm: 1.9, cons: 64 },
  { id: 5, nome: 'Agulha 30G 13mm', cat: 'Descartáveis', un: 'Caixa', qtd: 9, min: 5, val: '2029-01-31', vm: 32, cons: 4 },
  { id: 6, nome: 'Cânula 22G 50mm', cat: 'Descartáveis', un: 'Caixa', qtd: 2, min: 3, val: '2028-05-31', vm: 210, cons: 2 },
  { id: 7, nome: 'Fio de PDO liso', cat: 'Fios', un: 'Kit', qtd: 4, min: 2, val: '2026-11-15', vm: 380, cons: 3 },
  { id: 8, nome: 'Gel clareador peróxido 35%', cat: 'Odontologia', un: 'Kit', qtd: 3, min: 2, val: '2026-09-20', vm: 165, cons: 5 },
  { id: 9, nome: 'Luva nitrílica M', cat: 'Descartáveis', un: 'Caixa', qtd: 18, min: 10, val: '2028-12-31', vm: 39.9, cons: 12 },
  { id: 10, nome: 'Resina composta A2', cat: 'Odontologia', un: 'Seringa', qtd: 7, min: 4, val: '2027-05-31', vm: 89, cons: 4 },
  { id: 11, nome: 'Peeling ácido glicólico 70%', cat: 'Dermocosméticos', un: 'Frasco', qtd: 1, min: 2, val: '2026-08-31', vm: 140, cons: 2 },
  { id: 12, nome: 'Máscara descartável tripla', cat: 'Descartáveis', un: 'Caixa', qtd: 12, min: 6, val: '2028-10-31', vm: 24.9, cons: 7 },
];
const PROD_STORE = makeStore(PRODUTOS0);
const STATUS_EST = { ok: ['Em estoque', '#2DBF6A'], baixo: ['Abaixo do mínimo', '#F2694A'], vence: ['Vence em breve', '#F5B400'], vencido: ['Vencido', '#E5484D'] };
const estStatus = (p) => daysTo(p.val) < 0 ? 'vencido' : p.qtd < p.min ? 'baixo' : daysTo(p.val) <= 60 ? 'vence' : 'ok';
const qFmt = (n) => Number.isInteger(n) ? n : n.toLocaleString('pt-BR');
const unPl = (u, n) => n === 1 ? u.toLowerCase() : (/[aeiou]$/i.test(u) ? u + 's' : u + 'es').toLowerCase();
const relVal = (iso) => { const d = daysTo(iso); return d < 0 ? `vencido há ${-d} dias` : d <= 90 ? `em ${d} dias` : ''; };

function ProdutosTab({ prods, setProds, cats, setCats, unis, mobile }) {
  const [nc, setNc] = React.useState(null);
  const [q, setQ] = React.useState('');
  const [st, setSt] = React.useState('todos');
  const [novo, setNovo] = React.useState(false);
  const [f, setF] = React.useState({ nome: '', cat: cats[0], un: unis[0], qtd: '', min: '', val: '', vm: '' });
  const term = q.trim().toLowerCase();
  const rows = prods.filter((p) => (st === 'todos' || estStatus(p) === st) && (!term || p.nome.toLowerCase().includes(term) || p.cat.toLowerCase().includes(term)));
  const cnt = (k) => prods.filter((p) => estStatus(p) === k).length;
  const att = prods.filter((p) => estStatus(p) !== 'ok').length;
  const adj = (id, d) => setProds((ps) => ps.map((p) => p.id === id ? { ...p, qtd: Math.max(0, p.qtd + d), cons: d < 0 ? p.cons + 1 : p.cons } : p));
  const save = () => { if (!f.nome.trim()) return; setProds((ps) => [{ id: Date.now(), nome: f.nome.trim(), cat: f.cat, un: f.un, qtd: +f.qtd || 0, min: +f.min || 0, val: f.val || '2027-12-31', vm: +String(f.vm).replace(',', '.') || 0, cons: 0 }, ...ps]); setNovo(false); setF({ nome: '', cat: cats[0], un: unis[0], qtd: '', min: '', val: '', vm: '' }); };
  const addCat = () => { const v = (nc || '').trim(); if (v) { if (!cats.includes(v)) setCats([...cats, v]); setF({ ...f, cat: v }); } setNc(null); };
  const sb = { width: 28, height: 28, borderRadius: '50%', border: '1.5px solid rgba(214,226,242,.95)', background: '#fff', color: 'var(--text-strong)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 0, flexShrink: 0 };
  const opts = [['todos', `Todos os status (${prods.length})`], ['baixo', `Abaixo do mínimo (${cnt('baixo')})`], ['vence', `Vence em breve (${cnt('vence')})`], ['vencido', `Vencidos (${cnt('vencido')})`], ['ok', `Em estoque (${cnt('ok')})`]];
  return (
    <section style={{ ...glass, padding: mobile ? 16 : 26, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div><h3 style={{ margin: 0, fontSize: mobile ? 19 : 22, fontWeight: 600, color: 'var(--text-strong)' }}>Produtos</h3>
          <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-muted)' }}>{prods.length} produtos{att ? <> · <B c="#F2694A">{att} precisam de atenção</B></> : null}</p></div>
        <OBtn size="sm" iconLeft="plus" onClick={() => setNovo(true)}>{mobile ? 'Novo' : 'Cadastrar insumo'}</OBtn>
      </div>
      <OneFilter q={q} setQ={setQ} placeholder={mobile ? 'Buscar produto' : 'Buscar produto ou categoria'} value={st} onChange={setSt} options={opts} mobile={mobile} />
      <div style={gTable}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 1000 }}>
          <thead style={{ background: 'rgba(225,236,250,.7)' }}><tr>
            {['Produto', 'Categoria', 'Unidade', 'Quantidade', 'Mínimo', 'Validade', 'Valor médio', 'Status'].map((h) => <th key={h} style={gTh}>{h}</th>)}
          </tr></thead>
          <tbody>
            {rows.map((p) => {
              const s = estStatus(p), lvl = Math.min(p.qtd / Math.max(p.min * 2, 1), 1), rv = relVal(p.val);
              return (
                <tr key={p.id} style={{ boxShadow: `inset 3px 0 0 ${s === 'ok' ? 'transparent' : STATUS_EST[s][1]}` }}>
                  <td style={{ ...gTd, fontWeight: 600, color: 'var(--text-strong)' }}>{p.nome}</td>
                  <td style={gTd}>{p.cat}</td>
                  <td style={gTd}>{p.un}</td>
                  <td style={gTd}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button type="button" title="Dar baixa de 1" aria-label={'Dar baixa em ' + p.nome} onClick={() => adj(p.id, -1)} style={sb}><OIcon name="minus" size={13} /></button>
                      <b style={{ minWidth: 30, textAlign: 'center', color: p.qtd < p.min ? '#F2694A' : 'var(--text-strong)', fontVariantNumeric: 'tabular-nums' }}>{qFmt(p.qtd)}</b>
                      <button type="button" title="Entrada de 1" aria-label={'Entrada em ' + p.nome} onClick={() => adj(p.id, 1)} style={sb}><OIcon name="plus" size={13} /></button>
                      <span style={{ width: 56, height: 6, borderRadius: 999, background: 'rgba(214,226,242,.8)', overflow: 'hidden', marginLeft: 4 }}><span style={{ display: 'block', width: lvl * 100 + '%', height: '100%', borderRadius: 999, background: p.qtd < p.min ? '#F2694A' : 'var(--gradient-blue-h)' }} /></span>
                    </div>
                  </td>
                  <td style={{ ...gTd, fontVariantNumeric: 'tabular-nums' }}>{qFmt(p.min)}</td>
                  <td style={{ ...gTd, fontVariantNumeric: 'tabular-nums' }}><span style={{ display: 'block', color: s === 'vencido' ? '#E5484D' : 'var(--text-body)' }}>{dBR(p.val)}</span>{rv ? <span style={{ fontSize: 12, color: s === 'vencido' ? '#E5484D' : '#B98400' }}>{rv}</span> : null}</td>
                  <td style={{ ...gTd, fontVariantNumeric: 'tabular-nums' }}>{brl(p.vm)}</td>
                  <td style={gTd}><Badge2 c={STATUS_EST[s][1]}>{STATUS_EST[s][0]}</Badge2></td>
                </tr>
              );
            })}
            {!rows.length ? <tr><td colSpan={8} style={{ ...gTd, textAlign: 'center', padding: 36, color: 'var(--text-muted)' }}>Nenhum produto encontrado. <button type="button" onClick={() => { setQ(''); setSt('todos'); }} style={{ border: 0, background: 'none', color: '#1F5EFF', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>Limpar filtro</button></td></tr> : null}
          </tbody>
        </table>
      </div>
      <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Use os botões da quantidade para dar baixa ou registrar entrada.</span>
      <GPortal><ODialog open={novo} onClose={() => setNovo(false)} icon="package-plus" title="Cadastrar insumo" description="Cadastre o item para controlar quantidade, validade e custo." width={620}
        footer={<><OBtn variant="secondary" onClick={() => setNovo(false)}>Cancelar</OBtn><OBtn iconLeft="check" onClick={save}>Salvar produto</OBtn></>}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
          <OInput label="Produto" placeholder="Ex.: Ácido hialurônico 1ml" value={f.nome} onChange={(e) => setF({ ...f, nome: e.target.value })} style={{ gridColumn: '1 / -1' }} />
          <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-strong)' }}>Categoria</span>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
              {cats.map((c) => <FilterChip key={c} active={f.cat === c} onClick={() => setF({ ...f, cat: c })}>{c}</FilterChip>)}
              {nc === null ? <button type="button" onClick={() => setNc('')} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 32, padding: '0 12px', borderRadius: 999, border: '1.5px dashed rgba(31,94,255,.45)', background: 'rgba(31,94,255,.04)', color: '#1F5EFF', fontFamily: 'inherit', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}><OIcon name="plus" size={13} />Nova categoria</button>
                : <span style={{ display: 'inline-flex', alignItems: 'center', height: 32, borderRadius: 999, border: '1.5px solid rgba(31,94,255,.4)', padding: '0 4px 0 12px', background: '#fff' }}><input autoFocus value={nc} onChange={(e) => setNc(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') addCat(); if (e.key === 'Escape') { e.stopPropagation(); setNc(null); } }} placeholder="Nome da categoria" style={{ width: 130, border: 0, outline: 'none', fontFamily: 'inherit', fontSize: 13 }} /><button type="button" aria-label="Adicionar categoria" onClick={addCat} style={{ width: 24, height: 24, borderRadius: '50%', border: 0, background: '#1F5EFF', color: '#fff', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}><OIcon name="check" size={13} /></button></span>}
            </div>
          </div>
          <OSelect label="Unidade de medida" options={unis} value={f.un} onChange={(e) => setF({ ...f, un: e.target.value })} />
          <OInput label="Quantidade" type="number" inputMode="numeric" placeholder="0" value={f.qtd} onChange={(e) => setF({ ...f, qtd: e.target.value })} />
          <OInput label="Mínimo" type="number" inputMode="numeric" placeholder="0" value={f.min} onChange={(e) => setF({ ...f, min: e.target.value })} />
          <OInput label="Validade" type="date" value={f.val} onChange={(e) => setF({ ...f, val: e.target.value })} />
          <OInput label="Valor médio (R$)" inputMode="decimal" placeholder="0,00" value={f.vm} onChange={(e) => setF({ ...f, vm: e.target.value })} />
        </div>
      </ODialog></GPortal>
    </section>
  );
}

function RelatoriosTab({ prods, per, mobile }) {
  const k = per / 30;
  const valorEst = prods.reduce((a, p) => a + p.qtd * p.vm, 0);
  const abaixo = prods.filter((p) => p.qtd < p.min);
  const venc = prods.filter((p) => daysTo(p.val) < 0);
  const consumo = prods.map((p) => ({ ...p, c: Math.max(Math.round(p.cons * k), p.cons ? 1 : 0), cv: Math.max(Math.round(p.cons * k), p.cons ? 1 : 0) * p.vm })).sort((a, b) => b.cv - a.cv);
  const consTotal = consumo.reduce((a, p) => a + p.cv, 0);
  const porCat = EST_CATS.map((c) => ({ label: c, value: consumo.filter((p) => p.cat === c).reduce((a, p) => a + p.cv, 0) })).filter((d) => d.value).sort((a, b) => b.value - a.value).map((d, i) => ({ ...d, color: PAL[i] }));
  const atencao = prods.filter((p) => estStatus(p) !== 'ok').map((p) => ({ ...p, s: estStatus(p), rep: Math.max(p.min * 2 - p.qtd, 0) }));
  const repor = abaixo.reduce((a, p) => a + (p.min * 2 - p.qtd) * p.vm, 0);
  const g = mobile ? 14 : 22;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: g }}>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'minmax(0,1fr) minmax(0,1fr)' : 'repeat(auto-fit, minmax(210px,1fr))', gap: g }}>
        <KpiTile mobile={mobile} icon="package" title="Total de produtos" value={String(prods.length)} note={<><B>{prods.reduce((a, p) => a + p.qtd, 0)}</B> unidades em {new Set(prods.map((p) => p.cat)).size} categorias.</>} />
        <KpiTile mobile={mobile} icon="wallet" title="Valor em estoque" value={brlK(valorEst)} note="Quanto vale hoje o que está guardado, pelo custo médio." />
        <KpiTile mobile={mobile} icon="triangle-alert" title="Abaixo do mínimo" value={String(abaixo.length)} note={<>Repor tudo custa cerca de <B>{brlK(repor)}</B>.</>} />
        <KpiTile mobile={mobile} icon="calendar-x" title="Produtos vencidos" value={String(venc.length)} note={<>Perda de <B c="#E5484D">{brl0(venc.reduce((a, p) => a + p.qtd * p.vm, 0))}</B>. Descarte e dê baixa.</>} />
        <KpiTile mobile={mobile} icon="trending-down" title="Consumo no período" value={brlK(consTotal)} note={<><B>{consumo.reduce((a, p) => a + p.c, 0)}</B> itens usados nos últimos {per} dias.</>} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'minmax(0,1.2fr) minmax(0,1fr)', gap: g }}>
        <ChartCard title="Consumo por categoria" mobile={mobile}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}><span style={{ fontSize: 34, fontWeight: 600, color: 'var(--text-strong)', letterSpacing: '-0.02em' }}>{brlK(consTotal)}</span><span style={{ fontSize: 15, color: 'var(--text-muted)' }}>consumidos</span></div>
          <div style={{ display: 'flex', height: 14, borderRadius: 999, overflow: 'hidden', gap: 3, background: 'rgba(255,255,255,.5)', border: '1.5px solid rgba(255,255,255,.95)' }}>
            {porCat.map((c) => <span key={c.label} title={c.label} style={{ width: (c.value / consTotal * 100) + '%', minWidth: 4, background: `linear-gradient(90deg, ${c.color}, color-mix(in srgb, ${c.color} 70%, white))`, borderRadius: 999 }} />)}
          </div>
          <ShareRows data={porCat} total={consTotal} cols={mobile ? 1 : 2} />
        </ChartCard>
        <ChartCard title="Precisa de atenção" mobile={mobile} right={<span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{atencao.length} itens</span>}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {atencao.map((p) => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 16, background: 'rgba(255,255,255,.6)', border: '1.5px solid rgba(255,255,255,.95)', boxShadow: `inset 3px 0 0 ${STATUS_EST[p.s][1]}` }}>
                <span style={{ flex: 1, minWidth: 0 }}><span style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--text-strong)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.nome}</span>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.s === 'vencido' ? `Venceu em ${dBR(p.val)} · ${p.qtd} ${unPl(p.un, p.qtd)}` : p.s === 'vence' ? `Vence em ${daysTo(p.val)} dias` : `Tem ${p.qtd}, o mínimo é ${p.min}`}</span></span>
                <Badge2 c={STATUS_EST[p.s][1]}>{p.s === 'vencido' ? 'Descartar' : p.s === 'vence' ? 'Usar primeiro' : `Repor ${p.rep}`}</Badge2>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>
      <ChartCard title="Mais consumidos no período" mobile={mobile}>
        <ShareRows data={consumo.slice(0, 8).map((p) => ({ label: `${p.nome} (${p.c} ${unPl(p.un, p.c)})`, value: p.cv, color: BRAND.blue, grad: 'var(--gradient-blue-h)' }))} total={consumo[0] ? consumo[0].cv : 1} cols={mobile ? 1 : 2} fmt={brl0} />
      </ChartCard>
    </div>
  );
}

function CadastrosEstoque({ cats, setCats, unis, setUnis, prods, mobile }) {
  const [nv, setNv] = React.useState({ cat: '', un: '' });
  const lists = [['cat', 'Categorias de insumo', 'tags', cats, setCats, (c) => prods.filter((p) => p.cat === c).length], ['un', 'Unidades de medida', 'ruler', unis, setUnis, (u) => prods.filter((p) => p.un === u).length]];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: mobile ? 14 : 22 }}>
      {lists.map(([k, t, ic, arr, setArr, count]) => {
        const add = () => { const v = nv[k].trim(); if (v && !arr.includes(v)) setArr([...arr, v]); setNv({ ...nv, [k]: '' }); };
        return (
          <section key={k} style={{ ...glass, padding: mobile ? 16 : 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <CardTitle size={19}>{t}</CardTitle>
            {arr.map((x) => { const n = count(x); return (
              <div key={x} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 14, background: 'rgba(255,255,255,.6)', border: '1.5px solid rgba(255,255,255,.95)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1F5EFF' }} /><span style={{ flex: 1, fontSize: 14, color: 'var(--text-strong)' }}>{x}</span>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{n} {n === 1 ? 'produto' : 'produtos'}</span>
                <button type="button" aria-label={'Remover ' + x} title={n ? 'Em uso por produtos cadastrados' : 'Remover'} disabled={!!n} onClick={() => setArr(arr.filter((y) => y !== x))} style={{ border: 0, background: 'none', color: 'var(--text-muted)', cursor: n ? 'not-allowed' : 'pointer', opacity: n ? .35 : 1, padding: 4, display: 'flex' }}><OIcon name="x" size={14} /></button>
              </div>); })}
            <div style={{ display: 'flex', gap: 8 }}><div style={{ flex: 1 }}><OInput placeholder={k === 'cat' ? 'Nova categoria' : 'Nova unidade (ex.: Ampola)'} value={nv[k]} onChange={(e) => setNv({ ...nv, [k]: e.target.value })} onKeyDown={(e) => e.key === 'Enter' && add()} /></div><OBtn iconLeft="plus" onClick={add}>Adicionar</OBtn></div>
          </section>
        );
      })}
    </div>
  );
}

function EstoqueScreen({ mobile }) {
  const [tab, setTab] = React.useState('produtos');
  const [per, setPer] = React.useState(30);
  const [prods, setProds] = useStore(PROD_STORE);
  const [cats, setCats] = React.useState(EST_CATS);
  const [unis, setUnis] = React.useState(UNIDADES);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 14 : 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
        <GTabs items={[['produtos', 'Produtos', 'package'], ['relatorios', 'Relatórios', 'chart-column'], ['cad', 'Categorias e unidades', 'tags']]} value={tab} onChange={setTab} />
        {tab === 'relatorios' ? <PeriodSelect value={per} onChange={setPer} /> : null}
      </div>
      {tab === 'produtos' ? <ProdutosTab prods={prods} setProds={setProds} cats={cats} setCats={setCats} unis={unis} mobile={mobile} /> : null}
      {tab === 'relatorios' ? <RelatoriosTab prods={prods} per={per} mobile={mobile} /> : null}
      {tab === 'cad' ? <CadastrosEstoque cats={cats} setCats={setCats} unis={unis} setUnis={setUnis} prods={prods} mobile={mobile} /> : null}
    </div>
  );
}

/* ======================= FINANCEIRO ======================= */
const FIN_PROS = ['Dra. Camila Rocha', 'Darlene Robertson', 'Max Worthington', 'Dr. McCoy'];
const FIN_METAS = [45000, 24000, 9000, 7000];
const FIN_PROCS = [
  { n: 'Toxina botulínica', v: 1400, q: 16, cat: 'Estética', pro: [0, 1] },
  { n: 'Preenchimento labial', v: 1600, q: 8, cat: 'Estética', pro: [0] },
  { n: 'Bioestimulador', v: 2400, q: 6, cat: 'Estética', pro: [0, 1] },
  { n: 'Fios de PDO', v: 2200, q: 3, cat: 'Estética', pro: [0] },
  { n: 'Harmonização facial', v: 4800, q: 2, cat: 'Estética', pro: [0] },
  { n: 'Limpeza de pele', v: 220, q: 14, cat: 'Estética', pro: [1] },
  { n: 'Peeling químico', v: 380, q: 7, cat: 'Estética', pro: [1] },
  { n: 'Clareamento dental', v: 900, q: 6, cat: 'Odontologia', pro: [2, 3] },
  { n: 'Limpeza dental', v: 200, q: 14, cat: 'Odontologia', pro: [2, 3], conv: 1 },
  { n: 'Restauração', v: 350, q: 10, cat: 'Odontologia', pro: [2, 3], conv: .8 },
  { n: 'Tratamento de canal', v: 1200, q: 3, cat: 'Odontologia', pro: [3], conv: 1 },
  { n: 'Avaliação', v: 150, q: 14, cat: 'Consulta', pro: [0, 1, 2, 3], conv: .5 },
];
const FORMAS = ['Pix', 'Cartão de crédito', 'Cartão de débito', 'Dinheiro', 'Boleto', 'Convênio'];
const PAC_NOMES = PAC.map((p) => p.nome).concat(['Ana Clara Mendes', 'Roberto Siqueira', 'Patrícia Gomes', 'Diego Cardoso', 'Larissa Vieira', 'Eduardo Faria', 'Renata Moura', 'Vinícius Amaral']);
function genReceitas() {
  const r = gRand(20261002); const out = []; let id = 1;
  [0, 1, 2, 3, 4, 5].forEach((w) => {
    const days = []; for (let i = 29; i >= 0; i--) { const d = addD(TODAY, -(i + 30 * w)); if (d.getDay() !== 0) days.push(d); }
    FIN_PROCS.forEach((pr) => { const qn = w ? Math.max(1, Math.round(pr.q * (1 - 0.035 * w) + (r() - 0.5) * 2)) : pr.q; for (let i = 0; i < qn; i++) {
      const d = days[Math.floor(r() * days.length)]; const conv = pr.conv && r() < pr.conv;
      const forma = conv ? 'Convênio' : (() => { const x = r(); return x < .4 ? 'Pix' : x < .75 ? 'Cartão de crédito' : x < .9 ? 'Cartão de débito' : x < .96 ? 'Dinheiro' : 'Boleto'; })();
      const parc = forma === 'Cartão de crédito' && pr.v >= 900 ? [1, 2, 3, 4, 6][Math.floor(r() * 5)] : 1;
      const desc = !conv && pr.v >= 1400 && r() < .3 ? Math.round(pr.v * (r() < .5 ? .05 : .1)) : 0;
      const val = conv ? Math.round(pr.v * .7) : pr.v;
      const venc = conv ? isoOf(addD(d, 30)) : forma === 'Boleto' ? isoOf(addD(d, 15)) : isoOf(d);
      const pend = venc > TODAY_ISO ? true : r() < .03;
      out.push({ id: id++, data: isoOf(d), pac: PAC_NOMES[Math.floor(r() * PAC_NOMES.length)], proc: pr.n, pro: FIN_PROS[pr.pro[Math.floor(r() * pr.pro.length)]], cat: pr.cat, atend: conv ? 'Convênio' : 'Particular', total: val, desc, forma, parc, venc, status: pend ? 'Pendente' : 'Recebido' });
    } });
  });
  return out.sort((a, b) => b.data.localeCompare(a.data) || b.id - a.id);
}
const DESP_CATS = ['Folha de pagamento', 'Insumos e fornecedores', 'Aluguel', 'Marketing', 'Impostos', 'Laboratório', 'Energia e água', 'Serviços e software', 'Manutenção'];
const DESP_BASE = [
  { desc: 'Salários e encargos', cat: 'Folha de pagamento', forn: 'Equipe', total: 16800, forma: 'Pix', data: '2026-09-05' },
  { desc: 'Aluguel da clínica', cat: 'Aluguel', forn: 'Imobiliária Central', total: 7500, forma: 'Boleto', data: '2026-09-10' },
  { desc: 'Toxina botulínica (6 frascos)', cat: 'Insumos e fornecedores', forn: 'Distribuidora Med', total: 6900, forma: 'Boleto', data: '2026-09-08', parc: 2 },
  { desc: 'Ácido hialurônico (10 seringas)', cat: 'Insumos e fornecedores', forn: 'Distribuidora Med', total: 4200, forma: 'Boleto', data: '2026-09-15' },
  { desc: 'Bioestimulador (3 frascos)', cat: 'Insumos e fornecedores', forn: 'Estetic Supply', total: 4140, forma: 'Cartão de crédito', data: '2026-09-22', parc: 3 },
  { desc: 'Descartáveis e EPIs', cat: 'Insumos e fornecedores', forn: 'Dental Center', total: 1180, forma: 'Pix', data: '2026-09-18' },
  { desc: 'Tráfego pago (Meta e Google)', cat: 'Marketing', forn: 'Agência parceira', total: 3500, forma: 'Pix', data: '2026-09-12' },
  { desc: 'Social media', cat: 'Marketing', forn: 'Agência parceira', total: 2200, forma: 'Pix', data: '2026-09-12' },
  { desc: 'Simples Nacional', cat: 'Impostos', forn: 'Receita Federal', total: 5160, forma: 'Boleto', data: '2026-09-20' },
  { desc: 'Prótese e laboratório', cat: 'Laboratório', forn: 'Lab Sorriso', total: 1900, forma: 'Boleto', data: '2026-09-25' },
  { desc: 'Energia elétrica', cat: 'Energia e água', forn: 'Elektro', total: 1020, forma: 'Boleto', data: '2026-09-16' },
  { desc: 'Água e esgoto', cat: 'Energia e água', forn: 'SAAE', total: 360, forma: 'Boleto', data: '2026-09-16' },
  { desc: 'Sistema Salute IA', cat: 'Serviços e software', forn: 'Salute IA', total: 497, forma: 'Cartão de crédito', data: '2026-09-05' },
  { desc: 'Contabilidade', cat: 'Serviços e software', forn: 'Contábil Itapira', total: 890, forma: 'Pix', data: '2026-09-10' },
  { desc: 'Manutenção do autoclave', cat: 'Manutenção', forn: 'TecMed', total: 650, forma: 'Pix', data: '2026-09-29' },
];
const DESPESAS0 = [
  { desc: 'Aluguel da clínica', cat: 'Aluguel', forn: 'Imobiliária Central', total: 7500, forma: 'Boleto', data: '2026-10-10', status: 'Pendente' },
  { desc: 'Simples Nacional', cat: 'Impostos', forn: 'Receita Federal', total: 5340, forma: 'Boleto', data: '2026-10-20', status: 'Pendente' },
  ...DESP_BASE.map((d) => ({ ...d, status: 'Pago' })),
  ...[1, 2, 3, 4, 5].flatMap((m) => DESP_BASE.filter((d, i) => d.cat !== 'Manutenção' || m % 2 === 0).map((d, i) => ({ ...d, total: Math.round(d.total * (1 - 0.025 * m + ((i + m) % 4) * 0.012)), data: isoOf(addD(new Date(d.data + 'T00:00:00'), -30 * m)), status: 'Pago' }))),
].map((d, i) => ({ id: i + 1, parc: 1, venc: d.data, ...d }));
const liq = (r) => r.total - (r.desc || 0);
const REC_STORE = makeStore(genReceitas());
const DESP_STORE = makeStore(DESPESAS0);

function finStats(rec, desp, per, prev) {
  const R = rec.filter((r) => inWin(r.data, per, prev)), D = desp.filter((d) => inWin(d.data, per, prev));
  const fat = R.reduce((a, r) => a + liq(r), 0), receb = R.filter((r) => r.status === 'Recebido').reduce((a, r) => a + liq(r), 0);
  const totD = D.reduce((a, d) => a + d.total, 0);
  return { R, D, fat, receb, aRec: fat - receb, nPend: R.filter((r) => r.status === 'Pendente').length, totD, lucro: fat - totD, ticket: fat / Math.max(R.length, 1) };
}

function FinKpis({ s, p, rec, per, mobile }) {
  const prox = rec.filter((r) => r.status === 'Pendente' && r.venc >= TODAY_ISO).map((r) => r.venc).sort()[0];
  const recP = s.receb / (s.fat || 1) * 100, despP = s.totD / (s.fat || 1) * 100, marg = s.lucro / (s.fat || 1) * 100;
  const neg = s.lucro < 0;
  const g = mobile ? 12 : 22;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: mobile ? 'minmax(0,1fr) minmax(0,1fr)' : 'repeat(3, minmax(0,1fr))', gap: g }}>
      <KpiTile mobile={mobile} icon="banknote" title="Faturamento do período" value={brlK(s.fat)} trend={trendOf(s.fat, p.fat)} note={<>Tudo o que foi vendido em <B>{s.R.length} atendimentos</B> nos últimos {per} dias.</>} />
      <KpiTile mobile={mobile} icon="circle-check" title="Total recebido" value={brlK(s.receb)} bar={recP} note={<><B>{pct0(recP)}</B> do faturamento já entrou no caixa.</>} />
      <KpiTile mobile={mobile} icon="clock" title="A receber" value={brlK(s.aRec)} bar={100 - recP} barBg="linear-gradient(90deg,#22C3F2,#9DB8F2)" note={<><B>{s.nPend} pagamentos</B> ainda vão entrar{prox ? <>. O próximo vence em <B>{dBR(prox).slice(0, 5)}</B></> : null}.</>} />
      <KpiTile mobile={mobile} icon="receipt" title="Total despesas" value={brlK(s.totD)} bar={despP} barBg="repeating-linear-gradient(135deg,#9DB8F2 0 4px,#C9D6EA 4px 8px)" note={<>De cada <B>R$ 100</B> faturados, <B>R$ {Math.round(despP)}</B> foram para custos.</>} />
      <KpiTile mobile={mobile} icon="piggy-bank" title="Lucro líquido" value={(neg ? 'Prejuízo ' : '') + brlK(Math.abs(s.lucro))} trend={neg ? null : trendOf(s.lucro, p.lucro)} bar={neg ? 0 : marg} barBg="var(--gradient-brand)" note={neg ? <>As despesas passaram o faturamento neste período.</> : <>Sobram <B c="#7B4BC4">R$ {Math.round(marg)}</B> de cada R$ 100 faturados (margem de {pct1(marg)}).</>} />
      <KpiTile mobile={mobile} icon="ticket" title="Ticket médio" value={brl0(s.ticket)} trend={trendOf(s.ticket, p.ticket)} note="Quanto cada paciente pagou, em média, por atendimento." />
    </div>
  );
}

function CashFlow({ s, rec, desp, per, mobile }) {
  const [hov, setHov] = React.useState(null);
  const n = per, days = Array.from({ length: n }, (_, i) => isoOf(addD(TODAY, i - (n - 1))));
  let fa = 0, ca = 0;
  const fat = days.map((d) => (fa += s.R.filter((r) => r.data === d).reduce((a, r) => a + liq(r), 0)));
  const cus = days.map((d) => (ca += s.D.filter((x) => x.data === d).reduce((a, x) => a + x.total, 0)));
  const W = 1000, H = 280, top = Math.max(fat[n - 1], ...cus, 1) * 1.08;
  const X = (i) => n === 1 ? W / 2 : i / (n - 1) * W, Y = (v) => H - v / top * (H - 12);
  const fp = fat.map((v, i) => [X(i), Y(v)]), cp = cus.map((v, i) => [X(i), Y(v)]);
  const fLine = smoothPath(fp), cLine = smoothPath(cp);
  const lucro = s.fat - s.totD, custoP = Math.min(s.totD / (s.fat || 1) * 100, 100), neg = lucro < 0;
  const prox = { rec: rec.filter((r) => r.status === 'Pendente' && r.venc > TODAY_ISO).reduce((a, r) => a + liq(r), 0), pag: desp.filter((d) => d.status === 'Pendente').reduce((a, d) => a + d.total, 0) };
  const fig = (l, v, sw, extra) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)' }}><span style={{ width: 12, height: 12, borderRadius: 4, background: sw, flexShrink: 0 }} />{l}</span>
      <span style={{ fontSize: mobile ? 20 : 28, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--text-strong)', fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>{v}</span>
      {extra ? <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{extra}</span> : null}
    </div>
  );
  const hatch = 'repeating-linear-gradient(135deg,#9DB8F2 0 4px,#C9D6EA 4px 8px)';
  const h = hov;
  return (
    <ChartCard title="Fluxo de caixa" mobile={mobile} right={mobile ? null : <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Acumulado dos últimos {per} dias</span>}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: mobile ? 10 : 22 }}>
        {fig('Faturou', brlK(s.fat), 'var(--gradient-blue)', '100%')}
        {fig('Custos', brlK(s.totD), hatch, pct0(s.totD / (s.fat || 1) * 100) + ' do faturado')}
        {fig(neg ? 'Prejuízo' : 'Lucro', brlK(Math.abs(lucro)), 'var(--gradient-brand)', neg ? 'custos acima do faturado' : pct0(lucro / (s.fat || 1) * 100) + ' do faturado')}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', height: 18, borderRadius: 999, overflow: 'hidden', gap: 3, background: 'rgba(255,255,255,.5)', border: '1.5px solid rgba(255,255,255,.95)' }}>
          <span style={{ width: custoP + '%', background: hatch, borderRadius: 999 }} />
          {!neg ? <span style={{ flex: 1, background: 'var(--gradient-brand)', borderRadius: 999 }} /> : null}
        </div>
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{neg ? 'Neste período os custos foram maiores que o faturamento.' : <>A barra inteira é o faturado: a parte listrada foi custo e a parte roxa virou lucro.</>}</span>
      </div>
      <div style={{ display: 'flex', gap: 14, alignItems: 'stretch' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 0 }} onMouseLeave={() => setHov(null)}>
          <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: '100%', height: mobile ? 200 : 280, display: 'block', overflow: 'visible' }}>
            <defs>
              <linearGradient id="cfFat" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#1F5EFF" stopOpacity=".16" /><stop offset="1" stopColor="#1F5EFF" stopOpacity="0" /></linearGradient>
              <linearGradient id="cfLine" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stopColor="#0A4BFF" /><stop offset="1" stopColor="#1FC8FF" /></linearGradient>
              <linearGradient id="cfLucro" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stopColor="#4F7BE6" stopOpacity=".35" /><stop offset="1" stopColor="#7B4BC4" stopOpacity=".45" /></linearGradient>
              <pattern id="cfHatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="8" height="8" fill="rgba(157,184,242,.12)" /><line x1="0" y1="0" x2="0" y2="8" stroke="rgba(10,92,255,.28)" strokeWidth="2" /></pattern>
              <clipPath id="cfAbove"><path d={cLine + ` L${W} 0 L0 0 Z`} /></clipPath>
            </defs>
            {[0.25, 0.5, 0.75, 1].map((t) => <line key={t} x1="0" x2={W} y1={H - t * (H - 12)} y2={H - t * (H - 12)} stroke="rgba(150,175,210,.3)" strokeWidth="1" vectorEffect="non-scaling-stroke" />)}
            <path d={fLine + ` L${W} ${H} L0 ${H} Z`} fill="url(#cfFat)" />
            <path d={cLine + ` L${W} ${H} L0 ${H} Z`} fill="url(#cfHatch)" />
            <path d={fLine + ` L${W} ${H} L0 ${H} Z`} fill="url(#cfLucro)" clipPath="url(#cfAbove)" />
            <path d={cLine} fill="none" stroke="#8FA9E8" strokeWidth="2.5" strokeDasharray="6 5" vectorEffect="non-scaling-stroke" />
            <path d={fLine} fill="none" stroke="url(#cfLine)" strokeWidth="3.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            {h !== null ? <line x1={X(h)} x2={X(h)} y1="0" y2={H} stroke="rgba(31,94,255,.35)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" /> : null}
            {days.map((d, i) => <rect key={d} x={X(i) - W / n / 2} y="0" width={W / n} height={H} fill="transparent" onMouseEnter={() => setHov(i)} />)}
          </svg>
          {h !== null ? <>
            <span style={{ position: 'absolute', left: `calc(${X(h) / W * 100}% - 6px)`, top: `calc(${fp[h][1] / H * 100}% - 6px)`, width: 12, height: 12, borderRadius: '50%', background: '#fff', border: '3px solid #1F5EFF', boxSizing: 'border-box', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 6, left: `clamp(0px, calc(${X(h) / W * 100}% - 100px), calc(100% - 200px))`, width: 200, padding: '10px 14px', borderRadius: 14, background: 'var(--surface-inverse, #0E2350)', color: '#fff', fontSize: 12, lineHeight: 1.7, pointerEvents: 'none', boxShadow: '0 12px 24px -12px rgba(0,0,0,.5)' }}>
              <b style={{ fontSize: 13 }}>Até {dBR(days[h]).slice(0, 5)}</b><br />Faturou: {brl0(fat[h])}<br />Custos: {brl0(cus[h])}<br />{fat[h] - cus[h] < 0 ? 'Prejuízo' : 'Lucro'}: {brl0(Math.abs(fat[h] - cus[h]))}</div>
          </> : null}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 11, color: 'var(--text-subtle)' }}>{[0, Math.round((n - 1) / 4), Math.round((n - 1) / 2), Math.round((n - 1) * 3 / 4), n - 1].filter((v, i, a) => a.indexOf(v) === i).map((i) => <span key={i}>{dBR(days[i]).slice(0, 5)}</span>)}</div>
        </div>
        {mobile ? null : (
          <div style={{ position: 'relative', width: 150, flexShrink: 0, height: 280 }}>
            {[[fp[n - 1][1], 'Faturou', s.fat, '#1F5EFF', -40], [cp[n - 1][1], 'Custos', s.totD, '#6F8FD8', 4]].map(([y, l, v, c, off]) => (
              <div key={l} style={{ position: 'absolute', left: 0, top: `calc(${y / H * 100}% + ${off}px)`, display: 'flex', flexDirection: 'column', paddingLeft: 10, borderLeft: `3px solid ${c}` }}>
                <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{l}</span><span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-strong)' }}>{brlK(v)}</span>
              </div>
            ))}
            {!neg ? <div style={{ position: 'absolute', left: 0, top: `${(fp[n - 1][1] + cp[n - 1][1]) / 2 / H * 100}%`, transform: 'translateY(-50%)', padding: '6px 10px', borderRadius: 12, background: 'var(--gradient-brand)', color: '#fff', boxShadow: '0 8px 16px -8px rgba(123,75,196,.7)' }}>
              <span style={{ display: 'block', fontSize: 11, opacity: .85 }}>Lucro</span><span style={{ fontSize: 14, fontWeight: 700 }}>{brlK(lucro)}</span></div> : null}
          </div>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', fontSize: 13, color: 'var(--text-muted)' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 18, height: 3, borderRadius: 2, background: 'var(--gradient-blue-h)' }} />Faturado acumulado</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 18, height: 0, borderTop: '2.5px dashed #8FA9E8' }} />Custos acumulados</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><span style={{ width: 14, height: 10, borderRadius: 3, background: 'linear-gradient(90deg,rgba(79,123,230,.45),rgba(123,75,196,.55))' }} />Lucro (espaço entre as linhas)</span>
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '12px 16px', borderRadius: 16, background: 'linear-gradient(90deg, rgba(31,94,255,.07), rgba(123,75,196,.07))', fontSize: 13, color: 'var(--text-body)' }}>
        <OIcon name="calendar-clock" size={16} color="#1F5EFF" /><span>Próximos 30 dias: <B c="#1F5EFF">{brlK(prox.rec)}</B> para receber e <B c="#6F8FD8">{brlK(prox.pag)}</B> para pagar.</span>
      </div>
    </ChartCard>
  );
}

function ProBars({ rows, mobile }) {
  const [profs] = useStore(PROF_STORE);
  const top = Math.max(...rows.map((x) => Math.max(x.value, x.target)), 1) * 1.04;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 14 : 16 }}>
      {rows.map((r) => { const pf = profs.find((x) => x.nome === r.nome); const hit = r.value >= r.target; return (
        <div key={r.nome} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <OAv name={r.nome} src={(pf && pf.foto) || undefined} size={mobile ? 38 : 44} ring />
          <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
              <span style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}><b style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}>{r.nome}</b>{mobile ? null : <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 8 }}>{pf ? pf.esp + ' · ' : ''}{r.n} atendimentos</span>}</span>
              <span style={{ fontSize: 14, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}><b style={{ color: 'var(--text-strong)' }}>{brlK(r.value)}</b><span style={{ fontSize: 12, color: hit ? '#2DBF6A' : 'var(--text-muted)', marginLeft: 6 }}>{hit ? 'meta batida' : 'meta ' + brlK(r.target)}</span></span>
            </div>
            <div style={{ position: 'relative', height: mobile ? 14 : 18, borderRadius: 999, background: 'rgba(214,226,242,.55)', overflow: 'hidden' }}>
              <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: r.target / top * 100 + '%', background: 'var(--pattern-hatch)', borderRadius: 999, opacity: .7 }} />
              <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: r.value / top * 100 + '%', background: 'var(--gradient-blue-h)', borderRadius: 999, boxShadow: '0 6px 14px -8px rgba(10,92,255,.7)' }} />
              <span style={{ position: 'absolute', top: -2, bottom: -2, left: `calc(${r.target / top * 100}% - 1px)`, width: 2, background: '#0E2350', opacity: .45, borderRadius: 2 }} />
            </div>
          </div>
        </div>); })}
    </div>
  );
}

function VisaoGeral({ rec, desp, per, mobile }) {
  const s = finStats(rec, desp, per), p = finStats(rec, desp, per, true);
  const R = s.R;
  const sumBy = (key, keys) => keys.map((k) => ({ label: k, value: R.filter((r) => r[key] === k).reduce((a, r) => a + liq(r), 0) })).filter((d) => d.value).sort((a, b) => b.value - a.value);
  const porProc = sumBy('proc', FIN_PROCS.map((x) => x.n));
  const top = porProc.slice(0, 6), rest = porProc.slice(6).reduce((a, d) => a + d.value, 0);
  const procData = [...top, ...(rest ? [{ label: 'Outros', value: rest }] : [])].map((d, i) => ({ ...d, color: PAL[i] }));
  const k = per / 30;
  const porPro = FIN_PROS.map((pp, i) => ({ nome: pp, value: R.filter((r) => r.pro === pp).reduce((a, r) => a + liq(r), 0), target: FIN_METAS[i] * k, n: R.filter((r) => r.pro === pp).length })).sort((a, b) => b.value - a.value);
  const atend = [['Particular', ['#0A4BFF', '#1FC8FF'], '#1F5EFF'], ['Convênio', ['#7B4BC4', '#C084FC'], '#7B4BC4']].map(([l, g, c]) => ({ label: l, value: R.filter((r) => r.atend === l).reduce((a, r) => a + liq(r), 0), g, color: c, grad: `linear-gradient(90deg, ${g[0]}, ${g[1]})` }));
  const atTot = atend.reduce((a, d) => a + d.value, 0);
  const g = mobile ? 14 : 22;
  const metaHit = porPro.filter((x) => x.value >= x.target).length;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: g }}>
      <FinKpis s={s} p={p} rec={rec} per={per} mobile={mobile} />
      <CashFlow s={s} rec={rec} desp={desp} per={per} mobile={mobile} />
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'minmax(0,1fr) minmax(0,1.5fr)', gap: g }}>
        <ChartCard title="Faturamento por atendimento" mobile={mobile}>
          <div style={{ display: 'flex', justifyContent: 'center' }}><GRings items={atend} size={mobile ? 190 : 220} /></div>
          <ShareRows data={atend} total={atTot} />
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Anel de fora: particular. Anel de dentro: convênio.</span>
        </ChartCard>
        <ChartCard title="Faturamento por profissional" mobile={mobile} right={<Legend items={[['Realizado', '#1F5EFF'], ['Meta', '#9DB8F2']]} />}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}><span style={{ fontSize: mobile ? 28 : 34, fontWeight: 600, color: 'var(--text-strong)', letterSpacing: '-0.02em' }}>{metaHit} de {porPro.length}</span><span style={{ fontSize: 15, color: 'var(--text-muted)' }}>profissionais bateram a meta</span></div>
          <ProBars rows={porPro} mobile={mobile} />
          <span style={{ fontSize: 12, color: 'var(--text-subtle)', marginTop: -6 }}>A parte listrada é o que falta para bater a meta do período.</span>
        </ChartCard>
      </div>
      <ChartCard title="Faturamento por procedimento" mobile={mobile}>
        <div style={{ display: 'flex', gap: mobile ? 18 : 36, alignItems: 'center', flexWrap: mobile ? 'wrap' : 'nowrap', justifyContent: 'center' }}>
          <GDonut data={procData} size={mobile ? 190 : 230} />
          <div style={{ flex: 1, minWidth: 0, width: mobile ? '100%' : 'auto' }}><ShareRows data={procData} total={s.fat} cols={mobile ? 1 : 2} /></div>
        </div>
      </ChartCard>
    </div>
  );
}

const gTh = { textAlign: 'left', padding: '14px 12px', fontSize: 12, fontWeight: 500, color: 'var(--text-strong)', textTransform: 'uppercase', letterSpacing: '.02em', whiteSpace: 'nowrap' };
const gTd = { padding: '12px 12px', fontSize: 14, color: 'var(--text-body)', borderTop: '1px solid rgba(214,226,242,.9)', whiteSpace: 'nowrap' };
const gTable = { overflowX: 'auto', overflowY: 'hidden', scrollbarWidth: 'thin', scrollbarColor: 'rgba(150,175,210,.5) transparent', borderRadius: 18, background: 'rgba(255,255,255,.35)', border: '1.5px solid rgba(255,255,255,.9)' };

function LancTable({ kind, rows, onToggle }) {
  const isR = kind === 'rec';
  return (
    <div style={gTable}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: isR ? 1240 : 1000 }}>
        <thead style={{ background: 'rgba(225,236,250,.7)' }}><tr>
          {(isR ? ['Data', 'Paciente', 'Procedimento', 'Profissional', 'Categoria', 'Atendimento', 'Valor', 'Desconto', 'Pagamento', 'Vencimento', 'Status'] : ['Data', 'Descrição', 'Categoria', 'Fornecedor', 'Valor', 'Pagamento', 'Vencimento', 'Status']).map((h) => <th key={h} style={gTh}>{h}</th>)}
        </tr></thead>
        <tbody>
          {rows.map((r) => {
            const done = r.status === 'Recebido' || r.status === 'Pago';
            const late = !done && r.venc < TODAY_ISO;
            return (
              <tr key={r.id}>
                <td style={{ ...gTd, fontVariantNumeric: 'tabular-nums' }}>{dBR(r.data)}</td>
                {isR ? <>
                  <td style={{ ...gTd, fontWeight: 600, color: 'var(--text-strong)' }}>{r.pac}</td><td style={gTd}>{r.proc}</td><td style={gTd}>{r.pro}</td><td style={gTd}>{r.cat}</td>
                  <td style={gTd}><Badge2 c={r.atend === 'Convênio' ? '#7B4BC4' : '#1F5EFF'}>{r.atend}</Badge2></td>
                  <td style={{ ...gTd, fontWeight: 600, color: 'var(--text-strong)', fontVariantNumeric: 'tabular-nums' }}>{brl(liq(r))}</td>
                  <td style={{ ...gTd, color: r.desc ? '#1F5EFF' : 'var(--text-subtle)', fontVariantNumeric: 'tabular-nums' }}>{r.desc ? brl(r.desc) : 'Sem desconto'}</td>
                </> : <>
                  <td style={{ ...gTd, fontWeight: 600, color: 'var(--text-strong)' }}>{r.desc}</td><td style={gTd}>{r.cat}</td><td style={gTd}>{r.forn}</td>
                  <td style={{ ...gTd, fontWeight: 600, color: 'var(--text-strong)', fontVariantNumeric: 'tabular-nums' }}>{brl(r.total)}</td>
                </>}
                <td style={gTd}>{r.forma + (r.parc > 1 ? ` em ${r.parc}x` : '')}</td>
                <td style={{ ...gTd, fontVariantNumeric: 'tabular-nums', color: late ? '#E5484D' : 'var(--text-body)' }}>{dBR(r.venc)}{late ? ' · atrasado' : ''}</td>
                <td style={gTd}><Badge2 c={done ? '#2DBF6A' : '#F5B400'} onClick={() => onToggle(r.id)} title={done ? 'Clique para voltar a pendente' : 'Clique para marcar como ' + (isR ? 'recebido' : 'pago')}>{r.status}</Badge2></td>
              </tr>
            );
          })}
          {!rows.length ? <tr><td colSpan={11} style={{ ...gTd, textAlign: 'center', padding: 36, color: 'var(--text-muted)' }}>Nenhum lançamento encontrado.</td></tr> : null}
        </tbody>
      </table>
    </div>
  );
}

function ChipPick({ label, opts, value, onChange }) {
  return <div style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: '1 / -1' }}><span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-strong)' }}>{label}</span><div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{opts.map((o) => <FilterChip key={o} active={value === o} onClick={() => onChange(o)}>{o}</FilterChip>)}</div></div>;
}

function LancamentosTab({ kind, list, setList, cats, mobile }) {
  const isR = kind === 'rec';
  const [q, setQ] = React.useState('');
  const [st, setSt] = React.useState('Todos');
  const [more, setMore] = React.useState(false);
  const [novo, setNovo] = React.useState(false);
  const blank = isR ? { pac: PAC_NOMES[0], proc: FIN_PROCS[0].n, pro: FIN_PROS[0], cat: 'Estética', atend: 'Particular', total: String(FIN_PROCS[0].v), temDesc: 'Não', desc: '', forma: 'Pix', parc: '1', venc: TODAY_ISO, status: 'Recebido' }
    : { desc: '', cat: cats[1] || cats[0], forn: '', total: '', forma: 'Pix', parc: '1', venc: TODAY_ISO, status: 'Pago' };
  const [f, setF] = React.useState(blank);
  const done = isR ? 'Recebido' : 'Pago';
  const term = q.trim().toLowerCase();
  const rows = list.filter((r) => (st === 'Todos' || (st === 'Atrasado' ? r.status === 'Pendente' && r.venc < TODAY_ISO : r.status === st)) && (!term || JSON.stringify([r.pac, r.proc, r.pro, r.desc, r.cat, r.forn]).toLowerCase().includes(term)));
  const shown = more ? rows : rows.slice(0, 12);
  const val = (r) => isR ? liq(r) : r.total;
  const totDone = list.filter((r) => r.status === done && inWin(r.data, 30)).reduce((a, r) => a + val(r), 0), totPend = list.filter((r) => r.status === 'Pendente').reduce((a, r) => a + val(r), 0);
  const nPend = list.filter((r) => r.status === 'Pendente').length, nLate = list.filter((r) => r.status === 'Pendente' && r.venc < TODAY_ISO).length;
  const toggle = (id) => setList((l) => l.map((r) => r.id === id ? { ...r, status: r.status === 'Pendente' ? done : 'Pendente' } : r));
  const num = (s2) => +String(s2).replace(/\./g, '').replace(',', '.') || 0;
  const totalN = num(f.total), descN = isR && f.temDesc === 'Sim' ? num(f.desc) : 0, final = Math.max(totalN - descN, 0);
  const parcOn = f.forma === 'Cartão de crédito' || f.forma === 'Boleto';
  const save = () => {
    if (!totalN || (!isR && !f.desc.trim())) return;
    const base = { id: Date.now(), data: TODAY_ISO, total: totalN, forma: f.forma, parc: parcOn ? +f.parc : 1, venc: f.venc || TODAY_ISO, status: f.status };
    setList((l) => [isR ? { ...base, pac: f.pac, proc: f.proc, pro: f.pro, cat: f.cat, atend: f.atend, desc: descN } : { ...base, desc: f.desc.trim(), cat: f.cat, forn: f.forn || 'Não informado' }, ...l]);
    setNovo(false); setF(blank);
  };
  const setProc = (n) => { const p = FIN_PROCS.find((x) => x.n === n); setF({ ...f, proc: n, cat: cats.includes(p.cat) ? p.cat : f.cat, total: String(p.v) }); };
  const share = totDone / ((totDone + totPend) || 1) * 100;
  return (
    <section style={{ ...glass, padding: mobile ? 16 : 26, display: 'flex', flexDirection: 'column', gap: 18 }}>
      <CardTitle size={mobile ? 19 : 22} right={<OBtn size="sm" iconLeft="plus" onClick={() => { setF(blank); setNovo(true); }}>{mobile ? 'Nova' : isR ? 'Nova receita' : 'Nova despesa'}</OBtn>}>{isR ? 'Receitas' : 'Despesas'}</CardTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: mobile ? 14 : 18, borderRadius: 20, background: 'rgba(255,255,255,.45)', border: '1.5px solid rgba(255,255,255,.95)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'baseline' }}>
          <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>{isR ? 'Recebido nos últimos 30 dias' : 'Pago nos últimos 30 dias'} <span style={{ fontSize: mobile ? 20 : 24, fontWeight: 600, color: 'var(--text-strong)', marginLeft: 6, fontVariantNumeric: 'tabular-nums' }}>{brl(totDone)}</span></span>
          <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>{isR ? 'Falta receber' : 'Falta pagar'} <B>{brl(totPend)}</B> em {nPend} {nPend === 1 ? 'lançamento' : 'lançamentos'}{nLate ? <>, <B c="#E5484D">{nLate} atrasado{nLate > 1 ? 's' : ''}</B></> : null}</span>
        </div>
        <div style={{ height: 10, borderRadius: 999, background: 'rgba(214,226,242,.8)', overflow: 'hidden' }}><div style={{ width: share + '%', height: '100%', borderRadius: 999, background: isR ? 'var(--gradient-blue-h)' : 'var(--gradient-brand)' }} /></div>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>A barra mostra quanto do valor dos últimos 30 dias já foi {isR ? 'recebido' : 'pago'}: {pct0(share)}.</span>
      </div>
      <OneFilter q={q} setQ={setQ} mobile={mobile} placeholder={mobile ? 'Buscar' : isR ? 'Buscar paciente, procedimento ou profissional' : 'Buscar descrição, categoria ou fornecedor'} value={st} onChange={setSt}
        options={[['Todos', 'Todos os status'], [done, isR ? 'Recebidos' : 'Pagos'], ['Pendente', 'Pendentes'], ['Atrasado', 'Atrasados']]} />
      <LancTable kind={kind} rows={shown} onToggle={toggle} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap', fontSize: 13, color: 'var(--text-muted)' }}>
        <span>Exibindo {shown.length} de {rows.length}. Toque no status para marcar como {isR ? 'recebido' : 'pago'}.</span>
        {rows.length > 12 ? <button type="button" onClick={() => setMore(!more)} style={{ border: 0, background: 'none', color: '#1F5EFF', fontFamily: 'inherit', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>{more ? 'Ver menos' : 'Ver todos'}</button> : null}
      </div>
      <GPortal><ODialog open={novo} onClose={() => setNovo(false)} icon={isR ? 'circle-dollar-sign' : 'receipt'} title={isR ? 'Nova receita' : 'Nova despesa'} description={isR ? 'Lance o valor do atendimento. Os gráficos se atualizam na hora.' : 'Registre a saída para acompanhar o caixa.'} width={680}
        footer={<><OBtn variant="secondary" onClick={() => setNovo(false)}>Cancelar</OBtn><OBtn iconLeft="check" onClick={save}>Salvar {isR ? 'receita' : 'despesa'}</OBtn></>}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 14 }}>
          {isR ? <>
            <OSelect label="Paciente" options={PAC_NOMES} value={f.pac} onChange={(e) => setF({ ...f, pac: e.target.value })} />
            <OSelect label="Procedimento" options={FIN_PROCS.map((p) => p.n)} value={f.proc} onChange={(e) => setProc(e.target.value)} />
            <OSelect label="Profissional" options={FIN_PROS} value={f.pro} onChange={(e) => setF({ ...f, pro: e.target.value })} />
            <OSelect label="Categoria" options={cats} value={f.cat} onChange={(e) => setF({ ...f, cat: e.target.value })} />
            <ChipPick label="Atendimento" opts={['Particular', 'Convênio']} value={f.atend} onChange={(v) => setF({ ...f, atend: v, forma: v === 'Convênio' ? 'Convênio' : f.forma === 'Convênio' ? 'Pix' : f.forma })} />
          </> : <>
            <OInput label="Descrição" placeholder="Ex.: Compra de luvas" value={f.desc} onChange={(e) => setF({ ...f, desc: e.target.value })} style={{ gridColumn: '1 / -1' }} />
            <OSelect label="Categoria" options={cats} value={f.cat} onChange={(e) => setF({ ...f, cat: e.target.value })} />
            <OInput label="Fornecedor" placeholder="Opcional" value={f.forn} onChange={(e) => setF({ ...f, forn: e.target.value })} />
          </>}
          <OInput label="Valor total (R$)" inputMode="decimal" placeholder="0,00" value={f.total} onChange={(e) => setF({ ...f, total: e.target.value })} />
          {isR ? <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-strong)' }}>Desconto</span><div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>{['Não', 'Sim'].map((o) => <FilterChip key={o} active={f.temDesc === o} onClick={() => setF({ ...f, temDesc: o })}>{o}</FilterChip>)}{f.temDesc === 'Sim' ? <input value={f.desc} onChange={(e) => setF({ ...f, desc: e.target.value })} placeholder="R$ 0,00" inputMode="decimal" style={{ width: 96, height: 32, borderRadius: 999, border: '1.5px solid rgba(31,94,255,.35)', padding: '0 12px', fontFamily: 'inherit', fontSize: 13, outline: 'none' }} /> : null}</div></div> : null}
          <ChipPick label="Forma de pagamento" opts={isR ? FORMAS : FORMAS.filter((x) => x !== 'Convênio')} value={f.forma} onChange={(v) => setF({ ...f, forma: v, parc: '1' })} />
          {parcOn ? <OSelect label="Parcelas" options={['1', '2', '3', '4', '5', '6', '8', '10', '12']} value={f.parc} onChange={(e) => setF({ ...f, parc: e.target.value })} /> : null}
          <OInput label="Vencimento" type="date" value={f.venc} onChange={(e) => setF({ ...f, venc: e.target.value })} />
          <ChipPick label="Status" opts={[done, 'Pendente']} value={f.status} onChange={(v) => setF({ ...f, status: v })} />
          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderRadius: 16, background: 'linear-gradient(90deg, rgba(31,94,255,.08), rgba(34,195,242,.08))' }}>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{isR ? 'Valor final' : 'Valor'}{parcOn && +f.parc > 1 ? ` em ${f.parc}x de ${brl(final / +f.parc)}` : ''}</span>
            <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-strong)', fontVariantNumeric: 'tabular-nums' }}>{brl(final)}</span>
          </div>
        </div>
      </ODialog></GPortal>
    </section>
  );
}

function CategoriasFin({ cats, setCats, mobile }) {
  const [nv, setNv] = React.useState({ rec: '', desp: '' });
  const add = (k) => { const v = nv[k].trim(); if (v && !cats[k].includes(v)) setCats({ ...cats, [k]: [...cats[k], v] }); setNv({ ...nv, [k]: '' }); };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: mobile ? 14 : 22 }}>
      {[['rec', 'Categorias de receita', '#1F5EFF'], ['desp', 'Categorias de despesa', '#7B4BC4']].map(([k, t, c]) => (
        <section key={k} style={{ ...glass, padding: mobile ? 16 : 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <CardTitle size={19}>{t}</CardTitle>
          {cats[k].map((x) => (
            <div key={x} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 14, background: 'rgba(255,255,255,.6)', border: '1.5px solid rgba(255,255,255,.95)' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: c }} /><span style={{ flex: 1, fontSize: 14, color: 'var(--text-strong)' }}>{x}</span>
              <button type="button" aria-label={'Remover ' + x} onClick={() => setCats({ ...cats, [k]: cats[k].filter((y) => y !== x) })} style={{ border: 0, background: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4, display: 'flex' }}><OIcon name="x" size={14} /></button>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 8 }}><div style={{ flex: 1 }}><OInput placeholder="Nova categoria" value={nv[k]} onChange={(e) => setNv({ ...nv, [k]: e.target.value })} onKeyDown={(e) => e.key === 'Enter' && add(k)} /></div><OBtn iconLeft="plus" onClick={() => add(k)}>Adicionar</OBtn></div>
        </section>
      ))}
    </div>
  );
}

/* ---------- Salute Pay (movimentações) ---------- */
const SALDO_INICIAL = 38200;
function dayLabel(iso) { const d = daysTo(iso); return d === 0 ? 'Hoje' : d === -1 ? 'Ontem' : WD[new Date(iso + 'T00:00:00').getDay()].charAt(0) + WD[new Date(iso + 'T00:00:00').getDay()].slice(1).toLowerCase() + ', ' + dBR(iso).slice(0, 5); }
function SalutePay({ rec, desp, mobile }) {
  const [q, setQ] = React.useState('');
  const [tp, setTp] = React.useState('todas');
  const [more, setMore] = React.useState(false);
  const all = [
    ...rec.filter((r) => r.status === 'Recebido' && inWin(r.data, 30)).map((r) => ({ id: 'r' + r.id, data: r.data, tipo: 'in', desc: r.pac, sub: r.proc + ' · ' + r.pro, forma: r.forma + (r.parc > 1 ? ` em ${r.parc}x` : ''), valor: liq(r) })),
    ...desp.filter((d) => d.status === 'Pago' && inWin(d.data, 30)).map((d) => ({ id: 'd' + d.id, data: d.data, tipo: 'out', desc: d.desc, sub: d.forn + ' · ' + d.cat, forma: d.forma + (d.parc > 1 ? ` em ${d.parc}x` : ''), valor: d.total })),
  ].sort((a, b) => a.data.localeCompare(b.data) || (a.tipo === b.tipo ? 0 : a.tipo === 'in' ? -1 : 1));
  let bal = SALDO_INICIAL; all.forEach((m) => { bal += m.tipo === 'in' ? m.valor : -m.valor; m.saldo = bal; });
  const ent = all.filter((m) => m.tipo === 'in').reduce((a, m) => a + m.valor, 0), sai = all.filter((m) => m.tipo === 'out').reduce((a, m) => a + m.valor, 0);
  const term = q.trim().toLowerCase();
  const rows = all.filter((m) => (tp === 'todas' || m.tipo === tp) && (!term || (m.desc + ' ' + m.sub + ' ' + m.forma).toLowerCase().includes(term))).reverse();
  const shown = more ? rows : rows.slice(0, 25);
  const groups = []; shown.forEach((m) => { const g = groups[groups.length - 1]; if (g && g.d === m.data) g.items.push(m); else groups.push({ d: m.data, items: [m] }); });
  const exportCsv = () => {
    const lines = [['Data', 'Tipo', 'Descrição', 'Detalhe', 'Forma', 'Valor', 'Saldo'].join(';'), ...rows.map((m) => [dBR(m.data), m.tipo === 'in' ? 'Entrada' : 'Saída', m.desc, m.sub, m.forma, (m.tipo === 'in' ? '' : '-') + m.valor.toFixed(2).replace('.', ','), m.saldo.toFixed(2).replace('.', ',')].map((x) => '"' + String(x).replace(/"/g, '""') + '"').join(';'))];
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['﻿' + lines.join('\n')], { type: 'text/csv;charset=utf-8' })); a.download = 'salute-pay-extrato.csv'; document.body.appendChild(a); a.click(); a.remove();
  };
  const tot = ent + sai || 1;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 14 : 22 }}>
      <section style={{ position: 'relative', overflow: 'hidden', borderRadius: 28, padding: mobile ? 20 : '28px 32px', background: 'linear-gradient(115deg, #0A2A8F 0%, #0B4BEB 55%, #1FA8F5 100%)', color: '#fff', boxShadow: '0 24px 48px -28px rgba(11,75,235,.8)', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <span style={{ position: 'absolute', right: -30, top: -30, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,.18), rgba(255,255,255,0) 70%)' }} />
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <div><span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, letterSpacing: '.12em', opacity: .95 }}>SALUTE PAY · MOVIMENTAÇÕES <BetaPill dark /></span>
            <p style={{ margin: '10px 0 0', fontSize: 14, opacity: .85 }}>Saldo atual</p>
            <p style={{ margin: '2px 0 0', fontSize: mobile ? 32 : 42, fontWeight: 700, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{brl(bal)}</p></div>
          <button type="button" onClick={exportCsv} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 42, padding: '0 18px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,.55)', background: 'rgba(255,255,255,.14)', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}><OIcon name="download" size={16} />Exportar extrato</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: mobile ? 10 : 20 }}>
          {[['Entraram', ent, 'arrow-down-left'], ['Saíram', sai, 'arrow-up-right'], ['Resultado', ent - sai, 'equal']].map(([l, v, i]) => (
            <div key={l} style={{ minWidth: 0 }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, opacity: .85 }}><OIcon name={i} size={14} />{l}</span><p style={{ margin: '2px 0 0', fontSize: mobile ? 17 : 22, fontWeight: 600, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{brlK(v)}</p></div>
          ))}
        </div>
        <div style={{ display: 'flex', height: 10, borderRadius: 999, overflow: 'hidden', gap: 3, background: 'rgba(255,255,255,.18)' }}>
          <span style={{ width: ent / tot * 100 + '%', background: '#fff', borderRadius: 999 }} /><span style={{ flex: 1, background: 'repeating-linear-gradient(135deg,rgba(255,255,255,.55) 0 4px,rgba(255,255,255,.2) 4px 8px)', borderRadius: 999 }} />
        </div>
        <span style={{ fontSize: 12, opacity: .8 }}>Em desenvolvimento (Beta). Por enquanto mostra o que foi lançado como recebido ou pago nos últimos 30 dias. Saldo inicial do período: {brl(SALDO_INICIAL)}.</span>
      </section>
      <section style={{ ...glass, padding: mobile ? 16 : 26, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <CardTitle size={mobile ? 19 : 22} right={<span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{rows.length} movimentações</span>}>Extrato</CardTitle>
        <OneFilter q={q} setQ={setQ} mobile={mobile} placeholder={mobile ? 'Buscar' : 'Buscar paciente, fornecedor ou forma de pagamento'} value={tp} onChange={setTp} options={[['todas', 'Entradas e saídas'], ['in', 'Só entradas'], ['out', 'Só saídas']]} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {groups.map((g) => (
            <div key={g.d} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.04em', padding: '0 4px' }}>{dayLabel(g.d)}</span>
              {g.items.map((m) => (
                <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 16, background: 'rgba(255,255,255,.6)', border: '1.5px solid rgba(255,255,255,.95)' }}>
                  <span style={{ width: 38, height: 38, borderRadius: 12, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: m.tipo === 'in' ? 'rgba(31,94,255,.1)' : 'rgba(123,75,196,.1)', color: m.tipo === 'in' ? '#1F5EFF' : '#7B4BC4' }}><OIcon name={m.tipo === 'in' ? 'arrow-down-left' : 'arrow-up-right'} size={18} /></span>
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--text-strong)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.tipo === 'in' ? 'Recebido de ' : 'Pago: '}{m.desc}</span>
                    <span style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.sub} · {m.forma}</span>
                  </span>
                  <span style={{ textAlign: 'right', flexShrink: 0 }}>
                    <span style={{ display: 'block', fontSize: 15, fontWeight: 700, color: m.tipo === 'in' ? '#1F5EFF' : 'var(--text-strong)', fontVariantNumeric: 'tabular-nums' }}>{m.tipo === 'in' ? '+ ' : '− '}{brl(m.valor)}</span>
                    {mobile ? null : <span style={{ fontSize: 11, color: 'var(--text-subtle)', fontVariantNumeric: 'tabular-nums' }}>Saldo {brl(m.saldo)}</span>}
                  </span>
                </div>
              ))}
            </div>
          ))}
          {!rows.length ? <span style={{ textAlign: 'center', padding: 30, color: 'var(--text-muted)', fontSize: 14 }}>Nenhuma movimentação encontrada.</span> : null}
        </div>
        {rows.length > 25 ? <button type="button" onClick={() => setMore(!more)} style={{ alignSelf: 'center', border: 0, background: 'none', color: '#1F5EFF', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, cursor: 'pointer' }}>{more ? 'Ver menos' : `Ver todas as ${rows.length}`}</button> : null}
      </section>
    </div>
  );
}

/* ---------- Nota fiscal (Beta) ---------- */
const LC116 = [['4.12', 'Odontologia'], ['6.02', 'Esteticistas, tratamento de pele, depilação e congêneres'], ['4.03', 'Hospitais, clínicas, ambulatórios e congêneres'], ['4.01', 'Medicina e biomedicina']];
const CNAES = [['8630-5/04', 'Atividade odontológica'], ['9602-5/02', 'Atividades de estética e outros serviços de cuidados com a beleza'], ['8630-5/03', 'Atividade médica ambulatorial restrita a consultas']];
const BetaPill = ({ dark }) => <span style={{ display: 'inline-flex', alignItems: 'center', height: 20, padding: '0 8px', borderRadius: 999, fontSize: 10.5, fontWeight: 700, letterSpacing: '.06em', color: dark ? '#fff' : '#7B4BC4', background: dark ? 'rgba(255,255,255,.2)' : 'rgba(123,75,196,.12)', border: dark ? '1px solid rgba(255,255,255,.4)' : '1px solid rgba(123,75,196,.3)' }}>BETA</span>;
const NF_STORE = makeStore({ cnpj: '12.345.678/0001-90', razao: 'Bella Forma Estética e Odontologia Ltda', im: '', municipio: 'Itapira / SP', regime: 'Simples Nacional', item: '6.02', itemOdonto: '4.12', cnae: '9602-5/02', cnaeOdonto: '8630-5/04', codMun: '', aliq: '2', issRet: false, serie: '1', proxRps: '1', ambiente: 'Homologação (testes)', cert: null, certSenha: '', envio: true, cst: '000', cclass: '000001', cbs: '0,9', ibs: '0,1', texto: 'Serviço de {procedimento} realizado em {data} por {profissional}.' });
function NfPreview({ r, cfg, onClose }) {
  const odonto = r.cat === 'Odontologia';
  const item = odonto ? cfg.itemOdonto : cfg.item;
  const desc = LC116.find((x) => x[0] === item);
  const v = liq(r), aliq = +String(cfg.aliq).replace(',', '.') || 0, iss = v * aliq / 100;
  const cbs = v * (+String(cfg.cbs).replace(',', '.') || 0) / 100, ibs = v * (+String(cfg.ibs).replace(',', '.') || 0) / 100;
  const pac = PAC.find((p) => p.nome === r.pac);
  const conv = r.atend === 'Convênio';
  const box = { padding: 14, borderRadius: 14, border: '1px solid rgba(214,226,242,.95)', background: '#fff', display: 'flex', flexDirection: 'column', gap: 4 };
  const kv = (k, val) => <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, fontSize: 13 }}><span style={{ color: 'var(--text-muted)' }}>{k}</span><span style={{ color: 'var(--text-strong)', fontWeight: 500, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>{val}</span></div>;
  return (
    <Overlay><div style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(14,35,80,.35)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(720px, 100%)', maxHeight: '92vh', overflowY: 'auto', borderRadius: 28, background: 'linear-gradient(180deg,#F5F9FF,#EAF2FD)', boxShadow: '0 30px 60px -30px rgba(23,73,170,.6)', padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
          <div><p style={{ margin: 0, fontSize: 20, fontWeight: 600, color: 'var(--text-strong)', display: 'flex', alignItems: 'center', gap: 8 }}>Prévia da NFS-e <BetaPill /></p><p style={{ margin: '2px 0 0', fontSize: 13, color: 'var(--text-muted)' }}>Assim a nota vai sair quando a emissão for liberada.</p></div>
          <button type="button" aria-label="Fechar" onClick={onClose} style={fCircle}><OIcon name="x" size={18} /></button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px,1fr))', gap: 12 }}>
          <div style={box}><span style={lbl}>Prestador</span><b style={{ fontSize: 14, color: 'var(--text-strong)' }}>{cfg.razao}</b>{kv('CNPJ', cfg.cnpj)}{kv('Inscrição municipal', cfg.im || <span style={{ color: '#E5484D' }}>Falta preencher</span>)}{kv('Município', cfg.municipio)}{kv('Regime', cfg.regime)}</div>
          <div style={box}><span style={lbl}>Tomador</span><b style={{ fontSize: 14, color: 'var(--text-strong)' }}>{conv ? 'Convênio do paciente' : r.pac}</b>{kv(conv ? 'Paciente atendido' : 'CPF', conv ? r.pac : pac ? pac.cpf : <span style={{ color: '#E5484D' }}>Falta CPF</span>)}{kv('Contato', pac ? pac.tel : 'Não informado')}</div>
        </div>
        <div style={box}><span style={lbl}>Serviço</span>
          {kv('Item LC 116/2003', `${item} · ${desc ? desc[1] : ''}`)}{kv('CNAE', odonto ? cfg.cnaeOdonto : cfg.cnae)}{cfg.codMun ? kv('Código municipal', cfg.codMun) : null}
          <p style={{ margin: '6px 0 0', fontSize: 13, color: 'var(--text-body)', lineHeight: 1.5, padding: 10, borderRadius: 10, background: '#F4F7FC' }}>{cfg.texto.replace('{procedimento}', r.proc.toLowerCase()).replace('{data}', dBR(r.data)).replace('{profissional}', r.pro)}</p>
        </div>
        <div style={box}><span style={lbl}>Valores</span>
          {kv('Valor do serviço', brl(r.total))}{r.desc ? kv('Desconto', '− ' + brl(r.desc)) : null}{kv('Base de cálculo', brl(v))}{kv(`ISS (${cfg.aliq}%)${cfg.issRet ? ' retido' : ''}`, brl(iss))}
          {kv(`CBS ${cfg.cbs}% e IBS ${cfg.ibs}% (informativo 2026)`, brl(cbs + ibs))}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, paddingTop: 8, borderTop: '1px solid rgba(214,226,242,.9)' }}><b style={{ fontSize: 14 }}>Valor líquido</b><b style={{ fontSize: 18, color: 'var(--text-strong)', fontVariantNumeric: 'tabular-nums' }}>{brl(cfg.issRet ? v - iss : v)}</b></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', padding: '12px 14px', borderRadius: 16, background: 'rgba(123,75,196,.07)' }}>
          <span style={{ fontSize: 13, color: 'var(--text-body)' }}>A emissão direta está em desenvolvimento. Por enquanto, use estes dados no emissor da sua prefeitura.</span>
          <span title="Disponível em breve"><OBtn iconLeft="file-check" disabled>Emitir NFS-e (em breve)</OBtn></span>
        </div>
      </div>
    </div></Overlay>
  );
}
function NotaFiscal({ rec, mobile }) {
  const [sec, setSec] = React.useState('notas');
  const [cfg, setCfg] = useStore(NF_STORE);
  const [q, setQ] = React.useState('');
  const [st, setSt] = React.useState('todas');
  const [prev, setPrev] = React.useState(null);
  const [saved, setSaved] = React.useState(false);
  const certRef = React.useRef(null);
  const aliq = +String(cfg.aliq).replace(',', '.') || 0;
  const base = rec.filter((r) => r.status === 'Recebido' && inWin(r.data, 30)).map((r) => { const pac = PAC.find((p) => p.nome === r.pac); return { ...r, ok: r.atend === 'Convênio' || !!pac, doc: r.atend === 'Convênio' ? 'CNPJ do convênio' : pac ? pac.cpf : 'Falta CPF' }; });
  const term = q.trim().toLowerCase();
  const rows = base.filter((r) => (st === 'todas' || (st === 'ok' ? r.ok : !r.ok)) && (!term || (r.pac + ' ' + r.proc).toLowerCase().includes(term)));
  const okN = base.filter((r) => r.ok).length, okV = base.filter((r) => r.ok).reduce((a, r) => a + liq(r), 0);
  const checks = [['Dados da clínica (CNPJ e razão social)', !!(cfg.cnpj && cfg.razao)], ['Inscrição municipal', !!cfg.im], ['Serviço e alíquota de ISS', !!(cfg.item && cfg.aliq)], ['Certificado digital A1', !!cfg.cert], ['Numeração do RPS', !!(cfg.serie && cfg.proxRps)]];
  const done = checks.filter((c) => c[1]).length;
  const set = (k) => (e) => { setCfg({ ...cfg, [k]: e.target.value }); setSaved(false); };
  const inp = (k, l, extra = {}) => <OInput label={l} value={cfg[k]} onChange={set(k)} {...extra} />;
  const sel = (k, l, opts) => <OSelect label={l} options={opts} value={cfg[k]} onChange={set(k)} />;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 14 : 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: mobile ? 16 : '18px 22px', borderRadius: 22, background: 'linear-gradient(100deg, rgba(123,75,196,.12), rgba(31,94,255,.08))', border: '1.5px solid rgba(255,255,255,.95)', flexWrap: 'wrap' }}>
        <span style={{ width: 44, height: 44, borderRadius: 14, background: 'var(--gradient-brand)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><OIcon name="flask-conical" size={20} /></span>
        <div style={{ flex: 1, minWidth: 220 }}><p style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--text-strong)', display: 'flex', alignItems: 'center', gap: 8 }}>Emissão de nota fiscal <BetaPill /></p>
          <p style={{ margin: '2px 0 0', fontSize: 13, color: 'var(--text-muted)' }}>Em desenvolvimento. Deixe tudo configurado agora: quando liberarmos, as notas saem direto do sistema.</p></div>
        <div style={{ minWidth: 170 }}><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Configuração {done} de {checks.length}</span><div style={{ height: 8, borderRadius: 999, background: 'rgba(214,226,242,.8)', overflow: 'hidden', marginTop: 4 }}><div style={{ width: done / checks.length * 100 + '%', height: '100%', borderRadius: 999, background: 'var(--gradient-brand)' }} /></div></div>
      </div>
      <GTabs items={[['notas', 'Notas do período', 'receipt-text'], ['config', 'Configuração fiscal', 'settings-2']]} value={sec} onChange={setSec} />
      {sec === 'notas' ? (
        <section style={{ ...glass, padding: mobile ? 16 : 26, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div><h3 style={{ margin: 0, fontSize: mobile ? 19 : 22, fontWeight: 600, color: 'var(--text-strong)' }}>Notas do período</h3>
            <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-muted)' }}><B>{okN} atendimentos</B> prontos para nota, somando <B>{brlK(okV)}</B>. ISS estimado de <B>{brl0(okV * aliq / 100)}</B>.</p></div>
          <OneFilter q={q} setQ={setQ} mobile={mobile} placeholder={mobile ? 'Buscar' : 'Buscar paciente ou procedimento'} value={st} onChange={setSt} options={[['todas', `Todas (${base.length})`], ['ok', `Prontas para emitir (${okN})`], ['falta', `Faltam dados (${base.length - okN})`]]} />
          <div style={gTable}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
              <thead style={{ background: 'rgba(225,236,250,.7)' }}><tr>{['Data', 'Tomador', 'CPF ou CNPJ', 'Serviço', 'Valor', 'ISS', 'Situação', ''].map((h, i) => <th key={i} style={gTh}>{h}</th>)}</tr></thead>
              <tbody>
                {rows.slice(0, 30).map((r) => (
                  <tr key={r.id}>
                    <td style={{ ...gTd, fontVariantNumeric: 'tabular-nums' }}>{dBR(r.data)}</td>
                    <td style={{ ...gTd, fontWeight: 600, color: 'var(--text-strong)' }}>{r.atend === 'Convênio' ? <>Convênio <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>({r.pac})</span></> : r.pac}</td>
                    <td style={{ ...gTd, color: r.ok ? 'var(--text-body)' : '#E5484D', fontVariantNumeric: 'tabular-nums' }}>{r.doc}</td>
                    <td style={gTd}>{r.proc}</td>
                    <td style={{ ...gTd, fontWeight: 600, color: 'var(--text-strong)', fontVariantNumeric: 'tabular-nums' }}>{brl(liq(r))}</td>
                    <td style={{ ...gTd, fontVariantNumeric: 'tabular-nums' }}>{brl(liq(r) * aliq / 100)}</td>
                    <td style={gTd}><Badge2 c={r.ok ? '#1F5EFF' : '#F5B400'}>{r.ok ? 'Pronta para emitir' : 'Completar cadastro'}</Badge2></td>
                    <td style={gTd}><button type="button" onClick={() => setPrev(r)} style={{ ...linkBtn, fontSize: 13 }}><OIcon name="eye" size={14} />Ver prévia</button></td>
                  </tr>
                ))}
                {!rows.length ? <tr><td colSpan={8} style={{ ...gTd, textAlign: 'center', padding: 30, color: 'var(--text-muted)' }}>Nada encontrado.</td></tr> : null}
              </tbody>
            </table>
          </div>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Aparecem aqui os atendimentos já recebidos nos últimos 30 dias. Quem está sem CPF precisa ter o cadastro completo em Pacientes.</span>
        </section>
      ) : (
        <section style={{ ...glass, padding: mobile ? 16 : 26, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <CardTitle size={mobile ? 19 : 22}>Configuração fiscal</CardTitle>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'minmax(0,1fr) 300px', gap: 16, alignItems: 'start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <Block title="Prestador (sua clínica)">
                <div style={grid2(mobile)}>{inp('razao', 'Razão social')}{inp('cnpj', 'CNPJ', { inputMode: 'numeric' })}{inp('im', 'Inscrição municipal', { placeholder: 'Número na prefeitura' })}{inp('municipio', 'Município de emissão')}{sel('regime', 'Regime tributário', ['Simples Nacional', 'MEI', 'Lucro Presumido', 'Lucro Real'])}</div>
              </Block>
              <Block title="Serviço e impostos" desc="Confirme os códigos e a alíquota com o seu contador.">
                <div style={grid2(mobile)}>
                  {sel('item', 'Item LC 116 para estética', LC116.map((x) => x[0]))}
                  {sel('itemOdonto', 'Item LC 116 para odontologia', LC116.map((x) => x[0]))}
                  {sel('cnae', 'CNAE para estética', CNAES.map((x) => x[0]))}
                  {sel('cnaeOdonto', 'CNAE para odontologia', CNAES.map((x) => x[0]))}
                  {inp('codMun', 'Código de tributação municipal', { placeholder: 'Opcional, conforme a prefeitura' })}
                  {inp('aliq', 'Alíquota do ISS (%)', { inputMode: 'decimal', hint: 'Entre 2% e 5%, conforme o município' })}
                </div>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{LC116.filter((x) => x[0] === cfg.item || x[0] === cfg.itemOdonto).map((x) => x[0] + ': ' + x[1]).join(' · ')}</span>
                <Toggle on={cfg.issRet} onChange={(v) => { setCfg({ ...cfg, issRet: v }); setSaved(false); }} label="ISS retido pelo tomador" desc="Use quando o convênio ou a empresa recolhe o ISS" />
              </Block>
              <Block title="Reforma tributária (IBS e CBS)" desc="Em 2026 os campos são informativos, sem cobrança. O sistema já preenche os padrões.">
                <div style={grid2(mobile, 160)}>{inp('cst', 'CST IBS/CBS')}{inp('cclass', 'Classificação tributária')}{inp('cbs', 'Alíquota CBS (%)')}{inp('ibs', 'Alíquota IBS (%)')}</div>
              </Block>
              <Block title="Texto da nota" desc="Use {procedimento}, {data} e {profissional}. O sistema troca pelos dados do atendimento.">
                <textarea value={cfg.texto} onChange={set('texto')} rows={2} style={{ borderRadius: 14, border: '1.5px solid rgba(214,226,242,.95)', background: '#fff', padding: 12, fontFamily: 'inherit', fontSize: 14, outline: 'none', resize: 'vertical' }} />
              </Block>
              <Block title="Numeração e ambiente">
                <div style={grid2(mobile, 160)}>{inp('serie', 'Série do RPS')}{inp('proxRps', 'Próximo número do RPS', { inputMode: 'numeric' })}{sel('ambiente', 'Ambiente', ['Homologação (testes)', 'Produção'])}</div>
                <Toggle on={cfg.envio} onChange={(v) => setCfg({ ...cfg, envio: v })} label="Enviar a nota ao paciente pelo WhatsApp" desc="A Renata IA manda o PDF assim que a nota for emitida" />
              </Block>
              <Block title="Certificado digital A1" desc="Arquivo .pfx ou .p12, usado para assinar as notas.">
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', flexWrap: 'wrap' }}>
                  <OBtn variant="secondary" iconLeft={cfg.cert ? 'check' : 'upload'} onClick={() => certRef.current && certRef.current.click()}>{cfg.cert ? cfg.cert : 'Enviar certificado'}</OBtn>
                  <input ref={certRef} type="file" accept=".pfx,.p12" style={{ display: 'none' }} onChange={(e) => { const f = e.target.files && e.target.files[0]; if (f) setCfg({ ...cfg, cert: f.name }); e.target.value = ''; }} />
                  <div style={{ width: 220 }}><OInput label="Senha do certificado" type="password" value={cfg.certSenha} onChange={set('certSenha')} /></div>
                </div>
              </Block>
              <SavedBar saved={saved} onSave={() => setSaved(true)} />
            </div>
            <div style={{ ...soft, padding: 18, display: 'flex', flexDirection: 'column', gap: 12, position: mobile ? 'static' : 'sticky', top: 0 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-strong)' }}>Pronto para emitir?</span>
              {checks.map(([l, ok]) => <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: ok ? 'var(--text-strong)' : 'var(--text-muted)' }}><span style={{ width: 22, height: 22, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: ok ? '#2DBF6A' : 'rgba(214,226,242,.9)', color: '#fff' }}>{ok ? <OIcon name="check" size={13} strokeWidth={3} /> : null}</span>{l}</div>)}
              <span style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>Com tudo marcado, sua clínica estará pronta no dia em que a emissão for liberada.</span>
            </div>
          </div>
        </section>
      )}
      {prev ? <NfPreview r={prev} cfg={cfg} onClose={() => setPrev(null)} /> : null}
    </div>
  );
}

function FinanceiroScreen({ mobile }) {
  const [tab, setTab] = React.useState('geral');
  const [per, setPer] = React.useState(30);
  const [cats, setCats] = React.useState({ rec: ['Estética', 'Odontologia', 'Consulta', 'Venda de produto'], desp: DESP_CATS });
  const [rec, setRec] = useStore(REC_STORE);
  const [desp, setDesp] = useStore(DESP_STORE);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 14 : 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
        <GTabs items={[['geral', 'Visão geral', 'layout-dashboard'], ['rec', 'Receitas', 'arrow-down-left'], ['desp', 'Despesas', 'arrow-up-right'], ['nf', <span key="nf" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>Nota fiscal<BetaPill /></span>, 'receipt-text'], ['pay', <span key="pay" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>Salute Pay<BetaPill /></span>, 'wallet-cards'], ['cats', 'Categorias', 'tags']]} value={tab} onChange={setTab} />
        {tab === 'geral' ? <PeriodSelect value={per} onChange={setPer} /> : null}
      </div>
      {tab === 'geral' ? <VisaoGeral rec={rec} desp={desp} per={per} mobile={mobile} /> : null}
      {tab === 'rec' ? <LancamentosTab kind="rec" list={rec} setList={setRec} cats={cats.rec} mobile={mobile} /> : null}
      {tab === 'desp' ? <LancamentosTab kind="desp" list={desp} setList={setDesp} cats={cats.desp} mobile={mobile} /> : null}
      {tab === 'cats' ? <CategoriasFin cats={cats} setCats={setCats} mobile={mobile} /> : null}
      {tab === 'pay' ? <SalutePay rec={rec} desp={desp} mobile={mobile} /> : null}
      {tab === 'nf' ? <NotaFiscal rec={rec} mobile={mobile} /> : null}
    </div>
  );
}

function GestaoScreen({ mobile }) {
  const { can } = useAccess();
  const areas = GESTAO_AREAS.filter(([k]) => can('gestao.' + k));
  const [area0, setArea] = React.useState(() => { try { return localStorage.getItem('salute-kit:gestao') || 'estoque'; } catch (e) { return 'estoque'; } });
  const area = areas.some((x) => x[0] === area0) ? area0 : (areas[0] || [''])[0];
  const pick = (a) => { setArea(a); try { localStorage.setItem('salute-kit:gestao', a); } catch (e) {} };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 14 : 22 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: mobile ? 10 : 16, maxWidth: 620 }}>
        {areas.map(([k, l, ic, d]) => {
          const on = area === k;
          return (
            <button key={k} type="button" onClick={() => pick(k)} aria-pressed={on} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: mobile ? 12 : '14px 18px', borderRadius: 22, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
              border: on ? '2px solid transparent' : '2px solid rgba(255,255,255,.95)', background: on ? 'linear-gradient(180deg,#0B4BEB 0%,#1FA8F5 100%)' : 'rgba(255,255,255,.55)', color: on ? '#fff' : 'var(--text-strong)', boxShadow: on ? '0 14px 28px -14px rgba(11,75,235,.75)' : '0 6px 16px -12px rgba(23,73,170,.35)' }}>
              <span style={{ width: 40, height: 40, borderRadius: 14, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: on ? 'rgba(255,255,255,.2)' : 'rgba(31,94,255,.08)', color: on ? '#fff' : '#1F5EFF' }}><OIcon name={ic} size={20} /></span>
              <span style={{ minWidth: 0 }}><span style={{ display: 'block', fontSize: 17, fontWeight: 600 }}>{l}</span>{mobile ? null : <span style={{ fontSize: 13, opacity: .8 }}>{d}</span>}</span>
            </button>
          );
        })}
      </div>
      {area === 'estoque' ? <EstoqueScreen mobile={mobile} /> : area === 'financeiro' ? <FinanceiroScreen mobile={mobile} /> : <section style={{ ...glass, padding: 30, fontSize: 15, color: 'var(--text-muted)' }}>Sem acesso a nenhuma área de Gestão.</section>}
    </div>
  );
}


/* ======================= CONFIGURAÇÕES ======================= */
function Toggle({ on, onChange, label, desc }) {
  return (
    <button type="button" role="switch" aria-checked={on} onClick={() => onChange(!on)} style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '12px 14px', borderRadius: 16, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', border: '1.5px solid rgba(255,255,255,.95)', background: 'rgba(255,255,255,.6)' }}>
      <span style={{ flex: 1, minWidth: 0 }}><span style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}>{label}</span>{desc ? <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{desc}</span> : null}</span>
      <span style={{ width: 44, height: 26, borderRadius: 999, padding: 3, boxSizing: 'border-box', background: on ? 'linear-gradient(90deg,#0B4BEB,#1FA8F5)' : 'rgba(150,175,210,.45)', transition: 'background .2s', flexShrink: 0 }}><span style={{ display: 'block', width: 20, height: 20, borderRadius: '50%', background: '#fff', transform: on ? 'translateX(18px)' : 'none', transition: 'transform .2s', boxShadow: '0 2px 4px rgba(0,0,0,.2)' }} /></span>
    </button>
  );
}
const MiniToggle = ({ on, onChange, label }) => <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={() => onChange(!on)} style={{ width: 38, height: 22, borderRadius: 999, padding: 3, border: 0, cursor: 'pointer', boxSizing: 'border-box', background: on ? 'linear-gradient(90deg,#0B4BEB,#1FA8F5)' : 'rgba(150,175,210,.45)', flexShrink: 0 }}><span style={{ display: 'block', width: 16, height: 16, borderRadius: '50%', background: '#fff', transform: on ? 'translateX(16px)' : 'none', transition: 'transform .2s' }} /></button>;

function Block({ title, desc, children, right }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 18, borderRadius: 20, background: 'rgba(255,255,255,.4)', border: '1.5px solid rgba(255,255,255,.9)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}><div><p style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--text-strong)' }}>{title}</p>{desc ? <p style={{ margin: '2px 0 0', fontSize: 13, color: 'var(--text-muted)' }}>{desc}</p> : null}</div>{right}</div>
      {children}
    </div>
  );
}
const grid2 = (mobile, min = 220) => ({ display: 'grid', gridTemplateColumns: mobile ? '1fr' : `repeat(auto-fit, minmax(${min}px, 1fr))`, gap: 14 });
function SavedBar({ onSave, saved }) {
  return <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 12 }}>{saved ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#2DBF6A', fontWeight: 500 }}><OIcon name="check" size={15} />Alterações salvas</span> : null}<OBtn iconLeft="check" onClick={onSave}>Salvar alterações</OBtn></div>;
}

/* ---- Clínica ---- */
const DIAS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
function ClinicaForm({ mobile }) {
  const [c, setC] = React.useState({ fantasia: 'Clínica Bella Forma', razao: 'Bella Forma Estética e Odontologia Ltda', resp: 'Dra. Camila Rocha', cnpj: '12.345.678/0001-90', email: 'contato@bellaforma.com.br', tel: '(19) 3863-4100', whats: '(19) 99800-4100', cep: '13970-000', end: 'Rua Comendador João Cintra', num: '415', comp: 'Sala 2', bairro: 'Centro', cidade: 'Itapira', uf: 'SP', maps: 'https://maps.google.com/?q=Bella+Forma+Itapira' });
  const [est, setEst] = React.useState({ estac: true, acess: true, wifi: true });
  const [hor, setHor] = React.useState(DIAS.map((d, i) => ({ d, on: i < 6, a: i === 5 ? '08:00' : '08:00', f: i === 5 ? '12:00' : '19:00' })));
  const [pg, setPg] = React.useState(['Pix', 'Dinheiro', 'Cartão de débito', 'Cartão de crédito']);
  const [parc, setParc] = React.useState('6');
  const [saved, setSaved] = React.useState(false);
  const inp = (k, l, extra = {}) => <OInput label={l} value={c[k]} onChange={(e) => { setC({ ...c, [k]: e.target.value }); setSaved(false); }} {...extra} />;
  const tim = { height: 36, borderRadius: 999, border: '1.5px solid rgba(214,226,242,.95)', padding: '0 10px', fontFamily: 'inherit', fontSize: 14, color: 'var(--text-strong)', background: '#fff', outline: 'none' };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Block title="Dados da clínica" desc="Aparecem para os pacientes e nos documentos.">
        <div style={grid2(mobile)}>{inp('fantasia', 'Nome fantasia')}{inp('razao', 'Razão social')}{inp('resp', 'Responsável')}{inp('cnpj', 'CNPJ', { inputMode: 'numeric' })}{inp('email', 'E-mail', { type: 'email', iconLeft: 'mail' })}{inp('tel', 'Telefone', { iconLeft: 'phone' })}{inp('whats', 'WhatsApp', { iconLeft: 'message-circle' })}</div>
      </Block>
      <Block title="Localização">
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : '160px minmax(0,1fr) 110px', gap: 14 }}>
          {inp('cep', 'CEP', { inputMode: 'numeric' })}<div style={{ gridColumn: mobile ? '1 / -1' : 'auto' }}>{inp('end', 'Endereço')}</div>{inp('num', 'Número')}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'repeat(3, minmax(0,1fr)) 90px', gap: 14 }}>{inp('comp', 'Complemento')}{inp('bairro', 'Bairro')}{inp('cidade', 'Cidade')}{inp('uf', 'Estado')}</div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 220 }}>{inp('maps', 'Link do Google Maps', { iconLeft: 'map-pin' })}</div>
          <OBtn variant="secondary" iconLeft="external-link" onClick={() => window.open(c.maps, '_blank')}>Abrir no mapa</OBtn>
        </div>
      </Block>
      <Block title="Estrutura da clínica" desc="A Renata IA usa estas informações para responder os pacientes.">
        <div style={grid2(mobile, 200)}>
          <Toggle on={est.estac} onChange={(v) => setEst({ ...est, estac: v })} label="Estacionamento" desc="Vagas para pacientes" />
          <Toggle on={est.acess} onChange={(v) => setEst({ ...est, acess: v })} label="Acessibilidade" desc="Rampa e banheiro adaptado" />
          <Toggle on={est.wifi} onChange={(v) => setEst({ ...est, wifi: v })} label="Wi-Fi para pacientes" desc="Rede liberada na recepção" />
        </div>
      </Block>
      <Block title="Horários de funcionamento">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {hor.map((h, i) => (
            <div key={h.d} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', borderRadius: 14, background: h.on ? 'rgba(255,255,255,.65)' : 'transparent', flexWrap: 'wrap' }}>
              <MiniToggle on={h.on} label={'Abrir ' + h.d} onChange={(v) => setHor(hor.map((x, j) => j === i ? { ...x, on: v } : x))} />
              <span style={{ width: 80, fontSize: 14, fontWeight: 600, color: h.on ? 'var(--text-strong)' : 'var(--text-subtle)' }}>{h.d}</span>
              {h.on ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)' }}>
                <input type="time" value={h.a} onChange={(e) => setHor(hor.map((x, j) => j === i ? { ...x, a: e.target.value } : x))} style={tim} />às
                <input type="time" value={h.f} onChange={(e) => setHor(hor.map((x, j) => j === i ? { ...x, f: e.target.value } : x))} style={tim} /></span>
                : <span style={{ fontSize: 13, color: 'var(--text-subtle)' }}>Fechado</span>}
              {h.on && i === 0 ? <button type="button" onClick={() => setHor(hor.map((x, j) => j > 0 && j < 5 ? { ...x, a: h.a, f: h.f, on: true } : x))} style={{ marginLeft: 'auto', border: 0, background: 'none', color: '#1F5EFF', fontFamily: 'inherit', fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>Copiar para dias úteis</button> : null}
            </div>
          ))}
        </div>
      </Block>
      <Block title="Política de pagamentos" desc="Formas aceitas na clínica.">
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{['Pix', 'Dinheiro', 'Cartão de débito', 'Cartão de crédito', 'Boleto', 'Convênio'].map((o) => { const on = pg.includes(o); return <FilterChip key={o} active={on} onClick={() => setPg(on ? pg.filter((x) => x !== o) : [...pg, o])}>{on ? <OIcon name="check" size={14} /> : null}{o}</FilterChip>; })}</div>
        {pg.includes('Cartão de crédito') ? <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--text-body)' }}>Parcelar no crédito em até <div style={{ width: 90 }}><OSelect options={['1', '2', '3', '4', '6', '10', '12']} value={parc} onChange={(e) => setParc(e.target.value)} /></div> vezes</div> : null}
      </Block>
      <SavedBar saved={saved} onSave={() => setSaved(true)} />
    </div>
  );
}

/* ---- Modelos de anamnese ---- */
const TIPOS_Q = ['Texto', 'Sim ou não', 'Múltipla escolha'];
const ANAM0 = [
  { id: 1, nome: 'Anamnese facial', uso: 'Estética', usos: 48, qs: [{ t: 'Possui alergia a algum medicamento ou cosmético?', k: 'Sim ou não' }, { t: 'Está grávida ou amamentando?', k: 'Sim ou não' }, { t: 'Faz uso de ácidos ou retinoides?', k: 'Sim ou não' }, { t: 'Qual o principal incômodo no rosto?', k: 'Texto' }] },
  { id: 2, nome: 'Toxina botulínica', uso: 'Estética', usos: 31, qs: [{ t: 'Já aplicou toxina antes? Quando?', k: 'Texto' }, { t: 'Tem doença neuromuscular?', k: 'Sim ou não' }, { t: 'Usa anticoagulante?', k: 'Sim ou não' }] },
  { id: 3, nome: 'Harmonização orofacial', uso: 'Estética', usos: 12, qs: [{ t: 'Já fez preenchimento? Com qual produto?', k: 'Texto' }, { t: 'Tem histórico de herpes labial?', k: 'Sim ou não' }] },
  { id: 4, nome: 'Odontológica geral', uso: 'Odontologia', usos: 27, qs: [{ t: 'Sente sensibilidade nos dentes?', k: 'Sim ou não' }, { t: 'Com que frequência usa fio dental?', k: 'Múltipla escolha' }, { t: 'Tem diabetes ou hipertensão?', k: 'Sim ou não' }] },
];
function AnamneseModelos({ mobile }) {
  const [list, setList] = useAnamModels();
  const [ed, setEd] = React.useState(null);
  const [copied, setCopied] = React.useState(null);
  const copy = (m) => { try { navigator.clipboard && navigator.clipboard.writeText('https://salute.app/a/' + slug(m.nome)); } catch (e) {} setCopied(m.id); };
  const save = () => { if (!ed.nome.trim()) return; setList((l) => l.some((x) => x.id === ed.id) ? l.map((x) => x.id === ed.id ? ed : x) : [...l, ed]); setEd(null); };
  const setQ = (i, v) => setEd({ ...ed, qs: ed.qs.map((q, j) => j === i ? { ...q, ...v } : q) });
  if (ed) return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <button type="button" onClick={() => setEd(null)} style={{ ...linkBtn, alignSelf: 'flex-start', fontSize: 14 }}><OIcon name="arrow-left" size={15} />Voltar aos modelos</button>
      <Block title={list.some((x) => x.id === ed.id) ? 'Editar modelo' : 'Novo modelo'}>
        <div style={grid2(mobile)}><OInput label="Nome do modelo" value={ed.nome} placeholder="Ex.: Pós procedimento" onChange={(e) => setEd({ ...ed, nome: e.target.value })} /><OSelect label="Área" options={['Estética', 'Odontologia', 'Geral']} value={ed.uso} onChange={(e) => setEd({ ...ed, uso: e.target.value })} /></div>
      </Block>
      <Block title="Perguntas" desc="O paciente responde pelo link, direto no celular." right={<span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{ed.qs.length} perguntas</span>}>
        {ed.qs.map((q, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: mobile ? 'wrap' : 'nowrap', padding: 10, borderRadius: 16, background: 'rgba(255,255,255,.7)' }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(31,94,255,.1)', color: '#1F5EFF', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
            <div style={{ flex: 1, minWidth: 200 }}><OInput placeholder="Escreva a pergunta" value={q.t} onChange={(e) => setQ(i, { t: e.target.value })} /></div>
            <div style={{ width: mobile ? 'calc(100% - 80px)' : 190 }}><OSelect options={TIPOS_Q} value={q.k} onChange={(e) => setQ(i, { k: e.target.value })} /></div>
            <button type="button" aria-label="Remover pergunta" onClick={() => setEd({ ...ed, qs: ed.qs.filter((_, j) => j !== i) })} style={{ ...fCircle, width: 36, height: 36 }}><OIcon name="trash-2" size={15} /></button>
          </div>
        ))}
        <button type="button" onClick={() => setEd({ ...ed, qs: [...ed.qs, { t: '', k: 'Texto' }] })} style={{ height: 44, borderRadius: 16, border: '1.5px dashed rgba(31,94,255,.4)', background: 'rgba(31,94,255,.04)', color: '#1F5EFF', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><OIcon name="plus" size={15} />Adicionar pergunta</button>
      </Block>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}><OBtn variant="secondary" onClick={() => setEd(null)}>Cancelar</OBtn><OBtn iconLeft="check" onClick={save}>Salvar modelo</OBtn></div>
    </div>
  );
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}><span style={{ fontSize: 14, color: 'var(--text-muted)' }}>Crie o modelo uma vez e envie o link para o paciente pelo prontuário.</span><OBtn size="sm" iconLeft="plus" onClick={() => setEd({ id: Date.now(), nome: '', uso: 'Estética', usos: 0, qs: [{ t: '', k: 'Texto' }] })}>Novo modelo</OBtn></div>
      <div style={grid2(mobile, 260)}>
        {list.map((m) => (
          <div key={m.id} style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16, borderRadius: 20, background: 'rgba(255,255,255,.6)', border: '1.5px solid rgba(255,255,255,.95)' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ width: 40, height: 40, borderRadius: 14, background: 'rgba(31,94,255,.1)', color: '#1F5EFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><OIcon name="clipboard-list" size={19} /></span>
              <span style={{ flex: 1, minWidth: 0 }}><span style={{ display: 'block', fontSize: 15, fontWeight: 600, color: 'var(--text-strong)' }}>{m.nome}</span><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{m.uso} · {m.qs.length} perguntas · enviado {m.usos}x</span></span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <OBtn size="sm" variant="secondary" iconLeft={copied === m.id ? 'check' : 'link'} onClick={() => copy(m)}>{copied === m.id ? 'Link copiado' : 'Copiar link'}</OBtn>
              <OBtn size="sm" variant="secondary" iconLeft="pencil" onClick={() => setEd(JSON.parse(JSON.stringify(m)))}>Editar</OBtn>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---- Equipe e acessos ---- */
const FUNC_PRESET = () => ({ 'Recepção': withKids(['pacientes', 'agenda', 'mensagens']), 'Profissional': withKids(['pacientes', 'agenda', 'mensagens']), 'Financeiro': ['painel', 'gestao', 'gestao.financeiro'], 'Administradora': allModuleIds() });
function EquipeAcessos({ mobile }) {
  const [list, setList] = useStore(TEAM_STORE);
  const [, setVA] = useStore(VIEW_AS);
  const [open, setOpen] = React.useState(null);
  const [novo, setNovo] = React.useState(false);
  const [f, setF] = React.useState({ nome: '', email: '', funcao: 'Recepção' });
  const tree = moduleTree();
  const upd = (id, fn) => setList((l) => l.map((u) => u.id !== id || u.dono ? u : { ...u, acc: fn(u.acc) }));
  const togTop = (u, m) => upd(u.id, (acc) => acc.includes(m.id) ? acc.filter((x) => x !== m.id && !x.startsWith(m.id + '.')) : [...acc, m.id, ...m.children.map((c) => c.id)]);
  const togSub = (u, m, c) => upd(u.id, (acc) => { let a = acc.includes(c.id) ? acc.filter((x) => x !== c.id) : [...acc, c.id]; const any = m.children.some((k) => a.includes(k.id)); a = any ? (a.includes(m.id) ? a : [...a, m.id]) : a.filter((x) => x !== m.id); return a; });
  const count = (u) => tree.filter((m) => u.acc.includes(m.id)).length;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 14, color: 'var(--text-muted)', flex: 1, minWidth: 220 }}>Ligue ou desligue o que cada pessoa vê. Toque no nome para liberar partes de cada módulo. A lista acompanha o sistema: módulo novo aparece aqui sozinho.</span>
        <OBtn size="sm" iconLeft="user-plus" onClick={() => setNovo(true)}>Convidar membro</OBtn>
      </div>
      <div style={gTable}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 250 + tree.length * 92 + 90 }}>
          <thead style={{ background: 'rgba(225,236,250,.7)' }}><tr><th style={gTh}>Membro</th>{tree.map((m) => <th key={m.id} style={{ ...gTh, textAlign: 'center', fontSize: 11, padding: '14px 6px' }}>{m.label}</th>)}<th style={{ ...gTh, textAlign: 'center', fontSize: 11, padding: '14px 6px' }}>Ver como</th></tr></thead>
          <tbody>{list.map((u) => (
            <React.Fragment key={u.id}>
              <tr>
                <td style={gTd}>
                  <button type="button" onClick={() => setOpen(open === u.id ? null : u.id)} style={{ display: 'flex', alignItems: 'center', gap: 10, border: 0, background: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
                    <OIcon name={open === u.id ? 'chevron-down' : 'chevron-right'} size={16} color="var(--text-muted)" />
                    <OAv name={u.nome} size={34} />
                    <span><span style={{ display: 'block', fontWeight: 600, color: 'var(--text-strong)' }}>{u.nome}{u.dono ? <span style={{ marginLeft: 6, fontSize: 10.5, color: '#7B4BC4', fontWeight: 700 }}>DONA</span> : null}</span><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{u.funcao} · {u.dono ? 'acesso total' : count(u) + ' de ' + tree.length + ' módulos'}</span></span>
                  </button>
                </td>
                {tree.map((m) => { const on = u.acc.includes(m.id), part = on && m.children.length && m.children.some((c) => !u.acc.includes(c.id)); return (
                  <td key={m.id} style={{ ...gTd, textAlign: 'center' }}><span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 2, opacity: u.dono ? .5 : 1 }}><MiniToggle on={on} label={m.label + ' para ' + u.nome} onChange={() => togTop(u, m)} />{part ? <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>parcial</span> : null}</span></td>); })}
                <td style={{ ...gTd, textAlign: 'center' }}>{u.dono ? <span style={{ fontSize: 12, color: 'var(--text-subtle)' }}>Você</span> : <button type="button" onClick={() => setVA(u.id)} title={'Ver o sistema como ' + u.nome} style={{ ...linkBtn, fontSize: 13 }}><OIcon name="eye" size={14} />Ver como</button>}</td>
              </tr>
              {open === u.id ? <tr><td colSpan={tree.length + 2} style={{ padding: '4px 16px 16px', background: 'rgba(255,255,255,.45)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(auto-fit, minmax(240px,1fr))', gap: 12 }}>
                  {tree.filter((m) => m.children.length).map((m) => (
                    <div key={m.id} style={{ padding: 12, borderRadius: 16, background: 'rgba(255,255,255,.75)', border: '1.5px solid rgba(255,255,255,.95)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-strong)' }}>{m.label}</span>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', opacity: u.dono ? .5 : 1 }}>{m.children.map((c) => <FilterChip key={c.id} active={u.acc.includes(c.id)} onClick={() => !u.dono && togSub(u, m, c)}>{u.acc.includes(c.id) ? <OIcon name="check" size={13} /> : null}{c.label}</FilterChip>)}</div>
                    </div>
                  ))}
                </div>
              </td></tr> : null}
            </React.Fragment>
          ))}</tbody>
        </table>
      </div>
      <GPortal><ODialog open={novo} onClose={() => setNovo(false)} icon="user-plus" title="Convidar membro" description="A pessoa recebe um convite por e-mail com os acessos escolhidos." width={560}
        footer={<><OBtn variant="secondary" onClick={() => setNovo(false)}>Cancelar</OBtn><OBtn iconLeft="send" onClick={() => { if (!f.nome.trim()) return; setList([...list, { id: Date.now(), nome: f.nome.trim(), email: f.email || '', funcao: f.funcao, acc: FUNC_PRESET()[f.funcao] || [] }]); setNovo(false); setF({ nome: '', email: '', funcao: 'Recepção' }); }}>Enviar convite</OBtn></>}>
        <div style={{ display: 'grid', gap: 14 }}>
          <OInput label="Nome" value={f.nome} onChange={(e) => setF({ ...f, nome: e.target.value })} />
          <OInput label="E-mail" type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
          <ChipPick label="Função (já define os acessos iniciais)" opts={['Recepção', 'Profissional', 'Financeiro', 'Administradora']} value={f.funcao} onChange={(v) => setF({ ...f, funcao: v })} />
        </div>
      </ODialog></GPortal>
    </div>
  );
}

/* ---- Profissionais ---- */
const PROF0 = [
  { id: 1, nome: 'Dra. Camila Rocha', esp: 'Biomédica esteta', reg: 'CRBM 12345', cor: '#1F5EFF', procs: ['Toxina botulínica', 'Preenchimento labial', 'Bioestimulador', 'Fios de PDO'] },
  { id: 2, nome: 'Darlene Robertson', esp: 'Esteticista', reg: 'Registro profissional', cor: '#2DBF6A', procs: ['Limpeza de pele', 'Peeling químico'] },
  { id: 3, nome: 'Max Worthington', esp: 'Cirurgião dentista', reg: 'CRO SP 98765', cor: '#7B4BC4', procs: ['Clareamento dental', 'Limpeza dental', 'Restauração'] },
  { id: 4, nome: 'Dr. McCoy', esp: 'Endodontista', reg: 'CRO SP 54321', cor: '#F5B400', procs: ['Tratamento de canal', 'Restauração', 'Avaliação'] },
];
const PROF_STORE = makeStore(PROF0.map((p) => ({ ...p, foto: null })));
const profFoto = (nome) => { const p = PROF_STORE.v.find((x) => x.nome === nome); return p ? p.foto : null; };
const CORES = ['#1F5EFF', '#22C3F2', '#7B4BC4', '#2DBF6A', '#F5B400', '#F2694A'];
function ProfissionaisCad({ mobile }) {
  const [list, setList] = useStore(PROF_STORE);
  const fotoRef = React.useRef(null);
  const [ed, setEd] = React.useState(null);
  const allProcs = FIN_PROCS.map((p) => p.n);
  const save = () => { if (!ed.nome.trim()) return; setList((l) => l.some((x) => x.id === ed.id) ? l.map((x) => x.id === ed.id ? ed : x) : [...l, ed]); setEd(null); };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}><span style={{ fontSize: 14, color: 'var(--text-muted)' }}>Quem realiza os procedimentos. Aparecem na agenda e no financeiro.</span><OBtn size="sm" iconLeft="plus" onClick={() => setEd({ id: Date.now(), nome: '', esp: '', reg: '', cor: CORES[list.length % CORES.length], procs: [] })}>Novo profissional</OBtn></div>
      <div style={grid2(mobile, 280)}>
        {list.map((p) => (
          <div key={p.id} style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16, borderRadius: 20, background: 'rgba(255,255,255,.6)', border: '1.5px solid rgba(255,255,255,.95)', borderLeft: `4px solid ${p.cor}` }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}><OAv name={p.nome} src={p.foto || undefined} size={44} /><span style={{ flex: 1, minWidth: 0 }}><span style={{ display: 'block', fontSize: 15, fontWeight: 600, color: 'var(--text-strong)' }}>{p.nome}</span><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.esp} · {p.reg}</span></span>
              <button type="button" aria-label="Editar" onClick={() => setEd(JSON.parse(JSON.stringify(p)))} style={{ ...fCircle, width: 36, height: 36 }}><OIcon name="pencil" size={15} /></button></div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{p.procs.map((x) => <span key={x} style={{ fontSize: 12, padding: '3px 10px', borderRadius: 999, background: `color-mix(in srgb, ${p.cor} 10%, white)`, color: 'var(--text-body)' }}>{x}</span>)}</div>
          </div>
        ))}
      </div>
      <GPortal><ODialog open={!!ed} onClose={() => setEd(null)} icon="stethoscope" title={ed && list.some((x) => x.id === ed.id) ? 'Editar profissional' : 'Novo profissional'} width={620}
        footer={<><OBtn variant="secondary" onClick={() => setEd(null)}>Cancelar</OBtn><OBtn iconLeft="check" onClick={save}>Salvar</OBtn></>}>
        {ed ? <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 14 }}>
          <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: 14 }}>
            <button type="button" onClick={() => fotoRef.current && fotoRef.current.click()} aria-label="Escolher foto" style={{ position: 'relative', padding: 0, border: 0, background: 'none', cursor: 'pointer', borderRadius: '50%' }}>
              <OAv name={ed.nome || '?'} src={ed.foto || undefined} size={64} ring />
              <span style={{ position: 'absolute', right: -2, bottom: -2, width: 26, height: 26, borderRadius: '50%', background: '#1F5EFF', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 2px #fff' }}><OIcon name="camera" size={13} /></span>
            </button>
            <input ref={fotoRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={async (e) => { const f = e.target.files && e.target.files[0]; if (f) setEd({ ...ed, foto: await readFile(f) }); e.target.value = ''; }} />
            <div style={{ flex: 1 }}><OInput label="Nome" value={ed.nome} onChange={(e) => setEd({ ...ed, nome: e.target.value })} /></div>
          </div>
          <OInput label="Especialidade" value={ed.esp} onChange={(e) => setEd({ ...ed, esp: e.target.value })} />
          <OInput label="Conselho e número" placeholder="Ex.: CRO SP 12345" value={ed.reg} onChange={(e) => setEd({ ...ed, reg: e.target.value })} />
          <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-strong)' }}>Cor na agenda</span><div style={{ display: 'flex', gap: 8 }}>{CORES.map((c) => <button key={c} type="button" aria-label={c} onClick={() => setEd({ ...ed, cor: c })} style={{ width: 30, height: 30, borderRadius: '50%', background: c, border: 0, cursor: 'pointer', boxShadow: ed.cor === c ? `0 0 0 3px #fff, 0 0 0 5px ${c}` : 'none' }} />)}</div></div>
          <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-strong)' }}>Procedimentos que realiza</span><div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{allProcs.map((x) => { const on = ed.procs.includes(x); return <FilterChip key={x} active={on} onClick={() => setEd({ ...ed, procs: on ? ed.procs.filter((y) => y !== x) : [...ed.procs, x] })}>{on ? <OIcon name="check" size={14} /> : null}{x}</FilterChip>; })}</div></div>
        </div> : null}
      </ODialog></GPortal>
    </div>
  );
}

/* ---- Insumos ---- */
function InsumosCad({ mobile }) {
  const [cats, setCats] = React.useState(EST_CATS);
  const [nc, setNc] = React.useState('');
  const [list, setList] = React.useState(PRODUTOS0.map((p) => ({ id: p.id, nome: p.nome, cat: p.cat, un: p.un, min: p.min })));
  const [f, setF] = React.useState({ nome: '', cat: EST_CATS[0], un: UNIDADES[0], min: '' });
  const addCat = () => { const v = nc.trim(); if (v && !cats.includes(v)) setCats([...cats, v]); setNc(''); };
  const add = () => { if (!f.nome.trim()) return; setList([{ id: Date.now(), nome: f.nome.trim(), cat: f.cat, un: f.un, min: +f.min || 0 }, ...list]); setF({ ...f, nome: '', min: '' }); };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Block title="Categorias de insumo" desc="Usadas no cadastro e nos relatórios do estoque.">
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
          {cats.map((c) => <span key={c} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, height: 32, padding: '0 6px 0 12px', borderRadius: 999, background: '#fff', border: '1.5px solid rgba(214,226,242,.9)', fontSize: 13, fontWeight: 500, color: 'var(--text-strong)' }}>{c}<button type="button" aria-label={'Remover ' + c} onClick={() => setCats(cats.filter((x) => x !== c))} style={{ width: 20, height: 20, borderRadius: '50%', border: 0, background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}><OIcon name="x" size={12} /></button></span>)}
          <span style={{ display: 'inline-flex', alignItems: 'center', height: 32, borderRadius: 999, border: '1.5px dashed rgba(31,94,255,.4)', padding: '0 4px 0 12px', background: 'rgba(31,94,255,.04)' }}><input value={nc} onChange={(e) => setNc(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addCat()} placeholder="Nova categoria" style={{ width: 120, border: 0, outline: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: 13 }} /><button type="button" aria-label="Adicionar categoria" onClick={addCat} style={{ width: 24, height: 24, borderRadius: '50%', border: 0, background: '#1F5EFF', color: '#fff', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}><OIcon name="plus" size={13} /></button></span>
        </div>
      </Block>
      <Block title="Novo insumo">
        <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr 1fr' : 'minmax(0,2fr) minmax(0,1.2fr) minmax(0,1fr) 110px auto', gap: 12, alignItems: 'end' }}>
          <div style={{ gridColumn: mobile ? '1 / -1' : 'auto' }}><OInput label="Nome" placeholder="Ex.: Gaze estéril" value={f.nome} onChange={(e) => setF({ ...f, nome: e.target.value })} /></div>
          <OSelect label="Categoria" options={cats} value={f.cat} onChange={(e) => setF({ ...f, cat: e.target.value })} />
          <OSelect label="Unidade" options={UNIDADES} value={f.un} onChange={(e) => setF({ ...f, un: e.target.value })} />
          <OInput label="Mínimo" type="number" value={f.min} onChange={(e) => setF({ ...f, min: e.target.value })} />
          <OBtn iconLeft="plus" onClick={add}>Adicionar</OBtn>
        </div>
      </Block>
      <div style={gTable}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
          <thead style={{ background: 'rgba(225,236,250,.7)' }}><tr><th style={gTh}>Insumo</th><th style={gTh}>Categoria</th><th style={gTh}>Unidade</th><th style={gTh}>Mínimo</th><th style={{ ...gTh, width: 40 }} /></tr></thead>
          <tbody>{list.map((p) => <tr key={p.id}><td style={{ ...gTd, fontWeight: 600, color: 'var(--text-strong)' }}>{p.nome}</td><td style={gTd}>{p.cat}</td><td style={gTd}>{p.un}</td><td style={gTd}>{p.min}</td><td style={gTd}><button type="button" aria-label="Remover" onClick={() => setList(list.filter((x) => x.id !== p.id))} style={{ ...fCircle, width: 30, height: 30 }}><OIcon name="trash-2" size={13} /></button></td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}

const CAD_ITEMS = [['clinica', 'Clínica', 'building-2'], ['anamnese', 'Modelos de anamnese', 'clipboard-list'], ['equipe', 'Equipe e acessos', 'shield-check'], ['profissionais', 'Profissionais', 'stethoscope']];
function CadastroTab({ mobile }) {
  const [sec, setSec] = React.useState('clinica');
  const cur = CAD_ITEMS.find((x) => x[0] === sec);
  const menu = mobile ? (
    <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>{CAD_ITEMS.map(([k, l, i]) => <span key={k} style={{ flexShrink: 0 }}><FilterChip active={sec === k} onClick={() => setSec(k)}><OIcon name={i} size={14} />{l}</FilterChip></span>)}</div>
  ) : (
    <section style={{ ...glass, padding: '20px 0', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ margin: '0 22px 14px', fontSize: 20, fontWeight: 600, color: 'var(--text-strong)' }}>Cadastro</h3>
      {CAD_ITEMS.map(([k, l, i]) => { const on = k === sec; return <button key={k} type="button" onClick={() => setSec(k)} style={{ display: 'flex', alignItems: 'center', gap: 12, height: 54, padding: '0 24px', border: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 16, textAlign: 'left', background: on ? 'linear-gradient(180deg,#0B4BEB 0%,#1FB6F5 100%)' : 'transparent', color: on ? '#fff' : 'var(--text-strong)' }}><OIcon name={i} size={18} />{l}</button>; })}
    </section>
  );
  return (
    <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '280px minmax(0,1fr)', gap: mobile ? 14 : 22, alignItems: 'start' }}>
      {menu}
      <section style={{ ...glass, padding: mobile ? 16 : 26, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <CardTitle size={mobile ? 19 : 22}>{cur[1]}</CardTitle>
        {sec === 'clinica' ? <ClinicaForm mobile={mobile} /> : null}
        {sec === 'anamnese' ? <AnamneseModelos mobile={mobile} /> : null}
        {sec === 'equipe' ? <EquipeAcessos mobile={mobile} /> : null}
        {sec === 'profissionais' ? <ProfissionaisCad mobile={mobile} /> : null}
      </section>
    </div>
  );
}

/* ---- Saluteflix ---- */
const FLIX0 = [
  { id: 1, t: 'Atendimento que converte no WhatsApp', tipo: 'Curso', cat: 'Comercial', dur: '2h 40min', aulas: 12, prog: 65, g: ['#0B4BEB', '#22C3F2'], ic: 'message-circle' },
  { id: 2, t: 'Toxina botulínica: protocolos e marcação', tipo: 'Curso', cat: 'Técnico', dur: '4h 15min', aulas: 18, prog: 30, g: ['#7B4BC4', '#4F7BE6'], ic: 'syringe' },
  { id: 3, t: 'Gestão financeira para clínicas', tipo: 'Curso', cat: 'Gestão', dur: '3h 05min', aulas: 14, prog: 0, g: ['#0A3FE0', '#2DBF6A'], ic: 'wallet' },
  { id: 4, t: 'Como usar a Renata IA no dia a dia', tipo: 'Curso', cat: 'Sistema', dur: '58min', aulas: 6, prog: 100, g: ['#4F7BE6', '#C084FC'], ic: 'sparkles' },
  { id: 5, t: 'Marketing para clínicas de estética', tipo: 'Curso', cat: 'Marketing', dur: '2h 20min', aulas: 10, prog: 0, g: ['#F2694A', '#F5B400'], ic: 'megaphone' },
  { id: 6, t: 'LGPD na prática da clínica', tipo: 'Curso', cat: 'Gestão', dur: '1h 10min', aulas: 5, prog: 0, g: ['#0E2350', '#4F7BE6'], ic: 'shield-check' },
  { id: 7, t: 'Tráfego pago para clínicas', tipo: 'Serviço', cat: 'Marketing', dur: 'Mensal', aulas: 0, prog: 0, g: ['#0B4BEB', '#7B4BC4'], ic: 'trending-up' },
  { id: 8, t: 'Implantação assistida do sistema', tipo: 'Serviço', cat: 'Sistema', dur: '3 encontros', aulas: 0, prog: 0, g: ['#22C3F2', '#2DBF6A'], ic: 'rocket' },
  { id: 9, t: 'Identidade visual da clínica', tipo: 'Serviço', cat: 'Marketing', dur: 'Projeto', aulas: 0, prog: 0, g: ['#C084FC', '#F2694A'], ic: 'palette' },
];
function FlixCard({ c, w = 260 }) {
  return (
    <div style={{ width: w, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 8, cursor: 'pointer' }}>
      <div style={{ position: 'relative', height: w * 0.56, borderRadius: 18, overflow: 'hidden', background: `linear-gradient(135deg, ${c.g[0]}, ${c.g[1]})`, boxShadow: '0 12px 24px -16px rgba(23,73,170,.6)' }}>
        <span style={{ position: 'absolute', right: -18, bottom: -22, color: 'rgba(255,255,255,.18)' }}><OIcon name={c.ic} size={130} strokeWidth={1.2} /></span>
        <span style={{ position: 'absolute', left: 12, top: 12, fontSize: 11, fontWeight: 600, color: '#fff', background: 'rgba(255,255,255,.2)', borderRadius: 999, padding: '3px 10px' }}>{c.tipo === 'Curso' ? c.cat : 'Serviço'}</span>
        <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 46, height: 46, borderRadius: '50%', background: 'rgba(255,255,255,.92)', color: c.g[0], display: 'flex', alignItems: 'center', justifyContent: 'center' }}><OIcon name={c.tipo === 'Curso' ? 'play' : 'arrow-right'} size={20} /></span>
        {c.prog ? <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 4, background: 'rgba(255,255,255,.3)' }}><span style={{ display: 'block', width: c.prog + '%', height: '100%', background: '#fff' }} /></span> : null}
      </div>
      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-strong)', lineHeight: 1.3 }}>{c.t}</span>
      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{c.tipo === 'Curso' ? `${c.aulas} aulas · ${c.dur}${c.prog === 100 ? ' · Concluído' : c.prog ? ` · ${c.prog}%` : ''}` : c.dur}</span>
    </div>
  );
}
function Row({ title, items, mobile }) {
  if (!items.length) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <span style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-strong)' }}>{title}</span>
      <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 6, scrollbarWidth: 'thin', scrollbarColor: 'rgba(150,175,210,.5) transparent' }}>{items.map((c) => <FlixCard key={c.id} c={c} w={mobile ? 220 : 260} />)}</div>
    </div>
  );
}
function SaluteflixTab({ mobile }) {
  const [sub, setSub] = React.useState('cursos');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 14 : 20 }}>
      <GTabs items={[['cursos', 'Cursos e serviços', 'graduation-cap'], ['cast', 'Salute Cast', 'mic']]} value={sub} onChange={setSub} />
      {sub === 'cursos' ? <FlixCursos mobile={mobile} /> : <SaluteCast mobile={mobile} />}
    </div>
  );
}
function FlixCursos({ mobile }) {
  const [list, setList] = React.useState(FLIX0);
  const [cat, setCat] = React.useState('Todos');
  const [novo, setNovo] = React.useState(false);
  const [f, setF] = React.useState({ t: '', tipo: 'Curso', cat: 'Técnico', dur: '', link: '' });
  const vis = list.filter((c) => cat === 'Todos' || c.cat === cat);
  const hero = list[1];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 16 : 24 }}>
      <section style={{ position: 'relative', overflow: 'hidden', borderRadius: 28, padding: mobile ? 22 : '36px 40px', minHeight: mobile ? 200 : 240, background: 'linear-gradient(110deg, #0A2A8F 0%, #0B4BEB 45%, #7B4BC4 100%)', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 10, boxShadow: '0 24px 48px -28px rgba(11,75,235,.8)' }}>
        <span style={{ position: 'absolute', right: mobile ? -40 : 30, top: mobile ? -20 : 10, color: 'rgba(255,255,255,.12)' }}><OIcon name="clapperboard" size={mobile ? 180 : 240} strokeWidth={1} /></span>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.18em', opacity: .85 }}>SALUTEFLIX · EM DESTAQUE</span>
        <span style={{ fontSize: mobile ? 22 : 30, fontWeight: 700, maxWidth: 560, lineHeight: 1.15 }}>{hero.t}</span>
        <span style={{ fontSize: 14, opacity: .85 }}>{hero.aulas} aulas · {hero.dur} · você parou em {hero.prog}%</span>
        <div style={{ display: 'flex', gap: 10, marginTop: 6, flexWrap: 'wrap' }}>
          <button type="button" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 44, padding: '0 22px', borderRadius: 999, border: 0, background: '#fff', color: '#0B4BEB', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}><OIcon name="play" size={16} />Continuar</button>
          <button type="button" onClick={() => setNovo(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 44, padding: '0 20px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,.6)', background: 'rgba(255,255,255,.12)', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 500, cursor: 'pointer' }}><OIcon name="plus" size={16} />Novo conteúdo</button>
        </div>
      </section>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{['Todos', 'Técnico', 'Comercial', 'Gestão', 'Marketing', 'Sistema'].map((c) => <FilterChip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</FilterChip>)}</div>
      <Row title="Continue assistindo" items={vis.filter((c) => c.tipo === 'Curso' && c.prog > 0 && c.prog < 100)} mobile={mobile} />
      <Row title="Cursos" items={vis.filter((c) => c.tipo === 'Curso')} mobile={mobile} />
      <Row title="Serviços" items={vis.filter((c) => c.tipo === 'Serviço')} mobile={mobile} />
      <GPortal><ODialog open={novo} onClose={() => setNovo(false)} icon="clapperboard" title="Novo conteúdo" description="Cursos, aulas e serviços aparecem para todas as clínicas." width={600}
        footer={<><OBtn variant="secondary" onClick={() => setNovo(false)}>Cancelar</OBtn><OBtn iconLeft="check" onClick={() => { if (!f.t.trim()) return; setList([...list, { id: Date.now(), t: f.t.trim(), tipo: f.tipo, cat: f.cat, dur: f.dur || 'A definir', aulas: f.tipo === 'Curso' ? 1 : 0, prog: 0, g: ['#0B4BEB', '#22C3F2'], ic: f.tipo === 'Curso' ? 'graduation-cap' : 'briefcase-business' }]); setNovo(false); }}>Publicar</OBtn></>}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 14 }}>
          <OInput label="Título" value={f.t} onChange={(e) => setF({ ...f, t: e.target.value })} style={{ gridColumn: '1 / -1' }} />
          <ChipPick label="Tipo" opts={['Curso', 'Serviço']} value={f.tipo} onChange={(v) => setF({ ...f, tipo: v })} />
          <OSelect label="Categoria" options={['Técnico', 'Comercial', 'Gestão', 'Marketing', 'Sistema']} value={f.cat} onChange={(e) => setF({ ...f, cat: e.target.value })} />
          <OInput label={f.tipo === 'Curso' ? 'Duração' : 'Formato'} placeholder={f.tipo === 'Curso' ? 'Ex.: 2h 30min' : 'Ex.: Mensal'} value={f.dur} onChange={(e) => setF({ ...f, dur: e.target.value })} />
          <OInput label={f.tipo === 'Curso' ? 'Link do vídeo' : 'Link de contratação'} iconLeft="link" value={f.link} onChange={(e) => setF({ ...f, link: e.target.value })} style={{ gridColumn: '1 / -1' }} />
        </div>
      </ODialog></GPortal>
    </div>
  );
}

/* ---- Parcerias ---- */
const PARC0 = [
  { id: 1, nome: 'Distribuidora Med', cat: 'Distribuidor', ben: '8% de desconto em injetáveis', cupom: 'SALUTE8', site: 'distribuidoramed.com.br', of: true },
  { id: 2, nome: 'Lab Sorriso', cat: 'Laboratório', ben: 'Frete grátis em próteses', cupom: 'SALUTEFRETE', site: 'labsorriso.com.br', of: true },
  { id: 3, nome: 'PagClin', cat: 'Pagamentos', ben: 'Taxa de 2,49% no crédito à vista', cupom: '', site: 'pagclin.com.br', of: true },
  { id: 4, nome: 'Estetic Supply', cat: 'Distribuidor', ben: '5% em bioestimuladores', cupom: 'SALUTE5', site: 'esteticsupply.com.br', of: false },
  { id: 5, nome: 'Contábil Saúde', cat: 'Serviços', ben: 'Primeiro mês grátis', cupom: '', site: 'contabilsaude.com.br', of: true },
];
function ParceriasTab({ mobile }) {
  const [list, setList] = React.useState(PARC0);
  const [cat, setCat] = React.useState('Todos');
  const [novo, setNovo] = React.useState(false);
  const [cp, setCp] = React.useState(null);
  const [f, setF] = React.useState({ nome: '', cat: 'Distribuidor', ben: '', cupom: '', site: '', of: true });
  const cats = ['Todos', ...Array.from(new Set(list.map((p) => p.cat)))];
  const vis = list.filter((p) => cat === 'Todos' || p.cat === cat);
  return (
    <section style={{ ...glass, padding: mobile ? 16 : 26, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <CardTitle size={mobile ? 19 : 22} right={<OBtn size="sm" iconLeft="plus" onClick={() => setNovo(true)}>{mobile ? 'Novo' : 'Novo parceiro'}</OBtn>}>Parceiros</CardTitle>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{cats.map((c) => <FilterChip key={c} active={cat === c} onClick={() => setCat(c)}>{c}</FilterChip>)}</div>
      <div style={grid2(mobile, 280)}>
        {vis.map((p, i) => (
          <div key={p.id} style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 18, borderRadius: 22, background: 'rgba(255,255,255,.6)', border: '1.5px solid rgba(255,255,255,.95)' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ width: 48, height: 48, borderRadius: 16, background: `linear-gradient(135deg, ${PAL[i % PAL.length]}, ${PAL[(i + 2) % PAL.length]})`, color: '#fff', fontSize: 17, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{p.nome.split(' ').map((w) => w[0]).slice(0, 2).join('')}</span>
              <span style={{ flex: 1, minWidth: 0 }}><span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 15, fontWeight: 600, color: 'var(--text-strong)' }}>{p.nome}{p.of ? <OIcon name="badge-check" size={16} color="#1F5EFF" /> : null}</span><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{p.cat}{p.of ? ' · Parceiro oficial' : ''}</span></span>
            </div>
            <div style={{ padding: '10px 12px', borderRadius: 14, background: 'rgba(45,191,106,.08)', color: '#1E8E4E', fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 8 }}><OIcon name="gift" size={16} />{p.ben}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              {p.cupom ? <OBtn size="sm" variant="secondary" iconLeft={cp === p.id ? 'check' : 'copy'} onClick={() => { try { navigator.clipboard && navigator.clipboard.writeText(p.cupom); } catch (e) {} setCp(p.id); }}>{cp === p.id ? 'Copiado' : 'Cupom ' + p.cupom}</OBtn> : null}
              <OBtn size="sm" variant="secondary" iconLeft="external-link" onClick={() => window.open('https://' + p.site, '_blank')}>Site</OBtn>
            </div>
          </div>
        ))}
      </div>
      <GPortal><ODialog open={novo} onClose={() => setNovo(false)} icon="handshake" title="Novo parceiro" width={580}
        footer={<><OBtn variant="secondary" onClick={() => setNovo(false)}>Cancelar</OBtn><OBtn iconLeft="check" onClick={() => { if (!f.nome.trim()) return; setList([...list, { ...f, id: Date.now(), nome: f.nome.trim() }]); setNovo(false); setF({ nome: '', cat: 'Distribuidor', ben: '', cupom: '', site: '', of: true }); }}>Salvar parceiro</OBtn></>}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 14 }}>
          <OInput label="Nome do parceiro" value={f.nome} onChange={(e) => setF({ ...f, nome: e.target.value })} />
          <OSelect label="Categoria" options={['Distribuidor', 'Laboratório', 'Pagamentos', 'Serviços', 'Marketing', 'Equipamentos']} value={f.cat} onChange={(e) => setF({ ...f, cat: e.target.value })} />
          <OInput label="Benefício para as clínicas" placeholder="Ex.: 10% de desconto" value={f.ben} onChange={(e) => setF({ ...f, ben: e.target.value })} style={{ gridColumn: '1 / -1' }} />
          <OInput label="Cupom" placeholder="Opcional" value={f.cupom} onChange={(e) => setF({ ...f, cupom: e.target.value.toUpperCase() })} />
          <OInput label="Site" placeholder="parceiro.com.br" value={f.site} onChange={(e) => setF({ ...f, site: e.target.value })} />
          <div style={{ gridColumn: '1 / -1' }}><Toggle on={f.of} onChange={(v) => setF({ ...f, of: v })} label="Parceiro oficial" desc="Mostra o selo de verificado" /></div>
        </div>
      </ODialog></GPortal>
    </section>
  );
}

/* ---- Salute Cast ---- */
const CAST_STORE = makeStore([
  { id: 1, ep: 4, t: 'Recepção 24 horas: o que muda quando a IA atende o WhatsApp', conv: 'Gestora de clínica de estética', dur: '48 min', data: '2026-09-26', url: '', g: ['#0A2A8F', '#7B4BC4'] },
  { id: 2, ep: 3, t: 'Como clínicas pequenas organizam o financeiro sem planilha', conv: 'Contador especialista em saúde', dur: '41 min', data: '2026-09-12', url: '', g: ['#0B4BEB', '#22C3F2'] },
  { id: 3, ep: 2, t: 'Anamnese digital e LGPD na prática', conv: 'Advogada de direito digital', dur: '37 min', data: '2026-08-29', url: '', g: ['#4F7BE6', '#C084FC'] },
  { id: 4, ep: 1, t: 'Do consultório à rede: crescer sem perder o atendimento', conv: 'Dentista e empreendedor', dur: '55 min', data: '2026-08-15', url: '', g: ['#7B4BC4', '#0B4BEB'] },
]);
const ytId = (u) => { const m = String(u || '').match(/(?:youtu\.be\/|v=|embed\/|shorts\/|live\/)([\w-]{11})/); return m ? m[1] : null; };
function CastPlayer({ e, onClose, onLink }) {
  const [link, setLink] = React.useState('');
  const id = ytId(e.url);
  return (
    <Overlay><div style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(8,20,48,.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }} onClick={onClose}>
      <div onClick={(ev) => ev.stopPropagation()} style={{ width: 'min(980px, 100%)', display: 'flex', flexDirection: 'column', gap: 14, color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ flex: 1, minWidth: 0 }}><span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.14em', opacity: .75 }}>SALUTE CAST · EP. {String(e.ep).padStart(2, '0')}</span><br /><b style={{ fontSize: 18 }}>{e.t}</b></span>
          <button type="button" aria-label="Fechar" onClick={onClose} style={{ ...fCircle, background: 'rgba(255,255,255,.15)', color: '#fff', border: 0 }}><OIcon name="x" size={18} /></button>
        </div>
        <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', borderRadius: 20, overflow: 'hidden', background: `linear-gradient(135deg, ${e.g[0]}, ${e.g[1]})` }}>
          {id ? <iframe title={e.t} src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }} />
            : <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, padding: 20, textAlign: 'center' }}>
              <OIcon name="video" size={34} /><b style={{ fontSize: 17 }}>Este episódio ainda não tem vídeo</b><span style={{ fontSize: 14, opacity: .85 }}>Cole o link do YouTube para publicar.</span>
              <div style={{ display: 'flex', gap: 8, width: 'min(520px, 100%)' }}><input value={link} onChange={(ev) => setLink(ev.target.value)} placeholder="https://youtube.com/watch?v=..." style={{ flex: 1, minWidth: 0, height: 44, borderRadius: 999, border: 0, padding: '0 16px', fontFamily: 'inherit', fontSize: 14, outline: 'none' }} /><OBtn onClick={() => link.trim() && onLink(link.trim())}>Salvar</OBtn></div>
            </div>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap', fontSize: 13, opacity: .85 }}><span>Convidado: {e.conv} · {e.dur} · {dBR(e.data)}</span>{id ? <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer" style={{ color: '#fff' }}>Abrir no YouTube</a> : null}</div>
      </div>
    </div></Overlay>
  );
}
function SaluteCast({ mobile }) {
  const [eps, setEps] = useStore(CAST_STORE);
  const [play, setPlay] = React.useState(null);
  const [novo, setNovo] = React.useState(false);
  const [f, setF] = React.useState({ t: '', conv: '', dur: '', url: '' });
  const sorted = [...eps].sort((a, b) => b.ep - a.ep), hero = sorted[0];
  const cur = eps.find((x) => x.id === play);
  const save = () => { if (!f.t.trim()) return; const ep = Math.max(0, ...eps.map((x) => x.ep)) + 1; setEps([...eps, { id: Date.now(), ep, t: f.t.trim(), conv: f.conv || 'Convidado', dur: f.dur || 'A definir', data: TODAY_ISO, url: f.url.trim(), g: [['#0B4BEB', '#7B4BC4'], ['#0A2A8F', '#22C3F2'], ['#4F7BE6', '#C084FC']][ep % 3] }]); setNovo(false); setF({ t: '', conv: '', dur: '', url: '' }); };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 16 : 24 }}>
      {hero ? <section style={{ position: 'relative', overflow: 'hidden', borderRadius: 28, padding: mobile ? 22 : '34px 40px', minHeight: mobile ? 200 : 230, background: `linear-gradient(110deg, #0A1E5E 0%, ${hero.g[0]} 45%, ${hero.g[1]} 100%)`, color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 10, boxShadow: '0 24px 48px -28px rgba(11,75,235,.8)' }}>
        <span style={{ position: 'absolute', right: mobile ? -40 : 40, top: mobile ? -10 : 20, color: 'rgba(255,255,255,.12)' }}><OIcon name="mic" size={mobile ? 170 : 210} strokeWidth={1} /></span>
        <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.18em', opacity: .85 }}>SALUTE CAST · NOVO EPISÓDIO</span>
        <span style={{ fontSize: mobile ? 21 : 28, fontWeight: 700, maxWidth: 620, lineHeight: 1.2 }}>{hero.t}</span>
        <span style={{ fontSize: 14, opacity: .85 }}>Ep. {String(hero.ep).padStart(2, '0')} · {hero.conv} · {hero.dur}</span>
        <div style={{ display: 'flex', gap: 10, marginTop: 6, flexWrap: 'wrap' }}>
          <button type="button" onClick={() => setPlay(hero.id)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 44, padding: '0 22px', borderRadius: 999, border: 0, background: '#fff', color: '#0B4BEB', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}><OIcon name="play" size={16} />Assistir</button>
          <button type="button" onClick={() => setNovo(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 44, padding: '0 20px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,.6)', background: 'rgba(255,255,255,.12)', color: '#fff', fontFamily: 'inherit', fontSize: 15, fontWeight: 500, cursor: 'pointer' }}><OIcon name="plus" size={16} />Novo episódio</button>
        </div>
      </section> : null}
      <span style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-strong)' }}>Todos os episódios</span>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(auto-fill, minmax(280px,1fr))', gap: 16 }}>
        {sorted.map((e) => (
          <button key={e.id} type="button" onClick={() => setPlay(e.id)} style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 0, border: 0, background: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
            <span style={{ position: 'relative', display: 'block', width: '100%', aspectRatio: '16 / 9', borderRadius: 18, overflow: 'hidden', background: `linear-gradient(135deg, ${e.g[0]}, ${e.g[1]})`, boxShadow: '0 12px 24px -16px rgba(23,73,170,.6)' }}>
              {ytId(e.url) ? <img src={`https://i.ytimg.com/vi/${ytId(e.url)}/hqdefault.jpg`} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} onError={(ev) => { ev.currentTarget.style.display = 'none'; }} /> : <span style={{ position: 'absolute', right: -14, bottom: -18, color: 'rgba(255,255,255,.18)' }}><OIcon name="mic" size={120} strokeWidth={1.2} /></span>}
              <span style={{ position: 'absolute', left: 12, top: 12, fontSize: 11, fontWeight: 700, color: '#fff', background: 'rgba(0,0,0,.25)', borderRadius: 999, padding: '3px 10px' }}>EP. {String(e.ep).padStart(2, '0')}</span>
              <span style={{ position: 'absolute', right: 12, bottom: 12, fontSize: 11, fontWeight: 600, color: '#fff', background: 'rgba(0,0,0,.35)', borderRadius: 999, padding: '3px 10px' }}>{e.dur}</span>
              <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,.92)', color: e.g[0], display: 'flex', alignItems: 'center', justifyContent: 'center' }}><OIcon name="play" size={20} /></span>
            </span>
            <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-strong)', lineHeight: 1.3 }}>{e.t}</span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: -4 }}>{e.conv} · {dBR(e.data)}{e.url ? '' : ' · sem vídeo ainda'}</span>
          </button>
        ))}
      </div>
      {cur ? <CastPlayer e={cur} onClose={() => setPlay(null)} onLink={(u) => setEps(eps.map((x) => x.id === cur.id ? { ...x, url: u } : x))} /> : null}
      <GPortal><ODialog open={novo} onClose={() => setNovo(false)} icon="mic" title="Novo episódio" description="Cole o link do YouTube e o episódio aparece para todas as clínicas." width={580}
        footer={<><OBtn variant="secondary" onClick={() => setNovo(false)}>Cancelar</OBtn><OBtn iconLeft="check" onClick={save}>Publicar episódio</OBtn></>}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 14 }}>
          <OInput label="Título" value={f.t} onChange={(e) => setF({ ...f, t: e.target.value })} style={{ gridColumn: '1 / -1' }} />
          <OInput label="Convidado" placeholder="Nome ou especialidade" value={f.conv} onChange={(e) => setF({ ...f, conv: e.target.value })} />
          <OInput label="Duração" placeholder="Ex.: 45 min" value={f.dur} onChange={(e) => setF({ ...f, dur: e.target.value })} />
          <OInput label="Link do YouTube" iconLeft="link" placeholder="https://youtube.com/watch?v=..." value={f.url} onChange={(e) => setF({ ...f, url: e.target.value })} style={{ gridColumn: '1 / -1' }} />
        </div>
      </ODialog></GPortal>
    </div>
  );
}

/* ---- Certificações (selos do sistema) ---- */
const SELOS_STORE = makeStore([
  { id: 1, nome: 'Startup Brasil', cat: 'Programa', desc: 'Selecionada pelo programa Startup Brasil do Ministério da Ciência, Tecnologia e Inovações.', ic: 'rocket', logo: 'data:image/png;base64,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' },
  { id: 2, nome: 'AWS Certified', cat: 'Infraestrutura', desc: 'Infraestrutura certificada pela Amazon Web Services, garantindo escalabilidade, segurança e alta disponibilidade.', ic: 'server', pad: '2px', logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAAEECAYAAADeTVP/AACJ/klEQVR42u19d3hcxb32O3Pq7qr3Lsu9d2xsjI0BgzGml0BI4+bLDQlpNySEkEJICKSXG5KQdklCCBB6dwGbYlxw792yeu/a3dNm5vtjd+WVvLuS15IsGc3z+HlAZ885c2bmnfnV9weMtGHZampaRpVWVL1aVl0jTpRVPFVe3pg/MirDs5GRIRherbW1Na3dZ9xtWsZ/C6DAsiwoigKAVLo0/c9Jbv33KSkpzSMjNQLCkTYArbSiYgXj4ueSLE82DD8YY13XJEmCrutgDjsgUfLNksLCN0ZGbASEI62f2sna2suYbX/Ttu0rCSGwbTvqbxVFgRACiqKuphA/KCks3DwygiMgHGlxtrq6uhyfad/nCHY3IUQ2TRNCiN4nlRBomgbBuU+m8l/cmvKT7Ozs2pERHQHhSOtjE0K4yqtrv2Y71t2E0nzDMKKCj1IKznnUa0EwVimy+vuivJzfEEL8IyM8AsKRFqOVV1cvt2znEULpTMsyu+l94U2SKKgkwe834NJ1cM7AGI/yWwmqqkFwvktV5G8X5eWtGhnpERCOtB6trKZmCnf4w5ZtXQNKiG1ZUUVNXdfQ1taOd97bjK3b9+CC2dNxyZILkZyUBCOGyKqoKsCFUBX5VSrL9xfn5u4fGfkREH7kW21tbbbPcu5ymPMNKtGEaHofIQSaqsBhHFu378bat99DTU0DJFkCcxhycjJx5eWLMXfODEiSBMuyoj9H08AZ65Ql5RduVX4sJyenbmQmRkD4UdT76Mmqms9zzu8HQYFpGlF1O1mWHUVROg4fOZ7y+ptvk6PHT0KiEmRZCj0LjsPAOMO4sSVYedWlYsL4sa22bSU6DpNj6YsQopJS+eFR+bl/IoTwkZkZAeFHop2sqLjU4fybIGS57ThgjhNVl1MU2apraGxftebdpK1bd6ucc2iaGgQfAHQ/7UzTAqUUF8yZbl191aUsMyvDZZlWVIBLsgxFlgEhVslU/fmowtx1IzM0AsLztlVWVo63BX5mOfa1lFJimmZUvU9TVXR4vdi4aZtY985G0tbWAV3XQCjpwl1E3Y8AggkYhoGUlBRceslCLFw4B4kJHpimFVVfDFhRhVAU+QkF+HFBQcGRkRkbAeF509rb2zOb2to+ZzP2VUmSsqK5HAghUFUFQgA7du7FmrfeR0VVDRRZgizL3e6J6i8Up57lOA5sm6GwMBdXLFuMObOmgRDAsuyo79d1HYyxekVSfpuS4P5Dampq68gMjoBwWOt9ZTU1H2cOe5BKdLRhGFFdDrIsWYqstJWWVWS8sWod2XfgCCilAVHx9OfGBGDPZjsOGGeYOnkCrr7qUjG6pKjVsqwkxrgUTQzWdR2O7exVJOVnxQW5/x7RF0dAOOxaeXX9YtsxvgWQFbZjw4mi9wUMJKrV0NjcvHrtu64Pt+1OtkwLuq71HXwxABi4FLhoGCZURcHChXPNKy5f3JGRlppkWpYaTV9UFAWyJAMQbyiy/tOivKz3RmZ2BIRDvpU1NOQxv/Fdh7PPUkpVwzCijrymqjAME1u27hRr395AmppboKkqJEk6DXDxAFD0uEAIAWMMhmEiPS1VXLFsMRbMn010XYdlWqf9PtR0XQfn3JIl6W+Srj9UnJlZPTLTIyAccq25uTm5w29+wbTNL8qyXOj3+yMCRwhA0xRQQrF330Gseft9nCgtB5UkKD30vv46ASOKqLYDxhhGjy7C8isuwfSpEwXnwrFtW4lmLHK5XHAcp0JTtD8kurQ/pqWltY3M/AgIh8bpV1l5uc34LyRZmmGYBpjDIoJPliVomoqq6lq8+trb2Lv/EAABWZZj6ZX9CsCezwtkZBBMnzpRrFxxeUtxcb5mW7bHjuY2kWXomgbmsN2KRL9RXFDw1sgKGAHhuQNfVdXFnOMbpmWuJBKlsULNNE1FR0cn1r27Ce+9vwU+nz+i3nc2BpjeTr9ozxNCwG8Y8LhcuGTJAnHpJRf5kpMSFMt2ouuLqgrBONd07TUVyoP5+Vk7RlbECAgHrVVVVWUYDr+Xg3+VEKqaZvQsB01VYTs2tu3Yi7VvvY+a2nrougZKaUxQ9Lf42du7wvXFnOxMcdWVl2DeBTOJoigwzVhxrDo44x2U0Md0mf4sPz+/cWSFjIBwwNqRI0c01eP5pMPYdwlIsREDfKqiQJIoDh05gVVr3sWRYye6XA6xQDbQ4mdv1wJ+RAeMcUyYMAYrl1+KiRPHCMdhjDEmR7qHUgpN1SCEKJOJ9JBleJ8YP368ObJiRkDYr62ipuZS03J+IsAvYIzFcjlwXdM66uobXG+sXq/u2LUfnLEgDwyGNADD9Vcg4NSXJAlz50wTK65YWpmfn+0yLSuNMU4j3SfLMiRJAgHdqlH5vsKRELgREPZHq6yvH29b1o8t276BECJZMfQ+VVXh9/ns9e9vsde/84HL6/UTXddACIkfFP0sfsYWTWPqi2LZZYt8l116serxuJRYIXCqqkIIwVRFeVFR1e8UZGWNhMCNgDAO8FW2pdvo+KbD+F2EIDkWtYSqqmCMYeeu/Xhr3fuoqKyBqqmQw/x9QwGAfTn9ojXHYTBNC8VFeVh+5SWYM3saZCrBjGmM0iAE2mSJPqYg8ecFBclNIytrBIS9DwghKC2r/CwD/y4IRpmmGTUDQZFlKKqMo8fKsHrtuzh46Gjg74py1qCIBcLBOAGj3WPZNiCAKZPHYeWKyzB+3GhYVm8RQRogcFICfaikuOBvfeHJGQHhR7SVVdUtsm3zm4KIa2PpfYQQrmtaZ1Nzi7727ffVzR/uhG3bUBQVhPSDXnaORdC+bB6mZQVC4BbMxYorL7EyM9IMwzATuBAx9UUhyCuaIv28OD9/w8iKGwFhV6upqSkxOf+JaVk3SZIkRQs1IwRQVQ2WZdnvvb/FevudD9ytbR3EFab3na1R5FwYYOJ9HueBlKnklCRx5bLFvssuuUjVVFUxrej6YjBLg2mq+rxG6X25ubmlIyD8CLeGhobETtP8b9u275FkOTcWq5miBvg89+8/grVvv4/jJ8qgKAoURT6jOM/+iAEdCgAMF99t24ZlWxg3pgQrli/FtKmTQCmBZdlRRf4AUbFToyjKLxM07c+ZmZkdIyD8qBleampuMSzrPkmWZ0dLMQqQ6MrQVBUny6uwas072Lf/MDjnp+l9wwWA8YifveuvgWuWZYNSghnTJ+Gaq5ehpLiQG6bFGYtMsXGKNdzZoajqT4pzc58dAeFHAXyVtQssYd/LhbiecQY7wm4tAFBC4NI1tLV3YO3bG/DBpm0wTQuKIp8meo4AsPtvLcuCpulYtHCuffVVlzlpqcmK1+enAGhkKUOFRCkooS8RIv+spCBn0wgIz0+9L8tvs287nN1FJaob/ugcuKqqwHEYtm7fjdVr3kVDUzN0Lb5Qs6Gu/8Xdd8S2cLIgxUZWdgaWL1viv3jhBbKiKkq0EDgA0F0ucMYNmUqPuRTpkdzc3PoREJ4Hra5OJBis5nOWbX9JkqTR0VKMAAROORAcOVaKN1e/g6PHSqEo8mnUEh8FA0zs6317FyGky30xYcJoXHf1MkycOBZCIGo9jVDKFGPshKooj+pS7l+ys0nnCAiHaSuvrl5sW84vqSLNNU0zli+L6bpGqqpq6Np1G7Bz1wHYtgNNU+I+Kfpb/Iy/H4N3AsYCe0iUv2DOdFx91WUoLMi1/YYJLoQS6UZZlgP8qDbbRlT5ntF5ee+NgHAYtYqamvkOY9+wLPs6QokSK9TMpWtWR6e3ff07m5Lf2/ih4vP6oaoKCCFxnxQfRRG0L6dtyL+YmODBxQvnta9Ycak3KTExxe/3ayKKf1FVVQjObUVVX1Yk6ReFublbRkA4hFtLS0tKa6fvHsadewilrpguh2AJsR279ok3V61HTV0DcQVTjOI3fAxeCtLgGmD6D+ghFji/30R+fg6uWXGZ78L5sxRKpZibZZBiwy9T+suUhIRfnk8scOcFCIUQckV17V2243wVFGNjhpopMiilOH6iDKvWvIuDh49BolKQavAs4jwx9GNAzzUAw68RQmBaFgQXmDplPK65ehkmjBsNxnlUfbErBI7jmCLLvy3My3mMEOKMgPAct9KKigsZEw9SmV5hWVZUvU+SKDRVRV1DI9at34gPt+2GaVpBvY+c5ckz+Em4wxGA0f5uGAY0TcNFC+ZixfKlyM7KsA3TJEIgYv6iLMtQVRXc4WskiTww3AuhDlsQ1tTUlPgd9pDjOLcQSpTYbNaKz7Js8d6GLZ51725Ce3tnl9539qLf8AVgf+t/8UsKAjxovElNTcbSJQvbr1y2uMbtdhUYpuURUaSaIGu4LcvSsy5Z/u5wDYEbdiBsbm5ObvP5Pus4zv1EktLNmHqfDAEidu850LlqzTueysoaqmkaJIn2k+Hjo+GAJwCYIOACkIjox76f/nfGAilTRYV57NprruicO3s6KKXJsfRFTdchGGuSZfnhZLf7b8ONBW5YgbCiuvoTtsO/L4gYZ1lW1FAzWQkUOTlZVom1b2/Anr0Hg5Y2pd8W6nDNgDgT8ZME/+J3ZCQqFhTK0WRo0GUOGvY1A7GJhYLAZ82Ywq+75go6uqQYjmPDtp2IEUuBQqgqiCBHFZn+sDAv718jIOzHVl5TM8+yrG8KgZuZ4HCiKu4BK1pzcyveWr8BWz7cBb/fgKoqoJSctmj7Y/GEXBmM8S5UEEoh9YiuCS3ZSFn2Pd8V+k0041L3qRMRwcg577qfENInq284CAkAg0lggmBORhPunHQciYqNfx0ZjXWVOWCCwCUHcgtFf24sYePEeSAEzuXScfFF83D18kuRnp7K/H6DCiEirl1ZUSARChA8p6nqz4tycz8cAeFZtMrKpkIG42HLsW8lsdisAaiq6jDmyJu27MDatzegubkVqqaC9mOcZ3fgIFhwxYaiKHDretdCN20LXq8/wDOqqhAQwWwDB6ZpQgRPZVVRTnsXYxymaYJxDlmWoGsR6PA54DcNMMYDMa4uvQu4tuMEDE6qCrdbByUEtsPQ0dkJzgV0LcDwHQ2ABIAjCLy2gpKkDnxiwglcll8LhQhAEHAqsLUhDf+3fyz2NKbAJTOolJ8GxLj02ihwDqRMmcjMTMdVVyzxL128wFQ1VTVNyx0rZUpwbqmy8h8J+v0FBekVIyA8g9bYKJI6zepPWbZ9ryTLhUasUDNZBqFE7D94tHPN2ncTjx0vg6apcYWa9RWYIRN7TnZW4/y5M62C3Ozt48aUFLrdrplCCLOyqubFssqaBe9+sDnr8NHjLlVVwRlDcWG+tXD+HBmE0C3bduHIsRNQw7IxOOdIT03xXbxwnnC7XZ4jx074t+3c50IQxKEFSQjBogVzjaLCfL21tQ1r1m2AZdmwHRtpaanW5UsWNE4YN3b72JLihbIspTc2Nb9fXlmdfPjoidHvfLBZ8nkN1ym9+BT4uCAwmIRE1cZ1JRW4eexJpKk2TFuCCC4VAkCVHfgFwWulhXj6yCjU+XToEgMlPH4RGbFF7tAmZlkWxo0Zxa+/9oqO6dMngwDJMVOmXC4w26lQVeVnCVrePzMySPsICHtpZVVV1zmM/5hQMsW0rN4KaKKqqg5r172PnTv3g3HWVUCzP/WTngDknIvPffq26mtXLDMlScoKjqMLp7IETADUMMzGv/zjqazXVq+TmMNw7YrL679y150SgNQt23Yee+Dh34yjlJCuU8y28fn/+nj9TdeuSADg7uj0+u6+53uumrp6EqBKDKQLjSoqaP7L735aTykmNre2tn/+q/cn1dU34oJZ0/1f//J/t+fnZrkAKME+AYANwAHgO3DoiPc7P/xlYYe3k0j0lIHKZBIUyrE4rw63jzuJsSntsB0ZjEdeIpQEwFjn1/Gfo8V4rTQfHTaFW2b9DsCezTBMUIli3pyZ7LqVl0tFRfmwbSe6e0oOpKMJLvbLEv1OcX7+y0NpzctDpSPV1Q1z/I5xr+U4t3LOYRt21DlzuXTe3t4pvbnmHWzavB0dHV6oqgKFyL3GX54tOBnj8HjcztIlC2skSRrX1tbedPT4ycSWtnYPYwwul8s/ZeK4YxnpqWN1Xcv9f5+5/di2nXtSKqpqM44eK02wLNtSVYVOnjiuMCszndTU1kNVFXDOoaoqnzRu7AEASwAgMcFTnZ+X7aqqqcsXIpDZbzsOFsybnUBpAPDbduy16huakZWZYd371bvasrMzsgGIo8dKK/cdOlLY3t5JkpMSlaysjI5pk8e3jS4Z5U5MdJO2jnaEQGhzgompbbhz4nHMyWwCBYFhKTH3bs4ZDFtGumrhy9MO47KCWvzzUAk+rEsDJX1LchZxukF0XQPnHJu2bJcOHDyMpZdchCsuu9iXmppMDMNwCdH9ncxx4HMcKIoyhQv60vHyiv+4ZP1neXmZ20dACKC1tTWtqaPjW17LezeVJI9pRPf3qYpiM8baN27a7lrz1rvu+oZmqKpyqnx0v/veRIQTmMLv80uvvvH26IbGJmzfta+gublVYpwBQkAArrTUpJKHvvuNI+PGjp7u0rSMZZcubvu/J57JqKiudZ84WX5y4vgxKYkJCa2F+bm+6pq6dABwGENuThYpKMhbAsACwAGMnj1jGtm8dXeXKKprKsaNHVUDoBhA47Yde9x+v4HLlixsz87OkAGwde9tbPnprx8r9PkNIjgHpRSyLKflZGUmZGWltTY0NgdLngVEUAqCL0w/hBlpLTAtFU5vwhO3AEIBZsGBCodTTE5tx7fn7cPn3pqPep8OOaQning2xd43zEAomwaf38SLr6zCBxs/1G+47ir/RQvmllOJJtuWnRy57gagu1y3ei3v1ccrKn6fnpj405SUlOZziQF6rl4shHCVV1d/saG1bRMh5F7bcTz+KDl+gQgJpf3Q0eP+3/3x78n/eupFd3NLG1yuU8aQWJMWj24Y7RoBAaWUPvH0C2mvr16f3NzcIkmSBE1VoGoqdF1DXUNzwj+eeiEdwDEAKWNLiiolSUJnpxd79h0sDoqrGbNnTEkMiVCcc2RlZlQnJSYcbWpuebO2vmE3AFFSXHhU11QRssCmp6Vi0vixDABraW1T9h864iIAxo0pyQCQAeDAU/95pdTn85MEjwsJCR64XDpkWUJtQ726c8/+LM5Yd0IqAoATcCb1IkcQwPGDaClQr/43pEkfB5zAnFmMApyABLdCETiOop6AkTbMGLfE2BQJ3LqOlpY2+qe//Mvz0E9/l7t7z8EOVVHao7EfGH4/bMfxEELubWht21ReXf1FIYTrIwXCsqq6K0orKt9mQvyecTbe5/OdZo4XQoBSCl3X0dTcgn8//ZLnsb88mXT8RJms61pMw0t/WUBjWPChqSo8bhckSQJjDizbhm3bsB0HlBI0NDVlOI6TAcChhHICAhCCLdt3WYzzNgDy2LEl9YmJCWCMgTGOC2ZPzwZQuG//4ZxX33xrDIDWcWNGFaanpRLGOYQQyMnKrMtIT1UA0D37D9l19U1EVmS0t3d4ARgAJtxx2w0Fbo/L6ej0dfnbKCVQFRkuXcfplHDogxAfBKA7E8ryv4EWLoGy+BHQ3PkAMwCQvvkN41QXYvllhQhUtnK5dBw9ckL57e/+WvCXx5/yNDQ0weXSIUXYqDnn8Pl8YJyNZ0L8/nh5xdsVtbUXnvcgrKqqn32iovJJw/S9zgRf4PV6IyrTlFK43S44joM1b72H3/3+cWzcvEOSgqA8Gz0vnpOxJwBDTmyvzw8uOBITPSgoyLMLC/Lt1KQkqIoCWVZ0zkVqUKwEICBRgsqqmtSGhiYCAKOLi7Iz09OEwxgURRa52VkbACiNLa2z3t+41QTQkpyUWJ+anFjNOQfjDLNmTEmmlKYBKNu0ZYftOA40TcUbb71TD6AMgHbJovmuXz/8vWM3XrO8My8n2xaCo6PTC9tmZyT6hekCAQDqaVCu+Ato3sKArnXgSYimAwBVTw1Q3MEKiGNOTr8Wctesf2ej9NAj/4uXX1kDy3bgcussYADrvgE5jgOv1wsu+AKvz//OiYrKJ6uq6mefdzphQ0NDote0v+p3/PcRSj0OcyCcaGzWik2Aum3b9+SvWvsuqamphyzLXWXE+kIcO9BJuIxzWLaDSy6e77t86aLmCWPHFKiq4ieECNu2k+vqmyqq62oOy7I0CsDoU6KTjIamZuzeu1/Lyb5EJCZ4GooK85RjpWWZhfm5ZOrk8WMBlO3Ytc/V3uEtaGltO5yakpw+bdpksufAYeiaJsaNHVUBYIzX66P7Dh7JCBWZOXGirOT5V97svOnaq5oApE+eOC518sRxbW3tHb79B4/Ubd2+O2P9+5vcza1tuktXEcXXHab32QGHpKwDthdESYJy5V9A8wMAdHb/Cc773wEkFaAyejtLz9QCGg8AQyccCfpOOzo78fSzr+CDzdtwzYrLzYsWXlAnBM+xbcd1GqmxZYEQoglF/rjf8V93srLyJx5N++1gsMAN6EkohKAVVbWfa/P5PnQ4+5Fl255o9BIh5q2yskrj93/6Z+bf/vEMqatrgKapp8V69qf+F/OaOH1tCSHgMIYvfPaOlu/d+xWy4ILZ2WmpyY0uXXMrspzs8bgxYVxJ3tJFC8dQSkuCroFTS1EIbNiyzQJQCyBv5rTJKTxgca1KSky0bNspqmtozGpsahZ79h8qBZAwdlTREcdhyEhPIxPHjckFgO279tbU1NYrsix16c2/+9M/XT/99WNOeUXVSc65F4CanJSYvHD+nOKvfvG/nL/87idVl11yUU2kEzGS2EmSRwFGM4iWCmXFP0ALLg4AcM+f4bx/PyBrQQDGBl+/AjCWrtnj74E1paGqqhaP/vEf7kd+9mj+kaOlzaqqtEcqzCqEgN/vh2XbHofzH7X5fB9WVNV+LlrC8ZA/CStqauafqKh4RIAsDeSImRE/WpIC1WsbG5vx9jsbsWXrzkTTsAK6ywC5GeI5/UIL1LRMXHH5xZU3XrtcB+AyDLP5mRde6/hw+65k07IgSRKSExOlCeNK2J2fuLWOUpodvuAkKuFEaXlGa1t7e0pykjNuzOjjsqJMmD9nlgxAVNfU7aira7iAUkoqKqoWA3Amjh/tJCclIcHjOp6akswAuLfu3J1l2TY8iqsreEBVZOn11euyN23djpJRBf7FCy8UkyeMOzhuzKhCSmlWZkZ61ve++eVW0zDNDzZv1yL6VJkNkpgPZdmfQfRk2OvvgXzBPaAFiwIA3Ps3OBu+FzghSawTMLb2FzcA45h/VVWgKAr27DusHjtelr/oorns2pXLkJWZAcM4PfeUcw7DMKAoykSTWX8+UVFxe0VNzbcHKqu/30FYWdlU6AjjQb9p3U4IdNOMHGoWSNBUYRgG1r2zEevf3YTGphZoqgJdV8/Ish1/tsCZABBgnMHtdonLF190AsAiAHX/fOoF55kXXyshCMV8Cvj8BppaWsd+8rYbHVVVmRCChJakoiioq2/Ezj37jy+9eMH0UUX5RXk5mawgP7sRwKT9h49IhmVRWZawdee+uk/cdqOdl5tTkpTkaZk1fYoKIN20rLbdew+nBMLPusexut06Oju92LFrv2vHrgNI8LgnTJk03vrMHbdsnjxh7ExKadKySxZt+2DL9nndJIguMdQEzZgGmjMHIBTqtc8GAAeA7f1bQAQlUuBfLB0vDgDGI37G3mS7/7/bpYMxhjVr35N27tqPFcsvxaWXLITLpZt+v6n17LUdNLZpmrbUZ5rvnKyoekom+gP9HQLXb8dsXZ1IOFlZebfP6djGwO+0bUuPluOnKLKtKHLlnn2HxG8ffRzPvfgG2ts74OqqYDvwAIwnC4JzBo/bJYqLCiYDoIZpJu3adyBLooFy2KqqQNd1qKqKtJTkVlVVqwDIIKSVUipCVkrGODZv3ZEBoMzjcZfOmTmtecqkCTqAyt37DjHmMFBC0NraVtLR6R0DgMydNZ2MGzO6GoB08NCxqura+gRVkXuMleiSLnRNg66psGyLvvfBh/rP//dPUyzLdgDQ4qL8426XbgeyUMLFRQEobrATr8Ne9zWAWacAuOfPsN/9VsA/GEMEjSV+xuk2jPsEjPRbSilcLh0tre34+7+exQ8f+S02bdnRomnqCU1VI0aImKYJx7Z1Bn6nz+nYdrKy8u66OpEwpEBYVllzq9eq2sKEeJQxlhVL73O5dNTUNRiP/eVfmY/9+V+korIGuqZFCSqOX/+L51qsHMBT0f0ghBANAGRJalMVxecwHgxnC3BtSpSKm29Y0Q6gEABJS0vxuTRVhMQeSZKw/+CxNMuyVQDaimWXvJObk5XoOE5OWXllJiGB39Q1NIpjJ8qOAMi87qrLT44fN6oSgH/3vgMTTNMMS+kRYCwQuG1aFliwPwFfXTCDQiCRc64C4O2dXti2IwUyQIIim8RORbooHrB9j8N+7z7A8cPZ+zfY7307pg5IACgSB4g4U1Uu+pz0ov/FOgFFzLkEZFmCS9dx4kQ5fvvo/+X87NeP5VdUVRvuoNtJRNEXGWNZTIhHvVbVlrLKmlvPuThaWlk5izFxj2mbdwiIiNwgod1H01S0tLRhw8at2LBxW2JHZydcug5Cznx3PFdJuJRSdHR6ceJk2Y45M6cvkmU57YZrrjhaXlmlW5ajUUqQn5vtvem6FYfnz5mZgIBT3lVSVLi4ID+39dCRE2mSJEGWZdQ1NLr3HDh0bO7MadMnTRyXC0Atr67dWVffeAGlNMDBYlrkyPHSMbOmTxbjxpbkAch3HEds3rqLy6FNSwgwzvGxG6/ZnZqalLZh0/bMk+UVumGYIISCc47iwrz2z9xx81Fd16YAMI4dP7nENC0asDgLME6xpTYToxN8cMkMpiNB6KlgB/4F0XoCvGE3IGlRdUBNYmAg2FiViXZTiRC2hn45yfo2x2dmodV1FZwLbNu+Wzty5IS27NJFWHb5YmSkp8I0rdP0RcYY/H4/FEWZ7MB55lhZxbWSRH5ZUlCwc1BBWF9fn+sz7W9YjvNFSqluOXbErw9SCsJ2HGzctA1vrfsAdQ2NUBUFbpcruJudYwCewaRJlMLnM8i6dzdNnzNzegeAlCUXXVg0dnRJ9d79h1YVFxUuKinKy9d1ffTGLTv2JyUmYOrk8WNlWUq76vKl5fsOHktTRRcpLtl/4Mj4uTOnWQA8AMSho8fz29s7SMhyRwjB7r0HGj52w9U+AOMAoLyyprqqujYvZBXlgkOSJVx4way2aVMmTrhh5fLWpubWnJMVle/U1DZsGVtSuLyosCAjMcEzHoBeV99Q8ezLb2R2vQOATAT+fmAMttam49MTS3FBdhOIILCEDl79QQCAEdwQMuWQZY59TUl44tAofFCTDpmIbtn3g2mAEXH4KDkP/N3jdsM0Lbzw8ips3roT1628AosWzPXpmkYsx3Zxxk/TF0EIdE26w3bYTScrqv7g1pRfZGVl1ZwpnsgZAsBTVl39cdtyvi0pUonf8EPwqClGjizLvoOHjyW+uXo9OXaiDLIsQz5DsXOoALDr71zAYY741G03NX/spmsMWZbMoC+wHUAjY4ytWvuu/ud/PlVYnJ9n/OxH9xudPp/5v4/9PX3Dxg9lLZgfaNk2xo4q9v7y4e9wj8edKIRo+9Xv/qq8suptt9uld010bk4Wfv3I90RGehoRRFj//Nfz5j+eej4xnCXANC0sWTS/5ct33XkkIy11HIAmAEUIxKC6ATQDsHfvPUD+8Ncnsg8eOU41VT1tjEwmgRKBxXn1+NTkUoxL7oiYSUEBqKqDGr+Gpw4V4fXSPPgcCbrMui2ooQDAeOKJHceBZdmYMH4Mv+WGFR0zZ0xps5mTzRymRaRxpAQu3QVms1JFlR8pzsv7NyHE2+8gLK2ovooL9jChZGYsVrOQ6FldU9+xau07rh0798lCCPSc9P4C4LmgoedCwDRMMX7s6M4Z0yYfmjJx7AUOY86e/YdO7j1wOKe0tDxBUWQABMWF+f7W1nanvqk50e3Su0f3c47RxYXwuN3w+/1GaXmlxjkn4cTDjHEUFeYhJTkJjuOI46VlwrJsSinpJnH4/AZSU1KscWOKO0YVFR6fNnnCPF3XYFkWyioqT27euttz8PDRdMu2qUvXo2b2CwF4HQWJqo1bx5XjxjEVSFdtmE5g89RkBh+jeK0sF08cHIUar44ExYFEuo/aubKAni0Aw/9umhaoRHHB7Bkdt9y4orW4uCDFNC0PYyxqIdQAWbHYRYl0f0lh3pv9AsKKitrpFnG+wWznk9H0vtBC0FQFHZ0+bNy8Hevf3YT2tnboYVnfQx2AZzpppmkBQTJbEtyAAJzK6hCAYVqQg7mPkRa+EeRIpSSweUVi/jZNC4wHThlNU6MErQeSXm3HgSRROEEuFgEBSii4ENBUJVgtV8T8LoJAepPXljA2pROfmFCGywvqIEsCW2rT8I+DxdjZkAJN4lAl3ifwxQvA/hY/z2Q9BSg2OPx+A8nJybjisos7r7pyiZacnKQYhhmTWJqAQFLkJ1RZ/kVhTs6euEBYV1eX47OcLzrM/hqVpMRobNaEECiyzASEtH3HXry1/gNUV9dBliXIsoSzKU8+mAaYvpyAvV0jPV4RygGMbPjr7t/rzeIX+A1Hb1JcTxCHp/6caTFTAsBkFFwQXJTbiATVwduVWbAZgS6fWRzqUABg/AH/gY3WdhwUF+bjupXLcNHCuaCEmqZta5EoGbsKoTLWoUjKb9yq/Ifs7OzaPoFQCKFV1DZ8wrT898uyPNrv90clHAqymnUcPVYq3lz9TuLhIyeIJFFECgk63wHYZx2ln2gIe3uXEAK24wSs04QiZMiJtx8mkwKnaQ+975SBAxCCRzyl49H/zpUI2tu7bNsGYxzTp04QN163vHra1InctJ0s5jhaNPXM5XLBcZwTmqo+XJiT8y9CiBkVhKUVNUtB2AMAWWJaMasYQVUVNLe0YvWad9mWrbulUDR/f7QRFuy+gy8UsBwu8jPOQQhFRlqKT9dU0dHpQ3tnhwciYGLv+fs+9a+X+E9KKVRFgREWoDHU9b+451II+P0B1vCFC2Z33HT9Cl9+XnaGz++nQkSWLmVZhqZqAMS7ENKDJYW567uBsK6udYzf8n7HtK07qETVmGzWmgqfz8DGzdvxzrsb0dzSBl2PXUBzuBlgBhOAfTn9AmZ00e2UCQBQwOPWYTsMtm136TBCCOe/77x9x/JlS0V7e8duRZEv/PHPHp2+bddepKemBLJAAlkDZw1AQgj8homJ40b7v/HlzxkPPPKb1Nr6Biix8j2HgAU0XrAjTLxnjMEwTGRlZ2LZpYt8Vy5brCQkeGLqi5qmgTNuKYr6pEf1/Dg7O+W4fKK88rvt/ra7JVnKiZZiRAiBLEuMECrt3nMQa956DyfLKiErMtxuV+wolH46AYer+Hm2AAQARZYcUALmBGq/B+gWGbIz0/HIg9/iH2ze3vinx5/M0jUNlmVjyaL5jSuvurzugYd+dfnRE2UzcrMz9dq6eqSlpeCXP/4O37P/cN3/PvZ4bshi3R9JuFzwluLCgnpNVVNFMAF5OJ6Aoo9Br6EgFI/HjZaWVjz59IvuD7fvwo3XLce8OTPBBbcch6k9VblgpJOqqMqdrd7Wq06UV/5dZoL9yGEOTCvy6Rfkzuw4WVbJX1+1LunAwaMEIGeU3zfcXBCDJYL2pfN+w8BnP3lbh8ultf/uT/8oDmWXEAI4nKO2vqG6obFJD51qjuNgyqTxKVu3707ZuGWHS9NVtLa2gRCCxEQP6uobm2vr6pslKuWeDQAj2egcx6Zc8GErgoo4os4DWf0BI+SJ0nL84td/wpxZ08UN1y+vmjRhjGUaVonDmNrzHp/PB0mSckDl+2QrSH8Q2eWgoq2jA6+8tta94YNtkmFZcOka+rMNZxp6zkUXNQUhBJJEu2Jgu3yKnHf9hlIKSaKnGS8YYwiEqiEY98m7nmNZNnKzM1NlRUk1DPOU+VuS0NLShm/c/+MCSQ5w3IhgCBtnTLIMCw5zoIkA+zgAtHd04r4HfpqhKEpGuMskwDka4LBxWMAOEAivkyKuRcY5HMeB4IGSAwERGP0KvoGwgMar//W1DyEO2S1bd5Ldew+ULF2ysPWm65Y3Z2Sm50RKmQqFwMnRDC+MMby/cSvWvfMBamsbJV1X0dPZfL4DMOp7AnGdUBUVBQXZdl52lmLZNq+prRNNza1S6D7bceBxuXjJqEJvVka6q629wzxeWu5qaW2jAWd+YLPLzExHW1s7DMNEWloKEjwef3NLi8s0AxTwXIg2AoGc7MzkxAQPHMbQ0tIGQoDcnCwYpgW/3x/k5NGgqqrjcmkiOzvztLxMAqCz0wu/YXQZaEzTgqopGJVf0FZUmKs6nJMTpWWisqrWFarnGFqPpmUhLTVFjBs9yu/xuFBb2+AcPlaaZBgGBQEdbvpffwEwvLndLjDG8Maqt1N27z2Ia66+HIsvugCSJEf0NJD9R4+K8A5SSmHbDv755PPYt/8wZFk+zdH8UbCARrtGCIHX58eo4kLnC//1iZNjRhc1g4s2y7E7QMiE3//5H9mbP9yVISAwbcrE2q994c56t0tv6vD6WYLHBSFE7i9/99fUbTv35MmyjJTkJDz47a+1/vUfT6ujSwpLb7x2RaZL16sffOTX+WPHjMpcfvkS5GRn7iCgUmNz8wxFlnHw8PHKBx75VW6Cx0N/+J3/KX1t9bqUVWvfTbvl+hW4fuWVyMpMa1NVtamuvrEkPLRGCCHcLt149qU3XE8+8xLcbhcM00R+bja+/uXPNY4qKjzS3tHZoaoyUpKTkl58dfX0vz/5rAcBhjmYpoXFC+e13P25T1arquZvaWut87hcdk1dw8LNW3eat9200vryvT8YU1FZDUVRhrcBJpYIir7XKbFtG5ZlY+6c6fjal/4fFKU7EAkhp5+EgQqqJsorqqAo8mkRFh9lAAYUaxv5uTn4yQP3tldU13i+/+Nf5Zwsq+RccDJmVJHL5zMoYwzFxfltD377f7Y/+9IbU1etXT/N5zeIpqn85utWHPnevV9q+MLXv5dVWVUjc8FZSmry7m9+9fPigy3bkn/228c8hmHOrKmtZ7X1jdi97xC+9LlPFnV6fQl/+OsTSPC44fMZOZqqSqqqIsHj2ebz+kbpuj5v28692LPvEG6/5Vp3WlrygUcf++doTVcD4iYXkCQZ3/nml7YnJSbMFxAKYwxuXbd+8O3/aen0+xO/+PXvzGvr6JSZ4/ClixfY37nnS96y8iqsfvs9DyEEE8aO9j94/9f3P/nsixnPvfTmbL9hUJeu2Zcuucj59O03NWiqktMV6DwQoOjnEzAu8fkM1lOIBU4I4OixMhh+A5qWdNppGFEcJSBd5LBDWv8bRANM6M+2beOma6/sNE3T+90f/qLAME0SKtpyIFh6GwT42A0rj23eumPC3598tjhUhKWtrYM+8cyLEy+cO/PARfPntP/rmRfTOGNCppS/s2FL4W//+LexsqwEyHolWers9KKqugamZWd4fX4cPnICCYkeUELkkM7o2DYCucIEjU3NaG1rR3Nzm5Al6hw+duKU9ZoLqIpC2to7BONCEBBYlo0bVl7BExM99V/51g+yOzu90HUNQgj60qtrtEnjxtZcefli/s6GzaN9fr/45G03nNi6c9f4Pz/+VBaVKGRJQntHp/L3J59TDh85lvTzh75bTyWaPhQiYOJ9F+Jy1fS+qSiKfDrVZEj6xCC1AdH/+pCE25+7JmMcKSnJYuqUCdvfenejy+vzE4/L1aVbBUz+AlmZGWL2jKnS+vc2Zgf4XygY56ASRVtrO06cLJ88YdzoNMY4dF2XhSCpu/Ye8MhSgBdUVQLGlFDNvZA1NFTJ6fSIpFMZ9ZqqQpIpaPBeVQnco6oKFFWBFJROuRBQNRWzZ06r2PThjimNTS1QVQWMcXAhIMky3v1gizcnK1OmlCInO1NMnzrR9/rq9VRABArxEAJZlpHgcaPT51eEYBYZJANM/GstPvEz3lC4vjR5WAIQ58ZsLQRHUlICyUhLTy4rr7QCsbGn16pITkokbrcr7cILZu0fN26MRiHsMIuqe9L4Ma37Dx+dQghSg1sh1TQ1UPkoVrZ4tJy4M8xYJ8FxUlUFCR539bixozs/96nb7JCxKPAjmjhl4jiDC2HbtlOYmpJCZVm+oKW1VfQsNycgIEuSQJRokeF8Asa/noYQCM+nUtRCABKhkCQqCc4DlNPkVH8I0MV2DYC0trVnGX5/BiW0SwmgEpWeeel17fiJMl3XwriFRDeE9HlseTRxRvQ2TqcudnR0pPlNM5mF6yqUyNt37RWV1bXCdmxCg4VGhYhAYCEEujiORwB4xrqtPNQAOJQd8JQSeH0+4fMZtR6PJ7Xnb3iQetAwzICLZ/P2zN17DiTq2imGahGwQCcqsgxFUYJFU3o7yUTfxw99JyHknINQknDkaGnxX//xNBI87tPulWUpUDiUMXAhmlRVdQHE3ZfVNlwd8PGvp/iwQAcbgP1BQ3+udk1CCNraOkhldfWkubOmOQ5zuop2hp5JJYrGpmbR2NRcuXDerHZd15CUlICkpEQkJSUiOSkBbpd+yu0TOk0R/Z2hNKRQrCbnPOIX91aEpedz/X4DpWVVE2dOn7I3NTUZHo8byUmJXf8SEzxQlQBnZ1V1rWhsbDw8ZeK4Zsexu54RMFY5sC1GCCG8ayMYxAyI4QzAAQPhYCbhDpbiHiLYNS0Lb7+zMePypYsqF104t84wLbS2taOtvQOMc2iaivZ2L1m7bkPJrdevbJs2eZzd1t4R+E1bO9o7OqGqKlxBjp3AkQQWrrGFLyzHYbBtB26X5jgOQ3t7R3fcipBZJvpKCh+j4Gd0aXVvvbNBzJw2yVh+2eJWr8+P1rY2tLW1o7W1DZxzeNxuSJKEjs5OsvadD6bccct1/umTJ1rtwW/y+vzIz83GJ267oV2W5ULHcWLqtf0NwMEywCAOPPc1ploeDPANB/2vr7K8rmt4a/0GbdzYkokPP/DNk+9t/LC1rKJqguDCHDd2dOXO3Xvz/vPC665XV72VNXvmFM/Pf/Tdg2+sWZfR0taRJ1EKWZGa5s6ctv+Z51+bsu79TelccHjcuh+BikoQPRy5XAi8+8EW77e+dteO+/7nLo/ftAo8br31r/94epxj20hOTkx2u1yekO9JAFAVGZquaT3HSAghEhLcCiXUECCKoijYs/9Qwk9+80fcf8/d+xZeOLfg0JHjxZQQIkmyMWnCmF1l5VVj/vT4vzM1VcMLr6xOnjZpgvTbnz5wfM3693NraxtSEhM9e+bNmZnk9foULrifRClVNxBJuP0JwAGxtvaxSXd/5Ss/6K73UFiWjU1bdsCyrF7r/w0l/W8g9IZIlAcgIJu27HDtP3w0KS87yxpTUpySlZlGjhw73vnuB1tcpmmqjDHyzoYtckVlVeec2dNd48eWJBTk58Kju7yvrnqb7Np/MF8IQQmAltb2pKMnTqa3tbdLPcdbkWUcPnpC3rfvMDIz0usopS0HDx91l1VUpwshSFtbe8rJyqrMjvYOJUSVaNuMVVXXpFdUVau0q45HgDC1pa1NO3jomNrc0qZSSkEAHDx8PH/PgUMpk8aNIZMnjksoLipARnqKs23XXr52/QfZPp9PkiQK0zSx7t2NUlllVceMqZPU4qICd0trW93f//Vs/stvrM1ubGzhh48c1xzGSPc0qeGp/52N1NRT99Z1DcsuvbirynA3daNn2FqomOWvfvtXdHR29omU93wzwPTlPs45DNMCJQRCcITq8ykyDep7gd/YttNl8TzlZiBQlADzHOcCfsOAEiM8kHMBy7bCdM/AaQcAhmFBVqSu/D1CCIwgX6bLpZ32PMMMbKyqLHcbScMwgj0Lo9oAuvhxEBaQbtl2V01DEuTvkBUZphkI8A/v52BtpDHf188APNM14zgOkpOS8NMf34fkAGFXNxCetTg6VJJwBxOAocV+ekC76PbcQEC12pWAG27MOPUcdGWmROOAIQSIRFEYEI+75wQKIaCqctRv6MohPE3M1rvrMISAhtyWPWKLXbqG8LrwIa9KiKqx1zn5CAHw1D0iqv1NHggAxn3PMMuCjwTASO8JWTUHYwzPthDnaWKkEL0+R5zJu4axCBq/BVT0v2HmfHLA90vfMTjv6pUtbJAKcY444PtjzZwFCIdzEu5gkjANxBj25+kXe04+Gkm4QwGAZwzCYZuEO9igEIM3hkMdgOer/tefapo8kAv1/KUhHBoi6AgA+0NS6G9j35mHE8pn89Lh7oA/Wxa0gRZbzoYHdKjqfwOxkQ5mAHa80kqsvsgxhzHOOM+hDsDBYsEeAeC5M8DEf5L1PwDjE0eJiB2NP4QMMJGZpIOfQfp+T+xr4XlGp18S/fmuoJM84nd1VZaP/M2Rux79ebEGKnr/on/vqVCEKO8643GPddupjkRaI4MVhN0fnK2DZh0dCLGFcw6vzx+ItySka14iZiaIGG+Kek1E3UG6/H/R5H8RS28cpgYY0Vua1OkDL7rGt8c10QfJQsSQSIJzRilFgsd9ihEOQ0NtOZPAEnnAwTdAegNjHBlpKeKuz37CdLt0nfPefGj9K9LEvI30fCPpiwwXV0RQzO+NshlF7XKv4xTrz9Ey+GM85iw/N5CO5Tf++dTzWn1jM5EkGsd6GnzxM07DDAYNgH39cEoJ/IaBzdt2cl3TolYMDui2cQAz2qI647GInSovYhwvAr2BNvK7oncj8rvIWZy00UT12N8VS0ro+5wQQmD4De7z+xFeNHVI6n/iLEA4VFnQgoVIyIfbdrs545HVtSiLLkDlImKLO7FOlzMFU6xJi8dQFasfsQIL4up79NGIS7yPJdL2aoCJyAPrVjUV9EyrTA2I2yoeMSwqCMkppacfAdjfFtBTDGfhfzvV7dOBG/1atA/ofg/O/l1hB2N4APRpOmXPgF9yCkdC9Dh7gi8LZbSTSIfwaZ0Pf170d/X5NIv5vBj9Q5R39RQghIh4dvdnEm6/n4B97JocWZ0RXaks59ICGp/7Ibb8f6YuiFh7UVzvivB3EWWcxOm2iCi6VXdXkjjdQtRrP3p7V18WXPTnxehftC7G6nsvfrfBjBvuDz2+38LWRiJgBtaidj5GwAx2Eu6gAnAgKA8HU/8bTFECGETFfQBTkPoDgIOdhDuYAOz3YIq4RFASPwjjTZUaSkm4gwHAgdhR4ytvOLQJlWN2cYjkAPY3AEU0p3JMEJLI+stAiZ+DvZMNlvgZl0KPoZ+CNBCqxFCIAe1v8bMvjGtyrA+I6yQbScI9ZyL3YAHwo5iEGy8Az04njCOPdTgDcCAU9+FqgBlUAA5n/S++5RS/YeZ8BuCICHp+6H/x6tDn6gQ8cxAOgV1zMFOQhooBZqhbQIdCHcChov/F3iyjd1I+GwCerzmAgwnA3vrAOQ/8hpy6gQBRSZnDM0xEjyiTQHwlGZYGmEHVofsZgL3ZV3q1jg4FFrR4RYnhnoTLOQelFBKVuj2DIEAo2zMHrzuJM+WEUtoVlcIFFwDtr9y7eEExrJNw496046U8HCL1w4dzFvzZ6H+McaSmJuNH939dpKQkkVNxpgQ+v7/qW99/JLGpuTVJVeVuIXK24yAjLdV45If3NSe43XmBWE0C0zJrv/2Dn6dVVdfqmqqEZUqe+0q456sIOnCUh0OEhv58dMCHP89hDKMK8ytmTJvkACjp8VNpyaIL7aeee+U06nzBBVRV0UuKCvPCGbEdh+W5XKfqIIw44PvYj0HItqD9AcDBFCViOz/PnwgYwTkuXbKwBUBBhMuZCy6YdUDXNXDGIt4fXu+g5/+LfpY8YibcDHEAxiRh6ud3kbMBYayOxk8G1d/H+8AUcBysE7DbKeg4SEtNsS+aPyeatCLNnjltXHFBnt/qAbZev7eXuexXXX4YALA/xc+Y12KohmdVJHQ40xDGe9oOtAuCEALLtjF9yoSmzIz0pDATmQmgLfQ7Xde0iy68wO/YrBsRUl/i7MkQBWC8VXcHMwk33sgpgeixozR2T/p/14ynqmls8XOw3hWfSNNbPyKJoQTA5ZcsagVQFMLN5q07+Y5d+04AXVV9Uy6+6ILalOQkOIzHa3jsdSzOGBS9lOzuTwNM3H2P1g8RvwEm4lz2sVJvFBCSuCgPB3cnG9x8w8GKgDEtC0UFec68OTO0sEOr9PXV69oOHD46LfxAmzhuTNGYkiK/YztnBkDS+wIZKgaYQY2AiXOjOttG++sDB9cAg0EDYG87ar/1I+iEd2wHC+bNdpKSElNDIHQcx3Pw0LHE9e9tKgdwLHSLoijSwgVzvWc6TL39vt9BMQBJuIOZBTHQYjDtjw8fCFD0JiYPFgAH0gDTszHG4HLruGjBBa0AUkJ/PlFWebChqcnd0tpW0tbeXhh2i37xggtakpMSu5VgPpu9Oe4k3OGaBSHOLQD7DMLeXijEmXKziEFzQcSv8wy8/tez8w5jKCosMKZPmRRuESWHDh8t9np9pLG5BQePHK8CEEIcGVVUkDx6dFGLbQciaETMTSr4vWeov/S3CyLed/Wr/henASae9dTFWEfiAaEY+hEw8S78IZMBEXaNc46liy6kLl1zhf2q8oPN25NACHw+P9mxc+8oAEbXBFKauHTRhV7GeWxxi8Q7J2cu5vS3AWYgpBUMot+4tybHK35+1FKQBlrkFkLApeti5ozJuwBcEAbMljkzpx4dPaogHYQiLyuzEsBoAJODP9EWzp/bkJL8TK7P75P6d1OMD4D9/a7hqv8JcZYgjFdxPx8BOBg5gLbjYNyYUe3TJ0/MDT+3KKWTb71xZUvYQOQDyAiXZgoLcl2jSwprd+7en0+lPmgYBDEYy4cOAIdKEu5AnYBnbJjpiyzfn/J1PAaY+E/v/rWAxuxHlL/btoPFC+YxRVEyelxSAGQByA7+y4wgXBYvv2xJR1+NZ72pp/H6AAdD/4tXX+/NABOPn6+/rMj9VBBmcE6/Adk1h0ASLmMMSYkeXLxwfhOAMWGXmv1+YzPjPIEHHfKUEkiKbLg0bSGAhODv9EULL5Cynkh3amsb5F71nUGMgBks8bM328bg2TX6USccagAUg5xaNViFOAHAtGxMGDemY+yYopRw6aSjo9P7lW89OM/b6UsOiZm27SA7K73pNz/5vldV1RAISVZGevLsGVNbX6pYmyGingQjSbhnr+fFQxlyVuKoGNRoBgxiNMNQqoTLGcOiBReUUSolhF/ee+Bw0/HjZRllFVVKWXngX3lllbL/4NGcI8dKy3DKVQEAWZcvWeSRZSliX6IV4TybE3Cw1JZ49XUMZtxwzOT3uCkPBeLgFhoyGRDDhQXbsm3k5mThqmVLKIDqsI0x4fDRExM6fT4kJni6goAVVUZrezsOHjk+Y+rkCW0AWkPPvOjCOaSkuCDXcZimKgoDUIdA4DdkWcqmlLrFAIqfQ8YAM5hGu34gv5YjWc4GU5T4qNPQCy6QlprMNm/b5T9RWvYOJUQAQEF+7pR33t90gaaqp6Lwg/dqqoo1694liiztPVlWuTfYf5KTlZmXnp6WVVFZg9dXr6tqaGpe7/MbnQAwqqhgqWFak+WgWDucU5DOJwACANl/9KgIf4ksS+jo8OInv/gD2ts7IcvSAA7m8E7C7U8aQsfhkMLGmjHWRegUqX+MMQgAknTqHs55oF48AWzbhizLXWKoYzuQJApKSECGHcmCHxD9L1L/HMdBckoyfvPT7yE5OalbgjUh5Eyso0NbBB3ONIQQAJVot3ulXmqwS5IE3kMxDy+Uqchyt/6ENlM+koR79oageE5Awc9cJxzInWyo0NAPtgEm1i3kjPonot8zQkM/5MTPWPaVXkHY31wkg50DOJTFz3gndYSGvo8LFOd+PZ0125ro9xSP8zMJdzBo6B2HQQgBSaJRXQ29vYsQgDEe0DUphSxJZ7FRDaIvdxBrhwy0ASZao+d8FxmuSbiDAEDOOSzLhtulOYmJCZbjMFiWHQcACUzTBucCKcnJlqaqjt8wwFl3fpqzPQFji2PnXxB2f42TPPDgi0/vChHghis+JHQt3EBBT50OQ8kBf7YTGjj5JPvz/3VH9RVLF7fKMm07UVZR8ts/Pp58/ERZUjSn/Om6JoFl2SgpKmj67r1f6ijIzyu3LDN57foN+X/4yxOpjAspZNAZzAyIoWKAGUx14axAONhlyIQQUFUFiQkexjhnoQERYc8kIOBCSB3tnZJlWSAEQSLc4QHA8NNBQIAQ0k3UNEwTN11zlfdTt93oAlAMABnpacbXv/TZyq9964eJjDES+j3n3XUHQk4JOIwzqKrC7/nq57bNmDZ5KYBRAPCp229qKCuvMp5/+U2Px+MKWFrPQwCKIVC1SpwtCM9FELZlOyguzPf+4P6vfagEtnzwCLZAwUVxU3Nz8htr19e9v3Hr6La2DkXX1D5RvJ9b8TOopAWd8F0AJKeGjXOO6dMmpfS4UR9TXDw2KcGDppZWSFLgNCQkeJsIZNaTsAIyjuMgKzOdTJk4/iIAatizMqdPnYRnXnjtLIDUz6A4DwHY9UAh4gNh/DJv/CcPCS5ATdP0vJzsxZIU24KQn5ftTJ86ybztxooT3/3RL9NPVlRm6Jray84e5wnYDxMqhIDjMHz+M7fvXXTRBWMZ4y5KCX/ptTXi6RdeldwuV/A0I9i1e5/36iuWtgHICx2Qx0+WVbZ1dI6hlBLHYSguzG/79te/WOv2uCZAAJ1eH37409+iprYBsixBlmU0NrWIvQcOv79w3uwlANzBZ1Xv2XcoWZKoZ7hmwZ+rJNz+tpPI0b5ZnJL/BvT0i/ZMSoh0BonJ2aOKCzN+8ePvHP7SN76fUN/YpMuydBop7pmwjAX+M7o/Lt4JdRhDamoSli+/hOVkZmrBPzcAaCKETiYAuBDQNQ1vvv2ulpuXY1156cVCkWVSUVVjP/Kr32fZtkMURYZhWpg5fTKdNWNKUuj5HZ3ewAmJAHubRCkM06K/+O2f53/33i85Bbk5sB1HvLF6nfXyqrWaK6xeRSxjyim9O/J3hR3iAa6bbj8UXUVrTqsk1dtGL7q/P9K4h18bEEZ4DCzdhdxfiO/3HMDTMzh4R4d3/4my8qmcc5KUmNg6pqSIAUgP2WhysjNLbrjmiobH/u/fhVwIGH4zzEJBoGsaKKWwbBvMYZBlGQICcnDR2pYDxhhUTYXgAlxwgAtQSsA4ByEEqqJEXggAbMZgWzZkWQENuhM447AsC4qiQJYl+P0GSkYV8NTk5Olh1mnW0dFhe71ecMYgSRQulw7DtORf/u+fRz3+xH+gKDIam1oSASApMQGMMTiOg3GjR7kBJHaB3HHg8/vh9fpgyzJUVYFL13D0eGnapz9/DzLSUmFYJmluaR2VmOABlXsUlBEchmEFQujEKQARSuHYdvA7et4j4PX5u60Alx4Ya8Mwg7UUgxsapXAcB5qqnra7hdwopmlBlpWunZNQAiEIGHOg69opqYkAluXAsqwglyogSxJ0XYUQAb2agIBSChoM2etPC2h/SVPykAMgObUD9hgyZ+fuvY0P/vR3xDBNuF16wp2fuLXy47dcKwNIDulMF104lz/+5HNClmVy4QWzAuFfArBs5uzcvZe2dXTS/NxsPn/uLF9qStKJI8dOFG7fvT+VM46iwjxn2uQJSE9N3VMyqiAhIy1tvBBC1NbVHzh87GTalm0708orqrTwhRBqnT4f0tNTzQvnzpJzs7OPu9z6PsNvtnPGJtQ3Nc/ZunOP1NLaJmVnpTuXXLSgTlNVEiZmJsycPtVo7/RB1zW0tbWz7bv20tycbDJx/BhYtg0hBBRZFo1NLdbho8c1SikmTxznnTRx/GYAlwCQAECWJeOieXPkyePHypqm4tiJcpwoLcPsGVPNrMx01bItQgiBoig4eOgo6hubIEkSCCEwTBPgQsyZOc2aPHncoTnTp+V6PK4s23asQ0dPHN9/4HDxxg936H7DoLqmddVQ1HUNC+bPCYbaCVBCsWXbLjS1tIoLZk23Zs+cWjFr+uQMXddTTpws2/rBpu3j3920JVkJi20NvN+CIku4dPECMXb06D3Tp07I9bjdWe0dneVbt+2q33vw6Nyde/bBpasghMJxGEpGFWJMSREY46CUiKqqWvvAkWOq4ziYNWOqMWv6lFbGnJY1b78/vrG5RerpHz2XJ2C/WUeB/q4fHv0alSRZkiWoXIbfb8gvvba66Oorl7LkpK6DgKSmpBS7XDrcLhe+f+9XENKxABz/7Je/laWqMvn+N7/WmJuTWQgg/Z33N4sNm7fjjluu3fW5z9zO3S7XTAC5YcAmAEatBJyWtvaan/36j8nvvL85VVWVrrExDAPXrljWeecnbt1XmJ87DUAagIsB2CE1d8OmrcdffHV1yje/+t/HcrKzpuEUrygAJN147XL3jdcuBwC2a8+BI5/4769NLMzPaf7pg/e1IkDsBAB8/Xsbm+7/0S/z7rn7/5WuXH5ppRbIsO9aWYkJCdL3vvWV0P518Fvff8Tes//g9Ds+dl3TFZcuzg777Ykv/M93Uqpq6tJkWYZhmEhNTRZfu+vOk1cvv0ymlBYACIm5ysL5c7IBGHv3H67//sO/SjhRWp7hcumwbBvZWRn48fe+gQRPSN3EkR/97HfyhLEl9KbrrpIkSUpDkAVg3pwZY2+76VrnkV/9ofOfT7/g8bhdhBACwzCRnZ1pfusr/126LNDPgrA5yLz8kot0n88vHv3zP7z/fOqFBE1TYRgmLluyEF+5684uaWnHrv2ld/3P/WP/65O3lv6/T32MybKcC6B1996DRk1dg0cJ2PkGF4C9pBT2AsLBL0PWSyZV184pSRSO41DGGI30Gy4EWPeyYaO/+eX/3pubk+lOTkqaGLLrUErh2A4mjh/T5na5FgVFxNwej/QAQGpyUvJ9X/9i3ZGjpd6a+nqPIsuwbAd33Hp961e/+FkJwIXhv++uC/I3fYZvXE52VmIPAPacC2JYRr0kSZMMyzYAdIT9RqJUyhNcoKggt0LTtMURnqOE/XdVXV2jRSmdrihKXo/fdRimqYMQ2LYNj8eFXzz0HTJr+pRREaaBBDcWTJsyIemx3zy8/66vfls+UVaRQggB56JnKbac79375Q4ESKl6tlQAuOu/7vCve28jqWtoBCEEqSnJ4nc/e7Bj0vgxJQBCujIH0IgAsZXL7XaJe792l9XU3GK/tmqdgqD4Gj4+EyeMTnns1w/tmT1z2rgQ8IVAkhImQg+EA/5sCJ9onFbVQbM8hjfGOTH8BvyGAdO2MWvGlPq01JSWbmJhp6/M2+njtMtuf2pxThw/ZlwYAE/1mACUSDKAuobGppOHjhzHzt37sXf/YW6aVjlOFWFBclKia94FM72h6JVpUyZ0fuFzn7LD9TIANue8rq6+sa22rqHVMM3dKUkJE9NSUidYlt3CGPug5y7mOM4Or8/3PmNstWFYoc3mtCLzXHAQStDe6RUAXgTQ7fs55y1+v3+tYZjvM8ZETk7WVMexuzF0dwGLBAbJ5zfw6TtuMWZNnxLm3IAwLatq194DrLm5tSxsDOTszPSp93/jiy2qooCziNkBSQCyGWMVx0vL7MqqmjYA7eE/SE5K7CzIy+lkDoNjO7j95mv2TRo/JikMgMc2f7jjwN+eeGZNXX1DNQB/aDP42I3XHFcUmQcA2H2S3S5X+uyZ06biFP8OuOCOEKf8zf0JwNikXuiTq1w+87vPWRA2zcvJarxh5RUWF1zNSE89evP1V2eHiUwAYB88ctTo9PlIFs2I1NNExtiH9Y3NmaZplsiyZDY0Nzfpmpb33sbN095Ys04rr6ySGptag0o9yGVLFmoPfufrHbIsh06vpAljS5IYY5AlCSuvuLRVVZSc8D6UlldV/vw3j6VV1dQmAoDH7Z5cmJ8741hpGW75zBcLP/fp25tWXnlpt73jn0+/kPDqG29NUVTF5IxpkiRFlAoooRCc4zd/fHzBM8+92vbzh+53JycnhW1CXte9339kflNziyZRyts6Ol1yj2q+4VNp2w5yczJx5aWLTwIYHwIh57zlBw//hr765lt02pQJWf/7sx+UZ2akh05Jac7MmZ5JE8e2fbhtd3Ike4dl2Q3/8+0f0h2798sJCW7Pbx55YNOUSeO6RGdKaRUhUpZtOwnFhfm4+bqrU8NO8eY//vWJhp//758vBKFTV7/9XtOTf/ltq6LILgAYN3ZUSVFBPtmz/2Ak2UkG0OL1eg80trRNsm07TZalcq/fyCKEJPQ3AOPxa56VdXTwcgAjMnPI48aUXP61uz8b0ml6AhC2bTe8+OrqPM5FxJDIhsam/fc98NMxVbV1yTxg9VQJIbmaKmPduxuTfD4DsiJD1zWh6xozTZPuOXAo2+fzI+mU3gnGOTjn8HjcfOb0Ka3hYhfn3PuL3z6W9sGWbclutyvgkBeCHjtxErIso6WtzWWaVs/qu+0VFVXGsdIyze1yaUEXTXRfAICKyhoVApk9/aGMc72quk4vr6yCoiiBRF4aPUQ46Gu0crMzi8OttfsPHTn2zobN81RNxfZd+1zvbNicecv1V3edlJTCc/GCC8QHm7dHfK5l27knTpajrb0dDU1Ncml5xfwpk8aFd4QKwQljHCVFhd601GQ9DFHle/Yf9kwYN6ZBokS4dV02TDNXUeSg5dWlJScngjEeKfZVvPLGGv6TXz82HUJ4GBfQVGW0329CU7UzjKjqT3Y30h8gHKzETXT5lCK0hB4iT9ic294//O1f6Tv27NdUJeJn8bLKqudPlJV/3zBtIssSwDkJRasQSrFg3qy2y5YsOjpzxpQxmirvdRgvNgyzwOXSje56HgFjHOlpqTQjI21q+EuaWlpTTpZXwuN2dct6D31PwMVx2rcRSZKhKkpXDXrL4jFnQ5EkyFHAJcsSFFU5ldjbS8vKyGiSZbkewIwQQOrqGme0trUjOSkRmqZh2449Nbdcf7UJIPS9noz0dAjOg2Fzp8+vJEuQZAk04HZRoy3N7KyMekmSGE6RGk/835//4AgBqQ6OlSzLcnJovYrYuhKpqmlIr6mrR6LHA4DA6/VHzEDpd/2vN1GXnBUIBy8JtxfDjB9AeJ0Gu7PTe/Lo8ZPZf/3H02z7nn2aS9dgWU7EmyVJklVV4w7jkkQpQAiEAGzbYp++/eZ9n//sHRlBS2QqgMU9DTM9++pxu07biU3ThNfrAwkDSLzZJdFv66Oy0dd2Sv/s+ousyFrwFIcQAj6/PwGAt5tel5gAXVP79n3Rghc4Q25OZg66h9TpiixP7/nT4D/CBaedPj+hlEQcI0miUBUFlAY2wUh71WAaYKIFvvTZOjpUsuAB2IeOHNv40mtrLnUYI5RStLZ10Mqq6sK6+kbdb5hwaafqasZev0EnMAH8hoHLllzU8vnP3pEUJlby+oamtorKmlSXS7MmjBttS5Lk6WmB9fuNntY56JqGhAQPmltaAUkKcyyTWN8oOBc8PIhbxKcVdOsfCcan9vZ77rCeE81t22knlKaEnuXxuFvDjCYB82qnF4ZpxaRT7K0psoyyiuoKBFjhpgVF+tbXV7+9p7WtE5LU/dlutzvFMq1R9fUNibIsk4j0joNtAT3LyZJjKh7nxgAT9fba+kb1jbfeIZZlgRIKgEhUopIsSdA0tXfXSg+GI84FVEXBFZct9iOYXQBA1NU37rz769+bUlpegYK8HPWff/61EuaLBIQApRQtbW3C6/W2JSZ4ulwOGelpzWNLiu21Jyuyk5ID99iWDdtxuvxoERZtosfjom3tHXAYAwQgyVKUWQjLJSEkOA7d0Gcbpql0dnqhBMVbIIaEIYDquvp027aTlVPRQKKoIO9YQoJ7tmGY1DBNzJoxJSWoh4dafWlZhUOplIf4MQjOBVra2nIZ5/4Qrw6ltP0/L7w2Zu36D/JPGZ1EUEwPWHrT01IhRam7IWKs/UEVQc82s/5MAdi/wbSRT2BJkqDrGigh3dJ1zmST6GHOR4LHg5TkpKPBBaYCEIZp+ltaW1XHYXC73bYc0Fe6BVlSStHe0Ynd+w/V52RnecIse6nfvufusoSEBO/7m7Z0ciH4jKmT0saWjGLr39/obm1rh99vOEEjSOgjEq9ZfllndW1DpyJLCS6XC2+sXhczCJ0Sio7OThim6U1GYtcpnZqc1PKxm1bW7jtwZLokSZ3lFdXYsXtvQrT1I8kSKqpqtaqautZRRQXukPVzwrjRo2685sqaZ194PfPCuTPbrrr8kkYAOWFj17Fx87akcDa+Mz8MBCghOFlWmdjW1t6ZlpoSMvzk/+TB+w8S+hPtyLHSZM64QiVJEEL848eO4tmZGeaa9RvSYx4yZ5CsHPfB0U/uuH5hW+tVHo6roySmrhTR/Nl7J0VPkc3r88Hr840OGwtaXJg/66HvfePY1p17jt507VULPR53wmkPIYDtOOS11etyl12yqJVSmhl6bHZWRvFD37vH8Pl8qxnnzO123+zYjrrxw+0ghGLXnv0n77j1egZgQuiZ48eNTvvlj+8XAERpecWqN9euX86ZiHrGUErg8/vFyYqqA9lZGXPCAJ31mY/fEhIb5T89/m9s+nB71AFRFQUNjU14+tlX5Pvu+WJTmHEk477/+eLJT3zshm0Z6WkeXdOmh02K/e6GzfqR4yczlWjujz4tVEBVFVRW1+CF11bX/b9Pfiw9uBFK+XnZk//5p1+XVVRWn+z0+efKktyWnJywISsjfcquvQfef23Vuo+f0fodJADGI+1RnGXrbxr60BnIA95l1tcNow/U75IsS2rP08znN7Bl684cAG3hhpgF8+eM/cpdd87Nz8txIawoZ3hPNVXFth17Ev/6z2caAdT32EFcbrf7U4kJCXdKlCYKITQhOGSZYu/Bw6OramrTe3yfFjpt2zs6dwghSFB+JpGmnxACv2GQ9e9umAmgqcdvumJpZYnqgvNIbgoSGje3y4VnX34jZd17GxMB+MJ+M6ogL3ehrmkzwvrBK6qqm3/1h//L4YKBUNI1lj3HNnyhRhDBSejvkiThmedemX7iZLkXp6j9KYCSwoK8uZPGj8G4McUpWRnpKwGU+Pz+2lg6U7esirgLlvZzalWM3aiP5bIHQwQ95R0khMBmTptE6WEA+4P/9gUc2LQPzwsEEQshGIBDwfsPJiYkzCdhHxQozKnhxdfWyG+sXmcFgVQPoAaBcCn1/Q8+PLD+vY2HAVQFn1MfLoJRQvC3fz49/kc/+51ZWVV7CEBF8JI3aGwQnPO39x860myYJjRNQ1NTK73vgZ+K4yfKy9Aj4gVArW05l1FChKzINAiK0Bgc5Iy3hMpia6qKF15dLT/213/ZHR2dRxGIVe0aBMbY5obGphZZUWBZVg2AnWHP8kmUSgECYQIhIH3voV9qf/nHU+0dnd7y4FJrDRsT03HYsbff2dB49z0PZJwsq5C0YBC3FOBM9YY9e78Q3CtRqSsQXwSu7+r2fkmSQoziNbUN9O6vfz9p9dvvNZq2vSO4QTWGvd8C0NTa3rGtvLLmi5QGUt2C4K8Pe241Z8wiIAOj/8UTRdbLTREZuNs7vHj4p4+ira0D0WT+gSTh5ZwjKTEBY0ePMto7vI1CcMiSRBjj6SfKKnQRBqJoup5L1zBp/Dju8/lqHca4LEmUC+45cbIi2XGcbtH7jsPAGONLLrqwY+L4MduZ4HskQqcfKz05470NH6YlJSWQ4qKCFq/P501I8CS1tXUkHS8t6zIMcM7hNwwkJybaM6ZPdkYVFboUWap2HOYxLSt5x+59jSfLK1MJiCRRAhACv2HC43KJObOmi4L8HCpLEmzbRmVNrX/f/sOko8Orp6Ym85JRhT5vp7dVBHyD1GYs59iJUho6CDgPpP4UFuT6582eoSYkeCSAoNPrFQcOHe08WV7psWyHjh9bYrg1vdUI+m8SEz0px0vL3C0tbTR0ijHGYJoWxpQUOwvmz5aTEhOOcs47AcDvN8bu3L1f2nfwiBsE0IKuiVAWxeQJ40yvz2gIkNxSeDyuzIOHj2l+vwEuOCaMG23pmtpsmoH3JyUlpBw7XuZubm2jIYOMYZoQXGDihDGdF86dpblc2kHOBKOUgAuMrayukbdu3+00tbQmypIEx2EoKsxHblZGe3tnZzsAeDweT119Y2J5VbUsRfGj9ncETG9UHY7jICU5Gb/79YNITjqdgTsqDf5DP3kU7e2RQTjQLNiEEDDGYJjWKTEnqLJrqtqHARPB7Aazh5gkoCjKaaIRIQErndfnh6ZqUBQFtu3AtEy4dA1cBFjPKKXgnEMKWmPDRfEAmB2YpgXbcSDLMhhjgUWqaVAUuasvIQY0x3FgmCYch3XJZ6FnK7IMhzFYptXlcwwl6na3BKPLamiaZpcxhxISdNgrkCQJhhG4doqXhkFVFPQkLiAADNOCYZhQVKWrz5ZpQlFkqJqKnv650FiHG8tCGyGlgfBXv2GA8/D3c2iqCkmi3fIDORcwTQumZQW+UwRoPyzL6nIBBdZkwAVjWTZs2wYN2xAlWeqW93muDDB9BWEc1tGBp6EPZGDT8DSkU+BC30iYCCFwu109+hCZCZkHVa8Ejye4uzPIMoWiBAiQJEhwu+XT9OCeia2SJMETdEMIzsOsR+K09JnQ7xM8ntP6Hnq2RCncble3MYr27aqqRARnKPpI19Ru1qyo1WnDnhV+PcDdIyKySRNCTp+rbu8PAC5SdnxPNgNCCFwuHS6X3i3oXNcUAKTb+4UQgY0hlFYGEZdxZKBOwAGwjg5uJdxo954JC1pPkPR2S/ipBqCbi0DEeHbUhXXaPTG+Mdbz+mhYOJ2eo6fvTPR5viI9OxYTdl/62NcxjJDx0UU3EmsMBzMI+8wBGD1oYsAoD4d8ERaM0NCf9XyJ+NbNUGFB628HfKw1IwTiiR0NiW/9G2Eu+jkTH0N9QgcRgCM09EMPgGcRthY8PcXgTehQrQMxUIsn/o1qEEFxHtLQD6QBJt65kqM9tL8/cCiIoGKIVPEZKUV9fgBQ9FMmizzQi1EMQCY+hjivZH+Xoh5hwR5YdaG/I2DOCeXhcK2CNDA6z5kDcDALsYwAcCD1vyFWEGakEOf5D8BhbYDB4AGwt5TOuCkPh4IBRohA1SH046SKGMlo/Q/AWO/q7Vo895x5P+I7Aft3DHtb+JRGLp46lEXQPoNQ9GNHB0L/o5QiMSHptLSm2PG3oQTXSJPGo89XPMaeQXRBiD6BPRrHSgQnVkyfczzSSvjY93ze6a8L8Qvw2B8MIQQ6vb5uDv7BNMDEvTH3CkJx5iJNvJaieC2gDmPITkvFlz7/abh0PSzy5ExPPxLjJhLzgaLXC6LHoiJxj1Rcoyu6vfwMjoM4+iDi63l83xWqa0Hg9xn42f/+GTW1dafVyBgOADwjw0z88nX/n4BAoPBHc0srfvyz33UVA4k20DHFvj68KxIuI0pcIcye6YSSOMXP3k6/qPfxM1+o4sylnFP9E2e8SPusLogABWW8ABSD6C46axAOxVLUQgjYjtMrM1nMnkc9HEUviyvqSo3Rj2ixSxGCohEmpkW8JmJ/c4+LgXtIZEbXqAuVhL0rzgq1EfsRj74e7Ls4PeOmFxKtcw7A0DiIeGNHh7oD/lReYLT+kcjLPhjMF5Umg5CouiaJJOKFggNj9oOcUT+6qCrJ6feQWH0HicKAJoJ9IH0WW0+9K7rhI9o1EmFiRPCbSAwOmGjjREAiPE8MagxovIY5ES/lYS9nyDkH4JAp7DGYBpiRCJhhZYCJu1JvmDlrBIC9vW8EgGe/UIcoC9pgAPCMDTPnUv872/4NxO491AHY3xEwA2Kc6+9KuENEBB0YysOPWAZEvAAc8gHY8RoqhoO6MEgGmPjBJ+IH4XBIwh2u4uegAnCIZJEM5xjQ+MMFo7OgywMBwLiNGCNJuGcPipEk3CEvfp4hCEdE0IHc2QfNADOMRdDhrv+dhXWUgEf5xqGeAxjvhA71DIihYoAZ6hZQMQzUhbgNMwMFwFg7arSSW+HUdowx8GAwt0RpVLk7EotYVxkyEfnvPfse9TdAryXQTr0f3Z5BSHcaxFjjG7HvsRZ3L/MVaXxDgdC9ZSWEOEIdxiCCfKKyLJ/2/T3715eF25cImMjz2Dtj3ZlkWwxW9TF5QAHYh44yzsEcFhGAsiKfVjZaBEPD/KYBWZKRkZ4qNE1DW3sHWlpaCZUodFXtNvXh/bNtu6tbAb7KQAQJ5wwOYyAgUBT5VG2/sAVn23YX76kkS12VcG3b7ro3xIHZs1m2je5Mfqc4QV261gtY0EVAHIomoTRA7osoFIC27UD0qKDbRQwoBGRZhtIj3pJzDsu2A9clGeHFXnrOcafXD1mWkJWRIVy6ho5OLxoaWwihAYLeaBsE4zxAfisEQAJzBQjwUJ+DXKIkckhNgPDXtsEYQyjSSFZkSLFKgjOGEOt6OAnzoKoL4ixBOBAADJHC3nrD1TWXLLowlXGuE3TbAdv//uRz4sPtu5NVVemaUM4DbNNLL15Y97EbVyZkZ6bv1l261d7WUXLkxMmMvzz+b1ZRWZ2ku/RupwfnHC6XCz/67j1ITUlGR2dn2yO/+mNSQ0MTUVVVfP3u/1c7flxJjt9v+n/56F/k8vIqNVQj3bJs5OZk41v/cxdcbh2maTX98n//nHD8ZLkGADdfv8K7YtlSta2t3ffjXzya1NrWTkLM1rbtIC0t1fzpvV9qSnC7806dehxl5VW1b771nmvr9l2JmqbSaKerbTtITUkW3/vWV0RSQgIllODF19bwZ196nSYmeLrNgWVamDp5gv+rX7jTpFRK6ZYIEvxvSaLGuxu21P7lH0+PCm0Afr+BC+fN9t/9uU9KBISvfef9lr8/+XyuS9dO4w41DBPLLrnI98nbb1Jzs7P2u1x6S4e3M/XYibKxf/q/fzv7Dx5Jdul6pJNX3Pe1L9ROGj8mBwTk6edfc158bZUsyzJGFxV2fu++rzQospL560f/wrbt3p+sRdjQvF4fbr7+atxy/VXgQsDr83X+4OHfSHX1ja6ebPFCBMD9/z51a83SxQtTHYfhscf/LW3Y+KGi9VJhuF9FUBG7iEVUEJKz6ExfDTCOwzBx/NisGdMmh0bPwqmyySdfeHVVChciOfxexhg+dfsNh7/8+c8kAHADuBAAzUxPM8eMLuYL581u+dYPfkK3bt+T4NLVbl2ilGLmtMlIS02Bz+dPVmQZnAtIkkTGjys5PGv6lHTbdnSPSyc989NkWcKsGVPhdukAkPz/Pn1b+/0P/lwzTBPFBfmeWdOnwOvzJyuqEmTtPrXzuzRNnT97Zo4eWPA2AAkAv2D2jMSbr1/R/vi/nrX/97HH02VZJj1FqxDV+6SJY2uXXrygE8A4AMznN/a89uZbsxhj3XZ2xgVcLpd3/txZDQBSgmMaOvINBCo/Sa1t7XaAjl0DIEAlCU3NLRvnzJxGASytrKnJsiwrwNwdtpkzxnHzDSv2PvTdb7gQKKw6DQDNykxnY0YV2wsvmOP9zo9+4ax66x3Z7dK7LT1KKRk/ZtThubOnpwNQMtPTqjZt3VFYVV1HqUzbF86b4wXg0116CnBq3tGNcVvBpUsWnJw7e3px8JvaV13wjnju5VX5iix1l4Ag4DAH06ZMzJo7a7oEYM/fnngmUwiR2/8uiDiU8tC4REOg6GcARtP/GGOh9br/9dXr9v39yefwj38/j7898UxReUV1tiSdqq5jWTbmz5nRFgRgvt9vVP/tX//xP/iT3+CNNesPAWDJSYkF933tC2ZigofbNjvtfbbtdImH3cRUy5YCG4ND0SOUWXSJeF1Fj+RlSy/GnJlTmsJrSYSLuj3mgNiB57LKypo3H/vbk84zz7/aYBhGM4DcOz9xi7jysos7fX4jVMHolIgoBAilWHHFUgfAGAQqFbELZk1PKyrMaw99Tyg5QpElNDQ0Jj/6l39m/vnvT+GFV1aVATgJAIePnSh97P+exF/+8ZR4bdXbaaqqdgv4Ng3TRqCSFByHST0/xrZsTJ4wpvP7934lE8BYy7Ja//z4v5vue+CneP6VN1sBeBMTPVnf+cYXmzMz0izLdnroZYBp26H5JsVFBVkfv+naVtu2AQ4SXI+EC0EjrWHbcTBmdDFfeOFcd3AzWw8g/crLL2mQJamLMb0nW6DjdK2xoBiLwQFgH0qVxxZH+/kE7MN7rNdXry9cu34DdE2DJNEUT4ILclDvCp1Gyy+/xItAbfnmfzz1vPaHvz7hEUJgzbr3ZxQV5JZOnTwxYVRRQd3E8WP8W7fvLlAUKWauYfgCPgPbXockSQn/9YmPHdiweXsK50zq41CwkxWVqX/6+79VwzBzDx05VvnAt/+nBUD6sqWLN61Z98FFjPNu+pBt2cjPzWYXzZ8rAejYvHV75bQpkyd43C73kkUL/EeOn0zSw8qAybKMyupa5U//92SG32/govlz0m68dnkTAFRW1Uz65e/+AlmWVEWW0zVF7vZdpJfi80IIXLPiCklV1QwAvmdffEN75Fd/TASAF15dnZaaknL40sUL0rOzMn0Xzp3FXn7zrVxVVSLR2odOZeX2W69tfuaFV4VpmaGZINHmhDGO+XNndCR63C6f3+97d8OW5quWXbL34gVz03Oys9pqamuTVVWNy1fX7xbQM8ACPbOO9qMFlJw2xilLF11Y+vFbrjty+y3XHFyyaH4LY91FQrfLJbKy0rcDsA3TdG/csi1VVRSkJCfB5/Pjwx17ioNTV7xw3uw023FOiTIRcUZ6FRnCcwCDNd33Hzpy4l+c8/oF8+fkL128oCN8xye9jL8kSXDpOhRFxs49Bwva2jqSAZCJE8boKcmJ3AnbqQkhsB0H8+bMaE5JTqKWZdOnn399YnVtXQeAtCsuvVikJid3ncRhYh80VYVL10ElyQLgD3XO7dLh0vVAEuwZzD3nArquo7gwf3/wRLFWr3tfUWQZqSnJEBDktVVvSwCOAxi1YN7sHMZY1DVTWVXzYlNL6/NpKSnpt92w8qRgXAXgAiKnPAohoCqyuPySRQ0A3Bs2bt333EtvXA4gQ1EUbcmieS2WbcdgERiaADwjEMZUOuPxKZ3uiCy55carix68/2vy/ffcra288lLbMMwemCFElqTE4KN1n8+QQps3lSiOHjtRgUBhS09KSrJbdFVxiuH0jJb5HYEAOfg98vOvvH7F9l37NADpn7/zjjaP210DoIlSGmUoTv8jJRQOc8A4owBIRnraHJfLRcNPDc45VE3BsksvBoCsqpq6+nc/2Kxv2bozGQAdP7ZEKS7Mb3UYi7rxkfDdRgTE28jz0hs/TADcsix1BDApUjo6OnXQgOVWVRRs/HDHIQAHghsWEYJHWwN82669t/z7Py9fCUC9+cZrlEWLLvSYll2M7tWLu1m1iwrzOmfNmKID8O8/dGTqpi3bk2vqGgSA3GWXLqpQde10cbM33pv+NsBEqXTFY4wwPWsA9p/zs7amtl4rLa8aXVZRPbqsssoOFeEMX1iMCwUAlSWpyZ3g8vHgRDsOw6QJY/OCxoim2tr6ekpPr60YEm9Di5wQAs4BJ3TsRss4PeVDy25t61D++s+nUjnnbTOmTtJXXrn0fQAtNJKZnEQefMYYVFWBqigMAK+razjg8/l4uKndcmyMKi70z505TQDgPr9v24plS4+lpaUeAuBTFUVbfvkSEk5QFa/JvbfbSEBfhmXZhQAURZZPJiZ5GkM1B03LwoK5s8YAGA2A+Q3DiXWwUpDaf/7rP+6m5pb6rMw0zxc/98l1iiw1BI1WPfdemJaNyy9ZxFy6ngrggKoq71xz1WXHfD7v6wDE/LmzCseVFHdYlt01fZFUMoHIpe36qv/FG55G4j4JY2Ytx8m/GP22ml8++lfvbXfejU99/n/wxNMv5odq3omgcaKjsxMVVdWzAFBFkeXLFy8sdxyGzk4vkhI9bP7c2YeC39uxbeceEQDFqbOAc8b9fv/xwE4tG6qmWp1eHyglIjMzXQcghYp3ktNNMyFdzacocvOGTdvk9zZsqQaQkZqaciuAseHFH6ONhWVbVqfXC9tx+JJFCyoSEjztAPi+g0fQ3NJKQ64NAQHGOBbMndnpdrsoAGnKxPFzf/z9b7avWHaJHNTnPRfOm1WdmpIMxvhZxS9GVZXFKSAYpokjx07kAegEkH7N8staueCiraMDiiyx22+5NhnAFAB71657/4iiqNECH6Sk5MSCsupa9fF/PSsDkLIz0ldQSnMinYSOw+Bx61i04IJjQZF1xt2f+3TxT390f/uYklHXAKCqoqRfeeli23acWGoGt0xL+A0TfsOCYZqwe8xZ3EndMZnu4jHMCMSuRjEwdSAkEEiMMTgOAyHdIydCVsOXX18jrrp8SaWqqkWfuv1mX3JS8qFd+w6Y11x5edKEcaMnAuAHDh1N3X/4WLKqKF33U0Lg9frIjj37SEF+Lve43ewH93219KXXVtuLFsxzjRszagoAUlFZXVNVW5cbfmKK7pEZlFJKhACeeOaFCRfOn92ka1pWpGiM8KiV4BV15rTJab/5yfehqWrThfNmWwBSOWC/seadMbbDoGlql8jocbtw2eKLWgGMcxhr/M8Lr5f7/Uay4Ny/7LJFq4oLC66bMHZ0YlF+btXu/YfytQhGiW6MHDGifIL/H9MwIkkSnn/5Tfu2m691EhM86bdcf3Wnx+2u+mDz9o6VV12aNm/OjAwAovRkee6+g0cyFFnq5uwXp95Bgxshnnv5jdQbr11eOXpUUWLo3aLHIjJNE1Mnj/fNnTWtCACtrKw+8caadQyU0qyM9Nprr1qWQiWafNnSi2oef/JZ+Pz+bhWIw747//5vfIne/d+fDqwvEGvt+g1NTzz9Ym6gonA/S4N9xLAc9fbI1Rj7U/wM6XICQDsAx6WqMgEJlmM+/RTWVBU7du/3/OaPj9Ov3vWZek3TUq67elnCdVcvqweQB4BV19Z3PvTzRxP8PgMul95toTHGyDPPvTZqzszplfm52Ukzpk0umTFtchWALADU7zeaf/3oX6XODm+3yJdQiJckSZ0ATI/bnazIMrbt2i+/9sbb9s03rOgAwGRZ0gkhek8JglIKWZENAGZyUtK4SxcvbA066Mb4/WbpH//6ROY7GzYluN16l5ndth2MHV3SMnf2dBVA6/HS8hO/+O2flrZ3emEafkiyNPbOT9zSCkC+fuVyc9feQxHnRJIoCZ5cbQREIYS4I82XEAKJCW5P0K/YJktSUk8pSpYllFZUJj/wk197H/7uNyt0XcteccVSe8UVSy0ASQB4U1PLsW8/+PP0ltY2ydUjYAIA3C6XBqCZc84VRclpaGiWfvXo36RHf/FgRfAZjq6pSrjuKoTAFZctKZNl2Q2g7flXV416+OePuhRVQXpaKi68YHZjTnZm65SJ4+ms6VPN9Rs2aq4gCElgA/YFXRralInjRNBuAACkqbkl8/F//SdiGfW4jZFneJDKZ3Tk9icAiQCVCHbvPcC8Pv9RSoi7pbUts7cdyeN24ennXnEdPVbKL7l4/p7ZM6aWuN3uMe3tHW1btu5yXn5zbVJVdZ0SDsBQR3RNxaEjx+nnv/rtzGuXX35s4YVzihITE8b4fL76LTt2n3z3vc1zdu07KIUc1KH7JSrBb5h45oVXKl26q6OqumYSlQKsz0/858VsEFSbpl0LKvIt284Pn0xJojAMEy++trqJObwqpL9JkiS3trVP37Bpa/6efYdUTVdP04MSPG776edfq5Ak2rj/wOEJlm0jLTUZfkPD2vUbPImJCYcNy/R5O7y5Ho8LtuN0hfmFwt06O70Z/3rmxVpZUY6WllVMIIScxvnWVZ5bUub85/nX9gsijh04fHyGqqpyTyeNrml46dU1norKGqy88tJjc2ZMTfd43KM7OjvbNn2403n+5VUFJysqXXow0qbbHHCB9zd9OPFkecXRY8fLxiqyDFVR8MHmbQW//cP/HUpLS6mVZTmxrb0jMzSEXAgkJibAsq3UJ55+oVySpI71GzaPT05JhqIocBjDn//xlDSqMP+ILEskNSUpNfwUpFTCpq07WUtb+zHDMLqJupqmyQePHJ8uSdI5AyAAkP1Hj3Y7/WVZQnt7J37w0K/R1t4JWZYGtA5EIOJD6ooJpSSGOy/sgaZpQZalQNAwCLgQMEwLlATiN6OVoSYk4PQnhCIUliYQoE50HOdU3GOEUtciyFbGheha7KEYRkopGGeghEQU+xjnoIR2+37TMEAoPa3WfHerTmAhByJ7aDfDTkBxDcSi0R716Hs6yQMWaYFYmxwXYWWpOUe4ftpzg/AbJiRKuk4QIQQM0+yKn422LhhjIIQCQkCiNGA55KKLUZ0JDhJ2LXSacQFwCAgR9OqHGbAch4FQEmZXI93mrafv9ZSwJ8AFhyxJAwpA23GQmpyEP/7ux0hJTka47YAQEuskJOitUmh/5ABKkhRGj9c3AAZ2MTUYRsWCbIMEoVjDWHXghQj4+wIhTaxr6CRJ6pqMSN9FyKmJo91OOqkrczoSAE+5JLqzeRMALperlzSkUydJT0txwB1yuuImIvByhllXYs4VCVtKNAoAQ+/Qg7pruEtA64OjnFIpFEPY9eSA+hGIp6UASNi1Uz0KsKaSCGMsSTRK5krwOj39ugiyU8r0DAAYp/4XvhH2WRwNnAz2WRQD6RsAwxdKvEmdhNAonJ2955UFTgVyBpsKQayYkmiGj4jXYpm+RJzP7MX6FZmnNPo39JYDSIKAOaP5irEZRBQJw0xLPflIY49F5Gd385+eyfjFAcBI2TuRPp2e7gsT0HUNo0cVwrLtrhSQvvhKhkMSbnz0D3FYzRDfWHwUk3DFECfNiiV+CsTelG3bgWXamDhhLNwuPVII3+k6YciaxxjDB5u2YdWad1FVVQNd18JEoHM7oUO9Em5MUIxUwu3b8waAsyfuIOw4RFDGGPx+AwUFueJjN1+DKy5bTGRZOg2EhJDIIAyJarquo76hqfb1N992v/ve5iS/3w9X0IE+5AAoeqv+M1KKetABGC8ohvgJ2JsI6vP5obt0rLjy0tbbb7mmJS83q8BvmErEU5AQkBMVlcK0zKgpHpIkmbqq1h85foK+9PLqvJ27DxBCuoKZB21ChzMJb8x+DHHxM/4T5NyDL/7NI77TzzQtCCEwf95M59N33FwxbepEy/Cbox3mKFGwFbDunyivfMR2nM8oqpzj9/sR+VSkkGTJpIRq23fswcuvrsHRYyehKHLA0tjT8jQE9L+hAsAR/e/sN6rBlFbOFIChpGvbtjF+fAn/9B03k0UL5nYKEMW2bT3a6edyucAcVitR6fcEAOrqWsd4Le93bNu6g0pUNU0zqqKp6xq8Xh/WvbMJq9e8i/qGRui61mWqHzkBzw0A4/6uj9gJ2F8ADEZgwec3kJOdgeuvuaLjupVX8KTEBLdhWhFFTwDQNA2ccUtT1CddqufH2dkpx7sZTEsrapaCsAcEyBLLMhEpIDl0Muq6hurquroXX13t3rxlZ6JpmtB7ISw61wAcbF7JERH0/AQgAPj8BjRVxaWXLOz41MdvaC0szE8xDCOBMR7R/yLLMjRVAyDehZAeLCnMXd8F6Agd1Spqaz9hWtb9siyP9vv9iIZqSZZNTZbr9x44TF96dU3evv2HCaWnIlEG2wAz3Gnoz0cDjBjq+voZgs+ybHDOMGPaJPMzn7ylfs7saTAtJ4s5jhZNlXO5XHAc54Smuh4uzMn8FyGkm6gZ1fVcV1eX47OcLzrM/hqVpETDMKJEklBoqmwyLrSNm7fj1dfXoryiGooih0WTDE0ADoRJ+yNXiGU4s2D3EYAhhgPHdjC6pAgfv/U6XLL4wlpZltymZSdF0/t0XQdnrEOWlN+4VfkP2dnZtRHVPPTSKmprp1uO8w1mO58U6EZ2dPpLNQ0dHR1Yu24Df33VetrW1g6XS+8KSxpK+t+gnoDDGIDnrQEmxkNFN72Pw+f3Iy01BdeuvLz1lutXeFJTkxXDtKJ6FBRFAQGBpMhPqEL+RWFhzp5Y3egzI0dpRfVVXLCHCSUzLcuKqi9KkgRNVXxl5VVNz734RsrWHXsSOeNdQcofOQCOGGD6tkkNQRHUMExIsoRFC+d2fOaOm1vGjCmRTNPMDTLyRdT7VFWF4GIXJdL9JYV5b/YFW2dEiyOE8JRVV3/ctqxvS4pS4jf8p7E8h3YQSZZMRZLrdu3Zn/zci28kHj5ygoayHvoDgENFoR+JgBlG+l9fAEgAx3ZgOw6mTBpnf/L2mxoXLpjjtR2nkDlMiyh6UgKX7oJjs1JVlR8pzsv7NyHE21dcxcFNBdTX1+f6TPsbFnO+SAj0aC4NKlGosuK3bVts2LTN/dKrq1FdXQdVVSEHs66HggFmBIBDzwAzENJKzAUQpDUxLQtFhQW49carfcuvWNykqWqK3zAToz1b0zQIAUOV5D+4NeUXWVlZNWeKp7hA2CWiVlbO4kL8gDN+LRc8qr5IgzlzjU3NWPPW+1j79vtoa++A2+WKnkFxHp6AI5VwhyAASSA/1Ov1BfS+qy/DdSuvRFZmGjNMS+I8cpi2oiiglIIS+gql5AclBQU748XRWYEw+OGkvKr2FibYAwJismVFVlgFAFmSoGkqSssqOp76zyvqjh37tMBuop4TAA6mAWZEBB2aIqjfNAEBXDhvpv+/Pn1b84Txo/MsyyaxbB6qqoKAHJBk6cGinJxnCSFnxbB11iAMtbo6keC3qz5tOc73JUnKiubSAABNVW0QUrH5wx3uV157K+fosVIoigJZoufcoha3YWEArHcjETBn2/fo12yHwXZsTBg3mt9+6/X1Sy6e18gFimzLSop8YAZcDoyxelWWf+hS8v+RnU06+wM7/QbCUKusbCp0hPGgxezbCSFR9UUAcLl00zRMbe26DeKV19aKxqZmGqDAl2LWuDsnE4rhGwEzmDGgQ1n8JITAYQx+v4ncnEx+4/VX+a9bucx2u3XZMKyEaLmNmqaBCxiaJD8lE/2BgoL0iv7ETL+DMNQqamrmW7b9iACWMsai6otSQES1amrrnddef0t79/0PJb/f3xUCdz6egMMZgMNR/wvZHXw+A26PC1cuW8JuvWmlmZ+fQwy/oXMuSDS9T5JkEIj1qqJ8uzA3d8tAYGXAQBgcKFpZXfdZ0zG/DkImWpYVNQROURRIlLYfOnKs7T/PvZa5e+9BPSB/Kx8ZEfSjpv8NlghqmhYY55gza5px5ydvaZg6dUIyYzwpliFRVTVA8EOarP2qIC/7b4QQPlA4GVAQhlpDQ0Oi1zS/6jB2H6HUEz0EjkBW5HYiUPHB5m0lL72y2l1WXhnckaRBV+hHHPBnN07nGnyMMViWjaLifPaxm66pu+qqpU3gotiy7KRo60/XdQjOvbKk/MSjKb/NzMzsGGh8DAoIQ62qqn62ya17bNu+lUpUjqQvhti0dF1lnZ0+afXad/Hm6vVobGqBFiiZFpGOcASA57cBJua1HoRPjDH4DRNZmem46YarsHL5Za1JyYmmaVrZnPPoeh9jjqKo/9Go+sv8/Kwdg4WLQQVhqJVV1V3hMOsHVKILTNOMEQIXEAuqa2rxwkur2PsffCjZtt0tZWokBencGGCGir7e84F+vwFFUbDssovZ7R+7TioqzINl2YhWpk2W5YDDnfFNkqT+oDg/e81g4+GcgDA4qK6Kmpo7Tcv+qiRL4w3DiKkvUkrbd+7a2/7CS2/mHDx8QpYkAkVR+1X3GknCHZ4iaCi73XEcTJs60fnEbTfUzps3M4kznmTF0Pt0XQdz2BFNVX5bmJv7OCHEfy6wcM5AGGqtra1pTR0d3+KM3U0lyeP3Rx6HYJZGm+041WvXbUh45dU1+bV1DVRV1dOIcfv19IvXUDESATOg0krooSG9Lzcni33sppWVV199uU9R5DzDMJOj3e9yucAZ81JJ+n16YuJPU1JSms8lBs45CEOturphjt8x7uWC38p55BC4IJs0c7tdnc0tbcrrq9a51771PlrbOqDratwkwiNJuMMIgMHiPJxzGIaJ1NQULF92ie/mm1Z4MzPSHL/fyBJCSJHuDws1+49L1n+Wl5e5fSis/SEDwlP6YtV1DuM/JpRMMS0LLIK+GKyQBEWRcbKsEs+/+CbbtGWH5DhORIqNkRPw/NL/DMOAJCu4+KK59idvv0kZPbqIWZZNueAkUlaPJMvQAilG+2WJfqc4P//lobTmhxwIAaCxUSR1mtWfsiz7XkmRC40oLHAAoKoKCNC+Zevu9mdfeCP72PFSRVVVKIrca2XVkSTc4QNAggCVvGFamDRxLLv9lutOLFl8oSQ4L7Fsm0RVYVwuMMepUBXlZwla3j8zMkj7UFvvQxKEoVZZ2VTIYDxsOfathFLVMIzo+qKutRp+o33tug9SX3pltbuhsUnSNBWRSliPRMAMnPgZU6yOE3yMMRimhezMNHbzTSvbVq64vMHjcmX4DSM92n1Bf5+lysp/JOj393eo2UcGhKFWXlMzz7Ssb0LgZiY4nCj6okQpVF1tqq9tkF598+2UtW9vgM/nRwiMvVEyjkTADB39r0vv8xtISkrApZdc5L/91ms783Jz4Df8aZxH1vtkRYEUKBL0nKqqPy/Kzf1wqK/vYQHCUKuorv6E7fDvCyLGRUuZIoRAlmXIkoSjx0rxnxde41u376UQAqquxOAv/2gZYGJ+1zk+AQkAv2GCEoIL589iH//Ytf4pkye6bNumjHES6Z6uFCNBjioy/WFhXt6/hsu6HlYgBIDm5ubkFp/vs9xx7qeSlB4zZUpTwRlv/GDTNvvZl97IKi0tlzRNg6JI3RfMEND/RkTQUBUjG4ZhoqSkyLntppXHr1y2OB2Epti2LUc7MTVdh2CsSZblh5Pd7r+lpaW1Dac1PexAGGo1NTUlfsd5yHHYLYQSJUbKlPC43e2dXm/tK6+9lbvqrXeSmkIhcD1Y4M53/W+oGGAigY8xDtM0kZ6WIq5deXnbzTdcXZGY4En2+Y1CIQSJvMlqEFzYsiw/65Kl7+bm5pYOx7U8bEEYaqUVFRc6TDwoyfSKaCxwwXhUx6VrorqmTnnx1dV4593N8PuNM3dpjMSA9isAIQC/acDtcuGKyxbhlptWWkUF+T6/4U8UAlKkKKoQqxlz+BpZIg+UFBZuHs5reNiDMDixckV17V2243wVFGNN04wZAifLEnbvOdD5/ItvenbvPUgICRH2iJEk3EESPwkhMEwTQgjMmD7Z+tTtN1pzZk9LcBwWrGobmc06cPrhmCrLvy3My3mMEOIM9/V7XoAw1FpaWlJaOzvvYZzfQyh19aIv2oxx/vb6Dc0vvbI6p7yimui63sUCNwLAgQEgIQSOw+D3+1FUlMduu+ma+iuWLfEpslxkWlbEEmJhKUZ+icq/TElw/zI1NbX1fFm35xUIQ62ipma+w9g3LMu6jlCqWJaFKJPLXW5XXXtbh/Xci68nr3nr/eTOzk6iadppNc7PpfgZ89owcsALIWAYJjweN1u54vLmj9208lhmZlqx3+fPY1EklyCZrq2qysuyJP1ioLLbR0A4QO1EdfViYTm/pIo0N1rKFKU0oC+6tM4TpeXuF15cpX6weRtM0zqdBe480P/OlQHGMExomooliy/ErTde3Tx+3OgmwzALOed6NL1P0zRwm21TVPmeory8987XdXpegxAIsMAZrOZzlm1/SZKk0dEKoYIQqIoCSgh27Nzb+dSzr7oOHDwiKUqQ2jyceGqEhr5PfQ+kGFmwHYapkyewT91xg3/e3JkJEIAV1PsiWUpdLhcYYydURXlUl3L/0l+sZiMgPMetpqYmy8/Ytx2H3UUp1Q0jesqUqiqWadnt69Zv0J978U1PbV0DcelaV9TNYOh/w10EZYzB7zeQl5uNG2+4qvaaFZdLuqYmm6alRg01c7nAGTdkKj3mUqRHcnNz6z8Ka/MjA8JQq6ysXWAK514h+PUOYxFD4IJiqnDpelNdQ0PzCy+vKliz9j2XYRjd9MVeDRUfQRp6HtT73C5dXLZ0UfMnbr++Nj83O83r8+dwHqWApiJDlmRQQl5SifKzgoKcTR+lNfmRA2GoldXU3GJb9kNUouNN04waAifJkqlrWsPhI8czn3nuVW3Lh7vABYemqoMLwBggHCoxoIZhglKChRfOxSc/foM5cfyYWtO0shjnrkh6X4DuUgNn/IiuKt8tyM199qO4Fj+yIASA8vLWNEY777Rt+x5JlnMjuzQICAmkTAkusGXbLvH0s6/wI0dLJVVRoCjK6cRTH6Ek3JDeZ1o2Jo0fzT/x8RvJgvlzCKW0y98XSe8LUEs4NYqi/FLiCY8XFZ3b7PYREJ57fbHE5PwnpmXdRCmVolaZogSqqpo+n7/2ldfXaq++9nZOU3ML3G7XKZfGRwiAnAv4/D6kp6WJa1cuK7/lhqv8iQkJJYZpaJxHTzFijDFNVZ/XKL1vuIaajYBwoETUqqpFjsMeFASXOo4TiwVOuF2u2vLK6o5nX3iz6N33NumGYUCLEAI3EOJnTCANkv4XcjlctvQi4/abrykrHlXA/H5jnOOwiA53WQ6UTyeCvKIo0s+L8/M3jKy4ERBGW3RKWXX1pxjj3wXBqGghcJRSUEoNVVP9+/YdSnnmuVfJtp17QRBwMA8X/e9MAWhaFiCAC+bMwB23XS9mTJ/UatmWizOhR9KrQ6FmEDgpgT5UUlzwt17LWI+AcKQBQGVlW7qNjm86jN9FCJLNYJxjJH1R01Q4DsP7H2wRz77wBjleWg5NUyFLUr/6AAdT/Ay/jxAC23FgGibGjhmF2265RlyyeAGRZRmBcTm904SQUAHNNlmijylI/HlBQXLTyMoaAeGZg7G+frxtWT+2bPsGQogULQQuwGOpWm2tHU0vv7ZWe+nVNantHR0kXF88G/3vXImgQgh4fX4kJyWKG667suWm65abKSnJ6YZhqjxWqJkQTFWUFxVV/U5BVtaRkZU0AsKzbhUVNZea3PkJobjAtu2o+qIsS7au6yePHS/jzzz3SskHm7arDnPCXBr9Z4AZ6BQk07QgyxIuvmiedcfHri8dN66E+v3GKMdxoup9iqJAcGzVVPm+wtzcdSMrZwSE/dqOHDmiKe6ELznM/jKltDimvihTQ5UVZdfu/dK/n3kZu/cdBAGBqkWg2BhCETCEAKZpQwCYOX0iPnH7jZgzcyqzLNtmUeI8A8TMOrjgZbKk/M72dT46fvx4c2TFjIBwwFpVVVWG4fB7ueB3UYkmRvQvEgICAU3TYJqWeGvdhs4XXl6VWF5ZDV3TTqVMDZETEAAcx4FhmCguKsAN115Rv+LKpSmapqmGYUAEiJcj6H06hOAWBf2tLtOf5efnN46skBEQDiIY62dbsB8wDXMlkSi1o6ZMUeHSNV9jc0v7f55/VV/79obUjg4v3C59yIigXp8fSYkJWL5sScttt15jZKSnuf1+M0EILkW6R1FVCMa5pmqvUYpfFOfnvz+yIkZAeM5aWWXl5Tbjv5BkaYZhmrFYw22XrlUdOnJc/vs/n0vbvnOvO2DIUM5K/IwJ2l7AZ1o2CAQumDPD91+f+Vjz5IljHZ/PyGeMKRFZzWQZuqaBOWy3ItFvFBcUvDWyAkZAOCRac3Nzcoff/IJpm1+UZbkwWsoUpRSKLPtASP2WrTuLn3n2VXLg4FHIshQxBG5A9D9CYJkWHMYwddJ4fPxj14oL588uE1xk2cxxcxZZ73O5XHAcp0JTtD8kurQ/DjdWsxEQflROxYaGPGYY33UY+yyNxhoeIipWFXh9frz19vvimedeI7V1DXC7dEg9/Iv9BcBQAU2v14/cnCzcfMNVvhXLlyoJHo9iWBYC4Dv9Rl3XwTm3ZCr9TXLpDxVnZlaPzPQICId8K6+uXmw7zrcAssJ2Irs0BACJUrh03aqpq29+8qmXtPXvbkw1DBOuoL7YnyKoz++Hrum47JKFLZ+840YzJzszyfAbOheCRvq9LMtQZAWAeEOR9Z8W5WW9NzKzIyAcVk0IQcsqaz7OBHuQSHS0aRgRU6YAQFUUS5Ll6r37DpKn/vNK/tYde2QaSDA+a/BZlg3GGS6YPd2547brq2ZMmywc5uTZtqNGY7PWdR2c8ROSLD1QnJv7b0IIH5nRERAO29be3p7Z1Nb2OZuxr0qSlBWNBY5SCkWRvQCa3vvgw8Kn/vMyOXa8DIGUqT5UmRLdRU/btmHbDsaMLsbHP3adWHLx/AoA6bbteKL6+wJZDvWKJP02PTn5L0lJSQ0jMzgCwvOmVVZWjreB79i280lCCYmUMhUkKoauaWhra8cbq9fzF15ZRRsam+F26VEpNkJ/ChVS8fn8yMhIw43XXSWuXr6UpKQkwTDMqEDWNA2cc6HKyisKwb0FBQUjoWYjIDx/28mKiksdzr8JQpbbjhPRpRHSyVRVbTl5srzmiadeyN2wcVuqbdtd+mIkEdTvN6AoChYtnNPyyY/f3DS6pLDIMEw1mhgsyTIUWQaEWCVT+vNRhYUjoWYjIPzo6Isnq2o+z7lzPwgpiBYCRwiBIsteWZHrP9y6iz75zEuF+/YfppIkQZblrt/ZtgPGGKZNmcA/ftv1FfMvmMkd28myHccTnc1aBwQqKaUPj8rP/dOI3jcCwo9kq62tzfZZzl0Os79BJSkhUspUSERVFaXTYYy9897GpCeffhll5dVEliU4jKG4ME98/GPXYeklC9tlKkmWbSdEo5YI8rp0ypL8C7cqP5aTk1M3MhMjIPzIt7KaminccR62bOcaQgmJlDJFCAmkTGmq1dDU7Hv+xTe19zZ86Fq8aJ7/puuvMjMz0t2GGUgxinT6KaoKcCFURX6VyvL9xbm5+0dGfgSEI61HK6+uXm7ZziOE0pmWZUZ1aUiUckmWuM9nyG637jCHUcZ5RH9foICmBsH5LlWRv12Ul7dqZKRHQDjSYuuLrvLq2q/ZjnU3oTQ/lr5ICIlq8QwrpFKlyOrvi/JyfkMI8Y+M8AgIR1ofW11dXY7PtO9zuPM5QqnbMI1es+9Ds6prOoQQjkyk37s15SfZ2dm1IyM6AsKRFmcrrai4kIP8wHHsKwHAjsIaDgTqLwKALMurJUX5+aicnLdHRnAEhCOtv8BYXnU7J/y7lNLJRo8QuEComQucswNU0IdKivKfGhmxERCOtAFora2tae0+427TMv5bAAWWZUFVVRCgUlP1Pye59d+npHx02axH2kgbtFZT0zKqtKLq1ZNV1aK0ourVmpqWUSOjMjzb/wcwi8WqszTz2QAAAABJRU5ErkJggg==' },
  { id: 3, nome: 'LGPD / GDPR Compliance', cat: 'Conformidade', desc: 'Em conformidade com a Lei Geral de Proteção de Dados (LGPD) e o Regulamento Geral de Proteção de Dados (GDPR).', ic: 'shield-check', logo: 'data:image/png;base64,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' },
  { id: 4, nome: 'Microsoft Partner', cat: 'Parceria', desc: 'Parceiro certificado Microsoft com expertise em soluções de nuvem e produtividade corporativa.', ic: 'cloud', logo: 'data:image/png;base64,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qK2trWt/9atfLaqqqrr9oosuWjXce2XRokUTPv300+P//e9/H5VOp6cZhuHtV113RAQpZeLee+99f968eX/bbrvtHjj22GPXD3QfkUhkP0S8L5lMSiEEEVEknU7fDgCXquNasGDBXpdffvnFvb29+xJRg8pcBYBsNpu9CgDmlcz8FxjgeDNTkkHOwIGGtHQTntJP2EexFAYNZ6CmK8D+SJEUz8WZazLq602qrtnczRjMw+xDXt9hDBO0Fjjei5g3dx5X9ICQpXRyEZaALrV6DwvIvfSROUmgu2WDYEeQLxJdTHDjwDQcUshZPxFBRUVFd1/A9tJLLx328MMP/8yyrK9LKePqu8rNyY22EAIsywIAqOrt7d03lUrt+/TTT//wvvvuO+u44477eCATrKioiKVSqTqezm/bdrV6f968ecetXLnyD0Q0QjFRw/CSSw3HceLxeLysu7t7hHeb2XbeNXEBrVxKWa7OidqnEAKklHY2mw1TfCkDgDHaNUo6jkMuw9vjnXfe+UMqlfq62o9t296143FVx3HGZzKZX/T09Hz/xhtv/Nl555337BDvk8h11113/Ouvv35pOp3eQV0fKWVAXFZJuxmGUZnOZPZqaWnZq7u7+5Qbb7zxkvPPP//JgTBJRKwSQtSr62+apjonIISAa6655rzPP/98jmVZdUIIVZai9htNpVITSyb+iz0E8WZvqjVcIJUSQTDhKJVC77EuAvd9dXMzNxvpIlo8loeBWBKx9zwtS8RA2x1iAMldpQrYpBcP68fqMnjEQPts8pJnkLkq83qPF+o259W4QZ5bUp2fQJsc5F0C3GQf9OOO+nY4BhMibImgjpehOow4XCaTQSn9prPuyt6pra1dU+g7Tz311DkbNmy4L5PJfNNxnLgykMqYGYYBpml6v/PWL7lMzW+/8847999+++2TBjLPtrY2ocDGtm21L+k4DixYsOB7bW1tN0spR1iW5RlP5nIFwzDSiUSClJF3HAccBsb8nHIdTw5yjuPkdWnwENQwCNzuDgwUnWnTpqXvueeer3/88cf3pVKpr6vtq/OkyjR0aTuX1kxZvXr1vTfddNM+g72uy5cvr7zqqqsWrFu37s5UKuWBmwJqgRjYv2EY3jHatg2pVGr6J598cv/1119/zkAWUDmyGzxftm1LAIBrr732rHXr1l1v23adytQ1TTOQuQsA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' },
  { id: 6, nome: 'Meta Business Partner', cat: 'Parceria', desc: 'Parceiro oficial da Meta para soluções de marketing e atendimento via WhatsApp, Instagram e Facebook.', ic: 'messages-square', logo: 'data:image/png;base64,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' },
]);
function CertificacoesTab({ mobile }) {
  const [list, setList] = useStore(SELOS_STORE);
  const [novo, setNovo] = React.useState(false);
  const [f, setF] = React.useState({ nome: '', cat: 'Parceria', desc: '', logo: null });
  const refs = React.useRef({}), newRef = React.useRef(null);
  const upLogo = async (id, e) => { const file = e.target.files && e.target.files[0]; if (file) { const src = await readFile(file); setList((l) => l.map((x) => x.id === id ? { ...x, logo: src } : x)); } e.target.value = ''; };
  return (
    <section style={{ ...glass, padding: mobile ? 16 : 26, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <CardTitle size={mobile ? 19 : 22} right={<OBtn size="sm" iconLeft="plus" onClick={() => setNovo(true)}>{mobile ? 'Nova' : 'Nova certificação'}</OBtn>}>Certificações</CardTitle>
            <div style={grid2(mobile, 300)}>
        {list.map((c) => (
          <div key={c.id} style={{ position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 12, padding: 18, borderRadius: 22, background: 'linear-gradient(160deg, rgba(255,255,255,.85), rgba(225,236,255,.7))', border: '1.5px solid #fff' }}>
            <span style={{ position: 'absolute', right: -14, top: -14, color: 'rgba(31,94,255,.07)' }}><OIcon name="award" size={110} /></span>
            <button type="button" onClick={() => refs.current[c.id] && refs.current[c.id].click()} title={c.logo ? 'Trocar logo' : 'Enviar logo oficial'} style={{ position: 'relative', width: '100%', height: 120, borderRadius: 18, padding: c.logo ? (c.pad || '20px 22px') : 0, cursor: 'pointer', fontFamily: 'inherit', overflow: 'hidden', border: c.logo ? '1.5px solid rgba(255,255,255,.95)' : '1.5px dashed rgba(31,94,255,.4)', background: c.logo ? '#fff' : 'rgba(31,94,255,.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: '#1F5EFF', boxShadow: c.logo ? '0 10px 22px -16px rgba(23,73,170,.45)' : 'none' }}>
              {c.logo ? <img src={c.logo} alt={'Logo ' + c.nome} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                : <><span style={{ width: 38, height: 38, borderRadius: 12, background: 'linear-gradient(135deg,#0B4BEB,#7B4BC4)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><OIcon name={c.ic} size={18} /></span><span style={{ fontSize: 13, fontWeight: 600 }}>Enviar logo oficial</span></>}
            </button>
            <input ref={(el) => { refs.current[c.id] = el; }} type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => upLogo(c.id, e)} />
            <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-strong)', lineHeight: 1.3, display: 'flex', alignItems: 'center', gap: 6 }}>{c.nome}<OIcon name="badge-check" size={17} color="#1F5EFF" /></span>
            <span style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{c.desc}</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, paddingTop: 10, borderTop: '1px solid rgba(214,226,242,.9)', marginTop: 'auto' }}>
              {[['Categoria', c.cat], ['Status', 'Ativo'], ['Logo', c.logo ? 'Enviado' : 'Pendente']].map(([k, v]) => <div key={k}><p style={{ margin: 0, fontSize: 11, color: 'var(--text-muted)' }}>{k}</p><p style={{ margin: '2px 0 0', fontSize: 14, fontWeight: 600, color: k === 'Logo' && !c.logo ? '#B98400' : k === 'Status' ? '#2DBF6A' : 'var(--text-strong)' }}>{v}</p></div>)}
            </div>
          </div>
        ))}
      </div>
      <GPortal><ODialog open={novo} onClose={() => setNovo(false)} icon="award" title="Nova certificação" width={580}
        footer={<><OBtn variant="secondary" onClick={() => setNovo(false)}>Cancelar</OBtn><OBtn iconLeft="check" onClick={() => { if (!f.nome.trim()) return; setList([...list, { id: Date.now(), nome: f.nome.trim(), cat: f.cat, desc: f.desc.trim(), ic: 'award', logo: f.logo }]); setNovo(false); setF({ nome: '', cat: 'Parceria', desc: '', logo: null }); }}>Salvar certificação</OBtn></>}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 14 }}>
          <OInput label="Nome" value={f.nome} onChange={(e) => setF({ ...f, nome: e.target.value })} />
          <OSelect label="Categoria" options={['Parceria', 'Programa', 'Infraestrutura', 'Conformidade', 'Prêmio']} value={f.cat} onChange={(e) => setF({ ...f, cat: e.target.value })} />
          <OInput label="Descrição" value={f.desc} onChange={(e) => setF({ ...f, desc: e.target.value })} style={{ gridColumn: '1 / -1' }} />
          <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: 10 }}><OBtn variant="secondary" iconLeft={f.logo ? 'check' : 'upload'} onClick={() => newRef.current && newRef.current.click()}>{f.logo ? 'Logo escolhido' : 'Enviar logo oficial'}</OBtn>{f.logo ? <img src={f.logo} alt="" style={{ height: 36, maxWidth: 120, objectFit: 'contain' }} /> : null}</div>
          <input ref={newRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={async (e) => { const file = e.target.files && e.target.files[0]; if (file) setF({ ...f, logo: await readFile(file) }); e.target.value = ''; }} />
        </div>
      </ODialog></GPortal>
    </section>
  );
}

/* ---- Canais ---- */
const WA_STORE = makeStore({ status: 'on', modo: 'naoOficial', numero: '(19) 99800-4100', desde: '12/08/2026', oficial: { phone: '', phoneId: '', waba: '', token: '' } });
function SoundSettings() {
  const [s, setS] = useStore(SOUND);
  const save = (v) => { setS(v); lsSet('salute-kit:sound', v); };
  return (
    <Block title="Som de nova mensagem" desc="Toca sempre que chega uma mensagem de paciente ou da equipe." right={<MiniToggle on={s.on} label="Som de nova mensagem" onChange={(v) => save({ ...s, on: v })} />}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', opacity: s.on ? 1 : .5 }}>
        <div style={{ display: 'flex', gap: 6 }}>{Object.entries(TONES).map(([k, t]) => <FilterChip key={k} active={s.tone === k} onClick={() => { save({ ...s, tone: k }); playMsgSound(k, s.vol); }}><OIcon name="music-2" size={13} />{t.label}</FilterChip>)}</div>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)' }}><OIcon name="volume-2" size={16} /><input type="range" min="0.1" max="1" step="0.05" value={s.vol} aria-label="Volume" onChange={(e) => save({ ...s, vol: +e.target.value })} style={{ width: 120, accentColor: '#1F5EFF' }} /><b style={{ color: 'var(--text-strong)', minWidth: 36 }}>{Math.round(s.vol * 100)}%</b></span>
        <OBtn size="sm" variant="secondary" iconLeft="play" onClick={() => playMsgSound(s.tone, s.vol)}>Testar som</OBtn>
      </div>
    </Block>
  );
}
function CanaisTab({ mobile }) {
  const [wa, setWa] = useStore(WA_STORE);
  const [modo, setModo] = React.useState(wa.modo);
  const [busy, setBusy] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const on = wa.status === 'on';
  const of = wa.oficial;
  const setOf = (k) => (e) => setWa({ ...wa, oficial: { ...of, [k]: e.target.value } });
  const connect = (m, numero) => { setBusy(true); setTimeout(() => { setBusy(false); setWa({ ...WA_STORE.v, status: 'on', modo: m, numero: numero || WA_STORE.v.numero, desde: HOJE }); }, 1200); };
  const hook = 'https://api.salute.app/webhooks/whatsapp/bellaforma';
  const MODES = { oficial: ['API oficial (Meta)', 'shield-check', ['Conexão estável e sem risco de bloqueio', 'Mensagens em massa com modelos aprovados', 'A Meta cobra por conversa iniciada']], naoOficial: ['API não oficial (QR Code)', 'qr-code', ['Conecta em 1 minuto lendo o QR Code', 'Sem custo por conversa', 'Risco de bloqueio se houver muitos disparos']] };
  const card = { ...glass, padding: mobile ? 16 : 24, display: 'flex', flexDirection: 'column', gap: 16 };
  const iconBox = (bg, ic) => <span style={{ width: 48, height: 48, borderRadius: 16, background: bg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><OIcon name={ic} size={22} /></span>;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 14 : 22 }}>
      <section style={card}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          {iconBox('linear-gradient(135deg,#1FB86B,#2DBF6A)', 'message-circle')}
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ margin: 0, fontSize: 18, fontWeight: 600, color: 'var(--text-strong)' }}>WhatsApp</p>
            <p style={{ margin: '2px 0 0', fontSize: 13, color: 'var(--text-muted)' }}>{on ? <>Conectado no número <B>{wa.numero}</B> pela {MODES[wa.modo][0].toLowerCase()} desde {wa.desde}.</> : 'Nenhum número conectado. A Renata IA e a equipe precisam do WhatsApp conectado para atender.'}</p>
          </div>
          {on ? <><Badge2 c="#2DBF6A">Conectado</Badge2><OBtn size="sm" variant="secondary" iconLeft="unplug" onClick={() => setWa({ ...wa, status: 'off' })}>Desconectar</OBtn></> : <Badge2 c="#F5B400">Desconectado</Badge2>}
        </div>
        {!on ? <>
          <span style={lbl}>Como você quer conectar?</span>
          <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : '1fr 1fr', gap: 12 }}>
            {Object.entries(MODES).map(([k, [l, ic, pros]]) => { const sel = modo === k; return (
              <button key={k} type="button" onClick={() => setModo(k)} style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 16, borderRadius: 20, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', border: sel ? '2px solid #1F5EFF' : '2px solid rgba(255,255,255,.95)', background: sel ? 'rgba(31,94,255,.06)' : 'rgba(255,255,255,.6)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 18, height: 18, borderRadius: '50%', border: sel ? '5px solid #1F5EFF' : '2px solid rgba(150,175,210,.8)', boxSizing: 'border-box', background: '#fff' }} /><b style={{ fontSize: 15, color: 'var(--text-strong)' }}>{l}</b>{k === 'oficial' ? <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 600, color: '#1F5EFF' }}>Recomendada</span> : null}</span>
                {pros.map((p, i) => <span key={p} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: i === 2 ? 'var(--text-muted)' : 'var(--text-body)' }}><OIcon name={i === 2 ? 'info' : 'check'} size={14} color={i === 2 ? '#B98400' : '#2DBF6A'} />{p}</span>)}
              </button>); })}
          </div>
          {modo === 'naoOficial' ? (
            <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap', padding: 18, borderRadius: 20, background: 'rgba(255,255,255,.7)', border: '1.5px solid rgba(255,255,255,.95)' }}>
              <div style={{ padding: 10, borderRadius: 18, background: '#fff', boxShadow: '0 10px 24px -14px rgba(23,73,170,.5)' }}><FakeQR seed={'wa' + Date.now().toString().slice(0, 7)} size={170} /></div>
              <div style={{ flex: 1, minWidth: 220, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <ol style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 8, fontSize: 14, color: 'var(--text-body)' }}>
                  <li>Abra o WhatsApp no celular da clínica.</li><li>Toque em <B>Aparelhos conectados</B> e depois em <B>Conectar aparelho</B>.</li><li>Aponte a câmera para este QR Code.</li>
                </ol>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: busy ? '#1F5EFF' : '#2DBF6A', boxShadow: '0 0 0 4px rgba(45,191,106,.2)' }} />{busy ? 'Conectando...' : 'Aguardando leitura. O código se renova a cada 60 segundos.'}</div>
                <div><OBtn iconLeft="check" loading={busy} onClick={() => connect('naoOficial')}>Já li o QR Code</OBtn></div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 18, borderRadius: 20, background: 'rgba(255,255,255,.7)', border: '1.5px solid rgba(255,255,255,.95)' }}>
              <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Você encontra estes dados no Gerenciador do WhatsApp, dentro da sua conta Meta Business.</span>
              <div style={grid2(mobile)}>
                <OInput label="Número do WhatsApp" iconLeft="phone" placeholder="(19) 99999-9999" value={of.phone} onChange={setOf('phone')} />
                <OInput label="ID do número (Phone Number ID)" value={of.phoneId} onChange={setOf('phoneId')} />
                <OInput label="ID da conta (WABA ID)" value={of.waba} onChange={setOf('waba')} />
                <OInput label="Token de acesso permanente" type="password" value={of.token} onChange={setOf('token')} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 6px 0 14px', height: 44, borderRadius: 999, background: '#fff', border: '1.5px solid rgba(214,226,242,.95)' }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)', flexShrink: 0 }}>URL do webhook</span><span style={{ flex: 1, minWidth: 0, fontSize: 13, color: 'var(--text-body)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{hook}</span>
                <OBtn size="sm" variant="secondary" iconLeft={copied ? 'check' : 'copy'} onClick={() => { try { navigator.clipboard && navigator.clipboard.writeText(hook); } catch (e) {} setCopied(true); }}>{copied ? 'Copiado' : 'Copiar'}</OBtn>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}><OBtn iconLeft="link" loading={busy} disabled={!of.phone || !of.phoneId || !of.waba || !of.token} onClick={() => connect('oficial', of.phone)}>Conectar com a Meta</OBtn></div>
            </div>
          )}
        </> : null}
      </section>
      <section style={{ ...card, opacity: .96 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          {iconBox('linear-gradient(135deg,#7B4BC4,#F2694A)', 'instagram')}
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ margin: 0, fontSize: 18, fontWeight: 600, color: 'var(--text-strong)', display: 'flex', alignItems: 'center', gap: 8 }}>Instagram <BetaPill /></p>
            <p style={{ margin: '2px 0 0', fontSize: 13, color: 'var(--text-muted)' }}>Em desenvolvimento. Em breve as mensagens do Direct vão chegar aqui junto com o WhatsApp, e a Renata IA vai poder responder.</p>
          </div>
          <span title="Disponível em breve"><OBtn size="sm" variant="secondary" iconLeft="link" disabled>Conectar (em breve)</OBtn></span>
        </div>
      </section>
      <section style={card}><SoundSettings /></section>
    </div>
  );
}

function ConfigScreen({ mobile }) {
  const { can, member } = useAccess();
  const tabs = CONFIG_TABS.filter(([k]) => can('perfil.' + k));
  const [tab, setTab] = React.useState(() => (tabs[0] || ['conta'])[0]);
  React.useEffect(() => { if (tabs.length && !tabs.some((t) => t[0] === tab)) setTab(tabs[0][0]); }, [member && member.id]);
  if (!tabs.length) return <section style={{ ...glass, padding: 30, fontSize: 15, color: 'var(--text-muted)' }}>Sem acesso a nenhuma área de Configurações.</section>;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 14 : 22 }}>
      <GTabs items={tabs} value={tab} onChange={setTab} />
      {tab === 'cadastro' ? <CadastroTab mobile={mobile} /> : null}
      {tab === 'canais' ? <CanaisTab mobile={mobile} /> : null}
      {tab === 'flix' ? <SaluteflixTab mobile={mobile} /> : null}
      {tab === 'parcerias' ? <ParceriasTab mobile={mobile} /> : null}
      {tab === 'cert' ? <CertificacoesTab mobile={mobile} /> : null}
      {tab === 'conta' ? <PerfilScreen mobile={mobile} /> : null}
    </div>
  );
}

Object.assign(window, { PacientesScreen, AgendaScreen, GestaoScreen, ConfigScreen, SoundSettings, Block, Toggle, MiniToggle, FilterChip, BetaPill, Badge2, B, readFile, HOJE, grid2, SavedBar });
