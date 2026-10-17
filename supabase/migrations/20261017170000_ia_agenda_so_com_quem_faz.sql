-- IA agenda só com quem faz o procedimento (pedido do fundador, 2026-10-17).
-- O vínculo já existe (profissionais_procedimentos, marcado no cadastro do profissional) e horarios_disponiveis já respeita.
-- Faltava: (1) reservar_agendamento recusar de forma explícita um profissional que não faz o procedimento (hoje virava "indisponível");
-- (2) a ferramenta da IA avisar quem faz quando ela pede um profissional errado; (3) a instrução da regra de agendamento dizer isso à IA;
-- (4) consultar_fatos listar, em cada procedimento, os profissionais que o fazem. Profissional novo entra na hora em que a equipe marca
-- os procedimentos dele no cadastro (sem marcação nenhuma para um procedimento, todos os profissionais ativos servem).

create or replace function public.ia_profissional_faz(p_prof uuid, p_proc uuid)
returns boolean language sql stable security definer set search_path to 'public' as $$
  select not exists (select 1 from public.profissionais_procedimentos x where x.procedimento_id = p_proc and x.excluido_em is null)
      or exists (select 1 from public.profissionais_procedimentos x where x.procedimento_id = p_proc and x.profissional_id = p_prof and x.excluido_em is null)
$$;
revoke execute on function public.ia_profissional_faz(uuid, uuid) from public, anon;

create or replace function public.ia_quem_faz(p_clinica uuid, p_proc uuid)
returns jsonb language sql stable security definer set search_path to 'public' as $$
  select coalesce(jsonb_agg(jsonb_build_object('id', pf.id, 'nome', pf.nome) order by pf.ordem, pf.nome), '[]'::jsonb)
    from public.profissionais pf
   where pf.clinica_id = p_clinica and pf.ativo and pf.excluido_em is null and public.ia_profissional_faz(pf.id, p_proc)
$$;
revoke execute on function public.ia_quem_faz(uuid, uuid) from public, anon;

-- (1) reserva recusa profissional inativo ou que não faz o procedimento, dizendo quem faz
do $$
declare v_def text; v_novo text;
begin
  select pg_get_functiondef('public.reservar_agendamento(uuid,uuid,uuid,timestamptz,uuid,uuid,uuid,text)'::regprocedure) into v_def;
  if position('profissional_nao_faz_procedimento' in v_def) > 0 then return; end if;
  v_novo := replace(v_def,
    $a$  if p_paciente is not null and not exists (select 1 from public.pacientes where id = p_paciente and clinica_id = p_clinica) then$a$,
    $a$  if p_profissional is null or not exists (select 1 from public.profissionais where id = p_profissional and clinica_id = p_clinica and ativo and excluido_em is null) then
    return jsonb_build_object('status', 'recusado', 'motivo', 'profissional_inexistente_ou_inativo', 'profissionais_que_fazem', public.ia_quem_faz(p_clinica, p_procedimento));
  end if;
  if not public.ia_profissional_faz(p_profissional, p_procedimento) then
    return jsonb_build_object('status', 'recusado', 'motivo', 'profissional_nao_faz_procedimento', 'profissionais_que_fazem', public.ia_quem_faz(p_clinica, p_procedimento));
  end if;
  if p_paciente is not null and not exists (select 1 from public.pacientes where id = p_paciente and clinica_id = p_clinica) then$a$);
  if v_novo = v_def then raise exception 'reservar_agendamento: âncora não encontrada'; end if;
  execute v_novo;
end $$;

