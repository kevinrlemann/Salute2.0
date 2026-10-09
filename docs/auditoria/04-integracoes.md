# Auditoria 04 — Integrações e automações (n8n, WhatsApp, IA, voz, Supabase, links públicos)

Data: 2026-10-09 · Prompt 4 do manual ("Mapear n8n e integrações") · **Modo: somente leitura.**
Nada do sistema foi alterado. Nenhuma chamada a serviço externo, nenhuma mensagem enviada. No Supabase
(`gbhsslyoybqjvjznlave`) só foram feitas consultas de catálogo e contagens agregadas; do cofre (Vault) só os
**nomes** dos segredos foram lidos, nunca os valores. O projeto antigo (`pigfhkmtqyatuaudpgyy`) não foi tocado.

Material: `front/extraido/*.js` (estado do commit `af596dd`), `supabase/functions/renata/{index.ts,groq.ts}`
(idênticos à versão 8 publicada, conferido pela ferramenta do Supabase), `supabase/migrations/`, `netlify.toml`,
`deploy/netlify/`, catálogo do banco.

Legenda: **[confirmado]** visto no código ou no banco · **[inferido]** conclusão provável, não comprovada ·
**[não confirmado]** não deu para verificar daqui (depende de painel/serviço externo).
Evidência: `arquivo:linha`; para o arquivo minificado `d47643ae…js`, `L<linha>:<caractere>`.
Abreviações: `c001` = `5a1e7e02-0000-4000-8000-00000000c001.js` (idem `c003`, `c005`, `c007`, `c00a`, `c00b`);
`1b7a` = `1b7a2c45-9aaa-498f-b865-94e5afcf4bea.js`; `d476` = `d47643ae-b8a0-4818-aa7e-589c16dc4060.js`;
`7bf0` = `7bf00496-6fbf-4ada-843a-7cfa5fe32f77.js`.

---

## 1) Resumo executivo (para o fundador)

1. **n8n não existe no sistema hoje.** Não há nenhuma chamada, URL, segredo, gatilho ou tabela que fale com n8n.
   A única menção é um comentário na migration do Agente de IA dizendo que "depois" o n8n do WhatsApp vai usar as
   mesmas regras. [confirmado]
2. **O WhatsApp não envia nem recebe nada de verdade.** Quando alguém "envia" uma mensagem, ela só é gravada no
   banco como `pendente`; ninguém a entrega. A tela mostra o "✓ enviado" mesmo assim. "Conectar WhatsApp" só grava
   "conectado" numa tabela; o QR Code é um desenho falso; o endereço de webhook mostrado aponta para uma função
   (`whatsapp`) que **não existe**. A Renata diz "Pronto! Enviei no WhatsApp" quando só deixou a mensagem pendente.
   Hoje há 0 números conectados e 2 mensagens pendentes paradas. [confirmado]
3. **A IA da Renata funciona pelo Groq** (grátis, com 3 modelos de reserva) através da função de servidor `renata`,
   que também faz a **voz pela ElevenLabs** (texto→fala e fala→texto). As chaves ficam no cofre do Supabase ou nos
   segredos da função; nunca vão para o navegador. As regras do "Agente de IA" entram sempre no começo das
   instruções. Há limite mensal de mensagens quando a clínica usa a chave da Salute. [confirmado]
4. **Exceção importante:** quando o sistema é aberto **dentro do claude.ai** (artifact), a Renata usa primeiro a IA
   do próprio claude.ai e **pula a função `renata`** — nesse caminho as regras do Agente de IA e o limite mensal
   **não valem**. No site `saluteia.site` isso não acontece. [confirmado no código]
5. **Links públicos** (anamnese por 7 dias; envio de documentos por QR por 24 h) funcionam sem login, protegidos por
   um código longo e aleatório, só por funções do banco. Estão bem amarrados (o arquivo só entra na pasta da clínica
   dono do link). Não há aviso automático ao paciente: o link precisa ser copiado/mostrado pela equipe. [confirmado]
6. **Não há e-mail próprio**: todo e-mail (confirmar cadastro, senha nova, convite) é do Supabase Auth. Se o
   Supabase está usando um SMTP próprio ou o servidor padrão (que tem limite baixo de envios) **não dá para ver
   daqui**. [não confirmado]
7. **Não há tarefas agendadas** (`pg_cron` não está instalado) nem "webhooks de banco". O `pg_net` (chamadas HTTP
   saindo do banco) está instalado só para diagnóstico: guardou 19 respostas entre 00:52 e 01:54 de hoje, fechado
   para o público. [confirmado]
8. **Achado novo:** os **ícones de todo o sistema** são baixados na hora de um site externo (`unpkg.com`, biblioteca
   Lucide) sem verificação de integridade. Se esse site cair ou for adulterado, o sistema fica sem ícones ou roda
   código de terceiros. [confirmado]
9. **Restos:** chave da Anthropic ainda guardada no cofre de 1 clínica (não é mais usada pelo servidor); valor
   `google` (Gemini) ainda existe na lista de provedores; tabelas legadas `ia_config` (com `webhook_url`) e
   `canais_conectados` vazias e sem uso; no modo demonstração o front ainda chama Anthropic/ElevenLabs direto do
   navegador. [confirmado]

---

## 2) Diagrama dos fluxos (texto)

