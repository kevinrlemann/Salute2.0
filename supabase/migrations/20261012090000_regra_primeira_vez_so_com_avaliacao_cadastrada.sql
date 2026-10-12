-- A regra "primeira vez vira avaliação" só vale quando a clínica já cadastrou o procedimento de avaliação.
-- Sem essa escolha, a IA ficaria sem agendar para contatos novos. A escolha explícita "só avaliação" continua valendo.

create or replace function public.ia_precisa_avaliacao(p_clinica uuid, p_conversa uuid)
 returns boolean language sql stable security definer set search_path to 'public' as $$
  select (not coalesce(c.ia_agenda_procedimento_direto, true))
      or (coalesce(c.ia_primeira_vez_avaliacao, true)
          and c.ia_procedimento_avaliacao_id is not null
          and not public.ia_contato_ja_agendou(p_clinica, p_conversa))
    from (select 1) s
    left join public.configuracoes_clinica c on c.clinica_id = p_clinica and c.excluido_em is null
$$;

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
    then 'Esta pessoa precisa de uma avaliação antes de qualquer procedimento. Agende a avaliação (' || coalesce(v_av.nome, 'avaliação ainda não cadastrada') || ') e não agende o procedimento direto agora.'
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
