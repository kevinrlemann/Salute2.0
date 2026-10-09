-- Testes de aceite do backend do Agente de IA (38 casos). Rodar inteiro no SQL do Supabase.
-- Usa a clínica, o dono, um procedimento e o funil da base de demonstração (ajuste os ids se forem outros).
-- Resultado de 2026-10-09: 38 de 38 aprovados (depois de contato_optout_interno; também com as tabelas ia_* da outra implementação ativas).
-- Ao final o bloco levanta um erro proposital com os resultados: isso desfaz tudo o que o teste gravou.
do $$
declare
  v_cli uuid := '83050867-06e0-4263-9e30-60b905d52543';
  v_dono uuid := '36833e97-5e0b-4e20-b2de-f33abda30372';
  v_proc uuid := 'b2000001-0000-0000-0000-000000000001';
  v_funil uuid := 'a0090001-0000-0000-0000-000000000001';
  v_tel text := '+5511999990000';
  r jsonb; r2 jsonb; t record; n int; v_ag uuid; v_conv uuid; v_lead uuid; v_prof uuid; v_ini timestamptz; v_id uuid; v_txt text;
begin
  create temp table resultado (n serial, teste text, ok boolean, detalhe text);
  grant all on resultado to public; grant usage on sequence resultado_n_seq to public;
  -- ===== como o servidor (n8n) =====
  perform set_config('request.jwt.claims', '{"role":"service_role"}', true);

  -- 1) webhook sem duplicar
  r := public.registrar_webhook('teste', 'evt-1', 'numero-sem-clinica', '{"x":1}');
  r2 := public.registrar_webhook('teste', 'evt-1', 'numero-sem-clinica', '{"x":1}');
  insert into resultado (teste, ok, detalhe) values ('webhook duplicado é ignorado', (r2 ->> 'duplicado')::boolean, r2::text);
  insert into resultado (teste, ok, detalhe) values ('número desconhecido vai para quarentena', (r ->> 'quarentena')::boolean, r::text);

  -- 2) fila: reivindicar, não pegar duas vezes, concluir com trava certa
  insert into public.tarefas_automacao (clinica_id, tipo, chave_idempotencia, payload) values (v_cli, 'alerta', 'teste:1', '{}');
  select * into t from public.reivindicar_tarefas(array['alerta'], 10, 'teste', 60) limit 1;
  select count(*) into n from public.reivindicar_tarefas(array['alerta'], 10, 'teste2', 60);
  insert into resultado (teste, ok, detalhe) values ('tarefa não é pega duas vezes', t.id is not null and n = 0, 'segunda leva: ' || n);
  insert into resultado (teste, ok, detalhe) values ('concluir com trava errada é recusado', public.concluir_tarefa(t.id, gen_random_uuid(), 'concluida') = 'trava_perdida', '');
  insert into resultado (teste, ok, detalhe) values ('concluir com trava certa', public.concluir_tarefa(t.id, t.token_trava, 'concluida') = 'concluida', '');
  -- erro repetido vira "morta" e gera alerta
  insert into public.tarefas_automacao (clinica_id, tipo, chave_idempotencia, payload, max_tentativas) values (v_cli, 'alerta', 'teste:2', '{}', 2);
  for i in 1..2 loop
    update public.tarefas_automacao set executar_em = now() - interval '1 second' where chave_idempotencia = 'teste:2';
    select * into t from public.reivindicar_tarefas(array['alerta'], 10, 'teste', 60) limit 1;
    v_txt := public.concluir_tarefa(t.id, t.token_trava, 'erro', 'falha simulada');
  end loop;
  insert into resultado (teste, ok, detalhe) values ('erro repetido vira morta e gera alerta',
    v_txt = 'morta' and exists (select 1 from public.erros_automacao where tarefa_id = t.id), v_txt);

  -- 3) horários livres e reserva sem duplicar
  r := public.horarios_disponiveis(v_cli, v_proc, null, 7, null, 30);
  n := jsonb_array_length(r -> 'horarios');
  insert into resultado (teste, ok, detalhe) values ('há horários livres reais', n > 0, n || ' horários; 1º ' || coalesce(r -> 'horarios' -> 0 ->> 'local', '-'));
  insert into resultado (teste, ok, detalhe) values ('horários em blocos de 30 min',
    not exists (select 1 from jsonb_array_elements(r -> 'horarios') x where extract(minute from (x ->> 'inicio')::timestamptz)::int not in (0, 30)), '');
  v_prof := (r -> 'horarios' -> 0 ->> 'profissional_id')::uuid; v_ini := (r -> 'horarios' -> 0 ->> 'inicio')::timestamptz;
  r := public.reservar_agendamento(v_cli, v_proc, v_prof, v_ini, null, null, null, 'ia');
  r2 := public.reservar_agendamento(v_cli, v_proc, v_prof, v_ini, null, null, null, 'ia');
  v_ag := (r ->> 'agendamento_id')::uuid;
  insert into resultado (teste, ok, detalhe) values ('reserva confirmada', r ->> 'status' = 'confirmado', r::text);
  insert into resultado (teste, ok, detalhe) values ('mesmo horário não é reservado de novo', r2 ->> 'status' = 'indisponivel', r2::text);
  select count(*) into n from public.tarefas_automacao where agendamento_id = v_ag and tipo = 'lembrete' and status = 'pendente';
  insert into resultado (teste, ok, detalhe) values ('lembretes criados para a consulta', n >= 1, n || ' lembretes (só os que ainda cabem antes da consulta)');
  -- remarcar: versão sobe, lembretes antigos cancelados, novos criados
  update public.agendamentos set inicio = inicio + interval '7 days', fim = fim + interval '7 days' where id = v_ag;
  insert into resultado (teste, ok, detalhe) values ('remarcar cancela lembretes antigos e cria novos',
    (select versao from public.agendamentos where id = v_ag) = 2
    and not exists (select 1 from public.tarefas_automacao where agendamento_id = v_ag and tipo = 'lembrete' and status = 'pendente' and versao_agendamento = 1)
    and exists (select 1 from public.tarefas_automacao where agendamento_id = v_ag and tipo = 'lembrete' and status = 'pendente' and versao_agendamento = 2), '');

  -- 4) conversa de lead: fila de envio, follow-up, resposta cancela, opt-out por palavra
  insert into public.leads (clinica_id, funil_id, etapa_id, nome, telefone) values (v_cli, v_funil, (select id from public.etapas_funil where funil_id = v_funil and chave = 'aguardando_atendente'), 'Lead Teste', v_tel) returning id into v_lead;
  insert into public.conversas (clinica_id, telefone, nome_contato, lead_id, ia_ativa) values (v_cli, v_tel, 'Lead Teste', v_lead, true) returning id into v_conv;
  insert into public.mensagens (clinica_id, conversa_id, direcao, tipo, texto, enviada_por_ia, status_entrega)
  values (v_cli, v_conv, 'enviada', 'texto', 'Mensagem da equipe com a IA desligada', false, 'pendente');
  insert into resultado (teste, ok, detalhe) values ('com a IA desligada não nasce follow-up',
    not exists (select 1 from public.tarefas_automacao where conversa_id = v_conv and tipo = 'followup'), '');
  update public.agente_ia set ia_ativa = true where clinica_id = v_cli; -- follow-up só nasce com a IA ligada
  insert into public.mensagens (clinica_id, conversa_id, direcao, tipo, texto, enviada_por_ia, status_entrega)
  values (v_cli, v_conv, 'enviada', 'texto', 'Olá! Posso ajudar?', true, 'pendente');
  insert into resultado (teste, ok, detalhe) values ('mensagem pendente entra na fila de envio', exists (select 1 from public.envios_pendentes where conversa_id = v_conv and status_envio = 'pendente'), '');
  select count(*) into n from public.tarefas_automacao where conversa_id = v_conv and tipo = 'followup' and status = 'pendente';
  insert into resultado (teste, ok, detalhe) values ('follow-up de 4 passos criado (3 h, 6 h, 2 d, 7 d)', n = 4, n || ' tarefas');
  insert into public.mensagens (clinica_id, conversa_id, direcao, tipo, texto, enviada_por_ia, status_entrega)
  values (v_cli, v_conv, 'enviada', 'texto', 'Outra mensagem', true, 'pendente');
  select count(*) into n from public.tarefas_automacao where conversa_id = v_conv and tipo = 'followup';
  insert into resultado (teste, ok, detalhe) values ('segunda mensagem sem resposta não duplica o follow-up', n = 4, n || ' tarefas');
  insert into public.mensagens (clinica_id, conversa_id, direcao, tipo, texto, status_entrega) values (v_cli, v_conv, 'recebida', 'texto', 'Tenho interesse', 'entregue');
  insert into resultado (teste, ok, detalhe) values ('resposta do lead cancela o follow-up',
    not exists (select 1 from public.tarefas_automacao where conversa_id = v_conv and tipo = 'followup' and status = 'pendente'), '');
  insert into public.mensagens (clinica_id, conversa_id, direcao, tipo, texto, status_entrega) values (v_cli, v_conv, 'recebida', 'texto', 'Parece ótimo, pare de enrolar e marca', 'entregue');
  insert into resultado (teste, ok, detalhe) values ('frase comum com "pare" não vira opt-out', not public.contato_optout(v_cli, v_tel), '');
  insert into public.mensagens (clinica_id, conversa_id, direcao, tipo, texto, status_entrega) values (v_cli, v_conv, 'recebida', 'texto', 'PARAR!', 'entregue');
  insert into resultado (teste, ok, detalhe) values ('"PARAR" registra opt-out', public.contato_optout(v_cli, v_tel), '');
  update public.agente_ia set ia_ativa = false where clinica_id = v_cli;
  r := public.agente_pode_responder(v_conv);
  insert into resultado (teste, ok, detalhe) values ('IA desligada na clínica bloqueia respostas', r ->> 'motivo' = 'ia_desligada', r::text);
  update public.agente_ia set ia_ativa = true where clinica_id = v_cli;
  r := public.agente_pode_responder(v_conv);
  insert into resultado (teste, ok, detalhe) values ('opt-out bloqueia respostas', r ->> 'motivo' = 'optout', r::text);
  perform public.registrar_optout(v_cli, v_tel, 'optin', 'equipe', 'teste');
  r := public.agente_pode_responder(v_conv);
  insert into resultado (teste, ok, detalhe) values ('opt-in libera de novo', (r ->> 'pode')::boolean, r::text);
  update public.agente_ia set automacoes_pausadas = true where clinica_id = v_cli;
  r := public.agente_pode_responder(v_conv);
  insert into resultado (teste, ok, detalhe) values ('pausa global bloqueia tudo', r ->> 'motivo' = 'automacoes_pausadas', r::text);
  update public.agente_ia set automacoes_pausadas = false where clinica_id = v_cli;

  -- 5) transferência para a equipe e CRM
  v_id := public.transferir_para_humano(v_conv, 'Paciente pediu atendente', 'Pedido para falar com uma pessoa', 'ia');
  r := public.agente_pode_responder(v_conv);
  insert into resultado (teste, ok, detalhe) values ('transferência desliga a IA na conversa', r ->> 'motivo' in ('ia_pausada_na_conversa', 'com_a_equipe'), r::text);
  insert into resultado (teste, ok, detalhe) values ('transferência aberta uma vez só', public.transferir_para_humano(v_conv, 'de novo', null, 'ia') = v_id, '');
  r := public.mover_etapa_lead(v_lead, 'novo_lead', 'teste', 'ia');
  insert into resultado (teste, ok, detalhe) values ('IA não volta etapa do funil', not (r ->> 'movido')::boolean, r::text);
  r := public.mover_etapa_lead(v_lead, 'perdido', '', 'ia');
  insert into resultado (teste, ok, detalhe) values ('IA não marca perdido sem motivo', not (r ->> 'movido')::boolean, r::text);
  r := public.mover_etapa_lead(v_lead, 'agendado', 'Agendou pelo WhatsApp', 'ia');
  insert into resultado (teste, ok, detalhe) values ('IA avança etapa permitida', (r ->> 'movido')::boolean, r::text);
  -- reserva pela IA sem permissão de criar vai para a equipe
  update public.agente_ia set ia_cria_agendamento = false where clinica_id = v_cli;
  r := public.reservar_agendamento(v_cli, v_proc, v_prof, v_ini + interval '30 minutes', null, v_lead, v_conv, 'ia');
  insert into resultado (teste, ok, detalhe) values ('sem permissão a IA só pede para a equipe', r ->> 'status' = 'aguardando_equipe', r::text);
  update public.agente_ia set ia_cria_agendamento = true where clinica_id = v_cli;

  -- 6) validar tarefa de lembrete e de follow-up na hora do envio
  select * into t from public.tarefas_automacao where agendamento_id = v_ag and tipo = 'lembrete' and status = 'pendente' limit 1;
  r := public.validar_tarefa(t.id);
  insert into resultado (teste, ok, detalhe) values ('lembrete válido pode ser enviado', (r ->> 'pode')::boolean, r::text);
  update public.agendamentos set status_agendamento_id = (select id from public.status_agendamento where clinica_id = v_cli and chave = 'cancelado' limit 1) where id = v_ag;
  insert into resultado (teste, ok, detalhe) values ('cancelar consulta cancela os lembretes',
    not exists (select 1 from public.tarefas_automacao where agendamento_id = v_ag and tipo = 'lembrete' and status = 'pendente'), '');

  -- ===== como usuários (RLS) =====
  perform set_config('request.jwt.claims', json_build_object('role', 'authenticated', 'sub', gen_random_uuid())::text, true);
  execute 'set local role authenticated';
  select count(*) into n from public.tarefas_automacao;
  insert into resultado (teste, ok, detalhe) values ('estranho não vê a fila de nenhuma clínica', n = 0, n::text);
  begin
    r := public.agente_ia_config(v_cli);
    insert into resultado (teste, ok, detalhe) values ('estranho não lê a configuração', false, 'leu');
  exception when insufficient_privilege then
    insert into resultado (teste, ok, detalhe) values ('estranho não lê a configuração', true, 'recusado');
  end;
  begin
    perform public.reivindicar_tarefas(array['alerta'], 1, 'x', 60);
    insert into resultado (teste, ok, detalhe) values ('usuário comum não processa a fila', false, 'processou');
  exception when insufficient_privilege then
    insert into resultado (teste, ok, detalhe) values ('usuário comum não processa a fila', true, 'recusado');
  end;
  begin
    insert into public.tarefas_automacao (clinica_id, tipo, chave_idempotencia) values (v_cli, 'alerta', 'invasao');
    insert into resultado (teste, ok, detalhe) values ('usuário não grava direto na fila', false, 'gravou');
  exception when insufficient_privilege then
    insert into resultado (teste, ok, detalhe) values ('usuário não grava direto na fila', true, 'recusado');
  end;
  begin
    perform public.contato_optout(v_cli, v_tel);
    insert into resultado (teste, ok, detalhe) values ('usuário não consulta opt-out direto', false, 'consultou');
  exception when insufficient_privilege then
    insert into resultado (teste, ok, detalhe) values ('usuário não consulta opt-out direto', true, 'recusado');
  end;
  execute 'reset role';
  perform set_config('request.jwt.claims', json_build_object('role', 'authenticated', 'sub', v_dono)::text, true);
  execute 'set local role authenticated';
  select count(*) into n from public.tarefas_automacao;
  insert into resultado (teste, ok, detalhe) values ('dono vê a fila da própria clínica', n > 0, n::text);
  r := public.agente_ia_config(v_cli);
  insert into resultado (teste, ok, detalhe) values ('dono lê a configuração completa', r ? 'agente' and r ? 'servicos' and r ? 'regras_texto', 'servicos: ' || jsonb_array_length(r -> 'servicos'));
  execute 'reset role';
  raise exception 'RESULTADO_TESTES %', (select json_agg(json_build_object('n', x.n, 'ok', x.ok, 'teste', x.teste, 'detalhe', left(x.detalhe, 140)) order by x.n) from resultado x);
end $$;