```
                                   NAVEGADOR (equipe da clínica)
                     saluteia.site (Netlify, branch producao)  ou  artifact claude.ai
 ┌────────────────────────────────────────────────────────────────────────────────────────┐
 │  index.html + config.js (URL Supabase + chave pública anon)                            │
 │  Bibliotecas: React/ReactDOM, supabase-js, qrcode — EMBUTIDAS no index.html            │
 │  ⚠ Ícones: baixados em tempo real de https://unpkg.com/lucide@0.468.0 (sem SRI)        │
 │  Links soltos: YouTube (Saluteflix), Google Maps, console.groq.com (passo a passo)     │
 └───┬───────────────┬───────────────────┬──────────────────────┬────────────────────────┘
     │ Auth/REST/RPC  │ Storage            │ Realtime (websocket) │ POST /functions/v1/renata
     ▼               ▼                   ▼                      ▼
 ┌──────────────────────────────── SUPABASE gbhsslyoybqjvjznlave ───────────────────────────┐
 │ Auth (e-mails: cadastro, senha, convite)  ── SMTP: [não confirmado]                       │
 │ Postgres + RLS + RPCs                       Vault (chaves)  ← salvar_segredo / ler_segredo │
 │ Storage: clinica, prontuario, mensagens, fiscal, conteudos (+ pacientes, comprovantes      │
 │          sem uso no front)                                                                 │
 │ Realtime: agendamentos, leads, conversas, mensagens, notificacoes, anamnese_envios, ...    │
 │ pg_net (diagnóstico, fechado)   ·   SEM pg_cron   ·   SEM database webhooks               │
 │                                                                                            │
 │ Edge Function "renata" (verify_jwt) ──► api.groq.com  (gpt-oss-120b → gpt-oss-20b → qwen)  │
 │      ações: status/testar/chat/voz/transcrever  └──► api.elevenlabs.io (TTS e STT)        │
 └────────────────────────────────────────────────────────────────────────────────────────┘
          ▲                                             │
          │ RPC anônima por token                       │ mensagens.status_entrega='pendente'
          │                                             ▼
 ┌────────┴─────────────────────┐            ┌───────────────────────────────────────┐
 │ PACIENTE (sem login)          │            │   ✗ NINGUÉM LÊ / ENVIA                 │
 │ /?a=TOKEN  anamnese (7 dias)  │            │   ✗ função "whatsapp" não existe       │
 │ /?u=TOKEN  documentos (24 h)  │            │   ✗ n8n / Evolution / Meta: inexistente│
 └──────────────────────────────┘            └───────────────────────────────────────┘

 Só dentro do claude.ai: Renata → window.claude.use('sample') (IA do claude.ai), antes do servidor.
 Só no modo demonstração (sem config.js): Renata → api.anthropic.com / api.elevenlabs.io direto do navegador.
```

---

## 3) Tabela-resumo

| # | Integração | Quem inicia | Serviço chamado | O que grava | Credencial (nome/onde) | Situação |
|---|---|---|---|---|---|---|
| 1 | n8n | — | — | — | — | **Não existe** [confirmado] |
| 2 | WhatsApp (envio) | Equipe/Renata na tela | **nenhum** | `mensagens` (pendente), `anexos_mensagem`, bucket `mensagens` | Vault `salute:<clinica>:whatsapp_meta` (nenhum gravado) | **Não funciona** [confirmado] |
| 3 | WhatsApp (receber/webhook) | Meta/Evolution (externo) | `/functions/v1/whatsapp` | — | — | **Função não existe** [confirmado] |
| 4 | WhatsApp (conectar número) | Tela Integrações | nenhum (QR falso) | `instancias_whatsapp` | `whatsapp_meta` / `whatsapp_nao_oficial` | **Só cadastro** [confirmado] |
| 5 | Groq (IA da Renata) | Renata no navegador → função `renata` | `api.groq.com/openai/v1/chat/completions` | `renata_consumo`, `renata_configuracoes` (teste) | Vault `salute:<clinica>:groq` ou segredo da função `GROQ_API_KEY` | **Funciona** [confirmado código] |
| 6 | ElevenLabs (fala e escuta) | Renata (voz) → função `renata` | `api.elevenlabs.io/v1/text-to-speech`, `/speech-to-text` | `renata_consumo` | Vault `…:elevenlabs` ou `ELEVENLABS_API_KEY` | **Funciona** [confirmado código] |
| 7 | Agente de IA | Gestor salva regras | (aplicado pela função `renata`) | `agente_ia` | — | **Funciona no servidor**; ignorado no caminho claude.ai |
| 8 | IA do claude.ai (`window.claude`) | Renata dentro do artifact | runtime do claude.ai | `renata_conversas/mensagens` | sessão do claude.ai | Ativo só no artifact [confirmado] |
| 9 | Anthropic / Gemini (restos) | Só modo demo / nenhum | `api.anthropic.com` (demo) | localStorage (demo) | Vault `…:anthropic` (1 clínica, sem uso) | **Resto** [confirmado] |
| 10 | Supabase Auth (e-mails) | Usuário (cadastro/senha/convite) | Supabase Auth | `auth.users`, gatilhos → `perfis_usuario`, `usuarios_clinicas` | — | Funciona; SMTP [não confirmado] |
| 11 | Supabase Storage | Telas | Storage | 5 buckets usados | — | Funciona [confirmado] |
| 12 | Supabase Realtime | Telas | websocket | — (só leitura) | chave anon + sessão | Funciona [confirmado] |
| 13 | Anamnese pública | Equipe gera link; paciente abre | RPCs anônimas | `anamnese_envios`, `anamnese_respostas`, `notificacoes` | token de 144 bits | Funciona [confirmado] |
| 14 | Documentos por QR | Equipe gera QR; paciente envia | Storage + RPCs anônimas | bucket `prontuario`, `documentos_paciente`, `links_envio_documentos` | token de 144 bits | Funciona [confirmado] |
| 15 | pg_net | Equipe Salute (manual, SQL) | HTTP saindo do banco | `net._http_response` (19 linhas) | — | Só diagnóstico [confirmado] |
| 16 | pg_cron / agendamentos | — | — | — | — | **Não instalado** [confirmado] |
| 17 | Netlify | Push na branch `producao` | Netlify | — | conta Netlify (fora do repo) | Ativo; ligação ao Git [não confirmado] |
| 18 | CDN `unpkg.com` (ícones) | Navegador, ao abrir | `unpkg.com/lucide@0.468.0` | — | — | **Ativo, sem SRI** [confirmado] |
| 19 | E-mail próprio / SMTP / Resend | — | — | — | — | **Não existe no código** [confirmado] |

