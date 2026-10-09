"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* =====================================================================
   SERVIÇOS DE DADOS: Financeiro e Estoque (Supabase)
   As telas continuam as mesmas. No modo conectado, receitas, despesas,
   categorias, metas, configuração fiscal e produtos vêm do banco e cada
   ação da tela grava lá.
   ===================================================================== */
Object.assign(ENUM, {
  regime: {
    'Simples Nacional': 'simples_nacional',
    MEI: 'mei',
    'Lucro Presumido': 'lucro_presumido',
    'Lucro Real': 'lucro_real'
  },
  ambiente: {
    'Homologação (testes)': 'homologacao',
    'Produção': 'producao'
  }
});
var SENHA_GUARDADA = '••••••••';
var numTela = function numTela(v) {
  return v === null || v === undefined || v === '' ? '' : String(Number(v)).replace('.', ',');
};

// No modo conectado nenhum lançamento, produto ou dado fiscal de exemplo aparece
if (SB_ON) {
  REC_STORE.v = [];
  DESP_STORE.v = [];
  PROD_STORE.v = [];
  PAC_NOMES.length = 0;
  FIN_METAS.length = 0;
  NF_STORE.v = _objectSpread(_objectSpread({}, NF_STORE.v), {}, {
    cnpj: '',
    razao: '',
    im: '',
    municipio: '',
    codMun: '',
    aliq: '',
    cert: null,
    certSenha: ''
  });
  // a lista de pacientes do lançamento acompanha o cadastro
  PAC_STORE.subs.add(function () {
    return substituir(PAC_NOMES, Array.from(new Set(PAC.map(function (p) {
      return p.nome;
    }))));
  });
  // os materiais do prontuário acompanham o saldo do estoque
  PROD_STORE.subs.add(function () {
    return substituir(PRODUTOS0, PROD_STORE.v.map(function (p) {
      return {
        id: p.id,
        nome: p.nome,
        un: p.un,
        qtd: p.qtd
      };
    }));
  });
}

/* =====================================================================
   FINANCEIRO
   ===================================================================== */
