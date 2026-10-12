-- Correção urgente (2026-10-12): a IA do WhatsApp parou depois das 15:56.
-- Causa: na migração 20261012070000, a subconsulta que lê ia_mostrar_valor usava o apelido "c".
-- Dentro de n8n_contexto e n8n_ferramenta, "c" já é uma variável (a clínica), então o banco
-- não conseguia resolver a coluna e a função falhava para toda conversa.
-- Aqui o apelido vira "cfg", sem mudar a regra.

do $$
declare v_def text; v_novo text;
begin
  select pg_get_functiondef(p.oid) into v_def from pg_proc p join pg_namespace n on n.oid = p.pronamespace
   where n.nspname = 'public' and p.proname = 'n8n_contexto';
  if v_def is not null and position('select c.ia_mostrar_valor from public.configuracoes_clinica c where c.clinica_id = p.clinica_id and c.excluido_em is null' in v_def) > 0 then
    v_novo := replace(v_def, 'select c.ia_mostrar_valor from public.configuracoes_clinica c where c.clinica_id = p.clinica_id and c.excluido_em is null',
                              'select cfg.ia_mostrar_valor from public.configuracoes_clinica cfg where cfg.clinica_id = p.clinica_id and cfg.excluido_em is null');
    assert v_novo <> v_def;
    execute v_novo;
  end if;
  select pg_get_functiondef(p.oid) into v_def from pg_proc p join pg_namespace n on n.oid = p.pronamespace
   where n.nspname = 'public' and p.proname = 'n8n_ferramenta';
  if v_def is not null and position('select c.ia_mostrar_valor from public.configuracoes_clinica c where c.clinica_id = p.clinica_id and c.excluido_em is null' in v_def) > 0 then
    v_novo := replace(v_def, 'select c.ia_mostrar_valor from public.configuracoes_clinica c where c.clinica_id = p.clinica_id and c.excluido_em is null',
                              'select cfg.ia_mostrar_valor from public.configuracoes_clinica cfg where cfg.clinica_id = p.clinica_id and cfg.excluido_em is null');
    assert v_novo <> v_def;
    execute v_novo;
  end if;
end $$;
