-- Riscos médios do mapa do banco (docs/auditoria/02-mapa-banco.md).

-- ---------------------------------------------------------------------
-- S3: upload anônimo no prontuario podia cair na pasta de outra clínica.
-- O caminho precisa ser <clinica do link>/links/<token>/arquivo.
create or replace function public.link_documentos_caminho_valido(p_nome text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.links_envio_documentos l
     where l.token = (storage.foldername(p_nome))[3]
       and l.clinica_id::text = (storage.foldername(p_nome))[1]
       and (storage.foldername(p_nome))[2] = 'links'
       and l.status in ('aguardando', 'recebido') and l.expira_em > now() and l.excluido_em is null)
$$;
revoke execute on function public.link_documentos_caminho_valido(text) from public;
grant execute on function public.link_documentos_caminho_valido(text) to anon, authenticated;

drop policy if exists salute_prontuario_link_paciente on storage.objects;
create policy salute_prontuario_link_paciente on storage.objects
  for insert to anon, authenticated
  with check (bucket_id = 'prontuario' and public.link_documentos_caminho_valido(name));

-- ---------------------------------------------------------------------
-- S4: gestor podia inserir qualquer usuário direto como membro "aceito" e
-- promover outros a gestor. O front grava a equipe só por funções do servidor
-- (convidar_membro, admin_definir_acesso); inserção direta fica restrita a convite pendente.
drop policy if exists usuarios_clinicas_criar on public.usuarios_clinicas;
create policy usuarios_clinicas_criar on public.usuarios_clinicas
  for insert to authenticated
  with check (clinica_id in (select public.clinicas_gestao())
              and usuario_id is null and status_convite = 'pendente'
              and not dono and papel <> 'dono');

-- só o dono dá acesso de gestor (vale também para as funções do servidor)
create or replace function public.usuarios_clinicas_proteger()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
declare v_sou_dono boolean;
begin
  if auth.uid() is null or public.eh_admin_plataforma() then return new; end if;
  -- primeiro membro de uma clínica nova (criar_clinica) entra como dono
  if tg_op = 'INSERT' and not exists (select 1 from public.usuarios_clinicas where clinica_id = new.clinica_id and excluido_em is null) then return new; end if;
  select exists (select 1 from public.usuarios_clinicas where clinica_id = new.clinica_id and usuario_id = auth.uid()
                  and (dono or papel = 'dono') and ativo and excluido_em is null) into v_sou_dono;
  if (new.dono or new.papel = 'dono') and (tg_op = 'INSERT' or not (old.dono or old.papel = 'dono')) and not v_sou_dono then
    raise exception 'Só o dono da clínica pode indicar outro dono';
  end if;
  if new.papel = 'gestor' and (tg_op = 'INSERT' or old.papel <> 'gestor') and not v_sou_dono then
    raise exception 'Só o dono da clínica pode dar acesso de gestor';
  end if;
  if tg_op = 'UPDATE' and (old.dono or old.papel = 'dono') and (not new.dono and new.papel <> 'dono' or new.excluido_em is not null or not new.ativo) then
    if not v_sou_dono then raise exception 'Só o dono pode mudar outro dono'; end if;
    if not exists (select 1 from public.usuarios_clinicas where clinica_id = new.clinica_id and id <> new.id
                   and (dono or papel = 'dono') and ativo and excluido_em is null) then
      raise exception 'A clínica precisa ter pelo menos um dono';
    end if;
  end if;
  return new;
end $function$;

-- ---------------------------------------------------------------------
-- S5: equipe, permissões, clínica, despesas e estoque não eram auditados.
-- auditar() passa a aceitar a tabela clinicas (que não tem clinica_id).
create or replace function public.auditar()
returns trigger
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_reg jsonb; v_antes jsonb; v_depois jsonb; v_cols text[]; v_acao text;
begin
  if tg_op = 'INSERT' then
    v_reg := to_jsonb(new); v_depois := v_reg; v_acao := 'criacao';
  elsif tg_op = 'UPDATE' then
    v_reg := to_jsonb(new); v_antes := to_jsonb(old);
    select array_agg(k order by k) into v_cols
      from jsonb_object_keys(v_reg) k
      where k <> 'atualizado_em' and (v_antes -> k) is distinct from (v_reg -> k);
    if v_cols is null then return null; end if;
    v_acao := case when (v_antes ->> 'excluido_em') is null and (v_reg ->> 'excluido_em') is not null then 'exclusao_logica' else 'edicao' end;
    select jsonb_object_agg(k, v_antes -> k), jsonb_object_agg(k, v_reg -> k) into v_antes, v_depois from unnest(v_cols) k;
  else
    v_reg := to_jsonb(old); v_antes := v_reg; v_acao := 'exclusao';
  end if;
  insert into public.auditoria (clinica_id, tabela, registro_id, acao, usuario_id, dados_antes, dados_depois, colunas_alteradas)
  values (coalesce((v_reg ->> 'clinica_id')::uuid, case when tg_table_name = 'clinicas' then (v_reg ->> 'id')::uuid end),
          tg_table_name, (v_reg ->> 'id')::uuid, v_acao, auth.uid(), v_antes, v_depois, v_cols);
  return null;
end $function$;

do $$
declare t text;
begin
  foreach t in array array['usuarios_clinicas','permissoes','clinicas','contas_pagar','produtos','movimentacoes_estoque'] loop
    execute format('drop trigger if exists tg_%1$s_auditoria on public.%1$I', t);
    execute format('create trigger tg_%1$s_auditoria after insert or update or delete on public.%1$I for each row execute function public.auditar()', t);
  end loop;
end $$;

-- ---------------------------------------------------------------------
-- S6: ia_config (legada, sem uso no front) aceitava leitura, edição e exclusão de
-- qualquer vínculo, inclusive bloqueado; o gatilho de auditoria dela estava quebrado.
drop policy if exists ia_config_select on public.ia_config;
drop policy if exists ia_config_insert on public.ia_config;
drop policy if exists ia_config_update on public.ia_config;
drop policy if exists ia_config_delete on public.ia_config;
create policy ia_config_ler on public.ia_config
  for select to authenticated using (clinica_id in (select public.clinicas_gestao()));
create policy ia_config_criar on public.ia_config
  for insert to authenticated with check (clinica_id in (select public.clinicas_gestao()));
create policy ia_config_editar on public.ia_config
  for update to authenticated using (clinica_id in (select public.clinicas_gestao()))
  with check (clinica_id in (select public.clinicas_gestao()));

drop trigger if exists ia_config_auditoria_trigger on public.ia_config;
drop function if exists public.ia_config_auditoria();
drop trigger if exists tg_ia_config_auditoria on public.ia_config;
create trigger tg_ia_config_auditoria after insert or update or delete on public.ia_config
  for each row execute function public.auditar();
