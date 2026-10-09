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
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/* =====================================================================
   SERVIÇOS DE DADOS: Mensagens (pacientes e equipe), CRM e notificações
   ===================================================================== */
var MSG_LISTA = makeStore(0);
var NOTIF = makeStore({
  naoLidas: 0
});
var MSG_CONV = {}; // id da conversa -> registro do banco
var MSG_LIDA = {}; // chave do chat -> carregado
if (SB_ON) {
  INBOX.length = 0;
  EQUIPE.length = 0;
  LEADS_STORE.v = [];
  CHAT_STORE.v = {};
}

// hora na lista de conversas, sempre no horário de Brasília
var horaLista = function horaLista(ts) {
  if (!ts) return '';
  var dia = BR.diaDe(ts);
  if (dia === TODAY_ISO) return BR.hm(ts);
  if (dia === isoOf(addD(TODAY, -1))) return 'Ontem';
  return BR.dataTela(dia);
};
var KIND_DB = {
  text: 'texto',
  image: 'imagem',
  video: 'video',
  audio: 'audio',
  file: 'documento',
  sticker: 'figurinha'
};
var KIND_UI = {
  texto: 'text',
  imagem: 'image',
  video: 'video',
  audio: 'audio',
  documento: 'file',
  figurinha: 'sticker',
  sistema: 'text'
};
var TICK = {
  pendente: 'sent',
  enviada: 'sent',
  entregue: 'delivered',
  lida: 'read',
  falhou: 'sent'
};
var ehUuid = function ehUuid(x) {
  return typeof x === 'string' && /^[0-9a-f-]{36}$/.test(x);
};
var figurinhaUrl = function figurinhaUrl(f) {
  return f ? waSticker(f.emoji || '✨', f.rotulo || '', f.cor_fundo || '#E7F0FF') : null;
};
var FIGS = [];

