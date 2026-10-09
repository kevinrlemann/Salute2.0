"use strict";

function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* =====================================================================
   ANAMNESE
   Modelos em blocos, envio pelo prontuário (link, preencher junto, preencher
   e enviar para assinar), página do paciente com assinatura, respostas por
   bloco e alertas na ficha. Também a página pública de envio de documentos.
   ===================================================================== */
var TIPOS_RESP = [{
  k: 'texto',
  l: 'Texto curto',
  i: 'type'
}, {
  k: 'texto_longo',
  l: 'Texto longo',
  i: 'align-left'
}, {
  k: 'sim_nao',
  l: 'Sim ou não',
  i: 'toggle-right'
}, {
  k: 'escolha_unica',
  l: 'Escolha única',
  i: 'circle-dot'
}, {
  k: 'multipla_escolha',
  l: 'Múltipla escolha',
  i: 'list-checks'
}, {
  k: 'data',
  l: 'Data',
  i: 'calendar'
}, {
  k: 'numero',
  l: 'Número',
  i: 'hash'
}, {
  k: 'informativo',
  l: 'Texto informativo',
  i: 'info'
}];
var tipoResp = function tipoResp(k) {
  return TIPOS_RESP.find(function (t) {
    return t.k === k;
  }) || TIPOS_RESP[0];
};
var temOpcoes = function temOpcoes(k) {
  return k === 'escolha_unica' || k === 'multipla_escolha';
};
var ICONES_BLOCO = ['clipboard-list', 'stethoscope', 'heart-pulse', 'sparkles', 'activity', 'smile', 'target', 'pill', 'info', 'message-square-text'];
var DECLARACAO_PADRAO = 'Declaro que as informações acima são verdadeiras e completas e entendo que elas serão usadas para planejar o meu atendimento com segurança.';
/* local da assinatura: pede o GPS do aparelho quando o paciente começa a assinar */
var ANAM_LOCAL = {
  p: null,
  v: null
};
function anamPedirLocal() {
  if (ANAM_LOCAL.p) return ANAM_LOCAL.p;
  ANAM_LOCAL.p = new Promise(function (res) {
    if (!navigator.geolocation) return res({
      status: 'indisponivel'
    });
    var fim = false;
    var t = setTimeout(function () {
      if (!fim) {
        fim = true;
        res({
          status: 'tempo_esgotado'
        });
      }
    }, 15000);
    navigator.geolocation.getCurrentPosition(function (pos) {
      if (fim) return;
      fim = true;
      clearTimeout(t);
      res({
        status: 'ok',
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        precisao: pos.coords.accuracy
      });
    }, function (err) {
      if (fim) return;
      fim = true;
      clearTimeout(t);
      res({
        status: err && err.code === 1 ? 'negado' : err && err.code === 3 ? 'tempo_esgotado' : 'indisponivel'
      });
    }, {
      enableHighAccuracy: true,
      timeout: 12000,
      maximumAge: 60000
    });
  }).then(function (v) {
    ANAM_LOCAL.v = v;
    return v;
  });
  return ANAM_LOCAL.p;
}
// texto do local para a ficha e para a impressão
function localAssTexto(l) {
  if (!l || !l.status) return '';
  if (l.status === 'ok' && l.lat != null && l.lng != null) return 'Local ' + Number(l.lat).toFixed(5) + ', ' + Number(l.lng).toFixed(5) + (l.precisao_m ? ' (±' + l.precisao_m + ' m)' : '');
  return l.status === 'negado' ? 'Local não autorizado pelo paciente' : 'Local indisponível no aparelho';
}
var localAssLink = function localAssLink(l) {
  return l && l.status === 'ok' && l.lat != null ? 'https://www.google.com/maps?q=' + l.lat + ',' + l.lng : null;
};
var ACEITE_ASSINATURA = 'Li e confirmo que as informações são verdadeiras. Concordo em assinar este documento eletronicamente.';
var idLocal = function idLocal(p) {
  return p + Math.random().toString(36).slice(2, 10);
};
var qsDe = function qsDe(m) {
  return (m.blocos || []).reduce(function (a, b) {
    return a.concat(b.qs || []);
  }, []);
};
var comQs = function comQs(m) {
  return _objectSpread(_objectSpread({}, m), {}, {
    qs: qsDe(m)
  });
};
var novaPergunta = function novaPergunta(k) {
  return {
    id: idLocal('q'),
    t: '',
    k: k || 'texto',
    desc: '',
    obrig: false,
    opcoes: temOpcoes(k) ? ['', ''] : [],
    outro: false,
    det: false,
    rotDet: '',
    alerta: false,
    rotAlerta: ''
  };
};
var novoBloco = function novoBloco(titulo) {
  return {
    id: idLocal('b'),
    titulo: titulo || '',
    icone: 'clipboard-list',
    qs: [novaPergunta('texto')]
  };
};
var respondivel = function respondivel(q) {
  return q.k !== 'informativo';
};

/* ---------- Modelos prontos (os mesmos que o banco cria para toda clínica nova) ---------- */
var MODELOS_PRONTOS = [{
  nome: 'Anamnese estética',
  uso: 'Estética',
  padrao: true,
  desc: 'Avaliação completa antes de procedimentos estéticos faciais e corporais.',
  blocos: [['Motivo da consulta', 'stethoscope', [{
    t: 'Qual é o principal motivo da sua consulta?',
    k: 'texto_longo',
    ob: 1,
    d: 'Conte com suas palavras o que deseja melhorar.'
  }, {
    t: 'Há quanto tempo isso incomoda você?',
    k: 'escolha_unica',
    o: ['Menos de 1 mês', 'De 1 a 6 meses', 'De 6 meses a 1 ano', 'Mais de 1 ano']
  }]], ['Histórico de saúde', 'heart-pulse', [{
    t: 'Marque as condições que você tem ou já teve',
    k: 'multipla_escolha',
    o: ['Diabetes', 'Hipertensão', 'Doença cardíaca', 'Asma', 'Doença autoimune', 'Problema de coagulação', 'Herpes recorrente', 'Epilepsia', 'Nenhuma'],
    outro: 1
  }, {
    t: 'Faz algum tratamento médico no momento?',
    k: 'sim_nao',
    det: 'Qual tratamento?'
  }, {
    t: 'Quais medicamentos você usa regularmente?',
    k: 'texto_longo',
    d: 'Inclua anticoncepcional, vitaminas e suplementos.'
  }, {
    t: 'Usa anticoagulante ou anti-inflamatório com frequência?',
    k: 'sim_nao',
    det: 'Qual?',
    al: 'Anticoagulante'
  }, {
    t: 'Tem alergia a algum medicamento, cosmético ou alimento?',
    k: 'sim_nao',
    det: 'A quê?',
    al: 'Alergia',
    ob: 1
  }, {
    t: 'Já fez alguma cirurgia?',
    k: 'sim_nao',
    det: 'Qual e quando?'
  }]], ['Histórico estético', 'sparkles', [{
    t: 'Já fez procedimentos estéticos antes?',
    k: 'sim_nao',
    det: 'Quais e quando?'
  }, {
    t: 'Teve alguma reação ou complicação em procedimento anterior?',
    k: 'sim_nao',
    det: 'O que aconteceu?',
    al: 'Reação em procedimento anterior'
  }, {
    t: 'Usa ácidos, retinoides ou isotretinoína?',
    k: 'sim_nao',
    det: 'Qual produto?'
  }, {
    t: 'Tem queloide ou cicatrização difícil?',
    k: 'sim_nao',
    al: 'Queloide'
  }]], ['Hábitos de vida', 'activity', [{
    t: 'Você fuma?',
    k: 'sim_nao'
  }, {
    t: 'Consome bebida alcoólica?',
    k: 'escolha_unica',
    o: ['Não', 'Socialmente', 'Com frequência']
  }, {
    t: 'Pratica atividade física?',
    k: 'sim_nao',
    det: 'Qual e quantas vezes por semana?'
  }, {
    t: 'Está grávida ou amamentando?',
    k: 'sim_nao',
    al: 'Gestante ou lactante',
    ob: 1
  }, {
    t: 'Como é sua exposição ao sol?',
    k: 'escolha_unica',
    o: ['Pouca', 'Moderada', 'Muita']
  }]], ['Observações', 'message-square-text', [{
    t: 'Tem algo mais que devemos saber antes do seu atendimento?',
    k: 'texto_longo'
  }]]]
}, {
  nome: 'Toxina botulínica',
  uso: 'Estética',
  desc: 'Antes da aplicação de toxina botulínica.',
  blocos: [['Antes da aplicação', 'info', [{
    t: 'Suas respostas ajudam o profissional a planejar a aplicação com segurança. Leva cerca de 2 minutos.',
    k: 'informativo'
  }]], ['Saúde', 'heart-pulse', [{
    t: 'Já aplicou toxina botulínica antes?',
    k: 'sim_nao',
    det: 'Quando foi a última aplicação?'
  }, {
    t: 'Tem alguma doença neuromuscular, como miastenia gravis?',
    k: 'sim_nao',
    al: 'Doença neuromuscular',
    ob: 1
  }, {
    t: 'Usa antibiótico ou relaxante muscular no momento?',
    k: 'sim_nao',
    det: 'Qual?',
    al: 'Interação medicamentosa'
  }, {
    t: 'Tem alergia a algum medicamento?',
    k: 'sim_nao',
    det: 'A qual?',
    al: 'Alergia',
    ob: 1
  }, {
    t: 'Está grávida ou amamentando?',
    k: 'sim_nao',
    al: 'Gestante ou lactante',
    ob: 1
  }]], ['Objetivo', 'target', [{
    t: 'Quais áreas deseja tratar?',
    k: 'multipla_escolha',
    o: ['Testa', 'Entre as sobrancelhas', 'Pés de galinha', 'Sorriso gengival', 'Bruxismo', 'Suor excessivo'],
    outro: 1,
    ob: 1
  }, {
    t: 'Tem algum evento importante nos próximos 15 dias?',
    k: 'sim_nao',
    det: 'Qual e em que data?'
  }]]]
}, {
  nome: 'Odontológica geral',
  uso: 'Odontologia',
  desc: 'Primeira consulta e retornos odontológicos.',
  blocos: [['Motivo da consulta', 'stethoscope', [{
    t: 'Qual é o motivo da sua consulta?',
    k: 'texto_longo',
    ob: 1
  }, {
    t: 'Quando foi sua última consulta com dentista?',
    k: 'escolha_unica',
    o: ['Menos de 6 meses', 'Entre 6 meses e 1 ano', 'Mais de 1 ano', 'Não lembro']
  }]], ['Saúde geral', 'heart-pulse', [{
    t: 'Marque as condições que você tem ou já teve',
    k: 'multipla_escolha',
    o: ['Diabetes', 'Hipertensão', 'Doença cardíaca', 'Problema de coagulação', 'Asma', 'Nenhuma'],
    outro: 1
  }, {
    t: 'Usa anticoagulante?',
    k: 'sim_nao',
    det: 'Qual?',
    al: 'Anticoagulante'
  }, {
    t: 'Tem alergia a anestésico, látex ou medicamento?',
    k: 'sim_nao',
    det: 'A quê?',
    al: 'Alergia',
    ob: 1
  }, {
    t: 'Está grávida?',
    k: 'sim_nao',
    al: 'Gestante'
  }, {
    t: 'Quais medicamentos você usa regularmente?',
    k: 'texto_longo'
  }]], ['Saúde bucal', 'smile', [{
    t: 'Sente sensibilidade nos dentes?',
    k: 'sim_nao'
  }, {
    t: 'Sua gengiva sangra?',
    k: 'escolha_unica',
    o: ['Nunca', 'Às vezes', 'Sempre que escovo']
  }, {
    t: 'Range ou aperta os dentes?',
    k: 'sim_nao'
  }, {
    t: 'Quantas vezes por dia escova os dentes?',
    k: 'numero'
  }, {
    t: 'Usa fio dental?',
    k: 'escolha_unica',
    o: ['Todo dia', 'Às vezes', 'Não uso']
  }]], ['Hábitos', 'activity', [{
    t: 'Você fuma?',
    k: 'sim_nao'
  }, {
    t: 'Consome doces ou refrigerante com frequência?',
    k: 'sim_nao'
  }]]]
}];
var modeloDePronto = function modeloDePronto(m, i) {
  return comQs({
    id: 'mp' + i,
    nome: m.nome,
    uso: m.uso,
    desc: m.desc,
    padrao: !!m.padrao,
    exigeAss: true,
    declaracao: DECLARACAO_PADRAO,
    usos: [31, 18, 12][i] || 0,
    blocos: m.blocos.map(function (_ref, bi) {
      var _ref2 = _slicedToArray(_ref, 3),
        titulo = _ref2[0],
        icone = _ref2[1],
        qs = _ref2[2];
      return {
        id: 'mp' + i + 'b' + bi,
        titulo: titulo,
        icone: icone,
        qs: qs.map(function (q, qi) {
          return {
            id: 'mp' + i + 'b' + bi + 'q' + qi,
            t: q.t,
            k: q.k,
            desc: q.d || '',
            obrig: !!q.ob,
            opcoes: q.o || [],
            outro: !!q.outro,
            det: !!q.det,
            rotDet: q.det || '',
            alerta: !!q.al,
            rotAlerta: q.al || ''
          };
        })
      };
    })
  });
};
var ANAM_DEMO = MODELOS_PRONTOS.map(modeloDePronto);
if (!SB_ON) ANAM_STORE.v = ANAM_DEMO;

/* ---------- Banco ---------- */
function modeloTela(m, usos) {
  var qsRows = (m.perguntas || []).filter(function (q) {
    return !q.excluido_em;
  }).sort(function (a, b) {
    return a.ordem - b.ordem;
  });
  var bls = (m.blocos || []).filter(function (b) {
    return !b.excluido_em;
  }).sort(function (a, b) {
    return a.ordem - b.ordem;
  });
  var pq = function pq(q) {
    return {
      id: q.id,
      dbId: q.id,
      t: q.texto,
      k: q.tipo_resposta || 'texto',
      desc: q.descricao || '',
      obrig: !!q.obrigatoria,
      opcoes: Array.isArray(q.opcoes) ? q.opcoes : [],
      outro: !!q.permite_outro,
      det: !!q.pedir_detalhe,
      rotDet: q.rotulo_detalhe || '',
      alerta: !!q.alerta,
      rotAlerta: q.rotulo_alerta || ''
    };
  };
  var blocos = bls.map(function (b) {
    return {
      id: b.id,
      dbId: b.id,
      titulo: b.titulo,
      icone: b.icone || 'clipboard-list',
      qs: qsRows.filter(function (q) {
        return q.bloco_id === b.id;
      }).map(pq)
    };
  });
  var soltas = qsRows.filter(function (q) {
    return !q.bloco_id || !bls.some(function (b) {
      return b.id === q.bloco_id;
    });
  }).map(pq);
  if (soltas.length) blocos.unshift({
    id: idLocal('b'),
    titulo: 'Perguntas',
    icone: 'clipboard-list',
    qs: soltas
  });
  return comQs({
    id: m.id,
    dbId: m.id,
    nome: m.nome,
    uso: el('area', m.area, 'Geral'),
    desc: m.descricao || '',
    padrao: !!m.padrao,
    exigeAss: m.exige_assinatura !== false,
    declaracao: m.texto_declaracao || DECLARACAO_PADRAO,
    usos: usos || 0,
    blocos: blocos
  });
}
CARGAS.anamnese = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
  var _yield$Promise$all, _yield$Promise$all2, rows, envs, usos;
  return _regenerator().w(function (_context) {
    while (1) switch (_context.n) {
      case 0:
        _context.n = 1;
        return Promise.all([DB.ler(DB.sel('anamnese_modelos', 'id,nome,area,slug,descricao,padrao,exige_assinatura,texto_declaracao,criado_em,blocos:anamnese_blocos(id,ordem,titulo,icone,excluido_em),perguntas:anamnese_perguntas(id,bloco_id,ordem,texto,tipo_resposta,opcoes,obrigatoria,descricao,pedir_detalhe,rotulo_detalhe,permite_outro,alerta,rotulo_alerta,excluido_em)').order('criado_em')), DB.ler(DB.sel('anamnese_envios', 'modelo_id'))["catch"](function () {
          return [];
        })]);
      case 1:
        _yield$Promise$all = _context.v;
        _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
        rows = _yield$Promise$all2[0];
        envs = _yield$Promise$all2[1];
        usos = {};
        envs.forEach(function (e) {
          usos[e.modelo_id] = (usos[e.modelo_id] || 0) + 1;
        });
        ANAM_STORE.v = rows.map(function (m) {
          return modeloTela(m, usos[m.id]);
        }).sort(function (a, b) {
          return Number(b.padrao) - Number(a.padrao);
        });
        avisar(ANAM_STORE);
      case 2:
        return _context.a(2);
    }
  }, _callee);
}));
var slugModelo = function slugModelo(n) {
  return String(n || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '');
};
var cpfMascara = function cpfMascara(v) {
  var d = onlyDigits(v).slice(0, 11);
  return d.replace(/^(\d{3})(\d)/, '$1.$2').replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3').replace(/\.(\d{3})(\d)/, '.$1-$2');
};
var cpfOculto = function cpfOculto(v) {
  var d = onlyDigits(v);
  return d.length === 11 ? d.slice(0, 3) + '.***.***-' + d.slice(9) : '';
};
var dataHoraBR = function dataHoraBR(ts) {
  return ts ? BR.dataTela(BR.diaDe(ts)) + ' às ' + BR.hm(ts) : '';
}; // sempre no horário de Brasília