---

## 4) Detalhe de cada integração

### 4.1 n8n

- **Não há nenhuma referência funcional ao n8n** em `front/extraido/*.js`, na função `renata`, nas migrations ou nas
  funções do banco (busca por `n8n`, `webhook`, `evolution`, `net.http`, `http_post` em `pg_proc` → nenhuma). [confirmado]
- A única menção está em comentário: `supabase/migrations/20261009014745_agente_ia.sql:44` ("servidor da Renata e,
  depois, o n8n do WhatsApp"). [confirmado]
- A função `agente_ia_regras(p_clinica, p_canal)` **já está pronta para o n8n**: com `p_canal = 'whatsapp'` ela devolve
  as regras se `aplicar_whatsapp = true` e aceita chamada com `service_role` (`20261009014745_agente_ia.sql:45-68`). [confirmado]
- `docs/conexoes.md`: "n8n ❌ sem conector". Não existe instância n8n conhecida. [confirmado no doc]

### 4.2 WhatsApp — envio pela tela ("Mensagens")

| Pergunta | Resposta |
|---|---|
| Quem inicia | Usuário na tela Mensagens (`WaChat` → `MsgSvc.enviar`, `c005:524`) ou a Renata (`MsgSvc.enviarTextoPaciente`, `c005:643`). [confirmado] |
| Payload | `{conversa_id, tipo, texto/legenda, resposta_a_mensagem_id, figurinha_id, direcao:'enviada', enviada_por_ia:false, status_entrega:'pendente'}` (`c005:563-589`). Se a conversa não existe, cria em `conversas`. Anexo: arquivo no bucket `mensagens` em `<clinica>/conversas/<id>/…` (`c005:606`, caminho em `c001:446`) + linha em `anexos_mensagem` (`c005:610`). [confirmado] |
| Serviço chamado | **Nenhum.** Só o banco. [confirmado] |
| Dado salvo | `mensagens`, `conversas`, `anexos_mensagem`, bucket `mensagens`. O gatilho `tg_mensagens_conversa` → `mensagem_atualiza_conversa` atualiza prévia/hora da conversa e `leads.ultima_interacao_em`. [confirmado no banco] |
| Resposta | A tela mostra a mensagem com "✓". O mapa `TICK` exibe `pendente` **e `falhou`** como `'sent'` (`c005:64-70`): o usuário acha que foi. [confirmado] |
| Erro | Se o banco recusar: aviso "Mensagem não enviada" (`c005:589`). Não existe erro de entrega porque não existe entrega. [confirmado] |
| Credencial | Nenhuma usada. [confirmado] |

Banco hoje: 8 conversas, 17 mensagens, **2 com `status_entrega = 'pendente'`**, 1 anexo; nenhuma com `whatsapp_mensagem_id`
[contagem agregada, confirmado]. Nenhum gatilho, função, cron ou `pg_net` lê as pendentes [confirmado].

**Renata e WhatsApp (mensagem enganosa):** a ferramenta `propor_envio_anamnese` cria o link e grava a mensagem pendente;
depois responde "Pronto! Enviei a … no WhatsApp." (`1b7a:8160-8196`). O mesmo vale para `propor_mensagem_paciente`
(`1b7a:8210-8235`). [confirmado]

**Confirmação de agendamento por WhatsApp:** a chave "Enviar confirmação por WhatsApp" grava
`agendamentos.enviar_confirmacao_whatsapp = true` (`c003:1515`; tela `1b7a:10279`; Renata `1b7a:7428`).
`confirmacao_enviada_em` está vazio em todos os agendamentos — nada envia. [confirmado]

### 4.3 WhatsApp — conectar número e webhook

| Pergunta | Resposta |
|---|---|
| Quem inicia | Gestor em Configurações → Integrações (`d476 L12:259973` → `WaSvc.conectar`, `c007:596`). [confirmado] |
| Payload | `instancias_whatsapp {nome, tipo_api:'oficial'|'nao_oficial', status:'conectado', conectado_em, numero, phone_number_id, waba_id, url_webhook, padrao:true}` (`c007:601-612`). Token da API oficial → RPC `salvar_segredo(p_provedor:'whatsapp_meta')` (`c007:636-641`). [confirmado] |
| Serviço chamado | **Nenhum.** Não valida o token na Meta, não cria instância em Evolution/Z-API. [confirmado] |
| Dado salvo | `instancias_whatsapp` (status "conectado" sem conexão real); segredo no Vault como `salute:<clinica>:whatsapp_meta:<época>` + ponteiro em `segredos_integracao`; `salvar_segredo` marca `token_configurado`/`token_final` (últimos 4 caracteres) (`20261009040100_groq_salvar_segredo.sql:40-41`). [confirmado] |
| QR Code (modo não oficial) | `FakeQR` com semente `'wa'+Date.now()` — desenho, não é QR de pareamento (`d476 L12:264587`). [confirmado] |
| URL de webhook exibida | `WaSvc.webhook()` = `url_webhook` salvo ou `SUPABASE_URL + '/functions/v1/whatsapp?clinica=<id>'` (`c007:592-595`; exibida em `d476 L12:267147`). No modo demo: `https://api.salute.app/webhooks/whatsapp/bellaforma` (`d476 L12:260266`). A função `whatsapp` **não existe** (só `renata`, versão 8). [confirmado] |
| Erro | Só erro de gravação no banco ("Não foi possível conectar o WhatsApp"). [confirmado] |

Banco hoje: `instancias_whatsapp` = 0 linhas; nenhum segredo `whatsapp_*` no Vault. Enum `tipo_api_whatsapp = {oficial, nao_oficial}`,
`status_instancia = {desconectado, aguardando_qr, conectando, conectado, erro}` (estados de QR já previstos, sem uso). [confirmado]

### 4.4 Groq — IA da Renata (servidor)

| Pergunta | Resposta |
|---|---|
| Quem inicia | Renata no navegador, só quando **não** está dentro do claude.ai e não há janela de voz-ponte: `rnClaudeApi` → `rnFn({acao:'chat'})` (`1b7a:2769-2786`; `c00a:51-82`). Ordem real de quem responde em `1b7a:3283-3390`. [confirmado] |
| Payload que entra | `POST /functions/v1/renata` com `Authorization: Bearer <sessão>`, `apikey: <anon>`, corpo `{clinica_id, acao:'chat', primeira, payload:{model:'claude-…', max_tokens, system, tools, messages, stream:true}}`. O `system` contém as regras da Renata + **resumo da clínica com dados de pacientes** (`rnSnapshot`). [confirmado] |
| Verificações no servidor | Login válido (`index.ts:59-61`); membro ativo/aceito da clínica ou suporte com acesso vigente (`index.ts:78-89`); nome de modelo na lista (`index.ts:31,129`); até 100 mensagens, 40 ferramentas, 400 KB (`index.ts:34,132-135`); limite mensal quando usa a chave da Salute (`index.ts:137-146`, RPC `renata_limite_mes`, padrão `RENATA_LIMITE_PADRAO` = 300). [confirmado] |
| Serviço chamado | `https://api.groq.com/openai/v1/chat/completions` (`groq.ts:7`), modelos em ordem `openai/gpt-oss-120b` → `openai/gpt-oss-20b` → `qwen/qwen3.8-27b` (`groq.ts:10`). O pedido do formato Claude é traduzido (`paraGroq`, `groq.ts:61`); instruções cortadas em 7.000 caracteres (`groq.ts:20,64`); resposta máx. 1.000 tokens. [confirmado] |
| Regras do Agente de IA | RPC `agente_ia_regras(p_canal:'assistente')` colocada **antes** do texto do front (`index.ts:152-155`). [confirmado] |
| Dado salvo | `renata_consumo` via `renata_registrar_consumo` (mensagens e tokens) ao fim do streaming (`index.ts:161`). O front grava a conversa em `renata_conversas`/`renata_mensagens` e ações em `renata_acoes` (`c00a:641-759`). [confirmado] |
| Resposta | Streaming SSE convertido para os eventos do Claude (`eventosClaude`, `groq.ts:~100-160`). [confirmado] |
| Erro | 401 sem login; 403 sem acesso; 412 `sem_chave`; 400 modelo inválido; 413 conversa grande; 429 limite do mês. Groq: 429/413/404/5xx → próximo modelo; 413 → reenvia com resumo pela metade; todos no limite por ≤ 20 s → espera e tenta 1 vez; 401/403 → devolve direto (`groq.ts:172-208`). No navegador, falha → `rnSemIA` (comandos locais, `c00a:564`). Logs: `console.warn('[groq] …')`. [confirmado] |
| Teste | `acao:'testar'` manda "Responda apenas: ok" e grava `renata_configuracoes.claude_status_teste/claude_testado_em` (`index.ts:114-123`). [confirmado] |
| Credencial | `ler_segredo(clinica,'groq')` lê o Vault: primeiro a chave da clínica, senão a chave padrão (clinica_id nulo); se não houver, segredo da função **`GROQ_API_KEY`** (`index.ts:91-107`). Vault hoje: 1 chave `groq` de 1 clínica; nenhuma chave padrão no Vault (a padrão, se existir, está em `GROQ_API_KEY`) [confirmado nomes / não confirmado se `GROQ_API_KEY` está definida]. A chave da clínica é gravada pela tela "Conexões" → `salvar_segredo(p_provedor:'groq')` (`c00a:46-48, 213-230`); só dono/gestor. [confirmado] |

Observações:
- O front ainda manda `model: 'claude-…'` (`1b7a:2710-2712`); o servidor só usa para validar. [confirmado]
- **Privacidade:** dados de pacientes (resumo da clínica, fichas) vão para o Groq, um terceiro fora do Brasil. Precisa
  constar na política de privacidade/LGPD e no contrato. [inferido]
- CORS `Access-Control-Allow-Origin: *` (`index.ts:23-27`): qualquer site pode chamar, mas só com um login válido. [confirmado]

### 4.5 ElevenLabs — voz (fala e escuta)

| Pergunta | Resposta |
|---|---|
| Quem inicia | Renata falando (`rnFn({acao:'voz', texto, voice_id, modelo})`, `1b7a:2213-2222`) e ouvindo (`FormData acao='transcrever'`, `1b7a:4996-5010` e `1b7a:9160`). [confirmado] |
| Payload | Voz: texto (máx. 1.600 caracteres), voz padrão `RGymW84CSmfVugnA5tvA`, modelo `eleven_flash_v2_5` (`index.ts:170-172`). Escuta: arquivo de áudio `fala.webm`/`.m4a`, `model_id: scribe_v1`, `segundos`. [confirmado] |
| Serviço chamado | `POST https://api.elevenlabs.io/v1/text-to-speech/<voz>?output_format=mp3_44100_128` (`index.ts:173-177`) e `POST https://api.elevenlabs.io/v1/speech-to-text` (`index.ts:191`). [confirmado] |
| Dado salvo | `renata_consumo` (caracteres de voz / segundos) (`index.ts:179,194`). Ajustes de voz por clínica em `renata_voz` (`index.ts:168`; gravados pelo front em `c00a:256-263`). Áudio não é guardado. [confirmado] |
| Resposta | `audio/mpeg` (stream) ou JSON da transcrição. [confirmado] |
| Erro | 412 `sem_chave`; erro da ElevenLabs traduzido — se for falta de permissão, explica qual ligar (`index.ts:37-42`). No navegador, sem ElevenLabs a fala cai para a voz do aparelho (`speechSynthesis`, `1b7a:2142-2340`) e a escuta para o reconhecimento do navegador (`1b7a:2348`). [confirmado] |
| Credencial | Vault `salute:<clinica>:elevenlabs` (há 1, de 1 clínica) ou segredo da função **`ELEVENLABS_API_KEY`**. `salvar_segredo` marca `renata_voz.elevenlabs_configurada`. [confirmado nomes] |

### 4.6 Agente de IA (regras de conversa)

- Tela: Configurações → "Agente de IA" (`1b7a:3802-4221`); lê/grava `agente_ia` direto (`1b7a:3962, 4009`). RLS: ler = membros;
  criar/editar = dono/gestor (`20261009014745_agente_ia.sql:35-39`). Banco: 1 linha. [confirmado]
- Aplicação: **só** pela função `renata` (canal `assistente`). No caminho claude.ai (`window.claude`), as instruções são
  montadas só no navegador (`RENATA_RULES + rnSnapshot`, `1b7a:3364-3370`) e `agenteTexto` é usado apenas como prévia
  (`1b7a:4221`) — **as regras da clínica não entram**. [confirmado]
- Canal `whatsapp` já previsto na função do banco, sem consumidor. [confirmado]

### 4.7 IA do claude.ai (`window.claude`) e ponte da janela de voz

- Dentro do artifact, `rnGetSample()` → `window.claude.use('sample')` (`1b7a:2439-2446`) é tentado **antes** do servidor,
  também no modo conectado (`1b7a:3283-3325`). Envia regras + resumo da clínica + até 12 mensagens à IA do claude.ai.
  Se a permissão for negada, desliga e segue para o servidor (`1b7a:3455-3470`). [confirmado]
- Consequências: não passa por `agente_ia`, limite mensal, nem `renata_consumo`. [confirmado]
- Ponte com a janela de voz (`rnBridge`, `1b7a:2449-2490`), restrita à mesma origem (commit `809ff65`). [confirmado]
- `window.claude.use('permissions')` (`1b7a:2646`). [confirmado]

### 4.8 Restos de Anthropic / Gemini / OpenAI

- **Modo demonstração** (sem `config.js`, `SB_ON = false`): o navegador chama `https://api.anthropic.com/v1/messages`
  (`1b7a:2793`, teste `1b7a:3088`) e a ElevenLabs direto (`1b7a:2230`, `1b7a:5017`, `1b7a:9176`) com chave digitada,
  guardada em `localStorage` (`salute-kit:renata-ia`, `salute-kit:renata-voz`, `1b7a:1897-1906, 4347-4352`). Como a
  tela agora pede uma chave **Groq** ("Conectar o Groq (grátis)", link `console.groq.com/keys`, `1b7a:4270-4290`), no
  modo demo essa chave seria enviada à Anthropic e falharia. [confirmado código / inferido efeito]
- **Vault:** ainda existe `salute:<clinica>:anthropic` (1 clínica) e a linha em `segredos_integracao`. O servidor não
  usa mais `anthropic`. [confirmado]
- **Enum `provedor_integracao`:** `anthropic, elevenlabs, whatsapp_meta, whatsapp_nao_oficial, certificado_fiscal,
  outro, google, groq`. `google` (Gemini) sem uso: o front não tem mais nada de Gemini e `gemini.ts` foi removido. [confirmado]
- **OpenAI:** só como prefixo dos modelos abertos do Groq (`openai/gpt-oss-*`); nenhuma chamada à OpenAI. [confirmado]
- `ia_config` (legada: `webhook_url`, `prompt_base`, `modo`) e `canais_conectados`: 0 linhas, sem uso no front. [confirmado]

### 4.9 Supabase Auth (login e e-mails)

| Fluxo | Evidência | E-mail enviado por |
|---|---|---|
| Login | `signInWithPassword` (`c001:1811`, `c008:204`) | — |
| Cadastro de clínica | `signUp` com `emailRedirectTo` (`c001:1930-1938`, `c001:2004-2013`) | Supabase Auth |
| Esqueci a senha | `resetPasswordForEmail` (`c001:1842`, `c001:3109`, `c008:249`) | Supabase Auth |
| Troca de e-mail/senha | `updateUser` (`c001:1876`, `c008:136`, `c008:219`) | Supabase Auth |
| Convite de membro | 2º cliente sem sessão (`storageKey:'salute02-convite'`) + `signInWithOtp` (`c001:3138-3153`, `c007:382-390`) | Supabase Auth |

- Endereço de volta dos e-mails: `location.origin + BASE_PATH + '/login'` (`c001:162-170`). Precisa estar na lista de
  "Redirect URLs" do Supabase (`saluteia.site` e o domínio do artifact). [não confirmado]
- Gatilhos no banco: `novo_usuario`/`usuario_atualizado` → `ligar_convites`; `auto_confirmar_email` neutralizado
  (`20261009020000_s1_…sql`). [confirmado]
- **SMTP:** não há configuração de e-mail no repositório; o provedor de envio (SMTP próprio ou o padrão do Supabase,
  limitado a poucos e-mails/hora) **não pode ser visto daqui**. [não confirmado]
- `doisFatores` é só uma marcação; não há MFA (Auditoria 03). [confirmado]

### 4.10 Supabase Storage

| Bucket | Uso no front | Caminho | Limite | Evidência |
|---|---|---|---|---|
| `clinica` | logo, fotos de perfil | `<clinica>/usuarios/<uid>/…` | 10 MB | `c008:172` |
| `prontuario` | documentos do paciente; upload anônimo por link | `<clinica>/pacientes/<id>/documentos/…`; `<clinica>/links/<token>/…` | 50 MB | `c003:1158`, `c00b:2259` |
| `mensagens` | anexos de chat | `<clinica>/conversas/<id>/…`, `<clinica>/equipe/<id>/…` | 100 MB | `c005:606` |
| `fiscal` | certificado digital | `<clinica>/certificado/…` | 1 MB | `c006:609` |
| `conteudos` | Saluteflix/SaluteCast | — | 20 MB | `c007` (ContSvc) |
| `pacientes`, `comprovantes` | **sem uso no front** | — | 10/20 MB | catálogo |

Todos privados; leitura por link assinado de 1 h (`c001:525`, `c003:510`, `c005:233`). Policies: `salute_<bucket>_{enviar,ler,trocar}`
para `authenticated`; única para anônimo: `salute_prontuario_link_paciente` (INSERT, exige `link_documentos_caminho_valido`).
Sem policy de DELETE. [confirmado]

### 4.11 Supabase Realtime

`tempoReal(nome, tabelas)` (`c001:572-590`), filtro `clinica_id=eq.<clinica>`: `agenda`→`agendamentos` (`c003:1364`);
`mensagens`→`mensagens, conversas, mensagens_equipe, reacoes_mensagem, canais_equipe` (`c005:132`); `crm`→`leads` (`c005:872`);
`notificacoes` (`c005:1042`); `anamnese-ficha`→`anamnese_envios` (`d476 L9:106527`); `docs-ficha`→`documentos_paciente`
(`d476 L9:107291`). Publicação `supabase_realtime` cobre essas tabelas + `participantes_canal`, `tarefas*`. [confirmado]
Quando o WhatsApp existir, mensagens recebidas inseridas no banco **já aparecerão ao vivo** e gerarão notificação. [inferido pelo gatilho]

### 4.12 Link público de anamnese

| Pergunta | Resposta |
|---|---|
| Quem inicia | Equipe: `ProntSvc.enviarAnamnese` insere `anamnese_envios {modelo_id, paciente_id, modo}` (`c003:841-866`); o banco gera `token` (18 bytes aleatórios) e `expira_em = agora + 7 dias`. Link: `LINK_BASE + '/?a=' + token` (`c003:54, 454-456`). [confirmado] |
| Entrega ao paciente | **Manual** (copiar link/QR) ou mensagem WhatsApp **pendente** (Renata, `1b7a:8180`). Nada é enviado de fato. [confirmado] |
| Paciente abre | `RaizSalute` (`c00b:2520`) → `PaginaAnamnese` (`c00b:2055`) → RPC `anamnese_publica(p_token)` (`c00b:709`): devolve nome da clínica, primeiro nome e perguntas. [confirmado] |
| Rascunho | `salvar_rascunho_anamnese(p_token, p_rascunho)` (`c00b:734`), até 200 KB (Auditoria 02). [confirmado] |
| Envio final | `responder_anamnese(p_token, {respostas, assinatura})` (`c00b:759`); grava respostas, assinatura, IP, navegador e o **local GPS** (`anamnese_local_limpo`, `20261009013134_…sql`), e cria `notificacoes` (`prosrc` contém `notificacoes`). [confirmado] |
| Erro | RPC devolve erro → a página mostra estado de erro; token inválido/vencido recusado no banco. [confirmado] |
| Credencial | Nenhuma além do token; RPCs liberadas para `anon` de propósito. `regerar_link_anamnese` (com login) gera novo token de 7 dias. [confirmado] |

### 4.13 Envio de documentos por QR

| Pergunta | Resposta |
|---|---|
| Quem inicia | Equipe na ficha (aba Documentos): `ProntSvc.linkDocumentos` insere `links_envio_documentos {paciente_id, pasta_id}` (`c003:1290-1306`; tela `d476 L9:65234`); token aleatório, validade **24 h**. QR real gerado no navegador com `qrcode-generator` (`QRCodigo`, `d476 L9:~76750`); só no modo demo é `FakeQR` (`d476 L9:77150`). [confirmado] |
| Paciente envia | `PaginaEnvioDocs` (`c00b:2198`) → `link_documentos_publico(p_token)` (`c00b:2221`) devolve `pasta_upload = <clinica>/links/<token>` → upload em `prontuario` (`c00b:2259`) → `registrar_documento_link(p_token, p_path, p_nome, p_mime, p_tamanho)` (`c00b:2272`). [confirmado] |
| Dado salvo | Arquivo no bucket `prontuario`; `documentos_paciente` (`origem='link_paciente'`); `links_envio_documentos.recebidos/status`. Ficha atualiza ao vivo (`docs-ficha`). [confirmado no banco] |
| Erro | Link inválido/vencido → exceção "Link inválido ou vencido"; caminho fora da pasta → "Arquivo fora da pasta do link"; a página marca o arquivo com erro. Se o upload passar e o registro falhar, fica arquivo órfão no Storage. [confirmado código / inferido órfão] |
| Credencial | Token; policy anônima exige pasta = clínica do link + token válido (`20261009020200_medios_s3_a_s6.sql:6-25`). [confirmado] |

### 4.14 pg_net e pg_cron

- `pg_net 0.20.4` instalado por `20261009050000_pg_net_diagnostico.sql`, com `usage`/`execute` retirados de `anon` e
  `authenticated`. Nenhuma função do schema `public` chama `net.http_*`. `net.http_request_queue` vazia;
  `net._http_response` com 19 respostas (12×200, 5×401, 1×429, 1×413) entre 00:52 e 01:54 de 2026-10-09 — compatível
  com os testes de chave do Groq/ElevenLabs feitos durante a troca de IA. [confirmado contagem / inferido origem]
  As respostas guardadas podem conter trechos de texto devolvidos pelas APIs; o pg_net apaga sozinho depois de algumas horas
  (padrão 6 h). [inferido]
- `pg_cron`: **não instalado**; schema `cron` não existe. Também não existe o schema `supabase_functions` (webhooks de banco). [confirmado]
- Consequência: nada roda sozinho no horário (lembretes, confirmações, expiração de links por rotina, follow-up). A expiração
  dos links é feita "na hora em que alguém abre" (`link_documentos_publico` marca `expirado`). [confirmado]

### 4.15 Netlify e artifact

- `netlify.toml`: publica a pasta `front/`, sem build, e redireciona tudo para `index.html` (rotas `/painel`, `/a/…`). README: a
  branch **`producao`** publica `saluteia.site` (existe no remoto; `main` é desenvolvimento). [confirmado no repo]
- Se o Netlify está de fato ligado ao GitHub (deploy automático) não foi verificado aqui. [não confirmado]
- `deploy/netlify/` é cópia para "arrastar e soltar": o `config.js` é igual ao de `front/`, mas o **`index.html` está
  desatualizado** (hash diferente; último commit 03:07 contra 04:58 do `front/index.html`). Risco de publicar versão velha
  se alguém usar essa pasta. [confirmado]
- Artifact claude.ai `WtotK7P4yu9qhf9VWrAqhA`: mesmo bundle; ali a Renata usa a IA do claude.ai (4.7). [confirmado no código]
- Credenciais do Netlify ficam na conta Netlify (fora do repositório). [confirmado: nada no repo]

### 4.16 Bibliotecas e endereços externos carregados pelo front

| Recurso | Como | Evidência | Status |
|---|---|---|---|
| React/ReactDOM 18.3.1, supabase-js 2.117.2, qrcode-generator | **Embutidos** no `index.html` (com SRI no React) | `template.html:153-177` | confirmado |
| Fonte Aspekta | Embutida (.woff2) | `template.html` | confirmado |
| **Ícones Lucide 0.468.0** | `<script>` criado em tempo real de `https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js`, **sem `integrity`** | `7bf0:513-528`; usado por todo `Icon` (`1b7a:1875`, `c001:2405`, `366b46a2:27`, `30c3fd71:17`) | confirmado |
| YouTube (embed `youtube-nocookie.com`, miniaturas `i.ytimg.com`) | Saluteflix | `d476 L12` | confirmado |
| Google Maps | link de endereço | `d476 L11`, `c00b:128` | confirmado |
| `console.groq.com/keys` | link do passo a passo | `1b7a:4290` | confirmado |
| Google Fonts, jsDelivr, cdnjs, analytics | — | busca | **não encontrados** |

A Auditoria 01 dizia "sem CDN"; o Lucide via unpkg é **achado novo**. [confirmado]

---

## 5) Onde ficam as credenciais (só nomes)

| Credencial | Onde fica | Quem grava | Quem lê |
|---|---|---|---|
| Chave pública anon do Supabase | `front/config.js` (`SUPABASE_ANON_KEY`) — pública por design | repositório | navegador |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | segredos automáticos da edge function | Supabase | `index.ts:56` |
| `GROQ_API_KEY` | segredo da edge function (chave padrão Salute) | painel Supabase | `index.ts:105` |
| `ELEVENLABS_API_KEY` | segredo da edge function | painel Supabase | `index.ts:110,166,184` |
| `RENATA_LIMITE_PADRAO` | variável da edge function (padrão 300) | painel Supabase | `index.ts:33` |
| Chaves por clínica (`groq`, `elevenlabs`, `anthropic`, `google`, `whatsapp_meta`, `whatsapp_nao_oficial`, `certificado_fiscal`) | Vault, nome `salute:<clinica|padrao>:<provedor>:<época>`; ponteiro em `segredos_integracao` (sem acesso pelo front) | RPC `salvar_segredo` | RPC `ler_segredo` (só service_role) |
| Hoje no Vault | 3 segredos, todos de 1 clínica: `anthropic`, `groq`, `elevenlabs` | — | — |
| Chaves do modo demo | `localStorage` do navegador (`salute-kit:renata-ia`, `salute-kit:renata-voz`) | usuário | navegador |
| Netlify, GitHub | contas externas | — | — |

---

## 6) Lacunas

### 6.1 O que falta para o WhatsApp funcionar de verdade
1. **Escolher o provedor**: API oficial (Meta Cloud API: `phone_number_id`, `waba_id`, token permanente) ou não oficial
   (Evolution/Z-API: instância + QR). As colunas para os dois já existem em `instancias_whatsapp` (`provedor_nao_oficial`, `nome_instancia`).
2. **Receber (webhook de entrada)**: criar quem recebe os eventos — a edge function `whatsapp` que a tela já anuncia
   **ou** um webhook do n8n — com verificação de assinatura (Meta: `X-Hub-Signature-256` + `hub.verify_token`).
3. **Enviar (saída)**: um processo que pegue `mensagens` com `direcao='enviada'` e `status_entrega='pendente'`, envie e
   atualize `status_entrega`/`whatsapp_mensagem_id`/`entregue_em`/`lida_em`. Hoje nada faz isso.
4. **Gatilho do envio**: `pg_net` + gatilho em `mensagens`, Database Webhook do Supabase, `pg_cron` (não instalado) ou o n8n
   consultando de tempos em tempos.
5. **Conectar de verdade**: trocar o `FakeQR` pelo QR real do provedor não oficial e só gravar `status='conectado'`
   depois da confirmação do provedor (`aguardando_qr` → `conectando` → `conectado`/`erro` já existem no enum).
6. **Tela honesta**: mostrar `pendente` e `falhou` diferente de "enviado" (`c005:64-70`) e a Renata não dizer "Enviei".
7. **IA no WhatsApp**: usar `agente_ia_regras(clinica,'whatsapp')`, respeitar `conversas.ia_ativa`/`leads.ia_ativa`, gravar
   `enviada_por_ia=true`, e criar lead quando o número é novo (hoje **nada cria lead**, Auditoria 03).
8. **Confirmação de agendamento**: rotina que leia `agendamentos.enviar_confirmacao_whatsapp = true` e
   `confirmacao_enviada_em is null` e envie (precisa de agendamento → pg_cron ou n8n).
9. **Segredos para o n8n/worker**: um segredo de serviço (ex.: chave `service_role` ou um usuário técnico) guardado **só**
   no n8n/edge function, nunca no front.

### 6.2 Contrato mínimo sugerido (n8n ↔ Supabase), baseado nas tabelas existentes — **proposta, não implementado**

**A) Entrada (provedor → n8n → banco)** — por mensagem recebida:
```json
{
  "evento": "mensagem_recebida",
  "instancia": { "phone_number_id": "…" , "nome_instancia": "…" },
  "de": "5519999999999",
  "nome_contato": "Maria",
  "whatsapp_mensagem_id": "wamid.…",
  "tipo": "texto | imagem | video | audio | documento | figurinha",
  "texto": "…", "legenda": null,
  "midia": { "url_temporaria": "…", "mime_type": "…", "tamanho_bytes": 0, "duracao_segundos": null },
  "enviada_em": "2026-10-09T12:00:00Z"
}
```
Passos no n8n: (1) achar a clínica por `instancias_whatsapp.phone_number_id` ou `nome_instancia` (status `conectado`, `excluido_em is null`);
(2) `upsert` em `conversas` por `(clinica_id, telefone)` ligando `paciente_id` (via `pacientes.whatsapp`) ou criando `leads`
(funil padrão, etapa `novo_lead`); (3) inserir `mensagens {clinica_id, conversa_id, direcao:'recebida', tipo, texto, legenda,
enviada_em, whatsapp_mensagem_id, enviada_por_usuario_id:null, status_entrega:'entregue'}` — **sem duplicar** se o
`whatsapp_mensagem_id` já existir (idempotência; hoje não há índice único nessa coluna); (4) baixar a mídia para o bucket
`mensagens` em `<clinica>/conversas/<conversa>/…` e criar `anexos_mensagem`. O gatilho `mensagem_atualiza_conversa` já
atualiza a conversa, o lead e cria as `notificacoes`; o Realtime mostra na tela.

