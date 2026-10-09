"use strict";

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
// Shared bits for the reference-identical kit: data, glass card, chips, status badges.
var _window$SaluteProjeto = window.SaluteProjetoDesigner_8b4683,
  SIcon = _window$SaluteProjeto.Icon,
  SAvatar = _window$SaluteProjeto.Avatar;
var KIT_NAV = [{
  id: 'painel',
  label: 'Painel',
  icon: 'house'
}, {
  id: 'pacientes',
  label: 'Pacientes',
  icon: 'users'
}, {
  id: 'agenda',
  label: 'Agenda',
  icon: 'calendar-days'
}, {
  id: 'mensagens',
  label: 'Mensagens',
  icon: 'messages-square'
}, {
  id: 'gestao',
  label: 'Gestão',
  icon: 'briefcase-business'
}, {
  id: 'perfil',
  label: 'Configurações',
  icon: 'settings'
}];
var KIT_USER = {
  name: 'Camila Rocha'
};
var PATIENTS = [{
  id: 'P00001',
  name: 'Ahmad Lipshutz',
  email: 'ahmadlipshutz@gmail.com',
  age: 21,
  proc: 'Avaliação',
  status: 'tratamento'
}, {
  id: 'P000012',
  name: 'Charlie Botosh',
  email: 'charliebotosh@gmail.com',
  age: 23,
  proc: 'Limpeza de pele',
  status: 'consulta'
}, {
  id: 'P000034',
  name: 'Adison Schleifer',
  email: 'adisonschleifer@gmail.com',
  age: 25,
  proc: 'Harmonização',
  status: 'concluido'
}, {
  id: 'P000014',
  name: 'Guy Hawkins',
  email: 'sara.cruz@example.com',
  age: 27,
  proc: 'Clareamento',
  status: 'tratamento'
}, {
  id: 'P000013',
  name: 'Floyd Miles',
  email: 'georgia.young@example.com',
  age: 29,
  proc: 'Limpeza de pele',
  status: 'consulta'
}, {
  id: 'P000021',
  name: 'Savannah Nguyen',
  email: 'debra.holt@example.com',
  age: 31,
  proc: 'Harmonização',
  status: 'concluido'
}, {
  id: 'P000019',
  name: 'Devon Lane',
  email: 'felicia.reid@example.com',
  age: 33,
  proc: 'Clareamento',
  status: 'tratamento'
}, {
  id: 'P000016',
  name: 'Darlene Robertson',
  email: 'michael.mitc@example.com',
  age: 35,
  proc: 'Limpeza de pele',
  status: 'consulta'
}];
var STATUS = {
  tratamento: {
    label: 'Em tratamento',
    c: '#F2694A',
    bg: 'rgba(242,105,74,.08)',
    bd: 'rgba(242,105,74,.28)'
  },
  consulta: {
    label: 'Consulta',
    c: '#1F5EFF',
    bg: 'rgba(31,94,255,.07)',
    bd: 'rgba(31,94,255,.28)'
  },
  concluido: {
    label: 'Concluído',
    c: '#2DBF6A',
    bg: 'rgba(45,191,106,.08)',
    bd: 'rgba(45,191,106,.28)'
  }
};
var glass = {
  background: 'linear-gradient(180deg, rgba(255,255,255,.62) 0%, rgba(255,255,255,.4) 100%)',
  border: '2px solid rgba(255,255,255,.9)',
  borderRadius: 26,
  boxShadow: '0 18px 40px -26px rgba(23,73,170,.35)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  boxSizing: 'border-box',
  minWidth: 0
};
function StatusBadge(_ref) {
  var s = _ref.s;
  var v = STATUS[s];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 26,
      padding: '0 10px',
      borderRadius: 999,
      background: v.bg,
      border: "1px solid ".concat(v.bd),
      color: v.c,
      fontSize: 13,
      fontWeight: 500,
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: '50%',
      border: "2px solid ".concat(v.c),
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
      background: v.c
    }
  })), v.label);
}
function PillChip(_ref2) {
  var _ref2$icon = _ref2.icon,
    icon = _ref2$icon === void 0 ? 'calendar' : _ref2$icon,
    children = _ref2.children,
    onClick = _ref2.onClick;
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: 40,
      padding: '0 16px',
      borderRadius: 999,
      border: '1.5px solid rgba(255,255,255,.95)',
      background: 'rgba(255,255,255,.55)',
      color: 'var(--text-strong)',
      fontFamily: 'inherit',
      fontSize: 15,
      fontWeight: 500,
      whiteSpace: 'nowrap',
      cursor: 'pointer',
      boxShadow: '0 4px 12px -8px rgba(23,73,170,.35)'
    }
  }, /*#__PURE__*/React.createElement(SIcon, {
    name: icon,
    size: 17,
    strokeWidth: 1.7
  }), children);
}
function CardTitle(_ref3) {
  var children = _ref3.children,
    right = _ref3.right,
    _ref3$size = _ref3.size,
    size = _ref3$size === void 0 ? 22 : _ref3$size;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: size,
      fontWeight: 600,
      color: 'var(--text-strong)',
      letterSpacing: '-0.01em'
    }
  }, children), right);
}
function Legend(_ref4) {
  var items = _ref4.items;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 16
    }
  }, items.map(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
      l = _ref6[0],
      c = _ref6[1];
    return /*#__PURE__*/React.createElement("span", {
      key: l,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 13,
        color: 'var(--text-muted)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: c
      }
    }), l);
  }));
}
function MonthGrid(_ref7) {
  var _ref7$today = _ref7.today,
    today = _ref7$today === void 0 ? 2 : _ref7$today,
    _ref7$bold = _ref7.bold,
    bold = _ref7$bold === void 0 ? [6, 7] : _ref7$bold,
    _ref7$startOffset = _ref7.startOffset,
    startOffset = _ref7$startOffset === void 0 ? 4 : _ref7$startOffset,
    _ref7$days = _ref7.days,
    days = _ref7$days === void 0 ? 31 : _ref7$days,
    compact = _ref7.compact,
    _ref7$feriadoMap = _ref7.feriadoMap,
    feriadoMap = _ref7$feriadoMap === void 0 ? {} : _ref7$feriadoMap,
    onDayClick = _ref7.onDayClick;
  var cells = [].concat(_toConsumableArray(Array(startOffset).fill(null)), _toConsumableArray(Array.from({
    length: days
  }, function (_, i) {
    return i + 1;
  })));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7,1fr)',
      rowGap: compact ? 6 : 14,
      textAlign: 'center'
    }
  }, ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'].map(function (d) {
    return /*#__PURE__*/React.createElement("span", {
      key: d,
      style: {
        fontSize: 13,
        color: 'var(--text-body)',
        paddingBottom: compact ? 4 : 10
      }
    }, d);
  }), cells.map(function (d, i) {
    if (d === null) return /*#__PURE__*/React.createElement("span", {
      key: 'e' + i
    });
    var isFeriado = !!feriadoMap[d];
    var isToday = d === today;
    var isBold = bold.includes(d);
    return /*#__PURE__*/React.createElement("div", {
      key: d,
      title: isFeriado ? 'Feriado: ' + feriadoMap[d].nome + (feriadoMap[d].tipo === 'ponto_facultativo' ? ' (ponto facultativo)' : '') : undefined,
      'aria-label': isFeriado ? d + ', feriado: ' + feriadoMap[d].nome : undefined,
      onClick: isFeriado && onDayClick ? function () {
        return onDayClick(d);
      } : undefined,
      style: {
        justifySelf: 'center',
        position: 'relative',
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        cursor: isFeriado ? 'pointer' : 'default'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 40,
        height: 40,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
        fontWeight: isFeriado ? 700 : isToday || isBold || d > 7 ? 600 : 400,
        color: isToday ? '#1F5EFF' : isFeriado ? '#fff' : d < 6 ? 'var(--text-muted)' : 'var(--text-strong)',
        background: isToday ? '#fff' : isFeriado ? 'linear-gradient(160deg,#F2707A,#D93838)' : 'transparent',
        boxShadow: isToday ? isFeriado ? '0 0 0 2.5px #D93838, 0 4px 12px -6px rgba(23,73,170,.4)' : '0 4px 12px -6px rgba(23,73,170,.4)' : isFeriado ? '0 6px 14px -6px rgba(217,56,56,.65)' : 'none'
      }
    }, d), isFeriado && /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        bottom: 2,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 5,
        height: 5,
        borderRadius: '50%',
        background: '#D93838'
      }
    }));
  }));
}
function FeriadoModal(_ref8) {
  var feriado = _ref8.feriado,
    onClose = _ref8.onClose;
  if (!feriado) return null;
  return /*#__PURE__*/React.createElement("div", {
    "data-overlay": "1",
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: Z.dialogo,
      background: 'rgba(15,23,42,0.35)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    style: {
      background: '#fff',
      borderRadius: 20,
      padding: '28px 32px',
      maxWidth: 380,
      width: '100%',
      boxShadow: '0 20px 60px -16px rgba(15,23,42,0.25)',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 14,
      background: 'rgba(229,109,38,0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(SIcon, {
    name: "calendar-x",
    size: 22,
    style: {
      color: '#E56D26'
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 11,
      fontWeight: 600,
      color: '#E56D26',
      textTransform: 'uppercase',
      letterSpacing: '0.08em'
    }
  }, "Feriado"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, feriado.nome))), feriado.tipo && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      color: 'var(--text-muted)',
      paddingLeft: 56
    }
  }, feriado.tipo === 'nacional' ? 'Feriado nacional' : feriado.tipo === 'ponto_facultativo' ? 'Ponto facultativo nacional' : feriado.tipo === 'estadual' ? 'Feriado estadual' : feriado.tipo === 'municipal' ? 'Feriado municipal' : 'Feriado da clínica'), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: '1.5px solid rgba(214,226,242,.6)',
      paddingTop: 16,
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    style: {
      padding: '9px 22px',
      borderRadius: 10,
      border: 0,
      background: '#F1F5FF',
      color: '#1F5EFF',
      fontWeight: 600,
      fontSize: 14,
      cursor: 'pointer'
    }
  }, "Fechar"))));
}
function useNarrow() {
  var px = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1180;
  var _React$useState = React.useState(function () {
      return window.matchMedia('(max-width: ' + px + 'px)').matches;
    }),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    n = _React$useState2[0],
    setN = _React$useState2[1];
  React.useEffect(function () {
    var mq = window.matchMedia('(max-width: ' + px + 'px)');
    var f = function f() {
      return setN(mq.matches);
    };
    mq.addEventListener('change', f);
    return function () {
      return mq.removeEventListener('change', f);
    };
  }, [px]);
  return n;
}
Object.assign(window, {
  useNarrow: useNarrow,
  KIT_NAV: KIT_NAV,
  KIT_USER: KIT_USER,
  PATIENTS: PATIENTS,
  STATUS: STATUS,
  glass: glass,
  StatusBadge: StatusBadge,
  PillChip: PillChip,
  CardTitle: CardTitle,
  Legend: Legend,
  MonthGrid: MonthGrid,
  FeriadoModal: FeriadoModal
});

