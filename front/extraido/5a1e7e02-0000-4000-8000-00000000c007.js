"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/* =====================================================================
   SERVIÇOS DE DADOS: Configurações (Supabase)
   Clínica, equipe e acessos, profissionais, WhatsApp, som e os conteúdos
   da Salute (Saluteflix, Salute Cast, Parcerias e Certificações).
   ===================================================================== */
if (SB_ON) {
  TEAM_STORE.v = [];
  CAST_STORE.v = [];
  SELOS_STORE.v = [];
  WA_STORE.v = {
    status: 'off',
    modo: 'oficial',
    numero: '',
    desde: '',
    oficial: {
      phone: '',
      phoneId: '',
      waba: '',
      token: ''
    }
  };
}

/* ---------- Clínica ---------- */
CARGAS.clinica = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
  var r;
  return _regenerator().w(function (_context) {
    while (1) switch (_context.n) {
      case 0:
        _context.n = 1;
        return carregar('catalogos');
      case 1:
        _context.n = 2;
        return DB.ler(SB.from('clinicas').select('*').eq('id', CLI()));
      case 2:
        r = _context.v;
        catSet({
          clinica: r[0] || null
        });
      case 3:
        return _context.a(2);
    }
  }, _callee);
}));
var clinTela = function clinTela() {
  var c = CAT.v.clinica || {};
  return {
    fantasia: c.nome_fantasia || '',
    razao: c.razao_social || '',
    resp: c.responsavel_nome || '',
    cnpj: c.cnpj || '',
    cpf: c.cpf || '',
    email: c.email || '',
    tel: BR.telTela(c.telefone),
    whats: BR.telTela(c.whatsapp),
    cep: c.cep || '',
    end: c.logradouro || '',
    num: c.numero || '',
    comp: c.complemento || '',
    bairro: c.bairro || '',
    cidade: c.cidade || '',
    uf: c.uf || '',
    maps: c.link_google_maps || ''
  };
};
var estTela = function estTela() {
  var g = CAT.v.config || {};
  return {
    estac: !!g.tem_estacionamento,
    acess: !!g.tem_acessibilidade,
    wifi: !!g.tem_wifi_pacientes
  };
};
// DIAS começa na segunda; no banco 0 é domingo
var horTela = function horTela() {
  return DIAS.map(function (d, i) {
    var h = (CAT.v.horarios || []).find(function (x) {
      return x.dia_semana === (i + 1) % 7;
    });
    return {
      d: d,
      on: h ? !!h.aberto : false,
      a: h && h.hora_inicio ? h.hora_inicio.slice(0, 5) : '08:00',
      f: h && h.hora_fim ? h.hora_fim.slice(0, 5) : '18:00'
    };
  });
};
var pgTela = function pgTela() {
  return (CAT.v.formas || []).filter(function (f) {
    return f.aceita && f.ativo;
  }).map(function (f) {
    return f.nome;
  });
};
var parcTela = function parcTela() {
  return String((CAT.v.config || {}).parcelas_maximas_credito || 6);
};
var ClinSvc = {
  salvar: function salvar(_ref2) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var c, est, hor, pg, parc, tel, wpp, uf, n, cli, cfg, conf, hs, _loop, i, formas, _iterator, _step, f, aceita, patch, _t3, _t4, _t5, _t6;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            c = _ref2.c, est = _ref2.est, hor = _ref2.hor, pg = _ref2.pg, parc = _ref2.parc;
            tel = String(c.tel || '').trim(), wpp = String(c.whats || '').trim(), uf = String(c.uf || '').trim().toUpperCase();
            if (!(tel && !BR.tel(tel))) {
              _context3.n = 1;
              break;
            }
            avisoErro('Confira o telefone', 'Use DDD e número, por exemplo (19) 3863-4100.');
            throw new Error('telefone');
          case 1:
            if (!(wpp && !BR.tel(wpp))) {
              _context3.n = 2;
              break;
            }
            avisoErro('Confira o WhatsApp', 'Use DDD e número, por exemplo (19) 99800-4100.');
            throw new Error('whatsapp');
          case 2:
            if (!(uf && !/^[A-Z]{2}$/.test(uf))) {
              _context3.n = 3;
              break;
            }
            avisoErro('Confira o estado', 'Use a sigla com 2 letras, por exemplo SP.');
            throw new Error('uf');
          case 3:
            if (String(c.fantasia || '').trim()) {
              _context3.n = 4;
              break;
            }
            avisoErro('Falta o nome fantasia', 'É o nome que aparece para os pacientes.');
            throw new Error('nome');
          case 4:
            n = function n(v) {
              return String(v || '').trim() || null;
            };
            _context3.n = 5;
            return DB.gravar(SB.from('clinicas').update({
              nome_fantasia: c.fantasia.trim(),
              razao_social: n(c.razao),
              responsavel_nome: n(c.resp),
              cnpj: n(c.cnpj),
              cpf: n(c.cpf),
              email: n(c.email),
              telefone: BR.tel(tel),
              whatsapp: BR.tel(wpp),
              cep: n(c.cep),
              logradouro: n(c.end),
              numero: n(c.num),
              complemento: n(c.comp),
              bairro: n(c.bairro),
              cidade: n(c.cidade),
              uf: uf || null,
              link_google_maps: n(c.maps)
            }).eq('id', CLI()).select().single(), 'Não foi possível salvar os dados da clínica');
          case 5:
            cli = _context3.v;
            cfg = {
              tem_estacionamento: !!est.estac,
              tem_acessibilidade: !!est.acess,
              tem_wifi_pacientes: !!est.wifi,
              parcelas_maximas_credito: parseInt(parc, 10) || 1
            };
            if (!CAT.v.config) {
              _context3.n = 7;
              break;
            }
            _context3.n = 6;
            return DB.upd('configuracoes_clinica', CAT.v.config.id, cfg, 'Não foi possível salvar a estrutura da clínica');
          case 6:
            _t3 = _context3.v;
            _context3.n = 9;
            break;
          case 7:
            _context3.n = 8;
            return DB.ins('configuracoes_clinica', cfg, 'Não foi possível salvar a estrutura da clínica');
          case 8:
            _t3 = _context3.v;
          case 9:
            conf = _t3;
            // horários: um registro por dia da semana
            hs = [];
            _loop = /*#__PURE__*/_regenerator().m(function _loop() {
              var h, dia, ex, dados, _t, _t2;
              return _regenerator().w(function (_context2) {
                while (1) switch (_context2.n) {
                  case 0:
                    h = hor[i], dia = (i + 1) % 7, ex = (CAT.v.horarios || []).find(function (x) {
                      return x.dia_semana === dia;
                    });
                    dados = {
                      dia_semana: dia,
                      aberto: !!h.on,
                      hora_inicio: h.a || null,
                      hora_fim: h.f || null
                    };
                    _t = hs;
                    if (!ex) {
                      _context2.n = 2;
                      break;
                    }
                    _context2.n = 1;
                    return DB.upd('horarios_funcionamento', ex.id, dados, 'Não foi possível salvar os horários');
                  case 1:
                    _t2 = _context2.v;
                    _context2.n = 4;
                    break;
                  case 2:
                    _context2.n = 3;
                    return DB.ins('horarios_funcionamento', dados, 'Não foi possível salvar os horários');
                  case 3:
                    _t2 = _context2.v;
                  case 4:
                    _t.push.call(_t, _t2);
                  case 5:
                    return _context2.a(2);
                }
              }, _loop);
            });
            i = 0;
          case 10:
            if (!(i < hor.length)) {
              _context3.n = 12;
              break;
            }
            return _context3.d(_regeneratorValues(_loop()), 11);
          case 11:
            i++;
            _context3.n = 10;
            break;
          case 12:
            // formas de pagamento aceitas e parcelamento do crédito
            formas = [];
            _iterator = _createForOfIteratorHelper(CAT.v.formas || []);
            _context3.p = 13;
            _iterator.s();
          case 14:
            if ((_step = _iterator.n()).done) {
              _context3.n = 19;
              break;
            }
            f = _step.value;
            aceita = pg.includes(f.nome), patch = {};
            if (aceita !== f.aceita) patch.aceita = aceita;
            if (f.chave === 'credito' && f.parcelas_maximas !== cfg.parcelas_maximas_credito) patch.parcelas_maximas = cfg.parcelas_maximas_credito;
            _t4 = formas;
            if (!Object.keys(patch).length) {
              _context3.n = 16;
              break;
            }
            _context3.n = 15;
            return DB.upd('formas_pagamento', f.id, patch, 'Não foi possível salvar as formas de pagamento');
          case 15:
            _t5 = _context3.v;
            _context3.n = 17;
            break;
          case 16:
            _t5 = f;
          case 17:
            _t4.push.call(_t4, _t5);
          case 18:
            _context3.n = 14;
            break;
          case 19:
            _context3.n = 21;
            break;
          case 20:
            _context3.p = 20;
            _t6 = _context3.v;
            _iterator.e(_t6);
          case 21:
            _context3.p = 21;
            _iterator.f();
            return _context3.f(21);
          case 22:
            catSet({
              clinica: cli,
              config: conf,
              horarios: hs.sort(function (a, b) {
                return a.dia_semana - b.dia_semana;
              }),
              formas: formas
            });
            if (SESSAO.v.clinica) setSessao({
              clinica: _objectSpread(_objectSpread({}, SESSAO.v.clinica), {}, {
                nome: cli.nome_fantasia
              })
            });
            avisoOk('Dados da clínica salvos');
          case 23:
            return _context3.a(2);
        }
      }, _callee2, null, [[13, 20, 21, 22]]);
    }))();
  }
};

