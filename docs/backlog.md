# Backlog técnico priorizado — Salute IA

Data: 2026-10-09 · Prompt 8 do manual ("Gerar plano de desenvolvimento seguro").

> **Nada foi implementado.** Este documento é só um plano. Nenhum código, banco, configuração, publicação ou commit
> foi feito para produzi-lo. A única escrita foi este arquivo.

Fontes: `docs/auditoria/01` a `05`, `docs/architecture.md`, `docs/frontend.md`, `docs/database.md`, com conferência
pontual no código (`front/extraido/`, `supabase/functions/renata/`, `supabase/migrations/`, `netlify.toml`).
Quando as auditorias 01–03 (mais antigas) discordam das 04, 05 e dos docs novos, valem as mais novas.
`docs/integrations.md` e `docs/security.md` foram criados durante a escrita deste backlog e conferidos por alto: não
contradizem os itens abaixo. A divergência do `pg_net` "fechado" em `database.md` e `integrations.md` já foi corrigida nos dois documentos.

Marcas: **[confirmado]** visto no código/banco pelas auditorias ou nesta leitura · **[inferido]** conclusão provável ·
**[não confirmado]** depende de painel/serviço que não foi visto.

Abreviações: `c001`…`c00b` = `front/extraido/5a1e7e02-0000-4000-8000-00000000c0XX.js`; `1b7a` = `1b7a2c45…js`;
`d476` = `d47643ae…js` (minificado); `7bf0` = `7bf00496…js`. "A1", "M3", "B6"… = achados da Auditoria 05;
"S1"… = Auditoria 02; "R1"… = Auditoria 01; "L1"… = Auditoria 03 §8 ou Auditoria 04 §6.3 (indicado).

Atenção: as linhas citadas vêm do commit `af596dd`. O commit seguinte (`46363ee`, feriados) mexeu em `1b7a`,
`25352dc7` e `d41989a4`, então números de linha nesses arquivos podem ter andado alguns pontos.

Esforço: **P** = até 1 dia · **M** = 2 a 5 dias · **G** = mais de 1 semana.
Risco da mudança: o quanto a correção pode quebrar algo que hoje funciona.

---

## Resumo executivo

| Nível | O que significa | Itens |
|---|---|---|
| **P0** | Pode vazar dados, gerar custo/abuso, perder dados ou enganar a clínica em produção | **11** |
| **P1** | Dificulta evoluir com segurança (arquitetura, processo, testes, legado) | **19** |
| **P2** | Melhorias e funcionalidades novas | **13** |
| **Total** | | **43** |

### Top 5 para fazer primeiro

1. **P0-01 — Ligar/confirmar "Confirm email" no Supabase Auth.** 2 minutos no painel; se estiver desligado, qualquer
   pessoa pode "roubar" um convite e entrar numa clínica.
2. **P0-02 — Fechar o código malicioso na impressão da anamnese.** Um paciente (ou quem tiver o link) pode plantar
   código que rouba o login de quem imprime.
3. **P0-03 — Fechar as brechas de custo da Renata.** Hoje dá para usar a IA e a voz da Salute sem limite.
4. **P0-04 — LGPD da Renata.** Dados de saúde vão para uma IA gratuita nos EUA sem contrato, e a tela diz ao paciente
   que "só a clínica tem acesso".
5. **P0-05 — Cabeçalhos de segurança (CSP, anti-iframe).** Reduz o estrago de qualquer falha como a do item 2.

### Ordem sugerida de execução (ondas)

| Onda | Quando | Itens | Por quê |
|---|---|---|---|
| **0 — Painel, sem código** | hoje | P0-01, P0-09, verificação de backup de P0-11, P1-16 (SMTP/Redirect URLs) | Só configuração e conferência; risco quase zero |
| **1 — Furos de segurança pequenos** | semana 1 | P0-02, P0-05, P0-06, P0-07, P0-08, P0-10 | Correções pequenas e localizadas, cada uma testável sozinha |
| **2 — Renata e LGPD** | semanas 1–2 | P0-03, P0-04 (decisão do fundador sobre provedor), P1-06, P1-07 | Exigem decisão de negócio (plano, provedor com contrato) |
| **3 — Base para mexer com segurança** | semanas 2–4 | P0-11 (migrations iniciais), P1-05 (testes), P1-09, P1-10, P1-11, P1-12, P1-13, P1-17 | Sem testes e sem banco reprodutível, toda mudança grande é arriscada |
| **4 — Reorganizar o front** | mês 2 | P1-01, P1-02, P1-03, P1-04, P1-08, P1-14, P1-15, P1-18, P1-19 | Maior esforço; depende da onda 3 (testes) |
| **5 — Funcionalidades** | depois | P2 (WhatsApp real via n8n, rotinas, e-mail, MFA etc.) | Constrói em cima de uma base segura |

Regra para todas as ondas (do `CLAUDE.md` e do manual): branch → plano → menor alteração → validação → diff → commit → PR →
publicação só com aprovação do fundador. Mudança de banco sempre como migration versionada antes de aplicar.

---

## P0 — Riscos de vazamento, custo, perda de dados ou quebra de produção

### P0-01 — Confirmação de e-mail do Supabase Auth não verificada (sequestro de convite)
- **Problema:** se a opção "Confirm email" do Auth estiver desligada, o Supabase marca o e-mail como confirmado no
  cadastro, e a função `novo_usuario` liga a pessoa aos convites pendentes desse e-mail.
- **Evidência:** Auditoria 05 A4; `novo_usuario` chama `ligar_convites` quando `email_confirmed_at` vem preenchido;
  `auto_confirmar_email` já neutralizada (`supabase/migrations/20261009020000_s1_neutraliza_auto_confirmacao_email.sql`).
  Configuração do Auth **[não confirmado]**.
- **Impacto:** quem souber o e-mail de uma nova funcionária se cadastra antes dela e entra na clínica com o papel do
  convite (até gestor), vendo pacientes.
- **Afeta:** Supabase Auth (painel), `novo_usuario`, `ligar_convites`, `usuarios_clinicas`.
- **Dependências:** nenhuma. Melhoria definitiva (aceite por token do convite) se liga a P1-12.
- **Risco da mudança:** baixo. Novos cadastros passam a precisar clicar no e-mail (o front já trata isso, `c001:1951-1966`).
  Depende de o envio de e-mail funcionar (P1-16).
- **Teste:** criar conta de teste com e-mail real → deve aparecer "Enviamos um email de confirmação" e o usuário não
  entra na clínica até confirmar. Criar convite para e-mail X, cadastrar X sem confirmar → não pode aparecer na clínica.
- **Esforço:** P.

### P0-02 — Código malicioso na impressão da anamnese (assinatura e títulos sem escape)
> ✅ **Feito em 2026-10-09:** impressão em `iframe` com `sandbox` (sem scripts), título escapado, assinatura só com números
> no front (`assinaturaSvgTexto`) e no banco (gatilho `tg_anamnese_envios_assinatura_valida`). Testado: nenhum script roda.
- **Problema:** a assinatura enviada pelo link público é montada como texto HTML sem escape e escrita num `iframe`
  sem `sandbox`, na mesma origem do sistema. O título da impressão também não é escapado.
- **Evidência:** `c00b.js:951-958` (`assinaturaSvgTexto`, `p.join(',')` sem conversão para número) [confirmado nesta
  leitura]; `imprimirHtml` `c00b.js:922-940`, `'<title>' + titulo + '</title>'` [confirmado nesta leitura]; botão em
  `c00b.js:2733`; `responder_anamnese` (anon) grava `w`, `h`, `tracos` sem validar tipo/tamanho. Título do mapeamento
  em `d476` 8:9481. Auditoria 05 A1 e M3; Auditoria 01 R14.
- **Impacto:** alguém com o link da anamnese manda um "desenho" que é código. Quando a clínica clicar em Imprimir, esse
  código roda com o login de quem imprime e pode copiar o acesso e ler os pacientes. M3: um colega mal-intencionado faz
  o mesmo usando o nome de um modelo.
- **Afeta:** `front/extraido/…c00b.js` (`assinaturaSvgTexto`, `imprimirHtml`, `imprimirAnamnese`), `d476` (impressão do
  mapeamento), função `public.responder_anamnese` (nova migration), `front/index.html` (rebundle).
- **Dependências:** nenhuma. P0-05 (CSP) reduz o estrago e deve vir logo depois.
- **Risco da mudança:** baixo a médio. `sandbox` no iframe pode bloquear `print()` em algum navegador; testar Chrome,
  Safari e Edge.
