# Fonte do front

Esta pasta é o código fonte real do front. O arquivo publicado, `front/index.html`, é gerado a partir daqui. **Nunca edite `front/index.html` à mão:** altere os arquivos desta pasta e rode o build.

## Gerar o front

```bash
python3 front/fonte/build.py
python3 -I tools/unbundle.py front/index.html front/extraido
```

O primeiro comando grava `front/index.html`; o segundo atualiza a cópia de leitura em `front/extraido/`. Precisa de Python 3 com Pillow e de Node 18 ou mais novo. O build roda de qualquer pasta e é determinístico: o mesmo código gera sempre os mesmos bytes, então o diff no Git mostra só o que mudou de verdade.

## Como o build funciona

1. `orig.html` é a exportação original do Claude Design: visual, design system, React 18.3.1, Babel, fontes e dados de demonstração.
2. `bk_v22/` guarda os módulos visuais de 03/10, ponto de partida dos patches.
3. Os patches `patch_*.py` rodam numa ordem fixa (lista no topo de `build.py`). Cada um troca trechos exatos de texto para ligar as telas ao banco sem mudar o visual, e para o build se não achar o trecho esperado. Mudar a base quebra os patches seguintes.
4. O build junta a Renata ao app, injeta a biblioteca do Supabase e o gerador de QR Code (`vendor/`), os serviços e `supa_base.jsx`, compila o JSX com `precompilar.js` e tira o Babel da página.

## Mapa dos arquivos

| Arquivo | Papel |
|---|---|
| `build.py` | monta `front/index.html` |
| `precompilar.js` | compila o JSX com o Babel que vem no `orig.html` |
| `ds_extra.py` | ajustes no design system e na casca do app |
| `supa_base.jsx` | conexão com o Supabase, sessão, acesso a dados sempre filtrado por clínica, arquivos, tempo real, login, cadastro, admin master e rota alternativa do banco |
| `svc_*.jsx` | serviços por módulo: pacientes, agenda, mensagens, gestão, configurações, conta, painel, anamnese e Renata |
| `patch_*.py` | ligam cada tela do visual ao banco |
| `pront_novo.jsx`, `proc_novo.jsx`, `mapa_novo.jsx`, `estoque_mov.jsx`, `procedimentos_cad.jsx`, `painel_novo.jsx`, `passos_novo.jsx` | blocos de tela inseridos pelos patches |
| `app_pre_renata.jsx` | casca do app antes de receber a Renata |
| `renata_kb.jsx`, `renata_acoes.jsx`, `renata_ui.jsx`, `renata_cmd_sb.jsx` | assistente Renata |
| `vendor/` | biblioteca do Supabase 2.117.2 e gerador de QR Code |
| `assets/logo.png` | símbolo da marca usado no menu |

Arquivos `*_patched.jsx` e `renata_*_sb.jsx` que aparecerem nesta pasta são intermediários do build e ficam fora do Git.

## Rota alternativa do banco (versão 31)

Quando a rede do usuário bloqueia o endereço do Supabase, `supa_base.jsx` testa o endereço direto e a rota `/sb` do próprio site; se só a rota do site responder, passa a usar essa rota até a página ser fechada. Ela depende de `SUPABASE_PROXY: "/sb"` em `front/config.js` e da regra `/sb/*` em `front/_redirects`. Sem essas duas peças, o comportamento é o antigo. Downloads de arquivos e o tempo real continuam no endereço direto.

## Pendências conhecidas

* `patch_r18.py` (modal de agendamento com início, término e vínculo com conversa) está **fora** da lista do build. Ele editava `app_patched.jsx` antes de o build recriar esse arquivo, então a mudança nunca chegou ao sistema publicado. Para valer, precisa rodar depois que o build gera `app_patched.jsx`; isso muda a tela e depende de aprovação.
* React está na versão de desenvolvimento, herdada do `orig.html`.
