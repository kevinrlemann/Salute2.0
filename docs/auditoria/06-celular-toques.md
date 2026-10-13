# Auditoria 06: toques do celular (botões, destinos e repetições)

Data: 2026-10-12. Versão celular (390 x 844), modo demonstração, Chromium headless.
Método: um roteiro (scratchpad `aud/inv.cjs`) abre cada tela do celular, lista todo botão, link e
elemento clicável visível e clica em cada um, registrando o que mudou (rota, título, camada aberta,
aviso, texto da tela). Veredito por toque: **ok** (leva a algo), **sem destino** (não muda nada
visível, não abre nada, não grava e não avisa), **repetido** (mesma ação em dois lugares da mesma
tela), **confuso** (nome técnico ou destino diferente do nome).

Marcação: "confirmado" = visto no roteiro ou no código; "inferido" = dedução; "não confirmado" = não testado.

## 1. Resumo

| Tela | Toques (antes) | Sem destino (antes) | Situação depois |
|---|---|---|---|
| Início | 17 | 2 (Recebi abria Estoque; Estoque sem área) | corrigido |
| Agenda | 43 | 0 | ok |
| Novo (gaveta do +) | 5 | 0 | ok |
| Recebi / Paguei / Usei | 15 / 15 / 14 | 0 (Usei: ler código vazio não avisava) | corrigido |
| Conversas (lista) | 21 | 1 (botão "+" só focava a busca) | corrigido |
| Conversa aberta | 10 | 0 | ok |
| Funil (CRM) | 39 | 1 (chip "CRM" sem função) | corrigido |
| Mais | 18 | 1 (Financeiro abria Estoque) | corrigido |
| Pacientes | 30 | 0 | ok |
| Ficha | 20 | 0 | ok |
| Financeiro / Estoque | 40 / 17 | 0 | ok |
| Cobranças / Extrato / Compras / Notas | 97 / 3 / 3 / 1 | 0 | ok |
| Configurações | 44 | 0 | ok |
| Renata | 11 | 0 | ok |
| Indicadores | 14 | 3 (três pontos dos cartões sem menu) | corrigido |
| Feito | 2 | 0 | ok |

Total antes: 339 toques, 332 ok, 7 marcados como repetidos pelo roteiro (ver seção 4). Confirmado.

## 2. Botões sem destino encontrados e o que fazem agora (confirmado no código e no roteiro)

| Tela | Botão | Antes | Agora |
|---|---|---|---|
| Início | atalho "Recebi" | abria a Gestão na área Estoque | abre o fluxo "Recebi pagamento" (3 telas), o mesmo da gaveta do + |
| Início | atalho "Estoque" | abria a Gestão sem escolher área | abre a Gestão já na área Estoque |
| Início | atalho "Agendar" | abria um formulário próprio | chama `window.abrirNovoAgendamento({})`, o formulário padrão |
| Mais | "Financeiro" | abria a Gestão na área Estoque | abre a Gestão na área Financeiro |
| Conversas | botão verde "+" | só colocava o foco na busca, com rótulo "Nova conversa" | virou "Pesquisar conversa" (lupa). Não existe fluxo para a clínica começar uma conversa: o paciente escreve primeiro |
| Funil | chip "CRM" | não fazia nada | virou o rótulo "Funil de clientes", sem clique |
| Indicadores | três pontos dos cartões | abriam nada (`onMenu` vazio) | no celular o botão some; no computador continua igual |
| Usei material | "Ler código" com campo vazio | não avisava | mostra "Digite ou leia o código do produto primeiro." |

Toques marcados como "NADA" pelo roteiro que **não** são defeito (inferido e conferido no código):
- item da barra inferior já selecionado (Início em Início, Agenda em Agenda, Conversas em Conversas);
- chips já selecionados ("Semana", "Hoje", "Todas", "Visão geral", "Cadastro");
- tecla "0" do teclado com valor vazio (a tela já mostra 0);
- letras laterais da lista de Pacientes (rolam a lista; o roteiro não mede rolagem da janela);
- interruptores de Configurações (`role=switch`, `aria-checked` muda; o roteiro não captou);
- "Abrir e editar" na ficha (abre o registro no mesmo painel, sem diálogo);
- "Nova conversa" na Renata com o chat já vazio.

## 3. Repetições (mesma ação por caminhos diferentes) e o caminho único que ficou

