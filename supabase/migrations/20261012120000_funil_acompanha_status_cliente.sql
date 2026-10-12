-- Funil acompanha o status do cliente (2026-10-12).
-- Antes: a entrada só criava lead para contato sem paciente; e o agendamento só movia o lead
-- quando a conversa já tinha lead. Resultado: nenhum cliente saía de "Novo Lead".
-- Agora: (1) toda conversa tem lead, inclusive de paciente;
--        (2) agendar move para Agendado; atender (status "atendido") move para Convertido;
--        (3) transferir para a equipe move para Aguardando atendente;
--        (4) o movimento automático nunca volta de etapa, e Perdido continua manual.
-- A flag crm_mover_automatico da clínica continua valendo: desligada, nada muda sozinho.

-- 1) garante que a conversa tenha um lead (reaproveita o do mesmo telefone, senão cria no funil padrão)
create or replace function public.funil_garantir_lead(p_conversa uuid)
returns uuid
language plpgsql
security definer
set search_path to 'public'
as $$
declare cv record; v_lead uuid; v_funil uuid; v_etapa uuid; v_nome text;
begin
  select * into cv from public.conversas where id = p_conversa and excluido_em is null;
  if cv.id is null then return null; end if;
  if cv.lead_id is not null then return cv.lead_id; end if;
  select l.id into v_lead from public.leads l
   where l.clinica_id = cv.clinica_id and l.excluido_em is null and l.telefone = any (public.ia_tel_variantes(cv.telefone))
   order by l.criado_em desc limit 1;
  if v_lead is null then
    select f.id into v_funil from public.funis f where f.clinica_id = cv.clinica_id and f.excluido_em is null and f.ativo order by f.padrao desc, f.criado_em limit 1;
    select e.id into v_etapa from public.etapas_funil e where e.funil_id = v_funil and e.excluido_em is null and e.tipo_final = 'aberta' order by e.ordem limit 1;
    if v_funil is null or v_etapa is null then return null; end if;
    select p.nome into v_nome from public.pacientes p where p.id = cv.paciente_id and p.excluido_em is null;
    insert into public.leads (clinica_id, funil_id, etapa_id, nome, telefone, conversa_id, ultima_interacao_em, criado_por)
    values (cv.clinica_id, v_funil, v_etapa, coalesce(v_nome, cv.nome_contato, cv.telefone), cv.telefone, cv.id, now(), null)
    returning id into v_lead;
  else
    update public.leads set conversa_id = coalesce(conversa_id, cv.id) where id = v_lead;
  end if;
  update public.conversas set lead_id = v_lead where id = cv.id;
  return v_lead;
end $$;
revoke execute on function public.funil_garantir_lead(uuid) from public, anon, authenticated;

-- 2) movimento automático: só para frente, sem passar por Perdido, e só se a clínica deixou ligado
create or replace function public.funil_mover_sistema(p_lead uuid, p_chave text, p_motivo text)
returns boolean
language plpgsql
security definer
set search_path to 'public'
as $$
declare l record; a record; o record; d record;
begin
  select * into l from public.leads where id = p_lead and excluido_em is null for update;
  if l.id is null then return false; end if;
  select * into a from public.agente_ia where clinica_id = l.clinica_id and excluido_em is null;
  if not coalesce(a.crm_mover_automatico, false) then return false; end if;
  select * into o from public.etapas_funil where id = l.etapa_id;
  select * into d from public.etapas_funil e
   where e.clinica_id = l.clinica_id and e.funil_id = coalesce(l.funil_id, o.funil_id) and e.chave = p_chave and e.excluido_em is null;
  if d.id is null or o.id = d.id then return false; end if;
  if o.tipo_final in ('ganho', 'perdido') then return false; end if;
  if d.tipo_final = 'perdido' then return false; end if;
  if d.ordem <= coalesce(o.ordem, 0) then return false; end if;
  update public.leads set etapa_id = d.id, ultima_interacao_em = now() where id = l.id;
  insert into public.auditoria (clinica_id, tabela, registro_id, acao, usuario_id, dados_antes, dados_depois, colunas_alteradas)
  values (l.clinica_id, 'leads', l.id, 'movimento_etapa', auth.uid(), jsonb_build_object('etapa', o.chave),
          jsonb_build_object('etapa', d.chave, 'origem', 'sistema', 'motivo', left(p_motivo, 300)), array['etapa_id']);
  return true;
