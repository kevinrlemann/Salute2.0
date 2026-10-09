-- Escala para muitas clínicas: fila justa (rodízio por clínica, limite simultâneo) e limite de envios por minuto por clínica.
-- Parâmetros em ia_plataforma_config (mudáveis sem novo código):
--   tarefas_simultaneas_clinica  quantas tarefas da IA uma clínica processa ao mesmo tempo (padrão 4)
--   envios_minuto_clinica        quantas mensagens por minuto saem por clínica (padrão 30; protege o número contra bloqueio)

insert into public.ia_plataforma_config (chave, valor, atualizado_em) values
  ('tarefas_simultaneas_clinica', '4', now()), ('envios_minuto_clinica', '30', now())
on conflict (chave) do nothing;

create index if not exists tarefas_automacao_clinica_proc on public.tarefas_automacao (clinica_id) where status = 'processando';
create index if not exists envios_pendentes_clinica_recentes on public.envios_pendentes (clinica_id, atualizado_em) where status_envio in ('enviando', 'enviado');

create or replace function public.reivindicar_tarefas(p_tipos text[], p_lote integer default 10, p_trabalhador text default 'n8n', p_segundos integer default 120)
returns setof public.tarefas_automacao
language plpgsql
security definer
set search_path to 'public'
as $function$
declare v_token uuid := gen_random_uuid(); v_cap int := greatest(public.ia_param('tarefas_simultaneas_clinica', 4)::int, 1);
begin
  if coalesce(auth.role(), '') <> 'service_role' then raise exception 'Só o servidor processa a fila' using errcode = '42501'; end if;
  return query
  with cand as (
    select t.id, t.clinica_id, t.executar_em,
           row_number() over (partition by t.clinica_id order by t.executar_em, t.id) as rn
      from public.tarefas_automacao t
     where t.tipo = any (p_tipos)
       and ((t.status = 'pendente' and t.executar_em <= now()) or (t.status = 'processando' and t.travada_ate < now()))
       -- uma tarefa por conversa por vez, para respeitar a ordem
       and not exists (select 1 from public.tarefas_automacao o where o.conversa_id = t.conversa_id and o.id <> t.id
                         and o.status = 'processando' and o.travada_ate >= now())
  ), ocupadas as (
    select o.clinica_id, count(*) as n from public.tarefas_automacao o
     where o.status = 'processando' and o.travada_ate >= now() group by o.clinica_id
  ), alvo as (
    -- rodízio: a 1ª tarefa de cada clínica antes da 2ª de qualquer uma, até o limite simultâneo de cada clínica
    select t.id from public.tarefas_automacao t
      join cand c on c.id = t.id
      left join ocupadas oc on oc.clinica_id is not distinct from c.clinica_id
     where c.rn + coalesce(oc.n, 0) <= v_cap
     order by c.rn, c.executar_em
     limit least(greatest(p_lote, 1), 100)
     for update of t skip locked)
  update public.tarefas_automacao t
     set status = 'processando', tentativas = t.tentativas + 1, travada_ate = now() + make_interval(secs => least(greatest(p_segundos, 10), 900)),
         token_trava = v_token, trabalhador = left(p_trabalhador, 80)
    from alvo where t.id = alvo.id
  returning t.*;
end $function$;

create or replace function public.n8n_reivindicar_envios(p_lote integer default 20)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $function$
declare r record; v jsonb; v_cap int := greatest(public.ia_param('envios_minuto_clinica', 30)::int, 1);
begin
  perform public.n8n_servidor();
  for r in
    update public.envios_pendentes e set payload = e.payload || jsonb_build_object('incerto', true)
     where e.status_envio = 'enviando' and e.atualizado_em < now() - interval '5 minutes'
       and e.payload ? 'envio_iniciado' and not (e.payload ? 'incerto')
    returning e.id, e.clinica_id
  loop
    perform public.n8n_registrar_erro('wf02', null, 'envio_incerto', 'Envio sem confirmação do provedor; aguardando status. Sem reenvio automático.', null, r.id, r.clinica_id, null);
  end loop;
  with cand as (
    select e.id, e.clinica_id, e.criado_em,
           row_number() over (partition by e.clinica_id order by e.criado_em, e.id) as rn
      from public.envios_pendentes e
     where ((e.status_envio = 'pendente' and e.proxima_tentativa_em <= now())
            or (e.status_envio = 'enviando' and e.atualizado_em < now() - interval '5 minutes' and not (e.payload ? 'envio_iniciado') and not (e.payload ? 'incerto')))
       and not exists (select 1 from public.envios_pendentes o
                        where o.conversa_id = e.conversa_id and o.id <> e.id
                          and ( (o.status_envio = 'enviando' and o.atualizado_em >= now() - interval '5 minutes' and not (o.payload ? 'incerto'))
                             or (o.status_envio = 'pendente' and (o.criado_em, o.id) < (e.criado_em, e.id)) ))
  ), usados as (
    -- envios da clínica no último minuto (ritmo humano e proteção contra bloqueio do número)
    select x.clinica_id, count(*) as n from public.envios_pendentes x
     where x.status_envio in ('enviando', 'enviado') and x.atualizado_em > now() - interval '1 minute'
     group by x.clinica_id
  ), alvo as (
    select e.id from public.envios_pendentes e
      join cand c on c.id = e.id
      left join usados u on u.clinica_id is not distinct from c.clinica_id
     where c.rn + coalesce(u.n, 0) <= v_cap
     order by c.rn, c.criado_em
     limit least(greatest(coalesce(p_lote, 20), 1), 50)
     for update of e skip locked
  ), upd as (
    update public.envios_pendentes e set status_envio = 'enviando', tentativas = e.tentativas + 1
      from alvo where e.id = alvo.id
    returning e.id, e.clinica_id, e.conversa_id, e.tipo, e.tentativas, e.criado_em
  )
  select coalesce(jsonb_agg(jsonb_build_object('envio_id', id, 'clinica_id', clinica_id, 'conversa_id', conversa_id, 'tipo', tipo, 'tentativa', tentativas)
                            order by clinica_id, conversa_id, criado_em), '[]'::jsonb) into v from upd;
  return jsonb_build_object('envios', v, 'quantidade', jsonb_array_length(v));
end $function$;
