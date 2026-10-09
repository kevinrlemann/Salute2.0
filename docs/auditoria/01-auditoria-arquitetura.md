# Auditoria 01 — Arquitetura do front-end "Salute IA"

Data: 2026-10-09 · Modo: somente leitura (nenhum arquivo do sistema foi alterado, nenhuma chamada ao Supabase ou a serviços externos, o app não foi executado).

Material analisado: o pacote publicado como artifact no claude.ai (`index.html` + `config.js`), já decodificado em `scratchpad/bundle/` (template.html + 24 arquivos .js + 4 fontes .woff2).

Legenda: **[confirmado]** = visto no código · **[inferido]** = conclusão provável a partir do código, mas não comprovada (precisa ser checada no banco/servidor/hospedagem).

---

## Resumo em linguagem simples

- O Salute IA é um **site de uma página só** (SPA) feito em **React 18.3.1**, escrito em JavaScript/JSX e **já convertido para JavaScript comum** (com Babel) antes de ser publicado. Não existe projeto-fonte (repositório) — o que existe é o pacote final, publicado como artifact do claude.ai. [confirmado + contexto]
- **Não há "back-end próprio"**: o navegador fala direto com o **Supabase** (banco, login, arquivos e tempo real) do projeto "Salute IA novo visual" (`gbhsslyoybqjvjznlave`). A IA "Renata" passa por uma função do servidor chamada `renata`. [confirmado]
- **Nenhuma referência ao projeto antigo "Salute CRM"** (`pigfhkmtqyatuaudpgyy`) nem às suas funções (instagram-webhook, renata-ai, google-calendar-*, evolution-*, send-chat-message, crm-webhook, anamnese-*, document-signing). Também não há n8n, OpenAI, Evolution API, Google Calendar, Stripe/Asaas/Pix, nem serviço de e-mail próprio. [confirmado por busca]
- O sistema tem **dois modos**: "conectado" (com Supabase configurado: exige login e mostra dados reais) e "demonstração" (sem configuração: abre sem login, com a clínica fictícia "Bella Forma" / "Dra. Camila Rocha"). [confirmado]
- Pontos que mais preocupam: (1) envio real de WhatsApp **não existe no front** e a função de servidor esperada (`whatsapp`) não existe no projeto novo; (2) o upload de documentos por link público grava direto no "armazém" `prontuario`; (3) as permissões por módulo são aplicadas na tela — a proteção real depende das regras (RLS) do banco; (4) a Renata envia ao servidor o "prompt" e o modelo escolhidos pelo navegador; (5) não há código-fonte versionado.

---

## 1) Mapa da arquitetura

```
                         NAVEGADOR DO USUÁRIO (clínica)
 ┌───────────────────────────────────────────────────────────────────────────┐
 │ index.html (template.html)                                                │
 │  ├─ CSS (tokens de cor/tipografia) + fonte Aspekta (4 .woff2 locais)      │
 │  ├─ React 18.3.1 + ReactDOM 18.3.1 (versões "development")                │
 │  ├─ script inline: descobre a pasta de publicação → carrega config.js     │
 │  ├─ config.js  → window.SALUTE_CONFIG {SUPABASE_URL, SUPABASE_ANON_KEY,   │
 │  │                                      BASE_PATH}                        │
 │  ├─ supabase-js 2.117.2 (UMD) · qrcode-generator                          │
 │  ├─ Design System "SaluteProjetoDesigner" (30 componentes + kit demo)     │
 │  └─ 16 scripts do app (tudo pendurado em `window`, ordem importa)         │
 │                                                                           │
 │  RaizSalute ──┬─ ?a=TOKEN / /a/TOKEN → Página pública de Anamnese         │
 │   (raiz)      ├─ ?u=TOKEN / /u/TOKEN → Página pública de envio de docs    │
 │               └─ PortaSupabase (portão de login)                          │
 │                    ├─ login/cadastro/senha → TelaAcesso                   │
 │                    ├─ equipe Salute → PainelMaster                        │
 │                    └─ pronto → App (AppShell + telas)                     │
 │                          Painel · Pacientes · Agenda · Mensagens/CRM ·    │
 │                          Gestão (Estoque/Financeiro) · Configurações      │
 │                          + Renata (assistente IA, texto e voz)            │
 │                                                                           │
 │  Camada de dados: SB (cliente Supabase) → DB.* (sel/ins/upd/del/rpc)      │
 │                   ARQ.* (arquivos) · tempoReal() (canais realtime)        │
 │                   *Svc (PacSvc, AgSvc, FinSvc, EstSvc, MsgSvc, CrmSvc...) │
 └────────────┬───────────────────────────────┬──────────────────────────────┘
              │ HTTPS (chave pública anon      │ HTTPS (token do usuário)
              │ + token de sessão do usuário)  │
              ▼                                ▼
 ┌──────────────────────────────────┐   ┌──────────────────────────────────┐
 │ SUPABASE "Salute IA novo visual" │   │ Edge Function "renata"           │
 │ gbhsslyoybqjvjznlave             │   │ (/functions/v1/renata)           │
 │  • Auth (login, cadastro, senha, │   │  ações: status, testar, chat,    │
 │    convite por link mágico)      │   │  voz, remarcar                   │
 │  • PostgREST: 76 tabelas + 26 RPC│   │        │                         │
 │  • Storage: clinica, prontuario, │   │        ▼                         │
 │    mensagens, fiscal, conteudos  │   │  Anthropic (Claude) e ElevenLabs │
 │  • Realtime: postgres_changes    │   │  [inferido: chaves no servidor]  │
 └──────────────────────────────────┘   └──────────────────────────────────┘

 Somente no MODO DEMONSTRAÇÃO (sem Supabase): o navegador chama direto
 api.anthropic.com e api.elevenlabs.io com uma chave digitada pelo usuário
 e guardada no localStorage.

 WhatsApp: o front só grava "mensagem pendente" no banco e cadastra a
 instância; QUEM ENVIA de fato não está no front (nem no projeto novo).
```

