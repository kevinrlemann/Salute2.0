# Rodada 18: modal de agendamento com Início/Término e vínculo com conversa do WhatsApp
# Roda depois de todos os outros patches, modifica app_patched.jsx
import sys

s = open('app_patched.jsx', encoding='utf8').read()

def rep(old, new, n=1):
    global s
    c = s.count(old)
    if c != n:
        sys.exit('patch_r18: esperava %d ocorrência(s), achei %d:\n%s' % (n, c, old[:200]))
    s = s.replace(old, new)

# 1. Estado do nv + estados de conversas e busca (tudo junto, numa só substituição)
rep(
    "const [nv, setNv] = React.useState({ pac: '', pro: '', hora: '09:00', wpp: true });",
    "const [nv, setNv] = React.useState({ pac: '', pro: '', hora: '09:00', horaFim: '10:00', wpp: true, conversaId: null, conversaNome: '' });\n  const [conversas, setConversas] = React.useState([]);\n  const [buscaConv, setBuscaConv] = React.useState('');\n  React.useEffect(() => {\n    if (!novo || !SB_ON) return;\n    SB.from('conversas').select('id, nome_contato, telefone, foto_contato_path').eq('clinica_id', CLI()).is('excluido_em', null).order('nome_contato').limit(200)\n      .then(({ data }) => setConversas(data || []));\n  }, [novo]);"
)

# 2. Substituir o bloco inteiro do XDialog (onClose, footer e conteúdo)
OLD_DIALOG = """      <XDialog open={novo} onClose={() => setNovo(false)} icon="calendar-plus" title="Novo agendamento" description="O paciente recebe a confirmação automaticamente."
        footer={<><XButton variant="secondary" onClick={() => setNovo(false)}>Cancelar</XButton><XButton iconLeft="check" onClick={() => { if (SB_ON) { agendarRapido(nv, setToast).then((ok) => { if (ok) { setNovo(false); setNv({ pac: '', pro: '', hora: '09:00', wpp: true }); } }); return; } setNovo(false); setToast({ tone: 'success', title: 'Agendamento criado', description: 'Ronald Richards · 2 out · 09:00' }); }}>Agendar</XButton></>}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
          {SB_ON ? <>
          <XInput label="Paciente" iconLeft="search" value={nv.pac} onChange={(e) => setNv({ ...nv, pac: e.target.value })} list="sb-pacientes" placeholder="Nome do paciente" style={{ gridColumn: '1 / -1' }} />
          <datalist id="sb-pacientes">{PAC.slice(0, 500).map((x) => <option key={x.dbId || x.nome} value={x.nome} />)}</datalist>
          <XSelect label="Profissional" options={PROS.map((x) => x.n)} value={nv.pro || (PROS[0] || {}).n || ''} onChange={(e) => setNv({ ...nv, pro: e.target.value })} />
          <XInput label="Horário" type="time" value={nv.hora} onChange={(e) => setNv({ ...nv, hora: e.target.value })} />
          <div style={{ gridColumn: '1 / -1' }}><XSwitch checked={nv.wpp} onChange={(v) => setNv({ ...nv, wpp: v })} label="Enviar confirmação por WhatsApp" /></div>
          </> : <>
          <XInput label="Paciente" iconLeft="search" defaultValue="Ronald Richards" style={{ gridColumn: '1 / -1' }} />
          <XSelect label="Profissional" options={['Darlene Robertson', 'Michael Thompson', 'Max Worthington', 'Dr. McCoy']} />
          <XInput label="Horário" type="time" defaultValue="09:00" />
          <div style={{ gridColumn: '1 / -1' }}><XSwitch defaultChecked label="Enviar confirmação por WhatsApp" /></div>
          </>}
        </div>
      </XDialog>"""

