# Auditoria 03 — Mapa do front-end "Salute IA"

Data: 2026-10-09 · Modo: **somente leitura**. Nada foi alterado no código, ninguém chamou o Supabase nem serviços externos e o app não foi executado.

Material lido: `front/extraido/` (scripts decodificados do `front/index.html`), `template.html` (ordem dos scripts), `front/config.js`, `deploy/netlify/` e as auditorias 01 e 02. As bibliotecas de terceiros não foram analisadas por dentro: React 18.3.1 e ReactDOM 18.3.1 (`709b623d`, `7dd7e122`, versões *development*), supabase-js 2.117.2 (`…c002`) e qrcode-generator (`…c004`, versão não identificada).

Legenda: **[confirmado]** = visto no código · **[inferido]** = conclusão provável, ainda não comprovada · **[não confirmado]** = não deu para verificar só lendo o front.

Como ler as referências: `c001` = `5a1e7e02-0000-4000-8000-00000000c001.js` (o mesmo vale de `c003` a `c00b`). Os outros arquivos aparecem pelos 8 primeiros caracteres do nome (`1b7a2c45`, `d47643ae`…). "L1234" é o número da linha. O `d47643ae` está minificado em 12 linhas muito longas, por isso as posições dele vêm como "linha:caractere" (ex.: `d47643ae L9:116296`).

---

## 1) Resumo executivo

1. O front é **um site de uma página só** (SPA) com **6 telas principais** (Painel, Pacientes, Agenda, Mensagens, Gestão e Configurações). Somando o login, o painel da equipe Salute (Master), as 2 páginas públicas e a Renata, são **12 módulos** no total. [confirmado]
2. **Não há "rotas" de verdade.** A lista `ROUTES` tem só as 6 telas. CRM, Estoque, Financeiro e "Minha conta" são **abas dentro dessas telas**, e a aba aberta fica gravada nas preferências do usuário no banco. [confirmado]
3. Os dados seguem quase sempre o mesmo caminho: **tela → `useCarga('módulo')` → `CARGAS.módulo` → `DB.*` (Supabase) → "store" global → tela**. Para gravar, a tela chama um serviço (`PacSvc`, `FinSvc`, `EstSvc`…), que usa `DB.ins/upd/rpc`. [confirmado]
4. Não existe Redux nem React Context. O estado global fica em **cerca de 50 "stores" caseiros** (`makeStore/useStore`) pendurados em `window`. [confirmado]
5. Todos os módulos têm **dois comportamentos ao mesmo tempo**, o "demonstração" e o "real" (`SB_ON`), resolvidos com `if` espalhados: são **~300 pontos**, 117 só no arquivo minificado. Os dados fictícios moram nos próprios arquivos de tela e são apagados na abertura do modo real. [confirmado]
6. Principais problemas: arquivo de telas de **665 KB minificado**; **serviços que dependem de variáveis criadas pelas telas** (dependência ao contrário); **cópias** do kit do Design System; telas **gravando direto no banco** sem passar pelo serviço; e a **Agenda não permite editar nem cancelar** agendamentos pela tela. [confirmado]
7. Achados novos importantes: (a) dentro do claude.ai, a Renata **prefere a IA do próprio claude.ai** (`window.claude`) à função `renata`, mesmo no modo real; (b) o "**2 etapas**" do perfil é **só uma marcação** no banco, sem verificação real; (c) o **CRM não cria leads** em nenhum lugar do front. [confirmado]

---

## 2) Mapa de rotas → tela → componente raiz → arquivo

Como o sistema escolhe a tela [confirmado]:
- `RaizSalute` (`c00b` L2443) olha o endereço: `?a=TOKEN`, `/a/TOKEN` ou `#/a/TOKEN` abrem a anamnese pública; `?u=`/`/u/`/`#/u/` abrem o envio público de documentos. Qualquer outro endereço vai para `PortaSupabase` → `App`.
- `PortaSupabase` (`c001` L4249) mostra login, Master, erro, "acesso pausado" ou o `App`, conforme `SESSAO.estado`.
- `App` (`1b7a2c45` L9122) escolhe a tela pela `ROUTES` (`1b7a2c45` L33). O endereço vira tela pela `ROTA_TELA` (`c001` L102). `SincronizaUrl` (`c001` L209) mantém o endereço igual à tela e faz o "voltar" do navegador funcionar.
- As rotas por endereço só ligam quando `config.js` tem `BASE_PATH` (hoje `""` = raiz, ligado). Sem isso, a última tela fica no `localStorage` (`salute-kit:route`). O Netlify tem `/* /index.html 200` (`deploy/netlify/_redirects`), então links diretos funcionam lá. [confirmado]

| Endereço | Tela (`ROUTES`) | O que abre | Componente raiz | Arquivo / posição | Status |
|---|---|---|---|---|---|
| `/painel` (ou `/`) | `painel` | Painel (dashboard) | `PainelScreen` | `25352dc7` L1262 | confirmado |
| `/pacientes` | `pacientes` | Lista + ficha do paciente | `PacientesScreen` → `PacienteFicha` | `d47643ae` L9:116296 / L9:103073 | confirmado |
| `/agenda` | `agenda` | Agenda semana/dia/mês | `AgendaScreen` | `d47643ae` L10:10729 | confirmado |
| `/mensagens` | `mensagens` + pref `mensagens.crm=false` | Caixa estilo WhatsApp + chat da equipe | `MensagensScreen` → `MensagensWA` | `366b46a2` L4185 / L3584 | confirmado |
| `/crm` | `mensagens` + pref `mensagens.crm=true` | Quadro de leads (kanban) | `MensagensWA` → `CrmBoard` | `366b46a2` L3170 | confirmado |
| `/gestao` | `gestao` | Escolha Estoque/Financeiro | `GestaoScreen` | `d47643ae` L11:104715 | confirmado |
| `/estoque` | `gestao` + pref `gestao.area=estoque` | Estoque | `EstoqueScreen` | `d47643ae` L11:25626 | confirmado |
| `/financeiro` | `gestao` + pref `gestao.area=financeiro` | Financeiro | `FinanceiroScreen` | `d47643ae` L11:101756 | confirmado |
| `/configuracoes` | `perfil` | Configurações (abas) | `ConfigScreen` | `d47643ae` L12:268987 | confirmado |
| `/perfil` | `perfil` + pref `config.aba=conta` | Aba "Minha conta" | `ConfigScreen` → `PerfilScreen` | `30c3fd71` L784 | confirmado |
| `/login`, `/cadastro` | — (fora do App) | Entrar, cadastrar, recuperar senha, convite | `TelaAcesso` | `c001` L1672 | confirmado |
| `/master` | — (estado `master`) | Painel da equipe Salute | `PainelMaster` | `c001` L2577 | confirmado |
| `/a/<token>` ou `?a=` | — | Anamnese pública | `PaginaAnamnese` | `c00b` L1978 | confirmado |
| `/u/<token>` ou `?u=` | — | Envio público de documentos | `PaginaEnvioDocs` | `c00b` L2121 | confirmado |
| (sobreposição em qualquer tela) | — | Renata (chat, voz, comando de voz, ficha global) | `RenataRoot`, `VozRoot`, `FichaGlobal` | `1b7a2c45` L5688, L8821, L6064 | confirmado |

Observações:
- O id interno `perfil` abre **Configurações**, e o endereço `/perfil` abre a aba **Minha conta** dentro dela. A palavra "perfil" tem dois sentidos. [confirmado]
- Os links públicos que o sistema gera usam `?a=`/`?u=` (`c003` L454–459), não `/a/…`. [confirmado]
- Abrir `/crm`, `/estoque` ou `/financeiro` **grava** a aba escolhida em `preferencias_usuario` (`aplicarPrefsRota` → `salvarPref`, `c001` L172). Só no modo real. [confirmado]