- **Teste:** (1) no banco de teste, chamar `responder_anamnese` com `tracos` contendo texto (`"\"/><script>…"`) → deve
  ser recusado; (2) no front, imprimir uma anamnese com assinatura normal → sai igual a hoje; (3) forçar uma
  assinatura maliciosa num registro de teste e imprimir → nenhum script executa (conferir no console); (4) modelo com
  nome `</title><b>x` → título aparece escapado.
- **Esforço:** P.

### P0-03 — Renata: brechas de custo e abuso (IA e voz da Salute sem limite real)
- **Problema:** (1) uma pergunta acompanhada de um `tool_result` falso não conta no limite e não é barrada;
  (2) planos `inicial` e `enterprise` com limite `null` são tratados como ilimitados; (3) `trocar_plano` não exige
  pagamento; (4) instruções (`system`) e ferramentas vêm do navegador; (5) voz e transcrição sem limite, com voz,
  modelo, tamanho do arquivo e segundos informados pelo navegador; (6) qualquer membro usa, sem checar módulo.
- **Evidência:** `supabase/functions/renata/index.ts:45-50` (`ehPerguntaNova`) e `:137-146` [confirmado nesta leitura];
  `groq.ts:77-82` (`paraGroq` repassa texto junto com `tool_result`); `index.ts:171-172`, `:186-194`
  (`segundos` vem do corpo do pedido) [confirmado nesta leitura]; `planos.limite_mensagens_ia = null`; migration
  `20261009020100_s2_renata_limite_mes.sql`; Auditoria 05 A2, Auditoria 02 S2/S13. Se `GROQ_API_KEY`/`ELEVENLABS_API_KEY`
  estão preenchidas na função: **[não confirmado]**.
- **Impacto:** qualquer pessoa cria conta, cria clínica, escolhe um plano "ilimitado" e usa a IA/voz da Salute à
  vontade. No Groq grátis isso derruba a Renata para todas as clínicas; na ElevenLabs vira conta a pagar.
- **Afeta:** `supabase/functions/renata/index.ts`, `groq.ts`, `renata_limite_mes`, `renata_registrar_consumo`,
  `trocar_plano`, `criar_clinica`, tabela `planos`, `front/extraido/…c00a.js` e `1b7a` (se o `system` passar a ser
  montado no servidor).
- **Dependências:** decisão do fundador sobre limites por plano e quem pode trocar de plano. Montar o `system` no
  servidor pode ser feito em etapa separada (mais esforço). Pagamento real é P2-09.
- **Risco da mudança:** médio. Limite mal calibrado bloqueia clínicas reais; mexer no `system` pode mudar o
  comportamento da Renata. Fazer em partes: contagem e limites primeiro, `system` no servidor depois.
- **Teste:** testes automáticos da função (estender `supabase/functions/renata/testes/`): pedido com `tool_result`
  falso + texto deve contar; plano com limite `null` não pode ser ilimitado (ou ter número definido); `transcrever`
  com arquivo acima do limite → 413; voz com `voice_id` fora da lista → 400; segundos medidos no servidor; usuário sem
  ser dono não troca plano para "enterprise". Conferir `renata_consumo` depois de cada chamada.
- **Esforço:** M (contagem, limites, voz) + M (`system`/ferramentas no servidor).

### P0-04 — LGPD: dados de saúde enviados ao Groq (EUA, grátis) sem contrato, com aviso falso ao paciente
- **Problema:** a Renata manda nome, CPF, WhatsApp, nascimento, convênio, prontuário e financeiro do paciente para o
  Groq (plano grátis) e áudio para a ElevenLabs. Não há contrato de tratamento de dados confirmado. A página pública
  diz ao paciente que "só a clínica tem acesso".
- **Evidência:** `1b7a:400` em diante (`rnSnapshot`), `1b7a:275-295`; `groq.ts:7-10,18`; `index.ts:173,191`;
  `c00b.js:1943` (frase ao paciente). Auditoria 05 A3, Auditoria 04 L4. Contrato/DPA e consentimento: **[não confirmado]**.
- **Impacto:** dado de saúde é "dado sensível" (LGPD art. 11) e o envio ao exterior tem regras próprias (art. 33).
  Risco de multa, reclamação e perda de confiança. A frase mostrada ao paciente não é verdadeira hoje.
- **Afeta:** `1b7a` (`rnSnapshot`, ferramentas de paciente), `c00b.js` (texto da página pública),
  `supabase/functions/renata/groq.ts` (provedor), política de privacidade e termo do paciente (fora do código).
- **Dependências:** **decisão do fundador** sobre provedor de IA pago com DPA e sem retenção. P1-06 (window.claude) e
  P1-14 (rotina LGPD) completam o tema.
- **Risco da mudança:** médio. Mandar menos dados pode deixar a Renata menos útil; trocar de provedor muda respostas.
- **Teste:** registrar (em ambiente de teste) o corpo enviado à função `renata` e conferir que CPF e prontuário completo
  não vão no resumo; conferir que a página pública mostra o novo texto; checklist jurídico assinado (contrato do provedor,
  política publicada).
- **Esforço:** M (código) + decisão jurídica/comercial fora do código.

### P0-05 — Site publicado sem CSP e sem cabeçalhos de segurança
> ✅ **Feito em 2026-10-09 (no `netlify.toml`, vale quando publicar):** CSP com `connect-src` só para o site e o Supabase,
> `frame-ancestors 'self'`, `object-src 'none'`, `base-uri`/`form-action 'self'`, X-Frame-Options, nosniff, Referrer-Policy, HSTS e
> Permissions-Policy (câmera, microfone e GPS só no próprio site). Testado com a regra ligada: 0 bloqueios em todas as telas
> (demonstração) e na tela de login real. Ainda permite `'unsafe-inline'`/`'unsafe-eval'` (exigência do pacote atual; ver P1-01). Não vale no artifact.
- **Problema:** nem `netlify.toml` nem `deploy/netlify/netlify.toml` têm `[[headers]]`; não há `_headers` em `front/`;
  o template não tem CSP. Um `_headers` existe só na branch `versao31`.
- **Evidência:** `netlify.toml` (raiz) [confirmado nesta leitura: só `[build]` e `[[redirects]]`];
  `front/extraido/template.html:3-4`; commit `29c9283` (branch `versao31`); Auditoria 05 M1.
- **Impacto:** qualquer falha de injeção (como P0-02) consegue roubar o login guardado no navegador. O sistema pode
  ser aberto dentro de outro site para enganar o usuário (clickjacking).
- **Afeta:** `netlify.toml` ou novo `front/_headers`; possivelmente `template.html` (scripts inline precisam de hash).
- **Dependências:** P0-06 (sem o unpkg, a CSP fica mais simples). Liberar `geolocation` só para a anamnese (`/a`).
  O artifact do claude.ai não usa esses cabeçalhos [inferido].
- **Risco da mudança:** **médio-alto**: CSP errada deixa a tela em branco (o pacote usa scripts inline e `data:`).
  Começar com `Content-Security-Policy-Report-Only`.
- **Teste:** publicar em prévia do Netlify (deploy preview), abrir todas as telas, a anamnese pública e o envio de
  documentos, sem erros de CSP no console; `curl -I https://<prévia>` mostra `X-Frame-Options`/`frame-ancestors`,
  `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`; tentar abrir o site num `<iframe>` → bloqueado.
- **Esforço:** M (pela calibragem da CSP).

### P0-06 — Ícones Lucide baixados do unpkg sem verificação de integridade (SRI)
> ✅ **Feito em 2026-10-09:** `integrity` (sha384 do pacote oficial do npm) + `crossorigin` no script do Lucide (`7bf0`).
> Testado: arquivo verdadeiro carrega; arquivo alterado é recusado. Pendente opcional: embutir o Lucide para não depender do unpkg.
- **Problema:** o Design System injeta `https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js` sem `integrity`, em
  todas as telas, inclusive as públicas.
- **Evidência:** `7bf0:513-528` (`LUCIDE_SRC`); Auditoria 05 M2; Auditoria 04 §4.16 e L2.
- **Impacto:** se o unpkg (ou o caminho até ele) for adulterado, roda código de terceiros com acesso a tudo; se cair,
  o sistema fica sem ícones.
- **Afeta:** `front/extraido/7bf00496…js`, `template.html`/manifesto do pacote, `front/index.html`.
- **Dependências:** nenhuma. Facilita P0-05.
- **Risco da mudança:** baixo-médio. O `rebundle.py` não suporta mudar o `template.html` (`docs/frontend.md` §8): embutir
  o Lucide no pacote pode exigir ajuste da ferramenta; a alternativa mínima é pôr `integrity` + `crossorigin`.