/* ---------- Listas de conversas ---------- */
var convTela = function convTela(c) {
  return {
    id: c.id,
    n: c.nome_contato || c.paciente && c.paciente.nome || BR.telTela(c.telefone),
    m: c.ultima_mensagem_previa || '',
    t: horaLista(c.ultima_mensagem_em),
    u: c.nao_lidas || 0,
    pacId: c.paciente_id,
    tel: c.telefone,
    leadId: c.lead_id,
    ia: c.ia_ativa,
    ord: c.ultima_mensagem_em || c.criado_em
  };
};
function publicarInbox(list) {
  substituir(INBOX, list.sort(function (a, b) {
    return String(b.ord).localeCompare(String(a.ord));
  }));
  MSG_LISTA.v = MSG_LISTA.v + 1;
  avisar(MSG_LISTA);
}
CARGAS.mensagens = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
  var _yield$Promise$all, _yield$Promise$all2, convs, canais, figs;
  return _regenerator().w(function (_context) {
    while (1) switch (_context.n) {
      case 0:
        _context.n = 1;
        return carregar('catalogos');
      case 1:
        _context.n = 2;
        return Promise.all([DB.ler(DB.sel('conversas', '*, paciente:pacientes(nome)').order('ultima_mensagem_em', {
          ascending: false,
          nullsFirst: false
        }).limit(1000)), DB.ler(DB.sel('canais_equipe', 'id,nome,tipo,funcao,criado_em,participantes:participantes_canal(usuario_id,ultima_leitura_em,excluido_em)').order('criado_em'))["catch"](function () {
          return [];
        }), DB.ler(SB.from('figurinhas').select('id,rotulo,emoji,cor_fundo,ordem,clinica_id').is('excluido_em', null).order('ordem'))["catch"](function () {
          return [];
        })]);
      case 2:
        _yield$Promise$all = _context.v;
        _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 3);
        convs = _yield$Promise$all2[0];
        canais = _yield$Promise$all2[1];
        figs = _yield$Promise$all2[2];
        FIGS = figs;
        convs.forEach(function (c) {
          MSG_CONV[c.id] = c;
        });
        publicarInbox(convs.map(convTela));
        _context.n = 3;
        return carregarCanais(canais);
      case 3:
        tempoReal('mensagens', ['mensagens', 'conversas', 'mensagens_equipe', 'reacoes_mensagem', 'canais_equipe'], aoMudarMensagens);
      case 4:
        return _context.a(2);
    }
  }, _callee);
}));
function carregarCanais(_x) {
  return _carregarCanais.apply(this, arguments);
}
/* ---------- Mensagens de um chat ---------- */
function _carregarCanais() {
  _carregarCanais = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(canais) {
    var ult, lista, _t3;
    return _regenerator().w(function (_context10) {
      while (1) switch (_context10.n) {
        case 0:
          if (!canais.length) {
            _context10.n = 2;
            break;
          }
          _context10.n = 1;
          return DB.ler(DB.sel('mensagens_equipe', 'canal_id,texto,tipo,enviada_em,autor_usuario_id,autor_nome,apagada').order('enviada_em', {
            ascending: false
          }).limit(2000))["catch"](function () {
            return [];
          });
        case 1:
          _t3 = _context10.v;
          _context10.n = 3;
          break;
        case 2:
          _t3 = [];
        case 3:
          ult = _t3;
          lista = canais.map(function (c) {
            var ms = ult.filter(function (m) {
              return m.canal_id === c.id;
            });
            var eu = (c.participantes || []).find(function (p) {
              return p.usuario_id === UID() && !p.excluido_em;
            });
            var lido = eu && eu.ultima_leitura_em ? new Date(eu.ultima_leitura_em) : null;
            var u = ms.filter(function (m) {
              return m.autor_usuario_id !== UID() && (!lido || new Date(m.enviada_em) > lido);
            }).length;
            var l = ms[0];
            var prev = l ? l.apagada ? 'Mensagem apagada' : (c.tipo === 'grupo' && l.autor_nome && l.autor_usuario_id !== UID() ? l.autor_nome + ': ' : '') + (l.texto || waPreview({
              kind: KIND_UI[l.tipo]
            })) : '';
            return {
              id: c.id,
              n: c.nome,
              r: c.funcao || (c.tipo === 'grupo' ? 'Grupo' : ''),
              m: prev,
              t: l ? horaLista(l.enviada_em) : '',
              u: u,
              grupo: c.tipo === 'grupo',
              ord: l ? l.enviada_em : c.criado_em
            };
          });
          substituir(EQUIPE, lista.sort(function (a, b) {
            return String(b.ord).localeCompare(String(a.ord));
          }));
          MSG_LISTA.v = MSG_LISTA.v + 1;
          avisar(MSG_LISTA);
        case 4:
          return _context10.a(2);
      }
    }, _callee10);
  }));
  return _carregarCanais.apply(this, arguments);
}
var chaveConv = function chaveConv(id) {
  return 'conv:' + id;
};
var idDaChave = function idDaChave(k) {
  return String(k).split(':')[1];
};
function msgTela(_x2, _x3) {
  return _msgTela.apply(this, arguments);
}
function _msgTela() {
  _msgTela = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(rows, equipe) {
    var paths, urls, _yield$SB$storage$fro, data, byId, out;
    return _regenerator().w(function (_context11) {
      while (1) switch (_context11.n) {
        case 0:
          paths = [];
          rows.forEach(function (r) {
            return (r.anexos || []).filter(function (a) {
              return !a.excluido_em;
            }).forEach(function (a) {
              return paths.push(a.arquivo_path);
            });
          });
          urls = {};
          if (!paths.length) {
            _context11.n = 2;
            break;
          }
          _context11.n = 1;
          return SB.storage.from('mensagens').createSignedUrls(paths, 3600);
        case 1:
          _yield$SB$storage$fro = _context11.v;
          data = _yield$SB$storage$fro.data;
          (data || []).forEach(function (u) {
            if (u.signedUrl) urls[u.path] = u.signedUrl;
          });
        case 2:
          byId = {};
          out = rows.map(function (r) {
            var an = (r.anexos || []).find(function (a) {
              return !a.excluido_em;
            });
            var kind = KIND_UI[r.tipo] || 'text';
            var fig = r.figurinha_id ? FIGS.find(function (f) {
              return f.id === r.figurinha_id;
            }) : null;
            var reacoes = (r.reacoes || []).filter(function (x) {
              return !x.excluido_em;
            }).sort(function (a, b) {
              return String(b.criado_em).localeCompare(String(a.criado_em));
            });
            var me = equipe ? r.autor_usuario_id === UID() : r.direcao === 'enviada';
            var m = {
              id: r.id,
              me: me,
              t: BR.hm(r.enviada_em),
              s: TICK[r.status_entrega] || 'read',
              kind: kind,
              text: kind === 'text' ? r.texto : r.legenda || r.texto || undefined,
              url: kind === 'sticker' ? figurinhaUrl(fig) : an ? urls[an.arquivo_path] : undefined,
              name: an ? an.nome_arquivo : undefined,
              size: an ? Number(an.tamanho_bytes || 0) : undefined,
              dur: an ? Number(an.duracao_segundos || 0) : undefined,
              label: fig ? fig.rotulo : undefined,
              react: reacoes[0] ? reacoes[0].emoji : null,
              deleted: !!r.apagada && r.apagada_para !== 'so_para_mim',
              ia: !!r.enviada_por_ia,
              who: equipe && !me && r.grupo ? r.autor_nome : undefined,
              replyId: r.resposta_a_mensagem_id
            };
            byId[r.id] = m;
            return m;
          }).filter(function (m, i) {
            return !(rows[i].apagada && rows[i].apagada_para === 'so_para_mim' && rows[i].apagada_por === UID());
          });
          out.forEach(function (m) {
            if (m.replyId && byId[m.replyId]) {
              var o = byId[m.replyId];
              m.reply = {
                id: o.id,
                me: o.me,
                prev: waPreview(o)
              };
            }
          });
          return _context11.a(2, out);
      }
    }, _callee11);
  }));
  return _msgTela.apply(this, arguments);
}
var SEL_MSG = 'id,direcao,tipo,texto,legenda,enviada_em,enviada_por_ia,status_entrega,resposta_a_mensagem_id,figurinha_id,apagada,apagada_para,apagada_por,anexos:anexos_mensagem(arquivo_path,nome_arquivo,mime_type,tamanho_bytes,duracao_segundos,excluido_em),reacoes:reacoes_mensagem(emoji,usuario_id,criado_em,excluido_em)';
var SEL_MSG_EQ = 'id,canal_id,autor_usuario_id,autor_nome,tipo,texto,legenda,enviada_em,resposta_a_mensagem_id,figurinha_id,apagada,apagada_para,anexos:anexos_mensagem(arquivo_path,nome_arquivo,mime_type,tamanho_bytes,duracao_segundos,excluido_em),reacoes:reacoes_mensagem(emoji,usuario_id,criado_em,excluido_em)';
function carregarChat(_x4) {
  return _carregarChat.apply(this, arguments);
}
function _carregarChat() {
  _carregarChat = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12(chave) {
    var _String$split3, _String$split4, tipo, id, lista, canal, rows, _rows;
    return _regenerator().w(function (_context12) {
      while (1) switch (_context12.n) {
        case 0:
          if (!(!SB_ON || !chave)) {
            _context12.n = 1;
            break;
          }
          return _context12.a(2);
        case 1:
          _String$split3 = String(chave).split(':'), _String$split4 = _slicedToArray(_String$split3, 2), tipo = _String$split4[0], id = _String$split4[1];
          if (!(tipo === 'pacc')) {
            _context12.n = 2;
            break;
          }
          CHAT_STORE.v = _objectSpread(_objectSpread({}, CHAT_STORE.v), {}, _defineProperty({}, chave, []));
          avisar(CHAT_STORE);
          return _context12.a(2);
        case 2:
          if (ehUuid(id)) {
            _context12.n = 3;
            break;
          }
          return _context12.a(2);
        case 3:
          if (!(tipo === 'eq')) {
            _context12.n = 6;
            break;
          }
          canal = EQUIPE.find(function (c) {
            return c.id === id;
          });
          _context12.n = 4;
          return DB.ler(DB.sel('mensagens_equipe', SEL_MSG_EQ).eq('canal_id', id).order('enviada_em').limit(1000));
        case 4:
          rows = _context12.v;
          _context12.n = 5;
          return msgTela(rows.map(function (r) {
            return _objectSpread(_objectSpread({}, r), {}, {
              grupo: canal && canal.grupo
            });
          }), true);
        case 5:
          lista = _context12.v;
          _context12.n = 9;
          break;
        case 6:
          _context12.n = 7;
          return DB.ler(DB.sel('mensagens', SEL_MSG).eq('conversa_id', id).order('enviada_em').limit(1000));
        case 7:
          _rows = _context12.v;
          _context12.n = 8;
          return msgTela(_rows, false);
        case 8:
          lista = _context12.v;
        case 9:
          MSG_LIDA[chave] = true;
          CHAT_STORE.v = _objectSpread(_objectSpread({}, CHAT_STORE.v), {}, _defineProperty({}, chave, lista));
          avisar(CHAT_STORE);
        case 10:
          return _context12.a(2);
      }
    }, _callee12);
  }));
  return _carregarChat.apply(this, arguments);
}
function abrirChat(chave) {
  if (!SB_ON || MSG_LIDA[chave]) return;
  MSG_LIDA[chave] = true;
  carregarChat(chave)["catch"](function () {
    delete MSG_LIDA[chave];
  });
}

