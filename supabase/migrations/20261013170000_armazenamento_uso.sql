-- Armazenamento usado por clínica (2026-10-13): soma os arquivos do Storage (todos os buckets, pasta <clinica_id>/...)
-- e o tamanho das linhas das tabelas de texto (conversas e cadastros). Mostrado em Minha conta › Plano e cobrança, ao lado do uso da IA.
create or replace function public.armazenamento_uso(p_clinica uuid)
returns jsonb
language plpgsql
stable security definer
set search_path to 'public'
as $$
declare v_arq jsonb; v_txt jsonb; v_total bigint; v_n bigint; v_mensagens bigint; v_cadastros bigint; v_n_msg bigint;
begin
  if not (p_clinica in (select public.minhas_clinicas()) or public.eh_admin_plataforma()) then return null; end if;
  -- arquivos no Storage, por tipo
  select coalesce(jsonb_agg(jsonb_build_object('tipo', t.tipo, 'arquivos', t.n, 'bytes', t.bytes) order by t.bytes desc), '[]'::jsonb),
         coalesce(sum(t.bytes), 0), coalesce(sum(t.n), 0)
    into v_arq, v_total, v_n
    from (
      select case
               when o.bucket_id = 'mensagens' and split_part(o.name, '/', 2) = 'conversas' then 'Mídias do WhatsApp (fotos, áudios, vídeos e documentos)'
               when o.bucket_id = 'mensagens' and split_part(o.name, '/', 2) = 'contatos' then 'Fotos de perfil dos contatos'
               when o.bucket_id = 'mensagens' and split_part(o.name, '/', 2) = 'figurinhas' then 'Figurinhas'
               when o.bucket_id = 'mensagens' then 'Outros arquivos do WhatsApp'
               when o.bucket_id = 'clinica' and split_part(o.name, '/', 2) = 'pacientes' then 'Fotos de pacientes'
               when o.bucket_id = 'clinica' and split_part(o.name, '/', 2) = 'profissionais' then 'Fotos de profissionais'
               when o.bucket_id = 'clinica' then 'Logotipo e imagens da clínica'
               when o.bucket_id in ('pacientes', 'prontuario') then 'Documentos e prontuários de pacientes'
               when o.bucket_id = 'comprovantes' then 'Comprovantes'
               when o.bucket_id = 'fiscal' then 'Notas fiscais'
               when o.bucket_id = 'conteudos' then 'Conteúdos'
               else 'Outros arquivos' end as tipo,
             count(*) as n, coalesce(sum((o.metadata ->> 'size')::bigint), 0) as bytes
        from storage.objects o
       where split_part(o.name, '/', 1) = p_clinica::text
       group by 1) t;
  -- texto das conversas e dos cadastros (tamanho real das linhas no banco)
  select coalesce(sum(pg_column_size(m.*)), 0), count(*) into v_mensagens, v_n_msg from public.mensagens m where m.clinica_id = p_clinica;
  v_mensagens := v_mensagens + coalesce((select sum(pg_column_size(c.*)) from public.conversas c where c.clinica_id = p_clinica), 0);
  v_cadastros := coalesce((select sum(pg_column_size(x.*)) from public.pacientes x where x.clinica_id = p_clinica), 0)
               + coalesce((select sum(pg_column_size(x.*)) from public.leads x where x.clinica_id = p_clinica), 0)
               + coalesce((select sum(pg_column_size(x.*)) from public.agendamentos x where x.clinica_id = p_clinica), 0)
               + coalesce((select sum(pg_column_size(x.*)) from public.procedimentos_realizados x where x.clinica_id = p_clinica), 0)
               + coalesce((select sum(pg_column_size(x.*)) from public.anamnese_respostas x where x.clinica_id = p_clinica), 0)
               + coalesce((select sum(pg_column_size(x.*)) from public.contas_receber x where x.clinica_id = p_clinica), 0)
               + coalesce((select sum(pg_column_size(x.*)) from public.contas_pagar x where x.clinica_id = p_clinica), 0)
               + coalesce((select sum(pg_column_size(x.*)) from public.documentos_paciente x where x.clinica_id = p_clinica), 0);
  v_txt := jsonb_build_array(
    jsonb_build_object('tipo', 'Conversas do WhatsApp (texto das mensagens)', 'arquivos', v_n_msg, 'bytes', v_mensagens, 'unidade', 'mensagens'),
    jsonb_build_object('tipo', 'Cadastros e registros (pacientes, agenda, prontuário, financeiro)', 'arquivos', null, 'bytes', v_cadastros));
  return jsonb_build_object(
    'total_bytes', v_total + v_mensagens + v_cadastros,
    'arquivos_bytes', v_total, 'arquivos', v_n,
    'dados_bytes', v_mensagens + v_cadastros,
    'tipos', v_arq || v_txt,
    'calculado_em', now());
end $$;
revoke execute on function public.armazenamento_uso(uuid) from public, anon;