- **Teste:** no teste headless (`docs/frontend.md` §9) os ícones aparecem; com o unpkg bloqueado (caso embutido) os ícones
  continuam; com hash errado proposital o navegador recusa o script.
- **Esforço:** P.

### P0-07 — Envio público de documentos e RPCs públicas sem limite de tipo, tamanho e quantidade
> ✅ **Parte feita em 2026-10-09:** `registrar_documento_link` só registra arquivo que existe no Storage, usa tamanho e tipo do
> próprio Storage, não duplica e aceita até 30 arquivos por link; respostas de anamnese até 10 mil caracteres (rascunho já tinha
> limite de 200 KB). Testado 6/6. ✅ **Concluído (tarde):** pelo link só entram PDF, JPG, PNG, HEIC/HEIF, WEBP e GIF (SVG/HTML/EXE recusados,
> testado como anon) e no máximo 40 arquivos brutos por link (`link_documentos_envio_permitido`); a tela avisa "Tipo não aceito".
- **Problema:** o bucket `prontuario` aceita qualquer tipo de arquivo (`allowed_mime_types = null`), até 50 MB, sem
  limite de quantidade por link; `registrar_documento_link` aceita nome/mime/tamanho livres e não confere se o arquivo
  existe; `responder_anamnese` não limita tamanho; `salvar_rascunho_anamnese` não limita número de chamadas.
- **Evidência:** Auditoria 05 M5 (consulta `storage.buckets`, policy `salute_prontuario_link_paciente`); Auditoria 04 §4.13
  (arquivo órfão quando o registro falha) [inferido].
- **Impacto:** alguém com o link enche o armazenamento (custo), coloca arquivo perigoso (HTML/SVG) dentro do prontuário
  ou "lixo" na ficha do paciente.
- **Afeta:** bucket `prontuario` (config), policy `salute_prontuario_link_paciente`, funções `registrar_documento_link`,
  `responder_anamnese`, `salvar_rascunho_anamnese`, `link_documentos_publico` (nova migration); `c00b.js`
  (`PaginaEnvioDocs`, mensagem de erro ao paciente).
- **Dependências:** P0-02 (mesma função `responder_anamnese`; fazer na mesma migration).
- **Risco da mudança:** médio. Limitar a `image/*` e PDF pode barrar formatos usados hoje (ex.: HEIC do iPhone) —
  decidir a lista com o fundador. O limite do bucket vale também para uploads da equipe.
- **Teste:** no ambiente de teste: enviar PDF e foto pelo link → funciona; enviar `.html`/`.svg`/`.exe` → recusado;
  enviar o arquivo N+1 acima da cota do link → recusado; chamar `registrar_documento_link` com caminho inexistente →
  recusado; `responder_anamnese` com resposta gigante → recusado.
- **Esforço:** M.

### P0-08 — `pg_net` (HTTP saindo do banco) ainda executável por anon/authenticated
> **Decisão técnica 2026-10-09 (tarde):** manter o `pg_net`. Ele é o meio de o banco acordar o n8n (`ia_despertar`, usado pela camada
> `n8n_*` e pelo cron). Só service_role chama `ia_despertar`; as URLs ficam em `ia_plataforma_config` (sem acesso de usuário). Risco aceito.
> **Conferido em 2026-10-09:** o schema `net` e as funções são do `supabase_admin`; o usuário das migrations não consegue revogar.
> Única função `public` que usa `net.http_*`: `ia_despertar` (outra implementação, só service_role). Caminho de ataque hoje: nenhum
> confirmado. Correção: desligar a extensão no painel (Database › Extensions) **depois** de decidir o P0-12, ou pedir ao suporte.
- **Problema:** a migration diz que fechou, mas o `revoke` feito pelo `postgres` não teve efeito (objetos do
  `supabase_admin`); `net.http_post`/`http_get` seguem executáveis por `anon` e `authenticated`. Respostas de
  diagnóstico ficam guardadas em `net._http_response`.
- **Evidência:** `supabase/migrations/20261009050000_pg_net_diagnostico.sql` [confirmado nesta leitura];
  `has_function_privilege` = true (Auditoria 05 M4); advisor "Extension pg_net in public"; Auditoria 04 L9.
  Obs.: `docs/database.md` §8 e `docs/integrations.md` já foram corrigidos (diziam "fechado"). Exposição do schema `net` pela API
  REST: **[não confirmado]**.
- **Impacto:** hoje não há caminho de ataque confirmado, mas se o schema `net` for exposto ou alguma função passar a
  usá-lo, o banco vira ponte para chamar qualquer endereço (SSRF).
- **Afeta:** extensão `pg_net`, schema `net`, a migration de diagnóstico.
- **Dependências:** decidir se o diagnóstico ainda é usado. Se P2-05 (rotinas) for usar `pg_net`, planejar junto.
- **Risco da mudança:** baixo. Remover a extensão não afeta o front (nenhuma função `public` usa `net.http_*`).
- **Teste:** `select has_function_privilege('anon','net.http_get(text,jsonb,jsonb,integer)','execute')` → falso (ou
  extensão ausente); advisor de segurança sem o aviso; a Renata continua funcionando.
- **Esforço:** P (pode exigir o painel ou o suporte Supabase).

### P0-09 — Proteção contra senha vazada desligada
- **Problema:** o Auth aceita senhas que já vazaram na internet.
- **Evidência:** advisor `auth_leaked_password_protection` (Auditoria 05 M6; Auditoria 02 S7).
- **Impacto:** contas de clínica (com dados de pacientes) ficam mais fáceis de invadir por senha repetida.
- **Afeta:** painel Supabase → Authentication → Password security.
- **Dependências:** nenhuma. Pode exigir plano pago do Supabase **[não confirmado]**.
- **Risco da mudança:** baixo (só afeta novas senhas/trocas).
- **Teste:** tentar cadastrar com uma senha conhecida como vazada (ex.: `password123`) → recusada; advisor sem o aviso.
- **Esforço:** P.

### P0-10 — WhatsApp mostra "enviado" sem enviar (e a Renata diz "Enviei")
> ✅ **Feito em 2026-10-09 (parte honesta):** pendente aparece com relógio "Aguardando envio" e falha com "Não enviada" (`TICK`/`WaTicks`);
> a Renata diz que a mensagem ficou aguardando envio e mostra o link da anamnese para copiar; "Conectar WhatsApp" grava
> `conectando` e avisa que o envio automático ainda não está ligado. QR de desenho trocado por aviso "integração em construção" (`d476`).
- **Classificação:** P0 para a **parte honesta da tela** (pequena e urgente: a clínica toma decisões achando que o
  paciente recebeu). A integração real é P2-01 a P2-04.
- **Problema:** mensagens só são gravadas como `pendente`; o mapa `TICK` exibe `pendente` **e `falhou`** como "enviado";
  a Renata responde "Pronto! Enviei… no WhatsApp"; "Conectar WhatsApp" grava "conectado" sem conexão; o QR é desenho
  (`FakeQR`); a URL de webhook aponta para a função `whatsapp`, que não existe; o diálogo de agendamento promete
  "o paciente recebe a confirmação automaticamente".
- **Evidência:** `c005.js:64-70` (`TICK`) [confirmado nesta leitura]; `1b7a:8160-8196`, `:8210-8235`; `c007.js:592-612`;
  `d476` L12:264587 (`FakeQR`); Auditoria 04 §4.2–4.3; Auditoria 03 §7 (promessa de confirmação). Banco: 2 mensagens
  pendentes paradas, 0 instâncias conectadas.
- **Impacto:** a equipe acha que o paciente recebeu a anamnese, a confirmação ou a mensagem, e ele não recebeu. Pode
  gerar falta em consulta e paciente sem atendimento.
- **Afeta:** `c005.js` (`TICK`, rótulos), `1b7a` (textos das ferramentas `propor_envio_anamnese`/`propor_mensagem_paciente`),
  `c007.js` + `d476` (tela Integrações: aviso "em breve"/esconder QR e webhook), diálogo de novo agendamento.
- **Dependências:** nenhuma.
- **Risco da mudança:** baixo (só texto e ícones). Atenção ao arquivo minificado `d476`.
- **Teste:** enviar mensagem em ambiente de teste → aparece "pendente (não enviado)"; Renata ao propor envio diz que a
  mensagem ficou pendente e mostra o link para copiar; tela Integrações não mostra QR falso nem "conectado".
- **Esforço:** P.

### P0-11 — Banco não pode ser reconstruído a partir do repositório; backup não verificado
- **Problema:** as 41 migrations iniciais (estrutura base `salute02_*`, `auto_confirm…`, `mock_*`, `create_ia_config`)
  existem só no banco. Não foi verificado se há backup diário/PITR no projeto Supabase.
