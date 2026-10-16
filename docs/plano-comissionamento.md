# Plano: comissionamento por profissional e por procedimento, e Equipe unificada

Pedido do fundador (2026-10-16): cada doutor tem uma porcentagem de comissão; a porcentagem pode ser definida por procedimento,
para que o valor saia pronto, sem revisão depois; e a aba "Equipe e acessos" deve mostrar todo mundo (profissionais e equipe),
porque o profissional também faz parte da equipe. Plano feito ANTES da execução. Nada foi alterado ainda.

## 1. O que existe hoje (confirmado no banco e no código)

| Onde | O que há | O que falta |
|---|---|---|
| `profissionais` | nome, especialidade, conselho, foto, cor da agenda, `usuario_id` (ligação opcional com o login), sinal | nenhum campo de comissão |
| `usuarios_clinicas` (Equipe e acessos) | papel (`dono`, `gestor`, `recepcao`, `profissional`, `financeiro`), função, convite, ativo; permissões por módulo em `permissoes` | não mostra os profissionais sem login; um profissional convidado não vira automaticamente um cadastro em `profissionais` |
| `procedimentos` | nome, valor, duração, categoria financeira, campos da IA | nenhum campo de comissão |
| `contas_receber` (receitas) | `profissional_id`, `procedimento_id`, `procedimento_realizado_id`, valor total, desconto, valor líquido, parcelas, status, data do pagamento | nada de comissão |
| `procedimentos_realizados` (prontuário) | profissional, procedimento, valor, status | nada de comissão |
| Telas | Cadastro › Equipe e acessos (lista de logins); Cadastro › Profissionais; Cadastro › Procedimentos; Financeiro (Visão geral, Receitas, Despesas…) | nenhuma tela de comissão |

Conclusão: o sistema já sabe QUEM atendeu e QUANTO entrou por atendimento. Falta só a regra de porcentagem e o cálculo.

## 2. Regras de negócio propostas (com o padrão que vou adotar se o fundador não disser o contrário)

1. **Hierarquia da porcentagem** (a mais específica vence):
   1. regra "profissional × procedimento" (ex.: Dra. Camila, Toxina: 35%);
   2. porcentagem padrão do procedimento (ex.: Toxina: 30% para qualquer profissional);
   3. porcentagem padrão do profissional (ex.: Dra. Camila: 25% em tudo);
   4. 0% (sem comissão).
2. **Base do cálculo**: valor líquido recebido (depois do desconto e do sinal abatido). Opção por profissional: "sobre o valor bruto".
3. **Momento**: a comissão nasce quando a receita é marcada como recebida (regime de caixa). Receita parcelada gera comissão
   proporcional a cada parcela recebida. Assim a clínica nunca paga comissão de dinheiro que ainda não entrou.
4. **Estorno**: se a receita voltar para "pendente", a comissão correspondente é cancelada; se já tiver sido paga, entra um ajuste negativo
   no próximo fechamento.
5. **Receita sem procedimento** (ex.: "Consulta" avulsa) usa a porcentagem padrão do profissional.
6. **Quem vê**: dono, gestor e financeiro veem tudo; quem tem papel "profissional" vê só a própria comissão.
7. **Pagamento da comissão**: o botão "Marcar como pagas" fecha o período e cria UMA despesa em `contas_pagar`
   (categoria "Comissões", fornecedor = nome do profissional), para o caixa ficar certo sem digitar nada.
8. Taxas de cartão e impostos NÃO são descontados nesta versão (pode virar opção depois).

## 3. Banco de dados (uma migration aditiva, sem DROP)

1. `profissionais`: `comissao_ativa boolean default false`, `comissao_pct numeric(5,2)`, `comissao_base text default 'liquido'`
   (`liquido` ou `bruto`).
2. `procedimentos`: `comissao_pct numeric(5,2)` (padrão do procedimento, vale para todos os profissionais sem regra própria).
3. Nova tabela `comissoes_regras`: `clinica_id`, `profissional_id`, `procedimento_id`, `percentual`, `ativo`, auditoria e `excluido_em`.
   Única por (profissional, procedimento). RLS: leitura para `clinicas_permitidas('gestao')`; escrita para `clinicas_gestao()`.
4. Função `comissao_regra(clinica, profissional, procedimento)` → devolve `percentual`, `base` e `origem`
   ("por procedimento do profissional", "padrão do procedimento", "padrão do profissional", "sem comissão").
5. Nova tabela `comissoes` (os lançamentos): `clinica_id`, `profissional_id`, `conta_receber_id`, `parcela_id` (quando parcelado),
   `procedimento_realizado_id`, `paciente_id`, `procedimento_nome`, `base_valor`, `percentual`, `valor`, `competencia` (data do recebimento),
   `status` (`prevista`, `liberada`, `paga`, `cancelada`), `pago_em`, `conta_pagar_id` (despesa gerada no fechamento), `observacoes`.
   RLS: dono/gestor/financeiro pela clínica; profissional só onde `profissionais.usuario_id = auth.uid()`.
6. Gatilhos: ao marcar `contas_receber` (ou `parcelas`) como pago, grava a comissão com a regra vigente naquele momento
   (a porcentagem fica congelada no lançamento, então mudar a regra depois não mexe no passado). Ao voltar para pendente, cancela.
7. RPCs: `comissoes_resumo(clinica, ini, fim, profissional)` (totais por profissional: previsto, a pagar, pago),
   `comissoes_fechar(clinica, profissional, ini, fim)` (marca como pagas e cria a despesa), `comissoes_do_profissional(ini, fim)` (visão do próprio).
