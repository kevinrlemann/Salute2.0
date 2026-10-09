# Auditoria 05 — Segurança do "Salute IA"

Data: 2026-10-09 · Modo: **somente leitura** (nada foi corrigido, nenhum dado de paciente lido, nenhum segredo lido).
Alvo: repositório `salute2.0` (branch `main` = `origin/producao`), front publicado (`front/`), edge function `renata`,
migrations do repositório e banco Supabase **"Salute IA novo visual"** (`gbhsslyoybqjvjznlave`). O projeto antigo
`pigfhkmtqyatuaudpgyy` não foi tocado.

Marcas: **[confirmado]** = visto no código ou no banco · **[inferido]** = conclusão lógica, não testada na prática ·
**[não confirmado]** = não foi possível verificar daqui.

Como foi feito:
- Código: leitura de `supabase/functions/renata/{index,groq}.ts`, `supabase/migrations/*.sql`, `front/extraido/*.js`,
  `front/extraido/template.html`, `front/config.js`, `netlify.toml`, `deploy/netlify/`, `setup/`, `tools/`.
  No arquivo minificado `d47643ae…js` as referências estão como `linha:caractere`.
- Histórico git: `git log --all -p` com busca pelos padrões `sk-`, `sk-ant-`, `gsk_`, `sb_secret_`, `AIza`, `ghp_`, JWT `eyJ…`, `xi-api-key`.
- Banco: apenas consultas de catálogo (`pg_policies`, `pg_proc` com `prosecdef`/`proconfig`, `has_function_privilege`,
  `storage.buckets`, `pg_trigger`, `pg_namespace` ACL) e contagens agregadas; `get_advisors` (security e performance).

---

## 1) Resumo executivo

O isolamento entre clínicas no banco continua **bem feito**: as 116 tabelas têm RLS ligado, o visitante anônimo não tem
acesso direto a nenhuma tabela e quase todas as regras amarram os dados ao `clinica_id` e ao módulo liberado. Não há
segredo (chave de IA, chave `service_role`) no código nem no histórico do git: a única chave encontrada é a pública
(anon), que pode ficar no navegador. Vários riscos da Auditoria 02 foram corrigidos (ver seção 4).

Os problemas que sobraram estão em outro lugar: **na tela de impressão** (dá para um "paciente" mal-intencionado
plantar código que roda no computador da clínica), **na Renata** (as travas de uso ainda podem ser contornadas, e os
dados de saúde vão para uma IA gratuita no exterior) e **na publicação** (o site sai sem os cabeçalhos de proteção
do navegador).

| Gravidade | Quantidade |
|---|---|
| CRÍTICO | **0** |
| ALTO | **4** |
| MÉDIO | **7** |
| BAIXO | **13** |

Nenhum achado CRÍTICO foi confirmado. Mas o **A4** vira CRÍTICO se o Supabase Auth estiver com a confirmação de e-mail
desligada. Isso precisa ser conferido no painel. É a primeira coisa a fazer.

### Tabela-resumo