**Explicação curta.** Tudo roda no navegador. Ao abrir, a página lê o `config.js` para saber qual Supabase usar. Se a configuração estiver certa, o usuário faz login pelo Supabase Auth e o sistema chama a função de banco `meu_contexto` para descobrir quem ele é, de quais clínicas participa e quais módulos pode ver. A partir daí cada tela lê e grava direto nas tabelas do Supabase, sempre filtrando pela clínica ativa (`clinica_id`). Atualizações ao vivo (agenda, mensagens, CRM, notificações) chegam pelo Realtime do Supabase. A Renata conversa com o Claude e gera voz através da função `renata` do servidor. [confirmado]

---

## 2) Árvore resumida do projeto

Ordem real de carregamento (template.html). Tamanhos aproximados.

| # | Arquivo | Tamanho | O que contém | Status |
|---|---|---|---|---|
| – | `template.html` | 11 KB | Página base: `<title>Salute IA</title>`, `noindex`, variáveis de CSS (cores, tipografia, espaçamentos), fonte Aspekta, `<div id="root">` e a lista de scripts. Script inline que detecta a pasta de publicação e aponta `config.js` (rotas reservadas: painel, pacientes, agenda, mensagens, crm, gestao, estoque, financeiro, configuracoes, perfil, login, cadastro, master, a, u). | confirmado |
| – | 4 × `.woff2` | ~21 KB cada | Fonte Aspekta (400/500/600/700), servida localmente. | confirmado |
| 1 | `709b623d…js` | 107 KB | React **18.3.1** — versão *development*. Com `integrity` (SRI). | confirmado |
| 2 | `7dd7e122…js` | 1,0 MB | ReactDOM **18.3.1** — versão *development*. Com SRI. | confirmado |
| 3 | (inline) | <1 KB | Calcula `window.SALUTE_DIR` e corrige o caminho do config.js. | confirmado |
| 4 | `config.js` | <1 KB | `window.SALUTE_CONFIG = { SUPABASE_URL, SUPABASE_ANON_KEY, BASE_PATH }` (BASE_PATH = ""). | confirmado |
| 5 | `…c002.js` | 213 KB | supabase-js **2.117.2** (UMD, inclui auth-js, postgrest, storage-js, realtime-js 2.117.2). | confirmado |
| 6 | `…c004.js` | 55 KB | qrcode-generator (Kazuhiko Arase, MIT). | confirmado |
| 7 | `7bf00496…js` | 169 KB | Pacote do Design System "SaluteProjetoDesigner_8b4683" (formato Claude Design `@ds-bundle`): BarChart, GaugeChart, SalesFunnel, Avatar, Badge, Button, Icon, IconButton, TrendPill, KanbanCard, MessageBubble, Progress, Table, Checkbox, Input, SegmentedControl, Select, Switch, MobileBottomNav, PageHeader, Sidebar, Tabs, TopBar, CardIcon, Card, Dialog, EmptyState, StatCard, Toast, Tooltip. Inclui também um **kit de referência** (`ui_kits/admin/App.jsx`, telas demo) que tenta montar um App próprio no `#root`. | confirmado |
| 8 | `d41989a4…js` | 32 KB | "kit-shared": mini-gerenciador de estado (`makeStore/useStore`), `lsGet/lsSet` (localStorage), menu `KIT_NAV`, equipe demo (`TEAM_STORE`), controle de acesso de tela (`useAccess`), sons de notificação, idiomas (`LANGS`, `setLang`). | confirmado |
| 9 | `…c001.js` | 149 KB | **Núcleo**: criação do cliente Supabase (`SB`), sessão (`SESSAO`), rotas por endereço (`ROTA_TELA`, `SincronizaUrl`), camada de dados `DB`, arquivos `ARQ`, tempo real `tempoReal`, cargas por módulo `CARGAS`, telas de login/cadastro/senha (`TelaAcesso`), `PainelMaster` (equipe Salute), troca de clínica, modo suporte, validação de CPF/CNPJ, `PortaSupabase`. | confirmado |
| 10 | `7af61c93…js` | 16 KB | `AppShell` (barra lateral + barra superior no desktop; barra compacta + navegação inferior no celular). | confirmado |
| 11 | `25352dc7…js` | 56 KB | `PainelScreen` (dashboard: funil, leads por canal, agenda recente, "primeiros passos"). | confirmado |
| 12 | `d47643ae…js` | 665 KB | Arquivo **minificado** (11 linhas). Telas de **Pacientes** (ficha, prontuário, antes/depois, mapa facial), **Agenda**, **Gestão** (Estoque, Financeiro, Nota Fiscal, relatórios), **Configurações** (clínica, equipe/acessos, canais WhatsApp/Instagram, parcerias, Saluteflix, SaluteCast, SalutePay, certificações, som). Contém dados de demonstração e ~207 KB de imagens embutidas (base64). | confirmado |
| 13 | `…c003.js` | 69 KB | Serviços de **Pacientes / Prontuário / Agenda** (`PacSvc`, `ProntSvc`, `AgSvc`), links públicos (`linkAnamnese`, `linkDocs`), limpeza dos dados demo no modo conectado. | confirmado |
| 14 | `…c006.js` | 41 KB | Serviços de **Financeiro** e **Estoque** (`FinSvc`, `EstSvc`). | confirmado |
| 15 | `…c007.js` | 48 KB | Serviços de **Clínica, Equipe, Profissionais, WhatsApp, Conteúdos** (`ClinSvc`, `EquipeSvc`, `ProfSvc`, `WaSvc`, `ContSvc`), `ehAdmin`. | confirmado |
| 16 | `…c00b.js` | 152 KB | **Anamnese** (modelos, editor, envio, preenchimento), páginas públicas `PaginaAnamnese` e `PaginaEnvioDocs`, impressão (`imprimirHtml`) e o componente-raiz **`RaizSalute`**. | confirmado |
| 17 | `366b46a2…js` | 127 KB | `MensagensScreen`: caixa de entrada estilo WhatsApp, chat da equipe e **CRM** (quadro kanban de leads). | confirmado |
| 18 | `…c005.js` | 56 KB | Serviços de **Mensagens, CRM e Notificações** (`MsgSvc`, `CrmSvc`, sino de notificações). | confirmado |
| 19 | `30c3fd71…js` | 37 KB | `PerfilScreen`: planos, segurança (senha), idioma, notificações. | confirmado |
| 20 | `…c008.js` | 17 KB | `ContaSvc`: dados da conta, plano/assinatura, troca de senha. | confirmado |
| 21 | `…c009.js` | 18 KB | Dados do Painel (`painel_mes`, troca de mês). | confirmado |
| 22 | `1b7a2c45…js` | 324 KB | **Renata** (assistente IA: chat, voz, ações na agenda/pacientes/estoque/financeiro, "ficha global"), definição de **`ROUTES`** e do **`App`** principal, e a linha que monta o React: `ReactDOM.createRoot(document.getElementById('root')).render(RaizSalute)` (fim do arquivo). | confirmado |
| 23 | `…c00a.js` | 44 KB | Renata no **modo conectado**: chamada à função `renata`, registro de conversas/ações, salvamento de chaves via `salvar_segredo`. | confirmado |