---

## 3) Módulos principais — fluxo "tela → componente → hook/serviço → fonte de dados → retorno"

Todos os acessos ao banco passam por `DB.*` (`c001` L284–410), que **sempre acrescenta `clinica_id` da clínica ativa** e ignora linhas com `excluido_em`. "Excluir" é sempre lógico (preenche `excluido_em`). [confirmado]

### 3.1 Login / Cadastro / Convite
- **Tela:** `TelaAcesso` (`c001` L1672). Abas "Entrar" e "Cadastrar". Dentro de "Entrar", 4 modos: entrar, recuperar, convite e nova senha.
- **Fluxo de entrar:** formulário → `SB.auth.signInWithPassword` (L1798) → evento `SIGNED_IN` (`onAuthStateChange`, L1410) → `carregarContexto` (L1079) → RPC `meu_contexto` (+ `concluir_cadastro` se ainda não houver clínica, + `aceitar_termos` no primeiro acesso) → preenche `SESSAO` (perfil, clínicas, clínica ativa, módulos, admin, suporte) → `carregarPreferencias` (tabela `preferencias_usuario`) → `SESSAO.estado = 'pronto'` → `PortaSupabase` mostra o `App`. [confirmado]
- **Cadastro de clínica:** `SB.auth.signUp` (L1991) + RPC `criar_clinica` (L2057). **Adicionar clínica** ao mesmo login: `NovaClinicaDialog` (L3882) → `criar_clinica` (L3965). [confirmado]
- **Convite (quem recebeu):** modo "convite" → `signUp` (L1917) e criação de senha. Um login que nasceu de convite e ainda não tem senha é mandado para "criar senha" (`precisaSenha`, L1406). [confirmado]
- **Convite (quem convida):** Configurações → Equipe → `EquipeSvc.convidar` (`c007` L346) → RPC `convidar_membro` → **segundo cliente Supabase sem sessão** → `signInWithOtp({shouldCreateUser:true})`. [confirmado]
- **Senha:** `resetPasswordForEmail` (L1829) e `updateUser` (L1863). **Troca de clínica:** `trocarClinica` (L1250) → `perfis_usuario.clinica_ativa_id`. **Sair:** `sair` (L1355). [confirmado]
- **Retorno:** `SESSAO` cheia; `useAccess().can()` passa a usar `SESSAO.modulos`.

### 3.2 Painel
- **Tela:** `PainelScreen` (`25352dc7` L1262) → `useCarga('painel')` → `CARGAS.painel` (`c009` L36) → RPC `painel_mes` → stores `PAINEL`/`PAINEL_MES` → `painelTela()` monta números, funil, leads por canal e agenda recente. [confirmado]
- **Troca de mês:** `MesChip` → `painelMudarMes` → `painel_mes` de novo. [confirmado]
- **Primeiros passos:** `PrimeirosPassos` (L1056) → RPCs `primeiros_passos` / `marcar_primeiro_passo`. A tela de procedimentos também chama `marcar_primeiro_passo` direto (`d47643ae` L12). [confirmado]
- **Demo:** `WEEK`, `DAILY`, `FUNNEL`, `CANAIS0`, `AGENDA_DEMO` (L28–93, L281, L628). O subtítulo "Seu progresso esta semana está ótimo." aparece **também no modo real** (`ROUTES.painel.subtitle`, `1b7a2c45` L38). [confirmado]

### 3.3 Pacientes (lista, ficha, prontuário, anamnese, documentos, mapeamento)
- **Lista:** `PacientesScreen` (`d47643ae` L9:116296) → `useCarga('pacientes')` → `CARGAS.pacientes` (`c003` L287) → `DB.tudo(pacientes + pacientes_telefones)`, em páginas de 1000 → `PAC_STORE`/`PAC`. Os filtros ficam em `usePrefFiltro('pacientes.filtros')`. **Novo paciente** → `PacSvc.criar` (`c003` L314) → `pacientes`. [confirmado]
- **Ficha:** `PacienteFicha` (`d47643ae` L9:103073) tem 3 abas:
  - **Dados** (`DadosTab`): `PacSvc.salvar` / `trocarNumero` → `pacientes`. Histórico: `PacSvc.historico` / `hist` → `historico_paciente`. [confirmado]
  - **Conversa**: reaproveita o `WaChat` do arquivo de Mensagens (`366b46a2` L1587) → `MsgSvc` (ver 3.5). [confirmado]
  - **Prontuário** (`ProntuarioTab`, L9:84968): `ProntSvc.carregar` (`c003` L469) lê `anamnese_envios`, `mapeamentos`, `procedimentos_realizados`, `documentos_paciente`, `comparacoes_antes_depois` e `pastas_documentos`. [confirmado]
- **Procedimentos realizados** (`ProcWorkspace`): `ProntSvc.salvarProc` (L1021) → `procedimentos_realizados` + `procedimento_insumos`, o que dá baixa nos insumos. [confirmado]
- **Documentos** (`DocsWorkspace`): `ProntSvc.enviarArquivos` (L1137) → arquivo no bucket `prontuario` (`ARQ.enviar`) + linha em `documentos_paciente`. Também: `moverDoc`, `excluirDoc` e `pastaId` (cria em `pastas_documentos`). **Antes/depois:** `salvarComparacao` → `comparacoes_antes_depois`; a exclusão é feita **direto pela tela** (`DB.del`, `d47643ae` L9). **Link para o paciente enviar documentos:** `ProntSvc.linkDocumentos` (L1289) → `links_envio_documentos` → QR real (`QRCodigo`). Atualização ao vivo: canal `docs-ficha` (`documentos_paciente`). [confirmado]
- **Mapeamento facial** (`JanelaMapa`/`MapEditor`, `d47643ae` L6): `ProntSvc.salvarMapa` (L867) → `mapeamentos` + `mapeamento_marcacoes`. A imagem vai para o bucket `prontuario` (`ARQ.enviarDataUrl`) e os modelos para `mapeamento_modelos`. Os produtos do mapa vêm de `CAT_EXTRA.produtos` (`produtos` com `usar_no_mapa`); a edição desses produtos é gravada **direto** (`DB.upd('produtos')`, `d47643ae` L6). [confirmado]
- **Anamnese no prontuário:** `AnamneseEnvio` (`c00b` L4216) → `ProntSvc.enviarAnamnese` (`c003` L840) → `anamnese_envios` → link `?a=TOKEN`. A mensagem com o link vai por `MsgSvc.enviarTextoPaciente`, que só deixa a mensagem como **pendente** (ver 3.5). `CartaoAnamnese` (`c00b` L2653) mostra as respostas; `AnamSvc.regerar`/`cancelar` → RPC `regerar_link_anamnese` / `anamnese_envios`; "preencher presencialmente" grava **direto pela tela** (`DB.upd('anamnese_envios')`, `d47643ae` L9). Atualização ao vivo: canal `anamnese-ficha`. [confirmado]
- **Modelos de anamnese:** `AnamneseModelosLista`/`AnamneseEditor` (`c00b` L3592/L3125) → `AnamSvc.salvar/definirPadrao/excluir` → `anamnese_modelos`, `anamnese_blocos`, `anamnese_perguntas`. A carga é `CARGAS.anamnese` (`c00b` L405). [confirmado]
- **Retorno:** stores `PAC_STORE`, `ANAM_STORE` e `MODEL_STORE`, mais o estado local da ficha.

