//@@R
function RecordCard({ r, onOpen, p, onAcao }) {
  useStore(MAPA_VER);
  const k = KINDS[r.kind];
  return (
    <div style={{ ...soft, padding: 14, display: 'flex', gap: 12 }}>
      <span style={{ width: 36, height: 36, borderRadius: 12, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `color-mix(in srgb, ${k.c} 12%, white)`, color: k.c }}><OIcon name={k.icon} size={17} /></span>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'baseline' }}><span style={{ fontSize: 12, fontWeight: 600, color: k.c }}>{k.label}</span><span style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{r.date}</span></div>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}>{r.title}</p>
        {r.kind === 'anamnese' ? <CartaoAnamnese r={r} paciente={p ? p.nome : ''} onAcao={onAcao || (() => {})} /> : null}
        {r.kind === 'mapa' ? <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button type="button" onClick={() => onOpen(r)} style={{ padding: 0, border: 0, background: 'none', cursor: 'pointer' }} aria-label="Abrir mapeamento"><MapThumb r={r} h={104} /></button>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, color: 'var(--text-muted)', minWidth: 0 }}>
            <span>{areaMapaTxt(r.cat, r.catDesc) ? areaMapaTxt(r.cat, r.catDesc) + ' · ' : ''}{modelLabel(r.bg)} · {r.points.length} pontos{r.strokes.length ? ` · ${r.strokes.length} traços` : ''}</span>
            {r.obs ? <span style={{ color: 'var(--text-body)', lineHeight: 1.45 }}>{r.obs}</span> : null}
            {mapTotals(r.points).filter((t) => t.un).map((t) => <span key={t.prod + t.un}>{t.prod}: <B>{doseLbl(t.prod, t.total, t.un)}</B></span>)}
            <button type="button" style={linkBtn} onClick={() => onOpen(r)}><OIcon name="pencil" size={13} />Abrir e editar</button>
          </div>
        </div> : null}
        {r.kind === 'proc' ? <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', fontSize: 13, color: 'var(--text-muted)' }}><Badge2 c={STATUS_PROC[r.status] || '#2DBF6A'}>{r.status || 'Realizado'}</Badge2><span>{r.pro || (SB_ON ? 'Profissional não informado' : 'Dra. Camila Rocha')}</span>{r.dt ? <span>· {dBR(r.dt.slice(0, 10)).slice(0, 5)} às {r.dt.slice(11, 16)}</span> : null}{r.dur ? <span>· {r.dur} min</span> : null}{r.valor ? <span>· {brl(r.valor)}</span> : null}</div>
          {r.regiao ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--text-body)' }}><span style={{ color: k.c, display: 'flex' }}><OIcon name="map-pin" size={13} /></span>{r.regiao}</span> : null}
          {r.mats && r.mats.length ? <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{r.mats.map((m) => <span key={m.nome} style={{ fontSize: 12, padding: '3px 10px', borderRadius: 999, background: 'rgba(34,195,242,.1)', color: '#0B7FB3' }}>{qFmt(m.q)} {unPl(unOf(m.nome), m.q < 2 ? 1 : m.q)} · {m.nome}</span>)}</div> : null}
          {r.obs ? <p style={{ margin: 0, fontSize: 13, color: 'var(--text-body)', lineHeight: 1.5 }}>{r.obs}</p> : null}
          {r.anexos && r.anexos.length ? <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            {r.anexos.slice(0, 5).map((f, i) => { const box = { width: 56, height: 56, borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(214,226,242,.9)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: f.type === 'pdf' ? 'rgba(229,72,77,.06)' : 'rgba(31,94,255,.06)', color: f.type === 'pdf' ? '#E5484D' : '#1F5EFF' };
              const conteudo = f.type === 'img' && f.url ? <img src={f.url} alt={f.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <OIcon name={f.type === 'pdf' ? 'file-text' : 'file'} size={20} />;
              return f.url ? <a key={f.id || i} href={f.url} target="_blank" rel="noopener noreferrer" title={f.name} style={box}>{conteudo}</a> : <span key={f.id || i} title={f.name} style={box}>{conteudo}</span>; })}
            {r.anexos.length > 5 ? <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>+{r.anexos.length - 5}</span> : null}
            <button type="button" style={linkBtn} onClick={() => onOpen(r)}><OIcon name="paperclip" size={13} />{r.anexos.length === 1 ? '1 anexo' : r.anexos.length + ' anexos'}</button>
          </div> : null}
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

//@@P
const PASTA_PROC = 'Procedimentos';
function ProntuarioTab({ p, recs, setRecs, docs, setDocs, folders, setFolders, onEvent, mobile, wide, setWork, pastas }) {
  const filaMapa = React.useRef({});
  const [view, setView] = React.useState({ v: 'list' });
  const [fk, setFk] = SB_ON ? usePrefFiltro('prontuario.filtro', 'all') : React.useState('all');
  const [preencher, setPreencher] = React.useState(null);
  const go = (v) => { setView(v); setWork(v.v); };
  const back = () => go({ v: 'list' });
  const addRec = (r) => { const id = Date.now() + Math.floor(Math.random() * 1000); setRecs((a) => [{ ...r, id, date: HOJE }, ...a]); return id; };
  const pend = recs.filter((r) => r.kind === 'anamnese' && r.status === 'pendente').length;
  const list = recs.filter((r) => fk === 'all' || r.kind === fk);
  const cnt = (k) => recs.filter((r) => r.kind === k).length;
  const first = p.nome.split(' ')[0];
  /* ---- anamnese ---- */
  const msgLink = (nome, link, assinar) => (assinar
    ? `Olá, ${first}! Preenchemos juntos a sua ${nome.toLowerCase()}. Confira as respostas e assine neste link: https://${link}`
    : `Olá, ${first}! Para deixarmos tudo pronto para o seu atendimento, responda a ${nome.toLowerCase()} neste link: https://${link}`);
  const atualizarEnvio = (rid, dbId) => { if (SB_ON && dbId) AnamSvc.envio(dbId).then((e) => { if (e) setRecs((a) => a.map((x) => (x.id === rid ? { ...x, ...e, id: x.id, date: x.date } : x))); }).catch(() => {}); };
  const respostaLocal = (res) => ({ status: 'respondida', answers: res.answers, respondidoEm: agoraIso(), assinatura: res.assinatura ? { w: res.assinatura.w, h: res.assinatura.h, tracos: res.assinatura.tracos } : null, assinante: res.assinatura ? res.assinatura.nome : null, cpfAss: res.assinatura ? res.assinatura.cpf : null, assinadoEm: res.assinatura ? agoraIso() : null });
  const anamFeita = ({ m, modo, link, id, token, expira, res }) => {
    ANAM_STORE.v = (ANAM_STORE.v || []).map((x) => (x.id === m.id ? { ...x, usos: (x.usos || 0) + 1 } : x));
    const base = { kind: 'anamnese', title: m.nome, modo, link, token, expira, dbId: id, modeloId: m.dbId || m.id };
    if (modo === 'presencial') {
      const rid = addRec({ ...base, ...respostaLocal(res) });
      onEvent({ hist: SB_ON ? null : { t: 'Anamnese respondida e assinada na clínica: ' + m.nome, c: KINDS.anamnese.c }, toast: 'Anamnese respondida e assinada' });
      atualizarEnvio(rid, id);
    } else {
      addRec({ ...base, status: 'pendente' });
      onEvent({ hist: { t: (modo === 'assinar' ? 'Anamnese enviada para assinar: ' : 'Anamnese enviada: ') + m.nome, c: KINDS.anamnese.c }, msg: msgLink(m.nome, link, modo === 'assinar'), toast: (modo === 'assinar' ? 'Link para assinar enviado no WhatsApp de ' : 'Anamnese enviada no WhatsApp de ') + first });
    }
    back();
  };
  const modeloDoEnvio = (r) => (ANAM_STORE.v || []).find((x) => (r.modeloId && (x.dbId === r.modeloId || x.id === r.modeloId)) || x.nome === r.title);
  const acaoAnam = async (tipo, r) => {
    if (tipo === 'reenviar') { onEvent({ msg: msgLink(r.title, r.link, r.modo === 'assinar'), toast: 'Link reenviado no WhatsApp de ' + first, hist: { t: 'Link da anamnese reenviado: ' + r.title, c: KINDS.anamnese.c } }); return; }
    if (tipo === 'cancelar') {
      setRecs((a) => a.map((x) => (x.id === r.id ? { ...x, status: 'cancelada' } : x)));
      if (SB_ON && r.dbId) bg(AnamSvc.cancelar(r.dbId), () => setRecs((a) => a.map((x) => (x.id === r.id ? { ...x, status: r.status } : x))));
      onEvent({ toast: 'Envio cancelado. O link não abre mais.', hist: { t: 'Envio de anamnese cancelado: ' + r.title, c: '#8A97AE' } }); return;
    }
    if (tipo === 'regerar') {
      if (SB_ON) { try { await AnamSvc.regerar(r.dbId); atualizarEnvio(r.id, r.dbId); } catch (e) { return; } }
      else setRecs((a) => a.map((x) => (x.id === r.id ? { ...x, status: 'pendente', link: String(x.link || '').replace(/[a-z0-9]{4}$/, Math.random().toString(36).slice(2, 6)) } : x)));
      onEvent({ toast: 'Novo link gerado. O anterior não vale mais.' }); return;
    }
    if (tipo === 'preencher') {
      const m = modeloDoEnvio(r);
      if (!SB_ON || !r.dbId) { if (m) setPreencher({ r, dados: dadosDoModelo(m, { paciente: first }) }); return; }
      setPreencher({ r, dados: null });
      try {
        if (r.status !== 'pendente') await AnamSvc.regerar(r.dbId);
        const env = await AnamSvc.envio(r.dbId);
        const d = await AnamSvc.publica(env.token);
        if (d.status !== 'aguardando') { setPreencher(null); onEvent({ toast: 'Esta anamnese já foi respondida' }); atualizarEnvio(r.id, r.dbId); return; }
        bg(DB.upd('anamnese_envios', r.dbId, { modo: 'presencial' }));
        setRecs((a) => a.map((x) => (x.id === r.id ? { ...x, ...env, id: x.id, date: x.date } : x)));
        setPreencher({ r: { ...r, token: env.token }, dados: { ...d, paciente: first } });
      } catch (e) { setPreencher(null); }
    }
  };
  /* ---- mapeamento ---- */
  const ultimoMapa = (atual) => recs.filter((r) => r.kind === 'mapa' && r.points && (!atual || r.id !== atual.id)).sort((a, b) => String(b.ord || '').localeCompare(String(a.ord || '')))[0] || null;
  const salvarImagemMapa = (blob, nome) => {
    const pasta = 'Documentação Clínica';
    const nd = [{ id: 'u' + Date.now(), name: nome, folder: pasta, date: HOJE, type: 'img', url: URL.createObjectURL(blob) }];
    if (!folders.includes(pasta)) setFolders([...folders, pasta]);
    setDocs((d) => [...nd, ...d]);
    addRec({ kind: 'doc', title: '1 arquivo em ' + pasta, files: nd });
    onEvent({ hist: { t: 'Imagem do mapeamento salva em ' + pasta, c: KINDS.doc.c }, toast: 'Imagem salva em ' + pasta });
    if (SB_ON) ProntSvc.enviarArquivos(p, [new File([blob], nome, { type: 'image/png' })], pasta, pastas, 'mapeamento').then((rs) => setDocs((d) => d.map((x) => (x.id === nd[0].id && rs[0] ? { ...x, dbId: rs[0].id, path: rs[0].path } : x)))).catch(() => setDocs((d) => d.filter((x) => x.id !== nd[0].id)));
  };
  if (view.v === 'anamnese') return <AnamneseEnvio p={p} wide={wide} onBack={back} onFeito={anamFeita} />;
  if (view.v === 'mapa') return <MapEditor initial={view.rec} wide={wide} p={p} ultimo={view.rec ? null : ultimoMapa(null)} onBack={back} onDoc={salvarImagemMapa} onProc={(inicial) => go({ v: 'proc', inicial })} onSave={(r) => {
    if (SB_ON) {
      const existe = !!r.id, id = r.id || novoId(), rr = { ...r, id, dbId: id };
      if (existe) setRecs((a) => a.map((x) => (x.id === id ? { ...x, ...rr } : x)));
      else { setRecs((a) => [{ ...rr, date: HOJE, ord: new Date().toISOString() }, ...a]); onEvent({ hist: { t: 'Mapeamento registrado: ' + r.title, c: KINDS.mapa.c, tipo: 'mapeamento', tabela: 'mapeamentos', registro: id }, toast: 'Mapeamento salvo no prontuário' }); }
      const ant = filaMapa.current[id] || Promise.resolve(existe);
      filaMapa.current[id] = ant.then((jaExiste) => ProntSvc.salvarMapa(p, rr, jaExiste).then(() => true), () => existe).catch(() => existe);
      return id;
    }
    if (r.id) { setRecs((a) => a.map((x) => (x.id === r.id ? { ...x, ...r } : x))); return r.id; }
    const id = addRec({ ...r, ord: new Date().toISOString() }); onEvent({ hist: { t: 'Mapeamento registrado: ' + r.title, c: KINDS.mapa.c }, toast: 'Mapeamento salvo no prontuário' }); return id;
  }} />;
  if (view.v === 'proc') return <ProcWorkspace wide={wide} inicial={view.inicial} onBack={back} onSave={async (r) => {
    let novos = [];
    if (SB_ON) { try { if (r.mapaId && filaMapa.current[r.mapaId]) await filaMapa.current[r.mapaId]; const res = await ProntSvc.salvarProc(p, r, pastas); novos = res.docs || []; if (CARGA.v.estoque === 'ok') carregar('estoque', true); } catch (e) { return; } }
    else novos = (r.anexos || []).map((a) => ({ id: 'u' + a.id, name: a.name, folder: PASTA_PROC, date: HOJE, type: a.type === 'pdf' ? 'pdf' : 'img', url: a.url, procId: 'local' }));
    if (novos.length) { if (!folders.includes(PASTA_PROC)) setFolders([...folders, PASTA_PROC]); setDocs((d) => [...novos, ...d]); }
    const rr = { ...r, anexos: novos.length ? novos.map((d) => ({ id: d.id, name: d.name, type: d.type === 'pdf' ? 'pdf' : d.type === 'outro' ? 'outro' : 'img', url: d.url })) : [] }; delete rr.arquivos;
    addRec(rr); onEvent({ hist: { t: 'Procedimento: ' + r.title, s: [r.pro, r.regiao].filter(Boolean).join(' · ') || undefined, c: KINDS.proc.c, tipo: 'procedimento' }, toast: r.mapaId ? 'Procedimento registrado com os materiais do mapa' : novos.length ? 'Procedimento registrado com ' + (novos.length === 1 ? '1 anexo' : novos.length + ' anexos') : 'Procedimento registrado' }); back();
  }} />;
  if (view.v === 'docs') return <DocsWorkspace p={p} docs={docs} setDocs={setDocs} folders={folders} setFolders={setFolders} wide={wide} onBack={back} pastas={pastas}
    onUploaded={(files, folder) => { addRec({ kind: 'doc', title: files[0].type === 'compare' ? 'Antes e depois criado' : `${files.length} ${files.length === 1 ? 'arquivo' : 'arquivos'} em ${folder}`, files }); onEvent({ hist: { t: files[0].type === 'compare' ? 'Antes e depois criado' : 'Documentos recebidos', c: KINDS.doc.c }, toast: files[0].type === 'compare' ? 'Antes e depois salvo' : 'Arquivos enviados para ' + folder }); }}
    onSendLink={(link, folder) => onEvent({ msg: `Oi, ${first}! Envie suas fotos por este link, elas vão direto para o seu prontuário: https://${link}`, toast: 'Link de envio mandado no WhatsApp', hist: { t: 'Link para envio de documentos enviado (' + folder + ')', c: KINDS.doc.c } })} />;
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
        <div><span style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-strong)' }}>Registros</span>{pend ? <span style={{ fontSize: 12, color: '#B98400', marginLeft: 10 }}>{pend} {pend === 1 ? 'anamnese aguardando resposta' : 'anamneses aguardando resposta'}</span> : null}</div>
        <PillSelect label="Filtrar registros" value={fk} onChange={setFk} options={[['all', `Todos os registros (${recs.length})`], ['anamnese', `Anamneses (${cnt('anamnese')})`], ['mapa', `Mapeamentos (${cnt('mapa')})`], ['proc', `Procedimentos (${cnt('proc')})`], ['doc', `Documentos (${cnt('doc')})`]]} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {list.map((r) => <RecordCard key={r.id} r={r} p={p} onAcao={acaoAnam} onOpen={(rec) => go(rec.kind === 'mapa' ? { v: 'mapa', rec } : { v: 'docs' })} />)}
        {!list.length ? <span style={{ fontSize: 14, color: 'var(--text-muted)', padding: 20, textAlign: 'center' }}>Nenhum registro deste tipo ainda.</span> : null}
      </div>
      {preencher ? <PreenchimentoJanela titulo={preencher.r.title} subtitulo="Entregue o aparelho para o paciente responder e assinar." dados={preencher.dados} token={preencher.r.token} modo="presencial" onFechar={() => setPreencher(null)}
        onFim={(res) => { const r = preencher.r; setPreencher(null); setRecs((a) => a.map((x) => (x.id === r.id ? { ...x, modo: 'presencial', ...respostaLocal(res) } : x))); onEvent({ hist: SB_ON ? null : { t: 'Anamnese respondida e assinada na clínica: ' + r.title, c: KINDS.anamnese.c }, toast: 'Anamnese respondida e assinada' }); atualizarEnvio(r.id, r.dbId); }} /> : null}
    </div>
  );
}