| # | Gravidade | Achado | Status |
|---|---|---|---|
| A1 | ALTO | Código malicioso na **impressão da anamnese**: a assinatura enviada pelo paciente (link público) entra no HTML sem escape. Pode roubar o login de quem imprime. | confirmado (código) / exploração não testada |
| A2 | ALTO | **Renata ainda pode ser usada como "IA grátis"**: o limite mensal tem brecha, o plano "inicial" é ilimitado e a troca de plano é livre. Voz e transcrição não têm limite nenhum. | confirmado (código e banco) / custo inferido |
| A3 | ALTO | **LGPD**: CPF, telefone, prontuário e dados financeiros de pacientes são enviados ao **Groq (EUA, plano grátis)**, sem contrato. A tela do paciente diz que "só a clínica tem acesso". | confirmado (código) / contrato não confirmado |
| A4 | ALTO (CRÍTICO se a confirmação estiver desligada) | **Confirmação de e-mail do Auth não verificada.** O banco já não confirma sozinho, mas se o Auth confirmar automaticamente, o sequestro de convite (S1) volta. | não confirmado |
| M1 | MÉDIO | Site publicado **sem CSP e sem cabeçalhos de segurança**. O login fica no `localStorage`. | confirmado |
| M2 | MÉDIO | Ícones (lucide) carregados do **unpkg sem SRI**, em todas as telas, inclusive nas públicas. | confirmado |
| M3 | MÉDIO | Título da janela de impressão **sem escape** (nome do modelo de anamnese e nome do mapeamento) | confirmado |
| M4 | MÉDIO | `pg_net` (requisições HTTP saindo do banco) continua **executável por anon/authenticated**. A migration diz que fechou, mas não fechou. | confirmado (privilégio) / exposição pela API não confirmada |
| M5 | MÉDIO | Envio anônimo pelo link aceita **qualquer tipo de arquivo, até 50 MB, sem limite de quantidade**. As RPCs públicas não têm limite de tamanho nem de uso. | confirmado |
| M6 | MÉDIO | Proteção contra **senha vazada desligada** | confirmado (advisor) |
| M7 | MÉDIO | O **"2 etapas"** da tela Segurança é só um botão que grava um campo, sem verificação real | confirmado |
| B1–B13 | BAIXO | CORS `*`, React em modo desenvolvimento, `window.open` sem `noopener`, CSV sem proteção de fórmula, funções de gatilho executáveis, resíduo do S4, S8/S9/S11/S12/S13/S14 ainda abertos, declaração e GPS da assinatura, logs, script de ambiente, duas pastas de publicação, chave em `localStorage` no modo demonstração, erro do provedor repassado cru | ver seção 3 |

---

## 2) Achados ALTOS

### A1 — Código malicioso na impressão da anamnese, plantado pela assinatura do paciente [confirmado no código; exploração não testada]

**Evidência**
- `front/extraido/5a1e7e02-0000-4000-8000-00000000c00b.js:951-958`, função `assinaturaSvgTexto`: monta um `<svg>` por
  concatenação de texto com `a.w`, `a.h` e os pontos de `a.tracos` (`p.join(',')`), **sem nenhum escape nem conversão para número**.
- O resultado entra em `imprimirAnamnese` (`:977`) e é gravado com `document.write` num `iframe` criado na própria página
  (`imprimirHtml`, `:922-940`). Esse `iframe` não tem `sandbox`, então roda na mesma origem do sistema: tem acesso ao
  `localStorage` (onde está o login, `c001.js:50-56`) e ao `window.parent`.
- No banco, `responder_anamnese` (pode ser chamada por **anon**) só confere que `tracos` é uma lista não vazia e grava
  `jsonb_build_object('w', v_ass -> 'w', 'h', v_ass -> 'h', 'tracos', v_ass -> 'tracos')` como veio
  (consulta `pg_get_functiondef('responder_anamnese')`). Não valida o tipo nem o tamanho.
- O botão "Imprimir" da anamnese chama `imprimirAnamnese(r, paciente)` em `c00b.js:2733`. `r.assinatura` vem direto de
  `anamnese_envios.assinatura` (`c00b.js:865`).
- Na tela, a assinatura é desenhada com React (`c00b.js:1438-1450`), e o React escapa os valores. **Só a impressão é vulnerável.**

**Impacto (em linguagem simples):** quem recebe um link de anamnese (o paciente, ou qualquer pessoa para quem ele
repasse o link) pode, em vez de assinar com o dedo, mandar um "desenho" que é, na verdade, um código. Quando alguém da
clínica clicar em **Imprimir**, esse código roda no navegador da clínica com o login daquela pessoa. Ele pode copiar o
login e ler todos os pacientes que essa pessoa enxerga.

**Como corrigir depois:** (1) no banco, em `responder_anamnese`, aceitar só números em `w`, `h` e nos pontos, e limitar a
quantidade de traços e pontos; (2) no front, converter tudo com `Number()` em `assinaturaSvgTexto` (ou desenhar a
impressão com React ou `canvas`); (3) criar o iframe de impressão com `sandbox="allow-modals"`, sem scripts; (4) uma CSP
(M1) reduz o estrago.

