"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* =====================================================================
   SUPABASE: conexão única do sistema (Salute 02)
   A URL e a chave pública (anon) vêm do arquivo config.js, gerado a partir
   das variáveis de ambiente SUPABASE_URL e SUPABASE_ANON_KEY.
   Sem configuração, o sistema roda em modo demonstração e avisa na tela.
   A chave service role nunca entra no front: se alguém colar uma, o sistema recusa.
   ===================================================================== */
var SB_CFG = function () {
  var c = window.SALUTE_CONFIG || {};
  return {
    url: String(c.SUPABASE_URL || c.supabaseUrl || '').trim().replace(/\/+$/, '').replace(/\/rest\/v1$/, ''),
    key: String(c.SUPABASE_ANON_KEY || c.supabaseAnonKey || '').trim()
  };
}();
var SB_KEY_ERRADA = function () {
  var k = SB_CFG.key;
  if (!k) return false;
  if (/^sb_secret_/i.test(k)) return true;
  try {
    var p = JSON.parse(atob(k.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
    return p.role === 'service_role';
  } catch (e) {
    return false;
  }
}();
var SB = function () {
  try {
    if (!SB_CFG.url || !SB_CFG.key || SB_KEY_ERRADA || !window.supabase || !window.supabase.createClient) return null;
    return window.supabase.createClient(SB_CFG.url, SB_CFG.key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    });
  } catch (e) {
    console.error('[supabase]', e);
    return null;
  }
}();
var SB_ON = !!SB;
var SB_MOTIVO = SB_ON ? null : SB_KEY_ERRADA ? 'A chave configurada é a service role. Use a chave pública (anon).' : !SB_CFG.url || !SB_CFG.key ? 'As variáveis SUPABASE_URL e SUPABASE_ANON_KEY não foram preenchidas.' : 'A biblioteca do Supabase não carregou.';

/* ---------- Sessão: quem está logado e em qual clínica ---------- */
var SESSAO = makeStore({
  estado: SB_ON ? 'carregando' : 'demo',
  perfil: null,
  clinicas: [],
  clinica: null,
  modulos: null,
  erro: null,
  recuperar: false,
  admin: false,
  suporte: null
});
var CLI = function CLI() {
  return SESSAO.v.clinica ? SESSAO.v.clinica.id : null;
};
var UID = function UID() {
  return SESSAO.v.perfil ? SESSAO.v.perfil.id : null;
};
var setSessao = function setSessao(p) {
  SESSAO.v = _objectSpread(_objectSpread({}, SESSAO.v), p);
  SESSAO.subs.forEach(function (f) {
    return f();
  });
};

/* ---------- Endereços do sistema: tudo dentro da pasta de publicação (ex.: /novoapp) ----------
   O config.js diz onde o sistema está publicado (BASE_PATH). Com BASE_PATH, cada tela tem endereço próprio
   (/novoapp/painel, /novoapp/crm...) e o voltar do navegador funciona. Sem BASE_PATH (demonstração),
   o sistema continua sem mudar o endereço. Todo endereço do sistema passa por aqui. */
var BASE_PATH = function () {
  var c = window.SALUTE_CONFIG || {};
  if (typeof c.BASE_PATH !== 'string') return null;
  var b = c.BASE_PATH.trim().replace(/^\/+|\/+$/g, '');
  return b ? '/' + b : '';
}();
var ROTAS_URL = BASE_PATH !== null;
var ROTA_TELA = {
  painel: {
    tela: 'painel'
  },
  pacientes: {
    tela: 'pacientes'
  },
  agenda: {
    tela: 'agenda'
  },
  mensagens: {
    tela: 'mensagens',
    prefs: {
      'mensagens.crm': false
    }
  },
  crm: {
    tela: 'mensagens',
    prefs: {
      'mensagens.crm': true
    }
  },
  gestao: {
    tela: 'gestao'
  },
  estoque: {
    tela: 'gestao',
    prefs: {
      'gestao.area': 'estoque'
    }
  },
  financeiro: {
    tela: 'gestao',
    prefs: {
      'gestao.area': 'financeiro'
    }
  },
  configuracoes: {
    tela: 'perfil'
  },
  perfil: {
    tela: 'perfil',
    prefs: {
      'config.aba': 'conta'
    }
  }
};
// endereço completo de uma tela do sistema (usado nos emails de login, senha nova e convite)
var urlApp = function urlApp(caminho) {
  return location.origin + (BASE_PATH || '') + '/' + String(caminho || '').replace(/^\/+/, '');
};
// para onde o link do email volta: no modo com endereços, sempre a tela de entrar do sistema
var voltaAuth = function voltaAuth() {
  return ROTAS_URL ? urlApp('login') : location.href.split('#')[0];
};
function caminhoAtual() {
  var p = location.pathname;
  if (BASE_PATH && (p === BASE_PATH || p.startsWith(BASE_PATH + '/'))) p = p.slice(BASE_PATH.length);
  return p.replace(/^\/+|\/+$/g, '').split('/')[0] || '';
}
var filtrosPref = function filtrosPref() {
  return PREF.v && PREF.v.filtros || {};
};
function caminhoDaTela(tela) {
  var f = filtrosPref();
  if (tela === 'mensagens') return f['mensagens.crm'] ? 'crm' : 'mensagens';
  if (tela === 'gestao') return f['gestao.area'] === 'financeiro' ? 'financeiro' : 'estoque';
  if (tela === 'perfil') return f['config.aba'] === 'conta' ? 'perfil' : 'configuracoes';
  return tela;
}
function aplicarPrefsRota(prefs) {
  if (!prefs || !SB_ON || !PREF.v) return;
  var f = filtrosPref();
  if (Object.keys(prefs).every(function (k) {
    return f[k] === prefs[k];
  })) return;
  salvarPref({
    filtros: _objectSpread(_objectSpread({}, f), prefs)
  });
}
// troca o endereço sem recarregar; mantém o #renata-voz da janela de voz
function trocarUrl(caminho, novo) {
  if (!ROTAS_URL) return;
  var alvo = (BASE_PATH || '') + '/' + caminho,
    q = caminho === 'login' || caminho === 'cadastro' ? location.search.replace(/[?&](a|u)=[^&]*/g, '') : '';
  var h = /renata-voz|access_token|error_description/.test(location.hash) ? location.hash : '';
  if (location.pathname + location.search === alvo + q) return;
  try {
    history[novo ? 'pushState' : 'replaceState']({
      salute: caminho
    }, '', alvo + q + h);
  } catch (e) {}
}
// tela inicial pelo endereço: /novoapp/crm abre o CRM; depois do login volta para a tela pedida
function rotaInicialUrl() {
  if (!ROTAS_URL) return null;
  var c = caminhoAtual();
  if (c === 'login' || c === 'cadastro' || c === 'master' || !c) {
    var v = new URLSearchParams(location.search).get('volta');
    c = v || '';
  }
  var d = ROTA_TELA[c];
  if (!d) return null;
  aplicarPrefsRota(d.prefs);
  return d.tela;
}
// dentro do sistema: o endereço acompanha a tela e o voltar do navegador troca de tela
function SincronizaUrl(_ref) {
  var route = _ref.route,
    ir = _ref.ir;
  useStore(PREF);
  var irRef = React.useRef(ir);
  irRef.current = ir;
  var primeira = React.useRef(true);
  var alvo = ROTAS_URL ? caminhoDaTela(route) : null;
  React.useEffect(function () {
    if (!ROTAS_URL) return;
    var atual = caminhoAtual();
    trocarUrl(alvo, !primeira.current && !!ROTA_TELA[atual] && atual !== alvo);
    primeira.current = false;
  }, [alvo]);
  React.useEffect(function () {
    if (!ROTAS_URL) return undefined;
    var voltar = function voltar() {
      var d = ROTA_TELA[caminhoAtual()];
      if (!d) return;
      aplicarPrefsRota(d.prefs);
      irRef.current(d.tela);
    };
    window.addEventListener('popstate', voltar);
    return function () {
      return window.removeEventListener('popstate', voltar);
    };
  }, []);
  return null;
}

/* ---------- Retorno visual de gravação (carregando, sucesso, erro) ---------- */
var SALVA = makeStore({
  pend: 0,
  erro: null,
  ok: null
});
var salvaSet = function salvaSet(p) {
  SALVA.v = _objectSpread(_objectSpread({}, SALVA.v), p);
  SALVA.subs.forEach(function (f) {
    return f();
  });
};
var MSG_ERRO = function MSG_ERRO(e) {
  var m = String(e && (e.message || e.error_description || e.msg) || e || '');
  if (/row-level security|permission denied|violates row/i.test(m)) return 'Seu usuário não tem permissão para esta ação.';
  if (/duplicate key|unique/i.test(m)) return 'Já existe um registro igual.';
  if (/Failed to fetch|NetworkError|network/i.test(m)) return 'Sem conexão com o banco. Confira a internet e tente de novo.';
  if (/JWT|token/i.test(m)) return 'Sua sessão expirou. Entre de novo.';
  if (/Estoque insuficiente/i.test(m)) return m;
  return m || 'Erro desconhecido.';
};
function avisoErro(titulo, e) {
  console.error('[supabase]', titulo, e);
  salvaSet({
    erro: {
      id: Date.now(),
      titulo: titulo,
      desc: MSG_ERRO(e)
    }
  });
}
function avisoOk(titulo, desc) {
  salvaSet({
    ok: {
      id: Date.now(),
      titulo: titulo,
      desc: desc
    }
  });
}

/* ---------- Acesso aos dados, sempre filtrado pela clínica ativa ---------- */
var agoraIso = function agoraIso() {
  return new Date().toISOString();
};
var DB = {
  sel: function sel(t, cols) {
    return SB.from(t).select(cols || '*').eq('clinica_id', CLI()).is('excluido_em', null);
  },
  ler: function ler(q, titulo) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var _yield$q, data, error;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            _context.n = 1;
            return q;
          case 1:
            _yield$q = _context.v;
            data = _yield$q.data;
            error = _yield$q.error;
            if (!error) {
              _context.n = 2;
              break;
            }
            avisoErro(titulo || 'Não foi possível carregar os dados', error);
            throw error;
          case 2:
            return _context.a(2, data);
        }
      }, _callee);
    }))();
  },
  // o Supabase devolve no máximo 1000 linhas por vez: busca em páginas até acabar
  tudo: function tudo(montar, titulo) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var out, i, d;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            out = [];
            i = 0;
          case 1:
            _context2.n = 2;
            return DB.ler(montar().range(i, i + 999), titulo);
          case 2:
            d = _context2.v;
            out.push.apply(out, _toConsumableArray(d));
            if (!(d.length < 1000)) {
              _context2.n = 3;
              break;
            }
            return _context2.a(2, out);
          case 3:
            i += 1000;
            _context2.n = 1;
            break;
          case 4:
            return _context2.a(2);
        }
      }, _callee2);
    }))();
  },
  gravar: function gravar(q, titulo) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var _yield$q2, data, error;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            salvaSet({
              pend: SALVA.v.pend + 1
            });
            _context3.p = 1;
            _context3.n = 2;
            return q;
          case 2:
            _yield$q2 = _context3.v;
            data = _yield$q2.data;
            error = _yield$q2.error;
            if (!error) {
              _context3.n = 3;
              break;
            }
            avisoErro(titulo || 'Não foi possível salvar', error);
            throw error;
          case 3:
            return _context3.a(2, data);
          case 4:
            _context3.p = 4;
            salvaSet({
              pend: Math.max(0, SALVA.v.pend - 1)
            });
            return _context3.f(4);
          case 5:
            return _context3.a(2);
        }
      }, _callee3, null, [[1,, 4, 5]]);
    }))();
  },
  ins: function ins(t, row, titulo) {
    var rows = Array.isArray(row) ? row.map(function (r) {
      return _objectSpread({
        clinica_id: CLI()
      }, r);
    }) : _objectSpread({
      clinica_id: CLI()
    }, row);
    var q = SB.from(t).insert(rows).select();
    return DB.gravar(Array.isArray(row) ? q : q.single(), titulo);
  },
  upd: function upd(t, id, patch, titulo) {
    return DB.gravar(SB.from(t).update(patch).eq('id', id).eq('clinica_id', CLI()).select().single(), titulo);
  },
  updWhere: function updWhere(t, patch, filtro, titulo) {
    var q = SB.from(t).update(patch).eq('clinica_id', CLI());
    Object.entries(filtro).forEach(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
        k = _ref3[0],
        v = _ref3[1];
      q = v === null ? q.is(k, null) : q.eq(k, v);
    });
    return DB.gravar(q.select(), titulo);
  },
  del: function del(t, id, titulo) {
    return DB.upd(t, id, {
      excluido_em: agoraIso()
    }, titulo || 'Não foi possível excluir');
  },
  rpc: function rpc(fn, args, titulo) {
    return DB.gravar(SB.rpc(fn, args || {}), titulo);
  }
};
// grava em segundo plano: a tela já mudou; se o banco recusar, avisa e roda o desfazer
function bg(promise, desfazer) {
  promise["catch"](function () {
    if (desfazer) try {
      desfazer();
    } catch (e) {}
  });
  return promise;
}

/* ---------- Arquivos: pastas privadas e link assinado ---------- */
var ARQ_CACHE = {};
var nomeSeguro = function nomeSeguro(n) {
  return String(n || 'arquivo').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^\w.]+/g, '_').slice(-80);
};
var ARQ = {
  enviar: function enviar(bucket, pasta, file, nome) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var path, _yield$SB$storage$fro, error;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            path = CLI() + '/' + pasta + '/' + Date.now().toString(36) + '_' + nomeSeguro(nome || file.name);
            salvaSet({
              pend: SALVA.v.pend + 1
            });
            _context4.p = 1;
            _context4.n = 2;
            return SB.storage.from(bucket).upload(path, file, {
              contentType: file.type || 'application/octet-stream',
              upsert: false
            });
          case 2:
            _yield$SB$storage$fro = _context4.v;
            error = _yield$SB$storage$fro.error;
            if (!error) {
              _context4.n = 3;
              break;
            }
            avisoErro('Não foi possível enviar o arquivo', error);
            throw error;
          case 3:
            return _context4.a(2, path);
          case 4:
            _context4.p = 4;
            salvaSet({
              pend: Math.max(0, SALVA.v.pend - 1)
            });
            return _context4.f(4);
          case 5:
            return _context4.a(2);
        }
      }, _callee4, null, [[1,, 4, 5]]);
    }))();
  },
  enviarDataUrl: function enviarDataUrl(bucket, pasta, dataUrl, nome) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var b;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            _context5.n = 1;
            return fetch(dataUrl);
          case 1:
            _context5.n = 2;
            return _context5.v.blob();
          case 2:
            b = _context5.v;
            return _context5.a(2, ARQ.enviar(bucket, pasta, new File([b], nome || 'imagem.png', {
              type: b.type
            }), nome));
        }
      }, _callee5);
    }))();
  },
  url: function url(bucket, path) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      var k, c, _yield$SB$storage$fro2, data, error;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            if (path) {
              _context6.n = 1;
              break;
            }
            return _context6.a(2, null);
          case 1:
            if (!/^(data:|blob:|https?:)/.test(path)) {
              _context6.n = 2;
              break;
            }
            return _context6.a(2, path);
          case 2:
            k = bucket + ':' + path, c = ARQ_CACHE[k];
            if (!(c && c.ate > Date.now())) {
              _context6.n = 3;
              break;
            }
            return _context6.a(2, c.url);
          case 3:
            _context6.n = 4;
            return SB.storage.from(bucket).createSignedUrl(path, 3600);
          case 4:
            _yield$SB$storage$fro2 = _context6.v;
            data = _yield$SB$storage$fro2.data;
            error = _yield$SB$storage$fro2.error;
            if (!error) {
              _context6.n = 5;
              break;
            }
            return _context6.a(2, null);
          case 5:
            ARQ_CACHE[k] = {
              url: data.signedUrl,
              ate: Date.now() + 50 * 60000
            };
            return _context6.a(2, data.signedUrl);
        }
      }, _callee6);
    }))();
  }
};
// hook para mostrar arquivo privado (troca o caminho pelo link assinado)
function useArqUrl(bucket, path) {
  var _React$useState = React.useState(function () {
      return path && /^(data:|blob:|https?:)/.test(path) ? path : null;
    }),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    u = _React$useState2[0],
    setU = _React$useState2[1];
  React.useEffect(function () {
    var vivo = true;
    if (!path || !SB_ON) {
      setU(path || null);
      return;
    }
    ARQ.url(bucket, path).then(function (x) {
      return vivo && setU(x);
    });
    return function () {
      vivo = false;
    };
  }, [bucket, path]);
  return u;
}

