-- Isolamento entre clínicas (2026-10-12): nenhuma clínica enxerga ou altera dados de outra.
-- A auditoria mostrou três brechas em funções SECURITY DEFINER que recebem p_clinica:
--   origem_nao_informado: não conferia a clínica e aceitava anônimo;
--   renata_registrar_consumo (7 parâmetros): não conferia a clínica e aceitava anônimo e usuário logado;
--   ia_uso / admin_definir_limite_ia: já conferem por dentro, mas anônimo não deve nem chamar.

-- 1) origem_nao_informado: só a própria clínica (ou o servidor) usa
create or replace function public.origem_nao_informado(p_clinica uuid)
 returns uuid language plpgsql security definer set search_path to 'public' as $$
declare v_id uuid;
begin
  if coalesce(auth.role(), '') <> 'service_role' and not (p_clinica in (select public.minhas_clinicas())) then
    raise exception 'Sem acesso a esta clínica' using errcode = '42501';
  end if;
  select id into v_id from public.origens_lead where clinica_id = p_clinica and nome = 'Não informado' and excluido_em is null order by ativo desc limit 1;
  if v_id is null then
    insert into public.origens_lead (clinica_id, nome, ativo, ordem) values (p_clinica, 'Não informado', true, 999) returning id into v_id;
  end if;
  return v_id;
end $$;
revoke execute on function public.origem_nao_informado(uuid) from public, anon;

-- 2) consumo da Renata: só a função renata (servidor, chave de serviço) registra
revoke execute on function public.renata_registrar_consumo(uuid, integer, bigint, bigint, bigint, numeric, text) from public, anon, authenticated;
revoke execute on function public.renata_registrar_consumo(uuid, integer, bigint, bigint, bigint, numeric) from public, anon, authenticated;

-- 3) uso e limite de IA: anônimo não chama (quem está logado continua conferido por dentro)
revoke execute on function public.ia_uso(uuid, integer) from public, anon;
revoke execute on function public.admin_definir_limite_ia(uuid, integer) from public, anon;

-- 4) search_path fixo na função de espera da IA
alter function public.ia_espera_resposta(text, text, integer, boolean) set search_path = public;