### A2 — Renata: as travas contra uso abusivo têm brechas, e voz e transcrição não têm limite [confirmado no código e no banco; custo inferido]

**O que melhorou desde a Auditoria 02 (S2):** o modelo é validado (`index.ts:31,129`), há limite de tamanho
(`:34,132-135`), o limite mensal é calculado no servidor (`renata_limite_mes`, só `service_role`), a contagem é feita
pelo servidor (`:161`) e as regras do Agente de IA entram no começo das instruções (`:152-155`).

**Brechas que restam**
1. **O limite mensal é fácil de contornar.** Uma pergunta só "conta" e só é bloqueada se a última mensagem **não** tiver
   um bloco `tool_result` (`index.ts:45-50`, `:138-146`, `:161`). Mas `paraGroq` repassa ao Groq o texto que vier junto
   com um `tool_result` (`groq.ts:77-82`). Basta mandar cada pergunta acompanhada de um `tool_result` falso: a pergunta
   nunca conta e nunca é barrada.
2. **O plano "inicial" vale como ilimitado.** No banco, `planos.inicial.limite_mensagens_ia = null` e
   `planos.enterprise = null` (consulta em `public.planos`). Em `renata_limite_mes`, um plano com limite `null` é tratado
   como `ilimitado` (migration `20261009020100`).
3. **Trocar de plano é livre.** `trocar_plano` só exige ser dono e não envolve pagamento (definição no banco). Qualquer
   pessoa que crie conta, crie clínica (`criar_clinica` não tem restrição) e escolha "inicial" ou "enterprise" fica sem limite.
4. **As instruções e as ferramentas ainda vêm do navegador.** O `system` enviado pelo front (até 7.000 caracteres,
   `groq.ts:20,63-67`) e até 40 ferramentas (`index.ts:34`) são repassados. As regras da clínica ficam por cima, mas
   isso é só texto: não impede que alguém use a Renata para outro assunto.
5. **Voz e transcrição (ElevenLabs) não têm limite nenhum.** `voz` aceita `voice_id` e `modelo` escolhidos pelo
   navegador (`index.ts:171-172`). `transcrever` aceita qualquer `model_id` e arquivo de qualquer tamanho
   (`:186-191`), e o consumo em segundos é **informado pelo próprio navegador** (`:69,194`). Se não houver chave da
   clínica, usa `ELEVENLABS_API_KEY` da Salute (`:91-94`).
6. A Renata não confere **permissão por módulo**: qualquer membro aceito, de qualquer papel, usa (`:78-89`).

**Hoje:** o cofre tem 3 segredos, todos de clínica (`groq`, `elevenlabs`, `anthropic`), e nenhum padrão global da
Salute (contagem em `segredos_integracao`). Se as variáveis `GROQ_API_KEY` e `ELEVENLABS_API_KEY` da função estiverem
preenchidas, qualquer clínica nova usa a conta da Salute [não confirmado: o valor dos segredos da função não foi lido].

**Impacto:** qualquer pessoa na internet pode criar uma conta e usar a IA e a voz da Salute à vontade. No Groq grátis
isso esgota a cota e deixa a Renata fora do ar para todas as clínicas. Na ElevenLabs, isso é **dinheiro**.

**Como corrigir depois:** contar toda chamada `chat` (não só "pergunta nova"), ou contar tokens; tratar limite `null`
como "sem IA" (ou dar um número ao plano inicial); amarrar `trocar_plano` a pagamento ou à equipe Salute; montar o
`system` e as ferramentas no servidor; pôr limite mensal de caracteres de voz e segundos de transcrição (medidos no
servidor), lista fechada de vozes e modelos e tamanho máximo do áudio.

### A3 — LGPD: dados de saúde dos pacientes vão para uma IA gratuita no exterior [confirmado no código; contrato e consentimento não confirmados]

**Evidência**
- O contexto da Renata (`rnSnapshot`, `1b7a2c45…js:400` em diante) e as ferramentas de paciente (`:275-295`) montam
  **nome, CPF, WhatsApp, data de nascimento, sexo, convênio, prontuário e financeiro** do paciente e mandam tudo para a
  função `renata` (`c00a.js:51-67`; `1b7a2c45…js:2775-2785`).
