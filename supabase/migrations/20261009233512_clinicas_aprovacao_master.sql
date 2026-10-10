-- Aprovação de clínica nova pelo administrador master (decisão do fundador, 2026-10-10).
-- Clínica cadastrada pelo site nasce "aguardando aprovação": o dono entra, mas não vê nem grava nada
-- até a equipe da Salute aprovar no Painel Master. A trava fica no banco (funções usadas pelo RLS).

alter table public.clinicas add column if not exists aprovada_em timestamptz;
alter table public.clinicas add column if not exists aprovada_por uuid;
alter table public.clinicas add column if not exists recusada_em timestamptz;

-- clínicas que já existiam continuam liberadas
update public.clinicas set aprovada_em = coalesce(criado_em, now()) where aprovada_em is null and recusada_em is null;

-- funções de acesso usadas pelas políticas RLS: só clínicas aprovadas (o suporte da Salute continua entrando em qualquer uma)
create or replace function public.minhas_clinicas()
 returns setof uuid language sql stable security definer set search_path to 'public'
as $function$
  select uc.clinica_id from public.usuarios_clinicas uc join public.clinicas c on c.id = uc.clinica_id
  where uc.usuario_id = auth.uid() and uc.ativo and uc.excluido_em is null and uc.status_convite = 'aceito'
    and c.aprovada_em is not null
  union
  select s.c from (select public.clinica_suporte() as c) s where s.c is not null
$function$;

create or replace function public.clinicas_gestao()
 returns setof uuid language sql stable security definer set search_path to 'public'
as $function$
  select uc.clinica_id from public.usuarios_clinicas uc join public.clinicas c on c.id = uc.clinica_id
  where uc.usuario_id = auth.uid() and uc.ativo and uc.excluido_em is null and uc.status_convite = 'aceito'
    and c.aprovada_em is not null
    and (uc.dono or uc.papel in ('dono', 'gestor'))
  union
  select s.c from (select public.clinica_suporte() as c) s where s.c is not null
$function$;

create or replace function public.clinicas_permitidas(p_modulo text)
 returns setof uuid language sql stable security definer set search_path to 'public'
as $function$
  select uc.clinica_id from public.usuarios_clinicas uc join public.clinicas c on c.id = uc.clinica_id
  where uc.usuario_id = auth.uid() and uc.ativo and uc.excluido_em is null and uc.status_convite = 'aceito'
    and c.aprovada_em is not null
    and (
      uc.dono or uc.papel in ('dono', 'gestor')
      or (
        (p_modulo not like 'gestao.financeiro%' or uc.papel = 'financeiro')
        and coalesce(
          (select p.permitido from public.permissoes p
            where p.usuario_clinica_id = uc.id and p.modulo = p_modulo and p.excluido_em is null
            order by p.atualizado_em desc limit 1),
          public.padrao_papel(uc.papel, p_modulo))
      )
    )
  union
  select s.c from (select public.clinica_suporte() as c) s where s.c is not null
$function$;

-- clínica criada pela equipe da Salute já nasce aprovada; as demais aguardam
create or replace function public.criar_clinica(p_nome text, p_dados jsonb default '{}'::jsonb)
 returns uuid language plpgsql security definer set search_path to 'public'
as $function$
declare v_id uuid; v_uid uuid := auth.uid(); v_tel text; v_uf text;
begin
  if v_uid is null then raise exception 'Entre no sistema para criar uma clínica'; end if;
  if coalesce(trim(p_nome), '') = '' then raise exception 'Informe o nome da clínica'; end if;
  v_tel := nullif(trim(p_dados ->> 'telefone'), '');
  if v_tel is not null and v_tel !~ '^\+[1-9][0-9]{7,14}$' then v_tel := null; end if;
  v_uf := upper(nullif(trim(p_dados ->> 'uf'), ''));
  if v_uf is not null and v_uf !~ '^[A-Z]{2}$' then v_uf := null; end if;
  insert into public.clinicas (nome_fantasia, razao_social, responsavel_nome, cnpj, cpf, email, telefone, whatsapp,
                               cep, logradouro, numero, complemento, bairro, cidade, uf, criado_por, aprovada_em, aprovada_por)
  values (trim(p_nome), nullif(trim(p_dados ->> 'razao_social'), ''), nullif(trim(p_dados ->> 'responsavel_nome'), ''),
          nullif(trim(p_dados ->> 'cnpj'), ''), nullif(trim(p_dados ->> 'cpf'), ''), nullif(lower(trim(p_dados ->> 'email')), ''), v_tel, v_tel,
          nullif(trim(p_dados ->> 'cep'), ''), nullif(trim(p_dados ->> 'logradouro'), ''), nullif(trim(p_dados ->> 'numero'), ''),
          nullif(trim(p_dados ->> 'complemento'), ''), nullif(trim(p_dados ->> 'bairro'), ''), nullif(trim(p_dados ->> 'cidade'), ''), v_uf, v_uid,
          case when public.eh_admin_plataforma() then now() end, case when public.eh_admin_plataforma() then v_uid end)
  returning id into v_id;
  insert into public.usuarios_clinicas (clinica_id, usuario_id, papel, dono, funcao, status_convite, aceito_em, criado_por)
  values (v_id, v_uid, 'dono', true, 'Administradora', 'aceito', now(), v_uid);
  perform public.semear_padroes_clinica(v_id);
  update public.perfis_usuario set clinica_ativa_id = v_id where id = v_uid and clinica_ativa_id is null;
  return v_id;
