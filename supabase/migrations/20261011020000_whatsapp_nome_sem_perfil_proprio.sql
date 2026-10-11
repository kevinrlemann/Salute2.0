-- WhatsApp: o nome do contato nunca vem do próprio perfil.
-- Antes, uma mensagem enviada pelo celular da clínica (de_mim) criava a conversa e o lead
-- com o nome de quem enviou, e o nome ficava para sempre (coalesce só preenche se estiver vazio).
-- Agora, nas mensagens de_mim, o nome fica vazio. A função é reescrita a partir da versão atual.
do $$
declare d text;
begin
  select pg_get_functiondef('public.n8n_ingerir_evento'::regproc) into d;
  d := replace(d, 'values (v_inst.clinica_id, v_inst.id, v_tel, v_nome, v_pac, null)',
                  'values (v_inst.clinica_id, v_inst.id, v_tel, case when v_de_mim then null else v_nome end, v_pac, null)');
  d := replace(d, 'coalesce(v_nome, v_tel), v_tel, v_conv.id',
                  'coalesce(case when v_de_mim then null else v_nome end, v_tel), v_tel, v_conv.id');
  execute d;
end $$;

-- Limpeza: conversas e leads que ficaram com o nome do próprio perfil e não têm nenhuma mensagem recebida.
update public.conversas c set nome_contato = null
 where c.nome_contato = 'Kevin Lemann'
   and not exists (select 1 from public.mensagens m where m.conversa_id = c.id and m.direcao = 'recebida');

update public.leads l set nome = 'Sem identificação'
 where l.nome = 'Kevin Lemann'
   and exists (select 1 from public.conversas c where c.lead_id = l.id)
   and not exists (select 1 from public.conversas c join public.mensagens m on m.conversa_id = c.id
                    where c.lead_id = l.id and m.direcao = 'recebida');
