"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var _window$SaluteProjeto = window.SaluteProjetoDesigner_8b4683,
  MAv = _window$SaluteProjeto.Avatar,
  MIcon = _window$SaluteProjeto.Icon;
var INBOX = [{
  id: 1,
  n: 'Dr. James Smith',
  m: 'A usabilidade é essencial em UX...',
  t: '14:30',
  u: 0
}, {
  id: 2,
  n: 'Dr. Livia Siphron',
  m: 'Como podemos ajudar? Estamos aqui!',
  t: '14:30',
  u: 3
}, {
  id: 3,
  n: 'Michael Thompson',
  m: 'Aguardando o resultado dos exames...',
  t: '14:02',
  u: 0
}, {
  id: 4,
  n: 'Dr. Hanna Rosser',
  m: 'Como podemos ajudar? Estamos aqui!',
  t: '14:30',
  u: 3
}, {
  id: 5,
  n: 'Sarah Scott',
  m: 'Como podemos ajudar? Estamos aqui!',
  t: '14:30',
  u: 0
}, {
  id: 6,
  n: 'Adam Bridges',
  m: 'Como podemos ajudar? Estamos aqui!',
  t: '14:30',
  u: 3
}, {
  id: 7,
  n: 'Sarah Scott',
  m: 'Como podemos ajudar? Estamos aqui!',
  t: '14:30',
  u: 0
}];
var EQUIPE = [{
  id: 101,
  n: 'Darlene Robertson',
  r: 'Terapeuta',
  m: 'Pode encaixar a Mariana às 15h30?',
  t: '15:42',
  u: 2,
  msgs: [{
    me: false,
    t: '15:38',
    text: 'Camila, pode encaixar a Mariana Alves às 15h30? Ela pediu pelo WhatsApp.'
  }, {
    me: true,
    t: '15:40',
    text: 'Posso sim. Deixa que eu confirmo com ela.'
  }, {
    me: false,
    t: '15:42',
    text: 'Perfeito! Já separei o kit de toxina na sala 1.'
  }]
}, {
  id: 102,
  n: 'Ana Paula',
  r: 'Recepção',
  m: 'A Renata confirmou 6 retornos para amanhã.',
  t: '15:10',
  u: 0,
  msgs: [{
    me: false,
    t: '15:08',
    text: 'Boa tarde! A Renata IA confirmou 6 retornos para amanhã.'
  }, {
    me: false,
    t: '15:10',
    text: 'Só o Thiago Rocha ainda não respondeu, vou ligar para ele.'
  }]
}, {
  id: 103,
  n: 'Max Worthington',
  r: 'Psicólogo',
  m: 'Chegou o pedido de ácido hialurônico.',
  t: '14:55',
  u: 1,
  msgs: [{
    me: false,
    t: '14:55',
    text: 'Chegou o pedido de ácido hialurônico. Já dei entrada no estoque.'
  }]
}, {
  id: 104,
  n: 'Michael Thompson',
  r: 'Psiquiatra',
  m: 'Ok, obrigado!',
  t: '13:20',
  u: 0,
  msgs: [{
    me: true,
    t: '13:18',
    text: 'Michael, a sala 2 fica livre a partir das 14h.'
  }, {
    me: false,
    t: '13:20',
    text: 'Ok, obrigado!'
  }]
}, {
  id: 105,
  n: 'Equipe clínica',
  r: '6 pessoas',
  m: 'Ana: reunião sexta às 18h',
  t: '10:30',
  u: 4,
  msgs: [{
    me: false,
    t: '10:30',
    text: 'Lembrete: reunião de alinhamento sexta às 18h. Pauta: metas de outubro e novo fluxo de anamnese.'
  }]
}];
var nowHM2 = function nowHM2() {
  return BR.agoraHM();
}; // hora atual em Brasília
var circleBtn = {
  width: 40,
  height: 40,
  borderRadius: '50%',
  border: '1.5px solid rgba(214,226,242,.95)',
  background: 'rgba(255,255,255,.7)',
  color: 'var(--text-strong)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  padding: 0
};

/* ===== VERSÃO 01: visual anterior de Mensagens (cards de vidro, bolhas azuis) ===== */
function MensagensV01(_ref) {
  var mobile = _ref.mobile;
  var _React$useState = React.useState('p'),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    tab = _React$useState2[0],
    setTabRaw = _React$useState2[1];
  var _React$useState3 = React.useState(null),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    ficha = _React$useState4[0],
    setFicha = _React$useState4[1];
  var _React$useState5 = React.useState(mobile ? null : 3),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    sel = _React$useState6[0],
    setSel = _React$useState6[1];
  var _React$useState7 = React.useState({}),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    conv = _React$useState8[0],
    setConv = _React$useState8[1];
  var setTab = function setTab(k) {
    setTabRaw(k);
    setSel(mobile ? null : k === 'p' ? 3 : 101);
  };
  var BASE = [{
    me: true,
    t: '10:40',
    text: 'Olá, Dr. Michael Thompson!'
  }, {
    me: false,
    t: '10:39',
    text: 'Olá, Corey Philips. Como posso ajudar hoje?'
  }, {
    me: true,
    t: '10:40',
    text: 'Não estou me sentindo bem há alguns dias. Dores musculares, garganta irritada e um pouco de tosse.'
  }, {
    me: false,
    t: '10:39',
    text: 'Entendo. Está sentindo mais alguma coisa?'
  }];
  var LIST = tab === 'p' ? INBOX : EQUIPE;
  var isTeam = tab === 'd';
  var _React$useState9 = React.useState(''),
    _React$useState0 = _slicedToArray(_React$useState9, 2),
    v = _React$useState0[0],
    setV = _React$useState0[1];
  var cur = LIST.find(function (c) {
    return c.id === sel;
  });
  var msgs = conv[sel] || cur && cur.msgs || BASE;
  var convRef = React.useRef(conv);
  convRef.current = conv;
  var REPLIES = ['Perfeito, obrigada!', 'Combinado, até lá!', 'Pode ser sim. Me confirma o horário?', 'Entendi. Vou ver aqui e já te respondo.'];
  var send = function send() {
    if (!v.trim()) return;
    var id = sel,
      who = cur,
      base = [].concat(_toConsumableArray(msgs), [{
        me: true,
        t: nowHM2(),
        text: v.trim()
      }]);
    setConv(_objectSpread(_objectSpread({}, conv), {}, _defineProperty({}, id, base)));
    setV('');
    setTimeout(function () {
      var txt = REPLIES[Math.floor(Math.random() * REPLIES.length)];
      var now = convRef.current[id] || base;
      setConv(_objectSpread(_objectSpread({}, convRef.current), {}, _defineProperty({}, id, [].concat(_toConsumableArray(now), [{
        me: false,
        t: nowHM2(),
        text: txt
      }]))));
      notifyIncoming(who.n, txt);
    }, 3500);
  };
  var list = /*#__PURE__*/React.createElement("section", {
    style: _objectSpread(_objectSpread({}, glass), {}, {
      padding: '20px 0 0',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(CardTitle, {
    right: /*#__PURE__*/React.createElement("button", {
      type: "button",
      "aria-label": "Nova conversa",
      style: _objectSpread(_objectSpread({}, circleBtn), {}, {
        width: 44,
        height: 44
      })
    }, /*#__PURE__*/React.createElement(MIcon, {
      name: "plus",
      size: 20
    }))
  }, "Caixa de entrada"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      padding: 4,
      borderRadius: 999,
      background: 'rgba(255,255,255,.4)',
      border: '1.5px solid rgba(255,255,255,.95)'
    }
  }, [['p', 'Pacientes'], ['d', 'Equipe']].map(function (_ref2) {
    var _ref3 = _slicedToArray(_ref2, 2),
      k = _ref3[0],
      l = _ref3[1];
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      type: "button",
      onClick: function onClick() {
        return setTab(k);
      },
      style: {
        height: 48,
        borderRadius: 999,
        border: 0,
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 17,
        fontWeight: tab === k ? 600 : 400,
        color: 'var(--text-strong)',
        background: tab === k ? '#fff' : 'transparent',
        boxShadow: tab === k ? '0 4px 12px -6px rgba(23,73,170,.3)' : 'none'
      }
    }, l);
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      scrollbarWidth: 'thin',
      scrollbarColor: 'rgba(150,175,210,.5) transparent',
      marginTop: 10
    }
  }, LIST.map(function (c) {
    var on = c.id === sel;
    return /*#__PURE__*/React.createElement("button", {
      key: c.id,
      type: "button",
      onClick: function onClick() {
        return setSel(c.id);
      },
      style: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '16px 20px',
        border: 0,
        borderTop: on ? 0 : '1px solid rgba(214,226,242,.7)',
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: 'inherit',
        background: on ? 'linear-gradient(180deg,#0B4BEB 0%,#1FA8F5 100%)' : 'transparent',
        color: on ? '#fff' : 'inherit'
      }
    }, /*#__PURE__*/React.createElement(MAv, {
      name: c.n,
      size: 50,
      status: "online"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 17,
        fontWeight: 500,
        color: on ? '#fff' : 'var(--text-strong)'
      }
    }, c.n), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: on ? '#fff' : 'var(--text-strong)'
      }
    }, c.t)), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: on ? 'rgba(255,255,255,.88)' : 'var(--text-body)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, c.m), c.u && !on ? /*#__PURE__*/React.createElement("span", {
      style: {
        minWidth: 22,
        height: 22,
        borderRadius: '50%',
        background: 'linear-gradient(180deg,#1F5EFF,#22C3F2)',
        color: '#fff',
        fontSize: 11,
        lineHeight: '22px',
        textAlign: 'center',
        flexShrink: 0
      }
    }, c.u) : null)));
  })));
  var thread = cur ? /*#__PURE__*/React.createElement("section", {
    style: _objectSpread(_objectSpread({}, glass), {}, {
      padding: 0,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '18px 24px',
      borderBottom: '1px solid rgba(214,226,242,.8)',
      background: 'rgba(255,255,255,.35)'
    }
  }, mobile ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Voltar",
    onClick: function onClick() {
      return setSel(null);
    },
    style: circleBtn
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "arrow-left",
    size: 18
  })) : null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: isTeam,
    onClick: function onClick() {
      return setFicha({
        p: waPaciente(cur),
        conv: waToFicha(msgs),
        key: 'v01c' + cur.id,
        name: cur.n
      });
    },
    title: isTeam ? undefined : 'Abrir ficha do paciente',
    "aria-label": isTeam ? cur.n : 'Abrir ficha de ' + cur.n,
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      border: 0,
      padding: 0,
      background: 'transparent',
      cursor: isTeam ? 'default' : 'pointer',
      textAlign: 'left',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement(MAv, {
    name: cur.n,
    size: 52,
    status: "online"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 20,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, cur.n), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 15,
      color: '#2DBF6A'
    }
  }, cur.r ? cur.r + ' · ' : '', "Online", isTeam ? '' : /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, " \xB7 ver ficha")))), ['phone', 'video', 'ellipsis-vertical'].map(function (i) {
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      "aria-label": i,
      style: {
        border: 0,
        background: 'transparent',
        color: 'var(--text-strong)',
        cursor: 'pointer',
        padding: 6
      }
    }, /*#__PURE__*/React.createElement(MIcon, {
      name: i,
      size: 22
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      scrollbarWidth: 'thin',
      scrollbarColor: 'rgba(150,175,210,.5) transparent',
      padding: mobile ? '18px 14px' : '26px 26px',
      display: 'flex',
      flexDirection: 'column',
      gap: 26
    }
  }, msgs.map(function (m, i) {
    return m.me ? /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 8,
        maxWidth: '62%'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        color: 'var(--text-muted)'
      }
    }, m.t, " ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: 'var(--text-strong)',
        fontWeight: 600,
        marginLeft: 6
      }
    }, "Voc\xEA")), /*#__PURE__*/React.createElement("div", {
      style: {
        padding: '14px 20px',
        borderRadius: '18px 4px 18px 18px',
        background: 'linear-gradient(180deg,#0B4BEB 0%,#1FB6F5 100%)',
        color: '#fff',
        fontSize: 15,
        lineHeight: 1.5,
        boxShadow: '0 10px 24px -14px rgba(11,75,235,.7)'
      }
    }, m.text)), /*#__PURE__*/React.createElement(MAv, {
      name: KIT_USER.name,
      size: 48,
      status: "online"
    })) : /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(MAv, {
      name: cur.n,
      size: 48,
      status: "online"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        maxWidth: '62%'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 17,
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, cur.n, " ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 400,
        color: 'var(--text-muted)',
        marginLeft: 8
      }
    }, m.t)), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        padding: '14px 20px',
        borderRadius: '4px 18px 18px 18px',
        background: 'rgba(255,255,255,.9)',
        color: 'var(--text-strong)',
        fontSize: 15,
        lineHeight: 1.5
      }
    }, m.text, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 14,
        bottom: -12,
        width: 26,
        height: 26,
        borderRadius: '50%',
        background: '#fff',
        boxShadow: '0 2px 6px rgba(23,73,170,.18)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#F5B400'
      }
    }, /*#__PURE__*/React.createElement(MIcon, {
      name: "thumbs-up",
      size: 13,
      strokeWidth: 2.2
    })))));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: mobile ? '0 12px 12px' : '0 26px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 22,
      padding: 2,
      background: 'linear-gradient(90deg,#0B4BEB,#22C3F2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 20,
      background: 'rgba(250,252,255,.97)',
      padding: '16px 18px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "sparkles",
    size: 20,
    color: "#1F5EFF"
  }), /*#__PURE__*/React.createElement("input", {
    value: v,
    onChange: function onChange(e) {
      return setV(e.target.value);
    },
    onKeyDown: function onKeyDown(e) {
      return e.key === 'Enter' && send();
    },
    placeholder: isTeam ? 'Mensagem para ' + cur.n.split(' ')[0] + '...' : 'Enviar mensagem...',
    style: {
      flex: 1,
      border: 0,
      outline: 'none',
      background: 'transparent',
      fontFamily: 'inherit',
      fontSize: 17,
      color: 'var(--text-strong)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, ['paperclip', 'globe', 'camera', 'video'].map(function (i) {
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      "aria-label": i,
      style: _objectSpread(_objectSpread({}, circleBtn), {}, {
        width: 44,
        height: 44
      })
    }, /*#__PURE__*/React.createElement(MIcon, {
      name: i,
      size: 18
    }));
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Enviar",
    onClick: send,
    style: {
      width: 50,
      height: 50,
      borderRadius: '50%',
      border: 0,
      cursor: 'pointer',
      background: 'linear-gradient(180deg,#0B4BEB,#22C3F2)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 18px -8px rgba(11,75,235,.7)'
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "send",
    size: 20
  }))))))) : null;
  var fichaEl = ficha ? /*#__PURE__*/React.createElement(PacienteFicha, {
    key: ficha.p.nome,
    p: ficha.p,
    conversa: ficha.conv,
    chatKey: ficha.key,
    contactName: ficha.name,
    mobile: mobile,
    initialTab: "dados",
    onClose: function onClose() {
      return setFicha(null);
    },
    onUpdate: function onUpdate(np) {
      return setFicha(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          p: np
        });
      });
    }
  }) : null;
  if (mobile) return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 'calc(100vh - 190px)',
      minHeight: 520,
      display: 'flex',
      flexDirection: 'column'
    }
  }, cur ? thread : list), fichaEl);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(300px,440px) minmax(0,1fr)',
      gap: 26,
      height: 'calc(100vh - 170px)',
      minHeight: 620
    }
  }, list, thread), fichaEl);
}

