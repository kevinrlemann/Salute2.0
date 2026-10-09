"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
   RENATA IA no modo conectado (Supabase)
   A Renata lê só os dados da clínica ativa, que vêm do banco com a
   segurança de cada tabela. A conversa com o Claude e a voz passam pela
   função "renata" do servidor; as chaves nunca chegam ao navegador.
   Cada pergunta e resposta e cada lançamento confirmado ficam gravados.
   ===================================================================== */
var RN_DIAS_SEMANA = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
function rnHojeTxt() {
  return RN_DIAS_SEMANA[TODAY.getDay()] + ', ' + dBR(TODAY_ISO);
}
function rnQuem() {
  if (!SB_ON) return 'a Dra. Camila Rocha, administradora da clínica';
  var p = SESSAO.v.perfil || {};
  return [[p.tratamento, nomeCompleto()].filter(Boolean).join(' '), papelTela()].filter(Boolean).join(', ') + ' da clínica';
}
function rnPrimeiroNome() {
  return String((SESSAO.v.perfil || {}).nome || '').split(' ')[0] || 'tudo bem';
}

/* ---------- chamada à função do servidor ---------- */
function rnFn(_x, _x2) {
  return _rnFn.apply(this, arguments);
}
function _rnFn() {
  _rnFn = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(body, signal) {
    var _yield$SB$auth$getSes, data, tok, form;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.n) {
        case 0:
          _context6.n = 1;
          return SB.auth.getSession();
        case 1:
          _yield$SB$auth$getSes = _context6.v;
          data = _yield$SB$auth$getSes.data;
          tok = data && data.session ? data.session.access_token : SB_CFG.key;
          form = typeof FormData !== 'undefined' && body instanceof FormData;
          return _context6.a(2, sbFetch(SB_CFG.url + '/functions/v1/renata', {
            method: 'POST',
            signal: signal,
            headers: _objectSpread({
              Authorization: 'Bearer ' + tok,
              apikey: SB_CFG.key
            }, form ? {} : {
              'content-type': 'application/json'
            }),
            body: form ? body : JSON.stringify(_objectSpread({
              clinica_id: CLI()
            }, body))
          }));
      }
    }, _callee5);
  }));
  return _rnFn.apply(this, arguments);
}
var RN_STATUS_OK = false;
function rnStatusServidor() {
  return _rnStatusServidor.apply(this, arguments);
}
function _rnStatusServidor() {
  _rnStatusServidor = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
    var j, r, voz, _t5;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          j = {};
          _context7.p = 1;
          _context7.n = 2;
          return rnFn({
            acao: 'status'
          });
        case 2:
          r = _context7.v;
          if (!r.ok) {
            _context7.n = 4;
            break;
          }
          _context7.n = 3;
          return r.json();
        case 3:
          j = _context7.v;
          RN_STATUS_OK = true;
        case 4:
          _context7.n = 6;
          break;
        case 5:
          _context7.p = 5;
          _t5 = _context7.v;
          console.warn('[renata] função do servidor indisponível', _t5);
        case 6:
          voz = CAT.v.voz || {};
          RN_AI.v = {
            key: j.claude ? SENHA_GUARDADA : ''
          };
          avisar(RN_AI);
          RN_VOICE.v = {
            key: j.voz ? SENHA_GUARDADA : '',
            voiceId: voz.voice_id || RN_VOZ_OFICIAL,
            model: voz.modelo || 'eleven_flash_v2_5'
          };
          avisar(RN_VOICE);
          rnRefreshMode();
        case 7:
          return _context7.a(2);
      }
    }, _callee6, null, [[1, 5]]);
  }));
  return _rnStatusServidor.apply(this, arguments);
}
function rnTestarServidor(_x3) {
  return _rnTestarServidor.apply(this, arguments);
}
function _rnTestarServidor() {
  _rnTestarServidor = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(key) {
    var r, j, _t6;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.p = _context8.n) {
        case 0:
          _context8.p = 0;
          if (!(key && key !== SENHA_GUARDADA)) {
            _context8.n = 1;
            break;
          }
          _context8.n = 1;
          return DB.rpc('salvar_segredo', {
            p_clinica: CLI(),
            p_provedor: 'anthropic',
            p_segredo: key.trim()
          }, 'Não foi possível guardar a chave do Claude');
        case 1:
          _context8.n = 2;
          return rnFn({
            acao: 'testar'
          });
        case 2:
          r = _context8.v;
          _context8.n = 3;
          return r.json()["catch"](function () {
            return {};
          });
        case 3:
          j = _context8.v;
          _context8.n = 4;
          return rnStatusServidor();
        case 4:
          return _context8.a(2, j.ok ? {
            ok: true
          } : {
            ok: false,
            why: j.motivo || rnApiWhy(j.status || r.status)
          });
        case 5:
          _context8.p = 5;
          _t6 = _context8.v;
          return _context8.a(2, {
            ok: false,
            why: MSG_ERRO(_t6)
          });
      }
    }, _callee7, null, [[0, 5]]);
  }));
  return _rnTestarServidor.apply(this, arguments);
}
function rnSalvarConexoes(_x4, _x5) {
  return _rnSalvarConexoes.apply(this, arguments);
}
/* ---------- dados da clínica para a Renata ---------- */
function _rnSalvarConexoes() {
  _rnSalvarConexoes = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(k, f) {
    var segredo, voz, dados, row, _t7;
    return _regenerator().w(function (_context0) {
      while (1) switch (_context0.n) {
        case 0:
          segredo = /*#__PURE__*/function () {
            var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(prov, valor, antes) {
              return _regenerator().w(function (_context9) {
                while (1) switch (_context9.n) {
                  case 0:
                    if (!(valor && valor !== SENHA_GUARDADA)) {
                      _context9.n = 2;
                      break;
                    }
                    _context9.n = 1;
                    return DB.rpc('salvar_segredo', {
                      p_clinica: CLI(),
                      p_provedor: prov,
                      p_segredo: valor.trim()
                    }, 'Não foi possível guardar a chave');
                  case 1:
                    _context9.n = 3;
                    break;
                  case 2:
                    if (!(!valor && antes === SENHA_GUARDADA)) {
                      _context9.n = 3;
                      break;
                    }
                    _context9.n = 3;
                    return DB.rpc('salvar_segredo', {
                      p_clinica: CLI(),
                      p_provedor: prov,
                      p_segredo: null
                    }, 'Não foi possível remover a chave');
                  case 3:
                    return _context9.a(2);
                }
              }, _callee8);
            }));
            return function segredo(_x13, _x14, _x15) {
              return _ref7.apply(this, arguments);
            };
          }();
          _context0.n = 1;
          return segredo('anthropic', String(k || '').trim(), RN_AI.v.key);
        case 1:
          _context0.n = 2;
          return segredo('elevenlabs', String(f.key || '').trim(), RN_VOICE.v.key);
        case 2:
          voz = CAT.v.voz, dados = {
            voice_id: f.voiceId || RN_VOZ_OFICIAL,
            modelo: f.model || 'eleven_flash_v2_5'
          };
          if (!voz) {
            _context0.n = 4;
            break;
          }
          _context0.n = 3;
          return DB.upd('renata_voz', voz.id, dados, 'Não foi possível salvar a voz');
        case 3:
          _t7 = _context0.v;
          _context0.n = 6;
          break;
        case 4:
          _context0.n = 5;
          return DB.ins('renata_voz', dados, 'Não foi possível salvar a voz');
        case 5:
          _t7 = _context0.v;
        case 6:
          row = _t7;
          catSet({
            voz: row
          });
          _context0.n = 7;
          return rnStatusServidor();
        case 7:
          avisoOk('Conexões da Renata salvas');
        case 8:
          return _context0.a(2);
      }
    }, _callee9);
  }));
  return _rnSalvarConexoes.apply(this, arguments);
}
function rnPreencherClinica() {
  var c = CAT.v.clinica || {},
    g = CAT.v.config || {};
  var NOMES = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  var hs = [1, 2, 3, 4, 5, 6, 0].map(function (d) {
    var h = (CAT.v.horarios || []).find(function (x) {
      return x.dia_semana === d;
    });
    return NOMES[d] + ' ' + (h && h.aberto ? String(h.hora_inicio || '').slice(0, 5) + ' às ' + String(h.hora_fim || '').slice(0, 5) : 'fechado');
  });
  var formas = (CAT.v.formas || []).filter(function (f) {
    return f.aceita && f.ativo;
  }).map(function (f) {
    return f.chave === 'credito' && g.parcelas_maximas_credito > 1 ? f.nome.toLowerCase() + ' em até ' + g.parcelas_maximas_credito + ' vezes' : f.nome.toLowerCase();
  });
  substituirObj(RN_CLINICA, {
    fantasia: c.nome_fantasia || 'clínica',
    razao: c.razao_social || '',
    responsavel: c.responsavel_nome || '',
    cnpj: c.cnpj || '',
    email: c.email || '',
    telefone: BR.telTela(c.telefone),
    whatsapp: BR.telTela(c.whatsapp),
    endereco: [[c.logradouro, c.numero].filter(Boolean).join(', '), c.complemento, c.bairro, [c.cidade, c.uf].filter(Boolean).join('/'), c.cep ? 'CEP ' + c.cep : ''].filter(Boolean).join(', '),
    estrutura: [g.tem_estacionamento ? 'Estacionamento para pacientes' : null, g.tem_acessibilidade ? 'Acessibilidade (rampa e banheiro adaptado)' : null, g.tem_wifi_pacientes ? 'Wi-Fi para pacientes' : null].filter(Boolean),
    horarios: hs.join('; '),
    pagamentos: formas.join(', ')
  });
  var sug = CAT.v.renata && CAT.v.renata.sugestoes_iniciais || [];
  var ICONES = ['calendar-days', 'banknote', 'triangle-alert', 'package', 'chart-column', 'user-round'];
  if (sug.length) substituir(RN_SUGS, sug.slice(0, 6).map(function (t, i) {
    return [ICONES[i % ICONES.length], t];
  }));
}
// Pacientes recentes do Painel: os próximos atendimentos e os últimos feitos (mesma lista da tela)
function rnPacientesRecentesDB() {
  var ag = painelTela(PAINEL.v).agenda || [],
    agora = Date.now(),
    t = function t(a) {
      return new Date(a.inicio).getTime();
    };
  var quando = function quando(a) {
    var p = BR.partes(a.inicio);
    return String(p.dia).padStart(2, '0') + '/' + String(p.mes).padStart(2, '0') + ' ' + p.hm;
  };
  var item = function item(a) {
    return {
      nome: a.name,
      procedimento: a.proc,
      profissional: a.profNome,
      quando: quando(a),
      status: a.status
    };
  };
  return {
    proximos: ag.filter(function (a) {
      return t(a) >= agora;
    }).sort(function (a, b) {
      return t(a) - t(b);
    }).slice(0, 10).map(item),
    jaAtendidos: ag.filter(function (a) {
      return t(a) < agora;
    }).sort(function (a, b) {
      return t(b) - t(a);
    }).slice(0, 10).map(item)
  };
}
function rnPainelDB() {
  var D = painelTela(PAINEL.v),
    s = D.stats,
    tx = function tx(t) {
      return (t.direction === 'down' ? '-' : '+') + t.value + ' vs mês anterior';
    };
  var g = PAINEL.v && PAINEL.v.genero || {};
  var agora = Date.now(),
    prox = D.mesAtual ? (D.agenda || []).filter(function (a) {
      return new Date(a.inicio).getTime() >= agora;
    }).length : null;
  return {
    periodo: D.mesNome + (D.mesAtual ? ' (mês atual)' : ' (mês escolhido no Painel)'),
    regras: 'Antigo é o paciente que já fez algum procedimento até o fim do mês; novo ainda não fez. Retorno é o agendamento de quem já tinha feito procedimento antes daquele dia.',
    totalPacientes: {
      valor: +s[0].value,
      novos: s[0].breakdown[0].value,
      antigos: s[0].breakdown[1].value,
      variacao: tx(s[0].trend)
    },
    agendamentosMes: {
      valor: +s[1].value,
      novos: s[1].breakdown[0].value,
      retornos: s[1].breakdown[1].value,
      variacao: tx(s[1].trend),
      proximos30dias: prox
    },
    iaEconomizou: {
      horas: parseInt(s[2].value, 10),
      conversas: s[2].breakdown[0].value,
      agendamentosFeitosPelaIA: s[2].breakdown[1].value,
      variacao: tx(s[2].trend)
    },
    atendimentos: {
      total: D.atend,
      variacao: D.atendTrend + ' vs mês anterior'
    },
    genero: {
      pacientes: D.total,
      homens: g.masculino || 0,
      mulheres: g.feminino || 0,
      semInformacao: Math.max(0, D.total - (g.masculino || 0) - (g.feminino || 0))
    },
    atendimentosPorDiaDaSemana: D.week.map(function (w) {
      return {
        dia: w.label,
        atendimentos: w.value,
        agendados: w.target
      };
    }),
    funilDeVendas: D.funil.map(function (f) {
      return {
        etapa: f.label,
        leads: f.value
      };
    }),
    conversaoDoFunil: D.conv,
    tempoMedioNoFunil: D.diasMedios,
    leadsPorCanal: D.canais.map(function (c) {
      return {
        canal: c.label,
        leads: c.value,
        conversao: c.conv
      };
    }),
    atividadeMensal: D.mesNome + ': há agendamentos nos dias ' + D.mes.bold.join(', ') + '; hoje é dia ' + D.mes.today
  };
}
function rnContaDB(plan) {
  return {
    usuario: nomeCompleto() + ' (' + papelTela() + ')',
    plano: plan ? plan.nome + (plan.preco ? ' R$ ' + plan.preco + '/mês' : ' sob consulta') : 'sem plano',
    mensagensIAEsteMes: consumoMes().toLocaleString('pt-BR') + ' de ' + PLAN_LIMIT.toLocaleString('pt-BR'),
    proximaCobranca: proxCobranca(),
    idioma: LANG.v,
    somNovaMensagem: SOUND.v.on ? 'ligado (' + SOUND.v.tone + ')' : 'desligado'
  };
}
// agenda de um dia com os horários reais
function rnAgendaDB(iso) {
  var d = new Date(iso + 'T00:00:00');
  var itens = APPT_STORE.v.filter(function (a) {
    return a.date === iso && a.status !== 'cancelado';
  }).sort(function (a, b) {
    return String(a.ini).localeCompare(String(b.ini));
  }).map(function (a) {
    var pr = PROS.find(function (p) {
      return p.id === a.profId;
    }) || {};
    return {
      inicio: a.h + a.m / 60,
      horario: BR.hm(a.ini) + ' às ' + BR.hm(a.fim),
      paciente: a.pac,
      procedimento: a.proc || undefined,
      profissional: pr.n || '',
      especialidade: pr.r || '',
      status: a.status || undefined
    };
  });
  var h = (CAT.v.horarios || []).find(function (x) {
    return x.dia_semana === d.getDay();
  });
  return {
    data: dBR(iso),
    diaSemana: RN_DIAS_SEMANA[d.getDay()],
    fechado: h ? !h.aberto : false,
    total: itens.length,
    agendamentos: itens
  };
}
// ficha do paciente com o prontuário do banco; a leitura fica registrada na auditoria (LGPD)
function rnPacienteDB(_x6) {
  return _rnPacienteDB.apply(this, arguments);
}
function _rnPacienteDB() {
  _rnPacienteDB = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(nome) {
    var base, p, _yield$Promise$all, _yield$Promise$all2, pr, hist;
    return _regenerator().w(function (_context1) {
      while (1) switch (_context1.n) {
        case 0:
          base = rnPaciente(nome);
          p = base && base.nome ? PAC.find(function (x) {
            return x.nome === base.nome && x.dbId;
          }) : null;
          if (p) {
            _context1.n = 1;
            break;
          }
          return _context1.a(2, base);
        case 1:
          _context1.n = 2;
          return Promise.all([ProntSvc.carregar(p), PacSvc.historico(p)]);
        case 2:
          _yield$Promise$all = _context1.v;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
          pr = _yield$Promise$all2[0];
          hist = _yield$Promise$all2[1];
          SB.rpc('registrar_leitura', {
            p_clinica: CLI(),
            p_tabela: 'pacientes',
            p_registro: p.dbId,
            p_motivo: 'Consulta pela Renata IA'
          }).then(function () {});
          return _context1.a(2, _objectSpread(_objectSpread({}, base), {}, {
            numeroProntuario: p.numero,
            prontuario: pr.recs.filter(function (r) {
              return r.kind !== 'doc';
            }).map(function (r) {
              return {
                tipo: r.kind,
                data: r.date,
                titulo: r.title,
                status: r.status,
                observacoes: r.obs || undefined,
                profissional: r.pro || undefined,
                materiais: r.mats,
                pontos: r.points ? r.points.length : undefined,
                respostasAnamnese: r.answers
              };
            }),
            documentos: pr.docs.filter(function (d) {
              return d.type !== 'compare';
            }).map(function (d) {
              return {
                nome: d.name,
                pasta: d.folder,
                data: d.date
              };
            }),
            historico: hist.map(function (h) {
              return h.d + ' ' + h.t + (h.s ? ' (' + h.s + ')' : '');
            }),
            proximosAgendamentos: APPT_STORE.v.filter(function (a) {
              return a.pacId === p.dbId && a.date >= TODAY_ISO && a.status !== 'cancelado';
            }).sort(function (a, b) {
              return String(a.ini).localeCompare(String(b.ini));
            }).slice(0, 5).map(function (a) {
              return dBR(a.date) + ' às ' + BR.hm(a.ini) + (a.proc ? ' (' + a.proc + ')' : '');
            })
          }));
      }
    }, _callee0);
  }));
  return _rnPacienteDB.apply(this, arguments);
}
var RN_PREP = null;
function rnPrepararDados() {
  if (!RN_PREP) RN_PREP = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return Promise.all(['catalogos', 'pacientes', 'agenda', 'financeiro', 'estoque', 'clinica', 'painel', 'conteudo', 'equipe', 'mensagens', 'anamnese'].map(function (n) {
            return carregar(n);
          }));
        case 1:
          rnPreencherClinica();
          if (RN_STATUS_OK) {
            _context.n = 2;
            break;
          }
          _context.n = 2;
          return rnStatusServidor();
        case 2:
          return _context.a(2);
      }
    }, _callee);
  }))()["catch"](function (e) {
    RN_PREP = null;
    console.error('[renata]', e);
  });
  return RN_PREP;
}
// sem IA ligada: diz isso com clareza e ainda prepara lançamentos
function rnSemIA(_x7, _x8, _x9, _x0, _x1) {
  return _rnSemIA.apply(this, arguments);
}
/* ---------- conversa gravada (cada usuário só vê a própria) ---------- */
function _rnSemIA() {
  _rnSemIA = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(question, voice, onText, signal, why) {
    var lc, la, t;
    return _regenerator().w(function (_context10) {
      while (1) switch (_context10.n) {
        case 0:
          lc = window.rnComandoLocal ? rnComandoLocal(question) : null;
          if (!lc) {
            _context10.n = 3;
            break;
          }
          if (!voice) {
            _context10.n = 1;
            break;
          }
          onText(lc);
          _context10.n = 2;
          break;
        case 1:
          _context10.n = 2;
          return rnStream(lc, onText, signal);
        case 2:
          return _context10.a(2, {
            text: lc,
            mode: 'acao'
          });
        case 3:
          la = rnLocalAction(question);
          if (!la) {
            _context10.n = 6;
            break;
          }
          if (!voice) {
            _context10.n = 4;
            break;
          }
          onText(la.text);
          _context10.n = 5;
          break;
        case 4:
          _context10.n = 5;
          return rnStream(la.text, onText, signal);
        case 5:
          return _context10.a(2, {
            text: la.text,
            mode: 'demo'
          });
        case 6:
          t = why ? "N\xE3o consegui falar com a IA agora (".concat(why, "). Tente de novo em instantes.") : 'A Renata ainda não está ligada à IA nesta clínica. Em **Conexões da Renata**, aqui no chat, o dono ou gestor salva a chave do Claude. Enquanto isso, já consigo preparar lançamentos no financeiro e no estoque para você confirmar.';
          if (!voice) {
            _context10.n = 7;
            break;
          }
          onText(rnPlain(t));
          _context10.n = 8;
          break;
        case 7:
          _context10.n = 8;
          return rnStream(t, onText, signal);
        case 8:
          return _context10.a(2, {
            text: t,
            mode: 'demo'
          });
      }
    }, _callee1);
  }));
  return _rnSemIA.apply(this, arguments);
}
var RN_CONV = null,
  RN_CONV_P = null;