var AnamSvc = {
  // salva o modelo preservando os ids de blocos e perguntas (rascunhos em andamento continuam valendo)
  salvar: function salvar(ed) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var blocos, dados, id, r, cli, bRows, qRows, agora, tirar, salvo;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            blocos = ed.blocos.map(function (b) {
              return _objectSpread(_objectSpread({}, b), {}, {
                qs: b.qs.filter(function (q) {
                  return String(q.t || '').trim();
                })
              });
            }).filter(function (b) {
              return b.qs.length || String(b.titulo || '').trim();
            });
            dados = {
              nome: ed.nome.trim(),
              area: ek('area', ed.uso) || 'geral',
              slug: slugModelo(ed.nome),
              descricao: String(ed.desc || '').trim() || null,
              exige_assinatura: ed.exigeAss !== false,
              texto_declaracao: String(ed.declaracao || '').trim() || null
            };
            id = ed.dbId;
            if (!id) {
              _context2.n = 2;
              break;
            }
            _context2.n = 1;
            return DB.upd('anamnese_modelos', id, dados, 'Não foi possível salvar o modelo');
          case 1:
            _context2.n = 4;
            break;
          case 2:
            _context2.n = 3;
            return DB.ins('anamnese_modelos', dados, 'Não foi possível criar o modelo');
          case 3:
            r = _context2.v;
            id = r.id;
          case 4:
            cli = CLI();
            bRows = blocos.map(function (b, i) {
              return {
                id: b.dbId || novoId(),
                clinica_id: cli,
                modelo_id: id,
                ordem: i + 1,
                titulo: String(b.titulo || '').trim() || 'Bloco ' + (i + 1),
                icone: b.icone || 'clipboard-list'
              };
            });
            qRows = [];
            blocos.forEach(function (b, i) {
              return b.qs.forEach(function (q, j) {
                return qRows.push({
                  id: q.dbId || novoId(),
                  clinica_id: cli,
                  modelo_id: id,
                  bloco_id: bRows[i].id,
                  ordem: (i + 1) * 100 + j + 1,
                  texto: q.t.trim(),
                  tipo_resposta: q.k,
                  opcoes: temOpcoes(q.k) ? (q.opcoes || []).map(function (o) {
                    return String(o).trim();
                  }).filter(Boolean) : null,
                  obrigatoria: respondivel(q) && !!q.obrig,
                  descricao: String(q.desc || '').trim() || null,
                  pedir_detalhe: q.k === 'sim_nao' && !!q.det,
                  rotulo_detalhe: q.k === 'sim_nao' && q.det ? String(q.rotDet || '').trim() || 'Qual?' : null,
                  permite_outro: temOpcoes(q.k) && !!q.outro,
                  alerta: q.k === 'sim_nao' && !!q.alerta,
                  rotulo_alerta: q.k === 'sim_nao' && q.alerta ? String(q.rotAlerta || '').trim() || null : null
                });
              });
            });
            if (!bRows.length) {
              _context2.n = 5;
              break;
            }
            _context2.n = 5;
            return DB.gravar(SB.from('anamnese_blocos').upsert(bRows, {
              onConflict: 'id'
            }), 'Não foi possível salvar os blocos');
          case 5:
            if (!qRows.length) {
              _context2.n = 6;
              break;
            }
            _context2.n = 6;
            return DB.gravar(SB.from('anamnese_perguntas').upsert(qRows, {
              onConflict: 'id'
            }), 'Não foi possível salvar as perguntas');
          case 6:
            agora = agoraIso();
            tirar = function tirar(t, ids) {
              var q = SB.from(t).update({
                excluido_em: agora
              }).eq('clinica_id', cli).eq('modelo_id', id).is('excluido_em', null);
              if (ids.length) q = q.not('id', 'in', '(' + ids.join(',') + ')');
              return DB.gravar(q, 'Não foi possível atualizar o modelo');
            };
            _context2.n = 7;
            return tirar('anamnese_perguntas', qRows.map(function (q) {
              return q.id;
            }));
          case 7:
            _context2.n = 8;
            return tirar('anamnese_blocos', bRows.map(function (b) {
              return b.id;
            }));
          case 8:
            salvo = comQs(_objectSpread(_objectSpread({}, ed), {}, {
              id: id,
              dbId: id,
              nome: dados.nome,
              blocos: blocos.map(function (b, i) {
                return _objectSpread(_objectSpread({}, b), {}, {
                  id: bRows[i].id,
                  dbId: bRows[i].id,
                  qs: b.qs.map(function (q) {
                    var r = qRows.find(function (x) {
                      return x.bloco_id === bRows[i].id && x.texto === q.t.trim();
                    });
                    return _objectSpread(_objectSpread({}, q), {}, {
                      id: r ? r.id : q.id,
                      dbId: r ? r.id : q.dbId
                    });
                  })
                });
              })
            }));
            return _context2.a(2, salvo);
        }
      }, _callee2);
    }))();
  },
  definirPadrao: function definirPadrao(m) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            _context3.n = 1;
            return DB.updWhere('anamnese_modelos', {
              padrao: false
            }, {
              padrao: true
            });
          case 1:
            _context3.n = 2;
            return DB.upd('anamnese_modelos', m.dbId, {
              padrao: true
            }, 'Não foi possível definir o modelo padrão');
          case 2:
            return _context3.a(2);
        }
      }, _callee3);
    }))();
  },
  excluir: function excluir(m) {
    return DB.del('anamnese_modelos', m.dbId, 'Não foi possível excluir o modelo');
  },
  regerar: function regerar(envioId) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var _yield$SB$rpc, data, error;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            _context4.n = 1;
            return SB.rpc('regerar_link_anamnese', {
              p_envio: envioId
            });
          case 1:
            _yield$SB$rpc = _context4.v;
            data = _yield$SB$rpc.data;
            error = _yield$SB$rpc.error;
            if (!error) {
              _context4.n = 2;
              break;
            }
            avisoErro('Não foi possível gerar o novo link', error);
            throw error;
          case 2:
            return _context4.a(2, data);
        }
      }, _callee4);
    }))();
  },
  cancelar: function cancelar(envioId) {
    return DB.upd('anamnese_envios', envioId, {
      status: 'cancelado',
      cancelado_em: agoraIso(),
      cancelado_por: UID()
    }, 'Não foi possível cancelar o envio');
  },
  publica: function publica(token) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var _yield$SB$rpc2, data, error;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            _context5.n = 1;
            return SB.rpc('anamnese_publica', {
              p_token: token
            });
          case 1:
            _yield$SB$rpc2 = _context5.v;
            data = _yield$SB$rpc2.data;
            error = _yield$SB$rpc2.error;
            if (!error) {
              _context5.n = 2;
              break;
            }
            throw error;
          case 2:
            return _context5.a(2, data);
        }
      }, _callee5);
    }))();
  },
  rascunho: function rascunho(token, vals) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      var _yield$SB$rpc3, error;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            _context6.n = 1;
            return SB.rpc('salvar_rascunho_anamnese', {
              p_token: token,
              p_rascunho: vals || {}
            });
          case 1:
            _yield$SB$rpc3 = _context6.v;
            error = _yield$SB$rpc3.error;
            if (!error) {
              _context6.n = 2;
              break;
            }
            throw error;
          case 2:
            return _context6.a(2);
        }
      }, _callee6);
    }))();
  },
  responder: function responder(token, blocos, vals, ass) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
      var _yield$SB$rpc4, error;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            _context7.n = 1;
            return SB.rpc('responder_anamnese', {
              p_token: token,
              p_respostas: {
                respostas: payloadRespostas(blocos, vals),
                assinatura: ass || null
              }
            });
          case 1:
            _yield$SB$rpc4 = _context7.v;
            error = _yield$SB$rpc4.error;
            if (!error) {
              _context7.n = 2;
              break;
            }
            throw error;
          case 2:
            return _context7.a(2);
        }
      }, _callee7);
    }))();
  },
  envio: function envio(id) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
      var r;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.n) {
          case 0:
            _context8.n = 1;
            return DB.ler(DB.sel('anamnese_envios', 'id,token,status,modo,enviado_em,expira_em,respondido_em,rascunho,assinatura,assinante_nome,assinante_cpf,assinado_em,ip_assinatura,local_assinatura,texto_declaracao,hash_respostas,modelo_id,modelo:anamnese_modelos(nome),respostas:anamnese_respostas(ordem,pergunta_texto,resposta,detalhe,bloco_titulo,alerta,rotulo_alerta,excluido_em)').eq('id', id));
          case 1:
            r = _context8.v;
            return _context8.a(2, r[0] ? envioTela(r[0]) : null);
        }
      }, _callee8);
    }))();
  }
};

/* ---------- Respostas: formato da tela e do banco ---------- */
var valorTexto = function valorTexto(q, v) {
  if (!v) return '';
  if (q.k === 'multipla_escolha') return (Array.isArray(v.r) ? v.r : []).map(function (o) {
    return o === 'Outro' ? 'Outro' + (v.o ? ': ' + v.o : '') : o;
  }).join(', ');
  if (q.k === 'escolha_unica' && v.r === 'Outro') return 'Outro' + (v.o ? ': ' + v.o : '');
  return String(v.r == null ? '' : v.r).trim();
};
var respondida = function respondida(q, v) {
  return valorTexto(q, v) !== '';
};
function payloadRespostas(blocos, vals) {
  var out = [];
  blocos.forEach(function (b) {
    return b.qs.filter(respondivel).forEach(function (q) {
      var v = vals[q.id];
      var r = valorTexto(q, v);
      var d = v && q.k === 'sim_nao' && v.r === 'Sim' ? String(v.d || '').trim() : '';
      if (r || d) out.push({
        pergunta_id: q.id,
        resposta: r,
        detalhe: d || null
      });
    });
  });
  return out;
}
var respostasLocais = function respostasLocais(blocos, vals) {
  var out = [];
  blocos.forEach(function (b) {
    return b.qs.filter(respondivel).forEach(function (q) {
      var v = vals[q.id];
      var r = valorTexto(q, v);
      if (!r) return;
      var d = v && q.k === 'sim_nao' && v.r === 'Sim' ? String(v.d || '').trim() : '';
      out.push([q.t, r, d, b.titulo, !!q.alerta && r === 'Sim', q.alerta ? q.rotAlerta || q.t : '']);
    });
  });
  return out;
};
function envioTela(e) {
  var st = {
    respondido: 'respondida',
    expirado: 'expirada',
    cancelado: 'cancelada',
    recebido: 'respondida'
  }[e.status] || 'pendente';
  var resp = (e.respostas || []).filter(function (r) {
    return !r.excluido_em;
  }).sort(function (x, y) {
    return x.ordem - y.ordem;
  });
  return {
    id: e.id,
    dbId: e.id,
    kind: 'anamnese',
    date: BR.dataTela(BR.diaDe(e.enviado_em)),
    ord: e.enviado_em,
    title: e.modelo ? e.modelo.nome : 'Anamnese',
    status: st,
    modo: e.modo || 'link',
    token: e.token,
    link: linkAnamnese(e.token),
    expira: e.expira_em,
    respondidoEm: e.respondido_em,
    modeloId: e.modelo_id,
    rascunho: e.rascunho,
    assinatura: e.assinatura,
    assinante: e.assinante_nome,
    cpfAss: e.assinante_cpf,
    assinadoEm: e.assinado_em,
    ip: e.ip_assinatura,
    local: e.local_assinatura || null,
    declaracao: e.texto_declaracao || '',
    codigo: e.hash_respostas ? e.hash_respostas.slice(0, 12).toUpperCase() : null,
    answers: resp.length ? resp.map(function (r) {
      return [r.pergunta_texto, r.resposta || '', r.detalhe || '', r.bloco_titulo || '', !!r.alerta, r.rotulo_alerta || ''];
    }) : undefined
  };
}
// blocos no formato da tela a partir do que a função pública devolve
var blocosDePublica = function blocosDePublica(d) {
  return (d.blocos || []).map(function (b, i) {
    return {
      id: b.id || 'b' + i,
      titulo: b.titulo,
      icone: b.icone || 'clipboard-list',
      qs: (b.perguntas || []).map(function (q) {
        return {
          id: q.id,
          t: q.texto,
          k: q.tipo,
          desc: q.descricao || '',
          obrig: !!q.obrigatoria,
          opcoes: q.opcoes || [],
          outro: !!q.permite_outro,
          det: !!q.pedir_detalhe,
          rotDet: q.rotulo_detalhe || ''
        };
      })
    };
  });
};
// alertas mostrados na ficha: vale a resposta mais recente de cada alerta
function alertasDeRecs(recs) {
  var vistos = {},
    out = [];
  (recs || []).filter(function (r) {
    return r.kind === 'anamnese' && r.status === 'respondida' && r.answers;
  }).forEach(function (r) {
    return r.answers.forEach(function (a) {
      var rot = a[5];
      if (!rot || vistos[rot]) return;
      vistos[rot] = 1;
      if (a[4]) out.push({
        rotulo: rot,
        detalhe: a[2]
      });
    });
  });
  return out;
}

/* ---------- Impressão (PDF pelo navegador) ---------- */
function imprimirHtml(titulo, corpo) {
  var f = document.createElement('iframe');
  f.setAttribute('aria-hidden', 'true');
  f.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;';
  document.body.appendChild(f);
  var d = f.contentWindow.document;
  d.open();
  d.write('<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>' + titulo + '</title><style>body{font-family:Inter,system-ui,sans-serif;color:#0E2350;margin:32px;font-size:13px;line-height:1.5}h1{font-size:20px;margin:0 0 4px}h2{font-size:14px;margin:22px 0 8px;color:#1F5EFF;text-transform:uppercase;letter-spacing:.04em}.m{color:#5B6B86}.q{margin:0 0 10px}.q b{display:block}.al{color:#C2272D;font-weight:600}table{border-collapse:collapse;width:100%}td,th{border-bottom:1px solid #DCE4F2;padding:6px 8px;text-align:left;font-size:12px}img{max-width:100%}.ass{border:1px solid #DCE4F2;border-radius:10px;padding:12px;margin-top:8px}</style></head><body>' + corpo + '</body></html>');
  d.close();
  setTimeout(function () {
    try {
      f.contentWindow.focus();
      f.contentWindow.print();
    } catch (e) {}
    setTimeout(function () {
      return f.remove();
    }, 60000);
  }, 350);
}
var escHtml = function escHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;'
    }[c];
  });
};
var assinaturaSvgTexto = function assinaturaSvgTexto(a) {
  var w = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 320;
  var h = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 120;
  return a && a.tracos ? '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + (a.w || 320) + ' ' + (a.h || 120) + '" width="' + w + '" height="' + h + '">' + a.tracos.map(function (t) {
    return '<polyline fill="none" stroke="#0E2350" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" points="' + t.map(function (p) {
      return p.join(',');
    }).join(' ') + '"/>';
  }).join('') + '</svg>' : '';
};
function imprimirAnamnese(r, paciente) {
  var grupos = [];
  (r.answers || []).forEach(function (a) {
    var g = a[3] || 'Respostas';
    var x = grupos.find(function (y) {
      return y.t === g;
    });
    if (!x) grupos.push(x = {
      t: g,
      l: []
    });
    x.l.push(a);
  });
  var corpo = '<h1>' + escHtml(r.title) + '</h1><div class="m">' + escHtml(paciente || '') + (r.respondidoEm ? ' · respondida em ' + escHtml(dataHoraBR(r.respondidoEm)) : '') + '</div>' + grupos.map(function (g) {
    return '<h2>' + escHtml(g.t) + '</h2>' + g.l.map(function (a) {
      return '<div class="q"><span class="m">' + escHtml(a[0]) + '</span><b' + (a[4] ? ' class="al"' : '') + '>' + escHtml(a[1]) + (a[2] ? ': ' + escHtml(a[2]) : '') + '</b></div>';
    }).join('');
  }).join('') + (r.assinatura ? '<h2>Assinatura</h2><div class="ass">' + assinaturaSvgTexto(r.assinatura) + '<div>' + escHtml(r.assinante || '') + (r.cpfAss ? ' · CPF ' + escHtml(cpfOculto(r.cpfAss)) : '') + '</div><div class="m">' + (r.assinadoEm ? 'Assinada em ' + escHtml(dataHoraBR(r.assinadoEm)) : '') + (r.ip ? ' · IP ' + escHtml(r.ip) : '') + (localAssTexto(r.local) ? ' · ' + escHtml(localAssTexto(r.local)) : '') + (r.codigo ? ' · Código de conferência ' + escHtml(r.codigo) : '') + '</div>' + (r.declaracao ? '<div class="m"><b>Declaração aceita:</b> ' + escHtml(r.declaracao) + '</div>' : '') + '</div>' : '');
  imprimirHtml(r.title, corpo);
}