/* ---------- Equipe e acessos ---------- */
var PERM_TIMER = {};
var EquipeSvc = {
  // cada toque liga ou desliga um módulo; grava a lista completa depois de meio segundo sem mexer
  acessos: function acessos(u) {
    if (!u.dbId) return;
    clearTimeout(PERM_TIMER[u.dbId]);
    PERM_TIMER[u.dbId] = setTimeout(function () {
      var rows = allModuleIds().map(function (m) {
        return {
          clinica_id: CLI(),
          usuario_clinica_id: u.dbId,
          modulo: m,
          permitido: u.acc.includes(m)
        };
      });
      DB.gravar(SB.from('permissoes').upsert(rows, {
        onConflict: 'usuario_clinica_id,modulo'
      }).select('id'), 'Não foi possível salvar os acessos de ' + u.nome)["catch"](function () {
        return carregar('equipe', true);
      });
    }, 500);
  },
  convidar: function convidar(f) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var email, nome, cli, _yield$cli$auth$signI, error, _t7;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            email = f.email.trim().toLowerCase(), nome = f.nome.trim();
            _context4.n = 1;
            return DB.rpc('convidar_membro', {
              p_clinica: CLI(),
              p_email: email,
              p_nome: nome,
              p_funcao: f.funcao,
              p_papel: ek('papel', f.funcao) || 'recepcao',
              p_permitidos: FUNC_PRESET()[f.funcao] || [],
              p_todos: allModuleIds()
            }, 'Não foi possível convidar');
          case 1:
            _context4.n = 2;
            return carregar('equipe', true);
          case 2:
            _context4.p = 2;
            cli = window.supabase.createClient(SB_CFG.url, SB_CFG.key, {
              auth: {
                persistSession: false,
                autoRefreshToken: false,
                detectSessionInUrl: false,
                flowType: 'implicit',
                storageKey: 'salute02-convite'
              },
              global: {
                fetch: sbFetch
              }
            });
            _context4.n = 3;
            return cli.auth.signInWithOtp({
              email: email,
              options: {
                shouldCreateUser: true,
                emailRedirectTo: voltaAuth(),
                data: {
                  nome: nome.split(' ')[0],
                  sobrenome: nome.split(' ').slice(1).join(' '),
                  convite: true
                }
              }
            });
          case 3:
            _yield$cli$auth$signI = _context4.v;
            error = _yield$cli$auth$signI.error;
            if (!error) {
              _context4.n = 4;
              break;
            }
            throw error;
          case 4:
            avisoOk('Convite enviado', 'O link de acesso chegou no e-mail ' + email + '.');
            _context4.n = 6;
            break;
          case 5:
            _context4.p = 5;
            _t7 = _context4.v;
            avisoErro('Convite salvo, mas o e-mail não saiu', 'A pessoa pode entrar em "Recebi um convite" com o e-mail ' + email + '.');
          case 6:
            return _context4.a(2);
        }
      }, _callee3, null, [[2, 5]]);
    }))();
  }
};

