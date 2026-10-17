# Plano de cibersegurança do Salute (2026-10-17)

Pedido do fundador, a partir do guia "O Caminho para a Cibersegurança" (TechFacil). O guia é sobre carreira; aqui o mesmo mapa
(as seis funções do **NIST CSF 2.0**: Governar, Identificar, Proteger, Detectar, Responder, Recuperar) foi aplicado ao Salute:
um SaaS com **dados de saúde** de pacientes de várias clínicas, onde a LGPD trata esses dados como "sensíveis" (art. 11).

Legenda: **[confirmado]** visto no código, no banco ou no painel nesta data · **[inferido]** conclusão lógica · **[não confirmado]**
depende de algo fora do alcance (painel, contrato, jurídico). Os riscos detalhados ficam em [`security.md`](security.md),
[`backlog.md`](backlog.md) e [`auditoria/05-seguranca.md`](auditoria/05-seguranca.md); aqui só o plano e a ordem.

> Atenção: este repositório é **público**. Por isso o plano não descreve como explorar nenhuma falha. A primeira ação do plano
> (G1) é tornar o repositório privado.

---

## 1. Onde estamos hoje (resumo)

| Função NIST | Nota (0 a 5) | O que já existe | O que falta de mais importante |
|---|---|---|---|
| Governar | 1 | Regras de desenvolvimento em `CLAUDE.md` e `security.md`; decisões do fundador registradas | Responsável formal, políticas escritas, contratos com fornecedores (DPA), RIPD da LGPD, repositório privado |
| Identificar | 3 | Mapa do banco, das integrações e da arquitetura (auditorias 01 a 05); advisors do Supabase | Inventário vivo de fornecedores e de onde ficam os dados; classificação dos dados |
| Proteger | 3 | RLS em todas as tabelas, isolamento por clínica, segredos no Vault, buckets privados, CSP, SRI, escape na impressão, links públicos com token e validade | MFA real, senha vazada bloqueada, limite de uso nas páginas públicas, CORS restrito na `renata`, minimização de dados enviados à IA |
| Detectar | 1 | Tabela `auditoria` com antes/depois em 34 tabelas; logs padrão do Supabase e da Netlify | Ninguém olha os logs; sem alertas; sem monitor de site fora do ar; advisors não rodam sozinhos |
| Responder | 0 | Nada escrito | Plano de incidente, contatos, modelo de aviso à ANPD (3 dias úteis) e às clínicas |
| Recuperar | 0 | Migrations versionadas desde 09/10 (89 arquivos) | Backup: o projeto está no plano **grátis** do Supabase, sem backup diário para restaurar; restauração nunca testada |

Fatos novos levantados hoje [confirmado]:
- O banco está na região **us-east-1 (Estados Unidos)**. Guardar dado de saúde fora do Brasil é **transferência internacional** (LGPD art. 33; regras da Resolução CD/ANPD nº 19/2024).
- Organização Supabase no plano **free**: sem backup diário restaurável e sem a proteção contra senha vazada (recurso do plano pago) [inferido pela documentação do Supabase; conferir no painel].
- Advisor de segurança do Supabase (17/10): **12 funções com privilégio elevado podiam ser chamadas sem login**. Foram fechadas hoje (migration `20261017230000_fecha_funcoes_anon.sql`), e a causa raiz foi corrigida: função nova não nasce mais aberta. Ficaram abertas só as 9 públicas de propósito (anamnese, envio de documentos, link de anúncio). Testado. Restam no advisor: senha vazada (painel), `pg_net` no schema público (risco aceito, P0-08) e 3 tabelas sem política (de propósito: ninguém do front acessa).

---

## 2. As 10 primeiras ações (ordem de prioridade)