/* =====================================================================
   COMPONENTES
   ===================================================================== */
var campoBase = {
  width: '100%',
  boxSizing: 'border-box',
  borderRadius: 14,
  border: '1.5px solid rgba(214,226,242,.95)',
  background: '#fff',
  padding: '0 14px',
  height: 46,
  fontFamily: 'inherit',
  fontSize: 15,
  color: 'var(--text-strong)',
  outline: 'none'
};
var pilula = function pilula(on, cor) {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    minHeight: 44,
    padding: '8px 16px',
    borderRadius: 999,
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: 15,
    fontWeight: 500,
    textAlign: 'left',
    border: on ? "1.5px solid ".concat(cor || '#1F5EFF') : '1.5px solid rgba(214,226,242,.95)',
    background: on ? "color-mix(in srgb, ".concat(cor || '#1F5EFF', " 9%, white)") : '#fff',
    color: on ? cor || '#1F5EFF' : 'var(--text-strong)'
  };
};
function CampoPergunta(_ref4) {
  var q = _ref4.q,
    v = _ref4.v,
    onChange = _ref4.onChange,
    faltando = _ref4.faltando,
    readOnly = _ref4.readOnly;
  var val = v || {};
  var set = function set(p) {
    return !readOnly && onChange(_objectSpread(_objectSpread({}, val), p));
  };
  if (q.k === 'informativo') return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      padding: '12px 14px',
      borderRadius: 14,
      background: 'rgba(31,94,255,.06)',
      color: 'var(--text-body)',
      fontSize: 14,
      lineHeight: 1.5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#1F5EFF',
      display: 'flex',
      flexShrink: 0,
      marginTop: 2
    }
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "info",
    size: 16
  })), /*#__PURE__*/React.createElement("span", null, q.t));
  var ops = (q.opcoes || []).filter(Boolean).concat(q.outro ? ['Outro'] : []);
  var multi = Array.isArray(val.r) ? val.r : [];
  var toggleMulti = function toggleMulti(o) {
    var n = multi.includes(o) ? multi.filter(function (x) {
      return x !== o;
    }) : [].concat(_toConsumableArray(multi), [o]);
    if (o === 'Nenhuma' && !multi.includes(o)) n = ['Nenhuma'];else if (o !== 'Nenhuma') n = n.filter(function (x) {
      return x !== 'Nenhuma';
    });
    set({
      r: n
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    "data-pergunta": q.id,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      padding: faltando ? 12 : 0,
      margin: faltando ? -12 : 0,
      borderRadius: 16,
      background: faltando ? 'rgba(229,72,77,.06)' : 'transparent',
      transition: 'background .2s'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--text-strong)',
      lineHeight: 1.4
    }
  }, q.t, q.obrig ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#E5484D'
    }
  }, " *") : null), q.desc ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '2px 0 0',
      fontSize: 13,
      color: 'var(--text-muted)',
      lineHeight: 1.45
    }
  }, q.desc) : null), q.k === 'texto' ? /*#__PURE__*/React.createElement("input", {
    value: val.r || '',
    readOnly: readOnly,
    onChange: function onChange(e) {
      return set({
        r: e.target.value
      });
    },
    placeholder: "Sua resposta",
    style: campoBase
  }) : null, q.k === 'texto_longo' ? /*#__PURE__*/React.createElement("textarea", {
    value: val.r || '',
    readOnly: readOnly,
    onChange: function onChange(e) {
      return set({
        r: e.target.value
      });
    },
    rows: 3,
    placeholder: "Sua resposta",
    style: _objectSpread(_objectSpread({}, campoBase), {}, {
      height: 'auto',
      padding: 12,
      resize: 'vertical',
      lineHeight: 1.5
    })
  }) : null, q.k === 'data' ? /*#__PURE__*/React.createElement("input", {
    type: "date",
    value: val.r || '',
    readOnly: readOnly,
    onChange: function onChange(e) {
      return set({
        r: e.target.value
      });
    },
    style: _objectSpread(_objectSpread({}, campoBase), {}, {
      maxWidth: 240
    })
  }) : null, q.k === 'numero' ? /*#__PURE__*/React.createElement("input", {
    type: "number",
    inputMode: "decimal",
    value: val.r == null ? '' : val.r,
    readOnly: readOnly,
    onChange: function onChange(e) {
      return set({
        r: e.target.value
      });
    },
    placeholder: "0",
    style: _objectSpread(_objectSpread({}, campoBase), {}, {
      maxWidth: 180
    })
  }) : null, q.k === 'sim_nao' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, ['Sim', 'Não'].map(function (o) {
    return /*#__PURE__*/React.createElement("button", {
      key: o,
      type: "button",
      "aria-pressed": val.r === o,
      onClick: function onClick() {
        return set({
          r: o
        });
      },
      style: _objectSpread(_objectSpread({}, pilula(val.r === o, o === 'Sim' && q.alerta ? '#E5484D' : '#1F5EFF')), {}, {
        minWidth: 92,
        justifyContent: 'center'
      })
    }, o);
  })), q.det && val.r === 'Sim' ? /*#__PURE__*/React.createElement("input", {
    value: val.d || '',
    readOnly: readOnly,
    onChange: function onChange(e) {
      return set({
        d: e.target.value
      });
    },
    placeholder: q.rotDet || 'Qual?',
    "aria-label": q.rotDet || 'Detalhe',
    style: campoBase
  }) : null) : null, q.k === 'escolha_unica' || q.k === 'multipla_escolha' ? /*#__PURE__*/React.createElement(React.Fragment, null, q.k === 'multipla_escolha' ? /*#__PURE__*/React.createElement("span", {
    style: _objectSpread(_objectSpread({}, lbl), {}, {
      fontSize: 11
    })
  }, "Marque todas que se aplicam") : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8
    }
  }, ops.map(function (o) {
    var on = q.k === 'multipla_escolha' ? multi.includes(o) : val.r === o;
    return /*#__PURE__*/React.createElement("button", {
      key: o,
      type: "button",
      "aria-pressed": on,
      onClick: function onClick() {
        return q.k === 'multipla_escolha' ? toggleMulti(o) : set({
          r: o
        });
      },
      style: pilula(on)
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 18,
        height: 18,
        flexShrink: 0,
        borderRadius: q.k === 'multipla_escolha' ? 6 : '50%',
        border: on ? '5px solid currentColor' : '2px solid rgba(150,175,210,.8)',
        boxSizing: 'border-box',
        background: '#fff'
      }
    }), o);
  })), (q.k === 'multipla_escolha' ? multi.includes('Outro') : val.r === 'Outro') ? /*#__PURE__*/React.createElement("input", {
    value: val.o || '',
    readOnly: readOnly,
    onChange: function onChange(e) {
      return set({
        o: e.target.value
      });
    },
    placeholder: "Qual?",
    style: campoBase
  }) : null) : null, faltando ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: '#C2272D',
      fontWeight: 500
    }
  }, "Responda esta pergunta para continuar.") : null);
}
function AnamneseForm(_ref5) {
  var blocos = _ref5.blocos,
    vals = _ref5.vals,
    setVals = _ref5.setVals,
    _ref5$faltando = _ref5.faltando,
    faltando = _ref5$faltando === void 0 ? [] : _ref5$faltando,
    readOnly = _ref5.readOnly;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, blocos.map(function (b) {
    return /*#__PURE__*/React.createElement("section", {
      key: b.id,
      style: _objectSpread(_objectSpread({}, soft), {}, {
        background: 'rgba(255,255,255,.85)',
        padding: 18,
        display: 'flex',
        flexDirection: 'column',
        gap: 18
      })
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 34,
        height: 34,
        borderRadius: 11,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(31,94,255,.1)',
        color: '#1F5EFF',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(OIcon, {
      name: b.icone || 'clipboard-list',
      size: 17
    })), /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: 0,
        fontSize: 16,
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, b.titulo)), b.qs.map(function (q) {
      return /*#__PURE__*/React.createElement(CampoPergunta, {
        key: q.id,
        q: q,
        v: vals[q.id],
        faltando: faltando.includes(q.id),
        readOnly: readOnly,
        onChange: function onChange(nv) {
          return setVals(function (x) {
            return _objectSpread(_objectSpread({}, x), {}, _defineProperty({}, q.id, nv));
          });
        }
      });
    }));
  }));
}
var ASS_W = 320,
  ASS_H = 120;
function AssinaturaPad(_ref6) {
  var tracos = _ref6.tracos,
    onChange = _ref6.onChange;
  var ref = React.useRef(null),
    cur = React.useRef(null);
  var desenhar = function desenhar() {
    var c = ref.current;
    if (!c) return;
    var r = c.getBoundingClientRect();
    var dpr = window.devicePixelRatio || 1;
    c.width = Math.round(r.width * dpr);
    c.height = Math.round(r.height * dpr);
    var g = c.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.lineWidth = 2.4;
    g.lineCap = 'round';
    g.lineJoin = 'round';
    g.strokeStyle = '#0E2350';
    (tracos || []).concat(cur.current ? [cur.current] : []).forEach(function (s) {
      g.beginPath();
      s.forEach(function (_ref7, i) {
        var _ref8 = _slicedToArray(_ref7, 2),
          x = _ref8[0],
          y = _ref8[1];
        var px = x / ASS_W * r.width,
          py = y / ASS_H * r.height;
        if (i) g.lineTo(px, py);else g.moveTo(px, py);
      });
      if (s.length === 1) g.lineTo(s[0][0] / ASS_W * r.width + 0.5, s[0][1] / ASS_H * r.height);
      g.stroke();
    });
  };
  React.useEffect(desenhar, [tracos]);
  React.useEffect(function () {
    window.addEventListener('resize', desenhar);
    return function () {
      return window.removeEventListener('resize', desenhar);
    };
  });
  var pt = function pt(e) {
    var r = ref.current.getBoundingClientRect();
    return [Math.round((e.clientX - r.left) / r.width * ASS_W * 10) / 10, Math.round((e.clientY - r.top) / r.height * ASS_H * 10) / 10];
  };
  var vazio = !(tracos && tracos.length);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 16,
      border: '1.5px dashed rgba(31,94,255,.45)',
      background: '#fff',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: ref,
    "aria-label": "Quadro de assinatura",
    onPointerDown: function onPointerDown(e) {
      e.preventDefault();
      try {
        ref.current.setPointerCapture(e.pointerId);
      } catch (x) {}
      cur.current = [pt(e)];
      desenhar();
    },
    onPointerMove: function onPointerMove(e) {
      if (!cur.current) return;
      var p = pt(e),
        u = cur.current[cur.current.length - 1];
      if (Math.hypot(p[0] - u[0], p[1] - u[1]) > 0.8) {
        cur.current.push(p);
        desenhar();
      }
    },
    onPointerUp: function onPointerUp() {
      if (cur.current) {
        var s = cur.current;
        cur.current = null;
        onChange([].concat(_toConsumableArray(tracos || []), [s]));
      }
    },
    onPointerCancel: function onPointerCancel() {
      cur.current = null;
      desenhar();
    },
    style: {
      display: 'block',
      width: '100%',
      height: 150,
      touchAction: 'none',
      cursor: 'crosshair'
    }
  }), vazio ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      pointerEvents: 'none',
      color: 'var(--text-subtle, #9AA8C0)',
      fontSize: 14
    }
  }, "Assine aqui com o dedo ou o mouse") : null, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 18,
      right: 18,
      bottom: 30,
      borderBottom: '1px solid rgba(150,175,210,.6)',
      pointerEvents: 'none'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, "Use o dedo no celular ou o mouse no computador."), /*#__PURE__*/React.createElement("button", {
    type: "button",
    disabled: vazio,
    onClick: function onClick() {
      return onChange([]);
    },
    style: _objectSpread(_objectSpread({}, linkBtn), {}, {
      opacity: vazio ? 0.4 : 1
    })
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "eraser",
    size: 14
  }), "Limpar")));
}
function AssinaturaSvg(_ref9) {
  var a = _ref9.a,
    _ref9$altura = _ref9.altura,
    altura = _ref9$altura === void 0 ? 70 : _ref9$altura;
  if (!a || !a.tracos) return null;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 ".concat(a.w || ASS_W, " ").concat(a.h || ASS_H),
    style: {
      height: altura,
      width: 'auto',
      maxWidth: '100%',
      display: 'block'
    },
    "aria-label": "Assinatura"
  }, a.tracos.map(function (t, i) {
    return /*#__PURE__*/React.createElement("polyline", {
      key: i,
      points: t.map(function (p) {
        return p.join(',');
      }).join(' '),
      fill: "none",
      stroke: "#0E2350",
      strokeWidth: "2.4",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    });
  }));
}

