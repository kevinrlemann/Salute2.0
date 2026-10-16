-- O suporte da Salute (administrador master dentro de uma clínica, acessos_suporte) pode trocar o plano, além do dono.
-- As demais funções/RLS já incluem o suporte por clinica_suporte() (minhas_clinicas, clinicas_permitidas, clinicas_gestao) ou por eh_admin_plataforma().
create or replace function public.trocar_plano(p_clinica uuid, p_codigo text)
returns void language plpgsql security definer set search_path = public as $$
declare v_plano uuid; v_atual uuid;
begin
  if not (
    exists (select 1 from public.usuarios_clinicas where clinica_id = p_clinica and usuario_id = auth.uid() and (dono or papel = 'dono') and ativo and excluido_em is null)
    or (public.eh_admin_plataforma() and p_clinica = public.clinica_suporte())
  ) then raise exception 'Só o dono da clínica ou o suporte da Salute pode trocar o plano'; end if;
  select id into v_plano from public.planos where codigo = p_codigo and ativo and excluido_em is null;
  if v_plano is null then raise exception 'Plano não encontrado'; end if;
  select plano_id into v_atual from public.assinaturas_clinica where clinica_id = p_clinica and excluido_em is null;
  if v_atual is null then
    insert into public.assinaturas_clinica (clinica_id, plano_id, status, dia_renovacao, proxima_cobranca)
    values (p_clinica, v_plano, 'ativa', extract(day from public.hoje_br())::int, (public.hoje_br() + interval '1 month')::date);
  else
    update public.assinaturas_clinica set plano_id = v_plano, status = 'ativa' where clinica_id = p_clinica and excluido_em is null;
  end if;
  insert into public.historico_assinatura (clinica_id, plano_anterior_id, plano_novo_id, tipo) values (p_clinica, v_atual, v_plano, 'troca');
end $$;
