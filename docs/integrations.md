# Integrações do Salute IA

Guia de referência do estado **real** das integrações em 2026-10-09 (código no commit `46363ee`; projeto Supabase
"Salute IA novo visual", `gbhsslyoybqjvjznlave`). Serve para entender, manter e testar cada ligação do sistema com
serviços de fora do navegador.

Legenda: **[confirmado]** visto no código ou no banco · **[inferido]** conclusão provável, não comprovada ·
**[não confirmado]** depende de painel ou serviço externo que não foi consultado.

Fonte das evidências: [`auditoria/04-integracoes.md`](auditoria/04-integracoes.md) (Auditoria 04, linha a linha, com
`arquivo:linha`). Este guia cita a seção da auditoria em vez de repetir todas as linhas. Os números de linha da
auditoria são do commit `af596dd`; o commit seguinte (`46363ee`, feriados e remoção do botão de voz do topo) mexeu em
`1b7a2c45…js` e pode ter deslocado algumas linhas desse arquivo. A função `renata` e as migrations citadas não mudaram.

Documentos irmãos: [`architecture.md`](architecture.md) (visão geral e publicação), [`frontend.md`](frontend.md)
(telas e serviços), [`database.md`](database.md) (tabelas, RLS, RPCs).

---

## 1. Mapa rápido

| Integração | Para que serve | Situação |
|---|---|---|
| Supabase Auth | Login, cadastro, senha, convite | Ativa [confirmado]; SMTP [não confirmado] |
| Supabase Banco (REST/RPC) | Todos os dados, com RLS | Ativa [confirmado] |
| Supabase Storage | Logos, documentos, anexos, certificado, conteúdos | Ativa, 5 buckets em uso [confirmado] |
| Supabase Realtime | Telas atualizando ao vivo | Ativa [confirmado] |
| Função `renata` → Groq | Texto da assistente Renata | Ativa [confirmado no código] |
| Função `renata` → ElevenLabs | Voz (fala) e transcrição (escuta) | Ativa [confirmado no código] |
| Link público de anamnese | Paciente preenche a ficha sem login (7 dias) | Ativa [confirmado] |
| Link/QR de envio de documentos | Paciente manda arquivos sem login (24 h) | Ativa [confirmado] |
| Netlify | Hospeda `saluteia.site` | Ativa [confirmado no repo]; ligação ao Git [não confirmado] |
| Artifact claude.ai | Cópia do sistema aberta dentro do claude.ai | Ativa [confirmado no código] |
| CDN `unpkg.com` (Lucide) | Ícones de todo o sistema | Ativa, sem verificação de integridade [confirmado] |
| WhatsApp | Envio/recebimento de mensagens | **Não implementado** (só grava no banco) [confirmado] |
| n8n | Automação | **Não existe** [confirmado] |
| E-mail transacional próprio | Avisos, lembretes | **Não existe** (só e-mails do Supabase Auth) [confirmado] |
| Rotinas agendadas | Lembretes, confirmações, limpeza | **Não existem** (`pg_cron` não instalado) [confirmado] |

```
NAVEGADOR (saluteia.site ou artifact claude.ai)
  │ index.html + config.js (URL Supabase + chave anon pública)
  │ ícones ← unpkg.com/lucide@0.468.0
  ├── Auth / REST+RPC / Storage / Realtime ──► SUPABASE (RLS, Vault)
  └── POST /functions/v1/renata ──► função renata ──► api.groq.com (texto)
                                                 └──► api.elevenlabs.io (voz)
PACIENTE (sem login): /a/<token> ou ?a=  → RPCs anônimas de anamnese
                      /u/<token> ou ?u=  → RPCs anônimas + upload no bucket prontuario
WhatsApp / n8n / e-mail próprio / rotinas: nada conectado
```

---

## 2. Regras gerais para testar com segurança

1. **Use uma clínica de teste**, nunca dados reais de pacientes. Dados da Renata (resumo da clínica) saem para o Groq
   e para a ElevenLabs, que são terceiros fora do Brasil. [confirmado: o `system` leva `rnSnapshot`; Auditoria 04 §4.4]
2. **Teste de tela sem banco:** abra o front com `config.js` vazio (modo demonstração). Ver `frontend.md` §9. Atenção:
   no modo demonstração a Renata chama Anthropic/ElevenLabs direto do navegador se alguém digitar uma chave; não digite
   chaves reais nesse modo. [confirmado]