/* ---------- Preenchimento: página do paciente, preencher junto, preencher para assinar e prévia ---------- */
// modo: 'paciente' (link), 'presencial' (na clínica, com assinatura), 'equipe' (a clínica preenche e envia para assinar), 'previa'
function AnamnesePreenchimento(_ref0) {
  var dados = _ref0.dados,
    token = _ref0.token,
    modo = _ref0.modo,
    onFim = _ref0.onFim,
    onFechar = _ref0.onFechar;
  var blocos = dados.blocosTela || blocosDePublica(dados);
  var pedeAss = dados.exige_assinatura !== false && modo !== 'equipe';
  var _React$useState = React.useState(function () {
      return dados.rascunho && _typeof(dados.rascunho) === 'object' ? dados.rascunho : {};
    }),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    vals = _React$useState2[0],
    setVals = _React$useState2[1];
  var _React$useState3 = React.useState({
      nome: '',
      cpf: '',
      tracos: [],
      aceite: false
    }),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    ass = _React$useState4[0],
    setAss = _React$useState4[1];
  var _React$useState5 = React.useState([]),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    faltando = _React$useState6[0],
    setFaltando = _React$useState6[1];
  var _React$useState7 = React.useState(''),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    erroAss = _React$useState8[0],
    setErroAss = _React$useState8[1];
  var _React$useState9 = React.useState(false),
    _React$useState0 = _slicedToArray(_React$useState9, 2),
    enviando = _React$useState0[0],
    setEnviando = _React$useState0[1];
  var _React$useState1 = React.useState(null),
    _React$useState10 = _slicedToArray(_React$useState1, 2),
    salvoEm = _React$useState10[0],
    setSalvoEm = _React$useState10[1];
  var sujo = React.useRef(false),
    topo = React.useRef(null);
  var total = blocos.reduce(function (a, b) {
    return a + b.qs.filter(respondivel).length;
  }, 0);
  var feitas = blocos.reduce(function (a, b) {
    return a + b.qs.filter(function (q) {
      return respondivel(q) && respondida(q, vals[q.id]);
    }).length;
  }, 0);
  var pct = total ? Math.round(feitas / total * 100) : 100;
  // rascunho no servidor: o paciente pode fechar e continuar depois
  React.useEffect(function () {
    if (!sujo.current) {
      sujo.current = true;
      return;
    }
    if (!SB_ON || !token || modo === 'previa') return;
    var t = setTimeout(function () {
      AnamSvc.rascunho(token, vals).then(function () {
        return setSalvoEm(new Date());
      })["catch"](function () {});
    }, 2200);
    return function () {
      return clearTimeout(t);
    };
  }, [vals]);
  var validar = function validar() {
    var f = [];
    blocos.forEach(function (b) {
      return b.qs.forEach(function (q) {
        if (respondivel(q) && q.obrig && !respondida(q, vals[q.id])) f.push(q.id);
      });
    });
    setFaltando(f);
    if (f.length) {
      var el0 = document.querySelector('[data-pergunta="' + f[0] + '"]');
      if (el0) el0.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      return false;
    }
    if (pedeAss) {
      var e = !ass.nome.trim() ? 'Escreva seu nome completo.' : onlyDigits(ass.cpf).length !== 11 ? 'Informe um CPF com 11 números.' : !ass.tracos.length ? 'Faça sua assinatura no quadro.' : !ass.aceite ? 'Marque a confirmação para enviar.' : '';
      setErroAss(e);
      if (e) return false;
    }
    return true;
  };
  React.useEffect(function () {
    if (faltando.length) setFaltando(function (f) {
      return f.filter(function (id) {
        var q = blocos.reduce(function (a, b) {
          return a.concat(b.qs);
        }, []).find(function (x) {
          return x.id === id;
        });
        return q && !respondida(q, vals[id]);
      });
    });
  }, [vals]);
  var enviar = /*#__PURE__*/function () {
    var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
      var assinatura, localAss, m, _t, _t2;
      return _regenerator().w(function (_context9) {
        while (1) switch (_context9.p = _context9.n) {
          case 0:
            if (!(modo === 'previa')) {
              _context9.n = 1;
              break;
            }
            return _context9.a(2);
          case 1:
            if (!(modo === 'equipe')) {
              _context9.n = 6;
              break;
            }
            setEnviando(true);
            _context9.p = 2;
            if (!(SB_ON && token)) {
              _context9.n = 3;
              break;
            }
            _context9.n = 3;
            return AnamSvc.rascunho(token, vals);
          case 3:
            onFim({
              vals: vals
            });
            _context9.n = 5;
            break;
          case 4:
            _context9.p = 4;
            _t = _context9.v;
            avisoErro('Não foi possível salvar as respostas', _t);
          case 5:
            setEnviando(false);
            return _context9.a(2);
          case 6:
            if (validar()) {
              _context9.n = 7;
              break;
            }
            return _context9.a(2);
          case 7:
            _context9.n = 7.5;
            return pedeAss ? Promise.race([anamPedirLocal(), new Promise(function (r) {
              return setTimeout(function () {
                return r(null);
              }, 6000);
            })]) : null;
          case 7.5:
            localAss = _context9.v;
            assinatura = pedeAss ? {
              local: localAss || {
                status: 'tempo_esgotado'
              },
              nome: ass.nome.trim(),
              cpf: onlyDigits(ass.cpf),
              aceite: true,
              w: ASS_W,
              h: ASS_H,
              tracos: ass.tracos,
              declaracao: (dados.declaracao || DECLARACAO_PADRAO) + ' ' + ACEITE_ASSINATURA
            } : null;
            setEnviando(true);
            _context9.p = 8;
            if (!(SB_ON && token)) {
              _context9.n = 9;
              break;
            }
            _context9.n = 9;
            return AnamSvc.responder(token, blocos, vals, assinatura);
          case 9:
            onFim({
              vals: vals,
              assinatura: assinatura,
              answers: respostasLocais(blocos, vals)
            });
            _context9.n = 11;
            break;
          case 10:
            _context9.p = 10;
            _t2 = _context9.v;
            m = String(_t2 && _t2.message || '');
            setErroAss(m.replace(/^.*?Responda:/, 'Responda: ') || 'Não foi possível enviar. Tente de novo.');
          case 11:
            setEnviando(false);
          case 12:
            return _context9.a(2);
        }
      }, _callee9, null, [[8, 10], [2, 4]]);
    }));
    return function enviar() {
      return _ref1.apply(this, arguments);
    };
  }();
  var paciente = modo === 'paciente';
  return /*#__PURE__*/React.createElement("div", {
    ref: topo,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 2,
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 14px',
      borderRadius: 999,
      background: 'rgba(255,255,255,.92)',
      border: '1.5px solid rgba(255,255,255,.95)',
      boxShadow: '0 10px 24px -18px rgba(23,73,170,.5)',
      backdropFilter: 'blur(6px)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 8,
      borderRadius: 999,
      background: 'rgba(150,175,210,.3)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: pct + '%',
      height: '100%',
      borderRadius: 999,
      background: 'linear-gradient(90deg,#0B4BEB,#1FA8F5)',
      transition: 'width .3s'
    }
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--text-strong)',
      whiteSpace: 'nowrap',
      fontVariantNumeric: 'tabular-nums'
    }
  }, feitas, " de ", total), salvoEm ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: '#2DBF6A',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "check",
    size: 13
  }), "Salvo") : null), paciente && dados.modo === 'assinar' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      padding: '12px 14px',
      borderRadius: 16,
      background: 'rgba(45,191,106,.1)',
      color: 'var(--text-body)',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#2DBF6A',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "clipboard-check",
    size: 18
  })), "A cl\xEDnica j\xE1 preencheu com voc\xEA. Confira as respostas e assine no final.") : null, modo === 'equipe' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      padding: '12px 14px',
      borderRadius: 16,
      background: 'rgba(31,94,255,.07)',
      color: 'var(--text-body)',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#1F5EFF',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "pen-line",
    size: 18
  })), "Preencha com o paciente. Depois ele recebe o link s\xF3 para conferir e assinar.") : null, modo === 'previa' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      padding: '12px 14px',
      borderRadius: 16,
      background: 'rgba(245,180,0,.12)',
      color: 'var(--text-body)',
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#B98400',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "eye",
    size: 18
  })), "Pr\xE9via: \xE9 assim que o paciente v\xEA. Nada do que voc\xEA marcar aqui \xE9 salvo.") : null, /*#__PURE__*/React.createElement(AnamneseForm, {
    blocos: blocos,
    vals: vals,
    setVals: setVals,
    faltando: faltando
  }), pedeAss ? /*#__PURE__*/React.createElement("section", {
    style: _objectSpread(_objectSpread({}, soft), {}, {
      background: 'rgba(255,255,255,.85)',
      padding: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    })
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 34,
      height: 34,
      borderRadius: 11,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(31,94,255,.1)',
      color: '#1F5EFF',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "signature",
    size: 17
  })), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Assinatura e confirma\xE7\xE3o")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '12px 14px',
      borderRadius: 14,
      background: 'rgba(31,94,255,.06)',
      fontSize: 14,
      color: 'var(--text-body)',
      lineHeight: 1.5
    }
  }, /*#__PURE__*/React.createElement("b", null, "Declara\xE7\xE3o:"), " ", dados.declaracao || DECLARACAO_PADRAO), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-strong)'
    }
  }, "Nome completo *"), /*#__PURE__*/React.createElement("input", {
    value: ass.nome,
    onChange: function onChange(e) {
      return setAss(_objectSpread(_objectSpread({}, ass), {}, {
        nome: e.target.value
      }));
    },
    placeholder: "Seu nome como no documento",
    autoComplete: "name",
    style: campoBase
  })), /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-strong)'
    }
  }, "CPF *"), /*#__PURE__*/React.createElement("input", {
    value: ass.cpf,
    onChange: function onChange(e) {
      return setAss(_objectSpread(_objectSpread({}, ass), {}, {
        cpf: cpfMascara(e.target.value)
      }));
    },
    placeholder: "000.000.000-00",
    inputMode: "numeric",
    style: campoBase
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-strong)'
    }
  }, "Assinatura *"), /*#__PURE__*/React.createElement(AssinaturaPad, {
    tracos: ass.tracos,
    onChange: function onChange(t) {
      if (modo !== 'previa') anamPedirLocal();
      return setAss(_objectSpread(_objectSpread({}, ass), {}, {
        tracos: t
      }));
    }
  })), /*#__PURE__*/React.createElement(OCheck, {
    checked: ass.aceite,
    onChange: function onChange(v) {
      if (v && modo !== 'previa') anamPedirLocal();
      return setAss(_objectSpread(_objectSpread({}, ass), {}, {
        aceite: v
      }));
    },
    label: ACEITE_ASSINATURA
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      lineHeight: 1.5,
      color: 'var(--text-muted)'
    }
  }, "Para validar a assinatura, registramos data, hora, IP e o local do aparelho (o navegador vai pedir sua permiss\xE3o).")) : null, erroAss ? /*#__PURE__*/React.createElement("div", {
    role: "alert",
    style: {
      padding: '10px 14px',
      borderRadius: 14,
      background: 'rgba(229,72,77,.08)',
      color: '#C2272D',
      fontSize: 14,
      fontWeight: 500
    }
  }, erroAss) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      justifyContent: 'flex-end',
      flexWrap: 'wrap'
    }
  }, onFechar ? /*#__PURE__*/React.createElement(OBtn, {
    variant: "secondary",
    onClick: onFechar
  }, modo === 'previa' ? 'Fechar prévia' : 'Cancelar') : null, modo !== 'previa' ? /*#__PURE__*/React.createElement(OBtn, {
    iconLeft: modo === 'equipe' ? 'send' : 'check',
    loading: enviando,
    onClick: enviar,
    fullWidth: paciente
  }, modo === 'equipe' ? 'Enviar para o paciente assinar' : 'Finalizar e enviar') : null), pedeAss && modo !== 'previa' ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 12,
      color: 'var(--text-muted)',
      textAlign: 'center',
      lineHeight: 1.5
    }
  }, "Seus dados s\xE3o protegidos pela LGPD e s\xF3 a cl\xEDnica tem acesso. Registramos data, hora e IP deste envio, o que d\xE1 validade jur\xEDdica \xE0 assinatura.") : null);
}

/* ---------- Página pública (o paciente abre sem login) ---------- */
function MoldePublico(_ref10) {
  var children = _ref10.children,
    clinica = _ref10.clinica;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #F3F8FF 0%, #E9F1FC 100%)',
      fontFamily: 'var(--font-sans)',
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720,
      margin: '0 auto',
      padding: '22px 16px 40px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      boxSizing: 'border-box'
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
      background: 'linear-gradient(180deg,#5AA2FF 0%,#0A5CFF 42%,#0A7BFF 70%,#2FD3FF 100%)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 10px 20px -12px rgba(10,92,255,.8)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "building-2",
    size: 20
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 17,
      fontWeight: 700,
      color: 'var(--text-strong)'
    }
  }, clinica || 'Sua clínica'), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, "Atendimento com a plataforma Salute IA"))), children));
}
function AvisoPublico(_ref11) {
  var icone = _ref11.icone,
    _ref11$cor = _ref11.cor,
    cor = _ref11$cor === void 0 ? '#1F5EFF' : _ref11$cor,
    titulo = _ref11.titulo,
    texto = _ref11.texto,
    children = _ref11.children;
  return /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, soft), {}, {
      background: 'rgba(255,255,255,.9)',
      padding: '34px 22px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12,
      textAlign: 'center'
    })
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 60,
      height: 60,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: "color-mix(in srgb, ".concat(cor, " 12%, white)"),
      color: cor
    }
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: icone,
    size: 28
  })), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 21,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, titulo), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 15,
      lineHeight: 1.55,
      maxWidth: 440
    }
  }, texto), children);
}
function PaginaAnamnese(_ref12) {
  var token = _ref12.token;
  var _React$useState11 = React.useState(null),
    _React$useState12 = _slicedToArray(_React$useState11, 2),
    d = _React$useState12[0],
    setD = _React$useState12[1];
  var _React$useState13 = React.useState(null),
    _React$useState14 = _slicedToArray(_React$useState13, 2),
    fim = _React$useState14[0],
    setFim = _React$useState14[1];
  var carregarPag = function carregarPag() {
    setD(null);
    if (!SB_ON) {
      setD({
        status: 'demo'
      });
      return;
    }
    AnamSvc.publica(token).then(setD)["catch"](function () {
      return setD({
        status: 'erro'
      });
    });
  };
  React.useEffect(carregarPag, [token]);
  React.useEffect(function () {
    document.title = 'Anamnese' + (d && d.clinica ? ' · ' + d.clinica : '');
  }, [d]);
  if (!d) return /*#__PURE__*/React.createElement(MoldePublico, null, /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, soft), {}, {
      padding: 40,
      display: 'flex',
      justifyContent: 'center'
    })
  }, /*#__PURE__*/React.createElement(CargaEstado, {
    estado: "carregando",
    compact: true
  })));
  if (fim || d.status === 'respondido') return /*#__PURE__*/React.createElement(MoldePublico, {
    clinica: d.clinica
  }, /*#__PURE__*/React.createElement(AvisoPublico, {
    icone: "circle-check",
    cor: "#2DBF6A",
    titulo: 'Obrigado' + (d.paciente ? ', ' + d.paciente : '') + '!',
    texto: "Recebemos suas respostas e a sua assinatura. Elas j\xE1 est\xE3o no seu prontu\xE1rio e a equipe vai ler antes do atendimento."
  }, d.codigo ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, "C\xF3digo de confer\xEAncia: ", /*#__PURE__*/React.createElement("b", {
    style: {
      letterSpacing: '.08em'
    }
  }, d.codigo)) : null));
  if (d.status === 'expirado') return /*#__PURE__*/React.createElement(MoldePublico, {
    clinica: d.clinica
  }, /*#__PURE__*/React.createElement(AvisoPublico, {
    icone: "clock",
    cor: "#F2694A",
    titulo: "Este link venceu",
    texto: "Por seguran\xE7a, o link da anamnese vale por 7 dias. Pe\xE7a para a cl\xEDnica enviar um novo pelo WhatsApp."
  }));
  if (d.status === 'cancelado') return /*#__PURE__*/React.createElement(MoldePublico, {
    clinica: d.clinica
  }, /*#__PURE__*/React.createElement(AvisoPublico, {
    icone: "ban",
    cor: "#E5484D",
    titulo: "Este link foi cancelado",
    texto: "A cl\xEDnica cancelou este envio. Se ainda precisar responder, pe\xE7a um novo link."
  }));
  if (d.status !== 'aguardando') return /*#__PURE__*/React.createElement(MoldePublico, null, /*#__PURE__*/React.createElement(AvisoPublico, {
    icone: "link-2-off",
    cor: "#E5484D",
    titulo: "Link inv\xE1lido",
    texto: d.status === 'demo' ? 'Esta é a versão de demonstração. No sistema conectado, o paciente responde a anamnese por este endereço.' : d.status === 'erro' ? 'Não foi possível abrir agora. Verifique sua internet e tente de novo.' : 'Não encontramos esta anamnese. Confira se o link está completo ou peça um novo para a clínica.'
  }, d.status === 'erro' ? /*#__PURE__*/React.createElement(OBtn, {
    iconLeft: "refresh-cw",
    onClick: carregarPag
  }, "Tentar de novo") : null));
  return /*#__PURE__*/React.createElement(MoldePublico, {
    clinica: d.clinica
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      alignSelf: 'flex-start',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 28,
      padding: '0 12px',
      borderRadius: 999,
      background: 'rgba(31,94,255,.1)',
      color: '#1F5EFF',
      fontSize: 13,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "clipboard-list",
    size: 14
  }), "Anamnese digital"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: '4px 0 0',
      fontSize: 24,
      fontWeight: 600,
      color: 'var(--text-strong)',
      letterSpacing: '-0.01em'
    }
  }, "Ol\xE1", d.paciente ? ', ' + d.paciente : '', "!"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 15,
      lineHeight: 1.55
    }
  }, "Responda a ", /*#__PURE__*/React.createElement("b", null, d.modelo), " antes do seu atendimento. O que voc\xEA responder fica salvo: pode fechar e continuar depois pelo mesmo link."), d.expira_em ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, "Link v\xE1lido at\xE9 ", dataHoraBR(d.expira_em), ".") : null), /*#__PURE__*/React.createElement(AnamnesePreenchimento, {
    dados: d,
    token: token,
    modo: "paciente",
    onFim: function onFim(r) {
      setFim(r);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      AnamSvc.publica(token).then(function (x) {
        return setD(x);
      })["catch"](function () {});
    }
  }));
}

