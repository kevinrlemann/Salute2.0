# Renata IA no modo conectado: dados do banco, chaves no servidor, conversa e ações gravadas.
# Gera renata_kb_sb.jsx, renata_acoes_sb.jsx e renata_ui_sb.jsx (o build usa estes).
import sys
def abrir(n): return open(n, encoding='utf8').read()
def rep(s, old, new, n=1):
    c = s.count(old)
    if c != n: sys.exit('esperava %d ocorrência(s), achei %d:\n%s' % (n, c, old[:200]))
    return s.replace(old, new)

# =====================================================================
# Base de conhecimento
# =====================================================================
k = abrir('renata_kb.jsx')
k = rep(k, "Está conversando com a Dra. Camila Rocha, administradora da clínica.", "Está conversando com ${rnQuem()}.")
k = rep(k, "4. Hoje é sexta-feira, 02/10/2026.", "4. Hoje é ${rnHojeTxt()}.")
k = rep(k, "hoje: 'sexta-feira, 02/10/2026', clinica: RN_CLINICA,", "hoje: rnHojeTxt(), clinica: RN_CLINICA,")
# painel: no modo conectado vem da função painel_resumo
k = rep(k, "painel: { ...RN_PAINEL, atendimentosPorDiaDaSemana: WEEK.map(", "painel: SB_ON ? rnPainelDB() : { ...RN_PAINEL, atendimentosPorDiaDaSemana: WEEK.map(")
k = rep(k, "leadsPorCanal: CHANNELS.map(", "leadsPorCanal: CANAIS0.map(")
k = rep(k, "    pacientes: PAC.map((p) => ({", "    pacientes: (SB_ON ? PAC.slice(0, 400) : PAC).map((p) => ({")
# pacientes recentes do Painel: os próximos atendimentos e os já feitos, por profissional (lista do painel_mes)
k = rep(k, "pacientesRecentes: (typeof PATIENTS !== 'undefined' ? PATIENTS.slice(0, 4) : [])", "pacientesRecentes: SB_ON ? rnPacientesRecentesDB() : (typeof PATIENTS !== 'undefined' ? PATIENTS.slice(0, 4) : [])")
k = rep(k, "categoriasReceita: ['Estética', 'Odontologia', 'Consulta', 'Venda de produto'], categoriasDespesa: DESP_CATS", "categoriasReceita: SB_ON ? catsFin(CAT.v, 'receita') : ['Estética', 'Odontologia', 'Consulta', 'Venda de produto'], categoriasDespesa: DESP_CATS")
k = rep(k, "saldoInicial: SALDO_INICIAL, entradas30dias: Math.round(e), saidas30dias: Math.round(s), saldoAtual: Math.round(SALDO_INICIAL + e - s)",
        "saldoInicial: SB_ON ? saldoPay(REC_STORE.v, DESP_STORE.v) : SALDO_INICIAL, entradas30dias: Math.round(e), saidas30dias: Math.round(s), saldoAtual: Math.round((SB_ON ? saldoPay(REC_STORE.v, DESP_STORE.v) : SALDO_INICIAL) + e - s)")
k = rep(k, "      saluteflix: FLIX0.map(", "      saluteflix: (SB_ON ? FLIX_STORE.v : FLIX0).map(")
k = rep(k, "      parcerias: PARC0.map(", "      parcerias: (SB_ON ? PARC_STORE.v : PARC0).map(")
k = rep(k, "minhaConta: { usuaria: 'Camila Rocha (Administradora)',", "minhaConta: SB_ON ? rnContaDB(plan) : { usuaria: 'Camila Rocha (Administradora)',")
# agenda do dia com os horários reais do banco
k = rep(k, "function rnAgenda(iso) {\n  const d = new Date(iso + 'T00:00:00');",
        "function rnAgenda(iso) {\n  if (SB_ON) return rnAgendaDB(iso);\n  const d = new Date(iso + 'T00:00:00');")
