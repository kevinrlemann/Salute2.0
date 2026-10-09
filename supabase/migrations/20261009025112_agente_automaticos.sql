-- Agente de IA: comportamento automático (fase 8). Lembretes por versão do agendamento, follow-up que para
-- quando o lead responde, opt-out por palavra-chave (regra fixa, sem depender da IA) e fila de envio.
-- O n8n só despacha; antes de enviar chama validar_tarefa, que confere tudo de novo.

-- texto normalizado para comparar palavras (minúsculas, sem acento e sem pontuação)
create or replace function public.texto_normalizado(p text)
returns text
language sql
immutable
set search_path = public, extensions
as $$ select btrim(regexp_replace(lower(extensions.unaccent(coalesce(p, ''))), '[^a-z0-9 ]+', ' ', 'g')) $$;

-- versão do agendamento sobe quando muda horário ou profissional (lembretes antigos deixam de valer)
create or replace function public.agendamento_versao()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.inicio is distinct from old.inicio or new.fim is distinct from old.fim or new.profissional_id is distinct from old.profissional_id then
    new.versao := coalesce(old.versao, 1) + 1;
  end if;
  return new;
end $$;

-- lembretes do agendamento: cancela os da versão anterior e cria os da versão atual, um por antecedência ligada
create or replace function public.agendamento_lembretes()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare a record; v_cancelado boolean; v_off int;
begin
  select coalesce(s.chave = 'cancelado', false) into v_cancelado from public.status_agendamento s where s.id = new.status_agendamento_id;
  update public.tarefas_automacao set status = 'cancelada',
         motivo_cancelamento = case when new.excluido_em is not null or coalesce(v_cancelado, false) then 'agendamento cancelado' else 'agendamento remarcado' end
   where agendamento_id = new.id and tipo = 'lembrete' and status = 'pendente'
     and (versao_agendamento is distinct from new.versao or new.excluido_em is not null or coalesce(v_cancelado, false));
  if new.excluido_em is not null or coalesce(v_cancelado, false) or new.inicio <= now() then return null; end if;
  select * into a from public.agente_ia where clinica_id = new.clinica_id and excluido_em is null;
  if a.id is null or not a.lembretes_ativos then return null; end if;
  foreach v_off in array a.lembretes_offsets_min loop
    if new.inicio - make_interval(mins => v_off) > now() then
      insert into public.tarefas_automacao (clinica_id, tipo, chave_idempotencia, payload, conversa_id, agendamento_id, versao_agendamento, executar_em)
      values (new.clinica_id, 'lembrete', 'lembrete:' || new.id || ':' || new.versao || ':' || v_off,
              jsonb_build_object('antecedencia_min', v_off), new.conversa_id, new.id, new.versao, new.inicio - make_interval(mins => v_off))
      on conflict (chave_idempotencia) do nothing;
    end if;
  end loop;
  return null;
end $$;

do $$ begin
  create trigger tg_agendamentos_versao before update on public.agendamentos for each row execute function public.agendamento_versao();
  create trigger tg_agendamentos_lembretes after insert or update of inicio, fim, profissional_id, status_agendamento_id, excluido_em
    on public.agendamentos for each row execute function public.agendamento_lembretes();
exception when duplicate_object then null; end $$;

