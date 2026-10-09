# Segurança do Salute IA

Guia de referência do **estado real** de segurança em 2026-10-09. Base: auditoria
[`auditoria/05-seguranca.md`](auditoria/05-seguranca.md) (0 crítico, 4 altos, 7 médios, 13 baixos), mais
[`architecture.md`](architecture.md), [`database.md`](database.md) e [`auditoria/02-mapa-banco.md`](auditoria/02-mapa-banco.md).
Projeto Supabase: **"Salute IA novo visual"** (`gbhsslyoybqjvjznlave`). Nenhum dado de paciente nem segredo foi lido para escrever este guia.

Legenda: **[confirmado]** = visto no código ou no catálogo do banco · **[inferido]** = conclusão lógica, não testada ·
**[não confirmado]** = não dá para verificar pelo código nem pelo banco (normalmente está no painel do Supabase).

Este documento não repete a auditoria. Para evidência linha a linha, siga as referências (A1, M3, B6...) até a 05.

---

## 1. Modelo de segurança atual

**Ideia central:** não existe servidor próprio. O navegador fala direto com o Supabase usando a chave pública (anon)
e o login do usuário. **Quem protege os dados é o banco (RLS)**, não as telas. [confirmado]

### 1.1 Autenticação

| Peça | Como funciona | Status |
|---|---|---|
| Login | Supabase Auth com e-mail e senha; convite por link mágico. Sessão guardada no `localStorage` (padrão do supabase-js, `c001.js:50-56`) | confirmado |
| Perfil | `perfis_usuario` (1 por login), criado pelo gatilho `novo_usuario` em `auth.users`; guarda `clinica_ativa_id` e `admin_plataforma` | confirmado |
| Vínculo com a clínica | `usuarios_clinicas` (papel, dono, `ativo`, `status_convite`). Só vale membro **ativo e aceito** | confirmado |
| Equipe Salute | `perfis_usuario.admin_plataforma = true` abre o Painel Master. O gatilho `tg_perfis_proteger` impede alguém virar admin sozinho | confirmado |
| Modo suporte | O admin **não vê** dados de clínica só por ser admin. Ele abre uma entrada com `admin_entrar_clinica`, que grava em `acessos_suporte` (com `expira_em`, IP e navegador). Enquanto está aberta e no prazo, `minhas_clinicas()` e `clinicas_gestao()` incluem a clínica; `admin_sair_clinica` encerra | confirmado |
| Confirmação de e-mail | O banco **não** confirma mais sozinho (S1 corrigido, `auto_confirmar_email` virou função vazia). Se o Auth está com "Confirm email" ligado: ver seção 4 (A4) | banco confirmado / Auth não confirmado |
| Senha | Front exige 8 caracteres. Proteção contra senha vazada **desligada** (M6) | confirmado |
| "2 etapas" | Só grava `perfis_usuario.dois_fatores_ativo`; não existe MFA de verdade (M7) | confirmado |
| Cadastro | Aberto: qualquer pessoa cria conta e, com `criar_clinica`, quantas clínicas quiser | confirmado no banco / config do Auth não confirmada |

### 1.2 Autorização (RLS)

- As **116 tabelas** do schema `public` têm RLS ligado; `anon` não tem permissão em **nenhuma** tabela. [confirmado]
- Quase toda tabela tem `clinica_id`; as regras amarram a linha à clínica com estas funções (todas `SECURITY DEFINER`, `search_path` fixo): [confirmado]

| Função | Uso típico na RLS |
|---|---|
| `minhas_clinicas()` | ler dados comuns da clínica (membro ativo e aceito, ou suporte aberto) |
| `clinicas_permitidas('<módulo>')` | ler/gravar dado sensível de um módulo (dono e gestor sempre têm) |
| `clinicas_gestao()` | configurações, equipe, IA (só dono ou gestor, ou suporte aberto) |
| `eh_admin_plataforma()` | conteúdo global (linhas com `clinica_id` nulo: planos, Saluteflix, parceiros...) |
| `pode(clínica, módulo)` | checagem dentro das RPCs |