3. **Não leia valores de segredos.** Para saber se uma chave existe, use a ação `status` da função `renata` (responde
   só `true/false`) ou conte linhas em `segredos_integracao`/Vault por nome. [confirmado]
4. **Não rode SQL que chame `net.http_*`** no banco de produção sem necessidade: o `pg_net` guarda as respostas em
   `net._http_response`. [confirmado]
5. Cada teste que chama Groq ou ElevenLabs **gasta cota** (da clínica ou da Salute) e conta no limite mensal da Renata
   quando a chave é a da Salute. [confirmado]

---

## 3. Integrações ativas

### 3.1 Supabase Auth (login e e-mails de conta)

**Para que serve:** entrar no sistema, criar conta e clínica, recuperar senha, trocar e-mail/senha, convidar membro
da equipe. [confirmado]

**Fluxo** [confirmado; Auditoria 04 §4.9]:

| Ação | Chamada no front | E-mail |
|---|---|---|
| Login | `signInWithPassword` | — |
| Cadastro de clínica | `signUp` com `emailRedirectTo` | Supabase Auth |
| Esqueci a senha | `resetPasswordForEmail` | Supabase Auth |
| Trocar e-mail/senha | `updateUser` | Supabase Auth |
| Convite de membro | 2º cliente sem sessão (`storageKey: 'salute02-convite'`) + `signInWithOtp` (link mágico) | Supabase Auth |

- O link de volta dos e-mails é `location.origin + BASE_PATH + '/login'`. [confirmado]
- No banco, os gatilhos `novo_usuario`/`usuario_atualizado` chamam `ligar_convites`, que liga o login aos convites
  pendentes (`usuarios_clinicas`, `perfis_usuario`). `auto_confirmar_email` foi neutralizado. [confirmado; ver `database.md` §6]

**Credenciais:** só a chave pública anon (`front/config.js`, `SUPABASE_ANON_KEY`), pública por design. [confirmado]

**Limites e erros:**
- Quem envia os e-mails (SMTP próprio ou o servidor padrão do Supabase, que permite poucos e-mails por hora) **não
  aparece no repositório**. [não confirmado]
- Os endereços `saluteia.site` e o do artifact precisam estar em "Redirect URLs" do Auth, senão o link do e-mail volta
  para o lugar errado. [não confirmado]
- "Dois fatores" na tela é só uma marcação; não há MFA. [confirmado na Auditoria 03]

**Como testar:** criar conta com um e-mail seu numa clínica de teste; pedir "esqueci a senha"; convidar um segundo
e-mail seu. Se o e-mail não chegar, olhar no painel do Supabase: Auth → Logs e Auth → SMTP. Não use e-mails de
terceiros (o envio é real).

### 3.2 Supabase Banco (REST e RPC)

**Para que serve:** todos os dados. O front fala direto com o PostgREST; não existe servidor próprio. [confirmado]

**Fluxo:** navegador → `SB.from(...)` / `SB.rpc(...)` com a sessão do usuário → RLS decide o que pode. Os serviços do
front (`*Svc`, `DB.*`) sempre filtram pela clínica ativa, mas **quem protege de verdade é a RLS**. [confirmado; ver
`database.md` §4]

**Credenciais:** chave anon + sessão (JWT) do usuário. A chave `service_role` só existe dentro da função `renata`
(segredo automático). [confirmado]

**Como testar:** pelo próprio sistema logado numa clínica de teste. Para conferir permissão, entrar com um usuário de
papel mais baixo e tentar a ação. Consultas manuais ao banco: só leitura de catálogo/contagens.

> Feriados (agenda e painel) são calculados **dentro do banco** (`pascoa`, `feriados_nacionais`, `feriados_do_mes`,
> migration `20261009020913_feriados_nacionais.sql`), somados aos feriados cadastrados pela clínica. **Não há API
> externa de feriados.** [confirmado]

### 3.3 Supabase Storage (arquivos)

**Para que serve:** guardar arquivos da clínica. [confirmado; Auditoria 04 §4.10]

| Bucket | Uso | Caminho | Tamanho máx. |
|---|---|---|---|
| `clinica` | logo, fotos de perfil | `<clinica>/usuarios/<uid>/…` | 10 MB |
| `prontuario` | documentos do paciente; upload anônimo por link | `<clinica>/pacientes/<id>/documentos/…` e `<clinica>/links/<token>/…` | 50 MB |
| `mensagens` | anexos de chat | `<clinica>/conversas/<id>/…`, `<clinica>/equipe/<id>/…` | 100 MB |
| `fiscal` | certificado digital | `<clinica>/certificado/…` | 1 MB |
| `conteudos` | Saluteflix / SaluteCast | — | 20 MB |
| `pacientes`, `comprovantes` | **sem uso no front** | — | 10 / 20 MB |

