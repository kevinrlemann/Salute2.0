/* =====================================================================
   ANAMNESE
   Modelos em blocos, envio pelo prontuário (link, preencher junto, preencher
   e enviar para assinar), página do paciente com assinatura, respostas por
   bloco e alertas na ficha. Também a página pública de envio de documentos.
   ===================================================================== */
const TIPOS_RESP = [
  { k: 'texto', l: 'Texto curto', i: 'type' },
  { k: 'texto_longo', l: 'Texto longo', i: 'align-left' },
  { k: 'sim_nao', l: 'Sim ou não', i: 'toggle-right' },
  { k: 'escolha_unica', l: 'Escolha única', i: 'circle-dot' },
  { k: 'multipla_escolha', l: 'Múltipla escolha', i: 'list-checks' },
  { k: 'data', l: 'Data', i: 'calendar' },
  { k: 'numero', l: 'Número', i: 'hash' },
  { k: 'informativo', l: 'Texto informativo', i: 'info' },
];
const tipoResp = (k) => TIPOS_RESP.find((t) => t.k === k) || TIPOS_RESP[0];
const temOpcoes = (k) => k === 'escolha_unica' || k === 'multipla_escolha';
const ICONES_BLOCO = ['clipboard-list', 'stethoscope', 'heart-pulse', 'sparkles', 'activity', 'smile', 'target', 'pill', 'info', 'message-square-text'];
const DECLARACAO_PADRAO = 'Declaro que as informações acima são verdadeiras e completas e entendo que elas serão usadas para planejar o meu atendimento com segurança.';
const ACEITE_ASSINATURA = 'Li e confirmo que as informações são verdadeiras. Concordo em assinar este documento eletronicamente.';
const idLocal = (p) => p + Math.random().toString(36).slice(2, 10);
const qsDe = (m) => (m.blocos || []).reduce((a, b) => a.concat(b.qs || []), []);
const comQs = (m) => ({ ...m, qs: qsDe(m) });
const novaPergunta = (k) => ({ id: idLocal('q'), t: '', k: k || 'texto', desc: '', obrig: false, opcoes: temOpcoes(k) ? ['', ''] : [], outro: false, det: false, rotDet: '', alerta: false, rotAlerta: '' });
const novoBloco = (titulo) => ({ id: idLocal('b'), titulo: titulo || '', icone: 'clipboard-list', qs: [novaPergunta('texto')] });
const respondivel = (q) => q.k !== 'informativo';

/* ---------- Modelos prontos (os mesmos que o banco cria para toda clínica nova) ---------- */
const MODELOS_PRONTOS = [
  { nome: 'Anamnese estética', uso: 'Estética', padrao: true, desc: 'Avaliação completa antes de procedimentos estéticos faciais e corporais.', blocos: [
    ['Motivo da consulta', 'stethoscope', [
      { t: 'Qual é o principal motivo da sua consulta?', k: 'texto_longo', ob: 1, d: 'Conte com suas palavras o que deseja melhorar.' },
      { t: 'Há quanto tempo isso incomoda você?', k: 'escolha_unica', o: ['Menos de 1 mês', 'De 1 a 6 meses', 'De 6 meses a 1 ano', 'Mais de 1 ano'] }]],
    ['Histórico de saúde', 'heart-pulse', [
      { t: 'Marque as condições que você tem ou já teve', k: 'multipla_escolha', o: ['Diabetes', 'Hipertensão', 'Doença cardíaca', 'Asma', 'Doença autoimune', 'Problema de coagulação', 'Herpes recorrente', 'Epilepsia', 'Nenhuma'], outro: 1 },
      { t: 'Faz algum tratamento médico no momento?', k: 'sim_nao', det: 'Qual tratamento?' },
      { t: 'Quais medicamentos você usa regularmente?', k: 'texto_longo', d: 'Inclua anticoncepcional, vitaminas e suplementos.' },
      { t: 'Usa anticoagulante ou anti-inflamatório com frequência?', k: 'sim_nao', det: 'Qual?', al: 'Anticoagulante' },
      { t: 'Tem alergia a algum medicamento, cosmético ou alimento?', k: 'sim_nao', det: 'A quê?', al: 'Alergia', ob: 1 },
      { t: 'Já fez alguma cirurgia?', k: 'sim_nao', det: 'Qual e quando?' }]],
    ['Histórico estético', 'sparkles', [
      { t: 'Já fez procedimentos estéticos antes?', k: 'sim_nao', det: 'Quais e quando?' },
      { t: 'Teve alguma reação ou complicação em procedimento anterior?', k: 'sim_nao', det: 'O que aconteceu?', al: 'Reação em procedimento anterior' },
      { t: 'Usa ácidos, retinoides ou isotretinoína?', k: 'sim_nao', det: 'Qual produto?' },
      { t: 'Tem queloide ou cicatrização difícil?', k: 'sim_nao', al: 'Queloide' }]],
    ['Hábitos de vida', 'activity', [
      { t: 'Você fuma?', k: 'sim_nao' },
      { t: 'Consome bebida alcoólica?', k: 'escolha_unica', o: ['Não', 'Socialmente', 'Com frequência'] },
      { t: 'Pratica atividade física?', k: 'sim_nao', det: 'Qual e quantas vezes por semana?' },
      { t: 'Está grávida ou amamentando?', k: 'sim_nao', al: 'Gestante ou lactante', ob: 1 },
      { t: 'Como é sua exposição ao sol?', k: 'escolha_unica', o: ['Pouca', 'Moderada', 'Muita'] }]],
    ['Observações', 'message-square-text', [
      { t: 'Tem algo mais que devemos saber antes do seu atendimento?', k: 'texto_longo' }]]] },
  { nome: 'Toxina botulínica', uso: 'Estética', desc: 'Antes da aplicação de toxina botulínica.', blocos: [
    ['Antes da aplicação', 'info', [
      { t: 'Suas respostas ajudam o profissional a planejar a aplicação com segurança. Leva cerca de 2 minutos.', k: 'informativo' }]],
    ['Saúde', 'heart-pulse', [
      { t: 'Já aplicou toxina botulínica antes?', k: 'sim_nao', det: 'Quando foi a última aplicação?' },
      { t: 'Tem alguma doença neuromuscular, como miastenia gravis?', k: 'sim_nao', al: 'Doença neuromuscular', ob: 1 },
      { t: 'Usa antibiótico ou relaxante muscular no momento?', k: 'sim_nao', det: 'Qual?', al: 'Interação medicamentosa' },
      { t: 'Tem alergia a algum medicamento?', k: 'sim_nao', det: 'A qual?', al: 'Alergia', ob: 1 },
      { t: 'Está grávida ou amamentando?', k: 'sim_nao', al: 'Gestante ou lactante', ob: 1 }]],
    ['Objetivo', 'target', [
      { t: 'Quais áreas deseja tratar?', k: 'multipla_escolha', o: ['Testa', 'Entre as sobrancelhas', 'Pés de galinha', 'Sorriso gengival', 'Bruxismo', 'Suor excessivo'], outro: 1, ob: 1 },
      { t: 'Tem algum evento importante nos próximos 15 dias?', k: 'sim_nao', det: 'Qual e em que data?' }]]] },
  { nome: 'Odontológica geral', uso: 'Odontologia', desc: 'Primeira consulta e retornos odontológicos.', blocos: [
    ['Motivo da consulta', 'stethoscope', [
      { t: 'Qual é o motivo da sua consulta?', k: 'texto_longo', ob: 1 },
      { t: 'Quando foi sua última consulta com dentista?', k: 'escolha_unica', o: ['Menos de 6 meses', 'Entre 6 meses e 1 ano', 'Mais de 1 ano', 'Não lembro'] }]],
    ['Saúde geral', 'heart-pulse', [
      { t: 'Marque as condições que você tem ou já teve', k: 'multipla_escolha', o: ['Diabetes', 'Hipertensão', 'Doença cardíaca', 'Problema de coagulação', 'Asma', 'Nenhuma'], outro: 1 },
      { t: 'Usa anticoagulante?', k: 'sim_nao', det: 'Qual?', al: 'Anticoagulante' },
      { t: 'Tem alergia a anestésico, látex ou medicamento?', k: 'sim_nao', det: 'A quê?', al: 'Alergia', ob: 1 },
      { t: 'Está grávida?', k: 'sim_nao', al: 'Gestante' },
      { t: 'Quais medicamentos você usa regularmente?', k: 'texto_longo' }]],
    ['Saúde bucal', 'smile', [
      { t: 'Sente sensibilidade nos dentes?', k: 'sim_nao' },
      { t: 'Sua gengiva sangra?', k: 'escolha_unica', o: ['Nunca', 'Às vezes', 'Sempre que escovo'] },
      { t: 'Range ou aperta os dentes?', k: 'sim_nao' },
      { t: 'Quantas vezes por dia escova os dentes?', k: 'numero' },
      { t: 'Usa fio dental?', k: 'escolha_unica', o: ['Todo dia', 'Às vezes', 'Não uso'] }]],
    ['Hábitos', 'activity', [
      { t: 'Você fuma?', k: 'sim_nao' },
      { t: 'Consome doces ou refrigerante com frequência?', k: 'sim_nao' }]]] },
];
const modeloDePronto = (m, i) => comQs({ id: 'mp' + i, nome: m.nome, uso: m.uso, desc: m.desc, padrao: !!m.padrao, exigeAss: true, declaracao: DECLARACAO_PADRAO, usos: [31, 18, 12][i] || 0,
  blocos: m.blocos.map(([titulo, icone, qs], bi) => ({ id: 'mp' + i + 'b' + bi, titulo, icone, qs: qs.map((q, qi) => ({ id: 'mp' + i + 'b' + bi + 'q' + qi, t: q.t, k: q.k, desc: q.d || '', obrig: !!q.ob, opcoes: q.o || [], outro: !!q.outro, det: !!q.det, rotDet: q.det || '', alerta: !!q.al, rotAlerta: q.al || '' })) })) });
const ANAM_DEMO = MODELOS_PRONTOS.map(modeloDePronto);
if (!SB_ON) ANAM_STORE.v = ANAM_DEMO;

