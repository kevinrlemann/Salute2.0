"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
/* =====================================================================
   SERVIÇOS DE DADOS: Pacientes, Prontuário e Agenda (Supabase)
   As telas continuam as mesmas. Em modo conectado, as listas que antes
   vinham fixas no código passam a ser preenchidas com o que está no banco.
   ===================================================================== */
var substituir = function substituir(arr, novos) {
  arr.splice.apply(arr, [0, arr.length].concat(_toConsumableArray(novos)));
  return arr;
};
var substituirObj = function substituirObj(obj, novo) {
  Object.keys(obj).forEach(function (k) {
    return delete obj[k];
  });
  Object.assign(obj, novo);
  return obj;
};
var avisar = function avisar(st) {
  return st.subs.forEach(function (f) {
    return f();
  });
};
var novoId = function novoId() {
  return window.crypto && crypto.randomUUID ? crypto.randomUUID() : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    return (c === 'x' ? r : r & 3 | 8).toString(16);
  });
};
var hojeZero = function hojeZero() {
  return BR.dia();
}; // hoje no horário de Brasília
var LINK_BASE = String(window.SALUTE_CONFIG && window.SALUTE_CONFIG.LINK_PUBLICO || (location.host ? location.host + (ROTAS_URL ? BASE_PATH : location.pathname.replace(/[^/]*$/, '')) : 'salute.app')).replace(/^https?:\/\//, '').replace(/\/+$/, '');
var quemSou = function quemSou() {
  return SESSAO.v.perfil ? [SESSAO.v.perfil.tratamento, SESSAO.v.perfil.nome, SESSAO.v.perfil.sobrenome].filter(Boolean).join(' ') : 'Equipe';
};

// No modo conectado a data de hoje é a data real e nenhum dado de exemplo aparece
if (SB_ON) {
  PAC.length = 0;
  PAC_STORE.v = [];
  APPT_STORE.v = [];
  ANAM_STORE.v = [];
  MODEL_STORE.v = [];
  TODAY.setTime(hojeZero().getTime());
  TODAY_ISO = isoOf(TODAY);
  HOJE = BR.dataTela(TODAY_ISO);
}

/* ---------- Catálogos dentro das listas que as telas já usam ---------- */
var CAT_EXTRA = makeStore({
  produtos: [],
  kits: []
});
var CARGA_CATALOGOS_BASE = CARGAS.catalogos;
CARGAS.catalogos = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
  var _yield$Promise$all, _yield$Promise$all2, produtos, kits;
  return _regenerator().w(function (_context) {
    while (1) switch (_context.n) {
      case 0:
        _context.n = 1;
        return CARGA_CATALOGOS_BASE();
      case 1:
        _context.n = 2;
        return Promise.all([DB.ler(DB.sel('produtos', 'id,nome,quantidade_atual,usar_no_mapa,cor_mapa,unidade_mapa,passo_dose,dose_padrao,conteudo_por_unidade,unidade:unidades_medida(nome)').order('nome')), DB.ler(DB.sel('procedimento_kit_padrao', 'procedimento_id,produto_id,quantidade'))]);
      case 2:
        _yield$Promise$all = _context.v;
        _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
        produtos = _yield$Promise$all2[0];
        kits = _yield$Promise$all2[1];
        CAT_EXTRA.v = {
          produtos: produtos,
          kits: kits
        };
        avisar(CAT_EXTRA);
        hidratarCatalogos();
        if (window.hidratarMapa) hidratarMapa();
      case 3:
        return _context.a(2);
    }
  }, _callee);
}));
function hidratarCatalogos() {
  if (!SB_ON) return;
  var c = CAT.v,
    profs = c.profissionais || [],
    procs = c.procedimentos || [];
  var nomeProc = function nomeProc(id) {
    return (procs.find(function (p) {
      return p.id === id;
    }) || {}).nome;
  };
  substituir(PROF0, profs.map(function (p) {
    return {
      id: p.id,
      dbId: p.id,
      nome: p.nome,
      esp: p.especialidade || '',
      reg: p.registro_conselho || '',
      cor: p.cor_agenda || '#1F5EFF',
      procs: (p.procs || []).map(nomeProc).filter(Boolean),
      fotoPath: p.foto_path,
      usuarioId: p.usuario_id
    };
  }));
  substituir(PROS, profs.map(function (p) {
    return {
      n: p.nome,
      r: p.especialidade || '',
      id: p.id
    };
  }));
  substituir(FIN_PROS, profs.map(function (p) {
    return p.nome;
  }));
  // procedimento desmarcado em Configurações sai das listas; o histórico continua achando o nome pelo id
  substituir(FIN_PROCS, procs.filter(function (pr) {
    return pr.ativo !== false;
  }).map(function (pr) {
    return {
      n: pr.nome,
      v: Number(pr.valor || 0),
      q: 0,
      cat: catNome('categorias', pr.categoria_financeira_id) || 'Consulta',
      pro: profs.map(function (p, i) {
        return (p.procs || []).includes(pr.id) ? i : -1;
      }).filter(function (i) {
        return i >= 0;
      }),
      id: pr.id
    };
  }));
  substituirObj(PROC_DUR, Object.fromEntries(procs.map(function (p) {
    return [p.nome, p.duracao_padrao_minutos || 30];
  })));
  substituir(FORMAS, (c.formas || []).filter(function (f) {
    return f.ativo;
  }).map(function (f) {
    return f.nome;
  }));
  substituir(DESP_CATS, (c.categorias || []).filter(function (x) {
    return x.tipo === 'despesa' && x.ativo;
  }).map(function (x) {
    return x.nome;
  }));
  substituir(EST_CATS, (c.catProd || []).filter(function (x) {
    return x.ativo;
  }).map(function (x) {
    return x.nome;
  }));
  substituir(UNIDADES, (c.unidades || []).filter(function (x) {
    return x.ativo;
  }).map(function (x) {
    return x.nome;
  }));
  var cc = CAMPOS.find(function (x) {
    return x.k === 'conv';
  });
  if (cc) substituir(cc.opts, [''].concat(_toConsumableArray((c.convenios || []).filter(function (x) {
    return x.ativo;
  }).map(function (x) {
    return x.nome;
  }))));
  var ex = CAT_EXTRA.v;
  substituir(PRODUTOS0, (ex.produtos || []).map(function (p) {
    return {
      id: p.id,
      nome: p.nome,
      un: p.unidade ? p.unidade.nome : 'Unidade',
      qtd: Number(p.quantidade_atual)
    };
  }));
  var kit = {};
  (ex.kits || []).forEach(function (k) {
    var pn = nomeProc(k.procedimento_id),
      pr = (ex.produtos || []).find(function (x) {
        return x.id === k.produto_id;
      });
    if (pn && pr) (kit[pn] = kit[pn] || []).push([pr.nome, Number(k.quantidade)]);
  });
  substituirObj(MAT_SUG, kit);
  PROF_STORE.v = PROF0.map(function (p) {
    return _objectSpread(_objectSpread({}, p), {}, {
      foto: (PROF_STORE.v.find(function (x) {
        return x.id === p.id;
      }) || {}).foto || null
    });
  });
  avisar(PROF_STORE);
  PROF0.forEach(function (p) {
    if (p.fotoPath) ARQ.url('clinica', p.fotoPath).then(function (u) {
      if (!u) return;
      PROF_STORE.v = PROF_STORE.v.map(function (x) {
        return x.id === p.id ? _objectSpread(_objectSpread({}, x), {}, {
          foto: u
        }) : x;
      });
      avisar(PROF_STORE);
    });
  });
}

/* =====================================================================
   PACIENTES
   ===================================================================== */