- A função repassa ao **Groq** (`api.groq.com`, EUA), com modelos `openai/gpt-oss-*` e `qwen` no plano grátis
  (`groq.ts:7-10,18`). A voz e a transcrição vão para a ElevenLabs (`index.ts:173,191`).
- Dentro do claude.ai (artifact), a Renata usa a IA do próprio claude.ai do visitante (`window.claude`,
  `1b7a2c45…js:2443,2646`).
- A página pública da anamnese diz ao paciente: "Seus dados são protegidos pela LGPD e **só a clínica tem acesso**"
  (`c00b.js:1943`).

**Impacto:** dado de saúde é "dado sensível" na LGPD (art. 11), e o envio para fora do país tem regras próprias
(art. 33). Mandar esses dados para um serviço gratuito, sem contrato de tratamento de dados e sem avisar o paciente,
deixa a Salute e as clínicas expostas a multa e reclamação. A frase mostrada ao paciente não é verdadeira enquanto
isso acontecer.

**Como corrigir depois:** usar provedor pago com contrato de tratamento de dados (DPA) e sem retenção dos dados;
mandar só o mínimo (sem CPF, com o prontuário resumido ou apenas por ferramenta, com confirmação); registrar isso na
política de privacidade e no termo do paciente; ajustar o texto da página pública; registrar a operação na auditoria.

### A4 — Confirmação de e-mail do Supabase Auth não verificada [não confirmado]

**Evidência**
- O banco foi corrigido: `auto_confirmar_email` virou uma função que não faz nada e perdeu a permissão de execução
  (migration `20261009020000`; `has_function_privilege` = falso para anon e authenticated) [confirmado]. O gatilho
  continua ligado, mas sem efeito.
- `novo_usuario` ainda chama `ligar_convites` **se `email_confirmed_at` já vier preenchido** na criação
  (`pg_get_functiondef('novo_usuario')`) [confirmado].
- A opção "Confirm email" do Auth **não aparece no catálogo do banco**, então não foi possível ver se está ligada. O
  front está pronto para os dois casos (`c001.js:1951-1966`: sem sessão, mostra "Enviamos um email de confirmação").
- Há só 2 usuários, todos confirmados, nenhum criado depois da correção (contagem agregada em `auth.users`).

**Impacto:** se a confirmação de e-mail estiver **desligada** no Auth, o Supabase marca o e-mail como confirmado na
hora do cadastro. Nesse caso, quem souber o e-mail de um convidado se cadastra antes dele e entra na clínica com o
papel do convite. É o mesmo risco crítico S1 da Auditoria 02, só que vindo por outro caminho.

**Como corrigir depois:** no painel Supabase → Authentication → Sign In / Providers → Email, deixar **"Confirm email"
ligado** e testar com um convite real. Ainda melhor: aceitar convite só com um token do próprio convite.

---

## 3) Achados MÉDIOS e BAIXOS

### M1 — Site sem CSP e sem cabeçalhos de segurança [confirmado]
- `netlify.toml` (raiz, usado pela `producao`) e `deploy/netlify/netlify.toml` não têm `[[headers]]`. Não há `_headers`
  em `front/` na `main`/`producao`. O `template.html` não tem `<meta http-equiv="Content-Security-Policy">` (só `robots`,
  `charset` e `viewport`, linhas 3-4).
- Existia um `front/_headers` com `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy` e `Permissions-Policy`, mas
  **só na branch `versao31`** (commit `29c9283`). Ele não está em produção.
- O login do Supabase fica no `localStorage` (`c001.js:50-56`, padrão do supabase-js).
- **Impacto:** sem CSP, qualquer falha como a A1 ou a M3 consegue roubar o login. Sem `X-Frame-Options`, o sistema
  pode ser aberto dentro de outro site para enganar o usuário (clickjacking).
- **Corrigir depois:** pôr `_headers` (ou `[[headers]]`) com CSP restrita (`script-src 'self'` + hash/SRI;
  `connect-src` só para o Supabase), `frame-ancestors 'none'`, `nosniff`, `Referrer-Policy` e `Permissions-Policy`
  liberando `geolocation` só para a página `/a`. A CSP precisa ser testada, porque o bundle usa scripts inline.