var REC_SEL = '*, paciente:pacientes(nome), procedimento:procedimentos(nome), profissional:profissionais(nome), categoria:categorias_financeiras(nome), forma:formas_pagamento(nome)';
var DESP_SEL = '*, fornecedor:fornecedores(nome), categoria:categorias_financeiras(nome), forma:formas_pagamento(nome)';
var recTela = function recTela(r) {
  return {
    id: r.id,
    dbId: r.id,
    data: r.data_competencia,
    pac: r.paciente && r.paciente.nome || r.paciente_nome || r.descricao || '',
    pacId: r.paciente_id,
    proc: r.procedimento && r.procedimento.nome || r.procedimento_nome || '',
    pro: r.profissional && r.profissional.nome || '',
    cat: r.categoria && r.categoria.nome || '',
    atend: r.tipo_atendimento === 'convenio' ? 'Convênio' : 'Particular',
    total: Number(r.valor_total),
    desc: Number(r.valor_desconto || 0),
    forma: r.forma && r.forma.nome || '',
    parc: r.numero_parcelas || 1,
    venc: r.data_vencimento || r.data_competencia,
    status: r.status === 'pago' ? 'Recebido' : 'Pendente',
    ia: !!r.criado_por_ia
  };
};
var despTela = function despTela(d) {
  return {
    id: d.id,
    dbId: d.id,
    desc: d.descricao,
    cat: d.categoria && d.categoria.nome || '',
    forn: d.fornecedor && d.fornecedor.nome || d.fornecedor_nome || 'Não informado',
    total: Number(d.valor_total),
    forma: d.forma && d.forma.nome || '',
    parc: d.numero_parcelas || 1,
    data: d.data_competencia,
    venc: d.data_vencimento || d.data_competencia,
    status: d.status === 'pago' ? 'Pago' : 'Pendente',
    ia: !!d.criado_por_ia
  };
};
var nfTela = function nfTela(c) {
  return {
    cnpj: c.cnpj || '',
    razao: c.razao_social || '',
    im: c.inscricao_municipal || '',
    municipio: c.municipio_emissao || '',
    regime: el('regime', c.regime_tributario, 'Simples Nacional'),
    item: c.item_lc116_estetica || '6.02',
    itemOdonto: c.item_lc116_odontologia || '4.12',
    cnae: c.cnae_estetica || '9602-5/02',
    cnaeOdonto: c.cnae_odontologia || '8630-5/04',
    codMun: c.codigo_tributacao_municipal || '',
    aliq: numTela(c.aliquota_iss),
    issRet: !!c.iss_retido,
    serie: c.serie_rps || '',
    proxRps: String(c.proximo_numero_rps || 1),
    ambiente: el('ambiente', c.ambiente, 'Homologação (testes)'),
    cert: c.certificado_nome_arquivo || null,
    certPath: c.certificado_path || null,
    certSenha: c.certificado_senha_configurada ? SENHA_GUARDADA : '',
    envio: c.enviar_whatsapp !== false,
    cst: c.cst_ibs_cbs || '000',
    cclass: c.classificacao_tributaria || '000001',
    cbs: numTela(c.aliquota_cbs) || '0,9',
    ibs: numTela(c.aliquota_ibs) || '0,1',
    texto: c.texto_modelo_discriminacao || 'Serviço de {procedimento} realizado em {data} por {profissional}.',
    dbId: c.id
  };
};
var nfBanco = function nfBanco(f) {
  return {
    razao_social: f.razao.trim() || null,
    cnpj: f.cnpj.trim() || null,
    inscricao_municipal: f.im.trim() || null,
    municipio_emissao: f.municipio.trim() || null,
    regime_tributario: ek('regime', f.regime),
    item_lc116_estetica: f.item || null,
    item_lc116_odontologia: f.itemOdonto || null,
    cnae_estetica: f.cnae || null,
    cnae_odontologia: f.cnaeOdonto || null,
    codigo_tributacao_municipal: String(f.codMun || '').trim() || null,
    aliquota_iss: BR.num(f.aliq),
    iss_retido: !!f.issRet,
    serie_rps: String(f.serie || '').trim() || null,
    proximo_numero_rps: parseInt(f.proxRps, 10) || 1,
    ambiente: ek('ambiente', f.ambiente) || 'homologacao',
    enviar_whatsapp: !!f.envio,
    cst_ibs_cbs: f.cst || null,
    classificacao_tributaria: f.cclass || null,
    aliquota_cbs: BR.num(f.cbs),
    aliquota_ibs: BR.num(f.ibs),
    texto_modelo_discriminacao: f.texto || null
  };
};
var FIN_METAS_DB = [];
function hidratarMetas() {
  // meta do mês atual vale mais que a meta padrão (sem ano e mês)
  var a = TODAY.getFullYear(),
    m = TODAY.getMonth() + 1;
  substituir(FIN_METAS, PROF0.map(function (p) {
    var doMes = FIN_METAS_DB.find(function (x) {
      return x.profissional_id === p.dbId && x.ano === a && x.mes === m;
    });
    var padrao = FIN_METAS_DB.find(function (x) {
      return x.profissional_id === p.dbId && !x.ano && !x.mes;
    });
    return Number((doMes || padrao || {}).valor_meta || 0);
  }));
}
CARGAS.financeiro = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
  var desde, _yield$Promise$all, _yield$Promise$all2, rec, desp, metas;
  return _regenerator().w(function (_context) {
    while (1) switch (_context.n) {
      case 0:
        _context.n = 1;
        return Promise.all([carregar('catalogos'), carregar('pacientes')]);
      case 1:
        desde = isoOf(addD(TODAY, -400));
        _context.n = 2;
        return Promise.all([DB.tudo(function () {
          return DB.sel('contas_receber', REC_SEL).neq('status', 'cancelado').or('data_competencia.gte.' + desde + ',status.eq.pendente').order('data_competencia', {
            ascending: false
          }).order('id');
        }), DB.tudo(function () {
          return DB.sel('contas_pagar', DESP_SEL).neq('status', 'cancelado').or('data_competencia.gte.' + desde + ',status.eq.pendente').order('data_competencia', {
            ascending: false
          }).order('id');
        }), DB.ler(DB.sel('metas_profissional').order('criado_em'))]);
      case 2:
        _yield$Promise$all = _context.v;
        _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 3);
        rec = _yield$Promise$all2[0];
        desp = _yield$Promise$all2[1];
        metas = _yield$Promise$all2[2];
        REC_STORE.v = rec.map(recTela);
        avisar(REC_STORE);
        DESP_STORE.v = desp.map(despTela);
        avisar(DESP_STORE);
        FIN_METAS_DB = metas;
        hidratarMetas();
        if (CAT.v.nf) {
          NF_STORE.v = nfTela(CAT.v.nf);
          avisar(NF_STORE);
        }
        substituir(PAC_NOMES, Array.from(new Set(PAC.map(function (p) {
          return p.nome;
        }))));
      case 3:
        return _context.a(2);
    }
  }, _callee);
}));
// categorias da tela, sempre do banco
var catsFin = function catsFin(c, tipo) {
  return (c.categorias || []).filter(function (x) {
    return x.tipo === tipo && x.ativo;
  }).map(function (x) {
    return x.nome;
  });
};
var FinSvc = {
  baixa: function baixa(pago, valor) {
    return pago ? {
      status: 'pago',
      data_pagamento: TODAY_ISO,
      valor_pago: valor,
      baixa_por: UID(),
      baixa_em: agoraIso()
    } : {
      status: 'pendente',
      data_pagamento: null,
      valor_pago: null,
      baixa_por: null,
      baixa_em: null
    };
  },
  idCat: function idCat(tipo, nome) {
    var c = (CAT.v.categorias || []).find(function (x) {
      return x.tipo === tipo && x.nome === nome;
    });
    return c ? c.id : null;
  },
  parcelas: function parcelas(isR, id, total, n, venc, pago) {
    var base = Math.floor(total / n * 100) / 100;
    return Array.from({
      length: n
    }, function (_, i) {
      var v = i === n - 1 ? Math.round((total - base * (n - 1)) * 100) / 100 : base;
      var d = new Date(venc + 'T12:00:00');
      d.setMonth(d.getMonth() + i);
      return _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, isR ? 'conta_receber_id' : 'conta_pagar_id', id), "numero", i + 1), "valor", v), "vencimento", BR.isoDia(d)), "status", pago ? 'pago' : 'pendente'), "data_pagamento", pago ? TODAY_ISO : null), "valor_pago", pago ? v : null);
    });
  },
  fornecedor: function fornecedor(nome) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
      var n, ex, r;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.n) {
          case 0:
            n = String(nome || '').trim();
            if (!(!n || n === 'Não informado')) {
              _context2.n = 1;
              break;
            }
            return _context2.a(2, null);
          case 1:
            ex = porNome(CAT.v.fornecedores, n);
            if (!ex) {
              _context2.n = 2;
              break;
            }
            return _context2.a(2, ex.id);
          case 2:
            _context2.n = 3;
            return DB.ins('fornecedores', {
              nome: n
            }, 'Não foi possível cadastrar o fornecedor');
          case 3:
            r = _context2.v;
            catSet({
              fornecedores: [].concat(_toConsumableArray(CAT.v.fornecedores || []), [r])
            });
            return _context2.a(2, r.id);
        }
      }, _callee2);
    }))();
  },
  // lançamento novo (receita ou despesa), com parcelas quando houver
  criar: function criar(kind, r, extra) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
      var ext, isR, pago, _final, comum, p, pr, pf, fid;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.n) {
          case 0:
            ext = _objectSpread({}, extra || {});
            delete ext.silencioso;
            isR = kind === 'rec', pago = r.status !== 'Pendente', _final = isR ? Math.max(r.total - (r.desc || 0), 0) : r.total;
            comum = _objectSpread({
              id: r.id,
              forma_pagamento_id: catId('formas', r.forma),
              conta_bancaria_id: CAT.v.contaBancaria ? CAT.v.contaBancaria.id : null,
              valor_total: r.total,
              numero_parcelas: r.parc || 1,
              data_competencia: r.data,
              data_vencimento: r.venc || r.data
            }, FinSvc.baixa(pago, _final));
            p = null;
            if (!isR) {
              _context3.n = 2;
              break;
            }
            p = PacSvc.achar(r.pac);
            pr = porNome(CAT.v.procedimentos, r.proc), pf = PROF0.find(function (x) {
              return x.nome === r.pro;
            });
            _context3.n = 1;
            return DB.ins('contas_receber', _objectSpread(_objectSpread({}, comum), {}, {
              paciente_id: p ? p.dbId : null,
              paciente_nome: p ? null : r.pac || null,
              procedimento_id: pr ? pr.id : null,
              procedimento_nome: r.proc || null,
              profissional_id: pf ? pf.dbId : null,
              categoria_financeira_id: FinSvc.idCat('receita', r.cat),
              tipo_atendimento: r.atend === 'Convênio' ? 'convenio' : 'particular',
              convenio_id: r.atend === 'Convênio' && p && p.conv ? catId('convenios', p.conv) : null,
              valor_desconto: r.desc || 0
            }, ext), 'Não foi possível salvar a receita');
          case 1:
            _context3.n = 4;
            break;
          case 2:
            _context3.n = 3;
            return FinSvc.fornecedor(r.forn);
          case 3:
            fid = _context3.v;
            _context3.n = 4;
            return DB.ins('contas_pagar', _objectSpread(_objectSpread({}, comum), {}, {
              descricao: r.desc,
              categoria_financeira_id: FinSvc.idCat('despesa', r.cat),
              fornecedor_id: fid
            }, ext), 'Não foi possível salvar a despesa');
          case 4:
            if (!((r.parc || 1) > 1)) {
              _context3.n = 5;
              break;
            }
            _context3.n = 5;
            return DB.ins('parcelas', FinSvc.parcelas(isR, r.id, _final, r.parc, r.venc || r.data, pago), 'Não foi possível salvar as parcelas');
          case 5:
            if (p) PacSvc.hist(p, {
              t: pago ? 'Pagamento recebido' : 'Pagamento lançado',
              s: [r.proc, brl(_final), r.forma].filter(Boolean).join(' · '),
              c: '#2DBF6A',
              tipo: 'financeiro',
              tabela: 'contas_receber',
              registro: r.id,
              origem: ext.criado_por_ia ? 'renata_ia' : undefined
            });
            if (!silencioso) avisoOk(isR ? 'Receita salva' : 'Despesa salva');
          case 6:
            return _context3.a(2);
        }
      }, _callee3);
    }))();
  },
  // edição de um lançamento já salvo (r = como ficou, antes = como estava)
  editar: function editar(kind, r, antes) {
    var isR = kind === 'rec',
      pago = r.status !== 'Pendente',
      final = isR ? Math.max(r.total - (r.desc || 0), 0) : r.total,
      fk = isR ? 'conta_receber_id' : 'conta_pagar_id',
      tabela = isR ? 'contas_receber' : 'contas_pagar';
    var mudouPago = (antes.status !== 'Pendente') !== pago;
    var comum = {
      forma_pagamento_id: catId('formas', r.forma),
      valor_total: r.total,
      numero_parcelas: r.parc || 1,
      data_vencimento: r.venc || r.data
    };
    // a baixa só é refeita quando o status muda; se continua pago, atualiza o valor pago
    if (mudouPago) Object.assign(comum, FinSvc.baixa(pago, final));else if (pago) comum.valor_pago = final;
    var dados;
    if (isR) {
      var p = PacSvc.achar(r.pac),
        pr = porNome(CAT.v.procedimentos, r.proc),
        pf = PROF0.find(function (x) {
          return x.nome === r.pro;
        });
      dados = Promise.resolve(Object.assign(comum, {
        paciente_id: p ? p.dbId : null,
        paciente_nome: p ? null : r.pac || null,
        procedimento_id: pr ? pr.id : null,
        procedimento_nome: r.proc || null,
        profissional_id: pf ? pf.dbId : null,
        categoria_financeira_id: FinSvc.idCat('receita', r.cat),
        tipo_atendimento: r.atend === 'Convênio' ? 'convenio' : 'particular',
        convenio_id: r.atend === 'Convênio' && p && p.conv ? catId('convenios', p.conv) : null,
        valor_desconto: r.desc || 0
      }));
    } else {
      dados = FinSvc.fornecedor(r.forn).then(function (fid) {
        return Object.assign(comum, {
          descricao: r.desc,
          categoria_financeira_id: FinSvc.idCat('despesa', r.cat),
          fornecedor_id: fid
        });
      });
    }
    var refazParcelas = (antes.parc || 1) !== (r.parc || 1) || (isR ? liq(antes) : antes.total) !== final || antes.venc !== r.venc || mudouPago;
    return dados.then(function (d) {
      return DB.upd(tabela, r.dbId, d, 'Não foi possível salvar a alteração');
    }).then(function () {
      if (!refazParcelas || (antes.parc || 1) <= 1 && (r.parc || 1) <= 1) return null;
      // parcelas antigas saem (exclusão lógica) e entram as novas
      return DB.ler(DB.sel('parcelas', 'id').eq(fk, r.dbId).is('excluido_em', null)).then(function (ps) {
        return Promise.all(ps.map(function (x) {
          return DB.upd('parcelas', x.id, {
            excluido_em: agoraIso()
          }, 'Não foi possível atualizar as parcelas');
        }));
      }).then(function () {
        return (r.parc || 1) > 1 ? DB.ins('parcelas', FinSvc.parcelas(isR, r.dbId, final, r.parc, r.venc || r.data, pago), 'Não foi possível salvar as parcelas') : null;
      });
    }).then(function () {
      avisoOk(isR ? 'Receita atualizada' : 'Despesa atualizada');
    });
  },
  // marcar como recebido/pago ou voltar para pendente
  status: function status(kind, r, novo) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
      var isR, pago, _final2, fk, ps;
      return _regenerator().w(function (_context4) {
        while (1) switch (_context4.n) {
          case 0:
            isR = kind === 'rec', pago = novo !== 'Pendente', _final2 = isR ? liq(r) : r.total, fk = isR ? 'conta_receber_id' : 'conta_pagar_id';
            _context4.n = 1;
            return DB.upd(isR ? 'contas_receber' : 'contas_pagar', r.dbId, FinSvc.baixa(pago, _final2), 'Não foi possível atualizar o status');
          case 1:
            if (!((r.parc || 1) > 1)) {
              _context4.n = 3;
              break;
            }
            _context4.n = 2;
            return DB.ler(DB.sel('parcelas', 'id,valor').eq(fk, r.dbId));
          case 2:
            ps = _context4.v;
            _context4.n = 3;
            return Promise.all(ps.map(function (x) {
              return DB.upd('parcelas', x.id, {
                status: pago ? 'pago' : 'pendente',
                data_pagamento: pago ? TODAY_ISO : null,
                valor_pago: pago ? x.valor : null
              }, 'Não foi possível atualizar as parcelas');
            }));
          case 3:
            return _context4.a(2);
        }
      }, _callee4);
    }))();
  },
  // categorias: a tela manda a lista nova; aqui vira inclusão ou exclusão no banco
  categorias: function categorias(antes, depois) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      var ops, _t;
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.p = _context5.n) {
          case 0:
            ops = [];
            [['rec', 'receita', '#1F5EFF'], ['desp', 'despesa', '#7B4BC4']].forEach(function (_ref3) {
              var _ref4 = _slicedToArray(_ref3, 3),
                k = _ref4[0],
                tipo = _ref4[1],
                cor = _ref4[2];
              var lista = (CAT.v.categorias || []).filter(function (x) {
                return x.tipo === tipo;
              });
              (depois[k] || []).filter(function (n) {
                return !(antes[k] || []).includes(n);
              }).forEach(function (nome) {
                var row = {
                  id: novoId(),
                  nome: nome,
                  tipo: tipo,
                  cor: cor,
                  ordem: lista.reduce(function (m, x) {
                    return Math.max(m, x.ordem || 0);
                  }, 0) + 1,
                  ativo: true
                };
                catSet({
                  categorias: [].concat(_toConsumableArray(CAT.v.categorias), [_objectSpread(_objectSpread({}, row), {}, {
                    clinica_id: CLI()
                  })])
                });
                ops.push(DB.ins('categorias_financeiras', row, 'Não foi possível criar a categoria'));
              });
              (antes[k] || []).filter(function (n) {
                return !(depois[k] || []).includes(n);
              }).forEach(function (nome) {
                var c = lista.find(function (x) {
                  return x.nome === nome;
                });
                if (!c) return;
                catSet({
                  categorias: CAT.v.categorias.filter(function (x) {
                    return x.id !== c.id;
                  })
                });
                ops.push(DB.del('categorias_financeiras', c.id, 'Não foi possível remover a categoria'));
              });
            });
            hidratarCatalogos();
            _context5.p = 1;
            _context5.n = 2;
            return Promise.all(ops);
          case 2:
            _context5.n = 4;
            break;
          case 3:
            _context5.p = 3;
            _t = _context5.v;
            carregar('catalogos', true);
          case 4:
            return _context5.a(2);
        }
      }, _callee5, null, [[1, 3]]);
    }))();
  },
  salvarNF: function salvarNF(cfg) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
      var atual, row, fresco, _t2;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            atual = CAT.v.nf;
            if (!atual) {
              _context6.n = 2;
              break;
            }
            _context6.n = 1;
            return DB.upd('configuracao_nota_fiscal', atual.id, nfBanco(cfg), 'Não foi possível salvar a configuração fiscal');
          case 1:
            _t2 = _context6.v;
            _context6.n = 4;
            break;
          case 2:
            _context6.n = 3;
            return DB.ins('configuracao_nota_fiscal', nfBanco(cfg), 'Não foi possível salvar a configuração fiscal');
          case 3:
            _t2 = _context6.v;
          case 4:
            row = _t2;
            if (!(cfg.certSenha && cfg.certSenha !== SENHA_GUARDADA)) {
              _context6.n = 5;
              break;
            }
            _context6.n = 5;
            return DB.rpc('salvar_segredo', {
              p_clinica: CLI(),
              p_provedor: 'certificado_fiscal',
              p_segredo: cfg.certSenha
            }, 'Não foi possível guardar a senha do certificado');
          case 5:
            _context6.n = 6;
            return DB.ler(DB.sel('configuracao_nota_fiscal').eq('id', row.id));
          case 6:
            fresco = _context6.v;
            catSet({
              nf: fresco[0] || row
            });
            NF_STORE.v = nfTela(fresco[0] || row);
            avisar(NF_STORE);
            avisoOk('Configuração fiscal salva');
          case 7:
            return _context6.a(2);
        }
      }, _callee6);
    }))();
  },
  enviarCertificado: function enviarCertificado(file) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
      var path, atual, dados, row, _t3;
      return _regenerator().w(function (_context7) {
        while (1) switch (_context7.n) {
          case 0:
            _context7.n = 1;
            return ARQ.enviar('fiscal', 'certificado', file);
          case 1:
            path = _context7.v;
            atual = CAT.v.nf;
            dados = {
              certificado_path: path,
              certificado_nome_arquivo: file.name
            };
            if (!atual) {
              _context7.n = 3;
              break;
            }
            _context7.n = 2;
            return DB.upd('configuracao_nota_fiscal', atual.id, dados, 'Não foi possível salvar o certificado');
          case 2:
            _t3 = _context7.v;
            _context7.n = 5;
            break;
          case 3:
            _context7.n = 4;
            return DB.ins('configuracao_nota_fiscal', dados, 'Não foi possível salvar o certificado');
          case 4:
            _t3 = _context7.v;
          case 5:
            row = _t3;
            catSet({
              nf: row
            });
            NF_STORE.v = _objectSpread(_objectSpread({}, NF_STORE.v), {}, {
              cert: file.name,
              certPath: path
            });
            avisar(NF_STORE);
            avisoOk('Certificado enviado', 'Fica guardado em pasta privada da clínica.');
          case 6:
            return _context7.a(2);
        }
      }, _callee7);
    }))();
  }
};
// saldo do início da janela de 30 dias do Salute Pay, a partir do saldo inicial da conta
function saldoPay(rec, desp) {
  var cb = CAT.v.contaBancaria;
  if (!cb) return 0;
  var ini = isoOf(addD(TODAY, -29));
  var s = Number(cb.saldo_inicial || 0);
  if (cb.saldo_inicial_em) {
    rec.forEach(function (r) {
      if (r.status === 'Recebido' && r.data >= cb.saldo_inicial_em && r.data < ini) s += liq(r);
    });
    desp.forEach(function (d) {
      if (d.status === 'Pago' && d.data >= cb.saldo_inicial_em && d.data < ini) s -= d.total;
    });
  }
  return s;
}