/* ---------- Banco ---------- */
function modeloTela(m, usos) {
  const qsRows = (m.perguntas || []).filter((q) => !q.excluido_em).sort((a, b) => a.ordem - b.ordem);
  const bls = (m.blocos || []).filter((b) => !b.excluido_em).sort((a, b) => a.ordem - b.ordem);
  const pq = (q) => ({ id: q.id, dbId: q.id, t: q.texto, k: q.tipo_resposta || 'texto', desc: q.descricao || '', obrig: !!q.obrigatoria, opcoes: Array.isArray(q.opcoes) ? q.opcoes : [], outro: !!q.permite_outro, det: !!q.pedir_detalhe, rotDet: q.rotulo_detalhe || '', alerta: !!q.alerta, rotAlerta: q.rotulo_alerta || '' });
  const blocos = bls.map((b) => ({ id: b.id, dbId: b.id, titulo: b.titulo, icone: b.icone || 'clipboard-list', qs: qsRows.filter((q) => q.bloco_id === b.id).map(pq) }));
  const soltas = qsRows.filter((q) => !q.bloco_id || !bls.some((b) => b.id === q.bloco_id)).map(pq);
  if (soltas.length) blocos.unshift({ id: idLocal('b'), titulo: 'Perguntas', icone: 'clipboard-list', qs: soltas });
  return comQs({ id: m.id, dbId: m.id, nome: m.nome, uso: el('area', m.area, 'Geral'), desc: m.descricao || '', padrao: !!m.padrao, exigeAss: m.exige_assinatura !== false, declaracao: m.texto_declaracao || DECLARACAO_PADRAO, usos: usos || 0, blocos });
}
CARGAS.anamnese = async () => {
  const [rows, envs] = await Promise.all([
    DB.ler(DB.sel('anamnese_modelos', 'id,nome,area,slug,descricao,padrao,exige_assinatura,texto_declaracao,criado_em,blocos:anamnese_blocos(id,ordem,titulo,icone,excluido_em),perguntas:anamnese_perguntas(id,bloco_id,ordem,texto,tipo_resposta,opcoes,obrigatoria,descricao,pedir_detalhe,rotulo_detalhe,permite_outro,alerta,rotulo_alerta,excluido_em)').order('criado_em')),
    DB.ler(DB.sel('anamnese_envios', 'modelo_id')).catch(() => []),
  ]);
  const usos = {}; envs.forEach((e) => { usos[e.modelo_id] = (usos[e.modelo_id] || 0) + 1; });
  ANAM_STORE.v = rows.map((m) => modeloTela(m, usos[m.id])).sort((a, b) => Number(b.padrao) - Number(a.padrao)); avisar(ANAM_STORE);
};
const slugModelo = (n) => String(n || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '');
const cpfMascara = (v) => { const d = onlyDigits(v).slice(0, 11); return d.replace(/^(\d{3})(\d)/, '$1.$2').replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3').replace(/\.(\d{3})(\d)/, '.$1-$2'); };
const cpfOculto = (v) => { const d = onlyDigits(v); return d.length === 11 ? d.slice(0, 3) + '.***.***-' + d.slice(9) : ''; };
const dataHoraBR = (ts) => (ts ? BR.dataTela(BR.diaDe(ts)) + ' às ' + BR.hm(ts) : ''); // sempre no horário de Brasília

const AnamSvc = {
  // salva o modelo preservando os ids de blocos e perguntas (rascunhos em andamento continuam valendo)
  async salvar(ed) {
    const blocos = ed.blocos.map((b) => ({ ...b, qs: b.qs.filter((q) => String(q.t || '').trim()) })).filter((b) => b.qs.length || String(b.titulo || '').trim());
    const dados = { nome: ed.nome.trim(), area: ek('area', ed.uso) || 'geral', slug: slugModelo(ed.nome), descricao: String(ed.desc || '').trim() || null, exige_assinatura: ed.exigeAss !== false, texto_declaracao: String(ed.declaracao || '').trim() || null };
    let id = ed.dbId;
    if (id) await DB.upd('anamnese_modelos', id, dados, 'Não foi possível salvar o modelo');
    else { const r = await DB.ins('anamnese_modelos', dados, 'Não foi possível criar o modelo'); id = r.id; }
    const cli = CLI();
    const bRows = blocos.map((b, i) => ({ id: b.dbId || novoId(), clinica_id: cli, modelo_id: id, ordem: i + 1, titulo: String(b.titulo || '').trim() || 'Bloco ' + (i + 1), icone: b.icone || 'clipboard-list' }));
    const qRows = [];
    blocos.forEach((b, i) => b.qs.forEach((q, j) => qRows.push({ id: q.dbId || novoId(), clinica_id: cli, modelo_id: id, bloco_id: bRows[i].id, ordem: (i + 1) * 100 + j + 1, texto: q.t.trim(), tipo_resposta: q.k,
      opcoes: temOpcoes(q.k) ? (q.opcoes || []).map((o) => String(o).trim()).filter(Boolean) : null, obrigatoria: respondivel(q) && !!q.obrig, descricao: String(q.desc || '').trim() || null,
      pedir_detalhe: q.k === 'sim_nao' && !!q.det, rotulo_detalhe: q.k === 'sim_nao' && q.det ? (String(q.rotDet || '').trim() || 'Qual?') : null, permite_outro: temOpcoes(q.k) && !!q.outro,
      alerta: q.k === 'sim_nao' && !!q.alerta, rotulo_alerta: q.k === 'sim_nao' && q.alerta ? (String(q.rotAlerta || '').trim() || null) : null })));
    if (bRows.length) await DB.gravar(SB.from('anamnese_blocos').upsert(bRows, { onConflict: 'id' }), 'Não foi possível salvar os blocos');
    if (qRows.length) await DB.gravar(SB.from('anamnese_perguntas').upsert(qRows, { onConflict: 'id' }), 'Não foi possível salvar as perguntas');
    const agora = agoraIso();
    const tirar = (t, ids) => { let q = SB.from(t).update({ excluido_em: agora }).eq('clinica_id', cli).eq('modelo_id', id).is('excluido_em', null); if (ids.length) q = q.not('id', 'in', '(' + ids.join(',') + ')'); return DB.gravar(q, 'Não foi possível atualizar o modelo'); };
    await tirar('anamnese_perguntas', qRows.map((q) => q.id));
    await tirar('anamnese_blocos', bRows.map((b) => b.id));
    const salvo = comQs({ ...ed, id, dbId: id, nome: dados.nome, blocos: blocos.map((b, i) => ({ ...b, id: bRows[i].id, dbId: bRows[i].id, qs: b.qs.map((q) => { const r = qRows.find((x) => x.bloco_id === bRows[i].id && x.texto === q.t.trim()); return { ...q, id: r ? r.id : q.id, dbId: r ? r.id : q.dbId }; }) })) });
    return salvo;
  },
  async definirPadrao(m) {
    await DB.updWhere('anamnese_modelos', { padrao: false }, { padrao: true });
    await DB.upd('anamnese_modelos', m.dbId, { padrao: true }, 'Não foi possível definir o modelo padrão');
  },
  excluir(m) { return DB.del('anamnese_modelos', m.dbId, 'Não foi possível excluir o modelo'); },
  async regerar(envioId) { const { data, error } = await SB.rpc('regerar_link_anamnese', { p_envio: envioId }); if (error) { avisoErro('Não foi possível gerar o novo link', error); throw error; } return data; },
  cancelar(envioId) { return DB.upd('anamnese_envios', envioId, { status: 'cancelado', cancelado_em: agoraIso(), cancelado_por: UID() }, 'Não foi possível cancelar o envio'); },
  async publica(token) { const { data, error } = await SB.rpc('anamnese_publica', { p_token: token }); if (error) throw error; return data; },
  async rascunho(token, vals) { const { error } = await SB.rpc('salvar_rascunho_anamnese', { p_token: token, p_rascunho: vals || {} }); if (error) throw error; },
  async responder(token, blocos, vals, ass) {
    const { error } = await SB.rpc('responder_anamnese', { p_token: token, p_respostas: { respostas: payloadRespostas(blocos, vals), assinatura: ass || null } });
    if (error) throw error;
  },
  async envio(id) {
    const r = await DB.ler(DB.sel('anamnese_envios', 'id,token,status,modo,enviado_em,expira_em,respondido_em,rascunho,assinatura,assinante_nome,assinante_cpf,assinado_em,ip_assinatura,texto_declaracao,hash_respostas,modelo_id,modelo:anamnese_modelos(nome),respostas:anamnese_respostas(ordem,pergunta_texto,resposta,detalhe,bloco_titulo,alerta,rotulo_alerta,excluido_em)').eq('id', id));
    return r[0] ? envioTela(r[0]) : null;
  },
};

/* ---------- Respostas: formato da tela e do banco ---------- */
const valorTexto = (q, v) => {
  if (!v) return '';
  if (q.k === 'multipla_escolha') return (Array.isArray(v.r) ? v.r : []).map((o) => (o === 'Outro' ? 'Outro' + (v.o ? ': ' + v.o : '') : o)).join(', ');
  if (q.k === 'escolha_unica' && v.r === 'Outro') return 'Outro' + (v.o ? ': ' + v.o : '');
  return String(v.r == null ? '' : v.r).trim();
};
const respondida = (q, v) => valorTexto(q, v) !== '';
function payloadRespostas(blocos, vals) {
  const out = [];
  blocos.forEach((b) => b.qs.filter(respondivel).forEach((q) => { const v = vals[q.id]; const r = valorTexto(q, v); const d = v && q.k === 'sim_nao' && v.r === 'Sim' ? String(v.d || '').trim() : ''; if (r || d) out.push({ pergunta_id: q.id, resposta: r, detalhe: d || null }); }));
  return out;
}
const respostasLocais = (blocos, vals) => {
  const out = [];
  blocos.forEach((b) => b.qs.filter(respondivel).forEach((q) => { const v = vals[q.id]; const r = valorTexto(q, v); if (!r) return; const d = v && q.k === 'sim_nao' && v.r === 'Sim' ? String(v.d || '').trim() : ''; out.push([q.t, r, d, b.titulo, !!q.alerta && r === 'Sim', q.alerta ? (q.rotAlerta || q.t) : '']); }));
  return out;
};
function envioTela(e) {
  const st = { respondido: 'respondida', expirado: 'expirada', cancelado: 'cancelada', recebido: 'respondida' }[e.status] || 'pendente';
  const resp = (e.respostas || []).filter((r) => !r.excluido_em).sort((x, y) => x.ordem - y.ordem);
  return { id: e.id, dbId: e.id, kind: 'anamnese', date: BR.dataTela(BR.diaDe(e.enviado_em)), ord: e.enviado_em, title: e.modelo ? e.modelo.nome : 'Anamnese', status: st, modo: e.modo || 'link',
    token: e.token, link: linkAnamnese(e.token), expira: e.expira_em, respondidoEm: e.respondido_em, modeloId: e.modelo_id, rascunho: e.rascunho,
    assinatura: e.assinatura, assinante: e.assinante_nome, cpfAss: e.assinante_cpf, assinadoEm: e.assinado_em, ip: e.ip_assinatura, declaracao: e.texto_declaracao || '', codigo: e.hash_respostas ? e.hash_respostas.slice(0, 12).toUpperCase() : null,
    answers: resp.length ? resp.map((r) => [r.pergunta_texto, r.resposta || '', r.detalhe || '', r.bloco_titulo || '', !!r.alerta, r.rotulo_alerta || '']) : undefined };
}
// blocos no formato da tela a partir do que a função pública devolve
const blocosDePublica = (d) => (d.blocos || []).map((b, i) => ({ id: b.id || 'b' + i, titulo: b.titulo, icone: b.icone || 'clipboard-list', qs: (b.perguntas || []).map((q) => ({ id: q.id, t: q.texto, k: q.tipo, desc: q.descricao || '', obrig: !!q.obrigatoria, opcoes: q.opcoes || [], outro: !!q.permite_outro, det: !!q.pedir_detalhe, rotDet: q.rotulo_detalhe || '' })) }));
// alertas mostrados na ficha: vale a resposta mais recente de cada alerta
function alertasDeRecs(recs) {
  const vistos = {}, out = [];
  (recs || []).filter((r) => r.kind === 'anamnese' && r.status === 'respondida' && r.answers).forEach((r) => r.answers.forEach((a) => { const rot = a[5]; if (!rot || vistos[rot]) return; vistos[rot] = 1; if (a[4]) out.push({ rotulo: rot, detalhe: a[2] }); }));
  return out;
}

/* ---------- Impressão (PDF pelo navegador) ---------- */
function imprimirHtml(titulo, corpo) {
  const f = document.createElement('iframe');
  f.setAttribute('aria-hidden', 'true'); f.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;';
  document.body.appendChild(f);
  const d = f.contentWindow.document;
  d.open(); d.write('<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>' + titulo + '</title><style>body{font-family:Inter,system-ui,sans-serif;color:#0E2350;margin:32px;font-size:13px;line-height:1.5}h1{font-size:20px;margin:0 0 4px}h2{font-size:14px;margin:22px 0 8px;color:#1F5EFF;text-transform:uppercase;letter-spacing:.04em}.m{color:#5B6B86}.q{margin:0 0 10px}.q b{display:block}.al{color:#C2272D;font-weight:600}table{border-collapse:collapse;width:100%}td,th{border-bottom:1px solid #DCE4F2;padding:6px 8px;text-align:left;font-size:12px}img{max-width:100%}.ass{border:1px solid #DCE4F2;border-radius:10px;padding:12px;margin-top:8px}</style></head><body>' + corpo + '</body></html>');
  d.close();
  setTimeout(() => { try { f.contentWindow.focus(); f.contentWindow.print(); } catch (e) {} setTimeout(() => f.remove(), 60000); }, 350);
}
const escHtml = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const assinaturaSvgTexto = (a, w = 320, h = 120) => (a && a.tracos ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + (a.w || 320) + ' ' + (a.h || 120) + '" width="' + w + '" height="' + h + '">' + a.tracos.map((t) => '<polyline fill="none" stroke="#0E2350" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" points="' + t.map((p) => p.join(',')).join(' ') + '"/>').join('') + '</svg>' : '');
function imprimirAnamnese(r, paciente) {
  const grupos = []; (r.answers || []).forEach((a) => { const g = a[3] || 'Respostas'; let x = grupos.find((y) => y.t === g); if (!x) grupos.push(x = { t: g, l: [] }); x.l.push(a); });
  const corpo = '<h1>' + escHtml(r.title) + '</h1><div class="m">' + escHtml(paciente || '') + (r.respondidoEm ? ' · respondida em ' + escHtml(dataHoraBR(r.respondidoEm)) : '') + '</div>' +
    grupos.map((g) => '<h2>' + escHtml(g.t) + '</h2>' + g.l.map((a) => '<div class="q"><span class="m">' + escHtml(a[0]) + '</span><b' + (a[4] ? ' class="al"' : '') + '>' + escHtml(a[1]) + (a[2] ? ': ' + escHtml(a[2]) : '') + '</b></div>').join('')).join('') +
    (r.assinatura ? '<h2>Assinatura</h2><div class="ass">' + assinaturaSvgTexto(r.assinatura) + '<div>' + escHtml(r.assinante || '') + (r.cpfAss ? ' · CPF ' + escHtml(cpfOculto(r.cpfAss)) : '') + '</div><div class="m">' + (r.assinadoEm ? 'Assinada em ' + escHtml(dataHoraBR(r.assinadoEm)) : '') + (r.ip ? ' · IP ' + escHtml(r.ip) : '') + (r.codigo ? ' · Código de conferência ' + escHtml(r.codigo) : '') + '</div>' + (r.declaracao ? '<div class="m"><b>Declaração aceita:</b> ' + escHtml(r.declaracao) + '</div>' : '') + '</div>' : '');
  imprimirHtml(r.title, corpo);
}

/* =====================================================================
   COMPONENTES
   ===================================================================== */
const campoBase = { width: '100%', boxSizing: 'border-box', borderRadius: 14, border: '1.5px solid rgba(214,226,242,.95)', background: '#fff', padding: '0 14px', height: 46, fontFamily: 'inherit', fontSize: 15, color: 'var(--text-strong)', outline: 'none' };
const pilula = (on, cor) => ({ display: 'inline-flex', alignItems: 'center', gap: 8, minHeight: 44, padding: '8px 16px', borderRadius: 999, cursor: 'pointer', fontFamily: 'inherit', fontSize: 15, fontWeight: 500, textAlign: 'left', border: on ? `1.5px solid ${cor || '#1F5EFF'}` : '1.5px solid rgba(214,226,242,.95)', background: on ? `color-mix(in srgb, ${cor || '#1F5EFF'} 9%, white)` : '#fff', color: on ? (cor || '#1F5EFF') : 'var(--text-strong)' });

function CampoPergunta({ q, v, onChange, faltando, readOnly }) {
  const val = v || {};
  const set = (p) => !readOnly && onChange({ ...val, ...p });
  if (q.k === 'informativo') return (
    <div style={{ display: 'flex', gap: 10, padding: '12px 14px', borderRadius: 14, background: 'rgba(31,94,255,.06)', color: 'var(--text-body)', fontSize: 14, lineHeight: 1.5 }}><span style={{ color: '#1F5EFF', display: 'flex', flexShrink: 0, marginTop: 2 }}><OIcon name="info" size={16} /></span><span>{q.t}</span></div>
  );
  const ops = (q.opcoes || []).filter(Boolean).concat(q.outro ? ['Outro'] : []);
  const multi = Array.isArray(val.r) ? val.r : [];
  const toggleMulti = (o) => { let n = multi.includes(o) ? multi.filter((x) => x !== o) : [...multi, o]; if (o === 'Nenhuma' && !multi.includes(o)) n = ['Nenhuma']; else if (o !== 'Nenhuma') n = n.filter((x) => x !== 'Nenhuma'); set({ r: n }); };
  return (
    <div data-pergunta={q.id} style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: faltando ? 12 : 0, margin: faltando ? -12 : 0, borderRadius: 16, background: faltando ? 'rgba(229,72,77,.06)' : 'transparent', transition: 'background .2s' }}>
      <div>
        <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-strong)', lineHeight: 1.4 }}>{q.t}{q.obrig ? <span style={{ color: '#E5484D' }}> *</span> : null}</span>
        {q.desc ? <p style={{ margin: '2px 0 0', fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.45 }}>{q.desc}</p> : null}
      </div>
      {q.k === 'texto' ? <input value={val.r || ''} readOnly={readOnly} onChange={(e) => set({ r: e.target.value })} placeholder="Sua resposta" style={campoBase} /> : null}
      {q.k === 'texto_longo' ? <textarea value={val.r || ''} readOnly={readOnly} onChange={(e) => set({ r: e.target.value })} rows={3} placeholder="Sua resposta" style={{ ...campoBase, height: 'auto', padding: 12, resize: 'vertical', lineHeight: 1.5 }} /> : null}
      {q.k === 'data' ? <input type="date" value={val.r || ''} readOnly={readOnly} onChange={(e) => set({ r: e.target.value })} style={{ ...campoBase, maxWidth: 240 }} /> : null}
      {q.k === 'numero' ? <input type="number" inputMode="decimal" value={val.r == null ? '' : val.r} readOnly={readOnly} onChange={(e) => set({ r: e.target.value })} placeholder="0" style={{ ...campoBase, maxWidth: 180 }} /> : null}
      {q.k === 'sim_nao' ? <>
        <div style={{ display: 'flex', gap: 8 }}>{['Sim', 'Não'].map((o) => <button key={o} type="button" aria-pressed={val.r === o} onClick={() => set({ r: o })} style={{ ...pilula(val.r === o, o === 'Sim' && q.alerta ? '#E5484D' : '#1F5EFF'), minWidth: 92, justifyContent: 'center' }}>{o}</button>)}</div>
        {q.det && val.r === 'Sim' ? <input value={val.d || ''} readOnly={readOnly} onChange={(e) => set({ d: e.target.value })} placeholder={q.rotDet || 'Qual?'} aria-label={q.rotDet || 'Detalhe'} style={campoBase} /> : null}
      </> : null}
      {q.k === 'escolha_unica' || q.k === 'multipla_escolha' ? <>
        {q.k === 'multipla_escolha' ? <span style={{ ...lbl, fontSize: 11 }}>Marque todas que se aplicam</span> : null}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{ops.map((o) => { const on = q.k === 'multipla_escolha' ? multi.includes(o) : val.r === o; return (
          <button key={o} type="button" aria-pressed={on} onClick={() => (q.k === 'multipla_escolha' ? toggleMulti(o) : set({ r: o }))} style={pilula(on)}>
            <span style={{ width: 18, height: 18, flexShrink: 0, borderRadius: q.k === 'multipla_escolha' ? 6 : '50%', border: on ? '5px solid currentColor' : '2px solid rgba(150,175,210,.8)', boxSizing: 'border-box', background: '#fff' }} />{o}
          </button>); })}</div>
        {(q.k === 'multipla_escolha' ? multi.includes('Outro') : val.r === 'Outro') ? <input value={val.o || ''} readOnly={readOnly} onChange={(e) => set({ o: e.target.value })} placeholder="Qual?" style={campoBase} /> : null}
      </> : null}
      {faltando ? <span style={{ fontSize: 13, color: '#C2272D', fontWeight: 500 }}>Responda esta pergunta para continuar.</span> : null}
    </div>
  );
}

