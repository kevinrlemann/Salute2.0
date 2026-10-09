# Front-end do Salute IA

Estado verificado em 2026-10-09 (commit `af596dd`) em `front/extraido/`, que foi conferido como idêntico ao conteúdo de `front/index.html` (rodando `tools/unbundle.py` de novo e comparando). [confirmado]

Legenda: **[confirmado]** = visto no código · **[inferido]** = provável, não comprovado · **[não confirmado]** = não verificado.
Referências: `c001` = `front/extraido/5a1e7e02-0000-4000-8000-00000000c001.js` (o mesmo vale de `c002` a `c00b`); os demais arquivos pelos 8 primeiros caracteres (`1b7a2c45`, `d47643ae`…). "L123" = linha. O `d47643ae` é minificado (11 linhas), então só dá para citar o nome da função.

Visão geral do sistema: [`architecture.md`](architecture.md). Banco: [`database.md`](database.md).

---

## 1. Como o pacote é montado

- `front/index.html` é **um pacote único** exportado do Claude Design. Dentro dele há um manifesto (`<script type="__bundler/manifest">`) com cada arquivo em base64 (alguns comprimidos com gzip) e um `template.html`. Ao abrir, o carregador monta a página a partir do template. [confirmado: `tools/unbundle.py`]
- Não há bundler (Webpack/Vite) nem Babel no navegador: o JSX já vem convertido. Cada arquivo pendura o que exporta em `window` (`Object.assign(window, {...})`), e os seguintes usam essas globais. **Por isso a ordem dos `<script>` importa.** [confirmado]
- `front/config.js` fica **fora** do pacote e é carregado por caminho relativo à pasta de publicação (script inline do template, `template.html` L155-156). [confirmado]

### 1.1 Ordem de carregamento (`front/extraido/template.html` L153-177)

| # | Arquivo | Tamanho | Papel |
|---|---|---|---|
| 1 | `709b623d…js` | 107 KB | React 18.3.1 (*development*) |
| 2 | `7dd7e122…js` | 1,0 MB | ReactDOM 18.3.1 (*development*) |
| 3 | inline | — | Descobre a pasta de publicação (`window.SALUTE_DIR`) e aponta o `config.js` |
| 4 | `config.js` | <1 KB | `window.SALUTE_CONFIG = { SUPABASE_URL, SUPABASE_ANON_KEY, BASE_PATH }` |
| 5 | `c002` | 213 KB | supabase-js 2.117.2 (UMD) |
| 6 | `c004` | 55 KB | qrcode-generator (QR dos links de anamnese e documentos) |
| 7 | `7bf00496…js` | 169 KB | Design System "SaluteProjetoDesigner" (30 componentes, kit de referência; carrega ícones Lucide de `unpkg.com`) |
| — | `</head><body><div id="root">` | | |
| 8 | `d41989a4…js` | 32 KB | "kit-shared": `makeStore/useStore`, `useAccess`, menu `KIT_NAV`, `CONFIG_TABS`, equipe demo, sons, idiomas |
| 9 | `c001` | 149 KB | **Núcleo**: cliente `SB`, escala `Z`, `SB_ON`, sessão `SESSAO`, rotas, `DB`, `ARQ`, `tempoReal`, `CARGAS`, login (`TelaAcesso`), Painel Master, `PortaSupabase` |
| 10 | `7af61c93…js` | 16 KB | `AppShell` (menu lateral/topo; barra inferior no celular) |
| 11 | `25352dc7…js` | 57 KB | `PainelScreen` (dashboard, funil, primeiros passos) |
| 12 | `d47643ae…js` | 669 KB | **Telas** minificadas: Pacientes/ficha/prontuário, Agenda, Gestão (Estoque, Financeiro, NF), Configurações (abas), dados demo e imagens base64 |
| 13 | `c003` | 73 KB | `PacSvc`, `ProntSvc`, `AgSvc`, regra de 30 min, `agendarRapido`, links públicos |
| 14 | `c006` | 44 KB | `FinSvc`, `EstSvc` |
| 15 | `c007` | 48 KB | `ClinSvc`, `EquipeSvc`, `ProfSvc`, `WaSvc`, `ContSvc`, `SELOS_LOGOS` |
| 16 | `c00b` | 155 KB | Anamnese (`AnamSvc`, editor, preenchimento, local da assinatura), páginas públicas, impressão, **`RaizSalute`** |
| 17 | `366b46a2…js` | 131 KB | `MensagensScreen` (caixa estilo WhatsApp, chat da equipe, CRM kanban) |
| 18 | `c005` | 56 KB | `MsgSvc`, `CrmSvc`, notificações (sino) |
| 19 | `30c3fd71…js` | 37 KB | `PerfilScreen` (aba Minha conta) |
| 20 | `c008` | 17 KB | `ContaSvc` (perfil, senha, plano) |
| 21 | `c009` | 18 KB | Dados do Painel (`painel_mes`, troca de mês) |
| 22 | `1b7a2c45…js` | 358 KB | **Renata** inteira, `AgEditar`, `AgenteIATab`, `ROUTES`, `App` e a montagem do React (L10412) |
| 23 | `c00a` | 44 KB | Renata no modo conectado: `rnFn` (chama a função `renata`), registro de conversas/ações, `rnApplyDB`, chave Groq |

