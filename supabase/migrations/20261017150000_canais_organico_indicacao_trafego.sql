-- Leads por canal (decisão do fundador, 2026-10-17): só Orgânico, Indicação, Tráfego pago (com os anúncios por baixo) e Não informado.
-- * Quem chega pelo WhatsApp de forma espontânea é Orgânico (o canal "WhatsApp" sai de cena: fica inativo, nada é apagado).
-- * Quem chega por um anúncio de clique no WhatsApp (dados em conversas.origem_anuncio, capturados pela função whatsapp) entra em
--   Tráfego pago › TikTok Ads / Google Ads / Instagram Ads / Facebook Ads / Outros anúncios, pela URL ou pelo utm_source do anúncio.
-- * Quem diz na conversa que veio por indicação vira Indicação (palavras como "indicação", "me indicou", "recomendou"), desde que a
--   origem ainda seja uma das automáticas (Orgânico, Não informado, WhatsApp). Origem escolhida pela equipe nunca é trocada.

-- origem da clínica (cria se faltar), com pai opcional
create or replace function public.origem_garantir(p_clinica uuid, p_nome text, p_pai text default null, p_cor text default null, p_icone text default null, p_ordem integer default 0)
returns uuid language plpgsql security definer set search_path to 'public' as $$
declare v_id uuid; v_pai uuid;
begin
  if p_pai is not null then
    select id into v_pai from public.origens_lead where clinica_id = p_clinica and nome = p_pai and pai_id is null and excluido_em is null order by ativo desc limit 1;
    if v_pai is null then
      insert into public.origens_lead (clinica_id, nome, cor, icone, ativo, ordem) values (p_clinica, p_pai, '#0A3FE0', 'megaphone', true, 3) returning id into v_pai;
    end if;
  end if;
  select id into v_id from public.origens_lead
   where clinica_id = p_clinica and nome = p_nome and excluido_em is null and (pai_id is not distinct from v_pai)
   order by ativo desc limit 1;
  if v_id is null then
    insert into public.origens_lead (clinica_id, nome, cor, icone, ativo, ordem, pai_id)
    values (p_clinica, p_nome, p_cor, p_icone, true, p_ordem, v_pai) returning id into v_id;
  elsif not exists (select 1 from public.origens_lead where id = v_id and ativo) then
    update public.origens_lead set ativo = true where id = v_id;
  end if;
  return v_id;
end $$;
revoke execute on function public.origem_garantir(uuid, text, text, text, text, integer) from anon, public;

create or replace function public.origem_organico(p_clinica uuid) returns uuid language sql security definer set search_path to 'public' as $$
  select public.origem_garantir(p_clinica, 'Orgânico', null, '#22C3F2', 'sprout', 1);
$$;
revoke execute on function public.origem_organico(uuid) from anon, public;

-- classifica o anúncio (URL, utm_source, título) num subcanal de Tráfego pago
create or replace function public.origem_do_anuncio(p_clinica uuid, p_anuncio jsonb)
returns uuid language plpgsql security definer set search_path to 'public' as $$
declare v_txt text; v_nome text; v_cor text; v_ic text; v_ord integer;
begin
  if p_anuncio is null or p_anuncio = '{}'::jsonb then return null; end if;
  v_txt := lower(coalesce(p_anuncio->>'url', '') || ' ' || coalesce(p_anuncio->>'titulo', '') || ' ' || coalesce(p_anuncio->>'corpo', '') || ' ' || coalesce(p_anuncio->>'origem', ''));
  if v_txt ~ 'utm_source=tiktok|tiktok\.com|ttclid=' then v_nome := 'TikTok Ads'; v_cor := '#111111'; v_ic := 'music-2'; v_ord := 1;
  elsif v_txt ~ 'utm_source=google|utm_source=youtube|gclid=|google\.|youtube\.com|youtu\.be|g\.co/' then v_nome := 'Google Ads'; v_cor := '#1A73E8'; v_ic := 'search'; v_ord := 2;
  elsif v_txt ~ 'utm_source=ig|utm_source=instagram|instagram\.com|ig\.me|igshid=' then v_nome := 'Instagram Ads'; v_cor := '#E1306C'; v_ic := 'instagram'; v_ord := 3;
  elsif v_txt ~ 'utm_source=fb|utm_source=facebook|utm_source=meta|facebook\.com|fb\.com|fb\.me|fb\.watch|fbclid=|messenger\.com' then v_nome := 'Facebook Ads'; v_cor := '#1877F2'; v_ic := 'facebook'; v_ord := 4;
  else v_nome := 'Outros anúncios'; v_cor := '#6F8FD8'; v_ic := 'megaphone'; v_ord := 9;
  end if;
  return public.origem_garantir(p_clinica, v_nome, 'Tráfego pago', v_cor, v_ic, v_ord);
