-- P0-07 (parte sem decisão): o envio público de documentos só registra arquivo que existe de verdade no Storage,
-- usa tamanho e tipo do próprio Storage, não registra o mesmo arquivo duas vezes e aceita até 30 arquivos por link.
-- Respostas de anamnese ficam limitadas a 10 mil caracteres. A lista de tipos de arquivo aceitos depende do fundador.
create or replace function public.registrar_documento_link(p_token text, p_path text, p_nome text, p_mime text, p_tamanho bigint)
returns void language plpgsql security definer set search_path to 'public' as $function$
declare l record; o record; v_nome text; v_mime text;
begin
  select * into l from public.links_envio_documentos where token = p_token and excluido_em is null for update;
  if not found or l.expira_em < now() or l.status not in ('aguardando', 'recebido') then raise exception 'Link inválido ou vencido'; end if;
  if p_path is null or p_path not like l.clinica_id::text || '/links/' || l.token || '/%' or p_path like '%..%' then raise exception 'Arquivo fora da pasta do link'; end if;
  if coalesce(l.recebidos, 0) >= 30 then raise exception 'Este link já recebeu o máximo de 30 arquivos. Peça um novo link à clínica.'; end if;
  select so.metadata into o from storage.objects so where so.bucket_id = 'prontuario' and so.name = p_path;
  if not found then raise exception 'Arquivo não encontrado. Envie de novo.'; end if;
  if exists (select 1 from public.documentos_paciente d where d.arquivo_path = p_path and d.excluido_em is null) then return; end if;
  v_nome := left(nullif(trim(regexp_replace(coalesce(p_nome, ''), '[\r\n\t<>]', ' ', 'g')), ''), 200);
  v_mime := left(coalesce(nullif(o.metadata ->> 'mimetype', ''), nullif(p_mime, ''), 'application/octet-stream'), 120);
  insert into public.documentos_paciente (clinica_id, paciente_id, pasta_id, nome_arquivo, arquivo_path, tipo_arquivo, mime_type, tamanho_bytes, origem, link_envio_id, enviado_por)
  values (l.clinica_id, l.paciente_id, l.pasta_id, coalesce(v_nome, 'arquivo'), p_path,
          case when v_mime like 'image/%' then 'imagem'::public.tipo_arquivo_documento when v_mime = 'application/pdf' then 'pdf' else 'outro' end,
          v_mime, coalesce(nullif(o.metadata ->> 'size', '')::bigint, p_tamanho), 'link_paciente', l.id, null);
  update public.links_envio_documentos set recebidos = recebidos + 1, status = 'recebido' where id = l.id;
end $function$;

create or replace function public.tg_anamnese_resposta_tamanho() returns trigger
language plpgsql set search_path = public as $fn$
begin
  if length(coalesce(new.resposta, '')) > 10000 or length(coalesce(new.detalhe, '')) > 10000 then
    raise exception 'Resposta muito longa (máximo de 10 mil caracteres).';
  end if;
  return new;
end $fn$;

do $$ begin
  if not exists (select 1 from pg_trigger where tgname = 'tg_anamnese_respostas_tamanho') then
    create trigger tg_anamnese_respostas_tamanho before insert or update of resposta, detalhe on public.anamnese_respostas
      for each row execute function public.tg_anamnese_resposta_tamanho();
  end if;
end $$;

revoke execute on function public.tg_anamnese_resposta_tamanho() from public, anon, authenticated;