/* ---------- Tempo real ---------- */
var RT_CANAIS = {};
function tempoReal(nome, tabelas, aoMudar) {
  if (!SB_ON || !CLI()) return function () {};
  var id = nome + ':' + CLI();
  if (RT_CANAIS[id]) SB.removeChannel(RT_CANAIS[id]);
  var ch = SB.channel(id);
  tabelas.forEach(function (t) {
    ch = ch.on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: t,
      filter: 'clinica_id=eq.' + CLI()
    }, function (p) {
      return aoMudar(t, p);
    });
  });
  RT_CANAIS[id] = ch.subscribe();
  return function () {
    if (RT_CANAIS[id]) {
      SB.removeChannel(RT_CANAIS[id]);
      delete RT_CANAIS[id];
    }
  };
}

/* ---------- Carga de cada módulo (uma vez por clínica; recarrega quando pedido) ---------- */
var CARGAS = {}; // nome -> função async que preenche os stores
var CARGA = makeStore({}); // nome -> 'carregando' | 'ok' | 'erro'
var cargaSet = function cargaSet(k, v) {
  CARGA.v = _objectSpread(_objectSpread({}, CARGA.v), {}, _defineProperty({}, k, v));
  CARGA.subs.forEach(function (f) {
    return f();
  });
};
var CARGA_PROM = {};
function carregar(nome, forcar) {
  if (!SB_ON || SESSAO.v.estado !== 'pronto' || !CARGAS[nome]) return Promise.resolve();
  if (CARGA_PROM[nome] && !forcar) return CARGA_PROM[nome];
  cargaSet(nome, 'carregando');
  CARGA_PROM[nome] = CARGAS[nome]().then(function () {
    return cargaSet(nome, 'ok');
  }, function (e) {
    cargaSet(nome, 'erro');
    delete CARGA_PROM[nome];
    console.error('[carga]', nome, e);
  });
  return CARGA_PROM[nome];
}
// usado pelas telas: dispara a carga e devolve o estado
function useCarga() {
  for (var _len = arguments.length, nomes = new Array(_len), _key = 0; _key < _len; _key++) {
    nomes[_key] = arguments[_key];
  }
  var _useStore = useStore(CARGA),
    _useStore2 = _slicedToArray(_useStore, 1),
    c = _useStore2[0];
  useStore(SESSAO);
  React.useEffect(function () {
    nomes.forEach(function (n) {
      return carregar(n);
    });
  }, [SESSAO.v.estado, CLI()]);
  if (!SB_ON) return 'ok';
  var st = nomes.map(function (n) {
    return c[n] || 'carregando';
  });
  return st.includes('erro') ? 'erro' : st.includes('carregando') ? 'carregando' : 'ok';
}
// estado de carga e erro com os componentes que já existem
function CargaEstado(_ref4) {
  var estado = _ref4.estado,
    onRetry = _ref4.onRetry,
    children = _ref4.children,
    compact = _ref4.compact;
  var _window$SaluteProjeto = window.SaluteProjetoDesigner_8b4683,
    CEmpty = _window$SaluteProjeto.EmptyState,
    CBtn = _window$SaluteProjeto.Button;
  if (estado === 'carregando') return /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, glass), {}, {
      padding: compact ? 18 : 28,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      color: 'var(--text-muted)',
      fontSize: 14
    })
  }, /*#__PURE__*/React.createElement(SIcon, {
    name: "loader-circle",
    size: 18,
    style: {
      animation: 'sbgira 1s linear infinite'
    }
  }), "Carregando dados da cl\xEDnica...", /*#__PURE__*/React.createElement("style", null, '@keyframes sbgira{to{transform:rotate(360deg)}}'));
  if (estado === 'erro') return /*#__PURE__*/React.createElement(CEmpty, {
    icon: "cloud-off",
    title: "N\xE3o foi poss\xEDvel carregar",
    description: "Confira a conex\xE3o e tente de novo.",
    action: /*#__PURE__*/React.createElement(CBtn, {
      iconLeft: "refresh-cw",
      onClick: onRetry
    }, "Tentar de novo")
  });
  return children || null;
}

/* ---------- Conversões entre a tela e o banco ---------- */
var __FMT_BR = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'America/Sao_Paulo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23'
});
var BR = {
  // telefone de tela (19) 99812-4471 <-> banco +5519998124471
  tel: function tel(s) {
    var d = String(s || '').replace(/\D/g, '');
    if (!d) return null;
    if (d.length >= 12 && d.startsWith('55')) return '+' + d;
    if (d.length >= 10) return '+55' + d;
    return null;
  },
  telTela: function telTela(s) {
    var d = String(s || '').replace(/\D/g, '').replace(/^55(?=\d{10,11}$)/, '');
    if (d.length === 11) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
    if (d.length === 10) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6);
    return s || '';
  },
  // data dd/mm/aaaa <-> aaaa-mm-dd
  data: function data(s) {
    var m = String(s || '').match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    return m ? m[3] + '-' + m[2] + '-' + m[1] : /^\d{4}-\d{2}-\d{2}/.test(String(s || '')) ? String(s).slice(0, 10) : null;
  },
  dataTela: function dataTela(s) {
    return s ? String(s).slice(8, 10) + '/' + String(s).slice(5, 7) + '/' + String(s).slice(0, 4) : '';
  },
  // dia (aaaa-mm-dd) de um Date que carrega uma data do calendário (meia-noite local, como TODAY e os dias da agenda)
  isoDia: function isoDia(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  },
  /* ---- Horário de Brasília: datas e horas sempre seguem Brasília, em qualquer aparelho ---- */
  // partes de um instante (agora, se vazio) no horário de Brasília
  partes: function partes(ts) {
    var d = ts == null ? new Date() : ts instanceof Date ? ts : new Date(ts),
      o = {};
    __FMT_BR.formatToParts(d).forEach(function (x) {
      o[x.type] = x.value;
    });
    var ano = +o.year,
      mes = +o.month,
      dia = +o.day,
      h = +o.hour % 24,
      m = +o.minute;
    return {
      ano: ano,
      mes: mes,
      dia: dia,
      h: h,
      m: m,
      iso: o.year + '-' + o.month + '-' + o.day,
      hm: String(h).padStart(2, '0') + ':' + o.minute,
      dow: new Date(Date.UTC(ano, mes - 1, dia)).getUTCDay()
    };
  },
  hoje: function hoje() {
    return BR.partes().iso;
  },
  // aaaa-mm-dd de hoje em Brasília
  dia: function dia(ts) {
    var p = BR.partes(ts);
    return new Date(p.ano, p.mes - 1, p.dia);
  },
  // data do calendário (meia-noite local) do dia em Brasília
  diaDe: function diaDe(ts) {
    return BR.partes(ts).iso;
  },
  // aaaa-mm-dd de um instante, em Brasília
  hm: function hm(ts) {
    return BR.partes(ts).hm;
  },
  // hh:mm de um instante, em Brasília
  agoraHM: function agoraHM() {
    return BR.partes().hm;
  },
  horaDec: function horaDec(ts) {
    var p = BR.partes(ts);
    return p.h + p.m / 60;
  },
  // instante de uma data e hora digitadas, lidas como horário de Brasília (sem horário de verão desde 2019)
  instante: function instante(iso, hm) {
    return new Date(String(iso).slice(0, 10) + 'T' + String(hm || '00:00').slice(0, 5) + ':00-03:00');
  },
  num: function num(v) {
    if (v === null || v === undefined || v === '') return null;
    var n = Number(String(v).replace(/\./g, '').replace(',', '.'));
    return isNaN(n) ? null : n;
  }
};
// listas fixas: rótulo da tela <-> chave do banco
var ENUM = {
  tipo_paciente: {
    Particular: 'particular',
    'Convênio': 'convenio',
    Empresarial: 'empresarial'
  },
  sexo: {
    Feminino: 'feminino',
    Masculino: 'masculino',
    'Prefiro não informar': 'nao_informado',
    'Não informado': 'nao_informado'
  },
  status_lancamento: {
    Recebido: 'pago',
    Pago: 'pago',
    Pendente: 'pendente',
    Cancelado: 'cancelado'
  },
  papel: {
    Administradora: 'gestor',
    'Recepção': 'recepcao',
    Profissional: 'profissional',
    Financeiro: 'financeiro'
  },
  area: {
    'Estética': 'estetica',
    Odontologia: 'odontologia',
    Geral: 'geral'
  },
  resposta: {
    Texto: 'texto',
    'Sim ou não': 'sim_nao',
    'Múltipla escolha': 'multipla_escolha'
  }
};
var ek = function ek(lista, rotulo) {
  return (ENUM[lista] || {})[rotulo] || null;
};
var el = function el(lista, chave, padrao) {
  var e = Object.entries(ENUM[lista] || {}).find(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
      v = _ref6[1];
    return v === chave;
  });
  return e ? e[0] : padrao !== undefined ? padrao : chave;
};
// id do registro no banco guardado junto do objeto da tela
var DBID = function DBID(o) {
  return o && (o.dbId || (typeof o.id === 'string' && /^[0-9a-f-]{36}$/.test(o.id) ? o.id : null)) || null;
};

/* ---------- Catálogos da clínica (usados em várias telas) ---------- */
var CAT = makeStore({
  profissionais: [],
  procedimentos: [],
  categorias: [],
  formas: [],
  convenios: [],
  fornecedores: [],
  catProd: [],
  unidades: [],
  status: [],
  tipos: [],
  etapas: [],
  motivos: [],
  origens: [],
  funil: null,
  pastas: [],
  instancia: null,
  planos: [],
  assinatura: null,
  consumo: null,
  renata: null,
  voz: null,
  nf: null,
  contaBancaria: null,
  config: null,
  horarios: []
});
var catSet = function catSet(p) {
  CAT.v = _objectSpread(_objectSpread({}, CAT.v), p);
  CAT.subs.forEach(function (f) {
    return f();
  });
};
var porNome = function porNome(lista, nome) {
  return (lista || []).find(function (x) {
    return (x.nome || '').toLowerCase() === String(nome || '').toLowerCase();
  });
};
CARGAS.catalogos = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
  var _yield$Promise$all, _yield$Promise$all2, profs, procs, cats, formas, convs, forns, catProd, unis, status, tipos, etapas, motivos, origens, funis, pastas, inst, planos, ass, consumo, renata, voz, nf, contas, cfg, hor, funil;
  return _regenerator().w(function (_context7) {
    while (1) switch (_context7.n) {
      case 0:
        _context7.n = 1;
        return Promise.all([DB.ler(DB.sel('profissionais', 'id,nome,especialidade,registro_conselho,cor_agenda,foto_path,usuario_id,ordem,profissionais_procedimentos(procedimento_id,excluido_em)').order('ordem')), DB.ler(DB.sel('procedimentos', 'id,nome,valor,duracao_padrao_minutos,categoria_financeira_id,area,sinonimos,ativo').order('nome')), DB.ler(DB.sel('categorias_financeiras').order('ordem')), DB.ler(DB.sel('formas_pagamento').order('ordem')), DB.ler(DB.sel('convenios').order('nome')), DB.ler(DB.sel('fornecedores').order('nome')), DB.ler(DB.sel('categorias_produto').order('ordem')), DB.ler(DB.sel('unidades_medida').order('nome')), DB.ler(DB.sel('status_agendamento').order('ordem')), DB.ler(DB.sel('tipos_agendamento').order('ordem')), DB.ler(DB.sel('etapas_funil').order('ordem')), DB.ler(DB.sel('motivos_perda').order('ordem')), DB.ler(DB.sel('origens_lead').order('nome')), DB.ler(DB.sel('funis').order('criado_em')), DB.ler(SB.from('pastas_documentos').select('*').eq('clinica_id', CLI()).is('paciente_id', null).is('excluido_em', null).order('ordem')), DB.ler(DB.sel('instancias_whatsapp').order('criado_em')), DB.ler(SB.from('planos').select('*').is('excluido_em', null).order('ordem')), DB.ler(DB.sel('assinaturas_clinica', '*, plano:planos(codigo,nome,limite_mensagens_ia,percentual_aviso_limite)')), DB.ler(DB.sel('renata_consumo').order('ano', {
          ascending: false
        }).order('mes', {
          ascending: false
        }).limit(1)), DB.ler(DB.sel('renata_configuracoes')), DB.ler(DB.sel('renata_voz')), DB.ler(DB.sel('configuracao_nota_fiscal')), DB.ler(DB.sel('contas_bancarias').order('criado_em')), DB.ler(DB.sel('configuracoes_clinica')), DB.ler(DB.sel('horarios_funcionamento').order('dia_semana'))]);
      case 1:
        _yield$Promise$all = _context7.v;
        _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 25);
        profs = _yield$Promise$all2[0];
        procs = _yield$Promise$all2[1];
        cats = _yield$Promise$all2[2];
        formas = _yield$Promise$all2[3];
        convs = _yield$Promise$all2[4];
        forns = _yield$Promise$all2[5];
        catProd = _yield$Promise$all2[6];
        unis = _yield$Promise$all2[7];
        status = _yield$Promise$all2[8];
        tipos = _yield$Promise$all2[9];
        etapas = _yield$Promise$all2[10];
        motivos = _yield$Promise$all2[11];
        origens = _yield$Promise$all2[12];
        funis = _yield$Promise$all2[13];
        pastas = _yield$Promise$all2[14];
        inst = _yield$Promise$all2[15];
        planos = _yield$Promise$all2[16];
        ass = _yield$Promise$all2[17];
        consumo = _yield$Promise$all2[18];
        renata = _yield$Promise$all2[19];
        voz = _yield$Promise$all2[20];
        nf = _yield$Promise$all2[21];
        contas = _yield$Promise$all2[22];
        cfg = _yield$Promise$all2[23];
        hor = _yield$Promise$all2[24];
        funil = funis.find(function (f) {
          return f.padrao;
        }) || funis[0] || null;
        catSet({
          profissionais: profs.map(function (p) {
            return _objectSpread(_objectSpread({}, p), {}, {
              procs: (p.profissionais_procedimentos || []).filter(function (x) {
                return !x.excluido_em;
              }).map(function (x) {
                return x.procedimento_id;
              })
            });
          }),
          procedimentos: procs,
          categorias: cats,
          formas: formas,
          convenios: convs,
          fornecedores: forns,
          catProd: catProd,
          unidades: unis,
          status: status,
          tipos: tipos,
          etapas: etapas.filter(function (e) {
            return !funil || e.funil_id === funil.id;
          }),
          motivos: motivos,
          origens: origens,
          funil: funil,
          pastas: pastas,
          instancia: inst.find(function (i) {
            return i.padrao;
          }) || inst[0] || null,
          planos: planos,
          assinatura: ass[0] || null,
          consumo: consumo[0] || null,
          renata: renata[0] || null,
          voz: voz[0] || null,
          nf: nf[0] || null,
          contaBancaria: contas.find(function (c) {
            return c.padrao;
          }) || contas[0] || null,
          config: cfg[0] || null,
          horarios: hor
        });
      case 2:
        return _context7.a(2);
    }
  }, _callee7);
}));
var catId = function catId(lista, nome) {
  var x = porNome(CAT.v[lista], nome);
  return x ? x.id : null;
};
var catNome = function catNome(lista, id) {
  var x = (CAT.v[lista] || []).find(function (y) {
    return y.id === id;
  });
  return x ? x.nome : '';
};

/* ---------- Equipe e permissões ---------- */
var MODULOS_TODOS = function MODULOS_TODOS() {
  return allModuleIds();
};
CARGAS.equipe = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
  var rows;
  return _regenerator().w(function (_context8) {
    while (1) switch (_context8.n) {
      case 0:
        _context8.n = 1;
        return DB.ler(DB.sel('usuarios_clinicas', 'id,usuario_id,email_convite,nome_convite,papel,dono,funcao,status_convite,ativo,perfil:perfis_usuario!usuario_id(nome,sobrenome,email,foto_path),permissoes(modulo,permitido,excluido_em)').order('criado_em'));
      case 1:
        rows = _context8.v;
        TEAM_STORE.v = rows.filter(function (r) {
          return r.ativo;
        }).map(function (r) {
          var nome = r.perfil ? [r.perfil.nome, r.perfil.sobrenome].filter(Boolean).join(' ') : r.nome_convite || r.email_convite || 'Convidado';
          var perms = (r.permissoes || []).filter(function (p) {
            return !p.excluido_em;
          });
          var acc = perms.length ? perms.filter(function (p) {
            return p.permitido;
          }).map(function (p) {
            return p.modulo;
          }) : r.dono || r.papel === 'dono' || r.papel === 'gestor' ? MODULOS_TODOS() : FUNC_PRESET ? FUNC_PRESET()[r.funcao] || [] : [];
          return {
            id: r.id,
            dbId: r.id,
            usuarioId: r.usuario_id,
            nome: nome,
            funcao: r.funcao || el('papel', r.papel, 'Recepção'),
            email: r.perfil ? r.perfil.email : r.email_convite,
            acc: acc,
            dono: !!r.dono,
            convite: r.status_convite
          };
        });
        TEAM_STORE.subs.forEach(function (f) {
          return f();
        });
      case 2:
        return _context8.a(2);
    }
  }, _callee8);
}));

