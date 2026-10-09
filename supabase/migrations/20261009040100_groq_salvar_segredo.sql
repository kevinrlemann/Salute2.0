-- salvar_segredo: a chave do Groq também marca a IA da Renata como configurada
-- (as colunas claude_configurada/claude_chave_final passam a valer para a IA, qualquer provedor).
-- Única mudança em relação à versão anterior: p_provedor in ('anthropic', 'google', 'groq').
CREATE OR REPLACE FUNCTION public.salvar_segredo(p_clinica uuid, p_provedor provedor_integracao, p_segredo text)
 RETURNS text
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public', 'extensions'
AS $function$
declare v_nome text; v_vault uuid; v_final text; v_seg uuid;
begin
  if p_clinica is null then
    if not public.eh_admin_plataforma() then raise exception 'Só a equipe da Salute grava a chave padrão'; end if;
  elsif p_provedor in ('whatsapp_meta', 'whatsapp_nao_oficial') then
    if not public.pode(p_clinica, 'perfil.canais') then raise exception 'Sem permissão para conexões de WhatsApp'; end if;
  elsif p_provedor = 'certificado_fiscal' then
    if not public.pode(p_clinica, 'gestao.financeiro') then raise exception 'Sem permissão para a configuração fiscal'; end if;
  elsif not (p_clinica in (select public.clinicas_gestao())) then
    raise exception 'Só dono ou gestor configuram as chaves da Renata';
  end if;
  v_final := case when p_segredo is null or p_segredo = '' then null else right(p_segredo, 4) end;
  v_nome := 'salute:' || coalesce(p_clinica::text, 'padrao') || ':' || p_provedor::text;
  select id, vault_secret_id into v_seg, v_vault from public.segredos_integracao
   where clinica_id is not distinct from p_clinica and provedor = p_provedor and excluido_em is null;
  if p_segredo is null or p_segredo = '' then
    if v_seg is not null then update public.segredos_integracao set excluido_em = now() where id = v_seg; end if;
  elsif v_vault is not null then
    perform vault.update_secret(v_vault, p_segredo);
    update public.segredos_integracao set final_chave = v_final, configurado_em = now(), configurado_por = auth.uid() where id = v_seg;
  else
    v_vault := vault.create_secret(p_segredo, v_nome || ':' || extract(epoch from now())::bigint, 'Chave guardada pelo sistema Salute');
    insert into public.segredos_integracao (clinica_id, provedor, vault_secret_id, final_chave, configurado_por)
    values (p_clinica, p_provedor, v_vault, v_final, auth.uid());
  end if;
  if p_clinica is not null then
    if p_provedor in ('anthropic', 'google', 'groq') then
      update public.renata_configuracoes set claude_configurada = v_final is not null, claude_chave_final = v_final where clinica_id = p_clinica and excluido_em is null;
    elsif p_provedor = 'elevenlabs' then
      update public.renata_voz set elevenlabs_configurada = v_final is not null, elevenlabs_chave_final = v_final where clinica_id = p_clinica and excluido_em is null;
    elsif p_provedor = 'whatsapp_meta' then
      update public.instancias_whatsapp set token_configurado = v_final is not null, token_final = v_final where clinica_id = p_clinica and padrao and excluido_em is null;
    elsif p_provedor = 'certificado_fiscal' then
      update public.configuracao_nota_fiscal set certificado_senha_configurada = v_final is not null where clinica_id = p_clinica and excluido_em is null;
    end if;
  end if;
  return v_final;
end $function$;