**Fluxo:** upload pelo navegador com a sessão; leitura sempre por **link assinado de 1 hora**. Todos os buckets são
privados. Policies `salute_<bucket>_{enviar,ler,trocar}` para usuários logados; a única para anônimo é
`salute_prontuario_link_paciente` (ver 3.8). Não há policy de DELETE: arquivo não é apagado pelo front. [confirmado]

**Erros:** acima do limite do bucket ou fora da pasta da clínica → o Storage recusa e a tela mostra erro. [confirmado]

**Como testar:** subir um arquivo pequeno e fictício (PDF de teste) numa clínica de teste e abrir pelo link gerado.

### 3.4 Supabase Realtime (ao vivo)

**Para que serve:** atualizar telas sem recarregar. [confirmado; Auditoria 04 §4.11]

**Fluxo:** `tempoReal(nome, tabelas)` (`c001`) abre um canal websocket filtrado por `clinica_id=eq.<clínica>`.
Canais: `agenda` (`agendamentos`), `mensagens` (`mensagens`, `conversas`, `mensagens_equipe`, `reacoes_mensagem`,
`canais_equipe`), `crm` (`leads`), `notificacoes`, `anamnese-ficha` (`anamnese_envios`), `docs-ficha`
(`documentos_paciente`). Só leitura; respeita a RLS. [confirmado]

**Como testar:** abrir a mesma clínica de teste em duas abas, criar um agendamento numa e ver aparecer na outra.

### 3.5 Função `renata` → Groq (texto da assistente)

**Para que serve:** responder no chat da Renata, com ferramentas (ações que a pessoa confirma). [confirmado]

**Fluxo** [confirmado; Auditoria 04 §4.4; `architecture.md` §4.1]:
1. **Quem chama:** a Renata no navegador (`rnFn`, `c00a`), no site `saluteia.site`. Dentro do claude.ai o caminho é
   outro (ver 3.7).
2. **O que entra:** `POST <SUPABASE_URL>/functions/v1/renata`, com `Authorization: Bearer <sessão>` e `apikey: <anon>`.
   Corpo: `{clinica_id, acao, primeira, payload:{model:'claude-…', max_tokens, system, tools, messages, stream:true}}`.
   O `system` leva as regras da Renata e um **resumo da clínica com dados de pacientes**.
3. **Ações:** `status` (há chave? não chama ninguém de fora), `testar` (manda "Responda apenas: ok" ao Groq), `chat`,
   `voz`, `transcrever` (as duas últimas em 3.6).
4. **Verificações no servidor:** login válido (401); membro ativo e aceito da clínica ou suporte Salute com acesso
   vigente (403); nome de modelo na lista `claude-(haiku-4-5|sonnet-4-5|sonnet-5-5)` (400; o nome só serve para
   validar); até 100 mensagens, 40 ferramentas e 400 mil caracteres (413); limite mensal (429).
5. **Regras do Agente de IA:** RPC `agente_ia_regras(clinica, 'assistente')` entra **antes** das instruções do front.
   As regras são editadas em Configurações → "Agente de IA" (tabela `agente_ia`; dono/gestor editam).
6. **Chamada externa:** `https://api.groq.com/openai/v1/chat/completions` (`groq.ts`). Modelos em ordem:
   `openai/gpt-oss-120b` → `openai/gpt-oss-20b` → `qwen/qwen3.8-27b`. O pedido no formato do Claude é traduzido para o
   formato do Groq, e a resposta (streaming SSE) é traduzida de volta para eventos do Claude; por isso o front não mudou.
7. **O que sai:** stream de eventos no formato Claude.
8. **O que é salvo:** pelo servidor, `renata_consumo` via `renata_registrar_consumo` (mensagens e tokens). Pelo front,
   `renata_conversas`, `renata_mensagens`, `renata_acoes`. No `testar`, `renata_configuracoes.claude_status_teste` e
   `claude_testado_em`.

**Credenciais** [confirmado nomes]:
- Chave da clínica: Vault `salute:<clinica>:groq:<época>`, gravada pela tela "Conexões" com a RPC
  `salvar_segredo(p_provedor:'groq')` (só dono/gestor). Lida pela função com `ler_segredo` (só service_role).
