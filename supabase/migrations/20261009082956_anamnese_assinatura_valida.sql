-- P0-02: a assinatura chega por link público. Só aceita números (largura, altura e pontos dos traços)
-- e limita o tamanho, para que nada além de um desenho possa ser gravado.
create or replace function public.anamnese_assinatura_valida(p jsonb) returns boolean
language plpgsql immutable set search_path = public as $fn$
declare t jsonb; pt jsonb; n_tracos int := 0; n_pontos int := 0;
begin
  if p is null then return true; end if;
  if jsonb_typeof(p) <> 'object' or jsonb_typeof(p -> 'tracos') <> 'array' then return false; end if;
  if p ? 'w' and jsonb_typeof(p -> 'w') not in ('number', 'null') then return false; end if;
  if p ? 'h' and jsonb_typeof(p -> 'h') not in ('number', 'null') then return false; end if;
  for t in select value from jsonb_array_elements(p -> 'tracos') loop
    n_tracos := n_tracos + 1;
    if jsonb_typeof(t) <> 'array' then return false; end if;
    for pt in select value from jsonb_array_elements(t) loop
      n_pontos := n_pontos + 1;
      if jsonb_typeof(pt) <> 'array' or jsonb_array_length(pt) < 2 or jsonb_array_length(pt) > 3 then return false; end if;
      if exists (select 1 from jsonb_array_elements(pt) v where jsonb_typeof(v.value) <> 'number') then return false; end if;
    end loop;
  end loop;
  return n_tracos <= 300 and n_pontos <= 20000;
end $fn$;

create or replace function public.tg_anamnese_assinatura_valida() returns trigger
language plpgsql set search_path = public as $fn$
begin
  if new.assinatura is distinct from (case when tg_op = 'UPDATE' then old.assinatura end)
     and not public.anamnese_assinatura_valida(new.assinatura) then
    raise exception 'Assinatura inválida. Faça a assinatura de novo no quadro.';
  end if;
  return new;
end $fn$;

do $$ begin
  if not exists (select 1 from pg_trigger where tgname = 'tg_anamnese_envios_assinatura_valida') then
    create trigger tg_anamnese_envios_assinatura_valida before insert or update of assinatura on public.anamnese_envios
      for each row execute function public.tg_anamnese_assinatura_valida();
  end if;
end $$;

revoke execute on function public.tg_anamnese_assinatura_valida() from public, anon, authenticated;
