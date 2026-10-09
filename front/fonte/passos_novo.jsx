/* ---- Primeiros passos da clínica nova: cada passo é conferido nos dados da própria clínica ---- */
const PASSOS = makeStore(null);
const PASSOS_TXT = {
  dados: { t: 'Complete os dados da clínica', d: () => 'CNPJ ou CPF, telefone e endereço. Aparecem nos recibos, na nota fiscal e nas respostas da Renata.', ir: 'configuracoes.clinica', btn: 'Completar' },
  profissionais: { t: 'Cadastre os profissionais', d: (p) => (p.total ? p.total + (p.total === 1 ? ' profissional cadastrado.' : ' profissionais cadastrados.') : 'Quem atende aparece na agenda, no prontuário e no financeiro.'), ir: 'configuracoes.profissionais', btn: 'Cadastrar' },
  procedimentos: { t: 'Escolha os procedimentos e os preços', d: (p) => (p.feito ? p.total + (p.total === 1 ? ' procedimento marcado.' : ' procedimentos marcados.') : p.total ? p.total + ' sugestões já vêm marcadas. Desmarque o que a clínica não faz e inclua os seus.' : 'Cadastre o que a clínica faz, com preço e duração.'), ir: 'configuracoes.procedimentos', btn: 'Revisar', ok: 'Está tudo certo' },
  vinculos: { t: 'Ligue cada profissional aos procedimentos que faz', d: (p, todos) => (p.feito ? 'Todos os profissionais têm os seus procedimentos.' : !(todos.profissionais || {}).feito ? 'Depois de cadastrar os profissionais.' : p.faltam ? (p.faltam === 1 ? '1 profissional ainda sem procedimento.' : p.faltam + ' profissionais ainda sem procedimento.') : 'Assim a agenda só oferece quem faz cada procedimento.'), ir: 'configuracoes.profissionais', btn: 'Ligar' },
  horarios: { t: 'Confira os horários de funcionamento', d: () => 'A Renata usa esses horários para sugerir horários livres aos pacientes.', ir: 'configuracoes.clinica', btn: 'Conferir', ok: 'Está certo' },
  equipe: { t: 'Convide a sua equipe', d: () => 'Recepção, profissionais e financeiro entram com o próprio login e só veem o que você liberar.', ir: 'configuracoes.equipe', btn: 'Convidar', ok: 'Pular' },
};
async function carregarPassos() {
  if (!SB_ON || !CLI()) return;
  const { data, error } = await SB.rpc('primeiros_passos', { p_clinica: CLI() });
  if (error || !data) return;
  const pend = (data.passos || []).some((p) => !p.feito);
  PASSOS.v = { ...data, clinica: CLI(), visto: (PASSOS.v && PASSOS.v.clinica === CLI() && PASSOS.v.visto) || pend }; avisar(PASSOS);
}
async function marcarPasso(passo, feito) {
  const { data, error } = await SB.rpc('marcar_primeiro_passo', { p_clinica: CLI(), p_passo: passo, p_feito: feito !== false });
  if (error) { avisoErro('Não foi possível salvar', error); return; }
  PASSOS.v = { ...data, clinica: CLI(), visto: true }; avisar(PASSOS);
}
function PrimeirosPassos({ mobile }) {
  const { Button: PBtn } = window.SaluteProjetoDesigner_8b4683;
  const [ps] = useStore(PASSOS);
  const { can } = useAccess();
  const [ocupado, setOcupado] = React.useState(null);
  const pode = SB_ON && can('perfil') && can('perfil.cadastro');
  React.useEffect(() => { if (pode) carregarPassos(); }, [pode, CLI()]);
  if (!pode || !ps || ps.clinica !== CLI() || ps.oculto || !ps.visto) return null;
  const lista = ps.passos || [], porChave = Object.fromEntries(lista.map((p) => [p.chave, p]));
  const feitos = lista.filter((p) => p.feito).length, total = lista.length, pronto = feitos === total;
  const marcar = async (k, v) => { setOcupado(k); await marcarPasso(k, v); setOcupado(null); };
  return (
    <section aria-label="Primeiros passos" style={{ ...glass, padding: mobile ? 18 : 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <span style={{ width: 44, height: 44, borderRadius: 14, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: pronto ? 'rgba(45,191,106,.14)' : 'rgba(31,94,255,.1)', color: pronto ? '#1E8E4E' : '#1F5EFF' }}><SIcon name={pronto ? 'party-popper' : 'rocket'} size={21} /></span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{ margin: 0, fontSize: mobile ? 19 : 22, fontWeight: 600, color: 'var(--text-strong)', letterSpacing: '-0.01em' }}>{pronto ? 'Clínica pronta para atender' : 'Primeiros passos'}</h2>
          <p style={{ margin: '3px 0 0', fontSize: 14, color: 'var(--text-muted)' }}>{pronto ? 'Tudo configurado. Você pode mudar qualquer item depois em Configurações.' : 'Deixe a clínica pronta para atender em poucos minutos. ' + feitos + ' de ' + total + ' feitos.'}</p>
        </div>
        <PBtn size="sm" variant={pronto ? 'primary' : 'ghost'} iconLeft={pronto ? 'check' : 'eye-off'} loading={ocupado === 'oculto'} onClick={() => marcar('oculto')}>{pronto ? 'Concluir' : mobile ? 'Ocultar' : 'Ocultar quadro'}</PBtn>
      </div>
      <div style={{ height: 8, borderRadius: 999, background: 'rgba(31,94,255,.1)', overflow: 'hidden' }} role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={feitos} aria-label="Passos feitos">
        <div style={{ width: (total ? (feitos / total) * 100 : 0) + '%', height: '100%', borderRadius: 999, background: pronto ? '#2DBF6A' : 'linear-gradient(90deg,#0B4BEB 0%,#1FB6F5 100%)', transition: 'width .4s ease' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '1fr' : 'repeat(auto-fit, minmax(420px, 1fr))', gap: 10 }}>
        {lista.map((p, i) => { const tx = PASSOS_TXT[p.chave]; if (!tx) return null; const feito = p.feito; return (
          <div key={p.chave} style={{ display: 'flex', alignItems: mobile ? 'flex-start' : 'center', gap: 12, padding: '12px 14px', borderRadius: 18, background: feito ? 'rgba(255,255,255,.35)' : 'rgba(255,255,255,.7)', border: '1.5px solid ' + (feito ? 'rgba(255,255,255,.6)' : 'rgba(255,255,255,.95)'), flexWrap: mobile ? 'wrap' : 'nowrap' }}>
            <span style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, background: feito ? '#2DBF6A' : 'rgba(31,94,255,.1)', color: feito ? '#fff' : '#1F5EFF' }}>{feito ? <SIcon name="check" size={15} strokeWidth={2.4} /> : i + 1}</span>
            <span style={{ flex: 1, minWidth: mobile ? 'calc(100% - 44px)' : 0 }}>
              <span style={{ display: 'block', fontSize: 15, fontWeight: 600, color: feito ? 'var(--text-muted)' : 'var(--text-strong)', textDecorationLine: feito ? 'line-through' : 'none', textDecorationColor: 'rgba(107,122,147,.5)' }}>{tx.t}</span>
              <span style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.45 }}>{p.pulado ? 'Pulado. Você pode convidar quando quiser em Equipe e acessos.' : tx.d(p, porChave)}</span>
            </span>
            {feito ? null : <span style={{ display: 'flex', gap: 8, flexShrink: 0, marginLeft: mobile ? 40 : 0 }}>
              {tx.ok ? <PBtn size="sm" variant="ghost" loading={ocupado === p.chave} onClick={() => marcar(p.chave)}>{tx.ok}</PBtn> : null}
              <PBtn size="sm" variant="secondary" iconRight="arrow-right" onClick={() => rnIrPara(tx.ir)}>{tx.btn}</PBtn>
            </span>}
          </div>); })}
      </div>
    </section>
  );
}