### 3.4 Agenda
- **Tela:** `AgendaScreen` (`d47643ae` L10:10729) → `useCarga('agenda')` → `CARGAS.agenda` (`c003` L1345) → `agendamentos` do período + canal ao vivo `agenda` → `APPT_STORE` → `agendaDoDia`/`slotsFor` desenham a grade. Visão Mês: `agendaGarantirMes`. Visão e filtro de profissionais: `usePrefFiltro`. [confirmado]
- **Criar:** o botão "Novo" chama `onNew` → diálogo do `App` (`1b7a2c45` ~L9255) → `agendarRapido` (`c003` ~L1580) → `PacSvc.garantir` (cria o paciente se precisar) → `AgSvc.criar` (`c003` L1470) → `agendamentos` (com `enviar_confirmacao_whatsapp`). Pela ficha do paciente: `QuickAgendar` (`d47643ae` L3:3886) → `AgSvc.criar`. [confirmado]
- **Editar / remarcar / cancelar:** **a tela da Agenda não tem nenhum botão para isso.** Os únicos eventos dela são navegação, troca de visão, filtro e "Novo". Remarcar e mudar status só existem pela **Renata** (`1b7a2c45` L6711–6890: `DB.sel/upd('agendamentos')` direto, sem passar por `AgSvc`). [confirmado]
- **Bloqueios de horário:** só a Renata lê `bloqueios_horario` (`1b7a2c45` L5871). Nenhuma tela cadastra bloqueios. [confirmado]

### 3.5 Mensagens / WhatsApp (e chat da equipe)
- **Tela:** `MensagensScreen` (`366b46a2` L4185). Uma constante `MENSAGENS_VERSAO = 'whatsapp'` escolhe entre `MensagensWA` (atual) e `MensagensV01` (antiga). [confirmado]
- **Carga:** `useCarga('mensagens')` → `CARGAS.mensagens` (`c005` L101) → `conversas`, `canais_equipe`, `figurinhas`, `participantes_canal` + canal ao vivo `mensagens` (`mensagens`, `conversas`, `mensagens_equipe`, `reacoes_mensagem`, `canais_equipe`) → store `MSG_LISTA` + `CHAT_STORE`. Ao abrir uma conversa: `abrirChat`/`carregarChat` (`c005` L368/L297) → `mensagens` ou `mensagens_equipe`. [confirmado]
- **Enviar:** `WaChat` → `MsgSvc.enviar` (`c005` L524) → cria a conversa se faltar (`conversas`) → `mensagens` com `status_entrega:'pendente'` (WhatsApp) ou `mensagens_equipe` (equipe). Anexos: bucket `mensagens` + `anexos_mensagem`. Também: `reagir` (`reacoes_mensagem`), `apagar`, `marcarLida` (RPC `marcar_conversa_lida`) e `pacienteDaConversa`. [confirmado]
- **Retorno:** a mensagem aparece na tela, mas **ninguém a entrega ao WhatsApp**: não há função nem serviço que leia as pendentes (Auditoria 02, item 7). [confirmado no front / confirmado no banco pela Auditoria 02]
- **Notificações (sino):** `NotifMenu` (`c005` L1209) → `CARGAS.notificacoes` (L1022) → `notificacoes` + RPC `avisar_receitas_vencidas` + canal ao vivo `notificacoes`. Para tocar som e mostrar o aviso: `notifyIncoming` → store `INCOMING` → toast no `App`. [confirmado]

### 3.6 CRM
- **Tela:** `CrmBoard` (`366b46a2` L3170), dentro de `MensagensWA`, carregado por `useCarga('crm')` → `CARGAS.crm` (`c005` L841) → `leads` + etapas (`CAT.etapas`, que vem de `etapas_funil`) + canal ao vivo `crm` → `LEADS_STORE`. [confirmado]
- **Ações:** arrastar o cartão → `CrmSvc.mover` (`c005` L911) → `leads.etapa_id` (e motivo de perda). Ligar/desligar a IA do lead → `CrmSvc.ia` → `leads.ia_ativa`. "Virar paciente" → `CrmSvc.paciente` → `PacSvc.criar` + `leads`/`conversas`. A Renata também move etapa e liga a IA (`1b7a2c45` L7845, L7969). [confirmado]
- **Lacuna:** **nenhum ponto do front cria lead** (não existe `DB.ins('leads')`) e nada grava `movimentacoes_lead`. No modo real o quadro só mostra leads que já existem no banco. [confirmado]

### 3.7 Gestão / Financeiro
- **Tela:** `GestaoScreen` (`d47643ae` L11:104715) escolhe a área (`GESTAO_AREAS`) e trava a área sem permissão (`can('gestao.financeiro')`). [confirmado]
- **Financeiro:** `FinanceiroScreen` (L11:101756) → `useCarga('financeiro')` → `CARGAS.financeiro` (`c006` L192) → `contas_receber`, `contas_pagar`, `metas_profissional` → `REC_STORE`/`DESP_STORE` (`recTela`/`despTela`). Abas: Visão geral, Receitas, Despesas, Nota fiscal (Beta), Salute Pay (Beta) e Categorias. [confirmado]
  - Lançar: `LancamentosTab` → `FinSvc.criar` (`c006` L311) → `contas_receber` ou `contas_pagar` + `parcelas` (+ `fornecedores` via `FinSvc.fornecedor`). Baixa/status: `FinSvc.status` → `parcelas`. Categorias: `FinSvc.categorias` → `categorias_financeiras`. [confirmado]
  - Nota fiscal: `FinSvc.salvarNF` → `configuracao_nota_fiscal` + `salvar_segredo('certificado_fiscal')`. Certificado: `FinSvc.enviarCertificado` → bucket `fiscal`. **Emitir nota não existe** (o botão diz "Emitir NFS-e (em breve)"). [confirmado]
  - Salute Pay: só calcula um saldo na tela (`saldoPay`, `c006` L589) a partir de `contas_bancarias` + lançamentos. Não há pagamento real. [confirmado]
- **Retorno:** stores atualizados na hora; quando o banco recusa, `bg(..., desfazer)` desfaz a mudança na tela. [confirmado]

### 3.8 Estoque
- **Tela:** `EstoqueScreen` (`d47643ae` L11:25626) → `useCarga('estoque')` → `CARGAS.estoque` (`c006` L670) → `produtos` + `movimentacoes_estoque` → `PROD_STORE`. Abas: Produtos, Relatórios e Categorias/unidades. [confirmado]
- **Ações:** novo produto `EstSvc.criar` → `produtos`. Entrada/saída/ajuste `EstSvc.mover`/`lancar` (`c006` L747/L782) → `movimentacoes_estoque` + `lotes` + `produtos`. Categorias/unidades `EstSvc.lista` → `categorias_produto`/`unidades_medida`. Uma parte da edição de produto grava **direto pela tela** (`DB.upd('produtos')`, `d47643ae` L6). [confirmado]
- A Renata propõe movimentações e só grava depois da confirmação (`rnApplyDB` → `EstSvc.mover`, `c00a` L773). [confirmado]

### 3.9 Configurações / Perfil (equipe e acessos, canais, plano)
- **Tela:** `ConfigScreen` (`d47643ae` L12:268987). Abas (`CONFIG_TABS`, `d41989a4` L521): Cadastro, Canais, Saluteflix, Parcerias, Certificações e Minha conta. Cada uma é travada por `can('perfil.<aba>')`. [confirmado]
- **Cadastro** (`CadastroTab`) junta:
  - `ClinicaForm` → `ClinSvc.salvar` (`c007` L123) → `clinicas`, `configuracoes_clinica`, `horarios_funcionamento`, `formas_pagamento`; logo no bucket `clinica`. Carga: `CARGAS.clinica` (`c007` L49). [confirmado]
  - **Equipe e acessos** (`EquipeAcessos`, L11:121097) → `useCarga('equipe')` → `CARGAS.equipe` (`c001` L953) → `usuarios_clinicas` + `perfis_usuario` + `permissoes` → `TEAM_STORE`. Cada clique em um módulo → `EquipeSvc.acessos` (`c007` L327) → `upsert` em `permissoes` meio segundo depois. "Visualizar como" → store `VIEW_AS` (apenas simula na tela). Convite: ver 3.1. [confirmado]
  - `ProfissionaisCad` → `ProfSvc.salvar` → `profissionais` + `profissionais_procedimentos`. [confirmado]
  - `ProcedimentosCad`/`InsumosCad` → grava **direto pela tela** em `procedimentos` (`DB.ins/upd`, `d47643ae` L12). Não existe serviço próprio para isso. [confirmado]
  - `AnamneseModelosLista` (ver 3.3) e `SoundSettings` (som de mensagem → `SOUND` + `preferencias_usuario`). [confirmado]
