"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
  StatCard = _window$SaluteProjeto.StatCard,
  BarChart = _window$SaluteProjeto.BarChart,
  GaugeChart = _window$SaluteProjeto.GaugeChart,
  TrendPill = _window$SaluteProjeto.TrendPill,
  SalesFunnel = _window$SaluteProjeto.SalesFunnel,
  PCheck = _window$SaluteProjeto.Checkbox,
  PAv = _window$SaluteProjeto.Avatar;
var WEEK = [{
  label: 'Dom',
  value: 36,
  target: 46,
  base: 20
}, {
  label: 'Seg',
  value: 33,
  target: 41,
  base: 20
}, {
  label: 'Ter',
  value: 36,
  target: 46,
  base: 20
}, {
  label: 'Qua',
  value: 47,
  target: 57,
  base: 20
}, {
  label: 'Qui',
  value: 30,
  target: 37,
  base: 20
}, {
  label: 'Sex',
  value: 35,
  target: 45,
  base: 20
}, {
  label: 'Sáb',
  value: 27,
  target: 37,
  base: 20
}];
var DAILY = [['19', 7], ['20', 3], ['21', 11], ['22', 9], ['23', 12], ['24', 10], ['25', 13], ['26', 8], ['27', 2], ['28', 12], ['29', 10], ['30', 14], ['01', 11], ['02', 9]].map(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    label = _ref2[0],
    value = _ref2[1];
  return {
    label: label,
    value: value,
    target: 14,
    base: Math.min(value, 3)
  };
});
var FUNNEL = [{
  label: 'Novo',
  value: 186
}, {
  label: 'Aguardando atendente',
  value: 128
}, {
  label: 'Agendado',
  value: 101
}, {
  label: 'Confirmado',
  value: 77
}, {
  label: 'Em atendimento',
  value: 59
}, {
  label: 'Finalizado',
  value: 46
}];
var fmtPct = function fmtPct(v) {
  return (Math.round(v * 10) / 10).toFixed(1).replace('.', ',') + '%';
};
function FlowFunnel(_ref3) {
  var stages = _ref3.stages,
    _ref3$height = _ref3.height,
    height = _ref3$height === void 0 ? 210 : _ref3$height,
    mobile = _ref3.mobile;
  var n = stages.length,
    W = 1000,
    H = 200,
    mid = H / 2,
    top = stages[0].value || 1;
  var cw = W / n;
  var hh = stages.map(function (s) {
    return Math.max(s.value / top * (H / 2) * 0.96, 10);
  });
  var up = "M0 ".concat(mid - hh[0], " L").concat(cw * 0.62, " ").concat(mid - hh[0]);
  var dn = '';
  for (var i = 1; i < n; i++) {
    var x = cw * i;
    up += " C".concat(x, " ").concat(mid - hh[i - 1], " ").concat(x, " ").concat(mid - hh[i], " ").concat(x + cw * 0.38, " ").concat(mid - hh[i], " L").concat(x + cw * 0.62, " ").concat(mid - hh[i]);
  }
  up += " L".concat(W, " ").concat(mid - hh[n - 1], " L").concat(W, " ").concat(mid + hh[n - 1], " L").concat(cw * (n - 1) + cw * 0.38, " ").concat(mid + hh[n - 1]);
  for (var _i = n - 1; _i >= 1; _i--) {
    var _x = cw * _i;
    dn += " C".concat(_x, " ").concat(mid + hh[_i], " ").concat(_x, " ").concat(mid + hh[_i - 1], " ").concat(_x - cw * 0.38, " ").concat(mid + hh[_i - 1]);
    if (_i > 1) dn += " L".concat(_x - cw * 0.62, " ").concat(mid + hh[_i - 1]);
  }
  var d = up + dn + " L0 ".concat(mid + hh[0], " Z");
  var _React$useState = React.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    hover = _React$useState2[0],
    setHover = _React$useState2[1];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: mobile ? 'auto' : 'visible',
      margin: mobile ? '0 -4px' : 0,
      scrollbarWidth: 'thin'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: mobile ? 620 : 0,
      display: 'grid',
      gridTemplateColumns: "repeat(".concat(n, ", minmax(0,1fr))"),
      position: 'relative'
    }
  }, stages.map(function (s, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: s.label,
      style: {
        padding: '0 10px 12px',
        borderLeft: i ? '1.5px dashed rgba(150,175,210,.45)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        minHeight: 52,
        justifyContent: 'flex-end'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 500,
        color: 'var(--text-muted)',
        lineHeight: 1.25
      }
    }, s.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 20,
        fontWeight: 600,
        color: 'var(--text-strong)',
        letterSpacing: '-0.01em',
        fontVariantNumeric: 'tabular-nums'
      }
    }, s.value));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: "1 / span ".concat(n),
      position: 'relative',
      height: height
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 ".concat(W, " ").concat(H),
    preserveAspectRatio: "none",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      overflow: 'visible',
      filter: 'drop-shadow(0 18px 24px rgba(10,92,255,.28))'
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "ffH",
    x1: "0",
    x2: "1",
    y1: "0",
    y2: "0"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#0A47E6"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: ".45",
    stopColor: "#1F5EFF"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: ".75",
    stopColor: "#4F7BE6"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#7B4BC4"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: "ffV",
    x1: "0",
    x2: "0",
    y1: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#fff",
    stopOpacity: ".38"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: ".5",
    stopColor: "#fff",
    stopOpacity: "0"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#2FD3FF",
    stopOpacity: ".22"
  }))), /*#__PURE__*/React.createElement("path", {
    d: d,
    fill: "url(#ffH)"
  }), /*#__PURE__*/React.createElement("path", {
    d: d,
    fill: "url(#ffV)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'grid',
      gridTemplateColumns: "repeat(".concat(n, ", minmax(0,1fr))")
    }
  }, stages.map(function (s, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: s.label,
      onMouseEnter: function onMouseEnter() {
        return setHover(i);
      },
      onMouseLeave: function onMouseLeave() {
        return setHover(null);
      },
      style: {
        borderLeft: i ? '1.5px dashed rgba(150,175,210,.45)' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'default',
        background: hover === i ? 'rgba(255,255,255,.12)' : 'transparent',
        transition: 'background var(--dur-base)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: i === 0 ? 18 : 15,
        fontWeight: 600,
        color: '#fff',
        textShadow: '0 1px 6px rgba(10,40,140,.45)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, fmtPct(s.value / (stages[0].value || 1) * 100)));
  }))), stages.map(function (s, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: s.label + 'b',
      style: {
        padding: '12px 10px 0',
        borderLeft: i ? '1.5px dashed rgba(150,175,210,.45)' : 'none',
        fontSize: 12,
        color: 'var(--text-muted)',
        lineHeight: 1.3
      }
    }, i === 0 ? 'Entrada' : /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", {
      style: {
        color: 'var(--text-strong)',
        fontWeight: 600
      }
    }, fmtPct(s.value / (stages[i - 1].value || 1) * 100)), " da etapa anterior"));
  })));
}
var CANAIS0 = [{
  label: 'Tráfego pago',
  value: 98,
  color: '#0A3FE0',
  icon: 'megaphone',
  conv: '19%'
}, {
  label: 'Orgânico',
  value: 52,
  color: '#22C3F2',
  icon: 'sprout',
  conv: '25%'
}, {
  label: 'Indicação',
  value: 36,
  color: '#7B4BC4',
  icon: 'handshake',
  conv: '38%'
}];
var BigNum = function BigNum(_ref4) {
  var children = _ref4.children,
    sub = _ref4.sub,
    trend = _ref4.trend;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 38,
      fontWeight: 600,
      color: 'var(--text-strong)',
      letterSpacing: '-0.02em'
    }
  }, children), trend ? /*#__PURE__*/React.createElement(TrendPill, {
    value: String(trend).replace(/^-/, ''),
    direction: String(trend).startsWith('-') ? 'down' : 'up'
  }) : null, sub ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: 'var(--text-muted)'
    }
  }, sub) : null);
};
function LeadsPorCanal(_ref5) {
  var canais = _ref5.canais;
  var CHANNELS = canais || CANAIS0;
  var total = CHANNELS.reduce(function (a, c) {
    return a + c.value;
  }, 0) || 1;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      height: 14,
      borderRadius: 999,
      overflow: 'hidden',
      gap: 3,
      background: 'rgba(255,255,255,.5)',
      border: '1.5px solid rgba(255,255,255,.95)'
    }
  }, CHANNELS.map(function (c) {
    return /*#__PURE__*/React.createElement("span", {
      key: c.label,
      style: {
        width: c.value / total * 100 + '%',
        background: "linear-gradient(90deg, ".concat(c.color, ", color-mix(in srgb, ").concat(c.color, " 70%, white))"),
        borderRadius: 999
      }
    });
  })), CHANNELS.map(function (c) {
    var pct = c.value / total * 100;
    return /*#__PURE__*/React.createElement("div", {
      key: c.label,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 40,
        height: 40,
        borderRadius: '50%',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255,255,255,.7)',
        border: '1.5px solid rgba(255,255,255,.95)',
        color: c.color,
        boxShadow: '0 4px 12px -8px rgba(23,73,170,.35)'
      }
    }, /*#__PURE__*/React.createElement(SIcon, {
      name: c.icon,
      size: 18,
      strokeWidth: 1.8
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        color: 'var(--text-body)'
      }
    }, c.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        color: 'var(--text-muted)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        color: 'var(--text-strong)',
        fontWeight: 600
      }
    }, c.value), " \xB7 ", pct.toFixed(0), "%")), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 6,
        borderRadius: 999,
        background: 'rgba(214,226,242,.7)',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: pct + '%',
        height: '100%',
        borderRadius: 999,
        background: c.color
      }
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: 'var(--text-muted)'
      }
    }, "Convers\xE3o ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: 'var(--text-strong)',
        fontWeight: 600
      }
    }, c.conv))));
  }));
}
function PatientsTable(_ref6) {
  var rows = _ref6.rows,
    big = _ref6.big;
  var th = {
    textAlign: 'left',
    padding: big ? '16px 16px' : '12px 14px',
    fontSize: big ? 14 : 12,
    fontWeight: 500,
    color: 'var(--text-strong)',
    textTransform: 'uppercase',
    letterSpacing: '.02em',
    whiteSpace: 'nowrap'
  };
  var td = {
    padding: big ? '14px 16px' : '10px 14px',
    fontSize: big ? 15 : 13,
    color: 'var(--text-body)',
    borderTop: '1px solid rgba(214,226,242,.9)',
    whiteSpace: 'nowrap'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto',
      overflowY: 'hidden',
      scrollbarWidth: 'thin',
      scrollbarColor: 'rgba(150,175,210,.5) transparent',
      borderRadius: 18,
      background: 'rgba(255,255,255,.35)',
      border: '1.5px solid rgba(255,255,255,.9)'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      minWidth: 640
    }
  }, /*#__PURE__*/React.createElement("thead", {
    style: {
      background: 'rgba(225,236,250,.7)'
    }
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: _objectSpread(_objectSpread({}, th), {}, {
      width: 36
    })
  }, /*#__PURE__*/React.createElement(PCheck, null)), /*#__PURE__*/React.createElement("th", {
    style: th
  }, "N\xBA Pront."), /*#__PURE__*/React.createElement("th", {
    style: th
  }, "Nome do paciente"), /*#__PURE__*/React.createElement("th", {
    style: th
  }, "Idade"), /*#__PURE__*/React.createElement("th", {
    style: th
  }, "Procedimento"), /*#__PURE__*/React.createElement("th", {
    style: th
  }, "Status"))), /*#__PURE__*/React.createElement("tbody", null, rows.map(function (r) {
    return /*#__PURE__*/React.createElement("tr", {
      key: r.id + r.name
    }, /*#__PURE__*/React.createElement("td", {
      style: td
    }, /*#__PURE__*/React.createElement(PCheck, null)), /*#__PURE__*/React.createElement("td", {
      style: td
    }, r.id), /*#__PURE__*/React.createElement("td", {
      style: td
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(PAv, {
      name: r.name,
      size: big ? 40 : 30
    }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, r.name), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontSize: big ? 13 : 11,
        color: 'var(--text-muted)'
      }
    }, r.email)))), /*#__PURE__*/React.createElement("td", {
      style: td
    }, r.age === '' || r.age === null || r.age === undefined ? '' : r.age + ' anos'), /*#__PURE__*/React.createElement("td", {
      style: td
    }, r.proc), /*#__PURE__*/React.createElement("td", {
      style: td
    }, /*#__PURE__*/React.createElement(StatusBadge, {
      s: r.status
    })));
  }))));
}