- **Permissões por módulo** ficam em `permissoes`. Módulos: `pacientes`, `agenda`, `mensagens` (inclui CRM), `painel`,
  `gestao.estoque`, `gestao.financeiro`, `perfil.cadastro`, `perfil.canais` e demais `perfil.<aba>`. [confirmado]
- Membro comum não consegue se dar permissão. Só o **dono** dá papel de gestor ou dono (gatilho `usuarios_clinicas_proteger`). [confirmado]
  Ainda existe brecha no UPDATE direto de `usuarios_clinicas` por gestor (B6).
- Quase não há regra de DELETE: o front só marca `excluido_em` (exclusão lógica). [confirmado]
- 34 tabelas sensíveis têm gatilho `auditar`, que grava antes/depois na tabela `auditoria`. [confirmado]

### 1.3 Segredos

- **Vault do Supabase.** A tabela `segredos_integracao` guarda só o ponteiro para o Vault e **não tem nenhuma policy**
  (ninguém do front lê nem grava). [confirmado]
  - `salvar_segredo(clínica, provedor, segredo)`: chamada pelo front; confere papel (chave padrão só admin; WhatsApp
    `perfil.canais`; fiscal `gestao.financeiro`; demais gestão). Devolve só os 4 últimos caracteres. [confirmado]
  - `ler_segredo(clínica, provedor)`: só `service_role` executa (usada pela função `renata`). [confirmado]