/* =====================================================================
   MENSAGENS · VISUAL WHATSAPP
   Para voltar ao visual anterior ("Versão 01"), troque para 'v01'.
   ===================================================================== */
var MENSAGENS_VERSAO = 'whatsapp';
var WA = {
  bg: '#0b141a',
  panel: '#111b21',
  head: '#202c33',
  field: '#2a3942',
  hover: '#202c33',
  sel: '#2a3942',
  line: '#222d34',
  text: '#e9edef',
  sub: '#8696a0',
  green: '#00a884',
  out: '#005c4b',
  inn: '#202c33',
  blue: '#53bdeb',
  chip: '#0a332c',
  date: '#182229'
};
var WA_DOODLE = function () {
  var s = 'none" stroke="#ffffff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round';
  var svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"220\" height=\"220\" viewBox=\"0 0 220 220\">\n  <path fill=\"".concat(s, "\" d=\"M14 18h26a6 6 0 0 1 6 6v14a6 6 0 0 1-6 6H26l-8 7v-7h-4a6 6 0 0 1-6-6V24a6 6 0 0 1 6-6z\"/>\n  <path fill=\"").concat(s, "\" d=\"M86 20c-6 0-10 5-9 11 1 7 4 18 7 18 2 0 3-5 4-9 1 4 2 9 4 9 3 0 6-11 7-18 1-6-3-11-9-11-1 0-2 1-2 1s-1-1-2-1z\"/>\n  <path fill=\"").concat(s, "\" d=\"M160 16l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1z\"/>\n  <circle fill=\"").concat(s, "\" cx=\"196\" cy=\"34\" r=\"9\"/>\n  <path fill=\"").concat(s, "\" d=\"M30 92c0-8 6-12 12-8 6-4 12 0 12 8 0 8-12 16-12 16s-12-8-12-16z\"/>\n  <path fill=\"").concat(s, "\" d=\"M96 86l6 6m0-6l-6 6M92 80h14v18H92z\"/>\n  <path fill=\"").concat(s, "\" d=\"M140 80c10 0 18 8 18 18m-18-10c5 0 8 4 8 8\"/>\n  <path fill=\"").concat(s, "\" d=\"M186 84c6 8 6 16 0 24m-8-20c3 4 3 10 0 14\"/>\n  <path fill=\"").concat(s, "\" d=\"M22 150h20v24H22zM26 150v-6a6 6 0 0 1 12 0v6\"/>\n  <path fill=\"").concat(s, "\" d=\"M78 148l18 18m0-18l-6 6m-6 6l-6 6M84 142l6 6\"/>\n  <path fill=\"").concat(s, "\" d=\"M130 146a12 12 0 1 0 0 24 12 12 0 1 0 0-24zm-4 8l8 4-8 4z\"/>\n  <path fill=\"").concat(s, "\" d=\"M176 140v30m-10-20l10-10 10 10m-20 22h20\"/>\n  <path fill=\"").concat(s, "\" d=\"M40 200l6-12 6 12m-10-4h8\"/>\n  <path fill=\"").concat(s, "\" d=\"M100 196c4-8 12-8 16 0s12 8 16 0\"/>\n  <path fill=\"").concat(s, "\" d=\"M168 190h22m-11-11v22\"/>\n</svg>");
  return 'url("data:image/svg+xml,' + encodeURIComponent(svg) + '")';
}();
function WaTicks(_ref4) {
  var s = _ref4.s;
  if (!s) return null;
  var c = s === 'read' ? WA.blue : WA.sub;
  if (s === 'sent') return /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "11",
    viewBox: "0 0 12 11",
    "aria-label": "Enviada",
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 6l3.2 3.2L11 2",
    fill: "none",
    stroke: c,
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
  return /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "11",
    viewBox: "0 0 16 11",
    "aria-label": s === 'read' ? 'Lida' : 'Entregue',
    style: {
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1 6l3.2 3.2L11 2M6.5 8.6l.7.6L14 2",
    fill: "none",
    stroke: c,
    strokeWidth: "1.6",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}
var waIcon = function waIcon(name, label, onClick) {
  var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 22;
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": label,
    title: label,
    onClick: onClick,
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      border: 0,
      background: 'transparent',
      color: WA.sub,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: name,
    size: size
  }));
};
function WaBubble(_ref5) {
  var m = _ref5.m,
    first = _ref5.first;
  var out = m.me;
  var bg = out ? WA.out : WA.inn;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: out ? 'flex-end' : 'flex-start',
      padding: out ? '0 0 0 12%' : '0 12% 0 0',
      marginTop: first ? 10 : 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      maxWidth: '100%',
      padding: '6px 9px 8px 9px',
      borderRadius: 8,
      borderTopRightRadius: out && first ? 0 : 8,
      borderTopLeftRadius: !out && first ? 0 : 8,
      background: bg,
      color: WA.text,
      fontSize: 14.2,
      lineHeight: '19px',
      boxShadow: '0 1px .5px rgba(11,20,26,.13)',
      wordBreak: 'break-word'
    }
  }, first ? /*#__PURE__*/React.createElement("span", {
    style: _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
      position: 'absolute',
      top: 0
    }, out ? 'right' : 'left', -8), "width", 0), "height", 0), "borderTop", "0 solid transparent"), "borderBottom", '13px solid transparent'), out ? 'borderLeft' : 'borderRight', "8px solid ".concat(bg))
  }) : null, m.ia ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 12.5,
      fontWeight: 600,
      color: '#a78bfa',
      marginBottom: 2
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "sparkles",
    size: 12
  }), "Renata IA") : null, m.who ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 12.8,
      fontWeight: 600,
      color: '#53bdeb',
      marginBottom: 2
    }
  }, m.who) : null, /*#__PURE__*/React.createElement("span", null, m.text), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: out ? 64 : 46
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 8,
      bottom: 4,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 3,
      fontSize: 11,
      color: out ? 'rgba(233,237,239,.6)' : WA.sub
    }
  }, m.t, out ? /*#__PURE__*/React.createElement(WaTicks, {
    s: m.s || 'read'
  }) : null)));
}

/* =====================================================================
   CHAT WHATSAPP COMPARTILHADO
   O mesmo chat aparece em Mensagens e na aba Conversa da ficha do paciente.
   Responder citando, reagir, copiar, apagar, arquivos, fotos, áudio,
   emojis e figurinhas.
   ===================================================================== */
