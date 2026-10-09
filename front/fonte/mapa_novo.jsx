//@@A
/* Produtos do mapa: vêm do Estoque (produtos marcados "usar no mapa"). Sem nenhum marcado, usa os quatro padrões. */
const MAP_PADRAO = JSON.parse(JSON.stringify(MAP_PRODS));
const COMENTARIO = 'Só comentário';
const UNIDADES_MAPA = ['U', 'ml', 'seringa', 'mg', 'un', 'cm', 'sessão', 'aplicação'];
const CATS_MAPA = [['facial', 'Facial', 'face'], ['corporal', 'Corporal', 'corpo'], ['gluteo', 'Glúteo', 'gluteo'], ['dental', 'Dental', 'sorriso'], ['outra', 'Outra', null]];
const catMapa = (k) => CATS_MAPA.find((x) => x[0] === k);
// nome da área para mostrar: em Outra vale o que a pessoa escreveu (o sistema atende vários segmentos)
const areaMapaTxt = (cat, desc) => (cat === 'outra' && String(desc || '').trim() ? String(desc).trim() : catMapa(cat) ? catMapa(cat)[1] : '');
const MAPA_VER = makeStore(0);
const MAPA_DEMO = makeStore(null);
const MAPA_LIGA_DEMO = { 'Toxina botulínica 100U': ['#1F5EFF', 'U', 1, 4, 100], 'Ácido hialurônico 1ml': ['#7B4BC4', 'ml', 0.1, 0.5, 1], 'Bioestimulador de colágeno': ['#22C3F2', 'ml', 0.5, 1, 8], 'Fio de PDO liso': ['#2DBF6A', 'fios', 1, 2, 10] };
const demoProdsMapa = () => { if (!MAPA_DEMO.v) MAPA_DEMO.v = PRODUTOS0.map((p) => { const l = MAPA_LIGA_DEMO[p.nome]; return { id: p.id, nome: p.nome, usar_no_mapa: !!l, cor_mapa: l ? l[0] : null, unidade_mapa: l ? l[1] : null, passo_dose: l ? l[2] : null, dose_padrao: l ? l[3] : null, conteudo_por_unidade: l ? l[4] : null, unidade: { nome: p.un } }; }); return MAPA_DEMO.v; };
function mapProd(prod) {
  if (!prod) return null;
  if (MAP_PRODS[prod]) return { key: prod, ...MAP_PRODS[prod] };
  const s = String(prod).toLowerCase();
  const k = Object.keys(MAP_PRODS).find((x) => { const y = x.toLowerCase(); return y.startsWith(s) || s.startsWith(y); });
  return k ? { key: k, ...MAP_PRODS[k] } : null;
}
function hidratarMapa() {
  const fonte = SB_ON ? ((CAT_EXTRA.v && CAT_EXTRA.v.produtos) || []) : demoProdsMapa();
  const novo = {};
  fonte.filter((p) => p.usar_no_mapa).forEach((p, i) => { novo[p.nome] = { u: String(p.unidade_mapa || '').trim(), step: Number(p.passo_dose) || 1, def: Number(p.dose_padrao) || Number(p.passo_dose) || 1, c: p.cor_mapa || PEN_COLORS[i % PEN_COLORS.length], prodId: SB_ON ? p.id : null, conteudo: Number(p.conteudo_por_unidade) || null, unEstoque: p.unidade ? p.unidade.nome : 'Unidade', nomeEstoque: p.nome }; });
  if (!Object.keys(novo).length) Object.entries(MAP_PADRAO).forEach(([k, v]) => { if (k !== COMENTARIO) novo[k] = { ...v, u: String(v.u || '').trim() }; });
  novo[COMENTARIO] = { u: '', step: 0, def: 0, c: '#F5B400' };
  Object.keys(MAP_PRODS).forEach((k) => delete MAP_PRODS[k]); Object.assign(MAP_PRODS, novo);
  MAPA_VER.v = MAPA_VER.v + 1; MAPA_VER.subs.forEach((f) => f());
}
const UN_COLADA = ['U', 'ml', 'mg', 'cm'];
const UN_SG = { fios: 'fio', seringas: 'seringa', 'sessões': 'sessão', 'aplicações': 'aplicação' };
const UN_PL = { fio: 'fios', seringa: 'seringas', 'sessão': 'sessões', 'aplicação': 'aplicações' };
const unPonto = (p) => (p.un != null && String(p.un).trim() !== '' ? String(p.un).trim() : p.prod === COMENTARIO ? '' : String((mapProd(p.prod) || {}).u || '').trim());
const corPonto = (p) => p.cor || (mapProd(p.prod) || {}).c || '#8A97AE';
const doseLbl = (prod, d, un) => {
  const u = un != null && String(un).trim() !== '' ? String(un).trim() : prod === COMENTARIO ? '' : String((mapProd(prod) || {}).u || '').trim();
  if (!u) return '';
  const n = Math.round((+d || 0) * 100) / 100, t = String(n).replace('.', ',');
  if (UN_COLADA.includes(u)) return t + u;
  return t + ' ' + (n === 1 ? (UN_SG[u] || u) : (UN_PL[u] || u));
};
//@@B
const mapTotals = (points) => {
  const g = {}, out = [];
  (points || []).forEach((p) => {
    const m = mapProd(p.prod), key = m ? m.key : p.prod, un = unPonto(p), k = key + '|' + un;
    if (!g[k]) { g[k] = { prod: key, un, c: m ? m.c : corPonto(p), n: 0, total: 0, prodId: m ? m.prodId : null, conteudo: m ? m.conteudo : null, nomeEstoque: m ? m.nomeEstoque : null, unEstoque: m ? m.unEstoque : null, mesmaUn: !!m && String(m.u || '').trim() === un }; out.push(g[k]); }
    g[k].n += 1; g[k].total = Math.round((g[k].total + (un ? +p.dose || 0 : 0)) * 100) / 100;
  });
  return out;
};
//@@C
function BoardLayers({ bg, points, strokes, labels = true, sel, hover, k = 1, semImagem }) {
  return (
    <>
      {semImagem && isImg(bg) ? null : <rect x="0" y="0" width={BW} height={BH} fill="#F4F7FC" />}
      {isImg(bg) ? (semImagem ? null : <image href={bg} x="0" y="0" width={BW} height={BH} preserveAspectRatio="xMidYMid meet" />) : bg ? <svg x="0" y="0" width={BW} height={BH} viewBox={artBox(bg)} preserveAspectRatio="xMidYMid meet">{artContent(bg)}</svg> : null}
      {strokes.map((s) => <path key={s.id} data-sid={s.id} d={strokeD(s)} fill="none" stroke={s.color} strokeWidth={s.w} strokeOpacity={s.op} strokeLinecap="round" strokeLinejoin="round" style={{ filter: sel && sel.id === s.id ? 'drop-shadow(0 0 4px rgba(31,94,255,.9))' : 'none' }} />)}
      {points.map((p, i) => { const c = corPonto(p), dl0 = doseLbl(p.prod, p.dose, p.un), dl = dl0 || (p.prod && p.prod !== COMENTARIO && !unPonto(p) ? (String(p.prod).length > 22 ? String(p.prod).slice(0, 21) + '…' : String(p.prod)) : ''), on = (sel && sel.id === p.id) || hover === p.id; return (
        <g key={p.id} data-pid={p.id} transform={`translate(${p.x} ${p.y}) scale(${k})`} style={{ cursor: 'pointer' }}>
          {on ? <circle r="19" fill={c} opacity=".22" /> : null}
          <circle r="12" fill={c} stroke="#fff" strokeWidth="3" />
          <text y="4" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff" style={{ pointerEvents: 'none' }}>{i + 1}</text>
          {labels && dl ? <g style={{ pointerEvents: 'none' }}><rect x="15" y="-11" width={dl.length * 7.6 + 12} height="22" rx="11" fill="#fff" stroke={c} strokeWidth="1.5" /><text x="21" y="4" fontSize="12" fontWeight="700" fill={c}>{dl}</text></g> : null}
          {labels && p.com ? <circle cx="10" cy="-10" r="4.5" fill="#F5B400" stroke="#fff" strokeWidth="1.5" style={{ pointerEvents: 'none' }} /> : null}
        </g>); })}
    </>
  );
}
//@@D
const ZMAX = 10; // zoom de até 10 vezes para marcar pontos com precisão
const limView = (v) => { const z = Math.min(ZMAX, Math.max(1, v.z)); const w = BW / z, h = BH / z; return { z, x: Math.min(BW - w, Math.max(0, v.x)), y: Math.min(BH - h, Math.max(0, v.y)) }; };
async function carregarImagem(src) {
  let u = src;
  if (/^https?:/.test(src)) { try { const b = await (await fetch(src)).blob(); u = URL.createObjectURL(b); } catch (e) {} }
  return await new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = u; });
}
// imagem final do mapa: foto ou modelo por baixo, marcações por cima
async function imagemMapa(svgEl, bg, escala) {
  const c = document.createElement('canvas'); c.width = BW * escala; c.height = BH * escala;
  const g = c.getContext('2d'); g.fillStyle = '#F4F7FC'; g.fillRect(0, 0, c.width, c.height);
  if (isImg(bg)) { try { const im = await carregarImagem(bg); const s = Math.min(c.width / im.width, c.height / im.height), w = im.width * s, h = im.height * s; g.drawImage(im, (c.width - w) / 2, (c.height - h) / 2, w, h); } catch (e) {} }
  const cl = svgEl.cloneNode(true);
  cl.setAttribute('xmlns', 'http://www.w3.org/2000/svg'); cl.setAttribute('width', c.width); cl.setAttribute('height', c.height); cl.setAttribute('style', 'font-family: Inter, Arial, sans-serif');
  const ov = await carregarImagem('data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(cl)));
  g.drawImage(ov, 0, 0, c.width, c.height);
  return c;
}
const nomeClinica = () => (SB_ON ? (SESSAO.v.clinica && SESSAO.v.clinica.nome) : 'Bella Forma Estética e Odontologia') || 'Clínica';
const profissionalAtual = () => { const pr = SB_ON ? PROF0.find((x) => x.usuarioId && x.usuarioId === UID()) : null; return pr ? pr.nome : SB_ON ? quemSou() : 'Dra. Camila Rocha'; };
const extrasDe = (pts) => (pts || []).filter((x) => x.prod !== COMENTARIO && !mapProd(x.prod)).reduce((a, x) => { a[x.prod] = { u: x.un || '', c: x.cor || '#8A97AE', step: x.un === 'ml' ? 0.1 : 1, def: +x.dose || 1 }; return a; }, {});
const r2 = (n) => Math.round(n * 100) / 100;

function JanelaMapa({ titulo, subtitulo, onFechar, children, rodape, largura = 640 }) {
  return (
    <Overlay><div style={{ position: 'fixed', inset: 0, zIndex: 320, background: 'rgba(14,35,80,.35)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={onFechar}>
      <div role="dialog" aria-label={titulo} onClick={(e) => e.stopPropagation()} style={{ width: `min(${largura}px, 100%)`, maxHeight: '100%', display: 'flex', flexDirection: 'column', borderRadius: 28, background: 'linear-gradient(180deg,#F5F9FF,#EAF2FD)', boxShadow: '0 30px 60px -30px rgba(23,73,170,.6)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10, padding: '20px 22px 12px' }}>
          <div><p style={{ margin: 0, fontSize: 19, fontWeight: 600, color: 'var(--text-strong)' }}>{titulo}</p>{subtitulo ? <p style={{ margin: '2px 0 0', fontSize: 13, color: 'var(--text-muted)' }}>{subtitulo}</p> : null}</div>
          <button type="button" aria-label="Fechar" onClick={onFechar} style={{ ...fCircle, flexShrink: 0 }}><OIcon name="x" size={18} /></button>
        </div>
        <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '4px 22px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>{children}</div>
        {rodape ? <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: '12px 22px 20px', borderTop: '1px solid rgba(214,226,242,.9)' }}>{rodape}</div> : null}
      </div>
    </div></Overlay>
  );
}

/* Quais produtos do estoque aparecem no mapa, com cor, unidade, passo, dose e quanto rende cada unidade do estoque */
function ProdutosMapaJanela({ onFechar }) {
  const fonte = SB_ON ? ((CAT_EXTRA.v && CAT_EXTRA.v.produtos) || []) : demoProdsMapa();
  const [rows, setRows] = React.useState(() => fonte.map((p) => ({ id: p.id, nome: p.nome, un: p.unidade ? p.unidade.nome : 'Unidade', on: !!p.usar_no_mapa, cor: p.cor_mapa || '#1F5EFF', u: p.unidade_mapa || 'un', passo: p.passo_dose != null ? String(p.passo_dose) : '1', def: p.dose_padrao != null ? String(p.dose_padrao) : '1', cont: p.conteudo_por_unidade != null ? String(p.conteudo_por_unidade) : '' })).sort((a, b) => Number(b.on) - Number(a.on) || a.nome.localeCompare(b.nome)));
  const [q, setQ] = React.useState('');
  const [salvando, setSalvando] = React.useState(false);
  const set = (id, v) => setRows((l) => l.map((r) => (r.id === id ? { ...r, ...v } : r)));
  const num = (v) => { const n = BR.num(v); return n == null ? null : n; };
  const dados = (r) => ({ usar_no_mapa: r.on, cor_mapa: r.cor || null, unidade_mapa: String(r.u || '').trim() || null, passo_dose: num(r.passo), dose_padrao: num(r.def), conteudo_por_unidade: num(r.cont) });
  const salvar = async () => {
    const mud = rows.filter((r) => { const o = fonte.find((x) => x.id === r.id) || {}; const d = dados(r); return Object.keys(d).some((k) => String(d[k] == null ? '' : d[k]) !== String(o[k] == null ? '' : (k === 'usar_no_mapa' ? !!o[k] : o[k]))); });
    if (SB_ON) {
      setSalvando(true);
      try { for (const r of mud) await DB.upd('produtos', r.id, dados(r), 'Não foi possível salvar ' + r.nome); }
      catch (e) { setSalvando(false); return; }
      CAT_EXTRA.v = { ...CAT_EXTRA.v, produtos: (CAT_EXTRA.v.produtos || []).map((p) => { const r = mud.find((x) => x.id === p.id); return r ? { ...p, ...dados(r) } : p; }) }; avisar(CAT_EXTRA);
      setSalvando(false);
    } else MAPA_DEMO.v = MAPA_DEMO.v.map((p) => { const r = mud.find((x) => x.id === p.id); return r ? { ...p, ...dados(r) } : p; });
    hidratarMapa(); onFechar();
  };
  const vis = rows.filter((r) => !q.trim() || r.nome.toLowerCase().includes(q.trim().toLowerCase()));
  const inp = { height: 36, borderRadius: 12, border: '1.5px solid rgba(214,226,242,.95)', background: '#fff', padding: '0 10px', fontFamily: 'inherit', fontSize: 14, color: 'var(--text-strong)', outline: 'none', minWidth: 0, boxSizing: 'border-box' };
  const campo = (rot, el) => <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12, color: 'var(--text-muted)' }}>{rot}{el}</label>;
  return (
    <JanelaMapa titulo="Produtos do mapa" subtitulo="Escolha os produtos do estoque que aparecem na marcação. A quantidade marcada vira baixa no estoque quando você gera o procedimento." onFechar={onFechar}
      rodape={<><OBtn variant="secondary" onClick={onFechar}>Cancelar</OBtn><OBtn iconLeft="check" loading={salvando} onClick={salvar}>Salvar</OBtn></>}>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar produto do estoque" aria-label="Buscar produto" style={{ ...inp, height: 42, borderRadius: 999, padding: '0 16px' }} />
      {vis.map((r) => (
        <div key={r.id} style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 12, borderRadius: 16, background: r.on ? 'rgba(255,255,255,.9)' : 'rgba(255,255,255,.55)', border: '1.5px solid rgba(255,255,255,.95)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 12, height: 12, borderRadius: '50%', background: r.on ? r.cor : 'rgba(150,175,210,.5)', flexShrink: 0 }} />
            <span style={{ flex: 1, minWidth: 0 }}><span style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}>{r.nome}</span><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>No estoque em {r.un.toLowerCase()}</span></span>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Usar no mapa</span><MiniToggle on={r.on} onChange={(v) => set(r.id, { on: v })} label={'Usar ' + r.nome + ' no mapa'} />
          </div>
          {r.on ? <>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}><span style={{ fontSize: 12, color: 'var(--text-muted)', marginRight: 4 }}>Cor</span>{PEN_COLORS.concat(['#F5B400', '#C084FC']).map((c) => <button key={c} type="button" aria-label={'Cor ' + c} onClick={() => set(r.id, { cor: c })} style={{ width: 22, height: 22, borderRadius: '50%', border: 0, cursor: 'pointer', background: c, boxShadow: r.cor === c ? `0 0 0 2px #fff, 0 0 0 4px ${c}` : 'none' }} />)}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(118px, 1fr))', gap: 8 }}>
              {campo('Unidade no mapa', <select value={r.u} onChange={(e) => set(r.id, { u: e.target.value })} style={{ ...inp, cursor: 'pointer' }}>{Array.from(new Set(UNIDADES_MAPA.concat(['fios', r.u]))).filter(Boolean).map((u) => <option key={u} value={u}>{u}</option>)}</select>)}
              {campo('Passo do + e −', <input value={r.passo} onChange={(e) => set(r.id, { passo: e.target.value })} inputMode="decimal" style={inp} />)}
              {campo('Dose de cada toque', <input value={r.def} onChange={(e) => set(r.id, { def: e.target.value })} inputMode="decimal" style={inp} />)}
              {campo('1 ' + r.un.toLowerCase() + ' rende', <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><input value={r.cont} onChange={(e) => set(r.id, { cont: e.target.value })} inputMode="decimal" placeholder="Ex.: 100" style={{ ...inp, flex: 1 }} /><span style={{ fontSize: 13, color: 'var(--text-strong)' }}>{r.u}</span></span>)}
            </div>
          </> : null}
        </div>
      ))}
      {!vis.length ? <span style={{ fontSize: 14, color: 'var(--text-muted)', textAlign: 'center', padding: 16 }}>{rows.length ? 'Nenhum produto com esse nome.' : 'Cadastre os produtos em Gestão, Estoque, para usar aqui.'}</span> : null}
    </JanelaMapa>
  );
}

