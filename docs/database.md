# Banco de dados do Salute IA

Projeto Supabase **"Salute IA novo visual"** (`gbhsslyoybqjvjznlave`, Postgres 17). Estado verificado em 2026-10-09 por consultas **só de catálogo** (`pg_catalog`, `information_schema`, `storage.buckets`, lista de migrations e de edge functions) e pela leitura de `supabase/migrations/`. Nenhum dado de paciente nem segredo foi lido; as únicas contagens de conteúdo foram de linhas globais/estruturais (etapas do funil, certificações, parceiros, agente_ia, clínicas).

Legenda: **[confirmado]** = visto no catálogo ou no SQL · **[inferido]** = provável, não comprovado · **[não confirmado]** = não verificado.
Inventário coluna a coluna, regra a regra: `docs/auditoria/02-mapa-banco.md` (fotografia anterior às correções S1–S6; ver §10).

---

## 1. Números atuais

| Item | Valor | Status |
|---|---|---|
| Tabelas no schema `public` | **116**, todas com RLS ligado | confirmado |
| Views | 1 (`salute_pay_transacoes`; o front não usa) | confirmado |
| Funções no schema `public` | 71 | confirmado |
| Gatilhos (fora os internos) | 161: 115 com "atualizado" no nome, 35 com "auditoria" no nome (em 34 tabelas) e os demais de regra de negócio | confirmado |
| Buckets do Storage | 7, todos privados | confirmado |
| Tabelas no Realtime | 14 | confirmado |
| Migrations registradas no banco | 57 | confirmado |
| Arquivos em `supabase/migrations/` | 15 | confirmado |
| Edge functions | 1: `renata`, versão 8, `verify_jwt = true` | confirmado |
| Extensões | pg_net, pg_stat_statements, pg_trgm, pgcrypto, plpgsql, supabase_vault, unaccent, uuid-ossp | confirmado |

## 2. Padrão de colunas

Quase toda tabela segue o mesmo molde [confirmado]:

| Coluna | Para que serve | Exceções |
|---|---|---|
| `id uuid` | chave primária | — |
| `clinica_id` | de qual clínica é a linha; base do isolamento | Não existe em `clinicas` e `perfis_usuario`. É **opcional (nulo = conteúdo global)** em 12 tabelas: `planos`, `flix_categorias`, `flix_conteudos`, `flix_aulas`, `cast_episodios`, `parceiros`, `cupons_parceiros`, `selos_certificacoes`, `figurinhas`, `mapeamento_modelos`, `renata_base_conhecimento`, `segredos_integracao` (nulo = chave padrão da Salute) |
| `criado_em` | quando foi criada | — |
| `atualizado_em` | última alteração, mantida pelo gatilho `tocar_atualizado_em` | falta em `feriados` |
| `criado_por` | quem criou (`auth.uid()`) | falta em `ia_config` |
| `excluido_em` | **exclusão lógica**: preenchida = "apagada"; o front sempre filtra `excluido_em is null` | falta em `ia_config` |

Quase nenhuma tabela tem regra de DELETE na RLS: o front não apaga de verdade, só marca `excluido_em`. Pedido de exclusão definitiva (LGPD) exige ação no servidor. [confirmado na Auditoria 02]

## 3. Domínios e tabelas principais

