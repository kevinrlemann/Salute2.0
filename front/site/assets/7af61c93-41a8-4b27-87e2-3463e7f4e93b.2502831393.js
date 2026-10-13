"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// Shell: icon rail + top bar (desktop) · compact bar + bottom nav (mobile).
var _window$SaluteProjeto = window.SaluteProjetoDesigner_8b4683,
  Sidebar = _window$SaluteProjeto.Sidebar,
  TopBar = _window$SaluteProjeto.TopBar,
  MobileBottomNav = _window$SaluteProjeto.MobileBottomNav;
var MARK = 'data:image/png;base64,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';
function useIsMobile() {
  var q = '(max-width: 767px)';
  var _React$useState = React.useState(function () {
      return !!window.__FORCE_MOBILE || window.matchMedia(q).matches;
    }),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    m = _React$useState2[0],
    setM = _React$useState2[1];
  React.useEffect(function () {
    if (window.__FORCE_MOBILE) return;
    var mq = window.matchMedia(q);
    var f = function f() {
      return setM(mq.matches);
    };
    mq.addEventListener('change', f);
    return function () {
      return mq.removeEventListener('change', f);
    };
  }, []);
  return m;
}
function AppShell(_ref) {
  var active = _ref.active,
    onNavigate = _ref.onNavigate,
    title = _ref.title,
    subtitle = _ref.subtitle,
    children = _ref.children,
    _ref$items = _ref.items,
    items = _ref$items === void 0 ? KIT_NAV : _ref$items,
    topExtra = _ref.topExtra,
    banner = _ref.banner;
  var mobile = useIsMobile();
  var scroller = React.useRef(null);
  var _ref2 = SB_ON ? useStore(NOTIF) : [null],
    _ref3 = _slicedToArray(_ref2, 1),
    notif = _ref3[0];
  var nNotif = SB_ON ? notif.naoLidas : 1;
  React.useEffect(function () {
    if (scroller.current) scroller.current.scrollTop = 0;
  }, [active]);
  if (mobile) {
    return /*#__PURE__*/React.createElement("div", {
      "data-screen-label": "Mobile \xB7 ".concat(title),
      style: {
        position: 'relative',
        height: '100%',
        overflow: 'hidden'
      }
    }, /*#__PURE__*/React.createElement("div", {
      ref: scroller,
      style: {
        height: '100%',
        overflowY: 'auto',
        scrollbarWidth: 'none',
        padding: '0 16px calc(104px + env(safe-area-inset-bottom))',
        boxSizing: 'border-box'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'sticky',
        top: 0,
        zIndex: 5,
        margin: '0 -16px',
        padding: 'calc(8px + env(safe-area-inset-top)) 16px 10px',
        background: 'linear-gradient(180deg, rgba(226,238,250,.96) 70%, rgba(226,238,250,0))'
      }
    }, /*#__PURE__*/React.createElement(TopBar, {
      compact: true,
      title: title,
      notifications: nNotif,
      user: KIT_USER,
      logoMarkSrc: MARK,
      beforeAvatar: topExtra,
      onUser: abrirConta,
      onNotifications: abrirNotif,
      afterAvatar: /*#__PURE__*/React.createElement(BotaoSair, {
        variante: "compacto"
      })
    })), banner, children), /*#__PURE__*/React.createElement(MobileBottomNav, {
      items: items,
      activeId: active,
      onSelect: onNavigate,
      style: {
        position: 'absolute',
        left: 12,
        right: 12,
        bottom: 'calc(12px + env(safe-area-inset-bottom))',
        zIndex: 10
      }
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 44,
      minHeight: '100vh',
      padding: '40px 44px 28px 40px',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 40,
      height: 'calc(100vh - 68px)',
      minHeight: 640,
      flexShrink: 0,
      zIndex: 5,
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    items: items,
    activeId: active,
    onSelect: onNavigate,
    logoMarkSrc: MARK,
    user: KIT_USER,
    onLogo: function onLogo() {
      return onNavigate('painel');
    },
    onUser: abrirConta,
    afterUser: /*#__PURE__*/React.createElement(BotaoSair, {
      variante: "lateral"
    }),
    style: {
      height: 'auto',
      flex: 1
    }
  })), /*#__PURE__*/React.createElement("main", {
    "data-screen-label": title,
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 30
    }
  }, banner, /*#__PURE__*/React.createElement(TopBar, {
    title: title,
    subtitle: subtitle,
    notifications: nNotif,
    messages: 0,
    user: KIT_USER,
    onMessages: function onMessages() {
      return onNavigate('mensagens');
    },
    beforeAvatar: topExtra,
    onUser: abrirConta,
    onNotifications: abrirNotif,
    afterAvatar: /*#__PURE__*/React.createElement(BotaoSair, {
      variante: "topo"
    })
  }), children));
}
Object.assign(window, {
  AppShell: AppShell,
  useIsMobile: useIsMobile
});