// Shared bits for the reference-identical kit: data, glass card, chips, status badges.
const { Icon: SIcon, Avatar: SAvatar } = window.SaluteProjetoDesigner_8b4683;

const KIT_NAV = [
  { id: 'painel', label: 'Painel', icon: 'house' },
  { id: 'pacientes', label: 'Pacientes', icon: 'users' },
  { id: 'agenda', label: 'Agenda', icon: 'calendar-days' },
  { id: 'mensagens', label: 'Mensagens', icon: 'messages-square' },
  { id: 'gestao', label: 'Gestão', icon: 'briefcase-business' },
  { id: 'perfil', label: 'Configurações', icon: 'settings' },
];
const KIT_USER = { name: 'Camila Rocha' };

const PATIENTS = [
  { id: 'P00001', name: 'Ahmad Lipshutz', email: 'ahmadlipshutz@gmail.com', age: 21, proc: 'Avaliação', status: 'tratamento' },
  { id: 'P000012', name: 'Charlie Botosh', email: 'charliebotosh@gmail.com', age: 23, proc: 'Limpeza de pele', status: 'consulta' },
  { id: 'P000034', name: 'Adison Schleifer', email: 'adisonschleifer@gmail.com', age: 25, proc: 'Harmonização', status: 'concluido' },
  { id: 'P000014', name: 'Guy Hawkins', email: 'sara.cruz@example.com', age: 27, proc: 'Clareamento', status: 'tratamento' },
  { id: 'P000013', name: 'Floyd Miles', email: 'georgia.young@example.com', age: 29, proc: 'Limpeza de pele', status: 'consulta' },
  { id: 'P000021', name: 'Savannah Nguyen', email: 'debra.holt@example.com', age: 31, proc: 'Harmonização', status: 'concluido' },
  { id: 'P000019', name: 'Devon Lane', email: 'felicia.reid@example.com', age: 33, proc: 'Clareamento', status: 'tratamento' },
  { id: 'P000016', name: 'Darlene Robertson', email: 'michael.mitc@example.com', age: 35, proc: 'Limpeza de pele', status: 'consulta' },
];
const STATUS = {
  tratamento: { label: 'Em tratamento', c: '#F2694A', bg: 'rgba(242,105,74,.08)', bd: 'rgba(242,105,74,.28)' },
  consulta: { label: 'Consulta', c: '#1F5EFF', bg: 'rgba(31,94,255,.07)', bd: 'rgba(31,94,255,.28)' },
  concluido: { label: 'Concluído', c: '#2DBF6A', bg: 'rgba(45,191,106,.08)', bd: 'rgba(45,191,106,.28)' },
};

const glass = { background: 'linear-gradient(180deg, rgba(255,255,255,.62) 0%, rgba(255,255,255,.4) 100%)', border: '2px solid rgba(255,255,255,.9)', borderRadius: 26,
  boxShadow: '0 18px 40px -26px rgba(23,73,170,.35)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)', boxSizing: 'border-box', minWidth: 0 };

function StatusBadge({ s }) {
  const v = STATUS[s];
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 26, padding: '0 10px', borderRadius: 999, background: v.bg, border: `1px solid ${v.bd}`, color: v.c, fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap' }}>
    <span style={{ width: 9, height: 9, borderRadius: '50%', border: `2px solid ${v.c}`, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ width: 3, height: 3, borderRadius: '50%', background: v.c }} /></span>{v.label}</span>;
}

function PillChip({ icon = 'calendar', children, onClick }) {
  return <button type="button" onClick={onClick} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 40, padding: '0 16px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,.95)', background: 'rgba(255,255,255,.55)', color: 'var(--text-strong)', fontFamily: 'inherit', fontSize: 15, fontWeight: 500, whiteSpace: 'nowrap', cursor: 'pointer', boxShadow: '0 4px 12px -8px rgba(23,73,170,.35)' }}>
    <SIcon name={icon} size={17} strokeWidth={1.7} />{children}</button>;
}

function CardTitle({ children, right, size = 22 }) {
  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}><h3 style={{ margin: 0, fontSize: size, fontWeight: 600, color: 'var(--text-strong)', letterSpacing: '-0.01em' }}>{children}</h3>{right}</div>;
}