/* ---------- Preferências do usuário (idioma, som, filtros) ---------- */
var PREF = makeStore(null);
function carregarPreferencias() {
  return _carregarPreferencias.apply(this, arguments);
}
function _carregarPreferencias() {
  _carregarPreferencias = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee17() {
    var r, p;
    return _regenerator().w(function (_context17) {
      while (1) switch (_context17.n) {
        case 0:
          _context17.n = 1;
          return DB.ler(SB.from('preferencias_usuario').select('*').eq('clinica_id', CLI()).eq('usuario_id', UID()).is('excluido_em', null).limit(1));
        case 1:
          r = _context17.v;
          p = r[0];
          if (p) {
            _context17.n = 3;
            break;
          }
          _context17.n = 2;
          return DB.ins('preferencias_usuario', {
            usuario_id: UID()
          }, 'Não foi possível criar as preferências');
        case 2:
          p = _context17.v;
        case 3:
          PREF.v = p;
          PREF.subs.forEach(function (f) {
            return f();
          });
          if (p.idioma && p.idioma !== LANG.v) setLang(p.idioma);
          SOUND.v = {
            on: p.som_ativo,
            tone: p.som_tom || 'cristal',
            vol: Number(p.som_volume)
          };
          SOUND.subs.forEach(function (f) {
            return f();
          });
        case 4:
          return _context17.a(2);
      }
    }, _callee17);
  }));
  return _carregarPreferencias.apply(this, arguments);
}
var __prefTimer = null,
  __prefPend = {};
function salvarPref(patch) {
  if (!SB_ON || !PREF.v) return;
  PREF.v = _objectSpread(_objectSpread({}, PREF.v), patch);
  PREF.subs.forEach(function (f) {
    return f();
  });
  __prefPend = _objectSpread(_objectSpread({}, __prefPend), patch);
  clearTimeout(__prefTimer);
  __prefTimer = setTimeout(function () {
    var p = __prefPend;
    __prefPend = {};
    DB.upd('preferencias_usuario', PREF.v.id, p, 'Não foi possível salvar sua preferência')["catch"](function () {});
  }, 500);
}
// filtro de uma tela guardado nas preferências (substitui useState para o que deve persistir)
function usePrefFiltro(chave, padrao) {
  var _useStore3 = useStore(PREF),
    _useStore4 = _slicedToArray(_useStore3, 1),
    p = _useStore4[0];
  var _React$useState3 = React.useState(padrao),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    loc = _React$useState4[0],
    setLoc = _React$useState4[1];
  if (!SB_ON) return [loc, setLoc];
  var v = p && p.filtros && p.filtros[chave] !== undefined ? p.filtros[chave] : padrao;
  return [v, function (nv) {
    var val = typeof nv === 'function' ? nv(v) : nv;
    salvarPref({
      filtros: _objectSpread(_objectSpread({}, PREF.v && PREF.v.filtros || {}), {}, _defineProperty({}, chave, val))
    });
  }];
}

/* ---------- Entrar, sair e trocar de clínica ---------- */
var __ctxProm = null;
function carregarContexto() {
  if (!__ctxProm) __ctxProm = carregarContexto0()["finally"](function () {
    __ctxProm = null;
  });
  return __ctxProm;
}
function carregarContexto0() {
  return _carregarContexto.apply(this, arguments);
} // troca de clínica: avisa na hora qual clínica está abrindo e recarrega com os dados dela
function _carregarContexto() {
  _carregarContexto = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee18() {
    var _yield$SB$rpc4, data, error, perfil, clinicas, r, de, admin, suporte, salva, clinica, _t5;
    return _regenerator().w(function (_context18) {
      while (1) switch (_context18.p = _context18.n) {
        case 0:
          _context18.p = 0;
          _context18.n = 1;
          return SB.rpc('meu_contexto');
        case 1:
          _yield$SB$rpc4 = _context18.v;
          data = _yield$SB$rpc4.data;
          error = _yield$SB$rpc4.error;
          if (!error) {
            _context18.n = 2;
            break;
          }
          throw error;
        case 2:
          perfil = data.perfil, clinicas = data.clinicas || [];
          if (perfil) {
            _context18.n = 3;
            break;
          }
          setSessao({
            estado: 'login'
          });
          return _context18.a(2);
        case 3:
          if (!(!clinicas.length && !data.admin)) {
            _context18.n = 6;
            break;
          }
          _context18.n = 4;
          return SB.rpc('concluir_cadastro');
        case 4:
          r = _context18.v;
          if (!(!r.error && r.data)) {
            _context18.n = 6;
            break;
          }
          _context18.n = 5;
          return SB.rpc('meu_contexto');
        case 5:
          de = _context18.v;
          if (!de.error && de.data) {
            data = de.data;
            perfil = data.perfil;
            clinicas = data.clinicas || [];
          }
        case 6:
          KIT_USER.name = [perfil.nome, perfil.sobrenome].filter(Boolean).join(' ') || perfil.email;
          KIT_USER.email = perfil.email;
          if (perfil.foto_path) ARQ.url('clinica', perfil.foto_path).then(function (u) {
            KIT_USER.avatar = u;
            SESSAO.subs.forEach(function (f) {
              return f();
            });
          })["catch"](function () {});
          admin = !!data.admin, suporte = data.suporte || null; // primeiro acesso: registra o aceite dos termos de uso e da política de privacidade (avisado na tela de entrar)
          if (!perfil.termos_aceitos_em) SB.rpc('aceitar_termos').then(function () {}, function () {});
          // equipe da Salute sem clínica aberta: lista de todas as clínicas (Painel Master)
          if (!(admin && !suporte)) {
            _context18.n = 7;
            break;
          }
          setSessao({
            estado: 'master',
            perfil: perfil,
            clinicas: clinicas,
            admin: admin,
            suporte: null,
            clinica: null
          });
          return _context18.a(2);
        case 7:
          if (!(!clinicas.length && data.bloqueado)) {
            _context18.n = 8;
            break;
          }
          setSessao({
            estado: 'bloqueado',
            perfil: perfil,
            clinicas: clinicas,
            admin: admin,
            suporte: suporte
          });
          return _context18.a(2);
        case 8:
          if (clinicas.length) {
            _context18.n = 9;
            break;
          }
          setSessao({
            estado: 'sem-clinica',
            perfil: perfil,
            clinicas: clinicas,
            admin: admin,
            suporte: suporte
          });
          return _context18.a(2);
        case 9:
          salva = function () {
            try {
              return localStorage.getItem('salute02:clinica');
            } catch (e) {
              return null;
            }
          }();
          clinica = suporte && clinicas.find(function (c) {
            return c.id === suporte.clinica_id;
          }) || clinicas.find(function (c) {
            return c.id === salva;
          }) || clinicas.find(function (c) {
            return c.id === perfil.clinica_ativa_id;
          }) || clinicas[0];
          Object.keys(CARGA_PROM).forEach(function (k) {
            return delete CARGA_PROM[k];
          });
          CARGA.v = {};
          setSessao({
            estado: 'iniciando',
            perfil: perfil,
            clinicas: clinicas,
            clinica: clinica,
            modulos: clinica.modulos,
            erro: null,
            admin: admin,
            suporte: suporte
          });
          _context18.n = 10;
          return carregarPreferencias();
        case 10:
          setSessao({
            estado: 'pronto'
          });
          carregar('catalogos');
          carregar('equipe');
          carregar('notificacoes');
          if (!suporte) SB.from('perfis_usuario').update(perfil.clinica_ativa_id !== clinica.id ? {
            clinica_ativa_id: clinica.id,
            ultimo_acesso_em: agoraIso()
          } : {
            ultimo_acesso_em: agoraIso()
          }).eq('id', perfil.id).then(function () {});
          _context18.n = 12;
          break;
        case 11:
          _context18.p = 11;
          _t5 = _context18.v;
          setSessao({
            estado: 'erro',
            erro: MSG_ERRO(_t5)
          });
        case 12:
          return _context18.a(2);
      }
    }, _callee18, null, [[0, 11]]);
  }));
  return _carregarContexto.apply(this, arguments);
}
var TROCA = makeStore(null);
function trocarClinica(_x) {
  return _trocarClinica.apply(this, arguments);
} // suporte da Salute: entra em uma clínica (fica registrado para a clínica) e volta para a lista
function _trocarClinica() {
  _trocarClinica = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee19(id) {
    var c, _t6;
    return _regenerator().w(function (_context19) {
      while (1) switch (_context19.p = _context19.n) {
        case 0:
          c = (SESSAO.v.clinicas || []).find(function (x) {
            return x.id === id;
          });
          TROCA.v = {
            nome: c ? c.nome : ''
          };
          TROCA.subs.forEach(function (f) {
            return f();
          });
          try {
            localStorage.setItem('salute02:clinica', id);
          } catch (e) {}
          _context19.p = 1;
          _context19.n = 2;
          return SB.from('perfis_usuario').update({
            clinica_ativa_id: id
          }).eq('id', UID());
        case 2:
          _context19.n = 4;
          break;
        case 3:
          _context19.p = 3;
          _t6 = _context19.v;
        case 4:
          location.reload();
        case 5:
          return _context19.a(2);
      }
    }, _callee19, null, [[1, 3]]);
  }));
  return _trocarClinica.apply(this, arguments);
}
function suporteEntrar(_x2, _x3) {
  return _suporteEntrar.apply(this, arguments);
}
function _suporteEntrar() {
  _suporteEntrar = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee20(id, motivo) {
    var _yield$SB$rpc5, error;
    return _regenerator().w(function (_context20) {
      while (1) switch (_context20.n) {
        case 0:
          _context20.n = 1;
          return SB.rpc('admin_entrar_clinica', {
            p_clinica: id,
            p_motivo: motivo || null
          });
        case 1:
          _yield$SB$rpc5 = _context20.v;
          error = _yield$SB$rpc5.error;
          if (!error) {
            _context20.n = 2;
            break;
          }
          throw error;
        case 2:
          try {
            localStorage.setItem('salute02:clinica', id);
          } catch (e) {}
          location.reload();
        case 3:
          return _context20.a(2);
      }
    }, _callee20);
  }));
  return _suporteEntrar.apply(this, arguments);
}
function suporteVoltar() {
  return _suporteVoltar.apply(this, arguments);
}
function _suporteVoltar() {
  _suporteVoltar = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee21() {
    var _t7;
    return _regenerator().w(function (_context21) {
      while (1) switch (_context21.p = _context21.n) {
        case 0:
          _context21.p = 0;
          _context21.n = 1;
          return SB.rpc('admin_sair_clinica');
        case 1:
          _context21.n = 3;
          break;
        case 2:
          _context21.p = 2;
          _t7 = _context21.v;
        case 3:
          try {
            localStorage.removeItem('salute02:clinica');
          } catch (e) {}
          location.reload();
        case 4:
          return _context21.a(2);
      }
    }, _callee21, null, [[0, 2]]);
  }));
  return _suporteVoltar.apply(this, arguments);
}
function sair() {
  return _sair.apply(this, arguments);
} // quem entrou pelo link do convite ainda não tem senha: pede para criar antes de abrir o sistema
function _sair() {
  _sair = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee22() {
    var _t8, _t9;
    return _regenerator().w(function (_context22) {
      while (1) switch (_context22.p = _context22.n) {
        case 0:
          if (SB_ON) {
            _context22.n = 1;
            break;
          }
          avisoOk('Modo demonstração', 'Sem Supabase conectado não há login. Nada foi alterado.');
          return _context22.a(2);
        case 1:
          _context22.p = 1;
          if (!SESSAO.v.suporte) {
            _context22.n = 2;
            break;
          }
          _context22.n = 2;
          return SB.rpc('admin_sair_clinica');
        case 2:
          _context22.n = 4;
          break;
        case 3:
          _context22.p = 3;
          _t8 = _context22.v;
        case 4:
          _context22.p = 4;
          _context22.n = 5;
          return SB.auth.signOut();
        case 5:
          _context22.n = 7;
          break;
        case 6:
          _context22.p = 6;
          _t9 = _context22.v;
        case 7:
          try {
            localStorage.removeItem('salute02:clinica');
          } catch (e) {}
          if (ROTAS_URL) location.replace(urlApp('login'));else location.reload();
        case 8:
          return _context22.a(2);
      }
    }, _callee22, null, [[4, 6], [1, 3]]);
  }));
  return _sair.apply(this, arguments);
}
var precisaSenha = function precisaSenha(s) {
  var m = s && s.user && s.user.user_metadata || {};
  return !!m.convite && !m.senha_definida;
};
if (SB_ON) {
  SB.auth.onAuthStateChange(function (ev, s) {
    if (ev === 'PASSWORD_RECOVERY') {
      setSessao({
        recuperar: true
      });
      return;
    }
    if (ev === 'SIGNED_OUT') {
      setSessao({
        estado: 'login',
        perfil: null,
        clinicas: [],
        clinica: null
      });
      return;
    }
    if (ev === 'SIGNED_IN' && s && precisaSenha(s)) {
      setSessao({
        recuperar: true
      });
      return;
    }
    if (ev === 'SIGNED_IN' && s && ['login', 'carregando'].includes(SESSAO.v.estado) && !SESSAO.v.recuperar) setTimeout(carregarContexto, 0);
  });
  // fora do retorno do getSession (setTimeout), para não travar a trava interna de sessão do Supabase
  SB.auth.getSession().then(function (_ref9) {
    var data = _ref9.data;
    return setTimeout(function () {
      if (data && data.session) {
        if (precisaSenha(data.session)) setSessao({
          recuperar: true,
          estado: 'login'
        });else if (SESSAO.v.estado === 'carregando') carregarContexto();
      } else setSessao({
        estado: 'login'
      });
    }, 0);
  }, function () {
    return setSessao({
      estado: 'login'
    });
  });
}

/* ---------- Documentos e máscaras do cadastro ---------- */
var soDig = function soDig(v) {
  return String(v || '').replace(/\D/g, '');
};
var cnpjLimpo = function cnpjLimpo(v) {
  return String(v || '').toUpperCase().replace(/[^0-9A-Z]/g, '').slice(0, 14);
};
// CNPJ numérico ou alfanumérico (Receita Federal, a partir de julho de 2026)
var fmtCNPJ = function fmtCNPJ(v) {
  var d = cnpjLimpo(v);
  var o = d.slice(0, 2);
  if (d.length > 2) o += '.' + d.slice(2, 5);
  if (d.length > 5) o += '.' + d.slice(5, 8);
  if (d.length > 8) o += '/' + d.slice(8, 12);
  if (d.length > 12) o += '-' + d.slice(12);
  return o;
};
var fmtCPF = function fmtCPF(v) {
  var d = soDig(v).slice(0, 11);
  var o = d.slice(0, 3);
  if (d.length > 3) o += '.' + d.slice(3, 6);
  if (d.length > 6) o += '.' + d.slice(6, 9);
  if (d.length > 9) o += '-' + d.slice(9);
  return o;
};
var fmtTelBR = function fmtTelBR(v) {
  var d = soDig(v).replace(/^55(?=\d{10,11}$)/, '').slice(0, 11);
  if (!d) return '';
  if (d.length <= 2) return '(' + d;
  var r = d.slice(2);
  if (r.length <= 4) return '(' + d.slice(0, 2) + ') ' + r;
  return '(' + d.slice(0, 2) + ') ' + (d.length === 11 ? r.slice(0, 5) + '-' + r.slice(5) : r.slice(0, 4) + '-' + r.slice(4));
};
var cpfValido = function cpfValido(v) {
  var d = soDig(v);
  if (d.length !== 11 || /^(\d)\1+$/.test(d)) return false;
  var dv = function dv(n) {
    var s = 0;
    for (var i = 0; i < n; i++) s += +d[i] * (n + 1 - i);
    var r = s * 10 % 11;
    return r === 10 ? 0 : r;
  };
  return dv(9) === +d[9] && dv(10) === +d[10];
};
var cnpjValido = function cnpjValido(v) {
  var d = cnpjLimpo(v);
  if (d.length !== 14 || !/^[0-9A-Z]{12}\d{2}$/.test(d) || /^(.)\1+$/.test(d)) return false;
  var calc = function calc(n) {
    var w = n === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    var s = 0;
    for (var i = 0; i < n; i++) s += (d.charCodeAt(i) - 48) * w[i];
    var r = s % 11;
    return r < 2 ? 0 : 11 - r;
  };
  return calc(12) === +d[12] && calc(13) === +d[13];
};
// "Rua Tal, 415, Centro, Itapira - SP" -> partes do endereço da clínica
function partesEndereco(t) {
  var txt = String(t || '').trim();
  var out = {};
  var cep = txt.match(/\b(\d{5})-?(\d{3})\b/);
  if (cep) {
    out.cep = cep[1] + '-' + cep[2];
    txt = txt.replace(cep[0], '').replace(/\s*,\s*,/g, ',');
  }
  var ps = txt.split(',').map(function (x) {
    return x.trim();
  }).filter(Boolean);
  var ult = ps.length ? ps[ps.length - 1].match(/^(.+?)\s*[-/]\s*([A-Za-z]{2})$/) : null;
  if (ult) {
    out.cidade = ult[1].trim();
    out.uf = ult[2].toUpperCase();
    ps.pop();
  }
  if (ps.length) out.logradouro = ps.shift();
  if (ps.length && /^(\d+[A-Za-z]?|s\/?n)$/i.test(ps[0])) out.numero = ps.shift();
  if (ps.length) out.bairro = ps.join(', ');
  if (!out.logradouro && txt) out.logradouro = txt;
  return out;
}