### M2 — Biblioteca de ícones carregada do unpkg sem SRI [confirmado]
- `7bf00496…js:513`: `LUCIDE_SRC = 'https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js'`, injetado com
  `createElement('script')` sem `integrity`. React e ReactDOM vêm dentro do próprio pacote, com SRI (`template.html:153-154`), o que está certo.
- **Impacto:** se o unpkg (ou o caminho até ele) for comprometido, o código de terceiros roda em todas as telas,
  inclusive na anamnese pública, com acesso a tudo.
- **Corrigir depois:** embutir o lucide no pacote (como o React) ou pôr `integrity` + `crossorigin`.

### M3 — Título da impressão sem escape (nome do modelo de anamnese e do mapeamento) [confirmado]
- `c00b.js:929`: `'<title>' + titulo + '</title>'`. O `titulo` é `r.title` = nome do modelo de anamnese (`c00b.js:856,978`).
- `d47643ae…js` **8:9481**: `imprimirHtml(name,corpo)` na impressão do mapeamento. `name` vai escapado no `<h1>`, mas cru no título.
- **Impacto:** um membro da equipe com acesso a Pacientes pode criar um modelo ou mapeamento com nome
  "`</title><script>…`" e pegar o login de colegas (ex.: o dono) quando eles imprimirem. É um ataque de dentro da
  clínica, por isso fica como MÉDIO.
- **Corrigir depois:** `escHtml(titulo)` em `imprimirHtml`, junto com o sandbox citado na A1.

### M4 — `pg_net` continua aberto para anon/authenticated [confirmado no privilégio; exposição pela API não confirmada]
- A migration `20261009050000_pg_net_diagnostico.sql` diz "Fechado para quem acessa pela API", mas a consulta mostra
  `has_function_privilege('authenticated','net.http_post(...)')` = **true**, `has_function_privilege('anon','net.http_get(...)')` = **true**
  e `has_schema_privilege('authenticated','net','usage')` = **true**. A ACL de `net.http_post` é `=X/supabase_admin`
  (todos executam), porque os objetos são do `supabase_admin` e o `revoke` feito pelo `postgres` não teve efeito.
  O advisor também aponta "Extension `pg_net` in public".
- O schema `net` normalmente **não** fica exposto na API REST, e nenhuma função `public` usa `net.http_*` (consulta).
  Por isso não há caminho de ataque confirmado hoje.
- **Impacto:** se algum dia o schema `net` for exposto, ou uma função `public` passar a chamar `net.http_*` com dado do
  usuário, o banco vira uma "ponte" para fazer requisições a qualquer endereço (SSRF).
- **Corrigir depois:** se o diagnóstico não é mais usado, remover a extensão. Se for usado, pedir ao suporte ou usar o
  painel para revogar `USAGE` em `net` de anon e authenticated e corrigir a migration para não dar falsa segurança.

### M5 — Link público de documentos e RPCs públicas sem limites [confirmado]
- O bucket `prontuario` tem `allowed_mime_types = null` e limite de 50 MB (consulta `storage.buckets`). A policy
  `salute_prontuario_link_paciente` (anon) aceita **qualquer tipo** (HTML, SVG, executável) e **qualquer quantidade**
  enquanto o link vale (24 h).
- `registrar_documento_link` (anon) não confere se o arquivo existe de fato e aceita `p_nome`, `p_mime` e `p_tamanho`
  livres. Dá para encher a ficha do paciente de registros falsos.
- `salvar_rascunho_anamnese` limita 200 KB por chamada, mas aceita chamadas sem limite. `responder_anamnese` **não tem
  limite de tamanho** (respostas e traços).
- **Impacto:** abuso de armazenamento, arquivos perigosos dentro do prontuário (um HTML ou SVG aberto pela equipe roda
  no domínio do Supabase) e "lixo" no prontuário.
