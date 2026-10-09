-- pg_net: chamadas HTTP saindo do banco (usado para diagnóstico das integrações da Renata).
-- Fechado para quem acessa pela API (anon/authenticated).
create extension if not exists pg_net;
revoke usage on schema net from anon, authenticated;
revoke execute on all functions in schema net from public, anon, authenticated;
