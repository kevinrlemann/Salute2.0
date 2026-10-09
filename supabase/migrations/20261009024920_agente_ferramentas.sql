-- Agente de IA: ferramentas de domínio (fases 5 a 7). A IA nunca grava direto: chama estas funções,
-- que conferem as regras da clínica e respondem com o resultado real.

-- transfere a conversa para a equipe: desliga a IA na conversa, abre a transferência,
-- cancela o follow-up comercial e move o lead para a etapa mapeada como "humano"
create or replace function public.transferir_para_humano(p_conversa uuid, p_motivo text, p_categoria text default null, p_origem text default 'ia')
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare cv record; a record; v_id uuid;
begin
  select * into cv from public.conversas where id = p_conversa and excluido_em is null for update;
  if not found then raise exception 'Conversa não encontrada'; end if;
  if not public.agente_pode(cv.clinica_id) then raise exception 'Sem acesso a esta clínica' using errcode = '42501'; end if;
  if p_origem not in ('ia', 'equipe', 'paciente', 'sistema') then raise exception 'Origem inválida'; end if;
  select * into a from public.agente_ia where clinica_id = cv.clinica_id and excluido_em is null;
  -- a IA para antes de qualquer outra resposta automática
  update public.conversas set ia_ativa = false, ia_pausada_em = now(), ia_pausada_por = auth.uid() where id = cv.id;
  if cv.lead_id is not null then
    update public.leads set ia_ativa = false, ia_pausada_em = now(), ia_pausada_por = auth.uid() where id = cv.lead_id;
  end if;
  select id into v_id from public.transferencias_humanas where conversa_id = cv.id and status in ('aberta', 'em_atendimento');
  if v_id is null then
    insert into public.transferencias_humanas (clinica_id, conversa_id, lead_id, categoria, motivo, origem, atribuida_a, sla_ate)
    values (cv.clinica_id, cv.id, cv.lead_id, left(p_categoria, 120), left(coalesce(nullif(trim(p_motivo), ''), 'Transferência'), 500), p_origem,
            (a.transferencia_usuarios)[1], now() + make_interval(mins => coalesce(a.transferencia_sla_min, 30)))
    returning id into v_id;
    -- aviso para quem recebe
    insert into public.notificacoes (clinica_id, usuario_id, tipo, titulo, descricao, registro_tabela, registro_id)
    select cv.clinica_id, u, 'nova_mensagem'::public.tipo_notificacao, 'Conversa transferida para a equipe', left(coalesce(cv.nome_contato, cv.telefone) || ': ' || p_motivo, 200),
           'conversas', cv.id
      from unnest(coalesce(a.transferencia_usuarios, '{}'::uuid[])) u;
  end if;
  update public.tarefas_automacao set status = 'cancelada', motivo_cancelamento = 'transferida para a equipe'
   where conversa_id = cv.id and tipo = 'followup' and status = 'pendente';
  if cv.lead_id is not null and coalesce(a.crm_mover_automatico, false) and (a.crm_mapa ->> 'humano') is not null then
    perform public.mover_etapa_lead(cv.lead_id, a.crm_mapa ->> 'humano', 'Transferido para a equipe', 'sistema');
  end if;
  return v_id;
exception when foreign_key_violation then
  raise exception 'Não foi possível abrir a transferência';
end $$;

-- a equipe encerra a transferência e decide se a IA volta a atender esta conversa
create or replace function public.resolver_transferencia(p_transferencia uuid, p_reativar_ia boolean default false)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare t record;
begin
  select * into t from public.transferencias_humanas where id = p_transferencia for update;
  if not found then raise exception 'Transferência não encontrada'; end if;
  if not public.agente_pode(t.clinica_id) then raise exception 'Sem acesso a esta clínica' using errcode = '42501'; end if;
  update public.transferencias_humanas set status = 'resolvida', resolvida_em = now(), resolvida_por = auth.uid() where id = t.id;
  if p_reativar_ia and t.conversa_id is not null then
    update public.conversas set ia_ativa = true, ia_pausada_em = null, ia_pausada_por = null where id = t.conversa_id;
    if t.lead_id is not null then update public.leads set ia_ativa = true, ia_pausada_em = null, ia_pausada_por = null where id = t.lead_id; end if;
  end if;
