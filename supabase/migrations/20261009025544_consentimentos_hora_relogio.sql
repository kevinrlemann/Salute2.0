-- Consentimento: o último evento decide, então a hora precisa ser a do relógio (clock_timestamp), não a do
-- início da transação (now()); dois eventos na mesma transação ficavam empatados (achado pelo teste de aceite).
alter table public.consentimentos alter column capturado_em set default clock_timestamp();
