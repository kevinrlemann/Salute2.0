-- Transferência de atendimento entre pessoas da mesma clínica (2026-10-16).
-- Tudo aditivo: nenhuma tabela ou coluna é apagada ou renomeada.
-- Usa o que já existe: conversas.atendente_usuario_id (responsável), transferencias_humanas (uma aberta por conversa),
-- mensagens tipo 'sistema' (nota na linha do tempo da conversa) e notificacoes (sino de quem recebe).

-- 1) Nota de sistema nunca vai para o WhatsApp nem agenda follow up: sai do gatilho de automação logo no começo.
do $$
declare v_def text;
begin
  select pg_get_functiondef('public.mensagem_automacao()'::regprocedure) into v_def;
  if position('if new.tipo = ''sistema'' then return null; end if;' in v_def) = 0 then
    v_def := replace(v_def, E'begin\n  select * into cv from public.conversas where id = new.conversa_id;',
                            E'begin\n  if new.tipo = ''sistema'' then return null; end if;\n  select * into cv from public.conversas where id = new.conversa_id;');
    execute v_def;
  end if;
end $$;

-- 2) Nome curto de uma pessoa da clínica, para a nota e o aviso.
create or replace function public.nome_usuario_curto(p_usuario uuid)
returns text language sql stable security definer set search_path = public as $$
  select coalesce(nullif(trim(coalesce(p.nome, '') || ' ' || coalesce(p.sobrenome, '')), ''), p.email, 'alguém da equipe')
    from public.perfis_usuario p where p.id = p_usuario
$$;
revoke execute on function public.nome_usuario_curto(uuid) from anon, public;

-- 3) Transferir a conversa para uma pessoa da clínica (ou para si mesmo). Tudo em uma transação.
create or replace function public.transferir_conversa(p_conversa uuid, p_para_usuario uuid, p_motivo text default null)
returns jsonb language plpgsql security definer set search_path = public as $$
declare cv record; v_de uuid; v_nome_de text; v_nome_para text; v_txt text; v_transf uuid; v_sla int;
begin
  select * into cv from public.conversas where id = p_conversa and excluido_em is null for update;
  if not found then raise exception 'Conversa não encontrada'; end if;
  if not public.pode(cv.clinica_id, 'mensagens') then raise exception 'Sem permissão para esta conversa' using errcode = '42501'; end if;
  if p_para_usuario is null then raise exception 'Escolha para quem transferir'; end if;
  if not exists (select 1 from public.usuarios_clinicas uc
                  where uc.clinica_id = cv.clinica_id and uc.usuario_id = p_para_usuario and uc.ativo and uc.excluido_em is null and uc.status_convite = 'aceito') then
    raise exception 'Essa pessoa não faz parte desta clínica';
  end if;
  v_de := cv.atendente_usuario_id;
  if v_de is not distinct from p_para_usuario then
    return jsonb_build_object('ok', true, 'sem_mudanca', true, 'atendente_usuario_id', p_para_usuario);
  end if;
  v_nome_de := public.nome_usuario_curto(auth.uid());
  v_nome_para := public.nome_usuario_curto(p_para_usuario);

  -- responsável novo; a IA fica pausada enquanto uma pessoa atende
  update public.conversas
     set atendente_usuario_id = p_para_usuario, ia_ativa = false,
         ia_pausada_em = coalesce(ia_pausada_em, now()), ia_pausada_por = coalesce(ia_pausada_por, auth.uid())
   where id = cv.id;
  if cv.lead_id is not null then
    update public.leads set ia_ativa = false, ia_pausada_em = coalesce(ia_pausada_em, now()), ia_pausada_por = coalesce(ia_pausada_por, auth.uid()) where id = cv.lead_id;
  end if;

  -- transferência aberta (uma por conversa): passa para a pessoa escolhida
  select id into v_transf from public.transferencias_humanas where conversa_id = cv.id and status in ('aberta', 'em_atendimento') for update;
  if v_transf is null then
    select coalesce(transferencia_sla_min, 30) into v_sla from public.agente_ia where clinica_id = cv.clinica_id and excluido_em is null;
    insert into public.transferencias_humanas (clinica_id, conversa_id, lead_id, categoria, motivo, origem, status, atribuida_a, sla_ate)
    values (cv.clinica_id, cv.id, cv.lead_id, 'equipe', left(coalesce(nullif(trim(p_motivo), ''), 'Transferência entre a equipe'), 500), 'equipe', 'em_atendimento',
            p_para_usuario, now() + make_interval(mins => coalesce(v_sla, 30)))
    returning id into v_transf;
  else
    update public.transferencias_humanas set status = 'em_atendimento', atribuida_a = p_para_usuario,
           motivo = case when nullif(trim(p_motivo), '') is null then motivo else left(trim(p_motivo), 500) end
     where id = v_transf;
  end if;
  update public.tarefas_automacao set status = 'cancelada', motivo_cancelamento = 'transferida para a equipe'
   where conversa_id = cv.id and tipo = 'followup' and status = 'pendente';

  -- nota na conversa (tipo sistema: não vai para o WhatsApp)
  v_txt := case when p_para_usuario = auth.uid() then v_nome_de || ' assumiu esta conversa'
                else v_nome_de || ' transferiu esta conversa para ' || v_nome_para end
           || case when nullif(trim(p_motivo), '') is null then '' else ': ' || left(trim(p_motivo), 300) end;
  insert into public.mensagens (clinica_id, conversa_id, direcao, tipo, texto, enviada_em, enviada_por_usuario_id, status_entrega, criado_por)
  values (cv.clinica_id, cv.id, 'enviada', 'sistema', v_txt, now(), auth.uid(), 'lida', auth.uid());

  -- aviso no sino de quem recebe (não avisa quem transferiu para si mesmo)
  if p_para_usuario <> auth.uid() then
    insert into public.notificacoes (clinica_id, usuario_id, tipo, titulo, descricao, conversa_id, registro_tabela, registro_id, criado_por)
    values (cv.clinica_id, p_para_usuario, 'nova_mensagem', 'Conversa transferida para você',
            left(coalesce(cv.nome_contato, cv.telefone) || ' · de ' || v_nome_de || coalesce(': ' || nullif(trim(p_motivo), ''), ''), 400),
            cv.id, 'conversas', cv.id, auth.uid());
  end if;
  return jsonb_build_object('ok', true, 'atendente_usuario_id', p_para_usuario, 'transferencia_id', v_transf, 'nota', v_txt);
