-- Diagnóstico do anúncio: nomes dos campos do contexto quando a mensagem não traz dados de anúncio (sem conteúdo).
alter table public.conversas add column if not exists diagnostico_anuncio jsonb;
