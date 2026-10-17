-- Faturamento pela Renata IA, parte 3 (pedido do fundador, 2026-10-17): toda receita gerada por uma consulta agendada pela IA conta,
-- mesmo lançada dias depois (ou um pouco antes, como pagamento adiantado). A ligação receita → consulta deixa de exigir o mesmo dia:
-- procura a consulta não cancelada do paciente mais próxima do lançamento, numa janela de 30 dias antes até 7 dias depois.
-- Preferência: mesmo dia; depois a mais próxima. Se duas consultas estiverem à mesma distância, não adivinha (fica nula).
create or replace function public.receita_liga_agendamento()
returns trigger language plpgsql security definer set search_path to 'public' as $$
declare v_tz text; v_id uuid; v_d1 integer; v_d2 integer;
begin
  if new.agendamento_id is not null or new.paciente_id is null or new.data_competencia is null then return new; end if;
  if new.procedimento_realizado_id is not null then
    select pr.agendamento_id into v_id from public.procedimentos_realizados pr where pr.id = new.procedimento_realizado_id;
    if v_id is not null then new.agendamento_id := v_id; return new; end if;
  end if;
  select coalesce(fuso_horario, 'America/Sao_Paulo') into v_tz from public.clinicas where id = new.clinica_id;
  v_tz := coalesce(v_tz, 'America/Sao_Paulo');
  with c as (
    select a.id, abs((a.inicio at time zone v_tz)::date - new.data_competencia) as dist
      from public.agendamentos a left join public.status_agendamento s on s.id = a.status_agendamento_id
     where a.clinica_id = new.clinica_id and a.paciente_id = new.paciente_id and a.excluido_em is null
       and coalesce(s.chave, '') not in ('cancelado', 'faltou')
       and (a.inicio at time zone v_tz)::date between new.data_competencia - 30 and new.data_competencia + 7
     order by dist, a.inicio desc limit 2)
  select (array_agg(id order by dist))[1], (array_agg(dist order by dist))[1], (array_agg(dist order by dist))[2] into v_id, v_d1, v_d2 from c;
  if v_id is not null and (v_d2 is null or v_d2 <> v_d1) then new.agendamento_id := v_id; end if;
  return new;
end $$;
revoke execute on function public.receita_liga_agendamento() from anon, public;
-- receitas antigas ainda sem consulta: mesma regra, uma vez
update public.contas_receber cr set agendamento_id = x.ag_id
  from (select cr2.id,
               (array_agg(a.id order by abs((a.inicio at time zone coalesce(cl.fuso_horario, 'America/Sao_Paulo'))::date - cr2.data_competencia), a.inicio desc))[1] as ag_id,
               (array_agg(abs((a.inicio at time zone coalesce(cl.fuso_horario, 'America/Sao_Paulo'))::date - cr2.data_competencia) order by abs((a.inicio at time zone coalesce(cl.fuso_horario, 'America/Sao_Paulo'))::date - cr2.data_competencia)))[1] as d1,
               (array_agg(abs((a.inicio at time zone coalesce(cl.fuso_horario, 'America/Sao_Paulo'))::date - cr2.data_competencia) order by abs((a.inicio at time zone coalesce(cl.fuso_horario, 'America/Sao_Paulo'))::date - cr2.data_competencia)))[2] as d2
          from public.contas_receber cr2
          join public.clinicas cl on cl.id = cr2.clinica_id
          join public.agendamentos a on a.clinica_id = cr2.clinica_id and a.paciente_id = cr2.paciente_id and a.excluido_em is null
          left join public.status_agendamento s on s.id = a.status_agendamento_id
         where cr2.agendamento_id is null and cr2.excluido_em is null and cr2.paciente_id is not null
           and coalesce(s.chave, '') not in ('cancelado', 'faltou')
           and (a.inicio at time zone coalesce(cl.fuso_horario, 'America/Sao_Paulo'))::date between cr2.data_competencia - 30 and cr2.data_competencia + 7
         group by cr2.id) x
 where cr.id = x.id and (x.d2 is null or x.d2 <> x.d1);
