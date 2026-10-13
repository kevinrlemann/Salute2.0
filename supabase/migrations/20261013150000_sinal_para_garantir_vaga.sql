-- Sinal para garantir a vaga (2026-10-13). A clínica escolhe se pede sinal; cada profissional pode seguir a
-- clínica, não pedir, pedir um valor fixo ou o valor integral do procedimento. A IA reserva a vaga, passa o valor
-- e a chave PIX, recebe o comprovante e a equipe confirma no sistema. O sinal vira uma receita paga e é abatido
-- quando a consulta é cobrada. Reversível: nada é apagado nem renomeado; colunas novas têm padrão "desligado".

-- 1) colunas
alter table public.configuracoes_clinica
  add column if not exists sinal_ativo boolean not null default false,
  add column if not exists sinal_modo text not null default 'valor',
  add column if not exists sinal_valor numeric(12,2) not null default 0,
  add column if not exists sinal_chave_pix text,
  add column if not exists sinal_instrucoes text,
  add column if not exists sinal_prazo_horas integer not null default 24;
alter table public.profissionais
  add column if not exists sinal_modo text not null default 'clinica',
  add column if not exists sinal_valor numeric(12,2);
alter table public.agendamentos
  add column if not exists sinal_valor numeric(12,2),
  add column if not exists sinal_comprovante_path text,
  add column if not exists sinal_comprovante_em timestamptz,
  add column if not exists sinal_confirmado_em timestamptz,
  add column if not exists sinal_confirmado_por uuid,
  add column if not exists sinal_dispensado_em timestamptz,
  add column if not exists sinal_conta_receber_id uuid,
  add column if not exists sinal_abatido_em timestamptz,
  add column if not exists sinal_abatido_conta_id uuid;
do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'configuracoes_clinica_sinal_modo_check') then
    alter table public.configuracoes_clinica add constraint configuracoes_clinica_sinal_modo_check check (sinal_modo in ('valor', 'integral'));
  end if;
  if not exists (select 1 from pg_constraint where conname = 'profissionais_sinal_modo_check') then
    alter table public.profissionais add constraint profissionais_sinal_modo_check check (sinal_modo in ('clinica', 'nao', 'valor', 'integral'));
  end if;
end $$;

-- 2) regra efetiva do sinal: profissional manda; se "seguir a clínica", vale a configuração da clínica
create or replace function public.sinal_regra(p_clinica uuid, p_profissional uuid default null, p_procedimento uuid default null)
returns jsonb
language plpgsql
stable security definer
set search_path to 'public'
as $$
declare cfg record; pf record; pr record; v_modo text; v_valor numeric; v_exige boolean;
begin
  if not (coalesce(auth.role(), '') = 'service_role' or p_clinica in (select public.minhas_clinicas())) then
    raise exception 'Sem acesso a esta clínica' using errcode = '42501';
  end if;
  select * into cfg from public.configuracoes_clinica where clinica_id = p_clinica and excluido_em is null limit 1;
  select * into pf from public.profissionais where id = p_profissional and clinica_id = p_clinica and excluido_em is null;
  select * into pr from public.procedimentos where id = p_procedimento and clinica_id = p_clinica and excluido_em is null;
  v_modo := case coalesce(pf.sinal_modo, 'clinica')
              when 'nao' then 'nao'
              when 'valor' then 'valor'
              when 'integral' then 'integral'
              else case when coalesce(cfg.sinal_ativo, false) then coalesce(cfg.sinal_modo, 'valor') else 'nao' end
            end;
  v_valor := case v_modo
               when 'integral' then coalesce(pr.valor, case when pf.sinal_modo = 'integral' then pf.sinal_valor end, cfg.sinal_valor, 0)
               when 'valor' then coalesce(case when pf.sinal_modo = 'valor' then pf.sinal_valor end, cfg.sinal_valor, 0)
               else 0 end;
  v_exige := v_modo <> 'nao' and coalesce(v_valor, 0) > 0;
  return jsonb_build_object(
    'exige', v_exige,
    'modo', case when v_exige then v_modo else 'nao' end,
    'valor', case when v_exige then round(v_valor, 2) end,
    'chave_pix', nullif(btrim(coalesce(cfg.sinal_chave_pix, '')), ''),
    'instrucoes', nullif(btrim(coalesce(cfg.sinal_instrucoes, '')), ''),
    'prazo_horas', greatest(1, coalesce(cfg.sinal_prazo_horas, 24)),
    'origem', case when coalesce(pf.sinal_modo, 'clinica') = 'clinica' then 'clinica' else 'profissional' end);