/* ---------- Página pública de envio de documentos ---------- */
function PaginaEnvioDocs(_ref13) {
  var token = _ref13.token;
  var _React$useState15 = React.useState(null),
    _React$useState16 = _slicedToArray(_React$useState15, 2),
    d = _React$useState16[0],
    setD = _React$useState16[1];
  var _React$useState17 = React.useState([]),
    _React$useState18 = _slicedToArray(_React$useState17, 2),
    enviados = _React$useState18[0],
    setEnviados = _React$useState18[1];
  var _React$useState19 = React.useState(0),
    _React$useState20 = _slicedToArray(_React$useState19, 2),
    enviando = _React$useState20[0],
    setEnviando = _React$useState20[1];
  var camRef = React.useRef(null),
    arqRef = React.useRef(null);
  React.useEffect(function () {
    if (!SB_ON) {
      setD({
        status: 'demo'
      });
      return;
    }
    SB.rpc('link_documentos_publico', {
      p_token: token
    }).then(function (_ref14) {
      var data = _ref14.data,
        error = _ref14.error;
      return setD(error ? {
        status: 'erro'
      } : data);
    });
  }, [token]);
  React.useEffect(function () {
    document.title = 'Enviar documentos' + (d && d.clinica ? ' · ' + d.clinica : '');
  }, [d]);
  var subir = /*#__PURE__*/function () {
    var _ref15 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(fs) {
      var arr, _loop, _i, _arr;
      return _regenerator().w(function (_context1) {
        while (1) switch (_context1.n) {
          case 0:
            arr = Array.from(fs || []);
            if (arr.length) {
              _context1.n = 1;
              break;
            }
            return _context1.a(2);
          case 1:
            setEnviando(function (n) {
              return n + arr.length;
            });
            _loop = /*#__PURE__*/_regenerator().m(function _loop() {
              var f, path, up, _yield$SB$rpc5, error, _t3;
              return _regenerator().w(function (_context0) {
                while (1) switch (_context0.p = _context0.n) {
                  case 0:
                    f = _arr[_i];
                    path = d.pasta_upload + '/' + Date.now() + '-' + nomeSeguro(f.name);
                    _context0.p = 1;
                    _context0.n = 2;
                    return SB.storage.from('prontuario').upload(path, f, {
                      contentType: f.type || 'application/octet-stream',
                      upsert: false
                    });
                  case 2:
                    up = _context0.v;
                    if (!up.error) {
                      _context0.n = 3;
                      break;
                    }
                    throw up.error;
                  case 3:
                    _context0.n = 4;
                    return SB.rpc('registrar_documento_link', {
                      p_token: token,
                      p_path: path,
                      p_nome: f.name,
                      p_mime: f.type || 'application/octet-stream',
                      p_tamanho: f.size
                    });
                  case 4:
                    _yield$SB$rpc5 = _context0.v;
                    error = _yield$SB$rpc5.error;
                    if (!error) {
                      _context0.n = 5;
                      break;
                    }
                    throw error;
                  case 5:
                    setEnviados(function (l) {
                      return [].concat(_toConsumableArray(l), [{
                        nome: f.name,
                        ok: true,
                        url: f.type.startsWith('image/') ? URL.createObjectURL(f) : null
                      }]);
                    });
                    _context0.n = 7;
                    break;
                  case 6:
                    _context0.p = 6;
                    _t3 = _context0.v;
                    setEnviados(function (l) {
                      return [].concat(_toConsumableArray(l), [{
                        nome: f.name,
                        ok: false
                      }]);
                    });
                  case 7:
                    setEnviando(function (n) {
                      return n - 1;
                    });
                  case 8:
                    return _context0.a(2);
                }
              }, _loop, null, [[1, 6]]);
            });
            _i = 0, _arr = arr;
          case 2:
            if (!(_i < _arr.length)) {
              _context1.n = 4;
              break;
            }
            return _context1.d(_regeneratorValues(_loop()), 3);
          case 3:
            _i++;
            _context1.n = 2;
            break;
          case 4:
            return _context1.a(2);
        }
      }, _callee0);
    }));
    return function subir(_x) {
      return _ref15.apply(this, arguments);
    };
  }();
  if (!d) return /*#__PURE__*/React.createElement(MoldePublico, null, /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, soft), {}, {
      padding: 40,
      display: 'flex',
      justifyContent: 'center'
    })
  }, /*#__PURE__*/React.createElement(CargaEstado, {
    estado: "carregando",
    compact: true
  })));
  if (!['aguardando', 'recebido'].includes(d.status)) return /*#__PURE__*/React.createElement(MoldePublico, {
    clinica: d.clinica
  }, /*#__PURE__*/React.createElement(AvisoPublico, {
    icone: d.status === 'expirado' ? 'clock' : 'link-2-off',
    cor: "#F2694A",
    titulo: d.status === 'expirado' ? 'Este link venceu' : 'Link inválido',
    texto: d.status === 'expirado' ? 'O link para enviar arquivos vale por 24 horas. Peça um novo para a clínica.' : d.status === 'demo' ? 'Esta é a versão de demonstração. No sistema conectado, o paciente envia as fotos por este endereço.' : 'Não encontramos este link. Confira se ele está completo.'
  }));
  return /*#__PURE__*/React.createElement(MoldePublico, {
    clinica: d.clinica
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 24,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Envie suas fotos e documentos"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 15,
      lineHeight: 1.55
    }
  }, "Eles v\xE3o direto para o seu prontu\xE1rio", d.pasta ? /*#__PURE__*/React.createElement(React.Fragment, null, ", na pasta ", /*#__PURE__*/React.createElement("b", null, d.pasta)) : null, ". S\xF3 a cl\xEDnica tem acesso.")), /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, soft), {}, {
      background: 'rgba(255,255,255,.88)',
      padding: 18,
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: 10
    })
  }, /*#__PURE__*/React.createElement(OBtn, {
    iconLeft: "camera",
    size: "lg",
    onClick: function onClick() {
      return camRef.current && camRef.current.click();
    }
  }, "Tirar foto"), /*#__PURE__*/React.createElement(OBtn, {
    iconLeft: "image-up",
    size: "lg",
    variant: "secondary",
    onClick: function onClick() {
      return arqRef.current && arqRef.current.click();
    }
  }, "Galeria ou arquivos"), /*#__PURE__*/React.createElement("input", {
    ref: camRef,
    type: "file",
    accept: "image/*",
    capture: "environment",
    style: {
      display: 'none'
    },
    onChange: function onChange(e) {
      subir(e.target.files);
      e.target.value = '';
    }
  }), /*#__PURE__*/React.createElement("input", {
    ref: arqRef,
    type: "file",
    accept: "image/*,.pdf",
    multiple: true,
    style: {
      display: 'none'
    },
    onChange: function onChange(e) {
      subir(e.target.files);
      e.target.value = '';
    }
  })), enviando ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: 'var(--text-muted)',
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "loader",
    size: 16
  }), "Enviando ", enviando, " ", enviando === 1 ? 'arquivo' : 'arquivos', "...") : null, enviados.length ? /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, soft), {}, {
      background: 'rgba(255,255,255,.88)',
      padding: 14,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    })
  }, enviados.map(function (x, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 44,
        height: 44,
        borderRadius: 10,
        overflow: 'hidden',
        background: '#F4F7FC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        color: '#1F5EFF'
      }
    }, x.url ? /*#__PURE__*/React.createElement("img", {
      src: x.url,
      alt: "",
      style: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      }
    }) : /*#__PURE__*/React.createElement(OIcon, {
      name: "file-text",
      size: 18
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0,
        fontSize: 14,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      }
    }, x.nome), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: x.ok ? '#2DBF6A' : '#E5484D',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4
      }
    }, /*#__PURE__*/React.createElement(OIcon, {
      name: x.ok ? 'check' : 'x',
      size: 14
    }), x.ok ? 'Enviado' : 'Falhou'));
  })) : null);
}

/* ---------- Raiz: link público ou sistema ---------- */
function rotaPublica() {
  try {
    var u = new URLSearchParams(location.search);
    if (u.get('a')) return {
      tipo: 'a',
      token: u.get('a')
    };
    if (u.get('u')) return {
      tipo: 'u',
      token: u.get('u')
    };
    var m = location.pathname.match(/\/(a|u)\/([0-9a-f]{20,})\/?$/);
    if (m) return {
      tipo: m[1],
      token: m[2]
    };
    var h = location.hash.match(/^#\/?(a|u)\/([0-9a-f]{20,})/);
    if (h) return {
      tipo: h[1],
      token: h[2]
    };
  } catch (e) {}
  return null;
}
function RaizSalute() {
  var r = React.useMemo(rotaPublica, []);
  if (r && r.tipo === 'a') return /*#__PURE__*/React.createElement(PaginaAnamnese, {
    token: r.token
  });
  if (r && r.tipo === 'u') return /*#__PURE__*/React.createElement(PaginaEnvioDocs, {
    token: r.token
  });
  return /*#__PURE__*/React.createElement(PortaSupabase, null, /*#__PURE__*/React.createElement(App, null));
}

/* ---------- Janela de preenchimento dentro do sistema ---------- */
function PreenchimentoJanela(_ref16) {
  var titulo = _ref16.titulo,
    subtitulo = _ref16.subtitulo,
    dados = _ref16.dados,
    token = _ref16.token,
    modo = _ref16.modo,
    onFim = _ref16.onFim,
    onFechar = _ref16.onFechar;
  return /*#__PURE__*/React.createElement(Overlay, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 320,
      background: 'rgba(14,35,80,.35)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'center',
      padding: 16
    },
    onClick: modo === 'previa' ? onFechar : undefined
  }, /*#__PURE__*/React.createElement("div", {
    onClick: function onClick(e) {
      return e.stopPropagation();
    },
    style: {
      width: 'min(760px, 100%)',
      maxHeight: '100%',
      overflowY: 'auto',
      borderRadius: 28,
      background: 'linear-gradient(180deg,#F5F9FF,#EAF2FD)',
      boxShadow: '0 30px 60px -30px rgba(23,73,170,.6)',
      padding: 22,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 20,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, titulo), subtitulo ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '2px 0 0',
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, subtitulo) : null), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Fechar",
    onClick: onFechar,
    style: _objectSpread(_objectSpread({}, fCircle), {}, {
      flexShrink: 0
    })
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "x",
    size: 18
  }))), dados ? /*#__PURE__*/React.createElement(AnamnesePreenchimento, {
    dados: dados,
    token: token,
    modo: modo,
    onFim: onFim,
    onFechar: onFechar
  }) : /*#__PURE__*/React.createElement(CargaEstado, {
    estado: "carregando",
    compact: true
  }))));
}
var dadosDoModelo = function dadosDoModelo(m, extra) {
  return _objectSpread({
    blocosTela: m.blocos,
    exige_assinatura: m.exigeAss !== false,
    declaracao: m.declaracao,
    modelo: m.nome
  }, extra || {});
};

/* ---------- Cartão do registro de anamnese no prontuário ---------- */
var ST_ANAM = {
  respondida: ['Respondida', '#2DBF6A'],
  pendente: ['Aguardando resposta', '#F5B400'],
  expirada: ['Link vencido', '#F2694A'],
  cancelada: ['Cancelada', '#8A97AE']
};
var MODO_ANAM = {
  link: 'Pelo link',
  presencial: 'Preenchida na clínica',
  assinar: 'Preenchida pela equipe, assinada pelo paciente'
};
function RespostasAnamnese(_ref17) {
  var r = _ref17.r,
    paciente = _ref17.paciente;
  var grupos = [];
  (r.answers || []).forEach(function (a) {
    var g = a[3] || 'Respostas';
    var x = grupos.find(function (y) {
      return y.t === g;
    });
    if (!x) grupos.push(x = {
      t: g,
      l: []
    });
    x.l.push(a);
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      padding: 14,
      borderRadius: 14,
      background: 'rgba(255,255,255,.8)'
    }
  }, grupos.map(function (g) {
    return /*#__PURE__*/React.createElement("div", {
      key: g.t,
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: lbl
    }, g.t), g.l.map(function (a, i) {
      return /*#__PURE__*/React.createElement("div", {
        key: i
      }, /*#__PURE__*/React.createElement("p", {
        style: {
          margin: 0,
          fontSize: 12,
          color: 'var(--text-muted)'
        }
      }, a[0]), /*#__PURE__*/React.createElement("p", {
        style: {
          margin: '2px 0 0',
          fontSize: 14,
          fontWeight: 500,
          color: a[4] ? '#C2272D' : 'var(--text-strong)'
        }
      }, a[4] ? /*#__PURE__*/React.createElement(OIcon, {
        name: "triangle-alert",
        size: 13
      }) : null, " ", a[1], a[2] ? ': ' + a[2] : ''));
    }));
  }), r.assinatura ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      paddingTop: 10,
      borderTop: '1px solid rgba(214,226,242,.9)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: lbl
  }, "Assinatura"), /*#__PURE__*/React.createElement(AssinaturaSvg, {
    a: r.assinatura,
    altura: 64
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-body)'
    }
  }, r.assinante, r.cpfAss ? ' · CPF ' + cpfOculto(r.cpfAss) : ''), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, r.assinadoEm ? 'Assinada em ' + dataHoraBR(r.assinadoEm) : '', r.ip ? ' · IP ' + r.ip : '', localAssTexto(r.local) ? ' · ' : '', localAssLink(r.local) ? /*#__PURE__*/React.createElement("a", {
    href: localAssLink(r.local),
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      color: '#1F5EFF'
    }
  }, localAssTexto(r.local)) : localAssTexto(r.local), r.codigo ? ' · Código ' + r.codigo : ''), r.declaracao ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      lineHeight: 1.5,
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      fontWeight: 600,
      color: 'var(--text-body)'
    }
  }, "Declara\xE7\xE3o aceita:"), " ", r.declaracao) : null) : null, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(OBtn, {
    size: "sm",
    variant: "secondary",
    iconLeft: "printer",
    onClick: function onClick() {
      return imprimirAnamnese(r, paciente);
    }
  }, "Imprimir ou salvar PDF")));
}
function CartaoAnamnese(_ref18) {
  var r = _ref18.r,
    paciente = _ref18.paciente,
    onAcao = _ref18.onAcao;
  var _React$useState21 = React.useState(false),
    _React$useState22 = _slicedToArray(_React$useState21, 2),
    aberto = _React$useState22[0],
    setAberto = _React$useState22[1];
  var _React$useState23 = React.useState(false),
    _React$useState24 = _slicedToArray(_React$useState23, 2),
    copiado = _React$useState24[0],
    setCopiado = _React$useState24[1];
  var st = ST_ANAM[r.status] || ST_ANAM.pendente;
  var al = (r.answers || []).filter(function (a) {
    return a[4];
  });
  var copiar = function copiar() {
    try {
      navigator.clipboard && navigator.clipboard.writeText('https://' + r.link);
    } catch (e) {}
    setCopiado(true);
    setTimeout(function () {
      return setCopiado(false);
    }, 2200);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Badge2, {
    c: st[1]
  }, st[0]), r.status === 'pendente' && r.expira ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, "vale at\xE9 ", dataHoraBR(r.expira)) : null, r.status === 'respondida' && r.modo && MODO_ANAM[r.modo] ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, MODO_ANAM[r.modo]) : null, al.map(function (a, i) {
    return /*#__PURE__*/React.createElement(Badge2, {
      key: i,
      c: "#E5484D"
    }, a[5] || 'Alerta', a[2] ? ': ' + a[2] : '');
  })), r.status === 'pendente' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: linkBtn,
    onClick: copiar
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: copiado ? 'check' : 'copy',
    size: 13
  }), copiado ? 'Copiado' : 'Copiar link'), /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: linkBtn,
    onClick: function onClick() {
      return onAcao('reenviar', r);
    }
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "send",
    size: 13
  }), "Reenviar no WhatsApp"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: linkBtn,
    onClick: function onClick() {
      return onAcao('preencher', r);
    }
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "tablet-smartphone",
    size: 13
  }), "Preencher agora"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: linkBtn,
    onClick: function onClick() {
      return onAcao('regerar', r);
    }
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "refresh-cw",
    size: 13
  }), "Gerar novo link"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: _objectSpread(_objectSpread({}, linkBtn), {}, {
      color: '#E5484D'
    }),
    onClick: function onClick() {
      return onAcao('cancelar', r);
    }
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "x",
    size: 13
  }), "Cancelar envio")) : null, r.status === 'expirada' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: linkBtn,
    onClick: function onClick() {
      return onAcao('regerar', r);
    }
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "refresh-cw",
    size: 13
  }), "Gerar novo link"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: linkBtn,
    onClick: function onClick() {
      return onAcao('preencher', r);
    }
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "tablet-smartphone",
    size: 13
  }), "Preencher agora")) : null, r.answers ? /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: linkBtn,
    onClick: function onClick() {
      return setAberto(!aberto);
    }
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: aberto ? 'chevron-up' : 'eye',
    size: 13
  }), aberto ? 'Esconder respostas' : 'Ver respostas')) : null, aberto && r.answers ? /*#__PURE__*/React.createElement(RespostasAnamnese, {
    r: r,
    paciente: paciente
  }) : null);
}
// selos de alerta no topo da ficha (alergia, gestante...)
function AlertasPaciente(_ref19) {
  var recs = _ref19.recs;
  var al = alertasDeRecs(recs);
  if (!al.length) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap',
      marginTop: 6
    }
  }, al.map(function (a) {
    return /*#__PURE__*/React.createElement("span", {
      key: a.rotulo,
      title: "Informado pelo paciente na anamnese",
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        height: 24,
        padding: '0 10px',
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        color: '#C2272D',
        background: 'rgba(229,72,77,.1)',
        border: '1px solid rgba(229,72,77,.25)'
      }
    }, /*#__PURE__*/React.createElement(OIcon, {
      name: "triangle-alert",
      size: 12
    }), a.rotulo, a.detalhe ? ': ' + a.detalhe : '');
  }));
}

