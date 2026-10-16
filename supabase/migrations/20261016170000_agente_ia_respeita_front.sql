-- Agente de IA (2026-10-16): o back passa a respeitar campos da aba que ainda não eram usados.
-- 1) Horário da equipe para transferências (transferencia_inicio/fim): a IA avisa quando a equipe responde e o SLA
--    começa a contar no próximo horário da equipe.
-- 2) Consentimento LGPD (pedir_consentimento): a IA pede o aceite em uma frase no começo da conversa com contato novo.
-- 3) Retenção de conversas (retencao_conversas_dias): conversas sem movimento há mais de N dias são ARQUIVADAS
--    todo dia pela manutenção (apagar o conteúdo é decisão do fundador; aqui só arquiva).
-- 4) Follow up: "parar quando o lead responder" desligado deixa a cadeia seguir mesmo com resposta.

-- 1 e 2: regras do agente (texto que entra nas instruções da IA)
do $$
declare d text;
begin
  select pg_get_functiondef('public.agente_ia_regras(uuid,text)'::regprocedure) into d;
  if position('Horário da equipe para transferências' in d) = 0 then
    d := replace(d,
      E'      ''- Privacidade: '' || a.privacidade_texto || '' Se pedirem para parar de receber mensagens, confirme com educação e não insista.'',',
      E'      case when a.transferencia_inicio is not null and a.transferencia_fim is not null then ''- Horário da equipe para transferências: '' || to_char(a.transferencia_inicio, ''HH24:MI'') || '' às '' || to_char(a.transferencia_fim, ''HH24:MI'') || ''. Fora desse horário, ao transferir, avise que a equipe responde no próximo horário de atendimento.'' end,\n      case when a.pedir_consentimento then ''- Consentimento (LGPD): na primeira resposta a um contato novo, inclua uma frase curta pedindo o aceite para guardar os dados do atendimento, com base neste texto: "'' || coalesce(a.privacidade_texto, '''') || ''". Não repita depois.'' end,\n      ''- Privacidade: '' || a.privacidade_texto || '' Se pedirem para parar de receber mensagens, confirme com educação e não insista.'',');
    if position('Horário da equipe para transferências' in d) = 0 then raise exception 'patch regras nao encaixou'; end if;
    execute d;
  end if;
end $$;

-- 1: SLA da transferência começa no próximo horário da equipe
do $$
declare d text;
begin
  select pg_get_functiondef('public.transferir_para_humano(uuid,text,text,text)'::regprocedure) into d;
  if position('sla_inicio' in d) = 0 then
    d := replace(d, E'declare cv record; a record; v_id uuid;', E'declare cv record; a record; v_id uuid; v_tz text; v_local timestamp; v_sla_inicio timestamptz;');
    d := replace(d, E'            (a.transferencia_usuarios)[1], now() + make_interval(mins => coalesce(a.transferencia_sla_min, 30)))',
                    E'            (a.transferencia_usuarios)[1], v_sla_inicio + make_interval(mins => coalesce(a.transferencia_sla_min, 30)))');
    d := replace(d, E'  select id into v_id from public.transferencias_humanas where conversa_id = cv.id and status in (''aberta'', ''em_atendimento'');',
                    E'  -- o prazo da equipe só começa a contar dentro do horário de transferência configurado (sla_inicio)\n  v_sla_inicio := now();\n  if a.transferencia_inicio is not null and a.transferencia_fim is not null then\n    select coalesce(fuso_horario, ''America/Sao_Paulo'') into v_tz from public.clinicas where id = cv.clinica_id;\n    v_local := now() at time zone v_tz;\n    if v_local::time < a.transferencia_inicio or v_local::time >= a.transferencia_fim then\n      v_sla_inicio := ((case when v_local::time < a.transferencia_inicio then v_local::date else v_local::date + 1 end) + a.transferencia_inicio) at time zone v_tz;\n    end if;\n  end if;\n  select id into v_id from public.transferencias_humanas where conversa_id = cv.id and status in (''aberta'', ''em_atendimento'');');
    if position('v_sla_inicio + make_interval' in d) = 0 or position('v_sla_inicio := now();' in d) = 0 then raise exception 'patch transferir nao encaixou'; end if;
    execute d;
  end if;
end $$;

-- 4: follow up só para na resposta do lead quando a clínica quer
do $$
declare d text;
begin
  select pg_get_functiondef('public.validar_tarefa(uuid)'::regprocedure) into d;
  if position('a.followup_parar_ao_responder and cv.ultima_entrada_em' in d) = 0 then
    d := replace(d, E'    if cv.ultima_entrada_em is not null and cv.ultima_entrada_em > t.criado_em then return jsonb_build_object(''pode'', false, ''motivo'', ''lead_respondeu''); end if;',
                    E'    if coalesce(a.followup_parar_ao_responder, true) and cv.ultima_entrada_em is not null and cv.ultima_entrada_em > t.criado_em then return jsonb_build_object(''pode'', false, ''motivo'', ''lead_respondeu''); end if;');
    if position('a.followup_parar_ao_responder' in d) = 0 then raise exception 'patch validar_tarefa nao encaixou'; end if;
    execute d;
  end if;
end $$;

-- 3: retenção: arquiva conversas paradas há mais de N dias (roda na manutenção)
create or replace function public.ia_retencao_conversas()
returns integer language plpgsql security definer set search_path = public as $$
declare v_n integer := 0;
begin
  update public.conversas c set arquivada = true
    from public.agente_ia a
   where a.clinica_id = c.clinica_id and a.excluido_em is null and coalesce(a.retencao_conversas_dias, 0) > 0
     and c.excluido_em is null and not c.arquivada
     and coalesce(c.ultima_mensagem_em, c.criado_em) < now() - make_interval(days => a.retencao_conversas_dias)
     and not exists (select 1 from public.transferencias_humanas t where t.conversa_id = c.id and t.status in ('aberta', 'em_atendimento'));
  get diagnostics v_n = row_count;
  return v_n;
end $$;
revoke execute on function public.ia_retencao_conversas() from anon, public;
do $$
declare d text;
begin
  select pg_get_functiondef('public.ia_manutencao()'::regprocedure) into d;
  if position('ia_retencao_conversas' in d) = 0 then
    d := regexp_replace(d, E'\\nbegin\\n', E'\nbegin\n  -- retenção de conversas (uma vez por dia, de madrugada)\n  if extract(hour from now() at time zone ''America/Sao_Paulo'') = 3 and extract(minute from now()) < 1 then perform public.ia_retencao_conversas(); end if;\n', 1);
    if position('ia_retencao_conversas' in d) = 0 then raise exception 'patch manutencao nao encaixou'; end if;
    execute d;
  end if;
end $$;