/* ---------- Tempo real ---------- */
function aoMudarMensagens(_x5, _x6) {
  return _aoMudarMensagens.apply(this, arguments);
}
/* ---------- Ações ---------- */
function _aoMudarMensagens() {
  _aoMudarMensagens = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13(t, ev) {
    var n, o, pac, tela, ch, c, canais, id;
    return _regenerator().w(function (_context13) {
      while (1) switch (_context13.n) {
        case 0:
          n = ev["new"] || {}, o = ev.old || {};
          if (!(t === 'conversas')) {
            _context13.n = 1;
            break;
          }
          if (n.id) {
            MSG_CONV[n.id] = _objectSpread(_objectSpread({}, MSG_CONV[n.id] || {}), n);
            pac = n.paciente_id ? PAC.find(function (p) {
              return p.dbId === n.paciente_id;
            }) : null;
            tela = convTela(_objectSpread(_objectSpread({}, n), {}, {
              paciente: pac ? {
                nome: pac.nome
              } : null
            }));
            publicarInbox([].concat(_toConsumableArray(INBOX.filter(function (c) {
              return c.id !== n.id;
            })), [tela]).filter(function (c) {
              return !(MSG_CONV[c.id] || {}).excluido_em;
            }));
          }
          return _context13.a(2);
        case 1:
          if (!(t === 'mensagens')) {
            _context13.n = 3;
            break;
          }
          ch = chaveConv(n.conversa_id || o.conversa_id);
          if (!CHAT_STORE.v[ch]) {
            _context13.n = 2;
            break;
          }
          _context13.n = 2;
          return carregarChat(ch);
        case 2:
          if (ev.eventType === 'INSERT' && n.direcao === 'recebida') {
            c = INBOX.find(function (x) {
              return x.id === n.conversa_id;
            });
            notifyIncoming(c ? c.n : BR.telTela(MSG_CONV[n.conversa_id] && MSG_CONV[n.conversa_id].telefone), n.texto || waPreview({
              kind: KIND_UI[n.tipo]
            }));
          }
          return _context13.a(2);
        case 3:
          if (!(t === 'mensagens_equipe' || t === 'canais_equipe')) {
            _context13.n = 7;
            break;
          }
          _context13.n = 4;
          return DB.ler(DB.sel('canais_equipe', 'id,nome,tipo,funcao,criado_em,participantes:participantes_canal(usuario_id,ultima_leitura_em,excluido_em)').order('criado_em'))["catch"](function () {
            return null;
          });
        case 4:
          canais = _context13.v;
          if (!canais) {
            _context13.n = 5;
            break;
          }
          _context13.n = 5;
          return carregarCanais(canais);
        case 5:
          id = n.canal_id || o.canal_id;
          if (!(id && CHAT_STORE.v['eq:' + id])) {
            _context13.n = 6;
            break;
          }
          _context13.n = 6;
          return carregarChat('eq:' + id);
        case 6:
          if (t === 'mensagens_equipe' && ev.eventType === 'INSERT' && n.autor_usuario_id !== UID()) notifyIncoming(n.autor_nome || 'Equipe', n.texto || 'Nova mensagem');
          return _context13.a(2);
        case 7:
          if (t === 'reacoes_mensagem') {
            Object.keys(CHAT_STORE.v).forEach(function (k) {
              if (MSG_LIDA[k]) carregarChat(k);
            });
          }
        case 8:
          return _context13.a(2);
      }
    }, _callee13);
  }));
  return _aoMudarMensagens.apply(this, arguments);
}
var MsgSvc = {
  chavePaciente: function chavePaciente(p) {
    if (!p || !p.dbId) return null;
    var tel = BR.tel(p.tel);
    var c = INBOX.find(function (x) {
      return x.pacId === p.dbId;
    }) || (tel ? INBOX.find(function (x) {
      return x.tel === tel;
    }) : null);
    return c ? chaveConv(c.id) : 'pacc:' + p.dbId;
  },
  garantirConversaPaciente: function garantirConversaPaciente(p) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var k, tel, inst, r;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            k = MsgSvc.chavePaciente(p);
            if (!(k && k.startsWith('conv:'))) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2, idDaChave(k));
          case 1:
            tel = BR.tel(p.tel);
            if (tel) {
              _context2.n = 2;
              break;
            }
            throw new Error('Paciente sem WhatsApp cadastrado');
          case 2:
            inst = CAT.v.instancia;
            _context2.n = 3;
            return DB.ins('conversas', {
              telefone: tel,
              nome_contato: p.nome,
              paciente_id: p.dbId,
              instancia_whatsapp_id: inst ? inst.id : null
            }, 'Não foi possível abrir a conversa');
          case 3:
            r = _context2.v;
            MSG_CONV[r.id] = r;
            publicarInbox([].concat(_toConsumableArray(INBOX), [convTela(_objectSpread(_objectSpread({}, r), {}, {
              paciente: {
                nome: p.nome
              }
            }))]));
            return _context2.a(2, r.id);
        }
      }, _callee2);
    }))();
  },
  enviar: function enviar(chave, msg, contato) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var local, _String$split, _String$split2, tipo, id, p, nova, fig, base, blob, file, path, _t;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            local = _objectSpread({
              id: novoId(),
              me: true,
              t: nowHM2(),
              s: 'sent'
            }, msg);
            chatSet(chave, function (l) {
              return [].concat(_toConsumableArray(l), [local]);
            });
            _context3.p = 1;
            _String$split = String(chave).split(':'), _String$split2 = _slicedToArray(_String$split, 2), tipo = _String$split2[0], id = _String$split2[1];
            if (!(tipo === 'pacc')) {
              _context3.n = 3;
              break;
            }
            p = PAC.find(function (x) {
              return x.dbId === id;
            });
            _context3.n = 2;
            return MsgSvc.garantirConversaPaciente(p);
          case 2:
            id = _context3.v;
            tipo = 'conv';
            nova = chaveConv(id);
            CHAT_STORE.v = _objectSpread(_objectSpread({}, CHAT_STORE.v), {}, _defineProperty({}, nova, CHAT_STORE.v[chave] || []));
            MSG_LIDA[nova] = true;
            avisar(CHAT_STORE);
            chave = nova;
          case 3:
            fig = msg.kind === 'sticker' ? FIGS.find(function (f) {
              return f.rotulo === msg.label;
            }) : null;
            base = {
              id: local.id,
              tipo: KIND_DB[msg.kind || 'text'] || 'texto',
              texto: msg.kind === 'text' || !msg.kind ? msg.text : null,
              legenda: msg.kind !== 'text' && msg.text ? msg.text : null,
              resposta_a_mensagem_id: msg.reply && ehUuid(msg.reply.id) ? msg.reply.id : null,
              figurinha_id: fig ? fig.id : null
            };
            if (!(tipo === 'eq')) {
              _context3.n = 5;
              break;
            }
            _context3.n = 4;
            return DB.ins('mensagens_equipe', _objectSpread(_objectSpread({}, base), {}, {
              canal_id: id,
              autor_nome: quemSou()
            }), 'Mensagem não enviada');
          case 4:
            _context3.n = 6;
            break;
          case 5:
            _context3.n = 6;
            return DB.ins('mensagens', _objectSpread(_objectSpread({}, base), {}, {
              conversa_id: id,
              direcao: 'enviada',
              enviada_por_ia: false,
              status_entrega: 'pendente'
            }), 'Mensagem não enviada');
          case 6:
            if (!(msg.url && /^blob:/.test(msg.url) && msg.kind !== 'sticker')) {
              _context3.n = 10;
              break;
            }
            _context3.n = 7;
            return fetch(msg.url);
          case 7:
            _context3.n = 8;
            return _context3.v.blob();
          case 8:
            blob = _context3.v;
            file = new File([blob], msg.name || 'arquivo', {
              type: blob.type || 'application/octet-stream'
            });
            _context3.n = 9;
            return ARQ.enviar('mensagens', (tipo === 'eq' ? 'equipe/' : 'conversas/') + id, file);
          case 9:
            path = _context3.v;
            _context3.n = 10;
            return DB.ins('anexos_mensagem', _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, tipo === 'eq' ? 'mensagem_equipe_id' : 'mensagem_id', local.id), "arquivo_path", path), "nome_arquivo", msg.name || file.name), "mime_type", file.type), "tamanho_bytes", file.size), "duracao_segundos", msg.dur || null), 'Não foi possível enviar o arquivo');
          case 10:
            if (!(tipo === 'eq')) {
              _context3.n = 11;
              break;
            }
            _context3.n = 11;
            return SB.from('participantes_canal').upsert({
              clinica_id: CLI(),
              canal_id: id,
              usuario_id: UID(),
              ultima_leitura_em: agoraIso()
            }, {
              onConflict: 'canal_id,usuario_id',
              ignoreDuplicates: false
            });
          case 11:
            _context3.n = 13;
            break;
          case 12:
            _context3.p = 12;
            _t = _context3.v;
            chatSet(chave, function (l) {
              return l.filter(function (x) {
                return x.id !== local.id;
              });
            });
          case 13:
            return _context3.a(2);
        }
      }, _callee3, null, [[1, 12]]);
    }))();
  },
  enviarTextoPaciente: function enviarTextoPaciente(p, texto, chave) {
    return MsgSvc.enviar(chave || MsgSvc.chavePaciente(p), {
      kind: 'text',
      text: texto
    }, p.nome);
  },
  reagir: function reagir(chave, m, emoji) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var eq, col, novo;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            eq = String(chave).startsWith('eq:');
            col = eq ? 'mensagem_equipe_id' : 'mensagem_id';
            novo = m.react === emoji ? null : emoji;
            chatSet(chave, function (l) {
              return l.map(function (x) {
                return x.id === m.id ? _objectSpread(_objectSpread({}, x), {}, {
                  react: novo
                }) : x;
              });
            });
            if (ehUuid(m.id)) {
              _context4.n = 1;
              break;
            }
            return _context4.a(2);
          case 1:
            _context4.n = 2;
            return DB.updWhere('reacoes_mensagem', {
              excluido_em: agoraIso()
            }, _defineProperty(_defineProperty(_defineProperty({}, col, m.id), "usuario_id", UID()), "excluido_em", null))["catch"](function () {});
          case 2:
            if (!novo) {
              _context4.n = 3;
              break;
            }
            _context4.n = 3;
            return DB.ins('reacoes_mensagem', _defineProperty(_defineProperty(_defineProperty({}, col, m.id), "emoji", novo), "usuario_id", UID()), 'Não foi possível reagir')["catch"](function () {});
          case 3:
            return _context4.a(2);
        }
      }, _callee4);
    }))();
  },
  apagar: function apagar(chave, m) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var eq;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            eq = String(chave).startsWith('eq:');
            chatSet(chave, function (l) {
              return l.map(function (x) {
                return x.id === m.id ? _objectSpread(_objectSpread({}, x), {}, {
                  deleted: true,
                  react: null
                }) : x;
              });
            });
            if (ehUuid(m.id)) {
              _context5.n = 1;
              break;
            }
            return _context5.a(2);
          case 1:
            _context5.n = 2;
            return DB.upd(eq ? 'mensagens_equipe' : 'mensagens', m.id, _objectSpread({
              apagada: true,
              apagada_para: m.me ? 'todos' : 'so_para_mim',
              apagada_em: agoraIso()
            }, eq ? {} : {
              apagada_por: UID()
            }), 'Não foi possível apagar')["catch"](function () {});
          case 2:
            return _context5.a(2);
        }
      }, _callee5);
    }))();
  },
  marcarLida: function marcarLida(c, equipe) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            if (!(!SB_ON || !c)) {
              _context6.n = 1;
              break;
            }
            return _context6.a(2);
          case 1:
            if (!equipe) {
              _context6.n = 3;
              break;
            }
            c.u = 0;
            MSG_LISTA.v++;
            avisar(MSG_LISTA);
            _context6.n = 2;
            return SB.from('participantes_canal').upsert({
              clinica_id: CLI(),
              canal_id: c.id,
              usuario_id: UID(),
              ultima_leitura_em: agoraIso()
            }, {
              onConflict: 'canal_id,usuario_id',
              ignoreDuplicates: false
            });
          case 2:
            return _context6.a(2);
          case 3:
            if (c.u) {
              c.u = 0;
              MSG_LISTA.v++;
              avisar(MSG_LISTA);
            }
            _context6.n = 4;
            return SB.rpc('marcar_conversa_lida', {
              p_conversa: c.id
            });
          case 4:
            carregarNotificacoes();
          case 5:
            return _context6.a(2);
        }
      }, _callee6);
    }))();
  },
  pacienteDaConversa: function pacienteDaConversa(c) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
      var p;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            p = c.pacId ? PAC.find(function (x) {
              return x.dbId === c.pacId;
            }) : null;
            if (!p && c.tel) p = PAC.find(function (x) {
              return BR.tel(x.tel) === c.tel;
            });
            if (p) {
              _context7.n = 2;
              break;
            }
            _context7.n = 1;
            return carregar('pacientes');
          case 1:
            p = c.pacId ? PAC.find(function (x) {
              return x.dbId === c.pacId;
            }) : PAC.find(function (x) {
              return BR.tel(x.tel) === c.tel;
            });
          case 2:
            if (p) {
              _context7.n = 4;
              break;
            }
            _context7.n = 3;
            return PacSvc.criar({
              nome: c.n && !/^\(?\+?\d/.test(c.n) ? c.n : 'Contato ' + BR.telTela(c.tel),
              tel: BR.telTela(c.tel),
              tipo: 'Particular'
            }, 'equipe');
          case 3:
            p = _context7.v;
          case 4:
            if (p && p.dbId && c.id && !c.pacId) {
              c.pacId = p.dbId;
              DB.upd('conversas', c.id, {
                paciente_id: p.dbId
              })["catch"](function () {});
            }
            return _context7.a(2, p);
        }
      }, _callee7);
    }))();
  }
};