function AnamneseForm({ blocos, vals, setVals, faltando = [], readOnly }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {blocos.map((b) => (
        <section key={b.id} style={{ ...soft, background: 'rgba(255,255,255,.85)', padding: 18, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 34, height: 34, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(31,94,255,.1)', color: '#1F5EFF', flexShrink: 0 }}><OIcon name={b.icone || 'clipboard-list'} size={17} /></span>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--text-strong)' }}>{b.titulo}</h3>
          </div>
          {b.qs.map((q) => <CampoPergunta key={q.id} q={q} v={vals[q.id]} faltando={faltando.includes(q.id)} readOnly={readOnly} onChange={(nv) => setVals((x) => ({ ...x, [q.id]: nv }))} />)}
        </section>
      ))}
    </div>
  );
}

const ASS_W = 320, ASS_H = 120;
function AssinaturaPad({ tracos, onChange }) {
  const ref = React.useRef(null), cur = React.useRef(null);
  const desenhar = () => {
    const c = ref.current; if (!c) return; const r = c.getBoundingClientRect(); const dpr = window.devicePixelRatio || 1;
    c.width = Math.round(r.width * dpr); c.height = Math.round(r.height * dpr);
    const g = c.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0); g.lineWidth = 2.4; g.lineCap = 'round'; g.lineJoin = 'round'; g.strokeStyle = '#0E2350';
    (tracos || []).concat(cur.current ? [cur.current] : []).forEach((s) => { g.beginPath(); s.forEach(([x, y], i) => { const px = x / ASS_W * r.width, py = y / ASS_H * r.height; if (i) g.lineTo(px, py); else g.moveTo(px, py); }); if (s.length === 1) g.lineTo(s[0][0] / ASS_W * r.width + 0.5, s[0][1] / ASS_H * r.height); g.stroke(); });
  };
  React.useEffect(desenhar, [tracos]);
  React.useEffect(() => { window.addEventListener('resize', desenhar); return () => window.removeEventListener('resize', desenhar); });
  const pt = (e) => { const r = ref.current.getBoundingClientRect(); return [Math.round((e.clientX - r.left) / r.width * ASS_W * 10) / 10, Math.round((e.clientY - r.top) / r.height * ASS_H * 10) / 10]; };
  const vazio = !(tracos && tracos.length);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ position: 'relative', borderRadius: 16, border: '1.5px dashed rgba(31,94,255,.45)', background: '#fff', overflow: 'hidden' }}>
        <canvas ref={ref} aria-label="Quadro de assinatura" onPointerDown={(e) => { e.preventDefault(); try { ref.current.setPointerCapture(e.pointerId); } catch (x) {} cur.current = [pt(e)]; desenhar(); }}
          onPointerMove={(e) => { if (!cur.current) return; const p = pt(e), u = cur.current[cur.current.length - 1]; if (Math.hypot(p[0] - u[0], p[1] - u[1]) > 0.8) { cur.current.push(p); desenhar(); } }}
          onPointerUp={() => { if (cur.current) { const s = cur.current; cur.current = null; onChange([...(tracos || []), s]); } }} onPointerCancel={() => { cur.current = null; desenhar(); }}
          style={{ display: 'block', width: '100%', height: 150, touchAction: 'none', cursor: 'crosshair' }} />
        {vazio ? <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', color: 'var(--text-subtle, #9AA8C0)', fontSize: 14 }}>Assine aqui com o dedo ou o mouse</span> : null}
        <span style={{ position: 'absolute', left: 18, right: 18, bottom: 30, borderBottom: '1px solid rgba(150,175,210,.6)', pointerEvents: 'none' }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Use o dedo no celular ou o mouse no computador.</span>
        <button type="button" disabled={vazio} onClick={() => onChange([])} style={{ ...linkBtn, opacity: vazio ? 0.4 : 1 }}><OIcon name="eraser" size={14} />Limpar</button>
      </div>
    </div>
  );
}
function AssinaturaSvg({ a, altura = 70 }) {
  if (!a || !a.tracos) return null;
  return <svg viewBox={`0 0 ${a.w || ASS_W} ${a.h || ASS_H}`} style={{ height: altura, width: 'auto', maxWidth: '100%', display: 'block' }} aria-label="Assinatura">{a.tracos.map((t, i) => <polyline key={i} points={t.map((p) => p.join(',')).join(' ')} fill="none" stroke="#0E2350" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />)}</svg>;
}

/* ---------- Preenchimento: página do paciente, preencher junto, preencher para assinar e prévia ---------- */
// modo: 'paciente' (link), 'presencial' (na clínica, com assinatura), 'equipe' (a clínica preenche e envia para assinar), 'previa'
function AnamnesePreenchimento({ dados, token, modo, onFim, onFechar }) {
  const blocos = dados.blocosTela || blocosDePublica(dados);
  const pedeAss = dados.exige_assinatura !== false && modo !== 'equipe';
  const [vals, setVals] = React.useState(() => (dados.rascunho && typeof dados.rascunho === 'object' ? dados.rascunho : {}));
  const [ass, setAss] = React.useState({ nome: '', cpf: '', tracos: [], aceite: false });
  const [faltando, setFaltando] = React.useState([]);
  const [erroAss, setErroAss] = React.useState('');
  const [enviando, setEnviando] = React.useState(false);
  const [salvoEm, setSalvoEm] = React.useState(null);
  const sujo = React.useRef(false), topo = React.useRef(null);
  const total = blocos.reduce((a, b) => a + b.qs.filter(respondivel).length, 0);
  const feitas = blocos.reduce((a, b) => a + b.qs.filter((q) => respondivel(q) && respondida(q, vals[q.id])).length, 0);
  const pct = total ? Math.round(feitas / total * 100) : 100;
  // rascunho no servidor: o paciente pode fechar e continuar depois
  React.useEffect(() => { if (!sujo.current) { sujo.current = true; return; } if (!SB_ON || !token || modo === 'previa') return; const t = setTimeout(() => { AnamSvc.rascunho(token, vals).then(() => setSalvoEm(new Date())).catch(() => {}); }, 2200); return () => clearTimeout(t); }, [vals]);
  const validar = () => {
    const f = []; blocos.forEach((b) => b.qs.forEach((q) => { if (respondivel(q) && q.obrig && !respondida(q, vals[q.id])) f.push(q.id); }));
    setFaltando(f);
    if (f.length) { const el0 = document.querySelector('[data-pergunta="' + f[0] + '"]'); if (el0) el0.scrollIntoView({ behavior: 'smooth', block: 'center' }); return false; }
    if (pedeAss) {
      const e = !ass.nome.trim() ? 'Escreva seu nome completo.' : onlyDigits(ass.cpf).length !== 11 ? 'Informe um CPF com 11 números.' : !ass.tracos.length ? 'Faça sua assinatura no quadro.' : !ass.aceite ? 'Marque a confirmação para enviar.' : '';
      setErroAss(e); if (e) return false;
    }
    return true;
  };
  React.useEffect(() => { if (faltando.length) setFaltando((f) => f.filter((id) => { const q = blocos.reduce((a, b) => a.concat(b.qs), []).find((x) => x.id === id); return q && !respondida(q, vals[id]); })); }, [vals]);
  const enviar = async () => {
    if (modo === 'previa') return;
    if (modo === 'equipe') { setEnviando(true); try { if (SB_ON && token) await AnamSvc.rascunho(token, vals); onFim({ vals }); } catch (e) { avisoErro('Não foi possível salvar as respostas', e); } setEnviando(false); return; }
    if (!validar()) return;
    const assinatura = pedeAss ? { nome: ass.nome.trim(), cpf: onlyDigits(ass.cpf), aceite: true, w: ASS_W, h: ASS_H, tracos: ass.tracos, declaracao: (dados.declaracao || DECLARACAO_PADRAO) + ' ' + ACEITE_ASSINATURA } : null;
    setEnviando(true);
    try { if (SB_ON && token) await AnamSvc.responder(token, blocos, vals, assinatura); onFim({ vals, assinatura, answers: respostasLocais(blocos, vals) }); }
    catch (e) { const m = String((e && e.message) || ''); setErroAss(m.replace(/^.*?Responda:/, 'Responda: ') || 'Não foi possível enviar. Tente de novo.'); }
    setEnviando(false);
  };
  const paciente = modo === 'paciente';
  return (
    <div ref={topo} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ position: 'sticky', top: 0, zIndex: 2, display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 999, background: 'rgba(255,255,255,.92)', border: '1.5px solid rgba(255,255,255,.95)', boxShadow: '0 10px 24px -18px rgba(23,73,170,.5)', backdropFilter: 'blur(6px)' }}>
        <div style={{ flex: 1, height: 8, borderRadius: 999, background: 'rgba(150,175,210,.3)', overflow: 'hidden' }}><div style={{ width: pct + '%', height: '100%', borderRadius: 999, background: 'linear-gradient(90deg,#0B4BEB,#1FA8F5)', transition: 'width .3s' }} /></div>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-strong)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>{feitas} de {total}</span>
        {salvoEm ? <span style={{ fontSize: 12, color: '#2DBF6A', display: 'inline-flex', alignItems: 'center', gap: 4, whiteSpace: 'nowrap' }}><OIcon name="check" size={13} />Salvo</span> : null}
      </div>
      {paciente && dados.modo === 'assinar' ? <div style={{ display: 'flex', gap: 10, padding: '12px 14px', borderRadius: 16, background: 'rgba(45,191,106,.1)', color: 'var(--text-body)', fontSize: 14 }}><span style={{ color: '#2DBF6A', display: 'flex' }}><OIcon name="clipboard-check" size={18} /></span>A clínica já preencheu com você. Confira as respostas e assine no final.</div> : null}
      {modo === 'equipe' ? <div style={{ display: 'flex', gap: 10, padding: '12px 14px', borderRadius: 16, background: 'rgba(31,94,255,.07)', color: 'var(--text-body)', fontSize: 14 }}><span style={{ color: '#1F5EFF', display: 'flex' }}><OIcon name="pen-line" size={18} /></span>Preencha com o paciente. Depois ele recebe o link só para conferir e assinar.</div> : null}
      {modo === 'previa' ? <div style={{ display: 'flex', gap: 10, padding: '12px 14px', borderRadius: 16, background: 'rgba(245,180,0,.12)', color: 'var(--text-body)', fontSize: 14 }}><span style={{ color: '#B98400', display: 'flex' }}><OIcon name="eye" size={18} /></span>Prévia: é assim que o paciente vê. Nada do que você marcar aqui é salvo.</div> : null}
      <AnamneseForm blocos={blocos} vals={vals} setVals={setVals} faltando={faltando} />
      {pedeAss ? (
        <section style={{ ...soft, background: 'rgba(255,255,255,.85)', padding: 18, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 34, height: 34, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(31,94,255,.1)', color: '#1F5EFF', flexShrink: 0 }}><OIcon name="signature" size={17} /></span>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--text-strong)' }}>Assinatura e confirmação</h3>
          </div>
          <div style={{ padding: '12px 14px', borderRadius: 14, background: 'rgba(31,94,255,.06)', fontSize: 14, color: 'var(--text-body)', lineHeight: 1.5 }}><b>Declaração:</b> {dados.declaracao || DECLARACAO_PADRAO}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-strong)' }}>Nome completo *</span><input value={ass.nome} onChange={(e) => setAss({ ...ass, nome: e.target.value })} placeholder="Seu nome como no documento" autoComplete="name" style={campoBase} /></label>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-strong)' }}>CPF *</span><input value={ass.cpf} onChange={(e) => setAss({ ...ass, cpf: cpfMascara(e.target.value) })} placeholder="000.000.000-00" inputMode="numeric" style={campoBase} /></label>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-strong)' }}>Assinatura *</span><AssinaturaPad tracos={ass.tracos} onChange={(t) => setAss({ ...ass, tracos: t })} /></div>
          <OCheck checked={ass.aceite} onChange={(v) => setAss({ ...ass, aceite: v })} label={ACEITE_ASSINATURA} />
        </section>
      ) : null}
      {erroAss ? <div role="alert" style={{ padding: '10px 14px', borderRadius: 14, background: 'rgba(229,72,77,.08)', color: '#C2272D', fontSize: 14, fontWeight: 500 }}>{erroAss}</div> : null}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', flexWrap: 'wrap' }}>
        {onFechar ? <OBtn variant="secondary" onClick={onFechar}>{modo === 'previa' ? 'Fechar prévia' : 'Cancelar'}</OBtn> : null}
        {modo !== 'previa' ? <OBtn iconLeft={modo === 'equipe' ? 'send' : 'check'} loading={enviando} onClick={enviar} fullWidth={paciente}>{modo === 'equipe' ? 'Enviar para o paciente assinar' : 'Finalizar e enviar'}</OBtn> : null}
      </div>
      {pedeAss && modo !== 'previa' ? <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.5 }}>Seus dados são protegidos pela LGPD e só a clínica tem acesso. Registramos data, hora e IP deste envio, o que dá validade jurídica à assinatura.</p> : null}
    </div>
  );
}

