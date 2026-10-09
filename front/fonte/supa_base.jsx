/* =====================================================================
   SUPABASE: conexão única do sistema (Salute 02)
   A URL e a chave pública (anon) vêm do arquivo config.js, gerado a partir
   das variáveis de ambiente SUPABASE_URL e SUPABASE_ANON_KEY.
   Sem configuração, o sistema roda em modo demonstração e avisa na tela.
   A chave service role nunca entra no front: se alguém colar uma, o sistema recusa.
   ===================================================================== */
const SB_CFG = (() => {
  const c = window.SALUTE_CONFIG || {};
  return { url: String(c.SUPABASE_URL || c.supabaseUrl || '').trim().replace(/\/+$/, '').replace(/\/rest\/v1$/, ''), key: String(c.SUPABASE_ANON_KEY || c.supabaseAnonKey || '').trim() };
})();
const SB_KEY_ERRADA = (() => {
  const k = SB_CFG.key;
  if (!k) return false;
  if (/^sb_secret_/i.test(k)) return true;
  try { const p = JSON.parse(atob(k.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))); return p.role === 'service_role'; } catch (e) { return false; }
})();
/* ---------- Rota alternativa para o banco ----------
   Alguns provedores, antivírus e filtros de rede bloqueiam o endereço *.supabase.co.
   Quando isso acontece, o sistema passa a falar com o banco pelo próprio domínio do site
   (SUPABASE_PROXY no config.js, ex.: "/sb"), que repassa cada chamada ao Supabase.
   Só troca de rota depois de confirmar que o endereço direto não responde e que a rota do
   site responde. Sem SUPABASE_PROXY no config.js, nada muda. Downloads de arquivos (fotos e
   documentos) e o tempo real continuam sempre no endereço direto. */
const SB_PROXY = (() => {
  const p = String((window.SALUTE_CONFIG || {}).SUPABASE_PROXY || '').trim().replace(/\/+$/, '');
  if (!p) return '';
  return /^https?:\/\//i.test(p) ? p : location.origin + (p.charAt(0) === '/' ? p : '/' + p);
})();
let SB_VIA = 'direto';
let SB_TESTE = null;
const sbResponde = (base) => new Promise((ok) => {
  const t = setTimeout(() => ok(false), 6000);
  fetch(base + '/auth/v1/health', { headers: { apikey: SB_CFG.key }, cache: 'no-store' })
    .then((r) => { clearTimeout(t); ok(r.ok); }, () => { clearTimeout(t); ok(false); });
});
function sbTestaRota() {
  if (!SB_TESTE) {
    SB_TESTE = sbResponde(SB_CFG.url)
      .then((direto) => (direto ? false : sbResponde(SB_PROXY)))
      .then((usarSite) => {
        SB_TESTE = null;
        if (usarSite) { SB_VIA = 'site'; console.warn('[supabase] o endereço direto do banco está bloqueado nesta rede; usando a rota do próprio site'); }
        return usarSite;
      });
  }
  return SB_TESTE;
}
async function sbFetch(input, init) {
  const u = typeof input === 'string' ? input : input instanceof URL ? input.href : String((input && input.url) || '');
  const metodo = String((init && init.method) || (input && input.method) || 'GET').toUpperCase();
  const doBanco = !!(SB_PROXY && SB_CFG.url && u.indexOf(SB_CFG.url + '/') === 0);
  // download de arquivo nunca passa pela rota do site: assim não fica em nenhum cache intermediário
  const arquivo = (metodo === 'GET' || metodo === 'HEAD') && u.indexOf('/storage/v1/object/') > 0;
  const peloSite = () => {
    const nu = SB_PROXY + u.slice(SB_CFG.url.length);
    return fetch(typeof input === 'string' || input instanceof URL ? nu : new Request(nu, input), init);
  };
  if (!doBanco || arquivo) return fetch(input, init);
  if (SB_VIA === 'site') return peloSite();
  try {
    return await fetch(input, init);
  } catch (e) {
    if (e && e.name === 'AbortError') throw e;
    // a chamada nem chegou ao banco: confere se o endereço direto está bloqueado e se a rota do site responde
    if (await sbTestaRota()) return peloSite();
    throw e;
  }
}
const SB = (() => {
  try {
    if (!SB_CFG.url || !SB_CFG.key || SB_KEY_ERRADA || !window.supabase || !window.supabase.createClient) return null;
    return window.supabase.createClient(SB_CFG.url, SB_CFG.key, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }, global: { fetch: sbFetch } });
  } catch (e) { console.error('[supabase]', e); return null; }
})();
const SB_ON = !!SB;
const SB_MOTIVO = SB_ON ? null : SB_KEY_ERRADA ? 'A chave configurada é a service role. Use a chave pública (anon).' : !SB_CFG.url || !SB_CFG.key ? 'As variáveis SUPABASE_URL e SUPABASE_ANON_KEY não foram preenchidas.' : 'A biblioteca do Supabase não carregou.';

/* ---------- Sessão: quem está logado e em qual clínica ---------- */
const SESSAO = makeStore({ estado: SB_ON ? 'carregando' : 'demo', perfil: null, clinicas: [], clinica: null, modulos: null, erro: null, recuperar: false, admin: false, suporte: null });
const CLI = () => (SESSAO.v.clinica ? SESSAO.v.clinica.id : null);
const UID = () => (SESSAO.v.perfil ? SESSAO.v.perfil.id : null);
const setSessao = (p) => { SESSAO.v = { ...SESSAO.v, ...p }; SESSAO.subs.forEach((f) => f()); };

/* ---------- Endereços do sistema: tudo dentro da pasta de publicação (ex.: /novoapp) ----------
   O config.js diz onde o sistema está publicado (BASE_PATH). Com BASE_PATH, cada tela tem endereço próprio
   (/novoapp/painel, /novoapp/crm...) e o voltar do navegador funciona. Sem BASE_PATH (demonstração),
   o sistema continua sem mudar o endereço. Todo endereço do sistema passa por aqui. */
const BASE_PATH = (() => { const c = window.SALUTE_CONFIG || {}; if (typeof c.BASE_PATH !== 'string') return null; const b = c.BASE_PATH.trim().replace(/^\/+|\/+$/g, ''); return b ? '/' + b : ''; })();
const ROTAS_URL = BASE_PATH !== null;
const ROTA_TELA = {
  painel: { tela: 'painel' }, pacientes: { tela: 'pacientes' }, agenda: { tela: 'agenda' },
  mensagens: { tela: 'mensagens', prefs: { 'mensagens.crm': false } }, crm: { tela: 'mensagens', prefs: { 'mensagens.crm': true } },
  gestao: { tela: 'gestao' }, estoque: { tela: 'gestao', prefs: { 'gestao.area': 'estoque' } }, financeiro: { tela: 'gestao', prefs: { 'gestao.area': 'financeiro' } },
  configuracoes: { tela: 'perfil' }, perfil: { tela: 'perfil', prefs: { 'config.aba': 'conta' } },
};
// endereço completo de uma tela do sistema (usado nos emails de login, senha nova e convite)
const urlApp = (caminho) => location.origin + (BASE_PATH || '') + '/' + String(caminho || '').replace(/^\/+/, '');
// para onde o link do email volta: no modo com endereços, sempre a tela de entrar do sistema
const voltaAuth = () => (ROTAS_URL ? urlApp('login') : location.href.split('#')[0]);
function caminhoAtual() {
  let p = location.pathname;
  if (BASE_PATH && (p === BASE_PATH || p.startsWith(BASE_PATH + '/'))) p = p.slice(BASE_PATH.length);
  return p.replace(/^\/+|\/+$/g, '').split('/')[0] || '';
}
const filtrosPref = () => (PREF.v && PREF.v.filtros) || {};
function caminhoDaTela(tela) {
  const f = filtrosPref();
  if (tela === 'mensagens') return f['mensagens.crm'] ? 'crm' : 'mensagens';
  if (tela === 'gestao') return f['gestao.area'] === 'financeiro' ? 'financeiro' : 'estoque';
  if (tela === 'perfil') return f['config.aba'] === 'conta' ? 'perfil' : 'configuracoes';
  return tela;
}
function aplicarPrefsRota(prefs) {
  if (!prefs || !SB_ON || !PREF.v) return;
  const f = filtrosPref(); if (Object.keys(prefs).every((k) => f[k] === prefs[k])) return;
  salvarPref({ filtros: { ...f, ...prefs } });
}
// troca o endereço sem recarregar; mantém o #renata-voz da janela de voz
function trocarUrl(caminho, novo) {
  if (!ROTAS_URL) return;
  const alvo = (BASE_PATH || '') + '/' + caminho, q = caminho === 'login' || caminho === 'cadastro' ? location.search.replace(/[?&](a|u)=[^&]*/g, '') : '';
  const h = /renata-voz|access_token|error_description/.test(location.hash) ? location.hash : '';
  if (location.pathname + location.search === alvo + q) return;
  try { history[novo ? 'pushState' : 'replaceState']({ salute: caminho }, '', alvo + q + h); } catch (e) {}
}
// tela inicial pelo endereço: /novoapp/crm abre o CRM; depois do login volta para a tela pedida
function rotaInicialUrl() {
  if (!ROTAS_URL) return null;
  let c = caminhoAtual();
  if (c === 'login' || c === 'cadastro' || c === 'master' || !c) { const v = new URLSearchParams(location.search).get('volta'); c = v || ''; }
  const d = ROTA_TELA[c]; if (!d) return null;
  aplicarPrefsRota(d.prefs);
  return d.tela;
}
// dentro do sistema: o endereço acompanha a tela e o voltar do navegador troca de tela
function SincronizaUrl({ route, ir }) {
  useStore(PREF);
  const irRef = React.useRef(ir); irRef.current = ir;
  const primeira = React.useRef(true);
  const alvo = ROTAS_URL ? caminhoDaTela(route) : null;
  React.useEffect(() => {
    if (!ROTAS_URL) return;
    const atual = caminhoAtual();
    trocarUrl(alvo, !primeira.current && !!ROTA_TELA[atual] && atual !== alvo);
    primeira.current = false;
  }, [alvo]);
  React.useEffect(() => {
    if (!ROTAS_URL) return undefined;
    const voltar = () => { const d = ROTA_TELA[caminhoAtual()]; if (!d) return; aplicarPrefsRota(d.prefs); irRef.current(d.tela); };
    window.addEventListener('popstate', voltar);
    return () => window.removeEventListener('popstate', voltar);
  }, []);
  return null;
}

/* ---------- Retorno visual de gravação (carregando, sucesso, erro) ---------- */
const SALVA = makeStore({ pend: 0, erro: null, ok: null });
const salvaSet = (p) => { SALVA.v = { ...SALVA.v, ...p }; SALVA.subs.forEach((f) => f()); };
const MSG_ERRO = (e) => {
  const m = String((e && (e.message || e.error_description || e.msg)) || e || '');
  if (/row-level security|permission denied|violates row/i.test(m)) return 'Seu usuário não tem permissão para esta ação.';
  if (/duplicate key|unique/i.test(m)) return 'Já existe um registro igual.';
  if (/Failed to fetch|NetworkError|network/i.test(m)) return 'Sem conexão com o banco. Confira a internet e tente de novo.';
  if (/JWT|token/i.test(m)) return 'Sua sessão expirou. Entre de novo.';
  if (/Estoque insuficiente/i.test(m)) return m;
  return m || 'Erro desconhecido.';
};
function avisoErro(titulo, e) { console.error('[supabase]', titulo, e); salvaSet({ erro: { id: Date.now(), titulo, desc: MSG_ERRO(e) } }); }
function avisoOk(titulo, desc) { salvaSet({ ok: { id: Date.now(), titulo, desc } }); }

