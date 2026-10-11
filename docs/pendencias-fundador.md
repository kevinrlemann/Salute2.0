# Pendências do fundador (atualizado em 2026-10-09, tarde)

Itens que só você consegue fazer (painéis, contas, pagamentos ou decisões). Em ordem de prioridade.

## 1. Ligar o n8n (sem isso a IA não responde no WhatsApp)
- [ ] Entrar em `kevinlemann1.app.n8n.cloud` e **ativar** (botão "Active") todos os fluxos da Salute (wf00 a wf09).
      Hoje o banco chama os fluxos a cada minuto e recebe "webhook not registered".
- [ ] Conferir em cada fluxo a credencial do Supabase (chave de servidor `service_role`, guardada só no n8n).
- [ ] Exportar os fluxos (menu ⋯ › Download) e me mandar os arquivos `.json` para eu revisar e guardar no repositório.
- [ ] Para 100 clínicas: trocar o n8n Cloud por n8n auto-hospedado em modo fila (ver `docs/n8n-escala.md`).

## 2. WhatsApp não oficial (o que pediu hoje)
- [ ] Escolher o provedor: **Evolution API** (servidor próprio, sem custo por número) ou **Z-API** (pago por número, sem servidor).
- [ ] Evolution: contratar/instalar o servidor e pegar o endereço `https://...` e a chave global (apikey).
      Z-API: criar a instância e pegar o ID, o token e o Client-Token.
- [ ] No sistema: Configurações › Integrações › API não oficial (QR Code) › preencher › **Gerar QR Code** › ler com o celular da clínica.

## 3. IA
- [ ] Groq pago ou uma chave por clínica (a grátis não aguenta muitas clínicas).
- [ ] Decidir se fotos e áudios dos pacientes podem ir para a IA (transcrever áudio e ler imagem).
      Hoje as mídias são guardadas na clínica e aparecem na conversa, mas **não** são enviadas para a IA (LGPD).
- [ ] ElevenLabs pago se quiser voz brasileira na Renata.

## 4. Supabase (painel)
- [x] Site URL, Redirect URL e "Confirm email" (feito em 2026-10-10).
- [ ] Clínica nova agora espera a sua aprovação: Painel Master › filtro "Aguardando aprovação" › Aprovar ou Recusar.
- [ ] Authentication › Sign In / Providers › ligar "Confirm email".
- [ ] (Futuro, exige plano pago) Authentication › Sign In / Providers › Email › "Prevent use of leaked passwords".
- [ ] Authentication › URL Configuration › Site URL `https://saluteia.site`.
- [ ] Database › Backups: confirmar backup diário (plano Pro para PITR).

## 5. Publicação
- [ ] Se o site não atualizar sozinho depois de um "publicar", abrir app.netlify.com › saluteia › Deploys › "Trigger deploy".
      (Em 2026-10-09 a Netlify não recebeu o aviso do GitHub de um envio para `producao`.)
- [ ] Usar os créditos pagos da Netlify até acabarem e depois migrar o site para o **Cloudflare Pages** (grátis,
      500 publicações por mês, uso comercial permitido). Antes: criar `front/_headers` e `front/_redirects` com as
      mesmas regras do `netlify.toml`, testar no endereço `.pages.dev` e só então apontar `saluteia.site`.

## 6. Decisões
- [ ] LGPD: aceitar formalmente os fornecedores (Groq, ElevenLabs, provedor de WhatsApp) e o texto de privacidade.
- [ ] Quer uma coluna "Finalizado" separada de "Convertido" no CRM? (Hoje "atendimento finalizado" vai para Convertido.)
- [ ] Aceite de convite de equipe (fluxo de convite por e-mail).