Fontes: 4 arquivos `.woff2` (Aspekta). Tamanhos de `ls` em `front/extraido/`. [confirmado]

## 2. Telas e rotas

`RaizSalute` (`c00b` L2520) decide: `/a/<token>` ou `?a=` → anamnese pública; `/u/<token>` ou `?u=` → envio público de documentos; o resto → `PortaSupabase` (`c001` L4262) → login, Master ou `App` (`1b7a2c45` L9972). [confirmado]

`ROUTES` (`1b7a2c45` L33) tem 6 telas: `painel`, `pacientes`, `agenda`, `mensagens`, `gestao`, `perfil` (= Configurações). CRM, Estoque, Financeiro e Minha conta são abas, abertas por preferência gravada. [confirmado]

| Endereço | Tela | Componente |
|---|---|---|
| `/painel` | Painel | `PainelScreen` (`25352dc7`) |
| `/pacientes` | Lista e ficha | `PacientesScreen` → `PacienteFicha` (`d47643ae`) |
| `/agenda` | Agenda dia/semana/mês | `AgendaScreen` (`d47643ae`) |
| `/mensagens`, `/crm` | Conversas, chat da equipe, CRM | `MensagensScreen` → `MensagensWA` / `CrmBoard` (`366b46a2`) |
| `/gestao`, `/estoque`, `/financeiro` | Gestão | `GestaoScreen`, `EstoqueScreen`, `FinanceiroScreen` (`d47643ae`) |
| `/configuracoes`, `/perfil` | Configurações / Minha conta | `ConfigScreen` (`d47643ae`), `PerfilScreen` (`30c3fd71`) |
| `/login`, `/cadastro` | Acesso | `TelaAcesso` (`c001`) |
| `/master` | Equipe Salute | `PainelMaster` (`c001`) |
| `/a/<token>`, `/u/<token>` | Páginas públicas | `PaginaAnamnese`, `PaginaEnvioDocs` (`c00b`) |

As rotas por endereço ligam quando `BASE_PATH` existe no `config.js` (hoje `""`). No Netlify, `netlify.toml` manda qualquer caminho para `index.html`. [confirmado]

### 2.1 Abas de Configurações

`CONFIG_TABS` (`d41989a4` L521) [confirmado]:

| Chave interna | Rótulo | Componente | Observação |
|---|---|---|---|
| `cadastro` | Cadastro | `CadastroTab` | Clínica, equipe e acessos, profissionais, procedimentos, modelos de anamnese, som |
| `canais` | **Integrações** | `CanaisTab` | Antes "Canais". WhatsApp (oficial/não oficial). A chave interna continua `canais` (permissão `perfil.canais`) |
| `agente` | **Agente de IA** | `AgenteIATab` (`1b7a2c45` L6121) | 13 seções: Status, Identidade e tom, Assuntos, Serviços, Agendamento, Horários, CRM, Follow-up, Lembretes, Transferência humana, Conhecimento, Privacidade, Prévia. Rodapé com Salvar/Desfazer e versão (`config_versao`). Grava em `agente_ia`, `procedimentos` (campos `ia_*`), `profissionais_procedimentos`, `renata_horarios`, `renata_base_conhecimento`. Contrato do banco em `docs/agente-ia.md` |
| `flix` | Saluteflix | — | Conteúdo global |
| `parcerias` | Parcerias | — | Inclui a Nexus (global, gravada no banco) |
| `cert` | Certificações | `CertificacoesTab` | Certificações vêm do banco (`selos_certificacoes`); o logo, se não houver logo enviado, vem de `SELOS_LOGOS` (`c007` L31-37), que reaproveita as imagens embutidas no front |
| `conta` | Minha conta | `PerfilScreen` | |

Cada aba é travada por `can('perfil.<chave>')`. [confirmado em `d47643ae`] A prévia do Agente (`agenteTexto`, `1b7a2c45` L3816) monta o mesmo texto que a função `agente_ia_regras` do banco. [confirmado pelo comentário e pelo texto] Só dono/gestor grava em `agente_ia` (RLS). [confirmado]

## 3. Camada de dados

| Peça | Onde | O que faz |
|---|---|---|
| `SB` | `c001` (início) | Cliente Supabase; recusa chave `service_role` |
| `DB` | `c001` L297 | `sel, ler, tudo, gravar, ins, upd, updWhere, del, rpc`. Sempre põe `clinica_id` da clínica ativa e ignora `excluido_em`; `del` é exclusão lógica; `tudo` pagina de 1000 em 1000 |
| `ARQ` | `c001` L439 | `enviar, enviarDataUrl, url` (Storage; link assinado de 1 h) |
| `tempoReal` | `c001` L572 | Canal realtime filtrado por `clinica_id` |
| `CARGAS` / `carregar` / `useCarga` | `c001` L597-620 | Uma carga por módulo e clínica |
| `bg(promessa, desfazer)` | `c001` | Grava em segundo plano e desfaz na tela se falhar |

Cargas registradas [confirmado]: `catalogos` (`c001` L863, estendida em cadeia por `c003` L77, `c007` L577, `c008` L58), `equipe` (`c001` L966), `pacientes` (`c003` L287), `agenda` (`c003` L1345), `mensagens`/`crm`/`notificacoes` (`c005` L101/L841/L1022), `financeiro`/`estoque` (`c006` L192/L732), `clinica`/`conteudo` (`c007` L57/L708), `painel` (`c009` L36), `anamnese` (`c00b` L462).

### 3.1 Serviços

| Serviço | Arquivo | Métodos | Grava em |
|---|---|---|---|
| `PacSvc` | `c003` L307 | achar, criar, garantir, salvar, trocarNumero, historico, hist | `pacientes`, `historico_paciente` |
| `ProntSvc` | `c003` L468 | carregar, modelos, addModelo, pastaId, enviarAnamnese, salvarMapa, salvarProc, enviarArquivos, moverDoc, excluirDoc, salvarComparacao, linkDocumentos | prontuário, mapeamento, documentos, links; bucket `prontuario` |
| `AgSvc` | `c003` L1482 | **criar, editar** | `agendamentos` |
| `MsgSvc` | `c005` L472 | chavePaciente, garantirConversaPaciente, enviar, enviarTextoPaciente, reagir, apagar, marcarLida, pacienteDaConversa | `conversas`, `mensagens` (status "pendente"), chat da equipe |
| `CrmSvc` | `c005` L910 | mover, ia, paciente | `leads` |
| `FinSvc` | `c006` L243 | baixa, idCat, parcelas, fornecedor, criar, **editar**, status, categorias, salvarNF, enviarCertificado | `contas_receber`, `contas_pagar`, `parcelas`… |
| `EstSvc` | `c006` L772 | criar, mover, lancar, recarregar, lista | `produtos`, `movimentacoes_estoque`, `lotes` |
| `ClinSvc` | `c007` L130 | salvar | `clinicas`, `configuracoes_clinica`, horários, formas de pagamento |
| `EquipeSvc` | `c007` L333 | acessos, convidar | `permissoes`; RPC `convidar_membro` |
| `ProfSvc` | `c007` L424 | salvar | `profissionais` |
| `WaSvc` | `c007` L591 | webhook, conectar, desconectar | `instancias_whatsapp`; `salvar_segredo` |
| `ContSvc` | `c007` L804 | flix, parceiros, cast, selos | conteúdo global (só leitura para clínicas) |
| `ContaSvc` | `c008` L99 | salvarPerfil, foto, trocarSenha, linkSenha, doisFatores, trocarPlano, consultor | `perfis_usuario`; RPCs `trocar_plano`, `pedir_consultor` |
| `AnamSvc` | `c00b` L506 | salvar, definirPadrao, excluir, regerar, cancelar, publica, rascunho, responder, envio | modelos e envios de anamnese; RPCs públicas |
| Renata (servidor) | `c00a` | `rnFn` (L51), `rnPrepararDados` (L536), `rnSemIA` (L564), `rnRegistrarAcao` (L743), `rnApplyDB` (L774) | função `renata`; `renata_conversas/mensagens/acoes` |

