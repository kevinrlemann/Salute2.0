-- Atendimento finalizado move o lead no CRM (situação "finalizado" do Agente de IA)

-- 1) Nova situação no mapa do CRM (padrão: etapa final de ganho "convertido")
alter table public.agente_ia alter column crm_mapa set default
  '{"novo": "novo_lead", "humano": "aguardando_atendente", "perdido": "perdido", "agendado": "agendado", "em_contato": "aguardando_atendente", "finalizado": "convertido"}'::jsonb;

update public.agente_ia set crm_mapa = crm_mapa || '{"finalizado": "convertido"}'::jsonb
 where not (crm_mapa ? 'finalizado');

-- 2) Gatilho: status do agendamento virou "atendido"/"compareceu" (final e conta atendimento)
create or replace function public.agendamento_crm_finalizado()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  s record; a record; l record; o record; d record; v_dest text;
begin
  if new.excluido_em is not null or new.status_agendamento_id is null
     or new.status_agendamento_id is not distinct from old.status_agendamento_id then
    return null;
  end if;
  select * into s from public.status_agendamento where id = new.status_agendamento_id;
  if not (coalesce(s.final, false) and coalesce(s.conta_atendimento, false)) then
    return null;
  end if;
  select * into a from public.agente_ia where clinica_id = new.clinica_id and excluido_em is null;
  if a.id is not null and not coalesce(a.crm_mover_automatico, false) then
    return null;
  end if;
  v_dest := coalesce(nullif(a.crm_mapa ->> 'finalizado', ''), 'convertido');

  for l in
    select * from public.leads
     where clinica_id = new.clinica_id and excluido_em is null
       and (id = new.lead_id or agendamento_id = new.id
            or (new.paciente_id is not null and paciente_id = new.paciente_id))
     for update
  loop
    select * into o from public.etapas_funil where id = l.etapa_id;
    if o.tipo_final in ('ganho', 'perdido') then continue; end if;
    select * into d from public.etapas_funil
     where clinica_id = l.clinica_id and funil_id = coalesce(l.funil_id, o.funil_id)
       and chave = v_dest and excluido_em is null;
    if d.id is null or d.id = o.id or d.tipo_final = 'perdido'
       or (d.tipo_final is distinct from 'ganho' and d.ordem <= coalesce(o.ordem, 0)) then
      continue;
    end if;
    update public.leads
       set etapa_id = d.id, ultima_interacao_em = now(),
           paciente_id = coalesce(paciente_id, new.paciente_id)
     where id = l.id;
    insert into public.auditoria (clinica_id, tabela, registro_id, acao, usuario_id, dados_antes, dados_depois, colunas_alteradas)
    values (l.clinica_id, 'leads', l.id, 'movimento_etapa', auth.uid(),
            jsonb_build_object('etapa', o.chave),
            jsonb_build_object('etapa', d.chave, 'origem', 'sistema', 'motivo', 'Atendimento finalizado', 'agendamento_id', new.id),
            array['etapa_id']);
  end loop;
  return null;
end $$;

revoke execute on function public.agendamento_crm_finalizado() from public, anon, authenticated;

create or replace trigger tg_agendamentos_crm_finalizado
  after update of status_agendamento_id on public.agendamentos
  for each row execute function public.agendamento_crm_finalizado();

-- 3) Regras do agente: explicar a situação "finalizado"
do $do$
declare v text; n text;
begin
  v := pg_get_functiondef('public.agente_ia_regras(uuid,text)'::regprocedure);
  if position('Atendimento finalizado' in v) = 0 then
    n := replace(v, $a$'- Passe para a equipe (e pare de responder) quando: '$a$,
      $b$case when a.crm_mover_automatico then '- CRM: quando o atendimento do paciente é finalizado (status Atendido ou Compareceu), o sistema move o contato sozinho para a etapa "' || coalesce((select e.nome from public.etapas_funil e where e.clinica_id = p_clinica and e.chave = coalesce(a.crm_mapa ->> 'finalizado', 'convertido') and e.excluido_em is null limit 1), 'Convertido') || '" (Atendimento finalizado). Não mova esse contato de volta e trate-o como paciente da clínica, não como lead novo.' end, '- Passe para a equipe (e pare de responder) quando: '$b$);
    if n = v then raise exception 'trecho de agente_ia_regras não encontrado'; end if;
    execute n;
  end if;
end $do$;