- Chave padrão Salute: Vault com clínica nula, ou segredo da função **`GROQ_API_KEY`**. Se `GROQ_API_KEY` está definida
  no painel: [não confirmado].
- Limite mensal padrão: variável **`RENATA_LIMITE_PADRAO`** (padrão 300). Só vale quando a clínica usa a chave da Salute;
  com chave própria não há limite. [confirmado]

**Limites e erros tratados** [confirmado]:
- Sem chave → 412 `sem_chave`.
- Groq 429/413/404/5xx → tenta o próximo modelo; 413 → reenvia com o resumo pela metade; os três no limite por até
  20 s → espera e tenta uma vez; 401/403 do Groq → devolve direto (chave errada).
- Instruções cortadas em 7.000 caracteres, descrições de ferramentas em 200, resposta máx. 1.000 tokens.
- No navegador, se a função falhar, a Renata cai para `rnSemIA` (comandos locais, sem IA).
- Logs: `console.warn('[groq] …')` nos logs da função.
- CORS `*`: qualquer site pode chamar, mas só com um login válido e vínculo com a clínica. [confirmado]

**Como testar com segurança:**
1. Sem custo: `acao:'status'` só responde se há chave de IA e de voz, sem chamar serviço externo [confirmado]; a tela "Conexões" usa essa resposta para mostrar o estado [inferido].
2. Com custo mínimo: botão de teste da conexão (`acao:'testar'`, 8 tokens).
3. Lógica de tradução sem rede: `supabase/functions/renata/testes/groq.test.mts` (comando na 1ª linha do arquivo).
4. Conversa real só numa clínica de teste, sem dados reais de pacientes.

### 3.6 Função `renata` → ElevenLabs (voz e escuta)

**Para que serve:** a Renata falar (texto → fala) e ouvir (fala → texto). O comando de voz fica no atalho **Ctrl + M**
e dentro da Renata; o botão de microfone do topo foi removido no commit `46363ee`. [confirmado]

**Fluxo** [confirmado; Auditoria 04 §4.5]:

| | Fala (`acao:'voz'`) | Escuta (`acao:'transcrever'`) |
|---|---|---|
| Entra | JSON `{clinica_id, acao, texto, voice_id, modelo}`; texto cortado em 1.600 caracteres | `multipart/form-data` com o áudio (`fala.webm`/`.m4a`), `clinica_id`, `segundos` |
| Padrões | voz `RGymW84CSmfVugnA5tvA`, modelo `eleven_flash_v2_5` | modelo `scribe_v1` |
| Chama | `POST https://api.elevenlabs.io/v1/text-to-speech/<voz>?output_format=mp3_44100_128` | `POST https://api.elevenlabs.io/v1/speech-to-text` |
| Sai | `audio/mpeg` (stream) | JSON com o texto |
| Salva | `renata_consumo` (caracteres) | `renata_consumo` (segundos) |

- Ajustes de voz por clínica ficam em `renata_voz`. O áudio **não é guardado**. [confirmado]
- Mesmas verificações de login e vínculo da 3.5 (401/403). [confirmado]

**Credenciais:** Vault `salute:<clinica>:elevenlabs:<época>` (salvar marca `renata_voz.elevenlabs_configurada`) ou
segredo da função **`ELEVENLABS_API_KEY`**. Se essa variável está definida: [não confirmado].

**Erros tratados:** sem chave → 412 `sem_chave`; erro de permissão da chave ElevenLabs vira mensagem em português
dizendo qual permissão ligar. No navegador, sem ElevenLabs a fala cai para a voz do aparelho (`speechSynthesis`) e a
escuta para o reconhecimento do navegador. [confirmado]

**Como testar:** numa clínica de teste, pedir à Renata uma frase curta (gasta poucos caracteres) e gravar 2–3 s de
áudio sem dados pessoais.

### 3.7 Caminhos alternativos da Renata (fora da função `renata`)