function rnConversa(titulo) {
  if (RN_CONV) return Promise.resolve(RN_CONV);
  if (!RN_CONV_P) RN_CONV_P = SB.from('renata_conversas').insert({
    clinica_id: CLI(),
    titulo: String(titulo || 'Conversa').slice(0, 80)
  }).select('id').single().then(function (_ref2) {
    var data = _ref2.data,
      error = _ref2.error;
    if (error) throw error;
    RN_CONV = data.id;
    return RN_CONV;
  })["finally"](function () {
    RN_CONV_P = null;
  });
  return RN_CONV_P;
}
function rnRegistrar(q, r, voz, msgId, interrompida) {
  var idR = novoId();
  _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
    var cid, modo, _yield$SB$from$insert, error;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          _context2.n = 1;
          return rnConversa(q);
        case 1:
          cid = _context2.v;
          modo = r && r.mode;
          _context2.n = 2;
          return SB.from('renata_mensagens').insert([{
            id: novoId(),
            clinica_id: CLI(),
            renata_conversa_id: cid,
            papel: 'usuario',
            conteudo: q,
            modo_resposta: null,
            erro: false,
            interrompida: false,
            ferramentas_usadas: null,
            modelo: null,
            via_voz: !!voz
          }, {
            id: idR,
            clinica_id: CLI(),
            renata_conversa_id: cid,
            papel: 'renata',
            conteudo: r && r.text || '',
            modo_resposta: modo === 'interrompida' ? null : modo,
            erro: modo === 'erro',
            interrompida: !!interrompida,
            ferramentas_usadas: r && r.ferramentas && r.ferramentas.length ? Array.from(new Set(r.ferramentas)) : null,
            modelo: modo === 'api' ? voz ? RN_MODELS.voz[0] : RN_MODELS.chat[0] : null,
            via_voz: !!voz
          }]);
        case 2:
          _yield$SB$from$insert = _context2.v;
          error = _yield$SB$from$insert.error;
          if (!error) {
            _context2.n = 3;
            break;
          }
          throw error;
        case 3:
          if (msgId !== undefined) {
            RN_STORE.v = _objectSpread(_objectSpread({}, RN_STORE.v), {}, {
              msgs: RN_STORE.v.msgs.map(function (m) {
                return m.id === msgId ? _objectSpread(_objectSpread({}, m), {}, {
                  dbId: idR
                }) : m;
              })
            });
            avisar(RN_STORE);
          }
        case 4:
          return _context2.a(2);
      }
    }, _callee2);
  }))()["catch"](function (e) {
    return console.error('[renata] conversa não gravada', e);
  });
}
function rnFeedback(m, valor) {
  if (!m || !m.dbId) return;
  SB.from('renata_mensagens').update({
    feedback: valor,
    feedback_em: valor ? agoraIso() : null
  }).eq('id', m.dbId).then(function (_ref4) {
    var error = _ref4.error;
    if (error) console.error('[renata]', error);
  });
}
function rnSubstituida(m) {
  if (!m || !m.dbId) return;
  SB.from('renata_mensagens').update({
    substituida: true
  }).eq('id', m.dbId).then(function () {});
}
function rnNovaConversa() {
  var id = RN_CONV;
  RN_CONV = null;
  if (id) SB.from('renata_conversas').update({
    encerrada_em: agoraIso()
  }).eq('id', id).then(function () {});
}
function rnRegistrarAcao(_x10, _x11, _x12) {
  return _rnRegistrarAcao.apply(this, arguments);
}
/* ---------- lançamentos confirmados: tela muda na hora, banco grava em seguida ---------- */
function _rnRegistrarAcao() {
  _rnRegistrarAcao = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(a, estado, id) {
    var cid;
    return _regenerator().w(function (_context11) {
      while (1) switch (_context11.n) {
        case 0:
          _context11.n = 1;
          return rnConversa(a.kind === 'cmd' ? 'Comando pela Renata' : 'Lançamento pela Renata')["catch"](function () {
            return null;
          });
        case 1:
          cid = _context11.v;
          return _context11.a(2, DB.ins('renata_acoes', {
            id: id || novoId(),
            renata_conversa_id: cid,
            tipo: a.kind === 'cmd' ? a.registro : a.kind === 'est' ? 'movimentacao_estoque' : 'lancamento_financeiro',
            estado: estado,
            resumo: rnPlain(rnResumo(a)),
            itens: a.kind === 'cmd' ? [a.dados || {}] : a.items,
            decidida_em: agoraIso(),
            decidida_por: UID()
          }, 'Não foi possível registrar a ação da Renata'));
      }
    }, _callee10);
  }));
  return _rnRegistrarAcao.apply(this, arguments);
}
function rnApplyDB(a) {
  var acaoId = novoId(),
    ia = {
      criado_por_ia: true,
      renata_acao_id: acaoId
    };
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
    avisar(PROD_STORE);
    var compras = a.items.filter(function (x) {
      return x.tipo === 'entrada' && x.valorTotal;
    }).map(function (x) {
      var id = novoId();
      return {
        id: id,
        dbId: id,
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
    });
    if (compras.length) {
      DESP_STORE.v = [].concat(_toConsumableArray(compras), _toConsumableArray(DESP_STORE.v));
      avisar(DESP_STORE);
    }
    bg(_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var gerados, _iterator, _step, _loop, _iterator2, _step2, c, _t, _t2;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.p = _context4.n) {
          case 0:
            _context4.n = 1;
            return rnRegistrarAcao(a, 'lancado', acaoId);
          case 1:
            gerados = [];
            _iterator = _createForOfIteratorHelper(a.items);
            _context4.p = 2;
            _loop = /*#__PURE__*/_regenerator().m(function _loop() {
              var x, p, r;
              return _regenerator().w(function (_context3) {
                while (1) switch (_context3.n) {
                  case 0:
                    x = _step.value;
                    p = PROD_STORE.v.find(function (q) {
                      return q.id === x.prodId;
                    }) || {};
                    _context3.n = 1;
                    return EstSvc.mover(_objectSpread(_objectSpread({}, p), {}, {
                      id: x.prodId,
                      dbId: x.prodId
                    }), x.tipo === 'saida' ? -x.quantidade : x.quantidade, _objectSpread(_objectSpread({}, ia), {}, {
                      motivo: 'Lançado pela Renata IA'
                    }));
                  case 1:
                    r = _context3.v;
                    gerados.push({
                      tabela: 'movimentacoes_estoque',
                      id: r.id
                    });
                  case 2:
                    return _context3.a(2);
                }
              }, _loop);
            });
            _iterator.s();
          case 3:
            if ((_step = _iterator.n()).done) {
              _context4.n = 5;
              break;
            }
            return _context4.d(_regeneratorValues(_loop()), 4);
          case 4:
            _context4.n = 3;
            break;
          case 5:
            _context4.n = 7;
            break;
          case 6:
            _context4.p = 6;
            _t = _context4.v;
            _iterator.e(_t);
          case 7:
            _context4.p = 7;
            _iterator.f();
            return _context4.f(7);
          case 8:
            _iterator2 = _createForOfIteratorHelper(compras);
            _context4.p = 9;
            _iterator2.s();
          case 10:
            if ((_step2 = _iterator2.n()).done) {
              _context4.n = 13;
              break;
            }
            c = _step2.value;
            _context4.n = 11;
            return FinSvc.criar('desp', c, _objectSpread(_objectSpread({}, ia), {}, {
              silencioso: true
            }));
          case 11:
            gerados.push({
              tabela: 'contas_pagar',
              id: c.id
            });
          case 12:
            _context4.n = 10;
            break;
          case 13:
            _context4.n = 15;
            break;
          case 14:
            _context4.p = 14;
            _t2 = _context4.v;
            _iterator2.e(_t2);
          case 15:
            _context4.p = 15;
            _iterator2.f();
            return _context4.f(15);
          case 16:
            _context4.n = 17;
            return SB.from('renata_acoes').update({
              registros_gerados: gerados
            }).eq('id', acaoId);
          case 17:
            return _context4.a(2);
        }
      }, _callee3, null, [[9, 14, 15, 16], [2, 6, 7, 8]]);
    }))(), function () {
      return carregar('estoque', true);
    });
    return 'Pronto! Estoque atualizado: ' + a.items.map(function (x) {
      return "**".concat(x.produto, "** agora tem ").concat(rnUnPl(x.para, x.un));
    }).join('; ') + '.';
  }
  var rec = a.items.filter(function (x) {
    return x.tipo === 'receita';
  }).map(function (x) {
    var id = novoId();
    return {
      id: id,
      dbId: id,
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
  });
  var des = a.items.filter(function (x) {
    return x.tipo === 'despesa';
  }).map(function (x) {
    var id = novoId();
    return {
      id: id,
      dbId: id,
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
  });
  if (rec.length) {
    REC_STORE.v = [].concat(_toConsumableArray(rec), _toConsumableArray(REC_STORE.v));
    avisar(REC_STORE);
  }
  if (des.length) {
    DESP_STORE.v = [].concat(_toConsumableArray(des), _toConsumableArray(DESP_STORE.v));
    avisar(DESP_STORE);
  }
  bg(_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
    var gerados, _iterator3, _step3, r, _iterator4, _step4, d, _t3, _t4;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          _context5.n = 1;
          return rnRegistrarAcao(a, 'lancado', acaoId);
        case 1:
          gerados = [];
          _iterator3 = _createForOfIteratorHelper(rec);
          _context5.p = 2;
          _iterator3.s();
        case 3:
          if ((_step3 = _iterator3.n()).done) {
            _context5.n = 6;
            break;
          }
          r = _step3.value;
          _context5.n = 4;
          return FinSvc.criar('rec', r, _objectSpread(_objectSpread({}, ia), {}, {
            silencioso: true
          }));
        case 4:
          gerados.push({
            tabela: 'contas_receber',
            id: r.id
          });
        case 5:
          _context5.n = 3;
          break;
        case 6:
          _context5.n = 8;
          break;
        case 7:
          _context5.p = 7;
          _t3 = _context5.v;
          _iterator3.e(_t3);
        case 8:
          _context5.p = 8;
          _iterator3.f();
          return _context5.f(8);
        case 9:
          _iterator4 = _createForOfIteratorHelper(des);
          _context5.p = 10;
          _iterator4.s();
        case 11:
          if ((_step4 = _iterator4.n()).done) {
            _context5.n = 14;
            break;
          }
          d = _step4.value;
          _context5.n = 12;
          return FinSvc.criar('desp', d, _objectSpread(_objectSpread({}, ia), {}, {
            silencioso: true
          }));
        case 12:
          gerados.push({
            tabela: 'contas_pagar',
            id: d.id
          });
        case 13:
          _context5.n = 11;
          break;
        case 14:
          _context5.n = 16;
          break;
        case 15:
          _context5.p = 15;
          _t4 = _context5.v;
          _iterator4.e(_t4);
        case 16:
          _context5.p = 16;
          _iterator4.f();
          return _context5.f(16);
        case 17:
          _context5.n = 18;
          return SB.from('renata_acoes').update({
            registros_gerados: gerados
          }).eq('id', acaoId);
        case 18:
          return _context5.a(2);
      }
    }, _callee4, null, [[10, 15, 16, 17], [2, 7, 8, 9]]);
  }))(), function () {
    return carregar('financeiro', true);
  });
  var ps = a.items.map(function (x) {
    return x.tipo === 'receita' ? "".concat(brl(x.valor), " ").concat(x.pago ? 'recebido' : 'a receber em ' + dBR(x.venc)) : "despesa ".concat(x.descricao, " de ").concat(brl(x.valor), " ").concat(x.pago ? 'paga' : 'a pagar em ' + dBR(x.venc));
  });
  return "Pronto! Lancei no financeiro: ".concat(ps.join(' e ')).concat(rec.length ? ', de ' + rec[0].pac : '', ".");
}