end $function$;

-- contexto do login: só clínicas aprovadas na lista; as que aguardam vêm em "aguardando"
create or replace function public.meu_contexto()
 returns jsonb language sql stable security definer set search_path to 'public'
as $function$
  with todos as (
    select array['painel','pacientes','agenda','mensagens','gestao','gestao.estoque','gestao.financeiro',
                 'perfil','perfil.cadastro','perfil.canais','perfil.flix','perfil.parcerias','perfil.cert','perfil.conta'] as m
  ), sup as (
    select a.id, a.clinica_id, a.iniciado_em, a.expira_em from public.acessos_suporte a
     where a.usuario_id = auth.uid() and a.clinica_id = public.clinica_suporte() and a.encerrado_em is null and a.excluido_em is null
     order by a.iniciado_em desc limit 1
  )
  select jsonb_build_object(
    'perfil', (select to_jsonb(p) from public.perfis_usuario p where p.id = auth.uid()),
    'admin', public.eh_admin_plataforma(),
    'suporte', (select jsonb_build_object('id', s.id, 'clinica_id', s.clinica_id, 'nome', c.nome_fantasia, 'iniciado_em', s.iniciado_em, 'expira_em', s.expira_em)
                  from sup s join public.clinicas c on c.id = s.clinica_id),
    -- login com acesso pausado (pelo dono ou pelo suporte da Salute) em alguma clínica
    'bloqueado', exists (select 1 from public.usuarios_clinicas uc join public.clinicas c on c.id = uc.clinica_id
                          where uc.usuario_id = auth.uid() and not uc.ativo and uc.excluido_em is null and c.excluido_em is null),
    -- clínicas do login que ainda esperam a aprovação da Salute (ou foram recusadas)
    'aguardando', coalesce((
      select jsonb_agg(jsonb_build_object('nome', c.nome_fantasia, 'recusada', c.recusada_em is not null) order by c.criado_em)
        from public.usuarios_clinicas uc join public.clinicas c on c.id = uc.clinica_id
       where uc.usuario_id = auth.uid() and uc.ativo and uc.excluido_em is null and uc.status_convite = 'aceito'
         and c.excluido_em is null and c.aprovada_em is null), '[]'::jsonb),
    'clinicas', coalesce((
      select jsonb_agg(x.j order by x.nome) from (
        select c.nome_fantasia as nome, jsonb_build_object(
          'id', c.id, 'nome', c.nome_fantasia, 'papel', uc.papel, 'dono', uc.dono, 'funcao', uc.funcao, 'vinculo_id', uc.id, 'suporte', false,
          'modulos', (select coalesce(jsonb_agg(m.modulo), '[]'::jsonb) from (
              select x.modulo from unnest((select t.m from todos t)) as x(modulo)
               where c.id in (select public.clinicas_permitidas(x.modulo))) m)) as j
          from public.usuarios_clinicas uc join public.clinicas c on c.id = uc.clinica_id
         where uc.usuario_id = auth.uid() and uc.ativo and uc.excluido_em is null and uc.status_convite = 'aceito' and c.excluido_em is null
           and c.aprovada_em is not null
        union all
        select c.nome_fantasia, jsonb_build_object(
          'id', c.id, 'nome', c.nome_fantasia, 'papel', 'gestor', 'dono', false, 'funcao', 'Suporte Salute', 'vinculo_id', null, 'suporte', true,
          'modulos', to_jsonb((select t.m from todos t)))
          from public.clinicas c
         where c.id = public.clinica_suporte() and c.excluido_em is null
           and not exists (select 1 from public.usuarios_clinicas uc where uc.clinica_id = c.id and uc.usuario_id = auth.uid()
                             and uc.ativo and uc.excluido_em is null and uc.status_convite = 'aceito' and c.aprovada_em is not null)
      ) x), '[]'::jsonb)
  )
$function$;

-- Renata: clínica sem aprovação não usa a IA da Salute (limite 0 = "não faz parte do plano")
create or replace function public.renata_limite_mes(p_clinica uuid)
 returns jsonb language sql stable security definer set search_path to 'public'