end $$;
revoke execute on function public.sinal_regra(uuid, uuid, uuid) from public, anon;

-- 3) reserva pela IA: com sinal, a consulta nasce "Aguardando" com pagamento pendente e prazo
create or replace function public.reservar_agendamento(p_clinica uuid, p_procedimento uuid, p_profissional uuid, p_inicio timestamptz, p_paciente uuid default null, p_lead uuid default null, p_conversa uuid default null, p_origem text default 'ia')
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare a record; pr record; v_livres jsonb; v_ok boolean; v_dur int; v_id uuid; v_st uuid; v_tz text; v_lead uuid := p_lead; v_regra jsonb; v_exige boolean := false; v_expira timestamptz;
begin
  if not public.agente_pode(p_clinica, 'agenda') and not public.agente_pode(p_clinica) then raise exception 'Sem acesso a esta clínica' using errcode = '42501'; end if;
  if p_origem not in ('ia', 'equipe') then raise exception 'Origem inválida'; end if;
  select * into a from public.agente_ia where clinica_id = p_clinica and excluido_em is null;
  select * into pr from public.procedimentos where id = p_procedimento and clinica_id = p_clinica and excluido_em is null and ativo;
  if pr.id is null then return jsonb_build_object('status', 'recusado', 'motivo', 'procedimento_inexistente'); end if;
  if p_paciente is not null and not exists (select 1 from public.pacientes where id = p_paciente and clinica_id = p_clinica) then
    return jsonb_build_object('status', 'recusado', 'motivo', 'paciente_de_outra_clinica');
  end if;
  if v_lead is null and p_conversa is not null then
    select lead_id into v_lead from public.conversas where id = p_conversa and clinica_id = p_clinica;
  end if;
  v_regra := public.sinal_regra(p_clinica, p_profissional, p_procedimento);
  v_exige := coalesce((v_regra ->> 'exige')::boolean, false);
  if p_origem = 'ia' then
    if a.id is null or not a.ia_consulta_horarios then return jsonb_build_object('status', 'recusado', 'motivo', 'ia_nao_agenda'); end if;
    if not pr.ia_agendavel then return jsonb_build_object('status', 'recusado', 'motivo', 'procedimento_nao_agendavel_pela_ia'); end if;
    -- sem permissão de criar ou aprovação humana: vai para a equipe. Sinal obrigatório da política antiga sem regra da clínica: também.
    if not a.ia_cria_agendamento or a.politica_sinal = 'aprovacao_humana'
       or (a.politica_sinal in ('obrigatorio_confirmar', 'obrigatorio_reservar') and not v_exige) then
      if p_conversa is not null then
        perform public.transferir_para_humano(p_conversa,
          'Pedido de agendamento: ' || pr.nome || ' em ' || to_char(p_inicio at time zone coalesce((select fuso_horario from public.clinicas where id = p_clinica), 'America/Sao_Paulo'), 'DD/MM HH24:MI'),
          'Agendamento', 'sistema');
      end if;
      return jsonb_build_object('status', 'aguardando_equipe', 'motivo', case when not a.ia_cria_agendamento then 'ia_sem_permissao_de_criar' else 'politica_' || a.politica_sinal end);
    end if;
  end if;
  perform pg_advisory_xact_lock(hashtextextended('agenda:' || p_profissional::text, 0));
  select coalesce(fuso_horario, 'America/Sao_Paulo') into v_tz from public.clinicas where id = p_clinica;
  v_livres := public.horarios_disponiveis(p_clinica, p_procedimento, (p_inicio at time zone v_tz)::date, 1, p_profissional, 100);
  select exists (select 1 from jsonb_array_elements(v_livres -> 'horarios') x where (x ->> 'inicio')::timestamptz = p_inicio) into v_ok;
  if not v_ok then return jsonb_build_object('status', 'indisponivel', 'motivo', 'horario_ocupado_ou_fora_da_agenda'); end if;
  v_dur := (v_livres ->> 'duracao_min')::int;
  if v_exige then
    select id into v_st from public.status_agendamento where clinica_id = p_clinica and chave = 'aguardando' and excluido_em is null limit 1;
    v_expira := least(now() + make_interval(hours => (v_regra ->> 'prazo_horas')::int), p_inicio - interval '1 hour');
    if v_expira <= now() then v_expira := now() + interval '2 hours'; end if;
  end if;
  if v_st is null then
    select id into v_st from public.status_agendamento where clinica_id = p_clinica and chave = 'agendado' and excluido_em is null limit 1;
  end if;
  insert into public.agendamentos (clinica_id, paciente_id, profissional_id, procedimento_id, status_agendamento_id, inicio, fim, origem, lead_id, conversa_id,
                                   enviar_confirmacao_whatsapp, observacoes, status_pagamento, sinal_valor, reserva_expira_em)
  values (p_clinica, p_paciente, p_profissional, p_procedimento, v_st, p_inicio, p_inicio + make_interval(mins => v_dur),
          case when p_origem = 'ia' then 'renata_ia'::origem_registro else 'equipe'::origem_registro end, v_lead, p_conversa, true,
          case when p_paciente is null then (select coalesce(nome, telefone) from public.leads where id = v_lead) end,
          case when v_exige then 'pendente' else 'nao_exigido' end, case when v_exige then (v_regra ->> 'valor')::numeric end, v_expira)
  returning id into v_id;
  if v_lead is not null then
    update public.leads set agendamento_id = v_id, agendado_para = p_inicio where id = v_lead;
    if coalesce(a.crm_mover_automatico, false) and (a.crm_mapa ->> 'agendado') is not null then
      perform public.mover_etapa_lead(v_lead, a.crm_mapa ->> 'agendado', case when v_exige then 'Vaga reservada, aguardando sinal' else 'Agendamento confirmado' end, 'sistema');
    end if;
  end if;
  if p_conversa is not null then
    update public.tarefas_automacao set status = 'cancelada', motivo_cancelamento = 'lead agendou'
     where conversa_id = p_conversa and tipo = 'followup' and status = 'pendente' and coalesce(a.followup_parar_se_agendado, true);
  end if;
  if v_exige then
    return jsonb_build_object('status', 'aguardando_sinal', 'agendamento_id', v_id, 'inicio', p_inicio, 'fim', p_inicio + make_interval(mins => v_dur),
      'sinal', v_regra || jsonb_build_object('reserva_ate', to_char(v_expira at time zone v_tz, 'DD/MM/YYYY HH24:MI')));
  end if;
  return jsonb_build_object('status', 'confirmado', 'agendamento_id', v_id, 'inicio', p_inicio, 'fim', p_inicio + make_interval(mins => v_dur));