var pk = function pk(p) {
  return p ? p.dbId || p.cpf || p.nome : null;
};
var pacTela = function pacTela(r) {
  return {
    id: r.id,
    dbId: r.id,
    nome: r.nome,
    tipo: el('tipo_paciente', r.tipo, 'Particular'),
    empresa: r.empresa || '',
    conv: r.convenio ? r.convenio.nome : '',
    tel: BR.telTela(r.whatsapp),
    nasc: BR.dataTela(r.data_nascimento),
    sexo: r.sexo ? el('sexo', r.sexo, '') : '',
    cpf: r.cpf || '',
    numero: r.numero_prontuario,
    email: r.email || '',
    status: r.status,
    origem: r.origem_cadastro,
    criado: r.criado_em,
    fotoPath: r.foto_path,
    telAnt: (r.telefones || []).filter(function (t) {
      return !t.ativo && !t.excluido_em;
    }).sort(function (a, b) {
      return String(a.substituido_em).localeCompare(String(b.substituido_em));
    }).map(function (t) {
      return BR.telTela(t.numero);
    })
  };
};
var pacBanco = function pacBanco(d) {
  return {
    nome: String(d.nome || '').trim(),
    tipo: ek('tipo_paciente', d.tipo) || 'particular',
    empresa: d.empresa ? String(d.empresa).trim() : null,
    convenio_id: d.conv ? catId('convenios', d.conv) : null,
    data_nascimento: BR.data(d.nasc),
    sexo: ek('sexo', d.sexo)
  };
};
function atualizarFiltrosPacientes() {
  var fc = FILTER_DEFS.find(function (x) {
      return x.key === 'conv';
    }),
    fe = FILTER_DEFS.find(function (x) {
      return x.key === 'empresa';
    });
  if (fc) substituir(fc.opts, [].concat(_toConsumableArray(Array.from(new Set(PAC.map(function (p) {
    return p.conv;
  }).filter(Boolean))).sort()), ['Sem convênio']));
  if (fe) substituir(fe.opts, Array.from(new Set(PAC.map(function (p) {
    return p.empresa;
  }).filter(Boolean))).sort());
}
function publicarPacientes(list) {
  substituir(PAC, list);
  PAC_STORE.v = list;
  atualizarFiltrosPacientes();
  avisar(PAC_STORE);
}
CARGAS.pacientes = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
  var rows;
  return _regenerator().w(function (_context2) {
    while (1) switch (_context2.n) {
      case 0:
        _context2.n = 1;
        return carregar('catalogos');
      case 1:
        _context2.n = 2;
        return DB.tudo(function () {
          return DB.sel('pacientes', '*, convenio:convenios(nome), telefones:pacientes_telefones(numero,ativo,substituido_em,excluido_em)').order('nome').order('id');
        });
      case 2:
        rows = _context2.v;
        publicarPacientes(rows.map(pacTela));
      case 3:
        return _context2.a(2);
    }
  }, _callee2);
}));
var PacSvc = {
  achar: function achar(nome) {
    var n = String(nome || '').trim().toLowerCase();
    return PAC.find(function (p) {
      return p.nome.toLowerCase() === n;
    }) || null;
  },
  criar: function criar(d, origem) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var row, r, full, p;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            row = _objectSpread(_objectSpread({}, pacBanco(d)), {}, {
              whatsapp: BR.tel(d.tel),
              cpf: d.cpf ? String(d.cpf).trim() : null,
              email: d.email || null,
              origem_cadastro: origem || 'equipe'
            });
            _context3.n = 1;
            return DB.ins('pacientes', row, 'Não foi possível cadastrar o paciente');
          case 1:
            r = _context3.v;
            _context3.n = 2;
            return DB.ler(DB.sel('pacientes', '*, convenio:convenios(nome), telefones:pacientes_telefones(numero,ativo,substituido_em,excluido_em)').eq('id', r.id));
          case 2:
            full = _context3.v;
            p = pacTela(full[0] || r);
            publicarPacientes([].concat(_toConsumableArray(PAC), [p]).sort(function (a, b) {
              return a.nome.localeCompare(b.nome);
            }));
            PacSvc.hist(p, {
              t: origem === 'renata_ia' ? 'Cadastro criado pela Renata IA' : 'Cadastro criado pela equipe',
              s: quemSou(),
              c: '#2DBF6A',
              tipo: 'cadastro',
              origem: origem
            });
            return _context3.a(2, p);
        }
      }, _callee3);
    }))();
  },
  garantir: function garantir(nome, tel) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            return _context4.a(2, PacSvc.achar(nome) || PacSvc.criar({
              nome: nome,
              tel: tel,
              tipo: 'Particular'
            }));
        }
      }, _callee4);
    }))();
  },
  salvar: function salvar(p, d) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var np;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            _context5.n = 1;
            return DB.upd('pacientes', p.dbId, pacBanco(d), 'Não foi possível salvar os dados do paciente');
          case 1:
            np = _objectSpread(_objectSpread({}, p), d);
            publicarPacientes(PAC.map(function (x) {
              return x.dbId === p.dbId ? np : x;
            }));
            return _context5.a(2, np);
        }
      }, _callee5);
    }))();
  },
  trocarNumero: function trocarNumero(p, novo) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      var w, np;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            w = BR.tel(novo);
            if (w) {
              _context6.n = 1;
              break;
            }
            throw new Error('Número inválido');
          case 1:
            _context6.n = 2;
            return DB.upd('pacientes', p.dbId, {
              whatsapp: w
            }, 'Não foi possível trocar o número');
          case 2:
            np = _objectSpread(_objectSpread({}, p), {}, {
              tel: BR.telTela(w),
              telAnt: [].concat(_toConsumableArray(p.telAnt || []), [p.tel]).filter(Boolean)
            });
            publicarPacientes(PAC.map(function (x) {
              return x.dbId === p.dbId ? np : x;
            }));
            return _context6.a(2, np);
        }
      }, _callee6);
    }))();
  },
  historico: function historico(p) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
      var rows;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            _context7.n = 1;
            return DB.ler(DB.sel('historico_paciente', 'titulo,descricao,data,cor,origem').eq('paciente_id', p.dbId).order('data', {
              ascending: false
            }).limit(200));
          case 1:
            rows = _context7.v;
            return _context7.a(2, rows.map(function (h) {
              return {
                t: h.titulo,
                d: BR.dataTela(BR.diaDe(h.data)),
                s: h.descricao || undefined,
                c: h.cor || '#1F5EFF'
              };
            }));
        }
      }, _callee7);
    }))();
  },
  hist: function hist(p, h) {
    if (!SB_ON || !p || !p.dbId) return Promise.resolve();
    return bg(DB.ins('historico_paciente', {
      paciente_id: p.dbId,
      titulo: h.t,
      descricao: h.s || null,
      cor: h.c || null,
      tipo_evento: h.tipo || 'geral',
      origem: h.origem || 'equipe',
      registro_tabela: h.tabela || null,
      registro_id: h.registro || null
    }, 'Não foi possível registrar no histórico'));
  }
};

/* =====================================================================
   PRONTUÁRIO
   ===================================================================== */
