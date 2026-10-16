-- Planos (2026-10-16, decisão do fundador): o controle é por USUÁRIO (não por profissional): 2 usuários incluídos em
-- Inicial, Assistente e IA Pro; cada usuário a mais custa R$ 49,90 por mês. Limite de armazenamento por plano (GB) e
-- a IA conversacional do WhatsApp só nos planos IA Pro e Enterprise.
alter table public.planos add column if not exists limite_armazenamento_gb integer;
update public.planos set limite_usuarios = 2 where codigo in ('inicial', 'assistente', 'iapro') and excluido_em is null;
update public.planos set limite_armazenamento_gb = case codigo when 'inicial' then 5 when 'assistente' then 10 when 'iapro' then 25 else null end
 where excluido_em is null and limite_armazenamento_gb is null;
update public.planos set itens = (select jsonb_agg(case when x ~* 'profissionais e .* usu' then '2 usuários incluídos (mais usuários: R$ 49,90 cada por mês)' else x end)
                                   from jsonb_array_elements_text(itens) x)
 where codigo in ('inicial', 'assistente', 'iapro') and excluido_em is null and itens::text ~* 'profissionais e .* usu';
update public.planos_adicionais set preco = 49.90, nome = '+1 usuário', descricao = 'Cada usuário além dos 2 incluídos no plano.' where codigo = 'usuario_extra' and excluido_em is null;
update public.planos_adicionais set ativo = false where codigo = 'profissional_extra' and excluido_em is null;

-- a clínica tem a IA conversacional do WhatsApp? (plano IA Pro ou Enterprise, ou clínica sem assinatura = não)
create or replace function public.plano_ia_whatsapp(p_clinica uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce((select pl.codigo in ('iapro', 'enterprise')
                     from public.assinaturas_clinica a join public.planos pl on pl.id = a.plano_id
                    where a.clinica_id = p_clinica and a.excluido_em is null limit 1), false)
$$;
revoke execute on function public.plano_ia_whatsapp(uuid) from anon, public;
grant execute on function public.plano_ia_whatsapp(uuid) to authenticated, service_role;

-- a IA do WhatsApp só responde no plano certo (motivo 'plano_sem_ia')
do $$
declare d text;
begin
  select pg_get_functiondef('public.agente_pode_responder(uuid)'::regprocedure) into d;
  if position('plano_sem_ia' in d) > 0 then return; end if;
  d := replace(d, E'  if a.id is null or not a.ia_ativa then return jsonb_build_object(''pode'', false, ''motivo'', ''ia_desligada''); end if;',
                  E'  if a.id is null or not a.ia_ativa then return jsonb_build_object(''pode'', false, ''motivo'', ''ia_desligada''); end if;\n  if not public.plano_ia_whatsapp(cv.clinica_id) then return jsonb_build_object(''pode'', false, ''motivo'', ''plano_sem_ia''); end if;');
  if position('plano_sem_ia' in d) = 0 then raise exception 'patch nao encaixou'; end if;
  execute d;
end $$;