end $$;

-- 4) equipe confirma o sinal recebido: consulta vira Confirmada, nasce uma receita paga e o paciente é avisado
create or replace function public.sinal_confirmar(p_agendamento uuid, p_valor numeric default null, p_forma text default 'PIX')
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare g record; v_valor numeric; v_cr uuid; v_cat uuid; v_forma uuid; v_st uuid; v_tz text; v_proc text; v_prof text; v_nome text; v_txt text;
begin
  select * into g from public.agendamentos where id = p_agendamento and excluido_em is null for update;
  if g.id is null then raise exception 'Consulta não encontrada'; end if;
  if not (g.clinica_id in (select public.clinicas_permitidas('agenda')) or g.clinica_id in (select public.clinicas_permitidas('gestao.financeiro'))) then
    raise exception 'Sem acesso a esta clínica' using errcode = '42501';
  end if;
  if g.status_pagamento = 'pago' then return jsonb_build_object('ok', true, 'repetido', true, 'conta_receber_id', g.sinal_conta_receber_id); end if;
  v_valor := round(coalesce(p_valor, g.sinal_valor, 0), 2);
  if v_valor <= 0 then raise exception 'Informe o valor do sinal'; end if;
  select coalesce(fuso_horario, 'America/Sao_Paulo') into v_tz from public.clinicas where id = g.clinica_id;
  select nome into v_proc from public.procedimentos where id = g.procedimento_id;
  select nome into v_prof from public.profissionais where id = g.profissional_id;
  select nome into v_nome from public.pacientes where id = g.paciente_id;
  v_nome := coalesce(v_nome, (select coalesce(l.nome, l.telefone) from public.leads l where l.id = g.lead_id), g.observacoes, 'Paciente');
  select id into v_cat from public.categorias_financeiras where clinica_id = g.clinica_id and tipo = 'receita' and excluido_em is null order by ordem, nome limit 1;
  select id into v_forma from public.formas_pagamento where clinica_id = g.clinica_id and excluido_em is null and lower(nome) = lower(coalesce(p_forma, 'PIX')) order by ordem limit 1;
  v_cr := gen_random_uuid();
  insert into public.contas_receber (id, clinica_id, paciente_id, paciente_nome, procedimento_id, procedimento_nome, profissional_id, categoria_financeira_id,
                                     forma_pagamento_id, agendamento_id, tipo_atendimento, descricao, valor_total, valor_desconto, numero_parcelas,
                                     data_competencia, data_vencimento, status, data_pagamento, valor_pago, baixa_por, baixa_em, criado_por)
  values (v_cr, g.clinica_id, g.paciente_id, case when g.paciente_id is null then v_nome end, g.procedimento_id, v_proc, g.profissional_id, v_cat,
          v_forma, g.id, 'particular', 'Sinal · ' || coalesce(v_proc, 'consulta') || ' · ' || to_char(g.inicio at time zone v_tz, 'DD/MM HH24:MI'),
          v_valor, 0, 1, (now() at time zone v_tz)::date, (now() at time zone v_tz)::date, 'pago', (now() at time zone v_tz)::date, v_valor, auth.uid(), now(), auth.uid());
  select id into v_st from public.status_agendamento where clinica_id = g.clinica_id and chave = 'confirmado' and excluido_em is null limit 1;
  update public.agendamentos
     set status_pagamento = 'pago', sinal_valor = v_valor, sinal_confirmado_em = now(), sinal_confirmado_por = auth.uid(),
         sinal_conta_receber_id = v_cr, reserva_expira_em = null,
         status_agendamento_id = coalesce(v_st, status_agendamento_id)
   where id = g.id;
  update public.transferencias_humanas set status = 'resolvida', resolvida_em = now(), resolvida_por = auth.uid()
   where conversa_id = g.conversa_id and categoria = 'Sinal' and status in ('aberta', 'em_atendimento');
  if g.conversa_id is not null then
    v_txt := 'Recebemos seu sinal de R$ ' || to_char(v_valor, 'FM999G999G990D00') || '. Sua consulta' || coalesce(' de ' || v_proc, '') ||
             ' em ' || to_char(g.inicio at time zone v_tz, 'DD/MM') || ' às ' || to_char(g.inicio at time zone v_tz, 'HH24:MI') ||
             coalesce(' com ' || v_prof, '') || ' está confirmada. Esse valor será abatido do total no dia do atendimento.';
    begin
      perform public.n8n_enfileirar_mensagem(g.conversa_id, v_txt, 'resposta', jsonb_build_object('origem', 'sinal_confirmado', 'agendamento_id', g.id));
    exception when others then
      perform public.ia_notificar_equipe(g.clinica_id, 'Avise o paciente', 'Sinal confirmado, mas a mensagem automática não saiu: ' || v_nome, g.conversa_id);
    end;
  end if;
  return jsonb_build_object('ok', true, 'conta_receber_id', v_cr, 'valor', v_valor);