- **Canais** (`CanaisTab`, L12:259028) → `WA_STORE` → `WaSvc.conectar/desconectar` (`c007` L588/L651) → `instancias_whatsapp` + `salvar_segredo('whatsapp_meta')`. A URL de webhook mostrada é `…/functions/v1/whatsapp?clinica=…` (`WaSvc.webhook`), mas essa função não existe. O QR Code do modo "não oficial" é **desenho falso** (`FakeQR`, semente `'wa'+Date.now()`), também no modo real. [confirmado]
- **Saluteflix / Parcerias / SaluteCast / Certificações** → `ContSvc.flix/parceiros/cast/selos` (`c007` L797–1175) → `flix_*`, `parceiros`, `cupons_parceiros`, `cast_episodios`, `selos_certificacoes`; bucket `conteudos`. Carga: `CARGAS.conteudo` (`c007` L700). [confirmado]
- **Minha conta** = `PerfilScreen` (`30c3fd71` L784), com as seções Conta, Segurança, Plano e cobrança, Notificações e Idioma (`SET_ITEMS`, L20) → `ContaSvc` (`c008` L99):
  - `salvarPerfil`/`foto` → `perfis_usuario` + bucket `clinica`
  - `trocarSenha`/`linkSenha` → Supabase Auth
  - `doisFatores` → **apenas** `perfis_usuario.dois_fatores_ativo` (não há `auth.mfa` em nenhum arquivo)
  - `trocarPlano` → RPC `trocar_plano` + `assinaturas_clinica`
  - `consultor` → RPC `pedir_consultor`

  O menu do avatar (`ContaMenu`, `c001` L3557) mostra dados pessoais e "Sair". [confirmado]

### 3.10 Renata (chat, voz, ferramentas)
- **Entradas na tela:** `RenataButton` (barra do topo) → `RenataRoot` (`1b7a2c45` L5688) → `RenataChat` (L4780) / `RenataVoiceMode` (L3817) / `RenataSettings` (L3471, "Conexões", com `RnPassoGemini` L3417). Comando de voz global: `VozBotao`/`VozRoot` (L8793/L8821, Ctrl+M). Abrir paciente por comando: `FichaGlobal` (L6064). [confirmado]
- **Quem responde** (ordem real, ~L3195–3320) [confirmado]:
  1. `window.claude.use('sample')`: a IA do próprio claude.ai, quando o sistema roda dentro do artifact. **Vale também no modo real.**
  2. Ponte com a janela que abriu a voz (`rnBridge`/`rnAskBridge`), restrita a `location.origin`.
  3. Função do servidor `renata`, se `rnStatusServidor` disser que há chave: `rnClaudeApi` (L2650) → `rnFn({acao:'chat'})` (`c00a` L51) → `/functions/v1/renata`. No modo demo, vai direto a `api.anthropic.com`.
  4. Sem IA: `rnSemIA` (`c00a` L563), que entende comandos locais (`rnComandoLocal`, `rnLocalAction`). No demo, `renataLocal` (L906), que tem **números fixos** ("102 pacientes", "27 horas").
- **O que vai para a IA:** regras (`RENATA_RULES`) + `rnSnapshot()` (resumo da clínica, painel e agenda) + até 14 mensagens + lista de ferramentas. Os dados vêm de `rnPrepararDados` → `rnPacienteDB`, `rnAgendaDB`, `rnPainelDB`, `rnPacientesRecentesDB`, `rnContaDB` (`c00a` L317–533). [confirmado]
- **Ferramentas** (`RENATA_TOOLS`, L930 + acréscimos L1646, L6262…): `financeiro_periodo`, `agenda_do_dia`, `dados_paciente`, `lancamentos`, `abrir_tela` (definida 2 vezes e trocada em L6261), `horarios_livres`, `abrir_paciente`, `contas_a_vencer`, `saldo_estoque`, e as que **propõem** gravação: `propor_lancamento_financeiro`, `propor_movimentacao_estoque`, `propor_agendamento`, `propor_alteracao_agendamento`, `propor_cadastro_paciente`, `propor_atualizacao_paciente`, `propor_envio_anamnese`, `propor_mensagem_paciente`, `propor_registro_procedimento`, `propor_baixa_lancamento`, `propor_etapa_lead`, `propor_ia_lead`, `ajustar_ponto_mapa`. [confirmado]
- **Confirmação:** a proposta vira um cartão (`RnActionCard`, L4619, store `RN_PENDING`). Ao confirmar, roda `rnApply`/`rnApplyDB` ou o `execute` do comando (`rnCmd`, L5981). Esses chamam `AgSvc.criar`, `PacSvc.*`, `FinSvc.*`, `EstSvc.mover`, `ProntSvc.*`, `MsgSvc.enviarTextoPaciente`, `CrmSvc.*` **ou gravam direto** (`agendamentos`, `pacientes`). Depois registra em `renata_acoes` (`rnRegistrarAcao`, `c00a` L742). Permissão: `rnPode(id)` (L5715), que olha só a tela. [confirmado]
- **Conversa gravada:** `renata_conversas`/`renata_mensagens` (`rnRegistrar`, `rnFeedback`, `c00a` L654–735). Leitura: RPC `registrar_leitura`. [confirmado]
- **Voz:**
  - fala: `rnFn({acao:'voz'})` (L2144), que usa a ElevenLabs pelo servidor
  - ouvir: reconhecimento do navegador ou `rnFn(FormData acao='transcrever')` (L4172, L8319)
  - no demo, vai direto a `api.elevenlabs.io`
  - a janela de voz separada (`#renata-voz`) conversa com a janela principal por `postMessage` restrito à mesma origem

  [confirmado]
- **Chaves:** `rnSalvarConexoes` → RPC `salvar_segredo` com provedor `google` (chave `AIza…`) ou `anthropic` (`rnProvedorChave`, `c00a` L46); voz → `renata_voz`. O front continua mandando `model: 'claude-…'`. Segundo o commit `e855d9a`, a tradução para o Gemini é feita no servidor (`supabase/functions/renata/gemini.ts`, não revisado aqui). [confirmado no front / inferido no servidor]
- **Ações da função `renata` usadas pelo front:** `status`, `testar`, `chat`, `voz`, `transcrever`. [confirmado]

### 3.11 Páginas públicas (`/a` anamnese, `/u` documentos)
- **Anamnese:** `RaizSalute` → `PaginaAnamnese` (`c00b` L1978) → `AnamSvc.publica` → RPC `anamnese_publica` (sem login) → formulário (`AnamnesePreenchimento`, `AssinaturaPad`) → `salvar_rascunho_anamnese` enquanto preenche → `responder_anamnese` ao enviar → tela de "obrigado". [confirmado]
- **Documentos:** `PaginaEnvioDocs` (`c00b` L2121) → RPC `link_documentos_publico` (L2144) → upload anônimo no bucket `prontuario` na pasta devolvida pelo link (L2182) → `registrar_documento_link` (L2195). [confirmado]
- Nenhuma das duas passa por `DB.*` (que exige clínica ativa): elas usam `SB.rpc`/`SB.storage` direto. [confirmado]

