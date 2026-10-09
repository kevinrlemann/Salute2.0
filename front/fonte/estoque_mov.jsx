/* ---- Estoque: lançar entrada ou baixa de qualquer quantidade ---- */
const MOTIVOS_BAIXA = ['Uso em procedimento', 'Vencido', 'Perda ou quebra', 'Ajuste de inventário', 'Outro'];
const movVazio = (prodId) => ({ tipo: 'entrada', prod: prodId || '', qtd: '', custo: '', val: '', lote: '', motivo: MOTIVOS_BAIXA[0], obs: '' });
function MovEstoqueDialog({ open, onClose, prods, setProds, inicial }) {
  const [f, setF] = React.useState(() => movVazio(inicial));
  const [erro, setErro] = React.useState('');
  const [salvando, setSalvando] = React.useState(false);
  React.useEffect(() => { if (open) { setF(movVazio(inicial)); setErro(''); } }, [open, inicial]);
  const p = prods.find((x) => String(x.id) === String(f.prod));
  // 1,5 e 1.234,5 no jeito brasileiro; 1.5 também vale
  const num = (v) => { const s = String(v || '').trim(); const n = Number(s.includes(',') ? s.replace(/\./g, '').replace(',', '.') : s); return s && isFinite(n) ? n : NaN; };
  const q = num(f.qtd);
  const entrada = f.tipo === 'entrada';
  const set = (k) => (e) => { setF({ ...f, [k]: e && e.target ? e.target.value : e }); setErro(''); };
  const salvar = async () => {
    if (!p) { setErro('Escolha o insumo.'); return; }
    if (!(q > 0)) { setErro('Informe a quantidade.'); return; }
    if (!entrada && q > p.qtd) { setErro('Só há ' + qFmt(p.qtd) + ' ' + unPl(p.un, p.qtd) + ' no estoque.'); return; }
    const custo = f.custo === '' ? null : num(f.custo);
    if (entrada && f.custo !== '' && !(custo >= 0)) { setErro('Confira o custo unitário.'); return; }
    const mov = { tipo: entrada ? 'entrada' : 'baixa', qtd: q, custo, validade: entrada ? f.val || null : null, lote: entrada ? f.lote.trim() : '', motivo: entrada ? '' : f.motivo, obs: f.obs.trim() };
    setSalvando(true);
    try {
      if (SB_ON) await EstSvc.lancar(p, mov);
      else setProds((ps) => ps.map((x) => x.id === p.id ? { ...x, qtd: Math.max(0, x.qtd + (entrada ? q : -q)), cons: !entrada && mov.motivo === 'Uso em procedimento' ? x.cons + q : x.cons, val: entrada && mov.validade && (!x.val || mov.validade < x.val) ? mov.validade : x.val } : x));
      onClose(true);
    } catch (e) { setErro(String((e && e.message) || '').replace(/^.*?Estoque insuficiente/, 'Estoque insuficiente') || 'Não foi possível lançar. Tente de novo.'); }
    setSalvando(false);
  };
  const opcoes = prods.slice().sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR')).map((x) => ({ value: String(x.id), label: x.nome + ' · ' + qFmt(x.qtd) + ' ' + unPl(x.un, x.qtd) }));
  return (
    <GPortal><ODialog open={open} onClose={() => onClose(false)} icon="arrow-left-right" title="Lançar entrada ou baixa" description="Registre compras que chegaram ou o que saiu do estoque. O saldo é atualizado na hora." width={620}
      footer={<><OBtn variant="secondary" onClick={() => onClose(false)}>Cancelar</OBtn><OBtn iconLeft="check" loading={salvando} onClick={salvar}>{entrada ? 'Registrar entrada' : 'Registrar baixa'}</OBtn></>}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <OSeg fullWidth value={f.tipo} onChange={(v) => { setF({ ...f, tipo: v }); setErro(''); }} options={[{ value: 'entrada', label: 'Entrada', icon: 'arrow-down-to-line' }, { value: 'baixa', label: 'Baixa', icon: 'arrow-up-from-line' }]} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
          <OSelect label="Insumo" placeholder="Escolha o insumo" options={opcoes} value={f.prod === '' ? '' : String(f.prod)} onChange={set('prod')} style={{ gridColumn: '1 / -1' }} />
          <OInput label={'Quantidade' + (p ? ' (' + unPl(p.un, 2) + ')' : '')} inputMode="decimal" placeholder="0" value={f.qtd} onChange={set('qtd')}
            hint={p ? 'Saldo atual: ' + qFmt(p.qtd) + ' ' + unPl(p.un, p.qtd) + (q > 0 ? ' · depois: ' + qFmt(Math.max(0, p.qtd + (entrada ? q : -q))) : '') : undefined} />
          {entrada ? <>
            <OInput label="Custo unitário (R$)" inputMode="decimal" placeholder={p && p.vm ? String(p.vm).replace('.', ',') : '0,00'} value={f.custo} onChange={set('custo')} hint="Opcional. Atualiza o valor médio." />
            <OInput label="Validade" type="date" value={f.val} onChange={set('val')} />
            <OInput label="Lote" placeholder="Opcional" value={f.lote} onChange={set('lote')} />
          </> : <OSelect label="Motivo" options={MOTIVOS_BAIXA} value={f.motivo} onChange={set('motivo')} />}
          <OInput label="Observação" placeholder={entrada ? 'Ex.: nota fiscal 1234, fornecedor' : 'Ex.: frasco quebrado na sala 2'} value={f.obs} onChange={set('obs')} style={{ gridColumn: '1 / -1' }} />
        </div>
        {erro ? <div role="alert" style={{ padding: '10px 14px', borderRadius: 14, background: 'rgba(229,72,77,.08)', color: '#C2272D', fontSize: 14, fontWeight: 500 }}>{erro}</div> : null}
      </div>
    </ODialog></GPortal>
  );
}
