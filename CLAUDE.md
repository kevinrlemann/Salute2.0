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
- Publicação: branch `producao` → Netlify (site `saluteia.site`, pasta `front/site/` gerada por `tools/site.py`, ver `netlify.toml`) e o artifact
  https://claude.ai/artifact/WtotK7P4yu9qhf9VWrAqhA. `deploy/netlify/` está desatualizado: não usar.

## Stack (confirmado)

- Front: bundle único exportado do Claude Design (`front/index.html`), React 18.3.1 (build de produção desde 2026-10-13), JSX já
  compilado por Babel (helpers do regenerator), supabase-js 2.117.2, design system `SaluteProjetoDesigner`,
  ícones Lucide 0.468.0 via unpkg e gerador de QR local. Sem build tool e sem npm no front.
- Back: Supabase (Postgres 17, RLS em todas as tabelas, Auth, Storage, Realtime) + edge function `renata` (Deno).
- IA: ChatGPT da OpenAI (`gpt-4.1-mini`, reserva `gpt-4o-mini`) via `renata` (chave da clínica no cofre, provedor `openai`, ou segredo `OPENAI_API_KEY`); o atendimento no WhatsApp (n8n WF01) usa o mesmo ChatGPT, com a chave guardada só no n8n. Decisão do fundador (2026-10-12): só OpenAI, custo absorvido pela Salute;
  voz ElevenLabs via `renata`. WhatsApp e n8n: **não implementados**; o banco do Agente de IA (fila, envio,
  transferência, opt-out, agenda) está pronto, contrato em `docs/agente-ia.md`. Há uma segunda implementação `ia_*` no mesmo banco (ver lá).

## Estrutura de pastas

```
front/index.html            pacote único (bundle: scripts gzip+base64 no manifest); é o que vai para o artifact
front/site/                 gerado por tools/site.py: index.html pequeno + assets/ (scripts e fontes com cache de 1 ano); é o que o Netlify publica
front/config.js             URL do Supabase + chave pública anon (pública por design)
front/extraido/             scripts decodificados: é AQUI que se edita; depois reempacota
supabase/functions/renata/  index.ts (ações status/chat/testar/voz/transcrever), openai.ts, testes/
supabase/migrations/        migrations versionadas (as 41 iniciais do banco não estão aqui; conteúdo não confirmado)
tools/unbundle.py, rebundle.py
docs/                       arquitetura, auditorias, manual, backlog
setup/environment-setup.sh  rtk + OmniRoute nas sessões de nuvem
```

## Comandos

```bash
python3 -I tools/unbundle.py front/index.html front/extraido   # decodificar
python3 -I tools/rebundle.py front/index.html front/extraido   # reempacotar só o que mudou
python3 -I tools/site.py front/index.html front/site           # gerar o site do Netlify (index pequeno + assets/ com cache); SEMPRE depois do rebundle
node --check front/extraido/<arquivo>.js                       # sintaxe de cada script editado
node --experimental-strip-types --test supabase/functions/renata/testes/openai.test.mts
git push origin main:producao                                  # publicar (SÓ com comando do fundador)
```

Teste de tela: sirva `front/index.html` localmente e abra com Playwright headless (o Chromium já está instalado).
Sem Supabase configurado, o front abre em **modo demonstração** (dados fictícios). Trocar `SB_ON` com a página
aberta quebra o React ("Should have a queue"); para testar o ramo conectado, force o ramo numa cópia temporária.

## Arquitetura (resumo)

- Navegador → supabase-js direto nas tabelas (RLS) e RPCs. IA e voz passam só pela edge function `renata`
  (chaves no Vault ou nos segredos `OPENAI_API_KEY`/`ELEVENLABS_API_KEY`, nunca no navegador).
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
- Clínica nova cadastrada pelo site nasce aguardando aprovação (`clinicas.aprovada_em` nulo): o dono entra, mas
  `minhas_clinicas`/`clinicas_gestao`/`clinicas_permitidas` a ignoram até o administrador master aprovar no Painel Master
  (`admin_aprovar_clinica`). Clínica criada pela equipe da Salute já nasce aprovada (2026-10-10).