var CHAT_STORE = makeStore({});
var CHAT_TYPING = makeStore({});
var waUid = function waUid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
};
function chatGet(key, seed) {
  if (!CHAT_STORE.v[key]) CHAT_STORE.v = _objectSpread(_objectSpread({}, CHAT_STORE.v), {}, _defineProperty({}, key, (typeof seed === 'function' ? seed() : seed || []).map(function (m) {
    return _objectSpread({
      id: m.id || waUid()
    }, m);
  })));
  return CHAT_STORE.v[key];
}
var CHAT_TOUCHED = {};
function chatSet(key, fn) {
  CHAT_TOUCHED[key] = true;
  var cur = CHAT_STORE.v[key] || [];
  CHAT_STORE.v = _objectSpread(_objectSpread({}, CHAT_STORE.v), {}, _defineProperty({}, key, fn(cur)));
  CHAT_STORE.subs.forEach(function (f) {
    return f();
  });
}
function chatTyping(key, on) {
  CHAT_TYPING.v = _objectSpread(_objectSpread({}, CHAT_TYPING.v), {}, _defineProperty({}, key, on));
  CHAT_TYPING.subs.forEach(function (f) {
    return f();
  });
}
var WA_REPLIES = ['Perfeito, obrigada!', 'Combinado, até lá!', 'Pode ser sim. Me confirma o horário?', 'Entendi. Vou ver aqui e já te respondo.', 'Recebi aqui, obrigada!'];
function chatSend(key, msg, who) {
  var mine = _objectSpread({
    id: waUid(),
    me: true,
    t: nowHM2(),
    s: 'sent'
  }, msg);
  chatSet(key, function (l) {
    return [].concat(_toConsumableArray(l), [mine]);
  });
  var mark = function mark(s) {
    return chatSet(key, function (l) {
      return l.map(function (x) {
        return x.me && !x.deleted && (x.id === mine.id || s === 'read') && x.s !== 'read' ? _objectSpread(_objectSpread({}, x), {}, {
          s: s
        }) : x;
      });
    });
  };
  setTimeout(function () {
    return mark('delivered');
  }, 900);
  setTimeout(function () {
    mark('read');
    chatTyping(key, true);
  }, 1800);
  setTimeout(function () {
    var txt = msg.kind === 'audio' ? 'Ouvi seu áudio, obrigada!' : msg.kind === 'image' ? 'Que ótimo, recebi a foto!' : msg.kind === 'file' ? 'Recebi o arquivo, obrigada!' : WA_REPLIES[Math.floor(Math.random() * WA_REPLIES.length)];
    chatTyping(key, false);
    chatSet(key, function (l) {
      return [].concat(_toConsumableArray(l), [{
        id: waUid(),
        me: false,
        t: nowHM2(),
        text: txt
      }]);
    });
    if (who) notifyIncoming(who, txt);
  }, 3800);
}
var waPreview = function waPreview(m) {
  return !m ? '' : m.deleted ? 'Mensagem apagada' : m.kind === 'image' ? '📷 ' + (m.text || 'Foto') : m.kind === 'video' ? '🎥 ' + (m.text || 'Vídeo') : m.kind === 'audio' ? '🎤 Áudio ' + waDur(m.dur) : m.kind === 'file' ? '📄 ' + m.name : m.kind === 'sticker' ? '🏷️ Figurinha' : m.text;
};
var waDur = function waDur(s) {
  s = Math.max(0, Math.round(s || 0));
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
};
var waSize = function waSize(b) {
  return b > 1048576 ? (b / 1048576).toFixed(1).replace('.', ',') + ' MB' : Math.max(1, Math.round(b / 1024)) + ' kB';
};
var WA_EMOJIS = ['😀', '😂', '😊', '😍', '🥰', '😉', '😎', '🤩', '😅', '🤔', '😮', '😢', '🙏', '👏', '👍', '👌', '💪', '🙌', '❤️', '💙', '✨', '🔥', '🎉', '💐', '💉', '🦷', '💆‍♀️', '💅', '📅', '⏰', '✅', '❌', '📍', '📞', '💬', '📷'];
var WA_REACTS = ['👍', '❤️', '😂', '😮', '😢', '🙏'];
function waSticker(e, t, c) {
  var svg = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"200\" viewBox=\"0 0 200 200\"><defs><filter id=\"s\" x=\"-20%\" y=\"-20%\" width=\"140%\" height=\"140%\"><feDropShadow dx=\"0\" dy=\"3\" stdDeviation=\"3.5\" flood-color=\"#000\" flood-opacity=\".35\"/></filter></defs><g filter=\"url(#s)\"><circle cx=\"100\" cy=\"84\" r=\"66\" fill=\"#fff\"/><circle cx=\"100\" cy=\"84\" r=\"58\" fill=\"".concat(c, "\"/><text x=\"100\" y=\"110\" font-size=\"72\" text-anchor=\"middle\" font-family=\"Apple Color Emoji,Segoe UI Emoji,Noto Color Emoji,sans-serif\">").concat(e, "</text><g transform=\"rotate(-5 100 162)\"><rect x=\"18\" y=\"140\" width=\"164\" height=\"44\" rx=\"22\" fill=\"#fff\"/><rect x=\"24\" y=\"145\" width=\"152\" height=\"34\" rx=\"17\" fill=\"#0B3FD9\"/><text x=\"100\" y=\"169\" font-size=\"21\" font-weight=\"800\" text-anchor=\"middle\" fill=\"#fff\" font-family=\"Arial, Helvetica, sans-serif\">").concat(t, "</text></g></g></svg>");
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}
var WA_STICKERS = [['🙏', 'Obrigada!', '#E7F0FF'], ['✅', 'Agendado!', '#E6F8EE'], ['👋', 'Até já!', '#FFF3DD'], ['☀️', 'Bom dia!', '#FFF7CC'], ['😍', 'Que lindo!', '#FFE7EF'], ['🤝', 'Combinado', '#EAF2FD'], ['💙', 'Te espero!', '#E3EEFF'], ['✨', 'Resultado top!', '#F1E9FF']].map(function (_ref7, i) {
  var _ref8 = _slicedToArray(_ref7, 3),
    e = _ref8[0],
    t = _ref8[1],
    c = _ref8[2];
  return {
    id: 'st' + i,
    url: waSticker(e, t, c),
    label: t
  };
});
var waBars = function waBars(seed) {
  var x = 0;
  var _iterator = _createForOfIteratorHelper(String(seed)),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var ch = _step.value;
      x = (x * 31 + ch.charCodeAt(0)) % 9973;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return Array.from({
    length: 30
  }, function (_, i) {
    x = (x * 9301 + 49297) % 233280;
    return 0.25 + 0.75 * Math.abs(Math.sin(i * 0.7 + x / 233280 * 6));
  });
};
function WaAudio(_ref9) {
  var m = _ref9.m,
    out = _ref9.out;
  var ref = React.useRef(null);
  var _React$useState1 = React.useState(false),
    _React$useState10 = _slicedToArray(_React$useState1, 2),
    play = _React$useState10[0],
    setPlay = _React$useState10[1],
    _React$useState11 = React.useState(0),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    pos = _React$useState12[0],
    setPos = _React$useState12[1],
    _React$useState13 = React.useState(m.dur || 0),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    dur = _React$useState14[0],
    setDur = _React$useState14[1],
    _React$useState15 = React.useState(false),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    heard = _React$useState16[0],
    setHeard = _React$useState16[1];
  var bars = React.useMemo(function () {
    return waBars(m.id);
  }, [m.id]);
  var toggle = function toggle() {
    var a = ref.current;
    if (!a) return;
    if (a.paused) {
      a.play()["catch"](function () {});
    } else a.pause();
  };
  var pct = dur ? pos / dur : 0;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      width: 'min(300px, 62vw)',
      padding: '4px 2px 14px'
    }
  }, /*#__PURE__*/React.createElement("audio", {
    ref: ref,
    src: m.url,
    preload: "metadata",
    onLoadedMetadata: function onLoadedMetadata(e) {
      if (isFinite(e.target.duration) && e.target.duration) setDur(e.target.duration);
    },
    onTimeUpdate: function onTimeUpdate(e) {
      return setPos(e.target.currentTime);
    },
    onPlay: function onPlay() {
      setPlay(true);
      setHeard(true);
    },
    onPause: function onPause() {
      return setPlay(false);
    },
    onEnded: function onEnded() {
      setPlay(false);
      setPos(0);
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: 44,
      height: 44,
      borderRadius: '50%',
      background: out ? '#0b7a63' : '#2a3942',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      color: '#d1d7db'
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "mic",
    size: 20
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: -2,
      bottom: -2,
      width: 18,
      height: 18,
      borderRadius: '50%',
      background: out ? WA.out : WA.inn,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: heard ? WA.blue : WA.sub
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "mic",
    size: 11
  }))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": play ? 'Pausar áudio' : 'Ouvir áudio',
    onClick: toggle,
    style: {
      border: 0,
      background: 'transparent',
      color: '#d1d7db',
      cursor: 'pointer',
      padding: 0,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: play ? 'pause' : 'play',
    size: 24
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      height: 26,
      cursor: 'pointer'
    },
    onClick: function onClick(e) {
      var r = e.currentTarget.getBoundingClientRect();
      var a = ref.current;
      if (a && dur) {
        a.currentTime = (e.clientX - r.left) / r.width * dur;
      }
    }
  }, bars.map(function (h, i) {
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        flex: 1,
        height: Math.round(h * 24),
        borderRadius: 2,
        background: i / bars.length <= pct ? heard ? WA.blue : '#d1d7db' : 'rgba(209,215,219,.45)'
      }
    });
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      color: out ? 'rgba(233,237,239,.6)' : WA.sub
    }
  }, waDur(play || pos ? pos : dur))));
}
function WaMsg(_ref0) {
  var m = _ref0.m,
    first = _ref0.first,
    onMenu = _ref0.onMenu,
    menuOpen = _ref0.menuOpen,
    flash = _ref0.flash,
    contactName = _ref0.contactName,
    onQuote = _ref0.onQuote,
    onOpenImg = _ref0.onOpenImg,
    menuUp = _ref0.menuUp;
  var out = m.me;
  var bg = out ? WA.out : WA.inn;
  var pressRef = React.useRef(null);
  var sticker = m.kind === 'sticker' && !m.deleted;
  var media = (m.kind === 'image' || m.kind === 'video') && !m.deleted;
  var time = /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 3,
      fontSize: 11,
      color: media && !m.text ? '#fff' : out ? 'rgba(233,237,239,.6)' : WA.sub
    }
  }, m.t, out && !m.deleted ? /*#__PURE__*/React.createElement(WaTicks, {
    s: m.s || 'read'
  }) : null);
  var startPress = function startPress() {
    clearTimeout(pressRef.current);
    pressRef.current = setTimeout(function () {
      return onMenu(m.id);
    }, 450);
  };
  var endPress = function endPress() {
    return clearTimeout(pressRef.current);
  };
  return /*#__PURE__*/React.createElement("div", {
    id: 'wam-' + m.id,
    style: {
      display: 'flex',
      justifyContent: out ? 'flex-end' : 'flex-start',
      padding: out ? '0 0 0 12%' : '0 12% 0 0',
      marginTop: first ? 10 : 2,
      marginBottom: m.react ? 14 : 0,
      transition: 'background .4s',
      background: flash ? 'rgba(0,168,132,.18)' : 'transparent',
      borderRadius: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "wa-bub",
    onContextMenu: function onContextMenu(e) {
      e.preventDefault();
      onMenu(m.id);
    },
    onPointerDown: startPress,
    onPointerUp: endPress,
    onPointerLeave: endPress,
    onPointerMove: endPress,
    style: {
      position: 'relative',
      maxWidth: '100%',
      padding: sticker ? 0 : media ? 3 : '6px 9px 8px 9px',
      borderRadius: 8,
      borderTopRightRadius: out && first && !sticker ? 0 : 8,
      borderTopLeftRadius: !out && first && !sticker ? 0 : 8,
      background: sticker ? 'transparent' : bg,
      color: WA.text,
      fontSize: 14.2,
      lineHeight: '19px',
      boxShadow: sticker ? 'none' : '0 1px .5px rgba(11,20,26,.13)',
      wordBreak: 'break-word',
      WebkitUserSelect: 'text',
      userSelect: 'text'
    }
  }, first && !sticker ? /*#__PURE__*/React.createElement("span", {
    style: _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
      position: 'absolute',
      top: 0
    }, out ? 'right' : 'left', -8), "width", 0), "height", 0), "borderBottom", '13px solid transparent'), out ? 'borderLeft' : 'borderRight', "8px solid ".concat(bg))
  }) : null, !m.deleted ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "wa-chev",
    "aria-label": "Op\xE7\xF5es da mensagem",
    onClick: function onClick(e) {
      e.stopPropagation();
      onMenu(menuOpen ? null : m.id);
    },
    style: {
      position: 'absolute',
      top: 1,
      right: 2,
      zIndex: 2,
      width: 26,
      height: 20,
      opacity: menuOpen ? 1 : undefined,
      border: 0,
      borderRadius: 6,
      cursor: 'pointer',
      color: sticker || media ? '#fff' : WA.sub,
      background: sticker || media ? 'rgba(0,0,0,.35)' : "linear-gradient(90deg, transparent, ".concat(bg, " 40%)"),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 3px'
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "chevron-down",
    size: 17
  })) : null, m.ia ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 12.5,
      fontWeight: 600,
      color: '#a78bfa',
      marginBottom: 2
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "sparkles",
    size: 12
  }), "Renata IA") : null, m.who ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 12.8,
      fontWeight: 600,
      color: '#53bdeb',
      marginBottom: 2
    }
  }, m.who) : null, m.reply && !m.deleted ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return onQuote(m.reply.id);
    },
    style: {
      display: 'block',
      width: '100%',
      textAlign: 'left',
      border: 0,
      cursor: 'pointer',
      margin: media ? '0 0 3px' : '0 0 5px',
      padding: '5px 8px 6px 9px',
      borderRadius: 6,
      borderLeft: "4px solid ".concat(m.reply.me ? '#06cf9c' : '#53bdeb'),
      background: 'rgba(0,0,0,.18)',
      color: WA.text,
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 12.8,
      fontWeight: 600,
      color: m.reply.me ? '#06cf9c' : '#53bdeb'
    }
  }, m.reply.me ? 'Você' : contactName), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      color: 'rgba(233,237,239,.75)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: 260
    }
  }, m.reply.prev)) : null, m.deleted ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontStyle: 'italic',
      color: 'rgba(233,237,239,.6)'
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "ban",
    size: 15
  }), out ? 'Você apagou esta mensagem' : 'Esta mensagem foi apagada') : sticker ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: m.url,
    alt: m.label || 'Figurinha',
    style: {
      width: 150,
      height: 150,
      display: 'block'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 4,
      bottom: 4,
      padding: '1px 6px',
      borderRadius: 8,
      background: 'rgba(11,20,26,.6)'
    }
  }, time)) : m.kind === 'image' ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: m.url,
    alt: m.name || 'Foto',
    onClick: function onClick() {
      return onOpenImg(m);
    },
    style: {
      display: 'block',
      maxWidth: 'min(300px, 62vw)',
      maxHeight: 340,
      borderRadius: 6,
      cursor: 'zoom-in',
      objectFit: 'cover'
    }
  }), m.text ? null : /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 6,
      bottom: 5,
      padding: '1px 6px',
      borderRadius: 8,
      background: 'rgba(11,20,26,.45)'
    }
  }, time)) : m.kind === 'video' ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("video", {
    src: m.url,
    controls: true,
    style: {
      display: 'block',
      maxWidth: 'min(300px, 62vw)',
      maxHeight: 340,
      borderRadius: 6
    }
  })) : m.kind === 'audio' ? /*#__PURE__*/React.createElement(WaAudio, {
    m: m,
    out: out
  }) : m.kind === 'file' ? /*#__PURE__*/React.createElement("a", {
    href: m.url,
    download: m.name,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      width: 'min(300px, 62vw)',
      padding: '8px 10px',
      margin: '0 0 14px',
      borderRadius: 6,
      background: 'rgba(0,0,0,.18)',
      color: WA.text,
      textDecoration: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 40,
      borderRadius: 4,
      background: /pdf$/i.test(m.name) ? '#e5484d' : '#53bdeb',
      color: '#fff',
      fontSize: 10,
      fontWeight: 700,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      paddingBottom: 5,
      boxSizing: 'border-box',
      flexShrink: 0
    }
  }, (m.name.split('.').pop() || 'ARQ').slice(0, 4).toUpperCase()), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 14,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, m.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: WA.sub
    }
  }, (m.name.split('.').pop() || '').toUpperCase(), " \xB7 ", waSize(m.size || 0))), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 32,
      borderRadius: '50%',
      border: "1.5px solid ".concat(WA.sub),
      color: WA.sub,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "download",
    size: 15
  }))) : null, !m.deleted && m.text && (m.kind === 'image' || m.kind === 'video') ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      padding: '5px 6px 2px'
    }
  }, m.text, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: out ? 64 : 46
    }
  })) : null, !m.deleted && (!m.kind || m.kind === 'text') ? /*#__PURE__*/React.createElement("span", {
    style: {
      whiteSpace: 'pre-wrap'
    }
  }, m.text) : null, !sticker && !(m.kind === 'image' && !m.text) ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: !m.kind || m.kind === 'text' || m.deleted ? out ? 64 : 46 : 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 8,
      bottom: 4
    }
  }, time)) : null, m.react ? /*#__PURE__*/React.createElement("span", {
    style: _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
      position: 'absolute',
      bottom: -16
    }, out ? 'right' : 'left', 8), "padding", '1px 5px'), "borderRadius", 999), "background", WA.inn), "border", "2px solid ".concat(WA.bg)), "fontSize", 14), "lineHeight", '18px')
  }, m.react) : null, menuOpen ? /*#__PURE__*/React.createElement(WaMenu, {
    m: m,
    up: menuUp,
    out: out,
    onClose: function onClose() {
      return onMenu(null);
    }
  }) : null));
}
var __waMenuAct = null;
function WaMenu(_ref11) {
  var m = _ref11.m,
    up = _ref11.up,
    out = _ref11.out,
    onClose = _ref11.onClose;
  React.useEffect(function () {
    var k = function k(e) {
      if (!e.target.closest || !e.target.closest('[data-wamenu]')) onClose();
    };
    setTimeout(function () {
      return document.addEventListener('pointerdown', k);
    }, 0);
    return function () {
      return document.removeEventListener('pointerdown', k);
    };
  }, []);
  var item = function item(icon, label, act) {
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: function onClick() {
        __waMenuAct(act, m);
        onClose();
      },
      style: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '9px 16px',
        border: 0,
        background: 'transparent',
        color: WA.text,
        fontFamily: 'inherit',
        fontSize: 14.5,
        cursor: 'pointer',
        textAlign: 'left'
      },
      onMouseEnter: function onMouseEnter(e) {
        e.currentTarget.style.background = WA.field;
      },
      onMouseLeave: function onMouseLeave(e) {
        e.currentTarget.style.background = 'transparent';
      }
    }, /*#__PURE__*/React.createElement(MIcon, {
      name: icon,
      size: 17
    }), label);
  };
  return /*#__PURE__*/React.createElement("div", {
    "data-wamenu": "1",
    onPointerDown: function onPointerDown(e) {
      return e.stopPropagation();
    },
    style: _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
      position: 'absolute',
      zIndex: 20
    }, up ? 'bottom' : 'top', up ? '100%' : 26), out ? 'right' : 'left', 0), "width", 210), "padding", '6px 0'), "borderRadius", 12), "background", '#233138'), "boxShadow", '0 12px 30px rgba(0,0,0,.45)'), "margin", up ? '0 0 6px' : 0)
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-around',
      padding: '4px 8px 8px',
      borderBottom: "1px solid ".concat(WA.line)
    }
  }, WA_REACTS.map(function (r) {
    return /*#__PURE__*/React.createElement("button", {
      key: r,
      type: "button",
      "aria-label": 'Reagir com ' + r,
      onClick: function onClick() {
        __waMenuAct('react', m, r);
        onClose();
      },
      style: {
        border: 0,
        background: m.react === r ? WA.field : 'transparent',
        borderRadius: '50%',
        width: 30,
        height: 30,
        fontSize: 19,
        cursor: 'pointer',
        padding: 0
      }
    }, r);
  })), item('reply', 'Responder', 'reply'), m.kind === 'text' || !m.kind ? item('copy', 'Copiar', 'copy') : null, m.kind === 'image' || m.kind === 'file' || m.kind === 'audio' || m.kind === 'video' ? item('download', 'Baixar', 'download') : null, item('trash-2', out ? 'Apagar para todos' : 'Apagar para mim', 'delete'));
}
/* câmera do computador: abre a webcam e tira a foto, como no WhatsApp Web */
function WaCamera(_ref) {
  var onFoto = _ref.onFoto,
    onClose = _ref.onClose,
    onFalha = _ref.onFalha;
  var vid = React.useRef(null),
    strm = React.useRef(null);
  var _st = React.useState(false),
    pronta = _st[0],
    setPronta = _st[1];
  React.useEffect(function () {
    var vivo = true;
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'user'
      },
      audio: false
    }).then(function (st) {
      if (!vivo) return st.getTracks().forEach(function (t) {
        return t.stop();
      });
      strm.current = st;
      if (vid.current) {
        vid.current.srcObject = st;
        vid.current.play()["catch"](function () {});
      }
      setPronta(true);
    }, function () {
      if (vivo) onFalha();
    });
    var esc = function esc(e) {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', esc);
    return function () {
      vivo = false;
      window.removeEventListener('keydown', esc);
      if (strm.current) strm.current.getTracks().forEach(function (t) {
        return t.stop();
      });
    };
  }, []);
  var tirar = function tirar() {
    var v = vid.current;
    if (!v || !v.videoWidth) return;
    var c = document.createElement('canvas');
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    c.getContext('2d').drawImage(v, 0, 0);
    c.toBlob(function (b) {
      if (b) onFoto(b);
    }, 'image/jpeg', 0.9);
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-label": "C\xE2mera",
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 20,
      background: '#0b141a',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      padding: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Fechar c\xE2mera",
    onClick: onClose,
    style: {
      position: 'absolute',
      top: 12,
      left: 12,
      width: 40,
      height: 40,
      borderRadius: '50%',
      border: 0,
      background: 'transparent',
      color: '#e9edef',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "x",
    size: 22
  })), /*#__PURE__*/React.createElement("video", {
    ref: vid,
    muted: true,
    playsInline: true,
    style: {
      maxWidth: '100%',
      maxHeight: 'calc(100% - 100px)',
      borderRadius: 12,
      background: '#000',
      transform: 'scaleX(-1)'
    }
  }), pronta ? null : /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#8696a0',
      fontSize: 14
    }
  }, "Permita o acesso \xE0 c\xE2mera no navegador..."), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Tirar foto",
    title: "Tirar foto",
    disabled: !pronta,
    onClick: tirar,
    style: {
      width: 64,
      height: 64,
      borderRadius: '50%',
      border: '4px solid #e9edef',
      background: pronta ? '#00a884' : '#374248',
      color: '#fff',
      cursor: pronta ? 'pointer' : 'default',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "camera",
    size: 26
  })));
}
function WaChat(_ref13) {
  var chatKey = _ref13.chatKey,
    seed = _ref13.seed,
    contactName = _ref13.contactName,
    notice = _ref13.notice,
    mobile = _ref13.mobile,
    height = _ref13.height,
    style = _ref13.style;
  var _useStore = useStore(CHAT_STORE),
    _useStore2 = _slicedToArray(_useStore, 1),
    all = _useStore2[0];
  var _useStore3 = useStore(CHAT_TYPING),
    _useStore4 = _slicedToArray(_useStore3, 1),
    typingMap = _useStore4[0];
  var msgs = all[chatKey] || (SB_ON ? [] : chatGet(chatKey, seed));
  var typing = !!typingMap[chatKey];
  React.useEffect(function () {
    if (SB_ON) abrirChat(chatKey);
  }, [chatKey]);
  var _React$useState17 = React.useState(''),
    _React$useState18 = _slicedToArray(_React$useState17, 2),
    v = _React$useState18[0],
    setV = _React$useState18[1];
  var _React$useState19 = React.useState(null),
    _React$useState20 = _slicedToArray(_React$useState19, 2),
    reply = _React$useState20[0],
    setReply = _React$useState20[1];
  var _React$useState21 = React.useState(null),
    _React$useState22 = _slicedToArray(_React$useState21, 2),
    menu = _React$useState22[0],
    setMenu = _React$useState22[1];
  var _React$useState23 = React.useState(null),
    _React$useState24 = _slicedToArray(_React$useState23, 2),
    panel = _React$useState24[0],
    setPanel = _React$useState24[1];
  var _React$useState25 = React.useState('emoji'),
    _React$useState26 = _slicedToArray(_React$useState25, 2),
    ptab = _React$useState26[0],
    setPtab = _React$useState26[1];
  var _React$useState27 = React.useState(false),
    _React$useState28 = _slicedToArray(_React$useState27, 2),
    attach = _React$useState28[0],
    setAttach = _React$useState28[1];
  var _React$useState29 = React.useState(null),
    _React$useState30 = _slicedToArray(_React$useState29, 2),
    preview = _React$useState30[0],
    setPreview = _React$useState30[1];
  var _React$useState31 = React.useState(null),
    _React$useState32 = _slicedToArray(_React$useState31, 2),
    viewer = _React$useState32[0],
    setViewer = _React$useState32[1];
  var _React$useState33 = React.useState(null),
    _React$useState34 = _slicedToArray(_React$useState33, 2),
    flash = _React$useState34[0],
    setFlash = _React$useState34[1];
  var _React$useState35 = React.useState(null),
    _React$useState36 = _slicedToArray(_React$useState35, 2),
    rec = _React$useState36[0],
    setRec = _React$useState36[1];
  var _React$useState37 = React.useState(null),
    _React$useState38 = _slicedToArray(_React$useState37, 2),
    note = _React$useState38[0],
    setNote = _React$useState38[1];
  var _camSt = React.useState(false),
    cam = _camSt[0],
    setCam = _camSt[1];
  var endRef = React.useRef(null),
    inpRef = React.useRef(null),
    fileRef = React.useRef(null),
    recRef = React.useRef(null);
  React.useEffect(function () {
    var go = function go() {
      return endRef.current && endRef.current.scrollIntoView({
        block: 'end'
      });
    };
    go();
    var t = setTimeout(go, 80);
    return function () {
      return clearTimeout(t);
    };
  }, [chatKey, msgs.length, typing]);
  React.useEffect(function () {
    return function () {
      var r = recRef.current;
      if (r) {
        try {
          r.mr.state !== 'inactive' && r.mr.stop();
        } catch (e) {}
        r.stream.getTracks().forEach(function (t) {
          return t.stop();
        });
        clearInterval(r.iv);
      }
    };
  }, []);
  React.useEffect(function () {
    if (!note) return;
    var t = setTimeout(function () {
      return setNote(null);
    }, 4500);
    return function () {
      return clearTimeout(t);
    };
  }, [note]);
  var replyOf = function replyOf() {
    return reply ? {
      reply: {
        id: reply.id,
        me: reply.me,
        prev: waPreview(reply)
      }
    } : {};
  };
  var send = function send(msg) {
    if (SB_ON) MsgSvc.enviar(chatKey, _objectSpread(_objectSpread({}, msg), replyOf()), contactName);else chatSend(chatKey, _objectSpread(_objectSpread({}, msg), replyOf()), contactName);
    setReply(null);
  };
  var sendText = function sendText() {
    var t = v.trim();
    if (!t) return;
    send({
      kind: 'text',
      text: t
    });
    setV('');
    setPanel(null);
  };
  __waMenuAct = function __waMenuAct(act, m, r) {
    if (act === 'reply') {
      setReply(m);
      setTimeout(function () {
        return inpRef.current && inpRef.current.focus();
      }, 0);
    }
    if (act === 'copy') {
      try {
        navigator.clipboard && navigator.clipboard.writeText(m.text || '');
      } catch (e) {}
      setNote('Mensagem copiada');
    }
    if (act === 'react') {
      if (SB_ON) MsgSvc.reagir(chatKey, m, r);else chatSet(chatKey, function (l) {
        return l.map(function (x) {
          return x.id === m.id ? _objectSpread(_objectSpread({}, x), {}, {
            react: x.react === r ? null : r
          }) : x;
        });
      });
    }
    if (act === 'delete') {
      if (SB_ON) MsgSvc.apagar(chatKey, m);else chatSet(chatKey, function (l) {
        return l.map(function (x) {
          return x.id === m.id ? _objectSpread(_objectSpread({}, x), {}, {
            deleted: true,
            react: null
          }) : x;
        });
      });
    }
    if (act === 'download' && m.url) {
      var a = document.createElement('a');
      a.href = m.url;
      a.download = m.name || 'arquivo';
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };
  var quote = function quote(id) {
    var el = document.getElementById('wam-' + id);
    if (el) {
      el.scrollIntoView({
        block: 'center',
        behavior: 'smooth'
      });
      setFlash(id);
      setTimeout(function () {
        return setFlash(null);
      }, 1200);
    }
  };
  var pick = function pick(accept, capture) {
    var i = fileRef.current;
    if (!i) return;
    i.accept = accept;
    if (capture) i.setAttribute('capture', 'environment');else i.removeAttribute('capture');
    i.value = '';
    i.click();
    setAttach(false);
  };
  var onFiles = function onFiles(files) {
    var list = Array.from(files || []);
    if (!list.length) return;
    var f = list[0],
      url = URL.createObjectURL(f);
    if (/^image\//.test(f.type) || /^video\//.test(f.type)) {
      setPreview({
        kind: /^image\//.test(f.type) ? 'image' : 'video',
        url: url,
        name: f.name,
        size: f.size,
        cap: v
      });
      setV('');
      return;
    }
    if (/^audio\//.test(f.type)) {
      send({
        kind: 'audio',
        url: url,
        name: f.name,
        size: f.size,
        dur: 0
      });
      return;
    }
    send({
      kind: 'file',
      url: url,
      name: f.name,
      size: f.size
    });
  };
  var startRec = /*#__PURE__*/function () {
    var _ref14 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var c, mr, chunks, t0, r, _t, _t2;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            if (!(typeof rnMicCheck === 'function')) {
              _context.n = 2;
              break;
            }
            _context.n = 1;
            return rnMicCheck(true);
          case 1:
            _t = _context.v;
            _context.n = 3;
            break;
          case 2:
            _t = {
              ok: false,
              why: 'frame'
            };
          case 3:
            c = _t;
            if (c.ok) {
              _context.n = 4;
              break;
            }
            setNote(typeof RN_MIC_MSG !== 'undefined' && RN_MIC_MSG[c.why] || 'Não consegui acessar o microfone.');
            return _context.a(2);
          case 4:
            _context.p = 4;
            mr = new MediaRecorder(c.stream);
            _context.n = 6;
            break;
          case 5:
            _context.p = 5;
            _t2 = _context.v;
            c.stream.getTracks().forEach(function (t) {
              return t.stop();
            });
            setNote('Este navegador não grava áudio.');
            return _context.a(2);
          case 6:
            chunks = [];
            mr.ondataavailable = function (e) {
              if (e.data && e.data.size) chunks.push(e.data);
            };
            t0 = Date.now();
            r = {
              mr: mr,
              stream: c.stream,
              chunks: chunks,
              t0: t0,
              iv: setInterval(function () {
                return setRec(function (x) {
                  return x ? _objectSpread(_objectSpread({}, x), {}, {
                    s: (Date.now() - t0) / 1000
                  }) : x;
                });
              }, 250)
            };
            recRef.current = r;
            mr.start();
            setRec({
              s: 0
            });
            setPanel(null);
            setAttach(false);
          case 7:
            return _context.a(2);
        }
      }, _callee, null, [[4, 5]]);
    }));
    return function startRec() {
      return _ref14.apply(this, arguments);
    };
  }();
  var stopRec = function stopRec(doSend) {
    var r = recRef.current;
    if (!r) return;
    recRef.current = null;
    clearInterval(r.iv);
    setRec(null);
    r.mr.onstop = function () {
      r.stream.getTracks().forEach(function (t) {
        return t.stop();
      });
      if (!doSend) return;
      var type = r.mr.mimeType || 'audio/webm';
      var blob = new Blob(r.chunks, {
        type: type
      });
      send({
        kind: 'audio',
        url: URL.createObjectURL(blob),
        dur: (Date.now() - r.t0) / 1000,
        size: blob.size,
        name: 'audio.' + (/mp4|aac/.test(type) ? 'm4a' : 'webm')
      });
    };
    try {
      r.mr.stop();
    } catch (e) {}
  };
  var ic = function ic(name, label, onClick, active) {
    var size = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 24;
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      "aria-label": label,
      title: label,
      onClick: onClick,
      style: {
        width: 40,
        height: 40,
        borderRadius: '50%',
        border: 0,
        background: active ? WA.field : 'transparent',
        color: active ? WA.green : WA.sub,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(MIcon, {
      name: name,
      size: size
    }));
  };
  var ATT = [['file-text', 'Documento', '#7f66ff', function () {
    return pick('*/*');
  }], ['image', 'Fotos e vídeos', '#007bfc', function () {
    return pick('image/*,video/*');
  }], ['camera', 'Câmera', '#ff2e74', function () {
    // celular: abre a câmera do aparelho; computador: abre a webcam aqui mesmo
    var toque = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    if (!toque && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setAttach(false);
      setPanel(null);
      return setCam(true);
    }
    return pick('image/*', true);
  }], ['headphones', 'Áudio', '#fa6533', function () {
    return pick('audio/*');
  }], ['sticker', 'Figurinha', '#02a698', function () {
    setAttach(false);
    setPtab('sticker');
    setPanel('emoji');
  }]];
  var total = msgs.length;
  return /*#__PURE__*/React.createElement("div", {
    style: _objectSpread({
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
      height: height || '100%',
      background: WA.bg,
      fontFamily: 'var(--font-sans)'
    }, style)
  }, /*#__PURE__*/React.createElement("input", {
    ref: fileRef,
    type: "file",
    style: {
      display: 'none'
    },
    onChange: function onChange(e) {
      return onFiles(e.target.files);
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flex: 1,
      minHeight: 0,
      overflowY: 'auto',
      overflowX: 'hidden',
      scrollbarWidth: 'thin',
      scrollbarColor: '#374248 transparent',
      padding: mobile ? '10px 14px 12px' : '12px 6% 14px'
    },
    onClick: function onClick() {
      setAttach(false);
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      inset: 0,
      backgroundImage: WA_DOODLE,
      backgroundSize: '220px 220px',
      opacity: 0.055,
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      alignSelf: 'center',
      margin: '6px 0 4px',
      padding: '5px 12px',
      borderRadius: 8,
      background: WA.date,
      color: WA.sub,
      fontSize: 12.5,
      boxShadow: '0 1px .5px rgba(11,20,26,.13)'
    }
  }, "HOJE"), notice ? /*#__PURE__*/React.createElement("span", {
    style: {
      alignSelf: 'center',
      maxWidth: 520,
      margin: '6px 0 6px',
      padding: '6px 12px',
      borderRadius: 8,
      background: WA.date,
      color: '#ffd279',
      fontSize: 12.5,
      lineHeight: 1.45,
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "lock",
    size: 12
  }), notice) : null, msgs.map(function (m, i) {
    return /*#__PURE__*/React.createElement(WaMsg, {
      key: m.id,
      m: m,
      first: i === 0 || msgs[i - 1].me !== m.me,
      menuOpen: menu === m.id,
      menuUp: i >= total - 3 && total > 4,
      onMenu: setMenu,
      flash: flash === m.id,
      contactName: contactName,
      onQuote: quote,
      onOpenImg: setViewer
    });
  }), typing ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 4,
      padding: '12px 14px',
      borderRadius: 8,
      borderTopLeftRadius: 0,
      background: WA.inn
    }
  }, [0, 1, 2].map(function (d) {
    return /*#__PURE__*/React.createElement("span", {
      key: d,
      style: {
        width: 7,
        height: 7,
        borderRadius: '50%',
        background: WA.sub,
        opacity: .4,
        animation: "waDot 1.2s ".concat(d * .2, "s infinite")
      }
    });
  }))) : null, /*#__PURE__*/React.createElement("span", {
    ref: endRef
  }))), note ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      bottom: 76,
      transform: 'translateX(-50%)',
      zIndex: 6,
      maxWidth: '90%',
      padding: '9px 14px',
      borderRadius: 10,
      background: '#e9edef',
      color: '#111b21',
      fontSize: 13.5,
      lineHeight: 1.4,
      boxShadow: '0 8px 24px rgba(0,0,0,.4)',
      textAlign: 'center'
    }
  }, note) : null, attach ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: mobile ? 8 : 56,
      bottom: 68,
      zIndex: 6,
      padding: '8px 0',
      borderRadius: 16,
      background: '#233138',
      boxShadow: '0 12px 30px rgba(0,0,0,.45)',
      minWidth: 210
    }
  }, ATT.map(function (_ref15) {
    var _ref16 = _slicedToArray(_ref15, 4),
      icon = _ref16[0],
      label = _ref16[1],
      c = _ref16[2],
      fn = _ref16[3];
    return /*#__PURE__*/React.createElement("button", {
      key: label,
      type: "button",
      onClick: fn,
      style: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '9px 18px',
        border: 0,
        background: 'transparent',
        color: WA.text,
        fontFamily: 'inherit',
        fontSize: 15,
        cursor: 'pointer',
        textAlign: 'left'
      },
      onMouseEnter: function onMouseEnter(e) {
        e.currentTarget.style.background = WA.field;
      },
      onMouseLeave: function onMouseLeave(e) {
        e.currentTarget.style.background = 'transparent';
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: c,
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement(MIcon, {
      name: icon,
      size: 20
    })), label);
  })) : null, panel ? /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      height: 250,
      background: WA.panel,
      borderTop: "1px solid ".concat(WA.line),
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      padding: '6px 10px',
      borderBottom: "1px solid ".concat(WA.line)
    }
  }, [['emoji', 'smile', 'Emojis'], ['sticker', 'sticker', 'Figurinhas']].map(function (_ref17) {
    var _ref18 = _slicedToArray(_ref17, 3),
      k = _ref18[0],
      icn = _ref18[1],
      l = _ref18[2];
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      type: "button",
      onClick: function onClick() {
        return setPtab(k);
      },
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: 32,
        padding: '0 12px',
        borderRadius: 999,
        border: 0,
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 13.5,
        background: ptab === k ? WA.chip : 'transparent',
        color: ptab === k ? WA.green : WA.sub
      }
    }, /*#__PURE__*/React.createElement(MIcon, {
      name: icn,
      size: 16
    }), l);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: 10,
      scrollbarWidth: 'thin',
      scrollbarColor: '#374248 transparent'
    }
  }, ptab === 'emoji' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))',
      gap: 2
    }
  }, WA_EMOJIS.map(function (e) {
    return /*#__PURE__*/React.createElement("button", {
      key: e,
      type: "button",
      onClick: function onClick() {
        setV(function (x) {
          return x + e;
        });
        inpRef.current && inpRef.current.focus();
      },
      style: {
        height: 40,
        border: 0,
        background: 'transparent',
        fontSize: 24,
        cursor: 'pointer',
        borderRadius: 8
      }
    }, e);
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(92px, 1fr))',
      gap: 8
    }
  }, WA_STICKERS.map(function (s) {
    return /*#__PURE__*/React.createElement("button", {
      key: s.id,
      type: "button",
      "aria-label": 'Enviar figurinha ' + s.label,
      onClick: function onClick() {
        send({
          kind: 'sticker',
          url: s.url,
          label: s.label
        });
        setPanel(null);
      },
      style: {
        border: 0,
        background: 'transparent',
        cursor: 'pointer',
        padding: 4,
        borderRadius: 10
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: s.url,
      alt: s.label,
      style: {
        width: '100%',
        display: 'block'
      }
    }));
  })))) : null, reply ? /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '8px 12px 0',
      background: WA.head
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      padding: '7px 10px',
      borderRadius: 8,
      borderLeft: "4px solid ".concat(reply.me ? '#06cf9c' : '#53bdeb'),
      background: WA.field
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 12.8,
      fontWeight: 600,
      color: reply.me ? '#06cf9c' : '#53bdeb'
    }
  }, reply.me ? 'Você' : contactName), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      color: WA.sub,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, waPreview(reply))), ic('x', 'Cancelar resposta', function () {
    return setReply(null);
  }, false, 20)) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      minHeight: 62,
      padding: '8px 10px',
      background: WA.head,
      flexShrink: 0
    }
  }, rec ? /*#__PURE__*/React.createElement(React.Fragment, null, ic('trash-2', 'Descartar áudio', function () {
    return stopRec(false);
  }, false, 22), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 42,
      padding: '0 14px',
      borderRadius: 999,
      background: WA.field,
      color: WA.text,
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: '#f15c6d',
      animation: 'waDot 1s infinite'
    }
  }), waDur(rec.s), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      height: 22,
      overflow: 'hidden'
    }
  }, Array.from({
    length: 40
  }, function (_, i) {
    return /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        flex: 1,
        height: 4 + (i * 7 + Math.floor(rec.s * 4)) % 9 * 2,
        borderRadius: 2,
        background: 'rgba(233,237,239,.55)'
      }
    });
  }))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Enviar \xE1udio",
    onClick: function onClick() {
      return stopRec(true);
    },
    style: {
      width: 46,
      height: 46,
      borderRadius: '50%',
      border: 0,
      cursor: 'pointer',
      background: WA.green,
      color: '#111b21',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "send-horizontal",
    size: 20
  }))) : /*#__PURE__*/React.createElement(React.Fragment, null, ic(panel ? 'x' : 'smile', panel ? 'Fechar emojis' : 'Emojis e figurinhas', function () {
    setPanel(panel ? null : 'emoji');
    setAttach(false);
  }, !!panel), ic('plus', 'Anexar', function () {
    setAttach(!attach);
    setPanel(null);
  }, attach), /*#__PURE__*/React.createElement("input", {
    ref: inpRef,
    value: v,
    onChange: function onChange(e) {
      return setV(e.target.value);
    },
    onKeyDown: function onKeyDown(e) {
      if (e.key === 'Enter') sendText();
      if (e.key === 'Escape') setReply(null);
    },
    placeholder: "Digite uma mensagem",
    "aria-label": "Digite uma mensagem",
    style: {
      flex: 1,
      minWidth: 0,
      height: 42,
      borderRadius: 8,
      border: 0,
      outline: 'none',
      background: WA.field,
      color: WA.text,
      padding: '0 14px',
      fontFamily: 'inherit',
      fontSize: 15
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": v.trim() ? 'Enviar' : 'Gravar áudio',
    title: v.trim() ? 'Enviar' : 'Gravar áudio',
    onClick: function onClick() {
      return v.trim() ? sendText() : startRec();
    },
    style: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      border: 0,
      cursor: 'pointer',
      background: v.trim() ? WA.green : 'transparent',
      color: v.trim() ? '#111b21' : WA.sub,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: v.trim() ? 'send-horizontal' : 'mic',
    size: 22
  })))), cam ? /*#__PURE__*/React.createElement(WaCamera, {
    onClose: function onClose() {
      return setCam(false);
    },
    onFalha: function onFalha() {
      setCam(false);
      setNote('Não consegui abrir a câmera. Escolha uma foto do computador.');
      pick('image/*', true);
    },
    onFoto: function onFoto(b) {
      setCam(false);
      setPreview({
        kind: 'image',
        url: URL.createObjectURL(b),
        name: 'foto-' + Date.now() + '.jpg',
        size: b.size,
        cap: v
      });
      setV('');
    }
  }) : null, preview ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 8,
      background: '#0b141a',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 12px',
      color: WA.text
    }
  }, ic('x', 'Cancelar envio', function () {
    return setPreview(null);
  }, false, 22), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, preview.name)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16
    }
  }, preview.kind === 'image' ? /*#__PURE__*/React.createElement("img", {
    src: preview.url,
    alt: preview.name,
    style: {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain',
      borderRadius: 6
    }
  }) : /*#__PURE__*/React.createElement("video", {
    src: preview.url,
    controls: true,
    style: {
      maxWidth: '100%',
      maxHeight: '100%'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 12px 14px'
    }
  }, /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    value: preview.cap,
    onChange: function onChange(e) {
      return setPreview(_objectSpread(_objectSpread({}, preview), {}, {
        cap: e.target.value
      }));
    },
    onKeyDown: function onKeyDown(e) {
      if (e.key === 'Enter') {
        send({
          kind: preview.kind,
          url: preview.url,
          name: preview.name,
          size: preview.size,
          text: preview.cap.trim()
        });
        setPreview(null);
      }
    },
    placeholder: "Adicione uma legenda",
    "aria-label": "Legenda",
    style: {
      flex: 1,
      minWidth: 0,
      height: 44,
      borderRadius: 8,
      border: 0,
      outline: 'none',
      background: WA.field,
      color: WA.text,
      padding: '0 14px',
      fontFamily: 'inherit',
      fontSize: 15
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Enviar",
    onClick: function onClick() {
      send({
        kind: preview.kind,
        url: preview.url,
        name: preview.name,
        size: preview.size,
        text: preview.cap.trim()
      });
      setPreview(null);
    },
    style: {
      width: 52,
      height: 52,
      borderRadius: '50%',
      border: 0,
      cursor: 'pointer',
      background: WA.green,
      color: '#111b21',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "send-horizontal",
    size: 22
  })))) : null, viewer ? /*#__PURE__*/React.createElement("div", {
    onClick: function onClick() {
      return setViewer(null);
    },
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 9,
      background: 'rgba(11,20,26,.96)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      cursor: 'zoom-out'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: viewer.url,
    alt: viewer.name || 'Foto',
    style: {
      maxWidth: '100%',
      maxHeight: '100%',
      objectFit: 'contain'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 10,
      right: 10
    }
  }, ic('x', 'Fechar foto', function () {
    return setViewer(null);
  }, false, 22))) : null);
}
(function waStyles() {
  if (document.getElementById('wa-styles')) return;
  var st = document.createElement('style');
  st.id = 'wa-styles';
  st.textContent = '@keyframes waDot { 0%,100% { opacity:.35 } 50% { opacity:1 } } .wa-chev { opacity: 0; transition: opacity .12s } .wa-bub:hover .wa-chev, .wa-chev:focus-visible { opacity: 1 } @media (hover: none) { .wa-chev { display: none } }';
  document.head.appendChild(st);
})();