/* ---- Painel mês a mês: seletor de mês (o mesmo em todos os cartões) ---- */
var pillSel = {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  height: 40,
  padding: '0 34px 0 16px',
  borderRadius: 999,
  border: '1.5px solid rgba(255,255,255,.95)',
  background: 'rgba(255,255,255,.55)',
  color: 'var(--text-strong)',
  fontFamily: 'inherit',
  fontSize: 15,
  fontWeight: 500,
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  boxShadow: '0 4px 12px -8px rgba(23,73,170,.35)',
  boxSizing: 'border-box',
  maxWidth: '100%'
};
var selInvisivel = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
  opacity: 0,
  cursor: 'pointer',
  fontSize: 16,
  border: 0
};
function MesChip() {
  var _useStore = useStore(PAINEL_MES),
    _useStore2 = _slicedToArray(_useStore, 1),
    m = _useStore2[0];
  return /*#__PURE__*/React.createElement("label", {
    style: pillSel,
    title: "Escolher o m\xEAs do Painel"
  }, /*#__PURE__*/React.createElement(SIcon, {
    name: m.carregando ? 'loader-circle' : 'calendar',
    size: 17,
    strokeWidth: 1.7,
    style: m.carregando ? {
      animation: 'sbgira 1s linear infinite'
    } : undefined
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, mesNomeIso(m.iso)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 13,
      display: 'flex',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement(SIcon, {
    name: "chevron-down",
    size: 15
  })), /*#__PURE__*/React.createElement("select", {
    "aria-label": "M\xEAs do Painel",
    value: m.iso,
    onChange: function onChange(e) {
      return painelMudarMes(e.target.value);
    },
    style: selInvisivel
  }, mesesPainel().map(function (o) {
    return /*#__PURE__*/React.createElement("option", {
      key: o.value,
      value: o.value
    }, o.label);
  })), m.carregando ? /*#__PURE__*/React.createElement("style", null, '@keyframes sbgira{to{transform:rotate(360deg)}}') : null);
}

/* ---- Pacientes recentes: próximos atendimentos e os já feitos, por profissional ---- */
var DIA_C = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
function quandoAg(ts) {
  var p = BR.partes(ts),
    hoje = BR.hoje(),
    dia = p.iso;
  var amanha = BR.diaDe(Date.now() + 86400000),
    ontem = BR.diaDe(Date.now() - 86400000);
  var nome = dia === hoje ? 'Hoje' : dia === amanha ? 'Amanhã' : dia === ontem ? 'Ontem' : DIA_C[p.dow] + ' ' + String(p.dia).padStart(2, '0') + '/' + String(p.mes).padStart(2, '0');
  return nome + ' · ' + p.hm;
}
var AGENDA_DEMO = function AGENDA_DEMO() {
  var h = function h(d, hm) {
    return BR.instante(BR.diaDe(Date.now() + d * 86400000), hm).toISOString();
  };
  var st = {
    a: ['Confirmado', '#1F5EFF', false],
    r: ['Realizado', '#2DBF6A', true]
  };
  return [[0, '15:30', 0, 'a'], [1, '09:00', 1, 'a'], [2, '14:00', 2, 'a'], [-1, '10:30', 3, 'r'], [-3, '16:00', 4, 'r'], [-6, '11:00', 5, 'r']].map(function (_ref7, k) {
    var _ref8 = _slicedToArray(_ref7, 4),
      d = _ref8[0],
      hm = _ref8[1],
      i = _ref8[2],
      s = _ref8[3];
    var p = PATIENTS[i % PATIENTS.length];
    return {
      id: 'demo' + k,
      inicio: h(d, hm),
      prof: k % 2 ? 'demo2' : 'demo1',
      profNome: k % 2 ? 'Dr. Michael Thompson' : 'Dra. Camila Rocha',
      name: p.name,
      pront: p.id,
      age: p.age,
      proc: p.proc,
      status: st[s][0],
      cor: st[s][1],
      feito: st[s][2]
    };
  });
};
function AgStatus(_ref9) {
  var txt = _ref9.txt,
    cor = _ref9.cor;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 26,
      padding: '0 10px',
      borderRadius: 999,
      background: 'color-mix(in srgb, ' + cor + ' 8%, white)',
      border: '1px solid color-mix(in srgb, ' + cor + ' 30%, white)',
      color: cor,
      fontSize: 13,
      fontWeight: 500,
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: '50%',
      border: '2px solid ' + cor,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 3,
      height: 3,
      borderRadius: '50%',
      background: cor
    }
  })), txt);
}
function ProfChip(_ref0) {
  var value = _ref0.value,
    _onChange = _ref0.onChange,
    profs = _ref0.profs;
  var nome = value === 'todos' ? 'Todos os profissionais' : (profs.find(function (p) {
    return p.id === value;
  }) || {}).nome || 'Profissional';
  return /*#__PURE__*/React.createElement("label", {
    style: _objectSpread(_objectSpread({}, pillSel), {}, {
      maxWidth: 260
    }),
    title: "Escolher o profissional"
  }, /*#__PURE__*/React.createElement(SIcon, {
    name: "stethoscope",
    size: 17,
    strokeWidth: 1.7
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, nome), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 13,
      display: 'flex',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement(SIcon, {
    name: "chevron-down",
    size: 15
  })), /*#__PURE__*/React.createElement("select", {
    "aria-label": "Profissional",
    value: value,
    onChange: function onChange(e) {
      return _onChange(e.target.value);
    },
    style: selInvisivel
  }, /*#__PURE__*/React.createElement("option", {
    value: "todos"
  }, "Todos os profissionais"), profs.map(function (p) {
    return /*#__PURE__*/React.createElement("option", {
      key: p.id,
      value: p.id
    }, p.nome);
  })));
}
function AgendaRecentes(_ref1) {
  var D = _ref1.D,
    mobile = _ref1.mobile;
  var _useStore3 = useStore(PAINEL_MES),
    _useStore4 = _slicedToArray(_useStore3, 1),
    m = _useStore4[0];
  var demo = !D;
  var profs = demo ? [{
    id: 'demo1',
    nome: 'Dra. Camila Rocha'
  }, {
    id: 'demo2',
    nome: 'Dr. Michael Thompson'
  }] : D.profissionais;
  // profissional escolhido fica salvo nas preferências; sem escolha abre no profissional de quem entrou
  var _ref10 = SB_ON ? usePrefFiltro('painel.profissional', null) : React.useState(null),
    _ref11 = _slicedToArray(_ref10, 2),
    sel = _ref11[0],
    setSel = _ref11[1];
  var selOk = sel === 'todos' || profs.some(function (p) {
    return p.id === sel;
  }) ? sel : null;
  var atual = selOk || (D && D.meuProf && profs.some(function (p) {
    return p.id === D.meuProf;
  }) ? D.meuProf : 'todos');
  var todos = demo ? AGENDA_DEMO() : D.agenda;
  var lista = atual === 'todos' ? todos : todos.filter(function (a) {
    return a.prof === atual;
  });
  var agora = Date.now(),
    t = function t(a) {
      return new Date(a.inicio).getTime();
    };
  var prox = lista.filter(function (a) {
    return t(a) >= agora;
  }).sort(function (a, b) {
    return t(a) - t(b);
  });
  var feitos = lista.filter(function (a) {
    return t(a) < agora;
  }).sort(function (a, b) {
    return t(b) - t(a);
  });
  var comProf = atual === 'todos' && profs.length > 1;
  var th = {
    textAlign: 'left',
    padding: '12px 14px',
    fontSize: 12,
    fontWeight: 500,
    color: 'var(--text-strong)',
    textTransform: 'uppercase',
    letterSpacing: '.02em',
    whiteSpace: 'nowrap',
    position: 'sticky',
    top: 0,
    background: 'rgb(232,240,251)',
    zIndex: 1
  };
  var td = {
    padding: '10px 14px',
    fontSize: 13,
    color: 'var(--text-body)',
    borderTop: '1px solid rgba(214,226,242,.9)',
    whiteSpace: 'nowrap'
  };
  var ncol = comProf ? 5 : 4;
  var grupo = function grupo(txt, n) {
    return /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
      colSpan: ncol,
      style: _objectSpread(_objectSpread({}, td), {}, {
        padding: '9px 14px',
        fontSize: 12,
        fontWeight: 600,
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '.03em',
        background: 'rgba(255,255,255,.55)'
      })
    }, txt, " ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 500
      }
    }, "(", n, ")")));
  };
  var linha = function linha(a) {
    return /*#__PURE__*/React.createElement("tr", {
      key: a.id
    }, /*#__PURE__*/React.createElement("td", {
      style: _objectSpread(_objectSpread({}, td), {}, {
        fontVariantNumeric: 'tabular-nums',
        color: a.feito || t(a) < agora ? 'var(--text-muted)' : 'var(--text-strong)',
        fontWeight: t(a) >= agora ? 600 : 400
      })
    }, quandoAg(a.inicio)), /*#__PURE__*/React.createElement("td", {
      style: td
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(PAv, {
      name: a.name,
      size: 30
    }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, a.name), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontSize: 11,
        color: 'var(--text-muted)'
      }
    }, [a.pront, a.age !== '' && a.age !== null && a.age !== undefined ? a.age + ' anos' : ''].filter(Boolean).join(' · '))))), /*#__PURE__*/React.createElement("td", {
      style: td
    }, a.proc), comProf ? /*#__PURE__*/React.createElement("td", {
      style: td
    }, a.profNome) : null, /*#__PURE__*/React.createElement("td", {
      style: td
    }, /*#__PURE__*/React.createElement(AgStatus, {
      txt: a.status,
      cor: a.cor
    })));
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CardTitle, {
    right: /*#__PURE__*/React.createElement(ProfChip, {
      value: atual,
      onChange: setSel,
      profs: profs
    })
  }, "Pacientes recentes"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginTop: -8,
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, (D ? D.mesAtual : true) ? 'Próximos atendimentos e os já feitos em ' : 'Atendimentos de ', mesNomeIso(m.iso)), /*#__PURE__*/React.createElement("div", {
    style: {
      maxHeight: mobile ? 360 : 420,
      overflow: 'auto',
      scrollbarWidth: 'thin',
      scrollbarColor: 'rgba(150,175,210,.5) transparent',
      borderRadius: 18,
      background: 'rgba(255,255,255,.35)',
      border: '1.5px solid rgba(255,255,255,.9)'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      minWidth: comProf ? 720 : 600
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: th
  }, "Quando"), /*#__PURE__*/React.createElement("th", {
    style: th
  }, "Nome do paciente"), /*#__PURE__*/React.createElement("th", {
    style: th
  }, "Procedimento"), comProf ? /*#__PURE__*/React.createElement("th", {
    style: th
  }, "Profissional") : null, /*#__PURE__*/React.createElement("th", {
    style: th
  }, "Status"))), /*#__PURE__*/React.createElement("tbody", null, prox.length ? /*#__PURE__*/React.createElement(React.Fragment, null, grupo('Próximos', prox.length), prox.map(linha)) : null, feitos.length ? /*#__PURE__*/React.createElement(React.Fragment, null, grupo('Já atendidos', feitos.length), feitos.map(linha)) : null, !prox.length && !feitos.length ? /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: ncol,
    style: _objectSpread(_objectSpread({}, td), {}, {
      textAlign: 'center',
      padding: 32,
      color: 'var(--text-muted)',
      whiteSpace: 'normal'
    })
  }, D && !D.agenda.length && !D.profissionais.length ? 'Cadastre os profissionais para ver os atendimentos aqui.' : 'Nenhum atendimento ' + (atual === 'todos' ? '' : 'deste profissional ') + 'neste mês.')) : null))));
}