| Situação | O que acontece | Efeito |
|---|---|---|
| Sistema aberto **dentro do claude.ai** (artifact) | `window.claude.use('sample')` é tentado **antes** da função `renata`, também no modo conectado; manda regras + resumo da clínica + até 12 mensagens à IA do claude.ai. Se a permissão for negada, segue para a função. | **Não** aplica Agente de IA, **não** conta limite mensal nem `renata_consumo`; os dados vão para a conta claude.ai de quem está vendo. [confirmado] |
| **Modo demonstração** (sem `config.js`) | O navegador chama `api.anthropic.com` e `api.elevenlabs.io` direto, com chave digitada e guardada no `localStorage` (`salute-kit:renata-ia`, `salute-kit:renata-voz`). | Resto do tempo do Claude; como a tela agora pede chave **Groq**, uma chave Groq digitada seria enviada à Anthropic e falharia. [confirmado código / inferido efeito] |
| Janela de voz separada | Ponte `rnBridge` entre janelas, restrita à mesma origem. | Interna ao navegador. [confirmado] |

### 3.8 Link público de anamnese

**Para que serve:** o paciente preenche e assina a ficha de anamnese pelo celular, sem login. [confirmado; Auditoria 04 §4.12]

**Fluxo:**
1. Equipe gera o envio (`ProntSvc.enviarAnamnese` → insere `anamnese_envios {modelo_id, paciente_id, modo}`). O banco cria
   um **token aleatório de 18 bytes** e `expira_em = agora + 7 dias`. Link: `LINK_BASE + '/?a=' + token`.
2. **Entrega ao paciente é manual** (copiar link ou mostrar QR). A Renata grava uma mensagem de WhatsApp "pendente", que
   **não é enviada** (ver 4.1). [confirmado]
3. Paciente abre → `PaginaAnamnese` → RPC `anamnese_publica(p_token)`: nome da clínica, primeiro nome, perguntas.
4. Rascunho → `salvar_rascunho_anamnese(p_token, p_rascunho)` (até 200 KB).
5. Envio → `responder_anamnese(p_token, {respostas, assinatura})`: grava respostas, assinatura, IP, navegador e local
   GPS (validado por `anamnese_local_limpo`) e cria uma `notificacoes` para a clínica. A ficha atualiza ao vivo
   (canal `anamnese-ficha`).

**Credenciais:** só o token. As RPCs são liberadas para `anon` de propósito; o papel `anon` não lê tabelas. Novo link:
`regerar_link_anamnese` (com login). [confirmado]

**Erros:** token inválido ou vencido é recusado no banco; a página mostra estado de erro. [confirmado]

**Como testar:** criar um paciente fictício, gerar o link, abrir numa janela anônima, preencher com dados falsos e
negar a localização (para ver o caminho sem GPS). Conferir a notificação na clínica.

### 3.9 Envio de documentos por link/QR

**Para que serve:** o paciente manda fotos/PDFs (exames, documentos) direto para a ficha, sem login. [confirmado;
Auditoria 04 §4.13]

**Fluxo:**
1. Equipe, na ficha (aba Documentos): `ProntSvc.linkDocumentos` insere `links_envio_documentos {paciente_id, pasta_id}`;
   token aleatório, **validade 24 h**. QR real gerado no navegador (`qrcode-generator`); no modo demonstração é desenho.
2. Paciente abre `/u/<token>` ou `?u=` → `PaginaEnvioDocs` → RPC `link_documentos_publico(p_token)` devolve
   `pasta_upload = <clinica>/links/<token>`.
3. Upload no bucket `prontuario` nessa pasta (policy anônima `salute_prontuario_link_paciente`, que exige pasta = clínica
   do link e token válido).
4. `registrar_documento_link(p_token, p_path, p_nome, p_mime, p_tamanho)` cria `documentos_paciente`
   (`origem='link_paciente'`) e atualiza `links_envio_documentos.recebidos/status`. A ficha atualiza ao vivo
   (canal `docs-ficha`).

**Erros:** "Link inválido ou vencido"; "Arquivo fora da pasta do link"; a página marca o arquivo com erro. Se o upload
passar e o registro falhar, o arquivo fica **órfão** no Storage (sem rotina de limpeza). [confirmado / inferido órfão]

**Como testar:** paciente fictício, gerar o QR, abrir o link no celular ou janela anônima e mandar um PDF de teste
pequeno. Para testar vencimento, usar um link com mais de 24 h (a expiração é marcada quando alguém abre).

### 3.10 Netlify (site) e artifact do claude.ai

**Para que serve:** publicar o front. [Auditoria 04 §4.15; `architecture.md` §6]

- **Netlify:** `netlify.toml` publica a pasta `front/` sem build e manda qualquer caminho para `/index.html` (rotas
  `/painel`, `/a/<token>`, `/u/<token>`). A branch **`producao`** publica `saluteia.site`; `main` é desenvolvimento.
  [confirmado no repo] Se o deploy automático pelo GitHub está ligado no painel: [não confirmado].
