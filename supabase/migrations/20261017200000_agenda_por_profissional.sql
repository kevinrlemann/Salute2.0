-- Agenda visível por profissional (2026-10-17, pedido do fundador).
-- Com "configuracoes_clinica.agenda_restrita" ligado, cada pessoa só vê (e só marca) a agenda dos profissionais liberados para ela:
-- a gestão da clínica (dono/gestor e suporte da Salute) vê todas; o profissional vê a própria; os demais só as liberadas em agendas_acesso.
-- Desligado (padrão, para não mudar as clínicas que já existem), tudo continua como antes.

alter table public.configuracoes_clinica add column if not exists agenda_restrita boolean not null default false;

create table if not exists public.agendas_acesso (
  id uuid primary key default gen_random_uuid(),
  clinica_id uuid not null references public.clinicas(id),
  profissional_id uuid not null references public.profissionais(id),
  usuario_id uuid not null,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  criado_por uuid default auth.uid(),
  excluido_em timestamptz
);
create unique index if not exists agendas_acesso_unico on public.agendas_acesso (profissional_id, usuario_id) where excluido_em is null;
create index if not exists agendas_acesso_clinica_idx on public.agendas_acesso (clinica_id) where excluido_em is null;
alter table public.agendas_acesso enable row level security;
do $$ begin
  if not exists (select 1 from pg_policy where polrelid = 'public.agendas_acesso'::regclass and polname = 'agendas_acesso_ler') then
    create policy agendas_acesso_ler on public.agendas_acesso for select using (clinica_id in (select public.minhas_clinicas()));
  end if;
  if not exists (select 1 from pg_policy where polrelid = 'public.agendas_acesso'::regclass and polname = 'agendas_acesso_gerir') then
    create policy agendas_acesso_gerir on public.agendas_acesso for all
      using (clinica_id in (select public.clinicas_gestao())) with check (clinica_id in (select public.clinicas_gestao()));
  end if;
  if not exists (select 1 from pg_trigger where tgrelid = 'public.agendas_acesso'::regclass and tgname = 'tg_agendas_acesso_atualizado') then
    create trigger tg_agendas_acesso_atualizado before update on public.agendas_acesso for each row execute function public.tocar_atualizado_em();
  end if;
end $$;

-- a pessoa logada pode ver a agenda deste profissional?
create or replace function public.agenda_visivel(p_clinica uuid, p_profissional uuid)
returns boolean
language sql stable security definer set search_path = public
as $$
  select case
    when p_profissional is null then true
    when coalesce(auth.role(), '') = 'service_role' then true
    when not coalesce((select c.agenda_restrita from public.configuracoes_clinica c
                        where c.clinica_id = p_clinica and c.excluido_em is null limit 1), false) then true
    when p_clinica in (select public.clinicas_gestao()) then true
    when exists (select 1 from public.profissionais pf where pf.id = p_profissional and pf.usuario_id = auth.uid() and pf.excluido_em is null) then true
    when exists (select 1 from public.agendas_acesso a where a.profissional_id = p_profissional and a.usuario_id = auth.uid() and a.excluido_em is null) then true
    else false end;
$$;
revoke execute on function public.agenda_visivel(uuid, uuid) from anon;

-- profissionais cuja agenda a pessoa logada pode ver (a tela filtra a lista com isto)
create or replace function public.agenda_profissionais_visiveis(p_clinica uuid)
returns uuid[]
language sql stable security definer set search_path = public
as $$
  select coalesce(array_agg(pf.id), '{}'::uuid[]) from public.profissionais pf
   where pf.clinica_id = p_clinica and pf.excluido_em is null and p_clinica in (select public.minhas_clinicas())
     and public.agenda_visivel(p_clinica, pf.id);
$$;
revoke execute on function public.agenda_profissionais_visiveis(uuid) from anon;

-- a gestão define quem pode ver a agenda de um profissional (lista completa de usuários; os que saem são desligados)
create or replace function public.agenda_acesso_definir(p_clinica uuid, p_profissional uuid, p_usuarios uuid[])
returns jsonb
language plpgsql security definer set search_path = public
as $$
declare v_lista uuid[] := coalesce(p_usuarios, '{}'::uuid[]);
begin
  if not (p_clinica in (select public.clinicas_gestao())) then
    raise exception 'Sem acesso a esta clínica' using errcode = '42501';
  end if;
  if not exists (select 1 from public.profissionais pf where pf.id = p_profissional and pf.clinica_id = p_clinica and pf.excluido_em is null) then
    raise exception 'Profissional não encontrado nesta clínica' using errcode = '22023';
  end if;
  -- só usuários ativos da clínica entram
  select coalesce(array_agg(uc.usuario_id), '{}'::uuid[]) into v_lista from public.usuarios_clinicas uc
   where uc.clinica_id = p_clinica and uc.usuario_id = any(v_lista) and uc.ativo and uc.excluido_em is null;
  update public.agendas_acesso set excluido_em = now()
   where clinica_id = p_clinica and profissional_id = p_profissional and excluido_em is null and not (usuario_id = any(v_lista));
  insert into public.agendas_acesso (clinica_id, profissional_id, usuario_id)
  select p_clinica, p_profissional, u from unnest(v_lista) as u
   where not exists (select 1 from public.agendas_acesso a where a.profissional_id = p_profissional and a.usuario_id = u and a.excluido_em is null);
  return coalesce((select jsonb_agg(a.usuario_id) from public.agendas_acesso a
                    where a.profissional_id = p_profissional and a.excluido_em is null), '[]'::jsonb);
end;
$$;
revoke execute on function public.agenda_acesso_definir(uuid, uuid, uuid[]) from anon;

-- a permissão de verdade: ler, criar e editar consultas só de agendas visíveis
alter policy agendamentos_ler on public.agendamentos using (
  (clinica_id in (select public.clinicas_permitidas('agenda')) or clinica_id in (select public.clinicas_permitidas('pacientes'))
   or clinica_id in (select public.clinicas_permitidas('mensagens')))
  and public.agenda_visivel(clinica_id, profissional_id));
alter policy agendamentos_criar on public.agendamentos with check (
  (clinica_id in (select public.clinicas_permitidas('agenda')) or clinica_id in (select public.clinicas_permitidas('pacientes'))
   or clinica_id in (select public.clinicas_permitidas('mensagens')))
  and public.agenda_visivel(clinica_id, profissional_id));
alter policy agendamentos_editar on public.agendamentos using (
  (clinica_id in (select public.clinicas_permitidas('agenda')) or clinica_id in (select public.clinicas_permitidas('pacientes'))
   or clinica_id in (select public.clinicas_permitidas('mensagens')))
  and public.agenda_visivel(clinica_id, profissional_id))
  with check (
  (clinica_id in (select public.clinicas_permitidas('agenda')) or clinica_id in (select public.clinicas_permitidas('pacientes'))
   or clinica_id in (select public.clinicas_permitidas('mensagens')))
  and public.agenda_visivel(clinica_id, profissional_id));