function Legend({ items }) {
  return <span style={{ display: 'inline-flex', gap: 16 }}>{items.map(([l, c]) => <span key={l} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-muted)' }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: c }} />{l}</span>)}</span>;
}

function MonthGrid({ today = 2, bold = [6, 7], startOffset = 4, days = 31, compact }) {
  const cells = [...Array(startOffset).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', rowGap: compact ? 6 : 14, textAlign: 'center' }}>
      {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'].map((d) => <span key={d} style={{ fontSize: 13, color: 'var(--text-body)', paddingBottom: compact ? 4 : 10 }}>{d}</span>)}
      {cells.map((d, i) => d === null ? <span key={'e' + i} /> : (
        <span key={d} style={{ justifySelf: 'center', width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: d === today || bold.includes(d) || d > 7 ? 600 : 400,
          color: d === today ? '#1F5EFF' : d < 6 ? 'var(--text-muted)' : 'var(--text-strong)', background: d === today ? '#fff' : 'transparent', boxShadow: d === today ? '0 4px 12px -6px rgba(23,73,170,.4)' : 'none' }}>{d}</span>
      ))}
    </div>
  );
}

function useNarrow(px = 1180) {
  const [n, setN] = React.useState(() => window.matchMedia('(max-width: ' + px + 'px)').matches);
  React.useEffect(() => { const mq = window.matchMedia('(max-width: ' + px + 'px)'); const f = () => setN(mq.matches); mq.addEventListener('change', f); return () => mq.removeEventListener('change', f); }, [px]);
  return n;
}

Object.assign(window, { useNarrow, KIT_NAV, KIT_USER, PATIENTS, STATUS, glass, StatusBadge, PillChip, CardTitle, Legend, MonthGrid });

/* ===== Estado compartilhado ===== */
function makeStore(init) { return { v: init, subs: new Set() }; }
function useStore(st) {
  const [, force] = React.useState(0);
  React.useEffect(() => { const s = () => force((x) => x + 1); st.subs.add(s); return () => { st.subs.delete(s); }; }, [st]);
  return [st.v, (u) => { st.v = typeof u === 'function' ? u(st.v) : u; st.subs.forEach((s) => s()); }];
}
const lsGet = (k, d) => { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } };
const lsSet = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };

/* ===== Módulos do sistema (fonte única: menu, abas e permissões) ===== */
const GESTAO_AREAS = [['estoque', 'Estoque', 'package', 'Produtos, validade e consumo'], ['financeiro', 'Financeiro', 'wallet', 'Receitas, despesas e caixa']];
const CONFIG_TABS = [['cadastro', 'Cadastro', 'clipboard-pen'], ['canais', 'Canais', 'radio-tower'], ['flix', 'Saluteflix', 'clapperboard'], ['parcerias', 'Parcerias', 'handshake'], ['cert', 'Certificações', 'award'], ['conta', 'Minha conta', 'user']];
const SUBMODS = { gestao: GESTAO_AREAS, perfil: CONFIG_TABS };
const moduleTree = () => KIT_NAV.map((n) => ({ id: n.id, label: n.label, icon: n.icon, children: (SUBMODS[n.id] || []).map(([k, l]) => ({ id: n.id + '.' + k, label: l })) }));
const allModuleIds = () => moduleTree().flatMap((m) => [m.id, ...m.children.map((c) => c.id)]);
const withKids = (ids) => moduleTree().flatMap((m) => ids.includes(m.id) ? [m.id, ...m.children.map((c) => c.id)] : []);
const TEAM_STORE = makeStore([
  { id: 1, nome: 'Camila Rocha', funcao: 'Administradora', email: 'camila@bellaforma.com.br', acc: allModuleIds(), dono: true },
  { id: 2, nome: 'Ana Paula', funcao: 'Recepção', email: 'recepcao@bellaforma.com.br', acc: withKids(['pacientes', 'agenda', 'mensagens']) },
  { id: 3, nome: 'Darlene Robertson', funcao: 'Profissional', email: 'darlene@bellaforma.com.br', acc: withKids(['pacientes', 'agenda', 'mensagens']) },
  { id: 4, nome: 'Paula Mendes', funcao: 'Financeiro', email: 'financeiro@bellaforma.com.br', acc: ['painel', 'gestao', 'gestao.financeiro'] },
]);
const VIEW_AS = makeStore(null);
function useAccess() {
  const [team] = useStore(TEAM_STORE); const [va] = useStore(VIEW_AS);
  const m = va ? team.find((x) => x.id === va) : null;
  return { member: m, can: (id) => !m || m.dono || m.acc.includes(id) };
}