- **`deploy/netlify/`** é a pasta antiga de publicação manual; o `index.html` dela está **desatualizado**. Não usar.
  [confirmado]
- **Artifact** `WtotK7P4yu9qhf9VWrAqhA`: mesmo pacote (`front/index.html` + `front/config.js`); ali vale o caminho
  alternativo da Renata (3.7). Se está na mesma versão do `front/index.html`: [não confirmado].
- **Credenciais:** contas Netlify e GitHub, fora do repositório. O `config.js` publicado só tem dados públicos.
  [confirmado]

**Como testar:** antes de publicar, validar o `front/index.html` em modo demonstração headless (`frontend.md` §9).
Publicar só com aprovação do fundador. Depois, abrir `saluteia.site` numa janela anônima e conferir login e uma tela.

### 3.11 CDN `unpkg.com` (ícones Lucide)

**Para que serve:** desenhar todos os ícones (`Icon`) do sistema. [confirmado; Auditoria 04 §4.16]

**Fluxo:** o Design System (`7bf00496…js`, constante `LUCIDE_SRC`) cria um `<script>` em tempo real apontando para
`https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js`, **sem `integrity` (SRI)**. Nada é salvo. [confirmado]

**Riscos:** se o unpkg cair ou estiver bloqueado na rede da clínica, a tela fica sem ícones; se o arquivo for
adulterado, roda código de terceiros com a sessão do usuário. As demais bibliotecas (React 18.3.1, supabase-js 2.117.2,
qrcode-generator, fonte Aspekta) são **embutidas** no `index.html`. [confirmado]

**Como testar:** no navegador, bloquear `unpkg.com` (DevTools → Network → Block request URL) e ver a tela sem ícones.

### 3.12 Links externos simples

Não trocam dados com o sistema, só abrem páginas: YouTube (`youtube-nocookie.com`, miniaturas `i.ytimg.com`) no
Saluteflix; Google Maps no endereço da clínica; `console.groq.com/keys` no passo a passo de "Conectar o Groq".
Não há Google Fonts, jsDelivr, cdnjs nem analytics. [confirmado]

---

## 4. Planejadas / não implementadas

### 4.1 WhatsApp

**Estado real** [confirmado; Auditoria 04 §4.2 e §4.3]:
- "Enviar" (tela Mensagens ou Renata) só grava em `mensagens` com `status_entrega = 'pendente'` (e anexo no bucket
  `mensagens` + `anexos_mensagem`). **Ninguém entrega.** A tela mostra "✓" para `pendente` e até para `falhou`.
- A Renata responde "Pronto! Enviei … no WhatsApp" quando só deixou a mensagem pendente (ferramentas
  `propor_envio_anamnese` e `propor_mensagem_paciente`).
- "Conectar WhatsApp" (Configurações → Integrações) só grava `instancias_whatsapp` com `status='conectado'`; não valida
  nada na Meta nem em Evolution/Z-API. O QR do modo não oficial é desenho (`FakeQR`).
- O token da API oficial vai para o Vault (`salvar_segredo(p_provedor:'whatsapp_meta')`).
- A URL de webhook exibida aponta para `/functions/v1/whatsapp?clinica=<id>`, **função que não existe** (só existe `renata`).
- "Enviar confirmação por WhatsApp" no agendamento só grava `agendamentos.enviar_confirmacao_whatsapp = true`;
  `confirmacao_enviada_em` nunca é preenchido.
- Banco na data da auditoria: 0 instâncias, nenhum segredo `whatsapp_*`, 2 mensagens pendentes paradas.

**Já pronto no banco para quando existir** [confirmado]: colunas para API oficial (`phone_number_id`, `waba_id`) e não
oficial (`provedor_nao_oficial`, `nome_instancia`); estados `aguardando_qr`/`conectando`/`conectado`/`erro`; gatilho
`mensagem_atualiza_conversa` (atualiza conversa, lead e notificações); Realtime em `mensagens`/`conversas`;
`agente_ia_regras(clinica, 'whatsapp')` respeitando `aplicar_whatsapp`.