**B) Resposta automática (opcional)**: se `conversas.ia_ativa` e o lead não está pausado: chamar a IA com
`agente_ia_regras(clinica,'whatsapp')` + histórico da conversa; gravar a resposta como `mensagens {direcao:'enviada',
enviada_por_ia:true, status_entrega:'pendente'}` e seguir o fluxo C.

**C) Saída (banco → n8n → provedor)** — gatilho por mensagem pendente:
```json
{ "evento": "enviar_mensagem", "mensagem_id": "uuid", "clinica_id": "uuid" }
```
O n8n lê a mensagem, a conversa (`telefone`, `instancia_whatsapp_id`) e os anexos (link assinado do bucket), pega o token
(`ler_segredo(clinica,'whatsapp_meta')` — só com service_role), envia e devolve ao banco:
`status_entrega = 'enviada'` + `whatsapp_mensagem_id`; em erro `status_entrega = 'falhou'` (+ motivo, coluna a criar).

**D) Status (provedor → n8n → banco)**: `{ "evento":"status", "whatsapp_mensagem_id":"…", "status":"entregue|lida|falhou", "em":"…" }`
→ atualiza `status_entrega`, `entregue_em`, `lida_em`.

**E) Erros/retry**: tentar de novo com espera crescente (ex.: 3 vezes), registrar falhas, nunca reenviar mensagem já com
`whatsapp_mensagem_id`; webhook de entrada deve responder 200 rápido e processar depois.

