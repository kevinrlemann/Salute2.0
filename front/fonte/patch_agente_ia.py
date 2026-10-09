# Adiciona aba "Agente IA" em Configuracoes.
# Roda depois de patch_config.py, modifica pacientes_patched.jsx.
import sys

P = 'pacientes_patched.jsx'
s = open(P, encoding='utf8').read()

def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit('patch_agente_ia: esperava %d ocorrencia(s), achei %d:\n%s' % (n, c, old[:200]))
    s = s.replace(old, new)

# ─────────────────────────────────────────────────
# 1. Store e constantes do Agente IA — inserir ANTES do WA_STORE
# ─────────────────────────────────────────────────
OLD_WA = "const WA_STORE = makeStore({ status: 'on', modo: 'naoOficial', numero: '(19) 99800-4100', desde: '12/08/2026', oficial: { phone: '', phoneId: '', waba: '', token: '' } });"

rep(
    OLD_WA,
    """const IA_STORE = makeStore('ia_config_store', {
  ativo: false,
  modo: 'atende',
  webhookUrl: '',
  promptBase: '',
  nomeBotPrefix: 'Assistente',
});

const IA_MODOS = [
  ['atende', 'Só atender', 'message-circle', 'A IA responde perguntas e dúvidas. Não agenda nada.'],
  ['atende_agenda', 'Atender e agendar', 'calendar-plus', 'A IA responde e cria agendamentos automaticamente.'],
  ['atende_agenda_followup', 'Atender, agendar e fazer follow-up', 'bell-ring', 'A IA responde, agenda e envia lembrete antes da consulta para garantir o comparecimento.'],
];

""" + OLD_WA
)