| Ação | Pontos de entrada | Caminho único agora |
|---|---|---|
| Agendar consulta | Início (atalho), gaveta do +, Agenda (Novo e horário livre), ficha do paciente | todos chamam `window.abrirNovoAgendamento` (formulário padrão). O agendamento rápido pelo horário livre termina na tela "Feito" (confirmado) |
| Registrar pagamento | Início (atalho "Recebi pagamento"), gaveta do + | mesmo fluxo `MxDinheiro` em 3 telas (confirmado) |
| Funil de clientes | Conversas (menu de três pontos) e Mais | mesma tela `MxCrmLista` (confirmado) |
| Conversas | Início (atalho "Ver conversas") e barra inferior | mesma tela (confirmado) |
| Financeiro e Estoque | Início (Estoque) e Mais (Financeiro, Estoque) | mesma tela de Gestão, aberta já na área pedida (`__gestaoAreaPedida`) (confirmado) |
| Novo paciente | gaveta do +, Pacientes, conversa sem paciente | `MxNovoPac` em 2 telas; na conversa o paciente é criado com o nome do contato (não confirmado com banco real) |

Repetições na **mesma** tela apontadas pelo roteiro e deixadas como estão, por serem listas (um botão por item):
"Horário livre · toque para agendar" (um por horário), "Cobrar no WhatsApp" e "Recebi" (um por cobrança),
"Opções da mensagem" (um por mensagem). Confirmado.

Dois hooks de largura (`useNarrow` 1180 px e `useIsMobile` 767 px) continuam separados: unificar
mexe no computador. Anotado para outra rodada (ver auditoria 03, L12).

## 4. Textos trocados no celular (antes → depois)

- "Agendar" → "Agendar consulta"
- "Recebi" → "Recebi pagamento"
- "Conversas" (atalho do Início) → "Ver conversas"
- "Estoque" (atalho do Início) → "Ver estoque"
- "Renata" / "Renata IA" → "Falar com Renata" / "Falar com a Renata"
- "CRM de leads" / "CRM" → "Funil de clientes"
- "Novo contato (lead)" e demais etapas com "lead" → "contato"
- "Nova conversa" (botão da lista) → "Pesquisar conversa"
- Busca: "Pesquisar ou começar uma nova conversa" → "Pesquisar conversa" (só no celular)

Os cinco atalhos do Início passaram a ficar em grade fixa de 5 colunas, com o texto em duas linhas,
para nenhum ficar escondido na rolagem lateral. Confirmado.

Atualização 2026-10-13: os cinco atalhos e o cartão "Falar com a Renata" saíram do Início (a Renata já
fica no topo). Ficaram só Financeiro, Estoque e Indicadores. A aba Mais passou a abrir Configurações, e
Cobranças, Extrato, Notas e Lista de compras ficam dentro de Financeiro e Estoque. Ver `docs/plano-celular-velocidade.md`.

## 5. Tempo real ao voltar para a tela (celular)

Antes: as assinaturas do Supabase morriam quando o app ficava em segundo plano e a lista só mudava
ao recarregar. Agora (`c001`: `aoVoltarVisivel`, `reassinarTempoReal`; `c005`: recarrega a lista e o
chat aberto): depois de mais de 20 s escondido, ou quando a internet volta, todos os canais são
reassinados e a tela de conversas recarrega a lista e a conversa aberta. Sem laço de consulta.
Teste com `visibilitychange` simulado no Playwright: feito pelo agente de automação (não confirmado
nesta revisão; o aparelho real não foi testado).

## 6. Computador (1280 x 800)

Oito telas comparadas pixel a pixel contra o commit anterior (`e00a4d6`): painel, agenda, mensagens,
pacientes, gestão, gestão financeiro, perfil, indicadores. A única diferença em todas é a caixa do
orbe animado no canto superior direito (x 1088 a 1141, y 49 a 102), que também muda entre duas
execuções do mesmo commit. Confirmado.

## 7. O que não foi verificado

- Aparelho real (toque, deslizar, segundo plano, ícones Lucide, que não carregam no sandbox).
- Dados reais do Supabase: tudo rodou em modo demonstração.
- Criação de paciente a partir de conversa sem paciente (só com banco real).
- Fase 9 do plano (foto da nota fiscal) e teste com a equipe (T1 a T3), fora do escopo.