/* contato de paciente no WhatsApp vira ficha do paciente (Conversa, Dados e histórico, Prontuário) */
var WA_SEXO = {
  james: 'Masculino',
  livia: 'Feminino',
  michael: 'Masculino',
  hanna: 'Feminino',
  sarah: 'Feminino',
  adam: 'Masculino'
};
function waPaciente(c) {
  var norm = function norm(x) {
    return String(x).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };
  var found = PAC.find(function (p) {
    return norm(p.nome) === norm(c.n) || norm(c.n).includes(norm(p.nome));
  });
  if (found) return found;
  var h = function h(k) {
    return String(c.id * 7919 * (k + 11) % 10000).padStart(4, '0');
  };
  var first = norm(c.n.replace(/^dra?\.\s*/i, '')).split(' ')[0];
  return {
    nome: c.n,
    tipo: 'Particular',
    empresa: '',
    conv: '',
    tel: '(19) 9' + h(1) + '-' + h(2),
    nasc: String(1 + c.id * 7 % 27).padStart(2, '0') + '/' + String(1 + c.id * 5 % 12).padStart(2, '0') + '/' + (1978 + c.id * 3 % 20),
    sexo: WA_SEXO[first] || 'Não informado',
    cpf: h(3).slice(0, 3) + '.***.***-' + h(4).slice(0, 2)
  };
}
var waToFicha = function waToFicha(l) {
  return l.map(function (x) {
    return {
      d: x.me ? 'out' : 'in',
      t: x.t,
      text: x.text,
      s: x.me ? x.s || 'read' : undefined
    };
  });
};