/* ---------- Profissionais ---------- */
var PROF_SEL = 'id,nome,especialidade,registro_conselho,cor_agenda,foto_path,usuario_id,ordem,profissionais_procedimentos(procedimento_id,excluido_em)';
var ProfSvc = {
  salvar: function salvar(ed) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var existente, id, foto, dados, quer, tem, _iterator2, _step2, pid, entra, r, np, _t8;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            existente = !!ed.dbId, id = ed.dbId || novoId();
            foto = ed.fotoPath || null;
            if (!(ed.foto && /^data:/.test(ed.foto))) {
              _context5.n = 2;
              break;
            }
            _context5.n = 1;
            return ARQ.enviarDataUrl('clinica', 'profissionais', ed.foto, 'foto.jpg');
          case 1:
            foto = _context5.v;
          case 2:
            dados = {
              nome: ed.nome.trim(),
              especialidade: ed.esp || null,
              registro_conselho: ed.reg || null,
              cor_agenda: ed.cor || null,
              foto_path: foto
            };
            if (!existente) {
              _context5.n = 4;
              break;
            }
            _context5.n = 3;
            return DB.upd('profissionais', id, dados, 'Não foi possível salvar o profissional');
          case 3:
            _context5.n = 5;
            break;
          case 4:
            _context5.n = 5;
            return DB.ins('profissionais', _objectSpread(_objectSpread({
              id: id
            }, dados), {}, {
              ordem: (CAT.v.profissionais || []).length + 1
            }), 'Não foi possível cadastrar o profissional');
          case 5:
            quer = (ed.procs || []).map(function (n) {
              return catId('procedimentos', n);
            }).filter(Boolean);
            tem = existente ? ((CAT.v.profissionais || []).find(function (p) {
              return p.id === id;
            }) || {}).procs || [] : [];
            _iterator2 = _createForOfIteratorHelper(tem.filter(function (x) {
              return !quer.includes(x);
            }));
            _context5.p = 6;
            _iterator2.s();
          case 7:
            if ((_step2 = _iterator2.n()).done) {
              _context5.n = 9;
              break;
            }
            pid = _step2.value;
            _context5.n = 8;
            return DB.updWhere('profissionais_procedimentos', {
              excluido_em: agoraIso()
            }, {
              profissional_id: id,
              procedimento_id: pid,
              excluido_em: null
            }, 'Não foi possível atualizar os procedimentos');
          case 8:
            _context5.n = 7;
            break;
          case 9:
            _context5.n = 11;
            break;
          case 10:
            _context5.p = 10;
            _t8 = _context5.v;
            _iterator2.e(_t8);
          case 11:
            _context5.p = 11;
            _iterator2.f();
            return _context5.f(11);
          case 12:
            entra = quer.filter(function (x) {
              return !tem.includes(x);
            });
            if (!entra.length) {
              _context5.n = 13;
              break;
            }
            _context5.n = 13;
            return DB.ins('profissionais_procedimentos', entra.map(function (pid) {
              return {
                profissional_id: id,
                procedimento_id: pid
              };
            }), 'Não foi possível atualizar os procedimentos');
          case 13:
            _context5.n = 14;
            return DB.ler(DB.sel('profissionais', PROF_SEL).eq('id', id));
          case 14:
            r = _context5.v;
            np = _objectSpread(_objectSpread({}, r[0]), {}, {
              procs: (r[0].profissionais_procedimentos || []).filter(function (x) {
                return !x.excluido_em;
              }).map(function (x) {
                return x.procedimento_id;
              })
            });
            catSet({
              profissionais: existente ? CAT.v.profissionais.map(function (p) {
                return p.id === id ? np : p;
              }) : [].concat(_toConsumableArray(CAT.v.profissionais || []), [np])
            });
            hidratarCatalogos();
            hidratarMetas();
            avisoOk('Profissional salvo');
          case 15:
            return _context5.a(2);
        }
      }, _callee4, null, [[6, 10, 11, 12]]);
    }))();
  }
};

