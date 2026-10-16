-- Transcrição e relatório da consulta (2026-10-16): a equipe grava a conversa da consulta pela ficha do paciente,
-- a IA monta um relatório detalhado e tudo fica guardado aqui, com um registro no histórico do paciente.
create table if not exists public.consultas_relatorios (
  id uuid primary key default gen_random_uuid(),
  clinica_id uuid not null references public.clinicas(id),
  paciente_id uuid not null references public.pacientes(id),
  agendamento_id uuid references public.agendamentos(id),
  profissional_id uuid references public.profissionais(id),
  usuario_id uuid default auth.uid(),
  inicio_em timestamptz,
  fim_em timestamptz,
  duracao_segundos integer not null default 0,
  motor text,                      -- 'web' (navegador), 'eleven' (ElevenLabs) ou 'digitado'
  transcricao text not null default '',
  relatorio text not null default '',
  modelo_ia text,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  criado_por uuid default auth.uid(),
  excluido_em timestamptz
);
create index if not exists consultas_relatorios_paciente_idx on public.consultas_relatorios (clinica_id, paciente_id, criado_em desc) where excluido_em is null;
alter table public.consultas_relatorios enable row level security;
do $$ begin
  if not exists (select 1 from pg_policy where polrelid = 'public.consultas_relatorios'::regclass and polname = 'consultas_relatorios_ler') then
    create policy consultas_relatorios_ler on public.consultas_relatorios for select
      using (clinica_id in (select public.clinicas_permitidas('pacientes')));
  end if;
  if not exists (select 1 from pg_policy where polrelid = 'public.consultas_relatorios'::regclass and polname = 'consultas_relatorios_criar') then
    create policy consultas_relatorios_criar on public.consultas_relatorios for insert
      with check (clinica_id in (select public.clinicas_permitidas('pacientes')));
  end if;
  if not exists (select 1 from pg_policy where polrelid = 'public.consultas_relatorios'::regclass and polname = 'consultas_relatorios_editar') then
    create policy consultas_relatorios_editar on public.consultas_relatorios for update
      using (clinica_id in (select public.clinicas_permitidas('pacientes')))
      with check (clinica_id in (select public.clinicas_permitidas('pacientes')));
  end if;
  if not exists (select 1 from pg_trigger where tgrelid = 'public.consultas_relatorios'::regclass and tgname = 'tg_consultas_relatorios_atualizado') then
    create trigger tg_consultas_relatorios_atualizado before update on public.consultas_relatorios
      for each row execute function public.tocar_atualizado_em();
  end if;
end $$;