Total do pacote: ~3,6 MB (dos quais ~1,5 MB são bibliotecas de terceiros). [confirmado]

---

## 3) Tabela componente → responsabilidade → arquivos

| Componente / módulo | Responsabilidade | Arquivos | Status |
|---|---|---|---|
| Ponto de entrada (montagem do React) | `ReactDOM.createRoot(#root).render(RaizSalute)` | `1b7a2c45…js` (última linha) | confirmado |
| `RaizSalute` | Decide entre página pública (anamnese/docs) e sistema logado | `…c00b.js` (~linha 2410–2445, `rotaPublica`) | confirmado |
| `PortaSupabase` | Portão: mostra login, painel master, erro, bloqueio ou o app | `…c001.js` (~linha 4249) | confirmado |
| `App` + `ROUTES` | Telas: painel, pacientes, agenda, mensagens, gestao, perfil; bloqueia telas sem permissão | `1b7a2c45…js` (~linhas 9050–9230) | confirmado |
| Rotas por endereço | `/painel`, `/pacientes`, `/agenda`, `/mensagens`, `/crm`, `/gestao`, `/estoque`, `/financeiro`, `/configuracoes`, `/perfil`, `/login`, `/cadastro`, `/master`, `/a/<token>`, `/u/<token>`; usa `history.pushState`; sem BASE_PATH volta ao `localStorage` (`salute-kit:route`) | `…c001.js` (~linhas 92–232), template inline | confirmado |
| `AppShell` | Layout (menu lateral/inferior, topo) | `7af61c93…js` | confirmado |
| Cliente Supabase `SB` | Criado com `persistSession`, `autoRefreshToken`, `detectSessionInUrl`; recusa chave service role | `…c001.js` (~linhas 30–64) | confirmado |
| Camada de dados `DB` | `sel/ins/upd/updWhere/del/rpc/tudo`; sempre adiciona `clinica_id` da clínica ativa; exclusão é "lógica" (`excluido_em`); paginação de 1000 em 1000 | `…c001.js` (~linhas 284–410) | confirmado |
| Arquivos `ARQ` | Upload e links assinados (1 h) no Supabase Storage | `…c001.js` (~linhas 422–520) | confirmado |
| Tempo real `tempoReal` | Canais `postgres_changes` filtrados por `clinica_id` | `…c001.js` (~linha 559) | confirmado |
| Sessão / contexto | `meu_contexto`, `concluir_cadastro`, `aceitar_termos`, clínica ativa, modo suporte | `…c001.js` (~linhas 1085–1440) | confirmado |
| Login / cadastro / senha / convite | `TelaAcesso`, `NovaClinicaDialog`, convites | `…c001.js`, `…c007.js`, `…c008.js` | confirmado |
| Painel Master (equipe Salute) | Lista clínicas, membros, acessos, entrar como suporte | `…c001.js` | confirmado |
| Painel | Dashboard | `25352dc7…js`, `…c009.js` | confirmado |
| Pacientes / Prontuário / Agenda | Telas + serviços | `d47643ae…js`, `…c003.js` | confirmado |
| Anamnese + páginas públicas | Modelos, envio por link, preenchimento pelo paciente, upload de docs | `…c00b.js` | confirmado |
| Mensagens (WhatsApp) + CRM + chat da equipe | Telas + serviços + notificações | `366b46a2…js`, `…c005.js` | confirmado |
| Gestão: Estoque e Financeiro | Telas + serviços | `d47643ae…js`, `…c006.js` | confirmado |
| Configurações / Equipe / WhatsApp / Conteúdos | Telas + serviços | `d47643ae…js`, `…c007.js`, `30c3fd71…js`, `…c008.js` | confirmado |
| Renata (IA) | Chat, voz (ElevenLabs), ações, registro | `1b7a2c45…js`, `…c00a.js` | confirmado |
| Design System | Componentes visuais reutilizáveis | `7bf00496…js` | confirmado |
| Estado compartilhado | `makeStore/useStore` (sem Redux/Context) | `d41989a4…js` | confirmado |