end $$;
revoke execute on function public.origem_do_anuncio(uuid, jsonb) from anon, public;

-- compatibilidade: quem ainda chamar origem_whatsapp recebe Orgânico
create or replace function public.origem_whatsapp(p_clinica uuid) returns uuid language plpgsql security definer set search_path to 'public' as $$
begin
  if coalesce(auth.role(), '') <> 'service_role' and not (p_clinica in (select public.minhas_clinicas())) then
    raise exception 'Sem acesso a esta clínica' using errcode = '42501';
  end if;
  return public.origem_organico(p_clinica);
end $$;

-- lead criado a partir da conversa: anúncio (se houver) senão Orgânico
create or replace function public.funil_garantir_lead(p_conversa uuid)
returns uuid language plpgsql security definer set search_path to 'public' as $$
declare cv record; v_lead uuid; v_funil uuid; v_etapa uuid; v_nome text; v_origem uuid;
begin
  select * into cv from public.conversas where id = p_conversa and excluido_em is null;
  if cv.id is null then return null; end if;
  if cv.lead_id is not null then return cv.lead_id; end if;
  select l.id into v_lead from public.leads l
   where l.clinica_id = cv.clinica_id and l.excluido_em is null and l.telefone = any (public.ia_tel_variantes(cv.telefone))
   order by l.criado_em desc limit 1;
  if v_lead is null then
    select f.id into v_funil from public.funis f where f.clinica_id = cv.clinica_id and f.excluido_em is null and f.ativo order by f.padrao desc, f.criado_em limit 1;
    select e.id into v_etapa from public.etapas_funil e where e.funil_id = v_funil and e.excluido_em is null and e.tipo_final = 'aberta' order by e.ordem limit 1;
    if v_funil is null or v_etapa is null then return null; end if;
    select p.nome into v_nome from public.pacientes p where p.id = cv.paciente_id and p.excluido_em is null;
    v_origem := coalesce(public.origem_do_anuncio(cv.clinica_id, cv.origem_anuncio), public.origem_organico(cv.clinica_id));
    insert into public.leads (clinica_id, funil_id, etapa_id, nome, telefone, conversa_id, origem_id, ultima_interacao_em, criado_por)
    values (cv.clinica_id, v_funil, v_etapa, coalesce(v_nome, cv.nome_contato, cv.telefone), cv.telefone, cv.id, v_origem, now(), null)
    returning id into v_lead;
  else
    update public.leads set conversa_id = coalesce(conversa_id, cv.id) where id = v_lead;
  end if;
  update public.conversas set lead_id = v_lead where id = cv.id;
  return v_lead;
end $$;

-- origem "automática" (pode ser trocada pelo sistema): Orgânico, Não informado ou o antigo WhatsApp
create or replace function public.origem_eh_automatica(p_origem uuid) returns boolean language sql stable security definer set search_path to 'public' as $$
  select p_origem is null or exists (select 1 from public.origens_lead o where o.id = p_origem and o.pai_id is null and o.nome in ('Orgânico', 'Não informado', 'WhatsApp'));
$$;

