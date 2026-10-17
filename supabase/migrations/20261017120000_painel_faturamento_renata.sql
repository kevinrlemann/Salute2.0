-- Painel › "Faturamento pela Renata IA" (pedido do fundador, 2026-10-17): soma as receitas ligadas às consultas que a própria Renata agendou
-- (agendamentos.origem = 'renata_ia', não canceladas). Agendamento feito por pessoa da equipe (origem 'equipe') fica de fora.
-- A receita é ligada à consulta por contas_receber.agendamento_id ou pelo procedimento realizado (procedimentos_realizados.agendamento_id).
-- O período é o da consulta (inicio); "faturado" = valor líquido das receitas (recebidas ou a receber), "recebido" = só as pagas.
-- Entra nas duas funções do Painel (painel_mes e painel_periodo), logo depois do bloco 'ia'.
do $$
declare v_nome text; v_def text; v_novo text;
  v_bloco constant text := $b$'renata_faturamento', (
      with ag_ia as (select a.id, a.inicio from ag a where a.origem = 'renata_ia' and coalesce(a.status_chave, '') <> 'cancelado'),
           rec as (select cr.valor_liquido, cr.status, coalesce(cr.agendamento_id, pr.agendamento_id) as ag_id
                     from public.contas_receber cr
                     left join public.procedimentos_realizados pr on pr.id = cr.procedimento_realizado_id and pr.excluido_em is null
                    where cr.clinica_id = p_clinica and cr.excluido_em is null),
           j as (select r.valor_liquido, r.status, r.ag_id, g.inicio from rec r join ag_ia g on g.id = r.ag_id)
      select jsonb_build_object(
        'faturado', coalesce((select sum(valor_liquido) from j where inicio >= v_ini and inicio < v_fim), 0),
        'recebido', coalesce((select sum(valor_liquido) from j where inicio >= v_ini and inicio < v_fim and status = 'pago'), 0),
        'faturado_anterior', coalesce((select sum(valor_liquido) from j where inicio >= v_ini_ant and inicio < v_ini), 0),
        'consultas', (select count(*) from ag_ia where inicio >= v_ini and inicio < v_fim),
        'consultas_com_receita', (select count(distinct ag_id) from j where inicio >= v_ini and inicio < v_fim))),
    'atendimentos', jsonb_build_object($b$;
begin
  foreach v_nome in array array['painel_mes', 'painel_periodo'] loop
    select pg_get_functiondef(p.oid) into v_def from pg_proc p join pg_namespace n on n.oid = p.pronamespace
     where n.nspname = 'public' and p.proname = v_nome;
    if v_def is null then raise exception '% não encontrada', v_nome; end if;
    if position('renata_faturamento' in v_def) > 0 then continue; end if;
    v_novo := replace(v_def, '''atendimentos'', jsonb_build_object(', v_bloco);
    if v_novo = v_def then raise exception '%: âncora do bloco atendimentos não encontrada', v_nome; end if;
    execute v_novo;
  end loop;
end $$;
