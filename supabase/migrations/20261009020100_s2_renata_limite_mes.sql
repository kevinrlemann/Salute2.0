-- S2 (alto): a Renata não aplicava limite de uso na chave da Salute.
-- Devolve as mensagens usadas no mês e o limite da clínica, para a edge function
-- "renata" bloquear acima do limite. Sem assinatura → limite null (a função usa o
-- padrão RENATA_LIMITE_PADRAO). Plano com limite null (ex.: Enterprise) → ilimitado.
create or replace function public.renata_limite_mes(p_clinica uuid)
returns jsonb
language sql
stable
security definer
set search_path = public
as $$
  with tz as (
    select coalesce((select fuso_horario from public.clinicas where id = p_clinica), 'America/Sao_Paulo') as fuso
  ), mes as (
    select extract(year from now() at time zone fuso)::int as ano, extract(month from now() at time zone fuso)::int as mes from tz
  ), plano as (
    select pl.limite_mensagens_ia as limite
      from public.assinaturas_clinica a join public.planos pl on pl.id = a.plano_id
     where a.clinica_id = p_clinica and a.excluido_em is null
     limit 1
  ), uso as (
    select c.mensagens_ia, c.limite_mensagens from public.renata_consumo c, mes
     where c.clinica_id = p_clinica and c.ano = mes.ano and c.mes = mes.mes and c.excluido_em is null
     limit 1
  )
  select jsonb_build_object(
    'usadas', coalesce((select mensagens_ia from uso), 0),
    'limite', coalesce((select limite_mensagens from uso), (select limite from plano)),
    'ilimitado', exists (select 1 from plano where limite is null) and (select limite_mensagens from uso) is null
  )
$$;

revoke execute on function public.renata_limite_mes(uuid) from public, anon, authenticated;
grant execute on function public.renata_limite_mes(uuid) to service_role;
