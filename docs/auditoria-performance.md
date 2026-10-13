# Auditoria de performance (2026-10-13)

Executada a partir do "prompt mestre de performance" do fundador. Marcação: **confirmado** (medido ou visto no código/banco),
**hipótese** (a validar), **não acessível** (fora deste ambiente).

## 1. Resumo executivo

- O sistema é um único `index.html` com todos os scripts embutidos em base64. Cada visita baixava 1,17 MB comprimidos
  (HTML não fica em cache). Dentro dele, React e ReactDOM eram as **versões de desenvolvimento** (1,19 MB brutos), mais
  lentas e com checagens extras. **Corrigido**: React/ReactDOM de produção (142 KB) e, para o site, scripts em arquivos
  separados com cache de um ano (`front/site/`). Visita repetida passa a baixar 35 KB em vez de 1,17 MB.
- Uma correção minha de hoje de manhã (reassinatura do tempo real) **recarregava a lista de conversas 3 a 4 vezes a cada
  troca de tela** quando o canal do Supabase caía. **Corrigido**: só avisa quando a assinatura volta de verdade.
- Banco: 34 MB, índices adequados nas tabelas quentes, RLS em todas as tabelas, funções de permissão `STABLE`. Nada de
  consulta lenta no `pg_stat_statements`. O custo fixo de cada pedido é a checagem de permissão (cerca de 7 ms).
- n8n: fluxos WF01 e WF05 inspecionados hoje (ferramentas síncronas, lista fechada de ações). Duração real das execuções
  **não medida** aqui.

## 2. Arquitetura confirmada

Front: pacote único exportado do Claude Design, React 18.3.1, supabase-js 2.117.2, design system próprio, Lucide 0.468
via unpkg; sem build tool. Back: Supabase (Postgres 17, RLS, Realtime, Storage, Edge Functions `renata` e `whatsapp`),
pg_cron a cada minuto (`ia_manutencao`, vigia do WhatsApp). Automação: n8n (WF00 a WF09). Hospedagem: Netlify (branch
`producao`, pasta publicada agora `front/site`). Artifact do claude.ai usa o pacote único `front/index.html`.

## 3. Escopo inspecionado e limitações

Inspecionado: `front/extraido/*.js` (3,9 MB), `tools/`, `netlify.toml`, migrações, funções e políticas no banco (via MCP do
Supabase), `pg_stat_statements`, índices, planos de execução, WF01/WF05 do n8n (via MCP), site publicado (curl).
Não acessível: navegador do usuário (Web Vitals de campo), tempo real do Supabase pelo sandbox (websocket bloqueado),
unpkg (bloqueado; o React de produção foi obtido pelo `pg_net` do banco), execuções do n8n com tempo, Evolution API.

## 4. Linha de base (antes) e resultado (depois)

Condições: Chromium headless 1280×800 e 390×844, servidor local, Supabase simulado com 40 ms por pedido (modo "sim") ou
sem rede (modo "demo"). Site real medido com `curl` a partir do sandbox.

| Medida | Antes | Depois | Como |
|---|---|---|---|
| index.html (bruto / gzip) | 1.561.924 / 1.169.313 B | pacote: 1.276.052 / 953.508 B · site: 35.500 B + assets 3,0 MB (gzip ≈ 831 KB, em cache por 1 ano) | `ls`, `gzip -c` |
| Site real, download completo | 0,59 a 1,35 s (1,16 MB, HTTP/2) | a medir após publicar (index 35 KB + assets em cache) | `curl -w` |
| React/ReactDOM | development (1.190.158 B) | production.min (142.586 B) | arquivos no pacote |
| Memória JS após abrir (demo) | 25 MB | 19 MB (pacote) · 11 MB (site) | `performance.memory` |
| Maior tarefa longa na abertura (demo) | 281 ms | 99 ms | PerformanceObserver longtask |
| Pedidos ao banco na entrada (conectado) | 44 | 44 | interceptação Playwright |
| Pedidos ao trocar de tela: Agenda / Conversas / Gestão | 11 / 13 / 12 (conversas, canais e figurinhas 3-4×) | 2 / 3 / 0 | interceptação Playwright |
| Consulta da agenda (janela de 390 dias, 39 linhas) | 75,9 ms (cache frio) | mesma consulta com menos colunas; não remedida | `EXPLAIN (ANALYZE, BUFFERS)` |
| Lista de conversas (24 linhas) | 7,3 ms | igual | `EXPLAIN (ANALYZE, BUFFERS)` |
| `clinicas_permitidas('agenda')` (RLS) | 7,4 ms, 1.483 buffers | igual (não alterado) | `EXPLAIN (ANALYZE, BUFFERS)` |

Não medido: Web Vitals em aparelho real (LCP/INP/CLS), tempo de resposta real do Supabase a partir do Brasil, n8n.

## 5. Matriz de problemas

