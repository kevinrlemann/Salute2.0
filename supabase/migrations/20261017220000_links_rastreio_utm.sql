-- Links rastreáveis com UTM (2026-10-17, pedido do fundador): saber de qual anúncio veio cada lead do WhatsApp.
-- Como funciona (grátis, sem n8n):
--  1. A clínica cria um link em Configurações › Integrações › "Links rastreáveis" (canal TikTok Ads, Google Ads, Meta Ads,
--     Facebook Ads, Instagram Ads ou outro) e cola no anúncio: https://saluteia.site/w/<codigo>?utm_source=...&utm_campaign=...
--  2. A página /w/ do site chama link_rastreio_abrir (pública): conta o clique, guarda os parâmetros (utm_*, gclid, fbclid, ttclid)
--     e manda a pessoa para o WhatsApp da clínica com a mensagem pronta terminando em "(cód. XXXXXX)".
--  3. Quando essa mensagem chega, o gatilho tg_mensagens_link_origem reconhece o código e grava conversas.origem_anuncio
--     (origem 'link'). Daí em diante vale o fluxo que já existe: funil_garantir_lead / tg_conversas_anuncio_origem põem o lead
--     em Tráfego pago › <canal>. Origem escolhida pela equipe nunca é trocada.

create table if not exists public.links_rastreio (
  id uuid primary key default gen_random_uuid(),
  clinica_id uuid not null references public.clinicas(id),
  codigo text not null,
  nome text not null,
  canal text not null default 'outro' check (canal in ('tiktok', 'google', 'meta', 'facebook', 'instagram', 'outro')),
  utm_source text, utm_medium text, utm_campaign text, utm_content text, utm_term text,
  mensagem text,
  telefone text,
  ativo boolean not null default true,
  cliques integer not null default 0,
  ultimo_clique_em timestamptz,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  criado_por uuid default auth.uid(),
  excluido_em timestamptz
);
create unique index if not exists links_rastreio_codigo_uk on public.links_rastreio (codigo);
create index if not exists links_rastreio_clinica_ix on public.links_rastreio (clinica_id) where excluido_em is null;

create table if not exists public.links_rastreio_cliques (
  id uuid primary key default gen_random_uuid(),
  clinica_id uuid not null references public.clinicas(id),
  link_id uuid not null references public.links_rastreio(id),
  parametros jsonb not null default '{}'::jsonb,
  referencia text,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  criado_por uuid,
  excluido_em timestamptz
);
create index if not exists links_rastreio_cliques_link_ix on public.links_rastreio_cliques (link_id, criado_em desc);

alter table public.links_rastreio enable row level security;
alter table public.links_rastreio_cliques enable row level security;

-- ler: quem atende (mensagens) ou vê o painel; criar/editar: quem atende ou a gestão da clínica
do $$ begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and policyname = 'links_rastreio_ler') then
    create policy links_rastreio_ler on public.links_rastreio for select using (
  clinica_id in (select public.clinicas_permitidas('mensagens')) or clinica_id in (select public.clinicas_permitidas('painel')) or clinica_id in (select public.clinicas_gestao()));
  end if;
end $$;
do $$ begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and policyname = 'links_rastreio_criar') then
    create policy links_rastreio_criar on public.links_rastreio for insert with check (
  clinica_id in (select public.clinicas_permitidas('mensagens')) or clinica_id in (select public.clinicas_gestao()));
  end if;
end $$;
do $$ begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and policyname = 'links_rastreio_editar') then
    create policy links_rastreio_editar on public.links_rastreio for update using (
  clinica_id in (select public.clinicas_permitidas('mensagens')) or clinica_id in (select public.clinicas_gestao()))
  with check (clinica_id in (select public.clinicas_permitidas('mensagens')) or clinica_id in (select public.clinicas_gestao()));
  end if;
