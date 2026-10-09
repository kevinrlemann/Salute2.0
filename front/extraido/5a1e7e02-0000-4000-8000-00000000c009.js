"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/* =====================================================================
   SERVIÇOS DE DADOS: Painel e saudação (Supabase)
   Todos os números do Painel vêm da função painel_mes do banco,
   calculados só com os dados da clínica ativa, mês a mês.
   ===================================================================== */
var PAINEL = makeStore(null);
var mesIso = function mesIso(ano, mes) {
  return ano + '-' + String(mes).padStart(2, '0') + '-01';
};
var PAINEL_MES = makeStore({
  iso: mesIso(BR.partes().ano, BR.partes().mes),
  carregando: false
});
CARGAS.painel = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
  var r;
  return _regenerator().w(function (_context) {
    while (1) switch (_context.n) {
      case 0:
        _context.n = 1;
        return DB.ler(SB.rpc('painel_mes', {
          p_clinica: CLI(),
          p_mes: PAINEL_MES.v.iso
        }), 'Não foi possível carregar o Painel');
      case 1:
        r = _context.v;
        PAINEL.v = r;
        avisar(PAINEL);
      case 2:
        return _context.a(2);
    }
  }, _callee);
}));
// troca o mês de todos os cartões do Painel; os números antigos ficam na tela até os novos chegarem
function painelMudarMes(_x) {
  return _painelMudarMes.apply(this, arguments);
} // meses que dá para escolher: o atual e os 11 anteriores
function _painelMudarMes() {
  _painelMudarMes = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(iso) {
    var _yield$SB$rpc, data, error, _t;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          if (!(!iso || iso === PAINEL_MES.v.iso)) {
            _context2.n = 1;
            break;
          }
          return _context2.a(2);
        case 1:
          PAINEL_MES.v = {
            iso: iso,
            carregando: true
          };
          avisar(PAINEL_MES);
          if (SB_ON) {
            _context2.n = 2;
            break;
          }
          PAINEL_MES.v = {
            iso: iso,
            carregando: false
          };
          avisar(PAINEL_MES);
          return _context2.a(2);
        case 2:
          _context2.p = 2;
          _context2.n = 3;
          return SB.rpc('painel_mes', {
            p_clinica: CLI(),
            p_mes: iso
          });
        case 3:
          _yield$SB$rpc = _context2.v;
          data = _yield$SB$rpc.data;
          error = _yield$SB$rpc.error;
          if (!error) {
            _context2.n = 4;
            break;
          }
          throw error;
        case 4:
          if (PAINEL_MES.v.iso === iso) {
            PAINEL.v = data;
            avisar(PAINEL);
          }
          _context2.n = 6;
          break;
        case 5:
          _context2.p = 5;
          _t = _context2.v;
          avisoErro('Não foi possível carregar o Painel', _t);
        case 6:
          if (PAINEL_MES.v.iso === iso) {
            PAINEL_MES.v = {
              iso: iso,
              carregando: false
            };
            avisar(PAINEL_MES);
          }
        case 7:
          return _context2.a(2);
      }
    }, _callee2, null, [[2, 5]]);
  }));
  return _painelMudarMes.apply(this, arguments);
}
function mesesPainel() {
  var p = BR.partes();
  var out = [];
  for (var i = 0; i < 12; i++) {
    var d = new Date(p.ano, p.mes - 1 - i, 1);
    out.push({
      value: mesIso(d.getFullYear(), d.getMonth() + 1),
      label: MESES[d.getMonth()] + ' ' + d.getFullYear()
    });
  }
  return out;
}
var mesNomeIso = function mesNomeIso(iso) {
  var _String$split = String(iso).split('-'),
    _String$split2 = _slicedToArray(_String$split, 2),
    a = _String$split2[0],
    m = _String$split2[1];
  return MESES[+m - 1] + ' ' + a;
};
var mesVizinho = function mesVizinho(iso, d) {
  var _String$split$map = String(iso).split('-').map(Number),
    _String$split$map2 = _slicedToArray(_String$split$map, 2),
    a = _String$split$map2[0],
    m = _String$split$map2[1];
  var x = new Date(a, m - 1 + d, 1);
  return mesIso(x.getFullYear(), x.getMonth() + 1);
};
// variação em relação ao período anterior, no formato do TrendPill
var variacao = function variacao(a, b) {
  var v = b ? (a - b) / b * 100 : a ? 100 : 0;
  return {
    value: (Math.round(Math.abs(v) * 10) / 10).toFixed(1).replace('.', ',') + '%',
    direction: v < 0 ? 'down' : 'up'
  };
};
var pctTxt = function pctTxt(a, b) {
  return (b ? (Math.round(a / b * 1000) / 10).toFixed(1).replace('.', ',') : '0,0') + '%';
};
var MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
var STATUS_PAC = {
  em_tratamento: 'tratamento',
  consulta: 'consulta',
  concluido: 'concluido'
};
function painelTela(r) {
  r = r || {};
  var pac = r.pacientes || {},
    ag = r.agendamentos || {},
    ia = r.ia || {},
    at = r.atendimentos || {},
    gen = r.genero || {},
    fu = r.funil || {};
  var lbl = {
    value: '',
    label: 'vs mês anterior'
  };
  var horas = Math.round((ia.conversas || 0) * (ia.minutos_por_conversa || 5) / 60);
  var etapas = (fu.etapas || []).map(function (e) {
    return {
      label: e.nome,
      value: Number(e.valor || 0)
    };
  });
  var canais = (r.canais || []).map(function (c) {
    return {
      label: c.nome,
      value: Number(c.valor || 0),
      color: c.cor || '#1F5EFF',
      icon: c.icone || 'megaphone',
      conv: c.valor ? Math.round(c.convertidos / c.valor * 100) + '%' : '0%',
      subcanais: (c.subcanais || []).map(function (f) {
        return {
          label: f.nome,
          value: Number(f.valor || 0),
          color: f.cor || '#1F5EFF',
          icon: f.icone || 'megaphone',
          conv: f.valor ? Math.round(f.convertidos / f.valor * 100) + '%' : '0%'
        };
      })
    };
  });
  var DIAS_C = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  // Corrige lógica: value=0 → sem barra (base=0); escala calculada sobre valores reais de atendimentos
  var week = DIAS_C.map(function (label, d) {
    var x = (at.por_dia_semana || []).find(function (y) {
      return y.dia === d;
    }) || {};
    var v = Number(x.atendimentos || 0),
      t = Number(x.agendados || 0);
    // base só é positivo quando há atendimento de fato; se v=0, base=0 garante sem coluna
    return {
      label: label,
      value: v,
      target: Math.max(t, v),
      base: v > 0 ? Math.min(v, 2) : 0
    };
  });
  // topo baseado nos valores reais de atendimentos, não agendados, para escala fiel
  var topoReal = Math.max.apply(Math, [1].concat(_toConsumableArray(week.map(function (w) {
    return w.value;
  }))));
  var hoje = BR.dia(),
    mIso = r.mes || PAINEL_MES.v.iso,
    _String$split$map3 = String(mIso).split('-').map(Number),
    _String$split$map4 = _slicedToArray(_String$split$map3, 2),
    mA = _String$split$map4[0],
    mM = _String$split$map4[1],
    ini = new Date(mA, mM - 1, 1);
  var ativ = r.atividade_mes || [];
  var feriados = (r.feriados_mes || []).map(function (f) {
    return {
      dia: f.dia,
      nome: f.nome,
      cidade: f.cidade || '',
      tipo: f.tipo,
      id: f.id,
      recorrente: !!f.recorrente
    };
  });
  var total = Number(gen.total || pac.total || 0);
  var tr = function tr(a, b) {
    return _objectSpread(_objectSpread({}, lbl), variacao(a, b));
  };
  var tf = variacao(fu.total || 0, fu.anterior || 0),
    ta = variacao(at.total || 0, at.anterior || 0);
  return {
    stats: [{
      icon: 'users',
      title: 'Total de pacientes',
      value: String(pac.total || 0),
      trend: tr(pac.total || 0, pac.total_anterior || 0),
      breakdown: [{
        label: 'Novos',
        value: pac.novos || 0
      }, {
        label: 'Antigos',
        value: pac.antigos || 0
      }]
    }, {
      icon: 'calendar-days',
      title: 'Agendamentos',
      value: String(ag.total || 0),
      trend: tr(ag.total || 0, ag.anterior || 0),
      breakdown: [{
        label: 'Novos',
        value: ag.novos || 0
      }, {
        label: 'Retornos',
        value: ag.retornos || 0
      }]
    }, {
      icon: 'sparkles',
      title: 'IA economizou seu tempo',
      value: horas + 'h',
      trend: tr(ia.conversas || 0, ia.conversas_anterior || 0),
      breakdown: [{
        label: 'Conversas',
        value: ia.conversas || 0
      }, {
        label: 'Agendou',
        value: ia.agendou || 0
      }]
    }],
    funil: etapas.length ? etapas : [{
      label: 'Novo',
      value: 0
    }],
    funilTotal: fu.total || 0,
    funilTrend: (tf.direction === 'down' ? '-' : '') + tf.value,
    conv: etapas.length > 1 ? pctTxt(etapas[etapas.length - 1].value, etapas[0].value) : '0,0%',
    diasMedios: fu.dias_medios ? String(fu.dias_medios).replace('.', ',') + (Number(fu.dias_medios) === 1 ? ' dia' : ' dias') : 'sem dados',
    canais: canais.length ? canais : [],
    leads: canais.reduce(function (a, c) {
      return a + c.value;
    }, 0),
    atend: at.total || 0,
    atendTrend: (ta.direction === 'down' ? '-' : '') + ta.value,
    week: week,
    weekMax: Math.ceil(topoReal * 1.25 / 5) * 5 || 5,
    total: total,
    homens: total ? Math.round(gen.masculino / total * 100) + '%' : '0%',
    mulheres: total ? Math.round(gen.feminino / total * 100) + '%' : '0%',
    // gauge usa proporção real: masculino e feminino como porcentagens do total
    gaugeHomens: total ? Math.round(gen.masculino / total * 100) : 0,
    gaugeMulheres: total ? Math.round(gen.feminino / total * 100) : 0,
    gauge: total >= 1000 ? '1000+' : String(total),
    mesNome: MESES[mM - 1] + ' ' + mA,
    mes: {
      startOffset: ini.getDay(),
      days: new Date(mA, mM, 0).getDate(),
      today: hoje.getFullYear() === mA && hoje.getMonth() === mM - 1 ? hoje.getDate() : 0,
      bold: Array.from(new Set(ativ.map(function (a) {
        return a.dia;
      }))),
      feriados: feriados
    },
    mesAtual: !!r.mes_atual,
    profissionais: r.profissionais || [],
    meuProf: r.meu_profissional || null,
    agenda: (r.agenda_lista || []).map(function (a) {
      return {
        id: a.id,
        inicio: a.inicio,
        prof: a.profissional_id,
        profNome: a.profissional || '',
        name: a.paciente,
        pront: a.numero_prontuario || '',
        age: a.idade === null || a.idade === undefined ? '' : a.idade,
        proc: a.procedimento,
        status: a.status || 'Agendado',
        cor: a.status_cor || '#1F5EFF',
        feito: !!a.realizado
      };
    })
  };
}
// saudação do Painel: bom dia, boa tarde ou boa noite, com o tratamento e o primeiro nome
function saudacao() {
  var h = BR.partes().h,
    p = SESSAO.v.perfil || {};
  var quem = [p.tratamento, String(p.nome || '').split(' ')[0]].filter(Boolean).join(' ');
  return (h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite') + (quem ? ', ' + quem : '');
}
Object.assign(window, {
  PAINEL: PAINEL,
  PAINEL_MES: PAINEL_MES,
  painelTela: painelTela,
  saudacao: saudacao,
  painelMudarMes: painelMudarMes,
  mesesPainel: mesesPainel,
  mesNomeIso: mesNomeIso,
  mesVizinho: mesVizinho
});