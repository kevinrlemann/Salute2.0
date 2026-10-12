/* PAUSA DA IA: o botão da conversa grava conversas.ia_ativa (é o que o n8n lê em agente_pode_responder); */
/* o botão do CRM grava leads.ia_ativa. Este gatilho mantém os dois iguais, nos dois sentidos, sem ping-pong */
/* (só grava quando o valor é diferente). */

create or replace function public.ia_pausa_sincronizar()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if tg_table_name = 'conversas' then
    update public.leads l
       set ia_ativa = new.ia_ativa, ia_pausada_em = new.ia_pausada_em, ia_pausada_por = new.ia_pausada_por
     where l.excluido_em is null and (l.conversa_id = new.id or l.id = new.lead_id)
       and l.ia_ativa is distinct from new.ia_ativa;
  else
    update public.conversas c
       set ia_ativa = new.ia_ativa, ia_pausada_em = new.ia_pausada_em, ia_pausada_por = new.ia_pausada_por
     where c.excluido_em is null and (c.lead_id = new.id or c.id = new.conversa_id)
       and c.ia_ativa is distinct from new.ia_ativa;
  end if;
  return null;
end $$;

create or replace trigger tg_conversas_ia_pausa_sync
  after update of ia_ativa on public.conversas
  for each row execute function public.ia_pausa_sincronizar();

create or replace trigger tg_leads_ia_pausa_sync
  after update of ia_ativa on public.leads
  for each row execute function public.ia_pausa_sincronizar();