end $$;
do $$ begin
  if not exists (select 1 from pg_policies where schemaname = 'public' and policyname = 'links_rastreio_cliques_ler') then
    create policy links_rastreio_cliques_ler on public.links_rastreio_cliques for select using (
  clinica_id in (select public.clinicas_permitidas('mensagens')) or clinica_id in (select public.clinicas_permitidas('painel')) or clinica_id in (select public.clinicas_gestao()));
  end if;
end $$;
-- cliques só entram pela função link_rastreio_abrir (security definer)

-- código curto sem letras/números que se confundem (0/O, 1/I/L)
create or replace function public.link_rastreio_codigo_novo() returns text language plpgsql volatile security definer set search_path to 'public' as $$
declare v text; a text := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; i int;
begin
  loop
    v := '';
    for i in 1..6 loop v := v || substr(a, 1 + floor(random() * length(a))::int, 1); end loop;
    exit when not exists (select 1 from public.links_rastreio where codigo = v);
  end loop;
  return v;
end $$;
revoke execute on function public.link_rastreio_codigo_novo() from anon, public;
grant execute on function public.link_rastreio_codigo_novo() to authenticated;
alter table public.links_rastreio alter column codigo set default public.link_rastreio_codigo_novo();

create or replace function public.links_rastreio_atualizado() returns trigger language plpgsql set search_path to 'public' as $$
begin new.atualizado_em := now(); new.codigo := old.codigo; new.clinica_id := old.clinica_id; return new; end $$;
do $$ begin
  if not exists (select 1 from pg_trigger where tgrelid = 'public.links_rastreio'::regclass and tgname = 'tg_links_rastreio_atualizado') then
    create trigger tg_links_rastreio_atualizado before update on public.links_rastreio for each row execute function public.links_rastreio_atualizado();
  end if;
end $$;

-- telefone de destino: o do link > WhatsApp conectado (padrão) > WhatsApp/telefone da clínica; só dígitos, com 55
create or replace function public.link_rastreio_telefone(p_link public.links_rastreio) returns text language plpgsql stable security definer set search_path to 'public' as $$
declare v text;
begin
  v := nullif(regexp_replace(coalesce(p_link.telefone, ''), '\D', '', 'g'), '');
  if v is null then
    select nullif(regexp_replace(coalesce(i.numero, ''), '\D', '', 'g'), '') into v from public.instancias_whatsapp i
     where i.clinica_id = p_link.clinica_id and i.excluido_em is null and coalesce(i.numero, '') <> ''
     order by i.padrao desc nulls last, (i.status::text = 'conectado') desc, i.criado_em limit 1;
  end if;
  if v is null then
    select nullif(regexp_replace(coalesce(c.whatsapp, c.telefone, ''), '\D', '', 'g'), '') into v from public.clinicas c where c.id = p_link.clinica_id;
  end if;
  if v is not null and length(v) in (10, 11) then v := '55' || v; end if;
  return v;
end $$;
revoke execute on function public.link_rastreio_telefone(public.links_rastreio) from anon, public;

-- página pública /w/<codigo>: conta o clique e devolve o WhatsApp e a mensagem pronta (com o código)
create or replace function public.link_rastreio_abrir(p_codigo text, p_parametros jsonb default '{}'::jsonb, p_referencia text default null)
returns jsonb language plpgsql security definer set search_path to 'public' as $$
declare l public.links_rastreio; v_tel text; v_par jsonb := '{}'::jsonb; k text;
begin
  select * into l from public.links_rastreio where codigo = upper(trim(coalesce(p_codigo, ''))) and excluido_em is null;
  if l.id is null or not l.ativo then return jsonb_build_object('ok', false, 'erro', 'link_inexistente'); end if;
  v_tel := public.link_rastreio_telefone(l);
  if v_tel is null then return jsonb_build_object('ok', false, 'erro', 'sem_telefone'); end if;
  -- guarda só os parâmetros de campanha conhecidos, com tamanho limitado
  if jsonb_typeof(p_parametros) = 'object' then
    foreach k in array array['utm_source','utm_medium','utm_campaign','utm_content','utm_term','utm_id','gclid','gbraid','wbraid','fbclid','ttclid','campaign_id','adset_id','ad_id'] loop
      if p_parametros ? k then v_par := v_par || jsonb_build_object(k, left(p_parametros->>k, 200)); end if;
    end loop;
  end if;
  insert into public.links_rastreio_cliques (clinica_id, link_id, parametros, referencia) values (l.clinica_id, l.id, v_par, left(p_referencia, 300));
  update public.links_rastreio set cliques = cliques + 1, ultimo_clique_em = now() where id = l.id;
  return jsonb_build_object('ok', true, 'telefone', v_tel,
    'mensagem', coalesce(nullif(trim(l.mensagem), ''), 'Olá! Vi o anúncio e gostaria de mais informações.') || ' (cód. ' || l.codigo || ')');
