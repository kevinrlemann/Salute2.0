-- Importação da agenda do WhatsApp (conexão por QR Code, Evolution API) como pacientes ou leads.
-- Aplicada no banco em 2026-10-16 em dois passos (o valor novo do enum precisa ser confirmado antes do uso).
alter type public.origem_registro add value if not exists 'whatsapp';

-- Importa contatos (nome + telefone) como pacientes ou como leads, sem duplicar pelo telefone.
create or replace function public.importar_contatos_whatsapp(p_clinica uuid, p_contatos jsonb, p_como text default 'paciente')
returns jsonb language plpgsql security definer set search_path = public as $$
declare
  v_item jsonb; v_nome text; v_tel text; v_dig text;
  v_criados int := 0; v_repetidos int := 0; v_ignorados int := 0;
  v_funil uuid; v_etapa uuid; v_origem uuid;
begin
  if p_como not in ('paciente', 'lead') then raise exception 'Tipo de importação inválido'; end if;
  if p_como = 'paciente' and not public.pode(p_clinica, 'pacientes') then raise exception 'Sem acesso aos pacientes desta clínica'; end if;
  if p_como = 'lead' and not (public.pode(p_clinica, 'mensagens') or public.pode(p_clinica, 'pacientes')) then raise exception 'Sem acesso ao funil desta clínica'; end if;
  if p_como = 'lead' then
    select id into v_funil from public.funis where clinica_id = p_clinica and padrao and excluido_em is null order by criado_em limit 1;
    select id into v_etapa from public.etapas_funil where funil_id = v_funil and chave = 'novo_lead' and excluido_em is null limit 1;
    select id into v_origem from public.origens_lead where clinica_id = p_clinica and pai_id is null and excluido_em is null and lower(nome) = 'whatsapp' limit 1;
  end if;
  for v_item in select * from jsonb_array_elements(coalesce(p_contatos, '[]'::jsonb)) limit 5000 loop
    v_nome := left(btrim(coalesce(v_item->>'nome', '')), 120);
    v_dig := regexp_replace(coalesce(v_item->>'telefone', ''), '\D', '', 'g');
    if v_nome = '' or length(v_dig) < 10 then v_ignorados := v_ignorados + 1; continue; end if;
    v_tel := '+' || v_dig;
    if p_como = 'paciente' then
      if exists (select 1 from public.pacientes p where p.clinica_id = p_clinica and p.excluido_em is null
                   and (regexp_replace(coalesce(p.whatsapp, ''), '\D', '', 'g') = v_dig or regexp_replace(coalesce(p.telefone, ''), '\D', '', 'g') = v_dig))
         or exists (select 1 from public.pacientes_telefones t join public.pacientes p on p.id = t.paciente_id
                     where p.clinica_id = p_clinica and p.excluido_em is null and t.excluido_em is null and regexp_replace(coalesce(t.numero, ''), '\D', '', 'g') = v_dig) then
        v_repetidos := v_repetidos + 1; continue;
      end if;
      insert into public.pacientes (clinica_id, nome, whatsapp, origem_cadastro, observacoes)
      values (p_clinica, v_nome, v_tel, 'whatsapp', 'Importado da agenda do WhatsApp em ' || to_char(now(), 'DD/MM/YYYY'));
    else
      if exists (select 1 from public.leads l where l.clinica_id = p_clinica and l.excluido_em is null and regexp_replace(coalesce(l.telefone, ''), '\D', '', 'g') = v_dig)
         or exists (select 1 from public.pacientes p where p.clinica_id = p_clinica and p.excluido_em is null and regexp_replace(coalesce(p.whatsapp, ''), '\D', '', 'g') = v_dig) then
        v_repetidos := v_repetidos + 1; continue;
      end if;
      insert into public.leads (clinica_id, funil_id, etapa_id, nome, telefone, origem_id, interesse)
      values (p_clinica, v_funil, v_etapa, v_nome, v_tel, v_origem, 'Importado da agenda do WhatsApp');
    end if;
    v_criados := v_criados + 1;
  end loop;
  return jsonb_build_object('criados', v_criados, 'repetidos', v_repetidos, 'ignorados', v_ignorados);
end $$;
revoke execute on function public.importar_contatos_whatsapp(uuid, jsonb, text) from anon, public;
grant execute on function public.importar_contatos_whatsapp(uuid, jsonb, text) to authenticated;
