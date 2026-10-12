-- Atendimento pela IA no WhatsApp customizável por clínica (2026-10-12).
-- 1) mostrar o valor do procedimento na conversa (ligado por padrão; a clínica pode desligar)
-- 2) agendar procedimento direto (ligado por padrão); desligado, a IA só agenda a avaliação
--    escolhida pela clínica (ia_procedimento_avaliacao_id)
-- O valor também continua exigindo ia_preco_publico do procedimento; a clínica só restringe.

alter table public.configuracoes_clinica
  add column if not exists ia_mostrar_valor boolean not null default true,
  add column if not exists ia_agenda_procedimento_direto boolean not null default true,
  add column if not exists ia_procedimento_avaliacao_id uuid null references public.procedimentos(id);
comment on column public.configuracoes_clinica.ia_mostrar_valor is 'Se a IA do WhatsApp pode dizer o valor dos procedimentos (além de ia_preco_publico de cada um)';
comment on column public.configuracoes_clinica.ia_agenda_procedimento_direto is 'Se a IA do WhatsApp agenda o procedimento pedido; desligado, agenda só a avaliação';
comment on column public.configuracoes_clinica.ia_procedimento_avaliacao_id is 'Procedimento de avaliação usado pela IA quando ia_agenda_procedimento_direto está desligado';

-- procedimento que a IA de fato agenda: a avaliação, quando a clínica não agenda procedimento direto
create or replace function public.ia_procedimento_efetivo(p_clinica uuid, p_proc uuid)
 returns uuid language sql stable security definer set search_path to 'public' as $$
  select case when coalesce(c.ia_agenda_procedimento_direto, true) then p_proc else c.ia_procedimento_avaliacao_id end
    from (select 1) s
    left join public.configuracoes_clinica c on c.clinica_id = p_clinica and c.excluido_em is null
$$;
revoke execute on function public.ia_procedimento_efetivo(uuid, uuid) from public, anon, authenticated;

-- valor exibido pela IA: respeita a escolha da clínica, além do preço público de cada procedimento
do $$
declare v_def text; v_novo text;
begin
  select pg_get_functiondef(p.oid) into v_def from pg_proc p join pg_namespace n on n.oid = p.pronamespace
   where n.nspname = 'public' and p.proname = 'n8n_contexto';
  if v_def is not null and position('ia_mostrar_valor' in v_def) = 0 then
    v_novo := replace(v_def, 'case when p.ia_preco_publico then p.valor end',
      'case when p.ia_preco_publico and coalesce((select c.ia_mostrar_valor from public.configuracoes_clinica c where c.clinica_id = p.clinica_id and c.excluido_em is null limit 1), true) then p.valor end');
    assert v_novo <> v_def, 'n8n_contexto: trecho de preço não encontrado';
    execute v_novo;
  end if;
  select pg_get_functiondef(p.oid) into v_def from pg_proc p join pg_namespace n on n.oid = p.pronamespace
   where n.nspname = 'public' and p.proname = 'n8n_ferramenta';
  if v_def is not null and position('ia_mostrar_valor' in v_def) = 0 then
    v_novo := replace(v_def, 'case when p.ia_preco_publico then p.valor end',
      'case when p.ia_preco_publico and coalesce((select c.ia_mostrar_valor from public.configuracoes_clinica c where c.clinica_id = p.clinica_id and c.excluido_em is null limit 1), true) then p.valor end');
    -- procedimento agendado pela IA: a avaliação, quando a clínica não agenda procedimento direto
    v_novo := replace(v_novo,
      'v_proc := public.ia_resolver_procedimento(t.clinica_id, coalesce(v_args ->> ''procedimento_id'', v_args ->> ''procedimento''));',
      'v_proc := public.ia_resolver_procedimento(t.clinica_id, coalesce(v_args ->> ''procedimento_id'', v_args ->> ''procedimento'')); v_proc := public.ia_procedimento_efetivo(t.clinica_id, v_proc);');
    assert position('ia_procedimento_efetivo' in v_novo) > 0, 'n8n_ferramenta: trecho de procedimento não encontrado';
    execute v_novo;
  end if;
end $$;