/* ---------- WhatsApp ---------- */
var waTela = function waTela() {
  var i = CAT.v.instancia;
  if (!i) return {
    status: 'off',
    modo: 'oficial',
    numero: '',
    desde: '',
    oficial: {
      phone: '',
      phoneId: '',
      waba: '',
      token: ''
    }
  };
  return {
    status: i.status === 'conectado' ? 'on' : 'off',
    modo: i.tipo_api === 'nao_oficial' ? 'naoOficial' : 'oficial',
    numero: BR.telTela(i.numero),
    desde: i.conectado_em ? BR.dataTela(BR.diaDe(i.conectado_em)) : '',
    oficial: {
      phone: i.tipo_api === 'oficial' ? BR.telTela(i.numero) : '',
      phoneId: i.phone_number_id || '',
      waba: i.waba_id || '',
      token: i.token_configurado ? SENHA_GUARDADA : ''
    }
  };
};
var CARGA_CATALOGOS_CFG = CARGAS.catalogos;
CARGAS.catalogos = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
  return _regenerator().w(function (_context6) {
    while (1) switch (_context6.n) {
      case 0:
        _context6.n = 1;
        return CARGA_CATALOGOS_CFG();
      case 1:
        WA_STORE.v = waTela();
        avisar(WA_STORE);
      case 2:
        return _context6.a(2);
    }
  }, _callee5);
}));
var WaSvc = {
  webhook: function webhook() {
    var i = CAT.v.instancia;
    return i && i.url_webhook || SB_CFG.url + '/functions/v1/whatsapp?clinica=' + CLI();
  },
  conectar: function conectar(m, numero, of) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      var i, tel, dados, row, r, _t9;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            i = CAT.v.instancia, tel = BR.tel(numero || '') || (i ? i.numero : null);
            dados = {
              nome: 'WhatsApp da clínica',
              tipo_api: m === 'oficial' ? 'oficial' : 'nao_oficial',
              status: 'conectado',
              conectado_em: agoraIso(),
              desconectado_em: null,
              numero: tel,
              phone_number_id: m === 'oficial' ? (of.phoneId || '').trim() || null : null,
              waba_id: m === 'oficial' ? (of.waba || '').trim() || null : null,
              url_webhook: WaSvc.webhook(),
              padrao: true
            };
            if (!i) {
              _context7.n = 2;
              break;
            }
            _context7.n = 1;
            return DB.upd('instancias_whatsapp', i.id, dados, 'Não foi possível conectar o WhatsApp');
          case 1:
            _t9 = _context7.v;
            _context7.n = 4;
            break;
          case 2:
            _context7.n = 3;
            return DB.ins('instancias_whatsapp', dados, 'Não foi possível conectar o WhatsApp');
          case 3:
            _t9 = _context7.v;
          case 4:
            row = _t9;
            if (!(m === 'oficial' && of.token && of.token !== SENHA_GUARDADA)) {
              _context7.n = 5;
              break;
            }
            _context7.n = 5;
            return DB.rpc('salvar_segredo', {
              p_clinica: CLI(),
              p_provedor: 'whatsapp_meta',
              p_segredo: of.token
            }, 'Não foi possível guardar o token');
          case 5:
            _context7.n = 6;
            return DB.ler(DB.sel('instancias_whatsapp').eq('id', row.id));
          case 6:
            r = _context7.v;
            catSet({
              instancia: r[0] || row
            });
            WA_STORE.v = waTela();
            avisar(WA_STORE);
            avisoOk('WhatsApp conectado');
          case 7:
            return _context7.a(2);
        }
      }, _callee6);
    }))();
  },
  desconectar: function desconectar() {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
      var i, row;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.n) {
          case 0:
            i = CAT.v.instancia;
            if (i) {
              _context8.n = 1;
              break;
            }
            return _context8.a(2);
          case 1:
            _context8.n = 2;
            return DB.upd('instancias_whatsapp', i.id, {
              status: 'desconectado',
              desconectado_em: agoraIso()
            }, 'Não foi possível desconectar');
          case 2:
            row = _context8.v;
            catSet({
              instancia: row
            });
          case 3:
            return _context8.a(2);
        }
      }, _callee7);
    }))();
  }
};

