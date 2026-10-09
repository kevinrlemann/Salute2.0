# Salute 2.0

Repositório central do Salute IA: código do front, documentação, auditorias e configuração das ferramentas de desenvolvimento.

## Fontes da verdade

| O quê | Onde |
|---|---|
| Código do front | este repositório (`front/`) |
| Front publicado | artifact "Salute IA" no claude.ai — https://claude.ai/artifact/WtotK7P4yu9qhf9VWrAqhA |
| Banco, Auth, Storage, Edge Functions | Supabase **"Salute IA novo visual"** (ref `gbhsslyoybqjvjznlave`) |
| Banco antigo (legado, só consulta) | Supabase "Salute CRM" (ref `pigfhkmtqyatuaudpgyy`) |
| Hospedagem | Netlify `saluteia` → https://saluteia.site (ainda sem repositório ligado) |

## Estrutura

```
front/
  index.html        página publicada, idêntica ao artifact (bundle único)
  config.js         configuração do front (URL do Supabase + chave pública anon)
  extraido/         scripts e template decodificados do bundle, para leitura e diff
tools/unbundle.py   decodifica front/index.html em front/extraido/
docs/
  conexoes.md       inventário de ferramentas e conexões
  supabase.md       projetos Supabase, edge functions e regras de uso
  manual/           manual de arquitetura, estudos e execução
  auditoria/        respostas dos prompts de auditoria (somente leitura)
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
python3 -I tools/unbundle.py front/index.html front/extraido
```

A chave em `front/config.js` é a chave **pública (anon)** do Supabase, feita para ficar no navegador; a proteção dos dados vem do RLS. Nunca coloque chaves `service_role` ou segredos neste repositório — ele é público.
