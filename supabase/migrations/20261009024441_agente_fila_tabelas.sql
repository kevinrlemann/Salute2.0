-- Agente de IA (fases 2 a 4 da especificação): fila durável no banco, para o n8n poder cair e voltar sem perder trabalho.
-- Escrita só pelas funções (service_role / RPCs); o front só lê o que o módulo permite.

-- 1) eventos recebidos (webhook do WhatsApp), salvos antes de processar e sem duplicar
create table if not exists public.entrada_webhook (
  id uuid primary key default gen_random_uuid(),
  clinica_id uuid references public.clinicas(id),
  provedor text not null default 'whatsapp_cloud',
  evento_id text not null,
  phone_number_id text,
  payload_redigido jsonb not null default '{}'::jsonb,
  status text not null default 'recebido' check (status in ('recebido', 'enfileirado', 'processado', 'ignorado', 'quarentena', 'erro')),
  recebido_em timestamptz not null default now(),
  processado_em timestamptz,
  erro text,
  constraint entrada_webhook_unico unique (provedor, evento_id)
);

-- 2) fila de tarefas (processar entrada, follow-up, lembrete, envio, alerta)
create table if not exists public.tarefas_automacao (
  id uuid primary key default gen_random_uuid(),
  clinica_id uuid not null references public.clinicas(id),
  tipo text not null check (tipo in ('processar_entrada', 'followup', 'lembrete', 'enviar_mensagem', 'alerta')),
  status text not null default 'pendente' check (status in ('pendente', 'processando', 'concluida', 'cancelada', 'erro', 'morta')),
  chave_idempotencia text not null,
  payload jsonb not null default '{}'::jsonb,
  conversa_id uuid references public.conversas(id),
  lead_id uuid references public.leads(id),
  agendamento_id uuid references public.agendamentos(id),
  versao_agendamento integer,
  executar_em timestamptz not null default now(),
  tentativas integer not null default 0,
  max_tentativas integer not null default 5 check (max_tentativas between 1 and 20),
  travada_ate timestamptz,
  token_trava uuid,
  trabalhador text,
  ultimo_erro text,
  motivo_cancelamento text,
  concluida_em timestamptz,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  constraint tarefas_automacao_chave unique (chave_idempotencia)
);
create index if not exists tarefas_automacao_fila on public.tarefas_automacao (status, executar_em) where status in ('pendente', 'processando');
create index if not exists tarefas_automacao_conversa on public.tarefas_automacao (conversa_id, tipo, status);
create index if not exists tarefas_automacao_agendamento on public.tarefas_automacao (agendamento_id, tipo, status);

-- 3) mensagens aprovadas para envio (separadas da decisão da conversa)
create table if not exists public.envios_pendentes (
  id uuid primary key default gen_random_uuid(),
  clinica_id uuid not null references public.clinicas(id),
  conversa_id uuid not null references public.conversas(id),
  mensagem_id uuid references public.mensagens(id),
  tipo text not null default 'resposta' check (tipo in ('resposta', 'equipe', 'followup', 'lembrete', 'transferencia', 'fora_horario', 'sistema')),
  payload jsonb not null default '{}'::jsonb,
  chave_idempotencia text not null,
  status_envio text not null default 'pendente' check (status_envio in ('pendente', 'enviando', 'enviado', 'falhou', 'cancelado')),
  tentativas integer not null default 0,
  proxima_tentativa_em timestamptz not null default now(),
  provedor_mensagem_id text,
  erro text,
  enviado_em timestamptz,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now(),
  constraint envios_pendentes_chave unique (chave_idempotencia)
);
create index if not exists envios_pendentes_fila on public.envios_pendentes (status_envio, proxima_tentativa_em) where status_envio in ('pendente', 'enviando');

-- 4) transferência para a equipe (handoff)
create table if not exists public.transferencias_humanas (
  id uuid primary key default gen_random_uuid(),
  clinica_id uuid not null references public.clinicas(id),
  conversa_id uuid references public.conversas(id),
  lead_id uuid references public.leads(id),
  categoria text,
  motivo text not null,
  origem text not null default 'ia' check (origem in ('ia', 'equipe', 'paciente', 'sistema')),
  status text not null default 'aberta' check (status in ('aberta', 'em_atendimento', 'resolvida', 'cancelada')),
  atribuida_a uuid references auth.users(id),
  sla_ate timestamptz,
  criada_em timestamptz not null default now(),
  resolvida_em timestamptz,
  resolvida_por uuid references auth.users(id),
  atualizado_em timestamptz not null default now()
);
create index if not exists transferencias_abertas on public.transferencias_humanas (clinica_id, status) where status in ('aberta', 'em_atendimento');
create unique index if not exists transferencias_uma_aberta_por_conversa on public.transferencias_humanas (conversa_id) where status in ('aberta', 'em_atendimento');