function MapEditor({ initial, onSave, onBack, wide, p, ultimo, onDoc, onProc }) {
  useStore(MAPA_VER);
  const norm = (pts) => (pts || []).map((x) => { const m = x.prod === COMENTARIO ? null : mapProd(x.prod); return m && m.key !== x.prod ? { ...x, prod: m.key } : x; });
  const primeiro = () => Object.keys(MAP_PRODS).find((k) => k !== COMENTARIO) || COMENTARIO;
  const [name, setName] = React.useState(initial ? initial.title : 'Mapeamento ' + HOJE.slice(0, 5));
  const [cat, setCat] = React.useState(initial ? initial.cat || null : null);
  const [catDesc, setCatDesc] = React.useState(initial ? initial.catDesc || '' : '');
  const [obsMapa, setObsMapa] = React.useState(initial ? initial.obs || '' : '');
  const [cheia, setCheia] = React.useState(false);
  const [outroPt, setOutroPt] = React.useState(null);
  const [bg, setBg] = React.useState(initial ? initial.bg : null);
  const [bgPath, setBgPath] = React.useState(initial ? initial.bgPath || null : null);
  const [points, setPoints] = React.useState(() => (initial ? norm(initial.points) : []));
  const [strokes, setStrokes] = React.useState(initial ? initial.strokes : []);
  const [extras, setExtras] = React.useState(() => (initial ? extrasDe(initial.points) : {}));
  const [tool, setTool] = React.useState('pontos');
  const [prodPref, setProdPref] = SB_ON ? usePrefFiltro('mapa.produto', '') : React.useState('');
  const prod0 = () => (prodPref && MAP_PRODS[prodPref] ? prodPref : primeiro());
  const [prod, setProd] = React.useState(prod0);
  const [dose, setDose] = React.useState(() => (MAP_PRODS[prod0()] || {}).def || 1);
  const [outro, setOutro] = React.useState(null);
  const [color, setColor] = React.useState('#7B4BC4');
  const [width, setWidth] = React.useState(6);
  const [opacity, setOpacity] = React.useState(0.9);
  const [eraser, setEraser] = SB_ON ? usePrefFiltro('mapa.borracha', 22) : React.useState(22);
  const [hist, setHist] = React.useState({ past: [], future: [] });
  const [draft, setDraft] = React.useState(null);
  const [sel, setSel] = React.useState(null);
  const [hover, setHover] = React.useState(null);
  const [cursor, setCursor] = React.useState(null);
  const [imgMenu, setImgMenu] = React.useState(false);
  const [view, setView] = React.useState({ z: 1, x: 0, y: 0 });
  const [estado, setEstado] = React.useState(null);
  const [savedAt, setSavedAt] = React.useState(null);
  const [rev, setRev] = React.useState(0);
  const [prodsJan, setProdsJan] = React.useState(false);
  const [menuExp, setMenuExp] = React.useState(false);
  const [exportando, setExportando] = React.useState(null);
  const svgRef = React.useRef(null), expRef = React.useRef(null), drag = React.useRef(null), ptrs = React.useRef(new Map()), recId = React.useRef(initial ? initial.id : null), pend = React.useRef(false), dadosRef = React.useRef(null);
  const cheiaRef = React.useRef(false); cheiaRef.current = cheia;
  dadosRef.current = { kind: 'mapa', title: name.trim() || 'Mapeamento', bg, bgPath, cat, catDesc: cat === 'outra' ? catDesc.trim() : '', obs: obsMapa.trim(), points, strokes };
  const mudou = () => setRev((r) => r + 1);
  // o produto ativo some quando a lista do estoque chega: troca pelo equivalente
  React.useEffect(() => { if (!MAP_PRODS[prod] && !extras[prod]) { const m = mapProd(prod); const k = m ? m.key : prod0(); setProd(k); setDose((MAP_PRODS[k] || {}).def || 1); } }, [MAPA_VER.v]);
  const prodInfo = (k) => (MAP_PRODS[k] ? { key: k, ...MAP_PRODS[k] } : extras[k] ? { key: k, ...extras[k], extra: true } : mapProd(k) || { key: k, u: '', c: '#8A97AE', step: 1, def: 1 });
  /* ---- salvamento automático ---- */
  const selP = sel && sel.t === 'p' ? points.find((q) => q.id === sel.id) : null;
  const salvarAgora = () => { const id = onSave({ ...dadosRef.current, id: recId.current }); recId.current = id; pend.current = false; setEstado('salvo'); setSavedAt(nowHM()); return id; };
  React.useEffect(() => { if (!rev || !bg) return; if (!recId.current && !points.length && !strokes.length) return; pend.current = true; setEstado('salvando'); const t = setTimeout(salvarAgora, 1200); return () => clearTimeout(t); }, [rev]);
  React.useEffect(() => () => { if (pend.current) { try { onSave({ ...dadosRef.current, id: recId.current }); } catch (e) {} } }, []);
  const sair = () => { if (pend.current) salvarAgora(); onBack(); };
  /* ---- zoom ---- */
  const vw = BW / view.z, vh = BH / view.z;
  const zoomBtn = (f) => setView((v) => { const w = BW / v.z, h = BH / v.z, cx = v.x + w / 2, cy = v.y + h / 2, z = Math.min(ZMAX, Math.max(1, v.z * f)); return limView({ z, x: cx - BW / z / 2, y: cy - BH / z / 2 }); });
  React.useEffect(() => {
    const el = svgRef.current; if (!el) return;
    const fn = (e) => { if (!(e.ctrlKey || e.metaKey || cheiaRef.current)) return; e.preventDefault(); const r = el.getBoundingClientRect();
      setView((v) => { const w = BW / v.z, h = BH / v.z, px = v.x + (e.clientX - r.left) / r.width * w, py = v.y + (e.clientY - r.top) / r.height * h, z = Math.min(ZMAX, Math.max(1, v.z * Math.exp(-e.deltaY * (e.ctrlKey || e.metaKey ? 0.01 : 0.0025)))); return limView({ z, x: px - (px - v.x) * (BW / z) / w, y: py - (py - v.y) * (BH / z) / h }); }); };
    el.addEventListener('wheel', fn, { passive: false }); return () => el.removeEventListener('wheel', fn);
  }, [bg, cheia]);
  // tela cheia: Esc fecha
  React.useEffect(() => { if (!cheia) return undefined; const k = (e) => { if (e.key === 'Escape' && !sel) setCheia(false); }; window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k); }, [cheia, sel]);
  React.useEffect(() => { setOutroPt(null); }, [sel && sel.id]);
  const getPt = (e) => { const r = svgRef.current.getBoundingClientRect(); return [view.x + (e.clientX - r.left) / r.width * vw, view.y + (e.clientY - r.top) / r.height * vh]; };
  /* ---- edição ---- */
  const commit = (np, ns) => { setHist((h) => ({ past: [...h.past, { points, strokes }], future: [] })); setPoints(np); setStrokes(ns); mudou(); };
  const undo = () => { if (!hist.past.length) return; const last = hist.past[hist.past.length - 1]; setHist({ past: hist.past.slice(0, -1), future: [{ points, strokes }, ...hist.future] }); setPoints(last.points); setStrokes(last.strokes); setSel(null); mudou(); };
  const redo = () => { if (!hist.future.length) return; const nx = hist.future[0]; setHist({ past: [...hist.past, { points, strokes }], future: hist.future.slice(1) }); setPoints(nx.points); setStrokes(nx.strokes); mudou(); };
  const eraseAt = (pt) => { const er = eraser / view.z; setPoints((ps) => ps.filter((q) => Math.hypot(q.x - pt[0], q.y - pt[1]) > er + 8 / view.z)); setStrokes((ss) => ss.filter((s) => !hitStroke(s, pt, er + s.w / 2))); };
  const updP = (id, v) => { setPoints((ps) => ps.map((q) => (q.id === id ? { ...q, ...v } : q))); mudou(); };
  const updS = (id, v) => { setStrokes((ss) => ss.map((s) => (s.id === id ? { ...s, ...v } : s))); mudou(); };
  const marcar = (pt) => { const inf = prodInfo(prod); commit([...points, { id: 'p' + Date.now(), x: pt[0], y: pt[1], prod: inf.key, dose: inf.u ? dose : 0, un: inf.extra ? inf.u : null, cor: inf.extra ? inf.c : null, com: '' }], strokes); };
  const duplicar = (q) => { const n = { ...q, id: 'p' + Date.now(), x: Math.min(BW - 10, q.x + 18 / view.z), y: Math.min(BH - 10, q.y + 18 / view.z) }; commit([...points, n], strokes); setSel({ t: 'p', id: n.id }); };
  const excluir = (id) => { commit(points.filter((q) => q.id !== id), strokes); if (sel && sel.id === id) setSel(null); };
  const trocarProd = (q, k) => { const inf = prodInfo(k); updP(q.id, { prod: k, dose: inf.u ? inf.def : 0, un: inf.extra ? inf.u : null, cor: inf.extra ? inf.c : null }); };
  const abrirPonto = (id) => { const q = points.find((x) => x.id === id); setTool('pontos'); setSel({ t: 'p', id }); if (q && view.z > 1) setView((v) => limView({ z: v.z, x: q.x - BW / v.z / 2, y: q.y - BH / v.z / 2 })); };
  /* ---- toque, pinça e arraste ---- */
  const onDown = (e) => {
    if (!bg) return;
    ptrs.current.set(e.pointerId, [e.clientX, e.clientY]);
    try { svgRef.current.setPointerCapture(e.pointerId); } catch (err) {}
    if (ptrs.current.size === 2) {
      const [a, b] = Array.from(ptrs.current.values()), r = svgRef.current.getBoundingClientRect(), mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
      const g0 = drag.current; if (g0 && g0.snap) { setPoints(g0.snap.points); setStrokes(g0.snap.strokes); }
      setDraft(null);
      drag.current = { mode: 'pinch', d0: Math.hypot(a[0] - b[0], a[1] - b[1]) || 1, z0: view.z, p0: [view.x + (mx - r.left) / r.width * vw, view.y + (my - r.top) / r.height * vh] };
      return;
    }
    if (ptrs.current.size > 2) return;
    const pt = getPt(e), tp = e.target.closest && e.target.closest('[data-pid]'), ts = e.target.closest && e.target.closest('[data-sid]');
    const pid = tp && tp.getAttribute('data-pid'), sid = ts && ts.getAttribute('data-sid');
    if (tool === 'pontos') { drag.current = { mode: 'tap', pt, pid, sid, c: [e.clientX, e.clientY], v0: view }; return; }
    setSel(null);
    if (tool === 'pincel' || tool === 'linha') setDraft({ id: 's' + Date.now(), type: tool === 'pincel' ? 'pen' : 'line', pts: [pt, pt], color, w: width / view.z, op: opacity, com: '' });
    else if (tool === 'borracha') { drag.current = { mode: 'erase', snap: { points, strokes } }; eraseAt(pt); }
    else if (tool === 'mover') {
      if (pid) { const o = points.find((q) => q.id === pid); drag.current = { mode: 'mp', id: pid, start: pt, o: { x: o.x, y: o.y }, snap: { points, strokes } }; }
      else if (sid) { const o = strokes.find((s) => s.id === sid); drag.current = { mode: 'ms', id: sid, start: pt, o: o.pts, snap: { points, strokes } }; }
      else drag.current = { mode: 'pan', c: [e.clientX, e.clientY], v0: view };
    }
  };
  const onMove = (e) => {
    if (!bg) return;
    if (ptrs.current.has(e.pointerId)) ptrs.current.set(e.pointerId, [e.clientX, e.clientY]);
    const g = drag.current;
    if (g && g.mode === 'pinch') {
      if (ptrs.current.size < 2) return;
      const [a, b] = Array.from(ptrs.current.values()), r = svgRef.current.getBoundingClientRect(), mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
      const z = Math.min(ZMAX, Math.max(1, g.z0 * Math.hypot(a[0] - b[0], a[1] - b[1]) / g.d0));
      setView(limView({ z, x: g.p0[0] - (mx - r.left) / r.width * (BW / z), y: g.p0[1] - (my - r.top) / r.height * (BH / z) }));
      return;
    }
    if (g && g.mode === 'none') return;
    const pt = getPt(e); setCursor(pt);
    if (draft) { setDraft((d) => (d.type === 'pen' ? (Math.hypot(pt[0] - d.pts[d.pts.length - 1][0], pt[1] - d.pts[d.pts.length - 1][1]) > 2 / view.z ? { ...d, pts: [...d.pts, pt] } : d) : { ...d, pts: [d.pts[0], pt] })); return; }
    if (!g) return;
    if (g.mode === 'tap') { if (Math.hypot(e.clientX - g.c[0], e.clientY - g.c[1]) > 8) drag.current = view.z > 1 ? { mode: 'pan', c: g.c, v0: g.v0 } : { mode: 'none' }; return; }
    if (g.mode === 'pan') { const r = svgRef.current.getBoundingClientRect(), w = BW / g.v0.z, h = BH / g.v0.z; setView(limView({ z: g.v0.z, x: g.v0.x - (e.clientX - g.c[0]) / r.width * w, y: g.v0.y - (e.clientY - g.c[1]) / r.height * h })); return; }
    if (g.mode === 'erase') eraseAt(pt);
    else if (g.mode === 'mp') setPoints((ps) => ps.map((q) => (q.id === g.id ? { ...q, x: g.o.x + pt[0] - g.start[0], y: g.o.y + pt[1] - g.start[1] } : q)));
    else if (g.mode === 'ms') setStrokes((ss) => ss.map((s) => (s.id === g.id ? { ...s, pts: g.o.map((q) => [q[0] + pt[0] - g.start[0], q[1] + pt[1] - g.start[1]]) } : s)));
  };
  const onUp = (e) => {
    ptrs.current.delete(e.pointerId);
    const g = drag.current;
    if (g && (g.mode === 'pinch' || g.mode === 'none')) { drag.current = ptrs.current.size ? { mode: 'none' } : null; return; }
    if (draft) { const ok = draft.type === 'pen' ? draft.pts.length > 2 : Math.hypot(draft.pts[1][0] - draft.pts[0][0], draft.pts[1][1] - draft.pts[0][1]) > 6 / view.z; if (ok) commit(points, [...strokes, draft.type === 'pen' ? { ...draft, pts: draft.pts.slice(1) } : draft]); setDraft(null); }
    if (!g) return;
    drag.current = null;
    if (g.mode === 'tap') { if (g.pid) setSel({ t: 'p', id: g.pid }); else if (g.sid) setSel({ t: 's', id: g.sid }); else if (sel) setSel(null); else marcar(g.pt); return; }
    if (g.mode === 'pan') return;
    setHist((h) => ({ past: [...h.past, g.snap], future: [] })); mudou();
  };
  /* ---- imagem, repetir, exportar, procedimento ---- */
  const pick = (src) => { setBg(src); setBgPath(null); setImgMenu(false); setView({ z: 1, x: 0, y: 0 }); mudou(); };
  const repetir = () => {
    const u = ultimo, t = Date.now(), np = norm(u.points).map((x, i) => ({ ...x, id: 'p' + t + '_' + i })), ns = (u.strokes || []).map((s, i) => ({ ...s, id: 's' + t + '_' + i }));
    setBg(u.bg); setBgPath(u.bgPath || null); setCat(u.cat || null); setCatDesc(u.cat === 'outra' ? u.catDesc || '' : ''); setName(String(u.title || 'Mapeamento').replace(/\s\d{2}\/\d{2}$/, '') + ' ' + HOJE.slice(0, 5));
    setPoints(np); setStrokes(ns); setExtras((x) => ({ ...x, ...extrasDe(np) })); setHist({ past: [], future: [] }); mudou();
  };
  const totals = mapTotals(points);
  const dataMapa = initial && initial.dataIso ? BR.dataTela(initial.dataIso) : initial && initial.date ? initial.date : HOJE;
  const imprimir = (img) => {
    const tot = totals.filter((t) => t.un);
    const linha = (cels) => '<tr>' + cels.map((c) => '<td>' + c + '</td>').join('') + '</tr>';
    const corpo = '<h1>' + escHtml(name) + '</h1><div class="m">' + escHtml(nomeClinica()) + '</div>' +
      '<table style="margin:14px 0 18px"><tr><td><span class="m">Paciente</span><br><b>' + escHtml(p ? p.nome : '') + '</b></td><td><span class="m">Data</span><br><b>' + escHtml(dataMapa) + '</b></td><td><span class="m">Profissional</span><br><b>' + escHtml(profissionalAtual()) + '</b></td>' + (areaMapaTxt(cat, catDesc) ? '<td><span class="m">Área</span><br><b>' + escHtml(areaMapaTxt(cat, catDesc)) + '</b></td>' : '') + '</tr></table>' +
      '<div style="text-align:center"><img src="' + img + '" style="max-height:540px;border:1px solid #DCE4F2;border-radius:12px"></div>' +
      (tot.length ? '<h2>Totais</h2><table><tr><th>Produto</th><th>Pontos</th><th>Total</th></tr>' + tot.map((t) => linha([escHtml(t.prod), t.n, '<b>' + escHtml(doseLbl(t.prod, t.total, t.un)) + '</b>'])).join('') + '</table>' : '') +
      (points.length ? '<h2>Pontos</h2><table><tr><th>#</th><th>Produto</th><th>Quantidade</th><th>Comentário</th></tr>' + points.map((x, i) => linha([i + 1, escHtml(x.prod), escHtml(doseLbl(x.prod, x.dose, x.un)), escHtml(x.com || '')])).join('') + '</table>' : '') +
      (strokes.some((s) => s.com) ? '<h2>Traços</h2><table>' + strokes.filter((s) => s.com).map((s) => linha([s.type === 'pen' ? 'Pincel' : 'Linha', escHtml(s.com)])).join('') + '</table>' : '') +
      (obsMapa.trim() ? '<h2>Observações</h2><p>' + escHtml(obsMapa.trim()).replace(/\n/g, '<br>') + '</p>' : '');
    imprimirHtml(name, corpo);
  };
  const exportar = async (tipo) => {
    setMenuExp(false); setExportando(tipo);
    try {
      const c = await imagemMapa(expRef.current, bg, tipo === 'pdf' ? 1.5 : 2), nome = (name.trim() || 'Mapeamento').replace(/[\\/:*?"<>|]+/g, '-');
      if (tipo === 'pdf') imprimir(c.toDataURL('image/png'));
      else {
        const b = await new Promise((res) => c.toBlob(res, 'image/png'));
        if (tipo === 'doc') { if (pend.current) salvarAgora(); onDoc(b, nome + '.png'); }
        else { const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = nome + '.png'; document.body.appendChild(a); a.click(); a.remove(); }
      }
    } catch (e) { avisoErro('Não foi possível gerar a imagem do mapa', e); }
    setExportando(null);
  };
  const gerarProc = () => {
    const id = salvarAgora(), mats = [], linhas = [];
    totals.filter((t) => t.un).forEach((t) => {
      linhas.push(t.prod + ': ' + doseLbl(t.prod, t.total, t.un) + ' em ' + t.n + (t.n === 1 ? ' ponto' : ' pontos'));
      if (!t.nomeEstoque) return;
      const q = t.conteudo && t.mesmaUn ? r2(t.total / t.conteudo) || 0.01 : 1;
      const ex = mats.find((m) => m.nome === t.nomeEstoque); if (ex) ex.q = r2(ex.q + q); else mats.push({ nome: t.nomeEstoque, q });
    });
    const sug = FIN_PROCS.find((x) => { const w = x.n.toLowerCase().split(' ')[0].replace(/s$/, ''); return w.length > 3 && mats.some((m) => m.nome.toLowerCase().startsWith(w)); });
    onProc({ mapaId: id, mats, titulo: sug ? sug.n : null, obs: 'Conforme o mapeamento "' + (name.trim() || 'Mapeamento') + '": ' + linhas.join('; ') + '.' });
  };
  const novoExtra = (nome, u) => { const n = String(nome || '').trim(); if (!n) return null; if (MAP_PRODS[n] || n === COMENTARIO) return prodInfo(n); const ex = extras[n]; if (ex && ex.u === u) return { key: n, ...ex, extra: true }; const inf = { u: u || '', c: ex ? ex.c : PEN_COLORS[(Object.keys(extras).length + 3) % PEN_COLORS.length], step: u === 'ml' ? 0.1 : 1, def: u ? 1 : 0 }; setExtras((x) => ({ ...x, [n]: inf })); return { key: n, ...inf, extra: true }; };
  const addOutro = () => { const inf = novoExtra(outro.nome, outro.u); if (!inf) return; setProd(inf.key); setDose(inf.u ? 1 : 0); setOutro(null); };
  const aplicarOutroPt = () => { if (!selP || !outroPt) return; const inf = novoExtra(outroPt.nome, outroPt.u); if (!inf) return; updP(selP.id, { prod: inf.key, un: inf.extra ? inf.u : null, cor: inf.extra ? inf.c : selP.cor || null, dose: inf.u ? (+selP.dose || inf.def || 1) : 0 }); setOutroPt(null); };
  /* ---- tela ---- */
  const selS = sel && sel.t === 's' ? strokes.find((s) => s.id === sel.id) : null;
  const pm = prodInfo(prod);
  const chips = Array.from(new Set(Object.keys(MAP_PRODS).filter((k) => k !== COMENTARIO).concat(Object.keys(extras)))).concat([COMENTARIO]);
  const TOOLS = [['pontos', 'Pontos', 'map-pin'], ['pincel', 'Pincel', 'pencil'], ['linha', 'Linha', 'minus'], ['borracha', 'Borracha', 'eraser'], ['mover', 'Mover', 'hand']];
  const tb = (on) => ({ display: 'inline-flex', alignItems: 'center', gap: 6, height: 36, padding: '0 14px', borderRadius: 999, border: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, whiteSpace: 'nowrap', color: on ? '#fff' : 'var(--text-strong)', background: on ? 'linear-gradient(180deg,#0B4BEB,#1FA8F5)' : 'transparent', boxShadow: on ? '0 6px 14px -8px rgba(11,75,235,.8)' : 'none' });
  const ic = { ...fCircle, width: 34, height: 34, background: 'transparent', border: 0 };
  const mini = { ...fCircle, width: 28, height: 28, background: 'transparent', border: 0, color: 'var(--text-muted)' };
  const range = (v, set, min, max, step, fmt) => <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-muted)' }}><input type="range" min={min} max={max} step={step} value={v} onChange={(e) => set(+e.target.value)} style={{ width: 110, accentColor: '#1F5EFF' }} /><b style={{ color: 'var(--text-strong)', minWidth: 34 }}>{fmt(v)}</b></span>;
  const sideCard = (title, n, children, right) => <div style={{ ...soft, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}><span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}>{title}{n !== undefined ? ` (${n})` : ''}</span>{right}</div>{children}</div>;
  const empty = (t) => <span style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>{t}</span>;
  const inl = { flex: 1, minWidth: 0, height: 32, border: '1.5px solid rgba(214,226,242,.95)', borderRadius: 999, padding: '0 10px', fontFamily: 'inherit', fontSize: 13, outline: 'none', background: '#fff', color: 'var(--text-strong)', boxSizing: 'border-box' };
  const chipUn = (on) => ({ height: 28, padding: '0 10px', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 500, border: on ? '1.5px solid #1F5EFF' : '1.5px solid rgba(214,226,242,.95)', background: on ? 'rgba(31,94,255,.08)' : '#fff', color: on ? '#1F5EFF' : 'var(--text-strong)' });
  const pctX = (x) => (x - view.x) / vw * 100, pctY = (y) => (y - view.y) / vh * 100;
  // comando de voz: ajustar um ponto pelo número ("ponto 3, 6 unidades")
  const vozRef = React.useRef(null);
  vozRef.current = {
    ajustar: (n, m) => {
      const q = points[n - 1];
      if (!q) return { erro: points.length ? 'O mapa tem ' + points.length + (points.length === 1 ? ' ponto.' : ' pontos.') : 'O mapa ainda não tem pontos.' };
      if (m.excluir) { excluir(q.id); return { ok: true, ponto: n, excluido: true }; }
      const patch = {};
      if (m.produto) { const t = String(m.produto).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); const k = chips.find((c) => { const x = c.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); return x.includes(t) || t.includes(x.split(' ')[0]); }); if (!k) return { erro: 'Produtos do mapa: ' + chips.join(', ') + '.' }; const inf = prodInfo(k); Object.assign(patch, { prod: k, dose: inf.u ? inf.def : 0, un: inf.extra ? inf.u : null, cor: inf.extra ? inf.c : null }); }
      if (m.quantidade != null && m.quantidade !== '') patch.dose = Math.max(0, r2(+m.quantidade));
      if (m.unidade) patch.un = String(m.unidade).trim();
      if (m.comentario != null && m.comentario !== '') patch.com = String(m.comentario);
      if (!Object.keys(patch).length) return { erro: 'O que mudo no ponto ' + n + '?' };
      updP(q.id, patch); setTool('pontos'); setSel({ t: 'p', id: q.id });
      const nq = { ...q, ...patch }, dl = doseLbl(nq.prod, nq.dose, nq.un);
      return { ok: true, ponto: n, agora: (nq.prod === COMENTARIO ? 'comentário' : nq.prod) + (dl ? ' ' + dl : '') };
    },
  };
  React.useEffect(() => { const api = { ajustar: (n, m) => vozRef.current.ajustar(n, m || {}) }; window.RN_MAPA = api; return () => { if (window.RN_MAPA === api) window.RN_MAPA = null; }; }, []);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <button type="button" aria-label="Voltar ao prontuário" onClick={sair} style={{ ...fCircle, width: 38, height: 38 }}><OIcon name="arrow-left" size={17} /></button>
        <input value={name} onChange={(e) => { setName(e.target.value); mudou(); }} aria-label="Nome do mapeamento" style={{ flex: 1, minWidth: 160, height: 40, borderRadius: 999, border: '1.5px solid rgba(255,255,255,.95)', background: 'rgba(255,255,255,.75)', padding: '0 16px', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: 'var(--text-strong)', outline: 'none' }} />
        {bg ? <PillSelect icon="tag" label="Área do mapeamento" value={cat || ''} onChange={(v) => { setCat(v || null); mudou(); }} options={[['', 'Área'], ...CATS_MAPA.map(([k, l]) => [k, k === 'outra' ? 'Outra (escrever)' : l])]} /> : null}
        {bg && cat === 'outra' ? <input value={catDesc} onChange={(e) => { setCatDesc(e.target.value); mudou(); }} placeholder="Qual área? Ex.: couro cabeludo" aria-label="Qual é a área do mapeamento" style={{ width: 220, maxWidth: '100%', height: 40, borderRadius: 999, border: '1.5px solid rgba(31,94,255,.35)', background: '#fff', padding: '0 16px', fontFamily: 'inherit', fontSize: 14, color: 'var(--text-strong)', outline: 'none', boxSizing: 'border-box' }} /> : null}
        {estado === 'salvando' ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-muted)' }}><OIcon name="loader" size={13} />Salvando...</span> : estado === 'salvo' && savedAt ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#2DBF6A' }}><OIcon name="check" size={13} />Salvo às {savedAt}</span> : null}
        <span style={{ position: 'relative' }}>
          <OBtn size="sm" variant="secondary" iconLeft="download" loading={!!exportando} onClick={() => setMenuExp(!menuExp)} disabled={!bg}>Exportar</OBtn>
          {menuExp ? <div style={{ position: 'absolute', right: 0, top: 44, zIndex: 6, width: 250, padding: 6, borderRadius: 16, background: '#fff', boxShadow: '0 20px 40px -18px rgba(23,73,170,.55)', display: 'flex', flexDirection: 'column' }}>
            {[['png', 'Baixar imagem (PNG)', 'image-down'], ['pdf', 'Imprimir ou salvar PDF', 'printer'], ...(onDoc ? [['doc', 'Salvar em Documentação Clínica', 'folder-input']] : [])].map(([k, l, i]) => <button key={k} type="button" onClick={() => exportar(k)} style={{ display: 'flex', alignItems: 'center', gap: 10, height: 40, padding: '0 12px', border: 0, borderRadius: 12, background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, color: 'var(--text-strong)', textAlign: 'left' }}><span style={{ color: '#1F5EFF', display: 'flex' }}><OIcon name={i} size={16} /></span>{l}</button>)}
          </div> : null}
        </span>
        <OBtn size="sm" iconLeft="save" onClick={salvarAgora} disabled={!bg}>Salvar</OBtn>
      </div>
      {!bg ? (
        <div style={{ ...soft, padding: wide ? 28 : 18, border: '2px dashed rgba(31,94,255,.3)', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div><p style={{ margin: 0, fontSize: 17, fontWeight: 600, color: 'var(--text-strong)' }}>Qual área vai marcar?</p><p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--text-muted)' }}>Escolha a área e o modelo certo já abre. Também dá para subir uma foto do paciente ou usar um modelo seu.</p></div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{CATS_MAPA.map(([k, l, m]) => <FilterChip key={k} active={cat === k} onClick={() => { setCat(k); if (m) pick(m); else mudou(); }}>{k === 'outra' ? <><OIcon name="pencil-line" size={13} />Outra área</> : l}</FilterChip>)}</div>
          {cat === 'outra' ? <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxWidth: 460 }}><OInput label="Escreva a área" iconLeft="pencil-line" value={catDesc} onChange={(e) => { setCatDesc(e.target.value); mudou(); }} placeholder="Ex.: couro cabeludo, mãos, costas, pata dianteira" autoFocus /><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Depois suba a foto do paciente ou escolha um modelo abaixo.</span></div> : null}
          {ultimo ? <button type="button" onClick={repetir} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 10, borderRadius: 16, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', border: '1.5px solid rgba(31,94,255,.35)', background: 'rgba(31,94,255,.05)' }}>
            <MapThumb r={ultimo} h={64} />
            <span style={{ flex: 1, minWidth: 0 }}><span style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}>Repetir o último mapeamento</span><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{ultimo.title} · {ultimo.date} · {ultimo.points.length} {ultimo.points.length === 1 ? 'ponto' : 'pontos'}. Você ajusta o que mudou.</span></span>
            <span style={{ color: '#1F5EFF', display: 'flex' }}><OIcon name="copy" size={18} /></span>
          </button> : null}
          <ImagePicker onPick={pick} />
        </div>
      ) : <div style={cheia ? { position: 'fixed', inset: 0, zIndex: 165, background: 'linear-gradient(180deg,#E7F0FC 0%,#F4F8FE 100%)', padding: wide ? '14px 20px' : 10, boxSizing: 'border-box', overflowY: 'auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', alignContent: 'start', gap: 10 } : { display: 'contents' }}>
        {cheia ? <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ flex: 1, minWidth: 0, fontSize: 16, fontWeight: 600, color: 'var(--text-strong)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name.trim() || 'Mapeamento'}{areaMapaTxt(cat, catDesc) ? <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}> · {areaMapaTxt(cat, catDesc)}</span> : null}</span>{estado === 'salvo' && savedAt ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#2DBF6A' }}><OIcon name="check" size={13} />Salvo às {savedAt}</span> : null}<OBtn size="sm" variant="secondary" iconLeft="minimize-2" onClick={() => setCheia(false)}>Sair da tela cheia</OBtn></div> : null}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: 4, borderRadius: 999, background: 'rgba(255,255,255,.7)', border: '1.5px solid rgba(255,255,255,.95)', overflowX: 'auto', scrollbarWidth: 'none', position: 'relative' }}>
          {TOOLS.map(([k, l, i]) => <button key={k} type="button" onClick={() => { setTool(k); setSel(null); }} aria-pressed={tool === k} style={tb(tool === k)}><OIcon name={i} size={15} />{l}</button>)}
          <span style={{ width: 1, height: 22, background: 'rgba(150,175,210,.5)', margin: '0 6px', flexShrink: 0 }} />
          <button type="button" aria-label="Desfazer" title="Desfazer" onClick={undo} style={{ ...ic, opacity: hist.past.length ? 1 : 0.35 }}><OIcon name="undo-2" size={16} /></button>
          <button type="button" aria-label="Refazer" title="Refazer" onClick={redo} style={{ ...ic, opacity: hist.future.length ? 1 : 0.35 }}><OIcon name="redo-2" size={16} /></button>
          <button type="button" onClick={() => { if (points.length || strokes.length) { commit([], []); setSel(null); } }} style={{ ...tb(false), color: '#E5484D' }}>Limpar tudo</button>
          <span style={{ width: 1, height: 22, background: 'rgba(150,175,210,.5)', margin: '0 6px', flexShrink: 0 }} />
          <button type="button" onClick={() => setImgMenu(!imgMenu)} aria-expanded={imgMenu} style={{ ...tb(imgMenu), border: imgMenu ? 0 : '1.5px solid rgba(214,226,242,.95)' }}><OIcon name="image" size={15} />Imagem</button>
        </div>
        {imgMenu ? <div style={{ ...soft, background: 'rgba(255,255,255,.95)', padding: 16, boxShadow: '0 18px 36px -20px rgba(23,73,170,.5)' }}><ImagePicker onPick={pick} compact /></div> : null}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', minHeight: 36, padding: '2px 6px' }}>
          {tool === 'pontos' ? <>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Cada toque marca:</span>
            {chips.map((k) => { const inf = prodInfo(k); return <FilterChip key={k} active={prod === k} onClick={() => { setProd(k); setDose(inf.def || 1); setOutro(null); if (MAP_PRODS[k] && k !== prodPref) setProdPref(k); }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: inf.c }} />{k}</FilterChip>; })}
            {outro ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <input autoFocus value={outro.nome} onChange={(e) => setOutro({ ...outro, nome: e.target.value })} onKeyDown={(e) => { if (e.key === 'Enter') addOutro(); if (e.key === 'Escape') { e.stopPropagation(); setOutro(null); } }} placeholder="O que vai marcar? Ex.: mancha" aria-label="O que vai marcar" style={{ ...inl, flex: 'none', width: 200 }} />
              <select value={outro.u} onChange={(e) => setOutro({ ...outro, u: e.target.value })} aria-label="Unidade" style={{ ...inl, flex: 'none', width: 138, cursor: 'pointer' }}><option value="">sem quantidade</option>{UNIDADES_MAPA.map((u) => <option key={u} value={u}>{u}</option>)}</select>
              <OBtn size="sm" onClick={addOutro} disabled={!String(outro.nome).trim()}>Usar</OBtn>
              <button type="button" aria-label="Cancelar" onClick={() => setOutro(null)} style={mini}><OIcon name="x" size={14} /></button>
            </span> : <FilterChip active={false} onClick={() => setOutro({ nome: '', u: 'un' })}><OIcon name="plus" size={13} />Outro</FilterChip>}
            {pm.u ? <Stepper label={doseLbl(prod, dose, pm.u)} onDec={() => setDose((d) => Math.max(pm.step || 1, r2(d - (pm.step || 1))))} onInc={() => setDose((d) => r2(d + (pm.step || 1)))} /> : null}
            <button type="button" style={linkBtn} onClick={() => setProdsJan(true)}><OIcon name="settings-2" size={13} />Produtos do mapa</button>
          </> : null}
          {tool === 'pincel' || tool === 'linha' ? <>
            <span style={{ display: 'inline-flex', gap: 6 }}>{PEN_COLORS.map((c) => <button key={c} type="button" aria-label={'Cor ' + c} onClick={() => setColor(c)} style={{ width: 24, height: 24, borderRadius: '50%', border: 0, cursor: 'pointer', background: c, boxShadow: color === c ? `0 0 0 2px #fff, 0 0 0 4px ${c}` : 'none' }} />)}</span>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Espessura</span>{range(width, setWidth, 2, 24, 1, (v) => v + 'px')}
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Opacidade</span>{range(opacity, setOpacity, 0.2, 1, 0.05, (v) => Math.round(v * 100) + '%')}
          </> : null}
          {tool === 'borracha' ? <><span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Tamanho</span>{range(eraser, setEraser, 8, 60, 1, (v) => v + 'px')}<span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Passe sobre pontos ou traços para apagar.</span></> : null}
          {tool === 'mover' ? <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Arraste um ponto ou traço para mudar de lugar. Com zoom, arraste a imagem para navegar.</span> : null}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: wide ? 'minmax(0,1fr) 300px' : '1fr', gap: 14, alignItems: 'start' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: wide ? (cheia ? 'min(100%, calc((100vh - 176px) * 0.8333))' : 'min(100%, calc((100vh - 290px) * 0.8333))') : '100%', margin: '0 auto' }}>
            <svg ref={svgRef} viewBox={`${view.x} ${view.y} ${vw} ${vh}`} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onPointerLeave={() => setCursor(null)}
              style={{ width: '100%', aspectRatio: BW + ' / ' + BH, display: 'block', borderRadius: 18, border: '1.5px solid rgba(255,255,255,.95)', boxShadow: '0 14px 30px -20px rgba(23,73,170,.5)', touchAction: 'none', cursor: tool === 'borracha' ? 'none' : tool === 'mover' ? 'grab' : 'crosshair', userSelect: 'none', background: '#F4F7FC' }}>
              <BoardLayers bg={bg} points={points} strokes={strokes} sel={sel} hover={hover} k={1 / view.z} />
              {draft ? <path d={strokeD(draft)} fill="none" stroke={draft.color} strokeWidth={draft.w} strokeOpacity={draft.op} strokeLinecap="round" strokeLinejoin="round" /> : null}
              {tool === 'borracha' && cursor ? <circle cx={cursor[0]} cy={cursor[1]} r={eraser / view.z} fill="rgba(229,72,77,.08)" stroke="#E5484D" strokeWidth={1.5 / view.z} strokeDasharray={`${4 / view.z} ${3 / view.z}`} style={{ pointerEvents: 'none' }} /> : null}
              {points.map((q) => <circle key={'h' + q.id} cx={q.x} cy={q.y} r={16 / view.z} fill="transparent" data-pid={q.id} onMouseEnter={() => setHover(q.id)} onMouseLeave={() => setHover(null)} />)}
            </svg>
            <svg ref={expRef} viewBox={`0 0 ${BW} ${BH}`} style={{ display: 'none' }} aria-hidden="true"><BoardLayers bg={bg} points={points} strokes={strokes} semImagem /></svg>
            <div onPointerDown={(e) => e.stopPropagation()} style={{ position: 'absolute', top: 10, right: 10, zIndex: 2, display: 'flex', alignItems: 'center', gap: 2, padding: 3, borderRadius: 999, background: 'rgba(255,255,255,.88)', boxShadow: '0 6px 16px -10px rgba(23,73,170,.6)' }}>
              <button type="button" aria-label="Diminuir zoom" title="Diminuir zoom" onClick={() => zoomBtn(1 / 1.4)} disabled={view.z <= 1} style={{ ...mini, opacity: view.z <= 1 ? 0.35 : 1 }}><OIcon name="zoom-out" size={15} /></button>
              <button type="button" title={cheia ? 'Ver a imagem inteira. Use a rolagem do mouse, ou dois dedos, para dar zoom até 1000%.' : 'Ver a imagem inteira. Use Ctrl e a rolagem do mouse, ou dois dedos, para dar zoom até 1000%.'} onClick={() => setView({ z: 1, x: 0, y: 0 })} style={{ border: 0, background: 'transparent', cursor: 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, color: 'var(--text-strong)', minWidth: 40, fontVariantNumeric: 'tabular-nums' }}>{Math.round(view.z * 100)}%</button>
              <button type="button" aria-label="Aumentar zoom" title="Aumentar zoom" onClick={() => zoomBtn(1.4)} disabled={view.z >= ZMAX} style={{ ...mini, opacity: view.z >= ZMAX ? 0.35 : 1 }}><OIcon name="zoom-in" size={15} /></button>
              <span style={{ width: 1, height: 18, background: 'rgba(150,175,210,.5)', margin: '0 2px' }} />
              <button type="button" aria-label={cheia ? 'Sair da tela cheia' : 'Tela cheia'} title={cheia ? 'Sair da tela cheia (Esc)' : 'Tela cheia: imagem maior e zoom com a rolagem do mouse'} onClick={() => setCheia(!cheia)} style={mini}><OIcon name={cheia ? 'minimize-2' : 'maximize-2'} size={15} /></button>
            </div>
            {hover && !selP ? (() => { const q = points.find((x) => x.id === hover); if (!q) return null; const dl = doseLbl(q.prod, q.dose, q.un); return (
              <div style={{ position: 'absolute', left: `${pctX(q.x)}%`, top: `${pctY(q.y)}%`, transform: 'translate(-50%, calc(-100% - 22px))', padding: '8px 12px', borderRadius: 12, background: 'var(--surface-inverse, #0E2350)', color: '#fff', fontSize: 12, lineHeight: 1.5, pointerEvents: 'none', maxWidth: 220, whiteSpace: 'normal', boxShadow: '0 10px 20px -10px rgba(0,0,0,.5)', zIndex: 2 }}>
                <b>{q.prod === COMENTARIO ? 'Comentário' : q.prod}{dl ? ' · ' + dl : ''}</b>{q.com ? <><br />{q.com}</> : <><br /><span style={{ opacity: 0.7 }}>Toque no ponto para ver os detalhes</span></>}
              </div>); })() : null}
            {selP ? (() => { const n = points.indexOf(selP) + 1, inf = prodInfo(selP.prod), un = unPonto(selP), st = inf.step || (un === 'ml' ? 0.1 : 1), ly = pctY(selP.y), lx = pctX(selP.x);
              const ops = Array.from(new Set(chips.concat([selP.prod])));
              return (
              <div onPointerDown={(e) => e.stopPropagation()} style={{ position: 'absolute', left: `clamp(8px, calc(${lx}% - 150px), calc(100% - 308px))`, ...(ly > 55 ? { bottom: `calc(${100 - ly}% + 22px)` } : { top: `calc(${ly}% + 22px)` }), width: 'min(300px, calc(100% - 16px))', boxSizing: 'border-box', padding: 14, borderRadius: 18, background: '#fff', boxShadow: '0 20px 40px -18px rgba(23,73,170,.55)', display: 'flex', flexDirection: 'column', gap: 10, zIndex: 3 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}><span style={{ width: 22, height: 22, borderRadius: '50%', background: corPonto(selP), color: '#fff', fontSize: 11, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{n}</span>Detalhes do ponto</span><button type="button" aria-label="Fechar" onClick={() => setSel(null)} style={{ ...ic, width: 28, height: 28 }}><OIcon name="x" size={15} /></button></div>
                {outroPt ? <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <input autoFocus value={outroPt.nome} onChange={(e) => setOutroPt({ ...outroPt, nome: e.target.value })} onKeyDown={(e) => { if (e.key === 'Enter') aplicarOutroPt(); if (e.key === 'Escape') { e.stopPropagation(); setOutroPt(null); } }} placeholder="O que é este ponto? Ex.: cicatriz" aria-label="O que é este ponto" style={{ ...inl, flex: 'none', width: '100%', height: 36 }} />
                  <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}><select value={outroPt.u} onChange={(e) => setOutroPt({ ...outroPt, u: e.target.value })} aria-label="Unidade" style={{ ...inl, height: 34, cursor: 'pointer' }}><option value="">sem quantidade</option>{UNIDADES_MAPA.map((u) => <option key={u} value={u}>{u}</option>)}</select><OBtn size="sm" onClick={aplicarOutroPt} disabled={!String(outroPt.nome).trim()}>Usar</OBtn><button type="button" aria-label="Cancelar" onClick={() => setOutroPt(null)} style={mini}><OIcon name="x" size={14} /></button></div>
                </div> : <select value={selP.prod} onChange={(e) => { if (e.target.value === '__outro') setOutroPt({ nome: '', u: unPonto(selP) }); else trocarProd(selP, e.target.value); }} aria-label="O que é este ponto" style={{ height: 36, borderRadius: 999, border: '1.5px solid rgba(214,226,242,.95)', padding: '0 12px', fontFamily: 'inherit', fontSize: 13, background: '#fff' }}>{ops.map((k) => <option key={k} value={k}>{k}</option>)}<option value="__outro">Outro (escrever)...</option></select>}
                {selP.prod !== COMENTARIO ? <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <button type="button" aria-label="Diminuir quantidade" onClick={() => updP(selP.id, { dose: Math.max(0, r2((+selP.dose || 0) - st)) })} style={{ ...fCircle, width: 32, height: 32 }}><OIcon name="minus" size={14} /></button>
                    <input type="number" inputMode="decimal" min="0" step={st} value={selP.dose} onChange={(e) => updP(selP.id, { dose: e.target.value === '' ? '' : +e.target.value })} aria-label="Quantidade" style={{ width: 84, height: 34, borderRadius: 999, border: '1.5px solid rgba(214,226,242,.95)', textAlign: 'center', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: 'var(--text-strong)', outline: 'none' }} />
                    <button type="button" aria-label="Aumentar quantidade" onClick={() => updP(selP.id, { dose: r2((+selP.dose || 0) + st) })} style={{ ...fCircle, width: 32, height: 32 }}><OIcon name="plus" size={14} /></button>
                    <b style={{ fontSize: 14, color: corPonto(selP), marginLeft: 4 }}>{doseLbl(selP.prod, selP.dose, selP.un)}</b>
                  </div>
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }} aria-label="Unidade">{Array.from(new Set(UNIDADES_MAPA.concat(un ? [un] : []))).map((u) => <button key={u} type="button" aria-pressed={un === u} onClick={() => updP(selP.id, { un: u })} style={chipUn(un === u)}>{u}</button>)}</div>
                </> : null}
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}><span style={{ fontSize: 12, color: 'var(--text-muted)', marginRight: 2 }}>Cor</span>{[null].concat(PEN_COLORS).map((c) => <button key={c || 'p'} type="button" aria-label={c ? 'Cor ' + c : 'Cor do produto'} title={c ? undefined : 'Cor do produto'} onClick={() => updP(selP.id, { cor: c })} style={{ width: 20, height: 20, borderRadius: '50%', border: c ? 0 : '2px solid #fff', cursor: 'pointer', background: c || inf.c, boxShadow: (selP.cor || null) === c ? `0 0 0 2px #fff, 0 0 0 4px ${c || inf.c}` : c ? 'none' : `0 0 0 1px ${inf.c}` }} />)}</div>
                <textarea value={selP.com} onChange={(e) => updP(selP.id, { com: e.target.value })} placeholder="Comentário sobre este ponto" rows={2} style={{ borderRadius: 12, border: '1.5px solid rgba(214,226,242,.95)', padding: 10, fontFamily: 'inherit', fontSize: 13, resize: 'vertical', outline: 'none' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6 }}>
                  <span style={{ display: 'inline-flex', gap: 10 }}><button type="button" onClick={() => excluir(selP.id)} style={{ ...linkBtn, color: '#E5484D' }}><OIcon name="trash-2" size={14} />Excluir</button><button type="button" onClick={() => duplicar(selP)} style={linkBtn}><OIcon name="copy" size={14} />Duplicar</button></span>
                  <OBtn size="sm" onClick={() => setSel(null)}>Pronto</OBtn>
                </div>
              </div>); })() : null}
            {selS ? (
              <div onPointerDown={(e) => e.stopPropagation()} style={{ position: 'absolute', left: '50%', bottom: 12, transform: 'translateX(-50%)', width: 'min(300px, calc(100% - 16px))', boxSizing: 'border-box', padding: 14, borderRadius: 18, background: '#fff', boxShadow: '0 20px 40px -18px rgba(23,73,170,.55)', display: 'flex', flexDirection: 'column', gap: 10, zIndex: 3 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}><span style={{ width: 22, height: 4, borderRadius: 2, background: selS.color }} />{selS.type === 'pen' ? 'Traço de pincel' : 'Linha'}</span>
                <textarea value={selS.com} onChange={(e) => updS(selS.id, { com: e.target.value })} placeholder="Comentário sobre este traço" rows={2} style={{ borderRadius: 12, border: '1.5px solid rgba(214,226,242,.95)', padding: 10, fontFamily: 'inherit', fontSize: 13, resize: 'vertical', outline: 'none' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><button type="button" onClick={() => { commit(points, strokes.filter((s) => s.id !== selS.id)); setSel(null); }} style={{ ...linkBtn, color: '#E5484D' }}><OIcon name="trash-2" size={14} />Excluir</button><OBtn size="sm" onClick={() => setSel(null)}>Pronto</OBtn></div>
              </div>) : null}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {sideCard('Totalizador', undefined, totals.length ? <>
              {totals.map((t) => (
                <div key={t.prod + t.un} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}><span style={{ width: 9, height: 9, borderRadius: '50%', background: t.c, flexShrink: 0 }} /><span style={{ flex: 1, minWidth: 0, color: 'var(--text-body)' }}>{t.prod === COMENTARIO ? 'Comentários' : t.prod}</span><span style={{ color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{t.n} {t.n === 1 ? 'ponto' : 'pontos'}</span>{t.un ? <B>{doseLbl(t.prod, t.total, t.un)}</B> : null}</div>
              ))}
              {onProc && totals.some((t) => t.un) ? <OBtn size="sm" variant="secondary" iconLeft="syringe" onClick={gerarProc}>Gerar procedimento</OBtn> : null}
            </> : empty('Nenhum produto marcado ainda.'))}
            {sideCard('Pontos e comentários', points.length, points.length ? points.map((q, i) => { const dl = doseLbl(q.prod, q.dose, q.un); return (
              <div key={q.id} style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingTop: i ? 8 : 0, borderTop: i ? '1px solid rgba(214,226,242,.7)' : 0 }} onMouseEnter={() => setHover(q.id)} onMouseLeave={() => setHover(null)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <button type="button" aria-label={'Abrir ponto ' + (i + 1)} onClick={() => abrirPonto(q.id)} style={{ width: 24, height: 24, borderRadius: '50%', border: 0, cursor: 'pointer', background: corPonto(q), color: '#fff', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{i + 1}</button>
                  <span style={{ flex: 1, minWidth: 0, fontSize: 13, color: 'var(--text-strong)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{q.prod === COMENTARIO ? 'Comentário' : q.prod}{dl ? <b> · {dl}</b> : null}</span>
                  <button type="button" aria-label={'Editar ponto ' + (i + 1)} title="Editar" onClick={() => abrirPonto(q.id)} style={mini}><OIcon name="pencil" size={13} /></button>
                  <button type="button" aria-label={'Duplicar ponto ' + (i + 1)} title="Duplicar" onClick={() => duplicar(q)} style={mini}><OIcon name="copy" size={13} /></button>
                  <button type="button" aria-label={'Excluir ponto ' + (i + 1)} title="Excluir" onClick={() => excluir(q.id)} style={{ ...mini, color: '#E5484D' }}><OIcon name="trash-2" size={13} /></button>
                </div>
                <input value={q.com} onChange={(e) => updP(q.id, { com: e.target.value })} placeholder="Comentário" style={{ ...inl, flex: 'none', width: '100%' }} />
              </div>); }) : empty('Use "Pontos" e toque na imagem. Toque em um ponto para mudar produto, quantidade, unidade e cor.'))}
            {sideCard('Traços e comentários', strokes.length, strokes.length ? strokes.map((s) => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button type="button" aria-label="Selecionar traço" onClick={() => { setTool('pontos'); setSel({ t: 's', id: s.id }); }} style={{ width: 24, height: 24, borderRadius: 8, border: '1.5px solid rgba(214,226,242,.95)', background: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><span style={{ width: 14, height: 3, borderRadius: 2, background: s.color }} /></button>
                <span style={{ fontSize: 12, color: 'var(--text-muted)', width: 50, flexShrink: 0 }}>{s.type === 'pen' ? 'Pincel' : 'Linha'}</span>
                <input value={s.com} onChange={(e) => updS(s.id, { com: e.target.value })} placeholder="Comentário" style={inl} />
                <button type="button" aria-label="Excluir traço" title="Excluir" onClick={() => { commit(points, strokes.filter((x) => x.id !== s.id)); if (sel && sel.id === s.id) setSel(null); }} style={{ ...mini, color: '#E5484D' }}><OIcon name="trash-2" size={13} /></button>
              </div>
            )) : empty('Use o pincel ou a linha sobre a imagem. Depois escreva o comentário aqui.'))}
            {sideCard('Observações', undefined, <textarea value={obsMapa} onChange={(e) => { setObsMapa(e.target.value); mudou(); }} placeholder="Avaliação, orientações, o que combinar no retorno..." rows={3} style={{ borderRadius: 12, border: '1.5px solid rgba(214,226,242,.95)', padding: 10, fontFamily: 'inherit', fontSize: 13, resize: 'vertical', outline: 'none', background: '#fff' }} />)}
          </div>
        </div>
      </div>}
      {prodsJan ? <ProdutosMapaJanela onFechar={() => setProdsJan(false)} /> : null}
    </div>
  );
}
