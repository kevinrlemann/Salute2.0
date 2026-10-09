-- P0-07: o paciente só envia pelo link PDF e fotos (JPG, PNG, HEIC/HEIF, WEBP, GIF). SVG e outros tipos ficam de fora.
-- Também limita a 40 arquivos brutos por pasta de link (o registro já limita a 30 documentos).
create or replace function public.link_documentos_envio_permitido(p_nome text) returns boolean
language sql stable security definer set search_path = public as $fn$
  select public.link_documentos_caminho_valido(p_nome)
     and lower(coalesce(storage.extension(p_nome), '')) in ('pdf', 'jpg', 'jpeg', 'png', 'heic', 'heif', 'webp', 'gif')
     and (select count(*) from storage.objects o
           where o.bucket_id = 'prontuario'
             and o.name like (storage.foldername(p_nome))[1] || '/links/' || (storage.foldername(p_nome))[3] || '/%') < 40
$fn$;
revoke execute on function public.link_documentos_envio_permitido(text) from public;
grant execute on function public.link_documentos_envio_permitido(text) to anon, authenticated;

alter policy salute_prontuario_link_paciente on storage.objects
  with check (bucket_id = 'prontuario' and public.link_documentos_envio_permitido(name));