| Domínio | Tabelas |
|---|---|
| Acesso e contas | `perfis_usuario`, `clinicas`, `usuarios_clinicas`, `permissoes`, `preferencias_usuario`, `notificacoes`, `acessos_suporte`, `auditoria` |
| Cadastros da clínica | `configuracoes_clinica`, `horarios_funcionamento`, `consultorios`, `profissionais`, `profissionais_procedimentos`, `horarios_profissional`, `procedimentos`, `tipos_agendamento`, `status_agendamento`, `convenios`, `convenio_planos`, `etiquetas`, `feriados` |
| Pacientes e prontuário | `pacientes`, `pacientes_telefones`, `pacientes_etiquetas`, `historico_paciente`, `anamnese_modelos`, `anamnese_blocos`, `anamnese_perguntas`, `anamnese_envios`, `anamnese_respostas`, `mapeamento_modelos`, `mapeamentos`, `mapeamento_marcacoes`, `procedimentos_realizados`, `procedimento_insumos`, `pastas_documentos`, `links_envio_documentos`, `documentos_paciente`, `comparacoes_antes_depois` |
| Agenda | `agendamentos`, `bloqueios_horario`, `fila_espera`, `retornos_programados`, `retorno_tentativas_contato` |
| CRM | `funis`, `etapas_funil`, `origens_lead`, `motivos_perda`, `leads`, `movimentacoes_lead` |
| Mensagens e chat da equipe | `instancias_whatsapp`, `canais_conectados`, `conversas`, `mensagens`, `conversa_leituras`, `etiquetas_conversa`, `respostas_rapidas`, `figurinhas`, `anexos_mensagem`, `reacoes_mensagem`, `canais_equipe`, `participantes_canal`, `mensagens_equipe` |
| Tarefas (sem tela) | `tarefas`, `tarefa_responsaveis`, `tarefa_comentarios`, `tarefa_checklist` |
| Financeiro | `formas_pagamento`, `contas_bancarias`, `categorias_financeiras`, `contas_receber`, `contas_pagar`, `parcelas`, `orcamentos`, `orcamento_itens`, `metas_profissional`, `configuracao_nota_fiscal`, `notas_fiscais` |
| Convênio TISS (sem tela) | `guias`, `guia_dados`, `guia_autorizacoes`, `guia_execucoes`, `guia_sessoes`, `convenio_faturamentos`, `convenio_faturamento_guias`, `convenio_glosas` |
| Estoque | `categorias_produto`, `unidades_medida`, `fornecedores`, `produtos`, `lotes`, `movimentacoes_estoque`, `procedimento_kit_padrao` |
| IA | `agente_ia` (**nova**), `renata_configuracoes`, `renata_voz`, `renata_horarios`, `renata_instrucoes`, `renata_base_conhecimento`, `renata_conversas`, `renata_mensagens`, `renata_acoes`, `renata_consumo`, `ia_config` (legada) |
| Assinatura | `planos`, `assinaturas_clinica`, `historico_assinatura` |
| Conteúdo Salute | `flix_categorias`, `flix_conteudos`, `flix_aulas`, `flix_progresso`, `cast_episodios`, `parceiros`, `cupons_parceiros`, `selos_certificacoes` |
| Segredos | `segredos_integracao` (só ponteiro para o Vault; sem regra de RLS = ninguém do front lê) |

Agrupamento da Auditoria 02, mais `agente_ia`. [confirmado]

### 3.1 Mudanças recentes de dados/estrutura

- **`agente_ia`** (migration `20261009014745`): uma linha por clínica (índice único `agente_ia_uma_por_clinica`); nome, tom (`acolhedor`/`profissional`/`descontraido`), apresentação, `pode_falar[]`, `nao_pode_falar[]`, regras extras, resposta para assunto proibido, `aplicar_assistente`, `aplicar_whatsapp`; limites de tamanho por `check`. Toda clínica recebeu o agente padrão (hoje 1 clínica, 1 agente). [confirmado]
- **Funil de 5 etapas** (`20261009011213`): Novo Lead (1), Aguardando atendente (2, antes "Em Contato"), Agendado (3), Convertido (4), Perdido (5). "Avaliação" saiu por exclusão lógica e seus leads foram para "Aguardando atendente". `semear_padroes_clinica` cria as mesmas 5 em clínicas novas. Etapas ativas no banco hoje: exatamente essas 5. [confirmado]
- **`anamnese_envios.local_assinatura`** (jsonb, `20261009013134`): `{status: ok|negado|indisponivel|tempo_esgotado, lat, lng, precisao_m, registrado_em}`, limpo pela função `anamnese_local_limpo` antes de gravar (via `responder_anamnese`). [confirmado]
- **Pastas padrão de documentos** para clínicas que não tinham (`20261009014414`): Antes, Depois, Documentação Clínica, Antes e Depois. [confirmado]
- **Conteúdo global** (`20261009015215`): 5 certificações (Startup Brasil, AWS Certified, LGPD/GDPR Compliance, Microsoft Partner, Meta Business Partner) e a parceira Nexus, todas com `clinica_id` nulo. Os logos ficam no front. [confirmado: 5 selos e 1 parceiro globais no banco]
- Enum `provedor_integracao`: `anthropic, elevenlabs, whatsapp_meta, whatsapp_nao_oficial, certificado_fiscal, outro, google, groq`. [confirmado]

## 4. RLS e funções de acesso

Funções que toda regra usa (todas `SECURITY DEFINER`) [confirmado na Auditoria 02; existência reconfirmada]:

| Função | Devolve | Quem entra |
|---|---|---|
| `minhas_clinicas()` | clínicas do usuário | membro **ativo e aceito**, ou suporte Salute com entrada aberta |
| `clinicas_permitidas(módulo)` | clínicas onde o usuário tem o módulo | membro com permissão no módulo (dono e gestor sempre) |
| `clinicas_gestao()` | clínicas onde o usuário gere | dono ou gestor (ou suporte aberto) |
| `eh_admin_plataforma()` | sim/não | `perfis_usuario.admin_plataforma` |
| `pode(clínica, módulo)` | sim/não | usada dentro das RPCs |
| `clinica_suporte`, `pasta_membro`, `pasta_permitida`, `membro_pode` | auxiliares | Storage e checagens |

Módulos: `pacientes`, `agenda`, `mensagens` (inclui CRM), `painel`, `gestao.estoque`, `gestao.financeiro`, `perfil.cadastro`, `perfil.canais` (e as demais abas `perfil.<aba>`). [confirmado na Auditoria 02]

Regras gerais [confirmado na Auditoria 02, salvo indicação]:
- Ler: normalmente `clinica_id in minhas_clinicas()`; dados sensíveis pedem o módulo (`clinicas_permitidas`).
- Gravar: módulo correspondente; configurações e IA pedem `clinicas_gestao()`.
- `agente_ia`: ler = `minhas_clinicas()`; criar/editar = `clinicas_gestao()`; sem DELETE. [confirmado na migration e no catálogo]
- Conteúdo global: ler se `clinica_id` é nulo; gravar só admin da plataforma.
- `usuarios_clinicas`: inserção direta só de **convite pendente** (S4); só o dono dá papel de gestor ou dono (gatilho `usuarios_clinicas_proteger`). [confirmado na migration `20261009020200`]
- `ia_config` (legada): agora restrita a `clinicas_gestao()` (S6). [confirmado na migration]
- O papel `anon` não tem acesso a tabelas; só a algumas RPCs por token (anamnese e documentos). [confirmado na Auditoria 02]

## 5. RPCs importantes

Chamadas pelo front (26, mesma lista da Auditoria 01, reconfirmada por busca no código) [confirmado]:
`aceitar_termos`, `admin_clinicas`, `admin_definir_acesso`, `admin_entrar_clinica`, `admin_membros`, `admin_registrar_envio`, `admin_sair_clinica`, `anamnese_publica`*, `avisar_receitas_vencidas`, `concluir_cadastro`, `convidar_membro`, `criar_clinica`, `link_documentos_publico`*, `marcar_conversa_lida`, `marcar_primeiro_passo`, `meu_contexto`, `painel_mes`, `pedir_consultor`, `primeiros_passos`, `regerar_link_anamnese`, `registrar_documento_link`*, `registrar_leitura`, `responder_anamnese`*, `salvar_rascunho_anamnese`*, `salvar_segredo`, `trocar_plano`.
(* = abertas ao visitante sem login, protegidas por token.)

Usadas só pelo servidor (`renata`, com service role) [confirmado]:

| Função | O que faz |
|---|---|
| `ler_segredo(clínica, provedor)` | lê a chave no Vault (da clínica ou padrão) |
| `renata_registrar_consumo(...)` | soma mensagens, tokens, caracteres de voz e segundos no mês |
| `renata_limite_mes(clínica)` | `{usadas, limite, ilimitado}`; só `service_role` executa (`20261009020100`) |
| `agente_ia_regras(clínica, canal)` | texto das regras do Agente de IA; canal `assistente` ou `whatsapp`; executável por `authenticated` (só clínicas dele) e `service_role` (`20261009014745`) |
| `feriados_do_mes(clínica, mês)` | feriados do mês para o calendário: nacionais calculados (`feriados_nacionais(ano)`, que usa `pascoa(ano)`) mais os cadastrados pela clínica na tabela `feriados`; `security invoker`; usado pelo `painel_mes` e pela agenda (`20261009020913`) [confirmado] |

Outras de destaque [confirmado]:
- `painel_mes(clínica, mês)`: números do painel; o funil devolve também **`perdidos`** (leads do mês na etapa de tipo `perdido`) (`20261009011305`).
- `salvar_segredo(clínica, provedor, segredo)`: grava no Vault e mostra só os 4 últimos caracteres; `groq`, `google` e `anthropic` marcam a IA da Renata como configurada (`renata_configuracoes.claude_configurada`, nome antigo da coluna) (`20261009040100`).
- `semear_padroes_clinica`: dados padrão de clínica nova (funil de 5 etapas, pastas etc.).
- `anamnese_local_limpo(jsonb)`: valida o local da assinatura (invoker).
- `link_documentos_caminho_valido(nome)`: regra do upload anônimo no bucket `prontuario` (S3).