- Sinal para garantir a vaga (2026-10-13): a clínica liga em Configurações › Clínica (`configuracoes_clinica.sinal_*`: valor fixo ou
  integral do procedimento, chave PIX, prazo em horas, instruções) e cada profissional escolhe seguir a clínica, não pedir, valor fixo ou
  integral (`profissionais.sinal_modo/sinal_valor`). A regra efetiva é `sinal_regra(clinica, profissional, procedimento)`. A IA reserva a
  consulta como "Aguardando" com `agendamentos.status_pagamento = 'pendente'`, `sinal_valor` e `reserva_expira_em`; passa valor, PIX e prazo;
  o comprovante vira `registrar_comprovante_sinal` (transferência "Sinal" para a equipe). A equipe confirma na Agenda (`sinal_confirmar`:
  consulta Confirmada, receita paga em `contas_receber` ligada ao agendamento, aviso no WhatsApp) ou dispensa (`sinal_dispensar`).
  `sinal_expirar` (via `ia_manutencao`, a cada minuto) cancela reservas vencidas. No "Recebi pagamento" e em "Nova receita", o sinal pago do
  paciente aparece para abater (`sinal_disponivel` / `sinal_abater`). A política antiga `agente_ia.politica_sinal` continua só para
  "aprovação humana"; os modos "obrigatório" passam a usar a regra nova quando a clínica a liga.
- Transferência entre a equipe (2026-10-16, grátis, sem n8n): em Conversas, o botão "Transferir" do cabeçalho abre a janela "Transferir para" (pessoas
  ativas da clínica, "Assumir" para si, motivo opcional). RPC `transferir_conversa(conversa, usuario, motivo)` grava `conversas.atendente_usuario_id`, pausa a IA,
  mantém UMA `transferencias_humanas` aberta por conversa (`atribuida_a`), escreve uma nota `mensagens.tipo = 'sistema'` (não vai para o WhatsApp: `mensagem_automacao`
  sai cedo) e avisa quem recebe no sino. `liberar_conversa(conversa, religar_ia)` encerra. Na lista: selo "Com Fulano"/"Com você" (azul/verde) ou "Aguardando equipe"
  (amarelo) e o filtro "Minhas". Departamentos, fila e SLA por departamento NÃO foram feitos (dependeriam de branch paga do Supabase e fluxos n8n).
- Conversas (2026-10-16): arrastar a conversa para a esquerda (toque ou mouse) ou passar o mouse mostra a lixeira; "Apagar" é exclusão lógica
  (`MsgSvc.excluir`, `conversas.excluido_em`). Na janela "Transferir para", o botão "Devolver para a fila e ligar a IA" chama `liberar_conversa(conversa, true)`.
- Conversas, compositor como o WhatsApp (2026-10-16): segurar o microfone grava e soltar envia; arrastar para a esquerda cancela; toque curto trava
  (cadeado, mãos livres); áudio com menos de 0,7 s não sai. Caixa de texto cresce (Enter envia, Shift+Enter quebra linha). Áudio recebido/enviado
  toca em 1x, 1,5x e 2x. Tudo em `366b46a2` (`micDown/micMove/micUp`, `WaAudio.mudaVel`).
- Prontuário › "Transcrição e relatório da consulta" (2026-10-16): grava a conversa da consulta (voz do navegador ou ElevenLabs via `renata`), a IA gera o
  relatório e tudo fica em `consultas_relatorios` (RLS `clinicas_permitidas('pacientes')`) e no histórico do paciente (tipo `consulta`).
- Painel (2026-10-16): período por indicador (`PAINEL_PER`: pacientes/agendamentos/funil/canais abrem no mês; IA/atendimentos nos últimos 7 dias;
  30 dias e datas livres via `PeriodoChip`, dentro de cada cartão: `StatCard.headerRight`), RPC `painel_periodo(clinica, ini, fim)` (período anterior do mesmo tamanho).
