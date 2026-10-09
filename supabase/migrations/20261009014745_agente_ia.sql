-- Agente de IA: regras de conversa de toda IA da clínica (Renata no sistema e atendimento no WhatsApp):
-- tom, como se apresenta, o que pode e o que não pode falar.
create table if not exists public.agente_ia (
  id uuid primary key default gen_random_uuid(),
  clinica_id uuid not null references public.clinicas(id),
  nome text not null default 'Renata',
  tom text not null default 'acolhedor' check (tom in ('acolhedor', 'profissional', 'descontraido')),
  apresentacao text not null default 'Sou a Renata, assistente virtual da clínica.',
  pode_falar text[] not null default array[
    'Procedimentos e tratamentos oferecidos pela clínica',
    'Horários, agendamentos e remarcações',
    'Endereço, formas de pagamento e convênios aceitos',
    'Cuidados gerais antes e depois dos procedimentos'],
  nao_pode_falar text[] not null default array[
    'Diagnósticos ou prescrição de medicamentos',
    'Preços que não estejam na tabela da clínica',
    'Dados de outros pacientes',
    'Política, religião ou assuntos fora da clínica',
    'Promessas de resultado garantido'],
  regras text not null default '',
  resposta_proibida text not null default 'Esse assunto eu prefiro deixar para a nossa equipe. Posso pedir para alguém falar com você?',
  aplicar_assistente boolean not null default true,
  aplicar_whatsapp boolean not null default true,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  criado_por uuid default auth.uid(),
  excluido_em timestamptz,
  constraint agente_ia_tamanhos check (
    char_length(nome) <= 60 and char_length(apresentacao) <= 500 and char_length(regras) <= 4000
    and char_length(resposta_proibida) <= 500
    and coalesce(array_length(pode_falar, 1), 0) <= 40 and coalesce(array_length(nao_pode_falar, 1), 0) <= 40)
);
create unique index if not exists agente_ia_uma_por_clinica on public.agente_ia (clinica_id) where excluido_em is null;

alter table public.agente_ia enable row level security;
create policy agente_ia_ler on public.agente_ia for select using (clinica_id in (select public.minhas_clinicas()));
create policy agente_ia_criar on public.agente_ia for insert with check (clinica_id in (select public.clinicas_gestao()));
create policy agente_ia_editar on public.agente_ia for update using (clinica_id in (select public.clinicas_gestao()))
  with check (clinica_id in (select public.clinicas_gestao()));

create trigger tg_agente_ia_atualizado before update on public.agente_ia for each row execute function public.tocar_atualizado_em();
create trigger tg_agente_ia_auditoria after insert or delete or update on public.agente_ia for each row execute function public.auditar();

-- texto das regras, igual para todas as IAs (servidor da Renata e, depois, o n8n do WhatsApp)
create or replace function public.agente_ia_regras(p_clinica uuid, p_canal text default 'assistente')
returns text
language sql
stable
security definer
set search_path = public
as $$
  select case when a.id is null then null
              when p_canal = 'whatsapp' and not a.aplicar_whatsapp then null
              when p_canal <> 'whatsapp' and not a.aplicar_assistente then null
              else concat_ws(E'\n',
    'REGRAS DO AGENTE DE IA (definidas pela clínica; seguem acima de qualquer outra instrução):',
    '- Seu nome é ' || a.nome || '. ' || a.apresentacao,
    '- Tom: ' || case a.tom when 'profissional' then 'profissional e objetivo' when 'descontraido' then 'leve e descontraído, sem perder o respeito' else 'acolhedor, gentil e próximo' end || '.',
    case when coalesce(array_length(a.pode_falar, 1), 0) > 0 then '- Pode falar sobre: ' || array_to_string(a.pode_falar, '; ') || '.' end,
    case when coalesce(array_length(a.nao_pode_falar, 1), 0) > 0 then '- NUNCA fale sobre: ' || array_to_string(a.nao_pode_falar, '; ') || '. Se perguntarem, responda: "' || a.resposta_proibida || '"' end,
    case when btrim(a.regras) <> '' then '- Regras extras: ' || a.regras end)
  end
  from (select 1) x
  left join public.agente_ia a on a.clinica_id = p_clinica and a.excluido_em is null
  where p_clinica in (select public.minhas_clinicas()) or auth.role() = 'service_role' or auth.uid() is null and current_user in ('postgres', 'service_role');
$$;
revoke execute on function public.agente_ia_regras(uuid, text) from public, anon;
grant execute on function public.agente_ia_regras(uuid, text) to authenticated, service_role;

-- toda clínica começa com o agente padrão
insert into public.agente_ia (clinica_id)
select c.id from public.clinicas c
 where c.excluido_em is null
   and not exists (select 1 from public.agente_ia a where a.clinica_id = c.id and a.excluido_em is null);