| # | Ação | Por quê | Custo | Quem |
|---|---|---|---|---|
| 1 | **G1** Tornar o repositório GitHub privado | Hoje qualquer pessoa lê o código e os documentos de risco | Grátis | Fundador (GitHub › Settings › Danger Zone) |
| 2 | **P1** MFA (app autenticador) em todas as contas da empresa: GitHub, Supabase, Netlify, OpenAI, ElevenLabs, n8n, domínio, e-mail | Quem entra numa dessas contas tem o sistema inteiro | Grátis | Fundador |
| 3 | **R1** Plano Pro do Supabase (backup diário de 7 dias + senha vazada bloqueada + sem pausa) | Hoje, se o banco for apagado, não há como voltar | US$ 25/mês | Fundador |
| 4 | **G3** Contratos de tratamento de dados (DPA) aceitos com Supabase, OpenAI, ElevenLabs e Netlify | Dado de saúde indo para fora do Brasil exige base contratual | Grátis (são termos padrão de cada empresa) | Fundador + jurídico |
| 5 | **P2** Confirmar no painel do Auth: "Confirm email" ligado, Redirect URLs só do `saluteia.site`, senha mínima de 10 | Fecha o sequestro de convite (P0-01) | Grátis | Fundador (painel) |
| 6 | **RS1** Plano de resposta a incidente de 1 página (modelo na seção 7) | A ANPD exige aviso em 3 dias úteis; sem plano isso não acontece | Grátis | Fundador |
| 7 | **P5** Fechar as brechas de custo da Renata (P0-03) e restringir CORS ao site | Evita que alguém use a IA da Salute de graça e gere conta alta | Grátis (código) | Dev |
| 8 | **D1** Monitor do site e alerta por e-mail (UptimeRobot ou Better Stack, plano grátis) | Saber que caiu antes do cliente | Grátis | Fundador |
| 9 | **D2** Rotina semanal de 15 minutos: advisors do Supabase, uso da IA, logins estranhos | Detectar cedo | Grátis | Fundador ou dev |
| 10 | **G4** Política de privacidade e termo do paciente verdadeiros (quem recebe os dados, onde ficam) | A frase "só a clínica tem acesso" não é verdade hoje (A3) | Grátis (texto) / jurídico | Fundador + jurídico |

---

## 3. GOVERNAR: responsabilidades, regras e prioridades

**Papéis na LGPD [inferido, confirmar com jurídico]:** a clínica é a **controladora** dos dados dos pacientes; a Salute é **operadora**
(trata em nome da clínica). Para os dados das próprias clínicas e usuários, a Salute é controladora.

| ID | Ação | Detalhe | Custo |
|---|---|---|---|
| G1 | Repositório privado | GitHub privado é grátis. A Netlify continua publicando (a ligação usa a conta, não o fato de ser público) [inferido: conferir o deploy depois] | Grátis |
| G2 | Nomear o responsável por segurança e privacidade | Pode ser o fundador no começo. Publicar um e-mail de contato de privacidade (ex.: privacidade@saluteia.site). A LGPD pede um encarregado; a dispensa para pequeno porte (Resolução CD/ANPD nº 2/2022) **não vale** quando há tratamento de alto risco, como dado de saúde em escala [inferido] | Grátis |
| G3 | Contratos com fornecedores (DPA) | Supabase, OpenAI, ElevenLabs, Netlify e o provedor de WhatsApp: aceitar o DPA de cada um e guardar cópia. Para a OpenAI, conferir se a API não usa os dados para treino e a retenção | Grátis |
| G4 | Documentos públicos | Política de privacidade, termos de uso, termo do paciente na anamnese, lista de suboperadores (quem recebe dados e onde) | Grátis / jurídico |
| G5 | Contrato Salute ↔ clínica | Cláusula de operador: finalidade, segurança, sigilo, aviso de incidente, devolução e exclusão no fim do contrato | Jurídico |
| G6 | RIPD (Relatório de Impacto à Proteção de Dados) | Documento curto que lista dados, riscos e medidas. A ANPD pode pedir para dado sensível. Este plano + `security.md` já cobrem metade | Grátis |
| G7 | Decisão sobre a região do banco | Opção A: manter nos EUA com cláusulas-padrão (Resolução 19/2024) e DPA. Opção B: migrar para **sa-east-1 (São Paulo)**, que tira a transferência internacional do banco (a IA continua fora) | A: grátis · B: esforço de migração, mesmo preço |
| G8 | Regras de desenvolvimento | Já existem (`CLAUDE.md`, `security.md` §2). Acrescentar: toda função nova pública precisa de `grant ... to anon` explícito (desde hoje o padrão é fechado) | Grátis |
| G9 | Revisão do plano | A cada 3 meses, ou depois de qualquer incidente | Grátis |

---

## 4. IDENTIFICAR: ativos, dados e dependências

