# Agente de IA (WhatsApp + n8n): contrato do banco

Base: documento "Arquitetura_Agente_IA_Salute_n8n_MultiClinicas" (enviado pelo fundador em 2026-10-09).
Estado em 2026-10-09: **banco pronto e testado** (38 de 38 casos em `supabase/testes/agente_ia_aceite.sql`);
**fluxos do n8n, envio real pelo WhatsApp e cobrança de sinal não existem ainda** (confirmado).

## Decisões do fundador (2026-10-09, confirmado)

- Sinal padrão: nenhum. A IA pode criar agendamento sozinha (`ia_cria_agendamento = true`).
- Follow-up: 3 h, 6 h, 2 dias e 7 dias sem resposta (`followup_atrasos_min = {180,360,2880,10080}`).
- Lembretes: 48 h, 24 h, 2 h e 15 min antes (`lembretes_offsets_min = {2880,1440,120,15}`).
- A IA nasce **desligada** (`ia_ativa = false`) e em **modo teste** (`modo_teste = true`). Ligar é decisão da clínica.

## Onde fica cada coisa (confirmado)

| Peça | Objeto no banco | Quem grava |
|---|---|---|
| Configuração da clínica | `agente_ia` (1 linha por clínica, `config_versao` sobe a cada alteração) | Gestão, pela aba Configurações › Agente de IA |
| Serviços que a IA oferece | `procedimentos.ia_agendavel`, `ia_preco_publico`, `ia_descricao` | Gestão |
| Webhooks recebidos (sem duplicar) | `entrada_webhook` | Só servidor (`registrar_webhook`) |
| Fila de trabalho (resposta, follow-up, lembrete, alerta) | `tarefas_automacao` | Só servidor e gatilhos |
| Fila de envio (outbox) | `envios_pendentes` | Gatilho ao gravar mensagem `enviada` + `pendente` |
| Transferência para a equipe | `transferencias_humanas` | `transferir_para_humano` / `resolver_transferencia` |
| Opt-in / opt-out / consentimento | `consentimentos` | Gatilho por palavra-chave, `registrar_optout` |
| Erros da automação | `erros_automacao` | `concluir_tarefa` quando a tarefa "morre" |

Todas as tabelas novas têm RLS e `clinica_id`. Usuário logado só **lê** a própria clínica; gravar direto é recusado.

## Funções (RPC) para o n8n

O n8n chama com a chave `service_role` (guardada só no n8n, nunca no repositório). As funções de fila recusam
qualquer outro papel.

| Função | Para que serve | Retorno |
|---|---|---|
| `registrar_webhook(provedor, evento_id, phone_number_id, payload)` | Grava o evento uma vez só; número desconhecido vai para quarentena | `{duplicado, quarentena, ...}` |
| `agente_ia_config(clinica)` | Retrato completo da configuração para o fluxo | `{agente, servicos, regras_texto, ...}` |
| `agente_ia_regras(clinica, canal)` | Texto de regras que entra no começo das instruções da IA | texto |
| `agente_pode_responder(conversa)` | Checa IA ligada, pausa geral, opt-out, conversa com a equipe | `{pode, motivo}` |
| `reivindicar_tarefas(tipos[], lote, trabalhador, segundos)` | Pega tarefas vencidas com trava (uma por conversa) | linhas com `token_trava` |
| `concluir_tarefa(id, token, resultado, erro)` | Fecha a tarefa; erro repete com espera crescente e vira `morta` no limite | `concluida` / `trava_perdida` / `morta` / ... |
| `validar_tarefa(id)` / `reagendar_tarefa(id, token, quando)` | Confere na hora do envio se o lembrete/follow-up ainda vale | `{pode, motivo}` |
| `reivindicar_envios(lote)` / `concluir_envio(id, ok, id_provedor, erro)` | Fila de saída para o WhatsApp | linhas / status |
| `horarios_disponiveis(clinica, procedimento, de, dias, profissional, limite)` | Horários livres em blocos de 30 min (fuso da clínica, expediente, pausas, bloqueios, feriados) | `{horarios: [...]}` |
| `reservar_agendamento(clinica, procedimento, profissional, inicio, paciente, lead, conversa, origem)` | Reserva com trava por profissional e nova checagem | `{status: confirmado / indisponivel / aguardando_equipe, agendamento_id}` |
| `transferir_para_humano(conversa, motivo, categoria, origem)` | Passa para a equipe, desliga a IA na conversa e avisa | id da transferência (não duplica) |
| `resolver_transferencia(id, reativar_ia)` | Equipe encerra a transferência | |
| `registrar_optout(clinica, telefone, tipo, origem, evidencia)` | Opt-in/opt-out manual | |
| `mover_etapa_lead(lead, destino, motivo, origem)` | Move no funil; a IA só avança, nunca sai de etapa final e "perdido" exige motivo | `{movido, ...}` |