- **Segredos da edge function** (só nomes): `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (injetados pelo Supabase),
  `GROQ_API_KEY`, `ELEVENLABS_API_KEY`, `RENATA_LIMITE_PADRAO`. O Vault tem prioridade; a variável é o reserva.
  Se `GROQ_API_KEY`/`ELEVENLABS_API_KEY` estão preenchidas: [não confirmado].
- **Repositório:** nenhum segredo no código nem no histórico do git (todas as branches). A única chave é a anon, em
  `front/config.js` e `deploy/netlify/config.js`, que pode ficar pública. [confirmado]
- O front **recusa** chave `service_role` ou `sb_secret_` no `config.js` (`c001.js:37-47`). [confirmado]
- Exceção: no **modo demonstração** (sem `config.js`) as chaves Anthropic/ElevenLabs digitadas ficam no `localStorage` (B13). [confirmado]

### 1.4 Storage

- 7 buckets, **todos privados**: `clinica`, `prontuario`, `mensagens`, `fiscal`, `conteudos`, `pacientes`, `comprovantes`. [confirmado]
- Caminho padrão `<clinica_id>/<pasta>/<arquivo>`; as 22 policies de `storage.objects` conferem a clínica pela 1ª pasta
  (`pasta_membro`, `pasta_permitida`). [confirmado]
- Leitura pelo front só por **URL assinada de 1 hora** (`createSignedUrl(path, 3600)`, `c001.js:525`). [confirmado]
- Pontos fracos: `conteudos` legível por qualquer logado (S11/B7); `prontuario` aceita qualquer tipo de arquivo pelo link anônimo (M5). [confirmado]

### 1.5 Links públicos por token (sem login)

| Link | RPCs abertas a `anon` | Validade | Status |
|---|---|---|---|
| Anamnese `/a/<token>` | `anamnese_publica`, `salvar_rascunho_anamnese` (200 KB por chamada), `responder_anamnese` | **7 dias** | confirmado |
| Envio de documentos `/u/<token>` | `link_documentos_publico`, `registrar_documento_link` + upload no bucket `prontuario`, na pasta `<clínica>/links/<token>/` | **24 h** | confirmado |

- Token de 144 bits, impossível de adivinhar na prática; as RPCs não vazam dados de outra clínica. [confirmado]
- O que **não** é validado: tamanho e tipo da assinatura e das respostas (A1, M5), tipo e quantidade de arquivos no
  link de documentos (M5), se o arquivo registrado existe de fato (M5). Quem tem o link (ou para quem ele foi repassado)
  age como o paciente. [confirmado]

### 1.6 Edge function `renata` (v8, `verify_jwt = true`)

O que ela **valida** [confirmado, `supabase/functions/renata/index.ts`]:
- login (`auth.getUser` com o JWT do cabeçalho);
- vínculo **ativo e aceito** com a clínica pedida, ou admin com `acessos_suporte` aberto e dentro do prazo;
- nome do modelo contra lista fechada; até 100 mensagens, 40 ferramentas, 400 mil caracteres por pedido;
- limite mensal de mensagens (via `renata_limite_mes`, só `service_role`) quando usa a chave da Salute;
- consumo contado no servidor (`renata_registrar_consumo`); regras do Agente de IA (`agente_ia_regras`) no começo das instruções;
- chaves lidas do Vault/variáveis e **nunca** devolvidas ao navegador.

O que ela **não** valida [confirmado]: permissão por módulo (qualquer papel usa); instruções (`system`) e ferramentas
vêm do navegador; voz e transcrição sem limite e com segundos informados pelo navegador; o limite mensal pode ser
contornado com `tool_result` falso (A2). CORS é `*` (B1). Os dados enviados ao Groq (EUA) incluem dados de saúde (A3).

Se o código publicado (v8) é igual ao do repositório: `architecture.md` registra como [confirmado] por comparação;
a auditoria 05 não baixou o código publicado.

### 1.7 Front: o que é só visual e o que o banco garante

| Só visual (pode ser contornado chamando a API direto) | Garantido pelo banco |
|---|---|
| Filtro pela clínica ativa em `DB.*` | Isolamento entre clínicas (RLS + `clinica_id`) |
| Esconder menus/abas com `useAccess().can()` | Permissão por módulo (`clinicas_permitidas`) |
| Agenda em blocos de 30 min, campos obrigatórios | Saldo de estoque (gatilhos, sem negativo) |
| "2 etapas" (M7) | Só o dono promove gestor/dono; ninguém vira admin sozinho |
| Senha com 8 caracteres (o Auth tem o próprio mínimo, não confirmado) | Validade dos tokens públicos (7 dias / 24 h) |
| Renata "só propõe e a pessoa confirma" (regra do front) | Auditoria de alterações (gatilhos `auditar`) |

[confirmado; a lista do front vem de `architecture.md` §8]

Cuidados no front: o markdown da Renata escapa HTML antes de `dangerouslySetInnerHTML`; `postMessage` confere
`origin`. A **impressão** (`imprimirHtml` com `document.write` num iframe sem `sandbox`) é o ponto fraco (A1, M3).
O site sai sem CSP nem cabeçalhos de segurança (M1) e carrega o lucide do unpkg sem SRI (M2). [confirmado]

---

## 2. Regras obrigatórias para quem desenvolve

Marque cada item antes de pedir aprovação de uma mudança.

**Chaves e segredos**
- [ ] Nunca usar a chave `service_role` (ou `sb_secret_...`) no front, no `config.js`, em artifact ou em qualquer arquivo publicado. No front só entra a anon.
- [ ] Nenhum segredo no repositório (é público para quem tem o link do GitHub/Netlify). Chave de IA vai para o Vault via `salvar_segredo` ou para os segredos da edge function.
- [ ] Nunca devolver chave ao navegador nem gravar chave em log. Mensagens de erro de provedor devem ser genéricas (B10).

**Banco**
- [ ] Toda tabela nova: `clinica_id` (nulo só para conteúdo global da Salute), `alter table ... enable row level security`, e policies usando `minhas_clinicas()` / `clinicas_permitidas('<módulo>')` / `clinicas_gestao()`. Nada de `using (true)`.
- [ ] Policies para `authenticated`, não para `public`/`anon` (exceto quando o acesso anônimo for intencional e por token).
- [ ] Tabela com dado sensível ganha gatilho `auditar` e `atualizado_em`. Exclusão por `excluido_em`.
- [ ] `SECURITY DEFINER` só quando necessário, **sempre** com `set search_path = public` (ou lista fixa) e checagem de clínica/papel dentro da função (`pode(...)`, `minhas_clinicas()`, `auth.uid()`). Sem SQL dinâmico (`EXECUTE`) com dado do usuário.
- [ ] Depois de criar função: `revoke execute ... from public, anon;` e `grant execute ... to authenticated` (ou só `service_role`). Funções de gatilho não precisam de execute para ninguém.
- [ ] RPC aberta a `anon` só com token forte e validade, e validando **tipo, tamanho e quantidade** de tudo que entra.
- [ ] Bucket novo: privado, `allowed_mime_types` e limite de tamanho definidos, policy pela 1ª pasta = `clinica_id`.
- [ ] Toda mudança de schema vira arquivo `supabase/migrations/<AAAAMMDDHHMMSS>_<nome>.sql` **antes** de aplicar, com o mesmo número no banco e no arquivo.
- [ ] Depois de aplicar, rodar os advisors de segurança do Supabase e conferir com `has_function_privilege` que o `revoke` funcionou (ver M4: um `revoke` que não teve efeito).

**Front**
- [ ] Qualquer HTML montado por texto (impressão, `document.write`, `innerHTML`, título de janela) passa por `escHtml`; números convertidos com `Number()`. Iframe de impressão com `sandbox`.
- [ ] Nunca confiar no front para permissão: se a regra importa, ela tem de estar na RLS ou na RPC.
- [ ] Links externos: validar `https://` e abrir com `noopener` (B3). CSV: prefixar `'` em valores que começam com `= + - @` (B4).
- [ ] Script de terceiro só com versão fixa e `integrity` (SRI), ou embutido no pacote.

