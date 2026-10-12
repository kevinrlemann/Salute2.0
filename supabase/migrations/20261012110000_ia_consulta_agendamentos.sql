-- IA do WhatsApp consulta os agendamentos do próprio contato (2026-10-12).
-- Antes: a IA não tinha ação para listar consultas; "Eu tenho agendamento marcado pra que dia?" virava transferência.
-- Agora: (1) a clínica liga/desliga a consulta (ia_consulta_agendamentos, ligado por padrão);
--        (2) nova ação consultar_agendamentos na ferramenta, sempre restrita à clínica e ao contato da conversa;
--        (3) o contexto da IA respeita o mesmo interruptor.
-- Cuidado: nas funções da IA, nomes como "c", "a", "g", "pr" e "t" já são variáveis plpgsql. Por isso os apelidos aqui são xp, xf, xs e ag.

alter table public.configuracoes_clinica
  add column if not exists ia_consulta_agendamentos boolean not null default true;
comment on column public.configuracoes_clinica.ia_consulta_agendamentos is 'Se a IA do WhatsApp pode informar ao contato as próprias consultas futuras';

do $$
declare v_def text; v_novo text;
begin
  -- 1) ferramenta: ação nova na lista fechada e ramo que lê os agendamentos do contato
  select pg_get_functiondef(p.oid) into v_def from pg_proc p join pg_namespace n on n.oid = p.pronamespace
   where n.nspname = 'public' and p.proname = 'n8n_ferramenta';
  if v_def is not null and position('consultar_agendamentos' in v_def) = 0 then
    v_novo := replace(v_def, $m$'consultar_horarios','criar_agendamento',$m$, $m$'consultar_horarios','consultar_agendamentos','criar_agendamento',$m$);
    assert v_novo <> v_def, 'n8n_ferramenta: lista de ações não encontrada';
    v_def := v_novo;
    v_novo := replace(v_def, $m$  elsif p_acao = 'mover_etapa' then$m$, $m$  elsif p_acao = 'consultar_agendamentos' then
    if not coalesce((select cfg.ia_consulta_agendamentos from public.configuracoes_clinica cfg where cfg.clinica_id = t.clinica_id and cfg.excluido_em is null limit 1), true) then
      return jsonb_build_object('ok', false, 'codigo', 'consulta_de_agendamentos_desligada', 'mensagem', 'A clínica não permite que a IA mostre agendamentos. Transfira para a equipe.');
    end if;
    select coalesce(jsonb_agg(jsonb_build_object('id', ag.id, 'data', to_char(ag.inicio at time zone v_fuso, 'DD/MM/YYYY'),
             'dia_semana', v_dias[extract(dow from ag.inicio at time zone v_fuso)::int + 1], 'hora', to_char(ag.inicio at time zone v_fuso, 'HH24:MI'),
             'procedimento', xp.nome, 'profissional', xf.nome, 'status', xs.chave) order by ag.inicio), '[]'::jsonb)
      into v_res
      from public.agendamentos ag
      left join public.procedimentos xp on xp.id = ag.procedimento_id
      left join public.profissionais xf on xf.id = ag.profissional_id
      left join public.status_agendamento xs on xs.id = ag.status_agendamento_id
     where ag.clinica_id = t.clinica_id and ag.excluido_em is null and ag.inicio > now()
       and coalesce(xs.final, false) = false and coalesce(xs.chave, '') <> 'cancelado'
       and (ag.conversa_id = v_conv.id or (v_conv.paciente_id is not null and ag.paciente_id = v_conv.paciente_id)
            or (v_conv.lead_id is not null and ag.lead_id = v_conv.lead_id));
    return jsonb_build_object('ok', true, 'fuso', v_fuso, 'quantidade', jsonb_array_length(v_res), 'agendamentos', v_res,
      'instrucao', case when jsonb_array_length(v_res) = 0
        then 'Este contato não tem consulta futura. Diga isso com gentileza e ofereça agendar. Não transfira por isso.'
        else 'Responda com data, hora, procedimento e profissional exatos desta lista. Não invente nem altere dados.' end);
  elsif p_acao = 'mover_etapa' then$m$);
    assert v_novo <> v_def, 'n8n_ferramenta: ponto de inserção não encontrado';
    execute v_novo;
  end if;

  -- 2) contexto: a lista de consultas que vai ao prompt respeita o mesmo interruptor
  select pg_get_functiondef(p.oid) into v_def from pg_proc p join pg_namespace n on n.oid = p.pronamespace
   where n.nspname = 'public' and p.proname = 'n8n_contexto';
  if v_def is not null and position('ia_consulta_agendamentos' in v_def) = 0 then
    v_novo := replace(v_def, $m$'agendamentos_futuros', (select coalesce(jsonb_agg(jsonb_build_object('id', g.id,$m$,
                              $m$'agendamentos_futuros', case when coalesce((select cfg.ia_consulta_agendamentos from public.configuracoes_clinica cfg where cfg.clinica_id = t.clinica_id and cfg.excluido_em is null limit 1), true) then (select coalesce(jsonb_agg(jsonb_build_object('id', g.id,$m$);
    assert v_novo <> v_def, 'n8n_contexto: bloco de agendamentos não encontrado';
    v_def := v_novo;
    v_novo := replace(v_def, $m$or (v_conv.lead_id is not null and g.lead_id = v_conv.lead_id))),$m$,
                              $m$or (v_conv.lead_id is not null and g.lead_id = v_conv.lead_id))) else '[]'::jsonb end,$m$);
    assert v_novo <> v_def, 'n8n_contexto: fim do bloco de agendamentos não encontrado';
    execute v_novo;
  end if;
end $$;