/* ---------- Editor de modelo (Configurações e Prontuário) ---------- */
function EditorPergunta(_ref20) {
  var q = _ref20.q,
    i = _ref20.i,
    n = _ref20.n,
    onChange = _ref20.onChange,
    onMove = _ref20.onMove,
    onRemove = _ref20.onRemove;
  var set = function set(p) {
    return onChange(_objectSpread(_objectSpread({}, q), p));
  };
  var tg = function tg(on, label, fn) {
    return /*#__PURE__*/React.createElement("label", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        fontSize: 13,
        color: 'var(--text-body)',
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement(MiniToggle, {
      on: on,
      onChange: fn,
      label: label
    }), label);
  };
  var inl = {
    height: 38,
    borderRadius: 12,
    border: '1.5px solid rgba(214,226,242,.95)',
    background: '#fff',
    padding: '0 12px',
    fontFamily: 'inherit',
    fontSize: 14,
    color: 'var(--text-strong)',
    outline: 'none',
    minWidth: 0
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      padding: 12,
      borderRadius: 16,
      background: 'rgba(255,255,255,.8)',
      border: '1.5px solid rgba(255,255,255,.95)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 26,
      height: 26,
      borderRadius: '50%',
      background: 'rgba(31,94,255,.1)',
      color: '#1F5EFF',
      fontSize: 12,
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, i + 1), /*#__PURE__*/React.createElement("input", {
    value: q.t,
    onChange: function onChange(e) {
      return set({
        t: e.target.value
      });
    },
    placeholder: q.k === 'informativo' ? 'Texto que o paciente vai ler (instrução, aviso...)' : 'Escreva a pergunta',
    "aria-label": "Pergunta",
    style: _objectSpread(_objectSpread({}, inl), {}, {
      flex: 1,
      minWidth: 180
    })
  }), /*#__PURE__*/React.createElement("select", {
    value: q.k,
    onChange: function onChange(e) {
      var k = e.target.value;
      set({
        k: k,
        opcoes: temOpcoes(k) && !(q.opcoes || []).length ? ['', ''] : q.opcoes
      });
    },
    "aria-label": "Tipo de resposta",
    style: _objectSpread(_objectSpread({}, inl), {}, {
      width: 170,
      cursor: 'pointer'
    })
  }, TIPOS_RESP.map(function (t) {
    return /*#__PURE__*/React.createElement("option", {
      key: t.k,
      value: t.k
    }, t.l);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Subir pergunta",
    disabled: i === 0,
    onClick: function onClick() {
      return onMove(-1);
    },
    style: _objectSpread(_objectSpread({}, fCircle), {}, {
      width: 32,
      height: 32,
      opacity: i === 0 ? 0.35 : 1
    })
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "arrow-up",
    size: 14
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Descer pergunta",
    disabled: i === n - 1,
    onClick: function onClick() {
      return onMove(1);
    },
    style: _objectSpread(_objectSpread({}, fCircle), {}, {
      width: 32,
      height: 32,
      opacity: i === n - 1 ? 0.35 : 1
    })
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "arrow-down",
    size: 14
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Remover pergunta",
    onClick: onRemove,
    style: _objectSpread(_objectSpread({}, fCircle), {}, {
      width: 32,
      height: 32
    })
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "trash-2",
    size: 14
  })))), q.k !== 'informativo' ? /*#__PURE__*/React.createElement("input", {
    value: q.desc,
    onChange: function onChange(e) {
      return set({
        desc: e.target.value
      });
    },
    placeholder: "Ajuda para o paciente (opcional)",
    "aria-label": "Descri\xE7\xE3o",
    style: _objectSpread(_objectSpread({}, inl), {}, {
      marginLeft: 34
    })
  }) : null, temOpcoes(q.k) ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      marginLeft: 34
    }
  }, (q.opcoes || []).map(function (o, j) {
    return /*#__PURE__*/React.createElement("div", {
      key: j,
      style: {
        display: 'flex',
        gap: 6,
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 16,
        height: 16,
        borderRadius: q.k === 'multipla_escolha' ? 5 : '50%',
        border: '2px solid rgba(150,175,210,.8)',
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("input", {
      value: o,
      onChange: function onChange(e) {
        return set({
          opcoes: q.opcoes.map(function (x, y) {
            return y === j ? e.target.value : x;
          })
        });
      },
      placeholder: 'Opção ' + (j + 1),
      style: _objectSpread(_objectSpread({}, inl), {}, {
        flex: 1
      })
    }), /*#__PURE__*/React.createElement("button", {
      type: "button",
      "aria-label": "Remover op\xE7\xE3o",
      onClick: function onClick() {
        return set({
          opcoes: q.opcoes.filter(function (_, y) {
            return y !== j;
          })
        });
      },
      style: _objectSpread(_objectSpread({}, fCircle), {}, {
        width: 30,
        height: 30
      })
    }, /*#__PURE__*/React.createElement(OIcon, {
      name: "x",
      size: 13
    })));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: linkBtn,
    onClick: function onClick() {
      return set({
        opcoes: [].concat(_toConsumableArray(q.opcoes || []), [''])
      });
    }
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "plus",
    size: 13
  }), "Op\xE7\xE3o"), tg(q.outro, 'Permitir "Outro" com texto', function (v) {
    return set({
      outro: v
    });
  }))) : null, q.k === 'sim_nao' ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginLeft: 34
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, tg(q.det, 'Se Sim, pedir detalhe', function (v) {
    return set({
      det: v
    });
  }), q.det ? /*#__PURE__*/React.createElement("input", {
    value: q.rotDet,
    onChange: function onChange(e) {
      return set({
        rotDet: e.target.value
      });
    },
    placeholder: "Ex.: Qual?",
    style: _objectSpread(_objectSpread({}, inl), {}, {
      width: 200
    })
  }) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, tg(q.alerta, 'Se Sim, mostrar alerta na ficha', function (v) {
    return set({
      alerta: v
    });
  }), q.alerta ? /*#__PURE__*/React.createElement("input", {
    value: q.rotAlerta,
    onChange: function onChange(e) {
      return set({
        rotAlerta: e.target.value
      });
    },
    placeholder: "Nome do alerta (ex.: Alergia)",
    style: _objectSpread(_objectSpread({}, inl), {}, {
      width: 230
    })
  }) : null)) : null, q.k !== 'informativo' ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 34
    }
  }, tg(q.obrig, 'Obrigatória', function (v) {
    return set({
      obrig: v
    });
  })) : null);
}
function AnamneseEditor(_ref21) {
  var inicial = _ref21.inicial,
    onSalvar = _ref21.onSalvar,
    onCancelar = _ref21.onCancelar,
    mobile = _ref21.mobile,
    salvando = _ref21.salvando;
  var _React$useState25 = React.useState(function () {
      return JSON.parse(JSON.stringify(inicial));
    }),
    _React$useState26 = _slicedToArray(_React$useState25, 2),
    ed = _React$useState26[0],
    setEd = _React$useState26[1];
  var _React$useState27 = React.useState(''),
    _React$useState28 = _slicedToArray(_React$useState27, 2),
    erro = _React$useState28[0],
    setErro = _React$useState28[1];
  var _React$useState29 = React.useState(false),
    _React$useState30 = _slicedToArray(_React$useState29, 2),
    previa = _React$useState30[0],
    setPrevia = _React$useState30[1];
  var setB = function setB(i, p) {
    return setEd(function (x) {
      return _objectSpread(_objectSpread({}, x), {}, {
        blocos: x.blocos.map(function (b, j) {
          return j === i ? _objectSpread(_objectSpread({}, b), p) : b;
        })
      });
    });
  };
  var mover = function mover(arr, i, d) {
    var a = arr.slice();
    var _a$splice = a.splice(i, 1),
      _a$splice2 = _slicedToArray(_a$splice, 1),
      x = _a$splice2[0];
    a.splice(i + d, 0, x);
    return a;
  };
  var salvar = function salvar() {
    if (!ed.nome.trim()) {
      setErro('Dê um nome ao modelo.');
      window.scrollTo && document.querySelector('[data-campo="nome-modelo"]') && document.querySelector('[data-campo="nome-modelo"]').scrollIntoView({
        block: 'center',
        behavior: 'smooth'
      });
      return;
    }
    var semOp = ed.blocos.some(function (b) {
      return b.qs.some(function (q) {
        return q.t.trim() && temOpcoes(q.k) && !(q.opcoes || []).some(function (o) {
          return String(o).trim();
        });
      });
    });
    if (semOp) {
      setErro('Toda pergunta de escolha precisa de pelo menos uma opção.');
      return;
    }
    if (!ed.blocos.some(function (b) {
      return b.qs.some(function (q) {
        return q.t.trim();
      });
    })) {
      setErro('Escreva pelo menos uma pergunta.');
      return;
    }
    setErro('');
    onSalvar(comQs(ed));
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onCancelar,
    style: _objectSpread(_objectSpread({}, linkBtn), {}, {
      alignSelf: 'flex-start',
      fontSize: 14
    })
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "arrow-left",
    size: 15
  }), "Voltar aos modelos"), /*#__PURE__*/React.createElement(Block, {
    title: inicial.dbId || ANAM_STORE.v && ANAM_STORE.v.some(function (x) {
      return x.id === inicial.id;
    }) ? 'Editar modelo' : 'Novo modelo de anamnese',
    desc: "O paciente responde pelo link, no celular, e assina no final."
  }, /*#__PURE__*/React.createElement("div", {
    style: grid2(mobile)
  }, /*#__PURE__*/React.createElement("div", {
    "data-campo": "nome-modelo"
  }, /*#__PURE__*/React.createElement(OInput, {
    label: "Nome do modelo",
    placeholder: "Ex.: Anamnese odontol\xF3gica",
    value: ed.nome,
    onChange: function onChange(e) {
      return setEd(_objectSpread(_objectSpread({}, ed), {}, {
        nome: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement(OSelect, {
    label: "\xC1rea",
    options: ['Estética', 'Odontologia', 'Geral'],
    value: ed.uso,
    onChange: function onChange(e) {
      return setEd(_objectSpread(_objectSpread({}, ed), {}, {
        uso: e.target.value
      }));
    }
  })), /*#__PURE__*/React.createElement(OInput, {
    label: "Descri\xE7\xE3o",
    placeholder: "Breve descri\xE7\xE3o para a equipe",
    value: ed.desc || '',
    onChange: function onChange(e) {
      return setEd(_objectSpread(_objectSpread({}, ed), {}, {
        desc: e.target.value
      }));
    }
  }), /*#__PURE__*/React.createElement(Toggle, {
    on: ed.exigeAss !== false,
    onChange: function onChange(v) {
      return setEd(_objectSpread(_objectSpread({}, ed), {}, {
        exigeAss: v
      }));
    },
    label: "Pedir assinatura do paciente",
    desc: "No final ele confirma nome, CPF e assina com o dedo. Guardamos data, hora e IP."
  }), ed.exigeAss !== false ? /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-strong)'
    }
  }, "Texto da declara\xE7\xE3o"), /*#__PURE__*/React.createElement("textarea", {
    value: ed.declaracao || '',
    onChange: function onChange(e) {
      return setEd(_objectSpread(_objectSpread({}, ed), {}, {
        declaracao: e.target.value
      }));
    },
    rows: 2,
    style: {
      borderRadius: 14,
      border: '1.5px solid rgba(214,226,242,.95)',
      background: '#fff',
      padding: 12,
      fontFamily: 'inherit',
      fontSize: 14,
      outline: 'none',
      resize: 'vertical'
    }
  })) : null), ed.blocos.map(function (b, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: b.id,
      style: _objectSpread(_objectSpread({}, soft), {}, {
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      })
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 34,
        height: 34,
        borderRadius: 11,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(31,94,255,.1)',
        color: '#1F5EFF',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(OIcon, {
      name: b.icone || 'clipboard-list',
      size: 17
    })), /*#__PURE__*/React.createElement("input", {
      value: b.titulo,
      onChange: function onChange(e) {
        return setB(i, {
          titulo: e.target.value
        });
      },
      placeholder: "Nome do bloco (ex.: Hist\xF3rico de sa\xFAde)",
      "aria-label": "Nome do bloco",
      style: {
        flex: 1,
        minWidth: 180,
        height: 40,
        borderRadius: 12,
        border: '1.5px solid rgba(214,226,242,.95)',
        background: '#fff',
        padding: '0 12px',
        fontFamily: 'inherit',
        fontSize: 15,
        fontWeight: 600,
        color: 'var(--text-strong)',
        outline: 'none'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        gap: 2
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      "aria-label": "Subir bloco",
      disabled: i === 0,
      onClick: function onClick() {
        return setEd(_objectSpread(_objectSpread({}, ed), {}, {
          blocos: mover(ed.blocos, i, -1)
        }));
      },
      style: _objectSpread(_objectSpread({}, fCircle), {}, {
        width: 32,
        height: 32,
        opacity: i === 0 ? 0.35 : 1
      })
    }, /*#__PURE__*/React.createElement(OIcon, {
      name: "arrow-up",
      size: 14
    })), /*#__PURE__*/React.createElement("button", {
      type: "button",
      "aria-label": "Descer bloco",
      disabled: i === ed.blocos.length - 1,
      onClick: function onClick() {
        return setEd(_objectSpread(_objectSpread({}, ed), {}, {
          blocos: mover(ed.blocos, i, 1)
        }));
      },
      style: _objectSpread(_objectSpread({}, fCircle), {}, {
        width: 32,
        height: 32,
        opacity: i === ed.blocos.length - 1 ? 0.35 : 1
      })
    }, /*#__PURE__*/React.createElement(OIcon, {
      name: "arrow-down",
      size: 14
    })), /*#__PURE__*/React.createElement("button", {
      type: "button",
      "aria-label": "Remover bloco",
      onClick: function onClick() {
        return setEd(_objectSpread(_objectSpread({}, ed), {}, {
          blocos: ed.blocos.filter(function (_, j) {
            return j !== i;
          })
        }));
      },
      style: _objectSpread(_objectSpread({}, fCircle), {}, {
        width: 32,
        height: 32
      })
    }, /*#__PURE__*/React.createElement(OIcon, {
      name: "trash-2",
      size: 14
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 4,
        flexWrap: 'wrap'
      },
      "aria-label": "\xCDcone do bloco"
    }, ICONES_BLOCO.map(function (ic) {
      return /*#__PURE__*/React.createElement("button", {
        key: ic,
        type: "button",
        "aria-label": 'Ícone ' + ic,
        "aria-pressed": b.icone === ic,
        onClick: function onClick() {
          return setB(i, {
            icone: ic
          });
        },
        style: {
          width: 32,
          height: 32,
          borderRadius: 10,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: b.icone === ic ? '1.5px solid #1F5EFF' : '1.5px solid transparent',
          background: b.icone === ic ? 'rgba(31,94,255,.08)' : 'transparent',
          color: b.icone === ic ? '#1F5EFF' : 'var(--text-muted)'
        }
      }, /*#__PURE__*/React.createElement(OIcon, {
        name: ic,
        size: 15
      }));
    })), b.qs.map(function (q, j) {
      return /*#__PURE__*/React.createElement(EditorPergunta, {
        key: q.id,
        q: q,
        i: j,
        n: b.qs.length,
        onChange: function onChange(nq) {
          return setB(i, {
            qs: b.qs.map(function (x, y) {
              return y === j ? nq : x;
            })
          });
        },
        onMove: function onMove(d) {
          return setB(i, {
            qs: mover(b.qs, j, d)
          });
        },
        onRemove: function onRemove() {
          return setB(i, {
            qs: b.qs.filter(function (_, y) {
              return y !== j;
            })
          });
        }
      });
    }), /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: function onClick() {
        return setB(i, {
          qs: [].concat(_toConsumableArray(b.qs), [novaPergunta('texto')])
        });
      },
      style: {
        alignSelf: 'flex-start',
        height: 38,
        padding: '0 14px',
        borderRadius: 999,
        border: '1.5px solid rgba(31,94,255,.35)',
        background: 'rgba(31,94,255,.04)',
        color: '#1F5EFF',
        fontFamily: 'inherit',
        fontSize: 14,
        fontWeight: 500,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(OIcon, {
      name: "plus",
      size: 14
    }), "Pergunta"));
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      return setEd(_objectSpread(_objectSpread({}, ed), {}, {
        blocos: [].concat(_toConsumableArray(ed.blocos), [novoBloco('')])
      }));
    },
    style: {
      height: 46,
      borderRadius: 16,
      border: '1.5px dashed rgba(31,94,255,.4)',
      background: 'rgba(31,94,255,.04)',
      color: '#1F5EFF',
      fontFamily: 'inherit',
      fontSize: 14,
      fontWeight: 500,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "plus",
    size: 15
  }), "Novo bloco"), erro ? /*#__PURE__*/React.createElement("div", {
    role: "alert",
    style: {
      padding: '10px 14px',
      borderRadius: 14,
      background: 'rgba(229,72,77,.08)',
      color: '#C2272D',
      fontSize: 14,
      fontWeight: 500
    }
  }, erro) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(OBtn, {
    variant: "secondary",
    onClick: onCancelar
  }, "Cancelar"), /*#__PURE__*/React.createElement(OBtn, {
    variant: "secondary",
    iconLeft: "eye",
    onClick: function onClick() {
      return setPrevia(true);
    }
  }, "Ver como o paciente v\xEA"), /*#__PURE__*/React.createElement(OBtn, {
    iconLeft: "check",
    loading: salvando,
    onClick: salvar
  }, "Salvar modelo")), previa ? /*#__PURE__*/React.createElement(PreenchimentoJanela, {
    titulo: 'Prévia: ' + (ed.nome || 'Novo modelo'),
    subtitulo: "\xC9 assim que aparece no celular do paciente.",
    dados: dadosDoModelo(comQs(_objectSpread(_objectSpread({}, ed), {}, {
      blocos: ed.blocos.map(function (b) {
        return _objectSpread(_objectSpread({}, b), {}, {
          qs: b.qs.filter(function (q) {
            return q.t.trim();
          })
        });
      }).filter(function (b) {
        return b.qs.length;
      })
    }))),
    modo: "previa",
    onFechar: function onFechar() {
      return setPrevia(false);
    }
  }) : null);
}
var modeloVazio = function modeloVazio() {
  return {
    id: idLocal('m'),
    nome: '',
    uso: 'Estética',
    desc: '',
    padrao: false,
    exigeAss: true,
    declaracao: DECLARACAO_PADRAO,
    usos: 0,
    blocos: [novoBloco('Motivo da consulta')]
  };
};
var copiaModelo = function copiaModelo(m) {
  var c = JSON.parse(JSON.stringify(m));
  delete c.dbId;
  c.id = idLocal('m');
  c.nome = m.nome + ' (cópia)';
  c.padrao = false;
  c.usos = 0;
  c.blocos = c.blocos.map(function (b) {
    return _objectSpread(_objectSpread({}, b), {}, {
      id: idLocal('b'),
      dbId: undefined,
      qs: b.qs.map(function (q) {
        return _objectSpread(_objectSpread({}, q), {}, {
          id: idLocal('q'),
          dbId: undefined
        });
      })
    });
  });
  return comQs(c);
};