end $$;
revoke execute on function public.transferir_conversa(uuid, uuid, text) from anon, public;
grant execute on function public.transferir_conversa(uuid, uuid, text) to authenticated;

-- 4) Liberar a conversa: fica sem responsável; a transferência aberta é resolvida; a IA volta se a equipe pedir.
create or replace function public.liberar_conversa(p_conversa uuid, p_religar_ia boolean default false)
returns jsonb language plpgsql security definer set search_path = public as $$
declare cv record; v_txt text;
begin
  select * into cv from public.conversas where id = p_conversa and excluido_em is null for update;
  if not found then raise exception 'Conversa não encontrada'; end if;
  if not public.pode(cv.clinica_id, 'mensagens') then raise exception 'Sem permissão para esta conversa' using errcode = '42501'; end if;
  update public.conversas set atendente_usuario_id = null where id = cv.id;
  update public.transferencias_humanas set status = 'resolvida', resolvida_em = now(), resolvida_por = auth.uid()
   where conversa_id = cv.id and status in ('aberta', 'em_atendimento');
  if p_religar_ia then
    update public.conversas set ia_ativa = true, ia_pausada_em = null, ia_pausada_por = null where id = cv.id;
    if cv.lead_id is not null then update public.leads set ia_ativa = true, ia_pausada_em = null, ia_pausada_por = null where id = cv.lead_id; end if;
  end if;
  if cv.atendente_usuario_id is not null or p_religar_ia then
    v_txt := public.nome_usuario_curto(auth.uid()) || case when p_religar_ia then ' encerrou o atendimento e devolveu a conversa para a IA' else ' encerrou o atendimento desta conversa' end;
    insert into public.mensagens (clinica_id, conversa_id, direcao, tipo, texto, enviada_em, enviada_por_usuario_id, status_entrega, criado_por)
    values (cv.clinica_id, cv.id, 'enviada', 'sistema', v_txt, now(), auth.uid(), 'lida', auth.uid());
  end if;
  return jsonb_build_object('ok', true, 'ia_ativa', p_religar_ia);
end $$;
revoke execute on function public.liberar_conversa(uuid, boolean) from anon, public;
grant execute on function public.liberar_conversa(uuid, boolean) to authenticated;

create index if not exists conversas_atendente_idx on public.conversas (clinica_id, atendente_usuario_id) where excluido_em is null;
