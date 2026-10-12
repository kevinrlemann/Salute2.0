-- Decisão do fundador (2026-10-12): a IA do WhatsApp responde todas as mensagens.
-- Antes, qualquer resposta manual da equipe (pela tela ou pelo aparelho) silenciava a IA
-- naquela conversa por 30 minutos (parâmetro minutos_silencio_apos_humano, motivo
-- "equipe_atendendo" em n8n_preparar_turno). Agora o controle é explícito: o botão
-- "IA / IA off" de cada conversa (conversas.ia_ativa) ou a transferência para a equipe.
insert into public.ia_plataforma_config (chave, valor) values ('minutos_silencio_apos_humano', '0')
on conflict (chave) do update set valor = excluded.valor, atualizado_em = now();