/* ===== Som de nova mensagem ===== */
const SOUND = makeStore(lsGet('salute-kit:sound', { on: true, tone: 'cristal', vol: 0.6 }));
let __actx = null;
const audioCtx = () => { try { if (!__actx) __actx = new (window.AudioContext || window.webkitAudioContext)(); if (__actx.state === 'suspended') __actx.resume(); } catch (e) {} return __actx; };
window.addEventListener('pointerdown', () => audioCtx(), { once: true });
const TONES = {
  cristal: { label: 'Cristal', notes: [[1046.5, 0, 0.35], [1568, 0.11, 0.5]], type: 'sine' },
  suave: { label: 'Suave', notes: [[659.3, 0, 0.45], [880, 0.16, 0.6]], type: 'triangle' },
  pop: { label: 'Pop', notes: [[523.3, 0, 0.12], [1046.5, 0.06, 0.18]], type: 'sine' },
};
function playMsgSound(tone, vol) {
  const st = SOUND.v; const ctx = audioCtx(); if (!ctx) return;
  const t = TONES[tone || st.tone] || TONES.cristal, v = vol !== undefined ? vol : st.vol, now = ctx.currentTime + 0.02;
  t.notes.forEach(([f, at, dur]) => {
    const o = ctx.createOscillator(), g = ctx.createGain(); o.type = t.type; o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, now + at); g.gain.exponentialRampToValueAtTime(Math.max(0.0002, 0.32 * v), now + at + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, now + at + dur);
    o.connect(g); g.connect(ctx.destination); o.start(now + at); o.stop(now + at + dur + 0.05);
  });
}
const INCOMING = makeStore(null);
function notifyIncoming(from, text) { if (SOUND.v.on) playMsgSound(); INCOMING.v = { id: Date.now(), from, text }; INCOMING.subs.forEach((s) => s()); }

