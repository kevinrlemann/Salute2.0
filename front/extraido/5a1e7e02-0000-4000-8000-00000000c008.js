"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/* =====================================================================
   SERVIÇOS DE DADOS: Minha conta (Supabase)
   Perfil, senha, plano da clínica, notificações e idioma do usuário.
   ===================================================================== */
var perfil = function perfil() {
  return SESSAO.v.perfil || {};
};
var nomeCompleto = function nomeCompleto() {
  return [perfil().nome, perfil().sobrenome].filter(Boolean).join(' ') || perfil().email || '';
};
var papelTela = function papelTela() {
  var c = SESSAO.v.clinica || {};
  return c.funcao || (c.dono ? 'Administradora' : el('papel', c.papel, 'Recepção'));
};
var cidadeClinica = function cidadeClinica() {
  var c = CAT.v.clinica || {};
  return [c.cidade, c.uf].filter(Boolean).join(', ');
};

// planos e assinatura vêm do banco
function hidratarPlanos() {
  if (!SB_ON) return;
  var pl = (CAT.v.planos || []).filter(function (p) {
    return p.ativo;
  });
  if (pl.length) substituir(PLANS, pl.map(function (p) {
    return {
      id: p.codigo,
      nome: p.nome,
      preco: p.preco_mensal === null || p.preco_mensal === undefined ? null : Number(p.preco_mensal),
      sub: p.descricao || '',
      destaque: !!p.destaque,
      itens: p.itens || [],
      limite: p.limite_mensagens_ia,
      anual: p.preco_anual === null || p.preco_anual === undefined ? null : Number(p.preco_anual),
      implantacao: p.preco_implantacao === null || p.preco_implantacao === undefined ? null : Number(p.preco_implantacao),
      usuarios: p.limite_usuarios,
      profissionais: p.limite_profissionais
    };
  }));
  var a = CAT.v.assinatura;
  PLAN_STORE.v = a && a.plano ? a.plano.codigo : (PLANS[0] || {}).id || 'inicial';
  avisar(PLAN_STORE);
  var atual = PLANS.find(function (p) {
    return p.id === PLAN_STORE.v;
  });
  if (atual && atual.limite) PLAN_LIMIT = atual.limite;
}
var CARGA_CATALOGOS_CONTA = CARGAS.catalogos;
CARGAS.catalogos = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
  var r;
  return _regenerator().w(function (_context) {
    while (1) switch (_context.n) {
      case 0:
        _context.n = 1;
        return CARGA_CATALOGOS_CONTA();
      case 1:
        if (CAT.v.clinica) {
          _context.n = 3;
          break;
        }
        _context.n = 2;
        return DB.ler(SB.from('clinicas').select('*').eq('id', CLI()))["catch"](function () {
          return [];
        });
      case 2:
        r = _context.v;
        if (r[0]) catSet({
          clinica: r[0]
        });
      case 3:
        hidratarPlanos();
        // valores adicionais (cobrados à parte acima do limite do plano)
        if (window.ADICIONAIS_STORE) SB.from('planos_adicionais').select('codigo,nome,descricao,preco,cobranca,quantidade,planos,ordem').eq('ativo', true).is('excluido_em', null).order('ordem').then(function (res) {
          if (res && !res.error && res.data && res.data.length) {
            ADICIONAIS_STORE.v = res.data.map(function (a) {
              return Object.assign({}, a, {
                preco: a.preco === null ? null : Number(a.preco)
              });
            });
            avisar(ADICIONAIS_STORE);
          }
        });
      case 4:
        return _context.a(2);
    }
  }, _callee);
}));
var consumoMes = function consumoMes() {
  var c = CAT.v.consumo,
    d = BR.partes();
  return c && c.ano === d.ano && c.mes === d.mes ? Number(c.mensagens_ia || 0) : 0;
};
var proxCobranca = function proxCobranca() {
  var a = CAT.v.assinatura;
  return a && a.proxima_cobranca ? BR.dataTela(a.proxima_cobranca) : 'a definir';
};
var diaRenova = function diaRenova() {
  var a = CAT.v.assinatura;
  return a && a.dia_renovacao || (a && a.proxima_cobranca ? +a.proxima_cobranca.slice(8, 10) : 10);
};
var ContaSvc = {
  salvarPerfil: function salvarPerfil(v) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var tel, row, email, aviso, _yield$SB$auth$update, error;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            tel = String(v.tel || '').trim();
            if (!(tel && !BR.tel(tel))) {
              _context2.n = 1;
              break;
            }
            avisoErro('Confira o telefone', 'Use DDD e número, por exemplo (19) 99800-4100.');
            throw new Error('telefone');
          case 1:
            if (String(v.nome || '').trim()) {
              _context2.n = 2;
              break;
            }
            avisoErro('Falta o nome', 'O nome aparece para a equipe e na saudação.');
            throw new Error('nome');
          case 2:
            _context2.n = 3;
            return DB.gravar(SB.from('perfis_usuario').update({
              nome: v.nome.trim(),
              sobrenome: String(v.sobrenome || '').trim() || null,
              telefone: BR.tel(tel)
            }).eq('id', UID()).select().single(), 'Não foi possível salvar seu perfil');
          case 3:
            row = _context2.v;
            email = String(v.email || '').trim().toLowerCase();
            aviso = null;
            if (!(email && email !== String(perfil().email || '').toLowerCase())) {
              _context2.n = 6;
              break;
            }
            _context2.n = 4;
            return SB.auth.updateUser({
              email: email
            }, {
              emailRedirectTo: voltaAuth()
            });
          case 4:
            _yield$SB$auth$update = _context2.v;
            error = _yield$SB$auth$update.error;
            if (!error) {
              _context2.n = 5;
              break;
            }
            avisoErro('Não foi possível trocar o e-mail', error);
            throw error;
          case 5:
            aviso = 'Enviamos um link para ' + email + '. O e-mail muda quando você confirmar.';
          case 6:
            setSessao({
              perfil: _objectSpread(_objectSpread({}, perfil()), row)
            });
            KIT_USER.name = nomeCompleto();
            if (typeof TEAM_STORE !== 'undefined') carregar('equipe', true);
            avisoOk('Perfil salvo', aviso || undefined);
          case 7:
            return _context2.a(2);
        }
      }, _callee2);
    }))();
  },
  foto: function foto(file) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var path, row, url;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            _context3.n = 1;
            return ARQ.enviar('clinica', 'usuarios/' + UID(), file);
          case 1:
            path = _context3.v;
            _context3.n = 2;
            return DB.gravar(SB.from('perfis_usuario').update({
              foto_path: path
            }).eq('id', UID()).select().single(), 'Não foi possível salvar a foto');
          case 2:
            row = _context3.v;
            _context3.n = 3;
            return ARQ.url('clinica', path);
          case 3:
            url = _context3.v;
            KIT_USER.avatar = url;
            setSessao({
              perfil: _objectSpread(_objectSpread({}, perfil()), row)
            });
            avisoOk('Foto atualizada');
          case 4:
            return _context3.a(2);
        }
      }, _callee3);
    }))();
  },
  // confere a senha atual antes de trocar
  trocarSenha: function trocarSenha(atual, nova) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var _yield$SB$auth$signIn, e1, _yield$SB$auth$update2, error;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            _context4.n = 1;
            return SB.auth.signInWithPassword({
              email: perfil().email,
              password: atual
            });
          case 1:
            _yield$SB$auth$signIn = _context4.v;
            e1 = _yield$SB$auth$signIn.error;
            if (!e1) {
              _context4.n = 2;
              break;
            }
            avisoErro('Senha atual incorreta', 'Confira a senha que você usa hoje para entrar.');
            throw e1;
          case 2:
            _context4.n = 3;
            return SB.auth.updateUser({
              password: nova,
              data: {
                senha_definida: true
              }
            });
          case 3:
            _yield$SB$auth$update2 = _context4.v;
            error = _yield$SB$auth$update2.error;
            if (!error) {
              _context4.n = 4;
              break;
            }
            avisoErro('Não foi possível trocar a senha', /should be|weak|length/i.test(error.message || '') ? 'A senha nova precisa ser mais forte.' : error);
            throw error;
          case 4:
            avisoOk('Senha alterada');
          case 5:
            return _context4.a(2);
        }
      }, _callee4);
    }))();
  },
  linkSenha: function linkSenha() {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var _yield$SB$auth$resetP, error;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            _context5.n = 1;
            return SB.auth.resetPasswordForEmail(perfil().email, {
              redirectTo: voltaAuth()
            });
          case 1:
            _yield$SB$auth$resetP = _context5.v;
            error = _yield$SB$auth$resetP.error;
            if (!error) {
              _context5.n = 2;
              break;
            }
            avisoErro('Não foi possível enviar o link', error);
            throw error;
          case 2:
            return _context5.a(2);
        }
      }, _callee5);
    }))();
  },
  doisFatores: function doisFatores(v) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      var row;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            _context6.n = 1;
            return DB.gravar(SB.from('perfis_usuario').update({
              dois_fatores_ativo: !!v
            }).eq('id', UID()).select().single(), 'Não foi possível salvar a verificação em duas etapas');
          case 1:
            row = _context6.v;
            setSessao({
              perfil: _objectSpread(_objectSpread({}, perfil()), row)
            });
          case 2:
            return _context6.a(2);
        }
      }, _callee6);
    }))();
  },
  trocarPlano: function trocarPlano(codigo) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
      var ass;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            _context7.n = 1;
            return DB.rpc('trocar_plano', {
              p_clinica: CLI(),
              p_codigo: codigo
            }, 'Não foi possível trocar o plano');
          case 1:
            _context7.n = 2;
            return DB.ler(DB.sel('assinaturas_clinica', '*, plano:planos(codigo,nome,limite_mensagens_ia,percentual_aviso_limite)'));
          case 2:
            ass = _context7.v;
            catSet({
              assinatura: ass[0] || null
            });
            hidratarPlanos();
          case 3:
            return _context7.a(2);
        }
      }, _callee7);
    }))();
  },
  consultor: function consultor(codigo) {
    return DB.rpc('pedir_consultor', {
      p_clinica: CLI(),
      p_codigo: codigo || 'enterprise'
    }, 'Não foi possível enviar o pedido');
  }
};
var notifTela = function notifTela() {
  var p = PREF.v || {};
  return {
    ag: p.notificar_novo_agendamento !== false,
    anam: p.notificar_anamnese_respondida !== false,
    est: p.notificar_estoque_minimo !== false,
    fin: !!p.notificar_pagamento_atrasado
  };
};
var salvarNotif = function salvarNotif(n) {
  return salvarPref({
    notificar_novo_agendamento: !!n.ag,
    notificar_anamnese_respondida: !!n.anam,
    notificar_estoque_minimo: !!n.est,
    notificar_pagamento_atrasado: !!n.fin
  });
};
Object.assign(window, {
  ContaSvc: ContaSvc,
  nomeCompleto: nomeCompleto,
  papelTela: papelTela,
  cidadeClinica: cidadeClinica,
  hidratarPlanos: hidratarPlanos,
  consumoMes: consumoMes,
  proxCobranca: proxCobranca,
  diaRenova: diaRenova,
  notifTela: notifTela,
  salvarNotif: salvarNotif
});