# ficha do paciente: no modo conectado nada de prontuário inventado
k = rep(k, "  const recs = seedRecs(p).map(", "  const recs = (SB_ON ? [] : seedRecs(p)).map(")
k = rep(k, "    historico: ['10/09/2026 cadastro criado pela Renata IA via WhatsApp',", "    historico: SB_ON ? [] : ['10/09/2026 cadastro criado pela Renata IA via WhatsApp',")
# a ferramenta de paciente lê o prontuário de verdade (e registra a leitura na auditoria)
k = rep(k, "execute: (i) => rnPaciente(String(i.nome)) },", "execute: (i) => (SB_ON ? rnPacienteDB(String(i.nome)) : rnPaciente(String(i.nome))) },")
# comando de voz: a Renata age no sistema (agenda, pacientes, prontuário, mensagens, financeiro e CRM)
k = rep(k, "6. Você é um agente do próprio sistema: quando pedirem para abrir uma tela, use a ferramenta abrir_tela e confirme em uma frase.",
        "6. Você é um agente do próprio sistema: quando pedirem para abrir uma tela ou aba, use abrir_tela; para a ficha, o prontuário ou a conversa de um paciente, use abrir_paciente. Confirme em uma frase.")
_i = k.index("8. Lançamentos:"); _j = k.index("\n", _i)
k = k[:_i] + "8. Ações no sistema: para lançar, receber, pagar, dar entrada ou baixa no estoque, dar baixa em conta pendente, agendar, remarcar, cancelar ou confirmar agendamento, cadastrar ou atualizar paciente, enviar anamnese ou mensagem de WhatsApp, registrar procedimento no prontuário, mover lead no CRM ou ligar e pausar a IA de um lead, use as ferramentas propor_*. Elas só preparam: o sistema mostra um cartão e grava quando a pessoa disser sim ou tocar em Confirmar. Nunca diga que fez antes disso. Depois de propor, faça UMA pergunta curta de confirmação, por exemplo \"Agendar a Mariana para terça, 07/10 às 10:00 com a Dra. Camila?\". Se faltar algo essencial, pergunte antes de propor. Quando a pessoa não disser a hora ou a ferramenta avisar conflito, consulte horarios_livres e ofereça até 3 opções. Se uma ferramenta devolver erro, explique em uma frase e peça o que falta. Com um mapeamento aberto, use ajustar_ponto_mapa para mudar quantidade, unidade, produto ou comentário de um ponto pelo número; isso não precisa de confirmação." + k[_j:]
# relógio da Renata sempre no horário de Brasília
k = rep(k, "const now = new Date(), hm = now.getHours() + now.getMinutes() / 60, a = rnAgenda(TODAY_ISO)", "const hm = BR.horaDec(), a = rnAgenda(TODAY_ISO)")
k = rep(k, "{ const h = new Date().getHours(); return `${h < 12 ? 'Bom dia'", "{ const h = BR.partes().h; return `${h < 12 ? 'Bom dia'")
k = rep(k, "'Boa noite'}, Camila! Pode me perguntar", "'Boa noite'}, ${SB_ON && typeof rnPrimeiroNome === 'function' ? rnPrimeiroNome() : 'Camila'}! Pode me perguntar")
open('renata_kb_sb.jsx', 'w', encoding='utf8').write(k)

# =====================================================================
# Ações (lançamentos e estoque)
# =====================================================================
a = abrir('renata_acoes.jsx')
a = rep(a, "function rnApply(a) {\n  if (a.kind === 'est') {", "function rnApply(a) {\n  if (SB_ON) return rnApplyDB(a);\n  if (a.kind === 'est') {")
a = rep(a, "function rnResumo(a) {\n", "function rnResumo(a) {\n  if (a.kind === 'cmd') return a.resumo;\n")
a = rep(a, "function rnApply(a) {\n  if (SB_ON) return rnApplyDB(a);", "function rnApply(a) {\n  if (a.kind === 'cmd') return rnExecCmd(a);\n  if (SB_ON) return rnApplyDB(a);")
open('renata_acoes_sb.jsx', 'w', encoding='utf8').write(a)

