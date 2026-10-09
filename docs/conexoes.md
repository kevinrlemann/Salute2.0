# Conexões e ferramentas

Verificado em 2026-10-09.

| Ferramenta | Situação | Observação |
|---|---|---|
| Supabase "Salute IA novo visual" (`gbhsslyoybqjvjznlave`) | ✅ conectado | Banco em uso pelo front. ~115 tabelas em `public`, todas com RLS ligado. 1 edge function (`renata`, exige login). |
| Supabase "Salute CRM" (`pigfhkmtqyatuaudpgyy`) | ✅ conectado | Projeto antigo. 24 edge functions, todas com `verify_jwt=false`. |
| Netlify `saluteia` | ⚠️ conectado | Sem repositório ligado ainda. No ar está o envio manual de 06/10, anterior ao artifact atual. `netlify.toml` já prepara a publicação da pasta `front/` a partir da `main`. A rede do ambiente de nuvem bloqueia o Netlify, então publicar daqui só funciona pelo GitHub. |
| GitHub `kevinrlemann/Salute2.0` | ✅ | Este repositório. `sicred` e `sicred02` estão vazios. |
| Artifact "Salute IA" (claude.ai) | ✅ | `index.html` + `config.js`. Viewers do link compartilhado veem uma versão fixada anterior. |
| rtk | ✅ instalado na sessão | Instalação permanente: `setup/environment-setup.sh`. |
| OmniRoute | ⚠️ instalado e rodando na sessão | Os provedores gratuitos estão bloqueados pela rede do ambiente (ver abaixo). Não está ligado como modelo do Claude Code. |
| n8n | ❌ sem conector | |
| WhatsApp Cloud API / Evolution | ❌ sem conector | Referências existem nas edge functions do projeto antigo. |
| OpenAI / Anthropic (API) | ❌ sem conector | |

## Domínios bloqueados pela rede do ambiente de nuvem

Liberar em claude.ai → ambiente → Edit → Network access → Allowed domains:

- `saluteia.site`, `saluteai.com.br`
- Provedores do OmniRoute: `opencode.ai`, `duckduckgo.com`, `theoldllm.vercel.app`, `api.xiaomimimo.com`, `api.wulong.dev`, `amelia.chipotle.com`

## rtk + OmniRoute

`setup/environment-setup.sh` instala o rtk, liga o hook global dele no Claude Code (`rtk init -g`), instala o OmniRoute e sobe o servidor em `http://localhost:20128`.

Para ficar permanente em toda sessão, use uma das opções:

1. Colar o script em claude.ai → ambiente → Edit → **Setup script**.
2. Registrar como hook `SessionStart` neste repositório (`.claude/settings.json` apontando para o script).

O Claude Code continua usando os modelos da Anthropic. Apontar o Claude Code para o OmniRoute (`ANTHROPIC_BASE_URL`) só faz sentido depois que a rede liberar os provedores ou houver uma chave de API cadastrada nele.
