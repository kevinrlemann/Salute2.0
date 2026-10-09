-- Falha grave da automação vira aviso na área de notificações do dono/gestor da clínica
-- (uma por tipo de falha a cada alerta_dedupe_minutos, padrão 30).
create or replace function public.erros_automacao_avisar()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
declare v_min int := greatest(public.ia_param('alerta_dedupe_minutos', 30)::int, 1); v_txt text;
begin
  if new.clinica_id is null or new.codigo not in ('credencial_invalida', 'canal_sem_credencial', 'falha_permanente', 'erro_de_fluxo', 'tentativas_esgotadas') then
    return null;
  end if;
  if exists (select 1 from public.erros_automacao e where e.clinica_id = new.clinica_id and e.codigo = new.codigo and e.id <> new.id
               and e.criado_em > now() - make_interval(mins => v_min)) then
    return null;
  end if;
  v_txt := case new.codigo
    when 'canal_sem_credencial' then 'O WhatsApp da clínica está sem conexão ou sem chave. Confira em Configurações › Integrações.'
    when 'credencial_invalida' then 'O provedor do WhatsApp recusou a chave da clínica. Confira em Configurações › Integrações.'
    when 'falha_permanente' then 'Uma mensagem não pôde ser enviada pelo WhatsApp. Veja a conversa e tente de novo.'
    when 'tentativas_esgotadas' then 'A IA não conseguiu concluir um atendimento depois de várias tentativas. A conversa foi passada para a equipe.'
    else 'Uma automação do atendimento falhou. A equipe Salute já foi registrada no histórico.' end;
  perform public.ia_notificar_equipe(new.clinica_id, 'Atenção no atendimento automático', v_txt, null, true);
  return null;
end $$;

revoke execute on function public.erros_automacao_avisar() from public, anon, authenticated;

create or replace trigger tg_erros_automacao_avisar
  after insert on public.erros_automacao
  for each row execute function public.erros_automacao_avisar();