### 3.12 Master / Admin Salute
- **Entrada:** `meu_contexto` devolve `admin` sem `suporte` → `SESSAO.estado='master'` → `PortaSupabase` mostra `PainelMaster` (`c001` L2577) e o endereço vira `/master`. [confirmado]
- **Fluxo:**
  - lista de clínicas: RPC `admin_clinicas`
  - logins de uma clínica (`LoginsClinica`, L3033): `admin_membros`, `admin_definir_acesso`, `admin_registrar_envio`, `resetPasswordForEmail` e convite por `signInWithOtp` (segundo cliente)
  - "Entrar como suporte": `suporteEntrar` (L1291) → `admin_entrar_clinica` → recarrega o contexto, e a faixa `AvisoSuporte` (L3445) aparece
  - "Voltar": `suporteVoltar` → `admin_sair_clinica`

  [confirmado]
- Nenhuma tabela é acessada direto: tudo passa pelas RPCs `admin_*`. [confirmado]

---

## 4) Componentes compartilhados

### 4.1 Design System `SaluteProjetoDesigner_8b4683` (`7bf00496`)
O pacote traz 30 componentes (lista no cabeçalho `@ds-bundle`, L1) e, a partir da L3188, um **kit de referência** (`ui_kits/admin/*`: App, MensagensScreen, PacientesAgenda, PainelScreen, PerfilScreen, Shell e kit-shared). [confirmado]

| Componente | Usado em | Status |
|---|---|---|
| Button, Icon, Input, Dialog, Toast | Quase todos: núcleo (`c001`), Renata/App (`1b7a2c45`), telas (`d47643ae`), Mensagens, Perfil | confirmado |
| Avatar | Painel, Perfil, Mensagens, kit-shared, telas | confirmado |
| Sidebar, TopBar, MobileBottomNav | Só `AppShell` (`7af61c93`) | confirmado |
| EmptyState, SegmentedControl, IconButton | Núcleo (`CargaEstado`, login, Master), Renata, telas | confirmado |
| BarChart, GaugeChart, SalesFunnel, StatCard, TrendPill, Checkbox | Painel (`25352dc7`) e Gestão (`d47643ae`) | confirmado |
| Select, Switch, CardIcon, MessageBubble | Telas (`d47643ae`), diálogo de novo agendamento | confirmado |
| **Badge, KanbanCard, Progress, Table, Tabs, PageHeader, Card, Tooltip** | **Nenhum arquivo do app usa.** O app tem versões próprias (`Badge2`, `GTabs`, `glass`, `CrmCard`) | confirmado |

### 4.2 Peças compartilhadas do próprio app
| Peça | Onde mora | Para que serve / quem usa | Status |
|---|---|---|---|
| `AppShell`, `useIsMobile` | `7af61c93` | Moldura de todas as telas do `App` | confirmado |
| `glass`, `CardTitle`, `Legend`, `MonthGrid`, `FeriadoModal`, `StatusBadge`, `PillChip`, `KIT_NAV` | `d41989a4` (kit-shared) | Cartão "vidro", títulos, calendário do mês (Painel e Agenda), menu de navegação | confirmado |
| `CargaEstado` | `c001` L627 | "Carregando / erro / tentar de novo" de todas as telas | confirmado |
| `AvisoDemo`, `AvisoGravacao` (store `SALVA`), `avisoErro`/`avisoOk` | `c001` | Faixa de demonstração e toasts de gravação | confirmado |
| `SemAcesso` | `c001` L3509 | Aba/tela trancada (App, Config, Gestão) | confirmado |
| `ContaMenu`, `BotaoSair`, `TrocaAviso`, `NovaClinicaDialog` | `c001` | Menu do avatar, sair, troca de clínica | confirmado |
| `NotifMenu` | `c005` L1209 | Sino de notificações | confirmado |
| `GTabs`, `KpiTile`, `PeriodSelect`, `Badge2`, `BetaPill`, `Block`, `Toggle`, `MiniToggle`, `FilterChip`, `SavedBar`, `B`, `grid2` | `d47643ae` | Abas, cartões de número, filtros e blocos das telas de Gestão/Config/Pacientes; exportados em `window` | confirmado |
| `QRCodigo` (QR real) / `FakeQR` (QR desenhado) | `d47643ae` L2 | Links de anamnese/documentos (real); WhatsApp e demo (falso) | confirmado |
| `WaChat`, `WaBubble`, `WaAudio`, `WaMenu` | `366b46a2` | Chat de Mensagens **e** aba Conversa da ficha do paciente | confirmado |
| `AnamnesePreenchimento`, `AnamneseEditor`, `CartaoAnamnese`, `AlertasPaciente`, `imprimirHtml` | `c00b` | Prontuário, Configurações e página pública | confirmado |
| `PatientsTable`, `ConversaTab`, `MensagensV01` | `25352dc7`, `d47643ae`, `366b46a2` | **Definidos e não usados** (ver seção 8) | confirmado |

---

## 5) Hooks e estado global

**Mecanismo:** `makeStore(valor)` cria `{v, subs}`; `useStore(store)` força a tela a redesenhar quando alguém avisa os assinantes (`d41989a4` L474–504). Não há `createContext`, `useContext` nem `useReducer` em nenhum arquivo do app. [confirmado]

### Hooks
| Hook | Arquivo | O que faz |
|---|---|---|
| `useStore` | `d41989a4` L480 | Liga a tela a um store global |
| `useAccess` | `d41989a4` L585 | `can(id)` = módulo liberado em `SESSAO.modulos` **e** no membro do "visualizar como" (`VIEW_AS`) |
| `useNarrow` / `useIsMobile` | `d41989a4` L438 / `7af61c93` L15 | Medem a largura da tela (dois hooks parecidos, com cortes diferentes: 1180 px e 767 px) |
| `useCarga(...nomes)` | `c001` L607 | Dispara `carregar(nome)` e devolve `'carregando' / 'ok' / 'erro'` |
| `usePrefFiltro(chave, padrão)` | `c001` L1059 | Lê/grava filtros e abas em `preferencias_usuario.filtros` (só no modo real) |
| `useArqUrl(bucket, path)` | `c001` L534 | Link assinado de 1 h para mostrar arquivos |
| `useAnamModels` | `d47643ae` L3:19507 | Lista de modelos de anamnese para a ficha |

Atenção: **há 19 chamadas de hook condicionais** (`SB_ON ? usePrefFiltro(...) : React.useState(...)`, e `if(SB_ON) useStore(...)`). Funciona porque `SB_ON` não muda depois de aberta a página, mas é frágil. [confirmado]

