# Supabase

## Projeto alvo: "Salute IA novo visual"

- Ref: `gbhsslyoybqjvjznlave` (região us-east-1, Postgres 17)
- **Todas as edições de banco, Auth, Storage e funções são feitas neste projeto.**
- Front aponta para ele via `front/config.js` (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `BASE_PATH`).
- Schema `public`: ~115 tabelas, todas com RLS ligado. Principais grupos:
  - Acesso: `perfis_usuario`, `clinicas`, `usuarios_clinicas`, `permissoes`, `acessos_suporte`, `auditoria`
  - Pacientes e agenda: `pacientes`, `pacientes_telefones`, `profissionais`, `agendamentos`, `horarios_*`, `bloqueios_horario`, `fila_espera`, `historico_paciente`, `anamnese_*`, `mapeamento*`, `documentos_paciente`
  - CRM: `funis`, `etapas_funil`, `leads`, `movimentacoes_lead`, `origens_lead`, `motivos_perda`
  - Conversas: `instancias_whatsapp`, `canais_conectados`, `conversas`, `mensagens`, `respostas_rapidas`, `canais_equipe`, `mensagens_equipe`
  - Financeiro: `contas_receber`, `contas_pagar`, `parcelas`, `formas_pagamento`, `contas_bancarias`, `orcamentos`, `notas_fiscais`, `metas_profissional`
  - Estoque: `produtos`, `lotes`, `movimentacoes_estoque`, `fornecedores`
  - IA Renata: `renata_conversas`, `renata_mensagens`, `renata_acoes`, `renata_configuracoes`, `renata_base_conhecimento`, `renata_consumo`, `ia_config`
  - Assinatura: `planos`, `assinaturas_clinica`, `historico_assinatura`
  - Segredos: `segredos_integracao` (ponteiros para o Vault; sem acesso pelo front)
- Edge function: `renata` (`verify_jwt=true`).

O inventário detalhado (colunas, relações, policies) é a entrega do Prompt 2 em `docs/auditoria/`.

## Projeto legado: "Salute CRM"

- Ref: `pigfhkmtqyatuaudpgyy` (sa-east-1)
- Somente consulta. Não editar.
- 24 edge functions, todas com `verify_jwt=false`: instagram-webhook, send-instagram-message, test-channel-token, google-calendar-auth/callback/create-event/update-event, renata-ai, send-invite-email, submit-anamnese, receive-chamado-update, crm-webhook, icp-send-document, process-scheduled-messages, classify-service-tag, send-chat-message, anamnese-otp-send/verify, anamnese-save-draft, documento-qr-upload, send-clinic-email, evolution-create-instance, anamnese-publica-get, document-signing.

## Regras

- Mudança de schema = migration versionada neste repositório antes de aplicar.
- Nunca usar `service_role` no front nem commitar segredos.
- Testar RLS com dois usuários de clínicas diferentes antes de publicar.
