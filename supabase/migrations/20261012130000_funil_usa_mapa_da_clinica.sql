-- Funil segue o mapeamento da tela Agente de IA (crm_mapa), não nomes fixos de etapa (2026-10-12).
-- Situações da tela: agendado (Agendou), finalizado (Atendimento finalizado), humano (Pediu atendimento humano).
-- Se a clínica não mapeou a situação, vale o nome da etapa (compatível com o comportamento anterior).

-- 1) o movimento traduz a situação pelo mapa da clínica antes de procurar a etapa
create or replace function public.funil_mover_sistema(p_lead uuid, p_chave text, p_motivo text)
returns boolean
language plpgsql
security definer
set search_path to 'public'
as $$
declare l record; a record; o record; d record; v_destino text;
begin
  select * into l from public.leads where id = p_lead and excluido_em is null for update;
  if l.id is null then return false; end if;
  select * into a from public.agente_ia where clinica_id = l.clinica_id and excluido_em is null;
  if not coalesce(a.crm_mover_automatico, false) then return false; end if;
  v_destino := coalesce(nullif(a.crm_mapa ->> p_chave, ''), p_chave);
  select * into o from public.etapas_funil where id = l.etapa_id;
  select * into d from public.etapas_funil e
   where e.clinica_id = l.clinica_id and e.funil_id = coalesce(l.funil_id, o.funil_id) and e.chave = v_destino and e.excluido_em is null;
  if d.id is null or o.id = d.id then return false; end if;
  if o.tipo_final in ('ganho', 'perdido') then return false; end if;
  if d.tipo_final = 'perdido' then return false; end if;
  if d.ordem <= coalesce(o.ordem, 0) then return false; end if;
  update public.leads set etapa_id = d.id, ultima_interacao_em = now() where id = l.id;
  insert into public.auditoria (clinica_id, tabela, registro_id, acao, usuario_id, dados_antes, dados_depois, colunas_alteradas)
  values (l.clinica_id, 'leads', l.id, 'movimento_etapa', auth.uid(), jsonb_build_object('etapa', o.chave),
          jsonb_build_object('etapa', d.chave, 'situacao', p_chave, 'origem', 'sistema', 'motivo', left(p_motivo, 300)), array['etapa_id']);
  return true;
end $$;
revoke execute on function public.funil_mover_sistema(uuid, text, text) from public, anon, authenticated;

-- 2) agendamento: "agendado" ao marcar; "finalizado" ao virar Atendido
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
    perform public.funil_mover_sistema(v_lead, 'finalizado', 'Atendimento realizado');
  elsif not v_final then
    perform public.funil_mover_sistema(v_lead, 'agendado', 'Consulta agendada');
  end if;
  return null;
end $$;

-- 3) transferência aberta: situação "humano"
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
  if v_lead is not null then perform public.funil_mover_sistema(v_lead, 'humano', 'Pediu atendimento humano'); end if;
  return null;
end $$;
