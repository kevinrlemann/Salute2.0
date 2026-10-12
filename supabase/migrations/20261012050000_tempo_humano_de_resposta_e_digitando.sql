-- Tempo de resposta "humano" da IA no WhatsApp (tabela do fundador, 2026-10-12):
--   saudação curta 3 a 7 s · resposta curta 10 a 20 s · resposta longa 30 a 50 s · depois de consultar dados 60 a 120 s.
-- A espera é calculada no preflight de cada envio; os últimos segundos saem com o "digitando..." pela Evolution
-- (campo delay do sendText). Blocos seguintes da mesma resposta esperam só 3 a 8 s. Mensagens da equipe saem na hora.

create or replace function public.ia_espera_resposta(p_tipo text, p_texto text, p_bloco integer, p_analise boolean)
 returns integer language plpgsql volatile as $$
declare v_len integer := length(coalesce(p_texto, '')); v_t text := lower(coalesce(p_texto, '')); v_s numeric;
begin
  if p_tipo = 'equipe' then return 0; end if;                                   -- digitado pela equipe: imediato
  if p_tipo <> 'resposta' then return 2 + floor(random() * 3)::int; end if;     -- lembrete, follow-up, sistema
  if coalesce(p_bloco, 1) > 1 then return 3 + floor(random() * 6)::int; end if; -- continuação da mesma resposta
  if coalesce(p_analise, false) then v_s := 60 + random() * 60;                 -- consultou agenda, cadastro ou conhecimento
  elsif v_len <= 60 or v_t ~ '^(oi|ol[áa]|opa|bom dia|boa tarde|boa noite|tudo bem|e a[ií])' and v_len <= 90 then v_s := 3 + random() * 4;
  elsif v_len <= 200 then v_s := 10 + random() * 10;
  else v_s := 30 + random() * 20;
  end if;
  return greatest(1, floor(v_s))::int;
end $$;

-- a ferramenta usada pela IA no turno fica anotada na tarefa (para o tempo "analisando dados")
do $$
declare v_def text;
begin
  select pg_get_functiondef(p.oid) into v_def from pg_proc p join pg_namespace n on n.oid = p.pronamespace
   where n.nspname = 'public' and p.proname = 'n8n_ferramenta';
  if v_def is null or position('''ferramentas''' in v_def) > 0 then return; end if;
  v_def := replace(v_def,
    'if t.id is null or t.tipo <> ''processar_entrada'' then return jsonb_build_object(''ok'', false, ''codigo'', ''trava_perdida'', ''mensagem'', ''Operação não autorizada neste momento.''); end if;',
    'if t.id is null or t.tipo <> ''processar_entrada'' then return jsonb_build_object(''ok'', false, ''codigo'', ''trava_perdida'', ''mensagem'', ''Operação não autorizada neste momento.''); end if;
  update public.tarefas_automacao set payload = coalesce(payload, ''{}''::jsonb) || jsonb_build_object(''ferramentas'', coalesce((payload ->> ''ferramentas'')::int, 0) + 1) where id = p_tarefa;');
  execute v_def;
end $$;

-- a resposta leva a marca "analise" quando a IA usou ferramentas no turno
do $$
declare v_def text;
begin
  select pg_get_functiondef(p.oid) into v_def from pg_proc p join pg_namespace n on n.oid = p.pronamespace
   where n.nspname = 'public' and p.proname = 'n8n_finalizar_turno';
  if v_def is null or position('''analise''' in v_def) > 0 then return; end if;
  v_def := replace(v_def,
    'jsonb_build_object(''tarefa_id'', p_tarefa, ''config_versao'', a.config_versao),',
    'jsonb_build_object(''tarefa_id'', p_tarefa, ''config_versao'', a.config_versao, ''analise'', coalesce((t.payload ->> ''ferramentas'')::int, 0) > 0),');
  execute v_def;
end $$;

-- preflight: devolve a espera e os segundos de "digitando"; a Evolution recebe o delay no próprio envio
do $$
declare v_def text;
begin
  select pg_get_functiondef(p.oid) into v_def from pg_proc p join pg_namespace n on n.oid = p.pronamespace
   where n.nspname = 'public' and p.proname = 'n8n_envio_preflight';
  if v_def is null or position('espera_segundos' in v_def) > 0 then return; end if;
  v_def := replace(v_def, 'v_aberta boolean := true; v_inst uuid;', 'v_aberta boolean := true; v_espera integer := 0; v_dig integer := 0; v_inst uuid;');
  v_def := replace(v_def,
    'v_base := rtrim(coalesce(i.api_url, ''''), ''/'');',
    'v_espera := public.ia_espera_resposta(e.tipo, v_texto, coalesce((e.payload ->> ''bloco'')::int, 1), coalesce((e.payload ->> ''analise'')::boolean, false));
  v_dig := case when v_modo = ''texto'' and v_prov = ''evolution'' then least(v_espera, 12) else 0 end;
  v_base := rtrim(coalesce(i.api_url, ''''), ''/'');');
  v_def := replace(v_def,
    '''corpo'', jsonb_build_object(''number'', v_dest, ''text'', v_texto));',
    '''corpo'', jsonb_build_object(''number'', v_dest, ''text'', v_texto) || case when v_dig > 0 then jsonb_build_object(''delay'', v_dig * 1000) else ''{}''::jsonb end);');
  v_def := replace(v_def,
    '''pausa_segundos'', case when e.tipo = ''resposta'' then 2 + least(4, length(coalesce(v_texto, '''')) / 80) else 1 end)',
    '''pausa_segundos'', 1, ''espera_segundos'', v_espera, ''digitando_segundos'', v_dig)');
  execute v_def;
end $$;