- **Corrigir depois:** limitar o bucket do link a `image/*` e `application/pdf`, limitar a quantidade de arquivos por
  token, conferir em `registrar_documento_link` que o objeto existe em `storage.objects` (e tirar dali o mime e o
  tamanho), limitar o tamanho em `responder_anamnese`.

### M6 — Proteção contra senha vazada desligada [confirmado, advisor `auth_leaked_password_protection`]
- É o mesmo S7 da Auditoria 02, ainda aberto. O front exige pelo menos 8 caracteres (`c001.js:1869,1923`), mas não
  impede uma senha que já vazou na internet.
- **Corrigir depois:** ligar em Authentication → Password security.

### M7 — "Verificação em 2 etapas" de mentira [confirmado]
- `30c3fd71…js:367` lê e `c008.js:275` grava só `perfis_usuario.dois_fatores_ativo`. Não há `SB.auth.mfa` em lugar nenhum.
- **Impacto:** o usuário acha que está protegido por um segundo fator, mas não está.
- **Corrigir depois:** usar o MFA (TOTP) do Supabase Auth ou esconder a opção até existir.

### Baixos

| # | Achado | Evidência | Status | Corrigir depois |
|---|---|---|---|---|
| B1 | CORS `Access-Control-Allow-Origin: *` na `renata`. Como o login vai no cabeçalho `Authorization` (não em cookie), o risco é baixo. | `index.ts:23-27` | confirmado | Restringir a `https://saluteia.site` e à origem do artifact. |
| B2 | React em **modo desenvolvimento** em produção: mais lento e com mensagens internas detalhadas. Não há falha conhecida no React 18.3.1, supabase-js 2.117.2 ou lucide 0.468.0. | `709b623d…js` (`react.development.js`), `7dd7e122…js` (`react-dom.development.js`) | confirmado (build) / falhas conhecidas não confirmadas (sem `npm audit` possível) | Usar `react.production.min.js`. |
| B3 | `window.open(..., '_blank')` **sem `noopener`**: link do Google Maps digitado pela clínica e site de parceiro. O link de mapas não é validado e poderia ser `javascript:`. | `d47643ae…js` **11:118073** (`c.maps`), **12:27259** (`'https://'+p.site`) | confirmado / `javascript:` inferido | Validar `https://` e usar `window.open(url,'_blank','noopener')`. |
| B4 | Exportação do extrato em CSV sem proteção contra fórmula (texto começando com `=`, `+`, `-` ou `@` vira fórmula no Excel). | `d47643ae…js` **11:77077** | confirmado | Prefixar com `'` os valores que começam com esses caracteres. |
| B5 | Funções auxiliares e de gatilho executáveis por anon: `criar_perfil_usuario` (gatilho, não roda se chamada direto), `link_documentos_valido` e `link_documentos_caminho_valido` (dizem se um token existe; o token tem 144 bits, então é inofensivo). `set_ia_config_atualizado_em` está sem `search_path` fixo. | advisors `anon_security_definer_function_executable` (8) e `function_search_path_mutable` | confirmado | `REVOKE EXECUTE` das funções de gatilho e `SET search_path`. |
| B6 | Resto do S4: a policy `usuarios_clinicas_editar` (UPDATE) só exige `clinicas_gestao()`. O gestor cria o convite pendente e depois troca `usuario_id` e `status_convite='aceito'` de qualquer usuário. `convidar_membro` também liga **sem aceite** quem já tem conta confirmada. | `pg_policies`; `pg_get_functiondef('convidar_membro')` | confirmado | Proibir mudar `usuario_id`/`status_convite` por UPDATE direto e exigir aceite do convidado. |
| B7 | Itens da Auditoria 02 ainda abertos: **S8** `feriados` (papel `public`, sem conferir `ativo`); **S9** `clinicas` editável em `ativo`/`excluido_em`/`slug` por quem tem `perfil.cadastro`; **S11** bucket `conteudos` legível por qualquer logado (`AND true`); **S12** UPDATE de `movimentacoes_estoque` não recalcula o saldo; **S13** `trocar_plano` sem cobrança (agrava a A2); **S14** só `feriados` e `ia_config` têm DELETE, e não há rotina de exclusão ou anonimização para pedidos da LGPD. | `pg_policies`, `pg_trigger` | confirmado | Ver a Auditoria 02. |
| B8 | Assinatura da anamnese: o **texto da declaração** gravado vem do navegador do paciente (`v_ass ->> 'declaracao'`), não do modelo. O GPS é pedido com alta precisão (`enableHighAccuracy`, 6 casas decimais). O aviso ao paciente existe (`c00b.js:1910`). | `responder_anamnese`; `c00b.js:78-118`; migration `20261009013134` | confirmado | Gravar a declaração do modelo no servidor; arredondar o GPS (3 casas ≈ 100 m) e explicar a finalidade na política de privacidade. |
| B9 | Logs: a função registra 200 caracteres das respostas de erro do Groq e da ElevenLabs (`index.ts:40`, `groq.ts:196`). O front registra objetos de erro no console (`c001.js:59,274,615`; `c00a.js:118,559,717,727`). Não foi visto log de dado de paciente. | — | confirmado / conteúdo dos logs não confirmado | Manter os logs sem conteúdo de usuário. |
| B10 | Erro do Groq repassado cru ao navegador (`index.ts:158`). | — | confirmado | Devolver mensagem genérica. |
| B11 | Ambiente de desenvolvimento: `setup/environment-setup.sh` baixa o binário `rtk` "latest" sem checksum e instala `omniroute` sem versão fixa. O OmniRoute aponta para provedores de IA desconhecidos (`docs/conexoes.md`). Se o código ou um segredo passar por ele, sai da Salute. | `setup/environment-setup.sh:12-23` | confirmado / uso real não confirmado | Fixar versão + checksum e não rotear o trabalho do repositório pelo OmniRoute. |
| B12 | Duas pastas de publicação: `front/` (usada pelo `netlify.toml`) e `deploy/netlify/`, com `index.html` **diferentes** (`cmp` difere na linha 371). Há risco de publicar a versão errada. | `cmp front/index.html deploy/netlify/index.html` | confirmado | Manter uma pasta só. |
| B13 | No **modo demonstração** (sem `config.js`), as chaves da Anthropic e da ElevenLabs digitadas ficam no `localStorage` e são usadas direto do navegador com `anthropic-dangerous-direct-browser-access`. | `1b7a2c45…js:2719,2793,3088` | confirmado (só no modo demo) | Retirar a chamada direta do pacote de produção. |

