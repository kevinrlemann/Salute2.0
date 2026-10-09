# Arquitetura do Salute IA

Estado verificado em 2026-10-09 (commit `af596dd`), lendo o código deste repositório e o catálogo do Supabase "Salute IA novo visual" (`gbhsslyoybqjvjznlave`), só leitura de estrutura. Nenhum dado de paciente nem segredo foi lido.

Legenda: **[confirmado]** = visto no código ou no catálogo do banco · **[inferido]** = conclusão provável, ainda não comprovada · **[não confirmado]** = não deu para verificar.

Documentos irmãos: [`frontend.md`](frontend.md) (telas, serviços, como editar o front) e [`database.md`](database.md) (tabelas, segurança, funções, migrations). As auditorias em `docs/auditoria/` são fotografias anteriores. Este documento substitui o que elas dizem sobre a arquitetura atual.

---

## 1. Em uma frase

O Salute IA é **um site de uma página só** que roda no navegador da clínica e fala **direto com o Supabase** (banco, login, arquivos e atualizações ao vivo). Não existe servidor próprio. A única peça de servidor é a função **`renata`**, que liga a assistente de IA ao **Groq** (texto) e à **ElevenLabs** (voz). [confirmado]

## 2. Diagrama

```
                    NAVEGADOR (equipe da clínica ou paciente)
 ┌──────────────────────────────────────────────────────────────────────────┐
 │ front/index.html  (pacote único: React 18.3.1 dev + supabase-js 2.117.2  │
 │                    + Design System + 16 scripts do app)                  │
 │ front/config.js   (URL do Supabase + chave pública anon + BASE_PATH)     │
 │                                                                          │
 │  RaizSalute ─┬─ /a/<token> ou ?a=  → anamnese pública (sem login)         │
 │              ├─ /u/<token> ou ?u=  → envio público de documentos          │
 │              └─ PortaSupabase → login → App (Painel, Pacientes, Agenda,   │
 │                                   Mensagens/CRM, Gestão, Configurações)   │
 │                                 + Renata (chat, voz, ações com confirmação)│
 │  Camada de dados: SB → DB.* / ARQ.* / tempoReal() / *Svc                  │
 └───────┬──────────────────┬───────────────────┬─────────────────┬─────────┘
         │ REST (PostgREST) │ Auth              │ Storage         │ Realtime
         ▼                  ▼                   ▼                 ▼
 ┌──────────────────────────────────────────────────────────────────────────┐
 │ SUPABASE "Salute IA novo visual" (gbhsslyoybqjvjznlave, Postgres 17)     │
 │  • 116 tabelas no schema public, todas com RLS                           │
 │  • 71 funções (RPCs e funções de segurança)                              │
 │  • 7 buckets privados (clinica, prontuario, mensagens, fiscal,           │
 │    conteudos, pacientes, comprovantes)                                   │
 │  • Realtime em 14 tabelas · Vault para chaves                            │
 │  • Edge Function "renata" v8 (verify_jwt = true)                         │
 └───────────────────────────────┬──────────────────────────────────────────┘
                                 │ chave do Vault (da clínica ou padrão Salute)
                     ┌───────────┴────────────┐
                     ▼                        ▼
           Groq (api.groq.com)        ElevenLabs (api.elevenlabs.io)
           chat da Renata             voz (fala) e transcrição
           3 modelos em ordem         eleven_flash_v2_5 / scribe_v1
```

Fora desse caminho [confirmado]:
- Ícones Lucide carregados de `unpkg.com/lucide@0.468.0` (dentro do Design System `7bf00496…js`). Sem internet para o unpkg, os ícones não aparecem.
- No **modo demonstração** a Renata chama `api.anthropic.com` e `api.elevenlabs.io` direto do navegador, com uma chave digitada e guardada no `localStorage`.
- Dentro do **artifact do claude.ai**, a Renata usa primeiro a IA do próprio claude.ai (`window.claude.use('sample')`), antes do servidor. Isso vale também no modo conectado (`1b7a2c45…js` L2441 e L3285). No Netlify, `window.claude` não existe e o caminho é a função `renata`.