- **Evidência:** `docs/database.md` §9 (57 registradas no banco, 15 arquivos no repo na data do doc; hoje há 16, com
  `20261009020913_feriados_nacionais.sql`); Auditoria 02 §10 item 4. Backup/PITR: **[não confirmado]**.
- **Impacto:** se o banco for apagado ou corrompido, ou se for preciso criar um ambiente de teste, não há como recriar a
  estrutura a partir do código. Dados de pacientes dependem só do backup do Supabase, que não foi conferido.
- **Afeta:** `supabase/migrations/`, projeto `gbhsslyoybqjvjznlave` (configuração de backup).
- **Dependências:** base para P1-05 (testes num banco de teste) e P1-10 (alinhar nomes).
- **Risco da mudança:** baixo se for só **extrair** (ex.: `supabase db dump --schema-only` / leitura das migrations
  registradas) para arquivos, sem reaplicar nada em produção. Não incluir dados de pacientes no repositório (ele é público).
- **Teste:** criar um projeto/branch Supabase vazio de teste, aplicar todas as migrations do repositório em ordem, e
  comparar o catálogo (tabelas, policies, funções, buckets) com produção — diferença zero. Conferir no painel que o
  backup existe e fazer um teste de restauração em projeto separado.
- **Esforço:** M.

---

## P1 — Arquitetura e manutenibilidade

### P1-01 — Front sem código-fonte: só o pacote exportado do Claude Design
- **Problema:** o sistema existe como `front/index.html` (manifesto com arquivos em base64). `front/extraido/` é cópia de
  leitura gerada por `tools/unbundle.py`. Não há projeto com bundler, `package.json` nem build reprodutível.
- **Evidência:** `docs/architecture.md` §7; `docs/frontend.md` §1 e §8; Auditoria 01 R1.
- **Impacto:** toda mudança passa por "desempacotar e reempacotar"; não dá para usar ferramentas normais (lint, testes,
  checagem de dependências, divisão do código).
- **Afeta:** `front/`, `tools/unbundle.py`, `tools/rebundle.py`, processo de publicação.
- **Dependências:** P1-05 (testes de fumaça antes de migrar); P1-02, P1-03 e P1-04 ficam mais fáceis depois disto.
- **Risco da mudança:** **alto** se feito de uma vez. Fazer em etapas: primeiro tratar `front/extraido/` como fonte oficial
  com um script de build que gera o mesmo `index.html` (byte a byte), depois evoluir.
- **Teste:** o build novo gera um `index.html` que passa no teste headless e nos testes de P1-05; comparação visual das
  telas principais antes/depois.
- **Esforço:** G.

### P1-02 — Arquivo de telas `d47643ae…js` minificado (669 KB, 11 linhas)
- **Problema:** Pacientes, Agenda, Gestão e Configurações ficam num arquivo minificado, com ~207 KB de imagens base64.
- **Evidência:** `docs/frontend.md` §1.1 item 12; Auditoria 01 R1/R17; Auditoria 03 L7.
- **Impacto:** difícil revisar, difícil corrigir sem quebrar; citações só por "linha:caractere".
- **Afeta:** `front/extraido/d47643ae…js`.
- **Dependências:** P1-01 e P1-05.
- **Risco da mudança:** médio-alto (formatar é seguro; dividir em arquivos mexe na ordem de scripts — ver P1-04).
- **Teste:** depois de formatar (`prettier`) e reempacotar, o teste headless não mostra erros e as telas ficam iguais.
- **Esforço:** M (formatar e separar imagens) a G (dividir por tela).

### P1-03 — React em versão de desenvolvimento e pacote pesado (~3,6 MB)
- **Problema:** React e ReactDOM 18.3.1 `development` em produção; imagens base64 dentro do JS; sem divisão por tela.
- **Evidência:** `709b623d…js`, `7dd7e122…js` (`*.development.js`); Auditoria 05 B2; Auditoria 01 R9/R17;
  `docs/architecture.md` §8 item 4.
- **Impacto:** sistema mais lento, principalmente no celular; mensagens internas detalhadas expostas.
- **Afeta:** `template.html`/manifesto (troca dos dois arquivos de React), `d476` (imagens).
- **Dependências:** `rebundle.py` não troca arquivos do template (`docs/frontend.md` §8) → ajustar a ferramenta ou fazer
  dentro de P1-01. SRI do React precisa ser recalculado.
- **Risco da mudança:** médio: a versão de produção esconde avisos e pode revelar erros que hoje passam despercebidos.
- **Teste:** teste headless sem erros; medir tempo de carga (Lighthouse) antes/depois num celular simulado.
- **Esforço:** P (troca do React) + M (imagens fora do JS).

### P1-04 — Módulos ligados por variáveis globais em `window` e pela ordem dos scripts
- **Problema:** cada arquivo pendura exports em `window`; a ordem dos 23 scripts importa; o Design System define nomes
  iguais aos do app e tenta montar outro `App` no `#root` (falha em silêncio); `CARGAS.catalogos` é remendado em 4
  arquivos; serviços dependem de stores criados nas telas; globais com nomes genéricos (`B`, `el`, `bg`…).
- **Evidência:** `docs/frontend.md` §1; Auditoria 01 R10/R11; Auditoria 03 L2, L4, L5, L13; `7bf0` L3313.
- **Impacto:** trocar a ordem ou adicionar um script novo pode quebrar telas sem nenhum erro visível; dados fictícios
  podem reaparecer.
- **Afeta:** todos os arquivos de `front/extraido/`, `template.html`.
- **Dependências:** P1-01, P1-05.
- **Risco da mudança:** alto; fazer por módulo, com testes.
- **Teste:** testes de fumaça (P1-05) em cada passo; checar `window.SaluteProjetoDesigner_8b4683.__errors` vazio.
- **Esforço:** G.

### P1-05 — Testes automatizados quase inexistentes e sem CI
> ✅ **Primeira parte feita em 2026-10-09:** `.github/workflows/verificar.yml` (sintaxe de todos os scripts, `index.html` em dia
> com `front/extraido`, testes da `renata`, busca de segredos com `tools/verificar_segredos.py`). Falta: testes de tela e de RLS no CI.
- **Problema:** o único teste é `supabase/functions/renata/testes/groq.test.mts` (tradução Groq). Não há testes de RLS,
  de RPCs públicas, nem de telas; o teste headless é manual (`docs/frontend.md` §9). Não há CI no GitHub.
- **Evidência:** listagem de `supabase/functions/renata/testes/` e do repositório [confirmado nesta leitura]; Auditoria 02
  §10 item 8 (teste de RLS com dois usuários não executado).
- **Impacto:** qualquer correção (inclusive as P0) pode quebrar algo sem ninguém perceber até o cliente reclamar.
- **Afeta:** novo diretório de testes, `.github/workflows/` (novo), banco de teste.
- **Dependências:** P0-11 (banco de teste reproduzível) para testes de RLS. Testes de front em modo demonstração não
  dependem de nada.
- **Risco da mudança:** baixo (não mexe em produção). Regra: nunca rodar teste automático contra o banco de produção.
- **Teste:** a própria suíte: (1) fumaça do front em demo (abre, sem erro, `window.Z` presente); (2) RLS: usuário da
  clínica A não lê dados da clínica B; anon não lê tabela nenhuma; (3) RPCs públicas com token inválido/vencido;
  (4) função `renata` (limites de P0-03). CI roda a cada PR.
- **Esforço:** M (primeira versão) e contínuo.

### P1-06 — Renata dentro do artifact do claude.ai usa `window.claude` antes do servidor
- **Problema:** no artifact, a Renata manda regras + resumo da clínica + mensagens para a IA da conta claude.ai de quem
  está vendo, mesmo no modo conectado; ignora Agente de IA, limite mensal e consumo.
- **Evidência:** `1b7a:2443` e `:2646` [confirmado nesta leitura]; `1b7a:3283-3325`, `:3364-3370`; Auditoria 04 §4.7 e L1;
  Auditoria 03 L10. Se clínicas reais usam o artifact: **[não confirmado]**.
- **Impacto:** dados de pacientes vão para outro lugar, sem controle da Salute; regras da clínica não valem.
- **Afeta:** `1b7a` (`rnGetSample`, `_rnAnswerCore`).
- **Dependências:** P0-04 (política de provedor). Decisão: o artifact é só vitrine/demonstração ou é usado por clientes?
- **Risco da mudança:** baixo (desligar o caminho `window.claude` quando `SB_ON` for verdadeiro).
- **Teste:** abrir o artifact logado → as perguntas aparecem em `renata_consumo` (passaram pela função); no modo demo do
  artifact, comportamento decidido pelo fundador.
