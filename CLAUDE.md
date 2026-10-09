# Salute 2.0 — instruções para agentes

Leia este arquivo inteiro antes de qualquer alteração. Detalhes em `docs/architecture.md`, `docs/frontend.md`,
`docs/database.md`, `docs/integrations.md`, `docs/agente-ia.md`, `docs/security.md`, `docs/backlog.md` e nas auditorias `docs/auditoria/01..05`.
Quando algo aqui não estiver confirmado, está escrito "não confirmado". Não invente arquitetura.
Ao escrever docs, marque afirmações como "confirmado", "inferido" ou "não confirmado".

## Objetivo do sistema

SaaS para clínicas de estética e odontologia (multi-clínica): pacientes, prontuário e anamnese com assinatura,
agenda, financeiro, estoque, CRM de leads com funil, conversas (WhatsApp), painel de indicadores e a assistente
de IA "Renata" (texto e voz), que consulta dados e propõe ações que a equipe confirma. Há dados de saúde, então a LGPD se aplica.

## Alvos (confirmado)

- Banco/Auth/Storage/Edge Functions: **somente** o Supabase "Salute IA novo visual" (`gbhsslyoybqjvjznlave`).
- "Salute CRM" (`pigfhkmtqyatuaudpgyy`) é legado: só leitura.
- Repositório: `kevinrlemann/Salute2.0` (público). É a fonte da verdade do front e das migrations.
- Publicação: branch `producao` → Netlify (site `saluteia.site`, pasta `front/`, ver `netlify.toml`) e o artifact
  https://claude.ai/artifact/WtotK7P4yu9qhf9VWrAqhA. `deploy/netlify/` está desatualizado: não usar.

## Stack (confirmado)

- Front: bundle único exportado do Claude Design (`front/index.html`), React 18.3.1 (build development), JSX já
  compilado por Babel (helpers do regenerator), supabase-js 2.117.2, design system `SaluteProjetoDesigner`,
  ícones Lucide 0.468.0 via unpkg e gerador de QR local. Sem build tool e sem npm no front.
- Back: Supabase (Postgres 17, RLS em todas as tabelas, Auth, Storage, Realtime) + edge function `renata` (Deno).
- IA: Groq (modelos `openai/gpt-oss-120b`, `openai/gpt-oss-20b` e `qwen/qwen3.8-27b`, nessa ordem) via `renata`;
  voz ElevenLabs via `renata`. WhatsApp e n8n: **não implementados**; o banco do Agente de IA (fila, envio,
  transferência, opt-out, agenda) está pronto, contrato em `docs/agente-ia.md`. Há uma segunda implementação `ia_*` no mesmo banco (ver lá).

## Estrutura de pastas

```
front/index.html            página publicada (bundle: scripts gzip+base64 no manifest)
front/config.js             URL do Supabase + chave pública anon (pública por design)
front/extraido/             scripts decodificados: é AQUI que se edita; depois reempacota
supabase/functions/renata/  index.ts (ações status/chat/testar/voz/transcrever), groq.ts, testes/
supabase/migrations/        migrations versionadas (as 41 iniciais do banco não estão aqui; conteúdo não confirmado)
tools/unbundle.py, rebundle.py
docs/                       arquitetura, auditorias, manual, backlog
setup/environment-setup.sh  rtk + OmniRoute nas sessões de nuvem
```

## Comandos

```bash
python3 -I tools/unbundle.py front/index.html front/extraido   # decodificar
python3 -I tools/rebundle.py front/index.html front/extraido   # reempacotar só o que mudou
node --check front/extraido/<arquivo>.js                       # sintaxe de cada script editado
node --experimental-strip-types --test supabase/functions/renata/testes/groq.test.mts
git push origin main:producao                                  # publicar (SÓ com comando do fundador)
```

Teste de tela: sirva `front/index.html` localmente e abra com Playwright headless (o Chromium já está instalado).
Sem Supabase configurado, o front abre em **modo demonstração** (dados fictícios). Trocar `SB_ON` com a página
aberta quebra o React ("Should have a queue"); para testar o ramo conectado, force o ramo numa cópia temporária.

## Arquitetura (resumo)

- Navegador → supabase-js direto nas tabelas (RLS) e RPCs. IA e voz passam só pela edge function `renata`
  (chaves no Vault ou nos segredos `GROQ_API_KEY`/`ELEVENLABS_API_KEY`, nunca no navegador).
- Os scripts do front conversam por globais em `window`, e a ordem dos `<script>` importa (ex.: `c001` define
  `SB`, `DB`, `SB_ON` e `Z` antes dos demais). `d47643ae` está minificado em linhas muito longas.
- Acesso a dados: `DB.sel/ler/ins/upd/del` (`c001`), sempre com `clinica_id = CLI()` e `excluido_em is null`.
  Serviços por domínio: `PacSvc`, `ProntSvc`, `AgSvc` (`c003`), `FinSvc`, `EstSvc` (`c006`), `MsgSvc` (`c005`),
  `AnamSvc` (`c00b`), `ContSvc` (`c007`). O conteúdo da Salute é global (`clinica_id` nulo; só admin grava).
- Renata no front (`1b7a2c45`): ferramentas de leitura e `propor_*`. As `propor_*` só preparam; a gravação
  acontece quando a pessoa confirma. As regras do **Agente de IA** (tabela `agente_ia`, função `agente_ia_regras`)
  entram no começo das instruções pelo servidor. A aba Agente de IA é **só do administrador master**
  (`eh_admin_plataforma()`): nem o dono da clínica vê ou altera (decisão do fundador, 2026-10-09). Atenção: dentro do artifact, a Renata usa primeiro `window.claude`,
  que fica fora dessas travas.

