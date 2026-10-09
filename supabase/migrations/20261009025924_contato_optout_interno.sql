-- contato_optout não checa a clínica de quem chama: vira função interna.
-- As funções SECURITY DEFINER que a usam rodam como dono e continuam funcionando.
revoke execute on function public.contato_optout(uuid, text) from public, anon, authenticated;
grant execute on function public.contato_optout(uuid, text) to service_role;
