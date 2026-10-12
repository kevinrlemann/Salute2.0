-- Agenda por profissional e regra de avaliação da IA (2026-10-12).
-- Regras de negócio (decididas pela clínica dona do sistema):
--   · horários da agenda sempre de 30 em 30 minutos; cada procedimento dura 30 minutos ou 1 hora;
--   · a clínica escolhe se a IA agenda o procedimento direto ou se a pessoa passa antes por uma avaliação;
--   · primeira vez da pessoa: sempre marca a avaliação (regra ligada por padrão, a clínica pode desligar);
--   · se houver mais de um profissional para o procedimento, a pessoa escolhe o doutor primeiro ou o horário primeiro.
-- A regra fica no banco, então a IA não consegue contornar: o servidor troca o procedimento pela avaliação.

-- 1) a clínica decide se a primeira vez vira avaliação (ligado por padrão)
alter table public.configuracoes_clinica
  add column if not exists ia_primeira_vez_avaliacao boolean not null default true;
comment on column public.configuracoes_clinica.ia_primeira_vez_avaliacao is 'Primeira vez da pessoa na IA: marca sempre a avaliação antes do procedimento';

-- 2) a pessoa já agendou alguma coisa nesta clínica? (cancelado não conta)
create or replace function public.ia_contato_ja_agendou(p_clinica uuid, p_conversa uuid)
 returns boolean language sql stable security definer set search_path to 'public' as $$
  select exists (
    select 1
      from public.conversas cv
      join public.agendamentos x on x.clinica_id = p_clinica and x.excluido_em is null
      left join public.status_agendamento s on s.id = x.status_agendamento_id
     where cv.id = p_conversa
       and coalesce(s.chave, '') <> 'cancelado'
       and ((cv.paciente_id is not null and x.paciente_id = cv.paciente_id)
         or (cv.lead_id is not null and x.lead_id = cv.lead_id)
         or x.conversa_id = cv.id))
$$;
revoke execute on function public.ia_contato_ja_agendou(uuid, uuid) from public, anon, authenticated;

-- 3) esta conversa precisa passar pela avaliação antes de agendar procedimento?
create or replace function public.ia_precisa_avaliacao(p_clinica uuid, p_conversa uuid)
 returns boolean language sql stable security definer set search_path to 'public' as $$
  select (not coalesce(c.ia_agenda_procedimento_direto, true))
      or (coalesce(c.ia_primeira_vez_avaliacao, true) and not public.ia_contato_ja_agendou(p_clinica, p_conversa))
    from (select 1) s
    left join public.configuracoes_clinica c on c.clinica_id = p_clinica and c.excluido_em is null
$$;
revoke execute on function public.ia_precisa_avaliacao(uuid, uuid) from public, anon, authenticated;

-- 4) procedimento que de fato será agendado: o pedido, ou a avaliação quando a regra manda
create or replace function public.ia_procedimento_efetivo(p_clinica uuid, p_proc uuid, p_conversa uuid)
 returns uuid language sql stable security definer set search_path to 'public' as $$
  select case when public.ia_precisa_avaliacao(p_clinica, p_conversa)
              then (select c.ia_procedimento_avaliacao_id from public.configuracoes_clinica c where c.clinica_id = p_clinica and c.excluido_em is null limit 1)
              else p_proc end
$$;
revoke execute on function public.ia_procedimento_efetivo(uuid, uuid, uuid) from public, anon, authenticated;

-- 5) o que a IA recebe sobre a regra desta conversa (a própria IA lê isso nas políticas da clínica)
create or replace function public.ia_regra_agendamento(p_clinica uuid, p_conversa uuid)
 returns jsonb language plpgsql stable security definer set search_path to 'public' as $$
declare c record; v_av record; v_precisa boolean; v_primeira boolean; v_texto text;
begin
  select coalesce(ia_agenda_procedimento_direto, true) as direto, coalesce(ia_primeira_vez_avaliacao, true) as primeira_regra, ia_procedimento_avaliacao_id as av_id
    into c from public.configuracoes_clinica where clinica_id = p_clinica and excluido_em is null limit 1;
  if not found then c := null; end if;
  select id, nome into v_av from public.procedimentos where id = c.av_id and excluido_em is null;
  v_precisa := public.ia_precisa_avaliacao(p_clinica, p_conversa);
  v_primeira := not public.ia_contato_ja_agendou(p_clinica, p_conversa);
  v_texto := case when v_precisa
    then 'Esta pessoa ainda precisa de uma avaliação antes de qualquer procedimento. Agende a avaliação (' || coalesce(v_av.nome, 'avaliação ainda não cadastrada') || ') e não agende o procedimento direto agora.'
    else 'Esta pessoa pode agendar o procedimento direto.' end
    || ' Se houver mais de um profissional para o procedimento, pergunte UMA vez se a pessoa prefere escolher primeiro o profissional ou o horário, e aceite qualquer uma das duas ordens.'
    || ' Horários sempre de 30 em 30 minutos. Cada procedimento dura 30 minutos ou 1 hora.';
  return jsonb_build_object(
    'modo', case when coalesce(c.direto, true) then 'direto' else 'avaliacao_antes' end,
    'primeira_vez', v_primeira,
    'primeira_vez_vira_avaliacao', coalesce(c.primeira_regra, true),
    'precisa_avaliacao', v_precisa,
    'avaliacao', case when v_av.id is null then null else jsonb_build_object('id', v_av.id, 'nome', v_av.nome) end,
    'instrucao', v_texto);
end $$;
revoke execute on function public.ia_regra_agendamento(uuid, uuid) from public, anon, authenticated;

-- 6) a ferramenta da IA usa a regra por conversa (troca a chamada antiga de 2 argumentos)
do $$
declare v_def text; v_novo text;
begin
  select pg_get_functiondef(p.oid) into v_def from pg_proc p join pg_namespace n on n.oid = p.pronamespace
   where n.nspname = 'public' and p.proname = 'n8n_ferramenta';
  if v_def is not null and position('ia_procedimento_efetivo(t.clinica_id, v_proc, v_conv.id)' in v_def) = 0 then
    v_novo := replace(v_def, 'v_proc := public.ia_procedimento_efetivo(t.clinica_id, v_proc);', 'v_proc := public.ia_procedimento_efetivo(t.clinica_id, v_proc, v_conv.id);');
    assert v_novo <> v_def, 'n8n_ferramenta: chamada de procedimento efetivo não encontrada';
    execute v_novo;
  end if;
end $$;

-- 7) o contexto da conversa leva a regra para as políticas da clínica (o prompt da IA usa esse bloco)
do $$
declare v_def text; v_novo text;
begin
  select pg_get_functiondef(p.oid) into v_def from pg_proc p join pg_namespace n on n.oid = p.pronamespace
   where n.nspname = 'public' and p.proname = 'n8n_contexto';
  if v_def is not null and position('ia_regra_agendamento' in v_def) = 0 then
    v_novo := replace(v_def, '''politicas'', jsonb_build_object(',
      '''politicas'', jsonb_build_object(''agendamento'', public.ia_regra_agendamento(v_conv.clinica_id, v_conv.id), ');
    assert v_novo <> v_def, 'n8n_contexto: bloco de políticas não encontrado';
    execute v_novo;
  end if;
end $$;