### Acesso a dados — o que o front chama no Supabase [confirmado]

**Tabelas acessadas diretamente (76):** agendamentos, anamnese_blocos, anamnese_envios, anamnese_modelos, anamnese_perguntas, anexos_mensagem, assinaturas_clinica, bloqueios_horario, canais_equipe, cast_episodios, categorias_financeiras, categorias_produto, clinicas, comparacoes_antes_depois, configuracao_nota_fiscal, configuracoes_clinica, contas_bancarias, contas_pagar, contas_receber, convenios, conversas, cupons_parceiros, documentos_paciente, etapas_funil, figurinhas, flix_categorias, flix_conteudos, flix_progresso, formas_pagamento, fornecedores, funis, historico_paciente, horarios_funcionamento, instancias_whatsapp, leads, links_envio_documentos, lotes, mapeamento_marcacoes, mapeamento_modelos, mapeamentos, mensagens, mensagens_equipe, metas_profissional, motivos_perda, movimentacoes_estoque, notificacoes, origens_lead, pacientes, parceiros, parcelas, participantes_canal, pastas_documentos, perfis_usuario, permissoes, planos, preferencias_usuario, procedimento_insumos, procedimento_kit_padrao, procedimentos, procedimentos_realizados, produtos, profissionais, profissionais_procedimentos, prontuario, reacoes_mensagem, renata_acoes, renata_configuracoes, renata_consumo, renata_conversas, renata_mensagens, renata_voz, selos_certificacoes, status_agendamento, tipos_agendamento, unidades_medida, usuarios_clinicas.