- Renata (2026-10-16): silêncio de 1,5 s (`RN_SILENCIO_MS`), correção de ditado (`rnCorrigirDitado`, vocabulário da clínica, 3 alternativas do
  reconhecedor), transcrição com `language_code: 'por'`. Dinheiro a receber: ela pergunta a data prevista e lança nessa data; entende parcelas
  (`parcelas` em `propor_lancamento_financeiro` → `FinSvc.criar` com `parc`/`venc`: UMA conta com `numero_parcelas` e N linhas em `parcelas`, vencimentos mensais).
- Agenda (2026-10-16): a grade 6h–20h cresce quando há agendamento fora desse horário na semana visível (`slotsGrade`).
- Celular (2026-10-16): Início sem o cartão "Hoje"; Agenda escolhe primeiro o profissional e depois o dia por toque (`DiaPicker`); sem o botão redondo de
  calendário; folha Novo tem "Recebi material" (`MxEntrada` → `EstSvc.lancar` entrada).
- Foto de perfil e do profissional (2026-10-16): recorte com zoom e arrasto antes de subir (`abrirRecorteFoto` / `FotoRecorte`, em `30c3fd71`).
- Plano e cobrança (2026-10-16): uso da IA e armazenamento em linhas (texto, voz, WhatsApp, total); todo plano pago inclui 2 usuários
  (`planos.limite_usuarios`), usuário extra R$ 49,90/mês (`planos_adicionais.usuario_extra`), GB (`limite_armazenamento_gb`) e mensagens extras
  (ex.: +2.000 por R$ 97) mostrados em "Acima do limite". O controle é por usuários ativos, não por profissionais (`planoUsuariosAtivos`).
  Agente de IA (WhatsApp) só no plano IA Pro: `plano_ia_whatsapp(clinica)` no banco (gate `plano_sem_ia` em `agente_pode_responder`) e botões
  de ligar/pausar a IA bloqueados na tela (`planoTemIaWhatsapp`). Os limites de usuários/GB ainda não são cobrados automaticamente.
- Financeiro (2026-10-16): tabelas de receitas e despesas começam por "Lançamento" (data de competência) e trazem Valor antes de Vencimento; lançamento
  parcelado mostra os vencimentos de cada parcela; filtro de período (este mês, mês que vem, últimos 30 dias, datas livres), por vencimento ou por lançamento.
- Quem vendeu e quem executou (2026-10-16, decisão do fundador: SEM cálculo de comissão no sistema; cada clínica faz o seu): receitas e despesas
  guardam `atendente_usuario_id` (quem vendeu/lançou; padrão = quem está logado, pelo gatilho `lancamento_atendente_padrao`) e `profissional_id`
  (despesa também). Nova receita/despesa reorganizada em 4 blocos (Quem · Classificação · Valores e pagamento · Prazo e situação), tudo em lista.
  Tabelas com colunas Atendente (receita) e Profissional/Responsável (despesa); filtros por profissional e por atendente; Visão geral com
  "Faturamento por atendente". Migration `20261016190000`.
- Importar contatos do WhatsApp (2026-10-16): só na conexão por QR Code com Evolution API. Função `whatsapp` ação `contatos` (agenda do telefone:
  nome + número) e RPC `importar_contatos_whatsapp(clinica, contatos, 'paciente'|'lead')` (não duplica pelo telefone; paciente nasce com
  `origem_cadastro = 'whatsapp'`; lead entra no funil padrão em Novo Lead com origem WhatsApp). Tela: Integrações › WhatsApp › "Importar contatos do
  telefone" (`WaImportar`, prévia com busca e seleção). Migration `20261016200000`. Z-API não tem agenda de contatos.
