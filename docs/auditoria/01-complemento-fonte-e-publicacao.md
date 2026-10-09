# Auditoria 01 · Complemento: código fonte, publicação e incidente de 08/10

Feito na sessão que constrói o front, com acesso ao código fonte, ao banco (só leitura) e ao Netlify (só leitura). Complementa `01-auditoria-arquitetura.md`, que analisou apenas o pacote publicado. A lista completa de riscos desta sessão está no Project "SALUTE IA" no claude.ai, que é privado; este repositório é público.

Legenda: **confirmado** (visto no código, no banco ou no painel), **inferido**, **não confirmado**.

## Código fonte e build

* O front tem código fonte: patches em Python sobre a exportação do Claude Design, mais módulos JSX e serviços. Até 08/10 ele existia só no ambiente de nuvem do Claude onde é construído, sem Git. Agora está em `front/fonte/`. **confirmado**
* O build (`python3 front/fonte/build.py`) aplica 18 patches de texto em ordem fixa, junta a Renata, injeta a biblioteca do Supabase e os serviços e compila o JSX com o Babel do próprio `orig.html`. Uma pasta limpa gera exatamente os mesmos módulos e o mesmo template da versão 31 entregue. **confirmado**
* Bug encontrado: o patch da rodada 18 (modal de agendamento com início, término e vínculo com conversa do WhatsApp) alterava um arquivo que o build recriava logo depois. A mudança nunca chegou a nenhuma versão publicada. Ele ficou fora da lista do build até decisão do Kevin. **confirmado**

## Publicação

* Netlify `saluteia`: domínio principal saluteia.site, publicação manual arrastando arquivos, sem build no servidor e sem repositório ligado. Último envio em 06/10, sem arquivo de cabeçalhos. **confirmado**
* Com este repositório, o Netlify passa a publicar a pasta `front/` direto da `main` (`netlify.toml`), assim que o projeto for ligado ao GitHub no painel do Netlify. **confirmado** (configuração) · **não confirmado** (ligação ainda não feita)
* www.salute.site responde, mas não está ligado ao projeto `saluteia`. O endereço `salute-ia.netlify.app` acessou o banco em 07/10 e não aparece na conta do Netlify. **não confirmado** o que cada um publica.

## Banco em números (projeto "Salute IA novo visual")

* Região dos EUA (Virgínia), Postgres 17, criado em 03/10/2026. **confirmado**
* 115 tabelas, todas com RLS; 329 políticas; 7 buckets, todos privados; segredos de integração no cofre do Supabase; 41 migrations registradas. **confirmado**
* Uma função de servidor publicada, `renata`, que chama Claude e ElevenLabs com chaves guardadas no cofre. Não existe função `whatsapp`, embora a tela de canais mostre um endereço de webhook apontando para ela. **confirmado**
* O front usa diretamente 76 das 115 tabelas e 26 funções RPC, todas existentes. **confirmado**

## Incidente de 08/10: "Sem conexão com o banco" no login

* Sintoma: em todos os endereços, o login mostrava "Sem conexão com o banco". **confirmado**
* Causa: nenhuma chamada do navegador do Kevin chegava ao Supabase desde 07/10 às 16h52, enquanto chamadas de outras redes chegavam normalmente. A rede ou algum filtro no computador bloqueava o endereço supabase.co. A conta e a senha estavam corretas. **confirmado** (bloqueio) · **não confirmado** (qual filtro)
* Correção (versão 31): rota alternativa pelo próprio domínio do site, ativada sozinha só quando o endereço direto não responde. Testada em 8 cenários e no navegador simulando a rede bloqueada. Detalhes em `front/fonte/README.md`. **confirmado**