**O que falta** (resumo da Auditoria 04 §6.1): escolher provedor; criar o receptor de webhook (função `whatsapp` ou n8n)
com verificação de assinatura (Meta: `X-Hub-Signature-256` e `hub.verify_token`); criar o processo de saída que lê as
pendentes e atualiza `status_entrega`/`whatsapp_mensagem_id`/`entregue_em`/`lida_em`; decidir o gatilho (pg_net,
Database Webhook, pg_cron ou n8n consultando); QR real; tela e Renata honestas sobre "pendente"; IA no WhatsApp
respeitando `ia_ativa` e criando lead para número novo; rotina de confirmação de agendamento; segredo de serviço só no
n8n/função, nunca no front.

### 4.2 n8n

**Estado real:** não existe nenhuma chamada, URL, segredo, gatilho ou tabela ligada ao n8n. A única menção é um
comentário em `20261009014745_agente_ia.sql`. [confirmado]

**Contrato mínimo sugerido (proposta da Auditoria 04 §6.2, não implementado)**:

**A) Entrada (provedor → n8n → banco)**, uma chamada por mensagem recebida:
```json
{
  "evento": "mensagem_recebida",
  "instancia": { "phone_number_id": "…", "nome_instancia": "…" },
  "de": "5519999999999",
  "nome_contato": "Maria",
  "whatsapp_mensagem_id": "wamid.…",
  "tipo": "texto | imagem | video | audio | documento | figurinha",
  "texto": "…", "legenda": null,
  "midia": { "url_temporaria": "…", "mime_type": "…", "tamanho_bytes": 0, "duracao_segundos": null },
  "enviada_em": "2026-10-09T12:00:00Z"
}
```
Passos: (1) achar a clínica por `instancias_whatsapp.phone_number_id` ou `nome_instancia` (`conectado`, não excluída);
(2) `upsert` em `conversas` por `(clinica_id, telefone)`, ligando `paciente_id` (via `pacientes.whatsapp`) ou criando
`leads` (funil padrão, etapa `novo_lead`); (3) inserir `mensagens {direcao:'recebida', status_entrega:'entregue', …}`
**sem duplicar** pelo `whatsapp_mensagem_id` (hoje não há índice único nessa coluna); (4) baixar a mídia para o bucket
`mensagens` e criar `anexos_mensagem`. Gatilho e Realtime já cuidam de conversa, lead, notificação e tela.

**B) Resposta automática (opcional):** se `conversas.ia_ativa` e o lead não está pausado, chamar a IA com
`agente_ia_regras(clinica,'whatsapp')` + histórico e gravar a resposta como `mensagens {direcao:'enviada',
enviada_por_ia:true, status_entrega:'pendente'}`; segue o fluxo C.

**C) Saída (banco → n8n → provedor)**, por mensagem pendente:
```json
{ "evento": "enviar_mensagem", "mensagem_id": "uuid", "clinica_id": "uuid" }
```
O n8n lê mensagem, conversa (`telefone`, `instancia_whatsapp_id`) e anexos (link assinado), pega o token com
`ler_segredo(clinica,'whatsapp_meta')` (só service_role), envia e grava `status_entrega='enviada'` +
`whatsapp_mensagem_id`; em erro, `status_entrega='falhou'` (coluna de motivo ainda a criar).

**D) Status (provedor → n8n → banco):**
`{ "evento":"status", "whatsapp_mensagem_id":"…", "status":"entregue|lida|falhou", "em":"…" }` → atualiza
`status_entrega`, `entregue_em`, `lida_em`.

**E) Erros e retry:** até 3 tentativas com espera crescente; registrar falhas; nunca reenviar mensagem que já tem
`whatsapp_mensagem_id`; o webhook de entrada responde 200 rápido e processa depois.

**Credencial necessária:** chave `service_role` ou usuário técnico, guardada **só** no n8n. [inferido]

### 4.3 E-mail transacional

**Estado real:** não há SMTP, Resend nem outro serviço de e-mail no código. Todo e-mail é do Supabase Auth (3.1).
[confirmado] Os links de anamnese e documentos **não são enviados por e-mail** (nem SMS, nem WhatsApp). [confirmado]

**Para existir** [inferido]: um provedor (ex.: SMTP próprio ou API de e-mail) chamado por uma edge function ou pelo
n8n, com a chave em segredo de função; e, de preferência, o mesmo provedor configurado como SMTP do Supabase Auth para
tirar o limite baixo do servidor padrão.

### 4.4 Rotinas agendadas

