# Auditoria 02 — Mapa do banco de dados "Salute IA"

Data: 2026-10-09 · Projeto: **"Salute IA novo visual"** (`gbhsslyoybqjvjznlave`, Postgres 17) · Modo: **somente leitura**.

Como foi feito: consultas só de catálogo (estrutura do banco: `pg_catalog`, `information_schema`, `pg_policies`, `pg_trigger`, `pg_proc`, `storage.buckets`), ferramentas do Supabase (lista de tabelas com contagem de linhas, migrations, extensões, advisors de segurança e desempenho) e leitura do código da edge function `renata`. **Nenhum dado de paciente foi lido.** A única consulta em tabela de negócio foi uma contagem agrupada de `mensagens` por direção/status e de `instancias_whatsapp` por status (só números). O projeto antigo `pigfhkmtqyatuaudpgyy` não foi tocado. Nenhum segredo foi copiado para este documento.

Legenda: **[confirmado]** = visto no banco/código · **[inferido]** = conclusão provável, não comprovada · **"não confirmado"** = não deu para verificar com o acesso disponível.

Abreviações das regras de acesso (RLS) usadas nas tabelas abaixo:

| Sigla | Significa (em linguagem simples) | Função no banco |
|---|---|---|
| **M** | Qualquer membro **ativo e aceito** da clínica (ou a equipe de suporte Salute com entrada aberta) | `minhas_clinicas()` |
| **P(x)** | Membro que tem permissão no módulo `x` (dono e gestor sempre têm; financeiro exige papel "financeiro") | `clinicas_permitidas('x')` |
| **G** | Só **dono ou gestor** da clínica (ou suporte Salute com entrada aberta) | `clinicas_gestao()` |
| **Eu+M** | Só o próprio usuário (`usuario_id = auth.uid()`) e dentro de uma clínica dele | `auth.uid()` + `minhas_clinicas()` |
| **A** | Só administrador da plataforma Salute (`perfis_usuario.admin_plataforma`) | `eh_admin_plataforma()` |
| **Global** | Linhas com `clinica_id` vazio (conteúdo da Salute para todas as clínicas) | `clinica_id IS NULL` |
| S / I / U / D | Ler / Criar / Alterar / Apagar | — |

Módulos (P): `pacientes`, `agenda`, `mensagens` (inclui CRM), `painel`, `gestao.estoque`, `gestao.financeiro`, `perfil.cadastro`, `perfil.canais`.

---

## 1) Resumo executivo

1. O banco tem **115 tabelas** no schema `public`, **todas com RLS ligado** e quase todas com regras amarradas à clínica (`clinica_id`) e ao módulo liberado para o membro. A base de isolamento entre clínicas está **bem feita**. [confirmado]
2. **Achado crítico novo:** um gatilho confirma o e-mail de todo cadastro novo automaticamente (`auto_confirmar_email`) e outro liga esse cadastro a qualquer **convite pendente com o mesmo e-mail** (`novo_usuario` → `ligar_convites`). Quem souber o e-mail de um convidado pode criar a conta antes dele e entrar na clínica. [confirmado no banco; depende do cadastro aberto no Auth — inferido]
3. **A Renata é um "proxy aberto" do Claude:** a função `renata` checa login e vínculo com a clínica, mas aceita do navegador o modelo, o "system prompt", as ferramentas e as mensagens; não aplica limite de uso; e usa a chave padrão da Salute quando a clínica não tem chave (hoje o cofre está vazio). Como qualquer pessoa pode criar conta e clínica, qualquer pessoa pode usar a chave da Salute. [confirmado código / inferido custo]
4. **Membro comum não consegue se dar permissões**: `permissoes` e `usuarios_clinicas` só aceitam gravação de dono/gestor, e um gatilho impede promover alguém a dono sem ser dono. [confirmado]
5. Upload anônimo no armazém `prontuario` **exige token de link válido e não vencido** (24 h); mas a regra não confere se a pasta é da clínica do link — dá para gravar arquivo na pasta de outra clínica. [confirmado]
6. As **26 RPCs** chamadas pelo front existem; todas são `SECURITY DEFINER` com `search_path` fixo e checam login/clínica/papel. As únicas abertas a anônimos são as do link público de anamnese e de documentos (intencionais, protegidas por token). [confirmado]
7. **Ninguém envia WhatsApp:** não há função, gatilho, `pg_cron`, `pg_net` nem webhook que processe `mensagens` pendentes. As 15 mensagens existentes vieram de carga de demonstração. [confirmado]
8. Há **tabelas duplicadas/legadas** (`ia_config` × `renata_configuracoes`; `canais_conectados` × `instancias_whatsapp`) e ~40 tabelas sem tela no front (módulos futuros: tarefas, retornos, convênio/guias, orçamentos, notas fiscais). `ia_config` está **quebrada** (o gatilho de auditoria grava em coluna que não existe). [confirmado]
9. As mudanças de schema estão registradas como **41 migrations no histórico do banco**, mas **não há arquivos de migration no repositório** — e 16 delas são carga de **dados fictícios** (mock) no banco de produção. [confirmado]
10. Advisors: 9 funções `SECURITY DEFINER` executáveis por anônimo, proteção contra senha vazada desligada, 2 funções sem `search_path`, 116 chaves estrangeiras sem índice (113 são `criado_por`), 264 índices nunca usados (normal com pouco volume). [confirmado]

---

## 2) Visão geral do schema

### Grupos de tabelas