**Ativos (o que proteger) [confirmado]:**

| Ativo | Onde | Dado mais sensível |
|---|---|---|
| Banco Supabase `gbhsslyoybqjvjznlave` | AWS us-east-1 | Prontuário, anamnese com assinatura, relatórios de consulta, financeiro |
| Storage (7 buckets privados) | Supabase | Fotos de pacientes, documentos, áudios, comprovantes |
| Função `renata` e `whatsapp` | Supabase Edge | Chaves de IA (no Vault) |
| Site `saluteia.site` | Netlify | Código do front, página pública de links |
| Repositório | GitHub | Código, migrations, documentos de risco |
| IA | OpenAI (EUA), ElevenLabs (EUA) | Recebem dados de paciente quando a Renata e o relatório são usados |
| WhatsApp | n8n + Evolution API / Z-API | Conversas com pacientes e leads |
| Contas administrativas | GitHub, Supabase, Netlify, OpenAI, ElevenLabs, n8n, domínio, e-mail | Acesso total |

| ID | Ação | Custo |
|---|---|---|
| I1 | Manter esta tabela atualizada (inventário vivo) e incluir cada fornecedor novo antes de usar | Grátis |
| I2 | Classificar os dados: **sensível** (saúde, assinatura, fotos), **pessoal** (nome, telefone, CPF), **interno** (financeiro da clínica), **público** | Grátis |
| I3 | Mapa do fluxo de dados (quem envia o quê para onde), sobretudo para a IA. Base: `docs/integrations.md` e auditoria 04 | Grátis |
| I4 | Lista de vulnerabilidades em aberto = `security.md` §3 + este plano. Atualizar a cada correção | Grátis |
| I5 | Advisors do Supabase depois de toda migration (regra já existente) e uma vez por semana (D2) | Grátis |

---

## 5. PROTEGER: acesso, configuração, dados e pessoas

### 5.1 Identidade e acesso (rota IAM do guia)
| ID | Ação | Situação | Custo |
|---|---|---|---|
| P1 | MFA em todas as contas administrativas da empresa (lista da seção 4) | [não confirmado] | Grátis |
| P2 | Auth: "Confirm email" ligado, Redirect URLs restritas, senha mínima 10 | [não confirmado] (P0-01, P1-16) | Grátis |
| P3 | Senha vazada bloqueada | Desligada [confirmado pelo advisor]; vem com o plano Pro (R1) | Incluído no Pro |
| P4 | MFA real para usuários do sistema (TOTP), obrigatório para dono, gestor e equipe Salute | Hoje a tela "2 etapas" é só um botão (P1-17, P2-08). Curto prazo: esconder o botão para não enganar | Grátis (código) |
| P6 | Revisão de acessos a cada 3 meses: quem está ativo em cada clínica, quem é gestor, acessos de suporte abertos | Os dados existem (`usuarios_clinicas`, `acessos_suporte`); falta a rotina e um relatório | Grátis |
| P7 | Menor privilégio no suporte da Salute: entrada com prazo e registro já existe; definir prazo máximo (ex.: 2 horas) | Parcial [confirmado] | Grátis |

### 5.2 Aplicação (rota AppSec do guia, OWASP Top 10)
| ID | Ação | Situação | Custo |
|---|---|---|---|
| P5 | Renata: fechar as brechas de custo restantes (P0-03), CORS só para `saluteia.site` e o domínio do artifact, limite de voz/transcrição medido no servidor | Aberto [confirmado em `renata/index.ts`] | Grátis |
| P8 | Limite de uso nas funções públicas (anamnese, documentos, link de anúncio): número de chamadas por token/código por minuto | Aberto [confirmado: nenhuma tem limite de frequência] | Grátis |
| P9 | Manter: RLS em toda tabela nova, `SECURITY DEFINER` com checagem, `escHtml` em HTML montado, CSP e SRI | Em vigor [confirmado] | Grátis |
| P10 | Tirar o login do `localStorage` exige mudar a arquitetura; mitigação adotada: CSP restritiva. Reavaliar só se houver servidor próprio | Risco aceito (M1) | — |
| P11 | Teste de segurança por terceiros (pentest) **autorizado** no ambiente de teste, antes de passar de ~50 clínicas | Não feito | Pago (fase 3) |