## Automático (gatilhos, confirmado)

- Mensagem `enviada` com `status_entrega = pendente` entra em `envios_pendentes`.
- Mensagem da clínica sem resposta (com a IA ligada) cria a cadeia de follow-up uma vez por silêncio.
- Mensagem recebida cancela o follow-up e aplica opt-out se for a palavra exata (ou frase curta começando com ela).
- Criar/remarcar/cancelar agendamento sobe `agendamentos.versao`, cancela lembretes da versão velha e cria os novos.
- Atendimento finalizado (status `final` e `conta_atendimento`, hoje "Atendido"/"Compareceu") move os leads ligados
  (`agendamentos.lead_id`, `leads.agendamento_id` ou mesmo `paciente_id`) para a etapa de `crm_mapa.finalizado`
  (padrão `convertido`), se `crm_mover_automatico` estiver ligado. Não mexe em lead que já está em etapa final.
  Gatilho `tg_agendamentos_crm_finalizado`, migration `crm_atendimento_finalizado`. A regra entra em `agente_ia_regras`. [confirmado]

## Atenção: segunda implementação no mesmo banco (confirmado, não resolvido)

Na madrugada de 2026-10-09, **outra sessão fora desta** aplicou no mesmo Supabase as migrations
`ia_agente_01a..04` (tabelas `ia_automacao_config`, `ia_jobs`, `ia_outbox`, `ia_handoffs`, `ia_consentimentos`,
`ia_erros`, `ia_alertas`, `ia_webhook_inbox`, `ia_modelos_mensagem`, `ia_plataforma_config`, funções `ia_*` e
gatilhos em `conversas` e `mensagens`). Ela resolve o mesmo documento com outros nomes.

- As duas convivem hoje sem quebrar: os 38 testes passam com os gatilhos `ia_*` ativos.
- Essas migrations **não estão no repositório** (não confirmado de onde vieram).
- Antes de construir o n8n é preciso **escolher uma** e desativar a outra; com as duas ligadas, lembretes e
  follow-ups poderiam sair em dobro (inferido). Decisão do fundador.
- **Risco de segurança aberto:** as funções `ia_*` podem ser chamadas sem login e sem checar a clínica. Ver `docs/backlog.md` P0-13. [confirmado]
- Corrigido nesta sessão: `contato_optout` deixou de ser chamável direto por usuário (migration `contato_optout_interno`).

## Situação em 2026-10-09 (tarde) [confirmado]

- A segunda implementação foi absorvida: a camada `n8n_*` (outra sessão) roda sobre as tabelas deste documento.
- Gatilhos antigos `ia_*` em `agendamentos`, `conversas` e `mensagens` estão vazios. Tabelas `ia_jobs`/`ia_outbox`/`ia_handoffs` não são mais alimentadas.
- Peças `ia_*` ainda usadas (não apagar): `ia_despertar` (chama o n8n via `pg_net`), `ia_manutencao` (cron `ia-manutencao`, 1/min),
  `ia_notificar_equipe`, `ia_param`, `ia_tel_normalizar`, `ia_tel_variantes`, `ia_agendamento_do_contato`, `ia_resolver_*`.

## Quem configura (decisão do fundador, 2026-10-09) [confirmado]

Só o **administrador master** (`perfis_usuario.admin_plataforma`, função `eh_admin_plataforma()`) vê e altera o Agente de IA:
`agente_ia` (ler e gravar), `renata_horarios` e `renata_base_conhecimento` (gravar), campos `ia_*` de `procedimentos`
(gatilho `tg_procedimentos_campos_ia`) e `agente_ia_config` para usuário logado. `agente_ia_regras` só para o servidor.
A aba some para os demais e saiu das permissões da equipe (`SUBMODS.perfil`). Migration `agente_ia_so_admin_master`. Testes 39/39.

