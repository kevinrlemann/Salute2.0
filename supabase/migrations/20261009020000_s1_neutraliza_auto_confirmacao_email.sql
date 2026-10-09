-- S1 (crítico): sequestro de convite.
-- A auto-confirmação marcava todo cadastro novo como "e-mail confirmado", e o cadastro
-- era ligado na hora aos convites pendentes daquele e-mail. A função passa a não fazer
-- nada: o convite só é ligado quando a pessoa confirma o e-mail de verdade
-- (gatilho usuario_atualizado → ligar_convites).
create or replace function public.auto_confirmar_email()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- desativada (S1): a confirmação de e-mail fica a cargo do Supabase Auth
  return new;
end;
$$;

revoke execute on function public.auto_confirmar_email() from public, anon, authenticated;