end $$;

-- opt-out / opt-in do contato: registra a evidência e cancela tarefas comerciais e lembretes futuros
create or replace function public.registrar_optout(p_clinica uuid, p_telefone text, p_tipo text default 'optout', p_origem text default 'mensagem', p_evidencia text default null)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare v_id uuid; v_tel text := public.so_digitos(p_telefone);
begin
  if not public.agente_pode(p_clinica) then raise exception 'Sem acesso a esta clínica' using errcode = '42501'; end if;
  if p_tipo not in ('optin', 'optout') or p_origem not in ('mensagem', 'equipe', 'sistema') then raise exception 'Tipo ou origem inválidos'; end if;
  if length(v_tel) < 10 then raise exception 'Telefone inválido'; end if;
  insert into public.consentimentos (clinica_id, telefone, lead_id, paciente_id, tipo, origem, evidencia)
  values (p_clinica, v_tel,
          (select l.id from public.leads l where l.clinica_id = p_clinica and public.so_digitos(l.telefone) = v_tel and l.excluido_em is null order by l.criado_em desc limit 1),
          (select p.id from public.pacientes p where p.clinica_id = p_clinica and public.so_digitos(p.whatsapp) = v_tel and p.excluido_em is null order by p.criado_em desc limit 1),
          p_tipo, p_origem, left(p_evidencia, 500))
  returning id into v_id;
  if p_tipo = 'optout' then
    update public.tarefas_automacao t set status = 'cancelada', motivo_cancelamento = 'contato pediu para parar'
      from public.conversas c
     where c.id = t.conversa_id and c.clinica_id = p_clinica and public.so_digitos(c.telefone) = v_tel
       and t.status = 'pendente' and t.tipo in ('followup', 'lembrete');
    update public.envios_pendentes e set status_envio = 'cancelado', erro = 'contato pediu para parar'
      from public.conversas c
     where c.id = e.conversa_id and c.clinica_id = p_clinica and public.so_digitos(c.telefone) = v_tel
       and e.status_envio = 'pendente' and e.tipo in ('followup', 'lembrete');
  end if;
  return v_id;
end $$;

-- move o lead de etapa com regras: a IA só avança (nunca volta, nunca sai de etapa final) e só se a clínica permitir;
-- "perdido" pela IA exige motivo. A equipe pode mover livremente pela tela (RLS).
create or replace function public.mover_etapa_lead(p_lead uuid, p_destino text, p_motivo text default null, p_origem text default 'ia')
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare l record; o record; d record; a record;
begin
  select * into l from public.leads where id = p_lead and excluido_em is null for update;
  if not found then raise exception 'Lead não encontrado'; end if;
  if not public.agente_pode(l.clinica_id) then raise exception 'Sem acesso a esta clínica' using errcode = '42501'; end if;
  select * into a from public.agente_ia where clinica_id = l.clinica_id and excluido_em is null;
  select * into o from public.etapas_funil where id = l.etapa_id;
  select * into d from public.etapas_funil where clinica_id = l.clinica_id and funil_id = coalesce(l.funil_id, o.funil_id)
     and chave = p_destino and excluido_em is null;
  if d.id is null then return jsonb_build_object('movido', false, 'motivo', 'etapa_inexistente'); end if;
  if o.id = d.id then return jsonb_build_object('movido', false, 'motivo', 'ja_esta_na_etapa'); end if;
  if p_origem in ('ia', 'sistema') then
    if not coalesce(a.crm_mover_automatico, false) then return jsonb_build_object('movido', false, 'motivo', 'movimento_automatico_desligado'); end if;
    if o.tipo_final in ('ganho', 'perdido') then return jsonb_build_object('movido', false, 'motivo', 'etapa_final'); end if;
    if d.tipo_final = 'perdido' and coalesce(trim(p_motivo), '') = '' then return jsonb_build_object('movido', false, 'motivo', 'perdido_sem_motivo'); end if;
    if d.tipo_final is distinct from 'perdido' and d.ordem <= coalesce(o.ordem, 0) then return jsonb_build_object('movido', false, 'motivo', 'nao_volta_etapa'); end if;
  end if;
  update public.leads set etapa_id = d.id, ultima_interacao_em = now(),
         motivo_perda_detalhe = case when d.tipo_final = 'perdido' then left(p_motivo, 300) else motivo_perda_detalhe end
   where id = l.id;
  insert into public.auditoria (clinica_id, tabela, registro_id, acao, usuario_id, dados_antes, dados_depois, colunas_alteradas)
  values (l.clinica_id, 'leads', l.id, 'movimento_etapa', auth.uid(), jsonb_build_object('etapa', o.chave),
          jsonb_build_object('etapa', d.chave, 'origem', p_origem, 'motivo', left(p_motivo, 300)), array['etapa_id']);
  return jsonb_build_object('movido', true, 'de', o.chave, 'para', d.chave);