Não existe hoje [confirmado]: envio real de WhatsApp (o front só grava mensagens "pendentes" e não há função `whatsapp`), n8n ligado, pagamento, emissão de nota fiscal, e-mail próprio. Nada aponta para o projeto antigo "Salute CRM" (`pigfhkmtqyatuaudpgyy`), que fica só para consulta.

## 3. Os dois modos: conectado e demonstração

| | Conectado (`SB_ON = true`) | Demonstração (`SB_ON = false`) |
|---|---|---|
| Quando | `config.js` com `SUPABASE_URL` e chave anon válidas e supabase-js carregado | Sem configuração, chave errada ou biblioteca sem carregar |
| Login | Supabase Auth (`TelaAcesso`) | Não tem. Abre direto como "Dra. Camila Rocha", clínica fictícia "Bella Forma" |
| Dados | Banco, sempre filtrado pela clínica ativa | Listas fixas dentro dos próprios scripts |
| Gravar | Serviços (`*Svc`) gravam no banco e desfazem na tela se falhar | Só muda a tela |
| Renata | Função `renata` (Groq/ElevenLabs), ou `window.claude` dentro do claude.ai | Chave digitada → Anthropic/ElevenLabs direto, ou respostas fixas |

Fonte: `SB_ON` em `front/extraido/5a1e7e02-…c001.js` L76; motivo em `SB_MOTIVO` (L77). [confirmado]

Atenção: se o `config.js` falhar, o sistema **abre em demonstração sem login** em vez de mostrar erro. [confirmado]

## 4. Componentes e responsabilidades

| Peça | O que faz | Onde |
|---|---|---|
| Front | Telas, regras de tela, chamadas ao banco | `front/index.html` (publicado) e `front/extraido/` (legível) |
| Configuração do front | URL do Supabase, chave pública, `BASE_PATH` | `front/config.js` |
| Supabase Auth | Login, cadastro, senha, convite por link mágico | projeto `gbhsslyoybqjvjznlave` |
| Banco + RLS | Dados e **a permissão de verdade** | ver `database.md` |
| Storage | Logos, documentos do paciente, anexos, certificado fiscal, conteúdos | 7 buckets privados |
| Realtime | Agenda, CRM, mensagens, notificações, anamnese e documentos ao vivo | 14 tabelas publicadas |
| Edge `renata` v8 | Chat (Groq), voz e transcrição (ElevenLabs), limite e consumo | `supabase/functions/renata/` |
| Vault | Chaves de Groq, ElevenLabs, WhatsApp, certificado fiscal | `segredos_integracao` guarda só o ponteiro |

O código da função `renata` publicada (versão 8) é igual ao de `supabase/functions/renata/index.ts` e `groq.ts` deste repositório. [confirmado: comparado com o conteúdo baixado do Supabase]

### 4.1 Renata no servidor (função `renata` v8)

Ações (POST, com o login do usuário) [confirmado, `index.ts` L6-11]: `status`, `testar`, `chat`, `voz`, `transcrever`.

Proteções [confirmado]:
- confere o login (`auth.getUser`) e o vínculo **ativo e aceito** com a clínica, ou acesso de suporte aberto e dentro do prazo (`index.ts` L58-89)
- chave do Groq: a da clínica no Vault (`ler_segredo`), senão a padrão da Salute (Vault ou segredo `GROQ_API_KEY`) (L101-107)
- valida o nome do modelo mandado pelo front contra `claude-(haiku-4-5|sonnet-4-5|sonnet-5-5)` (L31, L129). O nome serve só para validar: o Groq usa os modelos dele
- limites de tamanho: até 100 mensagens, 40 ferramentas, 400 mil caracteres por pedido (L34, L132-135)
- limite mensal de mensagens **quando a clínica usa a chave da Salute**: RPC `renata_limite_mes`; sem plano com limite, vale `RENATA_LIMITE_PADRAO` (padrão 300) (L137-146)
- regras do **Agente de IA** da clínica (RPC `agente_ia_regras`, tabela `agente_ia`) entram **no começo** das instruções de toda conversa (L150-155)
- consumo contado pelo servidor (`renata_registrar_consumo`), não pelo navegador (L161)