- Fotos (2026-10-16): links assinados das fotos (conversas, anexos e pacientes) valem 7 dias (`FOTO_TTL_S`) e o cache local de Mensagens guarda os links, para
  a lista e as fotos abrirem na hora ao voltar à aba ou recarregar. A foto do contato do WhatsApp segue a pessoa em todo o sistema: o `Avatar` do design
  system (`7bf00496`) sem `src` procura `window.fotoPorNome(nome)` (foto do paciente em `PAC`, senão a da conversa em `window.FOTO_NOME_WA`).
- Conversas (2026-10-16): sem ícone de lixeira na lista; a faixa vermelha "Apagar" só existe enquanto a conversa está sendo arrastada (`MxDeslize`), no computador e no celular.
- Suporte da Salute (2026-10-16): dentro de uma clínica (`acessos_suporte`) tem todos os módulos e sub-abas (`meu_contexto` devolve tudo; RLS por
  `clinica_suporte()`; `trocar_plano` aceita o suporte; o resto já aceitava `eh_admin_plataforma()`). Migration `20261016210000`.
- Saluteflix (2026-10-16): categorias fixas Técnico, Comercial, Gestão, Marketing e Sistema (`flix_categorias`) com conteúdos de exemplo em `flix_conteudos`
  (só capa e informações; migration `20261016180000`). Parcerias com logo (`parceiros.logo_path`, bucket `conteudos/parceiros`), no visual de Certificações.
- Ajustes de usabilidade (2026-10-17): Início sem o botão de três pontos nos cartões (`StatCard` sem `onMenu` em `25352dc7`). Financeiro › Visão geral:
  período só 7 dias, 30 dias ou datas (`PeriodSelect` normaliza valores antigos para 30); todos os indicadores e o gráfico seguem o período;
  o gráfico perdeu os rótulos laterais (Faturou/Custos/Lucro ao lado) e a linha "Próximos 30 dias". Receitas/Despesas sem a linha de chips de período
  (`perJanela = null`; o período fica em "Filtros" › Lançamento/Vencimento). Parcerias sem chips de categoria; cartão = logo, nome, descrição, Categoria e
  Status (Parceiro oficial/Ativo). Plano e cobrança: "Uso da IA" e "Armazenamento" lado a lado com detalhes recolhidos ("Ver meses anteriores",
  "Ver o que ocupa espaço"), sem o mini-cartão duplicado do topo, e "Quanto esta clínica paga por mês" abaixo dos planos.
- Painel › "Faturamento pela Renata IA" (2026-10-17): 4º cartão do Início (`stats[3]`, seção `renata` em `PAINEL_PER`, padrão 30 dias). Bloco
  `renata_faturamento` em `painel_mes` e `painel_periodo` (migration `20261017120000`): receitas (`contas_receber.valor_liquido`, recebidas ou a receber)
  ligadas a consultas com `agendamentos.origem = 'renata_ia'` não canceladas, pela data da consulta; agendamento feito pela equipe fica de fora.
  Ligação receita → consulta: `contas_receber.agendamento_id` (ou via `procedimentos_realizados.agendamento_id`); o gatilho `tg_contas_receber_liga_agendamento`
  (migrations `20261017130000` e `20261017140000`) preenche `agendamento_id` ao inserir uma receita sem consulta: a consulta não cancelada do paciente
  mais próxima do lançamento, numa janela de 30 dias antes até 7 dias depois (mesmo dia primeiro; empate de distância não adivinha). Receitas antigas
  preenchidas uma vez. Assim parcelas e pagamentos lançados dias depois da consulta da IA continuam contando no cartão.
- CRM (decisão do fundador, 2026-10-17): mover o lead para Convertido = a pessoa compareceu. Gatilho `tg_leads_convertido_compareceu`
  (`lead_convertido_compareceu`, migration `20261017110000`): consultas já passadas do lead (ou do paciente ligado) em agendado/confirmado/aguardando/
  em atendimento viram "Atendido" (conta como atendimento no Painel); futuras, canceladas e faltas não mudam. Vale para tela, IA e importações; grava em `auditoria`.