/* ---------- Peças visuais da porta de entrada ---------- */
function MarcaSalute(_ref0) {
  var _ref0$tam = _ref0.tam,
    tam = _ref0$tam === void 0 ? 80 : _ref0$tam;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: tam * 0.65,
      height: tam,
      borderRadius: tam * 0.325,
      overflow: 'hidden',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      background: 'linear-gradient(180deg,#5AA2FF 0%,#0A5CFF 42%,#0A7BFF 70%,#2FD3FF 100%)',
      boxShadow: '0 12px 26px -12px rgba(10,92,255,.7), inset 0 1px 0 rgba(255,255,255,.5)'
    }
  }, typeof MARK !== 'undefined' && MARK ? /*#__PURE__*/React.createElement("img", {
    src: MARK,
    alt: "Salute IA",
    style: {
      height: tam * 0.6,
      width: 'auto',
      filter: 'brightness(0) invert(1)'
    }
  }) : /*#__PURE__*/React.createElement(SIcon, {
    name: "sparkles",
    size: tam * 0.32,
    color: "#fff"
  }));
}
function CampoSenha(_ref1) {
  var label = _ref1.label,
    value = _ref1.value,
    onChange = _ref1.onChange,
    onKeyDown = _ref1.onKeyDown,
    autoComplete = _ref1.autoComplete,
    hint = _ref1.hint,
    error = _ref1.error;
  var AInput = window.SaluteProjetoDesigner_8b4683.Input;
  var _React$useState5 = React.useState(false),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    ver = _React$useState6[0],
    setVer = _React$useState6[1];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-sans)'
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-strong)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(AInput, {
    "aria-label": label || 'Senha',
    type: ver ? 'text' : 'password',
    iconLeft: "lock",
    value: value,
    onChange: onChange,
    onKeyDown: onKeyDown,
    autoComplete: autoComplete,
    hint: hint,
    error: error,
    inputStyle: {
      paddingRight: 46
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return setVer(!ver);
    },
    "aria-label": ver ? 'Esconder senha' : 'Mostrar senha',
    title: ver ? 'Esconder senha' : 'Mostrar senha',
    style: {
      position: 'absolute',
      right: 6,
      top: 4,
      width: 32,
      height: 32,
      borderRadius: '50%',
      border: 0,
      background: 'transparent',
      color: 'var(--text-subtle)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement(SIcon, {
    name: ver ? 'eye-off' : 'eye',
    size: 17
  }))));
}
var msgBox = function msgBox(msg) {
  return msg ? /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10,
      padding: '12px 14px',
      borderRadius: 16,
      background: msg.erro ? 'rgba(229,72,77,.08)' : 'rgba(45,191,106,.1)',
      color: msg.erro ? '#C9353A' : '#1E8E4E',
      fontSize: 14,
      lineHeight: 1.45
    }
  }, /*#__PURE__*/React.createElement(SIcon, {
    name: msg.erro ? 'circle-alert' : 'circle-check',
    size: 17,
    style: {
      flexShrink: 0,
      marginTop: 1
    }
  }), /*#__PURE__*/React.createElement("span", null, msg.t)) : null;
};
var linkAcesso = {
  border: 0,
  background: 'none',
  padding: 0,
  color: '#1F5EFF',
  fontFamily: 'inherit',
  fontSize: 14,
  fontWeight: 500,
  cursor: 'pointer'
};

/* ---------- Tela de entrar e cadastrar (mesmo visual do sistema) ---------- */
function TelaAcesso() {
  var _window$SaluteProjeto2 = window.SaluteProjetoDesigner_8b4683,
    AInput = _window$SaluteProjeto2.Input,
    ABtn = _window$SaluteProjeto2.Button,
    ASeg = _window$SaluteProjeto2.SegmentedControl;
  var _useStore5 = useStore(SESSAO),
    _useStore6 = _slicedToArray(_useStore5, 1),
    s = _useStore6[0];
  var _React$useState7 = React.useState(function () {
      return ROTAS_URL && caminhoAtual() === 'cadastro' ? 'cadastrar' : 'entrar';
    }),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    aba = _React$useState8[0],
    setAba0 = _React$useState8[1];
  var setAba = function setAba(v) {
    setAba0(v);
    trocarUrl(v === 'cadastrar' ? 'cadastro' : 'login');
  };
  var _React$useState9 = React.useState(s.recuperar ? 'nova' : 'entrar'),
    _React$useState0 = _slicedToArray(_React$useState9, 2),
    modo = _React$useState0[0],
    setModo = _React$useState0[1]; // dentro de Entrar: entrar, recuperar, convite, nova
  var _React$useState1 = React.useState({
      email: '',
      senha: '',
      nome: '',
      clinica: '',
      tipoDoc: 'cnpj',
      doc: '',
      tel: '',
      endereco: ''
    }),
    _React$useState10 = _slicedToArray(_React$useState1, 2),
    f = _React$useState10[0],
    setF = _React$useState10[1];
  var _React$useState11 = React.useState({}),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    faltando = _React$useState12[0],
    setFaltando = _React$useState12[1];
  var _React$useState13 = React.useState(false),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    busy = _React$useState14[0],
    setBusy = _React$useState14[1];
  var _React$useState15 = React.useState(null),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    msg = _React$useState16[0],
    setMsg = _React$useState16[1];
  React.useEffect(function () {
    if (s.recuperar) {
      setAba('entrar');
      setModo('nova');
    }
  }, [s.recuperar]);
  var set = function set(k, fmt) {
    return function (e) {
      var v = fmt ? fmt(e.target.value) : e.target.value;
      setF(function (x) {
        return _objectSpread(_objectSpread({}, x), {}, _defineProperty({}, k, v));
      });
      setMsg(null);
      if (faltando[k]) setFaltando(function (x) {
        return _objectSpread(_objectSpread({}, x), {}, _defineProperty({}, k, null));
      });
    };
  };
  var traduz = function traduz(e) {
    var m = String(e && e.message || e || '');
    return /Invalid login/i.test(m) ? 'Email ou senha incorretos.' : /Email not confirmed|not confirmed/i.test(m) ? 'Falta confirmar o email. Abra o link que enviamos e depois entre aqui.' : /already registered|already been registered|User already/i.test(m) ? 'Este email já tem acesso. Use a aba Entrar ou Esqueci minha senha.' : /Password should be|at least/i.test(m) ? 'A senha precisa ter pelo menos 8 caracteres.' : /rate limit|too many/i.test(m) ? 'Muitas tentativas seguidas. Espere um minuto e tente de novo.' : /Signups not allowed/i.test(m) ? 'Novos cadastros estão desligados no momento.' : MSG_ERRO(e);
  };
  var run = /*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(fn) {
      var _t;
      return _regenerator().w(function (_context9) {
        while (1) switch (_context9.p = _context9.n) {
          case 0:
            setBusy(true);
            setMsg(null);
            _context9.p = 1;
            _context9.n = 2;
            return fn();
          case 2:
            _context9.n = 4;
            break;
          case 3:
            _context9.p = 3;
            _t = _context9.v;
            setMsg({
              erro: true,
              t: traduz(_t)
            });
          case 4:
            _context9.p = 4;
            setBusy(false);
            return _context9.f(4);
          case 5:
            return _context9.a(2);
        }
      }, _callee9, null, [[1, 3, 4, 5]]);
    }));
    return function run(_x4) {
      return _ref10.apply(this, arguments);
    };
  }();
  var volta = voltaAuth();
  var emailOk = function emailOk(v) {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(String(v || '').trim());
  };
  var entrar = function entrar() {
    return run(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
      var _yield$SB$auth$signIn, error;
      return _regenerator().w(function (_context0) {
        while (1) switch (_context0.n) {
          case 0:
            if (emailOk(f.email)) {
              _context0.n = 1;
              break;
            }
            throw new Error('Informe um email válido.');
          case 1:
            if (f.senha) {
              _context0.n = 2;
              break;
            }
            throw new Error('Digite a sua senha.');
          case 2:
            _context0.n = 3;
            return SB.auth.signInWithPassword({
              email: f.email.trim(),
              password: f.senha
            });
          case 3:
            _yield$SB$auth$signIn = _context0.v;
            error = _yield$SB$auth$signIn.error;
            if (!error) {
              _context0.n = 4;
              break;
            }
            throw error;
          case 4:
            return _context0.a(2);
        }
      }, _callee0);
    })));
  };
  var recuperar = function recuperar() {
    return run(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
      var _yield$SB$auth$resetP, error;
      return _regenerator().w(function (_context1) {
        while (1) switch (_context1.n) {
          case 0:
            if (emailOk(f.email)) {
              _context1.n = 1;
              break;
            }
            throw new Error('Informe o email do seu acesso.');
          case 1:
            _context1.n = 2;
            return SB.auth.resetPasswordForEmail(f.email.trim(), {
              redirectTo: volta
            });
          case 2:
            _yield$SB$auth$resetP = _context1.v;
            error = _yield$SB$auth$resetP.error;
            if (!error) {
              _context1.n = 3;
              break;
            }
            throw error;
          case 3:
            setMsg({
              t: 'Se este email tiver acesso, o link para criar uma senha nova chega em instantes.'
            });
          case 4:
            return _context1.a(2);
        }
      }, _callee1);
    })));
  };
  var novaSenha = function novaSenha() {
    return run(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
      var _yield$SB$auth$update, error;
      return _regenerator().w(function (_context10) {
        while (1) switch (_context10.n) {
          case 0:
            if (!(f.senha.length < 8)) {
              _context10.n = 1;
              break;
            }
            throw new Error('Password should be');
          case 1:
            _context10.n = 2;
            return SB.auth.updateUser({
              password: f.senha,
              data: {
                senha_definida: true
              }
            });
          case 2:
            _yield$SB$auth$update = _context10.v;
            error = _yield$SB$auth$update.error;
            if (!error) {
              _context10.n = 3;
              break;
            }
            throw error;
          case 3:
            setSessao({
              recuperar: false
            });
            setMsg({
              t: 'Senha nova salva.'
            });
            setTimeout(carregarContexto, 400);
          case 4:
            return _context10.a(2);
        }
      }, _callee10);
    })));
  };
  // quem recebeu convite da clínica cria o próprio acesso com o mesmo email do convite
  var convite = function convite() {
    return run(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
      var _yield$SB$auth$signUp, data, error;
      return _regenerator().w(function (_context11) {
        while (1) switch (_context11.n) {
          case 0:
            if (!(f.nome.trim().length < 3)) {
              _context11.n = 1;
              break;
            }
            throw new Error('Informe o seu nome completo.');
          case 1:
            if (emailOk(f.email)) {
              _context11.n = 2;
              break;
            }
            throw new Error('Use o email em que você recebeu o convite.');
          case 2:
            if (!(f.senha.length < 8)) {
              _context11.n = 3;
              break;
            }
            throw new Error('Password should be');
          case 3:
            _context11.n = 4;
            return SB.auth.signUp({
              email: f.email.trim(),
              password: f.senha,
              options: {
                data: {
                  nome: f.nome.trim().split(/\s+/)[0],
                  sobrenome: f.nome.trim().split(/\s+/).slice(1).join(' ')
                },
                emailRedirectTo: volta
              }
            });
          case 4:
            _yield$SB$auth$signUp = _context11.v;
            data = _yield$SB$auth$signUp.data;
            error = _yield$SB$auth$signUp.error;
            if (!error) {
              _context11.n = 5;
              break;
            }
            throw error;
          case 5:
            if (!(data && data.user && Array.isArray(data.user.identities) && !data.user.identities.length)) {
              _context11.n = 6;
              break;
            }
            throw new Error('already registered');
          case 6:
            if (!data.session) {
              setModo('entrar');
              setF(function (x) {
                return _objectSpread(_objectSpread({}, x), {}, {
                  senha: ''
                });
              });
              setMsg({
                t: 'Enviamos um email de confirmação para ' + f.email.trim() + '. Abra o link e depois entre aqui com o seu email e a senha que você criou.'
              });
            }
          case 7:
            return _context11.a(2);
        }
      }, _callee11);
    })));
  };
  // cadastro de uma clínica nova: a confirmação vai por email e a clínica nasce no primeiro acesso
  var cadastrar = function cadastrar() {
    return run(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
      var doc, end, tel, fal, nomes, email, cadastro, _yield$SB$auth$signUp2, data, error;
      return _regenerator().w(function (_context12) {
        while (1) switch (_context12.n) {
          case 0:
            doc = f.tipoDoc === 'cnpj' ? fmtCNPJ(f.doc) : fmtCPF(f.doc), end = partesEndereco(f.endereco), tel = BR.tel(f.tel);
            fal = {
              nome: f.nome.trim().split(/\s+/).length < 2 ? 'Informe nome e sobrenome.' : null,
              clinica: f.clinica.trim().length < 2 ? 'Informe o nome da clínica.' : null,
              doc: !(f.tipoDoc === 'cnpj' ? cnpjValido(doc) : cpfValido(doc)) ? f.tipoDoc === 'cnpj' ? 'Confira o CNPJ.' : 'Confira o CPF.' : null,
              tel: !tel || soDig(f.tel).length < 10 ? 'Use DDD e número, por exemplo (19) 99800-4100.' : null,
              endereco: !end.logradouro || f.endereco.trim().length < 6 ? 'Informe rua, número, bairro e cidade.' : null,
              email: !emailOk(f.email) ? 'Informe um email válido.' : null,
              senha: f.senha.length < 8 ? 'Pelo menos 8 caracteres.' : null
            };
            setFaltando(fal);
            if (!Object.values(fal).some(Boolean)) {
              _context12.n = 1;
              break;
            }
            throw new Error('Confira os campos destacados.');
          case 1:
            nomes = f.nome.trim().split(/\s+/), email = f.email.trim().toLowerCase();
            cadastro = _objectSpread(_defineProperty(_defineProperty(_defineProperty(_defineProperty({
              clinica: f.clinica.trim(),
              responsavel_nome: f.nome.trim()
            }, f.tipoDoc, doc), "telefone", tel), "email", email), "endereco", f.endereco.trim()), end);
            _context12.n = 2;
            return SB.auth.signUp({
              email: email,
              password: f.senha,
              options: {
                data: {
                  nome: nomes[0],
                  sobrenome: nomes.slice(1).join(' '),
                  cadastro: cadastro
                },
                emailRedirectTo: volta
              }
            });
          case 2:
            _yield$SB$auth$signUp2 = _context12.v;
            data = _yield$SB$auth$signUp2.data;
            error = _yield$SB$auth$signUp2.error;
            if (!error) {
              _context12.n = 3;
              break;
            }
            throw error;
          case 3:
            if (!(data && data.user && Array.isArray(data.user.identities) && !data.user.identities.length)) {
              _context12.n = 4;
              break;
            }
            throw new Error('already registered');
          case 4:
            if (!(data && data.session)) {
              _context12.n = 5;
              break;
            }
            return _context12.a(2);
          case 5:
            // confirmação de email desligada no Supabase: já entra e a clínica é criada
            setAba('entrar');
            setModo('entrar');
            setF(function (x) {
              return _objectSpread(_objectSpread({}, x), {}, {
                email: email,
                senha: ''
              });
            });
            setMsg({
              t: 'Cadastro feito! Enviamos um email de confirmação para ' + email + '. Abra o link para ativar a conta e depois entre aqui com o seu email e senha.'
            });
          case 6:
            return _context12.a(2);
        }
      }, _callee12);
    })));
  };
  var semClinica = s.estado === 'sem-clinica';
  var criarClinica = function criarClinica() {
    return run(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
      var _yield$SB$rpc, error;
      return _regenerator().w(function (_context13) {
        while (1) switch (_context13.n) {
          case 0:
            if (f.clinica.trim()) {
              _context13.n = 1;
              break;
            }
            throw new Error('Informe o nome da clínica');
          case 1:
            _context13.n = 2;
            return SB.rpc('criar_clinica', {
              p_nome: f.clinica.trim()
            });
          case 2:
            _yield$SB$rpc = _context13.v;
            error = _yield$SB$rpc.error;
            if (!error) {
              _context13.n = 3;
              break;
            }
            throw error;
          case 3:
            _context13.n = 4;
            return carregarContexto();
          case 4:
            return _context13.a(2);
        }
      }, _callee13);
    })));
  };
  var onKey = function onKey(fn) {
    return function (e) {
      if (e.key === 'Enter') fn();
    };
  };
  var trocarAba = function trocarAba(v) {
    setAba(v);
    setModo('entrar');
    setMsg(null);
    setFaltando({});
  };
  var titulo = semClinica ? 'Falta só a sua clínica' : modo === 'nova' ? 'Criar senha nova' : 'Bem-vindo à Salute IA';
  var sub = semClinica ? 'Seu login ainda não está ligado a nenhuma clínica. Crie a sua ou peça um convite ao dono da clínica.' : modo === 'nova' ? 'Escolha a senha que vai usar daqui em diante.' : aba === 'cadastrar' ? 'Crie a conta da sua clínica em poucos passos.' : modo === 'recuperar' ? 'Enviamos um link seguro para o seu email.' : modo === 'convite' ? 'Crie o seu acesso com o email em que você recebeu o convite.' : 'Entre para continuar.';
  var err = function err(k) {
    return faltando[k] || undefined;
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '28px 16px',
      boxSizing: 'border-box',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: _objectSpread(_objectSpread({}, glass), {}, {
      width: '100%',
      maxWidth: 460,
      padding: '30px 26px 24px',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(MarcaSalute, {
    tam: 74
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: '.32em',
      color: 'var(--text-strong)',
      paddingLeft: '.32em'
    }
  }, "SALUTE")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 23,
      fontWeight: 600,
      color: 'var(--text-strong)',
      letterSpacing: '-0.01em'
    }
  }, titulo), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      fontSize: 14,
      lineHeight: 1.5,
      color: 'var(--text-muted)'
    }
  }, sub)), semClinica ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AInput, {
    label: "Nome da cl\xEDnica",
    iconLeft: "building-2",
    value: f.clinica,
    onChange: set('clinica'),
    onKeyDown: onKey(criarClinica),
    placeholder: "Ex.: Cl\xEDnica Bella Forma"
  }), /*#__PURE__*/React.createElement(ABtn, {
    fullWidth: true,
    iconLeft: "plus",
    loading: busy,
    onClick: criarClinica
  }, "Criar minha cl\xEDnica"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: linkAcesso,
    onClick: sair
  }, "Sair e entrar com outro email"))) : modo === 'nova' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CampoSenha, {
    label: "Senha nova",
    value: f.senha,
    onChange: set('senha'),
    onKeyDown: onKey(novaSenha),
    autoComplete: "new-password",
    hint: "Pelo menos 8 caracteres"
  }), /*#__PURE__*/React.createElement(ABtn, {
    fullWidth: true,
    iconLeft: "check",
    loading: busy,
    onClick: novaSenha
  }, "Salvar senha")) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ASeg, {
    fullWidth: true,
    value: aba,
    onChange: trocarAba,
    options: [{
      value: 'entrar',
      label: 'Entrar',
      icon: 'log-in'
    }, {
      value: 'cadastrar',
      label: 'Cadastrar',
      icon: 'user-plus'
    }]
  }), aba === 'entrar' ? /*#__PURE__*/React.createElement("form", {
    onSubmit: function onSubmit(e) {
      e.preventDefault();
      (modo === 'recuperar' ? recuperar : modo === 'convite' ? convite : entrar)();
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, modo === 'convite' ? /*#__PURE__*/React.createElement(AInput, {
    label: "Nome completo",
    iconLeft: "user",
    value: f.nome,
    onChange: set('nome'),
    autoComplete: "name",
    placeholder: "Seu nome completo"
  }) : null, /*#__PURE__*/React.createElement(AInput, {
    label: "E-mail",
    type: "email",
    iconLeft: "mail",
    value: f.email,
    onChange: set('email'),
    autoComplete: "email",
    placeholder: "seu@email.com"
  }), modo !== 'recuperar' ? /*#__PURE__*/React.createElement(CampoSenha, {
    label: modo === 'convite' ? 'Crie uma senha' : 'Senha',
    value: f.senha,
    onChange: set('senha'),
    autoComplete: modo === 'entrar' ? 'current-password' : 'new-password',
    hint: modo === 'convite' ? 'Pelo menos 8 caracteres' : undefined
  }) : null, /*#__PURE__*/React.createElement(ABtn, {
    type: "submit",
    fullWidth: true,
    iconLeft: modo === 'recuperar' ? 'send' : modo === 'convite' ? 'user-check' : 'log-in',
    loading: busy
  }, modo === 'recuperar' ? 'Enviar link' : modo === 'convite' ? 'Criar meu acesso' : 'Entrar'), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: modo === 'entrar' ? 'space-between' : 'center',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, modo === 'entrar' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: linkAcesso,
    onClick: function onClick() {
      setModo('recuperar');
      setMsg(null);
    }
  }, "Esqueci minha senha"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: linkAcesso,
    onClick: function onClick() {
      setModo('convite');
      setMsg(null);
    }
  }, "Recebi um convite")) : /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: linkAcesso,
    onClick: function onClick() {
      setModo('entrar');
      setMsg(null);
    }
  }, "Voltar para entrar"))) : /*#__PURE__*/React.createElement("form", {
    onSubmit: function onSubmit(e) {
      e.preventDefault();
      cadastrar();
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(AInput, {
    label: "Nome completo *",
    iconLeft: "user",
    value: f.nome,
    onChange: set('nome'),
    autoComplete: "name",
    placeholder: "Seu nome completo",
    error: err('nome')
  }), /*#__PURE__*/React.createElement(AInput, {
    label: "Nome da cl\xEDnica *",
    iconLeft: "building-2",
    value: f.clinica,
    onChange: set('clinica'),
    autoComplete: "organization",
    placeholder: "Nome da sua cl\xEDnica",
    error: err('clinica')
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-strong)'
    }
  }, f.tipoDoc === 'cnpj' ? 'CNPJ *' : 'CPF *'), /*#__PURE__*/React.createElement(ASeg, {
    size: "sm",
    value: f.tipoDoc,
    onChange: function onChange(v) {
      setF(function (x) {
        return _objectSpread(_objectSpread({}, x), {}, {
          tipoDoc: v,
          doc: v === 'cnpj' ? fmtCNPJ(x.doc) : fmtCPF(x.doc)
        });
      });
      setFaltando(function (x) {
        return _objectSpread(_objectSpread({}, x), {}, {
          doc: null
        });
      });
    },
    options: [{
      value: 'cnpj',
      label: 'CNPJ'
    }, {
      value: 'cpf',
      label: 'CPF'
    }]
  })), /*#__PURE__*/React.createElement(AInput, {
    iconLeft: f.tipoDoc === 'cnpj' ? 'landmark' : 'id-card',
    value: f.doc,
    onChange: set('doc', f.tipoDoc === 'cnpj' ? fmtCNPJ : fmtCPF),
    inputMode: f.tipoDoc === 'cnpj' ? 'text' : 'numeric',
    placeholder: f.tipoDoc === 'cnpj' ? '00.000.000/0000-00' : '000.000.000-00',
    "aria-label": f.tipoDoc === 'cnpj' ? 'CNPJ' : 'CPF',
    error: err('doc')
  })), /*#__PURE__*/React.createElement(AInput, {
    label: "Telefone (WhatsApp) *",
    type: "tel",
    iconLeft: "phone",
    value: f.tel,
    onChange: set('tel', fmtTelBR),
    autoComplete: "tel-national",
    inputMode: "tel",
    placeholder: "(11) 99999-9999",
    error: err('tel')
  }), /*#__PURE__*/React.createElement(AInput, {
    label: "Endere\xE7o *",
    iconLeft: "map-pin",
    value: f.endereco,
    onChange: set('endereco'),
    autoComplete: "street-address",
    placeholder: "Rua, n\xFAmero, bairro, cidade - UF",
    error: err('endereco')
  }), /*#__PURE__*/React.createElement(AInput, {
    label: "E-mail *",
    type: "email",
    iconLeft: "mail",
    value: f.email,
    onChange: set('email'),
    autoComplete: "email",
    placeholder: "seu@email.com",
    error: err('email')
  }), /*#__PURE__*/React.createElement(CampoSenha, {
    label: "Senha *",
    value: f.senha,
    onChange: set('senha'),
    autoComplete: "new-password",
    hint: "Pelo menos 8 caracteres",
    error: err('senha')
  }), /*#__PURE__*/React.createElement(ABtn, {
    type: "submit",
    fullWidth: true,
    iconLeft: "user-plus",
    loading: busy
  }, "Criar conta"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      lineHeight: 1.5,
      color: 'var(--text-muted)',
      textAlign: 'center'
    }
  }, "Voc\xEA recebe um email para confirmar o cadastro. Depois \xE9 s\xF3 entrar com o seu email e senha. Quem trabalha na sua cl\xEDnica recebe o acesso pelo convite que voc\xEA manda em Configura\xE7\xF5es."))), msgBox(msg), semClinica ? null : /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'center',
      fontSize: 12,
      color: 'var(--text-subtle)'
    }
  }, "Ao continuar, voc\xEA concorda com os termos de uso e a pol\xEDtica de privacidade. Seus dados ficam protegidos e separados por cl\xEDnica.")));
}