### Stores (estado global) — o que guardam
| Store | Arquivo | Conteúdo |
|---|---|---|
| `SESSAO` | `c001` L67 | estado da porta (`carregando/login/sem-clinica/master/bloqueado/erro/iniciando/pronto/demo`), perfil, clínicas, clínica ativa, módulos, admin, suporte, recuperar senha |
| `CAT` | `c001` L812 | Catálogos da clínica: profissionais, procedimentos, categorias, formas de pagamento, convênios, fornecedores, categorias de produto, unidades, status/tipos de agendamento, etapas/motivos/origens/funil, pastas, instância WhatsApp, planos, assinatura, consumo da Renata, config da Renata/voz, NF, conta bancária, config e horários da clínica. Carregado por `CARGAS.catalogos`, que **4 arquivos estendem em cadeia** (`c001` L850 → `c003` L77 → `c007` L569 → `c008` L58) |
| `CAT_EXTRA` | `c003` L71 | Produtos do mapeamento e kits padrão |
| `CARGA` | `c001` L585 | Situação de carga de cada módulo |
| `PREF` | `c001` L996 | Preferências do usuário (idioma, som, filtros, última tela) |
| `SALVA`, `TROCA`, `CONTA`, `ABA_CONFIG`, `NOVA_CLI` | `c001` | Gravação em andamento, troca de clínica, menu da conta, aba pedida, diálogo de nova clínica |
| `TEAM_STORE`, `VIEW_AS` | `d41989a4` L558/L584 | Equipe e permissões (demo: equipe "Bella Forma"); membro do "visualizar como" |
| `SOUND`, `INCOMING`, `LANG` | `d41989a4` | Som de mensagem, última mensagem recebida (toast), idioma |
| `PAC_STORE` (+ lista `PAC`), `APPT_STORE`, `ANAM_STORE`, `MODEL_STORE`, `PROF_STORE`, `PROD_STORE`, `REC_STORE`, `DESP_STORE`, `NF_STORE`, `WA_STORE`, `CAST_STORE`, `SELOS_STORE`, `MAPA_DEMO`, `MAPA_VER` | **`d47643ae` (arquivo de telas)** | Pacientes, agendamentos, anamneses, modelos, profissionais, produtos, receitas, despesas, NF, WhatsApp, SaluteCast, selos, produtos do mapa (demo) |
| `FLIX_STORE`, `PARC_STORE` | `c007` | Saluteflix e parceiros |
| `MSG_LISTA`, `NOTIF`, `NOTIF_MENU` | `c005` | Lista de conversas, notificações |
| `CHAT_STORE`, `CHAT_TYPING`, `LEADS_STORE` | `366b46a2` | Mensagens por conversa, "digitando", leads do CRM |
| `PAINEL`, `PAINEL_MES` | `c009` | Dados do painel e mês escolhido |
| `PASSOS` | `25352dc7` | Primeiros passos |
| `PLAN_STORE` | `30c3fd71` | Plano atual |
| `RN_STORE`, `RN_AI`, `RN_VOICE`, `RN_MODE`, `RN_PENDING`, `VOZ`, `FICHA_GLOBAL` | `1b7a2c45` | Renata: aberta/mensagens/navegação; chave de IA (no real, só um marcador); voz; modo (`ia/api/demo`); proposta pendente; painel de comando de voz; ficha aberta por comando |

Além dos stores, há globais simples que funcionam como estado: `TODAY`, `TODAY_ISO`, `HOJE`, `PROS`, `PAC`, `RN_CLINICA`, `RN_CTX`, `KIT_USER` (o núcleo sobrescreve com o usuário logado, `c001` L1139) e `window.RN_NAV` (definido a cada desenho do `App`, L9227). [confirmado]

**localStorage:** `salute-kit:route`, `salute-kit:gestao`, `salute-kit:sound`, `salute-kit:lang`, `salute02:clinica`; no demo, também `salute-kit:renata-ia` e `salute-kit:renata-voz` (chaves de API). [confirmado]

---

## 6) Serviços / camada de dados

| Serviço | Arquivo | Funções | Tabelas / RPC / buckets / canais |
|---|---|---|---|
| `SB` (cliente) | `c001` L48 | — | Recusa chave service role (L37) |
| `DB` | `c001` L284 | `sel, ler, tudo, gravar, ins, upd, updWhere, del, rpc` | Qualquer tabela; acrescenta `clinica_id`; exclusão lógica |
| `bg(promise, desfazer)` | `c001` L412 | Grava em segundo plano e desfaz na tela se falhar | — |
| `ARQ` / `useArqUrl` | `c001` L426 | `enviar, enviarDataUrl, url` | Buckets `clinica`, `prontuario`, `mensagens`, `fiscal`, `conteudos` (caminho `clinica_id/pasta/arquivo`) |
| `tempoReal(nome, tabelas, cb)` | `c001` L559 | Canal realtime filtrado por `clinica_id` | `agenda`, `mensagens`, `crm`, `notificacoes`, `anamnese-ficha`, `docs-ficha` |
| `carregar` / `CARGAS.*` | `c001` L584 | Uma carga por módulo e por clínica | `catalogos`, `equipe` (c001); `pacientes`, `agenda` (c003); `mensagens`, `crm`, `notificacoes` (c005); `financeiro`, `estoque` (c006); `clinica`, `conteudo` (c007); `painel` (c009); `anamnese` (c00b) |
| Sessão | `c001` L1079–1405 | `carregarContexto, trocarClinica, suporteEntrar, suporteVoltar, sair, salvarPref` | RPCs `meu_contexto, concluir_cadastro, aceitar_termos, admin_entrar_clinica, admin_sair_clinica`; `perfis_usuario`, `preferencias_usuario` |
| `PacSvc` | `c003` L307 | `achar, criar, garantir, salvar, trocarNumero, historico, hist` | `pacientes` (+ telefones), `historico_paciente` |
| `ProntSvc` | `c003` L468 | `carregar, modelos, addModelo, pastaId, enviarAnamnese, salvarMapa, salvarProc, enviarArquivos, moverDoc, excluirDoc, salvarComparacao, linkDocumentos` | `anamnese_envios, mapeamentos, mapeamento_marcacoes, mapeamento_modelos, procedimentos_realizados, procedimento_insumos, documentos_paciente, pastas_documentos, comparacoes_antes_depois, links_envio_documentos`; bucket `prontuario` |
| `AgSvc` (+ `agendarRapido`, `agendaDoDia`, `agendaGarantirMes`) | `c003` L1469 | **só `criar`** | `agendamentos` |
| `MsgSvc` | `c005` L472 | `chavePaciente, garantirConversaPaciente, enviar, enviarTextoPaciente, reagir, apagar, marcarLida, pacienteDaConversa` | `conversas, mensagens, mensagens_equipe, anexos_mensagem, reacoes_mensagem, participantes_canal`; RPC `marcar_conversa_lida`; bucket `mensagens` |
| `CrmSvc` | `c005` L910 | `mover, ia, paciente` | `leads`, `conversas` (+ `PacSvc.criar`) |
| Notificações | `c005` L988–1250 | `carregarNotificacoes, marcarNotifLidas` | `notificacoes`; RPC `avisar_receitas_vencidas` |
| `FinSvc` | `c006` L243 | `baixa, idCat, parcelas, fornecedor, criar, status, categorias, salvarNF, enviarCertificado` | `contas_receber, contas_pagar, parcelas, fornecedores, categorias_financeiras, configuracao_nota_fiscal`; RPC `salvar_segredo`; bucket `fiscal` |
| `EstSvc` | `c006` L710 | `criar, mover, lancar, recarregar, lista` | `produtos, movimentacoes_estoque, lotes, categorias_produto, unidades_medida` |
| `ClinSvc` | `c007` L122 | `salvar` | `clinicas, configuracoes_clinica, horarios_funcionamento, formas_pagamento`; bucket `clinica` |
| `EquipeSvc` | `c007` L325 | `acessos, convidar` | `permissoes` (upsert); RPC `convidar_membro`; Auth OTP |
| `ProfSvc` | `c007` L416 | `salvar` | `profissionais, profissionais_procedimentos` |
| `WaSvc` | `c007` L583 | `webhook, conectar, desconectar` | `instancias_whatsapp`; RPC `salvar_segredo` |
| `ContSvc` | `c007` L796 | `flix, parceiros, cast, selos` | `flix_categorias, flix_conteudos, flix_progresso, parceiros, cupons_parceiros, cast_episodios, selos_certificacoes`; bucket `conteudos` |
| `ContaSvc` | `c008` L99 | `salvarPerfil, foto, trocarSenha, linkSenha, doisFatores, trocarPlano, consultor` | `perfis_usuario, clinicas, assinaturas_clinica`; RPCs `trocar_plano, pedir_consultor`; bucket `clinica` |
| Painel | `c009` | `painelMudarMes, painelTela` | RPC `painel_mes` |
| `AnamSvc` | `c00b` L449 | `salvar, definirPadrao, excluir, regerar, cancelar, publica, rascunho, responder, envio` | `anamnese_modelos, anamnese_blocos, anamnese_perguntas, anamnese_envios`; RPCs `anamnese_publica, salvar_rascunho_anamnese, responder_anamnese, regerar_link_anamnese` (+ `link_documentos_publico`, `registrar_documento_link` na página pública) |
| Renata (servidor e registro) | `c00a` | `rnFn, rnStatusServidor, rnTestarServidor, rnSalvarConexoes, rnPrepararDados, rn*DB, rnSemIA, rnRegistrar, rnFeedback, rnRegistrarAcao, rnApplyDB` | Edge `renata` (`status, testar, chat, voz, transcrever`); `renata_conversas, renata_mensagens, renata_acoes, renata_voz`; RPCs `salvar_segredo, registrar_leitura` |