**Dados de paciente, IA e LGPD**
- [ ] Mandar à IA só o mínimo necessário (sem CPF; prontuário só quando a pessoa pedir). Provedor de IA para dado de saúde precisa de contrato (DPA) e aviso ao paciente (A3).
- [ ] Não registrar dado de paciente em log (`console`, logs da função).
- [ ] Não ler dados reais de paciente em auditoria ou teste; usar consultas de catálogo ou contagens agregadas.
- [ ] Coleta nova de dado (ex.: GPS, foto) precisa de finalidade explicada e o mínimo de precisão (B8).
- [ ] Textos ao paciente devem ser verdadeiros ("só a clínica tem acesso" hoje não é, por causa da A3).

**Publicação**
- [ ] Publicar só a pasta `front/` (a `deploy/netlify/` está desatualizada, B12). Deploy e push para `producao` só com aprovação do fundador.

---

## 3. Riscos conhecidos em aberto

Referência: seções 2 e 3 de [`auditoria/05-seguranca.md`](auditoria/05-seguranca.md). Ordem sugerida de correção na seção 5 de lá.

| ID | Gravidade | Resumo | Status | Ref. |
|---|---|---|---|---|
| A1 | ALTO | Assinatura do paciente (link público) entra sem escape no HTML da impressão da anamnese; pode roubar o login de quem imprime | confirmado (código) / exploração não testada | 05 §2 A1 |
| A2 | ALTO | Renata usável como "IA grátis": brecha do `tool_result`, plano inicial ilimitado, troca de plano livre, voz/transcrição sem limite | confirmado / custo inferido | 05 §2 A2 |
| A3 | ALTO | CPF, prontuário e financeiro de pacientes vão ao Groq (EUA, plano grátis) sem contrato (LGPD) | confirmado (código) / contrato não confirmado | 05 §2 A3 |
| A4 | ALTO (CRÍTICO se desligado) | "Confirm email" do Auth não verificado; se desligado, volta o sequestro de convite | não confirmado | 05 §2 A4 |
| M1 | MÉDIO | Site sem CSP nem cabeçalhos de segurança; login no `localStorage` | confirmado | 05 §3 M1 |
| M2 | MÉDIO | Lucide carregado do unpkg sem SRI, inclusive nas páginas públicas | confirmado | 05 §3 M2 |
| M3 | MÉDIO | Título da janela de impressão sem escape (nome do modelo de anamnese e do mapeamento) | confirmado | 05 §3 M3 |
| M4 | MÉDIO | `pg_net` ainda executável por anon/authenticated (o `revoke` da migration não teve efeito) | confirmado (privilégio) / exposição pela API não confirmada | 05 §3 M4 |
| M5 | MÉDIO | Link de documentos aceita qualquer tipo e quantidade (até 50 MB cada); RPCs públicas sem limite de tamanho/uso | confirmado | 05 §3 M5 |
| M6 | MÉDIO | Proteção contra senha vazada desligada | confirmado (advisor) | 05 §3 M6 |
| M7 | MÉDIO | "Verificação em 2 etapas" é só um campo, sem MFA real | confirmado | 05 §3 M7 |
| B1 | BAIXO | CORS `*` na `renata` | confirmado | 05 §3 Baixos |
| B2 | BAIXO | React em modo desenvolvimento em produção | confirmado | 05 §3 Baixos |
| B3 | BAIXO | `window.open` sem `noopener`; link de mapas sem validação | confirmado / `javascript:` inferido | 05 §3 Baixos |
| B4 | BAIXO | CSV do extrato sem proteção contra fórmula | confirmado | 05 §3 Baixos |
| B5 | BAIXO | Funções de gatilho/auxiliares executáveis por anon; `set_ia_config_atualizado_em` sem `search_path` | confirmado | 05 §3 Baixos |
| B6 | BAIXO | Gestor pode ligar qualquer usuário por UPDATE em `usuarios_clinicas`; `convidar_membro` liga sem aceite | confirmado | 05 §3 Baixos |
| B7 | BAIXO | S8, S9, S11, S12, S13, S14 da Auditoria 02 ainda abertos (inclui falta de rotina de exclusão LGPD) | confirmado | 05 §3 Baixos |
| B8 | BAIXO | Texto da declaração da assinatura vem do navegador; GPS em alta precisão | confirmado | 05 §3 Baixos |
| B9 | BAIXO | Logs com trechos de erro de provedores e objetos de erro no console | confirmado / conteúdo não confirmado | 05 §3 Baixos |
| B10 | BAIXO | Erro do Groq repassado cru ao navegador | confirmado | 05 §3 Baixos |
| B11 | BAIXO | Script de ambiente baixa binários sem versão fixa/checksum; OmniRoute | confirmado / uso real não confirmado | 05 §3 Baixos |
| B12 | BAIXO | Duas pastas de publicação com `index.html` diferentes | confirmado | 05 §3 Baixos |
| B13 | BAIXO | Modo demonstração guarda chaves de IA no `localStorage` e chama a API direto do navegador | confirmado (só no modo demo) | 05 §3 Baixos |

