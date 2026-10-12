-- Uso da IA contado por origem (Renata por texto, Renata por voz, respostas no WhatsApp) e
-- limite mensal por clínica definido pelo administrador master (em branco = o do plano).
-- A soma continua em renata_consumo.mensagens_ia, que o limite mensal já usa.

alter table public.renata_consumo add column if not exists mensagens_renata_texto integer not null default 0;
alter table public.renata_consumo add column if not exists mensagens_renata_voz integer not null default 0;
alter table public.renata_consumo add column if not exists mensagens_whatsapp integer not null default 0;
alter table public.clinicas add column if not exists limite_mensagens_ia integer;
comment on column public.clinicas.limite_mensagens_ia is 'Limite mensal de mensagens de IA desta clínica (nulo = o do plano). Só o administrador master altera.';
comment on column public.renata_consumo.mensagens_renata_texto is 'Perguntas feitas à Renata por texto no mês';
comment on column public.renata_consumo.mensagens_renata_voz is 'Perguntas feitas à Renata por voz no mês';
comment on column public.renata_consumo.mensagens_whatsapp is 'Respostas da IA enviadas no WhatsApp no mês';

-- o que já foi contado antes desta migração era da Renata (o WhatsApp ainda não respondia)
update public.renata_consumo set mensagens_renata_texto = mensagens_ia
 where mensagens_renata_texto = 0 and mensagens_renata_voz = 0 and mensagens_whatsapp = 0 and mensagens_ia > 0;

-- registro com origem (sem valor padrão de propósito: a versão de 6 parâmetros abaixo continua valendo)
create or replace function public.renata_registrar_consumo(p_clinica uuid, p_mensagens integer, p_tokens_entrada bigint, p_tokens_saida bigint, p_caracteres_voz bigint, p_segundos numeric, p_origem text)
 returns void language plpgsql security definer set search_path to 'public' as $$
declare v_tz text; v_ano integer; v_mes integer; v_tx integer := 0; v_vz integer := 0; v_wa integer := 0;
begin
  if p_origem = 'renata_voz' then v_vz := coalesce(p_mensagens, 0);
  elsif p_origem = 'whatsapp' then v_wa := coalesce(p_mensagens, 0);
  else v_tx := coalesce(p_mensagens, 0); end if;
  select coalesce(fuso_horario, 'America/Sao_Paulo') into v_tz from public.clinicas where id = p_clinica;
  v_ano := extract(year from now() at time zone coalesce(v_tz, 'America/Sao_Paulo'));
  v_mes := extract(month from now() at time zone coalesce(v_tz, 'America/Sao_Paulo'));
  update public.renata_consumo
     set mensagens_ia = mensagens_ia + coalesce(p_mensagens, 0),
         mensagens_renata_texto = mensagens_renata_texto + v_tx, mensagens_renata_voz = mensagens_renata_voz + v_vz, mensagens_whatsapp = mensagens_whatsapp + v_wa,
         tokens_entrada = tokens_entrada + coalesce(p_tokens_entrada, 0), tokens_saida = tokens_saida + coalesce(p_tokens_saida, 0),
         caracteres_voz = caracteres_voz + coalesce(p_caracteres_voz, 0), segundos_transcricao = segundos_transcricao + coalesce(p_segundos, 0),
         atualizado_em = now()
   where clinica_id = p_clinica and ano = v_ano and mes = v_mes and excluido_em is null;
  if not found then
    insert into public.renata_consumo (clinica_id, ano, mes, mensagens_ia, mensagens_renata_texto, mensagens_renata_voz, mensagens_whatsapp,
                                       tokens_entrada, tokens_saida, caracteres_voz, segundos_transcricao)
    values (p_clinica, v_ano, v_mes, coalesce(p_mensagens, 0), v_tx, v_vz, v_wa,
            coalesce(p_tokens_entrada, 0), coalesce(p_tokens_saida, 0), coalesce(p_caracteres_voz, 0), coalesce(p_segundos, 0));
  end if;
end $$;

-- versão antiga (6 parâmetros) passa a contar como Renata por texto
create or replace function public.renata_registrar_consumo(p_clinica uuid, p_mensagens integer, p_tokens_entrada bigint, p_tokens_saida bigint, p_caracteres_voz bigint, p_segundos numeric)
 returns void language plpgsql security definer set search_path to 'public' as $$
begin
  perform public.renata_registrar_consumo(p_clinica, p_mensagens, p_tokens_entrada, p_tokens_saida, p_caracteres_voz, p_segundos, 'renata_texto');
end $$;
revoke execute on function public.renata_registrar_consumo(uuid, integer, bigint, bigint, bigint, numeric, text) from anon, authenticated;
revoke execute on function public.renata_registrar_consumo(uuid, integer, bigint, bigint, bigint, numeric) from anon, authenticated;