/* =====================================================================
   CRM DE LEADS (quadro kanban dentro de Conversas)
   ===================================================================== */
var _window$SaluteProjeto2 = window.SaluteProjetoDesigner_8b4683,
  CrmDialog = _window$SaluteProjeto2.Dialog,
  CrmBtn = _window$SaluteProjeto2.Button;
var CRM_STAGES = [{
  id: 'novo',
  label: 'Novo Lead',
  c: '#1F5EFF'
}, {
  id: 'aguardando',
  label: 'Aguardando atendente',
  c: '#F5B400'
}, {
  id: 'agendado',
  label: 'Agendado',
  c: '#22C3F2'
}, {
  id: 'convertido',
  label: 'Convertido',
  c: '#2DBF6A'
}, {
  id: 'perdido',
  label: 'Perdido',
  c: '#E5484D'
}];
var CRM_MOTIVOS = ['Preço', 'Sem resposta', 'Escolheu outra clínica', 'Outro'];
var crmAt = function crmAt(d, hm) {
  return BR.instante(isoOf(addD(TODAY, d)), hm).getTime();
};
var LEADS_STORE = makeStore([{
  id: 1,
  nome: 'Larissa Mendes',
  tel: '(19) 99621-4410',
  proc: 'Clareamento',
  min: 4,
  ia: true,
  stage: 'novo'
}, {
  id: 2,
  nome: '',
  tel: '(19) 99734-2210',
  proc: 'Lente de contato dental',
  min: 11,
  ia: true,
  stage: 'novo'
}, {
  id: 3,
  nome: 'Gabriel Souza',
  tel: '(19) 98157-3302',
  proc: 'Implante',
  min: 26,
  ia: true,
  stage: 'novo'
}, {
  id: 4,
  nome: 'Patrícia Lima',
  tel: '(19) 99480-1176',
  proc: 'Botox',
  min: 48,
  ia: true,
  stage: 'novo'
}, {
  id: 5,
  nome: '',
  tel: '(19) 98812-0457',
  proc: 'Limpeza',
  min: 80,
  ia: true,
  stage: 'novo'
}, {
  id: 6,
  nome: 'Renato Carvalho',
  tel: '(19) 99245-6618',
  proc: 'Implante',
  min: 18,
  ia: false,
  stage: 'aguardando'
}, {
  id: 7,
  nome: 'Aline Ferreira',
  tel: '(19) 99377-0921',
  proc: 'Harmonização facial',
  min: 35,
  ia: false,
  stage: 'aguardando'
}, {
  id: 8,
  nome: 'Bruno Teixeira',
  tel: '(19) 98654-7730',
  proc: 'Lente de contato dental',
  min: 52,
  ia: false,
  stage: 'aguardando'
}, {
  id: 9,
  nome: 'Juliana Prado',
  tel: '(19) 99118-2047',
  proc: 'Clareamento',
  min: 125,
  ia: false,
  stage: 'aguardando'
}, {
  id: 10,
  nome: 'Fernanda Alves',
  tel: '(19) 99802-3365',
  proc: 'Botox',
  min: 130,
  ia: true,
  stage: 'agendado',
  at: crmAt(3, '09:30')
}, {
  id: 11,
  nome: 'Thiago Ramos',
  tel: '(19) 98733-5190',
  proc: 'Limpeza',
  min: 190,
  ia: true,
  stage: 'agendado',
  at: crmAt(3, '14:00')
}, {
  id: 12,
  nome: 'Mariana Costa',
  tel: '(19) 99561-8824',
  proc: 'Harmonização facial',
  min: 300,
  ia: false,
  stage: 'agendado',
  at: crmAt(4, '10:30')
}, {
  id: 13,
  nome: 'Lucas Oliveira',
  tel: '(19) 99090-4471',
  proc: 'Clareamento',
  min: 1500,
  ia: true,
  stage: 'agendado',
  at: crmAt(5, '16:00')
}, {
  id: 14,
  nome: 'Beatriz Nogueira',
  tel: '(19) 98276-6013',
  proc: 'Implante',
  min: 1620,
  ia: true,
  stage: 'agendado',
  at: crmAt(6, '11:00')
}, {
  id: 15,
  nome: 'Ana Paula Ribeiro',
  tel: '(19) 99415-7782',
  proc: 'Lente de contato dental',
  min: 62,
  ia: true,
  stage: 'agendado',
  at: crmAt(1, '09:00')
}, {
  id: 16,
  nome: 'Rodrigo Martins',
  tel: '(19) 99863-2209',
  proc: 'Botox',
  min: 175,
  ia: true,
  stage: 'agendado',
  at: crmAt(3, '11:30')
}, {
  id: 17,
  nome: 'Vanessa Duarte',
  tel: '(19) 98190-6648',
  proc: 'Limpeza',
  min: 360,
  ia: false,
  stage: 'agendado',
  at: crmAt(3, '15:30')
}, {
  id: 18,
  nome: 'Felipe Andrade',
  tel: '(19) 99527-3154',
  proc: 'Clareamento',
  min: 1480,
  ia: true,
  stage: 'agendado',
  at: crmAt(4, '08:30')
}, {
  id: 19,
  nome: 'Carolina Pires',
  tel: '(19) 99702-8835',
  proc: 'Harmonização facial',
  min: 2,
  ia: false,
  stage: 'agendado'
}, {
  id: 20,
  nome: 'Eduardo Lopes',
  tel: '(19) 98345-1902',
  proc: 'Implante',
  min: 15,
  ia: false,
  stage: 'agendado'
}, {
  id: 21,
  nome: 'Isabela Freitas',
  tel: '(19) 99638-4417',
  proc: 'Botox',
  min: 40,
  ia: false,
  stage: 'agendado'
}, {
  id: 22,
  nome: 'Rafaela Gomes',
  tel: '(19) 99271-5536',
  proc: 'Clareamento',
  min: 1410,
  ia: true,
  stage: 'convertido'
}, {
  id: 23,
  nome: 'Marcelo Batista',
  tel: '(19) 98966-2081',
  proc: 'Limpeza',
  min: 2900,
  ia: true,
  stage: 'convertido'
}, {
  id: 24,
  nome: 'Letícia Moraes',
  tel: '(19) 99154-7709',
  proc: 'Botox',
  min: 4400,
  ia: false,
  stage: 'convertido'
}, {
  id: 25,
  nome: 'Gustavo Rezende',
  tel: '(19) 99843-0326',
  proc: 'Lente de contato dental',
  min: 7300,
  ia: true,
  stage: 'convertido'
}, {
  id: 26,
  nome: 'Priscila Santana',
  tel: '(19) 99376-9158',
  proc: 'Implante',
  min: 5800,
  ia: true,
  stage: 'perdido',
  motivo: 'Preço'
}, {
  id: 27,
  nome: '',
  tel: '(19) 99105-7782',
  proc: 'Clareamento',
  min: 8700,
  ia: true,
  stage: 'perdido',
  motivo: 'Sem resposta'
}, {
  id: 28,
  nome: 'Diego Barros',
  tel: '(19) 98420-3361',
  proc: 'Harmonização facial',
  min: 13000,
  ia: false,
  stage: 'perdido',
  motivo: 'Escolheu outra clínica'
}]);
var crmName = function crmName(l) {
  return l.nome || l.tel;
};
var crmAgo = function crmAgo(m) {
  return m < 1 ? 'agora' : m < 60 ? 'há ' + m + ' min' : m < 1440 ? 'há ' + Math.floor(m / 60) + ' h' : m < 2880 ? 'ontem' : 'há ' + Math.floor(m / 1440) + ' dias';
};
var CRM_WD = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
var crmWhen = function crmWhen(t) {
  var d = BR.partes(t);
  return CRM_WD[d.dow] + ', ' + String(d.dia).padStart(2, '0') + '/' + String(d.mes).padStart(2, '0') + ' · ' + d.hm;
};
var CRM_SEXO = {
  larissa: 'Feminino',
  gabriel: 'Masculino',
  patricia: 'Feminino',
  renato: 'Masculino',
  aline: 'Feminino',
  bruno: 'Masculino',
  juliana: 'Feminino',
  fernanda: 'Feminino',
  thiago: 'Masculino',
  mariana: 'Feminino',
  lucas: 'Masculino',
  beatriz: 'Feminino',
  ana: 'Feminino',
  rodrigo: 'Masculino',
  vanessa: 'Feminino',
  felipe: 'Masculino',
  carolina: 'Feminino',
  eduardo: 'Masculino',
  isabela: 'Feminino',
  rafaela: 'Feminino',
  marcelo: 'Masculino',
  leticia: 'Feminino',
  gustavo: 'Masculino',
  priscila: 'Feminino',
  diego: 'Masculino'
};
function crmPaciente(l) {
  var first = String(l.nome || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').split(' ')[0];
  return {
    nome: crmName(l),
    tipo: 'Particular',
    empresa: '',
    conv: '',
    tel: l.tel,
    nasc: 'Não informado',
    sexo: CRM_SEXO[first] || 'Não informado',
    cpf: 'Não informado'
  };
}
function crmConversa(l) {
  var first = l.nome ? l.nome.split(' ')[0] : '';
  var oi = first ? 'Olá, ' + first + '!' : 'Olá!';
  var proc = l.proc.toLowerCase();
  var base = [{
    d: 'in',
    t: '09:02',
    text: "Oi! Queria saber o valor ".concat(/^[aeiou]/.test(proc) ? 'do ' : 'de ').concat(proc, ".")
  }, {
    d: 'out',
    ia: true,
    t: '09:02',
    text: "".concat(oi, " Aqui \xE9 a Renata, da Cl\xEDnica Bella Forma. Para ").concat(proc, " fazemos uma avalia\xE7\xE3o antes, para indicar o melhor tratamento para voc\xEA. Quer que eu veja um hor\xE1rio?"),
    s: 'read'
  }];
  var fim = {
    novo: [],
    aguardando: [{
      d: 'in',
      t: '09:05',
      text: 'Prefiro falar com alguém da equipe, pode ser?'
    }, {
      d: 'out',
      ia: true,
      t: '09:05',
      text: 'Claro! Já chamei a equipe e em instantes alguém te responde por aqui.',
      s: 'read'
    }],
    agendado: [{
      d: 'in',
      t: '09:06',
      text: 'Quero sim!'
    }, {
      d: 'out',
      ia: true,
      t: '09:07',
      text: "Agendado! ".concat(l.at ? crmWhen(l.at).replace(' · ', ' às ') : 'Te envio o horário em seguida', " com a Dra. Camila. Um dia antes eu te mando a confirma\xE7\xE3o."),
      s: 'read'
    }],
    confirmado: [{
      d: 'out',
      ia: true,
      t: '09:10',
      text: "".concat(oi, " Passando para confirmar sua avalia\xE7\xE3o").concat(l.at ? ' ' + crmWhen(l.at).replace(' · ', ' às ') : '', ". Posso confirmar?"),
      s: 'read'
    }, {
      d: 'in',
      t: '09:12',
      text: 'Confirmado, estarei aí!'
    }],
    atendimento: [{
      d: 'in',
      t: '09:20',
      text: 'Cheguei na recepção.'
    }, {
      d: 'out',
      t: '09:21',
      text: 'Perfeito! Já vamos te chamar.',
      s: 'read'
    }],
    finalizado: [{
      d: 'out',
      t: '18:10',
      text: "Obrigada pela visita".concat(first ? ', ' + first : '', "! Qualquer d\xFAvida sobre os cuidados, \xE9 s\xF3 chamar por aqui."),
      s: 'read'
    }, {
      d: 'in',
      t: '18:15',
      text: 'Amei o resultado, obrigada!'
    }],
    perdido: [{
      d: 'in',
      t: '09:30',
      text: l.motivo === 'Preço' ? 'Achei um pouco acima do que eu esperava, vou pensar.' : l.motivo === 'Escolheu outra clínica' ? 'Obrigado, mas acabei fechando com outra clínica.' : 'Vou ver e te retorno.'
    }]
  }[l.stage] || [];
  return [].concat(base, _toConsumableArray(fim));
}
function CrmCard(_ref6) {
  var l = _ref6.l,
    st = _ref6.st,
    dragging = _ref6.dragging,
    onDown = _ref6.onDown,
    onKey = _ref6.onKey,
    onToggle = _ref6.onToggle;
  var showWhen = st.id === 'agendado' || st.id === 'confirmado';
  var c = l.ia ? '#a78bfa' : WA.blue;
  return /*#__PURE__*/React.createElement("div", {
    role: "button",
    tabIndex: 0,
    "aria-label": "".concat(crmName(l), ", ").concat(l.proc, ". Abrir conversa"),
    onPointerDown: onDown,
    onKeyDown: onKey,
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      padding: '11px 12px 10px',
      borderRadius: 12,
      background: WA.head,
      border: "1px solid ".concat(WA.line),
      boxShadow: '0 1px .5px rgba(11,20,26,.13)',
      cursor: 'grab',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      touchAction: 'pan-x pan-y',
      opacity: dragging ? .35 : 1,
      outline: 'none',
      textAlign: 'left'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14.5,
      fontWeight: 600,
      color: WA.text,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, crmName(l)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      fontSize: 13,
      color: WA.sub,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, l.proc), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: WA.sub,
      whiteSpace: 'nowrap',
      flexShrink: 0
    }
  }, crmAgo(l.min).replace('há ', ''))), showWhen ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 12.5,
      color: l.at ? WA.text : WA.sub
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "calendar-days",
    size: 13
  }), l.at ? crmWhen(l.at) : 'Horário a definir') : null, st.id === 'perdido' && l.motivo ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: st.c
    }
  }, "Motivo: ", l.motivo) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onPointerDown: function onPointerDown(e) {
      return e.stopPropagation();
    },
    onKeyDown: function onKeyDown(e) {
      return e.stopPropagation();
    },
    onClick: function onClick(e) {
      e.stopPropagation();
      onToggle && onToggle();
    },
    title: l.ia ? 'Pausar IA neste lead' : 'Retomar IA neste lead',
    "aria-label": l.ia ? 'Atendimento com a IA. Pausar IA' : 'Atendimento com humano. Retomar IA',
    "aria-pressed": !l.ia,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      height: 24,
      padding: '0 3px 0 8px',
      borderRadius: 999,
      border: 0,
      background: l.ia ? 'rgba(167,139,250,.14)' : 'rgba(83,189,235,.14)',
      color: c,
      fontFamily: 'inherit',
      fontSize: 11.5,
      fontWeight: 600,
      cursor: 'pointer',
      flexShrink: 0,
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: l.ia ? 'sparkles' : 'user-round',
    size: 12
  }), l.ia ? 'IA' : 'Humano', /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      borderRadius: '50%',
      background: c,
      color: '#111b21',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 2
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: l.ia ? 'pause' : 'play',
    size: 10,
    strokeWidth: 2.6
  })))));
}
var CrmToast = window.SaluteProjetoDesigner_8b4683.Toast;
function CrmBoard(_ref1) {
  var mobile = _ref1.mobile,
    onOpen = _ref1.onOpen;
  var _useStore5 = useStore(LEADS_STORE),
    _useStore6 = _slicedToArray(_useStore5, 2),
    leads = _useStore6[0],
    setLeads = _useStore6[1];
  var _React$useState39 = React.useState(null),
    _React$useState40 = _slicedToArray(_React$useState39, 2),
    drag = _React$useState40[0],
    setDrag = _React$useState40[1];
  var _React$useState41 = React.useState(null),
    _React$useState42 = _slicedToArray(_React$useState41, 2),
    lost = _React$useState42[0],
    setLost = _React$useState42[1];
  var _React$useState43 = React.useState(null),
    _React$useState44 = _slicedToArray(_React$useState43, 2),
    motivo = _React$useState44[0],
    setMotivo = _React$useState44[1];
  var _React$useState45 = React.useState(null),
    _React$useState46 = _slicedToArray(_React$useState45, 2),
    toast = _React$useState46[0],
    setToast = _React$useState46[1];
  var D = React.useRef(null),
    boardRef = React.useRef(null);
  React.useEffect(function () {
    if (!toast) return;
    var t = setTimeout(function () {
      return setToast(null);
    }, 3200);
    return function () {
      return clearTimeout(t);
    };
  }, [toast]);
  var toggleIA = function toggleIA(l) {
    var ia = !l.ia;
    setLeads(function (all) {
      return all.map(function (x) {
        return x.id === l.id ? _objectSpread(_objectSpread({}, x), {}, {
          ia: ia
        }) : x;
      });
    });
    if (SB_ON) bg(CrmSvc.ia(l, ia), function () {
      return setLeads(function (all) {
        return all.map(function (x) {
          return x.id === l.id ? _objectSpread(_objectSpread({}, x), {}, {
            ia: !ia
          }) : x;
        });
      });
    });
    setToast(ia ? {
      tone: 'success',
      title: 'IA retomada',
      description: "A Renata volta a responder ".concat(crmName(l), ".")
    } : {
      tone: 'info',
      title: 'IA pausada',
      description: "A equipe assume a conversa com ".concat(crmName(l), ".")
    });
  };
  var move = function move(id, to) {
    if (to === 'perdido') {
      setMotivo(null);
      setLost(id);
      return;
    }
    var antes = leads.find(function (x) {
      return x.id === id;
    });
    setLeads(function (l) {
      return l.map(function (x) {
        return x.id === id ? _objectSpread(_objectSpread({}, x), {}, {
          stage: to,
          motivo: undefined
        }) : x;
      });
    });
    if (SB_ON && antes) bg(CrmSvc.mover(antes, to), function () {
      return setLeads(function (l) {
        return l.map(function (x) {
          return x.id === id ? _objectSpread(_objectSpread({}, x), {}, {
            stage: antes.stage,
            motivo: antes.motivo
          }) : x;
        });
      });
    });
  };
  var overAt = function overAt(x, y) {
    var el = document.elementFromPoint(x, y);
    var c = el && el.closest && el.closest('[data-crm-stage]');
    return c ? c.getAttribute('data-crm-stage') : null;
  };
  var cleanup = function cleanup() {
    var d = D.current;
    if (!d) return;
    clearTimeout(d.t);
    window.removeEventListener('pointermove', d.mv);
    window.removeEventListener('pointerup', d.up);
    window.removeEventListener('pointercancel', d.cancel);
    document.removeEventListener('touchmove', d.tm);
    D.current = null;
  };
  var _onDown = function onDown(e, l) {
    if (e.button !== undefined && e.button !== 0) return;
    cleanup();
    var r = e.currentTarget.getBoundingClientRect();
    var d = {
      id: l.id,
      from: l.stage,
      sx: e.clientX,
      sy: e.clientY,
      ox: e.clientX - r.left,
      oy: e.clientY - r.top,
      w: r.width,
      active: false,
      moved: false,
      touch: e.pointerType === 'touch',
      over: l.stage
    };
    var start = function start(x, y) {
      d.active = true;
      setDrag({
        id: l.id,
        x: x - d.ox,
        y: y - d.oy,
        w: d.w,
        over: d.over
      });
    };
    d.mv = function (ev) {
      var dist = Math.hypot(ev.clientX - d.sx, ev.clientY - d.sy);
      if (!d.active) {
        if (d.touch) {
          if (dist > 8) {
            d.moved = true;
            cleanup();
          }
          return;
        }
        if (dist < 6) return;
        start(ev.clientX, ev.clientY);
      }
      d.over = overAt(ev.clientX, ev.clientY);
      setDrag({
        id: l.id,
        x: ev.clientX - d.ox,
        y: ev.clientY - d.oy,
        w: d.w,
        over: d.over
      });
      var b = boardRef.current;
      if (b) {
        var br = b.getBoundingClientRect();
        if (ev.clientX > br.right - 48) b.scrollLeft += 14;else if (ev.clientX < br.left + 48) b.scrollLeft -= 14;
      }
    };
    d.up = function () {
      var wasActive = d.active,
        moved = d.moved,
        over = d.over;
      cleanup();
      setDrag(null);
      if (!wasActive) {
        if (!moved) onOpen(l);
        return;
      }
      if (over && over !== d.from) move(l.id, over);
    };
    d.cancel = function () {
      cleanup();
      setDrag(null);
    };
    d.tm = function (ev) {
      if (d.active) ev.preventDefault();
    };
    if (d.touch) d.t = setTimeout(function () {
      if (D.current === d && !d.moved) {
        start(d.sx, d.sy);
        try {
          navigator.vibrate && navigator.vibrate(12);
        } catch (x) {}
      }
    }, 320);
    D.current = d;
    window.addEventListener('pointermove', d.mv);
    window.addEventListener('pointerup', d.up);
    window.addEventListener('pointercancel', d.cancel);
    document.addEventListener('touchmove', d.tm, {
      passive: false
    });
  };
  React.useEffect(function () {
    return function () {
      return cleanup();
    };
  }, []);
  var dragged = drag ? leads.find(function (x) {
    return x.id === drag.id;
  }) : null;
  var lostLead = lost ? leads.find(function (x) {
    return x.id === lost;
  }) : null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    ref: boardRef,
    style: {
      flex: 1,
      minHeight: 0,
      display: 'flex',
      gap: mobile ? 10 : 8,
      padding: mobile ? '4px 12px 12px' : '4px 14px 14px',
      overflowX: 'auto',
      overflowY: 'hidden',
      scrollSnapType: mobile && !drag ? 'x mandatory' : 'none',
      scrollbarWidth: 'thin',
      scrollbarColor: '#374248 transparent'
    }
  }, CRM_STAGES.map(function (st) {
    var items = leads.filter(function (x) {
      return x.stage === st.id;
    });
    var over = drag && drag.over === st.id && dragged && dragged.stage !== st.id;
    return /*#__PURE__*/React.createElement("section", {
      key: st.id,
      "data-crm-stage": st.id,
      "aria-label": st.label,
      style: {
        flex: mobile ? '0 0 82%' : '1 1 0',
        minWidth: mobile ? 0 : 160,
        maxWidth: mobile ? 300 : 'none',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        borderRadius: 14,
        background: WA.panel,
        border: over ? "2px dashed ".concat(st.c) : "2px solid ".concat(WA.panel),
        scrollSnapAlign: 'start',
        transition: 'border-color .15s'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        minHeight: 50,
        boxSizing: 'border-box',
        padding: '8px 12px',
        borderBottom: "1px solid ".concat(WA.line)
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: st.c,
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0,
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 1.2,
        color: WA.text
      }
    }, st.label), /*#__PURE__*/React.createElement("span", {
      style: {
        minWidth: 22,
        height: 22,
        padding: '0 7px',
        boxSizing: 'border-box',
        borderRadius: 999,
        background: st.c + '26',
        color: st.c,
        fontSize: 12,
        fontWeight: 700,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, items.length)), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
        padding: 8,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        scrollbarWidth: 'thin',
        scrollbarColor: '#374248 transparent'
      }
    }, items.map(function (l) {
      return /*#__PURE__*/React.createElement(CrmCard, {
        key: l.id,
        l: l,
        st: st,
        dragging: drag && drag.id === l.id,
        onToggle: function onToggle() {
          return toggleIA(l);
        },
        onDown: function onDown(e) {
          return _onDown(e, l);
        },
        onKey: function onKey(e) {
          if (e.target === e.currentTarget && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onOpen(l);
          }
        }
      });
    }), !items.length ? /*#__PURE__*/React.createElement("span", {
      style: {
        margin: '18px 4px',
        textAlign: 'center',
        fontSize: 12.5,
        color: WA.sub,
        opacity: .8
      }
    }, "Nenhum lead nesta etapa") : null));
  })), drag && dragged ? ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      left: drag.x,
      top: drag.y,
      width: drag.w,
      zIndex: 400,
      pointerEvents: 'none',
      transform: 'rotate(2deg)',
      filter: 'drop-shadow(0 18px 30px rgba(0,0,0,.45))',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement(CrmCard, {
    l: dragged,
    st: CRM_STAGES.find(function (s) {
      return s.id === dragged.stage;
    })
  })), document.body) : null, toast ? ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      zIndex: 260,
      right: mobile ? 12 : 24,
      left: mobile ? 12 : 'auto',
      bottom: mobile ? 'calc(96px + env(safe-area-inset-bottom))' : 24,
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement(CrmToast, _extends({}, toast, {
    onClose: function onClose() {
      return setToast(null);
    },
    style: {
      width: mobile ? '100%' : 360
    }
  }))), document.body) : null, /*#__PURE__*/React.createElement(GPortal, null, /*#__PURE__*/React.createElement(CrmDialog, {
    open: !!lostLead,
    onClose: function onClose() {
      return setLost(null);
    },
    icon: "circle-x",
    title: "Mover para Perdido",
    description: lostLead ? "Qual foi o motivo da perda de ".concat(crmName(lostLead), "?") : '',
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CrmBtn, {
      variant: "secondary",
      onClick: function onClick() {
        return setLost(null);
      }
    }, "Cancelar"), /*#__PURE__*/React.createElement(CrmBtn, {
      iconLeft: "check",
      disabled: !motivo,
      onClick: function onClick() {
        var antes = leads.find(function (x) {
          return x.id === lost;
        });
        setLeads(function (l) {
          return l.map(function (x) {
            return x.id === lost ? _objectSpread(_objectSpread({}, x), {}, {
              stage: 'perdido',
              motivo: motivo
            }) : x;
          });
        });
        if (SB_ON && antes) bg(CrmSvc.mover(antes, 'perdido', motivo), function () {
          return setLeads(function (l) {
            return l.map(function (x) {
              return x.id === antes.id ? _objectSpread(_objectSpread({}, x), {}, {
                stage: antes.stage,
                motivo: antes.motivo
              }) : x;
            });
          });
        });
        setLost(null);
      }
    }, "Confirmar"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, CRM_MOTIVOS.map(function (m) {
    return /*#__PURE__*/React.createElement(FilterChip, {
      key: m,
      active: motivo === m,
      onClick: function onClick() {
        return setMotivo(m);
      }
    }, m);
  })))));
}
function MensagensWA(_ref10) {
  var mobile = _ref10.mobile;
  var _ref12 = SB_ON ? usePrefFiltro('mensagens.aba', 'p') : React.useState('p'),
    _ref19 = _slicedToArray(_ref12, 2),
    tab = _ref19[0],
    setTabRaw = _ref19[1];
  var _React$useState47 = React.useState(null),
    _React$useState48 = _slicedToArray(_React$useState47, 2),
    ficha = _React$useState48[0],
    setFicha = _React$useState48[1];
  var _ref20 = SB_ON ? usePrefFiltro('mensagens.crm', false) : React.useState(false),
    _ref21 = _slicedToArray(_ref20, 2),
    crm = _ref21[0],
    setCrm = _ref21[1];
  var _React$useState49 = React.useState(''),
    _React$useState50 = _slicedToArray(_React$useState49, 2),
    q = _React$useState50[0],
    setQ = _React$useState50[1];
  var _React$useState51 = React.useState(mobile || SB_ON ? null : 3),
    _React$useState52 = _slicedToArray(_React$useState51, 2),
    sel = _React$useState52[0],
    setSel = _React$useState52[1];
  useStore(MSG_LISTA);
  var carga = useCarga('mensagens');
  var cargaCrm0 = useCarga('crm');
  var cargaCrm = SB_ON && crm ? cargaCrm0 : 'ok';
  var _React$useState53 = React.useState({}),
    _React$useState54 = _slicedToArray(_React$useState53, 2),
    read = _React$useState54[0],
    setRead = _React$useState54[1];
  var _useStore7 = useStore(CHAT_STORE),
    _useStore8 = _slicedToArray(_useStore7, 1),
    all = _useStore8[0];
  var _useStore9 = useStore(CHAT_TYPING),
    _useStore0 = _slicedToArray(_useStore9, 1),
    typingMap = _useStore0[0];
  var setTab = function setTab(k) {
    setTabRaw(k);
    setSel(mobile ? null : SB_ON ? ((k === 'p' ? INBOX : EQUIPE)[0] || {}).id || null : k === 'p' ? 3 : 101);
  };
  var BASE = [{
    me: true,
    t: '10:40',
    text: 'Olá, Dr. Michael Thompson!'
  }, {
    me: false,
    t: '10:39',
    text: 'Olá, Corey Philips. Como posso ajudar hoje?'
  }, {
    me: true,
    t: '10:40',
    text: 'Não estou me sentindo bem há alguns dias. Dores musculares, garganta irritada e um pouco de tosse.'
  }, {
    me: false,
    t: '10:39',
    text: 'Entendo. Está sentindo mais alguma coisa?'
  }];
  var isTeam = tab === 'd';
  var ALL = isTeam ? EQUIPE : INBOX;
  var keyOf = function keyOf(c) {
    return SB_ON ? (isTeam ? 'eq:' : 'conv:') + c.id : 'c' + c.id;
  };
  var seedOf = function seedOf(c) {
    return function () {
      return SB_ON ? [] : (c.msgs || BASE).map(function (x) {
        return _objectSpread({}, x);
      });
    };
  };
  var msgsOf = function msgsOf(c) {
    return all[keyOf(c)] || (SB_ON ? [] : chatGet(keyOf(c), seedOf(c)));
  };
  var typingOf = function typingOf(c) {
    return !!typingMap[keyOf(c)];
  };
  var unreadOf = function unreadOf(c) {
    return SB_ON ? c.id === sel ? 0 : c.u : read[c.id] ? 0 : c.u;
  };
  var term = q.trim().toLowerCase();
  var LIST = ALL.filter(function (c) {
    return !term || c.n.toLowerCase().includes(term);
  });
  var cur = ALL.find(function (c) {
    return c.id === sel;
  });
  React.useEffect(function () {
    if (sel) setRead(function (r) {
      return _objectSpread(_objectSpread({}, r), {}, _defineProperty({}, sel, true));
    });
    if (SB_ON && sel) MsgSvc.marcarLida(ALL.find(function (c) {
      return c.id === sel;
    }), isTeam)["catch"](function () {});
  }, [sel]);
  React.useEffect(function () {
    if (SB_ON && !mobile && !sel && ALL[0] && carga === 'ok') setSel(ALL[0].id);
  }, [carga, tab, ALL.length]);
  var lastOf = function lastOf(c) {
    var l = msgsOf(c);
    return l[l.length - 1];
  };
  var chip = function chip(on, label, onClick) {
    return /*#__PURE__*/React.createElement("button", {
      key: label,
      type: "button",
      onClick: onClick,
      style: {
        height: 32,
        padding: '0 12px',
        borderRadius: 999,
        border: 0,
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 14,
        fontWeight: 500,
        background: on ? WA.chip : WA.head,
        color: on ? WA.green : WA.sub,
        whiteSpace: 'nowrap'
      }
    }, label);
  };
  var list = /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
      height: '100%',
      background: WA.panel,
      borderRight: mobile ? 0 : "1px solid ".concat(WA.line)
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 12px 8px 20px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22,
      fontWeight: 700,
      color: WA.text
    }
  }, "Conversas"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      marginRight: 4
    }
  }, chip(false, 'CRM', function () {
    return setCrm(true);
  })), waIcon('message-square-plus', 'Nova conversa'), waIcon('ellipsis-vertical', 'Mais opções'))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 12px 8px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      height: 38,
      borderRadius: 999,
      background: WA.head,
      padding: '0 14px',
      color: WA.sub
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "search",
    size: 17
  }), /*#__PURE__*/React.createElement("input", {
    value: q,
    onChange: function onChange(e) {
      return setQ(e.target.value);
    },
    placeholder: "Pesquisar ou come\xE7ar uma nova conversa",
    "aria-label": "Pesquisar conversa",
    style: {
      flex: 1,
      minWidth: 0,
      border: 0,
      outline: 'none',
      background: 'transparent',
      color: WA.text,
      fontFamily: 'inherit',
      fontSize: 14.5
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      padding: '2px 12px 10px',
      overflowX: 'auto',
      scrollbarWidth: 'none'
    }
  }, chip(!isTeam, 'Pacientes', function () {
    return setTab('p');
  }), chip(isTeam, 'Equipe', function () {
    return setTab('d');
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      scrollbarWidth: 'thin',
      scrollbarColor: '#374248 transparent'
    }
  }, LIST.map(function (c) {
    var on = c.id === sel,
      last = lastOf(c),
      u = unreadOf(c);
    return /*#__PURE__*/React.createElement("button", {
      key: c.id,
      type: "button",
      onClick: function onClick() {
        return setSel(c.id);
      },
      onMouseEnter: function onMouseEnter(e) {
        if (!on) e.currentTarget.style.background = WA.hover;
      },
      onMouseLeave: function onMouseLeave(e) {
        if (!on) e.currentTarget.style.background = 'transparent';
      },
      style: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '0 14px 0 14px',
        height: 72,
        border: 0,
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: 'inherit',
        background: on ? WA.sel : 'transparent'
      }
    }, /*#__PURE__*/React.createElement(MAv, {
      name: c.n,
      size: 49
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0,
        alignSelf: 'stretch',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderBottom: "1px solid ".concat(WA.line)
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16.5,
        color: WA.text,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, c.n), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: u ? WA.green : WA.sub,
        flexShrink: 0
      }
    }, last && CHAT_TOUCHED[keyOf(c)] ? last.t : c.t)), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
        marginTop: 3
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        minWidth: 0,
        fontSize: 14,
        color: WA.sub
      }
    }, last && CHAT_TOUCHED[keyOf(c)] && last.me && !typingOf(c) && !last.deleted ? /*#__PURE__*/React.createElement(WaTicks, {
      s: last.s || 'read'
    }) : null, /*#__PURE__*/React.createElement("span", {
      style: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, typingOf(c) ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: WA.green
      }
    }, "digitando...") : last && CHAT_TOUCHED[keyOf(c)] ? waPreview(last) : c.m)), u ? /*#__PURE__*/React.createElement("span", {
      style: {
        minWidth: 20,
        height: 20,
        padding: '0 6px',
        boxSizing: 'border-box',
        borderRadius: 999,
        background: WA.green,
        color: '#111b21',
        fontSize: 12,
        fontWeight: 600,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, u) : null)));
  }), !LIST.length ? /*#__PURE__*/React.createElement("p", {
    style: {
      textAlign: 'center',
      color: WA.sub,
      fontSize: 14,
      padding: 30
    }
  }, "Nenhuma conversa encontrada.") : null));
  var thread = cur ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
      height: '100%',
      background: WA.bg
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      height: 60,
      padding: '0 10px 0 ' + (mobile ? '4px' : '16px'),
      background: WA.head,
      flexShrink: 0
    }
  }, mobile ? waIcon('arrow-left', 'Voltar', function () {
    return setSel(null);
  }) : null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: isTeam,
    onClick: function onClick() {
      if (SB_ON) {
        MsgSvc.pacienteDaConversa(cur).then(function (p) {
          return setFicha({
            p: p,
            key: keyOf(cur),
            name: cur.n
          });
        })["catch"](function () {});
        return;
      }
      setFicha({
        p: waPaciente(cur),
        key: keyOf(cur),
        name: cur.n
      });
    },
    title: isTeam ? undefined : 'Abrir ficha do paciente',
    "aria-label": isTeam ? cur.n : 'Abrir ficha de ' + cur.n,
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      height: '100%',
      border: 0,
      padding: 0,
      background: 'transparent',
      cursor: isTeam ? 'default' : 'pointer',
      textAlign: 'left',
      fontFamily: 'inherit'
    }
  }, /*#__PURE__*/React.createElement(MAv, {
    name: cur.n,
    size: 40
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 16,
      color: WA.text,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, cur.n), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 13,
      color: typingOf(cur) ? WA.green : WA.sub,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, typingOf(cur) ? 'digitando...' : cur.r ? cur.r : mobile ? 'online · ver ficha' : 'online · clique para ver a ficha'))), mobile ? null : waIcon('search', 'Pesquisar na conversa', null, 20), waIcon('video', 'Chamada de vídeo', null, 21), waIcon('phone', 'Ligar', null, 20), waIcon('ellipsis-vertical', 'Mais opções', null, 20)), /*#__PURE__*/React.createElement(WaChat, {
    key: keyOf(cur),
    chatKey: keyOf(cur),
    seed: seedOf(cur),
    contactName: cur.n,
    mobile: mobile,
    height: "auto",
    style: {
      flex: 1
    },
    notice: isTeam ? 'Conversa interna da equipe. Só quem tem acesso ao sistema vê.' : 'Mensagens do WhatsApp da clínica, atendidas pela Renata IA e pela equipe.'
  })) : /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 14,
      background: WA.head,
      color: WA.sub,
      textAlign: 'center',
      padding: 30,
      borderBottom: "6px solid ".concat(WA.green)
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 84,
      height: 84,
      borderRadius: '50%',
      background: WA.field,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: WA.sub
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "messages-square",
    size: 38
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 28,
      fontWeight: 300,
      color: WA.text
    }
  }, "Mensagens Salute"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      maxWidth: 420,
      lineHeight: 1.5
    }
  }, "Escolha uma conversa para responder. Pacientes chegam pelo WhatsApp da cl\xEDnica, e a equipe conversa aqui dentro."));
  var frame = {
    borderRadius: mobile ? 18 : 22,
    overflow: 'hidden',
    boxShadow: '0 24px 50px -30px rgba(11,20,26,.75)',
    border: "1px solid ".concat(WA.line),
    fontFamily: 'var(--font-sans)'
  };
  var fichaEl = ficha ? /*#__PURE__*/React.createElement(PacienteFicha, {
    key: ficha.p.nome,
    p: ficha.p,
    chatKey: ficha.key,
    contactName: ficha.name,
    conversa: ficha.conv,
    mobile: mobile,
    initialTab: ficha.tab || 'dados',
    onClose: function onClose() {
      return setFicha(null);
    },
    onUpdate: function onUpdate(np) {
      return setFicha(function (f) {
        return _objectSpread(_objectSpread({}, f), {}, {
          p: np
        });
      });
    }
  }) : null;
  if (crm) {
    var total = LEADS_STORE.v.length;
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      style: _objectSpread(_objectSpread({}, frame), {}, {
        height: mobile ? 'calc(100vh - 190px)' : 'calc(100vh - 170px)',
        minHeight: mobile ? 520 : 620,
        display: 'flex',
        flexDirection: 'column',
        background: WA.bg
      })
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 10,
        padding: mobile ? '12px 12px 10px 6px' : '14px 14px 10px 10px',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: function onClick() {
        return setCrm(false);
      },
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: 36,
        padding: '0 12px 0 8px',
        borderRadius: 999,
        border: 0,
        background: 'transparent',
        color: WA.text,
        fontFamily: 'inherit',
        fontSize: 14.5,
        fontWeight: 500,
        cursor: 'pointer',
        whiteSpace: 'nowrap'
      }
    }, /*#__PURE__*/React.createElement(MIcon, {
      name: "arrow-left",
      size: 19
    }), "Voltar para lista"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        minWidth: 0
      }
    }, mobile ? null : /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13.5,
        color: WA.sub,
        whiteSpace: 'nowrap'
      }
    }, total, " leads"), chip(true, 'CRM', function () {
      return setCrm(false);
    }))), cargaCrm !== 'ok' ? /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 16
      }
    }, /*#__PURE__*/React.createElement(CargaEstado, {
      estado: cargaCrm,
      compact: true,
      onRetry: function onRetry() {
        return carregar('crm', true);
      }
    })) : /*#__PURE__*/React.createElement(CrmBoard, {
      mobile: mobile,
      onOpen: function onOpen(l) {
        if (SB_ON) {
          CrmSvc.paciente(l).then(function (p) {
            return setFicha({
              p: p,
              key: l.conversaId ? chaveConv(l.conversaId) : MsgSvc.chavePaciente(p),
              name: crmName(l),
              conv: [],
              tab: 'conversa'
            });
          })["catch"](function () {});
          return;
        }
        setFicha({
          p: crmPaciente(l),
          key: 'lead:' + l.id,
          name: crmName(l),
          conv: crmConversa(l),
          tab: 'conversa'
        });
      }
    })), fichaEl);
  }
  if (SB_ON && carga !== 'ok') return /*#__PURE__*/React.createElement(CargaEstado, {
    estado: carga,
    onRetry: function onRetry() {
      return carregar('mensagens', true);
    }
  });
  if (mobile) return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, frame), {}, {
      height: 'calc(100vh - 190px)',
      minHeight: 520
    })
  }, cur ? thread : list), fichaEl);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, frame), {}, {
      display: 'grid',
      gridTemplateColumns: 'minmax(320px,420px) minmax(0,1fr)',
      height: 'calc(100vh - 170px)',
      minHeight: 620
    })
  }, list, thread), fichaEl);
}
function MensagensScreen(props) {
  return MENSAGENS_VERSAO === 'v01' ? /*#__PURE__*/React.createElement(MensagensV01, props) : /*#__PURE__*/React.createElement(MensagensWA, props);
}
Object.assign(window, {
  MensagensScreen: MensagensScreen
});