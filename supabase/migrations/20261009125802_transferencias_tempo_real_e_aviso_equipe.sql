-- Conversas que a IA passou para a equipe: aparecem na hora no front (tempo real) e avisam a equipe
-- mesmo quando a clínica não escolheu responsáveis na aba Agente de IA.
do $do$
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'transferencias_humanas') then
    execute 'alter publication supabase_realtime add table public.transferencias_humanas';
  end if;
end $do$;

do $do$
declare v text; n text;
begin
  v := pg_get_functiondef('public.transferir_para_humano(uuid,text,text,text)'::regprocedure);
  if position('Conversa aguardando a equipe' in v) = 0 then
    n := replace(v, $a$from unnest(coalesce(a.transferencia_usuarios, '{}'::uuid[])) u;$a$,
      $b$from unnest(coalesce(a.transferencia_usuarios, '{}'::uuid[])) u;
    -- sem responsáveis escolhidos: avisa quem atende as conversas da clínica
    if coalesce(array_length(a.transferencia_usuarios, 1), 0) = 0 then
      perform public.ia_notificar_equipe(cv.clinica_id, 'Conversa aguardando a equipe', coalesce(cv.nome_contato, cv.telefone) || ': ' || coalesce(p_motivo, ''), cv.id);
    end if;$b$);
    if n = v then raise exception 'trecho de transferir_para_humano não encontrado'; end if;
    execute n;
  end if;
end $do$;