| Grupo | Tabelas |
|---|---|
| Acesso e contas | `perfis_usuario`, `clinicas`, `usuarios_clinicas`, `permissoes`, `preferencias_usuario`, `notificacoes`, `acessos_suporte`, `auditoria` |
| Cadastros da clínica | `configuracoes_clinica`, `horarios_funcionamento`, `consultorios`, `profissionais`, `procedimentos`, `profissionais_procedimentos`, `horarios_profissional`, `tipos_agendamento`, `status_agendamento`, `feriados`, `convenios`, `convenio_planos`, `etiquetas` |
| Pacientes e prontuário | `pacientes`, `pacientes_telefones`, `pacientes_etiquetas`, `historico_paciente`, `anamnese_modelos`, `anamnese_blocos`, `anamnese_perguntas`, `anamnese_envios`, `anamnese_respostas`, `mapeamento_modelos`, `mapeamentos`, `mapeamento_marcacoes`, `procedimentos_realizados`, `procedimento_insumos`, `pastas_documentos`, `links_envio_documentos`, `documentos_paciente`, `comparacoes_antes_depois` |
| Agenda | `agendamentos`, `bloqueios_horario`, `fila_espera`, `retornos_programados`, `retorno_tentativas_contato` |
| CRM | `funis`, `etapas_funil`, `origens_lead`, `motivos_perda`, `leads`, `movimentacoes_lead` |
| Mensagens (WhatsApp) | `instancias_whatsapp`, `canais_conectados`, `conversas`, `mensagens`, `conversa_leituras`, `etiquetas_conversa`, `respostas_rapidas`, `figurinhas`, `anexos_mensagem`, `reacoes_mensagem` |
| Chat da equipe | `canais_equipe`, `participantes_canal`, `mensagens_equipe` (+ `anexos_mensagem`, `reacoes_mensagem`) |
| Tarefas | `tarefas`, `tarefa_responsaveis`, `tarefa_comentarios`, `tarefa_checklist` |
| Financeiro | `formas_pagamento`, `contas_bancarias`, `categorias_financeiras`, `contas_receber`, `contas_pagar`, `parcelas`, `orcamentos`, `orcamento_itens`, `metas_profissional`, `configuracao_nota_fiscal`, `notas_fiscais` |
| Convênio (TISS) | `guias`, `guia_dados`, `guia_autorizacoes`, `guia_execucoes`, `guia_sessoes`, `convenio_faturamentos`, `convenio_faturamento_guias`, `convenio_glosas` |
| Estoque | `categorias_produto`, `unidades_medida`, `fornecedores`, `produtos`, `lotes`, `movimentacoes_estoque`, `procedimento_kit_padrao` |
| IA Renata | `renata_configuracoes`, `renata_voz`, `renata_horarios`, `renata_instrucoes`, `renata_base_conhecimento`, `renata_conversas`, `renata_mensagens`, `renata_acoes`, `renata_consumo`, `ia_config` (legado) |
| Assinatura | `planos`, `assinaturas_clinica`, `historico_assinatura` |
| Conteúdos Salute | `flix_categorias`, `flix_conteudos`, `flix_aulas`, `flix_progresso`, `cast_episodios`, `parceiros`, `cupons_parceiros`, `selos_certificacoes` |
| Segredos | `segredos_integracao` (ponteiros para o cofre Vault) |

Padrão de colunas [confirmado]: quase todas as tabelas têm `id uuid` (chave primária), `clinica_id` (obrigatório, exceto nas de conteúdo global), `criado_em`, `atualizado_em`, `criado_por` (→ `perfis_usuario`, preenchido com `auth.uid()`), e `excluido_em` (exclusão "lógica": o registro é marcado, não apagado). Só `clinicas` e `perfis_usuario` não têm `clinica_id`.

### Relações principais (simplificado)

```
auth.users ──(gatilho)──> perfis_usuario ──< usuarios_clinicas >── clinicas
                                                   │                    │
                                              permissoes                │ (clinica_id em ~113 tabelas)
                                                                        │
   ┌──────────────┬──────────────┬───────────────┬──────────────┬───────┴──────┬──────────────┐
pacientes    profissionais   procedimentos    funis           instancias_     produtos     renata_*
   │  │            │  │           │  │          │               whatsapp        │  │
   │  │            │  └─< profissionais_procedimentos           │               │  └─< lotes
   │  │            │              │             etapas_funil    conversas ───< mensagens
   │  │            │              │               │               │                   │
   │  └──────< agendamentos >─────┘               └──< leads >────┘          movimentacoes_estoque
   │             │  (status_agendamento, tipos_agendamento,     │                 ▲
   │             │   consultorios, lead, conversa)              └──< movimentacoes_lead
   │             │                                                                 │
   │      procedimentos_realizados ──< procedimento_insumos ── (gatilho baixa estoque)┘
   │             │
   │      contas_receber ──< parcelas >── contas_pagar ── fornecedores
   │
   ├──< anamnese_envios ──< anamnese_respostas >── anamnese_perguntas >── anamnese_blocos >── anamnese_modelos
   ├──< pastas_documentos ──< documentos_paciente >── links_envio_documentos
   ├──< mapeamentos ──< mapeamento_marcacoes   (mapeamento_modelos)
   ├──< historico_paciente, pacientes_telefones, pacientes_etiquetas, orcamentos, guias, retornos_programados
   └──  convenios ──< convenio_planos

planos ──< assinaturas_clinica (1 por clínica) · historico_assinatura
```

---

## 3) Inventário por tabela

Colunas: **Linhas** = contagem aproximada do Supabase. **PK** é sempre `id` (uuid) [confirmado]; por isso a coluna PK foi omitida. **FKs** omitem `clinica_id → clinicas` e `criado_por → perfis_usuario`, que existem em quase todas. **Front?** = aparece na lista de tabelas que o front acessa (Auditoria 01); "indireto" = o front só usa via RPC, gatilho ou junção.

### Acesso e contas

| Tabela | Finalidade | FKs principais | Linhas | RLS (S / I / U) | Front? módulo |
|---|---|---|---|---|---|
| perfis_usuario | Perfil de cada login (nome, foto, admin da plataforma, clínica ativa) | id→auth.users, clinica_ativa_id→clinicas | 2 | S: eu, colegas de clínica ou A · U: só eu · I: nenhuma (criado por gatilho) | Sim — login, Minha conta |
| clinicas | Cadastro da clínica | — | 1 | S: A ou M · U: A, P(perfil.cadastro) ou G · I: nenhuma (só RPC `criar_clinica`) — regras no papel `public` | Sim — Configurações, cabeçalho |
| usuarios_clinicas | Vínculo pessoa↔clínica, papel, dono, convite | usuario_id→perfis_usuario | 5 | S: M · I/U: G (+ gatilho protege "dono") | Sim — Equipe e acessos |
| permissoes | Módulos liberados por membro | usuario_clinica_id→usuarios_clinicas | 0 | S: M · I/U: G | Sim — Equipe e acessos (upsert direto) |
| preferencias_usuario | Filtros/abas/avisos de cada usuário | usuario_id | 1 | S/I/U: Eu+M | Sim — várias telas |
| notificacoes | Avisos do sino | usuario_id, conversa_id | 16 | S/I/U: Eu+M | Sim — sino (realtime) |
| acessos_suporte | Entradas do suporte Salute numa clínica | usuario_id | 7 | S: G · gravação só por RPC | Indireto — `admin_*`, `meu_contexto` |
| auditoria | Quem alterou o quê | — | 236 | S: G · gravação só por gatilho/RPC | Não (nenhuma tela lê) [inferido] |

### Cadastros da clínica