var linkAnamnese = function linkAnamnese(token) {
  return LINK_BASE + '/?a=' + token;
};
var linkDocs = function linkDocs(token) {
  return LINK_BASE + '/?u=' + token;
};
var dtLocal = function dtLocal(ts) {
  return BR.diaDe(ts) + 'T' + BR.hm(ts);
}; // data e hora em Brasília, no formato do campo datetime-local
var pastaNome = function pastaNome(pastas, id) {
  return (pastas.find(function (x) {
    return x.id === id;
  }) || {}).nome || 'Documentação Clínica';
};
var ProntSvc = {
  carregar: function carregar(p) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
      var P, _yield$Promise$all3, _yield$Promise$all4, envs, mapas, procs, docs, comps, pastasPac, modelos, pastas, paths, urls, _yield$SB$storage$fro, data, docTela, docsT, byId, compT, recs, _iterator, _step, m, bgv, img, mk, grupos, nomesPadrao, folders, _t;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.p = _context8.n) {
          case 0:
            P = p.dbId;
            _context8.n = 1;
            return Promise.all([DB.ler(DB.sel('anamnese_envios', 'id,token,status,modo,enviado_em,expira_em,respondido_em,rascunho,assinatura,assinante_nome,assinante_cpf,assinado_em,ip_assinatura,texto_declaracao,hash_respostas,modelo_id,modelo:anamnese_modelos(nome),respostas:anamnese_respostas(ordem,pergunta_texto,resposta,detalhe,bloco_titulo,alerta,rotulo_alerta,excluido_em)').eq('paciente_id', P).order('enviado_em', {
              ascending: false
            })), DB.ler(DB.sel('mapeamentos', 'id,titulo,data,criado_em,imagem_path,origem_imagem,categoria,area_descricao,observacoes,modelo:mapeamento_modelos(chave_sistema,imagem_path,sistema),marcacoes:mapeamento_marcacoes(id,tipo,ordem,item_mapa,dose,unidade,posicao_x,posicao_y,pontos_tracado,cor,espessura,opacidade,comentario,excluido_em)').eq('paciente_id', P).order('criado_em', {
              ascending: false
            })), DB.ler(DB.sel('procedimentos_realizados', 'id,procedimento_nome,data_hora,duracao_minutos,status,observacoes,regiao,valor,criado_em,procedimento:procedimentos(nome),profissional:profissionais(nome),insumos:procedimento_insumos(produto_nome,quantidade,excluido_em)').eq('paciente_id', P).order('data_hora', {
              ascending: false
            })), DB.ler(DB.sel('documentos_paciente', 'id,nome_arquivo,arquivo_path,tipo_arquivo,mime_type,data,pasta_id,criado_em,origem,procedimento_realizado_id').eq('paciente_id', P).order('criado_em', {
              ascending: false
            })), DB.ler(DB.sel('comparacoes_antes_depois', 'id,nome,data,pasta_id,documento_antes_id,documento_depois_id,criado_em').eq('paciente_id', P).order('criado_em', {
              ascending: false
            })), DB.ler(DB.sel('pastas_documentos').eq('paciente_id', P).order('ordem')), ProntSvc.modelos()]);
          case 1:
            _yield$Promise$all3 = _context8.v;
            _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 7);
            envs = _yield$Promise$all4[0];
            mapas = _yield$Promise$all4[1];
            procs = _yield$Promise$all4[2];
            docs = _yield$Promise$all4[3];
            comps = _yield$Promise$all4[4];
            pastasPac = _yield$Promise$all4[5];
            modelos = _yield$Promise$all4[6];
            pastas = [].concat(_toConsumableArray(CAT.v.pastas || []), _toConsumableArray(pastasPac)); // documentos com link assinado
            paths = docs.map(function (d) {
              return d.arquivo_path;
            }).filter(function (x) {
              return x && !/^demo:/.test(x);
            });
            urls = {};
            if (!paths.length) {
              _context8.n = 3;
              break;
            }
            _context8.n = 2;
            return SB.storage.from('prontuario').createSignedUrls(paths, 3600);
          case 2:
            _yield$SB$storage$fro = _context8.v;
            data = _yield$SB$storage$fro.data;
            (data || []).forEach(function (u) {
              if (u.signedUrl) urls[u.path] = u.signedUrl;
            });
          case 3:
            docTela = function docTela(d) {
              var demo = /^demo:/.test(d.arquivo_path || '') ? d.arquivo_path.split(':') : null;
              return {
                id: d.id,
                dbId: d.id,
                name: d.nome_arquivo,
                folder: pastaNome(pastas, d.pasta_id),
                pastaId: d.pasta_id,
                date: BR.dataTela(d.data),
                type: d.tipo_arquivo === 'pdf' ? 'pdf' : d.tipo_arquivo === 'outro' ? 'outro' : 'img',
                url: urls[d.arquivo_path] || null,
                art: demo && demo[1] !== 'pdf' ? demo[1] : undefined,
                tone: demo && demo[2] ? demo[2] : undefined,
                path: d.arquivo_path,
                criado: d.criado_em,
                procId: d.procedimento_realizado_id || null
              };
            };
            docsT = docs.map(docTela);
            byId = Object.fromEntries(docsT.map(function (d) {
              return [d.id, d];
            }));
            compT = comps.filter(function (c) {
              return byId[c.documento_antes_id] && byId[c.documento_depois_id];
            }).map(function (c) {
              return {
                id: c.id,
                dbId: c.id,
                name: c.nome,
                folder: pastaNome(pastas, c.pasta_id),
                date: BR.dataTela(c.data),
                type: 'compare',
                a: byId[c.documento_antes_id],
                b: byId[c.documento_depois_id],
                criado: c.criado_em
              };
            });
            recs = [];
            envs.forEach(function (e) {
              return recs.push(envioTela(e));
            });
            _iterator = _createForOfIteratorHelper(mapas);
            _context8.p = 4;
            _iterator.s();
          case 5:
            if ((_step = _iterator.n()).done) {
              _context8.n = 9;
              break;
            }
            m = _step.value;
            bgv = m.modelo && m.modelo.sistema ? m.modelo.chave_sistema : null;
            img = m.imagem_path || (m.modelo && !m.modelo.sistema ? m.modelo.imagem_path : null);
            if (!img) {
              _context8.n = 7;
              break;
            }
            _context8.n = 6;
            return ARQ.url('prontuario', img);
          case 6:
            bgv = _context8.v;
          case 7:
            mk = (m.marcacoes || []).filter(function (x) {
              return !x.excluido_em;
            }).sort(function (a, b) {
              return a.ordem - b.ordem;
            });
            recs.push({
              id: m.id,
              dbId: m.id,
              kind: 'mapa',
              date: BR.dataTela(m.data),
              ord: m.criado_em,
              title: m.titulo,
              bg: bgv,
              bgPath: img,
              cat: m.categoria || null,
              catDesc: m.area_descricao || '',
              obs: m.observacoes || '',
              dataIso: m.data,
              points: mk.filter(function (x) {
                return x.tipo === 'ponto';
              }).map(function (x) {
                return {
                  id: x.id,
                  x: Number(x.posicao_x),
                  y: Number(x.posicao_y),
                  prod: x.item_mapa || 'Só comentário',
                  dose: Number(x.dose || 0),
                  un: x.unidade,
                  cor: x.cor,
                  com: x.comentario || ''
                };
              }),
              strokes: mk.filter(function (x) {
                return x.tipo !== 'ponto';
              }).map(function (x) {
                return {
                  id: x.id,
                  type: x.tipo === 'pincel' ? 'pen' : 'line',
                  pts: x.pontos_tracado || [],
                  color: x.cor || '#7B4BC4',
                  w: x.espessura || 6,
                  op: Number(x.opacidade || 0.9),
                  com: x.comentario || ''
                };
              })
            });
          case 8:
            _context8.n = 5;
            break;
          case 9:
            _context8.n = 11;
            break;
          case 10:
            _context8.p = 10;
            _t = _context8.v;
            _iterator.e(_t);
          case 11:
            _context8.p = 11;
            _iterator.f();
            return _context8.f(11);
          case 12:
            procs.forEach(function (r) {
              var nome = (r.procedimento ? r.procedimento.nome : r.procedimento_nome) || 'Procedimento';
              recs.push({
                id: r.id,
                dbId: r.id,
                kind: 'proc',
                date: BR.dataTela(BR.diaDe(r.data_hora)),
                ord: r.criado_em,
                title: nome,
                items: [nome],
                pro: r.profissional ? r.profissional.nome : '',
                dt: dtLocal(r.data_hora),
                dur: r.duracao_minutos,
                status: {
                  realizado: 'Realizado',
                  agendado: 'Agendado',
                  cancelado: 'Cancelado'
                }[r.status],
                mats: (r.insumos || []).filter(function (x) {
                  return !x.excluido_em;
                }).map(function (x) {
                  return {
                    nome: x.produto_nome,
                    q: Number(x.quantidade)
                  };
                }),
                obs: r.observacoes || '',
                regiao: r.regiao || '',
                valor: r.valor != null ? Number(r.valor) : null,
                anexos: docsT.filter(function (d) {
                  return d.procId === r.id;
                })
              });
            });
            // documentos agrupados por envio (mesmo dia, mesma pasta); anexos de procedimento aparecem no próprio procedimento
            grupos = {};
            docsT.filter(function (d) {
              return !d.procId;
            }).forEach(function (d) {
              var k = d.date + '|' + d.folder;
              (grupos[k] = grupos[k] || []).push(d);
            });
            Object.entries(grupos).forEach(function (_ref3) {
              var _ref4 = _slicedToArray(_ref3, 2),
                k = _ref4[0],
                fs = _ref4[1];
              var folder = k.split('|')[1];
              recs.push({
                id: 'g' + k,
                kind: 'doc',
                date: fs[0].date,
                ord: fs[0].criado,
                title: "".concat(fs.length, " ").concat(fs.length === 1 ? 'arquivo' : 'arquivos', " em ").concat(folder),
                files: fs
              });
            });
            compT.forEach(function (c) {
              return recs.push({
                id: 'g' + c.id,
                kind: 'doc',
                date: c.date,
                ord: c.criado,
                title: 'Antes e depois criado',
                files: [c]
              });
            });
            recs.sort(function (a, b) {
              return String(b.ord).localeCompare(String(a.ord));
            });
            nomesPadrao = (CAT.v.pastas || []).map(function (x) {
              return x.nome;
            }).filter(function (n) {
              return n !== 'Antes e Depois';
            });
            folders = Array.from(new Set([].concat(_toConsumableArray(nomesPadrao), _toConsumableArray(pastasPac.map(function (x) {
              return x.nome;
            })), _toConsumableArray(compT.length || docsT.some(function (d) {
              return d.folder === 'Antes e Depois';
            }) ? ['Antes e Depois'] : []))));
            return _context8.a(2, {
              recs: recs,
              docs: [].concat(_toConsumableArray(compT), _toConsumableArray(docsT)),
              folders: folders,
              pastas: pastas
            });
        }
      }, _callee8, null, [[4, 10, 11, 12]]);
    }))();
  },
  modelos: function modelos() {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
      var rows, list, _iterator2, _step2, m, _t2, _t3, _t4, _t5, _t6, _t7, _t8;
      return _regenerator().w(function (_context9) {
        while (1) switch (_context9.p = _context9.n) {
          case 0:
            _context9.n = 1;
            return DB.ler(SB.from('mapeamento_modelos').select('id,nome,imagem_path,sistema,chave_sistema,clinica_id').is('excluido_em', null).eq('clinica_id', CLI()).eq('sistema', false).order('criado_em'));
          case 1:
            rows = _context9.v;
            list = [];
            _iterator2 = _createForOfIteratorHelper(rows);
            _context9.p = 2;
            _iterator2.s();
          case 3:
            if ((_step2 = _iterator2.n()).done) {
              _context9.n = 6;
              break;
            }
            m = _step2.value;
            _t2 = list;
            _t3 = m.id;
            _t4 = m.id;
            _t5 = m.nome;
            _context9.n = 4;
            return ARQ.url('prontuario', m.imagem_path);
          case 4:
            _t6 = _context9.v;
            _t7 = m.imagem_path;
            _t2.push.call(_t2, {
              id: _t3,
              dbId: _t4,
              name: _t5,
              src: _t6,
              path: _t7
            });
          case 5:
            _context9.n = 3;
            break;
          case 6:
            _context9.n = 8;
            break;
          case 7:
            _context9.p = 7;
            _t8 = _context9.v;
            _iterator2.e(_t8);
          case 8:
            _context9.p = 8;
            _iterator2.f();
            return _context9.f(8);
          case 9:
            MODEL_STORE.v = list;
            avisar(MODEL_STORE);
            return _context9.a(2, list);
        }
      }, _callee9, null, [[2, 7, 8, 9]]);
    }))();
  },
  addModelo: function addModelo(src, nome) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
      var id, path;
      return _regenerator().w(function (_context0) {
        while (1) switch (_context0.n) {
          case 0:
            id = novoId();
            _context0.n = 1;
            return ARQ.enviarDataUrl('prontuario', 'modelos', src, nomeSeguro(nome) + '.png');
          case 1:
            path = _context0.v;
            _context0.n = 2;
            return DB.ins('mapeamento_modelos', {
              id: id,
              nome: nome,
              imagem_path: path,
              sistema: false
            }, 'Não foi possível salvar o modelo');
          case 2:
            return _context0.a(2, id);
        }
      }, _callee0);
    }))();
  },
  pastaId: function pastaId(p, nome, pastas) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
      var ex, r;
      return _regenerator().w(function (_context1) {
        while (1) switch (_context1.n) {
          case 0:
            ex = pastas.find(function (x) {
              return x.nome === nome;
            });
            if (!ex) {
              _context1.n = 1;
              break;
            }
            return _context1.a(2, ex.id);
          case 1:
            _context1.n = 2;
            return DB.ins('pastas_documentos', {
              paciente_id: p.dbId,
              nome: nome,
              ordem: pastas.length + 1
            }, 'Não foi possível criar a pasta');
          case 2:
            r = _context1.v;
            pastas.push(r);
            return _context1.a(2, r.id);
        }
      }, _callee1);
    }))();
  },
  enviarAnamnese: function enviarAnamnese(p, modeloNome, modo) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
      var m, r;
      return _regenerator().w(function (_context10) {
        while (1) switch (_context10.n) {
          case 0:
            m = (ANAM_STORE.v || []).find(function (x) {
              return x.nome === modeloNome;
            });
            _context10.n = 1;
            return DB.ins('anamnese_envios', {
              modelo_id: m && m.dbId,
              paciente_id: p.dbId,
              modo: modo || 'link'
            }, 'Não foi possível gerar o link da anamnese');
          case 1:
            r = _context10.v;
            return _context10.a(2, {
              id: r.id,
              token: r.token,
              link: linkAnamnese(r.token),
              expira: r.expira_em
            });
        }
      }, _callee10);
    }))();
  },
  salvarMapa: function salvarMapa(p, rec, existente) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
      var id, modeloId, imgPath, origem, sys, r, mm, _mm, prof, base, prodId, rows;
      return _regenerator().w(function (_context11) {
        while (1) switch (_context11.n) {
          case 0:
            id = existente ? rec.id : rec.id || novoId();
            modeloId = null, imgPath = null, origem = null;
            sys = SYS_MODELS.find(function (x) {
              return x[0] === rec.bg;
            });
            if (!sys) {
              _context11.n = 2;
              break;
            }
            _context11.n = 1;
            return DB.ler(SB.from('mapeamento_modelos').select('id').eq('sistema', true).eq('chave_sistema', sys[0]).limit(1));
          case 1:
            r = _context11.v;
            modeloId = r[0] && r[0].id;
            origem = 'modelo_sistema';
            _context11.n = 7;
            break;
          case 2:
            if (!(typeof rec.bg === 'string' && /^(data:|blob:)/.test(rec.bg))) {
              _context11.n = 6;
              break;
            }
            mm = (MODEL_STORE.v || []).find(function (x) {
              return x.src === rec.bg;
            });
            if (!mm) {
              _context11.n = 3;
              break;
            }
            modeloId = mm.dbId;
            origem = 'modelo_clinica';
            _context11.n = 5;
            break;
          case 3:
            _context11.n = 4;
            return ARQ.enviarDataUrl('prontuario', 'pacientes/' + p.dbId + '/mapeamentos', rec.bg, 'foto.png');
          case 4:
            imgPath = _context11.v;
            origem = 'foto_paciente';
          case 5:
            _context11.n = 7;
            break;
          case 6:
            if (rec.bgPath) {
              imgPath = rec.bgPath;
              origem = 'foto_paciente';
            } else if (typeof rec.bg === 'string' && /^https?:/.test(rec.bg)) {
              _mm = (MODEL_STORE.v || []).find(function (x) {
                return x.src === rec.bg;
              });
              if (_mm) {
                modeloId = _mm.dbId;
                origem = 'modelo_clinica';
              }
            }
          case 7:
            prof = PROF0.find(function (x) {
              return x.usuarioId && x.usuarioId === UID();
            });
            base = {
              titulo: rec.title,
              modelo_id: modeloId,
              imagem_path: imgPath,
              origem_imagem: origem,
              categoria: rec.cat || null,
              area_descricao: rec.cat === 'outra' ? String(rec.catDesc || '').trim() || null : null,
              observacoes: String(rec.obs || '').trim() || null
            };
            if (!existente) {
              _context11.n = 9;
              break;
            }
            _context11.n = 8;
            return DB.upd('mapeamentos', id, base, 'Não foi possível salvar o mapeamento');
          case 8:
            _context11.n = 10;
            break;
          case 9:
            _context11.n = 10;
            return DB.ins('mapeamentos', _objectSpread({
              id: id,
              paciente_id: p.dbId,
              profissional_id: prof ? prof.dbId : null
            }, base), 'Não foi possível salvar o mapeamento');
          case 10:
            if (!existente) {
              _context11.n = 11;
              break;
            }
            _context11.n = 11;
            return DB.updWhere('mapeamento_marcacoes', {
              excluido_em: agoraIso()
            }, {
              mapeamento_id: id,
              excluido_em: null
            });
          case 11:
            prodId = function prodId(nome) {
              var mp = mapProd(nome);
              if (mp && mp.prodId) return mp.prodId;
              var pr = nome && (CAT_EXTRA.v.produtos || []).find(function (x) {
                return x.nome.toLowerCase().startsWith(String(nome).toLowerCase());
              });
              return pr ? pr.id : null;
            };
            rows = [].concat(_toConsumableArray(rec.points.map(function (x, i) {
              var mp = mapProd(x.prod) || {};
              var u = x.un != null ? x.un : mp.u;
              return {
                mapeamento_id: id,
                tipo: 'ponto',
                ordem: i + 1,
                produto_id: prodId(x.prod),
                item_mapa: x.prod,
                dose: x.dose || null,
                unidade: u ? String(u).trim() : null,
                posicao_x: Math.round(x.x * 100) / 100,
                posicao_y: Math.round(x.y * 100) / 100,
                cor: x.cor || mp.c || null,
                comentario: x.com || null
              };
            })), _toConsumableArray(rec.strokes.map(function (s, i) {
              return {
                mapeamento_id: id,
                tipo: s.type === 'pen' ? 'pincel' : 'linha',
                ordem: rec.points.length + i + 1,
                pontos_tracado: s.pts.map(function (q) {
                  return [Math.round(q[0] * 10) / 10, Math.round(q[1] * 10) / 10];
                }),
                cor: s.color,
                espessura: Math.round(s.w),
                opacidade: s.op,
                comentario: s.com || null
              };
            })));
            if (!rows.length) {
              _context11.n = 12;
              break;
            }
            _context11.n = 12;
            return DB.ins('mapeamento_marcacoes', rows, 'Não foi possível salvar as marcações');
          case 12:
            return _context11.a(2, id);
        }
      }, _callee11);
    }))();
  },
  // procedimento registrado no prontuário; data e hora digitadas valem como horário de Brasília. Anexos vão para a pasta Procedimentos.
  salvarProc: function salvarProc(p, r, pastas) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
      var id, pr, prof, dt, quando, docs, rows;
      return _regenerator().w(function (_context13) {
        while (1) switch (_context13.n) {
          case 0:
            id = novoId();
            pr = (CAT.v.procedimentos || []).find(function (x) {
              return x.nome === r.title;
            });
            prof = PROF0.find(function (x) {
              return x.nome === r.pro;
            });
            dt = String(r.dt || ''), quando = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(dt) ? BR.instante(dt.slice(0, 10), dt.slice(11, 16)) : new Date();
            _context13.n = 1;
            return DB.ins('procedimentos_realizados', {
              id: id,
              paciente_id: p.dbId,
              mapeamento_id: r.mapaId || null,
              procedimento_id: pr ? pr.id : null,
              procedimento_nome: r.title,
              profissional_id: prof ? prof.dbId : null,
              status: {
                Realizado: 'realizado',
                Agendado: 'agendado',
                Cancelado: 'cancelado'
              }[r.status] || 'realizado',
              data_hora: quando.toISOString(),
              duracao_minutos: r.dur,
              valor: r.valor != null ? r.valor : pr ? pr.valor : null,
              regiao: String(r.regiao || '').trim() || null,
              observacoes: r.obs || null
            }, 'Não foi possível registrar o procedimento');
          case 1:
            if (!(r.mats && r.mats.length)) {
              _context13.n = 2;
              break;
            }
            _context13.n = 2;
            return DB.ins('procedimento_insumos', r.mats.map(function (m) {
              var pd = (CAT_EXTRA.v.produtos || []).find(function (x) {
                return x.nome === m.nome;
              });
              return {
                procedimento_realizado_id: id,
                produto_id: pd ? pd.id : null,
                produto_nome: m.nome,
                quantidade: m.q,
                unidade: pd && pd.unidade ? pd.unidade.nome : null
              };
            }), 'Não foi possível registrar os materiais');
          case 2:
            docs = [];
            if (!(r.arquivos && r.arquivos.length)) {
              _context13.n = 5;
              break;
            }
            _context13.n = 3;
            return ProntSvc.enviarArquivos(p, r.arquivos, 'Procedimentos', pastas || [], 'upload_equipe', {
              procedimento_realizado_id: id
            });
          case 3:
            rows = _context13.v;
            _context13.n = 4;
            return Promise.all(rows.map(/*#__PURE__*/function () {
              var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(d) {
                var _t9, _t0, _t1, _t10, _t11, _t12, _t13, _t14, _t15, _t16;
                return _regenerator().w(function (_context12) {
                  while (1) switch (_context12.n) {
                    case 0:
                      _t9 = d.id;
                      _t0 = d.id;
                      _t1 = d.nome_arquivo;
                      _t10 = d.pasta_id;
                      _t11 = BR.dataTela(d.data);
                      _t12 = d.tipo_arquivo === 'pdf' ? 'pdf' : d.tipo_arquivo === 'outro' ? 'outro' : 'img';
                      _context12.n = 1;
                      return ARQ.url('prontuario', d.path)["catch"](function () {
                        return null;
                      });
                    case 1:
                      _t13 = _context12.v;
                      _t14 = d.path;
                      _t15 = d.criado_em;
                      _t16 = id;
                      return _context12.a(2, {
                        id: _t9,
                        dbId: _t0,
                        name: _t1,
                        folder: 'Procedimentos',
                        pastaId: _t10,
                        date: _t11,
                        type: _t12,
                        url: _t13,
                        path: _t14,
                        criado: _t15,
                        procId: _t16
                      });
                  }
                }, _callee12);
              }));
              return function (_x) {
                return _ref5.apply(this, arguments);
              };
            }()));
          case 4:
            docs = _context13.v;
          case 5:
            return _context13.a(2, {
              id: id,
              docs: docs
            });
        }
      }, _callee13);
    }))();
  },
  enviarArquivos: function enviarArquivos(p, files, pastaNomeAlvo, pastas, origem, extra) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
      var pastaId, out, _iterator3, _step3, f, path, tipo, r, _t17;
      return _regenerator().w(function (_context14) {
        while (1) switch (_context14.p = _context14.n) {
          case 0:
            _context14.n = 1;
            return ProntSvc.pastaId(p, pastaNomeAlvo, pastas);
          case 1:
            pastaId = _context14.v;
            out = [];
            _iterator3 = _createForOfIteratorHelper(files);
            _context14.p = 2;
            _iterator3.s();
          case 3:
            if ((_step3 = _iterator3.n()).done) {
              _context14.n = 7;
              break;
            }
            f = _step3.value;
            _context14.n = 4;
            return ARQ.enviar('prontuario', 'pacientes/' + p.dbId + '/documentos', f);
          case 4:
            path = _context14.v;
            tipo = /pdf$/i.test(f.type) || /\.pdf$/i.test(f.name) ? 'pdf' : f.type.startsWith('image/') ? 'imagem' : 'outro';
            _context14.n = 5;
            return DB.ins('documentos_paciente', _objectSpread({
              paciente_id: p.dbId,
              pasta_id: pastaId,
              nome_arquivo: f.name,
              arquivo_path: path,
              tipo_arquivo: tipo,
              mime_type: f.type || null,
              tamanho_bytes: f.size,
              origem: origem || 'upload_equipe'
            }, extra || {}), 'Não foi possível salvar o documento');
          case 5:
            r = _context14.v;
            out.push(_objectSpread(_objectSpread({}, r), {}, {
              path: path
            }));
          case 6:
            _context14.n = 3;
            break;
          case 7:
            _context14.n = 9;
            break;
          case 8:
            _context14.p = 8;
            _t17 = _context14.v;
            _iterator3.e(_t17);
          case 9:
            _context14.p = 9;
            _iterator3.f();
            return _context14.f(9);
          case 10:
            return _context14.a(2, out);
        }
      }, _callee14, null, [[2, 8, 9, 10]]);
    }))();
  },
  moverDoc: function moverDoc(p, doc, pasta, pastas) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15() {
      var pid;
      return _regenerator().w(function (_context15) {
        while (1) switch (_context15.n) {
          case 0:
            _context15.n = 1;
            return ProntSvc.pastaId(p, pasta, pastas);
          case 1:
            pid = _context15.v;
            return _context15.a(2, DB.upd('documentos_paciente', doc.dbId, {
              pasta_id: pid
            }, 'Não foi possível mover o documento'));
        }
      }, _callee15);
    }))();
  },
  excluirDoc: function excluirDoc(doc) {
    return DB.del('documentos_paciente', doc.dbId, 'Não foi possível excluir o documento');
  },
  salvarComparacao: function salvarComparacao(p, a, b, pastas) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17() {
      var garantirDoc, ida, idb, pid, r;
      return _regenerator().w(function (_context17) {
        while (1) switch (_context17.n) {
          case 0:
            garantirDoc = /*#__PURE__*/function () {
              var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(d, pasta) {
                var blob, f, _yield$ProntSvc$envia, _yield$ProntSvc$envia2, r;
                return _regenerator().w(function (_context16) {
                  while (1) switch (_context16.n) {
                    case 0:
                      if (!d.dbId) {
                        _context16.n = 1;
                        break;
                      }
                      return _context16.a(2, d.dbId);
                    case 1:
                      _context16.n = 2;
                      return fetch(d.url);
                    case 2:
                      _context16.n = 3;
                      return _context16.v.blob();
                    case 3:
                      blob = _context16.v;
                      f = new File([blob], d.name, {
                        type: blob.type || 'image/jpeg'
                      });
                      _context16.n = 4;
                      return ProntSvc.enviarArquivos(p, [f], pasta, pastas);
                    case 4:
                      _yield$ProntSvc$envia = _context16.v;
                      _yield$ProntSvc$envia2 = _slicedToArray(_yield$ProntSvc$envia, 1);
                      r = _yield$ProntSvc$envia2[0];
                      d.dbId = r.id;
                      d.id = r.id;
                      return _context16.a(2, r.id);
                  }
                }, _callee16);
              }));
              return function garantirDoc(_x2, _x3) {
                return _ref6.apply(this, arguments);
              };
            }();
            _context17.n = 1;
            return garantirDoc(a, 'Antes');
          case 1:
            ida = _context17.v;
            _context17.n = 2;
            return garantirDoc(b, 'Depois');
          case 2:
            idb = _context17.v;
            _context17.n = 3;
            return ProntSvc.pastaId(p, 'Antes e Depois', pastas);
          case 3:
            pid = _context17.v;
            _context17.n = 4;
            return DB.ins('comparacoes_antes_depois', {
              paciente_id: p.dbId,
              pasta_id: pid,
              nome: 'Antes e depois ' + HOJE.slice(0, 5),
              documento_antes_id: ida,
              documento_depois_id: idb
            }, 'Não foi possível salvar o antes e depois');
          case 4:
            r = _context17.v;
            return _context17.a(2, r.id);
        }
      }, _callee17);
    }))();
  },
  linkDocumentos: function linkDocumentos(p, pastaNomeAlvo, pastas) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18() {
      var pid, r;
      return _regenerator().w(function (_context18) {
        while (1) switch (_context18.n) {
          case 0:
            _context18.n = 1;
            return ProntSvc.pastaId(p, pastaNomeAlvo, pastas);
          case 1:
            pid = _context18.v;
            _context18.n = 2;
            return DB.ins('links_envio_documentos', {
              paciente_id: p.dbId,
              pasta_id: pid
            }, 'Não foi possível gerar o link de envio');
          case 2:
            r = _context18.v;
            return _context18.a(2, linkDocs(r.token));
        }
      }, _callee18);
    }))();
  }
};