/* ---------- CRM ---------- */
var leadTela = function leadTela(l) {
  var ag = l.agendamento ? l.agendamento.inicio : l.agendado_para;
  return {
    id: l.id,
    dbId: l.id,
    nome: l.nome || '',
    tel: BR.telTela(l.telefone),
    proc: l.interesse || (l.procedimento ? l.procedimento.nome : ''),
    min: l.ultima_interacao_em ? Math.max(0, Math.round((Date.now() - new Date(l.ultima_interacao_em)) / 60000)) : 0,
    ia: l.ia_ativa,
    stage: l.etapa ? l.etapa.chave : 'novo',
    at: ag ? new Date(ag).getTime() : undefined,
    motivo: l.motivo ? l.motivo.nome : undefined,
    conversaId: l.conversa_id,
    pacId: l.paciente_id
  };
};
var SEL_LEAD = '*, etapa:etapas_funil(chave), motivo:motivos_perda(nome), procedimento:procedimentos(nome), agendamento:agendamentos!agendamento_id(inicio)';
CARGAS.crm = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
  var rows, et;
  return _regenerator().w(function (_context9) {
    while (1) switch (_context9.n) {
      case 0:
        _context9.n = 1;
        return carregar('catalogos');
      case 1:
        _context9.n = 2;
        return DB.ler(DB.sel('leads', SEL_LEAD).order('ordem').order('criado_em', {
          ascending: false
        }).limit(2000));
      case 2:
        rows = _context9.v;
        LEADS_STORE.v = rows.map(leadTela);
        avisar(LEADS_STORE);
        // etapas e motivos da clínica
        et = CAT.v.etapas || [];
        if (et.length) substituir(CRM_STAGES, et.map(function (e) {
          return {
            id: e.chave,
            label: e.nome,
            c: e.cor || '#1F5EFF',
            dbId: e.id
          };
        }));
        if ((CAT.v.motivos || []).length) substituir(CRM_MOTIVOS, CAT.v.motivos.filter(function (m) {
          return m.ativo;
        }).map(function (m) {
          return m.nome;
        }));
        tempoReal('crm', ['leads'], /*#__PURE__*/function () {
          var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(t, ev) {
            var id, r, resto;
            return _regenerator().w(function (_context8) {
              while (1) switch (_context8.n) {
                case 0:
                  id = ev["new"] && ev["new"].id || ev.old && ev.old.id;
                  if (id) {
                    _context8.n = 1;
                    break;
                  }
                  return _context8.a(2);
                case 1:
                  _context8.n = 2;
                  return DB.ler(DB.sel('leads', SEL_LEAD).eq('id', id))["catch"](function () {
                    return [];
                  });
                case 2:
                  r = _context8.v;
                  resto = LEADS_STORE.v.filter(function (x) {
                    return x.id !== id;
                  });
                  LEADS_STORE.v = r[0] ? [].concat(_toConsumableArray(resto), [leadTela(r[0])]) : resto;
                  avisar(LEADS_STORE);
                case 3:
                  return _context8.a(2);
              }
            }, _callee8);
          }));
          return function (_x7, _x8) {
            return _ref3.apply(this, arguments);
          };
        }());
      case 3:
        return _context9.a(2);
    }
  }, _callee9);
}));
var CrmSvc = {
  mover: function mover(l, para, motivo) {
    var et = (CAT.v.etapas || []).find(function (e) {
      return e.chave === para;
    });
    var mt = motivo ? (CAT.v.motivos || []).find(function (m) {
      return m.nome === motivo;
    }) : null;
    return DB.upd('leads', l.dbId, {
      etapa_id: et ? et.id : null,
      motivo_perda_id: mt ? mt.id : null,
      motivo_perda_detalhe: null
    }, 'Não foi possível mover o lead');
  },
  ia: function ia(l, ativa) {
    return DB.upd('leads', l.dbId, {
      ia_ativa: ativa,
      ia_pausada_em: ativa ? null : agoraIso(),
      ia_pausada_por: ativa ? null : UID()
    }, 'Não foi possível mudar a IA deste lead');
  },
  paciente: function paciente(l) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
      var _p, tel, p;
      return _regenerator().w(function (_context0) {
        while (1) switch (_context0.n) {
          case 0:
            if (!l.pacId) {
              _context0.n = 2;
              break;
            }
            _context0.n = 1;
            return carregar('pacientes');
          case 1:
            _p = PAC.find(function (x) {
              return x.dbId === l.pacId;
            });
            if (!_p) {
              _context0.n = 2;
              break;
            }
            return _context0.a(2, _p);
          case 2:
            _context0.n = 3;
            return carregar('pacientes');
          case 3:
            tel = BR.tel(l.tel);
            p = PAC.find(function (x) {
              return BR.tel(x.tel) === tel;
            });
            if (p) {
              _context0.n = 5;
              break;
            }
            _context0.n = 4;
            return PacSvc.criar({
              nome: l.nome || 'Contato ' + l.tel,
              tel: l.tel,
              tipo: 'Particular'
            }, 'equipe');
          case 4:
            p = _context0.v;
          case 5:
            DB.upd('leads', l.dbId, {
              paciente_id: p.dbId
            })["catch"](function () {});
            if (l.conversaId) DB.upd('conversas', l.conversaId, {
              paciente_id: p.dbId
            })["catch"](function () {});
            l.pacId = p.dbId;
            return _context0.a(2, p);
        }
      }, _callee0);
    }))();
  }
};