| Tabela | Finalidade | FKs principais | Linhas | RLS (S / I / U) | Front? módulo |
|---|---|---|---|---|---|
| configuracoes_clinica | Regras gerais, primeiros passos | — | 1 | S: M · I/U: P(perfil.cadastro) ou G | Sim — Configurações > Clínica |
| horarios_funcionamento | Horário por dia da semana | — | 7 | idem acima | Sim — Configurações |
| consultorios | Salas | — | 3 | idem acima | Não direto (FK em agendamentos) |
| profissionais | Quem atende (com ou sem login) | usuario_id | 3 | idem acima | Sim — Agenda, Configurações |
| profissionais_procedimentos | Quem faz qual procedimento | profissional_id, procedimento_id | 16 | idem acima | Sim — Configurações |
| horarios_profissional | Agenda de trabalho do profissional | profissional_id | 13 | S: M · I/U: P(agenda) ou P(perfil.cadastro) | Não [inferido: sem tela] |
| tipos_agendamento / status_agendamento | Listas da agenda | — | 5 / 7 | S: M · I/U: P(perfil.cadastro) ou G | Sim — Agenda |
| procedimentos | Procedimentos, preço e duração | categoria_financeira_id | 10 | S: M · I/U: P(cadastro), P(fin) ou G | Sim — Agenda, Financeiro, Renata |
| convenios / convenio_planos | Convênios e planos | convenio_id | 0 / 0 | S: M · I/U: P(cadastro), P(pacientes) ou P(fin) | convenios: Sim · planos: Não |
| etiquetas | Etiquetas de paciente/conversa | — | 7 | S/I/U: M | Não |
| feriados | Feriados da clínica | criado_por→**auth.users** (fora do padrão) | 0 | **ALL (S/I/U/D)** para qualquer vínculo não excluído (não confere `ativo`) — papel `public` | Não |

### Pacientes e prontuário

| Tabela | Finalidade | FKs principais | Linhas | RLS (S / I / U) | Front? módulo |
|---|---|---|---|---|---|
| pacientes | Cadastro do paciente | convenio_id, convenio_plano_id | 24 | S/I/U: P(pacientes), P(mensagens) ou P(agenda) | Sim — Pacientes, Agenda, Mensagens |
| pacientes_telefones | Histórico de números | paciente_id | 24 | S/I/U: P(pacientes) | Junção — ficha do paciente |
| pacientes_etiquetas | Etiquetas no paciente | paciente_id, etiqueta_id | 0 | P(pacientes) | Não |
| historico_paciente | Linha do tempo do paciente | paciente_id, usuario_id | 25 | S: P(pac) ou P(msg) · I/U: P(pac), P(msg) ou P(agenda) | Sim — ficha |
| anamnese_modelos / _blocos / _perguntas | Modelos de anamnese | modelo_id, bloco_id | 0 / 0 / 0 | S: M · I/U: P(cadastro) ou P(pacientes) | Sim — Anamnese |
| anamnese_envios | Envio da anamnese (token, assinatura, rascunho) | paciente_id, modelo_id | 0 | P(pacientes) | Sim — Anamnese (realtime) |
| anamnese_respostas | Respostas | envio_id, pergunta_id | 0 | P(pacientes) | Junção / RPC `responder_anamnese` |
| mapeamento_modelos | Imagens base do mapeamento | — | 4 | S: Global ou M · I/U: A ou P(pacientes) na própria clínica | Não direto [inferido: via mapeamentos] |
| mapeamentos / mapeamento_marcacoes | Mapa facial/corporal e marcações | paciente_id, profissional_id, produto_id | 1 / 3 | P(pacientes) | Sim — Prontuário |
| procedimentos_realizados | Procedimento feito no paciente | paciente_id, agendamento_id, mapeamento_id | 0 | P(pacientes) | Sim — Prontuário |
| procedimento_insumos | Material usado (dá baixa no estoque) | procedimento_realizado_id, produto_id, lote_id | 0 | P(pacientes) | Sim — Prontuário |
| pastas_documentos / documentos_paciente | Pastas e arquivos do paciente | paciente_id, pasta_id, link_envio_id | 0 / 0 | P(pacientes) | Sim — Documentos (realtime) |
| links_envio_documentos | Link/QR para o paciente enviar arquivos (token 24 h) | paciente_id, pasta_id | 0 | P(pacientes) · anônimo só via RPC | Sim — Documentos / página pública |
| comparacoes_antes_depois | Antes e depois | 3×documento_id, paciente_id | 0 | P(pacientes) | Sim — Prontuário |

### Agenda

| Tabela | Finalidade | FKs principais | Linhas | RLS | Front? |
|---|---|---|---|---|---|
| agendamentos | Consultas | paciente, profissional, procedimento, consultorio, status, tipo, lead, conversa | 34 | S/I/U: P(agenda), P(pacientes) ou P(mensagens) | Sim — Agenda (realtime), Painel, Renata |
| bloqueios_horario | Bloqueios | profissional, consultorio | 0 | S: M · I/U: P(agenda) | Sim — Agenda |
| fila_espera | Fila de espera | paciente, agendamento | 0 | P(agenda) | Não |
| retornos_programados / retorno_tentativas_contato | Módulo Retornos (sem tela) | paciente, agendamento, retorno_id | 0 / 0 | P(pacientes) ou P(agenda) | Não |

### CRM

| Tabela | Finalidade | FKs principais | Linhas | RLS | Front? |
|---|---|---|---|---|---|
| funis / etapas_funil | Funis e etapas | funil_id | 1 / 6 | S: M · I/U: P(mensagens) ou G | Sim — CRM |
| origens_lead / motivos_perda | Listas do CRM | pai_id (origem) | 14 / 6 | idem | Sim — CRM |
| leads | Leads | etapa, funil, paciente, conversa, agendamento, origem, motivo | 14 | S: P(mensagens) ou P(painel) · I/U: P(mensagens) | Sim — CRM (realtime) |
| movimentacoes_lead | Histórico de etapas (gatilho) | lead_id, etapas | 22 | idem leads | Indireto (gatilho) |

### Mensagens e chat da equipe

| Tabela | Finalidade | FKs principais | Linhas | RLS | Front? |
|---|---|---|---|---|---|
| instancias_whatsapp | Números de WhatsApp conectados | — | 0 | S: M · I/U: P(perfil.canais) ou G | Sim — Configurações > WhatsApp |
| canais_conectados | Canais genéricos (Instagram/Facebook "em breve") | — | 0 | idem | **Não** |
| conversas | Conversa por número/contato | instancia_whatsapp, paciente, lead, atendente | 8 | P(mensagens) ou P(pacientes) | Sim — Mensagens (realtime) |
| mensagens | Mensagens do WhatsApp | conversa, resposta_a, figurinha | 15 | P(mensagens) ou P(pacientes) | Sim — Mensagens (realtime) |
| conversa_leituras | Quem leu a conversa | conversa, usuario | 1 | Eu+M | Indireto — RPC `marcar_conversa_lida` |
| etiquetas_conversa | Etiquetas na conversa | conversa, etiqueta | 0 | P(mensagens) | Não |
| respostas_rapidas | Respostas prontas | — | 0 | S: M · I/U: P(mensagens) | Não |
| figurinhas | Figurinhas (globais ou da clínica) | — | 0 | S: Global ou M · I/U: A ou P(mensagens) | Sim |
| anexos_mensagem / reacoes_mensagem | Anexos e reações (WhatsApp e equipe) | mensagem_id, mensagem_equipe_id | 0 / 0 | P(mensagens) ou P(pacientes) | Sim |
| canais_equipe / participantes_canal / mensagens_equipe | Chat interno | canal_id, usuario_id | 0 / 0 / 0 | P(mensagens) | Sim — chat da equipe (realtime) |