end $$;
revoke execute on function public.link_rastreio_abrir(text, jsonb, text) from public;
grant execute on function public.link_rastreio_abrir(text, jsonb, text) to anon, authenticated;

-- Tráfego pago: o canal escolhido no link vale primeiro; utm_source=meta passa a ser "Meta Ads"
create or replace function public.origem_do_anuncio(p_clinica uuid, p_anuncio jsonb)
returns uuid language plpgsql security definer set search_path to 'public' as $$
declare v_txt text; v_nome text; v_cor text; v_ic text; v_ord integer; v_canal text;
begin
  if p_anuncio is null or p_anuncio = '{}'::jsonb then return null; end if;
  v_canal := lower(coalesce(p_anuncio->>'canal', ''));
  v_txt := lower(coalesce(p_anuncio->>'url', '') || ' ' || coalesce(p_anuncio->>'titulo', '') || ' ' || coalesce(p_anuncio->>'corpo', '') || ' ' || coalesce(p_anuncio->>'origem', ''));
  if v_canal = 'tiktok' or (v_canal in ('', 'outro') and v_txt ~ 'utm_source=tiktok|tiktok\.com|ttclid=') then v_nome := 'TikTok Ads'; v_cor := '#111111'; v_ic := 'music-2'; v_ord := 1;
  elsif v_canal = 'google' or (v_canal in ('', 'outro') and v_txt ~ 'utm_source=google|utm_source=youtube|gclid=|gbraid=|wbraid=|google\.|youtube\.com|youtu\.be|g\.co/') then v_nome := 'Google Ads'; v_cor := '#1A73E8'; v_ic := 'search'; v_ord := 2;
  elsif v_canal = 'meta' or (v_canal in ('', 'outro') and v_txt ~ 'utm_source=meta') then v_nome := 'Meta Ads'; v_cor := '#0866FF'; v_ic := 'infinity'; v_ord := 3;
  elsif v_canal = 'instagram' or (v_canal in ('', 'outro') and v_txt ~ 'utm_source=ig|utm_source=instagram|instagram\.com|ig\.me|igshid=') then v_nome := 'Instagram Ads'; v_cor := '#E1306C'; v_ic := 'instagram'; v_ord := 4;
  elsif v_canal = 'facebook' or (v_canal in ('', 'outro') and v_txt ~ 'utm_source=fb|utm_source=facebook|facebook\.com|fb\.com|fb\.me|fb\.watch|fbclid=|messenger\.com') then v_nome := 'Facebook Ads'; v_cor := '#1877F2'; v_ic := 'facebook'; v_ord := 5;
  else v_nome := 'Outros anúncios'; v_cor := '#6F8FD8'; v_ic := 'megaphone'; v_ord := 9;
  end if;
  return public.origem_garantir(p_clinica, v_nome, 'Tráfego pago', v_cor, v_ic, v_ord);
end $$;
revoke execute on function public.origem_do_anuncio(uuid, jsonb) from anon, public;