// quando a clínica abre, já descobre se a IA e a voz estão ligadas no servidor
if (SB_ON) {
  var iniciou = false;
  var ver = function ver() {
    if (SESSAO.v.estado === 'pronto' && !iniciou) {
      iniciou = true;
      carregar('catalogos').then(function () {
        rnPreencherClinica();
        return rnStatusServidor();
      });
    }
  };
  SESSAO.subs.add(ver);
  ver();
}
Object.assign(window, {
  rnFn: rnFn,
  rnStatusServidor: rnStatusServidor,
  rnTestarServidor: rnTestarServidor,
  rnSalvarConexoes: rnSalvarConexoes,
  rnPrepararDados: rnPrepararDados,
  rnPacienteDB: rnPacienteDB,
  rnAgendaDB: rnAgendaDB,
  rnPainelDB: rnPainelDB,
  rnPacientesRecentesDB: rnPacientesRecentesDB,
  rnContaDB: rnContaDB,
  rnApplyDB: rnApplyDB,
  rnRegistrar: rnRegistrar,
  rnFeedback: rnFeedback,
  rnSubstituida: rnSubstituida,
  rnRegistrarAcao: rnRegistrarAcao,
  rnNovaConversa: rnNovaConversa,
  rnSemIA: rnSemIA,
  rnHojeTxt: rnHojeTxt,
  rnQuem: rnQuem,
  rnPrimeiroNome: rnPrimeiroNome
});