### 5.3 Dados e LGPD (rota GRC do guia)
| ID | Ação | Situação | Custo |
|---|---|---|---|
| P12 | Minimizar o que vai para a IA: sem CPF, sem telefone, prontuário só quando a pessoa pede; nomes trocados por iniciais quando possível | Aberto (A3, decisão do fundador de usar IA em dado de saúde registrada) | Grátis |
| P13 | Retenção e exclusão: rotina para atender pedido do titular (anonimizar paciente) e apagar dados de clínica que saiu | Aberto (P1-14) | Grátis |
| P14 | Criptografia: em trânsito (HTTPS) e em repouso (Supabase, AES-256) já existem [confirmado/inferido pela documentação] | OK | — |
| P15 | GPS da assinatura com menos precisão e texto da declaração vindo do servidor | Aberto (P1-14, B8) | Grátis |

### 5.4 Pessoas
| ID | Ação | Custo |
|---|---|---|
| P16 | Treino curto para a equipe Salute: phishing, senhas, MFA, como reconhecer um incidente | Grátis |
| P17 | Material para as clínicas: não compartilhar login, cada pessoa com usuário próprio, sair do sistema em computador compartilhado | Grátis |

---

## 6. DETECTAR: logs, alertas e comportamento anormal (rota Defesa/SOC do guia)

| ID | Ação | Ferramenta | Custo |
|---|---|---|---|
| D1 | Monitor do site e da página `/w/` a cada 5 minutos, alerta por e-mail | UptimeRobot ou Better Stack (planos grátis) | Grátis |
| D2 | Rotina semanal (15 min): advisors de segurança, uso da IA por clínica (`ia_uso`), cliques dos links (`links_rastreio_cliques`), acessos de suporte abertos, convites pendentes | Painel Supabase + SQL guardado | Grátis |
| D3 | Alerta de consumo anormal da IA (ex.: clínica que dobrou o uso em um dia) | Consulta agendada no banco (`pg_cron`, já usado) gravando um aviso para o administrador master | Grátis |
| D4 | Alerta de gastos nas contas de IA (OpenAI e ElevenLabs têm limite e aviso de gasto) | Painel de cada provedor | Grátis |
| D5 | Painel "Segurança" no Painel Master: últimos logins de admin, entradas de suporte, funções públicas, advisors | Código novo | Grátis (fase 2) |
| D6 | Logs do Auth (logins falhos em sequência) | Supabase Logs; exportação contínua só no plano pago | Grátis (manual) |

---

## 7. RESPONDER: o que fazer quando algo der errado

**Modelo de plano de incidente (1 página):**

1. **Quem decide:** fundador (responsável). Contato reserva: o dev de plantão.
2. **Classificar em 1 hora:**
   - Grave: vazamento ou acesso indevido a dado de paciente, conta administrativa invadida, chave exposta.
   - Médio: sistema fora do ar, abuso de custo da IA.
   - Leve: falha sem dado exposto.
3. **Conter:** trocar a senha e derrubar as sessões da conta afetada; girar a chave exposta (Vault, segredos da função, OpenAI, ElevenLabs); pausar a IA (limite 0) ou a função afetada; fechar a função ou política com problema; preservar os logs (não apagar nada).
4. **Comunicar:**
   - Incidente grave com dado pessoal: avisar as **clínicas** afetadas (que são as controladoras) imediatamente.
   - A comunicação à **ANPD** e aos titulares deve ser feita em até **3 dias úteis** (Resolução CD/ANPD nº 15/2024). Pela lei, quem comunica é a controladora; a Salute ajuda e fornece as informações.
   - Modelo de texto: o que aconteceu, quando, quais dados, quantas pessoas, o que já foi feito, contato.
5. **Registrar:** linha do tempo, decisões, evidências. A ANPD pede guardar o registro do incidente.
6. **Revisar:** em até 7 dias, o que corrigir para não repetir. Atualizar este plano.

| ID | Ação | Custo |
|---|---|---|
| RS1 | Escrever o plano acima com nomes e telefones reais e guardar fora do sistema (impresso ou no e-mail) | Grátis |
| RS2 | Lista de contatos: suporte Supabase, Netlify, OpenAI, ElevenLabs, jurídico | Grátis |
| RS3 | Simulação a cada 6 meses: "a chave da OpenAI vazou", "um usuário de clínica viu paciente de outra" (exercício de mesa, 1 hora) | Grátis |

