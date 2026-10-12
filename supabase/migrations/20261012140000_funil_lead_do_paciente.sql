-- Consulta sem conversa também move o funil (2026-10-12).
-- Antes: agendamento sem conversa (criado na agenda ou sem conversa vinculada) não achava lead, e nada se movia.
-- Agora: o lead é achado (ou criado) pelo telefone do paciente, e o agendamento é ligado a ele.

-- 1) lead do paciente: pelo telefone (WhatsApp ou telefone); se não existir, cria na etapa inicial do funil padrão
create or replace function public.funil_lead_do_paciente(p_paciente uuid)
returns uuid
language plpgsql
security definer
set search_path to 'public'
as $$
declare p record; v_lead uuid; v_funil uuid; v_etapa uuid; v_tel text;
begin
  select * into p from public.pacientes where id = p_paciente and excluido_em is null;
  if p.id is null then return null; end if;
  v_tel := coalesce(nullif(p.whatsapp, ''), nullif(p.telefone, ''));
  if v_tel is null then return null; end if;
  select l.id into v_lead from public.leads l
   where l.clinica_id = p.clinica_id and l.excluido_em is null and l.telefone = any (public.ia_tel_variantes(v_tel))
   order by l.criado_em desc limit 1;
  if v_lead is null then
    select f.id into v_funil from public.funis f where f.clinica_id = p.clinica_id and f.excluido_em is null and f.ativo order by f.padrao desc, f.criado_em limit 1;
    select e.id into v_etapa from public.etapas_funil e where e.funil_id = v_funil and e.excluido_em is null and e.tipo_final = 'aberta' order by e.ordem limit 1;
    if v_funil is null or v_etapa is null then return null; end if;
    insert into public.leads (clinica_id, funil_id, etapa_id, nome, telefone, ultima_interacao_em, criado_por)
    values (p.clinica_id, v_funil, v_etapa, p.nome, v_tel, now(), null)
    returning id into v_lead;
  end if;
  return v_lead;
end $$;
revoke execute on function public.funil_lead_do_paciente(uuid) from public, anon, authenticated;

-- 2) gatilho de agendamento: acha o lead pela conversa, senão pelo paciente
create or replace function public.funil_agendamento_trigger()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
declare v_lead uuid; v_chave text; v_final boolean;
begin
  select s.chave, coalesce(s.final, false) into v_chave, v_final from public.status_agendamento s where s.id = new.status_agendamento_id;
  v_lead := coalesce(new.lead_id, (select cv.lead_id from public.conversas cv where cv.id = new.conversa_id));
  if v_lead is null and new.conversa_id is not null then v_lead := public.funil_garantir_lead(new.conversa_id); end if;
  if v_lead is null and new.paciente_id is not null then v_lead := public.funil_lead_do_paciente(new.paciente_id); end if;
  if v_lead is null then return null; end if;
  if new.lead_id is null then
    update public.agendamentos set lead_id = v_lead where id = new.id;
  end if;
  if v_chave = 'atendido' then
    perform public.funil_mover_sistema(v_lead, 'finalizado', 'Atendimento realizado');
  elsif not v_final then
    perform public.funil_mover_sistema(v_lead, 'agendado', 'Consulta agendada');
  end if;
  return null;
end $$;

-- 3) reparo: consultas sem lead passam a apontar para o lead do paciente, e o funil é reclassificado
do $$
declare r record;
begin
  perform set_config('request.jwt.claims', '{"role":"service_role"}', true);
  for r in select a.id, a.paciente_id from public.agendamentos a
            where a.excluido_em is null and a.lead_id is null and a.paciente_id is not null loop
    update public.agendamentos set lead_id = public.funil_lead_do_paciente(r.paciente_id) where id = r.id;
  end loop;
  for r in select distinct a.lead_id from public.agendamentos a join public.status_agendamento s on s.id = a.status_agendamento_id
            where a.excluido_em is null and a.lead_id is not null and s.chave = 'atendido' loop
    perform public.funil_mover_sistema(r.lead_id, 'finalizado', 'Atendimento realizado');
  end loop;
  for r in select distinct a.lead_id from public.agendamentos a join public.status_agendamento s on s.id = a.status_agendamento_id
            where a.excluido_em is null and a.lead_id is not null and a.inicio > now() and coalesce(s.final, false) = false loop
    perform public.funil_mover_sistema(r.lead_id, 'agendado', 'Consulta futura');
  end loop;
end $$;