## 6. Gatilhos

| Gatilho | Onde | Efeito | Status |
|---|---|---|---|
| `tg_*_atualizado` → `tocar_atualizado_em` | 115 tabelas | atualiza `atualizado_em` | confirmado |
| `tg_*_auditoria` → `auditar` | 34 tabelas, incluindo agora `usuarios_clinicas`, `permissoes`, `clinicas`, `contas_pagar`, `produtos`, `movimentacoes_estoque` (S5), `ia_config` (S6) e `agente_ia` | grava antes/depois e colunas alteradas em `auditoria`; marca `exclusao_logica` quando `excluido_em` é preenchido | confirmado |
| `tg_usuarios_clinicas_proteger` | `usuarios_clinicas` | só dono indica dono ou gestor; clínica nunca fica sem dono | confirmado |
| `tg_perfis_proteger` | `perfis_usuario` | usuário não vira admin sozinho | confirmado |
| `tg_movimentacoes_estoque_saldo`, `tg_produtos_saldo`, `tg_produtos_entrada_inicial`, `tg_produtos_estoque_minimo`, `tg_procedimento_insumos_baixa` | estoque | saldo só por movimentação, sem negativo; aviso de estoque mínimo; baixa de insumos | confirmado |
| `tg_agendamentos_aviso` | `agendamentos` | aviso no sino | confirmado |
| `tg_leads_movimentacao` | `leads` | histórico em `movimentacoes_lead` | confirmado |
| `tg_mensagens_conversa` | `mensagens` | atualiza prévia e não lidas da conversa | confirmado |
| `tg_pacientes_telefone`, `tg_pacientes_prontuario` | `pacientes` | histórico de números; nº de prontuário | confirmado |
| `ia_config_auditoria_trigger` | `ia_config` | antigo e quebrado; a função virou "não faz nada" (S6) | confirmado |
| Gatilhos em `auth.users` (`novo_usuario`, `usuario_atualizado`, `auto_confirmar_email`) | Auth | cria perfil e liga convites; a auto-confirmação de e-mail foi **neutralizada** (S1) | confirmado na migration; gatilhos do schema `auth` não reconsultados |

## 7. Storage

| Bucket | Limite | Uso pelo front |
|---|---|---|
| `clinica` | 10 MB | logo, fotos de perfil |
| `prontuario` | 50 MB | documentos e imagens do paciente; upload anônimo pelo link `/u/<token>` (pasta `<clínica>/links/<token>/`, conferida por `link_documentos_caminho_valido`) |
| `mensagens` | 100 MB | anexos de conversa |
| `fiscal` | 1 MB | certificado fiscal |
| `conteudos` | 20 MB | Saluteflix/Cast (só admin envia) |
| `pacientes` | 10 MB | não usado pelo front |
| `comprovantes` | 20 MB | não usado pelo front |

Todos privados; leitura por link assinado. 22 regras no `storage.objects`. [confirmado] Caminho padrão: `<clinica_id>/<pasta>/<arquivo>`. [confirmado na Auditoria 02]

## 8. Realtime e Edge Functions

- Realtime publica: `agendamentos`, `anamnese_envios`, `canais_equipe`, `conversas`, `documentos_paciente`, `leads`, `mensagens`, `mensagens_equipe`, `notificacoes`, `participantes_canal`, `reacoes_mensagem`, `tarefa_checklist`, `tarefa_comentarios`, `tarefas`. O realtime respeita a RLS. [confirmado]
- Edge function `renata` v8: Groq + ElevenLabs; detalhes em `architecture.md` §4.1. O código publicado é igual a `supabase/functions/renata/`. [confirmado] Segredos esperados (só nomes): `GROQ_API_KEY`, `ELEVENLABS_API_KEY`, `RENATA_LIMITE_PADRAO` (opcionais; o Vault tem prioridade). Se estão definidos: [não confirmado].
- Não existe função `whatsapp` (o front mostra essa URL como webhook). [confirmado]
- `pg_net` instalado só para diagnóstico. A migration `20261009050000` tentou fechar o uso para `anon`/`authenticated`, mas **não teve efeito**: em 2026-10-09 `net.http_post` e `net.http_get` continuam executáveis por `anon` e `authenticated` (`has_function_privilege`). Ver auditoria 05, achado M4, e `docs/backlog.md`. [confirmado]

## 9. Migrations