---

## 8. RECUPERAR: restaurar e continuar

| ID | Ação | Situação | Custo |
|---|---|---|---|
| R1 | Supabase Pro: backup diário com 7 dias para restaurar | Hoje no plano free [confirmado] | US$ 25/mês |
| R2 | Opção grátis enquanto não muda o plano: exportação manual semanal do banco (`supabase db dump`) para um disco **criptografado** fora da nuvem. Limite: depende de alguém lembrar, e o arquivo contém dados de saúde (guardar com cuidado) | Não feito | Grátis |
| R3 | PITR (voltar para qualquer minuto) para quando houver muitas clínicas | Não feito | Add-on pago (fase 3) |
| R4 | Testar uma restauração a cada 3 meses num projeto de teste (sem expor dados) | Nunca feito | Grátis (no Pro) |
| R5 | Metas: perder no máximo 24 h de dados (RPO) e voltar em até 4 h (RTO) na fase 1; melhorar com PITR | Definir | — |
| R6 | Recriar o banco do zero a partir do repositório: faltam as 41 migrations iniciais (P0-11) | Aberto | Grátis |
| R7 | Arquivos do Storage: entram no backup? [não confirmado]. Definir cópia periódica dos buckets críticos (prontuário, pacientes) | Aberto | Grátis / armazenamento |

---

## 9. Cronograma

**Fase 0, esta semana (quase tudo grátis e sem código):** G1, P1, P2, D1, RS1, RS2, G2.

**Fase 1, até 30 dias:** R1 (Pro), P3, G3, G4, P5, P8, D2, D4, P4 (esconder o botão de 2 etapas falso), I1, I2.

**Fase 2, até 90 dias:** G5, G6, G7 (decidir região), P4 (MFA real), P6, P12, P13, P15, D3, D5, R4, R6, R7, RS3, P16, P17.

**Fase 3, até 180 dias ou ao passar de ~50 clínicas:** P11 (pentest autorizado), R3 (PITR), revisão de G7 com números de clientes, certificação ou selo de conformidade se o mercado pedir.

**Contínuo:** D2 toda semana; P6 e G9 a cada 3 meses; advisors depois de toda migration.

---

## 10. Como medir (indicadores)

| Indicador | Meta |
|---|---|
| Contas administrativas da empresa com MFA | 100% |
| Funções abertas sem login fora da lista intencional | 0 (hoje: 0) |
| Achados ALTO/MÉDIO de `security.md` em aberto | cair a cada mês |
| Dias desde o último teste de restauração | menos de 90 |
| Usuários dono/gestor com MFA real (depois de P4) | 100% |
| Incidentes com aviso em até 3 dias úteis | 100% |

---

## 11. Capacitação (o guia aplicado à empresa)

O guia diz: base mínima, uma rota, uma **prova prática** publicada. Para o Salute:

| Pessoa | Rota do guia | Por onde estudar (grátis) | Prova prática no próprio Salute |
|---|---|---|---|
| Fundador | **GRC / Risco** (LGPD, políticas, controles) | NIST CSF 2.0 (nist.gov/cyberframework), CIS Controls, guias da ANPD | A avaliação de risco da Salute: seções 3 e 4 deste plano, revisadas por ele, com o plano de tratamento |
| Dev do front | **AppSec** (HTTP, APIs, OWASP Top 10) | PortSwigger Web Security Academy | Relatório de uma falha corrigida no Salute: evidência, causa, impacto e correção (ex.: a de hoje, funções abertas sem login) |
| Quem cuida do banco | **IAM / Cloud** (acesso, MFA, menor privilégio) | Microsoft Learn SC-900, documentação de segurança do Supabase | Revisão de acessos: matriz usuário × permissão de uma clínica de teste (P6) |
| Quem faz o suporte | **Defesa / SOC** (logs, triagem) | CyLab Security Academy | Triagem de incidente simulado (RS3) com linha do tempo e recomendação |

Regra legal do guia, que vale aqui também: testes de ataque só no ambiente de teste da Salute ou com autorização escrita. Nunca
em clínica de cliente, em dados reais de pacientes ou em sistemas de terceiros.