end $$;
revoke execute on function public.sinal_confirmar(uuid, numeric, text) from public, anon;

-- 5) equipe dispensa o sinal desta consulta
create or replace function public.sinal_dispensar(p_agendamento uuid)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare g record; v_st uuid;
begin
  select * into g from public.agendamentos where id = p_agendamento and excluido_em is null for update;
  if g.id is null then raise exception 'Consulta não encontrada'; end if;
  if not (g.clinica_id in (select public.clinicas_permitidas('agenda'))) then raise exception 'Sem acesso a esta clínica' using errcode = '42501'; end if;
  if g.status_pagamento = 'pago' then raise exception 'O sinal já foi recebido; não dá para dispensar'; end if;
  select id into v_st from public.status_agendamento where clinica_id = g.clinica_id and chave = 'agendado' and excluido_em is null limit 1;
  update public.agendamentos
     set status_pagamento = 'nao_exigido', sinal_dispensado_em = now(), reserva_expira_em = null,
         status_agendamento_id = case when exists (select 1 from public.status_agendamento s where s.id = g.status_agendamento_id and s.chave = 'aguardando') then coalesce(v_st, status_agendamento_id) else status_agendamento_id end
   where id = g.id;
  update public.transferencias_humanas set status = 'resolvida', resolvida_em = now(), resolvida_por = auth.uid()
   where conversa_id = g.conversa_id and categoria = 'Sinal' and status in ('aberta', 'em_atendimento');
  return jsonb_build_object('ok', true);
