-- Cibersegurança (2026-10-17): o advisor do Supabase achou 12 funções SECURITY DEFINER executáveis sem login (anon).
-- Causa: o padrão do Postgres dá EXECUTE a PUBLIC em toda função nova; as migrations recentes não fizeram o revoke.
-- Correção: (1) tirar PUBLIC dessas funções; RPCs usadas pela tela continuam com authenticated (grant explícito);
-- funções de gatilho e auxiliares internas não precisam de EXECUTE para usuário nenhum.
-- (2) causa raiz: funções novas criadas pelo postgres deixam de nascer abertas a PUBLIC.
-- Funções públicas de propósito (anamnese, envio de documentos, link de anúncio) já têm grant explícito para anon e não mudam.

revoke execute on function public.agenda_acesso_definir(uuid, uuid, uuid[]) from public, anon;
revoke execute on function public.agenda_profissionais_visiveis(uuid) from public, anon;
revoke execute on function public.agenda_visivel(uuid, uuid) from public, anon;
revoke execute on function public.atendente_virtual(uuid) from public, anon;
revoke execute on function public.definir_atendente_virtual(uuid, text) from public, anon;
grant execute on function public.agenda_acesso_definir(uuid, uuid, uuid[]) to authenticated, service_role;
grant execute on function public.agenda_profissionais_visiveis(uuid) to authenticated, service_role;
grant execute on function public.agenda_visivel(uuid, uuid) to authenticated, service_role;
grant execute on function public.atendente_virtual(uuid) to authenticated, service_role;
grant execute on function public.definir_atendente_virtual(uuid, text) to authenticated, service_role;

-- gatilhos e auxiliar interna: ninguém chama pela API
revoke execute on function public.anexo_despertar_envio() from public, anon, authenticated;
revoke execute on function public.conversa_anuncio_origem() from public, anon, authenticated;
revoke execute on function public.ia_pausa_sincronizar() from public, anon, authenticated;
revoke execute on function public.leads_origem_padrao() from public, anon, authenticated;
revoke execute on function public.mensagem_indicacao_origem() from public, anon, authenticated;
revoke execute on function public.mensagem_link_origem() from public, anon, authenticated;
revoke execute on function public.whatsapp_avisar_queda() from public, anon, authenticated;
revoke execute on function public.origem_eh_automatica(uuid) from public, anon, authenticated;

-- causa raiz: função nova do postgres não nasce executável por PUBLIC (anon). authenticated e service_role continuam
-- recebendo pelo padrão do schema public. Função pública de propósito precisa de "grant execute ... to anon" explícito.
alter default privileges for role postgres revoke execute on functions from public;