/* ===== Estado compartilhado ===== */
function makeStore(init) {
  return {
    v: init,
    subs: new Set()
  };
}
function useStore(st) {
  var _React$useState3 = React.useState(0),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    force = _React$useState4[1];
  var visto = React.useRef(st.v);
  visto.current = st.v;
  React.useEffect(function () {
    var s = function s() {
      return force(function (x) {
        return x + 1;
      });
    };
    st.subs.add(s);
    if (st.v !== visto.current) s();
    return function () {
      st.subs["delete"](s);
    };
  }, [st]);
  return [st.v, function (u) {
    st.v = typeof u === 'function' ? u(st.v) : u;
    st.subs.forEach(function (s) {
      return s();
    });
  }];
}
var lsGet = function lsGet(k, d) {
  try {
    var v = localStorage.getItem(k);
    return v === null ? d : JSON.parse(v);
  } catch (e) {
    return d;
  }
};
var lsSet = function lsSet(k, v) {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch (e) {}
};

/* ===== Módulos do sistema (fonte única: menu, abas e permissões) ===== */
var GESTAO_AREAS = [['estoque', 'Estoque', 'package', 'Produtos, validade e consumo'], ['financeiro', 'Financeiro', 'wallet', 'Receitas, despesas e caixa']];
var CONFIG_TABS = [['cadastro', 'Cadastro', 'clipboard-pen'], ['canais', 'Integrações', 'radio-tower'], ['agente', 'Agente de IA', 'bot'], ['flix', 'Saluteflix', 'clapperboard'], ['parcerias', 'Parcerias', 'handshake'], ['cert', 'Certificações', 'award'], ['conta', 'Minha conta', 'user']];
// a aba Agente de IA é só do administrador master (perfis_usuario.admin_plataforma): não entra nas permissões da equipe
var agenteIaPermitido = function agenteIaPermitido() {
  return !SB_ON || !!(SESSAO.v && SESSAO.v.admin);
};
var SUBMODS = {
  gestao: GESTAO_AREAS,
  perfil: CONFIG_TABS.filter(function (t) {
    return t[0] !== 'agente';
  })
};
var moduleTree = function moduleTree() {
  return KIT_NAV.map(function (n) {
    return {
      id: n.id,
      label: n.label,
      icon: n.icon,
      children: (SUBMODS[n.id] || []).map(function (_ref9) {
        var _ref0 = _slicedToArray(_ref9, 2),
          k = _ref0[0],
          l = _ref0[1];
        return {
          id: n.id + '.' + k,
          label: l
        };
      })
    };
  });
};
var allModuleIds = function allModuleIds() {
  return moduleTree().flatMap(function (m) {
    return [m.id].concat(_toConsumableArray(m.children.map(function (c) {
      return c.id;
    })));
  });
};
var withKids = function withKids(ids) {
  return moduleTree().flatMap(function (m) {
    return ids.includes(m.id) ? [m.id].concat(_toConsumableArray(m.children.map(function (c) {
      return c.id;
    }))) : [];
  });
};
var TEAM_STORE = makeStore([{
  id: 1,
  nome: 'Camila Rocha',
  funcao: 'Administradora',
  email: 'camila@bellaforma.com.br',
  acc: allModuleIds(),
  dono: true
}, {
  id: 2,
  nome: 'Ana Paula',
  funcao: 'Recepção',
  email: 'recepcao@bellaforma.com.br',
  acc: withKids(['pacientes', 'agenda', 'mensagens'])
}, {
  id: 3,
  nome: 'Darlene Robertson',
  funcao: 'Profissional',
  email: 'darlene@bellaforma.com.br',
  acc: withKids(['pacientes', 'agenda', 'mensagens'])
}, {
  id: 4,
  nome: 'Paula Mendes',
  funcao: 'Financeiro',
  email: 'financeiro@bellaforma.com.br',
  acc: ['painel', 'gestao', 'gestao.financeiro']
}]);
var VIEW_AS = makeStore(null);
function useAccess() {
  var _useStore = useStore(TEAM_STORE),
    _useStore2 = _slicedToArray(_useStore, 1),
    team = _useStore2[0];
  var _useStore3 = useStore(VIEW_AS),
    _useStore4 = _slicedToArray(_useStore3, 1),
    va = _useStore4[0];
  var m = va ? team.find(function (x) {
    return x.id === va;
  }) : null;
  var _useStore5 = useStore(SESSAO),
    _useStore6 = _slicedToArray(_useStore5, 1),
    ses = _useStore6[0];
  var meus = ses && ses.modulos;
  return {
    member: m,
    can: function can(id) {
      return (!meus || meus.includes(id)) && (!m || m.dono || m.acc.includes(id));
    }
  };
}

