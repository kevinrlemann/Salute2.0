-- WhatsApp (Evolution) configurado uma vez pela equipe da Salute.
-- O endereço padrão fica na configuração da plataforma; a chave padrão fica no cofre (salvar_segredo com clínica nula).
-- Toda clínica que não tem chave própria usa o padrão, então o cliente só escaneia o QR Code.
insert into public.ia_plataforma_config (chave, valor, atualizado_em)
select 'evolution_url', 'https://evolution.saluteia.site', now()
where not exists (select 1 from public.ia_plataforma_config where chave = 'evolution_url');
