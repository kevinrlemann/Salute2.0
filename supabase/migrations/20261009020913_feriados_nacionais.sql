-- Feriados nacionais calculados (sem manutenção anual) + feriados próprios da clínica (tabela feriados).

-- domingo de Páscoa (algoritmo de Meeus/Jones/Butcher)
create or replace function public.pascoa(p_ano int)
returns date
language plpgsql
immutable
set search_path = public
as $$
declare a int; b int; c int; d int; e int; f int; g int; h int; i int; k int; l int; m int; mes int; dia int;
begin
  a := p_ano % 19; b := p_ano / 100; c := p_ano % 100; d := b / 4; e := b % 4;
  f := (b + 8) / 25; g := (b - f + 1) / 3; h := (19 * a + b - d - g + 15) % 30;
  i := c / 4; k := c % 4; l := (32 + 2 * e + 2 * i - h - k) % 7; m := (a + 11 * h + 22 * l) / 451;
  mes := (h + l - 7 * m + 114) / 31; dia := ((h + l - 7 * m + 114) % 31) + 1;
  return make_date(p_ano, mes, dia);
end $$;

create or replace function public.feriados_nacionais(p_ano int)
returns table (data date, nome text, facultativo boolean)
language sql
immutable
set search_path = public
as $$
  select make_date(p_ano, v.m, v.d), v.nome, false
    from (values (1, 1, 'Confraternização Universal'), (4, 21, 'Tiradentes'), (5, 1, 'Dia do Trabalho'),
                 (9, 7, 'Independência do Brasil'), (10, 12, 'Nossa Senhora Aparecida'), (11, 2, 'Finados'),
                 (11, 15, 'Proclamação da República'), (11, 20, 'Dia Nacional de Zumbi e da Consciência Negra'),
                 (12, 25, 'Natal')) as v(m, d, nome)
  union all select public.pascoa(p_ano) - 48, 'Carnaval', true
  union all select public.pascoa(p_ano) - 47, 'Carnaval', true
  union all select public.pascoa(p_ano) - 2, 'Sexta-feira Santa', false
  union all select public.pascoa(p_ano) + 60, 'Corpus Christi', true
$$;

-- feriados de um mês para a clínica: nacionais + os cadastrados por ela (municipais, estaduais, recessos)
create or replace function public.feriados_do_mes(p_clinica uuid, p_mes date)
returns jsonb
language sql
stable
security invoker
set search_path = public
as $$
  with ini as (select date_trunc('month', p_mes)::date as d),
  nac as (
    select n.data, n.nome, null::text as cidade, case when n.facultativo then 'ponto_facultativo' else 'nacional' end as tipo,
           null::uuid as id, true as recorrente
      from ini, public.feriados_nacionais(extract(year from ini.d)::int) n
     where n.data >= ini.d and n.data < (ini.d + interval '1 month')::date),
  cli as (
    select make_date(extract(year from ini.d)::int, extract(month from f.data)::int, extract(day from f.data)::int) as data,
           f.nome, f.cidade, f.tipo, f.id, f.recorrente
      from ini, public.feriados f
     where f.clinica_id = p_clinica and f.excluido_em is null
       and p_clinica in (select public.minhas_clinicas())
       and ((f.recorrente and extract(month from f.data) = extract(month from ini.d))
            or (not f.recorrente and f.data >= ini.d and f.data < (ini.d + interval '1 month')::date))),
  tudo as (select * from cli union all select * from nac where not exists (select 1 from cli where cli.data = nac.data))
  select coalesce(jsonb_agg(jsonb_build_object('id', id, 'dia', extract(day from data)::int, 'data', data, 'nome', nome,
                                              'cidade', cidade, 'tipo', tipo, 'recorrente', recorrente) order by data), '[]'::jsonb)
    from tudo
$$;
revoke execute on function public.feriados_do_mes(uuid, date) from public, anon;
grant execute on function public.feriados_do_mes(uuid, date) to authenticated, service_role;

-- o painel passa a usar a mesma fonte
do $$
declare v_def text := pg_get_functiondef('public.painel_mes'::regproc);
        v_ini int := position('''feriados_mes'', (' in v_def);
        v_fim int := position('''profissionais'', (' in v_def);
        v_novo text;
begin
  if v_ini = 0 or v_fim = 0 or v_fim < v_ini then raise exception 'painel_mes: trecho dos feriados não encontrado'; end if;
  v_novo := substr(v_def, 1, v_ini - 1) || '''feriados_mes'', public.feriados_do_mes(p_clinica, v_mes),' || E'\n    ' || substr(v_def, v_fim);
  execute v_novo;
end $$;