-- mensagens: recebida -> janela de 24 h, para o follow-up e confere opt-out;
-- enviada pendente -> entra na fila de envio e, se for lead sem resposta, começa o follow-up (uma vez por silêncio)
create or replace function public.mensagem_automacao()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare cv record; a record; l record; v_txt text; v_i int; v_n int;
begin
  select * into cv from public.conversas where id = new.conversa_id;
  if not found then return null; end if;
  select * into a from public.agente_ia where clinica_id = new.clinica_id and excluido_em is null;

  if new.direcao = 'recebida' then
    update public.conversas set ultima_entrada_em = greatest(coalesce(ultima_entrada_em, new.criado_em), new.criado_em) where id = cv.id;
    if a.id is not null and a.followup_parar_ao_responder then
      update public.tarefas_automacao set status = 'cancelada', motivo_cancelamento = 'lead respondeu'
       where conversa_id = cv.id and tipo = 'followup' and status = 'pendente';
    end if;
    -- opt-out por palavra-chave: a mensagem é só a palavra (ou começa com ela e é curta)
    v_txt := public.texto_normalizado(new.texto);
    if a.id is not null and v_txt <> '' and exists (
         select 1 from unnest(a.palavras_optout) w
          where public.texto_normalizado(w) <> ''
            and (v_txt = public.texto_normalizado(w) or (length(v_txt) <= 40 and v_txt like public.texto_normalizado(w) || ' %'))) then
      perform public.registrar_optout(new.clinica_id, cv.telefone, 'optout', 'mensagem', left(new.texto, 200));
    end if;
    return null;
  end if;

  -- enviada: só as que ainda não foram entregues ao WhatsApp entram na fila
  if new.direcao = 'enviada' and new.status_entrega = 'pendente' and new.excluido_em is null then
    insert into public.envios_pendentes (clinica_id, conversa_id, mensagem_id, tipo, payload, chave_idempotencia)
    values (new.clinica_id, cv.id, new.id, case when new.enviada_por_ia then 'resposta' else 'equipe' end,
            jsonb_build_object('tipo_mensagem', new.tipo, 'telefone', cv.telefone), 'msg:' || new.id)
    on conflict (chave_idempotencia) do nothing;
  end if;

  if new.direcao = 'enviada' and a.id is not null and a.followup_ativo and cv.lead_id is not null and coalesce(a.followup_max, 0) > 0 then
    select * into l from public.leads where id = cv.lead_id and excluido_em is null;
    if l.id is not null and l.agendamento_id is null
       and not exists (select 1 from public.etapas_funil e where e.id = l.etapa_id and e.tipo_final in ('ganho', 'perdido'))
       and not exists (select 1 from public.tarefas_automacao t where t.conversa_id = cv.id and t.tipo = 'followup'
                         and t.criado_em > coalesce(cv.ultima_entrada_em, '-infinity'::timestamptz)) then
      v_n := least(a.followup_max, coalesce(array_length(a.followup_atrasos_min, 1), 0));
      for v_i in 1 .. v_n loop
        insert into public.tarefas_automacao (clinica_id, tipo, chave_idempotencia, payload, conversa_id, lead_id, executar_em)
        values (new.clinica_id, 'followup', 'followup:' || cv.id || ':' || new.id || ':' || v_i,
                jsonb_build_object('passo', v_i, 'total', v_n, 'mensagem', coalesce(a.followup_mensagens[v_i], a.followup_mensagens[array_length(a.followup_mensagens, 1)])),
                cv.id, l.id, now() + make_interval(mins => a.followup_atrasos_min[v_i]))
        on conflict (chave_idempotencia) do nothing;
      end loop;
    end if;
  end if;
  return null;
end $$;

do $$ begin
  create trigger tg_mensagens_automacao after insert on public.mensagens for each row execute function public.mensagem_automacao();
exception when duplicate_object then null; end $$;

