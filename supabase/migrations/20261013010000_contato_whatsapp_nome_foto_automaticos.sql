-- Cadastro automático do contato do WhatsApp (2026-10-13).
-- Na primeira mensagem o sistema preenche nome, telefone e foto com o que o WhatsApp fornece, e vai
-- atualizando enquanto a clínica não editar à mão. Tudo reversível: só colunas novas (nunca apagadas)
-- e funções substituídas por versão nova; o bloco de reversão está no fim, comentado.
--
-- Campos (snake_case, padrão do projeto; os dois primeiros já existiam):
--   conversas.nome_contato                 = nome vindo do WhatsApp (ou editado pela clínica)
--   conversas.foto_contato_path            = caminho da foto no Storage (bucket privado "mensagens")
--   conversas.foto_contato_atualizada_em   = quando a foto foi buscada pela última vez
--   conversas.nome_editado_manualmente     = a clínica mexeu no nome: o WhatsApp não altera mais
--   conversas.foto_editada_manualmente     = a clínica mexeu na foto: o WhatsApp não altera mais
-- Índice único por clínica e telefone: já existe (conversas_contato_unico, com a instância).

alter table public.conversas
  add column if not exists foto_contato_atualizada_em timestamptz,
  add column if not exists nome_editado_manualmente boolean not null default false,
  add column if not exists foto_editada_manualmente boolean not null default false;
comment on column public.conversas.foto_contato_atualizada_em is 'Última busca da foto de perfil no WhatsApp (nova busca só depois de 7 dias)';
comment on column public.conversas.nome_editado_manualmente is 'Verdadeiro quando alguém da clínica editou o nome; o WhatsApp não sobrescreve';
comment on column public.conversas.foto_editada_manualmente is 'Verdadeiro quando alguém da clínica trocou a foto; o WhatsApp não sobrescreve';

-- 1) nome aproveitável: precisa ter pelo menos duas letras ou números (nome vazio, só emoji ou só símbolos não vale)
create or replace function public.ia_nome_valido(p text)
returns text language sql immutable set search_path to 'public' as $$
  select case when length(regexp_replace(coalesce(p, ''), '[^[:alnum:]]', '', 'g')) >= 2
              then nullif(left(btrim(regexp_replace(p, '\s+', ' ', 'g')), 120), '') end
$$;

-- 2) telefone no formato de leitura: +55 19 99999 9999 (usado como nome provisório)
create or replace function public.ia_tel_formatado(p text)
returns text language sql immutable set search_path to 'public' as $$
  select case
    when d = '' then null
    when d like '55%' and length(d) = 13 then '+55 ' || substr(d, 3, 2) || ' ' || substr(d, 5, 5) || ' ' || substr(d, 10)
    when d like '55%' and length(d) = 12 then '+55 ' || substr(d, 3, 2) || ' ' || substr(d, 5, 4) || ' ' || substr(d, 9)
    else '+' || d end
  from (select regexp_replace(coalesce(p, ''), '\D', '', 'g') as d) x
$$;

-- 3) a clínica editou? Quem grava com login (auth.uid() presente) é gente; o servidor (service_role) não tem uid.
create or replace function public.contato_marcar_edicao_manual()
returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  if auth.uid() is null then return new; end if;
  if tg_table_name = 'conversas' then
    if new.nome_contato is distinct from old.nome_contato then new.nome_editado_manualmente := true; end if;
    if new.foto_contato_path is distinct from old.foto_contato_path then new.foto_editada_manualmente := true; end if;
    return new;
  end if;
  if tg_table_name = 'leads' and new.nome is distinct from old.nome then
    update public.conversas set nome_editado_manualmente = true
     where excluido_em is null and (lead_id = new.id or id = new.conversa_id);
  end if;
  if tg_table_name = 'pacientes' then
    if new.nome is distinct from old.nome then
      update public.conversas set nome_editado_manualmente = true where excluido_em is null and paciente_id = new.id;
    end if;
    if new.foto_path is distinct from old.foto_path then
      update public.conversas set foto_editada_manualmente = true where excluido_em is null and paciente_id = new.id;
    end if;
  end if;
  return new;
end $$;
revoke execute on function public.contato_marcar_edicao_manual() from public, anon, authenticated;

create or replace trigger tg_conversas_edicao_manual before update on public.conversas
  for each row execute function public.contato_marcar_edicao_manual();
create or replace trigger tg_leads_edicao_manual after update of nome on public.leads
  for each row execute function public.contato_marcar_edicao_manual();
create or replace trigger tg_pacientes_edicao_manual after update of nome, foto_path on public.pacientes
  for each row execute function public.contato_marcar_edicao_manual();