/* ---------- Página pública (o paciente abre sem login) ---------- */
function MoldePublico({ children, clinica }) {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #F3F8FF 0%, #E9F1FC 100%)', fontFamily: 'var(--font-sans)', color: 'var(--text-body)' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '22px 16px 40px', display: 'flex', flexDirection: 'column', gap: 16, boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 44, height: 44, borderRadius: 14, background: 'linear-gradient(180deg,#5AA2FF 0%,#0A5CFF 42%,#0A7BFF 70%,#2FD3FF 100%)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px -12px rgba(10,92,255,.8)', flexShrink: 0 }}><OIcon name="building-2" size={20} /></span>
          <div style={{ minWidth: 0 }}><p style={{ margin: 0, fontSize: 17, fontWeight: 700, color: 'var(--text-strong)' }}>{clinica || 'Sua clínica'}</p><p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)' }}>Atendimento com a plataforma Salute IA</p></div>
        </div>
        {children}
      </div>
    </div>
  );
}
function AvisoPublico({ icone, cor = '#1F5EFF', titulo, texto, children }) {
  return (
    <div style={{ ...soft, background: 'rgba(255,255,255,.9)', padding: '34px 22px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' }}>
      <span style={{ width: 60, height: 60, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `color-mix(in srgb, ${cor} 12%, white)`, color: cor }}><OIcon name={icone} size={28} /></span>
      <h1 style={{ margin: 0, fontSize: 21, fontWeight: 600, color: 'var(--text-strong)' }}>{titulo}</h1>
      <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, maxWidth: 440 }}>{texto}</p>
      {children}
    </div>
  );
}
function PaginaAnamnese({ token }) {
  const [d, setD] = React.useState(null);
  const [fim, setFim] = React.useState(null);
  const carregarPag = () => { setD(null); if (!SB_ON) { setD({ status: 'demo' }); return; } AnamSvc.publica(token).then(setD).catch(() => setD({ status: 'erro' })); };
  React.useEffect(carregarPag, [token]);
  React.useEffect(() => { document.title = 'Anamnese' + (d && d.clinica ? ' · ' + d.clinica : ''); }, [d]);
  if (!d) return <MoldePublico><div style={{ ...soft, padding: 40, display: 'flex', justifyContent: 'center' }}><CargaEstado estado="carregando" compact /></div></MoldePublico>;
  if (fim || d.status === 'respondido') return <MoldePublico clinica={d.clinica}><AvisoPublico icone="circle-check" cor="#2DBF6A" titulo={'Obrigado' + (d.paciente ? ', ' + d.paciente : '') + '!'} texto="Recebemos suas respostas e a sua assinatura. Elas já estão no seu prontuário e a equipe vai ler antes do atendimento.">{d.codigo ? <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Código de conferência: <b style={{ letterSpacing: '.08em' }}>{d.codigo}</b></span> : null}</AvisoPublico></MoldePublico>;
  if (d.status === 'expirado') return <MoldePublico clinica={d.clinica}><AvisoPublico icone="clock" cor="#F2694A" titulo="Este link venceu" texto="Por segurança, o link da anamnese vale por 7 dias. Peça para a clínica enviar um novo pelo WhatsApp." /></MoldePublico>;
  if (d.status === 'cancelado') return <MoldePublico clinica={d.clinica}><AvisoPublico icone="ban" cor="#E5484D" titulo="Este link foi cancelado" texto="A clínica cancelou este envio. Se ainda precisar responder, peça um novo link." /></MoldePublico>;
  if (d.status !== 'aguardando') return <MoldePublico><AvisoPublico icone="link-2-off" cor="#E5484D" titulo="Link inválido" texto={d.status === 'demo' ? 'Esta é a versão de demonstração. No sistema conectado, o paciente responde a anamnese por este endereço.' : d.status === 'erro' ? 'Não foi possível abrir agora. Verifique sua internet e tente de novo.' : 'Não encontramos esta anamnese. Confira se o link está completo ou peça um novo para a clínica.'}>{d.status === 'erro' ? <OBtn iconLeft="refresh-cw" onClick={carregarPag}>Tentar de novo</OBtn> : null}</AvisoPublico></MoldePublico>;
  return (
    <MoldePublico clinica={d.clinica}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 12px', borderRadius: 999, background: 'rgba(31,94,255,.1)', color: '#1F5EFF', fontSize: 13, fontWeight: 600 }}><OIcon name="clipboard-list" size={14} />Anamnese digital</span>
        <h1 style={{ margin: '4px 0 0', fontSize: 24, fontWeight: 600, color: 'var(--text-strong)', letterSpacing: '-0.01em' }}>Olá{d.paciente ? ', ' + d.paciente : ''}!</h1>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55 }}>Responda a <b>{d.modelo}</b> antes do seu atendimento. O que você responder fica salvo: pode fechar e continuar depois pelo mesmo link.</p>
        {d.expira_em ? <p style={{ margin: 0, fontSize: 13, color: 'var(--text-muted)' }}>Link válido até {dataHoraBR(d.expira_em)}.</p> : null}
      </div>
      <AnamnesePreenchimento dados={d} token={token} modo="paciente" onFim={(r) => { setFim(r); window.scrollTo({ top: 0, behavior: 'smooth' }); AnamSvc.publica(token).then((x) => setD(x)).catch(() => {}); }} />
    </MoldePublico>
  );
}