- **Esforço:** P.

### P1-07 — Restos de Anthropic/Gemini e chamadas diretas do navegador no modo demonstração
- **Problema:** no modo demo, a chave digitada vai para `localStorage` e é usada direto do navegador
  (`anthropic-dangerous-direct-browser-access`), mas a tela agora pede chave **Groq** (que seria mandada à Anthropic);
  segredo `anthropic` de 1 clínica ainda no Vault; enum `provedor_integracao` com `google` sem uso; front ainda manda
  `model: 'claude-…'`; `salvar_segredo` ainda trata `google`/`anthropic` como IA configurada.
- **Evidência:** `1b7a:2719,2793,3088`, `:1897-1906`, `:4347-4352`; Auditoria 05 B13; Auditoria 04 §4.8 e L6;
  migrations `20261009030000`/`030100` (Gemini).
- **Impacto:** confusão, código morto que pode voltar a ser usado por engano, chave de terceiro guardada sem uso.
- **Afeta:** `1b7a`, `c00a.js`, Vault (segredo `anthropic`), enum `provedor_integracao`, `salvar_segredo`.
- **Dependências:** P1-15 (limpeza de legado no banco). Apagar segredo do Vault: só com aprovação.
- **Risco da mudança:** baixo-médio (mexe no modo demo; testar que a demonstração continua abrindo).
- **Teste:** busca no pacote por `api.anthropic.com` → nada; modo demo abre e a Renata responde com `renataLocal`;
  modo conectado continua usando a função `renata`.
- **Esforço:** P.

### P1-08 — Se o `config.js` falhar, o sistema abre em demonstração sem login
> ✅ **Feito em 2026-10-09:** em `saluteia.site` sem Supabase configurado aparece "O sistema não conseguiu carregar" com botão Recarregar
> (`PortaSupabase`, `c001`); em outros endereços (artifact) a demonstração continua. Testado nos dois casos. Falta: `RN_CLINICA` fictícia no início do modo real.
- **Problema:** sem configuração válida, `PortaSupabase` libera o `App` com dados fictícios em vez de mostrar erro; no
  início do modo real, `RN_CLINICA` começa com os dados da clínica fictícia "Bella Forma".
- **Evidência:** `c001` L76-77 (`SB_ON`, `SB_MOTIVO`); `docs/architecture.md` §3; Auditoria 01 R8; Auditoria 03 §7
  (RN_CLINICA: [inferido]).
- **Impacto:** uma falha de publicação faz a clínica ver dados falsos e achar que perdeu os dela; a Renata pode
  responder com dados da clínica fictícia.
- **Afeta:** `c001` (`PortaSupabase`), `c00a` (`rnPreencherClinica`), `1b7a`.
- **Dependências:** decidir se o modo demo continua no mesmo pacote de produção (ligado a P1-07).
- **Risco da mudança:** médio: o artifact de demonstração depende desse modo.
- **Teste:** publicar em prévia com `config.js` vazio no domínio de produção → tela de erro clara; com `config.js` certo →
  login normal; Renata antes de `catalogos` carregar não usa "Bella Forma".
- **Esforço:** P.

### P1-09 — Publicação: duas pastas, uma desatualizada; ligação Netlify ↔ Git não confirmada
- **Problema:** `deploy/netlify/index.html` é diferente e mais velho que `front/index.html`; `deploy/netlify/` tem
  `netlify.toml` e `_redirects` próprios. A ligação do site à branch `producao` e a versão do artifact não foram vistas.
- **Evidência:** listagem de `deploy/netlify/` (arquivos de 03:06) [confirmado nesta leitura]; Auditoria 05 B12;
  Auditoria 04 L7/L8; `docs/architecture.md` §6.
- **Impacto:** alguém pode arrastar a pasta errada e publicar uma versão velha (sem correções de segurança).
- **Afeta:** `deploy/netlify/`, `netlify.toml`, `README.md`, painel Netlify.
- **Dependências:** nenhuma.
- **Risco da mudança:** baixo (remover/arquivar a pasta antiga, com aprovação).
- **Teste:** só existe uma pasta de publicação; no painel do Netlify, o site mostra "Linked to GitHub, branch producao";
  o hash do `index.html` publicado = hash do `front/index.html` da `producao`.
- **Esforço:** P.

### P1-10 — Migrations com número e nome diferentes entre repositório e banco; edge function fora do Git
- **Problema:** 8 arquivos do repositório têm o mesmo conteúdo mas número/nome diferentes do registrado no banco
  (ex.: `20261009020200_medios_s3_a_s6` = três migrations no banco). A ordem pelos nomes não bate com a ordem real.
  A migration nova `20261009020913_feriados_nacionais.sql` (commit `46363ee`) não está em `docs/database.md`; ela foi
  aplicada no banco em 2026-10-09 (versão registrada `20261009020913`, mesmo número do arquivo). [confirmado] A função `renata` é publicada pelo conector/CLI, sem verificação automática de que
  o publicado é igual ao repositório.