**Tabelas lidas só por "junção" dentro de um select:** anamnese_respostas, pacientes_telefones.

**Tabelas que o front NÃO toca diretamente (bom sinal):** segredos_integracao (só via RPC `salvar_segredo`), auditoria, acessos_suporte (só via RPCs admin_*). [confirmado por busca]

**Funções de banco (RPC, 26):** aceitar_termos, admin_clinicas, admin_definir_acesso, admin_entrar_clinica, admin_membros, admin_registrar_envio, admin_sair_clinica, anamnese_publica, avisar_receitas_vencidas, concluir_cadastro, convidar_membro, criar_clinica, link_documentos_publico, marcar_conversa_lida, marcar_primeiro_passo, meu_contexto, painel_mes, pedir_consultor, primeiros_passos, regerar_link_anamnese, registrar_documento_link, registrar_leitura, responder_anamnese, salvar_rascunho_anamnese, salvar_segredo (provedores: `anthropic`, `whatsapp_meta`, `certificado_fiscal`, e variável `prov`), trocar_plano.

**Edge Functions:** `renata` (via `fetch` em `…c00a.js` ~linha 62; ações `status`, `testar`, `chat`, `voz`, `remarcar`). `whatsapp` aparece **apenas como URL de webhook** montada em `…c007.js` linha 586 (`SB_CFG.url + '/functions/v1/whatsapp?clinica=' + CLI()`), não é chamada pelo front. Não há uso de `supabase.functions.invoke`.

**Storage (buckets):** `clinica` (logo/fotos), `prontuario` (documentos/fotos do paciente — inclusive upload pelo link público), `mensagens` (anexos de chat), `fiscal` (certificado/arquivos fiscais), `conteudos` (Saluteflix/SaluteCast).

**Realtime (canais):** `agenda` → agendamentos; `crm` → leads; `mensagens` → mensagens, conversas, mensagens_equipe, reacoes_mensagem, canais_equipe; `notificacoes` → notificacoes; `anamnese-ficha` → anamnese_envios; `docs-ficha` → documentos_paciente. Todos filtrados por `clinica_id`.

### Autenticação [confirmado]
- `signInWithPassword` (login e reconfirmação de senha), `signUp` (cadastro de clínica, 2 lugares), `resetPasswordForEmail` (3 lugares), `updateUser` (nova senha), `signInWithOtp` com `shouldCreateUser: true` (convite de membro, usando um **segundo cliente** sem sessão, `storageKey: 'salute02-convite'`), `signOut`, `getSession`, `onAuthStateChange` (trata `PASSWORD_RECOVERY`, `SIGNED_OUT`, `SIGNED_IN`).
- Papéis: `meu_contexto` devolve `perfil`, `clinicas`, `admin`, `suporte`, `bloqueado`; `clinica.modulos` define os módulos liberados. `ehAdmin()` usa `perfil.admin_plataforma`. Telas usam `useAccess().can(id)` e a Renata usa `rnPode(id)` — **ambos são checagens só de tela**.
- Permissões por módulo são gravadas com `upsert` direto na tabela `permissoes` (`…c007.js` linha 339).

### Configuração / variáveis (somente nomes) [confirmado]
`SUPABASE_URL`, `SUPABASE_ANON_KEY` (chave pública, esperada no front), `BASE_PATH`, `LINK_PUBLICO` (opcional; base dos links de anamnese/docs), aliases aceitos `supabaseUrl`/`supabaseAnonKey`. Global derivada: `window.SALUTE_DIR`. Comentário no código diz que `config.js` é "gerado a partir das variáveis de ambiente" — não há script de geração no pacote. [inferido: gerado manualmente ou por outro processo]

### localStorage / sessionStorage [confirmado]
- `salute02:clinica` (clínica ativa), `salute-kit:route` (última tela), `salute-kit:gestao` (aba da gestão), `salute-kit:sound` (som), `salute-kit:lang` (idioma), `salute-kit:renata-ia` e `salute-kit:renata-voz` (**chaves de API da Anthropic e da ElevenLabs — só no modo demonstração**), sessionStorage `salute02:aviso`.
- Sessão do Supabase (token de acesso) fica no localStorage padrão do supabase-js (`persistSession: true`). [inferido pelo comportamento padrão da biblioteca]