end $$;
revoke execute on function public.sinal_dispensar(uuid) from public, anon;

-- 6) reserva vencida sem sinal: cancela e avisa o contato
create or replace function public.sinal_expirar()
returns integer
language plpgsql
security definer
set search_path to 'public'
as $$
declare r record; v_st uuid; v_n int := 0; v_tz text;
begin
  for r in select g.* from public.agendamentos g
            where g.excluido_em is null and g.status_pagamento = 'pendente' and g.reserva_expira_em is not null and g.reserva_expira_em < now()
              and g.sinal_comprovante_em is null
              and not exists (select 1 from public.status_agendamento s where s.id = g.status_agendamento_id and coalesce(s.final, false))
  loop
    select id into v_st from public.status_agendamento where clinica_id = r.clinica_id and chave = 'cancelado' and excluido_em is null limit 1;
    select coalesce(fuso_horario, 'America/Sao_Paulo') into v_tz from public.clinicas where id = r.clinica_id;
    update public.agendamentos
       set status_pagamento = 'expirado', status_agendamento_id = coalesce(v_st, status_agendamento_id),
           observacoes = concat_ws(E'\n', nullif(observacoes, ''), 'Reserva cancelada: o sinal não foi enviado até ' || to_char(r.reserva_expira_em at time zone v_tz, 'DD/MM HH24:MI'))
     where id = r.id;
    update public.leads set agendamento_id = null, agendado_para = null where id = r.lead_id and agendamento_id = r.id;
    if r.conversa_id is not null then
      begin
        perform public.n8n_enfileirar_mensagem(r.conversa_id,
          'O prazo para o sinal da consulta de ' || to_char(r.inicio at time zone v_tz, 'DD/MM') || ' às ' || to_char(r.inicio at time zone v_tz, 'HH24:MI') ||
          ' terminou e a vaga foi liberada. Se ainda quiser, é só me chamar que a gente marca de novo.',
          'resposta', jsonb_build_object('origem', 'sinal_expirado', 'agendamento_id', r.id));
      exception when others then null; end;
    end if;
    v_n := v_n + 1;
  end loop;
  return v_n;
end $$;
revoke execute on function public.sinal_expirar() from public, anon, authenticated;

-- 7) abatimento do sinal quando a consulta é cobrada
create or replace function public.sinal_disponivel(p_paciente uuid)
returns jsonb
language sql
stable security definer
set search_path to 'public'
as $$
  select coalesce(jsonb_agg(jsonb_build_object('agendamento_id', g.id, 'valor', g.sinal_valor,
           'data', to_char(g.inicio at time zone coalesce(c.fuso_horario, 'America/Sao_Paulo'), 'DD/MM/YYYY'),
           'procedimento', p.nome) order by g.inicio), '[]'::jsonb)
    from public.agendamentos g
    join public.clinicas c on c.id = g.clinica_id
    left join public.procedimentos p on p.id = g.procedimento_id
   where g.paciente_id = p_paciente and g.excluido_em is null and g.status_pagamento = 'pago' and g.sinal_abatido_em is null
     and g.clinica_id in (select public.clinicas_permitidas('gestao.financeiro'));
