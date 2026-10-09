/* =====================================================================
   SERVIÇOS DE DADOS: Minha conta (Supabase)
   Perfil, senha, plano da clínica, notificações e idioma do usuário.
   ===================================================================== */
const perfil = () => SESSAO.v.perfil || {};
const nomeCompleto = () => [perfil().nome, perfil().sobrenome].filter(Boolean).join(' ') || perfil().email || '';
const papelTela = () => { const c = SESSAO.v.clinica || {}; return c.funcao || (c.dono ? 'Administradora' : el('papel', c.papel, 'Recepção')); };
const cidadeClinica = () => { const c = CAT.v.clinica || {}; return [c.cidade, c.uf].filter(Boolean).join(', '); };

// planos e assinatura vêm do banco
function hidratarPlanos() {
  if (!SB_ON) return;
  const pl = (CAT.v.planos || []).filter((p) => p.ativo);
  if (pl.length) substituir(PLANS, pl.map((p) => ({ id: p.codigo, nome: p.nome, preco: p.preco_mensal === null || p.preco_mensal === undefined ? null : Number(p.preco_mensal), sub: p.descricao || '', destaque: !!p.destaque, itens: p.itens || [], limite: p.limite_mensagens_ia })));
  const a = CAT.v.assinatura;
  PLAN_STORE.v = a && a.plano ? a.plano.codigo : ((PLANS[0] || {}).id || 'inicial'); avisar(PLAN_STORE);
  const atual = PLANS.find((p) => p.id === PLAN_STORE.v);
  if (atual && atual.limite) PLAN_LIMIT = atual.limite;
}
const CARGA_CATALOGOS_CONTA = CARGAS.catalogos;
CARGAS.catalogos = async () => {
  await CARGA_CATALOGOS_CONTA();
  if (!CAT.v.clinica) { const r = await DB.ler(SB.from('clinicas').select('*').eq('id', CLI())).catch(() => []); if (r[0]) catSet({ clinica: r[0] }); }
  hidratarPlanos();
};
const consumoMes = () => { const c = CAT.v.consumo, d = BR.partes(); return c && c.ano === d.ano && c.mes === d.mes ? Number(c.mensagens_ia || 0) : 0; };
const proxCobranca = () => { const a = CAT.v.assinatura; return a && a.proxima_cobranca ? BR.dataTela(a.proxima_cobranca) : 'a definir'; };
const diaRenova = () => { const a = CAT.v.assinatura; return (a && a.dia_renovacao) || (a && a.proxima_cobranca ? +a.proxima_cobranca.slice(8, 10) : 10); };

const ContaSvc = {
  async salvarPerfil(v) {
    const tel = String(v.tel || '').trim();
    if (tel && !BR.tel(tel)) { avisoErro('Confira o telefone', 'Use DDD e número, por exemplo (19) 99800-4100.'); throw new Error('telefone'); }
    if (!String(v.nome || '').trim()) { avisoErro('Falta o nome', 'O nome aparece para a equipe e na saudação.'); throw new Error('nome'); }
    const row = await DB.gravar(SB.from('perfis_usuario').update({ nome: v.nome.trim(), sobrenome: String(v.sobrenome || '').trim() || null, telefone: BR.tel(tel) }).eq('id', UID()).select().single(), 'Não foi possível salvar seu perfil');
    const email = String(v.email || '').trim().toLowerCase();
    let aviso = null;
    if (email && email !== String(perfil().email || '').toLowerCase()) {
      const { error } = await SB.auth.updateUser({ email }, { emailRedirectTo: voltaAuth() });
      if (error) { avisoErro('Não foi possível trocar o e-mail', error); throw error; }
      aviso = 'Enviamos um link para ' + email + '. O e-mail muda quando você confirmar.';
    }
    setSessao({ perfil: { ...perfil(), ...row } });
    KIT_USER.name = nomeCompleto();
    if (typeof TEAM_STORE !== 'undefined') carregar('equipe', true);
    avisoOk('Perfil salvo', aviso || undefined);
  },
  async foto(file) {
    const path = await ARQ.enviar('clinica', 'usuarios/' + UID(), file);
    const row = await DB.gravar(SB.from('perfis_usuario').update({ foto_path: path }).eq('id', UID()).select().single(), 'Não foi possível salvar a foto');
    const url = await ARQ.url('clinica', path);
    KIT_USER.avatar = url; setSessao({ perfil: { ...perfil(), ...row } });
    avisoOk('Foto atualizada');
  },
  // confere a senha atual antes de trocar
  async trocarSenha(atual, nova) {
    const { error: e1 } = await SB.auth.signInWithPassword({ email: perfil().email, password: atual });
    if (e1) { avisoErro('Senha atual incorreta', 'Confira a senha que você usa hoje para entrar.'); throw e1; }
    const { error } = await SB.auth.updateUser({ password: nova, data: { senha_definida: true } });
    if (error) { avisoErro('Não foi possível trocar a senha', /should be|weak|length/i.test(error.message || '') ? 'A senha nova precisa ser mais forte.' : error); throw error; }
    avisoOk('Senha alterada');
  },
  async linkSenha() {
    const { error } = await SB.auth.resetPasswordForEmail(perfil().email, { redirectTo: voltaAuth() });
    if (error) { avisoErro('Não foi possível enviar o link', error); throw error; }
  },
  async doisFatores(v) {
    const row = await DB.gravar(SB.from('perfis_usuario').update({ dois_fatores_ativo: !!v }).eq('id', UID()).select().single(), 'Não foi possível salvar a verificação em duas etapas');
    setSessao({ perfil: { ...perfil(), ...row } });
  },
  async trocarPlano(codigo) {
    await DB.rpc('trocar_plano', { p_clinica: CLI(), p_codigo: codigo }, 'Não foi possível trocar o plano');
    const ass = await DB.ler(DB.sel('assinaturas_clinica', '*, plano:planos(codigo,nome,limite_mensagens_ia,percentual_aviso_limite)'));
    catSet({ assinatura: ass[0] || null }); hidratarPlanos();
  },
  consultor(codigo) { return DB.rpc('pedir_consultor', { p_clinica: CLI(), p_codigo: codigo || 'enterprise' }, 'Não foi possível enviar o pedido'); },
};
const notifTela = () => { const p = PREF.v || {}; return { ag: p.notificar_novo_agendamento !== false, anam: p.notificar_anamnese_respondida !== false, est: p.notificar_estoque_minimo !== false, fin: !!p.notificar_pagamento_atrasado }; };
const salvarNotif = (n) => salvarPref({ notificar_novo_agendamento: !!n.ag, notificar_anamnese_respondida: !!n.anam, notificar_estoque_minimo: !!n.est, notificar_pagamento_atrasado: !!n.fin });

Object.assign(window, { ContaSvc, nomeCompleto, papelTela, cidadeClinica, hidratarPlanos, consumoMes, proxCobranca, diaRenova, notifTela, salvarNotif });
