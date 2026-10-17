# Plano: relatório da consulta simplificado no histórico, PDF em Registros e a IA do WhatsApp respondendo ao próprio paciente

Pedido do fundador (2026-10-17). Plano feito ANTES da execução. Nada foi alterado ainda. Só executa com a autorização dele.

## 1. O que existe hoje (confirmado no código e no banco)

| Onde | Como está | O que o fundador quer |
|---|---|---|
| Prontuário › "Transcrição e relatório da consulta" (`ConsultaWorkspace`, `d47643ae`) | grava a conversa, a IA gera o relatório e salva em `consultas_relatorios` (transcrição, relatório, duração, profissional, modelo da IA) | manter |
| Histórico do paciente (`historico_paciente`) | a linha nasce com o título "Relatório da consulta (12 min)" e a **descrição carrega o relatório inteiro**, que é longo | só "Relatório da consulta" e a data |
| Registros (documentos do paciente: `documentos_paciente` + `pastas_documentos`, arquivos no Storage) | o relatório **não** vira documento | um PDF do relatório, guardado em uma pasta "Relatórios de consulta" |
| IA no WhatsApp (n8n WF01 → `n8n_contexto` / `n8n_ferramenta`) | a conversa já sabe quem é o paciente (`conversas.paciente_id`, achado pelo telefone) e a IA tem ferramentas de clínica, horários, agenda, sinal e funil. **Não tem nenhuma ferramenta que leia o prontuário**: relatórios, procedimentos feitos, orientações | a paciente (ex.: Natalina, final 0755) pergunta "qual remédio o médico passou?" e a IA responde com o que está no relatório dela, e só dela |

Conclusão: o dado já existe no lugar certo. Faltam três coisas: deixar o histórico enxuto, gerar o PDF e dar à IA do WhatsApp uma
ferramenta de leitura travada no paciente da conversa.

## 2. Regras de negócio (o padrão que vou adotar se o fundador não disser o contrário)

1. **Histórico**: uma linha por relatório, título "Relatório da consulta", data e hora da consulta, nome do profissional. Clicar abre o relatório
   completo (já existe o vínculo `registro_tabela/registro_id`).
2. **PDF**: gerado na hora em que o relatório é salvo (e também por um botão "Gerar PDF" para relatórios antigos). Conteúdo: cabeçalho com a clínica,
   paciente, data, profissional, duração; o relatório; rodapé "Gerado pelo Salute em dd/mm/aaaa hh:mm". A transcrição crua NÃO entra no PDF
   (fica só no banco). Pasta fixa "Relatórios de consulta" em Registros, mesmo fluxo dos outros documentos (Storage privado, link assinado).
3. **O que a IA pode contar ao paciente**: tudo o que está no relatório dele (orientações, medicamentos, frequência, exercícios, retorno), os
   procedimentos realizados (nome e data) e as consultas futuras. Nunca: transcrição crua, dados de outro paciente, dados financeiros de terceiros.
4. **Trava de identidade (a parte mais importante)**: a ferramenta nova NÃO aceita nome, CPF ou telefone como parâmetro. Ela descobre o paciente
   apenas pela conversa da tarefa (`conversas.paciente_id`), e ainda confere que o telefone do paciente cadastrado bate com o telefone da
   conversa (últimos 11 dígitos). Se a conversa for só de um lead sem cadastro de paciente, ou os telefones não baterem, a ferramenta devolve
   "sem_cadastro" e a IA responde que não encontrou consultas para este número e oferece falar com a equipe. Assim, quem escreve do número da
   Natalina só recebe o que é da Natalina; perguntar "e a Aline Prado?" devolve vazio, por construção, não por boa vontade da IA.
5. **Regra no prompt do WF01**: "Você só pode falar sobre a consulta, os procedimentos e as orientações do paciente desta conversa. Se perguntarem
   sobre outra pessoa, diga que não pode e ofereça transferir para a equipe. Não invente orientações: se não estiver no relatório, diga que
   não consta e sugira confirmar com o profissional."
6. **Orientações estruturadas**: no momento de gerar o relatório, a IA passa a gerar também um bloco "Orientações ao paciente" em formato de
   lista (medicamento, dose, frequência e dias; exercícios e frequência; sessões; retorno). Isso fica em `consultas_relatorios.orientacoes`
   (jsonb) e é o que a IA do WhatsApp usa primeiro. Resposta fica exata ("dipirona, segunda, quarta e sexta") em vez de depender de reler um texto longo.
7. **Liga/desliga por clínica**: campo novo na aba Agente de IA, "A IA pode responder ao paciente sobre a própria consulta" (padrão: desligado).
   Só o administrador master vê essa aba (decisão de 2026-10-09). Com o campo desligado a ferramenta nem aparece para a IA.
8. **LGPD**: o relatório é dado de saúde. Ele já passa pela OpenAI ao ser gerado; com a ferramenta, trechos dele voltam a passar pela OpenAI e
   saem pelo WhatsApp (não oficial). Fica registrado em `docs/security.md` como ampliação do achado A3, com a decisão do fundador. A resposta da
   IA só sai para o mesmo número que recebeu a consulta.

## 3. Banco de dados (uma migration aditiva, sem DROP)

1. `consultas_relatorios`: `orientacoes jsonb` (lista estruturada), `documento_id uuid` (o PDF em `documentos_paciente`), `resumo text`
   (3 linhas para o histórico e para a IA).
2. `agente_ia`: `responder_sobre_consulta boolean default false`.
3. Função `paciente_da_conversa(conversa)`: devolve o `paciente_id` só se `conversas.paciente_id` existir e o telefone bater; senão `null`.
   Usada pela ferramenta e por qualquer leitura futura do prontuário pelo WhatsApp.