- **Evidência:** `docs/database.md` §9 (tabela de divergências); `docs/architecture.md` §6 ("banco e função não entram
  pelo Git"); listagem de `supabase/migrations/` [confirmado nesta leitura].
- **Impacto:** a CLI do Supabase pode tentar reaplicar migrations ou recusar o histórico; fica difícil saber o que está
  em produção.
- **Afeta:** `supabase/migrations/`, histórico `supabase_migrations.schema_migrations`, processo de deploy.
- **Dependências:** P0-11 (trazer as 41 iniciais) — fazer junto. **Decisão do fundador** (renomear arquivos ou ajustar
  o histórico do banco).
- **Risco da mudança:** médio: mexer no histórico de migrations do banco errado pode fazer a CLI reaplicar SQL.
  Preferir renomear os arquivos do repositório para os números do banco.
- **Teste:** `supabase migration list` mostra local = remoto, sem pendências; aplicar tudo num banco de teste (P0-11)
  dá o mesmo catálogo; checklist de deploy da função compara o código baixado com o do repositório.
- **Esforço:** M.

### P1-11 — Regras de negócio só no front e gravações fora dos serviços
- **Problema:** agenda em blocos de 30 minutos, campos obrigatórios e várias regras são validados só na tela; a Renata
  grava agendamentos direto (`DB.upd('agendamentos')`) fora do `AgSvc.editar`; procedimentos, produtos, comparações e
  anamnese presencial também gravam direto.
- **Evidência:** `docs/architecture.md` §8 itens 6 e 7; `1b7a` L7602 e L7728; Auditoria 03 L6.
- **Impacto:** quem grava pela API (ou por um caminho novo) escapa das regras; a mesma regra em dois lugares diverge.
- **Afeta:** `1b7a`, `d476`, `c003.js` (`AgSvc`), funções/constraints no banco (nova migration).
- **Dependências:** P1-05 (testes).
- **Risco da mudança:** médio: regra nova no banco pode recusar dados antigos fora do padrão (conferir antes).
- **Teste:** inserir agendamento às 10:15 pela API num banco de teste → recusado; a Renata remarca usando `AgSvc.editar`
  e o histórico/aviso aparecem igual à tela.
- **Esforço:** M.

### P1-12 — Brechas restantes de RLS e funções (achados baixos ainda abertos)
> ✅ **Parte feita em 2026-10-09:** B5 (nenhuma função de gatilho executável por anon/authenticated; `search_path` em
> `set_ia_config_atualizado_em`) e S8 (feriados: leitura para membros ativos, gravação só gestão; testado dono/estranho).
> **Falta:** B6 (`usuarios_clinicas`/convites), S9 (`clinicas`), S11 (bucket `conteudos`), S12 (saldo do estoque): mexem em telas
> que hoje funcionam e precisam de teste com cada papel.
- **Problema:** **B6** — a policy de UPDATE `usuarios_clinicas_editar` deixa o gestor trocar `usuario_id`/`status_convite`
  e ligar qualquer usuário; `convidar_membro` liga sem aceite quem já tem conta. **S8** — `feriados` com papel `public`
  e sem checar `ativo` (agora a agenda e o painel usam feriados: `feriados_do_mes`, commit `46363ee`). **S9** — quem tem
  `perfil.cadastro` muda `ativo`/`excluido_em`/`slug` da clínica. **S11** — bucket `conteudos` legível por qualquer
  logado. **S12** — editar movimentação de estoque não recalcula saldo. **B5** — funções de gatilho executáveis por anon
  e `set_ia_config_atualizado_em` sem `search_path`.
- **Evidência:** Auditoria 05 B5, B6, B7; Auditoria 02 §8; `supabase/migrations/20261009020913_feriados_nacionais.sql`.
- **Impacto:** ataques "de dentro" da clínica (gestor mal-intencionado), saldo de estoque errado, e pequenas portas
  abertas que somam risco.
- **Afeta:** policies de `usuarios_clinicas`, `feriados`, `clinicas`, `movimentacoes_estoque`, `storage.objects`
  (`conteudos`); funções `convidar_membro`, `criar_perfil_usuario`, `set_ia_config_atualizado_em`.
- **Dependências:** P1-05 (testes de RLS); P0-01 (convites).
- **Risco da mudança:** médio: mudar RLS pode bloquear telas que hoje funcionam; testar com cada papel.
- **Teste:** com usuários de teste de cada papel: gestor não consegue ligar usuário por UPDATE; convidado com conta
  precisa aceitar; `perfil.cadastro` não muda `slug`; UPDATE de quantidade em movimentação é recusado; advisors sem
  `anon_security_definer_function_executable` para funções de gatilho.
- **Esforço:** M.

### P1-13 — Pequenos endurecimentos no front e na função `renata`
> ✅ **Parte do front feita em 2026-10-09:** B3 (`noopener` e link do mapa só com `https://`) e B4 (CSV do extrato com proteção
> contra fórmula, valores negativos preservados). ✅ **B9 e B10 feitos (tarde, função `renata` v9):** registros só com o código do erro do
> provedor e o navegador recebe frase em português com o mesmo status. **B1 (CORS `*`) mantido:** a função exige login (JWT) e a origem
> do artifact não é conhecida; restringir pode quebrar a Renata no artifact.
- **Problema:** **B1** CORS `*` na `renata`; **B3** `window.open` sem `noopener` e link do Google Maps sem validar
  `https://` (pode ser `javascript:`); **B4** CSV do extrato sem proteção contra fórmula; **B9** logs com trecho de
  resposta dos provedores; **B10** erro do Groq repassado cru ao navegador.
- **Evidência:** `index.ts:23-27`, `:40`, `:158`; `groq.ts:196`; `d476` 11:118073, 12:27259, 11:77077 (Auditoria 05).
- **Impacto:** riscos baixos isolados (um colega pode cadastrar um link "envenenado"; planilha exportada pode executar
  fórmula no Excel).
- **Afeta:** `supabase/functions/renata/index.ts`, `groq.ts`, `d476`.
- **Dependências:** nenhuma.
- **Risco da mudança:** baixo. CORS restrito precisa incluir `https://saluteia.site` e a origem do artifact.
- **Teste:** chamada à função a partir de outra origem → recusada pelo navegador; link `javascript:alert(1)` no endereço
  da clínica → não abre; exportar CSV com descrição `=1+1` → aparece como texto.
- **Esforço:** P.

### P1-14 — LGPD operacional: exclusão de dados, GPS e texto da declaração
- **Problema:** **S14** — quase nenhuma tabela tem DELETE; não há rotina de exclusão/anonimização para pedido do
  titular. **B8** — o texto da declaração da assinatura vem do navegador do paciente; o GPS é gravado com 6 casas
  decimais (alta precisão).
- **Evidência:** Auditoria 05 B7 (S14) e B8; `responder_anamnese`; `c00b.js:78-118`; migration `20261009013134`.
- **Impacto:** a clínica não consegue atender um pedido de exclusão da LGPD sem ajuda técnica; a validade da assinatura
  pode ser questionada; guarda-se localização mais precisa que o necessário.
- **Afeta:** nova RPC/rotina de anonimização (só equipe Salute/dono), `responder_anamnese`, `anamnese_local_limpo`,
  política de privacidade.
- **Dependências:** P0-04 (mesma revisão jurídica).
- **Risco da mudança:** **alto** para a rotina de exclusão (apagar dado errado é irreversível): exigir confirmação dupla,
  registro em `auditoria` e testar só em banco de teste.
- **Teste:** em banco de teste, anonimizar paciente X → nome/CPF/telefone somem, consultas e financeiro ficam sem
  identificação, outros pacientes intactos; assinatura nova grava a declaração do modelo; GPS com 3 casas.
- **Esforço:** M.

### P1-15 — Dados de demonstração no banco de produção e legado sem uso
- **Problema:** 16 migrations `mock_*` inseriram dados fictícios no banco de produção; tabelas `ia_config` e
  `canais_conectados` vazias e sem uso; buckets `pacientes` e `comprovantes` sem uso; colunas de
  `renata_configuracoes` que a função não lê; `criar_perfil_usuario` duplicando `novo_usuario`.
- **Evidência:** `docs/database.md` §9 e §10; Auditoria 02 §9 e §10 item 5; Auditoria 04 L6.
- **Impacto:** dados falsos misturados com reais (relatórios errados); legado confunde quem mexe no sistema.
- **Afeta:** tabelas/buckets citados; dados `mock_*` (identificar pela origem).
- **Dependências:** P0-11 (backup e banco de teste antes de apagar qualquer coisa); decisão do fundador sobre quais
  dados são de demonstração.
- **Risco da mudança:** **alto** para apagar dados (irreversível): fazer em banco de teste, com backup, e por exclusão
  lógica primeiro.
- **Teste:** lista dos registros a remover aprovada pelo fundador; depois da limpeza, painel e telas da clínica real
  continuam com os números esperados.
- **Esforço:** M.

### P1-16 — SMTP e "Redirect URLs" do Supabase Auth não verificados
- **Problema:** não se sabe se os e-mails de cadastro, senha e convite saem por SMTP próprio ou pelo servidor padrão
  do Supabase (limite baixo por hora), nem se `saluteia.site` e o domínio do artifact estão nas Redirect URLs.
- **Evidência:** Auditoria 04 §4.9 e L3 **[não confirmado]**; `c001:162-170` (endereço de volta).
- **Impacto:** convites e "esqueci a senha" podem não chegar quando houver mais clientes; com P0-01 ligado, cadastro
  passa a depender desse e-mail.
- **Afeta:** painel Supabase → Authentication (SMTP, URL Configuration).
- **Dependências:** P0-01. Solução definitiva em P2-07.
- **Risco da mudança:** baixo.
- **Teste:** disparar "esqueci a senha" e um convite de teste → e-mail chega, link abre o `saluteia.site` e funciona.
- **Esforço:** P.

### P1-17 — "Verificação em 2 etapas" é só um botão
- **Problema:** a tela Segurança grava `perfis_usuario.dois_fatores_ativo`, mas não existe `SB.auth.mfa` nenhum.
- **Evidência:** `30c3fd71…js:367` e `c008.js:275` [confirmado nesta leitura]; Auditoria 05 M7.
- **Impacto:** o usuário acha que está protegido por um segundo fator e não está.
- **Afeta:** `30c3fd71…js`, `c008.js`.
- **Dependências:** nenhuma (curto prazo: esconder ou marcar "em breve"). MFA real em P2-08.
- **Risco da mudança:** baixo.
- **Teste:** a opção não aparece (ou aparece como "em breve") e nenhum usuário fica com a impressão de 2FA ligado.
- **Esforço:** P.

### P1-18 — Documentação desatualizada
- **Problema:** `docs/conexoes.md` e `docs/supabase.md` (~115 tabelas, função com Anthropic) estão velhos;
  `database.md` conta 15 migrations (hoje são 16) e não cita os feriados; auditorias 01–03 descrevem a função
  `renata` antiga. (Já resolvido em 2026-10-09: o `pg_net` em `database.md`/`integrations.md`, o `README.md` e o `CLAUDE.md`.)
- **Evidência:** `docs/architecture.md` §8 item 11; Auditoria 05 M4; `docs/security.md` §3; listagem de `supabase/migrations/`.
- **Impacto:** quem (pessoa ou agente) ler os documentos velhos pode tomar decisões erradas.
- **Afeta:** `docs/conexoes.md`, `docs/supabase.md`, `docs/database.md`, `docs/integrations.md`, `docs/auditoria/01-03` (nota de "desatualizado").
- **Dependências:** nenhuma; atualizar de novo ao fim de cada onda.
- **Risco da mudança:** nenhum para o sistema.
- **Teste:** revisão do fundador; nenhum documento contradiz `docs/auditoria/05` e este backlog.
- **Esforço:** P.

### P1-19 — Ambiente de desenvolvimento e código morto
- **Problema:** `setup/environment-setup.sh` baixa `rtk` "latest" sem checksum e instala `omniroute` sem versão fixa
  (roteia para provedores de IA desconhecidos) (**B11**). Código morto: `MensagensV01`, `PatientsTable`, `ConversaTab`,
  componentes do Design System sem uso; helpers repetidos; tradução EN/ES por fora do React (**L11**).
- **Evidência:** `setup/environment-setup.sh:12-23`; Auditoria 05 B11; Auditoria 03 L3, L11, L12.
- **Impacto:** código ou segredo pode sair por um intermediário desconhecido; código morto aumenta o pacote e a confusão.
- **Afeta:** `setup/environment-setup.sh`, `docs/conexoes.md`, `366b46a2…js`, `25352dc7…js`, `d476`, `7bf0`, `d41989a4…js`.
- **Dependências:** remover código morto depois de P1-05.
- **Risco da mudança:** baixo (setup); médio (remover código no pacote sem testes).
- **Teste:** setup com versão fixa e checksum conferido; pacote sem os componentes mortos passa no teste headless.
- **Esforço:** P (setup) + M (código morto).

---

## P2 — Melhorias e novas funcionalidades

### P2-01 — WhatsApp: escolher provedor e conectar o número de verdade
- **Problema:** não há conexão real (QR falso, status "conectado" sem conexão, função `whatsapp` inexistente).
- **Evidência:** Auditoria 04 §4.3 e §6.1 itens 1 e 5; enum `status_instancia` já prevê `aguardando_qr`, `conectando`, `erro`.
- **Impacto:** a clínica passa a falar com pacientes pelo sistema.
- **Afeta:** `c007.js` (`WaSvc`), `d476` (tela Integrações), `instancias_whatsapp`, Vault (`whatsapp_meta`/`whatsapp_nao_oficial`),
  n8n ou nova edge function.
- **Dependências:** **decisão do fundador**: API oficial (Meta) ou não oficial (Evolution/Z-API); P0-10; P0-04 (LGPD
  também vale para o WhatsApp).
- **Risco da mudança:** médio (provedor externo; número pode ser bloqueado no modo não oficial).
- **Teste:** conectar um número de teste; status passa por `aguardando_qr` → `conectado` só depois da confirmação do provedor.
- **Esforço:** M.

### P2-02 — WhatsApp: receber mensagens (n8n → banco), contrato A da Auditoria 04

> Atualização 2026-10-09: tabelas, filas e funções do lado do banco prontas (`docs/agente-ia.md`). Falta o fluxo no n8n e o provedor.
- **Problema:** nada recebe mensagens nem cria lead quando o número é novo.
- **Evidência:** Auditoria 04 §6.2 (A) e §6.1 item 2; Auditoria 03 (CRM não cria lead).
- **Impacto:** conversas e leads chegam sozinhos ao sistema e aparecem ao vivo (o Realtime e o gatilho
  `mensagem_atualiza_conversa` já existem).
- **Afeta:** n8n (fluxo novo), `conversas`, `mensagens`, `leads`, `anexos_mensagem`, bucket `mensagens`; nova migration com
  **índice único em `mensagens.whatsapp_mensagem_id`** (idempotência).
- **Dependências:** P2-01; segredo de serviço guardado só no n8n (nunca no front); verificação de assinatura do webhook
  (Meta: `X-Hub-Signature-256`).
- **Risco da mudança:** médio (mensagens duplicadas ou na clínica errada se a busca pela instância falhar).
- **Teste:** mandar mensagem de um celular de teste → aparece uma vez na conversa certa; reenviar o mesmo evento → não
  duplica; número novo cria lead em "Novo Lead"; webhook sem assinatura válida → recusado.
- **Esforço:** M.

### P2-03 — WhatsApp: enviar mensagens pendentes e atualizar status (contratos C, D e E)
- **Problema:** mensagens `pendente` nunca saem; não existem `enviada`/`falhou` reais nem motivo de falha.
- **Evidência:** Auditoria 04 §6.1 itens 3 e 4, §6.2 (C, D, E).
- **Impacto:** "enviado", "entregue" e "lido" passam a ser verdade.
- **Afeta:** n8n, `mensagens` (nova coluna de motivo da falha), gatilho/Database Webhook ou rotina, `c005.js` (`TICK`).
- **Dependências:** P2-01, P0-10; mecanismo de disparo (Database Webhook, `pg_net` — ver P0-08 — ou P2-05).
- **Risco da mudança:** médio-alto: reenvio em loop ou envio duplicado ao paciente. Nunca reenviar mensagem que já tem
  `whatsapp_mensagem_id`; no máximo 3 tentativas.
- **Teste:** mensagem enviada pela tela chega ao celular de teste; status muda para entregue/lida; número inválido →
  `falhou` com motivo e aviso na tela; derrubar o n8n → mensagens ficam pendentes e saem quando ele volta, sem duplicar.
- **Esforço:** M.

### P2-04 — WhatsApp: atendimento com IA (contrato B)
- **Problema:** canal `whatsapp` de `agente_ia_regras` já existe, mas não tem consumidor.
- **Evidência:** `supabase/migrations/20261009014745_agente_ia.sql:45-68`; Auditoria 04 §6.1 item 7 e §6.2 (B).
- **Impacto:** a clínica responde leads automaticamente fora do horário, com as regras dela.
- **Afeta:** n8n, `agente_ia`, `conversas.ia_ativa`, `leads.ia_pausada_*`, `mensagens.enviada_por_ia`, provedor de IA.
- **Dependências:** P2-02, P2-03, P0-03 (limites de custo), P0-04 (provedor com contrato).
- **Risco da mudança:** alto (a IA fala direto com o paciente). Começar com resposta sugerida para a equipe aprovar.
- **Teste:** com `ia_ativa = false` a IA não responde; com `true`, responde respeitando "não pode falar"; pausar no CRM
  interrompe; consumo contado.
- **Esforço:** M.

### P2-05 — Rotinas agendadas (confirmação de consulta, lembretes, limpeza)
- **Problema:** não existe `pg_cron` nem rotina externa. A chave "Enviar confirmação por WhatsApp" grava
  `enviar_confirmacao_whatsapp = true`, mas `confirmacao_enviada_em` nunca é preenchido. Links vencidos e arquivos
  órfãos não são limpos.
- **Evidência:** Auditoria 04 §4.2 (confirmação), §4.14 e L5.
- **Impacto:** menos faltas (lembrete), menos lixo no armazenamento.
- **Afeta:** `pg_cron` (instalar) ou n8n agendado; `agendamentos`, `links_envio_documentos`, `anamnese_envios`, Storage.
- **Dependências:** P2-03 para mensagens; decisão `pg_cron` × n8n.
- **Risco da mudança:** médio (rotina errada pode mandar mensagem repetida ou apagar arquivo válido).
- **Teste:** agendamento de teste para amanhã → lembrete enviado uma vez e `confirmacao_enviada_em` preenchido; arquivo
  órfão de teste com mais de N dias → removido; arquivo registrado → mantido.
- **Esforço:** M.

### P2-06 — Entrega automática dos links de anamnese e documentos ao paciente
- **Problema:** hoje o link precisa ser copiado/mostrado pela equipe.
- **Evidência:** Auditoria 04 L10 e §4.12.
- **Impacto:** menos trabalho manual na recepção.
- **Afeta:** `c003.js` (`ProntSvc.enviarAnamnese`, `linkDocumentos`), `1b7a` (Renata), canal escolhido.
- **Dependências:** P2-03 (WhatsApp) ou P2-07 (e-mail).
- **Risco da mudança:** baixo-médio (link enviado para o número errado expõe a anamnese de outra pessoa → confirmar número).
- **Teste:** gerar anamnese para paciente de teste → mensagem chega com o link certo; status do envio aparece na ficha.
- **Esforço:** P a M.

### P2-07 — E-mail transacional próprio
- **Problema:** todo e-mail é do Supabase Auth; não há SMTP/serviço próprio para convites, avisos e recibos.
- **Evidência:** Auditoria 04 §1 item 6, tabela item 19 ("não existe no código").
- **Impacto:** e-mails com a marca da Salute, entregues com mais segurança e sem limite baixo.
- **Afeta:** configuração SMTP do Auth, provedor (ex.: Resend/SES — escolha **não feita**), modelos de e-mail.
- **Dependências:** P1-16.
- **Risco da mudança:** baixo (configurar domínio SPF/DKIM corretamente).
- **Teste:** convite, cadastro e senha chegam na caixa de entrada (não no spam) de Gmail e Outlook.
- **Esforço:** P a M.

### P2-08 — Verificação em 2 etapas real (MFA)
- **Problema:** não há MFA (ver P1-17).
- **Evidência:** Auditoria 05 M7.
- **Impacto:** conta de clínica fica protegida mesmo se a senha vazar.
- **Afeta:** `30c3fd71…js`, `c008.js`, `c001` (login), Supabase Auth MFA (TOTP).
- **Dependências:** P1-17. Opcional: exigir MFA para dono/gestor e equipe Salute (Painel Master).
- **Risco da mudança:** médio (usuário que perde o celular fica sem acesso → definir recuperação).
- **Teste:** ativar TOTP num usuário de teste; login pede o código; código errado bloqueia; desativar funciona.
- **Esforço:** M.

### P2-09 — Cobrança/pagamento ligado ao plano
- **Problema:** `trocar_plano` muda o plano sem pagamento.
- **Evidência:** Auditoria 02 S13; Auditoria 05 A2 (agrava o custo da Renata).
- **Impacto:** receita e limites coerentes com o que o cliente paga.
- **Afeta:** `trocar_plano`, `assinaturas_clinica`, `historico_assinatura`, provedor de pagamento (não escolhido).
- **Dependências:** P0-03 (curto prazo: só a equipe Salute troca plano).
- **Risco da mudança:** médio-alto (dinheiro).
- **Teste:** pagamento aprovado em ambiente de teste muda o plano; recusado não muda.
- **Esforço:** G.

### P2-10 — Funções que a tela promete e não existem
- **Problema:** criar lead pelo CRM, bloqueios de horário, fila de espera com tela, emissão de NFS-e.
  (Editar agendamento **já existe** desde o commit `ad143a6`; a Auditoria 03 está desatualizada nesse ponto.)
- **Evidência:** Auditoria 03 L15; `docs/architecture.md` §8 item 8; `docs/frontend.md` §4.
- **Impacto:** o sistema fica mais completo e para de prometer o que não faz.
- **Afeta:** `366b46a2…js`, `c005.js` (`CrmSvc`), `d476` (Agenda/NF), tabelas `bloqueios_horario`, `fila_espera`, `notas_fiscais`.
- **Dependências:** P1-11 (regras no banco) para agenda.
- **Risco da mudança:** baixo-médio por item.
- **Teste:** por funcionalidade (criar lead aparece no kanban; bloqueio impede agendar no horário).
- **Esforço:** M por funcionalidade (NFS-e: G).

### P2-11 — Telas para módulos que já existem no banco
- **Problema:** tabelas sem tela: tarefas, convênio TISS (guias, faturamento, glosas), orçamentos, retornos programados,
  respostas rápidas, etiquetas, base de conhecimento da Renata.
- **Evidência:** Auditoria 02 §9; `docs/database.md` §3.
- **Impacto:** novas funcionalidades com a estrutura de banco já pronta.
- **Afeta:** novas telas; tabelas citadas.
- **Dependências:** decisão de produto; P1-01/P1-04 deixam isso mais barato.
- **Risco da mudança:** baixo para o que existe hoje.
- **Teste:** por tela, incluindo teste de RLS de cada tabela nova usada.
- **Esforço:** M a G por módulo.

### P2-12 — Desempenho do banco
- **Problema:** advisors apontam ~116 chaves estrangeiras sem índice, ~249 índices nunca usados e policy de `feriados`
  que recalcula `auth.uid()` por linha.
- **Evidência:** Auditoria 05 §6 (advisor de performance); Auditoria 02 §10 item 9.
- **Impacto:** irrelevante com o volume atual; importa quando houver muitas clínicas.
- **Afeta:** índices (nova migration), policy de `feriados`.
- **Dependências:** P1-12 (mexe na mesma policy de `feriados`).
- **Risco da mudança:** baixo (criar índice `concurrently`); apagar índice só depois de medir.
- **Teste:** advisor de performance com menos avisos; tempo das consultas principais (`painel_mes`, agenda) igual ou menor.
- **Esforço:** P a M.

### P2-13 — Tradução EN/ES dentro do React e pacote dividido por tela
- **Problema:** idioma troca textos direto nos nós da página (`TreeWalker` + `MutationObserver`), por fora do React;
  tudo carrega de uma vez.
- **Evidência:** Auditoria 03 L11 (`d41989a4` L684-975); `docs/architecture.md` §8 item 4.
- **Impacto:** textos misturados ao trocar de idioma [inferido]; carregamento mais rápido com divisão.
- **Afeta:** `d41989a4…js`, todas as telas.
- **Dependências:** P1-01, P1-03, P1-04.
- **Risco da mudança:** médio.
- **Teste:** trocar idioma em todas as telas sem texto misturado nem erro do React; carga inicial menor (Lighthouse).
- **Esforço:** G.

---

## Itens que precisam de confirmação antes de executar

| O que conferir | Onde | Itens afetados |
|---|---|---|
| "Confirm email" ligado no Auth | Painel Supabase → Authentication | P0-01 |
| `GROQ_API_KEY` / `ELEVENLABS_API_KEY` preenchidas na função `renata` | Painel Supabase → Edge Functions → Secrets (ver só se existem) | P0-03 |
| Contrato/DPA com Groq e ElevenLabs | Jurídico/comercial | P0-04 |
| Backup diário / PITR ativo | Painel Supabase → Database → Backups | P0-11 |
| Schema `net` exposto na API REST | Painel Supabase → API settings | P0-08 |
| Clínicas reais usam o artifact do claude.ai? | Fundador | P1-06, P1-08 |
| Netlify ligado à branch `producao` | Painel Netlify | P1-09 |
| SMTP e Redirect URLs | Painel Supabase → Authentication | P1-16 |
| Quais dados do banco são de demonstração (`mock_*`) | Fundador + consulta | P1-15 |

## Novo (2026-10-09)

### P0-12 — Duas implementações do Agente de IA no mesmo banco
> ✅ **Resolvido (conferido em 2026-10-09, tarde):** os gatilhos `ia_*` de agenda, conversas e mensagens estão vazios (só `return`).
> A camada ativa é a `n8n_*` sobre as tabelas oficiais; ela reaproveita funções auxiliares `ia_*` (`ia_despertar`, `ia_notificar_equipe`,
> `ia_param`, `ia_tel_*`) e o cron `ia-manutencao`, que acorda o n8n olhando `tarefas_automacao`/`envios_pendentes`. **Não apagar essas peças.**
> **Atualização 2026-10-09 (manhã):** a outra sessão refez a camada como `n8n_*` em cima das tabelas oficiais
> (`agente_ia`, `tarefas_automacao`, `envios_pendentes`...) e declarou a `ia_*` desativada. Ainda ligados: gatilhos
> `tg_agendamentos_ia_*`, `tg_conversas_ia_*`, `tg_mensagens_ia_humana` e o cron `ia-manutencao` (1/min). Testes 38/38
> passam com eles e não há lembrete duplicado (a config `ia_*` está desligada). Falta só a limpeza, com autorização. [confirmado]
- **Problema:** além das tabelas `agente_ia`/`tarefas_automacao`/`envios_pendentes` (desta sessão, com testes), outra sessão
  aplicou `ia_agente_01a..04` (`ia_automacao_config`, `ia_jobs`, `ia_outbox`, ...), fora do repositório. [confirmado]
- **Risco:** lembretes e follow-ups em dobro quando o n8n for ligado; configuração em dois lugares. [inferido]
- **Ação:** o fundador escolhe uma; a outra é desativada por migration versionada antes de construir o n8n.

### P0-13 — Funções `ia_*` abertas para qualquer pessoa (urgente)
> ✅ **Resolvido em 2026-10-09** pela outra sessão: nenhuma das 74 funções `ia_*`/`n8n_*` é executável por anon ou authenticated. [confirmado]
- **Problema:** as funções `ia_*` da segunda implementação são `SECURITY DEFINER`, executáveis por `anon` e `authenticated`
  e não checam a clínica de quem chama. Com a chave pública do site dá para, por exemplo: marcar consulta como paga
  (`ia_confirmar_pagamento`), injetar mensagem falsa em qualquer clínica (`ia_ingerir_evento` com provedor `teste`), mover
  lead (`ia_mover_etapa_interno`), pegar tarefas da fila com o conteúdo das mensagens (`ia_reivindicar_jobs`). [confirmado por privilégio; exploração não testada]
- **Correção pronta (não aplicada, precisa da autorização do fundador porque mexe na outra implementação):**
  para cada função `public.ia_*` com `SECURITY DEFINER`: `revoke execute ... from public, anon, authenticated;`
  `grant execute ... to service_role;`. Gatilhos e chamadas internas continuam funcionando.
- **Alternativa:** se a decisão do P0-12 for apagar a implementação `ia_*`, isto some junto.