-- anúncio chega depois do lead: move para o subcanal
create or replace function public.conversa_anuncio_origem() returns trigger language plpgsql security definer set search_path to 'public' as $$
declare v_origem uuid;
begin
  if new.origem_anuncio is null or new.origem_anuncio is not distinct from old.origem_anuncio then return null; end if;
  v_origem := public.origem_do_anuncio(new.clinica_id, new.origem_anuncio);
  if v_origem is null then return null; end if;
  update public.leads l set origem_id = v_origem
   where l.clinica_id = new.clinica_id and l.excluido_em is null and public.origem_eh_automatica(l.origem_id)
     and (l.id = new.lead_id or l.conversa_id = new.id or (new.lead_id is null and l.telefone = any (public.ia_tel_variantes(new.telefone))));
  return null;
end $$;
do $$ begin
  if not exists (select 1 from pg_trigger where tgrelid = 'public.conversas'::regclass and tgname = 'tg_conversas_anuncio_origem') then
    create trigger tg_conversas_anuncio_origem after update of origem_anuncio on public.conversas for each row execute function public.conversa_anuncio_origem();
  end if;
end $$;

-- a pessoa diz que veio por indicação
create or replace function public.mensagem_indicacao_origem() returns trigger language plpgsql security definer set search_path to 'public' as $$
declare cv record; v_origem uuid;
begin
  if new.direcao::text <> 'recebida' or new.texto is null then return null; end if;
  if lower(new.texto) !~ '\m(indica[cç][aã]o|indicad[oa]s?|indicou|indicaram|recomend(ou|aram|a[cç][aã]o)|por indica)' then return null; end if;
  select * into cv from public.conversas where id = new.conversa_id and excluido_em is null;
  if cv.id is null then return null; end if;
  v_origem := public.origem_garantir(cv.clinica_id, 'Indicação', null, '#7B4BC4', 'handshake', 2);
  update public.leads l set origem_id = v_origem
   where l.clinica_id = cv.clinica_id and l.excluido_em is null and public.origem_eh_automatica(l.origem_id)
     and (l.id = cv.lead_id or l.conversa_id = cv.id or (cv.lead_id is null and l.telefone = any (public.ia_tel_variantes(cv.telefone))));
  return null;
end $$;
do $$ begin
  if not exists (select 1 from pg_trigger where tgrelid = 'public.mensagens'::regclass and tgname = 'tg_mensagens_indicacao_origem') then
    create trigger tg_mensagens_indicacao_origem after insert on public.mensagens for each row execute function public.mensagem_indicacao_origem();
  end if;
end $$;

-- acerto dos dados existentes
do $$
declare r record;
begin
  perform set_config('request.jwt.claims', '{"role":"service_role"}', true);
  -- cada clínica tem os três canais principais
  for r in select id from public.clinicas where excluido_em is null loop
    perform public.origem_garantir(r.id, 'Orgânico', null, '#22C3F2', 'sprout', 1);
    perform public.origem_garantir(r.id, 'Indicação', null, '#7B4BC4', 'handshake', 2);
    perform public.origem_garantir(r.id, 'Tráfego pago', null, '#0A3FE0', 'megaphone', 3);
  end loop;
  -- subcanais antigos ganham o nome dos anúncios
  update public.origens_lead o set nome = o.nome || ' Ads'
   where o.pai_id is not null and o.nome in ('Facebook', 'Instagram', 'Google', 'TikTok') and o.excluido_em is null;
  -- leads do canal WhatsApp: anúncio se houver, senão Orgânico
  for r in select l.id, l.clinica_id, c.origem_anuncio from public.leads l
             join public.origens_lead o on o.id = l.origem_id and o.nome = 'WhatsApp' and o.pai_id is null
             left join public.conversas c on c.id = l.conversa_id
            where l.excluido_em is null loop
    update public.leads set origem_id = coalesce(public.origem_do_anuncio(r.clinica_id, r.origem_anuncio), public.origem_organico(r.clinica_id)) where id = r.id;
  end loop;
  -- canal WhatsApp sai da tela
  update public.origens_lead set ativo = false where nome = 'WhatsApp' and pai_id is null and excluido_em is null;
end $$;