/* ---------- Notificações (sino) ---------- */
function carregarNotificacoes() {
  return _carregarNotificacoes.apply(this, arguments);
}
function _carregarNotificacoes() {
  _carregarNotificacoes = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14() {
    var _yield$SB$from$select, count;
    return _regenerator().w(function (_context14) {
      while (1) switch (_context14.n) {
        case 0:
          if (!(!SB_ON || !CLI())) {
            _context14.n = 1;
            break;
          }
          return _context14.a(2);
        case 1:
          _context14.n = 2;
          return SB.from('notificacoes').select('id', {
            count: 'exact',
            head: true
          }).eq('clinica_id', CLI()).eq('usuario_id', UID()).eq('lida', false).is('excluido_em', null);
        case 2:
          _yield$SB$from$select = _context14.v;
          count = _yield$SB$from$select.count;
          NOTIF.v = {
            naoLidas: count || 0
          };
          avisar(NOTIF);
        case 3:
          return _context14.a(2);
      }
    }, _callee14);
  }));
  return _carregarNotificacoes.apply(this, arguments);
}
CARGAS.notificacoes = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
  var _t2;
  return _regenerator().w(function (_context1) {
    while (1) switch (_context1.p = _context1.n) {
      case 0:
        _context1.p = 0;
        _context1.n = 1;
        return SB.rpc('avisar_receitas_vencidas', {
          p_clinica: CLI()
        });
      case 1:
        _context1.n = 3;
        break;
      case 2:
        _context1.p = 2;
        _t2 = _context1.v;
      case 3:
        _context1.n = 4;
        return carregarNotificacoes();
      case 4:
        tempoReal('notificacoes', ['notificacoes'], function () {
          return carregarNotificacoes();
        });
      case 5:
        return _context1.a(2);
    }
  }, _callee1, null, [[0, 2]]);
}));