-- limite do mês: mês corrente (renata_consumo.limite_mensagens) > clínica > plano; traz a divisão por origem
create or replace function public.renata_limite_mes(p_clinica uuid)
 returns jsonb language sql stable security definer set search_path to 'public' as $$
  with tz as (
    select coalesce((select fuso_horario from public.clinicas where id = p_clinica), 'America/Sao_Paulo') as fuso
  ), mes as (
    select extract(year from now() at time zone fuso)::int as ano, extract(month from now() at time zone fuso)::int as mes from tz
  ), cli as (
    select aprovada_em is not null as ok, limite_mensagens_ia as limite from public.clinicas where id = p_clinica
  ), plano as (
    select pl.limite_mensagens_ia as limite
      from public.assinaturas_clinica a join public.planos pl on pl.id = a.plano_id
     where a.clinica_id = p_clinica and a.excluido_em is null
     limit 1
  ), uso as (
    select c.mensagens_ia, c.mensagens_renata_texto, c.mensagens_renata_voz, c.mensagens_whatsapp, c.limite_mensagens from public.renata_consumo c, mes
     where c.clinica_id = p_clinica and c.ano = mes.ano and c.mes = mes.mes and c.excluido_em is null
     limit 1
  )
  select jsonb_build_object(
    'usadas', coalesce((select mensagens_ia from uso), 0),
    'renata_texto', coalesce((select mensagens_renata_texto from uso), 0),
    'renata_voz', coalesce((select mensagens_renata_voz from uso), 0),
    'whatsapp', coalesce((select mensagens_whatsapp from uso), 0),
    'limite', case when not coalesce((select ok from cli), false) then 0
                   else coalesce((select limite_mensagens from uso), (select limite from cli), (select limite from plano)) end,
    'ilimitado', coalesce((select ok from cli), false) and exists (select 1 from plano where limite is null)
                 and (select limite_mensagens from uso) is null and (select limite from cli) is null
  )
$$;

-- o atendimento no WhatsApp também para quando o limite do mês acaba
do $$
declare v_def text;
begin
  select pg_get_functiondef(p.oid) into v_def from pg_proc p join pg_namespace n on n.oid = p.pronamespace
   where n.nspname = 'public' and p.proname = 'agente_pode_responder';
  if v_def is null or position('limite_mensagens' in v_def) > 0 then return; end if;
  v_def := replace(v_def, 'declare cv record; a record; cl record;', 'declare cv record; a record; cl record; v_lim jsonb;');
  v_def := replace(v_def,
    'if a.automacoes_pausadas then return jsonb_build_object(''pode'', false, ''motivo'', ''automacoes_pausadas''); end if;',
    'if a.automacoes_pausadas then return jsonb_build_object(''pode'', false, ''motivo'', ''automacoes_pausadas''); end if;
  v_lim := public.renata_limite_mes(cv.clinica_id);
  if not coalesce((v_lim ->> ''ilimitado'')::boolean, false) and (v_lim ->> ''usadas'')::int >= coalesce((v_lim ->> ''limite'')::int, 300) then
    return jsonb_build_object(''pode'', false, ''motivo'', ''limite_mensagens'');
  end if;');
  execute v_def;
end $$;

-- resposta da IA no WhatsApp conta na coluna certa
do $$
declare v_def text;
begin
  select pg_get_functiondef(p.oid) into v_def from pg_proc p join pg_namespace n on n.oid = p.pronamespace
   where n.nspname = 'public' and p.proname = 'n8n_finalizar_turno';
  if v_def is null or position('''whatsapp''' in v_def) > 0 then return; end if;
  v_def := replace(v_def, 'perform public.renata_registrar_consumo(t.clinica_id, 1, 0, 0, 0, 0);', 'perform public.renata_registrar_consumo(t.clinica_id, 1, 0, 0, 0, 0, ''whatsapp'');');
  execute v_def;
end $$;

-- leitura para a tela Plano e cobrança (quem é da clínica ou o administrador master)
create or replace function public.ia_uso(p_clinica uuid, p_meses integer default 6)
 returns jsonb language sql stable security definer set search_path to 'public' as $$
  select case when not (p_clinica in (select public.minhas_clinicas()) or public.eh_admin_plataforma()) then null else
  jsonb_build_object(
    'atual', public.renata_limite_mes(p_clinica),
    'limite_clinica', (select limite_mensagens_ia from public.clinicas where id = p_clinica),
    'limite_plano', (select pl.limite_mensagens_ia from public.assinaturas_clinica a join public.planos pl on pl.id = a.plano_id where a.clinica_id = p_clinica and a.excluido_em is null limit 1),
    'plano', (select pl.nome from public.assinaturas_clinica a join public.planos pl on pl.id = a.plano_id where a.clinica_id = p_clinica and a.excluido_em is null limit 1),
    'meses', (select coalesce(jsonb_agg(jsonb_build_object('ano', c.ano, 'mes', c.mes, 'renata_texto', c.mensagens_renata_texto, 'renata_voz', c.mensagens_renata_voz,
                 'whatsapp', c.mensagens_whatsapp, 'total', c.mensagens_ia, 'tokens', c.tokens_entrada + c.tokens_saida, 'caracteres_voz', c.caracteres_voz) order by c.ano desc, c.mes desc), '[]'::jsonb)
              from (select * from public.renata_consumo where clinica_id = p_clinica and excluido_em is null order by ano desc, mes desc limit greatest(1, least(coalesce(p_meses, 6), 24))) c)
  ) end
$$;
revoke execute on function public.ia_uso(uuid, integer) from anon;

-- só o administrador master define o limite de uma clínica (nulo volta para o do plano)
create or replace function public.admin_definir_limite_ia(p_clinica uuid, p_limite integer)
 returns jsonb language plpgsql security definer set search_path to 'public' as $$
begin
  if not public.eh_admin_plataforma() then raise exception 'Só o administrador master altera o limite de IA' using errcode = '42501'; end if;
  if p_limite is not null and p_limite < 0 then raise exception 'Limite inválido'; end if;
  update public.clinicas set limite_mensagens_ia = p_limite, atualizado_em = now() where id = p_clinica;
  return public.renata_limite_mes(p_clinica);
end $$;
revoke execute on function public.admin_definir_limite_ia(uuid, integer) from anon;