/* ---------- Configurações > Cadastro > Modelos de anamnese ---------- */
function AnamneseModelosLista(_ref22) {
  var mobile = _ref22.mobile;
  var _useAnamModels = useAnamModels(),
    _useAnamModels2 = _slicedToArray(_useAnamModels, 2),
    list = _useAnamModels2[0],
    setList = _useAnamModels2[1];
  var carga = SB_ON ? useCarga('anamnese') : 'ok';
  var _React$useState31 = React.useState(null),
    _React$useState32 = _slicedToArray(_React$useState31, 2),
    ed = _React$useState32[0],
    setEd = _React$useState32[1];
  var _React$useState33 = React.useState(false),
    _React$useState34 = _slicedToArray(_React$useState33, 2),
    salvando = _React$useState34[0],
    setSalvando = _React$useState34[1];
  var _React$useState35 = React.useState(null),
    _React$useState36 = _slicedToArray(_React$useState35, 2),
    previa = _React$useState36[0],
    setPrevia = _React$useState36[1];
  var _React$useState37 = React.useState(null),
    _React$useState38 = _slicedToArray(_React$useState37, 2),
    aviso = _React$useState38[0],
    setAviso = _React$useState38[1];
  var avisoRapido = function avisoRapido(t) {
    setAviso(t);
    setTimeout(function () {
      return setAviso(null);
    }, 2600);
  };
  var salvar = /*#__PURE__*/function () {
    var _ref23 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(m) {
      var sv, _t4;
      return _regenerator().w(function (_context10) {
        while (1) switch (_context10.p = _context10.n) {
          case 0:
            if (!SB_ON) {
              _context10.n = 5;
              break;
            }
            setSalvando(true);
            _context10.p = 1;
            _context10.n = 2;
            return AnamSvc.salvar(m);
          case 2:
            sv = _context10.v;
            setList(function (l) {
              return l.some(function (x) {
                return x.id === m.id;
              }) ? l.map(function (x) {
                return x.id === m.id ? _objectSpread(_objectSpread({}, sv), {}, {
                  padrao: x.padrao,
                  usos: x.usos
                }) : x;
              }) : [].concat(_toConsumableArray(l), [sv]);
            });
            setEd(null);
            avisoRapido('Modelo salvo');
            _context10.n = 4;
            break;
          case 3:
            _context10.p = 3;
            _t4 = _context10.v;
          case 4:
            setSalvando(false);
            return _context10.a(2);
          case 5:
            setList(function (l) {
              return l.some(function (x) {
                return x.id === m.id;
              }) ? l.map(function (x) {
                return x.id === m.id ? m : x;
              }) : [].concat(_toConsumableArray(l), [m]);
            });
            setEd(null);
            avisoRapido('Modelo salvo');
          case 6:
            return _context10.a(2);
        }
      }, _callee1, null, [[1, 3]]);
    }));
    return function salvar(_x2) {
      return _ref23.apply(this, arguments);
    };
  }();
  var duplicar = /*#__PURE__*/function () {
    var _ref24 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(m) {
      var c, sv, _t5;
      return _regenerator().w(function (_context11) {
        while (1) switch (_context11.p = _context11.n) {
          case 0:
            c = copiaModelo(m);
            if (!SB_ON) {
              _context11.n = 5;
              break;
            }
            _context11.p = 1;
            _context11.n = 2;
            return AnamSvc.salvar(c);
          case 2:
            sv = _context11.v;
            setList(function (l) {
              return [].concat(_toConsumableArray(l), [sv]);
            });
            avisoRapido('Cópia criada');
            _context11.n = 4;
            break;
          case 3:
            _context11.p = 3;
            _t5 = _context11.v;
          case 4:
            return _context11.a(2);
          case 5:
            setList(function (l) {
              return [].concat(_toConsumableArray(l), [c]);
            });
            avisoRapido('Cópia criada');
          case 6:
            return _context11.a(2);
        }
      }, _callee10, null, [[1, 3]]);
    }));
    return function duplicar(_x3) {
      return _ref24.apply(this, arguments);
    };
  }();
  var padrao = function padrao(m) {
    setList(function (l) {
      return l.map(function (x) {
        return _objectSpread(_objectSpread({}, x), {}, {
          padrao: x.id === m.id
        });
      });
    });
    if (SB_ON) bg(AnamSvc.definirPadrao(m), function () {
      return carregar('anamnese', true);
    });
    avisoRapido(m.nome + ' agora é o padrão');
  };
  var excluir = function excluir(m) {
    setList(function (l) {
      return l.filter(function (x) {
        return x.id !== m.id;
      });
    });
    if (SB_ON && m.dbId) bg(AnamSvc.excluir(m), function () {
      return carregar('anamnese', true);
    });
    avisoRapido('Modelo excluído');
  };
  if (SB_ON && carga !== 'ok') return /*#__PURE__*/React.createElement(CargaEstado, {
    estado: carga,
    compact: true,
    onRetry: function onRetry() {
      return carregar('anamnese', true);
    }
  });
  if (ed) return /*#__PURE__*/React.createElement(AnamneseEditor, {
    inicial: ed,
    mobile: mobile,
    salvando: salvando,
    onCancelar: function onCancelar() {
      return setEd(null);
    },
    onSalvar: salvar
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-muted)'
    }
  }, "Monte o modelo uma vez e envie pelo prontu\xE1rio. O paciente responde no celular e assina."), /*#__PURE__*/React.createElement(OBtn, {
    size: "sm",
    iconLeft: "plus",
    onClick: function onClick() {
      return setEd(modeloVazio());
    }
  }, "Novo modelo")), /*#__PURE__*/React.createElement("div", {
    style: grid2(mobile, 260)
  }, list.map(function (m) {
    return /*#__PURE__*/React.createElement("div", {
      key: m.id,
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        padding: 16,
        borderRadius: 20,
        background: 'rgba(255,255,255,.6)',
        border: m.padrao ? '1.5px solid rgba(31,94,255,.45)' : '1.5px solid rgba(255,255,255,.95)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 12,
        alignItems: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 40,
        height: 40,
        borderRadius: 14,
        background: 'rgba(31,94,255,.1)',
        color: '#1F5EFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement(OIcon, {
      name: "clipboard-list",
      size: 19
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        flexWrap: 'wrap'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, m.nome), m.padrao ? /*#__PURE__*/React.createElement(Badge2, {
      c: "#1F5EFF"
    }, "Padr\xE3o") : null), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)'
      }
    }, m.uso, " \xB7 ", m.blocos.length, " ", m.blocos.length === 1 ? 'bloco' : 'blocos', " \xB7 ", qsDe(m).filter(respondivel).length, " perguntas \xB7 enviado ", m.usos || 0, "x"))), m.desc ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: 'var(--text-body)'
      }
    }, m.desc) : null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
        alignItems: 'center'
      }
    }, /*#__PURE__*/React.createElement(OBtn, {
      size: "sm",
      variant: "secondary",
      iconLeft: "pencil",
      onClick: function onClick() {
        return setEd(JSON.parse(JSON.stringify(m)));
      }
    }, "Editar"), /*#__PURE__*/React.createElement(OBtn, {
      size: "sm",
      variant: "secondary",
      iconLeft: "eye",
      onClick: function onClick() {
        return setPrevia(m);
      }
    }, "Pr\xE9via"), /*#__PURE__*/React.createElement(OBtn, {
      size: "sm",
      variant: "secondary",
      iconLeft: "copy",
      onClick: function onClick() {
        return duplicar(m);
      }
    }, "Duplicar"), !m.padrao ? /*#__PURE__*/React.createElement("button", {
      type: "button",
      style: linkBtn,
      onClick: function onClick() {
        return padrao(m);
      }
    }, /*#__PURE__*/React.createElement(OIcon, {
      name: "star",
      size: 13
    }), "Tornar padr\xE3o") : null, !m.padrao ? /*#__PURE__*/React.createElement("button", {
      type: "button",
      "aria-label": 'Excluir ' + m.nome,
      title: "Excluir modelo",
      style: _objectSpread(_objectSpread({}, linkBtn), {}, {
        color: '#E5484D'
      }),
      onClick: function onClick() {
        return excluir(m);
      }
    }, /*#__PURE__*/React.createElement(OIcon, {
      name: "trash-2",
      size: 13
    })) : null));
  })), previa ? /*#__PURE__*/React.createElement(PreenchimentoJanela, {
    titulo: 'Prévia: ' + previa.nome,
    subtitulo: "\xC9 assim que aparece no celular do paciente.",
    dados: dadosDoModelo(previa),
    modo: "previa",
    onFechar: function onFechar() {
      return setPrevia(null);
    }
  }) : null, aviso ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      left: '50%',
      bottom: 26,
      transform: 'translateX(-50%)',
      zIndex: 330,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '12px 18px',
      borderRadius: 999,
      background: 'var(--surface-inverse, #0E2350)',
      color: '#fff',
      fontSize: 14,
      fontWeight: 500,
      boxShadow: '0 16px 30px -14px rgba(0,0,0,.5)'
    }
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "check",
    size: 15
  }), aviso) : null);
}

