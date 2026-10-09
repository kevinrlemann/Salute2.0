-- Funil com 5 etapas: Novo Lead, Aguardando atendente, Agendado, Convertido, Perdido.

-- 1) "Em Contato" passa a ser "Aguardando atendente"
update public.etapas_funil
   set nome = 'Aguardando atendente', chave = 'aguardando_atendente', cor = '#F5B400'
 where chave = 'em_contato' and excluido_em is null;

-- 2) leads em "Avaliação" vão para "Aguardando atendente" do mesmo funil
--    (o gatilho tg_leads_movimentacao grava o histórico da mudança)
update public.leads l
   set etapa_id = a.id
  from public.etapas_funil av
  join public.etapas_funil a on a.funil_id = av.funil_id and a.chave = 'aguardando_atendente' and a.excluido_em is null
 where av.chave = 'avaliacao' and av.excluido_em is null and l.etapa_id = av.id and l.excluido_em is null;

-- 3) "Avaliação" sai do funil (exclusão lógica)
update public.etapas_funil set excluido_em = now()
 where chave = 'avaliacao' and excluido_em is null
   and not exists (select 1 from public.leads l where l.etapa_id = etapas_funil.id and l.excluido_em is null);

-- 4) ordem e nomes finais
update public.etapas_funil
   set ordem = case chave when 'novo_lead' then 1 when 'aguardando_atendente' then 2 when 'agendado' then 3
                          when 'convertido' then 4 when 'perdido' then 5 end,
       nome = case chave when 'novo_lead' then 'Novo Lead' when 'aguardando_atendente' then 'Aguardando atendente'
                         when 'agendado' then 'Agendado' when 'convertido' then 'Convertido' when 'perdido' then 'Perdido' end
 where chave in ('novo_lead', 'aguardando_atendente', 'agendado', 'convertido', 'perdido') and excluido_em is null;

-- 5) clínicas novas já nascem com as mesmas 5 etapas
do $$
declare v_def text := pg_get_functiondef('public.semear_padroes_clinica'::regproc);
        v_novo text;
begin
  v_novo := regexp_replace(v_def,
    'insert into public\.etapas_funil \(clinica_id, funil_id, nome, chave, ordem, cor, tipo_final\) values.*?''perdido'', 7, ''#E5484D'', ''perdido''\);',
    'insert into public.etapas_funil (clinica_id, funil_id, nome, chave, ordem, cor, tipo_final) values
      (p_clinica, v_funil, ''Novo Lead'', ''novo_lead'', 1, ''#1F5EFF'', ''aberta''),
      (p_clinica, v_funil, ''Aguardando atendente'', ''aguardando_atendente'', 2, ''#F5B400'', ''aberta''),
      (p_clinica, v_funil, ''Agendado'', ''agendado'', 3, ''#22C3F2'', ''aberta''),
      (p_clinica, v_funil, ''Convertido'', ''convertido'', 4, ''#2DBF6A'', ''ganho''),
      (p_clinica, v_funil, ''Perdido'', ''perdido'', 5, ''#E5484D'', ''perdido'');');
  if v_novo = v_def then
    raise exception 'semear_padroes_clinica: bloco das etapas do funil não encontrado';
  end if;
  execute v_novo;
end $$;
