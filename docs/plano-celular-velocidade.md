# Plano: celular, agenda, conversas rápidas e indicadores (2026-10-13)

Pedido do fundador (voz, 2026-10-13). Cada parte é executada, testada e marcada aqui. Marcação: "confirmado"
(visto no código ou no banco), "inferido", "não confirmado".

## Diagnóstico (confirmado no banco e no código)

- Início do celular lia `APPT_STORE`, mas esse store só é preenchido quando alguém abre a aba Agenda
  (`CARGAS.agenda`). Por isso "Nenhuma consulta hoje" aparecia mesmo com consultas no banco.
- Clínica Lemann hoje (13/10): três consultas da IA para a Dra. Ana (10:00, 13:00 e 14:00), todas com
  profissional e status válidos. A agenda carrega a janela de -150 a +240 dias uma vez e depende do canal de
  tempo real para novidades. O canal não trata erro/queda (`subscribe()` sem callback), então uma consulta
  marcada pela IA enquanto o app está aberto pode não aparecer até recarregar.
- Dados de exemplo da clínica (ids `d1000001…`/`d2000001…`) têm horários quebrados (07:08:02). São seeds,
  não consultas reais; ficaram no banco.
- Conversas: `CARGAS.mensagens` esperava os catálogos (25 consultas) antes de buscar as conversas, e só
  liberava a tela depois de canais da equipe + 2.000 mensagens da equipe. Nada era guardado no aparelho.
- Painel (`painel_mes`) já usa só o banco. Pontos a corrigir: gênero ignora 19 de 39 pacientes sem sexo
  informado; 38 de 43 leads do mês caem em "Não informado" porque o lead criado pela conversa não recebe
  origem; "IA economizou" é uma estimativa (conversas × minutos configurados) sem dizer isso.
- "Três pontinhos" = aba Mais da barra inferior (ícone `ellipsis`).

## Partes

1. Início do celular: só Financeiro, Estoque e Indicadores (cartões com ícone, título e subtítulo);
   cartão "Hoje" lê a agenda do banco e mostra a próxima consulta a partir de agora.
2. Agenda (celular e computador): profissional escolhido numa lista (Todos + cada um, com contagem do dia),
   acima da fita de dias; título do dia mostra o profissional; selo "IA" na consulta marcada pelo WhatsApp.
3. Consultas sempre na agenda: teste com as 39 consultas reais; recarga da janela ao abrir a Agenda/Início
   depois de 30 s e ao voltar do segundo plano; canal de tempo real reassina sozinho em erro/queda.
4. Aba Mais abre Configurações; Cobranças, Extrato, Notas e Compras continuam acessíveis em Financeiro/Estoque.
5. Conversas instantâneas: lista publicada assim que chega (sem esperar catálogos, canais e figurinhas);
   cópia local da lista e das últimas mensagens de cada conversa (aparece na hora, atualiza em seguida);
   pré-carga de mensagens, agenda e painel logo após entrar; fotos com carregamento preguiçoso.
6. Indicadores: gênero com "Não informado"; origem "WhatsApp" para leads vindos de conversa (migração +
   reparo); "IA economizou" com a conta explicada.
7. Testes (celular e computador com dados reais), rebundle, commit e publicação.

## Andamento (2026-10-13)

| Parte | Situação | Como foi conferido |
|---|---|---|
| 1 Início | feita | roteiro conectado com as 39 consultas reais: "Hoje · 3 consultas · Próxima às 10:00 · Natalino"; só os três cartões (confirmado) |
| 2 Agenda | feita | botão "Profissional" abre a folha "Ver a agenda de quem?" com Todos (3 consultas), Ana (3), Carlos (0), Patrícia (0); escolha muda a lista; selo "IA" nas três consultas da IA (confirmado). No computador a lista lateral "Profissionais" já existia e ficou igual (pixel a pixel) |
| 3 Consultas | feita | `agendaAtualizar` ao abrir Agenda/Início (30 s) e ao voltar do segundo plano; canal reassina em CHANNEL_ERROR/TIMED_OUT/CLOSED com espera 3 s → 30 s (confirmado no código; queda real do canal não simulada) |
| 4 Mais | feita | aba Mais abre "Mobile · Configurações"; Financeiro mostra Cobranças, Extrato do dia e Notas fiscais; Estoque mostra Lista de compras; Cobranças abre (confirmado) |
| 5 Conversas | feita | lista publicada antes de canais/figurinhas; cópia local (`salute:mensagens:<clinica>:<usuario>`, 200 conversas + 60 mensagens de até 15 chats, apagada ao sair); partida fria com rede travada em 6 s mostra a lista guardada aos 3 s; pré-carga de conversas e agenda ao entrar (confirmado) |
| 6 Indicadores | feita | gênero com "Não informado" (49 % dos 39 pacientes); migração `20261013120000`: origem "WhatsApp" criada e 21 leads do mês saíram de "Não informado" (17 ficaram: seeds sem conversa); rótulo "estimativa de 5 min cada" (confirmado no banco e no roteiro) |
| 7 Publicação | pendente do comando "publicar" | computador 1280×800: 8 telas iguais ao commit anterior, só o orbe animado difere |

Não verificado: aparelho real; queda real do canal de tempo real; cópia local em navegador com armazenamento bloqueado (o código ignora o erro e segue sem cache).
