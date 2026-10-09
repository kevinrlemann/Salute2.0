"use strict";

function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
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
  XDialog = _window$SaluteProjeto.Dialog,
  XInput = _window$SaluteProjeto.Input,
  XSelect = _window$SaluteProjeto.Select,
  XSwitch = _window$SaluteProjeto.Switch,
  XButton = _window$SaluteProjeto.Button,
  XToast = _window$SaluteProjeto.Toast;
var ROUTES = {
  painel: {
    get title() {
      return SB_ON ? saudacao() : 'Bom dia, Dra. Camila';
    },
    mobileTitle: 'Painel',
    subtitle: 'Seu progresso esta semana está ótimo.',
    C: PainelScreen
  },
  pacientes: {
    title: 'Pacientes',
    C: PacientesScreen
  },
  agenda: {
    title: 'Agenda',
    C: AgendaScreen
  },
  mensagens: {
    title: 'Mensagens',
    C: MensagensScreen
  },
  gestao: {
    title: 'Gestão',
    C: GestaoScreen
  },
  perfil: {
    title: 'Configurações',
    C: ConfigScreen
  }
};

/* =====================================================================
   RENATA IA · base de conhecimento da clínica (dados de demonstração)
   Tudo aqui vem SOMENTE da clínica logada. Com o banco de dados real,
   estas funções passam a consultar o Supabase filtrando pelo clinic_id.
   ===================================================================== */
var RN_CLINICA = {
  fantasia: 'Clínica Bella Forma',
  razao: 'Bella Forma Estética e Odontologia Ltda',
  responsavel: 'Dra. Camila Rocha',
  cnpj: '12.345.678/0001-90',
  email: 'contato@bellaforma.com.br',
  telefone: '(19) 3863-4100',
  whatsapp: '(19) 99800-4100',
  endereco: 'Rua Comendador João Cintra, 415, Sala 2, Centro, Itapira/SP, CEP 13970-000',
  estrutura: ['Estacionamento para pacientes', 'Acessibilidade (rampa e banheiro adaptado)', 'Wi-Fi para pacientes'],
  horarios: 'Segunda a sexta 08:00 às 19:00; sábado 08:00 às 12:00; domingo fechado',
  pagamentos: 'Pix, dinheiro, cartão de débito e cartão de crédito em até 6 vezes'
};
var RN_PAINEL = {
  totalPacientes: {
    valor: 102,
    novos: 48,
    antigos: 54,
    variacao: '+12,8% no último mês'
  },
  agendamentosMes: {
    valor: 254,
    novos: 56,
    retornos: 43,
    variacao: '+1,9% no último mês'
  },
  iaEconomizou: {
    horas: 27,
    conversas: 412,
    agendamentosFeitosPelaIA: 64,
    variacao: '+11,5% no último mês'
  },
  atendimentosSemana: {
    total: 48,
    variacao: '+0,8% vs mês anterior'
  },
  genero: 'Painel mostra 102 pacientes: homens 35%, mulheres 15% (indicador do painel)'
};
var rnHM = function rnHM(h) {
  return String(Math.floor(h)).padStart(2, '0') + ':' + (h % 1 ? '30' : '00');
};
var rnIso = function rnIso(d) {
  return isoOf(d);
};
var rnMoney = function rnMoney(n) {
  return brl(n);
};
var rnSum = function rnSum(a, f) {
  return a.reduce(function (s, x) {
    return s + f(x);
  }, 0);
};
var rnGroup = function rnGroup(arr, key, val) {
  var o = {};
  arr.forEach(function (x) {
    var k = typeof key === 'function' ? key(x) : x[key];
    o[k] = (o[k] || 0) + val(x);
  });
  return Object.entries(o).sort(function (a, b) {
    return b[1] - a[1];
  }).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      k = _ref2[0],
      v = _ref2[1];
    return {
      nome: k,
      valor: Math.round(v * 100) / 100
    };
  });
};
function rnFin(ini, fim) {
  var rec = REC_STORE.v,
    desp = DESP_STORE.v;
  var R = rec.filter(function (r) {
      return r.data >= ini && r.data <= fim;
    }),
    D = desp.filter(function (d) {
      return d.data >= ini && d.data <= fim;
    });
  var fat = rnSum(R, liq),
    receb = rnSum(R.filter(function (r) {
      return r.status === 'Recebido';
    }), liq),
    pend = R.filter(function (r) {
      return r.status === 'Pendente';
    });
  var atras = pend.filter(function (r) {
    return r.venc < TODAY_ISO;
  });
  var tD = rnSum(D, function (d) {
    return d.total;
  });
  return {
    periodo: dBR(ini) + ' a ' + dBR(fim),
    atendimentos: R.length,
    faturamento: Math.round(fat),
    recebido: Math.round(receb),
    aReceber: Math.round(rnSum(pend, liq)),
    emAtraso: Math.round(rnSum(atras, liq)),
    lancamentosEmAtraso: atras.length,
    despesas: Math.round(tD),
    lucroLiquido: Math.round(fat - tD),
    margemPct: fat ? Math.round((fat - tD) / fat * 1000) / 10 : 0,
    ticketMedio: R.length ? Math.round(fat / R.length) : 0,
    descontosConcedidos: Math.round(rnSum(R, function (r) {
      return r.desc || 0;
    })),
    porProfissional: rnGroup(R, 'pro', liq),
    porProcedimento: rnGroup(R, 'proc', liq),
    porAtendimento: rnGroup(R, 'atend', liq),
    porFormaPagamento: rnGroup(R, 'forma', liq),
    despesasPorCategoria: rnGroup(D, 'cat', function (d) {
      return d.total;
    })
  };
}
function rnInadimplencia() {
  var rec = REC_STORE.v.filter(function (r) {
    return r.venc < TODAY_ISO;
  });
  var tot = rnSum(rec, liq),
    atr = rec.filter(function (r) {
      return r.status === 'Pendente';
    });
  return {
    taxaPct: tot ? Math.round(rnSum(atr, liq) / tot * 1000) / 10 : 0,
    valorEmAtraso: Math.round(rnSum(atr, liq)),
    lancamentos: atr.slice().sort(function (x, y) {
      return y.venc.localeCompare(x.venc);
    }).map(function (r) {
      return {
        paciente: r.pac,
        procedimento: r.proc,
        valor: liq(r),
        vencimento: dBR(r.venc),
        forma: r.forma
      };
    }).slice(0, 15),
    totalLancamentosEmAtraso: atr.length
  };
}
function rnAgenda(iso) {
  if (SB_ON) return rnAgendaDB(iso);
  var d = new Date(iso + 'T00:00:00');
  var s = slotsFor(d).map(function (x) {
    return {
      inicio: 9 + x.row,
      horario: rnHM(9 + x.row) + ' às ' + rnHM(9 + x.row + Math.max(1, Math.round(x.span || 1))),
      paciente: x.n,
      profissional: PROS[x.col].n,
      especialidade: PROS[x.col].r
    };
  }).sort(function (a, b) {
    return a.inicio - b.inicio;
  });
  return {
    data: dBR(iso),
    diaSemana: ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'][d.getDay()],
    fechado: d.getDay() === 0,
    total: s.length,
    agendamentos: s
  };
}
function rnPaciente(nome) {
  var t = String(nome || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  var norm = function norm(x) {
    return x.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  };
  var p = PAC.find(function (x) {
    return norm(x.nome).includes(t) || t.split(' ').filter(function (w) {
      return w.length > 2;
    }).every(function (w) {
      return norm(x.nome).includes(w);
    });
  });
  var fin = REC_STORE.v.filter(function (r) {
    return t && norm(r.pac).includes(t.split(' ')[0]);
  });
  if (!p) return fin.length ? {
    encontrado: 'só no financeiro',
    nome: fin[0].pac,
    atendimentos: fin.map(function (r) {
      return {
        data: dBR(r.data),
        procedimento: r.proc,
        profissional: r.pro,
        valor: liq(r),
        status: r.status
      };
    })
  } : {
    encontrado: false,
    pacientesCadastrados: PAC.map(function (x) {
      return x.nome;
    })
  };
  var recs = (SB_ON ? [] : seedRecs(p)).map(function (r) {
    return {
      tipo: r.kind,
      data: r.date,
      titulo: r.title,
      status: r.status,
      observacoes: r.obs,
      profissional: r.pro,
      pontos: r.points ? r.points.length : undefined,
      respostasAnamnese: r.answers
    };
  });
  return {
    nome: p.nome,
    tipo: p.tipo,
    convenio: p.conv || 'Sem convênio',
    empresa: p.empresa || 'Não se aplica',
    whatsapp: p.tel,
    nascimento: p.nasc,
    sexo: p.sexo,
    cpf: p.cpf,
    prontuario: recs,
    historico: SB_ON ? [] : ['10/09/2026 cadastro criado pela Renata IA via WhatsApp', '15/09/2026 primeira consulta (Avaliação) com Dra. Camila Rocha', '18/09/2026 procedimento de toxina botulínica com Dra. Camila Rocha', '02/10/2026 retorno agendado pela Renata IA para terça 07/10 às 10h'],
    financeiro: REC_STORE.v.filter(function (r) {
      return r.pac === p.nome;
    }).map(function (r) {
      return {
        data: dBR(r.data),
        procedimento: r.proc,
        valor: liq(r),
        status: r.status
      };
    })
  };
}
function rnEstoque() {
  var P = PROD_STORE.v;
  var cat = function cat(s) {
    return P.filter(function (p) {
      return estStatus(p) === s;
    }).map(function (p) {
      return {
        produto: p.nome,
        quantidade: p.qtd,
        unidade: p.un,
        minimo: p.min,
        validade: dBR(p.val),
        valorMedio: p.vm
      };
    });
  };
  var compras = DESP_STORE.v.filter(function (d) {
    return d.cat === 'Insumos e fornecedores' && inWin(d.data, 30);
  }).map(function (d) {
    return {
      data: dBR(d.data),
      descricao: d.desc,
      fornecedor: d.forn,
      valor: d.total
    };
  });
  return {
    totalProdutos: P.length,
    unidadesEmEstoque: rnSum(P, function (p) {
      return p.qtd;
    }),
    valorEmEstoque: Math.round(rnSum(P, function (p) {
      return p.qtd * p.vm;
    })),
    abaixoDoMinimo: cat('baixo'),
    venceEmBreve60dias: cat('vence'),
    vencidos: cat('vencido'),
    emDia: cat('ok').map(function (x) {
      return x.produto;
    }),
    custoParaReporAbaixoDoMinimo: Math.round(rnSum(P.filter(function (p) {
      return p.qtd < p.min;
    }), function (p) {
      return (p.min * 2 - p.qtd) * p.vm;
    })),
    perdaComVencidos: Math.round(rnSum(P.filter(function (p) {
      return estStatus(p) === 'vencido';
    }), function (p) {
      return p.qtd * p.vm;
    })),
    consumoUltimos30dias: P.map(function (p) {
      return {
        produto: p.nome,
        saiu: p.cons,
        unidade: p.un,
        valor: Math.round(p.cons * p.vm)
      };
    }).sort(function (a, b) {
      return b.valor - a.valor;
    }),
    consumoTotal30diasValor: Math.round(rnSum(P, function (p) {
      return p.cons * p.vm;
    })),
    entradasCompras30dias: compras,
    produtos: P.map(function (p) {
      return {
        produto: p.nome,
        categoria: p.cat,
        unidade: p.un,
        quantidade: p.qtd,
        minimo: p.min,
        validade: dBR(p.val),
        valorMedio: p.vm,
        status: STATUS_EST[estStatus(p)][0]
      };
    })
  };
}
function rnMonths() {
  var out = [];
  var now = new Date(TODAY);
  for (var k = 0; k < 7; k++) {
    var a = new Date(now.getFullYear(), now.getMonth() - k, 1),
      b = new Date(now.getFullYear(), now.getMonth() - k + 1, 0);
    var f = rnFin(rnIso(a), rnIso(b < TODAY ? b : TODAY));
    out.push({
      mes: MESL[a.getMonth()] + '/' + a.getFullYear(),
      faturamento: f.faturamento,
      recebido: f.recebido,
      despesas: f.despesas,
      lucroLiquido: f.lucroLiquido,
      atendimentos: f.atendimentos,
      ticketMedio: f.ticketMedio
    });
  }
  return out;
}
var rnRange = function rnRange(days) {
  return [rnIso(addD(TODAY, -(days - 1))), TODAY_ISO];
};
function rnSnapshot() {
  var r30 = rnRange(30),
    r7 = rnRange(7);
  var nf = NF_STORE.v,
    wa = WA_STORE.v;
  var nfBase = REC_STORE.v.filter(function (r) {
    return r.status === 'Recebido' && inWin(r.data, 30);
  });
  var nfOk = nfBase.filter(function (r) {
    return r.atend === 'Convênio' || PAC.some(function (p) {
      return p.nome === r.pac;
    });
  });
  var pay = function () {
    var R = REC_STORE.v.filter(function (r) {
        return r.status === 'Recebido' && inWin(r.data, 30);
      }),
      D = DESP_STORE.v.filter(function (d) {
        return d.status === 'Pago' && inWin(d.data, 30);
      });
    var e = rnSum(R, liq),
      s = rnSum(D, function (d) {
        return d.total;
      });
    return {
      saldoInicial: SB_ON ? saldoPay(REC_STORE.v, DESP_STORE.v) : SALDO_INICIAL,
      entradas30dias: Math.round(e),
      saidas30dias: Math.round(s),
      saldoAtual: Math.round((SB_ON ? saldoPay(REC_STORE.v, DESP_STORE.v) : SALDO_INICIAL) + e - s),
      status: 'Beta'
    };
  }();
  var plan = (typeof PLANS !== 'undefined' ? PLANS : []).find(function (p) {
    return p.id === (typeof PLAN_STORE !== 'undefined' ? PLAN_STORE.v : 'iapro');
  });
  var data = {
    hoje: rnHojeTxt(),
    clinica: RN_CLINICA,
    painel: SB_ON ? rnPainelDB() : _objectSpread(_objectSpread({}, RN_PAINEL), {}, {
      atendimentosPorDiaDaSemana: WEEK.map(function (w) {
        return {
          dia: w.label,
          atendimentos: w.value,
          meta: w.target
        };
      }),
      atendimentosUltimos14dias: DAILY.map(function (d) {
        return {
          dia: d.label + (+d.label > 15 ? '/09' : '/10'),
          atendimentos: d.value,
          meta: d.target
        };
      }),
      funilDeVendas: FUNNEL.map(function (f) {
        return {
          etapa: f.label,
          leads: f.value
        };
      }),
      leadsPorCanal: CANAIS0.map(function (c) {
        return {
          canal: c.label,
          leads: c.value,
          conversao: c.conv
        };
      }),
      atividadeMensal: 'Outubro 2026: consultas e reuniões nos dias marcados do calendário; hoje é dia 2'
    }),
    pacientes: (SB_ON ? PAC.slice(0, 400) : PAC).map(function (p) {
      return {
        nome: p.nome,
        tipo: p.tipo,
        convenio: p.conv || 'Sem convênio',
        empresa: p.empresa || '',
        whatsapp: p.tel,
        nascimento: p.nasc,
        sexo: p.sexo
      };
    }),
    pacientesRecentes: SB_ON ? rnPacientesRecentesDB() : (typeof PATIENTS !== 'undefined' ? PATIENTS.slice(0, 4) : []).map(function (p) {
      return {
        nome: p.name,
        procedimento: p.proc,
        status: p.status
      };
    }),
    agendaHoje: rnAgenda(TODAY_ISO),
    agendaAmanha: rnAgenda(rnIso(addD(TODAY, 1))),
    conversasPacientes: INBOX.map(function (c) {
      return {
        contato: c.n,
        ultimaMensagem: c.m,
        hora: c.t,
        naoLidas: c.u
      };
    }),
    conversasEquipe: EQUIPE.map(function (c) {
      return {
        membro: c.n,
        funcao: c.r,
        ultimaMensagem: c.m,
        naoLidas: c.u
      };
    }),
    estoque: rnEstoque(),
    financeiro: {
      ultimos7dias: rnFin.apply(void 0, _toConsumableArray(r7)),
      ultimos30dias: rnFin.apply(void 0, _toConsumableArray(r30)),
      porMes: rnMonths(),
      inadimplencia: rnInadimplencia(),
      dadosDisponiveisDesde: dBR(REC_STORE.v.reduce(function (m, r) {
        return r.data < m ? r.data : m;
      }, TODAY_ISO)),
      despesasPendentes: DESP_STORE.v.filter(function (d) {
        return d.status === 'Pendente';
      }).map(function (d) {
        return {
          descricao: d.desc,
          valor: d.total,
          vencimento: dBR(d.venc)
        };
      }),
      metasMensaisPorProfissional: FIN_PROS.map(function (p, i) {
        return {
          profissional: p,
          meta: FIN_METAS[i]
        };
      }),
      categoriasReceita: SB_ON ? catsFin(CAT.v, 'receita') : ['Estética', 'Odontologia', 'Consulta', 'Venda de produto'],
      categoriasDespesa: DESP_CATS
    },
    notaFiscal: {
      status: 'Beta, emissão direta ainda em desenvolvimento',
      prontasParaEmitir30dias: nfOk.length,
      valorPronto: Math.round(rnSum(nfOk, liq)),
      semCpf: nfBase.length - nfOk.length,
      aliquotaISS: nf.aliq + '%',
      inscricaoMunicipal: nf.im || 'não preenchida',
      certificadoDigital: nf.cert ? 'enviado' : 'não enviado',
      regime: nf.regime,
      municipio: nf.municipio
    },
    salutePay: pay,
    configuracoes: {
      modelosAnamnese: (ANAM_STORE.v || ANAM0).map(function (m) {
        return {
          nome: m.nome,
          area: m.uso,
          perguntas: m.qs.map(function (q) {
            return q.t;
          }),
          enviado: m.usos
        };
      }),
      equipeEAcessos: TEAM_STORE.v.map(function (u) {
        return {
          nome: u.nome,
          funcao: u.funcao,
          email: u.email,
          acessos: u.dono ? 'acesso total' : moduleTree().filter(function (m) {
            return u.acc.includes(m.id);
          }).map(function (m) {
            return m.label + (m.children.length ? ' (' + m.children.filter(function (c) {
              return u.acc.includes(c.id);
            }).map(function (c) {
              return c.label;
            }).join(', ') + ')' : '');
          }).join('; ')
        };
      }),
      profissionais: PROF_STORE.v.map(function (p) {
        return {
          nome: p.nome,
          especialidade: p.esp,
          registro: p.reg,
          procedimentos: p.procs
        };
      }),
      canais: {
        whatsapp: wa.status === 'on' ? 'conectado no ' + wa.numero + ' pela ' + (wa.modo === 'oficial' ? 'API oficial' : 'API não oficial') + ' desde ' + wa.desde : 'desconectado',
        instagram: 'Beta, conexão em breve'
      },
      saluteflix: (SB_ON ? FLIX_STORE.v : FLIX0).map(function (c) {
        return {
          titulo: c.t,
          tipo: c.tipo,
          categoria: c.cat,
          duracao: c.dur,
          progresso: c.prog + '%'
        };
      }),
      saluteCast: CAST_STORE.v.map(function (e) {
        return {
          episodio: e.ep,
          titulo: e.t,
          convidado: e.conv,
          duracao: e.dur
        };
      }),
      parcerias: (SB_ON ? PARC_STORE.v : PARC0).map(function (p) {
        return {
          parceiro: p.nome,
          categoria: p.cat,
          beneficio: p.ben,
          cupom: p.cupom || 'sem cupom',
          oficial: p.of
        };
      }),
      certificacoes: SELOS_STORE.v.map(function (c) {
        return c.nome;
      }),
      minhaConta: SB_ON ? rnContaDB(plan) : {
        usuaria: 'Camila Rocha (Administradora)',
        plano: plan ? plan.nome + (plan.preco ? ' R$ ' + plan.preco + '/mês' : ' sob consulta') : 'IA Pro',
        mensagensIAEsteMes: '6.240 de 10.000',
        proximaCobranca: '10/10/2026',
        idioma: LANG.v,
        somNovaMensagem: SOUND.v.on ? 'ligado (' + SOUND.v.tone + ')' : 'desligado'
      },
      planosDisponiveis: 'Inicial R$ 197/mês (todos os módulos), IA Pro R$ 997/mês (Renata IA com limite mensal de mensagens), Enterprise sob consulta'
    }
  };
  return JSON.stringify(data);
}

/* ---------- respostas sem conexão com IA (modo demonstração) ---------- */
var rnNorm = function rnNorm(s) {
  return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
};
var rnHas = function rnHas(q) {
  for (var _len = arguments.length, w = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    w[_key - 1] = arguments[_key];
  }
  return w.some(function (x) {
    return q.includes(x);
  });
};
function rnPeriod(q) {
  var mm = ['janeiro', 'fevereiro', 'marco', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
  var n = q.match(/(\d+)\s*dias/);
  if (rnHas(q, 'hoje')) return [TODAY_ISO, TODAY_ISO, 'hoje'];
  if (rnHas(q, 'ontem')) {
    var y = rnIso(addD(TODAY, -1));
    return [y, y, 'ontem'];
  }
  if (n) return [].concat(_toConsumableArray(rnRange(+n[1])), ['nos últimos ' + n[1] + ' dias']);
  if (rnHas(q, 'semana passada')) return [rnIso(addD(TODAY, -13)), rnIso(addD(TODAY, -7)), 'na semana passada'];
  if (rnHas(q, 'semana')) return [].concat(_toConsumableArray(rnRange(7)), ['nos últimos 7 dias']);
  if (rnHas(q, 'mes passado')) return ['2026-09-01', '2026-09-30', 'em setembro'];
  for (var i = 0; i < 12; i++) if (q.includes(mm[i])) {
    var a = new Date(2026, i, 1),
      b = new Date(2026, i + 1, 0);
    return [rnIso(a), rnIso(b < TODAY ? b : TODAY), 'em ' + MESL[i]];
  }
  if (rnHas(q, 'trimestre')) return [].concat(_toConsumableArray(rnRange(90)), ['nos últimos 90 dias']);
  if (rnHas(q, 'semestre')) return [].concat(_toConsumableArray(rnRange(180)), ['nos últimos 6 meses']);
  if (/\bano\b|2026/.test(q)) return ['2026-01-01', TODAY_ISO, 'em 2026 (dados desde abril)'];
  return [].concat(_toConsumableArray(rnRange(30)), ['nos últimos 30 dias']);
}
var rnL = function rnL(arr) {
  return arr.map(function (x) {
    return '- ' + x;
  }).join('\n');
};
function rnCore(q, pq) {
  var _rnPeriod = rnPeriod(pq),
    _rnPeriod2 = _slicedToArray(_rnPeriod, 3),
    ini = _rnPeriod2[0],
    fim = _rnPeriod2[1],
    lbl = _rnPeriod2[2];
  // paciente específico
  var _short = q.split(' ').length <= 4;
  var pac = PAC.find(function (p) {
    var parts = rnNorm(p.nome).split(' ');
    return q.includes(parts[0] + ' ' + parts[1]) || new RegExp('\\b' + parts[0] + '\\b').test(q) && (_short || rnHas(q, 'paciente', 'atendimento', 'prontuario', 'como foi', 'como esta', 'historico'));
  });
  if (pac) {
    var d = rnPaciente(pac.nome);
    var fin = d.financeiro,
      pend = fin.filter(function (f) {
        return f.status === 'Pendente';
      });
    return "**".concat(d.nome, "** \xE9 paciente ").concat(d.tipo.toLowerCase()).concat(d.convenio !== 'Sem convênio' ? ' (' + d.convenio + ')' : '', ", WhatsApp ").concat(d.whatsapp, ".\n\nComo foi o atendimento:\n").concat(rnL(d.historico), "\n\nNo prontu\xE1rio: anamnese facial respondida (usa \xE1cido retinoico \xE0 noite e quer tratar rugas na testa e p\xE9s de galinha), mapeamento de toxina com 24U no ter\xE7o superior e 3 fotos de antes. A anamnese de retorno ainda est\xE1 aguardando resposta.").concat(fin.length ? "\n\nNo financeiro: ".concat(fin.length, " lan\xE7amentos somando **").concat(brl(rnSum(fin, function (f) {
      return f.valor;
    })), "**").concat(pend.length ? ", com ".concat(brl(rnSum(pend, function (f) {
      return f.valor;
    })), " pendente") : ', tudo recebido', ".") : '');
  }
  if (rnHas(q, 'proximo paciente', 'proximo atendimento', 'proxima consulta', 'proximo horario', 'quem e o proximo', 'quem vem agora', 'proximo agendamento')) {
    var hm = BR.horaDec(),
      a = rnAgenda(TODAY_ISO),
      nx = a.agendamentos.find(function (x) {
        return x.inicio > hm;
      });
    if (nx) return "O pr\xF3ximo \xE9 **".concat(nx.paciente, "**, \xE0s ").concat(nx.horario.slice(0, 5), ", com ").concat(nx.profissional, ".");
    var b = rnAgenda(rnIso(addD(TODAY, 1)));
    return "Hoje n\xE3o h\xE1 mais atendimentos.".concat(b.total ? " Amanh\xE3 o primeiro \xE9 **".concat(b.agendamentos[0].paciente, "**, \xE0s ").concat(b.agendamentos[0].horario.slice(0, 5), ", com ").concat(b.agendamentos[0].profissional, ".") : '');
  }
  if (rnHas(q, 'agenda', 'agendamentos de hoje', 'agendamentos de amanha', 'consultas hoje', 'consultas amanha', 'quem eu atendo', 'horarios', 'compromisso')) {
    var am = rnHas(pq, 'amanha'),
      dia = am ? rnIso(addD(TODAY, 1)) : TODAY_ISO;
    var _a = rnAgenda(dia);
    if (_a.fechado || !_a.total) return "N\xE3o h\xE1 agendamentos ".concat(am ? 'amanhã' : 'hoje', " (").concat(_a.diaSemana, ", ").concat(_a.data, ").");
    return "Sua agenda de ".concat(am ? 'amanhã' : 'hoje', " (").concat(_a.diaSemana, ", ").concat(_a.data, ") tem **").concat(_a.total, " atendimentos**:\n").concat(rnL(_a.agendamentos.map(function (x) {
      return "".concat(x.horario, ": ").concat(x.paciente, " com ").concat(x.profissional);
    })));
  }
  if (rnHas(q, 'outra clinica', 'outras clinicas', 'concorrente', 'clinica do lado', 'outra unidade')) return "Eu s\xF3 tenho acesso aos dados da **".concat(RN_CLINICA.fantasia, "**. N\xE3o vejo nem uso informa\xE7\xF5es de outras cl\xEDnicas. Posso comparar seus n\xFAmeros com refer\xEAncias gerais de mercado, se quiser.");
  if (rnHas(q, 'mercado', 'media do setor', 'benchmark', 'referencia', 'e bom', 'esta bom', 'normal', 'comparad', 'preco medio', 'quanto cobram', 'quanto cobrar')) {
    var f = rnFin.apply(void 0, _toConsumableArray(rnRange(90))),
      i = rnInadimplencia();
    if (rnHas(q, 'preco', 'cobra', 'toxina', 'botox', 'preenchimento', 'bioestimulador', 'harmonizacao')) return "Refer\xEAncias de mercado no Brasil (variam por cidade e profissional):\n- Toxina botul\xEDnica (ter\xE7o superior): R$ 900 a R$ 2.000\n- Preenchimento labial (1 ml): R$ 1.200 a R$ 2.500\n- Bioestimulador de col\xE1geno (sess\xE3o): R$ 1.800 a R$ 3.500\n- Limpeza de pele: R$ 150 a R$ 350\n- Clareamento dental: R$ 600 a R$ 1.500\n\nNa sua cl\xEDnica a toxina sai por R$ 1.260 a R$ 1.400, dentro da faixa de mercado.";
    return "Comparando seus \xFAltimos 90 dias com refer\xEAncias de mercado para cl\xEDnicas de est\xE9tica:\n- Margem l\xEDquida: **".concat(String(f.margemPct).replace('.', ','), "%** (mercado costuma ficar entre 15% e 30%)\n- Inadimpl\xEAncia: **").concat(String(i.taxaPct).replace('.', ','), "%** (at\xE9 5% \xE9 considerado saud\xE1vel)\n- Ticket m\xE9dio: **").concat(brl(f.ticketMedio), "** (cl\xEDnicas focadas em injet\xE1veis ficam entre R$ 500 e R$ 1.200)\n- Convers\xE3o de leads: **24,7%** (no WhatsApp, entre 10% e 30% \xE9 comum)\n\nS\xE3o refer\xEAncias gerais de mercado, n\xE3o dados de outras cl\xEDnicas.");
  }
  if (rnHas(q, 'funil')) return "Funil de vendas: ".concat(FUNNEL.map(function (f) {
    return "".concat(f.label, " ").concat(f.value);
  }).join(', '), ". De 186 leads, 46 finalizaram (24,7% de convers\xE3o). A maior perda est\xE1 entre Novo e Aguardando atendente (58 leads).");
  if (/\bleads?\b/.test(q) || rnHas(q, 'canal', 'trafego', 'organico', 'indicacao')) return "Leads por canal (186 no total):\n".concat(rnL(CHANNELS.map(function (c) {
    return "".concat(c.label, ": ").concat(c.value, " leads, convers\xE3o de ").concat(c.conv);
  })), "\n\nIndica\xE7\xE3o converte melhor; tr\xE1fego pago traz mais volume.");
  if (rnHas(q, 'inadimpl', 'atrasad', 'devendo', 'calote')) {
    var _i = rnInadimplencia();
    return "A taxa de inadimpl\xEAncia est\xE1 em **".concat(String(_i.taxaPct).replace('.', ','), "%**, com **").concat(brl(_i.valorEmAtraso), "** em atraso").concat(_i.lancamentos.length ? " em ".concat(_i.lancamentos.length, " lan\xE7amentos. Os mais recentes:\n") + rnL(_i.lancamentos.slice(0, 5).map(function (l) {
      return "".concat(l.paciente, ": ").concat(brl(l.valor), ", venceu em ").concat(l.vencimento);
    })) + '\n\nReferência de mercado: em clínicas de estética, até 5% costuma ser considerado saudável.' : '.');
  }
  if (rnHas(q, 'fluxo de caixa', 'fluxo')) {
    var _f = rnFin(ini, fim);
    return "Fluxo de caixa ".concat(lbl, ": entrou **").concat(brl(_f.recebido), "** recebido, as despesas somaram **").concat(brl(_f.despesas), "** e o resultado foi **").concat(brl(_f.lucroLiquido), "**. Ainda h\xE1 ").concat(brl(_f.aReceber), " a receber.");
  }
  if (rnHas(q, 'salute pay', 'saldo')) {
    var s = JSON.parse(rnSnapshot()).salutePay;
    return "No Salute Pay (Beta) o saldo atual \xE9 **".concat(brl(s.saldoAtual), "**. Nos \xFAltimos 30 dias entraram ").concat(brl(s.entradas30dias), " e sa\xEDram ").concat(brl(s.saidas30dias), ".");
  }
  if (rnHas(q, 'nota fiscal', 'notas fiscais', 'nfs', 'nf ')) {
    var n = JSON.parse(rnSnapshot()).notaFiscal;
    return "A emiss\xE3o de nota fiscal est\xE1 em Beta. Nos \xFAltimos 30 dias h\xE1 **".concat(n.prontasParaEmitir30dias, " atendimentos prontos** para nota (").concat(brl(n.valorPronto), ") e ").concat(n.semCpf, " sem CPF no cadastro. ISS configurado em ").concat(n.aliquotaISS, "; falta a inscri\xE7\xE3o municipal e o certificado digital.");
  }
  if (rnHas(q, 'por profissional', 'profissional que mais', 'quem mais faturou', 'faturamento de cada')) {
    var _f2 = rnFin(ini, fim);
    return "Faturamento por profissional ".concat(lbl, ":\n").concat(rnL(_f2.porProfissional.map(function (p) {
      return "".concat(p.nome, ": ").concat(brl(p.valor));
    })));
  }
  if (rnHas(q, 'por procedimento', 'procedimento que mais', 'procedimentos mais')) {
    var _f3 = rnFin(ini, fim);
    return "Faturamento por procedimento ".concat(lbl, ":\n").concat(rnL(_f3.porProcedimento.slice(0, 8).map(function (p) {
      return "".concat(p.nome, ": ").concat(brl(p.valor));
    })));
  }
  if (rnHas(q, 'por atendimento', 'convenio', 'particular')) {
    var _f4 = rnFin(ini, fim);
    return "Faturamento por tipo de atendimento ".concat(lbl, ":\n").concat(rnL(_f4.porAtendimento.map(function (p) {
      return "".concat(p.nome, ": ").concat(brl(p.valor));
    })));
  }
  if (rnHas(q, 'fatur', 'receita', 'vendi', 'ganhei', 'vendas', 'resumo financeiro', 'financeiro')) {
    var _f5 = rnFin(ini, fim);
    return "O faturamento ".concat(lbl, " foi de **").concat(brl(_f5.faturamento), "** em ").concat(_f5.atendimentos, " atendimentos.\n- Recebido: ").concat(brl(_f5.recebido), "\n- A receber: ").concat(brl(_f5.aReceber), "\n- Despesas: ").concat(brl(_f5.despesas), "\n- Lucro l\xEDquido: **").concat(brl(_f5.lucroLiquido), "** (margem de ").concat(String(_f5.margemPct).replace('.', ','), "%)\n- Ticket m\xE9dio: ").concat(brl(_f5.ticketMedio));
  }
  if (rnHas(q, 'ticket')) {
    var _f6 = rnFin(ini, fim);
    return "O ticket m\xE9dio ".concat(lbl, " foi de **").concat(brl(_f6.ticketMedio), "** em ").concat(_f6.atendimentos, " atendimentos.");
  }
  if (rnHas(q, 'lucro', 'margem', 'sobrou')) {
    var _f7 = rnFin(ini, fim);
    return "O lucro l\xEDquido ".concat(lbl, " foi de **").concat(brl(_f7.lucroLiquido), "**, margem de ").concat(String(_f7.margemPct).replace('.', ','), "%. Faturamento ").concat(brl(_f7.faturamento), " menos despesas ").concat(brl(_f7.despesas), ".");
  }
  if (rnHas(q, 'despesa', 'gasto', 'gastei', 'custo')) {
    var _f8 = rnFin(ini, fim);
    return "As despesas ".concat(lbl, " somaram **").concat(brl(_f8.despesas), "**. As maiores:\n").concat(rnL(_f8.despesasPorCategoria.slice(0, 5).map(function (d) {
      return "".concat(d.nome, ": ").concat(brl(d.valor));
    })));
  }
  if (rnHas(q, 'a pagar', 'contas a pagar', 'boleto', 'pagar ainda')) {
    var p = DESP_STORE.v.filter(function (d) {
      return d.status === 'Pendente';
    }).sort(function (a, b) {
      return a.venc.localeCompare(b.venc);
    });
    return p.length ? "H\xE1 **".concat(p.length, " contas a pagar**, somando **").concat(brl(rnSum(p, function (d) {
      return d.total;
    })), "**:\n").concat(rnL(p.slice(0, 5).map(function (d) {
      return "".concat(d.desc, ": ").concat(brl(d.total), ", vence em ").concat(dBR(d.venc));
    }))) : 'Não há contas pendentes a pagar.';
  }
  if (rnHas(q, 'a receber', 'receber', 'pendente')) {
    var _f9 = rnFin(ini, fim);
    return "Dos atendimentos ".concat(lbl, ", faltam receber **").concat(brl(_f9.aReceber), "**").concat(_f9.emAtraso ? ", sendo ".concat(brl(_f9.emAtraso), " j\xE1 em atraso") : '', ".");
  }
  if (rnHas(q, 'recebi', 'recebido', 'entrou no caixa')) {
    var _f0 = rnFin(ini, fim);
    return "Voc\xEA recebeu **".concat(brl(_f0.recebido), "** ").concat(lbl, ", de um faturamento de ").concat(brl(_f0.faturamento), ".");
  }
  if (rnHas(q, 'estoque', 'produto', 'insumo', 'falta', 'acabando', 'minimo', 'vencid', 'validade', 'vence', 'consumo', 'entrou', 'saiu', 'usar primeiro', 'utilizar primeiro', 'repor')) {
    var e = rnEstoque();
    if (rnHas(q, 'vencid', 'fora da validade')) return e.vencidos.length ? "Produtos vencidos (perda de ".concat(brl(e.perdaComVencidos), "):\n").concat(rnL(e.vencidos.map(function (p) {
      return "".concat(p.produto, ": ").concat(p.quantidade, " ").concat(p.unidade.toLowerCase(), ", venceu em ").concat(p.validade);
    })), "\n\nDescarte e d\xEA baixa no estoque.") : 'Nenhum produto vencido.';
    if (rnHas(q, 'vence', 'validade', 'usar primeiro', 'utilizar', 'usar antes')) return "Use primeiro os que vencem em at\xE9 60 dias:\n".concat(rnL(e.venceEmBreve60dias.map(function (p) {
      return "".concat(p.produto, ": vence em ").concat(p.validade);
    })));
    if (rnHas(q, 'falta', 'acabando', 'minimo', 'baixo', 'repor', 'comprar')) return "Est\xE3o abaixo do m\xEDnimo:\n".concat(rnL(e.abaixoDoMinimo.map(function (p) {
      return "".concat(p.produto, ": tem ").concat(p.quantidade, ", m\xEDnimo ").concat(p.minimo);
    })), "\n\nRepor tudo custa cerca de **").concat(brl(e.custoParaReporAbaixoDoMinimo), "**.");
    if (rnHas(q, 'consumo', 'saiu', 'usou', 'usamos')) return "Nos \xFAltimos 30 dias o consumo foi de **".concat(brl(e.consumoTotal30diasValor), "**. Os que mais sa\xEDram:\n").concat(rnL(e.consumoUltimos30dias.slice(0, 5).map(function (p) {
      return "".concat(p.produto, ": ").concat(p.saiu, " ").concat(p.unidade.toLowerCase(), " (").concat(brl(p.valor), ")");
    })));
    if (rnHas(q, 'entrou', 'compra', 'chegou')) return "Entradas nos \xFAltimos 30 dias (compras de insumos):\n".concat(rnL(e.entradasCompras30dias.map(function (c) {
      return "".concat(c.data, ": ").concat(c.descricao, ", ").concat(brl(c.valor));
    })));
    return "O estoque tem **".concat(e.totalProdutos, " produtos** (").concat(e.unidadesEmEstoque, " unidades) valendo **").concat(brl(e.valorEmEstoque), "**. ").concat(e.abaixoDoMinimo.length, " abaixo do m\xEDnimo, ").concat(e.venceEmBreve60dias.length, " vencendo em breve e ").concat(e.vencidos.length, " vencido(s).");
  }
  if (rnHas(q, 'conversa', 'mensagens nao lidas', 'nao lida', 'whatsapp')) {
    var u = INBOX.filter(function (c) {
      return c.u;
    });
    return "H\xE1 **".concat(u.length, " conversas de pacientes** com mensagens n\xE3o lidas: ").concat(u.map(function (c) {
      return c.n + ' (' + c.u + ')';
    }).join(', '), ". O WhatsApp est\xE1 ").concat(WA_STORE.v.status === 'on' ? 'conectado no ' + WA_STORE.v.numero : 'desconectado', ".");
  }
  if (rnHas(q, 'economiz', ' ia ', 'renata fez', 'inteligencia')) return "A IA economizou **27 horas** no \xFAltimo m\xEAs: atendeu 412 conversas e fez 64 agendamentos sozinha (+11,5% vs m\xEAs anterior).";
  if (rnHas(q, 'genero', 'homens', 'mulheres', 'sexo')) {
    var _f1 = PAC.filter(function (p) {
      return p.sexo === 'Feminino';
    }).length;
    return "No painel: homens 35% e mulheres 15%. Entre os ".concat(PAC.length, " pacientes cadastrados na lista, ").concat(_f1, " s\xE3o mulheres e ").concat(PAC.length - _f1, " homens.");
  }
  if (rnHas(q, 'atendimentos por dia', 'por dia', 'dia da semana', 'melhor dia')) return "Nos \xFAltimos 14 dias foram **131 atendimentos**, m\xE9dia de 9,4 por dia. O melhor dia foi 30/09 (14) e o mais fraco 27/09 (2, domingo).\n\nNa semana, quarta \xE9 o dia mais forte (47) e s\xE1bado o mais fraco (27).";
  if (rnHas(q, 'atendimento')) return "Foram **48 atendimentos** nesta semana (+0,8% vs m\xEAs anterior) e 131 nos \xFAltimos 14 dias.";
  if (rnHas(q, 'recentes')) return "Pacientes recentes: ".concat(PATIENTS.slice(0, 4).map(function (p) {
    return p.name + ' (' + p.proc + ')';
  }).join(', '), ".");
  if (rnHas(q, 'paciente')) return "A cl\xEDnica tem **102 pacientes** (48 novos e 54 antigos), +12,8% no \xFAltimo m\xEAs. Na lista de cadastro est\xE3o: ".concat(PAC.map(function (p) {
    return p.nome;
  }).join(', '), ".");
  if (rnHas(q, 'agendamento')) return "S\xE3o **254 agendamentos** no m\xEAs (56 novos e 43 retornos), +1,9% no \xFAltimo m\xEAs. Hoje h\xE1 ".concat(rnAgenda(TODAY_ISO).total, " na agenda.");
  if (rnHas(q, 'anamnese')) return "Modelos de anamnese cadastrados:\n".concat(rnL((ANAM_STORE.v || ANAM0).map(function (m) {
    return "".concat(m.nome, " (").concat(m.uso, ", ").concat(m.qs.length, " perguntas)");
  })));
  if (rnHas(q, 'equipe', 'acesso', 'permiss')) return "Equipe e acessos:\n".concat(rnL(TEAM_STORE.v.map(function (u) {
    return "".concat(u.nome, ", ").concat(u.funcao, ": ").concat(u.dono ? 'acesso total' : moduleTree().filter(function (m) {
      return u.acc.includes(m.id);
    }).map(function (m) {
      return m.label;
    }).join(', '));
  })));
  if (rnHas(q, 'profission', 'dentista', 'biomedic', 'esteticista')) return "Profissionais:\n".concat(rnL(PROF_STORE.v.map(function (p) {
    return "".concat(p.nome, ", ").concat(p.esp, " (").concat(p.reg, ")");
  })));
  if (rnHas(q, 'canais', 'instagram', 'conectad') || /\bapi\b/.test(q)) return "WhatsApp ".concat(WA_STORE.v.status === 'on' ? 'conectado no ' + WA_STORE.v.numero + ' pela ' + (WA_STORE.v.modo === 'oficial' ? 'API oficial' : 'API não oficial') : 'desconectado', ". Instagram est\xE1 em Beta, com conex\xE3o em breve.");
  if (rnHas(q, 'saluteflix', 'curso')) return "No Saluteflix:\n".concat(rnL(FLIX0.map(function (c) {
    return "".concat(c.t, " (").concat(c.tipo).concat(c.prog ? ', ' + c.prog + '% assistido' : '', ")");
  })));
  if (rnHas(q, 'cast', 'podcast', 'episodio')) return "Salute Cast:\n".concat(rnL(CAST_STORE.v.map(function (e) {
    return "Ep. ".concat(e.ep, ": ").concat(e.t, " (").concat(e.dur, ")");
  })));
  if (rnHas(q, 'parceri', 'parceiro', 'cupom')) return "Parceiros:\n".concat(rnL(PARC0.map(function (p) {
    return "".concat(p.nome, ": ").concat(p.ben).concat(p.cupom ? ', cupom ' + p.cupom : '');
  })));
  if (rnHas(q, 'certifica', 'selo')) return "Certifica\xE7\xF5es do sistema: ".concat(SELOS_STORE.v.map(function (c) {
    return c.nome;
  }).join(', '), ".");
  if (rnHas(q, 'plano', 'conta', 'assinatura', 'cobranca')) return "Voc\xEA est\xE1 no plano **IA Pro** (R$ 997/m\xEAs), com 6.240 de 10.000 mensagens de IA usadas neste m\xEAs. Pr\xF3xima cobran\xE7a em 10/10/2026.";
  if (rnHas(q, 'clinica', 'endereco', 'cnpj', 'horario de funcionamento', 'estacionamento')) return "".concat(RN_CLINICA.fantasia, " (").concat(RN_CLINICA.razao, "), CNPJ ").concat(RN_CLINICA.cnpj, ". Endere\xE7o: ").concat(RN_CLINICA.endereco, ". Hor\xE1rio: ").concat(RN_CLINICA.horarios, ". Aceita ").concat(RN_CLINICA.pagamentos, ".");
  if (rnHas(q, 'categoria')) return "Categorias de receita: Est\xE9tica, Odontologia, Consulta e Venda de produto. Categorias de despesa: ".concat(DESP_CATS.join(', '), ".");
  return null;
}

/* ---------- conversa: contexto, conversa social e comandos ---------- */
var RN_CTX = {
  intent: null,
  period: null
};
var rnResetCtx = function rnResetCtx() {
  RN_CTX.intent = null;
  RN_CTX.period = null;
};
var rnHasPeriod = function rnHasPeriod(t) {
  return /\b(hoje|ontem|amanha|\d+\s*dias|semana|mes|meses|janeiro|fevereiro|marco|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro|trimestre|semestre|ano|2026)\b/.test(t);
};
var RN_TELAS = [['painel', /painel|inicio|dashboard/, 'o painel'], ['pacientes', /pacientes?/, 'a tela de pacientes'], ['agenda', /agenda/, 'a agenda'], ['mensagens', /mensage|conversas|whatsapp/, 'as mensagens'], ['gestao', /gestao|estoque|financeiro/, 'a gestão'], ['perfil', /configurac|ajustes|minha conta/, 'as configurações']];
function rnNavIntent(q) {
  if (!/\b(abr[ae]|abrir|me leva|leva pra|leve|vai pra|va pra|va para|ir para|ir pra|entra na|entra no|entrar na|entrar no|mostra a tela|mostre a tela)\b/.test(q)) return null;
  var t = RN_TELAS.find(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      re = _ref4[1];
    return re.test(q);
  });
  if (!t) return null;
  var ok = window.RN_NAV ? window.RN_NAV(t[0]) : false;
  return ok ? "Pronto, abri ".concat(t[2], " para voc\xEA.") : "Voc\xEA n\xE3o tem acesso a ".concat(t[2], " com o seu usu\xE1rio.");
}
function rnSmall(q) {
  var n = q.split(' ').length;
  if (/\b(quem e voce|qual (e )?o seu nome|seu nome|o que voce faz|o que voce sabe|como voce funciona|voce e quem)\b/.test(q)) return "Eu sou a Renata, a assistente de IA da ".concat(RN_CLINICA.fantasia, ". Vejo a agenda, os pacientes, as conversas, o estoque, o financeiro e as configura\xE7\xF5es da cl\xEDnica, e respondo na hora. Tamb\xE9m abro telas do sistema quando voc\xEA pedir.");
  if (n <= 5 && /^(obrigad\w*|brigad\w*|valeu|vlw|agradec\w*)\b/.test(q)) return 'Por nada! Quer ver mais alguma coisa da clínica?';
  if (n <= 4 && /^(show|perfeito|otimo|massa|beleza|top|legal|maravilha|entendi|certo|ok|blz|combinado)\b/.test(q)) return 'Combinado! Se quiser ver mais alguma coisa, é só falar.';
  if (n <= 5 && /^(tchau|ate mais|ate logo|ate amanha|falou|encerrar|so isso|era isso)\b/.test(q)) return 'Até mais, Camila! Quando precisar, é só me chamar.';
  if (n <= 6 && /\b(tudo bem|tudo bom|como voce esta|como vai)\b/.test(q)) return 'Tudo ótimo por aqui! E com você? Me fala o que quer ver da clínica.';
  if (n <= 5 && /^(oi|ola|opa|e ai|eai|hey|bom dia|boa tarde|boa noite|alo|renata)\b/.test(q)) {
    var h = BR.partes().h;
    return "".concat(h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite', ", ").concat(SB_ON && typeof rnPrimeiroNome === 'function' ? rnPrimeiroNome() : 'Camila', "! Pode me perguntar o que quiser da cl\xEDnica: agenda, pacientes, faturamento, estoque...");
  }
  return null;
}
function renataLocal(question) {
  var q = rnNorm(question).replace(/[?!.,;:]/g, ' ').replace(/\s+/g, ' ').trim();
  var nav = rnNavIntent(q);
  if (nav) return nav;
  var small = rnSmall(q);
  if (small) return small;
  var follow = !!RN_CTX.intent && (/^e\b/.test(q) || rnHasPeriod(q) && q.split(' ').length <= 5);
  var inherit = !!RN_CTX.intent && !rnHasPeriod(q) && q.split(' ').length <= 5;
  var pq = inherit ? RN_CTX.period || q : q;
  var a = rnCore(q, pq);
  if (a) {
    RN_CTX.intent = q;
    RN_CTX.period = pq;
    return a;
  }
  if (follow) {
    a = rnCore(RN_CTX.intent, pq);
    if (a) {
      RN_CTX.period = pq;
      return a;
    }
  }
  return 'Ainda não consegui responder essa por aqui. Posso falar sobre agenda, pacientes, atendimentos, funil, leads, estoque, faturamento, despesas, lucro, inadimplência, nota fiscal, Salute Pay, equipe, profissionais, canais, Saluteflix, parcerias, certificações e sua conta. Tente perguntar de outro jeito. Perguntas gerais fora da clínica eu respondo quando a IA estiver conectada.';
}
var RENATA_TOOLS = [{
  name: 'financeiro_periodo',
  description: 'Retorna faturamento, recebido, a receber, em atraso, despesas, lucro líquido, margem, ticket médio e quebras por profissional, procedimento, tipo de atendimento, forma de pagamento e categoria de despesa para um período qualquer. Use quando o período pedido não estiver no resumo.',
  inputSchema: {
    type: 'object',
    properties: {
      inicio: {
        type: 'string',
        description: 'Data inicial AAAA-MM-DD'
      },
      fim: {
        type: 'string',
        description: 'Data final AAAA-MM-DD'
      }
    },
    required: ['inicio', 'fim']
  },
  execute: function execute(i) {
    return rnFin(String(i.inicio), String(i.fim));
  }
}, {
  name: 'agenda_do_dia',
  description: 'Retorna os agendamentos de um dia (horário, paciente, profissional). Use para dias diferentes de hoje e amanhã.',
  inputSchema: {
    type: 'object',
    properties: {
      data: {
        type: 'string',
        description: 'AAAA-MM-DD'
      }
    },
    required: ['data']
  },
  execute: function execute(i) {
    return rnAgenda(String(i.data));
  }
}, {
  name: 'dados_paciente',
  description: 'Retorna cadastro, prontuário (anamneses, procedimentos, mapeamentos, documentos), histórico e financeiro de um paciente pelo nome.',
  inputSchema: {
    type: 'object',
    properties: {
      nome: {
        type: 'string'
      }
    },
    required: ['nome']
  },
  execute: function execute(i) {
    return SB_ON ? rnPacienteDB(String(i.nome)) : rnPaciente(String(i.nome));
  }
}, {
  name: 'lancamentos',
  description: 'Lista até 40 lançamentos de receitas ou despesas de um período, com status. Use para perguntas sobre lançamentos específicos.',
  inputSchema: {
    type: 'object',
    properties: {
      tipo: {
        type: 'string',
        "enum": ['receitas', 'despesas']
      },
      inicio: {
        type: 'string'
      },
      fim: {
        type: 'string'
      }
    },
    required: ['tipo', 'inicio', 'fim']
  },
  execute: function execute(i) {
    return (i.tipo === 'despesas' ? DESP_STORE.v.filter(function (d) {
      return d.data >= i.inicio && d.data <= i.fim;
    }).map(function (d) {
      return {
        data: dBR(d.data),
        descricao: d.desc,
        categoria: d.cat,
        valor: d.total,
        status: d.status
      };
    }) : REC_STORE.v.filter(function (r) {
      return r.data >= i.inicio && r.data <= i.fim;
    }).map(function (r) {
      return {
        data: dBR(r.data),
        paciente: r.pac,
        procedimento: r.proc,
        profissional: r.pro,
        valor: liq(r),
        forma: r.forma,
        status: r.status,
        vencimento: dBR(r.venc)
      };
    })).slice(0, 40);
  }
}];
RENATA_TOOLS.push({
  name: 'abrir_tela',
  description: 'Abre uma tela do sistema Salute IA para a pessoa. Use quando ela pedir para abrir, ir para ou mostrar uma tela.',
  inputSchema: {
    type: 'object',
    properties: {
      tela: {
        type: 'string',
        "enum": ['painel', 'pacientes', 'agenda', 'mensagens', 'gestao', 'perfil'],
        description: 'perfil = Configurações; gestao = Estoque e Financeiro'
      }
    },
    required: ['tela']
  },
  execute: function execute(i) {
    return {
      aberta: window.RN_NAV ? window.RN_NAV(String(i.tela)) : false
    };
  }
});
var RENATA_RULES = function RENATA_RULES(voice) {
  return "Voc\xEA \xE9 a Renata, a assistente de IA da ".concat(RN_CLINICA.fantasia, ", dentro do sistema Salute IA. Est\xE1 conversando com ").concat(rnQuem(), ".\n\nRegras:\n1. Responda SOMENTE com base nos dados desta cl\xEDnica, que est\xE3o no JSON abaixo ou nas ferramentas. Nunca use, cite ou invente dados de outras cl\xEDnicas. Se a informa\xE7\xE3o n\xE3o existir nos dados, diga isso com clareza e sugira onde a pessoa pode ver ou cadastrar no sistema.\n2. Nunca invente n\xFAmeros. Calcule a partir dos dados. Para per\xEDodos, dias ou pacientes que n\xE3o est\xE3o no resumo, use as ferramentas.\n3. Voc\xEA tamb\xE9m pode trazer conhecimento de mercado (benchmarks de cl\xEDnicas de est\xE9tica e odontologia no Brasil, boas pr\xE1ticas de gest\xE3o, marketing e atendimento). Quando fizer isso, deixe claro que \xE9 refer\xEAncia de mercado e use faixas realistas e cr\xEDveis, nunca n\xFAmeros exagerados.\n4. Hoje \xE9 ").concat(rnHojeTxt(), ". Valores em reais no formato brasileiro (R$ 1.234,56). Datas no formato dd/mm/aaaa.\n5. Portugu\xEAs do Brasil, tom acolhedor, direto e profissional, como uma colega de trabalho. Comece pela resposta. N\xE3o use travess\xF5es. N\xE3o narre o uso das ferramentas.\n6. Voc\xEA \xE9 um agente do pr\xF3prio sistema: quando pedirem para abrir uma tela ou aba, use abrir_tela; para a ficha, o prontu\xE1rio ou a conversa de um paciente, use abrir_paciente. Confirme em uma frase.\n7. Se a pessoa s\xF3 cumprimentar, agradecer ou se despedir, responda de forma breve e calorosa. Para perguntas que dependem da conversa anterior (por exemplo \"e em agosto?\"), use o contexto das mensagens anteriores.\n8. A\xE7\xF5es no sistema: para lan\xE7ar, receber, pagar, dar entrada ou baixa no estoque, dar baixa em conta pendente, agendar, remarcar, cancelar ou confirmar agendamento, cadastrar ou atualizar paciente, enviar anamnese ou mensagem de WhatsApp, registrar procedimento no prontu\xE1rio, mover lead no CRM ou ligar e pausar a IA de um lead, use as ferramentas propor_*. Elas s\xF3 preparam: o sistema mostra um cart\xE3o e grava quando a pessoa disser sim ou tocar em Confirmar. Nunca diga que fez antes disso. Depois de propor, fa\xE7a UMA pergunta curta de confirma\xE7\xE3o, por exemplo \"Agendar a Mariana para ter\xE7a, 07/10 \xE0s 10:00 com a Dra. Camila?\". Se faltar algo essencial, pergunte antes de propor. Quando a pessoa n\xE3o disser a hora ou a ferramenta avisar conflito, consulte horarios_livres e ofere\xE7a at\xE9 3 op\xE7\xF5es. Se uma ferramenta devolver erro, explique em uma frase e pe\xE7a o que falta. Com um mapeamento aberto, use ajustar_ponto_mapa para mudar quantidade, unidade, produto ou coment\xE1rio de um ponto pelo n\xFAmero; isso n\xE3o precisa de confirma\xE7\xE3o.\n").concat(voice ? '9. MODO VOZ: é uma conversa falada, como uma ligação. Responda em até 3 frases curtas, sem listas, sem markdown e sem emojis, com números e datas escritos de forma natural para serem falados. Se houver muitos itens, diga os 3 principais e pergunte se a pessoa quer ouvir o resto.' : '9. Respostas curtas. Use **negrito** para o número principal e listas curtas com "- " quando ajudar. Sem tabelas.', "\n\nDADOS DA CL\xCDNICA (JSON):\n");
};
Object.assign(window, {
  rnResetCtx: rnResetCtx,
  rnSnapshot: rnSnapshot,
  renataLocal: renataLocal,
  RENATA_TOOLS: RENATA_TOOLS,
  RENATA_RULES: RENATA_RULES,
  rnFin: rnFin,
  rnAgenda: rnAgenda,
  rnPaciente: rnPaciente,
  rnEstoque: rnEstoque,
  RN_CLINICA: RN_CLINICA
});

/* =====================================================================
   RENATA IA · lançamentos pela conversa (financeiro e estoque)
   A Renata só PROPÕE. Nada é gravado sem a confirmação da pessoa.
   ===================================================================== */
var RN_PENDING = makeStore(null);
var RN_NUMW = {
  um: 1,
  uma: 1,
  dois: 2,
  duas: 2,
  tres: 3,
  quatro: 4,
  cinco: 5,
  seis: 6,
  sete: 7,
  oito: 8,
  nove: 9,
  dez: 10,
  onze: 11,
  doze: 12,
  treze: 13,
  quatorze: 14,
  catorze: 14,
  quinze: 15,
  dezesseis: 16,
  dezessete: 17,
  dezoito: 18,
  dezenove: 19,
  vinte: 20,
  trinta: 30,
  quarenta: 40,
  cinquenta: 50,
  sessenta: 60,
  setenta: 70,
  oitenta: 80,
  noventa: 90,
  cem: 100,
  cento: 100,
  duzentos: 200,
  trezentos: 300,
  quatrocentos: 400,
  quinhentos: 500,
  seiscentos: 600,
  setecentos: 700,
  oitocentos: 800,
  novecentos: 900
};
var rnWords2Num = function rnWords2Num(q) {
  var t = String(q).replace(/\b[a-z]+\b/g, function (w) {
    return RN_NUMW[w] !== undefined ? String(RN_NUMW[w]) : w;
  });
  for (var k = 0; k < 2; k++) t = t.replace(/\b(\d+)\s+e\s+(\d+)\b/g, function (m, a, b) {
    return +a >= 20 && +a % 10 === 0 && +b < +a && b.length < a.length ? String(+a + +b) : m;
  });
  return t;
};
var RN_UNIT_RE = /^\s*(frascos?|seringas?|unidades?|un\b|kits?|caixas?|tubetes?|ampolas?|pacotes?|potes?|pecas?|vezes|x\b|parcelas?|%|dias?|horas?|meses|anos?)/;
function rnMoneys(q0) {
  var q = rnWords2Num(q0);
  var out = [];
  var re = /(r\$\s*)?(\d+(?:\.\d{3})+(?:,\d{1,2})?|\d+(?:,\d{1,2})?)?(\s*mil\b(?:\s+e\s+(\d+))?|\s*k\b)?(\s*(?:reais|real|conto|contos)\b)?/g;
  var m;
  while (m = re.exec(q)) {
    if (!m[0].trim()) {
      re.lastIndex++;
      continue;
    }
    var _m = m,
      _m2 = _slicedToArray(_m, 6),
      all = _m2[0],
      rs = _m2[1],
      num = _m2[2],
      mil = _m2[3],
      extra = _m2[4],
      reais = _m2[5];
    var i = m.index;
    var after = q.slice(i + all.length);
    if (!num && !mil) continue;
    if (num && /dia\s*$/.test(q.slice(Math.max(0, i - 5), i))) continue;
    if (num && /^\s*\//.test(after)) continue;
    if (!mil && !rs && !reais && RN_UNIT_RE.test(after)) continue;
    var v = num ? parseFloat(num.replace(/\./g, '').replace(',', '.')) : 1;
    if (mil) v = v * 1000 + (extra ? +extra : 0);
    if (!rs && !mil && !reais && v < 10) continue;
    out.push({
      v: Math.round(v * 100) / 100,
      i: i
    });
  }
  return out;
}
function rnDue(q) {
  var t = new Date(TODAY);
  var m = q.match(/\b(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?\b/);
  if (m) {
    var y = m[3] ? +m[3] < 100 ? 2000 + +m[3] : +m[3] : t.getFullYear();
    return rnIso(new Date(y, +m[2] - 1, +m[1]));
  }
  m = q.match(/\bdia\s+(\d{1,2})\b/);
  if (m) {
    var d = +m[1];
    var x = new Date(t.getFullYear(), t.getMonth(), d);
    if (d < t.getDate()) x = new Date(t.getFullYear(), t.getMonth() + 1, d);
    return rnIso(x);
  }
  if (/\bamanha\b/.test(q)) return rnIso(addD(TODAY, 1));
  if (/semana que vem|proxima semana/.test(q)) return rnIso(addD(TODAY, 7));
  if (/mes que vem|proximo mes/.test(q)) return rnIso(new Date(t.getFullYear(), t.getMonth() + 1, t.getDate()));
  return null;
}
var RN_PROC_SIN = [['toxina|botox|botulinica', 'Toxina botulínica'], ['preenchimento', 'Preenchimento labial'], ['bioestimulador|sculptra|radiesse', 'Bioestimulador'], ['fios|pdo', 'Fios de PDO'], ['harmonizacao', 'Harmonização facial'], ['limpeza de pele', 'Limpeza de pele'], ['peeling', 'Peeling químico'], ['clareamento', 'Clareamento dental'], ['limpeza dental|profilaxia', 'Limpeza dental'], ['restauracao', 'Restauração'], ['canal', 'Tratamento de canal'], ['avaliacao|consulta', 'Avaliação']];
var rnProcOf = function rnProcOf(t) {
  var q = rnNorm(t);
  var f = RN_PROC_SIN.find(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 1),
      re = _ref6[0];
    return new RegExp(re).test(q);
  });
  return f ? f[1] : null;
};
var rnFormaOf = function rnFormaOf(t) {
  var q = rnNorm(t);
  return /credito/.test(q) ? 'Cartão de crédito' : /debito/.test(q) ? 'Cartão de débito' : /dinheiro|especie/.test(q) ? 'Dinheiro' : /boleto/.test(q) ? 'Boleto' : /convenio/.test(q) ? 'Convênio' : /cartao/.test(q) ? 'Cartão de crédito' : /pix/.test(q) ? 'Pix' : null;
};
var RN_DESP_SIN = [['energia|luz|eletrica|elektro|cpfl', 'Energia e água', 'Energia elétrica'], ['agua|saae|esgoto', 'Energia e água', 'Água e esgoto'], ['aluguel|condominio', 'Aluguel', 'Aluguel da clínica'], ['salario|folha|funcionari|comissao', 'Folha de pagamento', 'Salários e comissões'], ['marketing|anuncio|trafego|meta ads|google ads|agencia|social media', 'Marketing', 'Marketing'], ['imposto|simples|das\\b|iss\\b|darf', 'Impostos', 'Impostos'], ['laboratorio|protese', 'Laboratório', 'Laboratório'], ['internet|software|sistema|telefone|contador|contabil', 'Serviços e software', 'Serviços e software'], ['manutencao|conserto|reparo|limpeza da clinica', 'Manutenção', 'Manutenção'], ['insumo|fornecedor|material|descartave|luva|seringa|toxina|acido', 'Insumos e fornecedores', 'Insumos']];
var rnDespOf = function rnDespOf(t) {
  var q = rnNorm(t);
  var f = RN_DESP_SIN.find(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 1),
      re = _ref8[0];
    return new RegExp(re).test(q);
  });
  return f ? {
    cat: f[1],
    desc: f[2]
  } : null;
};
function rnProdOf(t) {
  var q = rnNorm(t).replace(/\bbotox\b/g, 'toxina botulinica').replace(/\bhialuronico\b/g, 'acido hialuronico');
  var best = null,
    sc = 0;
  PROD_STORE.v.forEach(function (p) {
    var ws = rnNorm(p.nome).split(/[^a-z0-9]+/).filter(function (w) {
      return w.length > 3;
    });
    var s = ws.filter(function (w) {
      return q.includes(w);
    }).length;
    if (s > sc) {
      sc = s;
      best = p;
    }
  });
  return best;
}
var RN_STOP = new Set(['falta', 'faltam', 'faltou', 'ainda', 'que', 'ficou', 'pro', 'pra', 'para', 'dia', 'de', 'do', 'da', 'dos', 'das', 'e', 'no', 'na', 'mas', 'com', 'em', 'via', 'por', 'pix', 'cartao', 'dinheiro', 'boleto', 'hoje', 'ontem', 'amanha', 'pagou', 'pago', 'paga', 'restante', 'resto', 'saldo', 'referente', 'ao', 'a', 'o', 'reais', 'mil', 'vai', 'pagar', 'vence']);
function rnPacOf(t) {
  var nt = rnNorm(t);
  var full = PAC_NOMES.find(function (n) {
    var p = rnNorm(n).split(' ');
    return nt.includes(p[0] + ' ' + p[1]) || nt.includes(rnNorm(n));
  });
  if (full) return full;
  var cap = function cap(ws) {
    return ws.slice(0, 3).map(function (w) {
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    }).join(' ');
  };
  var m = t.match(/(?:cliente|paciente)\s+([A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+){0,4})/i);
  if (m) {
    var keep = [];
    var _iterator = _createForOfIteratorHelper(m[1].split(/\s+/)),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var w = _step.value;
        if (RN_STOP.has(rnNorm(w))) break;
        keep.push(w);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    if (keep.length) return cap(keep);
  }
  var c = t.match(/\b(?:da|do|de)\s+([A-ZÀ-Ý][a-zà-ÿ]+(?:\s+[A-ZÀ-Ý][a-zà-ÿ]+){1,2})/);
  if (c) return cap(c[1].split(/\s+/));
  return null;
}

/* ---------- monta a proposta (usada pela conversa e pela IA) ---------- */
var __rnActId = 1;
function rnBuildFin(items) {
  var out = [];
  var _iterator2 = _createForOfIteratorHelper(items || []),
    _step2;
  try {
    var _loop = function _loop() {
        var x = _step2.value;
        var valor = Math.round(Number(x.valor) * 100) / 100;
        if (!(valor > 0)) return {
          v: {
            erro: 'Qual é o valor do lançamento?',
            need: 'valor'
          }
        };
        var tipo = x.tipo === 'despesa' ? 'despesa' : 'receita';
        var pago = x.status !== 'pendente';
        var data = /^\d{4}-\d{2}-\d{2}$/.test(String(x.data || '')) ? x.data : TODAY_ISO;
        if (tipo === 'receita') {
          var pac = String(x.paciente || '').trim();
          if (!pac) return {
            v: {
              erro: 'De qual paciente é esse pagamento?',
              need: 'paciente'
            }
          };
          var proc = rnProcOf(x.procedimento || '') || (x.procedimento ? String(x.procedimento) : 'Atendimento');
          var fp = FIN_PROCS.find(function (f) {
            return f.n === proc;
          });
          out.push({
            tipo: tipo,
            valor: valor,
            pago: pago,
            data: pago ? TODAY_ISO : data,
            venc: pago ? x.data && x.data <= TODAY_ISO ? x.data : TODAY_ISO : data,
            paciente: pac,
            procedimento: proc,
            cat: fp ? fp.cat : 'Consulta',
            profissional: FIN_PROS.find(function (p) {
              return rnNorm(p).includes(rnNorm(x.profissional || '#'));
            }) || 'Dra. Camila Rocha',
            forma: rnFormaOf(x.forma || '') || (pago ? 'Pix' : 'Boleto')
          });
        } else {
          var d0 = rnDespOf((x.categoria || '') + ' ' + (x.descricao || ''));
          var cat = DESP_CATS.find(function (c) {
            return rnNorm(c) === rnNorm(x.categoria || '');
          }) || (d0 ? d0.cat : 'Manutenção');
          out.push({
            tipo: tipo,
            valor: valor,
            pago: pago,
            data: data,
            venc: data,
            descricao: String(x.descricao || (d0 ? d0.desc : 'Despesa')).trim(),
            cat: cat,
            fornecedor: String(x.fornecedor || 'Não informado'),
            forma: rnFormaOf(x.forma || '') || (pago ? 'Pix' : 'Boleto')
          });
        }
      },
      _ret;
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      _ret = _loop();
      if (_ret) return _ret.v;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  if (!out.length) return {
    erro: 'O que você quer lançar?'
  };
  return {
    action: {
      id: 'a' + __rnActId++,
      kind: 'fin',
      items: out
    }
  };
}
function rnBuildEst(items) {
  var out = [];
  var _iterator3 = _createForOfIteratorHelper(items || []),
    _step3;
  try {
    var _loop2 = function _loop2() {
        var x = _step3.value;
        var p = _typeof(x.produto) === 'object' ? x.produto : PROD_STORE.v.find(function (q) {
          return rnNorm(q.nome) === rnNorm(x.produto || '');
        }) || rnProdOf(x.produto || '');
        if (!p) return {
          v: {
            erro: 'Não encontrei esse produto no estoque. Os produtos cadastrados são: ' + PROD_STORE.v.map(function (q) {
              return q.nome;
            }).join(', ') + '.'
          }
        };
        var n = Math.round(Number(x.quantidade));
        if (!(n > 0)) return {
          v: {
            erro: 'Qual é a quantidade?',
            need: 'quantidade'
          }
        };
        var tipo = x.tipo === 'saida' ? 'saida' : 'entrada';
        if (tipo === 'saida' && n > p.qtd) return {
          v: {
            erro: "S\xF3 tem ".concat(rnUnPl(p.qtd, p.un), " de ").concat(p.nome, " no estoque. Quer dar baixa de quanto?"),
            need: 'quantidade'
          }
        };
        out.push({
          tipo: tipo,
          prodId: p.id,
          produto: p.nome,
          un: p.un,
          quantidade: n,
          de: p.qtd,
          para: tipo === 'saida' ? p.qtd - n : p.qtd + n,
          valorTotal: x.valorTotal > 0 ? Math.round(x.valorTotal * 100) / 100 : 0
        });
      },
      _ret2;
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      _ret2 = _loop2();
      if (_ret2) return _ret2.v;
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  if (!out.length) return {
    erro: 'O que você quer movimentar no estoque?'
  };
  return {
    action: {
      id: 'a' + __rnActId++,
      kind: 'est',
      items: out
    }
  };
}
var rnUnPl = function rnUnPl(n, un) {
  return n + ' ' + un.toLowerCase() + (n > 1 ? /[aeiou]$/i.test(un) ? 's' : 'es' : '');
};
var rnHojeOu = function rnHojeOu(iso) {
  return iso === TODAY_ISO ? 'hoje' : 'em ' + dBR(iso);
};
function rnResumo(a) {
  if (a.kind === 'cmd') return a.resumo;
  if (a.kind === 'est') {
    var parts = a.items.map(function (x) {
      return "".concat(x.tipo === 'saida' ? 'dar baixa de' : 'dar entrada de', " **").concat(rnUnPl(x.quantidade, x.un), "** de **").concat(x.produto, "** (de ").concat(x.de, " para ").concat(x.para, ")").concat(x.valorTotal ? ", com compra de ".concat(brl(x.valorTotal), " paga hoje") : '');
    });
    var t = parts.join(' e ');
    return t.charAt(0).toUpperCase() + t.slice(1) + '?';
  }
  var rec = a.items.filter(function (x) {
      return x.tipo === 'receita';
    }),
    des = a.items.filter(function (x) {
      return x.tipo === 'despesa';
    });
  var ps = [];
  if (rec.length) {
    var pac = rec[0].paciente;
    ps.push(rec.map(function (x) {
      return "**".concat(brl(x.valor), "** ").concat(x.pago ? 'como recebido ' + rnHojeOu(x.data) : 'a receber em **' + dBR(x.venc) + '**');
    }).join(' e ') + " de **".concat(pac, "**").concat(rec[0].procedimento !== 'Atendimento' ? ' (' + rec[0].procedimento + ')' : ''));
  }
  des.forEach(function (x) {
    return ps.push("a despesa **".concat(x.descricao, "** de **").concat(brl(x.valor), "** ").concat(x.pago ? 'como paga ' + rnHojeOu(x.data) : 'a pagar em **' + dBR(x.venc) + '**'));
  });
  return 'Lançar ' + ps.join(' e ') + '?';
}
function rnApply(a) {
  if (a.kind === 'cmd') return rnExecCmd(a);
  if (SB_ON) return rnApplyDB(a);
  if (a.kind === 'est') {
    PROD_STORE.v = PROD_STORE.v.map(function (p) {
      var x = a.items.find(function (i) {
        return i.prodId === p.id;
      });
      if (!x) return p;
      return _objectSpread(_objectSpread({}, p), {}, {
        qtd: x.tipo === 'saida' ? Math.max(0, p.qtd - x.quantidade) : p.qtd + x.quantidade,
        cons: x.tipo === 'saida' ? (p.cons || 0) + x.quantidade : p.cons
      });
    });
    PROD_STORE.subs.forEach(function (f) {
      return f();
    });
    var compras = a.items.filter(function (x) {
      return x.tipo === 'entrada' && x.valorTotal;
    });
    if (compras.length) {
      var id = DESP_STORE.v.reduce(function (m, d) {
        return Math.max(m, d.id || 0);
      }, 0);
      DESP_STORE.v = [].concat(_toConsumableArray(compras.map(function (x) {
        return {
          id: ++id,
          desc: "".concat(x.produto, " (").concat(rnUnPl(x.quantidade, x.un), ")"),
          cat: 'Insumos e fornecedores',
          forn: 'Não informado',
          total: x.valorTotal,
          forma: 'Pix',
          data: TODAY_ISO,
          venc: TODAY_ISO,
          parc: 1,
          status: 'Pago',
          ia: true
        };
      })), _toConsumableArray(DESP_STORE.v));
      DESP_STORE.subs.forEach(function (f) {
        return f();
      });
    }
    return 'Pronto! Estoque atualizado: ' + a.items.map(function (x) {
      return "**".concat(x.produto, "** agora tem ").concat(rnUnPl(x.para, x.un));
    }).join('; ') + '.';
  }
  var rec = a.items.filter(function (x) {
      return x.tipo === 'receita';
    }),
    des = a.items.filter(function (x) {
      return x.tipo === 'despesa';
    });
  if (rec.length) {
    var _id = REC_STORE.v.reduce(function (m, r) {
      return Math.max(m, r.id || 0);
    }, 0);
    REC_STORE.v = [].concat(_toConsumableArray(rec.map(function (x) {
      return {
        id: ++_id,
        data: TODAY_ISO,
        pac: x.paciente,
        proc: x.procedimento,
        pro: x.profissional,
        cat: x.cat,
        atend: x.forma === 'Convênio' ? 'Convênio' : 'Particular',
        total: x.valor,
        desc: 0,
        forma: x.forma,
        parc: 1,
        venc: x.venc,
        status: x.pago ? 'Recebido' : 'Pendente',
        ia: true
      };
    })), _toConsumableArray(REC_STORE.v));
    REC_STORE.subs.forEach(function (f) {
      return f();
    });
  }
  if (des.length) {
    var _id2 = DESP_STORE.v.reduce(function (m, d) {
      return Math.max(m, d.id || 0);
    }, 0);
    DESP_STORE.v = [].concat(_toConsumableArray(des.map(function (x) {
      return {
        id: ++_id2,
        desc: x.descricao,
        cat: x.cat,
        forn: x.fornecedor,
        total: x.valor,
        forma: x.forma,
        data: x.data,
        venc: x.venc,
        parc: 1,
        status: x.pago ? 'Pago' : 'Pendente',
        ia: true
      };
    })), _toConsumableArray(DESP_STORE.v));
    DESP_STORE.subs.forEach(function (f) {
      return f();
    });
  }
  var ps = a.items.map(function (x) {
    return x.tipo === 'receita' ? "".concat(brl(x.valor), " ").concat(x.pago ? 'recebido' : 'a receber em ' + dBR(x.venc)) : "despesa ".concat(x.descricao, " de ").concat(brl(x.valor), " ").concat(x.pago ? 'paga' : 'a pagar em ' + dBR(x.venc));
  });
  return "Pronto! Lancei no financeiro: ".concat(ps.join(' e ')).concat(rec.length ? ', de ' + rec[0].paciente : '', ".");
}

/* ---------- entende o pedido sem IA (modo demonstração) ---------- */
function rnParseAction(question) {
  var raw = String(question || '');
  var q = rnNorm(raw);
  var isEst = /\b(estoque|dar entrada|dei entrada|da entrada|entrada de|chegou|chegaram|comprei|compramos|baixa|usei|usamos|consumi|consumimos|retirei|tirar|tira|saiu|sairam|descartei|descarta|perdemos|perdi)\b/.test(q) && rnProdOf(raw);
  var isDesp = /\b(despesa|paguei|pagamos|conta de|gasto|gastei|boleto de|fatura de)\b/.test(q);
  var isRec = /\b(lanc\w*|registr\w*|recebi|recebemos|pagou|pagamento|entrada de dinheiro|deu de entrada|sinal)\b/.test(q);
  if (isEst) {
    var qq = rnWords2Num(q);
    var um = qq.match(/(\d+)\s*(frascos?|seringas?|unidades?|un\b|kits?|caixas?|tubetes?|ampolas?|pacotes?|potes?|pecas?)/) || qq.match(/\b(\d{1,3})\b(?!\s*(mil|reais|\/|%))/);
    var saida = /\b(baixa|usei|usamos|consumi|consumimos|retirei|tirar|tira|saiu|sairam|descartei|descarta|perdemos|perdi)\b/.test(q);
    var money = rnMoneys(q).filter(function (x) {
      return x.v >= 10;
    });
    var r = rnBuildEst([{
      tipo: saida ? 'saida' : 'entrada',
      produto: rnProdOf(raw),
      quantidade: um ? +um[1] : 0,
      valorTotal: !saida && money.length ? money[money.length - 1].v : 0
    }]);
    return r;
  }
  if (!isDesp && !isRec) return null;
  var qn = rnWords2Num(q);
  var ms = rnMoneys(qn);
  if (!ms.length) return {
    erro: 'Qual é o valor?',
    need: 'valor'
  };
  var due = rnDue(qn);
  if (isDesp && !/cliente|paciente/.test(q)) {
    var d0 = rnDespOf(q) || {
      cat: 'Manutenção',
      desc: 'Despesa'
    };
    var pend = /\b(vence|vencimento|a pagar|pagar dia|pagar no dia|pendente|boleto)\b/.test(q) && !/\b(paguei|pagamos|ja paguei|pago)\b/.test(q);
    return rnBuildFin([{
      tipo: 'despesa',
      valor: ms[0].v,
      status: pend || due && due > TODAY_ISO ? 'pendente' : 'pago',
      data: due || TODAY_ISO,
      categoria: d0.cat,
      descricao: d0.desc,
      forma: raw
    }]);
  }
  var pac = rnPacOf(raw);
  var restIdx = qn.search(/\b(falta|faltam|faltou|restante|resto|saldo|ficou|vai pagar|a receber|depois|parcela)\b/);
  var items = [];
  var proc = rnProcOf(raw);
  var forma = rnFormaOf(raw);
  if (restIdx >= 0) {
    var before = ms.filter(function (x) {
        return x.i < restIdx;
      }),
      after = ms.filter(function (x) {
        return x.i > restIdx;
      });
    if (before.length) items.push({
      tipo: 'receita',
      valor: before[0].v,
      status: 'pago',
      paciente: pac,
      procedimento: proc,
      forma: forma
    });
    if (after.length) items.push({
      tipo: 'receita',
      valor: after[0].v,
      status: 'pendente',
      data: due || rnIso(addD(TODAY, 30)),
      paciente: pac,
      procedimento: proc
    });
    if (!before.length && !after.length) items.push({
      tipo: 'receita',
      valor: ms[0].v,
      status: 'pago',
      paciente: pac,
      procedimento: proc,
      forma: forma
    });
  } else {
    var _pend = due && due > TODAY_ISO || /\b(a receber|vai pagar|pendente|fiado)\b/.test(q);
    items.push({
      tipo: 'receita',
      valor: ms[0].v,
      status: _pend ? 'pendente' : 'pago',
      data: due || TODAY_ISO,
      paciente: pac,
      procedimento: proc,
      forma: forma
    });
  }
  return rnBuildFin(items);
}
var rnIsYes = function rnIsYes(q) {
  var n = rnNorm(q).replace(/[^a-z ]/g, ' ').trim();
  return n.split(/\s+/).length <= 7 && !/\bnao\b/.test(n) && /^(sim|pode|pode lancar|pode sim|lanca|lance|lancar|confirmo|confirma|confirmar|confirmado|isso|isso mesmo|correto|certo|ok|okay|manda|beleza|perfeito|exato|claro|uhum|aham|bora|fechado|tudo certo|ta certo|esta certo|positivo)\b/.test(n);
};
var rnIsNo = function rnIsNo(q) {
  var n = rnNorm(q).replace(/[^a-z ]/g, ' ').trim();
  return n.split(/\s+/).length <= 4 && /^(nao|cancela|cancelar|cancele|errado|esquece|deixa|negativo|nao lanca|para)\b/.test(n);
};
RENATA_TOOLS.push({
  name: 'propor_lancamento_financeiro',
  description: 'Prepara, SEM gravar, um ou mais lançamentos financeiros para a pessoa confirmar: receitas de pacientes (pagamentos recebidos ou a receber) e despesas da clínica (pagas ou a pagar). Ex.: "recebi 3 mil da Joana Xavier e falta mil para o dia 10" vira duas receitas: 3000 pago hoje e 1000 pendente com data do dia 10. Depois de chamar, faça UMA pergunta curta de confirmação resumindo valores, status e datas. O sistema só grava quando a pessoa disser sim.',
  inputSchema: {
    type: 'object',
    properties: {
      lancamentos: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            tipo: {
              type: 'string',
              "enum": ['receita', 'despesa']
            },
            valor: {
              type: 'number',
              description: 'Valor em reais'
            },
            status: {
              type: 'string',
              "enum": ['pago', 'pendente'],
              description: 'pago = recebido ou pago hoje; pendente = a receber ou a pagar'
            },
            data: {
              type: 'string',
              description: 'AAAA-MM-DD. Para pendente, a data de vencimento. Para pago, hoje.'
            },
            paciente: {
              type: 'string',
              description: 'Obrigatório em receita'
            },
            procedimento: {
              type: 'string'
            },
            profissional: {
              type: 'string'
            },
            forma: {
              type: 'string',
              description: 'Pix, Cartão de crédito, Cartão de débito, Dinheiro, Boleto ou Convênio'
            },
            descricao: {
              type: 'string',
              description: 'Obrigatório em despesa'
            },
            categoria: {
              type: 'string',
              "enum": DESP_CATS
            },
            fornecedor: {
              type: 'string'
            }
          },
          required: ['tipo', 'valor', 'status']
        }
      }
    },
    required: ['lancamentos']
  },
  execute: function execute(i) {
    var r = rnBuildFin(i.lancamentos);
    if (r.erro) return {
      erro: r.erro
    };
    RN_PENDING.v = r.action;
    RN_PENDING.subs.forEach(function (f) {
      return f();
    });
    return {
      status: 'aguardando confirmação da pessoa',
      resumo: rnResumo(r.action).replace(/\*\*/g, '')
    };
  }
}, {
  name: 'propor_movimentacao_estoque',
  description: 'Prepara, SEM gravar, entradas ou baixas de produtos no estoque para a pessoa confirmar. Use o nome do produto como está no estoque. Depois de chamar, faça UMA pergunta curta de confirmação. O sistema só grava quando a pessoa disser sim.',
  inputSchema: {
    type: 'object',
    properties: {
      movimentos: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            tipo: {
              type: 'string',
              "enum": ['entrada', 'saida']
            },
            produto: {
              type: 'string'
            },
            quantidade: {
              type: 'number'
            },
            valorTotal: {
              type: 'number',
              description: 'Valor total pago na compra, se informado (só entrada)'
            }
          },
          required: ['tipo', 'produto', 'quantidade']
        }
      }
    },
    required: ['movimentos']
  },
  execute: function execute(i) {
    var r = rnBuildEst(i.movimentos);
    if (r.erro) return {
      erro: r.erro
    };
    RN_PENDING.v = r.action;
    RN_PENDING.subs.forEach(function (f) {
      return f();
    });
    return {
      status: 'aguardando confirmação da pessoa',
      resumo: rnResumo(r.action).replace(/\*\*/g, '')
    };
  }
});
var rnSetPending = function rnSetPending(v) {
  RN_PENDING.v = v;
  RN_PENDING.subs.forEach(function (f) {
    return f();
  });
};
var RN_DRAFT = null;
/* modo demonstração: entende o pedido, pede o que faltar e monta a proposta */
function rnLocalAction(question) {
  var r = null;
  if (RN_DRAFT) {
    var n = String(question).trim().split(/\s+/).length;
    if (n <= 6) r = rnParseAction(RN_DRAFT.q + (RN_DRAFT.need === 'paciente' ? ' da cliente ' : RN_DRAFT.need === 'quantidade' ? ' ' : ' ') + question + (RN_DRAFT.need === 'quantidade' && /^\s*\d+\s*$/.test(question) ? ' unidades' : ''));
    RN_DRAFT = null;
  }
  if (!r) r = rnParseAction(question);
  if (!r) return null;
  if (r.erro) {
    if (r.need) RN_DRAFT = {
      q: question,
      need: r.need
    };
    return {
      text: r.erro
    };
  }
  rnSetPending(r.action);
  return {
    text: rnResumo(r.action)
  };
}
Object.assign(window, {
  rnSetPending: rnSetPending,
  rnLocalAction: rnLocalAction,
  RN_PENDING: RN_PENDING,
  rnParseAction: rnParseAction,
  rnApply: rnApply,
  rnResumo: rnResumo,
  rnIsYes: rnIsYes,
  rnIsNo: rnIsNo
});

/* =====================================================================
   RENATA IA · chat no estilo ChatGPT, com conversa por voz
   ===================================================================== */
var RIcon = window.SaluteProjetoDesigner_8b4683.Icon;
var RN_FRAMED = function () {
  try {
    return window.top !== window.self;
  } catch (e) {
    return true;
  }
}();
var RN_POPUP = !RN_FRAMED && /renata-voz/.test(location.hash);
var RN_OPENER = function () {
  try {
    return RN_POPUP && window.opener && window.opener !== window ? window.opener : null;
  } catch (e) {
    return null;
  }
}();
var RN_CAN_POP = RN_FRAMED && /^https?:/.test(location.href);
var RN_STORE = makeStore({
  open: RN_POPUP,
  msgs: [],
  nav: 0
});
var RN_AI = makeStore(SB_ON ? {
  key: ''
} : lsGet('salute-kit:renata-ia', {
  key: ''
}));
/* Voz oficial da Renata (ElevenLabs), definida pelo Kevin. A Renata sempre fala com esta voz;
   a voz do aparelho só entra como reserva quando a ElevenLabs não está acessível. */
var RN_VOZ_OFICIAL = 'RGymW84CSmfVugnA5tvA';
var RN_VOICE = makeStore(function () {
  var s = SB_ON ? {} : lsGet('salute-kit:renata-voz', {}) || {};
  return {
    key: s.key || '',
    voiceId: s.voiceId || RN_VOZ_OFICIAL,
    model: s.model || 'eleven_flash_v2_5'
  };
}());
(function rnStyles() {
  if (document.getElementById('rn-styles')) return;
  var st = document.createElement('style');
  st.id = 'rn-styles';
  st.textContent = "\n  @keyframes rnSpin { to { transform: rotate(360deg); } }\n  @keyframes rnBreath { 0%,100% { transform: scale(1); } 50% { transform: scale(1.045); } }\n  @keyframes rnTalk { 0%,100% { transform: scale(1); } 25% { transform: scale(1.09); } 55% { transform: scale(.97); } 75% { transform: scale(1.06); } }\n  @keyframes rnThink { 0%,100% { transform: scale(.94); opacity:.9 } 50% { transform: scale(1.02); opacity:1 } }\n  @keyframes rnDot { 0%,80%,100% { opacity:.25; transform: translateY(0) } 40% { opacity:1; transform: translateY(-3px) } }\n  @keyframes rnPulse { 0% { box-shadow: 0 0 0 0 rgba(79,123,230,.45) } 70% { box-shadow: 0 0 0 8px rgba(79,123,230,0) } 100% { box-shadow: 0 0 0 0 rgba(79,123,230,0) } }\n  @keyframes rnCaret { 50% { opacity: 0 } }\n  .rn-md p { margin: 0 0 10px } .rn-md p:last-child { margin-bottom: 0 } .rn-md ul, .rn-md ol { margin: 4px 0 10px; padding-left: 22px } .rn-md li { margin: 3px 0 } .rn-md strong { font-weight: 600; color: var(--text-strong) }\n  .rn-act { width: 32px; height: 32px; border-radius: 8px; border: 0; background: transparent; color: var(--text-muted); cursor: pointer; display: inline-flex; align-items: center; justify-content: center; padding: 0 }\n  .rn-act:hover { background: rgba(31,94,255,.08); color: var(--text-strong) }\n  .rn-sug:hover { background: rgba(255,255,255,.95) !important; border-color: rgba(31,94,255,.25) !important }\n  ";
  document.head.appendChild(st);
})();
function RenataOrb(_ref9) {
  var _ref9$size = _ref9.size,
    size = _ref9$size === void 0 ? 40 : _ref9$size,
    _ref9$state = _ref9.state,
    state = _ref9$state === void 0 ? 'idle' : _ref9$state;
  var anim = state === 'speaking' ? 'rnTalk .9s ease-in-out infinite' : state === 'thinking' ? 'rnThink 1.4s ease-in-out infinite' : state === 'listening' ? 'rnBreath 2.4s ease-in-out infinite' : 'none';
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'relative',
      display: 'inline-block',
      width: size,
      height: size,
      borderRadius: '50%',
      overflow: 'hidden',
      flexShrink: 0,
      animation: anim,
      boxShadow: size > 60 ? '0 30px 60px -20px rgba(31,94,255,.55), inset 0 0 30px rgba(255,255,255,.35)' : '0 4px 12px -4px rgba(31,94,255,.6)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: '-25%',
      background: 'conic-gradient(from 0deg, #2B4CFF, #6E8BFF, #E9EEFF, #9DB8F2, #4F7BE6, #7B4BC4, #2B4CFF)',
      filter: "blur(".concat(Math.max(2, size / 9), "px)"),
      animation: "rnSpin ".concat(state === 'thinking' ? 2.2 : 7, "s linear infinite")
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(circle at 32% 26%, rgba(255,255,255,.95) 0%, rgba(255,255,255,.35) 26%, rgba(255,255,255,0) 52%)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(circle at 70% 80%, rgba(11,40,160,.35), rgba(11,40,160,0) 60%)'
    }
  }));
}
function RenataButton(_ref0) {
  var mobile = _ref0.mobile;
  var _useStore = useStore(RN_STORE),
    _useStore2 = _slicedToArray(_useStore, 2),
    st = _useStore2[0],
    setSt = _useStore2[1];
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return setSt(_objectSpread(_objectSpread({}, st), {}, {
        open: true
      }));
    },
    "aria-label": "Conversar com a Renata IA",
    title: "Pergunte \xE0 Renata",
    style: {
      position: 'relative',
      width: 40,
      height: 40,
      borderRadius: '50%',
      border: 0,
      padding: 0,
      cursor: 'pointer',
      background: 'transparent',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      animation: st.msgs.length ? 'none' : 'rnPulse 2.6s ease-out infinite'
    }
  }, /*#__PURE__*/React.createElement(RenataOrb, {
    size: mobile ? 34 : 36
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      filter: 'drop-shadow(0 1px 2px rgba(11,40,160,.6))'
    }
  }, /*#__PURE__*/React.createElement(RIcon, {
    name: "sparkles",
    size: mobile ? 15 : 16,
    strokeWidth: 2.2
  })));
}
function rnMd(text) {
  var esc = function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  };
  var inline = function inline(s) {
    return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/(^|[^*])\*(?!\s)(.+?)\*(?!\*)/g, '$1<em>$2</em>');
  };
  var lines = String(text || '').split('\n');
  var html = '',
    list = null,
    para = [];
  var flushP = function flushP() {
    if (para.length) {
      html += '<p>' + para.map(inline).join('<br/>') + '</p>';
      para = [];
    }
  };
  var flushL = function flushL() {
    if (list) {
      html += "<".concat(list.t, ">") + list.items.map(function (x) {
        return '<li>' + inline(x) + '</li>';
      }).join('') + "</".concat(list.t, ">");
      list = null;
    }
  };
  lines.forEach(function (ln) {
    var ul = ln.match(/^\s*[-•*]\s+(.*)$/),
      ol = ln.match(/^\s*\d+[.)]\s+(.*)$/),
      h = ln.match(/^\s*#{1,4}\s+(.*)$/);
    if (ul || ol) {
      flushP();
      var t = ul ? 'ul' : 'ol';
      if (!list || list.t !== t) {
        flushL();
        list = {
          t: t,
          items: []
        };
      }
      list.items.push((ul || ol)[1]);
    } else if (!ln.trim()) {
      flushP();
      flushL();
    } else if (h) {
      flushP();
      flushL();
      html += '<p><strong>' + inline(h[1]) + '</strong></p>';
    } else {
      flushL();
      para.push(ln);
    }
  });
  flushP();
  flushL();
  return html;
}
var rnPlain = function rnPlain(t) {
  return String(t || '').replace(/\*\*/g, '').replace(/^\s*[-•*]\s+/gm, '').replace(/#+\s/g, '').replace(/R\$\s?/g, 'R$ ');
};

/* ---------- fala: texto pronto para ser falado ---------- */
function rnSpeech(text, show) {
  var t = String(text || '');
  t = t.split('\n').map(function (l) {
    var m = l.match(/^\s*(?:[-•*]|\d+[.)])\s+(.*)$/);
    return m ? m[1].replace(/[.;:,]?\s*$/, '.') : l;
  }).join('\n');
  t = t.replace(/\*\*/g, '').replace(/(^|\s)\*(\S)/g, '$1$2').replace(/#+\s/g, '').replace(/[>`_]/g, ' ');
  if (!show) {
    t = t.replace(/R\$\s?([\d.]+),(\d{2})/g, function (m, a, c) {
      return a.replace(/\./g, '') + ' reais' + (c !== '00' ? ' e ' + +c + ' centavos' : '');
    });
    t = t.replace(/R\$\s?([\d.]+)/g, function (m, a) {
      return a.replace(/\./g, '') + ' reais';
    });
    t = t.replace(/\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/g, function (m, d, mo, y) {
      return +mo >= 1 && +mo <= 12 ? +d + ' de ' + MESL[+mo - 1] + (y !== '2026' ? ' de ' + y : '') : m;
    });
    t = t.replace(/\b(\d{1,2})\/(\d{1,2})\b/g, function (m, d, mo) {
      return +mo >= 1 && +mo <= 12 && +d <= 31 ? +d + ' de ' + MESL[+mo - 1] : m;
    });
    t = t.replace(/\b(\d{1,2}):(\d{2})\b/g, function (m, hh, mi) {
      return +hh + (mi === '00' ? +hh === 1 ? ' hora' : ' horas' : ' e ' + +mi);
    });
    t = t.replace(/\bDra\.\s?/g, 'Doutora ').replace(/\bDr\.\s?/g, 'Doutor ').replace(/\s·\s/g, ', ').replace(/\(([^)]*)\)/g, ', $1,');
  }
  return t.replace(/:\s*\n+\s*/g, ', ').replace(/\s*\n+\s*/g, ' ').replace(/:\s/g, ', ').replace(/\s+([,.])/g, '$1').replace(/,\s*([,.?!])/g, '$1').replace(/\.\s*\./g, '.').replace(/\s{2,}/g, ' ').trim();
}
function rnVoice(text) {
  var lines = String(text || '').split('\n').map(function (l) {
    return l.trim();
  }).filter(Boolean);
  var isItem = function isItem(l) {
    return /^(?:[-•*]|\d+[.)])\s+/.test(l);
  };
  var items = lines.filter(isItem);
  if (items.length <= 3) return {
    now: rnSpeech(text),
    nowShow: rnSpeech(text, true),
    rest: '',
    restShow: ''
  };
  var first = lines.findIndex(isItem);
  var after = lines.slice(first).filter(function (l) {
    return !isItem(l);
  });
  var a = lines.slice(0, first).concat(items.slice(0, 3)).join('\n'),
    b = items.slice(3).concat(after).join('\n');
  return {
    now: rnSpeech(a) + ' Quer que eu continue?',
    nowShow: rnSpeech(a, true) + ' Quer que eu continue?',
    rest: rnSpeech(b),
    restShow: rnSpeech(b, true)
  };
}

/* ---------- voz da Renata ---------- */
var RN_SILENT = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=';
var RN_PLAYER = typeof Audio !== 'undefined' ? new Audio() : null;
var __rnTok = 0;
function rnUnlockAudio() {
  try {
    if (window.speechSynthesis) {
      var u = new SpeechSynthesisUtterance(' ');
      u.volume = 0;
      speechSynthesis.speak(u);
    }
  } catch (e) {}
  try {
    if (RN_PLAYER) {
      RN_PLAYER.src = RN_SILENT;
      var p = RN_PLAYER.play();
      p && p["catch"](function () {});
    }
  } catch (e) {}
}
function rnPickVoice() {
  if (!window.speechSynthesis) return null;
  var vs = speechSynthesis.getVoices();
  var pt = vs.filter(function (v) {
    return /pt[-_]BR/i.test(v.lang);
  });
  var fem = /luciana|francisca|maria|thalita|vit[oó]ria|camila|fernanda|helena|leila|raquel|female|feminina|google portugu/i,
    male = /felipe|daniel|ricardo|ant[oô]nio|male\b|masculin/i;
  return pt.find(function (v) {
    return fem.test(v.name);
  }) || pt.find(function (v) {
    return !male.test(v.name);
  }) || pt[0] || vs.find(function (v) {
    return /^pt/i.test(v.lang);
  }) || null;
}
function rnStopSpeak() {
  __rnTok++;
  try {
    window.speechSynthesis && speechSynthesis.cancel();
  } catch (e) {}
  try {
    if (RN_PLAYER && !RN_PLAYER.paused) RN_PLAYER.pause();
  } catch (e) {}
}
function rnSpeak(_x, _x2) {
  return _rnSpeak.apply(this, arguments);
}
/* ---------- microfone ---------- */
function _rnSpeak() {
  _rnSpeak = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee25(text, onEnd) {
    var tok, ended, done, t, cfg, r, url, chunks, cur, go, fired, f, _t7, _t8, _t9;
    return _regenerator().w(function (_context25) {
      while (1) switch (_context25.p = _context25.n) {
        case 0:
          rnStopSpeak();
          tok = __rnTok;
          ended = false;
          done = function done() {
            if (ended || tok !== __rnTok) return;
            ended = true;
            onEnd && onEnd();
          };
          t = rnSpeech(text).slice(0, 1600);
          cfg = RN_VOICE.v;
          if (t) {
            _context25.n = 1;
            break;
          }
          done();
          return _context25.a(2, 'none');
        case 1:
          if (!(cfg.key && cfg.voiceId && RN_PLAYER)) {
            _context25.n = 12;
            break;
          }
          _context25.p = 2;
          if (!SB_ON) {
            _context25.n = 4;
            break;
          }
          _context25.n = 3;
          return rnFn({
            acao: 'voz',
            texto: t,
            voice_id: cfg.voiceId,
            modelo: cfg.model || 'eleven_flash_v2_5'
          });
        case 3:
          _t7 = _context25.v;
          _context25.n = 6;
          break;
        case 4:
          _context25.n = 5;
          return fetch("https://api.elevenlabs.io/v1/text-to-speech/".concat(encodeURIComponent(cfg.voiceId), "?output_format=mp3_44100_128"), {
            method: 'POST',
            headers: {
              'xi-api-key': cfg.key,
              'Content-Type': 'application/json',
              Accept: 'audio/mpeg'
            },
            body: JSON.stringify(_objectSpread(_objectSpread({
              text: t,
              model_id: cfg.model || 'eleven_flash_v2_5'
            }, /v2_5/.test(cfg.model || 'eleven_flash_v2_5') ? {
              language_code: 'pt'
            } : {}), {}, {
              voice_settings: {
                stability: 0.45,
                similarity_boost: 0.8,
                style: 0.2
              }
            }))
          });
        case 5:
          _t7 = _context25.v;
        case 6:
          r = _t7;
          if (r.ok) {
            _context25.n = 7;
            break;
          }
          throw new Error('ElevenLabs ' + r.status);
        case 7:
          _t8 = URL;
          _context25.n = 8;
          return r.blob();
        case 8:
          url = _t8.createObjectURL.call(_t8, _context25.v);
          if (!(tok !== __rnTok)) {
            _context25.n = 9;
            break;
          }
          return _context25.a(2, 'eleven');
        case 9:
          RN_PLAYER.onended = function () {
            return done();
          };
          RN_PLAYER.onerror = function () {
            return done();
          };
          RN_PLAYER.src = url;
          _context25.n = 10;
          return RN_PLAYER.play();
        case 10:
          return _context25.a(2, 'eleven');
        case 11:
          _context25.p = 11;
          _t9 = _context25.v;
          if (!(tok !== __rnTok)) {
            _context25.n = 12;
            break;
          }
          return _context25.a(2, 'eleven');
        case 12:
          if (window.speechSynthesis) {
            _context25.n = 13;
            break;
          }
          done();
          return _context25.a(2, 'none');
        case 13:
          chunks = [];
          cur = '';
          (t.match(/[^.!?]+[.!?]*/g) || [t]).forEach(function (x) {
            if (cur && (cur + x).length > 200) {
              chunks.push(cur);
              cur = x;
            } else cur += x;
          });
          if (cur.trim()) chunks.push(cur);
          go = function go() {
            if (tok !== __rnTok) return;
            var v = rnPickVoice();
            chunks.forEach(function (c, i) {
              var u = new SpeechSynthesisUtterance(c.trim());
              if (v) u.voice = v;
              u.lang = 'pt-BR';
              u.rate = 1.06;
              u.pitch = 1.05;
              if (i === chunks.length - 1) u.onend = done;
              u.onerror = function (e) {
                if (i === chunks.length - 1 && e.error !== 'interrupted' && e.error !== 'canceled') done();
              };
              speechSynthesis.speak(u);
            });
            var _guard = function guard() {
              if (tok !== __rnTok || ended) return;
              if (speechSynthesis.speaking || speechSynthesis.pending) setTimeout(_guard, 700);else done();
            };
            setTimeout(_guard, Math.max(2500, t.length * 55));
          };
          if (!speechSynthesis.getVoices().length) {
            fired = false;
            f = function f() {
              if (fired) return;
              fired = true;
              go();
            };
            speechSynthesis.onvoiceschanged = function () {
              speechSynthesis.onvoiceschanged = null;
              f();
            };
            setTimeout(f, 500);
          } else go();
          return _context25.a(2, 'browser');
      }
    }, _callee25, null, [[2, 11]]);
  }));
  return _rnSpeak.apply(this, arguments);
}
var RN_SR = window.SpeechRecognition || window.webkitSpeechRecognition;
var RN_IS_MOBILE = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
var RN_BARGE = !!RN_SR && !RN_IS_MOBILE && /Chrome|Edg\//.test(navigator.userAgent);
var RN_MIC_MSG = {
  frame: RN_CAN_POP ? 'Dentro do link do Claude o sistema fica numa moldura que não recebe o microfone. Abra a conversa por voz em tela própria e fale com a Renata normalmente.' : 'Aqui a página não recebe acesso ao microfone. Abra o sistema pelo seu domínio para conversar por voz. Enquanto isso, dá para digitar.',
  dictation: 'O reconhecimento de voz do aparelho está desligado. No iPhone, ative em Ajustes, Geral, Teclado, Ativar Ditado. Depois toque em Tentar de novo.',
  denied: 'O microfone está bloqueado para este site. Toque no cadeado ao lado do endereço, permita o Microfone e depois toque em Tentar de novo.',
  nomic: 'Não encontrei nenhum microfone neste aparelho. Conecte um e toque em Tentar de novo.',
  busy: 'O microfone está em uso por outro app. Feche o outro app e toque em Tentar de novo.',
  https: 'O microfone só funciona em endereço seguro (https). Abra o sistema pelo endereço com https.',
  nostt: 'Este navegador não transforma voz em texto. Use o Chrome, o Edge ou o Safari, ou conecte a ElevenLabs nas conexões da Renata.',
  network: 'O reconhecimento de voz precisa de internet. Confira a conexão e toque em Tentar de novo.',
  eleven: 'Não consegui transcrever sua voz pela ElevenLabs. Confira a chave nas conexões da Renata e toque em Tentar de novo.'
};
var RN_RETRY = ['denied', 'nomic', 'busy', 'network', 'eleven', 'dictation'];
function rnMicCheck(_x3) {
  return _rnMicCheck.apply(this, arguments);
}
/* ---------- cérebro: Claude no link do Claude, chave própria no seu domínio, ou demonstração ---------- */
function _rnMicCheck() {
  _rnMicCheck = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee26(keep) {
    var fp, s, n, _t0, _t1;
    return _regenerator().w(function (_context26) {
      while (1) switch (_context26.p = _context26.n) {
        case 0:
          if (window.isSecureContext) {
            _context26.n = 1;
            break;
          }
          return _context26.a(2, {
            ok: false,
            why: 'https'
          });
        case 1:
          if (!(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia)) {
            _context26.n = 2;
            break;
          }
          return _context26.a(2, {
            ok: false,
            why: 'frame'
          });
        case 2:
          _context26.p = 2;
          fp = document.permissionsPolicy || document.featurePolicy;
          if (!(fp && fp.allowsFeature && !fp.allowsFeature('microphone'))) {
            _context26.n = 3;
            break;
          }
          return _context26.a(2, {
            ok: false,
            why: 'frame'
          });
        case 3:
          _context26.n = 5;
          break;
        case 4:
          _context26.p = 4;
          _t0 = _context26.v;
        case 5:
          _context26.p = 5;
          _context26.n = 6;
          return navigator.mediaDevices.getUserMedia({
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true
            }
          });
        case 6:
          s = _context26.v;
          if (!keep) s.getTracks().forEach(function (x) {
            return x.stop();
          });
          return _context26.a(2, {
            ok: true,
            stream: keep ? s : null
          });
        case 7:
          _context26.p = 7;
          _t1 = _context26.v;
          n = _t1 && _t1.name;
          return _context26.a(2, {
            ok: false,
            why: n === 'NotFoundError' || n === 'OverconstrainedError' ? 'nomic' : n === 'NotReadableError' || n === 'AbortError' ? 'busy' : n === 'SecurityError' ? 'frame' : 'denied'
          });
      }
    }, _callee26, null, [[5, 7], [2, 4]]);
  }));
  return _rnMicCheck.apply(this, arguments);
}
var __rnSample,
  __rnSampleOK = false;
var rnGetSample = function rnGetSample() {
  if (__rnSample !== undefined) return __rnSample;
  __rnSample = window.claude && window.claude.use ? window.claude.use('sample')["catch"](function () {
    return null;
  }) : Promise.resolve(null);
  return __rnSample;
};
var RN_MODE = makeStore('checking');
var __rnBridge = null,
  __rnBridgeOK = false,
  __rnPop = null,
  __rnPerm;
var rnRefreshMode = function rnRefreshMode() {
  RN_MODE.v = __rnSampleOK || __rnBridgeOK ? 'ia' : RN_AI.v.key ? 'api' : 'demo';
  RN_MODE.subs.forEach(function (f) {
    return f();
  });
};
/* aba própria (fora da moldura do Claude): ouve e fala aqui, e pede a resposta da IA para a aba do Claude que a abriu */
function rnBridge() {
  if (__rnBridge) return __rnBridge;
  __rnBridge = new Promise(function (res) {
    if (!RN_OPENER) return res(false);
    var done = false;
    var _on = function on(ev) {
      if (ev.source === RN_OPENER && ev.data && ev.data.type === 'rn-hello-ack') {
        done = true;
        window.removeEventListener('message', _on);
        res(!!ev.data.ia);
      }
    };
    window.addEventListener('message', _on);
    try {
      RN_OPENER.postMessage({
        type: 'rn-hello'
      }, '*');
    } catch (e) {
      res(false);
    }
    setTimeout(function () {
      if (!done) {
        window.removeEventListener('message', _on);
        res(false);
      }
    }, 2500);
  });
  return __rnBridge;
}
function rnAskBridge(history, _ref1) {
  var voice = _ref1.voice,
    onText = _ref1.onText,
    signal = _ref1.signal;
  return new Promise(function (res, rej) {
    var id = Math.random().toString(36).slice(2);
    var _on2 = function on(ev) {
      if (ev.source !== RN_OPENER || !ev.data || ev.data.id !== id) return;
      if (ev.data.type === 'rn-part') onText(ev.data.text);
      if (ev.data.type === 'rn-answer') {
        window.removeEventListener('message', _on2);
        if (ev.data.error) return rej({
          code: 'bridge'
        });
        if (ev.data.pending) rnSetPending(ev.data.pending);
        res({
          text: ev.data.text,
          mode: 'ia',
          pending: ev.data.pending || null,
          resolved: ev.data.resolved || null
        });
      }
    };
    window.addEventListener('message', _on2);
    if (signal) signal.addEventListener('abort', function () {
      window.removeEventListener('message', _on2);
      rej({
        code: 'cancelled'
      });
    });
    try {
      RN_OPENER.postMessage({
        type: 'rn-ask',
        id: id,
        voice: !!voice,
        history: history.slice(-12).map(function (m) {
          return {
            role: m.role,
            content: m.content
          };
        })
      }, '*');
    } catch (e) {
      window.removeEventListener('message', _on2);
      rej({
        code: 'bridge'
      });
    }
  });
}
window.addEventListener('message', /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(ev) {
    var d, reply, s, hist, r, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          d = ev.data;
          if (!(!__rnPop || ev.source !== __rnPop || !d || _typeof(d) !== 'object')) {
            _context.n = 1;
            break;
          }
          return _context.a(2);
        case 1:
          reply = function reply(o) {
            try {
              ev.source.postMessage(o, '*');
            } catch (e) {}
          };
          if (!(d.type === 'rn-hello')) {
            _context.n = 3;
            break;
          }
          _context.n = 2;
          return rnGetSample();
        case 2:
          s = _context.v;
          reply({
            type: 'rn-hello-ack',
            ia: !!s
          });
          _context.n = 8;
          break;
        case 3:
          if (!(d.type === 'rn-clear')) {
            _context.n = 4;
            break;
          }
          rnSetPending(null);
          _context.n = 8;
          break;
        case 4:
          if (!(d.type === 'rn-ask' && Array.isArray(d.history))) {
            _context.n = 8;
            break;
          }
          hist = d.history.filter(function (m) {
            return m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content;
          }).slice(-12);
          if (!(!hist.length || hist[hist.length - 1].role !== 'user')) {
            _context.n = 5;
            break;
          }
          return _context.a(2, reply({
            type: 'rn-answer',
            id: d.id,
            error: true
          }));
        case 5:
          _context.p = 5;
          _context.n = 6;
          return rnAnswer(hist, {
            voice: !!d.voice,
            onText: function onText(t) {
              return reply({
                type: 'rn-part',
                id: d.id,
                text: t
              });
            }
          });
        case 6:
          r = _context.v;
          reply({
            type: 'rn-answer',
            id: d.id,
            text: r.text,
            pending: r.pending || null,
            resolved: r.resolved || null
          });
          _context.n = 8;
          break;
        case 7:
          _context.p = 7;
          _t = _context.v;
          reply({
            type: 'rn-answer',
            id: d.id,
            error: true
          });
        case 8:
          return _context.a(2);
      }
    }, _callee, null, [[5, 7]]);
  }));
  return function (_x4) {
    return _ref10.apply(this, arguments);
  };
}());
function rnPopOut() {
  var w = null;
  try {
    w = window.open(location.href.split('#')[0] + '#renata-voz', '_blank');
  } catch (e) {}
  if (w) __rnPop = w;
  return !!w;
}
var rnPerm = function rnPerm() {
  return __rnPerm || (__rnPerm = window.claude && window.claude.use ? window.claude.use('permissions')["catch"](function () {
    return null;
  }) : Promise.resolve(null));
};
function rnSampleState() {
  return _rnSampleState.apply(this, arguments);
}
function _rnSampleState() {
  _rnSampleState = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee27() {
    var s, p, _t10;
    return _regenerator().w(function (_context27) {
      while (1) switch (_context27.p = _context27.n) {
        case 0:
          _context27.n = 1;
          return rnGetSample();
        case 1:
          s = _context27.v;
          if (s) {
            _context27.n = 2;
            break;
          }
          return _context27.a(2, 'none');
        case 2:
          _context27.n = 3;
          return rnPerm();
        case 3:
          p = _context27.v;
          if (p) {
            _context27.n = 4;
            break;
          }
          return _context27.a(2, 'granted');
        case 4:
          _context27.p = 4;
          _context27.n = 5;
          return p.state('sample');
        case 5:
          return _context27.a(2, _context27.v);
        case 6:
          _context27.p = 6;
          _t10 = _context27.v;
          return _context27.a(2, 'granted');
      }
    }, _callee27, null, [[4, 6]]);
  }));
  return _rnSampleState.apply(this, arguments);
}
rnGetSample().then(function (s) {
  __rnSampleOK = !!s;
  rnRefreshMode();
  if (!s && RN_OPENER) rnBridge().then(function (ok) {
    __rnBridgeOK = ok;
    rnRefreshMode();
  });
});
var RN_TOOL_LABEL = {
  propor_lancamento_financeiro: 'Preparando o lançamento',
  propor_movimentacao_estoque: 'Preparando a movimentação',
  financeiro_periodo: 'Consultando o financeiro',
  agenda_do_dia: 'Abrindo a agenda',
  dados_paciente: 'Lendo o prontuário',
  lancamentos: 'Buscando lançamentos',
  abrir_tela: 'Abrindo a tela'
};
var RN_MODELS = {
  chat: ['claude-sonnet-5-5', 'claude-sonnet-4-5'],
  voz: ['claude-haiku-4-5-20251001', 'claude-sonnet-5-5']
};
var rnApiHeaders = function rnApiHeaders(key) {
  return {
    'x-api-key': key,
    'anthropic-version': '2023-06-01',
    'content-type': 'application/json',
    'anthropic-dangerous-direct-browser-access': 'true'
  };
};
var rnApiWhy = function rnApiWhy(st) {
  return st === 412 ? 'a chave da IA ainda não foi configurada' : st === 401 ? 'chave inválida' : st === 403 ? 'chave sem permissão' : st === 429 ? 'limite de uso atingido' : st === 529 || st === 503 ? 'IA sobrecarregada no momento' : st ? 'erro ' + st : 'sem acesso à internet ou à API';
};
function rnClaudeApi(_x5, _x6) {
  return _rnClaudeApi.apply(this, arguments);
}
function _rnClaudeApi() {
  _rnClaudeApi = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee29(history, _ref11) {
    var voice, onText, signal, onTool, key, models, mi, system, tools, msgs, all, round, res, reader, dec, buf, stop, blocks, base, roundText, _yield$reader$read, value, _done, k, ev, line, d, content, outs, _t13, _t14, _t15, _t16;
    return _regenerator().w(function (_context29) {
      while (1) switch (_context29.p = _context29.n) {
        case 0:
          voice = _ref11.voice, onText = _ref11.onText, signal = _ref11.signal, onTool = _ref11.onTool;
          key = RN_AI.v.key;
          models = voice ? RN_MODELS.voz : RN_MODELS.chat;
          mi = 0;
          system = [{
            type: 'text',
            text: RENATA_RULES(voice) + rnSnapshot(),
            cache_control: {
              type: 'ephemeral'
            }
          }];
          tools = RENATA_TOOLS.map(function (t) {
            return {
              name: t.name,
              description: t.description,
              input_schema: t.inputSchema
            };
          });
          msgs = [];
          history.slice(-14).forEach(function (m) {
            if (!msgs.length && m.role !== 'user') return;
            var last = msgs[msgs.length - 1];
            if (last && last.role === m.role) last.content += '\n\n' + m.content;else msgs.push({
              role: m.role,
              content: m.content
            });
          });
          all = '';
          round = 0;
        case 1:
          if (!(round < 6)) {
            _context29.n = 33;
            break;
          }
          res = void 0;
          _context29.p = 2;
          if (!SB_ON) {
            _context29.n = 4;
            break;
          }
          _context29.n = 3;
          return rnFn({
            acao: 'chat',
            primeira: round === 0,
            payload: {
              model: models[mi],
              max_tokens: voice ? 450 : 1400,
              system: system,
              tools: tools,
              messages: msgs,
              stream: true
            }
          }, signal);
        case 3:
          _t13 = _context29.v;
          _context29.n = 6;
          break;
        case 4:
          _context29.n = 5;
          return fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            signal: signal,
            headers: rnApiHeaders(key),
            body: JSON.stringify({
              model: models[mi],
              max_tokens: voice ? 450 : 1400,
              system: system,
              tools: tools,
              messages: msgs,
              stream: true
            })
          });
        case 5:
          _t13 = _context29.v;
        case 6:
          res = _t13;
          _context29.n = 9;
          break;
        case 7:
          _context29.p = 7;
          _t14 = _context29.v;
          if (!(_t14 && _t14.name === 'AbortError')) {
            _context29.n = 8;
            break;
          }
          throw {
            code: 'cancelled',
            text: all
          };
        case 8:
          throw {
            code: 'api',
            why: rnApiWhy(0),
            text: all
          };
        case 9:
          if (res.ok) {
            _context29.n = 11;
            break;
          }
          if (!(res.status === 404 && mi < models.length - 1)) {
            _context29.n = 10;
            break;
          }
          mi++;
          round--;
          return _context29.a(3, 32);
        case 10:
          throw {
            code: 'api',
            why: rnApiWhy(res.status),
            text: all
          };
        case 11:
          reader = res.body.getReader(), dec = new TextDecoder();
          buf = '', stop = null;
          blocks = [];
          base = all ? all + '\n\n' : '';
          roundText = '';
          _context29.p = 12;
        case 13:
          _context29.n = 14;
          return reader.read();
        case 14:
          _yield$reader$read = _context29.v;
          value = _yield$reader$read.value;
          _done = _yield$reader$read.done;
          if (!_done) {
            _context29.n = 15;
            break;
          }
          return _context29.a(3, 26);
        case 15:
          buf += dec.decode(value, {
            stream: true
          });
          k = void 0;
        case 16:
          if (!((k = buf.indexOf('\n\n')) >= 0)) {
            _context29.n = 25;
            break;
          }
          ev = buf.slice(0, k);
          buf = buf.slice(k + 2);
          line = ev.split('\n').find(function (l) {
            return l.startsWith('data:');
          });
          if (line) {
            _context29.n = 17;
            break;
          }
          return _context29.a(3, 16);
        case 17:
          d = void 0;
          _context29.p = 18;
          d = JSON.parse(line.slice(5).trim());
          _context29.n = 20;
          break;
        case 19:
          _context29.p = 19;
          _t15 = _context29.v;
          return _context29.a(3, 16);
        case 20:
          if (!(d.type === 'content_block_start')) {
            _context29.n = 21;
            break;
          }
          blocks[d.index] = _objectSpread(_objectSpread({}, d.content_block), {}, {
            text: d.content_block.text || '',
            json: ''
          });
          if (d.content_block.type === 'tool_use') onTool && onTool(RN_TOOL_LABEL[d.content_block.name] || 'Consultando');
          _context29.n = 24;
          break;
        case 21:
          if (!(d.type === 'content_block_delta' && blocks[d.index])) {
            _context29.n = 22;
            break;
          }
          if (d.delta.type === 'text_delta') {
            blocks[d.index].text += d.delta.text;
            roundText += d.delta.text;
            onText(base + roundText);
          } else if (d.delta.type === 'input_json_delta') blocks[d.index].json += d.delta.partial_json;
          _context29.n = 24;
          break;
        case 22:
          if (!(d.type === 'message_delta')) {
            _context29.n = 23;
            break;
          }
          stop = d.delta && d.delta.stop_reason;
          _context29.n = 24;
          break;
        case 23:
          if (!(d.type === 'error')) {
            _context29.n = 24;
            break;
          }
          throw {
            code: 'api',
            why: d.error && d.error.type === 'overloaded_error' ? rnApiWhy(529) : 'erro na resposta',
            text: base + roundText
          };
        case 24:
          _context29.n = 16;
          break;
        case 25:
          _context29.n = 13;
          break;
        case 26:
          _context29.n = 29;
          break;
        case 27:
          _context29.p = 27;
          _t16 = _context29.v;
          if (!(_t16 && _t16.name === 'AbortError')) {
            _context29.n = 28;
            break;
          }
          throw {
            code: 'cancelled',
            text: base + roundText
          };
        case 28:
          throw _t16.code ? _t16 : {
            code: 'api',
            why: rnApiWhy(0),
            text: base + roundText
          };
        case 29:
          if (roundText.trim()) all = base + roundText;
          content = blocks.filter(Boolean).map(function (b) {
            return b.type === 'text' ? {
              type: 'text',
              text: b.text
            } : b.type === 'tool_use' ? {
              type: 'tool_use',
              id: b.id,
              name: b.name,
              input: function () {
                try {
                  return JSON.parse(b.json || '{}');
                } catch (e) {
                  return {};
                }
              }()
            } : null;
          }).filter(function (b) {
            return b && (b.type !== 'text' || b.text.trim());
          });
          if (!(stop !== 'tool_use')) {
            _context29.n = 30;
            break;
          }
          return _context29.a(2, all);
        case 30:
          msgs.push({
            role: 'assistant',
            content: content
          });
          _context29.n = 31;
          return Promise.all(content.filter(function (b) {
            return b.type === 'tool_use';
          }).map(/*#__PURE__*/function () {
            var _ref52 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee28(b) {
              var t, out, _t11, _t12;
              return _regenerator().w(function (_context28) {
                while (1) switch (_context28.p = _context28.n) {
                  case 0:
                    t = RENATA_TOOLS.find(function (x) {
                      return x.name === b.name;
                    });
                    _context28.p = 1;
                    if (!t) {
                      _context28.n = 3;
                      break;
                    }
                    _context28.n = 2;
                    return t.execute(b.input);
                  case 2:
                    _t11 = _context28.v;
                    _context28.n = 4;
                    break;
                  case 3:
                    _t11 = {
                      erro: 'ferramenta desconhecida'
                    };
                  case 4:
                    out = _t11;
                    _context28.n = 6;
                    break;
                  case 5:
                    _context28.p = 5;
                    _t12 = _context28.v;
                    out = {
                      erro: String(_t12 && _t12.message || _t12)
                    };
                  case 6:
                    return _context28.a(2, {
                      type: 'tool_result',
                      tool_use_id: b.id,
                      content: JSON.stringify(out).slice(0, 24000)
                    });
                }
              }, _callee28, null, [[1, 5]]);
            }));
            return function (_x30) {
              return _ref52.apply(this, arguments);
            };
          }()));
        case 31:
          outs = _context29.v;
          msgs.push({
            role: 'user',
            content: outs
          });
        case 32:
          round++;
          _context29.n = 1;
          break;
        case 33:
          return _context29.a(2, all);
      }
    }, _callee29, null, [[18, 19], [12, 27], [2, 7]]);
  }));
  return _rnClaudeApi.apply(this, arguments);
}
function rnTestApi(_x7) {
  return _rnTestApi.apply(this, arguments);
}
function _rnTestApi() {
  _rnTestApi = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee30(key) {
    var _iterator6, _step6, m, r, _t17, _t18;
    return _regenerator().w(function (_context30) {
      while (1) switch (_context30.p = _context30.n) {
        case 0:
          if (!SB_ON) {
            _context30.n = 1;
            break;
          }
          return _context30.a(2, rnTestarServidor(key));
        case 1:
          _iterator6 = _createForOfIteratorHelper(RN_MODELS.voz);
          _context30.p = 2;
          _iterator6.s();
        case 3:
          if ((_step6 = _iterator6.n()).done) {
            _context30.n = 10;
            break;
          }
          m = _step6.value;
          _context30.p = 4;
          _context30.n = 5;
          return fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: rnApiHeaders(key),
            body: JSON.stringify({
              model: m,
              max_tokens: 8,
              messages: [{
                role: 'user',
                content: 'Responda apenas: ok'
              }]
            })
          });
        case 5:
          r = _context30.v;
          if (!r.ok) {
            _context30.n = 6;
            break;
          }
          return _context30.a(2, {
            ok: true
          });
        case 6:
          if (!(r.status !== 404)) {
            _context30.n = 7;
            break;
          }
          return _context30.a(2, {
            ok: false,
            why: rnApiWhy(r.status)
          });
        case 7:
          _context30.n = 9;
          break;
        case 8:
          _context30.p = 8;
          _t17 = _context30.v;
          return _context30.a(2, {
            ok: false,
            why: rnApiWhy(0)
          });
        case 9:
          _context30.n = 3;
          break;
        case 10:
          _context30.n = 12;
          break;
        case 11:
          _context30.p = 11;
          _t18 = _context30.v;
          _iterator6.e(_t18);
        case 12:
          _context30.p = 12;
          _iterator6.f();
          return _context30.f(12);
        case 13:
          return _context30.a(2, {
            ok: false,
            why: 'modelo indisponível'
          });
      }
    }, _callee30, null, [[4, 8], [2, 11, 12, 13]]);
  }));
  return _rnTestApi.apply(this, arguments);
}
function rnStream(_x8, _x9, _x0) {
  return _rnStream.apply(this, arguments);
}
function _rnStream() {
  _rnStream = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee31(t, onText, signal) {
    var parts, out, i;
    return _regenerator().w(function (_context31) {
      while (1) switch (_context31.n) {
        case 0:
          parts = t.split(/(\s+)/);
          out = '';
          i = 0;
        case 1:
          if (!(i < parts.length)) {
            _context31.n = 4;
            break;
          }
          if (!(signal && signal.aborted)) {
            _context31.n = 2;
            break;
          }
          throw {
            code: 'cancelled',
            text: out
          };
        case 2:
          out += parts[i];
          if (!(i % 4 === 3)) {
            _context31.n = 3;
            break;
          }
          onText(out);
          _context31.n = 3;
          return new Promise(function (r) {
            return setTimeout(r, 30);
          });
        case 3:
          i++;
          _context31.n = 1;
          break;
        case 4:
          onText(t);
        case 5:
          return _context31.a(2);
      }
    }, _callee31);
  }));
  return _rnStream.apply(this, arguments);
}
function rnAnswer(_x1, _x10) {
  return _rnAnswer.apply(this, arguments);
}
function _rnAnswer() {
  _rnAnswer = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee32(history, opts) {
    var question, a, _t19, _t20, before, r;
    return _regenerator().w(function (_context32) {
      while (1) switch (_context32.n) {
        case 0:
          question = history[history.length - 1].content;
          a = RN_PENDING.v;
          if (!(a && rnIsYes(question))) {
            _context32.n = 2;
            break;
          }
          rnSetPending(null);
          _context32.n = 1;
          return rnApply(a);
        case 1:
          _t19 = _context32.v;
          if (RN_OPENER) {
            try {
              RN_OPENER.postMessage({
                type: 'rn-clear'
              }, '*');
            } catch (e) {}
          }
          opts.onText(_t19);
          return _context32.a(2, {
            text: _t19,
            mode: 'acao',
            resolved: {
              id: a.id,
              state: a.falhou ? 'erro' : 'ok'
            }
          });
        case 2:
          if (!(a && rnIsNo(question))) {
            _context32.n = 3;
            break;
          }
          if (SB_ON) rnRegistrarAcao(a, 'cancelado')["catch"](function () {});
          rnSetPending(null);
          _t20 = a.kind === 'cmd' ? 'Tudo bem, deixei como estava. Se quiser, me fala de novo do jeito certo.' : 'Tudo bem, não lancei nada. Se quiser, me fala o lançamento do jeito certo.';
          opts.onText(_t20);
          return _context32.a(2, {
            text: _t20,
            mode: 'acao',
            resolved: {
              id: a.id,
              state: 'cancel'
            }
          });
        case 3:
          before = RN_PENDING.v;
          _context32.n = 4;
          return rnAnswerCore(history, opts);
        case 4:
          r = _context32.v;
          if (RN_PENDING.v && RN_PENDING.v !== before && !r.pending) r.pending = RN_PENDING.v;
          return _context32.a(2, r);
      }
    }, _callee32);
  }));
  return _rnAnswer.apply(this, arguments);
}
function rnAnswerCore(_x11, _x12) {
  return _rnAnswerCore.apply(this, arguments);
}
function _rnAnswerCore() {
  _rnAnswerCore = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee34(history, _ref12) {
    var voice, _onText, signal, onTool, sample, question, demo, _t21, turns, tools, lim, la, res, keep, msg, _t22, _t23, _t24, _t25, _t26;
    return _regenerator().w(function (_context34) {
      while (1) switch (_context34.p = _context34.n) {
        case 0:
          voice = _ref12.voice, _onText = _ref12.onText, signal = _ref12.signal, onTool = _ref12.onTool;
          if (!SB_ON) {
            _context34.n = 1;
            break;
          }
          _context34.n = 1;
          return rnPrepararDados();
        case 1:
          _context34.n = 2;
          return rnGetSample();
        case 2:
          sample = _context34.v;
          question = history[history.length - 1].content;
          demo = /*#__PURE__*/function () {
            var _ref53 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee33(prefix) {
              var la, t;
              return _regenerator().w(function (_context33) {
                while (1) switch (_context33.n) {
                  case 0:
                    _context33.n = 1;
                    return new Promise(function (r) {
                      return setTimeout(r, prefix ? 0 : voice ? 250 : 450);
                    });
                  case 1:
                    la = rnLocalAction(question);
                    t = (prefix || '') + (la ? la.text : renataLocal(question));
                    if (!voice) {
                      _context33.n = 2;
                      break;
                    }
                    _onText(t);
                    _context33.n = 3;
                    break;
                  case 2:
                    _context33.n = 3;
                    return rnStream(t, _onText, signal);
                  case 3:
                    return _context33.a(2, {
                      text: t,
                      mode: 'demo'
                    });
                }
              }, _callee33);
            }));
            return function demo(_x31) {
              return _ref53.apply(this, arguments);
            };
          }();
          if (sample) {
            _context34.n = 13;
            break;
          }
          _t22 = RN_OPENER;
          if (!_t22) {
            _context34.n = 4;
            break;
          }
          _context34.n = 3;
          return rnBridge();
        case 3:
          _t22 = _context34.v;
        case 4:
          if (!_t22) {
            _context34.n = 8;
            break;
          }
          _context34.p = 5;
          _context34.n = 6;
          return rnAskBridge(history, {
            voice: voice,
            onText: _onText,
            signal: signal
          });
        case 6:
          return _context34.a(2, _context34.v);
        case 7:
          _context34.p = 7;
          _t23 = _context34.v;
          if (!(_t23 && _t23.code === 'cancelled')) {
            _context34.n = 8;
            break;
          }
          throw _t23;
        case 8:
          if (RN_AI.v.key) {
            _context34.n = 9;
            break;
          }
          return _context34.a(2, SB_ON ? rnSemIA(question, voice, _onText, signal) : demo());
        case 9:
          _context34.p = 9;
          _context34.n = 10;
          return rnClaudeApi(history, {
            voice: voice,
            onText: _onText,
            signal: signal,
            onTool: onTool
          });
        case 10:
          _t21 = _context34.v;
          return _context34.a(2, {
            text: _t21,
            mode: 'api'
          });
        case 11:
          _context34.p = 11;
          _t24 = _context34.v;
          if (!(_t24 && _t24.code === 'cancelled')) {
            _context34.n = 12;
            break;
          }
          throw _t24;
        case 12:
          return _context34.a(2, SB_ON ? rnSemIA(question, voice, _onText, signal, _t24.why) : demo("A conex\xE3o com a IA falhou (".concat(_t24.why || 'erro', "). Respondi pelo modo demonstra\xE7\xE3o:\n\n")));
        case 13:
          turns = [{
            role: 'user',
            content: RENATA_RULES(voice) + rnSnapshot()
          }].concat(_toConsumableArray(history.slice(-12).map(function (m) {
            return {
              role: m.role,
              content: m.content
            };
          })));
          _context34.p = 14;
          _context34.n = 15;
          return sample.limits();
        case 15:
          lim = _context34.v;
          if (lim && lim.tools) tools = RENATA_TOOLS.map(function (t) {
            return _objectSpread(_objectSpread({}, t), {}, {
              execute: function execute(i) {
                onTool && onTool(RN_TOOL_LABEL[t.name] || 'Consultando');
                return t.execute(i);
              }
            });
          });
          _context34.n = 17;
          break;
        case 16:
          _context34.p = 16;
          _t25 = _context34.v;
        case 17:
          if (tools) {
            _context34.n = 18;
            break;
          }
          la = rnLocalAction(question);
          if (!la) {
            _context34.n = 18;
            break;
          }
          _onText(la.text);
          return _context34.a(2, {
            text: la.text,
            mode: 'ia'
          });
        case 18:
          _context34.p = 18;
          _context34.n = 19;
          return sample(turns, _objectSpread({
            onText: function onText(_ref54) {
              var text = _ref54.text;
              return _onText(text);
            },
            signal: signal,
            modelTier: voice ? 'quick' : 'default'
          }, tools ? {
            tools: tools
          } : {
            cache: false
          }));
        case 19:
          res = _context34.v;
          return _context34.a(2, {
            text: res.text,
            mode: 'ia'
          });
        case 20:
          _context34.p = 20;
          _t26 = _context34.v;
          if (!(_t26 && _t26.code === 'cancelled')) {
            _context34.n = 21;
            break;
          }
          throw _t26;
        case 21:
          if (!(_t26 && ['not_granted', 'sampling_disabled', 'not_declared', 'capability_disabled', 'capability_removed', 'tools_unavailable'].includes(_t26.code))) {
            _context34.n = 22;
            break;
          }
          __rnSampleOK = false;
          __rnSample = Promise.resolve(null);
          rnRefreshMode();
          return _context34.a(2, RN_AI.v.key ? rnAnswer(history, {
            voice: voice,
            onText: _onText,
            signal: signal,
            onTool: onTool
          }) : demo());
        case 22:
          keep = _t26 && _t26.text ? _t26.text + '\n\n' : '';
          msg = _t26 && _t26.code === 'rate_limited' ? 'Muitas perguntas seguidas. Espere um pouco e tente de novo.' : 'Não consegui terminar a resposta agora. Tente de novo.';
          _onText(keep + msg);
          return _context34.a(2, {
            text: keep + msg,
            mode: 'erro'
          });
      }
    }, _callee34, null, [[18, 20], [14, 16], [9, 11], [5, 7]]);
  }));
  return _rnAnswerCore.apply(this, arguments);
}
var RN_SUGS = [['calendar-days', 'Qual é a minha agenda de hoje?'], ['banknote', 'Quanto faturei nos últimos 30 dias?'], ['package', 'O que está em falta no estoque?'], ['user-round', 'Como foi o atendimento da Mariana Alves?'], ['triangle-alert', 'Qual a taxa de inadimplência?'], ['chart-column', 'Qual canal traz mais leads?']];

/* ---------- conexões da Renata ---------- */
function RenataSettings(_ref13) {
  var onClose = _ref13.onClose;
  var _useStore3 = useStore(RN_VOICE),
    _useStore4 = _slicedToArray(_useStore3, 2),
    cfg = _useStore4[0],
    setCfg = _useStore4[1];
  var _useStore5 = useStore(RN_AI),
    _useStore6 = _slicedToArray(_useStore5, 2),
    ai = _useStore6[0],
    setAi = _useStore6[1];
  var _useStore7 = useStore(RN_MODE),
    _useStore8 = _slicedToArray(_useStore7, 1),
    mode = _useStore8[0];
  var _React$useState = React.useState(cfg),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    f = _React$useState2[0],
    setF = _React$useState2[1];
  var _React$useState3 = React.useState(ai.key || ''),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    k = _React$useState4[0],
    setK = _React$useState4[1];
  var _React$useState5 = React.useState(null),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    test = _React$useState6[0],
    setTest = _React$useState6[1];
  var _React$useState7 = React.useState(null),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    aiTest = _React$useState8[0],
    setAiTest = _React$useState8[1];
  var save = function save() {
    if (SB_ON) {
      rnSalvarConexoes(k, f).then(onClose, function () {});
      return;
    }
    var fv = _objectSpread(_objectSpread({}, f), {}, {
      voiceId: f.voiceId || RN_VOZ_OFICIAL
    });
    setCfg(fv);
    lsSet('salute-kit:renata-voz', fv);
    var nk = {
      key: k.trim()
    };
    setAi(nk);
    lsSet('salute-kit:renata-ia', nk);
    rnRefreshMode();
    onClose();
  };
  var inp = {
    height: 42,
    borderRadius: 12,
    border: '1.5px solid rgba(214,226,242,.95)',
    background: '#fff',
    padding: '0 12px',
    fontFamily: 'inherit',
    fontSize: 14,
    color: 'var(--text-strong)',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box'
  };
  var lab = {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    fontSize: 13,
    color: 'var(--text-muted)'
  };
  var sec = {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    padding: 14,
    borderRadius: 18,
    background: 'rgba(255,255,255,.6)',
    border: '1.5px solid rgba(255,255,255,.95)'
  };
  var btn2 = {
    height: 38,
    padding: '0 14px',
    borderRadius: 999,
    border: '1.5px solid rgba(214,226,242,.95)',
    background: '#fff',
    fontFamily: 'inherit',
    fontSize: 13.5,
    fontWeight: 500,
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    color: 'var(--text-strong)'
  };
  var note = {
    fontSize: 12,
    color: 'var(--text-muted)',
    lineHeight: 1.5
  };
  var head = function head(icon, t, s) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 32,
        height: 32,
        borderRadius: 10,
        background: 'rgba(31,94,255,.08)',
        color: '#1F5EFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(RIcon, {
      name: icon,
      size: 17
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("b", {
      style: {
        display: 'block',
        fontSize: 14.5,
        color: 'var(--text-strong)'
      }
    }, t), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)'
      }
    }, s)));
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 5,
      background: 'rgba(14,35,80,.25)',
      backdropFilter: 'blur(3px)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      padding: 16,
      overflowY: 'auto'
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    style: {
      width: 'min(480px,100%)',
      marginTop: 24,
      borderRadius: 24,
      background: 'linear-gradient(180deg,#F5F9FF,#EAF2FD)',
      boxShadow: '0 30px 60px -30px rgba(23,73,170,.6)',
      padding: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontSize: 18,
      color: 'var(--text-strong)'
    }
  }, "Conex\xF5es da Renata"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "rn-act",
    "aria-label": "Fechar conex\xF5es",
    onClick: onClose
  }, /*#__PURE__*/React.createElement(RIcon, {
    name: "x",
    size: 18
  }))), /*#__PURE__*/React.createElement("div", {
    style: sec
  }, head('brain', 'Inteligência', mode === 'ia' ? 'Conectada pelo Claude neste link' : k.trim() ? 'Claude conectado com a sua chave' : 'Modo demonstração, sem IA conectada'), mode === 'ia' ? /*#__PURE__*/React.createElement("span", {
    style: note
  }, "Aqui dentro do Claude a Renata j\xE1 usa IA de verdade. A chave abaixo \xE9 para o sistema no seu dom\xEDnio.") : null, /*#__PURE__*/React.createElement("label", {
    style: lab
  }, "Chave da API do Claude", /*#__PURE__*/React.createElement("input", {
    type: "password",
    style: inp,
    value: k,
    onChange: function onChange(e) {
      setK(e.target.value);
      setAiTest(null);
    },
    placeholder: "Cole a chave criada no Anthropic Console",
    autoComplete: "off"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: btn2,
    disabled: !k.trim(),
    onClick: /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var r;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            setAiTest('Testando...');
            _context2.n = 1;
            return rnTestApi(k.trim());
          case 1:
            r = _context2.v;
            setAiTest(r.ok ? 'Conectada. A Renata já responde com IA.' : 'Não conectou: ' + r.why + '.');
          case 2:
            return _context2.a(2);
        }
      }, _callee2);
    }))
  }, /*#__PURE__*/React.createElement(RIcon, {
    name: "plug",
    size: 14
  }), "Testar conex\xE3o"), aiTest ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: /^Conectada/.test(aiTest) ? '#1E9E57' : 'var(--text-muted)'
    }
  }, aiTest) : null), /*#__PURE__*/React.createElement("span", {
    style: note
  }, SB_ON ? 'Fica guardada no cofre do servidor. Depois de salva, ninguém vê a chave inteira.' : 'Fica salva só neste aparelho, para teste. Na versão final a chave fica no servidor.')), /*#__PURE__*/React.createElement("div", {
    style: sec
  }, head('audio-lines', 'Voz da Renata', f.key ? 'ElevenLabs conectada, voz oficial da Renata' : 'Falta a chave da ElevenLabs para usar a voz oficial'), /*#__PURE__*/React.createElement("label", {
    style: lab
  }, "ID da voz (Voice ID)", /*#__PURE__*/React.createElement("input", {
    style: inp,
    value: f.voiceId,
    onChange: function onChange(e) {
      return setF(_objectSpread(_objectSpread({}, f), {}, {
        voiceId: e.target.value.trim()
      }));
    },
    placeholder: RN_VOZ_OFICIAL
  })), /*#__PURE__*/React.createElement("label", {
    style: lab
  }, "Chave da API ElevenLabs", /*#__PURE__*/React.createElement("input", {
    type: "password",
    style: inp,
    value: f.key,
    onChange: function onChange(e) {
      return setF(_objectSpread(_objectSpread({}, f), {}, {
        key: e.target.value.trim()
      }));
    },
    placeholder: "Cole a chave da ElevenLabs",
    autoComplete: "off"
  })), /*#__PURE__*/React.createElement("label", {
    style: lab
  }, "Modelo", /*#__PURE__*/React.createElement("select", {
    style: inp,
    value: f.model,
    onChange: function onChange(e) {
      return setF(_objectSpread(_objectSpread({}, f), {}, {
        model: e.target.value
      }));
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "eleven_flash_v2_5"
  }, "Flash v2.5, mais r\xE1pido"), /*#__PURE__*/React.createElement("option", {
    value: "eleven_multilingual_v2"
  }, "Multilingual v2, mais expressivo"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: btn2,
    onClick: /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var prev, how;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            rnUnlockAudio();
            prev = RN_VOICE.v;
            RN_VOICE.v = _objectSpread(_objectSpread({}, f), {}, {
              voiceId: f.voiceId || RN_VOZ_OFICIAL
            });
            setTest('Tocando...');
            _context3.n = 1;
            return rnSpeak('Oi, ' + (SB_ON ? rnPrimeiroNome() : 'Camila') + '! Eu sou a Renata. Pode me perguntar qualquer coisa da clínica.');
          case 1:
            how = _context3.v;
            RN_VOICE.v = prev;
            setTest(how === 'eleven' ? 'Tocando a voz oficial pela ElevenLabs.' : f.key ? 'A ElevenLabs não respondeu, toquei a voz de reserva do aparelho.' : 'Sem a chave, toquei a voz de reserva do aparelho.');
          case 2:
            return _context3.a(2);
        }
      }, _callee3);
    }))
  }, /*#__PURE__*/React.createElement(RIcon, {
    name: "play",
    size: 14
  }), "Testar voz"), test ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: /oficial/.test(test) ? '#1E9E57' : 'var(--text-muted)'
    }
  }, test) : null), /*#__PURE__*/React.createElement("span", {
    style: note
  }, "A Renata sempre fala com esta voz. A voz do aparelho s\xF3 entra como reserva quando a ElevenLabs n\xE3o est\xE1 acess\xEDvel.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: save,
    style: {
      height: 42,
      padding: '0 22px',
      borderRadius: 999,
      border: 0,
      background: 'linear-gradient(90deg,#0B3FD9,#1F7BFF)',
      color: '#fff',
      fontFamily: 'inherit',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'pointer'
    }
  }, "Salvar"))));
}

/* ---------- conversa por voz (estilo ChatGPT) ---------- */
var RN_YES = /^(sim|pode|continua|continue|quero|claro|isso|manda|vai|le|leia|por favor|uhum|aham|bora)\b/;
function RenataVoiceMode(_ref16) {
  var onClose = _ref16.onClose,
    ask = _ref16.ask,
    say = _ref16.say,
    mobile = _ref16.mobile,
    needTap = _ref16.needTap;
  var _React$useState9 = React.useState(needTap ? 'tap' : 'starting'),
    _React$useState0 = _slicedToArray(_React$useState9, 2),
    state = _React$useState0[0],
    setState = _React$useState0[1];
  var _React$useState1 = React.useState(null),
    _React$useState10 = _slicedToArray(_React$useState1, 2),
    iaState = _React$useState10[0],
    setIaState = _React$useState10[1];
  var _React$useState11 = React.useState(null),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    pop = _React$useState12[0],
    setPop = _React$useState12[1];
  var _React$useState13 = React.useState(''),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    heard = _React$useState14[0],
    setHeard = _React$useState14[1];
  var _React$useState15 = React.useState(''),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    said = _React$useState16[0],
    setSaid = _React$useState16[1];
  var _React$useState17 = React.useState(false),
    _React$useState18 = _slicedToArray(_React$useState17, 2),
    muted = _React$useState18[0],
    setMuted = _React$useState18[1];
  var _React$useState19 = React.useState(null),
    _React$useState20 = _slicedToArray(_React$useState19, 2),
    err = _React$useState20[0],
    setErr = _React$useState20[1];
  var R = React.useRef({
    alive: true,
    muted: false,
    err: false,
    rec: null,
    barge: null,
    rest: null,
    stream: null,
    actx: null,
    an: null,
    tok: 0,
    silT: null,
    engine: RN_SR ? 'web' : RN_VOICE.v.key ? 'eleven' : null
  }).current;
  var stopRec = function stopRec() {
    var r = R.rec;
    R.rec = null;
    if (r) {
      try {
        r.abort ? r.abort() : r.stop();
      } catch (e) {}
    }
  };
  var stopBarge = function stopBarge() {
    var r = R.barge;
    R.barge = null;
    clearTimeout(R.silT);
    if (r) {
      try {
        r.abort();
      } catch (e) {}
    }
  };
  var stopAll = function stopAll() {
    stopRec();
    stopBarge();
    R.tok++;
    rnStopSpeak();
  };
  var fail = function fail(why) {
    R.err = true;
    stopAll();
    setErr(why);
    setState('error');
  };
  var handle = /*#__PURE__*/function () {
    var _ref17 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(q) {
      var _v, ans, v;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            setHeard(q);
            if (!(R.rest && !RN_PENDING.v && RN_YES.test(rnNorm(q)))) {
              _context4.n = 1;
              break;
            }
            _v = R.rest;
            R.rest = null;
            say(q, _v.restShow);
            speak(_v.rest, _v.restShow);
            return _context4.a(2);
          case 1:
            R.rest = null;
            setState('thinking');
            setSaid('');
            _context4.n = 2;
            return ask(q, true);
          case 2:
            ans = _context4.v;
            if (!(!R.alive || R.err)) {
              _context4.n = 3;
              break;
            }
            return _context4.a(2);
          case 3:
            if (ans) {
              _context4.n = 4;
              break;
            }
            listen();
            return _context4.a(2);
          case 4:
            v = rnVoice(ans);
            R.rest = v.rest ? v : null;
            speak(v.now, v.nowShow);
          case 5:
            return _context4.a(2);
        }
      }, _callee4);
    }));
    return function handle(_x13) {
      return _ref17.apply(this, arguments);
    };
  }();
  var speak = function speak(text, show) {
    var tok = ++R.tok;
    setSaid(show || text);
    setState('speaking');
    rnSpeak(text, function () {
      if (R.tok !== tok || !R.alive) return;
      stopBarge();
      setHeard('');
      setTimeout(listen, 120);
    });
    if (RN_BARGE && !R.muted) setTimeout(function () {
      if (R.tok === tok && R.alive) startBarge(tok, text);
    }, 350);
  };
  // interromper falando por cima (computador com Chrome ou Edge)
  var startBarge = function startBarge(tok, text) {
    var spoken = new Set(rnNorm(text).split(/[^a-z0-9]+/).filter(Boolean));
    var clean = function clean(w) {
      return rnNorm(w).replace(/[^a-z0-9]/g, '');
    };
    var strip = function strip(s) {
      var w = s.trim().split(/\s+/);
      var i = 0;
      while (i < w.length && (spoken.has(clean(w[i])) || clean(w[i]).length <= 2)) i++;
      return w.slice(i).join(' ');
    };
    var r;
    try {
      r = new RN_SR();
    } catch (e) {
      return;
    }
    R.barge = r;
    r.lang = 'pt-BR';
    r.interimResults = true;
    r.continuous = true;
    var hit = false,
      cur = '';
    r.onresult = function (e) {
      var txt = '';
      for (var i = 0; i < e.results.length; i++) txt += e.results[i][0].transcript + ' ';
      if (!hit) {
        var words = rnNorm(txt).split(/[^a-z0-9]+/).filter(function (w) {
          return w.length > 3 && !/^\d+$/.test(w);
        });
        var novel = words.filter(function (w) {
          return !spoken.has(w);
        });
        if (novel.length >= 2 && novel.length / words.length > 0.5) {
          hit = true;
          R.tok++;
          rnStopSpeak();
          R.rest = null;
          setSaid('');
          setState('listening');
        }
      }
      if (hit) {
        cur = txt;
        setHeard(strip(txt));
        clearTimeout(R.silT);
        R.silT = setTimeout(function () {
          try {
            r.stop();
          } catch (x) {}
        }, 1100);
      }
    };
    r.onerror = function () {};
    r.onend = function () {
      if (R.barge !== r || !R.alive) return;
      if (hit) {
        R.barge = null;
        var q = strip(cur);
        if (q) handle(q);else listen();
        return;
      }
      if (R.tok === tok) {
        try {
          r.start();
        } catch (x) {}
      }
    };
    try {
      r.start();
    } catch (e) {}
  };
  var listenWeb = function listenWeb() {
    var r;
    try {
      r = new RN_SR();
    } catch (e) {
      return fail('nostt');
    }
    R.rec = r;
    r.lang = 'pt-BR';
    r.interimResults = true;
    r.continuous = false;
    var fin = '',
      inter = '';
    r.onresult = function (e) {
      fin = '';
      inter = '';
      for (var i = 0; i < e.results.length; i++) {
        if (e.results[i].isFinal) fin += e.results[i][0].transcript;else inter += e.results[i][0].transcript;
      }
      setHeard((fin + ' ' + inter).trim());
    };
    r.onerror = function (e) {
      if (R.rec !== r) return;
      if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
        if (RN_VOICE.v.key && window.MediaRecorder) {
          R.rec = null;
          R.engine = 'eleven';
          start();
          return;
        }
        fail(e.error === 'service-not-allowed' ? 'dictation' : 'denied');
      } else if (e.error === 'audio-capture') fail('nomic');else if (e.error === 'network') fail('network');
    };
    r.onend = function () {
      if (R.rec !== r || !R.alive) return;
      R.rec = null;
      var q = (fin || inter).trim();
      if (!q) {
        setTimeout(listen, 150);
        return;
      }
      handle(q);
    };
    try {
      r.start();
    } catch (e) {
      R.rec = null;
      setTimeout(listen, 400);
    }
  };
  // sem reconhecimento no navegador: grava e transcreve pela ElevenLabs
  var listenEleven = function listenEleven() {
    var s = R.stream;
    if (!s || !window.MediaRecorder) return fail('nostt');
    var AC = window.AudioContext || window.webkitAudioContext;
    try {
      if (!R.actx) {
        R.actx = new AC();
        R.an = R.actx.createAnalyser();
        R.an.fftSize = 1024;
        R.actx.createMediaStreamSource(s).connect(R.an);
      }
      R.actx.resume();
    } catch (e) {}
    var rec;
    try {
      rec = new MediaRecorder(s);
    } catch (e) {
      return fail('nostt');
    }
    var chunks = [];
    rec.ondataavailable = function (e) {
      if (e.data && e.data.size) chunks.push(e.data);
    };
    var buf = new Float32Array(1024);
    var spoke = false,
      last = Date.now(),
      floor = 0.008;
    var t0 = Date.now();
    var _tick = function tick() {
      if (R.rec !== rec) return;
      var rms = 0;
      if (R.an) {
        R.an.getFloatTimeDomainData(buf);
        var sum = 0;
        for (var i = 0; i < buf.length; i++) sum += buf[i] * buf[i];
        rms = Math.sqrt(sum / buf.length);
      }
      if (!spoke) floor = floor * 0.9 + rms * 0.1;
      if (rms > Math.max(0.02, floor * 2.5)) {
        spoke = true;
        last = Date.now();
      }
      var now = Date.now();
      if (spoke && now - last > 1000 || now - t0 > 25000 || !spoke && now - t0 > 12000) {
        try {
          rec.stop();
        } catch (e) {}
        return;
      }
      setTimeout(_tick, 60);
    };
    rec.onstop = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var type, fd, r, j, q, _t2, _t3;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            if (!(R.rec !== rec || !R.alive)) {
              _context5.n = 1;
              break;
            }
            return _context5.a(2);
          case 1:
            R.rec = null;
            if (spoke) {
              _context5.n = 2;
              break;
            }
            listen();
            return _context5.a(2);
          case 2:
            setState('thinking');
            setHeard('Entendendo o que você disse...');
            _context5.p = 3;
            type = rec.mimeType || 'audio/webm';
            fd = new FormData();
            fd.append('model_id', 'scribe_v1');
            fd.append('file', new Blob(chunks, {
              type: type
            }), 'fala.' + (/mp4|aac/.test(type) ? 'm4a' : 'webm'));
            if (SB_ON) {
              fd.append('acao', 'transcrever');
              fd.append('clinica_id', CLI());
              fd.append('segundos', String(Math.round((Date.now() - t0) / 1000)));
            }
            if (!SB_ON) {
              _context5.n = 5;
              break;
            }
            _context5.n = 4;
            return rnFn(fd);
          case 4:
            _t2 = _context5.v;
            _context5.n = 7;
            break;
          case 5:
            _context5.n = 6;
            return fetch('https://api.elevenlabs.io/v1/speech-to-text', {
              method: 'POST',
              headers: {
                'xi-api-key': RN_VOICE.v.key
              },
              body: fd
            });
          case 6:
            _t2 = _context5.v;
          case 7:
            r = _t2;
            _context5.n = 8;
            return r.json()["catch"](function () {
              return {};
            });
          case 8:
            j = _context5.v;
            if (R.alive) {
              _context5.n = 9;
              break;
            }
            return _context5.a(2);
          case 9:
            if (r.ok) {
              _context5.n = 10;
              break;
            }
            throw j;
          case 10:
            q = String(j.text || '').trim();
            if (q) {
              _context5.n = 11;
              break;
            }
            listen();
            return _context5.a(2);
          case 11:
            handle(q);
            _context5.n = 13;
            break;
          case 12:
            _context5.p = 12;
            _t3 = _context5.v;
            if (R.alive) fail('eleven');
          case 13:
            return _context5.a(2);
        }
      }, _callee5, null, [[3, 12]]);
    }));
    R.rec = rec;
    rec.start();
    setTimeout(_tick, 60);
  };
  var listen = function listen() {
    if (!R.alive || R.err) return;
    if (R.muted) {
      setState('idle');
      return;
    }
    stopRec();
    setState('listening');
    if (R.engine === 'eleven') listenEleven();else listenWeb();
  };
  var start = /*#__PURE__*/function () {
    var _ref19 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      var c;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            R.err = false;
            setErr(null);
            setState('starting');
            if (R.engine) {
              _context6.n = 1;
              break;
            }
            return _context6.a(2, fail('nostt'));
          case 1:
            _context6.n = 2;
            return rnMicCheck(R.engine === 'eleven');
          case 2:
            c = _context6.v;
            if (R.alive) {
              _context6.n = 3;
              break;
            }
            if (c.stream) c.stream.getTracks().forEach(function (x) {
              return x.stop();
            });
            return _context6.a(2);
          case 3:
            if (c.ok) {
              _context6.n = 4;
              break;
            }
            return _context6.a(2, fail(c.why));
          case 4:
            if (c.stream) {
              if (R.stream && R.stream !== c.stream) R.stream.getTracks().forEach(function (x) {
                return x.stop();
              });
              R.stream = c.stream;
            }
            listen();
          case 5:
            return _context6.a(2);
        }
      }, _callee6);
    }));
    return function start() {
      return _ref19.apply(this, arguments);
    };
  }();
  React.useEffect(function () {
    R.alive = true;
    if (!needTap) start();
    return function () {
      R.alive = false;
      stopAll();
      if (R.stream) R.stream.getTracks().forEach(function (x) {
        return x.stop();
      });
      try {
        R.actx && R.actx.close();
      } catch (e) {}
    };
  }, []);
  React.useEffect(function () {
    if (err === 'frame' && RN_CAN_POP) rnSampleState().then(setIaState);
  }, [err]);
  var popClick = /*#__PURE__*/function () {
    var _ref20 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
      var p, st, r, _t4;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.p = _context7.n) {
          case 0:
            if (!(iaState === 'prompt')) {
              _context7.n = 6;
              break;
            }
            _context7.n = 1;
            return rnPerm();
          case 1:
            p = _context7.v;
            st = 'granted';
            if (!p) {
              _context7.n = 5;
              break;
            }
            _context7.p = 2;
            _context7.n = 3;
            return p.request(['sample']);
          case 3:
            r = _context7.v;
            st = r && r.sample || 'granted';
            _context7.n = 5;
            break;
          case 4:
            _context7.p = 4;
            _t4 = _context7.v;
          case 5:
            setIaState(st === 'prompt' ? 'granted' : st);
            return _context7.a(2);
          case 6:
            setPop(rnPopOut() ? 'opened' : 'blocked');
          case 7:
            return _context7.a(2);
        }
      }, _callee7, null, [[2, 4]]);
    }));
    return function popClick() {
      return _ref20.apply(this, arguments);
    };
  }();
  var orbClick = function orbClick() {
    if (state === 'tap') {
      rnUnlockAudio();
      start();
    } else interrupt();
  };
  var interrupt = function interrupt() {
    if (state !== 'speaking') return;
    R.tok++;
    rnStopSpeak();
    stopBarge();
    R.rest = null;
    setSaid('');
    setHeard('');
    listen();
  };
  var toggleMute = function toggleMute() {
    var m = !R.muted;
    R.muted = m;
    setMuted(m);
    if (m) {
      stopRec();
      stopBarge();
      if (state === 'listening' || state === 'starting') setState('idle');
    } else if (state === 'idle') listen();
  };
  var LBL = {
    tap: 'Toque na Renata para começar a conversa',
    starting: 'Ligando o microfone...',
    listening: 'Pode falar, estou ouvindo',
    thinking: 'Pensando...',
    speaking: RN_BARGE ? 'Fale ou toque para interromper' : 'Toque para interromper',
    idle: 'Microfone desligado',
    error: ''
  };
  var big = mobile ? 168 : 190;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      zIndex: 4,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'linear-gradient(180deg,#F3F8FF 0%,#E4EEFC 100%)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      alignSelf: 'stretch',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: mobile ? '14px 16px 0' : '18px 22px 0'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Renata IA"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)',
      padding: '3px 9px',
      borderRadius: 999,
      background: 'rgba(255,255,255,.75)'
    }
  }, "Conversa por voz")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 22,
      padding: 24,
      boxSizing: 'border-box',
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: orbClick,
    "aria-label": state === 'tap' ? 'Começar a conversa' : state === 'speaking' ? 'Interromper a Renata' : 'Renata',
    style: {
      border: 0,
      padding: 0,
      background: 'transparent',
      borderRadius: '50%',
      cursor: state === 'speaking' || state === 'tap' ? 'pointer' : 'default',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(RenataOrb, {
    size: big,
    state: err || muted ? 'idle' : state === 'starting' ? 'thinking' : state === 'tap' ? 'listening' : state
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 500,
      color: 'var(--text-muted)',
      minHeight: 20,
      textAlign: 'center'
    }
  }, LBL[state]), heard && (state === 'listening' || state === 'thinking') ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: 540,
      textAlign: 'center',
      fontSize: mobile ? 18 : 20,
      fontWeight: 500,
      color: 'var(--text-strong)',
      lineHeight: 1.4
    }
  }, heard) : null, said && state === 'speaking' ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: 540,
      textAlign: 'center',
      fontSize: mobile ? 15.5 : 16.5,
      color: 'var(--text-body)',
      lineHeight: 1.55
    }
  }, said) : null, err ? /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 440,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12,
      padding: '14px 16px',
      borderRadius: 18,
      background: 'rgba(255,255,255,.75)',
      border: '1.5px solid rgba(255,255,255,.95)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      textAlign: 'center',
      fontSize: 14,
      color: 'var(--text-body)',
      lineHeight: 1.55
    }
  }, pop === 'opened' ? 'A conversa por voz abriu em uma nova aba. Fale com a Renata por lá; as respostas usam a IA daqui.' : pop === 'blocked' ? 'O navegador bloqueou a nova aba. Libere pop ups para este site e toque de novo.' : iaState === 'prompt' ? 'Dentro do link do Claude o sistema fica numa moldura que não recebe o microfone. Primeiro permita a IA da Renata, depois abra a conversa por voz em tela própria.' : RN_MIC_MSG[err]), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      justifyContent: 'center'
    }
  }, err === 'frame' && RN_CAN_POP && pop !== 'opened' ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: popClick,
    style: {
      height: 38,
      padding: '0 16px',
      borderRadius: 999,
      border: 0,
      background: 'linear-gradient(90deg,#0B3FD9,#1F7BFF)',
      color: '#fff',
      fontFamily: 'inherit',
      fontSize: 13.5,
      fontWeight: 600,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(RIcon, {
    name: iaState === 'prompt' ? 'sparkles' : 'external-link',
    size: 15
  }), iaState === 'prompt' ? 'Permitir a IA da Renata' : 'Abrir conversa por voz') : null, RN_RETRY.includes(err) ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: start,
    style: {
      height: 38,
      padding: '0 16px',
      borderRadius: 999,
      border: 0,
      background: 'linear-gradient(90deg,#0B3FD9,#1F7BFF)',
      color: '#fff',
      fontFamily: 'inherit',
      fontSize: 13.5,
      fontWeight: 600,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(RIcon, {
    name: "mic",
    size: 15
  }), "Tentar de novo") : null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    style: {
      height: 38,
      padding: '0 16px',
      borderRadius: 999,
      border: '1.5px solid rgba(214,226,242,.95)',
      background: '#fff',
      color: 'var(--text-strong)',
      fontFamily: 'inherit',
      fontSize: 13.5,
      fontWeight: 500,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(RIcon, {
    name: "keyboard",
    size: 15
  }), "Digitar no chat"))) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      padding: '0 0 calc(26px + env(safe-area-inset-bottom))'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": muted ? 'Ligar microfone' : 'Desligar microfone',
    title: muted ? 'Ligar microfone' : 'Desligar microfone',
    onClick: toggleMute,
    disabled: !!err,
    style: {
      width: 60,
      height: 60,
      borderRadius: '50%',
      border: 0,
      cursor: err ? 'default' : 'pointer',
      background: muted ? '#E5484D' : 'rgba(255,255,255,.92)',
      color: muted ? '#fff' : 'var(--text-strong)',
      boxShadow: '0 10px 24px -14px rgba(23,73,170,.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: err ? .5 : 1
    }
  }, /*#__PURE__*/React.createElement(RIcon, {
    name: muted ? 'mic-off' : 'mic',
    size: 24
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Encerrar conversa por voz",
    title: "Encerrar",
    onClick: onClose,
    style: {
      width: 60,
      height: 60,
      borderRadius: '50%',
      border: 0,
      cursor: 'pointer',
      background: '#0E2350',
      color: '#fff',
      boxShadow: '0 10px 24px -14px rgba(23,73,170,.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(RIcon, {
    name: "x",
    size: 24
  }))));
}
function RnActionCard(_ref21) {
  var a = _ref21.a,
    state = _ref21.state,
    onYes = _ref21.onYes,
    onNo = _ref21.onNo,
    disabled = _ref21.disabled;
  var rows = a.kind === 'cmd' ? a.rows : a.items.map(function (x) {
    return a.kind === 'est' ? {
      icon: x.tipo === 'saida' ? 'package-minus' : 'package-plus',
      c: x.tipo === 'saida' ? '#E5484D' : '#1E9E57',
      t: (x.tipo === 'saida' ? 'Baixa' : 'Entrada') + ' · ' + x.produto,
      v: rnUnPl(x.quantidade, x.un),
      s: "Estoque de ".concat(x.de, " para ").concat(x.para).concat(x.valorTotal ? ' · compra de ' + brl(x.valorTotal) : '')
    } : {
      icon: x.tipo === 'receita' ? 'arrow-down-left' : 'arrow-up-right',
      c: x.tipo === 'receita' ? '#1E9E57' : '#E5484D',
      t: x.tipo === 'receita' ? 'Receita · ' + x.paciente : 'Despesa · ' + x.descricao,
      v: brl(x.valor),
      s: (x.pago ? (x.tipo === 'receita' ? 'Recebido ' : 'Pago ') + rnHojeOu(x.data) : (x.tipo === 'receita' ? 'A receber em ' : 'A pagar em ') + dBR(x.venc)) + ' · ' + (x.tipo === 'receita' ? x.procedimento + ' · ' + x.forma : x.cat)
    };
  });
  var chip = function chip(icon, txt, c) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: 30,
        padding: '0 12px',
        borderRadius: 999,
        background: c + '14',
        color: c,
        fontSize: 13,
        fontWeight: 600
      }
    }, /*#__PURE__*/React.createElement(RIcon, {
      name: icon,
      size: 15
    }), txt);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      borderRadius: 18,
      background: 'rgba(255,255,255,.78)',
      border: '1.5px solid rgba(255,255,255,.95)',
      boxShadow: '0 10px 24px -18px rgba(23,73,170,.5)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 14px 4px',
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--text-muted)',
      letterSpacing: '.02em'
    }
  }, a.kind === 'cmd' ? a.titulo : a.kind === 'est' ? 'MOVIMENTAÇÃO DE ESTOQUE' : 'LANÇAMENTO FINANCEIRO'), rows.map(function (r, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 14px',
        borderTop: i ? '1px solid rgba(214,226,242,.7)' : 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 34,
        height: 34,
        borderRadius: 11,
        background: r.c + '14',
        color: r.c,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(RIcon, {
      name: r.icon,
      size: 17
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontSize: 14,
        fontWeight: 600,
        color: 'var(--text-strong)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, r.t), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontSize: 12.5,
        color: 'var(--text-muted)'
      }
    }, r.s)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 600,
        color: 'var(--text-strong)',
        whiteSpace: 'nowrap',
        fontVariantNumeric: 'tabular-nums'
      }
    }, r.v));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      justifyContent: 'flex-end',
      alignItems: 'center',
      padding: '10px 14px 12px',
      borderTop: '1px solid rgba(214,226,242,.7)'
    }
  }, state === 'open' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: disabled,
    onClick: onNo,
    style: {
      height: 36,
      padding: '0 14px',
      borderRadius: 999,
      border: '1.5px solid rgba(214,226,242,.95)',
      background: '#fff',
      color: 'var(--text-strong)',
      fontFamily: 'inherit',
      fontSize: 13.5,
      fontWeight: 500,
      cursor: 'pointer'
    }
  }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: disabled,
    onClick: onYes,
    style: {
      height: 36,
      padding: '0 16px',
      borderRadius: 999,
      border: 0,
      background: 'linear-gradient(90deg,#0B3FD9,#1F7BFF)',
      color: '#fff',
      fontFamily: 'inherit',
      fontSize: 13.5,
      fontWeight: 600,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(RIcon, {
    name: "check",
    size: 15
  }), "Confirmar")) : state === 'ok' ? chip('circle-check', a.kind === 'cmd' ? 'Feito' : 'Lançado', '#1E9E57') : state === 'erro' ? chip('circle-x', 'Não foi feito', '#E5484D') : state === 'cancel' ? chip('circle-x', 'Cancelado', '#8A97AD') : chip('clock', 'Não confirmado', '#8A97AD')));
}
function RenataChat(_ref22) {
  var mobile = _ref22.mobile;
  var _useStore9 = useStore(RN_STORE),
    _useStore0 = _slicedToArray(_useStore9, 2),
    st = _useStore0[0],
    setSt = _useStore0[1];
  var _useStore1 = useStore(RN_MODE),
    _useStore10 = _slicedToArray(_useStore1, 1),
    mode = _useStore10[0];
  var _useStore11 = useStore(RN_PENDING),
    _useStore12 = _slicedToArray(_useStore11, 1),
    pendNow = _useStore12[0];
  var _React$useState21 = React.useState(''),
    _React$useState22 = _slicedToArray(_React$useState21, 2),
    v = _React$useState22[0],
    setV = _React$useState22[1];
  var _React$useState23 = React.useState(null),
    _React$useState24 = _slicedToArray(_React$useState23, 2),
    busy = _React$useState24[0],
    setBusy = _React$useState24[1];
  var _React$useState25 = React.useState(false),
    _React$useState26 = _slicedToArray(_React$useState25, 2),
    run = _React$useState26[0],
    setRun = _React$useState26[1];
  var runRef = React.useRef(false);
  var _React$useState27 = React.useState(false),
    _React$useState28 = _slicedToArray(_React$useState27, 2),
    expanded = _React$useState28[0],
    setExpanded = _React$useState28[1];
  var _React$useState29 = React.useState(RN_POPUP),
    _React$useState30 = _slicedToArray(_React$useState29, 2),
    voice = _React$useState30[0],
    setVoice = _React$useState30[1];
  var tapRef = React.useRef(RN_POPUP);
  var _React$useState31 = React.useState(false),
    _React$useState32 = _slicedToArray(_React$useState31, 2),
    settings = _React$useState32[0],
    setSettings = _React$useState32[1];
  var _React$useState33 = React.useState(false),
    _React$useState34 = _slicedToArray(_React$useState33, 2),
    dictating = _React$useState34[0],
    setDictating = _React$useState34[1];
  var _React$useState35 = React.useState(null),
    _React$useState36 = _slicedToArray(_React$useState35, 2),
    note = _React$useState36[0],
    setNote = _React$useState36[1];
  var _React$useState37 = React.useState(null),
    _React$useState38 = _slicedToArray(_React$useState37, 2),
    copied = _React$useState38[0],
    setCopied = _React$useState38[1];
  var _React$useState39 = React.useState(null),
    _React$useState40 = _slicedToArray(_React$useState39, 2),
    speaking = _React$useState40[0],
    setSpeaking = _React$useState40[1];
  var ctlRef = React.useRef(null),
    endRef = React.useRef(null),
    taRef = React.useRef(null),
    dictRef = React.useRef(null);
  var msgs = st.msgs;
  var setMsgs = function setMsgs(fn) {
    return setSt(function (s) {
      return _objectSpread(_objectSpread({}, s), {}, {
        msgs: typeof fn === 'function' ? fn(s.msgs) : fn
      });
    });
  };
  var close = function close() {
    ctlRef.current && ctlRef.current.abort();
    rnStopSpeak();
    setSt(function (s) {
      return _objectSpread(_objectSpread({}, s), {}, {
        open: false
      });
    });
  };
  var navSeen = React.useRef(st.nav);
  React.useEffect(function () {
    if (st.nav && st.nav !== navSeen.current) {
      navSeen.current = st.nav;
      if (!voice) {
        var t = setTimeout(close, 1300);
        return function () {
          return clearTimeout(t);
        };
      }
    }
  }, [st.nav]);
  var say = function say(q, text) {
    var id = Date.now();
    setMsgs(function (l) {
      return [].concat(_toConsumableArray(l), [{
        role: 'user',
        content: q,
        id: id - 1
      }, {
        role: 'assistant',
        content: text,
        id: id,
        mode: 'voz'
      }]);
    });
  };
  React.useEffect(function () {
    endRef.current && endRef.current.scrollIntoView({
      block: 'end'
    });
  }, [msgs.length, busy, msgs.length && msgs[msgs.length - 1].content]);
  React.useEffect(function () {
    var k = function k(e) {
      if (e.key === 'Escape' && !voice && !settings) close();
    };
    window.addEventListener('keydown', k);
    return function () {
      return window.removeEventListener('keydown', k);
    };
  }, [voice, settings]);
  React.useEffect(function () {
    if (taRef.current) {
      taRef.current.style.height = 'auto';
      taRef.current.style.height = Math.min(taRef.current.scrollHeight, 160) + 'px';
    }
  }, [v]);
  var ask = /*#__PURE__*/function () {
    var _ref23 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(text, isVoice) {
      var q, hist, id, ctl, upd, usadas, r, _t5;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.p = _context8.n) {
          case 0:
            q = String(text || '').trim();
            if (!(!q || runRef.current)) {
              _context8.n = 1;
              break;
            }
            return _context8.a(2, '');
          case 1:
            hist = [].concat(_toConsumableArray(RN_STORE.v.msgs.filter(function (m) {
              return !m.error && !m.pending && m.content;
            })), [{
              role: 'user',
              content: q
            }]);
            runRef.current = true;
            setRun(true);
            id = Date.now();
            setMsgs(function (l) {
              return [].concat(_toConsumableArray(l), [{
                role: 'user',
                content: q,
                id: id - 1
              }, {
                role: 'assistant',
                content: '',
                id: id,
                pending: true
              }]);
            });
            setV('');
            setBusy('Pensando');
            ctl = new AbortController();
            ctlRef.current = ctl;
            upd = function upd(t) {
              return setMsgs(function (l) {
                return l.map(function (m) {
                  return m.id === id ? _objectSpread(_objectSpread({}, m), {}, {
                    content: t,
                    pending: false
                  }) : m;
                });
              });
            };
            usadas = [];
            _context8.p = 2;
            _context8.n = 3;
            return rnAnswer(hist, {
              voice: isVoice,
              signal: ctl.signal,
              onText: function onText(t) {
                setBusy(null);
                upd(t);
              },
              onTool: function onTool(lbl) {
                setBusy(lbl);
                usadas.push(lbl);
              }
            });
          case 3:
            r = _context8.v;
            if (SB_ON) rnRegistrar(q, _objectSpread(_objectSpread({}, r), {}, {
              ferramentas: usadas
            }), isVoice, id);
            setMsgs(function (l) {
              return l.map(function (m) {
                return m.id === id ? _objectSpread(_objectSpread({}, m), {}, {
                  content: r.text,
                  pending: false,
                  mode: r.mode,
                  error: r.mode === 'erro',
                  pend: r.pending || undefined
                }) : r.resolved && m.pend && m.pend.id === r.resolved.id ? _objectSpread(_objectSpread({}, m), {}, {
                  pendState: r.resolved.state
                }) : m;
              });
            });
            return _context8.a(2, r.text);
          case 4:
            _context8.p = 4;
            _t5 = _context8.v;
            setMsgs(function (l) {
              return l.map(function (m) {
                return m.id === id ? _objectSpread(_objectSpread({}, m), {}, {
                  pending: false,
                  content: _t5 && _t5.text || m.content || '',
                  stopped: true
                }) : m;
              });
            });
            if (SB_ON) rnRegistrar(q, {
              text: _t5 && _t5.text || '',
              mode: 'interrompida',
              ferramentas: usadas
            }, isVoice, id, true);
            return _context8.a(2, '');
          case 5:
            _context8.p = 5;
            setBusy(null);
            ctlRef.current = null;
            runRef.current = false;
            setRun(false);
            return _context8.f(5);
          case 6:
            return _context8.a(2);
        }
      }, _callee8, null, [[2, 4, 5, 6]]);
    }));
    return function ask(_x14, _x15) {
      return _ref23.apply(this, arguments);
    };
  }();
  var regen = function regen(id) {
    if (runRef.current) return;
    if (SB_ON) rnSubstituida(msgs.find(function (m) {
      return m.id === id;
    }));
    var i = msgs.findIndex(function (m) {
      return m.id === id;
    });
    var q = i > 0 ? msgs[i - 1].content : '';
    if (!q) return;
    setMsgs(function (l) {
      return l.slice(0, i - 1);
    });
    setTimeout(function () {
      return ask(q);
    }, 0);
  };
  var dictate = /*#__PURE__*/function () {
    var _ref24 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
      var c, r, base;
      return _regenerator().w(function (_context9) {
        while (1) switch (_context9.n) {
          case 0:
            if (!dictating) {
              _context9.n = 1;
              break;
            }
            try {
              dictRef.current && dictRef.current.stop();
            } catch (e) {}
            return _context9.a(2);
          case 1:
            if (RN_SR) {
              _context9.n = 2;
              break;
            }
            setNote('nostt');
            return _context9.a(2);
          case 2:
            setNote(null);
            _context9.n = 3;
            return rnMicCheck(false);
          case 3:
            c = _context9.v;
            if (c.ok) {
              _context9.n = 4;
              break;
            }
            setNote(c.why);
            return _context9.a(2);
          case 4:
            try {
              r = new RN_SR();
              dictRef.current = r;
              r.lang = 'pt-BR';
              r.interimResults = true;
              base = v ? v + ' ' : '';
              r.onresult = function (e) {
                var t = '';
                for (var i = 0; i < e.results.length; i++) t += e.results[i][0].transcript;
                setV(base + t);
              };
              r.onend = function () {
                return setDictating(false);
              };
              r.onerror = function (e) {
                setDictating(false);
                if (e.error === 'not-allowed' || e.error === 'service-not-allowed') setNote('denied');else if (e.error === 'network') setNote('network');
              };
              r.start();
              setDictating(true);
            } catch (e) {
              setDictating(false);
            }
          case 5:
            return _context9.a(2);
        }
      }, _callee9);
    }));
    return function dictate() {
      return _ref24.apply(this, arguments);
    };
  }();
  var wide = expanded && !mobile;
  var col = {
    width: '100%',
    maxWidth: wide ? 760 : 'none',
    margin: '0 auto',
    boxSizing: 'border-box'
  };
  var empty = !msgs.length;
  var hb = function hb(icon, label, onClick, active) {
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "rn-act",
      "aria-label": label,
      title: label,
      onClick: onClick,
      style: {
        width: 38,
        height: 38,
        borderRadius: 12,
        color: active ? '#1F5EFF' : 'var(--text-strong)'
      }
    }, /*#__PURE__*/React.createElement(RIcon, {
      name: icon,
      size: 18
    }));
  };
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 250,
      display: 'flex',
      justifyContent: 'flex-end',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: close,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'rgba(14,35,80,.22)',
      backdropFilter: 'blur(2px)',
      WebkitBackdropFilter: 'blur(2px)'
    }
  }), /*#__PURE__*/React.createElement("aside", {
    role: "dialog",
    "aria-label": "Renata IA",
    style: {
      position: 'relative',
      margin: mobile ? 0 : 16,
      width: mobile ? '100%' : wide ? 'calc(100vw - 32px)' : 'min(520px, calc(100vw - 32px))',
      height: mobile ? '100%' : 'calc(100% - 32px)',
      transition: 'width .28s cubic-bezier(.2,.8,.2,1)',
      borderRadius: mobile ? 0 : 28,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(180deg,#F6FAFF 0%,#EAF2FD 100%)',
      border: mobile ? 0 : '2px solid rgba(255,255,255,.95)',
      boxShadow: '0 30px 60px -30px rgba(23,73,170,.55)'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: mobile ? '12px 10px 8px 14px' : '14px 14px 10px 20px'
    }
  }, /*#__PURE__*/React.createElement(RenataOrb, {
    size: 30,
    state: busy ? 'thinking' : 'idle'
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--text-strong)',
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, "Renata IA"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 12,
      color: 'var(--text-muted)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, RN_CLINICA.fantasia, mode === 'demo' ? ' · modo demonstração' : '')), hb('square-pen', 'Nova conversa', function () {
    ctlRef.current && ctlRef.current.abort();
    rnStopSpeak();
    rnResetCtx();
    rnSetPending(null);
    setMsgs([]);
    if (SB_ON) rnNovaConversa();
  }), hb('sliders-horizontal', 'Conexões da Renata', function () {
    return setSettings(true);
  }), mobile ? null : hb(expanded ? 'minimize-2' : 'maximize-2', expanded ? 'Recolher' : 'Expandir', function () {
    return setExpanded(!expanded);
  }), hb('x', 'Fechar', close)), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      overflowY: 'auto',
      padding: mobile ? '6px 14px 10px' : '6px 22px 12px',
      scrollbarWidth: 'thin',
      scrollbarColor: 'rgba(150,175,210,.5) transparent',
      WebkitMaskImage: 'linear-gradient(to bottom, transparent 0, #000 18px)',
      maskImage: 'linear-gradient(to bottom, transparent 0, #000 18px)'
    }
  }, empty ? /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, col), {}, {
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 18,
      padding: '20px 0'
    })
  }, /*#__PURE__*/React.createElement(RenataOrb, {
    size: 72,
    state: "listening"
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: mobile ? 22 : 26,
      fontWeight: 600,
      color: 'var(--text-strong)',
      textAlign: 'center',
      letterSpacing: '-0.01em'
    }
  }, "Oi, ", SB_ON ? rnPrimeiroNome() : 'Camila', ". O que voc\xEA quer saber da cl\xEDnica?"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '-8px 0 4px',
      fontSize: 14,
      color: 'var(--text-muted)',
      textAlign: 'center',
      maxWidth: 420,
      lineHeight: 1.5
    }
  }, "Pergunte sobre agenda, pacientes, financeiro, estoque, conversas ou qualquer configura\xE7\xE3o. Respondo s\xF3 com os dados da ", RN_CLINICA.fantasia, "."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: wide ? 'repeat(3, minmax(0,1fr))' : 'repeat(2, minmax(0,1fr))',
      gap: 10,
      width: '100%'
    }
  }, RN_SUGS.map(function (_ref25) {
    var _ref26 = _slicedToArray(_ref25, 2),
      ic = _ref26[0],
      t = _ref26[1];
    return /*#__PURE__*/React.createElement("button", {
      key: t,
      type: "button",
      className: "rn-sug",
      onClick: function onClick() {
        return ask(t);
      },
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 8,
        padding: 14,
        borderRadius: 18,
        cursor: 'pointer',
        fontFamily: 'inherit',
        textAlign: 'left',
        fontSize: 14,
        lineHeight: 1.35,
        color: 'var(--text-strong)',
        background: 'rgba(255,255,255,.65)',
        border: '1.5px solid rgba(255,255,255,.95)',
        boxShadow: '0 6px 16px -12px rgba(23,73,170,.4)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#1F5EFF',
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement(RIcon, {
      name: ic,
      size: 17
    })), t);
  }))) : /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, col), {}, {
      display: 'flex',
      flexDirection: 'column',
      gap: 22,
      paddingTop: 8
    })
  }, msgs.map(function (m) {
    return m.role === 'user' ? /*#__PURE__*/React.createElement("div", {
      key: m.id,
      style: {
        display: 'flex',
        justifyContent: 'flex-end'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: '82%',
        padding: '10px 16px',
        borderRadius: 22,
        background: 'linear-gradient(180deg,#0B4BEB,#1F8BF5)',
        color: '#fff',
        fontSize: 15,
        lineHeight: 1.5,
        whiteSpace: 'pre-wrap',
        boxShadow: '0 10px 22px -16px rgba(11,75,235,.8)'
      }
    }, m.content)) : /*#__PURE__*/React.createElement("div", {
      key: m.id,
      style: {
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement(RenataOrb, {
      size: 28,
      state: m.pending ? 'thinking' : 'idle'
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0,
        paddingTop: 3
      }
    }, m.pending ? /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 14,
        color: 'var(--text-muted)'
      }
    }, busy || 'Pensando', /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        gap: 3
      }
    }, [0, 1, 2].map(function (d) {
      return /*#__PURE__*/React.createElement("span", {
        key: d,
        style: {
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: '#4F7BE6',
          animation: "rnDot 1.2s ".concat(d * .15, "s infinite")
        }
      });
    }))) : /*#__PURE__*/React.createElement("div", {
      className: "rn-md",
      style: {
        fontSize: 15,
        lineHeight: 1.6,
        color: 'var(--text-body)',
        wordBreak: 'break-word'
      },
      dangerouslySetInnerHTML: {
        __html: rnMd(m.content) + (run && !busy && m === msgs[msgs.length - 1] ? '<span style="display:inline-block;width:8px;height:16px;margin-left:2px;vertical-align:-2px;background:#4F7BE6;border-radius:2px;animation:rnCaret 1s steps(1) infinite"></span>' : '')
      }
    }), m.stopped ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: 'var(--text-subtle)'
      }
    }, "Resposta interrompida") : null, m.pend && !m.pending ? /*#__PURE__*/React.createElement(RnActionCard, {
      a: m.pend,
      state: m.pendState || (pendNow && pendNow.id === m.pend.id ? 'open' : 'old'),
      disabled: run,
      onYes: function onYes() {
        return ask(m.pend.kind === 'cmd' ? 'Sim, pode fazer' : 'Sim, pode lançar');
      },
      onNo: function onNo() {
        return ask('Não, cancela');
      }
    }) : null, !m.pending && !(run && m === msgs[msgs.length - 1]) ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 2,
        marginTop: 6,
        marginLeft: -6
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "rn-act",
      title: "Copiar",
      "aria-label": "Copiar resposta",
      onClick: function onClick() {
        try {
          navigator.clipboard && navigator.clipboard.writeText(rnPlain(m.content));
        } catch (e) {}
        setCopied(m.id);
        setTimeout(function () {
          return setCopied(null);
        }, 1500);
      }
    }, /*#__PURE__*/React.createElement(RIcon, {
      name: copied === m.id ? 'check' : 'copy',
      size: 16
    })), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "rn-act",
      title: speaking === m.id ? 'Parar' : 'Ouvir',
      "aria-label": "Ouvir resposta",
      onClick: function onClick() {
        if (speaking === m.id) {
          rnStopSpeak();
          setSpeaking(null);
        } else {
          rnUnlockAudio();
          setSpeaking(m.id);
          rnSpeak(m.content, function () {
            return setSpeaking(null);
          });
        }
      },
      style: {
        color: speaking === m.id ? '#1F5EFF' : undefined
      }
    }, /*#__PURE__*/React.createElement(RIcon, {
      name: speaking === m.id ? 'square' : 'volume-2',
      size: 16
    })), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "rn-act",
      title: "Gerar de novo",
      "aria-label": "Gerar de novo",
      onClick: function onClick() {
        return regen(m.id);
      }
    }, /*#__PURE__*/React.createElement(RIcon, {
      name: "refresh-cw",
      size: 16
    })), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "rn-act",
      title: "Boa resposta",
      "aria-label": "Boa resposta",
      onClick: function onClick() {
        setMsgs(function (l) {
          return l.map(function (x) {
            return x.id === m.id ? _objectSpread(_objectSpread({}, x), {}, {
              fb: x.fb === 'up' ? null : 'up'
            }) : x;
          });
        });
        if (SB_ON) rnFeedback(m, m.fb === 'up' ? null : 'boa');
      },
      style: {
        color: m.fb === 'up' ? '#1F5EFF' : undefined
      }
    }, /*#__PURE__*/React.createElement(RIcon, {
      name: "thumbs-up",
      size: 16
    })), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "rn-act",
      title: "Resposta ruim",
      "aria-label": "Resposta ruim",
      onClick: function onClick() {
        setMsgs(function (l) {
          return l.map(function (x) {
            return x.id === m.id ? _objectSpread(_objectSpread({}, x), {}, {
              fb: x.fb === 'down' ? null : 'down'
            }) : x;
          });
        });
        if (SB_ON) rnFeedback(m, m.fb === 'down' ? null : 'ruim');
      },
      style: {
        color: m.fb === 'down' ? '#E5484D' : undefined
      }
    }, /*#__PURE__*/React.createElement(RIcon, {
      name: "thumbs-down",
      size: 16
    }))) : null));
  }), /*#__PURE__*/React.createElement("span", {
    ref: endRef
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: mobile ? '6px 12px 14px' : '6px 22px 16px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: _objectSpread({}, col)
  }, note ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 8,
      marginBottom: 8,
      padding: '10px 12px',
      borderRadius: 16,
      background: 'rgba(255,255,255,.8)',
      border: '1.5px solid rgba(255,255,255,.95)',
      fontSize: 13,
      lineHeight: 1.5,
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#1F5EFF',
      display: 'flex',
      paddingTop: 1
    }
  }, /*#__PURE__*/React.createElement(RIcon, {
    name: "mic-off",
    size: 16
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, RN_MIC_MSG[note]), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "rn-act",
    "aria-label": "Fechar aviso",
    onClick: function onClick() {
      return setNote(null);
    },
    style: {
      width: 26,
      height: 26
    }
  }, /*#__PURE__*/React.createElement(RIcon, {
    name: "x",
    size: 15
  }))) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 6,
      padding: '8px 8px 8px 10px',
      borderRadius: 28,
      background: '#fff',
      border: '1.5px solid rgba(214,226,242,.95)',
      boxShadow: '0 14px 30px -20px rgba(23,73,170,.55)'
    }
  }, /*#__PURE__*/React.createElement("textarea", {
    ref: taRef,
    value: v,
    rows: 1,
    onChange: function onChange(e) {
      return setV(e.target.value);
    },
    onKeyDown: function onKeyDown(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        ask(v);
      }
    },
    placeholder: dictating ? 'Ouvindo...' : 'Pergunte qualquer coisa',
    "aria-label": "Pergunte qualquer coisa",
    style: {
      flex: 1,
      minWidth: 0,
      resize: 'none',
      border: 0,
      outline: 'none',
      background: 'transparent',
      fontFamily: 'inherit',
      fontSize: 15.5,
      lineHeight: '22px',
      color: 'var(--text-strong)',
      padding: '9px 6px',
      maxHeight: 160,
      boxSizing: 'border-box',
      height: 40
    }
  }), RN_SR ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "rn-act",
    "aria-label": dictating ? 'Parar ditado' : 'Ditar pergunta',
    title: dictating ? 'Parar ditado' : 'Ditar',
    onClick: dictate,
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      color: dictating ? '#E5484D' : 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(RIcon, {
    name: dictating ? 'mic-off' : 'mic',
    size: 19
  })) : null, run ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Parar resposta",
    onClick: function onClick() {
      return ctlRef.current && ctlRef.current.abort();
    },
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      border: 0,
      cursor: 'pointer',
      background: '#0E2350',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(RIcon, {
    name: "square",
    size: 14
  })) : v.trim() ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Enviar pergunta",
    onClick: function onClick() {
      return ask(v);
    },
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      border: 0,
      cursor: 'pointer',
      background: 'linear-gradient(180deg,#0B4BEB,#1F8BF5)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      boxShadow: '0 8px 18px -10px rgba(11,75,235,.9)'
    }
  }, /*#__PURE__*/React.createElement(RIcon, {
    name: "arrow-up",
    size: 19,
    strokeWidth: 2.4
  })) : /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Conversar por voz",
    title: "Conversar por voz",
    onClick: function onClick() {
      rnUnlockAudio();
      setNote(null);
      setVoice(true);
    },
    style: {
      width: 40,
      height: 40,
      borderRadius: '50%',
      border: 0,
      cursor: 'pointer',
      background: 'linear-gradient(135deg,#0B4BEB,#7B4BC4)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      boxShadow: '0 8px 18px -10px rgba(11,75,235,.9)'
    }
  }, /*#__PURE__*/React.createElement(RIcon, {
    name: "audio-lines",
    size: 19
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '8px 0 0',
      textAlign: 'center',
      fontSize: 11.5,
      color: 'var(--text-subtle)'
    }
  }, "A Renata pode cometer erros. Confira informa\xE7\xF5es importantes."))), voice ? /*#__PURE__*/React.createElement(RenataVoiceMode, {
    ask: ask,
    say: say,
    mobile: mobile,
    needTap: tapRef.current,
    onClose: function onClose() {
      tapRef.current = false;
      setVoice(false);
      ctlRef.current && ctlRef.current.abort();
      rnStopSpeak();
    }
  }) : null, settings ? /*#__PURE__*/React.createElement(RenataSettings, {
    onClose: function onClose() {
      return setSettings(false);
    }
  }) : null)), document.body);
}
function RenataRoot(_ref27) {
  var mobile = _ref27.mobile;
  var _useStore13 = useStore(RN_STORE),
    _useStore14 = _slicedToArray(_useStore13, 1),
    st = _useStore14[0];
  return st.open ? /*#__PURE__*/React.createElement(RenataChat, {
    mobile: mobile
  }) : null;
}
Object.assign(window, {
  RenataButton: RenataButton,
  RenataRoot: RenataRoot,
  RenataOrb: RenataOrb,
  RN_STORE: RN_STORE
});

/* =====================================================================
   COMANDO DE VOZ EM TODO O SISTEMA
   Botão de microfone no topo (e Ctrl + M): fala um pedido e a Renata age.
   Consultas e navegação acontecem na hora. Tudo que grava vira um cartão
   para confirmar (falando "sim" ou tocando em Confirmar), respeita o acesso
   de cada usuário e fica registrado como feito pela Renata IA.
   Com um campo de texto selecionado, Ctrl + M dita direto no campo.
   ===================================================================== */
var VIconBtn = window.SaluteProjetoDesigner_8b4683.IconButton;

/* ---------- acesso, nomes, datas e horários ---------- */
function rnPode(id) {
  var meus = SESSAO.v && SESSAO.v.modulos;
  var va = VIEW_AS.v;
  var m = va ? (TEAM_STORE.v || []).find(function (x) {
    return x.id === va;
  }) : null;
  return (!meus || meus.includes(id)) && (!m || m.dono || (m.acc || []).includes(id));
}
var RN_SEM_ACESSO = {
  agenda: 'a Agenda',
  pacientes: 'Pacientes',
  mensagens: 'Mensagens',
  'gestao.financeiro': 'o Financeiro',
  'gestao.estoque': 'o Estoque'
};
var rnSemAcesso = function rnSemAcesso(id) {
  return {
    erro: 'Seu usuário não tem acesso a ' + (RN_SEM_ACESSO[id] || 'essa área') + '. Peça ao gestor da clínica para liberar em Equipe e acessos.'
  };
};
function rnAcharPaciente(nome) {
  var t = rnNorm(nome).replace(/[^a-z0-9 ]/g, ' ').replace(/\b(paciente|cliente|dona|senhora|senhor|sr|sra|da|do|de|dos|das|a|o)\b/g, ' ').replace(/\s+/g, ' ').trim();
  if (!t) return {
    erro: 'De qual paciente?'
  };
  var n = function n(p) {
    return rnNorm(p.nome).replace(/[^a-z0-9 ]/g, ' ');
  };
  var c = PAC.filter(function (p) {
    return p.nome && n(p).replace(/\s+/g, ' ').trim() === t;
  });
  if (!c.length) {
    var ws = t.split(' ').filter(function (w) {
      return w.length > 1;
    });
    c = PAC.filter(function (p) {
      return p.nome && ws.length && ws.every(function (w) {
        return n(p).split(/\s+/).some(function (x) {
          return x === w || w.length > 3 && x.startsWith(w);
        });
      });
    });
  }
  if (c.length === 1) return {
    p: c[0]
  };
  if (c.length > 1) return {
    erro: 'Encontrei mais de um paciente com esse nome: ' + c.slice(0, 5).map(function (p) {
      return p.nome;
    }).join(', ') + '. Qual deles?'
  };
  return {
    erro: 'Não encontrei paciente com o nome ' + String(nome || '').trim() + ' no cadastro.',
    naoEncontrado: true
  };
}
function rnAcharProf(nome) {
  var t = rnNorm(nome).replace(/[^a-z0-9 ]/g, ' ').replace(/\b(dra|dr|doutora|doutor|com|a|o|da|do)\b/g, ' ').replace(/\s+/g, ' ').trim();
  if (!t) return null;
  var ws = t.split(' ').filter(function (w) {
    return w.length > 2;
  });
  var i = PROS.findIndex(function (p) {
    var x = rnNorm(p.n);
    return ws.length && ws.every(function (w) {
      return x.includes(w);
    });
  });
  return i >= 0 ? _objectSpread(_objectSpread({}, PROS[i]), {}, {
    i: i
  }) : null;
}
function rnProcNome(t) {
  if (!t) return null;
  var q = rnNorm(t);
  var ex = FIN_PROCS.find(function (x) {
    return rnNorm(x.n) === q;
  });
  if (ex) return ex.n;
  var s = rnProcOf(t);
  if (s && FIN_PROCS.some(function (x) {
    return x.n === s;
  })) return s;
  var pa = FIN_PROCS.find(function (x) {
    return rnNorm(x.n).includes(q) || q.includes(rnNorm(x.n));
  });
  return pa ? pa.n : null;
}
var rnDataOk = function rnDataOk(s) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(s || '')) ? String(s) : null;
};
var rnHora = function rnHora(h) {
  var m = String(h || '').trim().toLowerCase().match(/^(\d{1,2})(?:\s*(?::|h)\s*(\d{2})?)?/);
  if (!m) return null;
  var H = +m[1],
    M = +(m[2] || 0);
  if (H > 23 || M > 59) return null;
  return String(H).padStart(2, '0') + ':' + String(M).padStart(2, '0');
};
var rnDec = function rnDec(hh) {
  var _hh$split = hh.split(':'),
    _hh$split2 = _slicedToArray(_hh$split, 2),
    a = _hh$split2[0],
    b = _hh$split2[1];
  return +a + +b / 60;
};
var rnHM2 = function rnHM2(t) {
  return String(Math.floor(t + 1e-6)).padStart(2, '0') + ':' + String(Math.round((t - Math.floor(t + 1e-6)) * 60)).padStart(2, '0');
};
var rnDiaTxt = function rnDiaTxt(iso) {
  var d = new Date(iso + 'T12:00:00');
  var s = iso === TODAY_ISO ? 'hoje' : iso === rnIso(addD(TODAY, 1)) ? 'amanhã' : RN_DIAS_SEMANA[d.getDay()];
  return s + ', ' + dBR(iso).slice(0, 5);
};
var rnPrimeiro = function rnPrimeiro(nome) {
  return String(nome || '').split(' ')[0];
};
var rnHmAg = function rnHmAg(a) {
  return a.ini ? BR.hm(a.ini) : qHH(a.h);
};
function rnExpediente(iso) {
  var dw = new Date(iso + 'T12:00:00').getDay();
  if (SB_ON) {
    var h = (CAT.v.horarios || []).find(function (x) {
      return x.dia_semana === dw;
    });
    if (!h) return dw === 0 ? null : [8, 19];
    if (!h.aberto) return null;
    var f = function f(s) {
      var _String$split = String(s || '0:0').split(':'),
        _String$split2 = _slicedToArray(_String$split, 2),
        a = _String$split2[0],
        b = _String$split2[1];
      return +a + (+b || 0) / 60;
    };
    return [f(h.hora_inicio), f(h.hora_fim)];
  }
  return dw === 0 ? null : dw === 6 ? [8, 12] : [8, 19];
}
function rnBloqueios(_x16) {
  return _rnBloqueios.apply(this, arguments);
} // horários ocupados de um profissional (coluna da agenda) num dia, em horas
function _rnBloqueios() {
  _rnBloqueios = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee35(iso) {
    var a, b, rows;
    return _regenerator().w(function (_context35) {
      while (1) switch (_context35.n) {
        case 0:
          if (SB_ON) {
            _context35.n = 1;
            break;
          }
          return _context35.a(2, []);
        case 1:
          a = BR.instante(iso, '00:00'), b = new Date(BR.instante(iso, '23:59').getTime() + 59000); // o dia inteiro no horário de Brasília
          _context35.n = 2;
          return DB.ler(DB.sel('bloqueios_horario', 'profissional_id,inicio,fim,dia_inteiro').lt('inicio', b.toISOString()).gt('fim', a.toISOString()))["catch"](function () {
            return [];
          });
        case 2:
          rows = _context35.v;
          return _context35.a(2, rows.map(function (r) {
            var i = new Date(r.inicio),
              f = new Date(r.fim);
            return {
              prof: r.profissional_id,
              a: r.dia_inteiro || i < a ? 0 : BR.horaDec(i),
              b: r.dia_inteiro || f > b ? 24 : BR.horaDec(f)
            };
          }));
      }
    }, _callee35);
  }));
  return _rnBloqueios.apply(this, arguments);
}
var rnOcupados = function rnOcupados(iso, col, semId) {
  return slotsFor(new Date(iso + 'T00:00:00')).filter(function (s) {
    return s.col === col && (!semId || s.id !== semId);
  }).map(function (s) {
    return [9 + s.row, 9 + s.row + Math.max(0.25, s.span || 1)];
  });
};
function rnLivres(_x17, _x18, _x19, _x20) {
  return _rnLivres.apply(this, arguments);
}
/* ---------- ação para confirmar ---------- */
function _rnLivres() {
  _rnLivres = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee36(iso, pr, durH, semId) {
    var exp, bl, occ, agora, out, _loop3, _ret3, _t27;
    return _regenerator().w(function (_context37) {
      while (1) switch (_context37.n) {
        case 0:
          exp = rnExpediente(iso);
          if (exp) {
            _context37.n = 1;
            break;
          }
          return _context37.a(2, null);
        case 1:
          _context37.n = 2;
          return rnBloqueios(iso);
        case 2:
          bl = _context37.v.filter(function (b) {
            return !b.prof || b.prof === pr.id;
          }).map(function (b) {
            return [b.a, b.b];
          });
          occ = rnOcupados(iso, pr.i, semId).concat(bl);
          agora = iso === TODAY_ISO ? BR.horaDec() : -1;
          out = [];
          _loop3 = /*#__PURE__*/_regenerator().m(function _loop3(_t27) {
            return _regenerator().w(function (_context36) {
              while (1) switch (_context36.n) {
                case 0:
                  if (!(_t27 < agora)) {
                    _context36.n = 1;
                    break;
                  }
                  return _context36.a(2, 0);
                case 1:
                  if (!occ.some(function (_ref55) {
                    var _ref56 = _slicedToArray(_ref55, 2),
                      a = _ref56[0],
                      b = _ref56[1];
                    return _t27 < b - 1e-9 && _t27 + durH > a + 1e-9;
                  })) {
                    _context36.n = 2;
                    break;
                  }
                  return _context36.a(2, 0);
                case 2:
                  out.push(_t27);
                case 3:
                  return _context36.a(2);
              }
            }, _loop3);
          });
          _t27 = exp[0];
        case 3:
          if (!(_t27 + durH <= exp[1] + 1e-9)) {
            _context37.n = 6;
            break;
          }
          return _context37.d(_regeneratorValues(_loop3(_t27)), 4);
        case 4:
          _ret3 = _context37.v;
          if (!(_ret3 === 0)) {
            _context37.n = 5;
            break;
          }
          return _context37.a(3, 5);
        case 5:
          _t27 += 0.5;
          _context37.n = 3;
          break;
        case 6:
          return _context37.a(2, {
            exp: exp,
            livres: out,
            occ: occ
          });
      }
    }, _callee36);
  }));
  return _rnLivres.apply(this, arguments);
}
function rnCmd(registro, titulo, rows, resumo, run, dados) {
  var a = {
    id: 'a' + __rnActId++,
    kind: 'cmd',
    registro: registro,
    titulo: titulo,
    rows: rows,
    resumo: resumo,
    run: run,
    items: [],
    dados: dados || {}
  };
  rnSetPending(a);
  return {
    status: 'aguardando confirmação da pessoa',
    resumo: rnPlain(resumo)
  };
}
function rnExecCmd(_x21) {
  return _rnExecCmd.apply(this, arguments);
}
function _rnExecCmd() {
  _rnExecCmd = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee37(a) {
    var r, acaoId, _t28, _t29;
    return _regenerator().w(function (_context38) {
      while (1) switch (_context38.p = _context38.n) {
        case 0:
          _context38.p = 0;
          _context38.n = 1;
          return a.run();
        case 1:
          _t28 = _context38.v;
          if (_t28) {
            _context38.n = 2;
            break;
          }
          _t28 = {};
        case 2:
          r = _t28;
          if (SB_ON) {
            acaoId = novoId();
            rnRegistrarAcao(a, 'lancado', acaoId).then(function () {
              if (r.gerados && r.gerados.length) SB.from('renata_acoes').update({
                registros_gerados: r.gerados
              }).eq('id', acaoId).then(function () {});
            })["catch"](function () {});
          }
          return _context38.a(2, r.texto || 'Pronto!');
        case 3:
          _context38.p = 3;
          _t29 = _context38.v;
          a.falhou = true;
          return _context38.a(2, 'Não consegui concluir agora: ' + (typeof MSG_ERRO === 'function' ? MSG_ERRO(_t29) : String(_t29 && _t29.message || _t29)) + '.');
      }
    }, _callee37, null, [[0, 3]]);
  }));
  return _rnExecCmd.apply(this, arguments);
}
var rnErroDemo = function rnErroDemo(o) {
  return {
    texto: 'No modo demonstração isso não é gravado, mas no sistema conectado eu ' + o + '.'
  };
};

/* ---------- ficha do paciente aberta de qualquer tela ---------- */
var FICHA_GLOBAL = makeStore(null);
function rnAbrirFicha(p, aba) {
  FICHA_GLOBAL.v = {
    p: p,
    aba: {
      conversa: 'conversa',
      dados: 'dados',
      prontuario: 'pront',
      'prontuário': 'pront'
    }[aba] || 'dados',
    t: Date.now()
  };
  avisar(FICHA_GLOBAL);
  RN_STORE.v = _objectSpread(_objectSpread({}, RN_STORE.v), {}, {
    nav: Date.now()
  });
  avisar(RN_STORE);
}
function FichaGlobal(_ref14) {
  var mobile = _ref14.mobile;
  var _useStore15 = useStore(FICHA_GLOBAL),
    _useStore16 = _slicedToArray(_useStore15, 2),
    f = _useStore16[0],
    setF = _useStore16[1];
  if (!f) return null;
  return /*#__PURE__*/React.createElement(PacienteFicha, {
    key: f.t,
    p: f.p,
    initialTab: f.aba,
    mobile: mobile,
    onClose: function onClose() {
      return setF(null);
    },
    onUpdate: function onUpdate(np) {
      setF(_objectSpread(_objectSpread({}, f), {}, {
        p: np
      }));
      if (!SB_ON) {
        PAC_STORE.v = PAC_STORE.v.map(function (x) {
          return x.nome === f.p.nome ? np : x;
        });
        avisar(PAC_STORE);
      }
    }
  });
}

/* ---------- navegação por telas e abas ---------- */
var RN_DESTINOS = [['financeiro.receitas', /\breceitas?\b|contas a receber/, 'as receitas', 'gestao', {
  'gestao.area': 'financeiro',
  'financeiro.aba': 'rec'
}, 'gestao.financeiro'], ['financeiro.despesas', /\bdespesas?\b|contas a pagar/, 'as despesas', 'gestao', {
  'gestao.area': 'financeiro',
  'financeiro.aba': 'desp'
}, 'gestao.financeiro'], ['financeiro.nota_fiscal', /nota fiscal|notas fiscais/, 'a nota fiscal', 'gestao', {
  'gestao.area': 'financeiro',
  'financeiro.aba': 'nf'
}, 'gestao.financeiro'], ['financeiro.salute_pay', /salute pay/, 'o Salute Pay', 'gestao', {
  'gestao.area': 'financeiro',
  'financeiro.aba': 'pay'
}, 'gestao.financeiro'], ['financeiro.categorias', /categorias (do )?financeir/, 'as categorias do financeiro', 'gestao', {
  'gestao.area': 'financeiro',
  'financeiro.aba': 'cats'
}, 'gestao.financeiro'], ['financeiro', /financeiro|fluxo de caixa|\bcaixa\b|faturamento/, 'o financeiro', 'gestao', {
  'gestao.area': 'financeiro',
  'financeiro.aba': 'geral'
}, 'gestao.financeiro'], ['estoque.relatorios', /relatorios? (do |de )?estoque|consumo do estoque/, 'os relatórios do estoque', 'gestao', {
  'gestao.area': 'estoque',
  'estoque.aba': 'relatorios'
}, 'gestao.estoque'], ['estoque', /estoque|insumos|\bprodutos\b/, 'o estoque', 'gestao', {
  'gestao.area': 'estoque',
  'estoque.aba': 'produtos'
}, 'gestao.estoque'], ['crm', /\bcrm\b|\bfunil\b|\bleads?\b/, 'o CRM', 'mensagens', {
  'mensagens.crm': true
}, 'mensagens'], ['mensagens.equipe', /(chat|mensagens|conversas?) da equipe|equipe interna/, 'o chat da equipe', 'mensagens', {
  'mensagens.crm': false,
  'mensagens.aba': 'd'
}, 'mensagens'], ['mensagens', /mensage|conversas|whatsapp|inbox/, 'as mensagens', 'mensagens', {
  'mensagens.crm': false,
  'mensagens.aba': 'p'
}, 'mensagens'], ['agenda', /\bagenda\b|agendamentos|calendario/, 'a agenda', 'agenda', {}, 'agenda'], ['configuracoes.anamnese', /modelos? de anamnese/, 'os modelos de anamnese', 'perfil', {
  'config.aba': 'cadastro',
  'config.cadastro': 'anamnese'
}, 'perfil.cadastro'], ['configuracoes.equipe', /equipe e acessos|\bacessos\b|permissoes/, 'a equipe e acessos', 'perfil', {
  'config.aba': 'cadastro',
  'config.cadastro': 'equipe'
}, 'perfil.cadastro'], ['configuracoes.profissionais', /\bprofissionais\b/, 'os profissionais', 'perfil', {
  'config.aba': 'cadastro',
  'config.cadastro': 'profissionais'
}, 'perfil.cadastro'], ['configuracoes.procedimentos', /\bprocedimentos\b|tabela de precos|lista de precos|precos dos procedimentos/, 'os procedimentos', 'perfil', {
  'config.aba': 'cadastro',
  'config.cadastro': 'procedimentos'
}, 'perfil.cadastro'], ['configuracoes.clinica', /dados da clinica|cadastro da clinica/, 'os dados da clínica', 'perfil', {
  'config.aba': 'cadastro',
  'config.cadastro': 'clinica'
}, 'perfil.cadastro'], ['configuracoes.canais', /\bcanais\b|conexao do whatsapp|instagram/, 'os canais', 'perfil', {
  'config.aba': 'canais'
}, 'perfil.canais'], ['configuracoes.saluteflix', /saluteflix|cursos|salute cast|podcast/, 'o Saluteflix', 'perfil', {
  'config.aba': 'flix'
}, 'perfil.flix'], ['configuracoes.parcerias', /parcerias|parceiros|cupons?/, 'as parcerias', 'perfil', {
  'config.aba': 'parcerias'
}, 'perfil.parcerias'], ['configuracoes.certificacoes', /certificac|\bselos?\b/, 'as certificações', 'perfil', {
  'config.aba': 'cert'
}, 'perfil.cert'], ['minha_conta', /minha conta|meu perfil|meu plano|minha senha/, 'a sua conta', 'perfil', {
  'config.aba': 'conta'
}, 'perfil.conta'], ['configuracoes', /configurac|ajustes/, 'as configurações', 'perfil', {}, 'perfil'], ['pacientes', /\bpacientes?\b/, 'os pacientes', 'pacientes', {}, 'pacientes'], ['painel', /\bpainel\b|\binicio\b|dashboard|tela inicial/, 'o painel', 'painel', {}, 'painel']];
function rnIrPara(chave) {
  var d = RN_DESTINOS.find(function (x) {
    return x[0] === chave;
  });
  if (!d) return {
    aberta: false,
    erro: 'Tela desconhecida'
  };
  if (d[5] && d[5].includes('.') && !rnPode(d[5])) return {
    aberta: false,
    erro: 'Seu usuário não tem acesso a ' + d[2] + '.'
  };
  var prefs = d[4];
  if (Object.keys(prefs).length) {
    if (SB_ON && PREF.v) salvarPref({
      filtros: _objectSpread(_objectSpread({}, PREF.v && PREF.v.filtros || {}), prefs)
    });else if (prefs['gestao.area']) {
      try {
        localStorage.setItem('salute-kit:gestao', prefs['gestao.area']);
      } catch (e) {}
    }
  }
  var ok = window.RN_NAV ? window.RN_NAV(d[3]) : false;
  return ok ? {
    aberta: true,
    tela: d[2]
  } : {
    aberta: false,
    erro: 'Seu usuário não tem acesso a ' + d[2] + '.'
  };
}
var RN_UN_FALADA = [[/\bunidades?\b|\bu\b/, 'U'], [/\bmililitros?\b|\bml\b/, 'ml'], [/\bseringas?\b/, 'seringa'], [/\bmiligramas?\b|\bmg\b/, 'mg'], [/\bcentimetros?\b|\bcm\b/, 'cm'], [/\bsess(ao|oes)\b/, 'sessão'], [/\baplicac(ao|oes)\b/, 'aplicação']];
// comandos curtos resolvidos sem IA: abrir telas, abrir a ficha de alguém e ajustar o ponto do mapa aberto
function rnComandoLocal(question) {
  var q = rnNorm(question).replace(/[?!.,;:]/g, ' ').replace(/\s+/g, ' ').trim();
  if (!q) return null;
  if (window.RN_MAPA) {
    var m = rnWords2Num(q).match(/^(?:no |o )?ponto (\d+)\s*(?:com |para |pra |fica |ficou |passa para |muda para )?(?:(\d+(?:[.,]\d+)?)\s*(.*))?$/);
    if (m && m[2]) {
      var un = (RN_UN_FALADA.find(function (_ref15) {
        var _ref18 = _slicedToArray(_ref15, 1),
          re = _ref18[0];
        return re.test(m[3] || '');
      }) || [])[1];
      var _r = window.RN_MAPA.ajustar(+m[1], {
        quantidade: +m[2].replace(',', '.'),
        unidade: un
      });
      return _r.erro ? _r.erro : 'Pronto, o ponto ' + m[1] + ' ficou com ' + _r.agora + '.';
    }
  }
  if (q.split(' ').length > 9 || /\b(quanto|quantos|quem|qual|quais|como|porque|por que|me diz|me fala|e me|resume|resumo)\b/.test(q)) return null;
  if (!/^(abr[ae]|abrir|abra|vai|va|ir|me leva|leva|leve|mostra|mostre|mostrar|entra|entre|entrar|quero ver|ver|exibe|exibir)\b/.test(q)) return null;
  var fm = q.match(/\b(ficha|prontuario|cadastro|conversa)\b.*?\b(?:da|do|de)\s+(?:paciente\s+)?(.+)$/);
  if (fm) {
    if (!rnPode('pacientes')) return rnSemAcesso('pacientes').erro;
    var _r2 = rnAcharPaciente(fm[2]);
    if (_r2.erro) return _r2.erro;
    rnAbrirFicha(_r2.p, fm[1] === 'prontuario' ? 'prontuario' : fm[1] === 'conversa' ? 'conversa' : 'dados');
    return 'Abri ' + (fm[1] === 'prontuario' ? 'o prontuário' : fm[1] === 'conversa' ? 'a conversa' : 'a ficha') + ' de ' + _r2.p.nome + '.';
  }
  var d = RN_DESTINOS.find(function (_ref28) {
    var _ref29 = _slicedToArray(_ref28, 2),
      re = _ref29[1];
    return re.test(q);
  });
  if (!d) return null;
  var r = rnIrPara(d[0]);
  return r.aberta ? 'Pronto, abri ' + d[2] + '.' : r.erro;
}

/* =====================================================================
   FERRAMENTAS NOVAS DA RENATA
   ===================================================================== */
var RN_ABRIR = RENATA_TOOLS.findIndex(function (t) {
  return t.name === 'abrir_tela';
});
var RN_TOOL_ABRIR = {
  name: 'abrir_tela',
  description: 'Abre uma tela ou aba do sistema Salute IA para a pessoa. Use quando ela pedir para abrir, ir para ou mostrar uma tela ou aba.',
  inputSchema: {
    type: 'object',
    properties: {
      tela: {
        type: 'string',
        "enum": RN_DESTINOS.map(function (d) {
          return d[0];
        }),
        description: 'gestao fica dentro de estoque e financeiro; configuracoes.* são as abas de Configurações'
      }
    },
    required: ['tela']
  },
  execute: function execute(i) {
    var k = String(i.tela || '');
    var d = RN_DESTINOS.find(function (x) {
      return x[0] === k;
    }) || RN_DESTINOS.find(function (x) {
      return x[0] === {
        gestao: 'estoque',
        perfil: 'configuracoes'
      }[k];
    });
    return d ? rnIrPara(d[0]) : {
      aberta: false,
      erro: 'Tela desconhecida'
    };
  }
};
if (RN_ABRIR >= 0) RENATA_TOOLS[RN_ABRIR] = RN_TOOL_ABRIR;else RENATA_TOOLS.push(RN_TOOL_ABRIR);
RENATA_TOOLS.push({
  name: 'horarios_livres',
  description: 'Lista os horários livres de um dia, por profissional, já descontando agendamentos, bloqueios e o horário de funcionamento. Use antes de propor um agendamento quando a pessoa não disser a hora ou houver conflito.',
  inputSchema: {
    type: 'object',
    properties: {
      data: {
        type: 'string',
        description: 'AAAA-MM-DD'
      },
      profissional: {
        type: 'string'
      },
      duracao_minutos: {
        type: 'number'
      }
    },
    required: ['data']
  },
  execute: function () {
    var _execute = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(i) {
      var iso, pros, durH, out, _iterator4, _step4, pr, l, exp, _t6;
      return _regenerator().w(function (_context0) {
        while (1) switch (_context0.p = _context0.n) {
          case 0:
            if (rnPode('agenda')) {
              _context0.n = 1;
              break;
            }
            return _context0.a(2, rnSemAcesso('agenda'));
          case 1:
            iso = rnDataOk(i.data);
            if (iso) {
              _context0.n = 2;
              break;
            }
            return _context0.a(2, {
              erro: 'Informe a data no formato AAAA-MM-DD.'
            });
          case 2:
            if (!SB_ON) {
              _context0.n = 3;
              break;
            }
            _context0.n = 3;
            return agendaGarantirMes(new Date(iso + 'T12:00:00'));
          case 3:
            pros = i.profissional ? [rnAcharProf(i.profissional)].filter(Boolean) : PROS.map(function (p, k) {
              return _objectSpread(_objectSpread({}, p), {}, {
                i: k
              });
            });
            if (pros.length) {
              _context0.n = 4;
              break;
            }
            return _context0.a(2, {
              erro: 'Não encontrei esse profissional. Profissionais: ' + PROS.map(function (p) {
                return p.n;
              }).join(', ')
            });
          case 4:
            durH = Math.max(15, Number(i.duracao_minutos) || 60) / 60, out = [];
            _iterator4 = _createForOfIteratorHelper(pros);
            _context0.p = 5;
            _iterator4.s();
          case 6:
            if ((_step4 = _iterator4.n()).done) {
              _context0.n = 10;
              break;
            }
            pr = _step4.value;
            _context0.n = 7;
            return rnLivres(iso, pr, durH);
          case 7:
            l = _context0.v;
            if (l) {
              _context0.n = 8;
              break;
            }
            return _context0.a(2, {
              data: dBR(iso),
              fechado: true
            });
          case 8:
            out.push({
              profissional: pr.n,
              livres: l.livres.slice(0, 16).map(rnHM2),
              total: l.livres.length
            });
          case 9:
            _context0.n = 6;
            break;
          case 10:
            _context0.n = 12;
            break;
          case 11:
            _context0.p = 11;
            _t6 = _context0.v;
            _iterator4.e(_t6);
          case 12:
            _context0.p = 12;
            _iterator4.f();
            return _context0.f(12);
          case 13:
            exp = rnExpediente(iso);
            return _context0.a(2, {
              data: dBR(iso),
              dia: rnDiaTxt(iso),
              expediente: rnHM2(exp[0]) + ' às ' + rnHM2(exp[1]),
              duracaoMinutos: Math.round(durH * 60),
              profissionais: out
            });
        }
      }, _callee0, null, [[5, 11, 12, 13]]);
    }));
    function execute(_x22) {
      return _execute.apply(this, arguments);
    }
    return execute;
  }()
}, {
  name: 'propor_agendamento',
  description: 'Prepara, SEM gravar, um agendamento para a pessoa confirmar. Confere conflito de horário e o funcionamento da clínica. Se o paciente não existir, ofereça cadastrar antes.',
  inputSchema: {
    type: 'object',
    properties: {
      paciente: {
        type: 'string'
      },
      data: {
        type: 'string',
        description: 'AAAA-MM-DD'
      },
      hora: {
        type: 'string',
        description: 'HH:MM'
      },
      profissional: {
        type: 'string'
      },
      procedimento: {
        type: 'string'
      },
      duracao_minutos: {
        type: 'number'
      },
      tipo: {
        type: 'string',
        "enum": ['consulta', 'primeira_consulta', 'retorno']
      },
      enviar_confirmacao_whatsapp: {
        type: 'boolean'
      }
    },
    required: ['paciente', 'data', 'hora']
  },
  execute: function () {
    var _execute2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(i) {
      var rp, p, iso, hh, proc, pr, aptos, k, dur, durH, t, l, perto, resumo;
      return _regenerator().w(function (_context10) {
        while (1) switch (_context10.n) {
          case 0:
            if (rnPode('agenda')) {
              _context10.n = 1;
              break;
            }
            return _context10.a(2, rnSemAcesso('agenda'));
          case 1:
            rp = rnAcharPaciente(i.paciente);
            if (!rp.erro) {
              _context10.n = 2;
              break;
            }
            return _context10.a(2, rp);
          case 2:
            p = rp.p;
            iso = rnDataOk(i.data), hh = rnHora(i.hora);
            if (!(!iso || !hh)) {
              _context10.n = 3;
              break;
            }
            return _context10.a(2, {
              erro: 'Qual dia e horário?'
            });
          case 3:
            if (!(iso < TODAY_ISO || iso === TODAY_ISO && rnDec(hh) < BR.horaDec())) {
              _context10.n = 4;
              break;
            }
            return _context10.a(2, {
              erro: 'Esse horário já passou.'
            });
          case 4:
            proc = i.procedimento ? rnProcNome(i.procedimento) : null;
            if (!(i.procedimento && !proc)) {
              _context10.n = 5;
              break;
            }
            return _context10.a(2, {
              erro: 'Não achei o procedimento ' + i.procedimento + '. Procedimentos: ' + FIN_PROCS.map(function (x) {
                return x.n;
              }).join(', ')
            });
          case 5:
            pr = i.profissional ? rnAcharProf(i.profissional) : null;
            if (!(i.profissional && !pr)) {
              _context10.n = 6;
              break;
            }
            return _context10.a(2, {
              erro: 'Não achei o profissional ' + i.profissional + '. Profissionais: ' + PROS.map(function (x) {
                return x.n;
              }).join(', ')
            });
          case 6:
            if (pr) {
              _context10.n = 8;
              break;
            }
            aptos = proc ? PROF0.filter(function (x) {
              return (x.procs || []).includes(proc);
            }) : [];
            k = aptos.length === 1 ? PROS.findIndex(function (x) {
              return x.n === aptos[0].nome;
            }) : PROS.length === 1 ? 0 : -1;
            if (!(k < 0)) {
              _context10.n = 7;
              break;
            }
            return _context10.a(2, {
              erro: 'Com qual profissional? ' + PROS.map(function (x) {
                return x.n;
              }).join(', ')
            });
          case 7:
            pr = _objectSpread(_objectSpread({}, PROS[k]), {}, {
              i: k
            });
          case 8:
            if (!SB_ON) {
              _context10.n = 9;
              break;
            }
            _context10.n = 9;
            return agendaGarantirMes(new Date(iso + 'T12:00:00'));
          case 9:
            dur = Number(i.duracao_minutos) || proc && PROC_DUR[proc] || 60, durH = dur / 60, t = rnDec(hh);
            _context10.n = 10;
            return rnLivres(iso, pr, durH);
          case 10:
            l = _context10.v;
            if (l) {
              _context10.n = 11;
              break;
            }
            return _context10.a(2, {
              erro: 'A clínica não atende nesse dia (' + rnDiaTxt(iso) + ').'
            });
          case 11:
            if (!(t < l.exp[0] || t + durH > l.exp[1] + 1e-9)) {
              _context10.n = 12;
              break;
            }
            return _context10.a(2, {
              erro: 'Fora do horário de atendimento desse dia (' + rnHM2(l.exp[0]) + ' às ' + rnHM2(l.exp[1]) + ').'
            });
          case 12:
            if (!l.occ.some(function (_ref30) {
              var _ref31 = _slicedToArray(_ref30, 2),
                a = _ref31[0],
                b = _ref31[1];
              return t < b - 1e-9 && t + durH > a + 1e-9;
            })) {
              _context10.n = 13;
              break;
            }
            perto = l.livres.slice().sort(function (a, b) {
              return Math.abs(a - t) - Math.abs(b - t);
            }).slice(0, 3).sort(function (a, b) {
              return a - b;
            }).map(rnHM2);
            return _context10.a(2, {
              erro: pr.n + ' já tem compromisso nesse horário.' + (perto.length ? ' Livres perto: ' + perto.join(', ') + '.' : ' Não há horário livre nesse dia.')
            });
          case 13:
            resumo = 'Agendar **' + p.nome + '** para **' + rnDiaTxt(iso) + ' às ' + hh + '** com **' + pr.n + '**' + (proc ? ' (' + proc + ')' : '') + '?';
            return _context10.a(2, rnCmd('agendamento', 'AGENDAMENTO', [{
              icon: 'calendar-plus',
              c: '#1F5EFF',
              t: 'Agendar · ' + p.nome,
              s: rnDiaTxt(iso) + ' às ' + hh + ' · ' + pr.n + (proc ? ' · ' + proc : ''),
              v: dur + ' min'
            }], resumo, /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
              var ag;
              return _regenerator().w(function (_context1) {
                while (1) switch (_context1.n) {
                  case 0:
                    if (SB_ON) {
                      _context1.n = 1;
                      break;
                    }
                    APPT_STORE.v = [].concat(_toConsumableArray(APPT_STORE.v), [{
                      id: Date.now(),
                      pac: p.nome,
                      col: pr.i,
                      date: iso,
                      h: t,
                      proc: proc || ''
                    }]);
                    avisar(APPT_STORE);
                    return _context1.a(2, {
                      texto: 'Pronto! Agendei ' + rnPrimeiro(p.nome) + ' para ' + rnDiaTxt(iso) + ' às ' + hh + ' com ' + pr.n + '.'
                    });
                  case 1:
                    _context1.n = 2;
                    return AgSvc.criar({
                      pacienteId: p.dbId,
                      pacienteNome: p.nome,
                      profissionalId: pr.id,
                      inicio: BR.instante(iso, hh),
                      minutos: dur,
                      procedimento: proc,
                      whatsapp: i.enviar_confirmacao_whatsapp !== false,
                      origem: 'renata_ia',
                      tipo: i.tipo
                    });
                  case 2:
                    ag = _context1.v;
                    PacSvc.hist(p, {
                      t: 'Agendamento feito pela Renata IA',
                      s: dBR(iso) + ' às ' + hh + ' · ' + pr.n + (proc ? ' · ' + proc : ''),
                      c: '#7B4BC4',
                      tipo: 'agendamento',
                      origem: 'renata_ia',
                      tabela: 'agendamentos',
                      registro: ag.id
                    });
                    return _context1.a(2, {
                      texto: 'Pronto! Agendei ' + rnPrimeiro(p.nome) + ' para ' + rnDiaTxt(iso) + ' às ' + hh + ' com ' + pr.n + '.',
                      gerados: [{
                        tabela: 'agendamentos',
                        id: ag.id
                      }]
                    });
                }
              }, _callee1);
            })), {
              paciente: p.nome,
              data: iso,
              hora: hh,
              profissional: pr.n,
              procedimento: proc,
              duracao: dur
            }));
        }
      }, _callee10);
    }));
    function execute(_x23) {
      return _execute2.apply(this, arguments);
    }
    return execute;
  }()
}, {
  name: 'propor_alteracao_agendamento',
  description: 'Prepara, SEM gravar, a remarcação, o cancelamento ou a confirmação do agendamento de um paciente. Sem data atual, usa o próximo agendamento dele.',
  inputSchema: {
    type: 'object',
    properties: {
      paciente: {
        type: 'string'
      },
      acao: {
        type: 'string',
        "enum": ['remarcar', 'cancelar', 'confirmar']
      },
      data_atual: {
        type: 'string',
        description: 'AAAA-MM-DD do agendamento que vai mudar'
      },
      hora_atual: {
        type: 'string'
      },
      nova_data: {
        type: 'string'
      },
      nova_hora: {
        type: 'string'
      }
    },
    required: ['paciente', 'acao']
  },
  execute: function () {
    var _execute3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(i) {
      var rp, p, lista, ag, col, pr, quando, stId, recarregar, cancelar, iso, hh, durH, t, l, perto, novo;
      return _regenerator().w(function (_context14) {
        while (1) switch (_context14.n) {
          case 0:
            if (rnPode('agenda')) {
              _context14.n = 1;
              break;
            }
            return _context14.a(2, rnSemAcesso('agenda'));
          case 1:
            rp = rnAcharPaciente(i.paciente);
            if (!rp.erro) {
              _context14.n = 2;
              break;
            }
            return _context14.a(2, rp);
          case 2:
            p = rp.p;
            lista = APPT_STORE.v.filter(function (a) {
              return (SB_ON ? a.pacId === p.dbId : a.pac === p.nome) && a.status !== 'cancelado' && a.date >= (i.data_atual ? '0000' : TODAY_ISO);
            }).sort(function (a, b) {
              return (a.date + rnHmAg(a)).localeCompare(b.date + rnHmAg(b));
            });
            ag = i.data_atual ? lista.find(function (a) {
              return a.date === rnDataOk(i.data_atual) && (!i.hora_atual || rnHmAg(a) === rnHora(i.hora_atual));
            }) : lista[0];
            if (ag) {
              _context14.n = 3;
              break;
            }
            return _context14.a(2, {
              erro: 'Não encontrei agendamento ' + (i.data_atual ? 'de ' + p.nome + ' em ' + dBR(rnDataOk(i.data_atual) || '') : 'futuro de ' + p.nome) + '.'
            });
          case 3:
            col = SB_ON ? PROS.findIndex(function (x) {
              return x.id === ag.profId;
            }) : ag.col;
            pr = _objectSpread(_objectSpread({}, PROS[col] || {
              n: ''
            }), {}, {
              i: col
            });
            quando = rnDiaTxt(ag.date) + ' às ' + rnHmAg(ag);
            stId = function stId(k) {
              return ((CAT.v.status || []).find(function (s) {
                return s.chave === k;
              }) || {}).id;
            };
            recarregar = /*#__PURE__*/function () {
              var _ref33 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
                var full;
                return _regenerator().w(function (_context11) {
                  while (1) switch (_context11.n) {
                    case 0:
                      _context11.n = 1;
                      return DB.ler(DB.sel('agendamentos', AG_SELECT).eq('id', ag.dbId));
                    case 1:
                      full = _context11.v;
                      if (full[0]) {
                        APPT_STORE.v = APPT_STORE.v.map(function (x) {
                          return x.id === ag.id ? agTela(full[0]) : x;
                        });
                        avisar(APPT_STORE);
                      }
                    case 2:
                      return _context11.a(2);
                  }
                }, _callee11);
              }));
              return function recarregar() {
                return _ref33.apply(this, arguments);
              };
            }();
            if (!(i.acao === 'cancelar' || i.acao === 'confirmar')) {
              _context14.n = 4;
              break;
            }
            cancelar = i.acao === 'cancelar';
            return _context14.a(2, rnCmd('alteracao_agendamento', cancelar ? 'CANCELAR AGENDAMENTO' : 'CONFIRMAR AGENDAMENTO', [{
              icon: cancelar ? 'calendar-x' : 'calendar-check',
              c: cancelar ? '#E5484D' : '#7B4BC4',
              t: (cancelar ? 'Cancelar · ' : 'Confirmar · ') + p.nome,
              s: quando + (pr.n ? ' · ' + pr.n : '') + (ag.proc ? ' · ' + ag.proc : ''),
              v: ''
            }], (cancelar ? 'Cancelar o agendamento de **' : 'Marcar como confirmado o agendamento de **') + p.nome + '** de **' + quando + '**?', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
              return _regenerator().w(function (_context12) {
                while (1) switch (_context12.n) {
                  case 0:
                    if (SB_ON) {
                      _context12.n = 1;
                      break;
                    }
                    if (cancelar) {
                      APPT_STORE.v = APPT_STORE.v.filter(function (x) {
                        return x.id !== ag.id;
                      });
                      avisar(APPT_STORE);
                    }
                    return _context12.a(2, {
                      texto: cancelar ? 'Pronto, cancelei o agendamento de ' + rnPrimeiro(p.nome) + '.' : 'Pronto, marquei como confirmado.'
                    });
                  case 1:
                    _context12.n = 2;
                    return DB.upd('agendamentos', ag.dbId, {
                      status_agendamento_id: stId(cancelar ? 'cancelado' : 'confirmado')
                    }, 'Não foi possível atualizar o agendamento');
                  case 2:
                    _context12.n = 3;
                    return recarregar();
                  case 3:
                    PacSvc.hist(p, {
                      t: (cancelar ? 'Agendamento cancelado' : 'Agendamento confirmado') + ' pela Renata IA',
                      s: quando,
                      c: cancelar ? '#E5484D' : '#7B4BC4',
                      tipo: 'agendamento',
                      origem: 'renata_ia',
                      tabela: 'agendamentos',
                      registro: ag.dbId
                    });
                    return _context12.a(2, {
                      texto: cancelar ? 'Pronto, cancelei o agendamento de ' + rnPrimeiro(p.nome) + ' de ' + quando + '.' : 'Pronto, o agendamento de ' + rnPrimeiro(p.nome) + ' está confirmado.',
                      gerados: [{
                        tabela: 'agendamentos',
                        id: ag.dbId
                      }]
                    });
                }
              }, _callee12);
            })), {
              paciente: p.nome,
              acao: i.acao,
              quando: quando
            }));
          case 4:
            iso = rnDataOk(i.nova_data) || ag.date, hh = rnHora(i.nova_hora);
            if (hh) {
              _context14.n = 5;
              break;
            }
            return _context14.a(2, {
              erro: 'Para qual dia e horário vai remarcar?'
            });
          case 5:
            if (!(iso < TODAY_ISO)) {
              _context14.n = 6;
              break;
            }
            return _context14.a(2, {
              erro: 'Essa data já passou.'
            });
          case 6:
            durH = Math.max(0.25, ag.span || 1), t = rnDec(hh);
            if (!SB_ON) {
              _context14.n = 7;
              break;
            }
            _context14.n = 7;
            return agendaGarantirMes(new Date(iso + 'T12:00:00'));
          case 7:
            _context14.n = 8;
            return rnLivres(iso, pr, durH, ag.id);
          case 8:
            l = _context14.v;
            if (l) {
              _context14.n = 9;
              break;
            }
            return _context14.a(2, {
              erro: 'A clínica não atende nesse dia.'
            });
          case 9:
            if (!(t < l.exp[0] || t + durH > l.exp[1] + 1e-9)) {
              _context14.n = 10;
              break;
            }
            return _context14.a(2, {
              erro: 'Fora do horário de atendimento (' + rnHM2(l.exp[0]) + ' às ' + rnHM2(l.exp[1]) + ').'
            });
          case 10:
            if (!l.occ.some(function (_ref35) {
              var _ref36 = _slicedToArray(_ref35, 2),
                a = _ref36[0],
                b = _ref36[1];
              return t < b - 1e-9 && t + durH > a + 1e-9;
            })) {
              _context14.n = 11;
              break;
            }
            perto = l.livres.slice().sort(function (a, b) {
              return Math.abs(a - t) - Math.abs(b - t);
            }).slice(0, 3).sort(function (a, b) {
              return a - b;
            }).map(rnHM2);
            return _context14.a(2, {
              erro: pr.n + ' já tem compromisso nesse horário.' + (perto.length ? ' Livres perto: ' + perto.join(', ') + '.' : '')
            });
          case 11:
            novo = rnDiaTxt(iso) + ' às ' + hh;
            return _context14.a(2, rnCmd('alteracao_agendamento', 'REMARCAR AGENDAMENTO', [{
              icon: 'calendar-clock',
              c: '#1F5EFF',
              t: 'Remarcar · ' + p.nome,
              s: 'De ' + quando + ' para ' + novo + (pr.n ? ' · ' + pr.n : ''),
              v: Math.round(durH * 60) + ' min'
            }], 'Remarcar **' + p.nome + '** de ' + quando + ' para **' + novo + '**?', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
              var ini, fim;
              return _regenerator().w(function (_context13) {
                while (1) switch (_context13.n) {
                  case 0:
                    if (SB_ON) {
                      _context13.n = 1;
                      break;
                    }
                    APPT_STORE.v = APPT_STORE.v.map(function (x) {
                      return x.id === ag.id ? _objectSpread(_objectSpread({}, x), {}, {
                        date: iso,
                        h: t
                      }) : x;
                    });
                    avisar(APPT_STORE);
                    return _context13.a(2, {
                      texto: 'Pronto, remarquei para ' + novo + '.'
                    });
                  case 1:
                    ini = BR.instante(iso, hh), fim = new Date(ini.getTime() + durH * 3600000);
                    _context13.n = 2;
                    return DB.upd('agendamentos', ag.dbId, {
                      inicio: ini.toISOString(),
                      fim: fim.toISOString(),
                      status_agendamento_id: stId('agendado') || undefined
                    }, 'Não foi possível remarcar');
                  case 2:
                    _context13.n = 3;
                    return recarregar();
                  case 3:
                    PacSvc.hist(p, {
                      t: 'Agendamento remarcado pela Renata IA',
                      s: 'De ' + quando + ' para ' + novo,
                      c: '#1F5EFF',
                      tipo: 'agendamento',
                      origem: 'renata_ia',
                      tabela: 'agendamentos',
                      registro: ag.dbId
                    });
                    return _context13.a(2, {
                      texto: 'Pronto, remarquei ' + rnPrimeiro(p.nome) + ' para ' + novo + '.',
                      gerados: [{
                        tabela: 'agendamentos',
                        id: ag.dbId
                      }]
                    });
                }
              }, _callee13);
            })), {
              paciente: p.nome,
              acao: 'remarcar',
              de: quando,
              para: novo
            }));
        }
      }, _callee14);
    }));
    function execute(_x24) {
      return _execute3.apply(this, arguments);
    }
    return execute;
  }()
}, {
  name: 'propor_cadastro_paciente',
  description: 'Prepara, SEM gravar, o cadastro de um paciente novo. Precisa do nome completo e do WhatsApp com DDD.',
  inputSchema: {
    type: 'object',
    properties: {
      nome: {
        type: 'string'
      },
      whatsapp: {
        type: 'string'
      },
      cpf: {
        type: 'string'
      },
      nascimento: {
        type: 'string',
        description: 'AAAA-MM-DD'
      },
      sexo: {
        type: 'string',
        "enum": ['Feminino', 'Masculino', 'Prefiro não informar']
      },
      email: {
        type: 'string'
      },
      tipo: {
        type: 'string',
        "enum": ['Particular', 'Convênio', 'Empresarial']
      },
      convenio: {
        type: 'string'
      },
      empresa: {
        type: 'string'
      }
    },
    required: ['nome', 'whatsapp']
  },
  execute: function execute(i) {
    if (!rnPode('pacientes')) return rnSemAcesso('pacientes');
    var nome = String(i.nome || '').trim().replace(/\s+/g, ' ').split(' ').map(function (w) {
      return /^(da|de|do|das|dos|e)$/i.test(w) ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    }).join(' ');
    if (nome.split(' ').length < 2) return {
      erro: 'Qual é o nome completo do paciente?'
    };
    var tel = BR.tel(i.whatsapp);
    if (!tel) return {
      erro: 'Qual é o WhatsApp com DDD?'
    };
    var dup = PAC.find(function (p) {
      return BR.tel(p.tel) === tel;
    });
    if (dup) return {
      erro: 'Já existe paciente com esse WhatsApp: ' + dup.nome + '.'
    };
    if (PAC.some(function (p) {
      return rnNorm(p.nome) === rnNorm(nome);
    })) return {
      erro: 'Já existe um paciente chamado ' + nome + '.'
    };
    var cpf = i.cpf ? onlyDigits(i.cpf) : '';
    if (cpf && cpf.length !== 11) return {
      erro: 'O CPF precisa ter 11 números.'
    };
    var nasc = i.nascimento ? BR.dataTela(rnDataOk(i.nascimento) || BR.data(i.nascimento) || '') : '';
    var tipo = i.tipo || (i.convenio ? 'Convênio' : 'Particular');
    var conv = i.convenio ? ((CAT.v.convenios || []).find(function (c) {
      return rnNorm(c.nome).includes(rnNorm(i.convenio));
    }) || {}).nome || null : null;
    if (i.convenio && SB_ON && !conv) return {
      erro: 'Não achei o convênio ' + i.convenio + ' no cadastro da clínica.'
    };
    var d = {
      nome: nome,
      tel: BR.telTela(tel),
      cpf: cpf ? cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4') : '',
      nasc: nasc,
      sexo: i.sexo || '',
      email: i.email || '',
      tipo: tipo,
      conv: conv || (i.convenio ? i.convenio : ''),
      empresa: i.empresa || ''
    };
    return rnCmd('cadastro_paciente', 'CADASTRO DE PACIENTE', [{
      icon: 'user-plus',
      c: '#2DBF6A',
      t: 'Cadastrar · ' + nome,
      s: [d.tel, d.cpf && 'CPF ' + d.cpf, nasc && 'nasc. ' + nasc, d.conv].filter(Boolean).join(' · '),
      v: tipo
    }], 'Cadastrar **' + nome + '** com o WhatsApp **' + d.tel + '**?', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15() {
      var _np, np;
      return _regenerator().w(function (_context15) {
        while (1) switch (_context15.n) {
          case 0:
            if (SB_ON) {
              _context15.n = 1;
              break;
            }
            _np = _objectSpread(_objectSpread({}, d), {}, {
              conv: d.conv || 'Sem convênio'
            });
            PAC_STORE.v = [].concat(_toConsumableArray(PAC_STORE.v), [_np]);
            avisar(PAC_STORE);
            return _context15.a(2, {
              texto: 'Pronto! Cadastrei ' + nome + '.'
            });
          case 1:
            _context15.n = 2;
            return PacSvc.criar(_objectSpread(_objectSpread({}, d), {}, {
              conv: conv || ''
            }), 'renata_ia');
          case 2:
            np = _context15.v;
            return _context15.a(2, {
              texto: 'Pronto! Cadastrei ' + nome + '. Quer que eu já agende ou envie a anamnese?',
              gerados: [{
                tabela: 'pacientes',
                id: np.dbId
              }]
            });
        }
      }, _callee15);
    })), {
      nome: nome,
      whatsapp: d.tel,
      cpf: d.cpf,
      nascimento: nasc,
      tipo: tipo
    });
  }
}, {
  name: 'propor_atualizacao_paciente',
  description: 'Prepara, SEM gravar, a atualização do cadastro de um paciente (WhatsApp, e-mail, CPF, nascimento, sexo, tipo, convênio, empresa ou nome).',
  inputSchema: {
    type: 'object',
    properties: {
      paciente: {
        type: 'string'
      },
      nome: {
        type: 'string'
      },
      whatsapp: {
        type: 'string'
      },
      email: {
        type: 'string'
      },
      cpf: {
        type: 'string'
      },
      nascimento: {
        type: 'string',
        description: 'AAAA-MM-DD'
      },
      sexo: {
        type: 'string',
        "enum": ['Feminino', 'Masculino', 'Prefiro não informar']
      },
      tipo: {
        type: 'string',
        "enum": ['Particular', 'Convênio', 'Empresarial']
      },
      convenio: {
        type: 'string'
      },
      empresa: {
        type: 'string'
      }
    },
    required: ['paciente']
  },
  execute: function execute(i) {
    if (!rnPode('pacientes')) return rnSemAcesso('pacientes');
    var rp = rnAcharPaciente(i.paciente);
    if (rp.erro) return rp;
    var p = rp.p;
    var mud = {},
      extra = {},
      linhas = [];
    if (i.whatsapp) {
      var t = BR.tel(i.whatsapp);
      if (!t) return {
        erro: 'Esse WhatsApp não parece válido. Fale com DDD.'
      };
      mud.tel = BR.telTela(t);
      linhas.push('WhatsApp ' + mud.tel);
    }
    if (i.nome) {
      mud.nome = String(i.nome).trim();
      linhas.push('nome ' + mud.nome);
    }
    if (i.nascimento) {
      var n = rnDataOk(i.nascimento) || BR.data(i.nascimento);
      if (!n) return {
        erro: 'Qual a data de nascimento?'
      };
      mud.nasc = BR.dataTela(n);
      linhas.push('nascimento ' + mud.nasc);
    }
    if (i.sexo) {
      mud.sexo = i.sexo;
      linhas.push('sexo ' + i.sexo.toLowerCase());
    }
    if (i.tipo) {
      mud.tipo = i.tipo;
      linhas.push('tipo ' + i.tipo.toLowerCase());
    }
    if (i.empresa) {
      mud.empresa = i.empresa;
      linhas.push('empresa ' + i.empresa);
    }
    if (i.convenio) {
      var c = (CAT.v.convenios || []).find(function (x) {
        return rnNorm(x.nome).includes(rnNorm(i.convenio));
      });
      if (SB_ON && !c) return {
        erro: 'Não achei o convênio ' + i.convenio + '.'
      };
      mud.conv = c ? c.nome : i.convenio;
      if (!i.tipo) mud.tipo = 'Convênio';
      linhas.push('convênio ' + mud.conv);
    }
    if (i.email) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.email)) return {
        erro: 'Esse e-mail não parece válido.'
      };
      extra.email = String(i.email).trim().toLowerCase();
      linhas.push('e-mail ' + extra.email);
    }
    if (i.cpf) {
      var _c = onlyDigits(i.cpf);
      if (_c.length !== 11) return {
        erro: 'O CPF precisa ter 11 números.'
      };
      extra.cpf = _c.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
      linhas.push('CPF ' + extra.cpf);
    }
    if (!linhas.length) return {
      erro: 'O que você quer atualizar no cadastro?'
    };
    return rnCmd('atualizacao_paciente', 'ATUALIZAR CADASTRO', [{
      icon: 'user-pen',
      c: '#1F5EFF',
      t: 'Atualizar · ' + p.nome,
      s: linhas.join(' · '),
      v: ''
    }], 'Atualizar o cadastro de **' + p.nome + '**: ' + linhas.join(', ') + '?', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16() {
      var np, cur, resto;
      return _regenerator().w(function (_context16) {
        while (1) switch (_context16.n) {
          case 0:
            if (SB_ON) {
              _context16.n = 1;
              break;
            }
            np = _objectSpread(_objectSpread(_objectSpread({}, p), mud), extra);
            PAC_STORE.v = PAC_STORE.v.map(function (x) {
              return x.nome === p.nome ? np : x;
            });
            avisar(PAC_STORE);
            return _context16.a(2, {
              texto: 'Pronto, atualizei o cadastro de ' + rnPrimeiro(p.nome) + '.'
            });
          case 1:
            cur = p;
            if (!(mud.tel && mud.tel !== p.tel)) {
              _context16.n = 3;
              break;
            }
            _context16.n = 2;
            return PacSvc.trocarNumero(cur, mud.tel);
          case 2:
            cur = _context16.v;
          case 3:
            resto = _objectSpread({}, mud);
            delete resto.tel; // sem desestruturação com resto: o ajudante do Babel é global e colide entre arquivos
            if (!Object.keys(resto).length) {
              _context16.n = 5;
              break;
            }
            _context16.n = 4;
            return PacSvc.salvar(cur, _objectSpread(_objectSpread({}, cur), resto));
          case 4:
            cur = _context16.v;
          case 5:
            if (!Object.keys(extra).length) {
              _context16.n = 7;
              break;
            }
            _context16.n = 6;
            return DB.upd('pacientes', p.dbId, extra, 'Não foi possível atualizar o cadastro');
          case 6:
            cur = _objectSpread(_objectSpread({}, cur), extra);
            publicarPacientes(PAC.map(function (x) {
              return x.dbId === p.dbId ? cur : x;
            }));
          case 7:
            PacSvc.hist(p, {
              t: 'Cadastro atualizado pela Renata IA',
              s: linhas.join(', '),
              c: '#1F5EFF',
              tipo: 'dados',
              origem: 'renata_ia'
            });
            return _context16.a(2, {
              texto: 'Pronto, atualizei o cadastro de ' + rnPrimeiro(p.nome) + '.',
              gerados: [{
                tabela: 'pacientes',
                id: p.dbId
              }]
            });
        }
      }, _callee16);
    })), {
      paciente: p.nome,
      mudancas: linhas
    });
  }
}, {
  name: 'abrir_paciente',
  description: 'Abre a ficha de um paciente em qualquer tela, na aba de dados, prontuário ou conversa.',
  inputSchema: {
    type: 'object',
    properties: {
      nome: {
        type: 'string'
      },
      aba: {
        type: 'string',
        "enum": ['dados', 'prontuario', 'conversa']
      }
    },
    required: ['nome']
  },
  execute: function execute(i) {
    if (!rnPode('pacientes')) return rnSemAcesso('pacientes');
    var rp = rnAcharPaciente(i.nome);
    if (rp.erro) return rp;
    rnAbrirFicha(rp.p, i.aba);
    return {
      aberta: true,
      paciente: rp.p.nome,
      aba: i.aba || 'dados'
    };
  }
}, {
  name: 'propor_envio_anamnese',
  description: 'Prepara, SEM enviar, o envio do link de anamnese para o WhatsApp do paciente. Sem modelo, usa o padrão da clínica.',
  inputSchema: {
    type: 'object',
    properties: {
      paciente: {
        type: 'string'
      },
      modelo: {
        type: 'string'
      }
    },
    required: ['paciente']
  },
  execute: function execute(i) {
    if (!rnPode('pacientes')) return rnSemAcesso('pacientes');
    var rp = rnAcharPaciente(i.paciente);
    if (rp.erro) return rp;
    var p = rp.p;
    var ms = ANAM_STORE.v || [];
    if (!ms.length) return {
      erro: 'A clínica ainda não tem modelos de anamnese. Crie em Configurações, Cadastro, Modelos de anamnese.'
    };
    var m = i.modelo ? ms.find(function (x) {
      return rnNorm(x.nome).includes(rnNorm(i.modelo)) || rnNorm(i.modelo).includes(rnNorm(x.nome));
    }) : ms.find(function (x) {
      return x.padrao;
    }) || ms[0];
    if (!m) return {
      erro: 'Não achei esse modelo. Modelos: ' + ms.map(function (x) {
        return x.nome;
      }).join(', ')
    };
    if (!p.tel) return {
      erro: p.nome + ' não tem WhatsApp no cadastro.'
    };
    return rnCmd('envio_anamnese', 'ENVIO DE ANAMNESE', [{
      icon: 'clipboard-list',
      c: '#1F5EFF',
      t: 'Enviar · ' + m.nome,
      s: 'Para ' + p.nome + ' no WhatsApp ' + p.tel + ' · link vale 7 dias',
      v: ''
    }], 'Enviar a **' + m.nome + '** para **' + p.nome + '** no WhatsApp?', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17() {
      var r;
      return _regenerator().w(function (_context17) {
        while (1) switch (_context17.n) {
          case 0:
            if (SB_ON) {
              _context17.n = 1;
              break;
            }
            return _context17.a(2, {
              texto: 'Pronto! Enviei a ' + m.nome + ' para ' + rnPrimeiro(p.nome) + ' no WhatsApp.'
            });
          case 1:
            _context17.n = 2;
            return ProntSvc.enviarAnamnese(p, m.nome, 'link');
          case 2:
            r = _context17.v;
            _context17.n = 3;
            return MsgSvc.enviarTextoPaciente(p, 'Olá, ' + rnPrimeiro(p.nome) + '! Para deixarmos tudo pronto para o seu atendimento, responda a ' + m.nome.toLowerCase() + ' neste link: https://' + r.link);
          case 3:
            ANAM_STORE.v = ms.map(function (x) {
              return x.id === m.id ? _objectSpread(_objectSpread({}, x), {}, {
                usos: (x.usos || 0) + 1
              }) : x;
            });
            avisar(ANAM_STORE);
            PacSvc.hist(p, {
              t: 'Anamnese enviada pela Renata IA: ' + m.nome,
              c: KINDS.anamnese.c,
              tipo: 'anamnese',
              origem: 'renata_ia',
              tabela: 'anamnese_envios',
              registro: r.id
            });
            return _context17.a(2, {
              texto: 'Pronto! Enviei a ' + m.nome + ' para ' + rnPrimeiro(p.nome) + ' no WhatsApp.',
              gerados: [{
                tabela: 'anamnese_envios',
                id: r.id
              }]
            });
        }
      }, _callee17);
    })), {
      paciente: p.nome,
      modelo: m.nome
    });
  }
}, {
  name: 'propor_mensagem_paciente',
  description: 'Prepara, SEM enviar, uma mensagem de WhatsApp para um paciente. Escreva o texto final, curto e cordial, em nome da clínica.',
  inputSchema: {
    type: 'object',
    properties: {
      paciente: {
        type: 'string'
      },
      texto: {
        type: 'string'
      }
    },
    required: ['paciente', 'texto']
  },
  execute: function execute(i) {
    if (!rnPode('mensagens')) return rnSemAcesso('mensagens');
    var rp = rnAcharPaciente(i.paciente);
    if (rp.erro) return rp;
    var p = rp.p;
    var texto = String(i.texto || '').trim();
    if (!texto) return {
      erro: 'O que você quer que eu escreva?'
    };
    if (!p.tel) return {
      erro: p.nome + ' não tem WhatsApp no cadastro.'
    };
    return rnCmd('mensagem_paciente', 'MENSAGEM NO WHATSAPP', [{
      icon: 'message-circle',
      c: '#2DBF6A',
      t: 'Para ' + p.nome,
      s: texto,
      v: ''
    }], 'Enviar para **' + p.nome + '**: "' + texto + '"?', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18() {
      return _regenerator().w(function (_context18) {
        while (1) switch (_context18.n) {
          case 0:
            if (SB_ON) {
              _context18.n = 1;
              break;
            }
            return _context18.a(2, {
              texto: 'Pronto! Mensagem enviada para ' + rnPrimeiro(p.nome) + '.'
            });
          case 1:
            _context18.n = 2;
            return MsgSvc.enviarTextoPaciente(p, texto);
          case 2:
            PacSvc.hist(p, {
              t: 'Mensagem enviada pela Renata IA',
              s: texto.slice(0, 120),
              c: '#2DBF6A',
              tipo: 'mensagem',
              origem: 'renata_ia'
            });
            return _context18.a(2, {
              texto: 'Pronto! Mensagem enviada para ' + rnPrimeiro(p.nome) + '.'
            });
        }
      }, _callee18);
    })), {
      paciente: p.nome,
      texto: texto
    });
  }
}, {
  name: 'propor_registro_procedimento',
  description: 'Prepara, SEM gravar, o registro de um procedimento no prontuário do paciente, com materiais usados (que dão baixa no estoque quando realizado) e observações ditadas.',
  inputSchema: {
    type: 'object',
    properties: {
      paciente: {
        type: 'string'
      },
      procedimento: {
        type: 'string'
      },
      profissional: {
        type: 'string'
      },
      data: {
        type: 'string',
        description: 'AAAA-MM-DD'
      },
      hora: {
        type: 'string'
      },
      status: {
        type: 'string',
        "enum": ['Realizado', 'Agendado', 'Cancelado']
      },
      materiais: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            produto: {
              type: 'string'
            },
            quantidade: {
              type: 'number'
            }
          },
          required: ['produto', 'quantidade']
        }
      },
      observacoes: {
        type: 'string'
      },
      regiao: {
        type: 'string',
        description: 'Região tratada, ex.: testa e glabela'
      }
    },
    required: ['paciente', 'procedimento']
  },
  execute: function execute(i) {
    if (!rnPode('pacientes')) return rnSemAcesso('pacientes');
    var rp = rnAcharPaciente(i.paciente);
    if (rp.erro) return rp;
    var p = rp.p;
    var proc = rnProcNome(i.procedimento);
    if (!proc) return {
      erro: 'Não achei o procedimento ' + i.procedimento + '. Procedimentos: ' + FIN_PROCS.map(function (x) {
        return x.n;
      }).join(', ')
    };
    var pro = i.profissional ? (PROF0.find(function (x) {
      var n = rnNorm(x.nome);
      return rnNorm(i.profissional).split(/\s+/).filter(function (w) {
        return w.length > 2 && !/^(dra|doutora|doutor)$/.test(w);
      }).every(function (w) {
        return n.includes(w);
      });
    }) || {}).nome : null;
    if (i.profissional && !pro) return {
      erro: 'Não achei o profissional ' + i.profissional + '.'
    };
    if (!pro) {
      var eu = SB_ON ? PROF0.find(function (x) {
        return x.usuarioId && x.usuarioId === UID();
      }) : null;
      var apto = PROF0.find(function (x) {
        return (x.procs || []).includes(proc);
      });
      pro = (eu || apto || PROF0[0] || {}).nome || '';
    }
    var iso = rnDataOk(i.data) || TODAY_ISO,
      hh = rnHora(i.hora) || nowHM(),
      status = i.status || 'Realizado';
    var mats = [];
    if (i.materiais && i.materiais.length) {
      var _iterator5 = _createForOfIteratorHelper(i.materiais),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var m = _step5.value;
          var pd = rnProdOf(m.produto);
          if (!pd) return {
            erro: 'Não achei ' + m.produto + ' no estoque.'
          };
          var q = Math.round(Number(m.quantidade) * 100) / 100;
          if (!(q > 0)) return {
            erro: 'Qual a quantidade de ' + pd.nome + '?'
          };
          mats.push({
            nome: pd.nome,
            q: q
          });
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    } else mats = (MAT_SUG[proc] || []).map(function (_ref42) {
      var _ref43 = _slicedToArray(_ref42, 2),
        nome = _ref43[0],
        q = _ref43[1];
      return {
        nome: nome,
        q: q
      };
    });
    var obs = String(i.observacoes || '').trim(),
      regiao = String(i.regiao || '').trim();
    return rnCmd('registro_procedimento', 'PROCEDIMENTO NO PRONTUÁRIO', [{
      icon: 'syringe',
      c: '#22C3F2',
      t: proc + ' · ' + p.nome,
      s: dBR(iso).slice(0, 5) + ' às ' + hh + ' · ' + pro + (regiao ? ' · ' + regiao : '') + (obs ? ' · ' + obs.slice(0, 80) : ''),
      v: status
    }].concat(mats.map(function (m) {
      return {
        icon: 'package-minus',
        c: '#E5484D',
        t: m.nome,
        s: status === 'Realizado' ? 'Baixa automática no estoque' : 'Sem baixa enquanto não for realizado',
        v: qFmt(m.q) + ' ' + unPl(unOf(m.nome), m.q < 2 ? 1 : m.q)
      };
    })), 'Registrar **' + proc + '** no prontuário de **' + p.nome + '**' + (mats.length ? ' com ' + mats.map(function (m) {
      return qFmt(m.q) + ' ' + unPl(unOf(m.nome), m.q < 2 ? 1 : m.q) + ' de ' + m.nome;
    }).join(' e ') : '') + '?', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19() {
      var id;
      return _regenerator().w(function (_context19) {
        while (1) switch (_context19.n) {
          case 0:
            if (SB_ON) {
              _context19.n = 1;
              break;
            }
            return _context19.a(2, rnErroDemo('registraria o procedimento no prontuário e daria baixa no estoque'));
          case 1:
            _context19.n = 2;
            return ProntSvc.salvarProc(p, {
              title: proc,
              pro: pro,
              dt: iso + 'T' + hh,
              dur: PROC_DUR[proc] || 30,
              status: status,
              mats: mats,
              obs: obs,
              regiao: regiao
            });
          case 2:
            id = _context19.v.id;
            if (CARGA.v.estoque === 'ok') carregar('estoque', true);
            PacSvc.hist(p, {
              t: 'Procedimento: ' + proc + ' (registrado pela Renata IA)',
              s: pro,
              c: KINDS.proc.c,
              tipo: 'procedimento',
              origem: 'renata_ia',
              tabela: 'procedimentos_realizados',
              registro: id
            });
            return _context19.a(2, {
              texto: 'Pronto! Registrei ' + proc + ' no prontuário de ' + rnPrimeiro(p.nome) + (mats.length && status === 'Realizado' ? ' e dei baixa dos materiais no estoque.' : '.'),
              gerados: [{
                tabela: 'procedimentos_realizados',
                id: id
              }]
            });
        }
      }, _callee19);
    })), {
      paciente: p.nome,
      procedimento: proc,
      profissional: pro,
      data: iso,
      hora: hh,
      status: status,
      materiais: mats,
      observacoes: obs,
      regiao: regiao || undefined
    });
  }
}, {
  name: 'propor_baixa_lancamento',
  description: 'Prepara, SEM gravar, a baixa de uma conta pendente: receita de paciente recebida ou despesa paga. Use quando disserem que alguém pagou o que devia ou que uma conta foi paga.',
  inputSchema: {
    type: 'object',
    properties: {
      tipo: {
        type: 'string',
        "enum": ['receita', 'despesa']
      },
      paciente: {
        type: 'string',
        description: 'Para receita'
      },
      descricao: {
        type: 'string',
        description: 'Para despesa: o que foi pago ou o fornecedor'
      },
      valor: {
        type: 'number'
      },
      forma: {
        type: 'string',
        description: 'Pix, Cartão de crédito, Cartão de débito, Dinheiro, Boleto ou Convênio'
      }
    },
    required: ['tipo']
  },
  execute: function execute(i) {
    if (!rnPode('gestao.financeiro')) return rnSemAcesso('gestao.financeiro');
    var rec = i.tipo !== 'despesa';
    var alvo = rnNorm(rec ? i.paciente : i.descricao);
    if (!alvo) return {
      erro: rec ? 'De qual paciente é o pagamento?' : 'Qual conta foi paga?'
    };
    var ws = alvo.split(/\s+/).filter(function (w) {
      return w.length > 2;
    });
    var c = (rec ? REC_STORE.v : DESP_STORE.v).filter(function (r) {
      return r.status === 'Pendente' && ws.length && ws.every(function (w) {
        return rnNorm(rec ? r.pac : r.desc + ' ' + r.forn + ' ' + r.cat).includes(w);
      });
    });
    if (i.valor) {
      var v = Number(i.valor);
      var exato = c.filter(function (r) {
        return Math.abs((rec ? liq(r) : r.total) - v) < 0.01;
      });
      if (exato.length) c = exato;
    }
    c = c.sort(function (a, b) {
      return a.venc.localeCompare(b.venc);
    });
    if (!c.length) return {
      erro: 'Não encontrei conta pendente ' + (rec ? 'de ' + i.paciente : 'de ' + i.descricao) + (i.valor ? ' de ' + brl(i.valor) : '') + '.'
    };
    if (c.length > 1 && !i.valor) return {
      erro: 'Há ' + c.length + ' pendências: ' + c.slice(0, 4).map(function (r) {
        return brl(rec ? liq(r) : r.total) + ' com vencimento em ' + dBR(r.venc);
      }).join('; ') + '. Qual delas?'
    };
    var r = c[0],
      valor = rec ? liq(r) : r.total,
      forma = i.forma ? rnFormaOf(i.forma) : null;
    return rnCmd('baixa_financeira', rec ? 'RECEBIMENTO' : 'PAGAMENTO', [{
      icon: rec ? 'arrow-down-left' : 'arrow-up-right',
      c: rec ? '#1E9E57' : '#E5484D',
      t: rec ? 'Recebido · ' + r.pac : 'Pago · ' + r.desc,
      s: 'Vencimento ' + dBR(r.venc) + (r.proc ? ' · ' + r.proc : r.cat ? ' · ' + r.cat : '') + ' · ' + (forma || r.forma || 'forma não informada'),
      v: brl(valor)
    }], 'Dar baixa de **' + brl(valor) + '** ' + (rec ? 'recebido de **' + r.pac + '**' : 'pago em **' + r.desc + '**') + ' hoje?', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20() {
      var st, S;
      return _regenerator().w(function (_context20) {
        while (1) switch (_context20.n) {
          case 0:
            st = rec ? 'Recebido' : 'Pago';
            if (!SB_ON) {
              _context20.n = 2;
              break;
            }
            _context20.n = 1;
            return FinSvc.status(rec ? 'rec' : 'desp', r, st);
          case 1:
            if (!forma) {
              _context20.n = 2;
              break;
            }
            _context20.n = 2;
            return DB.upd(rec ? 'contas_receber' : 'contas_pagar', r.dbId, {
              forma_pagamento_id: catId('formas', forma)
            }, 'Não foi possível salvar a forma de pagamento');
          case 2:
            S = rec ? REC_STORE : DESP_STORE;
            S.v = S.v.map(function (x) {
              return x.id === r.id ? _objectSpread(_objectSpread({}, x), {}, {
                status: st,
                forma: forma || x.forma
              }) : x;
            });
            avisar(S);
            return _context20.a(2, {
              texto: 'Pronto! Dei baixa de ' + brl(valor) + (rec ? ' recebido de ' + rnPrimeiro(r.pac) : ' pago em ' + r.desc) + '.',
              gerados: SB_ON ? [{
                tabela: rec ? 'contas_receber' : 'contas_pagar',
                id: r.dbId
              }] : []
            });
        }
      }, _callee20);
    })), {
      tipo: rec ? 'receita' : 'despesa',
      referencia: rec ? r.pac : r.desc,
      valor: valor,
      forma: forma
    });
  }
}, {
  name: 'contas_a_vencer',
  description: 'Lista as contas a receber e a pagar que vencem nos próximos dias e as que estão em atraso.',
  inputSchema: {
    type: 'object',
    properties: {
      dias: {
        type: 'number',
        description: 'Quantos dias para frente (padrão 7)'
      }
    }
  },
  execute: function execute(i) {
    if (!rnPode('gestao.financeiro')) return rnSemAcesso('gestao.financeiro');
    var ate = rnIso(addD(TODAY, Math.max(1, Math.min(90, Number(i.dias) || 7))));
    var rec = REC_STORE.v.filter(function (r) {
        return r.status === 'Pendente';
      }),
      des = DESP_STORE.v.filter(function (d) {
        return d.status === 'Pendente';
      });
    var fr = function fr(r) {
        return {
          paciente: r.pac,
          valor: liq(r),
          vencimento: dBR(r.venc),
          procedimento: r.proc || undefined
        };
      },
      fd = function fd(d) {
        return {
          descricao: d.desc,
          valor: d.total,
          vencimento: dBR(d.venc),
          fornecedor: d.forn
        };
      };
    var vr = rec.filter(function (r) {
        return r.venc >= TODAY_ISO && r.venc <= ate;
      }).sort(function (a, b) {
        return a.venc.localeCompare(b.venc);
      }),
      vd = des.filter(function (d) {
        return d.venc >= TODAY_ISO && d.venc <= ate;
      }).sort(function (a, b) {
        return a.venc.localeCompare(b.venc);
      });
    var ar = rec.filter(function (r) {
        return r.venc < TODAY_ISO;
      }),
      ad = des.filter(function (d) {
        return d.venc < TODAY_ISO;
      });
    return {
      ate: dBR(ate),
      aReceber: {
        total: Math.round(rnSum(vr, liq)),
        itens: vr.slice(0, 15).map(fr)
      },
      aPagar: {
        total: Math.round(rnSum(vd, function (d) {
          return d.total;
        })),
        itens: vd.slice(0, 15).map(fd)
      },
      emAtraso: {
        receber: Math.round(rnSum(ar, liq)),
        lancamentosReceber: ar.length,
        pagar: Math.round(rnSum(ad, function (d) {
          return d.total;
        })),
        lancamentosPagar: ad.length
      }
    };
  }
}, {
  name: 'saldo_estoque',
  description: 'Diz o saldo de um produto do estoque (quantidade, mínimo e validade) ou, sem produto, o que está abaixo do mínimo e vencendo.',
  inputSchema: {
    type: 'object',
    properties: {
      produto: {
        type: 'string'
      }
    }
  },
  execute: function execute(i) {
    if (!rnPode('gestao.estoque')) return rnSemAcesso('gestao.estoque');
    if (i.produto) {
      var p = rnProdOf(i.produto);
      if (!p) return {
        erro: 'Não achei ' + i.produto + ' no estoque.'
      };
      return {
        produto: p.nome,
        quantidade: p.qtd,
        unidade: p.un,
        minimo: p.min,
        validade: p.val ? dBR(p.val) : 'não informada',
        status: STATUS_EST[estStatus(p)][0]
      };
    }
    var e = rnEstoque();
    return {
      abaixoDoMinimo: e.abaixoDoMinimo,
      vencendoEm60dias: e.venceEmBreve60dias,
      vencidos: e.vencidos
    };
  }
}, {
  name: 'propor_etapa_lead',
  description: 'Prepara, SEM gravar, a mudança de etapa de um lead no CRM (Novo, Aguardando atendente, Agendado, Confirmado, Em atendimento, Finalizado ou Perdido).',
  inputSchema: {
    type: 'object',
    properties: {
      lead: {
        type: 'string',
        description: 'Nome ou telefone do lead'
      },
      etapa: {
        type: 'string'
      },
      motivo_perda: {
        type: 'string'
      }
    },
    required: ['lead', 'etapa']
  },
  execute: function () {
    var _execute4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(i) {
      var l, t, et, motivo, de;
      return _regenerator().w(function (_context22) {
        while (1) switch (_context22.n) {
          case 0:
            if (rnPode('mensagens')) {
              _context22.n = 1;
              break;
            }
            return _context22.a(2, rnSemAcesso('mensagens'));
          case 1:
            if (!SB_ON) {
              _context22.n = 2;
              break;
            }
            _context22.n = 2;
            return carregar('crm');
          case 2:
            l = rnAcharLead(i.lead);
            if (!l.erro) {
              _context22.n = 3;
              break;
            }
            return _context22.a(2, l);
          case 3:
            t = rnNorm(i.etapa);
            et = CRM_STAGES.find(function (s) {
              return s.id === i.etapa || rnNorm(s.label) === t;
            }) || CRM_STAGES.find(function (s) {
              return rnNorm(s.label).includes(t) || t.includes(rnNorm(s.label));
            });
            if (et) {
              _context22.n = 4;
              break;
            }
            return _context22.a(2, {
              erro: 'Etapas do CRM: ' + CRM_STAGES.map(function (s) {
                return s.label;
              }).join(', ') + '.'
            });
          case 4:
            motivo = et.id === 'perdido' ? CRM_MOTIVOS.find(function (m) {
              return rnNorm(m).includes(rnNorm(i.motivo_perda || '#'));
            }) || (i.motivo_perda ? 'Outro' : null) : null;
            if (!(et.id === 'perdido' && !motivo)) {
              _context22.n = 5;
              break;
            }
            return _context22.a(2, {
              erro: 'Qual o motivo da perda? ' + CRM_MOTIVOS.join(', ') + '.'
            });
          case 5:
            de = (CRM_STAGES.find(function (s) {
              return s.id === l.lead.stage;
            }) || {
              label: l.lead.stage
            }).label;
            return _context22.a(2, rnCmd('etapa_lead', 'CRM', [{
              icon: 'kanban',
              c: et.c || '#7B4BC4',
              t: 'Mover · ' + crmName(l.lead),
              s: de + ' para ' + et.label + (motivo ? ' · ' + motivo : ''),
              v: ''
            }], 'Mover **' + crmName(l.lead) + '** de ' + de + ' para **' + et.label + '**?', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21() {
              return _regenerator().w(function (_context21) {
                while (1) switch (_context21.n) {
                  case 0:
                    if (!SB_ON) {
                      _context21.n = 1;
                      break;
                    }
                    _context21.n = 1;
                    return CrmSvc.mover(l.lead, et.id, motivo);
                  case 1:
                    LEADS_STORE.v = LEADS_STORE.v.map(function (x) {
                      return x.id === l.lead.id ? _objectSpread(_objectSpread({}, x), {}, {
                        stage: et.id,
                        motivo: motivo || undefined
                      }) : x;
                    });
                    avisar(LEADS_STORE);
                    return _context21.a(2, {
                      texto: 'Pronto, ' + crmName(l.lead) + ' está em ' + et.label + '.',
                      gerados: SB_ON ? [{
                        tabela: 'leads',
                        id: l.lead.dbId
                      }] : []
                    });
                }
              }, _callee21);
            })), {
              lead: crmName(l.lead),
              de: de,
              para: et.label,
              motivo: motivo
            }));
        }
      }, _callee22);
    }));
    function execute(_x25) {
      return _execute4.apply(this, arguments);
    }
    return execute;
  }()
}, {
  name: 'propor_ia_lead',
  description: 'Prepara, SEM gravar, ligar ou pausar a Renata no atendimento de um lead do WhatsApp (quando pausada, a equipe assume a conversa).',
  inputSchema: {
    type: 'object',
    properties: {
      lead: {
        type: 'string'
      },
      ligar: {
        type: 'boolean'
      }
    },
    required: ['lead', 'ligar']
  },
  execute: function () {
    var _execute5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee24(i) {
      var l, ligar;
      return _regenerator().w(function (_context24) {
        while (1) switch (_context24.n) {
          case 0:
            if (rnPode('mensagens')) {
              _context24.n = 1;
              break;
            }
            return _context24.a(2, rnSemAcesso('mensagens'));
          case 1:
            if (!SB_ON) {
              _context24.n = 2;
              break;
            }
            _context24.n = 2;
            return carregar('crm');
          case 2:
            l = rnAcharLead(i.lead);
            if (!l.erro) {
              _context24.n = 3;
              break;
            }
            return _context24.a(2, l);
          case 3:
            ligar = !!i.ligar;
            if (!(!!l.lead.ia === ligar)) {
              _context24.n = 4;
              break;
            }
            return _context24.a(2, {
              erro: 'A IA já está ' + (ligar ? 'ligada' : 'pausada') + ' para ' + crmName(l.lead) + '.'
            });
          case 4:
            return _context24.a(2, rnCmd('ia_lead', ligar ? 'RETOMAR IA' : 'PAUSAR IA', [{
              icon: ligar ? 'bot' : 'user-round-check',
              c: ligar ? '#7B4BC4' : '#F2694A',
              t: (ligar ? 'Retomar a IA · ' : 'Pausar a IA · ') + crmName(l.lead),
              s: ligar ? 'A Renata volta a responder' : 'A equipe assume a conversa',
              v: ''
            }], (ligar ? 'Retomar a Renata no atendimento de **' : 'Pausar a Renata e passar para a equipe o atendimento de **') + crmName(l.lead) + '**?', /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23() {
              return _regenerator().w(function (_context23) {
                while (1) switch (_context23.n) {
                  case 0:
                    if (!SB_ON) {
                      _context23.n = 1;
                      break;
                    }
                    _context23.n = 1;
                    return CrmSvc.ia(l.lead, ligar);
                  case 1:
                    LEADS_STORE.v = LEADS_STORE.v.map(function (x) {
                      return x.id === l.lead.id ? _objectSpread(_objectSpread({}, x), {}, {
                        ia: ligar
                      }) : x;
                    });
                    avisar(LEADS_STORE);
                    return _context23.a(2, {
                      texto: ligar ? 'Pronto, a Renata voltou a responder ' + crmName(l.lead) + '.' : 'Pronto, pausei a IA. A equipe assume a conversa com ' + crmName(l.lead) + '.',
                      gerados: SB_ON ? [{
                        tabela: 'leads',
                        id: l.lead.dbId
                      }] : []
                    });
                }
              }, _callee23);
            })), {
              lead: crmName(l.lead),
              ligar: ligar
            }));
        }
      }, _callee24);
    }));
    function execute(_x26) {
      return _execute5.apply(this, arguments);
    }
    return execute;
  }()
}, {
  name: 'ajustar_ponto_mapa',
  description: 'Ajusta um ponto do mapeamento que está aberto na tela, pelo número do ponto: quantidade, unidade, produto ou comentário, ou exclui o ponto. A mudança aparece na hora e é salva sozinha.',
  inputSchema: {
    type: 'object',
    properties: {
      numero: {
        type: 'number'
      },
      quantidade: {
        type: 'number'
      },
      unidade: {
        type: 'string',
        "enum": ['U', 'ml', 'seringa', 'mg', 'un', 'cm', 'sessão', 'aplicação']
      },
      produto: {
        type: 'string'
      },
      comentario: {
        type: 'string'
      },
      excluir: {
        type: 'boolean'
      }
    },
    required: ['numero']
  },
  execute: function execute(i) {
    return window.RN_MAPA ? window.RN_MAPA.ajustar(Number(i.numero), i) : {
      erro: 'Nenhum mapeamento aberto. Abra o mapeamento no prontuário do paciente e peça de novo.'
    };
  }
});
function rnAcharLead(q) {
  var t = rnNorm(q).replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim(),
    dig = onlyDigits(q);
  var c = LEADS_STORE.v.filter(function (l) {
    return dig.length >= 8 && onlyDigits(l.tel).endsWith(dig.slice(-8)) || t && l.nome && t.split(' ').filter(function (w) {
      return w.length > 2;
    }).every(function (w) {
      return rnNorm(l.nome).includes(w);
    });
  });
  if (c.length === 1) return {
    lead: c[0]
  };
  if (c.length > 1) return {
    erro: 'Encontrei mais de um lead: ' + c.slice(0, 5).map(crmName).join(', ') + '. Qual deles?'
  };
  return {
    erro: 'Não encontrei esse lead no CRM.'
  };
}
Object.assign(RN_TOOL_LABEL, {
  horarios_livres: 'Vendo os horários livres',
  propor_agendamento: 'Preparando o agendamento',
  propor_alteracao_agendamento: 'Preparando a alteração',
  propor_cadastro_paciente: 'Preparando o cadastro',
  propor_atualizacao_paciente: 'Preparando a atualização',
  abrir_paciente: 'Abrindo a ficha',
  propor_envio_anamnese: 'Preparando o envio',
  propor_mensagem_paciente: 'Preparando a mensagem',
  propor_registro_procedimento: 'Preparando o registro',
  propor_baixa_lancamento: 'Preparando a baixa',
  contas_a_vencer: 'Vendo as contas',
  saldo_estoque: 'Consultando o estoque',
  propor_etapa_lead: 'Preparando a mudança no CRM',
  propor_ia_lead: 'Preparando a mudança na IA',
  ajustar_ponto_mapa: 'Ajustando o mapa'
});

/* =====================================================================
   OUVIR: reconhecimento do navegador ou transcrição pela ElevenLabs
   ===================================================================== */
function rnOuvirWeb(_ref48) {
  var continuo = _ref48.continuo,
    aoParcial = _ref48.aoParcial,
    aoFim = _ref48.aoFim,
    aoErro = _ref48.aoErro;
  var r;
  try {
    r = new RN_SR();
  } catch (e) {
    aoErro('nostt');
    return null;
  }
  r.lang = 'pt-BR';
  r.interimResults = true;
  r.continuous = !!continuo;
  var fin = '',
    inter = '',
    acabou = false,
    cancelado = false,
    timer = null;
  r.onresult = function (e) {
    fin = '';
    inter = '';
    for (var k = 0; k < e.results.length; k++) {
      if (e.results[k].isFinal) fin += e.results[k][0].transcript;else inter += e.results[k][0].transcript;
    }
    aoParcial((fin + ' ' + inter).replace(/\s+/g, ' ').trim());
    if (continuo) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        try {
          r.stop();
        } catch (x) {}
      }, 2600);
    }
  };
  r.onerror = function (e) {
    if (e.error === 'no-speech' || e.error === 'aborted') return;
    acabou = true;
    clearTimeout(timer);
    aoErro(e.error === 'not-allowed' ? 'denied' : e.error === 'service-not-allowed' ? 'dictation' : e.error === 'audio-capture' ? 'nomic' : e.error === 'network' ? 'network' : 'nostt');
  };
  r.onend = function () {
    clearTimeout(timer);
    if (acabou || cancelado) return;
    acabou = true;
    aoFim((fin + ' ' + inter).replace(/\s+/g, ' ').trim());
  };
  try {
    r.start();
  } catch (e) {
    aoErro('busy');
    return null;
  }
  return {
    parar: function parar() {
      try {
        r.stop();
      } catch (x) {}
    },
    cancelar: function cancelar() {
      cancelado = true;
      clearTimeout(timer);
      try {
        r.abort();
      } catch (x) {}
    }
  };
}
function rnOuvirEleven(_x27) {
  return _rnOuvirEleven.apply(this, arguments);
}
function _rnOuvirEleven() {
  _rnOuvirEleven = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee39(_ref49) {
    var aoParcial, aoFim, aoErro, longo, c, s, chunks, rec, cancelado, ctx, an, AC, buf, falou, ult, piso, t0, _tick2, _t32;
    return _regenerator().w(function (_context40) {
      while (1) switch (_context40.p = _context40.n) {
        case 0:
          aoParcial = _ref49.aoParcial, aoFim = _ref49.aoFim, aoErro = _ref49.aoErro, longo = _ref49.longo;
          _context40.n = 1;
          return rnMicCheck(true);
        case 1:
          c = _context40.v;
          if (c.ok) {
            _context40.n = 2;
            break;
          }
          aoErro(c.why);
          return _context40.a(2, null);
        case 2:
          s = c.stream, chunks = [];
          cancelado = false, ctx = null, an = null;
          _context40.p = 3;
          rec = new MediaRecorder(s);
          _context40.n = 5;
          break;
        case 4:
          _context40.p = 4;
          _t32 = _context40.v;
          s.getTracks().forEach(function (x) {
            return x.stop();
          });
          aoErro('nostt');
          return _context40.a(2, null);
        case 5:
          try {
            AC = window.AudioContext || window.webkitAudioContext;
            ctx = new AC();
            an = ctx.createAnalyser();
            an.fftSize = 1024;
            ctx.createMediaStreamSource(s).connect(an);
          } catch (e) {}
          rec.ondataavailable = function (e) {
            if (e.data && e.data.size) chunks.push(e.data);
          };
          buf = new Float32Array(1024);
          falou = false, ult = Date.now(), piso = 0.008;
          t0 = Date.now();
          _tick2 = function tick() {
            if (rec.state !== 'recording') return;
            var rms = 0;
            if (an) {
              an.getFloatTimeDomainData(buf);
              var sm = 0;
              for (var k = 0; k < buf.length; k++) sm += buf[k] * buf[k];
              rms = Math.sqrt(sm / buf.length);
            }
            if (!falou) piso = piso * 0.9 + rms * 0.1;
            if (rms > Math.max(0.02, piso * 2.5)) {
              falou = true;
              ult = Date.now();
            }
            var agora = Date.now();
            if (falou && agora - ult > (longo ? 2600 : 1100) || agora - t0 > (longo ? 90000 : 25000) || !falou && agora - t0 > 12000) {
              try {
                rec.stop();
              } catch (e) {}
              return;
            }
            setTimeout(_tick2, 60);
          };
          rec.onstop = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee38() {
            var type, fd, r, j, _t30, _t31;
            return _regenerator().w(function (_context39) {
              while (1) switch (_context39.p = _context39.n) {
                case 0:
                  s.getTracks().forEach(function (x) {
                    return x.stop();
                  });
                  try {
                    ctx && ctx.close();
                  } catch (e) {}
                  if (!cancelado) {
                    _context39.n = 1;
                    break;
                  }
                  return _context39.a(2);
                case 1:
                  if (!(!falou && !chunks.length)) {
                    _context39.n = 2;
                    break;
                  }
                  aoFim('');
                  return _context39.a(2);
                case 2:
                  aoParcial('Entendendo o que você disse...');
                  _context39.p = 3;
                  type = rec.mimeType || 'audio/webm', fd = new FormData();
                  fd.append('model_id', 'scribe_v1');
                  fd.append('file', new Blob(chunks, {
                    type: type
                  }), 'fala.' + (/mp4|aac/.test(type) ? 'm4a' : 'webm'));
                  if (SB_ON) {
                    fd.append('acao', 'transcrever');
                    fd.append('clinica_id', CLI());
                    fd.append('segundos', String(Math.round((Date.now() - t0) / 1000)));
                  }
                  if (!SB_ON) {
                    _context39.n = 5;
                    break;
                  }
                  _context39.n = 4;
                  return rnFn(fd);
                case 4:
                  _t30 = _context39.v;
                  _context39.n = 7;
                  break;
                case 5:
                  _context39.n = 6;
                  return fetch('https://api.elevenlabs.io/v1/speech-to-text', {
                    method: 'POST',
                    headers: {
                      'xi-api-key': RN_VOICE.v.key
                    },
                    body: fd
                  });
                case 6:
                  _t30 = _context39.v;
                case 7:
                  r = _t30;
                  _context39.n = 8;
                  return r.json()["catch"](function () {
                    return {};
                  });
                case 8:
                  j = _context39.v;
                  if (r.ok) {
                    _context39.n = 9;
                    break;
                  }
                  throw j;
                case 9:
                  aoFim(String(j.text || '').trim());
                  _context39.n = 11;
                  break;
                case 10:
                  _context39.p = 10;
                  _t31 = _context39.v;
                  aoErro('eleven');
                case 11:
                  return _context39.a(2);
              }
            }, _callee38, null, [[3, 10]]);
          }));
          rec.start();
          setTimeout(_tick2, 60);
          return _context40.a(2, {
            parar: function parar() {
              try {
                rec.stop();
              } catch (e) {}
            },
            cancelar: function cancelar() {
              cancelado = true;
              try {
                rec.stop();
              } catch (e) {}
            }
          });
      }
    }, _callee39, null, [[3, 4]]);
  }));
  return _rnOuvirEleven.apply(this, arguments);
}
var rnMotorVoz = function rnMotorVoz() {
  return RN_SR ? 'web' : RN_VOICE.v.key && window.MediaRecorder ? 'eleven' : null;
};

/* =====================================================================
   PAINEL DO COMANDO DE VOZ
   ===================================================================== */
var VOZ = makeStore({
  aberto: false,
  estado: 'parado',
  ouvido: '',
  resposta: '',
  rotulo: null,
  pend: null,
  pendEstado: null,
  erro: null,
  ditando: false,
  modo: 'comando'
});
var vozSet = function vozSet(p) {
  VOZ.v = _objectSpread(_objectSpread({}, VOZ.v), p);
  VOZ.subs.forEach(function (f) {
    return f();
  });
};
var __vozEsc = null,
  __vozCtl = null,
  __vozFecha = null,
  __vozFalaDemo = true,
  __vozDita = null;
var vozFalaLigada = function vozFalaLigada() {
  if (!SB_ON) return __vozFalaDemo;
  var f = PREF.v && PREF.v.filtros;
  return !(f && f['voz.falar'] === false);
};
function vozFalaSet(on) {
  if (SB_ON && PREF.v) salvarPref({
    filtros: _objectSpread(_objectSpread({}, PREF.v && PREF.v.filtros || {}), {}, {
      'voz.falar': on
    })
  });else __vozFalaDemo = on;
  if (!on) rnStopSpeak();
  vozSet({});
}
function vozPararTudo() {
  if (__vozEsc) {
    __vozEsc.cancelar();
    __vozEsc = null;
  }
  if (__vozCtl) {
    try {
      __vozCtl.abort();
    } catch (e) {}
    __vozCtl = null;
  }
  clearTimeout(__vozFecha);
  rnStopSpeak();
}
function vozFechar() {
  vozPararTudo();
  vozSet({
    aberto: false,
    estado: 'parado',
    ouvido: '',
    resposta: '',
    rotulo: null,
    erro: null,
    pend: null,
    pendEstado: null
  });
}
function vozAutoFechar() {
  clearTimeout(__vozFecha);
  __vozFecha = setTimeout(function () {
    if (VOZ.v.aberto && VOZ.v.estado === 'pronto' && !VOZ.v.pend) vozFechar();
  }, 14000);
}
var vozSegurar = function vozSegurar() {
  return clearTimeout(__vozFecha);
};
function vozOuvir(_x28) {
  return _vozOuvir.apply(this, arguments);
}
function _vozOuvir() {
  _vozOuvir = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee40(modo) {
    var eng, base, c, h, _t33;
    return _regenerator().w(function (_context41) {
      while (1) switch (_context41.n) {
        case 0:
          vozPararTudo();
          eng = rnMotorVoz();
          base = modo === 'confirmar' ? {
            estado: 'ouvindo',
            ouvido: '',
            erro: null,
            modo: modo
          } : {
            estado: 'ouvindo',
            ouvido: '',
            resposta: '',
            rotulo: null,
            erro: null,
            pend: null,
            pendEstado: null,
            modo: modo
          };
          vozSet(_objectSpread({
            aberto: true
          }, base));
          if (eng) {
            _context41.n = 1;
            break;
          }
          vozSet({
            estado: 'erro',
            erro: 'nostt'
          });
          return _context41.a(2);
        case 1:
          if (!(eng === 'web')) {
            _context41.n = 4;
            break;
          }
          _context41.n = 2;
          return rnMicCheck(false);
        case 2:
          c = _context41.v;
          if (VOZ.v.aberto) {
            _context41.n = 3;
            break;
          }
          return _context41.a(2);
        case 3:
          if (c.ok) {
            _context41.n = 4;
            break;
          }
          vozSet(modo === 'confirmar' ? {
            estado: 'pronto'
          } : {
            estado: 'erro',
            erro: c.why
          });
          return _context41.a(2);
        case 4:
          h = {
            aoParcial: function aoParcial(t) {
              return vozSet({
                ouvido: t
              });
            },
            aoFim: function aoFim(t) {
              __vozEsc = null;
              if (!VOZ.v.aberto) return;
              if (!t) {
                vozSet({
                  estado: VOZ.v.pend || VOZ.v.resposta ? 'pronto' : 'vazio',
                  ouvido: ''
                });
                return;
              }
              vozProcessar(t);
            },
            aoErro: function aoErro(w) {
              __vozEsc = null;
              if ((w === 'denied' || w === 'dictation') && eng === 'web' && RN_VOICE.v.key && window.MediaRecorder) {
                rnOuvirEleven(h).then(function (x) {
                  __vozEsc = x;
                });
                return;
              }
              vozSet(modo === 'confirmar' ? {
                estado: 'pronto'
              } : {
                estado: 'erro',
                erro: w
              });
            }
          };
          if (!(eng === 'web')) {
            _context41.n = 5;
            break;
          }
          _t33 = rnOuvirWeb(_objectSpread(_objectSpread({}, h), {}, {
            continuo: false
          }));
          _context41.n = 7;
          break;
        case 5:
          _context41.n = 6;
          return rnOuvirEleven(h);
        case 6:
          _t33 = _context41.v;
        case 7:
          __vozEsc = _t33;
        case 8:
          return _context41.a(2);
      }
    }, _callee40);
  }));
  return _vozOuvir.apply(this, arguments);
}
function vozTerminarFala() {
  if (__vozEsc) __vozEsc.parar();
}
function vozProcessar(_x29) {
  return _vozProcessar.apply(this, arguments);
}
function _vozProcessar() {
  _vozProcessar = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee41(q) {
    var local, r, hist, ctl, id, pend, depois, _t34;
    return _regenerator().w(function (_context42) {
      while (1) switch (_context42.p = _context42.n) {
        case 0:
          vozSet({
            estado: 'pensando',
            ouvido: q,
            resposta: '',
            rotulo: null
          });
          local = rnComandoLocal(q);
          if (!local) {
            _context42.n = 1;
            break;
          }
          r = {
            text: local,
            mode: 'acao'
          };
          _context42.n = 6;
          break;
        case 1:
          hist = [].concat(_toConsumableArray(RN_STORE.v.msgs.filter(function (m) {
            return !m.error && !m.pending && m.content;
          }).slice(-12)), [{
            role: 'user',
            content: q
          }]);
          ctl = new AbortController();
          __vozCtl = ctl;
          _context42.p = 2;
          _context42.n = 3;
          return rnAnswer(hist, {
            voice: true,
            signal: ctl.signal,
            onText: function onText(t) {
              return vozSet({
                resposta: t,
                rotulo: null
              });
            },
            onTool: function onTool(l) {
              return vozSet({
                rotulo: l
              });
            }
          });
        case 3:
          r = _context42.v;
          _context42.n = 5;
          break;
        case 4:
          _context42.p = 4;
          _t34 = _context42.v;
          r = {
            text: _t34 && _t34.text || '',
            mode: 'interrompida'
          };
        case 5:
          __vozCtl = null;
        case 6:
          if (VOZ.v.aberto) {
            _context42.n = 7;
            break;
          }
          return _context42.a(2);
        case 7:
          id = Date.now();
          RN_STORE.v = _objectSpread(_objectSpread({}, RN_STORE.v), {}, {
            msgs: [].concat(_toConsumableArray(RN_STORE.v.msgs.map(function (m) {
              return r.resolved && m.pend && m.pend.id === r.resolved.id ? _objectSpread(_objectSpread({}, m), {}, {
                pendState: r.resolved.state
              }) : m;
            })), [{
              role: 'user',
              content: q,
              id: id - 1
            }, {
              role: 'assistant',
              content: r.text,
              id: id,
              mode: r.mode,
              pend: r.pending || undefined
            }])
          });
          avisar(RN_STORE);
          if (SB_ON && !local && r.mode !== 'interrompida') rnRegistrar(q, r, true, id);
          pend = r.pending && RN_PENDING.v === r.pending ? r.pending : null;
          vozSet(_objectSpread({
            estado: 'falando',
            resposta: r.text,
            rotulo: null
          }, pend ? {
            pend: pend,
            pendEstado: 'open'
          } : r.resolved ? {
            pendEstado: r.resolved.state
          } : {}));
          depois = function depois() {
            if (!VOZ.v.aberto || VOZ.v.estado !== 'falando') return;
            if (pend && RN_PENDING.v === pend) vozOuvir('confirmar');else {
              vozSet({
                estado: 'pronto'
              });
              vozAutoFechar();
            }
          };
          if (vozFalaLigada() && r.text) rnSpeak(rnVoice(r.text).now, depois);else depois();
        case 8:
          return _context42.a(2);
      }
    }, _callee41, null, [[2, 4]]);
  }));
  return _vozProcessar.apply(this, arguments);
}
function vozConfirmar(sim) {
  vozSegurar();
  vozPararTudo();
  vozProcessar(sim ? 'Sim, pode fazer' : 'Não, cancela');
}
function vozAlternar() {
  if (__vozDita) {
    __vozDita.parar();
    return;
  }
  if (VOZ.v.aberto && VOZ.v.estado === 'ouvindo') {
    vozTerminarFala();
    return;
  }
  rnUnlockAudio();
  vozOuvir('comando');
}

/* ---------- ditado no campo de texto selecionado ---------- */
function rnValorCampo(el, v) {
  var proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  var d = Object.getOwnPropertyDescriptor(proto, 'value');
  if (d && d.set) d.set.call(el, v);else el.value = v;
  el.dispatchEvent(new Event('input', {
    bubbles: true
  }));
}
var rnCampoEditavel = function rnCampoEditavel(el) {
  return !!el && !el.readOnly && !el.disabled && (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT' && /^(text|search|email|tel|url|)$/i.test(el.getAttribute('type') || 'text'));
};
function vozDitar(el) {
  var eng = rnMotorVoz();
  if (!eng) {
    vozSet({
      aberto: true,
      estado: 'erro',
      erro: 'nostt'
    });
    return;
  }
  var ini = el.selectionStart != null ? el.selectionStart : el.value.length,
    fim = el.selectionEnd != null ? el.selectionEnd : ini;
  var antes = el.value.slice(0, ini),
    depois = el.value.slice(fim),
    sep = antes && !/\s$/.test(antes) ? ' ' : '';
  var escreve = function escreve(t) {
    if (!t || /^Entendendo/.test(t)) return;
    var tt = antes.trim() && !/[.!?]\s*$/.test(antes) ? t : t.charAt(0).toUpperCase() + t.slice(1);
    rnValorCampo(el, antes + sep + tt + depois);
  };
  var fimDita = function fimDita() {
    __vozDita = null;
    vozSet({
      ditando: false
    });
    try {
      el.focus();
    } catch (e) {}
  };
  vozSet({
    ditando: true
  });
  var h = {
    aoParcial: escreve,
    aoFim: function aoFim(t) {
      escreve(t);
      fimDita();
    },
    aoErro: function aoErro(w) {
      fimDita();
      vozSet({
        aberto: true,
        estado: 'erro',
        erro: w
      });
    }
  };
  if (eng === 'web') __vozDita = rnOuvirWeb(_objectSpread(_objectSpread({}, h), {}, {
    continuo: true
  }));else rnOuvirEleven(_objectSpread(_objectSpread({}, h), {}, {
    longo: true
  })).then(function (x) {
    __vozDita = x;
  });
}

/* ---------- botão no topo e painel ---------- */
function VozBotao(_ref50) {
  var mobile = _ref50.mobile;
  var _useStore17 = useStore(VOZ),
    _useStore18 = _slicedToArray(_useStore17, 1),
    v = _useStore18[0];
  var ativo = v.aberto && v.estado === 'ouvindo' || v.ditando;
  return /*#__PURE__*/React.createElement(VIconBtn, {
    icon: ativo ? 'audio-lines' : 'mic',
    label: "Comando de voz (Ctrl + M)",
    variant: mobile ? 'glass' : 'ghost',
    size: "md",
    active: ativo,
    onClick: vozAlternar,
    style: ativo ? undefined : {
      color: 'var(--text-strong)'
    }
  });
}
var VOZ_LBL = {
  ouvindo: 'Pode falar, estou ouvindo',
  pensando: 'Pensando...',
  falando: 'Renata',
  pronto: 'Renata',
  vazio: 'Não ouvi nada',
  erro: 'Não deu para ouvir',
  parado: ''
};
var VOZ_DICAS = ['Agenda a Mariana Alves amanhã às 10 com a Dra. Camila', 'Abre o prontuário da Juliana Ferreira', 'Quais horários livres na sexta?', 'A Beatriz pagou o que devia no Pix', 'Envia a anamnese para o Carlos Eduardo', 'Abre as despesas'];
function VozRoot(_ref51) {
  var mobile = _ref51.mobile;
  var _useStore19 = useStore(VOZ),
    _useStore20 = _slicedToArray(_useStore19, 1),
    v = _useStore20[0];
  useStore(PREF);
  useStore(RN_PENDING);
  React.useEffect(function () {
    var k = function k(e) {
      if (e.ctrlKey && !e.altKey && !e.metaKey && !e.shiftKey && (e.key === 'm' || e.key === 'M' || e.code === 'KeyM')) {
        e.preventDefault();
        e.stopPropagation();
        if (__vozDita) {
          __vozDita.parar();
          return;
        }
        var el = document.activeElement;
        if (rnCampoEditavel(el) && !(VOZ.v.aberto && VOZ.v.estado === 'ouvindo')) {
          vozDitar(el);
          return;
        }
        vozAlternar();
        return;
      }
      if (e.key === 'Escape' && VOZ.v.aberto) {
        e.preventDefault();
        e.stopPropagation();
        vozFechar();
      }
    };
    window.addEventListener('keydown', k, true);
    return function () {
      return window.removeEventListener('keydown', k, true);
    };
  }, []);
  var falar = vozFalaLigada();
  var dita = v.ditando ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      left: '50%',
      bottom: 'calc(22px + env(safe-area-inset-bottom))',
      transform: 'translateX(-50%)',
      zIndex: 400,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 16px 10px 12px',
      borderRadius: 999,
      background: 'var(--surface-inverse, #0E2350)',
      color: '#fff',
      fontSize: 14,
      fontWeight: 500,
      boxShadow: '0 16px 30px -14px rgba(0,0,0,.5)',
      fontFamily: 'var(--font-sans)',
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: '#E5484D',
      animation: 'rnBreath 1.4s ease-in-out infinite'
    }
  }), "Ditando no campo", /*#__PURE__*/React.createElement("button", {
    type: "button",
    onMouseDown: function onMouseDown(e) {
      return e.preventDefault();
    },
    onClick: function onClick() {
      return __vozDita && __vozDita.parar();
    },
    style: {
      height: 28,
      padding: '0 12px',
      borderRadius: 999,
      border: 0,
      background: 'rgba(255,255,255,.16)',
      color: '#fff',
      fontFamily: 'inherit',
      fontSize: 13,
      fontWeight: 500,
      cursor: 'pointer'
    }
  }, "Parar")) : null;
  if (!v.aberto) return dita;
  var orbSt = v.estado === 'ouvindo' ? 'listening' : v.estado === 'pensando' ? 'thinking' : v.estado === 'falando' ? 'speaking' : 'idle';
  var mostra = v.estado === 'ouvindo' || v.estado === 'pensando' ? v.ouvido : '';
  var sem = !v.resposta && !mostra && v.estado === 'ouvindo';
  var btn = function btn(icon, label, onClick, on) {
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      "aria-label": label,
      title: label,
      onClick: onClick,
      style: {
        width: 34,
        height: 34,
        borderRadius: '50%',
        border: 0,
        cursor: 'pointer',
        background: 'transparent',
        color: on ? '#1F5EFF' : 'var(--text-muted)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(RIcon, {
      name: icon,
      size: 17
    }));
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, dita, /*#__PURE__*/React.createElement("div", {
    "data-overlay": "1",
    role: "dialog",
    "aria-label": "Comando de voz",
    onMouseEnter: vozSegurar,
    style: {
      position: 'fixed',
      left: '50%',
      bottom: mobile ? 'calc(12px + env(safe-area-inset-bottom))' : 24,
      transform: 'translateX(-50%)',
      zIndex: 400,
      width: mobile ? 'calc(100vw - 24px)' : 'min(560px, calc(100vw - 32px))',
      maxHeight: 'calc(100vh - 96px)',
      overflowY: 'auto',
      boxSizing: 'border-box',
      padding: mobile ? 14 : 18,
      borderRadius: 26,
      background: 'rgba(255,255,255,.95)',
      border: '1.5px solid rgba(255,255,255,.98)',
      boxShadow: '0 30px 60px -28px rgba(23,73,170,.6)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": v.estado === 'ouvindo' ? 'Terminar de falar' : 'Falar de novo',
    onClick: function onClick() {
      return v.estado === 'ouvindo' ? vozTerminarFala() : v.estado === 'falando' ? (rnStopSpeak(), vozSet({
        estado: 'pronto'
      })) : vozOuvir('comando');
    },
    style: {
      border: 0,
      padding: 0,
      background: 'transparent',
      borderRadius: '50%',
      cursor: 'pointer',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(RenataOrb, {
    size: 44,
    state: orbSt
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, v.rotulo || VOZ_LBL[v.estado] || 'Renata'), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 12,
      color: 'var(--text-muted)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, v.estado === 'ouvindo' ? v.modo === 'confirmar' ? 'Diga sim para confirmar ou não para cancelar' : 'Fale o que precisa. Eu entendo e faço por você.' : 'Comando de voz · Ctrl + M')), btn(falar ? 'volume-2' : 'volume-x', falar ? 'Não responder em voz alta' : 'Responder em voz alta', function () {
    return vozFalaSet(!falar);
  }, falar), btn('message-square-text', 'Abrir no chat da Renata', function () {
    vozFechar();
    RN_STORE.v = _objectSpread(_objectSpread({}, RN_STORE.v), {}, {
      open: true
    });
    avisar(RN_STORE);
  }), btn('x', 'Fechar', vozFechar)), mostra ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: mobile ? 17 : 18,
      fontWeight: 500,
      color: 'var(--text-strong)',
      lineHeight: 1.4
    }
  }, mostra) : null, sem ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, VOZ_DICAS.slice(0, mobile ? 3 : 4).map(function (d) {
    return /*#__PURE__*/React.createElement("span", {
      key: d,
      style: {
        fontSize: 12.5,
        color: 'var(--text-body)',
        padding: '6px 10px',
        borderRadius: 999,
        background: 'rgba(31,94,255,.06)'
      }
    }, "\"", d, "\"");
  })) : null, v.estado !== 'ouvindo' && v.estado !== 'pensando' && v.ouvido ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, "Voc\xEA: ", v.ouvido) : null, v.resposta ? /*#__PURE__*/React.createElement("div", {
    className: "rn-md",
    style: {
      fontSize: 15,
      lineHeight: 1.55,
      color: 'var(--text-body)'
    },
    dangerouslySetInnerHTML: {
      __html: rnMd(v.resposta)
    }
  }) : null, v.pend ? /*#__PURE__*/React.createElement(RnActionCard, {
    a: v.pend,
    state: v.pendEstado || (RN_PENDING.v && RN_PENDING.v.id === v.pend.id ? 'open' : 'old'),
    disabled: v.estado === 'pensando',
    onYes: function onYes() {
      return vozConfirmar(true);
    },
    onNo: function onNo() {
      return vozConfirmar(false);
    }
  }) : null, v.estado === 'vazio' ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      color: 'var(--text-body)'
    }
  }, "N\xE3o ouvi nada. Toque na Renata e fale de novo.") : null, v.erro ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      padding: '12px 14px',
      borderRadius: 16,
      background: 'rgba(31,94,255,.05)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      color: 'var(--text-body)',
      lineHeight: 1.5
    }
  }, RN_MIC_MSG[v.erro] || 'Não consegui ouvir agora.'), RN_RETRY.includes(v.erro) ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(OBtn, {
    size: "sm",
    iconLeft: "mic",
    onClick: function onClick() {
      return vozOuvir('comando');
    }
  }, "Tentar de novo")) : null) : null, v.estado === 'pronto' || v.estado === 'vazio' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(OBtn, {
    size: "sm",
    variant: "secondary",
    iconLeft: "mic",
    onClick: function onClick() {
      return vozOuvir('comando');
    }
  }, "Falar de novo")) : null));
}
Object.assign(window, {
  rnComandoLocal: rnComandoLocal,
  rnIrPara: rnIrPara,
  rnAbrirFicha: rnAbrirFicha,
  FichaGlobal: FichaGlobal,
  VozRoot: VozRoot,
  VozBotao: VozBotao,
  rnExecCmd: rnExecCmd,
  rnPode: rnPode,
  VOZ: VOZ,
  vozOuvir: vozOuvir,
  vozProcessar: vozProcessar,
  rnAcharPaciente: rnAcharPaciente
});
function App() {
  var mobile = useIsMobile();
  var _useAccess = useAccess(),
    member = _useAccess.member,
    can = _useAccess.can;
  var _useStore21 = useStore(VIEW_AS),
    _useStore22 = _slicedToArray(_useStore21, 2),
    setVA = _useStore22[1];
  var _useStore23 = useStore(INCOMING),
    _useStore24 = _slicedToArray(_useStore23, 1),
    inc = _useStore24[0];
  var _React$useState41 = React.useState(null),
    _React$useState42 = _slicedToArray(_React$useState41, 2),
    incShow = _React$useState42[0],
    setIncShow = _React$useState42[1];
  useStore(LANG);
  React.useEffect(function () {
    startLangObserver();
    if (LANG.v !== 'pt') setLang(LANG.v);
  }, []);
  React.useEffect(function () {
    if (!inc) return;
    setIncShow(inc);
    var t = setTimeout(function () {
      return setIncShow(null);
    }, 4500);
    return function () {
      return clearTimeout(t);
    };
  }, [inc && inc.id]);
  var permitidos = KIT_NAV.filter(function (n) {
    return can(n.id);
  });
  var navItems = KIT_NAV.map(function (n) {
    return can(n.id) ? n : _objectSpread(_objectSpread({}, n), {}, {
      locked: true
    });
  });
  var _React$useState43 = React.useState(null),
    _React$useState44 = _slicedToArray(_React$useState43, 2),
    bloq = _React$useState44[0],
    setBloq = _React$useState44[1];
  var _React$useState45 = React.useState(function () {
      var ru = rotaInicialUrl();
      if (ru) return ru;
      var r = null;
      try {
        r = localStorage.getItem('salute-kit:route');
      } catch (e) {}
      if (SB_ON && !ROUTES[r] && PREF.v && PREF.v.ultima_tela) r = PREF.v.ultima_tela;
      return ROUTES[r] ? r : 'painel';
    }),
    _React$useState46 = _slicedToArray(_React$useState45, 2),
    route0 = _React$useState46[0],
    setRoute = _React$useState46[1];
  var route = can(route0) ? route0 : (permitidos[0] || {
    id: 'painel'
  }).id;
  var navegar = function navegar(id) {
    if (!can(id)) {
      setBloq(id);
      return;
    }
    setBloq(null);
    setRoute(id);
  };
  var semNada = !permitidos.length,
    abaBloq = bloq ? KIT_NAV.find(function (n) {
      return n.id === bloq;
    }) : null;
  var _React$useState47 = React.useState(false),
    _React$useState48 = _slicedToArray(_React$useState47, 2),
    novo = _React$useState48[0],
    setNovo = _React$useState48[1];
  var _React$useState49 = React.useState(null),
    _React$useState50 = _slicedToArray(_React$useState49, 2),
    toast = _React$useState50[0],
    setToast = _React$useState50[1];
  var _React$useState51 = React.useState({
      pac: '',
      pro: '',
      hora: '09:00',
      wpp: true
    }),
    _React$useState52 = _slicedToArray(_React$useState51, 2),
    nv = _React$useState52[0],
    setNv = _React$useState52[1];
  React.useEffect(function () {
    try {
      localStorage.setItem('salute-kit:route', route0);
    } catch (e) {}
    if (SB_ON && PREF.v && PREF.v.ultima_tela !== route0) salvarPref({
      ultima_tela: route0
    });
  }, [route0]);
  React.useEffect(function () {
    if (!toast) return;
    var t = setTimeout(function () {
      return setToast(null);
    }, 3000);
    return function () {
      return clearTimeout(t);
    };
  }, [toast]);
  React.useEffect(function () {
    window.RN_NAV = function (t) {
      if (!ROUTES[t] || !can(t)) return false;
      navegar(t);
      RN_STORE.v = _objectSpread(_objectSpread({}, RN_STORE.v), {}, {
        nav: Date.now()
      });
      RN_STORE.subs.forEach(function (f) {
        return f();
      });
      return true;
    };
  });
  var r = ROUTES[route];
  var Screen = r.C;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppShell, {
    items: navItems,
    active: bloq || route,
    onNavigate: navegar,
    banner: /*#__PURE__*/React.createElement(AvisoSuporte, {
      mobile: mobile
    }),
    topExtra: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(VozBotao, {
      mobile: mobile
    }), /*#__PURE__*/React.createElement(RenataButton, {
      mobile: mobile
    })),
    title: abaBloq ? abaBloq.label : mobile ? r.mobileTitle || r.title : r.title,
    subtitle: abaBloq || mobile ? undefined : r.subtitle
  }, abaBloq || semNada ? /*#__PURE__*/React.createElement(SemAcesso, {
    titulo: abaBloq ? abaBloq.label : 'nenhuma aba'
  }) : /*#__PURE__*/React.createElement(Screen, {
    mobile: mobile,
    onNavigate: navegar,
    onNew: function onNew() {
      return setNovo(true);
    }
  })), /*#__PURE__*/React.createElement(XDialog, {
    open: novo,
    onClose: function onClose() {
      return setNovo(false);
    },
    icon: "calendar-plus",
    title: "Novo agendamento",
    description: "O paciente recebe a confirma\xE7\xE3o automaticamente.",
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(XButton, {
      variant: "secondary",
      onClick: function onClick() {
        return setNovo(false);
      }
    }, "Cancelar"), /*#__PURE__*/React.createElement(XButton, {
      iconLeft: "check",
      onClick: function onClick() {
        if (SB_ON) {
          agendarRapido(nv, setToast).then(function (ok) {
            if (ok) {
              setNovo(false);
              setNv({
                pac: '',
                pro: '',
                hora: '09:00',
                wpp: true
              });
            }
          });
          return;
        }
        setNovo(false);
        setToast({
          tone: 'success',
          title: 'Agendamento criado',
          description: 'Ronald Richards · 2 out · 09:00'
        });
      }
    }, "Agendar"))
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: 14
    }
  }, SB_ON ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(XInput, {
    label: "Paciente",
    iconLeft: "search",
    value: nv.pac,
    onChange: function onChange(e) {
      return setNv(_objectSpread(_objectSpread({}, nv), {}, {
        pac: e.target.value
      }));
    },
    list: "sb-pacientes",
    placeholder: "Nome do paciente",
    style: {
      gridColumn: '1 / -1'
    }
  }), /*#__PURE__*/React.createElement("datalist", {
    id: "sb-pacientes"
  }, PAC.slice(0, 500).map(function (x) {
    return /*#__PURE__*/React.createElement("option", {
      key: x.dbId || x.nome,
      value: x.nome
    });
  })), /*#__PURE__*/React.createElement(XSelect, {
    label: "Profissional",
    options: PROS.map(function (x) {
      return x.n;
    }),
    value: nv.pro || (PROS[0] || {}).n || '',
    onChange: function onChange(e) {
      return setNv(_objectSpread(_objectSpread({}, nv), {}, {
        pro: e.target.value
      }));
    }
  }), /*#__PURE__*/React.createElement(XInput, {
    label: "Hor\xE1rio",
    type: "time",
    value: nv.hora,
    onChange: function onChange(e) {
      return setNv(_objectSpread(_objectSpread({}, nv), {}, {
        hora: e.target.value
      }));
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement(XSwitch, {
    checked: nv.wpp,
    onChange: function onChange(v) {
      return setNv(_objectSpread(_objectSpread({}, nv), {}, {
        wpp: v
      }));
    },
    label: "Enviar confirma\xE7\xE3o por WhatsApp"
  }))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(XInput, {
    label: "Paciente",
    iconLeft: "search",
    defaultValue: "Ronald Richards",
    style: {
      gridColumn: '1 / -1'
    }
  }), /*#__PURE__*/React.createElement(XSelect, {
    label: "Profissional",
    options: ['Darlene Robertson', 'Michael Thompson', 'Max Worthington', 'Dr. McCoy']
  }), /*#__PURE__*/React.createElement(XInput, {
    label: "Hor\xE1rio",
    type: "time",
    defaultValue: "09:00"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      gridColumn: '1 / -1'
    }
  }, /*#__PURE__*/React.createElement(XSwitch, {
    defaultChecked: true,
    label: "Enviar confirma\xE7\xE3o por WhatsApp"
  }))))), /*#__PURE__*/React.createElement(RenataRoot, {
    mobile: mobile
  }), /*#__PURE__*/React.createElement(FichaGlobal, {
    mobile: mobile
  }), /*#__PURE__*/React.createElement(VozRoot, {
    mobile: mobile
  }), /*#__PURE__*/React.createElement(AvisoDemo, {
    mobile: mobile
  }), /*#__PURE__*/React.createElement(ContaMenu, {
    mobile: mobile,
    onNavigate: navegar
  }), /*#__PURE__*/React.createElement(SincronizaUrl, {
    route: route,
    ir: navegar
  }), /*#__PURE__*/React.createElement(NotifMenu, {
    mobile: mobile
  }), /*#__PURE__*/React.createElement(AvisoGravacao, {
    mobile: mobile
  }), member ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      zIndex: 150,
      top: mobile ? 'auto' : 14,
      bottom: mobile ? 'calc(96px + env(safe-area-inset-bottom))' : 'auto',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '8px 8px 8px 16px',
      borderRadius: 999,
      background: 'linear-gradient(90deg,#0A2A8F,#7B4BC4)',
      color: '#fff',
      fontFamily: 'var(--font-sans)',
      fontSize: 14,
      boxShadow: '0 16px 30px -14px rgba(11,42,143,.7)',
      whiteSpace: 'nowrap',
      maxWidth: 'calc(100vw - 24px)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .8
    }
  }, "Visualizando como "), /*#__PURE__*/React.createElement("b", null, member.nome), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: .8
    }
  }, " \xB7 ", member.funcao)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return setVA(null);
    },
    style: {
      height: 34,
      padding: '0 14px',
      borderRadius: 999,
      border: 0,
      background: '#fff',
      color: '#0B4BEB',
      fontFamily: 'inherit',
      fontSize: 13,
      fontWeight: 600,
      cursor: 'pointer',
      flexShrink: 0
    }
  }, "Sair da visualiza\xE7\xE3o")) : null, incShow ? /*#__PURE__*/React.createElement("div", {
    onClick: function onClick() {
      setIncShow(null);
      setRoute('mensagens');
    },
    style: {
      position: 'fixed',
      zIndex: 140,
      right: mobile ? 12 : 24,
      left: mobile ? 12 : 'auto',
      top: mobile ? 70 : 24,
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement(XToast, {
    tone: "info",
    title: 'Nova mensagem de ' + incShow.from,
    description: incShow.text,
    onClose: function onClose() {
      return setIncShow(null);
    },
    style: {
      width: mobile ? '100%' : 360
    }
  })) : null, toast ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: mobile ? 'absolute' : 'fixed',
      zIndex: 120,
      right: mobile ? 12 : 24,
      left: mobile ? 12 : 'auto',
      top: mobile ? 70 : 'auto',
      bottom: mobile ? 'auto' : 24
    }
  }, /*#__PURE__*/React.createElement(XToast, _extends({}, toast, {
    onClose: function onClose() {
      return setToast(null);
    },
    style: {
      width: mobile ? '100%' : 360
    }
  }))) : null);
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(RaizSalute, null));