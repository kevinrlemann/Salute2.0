-- Faturamento pela Renata IA, parte 2 (2026-10-17): para a soma ser certeira, toda receita precisa saber de qual consulta veio.
-- O front só preenche contas_receber.agendamento_id no sinal. Este gatilho preenche automaticamente quando a receita entra sem
-- consulta ligada e o paciente tem UMA só consulta não cancelada no dia do lançamento (data_competencia, no fuso da clínica).
-- Se houver duas consultas no mesmo dia, não adivinha (fica nulo). Também preenche as receitas antigas pela mesma regra.
create or replace function public.receita_liga_agendamento()
returns trigger language plpgsql security definer set search_path to 'public' as $$
declare v_tz text; v_id uuid; v_n integer;
begin
  if new.agendamento_id is not null or new.paciente_id is null or new.data_competencia is null then return new; end if;
  if new.procedimento_realizado_id is not null then
    select pr.agendamento_id into v_id from public.procedimentos_realizados pr where pr.id = new.procedimento_realizado_id;
    if v_id is not null then new.agendamento_id := v_id; return new; end if;
  end if;
  select coalesce(fuso_horario, 'America/Sao_Paulo') into v_tz from public.clinicas where id = new.clinica_id;
  v_tz := coalesce(v_tz, 'America/Sao_Paulo');
  select count(*), (array_agg(a.id))[1] into v_n, v_id
    from public.agendamentos a left join public.status_agendamento s on s.id = a.status_agendamento_id
   where a.clinica_id = new.clinica_id and a.paciente_id = new.paciente_id and a.excluido_em is null
     and coalesce(s.chave, '') not in ('cancelado', 'faltou')
     and (a.inicio at time zone v_tz)::date = new.data_competencia;
  if v_n = 1 then new.agendamento_id := v_id; end if;
  return new;
end $$;
revoke execute on function public.receita_liga_agendamento() from anon, public;
do $$ begin
  if not exists (select 1 from pg_trigger where tgrelid = 'public.contas_receber'::regclass and tgname = 'tg_contas_receber_liga_agendamento') then
    create trigger tg_contas_receber_liga_agendamento before insert on public.contas_receber
      for each row execute function public.receita_liga_agendamento();
  end if;
end $$;
-- receitas antigas: mesma regra, uma vez
update public.contas_receber cr set agendamento_id = x.ag_id
  from (select cr2.id, (array_agg(a.id))[1] as ag_id
          from public.contas_receber cr2
          join public.clinicas cfg on cfg.id = cr2.clinica_id
          join public.agendamentos a on a.clinica_id = cr2.clinica_id and a.paciente_id = cr2.paciente_id and a.excluido_em is null
          left join public.status_agendamento s on s.id = a.status_agendamento_id
         where cr2.agendamento_id is null and cr2.excluido_em is null and cr2.paciente_id is not null
           and coalesce(s.chave, '') not in ('cancelado', 'faltou')
           and (a.inicio at time zone coalesce(cfg.fuso_horario, 'America/Sao_Paulo'))::date = cr2.data_competencia
         group by cr2.id having count(*) = 1) x
 where cr.id = x.id;