### 6.3 Outras lacunas
| # | Lacuna | Nível |
|---|---|---|
| L1 | No artifact claude.ai, a Renata ignora Agente de IA, limite mensal e consumo (usa `window.claude`). | Médio |
| L2 | Ícones dependem de `unpkg.com` sem SRI (disponibilidade e segurança). Embutir o Lucide no bundle resolveria. | Médio |
| L3 | SMTP do Supabase Auth e "Redirect URLs" não verificados; com o servidor padrão, e-mails de convite/senha podem não chegar em volume. | Médio |
| L4 | Dados de pacientes enviados ao Groq e à ElevenLabs (terceiros) — falta registro LGPD/contrato. | Médio |
| L5 | Nenhuma rotina agendada (`pg_cron` ausente): confirmações, lembretes, follow-up, limpeza de links e de arquivos órfãos. | Médio |
| L6 | Restos: segredo `anthropic` no Vault, enum `google`, `ia_config`, `canais_conectados`, buckets `pacientes`/`comprovantes` sem uso, modo demo chamando Anthropic. | Baixo |
| L7 | `deploy/netlify/index.html` desatualizado em relação a `front/index.html`. | Baixo |
| L8 | Ligação Netlify ↔ GitHub (`producao`) e se `GROQ_API_KEY`/`ELEVENLABS_API_KEY` estão definidas nos segredos da função não foram verificadas. | Baixo |
| L9 | `net._http_response` guarda respostas de diagnóstico (podem conter texto de IA); conferir limpeza. | Baixo |
| L10 | Links de anamnese/documentos não são entregues automaticamente ao paciente (sem WhatsApp/e-mail/SMS). | Médio |