as $function$
  with tz as (
    select coalesce((select fuso_horario from public.clinicas where id = p_clinica), 'America/Sao_Paulo') as fuso
  ), mes as (
    select extract(year from now() at time zone fuso)::int as ano, extract(month from now() at time zone fuso)::int as mes from tz
  ), aprovada as (
    select exists (select 1 from public.clinicas where id = p_clinica and aprovada_em is not null) as ok
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
  select case when not (select ok from aprovada) then
    jsonb_build_object('usadas', coalesce((select mensagens_ia from uso), 0), 'limite', 0, 'ilimitado', false)
  else jsonb_build_object(
    'usadas', coalesce((select mensagens_ia from uso), 0),
    'limite', coalesce((select limite_mensagens from uso), (select limite from plano)),
    'ilimitado', exists (select 1 from plano where limite is null) and (select limite_mensagens from uso) is null
  ) end
$function$;

-- Painel Master: lista mostra a situação da aprovação
create or replace function public.admin_clinicas()
 returns jsonb language plpgsql stable security definer set search_path to 'public'
as $function$
begin
  if not public.eh_admin_plataforma() then raise exception 'Acesso só para a equipe da Salute'; end if;
  return coalesce((select jsonb_agg(to_jsonb(x) order by (x.aprovada_em is not null), lower(x.nome)) from (
    select c.id, c.nome_fantasia as nome, c.razao_social, coalesce(c.cnpj, c.cpf) as documento, c.cidade, c.uf, c.criado_em, c.ativo,
           c.aprovada_em, c.recusada_em, c.email, c.telefone,
           pl.nome as plano, a.status::text as assinatura, a.proxima_cobranca,
           (select nullif(trim(coalesce(p.nome, '') || ' ' || coalesce(p.sobrenome, '')), '') from public.usuarios_clinicas uc join public.perfis_usuario p on p.id = uc.usuario_id
             where uc.clinica_id = c.id and (uc.dono or uc.papel = 'dono') and uc.ativo and uc.excluido_em is null order by uc.criado_em limit 1) as dono,
           (select p.email from public.usuarios_clinicas uc join public.perfis_usuario p on p.id = uc.usuario_id
             where uc.clinica_id = c.id and (uc.dono or uc.papel = 'dono') and uc.ativo and uc.excluido_em is null order by uc.criado_em limit 1) as dono_email,
           (select count(*) from public.usuarios_clinicas uc where uc.clinica_id = c.id and uc.ativo and uc.excluido_em is null and uc.status_convite = 'aceito') as membros,
           (select count(*) from public.pacientes pa where pa.clinica_id = c.id and pa.excluido_em is null) as pacientes,
           (select max(s.iniciado_em) from public.acessos_suporte s where s.clinica_id = c.id) as ultimo_suporte,
           (select coalesce(jsonb_agg(distinct lower(coalesce(p.email, uc.email_convite))), '[]'::jsonb)
              from public.usuarios_clinicas uc left join public.perfis_usuario p on p.id = uc.usuario_id
             where uc.clinica_id = c.id and uc.excluido_em is null and coalesce(p.email, uc.email_convite) is not null) as logins
      from public.clinicas c
      left join public.assinaturas_clinica a on a.clinica_id = c.id and a.excluido_em is null
      left join public.planos pl on pl.id = a.plano_id
     where c.excluido_em is null) x), '[]'::jsonb);
end $function$;

-- aprovar ou recusar uma clínica (só administrador master)
create or replace function public.admin_aprovar_clinica(p_clinica uuid, p_aprovar boolean)
 returns jsonb language plpgsql security definer set search_path to 'public'
as $function$
begin
  if not public.eh_admin_plataforma() then raise exception 'Só o administrador master aprova clínicas'; end if;
  if p_aprovar then
    update public.clinicas set aprovada_em = now(), aprovada_por = auth.uid(), recusada_em = null, atualizado_em = now()
     where id = p_clinica and excluido_em is null;
  else
    update public.clinicas set aprovada_em = null, aprovada_por = auth.uid(), recusada_em = now(), atualizado_em = now()
     where id = p_clinica and excluido_em is null;
  end if;
  if not found then raise exception 'Clínica não encontrada'; end if;
  return jsonb_build_object('id', p_clinica, 'aprovada', p_aprovar);
end $function$;

revoke execute on function public.admin_aprovar_clinica(uuid, boolean) from public, anon;
grant execute on function public.admin_aprovar_clinica(uuid, boolean) to authenticated;

-- só o administrador master mexe nos campos de aprovação (o dono edita o cadastro, mas não se aprova)
create or replace function public.clinicas_trava_aprovacao()
 returns trigger language plpgsql security definer set search_path to 'public'
as $function$
begin
  if (new.aprovada_em is distinct from old.aprovada_em or new.aprovada_por is distinct from old.aprovada_por
      or new.recusada_em is distinct from old.recusada_em)
     and auth.uid() is not null and not public.eh_admin_plataforma() then
    new.aprovada_em := old.aprovada_em; new.aprovada_por := old.aprovada_por; new.recusada_em := old.recusada_em;
  end if;
  return new;
end $function$;

do $$ begin
  if not exists (select 1 from pg_trigger where tgname = 'tg_clinicas_trava_aprovacao' and tgrelid = 'public.clinicas'::regclass) then
    create trigger tg_clinicas_trava_aprovacao before update on public.clinicas
      for each row execute function public.clinicas_trava_aprovacao();
  end if;
end $$;
revoke execute on function public.clinicas_trava_aprovacao() from public, anon, authenticated;