---

## 4) O que melhorou desde a Auditoria 02

| Item da 02 | Situação agora | Evidência |
|---|---|---|
| S1 Crítico: auto-confirmação de e-mail + sequestro de convite | **Corrigido no banco** (função vazia e sem permissão de execução). Falta conferir o Auth (A4). | migration `20261009020000`; `has_function_privilege` |
| S2 Alto: Renata como proxy aberto | **Parcial**: modelo validado, tamanho limitado, limite mensal no servidor, contagem no servidor, regras do Agente de IA. Restam as brechas da A2. | `index.ts:31-34,129-161`; `renata_limite_mes` só `service_role` |
| S3 Médio: upload anônimo na pasta de outra clínica | **Corrigido** (a 1ª pasta precisa ser a clínica do token). Tipo e quantidade continuam livres (M5). | policy `salute_prontuario_link_paciente` → `link_documentos_caminho_valido` |
| S4 Médio: gestor com poder amplo | **Parcial**: INSERT só como convite pendente; só o dono dá "gestor" (gatilho). O UPDATE direto ainda permite ligar qualquer usuário (B6). | migration `20261009020200`; `pg_policies` |
| S5 Médio: tabelas sem auditoria | **Corrigido**: `usuarios_clinicas`, `permissoes`, `clinicas`, `contas_pagar`, `produtos`, `movimentacoes_estoque`, `ia_config` e `agente_ia` agora auditadas (33 gatilhos `auditar`). | `pg_trigger` |
| S6 Médio: `ia_config` aberta a qualquer vínculo | **Corrigido**: só `authenticated` + `clinicas_gestao()`; gatilho quebrado neutralizado. | migration `20261009020200` |
| S7 Médio: senha vazada | **Aberto** (M6) | advisor |
| S8, S9, S11, S12, S13, S14 | **Abertos** (B7) | `pg_policies` |
| S10 Baixo: funções de gatilho executáveis | **Parcial**: `auto_confirmar_email` e `ia_config_auditoria` fechadas; `criar_perfil_usuario` ainda aberta (B5). | `has_function_privilege` |
| Migrations fora do repositório | **Melhorou**: 15 migrations novas versionadas em `supabase/migrations/`. As 41 antigas continuam só no banco. | repositório |

