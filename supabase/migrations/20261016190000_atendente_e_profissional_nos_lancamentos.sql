-- Lançamentos financeiros passam a registrar QUEM VENDEU (atendente, pessoa da equipe com login) e QUEM EXECUTOU (profissional).
-- Receitas já tinham profissional_id; ganham atendente_usuario_id. Despesas ganham os dois (opcionais).
-- Sem cálculo de comissão: cada clínica faz o seu a partir dos filtros e do indicador "faturamento por atendente" (decisão do fundador, 2026-10-16).
alter table public.contas_receber add column if not exists atendente_usuario_id uuid references public.perfis_usuario(id);
alter table public.contas_pagar   add column if not exists atendente_usuario_id uuid references public.perfis_usuario(id);
alter table public.contas_pagar   add column if not exists profissional_id uuid references public.profissionais(id);
create index if not exists contas_receber_atendente_idx on public.contas_receber (clinica_id, atendente_usuario_id) where excluido_em is null;
create index if not exists contas_pagar_atendente_idx   on public.contas_pagar   (clinica_id, atendente_usuario_id) where excluido_em is null;
create index if not exists contas_pagar_profissional_idx on public.contas_pagar  (clinica_id, profissional_id) where excluido_em is null;

-- Quem lança pela tela sem escolher o atendente fica como atendente (auth.uid()). Lançamentos da IA/n8n (sem usuário) ficam vazios.
create or replace function public.lancamento_atendente_padrao()
returns trigger language plpgsql set search_path = public as $$
begin
  if new.atendente_usuario_id is null then new.atendente_usuario_id := auth.uid(); end if;
  return new;
end $$;
do $$ begin
  if not exists (select 1 from pg_trigger where tgname = 'contas_receber_atendente_padrao') then
    create trigger contas_receber_atendente_padrao before insert on public.contas_receber for each row execute function public.lancamento_atendente_padrao();
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'contas_pagar_atendente_padrao') then
    create trigger contas_pagar_atendente_padrao before insert on public.contas_pagar for each row execute function public.lancamento_atendente_padrao();
  end if;
end $$;