/* ---------- Prontuário > Enviar anamnese ---------- */
var MODOS_ENVIO = [['link', 'Paciente responde pelo link', 'send', 'Vai para o WhatsApp dele. Vale por 7 dias e ele pode continuar de onde parou.'], ['presencial', 'Preencher agora com o paciente', 'tablet-smartphone', 'Abre o formulário aqui. O paciente assina na tela, no tablet ou no celular.'], ['assinar', 'Preencher e enviar para assinar', 'pen-line', 'Você preenche junto com ele e o paciente só confere e assina pelo link.']];
// lista suspensa para escolher o modelo de anamnese (com busca quando há muitos modelos)
function ListaModelos(_ref25) {
  var models = _ref25.models,
    sel = _ref25.sel,
    onSel = _ref25.onSel,
    onNova = _ref25.onNova;
  var _React$useState39 = React.useState(false),
    _React$useState40 = _slicedToArray(_React$useState39, 2),
    aberta = _React$useState40[0],
    setAberta = _React$useState40[1];
  var _React$useState41 = React.useState(''),
    _React$useState42 = _slicedToArray(_React$useState41, 2),
    q = _React$useState42[0],
    setQ = _React$useState42[1];
  var ref = React.useRef(null);
  React.useEffect(function () {
    if (!aberta) return undefined;
    var fora = function fora(e) {
      if (ref.current && !ref.current.contains(e.target)) setAberta(false);
    };
    var esc = function esc(e) {
      if (e.key === 'Escape') setAberta(false);
    };
    document.addEventListener('pointerdown', fora);
    window.addEventListener('keydown', esc);
    return function () {
      document.removeEventListener('pointerdown', fora);
      window.removeEventListener('keydown', esc);
    };
  }, [aberta]);
  var m = models.find(function (x) {
    return x.id === sel;
  });
  var meta = function meta(x) {
    return [x.uso, qsDe(x).filter(respondivel).length + ' perguntas', x.exigeAss !== false ? 'com assinatura' : null].filter(Boolean).join(' · ');
  };
  var tag = /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: '#1F5EFF',
      padding: '2px 8px',
      borderRadius: 999,
      background: 'rgba(31,94,255,.08)'
    }
  }, "padr\xE3o");
  var termo = q.trim().toLowerCase();
  var vis = models.filter(function (x) {
    return !termo || (x.nome + ' ' + (x.uso || '') + ' ' + (x.desc || '')).toLowerCase().includes(termo);
  });
  var nomeTxt = {
    fontSize: 15,
    fontWeight: 600,
    color: 'var(--text-strong)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  };
  return /*#__PURE__*/React.createElement("div", {
    ref: ref,
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-haspopup": "listbox",
    "aria-expanded": aberta,
    "aria-label": "Modelo de anamnese",
    onClick: function onClick() {
      return setAberta(!aberta);
    },
    style: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 14px 10px 10px',
      borderRadius: 18,
      cursor: 'pointer',
      fontFamily: 'inherit',
      textAlign: 'left',
      border: aberta ? '1.5px solid #1F5EFF' : '1.5px solid rgba(214,226,242,.95)',
      background: '#fff',
      boxShadow: aberta ? '0 0 0 4px rgba(31,94,255,.12)' : '0 4px 12px -8px rgba(23,73,170,.35)',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 13,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(31,94,255,.08)',
      color: '#1F5EFF'
    }
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "clipboard-list",
    size: 19
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, m ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: nomeTxt
  }, m.nome), m.padrao ? tag : null), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, meta(m))) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-muted)'
    }
  }, "Escolha o modelo de anamnese")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)',
      whiteSpace: 'nowrap'
    }
  }, models.length, " ", models.length === 1 ? 'modelo' : 'modelos'), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      display: 'flex',
      transform: aberta ? 'rotate(180deg)' : 'none',
      transition: 'transform .2s'
    }
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "chevron-down",
    size: 18
  }))), aberta ? /*#__PURE__*/React.createElement("div", {
    role: "listbox",
    "aria-label": "Modelos de anamnese",
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 'calc(100% + 6px)',
      zIndex: 20,
      padding: 6,
      borderRadius: 18,
      background: '#fff',
      boxShadow: '0 24px 46px -20px rgba(23,73,170,.55)',
      border: '1.5px solid rgba(214,226,242,.7)',
      display: 'flex',
      flexDirection: 'column',
      maxHeight: 380,
      boxSizing: 'border-box'
    }
  }, models.length > 5 ? /*#__PURE__*/React.createElement("input", {
    autoFocus: true,
    value: q,
    onChange: function onChange(e) {
      return setQ(e.target.value);
    },
    placeholder: "Buscar modelo",
    "aria-label": "Buscar modelo",
    style: {
      height: 38,
      margin: '2px 2px 6px',
      borderRadius: 999,
      border: '1.5px solid rgba(214,226,242,.95)',
      padding: '0 14px',
      fontFamily: 'inherit',
      fontSize: 14,
      outline: 'none',
      flexShrink: 0
    }
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0
    }
  }, vis.map(function (x) {
    var on = x.id === sel;
    return /*#__PURE__*/React.createElement("button", {
      key: x.id,
      role: "option",
      "aria-selected": on,
      type: "button",
      onClick: function onClick() {
        onSel(x.id);
        setAberta(false);
        setQ('');
      },
      onMouseEnter: function onMouseEnter(e) {
        if (!on) e.currentTarget.style.background = 'rgba(31,94,255,.04)';
      },
      onMouseLeave: function onMouseLeave(e) {
        if (!on) e.currentTarget.style.background = 'transparent';
      },
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 12px',
        border: 0,
        borderRadius: 12,
        cursor: 'pointer',
        fontFamily: 'inherit',
        textAlign: 'left',
        background: on ? 'rgba(31,94,255,.07)' : 'transparent',
        flexShrink: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: _objectSpread(_objectSpread({}, nomeTxt), {}, {
        fontSize: 14,
        color: on ? '#1F5EFF' : 'var(--text-strong)'
      })
    }, x.nome), x.padrao ? tag : null), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        fontSize: 12,
        color: 'var(--text-muted)'
      }
    }, meta(x))), on ? /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#1F5EFF',
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement(OIcon, {
      name: "check",
      size: 16
    })) : null);
  }), !vis.length ? /*#__PURE__*/React.createElement("span", {
    style: {
      padding: 12,
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, "Nenhum modelo com esse nome.") : null), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function onClick() {
      setAberta(false);
      onNova();
    },
    style: {
      marginTop: 6,
      height: 42,
      flexShrink: 0,
      borderRadius: 12,
      border: '1.5px dashed rgba(31,94,255,.4)',
      background: 'rgba(31,94,255,.04)',
      color: '#1F5EFF',
      fontFamily: 'inherit',
      fontSize: 14,
      fontWeight: 500,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "plus",
    size: 15
  }), "Criar nova anamnese")) : null);
}
function AnamneseEnvio(_ref26) {
  var p = _ref26.p,
    onFeito = _ref26.onFeito,
    onBack = _ref26.onBack,
    wide = _ref26.wide;
  var _useAnamModels3 = useAnamModels(),
    _useAnamModels4 = _slicedToArray(_useAnamModels3, 2),
    models = _useAnamModels4[0],
    setModels = _useAnamModels4[1];
  var _React$useState43 = React.useState(function () {
      var pd = models.find(function (x) {
        return x.padrao;
      }) || models[0];
      return pd && pd.id;
    }),
    _React$useState44 = _slicedToArray(_React$useState43, 2),
    sel = _React$useState44[0],
    setSel = _React$useState44[1];
  var _React$useState45 = React.useState('link'),
    _React$useState46 = _slicedToArray(_React$useState45, 2),
    modo = _React$useState46[0],
    setModo = _React$useState46[1];
  var _React$useState47 = React.useState(null),
    _React$useState48 = _slicedToArray(_React$useState47, 2),
    ed = _React$useState48[0],
    setEd = _React$useState48[1];
  var _React$useState49 = React.useState(false),
    _React$useState50 = _slicedToArray(_React$useState49, 2),
    salvandoM = _React$useState50[0],
    setSalvandoM = _React$useState50[1];
  var _React$useState51 = React.useState(null),
    _React$useState52 = _slicedToArray(_React$useState51, 2),
    janela = _React$useState52[0],
    setJanela = _React$useState52[1];
  var _React$useState53 = React.useState(false),
    _React$useState54 = _slicedToArray(_React$useState53, 2),
    gerando = _React$useState54[0],
    setGerando = _React$useState54[1];
  var _React$useState55 = React.useState(false),
    _React$useState56 = _slicedToArray(_React$useState55, 2),
    copiado = _React$useState56[0],
    setCopiado = _React$useState56[1];
  var _React$useState57 = React.useState(null),
    _React$useState58 = _slicedToArray(_React$useState57, 2),
    envio = _React$useState58[0],
    setEnvio = _React$useState58[1];
  React.useEffect(function () {
    if (!sel && models[0]) setSel((models.find(function (x) {
      return x.padrao;
    }) || models[0]).id);
  }, [models.length]);
  var m = models.find(function (x) {
    return x.id === sel;
  });
  var linkDemo = m ? "salute.app/?a=".concat(slugModelo(m.nome).slice(0, 6)).concat(onlyDigits(p.cpf).slice(0, 3)).concat(onlyDigits(p.cpf).slice(-2)) : '';
  // cria o envio só uma vez por modelo e modo
  var garantir = /*#__PURE__*/function () {
    var _ref27 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(md) {
      var r, e;
      return _regenerator().w(function (_context12) {
        while (1) switch (_context12.p = _context12.n) {
          case 0:
            if (SB_ON) {
              _context12.n = 1;
              break;
            }
            return _context12.a(2, {
              link: linkDemo,
              token: null,
              id: null
            });
          case 1:
            if (!(envio && envio.m === m.id && envio.modo === md)) {
              _context12.n = 2;
              break;
            }
            return _context12.a(2, envio);
          case 2:
            setGerando(true);
            _context12.p = 3;
            _context12.n = 4;
            return ProntSvc.enviarAnamnese(p, m.nome, md);
          case 4:
            r = _context12.v;
            e = _objectSpread({
              m: m.id,
              modo: md
            }, r);
            setEnvio(e);
            return _context12.a(2, e);
          case 5:
            _context12.p = 5;
            setGerando(false);
            return _context12.f(5);
          case 6:
            return _context12.a(2);
        }
      }, _callee11, null, [[3,, 5, 6]]);
    }));
    return function garantir(_x4) {
      return _ref27.apply(this, arguments);
    };
  }();
  var copiar = /*#__PURE__*/function () {
    var _ref28 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
      var e, _t6;
      return _regenerator().w(function (_context13) {
        while (1) switch (_context13.p = _context13.n) {
          case 0:
            _context13.p = 0;
            _context13.n = 1;
            return garantir('link');
          case 1:
            e = _context13.v;
            navigator.clipboard && navigator.clipboard.writeText('https://' + e.link);
            setCopiado(true);
            _context13.n = 3;
            break;
          case 2:
            _context13.p = 2;
            _t6 = _context13.v;
          case 3:
            return _context13.a(2);
        }
      }, _callee12, null, [[0, 2]]);
    }));
    return function copiar() {
      return _ref28.apply(this, arguments);
    };
  }();
  var enviarLink = /*#__PURE__*/function () {
    var _ref29 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee13() {
      var e, _t7;
      return _regenerator().w(function (_context14) {
        while (1) switch (_context14.p = _context14.n) {
          case 0:
            _context14.p = 0;
            _context14.n = 1;
            return garantir('link');
          case 1:
            e = _context14.v;
            onFeito({
              m: m,
              modo: 'link',
              link: e.link,
              id: e.id,
              token: e.token,
              expira: e.expira
            });
            _context14.n = 3;
            break;
          case 2:
            _context14.p = 2;
            _t7 = _context14.v;
          case 3:
            return _context14.a(2);
        }
      }, _callee13, null, [[0, 2]]);
    }));
    return function enviarLink() {
      return _ref29.apply(this, arguments);
    };
  }();
  var abrir = /*#__PURE__*/function () {
    var _ref30 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee14(md) {
      var e, _t8;
      return _regenerator().w(function (_context15) {
        while (1) switch (_context15.p = _context15.n) {
          case 0:
            _context15.p = 0;
            _context15.n = 1;
            return garantir(md);
          case 1:
            e = _context15.v;
            setJanela({
              md: md,
              e: e
            });
            _context15.n = 3;
            break;
          case 2:
            _context15.p = 2;
            _t8 = _context15.v;
          case 3:
            return _context15.a(2);
        }
      }, _callee14, null, [[0, 2]]);
    }));
    return function abrir(_x5) {
      return _ref30.apply(this, arguments);
    };
  }();
  var saveNew = /*#__PURE__*/function () {
    var _ref31 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee15(n) {
      var sv, _t9;
      return _regenerator().w(function (_context16) {
        while (1) switch (_context16.p = _context16.n) {
          case 0:
            if (!SB_ON) {
              _context16.n = 5;
              break;
            }
            setSalvandoM(true);
            _context16.p = 1;
            _context16.n = 2;
            return AnamSvc.salvar(n);
          case 2:
            sv = _context16.v;
            setModels(function (l) {
              return [].concat(_toConsumableArray(l), [sv]);
            });
            setSel(sv.id);
            setEd(null);
            _context16.n = 4;
            break;
          case 3:
            _context16.p = 3;
            _t9 = _context16.v;
          case 4:
            setSalvandoM(false);
            return _context16.a(2);
          case 5:
            setModels(function (l) {
              return [].concat(_toConsumableArray(l), [n]);
            });
            setSel(n.id);
            setEd(null);
          case 6:
            return _context16.a(2);
        }
      }, _callee15, null, [[1, 3]]);
    }));
    return function saveNew(_x6) {
      return _ref31.apply(this, arguments);
    };
  }();
  if (ed) return /*#__PURE__*/React.createElement(AnamneseEditor, {
    inicial: ed,
    mobile: !wide,
    salvando: salvandoM,
    onCancelar: function onCancelar() {
      return setEd(null);
    },
    onSalvar: saveNew
  });
  var radio = function radio(on) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        width: 18,
        height: 18,
        borderRadius: '50%',
        border: on ? '5px solid #1F5EFF' : '2px solid rgba(150,175,210,.8)',
        boxSizing: 'border-box',
        background: '#fff',
        flexShrink: 0
      }
    });
  };
  var card = function card(on) {
    return {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px 14px',
      borderRadius: 16,
      cursor: 'pointer',
      fontFamily: 'inherit',
      textAlign: 'left',
      border: on ? '1.5px solid #1F5EFF' : '1.5px solid rgba(255,255,255,.95)',
      background: on ? 'rgba(31,94,255,.07)' : 'rgba(255,255,255,.6)'
    };
  };
  var divisor = _objectSpread(_objectSpread({}, lbl), {}, {
    paddingTop: 14,
    borderTop: '1px solid rgba(214,226,242,.9)'
  });
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(BackLink, {
    onClick: onBack
  }), /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, soft), {}, {
      background: 'rgba(255,255,255,.8)',
      padding: wide ? 20 : 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    })
  }, /*#__PURE__*/React.createElement("span", {
    style: lbl
  }, "1. Escolha a anamnese"), /*#__PURE__*/React.createElement(ListaModelos, {
    models: models,
    sel: sel,
    onSel: function onSel(id) {
      setSel(id);
      setCopiado(false);
    },
    onNova: function onNova() {
      return setEd(modeloVazio());
    }
  }), m ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, divisor), {}, {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      flexWrap: 'wrap'
    })
  }, /*#__PURE__*/React.createElement("span", null, "2. Confira o que o paciente vai responder"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: _objectSpread(_objectSpread({}, linkBtn), {}, {
      textTransform: 'none',
      letterSpacing: 0
    }),
    onClick: function onClick() {
      return setJanela({
        md: 'previa'
      });
    }
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "eye",
    size: 14
  }), "Ver como o paciente v\xEA")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: wide ? 'repeat(2, minmax(0,1fr))' : '1fr',
      gap: '6px 18px'
    }
  }, m.blocos.map(function (b) {
    return /*#__PURE__*/React.createElement("div", {
      key: b.id,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        fontSize: 14,
        color: 'var(--text-body)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: '#1F5EFF',
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement(OIcon, {
      name: b.icone || 'clipboard-list',
      size: 15
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }, b.titulo), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: 'var(--text-muted)'
      }
    }, b.qs.filter(respondivel).length, " ", b.qs.filter(respondivel).length === 1 ? 'pergunta' : 'perguntas'));
  }), m.exigeAss !== false ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontSize: 14,
      color: 'var(--text-body)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: '#1F5EFF',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "signature",
    size: 15
  })), "Assinatura no final") : null), /*#__PURE__*/React.createElement("span", {
    style: divisor
  }, "3. Como vai ser preenchida"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: wide ? 'repeat(3, minmax(0,1fr))' : '1fr',
      gap: 8
    }
  }, MODOS_ENVIO.map(function (_ref32) {
    var _ref33 = _slicedToArray(_ref32, 4),
      k = _ref33[0],
      t = _ref33[1],
      ic = _ref33[2],
      d = _ref33[3];
    var on = modo === k;
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      type: "button",
      onClick: function onClick() {
        return setModo(k);
      },
      style: _objectSpread(_objectSpread({}, card(on)), {}, {
        alignItems: 'flex-start'
      })
    }, radio(on), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 14,
        fontWeight: 600,
        color: 'var(--text-strong)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: on ? '#1F5EFF' : 'var(--text-muted)',
        display: 'flex'
      }
    }, /*#__PURE__*/React.createElement(OIcon, {
      name: ic,
      size: 16
    })), t), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'block',
        marginTop: 2,
        fontSize: 12,
        color: 'var(--text-muted)'
      }
    }, d)));
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flexWrap: 'wrap',
      justifyContent: 'flex-end'
    }
  }, modo === 'link' ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 200,
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, "Vai direto para o WhatsApp ", /*#__PURE__*/React.createElement(B, null, p.tel), " com o link para responder."), /*#__PURE__*/React.createElement(OBtn, {
    size: "sm",
    variant: "secondary",
    iconLeft: copiado ? 'check' : 'copy',
    onClick: copiar
  }, copiado ? 'Copiado' : 'Copiar link'), /*#__PURE__*/React.createElement(OBtn, {
    size: "sm",
    iconLeft: "send",
    loading: gerando,
    onClick: enviarLink
  }, "Enviar no WhatsApp")) : /*#__PURE__*/React.createElement(OBtn, {
    size: "sm",
    iconLeft: modo === 'presencial' ? 'tablet-smartphone' : 'pen-line',
    loading: gerando,
    onClick: function onClick() {
      return abrir(modo);
    }
  }, modo === 'presencial' ? 'Abrir formulário' : 'Começar a preencher'))) : /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, "Nenhum modelo ainda. Use Criar nova anamnese na lista acima.")), janela && m ? /*#__PURE__*/React.createElement(PreenchimentoJanela, {
    titulo: janela.md === 'previa' ? 'Prévia: ' + m.nome : m.nome,
    subtitulo: janela.md === 'previa' ? 'É assim que aparece no celular do paciente.' : janela.md === 'presencial' ? 'Entregue o aparelho para o paciente responder e assinar.' : p.nome,
    dados: dadosDoModelo(m, {
      paciente: p.nome.split(' ')[0]
    }),
    token: janela.e && janela.e.token,
    modo: janela.md === 'previa' ? 'previa' : janela.md === 'presencial' ? 'presencial' : 'equipe',
    onFechar: function onFechar() {
      return setJanela(null);
    },
    onFim: function onFim(res) {
      var e = janela.e || {};
      setJanela(null);
      onFeito({
        m: m,
        modo: janela.md,
        link: e.link || linkDemo,
        id: e.id,
        token: e.token,
        expira: e.expira,
        res: res
      });
    }
  }) : null);
}
Object.assign(window, {
  TIPOS_RESP: TIPOS_RESP,
  AnamSvc: AnamSvc,
  envioTela: envioTela,
  AnamnesePreenchimento: AnamnesePreenchimento,
  PaginaAnamnese: PaginaAnamnese,
  PaginaEnvioDocs: PaginaEnvioDocs,
  RaizSalute: RaizSalute,
  PreenchimentoJanela: PreenchimentoJanela,
  CartaoAnamnese: CartaoAnamnese,
  AlertasPaciente: AlertasPaciente,
  AnamneseEditor: AnamneseEditor,
  AnamneseModelosLista: AnamneseModelosLista,
  AnamneseEnvio: AnamneseEnvio,
  imprimirHtml: imprimirHtml,
  escHtml: escHtml,
  dadosDoModelo: dadosDoModelo,
  respostasLocais: respostasLocais,
  alertasDeRecs: alertasDeRecs,
  modeloTela: modeloTela
});