4. `n8n_ferramenta`: nova ação `consultar_minha_consulta` (sem parâmetros além da tarefa). Retorna, do paciente da conversa: até 5 relatórios
   mais recentes (data, profissional, resumo, orientações, relatório cortado em 2.500 caracteres), procedimentos realizados (nome, data,
   profissional) e consultas futuras. Se `agente_ia.responder_sobre_consulta` estiver desligado, devolve `{ok:false, motivo:'desligado'}`.
5. `n8n_contexto`: entra um aviso curto no contexto ("este paciente tem N relatórios de consulta; use a ferramenta consultar_minha_consulta")
   só quando a ferramenta estiver ligada, para a IA saber que pode buscar.
6. `agente_ia_regras`: acrescenta a regra 5 acima quando a ferramenta está ligada.
7. Garantia do vínculo telefone → paciente: conferir `registrar_webhook` / criação da conversa; se a conversa nasce sem `paciente_id` mas o
   telefone bate com um paciente da clínica, preencher (hoje a importação de contatos já faz esse casamento pelos 11 dígitos).
8. RLS: nada muda para a equipe. A ferramenta roda com `service_role` do n8n, como as outras, e a trava é a função do item 3.

## 4. Front

### 4.1 Prontuário › relatório da consulta
- Ao salvar: histórico recebe só "Relatório da consulta" + data/hora + profissional (descrição = `resumo`, 3 linhas, não o texto inteiro).
- Gera o PDF e sobe para Registros › pasta "Relatórios de consulta"; o cartão do relatório ganha "Abrir PDF".
- Botão "Gerar PDF" nos relatórios antigos que ainda não têm.
- A tela de geração do relatório mostra o bloco "Orientações ao paciente" (editável antes de salvar, para o profissional corrigir).

### 4.2 Geração do PDF (grátis, sem servidor)
- Opção escolhida: **jsPDF** carregado sob demanda do unpkg (mesma origem dos ícones Lucide), só quando alguém gera um PDF. Grátis, sem
  conta, funciona no celular. Texto com acentos, quebra de linha e páginas automáticas. Tamanho de arquivo pequeno (texto puro).
- Alternativa sem nenhuma biblioteca: gerador de PDF próprio de texto simples (cerca de 120 linhas). Só se o fundador não quiser dependência externa.
- Todo dado entra como texto (sem HTML), então não há risco de HTML sem escape (achado A1).

### 4.3 Agente de IA (só administrador master)
- Novo interruptor "Responder ao paciente sobre a própria consulta (relatório, orientações, procedimentos)", com o aviso de LGPD do item 2.8.

### 4.4 Celular
- Mesmas telas (prontuário e Registros já funcionam no celular). Nada novo.

## 5. n8n (WF01)
- "Montar prompt": entra a regra 5 (só quando ligada) e a descrição da ferramenta nova.
- Nó de ferramentas: `consultar_minha_consulta` → `n8n_ferramenta(tarefa, token, 'consultar_minha_consulta', '{}')`.
- Nenhuma credencial nova. Versão publicada só depois do teste em sandbox.

## 6. Segurança (no banco, não só na tela)
- A ferramenta nunca recebe identificação de paciente por parâmetro.
- `paciente_da_conversa` exige `conversas.paciente_id` + telefone batendo.
- Resposta sai apenas para a conversa de origem (fila de envio já é por conversa).
- Teste negativo obrigatório: conversa do número X pedindo dados do paciente Y devolve vazio.

## 7. Etapas de execução, com teste em cada uma

| Etapa | Entrega | Teste |
|---|---|---|
| 1. Banco | migration: campos, `paciente_da_conversa`, ação `consultar_minha_consulta`, contexto e regra | SQL: conversa da Natalina (19994930755) → só os relatórios dela; conversa de outro número → vazio; interruptor desligado → `desligado` |
| 2. Prontuário | histórico enxuto, orientações estruturadas, PDF em Registros | Playwright (computador e celular): salvar relatório → histórico mostra "Relatório da consulta · data"; Registros tem o PDF; abrir PDF |
| 3. Agente de IA | interruptor na aba (master) | Playwright: ligar/desligar grava em `agente_ia` |
| 4. WF01 | prompt + ferramenta | sandbox do n8n com a tarefa da Natalina: "qual remédio o médico passou?" responde com as orientações; "e a Aline Prado?" recusa |
| 5. Docs e publicação | CLAUDE.md, docs/agente-ia.md, docs/security.md; commit; publicar só com "publicar" | teste real pelo WhatsApp do fundador |

Estimativa: etapas 1 a 3 em uma sessão; 4 e 5 em outra (depende do teste real no WhatsApp). Custo: zero (jsPDF grátis; o resto é Supabase e n8n já existentes).

## 8. O que fica de fora desta versão
- Paciente pedir o PDF pelo WhatsApp (envio de arquivo pela IA). Pode entrar depois: a fila de envio já aceita mídia.
- Renata dentro do sistema lendo relatórios (a equipe já vê tudo na ficha).
- Editar o relatório depois de salvo (hoje já não edita; continua assim).

## 9. Perguntas para o fundador (respondo com o padrão da seção 2 se não houver resposta)
1. A IA deve responder sobre a consulta para TODA clínica por padrão, ou cada clínica liga (padrão: cada clínica liga, começa desligado)?
2. O PDF deve incluir a transcrição da conversa ou só o relatório (padrão: só o relatório)?
3. Quantos relatórios a IA pode consultar: só o mais recente ou os últimos 5 (padrão: últimos 5)?
4. Pode usar o jsPDF (biblioteca grátis carregada do unpkg) ou prefere sem nenhuma dependência externa (padrão: jsPDF)?