/* ===== Idioma ===== */
const LANGS = [['pt', 'Português (Brasil)', 'PT'], ['en', 'English', 'EN'], ['es', 'Español', 'ES']];
const LANG = makeStore(lsGet('salute-kit:lang', 'pt'));
const DICT = {
  'Painel': ['Dashboard', 'Panel'], 'Pacientes': ['Patients', 'Pacientes'], 'Agenda': ['Schedule', 'Agenda'], 'Mensagens': ['Messages', 'Mensajes'], 'Gestão': ['Management', 'Gestión'], 'Configurações': ['Settings', 'Configuración'],
  'Bom dia, Dra. Camila': ['Good morning, Dr. Camila', 'Buenos días, Dra. Camila'], 'Seu progresso esta semana está ótimo.': ['Your progress this week is great.', 'Tu progreso esta semana es excelente.'], 'Buscar...': ['Search...', 'Buscar...'],
  'Total de pacientes': ['Total patients', 'Total de pacientes'], 'Agendamentos': ['Appointments', 'Citas'], 'IA economizou seu tempo': ['AI saved your time', 'La IA ahorró tu tiempo'], 'no último mês': ['last month', 'el último mes'],
  'Funil de vendas': ['Sales funnel', 'Embudo de ventas'], 'Leads por canal': ['Leads by channel', 'Leads por canal'], 'Atendimentos por dia': ['Appointments per day', 'Atenciones por día'], 'Atendimentos': ['Appointments', 'Atenciones'], 'Gênero': ['Gender', 'Género'],
  'Atividade mensal': ['Monthly activity', 'Actividad mensual'], 'Pacientes recentes': ['Recent patients', 'Pacientes recientes'], 'Mensal': ['Monthly', 'Mensual'], 'Últimos 14 dias': ['Last 14 days', 'Últimos 14 días'], 'vs mês anterior': ['vs last month', 'vs mes anterior'],
  'Novo': ['New', 'Nuevo'], 'Nova': ['New', 'Nueva'], 'Salvar': ['Save', 'Guardar'], 'Cancelar': ['Cancel', 'Cancelar'], 'Editar': ['Edit', 'Editar'], 'Enviar': ['Send', 'Enviar'], 'Fechar': ['Close', 'Cerrar'], 'Exportar': ['Export', 'Exportar'], 'Adicionar': ['Add', 'Agregar'], 'Remover': ['Remove', 'Quitar'], 'Pronto': ['Done', 'Listo'], 'Excluir': ['Delete', 'Eliminar'],
  'Salvar alterações': ['Save changes', 'Guardar cambios'], 'Alterações salvas': ['Changes saved', 'Cambios guardados'], 'Limpar tudo': ['Clear all', 'Limpiar todo'], 'Ver todos': ['See all', 'Ver todos'], 'Ver menos': ['See less', 'Ver menos'], 'Anterior': ['Previous', 'Anterior'], 'Próximo': ['Next', 'Siguiente'],
  'Lista de pacientes': ['Patient list', 'Lista de pacientes'], 'Novo paciente': ['New patient', 'Nuevo paciente'], 'Filtros': ['Filters', 'Filtros'], 'Nome': ['Name', 'Nombre'], 'Tipo': ['Type', 'Tipo'], 'Convênio': ['Insurance', 'Convenio'], 'Empresa': ['Company', 'Empresa'], 'Telefone': ['Phone', 'Teléfono'], 'Nascimento': ['Birth date', 'Nacimiento'], 'Sexo': ['Sex', 'Sexo'],
  'Particular': ['Private', 'Particular'], 'Empresarial': ['Corporate', 'Empresarial'], 'Sem convênio': ['No insurance', 'Sin convenio'], 'Não se aplica': ['Not applicable', 'No aplica'], 'Feminino': ['Female', 'Femenino'], 'Masculino': ['Male', 'Masculino'],
  'Conversa': ['Chat', 'Conversación'], 'Dados e Histórico': ['Details and history', 'Datos e historial'], 'Dados': ['Details', 'Datos'], 'Prontuário': ['Medical record', 'Historia clínica'], 'Histórico': ['History', 'Historial'], 'Dados do paciente': ['Patient details', 'Datos del paciente'], 'Trocar número': ['Change number', 'Cambiar número'],
  'Enviar anamnese': ['Send intake form', 'Enviar anamnesis'], 'Mapeamento e marcação': ['Mapping and marking', 'Mapeo y marcación'], 'Registrar procedimento': ['Log procedure', 'Registrar procedimiento'], 'Documentos': ['Documents', 'Documentos'], 'Registros': ['Records', 'Registros'], 'Voltar ao prontuário': ['Back to record', 'Volver a la historia'],
  'Pontos': ['Points', 'Puntos'], 'Pincel': ['Brush', 'Pincel'], 'Linha': ['Line', 'Línea'], 'Borracha': ['Eraser', 'Borrador'], 'Mover': ['Move', 'Mover'], 'Imagem': ['Image', 'Imagen'], 'Totalizador': ['Totals', 'Totalizador'], 'Upload': ['Upload', 'Subir'], 'Antes e depois': ['Before and after', 'Antes y después'], 'Nova pasta': ['New folder', 'Nueva carpeta'], 'Todos': ['All', 'Todos'],
  'Caixa de entrada': ['Inbox', 'Bandeja de entrada'], 'Equipe': ['Team', 'Equipo'], 'Online': ['Online', 'En línea'], 'Você': ['You', 'Tú'], 'Hoje': ['Today', 'Hoy'], 'Ontem': ['Yesterday', 'Ayer'],
  'Profissionais': ['Professionals', 'Profesionales'], 'Ver todos os profissionais': ['See all professionals', 'Ver todos'], 'Ver só um': ['See only one', 'Ver solo uno'], 'Fechado': ['Closed', 'Cerrado'], 'Livre': ['Free', 'Libre'], 'HOJE': ['TODAY', 'HOY'],
  'Estoque': ['Inventory', 'Inventario'], 'Financeiro': ['Finance', 'Finanzas'], 'Produtos': ['Products', 'Productos'], 'Relatórios': ['Reports', 'Informes'], 'Categorias e unidades': ['Categories and units', 'Categorías y unidades'], 'Cadastrar insumo': ['Add supply', 'Registrar insumo'],
  'Produto': ['Product', 'Producto'], 'Categoria': ['Category', 'Categoría'], 'Unidade': ['Unit', 'Unidad'], 'Quantidade': ['Quantity', 'Cantidad'], 'Mínimo': ['Minimum', 'Mínimo'], 'Validade': ['Expiry', 'Vencimiento'], 'Valor médio': ['Average cost', 'Costo promedio'], 'Status': ['Status', 'Estado'],
  'Em estoque': ['In stock', 'En stock'], 'Abaixo do mínimo': ['Below minimum', 'Bajo el mínimo'], 'Vence em breve': ['Expiring soon', 'Vence pronto'], 'Vencido': ['Expired', 'Vencido'], 'Precisa de atenção': ['Needs attention', 'Requiere atención'], 'Consumo por categoria': ['Usage by category', 'Consumo por categoría'], 'Mais consumidos no período': ['Most used in period', 'Más consumidos en el período'],
  'Total de produtos': ['Total products', 'Total de productos'], 'Valor em estoque': ['Inventory value', 'Valor en inventario'], 'Produtos vencidos': ['Expired products', 'Productos vencidos'], 'Consumo no período': ['Usage in period', 'Consumo en el período'],
  'Visão geral': ['Overview', 'Resumen'], 'Receitas': ['Income', 'Ingresos'], 'Despesas': ['Expenses', 'Gastos'], 'Nota fiscal': ['Invoices', 'Factura'], 'Salute Pay': ['Salute Pay', 'Salute Pay'], 'Categorias': ['Categories', 'Categorías'],
  'Faturamento do período': ['Revenue in period', 'Facturación del período'], 'Total recebido': ['Total received', 'Total recibido'], 'A receber': ['Receivable', 'Por cobrar'], 'Total despesas': ['Total expenses', 'Total de gastos'], 'Lucro líquido': ['Net profit', 'Ganancia neta'], 'Ticket médio': ['Average ticket', 'Ticket promedio'],
  'Fluxo de caixa': ['Cash flow', 'Flujo de caja'], 'Faturou': ['Revenue', 'Facturó'], 'Custos': ['Costs', 'Costos'], 'Lucro': ['Profit', 'Ganancia'], 'Faturamento por atendimento': ['Revenue by appointment type', 'Facturación por atención'], 'Faturamento por profissional': ['Revenue by professional', 'Facturación por profesional'], 'Faturamento por procedimento': ['Revenue by procedure', 'Facturación por procedimiento'],
  'Nova receita': ['New income', 'Nuevo ingreso'], 'Nova despesa': ['New expense', 'Nuevo gasto'], 'Recebido': ['Received', 'Recibido'], 'Pago': ['Paid', 'Pagado'], 'Pendente': ['Pending', 'Pendiente'], 'Extrato': ['Statement', 'Extracto'], 'Exportar extrato': ['Export statement', 'Exportar extracto'], 'Saldo atual': ['Current balance', 'Saldo actual'],
  'Notas do período': ['Invoices in period', 'Facturas del período'], 'Configuração fiscal': ['Tax settings', 'Configuración fiscal'], 'Emissão de nota fiscal': ['Invoice issuing', 'Emisión de facturas'], 'Ver prévia': ['Preview', 'Vista previa'],
  'Cadastro': ['Registration', 'Registro'], 'Canais': ['Channels', 'Canales'], 'Parcerias': ['Partners', 'Alianzas'], 'Certificações': ['Certifications', 'Certificaciones'], 'Minha conta': ['My account', 'Mi cuenta'], 'Saluteflix': ['Saluteflix', 'Saluteflix'], 'Salute Cast': ['Salute Cast', 'Salute Cast'], 'Cursos e serviços': ['Courses and services', 'Cursos y servicios'],
  'Clínica': ['Clinic', 'Clínica'], 'Modelos de anamnese': ['Intake form templates', 'Plantillas de anamnesis'], 'Equipe e acessos': ['Team and access', 'Equipo y accesos'], 'Dados da clínica': ['Clinic details', 'Datos de la clínica'], 'Localização': ['Location', 'Ubicación'], 'Estrutura da clínica': ['Clinic amenities', 'Estructura de la clínica'], 'Horários de funcionamento': ['Opening hours', 'Horario de atención'], 'Política de pagamentos': ['Payment policy', 'Política de pagos'],
  'Conta': ['Account', 'Cuenta'], 'Segurança': ['Security', 'Seguridad'], 'Plano e cobrança': ['Plan and billing', 'Plan y facturación'], 'Notificações': ['Notifications', 'Notificaciones'], 'Idioma': ['Language', 'Idioma'], 'Configurações gerais': ['General settings', 'Configuración general'], 'Excluir conta': ['Delete account', 'Eliminar cuenta'],
  'Trocar senha': ['Change password', 'Cambiar contraseña'], 'Senha atual': ['Current password', 'Contraseña actual'], 'Nova senha': ['New password', 'Nueva contraseña'], 'Confirmar nova senha': ['Confirm new password', 'Confirmar nueva contraseña'], 'Salvar nova senha': ['Save new password', 'Guardar nueva contraseña'],
  'Plano atual': ['Current plan', 'Plan actual'], 'Mudar para este plano': ['Switch to this plan', 'Cambiar a este plan'], 'Falar com consultor': ['Talk to a consultant', 'Hablar con un asesor'], 'Sob consulta': ['Contact us', 'A consultar'], '/mês': ['/month', '/mes'],
  'Som de nova mensagem': ['New message sound', 'Sonido de nuevo mensaje'], 'Testar som': ['Test sound', 'Probar sonido'], 'Conectado': ['Connected', 'Conectado'], 'Desconectar': ['Disconnect', 'Desconectar'], 'Em breve': ['Coming soon', 'Próximamente'],
  'Visualizando como': ['Viewing as', 'Viendo como'], 'Sair da visualização': ['Exit preview', 'Salir de la vista'], 'Convidar membro': ['Invite member', 'Invitar miembro'], 'Ver como': ['View as', 'Ver como'],
};
const __orig = new WeakMap(), __mine = new WeakMap();
function trText(s, li) { const k = s.trim(); if (!k) return s; const d = DICT[k]; return d && d[li] ? s.replace(k, d[li]) : s; }
function applyLang(root) {
  const lang = LANG.v, li = lang === 'en' ? 0 : lang === 'es' ? 1 : -1;
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: (n) => n.parentNode && /^(SCRIPT|STYLE|TEXTAREA)$/.test(n.parentNode.nodeName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
  let n; const nodes = []; while ((n = w.nextNode())) nodes.push(n);
  if (root.nodeType === 3) nodes.push(root);
  nodes.forEach((t) => {
    const cur = t.nodeValue; let o = __orig.get(t);
    if (o === undefined || __mine.get(t) !== cur) { o = cur; __orig.set(t, o); }
    const nv = li < 0 ? o : trText(o, li);
    if (nv !== cur) { t.nodeValue = nv; }
    __mine.set(t, nv);
  });
  if (root.querySelectorAll) root.querySelectorAll('[placeholder]').forEach((el) => {
    const cur = el.getAttribute('placeholder'); let o = el.__phO;
    if (o === undefined || el.__phM !== cur) { o = cur; el.__phO = o; }
    const nv = li < 0 ? o : trText(o, li); if (nv !== cur) el.setAttribute('placeholder', nv); el.__phM = nv;
  });
}
let __obs = null;
function startLangObserver() {
  if (__obs) return;
  __obs = new MutationObserver((ms) => {
    if (LANG.v === 'pt' && !__obs.__dirty) return;
    __obs.disconnect();
    try { ms.forEach((m) => { if (m.type === 'characterData') applyLang(m.target); else if (m.type === 'attributes') applyLang(m.target); else m.addedNodes.forEach((x) => { if (x.nodeType === 1 || x.nodeType === 3) applyLang(x); }); }); } finally { __obs.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['placeholder'] }); }
  });
  __obs.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['placeholder'] });
}
function setLang(l) {
  LANG.v = l; lsSet('salute-kit:lang', l); document.documentElement.lang = l === 'pt' ? 'pt-BR' : l;
  if (__obs) { __obs.__dirty = true; __obs.disconnect(); }
  applyLang(document.body);
  if (__obs) { __obs.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['placeholder'] }); __obs.__dirty = l !== 'pt'; }
  LANG.subs.forEach((s) => s());
}

Object.assign(window, { makeStore, useStore, lsGet, lsSet, GESTAO_AREAS, CONFIG_TABS, moduleTree, allModuleIds, withKids, TEAM_STORE, VIEW_AS, useAccess, SOUND, TONES, playMsgSound, INCOMING, notifyIncoming, LANGS, LANG, setLang, applyLang, startLangObserver });
