-- Rastreio de origem do lead.
-- 1) Dados do anúncio (click-to-WhatsApp) guardados na conversa, sem código extra.
-- 2) Lead sem origem recebe "Não informado" da própria clínica, em vez de ficar vazio.
-- As origens são por clínica: as repetições de nome na tabela são cópias de clínicas diferentes.

alter table public.conversas add column if not exists origem_anuncio jsonb;

-- Garante a origem "Não informado" da clínica e devolve o id.
create or replace function public.origem_nao_informado(p_clinica uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare v_id uuid;
begin
  select id into v_id from public.origens_lead
   where clinica_id = p_clinica and nome = 'Não informado' and excluido_em is null
   order by ativo desc limit 1;
  if v_id is null then
    insert into public.origens_lead (clinica_id, nome, ativo, ordem)
    values (p_clinica, 'Não informado', true, 999)
    returning id into v_id;
  end if;
  return v_id;
end $$;

create or replace function public.leads_origem_padrao()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.origem_id is null then
    new.origem_id := public.origem_nao_informado(new.clinica_id);
  end if;
  return new;
end $$;

drop trigger if exists tg_leads_origem_padrao on public.leads;
create trigger tg_leads_origem_padrao
  before insert or update of origem_id on public.leads
  for each row execute function public.leads_origem_padrao();

-- Preenche os leads que estão sem origem hoje.
update public.leads set origem_id = public.origem_nao_informado(clinica_id)
 where origem_id is null;
