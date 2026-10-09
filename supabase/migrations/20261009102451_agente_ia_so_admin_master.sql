-- Agente de IA: só o administrador master (perfis_usuario.admin_plataforma) vê e altera as configurações de IA.
-- O servidor (renata, n8n) continua lendo tudo com service_role; a equipe segue cadastrando serviços normalmente.

-- configuração do agente: leitura e gravação só do administrador master
alter policy agente_ia_ler on public.agente_ia using ((select public.eh_admin_plataforma()));
alter policy agente_ia_criar on public.agente_ia with check ((select public.eh_admin_plataforma()));
alter policy agente_ia_editar on public.agente_ia using ((select public.eh_admin_plataforma())) with check ((select public.eh_admin_plataforma()));

-- horário da IA e conhecimento: a Renata continua lendo; só o administrador master grava
alter policy renata_horarios_criar on public.renata_horarios with check ((select public.eh_admin_plataforma()));
alter policy renata_horarios_editar on public.renata_horarios using ((select public.eh_admin_plataforma())) with check ((select public.eh_admin_plataforma()));
alter policy renata_base_conhecimento_criar on public.renata_base_conhecimento with check ((select public.eh_admin_plataforma()));
alter policy renata_base_conhecimento_editar on public.renata_base_conhecimento using ((select public.eh_admin_plataforma())) with check ((select public.eh_admin_plataforma()));

-- campos de IA dos serviços (preço público, agendável, descrição): só o administrador master muda
create or replace function public.tg_procedimentos_campos_ia() returns trigger
language plpgsql set search_path = public as $fn$
begin
  if current_user in ('authenticated', 'anon') and not public.eh_admin_plataforma() then
    if tg_op = 'INSERT' then
      new.ia_preco_publico := true; new.ia_agendavel := true; new.ia_descricao := null;
    elsif new.ia_preco_publico is distinct from old.ia_preco_publico or new.ia_agendavel is distinct from old.ia_agendavel
          or new.ia_descricao is distinct from old.ia_descricao then
      raise exception 'Só o administrador master altera as configurações de IA dos serviços.';
    end if;
  end if;
  return new;
end $fn$;
revoke execute on function public.tg_procedimentos_campos_ia() from public, anon, authenticated;
do $$ begin
  if not exists (select 1 from pg_trigger where tgname = 'tg_procedimentos_campos_ia') then
    create trigger tg_procedimentos_campos_ia before insert or update on public.procedimentos for each row execute function public.tg_procedimentos_campos_ia();
  end if;
end $$;

-- retrato da configuração: só o servidor ou o administrador master
do $$
declare v text := pg_get_functiondef('public.agente_ia_config(uuid)'::regprocedure);
  a text := 'if not public.agente_pode(p_clinica, ''perfil.cadastro'') and not public.agente_pode(p_clinica, ''mensagens'') then';
  b text := 'if not (coalesce(auth.role(), '''') = ''service_role'' or public.eh_admin_plataforma()) then';
begin
  if position(a in v) = 0 then raise exception 'agente_ia_config mudou; revisar a migration'; end if;
  execute replace(v, a, b);
end $$;
revoke execute on function public.agente_ia_regras(uuid, text) from public, anon, authenticated;
grant execute on function public.agente_ia_regras(uuid, text) to service_role;
