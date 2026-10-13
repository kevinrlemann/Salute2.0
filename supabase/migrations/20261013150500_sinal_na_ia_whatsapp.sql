-- Sinal na IA do WhatsApp (2026-10-13): a ferramenta de criar agendamento devolve valor, PIX e prazo; a IA registra o
-- comprovante enviado pelo contato; o contexto e as regras do agente explicam o sinal. Patches por replace() sobre o
-- texto atual das funções (reversível: recriar a versão anterior).
do $$
declare src text; n int;
begin
  -- n8n_ferramenta
  select pg_get_functiondef('public.n8n_ferramenta(uuid,uuid,text,jsonb)'::regprocedure) into src;
  -- a) ação nova na lista fechada
  if position($a$'confirmar_presenca','mover_etapa','solicitar_humano','registrar_preferencia_contato') then$a$ in src) = 0 then raise exception 'ancora a'; end if;
  src := replace(src, $a$'confirmar_presenca','mover_etapa','solicitar_humano','registrar_preferencia_contato') then$a$,
                      $a$'confirmar_presenca','mover_etapa','solicitar_humano','registrar_preferencia_contato','registrar_comprovante_sinal') then$a$);
  -- b) resultado "aguardando_sinal" ao criar
  if position($b$      elsif v_r ->> 'status' = 'aguardando_equipe' then$b$ in src) = 0 then raise exception 'ancora b'; end if;
  src := replace(src, $b$      elsif v_r ->> 'status' = 'aguardando_equipe' then$b$,
$b$      elsif v_r ->> 'status' = 'aguardando_sinal' then
        if nullif(btrim(coalesce(v_args ->> 'nome_paciente', '')), '') is not null then
          update public.leads set nome = left(btrim(v_args ->> 'nome_paciente'), 120) where id = v_conv.lead_id and (nome is null or nome = telefone);
        end if;
        return jsonb_build_object('ok', true, 'status', 'reservado_aguardando_sinal', 'confirmado', false, 'agendamento_id', v_r ->> 'agendamento_id',
          'data', to_char(v_inicio at time zone v_fuso, 'DD/MM/YYYY'), 'hora', to_char(v_inicio at time zone v_fuso, 'HH24:MI'),
          'profissional', v_prof_nome, 'procedimento', v_proc_nome, 'sinal', v_r -> 'sinal',
          'instrucao', 'A vaga ficou reservada até ' || (v_r -> 'sinal' ->> 'reserva_ate') || '. Diga isso ao contato e informe que a confirmação depende do sinal de R$ '
            || to_char((v_r -> 'sinal' ->> 'valor')::numeric, 'FM999G999G990D00')
            || coalesce(' via PIX (chave ' || (v_r -> 'sinal' ->> 'chave_pix') || ')', ' (a equipe passa a chave PIX)')
            || coalesce('. ' || (v_r -> 'sinal' ->> 'instrucoes'), '')
            || '. Peça para enviar o comprovante aqui pelo WhatsApp. NÃO diga que está confirmado.');
      elsif v_r ->> 'status' = 'aguardando_equipe' then$b$);
  -- c) ação registrar_comprovante_sinal
  if position($c$  elsif p_acao = 'mover_etapa' then$c$ in src) = 0 then raise exception 'ancora c'; end if;
  src := replace(src, $c$  elsif p_acao = 'mover_etapa' then$c$,
$c$  elsif p_acao = 'registrar_comprovante_sinal' then
    select x.* into g from public.agendamentos x
     where x.clinica_id = t.clinica_id and x.excluido_em is null and x.status_pagamento = 'pendente' and x.inicio > now()
       and (x.conversa_id = v_conv.id or (v_conv.lead_id is not null and x.lead_id = v_conv.lead_id) or (v_conv.paciente_id is not null and x.paciente_id = v_conv.paciente_id))
       and (nullif(v_args ->> 'agendamento_id', '') is null or x.id::text = v_args ->> 'agendamento_id')
     order by x.inicio limit 1;
    if g.id is null then
      return jsonb_build_object('ok', false, 'codigo', 'sem_sinal_pendente', 'mensagem', 'Este contato não tem consulta aguardando sinal. Agradeça e, se houver dúvida, transfira para a equipe.');
    end if;
    select an.arquivo_path into v_txt from public.mensagens m join public.anexos_mensagem an on an.mensagem_id = m.id and an.excluido_em is null
     where m.conversa_id = v_conv.id and m.direcao = 'recebida' and m.excluido_em is null and m.enviada_em > now() - interval '30 minutes'
     order by m.enviada_em desc limit 1;
    update public.agendamentos set sinal_comprovante_em = now(), sinal_comprovante_path = coalesce(v_txt, sinal_comprovante_path),
           observacoes = concat_ws(E'\n', nullif(observacoes, ''), 'Comprovante de sinal enviado pelo WhatsApp em ' || to_char(now() at time zone v_fuso, 'DD/MM HH24:MI'))
     where id = g.id;
    v_h := public.transferir_para_humano(v_conv.id, 'Comprovante de sinal recebido (R$ ' || to_char(coalesce(g.sinal_valor, 0), 'FM999G999G990D00') || ') para a consulta de '
             || to_char(g.inicio at time zone v_fuso, 'DD/MM HH24:MI') || '. Conferir e confirmar na Agenda.', 'Sinal', 'ia');
    return jsonb_build_object('ok', true, 'status', 'comprovante_registrado', 'agendamento_id', g.id, 'transferencia_id', v_h,
      'instrucao', 'Diga que recebeu o comprovante e que a equipe vai conferir e confirmar a consulta em breve. Não diga que já está confirmado. Não faça mais perguntas.');

  elsif p_acao = 'mover_etapa' then$c$);
  -- d) consultar_agendamentos mostra a situação do sinal
  if position($d$'profissional', xf.nome, 'status', xs.chave) order by ag.inicio), '[]'::jsonb)$d$ in src) = 0 then raise exception 'ancora d'; end if;
  src := replace(src, $d$'profissional', xf.nome, 'status', xs.chave) order by ag.inicio), '[]'::jsonb)$d$,
                      $d$'profissional', xf.nome, 'status', xs.chave, 'sinal', case ag.status_pagamento when 'pendente' then 'aguardando o sinal de R$ ' || to_char(coalesce(ag.sinal_valor, 0), 'FM999G999G990D00') when 'pago' then 'sinal pago' else null end) order by ag.inicio), '[]'::jsonb)$d$);
  execute src;

  -- n8n_contexto: políticas de sinal e permissão de criar
  select pg_get_functiondef('public.n8n_contexto(uuid,uuid)'::regprocedure) into src;
  if position($e$'pode_criar_agendamento', a.ia_cria_agendamento and a.politica_sinal in ('nenhum', 'opcional'),$e$ in src) = 0 then raise exception 'ancora e'; end if;
  src := replace(src, $e$'pode_criar_agendamento', a.ia_cria_agendamento and a.politica_sinal in ('nenhum', 'opcional'),$e$,
                      $e$'pode_criar_agendamento', a.ia_cria_agendamento and (a.politica_sinal in ('nenhum', 'opcional') or coalesce((public.sinal_regra(t.clinica_id) ->> 'exige')::boolean, false)),$e$);
  if position($f$'agendamento_passa_pela_equipe', not a.ia_cria_agendamento or a.politica_sinal in ('aprovacao_humana', 'obrigatorio_confirmar', 'obrigatorio_reservar'),$f$ in src) = 0 then raise exception 'ancora f'; end if;
  src := replace(src, $f$'agendamento_passa_pela_equipe', not a.ia_cria_agendamento or a.politica_sinal in ('aprovacao_humana', 'obrigatorio_confirmar', 'obrigatorio_reservar'),$f$,
                      $f$'agendamento_passa_pela_equipe', not a.ia_cria_agendamento or a.politica_sinal = 'aprovacao_humana' or (a.politica_sinal in ('obrigatorio_confirmar', 'obrigatorio_reservar') and not coalesce((public.sinal_regra(t.clinica_id) ->> 'exige')::boolean, false)),$f$);
  if position($g$'sinal', jsonb_build_object('politica', a.politica_sinal, 'tipo', a.sinal_tipo, 'valor', nullif(a.sinal_valor, 0)),$g$ in src) = 0 then raise exception 'ancora g'; end if;
  src := replace(src, $g$'sinal', jsonb_build_object('politica', a.politica_sinal, 'tipo', a.sinal_tipo, 'valor', nullif(a.sinal_valor, 0)),$g$,
                      $g$'sinal', jsonb_build_object('politica', a.politica_sinal, 'tipo', a.sinal_tipo, 'valor', nullif(a.sinal_valor, 0)),
       'sinal_para_garantir_vaga', public.sinal_regra(t.clinica_id) || jsonb_build_object('por_profissional', (select coalesce(jsonb_agg(jsonb_build_object('profissional_id', pf.id, 'profissional', pf.nome, 'regra', public.sinal_regra(t.clinica_id, pf.id)) order by pf.ordem), '[]'::jsonb) from public.profissionais pf where pf.clinica_id = t.clinica_id and pf.ativo and pf.excluido_em is null and pf.sinal_modo <> 'clinica')),$g$);
  if position($h$'procedimento', p.nome, 'profissional', pr.nome, 'status', s.chave) order by g.inicio), '[]'::jsonb)$h$ in src) = 0 then raise exception 'ancora h'; end if;
  src := replace(src, $h$'procedimento', p.nome, 'profissional', pr.nome, 'status', s.chave) order by g.inicio), '[]'::jsonb)$h$,
                      $h$'procedimento', p.nome, 'profissional', pr.nome, 'status', s.chave, 'sinal', case g.status_pagamento when 'pendente' then 'aguardando sinal' when 'pago' then 'sinal pago' else null end) order by g.inicio), '[]'::jsonb)$h$);
  execute src;

  -- agente_ia_regras: instrução sobre o sinal
  select pg_get_functiondef('public.agente_ia_regras(uuid,text)'::regprocedure) into src;
  if position($i$      case when a.crm_mover_automatico then '- CRM: $i$ in src) = 0 then raise exception 'ancora i'; end if;
  src := replace(src, $i$      case when a.crm_mover_automatico then '- CRM: $i$,
$i$      case when coalesce((public.sinal_regra(p_clinica) ->> 'exige')::boolean, false) or exists (select 1 from public.profissionais pf where pf.clinica_id = p_clinica and pf.ativo and pf.excluido_em is null and pf.sinal_modo in ('valor', 'integral'))
        then '- Sinal para garantir a vaga: a clínica pede um valor adiantado' || case when coalesce((public.sinal_regra(p_clinica) ->> 'exige')::boolean, false) then ' (' || case public.sinal_regra(p_clinica) ->> 'modo' when 'integral' then 'valor integral do procedimento' else 'R$ ' || to_char((public.sinal_regra(p_clinica) ->> 'valor')::numeric, 'FM999G999G990D00') end || ')' else ' para alguns profissionais' end
          || '. Ao criar o agendamento, o sistema devolve o valor exato, a chave PIX e o prazo: repasse exatamente como vier, sem negociar, sem dispensar e sem inventar outra forma de pagamento. A vaga fica reservada até o prazo. Quando o contato enviar o comprovante (foto, PDF ou "já paguei"), use a ferramenta de registrar comprovante do sinal. Só a equipe confirma a consulta depois de conferir; nunca diga que está confirmada antes disso. O valor do sinal é abatido do total no dia.' end,
      case when a.crm_mover_automatico then '- CRM: $i$);
  execute src;
  raise notice 'patches aplicados';
end $$;
