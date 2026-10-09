-- P1-12 / B5: funções de gatilho não precisam de EXECUTE para rodar; fecha para anon/authenticated.
revoke execute on function public.criar_perfil_usuario() from public, anon, authenticated;
revoke execute on function public.set_ia_config_atualizado_em() from public, anon, authenticated;
revoke execute on function public.agente_ia_versao() from public, anon, authenticated;
revoke execute on function public.agendamento_versao() from public, anon, authenticated;
alter function public.set_ia_config_atualizado_em() set search_path = public;