/* ===== Som de nova mensagem ===== */
var SOUND = makeStore(lsGet('salute-kit:sound', {
  on: true,
  tone: 'cristal',
  vol: 0.6
}));
var __actx = null;
var audioCtx = function audioCtx() {
  try {
    if (!__actx) __actx = new (window.AudioContext || window.webkitAudioContext)();
    if (__actx.state === 'suspended') __actx.resume();
  } catch (e) {}
  return __actx;
};
window.addEventListener('pointerdown', function () {
  return audioCtx();
}, {
  once: true
});
var TONES = {
  cristal: {
    label: 'Cristal',
    notes: [[1046.5, 0, 0.35], [1568, 0.11, 0.5]],
    type: 'sine'
  },
  suave: {
    label: 'Suave',
    notes: [[659.3, 0, 0.45], [880, 0.16, 0.6]],
    type: 'triangle'
  },
  pop: {
    label: 'Pop',
    notes: [[523.3, 0, 0.12], [1046.5, 0.06, 0.18]],
    type: 'sine'
  }
};
function playMsgSound(tone, vol) {
  var st = SOUND.v;
  var ctx = audioCtx();
  if (!ctx) return;
  var t = TONES[tone || st.tone] || TONES.cristal,
    v = vol !== undefined ? vol : st.vol,
    now = ctx.currentTime + 0.02;
  t.notes.forEach(function (_ref1) {
    var _ref10 = _slicedToArray(_ref1, 3),
      f = _ref10[0],
      at = _ref10[1],
      dur = _ref10[2];
    var o = ctx.createOscillator(),
      g = ctx.createGain();
    o.type = t.type;
    o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, now + at);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, 0.32 * v), now + at + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, now + at + dur);
    o.connect(g);
    g.connect(ctx.destination);
    o.start(now + at);
    o.stop(now + at + dur + 0.05);
  });
}
var INCOMING = makeStore(null);
function notifyIncoming(from, text) {
  if (SOUND.v.on) playMsgSound();
  INCOMING.v = {
    id: Date.now(),
    from: from,
    text: text
  };
  INCOMING.subs.forEach(function (s) {
    return s();
  });
}