/* ---------- Página pública de envio de documentos ---------- */
function PaginaEnvioDocs({ token }) {
  const [d, setD] = React.useState(null);
  const [enviados, setEnviados] = React.useState([]);
  const [enviando, setEnviando] = React.useState(0);
  const camRef = React.useRef(null), arqRef = React.useRef(null);
  React.useEffect(() => { if (!SB_ON) { setD({ status: 'demo' }); return; } SB.rpc('link_documentos_publico', { p_token: token }).then(({ data, error }) => setD(error ? { status: 'erro' } : data)); }, [token]);
  React.useEffect(() => { document.title = 'Enviar documentos' + (d && d.clinica ? ' · ' + d.clinica : ''); }, [d]);
  const subir = async (fs) => {
    const arr = Array.from(fs || []); if (!arr.length) return;
    setEnviando((n) => n + arr.length);
    for (const f of arr) {
      const path = d.pasta_upload + '/' + Date.now() + '-' + nomeSeguro(f.name);
      try {
        const up = await SB.storage.from('prontuario').upload(path, f, { contentType: f.type || 'application/octet-stream', upsert: false });
        if (up.error) throw up.error;
        const { error } = await SB.rpc('registrar_documento_link', { p_token: token, p_path: path, p_nome: f.name, p_mime: f.type || 'application/octet-stream', p_tamanho: f.size });
        if (error) throw error;
        setEnviados((l) => [...l, { nome: f.name, ok: true, url: f.type.startsWith('image/') ? URL.createObjectURL(f) : null }]);
      } catch (e) { setEnviados((l) => [...l, { nome: f.name, ok: false }]); }
      setEnviando((n) => n - 1);
    }
  };
  if (!d) return <MoldePublico><div style={{ ...soft, padding: 40, display: 'flex', justifyContent: 'center' }}><CargaEstado estado="carregando" compact /></div></MoldePublico>;
  if (!['aguardando', 'recebido'].includes(d.status)) return <MoldePublico clinica={d.clinica}><AvisoPublico icone={d.status === 'expirado' ? 'clock' : 'link-2-off'} cor="#F2694A" titulo={d.status === 'expirado' ? 'Este link venceu' : 'Link inválido'} texto={d.status === 'expirado' ? 'O link para enviar arquivos vale por 24 horas. Peça um novo para a clínica.' : d.status === 'demo' ? 'Esta é a versão de demonstração. No sistema conectado, o paciente envia as fotos por este endereço.' : 'Não encontramos este link. Confira se ele está completo.'} /></MoldePublico>;
  return (
    <MoldePublico clinica={d.clinica}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 600, color: 'var(--text-strong)' }}>Envie suas fotos e documentos</h1>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55 }}>Eles vão direto para o seu prontuário{d.pasta ? <>, na pasta <b>{d.pasta}</b></> : null}. Só a clínica tem acesso.</p>
      </div>
      <div style={{ ...soft, background: 'rgba(255,255,255,.88)', padding: 18, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
        <OBtn iconLeft="camera" size="lg" onClick={() => camRef.current && camRef.current.click()}>Tirar foto</OBtn>
        <OBtn iconLeft="image-up" size="lg" variant="secondary" onClick={() => arqRef.current && arqRef.current.click()}>Galeria ou arquivos</OBtn>
        <input ref={camRef} type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={(e) => { subir(e.target.files); e.target.value = ''; }} />
        <input ref={arqRef} type="file" accept="image/*,.pdf" multiple style={{ display: 'none' }} onChange={(e) => { subir(e.target.files); e.target.value = ''; }} />
      </div>
      {enviando ? <div style={{ fontSize: 14, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 8 }}><OIcon name="loader" size={16} />Enviando {enviando} {enviando === 1 ? 'arquivo' : 'arquivos'}...</div> : null}
      {enviados.length ? <div style={{ ...soft, background: 'rgba(255,255,255,.88)', padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {enviados.map((x, i) => <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 44, height: 44, borderRadius: 10, overflow: 'hidden', background: '#F4F7FC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#1F5EFF' }}>{x.url ? <img src={x.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <OIcon name="file-text" size={18} />}</span>
          <span style={{ flex: 1, minWidth: 0, fontSize: 14, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{x.nome}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: x.ok ? '#2DBF6A' : '#E5484D', display: 'inline-flex', alignItems: 'center', gap: 4 }}><OIcon name={x.ok ? 'check' : 'x'} size={14} />{x.ok ? 'Enviado' : 'Falhou'}</span>
        </div>)}
      </div> : null}
    </MoldePublico>
  );
}

/* ---------- Raiz: link público ou sistema ---------- */
function rotaPublica() {
  try {
    const u = new URLSearchParams(location.search);
    if (u.get('a')) return { tipo: 'a', token: u.get('a') };
    if (u.get('u')) return { tipo: 'u', token: u.get('u') };
    const m = location.pathname.match(/\/(a|u)\/([0-9a-f]{20,})\/?$/); if (m) return { tipo: m[1], token: m[2] };
    const h = location.hash.match(/^#\/?(a|u)\/([0-9a-f]{20,})/); if (h) return { tipo: h[1], token: h[2] };
  } catch (e) {}
  return null;
}
function RaizSalute() {
  const r = React.useMemo(rotaPublica, []);
  if (r && r.tipo === 'a') return <PaginaAnamnese token={r.token} />;
  if (r && r.tipo === 'u') return <PaginaEnvioDocs token={r.token} />;
  return <PortaSupabase><App /></PortaSupabase>;
}

/* ---------- Janela de preenchimento dentro do sistema ---------- */
function PreenchimentoJanela({ titulo, subtitulo, dados, token, modo, onFim, onFechar }) {
  return (
    <Overlay><div style={{ position: 'fixed', inset: 0, zIndex: 320, background: 'rgba(14,35,80,.35)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'stretch', justifyContent: 'center', padding: 16 }} onClick={modo === 'previa' ? onFechar : undefined}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: 'min(760px, 100%)', maxHeight: '100%', overflowY: 'auto', borderRadius: 28, background: 'linear-gradient(180deg,#F5F9FF,#EAF2FD)', boxShadow: '0 30px 60px -30px rgba(23,73,170,.6)', padding: 22, display: 'flex', flexDirection: 'column', gap: 14, boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
          <div><p style={{ margin: 0, fontSize: 20, fontWeight: 600, color: 'var(--text-strong)' }}>{titulo}</p>{subtitulo ? <p style={{ margin: '2px 0 0', fontSize: 13, color: 'var(--text-muted)' }}>{subtitulo}</p> : null}</div>
          <button type="button" aria-label="Fechar" onClick={onFechar} style={{ ...fCircle, flexShrink: 0 }}><OIcon name="x" size={18} /></button>
        </div>
        {dados ? <AnamnesePreenchimento dados={dados} token={token} modo={modo} onFim={onFim} onFechar={onFechar} /> : <CargaEstado estado="carregando" compact />}
      </div>
    </div></Overlay>
  );
}
const dadosDoModelo = (m, extra) => ({ blocosTela: m.blocos, exige_assinatura: m.exigeAss !== false, declaracao: m.declaracao, modelo: m.nome, ...(extra || {}) });

/* ---------- Cartão do registro de anamnese no prontuário ---------- */
const ST_ANAM = { respondida: ['Respondida', '#2DBF6A'], pendente: ['Aguardando resposta', '#F5B400'], expirada: ['Link vencido', '#F2694A'], cancelada: ['Cancelada', '#8A97AE'] };
const MODO_ANAM = { link: 'Pelo link', presencial: 'Preenchida na clínica', assinar: 'Preenchida pela equipe, assinada pelo paciente' };
function RespostasAnamnese({ r, paciente }) {
  const grupos = []; (r.answers || []).forEach((a) => { const g = a[3] || 'Respostas'; let x = grupos.find((y) => y.t === g); if (!x) grupos.push(x = { t: g, l: [] }); x.l.push(a); });
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 14, borderRadius: 14, background: 'rgba(255,255,255,.8)' }}>
      {grupos.map((g) => (
        <div key={g.t} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={lbl}>{g.t}</span>
          {g.l.map((a, i) => <div key={i}><p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)' }}>{a[0]}</p><p style={{ margin: '2px 0 0', fontSize: 14, fontWeight: 500, color: a[4] ? '#C2272D' : 'var(--text-strong)' }}>{a[4] ? <OIcon name="triangle-alert" size={13} /> : null} {a[1]}{a[2] ? ': ' + a[2] : ''}</p></div>)}
        </div>
      ))}
      {r.assinatura ? <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 10, borderTop: '1px solid rgba(214,226,242,.9)' }}>
        <span style={lbl}>Assinatura</span>
        <AssinaturaSvg a={r.assinatura} altura={64} />
        <span style={{ fontSize: 13, color: 'var(--text-body)' }}>{r.assinante}{r.cpfAss ? ' · CPF ' + cpfOculto(r.cpfAss) : ''}</span>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{r.assinadoEm ? 'Assinada em ' + dataHoraBR(r.assinadoEm) : ''}{r.ip ? ' · IP ' + r.ip : ''}{r.codigo ? ' · Código ' + r.codigo : ''}</span>
        {r.declaracao ? <span style={{ fontSize: 12, lineHeight: 1.5, color: 'var(--text-muted)' }}><b style={{ fontWeight: 600, color: 'var(--text-body)' }}>Declaração aceita:</b> {r.declaracao}</span> : null}
      </div> : null}
      <div><OBtn size="sm" variant="secondary" iconLeft="printer" onClick={() => imprimirAnamnese(r, paciente)}>Imprimir ou salvar PDF</OBtn></div>
    </div>
  );
}
function CartaoAnamnese({ r, paciente, onAcao }) {
  const [aberto, setAberto] = React.useState(false);
  const [copiado, setCopiado] = React.useState(false);
  const st = ST_ANAM[r.status] || ST_ANAM.pendente;
  const al = (r.answers || []).filter((a) => a[4]);
  const copiar = () => { try { navigator.clipboard && navigator.clipboard.writeText('https://' + r.link); } catch (e) {} setCopiado(true); setTimeout(() => setCopiado(false), 2200); };
  return <>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
      <Badge2 c={st[1]}>{st[0]}</Badge2>
      {r.status === 'pendente' && r.expira ? <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>vale até {dataHoraBR(r.expira)}</span> : null}
      {r.status === 'respondida' && r.modo && MODO_ANAM[r.modo] ? <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{MODO_ANAM[r.modo]}</span> : null}
      {al.map((a, i) => <Badge2 key={i} c="#E5484D">{a[5] || 'Alerta'}{a[2] ? ': ' + a[2] : ''}</Badge2>)}
    </div>
    {r.status === 'pendente' ? <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
      <button type="button" style={linkBtn} onClick={copiar}><OIcon name={copiado ? 'check' : 'copy'} size={13} />{copiado ? 'Copiado' : 'Copiar link'}</button>
      <button type="button" style={linkBtn} onClick={() => onAcao('reenviar', r)}><OIcon name="send" size={13} />Reenviar no WhatsApp</button>
      <button type="button" style={linkBtn} onClick={() => onAcao('preencher', r)}><OIcon name="tablet-smartphone" size={13} />Preencher agora</button>
      <button type="button" style={linkBtn} onClick={() => onAcao('regerar', r)}><OIcon name="refresh-cw" size={13} />Gerar novo link</button>
      <button type="button" style={{ ...linkBtn, color: '#E5484D' }} onClick={() => onAcao('cancelar', r)}><OIcon name="x" size={13} />Cancelar envio</button>
    </div> : null}
    {r.status === 'expirada' ? <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      <button type="button" style={linkBtn} onClick={() => onAcao('regerar', r)}><OIcon name="refresh-cw" size={13} />Gerar novo link</button>
      <button type="button" style={linkBtn} onClick={() => onAcao('preencher', r)}><OIcon name="tablet-smartphone" size={13} />Preencher agora</button>
    </div> : null}
    {r.answers ? <div><button type="button" style={linkBtn} onClick={() => setAberto(!aberto)}><OIcon name={aberto ? 'chevron-up' : 'eye'} size={13} />{aberto ? 'Esconder respostas' : 'Ver respostas'}</button></div> : null}
    {aberto && r.answers ? <RespostasAnamnese r={r} paciente={paciente} /> : null}
  </>;
}
// selos de alerta no topo da ficha (alergia, gestante...)
function AlertasPaciente({ recs }) {
  const al = alertasDeRecs(recs);
  if (!al.length) return null;
  return <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>{al.map((a) => <span key={a.rotulo} title="Informado pelo paciente na anamnese" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 24, padding: '0 10px', borderRadius: 999, fontSize: 12, fontWeight: 600, color: '#C2272D', background: 'rgba(229,72,77,.1)', border: '1px solid rgba(229,72,77,.25)' }}><OIcon name="triangle-alert" size={12} />{a.rotulo}{a.detalhe ? ': ' + a.detalhe : ''}</span>)}</div>;
}