/* ---------- Aviso de modo demonstração ---------- */
function AvisoDemo(_ref17) {
  var mobile = _ref17.mobile;
  var DIcon = window.SaluteProjetoDesigner_8b4683.Icon;
  var _React$useState17 = React.useState(function () {
      try {
        return sessionStorage.getItem('salute02:aviso') !== 'x';
      } catch (e) {
        return true;
      }
    }),
    _React$useState18 = _slicedToArray(_React$useState17, 2),
    aberto = _React$useState18[0],
    setAberto = _React$useState18[1];
  if (SB_ON || !aberto) return null;
  var fechar = function fechar() {
    setAberto(false);
    try {
      sessionStorage.setItem('salute02:aviso', 'x');
    } catch (e) {}
  };
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      position: 'fixed',
      zIndex: 145,
      left: '50%',
      transform: 'translateX(-50%)',
      top: mobile ? 'auto' : 14,
      bottom: mobile ? 'calc(96px + env(safe-area-inset-bottom))' : 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '7px 7px 7px 14px',
      borderRadius: 999,
      background: 'rgba(255,255,255,.92)',
      border: '1.5px solid #fff',
      boxShadow: '0 14px 28px -16px rgba(23,73,170,.55)',
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      color: 'var(--text-body)',
      maxWidth: 'calc(100vw - 24px)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: '#F5B400',
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    },
    title: SB_MOTIVO
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-strong)',
      fontWeight: 600
    }
  }, "Supabase n\xE3o conectado."), " Modo demonstra\xE7\xE3o: nada \xE9 salvo."), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Fechar aviso",
    onClick: fechar,
    style: {
      width: 26,
      height: 26,
      borderRadius: '50%',
      border: 0,
      background: 'rgba(31,94,255,.08)',
      color: 'var(--text-muted)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(DIcon, {
    name: "x",
    size: 13
  })));
}

/* ---------- Retorno de gravação na tela (componente Toast do sistema) ---------- */
function AvisoGravacao(_ref18) {
  var mobile = _ref18.mobile;
  var GToast = window.SaluteProjetoDesigner_8b4683.Toast;
  var _useStore7 = useStore(SALVA),
    _useStore8 = _slicedToArray(_useStore7, 1),
    s = _useStore8[0];
  var _React$useState19 = React.useState(null),
    _React$useState20 = _slicedToArray(_React$useState19, 2),
    vis = _React$useState20[0],
    setVis = _React$useState20[1];
  React.useEffect(function () {
    var x = s.erro || null;
    if (!x) return;
    setVis(_objectSpread({
      tone: 'danger'
    }, x));
    var t = setTimeout(function () {
      return setVis(null);
    }, 6000);
    return function () {
      return clearTimeout(t);
    };
  }, [s.erro && s.erro.id]);
  React.useEffect(function () {
    var x = s.ok || null;
    if (!x) return;
    setVis(_objectSpread({
      tone: 'success'
    }, x));
    var t = setTimeout(function () {
      return setVis(null);
    }, 2800);
    return function () {
      return clearTimeout(t);
    };
  }, [s.ok && s.ok.id]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, s.pend > 0 ? /*#__PURE__*/React.createElement("div", {
    "aria-live": "polite",
    style: {
      position: 'fixed',
      zIndex: 139,
      right: mobile ? 12 : 24,
      bottom: mobile ? 'calc(100px + env(safe-area-inset-bottom))' : 24,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: 34,
      padding: '0 14px',
      borderRadius: 999,
      background: 'rgba(255,255,255,.92)',
      border: '1.5px solid #fff',
      boxShadow: '0 10px 22px -14px rgba(23,73,170,.5)',
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(SIcon, {
    name: "loader-circle",
    size: 15,
    style: {
      animation: 'sbgira 1s linear infinite'
    }
  }), "Salvando...", /*#__PURE__*/React.createElement("style", null, '@keyframes sbgira{to{transform:rotate(360deg)}}')) : null, vis ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      zIndex: 141,
      right: mobile ? 12 : 24,
      left: mobile ? 12 : 'auto',
      top: mobile ? 70 : 'auto',
      bottom: mobile ? 'auto' : 24
    }
  }, /*#__PURE__*/React.createElement(GToast, {
    tone: vis.tone,
    title: vis.titulo,
    description: vis.desc,
    onClose: function onClose() {
      return setVis(null);
    },
    style: {
      width: mobile ? '100%' : 360
    }
  })) : null);
}

