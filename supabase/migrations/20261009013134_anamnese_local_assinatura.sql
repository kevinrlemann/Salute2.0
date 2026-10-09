-- Anamnese: registra o local (GPS do aparelho) em que o paciente assinou,
-- junto com IP e navegador. Se a pessoa não permitir, fica o motivo (negado, indisponível...).
alter table public.anamnese_envios add column if not exists local_assinatura jsonb;
comment on column public.anamnese_envios.local_assinatura is
  'Local da assinatura: {status: ok|negado|indisponivel|tempo_esgotado, lat, lng, precisao_m, registrado_em}';

-- só aceita o formato esperado, com números dentro dos limites
create or replace function public.anamnese_local_limpo(j jsonb)
returns jsonb
language sql
stable
set search_path = public
as $$
  select case when j is null or jsonb_typeof(j) <> 'object' then null else jsonb_strip_nulls(jsonb_build_object(
    'status', case when j ->> 'status' in ('ok', 'negado', 'indisponivel', 'tempo_esgotado') then j ->> 'status' else 'indisponivel' end,
    'lat', case when j ->> 'status' = 'ok' and (j ->> 'lat') ~ '^-?\d{1,2}(\.\d+)?$' and abs((j ->> 'lat')::numeric) <= 90 then round((j ->> 'lat')::numeric, 6) end,
    'lng', case when j ->> 'status' = 'ok' and (j ->> 'lng') ~ '^-?\d{1,3}(\.\d+)?$' and abs((j ->> 'lng')::numeric) <= 180 then round((j ->> 'lng')::numeric, 6) end,
    'precisao_m', case when j ->> 'status' = 'ok' and (j ->> 'precisao') ~ '^\d{1,7}(\.\d+)?$' then round((j ->> 'precisao')::numeric) end,
    'registrado_em', now()
  )) end
$$;

do $$
declare v_def text := pg_get_functiondef('public.responder_anamnese(text,jsonb)'::regprocedure);
        v_a1 text := 'texto_declaracao = v_decl,';
        v_a2 text := '|| coalesce(v_decl, '''') || ''|'' || now()::text';
begin
  if position('local_assinatura' in v_def) > 0 then return; end if;
  if position(v_a1 in v_def) = 0 or position(v_a2 in v_def) = 0 then
    raise exception 'responder_anamnese: trechos esperados não encontrados';
  end if;
  v_def := replace(v_def, v_a1, v_a1 || E'\n         local_assinatura = case when v_ass is not null then public.anamnese_local_limpo(v_ass -> ''local'') end,');
  v_def := replace(v_def, v_a2, '|| coalesce(v_decl, '''') || ''|'' || coalesce(v_ass -> ''local'' ->> ''lat'', '''') || '','' || coalesce(v_ass -> ''local'' ->> ''lng'', '''') || ''|'' || now()::text');
  execute v_def;
end $$;