- Plano e cobrança (2026-10-17): bloco "Quanto esta clínica paga por mês" (`ResumoCobranca` em `30c3fd71`: plano base + usuários ativos além dos
  2 incluídos × `planos_adicionais.usuario_extra` + pacotes de 25 GB além de `limite_armazenamento_gb` × `armazenamento_25`; estimativa, a
  cobrança automática não está ligada). Planos Inicial, Assistente e IA Pro lado a lado; Enterprise desligado no banco (`planos.ativo = false`,
  migration `20261017100000`, volta com `ativo = true`); tabela "Valores adicionais" saiu da tela e "Acima do limite" só mostra usuários e GB.
  Contagem do uso conferida no banco: `renata` manda `p_origem` texto/voz (`corpo.voz`), `n8n_finalizar_turno` conta `whatsapp`; tela via `ia_uso`.
  Notificações: 4 sons (Cristal, Suave, Pop, Sino em `TONES`, `d41989a4`). E-mail de "esqueci a senha" com SMTP próprio: planejado em `docs/backlog.md` P2-07a.
- Filtros e períodos (2026-10-17): Financeiro › Receitas/Despesas e Nota fiscal têm o botão "Filtros" ao lado de "Todos os status" (painel `filtrosCampos`
  em `d47643ae`: lançamento, paciente, procedimento, profissional, atendente, categoria, atendimento, valor, vencimento, desconto, pagamento, status;
  despesas: descrição, fornecedor, responsável; NF: data, tomador, CPF/CNPJ, serviço, valor, ISS, situação). `PeriodSelect` (Visão geral do Financeiro e
  Relatórios do Estoque) aceita 7/14/30/60/90 dias ou "Escolher datas" (valor `'c:AAAA-MM-DD:AAAA-MM-DD'`, helpers `perInfo`/`perRotulo`; consumo do
  estoque em datas livres via `EstSvc.consumoEntre`). Receitas/Despesas ganharam o chip "Últimos 7 dias". Parcerias: logo, nome, descrição, categoria e
  "Cupom de desconto: Sim/Não". Tradução automática do navegador bloqueada (`translate=no` + `meta notranslate`): o seletor PT/EN/ES do sistema continua.
- Armazenamento por clínica (2026-10-13): RPC `armazenamento_uso(clinica)` soma os arquivos do Storage (pasta `<clinica_id>/...` em todos os
  buckets, por tipo) e o tamanho das linhas de conversas e cadastros. Tela: Minha conta › Plano e cobrança › "Armazenamento usado", abaixo do uso da IA.
- Anamnese: a assinatura guarda nome, CPF, traços, aceite, IP, navegador, local (GPS) e hash.
- Feriados: os nacionais são calculados (`feriados_nacionais`) e somados aos da clínica (`feriados_do_mes`).
- Limite mensal de IA (`renata_limite_mes`, padrão 300 sem plano): conta Renata por texto, Renata por voz e respostas da IA no WhatsApp (`renata_consumo.mensagens_renata_texto/_voz/_whatsapp`, soma em `mensagens_ia`). Ordem do limite: mês (`renata_consumo.limite_mensagens`) > clínica (`clinicas.limite_mensagens_ia`, só o master, RPC `admin_definir_limite_ia`) > plano. Vale para a Renata (função `renata`) e para o WhatsApp (`agente_pode_responder`, motivo `limite_mensagens`). Tela: Minha conta › Plano e cobrança › Uso da IA (RPC `ia_uso`).
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
- Dados de paciente vão para OpenAI/ElevenLabs. Trate isso como risco de LGPD (achado A3) e não amplie sem decisão do fundador.
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
- Ao sugerir serviços, ferramentas ou fornecedores, priorize SEMPRE o menor custo (grátis primeiro) em relação ao
  resultado. Mostre a opção grátis que resolve antes da paga e diga o limite de cada uma (decisão do fundador, 2026-10-09).
- Responda sempre em português do Brasil.

## Ferramentas

`setup/environment-setup.sh` instala rtk e OmniRoute (`http://localhost:20128`). Detalhes e domínios bloqueados em `docs/conexoes.md`.
