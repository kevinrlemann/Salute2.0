do $do$
declare v text; n text;
begin
  v := pg_get_functiondef('public.erros_automacao_avisar()'::regprocedure);
  n := replace(v, 'Uma automação do atendimento falhou. A equipe Salute já foi registrada no histórico.', 'Uma automação do atendimento falhou. Se acontecer de novo, fale com o suporte da Salute.');
  if n <> v then execute n; end if;
end $do$;
