# Plano: mensagens (todos os tipos) e nome do contato vindo do WhatsApp

Status: planejamento. Nada disto está implementado ainda, salvo o que está marcado como "hoje".
Marcações: **confirmado** (lido no código), **inferido** (suposição a validar), **não confirmado** (precisa de teste real).

Pedido do fundador (2026-10-11): ler figurinha, áudio, mensagem, escrita, texto, vídeo, imagem etc., e puxar o
nome do contato direto dos contatos criados dentro do próprio WhatsApp. **Nome do contato é prioridade.**

---

## 1. Prioridade 1: nome do contato pela agenda do WhatsApp

### Hoje (confirmado)
- O nome vem só do que a pessoa colocou no próprio WhatsApp (`pushName` na Evolution; `senderName` ou `chatName` na Z-API).
- A tela mostra, nesta ordem: nome do paciente cadastrado, nome do lead, nome da conversa, "Sem identificação".
- Nome que vem de uma mensagem enviada pela própria clínica não é gravado (corrigido em 10/10).

### Meta
O nome salvo na **agenda do aparelho da clínica** (o contato que a equipe criou) aparece na conversa.

### Ordem de origem do nome (proposta)
1. Nome salvo na agenda do WhatsApp da clínica (o contato criado pela equipe).
2. Nome que a pessoa usa no próprio WhatsApp (`pushName`), quando não há contato salvo.
3. Número de telefone formatado.

Regra de exibição (proposta, a confirmar com o fundador): se a conversa já tem paciente cadastrado, o nome do paciente
continua na frente. A agenda do WhatsApp aparece quando não há paciente vinculado.

Regras de segurança:
- O nome da agenda nunca apaga um nome que a equipe digitou no sistema.
- Atualiza quando a agenda mudar, na próxima mensagem ou na próxima abertura da conversa.

### Como buscar (inferido, a confirmar)
- Evolution v2: endpoint de busca de contatos da instância (inferido: `POST /chat/findContacts/{instancia}`). **Não confirmado**
  na versão instalada: testar com a instância conectada, sem mostrar a chave.
- Z-API: endpoint de contatos. **Não confirmado**.
- Gatilhos: ao receber a primeira mensagem de um número, ao abrir uma conversa sem nome da agenda e numa checagem
  diária (a definir). Chamadas ao provedor entram no limite de 15 s já usado nas outras ações.

### Decisão pendente do fundador
- A prioridade de exibição é a certa (paciente cadastrado > agenda do WhatsApp > nome do WhatsApp)?

---

## 2. Prioridade 2: ler todos os tipos de mensagem

### Hoje (confirmado em `provedores.ts`)
Lidos: texto, imagem, vídeo, áudio, documento e figurinha. Mídia recebida é baixada e guardada no armazenamento da clínica
(`anexos_mensagem`). Legenda vira texto. Todo o resto vira "outro", sem conteúdo.

### Tabela de tipos

| Tipo | Hoje | Meta | Observação |
|---|---|---|---|
| Texto | lido | manter | |
| Imagem | baixada e mostrada | legenda + ampliar em tela cheia | |
| Vídeo | baixado | miniatura e reprodução | limite de 16 MB no servidor |
| Áudio e nota de voz | baixado | reproduzir; transcrever com a Renata (opcional) | ver risco LGPD (seção 5) |
| Figurinha | tipo reconhecido, sem imagem | mostrar a figurinha | mesmo pedido de mídia do áudio |
| Documento (PDF etc.) | baixado com o nome | abrir e baixar com o nome original | |
| Localização | não lido | mostrar link de mapa | |
| Cartão de contato (vCard) | não lido | mostrar nome e telefone do cartão | pode alimentar o nome (seção 1) |
| Enquete | não lido | resumo em texto | |
| Reação (emoji) | não lido | ícone sobre a mensagem | |
| Mensagem apagada | não lido | aviso "mensagem apagada" | |
| Mensagem editada | não lido | marca "editada" | |
| Resposta citada | não lido | mostrar o trecho citado acima | |
| Botão ou lista (resposta) | parcial | texto da opção escolhida | |

### Nota de provedores
- Evolution v2 baixa mídia por `getBase64FromMediaMessage` (confirmado, já usado).
- Z-API baixa mídia pela URL do evento (confirmado, já usado). Tipos novos: **não confirmado**.

---

## 3. Ordem de execução

1. **Confirmar o endpoint de contatos** da Evolution instalada, com a instância conectada (não expor chave).
2. **Gravar o nome da agenda** (edge `whatsapp`, nova ação para buscar e guardar `nome_contato`) e ajustar a ordem na tela.
3. **Tipos novos de leitura** em `provedores.ts` (localização, cartão, enquete, reação, apagada, editada, citada), com teste
   no mesmo padrão de `teste_anuncio.mts`.
4. **Figurinha e áudio na tela**: reprodução e figurinha como imagem.
5. **Transcrição de áudio pela Renata** (só depois da decisão da seção 5).
6. Testes no navegador (Playwright, celular e computador), revisão do diff e publicação só com comando do fundador.

Custo: os passos 1 a 4 não têm custo extra (usam a Evolution já paga pela clínica e o armazenamento já existente).
Transcrição: o provedor atual de voz da Renata é ElevenLabs e Groq. **Custo e limite de transcrição não confirmados**; antes
de ativar, mostrar a opção grátis que resolve.

---

## 4. Riscos e dependências
- Nomes de contato e mídia são dados pessoais. Armazenar nome da agenda segue a mesma regra de dados de paciente (RLS por clínica).
- Localização e cartões podem conter dados de terceiros. Mostrar só para a equipe da clínica, como qualquer conversa.
- O webhook da Evolution pode mudar de formato entre versões. Validar cada tipo com mensagem real antes de publicar.

---

## 5. Decisão de LGPD antes do passo 5
Transcrever áudio envia a voz do paciente (possivelmente com dados de saúde) a um fornecedor externo. Isso é o achado A3
de `docs/security.md`. **Não ativar sem decisão do fundador.**