# =====================================================================
# Interface e conexões
# =====================================================================
u = abrir('renata_ui.jsx')
u = rep(u, "const RN_AI = makeStore(lsGet('salute-kit:renata-ia', { key: '' }));", "const RN_AI = makeStore(SB_ON ? { key: '' } : lsGet('salute-kit:renata-ia', { key: '' }));")
u = rep(u, "const RN_VOICE = makeStore((() => { const s = lsGet('salute-kit:renata-voz', {}) || {};", "const RN_VOICE = makeStore((() => { const s = SB_ON ? {} : lsGet('salute-kit:renata-voz', {}) || {};")
# voz e transcrição passam pelo servidor
u = rep(u, "const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/", "const r = SB_ON ? await rnFn({ acao: 'voz', texto: t, voice_id: cfg.voiceId, modelo: cfg.model || 'eleven_flash_v2_5' }) : await fetch(`https://api.elevenlabs.io/v1/text-to-speech/")
u = rep(u, "        const r = await fetch('https://api.elevenlabs.io/v1/speech-to-text', { method: 'POST', headers: { 'xi-api-key': RN_VOICE.v.key }, body: fd });",
        "        if (SB_ON) { fd.append('acao', 'transcrever'); fd.append('clinica_id', CLI()); fd.append('segundos', String(Math.round((Date.now() - t0) / 1000))); }\n        const r = SB_ON ? await rnFn(fd) : await fetch('https://api.elevenlabs.io/v1/speech-to-text', { method: 'POST', headers: { 'xi-api-key': RN_VOICE.v.key }, body: fd });")
# conversa com o Claude passa pela função do servidor
u = rep(u, "    try { res = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', signal, headers: rnApiHeaders(key), body: JSON.stringify({ model: models[mi], max_tokens: voice ? 450 : 1400, system, tools, messages: msgs, stream: true }) }); }",
        "    try { res = SB_ON ? await rnFn({ acao: 'chat', primeira: round === 0, payload: { model: models[mi], max_tokens: voice ? 450 : 1400, system, tools, messages: msgs, stream: true } }, signal) : await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', signal, headers: rnApiHeaders(key), body: JSON.stringify({ model: models[mi], max_tokens: voice ? 450 : 1400, system, tools, messages: msgs, stream: true }) }); }")
# ferramentas podem consultar o banco (respostas assíncronas)
old_tools = "    msgs.push({ role: 'user', content: content.filter((b) => b.type === 'tool_use').map((b) => { const t = RENATA_TOOLS.find((x) => x.name === b.name); let out; try { out = t ? t.execute(b.input) : { erro: 'ferramenta desconhecida' }; } catch (e) { out = { erro: String(e && e.message || e) }; } return { type: 'tool_result', tool_use_id: b.id, content: JSON.stringify(out).slice(0, 24000) }; }) });"
new_tools = "    const outs = await Promise.all(content.filter((b) => b.type === 'tool_use').map(async (b) => { const t = RENATA_TOOLS.find((x) => x.name === b.name); let out; try { out = t ? await t.execute(b.input) : { erro: 'ferramenta desconhecida' }; } catch (e) { out = { erro: String(e && e.message || e) }; } return { type: 'tool_result', tool_use_id: b.id, content: JSON.stringify(out).slice(0, 24000) }; }));\n    msgs.push({ role: 'user', content: outs });"
u = rep(u, old_tools, new_tools)
u = rep(u, "const rnApiWhy = (st) => st === 401 ?", "const rnApiWhy = (st) => st === 412 ? 'a chave da IA ainda não foi configurada' : st === 401 ?")
u = rep(u, "async function rnTestApi(key) {\n", "async function rnTestApi(key) {\n  if (SB_ON) return rnTestarServidor(key);\n")
# antes de responder, garante os dados da clínica carregados
u = rep(u, "async function rnAnswerCore(history, { voice, onText, signal, onTool }) {\n  const sample = await rnGetSample();",
        "async function rnAnswerCore(history, { voice, onText, signal, onTool }) {\n  if (SB_ON) await rnPrepararDados();\n  const sample = await rnGetSample();")