/* ---------- Painel Master: a equipe de suporte da Salute escolhe a clínica ---------- */
var ST_CLINICA = {
  ativa: ['Ativa', '#1E8E4E', 'rgba(45,191,106,.12)'],
  teste: ['Em teste', '#1F5EFF', 'rgba(31,94,255,.1)'],
  em_atraso: ['Em atraso', '#C2410C', 'rgba(242,105,74,.12)'],
  cancelada: ['Cancelada', '#6B7A93', 'rgba(138,151,174,.14)'],
  sem: ['Sem plano', '#6B7A93', 'rgba(138,151,174,.14)'],
  inativa: ['Inativa', '#6B7A93', 'rgba(138,151,174,.14)']
};
var stClinica = function stClinica(c) {
  return c.ativo === false ? 'inativa' : ST_CLINICA[c.assinatura] ? c.assinatura : 'sem';
};
var semAcento = function semAcento(t) {
  return String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
};
function PainelMaster() {
  var _window$SaluteProjeto3 = window.SaluteProjetoDesigner_8b4683,
    MInput = _window$SaluteProjeto3.Input,
    MBtn = _window$SaluteProjeto3.Button;
  var _useStore9 = useStore(SESSAO),
    _useStore0 = _slicedToArray(_useStore9, 1),
    s = _useStore0[0];
  var _React$useState21 = React.useState(null),
    _React$useState22 = _slicedToArray(_React$useState21, 2),
    lista = _React$useState22[0],
    setLista = _React$useState22[1];
  var _React$useState23 = React.useState(null),
    _React$useState24 = _slicedToArray(_React$useState23, 2),
    erro = _React$useState24[0],
    setErro = _React$useState24[1];
  var _React$useState25 = React.useState(''),
    _React$useState26 = _slicedToArray(_React$useState25, 2),
    q = _React$useState26[0],
    setQ = _React$useState26[1];
  var _React$useState27 = React.useState('todas'),
    _React$useState28 = _slicedToArray(_React$useState27, 2),
    filtro = _React$useState28[0],
    setFiltro = _React$useState28[1];
  var _React$useState29 = React.useState(null),
    _React$useState30 = _slicedToArray(_React$useState29, 2),
    abrindo = _React$useState30[0],
    setAbrindo = _React$useState30[1];
  var _React$useState31 = React.useState(null),
    _React$useState32 = _slicedToArray(_React$useState31, 2),
    logins = _React$useState32[0],
    setLogins = _React$useState32[1];
  var mobile = typeof useIsMobile === 'function' ? useIsMobile() : false;
  var buscar = function buscar() {
    setErro(null);
    SB.rpc('admin_clinicas').then(function (_ref19) {
      var data = _ref19.data,
        error = _ref19.error;
      if (error) {
        setErro(MSG_ERRO(error));
        return;
      }
      setLista(data || []);
    });
  };
  React.useEffect(buscar, []);
  var abrir = /*#__PURE__*/function () {
    var _ref20 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(c) {
      var _t2;
      return _regenerator().w(function (_context14) {
        while (1) switch (_context14.p = _context14.n) {
          case 0:
            if (!abrindo) {
              _context14.n = 1;
              break;
            }
            return _context14.a(2);
          case 1:
            setAbrindo(c.id);
            _context14.p = 2;
            _context14.n = 3;
            return suporteEntrar(c.id);
          case 3:
            _context14.n = 5;
            break;
          case 4:
            _context14.p = 4;
            _t2 = _context14.v;
            setAbrindo(null);
            setErro(MSG_ERRO(_t2));
          case 5:
            return _context14.a(2);
        }
      }, _callee14, null, [[2, 4]]);
    }));
    return function abrir(_x5) {
      return _ref20.apply(this, arguments);
    };
  }();
  var termo = semAcento(q).trim(),
    dig = soDig(q);
  // a busca também acha a clínica pelo email de qualquer login dela
  var loginAchado = function loginAchado(c) {
    return termo.length >= 3 ? (c.logins || []).find(function (e) {
      return semAcento(e).includes(termo) && e !== String(c.dono_email || '').toLowerCase();
    }) : null;
  };
  var filtradas = (lista || []).filter(function (c) {
    return (filtro === 'todas' || stClinica(c) === filtro) && (!termo || semAcento([c.nome, c.razao_social, c.cidade, c.uf, c.dono, c.dono_email].join(' ')).includes(termo) || dig.length >= 3 && soDig(c.documento).includes(dig) || !!loginAchado(c));
  });
  var conta = function conta(k) {
    return (lista || []).filter(function (c) {
      return stClinica(c) === k;
    }).length;
  };
  var chips = [['todas', 'Todas', (lista || []).length], ['ativa', 'Ativas', conta('ativa')], ['teste', 'Em teste', conta('teste')], ['em_atraso', 'Em atraso', conta('em_atraso')], ['cancelada', 'Canceladas', conta('cancelada')]].filter(function (x) {
    return x[0] === 'todas' || x[2];
  });
  var nomeEu = [s.perfil && s.perfil.nome, s.perfil && s.perfil.sobrenome].filter(Boolean).join(' ') || s.perfil && s.perfil.email || '';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      boxSizing: 'border-box',
      padding: mobile ? '14px 16px 32px' : '26px 40px 40px',
      fontFamily: 'var(--font-sans)',
      display: 'flex',
      flexDirection: 'column',
      gap: mobile ? 18 : 26
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(MarcaSalute, {
    tam: 46
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 700,
      letterSpacing: '.24em',
      color: 'var(--text-strong)'
    }
  }, "SALUTE"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, "Painel Master")), mobile ? null : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)',
      textAlign: 'right'
    }
  }, "Suporte Salute", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-strong)',
      fontWeight: 600
    }
  }, nomeEu)), /*#__PURE__*/React.createElement(MBtn, {
    variant: "secondary",
    size: "sm",
    iconLeft: "log-out",
    onClick: sair
  }, "Sair")), /*#__PURE__*/React.createElement("main", {
    style: {
      width: '100%',
      maxWidth: 780,
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 56,
      height: 56,
      borderRadius: 18,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(31,94,255,.1)',
      color: '#1F5EFF'
    }
  }, /*#__PURE__*/React.createElement(SIcon, {
    name: "building-2",
    size: 26
  })), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '4px 0 0',
      fontSize: mobile ? 22 : 26,
      fontWeight: 600,
      color: 'var(--text-strong)',
      letterSpacing: '-0.01em'
    }
  }, "Selecione uma cl\xEDnica"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      lineHeight: 1.5,
      color: 'var(--text-muted)',
      maxWidth: 520
    }
  }, "Escolha a cl\xEDnica que deseja acessar para dar suporte. Cada entrada fica registrada na auditoria da cl\xEDnica, com data, hora e IP.")), /*#__PURE__*/React.createElement(MInput, {
    variant: "search",
    value: q,
    onChange: function onChange(e) {
      return setQ(e.target.value);
    },
    placeholder: mobile ? 'Nome, cidade, CNPJ ou email' : 'Buscar por nome, cidade, CNPJ ou email de login',
    "aria-label": "Buscar cl\xEDnica"
  }), lista && lista.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, chips.map(function (_ref21) {
    var _ref22 = _slicedToArray(_ref21, 3),
      k = _ref22[0],
      l = _ref22[1],
      n = _ref22[2];
    return /*#__PURE__*/React.createElement(FilterChip, {
      key: k,
      active: filtro === k,
      onClick: function onClick() {
        return setFiltro(k);
      }
    }, l, " (", n, ")");
  })) : null, /*#__PURE__*/React.createElement("section", {
    style: _objectSpread(_objectSpread({}, glass), {}, {
      padding: 8,
      display: 'flex',
      flexDirection: 'column'
    })
  }, erro ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 22,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12,
      textAlign: 'center',
      color: 'var(--text-muted)',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement(SIcon, {
    name: "cloud-off",
    size: 22
  }), erro, /*#__PURE__*/React.createElement(MBtn, {
    size: "sm",
    variant: "secondary",
    iconLeft: "refresh-cw",
    onClick: buscar
  }, "Tentar de novo")) : !lista ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      display: 'flex',
      justifyContent: 'center',
      gap: 10,
      color: 'var(--text-muted)',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement(SIcon, {
    name: "loader-circle",
    size: 18,
    style: {
      animation: 'sbgira 1s linear infinite'
    }
  }), "Carregando cl\xEDnicas...", /*#__PURE__*/React.createElement("style", null, '@keyframes sbgira{to{transform:rotate(360deg)}}')) : !filtradas.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 28,
      textAlign: 'center',
      color: 'var(--text-muted)',
      fontSize: 14
    }
  }, lista.length ? 'Nenhuma clínica encontrada com essa busca.' : 'Nenhuma clínica cadastrada ainda.') : filtradas.map(function (c, i) {
    var st = ST_CLINICA[stClinica(c)];
    var achado = loginAchado(c);
    var det = [c.plano ? 'Plano ' + c.plano : 'Sem plano', c.cidade ? c.cidade + (c.uf ? ' - ' + c.uf : '') : null, (c.pacientes || 0) + (Number(c.pacientes) === 1 ? ' paciente' : ' pacientes'), 'desde ' + BR.dataTela(BR.diaDe(c.criado_em))].filter(Boolean).join(' · ');
    return /*#__PURE__*/React.createElement("div", {
      key: c.id,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        borderTop: i ? '1px solid rgba(214,226,242,.7)' : 0
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: function onClick() {
        return abrir(c);
      },
      disabled: !!abrindo,
      title: 'Entrar na ' + c.nome + ' como suporte',
      style: {
        flex: 1,
        minWidth: 0,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 12px',
        border: 0,
        borderRadius: 16,
        background: abrindo === c.id ? 'rgba(31,94,255,.07)' : 'transparent',
        cursor: abrindo ? 'default' : 'pointer',
        fontFamily: 'inherit',
        textAlign: 'left'
      },
      onMouseEnter: function onMouseEnter(e) {
        if (!abrindo) e.currentTarget.style.background = 'rgba(255,255,255,.75)';
      },
      onMouseLeave: function onMouseLeave(e) {
        if (abrindo !== c.id) e.currentTarget.style.background = 'transparent';
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 42,
        height: 42,
        borderRadius: 14,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(31,94,255,.08)',
        color: '#1F5EFF'
      }
    }, /*#__PURE__*/React.createElement(SIcon, {
      name: "building-2",
      size: 19
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontSize: 15,
        fontWeight: 600,
        color: 'var(--text-strong)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, c.nome), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontSize: 12,
        color: 'var(--text-muted)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: mobile ? 'normal' : 'nowrap'
      }
    }, det), c.dono ? /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontSize: 12,
        color: 'var(--text-subtle)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, c.dono, c.dono_email ? ' · ' + c.dono_email : '') : null, achado ? /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        fontSize: 12,
        fontWeight: 500,
        color: '#1F5EFF',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
      }
    }, /*#__PURE__*/React.createElement(SIcon, {
      name: "user-round",
      size: 13
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, "Login: ", achado)) : null), /*#__PURE__*/React.createElement("span", {
      style: {
        flexShrink: 0,
        fontSize: 12,
        fontWeight: 600,
        padding: '4px 10px',
        borderRadius: 999,
        color: st[1],
        background: st[2]
      }
    }, st[0]), /*#__PURE__*/React.createElement("span", {
      style: {
        flexShrink: 0,
        color: 'var(--text-subtle)',
        display: 'flex'
      }
    }, abrindo === c.id ? /*#__PURE__*/React.createElement(SIcon, {
      name: "loader-circle",
      size: 17,
      style: {
        animation: 'sbgira 1s linear infinite'
      }
    }) : /*#__PURE__*/React.createElement(SIcon, {
      name: "chevron-right",
      size: 17
    }))), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: function onClick() {
        return setLogins(c);
      },
      disabled: !!abrindo,
      "aria-label": 'Logins da ' + c.nome,
      title: "Logins da cl\xEDnica",
      style: {
        flexShrink: 0,
        width: 40,
        height: 40,
        marginRight: 4,
        borderRadius: '50%',
        border: '1.5px solid rgba(214,226,242,.95)',
        background: 'rgba(255,255,255,.7)',
        color: 'var(--text-strong)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: abrindo ? 'default' : 'pointer',
        padding: 0
      }
    }, /*#__PURE__*/React.createElement(SIcon, {
      name: "users",
      size: 17
    })));
  })), lista ? /*#__PURE__*/React.createElement("span", {
    style: {
      textAlign: 'center',
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, lista.length, " ", lista.length === 1 ? 'clínica cadastrada' : 'clínicas cadastradas') : null), logins ? /*#__PURE__*/React.createElement(LoginsClinica, {
    clinica: logins,
    mobile: mobile,
    onClose: function onClose() {
      return setLogins(null);
    }
  }) : null);
}

/* ---------- Painel Master: logins de uma clínica (sem senha: ninguém vê senha, nem a Salute) ---------- */
var PAPEL_LOGIN = {
  dono: 'Dono',
  gestor: 'Gestão',
  recepcao: 'Recepção',
  profissional: 'Profissional',
  financeiro: 'Financeiro'
};
function situacaoLogin(m) {
  if (!m.ativo) return ['Bloqueado', '#C2272D', 'rgba(229,72,77,.1)'];
  if (m.convite === 'pendente') return ['Convite pendente', '#B98400', 'rgba(245,180,0,.14)'];
  if (m.tem_login && !m.email_confirmado) return ['Email não confirmado', '#B98400', 'rgba(245,180,0,.14)'];
  return ['Ativo', '#1E8E4E', 'rgba(45,191,106,.12)'];
}
function LoginsClinica(_ref23) {
  var clinica = _ref23.clinica,
    onClose = _ref23.onClose,
    mobile = _ref23.mobile;
  var _window$SaluteProjeto4 = window.SaluteProjetoDesigner_8b4683,
    LDialog = _window$SaluteProjeto4.Dialog,
    LBtn = _window$SaluteProjeto4.Button;
  var _React$useState33 = React.useState(null),
    _React$useState34 = _slicedToArray(_React$useState33, 2),
    lista = _React$useState34[0],
    setLista = _React$useState34[1];
  var _React$useState35 = React.useState(null),
    _React$useState36 = _slicedToArray(_React$useState35, 2),
    erro = _React$useState36[0],
    setErro = _React$useState36[1];
  var _React$useState37 = React.useState(null),
    _React$useState38 = _slicedToArray(_React$useState37, 2),
    msg = _React$useState38[0],
    setMsg = _React$useState38[1];
  var _React$useState39 = React.useState(null),
    _React$useState40 = _slicedToArray(_React$useState39, 2),
    ocupado = _React$useState40[0],
    setOcupado = _React$useState40[1];
  var _React$useState41 = React.useState(null),
    _React$useState42 = _slicedToArray(_React$useState41, 2),
    confirma = _React$useState42[0],
    setConfirma = _React$useState42[1];
  var carregarLogins = function carregarLogins() {
    setErro(null);
    SB.rpc('admin_membros', {
      p_clinica: clinica.id
    }).then(function (_ref24) {
      var data = _ref24.data,
        error = _ref24.error;
      if (error) {
        setErro(MSG_ERRO(error));
        return;
      }
      setLista(data || []);
    });
  };
  React.useEffect(carregarLogins, [clinica.id]);
  var volta = voltaAuth();
  var acao = /*#__PURE__*/function () {
    var _ref25 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(m, tipo) {
      var _yield$SB$auth$resetP2, error, cli, nomes, _yield$cli$auth$signI, _error, ativo, _yield$SB$rpc2, _error2, t, _t3;
      return _regenerator().w(function (_context15) {
        while (1) switch (_context15.p = _context15.n) {
          case 0:
            if (!ocupado) {
              _context15.n = 1;
              break;
            }
            return _context15.a(2);
          case 1:
            setOcupado(m.id + tipo);
            setMsg(null);
            _context15.p = 2;
            if (!(tipo === 'senha')) {
              _context15.n = 6;
              break;
            }
            _context15.n = 3;
            return SB.auth.resetPasswordForEmail(m.email, {
              redirectTo: volta
            });
          case 3:
            _yield$SB$auth$resetP2 = _context15.v;
            error = _yield$SB$auth$resetP2.error;
            if (!error) {
              _context15.n = 4;
              break;
            }
            throw error;
          case 4:
            _context15.n = 5;
            return SB.rpc('admin_registrar_envio', {
              p_vinculo: m.id,
              p_tipo: 'link_senha'
            });
          case 5:
            setMsg({
              t: 'Link para criar senha nova enviado para ' + m.email + '.'
            });
            _context15.n = 13;
            break;
          case 6:
            if (!(tipo === 'convite')) {
              _context15.n = 10;
              break;
            }
            // cliente separado: o envio não mexe na sessão do suporte
            cli = window.supabase.createClient(SB_CFG.url, SB_CFG.key, {
              auth: {
                persistSession: false,
                autoRefreshToken: false,
                detectSessionInUrl: false,
                flowType: 'implicit',
                storageKey: 'salute02-convite'
              }
            });
            nomes = String(m.nome || '').trim().split(/\s+/);
            _context15.n = 7;
            return cli.auth.signInWithOtp({
              email: m.email,
              options: {
                shouldCreateUser: true,
                emailRedirectTo: volta,
                data: {
                  nome: nomes[0] || '',
                  sobrenome: nomes.slice(1).join(' '),
                  convite: true
                }
              }
            });
          case 7:
            _yield$cli$auth$signI = _context15.v;
            _error = _yield$cli$auth$signI.error;
            if (!_error) {
              _context15.n = 8;
              break;
            }
            throw _error;
          case 8:
            _context15.n = 9;
            return SB.rpc('admin_registrar_envio', {
              p_vinculo: m.id,
              p_tipo: 'convite'
            });
          case 9:
            setMsg({
              t: 'Convite enviado de novo para ' + m.email + '.'
            });
            carregarLogins();
            _context15.n = 13;
            break;
          case 10:
            ativo = tipo === 'liberar';
            _context15.n = 11;
            return SB.rpc('admin_definir_acesso', {
              p_vinculo: m.id,
              p_ativo: ativo,
              p_motivo: 'Painel Master'
            });
          case 11:
            _yield$SB$rpc2 = _context15.v;
            _error2 = _yield$SB$rpc2.error;
            if (!_error2) {
              _context15.n = 12;
              break;
            }
            throw _error2;
          case 12:
            setConfirma(null);
            setLista(function (l) {
              return l.map(function (x) {
                return x.id === m.id ? _objectSpread(_objectSpread({}, x), {}, {
                  ativo: ativo
                }) : x;
              });
            });
            setMsg({
              t: ativo ? 'Acesso de ' + m.nome + ' liberado.' : 'Acesso de ' + m.nome + ' bloqueado. A pessoa não entra mais nesta clínica até você liberar.'
            });
          case 13:
            _context15.n = 15;
            break;
          case 14:
            _context15.p = 14;
            _t3 = _context15.v;
            t = String(_t3 && _t3.message || '');
            setMsg({
              erro: true,
              t: /rate limit|too many|seconds/i.test(t) ? 'Muitos envios seguidos para este email. Espere um minuto e tente de novo.' : MSG_ERRO(_t3)
            });
          case 15:
            setOcupado(null);
          case 16:
            return _context15.a(2);
        }
      }, _callee15, null, [[2, 14]]);
    }));
    return function acao(_x6, _x7) {
      return _ref25.apply(this, arguments);
    };
  }();
  var botao = function botao(m, tipo, icone, txt, perigo) {
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: function onClick() {
        return tipo === 'bloquear' ? setConfirma(m.id) : acao(m, tipo);
      },
      disabled: !!ocupado,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: 32,
        padding: '0 12px',
        borderRadius: 999,
        border: '1.5px solid ' + (perigo ? 'rgba(229,72,77,.35)' : 'rgba(214,226,242,.95)'),
        background: '#fff',
        color: perigo ? '#C2272D' : 'var(--text-strong)',
        fontFamily: 'inherit',
        fontSize: 13,
        fontWeight: 500,
        cursor: ocupado ? 'default' : 'pointer',
        whiteSpace: 'nowrap'
      }
    }, /*#__PURE__*/React.createElement(SIcon, {
      name: ocupado === m.id + tipo ? 'loader-circle' : icone,
      size: 14,
      style: ocupado === m.id + tipo ? {
        animation: 'sbgira 1s linear infinite'
      } : undefined
    }), txt);
  };
  var quando = function quando(ts) {
    return ts ? BR.dataTela(BR.diaDe(ts)) + ' às ' + BR.hm(ts) : null;
  };
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement(LDialog, {
    open: true,
    onClose: onClose,
    icon: "users",
    title: 'Logins da ' + clinica.nome,
    width: 660,
    description: "As senhas ficam guardadas com criptografia e ningu\xE9m consegue ver, nem a equipe da Salute. Para ajudar algu\xE9m a entrar, envie o link de senha nova.",
    footer: /*#__PURE__*/React.createElement(LBtn, {
      variant: "secondary",
      onClick: onClose
    }, "Fechar")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, erro ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 18,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      textAlign: 'center',
      color: 'var(--text-muted)',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement(SIcon, {
    name: "cloud-off",
    size: 20
  }), erro, /*#__PURE__*/React.createElement(LBtn, {
    size: "sm",
    variant: "secondary",
    iconLeft: "refresh-cw",
    onClick: carregarLogins
  }, "Tentar de novo")) : !lista ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      display: 'flex',
      justifyContent: 'center',
      gap: 10,
      color: 'var(--text-muted)',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement(SIcon, {
    name: "loader-circle",
    size: 18,
    style: {
      animation: 'sbgira 1s linear infinite'
    }
  }), "Carregando logins...") : !lista.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      textAlign: 'center',
      color: 'var(--text-muted)',
      fontSize: 14
    }
  }, "Esta cl\xEDnica ainda n\xE3o tem logins.") : lista.map(function (m) {
    var st = situacaoLogin(m);
    var acesso = quando(m.ultimo_acesso_em);
    return /*#__PURE__*/React.createElement("div", {
      key: m.id,
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: '12px 14px',
        borderRadius: 18,
        background: 'rgba(255,255,255,.7)',
        border: '1.5px solid rgba(214,226,242,.8)',
        opacity: m.ativo ? 1 : 0.85
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(SAvatar, {
      name: m.nome,
      size: 40
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 600,
        color: 'var(--text-strong)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, m.nome), m.dono ? /*#__PURE__*/React.createElement("span", {
      style: {
        flexShrink: 0,
        fontSize: 11,
        fontWeight: 600,
        color: '#1F5EFF',
        background: 'rgba(31,94,255,.1)',
        padding: '2px 8px',
        borderRadius: 999
      }
    }, "Dono") : null), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: 'var(--text-muted)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, m.email), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: 'var(--text-subtle)'
      }
    }, [m.funcao || PAPEL_LOGIN[m.papel] || '', acesso ? 'Último acesso ' + acesso : m.tem_login ? 'Ainda não entrou' : 'Sem login criado'].filter(Boolean).join(' · '))), mobile ? null : /*#__PURE__*/React.createElement("span", {
      style: {
        flexShrink: 0,
        fontSize: 12,
        fontWeight: 600,
        padding: '4px 10px',
        borderRadius: 999,
        color: st[1],
        background: st[2]
      }
    }, st[0])), mobile ? /*#__PURE__*/React.createElement("span", {
      style: {
        alignSelf: 'flex-start',
        fontSize: 12,
        fontWeight: 600,
        padding: '4px 10px',
        borderRadius: 999,
        color: st[1],
        background: st[2]
      }
    }, st[0]) : null, confirma === m.id ? /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flexWrap: 'wrap',
        padding: '10px 12px',
        borderRadius: 14,
        background: 'rgba(229,72,77,.06)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 180,
        fontSize: 13,
        color: 'var(--text-body)'
      }
    }, "Bloquear o acesso de ", /*#__PURE__*/React.createElement("b", null, m.nome), " a esta cl\xEDnica? Fica registrado na auditoria."), /*#__PURE__*/React.createElement(LBtn, {
      size: "sm",
      variant: "secondary",
      onClick: function onClick() {
        return setConfirma(null);
      }
    }, "Cancelar"), /*#__PURE__*/React.createElement(LBtn, {
      size: "sm",
      variant: "danger",
      iconLeft: "lock",
      loading: ocupado === m.id + 'bloquear',
      onClick: function onClick() {
        return acao(m, 'bloquear');
      }
    }, "Bloquear")) : /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap'
      }
    }, m.ativo && m.tem_login && m.email_confirmado ? botao(m, 'senha', 'key-round', 'Enviar link de senha') : null, m.ativo && (m.convite === 'pendente' || m.tem_login && !m.email_confirmado) ? botao(m, 'convite', 'send', 'Reenviar convite') : null, m.ativo ? botao(m, 'bloquear', 'lock', 'Bloquear acesso', true) : botao(m, 'liberar', 'lock-open', 'Liberar acesso')));
  }), msgBox(msg), /*#__PURE__*/React.createElement("style", null, '@keyframes sbgira{to{transform:rotate(360deg)}}')))), document.body);
}