Ainda há gravação direta pela tela, fora dos serviços (procedimentos, produtos, comparações antes/depois, anamnese presencial em `d47643ae`; agendamentos e pacientes pela Renata em `1b7a2c45`). [confirmado na Auditoria 03; agendamentos reconfirmados em `1b7a2c45` L7602 e L7728]

### 3.2 Stores (estado global)

Não há Redux nem Context. O estado fica em stores caseiros: `makeStore(valor)` + `useStore(store)` (`d41989a4` L474). Principais [confirmado]: `SESSAO`, `CAT`, `CARGA`, `PREF` (`c001`); `PAC_STORE`, `APPT_STORE`, `PROD_STORE`, `REC_STORE`, `DESP_STORE`, `WA_STORE`, `SELOS_STORE` (nascem em `d47643ae` e são zerados pelos serviços no modo conectado); `MSG_LISTA`, `NOTIF` (`c005`); `LEADS_STORE`, `CHAT_STORE` (`366b46a2`); `PAINEL`, `PAINEL_MES` (`c009` L32); `RN_STORE`, `RN_AI`, `RN_MODE`, `RN_PENDING` (`1b7a2c45` L1067), `VOZ`, `FICHA_GLOBAL`. Lista completa: Auditoria 03, seção 5.

## 4. Funcionalidades recentes (onde estão)

| Funcionalidade | Onde | Status |
|---|---|---|
| **Agenda em blocos de 30 min** | `AG_PASSO_MIN = 30`, `agMeiaHoraOk`, `agFimNoBloco`, `AG_MSG_PASSO` (`c003` L1470-1480); horários do formulário `AG_HORAS` 06:00–22:00 de 30 em 30 e `AG_DURACOES` (`c003` L1745-1750); checado em `AgSvc.criar` e `AgSvc.editar`, em `AgEditar` e nas ferramentas da Renata (`1b7a2c45` L7288, L7642) | confirmado |
| **Editar agendamento** | Clique no card da agenda → `abrirEdicaoAgendamento` (`1b7a2c45` L3492, só modo conectado) → `AgEditar` (L3510): data, horário, profissional, status, duplicidade, cancelamento → `AgSvc.editar` (`c003`) | confirmado |
| **Formulário padrão "Novo agendamento"** | Estado no `App`; exposto como `window.abrirNovoAgendamento(pre)` (`1b7a2c45` L10064). A ficha do paciente usa essa função | confirmado |
| **Editar lançamento financeiro** | Lápis na `LancTable` (`d47643ae`) → `FinSvc.editar(kind, r, antes)` (`c006` L389); refaz a baixa só quando o status muda | confirmado |
| **Funil de 5 etapas** | Novo Lead, Aguardando atendente, Agendado, Convertido, Perdido (banco + `25352dc7` L79 + `366b46a2` L2794); o painel mostra perdidos (`c009` L295, `25352dc7` L1410) | confirmado |
| **Local da assinatura (anamnese)** | `navigator.geolocation` com status `ok/negado/indisponivel/tempo_esgotado` (`c00b` L89-108); exibido a partir de `local_assinatura` (`c00b` L870) | confirmado |
| **Agente de IA** | `AgenteIATab` (`1b7a2c45` L6121), tabela `agente_ia` | confirmado |
| **Chave de IA = Groq** | `rnProvedorChave` sempre devolve `'groq'` (`c00a` L46-47); passo a passo do Groq na tela de conexões (`1b7a2c45` L4258, L4509) | confirmado |

