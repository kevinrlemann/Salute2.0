-- Leads que nascem de uma conversa do WhatsApp recebem a origem "WhatsApp" (2026-10-13).
-- Antes caíam em "Não informado" e o painel "Leads por canal" não dizia de onde vieram (38 de 43 no mês).
-- Reversível: para voltar, aponte os leads de origem "WhatsApp" para "Não informado" e recrie funil_garantir_lead
-- com a versão da migração 20261012140000 (sem origem_id). Nada é apagado nem renomeado.

-- 1) origem "WhatsApp" da clínica (cria se não existir)
create or replace function public.origem_whatsapp(p_clinica uuid)
returns uuid
language plpgsql
security definer
set search_path to 'public'
as $$
declare v_id uuid;
begin
  if coalesce(auth.role(), '') <> 'service_role' and not (p_clinica in (select public.minhas_clinicas())) then
    raise exception 'Sem acesso a esta clínica' using errcode = '42501';
  end if;
  select id into v_id from public.origens_lead where clinica_id = p_clinica and nome = 'WhatsApp' and excluido_em is null order by ativo desc limit 1;
  if v_id is null then
    insert into public.origens_lead (clinica_id, nome, ativo, ordem, cor, icone)
    values (p_clinica, 'WhatsApp', true, 5, '#25D366', 'message-circle') returning id into v_id;
  end if;
  return v_id;
end $$;
revoke execute on function public.origem_whatsapp(uuid) from public, anon;

-- 2) lead criado a partir da conversa já nasce com origem WhatsApp
create or replace function public.funil_garantir_lead(p_conversa uuid)
returns uuid
language plpgsql
security definer
set search_path to 'public'
as $$
declare cv record; v_lead uuid; v_funil uuid; v_etapa uuid; v_nome text;
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
    insert into public.leads (clinica_id, funil_id, etapa_id, nome, telefone, conversa_id, origem_id, ultima_interacao_em, criado_por)
    values (cv.clinica_id, v_funil, v_etapa, coalesce(v_nome, cv.nome_contato, cv.telefone), cv.telefone, cv.id, public.origem_whatsapp(cv.clinica_id), now(), null)
    returning id into v_lead;
  else
    update public.leads set conversa_id = coalesce(conversa_id, cv.id) where id = v_lead;
  end if;
  update public.conversas set lead_id = v_lead where id = cv.id;
  return v_lead;
end $$;

-- 3) reparo: leads "Não informado" que têm conversa no WhatsApp passam para a origem WhatsApp
do $$
declare r record; v_n int := 0;
begin
  perform set_config('request.jwt.claims', '{"role":"service_role"}', true);
  for r in
    select l.id, l.clinica_id from public.leads l
      join public.origens_lead o on o.id = l.origem_id and o.nome = 'Não informado'
     where l.excluido_em is null
       and (l.conversa_id is not null or exists (select 1 from public.conversas c where c.clinica_id = l.clinica_id and c.excluido_em is null and (c.lead_id = l.id or c.telefone = any (public.ia_tel_variantes(l.telefone)))))
  loop
    update public.leads set origem_id = public.origem_whatsapp(r.clinica_id) where id = r.id;
    v_n := v_n + 1;
  end loop;
  raise notice 'leads movidos para a origem WhatsApp: %', v_n;
end $$;
