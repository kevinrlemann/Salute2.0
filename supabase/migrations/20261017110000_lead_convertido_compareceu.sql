-- CRM (decisão do fundador, 2026-10-17): mover o lead para "Convertido" significa que a pessoa compareceu à consulta.
-- Ao entrar na etapa final de ganho, as consultas já passadas desse lead (ou do paciente ligado a ele) que ainda estavam
-- como agendada/confirmada/aguardando/em atendimento passam para "Atendido" (status que conta como atendimento no Painel).
-- Consultas futuras, canceladas ou com falta não mudam. Vale para a equipe (tela), para a IA (mover_etapa_lead) e para importações.
create or replace function public.lead_convertido_compareceu()
returns trigger language plpgsql security definer set search_path to 'public' as $$
declare v_novo text; v_antigo text; v_atendido uuid; v_n integer;
begin
  if new.etapa_id is not distinct from old.etapa_id then return null; end if;
  select tipo_final into v_novo from public.etapas_funil where id = new.etapa_id;
  select tipo_final into v_antigo from public.etapas_funil where id = old.etapa_id;
  if v_novo is distinct from 'ganho' or v_antigo is not distinct from 'ganho' then return null; end if;
  select id into v_atendido from public.status_agendamento
   where clinica_id = new.clinica_id and chave = 'atendido' and excluido_em is null limit 1;
  if v_atendido is null then return null; end if;
  update public.agendamentos a set status_agendamento_id = v_atendido
   where a.clinica_id = new.clinica_id and a.excluido_em is null and a.inicio <= now()
     and (a.lead_id = new.id or (new.paciente_id is not null and a.paciente_id = new.paciente_id))
     and a.status_agendamento_id in (select id from public.status_agendamento
                                      where clinica_id = new.clinica_id and chave in ('agendado', 'confirmado', 'aguardando', 'em_atendimento'));
  get diagnostics v_n = row_count;
  if v_n > 0 then
    insert into public.auditoria (clinica_id, tabela, registro_id, acao, usuario_id, dados_depois, colunas_alteradas)
    values (new.clinica_id, 'leads', new.id, 'convertido_compareceu', auth.uid(), jsonb_build_object('consultas_marcadas_atendidas', v_n), array['agendamentos.status_agendamento_id']);
  end if;
  return null;
end $$;
revoke execute on function public.lead_convertido_compareceu() from anon, public;
do $$ begin
  if not exists (select 1 from pg_trigger where tgrelid = 'public.leads'::regclass and tgname = 'tg_leads_convertido_compareceu') then
    create trigger tg_leads_convertido_compareceu after update of etapa_id on public.leads
      for each row execute function public.lead_convertido_compareceu();
  end if;
end $$;
