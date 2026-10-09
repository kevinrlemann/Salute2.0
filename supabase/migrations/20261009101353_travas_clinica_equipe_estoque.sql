-- P1-12 (S9, B6, S12): travas para alterações feitas direto pelo navegador (papel authenticated).
-- Funções do sistema (SECURITY DEFINER, rodam como dono) continuam livres; o admin da plataforma também.

-- S9: só o admin da plataforma muda ativo, exclusão e slug da clínica
create or replace function public.tg_clinicas_campos_protegidos() returns trigger
language plpgsql set search_path = public as $fn$
begin
  if current_user in ('authenticated', 'anon') and not public.eh_admin_plataforma()
     and (new.ativo is distinct from old.ativo or new.excluido_em is distinct from old.excluido_em or new.slug is distinct from old.slug) then
    raise exception 'Só a Salute pode ativar, excluir ou mudar o endereço da clínica.';
  end if;
  return new;
end $fn$;

-- B6: vínculo da equipe não troca de usuário, não vira dono e não é aceito por UPDATE direto
create or replace function public.tg_usuarios_clinicas_protegido() returns trigger
language plpgsql set search_path = public as $fn$
begin
  if current_user in ('authenticated', 'anon') and not public.eh_admin_plataforma()
     and (new.usuario_id is distinct from old.usuario_id or new.clinica_id is distinct from old.clinica_id
          or new.dono is distinct from old.dono or (new.papel = 'dono' and old.papel is distinct from 'dono')
          or (new.status_convite = 'aceito' and old.status_convite is distinct from 'aceito')) then
    raise exception 'Convites e donos só mudam pelas telas de equipe e de convite.';
  end if;
  return new;
end $fn$;

-- S12: movimentação de estoque lançada não muda quantidade, tipo ou produto (o saldo não seria recalculado)
create or replace function public.tg_movimentacoes_estoque_imutavel() returns trigger
language plpgsql set search_path = public as $fn$
begin
  if current_user in ('authenticated', 'anon')
     and (new.quantidade is distinct from old.quantidade or new.tipo is distinct from old.tipo
          or new.produto_id is distinct from old.produto_id or new.lote_id is distinct from old.lote_id
          or new.clinica_id is distinct from old.clinica_id or new.excluido_em is distinct from old.excluido_em) then
    raise exception 'Movimentação lançada não pode ser alterada. Para corrigir, lance um ajuste de estoque.';
  end if;
  return new;
end $fn$;

do $$ begin
  if not exists (select 1 from pg_trigger where tgname = 'tg_clinicas_campos_protegidos') then
    create trigger tg_clinicas_campos_protegidos before update on public.clinicas for each row execute function public.tg_clinicas_campos_protegidos();
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'tg_usuarios_clinicas_protegido') then
    create trigger tg_usuarios_clinicas_protegido before update on public.usuarios_clinicas for each row execute function public.tg_usuarios_clinicas_protegido();
  end if;
  if not exists (select 1 from pg_trigger where tgname = 'tg_movimentacoes_estoque_imutavel') then
    create trigger tg_movimentacoes_estoque_imutavel before update on public.movimentacoes_estoque for each row execute function public.tg_movimentacoes_estoque_imutavel();
  end if;
end $$;

revoke execute on function public.tg_clinicas_campos_protegidos() from public, anon, authenticated;
revoke execute on function public.tg_usuarios_clinicas_protegido() from public, anon, authenticated;
revoke execute on function public.tg_movimentacoes_estoque_imutavel() from public, anon, authenticated;