**Estado real** [confirmado; Auditoria 04 §4.14]:
- `pg_cron` **não instalado**; sem Database Webhooks (schema `supabase_functions` não existe).
- `pg_net` 0.20.4 instalado **só para diagnóstico** (`20261009050000_pg_net_diagnostico.sql`). Essa migration tentou
  fechar o uso para `anon` e `authenticated`, mas **não teve efeito**: `net.http_post`/`net.http_get` continuam
  executáveis por eles (conferido em 2026-10-09; auditoria 05 M4, backlog P0-08). Nenhuma função do `public` usa
  `net.http_*`. [confirmado]
- Nada roda sozinho: lembretes, confirmação de agendamento, follow-up, limpeza de links vencidos e de arquivos órfãos.
  A expiração dos links é marcada "na hora em que alguém abre".

**Candidatas quando houver agendador** [inferido]: enviar confirmações (`enviar_confirmacao_whatsapp = true` e
`confirmacao_enviada_em is null`); entregar mensagens pendentes; marcar links vencidos; limpar arquivos órfãos em
`<clinica>/links/<token>/`; lembrete de anamnese não respondida.

---

## 5. Credenciais (só nomes)

| Credencial | Onde fica | Quem grava | Quem lê |
|---|---|---|---|
| `SUPABASE_ANON_KEY`, `SUPABASE_URL` (front) | `front/config.js` (público por design) | repositório | navegador |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | segredos automáticos da função | Supabase | função `renata` |
| `GROQ_API_KEY` | segredo da função (chave padrão Salute) | painel Supabase | função `renata` |
| `ELEVENLABS_API_KEY` | segredo da função | painel Supabase | função `renata` |
| `RENATA_LIMITE_PADRAO` | variável da função (padrão 300) | painel Supabase | função `renata` |
| Chaves por clínica (`groq`, `elevenlabs`, `whatsapp_meta`, `whatsapp_nao_oficial`, `certificado_fiscal`, restos `anthropic`/`google`) | Vault `salute:<clinica\|padrao>:<provedor>:<época>`; ponteiro em `segredos_integracao` | RPC `salvar_segredo` (dono/gestor) | RPC `ler_segredo` (só service_role) |
| Chaves do modo demonstração | `localStorage` (`salute-kit:renata-ia`, `salute-kit:renata-voz`) | usuário | navegador |
| Netlify, GitHub | contas externas | — | — |

Na data da auditoria havia 3 segredos no Vault, todos de 1 clínica: `anthropic`, `groq`, `elevenlabs`. [confirmado]

---

## 6. Restos a limpar

| # | Resto | Onde | Observação |
|---|---|---|---|
| 1 | Segredo `anthropic` no Vault (1 clínica) + linha em `segredos_integracao` | Vault | A função não usa mais Anthropic. [confirmado] |
| 2 | Valor `google` (Gemini) no enum `provedor_integracao` | migrations `20261009030000`/`030100` | Sem uso; `gemini.ts` já foi removido. [confirmado] |
| 3 | Tabelas legadas `ia_config` (com `webhook_url`) e `canais_conectados` | banco | 0 linhas, sem uso no front. [confirmado] |
| 4 | Buckets `pacientes` e `comprovantes` | Storage | Sem uso no front. [confirmado] |
| 5 | Modo demonstração chamando Anthropic/ElevenLabs do navegador | `1b7a2c45…js` | Incoerente com a tela que pede chave Groq. [confirmado] |
| 6 | `model: 'claude-…'` enviado pelo front | `1b7a2c45…js` | Só validado no servidor; nome engana. [confirmado] |
| 7 | `deploy/netlify/index.html` desatualizado | repositório | Risco de publicar versão velha. [confirmado] |
| 8 | Respostas de diagnóstico em `net._http_response` (19 linhas em 2026-10-09) | banco | Podem conter texto de IA; o pg_net apaga sozinho em ~6 h. [inferido] |
| 9 | Telas de WhatsApp que fingem sucesso ("✓", "Enviei", QR falso, webhook inexistente) | `c005`, `c007`, `d47643ae…js`, `1b7a2c45…js` | Corrigir antes ou junto com o WhatsApp real. [confirmado] |
| 10 | Ícones via `unpkg.com` sem SRI | `7bf00496…js` | Embutir o Lucide no pacote resolve. [confirmado] |

Pendências a verificar fora do código: SMTP e "Redirect URLs" do Auth; `GROQ_API_KEY`/`ELEVENLABS_API_KEY` definidas;
ligação Netlify ↔ GitHub; versão do artifact; registro LGPD/contrato para dados enviados ao Groq e à ElevenLabs.
[não confirmado]