## Regras de negócio observadas (confirmado no código)

- Exclusão é lógica (`excluido_em`). Toda tabela de negócio tem `clinica_id`, `criado_em`, `atualizado_em` e `criado_por`.
- Agenda em blocos de 30 min (`AG_PASSO_MIN`, `agMeiaHoraOk`), com o fim arredondado ao bloco. Duplicidade é avisada, não bloqueada.
- Funil: Novo Lead, Aguardando atendente, Agendado, Convertido e Perdido (no painel, Perdido fica fora da conversão).
- Renata: lançamento financeiro e movimentação de estoque só saem com TODOS os campos ditos pela pessoa (`rnFaltaFin`, `rnFaltaEst`), perguntando UM dado por vez (`rnPerguntaFalta`, regras em `RENATA_RULES`).
- Renata em voz: voz única Sarah (`RN_VOZ_OFICIAL`, plano grátis da ElevenLabs), espera `RN_SILENCIO_MS` (2,2 s) de silêncio antes de responder e mantém a pergunta da pessoa na tela até terminar de falar.
- Anamnese: a assinatura guarda nome, CPF, traços, aceite, IP, navegador, local (GPS) e hash.
- Feriados: os nacionais são calculados (`feriados_nacionais`) e somados aos da clínica (`feriados_do_mes`).
- Limite mensal da Renata quando a clínica usa a chave da Salute (`renata_limite_mes`, padrão 300).
- Planos (tabela `planos`, 2026-10-09): Inicial R$ 197 (sem IA, `limite_mensagens_ia` 0), Assistente R$ 397 (1.500),
  IA Pro R$ 997 (10.000) e Enterprise sob consulta a partir de R$ 1.997 (null = sob medida em `renata_consumo`).
  Limites (`limite_usuarios`, `limite_profissionais`), `preco_anual`, `preco_implantacao` e os valores adicionais
  (tabela `planos_adicionais`) aparecem na tela Plano e cobrança, mas ainda não são aplicados nem cobrados pelo sistema.

## Segurança (obrigatório)

- Repositório público: nunca commitar segredos nem `service_role`. A chave anon é pública por design.
- Permissão de verdade fica no banco (RLS/RPC), nunca só na tela. Tabela nova precisa de RLS, `clinica_id` e políticas
  com `minhas_clinicas()` / `clinicas_permitidas('<módulo>')` / `clinicas_gestao()` / `eh_admin_plataforma()`.
- `SECURITY DEFINER` só com checagem de clínica e `set search_path`. Revogue `execute` de `anon` quando a função não for pública.
- HTML montado como texto (impressão etc.) precisa escapar TODO dado (`escHtml`). Veja o achado A1 da auditoria 05.
- Dados de paciente vão para Groq/ElevenLabs. Trate isso como risco de LGPD (achado A3) e não amplie sem decisão do fundador.
- Riscos abertos e prioridades: `docs/security.md` e `docs/backlog.md`.

## Padrões de interface (valem para toda tela nova)

- Camadas (z-index) seguem a escala única `Z` (`c001`): conteúdo e menus até 100 · gavetas laterais (ficha,
  Renata) 200–250 · telas cheias 300–400 · diálogos `Z.dialogo` (600) · avisos `Z.aviso` (700). Nunca use número solto.
- Janela aberta a partir de outra (ex.: agendar pela ficha) abre como diálogo centralizado acima de tudo,
  com o fundo escurecido. Ao fechar, volta para a tela de origem sem perder o contexto.
- Toda sobreposição leva `data-overlay="1"`, para que o Esc feche só a janela de cima.
- Avisos de erro nunca podem ficar atrás de um diálogo.
- Agendamento sempre pelo formulário padrão (`window.abrirNovoAgendamento({pac})`).
- Textos em português do Brasil, sem travessões e em linguagem simples.

## Convenções de código

- Edite `front/extraido/*.js` no mesmo estilo do arquivo (ES5 compilado, `React.createElement`, sem JSX).
  Exponha o que outros arquivos usam em `window` / `Object.assign(window, {...})`.
- Nomes e comentários em português. Migrations: `supabase/migrations/AAAAMMDDHHMMSS_nome.sql`, com o mesmo
  conteúdo aplicado no banco. Prefira `create or replace` / `if not exists`, porque DROP trava esperando aprovação.
- Commits como `kevinrlemann <kevin.rodrigs.kr@gmail.com>`.

## Checklist obrigatório antes de alterar

1. Ler os docs do domínio e confirmar no código/banco o estado atual.
2. Fazer um plano curto, com a menor alteração possível; migration versionada antes de aplicar no banco.
3. `node --check` nos arquivos editados, rebundle, teste no navegador (Playwright) e, se mexer na `renata`, os testes dela.
4. Reler o diff procurando quebra de RLS, segredo exposto, HTML sem escape e camada (Z) errada.
5. Commit na `main`. Publicar (`main:producao` + artifact) só com comando explícito do fundador, e conferir o site depois.

## Forma de trabalho com o fundador

- Ele não é programador: explique em linguagem simples.
- Ao finalizar cada bloco, envie um diagnóstico curto: ✅ para o que foi feito e ❌ para o que não foi feito
  (com o motivo e o que falta).
- Publicação em produção só quando ele mandar ("publicar").

## Ferramentas

`setup/environment-setup.sh` instala rtk e OmniRoute (`http://localhost:20128`). Detalhes e domínios bloqueados em `docs/conexoes.md`.