/* ---------- Conteúdo da Salute (vale para todas as clínicas) ---------- */
var FLIX_STORE = makeStore([]);
var PARC_STORE = makeStore([]);
var FLIX_CATS = [];
var ehAdmin = function ehAdmin() {
  return !!(SESSAO.v.perfil && SESSAO.v.perfil.admin_plataforma);
};
function soAdmin() {
  if (ehAdmin()) return true;
  avisoErro('Não foi possível publicar', 'Só a equipe da Salute publica conteúdo para todas as clínicas.');
  return false;
}
var glob = function glob(t, cols) {
  return SB.from(t).select(cols || '*').is('excluido_em', null);
};
var gravarGlobal = function gravarGlobal(q, titulo) {
  return DB.gravar(q, titulo || 'Não foi possível salvar');
};
CARGAS.conteudo = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
  var _yield$Promise$all, _yield$Promise$all2, cats, flix, prog, cast, parc, selos, pr, logos;
  return _regenerator().w(function (_context9) {
    while (1) switch (_context9.n) {
      case 0:
        _context9.n = 1;
        return Promise.all([DB.ler(glob('flix_categorias').order('ordem')), DB.ler(glob('flix_conteudos').eq('publicado', true).order('ordem')), DB.ler(SB.from('flix_progresso').select('conteudo_id,percentual').eq('usuario_id', UID()).is('excluido_em', null)), DB.ler(glob('cast_episodios').order('numero_episodio', {
          ascending: false
        })), DB.ler(glob('parceiros', '*, cupons:cupons_parceiros(codigo,ativo,excluido_em)').order('ordem')), DB.ler(glob('selos_certificacoes').order('ordem'))]);
      case 1:
        _yield$Promise$all = _context9.v;
        _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 6);
        cats = _yield$Promise$all2[0];
        flix = _yield$Promise$all2[1];
        prog = _yield$Promise$all2[2];
        cast = _yield$Promise$all2[3];
        parc = _yield$Promise$all2[4];
        selos = _yield$Promise$all2[5];
        FLIX_CATS = cats;
        pr = Object.fromEntries(prog.map(function (x) {
          return [x.conteudo_id, Math.round(Number(x.percentual))];
        }));
        FLIX_STORE.v = flix.map(function (c) {
          return {
            id: c.id,
            dbId: c.id,
            t: c.titulo,
            tipo: c.tipo === 'servico' ? 'Serviço' : 'Curso',
            cat: (cats.find(function (k) {
              return k.id === c.categoria_id;
            }) || {}).nome || 'Sistema',
            dur: c.duracao || '',
            aulas: c.quantidade_aulas || 0,
            prog: pr[c.id] || 0,
            g: c.cores_capa && c.cores_capa.length === 2 ? c.cores_capa : ['#0B4BEB', '#22C3F2'],
            ic: c.icone || (c.tipo === 'servico' ? 'briefcase-business' : 'graduation-cap'),
            destaque: c.destaque,
            link: c.url_video || c.url_contratacao || ''
          };
        });
        avisar(FLIX_STORE);
        CAST_STORE.v = cast.map(function (e) {
          return {
            id: e.id,
            dbId: e.id,
            ep: e.numero_episodio,
            t: e.titulo,
            conv: e.convidado || '',
            dur: e.duracao || '',
            data: e.data_publicacao,
            url: e.url_youtube || '',
            g: e.cores_capa && e.cores_capa.length === 2 ? e.cores_capa : ['#0B4BEB', '#7B4BC4']
          };
        });
        avisar(CAST_STORE);
        PARC_STORE.v = parc.map(function (p) {
          var cp = (p.cupons || []).find(function (x) {
            return x.ativo && !x.excluido_em;
          });
          return {
            id: p.id,
            dbId: p.id,
            nome: p.nome,
            cat: p.categoria,
            ben: p.beneficio || '',
            cupom: cp ? cp.codigo : '',
            site: p.site || '',
            of: !!p.oficial
          };
        });
        avisar(PARC_STORE);
        _context9.n = 2;
        return Promise.all(selos.map(function (s) {
          return ARQ.url('conteudos', s.logo_path);
        }));
      case 2:
        logos = _context9.v;
        SELOS_STORE.v = selos.map(function (s, i) {
          return {
            id: s.id,
            dbId: s.id,
            nome: s.nome,
            cat: s.categoria || '',
            desc: s.descricao || '',
            ic: s.icone || 'award',
            logo: logos[i] || null,
            logoPath: s.logo_path,
            pad: s.logo_espacamento || undefined
          };
        });
        avisar(SELOS_STORE);
      case 3:
        return _context9.a(2);
    }
  }, _callee8);
}));
var ContSvc = {
  flix: function flix(antes, depois) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
      var novos, _iterator3, _step3, _loop2, _t0;
      return _regenerator().w(function (_context1) {
        while (1) switch (_context1.p = _context1.n) {
          case 0:
            novos = depois.filter(function (x) {
              return !x.dbId;
            });
            if (!(novos.length && !soAdmin())) {
              _context1.n = 1;
              break;
            }
            return _context1.a(2);
          case 1:
            _iterator3 = _createForOfIteratorHelper(novos);
            _context1.p = 2;
            _loop2 = /*#__PURE__*/_regenerator().m(function _loop2() {
              var x, cat, id;
              return _regenerator().w(function (_context0) {
                while (1) switch (_context0.n) {
                  case 0:
                    x = _step3.value;
                    cat = FLIX_CATS.find(function (k) {
                      return k.nome === x.cat;
                    });
                    if (cat) {
                      _context0.n = 2;
                      break;
                    }
                    _context0.n = 1;
                    return gravarGlobal(SB.from('flix_categorias').insert({
                      nome: x.cat,
                      ordem: FLIX_CATS.length
                    }).select().single());
                  case 1:
                    cat = _context0.v;
                    FLIX_CATS.push(cat);
                  case 2:
                    id = novoId();
                    _context0.n = 3;
                    return gravarGlobal(SB.from('flix_conteudos').insert({
                      id: id,
                      titulo: x.t,
                      tipo: x.tipo === 'Serviço' ? 'servico' : 'curso',
                      categoria_id: cat.id,
                      quantidade_aulas: x.aulas || null,
                      duracao: x.dur,
                      cores_capa: x.g,
                      icone: x.ic,
                      url_video: x.tipo === 'Curso' ? x.link || null : null,
                      url_contratacao: x.tipo === 'Serviço' ? x.link || null : null,
                      ordem: depois.length
                    }), 'Não foi possível publicar');
                  case 3:
                    x.id = id;
                    x.dbId = id;
                  case 4:
                    return _context0.a(2);
                }
              }, _loop2);
            });
            _iterator3.s();
          case 3:
            if ((_step3 = _iterator3.n()).done) {
              _context1.n = 5;
              break;
            }
            return _context1.d(_regeneratorValues(_loop2()), 4);
          case 4:
            _context1.n = 3;
            break;
          case 5:
            _context1.n = 7;
            break;
          case 6:
            _context1.p = 6;
            _t0 = _context1.v;
            _iterator3.e(_t0);
          case 7:
            _context1.p = 7;
            _iterator3.f();
            return _context1.f(7);
          case 8:
            FLIX_STORE.v = depois;
            avisar(FLIX_STORE);
            if (novos.length) avisoOk('Conteúdo publicado', 'Já aparece para todas as clínicas.');
          case 9:
            return _context1.a(2);
        }
      }, _callee9, null, [[2, 6, 7, 8]]);
    }))();
  },
  parceiros: function parceiros(antes, depois) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
      var novos, _iterator4, _step4, x, id, _t1;
      return _regenerator().w(function (_context10) {
        while (1) switch (_context10.p = _context10.n) {
          case 0:
            novos = depois.filter(function (x) {
              return !x.dbId;
            });
            if (!(novos.length && !soAdmin())) {
              _context10.n = 1;
              break;
            }
            return _context10.a(2);
          case 1:
            _iterator4 = _createForOfIteratorHelper(novos);
            _context10.p = 2;
            _iterator4.s();
          case 3:
            if ((_step4 = _iterator4.n()).done) {
              _context10.n = 7;
              break;
            }
            x = _step4.value;
            id = novoId();
            _context10.n = 4;
            return gravarGlobal(SB.from('parceiros').insert({
              id: id,
              nome: x.nome,
              categoria: x.cat,
              beneficio: x.ben || null,
              site: x.site || null,
              oficial: !!x.of,
              ordem: depois.length
            }), 'Não foi possível salvar o parceiro');
          case 4:
            if (!x.cupom) {
              _context10.n = 5;
              break;
            }
            _context10.n = 5;
            return gravarGlobal(SB.from('cupons_parceiros').insert({
              parceiro_id: id,
              codigo: x.cupom
            }), 'Não foi possível salvar o cupom');
          case 5:
            x.id = id;
            x.dbId = id;
          case 6:
            _context10.n = 3;
            break;
          case 7:
            _context10.n = 9;
            break;
          case 8:
            _context10.p = 8;
            _t1 = _context10.v;
            _iterator4.e(_t1);
          case 9:
            _context10.p = 9;
            _iterator4.f();
            return _context10.f(9);
          case 10:
            PARC_STORE.v = depois;
            avisar(PARC_STORE);
            if (novos.length) avisoOk('Parceiro salvo');
          case 11:
            return _context10.a(2);
        }
      }, _callee0, null, [[2, 8, 9, 10]]);
    }))();
  },
  cast: function cast(antes, depois) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
      var novos, mudou, _iterator5, _step5, x, id, _iterator6, _step6, _x, _t10, _t11;
      return _regenerator().w(function (_context11) {
        while (1) switch (_context11.p = _context11.n) {
          case 0:
            novos = depois.filter(function (x) {
              return !x.dbId;
            });
            mudou = depois.filter(function (x) {
              return x.dbId && (antes.find(function (a) {
                return a.id === x.id;
              }) || {}).url !== x.url;
            });
            if (!((novos.length || mudou.length) && !soAdmin())) {
              _context11.n = 1;
              break;
            }
            return _context11.a(2);
          case 1:
            _iterator5 = _createForOfIteratorHelper(novos);
            _context11.p = 2;
            _iterator5.s();
          case 3:
            if ((_step5 = _iterator5.n()).done) {
              _context11.n = 6;
              break;
            }
            x = _step5.value;
            id = novoId();
            _context11.n = 4;
            return gravarGlobal(SB.from('cast_episodios').insert({
              id: id,
              numero_episodio: x.ep,
              titulo: x.t,
              convidado: x.conv || null,
              duracao: x.dur || null,
              data_publicacao: x.data,
              cores_capa: x.g,
              url_youtube: x.url || null
            }), 'Não foi possível publicar o episódio');
          case 4:
            x.id = id;
            x.dbId = id;
          case 5:
            _context11.n = 3;
            break;
          case 6:
            _context11.n = 8;
            break;
          case 7:
            _context11.p = 7;
            _t10 = _context11.v;
            _iterator5.e(_t10);
          case 8:
            _context11.p = 8;
            _iterator5.f();
            return _context11.f(8);
          case 9:
            _iterator6 = _createForOfIteratorHelper(mudou);
            _context11.p = 10;
            _iterator6.s();
          case 11:
            if ((_step6 = _iterator6.n()).done) {
              _context11.n = 13;
              break;
            }
            _x = _step6.value;
            _context11.n = 12;
            return gravarGlobal(SB.from('cast_episodios').update({
              url_youtube: _x.url || null
            }).eq('id', _x.dbId).select('id'), 'Não foi possível salvar o link');
          case 12:
            _context11.n = 11;
            break;
          case 13:
            _context11.n = 15;
            break;
          case 14:
            _context11.p = 14;
            _t11 = _context11.v;
            _iterator6.e(_t11);
          case 15:
            _context11.p = 15;
            _iterator6.f();
            return _context11.f(15);
          case 16:
            CAST_STORE.v = depois;
            avisar(CAST_STORE);
          case 17:
            return _context11.a(2);
        }
      }, _callee1, null, [[10, 14, 15, 16], [2, 7, 8, 9]]);
    }))();
  },
  selos: function selos(antes, depois) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
      var novos, logo, subir, _iterator7, _step7, x, id, path, _iterator8, _step8, _x3, _path, _t12, _t13;
      return _regenerator().w(function (_context13) {
        while (1) switch (_context13.p = _context13.n) {
          case 0:
            novos = depois.filter(function (x) {
              return !x.dbId;
            });
            logo = depois.filter(function (x) {
              return x.dbId && x.logo && /^data:/.test(x.logo) && (antes.find(function (a) {
                return a.id === x.id;
              }) || {}).logo !== x.logo;
            });
            if (!((novos.length || logo.length) && !soAdmin())) {
              _context13.n = 1;
              break;
            }
            return _context13.a(2);
          case 1:
            subir = /*#__PURE__*/function () {
              var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(x) {
                return _regenerator().w(function (_context12) {
                  while (1) switch (_context12.n) {
                    case 0:
                      return _context12.a(2, x.logo && /^data:/.test(x.logo) ? ARQ.enviarDataUrl('conteudos', 'selos', x.logo, 'logo.png') : null);
                  }
                }, _callee10);
              }));
              return function subir(_x2) {
                return _ref5.apply(this, arguments);
              };
            }();
            _iterator7 = _createForOfIteratorHelper(novos);
            _context13.p = 2;
            _iterator7.s();
          case 3:
            if ((_step7 = _iterator7.n()).done) {
              _context13.n = 7;
              break;
            }
            x = _step7.value;
            id = novoId();
            _context13.n = 4;
            return subir(x);
          case 4:
            path = _context13.v;
            _context13.n = 5;
            return gravarGlobal(SB.from('selos_certificacoes').insert({
              id: id,
              nome: x.nome,
              categoria: x.cat || null,
              descricao: x.desc || null,
              icone: x.ic || 'award',
              logo_path: path,
              ordem: depois.length
            }), 'Não foi possível salvar a certificação');
          case 5:
            x.id = id;
            x.dbId = id;
            x.logoPath = path;
          case 6:
            _context13.n = 3;
            break;
          case 7:
            _context13.n = 9;
            break;
          case 8:
            _context13.p = 8;
            _t12 = _context13.v;
            _iterator7.e(_t12);
          case 9:
            _context13.p = 9;
            _iterator7.f();
            return _context13.f(9);
          case 10:
            _iterator8 = _createForOfIteratorHelper(logo);
            _context13.p = 11;
            _iterator8.s();
          case 12:
            if ((_step8 = _iterator8.n()).done) {
              _context13.n = 16;
              break;
            }
            _x3 = _step8.value;
            _context13.n = 13;
            return subir(_x3);
          case 13:
            _path = _context13.v;
            _context13.n = 14;
            return gravarGlobal(SB.from('selos_certificacoes').update({
              logo_path: _path
            }).eq('id', _x3.dbId).select('id'), 'Não foi possível salvar o logo');
          case 14:
            _x3.logoPath = _path;
          case 15:
            _context13.n = 12;
            break;
          case 16:
            _context13.n = 18;
            break;
          case 17:
            _context13.p = 17;
            _t13 = _context13.v;
            _iterator8.e(_t13);
          case 18:
            _context13.p = 18;
            _iterator8.f();
            return _context13.f(18);
          case 19:
            SELOS_STORE.v = depois;
            avisar(SELOS_STORE);
          case 20:
            return _context13.a(2);
        }
      }, _callee11, null, [[11, 17, 18, 19], [2, 8, 9, 10]]);
    }))();
  }
};
Object.assign(window, {
  ClinSvc: ClinSvc,
  EquipeSvc: EquipeSvc,
  ProfSvc: ProfSvc,
  WaSvc: WaSvc,
  ContSvc: ContSvc,
  clinTela: clinTela,
  estTela: estTela,
  horTela: horTela,
  pgTela: pgTela,
  parcTela: parcTela,
  waTela: waTela,
  FLIX_STORE: FLIX_STORE,
  PARC_STORE: PARC_STORE,
  ehAdmin: ehAdmin
});