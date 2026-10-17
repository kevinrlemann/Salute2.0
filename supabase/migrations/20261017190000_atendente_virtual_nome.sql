-- Nome da atendente virtual por clínica (2026-10-17, pedido do fundador).
-- A clínica escolhe como a IA do WhatsApp se apresenta (padrão: Renata). O nome mora em agente_ia.nome, que só o
-- administrador master edita pela aba Agente de IA; estas duas funções abrem SÓ o nome para a gestão da clínica.
-- A Renata de dentro do sistema continua se chamando Renata (marca da Salute).

create or replace function public.atendente_virtual(p_clinica uuid)
returns jsonb
language sql stable security definer set search_path = public
as $$
  select case when p_clinica in (select public.minhas_clinicas()) or public.eh_admin_plataforma()
    then coalesce((select jsonb_build_object('nome', a.nome, 'apresentacao', a.apresentacao, 'saudacao', a.saudacao)
                     from public.agente_ia a where a.clinica_id = p_clinica and a.excluido_em is null limit 1),
                  jsonb_build_object('nome', 'Renata', 'apresentacao', 'Sou a Renata, assistente virtual da clínica.',
                                     'saudacao', 'Olá! Sou a Renata, assistente virtual da clínica. Como posso ajudar?'))
    else null end;
$$;
revoke execute on function public.atendente_virtual(uuid) from anon;

create or replace function public.definir_atendente_virtual(p_clinica uuid, p_nome text)
returns jsonb
language plpgsql security definer set search_path = public
as $$
declare v_nome text := btrim(coalesce(p_nome, '')); v_antigo text; v_id uuid;
begin
  if not (p_clinica in (select public.clinicas_gestao()) or public.eh_admin_plataforma()) then
    raise exception 'Sem acesso a esta clínica' using errcode = '42501';
  end if;
  if v_nome = '' then v_nome := 'Renata'; end if;
  if length(v_nome) > 40 or v_nome !~ '^[[:alpha:][:space:].''-]+$' then
    raise exception 'Nome inválido: use só letras, até 40 caracteres' using errcode = '22023';
  end if;
  select id, nome into v_id, v_antigo from public.agente_ia where clinica_id = p_clinica and excluido_em is null limit 1;
  if v_id is null then
    insert into public.agente_ia (clinica_id, nome, apresentacao, saudacao)
      values (p_clinica, v_nome, 'Sou a ' || v_nome || ', assistente virtual da clínica.',
              'Olá! Sou a ' || v_nome || ', assistente virtual da clínica. Como posso ajudar?');
  elsif v_antigo is distinct from v_nome then
    -- troca o nome também na apresentação e na saudação, onde o nome antigo aparecia
    update public.agente_ia set nome = v_nome,
      apresentacao = replace(coalesce(apresentacao, ''), coalesce(v_antigo, 'Renata'), v_nome),
      saudacao = replace(coalesce(saudacao, ''), coalesce(v_antigo, 'Renata'), v_nome),
      config_versao = coalesce(config_versao, 1) + 1
      where id = v_id;
  end if;
  return public.atendente_virtual(p_clinica);
end;
$$;
revoke execute on function public.definir_atendente_virtual(uuid, text) from anon;

-- Regras do Agente de IA: o nome escolhido vale para o WhatsApp; dentro do sistema a assistente continua sendo a Renata.
do $$
declare d text;
begin
  select pg_get_functiondef(p.oid) into d from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname = 'agente_ia_regras';
  if d like '%''- Seu nome é '' || a.nome || ''. '' || a.apresentacao,%' then
    d := replace(d, '''- Seu nome é '' || a.nome || ''. '' || a.apresentacao,',
      '''- Seu nome é '' || case when v_wpp then a.nome else ''Renata'' end || ''. '' || case when v_wpp then a.apresentacao else ''Sou a Renata, assistente da equipe dentro do sistema Salute.'' end,');
    execute d;
  end if;
end $$;