end $$;
revoke execute on function public.funil_mover_sistema(uuid, text, text) from public, anon, authenticated;

-- 3) agendamento criado ou com status novo: liga ao lead e move a etapa
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
  if v_lead is null then return null; end if;
  if tg_op = 'INSERT' and new.lead_id is null then
    update public.agendamentos set lead_id = v_lead where id = new.id;
  end if;
  if v_chave = 'atendido' then
    perform public.funil_mover_sistema(v_lead, 'convertido', 'Atendimento realizado');
  elsif not v_final then
    perform public.funil_mover_sistema(v_lead, 'agendado', 'Consulta agendada');
  end if;
  return null;
end $$;
revoke execute on function public.funil_agendamento_trigger() from public, anon, authenticated;

create or replace trigger tg_agendamentos_funil_insert
  after insert on public.agendamentos
  for each row execute function public.funil_agendamento_trigger();
create or replace trigger tg_agendamentos_funil_status
  after update of status_agendamento_id on public.agendamentos
  for each row when (old.status_agendamento_id is distinct from new.status_agendamento_id)
  execute function public.funil_agendamento_trigger();

-- 4) transferência aberta para a equipe: lead vai para Aguardando atendente
create or replace function public.funil_transferencia_trigger()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
declare v_lead uuid;
begin
  if new.status <> 'aberta' or new.conversa_id is null then return null; end if;
  v_lead := public.funil_garantir_lead(new.conversa_id);
  if v_lead is not null then perform public.funil_mover_sistema(v_lead, 'aguardando_atendente', 'Transferido para a equipe'); end if;
  return null;
end $$;
revoke execute on function public.funil_transferencia_trigger() from public, anon, authenticated;

create or replace trigger tg_transferencias_funil
  after insert on public.transferencias_humanas
  for each row execute function public.funil_transferencia_trigger();

-- 5) entrada do WhatsApp: cria lead também para quem já é paciente (antes ficava de fora do funil)
do $$
declare v_def text; v_novo text;
begin
  select pg_get_functiondef(p.oid) into v_def from pg_proc p join pg_namespace n on n.oid = p.pronamespace
   where n.nspname = 'public' and p.proname = 'n8n_ingerir_evento';
  if v_def is not null and position('if v_conv.lead_id is null and v_conv.paciente_id is null then' in v_def) > 0 then
    v_novo := replace(v_def, 'if v_conv.lead_id is null and v_conv.paciente_id is null then', 'if v_conv.lead_id is null then');
    assert v_novo <> v_def, 'n8n_ingerir_evento: bloco de lead não encontrado';
    execute v_novo;
  end if;
end $$;

-- 6) reparo dos dados que já existem: conversas sem lead e consultas sem lead
-- roda como servidor (service_role), como o n8n: o gatilho de origem do lead exige isso fora de uma sessão de usuário
do $$
declare r record;
begin
  perform set_config('request.jwt.claims', '{"role":"service_role"}', true);
  for r in select cv.id from public.conversas cv where cv.excluido_em is null and cv.lead_id is null loop
    perform public.funil_garantir_lead(r.id);
  end loop;
  update public.agendamentos a set lead_id = cv.lead_id
    from public.conversas cv
   where cv.id = a.conversa_id and a.lead_id is null and cv.lead_id is not null and a.excluido_em is null;
  -- quem já foi atendido vai para Convertido; quem tem consulta futura ativa vai para Agendado
  for r in select distinct a.lead_id from public.agendamentos a join public.status_agendamento s on s.id = a.status_agendamento_id
            where a.excluido_em is null and a.lead_id is not null and s.chave = 'atendido' loop
    perform public.funil_mover_sistema(r.lead_id, 'convertido', 'Atendimento realizado');
  end loop;
  for r in select distinct a.lead_id from public.agendamentos a join public.status_agendamento s on s.id = a.status_agendamento_id
            where a.excluido_em is null and a.lead_id is not null and a.inicio > now() and coalesce(s.final, false) = false loop
    perform public.funil_mover_sistema(r.lead_id, 'agendado', 'Consulta futura');
  end loop;
end $$;