## 7. Infraestrutura: n8n e WhatsApp (decisão de 2026-10-10)
Caminho escolhido: **Oracle Cloud (grátis) com n8n próprio e Evolution API na mesma máquina.**
- [ ] Criar conta na Oracle Cloud (cadastro com cartão, sem cobrança no plano Always Free).
- [ ] Criar máquina Ampere grátis em São Paulo (ou a região mais próxima com vaga).
- [ ] Instalar n8n próprio (versão Community, gratuita) e migrar os 10 fluxos WF00 a WF09.
- [ ] Instalar Evolution API e conectar o número da clínica piloto (QR Code).
- [ ] Configurar backup diário e alerta de queda (o WF00 já avisa a fila parada).
- [ ] Testar conversa de ponta a ponta e desligar o modo teste da Lemann.

Mapa de atualização (não fazer agora):
- [ ] **Atualizar para n8n pago (Cloud)** se a Oracle der problema recorrente ou antes de cobrar clientes pagantes. Custo aproximado de €20 a €50 por mês (conferir no site). Vantagem: menos manutenção e suporte. Desvantagem: limite de execuções por plano.
- [ ] Alternativa intermediária: VPS pago (Hostinger KVM 2, cerca de R$ 40 a 60 por mês) antes dos primeiros clientes pagantes.

Motivo do n8n Cloud atual ter parado (inferido, não confirmado): limite do plano ou teste vencido. Confirmar em Settings › Usage and plan.

## 8. WhatsApp: chave da API não oficial 01 e plano para a conexão não cair (2026-10-11)

**Regra:** a chave nunca é mostrada em conversa, documento ou tela. Ela fica só no cofre do Supabase
(`salvar_segredo`, pela tela Integrações da equipe) e no arquivo de configuração do servidor. Quem a colou no chat
deve trocá-la (ver passo 1).

**Situação medida no banco (2026-10-11):**
- Clínica Lemann (`salute-83050867`): conectada desde 10/10 às 20:49, recebendo mensagens.
- Outra clínica (`salute-7e4e374a`): parada em "conectando" desde 00:56 de hoje. Causa não confirmada: pode ser chave
  recusada pelo servidor (o sistema responde "O provedor recusou a chave") ou QR Code não lido.

**Plano**

1. ✅/❌ **Trocar a chave** (fundador, no terminal do Hostinger): gerar chave nova no servidor, atualizar o arquivo
   `/opt/evolution/compose.yaml` (variável de autenticação), reiniciar o contêiner e salvar a chave nova na tela
   Integrações › "Chave padrão da API não oficial 01".
2. ❌ **Conferir o servidor** (sem mostrar a chave na tela): `https://evolution.saluteia.site` deve responder com
   a mensagem de boas-vindas. Depois, consultar as instâncias com a chave nova, guardando só o resultado (OK ou erro).
3. ❌ **Recriar a instância parada** (`salute-7e4e374a`): tela Integrações › desconectar › conectar, e ler o QR Code de novo.
4. ❌ **Guardar a chave em lugar seguro**: gerenciador de senhas do fundador, nunca em chat, e-mail ou código.
5. ❌ **Alerta de queda**: a cada 15 min, consultar o estado das instâncias; se uma instância conectada cair, avisar a
   equipe. Hoje não existe esse alerta. Opção grátis: agendamento do próprio Supabase (pg_cron) chamando a função
   `whatsapp` com ação `estado`.
6. ❌ **Runbook curto** para a equipe: "não conecta" → (a) ver mensagem da tela; (b) "recusou a chave" → passo 1;
   (c) "não respondeu" → servidor (passo 2); (d) QR expirado → gerar de novo.

**Não confirmado:** se o servidor da Evolution continua rodando no Hostinger e se a chave foi alterada. Só dá para
confirmar no terminal do servidor (passos 1 e 2).

## 9. Fase 1 da Renata: base de conhecimento e memória (rascunho)

Rascunho em `docs/planejamento/fase1-rag-memoria.sql`: tabelas de documentos, trechos com vetor, memória do paciente,
histórico e log de busca, com RLS e função de busca por clínica. **Não aplicado no banco.** Antes de aplicar, decidir:
(a) tipo do identificador da clínica (o rascunho usa `uuid`, igual ao resto do banco); (b) se a Renata vai usar
embeddings da OpenAI (custo) ou um modelo grátis; (c) política de leitura para o front.