end $$;

-- horários realmente livres: jornada do profissional (ou da clínica), intervalo, bloqueios, consultas,
-- feriados, antecedência, horizonte e intervalo entre consultas; blocos de 30 min no fuso da clínica
create or replace function public.horarios_disponiveis(p_clinica uuid, p_procedimento uuid, p_de date default null, p_dias integer default 7, p_profissional uuid default null, p_limite integer default 30)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  a record; pr record; v_tz text; v_dur int; v_buf int; v_ini date; v_fim date; v_minimo timestamptz; v_dia date; v_dow int;
  f record; j record; v_t timestamptz; v_tf timestamptz; v_hora_ini time; v_hora_fim time; v_out jsonb := '[]'::jsonb; v_n int := 0;
  v_feriados int[]; v_mes date;
begin
  if not public.agente_pode(p_clinica, 'agenda') and not public.agente_pode(p_clinica) then raise exception 'Sem acesso a esta clínica' using errcode = '42501'; end if;
  select * into a from public.agente_ia where clinica_id = p_clinica and excluido_em is null;
  select * into pr from public.procedimentos where id = p_procedimento and clinica_id = p_clinica and excluido_em is null and ativo;
  if pr.id is null then return jsonb_build_object('erro', 'procedimento_inexistente', 'horarios', '[]'::jsonb); end if;
  select coalesce(fuso_horario, 'America/Sao_Paulo') into v_tz from public.clinicas where id = p_clinica;
  v_dur := greatest(30, ceil(coalesce(pr.duracao_padrao_minutos, 60) / 30.0)::int * 30);
  v_buf := coalesce(a.intervalo_entre_consultas_min, 0);
  v_minimo := now() + make_interval(hours => coalesce(a.antecedencia_min_horas, 2));
  v_ini := greatest(coalesce(p_de, (now() at time zone v_tz)::date), (now() at time zone v_tz)::date);
  v_fim := least(v_ini + least(greatest(p_dias, 1), 31) - 1, (now() at time zone v_tz)::date + coalesce(a.horizonte_dias, 30));
  v_dia := v_ini;
  while v_dia <= v_fim and v_n < least(greatest(p_limite, 1), 100) loop
    v_dow := extract(dow from v_dia)::int;
    -- feriados do mês (nacionais + da clínica), menos pontos facultativos
    if v_mes is distinct from date_trunc('month', v_dia)::date then
      v_mes := date_trunc('month', v_dia)::date;
      select coalesce(array_agg((x ->> 'dia')::int), '{}') into v_feriados
        from jsonb_array_elements(public.feriados_do_mes(p_clinica, v_mes)) x where x ->> 'tipo' <> 'ponto_facultativo';
    end if;
    if not (extract(day from v_dia)::int = any (v_feriados)) then
      for f in
        select pf.id, pf.nome from public.profissionais pf
         where pf.clinica_id = p_clinica and pf.ativo and pf.excluido_em is null
           and (p_profissional is null or pf.id = p_profissional)
           and (not exists (select 1 from public.profissionais_procedimentos x where x.procedimento_id = pr.id and x.excluido_em is null)
                or exists (select 1 from public.profissionais_procedimentos x where x.procedimento_id = pr.id and x.profissional_id = pf.id and x.excluido_em is null))
         order by pf.ordem, pf.nome
      loop
        -- jornada do dia: a do profissional; se ele não tem jornada cadastrada, a da clínica
        if exists (select 1 from public.horarios_profissional h where h.profissional_id = f.id and h.excluido_em is null) then
          select h.hora_inicio as ini, h.hora_fim as fim, h.intervalo_inicio as ii, h.intervalo_fim as iff into j
            from public.horarios_profissional h where h.profissional_id = f.id and h.dia_semana = v_dow and h.excluido_em is null limit 1;
        else
          select h.hora_inicio as ini, h.hora_fim as fim, h.intervalo_inicio as ii, h.intervalo_fim as iff into j
            from public.horarios_funcionamento h where h.clinica_id = p_clinica and h.dia_semana = v_dow and h.aberto and h.excluido_em is null limit 1;
        end if;
        continue when j.ini is null or j.fim is null;
        v_hora_ini := j.ini; v_hora_fim := j.fim;
        v_t := (v_dia + v_hora_ini) at time zone v_tz;
        -- primeiro bloco cheio de 30 min
        v_t := date_trunc('hour', v_t) + make_interval(mins => ceil(extract(minute from v_t) / 30.0)::int * 30);
        while v_t + make_interval(mins => v_dur) <= (v_dia + v_hora_fim) at time zone v_tz and v_n < least(greatest(p_limite, 1), 100) loop
          v_tf := v_t + make_interval(mins => v_dur);
          if v_t >= v_minimo
             and not (j.ii is not null and j.iff is not null and v_t < (v_dia + j.iff) at time zone v_tz and v_tf > (v_dia + j.ii) at time zone v_tz)
             and not exists (select 1 from public.agendamentos g left join public.status_agendamento s on s.id = g.status_agendamento_id
                              where g.profissional_id = f.id and g.excluido_em is null and coalesce(s.chave, '') <> 'cancelado'
                                and g.inicio < v_tf + make_interval(mins => v_buf) and g.fim + make_interval(mins => v_buf) > v_t)
             and not exists (select 1 from public.bloqueios_horario b
                              where b.clinica_id = p_clinica and b.excluido_em is null and (b.profissional_id is null or b.profissional_id = f.id)
                                and ((b.dia_inteiro and (b.inicio at time zone v_tz)::date <= v_dia and (b.fim at time zone v_tz)::date >= v_dia)
                                     or (b.inicio < v_tf and b.fim > v_t)))
          then
            v_out := v_out || jsonb_build_object('profissional_id', f.id, 'profissional', f.nome, 'inicio', v_t, 'fim', v_tf,
                                                 'local', to_char(v_t at time zone v_tz, 'YYYY-MM-DD"T"HH24:MI'));
            v_n := v_n + 1;
          end if;
          v_t := v_t + interval '30 minutes';
        end loop;
      end loop;
    end if;
    v_dia := v_dia + 1;
  end loop;
  return jsonb_build_object('procedimento', pr.nome, 'duracao_min', v_dur, 'fuso_horario', v_tz, 'horarios', v_out);