/* ---------- Acesso aos dados, sempre filtrado pela clínica ativa ---------- */
const agoraIso = () => new Date().toISOString();
const DB = {
  sel(t, cols) { return SB.from(t).select(cols || '*').eq('clinica_id', CLI()).is('excluido_em', null); },
  async ler(q, titulo) { const { data, error } = await q; if (error) { avisoErro(titulo || 'Não foi possível carregar os dados', error); throw error; } return data; },
  // o Supabase devolve no máximo 1000 linhas por vez: busca em páginas até acabar
  async tudo(montar, titulo) { const out = []; for (let i = 0; ; i += 1000) { const d = await DB.ler(montar().range(i, i + 999), titulo); out.push(...d); if (d.length < 1000) return out; } },
  async gravar(q, titulo) {
    salvaSet({ pend: SALVA.v.pend + 1 });
    try { const { data, error } = await q; if (error) { avisoErro(titulo || 'Não foi possível salvar', error); throw error; } return data; }
    finally { salvaSet({ pend: Math.max(0, SALVA.v.pend - 1) }); }
  },
  ins(t, row, titulo) { const rows = Array.isArray(row) ? row.map((r) => ({ clinica_id: CLI(), ...r })) : { clinica_id: CLI(), ...row }; const q = SB.from(t).insert(rows).select(); return DB.gravar(Array.isArray(row) ? q : q.single(), titulo); },
  upd(t, id, patch, titulo) { return DB.gravar(SB.from(t).update(patch).eq('id', id).eq('clinica_id', CLI()).select().single(), titulo); },
  updWhere(t, patch, filtro, titulo) { let q = SB.from(t).update(patch).eq('clinica_id', CLI()); Object.entries(filtro).forEach(([k, v]) => { q = v === null ? q.is(k, null) : q.eq(k, v); }); return DB.gravar(q.select(), titulo); },
  del(t, id, titulo) { return DB.upd(t, id, { excluido_em: agoraIso() }, titulo || 'Não foi possível excluir'); },
  rpc(fn, args, titulo) { return DB.gravar(SB.rpc(fn, args || {}), titulo); },
};
// grava em segundo plano: a tela já mudou; se o banco recusar, avisa e roda o desfazer
function bg(promise, desfazer) { promise.catch(() => { if (desfazer) try { desfazer(); } catch (e) {} }); return promise; }

/* ---------- Arquivos: pastas privadas e link assinado ---------- */
const ARQ_CACHE = {};
const nomeSeguro = (n) => String(n || 'arquivo').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^\w.]+/g, '_').slice(-80);
const ARQ = {
  async enviar(bucket, pasta, file, nome) {
    const path = CLI() + '/' + pasta + '/' + Date.now().toString(36) + '_' + nomeSeguro(nome || file.name);
    salvaSet({ pend: SALVA.v.pend + 1 });
    try {
      const { error } = await SB.storage.from(bucket).upload(path, file, { contentType: file.type || 'application/octet-stream', upsert: false });
      if (error) { avisoErro('Não foi possível enviar o arquivo', error); throw error; }
      return path;
    } finally { salvaSet({ pend: Math.max(0, SALVA.v.pend - 1) }); }
  },
  async enviarDataUrl(bucket, pasta, dataUrl, nome) {
    const b = await (await fetch(dataUrl)).blob();
    return ARQ.enviar(bucket, pasta, new File([b], nome || 'imagem.png', { type: b.type }), nome);
  },
  async url(bucket, path) {
    if (!path) return null;
    if (/^(data:|blob:|https?:)/.test(path)) return path;
    const k = bucket + ':' + path, c = ARQ_CACHE[k];
    if (c && c.ate > Date.now()) return c.url;
    const { data, error } = await SB.storage.from(bucket).createSignedUrl(path, 3600);
    if (error) return null;
    ARQ_CACHE[k] = { url: data.signedUrl, ate: Date.now() + 50 * 60000 };
    return data.signedUrl;
  },
};
// hook para mostrar arquivo privado (troca o caminho pelo link assinado)
function useArqUrl(bucket, path) {
  const [u, setU] = React.useState(() => (path && /^(data:|blob:|https?:)/.test(path) ? path : null));
  React.useEffect(() => { let vivo = true; if (!path || !SB_ON) { setU(path || null); return; } ARQ.url(bucket, path).then((x) => vivo && setU(x)); return () => { vivo = false; }; }, [bucket, path]);
  return u;
}

/* ---------- Tempo real ---------- */
const RT_CANAIS = {};
function tempoReal(nome, tabelas, aoMudar) {
  if (!SB_ON || !CLI()) return () => {};
  const id = nome + ':' + CLI();
  if (RT_CANAIS[id]) SB.removeChannel(RT_CANAIS[id]);
  let ch = SB.channel(id);
  tabelas.forEach((t) => { ch = ch.on('postgres_changes', { event: '*', schema: 'public', table: t, filter: 'clinica_id=eq.' + CLI() }, (p) => aoMudar(t, p)); });
  RT_CANAIS[id] = ch.subscribe();
  return () => { if (RT_CANAIS[id]) { SB.removeChannel(RT_CANAIS[id]); delete RT_CANAIS[id]; } };
}

/* ---------- Carga de cada módulo (uma vez por clínica; recarrega quando pedido) ---------- */
const CARGAS = {};           // nome -> função async que preenche os stores
const CARGA = makeStore({}); // nome -> 'carregando' | 'ok' | 'erro'
const cargaSet = (k, v) => { CARGA.v = { ...CARGA.v, [k]: v }; CARGA.subs.forEach((f) => f()); };
const CARGA_PROM = {};
function carregar(nome, forcar) {
  if (!SB_ON || SESSAO.v.estado !== 'pronto' || !CARGAS[nome]) return Promise.resolve();
  if (CARGA_PROM[nome] && !forcar) return CARGA_PROM[nome];
  cargaSet(nome, 'carregando');
  CARGA_PROM[nome] = CARGAS[nome]().then(() => cargaSet(nome, 'ok'), (e) => { cargaSet(nome, 'erro'); delete CARGA_PROM[nome]; console.error('[carga]', nome, e); });
  return CARGA_PROM[nome];
}
// usado pelas telas: dispara a carga e devolve o estado
function useCarga(...nomes) {
  const [c] = useStore(CARGA); useStore(SESSAO);
  React.useEffect(() => { nomes.forEach((n) => carregar(n)); }, [SESSAO.v.estado, CLI()]);
  if (!SB_ON) return 'ok';
  const st = nomes.map((n) => c[n] || 'carregando');
  return st.includes('erro') ? 'erro' : st.includes('carregando') ? 'carregando' : 'ok';
}
// estado de carga e erro com os componentes que já existem
function CargaEstado({ estado, onRetry, children, compact }) {
  const { EmptyState: CEmpty, Button: CBtn } = window.SaluteProjetoDesigner_8b4683;
  if (estado === 'carregando') return <div style={{ ...glass, padding: compact ? 18 : 28, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, color: 'var(--text-muted)', fontSize: 14 }}><SIcon name="loader-circle" size={18} style={{ animation: 'sbgira 1s linear infinite' }} />Carregando dados da clínica...<style>{'@keyframes sbgira{to{transform:rotate(360deg)}}'}</style></div>;
  if (estado === 'erro') return <CEmpty icon="cloud-off" title="Não foi possível carregar" description="Confira a conexão e tente de novo." action={<CBtn iconLeft="refresh-cw" onClick={onRetry}>Tentar de novo</CBtn>} />;
  return children || null;
}

/* ---------- Conversões entre a tela e o banco ---------- */
const __FMT_BR = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
const BR = {
  // telefone de tela (19) 99812-4471 <-> banco +5519998124471
  tel(s) { const d = String(s || '').replace(/\D/g, ''); if (!d) return null; if (d.length >= 12 && d.startsWith('55')) return '+' + d; if (d.length >= 10) return '+55' + d; return null; },
  telTela(s) { const d = String(s || '').replace(/\D/g, '').replace(/^55(?=\d{10,11}$)/, ''); if (d.length === 11) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7); if (d.length === 10) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6); return s || ''; },
  // data dd/mm/aaaa <-> aaaa-mm-dd
  data(s) { const m = String(s || '').match(/^(\d{2})\/(\d{2})\/(\d{4})$/); return m ? m[3] + '-' + m[2] + '-' + m[1] : /^\d{4}-\d{2}-\d{2}/.test(String(s || '')) ? String(s).slice(0, 10) : null; },
  dataTela(s) { return s ? String(s).slice(8, 10) + '/' + String(s).slice(5, 7) + '/' + String(s).slice(0, 4) : ''; },
  // dia (aaaa-mm-dd) de um Date que carrega uma data do calendário (meia-noite local, como TODAY e os dias da agenda)
  isoDia(d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); },
  /* ---- Horário de Brasília: datas e horas sempre seguem Brasília, em qualquer aparelho ---- */
  // partes de um instante (agora, se vazio) no horário de Brasília
  partes(ts) {
    const d = ts == null ? new Date() : ts instanceof Date ? ts : new Date(ts), o = {};
    __FMT_BR.formatToParts(d).forEach((x) => { o[x.type] = x.value; });
    const ano = +o.year, mes = +o.month, dia = +o.day, h = +o.hour % 24, m = +o.minute;
    return { ano, mes, dia, h, m, iso: o.year + '-' + o.month + '-' + o.day, hm: String(h).padStart(2, '0') + ':' + o.minute, dow: new Date(Date.UTC(ano, mes - 1, dia)).getUTCDay() };
  },
  hoje() { return BR.partes().iso; },                         // aaaa-mm-dd de hoje em Brasília
  dia(ts) { const p = BR.partes(ts); return new Date(p.ano, p.mes - 1, p.dia); }, // data do calendário (meia-noite local) do dia em Brasília
  diaDe(ts) { return BR.partes(ts).iso; },                    // aaaa-mm-dd de um instante, em Brasília
  hm(ts) { return BR.partes(ts).hm; },                        // hh:mm de um instante, em Brasília
  agoraHM() { return BR.partes().hm; },
  horaDec(ts) { const p = BR.partes(ts); return p.h + p.m / 60; },
  // instante de uma data e hora digitadas, lidas como horário de Brasília (sem horário de verão desde 2019)
  instante(iso, hm) { return new Date(String(iso).slice(0, 10) + 'T' + String(hm || '00:00').slice(0, 5) + ':00-03:00'); },
  num(v) { if (v === null || v === undefined || v === '') return null; const n = Number(String(v).replace(/\./g, '').replace(',', '.')); return isNaN(n) ? null : n; },
};
// listas fixas: rótulo da tela <-> chave do banco
const ENUM = {
  tipo_paciente: { Particular: 'particular', 'Convênio': 'convenio', Empresarial: 'empresarial' },
  sexo: { Feminino: 'feminino', Masculino: 'masculino', 'Prefiro não informar': 'nao_informado', 'Não informado': 'nao_informado' },
  status_lancamento: { Recebido: 'pago', Pago: 'pago', Pendente: 'pendente', Cancelado: 'cancelado' },
  papel: { Administradora: 'gestor', 'Recepção': 'recepcao', Profissional: 'profissional', Financeiro: 'financeiro' },
  area: { 'Estética': 'estetica', Odontologia: 'odontologia', Geral: 'geral' },
  resposta: { Texto: 'texto', 'Sim ou não': 'sim_nao', 'Múltipla escolha': 'multipla_escolha' },
};
const ek = (lista, rotulo) => (ENUM[lista] || {})[rotulo] || null;
const el = (lista, chave, padrao) => { const e = Object.entries(ENUM[lista] || {}).find(([, v]) => v === chave); return e ? e[0] : padrao !== undefined ? padrao : chave; };
// id do registro no banco guardado junto do objeto da tela
const DBID = (o) => (o && (o.dbId || (typeof o.id === 'string' && /^[0-9a-f-]{36}$/.test(o.id) ? o.id : null))) || null;