-- 4) entrada do WhatsApp (n8n_ingerir_evento):
--    a) conversa nova nasce com o nome do WhatsApp (ou o telefone formatado) e tolera duas mensagens ao mesmo tempo;
--    b) conversa existente atualiza o nome quando o WhatsApp mudou e a clínica não editou;
--    c) devolve se a foto precisa ser buscada (sem foto, ou com mais de 7 dias, e não editada pela clínica);
--    d) registra o que foi capturado em entrada_webhook.payload_redigido.capturado.
do $$
declare v_def text; v_novo text;
begin
  select pg_get_functiondef(p.oid) into v_def from pg_proc p join pg_namespace n on n.oid = p.pronamespace
   where n.nspname = 'public' and p.proname = 'n8n_ingerir_evento';
  if v_def is null or position('ia_nome_valido' in v_def) > 0 then return; end if;

  -- variáveis novas
  v_novo := replace(v_def, 'v_ts timestamptz; v_nome text; v_resp uuid;',
                           'v_ts timestamptz; v_nome text; v_resp uuid; v_nome_ok text; v_foto_buscar boolean := false; v_nome_atualizado boolean := false;');
  assert v_novo <> v_def, 'declare não encontrado'; v_def := v_novo;

  -- a) conversa nova: nome aproveitável ou telefone formatado; conflito de duas mensagens simultâneas reaproveita a conversa
  v_novo := replace(v_def,
    '    insert into public.conversas (clinica_id, instancia_whatsapp_id, telefone, nome_contato, paciente_id, criado_por)
    values (v_inst.clinica_id, v_inst.id, v_tel, case when v_de_mim then null else v_nome end, v_pac, null)
    returning * into v_conv;',
    '    v_nome_ok := case when v_de_mim then null else public.ia_nome_valido(v_nome) end;
    begin
      insert into public.conversas (clinica_id, instancia_whatsapp_id, telefone, nome_contato, paciente_id, criado_por)
      values (v_inst.clinica_id, v_inst.id, v_tel, coalesce(v_nome_ok, public.ia_tel_formatado(v_tel)), v_pac, null)
      returning * into v_conv;
    exception when unique_violation then
      -- outra mensagem do mesmo número criou a conversa um instante antes: usa a dela
      select * into v_conv from public.conversas c
       where c.clinica_id = v_inst.clinica_id and c.telefone = any (v_vars) and c.excluido_em is null
       order by (c.instancia_whatsapp_id = v_inst.id) desc nulls last, c.criado_em limit 1 for update;
    end;');
  assert v_novo <> v_def, 'insert da conversa não encontrado'; v_def := v_novo;

  -- b) conversa existente: nome do WhatsApp mudou e a clínica não editou
  v_novo := replace(v_def,
    '  update public.conversas set nome_contato = coalesce(nome_contato, v_nome) where id = v_conv.id;',
    '  v_nome_ok := public.ia_nome_valido(v_nome);
  if v_nome_ok is not null and not coalesce(v_conv.nome_editado_manualmente, false)
     and v_nome_ok is distinct from v_conv.nome_contato then
    update public.conversas set nome_contato = v_nome_ok where id = v_conv.id;
    -- o contato do funil acompanha, enquanto ainda tem o nome antigo do WhatsApp ou só o telefone
    update public.leads set nome = v_nome_ok
     where id = v_conv.lead_id and excluido_em is null
       and (nome is null or nome = v_conv.nome_contato or nome = v_conv.telefone or nome = public.ia_tel_formatado(v_conv.telefone));
    v_nome_atualizado := true;
  elsif v_conv.nome_contato is null then
    update public.conversas set nome_contato = public.ia_tel_formatado(v_conv.telefone) where id = v_conv.id;
  end if;
  -- c) foto: sem foto, ou com mais de 7 dias, e não trocada pela clínica
  v_foto_buscar := not coalesce(v_conv.foto_editada_manualmente, false)
     and (v_conv.foto_contato_path is null or v_conv.foto_contato_atualizada_em is null or v_conv.foto_contato_atualizada_em < now() - interval ''7 days'');');
  assert v_novo <> v_def, 'update do nome não encontrado'; v_def := v_novo;

  -- d) registro do que foi capturado e retorno para a edge function
  v_novo := replace(v_def,
    '  update public.entrada_webhook set status = case when v_tar is not null then ''enfileirado'' else ''processado'' end, processado_em = now(),',
    '  update public.entrada_webhook set payload_redigido = payload_redigido || jsonb_build_object(''capturado'', jsonb_build_object(
           ''nome_whatsapp'', left(coalesce(v_nome, ''''), 60), ''nome_usado'', v_nome_ok, ''nome_atualizado'', v_nome_atualizado,
           ''conversa_nova'', v_conv.criado_em > now() - interval ''5 seconds'', ''foto_buscar'', v_foto_buscar)) where id = v_ent;
  update public.entrada_webhook set status = case when v_tar is not null then ''enfileirado'' else ''processado'' end, processado_em = now(),');
  assert v_novo <> v_def, 'update da entrada não encontrado'; v_def := v_novo;

  v_novo := replace(v_def,
    '''tarefa_id'', v_tar, ''sem_ia_motivo'', case when v_tar is null then v_porta ->> ''motivo'' end);',
    '''tarefa_id'', v_tar, ''sem_ia_motivo'', case when v_tar is null then v_porta ->> ''motivo'' end, ''entrada_id'', v_ent, ''foto_buscar'', v_foto_buscar);');
  assert v_novo <> v_def, 'retorno não encontrado'; v_def := v_novo;

  execute v_def;
end $$;

-- 5) a conversa precisa reler os campos novos depois do update (v_conv foi carregada antes): nada a fazer,
--    porque as decisões usam o estado anterior de propósito (uma leitura só).

-- REVERSÃO (se um dia for preciso voltar atrás; nada aqui apaga dados):
--   drop trigger if exists tg_conversas_edicao_manual on public.conversas;
--   drop trigger if exists tg_leads_edicao_manual on public.leads;
--   drop trigger if exists tg_pacientes_edicao_manual on public.pacientes;
--   as colunas podem ficar; a versão anterior de n8n_ingerir_evento está na migration 20261012050000 e anteriores.