/* =====================================================================
   ESTOQUE
   ===================================================================== */
var PROD_SEL = 'id,nome,quantidade_atual,estoque_minimo,validade,custo_medio,categoria:categorias_produto(nome),unidade:unidades_medida(nome)';
var prodTela = function prodTela(p, c) {
  var cp = c || {
    7: 0,
    14: 0,
    30: 0,
    60: 0,
    90: 0
  };
  return {
    id: p.id,
    dbId: p.id,
    nome: p.nome,
    cat: p.categoria ? p.categoria.nome : '',
    un: p.unidade ? p.unidade.nome : '',
    qtd: Number(p.quantidade_atual),
    min: Number(p.estoque_minimo),
    val: p.validade || '',
    vm: Number(p.custo_medio || 0),
    cons: cp[30],
    consP: cp
  };
};
var EST_CONS = {};
function carregarConsumo() {
  return _carregarConsumo.apply(this, arguments);
}
function _carregarConsumo() {
  _carregarConsumo = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee12() {
    var desde, movs, out;
    return _regenerator().w(function (_context12) {
      while (1) switch (_context12.n) {
        case 0:
          desde = addD(TODAY, -89);
          _context12.n = 1;
          return DB.tudo(function () {
            return DB.sel('movimentacoes_estoque', 'produto_id,quantidade,data').eq('tipo', 'saida').gte('data', desde.toISOString()).order('data').order('id');
          });
        case 1:
          movs = _context12.v;
          out = {};
          movs.forEach(function (m) {
            var dias = Math.round((TODAY - new Date(BR.diaDe(m.data) + 'T00:00:00')) / 86400000);
            var c = out[m.produto_id] = out[m.produto_id] || {
              7: 0,
              14: 0,
              30: 0,
              60: 0,
              90: 0
            };
            [7, 14, 30, 60, 90].forEach(function (k) {
              if (dias < k) c[k] += Number(m.quantidade);
            });
          });
          EST_CONS = out;
        case 2:
          return _context12.a(2);
      }
    }, _callee12);
  }));
  return _carregarConsumo.apply(this, arguments);
}
CARGAS.estoque = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8() {
  var _yield$Promise$all3, _yield$Promise$all4, prods;
  return _regenerator().w(function (_context8) {
    while (1) switch (_context8.n) {
      case 0:
        _context8.n = 1;
        return carregar('catalogos');
      case 1:
        _context8.n = 2;
        return Promise.all([DB.ler(DB.sel('produtos', PROD_SEL).order('nome')), carregarConsumo()]);
      case 2:
        _yield$Promise$all3 = _context8.v;
        _yield$Promise$all4 = _slicedToArray(_yield$Promise$all3, 1);
        prods = _yield$Promise$all4[0];
        PROD_STORE.v = prods.map(function (p) {
          return prodTela(p, EST_CONS[p.id]);
        });
        avisar(PROD_STORE);
      case 3:
        return _context8.a(2);
    }
  }, _callee8);
}));
var qFmtE = function qFmtE(n) {
  return Number.isInteger(n) ? String(n) : Number(n).toLocaleString('pt-BR');
};
var catsEst = function catsEst(c) {
  return (c.catProd || []).filter(function (x) {
    return x.ativo;
  }).map(function (x) {
    return x.nome;
  });
};
var unisEst = function unisEst(c) {
  return (c.unidades || []).filter(function (x) {
    return x.ativo;
  }).map(function (x) {
    return x.nome;
  });
};
var EstSvc = {
  criar: function criar(p) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9() {
      return _regenerator().w(function (_context9) {
        while (1) switch (_context9.n) {
          case 0:
            _context9.n = 1;
            return DB.ins('produtos', {
              id: p.id,
              nome: p.nome,
              categoria_produto_id: catId('catProd', p.cat),
              unidade_medida_id: catId('unidades', p.un),
              quantidade_atual: p.qtd || 0,
              estoque_minimo: p.min || 0,
              validade: p.val || null,
              custo_medio: p.vm || null
            }, 'Não foi possível cadastrar o produto');
          case 1:
            CAT_EXTRA.v = _objectSpread(_objectSpread({}, CAT_EXTRA.v), {}, {
              produtos: [].concat(_toConsumableArray(CAT_EXTRA.v.produtos || []), [{
                id: p.id,
                nome: p.nome,
                quantidade_atual: p.qtd || 0,
                unidade: {
                  nome: p.un
                }
              }])
            });
            avisar(CAT_EXTRA);
            avisoOk('Produto cadastrado');
          case 2:
            return _context9.a(2);
        }
      }, _callee9);
    }))();
  },
  // botões de mais e menos: viram entrada ou saída no banco; o saldo final vem do banco
  mover: function mover(p, d, extra) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0() {
      var r;
      return _regenerator().w(function (_context0) {
        while (1) switch (_context0.n) {
          case 0:
            _context0.n = 1;
            return DB.ins('movimentacoes_estoque', _objectSpread({
              produto_id: p.dbId,
              tipo: d < 0 ? 'saida' : 'entrada',
              quantidade: Math.abs(d),
              custo_unitario: p.vm || null,
              motivo: d < 0 ? 'Baixa manual' : 'Entrada manual'
            }, extra || {}), d < 0 ? 'Não foi possível dar baixa' : 'Não foi possível registrar a entrada');
          case 1:
            r = _context0.v;
            PROD_STORE.v = PROD_STORE.v.map(function (x) {
              return x.id === p.id ? _objectSpread(_objectSpread({}, x), {}, {
                qtd: Number(r.quantidade_depois)
              }) : x;
            });
            avisar(PROD_STORE);
            CAT_EXTRA.v = _objectSpread(_objectSpread({}, CAT_EXTRA.v), {}, {
              produtos: (CAT_EXTRA.v.produtos || []).map(function (x) {
                return x.id === p.id ? _objectSpread(_objectSpread({}, x), {}, {
                  quantidade_atual: Number(r.quantidade_depois)
                }) : x;
              })
            });
            return _context0.a(2, r);
        }
      }, _callee0);
    }))();
  },
  // entrada (com lote, validade e custo opcionais) ou baixa com motivo; o saldo é calculado no banco
  lancar: function lancar(p, m) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
      var TIPO_BAIXA, loteId, l, motivo, r, c;
      return _regenerator().w(function (_context1) {
        while (1) switch (_context1.n) {
          case 0:
            TIPO_BAIXA = {
              'Uso em procedimento': 'saida',
              Outro: 'saida'
            };
            loteId = null;
            if (!(m.tipo === 'entrada' && (m.lote || m.validade))) {
              _context1.n = 2;
              break;
            }
            _context1.n = 1;
            return DB.ins('lotes', {
              produto_id: p.dbId,
              numero_lote: m.lote || null,
              validade: m.validade || null,
              quantidade: m.qtd,
              custo_unitario: m.custo,
              recebido_em: BR.hoje()
            }, 'Não foi possível salvar o lote');
          case 1:
            l = _context1.v;
            loteId = l.id;
          case 2:
            motivo = m.tipo === 'entrada' ? ['Entrada', m.lote ? 'lote ' + m.lote : '', m.obs].filter(Boolean).join(' · ') : [m.motivo, m.obs].filter(Boolean).join(' · ');
            _context1.n = 3;
            return DB.ins('movimentacoes_estoque', {
              produto_id: p.dbId,
              lote_id: loteId,
              tipo: m.tipo === 'entrada' ? 'entrada' : TIPO_BAIXA[m.motivo] || 'perda',
              quantidade: m.qtd,
              custo_unitario: m.tipo === 'entrada' ? m.custo != null ? m.custo : p.vm || null : p.vm || null,
              motivo: motivo
            }, m.tipo === 'entrada' ? 'Não foi possível registrar a entrada' : 'Não foi possível dar baixa');
          case 3:
            r = _context1.v;
            if (!(m.validade && (!p.val || m.validade < p.val))) {
              _context1.n = 4;
              break;
            }
            _context1.n = 4;
            return DB.upd('produtos', p.dbId, {
              validade: m.validade
            }, 'Não foi possível atualizar a validade');
          case 4:
            if (m.tipo !== 'entrada' && (TIPO_BAIXA[m.motivo] || 'perda') === 'saida') {
              c = EST_CONS[p.dbId] = EST_CONS[p.dbId] || {
                7: 0,
                14: 0,
                30: 0,
                60: 0,
                90: 0
              };
              Object.keys(c).forEach(function (k) {
                c[k] += m.qtd;
              });
            }
            _context1.n = 5;
            return EstSvc.recarregar(p.id);
          case 5:
            avisoOk(m.tipo === 'entrada' ? 'Entrada registrada' : 'Baixa registrada', p.nome + ': saldo ' + qFmtE(Number(r.quantidade_depois)));
            return _context1.a(2, r);
        }
      }, _callee1);
    }))();
  },
  recarregar: function recarregar(id) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10() {
      var r;
      return _regenerator().w(function (_context10) {
        while (1) switch (_context10.n) {
          case 0:
            _context10.n = 1;
            return DB.ler(DB.sel('produtos', PROD_SEL).eq('id', id))["catch"](function () {
              return [];
            });
          case 1:
            r = _context10.v;
            if (r[0]) {
              PROD_STORE.v = PROD_STORE.v.map(function (x) {
                return x.id === id ? _objectSpread({}, prodTela(r[0], EST_CONS[id] || x.consP)) : x;
              });
              avisar(PROD_STORE);
              CAT_EXTRA.v = _objectSpread(_objectSpread({}, CAT_EXTRA.v), {}, {
                produtos: (CAT_EXTRA.v.produtos || []).map(function (x) {
                  return x.id === id ? _objectSpread(_objectSpread({}, x), {}, {
                    quantidade_atual: Number(r[0].quantidade_atual)
                  }) : x;
                })
              });
            }
          case 2:
            return _context10.a(2);
        }
      }, _callee10);
    }))();
  },
  // categorias e unidades: a tela manda a lista nova; aqui vira inclusão ou exclusão
  lista: function lista(chave, tabela, antes, depois) {
    return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11() {
      var ops, atuais, _t4;
      return _regenerator().w(function (_context11) {
        while (1) switch (_context11.p = _context11.n) {
          case 0:
            ops = [], atuais = CAT.v[chave] || [];
            depois.filter(function (n) {
              return !antes.includes(n);
            }).forEach(function (nome) {
              var row = chave === 'catProd' ? {
                id: novoId(),
                nome: nome,
                ordem: atuais.reduce(function (m, x) {
                  return Math.max(m, x.ordem || 0);
                }, 0) + 1,
                ativo: true
              } : {
                id: novoId(),
                nome: nome,
                ativo: true
              };
              catSet(_defineProperty({}, chave, [].concat(_toConsumableArray(CAT.v[chave] || []), [_objectSpread(_objectSpread({}, row), {}, {
                clinica_id: CLI()
              })])));
              ops.push(DB.ins(tabela, row, 'Não foi possível salvar'));
            });
            antes.filter(function (n) {
              return !depois.includes(n);
            }).forEach(function (nome) {
              var c = atuais.find(function (x) {
                return x.nome === nome;
              });
              if (!c) return;
              catSet(_defineProperty({}, chave, (CAT.v[chave] || []).filter(function (x) {
                return x.id !== c.id;
              })));
              ops.push(DB.del(tabela, c.id, 'Não foi possível remover'));
            });
            hidratarCatalogos();
            _context11.p = 1;
            _context11.n = 2;
            return Promise.all(ops);
          case 2:
            _context11.n = 4;
            break;
          case 3:
            _context11.p = 3;
            _t4 = _context11.v;
            carregar('catalogos', true);
          case 4:
            return _context11.a(2);
        }
      }, _callee11, null, [[1, 3]]);
    }))();
  }
};
Object.assign(window, {
  FinSvc: FinSvc,
  EstSvc: EstSvc,
  recTela: recTela,
  despTela: despTela,
  nfTela: nfTela,
  saldoPay: saldoPay,
  catsFin: catsFin,
  catsEst: catsEst,
  unisEst: unisEst,
  hidratarMetas: hidratarMetas,
  SENHA_GUARDADA: SENHA_GUARDADA
});