/* ---------- Catálogos da clínica (usados em várias telas) ---------- */
const CAT = makeStore({ profissionais: [], procedimentos: [], categorias: [], formas: [], convenios: [], fornecedores: [], catProd: [], unidades: [], status: [], tipos: [], etapas: [], motivos: [], origens: [], funil: null, pastas: [], instancia: null, planos: [], assinatura: null, consumo: null, renata: null, voz: null, nf: null, contaBancaria: null, config: null, horarios: [] });
const catSet = (p) => { CAT.v = { ...CAT.v, ...p }; CAT.subs.forEach((f) => f()); };
const porNome = (lista, nome) => (lista || []).find((x) => (x.nome || '').toLowerCase() === String(nome || '').toLowerCase());
CARGAS.catalogos = async () => {
  const [profs, procs, cats, formas, convs, forns, catProd, unis, status, tipos, etapas, motivos, origens, funis, pastas, inst, planos, ass, consumo, renata, voz, nf, contas, cfg, hor] = await Promise.all([
    DB.ler(DB.sel('profissionais', 'id,nome,especialidade,registro_conselho,cor_agenda,foto_path,usuario_id,ordem,profissionais_procedimentos(procedimento_id,excluido_em)').order('ordem')),
    DB.ler(DB.sel('procedimentos', 'id,nome,valor,duracao_padrao_minutos,categoria_financeira_id,area,sinonimos,ativo').order('nome')),
    DB.ler(DB.sel('categorias_financeiras').order('ordem')),
    DB.ler(DB.sel('formas_pagamento').order('ordem')),
    DB.ler(DB.sel('convenios').order('nome')),
    DB.ler(DB.sel('fornecedores').order('nome')),
    DB.ler(DB.sel('categorias_produto').order('ordem')),
    DB.ler(DB.sel('unidades_medida').order('nome')),
    DB.ler(DB.sel('status_agendamento').order('ordem')),
    DB.ler(DB.sel('tipos_agendamento').order('ordem')),
    DB.ler(DB.sel('etapas_funil').order('ordem')),
    DB.ler(DB.sel('motivos_perda').order('ordem')),
    DB.ler(DB.sel('origens_lead').order('nome')),
    DB.ler(DB.sel('funis').order('criado_em')),
    DB.ler(SB.from('pastas_documentos').select('*').eq('clinica_id', CLI()).is('paciente_id', null).is('excluido_em', null).order('ordem')),
    DB.ler(DB.sel('instancias_whatsapp').order('criado_em')),
    DB.ler(SB.from('planos').select('*').is('excluido_em', null).order('ordem')),
    DB.ler(DB.sel('assinaturas_clinica', '*, plano:planos(codigo,nome,limite_mensagens_ia,percentual_aviso_limite)')),
    DB.ler(DB.sel('renata_consumo').order('ano', { ascending: false }).order('mes', { ascending: false }).limit(1)),
    DB.ler(DB.sel('renata_configuracoes')),
    DB.ler(DB.sel('renata_voz')),
    DB.ler(DB.sel('configuracao_nota_fiscal')),
    DB.ler(DB.sel('contas_bancarias').order('criado_em')),
    DB.ler(DB.sel('configuracoes_clinica')),
    DB.ler(DB.sel('horarios_funcionamento').order('dia_semana')),
  ]);
  const funil = funis.find((f) => f.padrao) || funis[0] || null;
  catSet({
    profissionais: profs.map((p) => ({ ...p, procs: (p.profissionais_procedimentos || []).filter((x) => !x.excluido_em).map((x) => x.procedimento_id) })),
    procedimentos: procs, categorias: cats, formas, convenios: convs, fornecedores: forns, catProd, unidades: unis, status, tipos,
    etapas: etapas.filter((e) => !funil || e.funil_id === funil.id), motivos, origens, funil, pastas, instancia: inst.find((i) => i.padrao) || inst[0] || null,
    planos, assinatura: ass[0] || null, consumo: consumo[0] || null, renata: renata[0] || null, voz: voz[0] || null, nf: nf[0] || null,
    contaBancaria: contas.find((c) => c.padrao) || contas[0] || null, config: cfg[0] || null, horarios: hor,
  });
};
const catId = (lista, nome) => { const x = porNome(CAT.v[lista], nome); return x ? x.id : null; };
const catNome = (lista, id) => { const x = (CAT.v[lista] || []).find((y) => y.id === id); return x ? x.nome : ''; };

/* ---------- Equipe e permissões ---------- */
const MODULOS_TODOS = () => allModuleIds();
CARGAS.equipe = async () => {
  const rows = await DB.ler(DB.sel('usuarios_clinicas', 'id,usuario_id,email_convite,nome_convite,papel,dono,funcao,status_convite,ativo,perfil:perfis_usuario!usuario_id(nome,sobrenome,email,foto_path),permissoes(modulo,permitido,excluido_em)').order('criado_em'));
  TEAM_STORE.v = rows.filter((r) => r.ativo).map((r) => {
    const nome = r.perfil ? [r.perfil.nome, r.perfil.sobrenome].filter(Boolean).join(' ') : (r.nome_convite || r.email_convite || 'Convidado');
    const perms = (r.permissoes || []).filter((p) => !p.excluido_em);
    const acc = perms.length ? perms.filter((p) => p.permitido).map((p) => p.modulo) : (r.dono || r.papel === 'dono' || r.papel === 'gestor') ? MODULOS_TODOS() : (FUNC_PRESET ? (FUNC_PRESET()[r.funcao] || []) : []);
    return { id: r.id, dbId: r.id, usuarioId: r.usuario_id, nome, funcao: r.funcao || el('papel', r.papel, 'Recepção'), email: r.perfil ? r.perfil.email : r.email_convite, acc, dono: !!r.dono, convite: r.status_convite };
  });
  TEAM_STORE.subs.forEach((f) => f());
};

/* ---------- Preferências do usuário (idioma, som, filtros) ---------- */
const PREF = makeStore(null);
async function carregarPreferencias() {
  const r = await DB.ler(SB.from('preferencias_usuario').select('*').eq('clinica_id', CLI()).eq('usuario_id', UID()).is('excluido_em', null).limit(1));
  let p = r[0];
  if (!p) p = await DB.ins('preferencias_usuario', { usuario_id: UID() }, 'Não foi possível criar as preferências');
  PREF.v = p; PREF.subs.forEach((f) => f());
  if (p.idioma && p.idioma !== LANG.v) setLang(p.idioma);
  SOUND.v = { on: p.som_ativo, tone: p.som_tom || 'cristal', vol: Number(p.som_volume) }; SOUND.subs.forEach((f) => f());
}
let __prefTimer = null, __prefPend = {};
function salvarPref(patch) {
  if (!SB_ON || !PREF.v) return;
  PREF.v = { ...PREF.v, ...patch }; PREF.subs.forEach((f) => f());
  __prefPend = { ...__prefPend, ...patch };
  clearTimeout(__prefTimer);
  __prefTimer = setTimeout(() => { const p = __prefPend; __prefPend = {}; DB.upd('preferencias_usuario', PREF.v.id, p, 'Não foi possível salvar sua preferência').catch(() => {}); }, 500);
}
// filtro de uma tela guardado nas preferências (substitui useState para o que deve persistir)
function usePrefFiltro(chave, padrao) {
  const [p] = useStore(PREF);
  const [loc, setLoc] = React.useState(padrao);
  if (!SB_ON) return [loc, setLoc];
  const v = p && p.filtros && p.filtros[chave] !== undefined ? p.filtros[chave] : padrao;
  return [v, (nv) => { const val = typeof nv === 'function' ? nv(v) : nv; salvarPref({ filtros: { ...((PREF.v && PREF.v.filtros) || {}), [chave]: val } }); }];
}

/* ---------- Entrar, sair e trocar de clínica ---------- */
let __ctxProm = null;
function carregarContexto() { if (!__ctxProm) __ctxProm = carregarContexto0().finally(() => { __ctxProm = null; }); return __ctxProm; }
async function carregarContexto0() {
  try {
    let { data, error } = await SB.rpc('meu_contexto');
    if (error) throw error;
    let perfil = data.perfil, clinicas = data.clinicas || [];
    if (!perfil) { setSessao({ estado: 'login' }); return; }
    // cadastro feito pela aba Cadastrar: a clínica nasce no primeiro acesso, depois da confirmação do email
    if (!clinicas.length && !data.admin) {
      const r = await SB.rpc('concluir_cadastro');
      if (!r.error && r.data) { const de = await SB.rpc('meu_contexto'); if (!de.error && de.data) { data = de.data; perfil = data.perfil; clinicas = data.clinicas || []; } }
    }
    KIT_USER.name = [perfil.nome, perfil.sobrenome].filter(Boolean).join(' ') || perfil.email;
    KIT_USER.email = perfil.email;
    if (perfil.foto_path) ARQ.url('clinica', perfil.foto_path).then((u) => { KIT_USER.avatar = u; SESSAO.subs.forEach((f) => f()); }).catch(() => {});
    const admin = !!data.admin, suporte = data.suporte || null;
    // primeiro acesso: registra o aceite dos termos de uso e da política de privacidade (avisado na tela de entrar)
    if (!perfil.termos_aceitos_em) SB.rpc('aceitar_termos').then(() => {}, () => {});
    // equipe da Salute sem clínica aberta: lista de todas as clínicas (Painel Master)
    if (admin && !suporte) { setSessao({ estado: 'master', perfil, clinicas, admin, suporte: null, clinica: null }); return; }
    // acesso bloqueado pela clínica ou pelo suporte da Salute
    if (!clinicas.length && data.bloqueado) { setSessao({ estado: 'bloqueado', perfil, clinicas, admin, suporte }); return; }
    if (!clinicas.length) { setSessao({ estado: 'sem-clinica', perfil, clinicas, admin, suporte }); return; }
    const salva = (() => { try { return localStorage.getItem('salute02:clinica'); } catch (e) { return null; } })();
    const clinica = (suporte && clinicas.find((c) => c.id === suporte.clinica_id)) || clinicas.find((c) => c.id === salva) || clinicas.find((c) => c.id === perfil.clinica_ativa_id) || clinicas[0];
    Object.keys(CARGA_PROM).forEach((k) => delete CARGA_PROM[k]); CARGA.v = {};
    setSessao({ estado: 'iniciando', perfil, clinicas, clinica, modulos: clinica.modulos, erro: null, admin, suporte });
    await carregarPreferencias();
    setSessao({ estado: 'pronto' });
    carregar('catalogos'); carregar('equipe'); carregar('notificacoes');
    if (!suporte) SB.from('perfis_usuario').update(perfil.clinica_ativa_id !== clinica.id ? { clinica_ativa_id: clinica.id, ultimo_acesso_em: agoraIso() } : { ultimo_acesso_em: agoraIso() }).eq('id', perfil.id).then(() => {});
  } catch (e) {
    setSessao({ estado: 'erro', erro: MSG_ERRO(e) });
  }
}
// troca de clínica: avisa na hora qual clínica está abrindo e recarrega com os dados dela
const TROCA = makeStore(null);
async function trocarClinica(id) {
  const c = (SESSAO.v.clinicas || []).find((x) => x.id === id);
  TROCA.v = { nome: c ? c.nome : '' }; TROCA.subs.forEach((f) => f());
  try { localStorage.setItem('salute02:clinica', id); } catch (e) {}
  try { await SB.from('perfis_usuario').update({ clinica_ativa_id: id }).eq('id', UID()); } catch (e) {}
  location.reload();
}
// suporte da Salute: entra em uma clínica (fica registrado para a clínica) e volta para a lista
async function suporteEntrar(id, motivo) { const { error } = await SB.rpc('admin_entrar_clinica', { p_clinica: id, p_motivo: motivo || null }); if (error) throw error; try { localStorage.setItem('salute02:clinica', id); } catch (e) {} location.reload(); }
async function suporteVoltar() { try { await SB.rpc('admin_sair_clinica'); } catch (e) {} try { localStorage.removeItem('salute02:clinica'); } catch (e) {} location.reload(); }
async function sair() {
  if (!SB_ON) { avisoOk('Modo demonstração', 'Sem Supabase conectado não há login. Nada foi alterado.'); return; }
  try { if (SESSAO.v.suporte) await SB.rpc('admin_sair_clinica'); } catch (e) {}
  try { await SB.auth.signOut(); } catch (e) {} try { localStorage.removeItem('salute02:clinica'); } catch (e) {} if (ROTAS_URL) location.replace(urlApp('login')); else location.reload();
}
// quem entrou pelo link do convite ainda não tem senha: pede para criar antes de abrir o sistema
const precisaSenha = (s) => { const m = (s && s.user && s.user.user_metadata) || {}; return !!m.convite && !m.senha_definida; };
if (SB_ON) {
  SB.auth.onAuthStateChange((ev, s) => {
    if (ev === 'PASSWORD_RECOVERY') { setSessao({ recuperar: true }); return; }
    if (ev === 'SIGNED_OUT') { setSessao({ estado: 'login', perfil: null, clinicas: [], clinica: null }); return; }
    if (ev === 'SIGNED_IN' && s && precisaSenha(s)) { setSessao({ recuperar: true }); return; }
    if (ev === 'SIGNED_IN' && s && ['login', 'carregando'].includes(SESSAO.v.estado) && !SESSAO.v.recuperar) setTimeout(carregarContexto, 0);
  });
  // fora do retorno do getSession (setTimeout), para não travar a trava interna de sessão do Supabase
  SB.auth.getSession().then(({ data }) => setTimeout(() => { if (data && data.session) { if (precisaSenha(data.session)) setSessao({ recuperar: true, estado: 'login' }); else if (SESSAO.v.estado === 'carregando') carregarContexto(); } else setSessao({ estado: 'login' }); }, 0), () => setSessao({ estado: 'login' }));
}