/* ---- Primeiros passos da clínica nova: cada passo é conferido nos dados da própria clínica ---- */
var PASSOS = makeStore(null);
var PASSOS_TXT = {
  dados: {
    t: 'Complete os dados da clínica',
    d: function d() {
      return 'CNPJ ou CPF, telefone e endereço. Aparecem nos recibos, na nota fiscal e nas respostas da Renata.';
    },
    ir: 'configuracoes.clinica',
    btn: 'Completar'
  },
  profissionais: {
    t: 'Cadastre os profissionais',
    d: function d(p) {
      return p.total ? p.total + (p.total === 1 ? ' profissional cadastrado.' : ' profissionais cadastrados.') : 'Quem atende aparece na agenda, no prontuário e no financeiro.';
    },
    ir: 'configuracoes.profissionais',
    btn: 'Cadastrar'
  },
  procedimentos: {
    t: 'Escolha os procedimentos e os preços',
    d: function d(p) {
      return p.feito ? p.total + (p.total === 1 ? ' procedimento marcado.' : ' procedimentos marcados.') : p.total ? p.total + ' sugestões já vêm marcadas. Desmarque o que a clínica não faz e inclua os seus.' : 'Cadastre o que a clínica faz, com preço e duração.';
    },
    ir: 'configuracoes.procedimentos',
    btn: 'Revisar',
    ok: 'Está tudo certo'
  },
  vinculos: {
    t: 'Ligue cada profissional aos procedimentos que faz',
    d: function d(p, todos) {
      return p.feito ? 'Todos os profissionais têm os seus procedimentos.' : !(todos.profissionais || {}).feito ? 'Depois de cadastrar os profissionais.' : p.faltam ? p.faltam === 1 ? '1 profissional ainda sem procedimento.' : p.faltam + ' profissionais ainda sem procedimento.' : 'Assim a agenda só oferece quem faz cada procedimento.';
    },
    ir: 'configuracoes.profissionais',
    btn: 'Ligar'
  },
  horarios: {
    t: 'Confira os horários de funcionamento',
    d: function d() {
      return 'A Renata usa esses horários para sugerir horários livres aos pacientes.';
    },
    ir: 'configuracoes.clinica',
    btn: 'Conferir',
    ok: 'Está certo'
  },
  equipe: {
    t: 'Convide a sua equipe',
    d: function d() {
      return 'Recepção, profissionais e financeiro entram com o próprio login e só veem o que você liberar.';
    },
    ir: 'configuracoes.equipe',
    btn: 'Convidar',
    ok: 'Pular'
  }
};
function carregarPassos() {
  return _carregarPassos.apply(this, arguments);
}
function _carregarPassos() {
  _carregarPassos = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var _yield$SB$rpc, data, error, pend;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          if (!(!SB_ON || !CLI())) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2);
        case 1:
          _context2.n = 2;
          return SB.rpc('primeiros_passos', {
            p_clinica: CLI()
          });
        case 2:
          _yield$SB$rpc = _context2.v;
          data = _yield$SB$rpc.data;
          error = _yield$SB$rpc.error;
          if (!(error || !data)) {
            _context2.n = 3;
            break;
          }
          return _context2.a(2);
        case 3:
          pend = (data.passos || []).some(function (p) {
            return !p.feito;
          });
          PASSOS.v = _objectSpread(_objectSpread({}, data), {}, {
            clinica: CLI(),
            visto: PASSOS.v && PASSOS.v.clinica === CLI() && PASSOS.v.visto || pend
          });
          avisar(PASSOS);
        case 4:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return _carregarPassos.apply(this, arguments);
}
function marcarPasso(_x2, _x3) {
  return _marcarPasso.apply(this, arguments);
}
function _marcarPasso() {
  _marcarPasso = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(passo, feito) {
    var _yield$SB$rpc2, data, error;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.n) {
        case 0:
          _context3.n = 1;
          return SB.rpc('marcar_primeiro_passo', {
            p_clinica: CLI(),
            p_passo: passo,
            p_feito: feito !== false
          });
        case 1:
          _yield$SB$rpc2 = _context3.v;
          data = _yield$SB$rpc2.data;
          error = _yield$SB$rpc2.error;
          if (!error) {
            _context3.n = 2;
            break;
          }
          avisoErro('Não foi possível salvar', error);
          return _context3.a(2);
        case 2:
          PASSOS.v = _objectSpread(_objectSpread({}, data), {}, {
            clinica: CLI(),
            visto: true
          });
          avisar(PASSOS);
        case 3:
          return _context3.a(2);
      }
    }, _callee3);
  }));
  return _marcarPasso.apply(this, arguments);
}
function PrimeirosPassos(_ref12) {
  var mobile = _ref12.mobile;
  var PBtn = window.SaluteProjetoDesigner_8b4683.Button;
  var _useStore5 = useStore(PASSOS),
    _useStore6 = _slicedToArray(_useStore5, 1),
    ps = _useStore6[0];
  var _useAccess = useAccess(),
    can = _useAccess.can;
  var _React$useState3 = React.useState(null),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    ocupado = _React$useState4[0],
    setOcupado = _React$useState4[1];
  var pode = SB_ON && can('perfil') && can('perfil.cadastro');
  React.useEffect(function () {
    if (pode) carregarPassos();
  }, [pode, CLI()]);
  if (!pode || !ps || ps.clinica !== CLI() || ps.oculto || !ps.visto) return null;
  var lista = ps.passos || [],
    porChave = Object.fromEntries(lista.map(function (p) {
      return [p.chave, p];
    }));
  var feitos = lista.filter(function (p) {
      return p.feito;
    }).length,
    total = lista.length,
    pronto = feitos === total;
  var marcar = /*#__PURE__*/function () {
    var _ref13 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(k, v) {
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            setOcupado(k);
            _context.n = 1;
            return marcarPasso(k, v);
          case 1:
            setOcupado(null);
          case 2:
            return _context.a(2);
        }
      }, _callee);
    }));
    return function marcar(_x4, _x5) {
      return _ref13.apply(this, arguments);
    };
  }();
  return /*#__PURE__*/React.createElement("section", {
    "aria-label": "Primeiros passos",
    style: _objectSpread(_objectSpread({}, glass), {}, {
      padding: mobile ? 18 : 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 14,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: pronto ? 'rgba(45,191,106,.14)' : 'rgba(31,94,255,.1)',
      color: pronto ? '#1E8E4E' : '#1F5EFF'
    }
  }, /*#__PURE__*/React.createElement(SIcon, {
    name: pronto ? 'party-popper' : 'rocket',
    size: 21
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: mobile ? 19 : 22,
      fontWeight: 600,
      color: 'var(--text-strong)',
      letterSpacing: '-0.01em'
    }
  }, pronto ? 'Clínica pronta para atender' : 'Primeiros passos'), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '3px 0 0',
      fontSize: 14,
      color: 'var(--text-muted)'
    }
  }, pronto ? 'Tudo configurado. Você pode mudar qualquer item depois em Configurações.' : 'Deixe a clínica pronta para atender em poucos minutos. ' + feitos + ' de ' + total + ' feitos.')), /*#__PURE__*/React.createElement(PBtn, {
    size: "sm",
    variant: pronto ? 'primary' : 'ghost',
    iconLeft: pronto ? 'check' : 'eye-off',
    loading: ocupado === 'oculto',
    onClick: function onClick() {
      return marcar('oculto');
    }
  }, pronto ? 'Concluir' : mobile ? 'Ocultar' : 'Ocultar quadro')), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 8,
      borderRadius: 999,
      background: 'rgba(31,94,255,.1)',
      overflow: 'hidden'
    },
    role: "progressbar",
    "aria-valuemin": 0,
    "aria-valuemax": total,
    "aria-valuenow": feitos,
    "aria-label": "Passos feitos"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: (total ? feitos / total * 100 : 0) + '%',
      height: '100%',
      borderRadius: 999,
      background: pronto ? '#2DBF6A' : 'linear-gradient(90deg,#0B4BEB 0%,#1FB6F5 100%)',
      transition: 'width .4s ease'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: mobile ? '1fr' : 'repeat(auto-fit, minmax(420px, 1fr))',
      gap: 10
    }
  }, lista.map(function (p, i) {
    var tx = PASSOS_TXT[p.chave];
    if (!tx) return null;
    var feito = p.feito;
    return /*#__PURE__*/React.createElement("div", {
      key: p.chave,
      style: {
        display: 'flex',
        alignItems: mobile ? 'flex-start' : 'center',
        gap: 12,
        padding: '12px 14px',
        borderRadius: 18,
        background: feito ? 'rgba(255,255,255,.35)' : 'rgba(255,255,255,.7)',
        border: '1.5px solid ' + (feito ? 'rgba(255,255,255,.6)' : 'rgba(255,255,255,.95)'),
        flexWrap: mobile ? 'wrap' : 'nowrap'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 28,
        height: 28,
        borderRadius: '50%',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 13,
        fontWeight: 600,
        background: feito ? '#2DBF6A' : 'rgba(31,94,255,.1)',
        color: feito ? '#fff' : '#1F5EFF'
      }
    }, feito ? /*#__PURE__*/React.createElement(SIcon, {
      name: "check",
      size: 15,
      strokeWidth: 2.4
    }) : i + 1), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: mobile ? 'calc(100% - 44px)' : 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontSize: 15,
        fontWeight: 600,
        color: feito ? 'var(--text-muted)' : 'var(--text-strong)',
        textDecorationLine: feito ? 'line-through' : 'none',
        textDecorationColor: 'rgba(107,122,147,.5)'
      }
    }, tx.t), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontSize: 13,
        color: 'var(--text-muted)',
        lineHeight: 1.45
      }
    }, p.pulado ? 'Pulado. Você pode convidar quando quiser em Equipe e acessos.' : tx.d(p, porChave))), feito ? null : /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        gap: 8,
        flexShrink: 0,
        marginLeft: mobile ? 40 : 0
      }
    }, tx.ok ? /*#__PURE__*/React.createElement(PBtn, {
      size: "sm",
      variant: "ghost",
      loading: ocupado === p.chave,
      onClick: function onClick() {
        return marcar(p.chave);
      }
    }, tx.ok) : null, /*#__PURE__*/React.createElement(PBtn, {
      size: "sm",
      variant: "secondary",
      iconRight: "arrow-right",
      onClick: function onClick() {
        return rnIrPara(tx.ir);
      }
    }, tx.btn)));
  })));
}
function PainelScreen(_ref14) {
  var mobile = _ref14.mobile,
    onNavigate = _ref14.onNavigate;
  var _React$useState5 = React.useState(null),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    feriadoSel = _React$useState6[0],
    setFeriadoSel = _React$useState6[1];
  var _useStore7 = useStore(PAINEL),
    _useStore8 = _slicedToArray(_useStore7, 1),
    pv = _useStore8[0];
  var _useStore9 = useStore(PAINEL_MES),
    _useStore0 = _slicedToArray(_useStore9, 1),
    mesSt = _useStore0[0];
  var mesAgora = mesesPainel()[0].value,
    mesMin = mesesPainel()[11].value;
  var carga = useCarga('painel');
  var D = SB_ON ? painelTela(pv) : null;
  var stats = D ? D.stats : [{
    icon: 'users',
    title: 'Total de pacientes',
    value: '102',
    trend: {
      value: '12,8%',
      label: 'no último mês'
    },
    breakdown: [{
      label: 'Novos',
      value: 48
    }, {
      label: 'Antigos',
      value: 54
    }]
  }, {
    icon: 'calendar-days',
    title: 'Agendamentos',
    value: '254',
    trend: {
      value: '1,9%',
      label: 'no último mês'
    },
    breakdown: [{
      label: 'Novos',
      value: 56
    }, {
      label: 'Retornos',
      value: 43
    }]
  }, {
    icon: 'sparkles',
    title: 'IA economizou seu tempo',
    value: '27h',
    trend: {
      value: '11,5%',
      label: 'no último mês'
    },
    breakdown: [{
      label: 'Conversas',
      value: 412
    }, {
      label: 'Agendou',
      value: 64
    }]
  }];
  var narrow = useNarrow();
  var feriadoMap = React.useMemo(function () {
    var m = {};
    if (D && D.mes && D.mes.feriados) {
      D.mes.feriados.forEach(function (f) {
        m[f.dia] = f;
      });
    }
    return m;
  }, [D]);
  function handleDayClick(dia) {
    var f = feriadoMap[dia];
    if (f) setFeriadoSel(f);
  }
  if (SB_ON && carga !== 'ok') return /*#__PURE__*/React.createElement(CargaEstado, {
    estado: carga,
    onRetry: function onRetry() {
      return carregar('painel', true);
    }
  });
  var g = mobile ? 14 : 26;
  var one = mobile || narrow;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: g
    }
  }, /*#__PURE__*/React.createElement(PrimeirosPassos, {
    mobile: mobile
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: mobile ? '1fr' : narrow ? 'repeat(auto-fit, minmax(280px,1fr))' : 'repeat(3, minmax(0,1fr))',
      gap: g
    }
  }, stats.map(function (s) {
    return /*#__PURE__*/React.createElement(StatCard, _extends({
      key: s.title
    }, s, {
      onMenu: function onMenu() {},
      style: _objectSpread(_objectSpread({}, glass), {}, {
        padding: mobile ? 18 : 22
      })
    }));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: one ? '1fr' : 'minmax(0,1.84fr) minmax(0,1fr)',
      gap: g
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: _objectSpread(_objectSpread({}, glass), {}, {
      padding: mobile ? 18 : 26,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    })
  }, /*#__PURE__*/React.createElement(CardTitle, {
    right: /*#__PURE__*/React.createElement(MesChip, null)
  }, "Funil de vendas"), /*#__PURE__*/React.createElement(BigNum, {
    trend: D ? D.funilTrend : '9,4%',
    sub: "leads no funil"
  }, D ? D.funilTotal : 186), /*#__PURE__*/React.createElement(FlowFunnel, {
    stages: D ? D.funil : FUNNEL,
    mobile: mobile,
    height: mobile ? 170 : 210
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 12,
      flexWrap: 'wrap',
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Novo at\xE9 Finalizado: ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-strong)',
      fontWeight: 600
    }
  }, D ? D.conv : '24,7%'), " de convers\xE3o"), /*#__PURE__*/React.createElement("span", null, "Tempo m\xE9dio no funil: ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-strong)',
      fontWeight: 600
    }
  }, D ? D.diasMedios : '6 dias')))), /*#__PURE__*/React.createElement("section", {
    style: _objectSpread(_objectSpread({}, glass), {}, {
      padding: mobile ? 18 : 26,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    })
  }, /*#__PURE__*/React.createElement(CardTitle, {
    right: /*#__PURE__*/React.createElement(MesChip, null)
  }, "Leads por canal"), /*#__PURE__*/React.createElement(BigNum, {
    sub: "Leads"
  }, D ? D.leads : 186), /*#__PURE__*/React.createElement(LeadsPorCanal, {
    canais: D ? D.canais : null
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: one ? '1fr' : 'minmax(0,1.84fr) minmax(0,1fr)',
      gap: g
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: _objectSpread(_objectSpread({}, glass), {}, {
      padding: mobile ? 18 : 26,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    })
  }, /*#__PURE__*/React.createElement(CardTitle, {
    right: /*#__PURE__*/React.createElement(MesChip, null)
  }, "Atendimentos"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 38,
      fontWeight: 600,
      color: 'var(--text-strong)',
      letterSpacing: '-0.02em'
    }
  }, D ? D.atend : 48), /*#__PURE__*/React.createElement(TrendPill, {
    value: D ? D.atendTrend.replace(/^-/, '') : '0,8%',
    direction: D && D.atendTrend.startsWith('-') ? 'down' : 'up'
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: 'var(--text-muted)'
    }
  }, "vs m\xEAs anterior")), /*#__PURE__*/React.createElement(BarChart, {
    data: D ? D.week : WEEK,
    max: D ? D.weekMax : 65,
    ticks: 5,
    height: mobile ? 180 : 250
  })), /*#__PURE__*/React.createElement("section", {
    style: _objectSpread(_objectSpread({}, glass), {}, {
      padding: mobile ? 18 : 26,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      overflow: 'hidden'
    })
  }, /*#__PURE__*/React.createElement(CardTitle, {
    right: /*#__PURE__*/React.createElement(MesChip, null)
  }, "G\xEAnero"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 38,
      fontWeight: 600,
      color: 'var(--text-strong)',
      letterSpacing: '-0.02em'
    }
  }, D ? D.total : 102), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: 'var(--text-muted)'
    }
  }, "Pacientes")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24,
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: '#0A3FE0'
    }
  }), "Homens ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-strong)',
      fontWeight: 600
    }
  }, D ? D.homens : '35%')), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: '#22C3F2'
    }
  }), "Mulheres ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-strong)',
      fontWeight: 600
    }
  }, D ? D.mulheres : '15%'))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'flex-end',
      margin: '0 -8px -28px'
    }
  }, /*#__PURE__*/React.createElement(GaugeChart, {
    value: D ? D.gaugeHomens : 35,
    max: D ? Math.max(D.gaugeHomens, D.gaugeMulheres) : 100,
    label: "Total de pacientes",
    display: D ? D.gauge : '1000+',
    size: 420
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: one ? '1fr' : 'minmax(0,1fr) minmax(0,1.84fr)',
      gap: g
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: _objectSpread(_objectSpread({}, glass), {}, {
      padding: mobile ? 18 : 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    })
  }, /*#__PURE__*/React.createElement(CardTitle, {
    right: /*#__PURE__*/React.createElement(Legend, {
      items: [['Consulta', '#1F5EFF'], ['Reunião', '#F2694A']]
    })
  }, "Atividade mensal"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: 'var(--text-strong)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "M\xEAs anterior",
    disabled: mesSt.iso <= mesMin,
    onClick: function onClick() {
      return painelMudarMes(mesVizinho(mesSt.iso, -1));
    },
    style: {
      border: 0,
      background: 'none',
      padding: 4,
      display: 'flex',
      color: 'inherit',
      cursor: mesSt.iso <= mesMin ? 'default' : 'pointer',
      opacity: mesSt.iso <= mesMin ? .35 : 1
    }
  }, /*#__PURE__*/React.createElement(SIcon, {
    name: "chevron-left",
    size: 20
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20,
      fontWeight: 500
    }
  }, D ? D.mesNome : mesNomeIso(mesSt.iso)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Pr\xF3ximo m\xEAs",
    disabled: mesSt.iso >= mesAgora,
    onClick: function onClick() {
      return painelMudarMes(mesVizinho(mesSt.iso, 1));
    },
    style: {
      border: 0,
      background: 'none',
      padding: 4,
      display: 'flex',
      color: 'inherit',
      cursor: mesSt.iso >= mesAgora ? 'default' : 'pointer',
      opacity: mesSt.iso >= mesAgora ? .35 : 1
    }
  }, /*#__PURE__*/React.createElement(SIcon, {
    name: "chevron-right",
    size: 20
  }))), D ? /*#__PURE__*/React.createElement(MonthGrid, _extends({
    compact: true
  }, D.mes, {
    feriadoMap: feriadoMap,
    onDayClick: handleDayClick
  })) : /*#__PURE__*/React.createElement(MonthGrid, {
    compact: true
  })), /*#__PURE__*/React.createElement("section", {
    style: _objectSpread(_objectSpread({}, glass), {}, {
      padding: mobile ? 18 : 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    })
  }, /*#__PURE__*/React.createElement(AgendaRecentes, {
    D: D,
    mobile: mobile
  })))), feriadoSel && /*#__PURE__*/React.createElement(FeriadoModal, {
    feriado: feriadoSel,
    onClose: function onClose() {
      return setFeriadoSel(null);
    }
  }));
}
Object.assign(window, {
  PainelScreen: PainelScreen,
  PatientsTable: PatientsTable
});