**Acesso ao banco fora dos serviços** [confirmado]:
- `d47643ae`: `DB.ins/upd('procedimentos')`, `DB.upd('produtos')`, `DB.del('comparacoes_antes_depois')`, `DB.upd('anamnese_envios')` e `tempoReal` (`anamnese-ficha`, `docs-ficha`).
- `1b7a2c45`: `DB.sel/upd('agendamentos')`, `DB.sel('bloqueios_horario')`, `DB.upd('pacientes')` e `SB.from('renata_acoes')`.
- `25352dc7`: RPCs `primeiros_passos`/`marcar_primeiro_passo`.

---

## 7) Modo demonstração × modo real (`SB_ON`)

**Como decide** [confirmado]: `SB_ON = !!SB` (`c001` L63). `SB` só é criado com `SUPABASE_URL` + chave pública válidas e com a biblioteca carregada. Sem isso, `SESSAO.estado = 'demo'`, `PortaSupabase` libera o `App` **sem login** e `AvisoDemo` mostra uma faixa.

**O que muda** [confirmado]:
| Parte | Demo | Real |
|---|---|---|
| Login | Não existe | `TelaAcesso` + `meu_contexto` |
| Dados | Listas fixas dentro dos arquivos de tela | `CARGAS.*` do Supabase |
| Gravar | Só muda a tela | `*Svc` → banco, com desfazer se falhar |
| Filtros/abas | `localStorage` ou estado local | `preferencias_usuario` |
| Renata IA | Chave digitada (localStorage) → `api.anthropic.com` direto | Edge `renata` (ou `window.claude` dentro do claude.ai) |
| Renata voz | `api.elevenlabs.io` direto | Edge `renata` (`voz`/`transcrever`) |
| Mensagens | Respostas automáticas inventadas (`WA_REPLIES`, `366b46a2` L918) | Grava "pendente" no banco |

**Onde moram os dados fictícios** [confirmado]:
- `d41989a4`: `PATIENTS`, `TEAM_STORE` ("Bella Forma"), `KIT_USER`
- `d47643ae`: pacientes, profissionais, produtos (`PRODUTOS0`), receitas geradas (`genReceitas`), `FIN_PROS`, `seedMsgs`, `seedRecs`, `seedDocs`, NF, WhatsApp e cerca de 207 KB de imagens
- `25352dc7`: `WEEK`, `DAILY`, `FUNNEL`, `CANAIS0`, `AGENDA_DEMO`
- `366b46a2`: `INBOX`, `EQUIPE`, `LEADS_STORE` inicial
- `c005`: `NOTIF_DEMO`
- `c00b`: `ANAM_DEMO`/`MODELOS_PRONTOS`
- `1b7a2c45`: `RN_CLINICA`, `RN_PAINEL` e as respostas fixas de `renataLocal`

**Limpeza no modo real** [confirmado]. Cada serviço zera os dados de demonstração **na hora em que o arquivo carrega**:
- `c003` L60: `PAC`, `PAC_STORE`, `APPT_STORE`, `ANAM_STORE`, `MODEL_STORE` e a data de hoje
- `c005` L32: `INBOX`, `EQUIPE`, `LEADS_STORE`, `CHAT_STORE`
- `c006` L47: `REC_STORE`, `DESP_STORE`, `PROD_STORE`, `PAC_NOMES`, `FIN_METAS` e NF
- `c007` L30: `TEAM_STORE`, `CAST_STORE`, `SELOS_STORE` e `WA_STORE`

**Riscos de o fictício aparecer no modo real:**
1. **Confirmados:**
   - o QR do WhatsApp é falso também no real (`FakeQR`)
   - o subtítulo do Painel é fixo ("Seu progresso esta semana está ótimo.")
   - o diálogo "Novo agendamento" promete "O paciente recebe a confirmação automaticamente", mas ninguém envia
   - "2 etapas" é só uma marcação no perfil
2. **Inferido:** `RN_CLINICA` começa com os dados da "Clínica Bella Forma" e só é trocada **depois** que `carregar('catalogos')` termina (`c00a` L1064 → `rnPreencherClinica`). Se a Renata for usada antes, ou se a carga falhar, o resumo enviado à IA pode levar o nome, CNPJ e endereço fictícios.
3. **Inferido:** a limpeza depende da **ordem dos scripts**. Se um serviço deixar de carregar ou mudar de lugar, as listas fictícias ficam na tela do cliente real. `PROF_STORE`, `NF_STORE`, `WA_STORE` e `PLAN_STORE` só são trocados quando a carga correspondente roda.
4. **Confirmado:** `renataLocal` usa `PATIENTS` e números fixos sem checar `SB_ON` (`1b7a2c45` L820–835). Hoje ela só é chamada pelo caminho de demonstração, mas basta uma mudança de fluxo para virar resposta errada no real. [inferido]
5. **Confirmado:** se o `config.js` falhar ou vier vazio, **o sistema abre sem login, em modo demo**, em vez de mostrar erro (já apontado na Auditoria 01, R8).

---

## 8) Legado, duplicado ou acoplado demais