| ID | Prioridade | Problema | Evidência | Causa | Situação |
|---|---|---|---|---|---|
| PF-01 | P1 | React de desenvolvimento em produção | cabeçalho `react.development.js` nos assets | pacote exportado com builds dev | **corrigido** (production.min 18.3.1, mesmos nomes de arquivo; telas idênticas pixel a pixel) |
| PF-02 | P1 | 1,17 MB baixados a cada visita | HTML não cacheável; base64 não comprime | pacote único | **corrigido para o site** (`tools/site.py`, `front/site/`, `Cache-Control: immutable` em `/assets/*`) |
| PF-03 | P1 | Lista de conversas recarregada 3-4× por tela quando o canal cai | 11-13 pedidos por troca de tela | aviso a cada tentativa de reassinatura (c001) | **corrigido** (aviso único ao reassinar de verdade; espera 3 s → 60 s) |
| PF-04 | P2 | Agenda traz `*` (35 colunas) por consulta na janela de 390 dias | `AG_SELECT` | seleção ampla | **corrigido** (19 colunas usadas pela tela) |
| PF-05 | P2 | 44 pedidos na entrada (25 catálogos em paralelo + pré-carga) | interceptação | um pedido por tabela de catálogo | hipótese: uma RPC `catalogos()` reduziria 25 → 1; não feito (mudança ampla) |
| PF-06 | P2 | Custo fixo de RLS ≈ 7 ms e 1.483 buffers por pedido | plano da função | `clinicas_permitidas` lê 5 tabelas | hipótese: materializar permissões por sessão; não feito (função de segurança) |
| PF-07 | P2 | Lucide (ícones) vem do unpkg a cada visita | template | dependência externa | não feito; o navegador cacheia (unpkg manda `immutable`) |
| PF-08 | P3 | Agenda carrega 390 dias de uma vez | `CARGAS.agenda` | janela fixa | aceitável no volume atual (39 linhas); rever acima de ~5.000 consultas por clínica |
| PF-09 | P3 | Conversas: `*` com 1.000 linhas e chat com 1.000 mensagens | `CARGAS.mensagens`, `carregarChat` | sem paginação | aceitável hoje (24 conversas); paginar quando passar de ~300 |

## 6. Mudanças aplicadas

1. `front/extraido/709b623d….js` e `7dd7e122….js`: React e ReactDOM 18.3.1 de produção (obtidos de unpkg via `pg_net`; conferidos
   pelo cabeçalho de licença e pelo tamanho 10.751 / 131.835 B). Reversão: as versões de desenvolvimento estão no histórico do Git.
2. `front/extraido/template.html`: sem `integrity` nos dois scripts (o carregador já os ignorava).
3. `front/extraido/5a1e7e02…c001.js`: `tempoReal` avisa `aoVoltarVisivel` só quando reassina de verdade (`RT_TENTATIVAS`).
4. `front/extraido/5a1e7e02…c003.js`: `AG_SELECT` só com as colunas usadas.
5. `tools/site.py` (novo) e `netlify.toml`: site publicado a partir de `front/site/` com assets em cache.
6. `CLAUDE.md`: novo passo de publicação (`tools/site.py`).

## 7. Testes executados

- `node --check` em todos os scripts editados: ok.
- Playwright, computador 1280×800, modo demonstração, 8 telas comparadas pixel a pixel com a versão publicada: só o orbe animado difere.
- Playwright, celular 390×844, modo conectado com dados reais da clínica: Início, Agenda (seletor e consultas), Mais → Configurações,
  Financeiro → atalhos: iguais ao antes, sem erros de página. Repetido sobre `front/site/`.
- Roteiro de medição (`scratchpad/perf/medir.cjs`): números da tabela acima.
- Não executado: testes da função `renata` (não alterada), testes de carga.

## 8. Segurança e multi-tenancy

RLS ativa em todas as tabelas públicas (380 políticas). Funções de permissão são `STABLE SECURITY DEFINER` com `search_path`.
Nenhuma política, função ou cache de dados foi alterada nesta auditoria. A cópia local de conversas (de hoje de manhã) é por
clínica e usuário e apagada ao sair. Chave `service_role` não aparece no front (confirmado por `grep`).

## 9. Mudanças não aplicadas e próximas prioridades

1. PF-05: RPC única de catálogos (25 → 1 pedido na entrada). Esforço médio; ganho estimado 0,3 a 0,8 s na entrada em redes lentas (hipótese).
2. PF-06: cachear o resultado de `clinicas_permitidas` por transação (`pg_catalog` não permite; alternativa: `set_config` por sessão). Exige revisão de segurança.
3. Medir Web Vitals no aparelho do fundador (Chrome › Lighthouse) depois da publicação.
4. n8n: medir duração das execuções de WF01 (tempo do ChatGPT separado do banco).

## 10. Deploy e rollback

Deploy: `python3 -I tools/rebundle.py front/index.html front/extraido && python3 -I tools/site.py front/index.html front/site`,
commit, `git push origin main:producao`. Netlify publica `front/site`. Validação: `https://saluteia.site/` com ~35 KB e
`/assets/*.js` com `cache-control: public, max-age=31536000, immutable`. Rollback: `netlify.toml` com `publish = "front"` e o
commit anterior.
