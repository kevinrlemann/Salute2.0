-- Follow-up só nasce com o atendimento automático ligado (antes as tarefas se acumulavam e venciam sem uso).
do $$
declare v_def text := pg_get_functiondef('public.mensagem_automacao'::regproc);
        v_alvo text := 'if new.direcao = ''enviada'' and a.id is not null and a.followup_ativo and cv.lead_id is not null';
begin
  if position('a.ia_ativa and a.followup_ativo' in v_def) > 0 then return; end if;
  if position(v_alvo in v_def) = 0 then raise exception 'mensagem_automacao: trecho do follow-up não encontrado'; end if;
  execute replace(v_def, v_alvo, 'if new.direcao = ''enviada'' and a.id is not null and a.ia_ativa and a.followup_ativo and cv.lead_id is not null');
end $$;
