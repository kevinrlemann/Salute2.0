/* ---- Procedimentos: o que a clínica faz, com preço e duração (sugestões já vêm marcadas) ---- */
const AREA_PROC = [['estetica', 'Estética'], ['odontologia', 'Odontologia'], ['geral', 'Geral']];
const AREA_CAT = { estetica: 'Estética', odontologia: 'Odontologia', geral: 'Consulta' };
const areaNome = (k) => (AREA_PROC.find((a) => a[0] === k) || [null, 'Geral'])[1];
const procTela = (p) => ({ id: p.id, nome: p.nome, area: p.area || 'geral', valor: Number(p.valor || 0), dur: Number(p.duracao_padrao_minutos || 30), ativo: p.ativo !== false });
// primeiros passos: mexeu nos procedimentos, o passo conta como feito
function passoProcedimentosFeito() { if (SB_ON && CLI()) SB.rpc('marcar_primeiro_passo', { p_clinica: CLI(), p_passo: 'procedimentos' }).then(() => {}, () => {}); }
function ProcedimentosCad({ mobile }) {
  const [cat] = useStore(CAT);
  const [local, setLocal] = React.useState(() => FIN_PROCS.map((p, i) => ({ id: 'demo' + i, nome: p.n, area: p.cat === 'Odontologia' ? 'odontologia' : p.cat === 'Consulta' ? 'geral' : 'estetica', valor: p.v, dur: PROC_DUR[p.n] || 30, ativo: true })));
  const lista = (SB_ON ? (cat.procedimentos || []).map(procTela) : local).slice().sort((a, b) => (b.ativo - a.ativo) || a.nome.localeCompare(b.nome, 'pt-BR'));
  const [ed, setEd] = React.useState(null);
  const [erro, setErro] = React.useState('');
  const [salvando, setSalvando] = React.useState(false);
  const ativos = lista.filter((p) => p.ativo).length;
  const valorTxt = (v) => (v ? Number(v).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '');
  const num = (v) => { const s = String(v || '').trim(); if (!s) return 0; const n = Number(s.includes(',') ? s.replace(/\./g, '').replace(',', '.') : s); return isFinite(n) ? n : NaN; };
  const abrir = (p) => { setErro(''); setEd(p ? { ...p, valorTxt: valorTxt(p.valor), durTxt: String(p.dur) } : { id: null, nome: '', area: 'estetica', valorTxt: '', durTxt: '30', ativo: true }); };
  const alternar = (p) => {
    const ativo = !p.ativo;
    if (!SB_ON) { setLocal((l) => l.map((x) => (x.id === p.id ? { ...x, ativo } : x))); return; }
    catSet({ procedimentos: (CAT.v.procedimentos || []).map((x) => (x.id === p.id ? { ...x, ativo } : x)) }); hidratarCatalogos();
    bg(DB.upd('procedimentos', p.id, { ativo }, 'Não foi possível atualizar o procedimento').then(() => { passoProcedimentosFeito(); carregar('catalogos', true); }), () => carregar('catalogos', true));
  };
  const salvar = async () => {
    const nome = ed.nome.trim().replace(/\s+/g, ' '), valor = num(ed.valorTxt), dur = Math.round(num(ed.durTxt));
    if (nome.length < 2) { setErro('Informe o nome do procedimento.'); return; }
    if (lista.some((x) => x.id !== ed.id && x.nome.toLowerCase() === nome.toLowerCase())) { setErro('Já existe um procedimento com esse nome.'); return; }
    if (!(valor >= 0)) { setErro('Confira o preço.'); return; }
    if (!(dur >= 5 && dur <= 600)) { setErro('A duração vai de 5 a 600 minutos.'); return; }
    const dados = { nome, area: ed.area, valor, duracao_padrao_minutos: dur };
    if (!SB_ON) { setLocal((l) => (ed.id ? l.map((x) => (x.id === ed.id ? { ...x, ...dados, dur } : x)) : [...l, { id: 'demo' + Date.now(), ...dados, dur, ativo: true }])); setEd(null); return; }
    setSalvando(true);
    try {
      if (ed.id) await DB.upd('procedimentos', ed.id, dados, 'Não foi possível salvar o procedimento');
      else await DB.ins('procedimentos', { ...dados, ativo: true, categoria_financeira_id: catId('categorias', AREA_CAT[ed.area]) }, 'Não foi possível cadastrar o procedimento');
      passoProcedimentosFeito();
      await carregar('catalogos', true);
      setEd(null);
    } catch (e) { setErro(MSG_ERRO(e)); }
    setSalvando(false);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        <span style={{ flex: 1, minWidth: 220, fontSize: 14, color: 'var(--text-muted)' }}>O que a clínica faz, com preço e duração. Os marcados aparecem na agenda, no prontuário e no financeiro.</span>
        <OBtn size="sm" iconLeft="plus" onClick={() => abrir(null)}>Novo procedimento</OBtn>
      </div>
      <div style={gTable}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 560 }}>
          <thead style={{ background: 'rgba(225,236,250,.7)' }}><tr><th style={gTh}>Procedimento</th><th style={gTh}>Área</th><th style={gTh}>Preço</th><th style={gTh}>Duração</th><th style={{ ...gTh, width: 40 }} /></tr></thead>
          <tbody>
            {lista.map((p) => (
              <tr key={p.id} style={{ opacity: p.ativo ? 1 : 0.55 }}>
                <td style={{ ...gTd, fontWeight: 600, color: 'var(--text-strong)' }}><OCheck checked={p.ativo} onChange={() => alternar(p)} label={p.nome} /></td>
                <td style={gTd}>{areaNome(p.area)}</td>
                <td style={{ ...gTd, fontVariantNumeric: 'tabular-nums' }}>{p.valor ? 'R$ ' + valorTxt(p.valor) : 'Sem preço'}</td>
                <td style={gTd}>{p.dur} min</td>
                <td style={gTd}><button type="button" aria-label={'Editar ' + p.nome} onClick={() => abrir(p)} style={{ ...fCircle, width: 30, height: 30 }}><OIcon name="pencil" size={13} /></button></td>
              </tr>
            ))}
            {!lista.length ? <tr><td colSpan={5} style={{ ...gTd, textAlign: 'center', padding: 28, color: 'var(--text-muted)', whiteSpace: 'normal' }}>Nenhum procedimento ainda. Use Novo procedimento para cadastrar o primeiro.</td></tr> : null}
          </tbody>
        </table>
      </div>
      <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{ativos} de {lista.length} marcados. Desmarcar tira o procedimento das listas, mas o histórico dos pacientes continua com ele.</span>
      <GPortal><ODialog open={!!ed} onClose={() => setEd(null)} icon="syringe" title={ed && ed.id ? 'Editar procedimento' : 'Novo procedimento'} description="O preço e a duração já vêm preenchidos na agenda e no financeiro." width={560}
        footer={<><OBtn variant="secondary" onClick={() => setEd(null)}>Cancelar</OBtn><OBtn iconLeft="check" loading={salvando} onClick={salvar}>Salvar</OBtn></>}>
        {ed ? <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 14 }}>
          <OInput label="Nome" placeholder="Ex.: Laser de CO2, Drenagem linfática" value={ed.nome} onChange={(e) => { setEd({ ...ed, nome: e.target.value }); setErro(''); }} style={{ gridColumn: '1 / -1' }} />
          <OSelect label="Área" options={AREA_PROC.map(([v, l]) => ({ value: v, label: l }))} value={ed.area} onChange={(e) => setEd({ ...ed, area: e.target.value })} />
          <OInput label="Preço (R$)" inputMode="decimal" placeholder="0,00" value={ed.valorTxt} onChange={(e) => { setEd({ ...ed, valorTxt: e.target.value }); setErro(''); }} />
          <OInput label="Duração (minutos)" inputMode="numeric" placeholder="30" value={ed.durTxt} onChange={(e) => { setEd({ ...ed, durTxt: e.target.value.replace(/\D/g, '').slice(0, 3) }); setErro(''); }} />
          {erro ? <div role="alert" style={{ gridColumn: '1 / -1', padding: '10px 14px', borderRadius: 14, background: 'rgba(229,72,77,.08)', color: '#C2272D', fontSize: 14, fontWeight: 500 }}>{erro}</div> : null}
        </div> : null}
      </ODialog></GPortal>
    </div>
  );
}