### Integrações externas encontradas [confirmado]
- `https://gbhsslyoybqjvjznlave.supabase.co` (config).
- `https://api.anthropic.com/v1/messages` e `https://api.elevenlabs.io/v1/text-to-speech|speech-to-text` — **só no modo demonstração** (`!SB_ON`), com cabeçalho `anthropic-dangerous-direct-browser-access`.
- Modelos citados: `claude-sonnet-5-5`, `claude-sonnet-4-5` (chat) e `claude-haiku-4-5-20251001`, `claude-sonnet-5-5` (voz) — `1b7a2c45…js` linhas 2636–2637. Voz ElevenLabs padrão `eleven_flash_v2_5`.
- `window.claude.use('sample' | 'permissions')` — usa a IA do próprio claude.ai quando o app roda dentro do artifact.
- YouTube (embed/thumbnail para Saluteflix), Google Maps (link de endereço).
- `https://api.salute.app/webhooks/whatsapp/bellaforma` — texto fixo exibido **só no modo demo**.
- "Instagram", "Facebook", "API oficial (Meta)" aparecem como rótulos/opções de tela, sem chamada real.
- **Não encontrados:** projeto antigo `pigfhkmtqyatuaudpgyy`, n8n, OpenAI, Evolution API, Z-API, Twilio, Google Calendar, Stripe/Asaas/Mercado Pago, Resend/SendGrid, analytics.

### Dados de demonstração vs. reais [confirmado]
- Sem `config.js` válido → `SB_ON = false` → `PortaSupabase` libera o app **sem login** com dados fictícios (clínica "Bella Forma", "Dra. Camila Rocha", pacientes, produtos, despesas, receitas geradas, equipe demo).
- Com Supabase → `…c003.js` (~linha 60) zera listas demo; telas carregam do banco. Alguns elementos continuam fictícios mesmo no modo conectado, por exemplo o **QR code de conexão do WhatsApp** é um `FakeQR` (`d47643ae…js`, semente `'wa'+Date.now()`). [confirmado]

### Build e publicação
- O pacote foi gerado pelo **Claude Design / artifact do claude.ai**: arquivos com nomes UUID, cabeçalho `@ds-bundle` do Design System, JSX já compilado por **Babel** (helpers `_regenerator`, `_asyncToGenerator`), sem Babel no navegador e sem bundler (Webpack/Vite). Os módulos se comunicam por variáveis globais (`Object.assign(window, {...})`). [confirmado]
- React e ReactDOM em versão **development** (mais lenta, com avisos de desenvolvedor). [confirmado]
- Publicação: artifact `f214d8dd-…` no claude.ai (index.html + config.js). Netlify "saluteia" existe sem repositório ligado; não foi possível confirmar se serve este mesmo pacote. [contexto + inferido]

---

## 4) Dependências críticas

| Dependência | Versão | Onde | Observação | Status |
|---|---|---|---|---|
| React | 18.3.1 (development) | `709b623d…js` | Build de desenvolvimento em produção | confirmado |
| ReactDOM | 18.3.1 (development) | `7dd7e122…js` | 1 MB; build de desenvolvimento | confirmado |
| @supabase/supabase-js | 2.117.2 (realtime-js 2.117.2, storage-js 2.117.2) | `…c002.js` | Toda a camada de dados/autenticação | confirmado |
| qrcode-generator (K. Arase) | versão não identificada | `…c004.js` | QR dos links de anamnese/docs | confirmado |
| Design System SaluteProjetoDesigner_8b4683 | formato 4 | `7bf00496…js` | Gerado pelo Claude Design | confirmado |
| Helpers Babel / regenerator-runtime | embutidos | todos os scripts do app | Compilação prévia | confirmado |
| Fonte Aspekta (SIL OFL 1.1) | — | 4 .woff2 | Local, sem Google Fonts | confirmado |
| Supabase projeto `gbhsslyoybqjvjznlave` | — | config.js | Banco, Auth, Storage, Realtime | confirmado |
| Edge Function `renata` | — | servidor | Toda a IA no modo conectado | confirmado (chamada) |
| Anthropic API / ElevenLabs | — | via `renata` (ou direto no demo) | Custos de IA/voz | confirmado (chamada) / inferido (servidor) |
| `window.claude` (runtime do claude.ai) | — | `1b7a2c45…js` | Só funciona dentro do claude.ai | confirmado |

---

## 5) Pontos de risco