**Convenção** (do `CLAUDE.md` e manual): toda mudança de schema vira arquivo `supabase/migrations/<AAAAMMDDHHMMSS>_<nome>.sql` neste repositório **antes** de aplicar. SQL idempotente quando possível (`if not exists`, checagem antes de reescrever função). Funções existentes são alteradas lendo a definição atual (`pg_get_functiondef`) e trocando só o trecho necessário, com erro se o trecho não for encontrado. [confirmado nos arquivos]

**Registradas no banco (57 quando este documento foi escrito; 59 em 2026-10-09 com `conteudo_certificacoes_e_nexus` e `feriados_nacionais`, ambas também no repositório)** [confirmado]:
- `20261003…`–`20261004…` — `salute02_01` a `salute02_17b` (23): estrutura base, RLS, Storage, Realtime, anamnese, suporte, primeiros passos
- `20261006183828_auto_confirm_email_novos_usuarios`
- `20261006220521`–`20261006224248` — `mock_01` a `mock_16`: **dados de demonstração** no banco
- `20261007170319_create_ia_config`
- `20261008232607_s2_renata_limite_mes`, `20261008233611_s1_neutraliza_auto_confirmacao_email`, `20261008233654_s3_s4_prontuario_link_e_equipe`, `20261008233712_s5_auditoria_equipe_clinica_financeiro_estoque`, `20261008233729_s6_ia_config_restrita_gestao`
- `20261008235542_gemini_provedor_google`, `20261008235554_gemini_salvar_segredo`, `20261009004320_groq_provedor`, `20261009004331_groq_salvar_segredo`, `20261009005157_pg_net_diagnostico`
- `20261009011213_funil_cinco_etapas`, `20261009011305_painel_funil_perdidos`, `20261009013134_anamnese_local_assinatura`, `20261009014414_pastas_padrao_clinicas_sem_pastas`, `20261009014745_agente_ia`, `20261009014755_agente_ia_ajuste_padrao`, `20261009015215_conteudo_certificacoes_e_nexus`

**No repositório (15)** [confirmado]: as 7 últimas acima com o **mesmo** número e nome, mais 8 arquivos com o mesmo conteúdo mas **número e nome diferentes** do banco:

| Arquivo no repositório | Registro no banco |
|---|---|
| `20261009020000_s1_neutraliza_auto_confirmacao_email` | `20261008233611_s1_…` |
| `20261009020100_s2_renata_limite_mes` | `20261008232607_s2_…` |
| `20261009020200_medios_s3_a_s6` (um arquivo) | `20261008233654_s3_s4_…`, `20261008233712_s5_…`, `20261008233729_s6_…` (três) |
| `20261009030000_gemini_provedor_google` / `…030100_gemini_salvar_segredo` | `20261008235542` / `20261008235554` |
| `20261009040000_groq_provedor` / `…040100_groq_salvar_segredo` | `20261009004320` / `20261009004331` |
| `20261009050000_pg_net_diagnostico` | `20261009005157` |

Consequências [inferido]: (1) pelos nomes dos arquivos, as correções S1–S6, Gemini, Groq e pg_net parecem **posteriores** ao funil e ao agente, quando no banco vieram antes; (2) as 41 migrations iniciais (`salute02_*`, `auto_confirm…`, `mock_*`, `create_ia_config`) **não existem** no repositório, então não dá para recriar o banco do zero a partir dele. Alinhar isso exige decisão do fundador (não foi alterado aqui).

## 10. Divergências em relação à Auditoria 02

- 116 tabelas (eram 115): entrou `agente_ia`. [confirmado]
- S1 (auto-confirmação de e-mail), S2 (limite e validação na Renata), S3 (pasta da clínica no upload anônimo), S4 (inserção direta em `usuarios_clinicas` só como convite pendente; gestor só pelo dono), S5 (auditoria em equipe, permissões, clínica, despesas, estoque) e S6 (`ia_config` restrita e gatilho neutralizado) estão **aplicados**. [confirmado nas migrations e no catálogo de gatilhos]
- A função `renata` passou da v2 (Claude) para a **v8 (Groq)**; não usa mais Anthropic no servidor. [confirmado]
- `pg_net` agora está instalado (a Auditoria 02 dizia que não). [confirmado]
- Continuam valendo: WhatsApp sem envio, tabelas sem tela, `ia_config`/`canais_conectados` sem uso, dados `mock_*` no banco de produção, proteção contra senha vazada desligada no Auth [não reconfirmado], `trocar_plano` sem cobrança.
