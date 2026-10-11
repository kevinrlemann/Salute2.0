/* VIGIA DO WHATSAPP (não oficial): a cada 10 minutos o banco pede à função "whatsapp" que confira */
/* se as conexões continuam ligadas. Quando uma cai (conectado -> desconectado), entra um alerta crítico. */
/*
 * Pré-requisito (fora deste arquivo, para o segredo não ir ao repositório público):
 *   select vault.create_secret(<valor aleatório longo>, 'vigia_whatsapp', 'Segredo do vigia do WhatsApp');
 * A função "whatsapp" precisa estar publicada com o tratamento do cabeçalho x-vigia-token (versão 10 ou superior).
 */

/* 1) confere o segredo enviado pelo agendador (só o serviço do banco pode chamar) */
create or replace function public.vigia_token_valido(p_token text)
returns boolean
language sql
stable
security definer
set search_path = public, vault
as $$
  select exists (select 1 from vault.decrypted_secrets s where s.name = 'vigia_whatsapp' and s.decrypted_secret = p_token);
$$;

revoke execute on function public.vigia_token_valido(text) from public, anon, authenticated;
grant execute on function public.vigia_token_valido(text) to service_role;

/* 2) quando a conexão cai, registra o alerta crítico para a clínica */
create or replace function public.whatsapp_avisar_queda()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.status = 'desconectado' and old.status = 'conectado' then
    perform public.ia_registrar_alerta('critico', 'whatsapp_desconectado', null,
      'A conexão do WhatsApp caiu. Abra Integrações e reconecte (ler o QR Code de novo).', new.clinica_id);
  end if;
  return new;
end $$;

create or replace trigger tg_whatsapp_avisar_queda
  after update of status on public.instancias_whatsapp
  for each row execute function public.whatsapp_avisar_queda();

/* 3) agendador: a cada 10 minutos chama o vigia (o segredo é lido do cofre na hora do envio) */
select cron.schedule('vigia_whatsapp', '*/10 * * * *', $$
  select net.http_post(
    url := 'https://gbhsslyoybqjvjznlave.supabase.co/functions/v1/whatsapp',
    headers := jsonb_build_object('Content-Type', 'application/json', 'x-vigia-token', (select decrypted_secret from vault.decrypted_secrets where name = 'vigia_whatsapp')),
    body := '{}'::jsonb
  );
$$);