| # | Nível | Risco | Evidência | Status |
|---|---|---|---|---|
| R1 | **Crítico** | **Não existe código-fonte versionado.** O sistema só existe como pacote publicado (repositórios `sicred`/`sicred02` vazios). Um arquivo de 665 KB está minificado (`d47643ae…js`). Sem histórico, sem revisão, sem como reconstruir com segurança. | Contexto + `d47643ae…js` com 11 linhas | confirmado |
| R2 | **Alto** | **Envio de WhatsApp não acontece no front e o servidor esperado não existe.** Enviar mensagem só grava em `mensagens` com `status_entrega: 'pendente'`; "Conectar WhatsApp" só grava `status: 'conectado'` em `instancias_whatsapp`; o webhook aponta para `/functions/v1/whatsapp`, que não existe no projeto novo (só `renata`). O QR de conexão é falso (`FakeQR`). | `…c005.js` ~linhas 583–590; `…c007.js` linhas 583–640; `d47643ae…js` (`FakeQR,{seed:'wa'+Date.now()…}`) | confirmado (front) / inferido (ausência de worker) |
| R3 | **Alto** | **Upload anônimo no armazém `prontuario`** pela página pública `/u/<token>`: o navegador sem login envia arquivos para `prontuario/<pasta_upload>/…`. Se a regra do Storage não amarrar ao token, qualquer pessoa pode gravar arquivos ali (dados de saúde/LGPD). | `…c00b.js` ~linhas 2144–2195 (`link_documentos_publico`, `SB.storage.from('prontuario').upload`, `registrar_documento_link`) | confirmado (código) / inferido (política) |
| R4 | **Alto** | **Permissões aplicadas só na tela.** `useAccess().can()` e `rnPode()` escondem módulos, mas quem protege de verdade são as regras RLS. Além disso a tela grava `permissoes` com `upsert` direto. Se a RLS permitir que um membro comum grave nessa tabela, ele pode se dar mais acesso. | `d41989a4…js` ~linha 585; `1b7a2c45…js` linha 5658; `…c007.js` linha 339 | confirmado (código) / inferido (RLS) |
| R5 | **Alto** | **A Renata manda ao servidor o modelo, o "system prompt" e as ferramentas escolhidos no navegador** (`acao:'chat', payload:{model, system, tools, messages}`). Se a função `renata` não restringir isso, qualquer usuário logado pode usá-la como "Claude grátis" com a chave da Salute (custo) ou mudar as instruções da Renata. | `1b7a2c45…js` ~linhas 2699–2711; `…c00a.js` ~linha 62 | confirmado (front) / inferido (servidor) |
| R6 | **Médio** | **Ponte de voz por `postMessage('*')` sem checar a origem.** Ao abrir a janela de voz (`#renata-voz`), o app conversa com a janela que o abriu e envia as últimas 12 mensagens da Renata; esse caminho é tentado **antes** do servidor. Um site malicioso que abra o Salute com `#renata-voz` poderia receber o histórico e responder no lugar da IA. | `1b7a2c45…js` linhas 1820–1827, 2397–2401, 2445–2460, 2479, 3148, ~3250–3262 | confirmado (código) / inferido (exploração) |
| R7 | **Médio** | **Filtro por clínica feito no navegador.** `DB.sel/upd` sempre adicionam `clinica_id`, mas isso não é segurança; a separação entre clínicas depende da RLS. | `…c001.js` linhas 284–405 | confirmado / inferido (RLS) |
| R8 | **Médio** | **Modo demonstração sem login** se o `config.js` falhar ou vier vazio — o sistema abre com dados fictícios e, na Renata, pede chave da Anthropic/ElevenLabs que fica gravada em texto no `localStorage` e é usada direto do navegador. | `…c001.js` linhas 30–64 e `PortaSupabase` (~4249: `if (!SB_ON …) return children`); `1b7a2c45…js` linhas 1834–1848, 2639–2645, 3455–3460 | confirmado |
| R9 | **Médio** | **React em versão de desenvolvimento** em produção (mais pesado e lento; ~1,1 MB só de React/ReactDOM). | `709b623d…js`, `7dd7e122…js` cabeçalhos `*.development.js` | confirmado |
| R10 | **Médio** | **Arquitetura por variáveis globais e ordem de scripts.** Tudo é pendurado em `window`; o Design System define nomes iguais aos do app (`MensagensScreen`, `PainelScreen`, `PerfilScreen`, `PATIENTS`…) que são sobrescritos depois. Trocar a ordem quebra o sistema silenciosamente. | `7bf00496…js` (`ui_kits/admin/*`), `Object.assign(window,…)` em todos os scripts | confirmado |
| R11 | **Médio** | **Kit de referência do Design System tenta montar outro App no `#root`.** Hoje falha em silêncio porque roda no `<head>` antes do `#root` existir (erro guardado em `__ds_ns.__errors`). Se o script for movido, um app de demonstração pode aparecer/competir com o real. | `7bf00496…js` linha 3313 (`ReactDOM.createRoot(...).render(App)`), template.html (script no head) | confirmado (código) / inferido (comportamento) |
| R12 | **Médio** | **Rotas por endereço na raiz** (`BASE_PATH: ""` liga o modo de URLs `/painel`, `/crm`, `/a/<token>`). A hospedagem precisa redirecionar qualquer caminho para `index.html`; senão links diretos e links de anamnese/docs por caminho dão 404. | `…c001.js` linhas 92–232; `…c00b.js` linha 2430 | confirmado (código) / inferido (hospedagem) |
| R13 | **Médio** | **Dados fictícios ainda visíveis no modo conectado** em pontos isolados (ex.: QR do WhatsApp; rótulos "Instagram (Beta)", SalutePay). Pode confundir o cliente. | `d47643ae…js` | confirmado (QR) / inferido (outros) |
| R14 | **Baixo** | **Impressão monta HTML com o título sem "escapar"** (`<title>' + titulo + '</title>`). Se o título vier de texto digitado por paciente, pode injetar HTML no iframe de impressão. | `…c00b.js` linha 871 | confirmado (código) / inferido (origem do título) |
| R15 | **Baixo** | **Convite cria usuário pelo navegador** (`signInWithOtp` com `shouldCreateUser: true`) — depende de o cadastro aberto estar habilitado no Supabase Auth. | `…c001.js` ~3125–3140; `…c007.js` ~370–390 | confirmado |
| R16 | **Baixo** | **Token de sessão no localStorage** (padrão supabase-js) — se houver qualquer falha de XSS, o token pode ser lido. O markdown da Renata escapa HTML (bom). | `…c001.js` linhas 51–57; `1b7a2c45…js` linha 1946 (`rnMd`) | confirmado / inferido |
| R17 | **Baixo** | **Imagens de ~207 KB em base64 dentro do JS** e arquivo total de ~3,6 MB, sem divisão por tela — carregamento inicial pesado em celular. | `d47643ae…js` | confirmado |
| OK | — | Proteção contra colar a chave **service role** no front (recusa `sb_secret_` e JWT com `role: service_role`). | `…c001.js` linhas 37–47 | confirmado |
| OK | — | Nenhuma referência ao projeto antigo "Salute CRM" nem às suas 24 funções. | busca em todos os scripts | confirmado |

