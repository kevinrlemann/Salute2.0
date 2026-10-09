-- Agente de IA: funções da fila e da configuração (fase 3). O n8n chama com a chave service_role;
-- as que a equipe também usa conferem o módulo da clínica de quem chama.

-- quem chama pode agir nesta clínica? (service_role = n8n/servidor; usuário = precisa do módulo)
create or replace function public.agente_pode(p_clinica uuid, p_modulo text default 'mensagens')
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(auth.role(), '') = 'service_role' or p_clinica in (select public.clinicas_permitidas(p_modulo))
$$;

-- só os dígitos do telefone
create or replace function public.so_digitos(p text)
returns text
language sql
immutable
set search_path = public
as $$ select regexp_replace(coalesce(p, ''), '\D', '', 'g') $$;

-- o contato pediu para não receber mensagens? (vale o último evento)
create or replace function public.contato_optout(p_clinica uuid, p_telefone text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce((select c.tipo = 'optout' from public.consentimentos c
                    where c.clinica_id = p_clinica and c.telefone = public.so_digitos(p_telefone)
                      and c.tipo in ('optin', 'optout')
                    order by c.capturado_em desc limit 1), false)
$$;

-- configuração completa que o n8n lê a cada turno e antes de cada envio
create or replace function public.agente_ia_config(p_clinica uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare v jsonb;
begin
  if not public.agente_pode(p_clinica, 'perfil.cadastro') and not public.agente_pode(p_clinica, 'mensagens') then
    raise exception 'Sem acesso a esta clínica' using errcode = '42501';
  end if;
  select jsonb_build_object(
    'clinica_id', c.id,
    'clinica_ativa', c.ativo and c.excluido_em is null,
    'nome', c.nome_fantasia,
    'fuso_horario', coalesce(c.fuso_horario, 'America/Sao_Paulo'),
    'endereco', concat_ws(', ', nullif(c.logradouro, ''), nullif(c.numero, ''), nullif(c.bairro, ''), nullif(c.cidade, ''), nullif(c.uf, '')),
    'telefone', c.telefone,
    'link_mapa', c.link_google_maps,
    'agente', to_jsonb(a) - 'clinica_id' - 'criado_por' - 'excluido_em',
    'regras_texto', public.agente_ia_regras(p_clinica, 'whatsapp'),
    'horario_clinica', (select coalesce(jsonb_agg(jsonb_build_object('dia_semana', h.dia_semana, 'aberto', h.aberto, 'inicio', h.hora_inicio, 'fim', h.hora_fim,
                          'intervalo_inicio', h.intervalo_inicio, 'intervalo_fim', h.intervalo_fim) order by h.dia_semana), '[]'::jsonb)
                        from public.horarios_funcionamento h where h.clinica_id = p_clinica and h.excluido_em is null),
    'horario_ia', (select coalesce(jsonb_agg(jsonb_build_object('dia_semana', r.dia_semana, 'inicio', r.hora_inicio, 'fim', r.hora_fim,
                          'ativo', r.ativo, 'mensagem_fora_horario', r.mensagem_fora_horario) order by r.dia_semana), '[]'::jsonb)
                   from public.renata_horarios r where r.clinica_id = p_clinica and r.excluido_em is null),
    'servicos', (select coalesce(jsonb_agg(jsonb_build_object('id', p.id, 'nome', p.nome, 'area', p.area, 'duracao_min', p.duracao_padrao_minutos,
                          'preco', case when p.ia_preco_publico then p.valor end, 'preco_publico', p.ia_preco_publico,
                          'agendavel', p.ia_agendavel, 'descricao', p.ia_descricao,
                          'profissionais', (select coalesce(jsonb_agg(pp.profissional_id), '[]'::jsonb) from public.profissionais_procedimentos pp
                                             where pp.procedimento_id = p.id and pp.excluido_em is null)) order by p.nome), '[]'::jsonb)
                 from public.procedimentos p where p.clinica_id = p_clinica and p.excluido_em is null and p.ativo),
    'profissionais', (select coalesce(jsonb_agg(jsonb_build_object('id', f.id, 'nome', f.nome, 'especialidade', f.especialidade) order by f.ordem, f.nome), '[]'::jsonb)
                      from public.profissionais f where f.clinica_id = p_clinica and f.excluido_em is null and f.ativo),
    'conhecimento', (select coalesce(jsonb_agg(jsonb_build_object('titulo', k.titulo, 'categoria', k.categoria, 'conteudo', k.conteudo) order by k.categoria, k.titulo), '[]'::jsonb)
                     from public.renata_base_conhecimento k where k.clinica_id = p_clinica and k.excluido_em is null and k.ativo),
    'etapas', (select coalesce(jsonb_agg(jsonb_build_object('chave', e.chave, 'nome', e.nome, 'ordem', e.ordem, 'tipo_final', e.tipo_final) order by e.ordem), '[]'::jsonb)
               from public.etapas_funil e join public.funis fu on fu.id = e.funil_id and fu.padrao and fu.excluido_em is null
               where e.clinica_id = p_clinica and e.excluido_em is null))
    into v
    from public.clinicas c
    left join public.agente_ia a on a.clinica_id = c.id and a.excluido_em is null
   where c.id = p_clinica;
  return v;
end $$;

-- pode automatizar agora nesta conversa? (portão global + conversa + transferência + opt-out)
create or replace function public.agente_pode_responder(p_conversa uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare cv record; a record; cl record;
begin
  select * into cv from public.conversas where id = p_conversa and excluido_em is null;
  if not found then return jsonb_build_object('pode', false, 'motivo', 'conversa_inexistente'); end if;
  if not public.agente_pode(cv.clinica_id) then raise exception 'Sem acesso a esta clínica' using errcode = '42501'; end if;
  select * into cl from public.clinicas where id = cv.clinica_id;
  select * into a from public.agente_ia where clinica_id = cv.clinica_id and excluido_em is null;
  if not coalesce(cl.ativo, false) or cl.excluido_em is not null then return jsonb_build_object('pode', false, 'motivo', 'clinica_inativa'); end if;
  if a.id is null or not a.ia_ativa then return jsonb_build_object('pode', false, 'motivo', 'ia_desligada'); end if;
  if a.automacoes_pausadas then return jsonb_build_object('pode', false, 'motivo', 'automacoes_pausadas'); end if;
  if not coalesce(cv.ia_ativa, true) then return jsonb_build_object('pode', false, 'motivo', 'ia_pausada_na_conversa'); end if;
  if exists (select 1 from public.transferencias_humanas t where t.conversa_id = cv.id and t.status in ('aberta', 'em_atendimento')) then
    return jsonb_build_object('pode', false, 'motivo', 'com_a_equipe');
  end if;
  if public.contato_optout(cv.clinica_id, cv.telefone) then return jsonb_build_object('pode', false, 'motivo', 'optout'); end if;
  return jsonb_build_object('pode', true, 'modo_teste', a.modo_teste, 'config_versao', a.config_versao,
    'janela_whatsapp_aberta', cv.ultima_entrada_em is not null and cv.ultima_entrada_em > now() - interval '24 hours');
end $$;

-- recebe um evento do webhook: salva antes de processar, não duplica e enfileira
create or replace function public.registrar_webhook(p_provedor text, p_evento_id text, p_phone_number_id text, p_payload jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare v_clinica uuid; v_id uuid;
begin
  if coalesce(auth.role(), '') <> 'service_role' then raise exception 'Só o servidor registra eventos' using errcode = '42501'; end if;
  if coalesce(p_evento_id, '') = '' then raise exception 'Evento sem identificador'; end if;
  select i.clinica_id into v_clinica from public.instancias_whatsapp i
   where i.phone_number_id = p_phone_number_id and i.excluido_em is null limit 1;
  insert into public.entrada_webhook (clinica_id, provedor, evento_id, phone_number_id, payload_redigido, status)
  values (v_clinica, coalesce(p_provedor, 'whatsapp_cloud'), p_evento_id, p_phone_number_id, coalesce(p_payload, '{}'::jsonb),
          case when v_clinica is null then 'quarentena' else 'enfileirado' end)
  on conflict (provedor, evento_id) do nothing
  returning id into v_id;
  if v_id is null then return jsonb_build_object('duplicado', true); end if;
  if v_clinica is null then
    insert into public.erros_automacao (origem, codigo, mensagem_sanitizada)
    values ('registrar_webhook', 'numero_desconhecido', 'phone_number_id sem clínica cadastrada');
    return jsonb_build_object('duplicado', false, 'quarentena', true, 'entrada_id', v_id);
  end if;
  insert into public.tarefas_automacao (clinica_id, tipo, chave_idempotencia, payload)
  values (v_clinica, 'processar_entrada', 'entrada:' || v_id, jsonb_build_object('entrada_id', v_id))
  on conflict (chave_idempotencia) do nothing;
  return jsonb_build_object('duplicado', false, 'entrada_id', v_id, 'clinica_id', v_clinica);
end $$;

-- pega um lote de tarefas vencidas sem que dois trabalhadores peguem a mesma (FOR UPDATE SKIP LOCKED);
-- tarefas travadas por um trabalhador que caiu voltam sozinhas quando a trava vence
create or replace function public.reivindicar_tarefas(p_tipos text[], p_lote integer default 10, p_trabalhador text default 'n8n', p_segundos integer default 120)
returns setof public.tarefas_automacao
language plpgsql
security definer
set search_path = public
as $$
declare v_token uuid := gen_random_uuid();
begin
  if coalesce(auth.role(), '') <> 'service_role' then raise exception 'Só o servidor processa a fila' using errcode = '42501'; end if;
  return query
  with alvo as (
    select t.id from public.tarefas_automacao t
     where t.tipo = any (p_tipos)
       and ((t.status = 'pendente' and t.executar_em <= now()) or (t.status = 'processando' and t.travada_ate < now()))
       -- uma tarefa por conversa por vez, para respeitar a ordem
       and not exists (select 1 from public.tarefas_automacao o where o.conversa_id = t.conversa_id and o.id <> t.id
                         and o.status = 'processando' and o.travada_ate >= now())
     order by t.executar_em
     limit least(greatest(p_lote, 1), 100)
     for update skip locked)
  update public.tarefas_automacao t
     set status = 'processando', tentativas = t.tentativas + 1, travada_ate = now() + make_interval(secs => least(greatest(p_segundos, 10), 900)),
         token_trava = v_token, trabalhador = left(p_trabalhador, 80)
    from alvo where t.id = alvo.id
  returning t.*;
end $$;

-- encerra a tarefa: concluída, cancelada ou erro (com nova tentativa espaçada; depois de esgotar vira "morta" e gera alerta)
create or replace function public.concluir_tarefa(p_id uuid, p_token uuid, p_resultado text, p_erro text default null)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare t record; v_status text;
begin
  if coalesce(auth.role(), '') <> 'service_role' then raise exception 'Só o servidor processa a fila' using errcode = '42501'; end if;
  select * into t from public.tarefas_automacao where id = p_id for update;
  if not found or t.token_trava is distinct from p_token or t.status <> 'processando' then return 'trava_perdida'; end if;
  if p_resultado in ('concluida', 'cancelada') then
    update public.tarefas_automacao set status = p_resultado, concluida_em = now(), travada_ate = null, token_trava = null,
           motivo_cancelamento = case when p_resultado = 'cancelada' then left(p_erro, 300) end
     where id = p_id;
    return p_resultado;
  end if;
  v_status := case when t.tentativas >= t.max_tentativas then 'morta' else 'pendente' end;
  update public.tarefas_automacao
     set status = v_status, ultimo_erro = left(p_erro, 500), travada_ate = null, token_trava = null,
         executar_em = case when v_status = 'pendente' then now() + make_interval(secs => least(30 * power(2, t.tentativas)::int, 3600)) else executar_em end
   where id = p_id;
  if v_status = 'morta' then
    insert into public.erros_automacao (clinica_id, tarefa_id, origem, codigo, mensagem_sanitizada, tentativas)
    values (t.clinica_id, t.id, 'tarefa:' || t.tipo, 'tentativas_esgotadas', left(p_erro, 500), t.tentativas);
  end if;
  return v_status;
end $$;

-- pega mensagens para enviar (mesma lógica de trava, por conversa em ordem)
create or replace function public.reivindicar_envios(p_lote integer default 10)
returns setof public.envios_pendentes
language plpgsql
security definer
set search_path = public
as $$
begin
  if coalesce(auth.role(), '') <> 'service_role' then raise exception 'Só o servidor envia mensagens' using errcode = '42501'; end if;
  return query
  with alvo as (
    select e.id from public.envios_pendentes e
     where ((e.status_envio = 'pendente' and e.proxima_tentativa_em <= now())
            or (e.status_envio = 'enviando' and e.atualizado_em < now() - interval '5 minutes'))
       and not exists (select 1 from public.envios_pendentes o where o.conversa_id = e.conversa_id and o.status_envio = 'enviando'
                         and o.id <> e.id and o.atualizado_em >= now() - interval '5 minutes')
     order by e.criado_em
     limit least(greatest(p_lote, 1), 100)
     for update skip locked)
  update public.envios_pendentes e set status_envio = 'enviando', tentativas = e.tentativas + 1
    from alvo where e.id = alvo.id
  returning e.*;
end $$;

-- resultado do envio: grava o id do WhatsApp, o status da mensagem e agenda nova tentativa se falhou
create or replace function public.concluir_envio(p_id uuid, p_ok boolean, p_provedor_mensagem_id text default null, p_erro text default null)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare e record; v text;
begin
  if coalesce(auth.role(), '') <> 'service_role' then raise exception 'Só o servidor envia mensagens' using errcode = '42501'; end if;
  select * into e from public.envios_pendentes where id = p_id for update;
  if not found or e.status_envio <> 'enviando' then return 'ignorado'; end if;
  if p_ok then
    update public.envios_pendentes set status_envio = 'enviado', provedor_mensagem_id = p_provedor_mensagem_id, enviado_em = now(), erro = null where id = p_id;
    if e.mensagem_id is not null then
      update public.mensagens set status_entrega = 'enviada', whatsapp_mensagem_id = coalesce(p_provedor_mensagem_id, whatsapp_mensagem_id), enviada_em = coalesce(enviada_em, now())
       where id = e.mensagem_id;
    end if;
    return 'enviado';
  end if;
  v := case when e.tentativas >= 5 then 'falhou' else 'pendente' end;
  update public.envios_pendentes set status_envio = v, erro = left(p_erro, 500),
         proxima_tentativa_em = now() + make_interval(secs => least(30 * power(2, e.tentativas)::int, 3600))
   where id = p_id;
  if v = 'falhou' then
    if e.mensagem_id is not null then update public.mensagens set status_entrega = 'falhou' where id = e.mensagem_id; end if;
    insert into public.erros_automacao (clinica_id, envio_id, origem, codigo, mensagem_sanitizada, tentativas)
    values (e.clinica_id, e.id, 'envio', 'tentativas_esgotadas', left(p_erro, 500), e.tentativas);
  end if;
  return v;
end $$;

-- execução: n8n (service_role) e, nas de leitura, a equipe da clínica
revoke execute on function public.agente_pode(uuid, text), public.contato_optout(uuid, text), public.agente_ia_config(uuid),
  public.agente_pode_responder(uuid), public.registrar_webhook(text, text, text, jsonb),
  public.reivindicar_tarefas(text[], integer, text, integer), public.concluir_tarefa(uuid, uuid, text, text),
  public.reivindicar_envios(integer), public.concluir_envio(uuid, boolean, text, text) from public, anon;
grant execute on function public.agente_ia_config(uuid), public.agente_pode_responder(uuid), public.contato_optout(uuid, text),
  public.agente_pode(uuid, text) to authenticated;
grant execute on function public.agente_pode(uuid, text), public.contato_optout(uuid, text), public.agente_ia_config(uuid),
  public.agente_pode_responder(uuid), public.registrar_webhook(text, text, text, jsonb),
  public.reivindicar_tarefas(text[], integer, text, integer), public.concluir_tarefa(uuid, uuid, text, text),
  public.reivindicar_envios(integer), public.concluir_envio(uuid, boolean, text, text) to service_role;