/* ---------- Documentos e máscaras do cadastro ---------- */
const soDig = (v) => String(v || '').replace(/\D/g, '');
const cnpjLimpo = (v) => String(v || '').toUpperCase().replace(/[^0-9A-Z]/g, '').slice(0, 14);
// CNPJ numérico ou alfanumérico (Receita Federal, a partir de julho de 2026)
const fmtCNPJ = (v) => { const d = cnpjLimpo(v); let o = d.slice(0, 2); if (d.length > 2) o += '.' + d.slice(2, 5); if (d.length > 5) o += '.' + d.slice(5, 8); if (d.length > 8) o += '/' + d.slice(8, 12); if (d.length > 12) o += '-' + d.slice(12); return o; };
const fmtCPF = (v) => { const d = soDig(v).slice(0, 11); let o = d.slice(0, 3); if (d.length > 3) o += '.' + d.slice(3, 6); if (d.length > 6) o += '.' + d.slice(6, 9); if (d.length > 9) o += '-' + d.slice(9); return o; };
const fmtTelBR = (v) => { const d = soDig(v).replace(/^55(?=\d{10,11}$)/, '').slice(0, 11); if (!d) return ''; if (d.length <= 2) return '(' + d; const r = d.slice(2); if (r.length <= 4) return '(' + d.slice(0, 2) + ') ' + r; return '(' + d.slice(0, 2) + ') ' + (d.length === 11 ? r.slice(0, 5) + '-' + r.slice(5) : r.slice(0, 4) + '-' + r.slice(4)); };
const cpfValido = (v) => { const d = soDig(v); if (d.length !== 11 || /^(\d)\1+$/.test(d)) return false; const dv = (n) => { let s = 0; for (let i = 0; i < n; i++) s += +d[i] * (n + 1 - i); const r = (s * 10) % 11; return r === 10 ? 0 : r; }; return dv(9) === +d[9] && dv(10) === +d[10]; };
const cnpjValido = (v) => {
  const d = cnpjLimpo(v); if (d.length !== 14 || !/^[0-9A-Z]{12}\d{2}$/.test(d) || /^(.)\1+$/.test(d)) return false;
  const calc = (n) => { const w = n === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]; let s = 0; for (let i = 0; i < n; i++) s += (d.charCodeAt(i) - 48) * w[i]; const r = s % 11; return r < 2 ? 0 : 11 - r; };
  return calc(12) === +d[12] && calc(13) === +d[13];
};
// "Rua Tal, 415, Centro, Itapira - SP" -> partes do endereço da clínica
function partesEndereco(t) {
  let txt = String(t || '').trim(); const out = {};
  const cep = txt.match(/\b(\d{5})-?(\d{3})\b/); if (cep) { out.cep = cep[1] + '-' + cep[2]; txt = txt.replace(cep[0], '').replace(/\s*,\s*,/g, ','); }
  const ps = txt.split(',').map((x) => x.trim()).filter(Boolean);
  const ult = ps.length ? ps[ps.length - 1].match(/^(.+?)\s*[-/]\s*([A-Za-z]{2})$/) : null;
  if (ult) { out.cidade = ult[1].trim(); out.uf = ult[2].toUpperCase(); ps.pop(); }
  if (ps.length) out.logradouro = ps.shift();
  if (ps.length && /^(\d+[A-Za-z]?|s\/?n)$/i.test(ps[0])) out.numero = ps.shift();
  if (ps.length) out.bairro = ps.join(', ');
  if (!out.logradouro && txt) out.logradouro = txt;
  return out;
}

/* ---------- Peças visuais da porta de entrada ---------- */
function MarcaSalute({ tam = 80 }) {
  return (
    <span style={{ width: tam * 0.65, height: tam, borderRadius: tam * 0.325, overflow: 'hidden', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: 'linear-gradient(180deg,#5AA2FF 0%,#0A5CFF 42%,#0A7BFF 70%,#2FD3FF 100%)', boxShadow: '0 12px 26px -12px rgba(10,92,255,.7), inset 0 1px 0 rgba(255,255,255,.5)' }}>
      {typeof MARK !== 'undefined' && MARK ? <img src={MARK} alt="Salute IA" style={{ height: tam * 0.6, width: 'auto', filter: 'brightness(0) invert(1)' }} /> : <SIcon name="sparkles" size={tam * 0.32} color="#fff" />}
    </span>
  );
}
function CampoSenha({ label, value, onChange, onKeyDown, autoComplete, hint, error }) {
  const { Input: AInput } = window.SaluteProjetoDesigner_8b4683;
  const [ver, setVer] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--font-sans)' }}>
      {label ? <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-strong)' }}>{label}</span> : null}
      <div style={{ position: 'relative' }}>
        <AInput aria-label={label || 'Senha'} type={ver ? 'text' : 'password'} iconLeft="lock" value={value} onChange={onChange} onKeyDown={onKeyDown} autoComplete={autoComplete} hint={hint} error={error} inputStyle={{ paddingRight: 46 }} />
        <button type="button" onClick={() => setVer(!ver)} aria-label={ver ? 'Esconder senha' : 'Mostrar senha'} title={ver ? 'Esconder senha' : 'Mostrar senha'} style={{ position: 'absolute', right: 6, top: 4, width: 32, height: 32, borderRadius: '50%', border: 0, background: 'transparent', color: 'var(--text-subtle)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><SIcon name={ver ? 'eye-off' : 'eye'} size={17} /></button>
      </div>
    </div>
  );
}
const msgBox = (msg) => (msg ? <div role="status" style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 14px', borderRadius: 16, background: msg.erro ? 'rgba(229,72,77,.08)' : 'rgba(45,191,106,.1)', color: msg.erro ? '#C9353A' : '#1E8E4E', fontSize: 14, lineHeight: 1.45 }}><SIcon name={msg.erro ? 'circle-alert' : 'circle-check'} size={17} style={{ flexShrink: 0, marginTop: 1 }} /><span>{msg.t}</span></div> : null);
const linkAcesso = { border: 0, background: 'none', padding: 0, color: '#1F5EFF', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, cursor: 'pointer' };

/* ---------- Tela de entrar e cadastrar (mesmo visual do sistema) ---------- */
function TelaAcesso() {
  const { Input: AInput, Button: ABtn, SegmentedControl: ASeg } = window.SaluteProjetoDesigner_8b4683;
  const [s] = useStore(SESSAO);
  const [aba, setAba0] = React.useState(() => (ROTAS_URL && caminhoAtual() === 'cadastro' ? 'cadastrar' : 'entrar'));
  const setAba = (v) => { setAba0(v); trocarUrl(v === 'cadastrar' ? 'cadastro' : 'login'); };
  const [modo, setModo] = React.useState(s.recuperar ? 'nova' : 'entrar'); // dentro de Entrar: entrar, recuperar, convite, nova
  const [f, setF] = React.useState({ email: '', senha: '', nome: '', clinica: '', tipoDoc: 'cnpj', doc: '', tel: '', endereco: '' });
  const [faltando, setFaltando] = React.useState({});
  const [busy, setBusy] = React.useState(false);
  const [msg, setMsg] = React.useState(null);
  React.useEffect(() => { if (s.recuperar) { setAba('entrar'); setModo('nova'); } }, [s.recuperar]);
  const set = (k, fmt) => (e) => { const v = fmt ? fmt(e.target.value) : e.target.value; setF((x) => ({ ...x, [k]: v })); setMsg(null); if (faltando[k]) setFaltando((x) => ({ ...x, [k]: null })); };
  const traduz = (e) => { const m = String((e && e.message) || e || ''); return /Invalid login/i.test(m) ? 'Email ou senha incorretos.' : /Email not confirmed|not confirmed/i.test(m) ? 'Falta confirmar o email. Abra o link que enviamos e depois entre aqui.' : /already registered|already been registered|User already/i.test(m) ? 'Este email já tem acesso. Use a aba Entrar ou Esqueci minha senha.' : /Password should be|at least/i.test(m) ? 'A senha precisa ter pelo menos 8 caracteres.' : /rate limit|too many/i.test(m) ? 'Muitas tentativas seguidas. Espere um minuto e tente de novo.' : /Signups not allowed/i.test(m) ? 'Novos cadastros estão desligados no momento.' : MSG_ERRO(e); };
  const run = async (fn) => { setBusy(true); setMsg(null); try { await fn(); } catch (e) { setMsg({ erro: true, t: traduz(e) }); } finally { setBusy(false); } };
  const volta = voltaAuth();
  const emailOk = (v) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(v || '').trim());
  const entrar = () => run(async () => { if (!emailOk(f.email)) throw new Error('Informe um email válido.'); if (!f.senha) throw new Error('Digite a sua senha.'); const { error } = await SB.auth.signInWithPassword({ email: f.email.trim(), password: f.senha }); if (error) throw error; });
  const recuperar = () => run(async () => { if (!emailOk(f.email)) throw new Error('Informe o email do seu acesso.'); const { error } = await SB.auth.resetPasswordForEmail(f.email.trim(), { redirectTo: volta }); if (error) throw error; setMsg({ t: 'Se este email tiver acesso, o link para criar uma senha nova chega em instantes.' }); });
  const novaSenha = () => run(async () => { if (f.senha.length < 8) throw new Error('Password should be'); const { error } = await SB.auth.updateUser({ password: f.senha, data: { senha_definida: true } }); if (error) throw error; setSessao({ recuperar: false }); setMsg({ t: 'Senha nova salva.' }); setTimeout(carregarContexto, 400); });
  // quem recebeu convite da clínica cria o próprio acesso com o mesmo email do convite
  const convite = () => run(async () => {
    if (f.nome.trim().length < 3) throw new Error('Informe o seu nome completo.'); if (!emailOk(f.email)) throw new Error('Use o email em que você recebeu o convite.'); if (f.senha.length < 8) throw new Error('Password should be');
    const { data, error } = await SB.auth.signUp({ email: f.email.trim(), password: f.senha, options: { data: { nome: f.nome.trim().split(/\s+/)[0], sobrenome: f.nome.trim().split(/\s+/).slice(1).join(' ') }, emailRedirectTo: volta } });
    if (error) throw error;
    if (data && data.user && Array.isArray(data.user.identities) && !data.user.identities.length) throw new Error('already registered');
    if (!data.session) { setModo('entrar'); setF((x) => ({ ...x, senha: '' })); setMsg({ t: 'Enviamos um email de confirmação para ' + f.email.trim() + '. Abra o link e depois entre aqui com o seu email e a senha que você criou.' }); }
  });
  // cadastro de uma clínica nova: a confirmação vai por email e a clínica nasce no primeiro acesso
  const cadastrar = () => run(async () => {
    const doc = f.tipoDoc === 'cnpj' ? fmtCNPJ(f.doc) : fmtCPF(f.doc), end = partesEndereco(f.endereco), tel = BR.tel(f.tel);
    const fal = {
      nome: f.nome.trim().split(/\s+/).length < 2 ? 'Informe nome e sobrenome.' : null,
      clinica: f.clinica.trim().length < 2 ? 'Informe o nome da clínica.' : null,
      doc: !(f.tipoDoc === 'cnpj' ? cnpjValido(doc) : cpfValido(doc)) ? (f.tipoDoc === 'cnpj' ? 'Confira o CNPJ.' : 'Confira o CPF.') : null,
      tel: !tel || soDig(f.tel).length < 10 ? 'Use DDD e número, por exemplo (19) 99800-4100.' : null,
      endereco: !end.logradouro || f.endereco.trim().length < 6 ? 'Informe rua, número, bairro e cidade.' : null,
      email: !emailOk(f.email) ? 'Informe um email válido.' : null,
      senha: f.senha.length < 8 ? 'Pelo menos 8 caracteres.' : null,
    };
    setFaltando(fal);
    if (Object.values(fal).some(Boolean)) throw new Error('Confira os campos destacados.');
    const nomes = f.nome.trim().split(/\s+/), email = f.email.trim().toLowerCase();
    const cadastro = { clinica: f.clinica.trim(), responsavel_nome: f.nome.trim(), [f.tipoDoc]: doc, telefone: tel, email, endereco: f.endereco.trim(), ...end };
    const { data, error } = await SB.auth.signUp({ email, password: f.senha, options: { data: { nome: nomes[0], sobrenome: nomes.slice(1).join(' '), cadastro }, emailRedirectTo: volta } });
    if (error) throw error;
    if (data && data.user && Array.isArray(data.user.identities) && !data.user.identities.length) throw new Error('already registered');
    if (data && data.session) return; // confirmação de email desligada no Supabase: já entra e a clínica é criada
    setAba('entrar'); setModo('entrar'); setF((x) => ({ ...x, email, senha: '' }));
    setMsg({ t: 'Cadastro feito! Enviamos um email de confirmação para ' + email + '. Abra o link para ativar a conta e depois entre aqui com o seu email e senha.' });
  });
  const semClinica = s.estado === 'sem-clinica';
  const criarClinica = () => run(async () => { if (!f.clinica.trim()) throw new Error('Informe o nome da clínica'); const { error } = await SB.rpc('criar_clinica', { p_nome: f.clinica.trim() }); if (error) throw error; await carregarContexto(); });
  const onKey = (fn) => (e) => { if (e.key === 'Enter') fn(); };
  const trocarAba = (v) => { setAba(v); setModo('entrar'); setMsg(null); setFaltando({}); };
  const titulo = semClinica ? 'Falta só a sua clínica' : modo === 'nova' ? 'Criar senha nova' : 'Bem-vindo à Salute IA';
  const sub = semClinica ? 'Seu login ainda não está ligado a nenhuma clínica. Crie a sua ou peça um convite ao dono da clínica.' : modo === 'nova' ? 'Escolha a senha que vai usar daqui em diante.'
    : aba === 'cadastrar' ? 'Crie a conta da sua clínica em poucos passos.' : modo === 'recuperar' ? 'Enviamos um link seguro para o seu email.' : modo === 'convite' ? 'Crie o seu acesso com o email em que você recebeu o convite.' : 'Entre para continuar.';
  const err = (k) => faltando[k] || undefined;
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '28px 16px', boxSizing: 'border-box', fontFamily: 'var(--font-sans)' }}>
      <section style={{ ...glass, width: '100%', maxWidth: 460, padding: '30px 26px 24px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <MarcaSalute tam={74} />
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.32em', color: 'var(--text-strong)', paddingLeft: '.32em' }}>SALUTE</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ margin: 0, fontSize: 23, fontWeight: 600, color: 'var(--text-strong)', letterSpacing: '-0.01em' }}>{titulo}</h1>
          <p style={{ margin: '6px 0 0', fontSize: 14, lineHeight: 1.5, color: 'var(--text-muted)' }}>{sub}</p>
        </div>
        {semClinica ? <>
          <AInput label="Nome da clínica" iconLeft="building-2" value={f.clinica} onChange={set('clinica')} onKeyDown={onKey(criarClinica)} placeholder="Ex.: Clínica Bella Forma" />
          <ABtn fullWidth iconLeft="plus" loading={busy} onClick={criarClinica}>Criar minha clínica</ABtn>
          <div style={{ textAlign: 'center' }}><button type="button" style={linkAcesso} onClick={sair}>Sair e entrar com outro email</button></div>
        </> : modo === 'nova' ? <>
          <CampoSenha label="Senha nova" value={f.senha} onChange={set('senha')} onKeyDown={onKey(novaSenha)} autoComplete="new-password" hint="Pelo menos 8 caracteres" />
          <ABtn fullWidth iconLeft="check" loading={busy} onClick={novaSenha}>Salvar senha</ABtn>
        </> : <>
          <ASeg fullWidth value={aba} onChange={trocarAba} options={[{ value: 'entrar', label: 'Entrar', icon: 'log-in' }, { value: 'cadastrar', label: 'Cadastrar', icon: 'user-plus' }]} />
          {aba === 'entrar' ? (
            <form onSubmit={(e) => { e.preventDefault(); (modo === 'recuperar' ? recuperar : modo === 'convite' ? convite : entrar)(); }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {modo === 'convite' ? <AInput label="Nome completo" iconLeft="user" value={f.nome} onChange={set('nome')} autoComplete="name" placeholder="Seu nome completo" /> : null}
              <AInput label="E-mail" type="email" iconLeft="mail" value={f.email} onChange={set('email')} autoComplete="email" placeholder="seu@email.com" />
              {modo !== 'recuperar' ? <CampoSenha label={modo === 'convite' ? 'Crie uma senha' : 'Senha'} value={f.senha} onChange={set('senha')} autoComplete={modo === 'entrar' ? 'current-password' : 'new-password'} hint={modo === 'convite' ? 'Pelo menos 8 caracteres' : undefined} /> : null}
              <ABtn type="submit" fullWidth iconLeft={modo === 'recuperar' ? 'send' : modo === 'convite' ? 'user-check' : 'log-in'} loading={busy}>{modo === 'recuperar' ? 'Enviar link' : modo === 'convite' ? 'Criar meu acesso' : 'Entrar'}</ABtn>
              <div style={{ display: 'flex', justifyContent: modo === 'entrar' ? 'space-between' : 'center', gap: 12, flexWrap: 'wrap' }}>
                {modo === 'entrar' ? <><button type="button" style={linkAcesso} onClick={() => { setModo('recuperar'); setMsg(null); }}>Esqueci minha senha</button><button type="button" style={linkAcesso} onClick={() => { setModo('convite'); setMsg(null); }}>Recebi um convite</button></>
                  : <button type="button" style={linkAcesso} onClick={() => { setModo('entrar'); setMsg(null); }}>Voltar para entrar</button>}
              </div>
            </form>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); cadastrar(); }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <AInput label="Nome completo *" iconLeft="user" value={f.nome} onChange={set('nome')} autoComplete="name" placeholder="Seu nome completo" error={err('nome')} />
              <AInput label="Nome da clínica *" iconLeft="building-2" value={f.clinica} onChange={set('clinica')} autoComplete="organization" placeholder="Nome da sua clínica" error={err('clinica')} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-strong)' }}>{f.tipoDoc === 'cnpj' ? 'CNPJ *' : 'CPF *'}</span>
                  <ASeg size="sm" value={f.tipoDoc} onChange={(v) => { setF((x) => ({ ...x, tipoDoc: v, doc: v === 'cnpj' ? fmtCNPJ(x.doc) : fmtCPF(x.doc) })); setFaltando((x) => ({ ...x, doc: null })); }} options={[{ value: 'cnpj', label: 'CNPJ' }, { value: 'cpf', label: 'CPF' }]} />
                </div>
                <AInput iconLeft={f.tipoDoc === 'cnpj' ? 'landmark' : 'id-card'} value={f.doc} onChange={set('doc', f.tipoDoc === 'cnpj' ? fmtCNPJ : fmtCPF)} inputMode={f.tipoDoc === 'cnpj' ? 'text' : 'numeric'} placeholder={f.tipoDoc === 'cnpj' ? '00.000.000/0000-00' : '000.000.000-00'} aria-label={f.tipoDoc === 'cnpj' ? 'CNPJ' : 'CPF'} error={err('doc')} />
              </div>
              <AInput label="Telefone (WhatsApp) *" type="tel" iconLeft="phone" value={f.tel} onChange={set('tel', fmtTelBR)} autoComplete="tel-national" inputMode="tel" placeholder="(11) 99999-9999" error={err('tel')} />
              <AInput label="Endereço *" iconLeft="map-pin" value={f.endereco} onChange={set('endereco')} autoComplete="street-address" placeholder="Rua, número, bairro, cidade - UF" error={err('endereco')} />
              <AInput label="E-mail *" type="email" iconLeft="mail" value={f.email} onChange={set('email')} autoComplete="email" placeholder="seu@email.com" error={err('email')} />
              <CampoSenha label="Senha *" value={f.senha} onChange={set('senha')} autoComplete="new-password" hint="Pelo menos 8 caracteres" error={err('senha')} />
              <ABtn type="submit" fullWidth iconLeft="user-plus" loading={busy}>Criar conta</ABtn>
              <span style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--text-muted)', textAlign: 'center' }}>Você recebe um email para confirmar o cadastro. Depois é só entrar com o seu email e senha. Quem trabalha na sua clínica recebe o acesso pelo convite que você manda em Configurações.</span>
            </form>
          )}
        </>}
        {msgBox(msg)}
        {semClinica ? null : <span style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-subtle)' }}>Ao continuar, você concorda com os termos de uso e a política de privacidade. Seus dados ficam protegidos e separados por clínica.</span>}
      </section>
    </div>
  );
}

