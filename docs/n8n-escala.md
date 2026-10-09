# Arquitetura do n8n para 100 clínicas (WhatsApp + IA)

Estado em 2026-10-09 (tarde). Marcações: [confirmado] testado no banco/código; [inferido] dedução; [não confirmado] depende de algo fora do repositório.

## Ideia central

Um único n8n atende **todas** as clínicas. Ele não tem regra nem dado de nenhuma clínica guardado dentro dele:
tudo vem do banco por `clinica_id`. Isolar por dado, e não por cópia de fluxo, é o que deixa 100 clínicas
(ou 1.000) com a mesma manutenção de uma. [confirmado]

```
Paciente ──WhatsApp──> Provedor (Evolution / Z-API / Meta)
                          │ webhook com ?i=<instância>&t=<segredo>
                          ▼
              Função "whatsapp" (Supabase)  ── baixa foto/áudio/vídeo/documento ──> Storage "mensagens/<clínica>/..."
                          │ n8n_ingerir_evento (não duplica, acha a clínica pelo número/instância)
                          ▼
   Banco (fonte da verdade): conversas · mensagens · leads · tarefas_automacao · envios_pendentes
                          │ gatilho acorda o n8n (pg_net → webhook do fluxo)
                          ▼
   n8n: pega tarefas (fila justa) → monta contexto → IA → grava a resposta → fila de envio
                          │ n8n_envio_preflight monta o pedido certo para o provedor da clínica
                          ▼
                     Provedor envia ──> Paciente
   Front (navegador): lê/grava só a própria clínica (RLS) e recebe tudo em tempo real.
```

## O que garante o isolamento [confirmado]

- Toda tabela de negócio tem `clinica_id` e RLS. Testes 46/46 (`supabase/testes/agente_ia_aceite.sql`) incluem:
  estranho não vê fila, mensagens nem WhatsApp de ninguém; dono não vê mensagens nem leads de outra clínica.
- O n8n usa a chave de servidor **só dentro dele**; as funções `n8n_*` recusam qualquer outro papel.
- Webhook de provedor só entra com o segredo da instância (`webhook_token`); número desconhecido vai para quarentena.
- Chaves de WhatsApp e IA ficam no cofre (Vault), por clínica. Nunca voltam para o navegador.

## O que garante a escala [confirmado]

| Problema com 100 clínicas | Solução no banco |
|---|---|
| Uma clínica com pico de mensagens atrasa as outras | Fila justa: rodízio por clínica e no máximo `tarefas_simultaneas_clinica` (padrão 4) tarefas da IA por clínica ao mesmo tempo |
| Número bloqueado por disparo rápido (API não oficial) | No máximo `envios_minuto_clinica` (padrão 30) mensagens por minuto por clínica, em rodízio |
| Duas respostas fora de ordem na mesma conversa | Uma tarefa e um envio por conversa por vez |
| Mensagem duplicada | Chave única por evento do provedor e por tarefa; envio confere o estado antes de mandar |
| Falha silenciosa | `erros_automacao` + aviso automático ao dono/gestor (uma vez por tipo a cada 30 min) |
| n8n parado | Varredura a cada minuto (`ia-manutencao`) e reprocessamento das travas vencidas |

Os dois limites mudam sem código: `update ia_plataforma_config set valor = '6' where chave = 'tarefas_simultaneas_clinica';`

## Dimensionamento do n8n [inferido]

Estimativa para 100 clínicas com uso alto (300 conversas/dia por clínica, 6 mensagens por conversa):
cerca de 180 mil mensagens/dia, picos de 20 a 40 execuções por segundo no horário comercial.

- **n8n Cloud Starter/Pro não aguenta** esse volume (limite de execuções por mês e de concorrência). [inferido]
- Recomendado: n8n **auto-hospedado em modo fila** (queue mode): 1 instância principal + 1 processador de webhooks
  + 3 a 6 *workers*, Redis e Postgres próprio do n8n (não o da Salute). Em VPS de 8 vCPU / 16 GB já roda; escalar
  aumentando workers. Variáveis principais: `EXECUTIONS_MODE=queue`, `QUEUE_BULL_REDIS_HOST`, `N8N_CONCURRENCY_PRODUCTION_LIMIT=20`
  por worker, `EXECUTIONS_DATA_PRUNE=true`, `EXECUTIONS_DATA_MAX_AGE=72`.
- IA: com 100 clínicas a chave grátis do Groq esgota em minutos. Cada clínica deve usar a própria chave
  (Conexões da Renata) ou a Salute contrata plano pago com limite por clínica (`renata_limite_mes`).
- WhatsApp não oficial: uma instância por clínica no **mesmo** servidor Evolution aguenta ~50 a 100 números por
  servidor de 4 vCPU [inferido]; para 100 clínicas, 2 servidores ou Z-API (gerenciado, cobra por instância).

## Estado real hoje [confirmado]

- Banco, fila, regras, isolamento, mídia e conexão por QR Code: prontos e testados.
- **Os fluxos do n8n estão desligados**: todas as chamadas do banco para `kevinlemann1.app.n8n.cloud` voltam
  "webhook not registered" (404). Sem ativar os fluxos, nada é respondido pela IA no WhatsApp.
- Os fluxos do n8n não estão no repositório (não confirmado o conteúdo de cada um).