8. Equipe unificada: RPC `equipe_clinica(clinica)` que junta `usuarios_clinicas` e `profissionais` numa lista só
   (tipo: Profissional ou Equipe; acesso: com login, convite pendente ou sem acesso). `convidar_membro` ganha o parâmetro
   `p_profissional` (true cria ou liga o cadastro em `profissionais`). Trigger: usuário com papel `profissional` sempre tem uma linha em
   `profissionais` ligada por `usuario_id`.
9. Seed: categoria financeira "Comissões" (despesa) para cada clínica que não tiver.

## 4. Telas

### 4.1 Cadastro › Equipe e acessos (vira a lista de todo mundo)
- Filtro no topo: **Todos · Profissionais · Equipe**.
- Colunas: pessoa (foto, nome, função), **Tipo** (Profissional / Equipe), **Acesso** (Com acesso / Convite pendente / Sem acesso),
  papel e módulos, **Comissão** (ex.: "30% padrão" ou "sem"), ativo.
- Botão "Convidar": formulário atual + a marcação "Esta pessoa atende pacientes (é profissional)". Quando marcado, pede especialidade e
  conselho e cria o cadastro de profissional junto, já ligado ao login.
- Linha de profissional sem login: ação "Dar acesso" (manda o convite e liga).
- Linha de usuário com papel profissional sem cadastro de profissional: ação "Completar cadastro profissional".

### 4.2 Cadastro › Profissionais (cadastro do doutor)
- Novo bloco **Comissão**: liga/desliga; porcentagem padrão; base (líquido recebido ou bruto).
- Tabela **Por procedimento**: todos os procedimentos ativos com a coluna "%" editável. Vazio = usa a regra geral.
  Uma linha mostra a porcentagem efetiva e de onde ela vem ("padrão do procedimento", "padrão do profissional").
- Simulador na própria tela: "Toxina R$ 1.200 → comissão R$ 360".

### 4.3 Cadastro › Procedimentos
- Nova coluna/campo **% comissão padrão** (opcional). Vale para quem não tem regra própria.

### 4.4 Onde o dinheiro entra (sem revisão depois)
- **Registrar procedimento** (prontuário), **Nova receita** e **Recebi pagamento** (celular): ao escolher profissional + procedimento,
  aparece a linha informativa "Comissão: 30% = R$ 360,00 (padrão do procedimento)". Só mostra; o lançamento oficial nasce no recebimento.
- Renata: ao propor receita, inclui a comissão no resumo de confirmação.

### 4.5 Financeiro › nova aba **Comissões**
- Filtros: período (mesmo componente das Receitas) e profissional.
- Cards por profissional: previsto (receitas pendentes), a pagar (recebidas e ainda não pagas), pago no período.
- Tabela: data do recebimento, paciente, procedimento, valor base, %, comissão, status; linhas de estorno em vermelho.
- Botão **Marcar como pagas** por profissional (fecha o período e cria a despesa "Comissão · Dra. Camila · out/2026").
- Exportar CSV (grátis, sem biblioteca).

### 4.6 Celular
- Financeiro › Comissões: lista por profissional com os totais e o botão de fechar.
- Para quem é profissional: cartão "Minha comissão do mês" no Início e a lista dos próprios atendimentos.

### 4.7 Renata
- Ferramenta de leitura: "quanto a Dra. Camila tem de comissão este mês?" e "qual a comissão da toxina para o Dr. João?".

## 5. Permissões (no banco, não só na tela)
- Regras e fechamento: `clinicas_gestao()` (dono e gestor) e papel financeiro.
- Leitura dos lançamentos: `clinicas_permitidas('gestao.financeiro')`.
- Profissional: só os próprios lançamentos (`profissionais.usuario_id = auth.uid()`), sem ver os dos colegas.
- Nenhuma função nova com `execute` para `anon`.

## 6. Etapas de execução, com teste em cada uma

| Etapa | Entrega | Teste |
|---|---|---|
| 1. Banco | migration com campos, tabelas, função da regra, gatilhos, RPCs, RLS, seed da categoria | SQL de ponta a ponta: cria regra, marca receita como recebida, confere a comissão; estorna e confere o cancelamento; parcelado |
| 2. Cadastro | Equipe unificada, bloco Comissão no profissional, % no procedimento | Playwright (computador e celular): convidar profissional, editar %, ver a porcentagem efetiva |
| 3. Entrada do dinheiro | linha informativa em Registrar procedimento, Nova receita, Recebi pagamento e Renata | Playwright: escolher profissional + procedimento e ver o valor |
| 4. Financeiro › Comissões | aba, filtros, tabela, fechamento com despesa, CSV, celular | Playwright + SQL: fechar período e conferir a despesa criada |
| 5. Docs e publicação | CLAUDE.md, docs/database.md, docs/frontend.md; commit; publicar só com "publicar" | teste item a item das telas tocadas |

Estimativa: 1 sessão de trabalho para as etapas 1 e 2, outra para 3 a 5. Custo: zero (tudo no Supabase e no front atuais).

## 7. O que fica de fora desta versão
- Impostos, taxas de cartão, metas e bônus por volume, folha de pagamento, controle de ponto.
- Comissão para a equipe de recepção/vendas (pode entrar depois usando a mesma tabela `comissoes_regras`, com `usuario_clinica_id`).

## 8. Perguntas para o fundador (respondo com o padrão da seção 2 se não houver resposta)
1. A comissão é sobre o valor líquido recebido (padrão) ou sobre o bruto?
2. Nasce quando o dinheiro entra (padrão) ou quando o procedimento é registrado como realizado?
3. Em venda parcelada, comissão por parcela recebida (padrão) ou tudo no primeiro recebimento?
4. O fechamento deve gerar a despesa automaticamente em Despesas (padrão: sim)?
5. Recepção/vendas também terá comissão agora, ou só os profissionais (padrão: só profissionais)?