## 5. Renata no front

- Entradas: botão no topo → `RenataRoot` (`1b7a2c45` L6526) → `RenataChat` (L5618) / `RenataVoiceMode` (L4655) / `RenataSettings` (L4309, conexões); comando de voz global `VozRoot` (L9671); `FichaGlobal` (L6902). [confirmado]
- Quem responde (`_rnAnswerCore`, ~L3270) [confirmado]:
  1. `window.claude.use('sample')` (IA do claude.ai), quando roda dentro do artifact — **mesmo no modo conectado**
  2. ponte com a janela que abriu a voz (`rnBridge`, restrita à mesma origem)
  3. com chave/servidor disponível: `rnClaudeApi` (L2725) → `rnFn({acao:'chat'})` → função `renata` (Groq); no demo, Anthropic direto
  4. sem IA: `rnSemIA` (conectado) ou `renataLocal` (demo)
- O front ainda manda `model: 'claude-sonnet-5-5'`/`'claude-sonnet-4-5'` (chat) e `'claude-haiku-4-5-20251001'` (voz) (`1b7a2c45` L2711-2712); o servidor só valida o nome e usa o Groq. [confirmado]
- O pedido leva `RENATA_RULES` (L1047) + `rnSnapshot()` (L400, resumo da clínica) + histórico + ferramentas. O servidor põe as regras do Agente de IA na frente. [confirmado]
- **Ferramentas** (`RENATA_TOOLS`, L930): consulta — `financeiro_periodo`, `agenda_do_dia`, `dados_paciente`, `lancamentos`, `abrir_tela`, `horarios_livres`, `abrir_paciente`, `contas_a_vencer`, `saldo_estoque`; propostas — `propor_lancamento_financeiro`, `propor_movimentacao_estoque`, `propor_agendamento`, `propor_alteracao_agendamento`, `propor_cadastro_paciente`, `propor_atualizacao_paciente`, `propor_envio_anamnese`, `propor_mensagem_paciente`, `propor_registro_procedimento`, `propor_baixa_lancamento`, `propor_etapa_lead`, `propor_ia_lead`; e `ajustar_ponto_mapa`. [confirmado]
- **Confirmação**: a proposta vira cartão (`RnActionCard`, L5457; store `RN_PENDING`). Só depois do "confirmar" roda `rnApply` (L1437) / `rnApplyDB` (`c00a` L774) / `rnCmd` (L6819), e a ação é registrada em `renata_acoes` (`rnRegistrarAcao`). Lançamento financeiro e movimentação de estoque só são propostos com todos os campos ditos pela pessoa (commit `d795ea0`). [confirmado no código / regra de campos: confirmado pelo commit]
- Permissão da Renata: `rnPode(id)` (L6553) olha os módulos da tela; a proteção real é a RLS. [confirmado]
- Voz: fala por `rnFn({acao:'voz'})`; escuta pelo reconhecimento do navegador ou `acao:'transcrever'`. Se a ElevenLabs recusar a chave, usa a voz do aparelho na sessão e avisa uma vez (commit `ad143a6`). [confirmado pelo commit; não reverificado linha a linha]

## 6. Padrões de interface

