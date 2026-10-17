-- Plano e cobrança (decisão do fundador, 2026-10-17): o plano Enterprise sai da tela. Fica guardado (ativo = false) para voltar se um dia for preciso.
-- Nenhuma clínica está nele (conferido no banco antes de aplicar).
update public.planos set ativo = false, atualizado_em = now() where codigo = 'enterprise' and ativo;
