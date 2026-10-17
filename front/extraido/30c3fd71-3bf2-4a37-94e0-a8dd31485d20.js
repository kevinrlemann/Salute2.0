"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var _window$SaluteProjeto = window.SaluteProjetoDesigner_8b4683,
  FAv = _window$SaluteProjeto.Avatar,
  FIcon = _window$SaluteProjeto.Icon,
  FBtn = _window$SaluteProjeto.Button,
  FInput = _window$SaluteProjeto.Input;
var SET_ITEMS = [['conta', 'Conta', 'user'], ['seguranca', 'Segurança', 'lock'], ['plano', 'Plano e cobrança', 'credit-card'], ['notif', 'Notificações', 'bell'], ['idioma', 'Idioma', 'globe']];
var field = {
  height: 52,
  borderRadius: 14,
  background: 'rgba(255,255,255,.75)',
  border: '1.5px solid #fff',
  padding: '0 18px',
  fontFamily: 'inherit',
  fontSize: 15,
  color: 'var(--text-strong)',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box'
};
function Field(_ref) {
  var label = _ref.label,
    value = _ref.value,
    type = _ref.type,
    onChange = _ref.onChange,
    readOnly = _ref.readOnly;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      fontSize: 14,
      color: 'var(--text-muted)'
    }
  }, label, /*#__PURE__*/React.createElement("input", {
    defaultValue: value,
    type: type,
    onChange: onChange,
    readOnly: readOnly,
    style: field
  }));
}
var PLAN_LIMIT = 10000;
var PLANS = [{
  id: 'inicial',
  anual: 1970,
  implantacao: 0,
  usuarios: 2,
  profissionais: 3,
  armazenamentoGb: 5,
  nome: 'Inicial',
  preco: 197,
  sub: 'Gestão completa da clínica com o WhatsApp no mesmo lugar.',
  limite: 0,
  itens: ['Pacientes, prontuário e agenda', 'Anamnese com assinatura digital', 'Financeiro, estoque e CRM de leads', 'WhatsApp da clínica no sistema (1 número)', '2 usuários incluídos e até 3 profissionais', 'Saluteflix e Salute Cast']
}, {
  id: 'assistente',
  anual: 3970,
  implantacao: 297,
  usuarios: 2,
  profissionais: 6,
  armazenamentoGb: 10,
  nome: 'Assistente',
  preco: 397,
  sub: 'A Renata IA ajuda a equipe dentro do sistema.',
  limite: 1500,
  itens: ['Tudo do plano Inicial', 'Renata IA dentro do sistema (1.500 perguntas por mês)', 'Renata por voz (60 minutos por mês)', 'Lembretes automáticos de consulta', 'Envio automático de anamnese e documentos', '2 usuários incluídos e até 6 profissionais']
}, {
  id: 'iapro',
  anual: 9970,
  implantacao: 997,
  usuarios: 2,
  profissionais: 10,
  armazenamentoGb: 25,
  nome: 'IA Pro',
  preco: 997,
  sub: 'A Renata IA atende, agenda e confirma pelo WhatsApp.',
  destaque: true,
  limite: 10000,
  itens: ['Tudo do plano Assistente', 'IA atendendo no WhatsApp 24 horas', 'Até 10 mil mensagens de IA por mês', 'Agendamento, confirmação e follow-up automáticos', 'CRM que anda sozinho', '2 usuários incluídos e até 10 profissionais']
}];
var PLAN_STORE = makeStore('iapro');
// valores adicionais: cobrados à parte quando a clínica passa do limite do plano (vêm da tabela planos_adicionais)
var ADICIONAIS_STORE = makeStore([{
  codigo: 'usuario_extra', nome: '+1 usuário', descricao: 'Cada usuário além dos 2 incluídos no plano.', preco: 49.9, cobranca: 'mensal', quantidade: 1, planos: ['inicial', 'assistente', 'iapro']
}, {
  codigo: 'profissional_extra', nome: '+1 profissional com agenda', descricao: 'Acima do limite de profissionais do plano.', preco: 29, cobranca: 'mensal', quantidade: 1, planos: ['inicial', 'assistente', 'iapro']
}, {
  codigo: 'renata_500', nome: '+500 perguntas para a Renata', descricao: 'Quando a Renata chega ao limite do mês.', preco: 49, cobranca: 'pacote', quantidade: 500, planos: ['assistente', 'iapro']
}, {
  codigo: 'mensagens_ia_2000', nome: '+2.000 mensagens de IA', descricao: 'Quando a IA do WhatsApp chega ao limite do mês.', preco: 97, cobranca: 'pacote', quantidade: 2000, planos: ['iapro', 'enterprise']
}, {
  codigo: 'voz_60', nome: '+60 minutos de voz da Renata', descricao: 'Quando acabam os minutos de voz do mês.', preco: 49, cobranca: 'pacote', quantidade: 60, planos: ['assistente', 'iapro', 'enterprise']
}, {
  codigo: 'whatsapp_numero', nome: '+1 número de WhatsApp', descricao: 'Outro número da clínica no mesmo sistema.', preco: 97, cobranca: 'mensal', quantidade: 1, planos: ['iapro', 'enterprise']
}, {
  codigo: 'unidade', nome: '+1 unidade (filial)', descricao: 'Outra unidade com agenda, equipe e WhatsApp próprios.', preco: 497, cobranca: 'mensal', quantidade: 1, planos: ['enterprise']
}, {
  codigo: 'armazenamento_25', nome: '+25 GB de armazenamento', descricao: 'Para fotos, exames e documentos.', preco: 29, cobranca: 'mensal', quantidade: 25, planos: ['inicial', 'assistente', 'iapro', 'enterprise']
}, {
  codigo: 'zapi', nome: 'API não oficial 02 no lugar da API não oficial 01', descricao: 'Conexão do WhatsApp gerenciada pela API não oficial 02.', preco: 119, cobranca: 'mensal', quantidade: 1, planos: ['inicial', 'assistente', 'iapro', 'enterprise']
}, {
  codigo: 'meta_oficial', nome: 'WhatsApp oficial da Meta', descricao: 'Custo das mensagens da Meta + 20%.', preco: null, cobranca: 'sob_consulta', quantidade: null, planos: ['enterprise']
}]);
var planoBrl = function planoBrl(n) {
  return 'R$ ' + Number(n).toLocaleString('pt-BR');
};
var adicionalPreco = function adicionalPreco(a) {
  if (a.preco === null || a.preco === undefined || a.cobranca === 'sob_consulta') return 'Sob consulta';
  return planoBrl(a.preco) + (a.cobranca === 'pacote' ? ' por pacote' : ' por mês');
};
// linhas pequenas do cartão: plano anual, implantação e o que é cobrado acima do limite
function planoCondicoes(p, dark) {
  var ad = ADICIONAIS_STORE.v.filter(function (a) {
    return (a.planos || []).indexOf(p.id) >= 0;
  });
  var achar = function achar(c) {
    return ad.find(function (a) {
      return a.codigo === c;
    });
  };
  var linhas = [];
  if (p.preco && p.anual) linhas.push('ou ' + planoBrl(p.anual) + ' por ano (2 meses grátis)');
  if (p.implantacao !== null && p.implantacao !== undefined) linhas.push(Number(p.implantacao) > 0 ? 'Implantação: ' + planoBrl(p.implantacao) + ' (uma vez)' : 'Sem taxa de implantação');
  var fmt = function (v) { return 'R$ ' + Number(v).toLocaleString('pt-BR', { minimumFractionDigits: Number(v) % 1 ? 2 : 0, maximumFractionDigits: 2 }); };
  // o que é cobrado acima do limite: [o que passou, quanto custa]
  var acima = [];
  var u = achar('usuario_extra'), g = achar('armazenamento_25'), m = achar('mensagens_ia_2000'), r = achar('renata_500');
  if (u && p.usuarios) acima.push(['Mais de ' + p.usuarios + ' usuários', fmt(u.preco) + ' por usuário a mais, por mês']);
  if (g && p.armazenamentoGb) acima.push(['Mais de ' + p.armazenamentoGb + ' GB guardados', fmt(g.preco) + ' por mês a cada ' + g.quantidade + ' GB a mais']);
  if (!linhas.length && !acima.length) return null;
  var cor = dark ? 'rgba(255,255,255,.85)' : 'var(--text-muted)';
  return /*#__PURE__*/React.createElement("div", {
    style: { marginTop: 4, display: 'flex', flexDirection: 'column', gap: 3, fontSize: 12.5, lineHeight: 1.45, color: cor }
  }, linhas.map(function (t) {
    return /*#__PURE__*/React.createElement("span", { key: t }, t);
  }), acima.length ? /*#__PURE__*/React.createElement("div", {
    style: { marginTop: 6, padding: '10px 12px', borderRadius: 14, background: dark ? 'rgba(255,255,255,.12)' : 'rgba(31,94,255,.06)', display: 'flex', flexDirection: 'column', gap: 6 }
  }, /*#__PURE__*/React.createElement("b", { style: { color: dark ? '#fff' : 'var(--text-strong)', fontSize: 13 } }, "Acima do limite"), acima.map(function (t) {
    return /*#__PURE__*/React.createElement("div", { key: t[0], style: { display: 'flex', alignItems: 'baseline', gap: 8 } },
      /*#__PURE__*/React.createElement("span", { style: { width: 18, height: 18, borderRadius: '50%', flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, background: dark ? 'rgba(255,255,255,.2)' : 'rgba(31,94,255,.12)', color: dark ? '#fff' : '#1F5EFF', alignSelf: 'center' } }, "+"),
      /*#__PURE__*/React.createElement("span", { style: { display: 'flex', flexDirection: 'column' } },
        /*#__PURE__*/React.createElement("span", { style: { color: dark ? '#fff' : 'var(--text-strong)', fontWeight: 600 } }, t[0]),
        /*#__PURE__*/React.createElement("span", null, t[1])));
  })) : null);
}
// usuários ativos da clínica (o plano é controlado por usuário)
function planoUsuariosAtivos() {
  try { return (window.TEAM_STORE && TEAM_STORE.v || []).filter(function (u) { return u.convite !== 'pendente'; }).length; } catch (e) { return 0; }
}
// tabela "Valores adicionais" embaixo dos planos
function PlanosAdicionais(_ref) {
  var mobile = _ref.mobile;
  var _useStore = useStore(ADICIONAIS_STORE),
    lista = _useStore[0];
  if (!lista || !lista.length) return null;
  var nomePlano = function nomePlano(id) {
    return (PLANS.find(function (p) {
      return p.id === id;
    }) || {
      nome: id
    }).nome;
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      padding: mobile ? 14 : 20,
      borderRadius: 22,
      background: 'rgba(255,255,255,.65)',
      border: '1.5px solid rgba(255,255,255,.95)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      fontSize: 17,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Valores adicionais"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0',
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, "Cobrados à parte, só quando a clínica precisa de mais do que o plano inclui.")), lista.map(function (a) {
    return /*#__PURE__*/React.createElement("div", {
      key: a.codigo,
      style: {
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : 'minmax(0,1.6fr) minmax(0,.9fr) minmax(0,1.1fr)',
        gap: mobile ? 2 : 14,
        alignItems: 'center',
        padding: '10px 0',
        borderTop: '1px solid rgba(214,226,242,.8)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        fontSize: 14.5,
        color: 'var(--text-strong)'
      }
    }, a.nome), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12.5,
        color: 'var(--text-muted)'
      }
    }, a.descricao)), /*#__PURE__*/React.createElement("b", {
      style: {
        fontSize: 14,
        color: '#1F5EFF'
      }
    }, adicionalPreco(a)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12.5,
        color: 'var(--text-muted)'
      }
    }, (a.planos || []).map(nomePlano).join(', ')));
  }));
}
/* ---------- armazenamento usado pela clínica: arquivos (Storage) + texto das conversas e cadastros ---------- */
function armFmt(bytes, forcaGb) {
  var b = Number(bytes || 0);
  var gb = b / 1073741824;
  if (forcaGb || gb >= 1) return (gb >= 100 ? gb.toFixed(0) : gb >= 10 ? gb.toFixed(1) : gb.toFixed(2)).replace('.', ',') + ' GB';
  var mb = b / 1048576;
  if (mb >= 1) return (mb >= 100 ? mb.toFixed(0) : mb.toFixed(1)).replace('.', ',') + ' MB';
  return Math.max(1, Math.round(b / 1024)) + ' KB';
}
var ARM_STORE = makeStore(null);
// Resumo do que a clínica paga: plano base + usuários além dos incluídos + GB além do limite (estimativa pelo uso de agora)
function ResumoCobranca(_ref) {
  var mobile = _ref.mobile, cur = _ref.cur;
  var _a = useStore(ARM_STORE), armBytes = _a[0];
  useStore(TEAM_STORE);
  var pl = PLANS.find(function (x) { return x.id === cur; });
  if (!pl || !pl.preco) return null;
  var ad = ADICIONAIS_STORE.v || [];
  var adU = ad.find(function (x) { return x.codigo === 'usuario_extra'; }) || { preco: 49.9 };
  var adG = ad.find(function (x) { return x.codigo === 'armazenamento_25'; }) || { preco: 29, quantidade: 25 };
  var ativos = planoUsuariosAtivos(), inclU = pl.usuarios || 0, extraU = Math.max(0, ativos - inclU), custoU = extraU * Number(adU.preco || 0);
  var gbUsado = armBytes === null ? null : armBytes / 1073741824, inclG = pl.armazenamentoGb || 0;
  var pacotes = gbUsado === null ? 0 : Math.max(0, Math.ceil((gbUsado - inclG) / Number(adG.quantidade || 25))), custoG = pacotes * Number(adG.preco || 0);
  var total = Number(pl.preco) + custoU + custoG;
  var brl2 = function (v) { return 'R$ ' + Number(v).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); };
  var gbTxt = function (v) { return v < 1 ? Math.round(v * 1024) + ' MB' : v.toFixed(v < 10 ? 2 : 1).replace('.', ',') + ' GB'; };
  var linha = function (titulo, sub, valor, forte) {
    return /*#__PURE__*/React.createElement("div", { key: titulo, style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderTop: forte ? '1.5px solid rgba(214,226,242,.9)' : 0 } },
      /*#__PURE__*/React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 } },
        /*#__PURE__*/React.createElement("span", { style: { fontSize: forte ? 16 : 14, fontWeight: 600, color: 'var(--text-strong)' } }, titulo),
        sub ? /*#__PURE__*/React.createElement("span", { style: { fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.45 } }, sub) : null),
      /*#__PURE__*/React.createElement("span", { style: { fontSize: forte ? 20 : 15, fontWeight: 700, color: 'var(--text-strong)', whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' } }, valor));
  };
  return /*#__PURE__*/React.createElement("div", { "data-resumo-cobranca": "1", style: { display: 'flex', flexDirection: 'column', padding: mobile ? '12px 14px' : '14px 20px', borderRadius: 20, background: 'rgba(255,255,255,.5)', border: '1.5px solid rgba(255,255,255,.95)' } },
    /*#__PURE__*/React.createElement("div", { style: { paddingBottom: 6 } },
      /*#__PURE__*/React.createElement("h4", { style: { margin: 0, fontSize: 16, fontWeight: 600, color: 'var(--text-strong)' } }, "Quanto esta cl\xEDnica paga por m\xEAs"),
      /*#__PURE__*/React.createElement("p", { style: { margin: '3px 0 0', fontSize: 12.5, color: 'var(--text-muted)' } }, "Plano base mais o que passa do inclu\xEDdo: usu\xE1rios e espa\xE7o guardado. Estimativa com o uso de agora.")),
    linha('Plano ' + pl.nome, 'Inclui ' + inclU + ' usu\xE1rios e ' + inclG + ' GB de armazenamento.', brl2(pl.preco)),
    linha('Usu\xE1rios', ativos + ' ativos \xB7 ' + inclU + ' inclu\xEDdos' + (extraU ? ' \xB7 ' + extraU + ' a mais \xD7 ' + brl2(adU.preco) : ' \xB7 nenhum a mais'), extraU ? '+ ' + brl2(custoU) : 'R$ 0,00'),
    linha('Armazenamento', (gbUsado === null ? 'calculando' : gbTxt(gbUsado) + ' usados') + ' \xB7 ' + inclG + ' GB inclu\xEDdos' + (pacotes ? ' \xB7 ' + pacotes + ' \xD7 ' + adG.quantidade + ' GB a mais \xD7 ' + brl2(adG.preco) : ' \xB7 dentro do limite'), pacotes ? '+ ' + brl2(custoG) : 'R$ 0,00'),
    linha('Total estimado', 'A cobran\xE7a autom\xE1tica dos adicionais ainda n\xE3o est\xE1 ligada: o valor acima \xE9 o que vale pela tabela.', brl2(total), true));
}
function Armazenamento(_ref) {
  var mobile = _ref.mobile;
  var _st = React.useState(null),
    dados = _st[0],
    setDados = _st[1];
  var _er = React.useState(false),
    erro = _er[0],
    setErro = _er[1];
  React.useEffect(function () {
    if (!SB_ON) {
      setDados({
        total_bytes: 1181000000,
        arquivos_bytes: 1160000000,
        arquivos: 842,
        dados_bytes: 21000000,
        tipos: [{ tipo: 'Mídias do WhatsApp (fotos, áudios, vídeos e documentos)', arquivos: 610, bytes: 912000000 }, { tipo: 'Documentos e prontuários de pacientes', arquivos: 148, bytes: 201000000 }, { tipo: 'Fotos de pacientes', arquivos: 71, bytes: 38000000 }, { tipo: 'Fotos de perfil dos contatos', arquivos: 13, bytes: 9000000 }, { tipo: 'Conversas do WhatsApp (texto das mensagens)', arquivos: 9120, bytes: 14000000, unidade: 'mensagens' }, { tipo: 'Cadastros e registros (pacientes, agenda, prontuário, financeiro)', arquivos: null, bytes: 7000000 }]
      });
      return;
    }
    DB.rpc('armazenamento_uso', {
      p_clinica: CLI()
    }, 'Não foi possível calcular o armazenamento').then(function (r) {
      setDados(r || null);
    })["catch"](function () {
      setErro(true);
    });
  }, []);
  React.useEffect(function () { if (dados) { ARM_STORE.v = Number(dados.total_bytes || 0); avisar(ARM_STORE); } }, [dados]);
  if (erro || !dados) return null;
  var total = Number(dados.total_bytes || 0);
  var tipos = (dados.tipos || []).filter(function (t) {
    return Number(t.bytes || 0) > 0 || t.unidade;
  });
  var n = function n(x) {
    return Number(x || 0).toLocaleString('pt-BR');
  };
  var card = function card(titulo, valor, sub, destaque) {
    return /*#__PURE__*/React.createElement("div", {
      key: titulo,
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        padding: '10px 14px',
        borderRadius: 14,
        background: destaque ? 'linear-gradient(160deg,#0A2A8F,#0B4BEB 60%,#7B4BC4 140%)' : 'rgba(255,255,255,.65)',
        border: '1.5px solid rgba(255,255,255,.95)',
        color: destaque ? '#fff' : 'var(--text-strong)',
        marginTop: destaque ? 4 : 0,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: destaque ? 14 : 13.5,
        fontWeight: destaque ? 700 : 500,
        color: destaque ? '#fff' : 'var(--text-strong)',
        minWidth: 0
      }
    }, titulo), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: destaque ? 22 : 18,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        whiteSpace: 'nowrap',
        textAlign: 'right'
      }
    }, valor), sub ? /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: destaque ? 'rgba(255,255,255,.8)' : 'var(--text-muted)',
        flexBasis: '100%',
        marginTop: -6
      }
    }, sub) : null);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      padding: mobile ? 14 : 18,
      borderRadius: 20,
      background: 'rgba(255,255,255,.5)',
      border: '1.5px solid rgba(255,255,255,.95)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Armazenamento usado"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '3px 0 0',
      fontSize: 12.5,
      color: 'var(--text-muted)'
    }
  }, "Tudo o que esta cl\xEDnica guarda no sistema: arquivos (fotos, \xE1udios, v\xEDdeos, documentos) e o texto das conversas e dos cadastros. Calculado agora, no banco.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, (function () {
    var pl = PLANS.find(function (x) { return x.id === PLAN_STORE.v; }) || {};
    var gb = pl.armazenamentoGb;
    if (!gb) return null;
    var usadoGb = total / 1073741824;
    var pctA = Math.min(100, Math.round(usadoGb / gb * 100));
    var ad = (ADICIONAIS_STORE.v || []).find(function (a) { return a.codigo === 'armazenamento_25'; });
    return /*#__PURE__*/React.createElement("div", { key: "limite", style: { padding: '10px 14px', borderRadius: 14, background: 'rgba(31,94,255,.06)', border: '1.5px solid rgba(255,255,255,.95)', fontSize: 12.5, color: 'var(--text-muted)' } },
      /*#__PURE__*/React.createElement("div", { style: { display: 'flex', justifyContent: 'space-between', gap: 10, color: 'var(--text-strong)', fontWeight: 600 } },
        /*#__PURE__*/React.createElement("span", null, "Limite do plano " + (pl.nome || '')), /*#__PURE__*/React.createElement("span", null, armFmt(total, true) + ' de ' + gb + ' GB')),
      /*#__PURE__*/React.createElement("div", { style: { height: 6, borderRadius: 999, background: 'rgba(214,226,242,.8)', overflow: 'hidden', margin: '6px 0' } },
        /*#__PURE__*/React.createElement("div", { style: { width: pctA + '%', height: '100%', background: pctA >= 100 ? '#E5484D' : pctA >= 80 ? '#F59E0B' : '#1F5EFF' } })),
      ad ? /*#__PURE__*/React.createElement("span", null, 'Acima de ' + gb + ' GB: ' + planoBrl(ad.preco) + ' por mês a cada ' + ad.quantidade + ' GB a mais.') : null);
  })(), card('Total', armFmt(total, true), total < 1073741824 ? 'o mesmo que ' + armFmt(total) : 'em GB', true), card('Arquivos', armFmt(dados.arquivos_bytes), n(dados.arquivos) + (Number(dados.arquivos) === 1 ? ' arquivo' : ' arquivos')), card('Conversas e cadastros', armFmt(dados.dados_bytes), 'texto guardado no banco')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, tipos.map(function (t) {
    var b = Number(t.bytes || 0);
    var pct = total ? Math.round(b / total * 100) : 0;
    return /*#__PURE__*/React.createElement("div", {
      key: t.tipo,
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: 12,
        fontSize: 12.5
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-strong)',
        minWidth: 0
      }
    }, t.tipo + (t.arquivos != null ? ' · ' + n(t.arquivos) + ' ' + (t.unidade || (Number(t.arquivos) === 1 ? 'arquivo' : 'arquivos')) : '')), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-muted)',
        whiteSpace: 'nowrap',
        fontWeight: 600
      }
    }, armFmt(b) + ' · ' + pct + '%')), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 6,
        borderRadius: 999,
        background: 'rgba(214,226,242,.8)',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: Math.max(pct, b > 0 ? 1 : 0) + '%',
        height: '100%',
        borderRadius: 999,
        background: '#1F5EFF'
      }
    })));
  })));
}
/* ---------- uso da IA no mês: Renata por texto, Renata por voz, WhatsApp e a soma ---------- */
var USO_MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
function UsoIA(_ref0) {
  var mobile = _ref0.mobile;
  var _React$useState0 = React.useState(null),
    _React$useState1 = _slicedToArray(_React$useState0, 2),
    dados = _React$useState1[0],
    setDados = _React$useState1[1];
  var _React$useState10 = React.useState(''),
    _React$useState11 = _slicedToArray(_React$useState10, 2),
    lim = _React$useState11[0],
    setLim = _React$useState11[1];
  var _React$useState12 = React.useState(null),
    _React$useState13 = _slicedToArray(_React$useState12, 2),
    aviso = _React$useState13[0],
    setAviso = _React$useState13[1];
  var master = !!(window.SESSAO && SESSAO.v && SESSAO.v.admin);
  var carregar = function carregar() {
    if (!SB_ON) {
      setDados({
        atual: {
          renata_texto: 4120,
          renata_voz: 980,
          whatsapp: 1140,
          usadas: 6240,
          limite: 10000,
          ilimitado: false
        },
        limite_clinica: null,
        limite_plano: 10000,
        plano: 'IA Pro',
        meses: [{
          ano: 2026,
          mes: 10,
          renata_texto: 4120,
          renata_voz: 980,
          whatsapp: 1140,
          total: 6240
        }, {
          ano: 2026,
          mes: 9,
          renata_texto: 3870,
          renata_voz: 1210,
          whatsapp: 2960,
          total: 8040
        }]
      });
      return;
    }
    DB.rpc('ia_uso', {
      p_clinica: CLI(),
      p_meses: 6
    }, 'Não foi possível carregar o uso da IA').then(function (r) {
      setDados(r || null);
      setLim(r && r.limite_clinica !== null && r.limite_clinica !== undefined ? String(r.limite_clinica) : '');
    })["catch"](function () {
      setDados(null);
    });
  };
  React.useEffect(carregar, []);
  if (!dados || !dados.atual) return null;
  var a = dados.atual;
  var n = function n(x) {
    return Number(x || 0).toLocaleString('pt-BR');
  };
  var limite = a.ilimitado ? null : a.limite === null || a.limite === undefined ? 300 : Number(a.limite);
  var pct = limite ? Math.min(100, Math.round(Number(a.usadas || 0) / limite * 100)) : 0;
  var cor = pct >= 100 ? '#E5484D' : pct >= 80 ? '#F59E0B' : '#1F5EFF';
  var card = function card(titulo, valor, sub, destaque) {
    return /*#__PURE__*/React.createElement("div", {
      key: titulo,
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        padding: '10px 14px',
        borderRadius: 14,
        background: destaque ? 'linear-gradient(160deg,#0A2A8F,#0B4BEB 60%,#7B4BC4 140%)' : 'rgba(255,255,255,.65)',
        border: '1.5px solid rgba(255,255,255,.95)',
        color: destaque ? '#fff' : 'var(--text-strong)',
        marginTop: destaque ? 4 : 0,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: destaque ? 14 : 13.5,
        fontWeight: destaque ? 700 : 500,
        color: destaque ? '#fff' : 'var(--text-strong)',
        minWidth: 0
      }
    }, titulo), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: destaque ? 22 : 18,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        whiteSpace: 'nowrap',
        textAlign: 'right'
      }
    }, n(valor)), sub ? /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: destaque ? 'rgba(255,255,255,.8)' : 'var(--text-muted)',
        flexBasis: '100%',
        marginTop: -6
      }
    }, sub) : null);
  };
  var salvarLimite = function salvarLimite(valor) {
    var v = valor === '' ? null : Math.max(0, parseInt(valor, 10) || 0);
    DB.rpc('admin_definir_limite_ia', {
      p_clinica: CLI(),
      p_limite: v
    }, 'Não foi possível salvar o limite').then(function () {
      setAviso(v === null ? 'Limite voltou para o do plano.' : 'Limite salvo: ' + n(v) + ' mensagens por mês.');
      carregar();
      setTimeout(function () {
        return setAviso(null);
      }, 4000);
    })["catch"](function () {});
  };
  var inp = {
    height: 36,
    padding: '0 12px',
    borderRadius: 12,
    border: '1.5px solid rgba(214,226,242,.9)',
    background: '#fff',
    fontFamily: 'inherit',
    fontSize: 14,
    width: 140
  };
  var btn = function btn(label, onClick, sec) {
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: onClick,
      style: {
        height: 36,
        padding: '0 14px',
        borderRadius: 12,
        border: sec ? '1.5px solid rgba(31,94,255,.25)' : 0,
        background: sec ? 'transparent' : '#1F5EFF',
        color: sec ? '#1F5EFF' : '#fff',
        fontFamily: 'inherit',
        fontSize: 13.5,
        fontWeight: 600,
        cursor: 'pointer'
      }
    }, label);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      padding: mobile ? 14 : 18,
      borderRadius: 20,
      background: 'rgba(255,255,255,.5)',
      border: '1.5px solid rgba(255,255,255,.95)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    style: {
      margin: 0,
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Uso da IA neste m\xEAs"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '3px 0 0',
      fontSize: 12.5,
      color: 'var(--text-muted)'
    }
  }, "Cada pergunta feita \xE0 Renata (texto ou voz) e cada resposta da IA no WhatsApp contam 1 mensagem. ", a.ilimitado ? 'Este plano não tem limite.' : 'Limite do mês: ' + n(limite) + (dados.limite_clinica !== null && dados.limite_clinica !== undefined ? ' (definido pela Salute para esta clínica)' : dados.plano ? ' (plano ' + dados.plano + ')' : ' (padrão)') + '.')), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, card('Renata por texto', a.renata_texto, 'perguntas no chat'), card('Renata por voz', a.renata_voz, 'perguntas faladas'), card('WhatsApp', a.whatsapp, 'respostas da IA'), card('Total', a.usadas, a.ilimitado ? 'sem limite' : 'de ' + n(limite), true)), a.ilimitado ? null : /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8,
      borderRadius: 999,
      background: 'rgba(214,226,242,.8)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: pct + '%',
      height: '100%',
      borderRadius: 999,
      background: cor,
      transition: 'width .4s'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: pct >= 100 ? '#E5484D' : 'var(--text-muted)',
      marginTop: 4
    }
  }, pct >= 100 ? 'Limite do mês atingido: a Renata e a IA do WhatsApp param até o mês virar ou até a Salute ampliar o limite.' : pct + '% usado')), dados.meses && dados.meses.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 12.5,
      minWidth: 360
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      color: 'var(--text-muted)',
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'left',
      fontWeight: 500,
      padding: '4px 6px'
    }
  }, "M\xEAs"), ['Texto', 'Voz', 'WhatsApp', 'Total'].map(function (h) {
    return /*#__PURE__*/React.createElement("th", {
      key: h,
      style: {
        fontWeight: 500,
        padding: '4px 6px'
      }
    }, h);
  }))), /*#__PURE__*/React.createElement("tbody", null, dados.meses.map(function (m) {
    return /*#__PURE__*/React.createElement("tr", {
      key: m.ano + '-' + m.mes,
      style: {
        textAlign: 'right',
        borderTop: '1px solid rgba(214,226,242,.7)',
        color: 'var(--text-body)'
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        textAlign: 'left',
        padding: '5px 6px'
      }
    }, USO_MESES[(m.mes || 1) - 1] + '/' + m.ano), [m.renata_texto, m.renata_voz, m.whatsapp].map(function (v, i) {
      return /*#__PURE__*/React.createElement("td", {
        key: i,
        style: {
          padding: '5px 6px'
        }
      }, n(v));
    }), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '5px 6px',
        fontWeight: 700
      }
    }, n(m.total)));
  })))) : null, master ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap',
      paddingTop: 10,
      borderTop: '1px solid rgba(214,226,242,.7)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: 'var(--text-muted)'
    }
  }, "Salute (administrador master): limite mensal desta cl\xEDnica"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: 0,
    style: inp,
    value: lim,
    placeholder: dados.limite_plano !== null && dados.limite_plano !== undefined ? 'plano: ' + n(dados.limite_plano) : 'sem limite no plano',
    onChange: function onChange(e) {
      return setLim(e.target.value);
    }
  }), btn('Salvar', function () {
    return salvarLimite(lim);
  }), lim !== '' ? btn('Usar o do plano', function () {
    setLim('');
    salvarLimite('');
  }, true) : null, aviso ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: '#2DBF6A'
    }
  }, aviso) : null) : null);
}
function PlanosSection(_ref2) {
  var mobile = _ref2.mobile;
  var _useStore = useStore(PLAN_STORE),
    _useStore2 = _slicedToArray(_useStore, 2),
    cur = _useStore2[0],
    setCur = _useStore2[1];
  useStore(CAT);
  useStore(ADICIONAIS_STORE);
  var _React$useState = React.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    msg = _React$useState2[0],
    setMsg = _React$useState2[1];
  var used = SB_ON ? consumoMes() : 6240,
    pct = used / PLAN_LIMIT * 100;
  var brl = function brl(n) {
    return 'R$ ' + n.toLocaleString('pt-BR');
  };
  return /*#__PURE__*/React.createElement("section", {
    style: _objectSpread(_objectSpread({}, glass), {}, {
      padding: mobile ? 16 : 26,
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: mobile ? 19 : 22,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Plano e cobran\xE7a"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0',
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, "Plano atual: ", /*#__PURE__*/React.createElement(B, null, (PLANS.find(function (p) {
    return p.id === cur;
  }) || {
    nome: ''
  }).nome), " \xB7 pr\xF3xima cobran\xE7a em ", SB_ON ? proxCobranca() : '10/10/2026')), (PLANS.find(function (p) {
    return p.id === cur;
  }) || {}).limite > 0 ? /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 260,
      flex: mobile ? 1 : 'none',
      padding: '12px 14px',
      borderRadius: 16,
      background: 'rgba(255,255,255,.65)',
      border: '1.5px solid rgba(255,255,255,.95)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Mensagens de IA este m\xEAs"), /*#__PURE__*/React.createElement(B, null, pct.toFixed(0), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8,
      borderRadius: 999,
      background: 'rgba(214,226,242,.8)',
      overflow: 'hidden',
      margin: '6px 0'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: pct + '%',
      height: '100%',
      borderRadius: 999,
      background: 'var(--gradient-brand)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, used.toLocaleString('pt-BR'), " de ", PLAN_LIMIT.toLocaleString('pt-BR'), " usadas \xB7 renova dia ", SB_ON ? diaRenova() : 10)) : null), /*#__PURE__*/React.createElement(UsoIA, {
    mobile: mobile
  }), /*#__PURE__*/React.createElement(ResumoCobranca, {
    mobile: mobile,
    cur: cur
  }), /*#__PURE__*/React.createElement(Armazenamento, {
    mobile: mobile
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: mobile ? '1fr' : 'repeat(3, minmax(0,1fr))',
      gap: 16,
      alignItems: 'stretch'
    }
  }, PLANS.map(function (p) {
    var atual = cur === p.id;
    var dark = p.destaque;
    return /*#__PURE__*/React.createElement("div", {
      key: p.id,
      style: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        padding: 22,
        borderRadius: 24,
        overflow: 'hidden',
        background: dark ? 'linear-gradient(160deg,#0A2A8F 0%,#0B4BEB 55%,#7B4BC4 130%)' : 'linear-gradient(160deg,rgba(255,255,255,.88),rgba(225,236,255,.7))',
        color: dark ? '#fff' : 'var(--text-strong)',
        border: atual && !dark ? '2px solid #1F5EFF' : '1.5px solid rgba(255,255,255,.95)',
        boxShadow: dark ? '0 24px 44px -24px rgba(11,75,235,.85)' : '0 14px 30px -24px rgba(23,73,170,.45)'
      }
    }, dark ? /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        right: -30,
        top: -30,
        width: 160,
        height: 160,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,255,255,.2), rgba(255,255,255,0) 70%)'
      }
    }) : null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: '.12em'
      }
    }, p.nome.toUpperCase()), atual ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11.5,
        fontWeight: 600,
        padding: '4px 10px',
        borderRadius: 999,
        background: dark ? 'rgba(255,255,255,.2)' : 'rgba(31,94,255,.1)',
        color: dark ? '#fff' : '#1F5EFF'
      }
    }, "Seu plano") : null), /*#__PURE__*/React.createElement("div", null, p.preco ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 36,
        fontWeight: 700,
        letterSpacing: '-0.02em'
      }
    }, brl(p.preco), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 400,
        opacity: .8
      }
    }, "/m\xEAs")) : /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 30,
        fontWeight: 700
      }
    }, "Sob consulta"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: '6px 0 0',
        fontSize: 13.5,
        lineHeight: 1.5,
        opacity: dark ? .88 : 1,
        color: dark ? '#fff' : 'var(--text-muted)'
      }
    }, p.sub)), /*#__PURE__*/React.createElement("ul", {
      style: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        flex: 1
      }
    }, p.itens.map(function (t) {
      return /*#__PURE__*/React.createElement("li", {
        key: t,
        style: {
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
          fontSize: 14,
          lineHeight: 1.4
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 20,
          height: 20,
          borderRadius: '50%',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: dark ? 'rgba(255,255,255,.2)' : 'rgba(31,94,255,.1)',
          color: dark ? '#fff' : '#1F5EFF'
        }
      }, /*#__PURE__*/React.createElement(FIcon, {
        name: "check",
        size: 12,
        strokeWidth: 3
      })), t);
    })), atual && p.usuarios ? /*#__PURE__*/React.createElement("div", { style: { fontSize: 12.5, color: dark ? 'rgba(255,255,255,.85)' : 'var(--text-muted)' } },
      "Usuários ativos: ", /*#__PURE__*/React.createElement("b", { style: { color: dark ? '#fff' : 'var(--text-strong)' } }, planoUsuariosAtivos() + ' de ' + p.usuarios), planoUsuariosAtivos() > p.usuarios ? ' (' + (planoUsuariosAtivos() - p.usuarios) + ' cobrado' + (planoUsuariosAtivos() - p.usuarios === 1 ? '' : 's') + ' à parte)' : '') : null, planoCondicoes(p, dark), atual ? /*#__PURE__*/React.createElement("button", {
      type: "button",
      disabled: true,
      style: {
        height: 48,
        borderRadius: 999,
        border: dark ? '1.5px solid rgba(255,255,255,.5)' : '1.5px solid rgba(214,226,242,.95)',
        background: 'transparent',
        color: 'inherit',
        fontFamily: 'inherit',
        fontSize: 15,
        fontWeight: 500,
        opacity: .85
      }
    }, "Plano atual") : /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: function onClick() {
        if (SB_ON) {
          if (p.preco) ContaSvc.trocarPlano(p.id).then(function () {
            return setMsg("Pronto! Seu plano mudou para ".concat(p.nome, ". A diferen\xE7a aparece na pr\xF3xima cobran\xE7a."));
          }, function () {});else ContaSvc.consultor(p.id).then(function () {
            return setMsg('Recebemos seu pedido. Um consultor vai chamar você no WhatsApp para montar o plano Enterprise.');
          }, function () {});
          return;
        }
        if (p.preco) {
          setCur(p.id);
          setMsg("Pronto! Seu plano mudou para ".concat(p.nome, ". A diferen\xE7a aparece na pr\xF3xima cobran\xE7a."));
        } else setMsg('Recebemos seu pedido. Um consultor vai chamar você no WhatsApp para montar o plano Enterprise.');
      },
      style: {
        height: 48,
        borderRadius: 999,
        border: 0,
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 15,
        fontWeight: 600,
        background: dark ? '#fff' : 'linear-gradient(90deg,#0B3FD9,#1F7BFF)',
        color: dark ? '#0B4BEB' : '#fff',
        boxShadow: dark ? 'none' : '0 10px 22px -10px rgba(11,63,217,.7)'
      }
    }, p.preco ? 'Mudar para este plano' : 'Falar com consultor'));
  })), msg ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px 16px',
      borderRadius: 16,
      background: 'rgba(45,191,106,.1)',
      color: '#1E8E4E',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement(FIcon, {
    name: "circle-check",
    size: 17
  }), msg) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, "Ao chegar perto do limite (80%), avisamos por aqui e pelo WhatsApp. Ningu\xE9m fica sem atendimento: acima do limite, voc\xEA contrata um adicional ou muda de plano."));
}
function SegurancaSection(_ref3) {
  var mobile = _ref3.mobile;
  var _React$useState3 = React.useState({
      atual: '',
      nova: '',
      conf: ''
    }),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    f = _React$useState4[0],
    setF = _React$useState4[1];
  var _React$useState5 = React.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    show = _React$useState6[0],
    setShow = _React$useState6[1];
  var _React$useState7 = React.useState(false),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    done = _React$useState8[0],
    setDone = _React$useState8[1];
  var _React$useState9 = React.useState(false),
    _React$useState0 = _slicedToArray(_React$useState9, 2),
    sent = _React$useState0[0],
    setSent = _React$useState0[1];
  var _React$useState1 = React.useState(SB_ON ? !!(SESSAO.v.perfil && SESSAO.v.perfil.dois_fatores_ativo) : false),
    _React$useState10 = _slicedToArray(_React$useState1, 2),
    twofa = _React$useState10[0],
    setTwofa0 = _React$useState10[1];
  var setTwofa = function setTwofa(v) {
    setTwofa0(v);
    if (SB_ON) ContaSvc.doisFatores(v)["catch"](function () {
      return setTwofa0(!v);
    });
  };
  var rules = [['Pelo menos 8 caracteres', f.nova.length >= 8], ['Uma letra maiúscula', /[A-Z]/.test(f.nova)], ['Um número', /\d/.test(f.nova)], ['Um símbolo, como ! ou @', /[^A-Za-z0-9]/.test(f.nova)]];
  var score = rules.filter(function (r) {
    return r[1];
  }).length;
  var match = f.conf && f.conf === f.nova;
  var ok = f.atual && score === 4 && match;
  var inp = function inp(k, l) {
    return /*#__PURE__*/React.createElement("label", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        fontSize: 14,
        color: 'var(--text-muted)'
      }
    }, l, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'relative',
        display: 'block'
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: show ? 'text' : 'password',
      value: f[k],
      onChange: function onChange(e) {
        setF(_objectSpread(_objectSpread({}, f), {}, _defineProperty({}, k, e.target.value)));
        setDone(false);
      },
      style: _objectSpread(_objectSpread({}, field), {}, {
        paddingRight: 48
      }),
      autoComplete: k === 'atual' ? 'current-password' : 'new-password'
    }), /*#__PURE__*/React.createElement("button", {
      type: "button",
      "aria-label": show ? 'Esconder senha' : 'Mostrar senha',
      onClick: function onClick() {
        return setShow(!show);
      },
      style: {
        position: 'absolute',
        right: 10,
        top: '50%',
        transform: 'translateY(-50%)',
        border: 0,
        background: 'none',
        color: 'var(--text-muted)',
        cursor: 'pointer',
        padding: 6,
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement(FIcon, {
      name: show ? 'eye-off' : 'eye',
      size: 18
    }))));
  };
  var sc = ['#E5484D', '#F2694A', '#F5B400', '#1F5EFF', '#2DBF6A'][score];
  return /*#__PURE__*/React.createElement("section", {
    style: _objectSpread(_objectSpread({}, glass), {}, {
      padding: mobile ? 16 : 26,
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    })
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: mobile ? 19 : 22,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Seguran\xE7a"), /*#__PURE__*/React.createElement(Block, {
    title: "Trocar senha",
    desc: "Depois de trocar, os outros aparelhos conectados precisam entrar de novo."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: mobile ? '1fr' : 'minmax(0,1fr) 260px',
      gap: 20,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, inp('atual', 'Senha atual'), inp('nova', 'Nova senha'), inp('conf', 'Confirmar nova senha'), f.conf && !match ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: '#E5484D',
      marginTop: -6
    }
  }, "As senhas n\xE3o s\xE3o iguais.") : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      padding: 14,
      borderRadius: 16,
      background: 'rgba(255,255,255,.7)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "For\xE7a da senha"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4
    }
  }, [0, 1, 2, 3].map(function (i) {
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        flex: 1,
        height: 6,
        borderRadius: 999,
        background: i < score ? sc : 'rgba(214,226,242,.9)'
      }
    });
  })), rules.map(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
      l = _ref5[0],
      v = _ref5[1];
    return /*#__PURE__*/React.createElement("span", {
      key: l,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 13,
        color: v ? 'var(--text-strong)' : 'var(--text-muted)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 18,
        height: 18,
        borderRadius: '50%',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: v ? '#2DBF6A' : 'rgba(214,226,242,.9)',
        color: '#fff'
      }
    }, v ? /*#__PURE__*/React.createElement(FIcon, {
      name: "check",
      size: 11,
      strokeWidth: 3
    }) : null), l);
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gap: 12
    }
  }, done ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 13,
      color: '#2DBF6A',
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement(FIcon, {
    name: "check",
    size: 15
  }), "Senha alterada") : null, /*#__PURE__*/React.createElement(FBtn, {
    iconLeft: "lock",
    disabled: !ok,
    onClick: function onClick() {
      if (SB_ON) {
        ContaSvc.trocarSenha(f.atual, f.nova).then(function () {
          setDone(true);
          setF({
            atual: '',
            nova: '',
            conf: ''
          });
        }, function () {});
        return;
      }
      setDone(true);
      setF({
        atual: '',
        nova: '',
        conf: ''
      });
    }
  }, "Salvar nova senha"))), /*#__PURE__*/React.createElement(Block, {
    title: "Esqueceu a senha atual?",
    desc: "Enviamos um link seguro para voc\xEA criar uma senha nova."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 200,
      fontSize: 14,
      color: 'var(--text-body)'
    }
  }, "O link vai para ", /*#__PURE__*/React.createElement(B, null, SB_ON ? (SESSAO.v.perfil || {}).email : 'camila@bellaforma.com.br'), " e vale por 30 minutos."), sent ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 13,
      color: '#2DBF6A',
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement(FIcon, {
    name: "mail-check",
    size: 16
  }), "Link enviado. Confira sua caixa de entrada.") : /*#__PURE__*/React.createElement(FBtn, {
    variant: "secondary",
    iconLeft: "send",
    onClick: function onClick() {
      if (SB_ON) {
        ContaSvc.linkSenha().then(function () {
          return setSent(true);
        }, function () {});
        return;
      }
      setSent(true);
    }
  }, "Solicitar troca de senha"))), /*#__PURE__*/React.createElement(Toggle, {
    on: twofa,
    onChange: setTwofa,
    label: "Verifica\xE7\xE3o em duas etapas",
    desc: "Pede um c\xF3digo do WhatsApp sempre que entrar de um aparelho novo"
  }));
}
function IdiomaSection(_ref6) {
  var mobile = _ref6.mobile;
  var _useStore3 = useStore(LANG),
    _useStore4 = _slicedToArray(_useStore3, 1),
    lang = _useStore4[0];
  return /*#__PURE__*/React.createElement("section", {
    style: _objectSpread(_objectSpread({}, glass), {}, {
      padding: mobile ? 16 : 26,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    })
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: mobile ? 19 : 22,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Idioma"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0',
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, "O sistema muda na hora. Vale s\xF3 para o seu usu\xE1rio.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: mobile ? '1fr' : 'repeat(3, minmax(0,1fr))',
      gap: 12
    }
  }, LANGS.map(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 3),
      k = _ref8[0],
      l = _ref8[1],
      s = _ref8[2];
    var on = lang === k;
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      type: "button",
      onClick: function onClick() {
        setLang(k);
        if (SB_ON) salvarPref({
          idioma: k
        });
      },
      "aria-pressed": on,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: 16,
        borderRadius: 20,
        cursor: 'pointer',
        fontFamily: 'inherit',
        textAlign: 'left',
        border: on ? '2px solid #1F5EFF' : '2px solid rgba(255,255,255,.95)',
        background: on ? 'rgba(31,94,255,.07)' : 'rgba(255,255,255,.6)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 42,
        height: 42,
        borderRadius: 14,
        background: on ? 'linear-gradient(180deg,#0B4BEB,#1FA8F5)' : 'rgba(31,94,255,.08)',
        color: on ? '#fff' : '#1F5EFF',
        fontSize: 14,
        fontWeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, s), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        fontSize: 15,
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, l), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 20,
        height: 20,
        borderRadius: '50%',
        border: on ? '6px solid #1F5EFF' : '2px solid rgba(150,175,210,.8)',
        boxSizing: 'border-box',
        background: '#fff'
      }
    }));
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, "Menus, t\xEDtulos, abas e bot\xF5es s\xE3o traduzidos. Nomes de pacientes, valores e mensagens continuam como foram escritos."));
}
function NotifSection(_ref9) {
  var mobile = _ref9.mobile;
  var _React$useState11 = React.useState(SB_ON ? notifTela() : {
      ag: true,
      anam: true,
      est: true,
      fin: false
    }),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    n = _React$useState12[0],
    setN0 = _React$useState12[1];
  var setN = function setN(v) {
    setN0(v);
    if (SB_ON) salvarNotif(v);
  };
  return /*#__PURE__*/React.createElement("section", {
    style: _objectSpread(_objectSpread({}, glass), {}, {
      padding: mobile ? 16 : 26,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    })
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: mobile ? 19 : 22,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Notifica\xE7\xF5es"), /*#__PURE__*/React.createElement(SoundSettings, null), /*#__PURE__*/React.createElement(Block, {
    title: "Me avise quando"
  }, /*#__PURE__*/React.createElement("div", {
    style: grid2(mobile, 240)
  }, /*#__PURE__*/React.createElement(Toggle, {
    on: n.ag,
    onChange: function onChange(v) {
      return setN(_objectSpread(_objectSpread({}, n), {}, {
        ag: v
      }));
    },
    label: "Novo agendamento",
    desc: "Feito pela Renata IA ou pela equipe"
  }), /*#__PURE__*/React.createElement(Toggle, {
    on: n.anam,
    onChange: function onChange(v) {
      return setN(_objectSpread(_objectSpread({}, n), {}, {
        anam: v
      }));
    },
    label: "Anamnese respondida",
    desc: "O paciente terminou de preencher"
  }), /*#__PURE__*/React.createElement(Toggle, {
    on: n.est,
    onChange: function onChange(v) {
      return setN(_objectSpread(_objectSpread({}, n), {}, {
        est: v
      }));
    },
    label: "Estoque abaixo do m\xEDnimo",
    desc: "Para repor antes de faltar"
  }), /*#__PURE__*/React.createElement(Toggle, {
    on: n.fin,
    onChange: function onChange(v) {
      return setN(_objectSpread(_objectSpread({}, n), {}, {
        fin: v
      }));
    },
    label: "Pagamento atrasado",
    desc: "Receitas vencidas e n\xE3o recebidas"
  }))));
}
function PerfilScreen(_ref0) {
  var mobile = _ref0.mobile;
  var _ref1 = SB_ON ? usePrefFiltro('conta.aba', 'conta') : React.useState('conta'),
    _ref10 = _slicedToArray(_ref1, 2),
    tab = _ref10[0],
    setTab = _ref10[1];
  var _useStore5 = useStore(SESSAO),
    _useStore6 = _slicedToArray(_useStore5, 1),
    sess = _useStore6[0];
  useStore(CAT);
  var vals = React.useRef({});
  var fotoRef = React.useRef(null);
  var pf = sess.perfil || {};
  var vv = function vv(k, d) {
    return vals.current[k] !== undefined ? vals.current[k] : d;
  };
  var anota = function anota(k) {
    return function (e) {
      vals.current[k] = e.target.value;
    };
  };
  var g = mobile ? 14 : 26;
  var menu = mobile ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      overflowX: 'auto',
      scrollbarWidth: 'none'
    }
  }, SET_ITEMS.map(function (_ref11) {
    var _ref12 = _slicedToArray(_ref11, 3),
      k = _ref12[0],
      l = _ref12[1],
      i = _ref12[2];
    return /*#__PURE__*/React.createElement("span", {
      key: k,
      style: {
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(FilterChip, {
      active: tab === k,
      onClick: function onClick() {
        return setTab(k);
      }
    }, /*#__PURE__*/React.createElement(FIcon, {
      name: i,
      size: 14
    }), l));
  }), SB_ON ? /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(FilterChip, {
    active: false,
    onClick: sair
  }, /*#__PURE__*/React.createElement(FIcon, {
    name: "log-out",
    size: 14
  }), "Sair")) : null) : /*#__PURE__*/React.createElement("section", {
    style: _objectSpread(_objectSpread({}, glass), {}, {
      padding: '24px 0',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 520
    })
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 24px 18px',
      fontSize: 22,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Configura\xE7\xF5es gerais"), SET_ITEMS.map(function (_ref13) {
    var _ref14 = _slicedToArray(_ref13, 3),
      k = _ref14[0],
      l = _ref14[1],
      i = _ref14[2];
    var on = k === tab;
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      type: "button",
      onClick: function onClick() {
        return setTab(k);
      },
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        height: 58,
        padding: '0 26px',
        border: 0,
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 17,
        textAlign: 'left',
        background: on ? 'linear-gradient(180deg,#0B4BEB 0%,#1FB6F5 100%)' : 'transparent',
        color: on ? '#fff' : 'var(--text-strong)'
      }
    }, /*#__PURE__*/React.createElement(FIcon, {
      name: i,
      size: 19
    }), l);
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minHeight: 24
    }
  }), SB_ON ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: sair,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      margin: '0 26px 16px',
      border: 0,
      background: 'transparent',
      color: 'var(--text-strong)',
      fontFamily: 'inherit',
      fontSize: 16,
      cursor: 'pointer',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(FIcon, {
    name: "log-out",
    size: 18
  }), "Sair") : null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      margin: '0 26px',
      border: 0,
      background: 'transparent',
      color: '#EF4444',
      fontFamily: 'inherit',
      fontSize: 16,
      cursor: 'pointer',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(FIcon, {
    name: "trash-2",
    size: 18
  }), "Excluir conta"));
  var conta = /*#__PURE__*/React.createElement("section", {
    style: _objectSpread(_objectSpread({}, glass), {}, {
      padding: 0,
      overflow: 'hidden'
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 118,
      background: 'linear-gradient(100deg,#2ED39A 0%,#22E3F0 38%,#1FA8F5 62%,#0B4BEB 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: mobile ? '0 18px 22px' : '0 34px 30px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 12,
      marginTop: -44
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      cursor: SB_ON ? 'pointer' : undefined
    },
    onClick: SB_ON ? function () {
      return fotoRef.current && fotoRef.current.click();
    } : undefined
  }, /*#__PURE__*/React.createElement(FAv, {
    name: SB_ON ? nomeCompleto() : 'Camila Rocha',
    src: SB_ON ? KIT_USER.avatar || undefined : undefined,
    size: 92,
    ring: true
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 2,
      bottom: 4,
      width: 24,
      height: 24,
      borderRadius: '50%',
      background: '#fff',
      color: '#1F5EFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement(FIcon, {
    name: "pencil",
    size: 12
  }))), SB_ON ? /*#__PURE__*/React.createElement("input", {
    ref: fotoRef,
    type: "file",
    accept: "image/*",
    style: {
      display: 'none'
    },
    onChange: function onChange(e) {
      var f = e.target.files && e.target.files[0];
      // a pessoa ajusta o enquadramento (arrasta e aproxima) antes de a foto subir
      if (f) abrirRecorteFoto(f, { aspecto: 1, redondo: true }).then(function (r) { return ContaSvc.foto(r); })["catch"](function () {});
      e.target.value = '';
    }
  }) : null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: SB_ON ? function () {
      return ContaSvc.salvarPerfil({
        nome: vv('nome', pf.nome || ''),
        sobrenome: vv('sobrenome', pf.sobrenome || ''),
        email: vv('email', pf.email || ''),
        tel: vv('tel', BR.telTela(pf.telefone))
      })["catch"](function () {});
    } : undefined,
    style: {
      height: 50,
      padding: '0 46px',
      borderRadius: 999,
      border: 0,
      background: 'linear-gradient(90deg,#0B3FD9,#1F7BFF)',
      color: '#fff',
      fontFamily: 'inherit',
      fontSize: 17,
      fontWeight: 500,
      cursor: 'pointer',
      boxShadow: '0 10px 22px -10px rgba(11,63,217,.7)'
    }
  }, "Salvar")), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '14px 0 22px',
      paddingBottom: 18,
      borderBottom: '1px solid rgba(214,226,242,.9)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 22,
      fontWeight: 600,
      color: 'var(--text-strong)',
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, SB_ON ? nomeCompleto() : 'Camila Rocha', " ", !SB_ON || pf.verificado ? /*#__PURE__*/React.createElement(FIcon, {
    name: "badge-check",
    size: 20,
    color: "#1F5EFF"
  }) : null), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0',
      fontSize: 14,
      color: 'var(--text-muted)',
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(FIcon, {
    name: "map-pin",
    size: 14
  }), SB_ON ? cidadeClinica() : 'Itapira, SP')), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 16px',
      fontSize: 18,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Informa\xE7\xF5es pessoais"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
      gap: '16px 22px'
    }
  }, SB_ON ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Field, {
    label: "Nome",
    value: pf.nome || '',
    onChange: anota('nome')
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Sobrenome",
    value: pf.sobrenome || '',
    onChange: anota('sobrenome')
  }), /*#__PURE__*/React.createElement(Field, {
    label: "E-mail",
    type: "email",
    value: pf.email || '',
    onChange: anota('email')
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Telefone",
    value: BR.telTela(pf.telefone),
    onChange: anota('tel')
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Tipo de conta",
    value: papelTela(),
    readOnly: true
  }), sess.clinicas.length > 1 ? /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      fontSize: 14,
      color: 'var(--text-muted)'
    }
  }, "Cl\xEDnica", /*#__PURE__*/React.createElement("select", {
    value: CLI(),
    onChange: function onChange(e) {
      return trocarClinica(e.target.value);
    },
    style: field
  }, sess.clinicas.map(function (c) {
    return /*#__PURE__*/React.createElement("option", {
      key: c.id,
      value: c.id
    }, c.nome);
  }))) : null) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Field, {
    label: "Nome",
    value: "Camila"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Sobrenome",
    value: "Rocha"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "E-mail",
    value: "camila@bellaforma.com.br"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Telefone",
    value: "(19) 99800-4100"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Tipo de conta",
    value: "Administradora"
  })))));
  var body = {
    conta: conta,
    seguranca: /*#__PURE__*/React.createElement(SegurancaSection, {
      mobile: mobile
    }),
    plano: /*#__PURE__*/React.createElement(PlanosSection, {
      mobile: mobile
    }),
    notif: /*#__PURE__*/React.createElement(NotifSection, {
      mobile: mobile
    }),
    idioma: /*#__PURE__*/React.createElement(IdiomaSection, {
      mobile: mobile
    })
  }[tab];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: mobile ? '1fr' : '300px minmax(0,1fr)',
      gap: g,
      alignItems: 'start'
    }
  }, menu, body);
}
Object.assign(window, {
  PerfilScreen: PerfilScreen
});

