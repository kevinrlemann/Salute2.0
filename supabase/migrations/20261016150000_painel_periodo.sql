-- Painel: indicadores por período livre (derivada de painel_mes). O período anterior tem o mesmo tamanho.
-- Já aplicada no banco em 2026-10-16; versionada aqui.
CREATE OR REPLACE FUNCTION public.painel_periodo(p_clinica uuid, p_ini date, p_fim date)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  v_tz text; v_min integer; v_funil uuid; v_res jsonb; v_mes date;
  v_ini timestamptz; v_fim timestamptz; v_ini_ant timestamptz; v_atual boolean; v_lista_fim timestamptz; v_lista boolean;
begin
  if not public.pode(p_clinica, 'painel') then raise exception 'Sem acesso ao Painel desta clínica'; end if;
  select coalesce(fuso_horario, 'America/Sao_Paulo') into v_tz from public.clinicas where id = p_clinica;
  v_tz := coalesce(v_tz, 'America/Sao_Paulo');
  if p_ini is null or p_fim is null or p_fim < p_ini or p_fim - p_ini > 400 then raise exception 'Período inválido'; end if;
  v_mes := date_trunc('month', p_ini)::date;
  v_ini := p_ini::timestamp at time zone v_tz;
  v_fim := (p_fim + 1)::timestamp at time zone v_tz;
  v_ini_ant := v_ini - (v_fim - v_ini);
  v_atual := now() >= v_ini and now() < v_fim;
  v_lista_fim := case when v_atual then greatest(v_fim, now() + interval '30 days') else v_fim end;
  v_lista := public.pode(p_clinica, 'agenda') or public.pode(p_clinica, 'pacientes');
  select tempo_medio_conversa_minutos into v_min from public.configuracoes_clinica where clinica_id = p_clinica and excluido_em is null;
  select id into v_funil from public.funis where clinica_id = p_clinica and padrao and excluido_em is null order by criado_em limit 1;
  with
  pac as (select * from public.pacientes where clinica_id = p_clinica and excluido_em is null),
  ag as (select a.*, s.chave as status_chave, coalesce(s.conta_atendimento, false) as conta_atendimento, s.nome as status_nome, s.cor as status_cor, t.chave as tipo_chave
           from public.agendamentos a
           left join public.status_agendamento s on s.id = a.status_agendamento_id
           left join public.tipos_agendamento t on t.id = a.tipo_agendamento_id
          where a.clinica_id = p_clinica and a.excluido_em is null),
  feito as (select paciente_id, inicio as quando from ag where conta_atendimento and paciente_id is not null
            union all
            select pr.paciente_id, pr.data_hora from public.procedimentos_realizados pr
             where pr.clinica_id = p_clinica and pr.excluido_em is null and pr.status = 'realizado'),
  primeiro as (select paciente_id, min(quando) as quando from feito group by paciente_id),
  agm as (select * from ag where inicio >= v_ini and inicio < v_fim and coalesce(status_chave, '') <> 'cancelado'),
  ia as (select distinct m.conversa_id, m.enviada_em >= v_ini as atual
           from public.mensagens m where m.clinica_id = p_clinica and m.enviada_por_ia and m.excluido_em is null
            and m.enviada_em >= v_ini_ant and m.enviada_em < v_fim),
  ld as (select l.*, e.ordem as etapa_ordem, e.tipo_final from public.leads l left join public.etapas_funil e on e.id = l.etapa_id
          where l.clinica_id = p_clinica and l.excluido_em is null and (v_funil is null or l.funil_id = v_funil or l.funil_id is null)),
  ldm as (select * from ld where criado_em >= v_ini and criado_em < v_fim)
  select jsonb_build_object(
    'mes', to_char(v_mes, 'YYYY-MM-DD'), 'periodo_ini', to_char(p_ini, 'YYYY-MM-DD'), 'periodo_fim', to_char(p_fim, 'YYYY-MM-DD'),
    'mes_atual', v_atual,
    'pacientes', jsonb_build_object(
      'total', (select count(*) from pac where criado_em < v_fim),
      'antigos', (select count(*) from pac p join primeiro f on f.paciente_id = p.id where p.criado_em < v_fim and f.quando < v_fim),
      'novos', (select count(*) from pac p left join primeiro f on f.paciente_id = p.id where p.criado_em < v_fim and (f.quando is null or f.quando >= v_fim)),
      'chegaram', (select count(*) from pac where criado_em >= v_ini and criado_em < v_fim),
      'total_anterior', (select count(*) from pac where criado_em < v_ini)),
    'agendamentos', jsonb_build_object(
      'total', (select count(*) from agm),
      'anterior', (select count(*) from ag where inicio >= v_ini_ant and inicio < v_ini and coalesce(status_chave, '') <> 'cancelado'),
      'novos', (select count(*) from agm a left join primeiro f on f.paciente_id = a.paciente_id
                 where f.quando is null or (f.quando at time zone v_tz)::date >= (a.inicio at time zone v_tz)::date),
      'retornos', (select count(*) from agm a join primeiro f on f.paciente_id = a.paciente_id
                    where (f.quando at time zone v_tz)::date < (a.inicio at time zone v_tz)::date)),
    'ia', jsonb_build_object(
      'conversas', (select count(*) from ia where atual),
      'conversas_anterior', (select count(*) from ia where not atual),
      'minutos_por_conversa', coalesce(v_min, 5),
      'agendou', (select count(*) from ag where criado_em >= v_ini and criado_em < v_fim and origem = 'renata_ia')),
    'atendimentos', jsonb_build_object(
      'total', (select count(*) from agm where conta_atendimento),
      'anterior', (select count(*) from ag where inicio >= v_ini_ant and inicio < v_ini and conta_atendimento),
      'agendados', (select count(*) from agm),
      'por_dia_semana', (select jsonb_agg(jsonb_build_object('dia', d,
            'atendimentos', (select count(*) from agm where conta_atendimento and extract(dow from inicio at time zone v_tz) = d),
            'agendados', (select count(*) from agm where extract(dow from inicio at time zone v_tz) = d)) order by d)
          from generate_series(0, 6) d)),
    'genero', jsonb_build_object(
      'total', (select count(*) from pac where criado_em < v_fim),
      'masculino', (select count(*) from pac where criado_em < v_fim and sexo = 'masculino'),
      'feminino', (select count(*) from pac where criado_em < v_fim and sexo = 'feminino')),
    'funil', jsonb_build_object(
      'total', (select count(*) from ldm),
      'anterior', (select count(*) from ld where criado_em >= v_ini_ant and criado_em < v_ini),
      'perdidos', (select count(*) from ldm where tipo_final = 'perdido'),
      'etapas', (select coalesce(jsonb_agg(jsonb_build_object('nome', e.nome, 'chave', e.chave, 'cor', e.cor,
                   'valor', (select count(*) from ldm where (
                              (ldm.tipo_final is distinct from 'perdido' and ldm.etapa_ordem >= e.ordem)
                              or exists (select 1 from public.movimentacoes_lead mv join public.etapas_funil e2 on e2.id = mv.etapa_destino_id
                                          where mv.lead_id = ldm.id and e2.ordem >= e.ordem and e2.tipo_final <> 'perdido')))) order by e.ordem), '[]'::jsonb)
                  from public.etapas_funil e where e.funil_id = v_funil and e.tipo_final <> 'perdido' and e.excluido_em is null),
      'dias_medios', (select round(avg(extract(epoch from (mv.movido_em - l.criado_em)) / 86400)::numeric, 1)
                        from ldm l join public.movimentacoes_lead mv on mv.lead_id = l.id
                        join public.etapas_funil e on e.id = mv.etapa_destino_id and e.tipo_final = 'ganho')),
    'canais', (
      select coalesce(jsonb_agg(
        jsonb_build_object(
          'nome', o.nome,
          'cor', o.cor,
          'icone', o.icone,
          'valor', (
            select count(*) from ldm
            where ldm.origem_id = o.id
               or ldm.origem_id in (select id from public.origens_lead f2 where f2.pai_id = o.id and f2.excluido_em is null)
          ),
          'convertidos', (
            select count(*) from ldm
            where (ldm.origem_id = o.id or ldm.origem_id in (select id from public.origens_lead f2 where f2.pai_id = o.id and f2.excluido_em is null))
              and ldm.tipo_final = 'ganho'
          ),
          'subcanais', (
            select coalesce(jsonb_agg(
              jsonb_build_object(
                'nome', f.nome,
                'cor', f.cor,
                'icone', f.icone,
                'valor', (select count(*) from ldm where ldm.origem_id = f.id),
                'convertidos', (select count(*) from ldm where ldm.origem_id = f.id and ldm.tipo_final = 'ganho')
              ) order by f.ordem
            ), '[]'::jsonb)
            from public.origens_lead f
            where f.pai_id = o.id and f.excluido_em is null and f.ativo
          )
        ) order by o.ordem
      ), '[]'::jsonb)
      from public.origens_lead o
      where o.clinica_id = p_clinica
        and o.pai_id is null
        and o.excluido_em is null
        and o.ativo
    ),
    'atividade_mes', (select coalesce(jsonb_agg(jsonb_build_object('dia', dia, 'tipo', tipo, 'quantidade', qtd) order by dia), '[]'::jsonb) from (
                 select extract(day from inicio at time zone v_tz)::int as dia, coalesce(tipo_chave, 'consulta') as tipo, count(*) as qtd
                   from agm group by 1, 2) x),
    'feriados_mes', public.feriados_do_mes(p_clinica, v_mes),
    'profissionais', (select coalesce(jsonb_agg(jsonb_build_object('id', pf.id, 'nome', pf.nome) order by pf.ordem, pf.nome), '[]'::jsonb)
                        from public.profissionais pf where pf.clinica_id = p_clinica and pf.excluido_em is null and pf.ativo),
    'meu_profissional', (select pf.id from public.profissionais pf where pf.clinica_id = p_clinica and pf.usuario_id = auth.uid() and pf.excluido_em is null limit 1),
    'agenda_lista', case when v_lista then (select coalesce(jsonb_agg(x order by x.inicio), '[]'::jsonb) from (
                 select a.id, a.inicio, a.profissional_id, pf.nome as profissional, coalesce(p.nome, 'Paciente sem cadastro') as paciente,
                        p.numero_prontuario, extract(year from age(p.data_nascimento))::int as idade, coalesce(pc.nome, 'Sem procedimento') as procedimento,
                        a.status_nome as status, a.status_cor as status_cor, a.conta_atendimento as realizado
                   from ag a
                   left join public.pacientes p on p.id = a.paciente_id
                   left join public.profissionais pf on pf.id = a.profissional_id
                   left join public.procedimentos pc on pc.id = a.procedimento_id
                  where a.inicio >= v_ini and a.inicio < v_lista_fim and coalesce(a.status_chave, '') <> 'cancelado'
                  order by a.inicio limit 400) x) else '[]'::jsonb end
  ) into v_res;
  return v_res;
end
$function$;
revoke execute on function public.painel_periodo(uuid, date, date) from anon, public;
grant execute on function public.painel_periodo(uuid, date, date) to authenticated;