### Tarefas (sem tela)

| Tabela | Finalidade | Linhas | RLS | Front? |
|---|---|---|---|---|
| tarefas, tarefa_responsaveis, tarefa_comentarios, tarefa_checklist | Módulo Tarefas | 0 | S/I/U: M | Não (mas estão no realtime) |

### Financeiro e convênio

| Tabela | Finalidade | FKs principais | Linhas | RLS | Front? |
|---|---|---|---|---|---|
| formas_pagamento | Formas de pagamento | — | 6 | S: M · I/U: P(fin), P(cadastro) ou G | Sim — Financeiro |
| contas_bancarias | Contas | — | 3 | P(fin) | Sim |
| categorias_financeiras | Categorias | — | 8 | S: M · I/U: P(fin) | Sim |
| contas_receber | Receitas | paciente, agendamento, procedimento, profissional, convênio, renata_acao | 16 | P(fin) | Sim — Financeiro, Painel |
| contas_pagar | Despesas | fornecedor, categoria, conta, renata_acao | 10 | P(fin) | Sim |
| parcelas | Parcelas | conta_receber, conta_pagar | 0 | P(fin) | Sim |
| metas_profissional | Metas | profissional | 12 | P(fin) | Sim |
| configuracao_nota_fiscal | Config. fiscal (senha no Vault) | — | 0 | P(fin) | Sim |
| notas_fiscais | Notas emitidas | conta_receber, paciente | 0 | P(fin) | Não |
| orcamentos / orcamento_itens | Orçamentos (sem tela) | paciente, profissional, procedimento | 8 / 18 | P(pacientes) ou P(fin) | Não |
| guias, guia_dados, guia_autorizacoes, guia_execucoes, guia_sessoes | Guias TISS | convenio, paciente, agendamento | 0 | P(pacientes) ou P(fin) | Não |
| convenio_faturamentos, convenio_faturamento_guias, convenio_glosas | Faturamento de convênio | convenio, guia | 0 | P(fin) | Não |

### Estoque

| Tabela | Finalidade | FKs principais | Linhas | RLS | Front? |
|---|---|---|---|---|---|
| categorias_produto / unidades_medida | Listas | — | 5 / 5 | S: M · I/U: P(estoque) | Sim — Estoque |
| fornecedores | Fornecedores | — | 4 | S: M · I/U: P(cadastro), P(fin) ou P(estoque) | Sim |
| produtos | Produtos; saldo mantido por gatilho | categoria, unidade, fornecedor | 10 | S: M · I/U: P(estoque) | Sim — Estoque, Renata |
| lotes | Lotes e validade | produto, fornecedor | 6 | S: M · I/U: P(estoque) | Sim |
| movimentacoes_estoque | Entradas/saídas | produto, lote, conta_pagar, procedimento_realizado, renata_acao | 18 | S/I/U: P(estoque) | Sim |
| procedimento_kit_padrao | Kit sugerido por procedimento | procedimento, produto | 0 | S: M · I/U: P(cadastro), P(estoque) ou G | Sim |

### IA Renata

