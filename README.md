# Salute 2.0

Repositório central do Salute IA: código do front, documentação, auditorias e configuração das ferramentas de desenvolvimento.

## Fontes da verdade

| O quê | Onde |
|---|---|
| Código do front | este repositório (`front/`) |
| Front publicado | artifact "Salute IA" no claude.ai — https://claude.ai/artifact/WtotK7P4yu9qhf9VWrAqhA |
| Banco, Auth, Storage, Edge Functions | Supabase **"Salute IA novo visual"** (ref `gbhsslyoybqjvjznlave`) |
| Banco antigo (legado, só consulta) | Supabase "Salute CRM" (ref `pigfhkmtqyatuaudpgyy`) |
| Hospedagem | Netlify `saluteia` → https://saluteia.site, publicado da branch `producao` (pasta `front/`) |

## Estrutura

```
front/
  index.html        página publicada (bundle único)
  config.js         configuração do front (URL do Supabase + chave pública anon)
  extraido/         scripts decodificados do bundle: onde se edita antes de reempacotar
supabase/
  functions/renata/ edge function da Renata (Groq + ElevenLabs) e testes
  migrations/       migrations versionadas do banco
tools/              unbundle.py e rebundle.py
docs/
  architecture.md, frontend.md, database.md, integrations.md, security.md
  backlog.md        plano de desenvolvimento priorizado (P0, P1, P2)
  auditoria/        auditorias 01 a 05 (somente leitura)
  manual/           manual de arquitetura, estudos e execução
  conexoes.md, supabase.md
setup/
  environment-setup.sh   instala e liga rtk + OmniRoute nas sessões de nuvem
netlify.toml        publicação do front no Netlify (pasta front/, rotas da SPA)
```

## Publicação

- `main`: desenvolvimento. Nada vai para o ar sozinho.
- `producao`: o que está no ar em https://saluteia.site. O Netlify publica automaticamente a cada push nesta branch.
- Para publicar: levar a `main` para a `producao` (`git push origin main:producao`), só com aprovação do fundador.

## Decodificar o front

```bash
python3 -I tools/unbundle.py front/index.html front/extraido   # decodificar
python3 -I tools/rebundle.py front/index.html front/extraido   # reempacotar depois de editar
```

A chave em `front/config.js` é a chave **pública (anon)** do Supabase, feita para ficar no navegador; a proteção dos dados vem do RLS. Nunca coloque chaves `service_role` ou segredos neste repositório — ele é público.
