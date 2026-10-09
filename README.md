# Salute 2.0

Repositório central do Salute IA: código do front, documentação, auditorias e configuração das ferramentas de desenvolvimento.

## Fontes da verdade

| O quê | Onde |
|---|---|
| Código fonte do front | `front/fonte/` (gera `front/index.html` com `python3 front/fonte/build.py`) |
| Front publicado | artifact "Salute IA" no claude.ai — https://claude.ai/artifact/WtotK7P4yu9qhf9VWrAqhA |
| Banco, Auth, Storage, Edge Functions | Supabase **"Salute IA novo visual"** (ref `gbhsslyoybqjvjznlave`) |
| Banco antigo (legado, só consulta) | Supabase "Salute CRM" (ref `pigfhkmtqyatuaudpgyy`) |
| Hospedagem | Netlify `saluteia` → https://saluteia.site. Com o repositório ligado, publica a pasta `front/` da `main` sem build no servidor (ver `netlify.toml`) |

## Estrutura

```
front/
  fonte/            código fonte real do front e o build (ver front/fonte/README.md)
  index.html        página publicada, gerada pelo build (bundle único); não editar à mão
  config.js         configuração do front (URL do Supabase, chave pública anon, rota alternativa /sb)
  _redirects        regras do Netlify: rota alternativa do banco e rotas do app
  _headers          cabeçalhos de segurança do Netlify
  extraido/         scripts e template decodificados do bundle, para leitura e diff
netlify.toml        publicação no Netlify (pasta front, sem build no servidor)
tools/unbundle.py   decodifica front/index.html em front/extraido/
docs/
  conexoes.md       inventário de ferramentas e conexões
  supabase.md       projetos Supabase, edge functions e regras de uso
  manual/           manual de arquitetura, estudos e execução
  auditoria/        respostas dos prompts de auditoria (somente leitura)
setup/
  environment-setup.sh   instala e liga rtk + OmniRoute nas sessões de nuvem
```

## Gerar e decodificar o front

```bash
python3 front/fonte/build.py                                  # gera front/index.html
python3 -I tools/unbundle.py front/index.html front/extraido  # atualiza a cópia de leitura
```

A chave em `front/config.js` é a chave **pública (anon)** do Supabase, feita para ficar no navegador; a proteção dos dados vem do RLS. Nunca coloque chaves `service_role` ou segredos neste repositório — ele é público.
