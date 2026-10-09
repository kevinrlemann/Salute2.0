-- P1-12 / S8: feriados seguiam o papel public e qualquer vínculo (até inativo) podia gravar.
-- Agora: leitura para membros ativos (minhas_clinicas) e gravação só para a gestão (clinicas_gestao).
alter policy feriados_clinica on public.feriados to authenticated
  using (clinica_id in (select public.clinicas_gestao()))
  with check (clinica_id in (select public.clinicas_gestao()));
do $$ begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and tablename = 'feriados' and policyname = 'feriados_ler') then
    create policy feriados_ler on public.feriados for select to authenticated using (clinica_id in (select public.minhas_clinicas()));
  end if;
end $$;
