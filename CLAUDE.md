# Salute 2.0 — instruções para agentes

Leia `README.md`, `docs/supabase.md` e `docs/auditoria/` antes de qualquer alteração.

## Alvos

- Banco/Auth/Storage/Edge Functions: **somente** o Supabase "Salute IA novo visual" (`gbhsslyoybqjvjznlave`).
- "Salute CRM" (`pigfhkmtqyatuaudpgyy`) é legado: só leitura.
- Front: `front/index.html` + `front/config.js`, publicados no artifact https://claude.ai/artifact/WtotK7P4yu9qhf9VWrAqhA. Toda edição do front entra primeiro neste repositório e só depois é republicada.

## Front

- Bundle único exportado do Claude Design: React 18.3.1 (build development), supabase-js 2.117.2, design system "SaluteProjetoDesigner".
- `python3 -I tools/unbundle.py front/index.html front/extraido` decodifica os scripts para leitura. `front/extraido/` é cópia de leitura; o publicado é `front/index.html`.
- Os módulos se comunicam por globais em `window`; a ordem dos `<script>` no template importa.
- Acesso a dados passa por `SB`/`DB.*` (arquivo `5a1e7e02-…c001`), sempre filtrando `clinica_id`.

## Regras (do manual em `docs/manual/`)

- Fase atual: auditoria somente leitura (Prompts 1–5). Não refatorar, não apagar código, não mexer em produção sem aprovação.
- Mudança de schema = migration versionada aqui antes de aplicar.
- Nunca commitar segredos nem chave `service_role`; este repositório é público. A chave anon em `front/config.js` é pública por design.
- Permissão de verdade fica no banco (RLS/RPC), nunca só na tela.
- Cada mudança: branch → plano → menor alteração → validação → diff → commit → PR → publicação com aprovação.
- Marque afirmações em docs como "confirmado", "inferido" ou "não confirmado".

## Ferramentas

`setup/environment-setup.sh` instala rtk e OmniRoute (`http://localhost:20128`). Detalhes e domínios bloqueados em `docs/conexoes.md`.
