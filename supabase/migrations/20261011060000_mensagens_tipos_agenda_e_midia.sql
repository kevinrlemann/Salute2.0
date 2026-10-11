/* MENSAGENS: tipos novos, resposta citada, edição, mídia enviada pelo sistema e agenda do WhatsApp */
/* Aplicado no banco em 2026-10-11, em partes, pelo execute_sql (as funções são regravadas por troca de texto, */
/* porque as 41 migrations iniciais não estão neste repositório). */

/* 1) marca de mensagem editada no WhatsApp */
alter table public.mensagens add column if not exists editada_em timestamptz;

/* 2) ingestão (n8n_ingerir_evento): liga a resposta à mensagem citada (p_evento.resposta_a) e devolve */
/*    mensagem_id também para mensagens enviadas pelo aparelho, para a função baixar a mídia delas. */
do $do$
declare d text; n_cols int; n_resp int;
begin
  select pg_get_functiondef('public.n8n_ingerir_evento(text,text,jsonb,text)'::regprocedure) into d;
  if position('v_resp' in d) > 0 then raise notice 'já aplicado'; return; end if;
  d := replace(d, $r$v_nome text;
begin$r$, $r$v_nome text; v_resp uuid;
begin$r$);
  d := replace(d, $r$  select * into v_conv from public.conversas c
$r$, $r$  -- mensagem citada (responder): liga à mensagem original, se ela estiver no banco
  select m.id into v_resp from public.mensagens m where m.clinica_id = v_inst.clinica_id and m.whatsapp_mensagem_id = nullif(p_evento ->> 'resposta_a', '') limit 1;
  select * into v_conv from public.conversas c
$r$);
  d := replace(d, $r$status_entrega, whatsapp_mensagem_id, criado_por)
    values (v_inst.clinica_id, v_conv.id, 'enviada',$r$, $r$status_entrega, whatsapp_mensagem_id, criado_por, resposta_a_mensagem_id)
    values (v_inst.clinica_id, v_conv.id, 'enviada',$r$);
  d := replace(d, $r$nullif(v_texto, ''), v_ts, null, false, 'enviada', v_ext, null);$r$, $r$nullif(v_texto, ''), v_ts, null, false, 'enviada', v_ext, null, v_resp)
    returning id into v_msg;$r$);
  d := replace(d, $r$return jsonb_build_object('ok', true, 'conversa_id', v_conv.id, 'de_mim', true);$r$, $r$return jsonb_build_object('ok', true, 'conversa_id', v_conv.id, 'mensagem_id', v_msg, 'de_mim', true);$r$);
  d := replace(d, $r$status_entrega, entregue_em, whatsapp_mensagem_id, criado_por)
  values (v_inst.clinica_id, v_conv.id, 'recebida',$r$, $r$status_entrega, entregue_em, whatsapp_mensagem_id, criado_por, resposta_a_mensagem_id)
  values (v_inst.clinica_id, v_conv.id, 'recebida',$r$);
  d := replace(d, $r$v_ts, null, false, 'entregue', now(), v_ext, null)
  returning id into v_msg;$r$, $r$v_ts, null, false, 'entregue', now(), v_ext, null, v_resp)
  returning id into v_msg;$r$);
  n_resp := (length(d) - length(replace(d, 'v_resp', ''))) / 6;
  n_cols := (length(d) - length(replace(d, 'criado_por, resposta_a_mensagem_id)', ''))) / length('criado_por, resposta_a_mensagem_id)');
  if n_resp <> 4 or n_cols <> 2 or position($r$'mensagem_id', v_msg, 'de_mim'$r$ in d) = 0 then
    raise exception 'n8n_ingerir_evento: trocas incompletas (v_resp=% colunas=%)', n_resp, n_cols;
  end if;
  execute d;
end $do$;

/* 3) fila de envio (n8n_envio_preflight): mídia enviada pelo sistema sai com o anexo da mensagem ou a imagem */
/*    da figurinha; anexo ainda subindo espera 20 s; figurinha entra como tipo de mídia (sendSticker no n8n). */
do $do$
declare d text;
begin
  select pg_get_functiondef('public.n8n_envio_preflight(uuid)'::regprocedure) into d;
  if position('anexo_pendente' in d) > 0 then raise notice 'já aplicado'; return; end if;
  d := replace(d, $r$  v_arq := nullif(e.payload ->> 'arquivo_path', '');
$r$, $r$  v_arq := nullif(e.payload ->> 'arquivo_path', '');
  -- sem caminho no pedido: usa o anexo da mensagem ou a imagem da figurinha da clínica
  if v_arq is null and m.id is not null and m.tipo in ('imagem', 'video', 'documento', 'audio', 'figurinha') then
    if m.figurinha_id is not null then
      select f.imagem_path into v_arq from public.figurinhas f where f.id = m.figurinha_id and f.imagem_path is not null;
    else
      select a.arquivo_path into v_arq from public.anexos_mensagem a where a.mensagem_id = m.id and a.excluido_em is null order by a.criado_em limit 1;
    end if;
    -- anexo ainda subindo (mensagem recém-criada): espera 20 segundos em vez de falhar
    if v_arq is null and m.criado_em > now() - interval '3 minutes' then
      update public.envios_pendentes set status_envio = 'pendente', proxima_tentativa_em = now() + interval '20 seconds',
             tentativas = greatest(tentativas - 1, 0) where id = e.id;
      return jsonb_build_object('acao', 'adiar', 'motivo', 'anexo_pendente');
    end if;
  end if;
$r$);
  d := replace(d, $r$if v_tmid not in ('imagem', 'video', 'documento', 'audio')$r$, $r$if v_tmid not in ('imagem', 'video', 'documento', 'audio', 'figurinha')$r$);
  if position('anexo_pendente' in d) = 0 or position($r$'audio', 'figurinha')$r$ in d) = 0 then raise exception 'n8n_envio_preflight: trocas incompletas'; end if;
  execute d;
end $do$;

/* 4) agenda do WhatsApp: de hora em hora a função "whatsapp" casa os nomes salvos no aparelho com as conversas */
/*    (e copia a foto do WhatsApp para pacientes vinculados depois da foto). */
select cron.schedule('contatos_whatsapp', '7 * * * *', $$
  select net.http_post(
    url := 'https://gbhsslyoybqjvjznlave.supabase.co/functions/v1/whatsapp',
    headers := jsonb_build_object('Content-Type', 'application/json', 'x-vigia-token', (select decrypted_secret from vault.decrypted_secrets where name = 'vigia_whatsapp')),
    body := '{"acao":"contatos"}'::jsonb
  );
$$);