Observações de consistência:
- `database.md` §8 diz que `pg_net` está "fechado para anon/authenticated". A auditoria 05 (M4) mostrou que **não está**
  (`has_function_privilege` = true). Vale a auditoria. [confirmado na 05]
- A migration `20261009020913_feriados_nacionais.sql` (commit `46363ee`) é posterior aos documentos de base. Ela cria
  `feriados_do_mes` como `security invoker`, `search_path` fixo e execute só para `authenticated`/`service_role`.
  Ela **não** mudou a policy da tabela `feriados` (S8 continua aberto: a policy `feriados_clinica` vale para
  qualquer vínculo em `usuarios_clinicas`, sem checar ativo/aceito). [confirmado em 2026-10-09 no catálogo]

---

## 4. Pendências no painel do Supabase (só o fundador)

Estes itens não aparecem no catálogo do banco e não podem ser mudados por migration. Exigem login no painel
(<https://supabase.com/dashboard/project/gbhsslyoybqjvjznlave>). Os nomes de menu podem variar um pouco entre versões do painel. [inferido]

### 4.1 Confirm email (A4) — fazer primeiro
1. Authentication → **Sign In / Providers** → **Email**.
2. Conferir que **"Confirm email"** está **ligado**. Se estiver desligado, ligar e salvar.
3. Testar: convidar um e-mail de teste numa clínica de teste, cadastrar esse e-mail e ver que a conta **só entra na
   clínica depois** de clicar no link do e-mail.
4. Registrar o resultado (ligado/desligado na data) na auditoria 05 ou neste arquivo, para tirar o "não confirmado" da A4.

### 4.2 Proteção contra senha vazada (M6)
1. Authentication → **Providers → Email** (ou **Policies / Password security**, conforme a versão).
2. Ligar **"Leaked password protection"** (confere a senha na base do HaveIBeenPwned). Pode exigir plano pago. [inferido]
3. Aproveitar para conferir o **tamanho mínimo da senha** (recomendado 8 ou mais, igual ao front) e, se disponível,
   exigir letras e números.
4. Rodar o Security Advisor de novo: o aviso `auth_leaked_password_protection` deve sumir.

### 4.3 SMTP próprio
Hoje o envio de e-mail do Auth (confirmação, convite, recuperação de senha) usa o servidor padrão do Supabase, que tem
limite baixo de envios por hora e é feito para teste. [inferido: SMTP não confirmado, ver 05 §6]
1. Contratar/usar um provedor de e-mail transacional (ex.: Resend, SendGrid, Amazon SES) e validar o domínio
   `saluteia.site` (registros SPF, DKIM e DMARC no DNS).
2. Authentication → **Emails** → **SMTP Settings** → ligar **"Enable Custom SMTP"** e preencher host, porta, usuário,
   senha (a senha fica no painel, **nunca** no repositório), remetente (ex.: `nao-responda@saluteia.site`).
3. Em Authentication → **Rate Limits**, ajustar o limite de e-mails por hora.
4. Em **Emails → Templates**, revisar os textos em português.
5. Testar: cadastro novo, convite e "esqueci a senha".

### 4.4 Outros itens que dependem do painel (para conferir quando possível)
- **Cadastro aberto** (Authentication → Sign In / Providers → "Allow new users to sign up"): hoje qualquer um cria conta
  e clínica, o que alimenta a A2. Decidir se continua aberto. [não confirmado]
- **Segredos da edge function** (Edge Functions → `renata` → Secrets): ver se `GROQ_API_KEY` e `ELEVENLABS_API_KEY`
  estão preenchidas. Se sim, toda clínica sem chave própria usa a conta da Salute (A2). [não confirmado]
- **Schemas expostos na API** (Settings → API → Exposed schemas): confirmar que `net` **não** está na lista (M4). [não confirmado]
- **URL de redirecionamento** (Authentication → URL Configuration): só `https://saluteia.site` e as origens realmente usadas. [não confirmado]

## Atualização 2026-10-09 (Agente de IA)

| Id | Nível | Achado | Estado |
|---|---|---|---|
| S9 | ALTO | Funções `ia_*` (segunda implementação do agente) executáveis por anon/authenticated sem checar clínica | **resolvido** (só service_role executa) [confirmado] |
| S10 | BAIXO | `contato_optout` sem checagem de clínica | **corrigido** (só servidor) [confirmado] |
| — | — | Funções de fila do agente (`reivindicar_*`, `concluir_*`, `registrar_webhook`) recusam quem não é `service_role`; as tabelas novas só permitem leitura pela própria clínica | [confirmado pelos testes 38/38] |

## Correções aplicadas em 2026-10-09 (manhã) [confirmado]

| Achado | O que mudou | Onde |
|---|---|---|
| A1 / M3 (impressão da anamnese) | iframe com `sandbox`, título escapado, assinatura só com números (tela e banco) | `c00b`, migration `anamnese_assinatura_valida` |
| Cabeçalhos (CSP etc.) | CSP com `connect-src` restrito, anti-iframe, nosniff, HSTS, Permissions-Policy | `netlify.toml` (vale ao publicar) |
| M2 (Lucide sem SRI) | `integrity` sha384 + `crossorigin` | `7bf0` |
| M5 (envio público) | arquivo conferido no Storage, tamanho/tipo do Storage, 30 por link, resposta até 10 mil caracteres | migration `documentos_link_limites` |
| B3 / B4 | links externos com `noopener` e só `https://`; CSV sem fórmula | `d476` |
| B5 | nenhuma função de gatilho executável por anon/authenticated | migration `funcoes_gatilho_sem_execucao_publica` |
| S8 (feriados) | leitura para membros ativos, gravação só gestão | migration `feriados_politicas_padrao` |
| WhatsApp "enviado" falso | "Aguardando envio", Renata honesta, sem QR falso | `c005`, `366b`, `1b7a`, `c007`, `d476` |
| Segredos no repositório | busca automática no CI | `tools/verificar_segredos.py` |