/* ---------- Faixa do suporte: aparece no topo enquanto a equipe da Salute está dentro de uma clínica ---------- */
function AvisoSuporte(_ref26) {
  var mobile = _ref26.mobile;
  var SBtn = window.SaluteProjetoDesigner_8b4683.Button;
  var _useStore1 = useStore(SESSAO),
    _useStore10 = _slicedToArray(_useStore1, 1),
    s = _useStore10[0];
  if (!SB_ON || !s.suporte) return null;
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      flexWrap: 'wrap',
      padding: mobile ? '10px 12px' : '10px 12px 10px 16px',
      borderRadius: 20,
      background: 'rgba(255,248,230,.85)',
      border: '1.5px solid rgba(245,180,0,.45)',
      boxShadow: '0 10px 22px -18px rgba(185,132,0,.6)',
      fontFamily: 'var(--font-sans)',
      margin: mobile ? '0 0 12px' : 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 12,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(245,180,0,.18)',
      color: '#B98400'
    }
  }, /*#__PURE__*/React.createElement(SIcon, {
    name: "shield-check",
    size: 18
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 180,
      fontSize: 14,
      lineHeight: 1.4,
      color: 'var(--text-body)'
    }
  }, "Voc\xEA est\xE1 acessando como suporte: ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-strong)'
    }
  }, s.suporte.nome), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, "Entrada registrada \xE0s ", BR.hm(s.suporte.iniciado_em), " de ", BR.dataTela(BR.diaDe(s.suporte.iniciado_em)), ". Tudo o que voc\xEA alterar fica na auditoria da cl\xEDnica.")), /*#__PURE__*/React.createElement(SBtn, {
    size: "sm",
    variant: "secondary",
    iconLeft: "repeat",
    onClick: suporteVoltar
  }, "Trocar cl\xEDnica"));
}

/* ---------- Aba sem permissão: aparece com cadeado ---------- */
function SemAcesso(_ref27) {
  var titulo = _ref27.titulo;
  var XEmpty = window.SaluteProjetoDesigner_8b4683.EmptyState;
  return /*#__PURE__*/React.createElement(XEmpty, {
    icon: "lock",
    title: 'Sem acesso a ' + (titulo || 'esta aba'),
    description: "Esta aba n\xE3o est\xE1 liberada para o seu usu\xE1rio. Pe\xE7a ao dono da cl\xEDnica para liberar em Configura\xE7\xF5es, na \xE1rea Equipe e acessos.",
    style: {
      maxWidth: 560,
      margin: '20px auto 0'
    }
  });
}

/* ---------- Minha conta: o avatar abre os dados pessoais e o botão de sair ---------- */
var CONTA = makeStore(null);
function abrirConta(e) {
  var r = e && e.currentTarget && e.currentTarget.getBoundingClientRect ? e.currentTarget.getBoundingClientRect() : {
    left: innerWidth - 60,
    top: 20,
    width: 40,
    height: 40
  };
  CONTA.v = CONTA.v ? null : {
    x: r.left,
    y: r.top,
    w: r.width,
    h: r.height
  };
  CONTA.subs.forEach(function (f) {
    return f();
  });
}
var fecharConta = function fecharConta() {
  CONTA.v = null;
  CONTA.subs.forEach(function (f) {
    return f();
  });
};
var ABA_CONFIG = makeStore(null);
var PAPEL_TXT = {
  dono: 'Dono da clínica',
  gestor: 'Gestão',
  recepcao: 'Recepção',
  profissional: 'Profissional',
  financeiro: 'Financeiro'
};
// avatar: dados pessoais, clínicas do mesmo login (troca com um toque), nova clínica e sair
function ContaMenu(props) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(ContaMenu0, props), /*#__PURE__*/React.createElement(NovaClinicaDialog, null), /*#__PURE__*/React.createElement(TrocaAviso, null));
}
function ContaMenu0(_ref28) {
  var onNavigate = _ref28.onNavigate,
    mobile = _ref28.mobile;
  var _useStore11 = useStore(CONTA),
    _useStore12 = _slicedToArray(_useStore11, 1),
    a = _useStore12[0];
  var _useStore13 = useStore(SESSAO),
    _useStore14 = _slicedToArray(_useStore13, 1),
    s = _useStore14[0];
  var _useAccess = useAccess(),
    can = _useAccess.can;
  React.useEffect(function () {
    if (!a) return undefined;
    var k = function k(e) {
      if (e.key === 'Escape') fecharConta();
    };
    window.addEventListener('keydown', k);
    return function () {
      return window.removeEventListener('keydown', k);
    };
  }, [!!a]);
  if (!a) return null;
  var W = Math.min(300, innerWidth - 24);
  var lateral = a.x < 140 && a.y > innerHeight / 2;
  var pos = lateral ? {
    left: a.x + a.w + 14,
    bottom: Math.max(12, innerHeight - (a.y + a.h))
  } : {
    top: a.y + a.h + 10,
    left: Math.max(12, Math.min(innerWidth - W - 12, a.x + a.w - W))
  };
  var cli = s.clinica,
    nome = KIT_USER.name || 'Usuário',
    email = KIT_USER.email || s.perfil && s.perfil.email || (SB_ON ? '' : 'camila@bellaforma.com.br');
  var funcaoDe = function funcaoDe(c) {
    return c.funcao || PAPEL_TXT[c.dono ? 'dono' : c.papel] || '';
  };
  var funcao = s.suporte ? 'Suporte Salute' : cli ? funcaoDe(cli) : 'Administradora';
  var item = function item(icone, txt, fn, cor) {
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: function onClick() {
        fecharConta();
        fn();
      },
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        height: 42,
        padding: '0 12px',
        border: 0,
        borderRadius: 14,
        background: 'transparent',
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 14,
        fontWeight: 500,
        color: cor || 'var(--text-strong)',
        textAlign: 'left',
        width: '100%'
      },
      onMouseEnter: function onMouseEnter(e) {
        e.currentTarget.style.background = cor ? 'rgba(229,72,77,.07)' : 'rgba(31,94,255,.06)';
      },
      onMouseLeave: function onMouseLeave(e) {
        e.currentTarget.style.background = 'transparent';
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        color: cor || '#1F5EFF'
      }
    }, /*#__PURE__*/React.createElement(SIcon, {
      name: icone,
      size: 17
    })), txt);
  };
  var minhas = (s.clinicas || []).filter(function (c) {
    return !c.suporte;
  });
  var varias = !s.suporte && minhas.length > 1;
  var podeNova = SB_ON && !s.suporte && minhas.some(function (c) {
    return c.dono || c.papel === 'dono';
  });
  var atualBox = function atualBox(c) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 12px',
        borderRadius: 16,
        background: s.suporte ? 'rgba(245,180,0,.12)' : 'rgba(31,94,255,.06)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        color: s.suporte ? '#B98400' : '#1F5EFF'
      }
    }, /*#__PURE__*/React.createElement(SIcon, {
      name: s.suporte ? 'shield-check' : 'building-2',
      size: 17
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        minWidth: 0,
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontSize: 14,
        fontWeight: 600,
        color: 'var(--text-strong)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, c ? c.nome : 'Clínica Bella Forma'), funcao ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)'
      }
    }, funcao) : null), varias ? /*#__PURE__*/React.createElement("span", {
      title: "Cl\xEDnica aberta",
      style: {
        display: 'flex',
        color: '#1F5EFF',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(SIcon, {
      name: "check",
      size: 17
    })) : null);
  };
  // outra clínica do mesmo login: um toque troca
  var outraBox = function outraBox(c) {
    return /*#__PURE__*/React.createElement("button", {
      key: c.id,
      type: "button",
      onClick: function onClick() {
        fecharConta();
        trocarClinica(c.id);
      },
      title: 'Abrir ' + c.nome,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '9px 12px',
        border: 0,
        borderRadius: 16,
        background: 'transparent',
        cursor: 'pointer',
        fontFamily: 'inherit',
        textAlign: 'left',
        width: '100%'
      },
      onMouseEnter: function onMouseEnter(e) {
        e.currentTarget.style.background = 'rgba(31,94,255,.06)';
      },
      onMouseLeave: function onMouseLeave(e) {
        e.currentTarget.style.background = 'transparent';
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        color: 'var(--text-subtle)'
      }
    }, /*#__PURE__*/React.createElement(SIcon, {
      name: "building-2",
      size: 17
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        minWidth: 0,
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontSize: 14,
        fontWeight: 500,
        color: 'var(--text-strong)',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, c.nome), funcaoDe(c) ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)'
      }
    }, funcaoDe(c)) : null), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        color: 'var(--text-subtle)',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(SIcon, {
      name: "arrow-left-right",
      size: 15
    })));
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    onClick: fecharConta,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 170
    }
  }), /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-label": "Minha conta",
    style: _objectSpread(_objectSpread({
      position: 'fixed',
      zIndex: 171,
      width: W,
      boxSizing: 'border-box'
    }, pos), {}, {
      padding: 12,
      borderRadius: 24,
      background: 'rgba(255,255,255,.97)',
      border: '1.5px solid #fff',
      boxShadow: '0 26px 50px -22px rgba(23,73,170,.6)',
      fontFamily: 'var(--font-sans)',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)'
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '6px 6px 4px'
    }
  }, /*#__PURE__*/React.createElement(SAvatar, {
    name: nome,
    src: KIT_USER.avatar,
    size: 46
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--text-strong)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, nome), email ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, email) : null)), varias ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '2px 8px 0',
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--text-muted)',
      textTransform: 'uppercase',
      letterSpacing: '.03em'
    }
  }, "Minhas cl\xEDnicas (", minhas.length, ")"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      maxHeight: Math.max(150, Math.min(300, innerHeight - 330)),
      overflowY: 'auto',
      scrollbarWidth: 'thin'
    }
  }, atualBox(cli), minhas.filter(function (c) {
    return !cli || c.id !== cli.id;
  }).map(outraBox))) : atualBox(cli), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, podeNova ? item('plus', 'Adicionar clínica', abrirNovaClinica) : null, can('perfil') && can('perfil.conta') ? item('user-round', 'Minha conta', function () {
    ABA_CONFIG.v = 'conta';
    ABA_CONFIG.subs.forEach(function (f) {
      return f();
    });
    if (SB_ON) salvarPref({
      filtros: _objectSpread(_objectSpread({}, PREF.v && PREF.v.filtros || {}), {}, {
        'config.aba': 'conta'
      })
    });
    onNavigate('perfil');
  }) : null, s.suporte ? item('repeat', 'Trocar clínica', suporteVoltar) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      height: 1,
      background: 'rgba(214,226,242,.9)',
      margin: '4px 6px'
    }
  }), item('log-out', 'Sair', sair, '#E5484D'))));
}

