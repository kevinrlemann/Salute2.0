function ProcWorkspace({ onSave, onBack, wide, inicial }) {
  const ini = inicial || {};
  const [proc, setProc] = React.useState(null);
  const [livre, setLivre] = React.useState(() => !FIN_PROCS.length);
  const [nomeLivre, setNomeLivre] = React.useState('');
  const [pro, setPro] = React.useState((PROF0[0] || {}).nome || '');
  const [dt, setDt] = React.useState(TODAY_ISO + 'T' + nowHM());
  const [dur, setDur] = React.useState(30);
  const [status, setStatus] = React.useState('Realizado');
  const [regiao, setRegiao] = React.useState(ini.regiao || '');
  const [valor, setValor] = React.useState('');
  const [mats, setMats] = React.useState(() => (ini.mats || []).map((m) => ({ ...m })));
  const [obs, setObs] = React.useState(ini.obs || '');
  const [anexos, setAnexos] = React.useState([]);
  const [arrastando, setArrastando] = React.useState(false);
  const [salvando, setSalvando] = React.useState(false);
  const arqRef = React.useRef(null);
  const valorTela = (v) => (v ? Number(v).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '');
  const choose = (n) => {
    setLivre(false); setProc(n); setDur(PROC_DUR[n] || 30);
    const fp = FIN_PROCS.find((x) => x.n === n); setValor(fp && fp.v ? valorTela(fp.v) : '');
    const pr = PROF0.find((x) => x.procs.includes(n)); if (pr) setPro(pr.nome);
    const sug = (MAT_SUG[n] || []).map(([nome, q]) => ({ nome, q }));
    setMats((cur) => (ini.mats && ini.mats.length ? [...cur, ...sug.filter((x) => !cur.some((c) => c.nome === x.nome))] : sug));
  };
  React.useEffect(() => { if (ini.titulo && FIN_PROCS.some((x) => x.n === ini.titulo)) choose(ini.titulo); }, []);
  React.useEffect(() => () => anexos.forEach((a) => a.url && URL.revokeObjectURL(a.url)), []);
  const nome = livre ? nomeLivre.trim() : proc;
  const sec = (t, children, extra) => <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}><span style={{ ...lbl, display: 'flex', alignItems: 'center', gap: 8 }}>{t}{extra}</span>{children}</div>;
  const others = PRODUTOS0.filter((p) => !mats.some((m) => m.nome === p.nome));
  const LIMITE = 50 * 1024 * 1024;
  const addArquivos = (lista) => {
    const fs = Array.from(lista || []); if (!fs.length) return;
    const grandes = fs.filter((f) => f.size > LIMITE);
    if (grandes.length) avisoErro('Arquivo grande demais', grandes.map((f) => f.name).join(', ') + ' passa de 50 MB.');
    const ok = fs.filter((f) => f.size <= LIMITE).map((f) => ({ id: 'a' + Date.now() + Math.random().toString(36).slice(2, 6), file: f, name: f.name, size: f.size, type: /pdf$/i.test(f.type) || /\.pdf$/i.test(f.name) ? 'pdf' : (f.type || '').startsWith('image/') ? 'img' : 'outro', url: (f.type || '').startsWith('image/') ? URL.createObjectURL(f) : null }));
    setAnexos((a) => [...a, ...ok]);
  };
  const tamanho = (n) => (n >= 1048576 ? (n / 1048576).toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + ' MB' : Math.max(1, Math.round(n / 1024)) + ' KB');
  const salvar = async () => {
    if (!nome || salvando) return;
    setSalvando(true);
    try {
      await onSave({ kind: 'proc', title: nome, items: [nome], pro, dt, dur, status, mats, obs, regiao: regiao.trim(), valor: BR.num(valor), mapaId: ini.mapaId || null,
        anexos: anexos.map((a) => ({ id: a.id, name: a.name, type: a.type, url: a.url, size: a.size })), arquivos: anexos.map((a) => a.file) });
    } finally { setSalvando(false); }
  };
  const chipProc = (on) => ({ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2, padding: '10px 12px', borderRadius: 14, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', border: on ? '1.5px solid #1F5EFF' : '1.5px solid rgba(255,255,255,.95)', background: on ? 'rgba(31,94,255,.07)' : 'rgba(255,255,255,.6)' });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <BackLink onClick={onBack} />
      {sec('Procedimento', <>
        {FIN_PROCS.length ? <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fill, minmax(${wide ? 170 : 150}px, 1fr))`, gap: 8 }}>
          {FIN_PROCS.map((x) => { const on = !livre && proc === x.n; return (
            <button key={x.n} type="button" onClick={() => choose(x.n)} aria-pressed={on} style={chipProc(on)}>
              <span style={{ fontSize: 14, fontWeight: 600, color: on ? '#1F5EFF' : 'var(--text-strong)' }}>{x.n}</span><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{PROC_DUR[x.n]} min · {brl0(x.v)}</span>
            </button>); })}
          <button type="button" onClick={() => { setLivre(true); setProc(null); setValor(''); }} aria-pressed={livre} style={{ ...chipProc(livre), justifyContent: 'center', border: livre ? '1.5px solid #1F5EFF' : '1.5px dashed rgba(31,94,255,.4)', background: livre ? 'rgba(31,94,255,.07)' : 'rgba(31,94,255,.03)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: '#1F5EFF' }}><OIcon name="pencil-line" size={15} />Outro procedimento</span><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Escreva o nome</span>
          </button>
        </div> : null}
        {livre ? <OInput label={FIN_PROCS.length ? 'Nome do procedimento' : undefined} iconLeft="pencil-line" value={nomeLivre} onChange={(e) => setNomeLivre(e.target.value)} placeholder="Ex.: Laser de CO2, Drenagem linfática, Extração de siso..." autoFocus={FIN_PROCS.length > 0} aria-label="Nome do procedimento" /> : null}
      </>)}
      {ini.mapaId && !nome ? <div style={{ display: 'flex', gap: 10, padding: '12px 14px', borderRadius: 16, background: 'rgba(31,94,255,.07)', fontSize: 14, color: 'var(--text-body)' }}><span style={{ color: '#1F5EFF', display: 'flex' }}><OIcon name="scan-face" size={18} /></span>Os materiais e as observações já vieram do mapeamento. Escolha ou escreva o procedimento para continuar.</div> : null}
      {nome ? <>
        {PROF0.length ? sec('Profissional', <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{PROF0.map((x) => { const on = pro === x.nome; return (
          <button key={x.id} type="button" onClick={() => setPro(x.nome)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 44, padding: '0 14px 0 6px', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, border: on ? '1.5px solid #1F5EFF' : '1.5px solid rgba(214,226,242,.9)', background: on ? 'rgba(31,94,255,.08)' : 'rgba(255,255,255,.7)', color: on ? '#1F5EFF' : 'var(--text-strong)' }}><OAv name={x.nome} size={32} />{x.nome}{livre || x.procs.includes(proc) ? null : <span style={{ fontSize: 11, color: 'var(--text-subtle)' }}>não costuma fazer</span>}</button>); })}</div>) : null}
        <div style={{ display: 'grid', gridTemplateColumns: wide ? '1fr auto auto' : '1fr', gap: 14, alignItems: 'end' }}>
          <OInput label="Data e hora" type="datetime-local" value={dt} onChange={(e) => setDt(e.target.value)} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-start' }}><span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-strong)' }}>Duração</span><Stepper label={dur + ' min'} onDec={() => setDur((d) => Math.max(5, d - 5))} onInc={() => setDur((d) => d + 5)} /></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-strong)' }}>Status</span>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>{Object.entries(STATUS_PROC).map(([k, c]) => <button key={k} type="button" onClick={() => setStatus(k)} style={{ height: 40, padding: '0 14px', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, border: status === k ? `1.5px solid ${c}` : '1.5px solid rgba(214,226,242,.9)', background: status === k ? `color-mix(in srgb, ${c} 10%, white)` : 'rgba(255,255,255,.7)', color: status === k ? c : 'var(--text-strong)' }}>{k}</button>)}</div></div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: wide ? 'minmax(0,1fr) 220px' : '1fr', gap: 14 }}>
          <OInput label="Região tratada" iconLeft="map-pin" value={regiao} onChange={(e) => setRegiao(e.target.value)} placeholder="Ex.: testa, glabela e pés de galinha" />
          <OInput label="Valor (R$)" iconLeft="banknote" inputMode="decimal" value={valor} onChange={(e) => setValor(e.target.value.replace(/[^\d.,]/g, ''))} onBlur={() => { const n = BR.num(valor); if (n != null) setValor(valorTela(n)); }} placeholder="0,00" />
        </div>
        {sec('Materiais utilizados', <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {mats.map((m, i) => (
            <div key={m.nome} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 8px 8px 14px', borderRadius: 16, background: 'rgba(255,255,255,.7)', border: '1.5px solid rgba(255,255,255,.95)', flexWrap: 'wrap' }}>
              <span style={{ flex: 1, minWidth: 140, fontSize: 14, fontWeight: 500, color: 'var(--text-strong)' }}>{m.nome}</span>
              <Stepper label={`${qFmt(m.q)} ${unPl(unOf(m.nome), m.q < 2 ? 1 : m.q)}`} onDec={() => setMats(mats.map((x, j) => { if (j !== i) return x; const st = Number.isInteger(x.q) ? 1 : 0.1; return { ...x, q: Math.max(Number.isInteger(x.q) ? 1 : 0.01, Math.round((x.q - st) * 100) / 100) }; }))} onInc={() => setMats(mats.map((x, j) => { if (j !== i) return x; const st = Number.isInteger(x.q) ? 1 : 0.1; return { ...x, q: Math.round((x.q + st) * 100) / 100 }; }))} />
              <button type="button" aria-label={'Remover ' + m.nome} onClick={() => setMats(mats.filter((_, j) => j !== i))} style={{ ...fCircle, width: 34, height: 34 }}><OIcon name="x" size={14} /></button>
            </div>
          ))}
          {others.length ? <PillSelect label="Adicionar material" icon="plus" value="" onChange={(v) => v && setMats([...mats, { nome: v, q: 1 }])} options={[['', mats.length ? 'Adicionar outro material' : 'Adicionar material'], ...others.map((p) => [p.nome, p.nome])]} /> : null}
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{ini.mapaId ? 'Quantidades calculadas pelo mapeamento, na unidade do estoque. Ao salvar como realizado, a baixa no estoque é automática.' : mats.length ? 'Ao salvar como realizado, a baixa no estoque é automática. Ajuste se precisar.' : 'Adicione os materiais usados para dar baixa no estoque automaticamente.'}</span>
        </div>)}
        {sec('Observações', <textarea value={obs} onChange={(e) => setObs(e.target.value)} rows={3} placeholder="Como foi o procedimento, reação do paciente, orientações passadas..." style={{ borderRadius: 16, border: '1.5px solid rgba(214,226,242,.95)', background: '#fff', padding: 12, fontFamily: 'inherit', fontSize: 14, outline: 'none', resize: 'vertical' }} />)}
        {sec('Anexos', <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div onDragOver={(e) => { e.preventDefault(); setArrastando(true); }} onDragLeave={() => setArrastando(false)} onDrop={(e) => { e.preventDefault(); setArrastando(false); addArquivos(e.dataTransfer.files); }}
            style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', padding: '14px 16px', borderRadius: 18, border: arrastando ? '2px dashed #1F5EFF' : '2px dashed rgba(31,94,255,.3)', background: arrastando ? 'rgba(31,94,255,.07)' : 'rgba(255,255,255,.5)' }}>
            <span style={{ width: 40, height: 40, borderRadius: 13, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(31,94,255,.08)', color: '#1F5EFF' }}><OIcon name="paperclip" size={18} /></span>
            <span style={{ flex: 1, minWidth: 180, fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.45 }}><b style={{ display: 'block', fontSize: 14, color: 'var(--text-strong)', fontWeight: 600 }}>Fotos, termos, receitas e exames</b>Arraste os arquivos aqui ou escolha no aparelho. Ficam no prontuário, na pasta Procedimentos.</span>
            <OBtn size="sm" variant="secondary" iconLeft="upload" onClick={() => arqRef.current && arqRef.current.click()}>Escolher arquivos</OBtn>
            <input ref={arqRef} type="file" multiple accept="image/*,application/pdf,.pdf,.doc,.docx,.xls,.xlsx,.txt" style={{ display: 'none' }} onChange={(e) => { addArquivos(e.target.files); e.target.value = ''; }} />
          </div>
          {anexos.map((a) => (
            <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 8px 6px 6px', borderRadius: 14, background: 'rgba(255,255,255,.75)', border: '1.5px solid rgba(255,255,255,.95)' }}>
              <span style={{ width: 40, height: 40, borderRadius: 10, overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: a.type === 'pdf' ? 'rgba(229,72,77,.08)' : 'rgba(31,94,255,.08)', color: a.type === 'pdf' ? '#E5484D' : '#1F5EFF' }}>{a.url ? <img src={a.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <OIcon name={a.type === 'pdf' ? 'file-text' : 'file'} size={18} />}</span>
              <span style={{ flex: 1, minWidth: 0 }}><span style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--text-strong)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.name}</span><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{tamanho(a.size)}</span></span>
              <button type="button" aria-label={'Remover ' + a.name} onClick={() => { if (a.url) URL.revokeObjectURL(a.url); setAnexos((l) => l.filter((x) => x.id !== a.id)); }} style={{ ...fCircle, width: 32, height: 32 }}><OIcon name="x" size={14} /></button>
            </div>
          ))}
        </div>, anexos.length ? <span style={{ textTransform: 'none', letterSpacing: 0, fontWeight: 500 }}>({anexos.length})</span> : null)}
      </> : <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{FIN_PROCS.length ? 'Escolha o procedimento e o restante já vem preenchido. Se não estiver na lista, use Outro procedimento.' : 'Escreva o nome do procedimento para continuar.'}</span>}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}><OBtn variant="secondary" onClick={onBack}>Cancelar</OBtn><OBtn iconLeft="check" disabled={!nome} loading={salvando} onClick={salvar}>Salvar procedimento</OBtn></div>
    </div>
  );
}
