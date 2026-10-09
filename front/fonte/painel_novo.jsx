/* ---- Painel mês a mês: seletor de mês (o mesmo em todos os cartões) ---- */
const pillSel = { position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 8, height: 40, padding: '0 34px 0 16px', borderRadius: 999, border: '1.5px solid rgba(255,255,255,.95)', background: 'rgba(255,255,255,.55)', color: 'var(--text-strong)', fontFamily: 'inherit', fontSize: 15, fontWeight: 500, whiteSpace: 'nowrap', cursor: 'pointer', boxShadow: '0 4px 12px -8px rgba(23,73,170,.35)', boxSizing: 'border-box', maxWidth: '100%' };
const selInvisivel = { position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer', fontSize: 16, border: 0 };
function MesChip() {
  const [m] = useStore(PAINEL_MES);
  return (
    <label style={pillSel} title="Escolher o mês do Painel">
      <SIcon name={m.carregando ? 'loader-circle' : 'calendar'} size={17} strokeWidth={1.7} style={m.carregando ? { animation: 'sbgira 1s linear infinite' } : undefined} />
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{mesNomeIso(m.iso)}</span>
      <span style={{ position: 'absolute', right: 13, display: 'flex', pointerEvents: 'none' }}><SIcon name="chevron-down" size={15} /></span>
      <select aria-label="Mês do Painel" value={m.iso} onChange={(e) => painelMudarMes(e.target.value)} style={selInvisivel}>
        {mesesPainel().map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {m.carregando ? <style>{'@keyframes sbgira{to{transform:rotate(360deg)}}'}</style> : null}
    </label>
  );
}

/* ---- Pacientes recentes: próximos atendimentos e os já feitos, por profissional ---- */
const DIA_C = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
function quandoAg(ts) {
  const p = BR.partes(ts), hoje = BR.hoje(), dia = p.iso;
  const amanha = BR.diaDe(Date.now() + 86400000), ontem = BR.diaDe(Date.now() - 86400000);
  const nome = dia === hoje ? 'Hoje' : dia === amanha ? 'Amanhã' : dia === ontem ? 'Ontem' : DIA_C[p.dow] + ' ' + String(p.dia).padStart(2, '0') + '/' + String(p.mes).padStart(2, '0');
  return nome + ' · ' + p.hm;
}
const AGENDA_DEMO = () => {
  const h = (d, hm) => BR.instante(BR.diaDe(Date.now() + d * 86400000), hm).toISOString();
  const st = { a: ['Confirmado', '#1F5EFF', false], r: ['Realizado', '#2DBF6A', true] };
  return [[0, '15:30', 0, 'a'], [1, '09:00', 1, 'a'], [2, '14:00', 2, 'a'], [-1, '10:30', 3, 'r'], [-3, '16:00', 4, 'r'], [-6, '11:00', 5, 'r']].map(([d, hm, i, s], k) => {
    const p = PATIENTS[i % PATIENTS.length];
    return { id: 'demo' + k, inicio: h(d, hm), prof: k % 2 ? 'demo2' : 'demo1', profNome: k % 2 ? 'Dr. Michael Thompson' : 'Dra. Camila Rocha', name: p.name, pront: p.id, age: p.age, proc: p.proc, status: st[s][0], cor: st[s][1], feito: st[s][2] };
  });
};
function AgStatus({ txt, cor }) {
  return <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, height: 26, padding: '0 10px', borderRadius: 999, background: 'color-mix(in srgb, ' + cor + ' 8%, white)', border: '1px solid color-mix(in srgb, ' + cor + ' 30%, white)', color: cor, fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap' }}>
    <span style={{ width: 9, height: 9, borderRadius: '50%', border: '2px solid ' + cor, boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ width: 3, height: 3, borderRadius: '50%', background: cor }} /></span>{txt}</span>;
}
function ProfChip({ value, onChange, profs }) {
  const nome = value === 'todos' ? 'Todos os profissionais' : ((profs.find((p) => p.id === value) || {}).nome || 'Profissional');
  return (
    <label style={{ ...pillSel, maxWidth: 260 }} title="Escolher o profissional">
      <SIcon name="stethoscope" size={17} strokeWidth={1.7} />
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{nome}</span>
      <span style={{ position: 'absolute', right: 13, display: 'flex', pointerEvents: 'none' }}><SIcon name="chevron-down" size={15} /></span>
      <select aria-label="Profissional" value={value} onChange={(e) => onChange(e.target.value)} style={selInvisivel}>
        <option value="todos">Todos os profissionais</option>
        {profs.map((p) => <option key={p.id} value={p.id}>{p.nome}</option>)}
      </select>
    </label>
  );
}
function AgendaRecentes({ D, mobile }) {
  const [m] = useStore(PAINEL_MES);
  const demo = !D;
  const profs = demo ? [{ id: 'demo1', nome: 'Dra. Camila Rocha' }, { id: 'demo2', nome: 'Dr. Michael Thompson' }] : D.profissionais;
  // profissional escolhido fica salvo nas preferências; sem escolha abre no profissional de quem entrou
  const [sel, setSel] = SB_ON ? usePrefFiltro('painel.profissional', null) : React.useState(null);
  const selOk = sel === 'todos' || profs.some((p) => p.id === sel) ? sel : null;
  const atual = selOk || (D && D.meuProf && profs.some((p) => p.id === D.meuProf) ? D.meuProf : 'todos');
  const todos = demo ? AGENDA_DEMO() : D.agenda;
  const lista = atual === 'todos' ? todos : todos.filter((a) => a.prof === atual);
  const agora = Date.now(), t = (a) => new Date(a.inicio).getTime();
  const prox = lista.filter((a) => t(a) >= agora).sort((a, b) => t(a) - t(b));
  const feitos = lista.filter((a) => t(a) < agora).sort((a, b) => t(b) - t(a));
  const comProf = atual === 'todos' && profs.length > 1;
  const th = { textAlign: 'left', padding: '12px 14px', fontSize: 12, fontWeight: 500, color: 'var(--text-strong)', textTransform: 'uppercase', letterSpacing: '.02em', whiteSpace: 'nowrap', position: 'sticky', top: 0, background: 'rgb(232,240,251)', zIndex: 1 };
  const td = { padding: '10px 14px', fontSize: 13, color: 'var(--text-body)', borderTop: '1px solid rgba(214,226,242,.9)', whiteSpace: 'nowrap' };
  const ncol = comProf ? 5 : 4;
  const grupo = (txt, n) => <tr><td colSpan={ncol} style={{ ...td, padding: '9px 14px', fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.03em', background: 'rgba(255,255,255,.55)' }}>{txt} <span style={{ fontWeight: 500 }}>({n})</span></td></tr>;
  const linha = (a) => (
    <tr key={a.id}>
      <td style={{ ...td, fontVariantNumeric: 'tabular-nums', color: a.feito || t(a) < agora ? 'var(--text-muted)' : 'var(--text-strong)', fontWeight: t(a) >= agora ? 600 : 400 }}>{quandoAg(a.inicio)}</td>
      <td style={td}><span style={{ display: 'flex', alignItems: 'center', gap: 10 }}><PAv name={a.name} size={30} /><span><span style={{ display: 'block', fontWeight: 600, color: 'var(--text-strong)' }}>{a.name}</span><span style={{ display: 'block', fontSize: 11, color: 'var(--text-muted)' }}>{[a.pront, a.age !== '' && a.age !== null && a.age !== undefined ? a.age + ' anos' : ''].filter(Boolean).join(' · ')}</span></span></span></td>
      <td style={td}>{a.proc}</td>
      {comProf ? <td style={td}>{a.profNome}</td> : null}
      <td style={td}><AgStatus txt={a.status} cor={a.cor} /></td>
    </tr>
  );
  return (
    <>
      <CardTitle right={<ProfChip value={atual} onChange={setSel} profs={profs} />}>Pacientes recentes</CardTitle>
      <span style={{ marginTop: -8, fontSize: 13, color: 'var(--text-muted)' }}>{(D ? D.mesAtual : true) ? 'Próximos atendimentos e os já feitos em ' : 'Atendimentos de '}{mesNomeIso(m.iso)}</span>
      <div style={{ maxHeight: mobile ? 360 : 420, overflow: 'auto', scrollbarWidth: 'thin', scrollbarColor: 'rgba(150,175,210,.5) transparent', borderRadius: 18, background: 'rgba(255,255,255,.35)', border: '1.5px solid rgba(255,255,255,.9)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: comProf ? 720 : 600 }}>
          <thead><tr><th style={th}>Quando</th><th style={th}>Nome do paciente</th><th style={th}>Procedimento</th>{comProf ? <th style={th}>Profissional</th> : null}<th style={th}>Status</th></tr></thead>
          <tbody>
            {prox.length ? <>{grupo('Próximos', prox.length)}{prox.map(linha)}</> : null}
            {feitos.length ? <>{grupo('Já atendidos', feitos.length)}{feitos.map(linha)}</> : null}
            {!prox.length && !feitos.length ? <tr><td colSpan={ncol} style={{ ...td, textAlign: 'center', padding: 32, color: 'var(--text-muted)', whiteSpace: 'normal' }}>{D && !D.agenda.length && !D.profissionais.length ? 'Cadastre os profissionais para ver os atendimentos aqui.' : 'Nenhum atendimento ' + (atual === 'todos' ? '' : 'deste profissional ') + 'neste mês.'}</td></tr> : null}
          </tbody>
        </table>
      </div>
    </>
  );
}