| Tabela | Finalidade | Linhas | RLS | Front? |
|---|---|---|---|---|
| renata_configuracoes | Config. do agente (modelo, limites, ferramentas) | 0 | S: M · I/U: G | Sim — Configurações > Renata |
| renata_voz | Voz ElevenLabs | 0 | S: M · I/U: G | Sim |
| renata_horarios / renata_instrucoes | Horários e instruções | 0 / 0 | S: M · I/U: G | Não |
| renata_base_conhecimento | Base de conhecimento (global ou da clínica) | 0 | S: Global ou M · I/U: A ou G | Não |
| renata_conversas / renata_mensagens / renata_acoes | Conversas internas com a Renata e ações propostas | 3 / 22 / 1 | Eu+M | Sim — Renata |
| renata_consumo | Consumo mensal (gravado pelo servidor) | 0 | S: M (sem gravação pelo front) | Sim — leitura |
| ia_config | **Legado**: webhook_url, prompt_base, modo | 0 | S/I/U/**D**: qualquer vínculo (não confere ativo/excluído) — papel `public` | **Não** |

### Assinatura, conteúdos e segredos

| Tabela | Finalidade | Linhas | RLS | Front? |
|---|---|---|---|---|
| planos | Planos Salute (global) | 3 | S: Global · I/U: A | Sim |
| assinaturas_clinica | Plano atual | 0 | S: M · gravação só por RPC `trocar_plano` | Sim |
| historico_assinatura | Histórico/pedidos ao consultor | 0 | S: M · gravação por RPC | Indireto |
| flix_categorias, flix_conteudos, flix_aulas, cast_episodios, parceiros, cupons_parceiros, selos_certificacoes | Conteúdos Saluteflix/Cast/parcerias (globais) | 0 | S: **só Global** · I/U: A | Sim (flix_aulas: não) |
| flix_progresso | Progresso do usuário | 0 | Eu+M | Sim |
| segredos_integracao | Ponteiros para chaves no Vault | 0 | **Nenhuma regra** = ninguém do front lê/grava (só RPC/servidor) — intencional | Indireto — RPC `salvar_segredo` |

Outros fatos [confirmado]:
- **Nenhuma tabela tem regra de DELETE** (exceto `ia_config` e `feriados`): o front não consegue apagar de verdade, só marcar `excluido_em`.
- `FORCE ROW LEVEL SECURITY` está ligado em todas, exceto `perfis_usuario`, `feriados` e `ia_config`.
- O papel `anon` (visitante sem login) **não tem permissão em nenhuma tabela** do `public`.
- Realtime publica: `notificacoes, agendamentos, anamnese_envios, documentos_paciente, leads, conversas, mensagens, canais_equipe, participantes_canal, mensagens_equipe, reacoes_mensagem, tarefas, tarefa_comentarios, tarefa_checklist`. O realtime respeita a RLS de cada tabela.
- Índices: 467 no total; 135 começam por `clinica_id` e **toda tabela com `clinica_id` tem índice nele**. Únicos relevantes: um vínculo por pessoa/clínica, um convite por e-mail/clínica, CPF/WhatsApp/nº de prontuário únicos por clínica, um `renata_configuracoes`/`renata_voz`/`configuracoes_clinica`/`assinaturas_clinica` por clínica, `renata_consumo` por clínica/ano/mês, tokens de anamnese e de links únicos.

---

## 4) Funções / RPCs

Todas as funções abaixo estão no schema `public`. Coluna "anon?" = o visitante sem login pode executar (via `has_function_privilege`). [confirmado]

### As 26 RPCs chamadas pelo front (todas existem)

| Nome | Definer/Invoker | search_path | Checa permissão? | anon? | Observação |
|---|---|---|---|---|---|
| aceitar_termos | Definer | public | Sim: exige login; só altera o próprio perfil | Não | OK |
| admin_clinicas | Definer | public | Sim: `eh_admin_plataforma()` | Não | Lista todas as clínicas (só Salute) |
| admin_definir_acesso | Definer | public | Sim: admin; impede bloquear o único dono | Não | Grava auditoria |
| admin_entrar_clinica | Definer | public | Sim: admin; registra IP/navegador | Não | Abre "acesso de suporte" com prazo |
| admin_membros | Definer | public | Sim: admin | Não | Lê `auth.users` (e-mail confirmado) |
| admin_registrar_envio | Definer | public | Sim: admin | Não | Só grava auditoria |
| admin_sair_clinica | Definer | public | Só afeta o próprio usuário | Não | OK |
| anamnese_publica | Definer | public | Por **token** (144 bits) | **Sim** | Intencional (página pública). Devolve nome da clínica, primeiro nome do paciente e perguntas |
| avisar_receitas_vencidas | Definer | public | Sim: `pode(clínica,'gestao.financeiro')` | Não | Cria aviso no sino |
| concluir_cadastro | Definer | public | Sim: exige login; usa metadados do próprio cadastro | Não | Chama `criar_clinica` |
| convidar_membro | Definer | public | Sim: só G; proíbe convidar como "dono" | Não | Pode convidar como **gestor** |
| criar_clinica | Definer | public | Exige login — **qualquer usuário logado cria quantas clínicas quiser** | Não | Vira dono e recebe dados padrão |
| link_documentos_publico | Definer | public | Por token | **Sim** | Intencional. Devolve status e a pasta de upload |
| marcar_conversa_lida | Definer | public | Sim: P(mensagens) ou P(pacientes) | Não | OK |
| marcar_primeiro_passo | Definer | public | Sim: P(perfil.cadastro) ou G | Não | OK |
| meu_contexto | Definer | public | Escopo `auth.uid()` | Não | Perfil, clínicas, papel, suporte |
| painel_mes | Definer | public | Sim: `pode(clínica,'painel')` | Não | Agrega dados da clínica |
| pedir_consultor | Definer | public | Sim: M | Não | Grava em `historico_assinatura` |
| primeiros_passos | Definer | public | Sim: P(perfil.cadastro) ou G | Não | OK |
| regerar_link_anamnese | Definer | public, extensions | Sim: P(pacientes) | Não | Gera novo token |
| registrar_documento_link | Definer | public | Por token; confere que o caminho está na pasta do link | **Sim** | Intencional. Não confere se o arquivo existe de fato |
| registrar_leitura | Definer | public | Sim: M | Não | Auditoria de leitura |
| responder_anamnese | Definer | public, extensions | Por token; valida obrigatórias e assinatura | **Sim** | Intencional |
| salvar_rascunho_anamnese | Definer | public | Por token; limita 200 KB | **Sim** | Intencional |
| salvar_segredo | Definer | public, extensions | Sim: chave padrão só A; WhatsApp P(perfil.canais); fiscal P(fin); demais (Anthropic/ElevenLabs) G | Não | Guarda no Vault, mostra só os 4 últimos caracteres |
| trocar_plano | Definer | public | Sim: só dono | Não | **Troca de plano sem cobrança** (não há pagamento) |

### Outras funções (não chamadas diretamente pelo front)

| Nome | Tipo | anon? | Observação |
|---|---|---|---|
| minhas_clinicas, clinicas_permitidas, clinicas_gestao, clinica_suporte, eh_admin_plataforma, pode, pasta_membro, pasta_permitida | Definer (helpers de RLS) | Não (só authenticated) | Base de toda a segurança; corretas |
| membro_pode, padrao_papel, quer_aviso, hoje_br, num_br | helpers | Não | `padrao_papel`: recepção/profissional → pacientes, agenda, mensagens; financeiro → painel, gestão, financeiro |
| ler_segredo | Definer | Não (nem authenticated) | Lê o Vault; usada só pela edge function com service role. Ok |
| renata_registrar_consumo | Definer | Não (nem authenticated) | Usada só pela edge function |
| painel_resumo | Definer | Não | Checa `painel`; **front não usa** (substituída por `painel_mes`) [inferido] |
| alertas_paciente | **Invoker** | Não | Respeita RLS; front não usa [inferido] |
| criar_modelos_padrao_anamnese, semear_padroes_clinica, ligar_convites | Definer | Não | Internas |
| auto_confirmar_email, criar_perfil_usuario, ia_config_auditoria | Definer (funções de gatilho) | **Sim** | Apontadas pelo advisor; como são de gatilho, não rodam se chamadas direto — risco baixo, mas devem ser fechadas |
| set_ia_config_atualizado_em, ia_config_auditoria | — | Sim | **Sem `search_path` fixo** (advisor) |

---

## 5) Gatilhos (triggers)

| Gatilho / função | Tabelas | Quando | O que faz [confirmado] |
|---|---|---|---|
| `on_auth_user_created_auto_confirm` → `auto_confirmar_email` | auth.users | antes de criar | **Marca o e-mail como confirmado automaticamente** (migration `auto_confirm_email_novos_usuarios`, 06/10) |
| `on_auth_user_created` → `novo_usuario` | auth.users | depois de criar | Cria `perfis_usuario`; se e-mail confirmado, chama `ligar_convites` (aceita convites pendentes com o mesmo e-mail) |
| `on_auth_user_updated` → `usuario_atualizado` | auth.users | depois de alterar | Sincroniza e-mail no perfil; ao confirmar e-mail, liga convites |
| `tg_perfis_proteger` → `perfis_proteger` | perfis_usuario | antes de alterar | Impede o usuário de se tornar admin da plataforma, de trocar e-mail sem trocar o login e de mudar a data de aceite dos termos |
| `tg_usuarios_clinicas_proteger` | usuarios_clinicas | antes de criar/alterar | Só dono indica outro dono; só dono rebaixa/bloqueia dono; clínica sempre fica com 1 dono |
| `tg_*_auditoria` → `auditar` | 25 tabelas: agendamentos, anamnese_envios/respostas, anexos_mensagem, comparacoes_antes_depois, contas_receber, conversas, documentos_paciente, guias, guia_dados, guia_execucoes, historico_paciente, leads, links_envio_documentos, mapeamentos, mapeamento_marcacoes, mensagens, notas_fiscais, orcamentos, pacientes, pacientes_telefones, procedimento_insumos, procedimentos_realizados, renata_mensagens, retornos_programados | depois de criar/alterar/apagar | Grava em `auditoria` antes/depois e colunas alteradas |
| `tg_movimentacoes_estoque_saldo` → `estoque_aplicar_movimentacao` | movimentacoes_estoque | antes de criar | Atualiza o saldo do produto; bloqueia saldo negativo |
| `tg_produtos_saldo` → `produtos_proteger_saldo` | produtos | antes de alterar | Impede mudar o saldo "na mão" (só via movimentação) |
| `tg_produtos_entrada_inicial` | produtos | depois de criar | Gera movimentação "Estoque inicial" |
| `tg_produtos_estoque_minimo` → `avisar_estoque_minimo` | produtos | depois de alterar | Aviso no sino quando atinge o mínimo |
| `tg_procedimento_insumos_baixa` → `procedimento_baixa_estoque` | procedimento_insumos | depois de criar | Dá baixa no estoque se o procedimento está "realizado" |
| `tg_agendamentos_aviso` → `avisar_novo_agendamento` | agendamentos | depois de criar | Aviso no sino para a equipe/profissional |
| `tg_leads_movimentacao` → `lead_movimentacao` | leads | depois de criar/alterar | Grava histórico em `movimentacoes_lead` |
| `tg_mensagens_conversa` → `mensagem_atualiza_conversa` | mensagens | depois de criar | Atualiza prévia/hora/não lidas da conversa e última interação do lead |
| `tg_pacientes_telefone` / `tg_pacientes_prontuario` | pacientes | criar/alterar | Histórico de números; nº de prontuário sequencial |
| `ia_config_auditoria_trigger`, `ia_config_atualizado_em_trigger` | ia_config | criar/alterar | **Quebrado:** grava na coluna `operacao` (não existe; a coluna é `acao`) e sem `clinica_id` (obrigatório) → qualquer gravação em `ia_config` falha |
| `tg_*_atualizado` → `tocar_atualizado_em` | ~108 tabelas | antes de alterar | Atualiza `atualizado_em` |

Não auditadas [confirmado]: `usuarios_clinicas`, `permissoes`, `clinicas`, `contas_pagar`, `produtos`, `movimentacoes_estoque`, `segredos_integracao`, `instancias_whatsapp`, `renata_configuracoes` (exceto o que as RPCs `admin_*` registram).
Função `criar_perfil_usuario` existe mas **não está ligada a nenhum gatilho** (duplicata de `novo_usuario`).

---

## 6) Storage (arquivos)

Todos os buckets são **privados** (acesso só por URL assinada ou regra). [confirmado]

| Bucket | Limite/arquivo | Tipos | Ler (S) | Enviar (I) / Trocar (U) | Usado pelo front? |
|---|---|---|---|---|---|
| clinica | 10 MB | image/* | Qualquer membro da clínica (pasta = clinica_id) | P(perfil.cadastro); ou a própria pasta `<clinica>/usuarios/<meu id>/` | Sim (logo, fotos) |
| prontuario | 50 MB | **qualquer** | P(pacientes) | P(pacientes) · **anônimo**: regra `salute_prontuario_link_paciente` | Sim |
| mensagens | 100 MB | qualquer | P(mensagens) ou P(pacientes) | idem | Sim |
| fiscal | 1 MB | qualquer | P(gestao.financeiro) | idem | Sim |
| conteudos | 20 MB | image/* | **qualquer usuário logado de qualquer clínica** (`... AND true`) | Só A | Sim |
| pacientes | 10 MB | image/* | P(pacientes) ou P(mensagens) | idem | **Não** [confirmado por busca] |
| comprovantes | 20 MB | qualquer | P(gestao.financeiro) | idem | **Não** [confirmado por busca] |

Nenhum bucket tem regra de DELETE (arquivos não são apagados pelo front).

**Upload anônimo no `prontuario`** [confirmado]:
- Regra para `anon` e `authenticated`: bucket `prontuario` **e** 2ª pasta = `links` **e** `link_documentos_valido(3ª pasta)` — ou seja, o token do link precisa existir, estar "aguardando/recebido", não excluído e **dentro da validade (24 h)**. O token tem 36 caracteres hexadecimais (144 bits) — impossível de adivinhar.
- Depois do upload, o front chama `registrar_documento_link`, que confere o token **e** que o caminho começa com `<clinica do link>/links/<token>/` antes de criar o registro em `documentos_paciente`.
- **Falha:** a regra do Storage **não confere a 1ª pasta (a clínica)**. Quem tem um token válido da clínica A pode gravar em `<clínica B>/links/<token A>/arquivo` — o arquivo cai na área da clínica B (sem registro na tabela, mas visível para quem lista a pasta). Também não há limite de tipo de arquivo nem de quantidade enquanto o link vale.

---

## 7) Edge functions

Só existe **uma**: `renata` (versão 2, `verify_jwt = true`). Não existe `whatsapp` (o front monta a URL de webhook `/functions/v1/whatsapp`, que daria 404). [confirmado]

Comportamento da `renata` [confirmado pelo código]:
- **Login:** além do `verify_jwt` da plataforma, valida o token com `auth.getUser`. ✔
- **Clínica:** confere vínculo ativo/aceito em `usuarios_clinicas` para o `clinica_id` enviado, ou acesso de suporte aberto. ✔ (não confere **permissão por módulo**: qualquer papel usa a Renata)
- **Chave:** usa `ler_segredo` (chave da clínica → chave padrão Salute no Vault) e, se não houver, os segredos da função (`ANTHROPIC_API_KEY`, `ELEVENLABS_API_KEY`). Hoje o Vault tem **0 segredos** → todas as clínicas usam a chave da função (da Salute), se ela estiver configurada (não confirmado).
- **Ações:** `status`, `testar`, `chat`, `voz`, `transcrever`. (O "remarcar" citado na Auditoria 01 é ação de ferramenta da Renata no front, não da edge function.)
- **`chat` = proxy aberto:** repassa ao Claude `model`, `system`, `tools` e `messages` **vindos do navegador**. Única trava: o modelo precisa começar com `claude-` e `max_tokens` ≤ 2000. Ignora `renata_configuracoes` (modelo, limites, ferramentas habilitadas). **Não verifica o limite mensal** (`renata_consumo.limite_mensagens`); o contador de mensagens só soma quando o próprio navegador manda `primeira: true`.
- **`voz`:** aceita `voice_id` e `modelo` do navegador; texto cortado em 1.600 caracteres.
- CORS liberado para qualquer site (`*`) — o JWT ainda é exigido.
- Grava consumo via `renata_registrar_consumo` e o resultado do teste em `renata_configuracoes`.

---

## 8) Riscos de isolamento e segurança

| # | Nível | Risco | Evidência | Status | Como corrigir depois (1 linha) |
|---|---|---|---|---|---|
| S1 | **Crítico** | **Sequestro de convite / e-mail nunca verificado.** Todo cadastro novo nasce "confirmado" e é ligado automaticamente a convites pendentes com o mesmo e-mail. Quem souber o e-mail de um convidado (ex.: nova recepcionista) e se cadastrar antes entra na clínica com o papel do convite (pode ser gestor) e vê pacientes. Também permite criar contas com e-mail de outra pessoa. | gatilhos `on_auth_user_created_auto_confirm` (`auto_confirmar_email`) + `on_auth_user_created` (`novo_usuario` → `ligar_convites`); migration `auto_confirm_email_novos_usuarios` | confirmado (banco) / inferido (cadastro aberto no Auth — o front usa `signUp`) | Remover a auto-confirmação e só ligar convites após confirmação real do e-mail (ou exigir aceite com token do convite). |
| S2 | **Alto** | **Renata como "Claude grátis" com a chave da Salute.** Qualquer pessoa cria conta → `criar_clinica` → chama `renata` com prompt/modelo/ferramentas livres, sem limite de uso, cobrado na chave padrão. | edge `renata` (ação `chat`: `system: p.system, tools: p.tools, model: p.model`); `criar_clinica` sem restrição; `renata_consumo.limite_mensagens` não usado; Vault vazio | confirmado (código) / inferido (custo) | Montar system/tools/modelo no servidor a partir de `renata_configuracoes` e bloquear acima do limite do plano. |
| S3 | **Médio** | Upload anônimo no `prontuario` pode cair na pasta de **outra clínica** e aceita qualquer tipo/quantidade enquanto o link vale. | policy `salute_prontuario_link_paciente` (não confere `(foldername)[1]`) | confirmado | Exigir na policy que a 1ª pasta seja a clínica do token e limitar tipos (imagem/PDF). |
| S4 | **Médio** | **Gestor tem poder amplo**: promove outros a gestor, concede qualquer permissão, e pode inserir vínculo de qualquer usuário existente (pelo id) direto como "aceito", sem convite. | policies `usuarios_clinicas`/`permissoes` I/U = `clinicas_gestao()`; gatilho só protege "dono" | confirmado | Fazer convites/vínculos só por RPC e exigir aceite do convidado. |
| S5 | **Médio** | Alterações de **equipe, permissões, clínica, despesas e estoque não são auditadas** (difícil investigar abuso). | lista de gatilhos `auditar` (seção 5) | confirmado | Ligar `auditar` em `usuarios_clinicas`, `permissoes`, `clinicas`, `contas_pagar`, `produtos`, `movimentacoes_estoque`. |
| S6 | **Médio** | `ia_config` (legada): qualquer vínculo — **inclusive bloqueado (ativo = false) ou convite pendente** — lê, altera e **apaga**; papel `public`; tem `webhook_url`/`prompt_base`. Hoje vazia e com gatilho quebrado. | policies `ia_config_select/insert/update/delete`; função `ia_config_auditoria` | confirmado | Apagar a tabela (não é usada) ou alinhar à regra `clinicas_gestao()`. |
| S7 | **Médio** | Senha vazada (HaveIBeenPwned) **desligada** no Auth. | advisor `auth_leaked_password_protection` | confirmado | Ligar no painel do Auth. |
| S8 | **Baixo** | `feriados`: qualquer vínculo não excluído (sem conferir `ativo`) grava/apaga; `criado_por` aponta para `auth.users` (fora do padrão). Não usada pelo front. | policy `feriados_clinica` (ALL, papel `public`) | confirmado | Alinhar às regras P(perfil.cadastro) ou remover. |
| S9 | **Baixo** | Quem tem `perfil.cadastro` pode alterar campos sensíveis da clínica (`ativo`, `excluido_em`, `slug`). | policy de UPDATE em `clinicas` | confirmado | Restringir essas colunas a dono/admin via RPC. |
| S10 | **Baixo** | 3 funções de gatilho executáveis por anônimo (`auto_confirmar_email`, `criar_perfil_usuario`, `ia_config_auditoria`) e 2 sem `search_path` fixo. Não exploráveis diretamente. | advisor `anon_security_definer_function_executable`, `function_search_path_mutable` | confirmado | `REVOKE EXECUTE ... FROM anon, authenticated` e fixar `search_path`. |
| S11 | **Baixo** | Bucket `conteudos` legível por qualquer usuário logado de qualquer clínica (`AND true`). Hoje é conteúdo global da Salute, então é intencional; vira vazamento se uma clínica subir conteúdo próprio. | policy `salute_conteudos_ler` | confirmado | Separar pasta global e pastas por clínica. |
| S12 | **Baixo** | Editar uma movimentação de estoque (permitido por RLS) **não recalcula o saldo** → saldo pode divergir. | policy UPDATE em `movimentacoes_estoque`; gatilho só em INSERT | confirmado | Proibir UPDATE de quantidade (lançar estorno). |
| S13 | **Baixo** | `trocar_plano` muda o plano sem cobrança (não há pagamento integrado). | função `trocar_plano` | confirmado | Ligar à confirmação de pagamento. |
| S14 | Info | Sem regra de DELETE em quase todas as tabelas: pedido de exclusão (LGPD) exige ação manual no servidor. | `pg_policies` | confirmado | Criar rotina/RPC de anonimização. |
| OK | — | Isolamento por clínica: **todas** as tabelas com `clinica_id` têm regra ligada a `minhas_clinicas`/`clinicas_permitidas`/`clinicas_gestao`; nenhuma regra `USING (true)` em tabela; `anon` sem acesso a tabelas; `segredos_integracao` fechada; usuário não consegue se tornar admin (`perfis_proteger`). | seções 3–5 | confirmado | — |

Pergunta 2 da Auditoria 01 — **membro comum pode se dar permissões?** **Não.** [confirmado] `permissoes` e `usuarios_clinicas` só aceitam INSERT/UPDATE quando `clinica_id ∈ clinicas_gestao()` (dono ou gestor ativo e aceito, ou suporte Salute com entrada aberta). Um membro "recepção/profissional/financeiro" recebe erro de RLS no `upsert`. Além disso, nem o gestor consegue se fazer dono (gatilho `usuarios_clinicas_proteger`). O risco real está em S1 (convite) e S4 (poder do gestor).

---

## 9) Duplicidades e campos/tabelas sem uso evidente

**Conceitos duplicados** [confirmado salvo indicação]
- `ia_config` × `renata_configuracoes` (+ `renata_instrucoes`, `renata_horarios`): `ia_config` (webhook_url, prompt_base, modo "atende") parece herança da arquitetura antiga com webhook/n8n; criada por migration separada (`create_ia_config`, 07/10), 0 linhas, front não usa, gatilho quebrado. Candidata a remoção.
- `canais_conectados` × `instancias_whatsapp`: `canais_conectados` é genérica (Instagram/Facebook, status padrão "em_breve"); 0 linhas; front não usa. `instancias_whatsapp` é a usada.
- `criar_perfil_usuario` × `novo_usuario`: duas funções de criar perfil; só a segunda tem gatilho.
- `painel_resumo` × `painel_mes`: front usa só `painel_mes` [inferido].
- Buckets `pacientes` × `prontuario` e `comprovantes` × `fiscal`: front só usa `prontuario` e `fiscal`.

**Tabelas sem tela no front** (não necessariamente lixo — várias são módulos futuros, conforme comentário no próprio banco):
- Módulos futuros: `tarefas`, `tarefa_*` (4), `retornos_programados`, `retorno_tentativas_contato`, `guias`, `guia_*` (4), `convenio_faturamentos`, `convenio_faturamento_guias`, `convenio_glosas`, `convenio_planos`, `orcamentos`, `orcamento_itens`, `notas_fiscais`, `fila_espera`, `respostas_rapidas`, `etiquetas`, `pacientes_etiquetas`, `etiquetas_conversa`, `renata_horarios`, `renata_instrucoes`, `renata_base_conhecimento`, `flix_aulas`, `horarios_profissional`, `consultorios`.
- Usadas só indiretamente (RPC/gatilho/junção): `auditoria`, `acessos_suporte`, `segredos_integracao`, `historico_assinatura`, `movimentacoes_lead`, `conversa_leituras`, `anamnese_respostas`, `pacientes_telefones`.
- Sem uso e sem plano evidente: `ia_config`, `canais_conectados`, `feriados`.
- Observação: `orcamentos` (8), `orcamento_itens` (18), `horarios_profissional` (13), `consultorios` (3) têm linhas mas não têm tela — vêm da carga de demonstração (`mock_*`).

**Campos sem uso evidente** [inferido salvo indicação]
- `renata_configuracoes.modelo_chat`, `modelo_voz`, `max_tokens_chat`, `max_tokens_voz`, `ferramentas_habilitadas`, `usar_chave_salute`: a edge function **não lê** nenhum deles [confirmado no código].
- `renata_consumo.limite_mensagens`: preenchido, mas nunca usado para bloquear [confirmado].
- `instancias_whatsapp.phone_number_id`, `waba_id`, `token_final`, `url_webhook`, `provedor_nao_oficial`, `nome_instancia`, e `mensagens.whatsapp_mensagem_id`, `entregue_em`, `lida_em`: não há servidor que os preencha (não existe integração WhatsApp).
- `perfis_usuario.verificado`, `dois_fatores_ativo`: nada no banco os altera.
- `conversas.ia_ativa`/`ia_pausada_*` e `leads.ia_pausada_por`: não há IA atendendo WhatsApp.

**Front cita algo que não existe no banco:** a Auditoria 01 listou `prontuario` como tabela — é **bucket** do Storage, não tabela. As demais 75 tabelas citadas existem.

---

## 10) Não confirmado / precisa investigar

1. **Cadastro aberto no Supabase Auth** (`signUp` habilitado sem convite) — define se S1 e S2 são exploráveis por qualquer pessoa da internet. Configuração do Auth fora do escopo desta leitura.
2. **Se os segredos `ANTHROPIC_API_KEY` / `ELEVENLABS_API_KEY` estão definidos na função `renata`** (com Vault vazio, é deles que sai o custo).
3. **Origem de `feriados`**: não há migration com esse nome; pode ter sido criada fora do histórico (via SQL manual) ou dentro de outra migration.
4. **Migrations fora do repositório:** o banco registra 41 migrations, mas o repositório não tem nenhum arquivo `.sql`. Não dá para saber se o SQL aplicado é idêntico ao que alguém guardou localmente.
5. **Dados de demonstração em produção:** 16 migrations `mock_*` inseriram pacientes, agenda, financeiro, conversas etc. fictícios. Confirmar se esta base será a de produção e como limpar.
6. **Quem envia WhatsApp:** confirmado que nada no projeto novo processa `mensagens` com `status_entrega = 'pendente'` (sem edge `whatsapp`, sem `pg_cron`, `pg_net`, `http`, `pgmq`, sem webhooks de banco). As 15 mensagens existentes são de demonstração (6 recebidas/lidas, 5 enviadas/entregues, 4 enviadas/lidas; **0 pendentes**). Falta saber se algum serviço externo (fora do Supabase) usaria a chave service role para isso.
7. **Prefixo de pasta nos uploads do front** (`ARQ.enviar('prontuario', 'pacientes/<id>/documentos')`): as regras exigem que a 1ª pasta seja o `clinica_id`; o código indica que o helper `ARQ` acrescenta a clínica, mas não foi testado.
8. **Teste prático de RLS com dois usuários de clínicas diferentes** (recomendado em `docs/supabase.md`) — não executado (modo somente leitura).
9. **Desempenho:** advisors apontam 113 FKs `criado_por` + `agendamentos.conversa_id`, `origens_lead.pai_id`, `perfis_usuario.clinica_ativa_id` sem índice, 264 índices nunca usados e 5 regras (`ia_config`, `feriados`) que recalculam `auth.uid()` por linha. Irrelevante no volume atual; reavaliar com dados reais.

### O que contradiz ou ajusta a Auditoria 01
- `prontuario` **não é tabela** (é bucket). Há **7 buckets**, não 5 (`pacientes` e `comprovantes` existem e o front não usa).
- R4 (permissões só na tela): a RLS **protege** `permissoes`/`usuarios_clinicas` — membro comum não se promove. Risco menor que o temido.
- R3 (upload anônimo): está **amarrado ao token** válido de 24 h; resta a falha de pasta de outra clínica (médio).
- R5 (Renata): **confirmado e mais grave** — sem limite de uso e com chave padrão da Salute.
- Ações da edge `renata`: existe `transcrever` (usada pelo front); `remarcar` não é ação da edge function.
- Realtime do banco publica também `participantes_canal`, `tarefas`, `tarefa_comentarios`, `tarefa_checklist`, além dos canais que o front escuta.
- **Novo:** auto-confirmação de e-mail + ligação automática de convites (S1), não visível pelo front.