- **Camadas (z-index)**: escala única `Z` em `c001` L63-75: `menu` 60 · `gaveta` 200 (ficha, Renata) · `telaCheia` 300 · `dialogo` 600 · `aviso` 700. Telas novas usam `Z.*`, nunca número solto. [confirmado] Faixa documentada no `CLAUDE.md`: conteúdo/menus até 100, gavetas 200–250, telas cheias 300–400.
- **`data-overlay="1"`**: toda janela sobreposta leva esse atributo. Quem está embaixo (ex.: a ficha do paciente) só fecha com Esc se **não** houver `[data-overlay="1"]` aberto, então o Esc fecha só a janela de cima. Exemplos: `Overlay` (`d47643ae`), `AgEditar` (`1b7a2c45` L3612), comando de voz (L9785). [confirmado]
- Diálogo aberto a partir de outra janela (ex.: agendar pela ficha) abre centralizado acima de tudo, com fundo escurecido, e ao fechar volta à origem. Avisos nunca ficam atrás de diálogo. [confirmado no `CLAUDE.md` e commit `af596dd`]
- Agenda: grade e formulários de 30 em 30 minutos (seção 4).
- Gravação otimista: a tela muda na hora e `bg(..., desfazer)` volta se o banco recusar; erros com `avisoErro`, sucesso com `avisoOk`. [confirmado]

## 7. Modo demonstração × conectado

`SB_ON` (`c001` L76) liga o modo conectado. Sem ele, o app abre sem login com a clínica fictícia "Bella Forma". Os dados demo moram nos próprios arquivos de tela e são zerados pelos serviços quando `SB_ON` é verdadeiro (`c003` L60, `c005` L32, `c006` L47, `c007` L30-40). Detalhes e riscos: Auditoria 03, seção 7. [confirmado]

## 8. Como editar e reempacotar

```bash
# 1. (opcional) regenerar a cópia legível a partir do publicado
python3 -I tools/unbundle.py front/index.html front/extraido

# 2. editar os arquivos em front/extraido/*.js (nunca o d47643ae sem necessidade: é minificado)

# 3. regravar no pacote só o que mudou
python3 -I tools/rebundle.py front/index.html front/extraido
```

- `rebundle.py` compara cada arquivo com o que está no manifesto e só recompacta os que mudaram; o resto fica byte a byte igual. Ele **não** relê `template.html`: mudar a ordem dos scripts ou o HTML base não é suportado pelo script. [confirmado]
- Depois de editar: testar (seção 9), conferir o diff, commit, e só publicar com aprovação (ver `architecture.md` §6). `deploy/netlify/` não é atualizado pelo rebundle e está desatualizado. [confirmado]
- Regras: não mudar a ordem dos scripts; usar `Z.*` e `data-overlay="1"` em sobreposições; acesso a dados por `DB.*`/serviços; permissão de verdade no banco.

## 9. Como testar (headless, modo demonstração)

Testado nesta verificação com Playwright 1.56.1 (instalação global, navegadores em `/opt/pw-browsers`): a página abre em demonstração, `SB_ON = false`, `window.Z` presente, `window.abrirNovoAgendamento` definido e nenhum erro de página. [confirmado]

```bash
T=$(mktemp -d)   # de preferência dentro do scratchpad da sessão
cp front/index.html "$T/"
# config vazio = modo demonstração (nunca use dados reais em teste automático)
printf 'window.SALUTE_CONFIG = { SUPABASE_URL: "", SUPABASE_ANON_KEY: "", BASE_PATH: "" };\n' > "$T/config.js"
(cd "$T" && python3 -m http.server 8765 &)
cat > "$T/teste.cjs" <<'EOF'
const { chromium } = require(process.env.PWMOD);
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
  const erros = []; p.on('pageerror', e => erros.push(e.message));
  await p.goto('http://localhost:8765/index.html', { waitUntil: 'load' });
  await p.waitForTimeout(4000);
  console.log(await p.evaluate(() => ({ SB_ON: window.SB_ON, Z: window.Z })), erros);
  await p.screenshot({ path: process.env.T + '/painel.png' });
  await b.close();
})();
EOF
T="$T" PWMOD="$(npm root -g)/playwright" node "$T/teste.cjs"
pkill -f "http.server 8765"
```

Observações: no ambiente de nuvem o `unpkg.com` pode estar bloqueado (ícones Lucide não carregam, a página funciona). O modo conectado não deve ser testado automaticamente contra o banco de produção. [confirmado / regra do manual]
