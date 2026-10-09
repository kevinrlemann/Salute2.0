-- Controles do Agente de IA no front (seção 3 da "Arquitetura do Agente de IA no n8n").
-- A clínica configura tudo na tela; o n8n só lê (agente_ia_config) a cada turno e antes de cada envio.
-- Reaproveita o que já existe: clinicas.fuso_horario, horarios_funcionamento, horarios_profissional,
-- bloqueios_horario, procedimentos, profissionais_procedimentos, renata_horarios, renata_base_conhecimento e etapas_funil.
-- Padrões decididos pelo fundador em 2026-10-09: sinal "nenhum", IA pode criar agendamento, follow-up ligado
-- (3 h, 6 h, 2 dias, 7 dias) e os quatro lembretes ligados (48 h, 24 h, 2 h, 15 min).

alter table public.agente_ia
  add column if not exists ia_ativa boolean not null default false,
  add column if not exists automacoes_pausadas boolean not null default false,
  add column if not exists modo_teste boolean not null default true,
  add column if not exists saudacao text not null default 'Olá! Sou a Renata, assistente virtual da clínica. Como posso ajudar?',
  add column if not exists tamanho_resposta text not null default 'curta',
  add column if not exists idioma text not null default 'pt-BR',
  add column if not exists apresentar_como_assistente boolean not null default true,
  add column if not exists ia_consulta_horarios boolean not null default true,
  add column if not exists ia_cria_agendamento boolean not null default true,
  add column if not exists politica_sinal text not null default 'nenhum',
  add column if not exists sinal_tipo text not null default 'fixo',
  add column if not exists sinal_valor numeric(10,2) not null default 0,
  add column if not exists antecedencia_min_horas integer not null default 2,
  add column if not exists horizonte_dias integer not null default 30,
  add column if not exists intervalo_entre_consultas_min integer not null default 0,
  add column if not exists janela_inicio time not null default '08:00',
  add column if not exists janela_fim time not null default '20:00',
  add column if not exists crm_mover_automatico boolean not null default true,
  add column if not exists crm_mapa jsonb not null default '{"novo":"novo_lead","em_contato":"aguardando_atendente","agendado":"agendado","humano":"aguardando_atendente","perdido":"perdido"}'::jsonb,
  add column if not exists followup_ativo boolean not null default true,
  add column if not exists followup_max integer not null default 4,
  add column if not exists followup_atrasos_min integer[] not null default array[180, 360, 2880, 10080],
  add column if not exists followup_parar_ao_responder boolean not null default true,
  add column if not exists followup_parar_se_agendado boolean not null default true,
  add column if not exists followup_mensagens text[] not null default array[
    'Oi! Passando para saber se ficou alguma dúvida. Posso ajudar a encontrar um horário?',
    'Olá! Consegui separar alguns horários para você. Quer que eu mostre?',
    'Oi! Ainda tenho horários disponíveis nos próximos dias. Posso reservar um para você?',
    'Oi! Vou encerrar por aqui, mas fico à disposição quando quiser agendar.'],
  add column if not exists lembretes_ativos boolean not null default true,
  add column if not exists lembretes_offsets_min integer[] not null default array[2880, 1440, 120, 15],
  add column if not exists lembrete_pedir_confirmacao boolean not null default true,
  add column if not exists lembrete_permitir_cancelar boolean not null default true,
  add column if not exists transferencia_usuarios uuid[] not null default '{}',
  add column if not exists transferencia_inicio time not null default '08:00',
  add column if not exists transferencia_fim time not null default '18:00',
  add column if not exists transferencia_categorias text[] not null default array[
    'Pedido para falar com uma pessoa', 'Reclamação', 'Dúvida clínica ou sobre sintomas',
    'Pedido de desconto ou exceção', 'Pagamento, reembolso ou estorno'],
  add column if not exists transferencia_mensagem text not null default 'Vou chamar alguém da nossa equipe para continuar com você. Já já te respondemos.',
  add column if not exists transferencia_sla_min integer not null default 30,
  add column if not exists privacidade_texto text not null default 'Seus dados são usados só para o seu atendimento nesta clínica. Para não receber mais mensagens, responda PARAR.',
  add column if not exists pedir_consentimento boolean not null default false,
  add column if not exists palavras_optout text[] not null default array['parar', 'pare', 'sair', 'não quero mais', 'remover meu número', 'não me chame'],
  add column if not exists retencao_conversas_dias integer not null default 365,
  add column if not exists config_versao integer not null default 1;

alter table public.procedimentos
  add column if not exists ia_preco_publico boolean not null default true,
  add column if not exists ia_agendavel boolean not null default true,
  add column if not exists ia_descricao text;