| # | Achado | Evidência | Status |
|---|---|---|---|
| L1 | **`ROUTES` cobre só 6 telas.** CRM, Estoque, Financeiro, Configurações e Perfil são "rotas" simuladas por preferências gravadas no banco. Para abrir `/crm`, o sistema primeiro **grava** a preferência. No demo, `/crm` abre Mensagens sem o CRM (`aplicarPrefsRota` exige `SB_ON`). | `1b7a2c45` L33; `c001` L102–207 | confirmado |
| L2 | **Kit do Design System duplicado e sobrescrito.** O `7bf00496` define `PainelScreen`, `PatientsTable`, `PacientesScreen`, `AgendaScreen`, `MensagensScreen`, `PerfilScreen`, `AppShell`, `useIsMobile`, `KIT_NAV`, `PATIENTS`… em `window`, e os arquivos do app redefinem tudo depois. `d41989a4` é cópia estendida do `kit-shared.jsx`; `7af61c93` é cópia do `Shell.jsx`. O `App` do kit tenta montar no `#root` (L3313) e só não aparece porque roda antes do `#root` existir. | `7bf00496` L3188–5554, L3313 | confirmado |
| L3 | **Código morto:** `MensagensV01` (~560 linhas, só usado se trocar a constante), `PatientsTable` (exportado e nunca usado), `ConversaTab` (só definido), `MODULOS_TODOS` (repete `allModuleIds`). Componentes do DS sem uso: Badge, KanbanCard, Progress, Table, Tabs, PageHeader, Card, Tooltip. | `366b46a2` L166–723, L4186; `25352dc7` L446; `d47643ae` L3:662; `c001` L950 | confirmado |
| L4 | **Serviços dependem de variáveis criadas nas telas (dependência invertida).** Os stores de dados (`PAC_STORE`, `APPT_STORE`, `PROD_STORE`, `REC_STORE`…) nascem no arquivo de telas minificado e são lidos ou zerados pelos serviços que carregam depois (`c003`, `c006`, `c007`, `c00a`). `CARGAS.equipe` (`c001`) usa `FUNC_PRESET` do `d47643ae`. `c005` zera `INBOX`/`EQUIPE`, que vivem em `366b46a2`. | `c003` L60; `c005` L32; `c006` L47; `c007` L30; `c001` L953 | confirmado |
| L5 | **`CARGAS.catalogos` remendado em cadeia** por 4 arquivos (cada um guarda a versão anterior e a envolve). Ao todo são 25+ consultas de uma vez na abertura. Mudar a ordem dos scripts quebra a cadeia sem nenhum erro visível. | `c001` L850, `c003` L76–77, `c007` L568–569, `c008` L57–58 | confirmado |
| L6 | **Telas e Renata gravando direto no banco**, sem serviço: procedimentos, produtos, comparações e anamnese na tela; agendamentos e pacientes na Renata. A mesma regra fica em dois lugares. Exemplo: remarcar existe só na Renata (`DB.upd('agendamentos')`), e o `AgSvc` só sabe criar. | seção 6 | confirmado |
| L7 | **Arquivos gigantes:** `d47643ae` (665 KB, minificado, com ~207 KB de imagens base64 entre `SaluteCast` e `CertificacoesTab`); `1b7a2c45` (326 KB / 9.491 linhas: Renata inteira + ROUTES + App + montagem do React); `c00b` (anamnese + 2 páginas públicas + impressão + `RaizSalute`); `c001` (149 KB: Supabase, rotas, dados, login, Master, menus e porta). Componentes com 700 a 1.000 linhas: `RenataChat`, `RenataVoiceMode`, `WaChat`, `TelaAcesso`, `PainelMaster`. | tamanhos em `front/extraido/` | confirmado |
| L8 | **Demo e real misturados em todo lugar:** ~300 `SB_ON` (117 no minificado, 75 na Renata) e 19 hooks condicionais. Cada tela tem duas versões de comportamento no mesmo componente. | contagem por arquivo | confirmado |
| L9 | **Chamadas diretas à Anthropic/ElevenLabs no navegador** (demo), com chave no `localStorage` e o cabeçalho `anthropic-dangerous-direct-browser-access`. Há 2 chamadas à Anthropic (`rnClaudeApi`, `rnTestApi`) e 3 à ElevenLabs. Com chave Gemini no demo, a chamada continuaria indo para a Anthropic (só o servidor sabe usar o Gemini). | `1b7a2c45` L2718, L3013, L2156, L4179, L8326 | confirmado (chamadas) / inferido (Gemini no demo) |
| L10 | **Renata depende do ambiente de hospedagem:** dentro do claude.ai, `window.claude.use('sample')` tem prioridade sobre a função `renata`, **mesmo com Supabase ligado**. O resumo da clínica e os dados de paciente vão então para a IA da conta claude.ai de quem está vendo, e não para o servidor da Salute (que conta consumo e usa a chave da clínica). No Netlify, vai para o servidor. | `1b7a2c45` L2366, ~L3205–3320 | confirmado |
| L11 | **Tradução por cima do React:** idioma EN/ES troca o texto direto nos nós da página (`TreeWalker` + `MutationObserver`, dicionário `DICT`), por fora do React. Pode brigar com atualizações da tela e não traduz textos que não estejam no dicionário. | `d41989a4` L684–975 | confirmado (mecanismo) / inferido (efeitos) |
| L12 | **Helpers repetidos:** helpers do Babel/regenerator repetidos em 13 arquivos; dois hooks de largura (`useNarrow`/`useIsMobile`); componentes próprios equivalentes aos do DS (`GTabs` × `Tabs`, `Badge2` × `Badge`, `CrmCard` × `KanbanCard`); `abrir_tela` definida duas vezes e trocada depois. | ver seção 4 | confirmado |
| L13 | **Globais com nomes genéricos** exportados em `window`: `B`, `HOJE`, `grid2`, `Block`, `Toggle`, `glass`, `el`, `ek`, `bg`. Qualquer script novo com o mesmo nome sobrescreve sem aviso. | exports de `d47643ae`, `c001` | confirmado |
| L14 | **Nomes legados "kit"**: `salute-kit:*` no localStorage, `KIT_NAV`, `KIT_USER` (o objeto do usuário do kit vira o usuário logado). Mostram que o app cresceu em cima do kit de demonstração. | `d41989a4`; `c001` L1139 | confirmado |
| L15 | **Funções que a tela promete e não existem:** editar/cancelar agendamento na Agenda; criar lead no CRM; envio real de WhatsApp; QR real do WhatsApp; emitir NFS-e; verificação em 2 etapas; bloqueios de horário. | seções 3.4–3.9 | confirmado |

---

## 9) Não confirmado / precisa investigar

1. **Erros silenciosos do Design System** (`window.SaluteProjetoDesigner_8b4683.__errors`): só dá para ver abrindo no navegador, e esta auditoria não executou o app. [não confirmado]
2. **Permissões por usuário:** `useAccess` usa `SESSAO.modulos`, que vem de `clinica.modulos` no `meu_contexto`. Falta confirmar se a RPC já combina os módulos da clínica com as `permissoes` do usuário logado ou se a tela só reflete o que a clínica contratou. [não confirmado]
3. **Função `renata` versão 4 (Gemini):** o front manda `model: 'claude-…'` mesmo com chave Google. O commit diz que o servidor traduz (`gemini.ts`), mas isso não foi revisado aqui, e a Auditoria 02 descreveu a versão 2. [inferido]
4. **Tempo de carga real** do pacote (~3,6 MB com React de desenvolvimento e imagens base64) em celular. [não confirmado]
5. **`RN_CLINICA` com dados fictícios no início do modo real:** confirmar no navegador se dá para mandar pergunta à Renata antes de `catalogos` terminar. [inferido]
6. **Uso da Renata via `window.claude` no artifact:** é intencional que clínicas reais usem o artifact do claude.ai (e não o saluteia.site)? Isso muda para onde vão os dados de paciente e quem paga a IA. [não confirmado]
7. **Tradução EN/ES:** verificar na prática se causa textos misturados ou erros do React ao trocar de idioma. [não confirmado]
8. **Agenda sem edição:** confirmar com o fundador se editar/cancelar pela tela era esperado (pode ter sido perdido numa versão do Claude Design). [não confirmado]
9. **Colunas `excluido_em`:** `DB.sel` sempre filtra `excluido_em IS NULL`; confirmar que todas as tabelas lidas por `DB.sel` têm essa coluna, porque uma tabela sem ela faz a carga do módulo falhar. [não confirmado]

### O que contradiz ou ajusta as Auditorias 01 e 02
- **Ações da função `renata`:** são `status`, `testar`, `chat`, `voz` e **`transcrever`**. `remarcar` é tipo de registro em `renata_acoes`, não ação do servidor. Confirma o ajuste da Auditoria 02 e corrige a 01.
- **R6 da Auditoria 01 (postMessage com `'*'`):** já corrigido. Todas as mensagens da ponte de voz usam `location.origin` e conferem `ev.origin`.
- **Auditoria 02 descreve a função `renata` versão 2** (só Claude, modelo `claude-` obrigatório). O repositório já tem a versão com Gemini (`supabase/functions/renata/`, migrations `…gemini_*`), e o front já manda o provedor `google` para `salvar_segredo`. A parte da Auditoria 02 sobre a edge function precisa ser revista.
- **Hospedagem (Auditoria 01, pergunta 7 e R12):** `deploy/netlify/` tem `index.html` e `config.js` idênticos aos de `front/`, mais a regra SPA `/* /index.html 200`. As rotas por endereço funcionam no Netlify. Ainda não confirmado: se essa pasta já foi publicada.
- **Novo em relação às duas:** prioridade do `window.claude` sobre o servidor no modo real; "2 etapas" sem verificação real; CRM sem criação de leads; Agenda sem edição; `MensagensV01`/`PatientsTable`/`ConversaTab` mortos; e `CARGAS.catalogos` encadeado em 4 arquivos.