$$;
revoke execute on function public.sinal_disponivel(uuid) from public, anon;
create or replace function public.sinal_abater(p_agendamento uuid, p_conta_receber uuid)
returns jsonb
language plpgsql
security definer
set search_path to 'public'
as $$
declare g record;
begin
  select * into g from public.agendamentos where id = p_agendamento and excluido_em is null for update;
  if g.id is null then raise exception 'Consulta não encontrada'; end if;
  if not (g.clinica_id in (select public.clinicas_permitidas('gestao.financeiro'))) then raise exception 'Sem acesso a esta clínica' using errcode = '42501'; end if;
  if g.status_pagamento <> 'pago' then raise exception 'Esta consulta não tem sinal pago'; end if;
  if g.sinal_abatido_em is not null then return jsonb_build_object('ok', true, 'repetido', true); end if;
  update public.agendamentos set sinal_abatido_em = now(), sinal_abatido_conta_id = p_conta_receber where id = g.id;
  return jsonb_build_object('ok', true, 'valor', g.sinal_valor);
end $$;
revoke execute on function public.sinal_abater(uuid, uuid) from public, anon;

-- 8) manutenção por minuto também expira reservas
create or replace function public.ia_manutencao()
returns void
language plpgsql
security definer
set search_path to 'public'
as $$
declare v_ult timestamptz; v_sev text;
begin
  begin perform public.sinal_expirar(); exception when others then null; end;
  if exists (select 1 from public.tarefas_automacao t where t.tipo = 'processar_entrada'
               and ((t.status = 'pendente' and t.executar_em <= now() - interval '45 seconds') or (t.status = 'processando' and t.travada_ate < now()))) then perform public.ia_despertar('wf01'); end if;
  if exists (select 1 from public.envios_pendentes e where e.status_envio = 'pendente' and e.proxima_tentativa_em <= now() - interval '45 seconds'
               and not exists (select 1 from public.agente_ia a where a.clinica_id = e.clinica_id and a.automacoes_pausadas and e.tipo <> 'equipe')) then perform public.ia_despertar('wf02'); end if;
  if exists (select 1 from public.tarefas_automacao t join public.agente_ia a on a.clinica_id = t.clinica_id and a.excluido_em is null
              where t.tipo = 'followup' and a.ia_ativa and not a.automacoes_pausadas
                and ((t.status = 'pendente' and t.executar_em <= now()) or (t.status = 'processando' and t.travada_ate < now()))) then perform public.ia_despertar('wf03'); end if;
  if exists (select 1 from public.tarefas_automacao t join public.agente_ia a on a.clinica_id = t.clinica_id and a.excluido_em is null
              where t.tipo = 'lembrete' and a.ia_ativa and not a.automacoes_pausadas
                and ((t.status = 'pendente' and t.executar_em <= now()) or (t.status = 'processando' and t.travada_ate < now()))) then perform public.ia_despertar('wf04'); end if;
  if exists (select 1 from public.envios_pendentes where status_envio = 'enviando' and payload ? 'incerto' and not (payload ? 'conferencia_pedida') and atualizado_em < now() - interval '10 minutes')
     or exists (select 1 from public.envios_pendentes where status_envio = 'enviando' and atualizado_em < now() - interval '5 minutes' and not (payload ? 'incerto')) then perform public.ia_despertar('wf06'); end if;
  if exists (select 1 from public.transferencias_humanas h where h.status = 'aberta' and h.sla_ate is not null and h.sla_ate < now()
               and not exists (select 1 from public.ia_alertas al where al.metrica = 'sla_transferencia:' || h.id)) then perform public.ia_despertar('wf07'); end if;
  if exists (select 1 from public.agente_ia a where a.excluido_em is null and a.atualizado_em < now() - interval '1 minute'
               and a.config_versao::text is distinct from (select valor from public.ia_plataforma_config where chave = 'cfg_validada:' || a.clinica_id)) then perform public.ia_despertar('wf09'); end if;
  v_sev := public.n8n_metricas_saude() ->> 'severidade';
  if v_sev <> 'ok' then
    begin select valor::timestamptz into v_ult from public.ia_plataforma_config where chave = 'ultimo_despertar_wf00'; exception when others then v_ult := null; end;
    if v_ult is null or v_ult < now() - interval '15 minutes' then perform public.ia_despertar('wf00'); end if;
  end if;
exception when others then
  null;
end $$;