# sem IA configurada no modo conectado: diz isso com clareza (sem respostas de demonstração)
u = rep(u, "    if (!RN_AI.v.key) return demo();", "    if (!RN_AI.v.key) return SB_ON ? rnSemIA(question, voice, onText, signal) : demo();")
u = rep(u, "return demo(`A conexão com a IA falhou", "return SB_ON ? rnSemIA(question, voice, onText, signal, e.why) : demo(`A conexão com a IA falhou")
# recusa de lançamento também fica registrada
u = rep(u, "  if (a && rnIsNo(question)) { rnSetPending(null);", "  if (a && rnIsNo(question)) { if (SB_ON) rnRegistrarAcao(a, 'cancelado').catch(() => {}); rnSetPending(null);")
# conexões: chaves vão para o cofre
u = rep(u, "  const save = () => { const fv = { ...f, voiceId: f.voiceId || RN_VOZ_OFICIAL }; setCfg(fv); lsSet('salute-kit:renata-voz', fv);",
        "  const save = () => { if (SB_ON) { rnSalvarConexoes(k, f).then(onClose, () => {}); return; } const fv = { ...f, voiceId: f.voiceId || RN_VOZ_OFICIAL }; setCfg(fv); lsSet('salute-kit:renata-voz', fv);")
u = rep(u, "<span style={note}>Fica salva só neste aparelho, para teste. Na versão final a chave fica no servidor.</span>",
        "<span style={note}>{SB_ON ? 'Fica guardada no cofre do servidor. Depois de salva, ninguém vê a chave inteira.' : 'Fica salva só neste aparelho, para teste. Na versão final a chave fica no servidor.'}</span>")
u = rep(u, "await rnSpeak('Oi, Camila! Eu sou a Renata. Pode me perguntar qualquer coisa da clínica.');", "await rnSpeak('Oi, ' + (SB_ON ? rnPrimeiroNome() : 'Camila') + '! Eu sou a Renata. Pode me perguntar qualquer coisa da clínica.');")
u = rep(u, ">Oi, Camila. O que você quer saber da clínica?</h2>", ">Oi, {SB_ON ? rnPrimeiroNome() : 'Camila'}. O que você quer saber da clínica?</h2>")
# cada troca da conversa fica guardada (só o próprio usuário vê)
u = rep(u, "      const r = await rnAnswer(hist, { voice: isVoice, signal: ctl.signal, onText: (t) => { setBusy(null); upd(t); }, onTool: (lbl) => setBusy(lbl) });\n",
        "      const r = await rnAnswer(hist, { voice: isVoice, signal: ctl.signal, onText: (t) => { setBusy(null); upd(t); }, onTool: (lbl) => setBusy(lbl) });\n      if (SB_ON) rnRegistrar(q, r, isVoice);\n")