/* ---------- Adicionar clínica: o mesmo login passa a ter mais uma clínica, como dono ---------- */
var NOVA_CLI = makeStore(false);
var abrirNovaClinica = function abrirNovaClinica() {
  NOVA_CLI.v = true;
  NOVA_CLI.subs.forEach(function (f) {
    return f();
  });
};
var fecharNovaClinica = function fecharNovaClinica() {
  NOVA_CLI.v = false;
  NOVA_CLI.subs.forEach(function (f) {
    return f();
  });
};
function NovaClinicaDialog() {
  var _useStore15 = useStore(NOVA_CLI),
    _useStore16 = _slicedToArray(_useStore15, 1),
    aberto = _useStore16[0];
  var _window$SaluteProjeto5 = window.SaluteProjetoDesigner_8b4683,
    NDialog = _window$SaluteProjeto5.Dialog,
    NInput = _window$SaluteProjeto5.Input,
    NBtn = _window$SaluteProjeto5.Button,
    NSeg = _window$SaluteProjeto5.SegmentedControl;
  var vazio = {
    nome: '',
    tipoDoc: 'cnpj',
    doc: '',
    tel: '',
    endereco: ''
  };
  var _React$useState43 = React.useState(vazio),
    _React$useState44 = _slicedToArray(_React$useState43, 2),
    f = _React$useState44[0],
    setF = _React$useState44[1];
  var _React$useState45 = React.useState({}),
    _React$useState46 = _slicedToArray(_React$useState45, 2),
    fal = _React$useState46[0],
    setFal = _React$useState46[1];
  var _React$useState47 = React.useState(''),
    _React$useState48 = _slicedToArray(_React$useState47, 2),
    erro = _React$useState48[0],
    setErro = _React$useState48[1];
  var _React$useState49 = React.useState(false),
    _React$useState50 = _slicedToArray(_React$useState49, 2),
    busy = _React$useState50[0],
    setBusy = _React$useState50[1];
  React.useEffect(function () {
    if (aberto) {
      setF(vazio);
      setFal({});
      setErro('');
      setBusy(false);
    }
  }, [aberto]);
  if (!aberto) return null;
  var set = function set(k, fmt) {
    return function (e) {
      var v = fmt ? fmt(e.target.value) : e.target.value;
      setF(function (x) {
        return _objectSpread(_objectSpread({}, x), {}, _defineProperty({}, k, v));
      });
      setErro('');
      if (fal[k]) setFal(function (x) {
        return _objectSpread(_objectSpread({}, x), {}, _defineProperty({}, k, null));
      });
    };
  };
  var fechar = function fechar() {
    if (!busy) fecharNovaClinica();
  };
  var criar = /*#__PURE__*/function () {
    var _ref29 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16() {
      var doc, end, tel, fx, p, resp, _yield$SB$rpc3, data, error, _t4;
      return _regenerator().w(function (_context16) {
        while (1) switch (_context16.p = _context16.n) {
          case 0:
            doc = f.tipoDoc === 'cnpj' ? fmtCNPJ(f.doc) : fmtCPF(f.doc), end = partesEndereco(f.endereco), tel = BR.tel(f.tel);
            fx = {
              nome: f.nome.trim().length < 2 ? 'Informe o nome da clínica.' : null,
              doc: !(f.tipoDoc === 'cnpj' ? cnpjValido(doc) : cpfValido(doc)) ? f.tipoDoc === 'cnpj' ? 'Confira o CNPJ.' : 'Confira o CPF.' : null,
              tel: !tel || soDig(f.tel).length < 10 ? 'Use DDD e número, por exemplo (19) 99800-4100.' : null,
              endereco: !end.logradouro || f.endereco.trim().length < 6 ? 'Informe rua, número, bairro e cidade.' : null
            };
            setFal(fx);
            if (!Object.values(fx).some(Boolean)) {
              _context16.n = 1;
              break;
            }
            setErro('Confira os campos destacados.');
            return _context16.a(2);
          case 1:
            setBusy(true);
            setErro('');
            _context16.p = 2;
            p = SESSAO.v.perfil || {};
            resp = [p.nome, p.sobrenome].filter(Boolean).join(' ') || null;
            _context16.n = 3;
            return SB.rpc('criar_clinica', {
              p_nome: f.nome.trim(),
              p_dados: _objectSpread(_defineProperty(_defineProperty(_defineProperty({
                responsavel_nome: resp
              }, f.tipoDoc, doc), "telefone", tel), "email", p.email || null), end)
            });
          case 3:
            _yield$SB$rpc3 = _context16.v;
            data = _yield$SB$rpc3.data;
            error = _yield$SB$rpc3.error;
            if (!error) {
              _context16.n = 4;
              break;
            }
            throw error;
          case 4:
            // a lista de clínicas do login ganha a nova; abre direto nela
            SESSAO.v = _objectSpread(_objectSpread({}, SESSAO.v), {}, {
              clinicas: [].concat(_toConsumableArray(SESSAO.v.clinicas || []), [{
                id: data,
                nome: f.nome.trim(),
                papel: 'dono',
                dono: true,
                funcao: 'Administradora'
              }])
            });
            fecharNovaClinica();
            _context16.n = 5;
            return trocarClinica(data);
          case 5:
            _context16.n = 7;
            break;
          case 6:
            _context16.p = 6;
            _t4 = _context16.v;
            setErro(MSG_ERRO(_t4));
            setBusy(false);
          case 7:
            return _context16.a(2);
        }
      }, _callee16, null, [[2, 6]]);
    }));
    return function criar() {
      return _ref29.apply(this, arguments);
    };
  }();
  var err = function err(k) {
    return fal[k] || undefined;
  };
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement(NDialog, {
    open: true,
    onClose: fechar,
    icon: "building-2",
    title: "Adicionar cl\xEDnica",
    description: "A nova cl\xEDnica come\xE7a com voc\xEA como dono e com os dados separados das outras. Para trocar entre elas, toque no seu avatar.",
    width: 560,
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(NBtn, {
      variant: "secondary",
      onClick: fechar
    }, "Cancelar"), /*#__PURE__*/React.createElement(NBtn, {
      iconLeft: "plus",
      loading: busy,
      onClick: criar
    }, "Criar cl\xEDnica"))
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: function onSubmit(e) {
      e.preventDefault();
      criar();
    },
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(NInput, {
    label: "Nome da cl\xEDnica *",
    iconLeft: "building-2",
    value: f.nome,
    onChange: set('nome'),
    autoComplete: "organization",
    placeholder: "Ex.: Cl\xEDnica Bella Forma Campinas",
    error: err('nome'),
    autoFocus: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-strong)'
    }
  }, f.tipoDoc === 'cnpj' ? 'CNPJ *' : 'CPF *'), /*#__PURE__*/React.createElement(NSeg, {
    size: "sm",
    value: f.tipoDoc,
    onChange: function onChange(v) {
      setF(function (x) {
        return _objectSpread(_objectSpread({}, x), {}, {
          tipoDoc: v,
          doc: v === 'cnpj' ? fmtCNPJ(x.doc) : fmtCPF(x.doc)
        });
      });
      setFal(function (x) {
        return _objectSpread(_objectSpread({}, x), {}, {
          doc: null
        });
      });
    },
    options: [{
      value: 'cnpj',
      label: 'CNPJ'
    }, {
      value: 'cpf',
      label: 'CPF'
    }]
  })), /*#__PURE__*/React.createElement(NInput, {
    iconLeft: f.tipoDoc === 'cnpj' ? 'landmark' : 'id-card',
    value: f.doc,
    onChange: set('doc', f.tipoDoc === 'cnpj' ? fmtCNPJ : fmtCPF),
    inputMode: f.tipoDoc === 'cnpj' ? 'text' : 'numeric',
    placeholder: f.tipoDoc === 'cnpj' ? '00.000.000/0000-00' : '000.000.000-00',
    "aria-label": f.tipoDoc === 'cnpj' ? 'CNPJ' : 'CPF',
    error: err('doc')
  })), /*#__PURE__*/React.createElement(NInput, {
    label: "Telefone (WhatsApp) *",
    type: "tel",
    iconLeft: "phone",
    value: f.tel,
    onChange: set('tel', fmtTelBR),
    autoComplete: "tel-national",
    inputMode: "tel",
    placeholder: "(11) 99999-9999",
    error: err('tel')
  }), /*#__PURE__*/React.createElement(NInput, {
    label: "Endere\xE7o *",
    iconLeft: "map-pin",
    value: f.endereco,
    onChange: set('endereco'),
    autoComplete: "street-address",
    placeholder: "Rua, n\xFAmero, bairro, cidade - UF",
    error: err('endereco')
  }), erro ? /*#__PURE__*/React.createElement("div", {
    role: "alert",
    style: {
      padding: '10px 14px',
      borderRadius: 14,
      background: 'rgba(229,72,77,.08)',
      color: '#C2272D',
      fontSize: 14,
      fontWeight: 500
    }
  }, erro) : null, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    style: {
      display: 'none'
    },
    "aria-hidden": "true",
    tabIndex: -1
  })))), document.body);
}

// aviso na tela enquanto a outra clínica abre
function TrocaAviso() {
  var _useStore17 = useStore(TROCA),
    _useStore18 = _slicedToArray(_useStore17, 1),
    t = _useStore18[0];
  if (!t) return null;
  return ReactDOM.createPortal(/*#__PURE__*/React.createElement("div", {
    role: "status",
    "aria-live": "polite",
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 400,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      background: 'rgba(236,243,252,.66)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '16px 22px',
      borderRadius: 22,
      background: 'rgba(255,255,255,.96)',
      border: '1.5px solid #fff',
      boxShadow: '0 26px 50px -22px rgba(23,73,170,.6)',
      fontSize: 15,
      fontWeight: 500,
      color: 'var(--text-strong)',
      maxWidth: '100%'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      color: '#1F5EFF',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(SIcon, {
    name: "loader-circle",
    size: 20,
    style: {
      animation: 'sbgira 1s linear infinite'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, "Abrindo ", t.nome || 'a clínica', "..."), /*#__PURE__*/React.createElement("style", null, '@keyframes sbgira{to{transform:rotate(360deg)}}'))), document.body);
}
// seta de sair ao lado do avatar (topo) e logo abaixo dele (barra lateral)
function BotaoSair(_ref30) {
  var variante = _ref30.variante;
  var XIcBtn = window.SaluteProjetoDesigner_8b4683.IconButton;
  if (variante === 'lateral') return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: sair,
    title: "Sair",
    "aria-label": "Sair do sistema",
    style: {
      marginTop: 12,
      width: 44,
      height: 44,
      borderRadius: '50%',
      flexShrink: 0,
      border: '1.5px solid rgba(255,255,255,.95)',
      background: 'rgba(255,255,255,.82)',
      color: '#5A6B8C',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      boxShadow: '0 6px 16px -10px rgba(23,73,170,.35)',
      padding: 0
    },
    onMouseEnter: function onMouseEnter(e) {
      e.currentTarget.style.color = '#E5484D';
      e.currentTarget.style.background = '#fff';
    },
    onMouseLeave: function onMouseLeave(e) {
      e.currentTarget.style.color = '#5A6B8C';
      e.currentTarget.style.background = 'rgba(255,255,255,.82)';
    }
  }, /*#__PURE__*/React.createElement(SIcon, {
    name: "log-out",
    size: 18
  }));
  return /*#__PURE__*/React.createElement(XIcBtn, {
    icon: "log-out",
    label: "Sair",
    title: "Sair",
    variant: variante === 'compacto' ? 'glass' : 'ghost',
    size: "md",
    onClick: sair,
    style: {
      color: 'var(--text-strong)',
      flexShrink: 0
    }
  });
}

/* ---------- Porta de entrada: decide entre login, carregando e o sistema ---------- */
function PortaSupabase(_ref31) {
  var children = _ref31.children;
  var _useStore19 = useStore(SESSAO),
    _useStore20 = _slicedToArray(_useStore19, 1),
    s = _useStore20[0];
  useStore(LANG);
  // fora do sistema o endereço mostra a tela de entrar (guardando a tela pedida) ou o Painel Master
  React.useEffect(function () {
    if (!ROTAS_URL || !SB_ON) return;
    var fora = s.recuperar || ['login', 'sem-clinica', 'bloqueado'].includes(s.estado);
    if (s.estado === 'master') {
      trocarUrl('master');
      return;
    }
    if (!fora) return;
    var c = caminhoAtual();
    if (c === 'login' || c === 'cadastro') return;
    var volta = ROTA_TELA[c] ? '?volta=' + c : '';
    try {
      history.replaceState({
        salute: 'login'
      }, '', (BASE_PATH || '') + '/login' + volta + (/access_token|error_description/.test(location.hash) ? location.hash : ''));
    } catch (e) {}
  }, [s.estado, s.recuperar]);
  if (!SB_ON || s.estado === 'pronto') return children;
  if (s.recuperar || s.estado === 'login' || s.estado === 'sem-clinica') return /*#__PURE__*/React.createElement(TelaAcesso, null);
  if (s.estado === 'master') return /*#__PURE__*/React.createElement(PainelMaster, null);
  if (s.estado === 'erro') {
    var _window$SaluteProjeto6 = window.SaluteProjetoDesigner_8b4683,
      PEmpty = _window$SaluteProjeto6.EmptyState,
      PBtn = _window$SaluteProjeto6.Button;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        fontFamily: 'var(--font-sans)'
      }
    }, /*#__PURE__*/React.createElement(PEmpty, {
      icon: "cloud-off",
      title: "N\xE3o foi poss\xEDvel conectar ao banco",
      description: s.erro,
      action: /*#__PURE__*/React.createElement("div", {
        style: {
          display: 'flex',
          gap: 10,
          justifyContent: 'center'
        }
      }, /*#__PURE__*/React.createElement(PBtn, {
        iconLeft: "refresh-cw",
        onClick: carregarContexto
      }, "Tentar de novo"), /*#__PURE__*/React.createElement(PBtn, {
        variant: "secondary",
        onClick: sair
      }, "Sair")),
      style: {
        maxWidth: 440
      }
    }));
  }
  if (s.estado === 'bloqueado') {
    var _window$SaluteProjeto7 = window.SaluteProjetoDesigner_8b4683,
      _PEmpty = _window$SaluteProjeto7.EmptyState,
      _PBtn = _window$SaluteProjeto7.Button;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        fontFamily: 'var(--font-sans)'
      }
    }, /*#__PURE__*/React.createElement(_PEmpty, {
      icon: "lock",
      title: "Seu acesso est\xE1 pausado",
      description: "O acesso deste login \xE0 cl\xEDnica foi bloqueado. Fale com o dono da cl\xEDnica ou com o suporte da Salute para liberar de novo.",
      action: /*#__PURE__*/React.createElement(_PBtn, {
        variant: "secondary",
        iconLeft: "log-out",
        onClick: sair
      }, "Sair"),
      style: {
        maxWidth: 440
      }
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      fontFamily: 'var(--font-sans)',
      color: 'var(--text-muted)',
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement(SIcon, {
    name: "loader-circle",
    size: 20,
    style: {
      animation: 'sbgira 1s linear infinite'
    }
  }), "Abrindo a cl\xEDnica...", /*#__PURE__*/React.createElement("style", null, '@keyframes sbgira{to{transform:rotate(360deg)}}'));
}
Object.assign(window, {
  SB: SB,
  SB_ON: SB_ON,
  SB_CFG: SB_CFG,
  SESSAO: SESSAO,
  CLI: CLI,
  UID: UID,
  DB: DB,
  ARQ: ARQ,
  useArqUrl: useArqUrl,
  tempoReal: tempoReal,
  CARGAS: CARGAS,
  carregar: carregar,
  useCarga: useCarga,
  CargaEstado: CargaEstado,
  BR: BR,
  ENUM: ENUM,
  ek: ek,
  el: el,
  DBID: DBID,
  CAT: CAT,
  catSet: catSet,
  catId: catId,
  catNome: catNome,
  porNome: porNome,
  PREF: PREF,
  salvarPref: salvarPref,
  usePrefFiltro: usePrefFiltro,
  sair: sair,
  trocarClinica: trocarClinica,
  carregarContexto: carregarContexto,
  PortaSupabase: PortaSupabase,
  AvisoDemo: AvisoDemo,
  AvisoGravacao: AvisoGravacao,
  avisoErro: avisoErro,
  avisoOk: avisoOk,
  bg: bg,
  SALVA: SALVA,
  suporteEntrar: suporteEntrar,
  suporteVoltar: suporteVoltar,
  PainelMaster: PainelMaster,
  AvisoSuporte: AvisoSuporte,
  SemAcesso: SemAcesso,
  ContaMenu: ContaMenu,
  BotaoSair: BotaoSair,
  abrirConta: abrirConta,
  fecharConta: fecharConta,
  CONTA: CONTA,
  ABA_CONFIG: ABA_CONFIG,
  TelaAcesso: TelaAcesso,
  partesEndereco: partesEndereco,
  cpfValido: cpfValido,
  cnpjValido: cnpjValido,
  fmtCNPJ: fmtCNPJ,
  fmtCPF: fmtCPF,
  fmtTelBR: fmtTelBR,
  TROCA: TROCA,
  NOVA_CLI: NOVA_CLI,
  abrirNovaClinica: abrirNovaClinica,
  NovaClinicaDialog: NovaClinicaDialog,
  TrocaAviso: TrocaAviso,
  BASE_PATH: BASE_PATH,
  ROTAS_URL: ROTAS_URL,
  ROTA_TELA: ROTA_TELA,
  urlApp: urlApp,
  voltaAuth: voltaAuth,
  caminhoAtual: caminhoAtual,
  caminhoDaTela: caminhoDaTela,
  trocarUrl: trocarUrl,
  rotaInicialUrl: rotaInicialUrl,
  SincronizaUrl: SincronizaUrl
});