/* ---------- Editor de modelo (Configurações e Prontuário) ---------- */
function EditorPergunta({ q, i, n, onChange, onMove, onRemove }) {
  const set = (p) => onChange({ ...q, ...p });
  const tg = (on, label, fn) => <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-body)', cursor: 'pointer' }}><MiniToggle on={on} onChange={fn} label={label} />{label}</label>;
  const inl = { height: 38, borderRadius: 12, border: '1.5px solid rgba(214,226,242,.95)', background: '#fff', padding: '0 12px', fontFamily: 'inherit', fontSize: 14, color: 'var(--text-strong)', outline: 'none', minWidth: 0 };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 12, borderRadius: 16, background: 'rgba(255,255,255,.8)', border: '1.5px solid rgba(255,255,255,.95)' }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'rgba(31,94,255,.1)', color: '#1F5EFF', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</span>
        <input value={q.t} onChange={(e) => set({ t: e.target.value })} placeholder={q.k === 'informativo' ? 'Texto que o paciente vai ler (instrução, aviso...)' : 'Escreva a pergunta'} aria-label="Pergunta" style={{ ...inl, flex: 1, minWidth: 180 }} />
        <select value={q.k} onChange={(e) => { const k = e.target.value; set({ k, opcoes: temOpcoes(k) && !(q.opcoes || []).length ? ['', ''] : q.opcoes }); }} aria-label="Tipo de resposta" style={{ ...inl, width: 170, cursor: 'pointer' }}>{TIPOS_RESP.map((t) => <option key={t.k} value={t.k}>{t.l}</option>)}</select>
        <span style={{ display: 'inline-flex', gap: 2 }}>
          <button type="button" aria-label="Subir pergunta" disabled={i === 0} onClick={() => onMove(-1)} style={{ ...fCircle, width: 32, height: 32, opacity: i === 0 ? 0.35 : 1 }}><OIcon name="arrow-up" size={14} /></button>
          <button type="button" aria-label="Descer pergunta" disabled={i === n - 1} onClick={() => onMove(1)} style={{ ...fCircle, width: 32, height: 32, opacity: i === n - 1 ? 0.35 : 1 }}><OIcon name="arrow-down" size={14} /></button>
          <button type="button" aria-label="Remover pergunta" onClick={onRemove} style={{ ...fCircle, width: 32, height: 32 }}><OIcon name="trash-2" size={14} /></button>
        </span>
      </div>
      {q.k !== 'informativo' ? <input value={q.desc} onChange={(e) => set({ desc: e.target.value })} placeholder="Ajuda para o paciente (opcional)" aria-label="Descrição" style={{ ...inl, marginLeft: 34 }} /> : null}
      {temOpcoes(q.k) ? <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginLeft: 34 }}>
        {(q.opcoes || []).map((o, j) => <div key={j} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          <span style={{ width: 16, height: 16, borderRadius: q.k === 'multipla_escolha' ? 5 : '50%', border: '2px solid rgba(150,175,210,.8)', flexShrink: 0 }} />
          <input value={o} onChange={(e) => set({ opcoes: q.opcoes.map((x, y) => (y === j ? e.target.value : x)) })} placeholder={'Opção ' + (j + 1)} style={{ ...inl, flex: 1 }} />
          <button type="button" aria-label="Remover opção" onClick={() => set({ opcoes: q.opcoes.filter((_, y) => y !== j) })} style={{ ...fCircle, width: 30, height: 30 }}><OIcon name="x" size={13} /></button>
        </div>)}
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}><button type="button" style={linkBtn} onClick={() => set({ opcoes: [...(q.opcoes || []), ''] })}><OIcon name="plus" size={13} />Opção</button>{tg(q.outro, 'Permitir "Outro" com texto', (v) => set({ outro: v }))}</div>
      </div> : null}
      {q.k === 'sim_nao' ? <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginLeft: 34 }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>{tg(q.det, 'Se Sim, pedir detalhe', (v) => set({ det: v }))}{q.det ? <input value={q.rotDet} onChange={(e) => set({ rotDet: e.target.value })} placeholder="Ex.: Qual?" style={{ ...inl, width: 200 }} /> : null}</div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>{tg(q.alerta, 'Se Sim, mostrar alerta na ficha', (v) => set({ alerta: v }))}{q.alerta ? <input value={q.rotAlerta} onChange={(e) => set({ rotAlerta: e.target.value })} placeholder="Nome do alerta (ex.: Alergia)" style={{ ...inl, width: 230 }} /> : null}</div>
      </div> : null}
      {q.k !== 'informativo' ? <div style={{ marginLeft: 34 }}>{tg(q.obrig, 'Obrigatória', (v) => set({ obrig: v }))}</div> : null}
    </div>
  );
}
function AnamneseEditor({ inicial, onSalvar, onCancelar, mobile, salvando }) {
  const [ed, setEd] = React.useState(() => JSON.parse(JSON.stringify(inicial)));
  const [erro, setErro] = React.useState('');
  const [previa, setPrevia] = React.useState(false);
  const setB = (i, p) => setEd((x) => ({ ...x, blocos: x.blocos.map((b, j) => (j === i ? { ...b, ...p } : b)) }));
  const mover = (arr, i, d) => { const a = arr.slice(); const [x] = a.splice(i, 1); a.splice(i + d, 0, x); return a; };
  const salvar = () => {
    if (!ed.nome.trim()) { setErro('Dê um nome ao modelo.'); window.scrollTo && document.querySelector('[data-campo="nome-modelo"]') && document.querySelector('[data-campo="nome-modelo"]').scrollIntoView({ block: 'center', behavior: 'smooth' }); return; }
    const semOp = ed.blocos.some((b) => b.qs.some((q) => q.t.trim() && temOpcoes(q.k) && !(q.opcoes || []).some((o) => String(o).trim())));
    if (semOp) { setErro('Toda pergunta de escolha precisa de pelo menos uma opção.'); return; }
    if (!ed.blocos.some((b) => b.qs.some((q) => q.t.trim()))) { setErro('Escreva pelo menos uma pergunta.'); return; }
    setErro(''); onSalvar(comQs(ed));
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <button type="button" onClick={onCancelar} style={{ ...linkBtn, alignSelf: 'flex-start', fontSize: 14 }}><OIcon name="arrow-left" size={15} />Voltar aos modelos</button>
      <Block title={inicial.dbId || ANAM_STORE.v && ANAM_STORE.v.some((x) => x.id === inicial.id) ? 'Editar modelo' : 'Novo modelo de anamnese'} desc="O paciente responde pelo link, no celular, e assina no final.">
        <div style={grid2(mobile)}>
          <div data-campo="nome-modelo"><OInput label="Nome do modelo" placeholder="Ex.: Anamnese odontológica" value={ed.nome} onChange={(e) => setEd({ ...ed, nome: e.target.value })} /></div>
          <OSelect label="Área" options={['Estética', 'Odontologia', 'Geral']} value={ed.uso} onChange={(e) => setEd({ ...ed, uso: e.target.value })} />
        </div>
        <OInput label="Descrição" placeholder="Breve descrição para a equipe" value={ed.desc || ''} onChange={(e) => setEd({ ...ed, desc: e.target.value })} />
        <Toggle on={ed.exigeAss !== false} onChange={(v) => setEd({ ...ed, exigeAss: v })} label="Pedir assinatura do paciente" desc="No final ele confirma nome, CPF e assina com o dedo. Guardamos data, hora e IP." />
        {ed.exigeAss !== false ? <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-strong)' }}>Texto da declaração</span><textarea value={ed.declaracao || ''} onChange={(e) => setEd({ ...ed, declaracao: e.target.value })} rows={2} style={{ borderRadius: 14, border: '1.5px solid rgba(214,226,242,.95)', background: '#fff', padding: 12, fontFamily: 'inherit', fontSize: 14, outline: 'none', resize: 'vertical' }} /></label> : null}
      </Block>
      {ed.blocos.map((b, i) => (
        <div key={b.id} style={{ ...soft, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ width: 34, height: 34, borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(31,94,255,.1)', color: '#1F5EFF', flexShrink: 0 }}><OIcon name={b.icone || 'clipboard-list'} size={17} /></span>
            <input value={b.titulo} onChange={(e) => setB(i, { titulo: e.target.value })} placeholder="Nome do bloco (ex.: Histórico de saúde)" aria-label="Nome do bloco" style={{ flex: 1, minWidth: 180, height: 40, borderRadius: 12, border: '1.5px solid rgba(214,226,242,.95)', background: '#fff', padding: '0 12px', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, color: 'var(--text-strong)', outline: 'none' }} />
            <span style={{ display: 'inline-flex', gap: 2 }}>
              <button type="button" aria-label="Subir bloco" disabled={i === 0} onClick={() => setEd({ ...ed, blocos: mover(ed.blocos, i, -1) })} style={{ ...fCircle, width: 32, height: 32, opacity: i === 0 ? 0.35 : 1 }}><OIcon name="arrow-up" size={14} /></button>
              <button type="button" aria-label="Descer bloco" disabled={i === ed.blocos.length - 1} onClick={() => setEd({ ...ed, blocos: mover(ed.blocos, i, 1) })} style={{ ...fCircle, width: 32, height: 32, opacity: i === ed.blocos.length - 1 ? 0.35 : 1 }}><OIcon name="arrow-down" size={14} /></button>
              <button type="button" aria-label="Remover bloco" onClick={() => setEd({ ...ed, blocos: ed.blocos.filter((_, j) => j !== i) })} style={{ ...fCircle, width: 32, height: 32 }}><OIcon name="trash-2" size={14} /></button>
            </span>
          </div>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }} aria-label="Ícone do bloco">{ICONES_BLOCO.map((ic) => <button key={ic} type="button" aria-label={'Ícone ' + ic} aria-pressed={b.icone === ic} onClick={() => setB(i, { icone: ic })} style={{ width: 32, height: 32, borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', border: b.icone === ic ? '1.5px solid #1F5EFF' : '1.5px solid transparent', background: b.icone === ic ? 'rgba(31,94,255,.08)' : 'transparent', color: b.icone === ic ? '#1F5EFF' : 'var(--text-muted)' }}><OIcon name={ic} size={15} /></button>)}</div>
          {b.qs.map((q, j) => <EditorPergunta key={q.id} q={q} i={j} n={b.qs.length} onChange={(nq) => setB(i, { qs: b.qs.map((x, y) => (y === j ? nq : x)) })} onMove={(d) => setB(i, { qs: mover(b.qs, j, d) })} onRemove={() => setB(i, { qs: b.qs.filter((_, y) => y !== j) })} />)}
          <button type="button" onClick={() => setB(i, { qs: [...b.qs, novaPergunta('texto')] })} style={{ alignSelf: 'flex-start', height: 38, padding: '0 14px', borderRadius: 999, border: '1.5px solid rgba(31,94,255,.35)', background: 'rgba(31,94,255,.04)', color: '#1F5EFF', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}><OIcon name="plus" size={14} />Pergunta</button>
        </div>
      ))}
      <button type="button" onClick={() => setEd({ ...ed, blocos: [...ed.blocos, novoBloco('')] })} style={{ height: 46, borderRadius: 16, border: '1.5px dashed rgba(31,94,255,.4)', background: 'rgba(31,94,255,.04)', color: '#1F5EFF', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><OIcon name="plus" size={15} />Novo bloco</button>
      {erro ? <div role="alert" style={{ padding: '10px 14px', borderRadius: 14, background: 'rgba(229,72,77,.08)', color: '#C2272D', fontSize: 14, fontWeight: 500 }}>{erro}</div> : null}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, flexWrap: 'wrap' }}>
        <OBtn variant="secondary" onClick={onCancelar}>Cancelar</OBtn>
        <OBtn variant="secondary" iconLeft="eye" onClick={() => setPrevia(true)}>Ver como o paciente vê</OBtn>
        <OBtn iconLeft="check" loading={salvando} onClick={salvar}>Salvar modelo</OBtn>
      </div>
      {previa ? <PreenchimentoJanela titulo={'Prévia: ' + (ed.nome || 'Novo modelo')} subtitulo="É assim que aparece no celular do paciente." dados={dadosDoModelo(comQs({ ...ed, blocos: ed.blocos.map((b) => ({ ...b, qs: b.qs.filter((q) => q.t.trim()) })).filter((b) => b.qs.length) }))} modo="previa" onFechar={() => setPrevia(false)} /> : null}
    </div>
  );
}
const modeloVazio = () => ({ id: idLocal('m'), nome: '', uso: 'Estética', desc: '', padrao: false, exigeAss: true, declaracao: DECLARACAO_PADRAO, usos: 0, blocos: [novoBloco('Motivo da consulta')] });
const copiaModelo = (m) => { const c = JSON.parse(JSON.stringify(m)); delete c.dbId; c.id = idLocal('m'); c.nome = m.nome + ' (cópia)'; c.padrao = false; c.usos = 0; c.blocos = c.blocos.map((b) => ({ ...b, id: idLocal('b'), dbId: undefined, qs: b.qs.map((q) => ({ ...q, id: idLocal('q'), dbId: undefined })) })); return comQs(c); };

/* ---------- Configurações > Cadastro > Modelos de anamnese ---------- */
function AnamneseModelosLista({ mobile }) {
  const [list, setList] = useAnamModels();
  const carga = SB_ON ? useCarga('anamnese') : 'ok';
  const [ed, setEd] = React.useState(null);
  const [salvando, setSalvando] = React.useState(false);
  const [previa, setPrevia] = React.useState(null);
  const [aviso, setAviso] = React.useState(null);
  const avisoRapido = (t) => { setAviso(t); setTimeout(() => setAviso(null), 2600); };
  const salvar = async (m) => {
    if (SB_ON) { setSalvando(true); try { const sv = await AnamSvc.salvar(m); setList((l) => (l.some((x) => x.id === m.id) ? l.map((x) => (x.id === m.id ? { ...sv, padrao: x.padrao, usos: x.usos } : x)) : [...l, sv])); setEd(null); avisoRapido('Modelo salvo'); } catch (e) {} setSalvando(false); return; }
    setList((l) => (l.some((x) => x.id === m.id) ? l.map((x) => (x.id === m.id ? m : x)) : [...l, m])); setEd(null); avisoRapido('Modelo salvo');
  };
  const duplicar = async (m) => { const c = copiaModelo(m); if (SB_ON) { try { const sv = await AnamSvc.salvar(c); setList((l) => [...l, sv]); avisoRapido('Cópia criada'); } catch (e) {} return; } setList((l) => [...l, c]); avisoRapido('Cópia criada'); };
  const padrao = (m) => { setList((l) => l.map((x) => ({ ...x, padrao: x.id === m.id }))); if (SB_ON) bg(AnamSvc.definirPadrao(m), () => carregar('anamnese', true)); avisoRapido(m.nome + ' agora é o padrão'); };
  const excluir = (m) => { setList((l) => l.filter((x) => x.id !== m.id)); if (SB_ON && m.dbId) bg(AnamSvc.excluir(m), () => carregar('anamnese', true)); avisoRapido('Modelo excluído'); };
  if (SB_ON && carga !== 'ok') return <CargaEstado estado={carga} compact onRetry={() => carregar('anamnese', true)} />;
  if (ed) return <AnamneseEditor inicial={ed} mobile={mobile} salvando={salvando} onCancelar={() => setEd(null)} onSalvar={salvar} />;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}><span style={{ fontSize: 14, color: 'var(--text-muted)' }}>Monte o modelo uma vez e envie pelo prontuário. O paciente responde no celular e assina.</span><OBtn size="sm" iconLeft="plus" onClick={() => setEd(modeloVazio())}>Novo modelo</OBtn></div>
      <div style={grid2(mobile, 260)}>
        {list.map((m) => (
          <div key={m.id} style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16, borderRadius: 20, background: 'rgba(255,255,255,.6)', border: m.padrao ? '1.5px solid rgba(31,94,255,.45)' : '1.5px solid rgba(255,255,255,.95)' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ width: 40, height: 40, borderRadius: 14, background: 'rgba(31,94,255,.1)', color: '#1F5EFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><OIcon name="clipboard-list" size={19} /></span>
              <span style={{ flex: 1, minWidth: 0 }}><span style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}><span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-strong)' }}>{m.nome}</span>{m.padrao ? <Badge2 c="#1F5EFF">Padrão</Badge2> : null}</span><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{m.uso} · {m.blocos.length} {m.blocos.length === 1 ? 'bloco' : 'blocos'} · {qsDe(m).filter(respondivel).length} perguntas · enviado {m.usos || 0}x</span></span>
            </div>
            {m.desc ? <span style={{ fontSize: 13, color: 'var(--text-body)' }}>{m.desc}</span> : null}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              <OBtn size="sm" variant="secondary" iconLeft="pencil" onClick={() => setEd(JSON.parse(JSON.stringify(m)))}>Editar</OBtn>
              <OBtn size="sm" variant="secondary" iconLeft="eye" onClick={() => setPrevia(m)}>Prévia</OBtn>
              <OBtn size="sm" variant="secondary" iconLeft="copy" onClick={() => duplicar(m)}>Duplicar</OBtn>
              {!m.padrao ? <button type="button" style={linkBtn} onClick={() => padrao(m)}><OIcon name="star" size={13} />Tornar padrão</button> : null}
              {!m.padrao ? <button type="button" aria-label={'Excluir ' + m.nome} title="Excluir modelo" style={{ ...linkBtn, color: '#E5484D' }} onClick={() => excluir(m)}><OIcon name="trash-2" size={13} /></button> : null}
            </div>
          </div>
        ))}
      </div>
      {previa ? <PreenchimentoJanela titulo={'Prévia: ' + previa.nome} subtitulo="É assim que aparece no celular do paciente." dados={dadosDoModelo(previa)} modo="previa" onFechar={() => setPrevia(null)} /> : null}
      {aviso ? <div style={{ position: 'fixed', left: '50%', bottom: 26, transform: 'translateX(-50%)', zIndex: 330, display: 'flex', alignItems: 'center', gap: 8, padding: '12px 18px', borderRadius: 999, background: 'var(--surface-inverse, #0E2350)', color: '#fff', fontSize: 14, fontWeight: 500, boxShadow: '0 16px 30px -14px rgba(0,0,0,.5)' }}><OIcon name="check" size={15} />{aviso}</div> : null}
    </div>
  );
}

/* ---------- Prontuário > Enviar anamnese ---------- */
const MODOS_ENVIO = [
  ['link', 'Paciente responde pelo link', 'send', 'Vai para o WhatsApp dele. Vale por 7 dias e ele pode continuar de onde parou.'],
  ['presencial', 'Preencher agora com o paciente', 'tablet-smartphone', 'Abre o formulário aqui. O paciente assina na tela, no tablet ou no celular.'],
  ['assinar', 'Preencher e enviar para assinar', 'pen-line', 'Você preenche junto com ele e o paciente só confere e assina pelo link.'],
];
// lista suspensa para escolher o modelo de anamnese (com busca quando há muitos modelos)
function ListaModelos({ models, sel, onSel, onNova }) {
  const [aberta, setAberta] = React.useState(false);
  const [q, setQ] = React.useState('');
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!aberta) return undefined;
    const fora = (e) => { if (ref.current && !ref.current.contains(e.target)) setAberta(false); };
    const esc = (e) => { if (e.key === 'Escape') setAberta(false); };
    document.addEventListener('pointerdown', fora); window.addEventListener('keydown', esc);
    return () => { document.removeEventListener('pointerdown', fora); window.removeEventListener('keydown', esc); };
  }, [aberta]);
  const m = models.find((x) => x.id === sel);
  const meta = (x) => [x.uso, qsDe(x).filter(respondivel).length + ' perguntas', x.exigeAss !== false ? 'com assinatura' : null].filter(Boolean).join(' · ');
  const tag = <span style={{ fontSize: 11, fontWeight: 600, color: '#1F5EFF', padding: '2px 8px', borderRadius: 999, background: 'rgba(31,94,255,.08)' }}>padrão</span>;
  const termo = q.trim().toLowerCase();
  const vis = models.filter((x) => !termo || (x.nome + ' ' + (x.uso || '') + ' ' + (x.desc || '')).toLowerCase().includes(termo));
  const nomeTxt = { fontSize: 15, fontWeight: 600, color: 'var(--text-strong)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button type="button" aria-haspopup="listbox" aria-expanded={aberta} aria-label="Modelo de anamnese" onClick={() => setAberta(!aberta)} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px 10px 10px', borderRadius: 18, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', border: aberta ? '1.5px solid #1F5EFF' : '1.5px solid rgba(214,226,242,.95)', background: '#fff', boxShadow: aberta ? '0 0 0 4px rgba(31,94,255,.12)' : '0 4px 12px -8px rgba(23,73,170,.35)', boxSizing: 'border-box' }}>
        <span style={{ width: 40, height: 40, borderRadius: 13, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(31,94,255,.08)', color: '#1F5EFF' }}><OIcon name="clipboard-list" size={19} /></span>
        <span style={{ flex: 1, minWidth: 0 }}>
          {m ? <><span style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}><span style={nomeTxt}>{m.nome}</span>{m.padrao ? tag : null}</span><span style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)' }}>{meta(m)}</span></> : <span style={{ fontSize: 14, color: 'var(--text-muted)' }}>Escolha o modelo de anamnese</span>}
        </span>
        <span style={{ fontSize: 12, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{models.length} {models.length === 1 ? 'modelo' : 'modelos'}</span>
        <span style={{ color: 'var(--text-muted)', display: 'flex', transform: aberta ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}><OIcon name="chevron-down" size={18} /></span>
      </button>
      {aberta ? <div role="listbox" aria-label="Modelos de anamnese" style={{ position: 'absolute', left: 0, right: 0, top: 'calc(100% + 6px)', zIndex: 20, padding: 6, borderRadius: 18, background: '#fff', boxShadow: '0 24px 46px -20px rgba(23,73,170,.55)', border: '1.5px solid rgba(214,226,242,.7)', display: 'flex', flexDirection: 'column', maxHeight: 380, boxSizing: 'border-box' }}>
        {models.length > 5 ? <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar modelo" aria-label="Buscar modelo" style={{ height: 38, margin: '2px 2px 6px', borderRadius: 999, border: '1.5px solid rgba(214,226,242,.95)', padding: '0 14px', fontFamily: 'inherit', fontSize: 14, outline: 'none', flexShrink: 0 }} /> : null}
        <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
          {vis.map((x) => { const on = x.id === sel; return (
            <button key={x.id} role="option" aria-selected={on} type="button" onClick={() => { onSel(x.id); setAberta(false); setQ(''); }} onMouseEnter={(e) => { if (!on) e.currentTarget.style.background = 'rgba(31,94,255,.04)'; }} onMouseLeave={(e) => { if (!on) e.currentTarget.style.background = 'transparent'; }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', border: 0, borderRadius: 12, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', background: on ? 'rgba(31,94,255,.07)' : 'transparent', flexShrink: 0 }}>
              <span style={{ flex: 1, minWidth: 0 }}><span style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}><span style={{ ...nomeTxt, fontSize: 14, color: on ? '#1F5EFF' : 'var(--text-strong)' }}>{x.nome}</span>{x.padrao ? tag : null}</span><span style={{ display: 'block', fontSize: 12, color: 'var(--text-muted)' }}>{meta(x)}</span></span>
              {on ? <span style={{ color: '#1F5EFF', display: 'flex' }}><OIcon name="check" size={16} /></span> : null}
            </button>); })}
          {!vis.length ? <span style={{ padding: 12, fontSize: 13, color: 'var(--text-muted)' }}>Nenhum modelo com esse nome.</span> : null}
        </div>
        <button type="button" onClick={() => { setAberta(false); onNova(); }} style={{ marginTop: 6, height: 42, flexShrink: 0, borderRadius: 12, border: '1.5px dashed rgba(31,94,255,.4)', background: 'rgba(31,94,255,.04)', color: '#1F5EFF', fontFamily: 'inherit', fontSize: 14, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}><OIcon name="plus" size={15} />Criar nova anamnese</button>
      </div> : null}
    </div>
  );
}
function AnamneseEnvio({ p, onFeito, onBack, wide }) {
  const [models, setModels] = useAnamModels();
  const [sel, setSel] = React.useState(() => { const pd = models.find((x) => x.padrao) || models[0]; return pd && pd.id; });
  const [modo, setModo] = React.useState('link');
  const [ed, setEd] = React.useState(null);
  const [salvandoM, setSalvandoM] = React.useState(false);
  const [janela, setJanela] = React.useState(null);
  const [gerando, setGerando] = React.useState(false);
  const [copiado, setCopiado] = React.useState(false);
  const [envio, setEnvio] = React.useState(null);
  React.useEffect(() => { if (!sel && models[0]) setSel((models.find((x) => x.padrao) || models[0]).id); }, [models.length]);
  const m = models.find((x) => x.id === sel);
  const linkDemo = m ? `salute.app/?a=${slugModelo(m.nome).slice(0, 6)}${onlyDigits(p.cpf).slice(0, 3)}${onlyDigits(p.cpf).slice(-2)}` : '';
  // cria o envio só uma vez por modelo e modo
  const garantir = async (md) => {
    if (!SB_ON) return { link: linkDemo, token: null, id: null };
    if (envio && envio.m === m.id && envio.modo === md) return envio;
    setGerando(true);
    try { const r = await ProntSvc.enviarAnamnese(p, m.nome, md); const e = { m: m.id, modo: md, ...r }; setEnvio(e); return e; } finally { setGerando(false); }
  };
  const copiar = async () => { try { const e = await garantir('link'); navigator.clipboard && navigator.clipboard.writeText('https://' + e.link); setCopiado(true); } catch (x) {} };
  const enviarLink = async () => { try { const e = await garantir('link'); onFeito({ m, modo: 'link', link: e.link, id: e.id, token: e.token, expira: e.expira }); } catch (x) {} };
  const abrir = async (md) => { try { const e = await garantir(md); setJanela({ md, e }); } catch (x) {} };
  const saveNew = async (n) => { if (SB_ON) { setSalvandoM(true); try { const sv = await AnamSvc.salvar(n); setModels((l) => [...l, sv]); setSel(sv.id); setEd(null); } catch (e) {} setSalvandoM(false); return; } setModels((l) => [...l, n]); setSel(n.id); setEd(null); };
  if (ed) return <AnamneseEditor inicial={ed} mobile={!wide} salvando={salvandoM} onCancelar={() => setEd(null)} onSalvar={saveNew} />;
  const radio = (on) => <span style={{ width: 18, height: 18, borderRadius: '50%', border: on ? '5px solid #1F5EFF' : '2px solid rgba(150,175,210,.8)', boxSizing: 'border-box', background: '#fff', flexShrink: 0 }} />;
  const card = (on) => ({ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 16, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', border: on ? '1.5px solid #1F5EFF' : '1.5px solid rgba(255,255,255,.95)', background: on ? 'rgba(31,94,255,.07)' : 'rgba(255,255,255,.6)' });
  const divisor = { ...lbl, paddingTop: 14, borderTop: '1px solid rgba(214,226,242,.9)' };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <BackLink onClick={onBack} />
      <div style={{ ...soft, background: 'rgba(255,255,255,.8)', padding: wide ? 20 : 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <span style={lbl}>1. Escolha a anamnese</span>
        <ListaModelos models={models} sel={sel} onSel={(id) => { setSel(id); setCopiado(false); }} onNova={() => setEd(modeloVazio())} />
        {m ? <>
          <div style={{ ...divisor, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}><span>2. Confira o que o paciente vai responder</span><button type="button" style={{ ...linkBtn, textTransform: 'none', letterSpacing: 0 }} onClick={() => setJanela({ md: 'previa' })}><OIcon name="eye" size={14} />Ver como o paciente vê</button></div>
          <div style={{ display: 'grid', gridTemplateColumns: wide ? 'repeat(2, minmax(0,1fr))' : '1fr', gap: '6px 18px' }}>{m.blocos.map((b) => <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--text-body)' }}><span style={{ color: '#1F5EFF', display: 'flex' }}><OIcon name={b.icone || 'clipboard-list'} size={15} /></span><span style={{ flex: 1 }}>{b.titulo}</span><span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{b.qs.filter(respondivel).length} {b.qs.filter(respondivel).length === 1 ? 'pergunta' : 'perguntas'}</span></div>)}{m.exigeAss !== false ? <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--text-body)' }}><span style={{ color: '#1F5EFF', display: 'flex' }}><OIcon name="signature" size={15} /></span>Assinatura no final</div> : null}</div>
          <span style={divisor}>3. Como vai ser preenchida</span>
          <div style={{ display: 'grid', gridTemplateColumns: wide ? 'repeat(3, minmax(0,1fr))' : '1fr', gap: 8 }}>{MODOS_ENVIO.map(([k, t, ic, d]) => { const on = modo === k; return (
            <button key={k} type="button" onClick={() => setModo(k)} style={{ ...card(on), alignItems: 'flex-start' }}>{radio(on)}<span style={{ flex: 1, minWidth: 0 }}><span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 600, color: 'var(--text-strong)' }}><span style={{ color: on ? '#1F5EFF' : 'var(--text-muted)', display: 'flex' }}><OIcon name={ic} size={16} /></span>{t}</span><span style={{ display: 'block', marginTop: 2, fontSize: 12, color: 'var(--text-muted)' }}>{d}</span></span></button>); })}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {modo === 'link' ? <>
              <span style={{ flex: 1, minWidth: 200, fontSize: 13, color: 'var(--text-muted)' }}>Vai direto para o WhatsApp <B>{p.tel}</B> com o link para responder.</span>
              <OBtn size="sm" variant="secondary" iconLeft={copiado ? 'check' : 'copy'} onClick={copiar}>{copiado ? 'Copiado' : 'Copiar link'}</OBtn>
              <OBtn size="sm" iconLeft="send" loading={gerando} onClick={enviarLink}>Enviar no WhatsApp</OBtn>
            </> : <OBtn size="sm" iconLeft={modo === 'presencial' ? 'tablet-smartphone' : 'pen-line'} loading={gerando} onClick={() => abrir(modo)}>{modo === 'presencial' ? 'Abrir formulário' : 'Começar a preencher'}</OBtn>}
          </div>
        </> : <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Nenhum modelo ainda. Use Criar nova anamnese na lista acima.</span>}
      </div>
      {janela && m ? <PreenchimentoJanela titulo={janela.md === 'previa' ? 'Prévia: ' + m.nome : m.nome} subtitulo={janela.md === 'previa' ? 'É assim que aparece no celular do paciente.' : janela.md === 'presencial' ? 'Entregue o aparelho para o paciente responder e assinar.' : p.nome}
        dados={dadosDoModelo(m, { paciente: p.nome.split(' ')[0] })} token={janela.e && janela.e.token} modo={janela.md === 'previa' ? 'previa' : janela.md === 'presencial' ? 'presencial' : 'equipe'} onFechar={() => setJanela(null)}
        onFim={(res) => { const e = janela.e || {}; setJanela(null); onFeito({ m, modo: janela.md, link: e.link || linkDemo, id: e.id, token: e.token, expira: e.expira, res }); }} /> : null}
    </div>
  );
}

Object.assign(window, { TIPOS_RESP, AnamSvc, envioTela, AnamnesePreenchimento, PaginaAnamnese, PaginaEnvioDocs, RaizSalute, PreenchimentoJanela, CartaoAnamnese, AlertasPaciente, AnamneseEditor, AnamneseModelosLista, AnamneseEnvio, imprimirHtml, escHtml, dadosDoModelo, respostasLocais, alertasDeRecs, modeloTela });