u = rep(u, "rnResetCtx(); rnSetPending(null); setMsgs([]); })}", "rnResetCtx(); rnSetPending(null); setMsgs([]); if (SB_ON) rnNovaConversa(); })}")
# ferramentas usadas, interrupção, avaliação e gerar de novo também ficam registrados
u = rep(u, "    const upd = (t) => setMsgs((l) => l.map((m) => m.id === id ? { ...m, content: t, pending: false } : m));\n", "    const upd = (t) => setMsgs((l) => l.map((m) => m.id === id ? { ...m, content: t, pending: false } : m));\n    const usadas = [];\n")
u = rep(u, "onTool: (lbl) => setBusy(lbl) });\n      if (SB_ON) rnRegistrar(q, r, isVoice);", "onTool: (lbl) => { setBusy(lbl); usadas.push(lbl); } });\n      if (SB_ON) rnRegistrar(q, { ...r, ferramentas: usadas }, isVoice, id);")
u = rep(u, "      setMsgs((l) => l.map((m) => m.id === id ? { ...m, pending: false, content: (e && e.text) || m.content || '', stopped: true } : m));\n", "      setMsgs((l) => l.map((m) => m.id === id ? { ...m, pending: false, content: (e && e.text) || m.content || '', stopped: true } : m));\n      if (SB_ON) rnRegistrar(q, { text: (e && e.text) || '', mode: 'interrompida', ferramentas: usadas }, isVoice, id, true);\n")
u = rep(u, "onClick={() => setMsgs((l) => l.map((x) => x.id === m.id ? { ...x, fb: x.fb === 'up' ? null : 'up' } : x))}", "onClick={() => { setMsgs((l) => l.map((x) => x.id === m.id ? { ...x, fb: x.fb === 'up' ? null : 'up' } : x)); if (SB_ON) rnFeedback(m, m.fb === 'up' ? null : 'boa'); }}")
u = rep(u, "onClick={() => setMsgs((l) => l.map((x) => x.id === m.id ? { ...x, fb: x.fb === 'down' ? null : 'down' } : x))}", "onClick={() => { setMsgs((l) => l.map((x) => x.id === m.id ? { ...x, fb: x.fb === 'down' ? null : 'down' } : x)); if (SB_ON) rnFeedback(m, m.fb === 'down' ? null : 'ruim'); }}")
u = rep(u, "  const regen = (id) => { if (runRef.current) return;", "  const regen = (id) => { if (runRef.current) return; if (SB_ON) rnSubstituida(msgs.find((m) => m.id === id));")
# ações do comando de voz: cartão próprio, execução assíncrona e falha visível
u = rep(u, "    const t = rnApply(a); rnSetPending(null);", "    rnSetPending(null); const t = await rnApply(a);")
u = rep(u, "opts.onText(t); return { text: t, mode: 'acao', resolved: { id: a.id, state: 'ok' } };", "opts.onText(t); return { text: t, mode: 'acao', resolved: { id: a.id, state: a.falhou ? 'erro' : 'ok' } };")
u = rep(u, "const t = 'Tudo bem, não lancei nada. Se quiser, me fala o lançamento do jeito certo.';", "const t = a.kind === 'cmd' ? 'Tudo bem, deixei como estava. Se quiser, me fala de novo do jeito certo.' : 'Tudo bem, não lancei nada. Se quiser, me fala o lançamento do jeito certo.';")
u = rep(u, "  const rows = a.items.map((x) => a.kind === 'est'", "  const rows = a.kind === 'cmd' ? a.rows : a.items.map((x) => a.kind === 'est'")
u = rep(u, "{a.kind === 'est' ? 'MOVIMENTAÇÃO DE ESTOQUE' : 'LANÇAMENTO FINANCEIRO'}", "{a.kind === 'cmd' ? a.titulo : a.kind === 'est' ? 'MOVIMENTAÇÃO DE ESTOQUE' : 'LANÇAMENTO FINANCEIRO'}")
u = rep(u, "state === 'ok' ? chip('circle-check', 'Lançado', '#1E9E57')", "state === 'ok' ? chip('circle-check', a.kind === 'cmd' ? 'Feito' : 'Lançado', '#1E9E57') : state === 'erro' ? chip('circle-x', 'Não foi feito', '#E5484D')")
u = rep(u, "onYes={() => ask('Sim, pode lançar')}", "onYes={() => ask(m.pend.kind === 'cmd' ? 'Sim, pode fazer' : 'Sim, pode lançar')}")
open('renata_ui_sb.jsx', 'w', encoding='utf8').write(u)
print('ok renata')