end $$;

-- reserva com conferência na hora (trava por profissional): só confirma se o horário ainda estiver livre.
-- Pela IA respeita: pode criar agendamento? procedimento agendável? política de sinal?
create or replace function public.reservar_agendamento(p_clinica uuid, p_procedimento uuid, p_profissional uuid, p_inicio timestamptz,
  p_paciente uuid default null, p_lead uuid default null, p_conversa uuid default null, p_origem text default 'ia')
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare a record; pr record; v_livres jsonb; v_ok boolean; v_dur int; v_id uuid; v_st uuid; v_tz text; v_lead uuid := p_lead;
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
  if p_origem = 'ia' then
    if a.id is null or not a.ia_consulta_horarios then return jsonb_build_object('status', 'recusado', 'motivo', 'ia_nao_agenda'); end if;
    if not pr.ia_agendavel then return jsonb_build_object('status', 'recusado', 'motivo', 'procedimento_nao_agendavel_pela_ia'); end if;
    -- sem permissão de criar, aprovação humana ou sinal obrigatório (ainda sem provedor de pagamento): vai para a equipe
    if not a.ia_cria_agendamento or a.politica_sinal in ('aprovacao_humana', 'obrigatorio_confirmar', 'obrigatorio_reservar') then
      if p_conversa is not null then
        perform public.transferir_para_humano(p_conversa,
          'Pedido de agendamento: ' || pr.nome || ' em ' || to_char(p_inicio at time zone coalesce((select fuso_horario from public.clinicas where id = p_clinica), 'America/Sao_Paulo'), 'DD/MM HH24:MI'),
          'Agendamento', 'sistema');
      end if;
      return jsonb_build_object('status', 'aguardando_equipe', 'motivo', case when not a.ia_cria_agendamento then 'ia_sem_permissao_de_criar' else 'politica_' || a.politica_sinal end);
    end if;
  end if;
  -- trava o profissional até o fim da transação: duas conversas não reservam o mesmo horário
  perform pg_advisory_xact_lock(hashtextextended('agenda:' || p_profissional::text, 0));
  select coalesce(fuso_horario, 'America/Sao_Paulo') into v_tz from public.clinicas where id = p_clinica;
  v_livres := public.horarios_disponiveis(p_clinica, p_procedimento, (p_inicio at time zone v_tz)::date, 1, p_profissional, 100);
  select exists (select 1 from jsonb_array_elements(v_livres -> 'horarios') x where (x ->> 'inicio')::timestamptz = p_inicio) into v_ok;
  if not v_ok then return jsonb_build_object('status', 'indisponivel', 'motivo', 'horario_ocupado_ou_fora_da_agenda'); end if;
  v_dur := (v_livres ->> 'duracao_min')::int;
  select id into v_st from public.status_agendamento where clinica_id = p_clinica and chave = 'agendado' and excluido_em is null limit 1;
  insert into public.agendamentos (clinica_id, paciente_id, profissional_id, procedimento_id, status_agendamento_id, inicio, fim, origem, lead_id, conversa_id,
                                   enviar_confirmacao_whatsapp, observacoes)
  values (p_clinica, p_paciente, p_profissional, p_procedimento, v_st, p_inicio, p_inicio + make_interval(mins => v_dur),
          case when p_origem = 'ia' then 'renata_ia'::origem_registro else 'equipe'::origem_registro end, v_lead, p_conversa, true,
          case when p_paciente is null then (select coalesce(nome, telefone) from public.leads where id = v_lead) end)
  returning id into v_id;
  if v_lead is not null then
    update public.leads set agendamento_id = v_id, agendado_para = p_inicio where id = v_lead;
    if coalesce(a.crm_mover_automatico, false) and (a.crm_mapa ->> 'agendado') is not null then
      perform public.mover_etapa_lead(v_lead, a.crm_mapa ->> 'agendado', 'Agendamento confirmado', 'sistema');
    end if;
  end if;
  if p_conversa is not null then
    update public.tarefas_automacao set status = 'cancelada', motivo_cancelamento = 'lead agendou'
     where conversa_id = p_conversa and tipo = 'followup' and status = 'pendente' and coalesce(a.followup_parar_se_agendado, true);
  end if;
  return jsonb_build_object('status', 'confirmado', 'agendamento_id', v_id, 'inicio', p_inicio, 'fim', p_inicio + make_interval(mins => v_dur));
end $$;

revoke execute on function public.transferir_para_humano(uuid, text, text, text), public.resolver_transferencia(uuid, boolean),
  public.registrar_optout(uuid, text, text, text, text), public.mover_etapa_lead(uuid, text, text, text),
  public.horarios_disponiveis(uuid, uuid, date, integer, uuid, integer),
  public.reservar_agendamento(uuid, uuid, uuid, timestamptz, uuid, uuid, uuid, text) from public, anon;
grant execute on function public.transferir_para_humano(uuid, text, text, text), public.resolver_transferencia(uuid, boolean),
  public.registrar_optout(uuid, text, text, text, text), public.mover_etapa_lead(uuid, text, text, text),
  public.horarios_disponiveis(uuid, uuid, date, integer, uuid, integer),
  public.reservar_agendamento(uuid, uuid, uuid, timestamptz, uuid, uuid, uuid, text) to authenticated, service_role;