/* =====================================================================
   AGENDA
   ===================================================================== */
var AG_JANELA = {
  de: null,
  ate: null
};
var agTela = function agTela(r) {
  var ini = new Date(r.inicio),
    fim = new Date(r.fim),
    pz = BR.partes(ini);
  return {
    id: r.id,
    dbId: r.id,
    pac: r.paciente ? r.paciente.nome : r.observacoes || 'Compromisso',
    pacId: r.paciente_id,
    profId: r.profissional_id,
    date: pz.iso,
    h: pz.h,
    m: pz.m,
    span: Math.max(0.25, (fim - ini) / 3600000),
    ini: r.inicio,
    fim: r.fim,
    proc: r.procedimento ? r.procedimento.nome : '',
    orb: r.cor || r.tipo && r.tipo.cor || '#7C8CFF',
    status: r.status ? r.status.chave : null,
    tipo: r.tipo ? r.tipo.chave : null,
    duplicado: r.horario_duplicado,
    origem: r.origem
  };
};
var AG_SELECT = '*, paciente:pacientes(nome), procedimento:procedimentos(nome), status:status_agendamento(chave,nome,cor), tipo:tipos_agendamento(chave,nome,cor)';
CARGAS.agenda = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20() {
  var de, ate, rows;
  return _regenerator().w(function (_context20) {
    while (1) switch (_context20.n) {
      case 0:
        _context20.n = 1;
        return carregar('catalogos');
      case 1:
        de = BR.instante(isoOf(addD(TODAY, -150))), ate = BR.instante(isoOf(addD(TODAY, 240)));
        AG_JANELA.de = de;
        AG_JANELA.ate = ate;
        _context20.n = 2;
        return DB.tudo(function () {
          return DB.sel('agendamentos', AG_SELECT).gte('inicio', de.toISOString()).lt('inicio', ate.toISOString()).order('inicio').order('id');
        });
      case 2:
        rows = _context20.v;
        APPT_STORE.v = rows.map(agTela);
        avisar(APPT_STORE);
        tempoReal('agenda', ['agendamentos'], /*#__PURE__*/function () {
          var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(t, ev) {
            var id, r, resto;
            return _regenerator().w(function (_context19) {
              while (1) switch (_context19.n) {
                case 0:
                  id = ev["new"] && ev["new"].id || ev.old && ev.old.id;
                  if (id) {
                    _context19.n = 1;
                    break;
                  }
                  return _context19.a(2);
                case 1:
                  _context19.n = 2;
                  return DB.ler(DB.sel('agendamentos', AG_SELECT).eq('id', id))["catch"](function () {
                    return [];
                  });
                case 2:
                  r = _context19.v;
                  resto = APPT_STORE.v.filter(function (a) {
                    return a.id !== id;
                  });
                  APPT_STORE.v = r[0] ? [].concat(_toConsumableArray(resto), [agTela(r[0])]) : resto;
                  avisar(APPT_STORE);
                case 3:
                  return _context19.a(2);
              }
            }, _callee19);
          }));
          return function (_x4, _x5) {
            return _ref8.apply(this, arguments);
          };
        }());
      case 3:
        return _context20.a(2);
    }
  }, _callee20);
}));
// mês fora da janela carregada: busca e junta
function agendaGarantirMes(_x6) {
  return _agendaGarantirMes.apply(this, arguments);
} // blocos de um dia no formato da grade (coluna por profissional, linha a partir das 9h)
function _agendaGarantirMes() {
  _agendaGarantirMes = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22(mes) {
    var ini, fim, rows, ids;
    return _regenerator().w(function (_context22) {
      while (1) switch (_context22.n) {
        case 0:
          if (!(!SB_ON || !AG_JANELA.de)) {
            _context22.n = 1;
            break;
          }
          return _context22.a(2);
        case 1:
          ini = BR.instante(isoOf(new Date(mes.getFullYear(), mes.getMonth(), 1))), fim = BR.instante(isoOf(new Date(mes.getFullYear(), mes.getMonth() + 1, 1)));
          if (!(ini >= AG_JANELA.de && fim <= AG_JANELA.ate)) {
            _context22.n = 2;
            break;
          }
          return _context22.a(2);
        case 2:
          _context22.n = 3;
          return DB.ler(DB.sel('agendamentos', AG_SELECT).gte('inicio', ini.toISOString()).lt('inicio', fim.toISOString()).order('inicio'))["catch"](function () {
            return [];
          });
        case 3:
          rows = _context22.v;
          ids = new Set(APPT_STORE.v.map(function (a) {
            return a.id;
          }));
          APPT_STORE.v = [].concat(_toConsumableArray(APPT_STORE.v), _toConsumableArray(rows.map(agTela).filter(function (a) {
            return !ids.has(a.id);
          })));
          avisar(APPT_STORE);
          if (ini < AG_JANELA.de) AG_JANELA.de = ini;
          if (fim > AG_JANELA.ate) AG_JANELA.ate = fim;
        case 4:
          return _context22.a(2);
      }
    }, _callee22);
  }));
  return _agendaGarantirMes.apply(this, arguments);
}
function agendaDoDia(d) {
  var iso = isoOf(d);
  return APPT_STORE.v.filter(function (a) {
    return a.date === iso && a.status !== 'cancelado';
  }).map(function (a) {
    return {
      col: PROS.findIndex(function (p) {
        return p.id === a.profId;
      }),
      row: a.h - 9 + a.m / 60,
      n: a.pac,
      orb: a.orb,
      span: a.span,
      id: a.id,
      hi: BR.hm(a.ini),
      hf: BR.hm(a.fim),
      proc: a.proc
    };
  }).filter(function (s) {
    return s.col >= 0;
  });
}
var AgSvc = {
  criar: function criar(_ref9) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21() {
      var pacienteId, pacienteNome, profissionalId, inicio, fimParam, minutos, procedimento, duplicado, whatsapp, origem, tipo, conversaId, pr, fim, st, tp, r, full, a;
      return _regenerator().w(function (_context21) {
        while (1) switch (_context21.n) {
          case 0:
            pacienteId = _ref9.pacienteId, pacienteNome = _ref9.pacienteNome, profissionalId = _ref9.profissionalId, inicio = _ref9.inicio, fimParam = _ref9.fim, minutos = _ref9.minutos, procedimento = _ref9.procedimento, duplicado = _ref9.duplicado, whatsapp = _ref9.whatsapp, origem = _ref9.origem, tipo = _ref9.tipo, conversaId = _ref9.conversaId;
            pr = procedimento ? (CAT.v.procedimentos || []).find(function (x) {
              return x.nome === procedimento;
            }) : null; // fim pode ser passado diretamente (horaFim) ou calculado por minutos/duração padrão
            fim = fimParam instanceof Date ? fimParam : new Date(inicio.getTime() + (minutos || pr && pr.duracao_padrao_minutos || 60) * 60000);
            st = (CAT.v.status || []).find(function (s) {
              return s.chave === 'agendado';
            });
            tp = (CAT.v.tipos || []).find(function (s) {
              return s.chave === (tipo || 'consulta');
            });
            _context21.n = 1;
            return DB.ins('agendamentos', {
              paciente_id: pacienteId || null,
              profissional_id: profissionalId,
              procedimento_id: pr ? pr.id : null,
              inicio: inicio.toISOString(),
              fim: fim.toISOString(),
              status_agendamento_id: st ? st.id : null,
              tipo_agendamento_id: tp ? tp.id : null,
              horario_duplicado: !!duplicado,
              enviar_confirmacao_whatsapp: whatsapp !== false,
              origem: origem || 'equipe',
              observacoes: pacienteId ? null : pacienteNome || null,
              conversa_id: conversaId || null
            }, 'Não foi possível agendar');
          case 1:
            r = _context21.v;
            _context21.n = 2;
            return DB.ler(DB.sel('agendamentos', AG_SELECT).eq('id', r.id));
          case 2:
            full = _context21.v;
            a = agTela(full[0] || r);
            APPT_STORE.v = [].concat(_toConsumableArray(APPT_STORE.v.filter(function (x) {
              return x.id !== a.id;
            })), [a]);
            avisar(APPT_STORE);
            return _context21.a(2, a);
        }
      }, _callee21);
    }))();
  },
  // reagendar / mudar profissional ou status de um agendamento existente
  editar: function editar(id, campos) {
    var patch = {};
    if (campos.inicio) patch.inicio = campos.inicio.toISOString();
    if (campos.fim) patch.fim = campos.fim.toISOString();
    if (campos.profissionalId) patch.profissional_id = campos.profissionalId;
    if (campos.duplicado !== undefined) patch.horario_duplicado = !!campos.duplicado;
    if (campos.status) {
      var st = (CAT.v.status || []).find(function (s) {
        return s.chave === campos.status;
      });
      if (st) patch.status_agendamento_id = st.id;
    }
    return DB.upd('agendamentos', id, patch, 'Não foi possível salvar o agendamento').then(function () {
      return DB.ler(DB.sel('agendamentos', AG_SELECT).eq('id', id));
    }).then(function (full) {
      var a = agTela(full[0]);
      APPT_STORE.v = [].concat(_toConsumableArray(APPT_STORE.v.filter(function (x) {
        return x.id !== a.id;
      })), [a]);
      avisar(APPT_STORE);
      return a;
    });
  }
};
// números do quadro "Atividade mensal" e indicadores da Agenda
function agendaResumo(dia) {
  var ap = APPT_STORE.v.filter(function (a) {
    return a.status !== 'cancelado';
  });
  var doDia = ap.filter(function (a) {
    return a.date === isoOf(dia);
  });
  var min = doDia.reduce(function (s, a) {
    return s + a.span * 60;
  }, 0);
  var tempo = min ? Math.floor(min / 60) + 'h ' + String(Math.round(min % 60)).padStart(2, '0') + 'm' : '0h 00m';
  var porPac = {};
  ap.filter(function (a) {
    return a.pacId && a.date <= TODAY_ISO;
  }).forEach(function (a) {
    (porPac[a.pacId] = porPac[a.pacId] || []).push(a.date);
  });
  var gaps = [];
  Object.values(porPac).forEach(function (ds) {
    var u = Array.from(new Set(ds)).sort();
    for (var i = 1; i < u.length; i++) gaps.push((new Date(u[i]) - new Date(u[i - 1])) / 86400000);
  });
  var media = gaps.length ? Math.round(gaps.reduce(function (s, x) {
    return s + x;
  }, 0) / gaps.length) + ' dias' : 'Sem dados';
  var cont = [0, 0, 0, 0, 0, 0, 0],
    ini30 = isoOf(addD(TODAY, -30));
  ap.filter(function (a) {
    return a.date >= ini30 && a.date <= TODAY_ISO;
  }).forEach(function (a) {
    cont[new Date(a.date + 'T12:00:00').getDay()]++;
  });
  var mx = Math.max.apply(Math, cont);
  var NOMES = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  return {
    tempo: tempo,
    media: media,
    melhor: mx ? NOMES[cont.indexOf(mx)] : 'Sem dados'
  };
}
function mesGrade(ref) {
  var ini = new Date(ref.getFullYear(), ref.getMonth(), 1),
    dias = new Date(ref.getFullYear(), ref.getMonth() + 1, 0).getDate();
  var pre = isoOf(ini).slice(0, 7);
  var bold = Array.from(new Set(APPT_STORE.v.filter(function (a) {
    return a.status !== 'cancelado' && a.date.slice(0, 7) === pre;
  }).map(function (a) {
    return +a.date.slice(8, 10);
  })));
  return {
    startOffset: ini.getDay(),
    days: dias,
    today: TODAY.getFullYear() === ref.getFullYear() && TODAY.getMonth() === ref.getMonth() ? TODAY.getDate() : -1,
    bold: bold
  };
}
Object.assign(window, {
  substituir: substituir,
  substituirObj: substituirObj,
  novoId: novoId,
  hidratarCatalogos: hidratarCatalogos,
  CAT_EXTRA: CAT_EXTRA,
  pk: pk,
  pacTela: pacTela,
  PacSvc: PacSvc,
  ProntSvc: ProntSvc,
  AgSvc: AgSvc,
  agendaDoDia: agendaDoDia,
  agendaGarantirMes: agendaGarantirMes,
  agendaResumo: agendaResumo,
  mesGrade: mesGrade,
  linkAnamnese: linkAnamnese,
  linkDocs: linkDocs,
  quemSou: quemSou,
  LINK_BASE: LINK_BASE,
  avisar: avisar
});

