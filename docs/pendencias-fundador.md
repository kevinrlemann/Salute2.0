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
- [ ] Authentication › Sign In / Providers › ligar "Confirm email".
- [ ] Authentication › Password security › ligar "Leaked password protection".
- [ ] Authentication › URL Configuration › Site URL `https://saluteia.site`.
- [ ] Database › Backups: confirmar backup diário (plano Pro para PITR).

## 5. Decisões
- [ ] LGPD: aceitar formalmente os fornecedores (Groq, ElevenLabs, provedor de WhatsApp) e o texto de privacidade.
- [ ] Quer uma coluna "Finalizado" separada de "Convertido" no CRM? (Hoje "atendimento finalizado" vai para Convertido.)
- [ ] Aceite de convite de equipe (fluxo de convite por e-mail).