-- mensagem recebida com "(cód. XXXXXX)" de um link da clínica: grava a origem do anúncio na conversa
create or replace function public.mensagem_link_origem() returns trigger language plpgsql security definer set search_path to 'public' as $$
declare v_cod text; l public.links_rastreio; v_clique jsonb; v_url text;
begin
  if new.direcao::text <> 'recebida' or new.texto is null then return null; end if;
  v_cod := upper(substring(new.texto from '(?i)c[óo]d\.?\s*:?\s*([A-Za-z0-9]{6})\M'));
  if v_cod is null then return null; end if;
  select * into l from public.links_rastreio where codigo = v_cod and clinica_id = new.clinica_id and excluido_em is null;
  if l.id is null then return null; end if;
  select parametros into v_clique from public.links_rastreio_cliques where link_id = l.id order by criado_em desc limit 1;
  v_url := 'https://saluteia.site/w/' || l.codigo || '?' || concat_ws('&',
    case when l.utm_source is not null then 'utm_source=' || l.utm_source end,
    case when l.utm_medium is not null then 'utm_medium=' || l.utm_medium end,
    case when l.utm_campaign is not null then 'utm_campaign=' || l.utm_campaign end,
    case when l.utm_content is not null then 'utm_content=' || l.utm_content end);
  update public.conversas set origem_anuncio = jsonb_strip_nulls(jsonb_build_object(
      'origem', 'link', 'link_id', l.id, 'codigo', l.codigo, 'canal', l.canal, 'titulo', l.nome, 'url', v_url,
      'utm_source', l.utm_source, 'utm_medium', l.utm_medium, 'utm_campaign', l.utm_campaign, 'utm_content', l.utm_content, 'utm_term', l.utm_term,
      'clique', v_clique))
   where id = new.conversa_id and (origem_anuncio is null or origem_anuncio = '{}'::jsonb);
  return null;
exception when others then
  return null; -- nunca impedir a mensagem de entrar por causa do rastreio
end $$;
do $$ begin
  if not exists (select 1 from pg_trigger where tgrelid = 'public.mensagens'::regclass and tgname = 'tg_mensagens_link_origem') then
    create trigger tg_mensagens_link_origem after insert on public.mensagens for each row execute function public.mensagem_link_origem();
  end if;
end $$;

-- resumo por link para a tela: cliques, leads e convertidos
create or replace function public.links_rastreio_resumo(p_clinica uuid)
returns table (link_id uuid, cliques integer, leads bigint, convertidos bigint, ultimo_clique_em timestamptz)
language plpgsql stable security definer set search_path to 'public' as $$
begin
  if not (p_clinica in (select public.clinicas_permitidas('mensagens')) or p_clinica in (select public.clinicas_permitidas('painel')) or p_clinica in (select public.clinicas_gestao())) then
    raise exception 'Sem acesso a esta clínica' using errcode = '42501';
  end if;
  return query
  select l.id, l.cliques,
    (select count(distinct cv.id) from public.conversas cv where cv.clinica_id = p_clinica and cv.excluido_em is null and cv.origem_anuncio->>'link_id' = l.id::text),
    (select count(distinct ld.id) from public.conversas cv join public.leads ld on ld.id = cv.lead_id and ld.excluido_em is null
       join public.etapas_funil e on e.id = ld.etapa_id and e.tipo_final::text = 'ganho'
      where cv.clinica_id = p_clinica and cv.excluido_em is null and cv.origem_anuncio->>'link_id' = l.id::text),
    l.ultimo_clique_em
  from public.links_rastreio l where l.clinica_id = p_clinica and l.excluido_em is null;
end $$;
revoke execute on function public.links_rastreio_resumo(uuid) from anon, public;
grant execute on function public.links_rastreio_resumo(uuid) to authenticated;

-- Meta Ads nasce junto com os outros subcanais de Tráfego pago em cada clínica
do $$
declare r record;
begin
  for r in select id from public.clinicas where excluido_em is null loop
    perform public.origem_garantir(r.id, 'Meta Ads', 'Tráfego pago', '#0866FF', 'infinity', 3);
  end loop;
end $$;