-- confere, na hora de enviar, se a tarefa ainda vale (o banco é a fonte da verdade, não a memória do n8n)
create or replace function public.validar_tarefa(p_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare t record; a record; cv record; g record; v_tz text; v_local timestamp; v_hoje date; v_prox timestamptz; v_porta jsonb;
begin
  if coalesce(auth.role(), '') <> 'service_role' then raise exception 'Só o servidor processa a fila' using errcode = '42501'; end if;
  select * into t from public.tarefas_automacao where id = p_id;
  if not found then return jsonb_build_object('pode', false, 'motivo', 'tarefa_inexistente'); end if;
  if t.status not in ('pendente', 'processando') then return jsonb_build_object('pode', false, 'motivo', 'tarefa_' || t.status); end if;
  select * into a from public.agente_ia where clinica_id = t.clinica_id and excluido_em is null;
  if a.id is null or not a.ia_ativa then return jsonb_build_object('pode', false, 'motivo', 'ia_desligada'); end if;
  if a.automacoes_pausadas then return jsonb_build_object('pode', false, 'motivo', 'automacoes_pausadas', 'reagendar', true); end if;
  select coalesce(fuso_horario, 'America/Sao_Paulo') into v_tz from public.clinicas where id = t.clinica_id;

  if t.tipo = 'lembrete' then
    select g2.*, s.chave as st into g from public.agendamentos g2 left join public.status_agendamento s on s.id = g2.status_agendamento_id where g2.id = t.agendamento_id;
    if g.id is null or g.excluido_em is not null or g.st = 'cancelado' then return jsonb_build_object('pode', false, 'motivo', 'agendamento_cancelado'); end if;
    if g.versao is distinct from t.versao_agendamento then return jsonb_build_object('pode', false, 'motivo', 'agendamento_remarcado'); end if;
    if g.inicio <= now() then return jsonb_build_object('pode', false, 'motivo', 'consulta_ja_passou'); end if;
    if not a.lembretes_ativos or not ((t.payload ->> 'antecedencia_min')::int = any (a.lembretes_offsets_min)) then
      return jsonb_build_object('pode', false, 'motivo', 'lembrete_desligado');
    end if;
    if exists (select 1 from public.pacientes p where p.id = g.paciente_id and public.contato_optout(t.clinica_id, p.whatsapp)) then
      return jsonb_build_object('pode', false, 'motivo', 'optout');
    end if;
    return jsonb_build_object('pode', true, 'agendamento_id', g.id, 'inicio', g.inicio,
      'inicio_local', to_char(g.inicio at time zone v_tz, 'DD/MM "às" HH24:MI'),
      'pedir_confirmacao', a.lembrete_pedir_confirmacao, 'permitir_cancelar', a.lembrete_permitir_cancelar);
  end if;

  if t.tipo = 'followup' then
    if not a.followup_ativo then return jsonb_build_object('pode', false, 'motivo', 'followup_desligado'); end if;
    if t.executar_em < now() - interval '12 hours' then return jsonb_build_object('pode', false, 'motivo', 'tarefa_vencida'); end if;
    select * into cv from public.conversas where id = t.conversa_id;
    v_porta := public.agente_pode_responder(t.conversa_id);
    if not (v_porta ->> 'pode')::boolean then return v_porta; end if;
    if cv.ultima_entrada_em is not null and cv.ultima_entrada_em > t.criado_em then return jsonb_build_object('pode', false, 'motivo', 'lead_respondeu'); end if;
    if exists (select 1 from public.leads l where l.id = t.lead_id and l.agendamento_id is not null) and a.followup_parar_se_agendado then
      return jsonb_build_object('pode', false, 'motivo', 'lead_agendou');
    end if;
    -- só dentro da janela de mensagens da clínica; fora dela, devolve quando reagendar
    v_local := now() at time zone v_tz; v_hoje := v_local::date;
    if v_local::time < a.janela_inicio or v_local::time >= a.janela_fim then
      v_prox := ((case when v_local::time < a.janela_inicio then v_hoje else v_hoje + 1 end) + a.janela_inicio) at time zone v_tz;
      return jsonb_build_object('pode', false, 'motivo', 'fora_da_janela', 'reagendar_para', v_prox);
    end if;
    return jsonb_build_object('pode', true, 'mensagem', t.payload ->> 'mensagem', 'passo', t.payload -> 'passo',
      'janela_whatsapp_aberta', v_porta -> 'janela_whatsapp_aberta');
  end if;

  if t.conversa_id is not null then return public.agente_pode_responder(t.conversa_id); end if;
  return jsonb_build_object('pode', true);
end $$;

-- devolve a tarefa para a fila num horário futuro (ex.: fora da janela de mensagens), sem contar como erro
create or replace function public.reagendar_tarefa(p_id uuid, p_token uuid, p_quando timestamptz)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if coalesce(auth.role(), '') <> 'service_role' then raise exception 'Só o servidor processa a fila' using errcode = '42501'; end if;
  update public.tarefas_automacao
     set status = 'pendente', executar_em = greatest(p_quando, now() + interval '1 minute'), travada_ate = null, token_trava = null,
         tentativas = greatest(tentativas - 1, 0)
   where id = p_id and token_trava = p_token and status = 'processando';
  return found;
end $$;

revoke execute on function public.validar_tarefa(uuid), public.reagendar_tarefa(uuid, uuid, timestamptz),
  public.agendamento_lembretes(), public.mensagem_automacao() from public, anon, authenticated;
grant execute on function public.validar_tarefa(uuid), public.reagendar_tarefa(uuid, uuid, timestamptz) to service_role;
