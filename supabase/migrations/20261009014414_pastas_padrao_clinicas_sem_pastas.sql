-- Clínicas sem as pastas padrão de documentos (o QR de envio ficava sem pasta de destino).
-- Mesmas pastas que semear_padroes_clinica cria para clínicas novas.
insert into public.pastas_documentos (clinica_id, nome, ordem, padrao)
select c.id, v.nome, v.ordem, true
  from public.clinicas c
 cross join (values ('Antes', 1), ('Depois', 2), ('Documentação Clínica', 3), ('Antes e Depois', 4)) as v(nome, ordem)
 where c.excluido_em is null
   and not exists (select 1 from public.pastas_documentos p
                    where p.clinica_id = c.id and p.paciente_id is null and p.excluido_em is null);