Groq (`groq.ts`) [confirmado]:
- modelos em ordem: `openai/gpt-oss-120b` → `openai/gpt-oss-20b` → `qwen/qwen3.8-27b` (L10). O próximo entra quando o anterior dá limite (429/413), modelo indisponível ou erro 5xx (L171-202)
- traduz o pedido do formato do Claude para o formato OpenAI do Groq e traduz a resposta de volta para os eventos do Claude, então o front não precisou mudar (L60-160)
- resumo da clínica cortado em 7.000 caracteres, descrições de ferramentas em 200, resposta em 1.000 tokens (L20). Se der 413, tenta de novo com metade do resumo (L162-169)
- se os três estiverem no limite por poucos segundos, espera até 20 s e tenta mais uma vez (L22, L203-207)

ElevenLabs [confirmado]: voz padrão `RGymW84CSmfVugnA5tvA`, modelo `eleven_flash_v2_5`, texto cortado em 1.600 caracteres; transcrição com `scribe_v1`. Erro de permissão da chave vira mensagem em português (`index.ts` L36-42, L165-196).

Testes da tradução: `supabase/functions/renata/testes/groq.test.mts` (instrução de execução na 1ª linha do arquivo). [confirmado]

## 5. Multi-clínica e permissões

- Uma pessoa (login) pode participar de várias clínicas pela tabela `usuarios_clinicas` (papel, dono, convite). A clínica ativa fica em `perfis_usuario.clinica_ativa_id` e no `localStorage` (`salute02:clinica`). [confirmado]
- Quase toda tabela tem `clinica_id`. O front sempre filtra pela clínica ativa (`DB.*` em `c001` L297), **mas isso é só conveniência**. Quem separa uma clínica da outra é a **RLS** do banco, com as funções `minhas_clinicas()`, `clinicas_permitidas(módulo)`, `clinicas_gestao()` e `eh_admin_plataforma()`. Ver `database.md`. [confirmado]
- Módulos por pessoa: tabela `permissoes`. A tela esconde o que a pessoa não pode ver (`useAccess().can()`), mas o bloqueio real é da RLS. Membro comum não consegue se dar permissão; só o **dono** dá acesso de gestor ou indica outro dono (gatilho `usuarios_clinicas_proteger`). [confirmado]
- Equipe Salute: `perfis_usuario.admin_plataforma` abre o **Painel Master**. Para ver dados de uma clínica, o admin abre um "acesso de suporte" com prazo (`admin_entrar_clinica`, tabela `acessos_suporte`), que fica registrado. [confirmado]
- Conteúdo global da Salute (planos, Saluteflix, parceiros, certificações, figurinhas, modelos de mapeamento, base de conhecimento) fica em linhas com `clinica_id` nulo, visíveis para todas as clínicas e editáveis só pela equipe Salute. [confirmado]

## 6. Ciclo de publicação

```
editar front/extraido/*.js
        │  python3 -I tools/rebundle.py front/index.html front/extraido
        ▼
front/index.html atualizado  ──►  validar (modo demonstração headless, ver frontend.md)
        │
        ▼
commit na main  ──►  git push origin main
        │                      (com aprovação do fundador)
        ▼
git push origin main:producao  ──►  Netlify publica a pasta front/ em https://saluteia.site
        │
        └──►  artifact do claude.ai (https://claude.ai/artifact/WtotK7P4yu9qhf9VWrAqhA)
              republicado com front/index.html + front/config.js
```

- Repositório: GitHub `kevinrlemann/salute2.0`. Branch `main` = desenvolvimento; branch `producao` = o que está no ar. [confirmado: `git remote -v` e branches]
- No último `fetch` local, `origin/producao` e `main` apontam para o mesmo commit (`af596dd`). [confirmado localmente; o estado do GitHub depois disso não foi consultado]
- Netlify: `netlify.toml` na raiz publica a pasta `front/` sem build e manda qualquer caminho para `/index.html` (rotas `/painel`, `/a/<token>` etc.). [confirmado no arquivo] A ligação do site `saluteia` com a branch `producao` está descrita no README e no commit `73c0de3`, mas não foi verificada no painel do Netlify. [não confirmado]
- `deploy/netlify/` é a pasta de publicação manual antiga (arrastar no painel). O `index.html` dela **está desatualizado** em relação ao `front/index.html` (difere desde o commit `9c97689`). Não usar sem copiar de novo. [confirmado]
- Supabase: banco e função **não** entram pelo Git. Migration é aplicada no projeto e o arquivo `.sql` é guardado em `supabase/migrations/`; a função `renata` é publicada pelo conector/CLI. [inferido pelo histórico de commits]
- Se o artifact está na mesma versão do `front/index.html`: [não confirmado]. O `docs/conexoes.md` registra que quem abre o link compartilhado vê uma versão fixada anterior.