# ─────────────────────────────────────────────────
# 2. Componente AgenteIaTab
# ─────────────────────────────────────────────────
rep(
    "function CanaisTab({ mobile }) {",
    """function AgenteIaTab({ mobile }) {
  const [ia, setIa] = useStore(IA_STORE);
  const [saved, setSaved] = React.useState(false);
  const [testando, setTestando] = React.useState(false);
  const [testeOk, setTesteOk] = React.useState(null);

  const upd = (k, v) => { setIa({ ...ia, [k]: v }); setSaved(false); setTesteOk(null); };

  const salvar = () => {
    if (SB_ON) {
      const { supabase, clinica_id } = window;
      supabase
        .from('ia_config')
        .upsert({
          clinica_id,
          ativo: ia.ativo,
          modo: ia.modo,
          webhook_url: ia.webhookUrl,
          prompt_base: ia.promptBase,
          nome_bot_prefix: ia.nomeBotPrefix,
        }, { onConflict: 'clinica_id' })
        .then(() => setSaved(true))
        .catch(() => {});
    } else {
      setSaved(true);
    }
  };

  const testarWebhook = () => {
    if (!ia.webhookUrl) return;
    setTestando(true);
    setTesteOk(null);
    fetch(ia.webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tipo: 'ping', clinica_id: SB_ON ? window.clinica_id : 'teste', ts: Date.now() }),
    })
      .then((r) => { setTesteOk(r.ok); })
      .catch(() => { setTesteOk(false); })
      .finally(() => setTestando(false));
  };

  const card = { ...glass, padding: mobile ? 16 : 24, display: 'flex', flexDirection: 'column', gap: 16 };
  const iconBox = (bg, ic) => (
    <span style={{ width: 48, height: 48, borderRadius: 16, background: bg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <OIcon name={ic} size={22} />
    </span>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: mobile ? 14 : 22 }}>

      <section style={card}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
          {iconBox('linear-gradient(135deg,#1F5EFF,#7B4BC4)', 'bot')}
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ margin: 0, fontSize: 18, fontWeight: 600, color: 'var(--text-strong)' }}>Agente IA</p>
            <p style={{ margin: '2px 0 0', fontSize: 13, color: 'var(--text-muted)' }}>
              {ia.ativo
                ? 'Agente ativo — respondendo no modo ' + ((IA_MODOS.find((m) => m[0] === ia.modo) || IA_MODOS[0])[1]).toLowerCase() + '.'
                : 'Agente desativado. Ative para começar a usar.'}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {ia.ativo ? <Badge2 c="#1F5EFF">Ativo</Badge2> : <Badge2 c="#999">Inativo</Badge2>}
            <Toggle value={ia.ativo} onChange={(v) => upd('ativo', v)} />
          </div>
        </div>
      </section>

      <section style={card}>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: 'var(--text-strong)' }}>Modo de operação</p>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--text-muted)' }}>Define o que o agente pode fazer nesta clínica.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {IA_MODOS.map(([k, l, ic, desc]) => {
            const sel = ia.modo === k;
            return (
              <button key={k} type="button" onClick={() => upd('modo', k)}
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderRadius: 18,
                  cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
                  border: sel ? '2px solid #1F5EFF' : '2px solid rgba(255,255,255,.95)',
                  background: sel ? 'rgba(31,94,255,.06)' : 'rgba(255,255,255,.6)',
                  transition: 'border-color .15s,background .15s' }}>
                <span style={{ width: 18, height: 18, borderRadius: '50%',
                  border: sel ? '5px solid #1F5EFF' : '2px solid rgba(150,175,210,.8)',
                  boxSizing: 'border-box', background: '#fff', flexShrink: 0 }} />
                <OIcon name={ic} size={20} color={sel ? '#1F5EFF' : 'var(--text-muted)'} />
                <div style={{ flex: 1 }}>
                  <span style={{ display: 'block', fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}>{l}</span>
                  <span style={{ display: 'block', fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{desc}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section style={card}>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: 'var(--text-strong)' }}>Conexão com o agente externo</p>
        <p style={{ margin: '0 0 4px', fontSize: 13, color: 'var(--text-muted)' }}>
          Informe a URL do webhook do N8N (ou outro serviço). O sistema envia cada mensagem recebida para essa URL e aguarda a resposta do agente.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: 1, minWidth: 260 }}>
            <OInput
              label="URL do webhook"
              iconLeft="link"
              placeholder="https://seu-n8n.com/webhook/salute"
              value={ia.webhookUrl}
              onChange={(e) => upd('webhookUrl', e.target.value)}
            />
          </div>
          <OBtn
            size="sm"
            variant="secondary"
            iconLeft={testando ? 'loader' : testeOk === true ? 'check' : testeOk === false ? 'x' : 'send'}
            loading={testando}
            disabled={!ia.webhookUrl}
            onClick={testarWebhook}
            style={{ height: 44, marginBottom: 0 }}
          >
            {testeOk === true ? 'Webhook OK' : testeOk === false ? 'Falhou' : 'Testar'}
          </OBtn>
        </div>
        {testeOk === false && (
          <p style={{ margin: 0, fontSize: 13, color: '#E53935' }}>
            O webhook não respondeu. Verifique se o N8N está online e se a URL está correta.
          </p>
        )}
        <div style={{ padding: '10px 16px', borderRadius: 14, background: 'rgba(31,94,255,.05)', border: '1.5px solid rgba(31,94,255,.12)', fontSize: 13, color: 'var(--text-muted)', lineHeight: '1.6' }}>
          <b style={{ color: 'var(--text-body)' }}>Como funciona:</b>{' '}quando uma mensagem chega no WhatsApp ou Instagram, o sistema manda um POST com{' '}
          <code style={{ background: 'rgba(0,0,0,.06)', borderRadius: 4, padding: '1px 5px' }}>clinica_id</code>,{' '}
          <code style={{ background: 'rgba(0,0,0,.06)', borderRadius: 4, padding: '1px 5px' }}>modo</code>,{' '}
          <code style={{ background: 'rgba(0,0,0,.06)', borderRadius: 4, padding: '1px 5px' }}>mensagem</code>{' '}e{' '}
          <code style={{ background: 'rgba(0,0,0,.06)', borderRadius: 4, padding: '1px 5px' }}>historico</code>{' '}para essa URL. O N8N processa e devolve JSON com{' '}
          <code style={{ background: 'rgba(0,0,0,.06)', borderRadius: 4, padding: '1px 5px' }}>resposta</code>.
        </div>
      </section>

      <section style={card}>
        <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: 'var(--text-strong)' }}>Personalidade e instruções do agente</p>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--text-muted)' }}>
          Escreva como o agente deve se apresentar, o tom de voz, o que pode e o que não pode falar, e informações da clínica que ele deve conhecer.
        </p>
        <div>
          <span style={{ ...lbl, display: 'block', marginBottom: 6 }}>Nome do agente</span>
          <OInput
            placeholder="Ex: Renata, Sofia, Assistente..."
            value={ia.nomeBotPrefix}
            onChange={(e) => upd('nomeBotPrefix', e.target.value)}
          />
        </div>
        <div>
          <span style={{ ...lbl, display: 'block', marginBottom: 6 }}>Prompt base</span>
          <textarea
            value={ia.promptBase}
            onChange={(e) => upd('promptBase', e.target.value)}
            placeholder="Descreva aqui como o agente deve agir, o tom de voz e as informações que ele deve conhecer sobre a clínica."
            rows={9}
            style={{ width: '100%', padding: '12px 14px', borderRadius: 16,
              border: '1.5px solid rgba(214,226,242,.95)', background: 'rgba(255,255,255,.7)',
              fontFamily: 'inherit', fontSize: 13, color: 'var(--text-body)',
              resize: 'vertical', outline: 'none', lineHeight: 1.6, boxSizing: 'border-box' }}
          />
          <p style={{ margin: '6px 0 0', fontSize: 12, color: 'var(--text-muted)' }}>
            {(ia.promptBase || '').length} caracteres. Prompts objetivos funcionam melhor.
          </p>
        </div>
        <SavedBar saved={saved} onSave={salvar} />
      </section>

    </div>
  );
}

function CanaisTab({ mobile }) {"""
)

# ─────────────────────────────────────────────────
# 3. Renderizar AgenteIaTab no ConfigScreen
# ─────────────────────────────────────────────────
rep(
    "      {tab === 'canais' ? <CanaisTab mobile={mobile} /> : null}",
    "      {tab === 'canais' ? <CanaisTab mobile={mobile} /> : null}\n      {tab === 'agenteia' ? <AgenteIaTab mobile={mobile} /> : null}"
)

open(P, 'w', encoding='utf8').write(s)
print('ok patch_agente_ia')