/* ---------- Novo agendamento rápido (botão global do topo) ---------- */
var MES_CURTO = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
function agendarRapido(_x7, _x8) {
  return _agendarRapido.apply(this, arguments);
}
function _agendarRapido() {
  _agendarRapido = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee23(nv, setToast) {
    var nome, pro, hm, hmFim, dia, ini, fim, fimFinal, p, choca, a, _t18;
    return _regenerator().w(function (_context23) {
      while (1) switch (_context23.p = _context23.n) {
        case 0:
          nome = String(nv.pac || '').trim();
          if (nome) {
            _context23.n = 1;
            break;
          }
          avisoErro('Falta o paciente', 'Digite o nome do paciente.');
          return _context23.a(2, false);
        case 1:
          pro = PROS.find(function (x) {
            return x.n === (nv.pro || (PROS[0] || {}).n);
          });
          if (pro) {
            _context23.n = 2;
            break;
          }
          avisoErro('Falta o profissional', 'Cadastre um profissional em Configurações.');
          return _context23.a(2, false);
        case 2:
          hm = /^\d{1,2}:\d{2}$/.test(String(nv.hora || '')) ? String(nv.hora).padStart(5, '0') : '09:00';
          hmFim = /^\d{1,2}:\d{2}$/.test(String(nv.horaFim || '')) ? String(nv.horaFim).padStart(5, '0') : null;
          dia = TODAY_ISO, ini = BR.instante(dia, hm);
          if (ini < new Date()) {
            dia = isoOf(addD(TODAY, 1));
            ini = BR.instante(dia, hm);
          } // horário que já passou vai para amanhã
          // fim: usa horaFim se fornecido, caso contrário +1h
          fim = hmFim ? BR.instante(dia, hmFim) : new Date(ini.getTime() + 3600000); // garante que fim > ini (se horaFim inválido ou menor, +1h do início)
          fimFinal = fim > ini ? fim : new Date(ini.getTime() + 3600000);
          _context23.p = 3;
          _context23.n = 4;
          return Promise.all([carregar('pacientes'), carregar('agenda')]);
        case 4:
          _context23.n = 5;
          return PacSvc.garantir(nome);
        case 5:
          p = _context23.v;
          choca = APPT_STORE.v.some(function (a) {
            return a.profId === pro.id && a.status !== 'cancelado' && new Date(a.ini) < fimFinal && new Date(a.fim) > ini;
          });
          _context23.n = 6;
          return AgSvc.criar({
            pacienteId: p.dbId,
            pacienteNome: p.nome,
            profissionalId: pro.id,
            inicio: ini,
            fim: fimFinal,
            duplicado: choca,
            whatsapp: nv.wpp,
            origem: 'equipe',
            conversaId: nv.conversaId || null
          });
        case 6:
          a = _context23.v;
          PacSvc.hist(p, {
            t: 'Agendamento criado',
            s: pro.n + ' · ' + dBR(dia) + ' às ' + hm,
            c: '#1F5EFF',
            tipo: 'agendamento',
            tabela: 'agendamentos',
            registro: a.id
          });
          setToast({
            tone: 'success',
            title: 'Agendamento criado',
            description: p.nome + ' · ' + +dia.slice(8, 10) + ' ' + MES_CURTO[+dia.slice(5, 7) - 1] + ' · ' + hm
          });
          return _context23.a(2, true);
        case 7:
          _context23.p = 7;
          _t18 = _context23.v;
          return _context23.a(2, false);
      }
    }, _callee23, null, [[3, 7]]);
  }));
  return _agendarRapido.apply(this, arguments);
}
window.agendarRapido = agendarRapido;

// demonstração: produtos do mapa ligados ao estoque de exemplo
if (!SB_ON) hidratarMapa();