/* ===== Idioma ===== */
var LANGS = [['pt', 'Português (Brasil)', 'PT'], ['en', 'English', 'EN'], ['es', 'Español', 'ES']];
var LANG = makeStore(lsGet('salute-kit:lang', 'pt'));
var DICT = {
  'Painel': ['Dashboard', 'Panel'],
  'Pacientes': ['Patients', 'Pacientes'],
  'Agenda': ['Schedule', 'Agenda'],
  'Mensagens': ['Messages', 'Mensajes'],
  'Gestão': ['Management', 'Gestión'],
  'Configurações': ['Settings', 'Configuración'],
  'Bom dia, Dra. Camila': ['Good morning, Dr. Camila', 'Buenos días, Dra. Camila'],
  'Seu progresso esta semana está ótimo.': ['Your progress this week is great.', 'Tu progreso esta semana es excelente.'],
  'Buscar...': ['Search...', 'Buscar...'],
  'Total de pacientes': ['Total patients', 'Total de pacientes'],
  'Agendamentos': ['Appointments', 'Citas'],
  'IA economizou seu tempo': ['AI saved your time', 'La IA ahorró tu tiempo'],
  'no último mês': ['last month', 'el último mes'],
  'Funil de vendas': ['Sales funnel', 'Embudo de ventas'],
  'Leads por canal': ['Leads by channel', 'Leads por canal'],
  'Atendimentos por dia': ['Appointments per day', 'Atenciones por día'],
  'Atendimentos': ['Appointments', 'Atenciones'],
  'Gênero': ['Gender', 'Género'],
  'Atividade mensal': ['Monthly activity', 'Actividad mensual'],
  'Pacientes recentes': ['Recent patients', 'Pacientes recientes'],
  'Mensal': ['Monthly', 'Mensual'],
  'Últimos 14 dias': ['Last 14 days', 'Últimos 14 días'],
  'vs mês anterior': ['vs last month', 'vs mes anterior'],
  'Novo': ['New', 'Nuevo'],
  'Nova': ['New', 'Nueva'],
  'Salvar': ['Save', 'Guardar'],
  'Cancelar': ['Cancel', 'Cancelar'],
  'Editar': ['Edit', 'Editar'],
  'Enviar': ['Send', 'Enviar'],
  'Fechar': ['Close', 'Cerrar'],
  'Exportar': ['Export', 'Exportar'],
  'Adicionar': ['Add', 'Agregar'],
  'Remover': ['Remove', 'Quitar'],
  'Pronto': ['Done', 'Listo'],
  'Excluir': ['Delete', 'Eliminar'],
  'Salvar alterações': ['Save changes', 'Guardar cambios'],
  'Alterações salvas': ['Changes saved', 'Cambios guardados'],
  'Limpar tudo': ['Clear all', 'Limpiar todo'],
  'Ver todos': ['See all', 'Ver todos'],
  'Ver menos': ['See less', 'Ver menos'],
  'Anterior': ['Previous', 'Anterior'],
  'Próximo': ['Next', 'Siguiente'],
  'Lista de pacientes': ['Patient list', 'Lista de pacientes'],
  'Novo paciente': ['New patient', 'Nuevo paciente'],
  'Filtros': ['Filters', 'Filtros'],
  'Nome': ['Name', 'Nombre'],
  'Tipo': ['Type', 'Tipo'],
  'Convênio': ['Insurance', 'Convenio'],
  'Empresa': ['Company', 'Empresa'],
  'Telefone': ['Phone', 'Teléfono'],
  'Nascimento': ['Birth date', 'Nacimiento'],
  'Sexo': ['Sex', 'Sexo'],
  'Particular': ['Private', 'Particular'],
  'Empresarial': ['Corporate', 'Empresarial'],
  'Sem convênio': ['No insurance', 'Sin convenio'],
  'Não se aplica': ['Not applicable', 'No aplica'],
  'Feminino': ['Female', 'Femenino'],
  'Masculino': ['Male', 'Masculino'],
  'Conversa': ['Chat', 'Conversación'],
  'Dados e Histórico': ['Details and history', 'Datos e historial'],
  'Dados': ['Details', 'Datos'],
  'Prontuário': ['Medical record', 'Historia clínica'],
  'Histórico': ['History', 'Historial'],
  'Dados do paciente': ['Patient details', 'Datos del paciente'],
  'Trocar número': ['Change number', 'Cambiar número'],
  'Enviar anamnese': ['Send intake form', 'Enviar anamnesis'],
  'Mapeamento e marcação': ['Mapping and marking', 'Mapeo y marcación'],
  'Registrar procedimento': ['Log procedure', 'Registrar procedimiento'],
  'Documentos': ['Documents', 'Documentos'],
  'Registros': ['Records', 'Registros'],
  'Voltar ao prontuário': ['Back to record', 'Volver a la historia'],
  'Pontos': ['Points', 'Puntos'],
  'Pincel': ['Brush', 'Pincel'],
  'Linha': ['Line', 'Línea'],
  'Borracha': ['Eraser', 'Borrador'],
  'Mover': ['Move', 'Mover'],
  'Imagem': ['Image', 'Imagen'],
  'Totalizador': ['Totals', 'Totalizador'],
  'Upload': ['Upload', 'Subir'],
  'Antes e depois': ['Before and after', 'Antes y después'],
  'Nova pasta': ['New folder', 'Nueva carpeta'],
  'Todos': ['All', 'Todos'],
  'Caixa de entrada': ['Inbox', 'Bandeja de entrada'],
  'Equipe': ['Team', 'Equipo'],
  'Online': ['Online', 'En línea'],
  'Você': ['You', 'Tú'],
  'Hoje': ['Today', 'Hoy'],
  'Ontem': ['Yesterday', 'Ayer'],
  'Profissionais': ['Professionals', 'Profesionales'],
  'Ver todos os profissionais': ['See all professionals', 'Ver todos'],
  'Ver só um': ['See only one', 'Ver solo uno'],
  'Fechado': ['Closed', 'Cerrado'],
  'Livre': ['Free', 'Libre'],
  'HOJE': ['TODAY', 'HOY'],
  'Estoque': ['Inventory', 'Inventario'],
  'Financeiro': ['Finance', 'Finanzas'],
  'Produtos': ['Products', 'Productos'],
  'Relatórios': ['Reports', 'Informes'],
  'Categorias e unidades': ['Categories and units', 'Categorías y unidades'],
  'Cadastrar insumo': ['Add supply', 'Registrar insumo'],
  'Produto': ['Product', 'Producto'],
  'Categoria': ['Category', 'Categoría'],
  'Unidade': ['Unit', 'Unidad'],
  'Quantidade': ['Quantity', 'Cantidad'],
  'Mínimo': ['Minimum', 'Mínimo'],
  'Validade': ['Expiry', 'Vencimiento'],
  'Valor médio': ['Average cost', 'Costo promedio'],
  'Status': ['Status', 'Estado'],
  'Em estoque': ['In stock', 'En stock'],
  'Abaixo do mínimo': ['Below minimum', 'Bajo el mínimo'],
  'Vence em breve': ['Expiring soon', 'Vence pronto'],
  'Vencido': ['Expired', 'Vencido'],
  'Precisa de atenção': ['Needs attention', 'Requiere atención'],
  'Consumo por categoria': ['Usage by category', 'Consumo por categoría'],
  'Mais consumidos no período': ['Most used in period', 'Más consumidos en el período'],
  'Total de produtos': ['Total products', 'Total de productos'],
  'Valor em estoque': ['Inventory value', 'Valor en inventario'],
  'Produtos vencidos': ['Expired products', 'Productos vencidos'],
  'Consumo no período': ['Usage in period', 'Consumo en el período'],
  'Visão geral': ['Overview', 'Resumen'],
  'Receitas': ['Income', 'Ingresos'],
  'Despesas': ['Expenses', 'Gastos'],
  'Nota fiscal': ['Invoices', 'Factura'],
  'Salute Pay': ['Salute Pay', 'Salute Pay'],
  'Categorias': ['Categories', 'Categorías'],
  'Faturamento do período': ['Revenue in period', 'Facturación del período'],
  'Total recebido': ['Total received', 'Total recibido'],
  'A receber': ['Receivable', 'Por cobrar'],
  'Total despesas': ['Total expenses', 'Total de gastos'],
  'Lucro líquido': ['Net profit', 'Ganancia neta'],
  'Ticket médio': ['Average ticket', 'Ticket promedio'],
  'Fluxo de caixa': ['Cash flow', 'Flujo de caja'],
  'Faturou': ['Revenue', 'Facturó'],
  'Custos': ['Costs', 'Costos'],
  'Lucro': ['Profit', 'Ganancia'],
  'Faturamento por atendimento': ['Revenue by appointment type', 'Facturación por atención'],
  'Faturamento por profissional': ['Revenue by professional', 'Facturación por profesional'],
  'Faturamento por procedimento': ['Revenue by procedure', 'Facturación por procedimiento'],
  'Nova receita': ['New income', 'Nuevo ingreso'],
  'Nova despesa': ['New expense', 'Nuevo gasto'],
  'Recebido': ['Received', 'Recibido'],
  'Pago': ['Paid', 'Pagado'],
  'Pendente': ['Pending', 'Pendiente'],
  'Extrato': ['Statement', 'Extracto'],
  'Exportar extrato': ['Export statement', 'Exportar extracto'],
  'Saldo atual': ['Current balance', 'Saldo actual'],
  'Notas do período': ['Invoices in period', 'Facturas del período'],
  'Configuração fiscal': ['Tax settings', 'Configuración fiscal'],
  'Emissão de nota fiscal': ['Invoice issuing', 'Emisión de facturas'],
  'Ver prévia': ['Preview', 'Vista previa'],
  'Cadastro': ['Registration', 'Registro'],
  'Canais': ['Channels', 'Canales'],
  'Integrações': ['Integrations', 'Integraciones'],
  'Agente de IA': ['AI agent', 'Agente de IA'],
  'Parcerias': ['Partners', 'Alianzas'],
  'Certificações': ['Certifications', 'Certificaciones'],
  'Minha conta': ['My account', 'Mi cuenta'],
  'Saluteflix': ['Saluteflix', 'Saluteflix'],
  'Salute Cast': ['Salute Cast', 'Salute Cast'],
  'Cursos e serviços': ['Courses and services', 'Cursos y servicios'],
  'Clínica': ['Clinic', 'Clínica'],
  'Modelos de anamnese': ['Intake form templates', 'Plantillas de anamnesis'],
  'Equipe e acessos': ['Team and access', 'Equipo y accesos'],
  'Dados da clínica': ['Clinic details', 'Datos de la clínica'],
  'Localização': ['Location', 'Ubicación'],
  'Estrutura da clínica': ['Clinic amenities', 'Estructura de la clínica'],
  'Horários de funcionamento': ['Opening hours', 'Horario de atención'],
  'Política de pagamentos': ['Payment policy', 'Política de pagos'],
  'Conta': ['Account', 'Cuenta'],
  'Segurança': ['Security', 'Seguridad'],
  'Plano e cobrança': ['Plan and billing', 'Plan y facturación'],
  'Notificações': ['Notifications', 'Notificaciones'],
  'Idioma': ['Language', 'Idioma'],
  'Configurações gerais': ['General settings', 'Configuración general'],
  'Excluir conta': ['Delete account', 'Eliminar cuenta'],
  'Trocar senha': ['Change password', 'Cambiar contraseña'],
  'Senha atual': ['Current password', 'Contraseña actual'],
  'Nova senha': ['New password', 'Nueva contraseña'],
  'Confirmar nova senha': ['Confirm new password', 'Confirmar nueva contraseña'],
  'Salvar nova senha': ['Save new password', 'Guardar nueva contraseña'],
  'Plano atual': ['Current plan', 'Plan actual'],
  'Mudar para este plano': ['Switch to this plan', 'Cambiar a este plan'],
  'Falar com consultor': ['Talk to a consultant', 'Hablar con un asesor'],
  'Sob consulta': ['Contact us', 'A consultar'],
  '/mês': ['/month', '/mes'],
  'Som de nova mensagem': ['New message sound', 'Sonido de nuevo mensaje'],
  'Testar som': ['Test sound', 'Probar sonido'],
  'Conectado': ['Connected', 'Conectado'],
  'Desconectar': ['Disconnect', 'Desconectar'],
  'Em breve': ['Coming soon', 'Próximamente'],
  'Visualizando como': ['Viewing as', 'Viendo como'],
  'Sair da visualização': ['Exit preview', 'Salir de la vista'],
  'Convidar membro': ['Invite member', 'Invitar miembro'],
  'Ver como': ['View as', 'Ver como']
};
var __orig = new WeakMap(),
  __mine = new WeakMap();