/* ---------- Recorte da foto (2026-10-16) ----------
   Janela para enquadrar a foto antes de subir: arrastar para posicionar, controle para aproximar.
   abrirRecorteFoto(arquivo, {aspecto: 1, redondo: true, tamanho: 512}) devolve uma Promise com o arquivo JPEG recortado. */
var FOTO_RECORTE = makeStore(null);
var fotoRecorteRaiz = null;
function abrirRecorteFoto(arquivo, opcoes) {
  opcoes = opcoes || {};
  return new Promise(function (resolve, reject) {
    if (!arquivo || !/^image\//.test(arquivo.type || '')) { reject(new Error('Escolha uma imagem.')); return; }
    if (!fotoRecorteRaiz) {
      var div = document.createElement('div');
      document.body.appendChild(div);
      fotoRecorteRaiz = ReactDOM.createRoot(div);
      fotoRecorteRaiz.render(React.createElement(FotoRecorte));
    }
    FOTO_RECORTE.v = { arquivo: arquivo, aspecto: Number(opcoes.aspecto) || 1, redondo: !!opcoes.redondo, tamanho: Number(opcoes.tamanho) || 512, resolve: resolve, reject: reject };
    avisar(FOTO_RECORTE);
  });
}
function FotoRecorte() {
  var pedido = useStore(FOTO_RECORTE)[0];
  var _img = React.useState(null), img = _img[0], setImg = _img[1];
  var _z = React.useState(1), zoom = _z[0], setZoom = _z[1];
  var _o = React.useState({ x: 0, y: 0 }), off = _o[0], setOff = _o[1];
  var canvasRef = React.useRef(null);
  var arr = React.useRef(null);
  var LARG = 280;
  var alt = pedido ? Math.round(LARG / pedido.aspecto) : LARG;
  React.useEffect(function () {
    if (!pedido) { setImg(null); return undefined; }
    var url = URL.createObjectURL(pedido.arquivo);
    var i = new Image();
    i.onload = function () { setImg(i); setZoom(1); setOff({ x: 0, y: 0 }); };
    i.onerror = function () { pedido.reject(new Error('Não foi possível abrir a imagem.')); FOTO_RECORTE.v = null; avisar(FOTO_RECORTE); };
    i.src = url;
    return function () { URL.revokeObjectURL(url); };
  }, [pedido]);
  // escala base: a imagem cobre toda a janela; o zoom aproxima a partir daí
  var base = img ? Math.max(LARG / img.width, alt / img.height) : 1;
  var desenhar = function (cv, escalaSaida) {
    if (!img || !cv) return;
    var ctx = cv.getContext('2d');
    var k = escalaSaida || 1;
    ctx.clearRect(0, 0, cv.width, cv.height);
    var esc = base * zoom * k;
    var w = img.width * esc, h = img.height * esc;
    var x = (LARG * k - w) / 2 + off.x * k, y = (alt * k - h) / 2 + off.y * k;
    ctx.drawImage(img, x, y, w, h);
  };
  React.useEffect(function () { desenhar(canvasRef.current, 1); });
  var limitar = function (o, z) {
    var esc = base * (z || zoom);
    var mx = Math.max(0, (img.width * esc - LARG) / 2), my = Math.max(0, (img.height * esc - alt) / 2);
    return { x: Math.max(-mx, Math.min(mx, o.x)), y: Math.max(-my, Math.min(my, o.y)) };
  };
  var ini = function (x, y) { arr.current = { x: x, y: y, ox: off.x, oy: off.y }; };
  var mov = function (x, y) { if (!arr.current || !img) return; setOff(limitar({ x: arr.current.ox + (x - arr.current.x), y: arr.current.oy + (y - arr.current.y) })); };
  var fim = function () { arr.current = null; };
  var usar = function () {
    if (!img) return;
    var cv = document.createElement('canvas');
    var k = pedido.tamanho / LARG;
    cv.width = Math.round(LARG * k); cv.height = Math.round(alt * k);
    desenhar(cv, k);
    cv.toBlob(function (b) {
      var nome = String(pedido.arquivo.name || 'foto').replace(/\.[a-z0-9]+$/i, '') + '.jpg';
      var f = new File([b], nome, { type: 'image/jpeg' });
      pedido.resolve(f);
      FOTO_RECORTE.v = null; avisar(FOTO_RECORTE);
    }, 'image/jpeg', 0.9);
  };
  var cancelar = function () { pedido.reject(new Error('cancelado')); FOTO_RECORTE.v = null; avisar(FOTO_RECORTE); };
  if (!pedido) return null;
  var bt = function (rotulo, onClick, primario) {
    return React.createElement("button", { type: "button", onClick: onClick, style: { flex: 1, height: 42, borderRadius: 12, border: primario ? 0 : '1.5px solid rgba(214,226,242,.9)', background: primario ? '#1F5EFF' : '#fff', color: primario ? '#fff' : 'var(--text-strong)', fontFamily: 'inherit', fontSize: 15, fontWeight: 600, cursor: 'pointer' } }, rotulo);
  };
  return React.createElement("div", { "data-overlay": "1", role: "dialog", "aria-modal": "true", "aria-label": "Ajustar a foto",
    style: { position: 'fixed', inset: 0, zIndex: (window.Z && Z.dialogo) || 600, background: 'rgba(10,20,40,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, fontFamily: 'var(--font-sans, inherit)' } },
    React.createElement("div", { style: { width: '100%', maxWidth: 360, borderRadius: 22, background: '#F5F8FF', padding: 18, boxShadow: '0 24px 60px rgba(0,0,0,.35)', display: 'flex', flexDirection: 'column', gap: 12 } },
      React.createElement("div", { style: { fontSize: 18, fontWeight: 700, color: 'var(--text-strong)' } }, 'Ajustar a foto'),
      React.createElement("div", { style: { fontSize: 13, color: 'var(--text-muted)' } }, 'Arraste para posicionar e use o controle para aproximar. A parte dentro da moldura é a que fica.'),
      React.createElement("div", { style: { display: 'flex', justifyContent: 'center' } },
        React.createElement("div", { style: { position: 'relative', width: LARG, height: alt, borderRadius: pedido.redondo ? '50%' : 16, overflow: 'hidden', background: '#dfe7f5', boxShadow: '0 0 0 3px rgba(31,94,255,.35)', touchAction: 'none', cursor: 'grab' },
          onMouseDown: function (e) { e.preventDefault(); ini(e.clientX, e.clientY); }, onMouseMove: function (e) { if (e.buttons === 1) mov(e.clientX, e.clientY); }, onMouseUp: fim, onMouseLeave: fim,
          onTouchStart: function (e) { ini(e.touches[0].clientX, e.touches[0].clientY); }, onTouchMove: function (e) { mov(e.touches[0].clientX, e.touches[0].clientY); }, onTouchEnd: fim },
          React.createElement("canvas", { ref: canvasRef, width: LARG, height: alt, style: { display: 'block', width: LARG, height: alt } }),
          !img ? React.createElement("div", { style: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: 13 } }, 'Abrindo a foto...') : null)),
      React.createElement("label", { style: { display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: 'var(--text-muted)' } }, 'Aproximar',
        React.createElement("input", { type: "range", min: 1, max: 4, step: 0.01, value: zoom, "aria-label": "Aproximar a foto", onChange: function (e) { var z = Number(e.target.value); setZoom(z); if (img) setOff(limitar(off, z)); }, style: { flex: 1 } })),
      React.createElement("div", { style: { display: 'flex', gap: 8 } }, bt('Cancelar', cancelar, false), bt('Usar esta foto', usar, true))));
}
Object.assign(window, { abrirRecorteFoto: abrirRecorteFoto });
