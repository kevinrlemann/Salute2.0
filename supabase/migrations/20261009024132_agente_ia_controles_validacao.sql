-- Validação dos controles do Agente de IA e versão automática da configuração.
do $$ begin
  alter table public.agente_ia add constraint agente_ia_controles_ok check (
    tamanho_resposta in ('curta', 'media', 'longa')
    and idioma in ('pt-BR', 'en', 'es')
    and politica_sinal in ('nenhum', 'opcional', 'obrigatorio_confirmar', 'obrigatorio_reservar', 'aprovacao_humana')
    and sinal_tipo in ('fixo', 'percentual')
    and sinal_valor >= 0 and (sinal_tipo <> 'percentual' or sinal_valor <= 100)
    and antecedencia_min_horas between 0 and 720 and horizonte_dias between 1 and 365
    and intervalo_entre_consultas_min between 0 and 240
    and janela_inicio < janela_fim and transferencia_inicio < transferencia_fim
    and followup_max between 0 and 10
    and coalesce(array_length(followup_atrasos_min, 1), 0) <= 10
    and 0 < all (followup_atrasos_min)
    and lembretes_offsets_min <@ array[2880, 1440, 120, 15]
    and transferencia_sla_min between 1 and 1440
    and retencao_conversas_dias between 30 and 3650
    and coalesce(array_length(followup_mensagens, 1), 0) <= 10
    and coalesce(array_length(transferencia_categorias, 1), 0) <= 30
    and coalesce(array_length(palavras_optout, 1), 0) <= 50
    and char_length(saudacao) <= 500 and char_length(transferencia_mensagem) <= 500
    and char_length(privacidade_texto) <= 1500
    and jsonb_typeof(crm_mapa) = 'object');
exception when duplicate_object then null; end $$;

do $$ begin
  alter table public.procedimentos add constraint procedimentos_ia_descricao_tam check (char_length(coalesce(ia_descricao, '')) <= 600);
exception when duplicate_object then null; end $$;

-- cada gravação sobe a versão (o n8n compara para saber se a configuração mudou)
create or replace function public.agente_ia_versao()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.config_versao := coalesce(old.config_versao, 0) + 1;
  return new;
end $$;

do $$ begin
  if not exists (select 1 from pg_trigger where tgname = 'tg_agente_ia_versao') then
    create trigger tg_agente_ia_versao before update on public.agente_ia for each row execute function public.agente_ia_versao();
  end if;
end $$;