---

## 6) Dúvidas / áreas que precisam ser investigadas

1. **Quem envia o WhatsApp?** Existe algum serviço (n8n, Evolution, worker, função no projeto antigo) que lê `mensagens` com `status_entrega = 'pendente'` e recebe o webhook `/functions/v1/whatsapp`? No projeto novo só existe `renata`.
2. **Função `renata`:** ela ignora/limita `model`, `system` e `tools` vindos do navegador? Confere se o usuário pertence à `clinica_id` enviada? Tem limite de consumo (`renata_consumo`)?
3. **RLS das tabelas sensíveis:** `permissoes`, `usuarios_clinicas`, `perfis_usuario`, `clinicas`, `assinaturas_clinica`, `planos`, `instancias_whatsapp`, `renata_*`, `pacientes`, `prontuario` — quem pode inserir/alterar?
4. **Políticas do Storage** dos buckets `clinica`, `prontuario`, `mensagens`, `fiscal`, `conteudos` — os buckets existem? São privados? O upload anônimo em `prontuario` está amarrado ao token do link?
5. **As 26 RPCs existem no banco** e são `SECURITY DEFINER` com checagem de papel (principalmente `admin_*`, `salvar_segredo`, `convidar_membro`, `criar_clinica`, `trocar_plano`, `anamnese_publica`, `responder_anamnese`, `link_documentos_publico`)?
6. **Tabelas citadas pelo front que podem não existir** no projeto novo (comparar a lista de 76 + `anamnese_respostas`, `pacientes_telefones` com as ~115 do banco).
7. **Hospedagem:** o site `saluteia.site` (Netlify) serve este mesmo pacote? Tem regra de redirecionamento SPA? O artifact do claude.ai suporta rotas `/painel` etc.?
8. **Origem do `config.js`:** o comentário fala em "variáveis de ambiente", mas não há processo de build. Quem gera e onde fica a versão "oficial"?
9. **Onde está o projeto do Claude Design** (fonte do Design System e das telas) e se ele pode ser exportado para um repositório.
10. **Modelos de IA** citados (`claude-sonnet-5-5`, `claude-sonnet-4-5`, `claude-haiku-4-5-20251001`) — confirmar se são os que a função `renata` realmente usa e se estão disponíveis na conta.
11. **Supabase Auth:** cadastro aberto ligado? URLs de redirecionamento (`/login`) cadastradas? Modelos de e-mail (confirmação, recuperação, convite) configurados?
12. **Erros silenciosos do Design System** (`window.SaluteProjetoDesigner_8b4683.__errors`) — verificar no navegador quais componentes falham ao carregar.