-- (2) ferramenta da IA: profissional que não faz o procedimento (consulta de horários e criação)
do $$
declare v_def text; v_novo text; v_a text; v_b text;
begin
  select pg_get_functiondef('public.n8n_ferramenta(uuid,uuid,text,jsonb)'::regprocedure) into v_def;
  if position('profissional_nao_faz_procedimento' in v_def) > 0 then return; end if;
  v_a := $a$      if v_prof is null then return jsonb_build_object('ok', false, 'codigo', 'profissional_nao_identificado'); end if;$a$;
  if (length(v_def) - length(replace(v_def, v_a, ''))) / length(v_a) <> 1 then raise exception 'n8n_ferramenta: âncora 1 (%)', (length(v_def) - length(replace(v_def, v_a, ''))) / length(v_a); end if;
  v_novo := replace(v_def, v_a, v_a || $a$
      if not public.ia_profissional_faz(v_prof, v_proc) then
        return jsonb_build_object('ok', false, 'codigo', 'profissional_nao_faz_procedimento',
          'mensagem', 'Este profissional não faz este procedimento. Explique à pessoa e ofereça só quem faz (lista abaixo), ou consulte horários sem informar profissional.',
          'profissionais_que_fazem', public.ia_quem_faz(t.clinica_id, v_proc));
      end if;$a$);
  v_b := $a$        return jsonb_build_object('ok', false, 'codigo', 'dados_incompletos', 'mensagem', 'Informe procedimento e profissional exatamente como retornados pela consulta de horários.');
      end if;$a$;
  if (length(v_novo) - length(replace(v_novo, v_b, ''))) / length(v_b) <> 1 then raise exception 'n8n_ferramenta: âncora 2'; end if;
  v_novo := replace(v_novo, v_b, v_b || $a$
      if not public.ia_profissional_faz(v_prof, v_proc) then
        return jsonb_build_object('ok', false, 'codigo', 'profissional_nao_faz_procedimento',
          'mensagem', 'Este profissional não faz este procedimento. Não confirme. Ofereça quem faz (lista abaixo) e consulte horários de novo.',
          'profissionais_que_fazem', public.ia_quem_faz(t.clinica_id, v_proc));
      end if;$a$);
  execute v_novo;
end $$;

-- (3) a regra de agendamento diz à IA para respeitar quem faz o quê
do $$
declare v_def text; v_novo text;
begin
  select pg_get_functiondef('public.ia_regra_agendamento(uuid,uuid)'::regprocedure) into v_def;
  if position('faz o procedimento' in v_def) > 0 then return; end if;
  v_novo := replace(v_def,
    $a$    || ' Horários sempre de 30 em 30 minutos. Cada procedimento dura 30 minutos ou 1 hora.';$a$,
    $a$    || ' Horários sempre de 30 em 30 minutos. Cada procedimento dura 30 minutos ou 1 hora.'
    || ' Só ofereça e só agende com profissional que faz o procedimento pedido: a lista "profissionais" do contexto diz o que cada um faz, e "procedimentos" diz quem faz cada um. Se a pessoa pedir um profissional que não faz, explique com educação e ofereça quem faz. Nunca agende um procedimento com quem não o faz.';$a$);
  if v_novo = v_def then raise exception 'ia_regra_agendamento: âncora não encontrada'; end if;
  execute v_novo;
end $$;

-- (4) consultar_fatos: cada procedimento traz quem o faz
do $$
declare v_def text; v_novo text; v_a text;
begin
  select pg_get_functiondef('public.n8n_ferramenta(uuid,uuid,text,jsonb)'::regprocedure) into v_def;
  if position('''quem_faz''' in v_def) > 0 then return; end if;
  v_a := $a$'agendavel_pela_ia', p.ia_agendavel) order by p.nome)$a$;
  if (length(v_def) - length(replace(v_def, v_a, ''))) / length(v_a) <> 1 then raise exception 'consultar_fatos: âncora (%)', (length(v_def) - length(replace(v_def, v_a, ''))) / length(v_a); end if;
  v_novo := replace(v_def, v_a, $a$'agendavel_pela_ia', p.ia_agendavel, 'quem_faz', (select coalesce(jsonb_agg(q ->> 'nome'), '[]'::jsonb) from jsonb_array_elements(public.ia_quem_faz(t.clinica_id, p.id)) q)) order by p.nome)$a$);
  execute v_novo;
end $$;