## 7. Decisões de arquitetura (e por quê)

| Decisão | Motivo / efeito | Status |
|---|---|---|
| Front é um pacote único exportado do Claude Design, sem projeto-fonte com bundler | Nasceu no Claude Design; editar exige `unbundle`/`rebundle` | confirmado |
| Módulos se comunicam por variáveis em `window`; ordem dos `<script>` importa | Herança do formato do pacote | confirmado |
| Sem back-end próprio; segurança no banco (RLS + RPC `SECURITY DEFINER`) | Menos peças; tudo depende da RLS estar certa | confirmado |
| Exclusão lógica (`excluido_em`) em vez de apagar | Histórico e auditoria; LGPD exige rotina manual para apagar de fato | confirmado |
| Chaves de IA só no Vault/segredos da função | Nunca chegam ao navegador no modo conectado | confirmado |
| Renata no formato do Claude, traduzido para o Groq no servidor | Trocar de provedor sem mexer no front | confirmado |
| Renata só **propõe** gravações; a pessoa confirma | Evita a IA gravar sozinha | confirmado |
| Regras do Agente de IA no banco (`agente_ia`) | Mesma regra para a Renata e, no futuro, o atendimento do WhatsApp (canal `whatsapp` já previsto em `agente_ia_regras`) | confirmado (WhatsApp ainda não usa) |
| Agenda em blocos de 30 minutos | Validada no front (`AG_PASSO_MIN`, `agMeiaHoraOk`), não no banco | confirmado |

## 8. Limitações e riscos conhecidos

1. **Renata dentro do claude.ai** usa a IA da conta claude.ai de quem está vendo, não o Groq da Salute; o consumo não é contado e os dados vão para outro lugar. [confirmado]
2. A função `renata` ainda aceita do navegador as **instruções** (`system`) e as **ferramentas**. As regras do Agente de IA vêm antes, mas o resto continua sob controle do navegador. [confirmado]
3. **WhatsApp não envia**: mensagens ficam "pendentes", o QR de conexão "não oficial" é desenho falso (`FakeQR`) e a URL de webhook aponta para `/functions/v1/whatsapp`, que não existe. [confirmado]
4. **React em versão de desenvolvimento** e pacote de ~3,6 MB (com ~207 KB de imagens base64): pesado no celular. [confirmado]
5. Arquivo de telas `d47643ae…js` **minificado** (11 linhas, 669 KB): difícil de editar e revisar. [confirmado]
6. Agenda de 30 min, campos obrigatórios e várias regras ficam **só no front**: quem gravar direto pela API escapa delas. [confirmado]
7. A Renata ainda grava algumas mudanças direto no banco (`DB.upd('agendamentos')` em `1b7a2c45…js` L7602 e L7728), fora do `AgSvc.editar`. [confirmado]
8. CRM não cria lead pelo front; não há bloqueio de horário nem fila de espera com tela; "2 etapas" é só uma marcação. [confirmado na Auditoria 03; não reverificado item a item]
9. As 41 migrations iniciais do banco (estrutura base e dados de demonstração `mock_*`) **não estão** em `supabase/migrations/`. Ver `database.md` §9. [confirmado]
10. Cadastro aberto no Auth (qualquer pessoa cria conta e clínica): [não confirmado] na configuração do Auth.
11. Documentos antigos desatualizados: `README.md` (Netlify "sem repositório ligado"), `docs/conexoes.md` e `docs/supabase.md` (~115 tabelas, função só com Anthropic), `CLAUDE.md` ("fase atual: auditoria somente leitura"). [confirmado]
