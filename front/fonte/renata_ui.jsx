/* =====================================================================
   RENATA IA · chat no estilo ChatGPT, com conversa por voz
   ===================================================================== */
const { Icon: RIcon } = window.SaluteProjetoDesigner_8b4683;
const RN_FRAMED = (() => { try { return window.top !== window.self; } catch (e) { return true; } })();
const RN_POPUP = !RN_FRAMED && /renata-voz/.test(location.hash);
const RN_OPENER = (() => { try { return RN_POPUP && window.opener && window.opener !== window ? window.opener : null; } catch (e) { return null; } })();
const RN_CAN_POP = RN_FRAMED && /^https?:/.test(location.href);
const RN_STORE = makeStore({ open: RN_POPUP, msgs: [], nav: 0 });
const RN_AI = makeStore(lsGet('salute-kit:renata-ia', { key: '' }));
/* Voz oficial da Renata (ElevenLabs), definida pelo Kevin. A Renata sempre fala com esta voz;
   a voz do aparelho só entra como reserva quando a ElevenLabs não está acessível. */
const RN_VOZ_OFICIAL = 'RGymW84CSmfVugnA5tvA';
const RN_VOICE = makeStore((() => { const s = lsGet('salute-kit:renata-voz', {}) || {}; return { key: s.key || '', voiceId: s.voiceId || RN_VOZ_OFICIAL, model: s.model || 'eleven_flash_v2_5' }; })());
(function rnStyles() {
  if (document.getElementById('rn-styles')) return;
  const st = document.createElement('style'); st.id = 'rn-styles';
  st.textContent = `
  @keyframes rnSpin { to { transform: rotate(360deg); } }
  @keyframes rnBreath { 0%,100% { transform: scale(1); } 50% { transform: scale(1.045); } }
  @keyframes rnTalk { 0%,100% { transform: scale(1); } 25% { transform: scale(1.09); } 55% { transform: scale(.97); } 75% { transform: scale(1.06); } }
  @keyframes rnThink { 0%,100% { transform: scale(.94); opacity:.9 } 50% { transform: scale(1.02); opacity:1 } }
  @keyframes rnDot { 0%,80%,100% { opacity:.25; transform: translateY(0) } 40% { opacity:1; transform: translateY(-3px) } }
  @keyframes rnPulse { 0% { box-shadow: 0 0 0 0 rgba(79,123,230,.45) } 70% { box-shadow: 0 0 0 8px rgba(79,123,230,0) } 100% { box-shadow: 0 0 0 0 rgba(79,123,230,0) } }
  @keyframes rnCaret { 50% { opacity: 0 } }
  .rn-md p { margin: 0 0 10px } .rn-md p:last-child { margin-bottom: 0 } .rn-md ul, .rn-md ol { margin: 4px 0 10px; padding-left: 22px } .rn-md li { margin: 3px 0 } .rn-md strong { font-weight: 600; color: var(--text-strong) }
  .rn-act { width: 32px; height: 32px; border-radius: 8px; border: 0; background: transparent; color: var(--text-muted); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; padding: 0 }
  .rn-act:hover { background: rgba(31,94,255,.08); color: var(--text-strong) }
  .rn-sug:hover { background: rgba(255,255,255,.95) !important; border-color: rgba(31,94,255,.25) !important }
  `;
  document.head.appendChild(st);
})();

function RenataOrb({ size = 40, state = 'idle' }) {
  const anim = state === 'speaking' ? 'rnTalk .9s ease-in-out infinite' : state === 'thinking' ? 'rnThink 1.4s ease-in-out infinite' : state === 'listening' ? 'rnBreath 2.4s ease-in-out infinite' : 'none';
  return (
    <span aria-hidden="true" style={{ position: 'relative', display: 'inline-block', width: size, height: size, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, animation: anim, boxShadow: size > 60 ? '0 30px 60px -20px rgba(31,94,255,.55), inset 0 0 30px rgba(255,255,255,.35)' : '0 4px 12px -4px rgba(31,94,255,.6)' }}>
      <span style={{ position: 'absolute', inset: '-25%', background: 'conic-gradient(from 0deg, #2B4CFF, #6E8BFF, #E9EEFF, #9DB8F2, #4F7BE6, #7B4BC4, #2B4CFF)', filter: `blur(${Math.max(2, size / 9)}px)`, animation: `rnSpin ${state === 'thinking' ? 2.2 : 7}s linear infinite` }} />
      <span style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 32% 26%, rgba(255,255,255,.95) 0%, rgba(255,255,255,.35) 26%, rgba(255,255,255,0) 52%)' }} />
      <span style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 70% 80%, rgba(11,40,160,.35), rgba(11,40,160,0) 60%)' }} />
    </span>
  );
}

function RenataButton({ mobile }) {
  const [st, setSt] = useStore(RN_STORE);
  return (
    <button type="button" onClick={() => setSt({ ...st, open: true })} aria-label="Conversar com a Renata IA" title="Pergunte à Renata"
      style={{ position: 'relative', width: 40, height: 40, borderRadius: '50%', border: 0, padding: 0, cursor: 'pointer', background: 'transparent', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, animation: st.msgs.length ? 'none' : 'rnPulse 2.6s ease-out infinite' }}>
      <RenataOrb size={mobile ? 34 : 36} />
      <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', filter: 'drop-shadow(0 1px 2px rgba(11,40,160,.6))' }}><RIcon name="sparkles" size={mobile ? 15 : 16} strokeWidth={2.2} /></span>
    </button>
  );
}

function rnMd(text) {
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const inline = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/(^|[^*])\*(?!\s)(.+?)\*(?!\*)/g, '$1<em>$2</em>');
  const lines = String(text || '').split('\n'); let html = '', list = null, para = [];
  const flushP = () => { if (para.length) { html += '<p>' + para.map(inline).join('<br/>') + '</p>'; para = []; } };
  const flushL = () => { if (list) { html += `<${list.t}>` + list.items.map((x) => '<li>' + inline(x) + '</li>').join('') + `</${list.t}>`; list = null; } };
  lines.forEach((ln) => {
    const ul = ln.match(/^\s*[-•*]\s+(.*)$/), ol = ln.match(/^\s*\d+[.)]\s+(.*)$/), h = ln.match(/^\s*#{1,4}\s+(.*)$/);
    if (ul || ol) { flushP(); const t = ul ? 'ul' : 'ol'; if (!list || list.t !== t) { flushL(); list = { t, items: [] }; } list.items.push((ul || ol)[1]); }
    else if (!ln.trim()) { flushP(); flushL(); }
    else if (h) { flushP(); flushL(); html += '<p><strong>' + inline(h[1]) + '</strong></p>'; }
    else { flushL(); para.push(ln); }
  });
  flushP(); flushL(); return html;
}
const rnPlain = (t) => String(t || '').replace(/\*\*/g, '').replace(/^\s*[-•*]\s+/gm, '').replace(/#+\s/g, '').replace(/R\$\s?/g, 'R$ ');

/* ---------- fala: texto pronto para ser falado ---------- */
function rnSpeech(text, show) {
  let t = String(text || '');
  t = t.split('\n').map((l) => { const m = l.match(/^\s*(?:[-•*]|\d+[.)])\s+(.*)$/); return m ? m[1].replace(/[.;:,]?\s*$/, '.') : l; }).join('\n');
  t = t.replace(/\*\*/g, '').replace(/(^|\s)\*(\S)/g, '$1$2').replace(/#+\s/g, '').replace(/[>`_]/g, ' ');
  if (!show) {
  t = t.replace(/R\$\s?([\d.]+),(\d{2})/g, (m, a, c) => a.replace(/\./g, '') + ' reais' + (c !== '00' ? ' e ' + (+c) + ' centavos' : ''));
  t = t.replace(/R\$\s?([\d.]+)/g, (m, a) => a.replace(/\./g, '') + ' reais');
  t = t.replace(/\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/g, (m, d, mo, y) => (+mo >= 1 && +mo <= 12 ? (+d) + ' de ' + MESL[+mo - 1] + (y !== '2026' ? ' de ' + y : '') : m));
  t = t.replace(/\b(\d{1,2})\/(\d{1,2})\b/g, (m, d, mo) => (+mo >= 1 && +mo <= 12 && +d <= 31 ? (+d) + ' de ' + MESL[+mo - 1] : m));
  t = t.replace(/\b(\d{1,2}):(\d{2})\b/g, (m, hh, mi) => (+hh) + (mi === '00' ? (+hh === 1 ? ' hora' : ' horas') : ' e ' + (+mi)));
  t = t.replace(/\bDra\.\s?/g, 'Doutora ').replace(/\bDr\.\s?/g, 'Doutor ').replace(/\s·\s/g, ', ').replace(/\(([^)]*)\)/g, ', $1,');
  }
  return t.replace(/:\s*\n+\s*/g, ', ').replace(/\s*\n+\s*/g, ' ').replace(/:\s/g, ', ').replace(/\s+([,.])/g, '$1').replace(/,\s*([,.?!])/g, '$1').replace(/\.\s*\./g, '.').replace(/\s{2,}/g, ' ').trim();
}
function rnVoice(text) {
  const lines = String(text || '').split('\n').map((l) => l.trim()).filter(Boolean);
  const isItem = (l) => /^(?:[-•*]|\d+[.)])\s+/.test(l);
  const items = lines.filter(isItem);
  if (items.length <= 3) return { now: rnSpeech(text), nowShow: rnSpeech(text, true), rest: '', restShow: '' };
  const first = lines.findIndex(isItem);
  const after = lines.slice(first).filter((l) => !isItem(l));
  const a = lines.slice(0, first).concat(items.slice(0, 3)).join('\n'), b = items.slice(3).concat(after).join('\n');
  return { now: rnSpeech(a) + ' Quer que eu continue?', nowShow: rnSpeech(a, true) + ' Quer que eu continue?', rest: rnSpeech(b), restShow: rnSpeech(b, true) };
}