-- 5) consentimento e opt-out (o último evento por telefone decide)
create table if not exists public.consentimentos (
  id uuid primary key default gen_random_uuid(),
  clinica_id uuid not null references public.clinicas(id),
  telefone text not null,
  paciente_id uuid references public.pacientes(id),
  lead_id uuid references public.leads(id),
  canal text not null default 'whatsapp',
  tipo text not null check (tipo in ('optin', 'optout', 'consentimento_dados')),
  origem text not null check (origem in ('mensagem', 'equipe', 'sistema')),
  evidencia text,
  capturado_em timestamptz not null default now(),
  criado_por uuid default auth.uid()
);
create index if not exists consentimentos_telefone on public.consentimentos (clinica_id, telefone, capturado_em desc);

-- 6) falhas que esgotaram as tentativas (dead-letter) para revisão
create table if not exists public.erros_automacao (
  id uuid primary key default gen_random_uuid(),
  clinica_id uuid references public.clinicas(id),
  tarefa_id uuid references public.tarefas_automacao(id),
  envio_id uuid references public.envios_pendentes(id),
  origem text not null,
  codigo text,
  mensagem_sanitizada text,
  tentativas integer not null default 0,
  criado_em timestamptz not null default now(),
  resolvido_em timestamptz,
  resolvido_por uuid references auth.users(id)
);

-- versão do agendamento (lembretes da versão antiga são cancelados ao remarcar)
alter table public.agendamentos add column if not exists versao integer not null default 1;
-- janela de 24 h do WhatsApp: última mensagem recebida do contato
alter table public.conversas add column if not exists ultima_entrada_em timestamptz;

-- acesso: front só lê; gravação só pelas funções
alter table public.entrada_webhook enable row level security;
alter table public.tarefas_automacao enable row level security;
alter table public.envios_pendentes enable row level security;
alter table public.transferencias_humanas enable row level security;
alter table public.consentimentos enable row level security;
alter table public.erros_automacao enable row level security;

do $$ begin
  create policy entrada_webhook_admin on public.entrada_webhook for select using ((select public.eh_admin_plataforma()));
  create policy tarefas_automacao_ler on public.tarefas_automacao for select using (clinica_id in (select public.clinicas_gestao()));
  create policy envios_pendentes_ler on public.envios_pendentes for select using (clinica_id in (select public.clinicas_permitidas('mensagens')));
  create policy transferencias_ler on public.transferencias_humanas for select using (clinica_id in (select public.clinicas_permitidas('mensagens')));
  create policy consentimentos_ler on public.consentimentos for select using (clinica_id in (select public.clinicas_permitidas('mensagens')));
  create policy erros_automacao_ler on public.erros_automacao for select using (clinica_id in (select public.clinicas_gestao()) or (select public.eh_admin_plataforma()));
exception when duplicate_object then null; end $$;

revoke all on public.entrada_webhook, public.tarefas_automacao, public.envios_pendentes, public.transferencias_humanas,
  public.consentimentos, public.erros_automacao from anon;
revoke insert, update, delete on public.entrada_webhook, public.tarefas_automacao, public.envios_pendentes,
  public.transferencias_humanas, public.consentimentos, public.erros_automacao from authenticated;

do $$ begin
  create trigger tg_tarefas_automacao_atualizado before update on public.tarefas_automacao for each row execute function public.tocar_atualizado_em();
  create trigger tg_envios_pendentes_atualizado before update on public.envios_pendentes for each row execute function public.tocar_atualizado_em();
  create trigger tg_transferencias_atualizado before update on public.transferencias_humanas for each row execute function public.tocar_atualizado_em();
  create trigger tg_transferencias_auditoria after insert or update on public.transferencias_humanas for each row execute function public.auditar();
  create trigger tg_consentimentos_auditoria after insert on public.consentimentos for each row execute function public.auditar();
exception when duplicate_object then null; end $$;