Pontos fortes confirmados agora:
- **Nenhum segredo no repositório nem no histórico** (20 commits, todas as branches). O único JWT encontrado é o anon
  (`role: "anon"`), em `front/config.js:3` e `deploy/netlify/config.js:3` (`eyJhbGciOi…m_Es`). Não foram achados
  `sk-`, `gsk_`, `sb_secret_`, `xi-api-key`, `AIza` nem `ghp_`.
- O front **recusa** chave `service_role` ou `sb_secret_` no `config.js` (`c001.js:37-47`).
- A edge function lê as chaves do cofre ou das variáveis de ambiente e nunca as devolve ao navegador
  (`salvar_segredo` devolve só os 4 últimos caracteres).
- `anon` **não tem permissão em nenhuma tabela** (`role_table_grants` vazio). As 116 tabelas têm RLS. A única tabela
  sem policy é `segredos_integracao`, que fica fechada de propósito.
- Todas as funções `SECURITY DEFINER` têm `search_path` fixo e nenhuma usa SQL dinâmico (`EXECUTE`) (busca em
  `pg_get_functiondef`). Não há risco de injeção de SQL nas RPCs.
- As RPCs públicas por token (`anamnese_publica`, `responder_anamnese`, `salvar_rascunho_anamnese`,
  `link_documentos_publico`, `registrar_documento_link`) exigem token de 144 bits com validade (7 dias / 24 h) e não
  vazam dados de outras clínicas. `ler_segredo` e `renata_limite_mes` só rodam com `service_role`.
  `agente_ia_regras` confere `minhas_clinicas()`.
- O markdown da Renata escapa HTML antes de usar `dangerouslySetInnerHTML` (`1b7a2c45…js:2009-2062`, usos em `:6205`
  e `:9903`). As mensagens entre janelas (`postMessage`) conferem `origin` e `source` (`:2465-2560`).
- Os links `target="_blank"` em React têm `rel="noopener noreferrer"` (`c00b.js:2712-2713`; `1b7a2c45…js:4291-4292`;
  `d47643ae…js` 9:84510, 12:33682).

---

## 5) Ordem sugerida de correção (para depois)

1. **A4**: conferir hoje no painel que "Confirm email" está ligado (2 minutos).
2. **A1 + M3 + M1**: validar a assinatura no banco, escapar e isolar a impressão (sandbox), publicar os cabeçalhos de segurança.
3. **A2**: fechar a brecha do `tool_result`, tratar limite `null` como "sem IA", travar `trocar_plano`, limitar voz e transcrição.
4. **A3**: decidir o provedor de IA com contrato (DPA), reduzir os dados enviados e ajustar o texto ao paciente.
5. **M2, M4, M5, M6, M7**, depois os baixos.

## 6) O que não foi possível verificar
- As configurações do Supabase Auth (confirmação de e-mail, prazos, SMTP), os segredos da edge function (se
  `GROQ_API_KEY` e `ELEVENLABS_API_KEY` estão preenchidos) e se a versão publicada da `renata` é igual à do
  repositório. Nada disso aparece no catálogo do banco, e o código publicado não foi baixado.
- Os schemas expostos na API REST (se `net` está exposto).
- Falhas conhecidas (CVE) das dependências: não há `package.json` nem acesso a `npm audit`.
- Nenhum ataque foi executado. As explorações descritas (A1, A2) foram deduzidas da leitura do código.
- Advisor de performance: 116 chaves estrangeiras sem índice, 249 índices sem uso e 1 policy (`feriados`) que reavalia
  `auth.uid()` a cada linha. Isso não é segurança; fica registrado só como referência.
