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
  nome: 'Inicial',
  preco: 197,
  sub: 'Para organizar a clínica inteira em um só lugar.',
  itens: ['Todos os módulos do sistema', 'Pacientes, prontuário e agenda', 'Mensagens com a equipe e WhatsApp', 'Estoque e financeiro', 'Saluteflix e Salute Cast']
}, {
  id: 'iapro',
  nome: 'IA Pro',
  preco: 997,
  sub: 'A Renata IA atende, agenda e confirma por você.',
  destaque: true,
  itens: ['Tudo do plano Inicial', 'Renata IA no WhatsApp 24 horas', "At\xE9 ".concat((PLAN_LIMIT / 1000).toLocaleString('pt-BR'), " mil mensagens de IA por m\xEAs"), 'Agendamento e confirmação automáticos', 'Envio automático de anamnese']
}, {
  id: 'enterprise',
  nome: 'Enterprise',
  preco: null,
  sub: 'Para quem passa do limite ou precisa de mais de uma IA.',
  itens: ['Tudo do plano IA Pro', "Mais de ".concat((PLAN_LIMIT / 1000).toLocaleString('pt-BR'), " mil mensagens por m\xEAs"), 'Várias IAs, por unidade ou especialidade', 'Plano montado conforme o volume', 'Acompanhamento de um consultor']
}];
var PLAN_STORE = makeStore('iapro');
function PlanosSection(_ref2) {
  var mobile = _ref2.mobile;
  var _useStore = useStore(PLAN_STORE),
    _useStore2 = _slicedToArray(_useStore, 2),
    cur = _useStore2[0],
    setCur = _useStore2[1];
  useStore(CAT);
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
  }).nome), " \xB7 pr\xF3xima cobran\xE7a em ", SB_ON ? proxCobranca() : '10/10/2026')), cur === 'iapro' ? /*#__PURE__*/React.createElement("div", {
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
  }, used.toLocaleString('pt-BR'), " de ", PLAN_LIMIT.toLocaleString('pt-BR'), " usadas \xB7 renova dia ", SB_ON ? diaRenova() : 10)) : null), /*#__PURE__*/React.createElement("div", {
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
    })), atual ? /*#__PURE__*/React.createElement("button", {
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
  }, "Ao chegar perto do limite de mensagens, avisamos por aqui e pelo WhatsApp. Ningu\xE9m fica sem atendimento: acima do limite, sugerimos o plano Enterprise."));
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
      if (f) ContaSvc.foto(f)["catch"](function () {});
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