/* ---------- Aviso de modo demonstração ---------- */
function AvisoDemo({ mobile }) {
  const { Icon: DIcon } = window.SaluteProjetoDesigner_8b4683;
  const [aberto, setAberto] = React.useState(() => { try { return sessionStorage.getItem('salute02:aviso') !== 'x'; } catch (e) { return true; } });
  if (SB_ON || !aberto) return null;
  const fechar = () => { setAberto(false); try { sessionStorage.setItem('salute02:aviso', 'x'); } catch (e) {} };
  return (
    <div role="status" style={{ position: 'fixed', zIndex: 145, left: '50%', transform: 'translateX(-50%)', top: mobile ? 'auto' : 14, bottom: mobile ? 'calc(96px + env(safe-area-inset-bottom))' : 'auto', display: 'flex', alignItems: 'center', gap: 10, padding: '7px 7px 7px 14px', borderRadius: 999, background: 'rgba(255,255,255,.92)', border: '1.5px solid #fff', boxShadow: '0 14px 28px -16px rgba(23,73,170,.55)', fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-body)', maxWidth: 'calc(100vw - 24px)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#F5B400', flexShrink: 0 }} />
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={SB_MOTIVO}><b style={{ color: 'var(--text-strong)', fontWeight: 600 }}>Supabase não conectado.</b> Modo demonstração: nada é salvo.</span>
      <button type="button" aria-label="Fechar aviso" onClick={fechar} style={{ width: 26, height: 26, borderRadius: '50%', border: 0, background: 'rgba(31,94,255,.08)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}><DIcon name="x" size={13} /></button>
    </div>
  );
}

/* ---------- Retorno de gravação na tela (componente Toast do sistema) ---------- */
function AvisoGravacao({ mobile }) {
  const { Toast: GToast } = window.SaluteProjetoDesigner_8b4683;
  const [s] = useStore(SALVA);
  const [vis, setVis] = React.useState(null);
  React.useEffect(() => { const x = s.erro || null; if (!x) return; setVis({ tone: 'danger', ...x }); const t = setTimeout(() => setVis(null), 6000); return () => clearTimeout(t); }, [s.erro && s.erro.id]);
  React.useEffect(() => { const x = s.ok || null; if (!x) return; setVis({ tone: 'success', ...x }); const t = setTimeout(() => setVis(null), 2800); return () => clearTimeout(t); }, [s.ok && s.ok.id]);
  return (
    <>
      {s.pend > 0 ? <div aria-live="polite" style={{ position: 'fixed', zIndex: 139, right: mobile ? 12 : 24, bottom: mobile ? 'calc(100px + env(safe-area-inset-bottom))' : 24, display: 'flex', alignItems: 'center', gap: 8, height: 34, padding: '0 14px', borderRadius: 999, background: 'rgba(255,255,255,.92)', border: '1.5px solid #fff', boxShadow: '0 10px 22px -14px rgba(23,73,170,.5)', fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-muted)' }}><SIcon name="loader-circle" size={15} style={{ animation: 'sbgira 1s linear infinite' }} />Salvando...<style>{'@keyframes sbgira{to{transform:rotate(360deg)}}'}</style></div> : null}
      {vis ? <div style={{ position: 'fixed', zIndex: 141, right: mobile ? 12 : 24, left: mobile ? 12 : 'auto', top: mobile ? 70 : 'auto', bottom: mobile ? 'auto' : 24 }}><GToast tone={vis.tone} title={vis.titulo} description={vis.desc} onClose={() => setVis(null)} style={{ width: mobile ? '100%' : 360 }} /></div> : null}
    </>
  );
}

/* ---------- Painel Master: a equipe de suporte da Salute escolhe a clínica ---------- */
const ST_CLINICA = { ativa: ['Ativa', '#1E8E4E', 'rgba(45,191,106,.12)'], teste: ['Em teste', '#1F5EFF', 'rgba(31,94,255,.1)'], em_atraso: ['Em atraso', '#C2410C', 'rgba(242,105,74,.12)'], cancelada: ['Cancelada', '#6B7A93', 'rgba(138,151,174,.14)'], sem: ['Sem plano', '#6B7A93', 'rgba(138,151,174,.14)'], inativa: ['Inativa', '#6B7A93', 'rgba(138,151,174,.14)'] };
const stClinica = (c) => (c.ativo === false ? 'inativa' : ST_CLINICA[c.assinatura] ? c.assinatura : 'sem');
const semAcento = (t) => String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
function PainelMaster() {
  const { Input: MInput, Button: MBtn } = window.SaluteProjetoDesigner_8b4683;
  const [s] = useStore(SESSAO);
  const [lista, setLista] = React.useState(null);
  const [erro, setErro] = React.useState(null);
  const [q, setQ] = React.useState('');
  const [filtro, setFiltro] = React.useState('todas');
  const [abrindo, setAbrindo] = React.useState(null);
  const [logins, setLogins] = React.useState(null);
  const mobile = typeof useIsMobile === 'function' ? useIsMobile() : false;
  const buscar = () => { setErro(null); SB.rpc('admin_clinicas').then(({ data, error }) => { if (error) { setErro(MSG_ERRO(error)); return; } setLista(data || []); }); };
  React.useEffect(buscar, []);
  const abrir = async (c) => { if (abrindo) return; setAbrindo(c.id); try { await suporteEntrar(c.id); } catch (e) { setAbrindo(null); setErro(MSG_ERRO(e)); } };
  const termo = semAcento(q).trim(), dig = soDig(q);
  // a busca também acha a clínica pelo email de qualquer login dela
  const loginAchado = (c) => (termo.length >= 3 ? (c.logins || []).find((e) => semAcento(e).includes(termo) && e !== String(c.dono_email || '').toLowerCase()) : null);
  const filtradas = (lista || []).filter((c) => (filtro === 'todas' || stClinica(c) === filtro) && (!termo || semAcento([c.nome, c.razao_social, c.cidade, c.uf, c.dono, c.dono_email].join(' ')).includes(termo) || (dig.length >= 3 && soDig(c.documento).includes(dig)) || !!loginAchado(c)));
  const conta = (k) => (lista || []).filter((c) => stClinica(c) === k).length;
  const chips = [['todas', 'Todas', (lista || []).length], ['ativa', 'Ativas', conta('ativa')], ['teste', 'Em teste', conta('teste')], ['em_atraso', 'Em atraso', conta('em_atraso')], ['cancelada', 'Canceladas', conta('cancelada')]].filter((x) => x[0] === 'todas' || x[2]);
  const nomeEu = [s.perfil && s.perfil.nome, s.perfil && s.perfil.sobrenome].filter(Boolean).join(' ') || (s.perfil && s.perfil.email) || '';
  return (
    <div style={{ minHeight: '100vh', boxSizing: 'border-box', padding: mobile ? '14px 16px 32px' : '26px 40px 40px', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', gap: mobile ? 18 : 26 }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <MarcaSalute tam={46} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: '.24em', color: 'var(--text-strong)' }}>SALUTE</div>
          <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Painel Master</div>
        </div>
        {mobile ? null : <span style={{ fontSize: 13, color: 'var(--text-muted)', textAlign: 'right' }}>Suporte Salute<br /><b style={{ color: 'var(--text-strong)', fontWeight: 600 }}>{nomeEu}</b></span>}
        <MBtn variant="secondary" size="sm" iconLeft="log-out" onClick={sair}>Sair</MBtn>
      </header>
      <main style={{ width: '100%', maxWidth: 780, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 8 }}>
          <span style={{ width: 56, height: 56, borderRadius: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(31,94,255,.1)', color: '#1F5EFF' }}><SIcon name="building-2" size={26} /></span>
          <h1 style={{ margin: '4px 0 0', fontSize: mobile ? 22 : 26, fontWeight: 600, color: 'var(--text-strong)', letterSpacing: '-0.01em' }}>Selecione uma clínica</h1>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: 'var(--text-muted)', maxWidth: 520 }}>Escolha a clínica que deseja acessar para dar suporte. Cada entrada fica registrada na auditoria da clínica, com data, hora e IP.</p>
        </div>
        <MInput variant="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={mobile ? 'Nome, cidade, CNPJ ou email' : 'Buscar por nome, cidade, CNPJ ou email de login'} aria-label="Buscar clínica" />
        {lista && lista.length ? <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{chips.map(([k, l, n]) => <FilterChip key={k} active={filtro === k} onClick={() => setFiltro(k)}>{l} ({n})</FilterChip>)}</div> : null}
        <section style={{ ...glass, padding: 8, display: 'flex', flexDirection: 'column' }}>
          {erro ? <div style={{ padding: 22, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}><SIcon name="cloud-off" size={22} />{erro}<MBtn size="sm" variant="secondary" iconLeft="refresh-cw" onClick={buscar}>Tentar de novo</MBtn></div>
            : !lista ? <div style={{ padding: 28, display: 'flex', justifyContent: 'center', gap: 10, color: 'var(--text-muted)', fontSize: 14 }}><SIcon name="loader-circle" size={18} style={{ animation: 'sbgira 1s linear infinite' }} />Carregando clínicas...<style>{'@keyframes sbgira{to{transform:rotate(360deg)}}'}</style></div>
            : !filtradas.length ? <div style={{ padding: 28, textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>{lista.length ? 'Nenhuma clínica encontrada com essa busca.' : 'Nenhuma clínica cadastrada ainda.'}</div>
            : filtradas.map((c, i) => { const st = ST_CLINICA[stClinica(c)]; const achado = loginAchado(c); const det = [c.plano ? 'Plano ' + c.plano : 'Sem plano', c.cidade ? c.cidade + (c.uf ? ' - ' + c.uf : '') : null, (c.pacientes || 0) + (Number(c.pacientes) === 1 ? ' paciente' : ' pacientes'), 'desde ' + BR.dataTela(BR.diaDe(c.criado_em))].filter(Boolean).join(' · '); return (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 4, borderTop: i ? '1px solid rgba(214,226,242,.7)' : 0 }}>
              <button type="button" onClick={() => abrir(c)} disabled={!!abrindo} title={'Entrar na ' + c.nome + ' como suporte'} style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center', gap: 12, padding: '12px 12px', border: 0, borderRadius: 16, background: abrindo === c.id ? 'rgba(31,94,255,.07)' : 'transparent', cursor: abrindo ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left' }}
                onMouseEnter={(e) => { if (!abrindo) e.currentTarget.style.background = 'rgba(255,255,255,.75)'; }} onMouseLeave={(e) => { if (abrindo !== c.id) e.currentTarget.style.background = 'transparent'; }}>
                <span style={{ width: 42, height: 42, borderRadius: 14, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(31,94,255,.08)', color: '#1F5EFF' }}><SIcon name="building-2" size={19} /></span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: 15, fontWeight: 600, color: 'var(--text-strong)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.nome}</span>
                  <span style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: mobile ? 'normal' : 'nowrap' }}>{det}</span>
                  {c.dono ? <span style={{ display: 'block', fontSize: 12, color: 'var(--text-subtle)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.dono}{c.dono_email ? ' · ' + c.dono_email : ''}</span> : null}
                  {achado ? <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 500, color: '#1F5EFF', overflow: 'hidden', whiteSpace: 'nowrap' }}><SIcon name="user-round" size={13} /><span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>Login: {achado}</span></span> : null}
                </span>
                <span style={{ flexShrink: 0, fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 999, color: st[1], background: st[2] }}>{st[0]}</span>
                <span style={{ flexShrink: 0, color: 'var(--text-subtle)', display: 'flex' }}>{abrindo === c.id ? <SIcon name="loader-circle" size={17} style={{ animation: 'sbgira 1s linear infinite' }} /> : <SIcon name="chevron-right" size={17} />}</span>
              </button>
              <button type="button" onClick={() => setLogins(c)} disabled={!!abrindo} aria-label={'Logins da ' + c.nome} title="Logins da clínica" style={{ flexShrink: 0, width: 40, height: 40, marginRight: 4, borderRadius: '50%', border: '1.5px solid rgba(214,226,242,.95)', background: 'rgba(255,255,255,.7)', color: 'var(--text-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: abrindo ? 'default' : 'pointer', padding: 0 }}><SIcon name="users" size={17} /></button>
              </div>); })}
        </section>
        {lista ? <span style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-muted)' }}>{lista.length} {lista.length === 1 ? 'clínica cadastrada' : 'clínicas cadastradas'}</span> : null}
      </main>
      {logins ? <LoginsClinica clinica={logins} mobile={mobile} onClose={() => setLogins(null)} /> : null}
    </div>
  );
}

/* ---------- Painel Master: logins de uma clínica (sem senha: ninguém vê senha, nem a Salute) ---------- */
const PAPEL_LOGIN = { dono: 'Dono', gestor: 'Gestão', recepcao: 'Recepção', profissional: 'Profissional', financeiro: 'Financeiro' };
function situacaoLogin(m) {
  if (!m.ativo) return ['Bloqueado', '#C2272D', 'rgba(229,72,77,.1)'];
  if (m.convite === 'pendente') return ['Convite pendente', '#B98400', 'rgba(245,180,0,.14)'];
  if (m.tem_login && !m.email_confirmado) return ['Email não confirmado', '#B98400', 'rgba(245,180,0,.14)'];
  return ['Ativo', '#1E8E4E', 'rgba(45,191,106,.12)'];
}
function LoginsClinica({ clinica, onClose, mobile }) {
  const { Dialog: LDialog, Button: LBtn } = window.SaluteProjetoDesigner_8b4683;
  const [lista, setLista] = React.useState(null);
  const [erro, setErro] = React.useState(null);
  const [msg, setMsg] = React.useState(null);
  const [ocupado, setOcupado] = React.useState(null);
  const [confirma, setConfirma] = React.useState(null);
  const carregarLogins = () => { setErro(null); SB.rpc('admin_membros', { p_clinica: clinica.id }).then(({ data, error }) => { if (error) { setErro(MSG_ERRO(error)); return; } setLista(data || []); }); };
  React.useEffect(carregarLogins, [clinica.id]);
  const volta = voltaAuth();
  const acao = async (m, tipo) => {
    if (ocupado) return;
    setOcupado(m.id + tipo); setMsg(null);
    try {
      if (tipo === 'senha') {
        const { error } = await SB.auth.resetPasswordForEmail(m.email, { redirectTo: volta });
        if (error) throw error;
        await SB.rpc('admin_registrar_envio', { p_vinculo: m.id, p_tipo: 'link_senha' });
        setMsg({ t: 'Link para criar senha nova enviado para ' + m.email + '.' });
      } else if (tipo === 'convite') {
        // cliente separado: o envio não mexe na sessão do suporte
        const cli = window.supabase.createClient(SB_CFG.url, SB_CFG.key, { auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false, flowType: 'implicit', storageKey: 'salute02-convite' }, global: { fetch: sbFetch } });
        const nomes = String(m.nome || '').trim().split(/\s+/);
        const { error } = await cli.auth.signInWithOtp({ email: m.email, options: { shouldCreateUser: true, emailRedirectTo: volta, data: { nome: nomes[0] || '', sobrenome: nomes.slice(1).join(' '), convite: true } } });
        if (error) throw error;
        await SB.rpc('admin_registrar_envio', { p_vinculo: m.id, p_tipo: 'convite' });
        setMsg({ t: 'Convite enviado de novo para ' + m.email + '.' });
        carregarLogins();
      } else {
        const ativo = tipo === 'liberar';
        const { error } = await SB.rpc('admin_definir_acesso', { p_vinculo: m.id, p_ativo: ativo, p_motivo: 'Painel Master' });
        if (error) throw error;
        setConfirma(null);
        setLista((l) => l.map((x) => (x.id === m.id ? { ...x, ativo } : x)));
        setMsg({ t: ativo ? 'Acesso de ' + m.nome + ' liberado.' : 'Acesso de ' + m.nome + ' bloqueado. A pessoa não entra mais nesta clínica até você liberar.' });
      }
    } catch (e) {
      const t = String((e && e.message) || '');
      setMsg({ erro: true, t: /rate limit|too many|seconds/i.test(t) ? 'Muitos envios seguidos para este email. Espere um minuto e tente de novo.' : MSG_ERRO(e) });
    }
    setOcupado(null);
  };
  const botao = (m, tipo, icone, txt, perigo) => (
    <button type="button" onClick={() => (tipo === 'bloquear' ? setConfirma(m.id) : acao(m, tipo))} disabled={!!ocupado}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 32, padding: '0 12px', borderRadius: 999, border: '1.5px solid ' + (perigo ? 'rgba(229,72,77,.35)' : 'rgba(214,226,242,.95)'), background: '#fff', color: perigo ? '#C2272D' : 'var(--text-strong)', fontFamily: 'inherit', fontSize: 13, fontWeight: 500, cursor: ocupado ? 'default' : 'pointer', whiteSpace: 'nowrap' }}>
      <SIcon name={ocupado === m.id + tipo ? 'loader-circle' : icone} size={14} style={ocupado === m.id + tipo ? { animation: 'sbgira 1s linear infinite' } : undefined} />{txt}
    </button>
  );
  const quando = (ts) => (ts ? BR.dataTela(BR.diaDe(ts)) + ' às ' + BR.hm(ts) : null);
  return ReactDOM.createPortal(
    <div style={{ fontFamily: 'var(--font-sans)' }}>
      <LDialog open onClose={onClose} icon="users" title={'Logins da ' + clinica.nome} width={660}
        description="As senhas ficam guardadas com criptografia e ninguém consegue ver, nem a equipe da Salute. Para ajudar alguém a entrar, envie o link de senha nova."
        footer={<LBtn variant="secondary" onClick={onClose}>Fechar</LBtn>}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {erro ? <div style={{ padding: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}><SIcon name="cloud-off" size={20} />{erro}<LBtn size="sm" variant="secondary" iconLeft="refresh-cw" onClick={carregarLogins}>Tentar de novo</LBtn></div>
            : !lista ? <div style={{ padding: 24, display: 'flex', justifyContent: 'center', gap: 10, color: 'var(--text-muted)', fontSize: 14 }}><SIcon name="loader-circle" size={18} style={{ animation: 'sbgira 1s linear infinite' }} />Carregando logins...</div>
            : !lista.length ? <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>Esta clínica ainda não tem logins.</div>
            : lista.map((m) => { const st = situacaoLogin(m); const acesso = quando(m.ultimo_acesso_em); return (
              <div key={m.id} style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '12px 14px', borderRadius: 18, background: 'rgba(255,255,255,.7)', border: '1.5px solid rgba(214,226,242,.8)', opacity: m.ativo ? 1 : 0.85 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <SAvatar name={m.nome} size={40} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}><span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-strong)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.nome}</span>{m.dono ? <span style={{ flexShrink: 0, fontSize: 11, fontWeight: 600, color: '#1F5EFF', background: 'rgba(31,94,255,.1)', padding: '2px 8px', borderRadius: 999 }}>Dono</span> : null}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.email}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-subtle)' }}>{[m.funcao || PAPEL_LOGIN[m.papel] || '', acesso ? 'Último acesso ' + acesso : m.tem_login ? 'Ainda não entrou' : 'Sem login criado'].filter(Boolean).join(' · ')}</div>
                  </div>
                  {mobile ? null : <span style={{ flexShrink: 0, fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 999, color: st[1], background: st[2] }}>{st[0]}</span>}
                </div>
                {mobile ? <span style={{ alignSelf: 'flex-start', fontSize: 12, fontWeight: 600, padding: '4px 10px', borderRadius: 999, color: st[1], background: st[2] }}>{st[0]}</span> : null}
                {confirma === m.id ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', padding: '10px 12px', borderRadius: 14, background: 'rgba(229,72,77,.06)' }}>
                    <span style={{ flex: 1, minWidth: 180, fontSize: 13, color: 'var(--text-body)' }}>Bloquear o acesso de <b>{m.nome}</b> a esta clínica? Fica registrado na auditoria.</span>
                    <LBtn size="sm" variant="secondary" onClick={() => setConfirma(null)}>Cancelar</LBtn>
                    <LBtn size="sm" variant="danger" iconLeft="lock" loading={ocupado === m.id + 'bloquear'} onClick={() => acao(m, 'bloquear')}>Bloquear</LBtn>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {m.ativo && m.tem_login && m.email_confirmado ? botao(m, 'senha', 'key-round', 'Enviar link de senha') : null}
                    {m.ativo && (m.convite === 'pendente' || (m.tem_login && !m.email_confirmado)) ? botao(m, 'convite', 'send', 'Reenviar convite') : null}
                    {m.ativo ? botao(m, 'bloquear', 'lock', 'Bloquear acesso', true) : botao(m, 'liberar', 'lock-open', 'Liberar acesso')}
                  </div>
                )}
              </div>); })}
          {msgBox(msg)}
          <style>{'@keyframes sbgira{to{transform:rotate(360deg)}}'}</style>
        </div>
      </LDialog>
    </div>, document.body);
}

/* ---------- Faixa do suporte: aparece no topo enquanto a equipe da Salute está dentro de uma clínica ---------- */
function AvisoSuporte({ mobile }) {
  const { Button: SBtn } = window.SaluteProjetoDesigner_8b4683;
  const [s] = useStore(SESSAO);
  if (!SB_ON || !s.suporte) return null;
  return (
    <div role="status" style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', padding: mobile ? '10px 12px' : '10px 12px 10px 16px', borderRadius: 20, background: 'rgba(255,248,230,.85)', border: '1.5px solid rgba(245,180,0,.45)', boxShadow: '0 10px 22px -18px rgba(185,132,0,.6)', fontFamily: 'var(--font-sans)', margin: mobile ? '0 0 12px' : 0 }}>
      <span style={{ width: 34, height: 34, borderRadius: 12, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(245,180,0,.18)', color: '#B98400' }}><SIcon name="shield-check" size={18} /></span>
      <span style={{ flex: 1, minWidth: 180, fontSize: 14, lineHeight: 1.4, color: 'var(--text-body)' }}>Você está acessando como suporte: <b style={{ color: 'var(--text-strong)' }}>{s.suporte.nome}</b><span style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)' }}>Entrada registrada às {BR.hm(s.suporte.iniciado_em)} de {BR.dataTela(BR.diaDe(s.suporte.iniciado_em))}. Tudo o que você alterar fica na auditoria da clínica.</span></span>
      <SBtn size="sm" variant="secondary" iconLeft="repeat" onClick={suporteVoltar}>Trocar clínica</SBtn>
    </div>
  );
}

/* ---------- Aba sem permissão: aparece com cadeado ---------- */
function SemAcesso({ titulo }) {
  const { EmptyState: XEmpty } = window.SaluteProjetoDesigner_8b4683;
  return <XEmpty icon="lock" title={'Sem acesso a ' + (titulo || 'esta aba')} description="Esta aba não está liberada para o seu usuário. Peça ao dono da clínica para liberar em Configurações, na área Equipe e acessos." style={{ maxWidth: 560, margin: '20px auto 0' }} />;
}

/* ---------- Minha conta: o avatar abre os dados pessoais e o botão de sair ---------- */
const CONTA = makeStore(null);
function abrirConta(e) { const r = (e && e.currentTarget && e.currentTarget.getBoundingClientRect) ? e.currentTarget.getBoundingClientRect() : { left: innerWidth - 60, top: 20, width: 40, height: 40 }; CONTA.v = CONTA.v ? null : { x: r.left, y: r.top, w: r.width, h: r.height }; CONTA.subs.forEach((f) => f()); }
const fecharConta = () => { CONTA.v = null; CONTA.subs.forEach((f) => f()); };
const ABA_CONFIG = makeStore(null);
const PAPEL_TXT = { dono: 'Dono da clínica', gestor: 'Gestão', recepcao: 'Recepção', profissional: 'Profissional', financeiro: 'Financeiro' };
// avatar: dados pessoais, clínicas do mesmo login (troca com um toque), nova clínica e sair
function ContaMenu(props) {
  return <><ContaMenu0 {...props} /><NovaClinicaDialog /><TrocaAviso /></>;
}
function ContaMenu0({ onNavigate, mobile }) {
  const [a] = useStore(CONTA); const [s] = useStore(SESSAO);
  const { can } = useAccess();
  React.useEffect(() => { if (!a) return undefined; const k = (e) => { if (e.key === 'Escape') fecharConta(); }; window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, [!!a]);
  if (!a) return null;
  const W = Math.min(300, innerWidth - 24);
  const lateral = a.x < 140 && a.y > innerHeight / 2;
  const pos = lateral ? { left: a.x + a.w + 14, bottom: Math.max(12, innerHeight - (a.y + a.h)) } : { top: a.y + a.h + 10, left: Math.max(12, Math.min(innerWidth - W - 12, a.x + a.w - W)) };
  const cli = s.clinica, nome = KIT_USER.name || 'Usuário', email = KIT_USER.email || (s.perfil && s.perfil.email) || (SB_ON ? '' : 'camila@bellaforma.com.br');
  const funcaoDe = (c) => (c.funcao || PAPEL_TXT[c.dono ? 'dono' : c.papel] || '');
  const funcao = s.suporte ? 'Suporte Salute' : cli ? funcaoDe(cli) : 'Administradora';
  const item = (icone, txt, fn, cor) => <button type="button" onClick={() => { fecharConta(); fn(); }} style={{ display: 'flex', alignItems: 'center', gap: 10, height: 42, padding: '0 12px', border: 0, borderRadius: 14, background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, color: cor || 'var(--text-strong)', textAlign: 'left', width: '100%' }} onMouseEnter={(e) => { e.currentTarget.style.background = cor ? 'rgba(229,72,77,.07)' : 'rgba(31,94,255,.06)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}><span style={{ display: 'flex', color: cor || '#1F5EFF' }}><SIcon name={icone} size={17} /></span>{txt}</button>;
  const minhas = (s.clinicas || []).filter((c) => !c.suporte);
  const varias = !s.suporte && minhas.length > 1;
  const podeNova = SB_ON && !s.suporte && minhas.some((c) => c.dono || c.papel === 'dono');
  const atualBox = (c) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 16, background: s.suporte ? 'rgba(245,180,0,.12)' : 'rgba(31,94,255,.06)' }}>
      <span style={{ display: 'flex', color: s.suporte ? '#B98400' : '#1F5EFF' }}><SIcon name={s.suporte ? 'shield-check' : 'building-2'} size={17} /></span>
      <span style={{ minWidth: 0, flex: 1 }}><span style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--text-strong)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c ? c.nome : 'Clínica Bella Forma'}</span>{funcao ? <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{funcao}</span> : null}</span>
      {varias ? <span title="Clínica aberta" style={{ display: 'flex', color: '#1F5EFF', flexShrink: 0 }}><SIcon name="check" size={17} /></span> : null}
    </div>
  );
  // outra clínica do mesmo login: um toque troca
  const outraBox = (c) => (
    <button key={c.id} type="button" onClick={() => { fecharConta(); trocarClinica(c.id); }} title={'Abrir ' + c.nome}
      style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', border: 0, borderRadius: 16, background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', width: '100%' }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(31,94,255,.06)'; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}>
      <span style={{ display: 'flex', color: 'var(--text-subtle)' }}><SIcon name="building-2" size={17} /></span>
      <span style={{ minWidth: 0, flex: 1 }}><span style={{ display: 'block', fontSize: 14, fontWeight: 500, color: 'var(--text-strong)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.nome}</span>{funcaoDe(c) ? <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{funcaoDe(c)}</span> : null}</span>
      <span style={{ display: 'flex', color: 'var(--text-subtle)', flexShrink: 0 }}><SIcon name="arrow-left-right" size={15} /></span>
    </button>
  );
  return (
    <>
      <div onClick={fecharConta} style={{ position: 'fixed', inset: 0, zIndex: 170 }} />
      <div role="dialog" aria-label="Minha conta" style={{ position: 'fixed', zIndex: 171, width: W, boxSizing: 'border-box', ...pos, padding: 12, borderRadius: 24, background: 'rgba(255,255,255,.97)', border: '1.5px solid #fff', boxShadow: '0 26px 50px -22px rgba(23,73,170,.6)', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column', gap: 8, backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 6px 4px' }}>
          <SAvatar name={nome} src={KIT_USER.avatar} size={46} />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-strong)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{nome}</div>
            {email ? <div style={{ fontSize: 13, color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{email}</div> : null}
          </div>
        </div>
        {varias ? <>
          <span style={{ padding: '2px 8px 0', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.03em' }}>Minhas clínicas ({minhas.length})</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, maxHeight: Math.max(150, Math.min(300, innerHeight - 330)), overflowY: 'auto', scrollbarWidth: 'thin' }}>
            {atualBox(cli)}
            {minhas.filter((c) => !cli || c.id !== cli.id).map(outraBox)}
          </div>
        </> : atualBox(cli)}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {podeNova ? item('plus', 'Adicionar clínica', abrirNovaClinica) : null}
          {can('perfil') && can('perfil.conta') ? item('user-round', 'Minha conta', () => { ABA_CONFIG.v = 'conta'; ABA_CONFIG.subs.forEach((f) => f()); if (SB_ON) salvarPref({ filtros: { ...((PREF.v && PREF.v.filtros) || {}), 'config.aba': 'conta' } }); onNavigate('perfil'); }) : null}
          {s.suporte ? item('repeat', 'Trocar clínica', suporteVoltar) : null}
          <span style={{ height: 1, background: 'rgba(214,226,242,.9)', margin: '4px 6px' }} />
          {item('log-out', 'Sair', sair, '#E5484D')}
        </div>
      </div>
    </>
  );
}

/* ---------- Adicionar clínica: o mesmo login passa a ter mais uma clínica, como dono ---------- */
const NOVA_CLI = makeStore(false);
const abrirNovaClinica = () => { NOVA_CLI.v = true; NOVA_CLI.subs.forEach((f) => f()); };
const fecharNovaClinica = () => { NOVA_CLI.v = false; NOVA_CLI.subs.forEach((f) => f()); };
function NovaClinicaDialog() {
  const [aberto] = useStore(NOVA_CLI);
  const { Dialog: NDialog, Input: NInput, Button: NBtn, SegmentedControl: NSeg } = window.SaluteProjetoDesigner_8b4683;
  const vazio = { nome: '', tipoDoc: 'cnpj', doc: '', tel: '', endereco: '' };
  const [f, setF] = React.useState(vazio);
  const [fal, setFal] = React.useState({});
  const [erro, setErro] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  React.useEffect(() => { if (aberto) { setF(vazio); setFal({}); setErro(''); setBusy(false); } }, [aberto]);
  if (!aberto) return null;
  const set = (k, fmt) => (e) => { const v = fmt ? fmt(e.target.value) : e.target.value; setF((x) => ({ ...x, [k]: v })); setErro(''); if (fal[k]) setFal((x) => ({ ...x, [k]: null })); };
  const fechar = () => { if (!busy) fecharNovaClinica(); };
  const criar = async () => {
    const doc = f.tipoDoc === 'cnpj' ? fmtCNPJ(f.doc) : fmtCPF(f.doc), end = partesEndereco(f.endereco), tel = BR.tel(f.tel);
    const fx = {
      nome: f.nome.trim().length < 2 ? 'Informe o nome da clínica.' : null,
      doc: !(f.tipoDoc === 'cnpj' ? cnpjValido(doc) : cpfValido(doc)) ? (f.tipoDoc === 'cnpj' ? 'Confira o CNPJ.' : 'Confira o CPF.') : null,
      tel: !tel || soDig(f.tel).length < 10 ? 'Use DDD e número, por exemplo (19) 99800-4100.' : null,
      endereco: !end.logradouro || f.endereco.trim().length < 6 ? 'Informe rua, número, bairro e cidade.' : null,
    };
    setFal(fx);
    if (Object.values(fx).some(Boolean)) { setErro('Confira os campos destacados.'); return; }
    setBusy(true); setErro('');
    try {
      const p = SESSAO.v.perfil || {};
      const resp = [p.nome, p.sobrenome].filter(Boolean).join(' ') || null;
      const { data, error } = await SB.rpc('criar_clinica', { p_nome: f.nome.trim(), p_dados: { responsavel_nome: resp, [f.tipoDoc]: doc, telefone: tel, email: p.email || null, ...end } });
      if (error) throw error;
      // a lista de clínicas do login ganha a nova; abre direto nela
      SESSAO.v = { ...SESSAO.v, clinicas: [...(SESSAO.v.clinicas || []), { id: data, nome: f.nome.trim(), papel: 'dono', dono: true, funcao: 'Administradora' }] };
      fecharNovaClinica();
      await trocarClinica(data);
    } catch (e) { setErro(MSG_ERRO(e)); setBusy(false); }
  };
  const err = (k) => fal[k] || undefined;
  return ReactDOM.createPortal(
    <div style={{ fontFamily: 'var(--font-sans)' }}>
      <NDialog open onClose={fechar} icon="building-2" title="Adicionar clínica" description="A nova clínica começa com você como dono e com os dados separados das outras. Para trocar entre elas, toque no seu avatar." width={560}
        footer={<><NBtn variant="secondary" onClick={fechar}>Cancelar</NBtn><NBtn iconLeft="plus" loading={busy} onClick={criar}>Criar clínica</NBtn></>}>
        <form onSubmit={(e) => { e.preventDefault(); criar(); }} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <NInput label="Nome da clínica *" iconLeft="building-2" value={f.nome} onChange={set('nome')} autoComplete="organization" placeholder="Ex.: Clínica Bella Forma Campinas" error={err('nome')} autoFocus />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-strong)' }}>{f.tipoDoc === 'cnpj' ? 'CNPJ *' : 'CPF *'}</span>
              <NSeg size="sm" value={f.tipoDoc} onChange={(v) => { setF((x) => ({ ...x, tipoDoc: v, doc: v === 'cnpj' ? fmtCNPJ(x.doc) : fmtCPF(x.doc) })); setFal((x) => ({ ...x, doc: null })); }} options={[{ value: 'cnpj', label: 'CNPJ' }, { value: 'cpf', label: 'CPF' }]} />
            </div>
            <NInput iconLeft={f.tipoDoc === 'cnpj' ? 'landmark' : 'id-card'} value={f.doc} onChange={set('doc', f.tipoDoc === 'cnpj' ? fmtCNPJ : fmtCPF)} inputMode={f.tipoDoc === 'cnpj' ? 'text' : 'numeric'} placeholder={f.tipoDoc === 'cnpj' ? '00.000.000/0000-00' : '000.000.000-00'} aria-label={f.tipoDoc === 'cnpj' ? 'CNPJ' : 'CPF'} error={err('doc')} />
          </div>
          <NInput label="Telefone (WhatsApp) *" type="tel" iconLeft="phone" value={f.tel} onChange={set('tel', fmtTelBR)} autoComplete="tel-national" inputMode="tel" placeholder="(11) 99999-9999" error={err('tel')} />
          <NInput label="Endereço *" iconLeft="map-pin" value={f.endereco} onChange={set('endereco')} autoComplete="street-address" placeholder="Rua, número, bairro, cidade - UF" error={err('endereco')} />
          {erro ? <div role="alert" style={{ padding: '10px 14px', borderRadius: 14, background: 'rgba(229,72,77,.08)', color: '#C2272D', fontSize: 14, fontWeight: 500 }}>{erro}</div> : null}
          <button type="submit" style={{ display: 'none' }} aria-hidden="true" tabIndex={-1} />
        </form>
      </NDialog>
    </div>, document.body);
}

// aviso na tela enquanto a outra clínica abre
function TrocaAviso() {
  const [t] = useStore(TROCA);
  if (!t) return null;
  return ReactDOM.createPortal(
    <div role="status" aria-live="polite" style={{ position: 'fixed', inset: 0, zIndex: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, background: 'rgba(236,243,252,.66)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', fontFamily: 'var(--font-sans)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 22px', borderRadius: 22, background: 'rgba(255,255,255,.96)', border: '1.5px solid #fff', boxShadow: '0 26px 50px -22px rgba(23,73,170,.6)', fontSize: 15, fontWeight: 500, color: 'var(--text-strong)', maxWidth: '100%' }}>
        <span style={{ display: 'flex', color: '#1F5EFF', flexShrink: 0 }}><SIcon name="loader-circle" size={20} style={{ animation: 'sbgira 1s linear infinite' }} /></span>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Abrindo {t.nome || 'a clínica'}...</span>
        <style>{'@keyframes sbgira{to{transform:rotate(360deg)}}'}</style>
      </div>
    </div>, document.body);
}
// seta de sair ao lado do avatar (topo) e logo abaixo dele (barra lateral)
function BotaoSair({ variante }) {
  const { IconButton: XIcBtn } = window.SaluteProjetoDesigner_8b4683;
  if (variante === 'lateral') return <button type="button" onClick={sair} title="Sair" aria-label="Sair do sistema" style={{ marginTop: 12, width: 44, height: 44, borderRadius: '50%', flexShrink: 0, border: '1.5px solid rgba(255,255,255,.95)', background: 'rgba(255,255,255,.82)', color: '#5A6B8C', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 6px 16px -10px rgba(23,73,170,.35)', padding: 0 }} onMouseEnter={(e) => { e.currentTarget.style.color = '#E5484D'; e.currentTarget.style.background = '#fff'; }} onMouseLeave={(e) => { e.currentTarget.style.color = '#5A6B8C'; e.currentTarget.style.background = 'rgba(255,255,255,.82)'; }}><SIcon name="log-out" size={18} /></button>;
  return <XIcBtn icon="log-out" label="Sair" title="Sair" variant={variante === 'compacto' ? 'glass' : 'ghost'} size="md" onClick={sair} style={{ color: 'var(--text-strong)', flexShrink: 0 }} />;
}

/* ---------- Porta de entrada: decide entre login, carregando e o sistema ---------- */
function PortaSupabase({ children }) {
  const [s] = useStore(SESSAO);
  useStore(LANG);
  // fora do sistema o endereço mostra a tela de entrar (guardando a tela pedida) ou o Painel Master
  React.useEffect(() => {
    if (!ROTAS_URL || !SB_ON) return;
    const fora = s.recuperar || ['login', 'sem-clinica', 'bloqueado'].includes(s.estado);
    if (s.estado === 'master') { trocarUrl('master'); return; }
    if (!fora) return;
    const c = caminhoAtual();
    if (c === 'login' || c === 'cadastro') return;
    const volta = ROTA_TELA[c] ? '?volta=' + c : '';
    try { history.replaceState({ salute: 'login' }, '', (BASE_PATH || '') + '/login' + volta + (/access_token|error_description/.test(location.hash) ? location.hash : '')); } catch (e) {}
  }, [s.estado, s.recuperar]);
  if (!SB_ON || s.estado === 'pronto') return children;
  if (s.recuperar || s.estado === 'login' || s.estado === 'sem-clinica') return <TelaAcesso />;
  if (s.estado === 'master') return <PainelMaster />;
  if (s.estado === 'erro') {
    const { EmptyState: PEmpty, Button: PBtn } = window.SaluteProjetoDesigner_8b4683;
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: 'var(--font-sans)' }}><PEmpty icon="cloud-off" title="Não foi possível conectar ao banco" description={s.erro} action={<div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}><PBtn iconLeft="refresh-cw" onClick={carregarContexto}>Tentar de novo</PBtn><PBtn variant="secondary" onClick={sair}>Sair</PBtn></div>} style={{ maxWidth: 440 }} /></div>;
  }
  if (s.estado === 'bloqueado') {
    const { EmptyState: PEmpty, Button: PBtn } = window.SaluteProjetoDesigner_8b4683;
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, fontFamily: 'var(--font-sans)' }}><PEmpty icon="lock" title="Seu acesso está pausado" description="O acesso deste login à clínica foi bloqueado. Fale com o dono da clínica ou com o suporte da Salute para liberar de novo." action={<PBtn variant="secondary" iconLeft="log-out" onClick={sair}>Sair</PBtn>} style={{ maxWidth: 440 }} /></div>;
  }
  return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontFamily: 'var(--font-sans)', color: 'var(--text-muted)', fontSize: 15 }}><SIcon name="loader-circle" size={20} style={{ animation: 'sbgira 1s linear infinite' }} />Abrindo a clínica...<style>{'@keyframes sbgira{to{transform:rotate(360deg)}}'}</style></div>;
}

Object.assign(window, { SB, SB_ON, SB_CFG, SESSAO, CLI, UID, DB, ARQ, useArqUrl, tempoReal, CARGAS, carregar, useCarga, CargaEstado, BR, ENUM, ek, el, DBID, CAT, catSet, catId, catNome, porNome, PREF, salvarPref, usePrefFiltro, sair, trocarClinica, carregarContexto, PortaSupabase, AvisoDemo, AvisoGravacao, avisoErro, avisoOk, bg, SALVA, suporteEntrar, suporteVoltar, PainelMaster, AvisoSuporte, SemAcesso, ContaMenu, BotaoSair, abrirConta, fecharConta, CONTA, ABA_CONFIG, TelaAcesso, partesEndereco, cpfValido, cnpjValido, fmtCNPJ, fmtCPF, fmtTelBR, TROCA, NOVA_CLI, abrirNovaClinica, NovaClinicaDialog, TrocaAviso, BASE_PATH, ROTAS_URL, ROTA_TELA, urlApp, voltaAuth, caminhoAtual, caminhoDaTela, trocarUrl, rotaInicialUrl, SincronizaUrl });