NEW_DIALOG = """      <XDialog open={novo} onClose={() => { setNovo(false); setBuscaConv(''); }} icon="calendar-plus" title="Novo agendamento" description="O paciente recebe a confirmação automaticamente."
        footer={<><XButton variant="secondary" onClick={() => { setNovo(false); setBuscaConv(''); }}>Cancelar</XButton><XButton iconLeft="check" onClick={() => { if (SB_ON) { agendarRapido(nv, setToast).then((ok) => { if (ok) { setNovo(false); setNv({ pac: '', pro: '', hora: '09:00', horaFim: '10:00', wpp: true, conversaId: null, conversaNome: '' }); setBuscaConv(''); } }); return; } setNovo(false); setToast({ tone: 'success', title: 'Agendamento criado', description: 'Ronald Richards · 2 out · 09:00' }); }}>Agendar</XButton></>}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
          {SB_ON ? <>
          <XInput label="Paciente" iconLeft="search" value={nv.pac} onChange={(e) => setNv({ ...nv, pac: e.target.value })} list="sb-pacientes" placeholder="Nome do paciente" style={{ gridColumn: '1 / -1' }} />
          <datalist id="sb-pacientes">{PAC.slice(0, 500).map((x) => <option key={x.dbId || x.nome} value={x.nome} />)}</datalist>
          <XSelect label="Profissional" options={PROS.map((x) => x.n)} value={nv.pro || (PROS[0] || {}).n || ''} onChange={(e) => setNv({ ...nv, pro: e.target.value })} />
          <XInput label="Início" type="time" value={nv.hora} onChange={(e) => setNv({ ...nv, hora: e.target.value })} />
          <XInput label="Término" type="time" value={nv.horaFim} onChange={(e) => setNv({ ...nv, horaFim: e.target.value })} />
          <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-muted)' }}>Conversa do WhatsApp (opcional)</label>
            {nv.conversaId ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 12, border: '1.5px solid rgba(31,94,255,.25)', background: 'rgba(31,94,255,.04)' }}>
                <span style={{ flex: 1, fontSize: 14, color: 'var(--text-strong)', fontWeight: 500 }}>{nv.conversaNome}</span>
                <button type="button" onClick={() => setNv({ ...nv, conversaId: null, conversaNome: '' })} style={{ border: 0, background: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 2, display: 'flex' }}><SIcon name="x" size={16} /></button>
              </div>
            ) : (
              <div style={{ position: 'relative' }}>
                <XInput iconLeft="search" value={buscaConv} onChange={(e) => setBuscaConv(e.target.value)} placeholder="Buscar contato do WhatsApp\u2026" />
                {buscaConv.length >= 2 && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 200, background: '#fff', border: '1.5px solid rgba(31,94,255,.2)', borderRadius: 12, boxShadow: '0 8px 24px -8px rgba(23,73,170,.25)', maxHeight: 180, overflowY: 'auto', marginTop: 4 }}>
                    {conversas.filter((c) => (c.nome_contato || c.telefone || '').toLowerCase().includes(buscaConv.toLowerCase())).slice(0, 20).map((c) => (
                      <button key={c.id} type="button"
                        onClick={() => { setNv({ ...nv, conversaId: c.id, conversaNome: c.nome_contato || c.telefone }); setBuscaConv(''); }}
                        style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 14px', border: 0, background: 'none', cursor: 'pointer', textAlign: 'left', borderBottom: '1px solid rgba(214,226,242,.5)' }}>
                        <span style={{ width: 32, height: 32, borderRadius: '50%', background: '#EBF0FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><SIcon name="message-circle" size={16} style={{ color: '#1F5EFF' }} /></span>
                        <div>
                          <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: 'var(--text-strong)' }}>{c.nome_contato || 'Sem nome'}</p>
                          <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)' }}>{c.telefone}</p>
                        </div>
                      </button>
                    ))}
                    {conversas.filter((c) => (c.nome_contato || c.telefone || '').toLowerCase().includes(buscaConv.toLowerCase())).length === 0 && (
                      <p style={{ margin: 0, padding: '12px 14px', fontSize: 13, color: 'var(--text-muted)' }}>Nenhuma conversa encontrada</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          <div style={{ gridColumn: '1 / -1' }}><XSwitch checked={nv.wpp} onChange={(v) => setNv({ ...nv, wpp: v })} label="Enviar confirmação por WhatsApp" /></div>
          </> : <>
          <XInput label="Paciente" iconLeft="search" defaultValue="Ronald Richards" style={{ gridColumn: '1 / -1' }} />
          <XSelect label="Profissional" options={['Darlene Robertson', 'Michael Thompson', 'Max Worthington', 'Dr. McCoy']} />
          <XInput label="Início" type="time" defaultValue="09:00" />
          <XInput label="Término" type="time" defaultValue="10:00" />
          <div style={{ gridColumn: '1 / -1' }}><XSwitch defaultChecked label="Enviar confirmação por WhatsApp" /></div>
          </>}
        </div>
      </XDialog>"""

rep(OLD_DIALOG, NEW_DIALOG)

open('app_patched.jsx', 'w', encoding='utf8').write(s)
print('ok patch_r18')