function trText(s, li) {
  var k = s.trim();
  if (!k) return s;
  var d = DICT[k];
  return d && d[li] ? s.replace(k, d[li]) : s;
}
function applyLang(root) {
  var lang = LANG.v,
    li = lang === 'en' ? 0 : lang === 'es' ? 1 : -1;
  var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: function acceptNode(n) {
      return n.parentNode && /^(SCRIPT|STYLE|TEXTAREA)$/.test(n.parentNode.nodeName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    }
  });
  var n;
  var nodes = [];
  while (n = w.nextNode()) nodes.push(n);
  if (root.nodeType === 3) nodes.push(root);
  nodes.forEach(function (t) {
    var cur = t.nodeValue;
    var o = __orig.get(t);
    if (o === undefined || __mine.get(t) !== cur) {
      o = cur;
      __orig.set(t, o);
    }
    var nv = li < 0 ? o : trText(o, li);
    if (nv !== cur) {
      t.nodeValue = nv;
    }
    __mine.set(t, nv);
  });
  if (root.querySelectorAll) root.querySelectorAll('[placeholder]').forEach(function (el) {
    var cur = el.getAttribute('placeholder');
    var o = el.__phO;
    if (o === undefined || el.__phM !== cur) {
      o = cur;
      el.__phO = o;
    }
    var nv = li < 0 ? o : trText(o, li);
    if (nv !== cur) el.setAttribute('placeholder', nv);
    el.__phM = nv;
  });
}
var __obs = null;
function startLangObserver() {
  if (__obs) return;
  __obs = new MutationObserver(function (ms) {
    if (LANG.v === 'pt' && !__obs.__dirty) return;
    __obs.disconnect();
    try {
      ms.forEach(function (m) {
        if (m.type === 'characterData') applyLang(m.target);else if (m.type === 'attributes') applyLang(m.target);else m.addedNodes.forEach(function (x) {
          if (x.nodeType === 1 || x.nodeType === 3) applyLang(x);
        });
      });
    } finally {
      __obs.observe(document.body, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['placeholder']
      });
    }
  });
  __obs.observe(document.body, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['placeholder']
  });
}
function setLang(l) {
  LANG.v = l;
  lsSet('salute-kit:lang', l);
  document.documentElement.lang = l === 'pt' ? 'pt-BR' : l;
  if (__obs) {
    __obs.__dirty = true;
    __obs.disconnect();
  }
  applyLang(document.body);
  if (__obs) {
    __obs.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['placeholder']
    });
    __obs.__dirty = l !== 'pt';
  }
  LANG.subs.forEach(function (s) {
    return s();
  });
}
Object.assign(window, {
  makeStore: makeStore,
  useStore: useStore,
  lsGet: lsGet,
  lsSet: lsSet,
  GESTAO_AREAS: GESTAO_AREAS,
  CONFIG_TABS: CONFIG_TABS,
  agenteIaPermitido: agenteIaPermitido,
  moduleTree: moduleTree,
  allModuleIds: allModuleIds,
  withKids: withKids,
  TEAM_STORE: TEAM_STORE,
  VIEW_AS: VIEW_AS,
  useAccess: useAccess,
  SOUND: SOUND,
  TONES: TONES,
  playMsgSound: playMsgSound,
  INCOMING: INCOMING,
  notifyIncoming: notifyIncoming,
  LANGS: LANGS,
  LANG: LANG,
  setLang: setLang,
  applyLang: applyLang,
  startLangObserver: startLangObserver
});