/* ---------- Lista do sino: abre ao tocar no sino da barra de cima ---------- */
var NOTIF_MENU = makeStore(null);
function abrirNotif(e) {
  var r = e && e.currentTarget && e.currentTarget.getBoundingClientRect ? e.currentTarget.getBoundingClientRect() : {
    left: innerWidth - 120,
    top: 20,
    width: 40,
    height: 40
  };
  NOTIF_MENU.v = NOTIF_MENU.v ? null : {
    x: r.left,
    y: r.top,
    w: r.width,
    h: r.height
  };
  avisar(NOTIF_MENU);
}
var fecharNotif = function fecharNotif() {
  NOTIF_MENU.v = null;
  avisar(NOTIF_MENU);
};
var NOTIF_TIPO = {
  nova_mensagem: ['message-circle', '#1F5EFF'],
  novo_agendamento: ['calendar-plus', '#7B4BC4'],
  anamnese_respondida: ['clipboard-check', '#1E8E4E'],
  estoque_minimo: ['package', '#E5484D'],
  pagamento_atrasado: ['wallet', '#C2410C'],
  sistema: ['bell', '#5A6B8C']
};
// só no modo demonstração (sem banco), para o sino mostrar como fica
var NOTIF_DEMO = function NOTIF_DEMO() {
  return [{
    id: 'demo1',
    tipo: 'anamnese_respondida',
    titulo: 'Anamnese respondida',
    descricao: 'Ronald Richards · Anamnese facial',
    lida: false,
    criado_em: new Date(Date.now() - 18 * 60000).toISOString()
  }];
};
function quandoNotif(ts) {
  var min = Math.max(0, Math.round((Date.now() - new Date(ts).getTime()) / 60000));
  if (min < 1) return 'agora';
  if (min < 60) return 'há ' + min + ' min';
  var dia = BR.diaDe(ts),
    hoje = BR.hoje();
  if (dia === hoje) return 'há ' + Math.round(min / 60) + ' h';
  var ontem = BR.diaDe(Date.now() - 86400000);
  return (dia === ontem ? 'ontem' : BR.dataTela(dia).slice(0, 5)) + ' às ' + BR.hm(ts);
}
function marcarNotifLidas(_x9) {
  return _marcarNotifLidas.apply(this, arguments);
}
function _marcarNotifLidas() {
  _marcarNotifLidas = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(ids) {
    var q, _yield$q, error;
    return _regenerator().w(function (_context15) {
      while (1) switch (_context15.n) {
        case 0:
          if (!(!SB_ON || !CLI())) {
            _context15.n = 1;
            break;
          }
          return _context15.a(2);
        case 1:
          q = SB.from('notificacoes').update({
            lida: true,
            lida_em: agoraIso()
          }).eq('clinica_id', CLI()).eq('usuario_id', UID()).eq('lida', false);
          if (ids) q = q["in"]('id', ids);
          _context15.n = 2;
          return q;
        case 2:
          _yield$q = _context15.v;
          error = _yield$q.error;
          if (error) avisoErro('Não foi possível marcar como lida', error);
          carregarNotificacoes();
        case 3:
          return _context15.a(2);
      }
    }, _callee15);
  }));
  return _marcarNotifLidas.apply(this, arguments);
}
function abrirDaNotif(_x0) {
  return _abrirDaNotif.apply(this, arguments);
}
function _abrirDaNotif() {
  _abrirDaNotif = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee16(n) {
    var ir, _yield$SB$from$select2, data, pid, p;
    return _regenerator().w(function (_context16) {
      while (1) switch (_context16.n) {
        case 0:
          ir = function ir(k) {
            return window.rnIrPara ? window.rnIrPara(k) : null;
          };
          if (!(n.tipo === 'nova_mensagem')) {
            _context16.n = 1;
            break;
          }
          return _context16.a(2, ir('mensagens'));
        case 1:
          if (!(n.tipo === 'novo_agendamento')) {
            _context16.n = 2;
            break;
          }
          return _context16.a(2, ir('agenda'));
        case 2:
          if (!(n.tipo === 'estoque_minimo')) {
            _context16.n = 3;
            break;
          }
          return _context16.a(2, ir('estoque'));
        case 3:
          if (!(n.tipo === 'pagamento_atrasado')) {
            _context16.n = 4;
            break;
          }
          return _context16.a(2, ir('financeiro.receitas'));
        case 4:
          if (!(n.tipo === 'anamnese_respondida')) {
            _context16.n = 8;
            break;
          }
          if (!(SB_ON && n.registro_id)) {
            _context16.n = 7;
            break;
          }
          _context16.n = 5;
          return SB.from('anamnese_envios').select('paciente_id').eq('id', n.registro_id).limit(1);
        case 5:
          _yield$SB$from$select2 = _context16.v;
          data = _yield$SB$from$select2.data;
          pid = data && data[0] && data[0].paciente_id;
          if (!pid) {
            _context16.n = 7;
            break;
          }
          _context16.n = 6;
          return carregar('pacientes');
        case 6:
          p = PAC.find(function (x) {
            return x.dbId === pid;
          });
          if (!(p && window.rnAbrirFicha)) {
            _context16.n = 7;
            break;
          }
          return _context16.a(2, window.rnAbrirFicha(p, 'prontuario'));
        case 7:
          return _context16.a(2, ir('pacientes'));
        case 8:
          return _context16.a(2, null);
      }
    }, _callee16);
  }));
  return _abrirDaNotif.apply(this, arguments);
}
function NotifMenu(_ref5) {
  var mobile = _ref5.mobile;
  var _useStore = useStore(NOTIF_MENU),
    _useStore2 = _slicedToArray(_useStore, 1),
    a = _useStore2[0];
  var _useStore3 = useStore(NOTIF),
    _useStore4 = _slicedToArray(_useStore3, 1),
    nf = _useStore4[0];
  var _React$useState = React.useState(null),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    lista = _React$useState2[0],
    setLista = _React$useState2[1];
  React.useEffect(function () {
    if (!a) return undefined;
    if (!SB_ON) {
      setLista(function (l) {
        return l || NOTIF_DEMO();
      });
      return undefined;
    }
    var vivo = true;
    SB.from('notificacoes').select('id,tipo,titulo,descricao,lida,criado_em,conversa_id,registro_tabela,registro_id').eq('clinica_id', CLI()).eq('usuario_id', UID()).is('excluido_em', null).order('criado_em', {
      ascending: false
    }).limit(30).then(function (_ref6) {
      var data = _ref6.data,
        error = _ref6.error;
      if (vivo) setLista(error ? [] : data || []);
    });
    return function () {
      vivo = false;
    };
  }, [!!a, nf.naoLidas]);
  React.useEffect(function () {
    if (!a) return undefined;
    var k = function k(e) {
      if (e.key === 'Escape') fecharNotif();
    };
    window.addEventListener('keydown', k);
    return function () {
      return window.removeEventListener('keydown', k);
    };
  }, [!!a]);
  if (!a) return null;
  var W = Math.min(360, innerWidth - 24);
  var pos = {
    top: a.y + a.h + 10,
    left: Math.max(12, Math.min(innerWidth - W - 12, a.x + a.w - W))
  };
  var naoLidas = (lista || []).filter(function (n) {
    return !n.lida;
  }).length;
  var lerTodas = function lerTodas() {
    setLista(function (l) {
      return (l || []).map(function (n) {
        return _objectSpread(_objectSpread({}, n), {}, {
          lida: true
        });
      });
    });
    marcarNotifLidas(null)["catch"](function () {});
  };
  var abrir = function abrir(n) {
    fecharNotif();
    if (!n.lida) {
      setLista(function (l) {
        return (l || []).map(function (x) {
          return x.id === n.id ? _objectSpread(_objectSpread({}, x), {}, {
            lida: true
          }) : x;
        });
      });
      marcarNotifLidas([n.id])["catch"](function () {});
    }
    abrirDaNotif(n)["catch"](function () {});
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    onClick: fecharNotif,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 170
    }
  }), /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-label": "Notifica\xE7\xF5es",
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
      gap: 6,
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)'
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      padding: '4px 6px 6px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Notifica\xE7\xF5es"), naoLidas ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: lerTodas,
    style: {
      border: 0,
      background: 'none',
      padding: 0,
      color: '#1F5EFF',
      fontFamily: 'inherit',
      fontSize: 13,
      fontWeight: 500,
      cursor: 'pointer'
    }
  }, "Marcar todas como lidas") : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      maxHeight: mobile ? '60vh' : 420,
      overflowY: 'auto',
      margin: '0 -4px',
      padding: '0 4px'
    }
  }, !lista ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 22,
      display: 'flex',
      justifyContent: 'center',
      gap: 8,
      color: 'var(--text-muted)',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement(SIcon, {
    name: "loader-circle",
    size: 17,
    style: {
      animation: 'sbgira 1s linear infinite'
    }
  }), "Carregando...", /*#__PURE__*/React.createElement("style", null, '@keyframes sbgira{to{transform:rotate(360deg)}}')) : !lista.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '22px 12px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      textAlign: 'center',
      color: 'var(--text-muted)',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 14,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(31,94,255,.08)',
      color: '#1F5EFF'
    }
  }, /*#__PURE__*/React.createElement(SIcon, {
    name: "bell",
    size: 20
  })), "Nenhuma notifica\xE7\xE3o por aqui.", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-subtle)'
    }
  }, "Mensagens, agendamentos, anamneses, estoque e pagamentos aparecem aqui.")) : lista.map(function (n) {
    var t = NOTIF_TIPO[n.tipo] || NOTIF_TIPO.sistema;
    return /*#__PURE__*/React.createElement("button", {
      key: n.id,
      type: "button",
      onClick: function onClick() {
        return abrir(n);
      },
      style: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: '10px 10px',
        border: 0,
        borderRadius: 16,
        background: n.lida ? 'transparent' : 'rgba(31,94,255,.05)',
        cursor: 'pointer',
        fontFamily: 'inherit',
        textAlign: 'left',
        width: '100%',
        marginBottom: 2
      },
      onMouseEnter: function onMouseEnter(e) {
        e.currentTarget.style.background = 'rgba(31,94,255,.08)';
      },
      onMouseLeave: function onMouseLeave(e) {
        e.currentTarget.style.background = n.lida ? 'transparent' : 'rgba(31,94,255,.05)';
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 36,
        height: 36,
        borderRadius: 12,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'color-mix(in srgb, ' + t[1] + ' 12%, white)',
        color: t[1]
      }
    }, /*#__PURE__*/React.createElement(SIcon, {
      name: t[0],
      size: 17
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        fontWeight: n.lida ? 500 : 600,
        color: 'var(--text-strong)',
        lineHeight: 1.35
      }
    }, n.titulo), n.descricao ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: 'var(--text-muted)',
        lineHeight: 1.4,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }
    }, n.descricao) : null, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: 'var(--text-subtle)'
      }
    }, quandoNotif(n.criado_em))), n.lida ? null : /*#__PURE__*/React.createElement("span", {
      "aria-label": "N\xE3o lida",
      style: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: '#1F5EFF',
        flexShrink: 0,
        marginTop: 6
      }
    }));
  }))));
}
Object.assign(window, {
  MsgSvc: MsgSvc,
  CrmSvc: CrmSvc,
  MSG_LISTA: MSG_LISTA,
  NOTIF: NOTIF,
  abrirChat: abrirChat,
  carregarChat: carregarChat,
  carregarNotificacoes: carregarNotificacoes,
  chaveConv: chaveConv,
  NOTIF_MENU: NOTIF_MENU,
  abrirNotif: abrirNotif,
  fecharNotif: fecharNotif,
  NotifMenu: NotifMenu,
  marcarNotifLidas: marcarNotifLidas
});