/* ---------- voz da Renata ---------- */
const RN_SILENT = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
const RN_PLAYER = typeof Audio !== 'undefined' ? new Audio() : null;
let __rnTok = 0;
function rnUnlockAudio() {
  try { if (window.speechSynthesis) { const u = new SpeechSynthesisUtterance(' '); u.volume = 0; speechSynthesis.speak(u); } } catch (e) {}
  try { if (RN_PLAYER) { RN_PLAYER.src = RN_SILENT; const p = RN_PLAYER.play(); p && p.catch(() => {}); } } catch (e) {}
}
function rnPickVoice() {
  if (!window.speechSynthesis) return null;
  const vs = speechSynthesis.getVoices(); const pt = vs.filter((v) => /pt[-_]BR/i.test(v.lang));
  const fem = /luciana|francisca|maria|thalita|vit[oó]ria|camila|fernanda|helena|leila|raquel|female|feminina|google portugu/i, male = /felipe|daniel|ricardo|ant[oô]nio|male\b|masculin/i;
  return pt.find((v) => fem.test(v.name)) || pt.find((v) => !male.test(v.name)) || pt[0] || vs.find((v) => /^pt/i.test(v.lang)) || null;
}
function rnStopSpeak() { __rnTok++; try { window.speechSynthesis && speechSynthesis.cancel(); } catch (e) {} try { if (RN_PLAYER && !RN_PLAYER.paused) RN_PLAYER.pause(); } catch (e) {} }
async function rnSpeak(text, onEnd) {
  rnStopSpeak(); const tok = __rnTok; let ended = false;
  const done = () => { if (ended || tok !== __rnTok) return; ended = true; onEnd && onEnd(); };
  const t = rnSpeech(text).slice(0, 1600); const cfg = RN_VOICE.v;
  if (!t) { done(); return 'none'; }
  if (cfg.key && cfg.voiceId && RN_PLAYER) {
    try {
      const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(cfg.voiceId)}?output_format=mp3_44100_128`, { method: 'POST', headers: { 'xi-api-key': cfg.key, 'Content-Type': 'application/json', Accept: 'audio/mpeg' }, body: JSON.stringify({ text: t, model_id: cfg.model || 'eleven_flash_v2_5', ...(/v2_5/.test(cfg.model || 'eleven_flash_v2_5') ? { language_code: 'pt' } : {}), voice_settings: { stability: 0.45, similarity_boost: 0.8, style: 0.2 } }) });
      if (!r.ok) throw new Error('ElevenLabs ' + r.status);
      const url = URL.createObjectURL(await r.blob());
      if (tok !== __rnTok) return 'eleven';
      RN_PLAYER.onended = () => done(); RN_PLAYER.onerror = () => done();
      RN_PLAYER.src = url; await RN_PLAYER.play(); return 'eleven';
    } catch (e) { if (tok !== __rnTok) return 'eleven'; }
  }
  if (!window.speechSynthesis) { done(); return 'none'; }
  const chunks = []; let cur = '';
  (t.match(/[^.!?]+[.!?]*/g) || [t]).forEach((x) => { if (cur && (cur + x).length > 200) { chunks.push(cur); cur = x; } else cur += x; });
  if (cur.trim()) chunks.push(cur);
  const go = () => {
    if (tok !== __rnTok) return;
    const v = rnPickVoice();
    chunks.forEach((c, i) => {
      const u = new SpeechSynthesisUtterance(c.trim()); if (v) u.voice = v; u.lang = 'pt-BR'; u.rate = 1.06; u.pitch = 1.05;
      if (i === chunks.length - 1) u.onend = done;
      u.onerror = (e) => { if (i === chunks.length - 1 && e.error !== 'interrupted' && e.error !== 'canceled') done(); };
      speechSynthesis.speak(u);
    });
    const guard = () => { if (tok !== __rnTok || ended) return; if (speechSynthesis.speaking || speechSynthesis.pending) setTimeout(guard, 700); else done(); };
    setTimeout(guard, Math.max(2500, t.length * 55));
  };
  if (!speechSynthesis.getVoices().length) { let fired = false; const f = () => { if (fired) return; fired = true; go(); }; speechSynthesis.onvoiceschanged = () => { speechSynthesis.onvoiceschanged = null; f(); }; setTimeout(f, 500); } else go();
  return 'browser';
}

/* ---------- microfone ---------- */
const RN_SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const RN_IS_MOBILE = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const RN_BARGE = !!RN_SR && !RN_IS_MOBILE && /Chrome|Edg\//.test(navigator.userAgent);
const RN_MIC_MSG = {
  frame: RN_CAN_POP ? 'Dentro do link do Claude o sistema fica numa moldura que não recebe o microfone. Abra a conversa por voz em tela própria e fale com a Renata normalmente.' : 'Aqui a página não recebe acesso ao microfone. Abra o sistema pelo seu domínio para conversar por voz. Enquanto isso, dá para digitar.',
  dictation: 'O reconhecimento de voz do aparelho está desligado. No iPhone, ative em Ajustes, Geral, Teclado, Ativar Ditado. Depois toque em Tentar de novo.',
  denied: 'O microfone está bloqueado para este site. Toque no cadeado ao lado do endereço, permita o Microfone e depois toque em Tentar de novo.',
  nomic: 'Não encontrei nenhum microfone neste aparelho. Conecte um e toque em Tentar de novo.',
  busy: 'O microfone está em uso por outro app. Feche o outro app e toque em Tentar de novo.',
  https: 'O microfone só funciona em endereço seguro (https). Abra o sistema pelo endereço com https.',
  nostt: 'Este navegador não transforma voz em texto. Use o Chrome, o Edge ou o Safari, ou conecte a ElevenLabs nas conexões da Renata.',
  network: 'O reconhecimento de voz precisa de internet. Confira a conexão e toque em Tentar de novo.',
  eleven: 'Não consegui transcrever sua voz pela ElevenLabs. Confira a chave nas conexões da Renata e toque em Tentar de novo.',
};
const RN_RETRY = ['denied', 'nomic', 'busy', 'network', 'eleven', 'dictation'];
async function rnMicCheck(keep) {
  if (!window.isSecureContext) return { ok: false, why: 'https' };
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return { ok: false, why: 'frame' };
  try { const fp = document.permissionsPolicy || document.featurePolicy; if (fp && fp.allowsFeature && !fp.allowsFeature('microphone')) return { ok: false, why: 'frame' }; } catch (e) {}
  try {
    const s = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true } });
    if (!keep) s.getTracks().forEach((x) => x.stop());
    return { ok: true, stream: keep ? s : null };
  } catch (e) {
    const n = e && e.name;
    return { ok: false, why: n === 'NotFoundError' || n === 'OverconstrainedError' ? 'nomic' : n === 'NotReadableError' || n === 'AbortError' ? 'busy' : n === 'SecurityError' ? 'frame' : 'denied' };
  }
}

/* ---------- cérebro: Claude no link do Claude, chave própria no seu domínio, ou demonstração ---------- */
let __rnSample, __rnSampleOK = false;
const rnGetSample = () => { if (__rnSample !== undefined) return __rnSample; __rnSample = (window.claude && window.claude.use) ? window.claude.use('sample').catch(() => null) : Promise.resolve(null); return __rnSample; };
const RN_MODE = makeStore('checking');
let __rnBridge = null, __rnBridgeOK = false, __rnPop = null, __rnPerm;
const rnRefreshMode = () => { RN_MODE.v = __rnSampleOK || __rnBridgeOK ? 'ia' : (RN_AI.v.key ? 'api' : 'demo'); RN_MODE.subs.forEach((f) => f()); };
/* aba própria (fora da moldura do Claude): ouve e fala aqui, e pede a resposta da IA para a aba do Claude que a abriu */
function rnBridge() {
  if (__rnBridge) return __rnBridge;
  __rnBridge = new Promise((res) => {
    if (!RN_OPENER) return res(false);
    let done = false;
    const on = (ev) => { if (ev.source === RN_OPENER && ev.data && ev.data.type === 'rn-hello-ack') { done = true; window.removeEventListener('message', on); res(!!ev.data.ia); } };
    window.addEventListener('message', on);
    try { RN_OPENER.postMessage({ type: 'rn-hello' }, '*'); } catch (e) { res(false); }
    setTimeout(() => { if (!done) { window.removeEventListener('message', on); res(false); } }, 2500);
  });
  return __rnBridge;
}
function rnAskBridge(history, { voice, onText, signal }) {
  return new Promise((res, rej) => {
    const id = Math.random().toString(36).slice(2);
    const on = (ev) => {
      if (ev.source !== RN_OPENER || !ev.data || ev.data.id !== id) return;
      if (ev.data.type === 'rn-part') onText(ev.data.text);
      if (ev.data.type === 'rn-answer') { window.removeEventListener('message', on); if (ev.data.error) return rej({ code: 'bridge' }); if (ev.data.pending) rnSetPending(ev.data.pending); res({ text: ev.data.text, mode: 'ia', pending: ev.data.pending || null, resolved: ev.data.resolved || null }); }
    };
    window.addEventListener('message', on);
    if (signal) signal.addEventListener('abort', () => { window.removeEventListener('message', on); rej({ code: 'cancelled' }); });
    try { RN_OPENER.postMessage({ type: 'rn-ask', id, voice: !!voice, history: history.slice(-12).map((m) => ({ role: m.role, content: m.content })) }, '*'); } catch (e) { window.removeEventListener('message', on); rej({ code: 'bridge' }); }
  });
}
window.addEventListener('message', async (ev) => {
  const d = ev.data; if (!__rnPop || ev.source !== __rnPop || !d || typeof d !== 'object') return;
  const reply = (o) => { try { ev.source.postMessage(o, '*'); } catch (e) {} };
  if (d.type === 'rn-hello') { const s = await rnGetSample(); reply({ type: 'rn-hello-ack', ia: !!s }); }
  else if (d.type === 'rn-clear') rnSetPending(null);
  else if (d.type === 'rn-ask' && Array.isArray(d.history)) {
    const hist = d.history.filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content).slice(-12);
    if (!hist.length || hist[hist.length - 1].role !== 'user') return reply({ type: 'rn-answer', id: d.id, error: true });
    try { const r = await rnAnswer(hist, { voice: !!d.voice, onText: (t) => reply({ type: 'rn-part', id: d.id, text: t }) }); reply({ type: 'rn-answer', id: d.id, text: r.text, pending: r.pending || null, resolved: r.resolved || null }); }
    catch (e) { reply({ type: 'rn-answer', id: d.id, error: true }); }
  }
});
function rnPopOut() { let w = null; try { w = window.open(location.href.split('#')[0] + '#renata-voz', '_blank'); } catch (e) {} if (w) __rnPop = w; return !!w; }
const rnPerm = () => __rnPerm || (__rnPerm = window.claude && window.claude.use ? window.claude.use('permissions').catch(() => null) : Promise.resolve(null));
async function rnSampleState() { const s = await rnGetSample(); if (!s) return 'none'; const p = await rnPerm(); if (!p) return 'granted'; try { return await p.state('sample'); } catch (e) { return 'granted'; } }
rnGetSample().then((s) => { __rnSampleOK = !!s; rnRefreshMode(); if (!s && RN_OPENER) rnBridge().then((ok) => { __rnBridgeOK = ok; rnRefreshMode(); }); });
const RN_TOOL_LABEL = { propor_lancamento_financeiro: 'Preparando o lançamento', propor_movimentacao_estoque: 'Preparando a movimentação', financeiro_periodo: 'Consultando o financeiro', agenda_do_dia: 'Abrindo a agenda', dados_paciente: 'Lendo o prontuário', lancamentos: 'Buscando lançamentos', abrir_tela: 'Abrindo a tela' };
const RN_MODELS = { chat: ['claude-sonnet-5-5', 'claude-sonnet-4-5'], voz: ['claude-haiku-4-5-20251001', 'claude-sonnet-5-5'] };
const rnApiHeaders = (key) => ({ 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json', 'anthropic-dangerous-direct-browser-access': 'true' });
const rnApiWhy = (st) => st === 401 ? 'chave inválida' : st === 403 ? 'chave sem permissão' : st === 429 ? 'limite de uso atingido' : st === 529 || st === 503 ? 'IA sobrecarregada no momento' : st ? 'erro ' + st : 'sem acesso à internet ou à API';
async function rnClaudeApi(history, { voice, onText, signal, onTool }) {
  const key = RN_AI.v.key; const models = voice ? RN_MODELS.voz : RN_MODELS.chat; let mi = 0;
  const system = [{ type: 'text', text: RENATA_RULES(voice) + rnSnapshot(), cache_control: { type: 'ephemeral' } }];
  const tools = RENATA_TOOLS.map((t) => ({ name: t.name, description: t.description, input_schema: t.inputSchema }));
  const msgs = [];
  history.slice(-14).forEach((m) => { if (!msgs.length && m.role !== 'user') return; const last = msgs[msgs.length - 1]; if (last && last.role === m.role) last.content += '\n\n' + m.content; else msgs.push({ role: m.role, content: m.content }); });
  let all = '';
  for (let round = 0; round < 6; round++) {
    let res;
    try { res = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', signal, headers: rnApiHeaders(key), body: JSON.stringify({ model: models[mi], max_tokens: voice ? 450 : 1400, system, tools, messages: msgs, stream: true }) }); }
    catch (e) { if (e && e.name === 'AbortError') throw { code: 'cancelled', text: all }; throw { code: 'api', why: rnApiWhy(0), text: all }; }
    if (!res.ok) { if (res.status === 404 && mi < models.length - 1) { mi++; round--; continue; } throw { code: 'api', why: rnApiWhy(res.status), text: all }; }
    const reader = res.body.getReader(), dec = new TextDecoder(); let buf = '', stop = null; const blocks = []; const base = all ? all + '\n\n' : ''; let roundText = '';
    try {
      for (;;) {
        const { value, done } = await reader.read(); if (done) break;
        buf += dec.decode(value, { stream: true }); let k;
        while ((k = buf.indexOf('\n\n')) >= 0) {
          const ev = buf.slice(0, k); buf = buf.slice(k + 2);
          const line = ev.split('\n').find((l) => l.startsWith('data:')); if (!line) continue;
          let d; try { d = JSON.parse(line.slice(5).trim()); } catch (e) { continue; }
          if (d.type === 'content_block_start') { blocks[d.index] = { ...d.content_block, text: d.content_block.text || '', json: '' }; if (d.content_block.type === 'tool_use') onTool && onTool(RN_TOOL_LABEL[d.content_block.name] || 'Consultando'); }
          else if (d.type === 'content_block_delta' && blocks[d.index]) { if (d.delta.type === 'text_delta') { blocks[d.index].text += d.delta.text; roundText += d.delta.text; onText(base + roundText); } else if (d.delta.type === 'input_json_delta') blocks[d.index].json += d.delta.partial_json; }
          else if (d.type === 'message_delta') stop = d.delta && d.delta.stop_reason;
          else if (d.type === 'error') throw { code: 'api', why: (d.error && d.error.type === 'overloaded_error') ? rnApiWhy(529) : 'erro na resposta', text: base + roundText };
        }
      }
    } catch (e) { if (e && e.name === 'AbortError') throw { code: 'cancelled', text: base + roundText }; throw e.code ? e : { code: 'api', why: rnApiWhy(0), text: base + roundText }; }
    if (roundText.trim()) all = base + roundText;
    const content = blocks.filter(Boolean).map((b) => b.type === 'text' ? { type: 'text', text: b.text } : b.type === 'tool_use' ? { type: 'tool_use', id: b.id, name: b.name, input: (() => { try { return JSON.parse(b.json || '{}'); } catch (e) { return {}; } })() } : null).filter((b) => b && (b.type !== 'text' || b.text.trim()));
    if (stop !== 'tool_use') return all;
    msgs.push({ role: 'assistant', content });
    msgs.push({ role: 'user', content: content.filter((b) => b.type === 'tool_use').map((b) => { const t = RENATA_TOOLS.find((x) => x.name === b.name); let out; try { out = t ? t.execute(b.input) : { erro: 'ferramenta desconhecida' }; } catch (e) { out = { erro: String(e && e.message || e) }; } return { type: 'tool_result', tool_use_id: b.id, content: JSON.stringify(out).slice(0, 24000) }; }) });
  }
  return all;
}
async function rnTestApi(key) {
  for (const m of RN_MODELS.voz) {
    try {
      const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: rnApiHeaders(key), body: JSON.stringify({ model: m, max_tokens: 8, messages: [{ role: 'user', content: 'Responda apenas: ok' }] }) });
      if (r.ok) return { ok: true };
      if (r.status !== 404) return { ok: false, why: rnApiWhy(r.status) };
    } catch (e) { return { ok: false, why: rnApiWhy(0) }; }
  }
  return { ok: false, why: 'modelo indisponível' };
}
async function rnStream(t, onText, signal) {
  const parts = t.split(/(\s+)/); let out = '';
  for (let i = 0; i < parts.length; i++) {
    if (signal && signal.aborted) throw { code: 'cancelled', text: out };
    out += parts[i]; if (i % 4 === 3) { onText(out); await new Promise((r) => setTimeout(r, 30)); }
  }
  onText(t);
}
async function rnAnswer(history, opts) {
  const question = history[history.length - 1].content;
  const a = RN_PENDING.v;
  if (a && rnIsYes(question)) {
    const t = rnApply(a); rnSetPending(null);
    if (RN_OPENER) { try { RN_OPENER.postMessage({ type: 'rn-clear' }, '*'); } catch (e) {} }
    opts.onText(t); return { text: t, mode: 'acao', resolved: { id: a.id, state: 'ok' } };
  }
  if (a && rnIsNo(question)) { rnSetPending(null); const t = 'Tudo bem, não lancei nada. Se quiser, me fala o lançamento do jeito certo.'; opts.onText(t); return { text: t, mode: 'acao', resolved: { id: a.id, state: 'cancel' } }; }
  const before = RN_PENDING.v;
  const r = await rnAnswerCore(history, opts);
  if (RN_PENDING.v && RN_PENDING.v !== before && !r.pending) r.pending = RN_PENDING.v;
  return r;
}
async function rnAnswerCore(history, { voice, onText, signal, onTool }) {
  const sample = await rnGetSample();
  const question = history[history.length - 1].content;
  const demo = async (prefix) => { await new Promise((r) => setTimeout(r, prefix ? 0 : voice ? 250 : 450)); const la = rnLocalAction(question); const t = (prefix || '') + (la ? la.text : renataLocal(question)); if (voice) onText(t); else await rnStream(t, onText, signal); return { text: t, mode: 'demo' }; };
  if (!sample) {
    if (RN_OPENER && await rnBridge()) { try { return await rnAskBridge(history, { voice, onText, signal }); } catch (e) { if (e && e.code === 'cancelled') throw e; } }
    if (!RN_AI.v.key) return demo();
    try { const t = await rnClaudeApi(history, { voice, onText, signal, onTool }); return { text: t, mode: 'api' }; }
    catch (e) { if (e && e.code === 'cancelled') throw e; return demo(`A conexão com a IA falhou (${e.why || 'erro'}). Respondi pelo modo demonstração:\n\n`); }
  }
  const turns = [{ role: 'user', content: RENATA_RULES(voice) + rnSnapshot() }, ...history.slice(-12).map((m) => ({ role: m.role, content: m.content }))];
  let tools; try { const lim = await sample.limits(); if (lim && lim.tools) tools = RENATA_TOOLS.map((t) => ({ ...t, execute: (i) => { onTool && onTool(RN_TOOL_LABEL[t.name] || 'Consultando'); return t.execute(i); } })); } catch (e) {}
  if (!tools) { const la = rnLocalAction(question); if (la) { onText(la.text); return { text: la.text, mode: 'ia' }; } }
  try {
    const res = await sample(turns, { onText: ({ text }) => onText(text), signal, modelTier: voice ? 'quick' : 'default', ...(tools ? { tools } : { cache: false }) });
    return { text: res.text, mode: 'ia' };
  } catch (e) {
    if (e && e.code === 'cancelled') throw e;
    if (e && ['not_granted', 'sampling_disabled', 'not_declared', 'capability_disabled', 'capability_removed', 'tools_unavailable'].includes(e.code)) { __rnSampleOK = false; __rnSample = Promise.resolve(null); rnRefreshMode(); return RN_AI.v.key ? rnAnswer(history, { voice, onText, signal, onTool }) : demo(); }
    const keep = e && e.text ? e.text + '\n\n' : '';
    const msg = e && e.code === 'rate_limited' ? 'Muitas perguntas seguidas. Espere um pouco e tente de novo.' : 'Não consegui terminar a resposta agora. Tente de novo.';
    onText(keep + msg); return { text: keep + msg, mode: 'erro' };
  }
}

const RN_SUGS = [
  ['calendar-days', 'Qual é a minha agenda de hoje?'], ['banknote', 'Quanto faturei nos últimos 30 dias?'], ['package', 'O que está em falta no estoque?'],
  ['user-round', 'Como foi o atendimento da Mariana Alves?'], ['triangle-alert', 'Qual a taxa de inadimplência?'], ['chart-column', 'Qual canal traz mais leads?'],
];

/* ---------- conexões da Renata ---------- */
function RenataSettings({ onClose }) {
  const [cfg, setCfg] = useStore(RN_VOICE);
  const [ai, setAi] = useStore(RN_AI);
  const [mode] = useStore(RN_MODE);
  const [f, setF] = React.useState(cfg);
  const [k, setK] = React.useState(ai.key || '');
  const [test, setTest] = React.useState(null);
  const [aiTest, setAiTest] = React.useState(null);
  const save = () => { const fv = { ...f, voiceId: f.voiceId || RN_VOZ_OFICIAL }; setCfg(fv); lsSet('salute-kit:renata-voz', fv); const nk = { key: k.trim() }; setAi(nk); lsSet('salute-kit:renata-ia', nk); rnRefreshMode(); onClose(); };
  const inp = { height: 42, borderRadius: 12, border: '1.5px solid rgba(214,226,242,.95)', background: '#fff', padding: '0 12px', fontFamily: 'inherit', fontSize: 14, color: 'var(--text-strong)', outline: 'none', width: '100%', boxSizing: 'border-box' };
  const lab = { display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, color: 'var(--text-muted)' };
  const sec = { display: 'flex', flexDirection: 'column', gap: 10, padding: 14, borderRadius: 18, background: 'rgba(255,255,255,.6)', border: '1.5px solid rgba(255,255,255,.95)' };
  const btn2 = { height: 38, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(214,226,242,.95)', background: '#fff', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 500, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-strong)' };
  const note = { fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 };
  const head = (icon, t, s) => <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(31,94,255,.08)', color: '#1F5EFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><RIcon name={icon} size={17} /></span><div style={{ minWidth: 0 }}><b style={{ display: 'block', fontSize: 14.5, color: 'var(--text-strong)' }}>{t}</b><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{s}</span></div></div>;
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 5, background: 'rgba(14,35,80,.25)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 16, overflowY: 'auto' }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(480px,100%)', marginTop: 24, borderRadius: 24, background: 'linear-gradient(180deg,#F5F9FF,#EAF2FD)', boxShadow: '0 30px 60px -30px rgba(23,73,170,.6)', padding: 18, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><b style={{ fontSize: 18, color: 'var(--text-strong)' }}>Conexões da Renata</b><button type="button" className="rn-act" aria-label="Fechar conexões" onClick={onClose}><RIcon name="x" size={18} /></button></div>
        <div style={sec}>
          {head('brain', 'Inteligência', mode === 'ia' ? 'Conectada pelo Claude neste link' : k.trim() ? 'Claude conectado com a sua chave' : 'Modo demonstração, sem IA conectada')}
          {mode === 'ia' ? <span style={note}>Aqui dentro do Claude a Renata já usa IA de verdade. A chave abaixo é para o sistema no seu domínio.</span> : null}
          <label style={lab}>Chave da API do Claude<input type="password" style={inp} value={k} onChange={(e) => { setK(e.target.value); setAiTest(null); }} placeholder="Cole a chave criada no Anthropic Console" autoComplete="off" /></label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <button type="button" style={btn2} disabled={!k.trim()} onClick={async () => { setAiTest('Testando...'); const r = await rnTestApi(k.trim()); setAiTest(r.ok ? 'Conectada. A Renata já responde com IA.' : 'Não conectou: ' + r.why + '.'); }}><RIcon name="plug" size={14} />Testar conexão</button>
            {aiTest ? <span style={{ fontSize: 12.5, color: /^Conectada/.test(aiTest) ? '#1E9E57' : 'var(--text-muted)' }}>{aiTest}</span> : null}
          </div>
          <span style={note}>Fica salva só neste aparelho, para teste. Na versão final a chave fica no servidor.</span>
        </div>
        <div style={sec}>
          {head('audio-lines', 'Voz da Renata', f.key ? 'ElevenLabs conectada, voz oficial da Renata' : 'Falta a chave da ElevenLabs para usar a voz oficial')}
          <label style={lab}>ID da voz (Voice ID)<input style={inp} value={f.voiceId} onChange={(e) => setF({ ...f, voiceId: e.target.value.trim() })} placeholder={RN_VOZ_OFICIAL} /></label>
          <label style={lab}>Chave da API ElevenLabs<input type="password" style={inp} value={f.key} onChange={(e) => setF({ ...f, key: e.target.value.trim() })} placeholder="Cole a chave da ElevenLabs" autoComplete="off" /></label>
          <label style={lab}>Modelo<select style={inp} value={f.model} onChange={(e) => setF({ ...f, model: e.target.value })}><option value="eleven_flash_v2_5">Flash v2.5, mais rápido</option><option value="eleven_multilingual_v2">Multilingual v2, mais expressivo</option></select></label>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <button type="button" style={btn2} onClick={async () => { rnUnlockAudio(); const prev = RN_VOICE.v; RN_VOICE.v = { ...f, voiceId: f.voiceId || RN_VOZ_OFICIAL }; setTest('Tocando...'); const how = await rnSpeak('Oi, Camila! Eu sou a Renata. Pode me perguntar qualquer coisa da clínica.'); RN_VOICE.v = prev; setTest(how === 'eleven' ? 'Tocando a voz oficial pela ElevenLabs.' : f.key ? 'A ElevenLabs não respondeu, toquei a voz de reserva do aparelho.' : 'Sem a chave, toquei a voz de reserva do aparelho.'); }}><RIcon name="play" size={14} />Testar voz</button>
            {test ? <span style={{ fontSize: 12.5, color: /oficial/.test(test) ? '#1E9E57' : 'var(--text-muted)' }}>{test}</span> : null}
          </div>
          <span style={note}>A Renata sempre fala com esta voz. A voz do aparelho só entra como reserva quando a ElevenLabs não está acessível.</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button type="button" onClick={save} style={{ height: 42, padding: '0 22px', borderRadius: 999, border: 0, background: 'linear-gradient(90deg,#0B3FD9,#1F7BFF)', color: '#fff', fontFamily: 'inherit', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Salvar</button>
        </div>
      </div>
    </div>
  );
}

/* ---------- conversa por voz (estilo ChatGPT) ---------- */
const RN_YES = /^(sim|pode|continua|continue|quero|claro|isso|manda|vai|le|leia|por favor|uhum|aham|bora)\b/;
function RenataVoiceMode({ onClose, ask, say, mobile, needTap }) {
  const [state, setState] = React.useState(needTap ? 'tap' : 'starting');
  const [iaState, setIaState] = React.useState(null);
  const [pop, setPop] = React.useState(null);
  const [heard, setHeard] = React.useState('');
  const [said, setSaid] = React.useState('');
  const [muted, setMuted] = React.useState(false);
  const [err, setErr] = React.useState(null);
  const R = React.useRef({ alive: true, muted: false, err: false, rec: null, barge: null, rest: null, stream: null, actx: null, an: null, tok: 0, silT: null, engine: RN_SR ? 'web' : (RN_VOICE.v.key ? 'eleven' : null) }).current;

  const stopRec = () => { const r = R.rec; R.rec = null; if (r) { try { r.abort ? r.abort() : r.stop(); } catch (e) {} } };
  const stopBarge = () => { const r = R.barge; R.barge = null; clearTimeout(R.silT); if (r) { try { r.abort(); } catch (e) {} } };
  const stopAll = () => { stopRec(); stopBarge(); R.tok++; rnStopSpeak(); };
  const fail = (why) => { R.err = true; stopAll(); setErr(why); setState('error'); };

  const handle = async (q) => {
    setHeard(q);
    if (R.rest && !RN_PENDING.v && RN_YES.test(rnNorm(q))) { const v = R.rest; R.rest = null; say(q, v.restShow); speak(v.rest, v.restShow); return; }
    R.rest = null; setState('thinking'); setSaid('');
    const ans = await ask(q, true);
    if (!R.alive || R.err) return;
    if (!ans) { listen(); return; }
    const v = rnVoice(ans); R.rest = v.rest ? v : null; speak(v.now, v.nowShow);
  };
  const speak = (text, show) => {
    const tok = ++R.tok; setSaid(show || text); setState('speaking');
    rnSpeak(text, () => { if (R.tok !== tok || !R.alive) return; stopBarge(); setHeard(''); setTimeout(listen, 120); });
    if (RN_BARGE && !R.muted) setTimeout(() => { if (R.tok === tok && R.alive) startBarge(tok, text); }, 350);
  };
  // interromper falando por cima (computador com Chrome ou Edge)
  const startBarge = (tok, text) => {
    const spoken = new Set(rnNorm(text).split(/[^a-z0-9]+/).filter(Boolean));
    const clean = (w) => rnNorm(w).replace(/[^a-z0-9]/g, '');
    const strip = (s) => { const w = s.trim().split(/\s+/); let i = 0; while (i < w.length && (spoken.has(clean(w[i])) || clean(w[i]).length <= 2)) i++; return w.slice(i).join(' '); };
    let r; try { r = new RN_SR(); } catch (e) { return; }
    R.barge = r; r.lang = 'pt-BR'; r.interimResults = true; r.continuous = true;
    let hit = false, cur = '';
    r.onresult = (e) => {
      let txt = ''; for (let i = 0; i < e.results.length; i++) txt += e.results[i][0].transcript + ' ';
      if (!hit) {
        const words = rnNorm(txt).split(/[^a-z0-9]+/).filter((w) => w.length > 3 && !/^\d+$/.test(w));
        const novel = words.filter((w) => !spoken.has(w));
        if (novel.length >= 2 && novel.length / words.length > 0.5) { hit = true; R.tok++; rnStopSpeak(); R.rest = null; setSaid(''); setState('listening'); }
      }
      if (hit) { cur = txt; setHeard(strip(txt)); clearTimeout(R.silT); R.silT = setTimeout(() => { try { r.stop(); } catch (x) {} }, 1100); }
    };
    r.onerror = () => {};
    r.onend = () => {
      if (R.barge !== r || !R.alive) return;
      if (hit) { R.barge = null; const q = strip(cur); if (q) handle(q); else listen(); return; }
      if (R.tok === tok) { try { r.start(); } catch (x) {} }
    };
    try { r.start(); } catch (e) {}
  };
  const listenWeb = () => {
    let r; try { r = new RN_SR(); } catch (e) { return fail('nostt'); }
    R.rec = r; r.lang = 'pt-BR'; r.interimResults = true; r.continuous = false;
    let fin = '', inter = '';
    r.onresult = (e) => { fin = ''; inter = ''; for (let i = 0; i < e.results.length; i++) { if (e.results[i].isFinal) fin += e.results[i][0].transcript; else inter += e.results[i][0].transcript; } setHeard((fin + ' ' + inter).trim()); };
    r.onerror = (e) => {
      if (R.rec !== r) return;
      if (e.error === 'not-allowed' || e.error === 'service-not-allowed') { if (RN_VOICE.v.key && window.MediaRecorder) { R.rec = null; R.engine = 'eleven'; start(); return; } fail(e.error === 'service-not-allowed' ? 'dictation' : 'denied'); }
      else if (e.error === 'audio-capture') fail('nomic'); else if (e.error === 'network') fail('network');
    };
    r.onend = () => { if (R.rec !== r || !R.alive) return; R.rec = null; const q = (fin || inter).trim(); if (!q) { setTimeout(listen, 150); return; } handle(q); };
    try { r.start(); } catch (e) { R.rec = null; setTimeout(listen, 400); }
  };
  // sem reconhecimento no navegador: grava e transcreve pela ElevenLabs
  const listenEleven = () => {
    const s = R.stream; if (!s || !window.MediaRecorder) return fail('nostt');
    const AC = window.AudioContext || window.webkitAudioContext;
    try { if (!R.actx) { R.actx = new AC(); R.an = R.actx.createAnalyser(); R.an.fftSize = 1024; R.actx.createMediaStreamSource(s).connect(R.an); } R.actx.resume(); } catch (e) {}
    let rec; try { rec = new MediaRecorder(s); } catch (e) { return fail('nostt'); }
    const chunks = []; rec.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
    const buf = new Float32Array(1024); let spoke = false, last = Date.now(), floor = 0.008; const t0 = Date.now();
    const tick = () => {
      if (R.rec !== rec) return;
      let rms = 0; if (R.an) { R.an.getFloatTimeDomainData(buf); let sum = 0; for (let i = 0; i < buf.length; i++) sum += buf[i] * buf[i]; rms = Math.sqrt(sum / buf.length); }
      if (!spoke) floor = floor * 0.9 + rms * 0.1;
      if (rms > Math.max(0.02, floor * 2.5)) { spoke = true; last = Date.now(); }
      const now = Date.now();
      if ((spoke && now - last > 1000) || now - t0 > 25000 || (!spoke && now - t0 > 12000)) { try { rec.stop(); } catch (e) {} return; }
      setTimeout(tick, 60);
    };
    rec.onstop = async () => {
      if (R.rec !== rec || !R.alive) return; R.rec = null;
      if (!spoke) { listen(); return; }
      setState('thinking'); setHeard('Entendendo o que você disse...');
      try {
        const type = rec.mimeType || 'audio/webm'; const fd = new FormData(); fd.append('model_id', 'scribe_v1'); fd.append('file', new Blob(chunks, { type }), 'fala.' + (/mp4|aac/.test(type) ? 'm4a' : 'webm'));
        const r = await fetch('https://api.elevenlabs.io/v1/speech-to-text', { method: 'POST', headers: { 'xi-api-key': RN_VOICE.v.key }, body: fd });
        const j = await r.json().catch(() => ({}));
        if (!R.alive) return; if (!r.ok) throw j;
        const q = String(j.text || '').trim(); if (!q) { listen(); return; } handle(q);
      } catch (e) { if (R.alive) fail('eleven'); }
    };
    R.rec = rec; rec.start(); setTimeout(tick, 60);
  };
  const listen = () => {
    if (!R.alive || R.err) return;
    if (R.muted) { setState('idle'); return; }
    stopRec(); setState('listening');
    if (R.engine === 'eleven') listenEleven(); else listenWeb();
  };
  const start = async () => {
    R.err = false; setErr(null); setState('starting');
    if (!R.engine) return fail('nostt');
    const c = await rnMicCheck(R.engine === 'eleven');
    if (!R.alive) { if (c.stream) c.stream.getTracks().forEach((x) => x.stop()); return; }
    if (!c.ok) return fail(c.why);
    if (c.stream) { if (R.stream && R.stream !== c.stream) R.stream.getTracks().forEach((x) => x.stop()); R.stream = c.stream; }
    listen();
  };
  React.useEffect(() => { R.alive = true; if (!needTap) start(); return () => { R.alive = false; stopAll(); if (R.stream) R.stream.getTracks().forEach((x) => x.stop()); try { R.actx && R.actx.close(); } catch (e) {} }; }, []);
  React.useEffect(() => { if (err === 'frame' && RN_CAN_POP) rnSampleState().then(setIaState); }, [err]);
  const popClick = async () => {
    if (iaState === 'prompt') { const p = await rnPerm(); let st = 'granted'; if (p) { try { const r = await p.request(['sample']); st = (r && r.sample) || 'granted'; } catch (e) {} } setIaState(st === 'prompt' ? 'granted' : st); return; }
    setPop(rnPopOut() ? 'opened' : 'blocked');
  };
  const orbClick = () => { if (state === 'tap') { rnUnlockAudio(); start(); } else interrupt(); };
  const interrupt = () => { if (state !== 'speaking') return; R.tok++; rnStopSpeak(); stopBarge(); R.rest = null; setSaid(''); setHeard(''); listen(); };
  const toggleMute = () => { const m = !R.muted; R.muted = m; setMuted(m); if (m) { stopRec(); stopBarge(); if (state === 'listening' || state === 'starting') setState('idle'); } else if (state === 'idle') listen(); };
  const LBL = { tap: 'Toque na Renata para começar a conversa', starting: 'Ligando o microfone...', listening: 'Pode falar, estou ouvindo', thinking: 'Pensando...', speaking: RN_BARGE ? 'Fale ou toque para interromper' : 'Toque para interromper', idle: 'Microfone desligado', error: '' };
  const big = mobile ? 168 : 190;
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(180deg,#F3F8FF 0%,#E4EEFC 100%)' }}>
      <div style={{ alignSelf: 'stretch', display: 'flex', alignItems: 'center', gap: 8, padding: mobile ? '14px 16px 0' : '18px 22px 0' }}>
        <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-strong)' }}>Renata IA</span>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', padding: '3px 9px', borderRadius: 999, background: 'rgba(255,255,255,.75)' }}>Conversa por voz</span>
      </div>
      <div style={{ flex: 1, minHeight: 0, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 22, padding: 24, boxSizing: 'border-box', overflowY: 'auto' }}>
        <button type="button" onClick={orbClick} aria-label={state === 'tap' ? 'Começar a conversa' : state === 'speaking' ? 'Interromper a Renata' : 'Renata'} style={{ border: 0, padding: 0, background: 'transparent', borderRadius: '50%', cursor: state === 'speaking' || state === 'tap' ? 'pointer' : 'default', flexShrink: 0 }}>
          <RenataOrb size={big} state={err || muted ? 'idle' : state === 'starting' ? 'thinking' : state === 'tap' ? 'listening' : state} />
        </button>
        <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-muted)', minHeight: 20, textAlign: 'center' }}>{LBL[state]}</span>
        {heard && (state === 'listening' || state === 'thinking') ? <p style={{ margin: 0, maxWidth: 540, textAlign: 'center', fontSize: mobile ? 18 : 20, fontWeight: 500, color: 'var(--text-strong)', lineHeight: 1.4 }}>{heard}</p> : null}
        {said && state === 'speaking' ? <p style={{ margin: 0, maxWidth: 540, textAlign: 'center', fontSize: mobile ? 15.5 : 16.5, color: 'var(--text-body)', lineHeight: 1.55 }}>{said}</p> : null}
        {err ? <div style={{ maxWidth: 440, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '14px 16px', borderRadius: 18, background: 'rgba(255,255,255,.75)', border: '1.5px solid rgba(255,255,255,.95)' }}>
          <p style={{ margin: 0, textAlign: 'center', fontSize: 14, color: 'var(--text-body)', lineHeight: 1.55 }}>{pop === 'opened' ? 'A conversa por voz abriu em uma nova aba. Fale com a Renata por lá; as respostas usam a IA daqui.' : pop === 'blocked' ? 'O navegador bloqueou a nova aba. Libere pop ups para este site e toque de novo.' : iaState === 'prompt' ? 'Dentro do link do Claude o sistema fica numa moldura que não recebe o microfone. Primeiro permita a IA da Renata, depois abra a conversa por voz em tela própria.' : RN_MIC_MSG[err]}</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {err === 'frame' && RN_CAN_POP && pop !== 'opened' ? <button type="button" onClick={popClick} style={{ height: 38, padding: '0 16px', borderRadius: 999, border: 0, background: 'linear-gradient(90deg,#0B3FD9,#1F7BFF)', color: '#fff', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}><RIcon name={iaState === 'prompt' ? 'sparkles' : 'external-link'} size={15} />{iaState === 'prompt' ? 'Permitir a IA da Renata' : 'Abrir conversa por voz'}</button> : null}
            {RN_RETRY.includes(err) ? <button type="button" onClick={start} style={{ height: 38, padding: '0 16px', borderRadius: 999, border: 0, background: 'linear-gradient(90deg,#0B3FD9,#1F7BFF)', color: '#fff', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}><RIcon name="mic" size={15} />Tentar de novo</button> : null}
            <button type="button" onClick={onClose} style={{ height: 38, padding: '0 16px', borderRadius: 999, border: '1.5px solid rgba(214,226,242,.95)', background: '#fff', color: 'var(--text-strong)', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 500, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}><RIcon name="keyboard" size={15} />Digitar no chat</button>
          </div>
        </div> : null}
      </div>
      <div style={{ display: 'flex', gap: 18, padding: '0 0 calc(26px + env(safe-area-inset-bottom))' }}>
        <button type="button" aria-label={muted ? 'Ligar microfone' : 'Desligar microfone'} title={muted ? 'Ligar microfone' : 'Desligar microfone'} onClick={toggleMute} disabled={!!err} style={{ width: 60, height: 60, borderRadius: '50%', border: 0, cursor: err ? 'default' : 'pointer', background: muted ? '#E5484D' : 'rgba(255,255,255,.92)', color: muted ? '#fff' : 'var(--text-strong)', boxShadow: '0 10px 24px -14px rgba(23,73,170,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: err ? .5 : 1 }}><RIcon name={muted ? 'mic-off' : 'mic'} size={24} /></button>
        <button type="button" aria-label="Encerrar conversa por voz" title="Encerrar" onClick={onClose} style={{ width: 60, height: 60, borderRadius: '50%', border: 0, cursor: 'pointer', background: '#0E2350', color: '#fff', boxShadow: '0 10px 24px -14px rgba(23,73,170,.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><RIcon name="x" size={24} /></button>
      </div>
    </div>
  );
}

function RnActionCard({ a, state, onYes, onNo, disabled }) {
  const rows = a.items.map((x) => a.kind === 'est'
    ? { icon: x.tipo === 'saida' ? 'package-minus' : 'package-plus', c: x.tipo === 'saida' ? '#E5484D' : '#1E9E57', t: (x.tipo === 'saida' ? 'Baixa' : 'Entrada') + ' · ' + x.produto, v: rnUnPl(x.quantidade, x.un), s: `Estoque de ${x.de} para ${x.para}${x.valorTotal ? ' · compra de ' + brl(x.valorTotal) : ''}` }
    : { icon: x.tipo === 'receita' ? 'arrow-down-left' : 'arrow-up-right', c: x.tipo === 'receita' ? '#1E9E57' : '#E5484D', t: (x.tipo === 'receita' ? 'Receita · ' + x.paciente : 'Despesa · ' + x.descricao), v: brl(x.valor), s: (x.pago ? (x.tipo === 'receita' ? 'Recebido ' : 'Pago ') + rnHojeOu(x.data) : (x.tipo === 'receita' ? 'A receber em ' : 'A pagar em ') + dBR(x.venc)) + ' · ' + (x.tipo === 'receita' ? x.procedimento + ' · ' + x.forma : x.cat) });
  const chip = (icon, txt, c) => <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 30, padding: '0 12px', borderRadius: 999, background: c + '14', color: c, fontSize: 13, fontWeight: 600 }}><RIcon name={icon} size={15} />{txt}</span>;
  return (
    <div style={{ marginTop: 10, borderRadius: 18, background: 'rgba(255,255,255,.78)', border: '1.5px solid rgba(255,255,255,.95)', boxShadow: '0 10px 24px -18px rgba(23,73,170,.5)', overflow: 'hidden' }}>
      <div style={{ padding: '10px 14px 4px', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '.02em' }}>{a.kind === 'est' ? 'MOVIMENTAÇÃO DE ESTOQUE' : 'LANÇAMENTO FINANCEIRO'}</div>
      {rows.map((r, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderTop: i ? '1px solid rgba(214,226,242,.7)' : 0 }}>
          <span style={{ width: 34, height: 34, borderRadius: 11, background: r.c + '14', color: r.c, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><RIcon name={r.icon} size={17} /></span>
          <span style={{ flex: 1, minWidth: 0 }}><span style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--text-strong)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.t}</span><span style={{ display: 'block', fontSize: 12.5, color: 'var(--text-muted)' }}>{r.s}</span></span>
          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-strong)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{r.v}</span>
        </div>
      ))}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', alignItems: 'center', padding: '10px 14px 12px', borderTop: '1px solid rgba(214,226,242,.7)' }}>
        {state === 'open' ? <>
          <button type="button" disabled={disabled} onClick={onNo} style={{ height: 36, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(214,226,242,.95)', background: '#fff', color: 'var(--text-strong)', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 500, cursor: 'pointer' }}>Cancelar</button>
          <button type="button" disabled={disabled} onClick={onYes} style={{ height: 36, padding: '0 16px', borderRadius: 999, border: 0, background: 'linear-gradient(90deg,#0B3FD9,#1F7BFF)', color: '#fff', fontFamily: 'inherit', fontSize: 13.5, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}><RIcon name="check" size={15} />Confirmar</button>
        </> : state === 'ok' ? chip('circle-check', 'Lançado', '#1E9E57') : state === 'cancel' ? chip('circle-x', 'Cancelado', '#8A97AD') : chip('clock', 'Não confirmado', '#8A97AD')}
      </div>
    </div>
  );
}

function RenataChat({ mobile }) {
  const [st, setSt] = useStore(RN_STORE);
  const [mode] = useStore(RN_MODE);
  const [pendNow] = useStore(RN_PENDING);
  const [v, setV] = React.useState('');
  const [busy, setBusy] = React.useState(null);
  const [run, setRun] = React.useState(false);
  const runRef = React.useRef(false);
  const [expanded, setExpanded] = React.useState(false);
  const [voice, setVoice] = React.useState(RN_POPUP);
  const tapRef = React.useRef(RN_POPUP);
  const [settings, setSettings] = React.useState(false);
  const [dictating, setDictating] = React.useState(false);
  const [note, setNote] = React.useState(null);
  const [copied, setCopied] = React.useState(null);
  const [speaking, setSpeaking] = React.useState(null);
  const ctlRef = React.useRef(null), endRef = React.useRef(null), taRef = React.useRef(null), dictRef = React.useRef(null);
  const msgs = st.msgs;
  const setMsgs = (fn) => setSt((s) => ({ ...s, msgs: typeof fn === 'function' ? fn(s.msgs) : fn }));
  const close = () => { ctlRef.current && ctlRef.current.abort(); rnStopSpeak(); setSt((s) => ({ ...s, open: false })); };
  const navSeen = React.useRef(st.nav);
  React.useEffect(() => { if (st.nav && st.nav !== navSeen.current) { navSeen.current = st.nav; if (!voice) { const t = setTimeout(close, 1300); return () => clearTimeout(t); } } }, [st.nav]);
  const say = (q, text) => { const id = Date.now(); setMsgs((l) => [...l, { role: 'user', content: q, id: id - 1 }, { role: 'assistant', content: text, id, mode: 'voz' }]); };
  React.useEffect(() => { endRef.current && endRef.current.scrollIntoView({ block: 'end' }); }, [msgs.length, busy, msgs.length && msgs[msgs.length - 1].content]);
  React.useEffect(() => { const k = (e) => { if (e.key === 'Escape' && !voice && !settings) close(); }; window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, [voice, settings]);
  React.useEffect(() => { if (taRef.current) { taRef.current.style.height = 'auto'; taRef.current.style.height = Math.min(taRef.current.scrollHeight, 160) + 'px'; } }, [v]);

  const ask = async (text, isVoice) => {
    const q = String(text || '').trim(); if (!q || runRef.current) return '';
    const hist = [...RN_STORE.v.msgs.filter((m) => !m.error && !m.pending && m.content), { role: 'user', content: q }];
    runRef.current = true; setRun(true);
    const id = Date.now();
    setMsgs((l) => [...l, { role: 'user', content: q, id: id - 1 }, { role: 'assistant', content: '', id, pending: true }]);
    setV(''); setBusy('Pensando'); const ctl = new AbortController(); ctlRef.current = ctl;
    const upd = (t) => setMsgs((l) => l.map((m) => m.id === id ? { ...m, content: t, pending: false } : m));
    try {
      const r = await rnAnswer(hist, { voice: isVoice, signal: ctl.signal, onText: (t) => { setBusy(null); upd(t); }, onTool: (lbl) => setBusy(lbl) });
      setMsgs((l) => l.map((m) => m.id === id ? { ...m, content: r.text, pending: false, mode: r.mode, error: r.mode === 'erro', pend: r.pending || undefined } : (r.resolved && m.pend && m.pend.id === r.resolved.id ? { ...m, pendState: r.resolved.state } : m)));
      return r.text;
    } catch (e) {
      setMsgs((l) => l.map((m) => m.id === id ? { ...m, pending: false, content: (e && e.text) || m.content || '', stopped: true } : m));
      return '';
    } finally { setBusy(null); ctlRef.current = null; runRef.current = false; setRun(false); }
  };
  const regen = (id) => { if (runRef.current) return; const i = msgs.findIndex((m) => m.id === id); const q = i > 0 ? msgs[i - 1].content : ''; if (!q) return; setMsgs((l) => l.slice(0, i - 1)); setTimeout(() => ask(q), 0); };
  const dictate = async () => {
    if (dictating) { try { dictRef.current && dictRef.current.stop(); } catch (e) {} return; }
    if (!RN_SR) { setNote('nostt'); return; }
    setNote(null);
    const c = await rnMicCheck(false); if (!c.ok) { setNote(c.why); return; }
    try { const r = new RN_SR(); dictRef.current = r; r.lang = 'pt-BR'; r.interimResults = true; const base = v ? v + ' ' : '';
      r.onresult = (e) => { let t = ''; for (let i = 0; i < e.results.length; i++) t += e.results[i][0].transcript; setV(base + t); };
      r.onend = () => setDictating(false); r.onerror = (e) => { setDictating(false); if (e.error === 'not-allowed' || e.error === 'service-not-allowed') setNote('denied'); else if (e.error === 'network') setNote('network'); };
      r.start(); setDictating(true); } catch (e) { setDictating(false); }
  };
  const wide = expanded && !mobile;
  const col = { width: '100%', maxWidth: wide ? 760 : 'none', margin: '0 auto', boxSizing: 'border-box' };
  const empty = !msgs.length;
  const hb = (icon, label, onClick, active) => <button type="button" className="rn-act" aria-label={label} title={label} onClick={onClick} style={{ width: 38, height: 38, borderRadius: 12, color: active ? '#1F5EFF' : 'var(--text-strong)' }}><RIcon name={icon} size={18} /></button>;

  return ReactDOM.createPortal(
    <div style={{ position: 'fixed', inset: 0, zIndex: 250, display: 'flex', justifyContent: 'flex-end', fontFamily: 'var(--font-sans)' }}>
      <div onClick={close} style={{ position: 'absolute', inset: 0, background: 'rgba(14,35,80,.22)', backdropFilter: 'blur(2px)', WebkitBackdropFilter: 'blur(2px)' }} />
      <aside role="dialog" aria-label="Renata IA" style={{ position: 'relative', margin: mobile ? 0 : 16, width: mobile ? '100%' : wide ? 'calc(100vw - 32px)' : 'min(520px, calc(100vw - 32px))', height: mobile ? '100%' : 'calc(100% - 32px)', transition: 'width .28s cubic-bezier(.2,.8,.2,1)', borderRadius: mobile ? 0 : 28, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: 'linear-gradient(180deg,#F6FAFF 0%,#EAF2FD 100%)', border: mobile ? 0 : '2px solid rgba(255,255,255,.95)', boxShadow: '0 30px 60px -30px rgba(23,73,170,.55)' }}>
        <header style={{ display: 'flex', alignItems: 'center', gap: 10, padding: mobile ? '12px 10px 8px 14px' : '14px 14px 10px 20px' }}>
          <RenataOrb size={30} state={busy ? 'thinking' : 'idle'} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--text-strong)', display: 'flex', alignItems: 'center', gap: 6 }}>Renata IA</p>
            <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{RN_CLINICA.fantasia}{mode === 'demo' ? ' · modo demonstração' : ''}</p>
          </div>
          {hb('square-pen', 'Nova conversa', () => { ctlRef.current && ctlRef.current.abort(); rnStopSpeak(); rnResetCtx(); rnSetPending(null); setMsgs([]); })}
          {hb('sliders-horizontal', 'Conexões da Renata', () => setSettings(true))}
          {mobile ? null : hb(expanded ? 'minimize-2' : 'maximize-2', expanded ? 'Recolher' : 'Expandir', () => setExpanded(!expanded))}
          {hb('x', 'Fechar', close)}
        </header>

        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: mobile ? '6px 14px 10px' : '6px 22px 12px', scrollbarWidth: 'thin', scrollbarColor: 'rgba(150,175,210,.5) transparent', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0, #000 18px)', maskImage: 'linear-gradient(to bottom, transparent 0, #000 18px)' }}>
          {empty ? (
            <div style={{ ...col, minHeight: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, padding: '20px 0' }}>
              <RenataOrb size={72} state="listening" />
              <h2 style={{ margin: 0, fontSize: mobile ? 22 : 26, fontWeight: 600, color: 'var(--text-strong)', textAlign: 'center', letterSpacing: '-0.01em' }}>Oi, Camila. O que você quer saber da clínica?</h2>
              <p style={{ margin: '-8px 0 4px', fontSize: 14, color: 'var(--text-muted)', textAlign: 'center', maxWidth: 420, lineHeight: 1.5 }}>Pergunte sobre agenda, pacientes, financeiro, estoque, conversas ou qualquer configuração. Respondo só com os dados da {RN_CLINICA.fantasia}.</p>
              <div style={{ display: 'grid', gridTemplateColumns: wide ? 'repeat(3, minmax(0,1fr))' : 'repeat(2, minmax(0,1fr))', gap: 10, width: '100%' }}>
                {RN_SUGS.map(([ic, t]) => <button key={t} type="button" className="rn-sug" onClick={() => ask(t)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8, padding: 14, borderRadius: 18, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', fontSize: 14, lineHeight: 1.35, color: 'var(--text-strong)', background: 'rgba(255,255,255,.65)', border: '1.5px solid rgba(255,255,255,.95)', boxShadow: '0 6px 16px -12px rgba(23,73,170,.4)' }}><span style={{ color: '#1F5EFF', display: 'flex' }}><RIcon name={ic} size={17} /></span>{t}</button>)}
              </div>
            </div>
          ) : (
            <div style={{ ...col, display: 'flex', flexDirection: 'column', gap: 22, paddingTop: 8 }}>
              {msgs.map((m) => m.role === 'user' ? (
                <div key={m.id} style={{ display: 'flex', justifyContent: 'flex-end' }}><div style={{ maxWidth: '82%', padding: '10px 16px', borderRadius: 22, background: 'linear-gradient(180deg,#0B4BEB,#1F8BF5)', color: '#fff', fontSize: 15, lineHeight: 1.5, whiteSpace: 'pre-wrap', boxShadow: '0 10px 22px -16px rgba(11,75,235,.8)' }}>{m.content}</div></div>
              ) : (
                <div key={m.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <RenataOrb size={28} state={m.pending ? 'thinking' : 'idle'} />
                  <div style={{ flex: 1, minWidth: 0, paddingTop: 3 }}>
                    {m.pending ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--text-muted)' }}>{busy || 'Pensando'}<span style={{ display: 'inline-flex', gap: 3 }}>{[0, 1, 2].map((d) => <span key={d} style={{ width: 5, height: 5, borderRadius: '50%', background: '#4F7BE6', animation: `rnDot 1.2s ${d * .15}s infinite` }} />)}</span></span>
                      : <div className="rn-md" style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--text-body)', wordBreak: 'break-word' }} dangerouslySetInnerHTML={{ __html: rnMd(m.content) + (run && !busy && m === msgs[msgs.length - 1] ? '<span style="display:inline-block;width:8px;height:16px;margin-left:2px;vertical-align:-2px;background:#4F7BE6;border-radius:2px;animation:rnCaret 1s steps(1) infinite"></span>' : '') }} />}
                    {m.stopped ? <span style={{ fontSize: 12, color: 'var(--text-subtle)' }}>Resposta interrompida</span> : null}
                    {m.pend && !m.pending ? <RnActionCard a={m.pend} state={m.pendState || (pendNow && pendNow.id === m.pend.id ? 'open' : 'old')} disabled={run} onYes={() => ask('Sim, pode lançar')} onNo={() => ask('Não, cancela')} /> : null}
                    {!m.pending && !(run && m === msgs[msgs.length - 1]) ? <div style={{ display: 'flex', gap: 2, marginTop: 6, marginLeft: -6 }}>
                      <button type="button" className="rn-act" title="Copiar" aria-label="Copiar resposta" onClick={() => { try { navigator.clipboard && navigator.clipboard.writeText(rnPlain(m.content)); } catch (e) {} setCopied(m.id); setTimeout(() => setCopied(null), 1500); }}><RIcon name={copied === m.id ? 'check' : 'copy'} size={16} /></button>
                      <button type="button" className="rn-act" title={speaking === m.id ? 'Parar' : 'Ouvir'} aria-label="Ouvir resposta" onClick={() => { if (speaking === m.id) { rnStopSpeak(); setSpeaking(null); } else { rnUnlockAudio(); setSpeaking(m.id); rnSpeak(m.content, () => setSpeaking(null)); } }} style={{ color: speaking === m.id ? '#1F5EFF' : undefined }}><RIcon name={speaking === m.id ? 'square' : 'volume-2'} size={16} /></button>
                      <button type="button" className="rn-act" title="Gerar de novo" aria-label="Gerar de novo" onClick={() => regen(m.id)}><RIcon name="refresh-cw" size={16} /></button>
                      <button type="button" className="rn-act" title="Boa resposta" aria-label="Boa resposta" onClick={() => setMsgs((l) => l.map((x) => x.id === m.id ? { ...x, fb: x.fb === 'up' ? null : 'up' } : x))} style={{ color: m.fb === 'up' ? '#1F5EFF' : undefined }}><RIcon name="thumbs-up" size={16} /></button>
                      <button type="button" className="rn-act" title="Resposta ruim" aria-label="Resposta ruim" onClick={() => setMsgs((l) => l.map((x) => x.id === m.id ? { ...x, fb: x.fb === 'down' ? null : 'down' } : x))} style={{ color: m.fb === 'down' ? '#E5484D' : undefined }}><RIcon name="thumbs-down" size={16} /></button>
                    </div> : null}
                  </div>
                </div>
              ))}
              <span ref={endRef} />
            </div>
          )}
        </div>

        <div style={{ padding: mobile ? '6px 12px 14px' : '6px 22px 16px' }}>
          <div style={{ ...col }}>
            {note ? <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8, padding: '10px 12px', borderRadius: 16, background: 'rgba(255,255,255,.8)', border: '1.5px solid rgba(255,255,255,.95)', fontSize: 13, lineHeight: 1.5, color: 'var(--text-body)' }}><span style={{ color: '#1F5EFF', display: 'flex', paddingTop: 1 }}><RIcon name="mic-off" size={16} /></span><span style={{ flex: 1 }}>{RN_MIC_MSG[note]}</span><button type="button" className="rn-act" aria-label="Fechar aviso" onClick={() => setNote(null)} style={{ width: 26, height: 26 }}><RIcon name="x" size={15} /></button></div> : null}
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, padding: '8px 8px 8px 10px', borderRadius: 28, background: '#fff', border: '1.5px solid rgba(214,226,242,.95)', boxShadow: '0 14px 30px -20px rgba(23,73,170,.55)' }}>
              <textarea ref={taRef} value={v} rows={1} onChange={(e) => setV(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ask(v); } }} placeholder={dictating ? 'Ouvindo...' : 'Pergunte qualquer coisa'} aria-label="Pergunte qualquer coisa"
                style={{ flex: 1, minWidth: 0, resize: 'none', border: 0, outline: 'none', background: 'transparent', fontFamily: 'inherit', fontSize: 15.5, lineHeight: '22px', color: 'var(--text-strong)', padding: '9px 6px', maxHeight: 160, boxSizing: 'border-box', height: 40 }} />
              {RN_SR ? <button type="button" className="rn-act" aria-label={dictating ? 'Parar ditado' : 'Ditar pergunta'} title={dictating ? 'Parar ditado' : 'Ditar'} onClick={dictate} style={{ width: 40, height: 40, borderRadius: '50%', color: dictating ? '#E5484D' : 'var(--text-muted)' }}><RIcon name={dictating ? 'mic-off' : 'mic'} size={19} /></button> : null}
              {run ? <button type="button" aria-label="Parar resposta" onClick={() => ctlRef.current && ctlRef.current.abort()} style={{ width: 40, height: 40, borderRadius: '50%', border: 0, cursor: 'pointer', background: '#0E2350', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><RIcon name="square" size={14} /></button>
                : v.trim() ? <button type="button" aria-label="Enviar pergunta" onClick={() => ask(v)} style={{ width: 40, height: 40, borderRadius: '50%', border: 0, cursor: 'pointer', background: 'linear-gradient(180deg,#0B4BEB,#1F8BF5)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 8px 18px -10px rgba(11,75,235,.9)' }}><RIcon name="arrow-up" size={19} strokeWidth={2.4} /></button>
                : <button type="button" aria-label="Conversar por voz" title="Conversar por voz" onClick={() => { rnUnlockAudio(); setNote(null); setVoice(true); }} style={{ width: 40, height: 40, borderRadius: '50%', border: 0, cursor: 'pointer', background: 'linear-gradient(135deg,#0B4BEB,#7B4BC4)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: '0 8px 18px -10px rgba(11,75,235,.9)' }}><RIcon name="audio-lines" size={19} /></button>}
            </div>
            <p style={{ margin: '8px 0 0', textAlign: 'center', fontSize: 11.5, color: 'var(--text-subtle)' }}>A Renata pode cometer erros. Confira informações importantes.</p>
          </div>
        </div>
        {voice ? <RenataVoiceMode ask={ask} say={say} mobile={mobile} needTap={tapRef.current} onClose={() => { tapRef.current = false; setVoice(false); ctlRef.current && ctlRef.current.abort(); rnStopSpeak(); }} /> : null}
        {settings ? <RenataSettings onClose={() => setSettings(false)} /> : null}
      </aside>
    </div>,
    document.body
  );
}
function RenataRoot({ mobile }) { const [st] = useStore(RN_STORE); return st.open ? <RenataChat mobile={mobile} /> : null; }
Object.assign(window, { RenataButton, RenataRoot, RenataOrb, RN_STORE });
