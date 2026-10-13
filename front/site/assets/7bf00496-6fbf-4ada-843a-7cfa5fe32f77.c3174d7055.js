/* @ds-bundle: {"format":4,"namespace":"SaluteProjetoDesigner_8b4683","components":[{"name":"BarChart","sourcePath":"components/charts/BarChart.jsx"},{"name":"GaugeChart","sourcePath":"components/charts/GaugeChart.jsx"},{"name":"SalesFunnel","sourcePath":"components/charts/SalesFunnel.jsx"},{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"TrendPill","sourcePath":"components/core/TrendPill.jsx"},{"name":"KanbanCard","sourcePath":"components/data/KanbanCard.jsx"},{"name":"MessageBubble","sourcePath":"components/data/MessageBubble.jsx"},{"name":"Progress","sourcePath":"components/data/Progress.jsx"},{"name":"Table","sourcePath":"components/data/Table.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"SegmentedControl","sourcePath":"components/forms/SegmentedControl.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"MobileBottomNav","sourcePath":"components/navigation/MobileBottomNav.jsx"},{"name":"PageHeader","sourcePath":"components/navigation/PageHeader.jsx"},{"name":"Sidebar","sourcePath":"components/navigation/Sidebar.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"TopBar","sourcePath":"components/navigation/TopBar.jsx"},{"name":"CardIcon","sourcePath":"components/surfaces/Card.jsx"},{"name":"Card","sourcePath":"components/surfaces/Card.jsx"},{"name":"Dialog","sourcePath":"components/surfaces/Dialog.jsx"},{"name":"EmptyState","sourcePath":"components/surfaces/EmptyState.jsx"},{"name":"StatCard","sourcePath":"components/surfaces/StatCard.jsx"},{"name":"Toast","sourcePath":"components/surfaces/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/surfaces/Tooltip.jsx"}],"sourceHashes":{"components/charts/BarChart.jsx":"462bce295c6c","components/charts/GaugeChart.jsx":"a569972e5cac","components/charts/SalesFunnel.jsx":"8d9287c346ff","components/core/Avatar.jsx":"2b8ba5406385","components/core/Badge.jsx":"a52b629d7744","components/core/Button.jsx":"4e07752534c8","components/core/Icon.jsx":"44196c8655f8","components/core/IconButton.jsx":"24d2313b4e33","components/core/TrendPill.jsx":"e338f9d60d82","components/data/KanbanCard.jsx":"4f5b58edd79d","components/data/MessageBubble.jsx":"6bb4ed2d1efb","components/data/Progress.jsx":"09015b06b09d","components/data/Table.jsx":"9d51c4b06390","components/forms/Checkbox.jsx":"38b9a8c4607a","components/forms/Input.jsx":"a1704808b557","components/forms/SegmentedControl.jsx":"2f112b5585f0","components/forms/Select.jsx":"973a79f3dc73","components/forms/Switch.jsx":"7290b3c9a8f5","components/navigation/MobileBottomNav.jsx":"1e1b52785aad","components/navigation/PageHeader.jsx":"f506544169ae","components/navigation/Sidebar.jsx":"610e3c3f68dc","components/navigation/Tabs.jsx":"511b49141505","components/navigation/TopBar.jsx":"b88d4b7a7e0f","components/surfaces/Card.jsx":"a9685e3a60d8","components/surfaces/Dialog.jsx":"beef841a25f1","components/surfaces/EmptyState.jsx":"cb59dfa2d404","components/surfaces/StatCard.jsx":"4336d296d525","components/surfaces/Toast.jsx":"53d08d360e28","components/surfaces/Tooltip.jsx":"490a372680bc","ui_kits/admin/App.jsx":"86dd44ec9a8e","ui_kits/admin/MensagensScreen.jsx":"c61b2523d2f1","ui_kits/admin/PacientesAgenda.jsx":"6bbfc5a2e60d","ui_kits/admin/PainelScreen.jsx":"a0379a6f9646","ui_kits/admin/PerfilScreen.jsx":"8f30da9da3e9","ui_kits/admin/Shell.jsx":"5e9dc645db08","ui_kits/admin/kit-shared.jsx":"2a45308e63dc"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SaluteProjetoDesigner_8b4683 = window.SaluteProjetoDesigner_8b4683 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/charts/BarChart.jsx
try { (() => {
function niceMax(v) {
  if (v <= 0) return 10;
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / p;
  const m = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
  return m * p;
}
function BarChart({
  data = [],
  max,
  ticks = 5,
  height = 240,
  highlightIndex,
  valueFormatter = v => v,
  showAxis = true,
  style
}) {
  const [hover, setHover] = React.useState(null);
  const top = max || niceMax(Math.max(...data.map(d => Math.max(d.target || 0, d.value || 0)), 1) * 1.05);
  const tickVals = Array.from({
    length: ticks + 1
  }, (_, i) => {
    const v = top / ticks * (ticks - i);
    return top >= 10 ? Math.round(v) : Math.round(v * 10) / 10;
  });
  const pct = v => `${Math.max(0, v / top * 100)}%`;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, showAxis ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height,
      paddingBottom: 0,
      fontSize: 11,
      color: 'var(--text-subtle)',
      textAlign: 'right',
      minWidth: 22,
      fontVariantNumeric: 'tabular-nums'
    }
  }, tickVals.map((t, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      lineHeight: '0px'
    }
  }, t))) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      height
    }
  }, tickVals.map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: `${i / ticks * 100}%`,
      height: 1,
      background: i === ticks ? 'var(--border-default)' : 'var(--border-subtle)',
      opacity: i === ticks ? 1 : 0.8
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '0 8px',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 'clamp(6px, 3%, 24px)'
    }
  }, data.map((d, i) => {
    const base = d.base !== undefined ? d.base : Math.min(d.value, top * 0.2);
    const hi = hover === i || highlightIndex === i;
    return /*#__PURE__*/React.createElement("div", {
      key: d.label + i,
      onMouseEnter: () => setHover(i),
      onMouseLeave: () => setHover(null),
      style: {
        position: 'relative',
        flex: 1,
        maxWidth: 88,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        cursor: 'default'
      }
    }, hi ? /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        bottom: `calc(${pct(Math.max(d.value, d.target || 0))} + 8px)`,
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '4px 8px',
        borderRadius: 8,
        background: 'var(--surface-inverse)',
        color: '#fff',
        fontSize: 11,
        fontWeight: 600,
        whiteSpace: 'nowrap',
        boxShadow: 'var(--shadow-pop)',
        zIndex: 2
      }
    }, valueFormatter(d.value)) : null, d.target && d.target > d.value ? /*#__PURE__*/React.createElement("div", {
      style: {
        height: pct(d.target - d.value),
        background: 'var(--pattern-hatch)',
        borderRadius: '10px 10px 0 0',
        opacity: hi ? 1 : 0.75
      }
    }) : null, /*#__PURE__*/React.createElement("div", {
      style: {
        height: pct(d.value - base),
        background: 'var(--gradient-blue)',
        borderRadius: 10,
        boxShadow: hi ? '0 8px 20px -6px rgba(10,92,255,.6)' : 'none',
        transition: 'box-shadow var(--dur-base)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        height: pct(base),
        background: 'var(--pattern-dots)',
        borderRadius: '0 0 4px 4px',
        marginTop: 2
      }
    }));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 'clamp(6px, 3%, 24px)',
      margin: '10px 8px 0'
    }
  }, data.map((d, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      flex: 1,
      maxWidth: 88,
      textAlign: 'center',
      fontSize: 12,
      color: hover === i || highlightIndex === i ? 'var(--text-strong)' : 'var(--text-muted)',
      fontWeight: hover === i || highlightIndex === i ? 600 : 400
    }
  }, d.label)))));
}
Object.assign(__ds_scope, { BarChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/BarChart.jsx", error: String((e && e.message) || e) }); }

// components/charts/GaugeChart.jsx
try { (() => {
function arc(cx, cy, r, f0, f1) {
  const a0 = Math.PI * (1 - f0),
    a1 = Math.PI * (1 - f1);
  const x0 = cx + r * Math.cos(a0),
    y0 = cy - r * Math.sin(a0),
    x1 = cx + r * Math.cos(a1),
    y1 = cy - r * Math.sin(a1);
  return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`;
}
function GaugeChart({
  value = 0,
  max = 100,
  label,
  display,
  legend = [],
  size = 320,
  style
}) {
  const uid = React.useId ? React.useId().replace(/:/g, '') : 'g' + Math.round(Math.random() * 1e6);
  const f = Math.max(0, Math.min(1, value / max));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12,
      fontFamily: 'var(--font-sans)',
      width: '100%',
      maxWidth: size,
      margin: '0 auto',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%',
      aspectRatio: '2 / 1.04'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 200 104",
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%',
      overflow: 'visible'
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: `gg${uid}`,
    x1: "0",
    y1: "1",
    x2: "0.5",
    y2: "0"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#A9E3FB"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#5FB6F2"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: `gr${uid}`,
    x1: "1",
    y1: "1",
    x2: "0.5",
    y2: "0"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#B9C8FF"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#5E7EF0"
  })), /*#__PURE__*/React.createElement("linearGradient", {
    id: `gi${uid}`,
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0",
    stopColor: "#DDE6FF"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "1",
    stopColor: "#EEF3FF"
  }))), /*#__PURE__*/React.createElement("path", {
    d: "M 2 102 A 98 98 0 0 1 198 102 Z",
    fill: "rgba(105,133,255,.07)"
  }), /*#__PURE__*/React.createElement("path", {
    d: arc(100, 102, 80, 0, 1),
    fill: "none",
    stroke: "rgba(105,133,255,.14)",
    strokeWidth: "30"
  }), /*#__PURE__*/React.createElement("path", {
    d: arc(100, 102, 80, 0, Math.min(f, 0.5)),
    fill: "none",
    stroke: `url(#gg${uid})`,
    strokeWidth: "30"
  }), f > 0.5 ? /*#__PURE__*/React.createElement("path", {
    d: arc(100, 102, 80, 0.5, f),
    fill: "none",
    stroke: `url(#gr${uid})`,
    strokeWidth: "30"
  }) : null, /*#__PURE__*/React.createElement("path", {
    d: arc(100, 102, 58, 0, 1),
    fill: "none",
    stroke: "#8DBBFF",
    strokeWidth: "1",
    strokeDasharray: "3 3.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 50 102 A 50 50 0 0 1 150 102 Z",
    fill: `url(#gi${uid})`,
    stroke: "rgba(105,133,255,.35)",
    strokeWidth: "0.75"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: '4%',
      textAlign: 'center'
    }
  }, label ? /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 'clamp(20px, 7vw, 30px)',
      fontWeight: 600,
      color: 'var(--text-strong)',
      letterSpacing: 'var(--tracking-tight)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, display !== undefined ? display : value))), legend.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      flexWrap: 'wrap',
      justifyContent: 'center',
      fontSize: 13
    }
  }, legend.map(l => /*#__PURE__*/React.createElement("span", {
    key: l.label,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: l.color
    }
  }), l.label, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-strong)',
      fontWeight: 600
    }
  }, l.value)))) : null);
}
Object.assign(__ds_scope, { GaugeChart });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/GaugeChart.jsx", error: String((e && e.message) || e) }); }

// components/charts/SalesFunnel.jsx
try { (() => {
function SalesFunnel({
  stages = [],
  showFooter = true,
  style
}) {
  const total = stages.reduce((a, s) => a + (s.value || 0), 0);
  const n = stages.length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, stages.map((s, i) => {
    const pct = total > 0 ? s.value / total * 100 : 0;
    const w = Math.max(100 - i * (55 / Math.max(n - 1, 1)), 40);
    const c = s.color || 'var(--primary)';
    return /*#__PURE__*/React.createElement("div", {
      key: s.label,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'relative',
        width: `${w}%`,
        height: 44,
        borderRadius: 14,
        overflow: 'hidden',
        background: `color-mix(in srgb, ${c} 10%, white)`,
        border: '1px solid rgba(255,255,255,.9)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: '0 auto 0 0',
        width: `${Math.max(pct, 6)}%`,
        background: `linear-gradient(90deg, ${c}, color-mix(in srgb, ${c} 55%, transparent))`,
        borderRadius: 14,
        transition: 'width var(--dur-slow) var(--ease-out)'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 14px',
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: 500,
        color: 'var(--text-strong)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, s.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 600,
        color: 'var(--text-strong)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, s.value))), /*#__PURE__*/React.createElement("span", {
      style: {
        minWidth: 36,
        fontSize: 12,
        fontWeight: 500,
        color: 'var(--text-muted)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, pct.toFixed(0), "%"));
  }), showFooter && total > 0 ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '2px 0 0',
      fontSize: 11,
      color: 'var(--text-subtle)',
      textAlign: 'right'
    }
  }, total, " leads ativos no quadro") : null);
}
Object.assign(__ds_scope, { SalesFunnel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/charts/SalesFunnel.jsx", error: String((e && e.message) || e) }); }

// components/core/Avatar.jsx
try { (() => {
const PALETTE = [['#E0ECFF', '#0A47E6'], ['#EFE7FB', '#6D28D9'], ['#D9F5FF', '#0B7FB3'], ['#ECF8E3', '#3F7F1E'], ['#FBF8D6', '#8A7A08'], ['#E3E8FF', '#3D57D6']];
function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = h * 31 + s.charCodeAt(i) | 0;
  return Math.abs(h);
}
function initials(name) {
  const p = String(name || '?').trim().split(/\s+/);
  return ((p[0] || '')[0] || '').toUpperCase() + ((p.length > 1 ? p[p.length - 1][0] : '') || '').toUpperCase();
}
function Avatar({
  name = '',
  src,
  size = 40,
  status,
  ring = false,
  style
}) {
  const [bg, fg] = PALETTE[hash(name) % PALETTE.length];
  const dot = {
    online: 'var(--green-500)',
    away: 'var(--amber-500)',
    offline: 'var(--ink-300)'
  }[status];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'inline-flex',
      width: size,
      height: size,
      flexShrink: 0,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: src ? 'var(--ink-100)' : bg,
      color: fg,
      fontFamily: 'var(--font-sans)',
      fontWeight: 600,
      fontSize: Math.round(size * 0.36),
      letterSpacing: '0.01em',
      boxShadow: ring ? '0 0 0 2px #fff, 0 0 0 3.5px var(--blue-200)' : 'none'
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials(name)), dot ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      width: Math.max(8, size * 0.24),
      height: Math.max(8, size * 0.24),
      borderRadius: '50%',
      background: dot,
      boxShadow: '0 0 0 2px #fff'
    }
  }) : null);
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const LUCIDE_SRC = 'https://unpkg.com/lucide@0.468.0/dist/umd/lucide.min.js';
// impressão digital do arquivo oficial do npm (lucide 0.468.0): se o unpkg entregar outra coisa, o navegador recusa
const LUCIDE_SRI = 'sha384-uTYyvsSSUZeaPhb5RbKlQa0zY/WpX/QHfvg2mczXyBQOpkWPEDy9lczyp+w7SKXu';
let lucidePromise = null;
function ensureLucide() {
  if (typeof window === 'undefined' || window.lucide) return Promise.resolve();
  if (!lucidePromise) {
    lucidePromise = new Promise(resolve => {
      const s = document.createElement('script');
      s.src = LUCIDE_SRC;
      s.integrity = LUCIDE_SRI;
      s.crossOrigin = 'anonymous';
      s.async = true;
      s.onload = resolve;
      s.onerror = resolve;
      document.head.appendChild(s);
    });
  }
  return lucidePromise;
}
const toPascal = n => String(n).split(/[-_ ]/).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
function Icon({
  name,
  size = 20,
  strokeWidth = 1.75,
  color = 'currentColor',
  style,
  title,
  ...rest
}) {
  const [, force] = React.useState(0);
  React.useEffect(() => {
    if (typeof window !== 'undefined' && !window.lucide) ensureLucide().then(() => force(x => x + 1));
  }, []);
  const lib = typeof window !== 'undefined' ? window.lucide : null;
  const key = toPascal(name);
  const node = lib && (lib.icons && lib.icons[key] || lib[key]);
  let kids = [];
  if (Array.isArray(node)) {
    const list = node[0] === 'svg' ? node[2] || [] : node;
    kids = list.map(([tag, attrs], i) => React.createElement(tag, {
      key: i,
      ...attrs
    }));
  }
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": title ? undefined : true,
    role: title ? 'img' : undefined,
    style: {
      display: 'block',
      flexShrink: 0,
      ...style
    }
  }, rest), title ? /*#__PURE__*/React.createElement("title", null, title) : null, kids);
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONES = {
  neutral: ['var(--ink-100)', 'var(--ink-700)', 'var(--ink-500)'],
  primary: ['var(--primary-soft)', 'var(--blue-700)', 'var(--primary)'],
  success: ['var(--success-soft)', 'var(--green-600)', 'var(--green-600)'],
  warning: ['var(--warning-soft)', 'var(--amber-600)', 'var(--amber-500)'],
  danger: ['var(--danger-soft)', 'var(--red-600)', 'var(--red-500)'],
  info: ['var(--info-soft)', 'var(--teal-500)', 'var(--teal-500)'],
  accent: ['var(--accent-soft)', 'var(--purple-600)', 'var(--purple-600)']
};
function Badge({
  children,
  tone = 'neutral',
  variant = 'soft',
  size = 'md',
  dot = false,
  icon,
  style,
  ...rest
}) {
  const [bg, fg, solid] = TONES[tone] || TONES.neutral;
  const sm = size === 'sm';
  const look = variant === 'solid' ? {
    background: solid,
    color: '#fff',
    border: '1px solid transparent'
  } : variant === 'outline' ? {
    background: 'var(--surface-card-solid)',
    color: fg,
    border: '1px solid var(--border-subtle)'
  } : {
    background: bg,
    color: fg,
    border: '1px solid transparent'
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: sm ? 4 : 6,
      height: sm ? 20 : 24,
      padding: sm ? '0 8px' : '0 10px',
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-sans)',
      fontSize: sm ? 11 : 12,
      fontWeight: 500,
      lineHeight: 1,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...look,
      ...style
    }
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: variant === 'solid' ? '#fff' : solid
    }
  }) : null, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: sm ? 12 : 14
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    h: 32,
    px: 14,
    fs: 13,
    icon: 16,
    gap: 6
  },
  md: {
    h: 40,
    px: 18,
    fs: 14,
    icon: 18,
    gap: 8
  },
  lg: {
    h: 48,
    px: 22,
    fs: 15,
    icon: 20,
    gap: 8
  }
};
function variantStyle(variant, hover, disabled) {
  switch (variant) {
    case 'secondary':
      return {
        background: hover ? 'var(--surface-card-solid)' : 'var(--surface-glass)',
        color: 'var(--text-strong)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-xs)'
      };
    case 'soft':
      return {
        background: hover ? 'var(--primary-soft-hover)' : 'var(--primary-soft)',
        color: 'var(--primary)',
        border: '1px solid transparent'
      };
    case 'ghost':
      return {
        background: hover ? 'var(--surface-hover)' : 'transparent',
        color: 'var(--text-body)',
        border: '1px solid transparent'
      };
    case 'danger':
      return {
        background: hover ? 'var(--red-600)' : 'var(--red-500)',
        color: '#fff',
        border: '1px solid transparent',
        boxShadow: '0 8px 20px -8px rgba(239,68,68,.55)'
      };
    case 'ai':
      return {
        background: hover ? 'linear-gradient(135deg,rgba(79,123,230,.22),rgba(123,75,196,.22))' : 'var(--gradient-ai)',
        color: 'var(--purple-600)',
        border: '1px solid rgba(123,75,196,.22)'
      };
    case 'primary':
    default:
      return {
        background: hover && !disabled ? 'var(--primary-hover)' : 'var(--gradient-primary-btn)',
        color: 'var(--text-on-primary)',
        border: '1px solid transparent',
        boxShadow: disabled ? 'none' : 'var(--shadow-primary)'
      };
  }
}
function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  fullWidth = false,
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const isDisabled = disabled || loading;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: isDisabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      display: fullWidth ? 'flex' : 'inline-flex',
      width: fullWidth ? '100%' : undefined,
      alignItems: 'center',
      justifyContent: 'center',
      gap: s.gap,
      height: s.h,
      padding: `0 ${s.px}px`,
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-sans)',
      fontSize: s.fs,
      fontWeight: 500,
      letterSpacing: '-0.005em',
      whiteSpace: 'nowrap',
      cursor: isDisabled ? 'not-allowed' : 'pointer',
      opacity: isDisabled ? 0.5 : 1,
      transform: press && !isDisabled ? 'scale(var(--press-scale))' : 'none',
      transition: 'background var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      outline: 'none',
      ...variantStyle(variant, hover && !isDisabled, isDisabled),
      ...style
    }
  }, rest), loading ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "loader-circle",
    size: s.icon,
    style: {
      animation: 'salute-spin 0.9s linear infinite'
    }
  }) : iconLeft ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconLeft,
    size: s.icon
  }) : null, children, iconRight ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: s.icon
  }) : null, loading ? /*#__PURE__*/React.createElement("style", null, '@keyframes salute-spin{to{transform:rotate(360deg)}}') : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZE = {
  sm: [32, 16],
  md: [40, 18],
  lg: [48, 20],
  xl: [56, 22]
};
function IconButton({
  icon,
  label,
  variant = 'glass',
  size = 'md',
  badge,
  active = false,
  disabled = false,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const [d, is] = SIZE[size] || SIZE.md;
  const v = active ? 'primary' : variant;
  const look = {
    glass: {
      background: hover ? 'var(--surface-card-solid)' : 'var(--surface-glass)',
      color: 'var(--text-body)',
      border: '1px solid var(--border-glass)',
      boxShadow: 'var(--shadow-sm)'
    },
    outline: {
      background: hover ? 'var(--surface-hover)' : 'transparent',
      color: 'var(--primary)',
      border: '1px solid var(--blue-200)'
    },
    ghost: {
      background: hover ? 'var(--surface-hover)' : 'transparent',
      color: 'var(--text-muted)',
      border: '1px solid transparent'
    },
    soft: {
      background: hover ? 'var(--primary-soft-hover)' : 'var(--primary-soft)',
      color: 'var(--primary)',
      border: '1px solid transparent'
    },
    primary: {
      background: hover ? 'var(--primary-hover)' : 'var(--primary)',
      color: '#fff',
      border: '1px solid transparent',
      boxShadow: 'var(--shadow-primary)'
    }
  }[v] || {};
  const showCount = typeof badge === 'number' && badge > 0;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": label,
    title: label,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    style: {
      position: 'relative',
      width: d,
      height: d,
      minWidth: d,
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      padding: 0,
      outline: 'none',
      transform: press ? 'scale(var(--press-scale))' : 'none',
      transition: 'all var(--dur-base) var(--ease-out)',
      ...look,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: is,
    strokeWidth: active ? 2 : 1.75
  }), badge === true ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: d * 0.2,
      right: d * 0.22,
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--red-500)',
      boxShadow: '0 0 0 2px #fff'
    }
  }) : null, showCount ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: -3,
      right: -3,
      minWidth: 18,
      height: 18,
      padding: '0 5px',
      borderRadius: 999,
      background: 'var(--red-500)',
      color: '#fff',
      fontSize: 10,
      fontWeight: 700,
      lineHeight: '18px',
      textAlign: 'center',
      boxShadow: '0 0 0 2px #fff',
      boxSizing: 'border-box'
    }
  }, badge > 99 ? '99+' : badge) : null);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/TrendPill.jsx
try { (() => {
function TrendPill({
  value,
  label,
  direction = 'up',
  tone,
  style
}) {
  const t = tone || (direction === 'down' ? 'danger' : 'primary');
  const color = {
    primary: 'var(--primary)',
    success: 'var(--green-600)',
    danger: 'var(--red-600)',
    neutral: 'var(--text-muted)'
  }[t] || 'var(--primary)';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      height: 24,
      padding: '0 10px',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--surface-card-solid)',
      border: '1px solid var(--border-subtle)',
      color,
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      fontWeight: 500,
      whiteSpace: 'nowrap',
      boxSizing: 'border-box',
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: direction === 'down' ? 'trending-down' : 'trending-up',
    size: 14,
    strokeWidth: 2
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontVariantNumeric: 'tabular-nums'
    }
  }, value), label ? /*#__PURE__*/React.createElement("span", {
    style: {
      color,
      opacity: 0.85
    }
  }, label) : null);
}
Object.assign(__ds_scope, { TrendPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/TrendPill.jsx", error: String((e && e.message) || e) }); }

// components/data/KanbanCard.jsx
try { (() => {
const CHANNEL = {
  whatsapp: ['message-circle', '#16A34A'],
  instagram: ['instagram', '#C13584'],
  site: ['globe', '#0A5CFF'],
  facebook: ['facebook', '#1877F2'],
  telefone: ['phone', '#6B7A99']
};
function KanbanCard({
  name,
  phone,
  channel = 'whatsapp',
  value,
  procedure,
  tags = [],
  time,
  assignee,
  aiHandled = false,
  unread = 0,
  onClick,
  dragging = false,
  style
}) {
  const [hover, setHover] = React.useState(false);
  const [ic, col] = CHANNEL[channel] || CHANNEL.whatsapp;
  return /*#__PURE__*/React.createElement("article", {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      padding: 14,
      borderRadius: 'var(--radius-lg)',
      background: 'var(--surface-card-solid)',
      border: '1px solid var(--border-subtle)',
      boxSizing: 'border-box',
      boxShadow: dragging ? 'var(--shadow-pop)' : hover ? 'var(--shadow-card)' : 'var(--shadow-xs)',
      transform: dragging ? 'rotate(-1.5deg)' : hover ? 'translateY(-1px)' : 'none',
      transition: 'all var(--dur-base) var(--ease-out)',
      cursor: onClick ? 'pointer' : 'default',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    name: name,
    size: 36
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-strong)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, name), phone ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 12,
      color: 'var(--text-muted)',
      display: 'flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: col,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: ic,
    size: 12,
    strokeWidth: 2
  })), phone) : null), unread > 0 ? /*#__PURE__*/React.createElement("span", {
    style: {
      minWidth: 20,
      height: 20,
      padding: '0 6px',
      boxSizing: 'border-box',
      borderRadius: 999,
      background: 'var(--primary)',
      color: '#fff',
      fontSize: 11,
      fontWeight: 600,
      lineHeight: '20px',
      textAlign: 'center'
    }
  }, unread) : null), procedure || value ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
      padding: '8px 10px',
      borderRadius: 12,
      background: 'var(--surface-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-body)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, procedure), value ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--text-strong)',
      fontVariantNumeric: 'tabular-nums',
      whiteSpace: 'nowrap'
    }
  }, value) : null) : null, tags.length || aiHandled ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6
    }
  }, aiHandled ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      height: 22,
      padding: '0 8px',
      borderRadius: 999,
      background: 'var(--accent-soft)',
      color: 'var(--purple-600)',
      fontSize: 11,
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "sparkles",
    size: 11
  }), "IA") : null, tags.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      height: 22,
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0 8px',
      borderRadius: 999,
      background: 'var(--primary-soft)',
      color: 'var(--blue-700)',
      fontSize: 11,
      fontWeight: 500
    }
  }, t))) : null, time || assignee ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: 11,
      color: 'var(--text-subtle)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "clock-3",
    size: 12
  }), time), assignee ? /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    name: assignee,
    size: 22
  }) : null) : null);
}
Object.assign(__ds_scope, { KanbanCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/KanbanCard.jsx", error: String((e && e.message) || e) }); }

// components/data/MessageBubble.jsx
try { (() => {
function MessageBubble({
  direction = 'in',
  text,
  time,
  status,
  sender,
  children,
  style
}) {
  const out = direction === 'out';
  const isAI = sender === 'ia';
  const statusIcon = {
    sent: 'check',
    delivered: 'check-check',
    read: 'check-check'
  }[status];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: out ? 'flex-end' : 'flex-start',
      gap: 4,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, isAI || sender && sender !== 'ia' ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 11,
      fontWeight: 500,
      color: isAI ? 'var(--purple-600)' : 'var(--text-muted)'
    }
  }, isAI ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "sparkles",
    size: 11
  }) : null, isAI ? 'Renata IA' : sender) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 'min(520px, 82%)',
      padding: '10px 14px',
      fontSize: 14,
      lineHeight: 1.45,
      textWrap: 'pretty',
      boxSizing: 'border-box',
      borderRadius: out ? '18px 18px 6px 18px' : '18px 18px 18px 6px',
      background: out ? isAI ? 'var(--gradient-brand)' : 'var(--gradient-primary-btn)' : 'var(--surface-card-solid)',
      color: out ? '#fff' : 'var(--text-strong)',
      border: out ? '1px solid transparent' : '1px solid var(--border-subtle)',
      boxShadow: out ? '0 6px 16px -8px rgba(10,92,255,.55)' : 'var(--shadow-xs)'
    }
  }, text, children), time ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 11,
      color: 'var(--text-subtle)'
    }
  }, time, out && statusIcon ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: status === 'read' ? 'var(--primary)' : 'var(--text-subtle)',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: statusIcon,
    size: 13,
    strokeWidth: 2
  })) : null) : null);
}
Object.assign(__ds_scope, { MessageBubble });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/MessageBubble.jsx", error: String((e && e.message) || e) }); }

// components/data/Progress.jsx
try { (() => {
const FILL = {
  primary: 'var(--gradient-blue-h)',
  success: 'linear-gradient(90deg,#9AE072,#22C55E)',
  warning: 'linear-gradient(90deg,#EEE260,#F59E0B)',
  danger: 'linear-gradient(90deg,#FCA5A5,#EF4444)',
  accent: 'var(--gradient-brand)',
  sky: 'var(--gradient-gauge)'
};
function Progress({
  value = 0,
  max = 100,
  tone = 'primary',
  size = 'md',
  label,
  showValue = false,
  hatched = false,
  style
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const h = {
    sm: 6,
    md: 10,
    lg: 14
  }[size] || 10;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, label || showValue ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      gap: 8,
      fontSize: 13
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-body)'
    }
  }, label) : /*#__PURE__*/React.createElement("span", null), showValue ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 600,
      color: 'var(--text-strong)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, Math.round(pct), "%") : null) : null, /*#__PURE__*/React.createElement("div", {
    role: "progressbar",
    "aria-valuenow": Math.round(pct),
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    style: {
      position: 'relative',
      height: h,
      borderRadius: 999,
      overflow: 'hidden',
      background: hatched ? 'var(--pattern-hatch), var(--blue-50)' : 'var(--surface-sunken)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: '0 auto 0 0',
      width: `${pct}%`,
      borderRadius: 999,
      background: FILL[tone] || FILL.primary,
      transition: 'width var(--dur-slow) var(--ease-out)'
    }
  })));
}
Object.assign(__ds_scope, { Progress });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Progress.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  checked,
  defaultChecked = false,
  onChange,
  label,
  description,
  indeterminate = false,
  disabled = false,
  style
}) {
  const [inner, setInner] = React.useState(defaultChecked);
  const isOn = checked !== undefined ? checked : inner;
  const on = isOn || indeterminate;
  const toggle = () => {
    if (disabled) return;
    const n = !isOn;
    if (checked === undefined) setInner(n);
    onChange && onChange(n);
  };
  return /*#__PURE__*/React.createElement("span", {
    role: "checkbox",
    "aria-checked": indeterminate ? 'mixed' : isOn,
    tabIndex: disabled ? -1 : 0,
    onClick: toggle,
    onKeyDown: e => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggle();
      }
    },
    style: {
      display: 'inline-flex',
      alignItems: description ? 'flex-start' : 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--font-sans)',
      outline: 'none',
      userSelect: 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      flexShrink: 0,
      borderRadius: 6,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxSizing: 'border-box',
      background: on ? 'var(--primary)' : 'var(--surface-card-solid)',
      border: `1.5px solid ${on ? 'var(--primary)' : 'var(--border-strong)'}`,
      color: '#fff',
      boxShadow: on ? '0 4px 10px -4px rgba(10,92,255,.6)' : 'none',
      transition: 'all var(--dur-fast) var(--ease-out)'
    }
  }, indeterminate ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "minus",
    size: 14,
    strokeWidth: 2.5
  }) : isOn ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 14,
    strokeWidth: 2.5
  }) : null), label || description ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-strong)'
    }
  }, label) : null, description ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, description) : null) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/data/Table.jsx
try { (() => {
function Table({
  columns = [],
  rows = [],
  rowKey = 'id',
  selectable = false,
  selected,
  onSelectionChange,
  onRowClick,
  dense = false,
  style
}) {
  const [innerSel, setInnerSel] = React.useState([]);
  const sel = selected !== undefined ? selected : innerSel;
  const setSel = s => {
    if (selected === undefined) setInnerSel(s);
    onSelectionChange && onSelectionChange(s);
  };
  const [hover, setHover] = React.useState(null);
  const allOn = rows.length > 0 && sel.length === rows.length;
  const py = dense ? 10 : 14;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      overflowX: 'auto',
      overflowY: 'hidden',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
      fontSize: 14
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, selectable ? /*#__PURE__*/React.createElement("th", {
    style: {
      width: 44,
      padding: `10px 0 10px 16px`,
      background: 'var(--surface-sunken)',
      borderRadius: '14px 0 0 14px'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Checkbox, {
    checked: allOn,
    indeterminate: sel.length > 0 && !allOn,
    onChange: () => setSel(allOn ? [] : rows.map(r => r[rowKey]))
  })) : null, columns.map((c, i) => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      textAlign: c.align || 'left',
      width: c.width,
      padding: '10px 16px',
      fontSize: 12,
      fontWeight: 500,
      color: 'var(--text-muted)',
      whiteSpace: 'nowrap',
      background: 'var(--surface-sunken)',
      borderRadius: !selectable && i === 0 ? '14px 0 0 14px' : i === columns.length - 1 ? '0 14px 14px 0' : 0
    }
  }, c.label)))), /*#__PURE__*/React.createElement("tbody", null, rows.map(r => {
    const k = r[rowKey];
    const on = sel.includes(k);
    const bg = on ? 'var(--surface-selected)' : hover === k ? 'rgba(255,255,255,.7)' : 'transparent';
    return /*#__PURE__*/React.createElement("tr", {
      key: k,
      onClick: () => onRowClick && onRowClick(r),
      onMouseEnter: () => setHover(k),
      onMouseLeave: () => setHover(null),
      style: {
        cursor: onRowClick ? 'pointer' : 'default'
      }
    }, selectable ? /*#__PURE__*/React.createElement("td", {
      onClick: e => e.stopPropagation(),
      style: {
        padding: `${py}px 0 ${py}px 16px`,
        background: bg,
        borderBottom: '1px solid var(--border-subtle)'
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Checkbox, {
      checked: on,
      onChange: () => setSel(on ? sel.filter(x => x !== k) : [...sel, k])
    })) : null, columns.map(c => /*#__PURE__*/React.createElement("td", {
      key: c.key,
      style: {
        textAlign: c.align || 'left',
        padding: `${py}px 16px`,
        color: 'var(--text-strong)',
        background: bg,
        borderBottom: '1px solid var(--border-subtle)',
        whiteSpace: 'nowrap',
        transition: 'background var(--dur-fast)'
      }
    }, c.render ? c.render(r) : r[c.key])));
  }))));
}
Object.assign(__ds_scope, { Table });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Table.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const H = {
  sm: 32,
  md: 40,
  lg: 48
};
function Input({
  label,
  hint,
  error,
  iconLeft,
  iconRight,
  variant = 'default',
  size = 'md',
  id,
  style,
  inputStyle,
  disabled,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const autoId = React.useId ? React.useId() : undefined;
  const fid = id || autoId;
  const h = H[size] || H.md;
  const pill = variant === 'search' || variant === 'glass';
  const left = variant === 'search' && !iconLeft ? 'search' : iconLeft;
  return /*#__PURE__*/React.createElement("label", {
    htmlFor: fid,
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-strong)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      height: h,
      borderRadius: pill ? 'var(--radius-pill)' : 'var(--radius-md)',
      background: variant === 'default' ? 'var(--surface-card-solid)' : 'var(--surface-glass)',
      border: `1px solid ${error ? 'var(--red-500)' : focus ? 'var(--primary)' : variant === 'default' ? 'var(--border-default)' : 'var(--border-glass)'}`,
      boxShadow: focus ? `0 0 0 4px ${error ? 'rgba(239,68,68,.18)' : 'var(--focus-ring)'}` : variant === 'default' ? 'var(--shadow-xs)' : 'var(--shadow-sm)',
      transition: 'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      opacity: disabled ? 0.55 : 1
    }
  }, left ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: pill ? 16 : 12,
      color: 'var(--text-subtle)',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: left,
    size: 18
  })) : null, /*#__PURE__*/React.createElement("input", _extends({
    id: fid,
    disabled: disabled,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      minWidth: 0,
      height: '100%',
      border: 0,
      outline: 'none',
      background: 'transparent',
      color: 'var(--text-strong)',
      fontFamily: 'inherit',
      fontSize: 14,
      padding: `0 ${iconRight ? 40 : pill ? 18 : 12}px 0 ${left ? pill ? 44 : 38 : pill ? 18 : 12}px`,
      borderRadius: 'inherit',
      ...inputStyle
    }
  }, rest)), iconRight ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 14,
      color: 'var(--text-subtle)',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: 18
  })) : null), error || hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: error ? 'var(--red-600)' : 'var(--text-muted)'
    }
  }, error || hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/SegmentedControl.jsx
try { (() => {
function SegmentedControl({
  options = [],
  value,
  defaultValue,
  onChange,
  size = 'md',
  fullWidth = false,
  style
}) {
  const norm = options.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o);
  const [inner, setInner] = React.useState(defaultValue !== undefined ? defaultValue : norm[0] && norm[0].value);
  const cur = value !== undefined ? value : inner;
  const h = size === 'sm' ? 32 : 40;
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: fullWidth ? 'flex' : 'inline-flex',
      width: fullWidth ? '100%' : undefined,
      alignItems: 'center',
      gap: 2,
      padding: 3,
      height: h,
      boxSizing: 'border-box',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--surface-sunken)',
      border: '1px solid var(--border-glass)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, norm.map(o => {
    const active = o.value === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: o.value,
      role: "tab",
      "aria-selected": active,
      type: "button",
      onClick: () => {
        if (value === undefined) setInner(o.value);
        onChange && onChange(o.value);
      },
      style: {
        flex: fullWidth ? 1 : undefined,
        height: '100%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        padding: `0 ${size === 'sm' ? 12 : 16}px`,
        border: 0,
        borderRadius: 'var(--radius-pill)',
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: size === 'sm' ? 12 : 13,
        fontWeight: 500,
        whiteSpace: 'nowrap',
        background: active ? 'var(--surface-card-solid)' : 'transparent',
        color: active ? 'var(--primary)' : 'var(--text-muted)',
        boxShadow: active ? 'var(--shadow-sm)' : 'none',
        transition: 'all var(--dur-base) var(--ease-out)'
      }
    }, o.icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: o.icon,
      size: 15
    }) : null, o.label);
  }));
}
Object.assign(__ds_scope, { SegmentedControl });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/SegmentedControl.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  label,
  options = [],
  value,
  defaultValue,
  onChange,
  placeholder,
  icon,
  variant = 'default',
  size = 'md',
  hint,
  disabled,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const h = {
    sm: 32,
    md: 40,
    lg: 48
  }[size] || 40;
  const pill = variant === 'pill';
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-strong)'
    }
  }, label) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      height: h,
      borderRadius: pill ? 'var(--radius-pill)' : 'var(--radius-md)',
      background: pill ? 'var(--surface-glass)' : 'var(--surface-card-solid)',
      border: `1px solid ${focus ? 'var(--primary)' : pill ? 'var(--border-subtle)' : 'var(--border-default)'}`,
      boxShadow: focus ? '0 0 0 4px var(--focus-ring)' : 'var(--shadow-xs)',
      transition: 'all var(--dur-base) var(--ease-out)',
      opacity: disabled ? 0.55 : 1
    }
  }, icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 12,
      color: 'var(--text-strong)',
      display: 'flex',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 16
  })) : null, /*#__PURE__*/React.createElement("select", _extends({
    value: value,
    defaultValue: defaultValue,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      flex: 1,
      height: '100%',
      border: 0,
      outline: 'none',
      background: 'transparent',
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontSize: pill ? 13 : 14,
      fontWeight: pill ? 500 : 400,
      color: 'var(--text-strong)',
      padding: `0 36px 0 ${icon ? 36 : 14}px`,
      borderRadius: 'inherit'
    }
  }, rest), placeholder ? /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, placeholder) : null, options.map(o => {
    const opt = typeof o === 'string' ? {
      value: o,
      label: o
    } : o;
    return /*#__PURE__*/React.createElement("option", {
      key: opt.value,
      value: opt.value
    }, opt.label);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 12,
      color: 'var(--text-muted)',
      display: 'flex',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 16
  }))), hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  checked,
  defaultChecked = false,
  onChange,
  label,
  description,
  size = 'md',
  disabled = false,
  style
}) {
  const [inner, setInner] = React.useState(defaultChecked);
  const on = checked !== undefined ? checked : inner;
  const [w, h] = size === 'sm' ? [32, 18] : [44, 24];
  const k = h - 6;
  const toggle = () => {
    if (disabled) return;
    const n = !on;
    if (checked === undefined) setInner(n);
    onChange && onChange(n);
  };
  return /*#__PURE__*/React.createElement("span", {
    role: "switch",
    "aria-checked": on,
    tabIndex: disabled ? -1 : 0,
    onClick: toggle,
    onKeyDown: e => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggle();
      }
    },
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--font-sans)',
      outline: 'none',
      userSelect: 'none',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative',
      width: w,
      height: h,
      flexShrink: 0,
      borderRadius: 999,
      background: on ? 'var(--gradient-blue-h)' : 'var(--ink-200)',
      boxShadow: on ? '0 4px 12px -4px rgba(10,92,255,.6)' : 'inset 0 1px 2px rgba(8,28,68,.08)',
      transition: 'background var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 3,
      left: on ? w - k - 3 : 3,
      width: k,
      height: k,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: '0 1px 3px rgba(8,28,68,.25)',
      transition: 'left var(--dur-base) var(--ease-spring)'
    }
  })), label || description ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: 'var(--text-strong)'
    }
  }, label) : null, description ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, description) : null) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/MobileBottomNav.jsx
try { (() => {
function MobileBottomNav({
  items = [],
  activeId,
  onSelect,
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Navega\xE7\xE3o principal",
    style: {
      display: 'grid',
      gridTemplateColumns: `repeat(${items.length || 1}, minmax(0,1fr))`,
      alignItems: 'center',
      boxSizing: 'border-box',
      height: 68,
      padding: '0 6px',
      borderRadius: 28,
      background: 'var(--surface-glass)',
      border: '1.5px solid var(--border-glass)',
      boxShadow: 'var(--shadow-pop), var(--shadow-inset-glass)',
      backdropFilter: 'blur(var(--blur-glass))',
      WebkitBackdropFilter: 'blur(var(--blur-glass))',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, items.map(it => {
    const active = it.id === activeId;
    const count = typeof it.badge === 'number' && it.badge > 0 ? it.badge > 9 ? '9+' : it.badge : null;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      type: "button",
      "aria-current": active ? 'page' : undefined,
      "aria-label": it.locked ? it.label + ', sem acesso' : undefined,
      onClick: () => onSelect && onSelect(it.id, it),
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        minHeight: 56,
        border: 0,
        background: 'transparent',
        cursor: 'pointer',
        color: active ? 'var(--primary)' : it.locked ? 'var(--text-subtle)' : 'var(--text-muted)',
        opacity: it.locked && !active ? .75 : 1,
        fontFamily: 'inherit',
        fontSize: 11,
        fontWeight: active ? 600 : 500,
        padding: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: active ? 52 : 40,
        height: 30,
        borderRadius: 999,
        background: active ? 'var(--primary-soft)' : 'transparent',
        transition: 'all var(--dur-base) var(--ease-spring)'
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: it.icon,
      size: 21,
      strokeWidth: active ? 2.2 : 1.8
    }), it.locked ? /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: { position: 'absolute', right: active ? 4 : -2, bottom: -3, width: 15, height: 15, borderRadius: '50%', background: '#fff', color: '#6B7A93', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px -1px rgba(23,73,170,.35)' }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, { name: 'lock', size: 9, strokeWidth: 2.6 })) : null, count ? /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        top: -2,
        right: active ? 6 : 0,
        minWidth: 16,
        height: 16,
        padding: '0 4px',
        boxSizing: 'border-box',
        borderRadius: 999,
        background: 'var(--red-500)',
        color: '#fff',
        fontSize: 9,
        fontWeight: 700,
        lineHeight: '16px',
        textAlign: 'center',
        boxShadow: '0 0 0 2px #fff'
      }
    }, count) : null), /*#__PURE__*/React.createElement("span", {
      style: {
        lineHeight: 1
      }
    }, it.label));
  }));
}
Object.assign(__ds_scope, { MobileBottomNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/MobileBottomNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Sidebar.jsx
try { (() => {
function RailItem({
  item,
  active,
  onSelect
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: 60,
      height: 60,
      flexShrink: 0,
      zIndex: active ? 2 : 1
    }
  }, active ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      left: 21,
      top: 50,
      width: 18,
      height: 30,
      background: 'linear-gradient(180deg,#0B3FD9 0%,rgba(11,63,217,.55) 70%,rgba(11,63,217,0) 100%)',
      clipPath: 'polygon(0 0,100% 0,72% 100%,28% 100%)'
    }
  }) : null, /*#__PURE__*/React.createElement("button", {
    type: "button",
    title: item.locked ? item.label + ' (sem acesso)' : item.label,
    "aria-label": item.locked ? item.label + ', sem acesso' : item.label,
    "aria-current": active ? 'page' : undefined,
    onClick: () => onSelect && onSelect(item.id, item),
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      width: 60,
      height: 60,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      padding: 0,
      border: active ? '0' : '1.5px solid rgba(255,255,255,.95)',
      background: active ? 'linear-gradient(180deg,#1D5BFF 0%,#0B3FD9 100%)' : hover ? '#fff' : item.locked ? 'rgba(255,255,255,.55)' : 'rgba(255,255,255,.82)',
      color: active ? '#fff' : item.locked ? '#A3B0C6' : '#5A6B8C',
      boxShadow: active ? '0 10px 22px -8px rgba(11,63,217,.65)' : '0 6px 16px -10px rgba(23,73,170,.35)',
      transition: 'all var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: item.icon,
    size: 22,
    strokeWidth: 1.6
  }), item.locked ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: { position: 'absolute', right: 4, bottom: 4, width: 22, height: 22, borderRadius: '50%', background: '#fff', color: active ? '#0B3FD9' : '#6B7A93', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 8px -2px rgba(23,73,170,.35)' }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, { name: 'lock', size: 12, strokeWidth: 2.4 })) : null, item.badge ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 12,
      right: 14,
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--red-500)',
      boxShadow: '0 0 0 2px #fff'
    }
  }) : null));
}
function Sidebar({
  items = [],
  activeId,
  onSelect,
  logoMarkSrc,
  user,
  onLogo,
  onUser,
  afterUser,
  style
}) {
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      height: '100%',
      width: 64,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxSizing: 'border-box',
      padding: '4px 0 8px',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onLogo,
    "aria-label": "Salute IA",
    style: {
      position: 'relative',
      width: 60,
      height: 118,
      borderRadius: 30,
      border: 0,
      padding: 0,
      cursor: 'pointer',
      flexShrink: 0,
      overflow: 'hidden',
      background: 'linear-gradient(180deg,#5AA2FF 0%,#0A5CFF 42%,#0A7BFF 70%,#2FD3FF 100%)',
      boxShadow: '0 14px 30px -14px rgba(10,92,255,.7), inset 0 1px 0 rgba(255,255,255,.5)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      inset: 0,
      background: 'radial-gradient(60px 40px at 30% 12%, rgba(255,255,255,.55), rgba(255,255,255,0) 70%)'
    }
  }), logoMarkSrc ? /*#__PURE__*/React.createElement("img", {
    src: logoMarkSrc,
    alt: "",
    style: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%,-50%)',
      height: 48,
      width: 'auto',
      filter: 'brightness(0) invert(1) drop-shadow(0 2px 6px rgba(10,40,140,.35))',
      opacity: 1
    }
  }) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 24
    }
  }), /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Menu principal",
    style: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 20
    }
  }, items.length > 1 ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      top: 30,
      bottom: 30,
      left: 27,
      width: 6,
      borderRadius: 3,
      background: 'rgba(214,226,242,.9)'
    }
  }) : null, items.map(it => /*#__PURE__*/React.createElement(RailItem, {
    key: it.id,
    item: it,
    active: it.id === activeId,
    onSelect: onSelect
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1.4,
      minHeight: 24
    }
  }), user ? /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: onUser,
      "aria-label": "Minha conta",
      title: user.name,
      style: { border: 0, padding: 0, background: 'none', cursor: onUser ? 'pointer' : 'default', borderRadius: '50%', display: 'flex', flexShrink: 0 }
    }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
      name: user.name,
      src: user.avatar,
      size: 56,
      ring: true
    })) : null, afterUser || null);
}
Object.assign(__ds_scope, { Sidebar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Sidebar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  items = [],
  value,
  defaultValue,
  onChange,
  variant = 'underline',
  style
}) {
  const norm = items.map(t => typeof t === 'string' ? {
    value: t,
    label: t
  } : t);
  const [inner, setInner] = React.useState(defaultValue !== undefined ? defaultValue : norm[0] && norm[0].value);
  const cur = value !== undefined ? value : inner;
  const pick = v => {
    if (value === undefined) setInner(v);
    onChange && onChange(v);
  };
  const pill = variant === 'pill';
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    style: {
      display: 'flex',
      flexShrink: 0,
      alignItems: 'center',
      gap: pill ? 6 : 4,
      overflowX: 'auto',
      scrollbarWidth: 'none',
      fontFamily: 'var(--font-sans)',
      borderBottom: pill ? 'none' : '1px solid var(--border-subtle)',
      ...style
    }
  }, norm.map(t => {
    const active = t.value === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: t.value,
      role: "tab",
      type: "button",
      "aria-selected": active,
      onClick: () => pick(t.value),
      style: {
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        whiteSpace: 'nowrap',
        border: pill ? `1px solid ${active ? 'transparent' : 'var(--border-glass)'}` : 0,
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 14,
        fontWeight: active ? 600 : 500,
        padding: pill ? '0 16px' : '0 12px',
        height: pill ? 36 : 44,
        borderRadius: pill ? 999 : 0,
        background: pill ? active ? 'var(--surface-inverse)' : 'var(--surface-card)' : 'transparent',
        color: pill ? active ? '#fff' : 'var(--text-body)' : active ? 'var(--primary)' : 'var(--text-muted)',
        transition: 'all var(--dur-base) var(--ease-out)'
      }
    }, t.icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: t.icon,
      size: 16
    }) : null, t.label, t.count !== undefined ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        fontWeight: 600,
        padding: '2px 7px',
        borderRadius: 999,
        background: active ? pill ? 'rgba(255,255,255,.2)' : 'var(--primary-soft)' : 'var(--surface-sunken)',
        color: pill && active ? '#fff' : active ? 'var(--primary)' : 'var(--text-muted)'
      }
    }, t.count) : null, !pill ? /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 8,
        right: 8,
        bottom: -1,
        height: 2.5,
        borderRadius: 2,
        background: 'var(--primary)',
        opacity: active ? 1 : 0,
        transition: 'opacity var(--dur-base)'
      }
    }) : null);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/PageHeader.jsx
try { (() => {
function PageHeader({
  title,
  subtitle,
  icon,
  breadcrumb = [],
  actions,
  tabs,
  activeTab,
  onTabChange,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, breadcrumb.length ? /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Trilha",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, breadcrumb.map((b, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: b + i
  }, i > 0 ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-right",
    size: 12
  }) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      color: i === breadcrumb.length - 1 ? 'var(--text-strong)' : undefined,
      fontWeight: i === breadcrumb.length - 1 ? 500 : 400
    }
  }, b)))) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 48,
      height: 48,
      borderRadius: 16,
      background: 'var(--gradient-blue)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow-primary)',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 22
  })) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 220px',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      font: 'var(--type-page-title)',
      letterSpacing: 'var(--tracking-tight)',
      color: 'var(--text-strong)'
    }
  }, title), subtitle ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0',
      fontSize: 14,
      color: 'var(--text-muted)'
    }
  }, subtitle) : null), actions ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, actions) : null), tabs && tabs.length ? /*#__PURE__*/React.createElement(__ds_scope.Tabs, {
    items: tabs,
    value: activeTab,
    onChange: onTabChange
  }) : null);
}
Object.assign(__ds_scope, { PageHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/PageHeader.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TopBar.jsx
try { (() => {
function TopBar({
  title,
  subtitle,
  searchPlaceholder = 'Buscar...',
  onSearch,
  notifications = 0,
  messages = 0,
  user,
  onNotifications,
  onMessages,
  onMenu,
  compact = false,
  logoMarkSrc,
  beforeAvatar,
  afterAvatar,
  onUser,
  style
}) {
  const [q, setQ] = React.useState('');
  if (compact) {
    return /*#__PURE__*/React.createElement("header", {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        height: 'var(--mobile-topbar-h)',
        fontFamily: 'var(--font-sans)',
        ...style
      }
    }, onMenu ? /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
      icon: "menu",
      label: "Abrir menu",
      variant: "glass",
      size: "md",
      onClick: onMenu
    }) : null, logoMarkSrc ? /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'relative', flexShrink: 0, width: 26, height: 40, borderRadius: 13, overflow: 'hidden',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(180deg,#5AA2FF 0%,#0A5CFF 42%,#0A7BFF 70%,#2FD3FF 100%)',
        boxShadow: '0 8px 18px -10px rgba(10,92,255,.7), inset 0 1px 0 rgba(255,255,255,.5)'
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: logoMarkSrc,
      alt: "Salute IA",
      style: { height: 24, width: 'auto', filter: 'brightness(0) invert(1)' }
    })) : null, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("h1", {
      style: {
        margin: 0,
        fontSize: 18,
        fontWeight: 600,
        color: 'var(--text-strong)',
        letterSpacing: 'var(--tracking-snug)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, title)), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
      icon: "bell",
      label: "Notifica\xE7\xF5es",
      variant: "glass",
      size: "md",
      badge: notifications > 0 ? true : undefined,
      onClick: onNotifications
    }), beforeAvatar || null, user ? /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: onUser,
      "aria-label": "Minha conta",
      title: user.name,
      style: { border: 0, padding: 0, background: 'none', cursor: onUser ? 'pointer' : 'default', borderRadius: '50%', display: 'flex', flexShrink: 0 }
    }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
      name: user.name,
      src: user.avatar,
      size: 40,
      ring: true
    })) : null, afterAvatar || null);
  }
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 20,
      minHeight: 'var(--topbar-h)',
      fontFamily: 'var(--font-sans)',
      flexWrap: 'wrap',
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: '1 1 240px',
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontSize: 26,
      lineHeight: 1.2,
      fontWeight: 600,
      letterSpacing: '-0.02em',
      color: 'var(--text-strong)'
    }
  }, title), subtitle ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '6px 0 0',
      fontSize: 16,
      color: 'var(--text-body)'
    }
  }, subtitle) : null), /*#__PURE__*/React.createElement("form", {
    role: "search",
    onSubmit: e => {
      e.preventDefault();
      onSearch && onSearch(q);
    },
    style: {
      flex: '0 1 400px',
      minWidth: 200,
      position: 'relative',
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 20,
      zIndex: 1,
      pointerEvents: 'none',
      color: 'var(--text-subtle)',
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "search",
    size: 18
  })), /*#__PURE__*/React.createElement("input", {
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: searchPlaceholder,
    "aria-label": "Buscar",
    style: {
      width: '100%',
      height: 56,
      boxSizing: 'border-box',
      borderRadius: 999,
      border: '1.5px solid rgba(255,255,255,.95)',
      background: 'rgba(255,255,255,.5)',
      padding: '0 20px 0 50px',
      fontFamily: 'inherit',
      fontSize: 14,
      color: 'var(--text-strong)',
      outline: 'none',
      boxShadow: 'var(--shadow-sm)',
      backdropFilter: 'blur(var(--blur-glass))'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      padding: '0 8px 0 10px',
      height: 56,
      boxSizing: 'border-box',
      borderRadius: 999,
      background: 'rgba(255,255,255,.5)',
      border: '1.5px solid rgba(255,255,255,.95)',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "bell",
    label: "Notifica\xE7\xF5es",
    variant: "ghost",
    size: "md",
    badge: notifications > 0 ? true : undefined,
    onClick: onNotifications,
    style: {
      color: 'var(--text-strong)'
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "message-square-text",
    label: "Conversas",
    variant: "ghost",
    size: "md",
    badge: messages > 0 ? true : undefined,
    onClick: onMessages,
    style: {
      color: 'var(--text-strong)'
    }
  }), beforeAvatar || null, user ? /*#__PURE__*/React.createElement("button", {
      type: "button",
      onClick: onUser,
      "aria-label": "Minha conta",
      title: user.name,
      style: { border: 0, padding: 0, background: 'none', cursor: onUser ? 'pointer' : 'default', borderRadius: '50%', display: 'flex', flexShrink: 0 }
    }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
      name: user.name,
      src: user.avatar,
      size: 40
    })) : null, afterAvatar || null));
}
Object.assign(__ds_scope, { TopBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TopBar.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const VARIANTS = {
  glass: {
    background: 'var(--surface-card)',
    border: '1.5px solid var(--border-glass)',
    boxShadow: 'var(--shadow-card), var(--shadow-inset-glass)',
    backdropFilter: 'blur(var(--blur-glass))',
    WebkitBackdropFilter: 'blur(var(--blur-glass))',
    color: 'var(--text-body)'
  },
  solid: {
    background: 'var(--surface-card-solid)',
    border: '1px solid var(--border-subtle)',
    boxShadow: 'var(--shadow-card)',
    color: 'var(--text-body)'
  },
  inverse: {
    background: 'var(--surface-inverse)',
    border: '1px solid transparent',
    boxShadow: 'var(--shadow-card)',
    color: 'var(--text-on-inverse)'
  },
  brand: {
    background: 'var(--gradient-blue)',
    border: '1px solid transparent',
    boxShadow: 'var(--shadow-primary)',
    color: '#fff'
  }
};
function CardIcon({
  name,
  tone = 'primary',
  size = 40
}) {
  const c = {
    primary: 'var(--primary)',
    accent: 'var(--purple-600)',
    success: 'var(--green-600)',
    warning: 'var(--amber-600)',
    danger: 'var(--red-600)'
  }[tone] || 'var(--primary)';
  return /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      flexShrink: 0,
      borderRadius: '50%',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: c,
      background: 'var(--surface-card-solid)',
      border: '1.5px solid var(--blue-200)',
      boxShadow: '0 0 0 4px rgba(255,255,255,.6)'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: name,
    size: Math.round(size * 0.48)
  }));
}
function Card({
  title,
  subtitle,
  icon,
  iconTone,
  actions,
  variant = 'glass',
  padding = 24,
  radius = 'var(--radius-xl)',
  children,
  style,
  bodyStyle,
  onClick,
  ...rest
}) {
  const v = VARIANTS[variant] || VARIANTS.glass;
  const onDark = variant === 'inverse' || variant === 'brand';
  const hasHeader = title || actions || icon;
  return /*#__PURE__*/React.createElement("section", _extends({
    onClick: onClick,
    style: {
      borderRadius: radius,
      padding,
      boxSizing: 'border-box',
      fontFamily: 'var(--font-sans)',
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      ...v,
      ...style
    }
  }, rest), hasHeader ? /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      minWidth: 0
    }
  }, icon ? /*#__PURE__*/React.createElement(CardIcon, {
    name: icon,
    tone: iconTone
  }) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, title ? /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      font: 'var(--type-card-title)',
      letterSpacing: 'var(--tracking-snug)',
      color: onDark ? '#fff' : 'var(--text-strong)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, title) : null, subtitle ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '2px 0 0',
      fontSize: 13,
      color: onDark ? 'rgba(255,255,255,.8)' : 'var(--text-muted)'
    }
  }, subtitle) : null), actions ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexShrink: 0
    }
  }, actions) : null) : null, children !== undefined ? /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0,
      ...bodyStyle
    }
  }, children) : null);
}
Object.assign(__ds_scope, { CardIcon, Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Card.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Dialog.jsx
try { (() => {
function useIsMobile() {
  const q = '(max-width: 767px)';
  const [m, setM] = React.useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches);
  React.useEffect(() => {
    const mq = window.matchMedia(q);
    const f = () => setM(mq.matches);
    mq.addEventListener('change', f);
    return () => mq.removeEventListener('change', f);
  }, []);
  return m;
}
function Dialog({
  open,
  onClose,
  title,
  description,
  icon,
  children,
  footer,
  width = 480,
  sheet,
  inline = false
}) {
  const mobile = useIsMobile();
  const asSheet = sheet !== undefined ? sheet : mobile;
  React.useEffect(() => {
    if (!open || inline) return;
    const k = e => {
      if (e.key === 'Escape') onClose && onClose();
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open, inline, onClose]);
  if (!open) return null;
  const panel = /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": !inline,
    "aria-label": title,
    onClick: e => e.stopPropagation(),
    style: {
      width: asSheet ? '100%' : width,
      maxWidth: '100%',
      maxHeight: asSheet ? '88vh' : '86vh',
      overflow: 'auto',
      boxSizing: 'border-box',
      background: 'var(--surface-card-solid)',
      borderRadius: asSheet ? '28px 28px 0 0' : 'var(--radius-xl)',
      boxShadow: 'var(--shadow-pop)',
      padding: asSheet ? '12px 20px calc(20px + env(safe-area-inset-bottom))' : 24,
      fontFamily: 'var(--font-sans)',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, asSheet ? /*#__PURE__*/React.createElement("span", {
    style: {
      alignSelf: 'center',
      width: 40,
      height: 4,
      borderRadius: 4,
      background: 'var(--ink-200)'
    }
  }) : null, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12
    }
  }, icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 14,
      background: 'var(--primary-soft)',
      color: 'var(--primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 20
  })) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontSize: 18,
      fontWeight: 600,
      color: 'var(--text-strong)',
      letterSpacing: 'var(--tracking-snug)'
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0',
      fontSize: 13,
      lineHeight: 1.5,
      color: 'var(--text-muted)'
    }
  }, description) : null), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Fechar",
    onClick: onClose,
    style: {
      border: 0,
      background: 'var(--surface-muted)',
      color: 'var(--text-muted)',
      width: 32,
      height: 32,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 16
  }))), children ? /*#__PURE__*/React.createElement("div", null, children) : null, footer ? /*#__PURE__*/React.createElement("footer", {
    style: {
      display: 'flex',
      gap: 8,
      justifyContent: 'flex-end',
      flexDirection: asSheet ? 'column-reverse' : 'row'
    }
  }, footer) : null);
  if (inline) return panel;
  return /*#__PURE__*/React.createElement("div", {
    // marca de sobreposição: a gaveta de baixo não fecha com Esc enquanto o diálogo estiver aberto
    "data-overlay": "1",
    onClick: onClose,
    style: {
      position: 'fixed',
      inset: 0,
      zIndex: 600, // Z.dialogo: acima das gavetas e telas cheias
      background: 'var(--surface-overlay)',
      backdropFilter: 'blur(var(--blur-overlay))',
      WebkitBackdropFilter: 'blur(var(--blur-overlay))',
      display: 'flex',
      alignItems: asSheet ? 'flex-end' : 'center',
      justifyContent: 'center',
      padding: asSheet ? 0 : 24
    }
  }, panel);
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/EmptyState.jsx
try { (() => {
function EmptyState({
  icon = 'inbox',
  title,
  description,
  action,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '48px 24px',
      borderRadius: 'var(--radius-xl)',
      background: 'rgba(255,255,255,.4)',
      border: '1.5px dashed var(--blue-200)',
      fontFamily: 'var(--font-sans)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 6,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 56,
      height: 56,
      borderRadius: '50%',
      background: 'var(--primary-soft)',
      color: 'var(--primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 26
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13,
      color: 'var(--text-muted)',
      maxWidth: 360,
      textWrap: 'pretty'
    }
  }, description) : null, action ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: 'flex',
      justifyContent: 'center'
    }
  }, action) : null);
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/StatCard.jsx
try { (() => {
function StatCard({
  icon = 'users',
  iconTone,
  title,
  value,
  trend,
  breakdown = [],
  onMenu,
  compact = false,
  style
}) {
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      borderRadius: 'var(--radius-xl)',
      padding: compact ? 16 : 20,
      boxSizing: 'border-box',
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: compact ? 12 : 16,
      background: 'var(--surface-card)',
      border: '1.5px solid var(--border-glass)',
      boxShadow: 'var(--shadow-card), var(--shadow-inset-glass)',
      backdropFilter: 'blur(var(--blur-glass))',
      WebkitBackdropFilter: 'blur(var(--blur-glass))',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.CardIcon, {
    name: icon,
    tone: iconTone,
    size: compact ? 32 : 40
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 0,
      fontSize: compact ? 13 : 16,
      lineHeight: 1.25,
      fontWeight: 500,
      color: 'var(--text-strong)',
      ...(compact ? {
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      } : {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      })
    }
  }, title), onMenu !== undefined ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Mais op\xE7\xF5es",
    onClick: onMenu,
    style: {
      border: 0,
      background: 'transparent',
      color: 'var(--text-muted)',
      cursor: 'pointer',
      padding: 4,
      borderRadius: 8,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "ellipsis-vertical",
    size: 18
  })) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: compact ? 26 : 32,
      lineHeight: 1.1,
      fontWeight: 600,
      color: 'var(--text-strong)',
      letterSpacing: 'var(--tracking-tight)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, value), trend ? /*#__PURE__*/React.createElement(__ds_scope.TrendPill, trend) : null), breakdown.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 20,
      flexWrap: 'wrap'
    }
  }, breakdown.map(b => /*#__PURE__*/React.createElement("span", {
    key: b.label,
    style: {
      display: 'inline-flex',
      alignItems: 'baseline',
      gap: 6,
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, b.label, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--text-strong)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, b.value)))) : null);
}
Object.assign(__ds_scope, { StatCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/StatCard.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Toast.jsx
try { (() => {
const TONES = {
  success: ['circle-check', 'var(--green-600)', 'var(--success-soft)'],
  danger: ['circle-alert', 'var(--red-600)', 'var(--danger-soft)'],
  warning: ['triangle-alert', 'var(--amber-600)', 'var(--warning-soft)'],
  info: ['info', 'var(--primary)', 'var(--primary-soft)'],
  ai: ['sparkles', 'var(--purple-600)', 'var(--accent-soft)']
};
function Toast({
  tone = 'info',
  title,
  description,
  action,
  onClose,
  style
}) {
  const [icon, fg, bg] = TONES[tone] || TONES.info;
  return /*#__PURE__*/React.createElement("div", {
    role: "status",
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 12,
      width: 360,
      maxWidth: '100%',
      boxSizing: 'border-box',
      padding: '14px 14px 14px 16px',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--surface-glass)',
      border: '1.5px solid var(--border-glass)',
      boxShadow: 'var(--shadow-pop)',
      backdropFilter: 'blur(var(--blur-glass))',
      WebkitBackdropFilter: 'blur(var(--blur-glass))',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 32,
      borderRadius: '50%',
      background: bg,
      color: fg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 17
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0,
      paddingTop: 1
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '2px 0 0',
      fontSize: 13,
      color: 'var(--text-muted)',
      lineHeight: 1.45
    }
  }, description) : null, action ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8
    }
  }, action) : null), onClose ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Fechar",
    onClick: onClose,
    style: {
      border: 0,
      background: 'transparent',
      color: 'var(--text-subtle)',
      cursor: 'pointer',
      padding: 2,
      display: 'flex'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 16
  })) : null);
}
Object.assign(__ds_scope, { Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Toast.jsx", error: String((e && e.message) || e) }); }

// components/surfaces/Tooltip.jsx
try { (() => {
function Tooltip({
  label,
  side = 'top',
  children,
  open,
  style
}) {
  const [show, setShow] = React.useState(false);
  const visible = open !== undefined ? open : show;
  const pos = {
    top: {
      bottom: 'calc(100% + 8px)',
      left: '50%',
      transform: 'translateX(-50%)'
    },
    bottom: {
      top: 'calc(100% + 8px)',
      left: '50%',
      transform: 'translateX(-50%)'
    },
    right: {
      left: 'calc(100% + 10px)',
      top: '50%',
      transform: 'translateY(-50%)'
    },
    left: {
      right: 'calc(100% + 10px)',
      top: '50%',
      transform: 'translateY(-50%)'
    }
  }[side];
  return /*#__PURE__*/React.createElement("span", {
    onMouseEnter: () => setShow(true),
    onMouseLeave: () => setShow(false),
    onFocus: () => setShow(true),
    onBlur: () => setShow(false),
    style: {
      position: 'relative',
      display: 'inline-flex',
      ...style
    }
  }, children, /*#__PURE__*/React.createElement("span", {
    role: "tooltip",
    style: {
      position: 'absolute',
      zIndex: 60,
      ...pos,
      pointerEvents: 'none',
      whiteSpace: 'nowrap',
      padding: '6px 10px',
      borderRadius: 10,
      background: 'var(--surface-inverse)',
      color: '#fff',
      fontFamily: 'var(--font-sans)',
      fontSize: 12,
      fontWeight: 500,
      boxShadow: 'var(--shadow-pop)',
      opacity: visible ? 1 : 0,
      transition: 'opacity var(--dur-fast) var(--ease-out)'
    }
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/surfaces/Tooltip.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/App.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Dialog: XDialog,
  Input: XInput,
  Select: XSelect,
  Switch: XSwitch,
  Button: XButton,
  Toast: XToast
} = window.SaluteProjetoDesigner_8b4683;
const ROUTES = {
  painel: {
    title: 'Bom dia, Dra. Camila',
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
  perfil: {
    title: 'Meu perfil',
    C: PerfilScreen
  }
};
function App() {
  const mobile = useIsMobile();
  const [route, setRoute] = React.useState(() => {
    const r = localStorage.getItem('salute-kit:route');
    return ROUTES[r] ? r : 'painel';
  });
  const [novo, setNovo] = React.useState(false);
  const [toast, setToast] = React.useState(null);
  React.useEffect(() => {
    localStorage.setItem('salute-kit:route', route);
  }, [route]);
  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);
  const r = ROUTES[route];
  const Screen = r.C;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(AppShell, {
    active: route,
    onNavigate: setRoute,
    title: mobile ? r.mobileTitle || r.title : r.title,
    subtitle: mobile ? undefined : r.subtitle
  }, /*#__PURE__*/React.createElement(Screen, {
    mobile: mobile,
    onNavigate: setRoute,
    onNew: () => setNovo(true)
  })), /*#__PURE__*/React.createElement(XDialog, {
    open: novo,
    onClose: () => setNovo(false),
    icon: "calendar-plus",
    title: "Novo agendamento",
    description: "O paciente recebe a confirma\xE7\xE3o automaticamente.",
    footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(XButton, {
      variant: "secondary",
      onClick: () => setNovo(false)
    }, "Cancelar"), /*#__PURE__*/React.createElement(XButton, {
      iconLeft: "check",
      onClick: () => {
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
  }, /*#__PURE__*/React.createElement(XInput, {
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
  })))), toast ? /*#__PURE__*/React.createElement("div", {
    style: {
      position: mobile ? 'absolute' : 'fixed',
      zIndex: 700, // Z.aviso
      right: mobile ? 12 : 24,
      left: mobile ? 12 : 'auto',
      top: mobile ? 70 : 'auto',
      bottom: mobile ? 'auto' : 24
    }
  }, /*#__PURE__*/React.createElement(XToast, _extends({}, toast, {
    onClose: () => setToast(null),
    style: {
      width: mobile ? '100%' : 360
    }
  }))) : null);
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/MensagensScreen.jsx
try { (() => {
const {
  Avatar: MAv,
  Icon: MIcon
} = window.SaluteProjetoDesigner_8b4683;
const INBOX = [{
  id: 1,
  n: 'Dr. James Smith',
  m: 'A usabilidade é essencial em UX...',
  t: '14:30',
  u: 0
}, {
  id: 2,
  n: 'Dr. Livia Siphron',
  m: 'Como podemos ajudar? Estamos aqui!',
  t: '14:30',
  u: 3
}, {
  id: 3,
  n: 'Michael Thompson',
  m: 'Aguardando o resultado dos exames...',
  t: '14:02',
  u: 0
}, {
  id: 4,
  n: 'Dr. Hanna Rosser',
  m: 'Como podemos ajudar? Estamos aqui!',
  t: '14:30',
  u: 3
}, {
  id: 5,
  n: 'Sarah Scott',
  m: 'Como podemos ajudar? Estamos aqui!',
  t: '14:30',
  u: 0
}, {
  id: 6,
  n: 'Adam Bridges',
  m: 'Como podemos ajudar? Estamos aqui!',
  t: '14:30',
  u: 3
}, {
  id: 7,
  n: 'Sarah Scott',
  m: 'Como podemos ajudar? Estamos aqui!',
  t: '14:30',
  u: 0
}];
const circleBtn = {
  width: 40,
  height: 40,
  borderRadius: '50%',
  border: '1.5px solid rgba(214,226,242,.95)',
  background: 'rgba(255,255,255,.7)',
  color: 'var(--text-strong)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  padding: 0
};
function MensagensScreen({
  mobile
}) {
  const [tab, setTab] = React.useState('p');
  const [sel, setSel] = React.useState(mobile ? null : 3);
  const [msgs, setMsgs] = React.useState([{
    me: true,
    t: '10:40',
    text: 'Olá, Dr. Michael Thompson!'
  }, {
    me: false,
    t: '10:39',
    text: 'Olá, Corey Philips. Como posso ajudar hoje?'
  }, {
    me: true,
    t: '10:40',
    text: 'Não estou me sentindo bem há alguns dias. Dores musculares, garganta irritada e um pouco de tosse.'
  }, {
    me: false,
    t: '10:39',
    text: 'Entendo. Está sentindo mais alguma coisa?'
  }]);
  const [v, setV] = React.useState('');
  const send = () => {
    if (v.trim()) {
      setMsgs([...msgs, {
        me: true,
        t: '10:41',
        text: v.trim()
      }]);
      setV('');
    }
  };
  const cur = INBOX.find(c => c.id === sel);
  const list = /*#__PURE__*/React.createElement("section", {
    style: {
      ...glass,
      padding: '20px 0 0',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(CardTitle, {
    right: /*#__PURE__*/React.createElement("button", {
      type: "button",
      "aria-label": "Nova conversa",
      style: {
        ...circleBtn,
        width: 44,
        height: 44
      }
    }, /*#__PURE__*/React.createElement(MIcon, {
      name: "plus",
      size: 20
    }))
  }, "Caixa de entrada"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      padding: 4,
      borderRadius: 999,
      background: 'rgba(255,255,255,.4)',
      border: '1.5px solid rgba(255,255,255,.95)'
    }
  }, [['p', 'Pacientes'], ['d', 'Médicos']].map(([k, l]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    type: "button",
    onClick: () => setTab(k),
    style: {
      height: 48,
      borderRadius: 999,
      border: 0,
      cursor: 'pointer',
      fontFamily: 'inherit',
      fontSize: 17,
      fontWeight: tab === k ? 600 : 400,
      color: 'var(--text-strong)',
      background: tab === k ? '#fff' : 'transparent',
      boxShadow: tab === k ? '0 4px 12px -6px rgba(23,73,170,.3)' : 'none'
    }
  }, l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      scrollbarWidth: 'thin',
      scrollbarColor: 'rgba(150,175,210,.5) transparent',
      marginTop: 10
    }
  }, INBOX.map(c => {
    const on = c.id === sel;
    return /*#__PURE__*/React.createElement("button", {
      key: c.id,
      type: "button",
      onClick: () => setSel(c.id),
      style: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '16px 20px',
        border: 0,
        borderTop: on ? 0 : '1px solid rgba(214,226,242,.7)',
        cursor: 'pointer',
        textAlign: 'left',
        fontFamily: 'inherit',
        background: on ? 'linear-gradient(180deg,#0B4BEB 0%,#1FA8F5 100%)' : 'transparent',
        color: on ? '#fff' : 'inherit'
      }
    }, /*#__PURE__*/React.createElement(MAv, {
      name: c.n,
      size: 50,
      status: "online"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 17,
        fontWeight: 500,
        color: on ? '#fff' : 'var(--text-strong)'
      }
    }, c.n), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: on ? '#fff' : 'var(--text-strong)'
      }
    }, c.t)), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: on ? 'rgba(255,255,255,.88)' : 'var(--text-body)',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }
    }, c.m), c.u && !on ? /*#__PURE__*/React.createElement("span", {
      style: {
        minWidth: 22,
        height: 22,
        borderRadius: '50%',
        background: 'linear-gradient(180deg,#1F5EFF,#22C3F2)',
        color: '#fff',
        fontSize: 11,
        lineHeight: '22px',
        textAlign: 'center',
        flexShrink: 0
      }
    }, c.u) : null)));
  })));
  const thread = cur ? /*#__PURE__*/React.createElement("section", {
    style: {
      ...glass,
      padding: 0,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '18px 24px',
      borderBottom: '1px solid rgba(214,226,242,.8)',
      background: 'rgba(255,255,255,.35)'
    }
  }, mobile ? /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Voltar",
    onClick: () => setSel(null),
    style: circleBtn
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "arrow-left",
    size: 18
  })) : null, /*#__PURE__*/React.createElement(MAv, {
    name: cur.n,
    size: 52,
    status: "online"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 20,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, cur.n), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 15,
      color: '#2DBF6A'
    }
  }, "Online")), ['phone', 'video', 'ellipsis-vertical'].map(i => /*#__PURE__*/React.createElement("button", {
    key: i,
    type: "button",
    "aria-label": i,
    style: {
      border: 0,
      background: 'transparent',
      color: 'var(--text-strong)',
      cursor: 'pointer',
      padding: 6
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: i,
    size: 22
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      scrollbarWidth: 'thin',
      scrollbarColor: 'rgba(150,175,210,.5) transparent',
      padding: mobile ? '18px 14px' : '26px 26px',
      display: 'flex',
      flexDirection: 'column',
      gap: 26
    }
  }, msgs.map((m, i) => m.me ? /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      gap: 8,
      maxWidth: '62%'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: 'var(--text-muted)'
    }
  }, m.t, " ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-strong)',
      fontWeight: 600,
      marginLeft: 6
    }
  }, "Voc\xEA")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 20px',
      borderRadius: '18px 4px 18px 18px',
      background: 'linear-gradient(180deg,#0B4BEB 0%,#1FB6F5 100%)',
      color: '#fff',
      fontSize: 15,
      lineHeight: 1.5,
      boxShadow: '0 10px 24px -14px rgba(11,75,235,.7)'
    }
  }, m.text)), /*#__PURE__*/React.createElement(MAv, {
    name: KIT_USER.name,
    size: 48,
    status: "online"
  })) : /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(MAv, {
    name: cur.n,
    size: 48,
    status: "online"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      maxWidth: '62%'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 17,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, cur.n, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      fontWeight: 400,
      color: 'var(--text-muted)',
      marginLeft: 8
    }
  }, m.t)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      padding: '14px 20px',
      borderRadius: '4px 18px 18px 18px',
      background: 'rgba(255,255,255,.9)',
      color: 'var(--text-strong)',
      fontSize: 15,
      lineHeight: 1.5
    }
  }, m.text, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: 14,
      bottom: -12,
      width: 26,
      height: 26,
      borderRadius: '50%',
      background: '#fff',
      boxShadow: '0 2px 6px rgba(23,73,170,.18)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#F5B400'
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "thumbs-up",
    size: 13,
    strokeWidth: 2.2
  }))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: mobile ? '0 12px 12px' : '0 26px 24px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 22,
      padding: 2,
      background: 'linear-gradient(90deg,#0B4BEB,#22C3F2)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 20,
      background: 'rgba(250,252,255,.97)',
      padding: '16px 18px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "sparkles",
    size: 20,
    color: "#1F5EFF"
  }), /*#__PURE__*/React.createElement("input", {
    value: v,
    onChange: e => setV(e.target.value),
    onKeyDown: e => e.key === 'Enter' && send(),
    placeholder: "Enviar mensagem...",
    style: {
      flex: 1,
      border: 0,
      outline: 'none',
      background: 'transparent',
      fontFamily: 'inherit',
      fontSize: 17,
      color: 'var(--text-strong)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, ['paperclip', 'globe', 'camera', 'video'].map(i => /*#__PURE__*/React.createElement("button", {
    key: i,
    type: "button",
    "aria-label": i,
    style: {
      ...circleBtn,
      width: 44,
      height: 44
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: i,
    size: 18
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": "Enviar",
    onClick: send,
    style: {
      width: 50,
      height: 50,
      borderRadius: '50%',
      border: 0,
      cursor: 'pointer',
      background: 'linear-gradient(180deg,#0B4BEB,#22C3F2)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 18px -8px rgba(11,75,235,.7)'
    }
  }, /*#__PURE__*/React.createElement(MIcon, {
    name: "send",
    size: 20
  }))))))) : null;
  if (mobile) return /*#__PURE__*/React.createElement("div", {
    style: {
      height: 'calc(100vh - 190px)',
      minHeight: 520,
      display: 'flex',
      flexDirection: 'column'
    }
  }, cur ? thread : list);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(300px,440px) minmax(0,1fr)',
      gap: 26,
      height: 'calc(100vh - 170px)',
      minHeight: 620
    }
  }, list, thread);
}
Object.assign(window, {
  MensagensScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/MensagensScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/PacientesAgenda.jsx
try { (() => {
const {
  Avatar: OAv,
  Icon: OIcon,
  SegmentedControl: OSeg,
  Button: OBtn
} = window.SaluteProjetoDesigner_8b4683;
function PacientesScreen({
  mobile
}) {
  const [page, setPage] = React.useState(1);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      ...glass,
      padding: mobile ? 16 : 26,
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(CardTitle, {
    right: /*#__PURE__*/React.createElement(PillChip, null, "Mensal")
  }, "Seu progresso este m\xEAs"), /*#__PURE__*/React.createElement(PatientsTable, {
    rows: PATIENTS,
    big: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      flexWrap: 'wrap',
      fontSize: 14,
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Exibindo 1 a 8 de 100 registros"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setPage(Math.max(1, page - 1)),
    style: pgBtn(false)
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "chevron-left",
    size: 14
  }), "Anterior"), [1, 2, 3, 4, 5].map(n => /*#__PURE__*/React.createElement("button", {
    key: n,
    type: "button",
    onClick: () => setPage(n),
    style: pgBtn(n === page, true)
  }, n)), /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '0 4px'
    }
  }, "\u2026"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setPage(15),
    style: pgBtn(page === 15, true)
  }, "15"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setPage(Math.min(15, page + 1)),
    style: pgBtn(false)
  }, "Pr\xF3ximo", /*#__PURE__*/React.createElement(OIcon, {
    name: "chevron-right",
    size: 14
  })))));
}
function pgBtn(on, sq) {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    height: 32,
    minWidth: sq ? 32 : undefined,
    padding: sq ? 0 : '0 12px',
    justifyContent: 'center',
    borderRadius: 10,
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: 13,
    fontWeight: 500,
    border: on ? '1px solid rgba(31,94,255,.3)' : '1px solid rgba(255,255,255,.9)',
    background: on ? 'rgba(31,94,255,.1)' : 'rgba(255,255,255,.55)',
    color: on ? '#1F5EFF' : 'var(--text-strong)'
  };
}
const PROS = [{
  n: 'Darlene Robertson',
  r: 'Terapeuta'
}, {
  n: 'Michael Thompson',
  r: 'Psiquiatra'
}, {
  n: 'Max Worthington',
  r: 'Psicólogo'
}, {
  n: 'Dr. McCoy',
  r: 'Psiquiatra'
}];
const SLOTS = [{
  col: 1,
  row: 0,
  n: 'Ronald Richards',
  orb: '#7C8CFF'
}, {
  col: 2,
  row: 0,
  n: 'Ralph Edwards',
  orb: '#9AE072',
  span: 1.7
}, {
  col: 0,
  row: 1,
  n: 'Darlene Robertson',
  orb: '#9AE072',
  span: 1.7
}, {
  col: 1,
  row: 2,
  n: 'Esther Howard',
  orb: '#5FB6F2',
  span: 1.5
}, {
  col: 3,
  row: 2,
  n: 'Theresa Webb',
  orb: '#5FB6F2'
}, {
  col: 0,
  row: 3,
  n: 'Marvin McKinney',
  orb: '#EEE260'
}, {
  col: 2,
  row: 4,
  n: 'Kristin Watson',
  orb: '#7C8CFF',
  span: 1.6
}, {
  col: 0,
  row: 5,
  n: 'Cody Fisher',
  orb: '#5FB6F2'
}];
const orbBg = c => `radial-gradient(circle at 35% 30%, #fff 0%, ${c} 60%)`;
function AgendaScreen({
  mobile,
  onNew
}) {
  const narrow = useNarrow();
  const [view, setView] = React.useState('Dia');
  const RH = 96;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: mobile || narrow ? '1fr' : 'minmax(0,1fr) 400px',
      gap: mobile ? 14 : 26,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      ...glass,
      padding: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: mobile ? '16px 16px 12px' : '24px 26px 18px',
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(CardTitle, {
    right: /*#__PURE__*/React.createElement(OBtn, {
      size: "sm",
      iconLeft: "plus",
      onClick: onNew
    }, "Novo")
  }, "Agendamentos"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18,
      color: 'var(--text-strong)'
    }
  }, "2 de outubro 2026"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(OSeg, {
    size: "sm",
    options: ['Dia', 'Semana', 'Mês'],
    value: view,
    onChange: setView
  }), /*#__PURE__*/React.createElement(PillChip, null, "2 out")))), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto',
      overflowY: 'hidden',
      scrollbarWidth: 'thin',
      scrollbarColor: 'rgba(150,175,210,.5) transparent'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 760
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '78px repeat(4, 1fr)',
      borderTop: '1px solid rgba(214,226,242,.9)'
    }
  }, /*#__PURE__*/React.createElement("span", null), PROS.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.n,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '14px 12px',
      borderLeft: '1px solid rgba(214,226,242,.9)'
    }
  }, /*#__PURE__*/React.createElement(OAv, {
    name: p.n,
    size: 34
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, p.n), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 12,
      color: 'var(--text-muted)'
    }
  }, p.r))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: '78px repeat(4, 1fr)',
      borderTop: '1px solid rgba(214,226,242,.9)'
    }
  }, /*#__PURE__*/React.createElement("div", null, [9, 10, 11, 12, 13, 14].map(h => /*#__PURE__*/React.createElement("div", {
    key: h,
    style: {
      height: RH,
      boxSizing: 'border-box',
      padding: '20px 0 0 22px',
      fontSize: 17,
      color: 'var(--text-muted)',
      borderBottom: '1px solid rgba(214,226,242,.9)'
    }
  }, h, "h"))), [0, 1, 2, 3].map(c => /*#__PURE__*/React.createElement("div", {
    key: c,
    style: {
      position: 'relative',
      borderLeft: '1px solid rgba(214,226,242,.9)'
    }
  }, [0, 1, 2, 3, 4, 5].map(r => /*#__PURE__*/React.createElement("div", {
    key: r,
    style: {
      height: RH,
      boxSizing: 'border-box',
      borderBottom: '1px solid rgba(214,226,242,.9)'
    }
  })), SLOTS.filter(s => s.col === c).map(s => /*#__PURE__*/React.createElement("div", {
    key: s.n,
    style: {
      position: 'absolute',
      left: 6,
      right: 6,
      top: s.row * RH + 6,
      height: (s.span || 0.9) * RH - 6,
      boxSizing: 'border-box',
      padding: '10px 12px',
      borderRadius: 14,
      background: 'rgba(255,255,255,.88)',
      boxShadow: '0 6px 16px -10px rgba(23,73,170,.35)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--text-strong)'
    }
  }, s.n), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, "Terapeuta")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-strong)'
    }
  }, "09:00 - 10:00"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 22,
      height: 22,
      borderRadius: '50%',
      background: orbBg(s.orb),
      boxShadow: '0 3px 8px -2px rgba(23,73,170,.3)'
    }
  })))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 72,
      right: 0,
      top: RH * 1.45,
      height: 2,
      background: 'linear-gradient(90deg,#0A46E4,#22C3F2)',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      left: -5,
      top: -4,
      width: 10,
      height: 10,
      borderRadius: '50%',
      background: '#0A46E4'
    }
  })))))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...glass,
      padding: mobile ? 18 : 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 22
    }
  }, /*#__PURE__*/React.createElement(CardTitle, {
    right: /*#__PURE__*/React.createElement(Legend, {
      items: [['Consulta', '#1F5EFF'], ['Reunião', '#F2694A']]
    })
  }, "Atividade mensal"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: 'var(--text-strong)',
      paddingBottom: 14,
      borderBottom: '1px solid rgba(214,226,242,.9)'
    }
  }, /*#__PURE__*/React.createElement(OIcon, {
    name: "chevron-left",
    size: 20
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 24,
      fontWeight: 500
    }
  }, "2 de outubro, 2026"), /*#__PURE__*/React.createElement(OIcon, {
    name: "chevron-right",
    size: 20
  })), /*#__PURE__*/React.createElement(MonthGrid, null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3,1fr)'
    }
  }, [['Tempo ativo', '4h 32m'], ['Média de retorno', '17 horas'], ['Melhor dia', 'Segunda']].map(([k, v], i) => /*#__PURE__*/React.createElement("div", {
    key: k,
    style: {
      paddingLeft: i ? 14 : 0,
      borderLeft: i ? '1px solid rgba(214,226,242,.9)' : 0
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, k), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0',
      fontSize: 18,
      fontWeight: 500,
      color: 'var(--text-strong)'
    }
  }, v)))), [['Reunião com James Levin', '9:00-10:00', '#F2694A'], ['Recepção: Cooper Kenter', '10:00-11:00', '#1F5EFF']].map(([t, h, c]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '12px 16px',
      borderRadius: 999,
      background: 'rgba(255,255,255,.7)',
      border: '1.5px solid #fff'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      border: `2.5px solid ${c}`,
      boxSizing: 'border-box'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 15,
      color: 'var(--text-strong)'
    }
  }, t), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, h)))));
}
Object.assign(window, {
  PacientesScreen,
  AgendaScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/PacientesAgenda.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/PainelScreen.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  StatCard,
  BarChart,
  GaugeChart,
  TrendPill,
  Checkbox: PCheck,
  Avatar: PAv
} = window.SaluteProjetoDesigner_8b4683;
const WEEK = [{
  label: 'Dom',
  value: 36,
  target: 46,
  base: 20
}, {
  label: 'Seg',
  value: 33,
  target: 41,
  base: 20
}, {
  label: 'Ter',
  value: 36,
  target: 46,
  base: 20
}, {
  label: 'Qua',
  value: 47,
  target: 57,
  base: 20
}, {
  label: 'Qui',
  value: 30,
  target: 37,
  base: 20
}, {
  label: 'Sex',
  value: 35,
  target: 45,
  base: 20
}, {
  label: 'Sáb',
  value: 27,
  target: 37,
  base: 20
}];
function PatientsTable({
  rows,
  big
}) {
  const th = {
    textAlign: 'left',
    padding: big ? '16px 16px' : '12px 14px',
    fontSize: big ? 14 : 12,
    fontWeight: 500,
    color: 'var(--text-strong)',
    textTransform: 'uppercase',
    letterSpacing: '.02em',
    whiteSpace: 'nowrap'
  };
  const td = {
    padding: big ? '14px 16px' : '10px 14px',
    fontSize: big ? 15 : 13,
    color: 'var(--text-body)',
    borderTop: '1px solid rgba(214,226,242,.9)',
    whiteSpace: 'nowrap'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto',
      overflowY: 'hidden',
      scrollbarWidth: 'thin',
      scrollbarColor: 'rgba(150,175,210,.5) transparent',
      borderRadius: 18,
      background: 'rgba(255,255,255,.35)',
      border: '1.5px solid rgba(255,255,255,.9)'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      minWidth: 640
    }
  }, /*#__PURE__*/React.createElement("thead", {
    style: {
      background: 'rgba(225,236,250,.7)'
    }
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: {
      ...th,
      width: 36
    }
  }, /*#__PURE__*/React.createElement(PCheck, null)), /*#__PURE__*/React.createElement("th", {
    style: th
  }, "N\xBA Pront."), /*#__PURE__*/React.createElement("th", {
    style: th
  }, "Nome do paciente"), /*#__PURE__*/React.createElement("th", {
    style: th
  }, "Idade"), /*#__PURE__*/React.createElement("th", {
    style: th
  }, "Procedimento"), /*#__PURE__*/React.createElement("th", {
    style: th
  }, "Status"))), /*#__PURE__*/React.createElement("tbody", null, rows.map(r => /*#__PURE__*/React.createElement("tr", {
    key: r.id + r.name
  }, /*#__PURE__*/React.createElement("td", {
    style: td
  }, /*#__PURE__*/React.createElement(PCheck, null)), /*#__PURE__*/React.createElement("td", {
    style: td
  }, r.id), /*#__PURE__*/React.createElement("td", {
    style: td
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(PAv, {
    name: r.name,
    size: big ? 40 : 30
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, r.name), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'block',
      fontSize: big ? 13 : 11,
      color: 'var(--text-muted)'
    }
  }, r.email)))), /*#__PURE__*/React.createElement("td", {
    style: td
  }, r.age, " anos"), /*#__PURE__*/React.createElement("td", {
    style: td
  }, r.proc), /*#__PURE__*/React.createElement("td", {
    style: td
  }, /*#__PURE__*/React.createElement(StatusBadge, {
    s: r.status
  })))))));
}
function PainelScreen({
  mobile,
  onNavigate
}) {
  const stats = [{
    icon: 'users',
    title: 'Total de pacientes',
    value: '102',
    trend: {
      value: '12,8%',
      label: 'no último mês'
    },
    breakdown: [{
      label: 'Novos',
      value: 48
    }, {
      label: 'Antigos',
      value: 54
    }]
  }, {
    icon: 'hospital',
    title: 'Consultórios',
    value: '128',
    trend: {
      value: '0,8%',
      label: 'no último mês'
    },
    breakdown: [{
      label: 'Gerais',
      value: 98
    }, {
      label: 'Privados',
      value: 30
    }]
  }, {
    icon: 'calendar-days',
    title: 'Agendamentos',
    value: '254',
    trend: {
      value: '1,9%',
      label: 'no último mês'
    },
    breakdown: [{
      label: 'Novos',
      value: 56
    }, {
      label: 'Retornos',
      value: 43
    }]
  }];
  const narrow = useNarrow();
  const g = mobile ? 14 : 26;
  const one = mobile || narrow;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: g
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: mobile ? '1fr' : 'repeat(auto-fit, minmax(280px,1fr))',
      gap: g
    }
  }, stats.map(s => /*#__PURE__*/React.createElement(StatCard, _extends({
    key: s.title
  }, s, {
    onMenu: () => {},
    style: {
      ...glass,
      padding: mobile ? 18 : 22
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: one ? '1fr' : 'minmax(0,1.84fr) minmax(0,1fr)',
      gap: g
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      ...glass,
      padding: mobile ? 18 : 26,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(CardTitle, {
    right: /*#__PURE__*/React.createElement(PillChip, null, "Mensal")
  }, "Atendimentos"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 38,
      fontWeight: 600,
      color: 'var(--text-strong)',
      letterSpacing: '-0.02em'
    }
  }, "48"), /*#__PURE__*/React.createElement(TrendPill, {
    value: "0,8%"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: 'var(--text-muted)'
    }
  }, "vs m\xEAs anterior")), /*#__PURE__*/React.createElement(BarChart, {
    data: WEEK,
    max: 65,
    ticks: 5,
    height: mobile ? 180 : 250
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      ...glass,
      padding: mobile ? 18 : 26,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement(CardTitle, {
    right: /*#__PURE__*/React.createElement(PillChip, null, "Mensal")
  }, "G\xEAnero"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 38,
      fontWeight: 600,
      color: 'var(--text-strong)',
      letterSpacing: '-0.02em'
    }
  }, "102"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: 'var(--text-muted)'
    }
  }, "Pacientes")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 24,
      fontSize: 15
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: '#0A3FE0'
    }
  }), "Homens ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-strong)',
      fontWeight: 600
    }
  }, "35%")), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: '#22C3F2'
    }
  }), "Mulheres ", /*#__PURE__*/React.createElement("b", {
    style: {
      color: 'var(--text-strong)',
      fontWeight: 600
    }
  }, "15%"))), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'flex-end',
      margin: '0 -8px -28px'
    }
  }, /*#__PURE__*/React.createElement(GaugeChart, {
    value: 100,
    max: 100,
    label: "Total de pacientes",
    display: "1000+",
    size: 420
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: one ? '1fr' : 'minmax(0,1fr) minmax(0,1.84fr)',
      gap: g
    }
  }, /*#__PURE__*/React.createElement("section", {
    style: {
      ...glass,
      padding: mobile ? 18 : 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(CardTitle, {
    right: /*#__PURE__*/React.createElement(Legend, {
      items: [['Consulta', '#1F5EFF'], ['Reunião', '#F2694A']]
    })
  }, "Atividade mensal"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: 'var(--text-strong)'
    }
  }, /*#__PURE__*/React.createElement(SIcon, {
    name: "chevron-left",
    size: 20
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 20,
      fontWeight: 500
    }
  }, "Outubro 2026"), /*#__PURE__*/React.createElement(SIcon, {
    name: "chevron-right",
    size: 20
  })), /*#__PURE__*/React.createElement(MonthGrid, {
    compact: true
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      ...glass,
      padding: mobile ? 18 : 24,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(CardTitle, {
    right: /*#__PURE__*/React.createElement(PillChip, null, "Mensal")
  }, "Pacientes recentes"), /*#__PURE__*/React.createElement(PatientsTable, {
    rows: PATIENTS.slice(0, 4)
  }))));
}
Object.assign(window, {
  PainelScreen,
  PatientsTable
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/PainelScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/PerfilScreen.jsx
try { (() => {
const {
  Avatar: FAv,
  Icon: FIcon
} = window.SaluteProjetoDesigner_8b4683;
const SET_ITEMS = [['conta', 'Conta', 'user'], ['seguranca', 'Segurança', 'lock'], ['cobranca', 'Cobrança', 'credit-card'], ['notif', 'Notificações', 'bell'], ['idioma', 'Idioma', 'globe']];
const field = {
  height: 52,
  borderRadius: 14,
  background: 'rgba(255,255,255,.75)',
  border: '1.5px solid #fff',
  padding: '0 18px',
  fontFamily: 'inherit',
  fontSize: 15,
  color: 'var(--text-strong)',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box'
};
function Field({
  label,
  value
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      fontSize: 14,
      color: 'var(--text-muted)'
    }
  }, label, /*#__PURE__*/React.createElement("input", {
    defaultValue: value,
    style: field
  }));
}
function PerfilScreen({
  mobile
}) {
  const [tab, setTab] = React.useState('conta');
  const g = mobile ? 14 : 26;
  const menu = /*#__PURE__*/React.createElement("section", {
    style: {
      ...glass,
      padding: '24px 0',
      display: 'flex',
      flexDirection: 'column',
      minHeight: mobile ? 0 : 640
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: '0 24px 18px',
      fontSize: 22,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Configura\xE7\xF5es gerais"), SET_ITEMS.map(([k, l, i]) => {
    const on = k === tab;
    return /*#__PURE__*/React.createElement("button", {
      key: k,
      type: "button",
      onClick: () => setTab(k),
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        height: 58,
        padding: '0 26px',
        border: 0,
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 17,
        textAlign: 'left',
        background: on ? 'linear-gradient(180deg,#0B4BEB 0%,#1FB6F5 100%)' : 'transparent',
        color: on ? '#fff' : 'var(--text-strong)'
      }
    }, /*#__PURE__*/React.createElement(FIcon, {
      name: i,
      size: 19
    }), l);
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minHeight: 24
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      margin: '0 26px',
      border: 0,
      background: 'transparent',
      color: '#EF4444',
      fontFamily: 'inherit',
      fontSize: 16,
      cursor: 'pointer',
      padding: 0
    }
  }, /*#__PURE__*/React.createElement(FIcon, {
    name: "trash-2",
    size: 18
  }), "Excluir conta"));
  const conta = /*#__PURE__*/React.createElement("section", {
    style: {
      ...glass,
      padding: 0,
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 118,
      background: 'linear-gradient(100deg,#2ED39A 0%,#22E3F0 38%,#1FA8F5 62%,#0B4BEB 100%)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: mobile ? '0 18px 22px' : '0 34px 30px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 12,
      marginTop: -44
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(FAv, {
    name: "Michael Thompson",
    size: 92,
    ring: true
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 2,
      bottom: 4,
      width: 24,
      height: 24,
      borderRadius: '50%',
      background: '#fff',
      color: '#1F5EFF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow-sm)'
    }
  }, /*#__PURE__*/React.createElement(FIcon, {
    name: "pencil",
    size: 12
  }))), /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: {
      height: 50,
      padding: '0 46px',
      borderRadius: 999,
      border: 0,
      background: 'linear-gradient(90deg,#0B3FD9,#1F7BFF)',
      color: '#fff',
      fontFamily: 'inherit',
      fontSize: 17,
      fontWeight: 500,
      cursor: 'pointer',
      boxShadow: '0 10px 22px -10px rgba(11,63,217,.7)'
    }
  }, "Salvar")), /*#__PURE__*/React.createElement("div", {
    style: {
      margin: '14px 0 22px',
      paddingBottom: 18,
      borderBottom: '1px solid rgba(214,226,242,.9)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 22,
      fontWeight: 600,
      color: 'var(--text-strong)',
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, "Michael Thompson ", /*#__PURE__*/React.createElement(FIcon, {
    name: "badge-check",
    size: 20,
    color: "#1F5EFF"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0',
      fontSize: 14,
      color: 'var(--text-muted)',
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(FIcon, {
    name: "map-pin",
    size: 14
  }), "S\xE3o Paulo, Brasil")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '0 0 16px',
      fontSize: 18,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Informa\xE7\xF5es pessoais"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
      gap: '16px 22px'
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Nome",
    value: "Michael"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Sobrenome",
    value: "Thompson"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "E-mail",
    value: "michaelthompson@gmail.com"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Telefone",
    value: "+55 11 98765-4321"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Tipo de conta",
    value: "M\xE9dico"
  })), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '26px 0 16px',
      fontSize: 18,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Endere\xE7o"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
      gap: '16px 22px'
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Pa\xEDs",
    value: "Brasil"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Cidade/Estado",
    value: "S\xE3o Paulo (SP)"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Rua",
    value: "Av. Paulista, 1000"
  }), /*#__PURE__*/React.createElement(Field, {
    label: "CEP",
    value: "01310-100"
  }))));
  const check = t => /*#__PURE__*/React.createElement("li", {
    key: t,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontSize: 15,
      color: 'var(--text-strong)'
    }
  }, /*#__PURE__*/React.createElement(FIcon, {
    name: "badge-check",
    size: 17,
    color: "#1F5EFF"
  }), t);
  const cobranca = /*#__PURE__*/React.createElement("section", {
    style: {
      ...glass,
      padding: mobile ? 16 : 26,
      display: 'grid',
      gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
      gap: 22,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 17,
      color: 'var(--text-strong)'
    }
  }, "Fa\xE7a upgrade para o plano popular"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      borderRadius: 22,
      padding: 24,
      background: 'linear-gradient(160deg,rgba(255,255,255,.85),rgba(220,242,255,.7))',
      border: '1.5px solid #fff',
      borderLeft: '2px solid #1F5EFF',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: 18,
      right: 18,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 32,
      padding: '0 14px',
      borderRadius: 999,
      background: 'linear-gradient(90deg,#0B3FD9,#1F7BFF)',
      color: '#fff',
      fontSize: 13
    }
  }, /*#__PURE__*/React.createElement(FIcon, {
    name: "crown",
    size: 14
  }), "Pro"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 17,
      letterSpacing: '.02em',
      color: 'var(--text-strong)'
    }
  }, "PLANO PADR\xC3O"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 32,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "R$ 29,99", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 400
    }
  }, "/m\xEAs")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0',
      fontSize: 20,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Benef\xEDcios"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, ['Tudo do plano gratuito', 'Acompanhamento avançado', 'Insights personalizados', 'Integração com dispositivos', 'Comunidade'].map(check)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: {
      height: 52,
      borderRadius: 999,
      border: 0,
      background: 'linear-gradient(90deg,#0B3FD9,#1F7BFF 60%,#0B3FD9)',
      color: '#fff',
      fontFamily: 'inherit',
      fontSize: 17,
      cursor: 'pointer',
      marginTop: 6
    }
  }, "Fazer upgrade"))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderRadius: 22,
      padding: 24,
      background: 'linear-gradient(160deg,rgba(255,255,255,.85) 30%,rgba(255,226,230,.75))',
      border: '1.5px solid #fff',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 17,
      letterSpacing: '.02em',
      color: 'var(--text-strong)'
    }
  }, "PLANO PREMIUM"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: 32,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "R$ 69,99", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 16,
      fontWeight: 400
    }
  }, "/m\xEAs")), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: '4px 0 0',
      fontSize: 20,
      fontWeight: 600,
      color: 'var(--text-strong)'
    }
  }, "Benef\xEDcios"), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, ['Tudo dos planos gratuito e padrão', 'Análise clínica completa', 'Painéis personalizáveis', 'Metas avançadas', 'Suporte dedicado'].map(check)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: {
      height: 52,
      borderRadius: 999,
      border: '1.5px solid rgba(214,226,242,.95)',
      background: 'rgba(255,255,255,.7)',
      color: 'var(--text-strong)',
      fontFamily: 'inherit',
      fontSize: 17,
      fontWeight: 500,
      cursor: 'pointer',
      marginTop: 6
    }
  }, "Come\xE7ar")));
  const body = tab === 'cobranca' ? cobranca : tab === 'conta' ? conta : /*#__PURE__*/React.createElement("section", {
    style: {
      ...glass,
      padding: 30,
      fontSize: 15,
      color: 'var(--text-muted)'
    }
  }, "Esta se\xE7\xE3o ainda n\xE3o foi desenhada nas refer\xEAncias.");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: mobile ? '1fr' : '340px minmax(0,1fr)',
      gap: g,
      alignItems: 'start'
    }
  }, menu, body);
}
Object.assign(window, {
  PerfilScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/PerfilScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/Shell.jsx
try { (() => {
// Shell: icon rail + top bar (desktop) · compact bar + bottom nav (mobile).
const {
  Sidebar,
  TopBar,
  MobileBottomNav
} = window.SaluteProjetoDesigner_8b4683;
const MARK = 'data:image/png;base64,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';
function useIsMobile() {
  const q = '(max-width: 767px)';
  const [m, setM] = React.useState(() => !!window.__FORCE_MOBILE || window.matchMedia(q).matches);
  React.useEffect(() => {
    if (window.__FORCE_MOBILE) return;
    const mq = window.matchMedia(q);
    const f = () => setM(mq.matches);
    mq.addEventListener('change', f);
    return () => mq.removeEventListener('change', f);
  }, []);
  return m;
}
function AppShell({
  active,
  onNavigate,
  title,
  subtitle,
  children
}) {
  const mobile = useIsMobile();
  const scroller = React.useRef(null);
  React.useEffect(() => {
    if (scroller.current) scroller.current.scrollTop = 0;
  }, [active]);
  if (mobile) {
    return /*#__PURE__*/React.createElement("div", {
      "data-screen-label": `Mobile · ${title}`,
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
      notifications: 1,
      user: KIT_USER,
      logoMarkSrc: MARK
    })), children), /*#__PURE__*/React.createElement(MobileBottomNav, {
      items: KIT_NAV,
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
    items: KIT_NAV,
    activeId: active,
    onSelect: onNavigate,
    logoMarkSrc: MARK,
    user: KIT_USER,
    onLogo: () => onNavigate('painel'),
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
  }, /*#__PURE__*/React.createElement(TopBar, {
    title: title,
    subtitle: subtitle,
    notifications: 1,
    messages: 0,
    user: KIT_USER,
    onMessages: () => onNavigate('mensagens')
  }), children));
}
Object.assign(window, {
  AppShell,
  useIsMobile
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/kit-shared.jsx
try { (() => {
// Shared bits for the reference-identical kit: data, glass card, chips, status badges.
const {
  Icon: SIcon,
  Avatar: SAvatar
} = window.SaluteProjetoDesigner_8b4683;
const KIT_NAV = [{
  id: 'painel',
  label: 'Painel',
  icon: 'house'
}, {
  id: 'pacientes',
  label: 'Pacientes',
  icon: 'users'
}, {
  id: 'agenda',
  label: 'Agenda',
  icon: 'calendar-days'
}, {
  id: 'mensagens',
  label: 'Mensagens',
  icon: 'messages-square'
}, {
  id: 'perfil',
  label: 'Configurações',
  icon: 'settings'
}];
const KIT_USER = {
  name: 'Camila Rocha'
};
const PATIENTS = [{
  id: 'P00001',
  name: 'Ahmad Lipshutz',
  email: 'ahmadlipshutz@gmail.com',
  age: 21,
  proc: 'Avaliação',
  status: 'tratamento'
}, {
  id: 'P000012',
  name: 'Charlie Botosh',
  email: 'charliebotosh@gmail.com',
  age: 23,
  proc: 'Limpeza de pele',
  status: 'consulta'
}, {
  id: 'P000034',
  name: 'Adison Schleifer',
  email: 'adisonschleifer@gmail.com',
  age: 25,
  proc: 'Harmonização',
  status: 'concluido'
}, {
  id: 'P000014',
  name: 'Guy Hawkins',
  email: 'sara.cruz@example.com',
  age: 27,
  proc: 'Clareamento',
  status: 'tratamento'
}, {
  id: 'P000013',
  name: 'Floyd Miles',
  email: 'georgia.young@example.com',
  age: 29,
  proc: 'Limpeza de pele',
  status: 'consulta'
}, {
  id: 'P000021',
  name: 'Savannah Nguyen',
  email: 'debra.holt@example.com',
  age: 31,
  proc: 'Harmonização',
  status: 'concluido'
}, {
  id: 'P000019',
  name: 'Devon Lane',
  email: 'felicia.reid@example.com',
  age: 33,
  proc: 'Clareamento',
  status: 'tratamento'
}, {
  id: 'P000016',
  name: 'Darlene Robertson',
  email: 'michael.mitc@example.com',
  age: 35,
  proc: 'Limpeza de pele',
  status: 'consulta'
}];
const STATUS = {
  tratamento: {
    label: 'Em tratamento',
    c: '#F2694A',
    bg: 'rgba(242,105,74,.08)',
    bd: 'rgba(242,105,74,.28)'
  },
  consulta: {
    label: 'Consulta',
    c: '#1F5EFF',
    bg: 'rgba(31,94,255,.07)',
    bd: 'rgba(31,94,255,.28)'
  },
  concluido: {
    label: 'Concluído',
    c: '#2DBF6A',
    bg: 'rgba(45,191,106,.08)',
    bd: 'rgba(45,191,106,.28)'
  }
};
const glass = {
  background: 'linear-gradient(180deg, rgba(255,255,255,.62) 0%, rgba(255,255,255,.4) 100%)',
  border: '2px solid rgba(255,255,255,.9)',
  borderRadius: 26,
  boxShadow: '0 18px 40px -26px rgba(23,73,170,.35)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
  boxSizing: 'border-box',
  minWidth: 0
};
function StatusBadge({
  s
}) {
  const v = STATUS[s];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: 26,
      padding: '0 10px',
      borderRadius: 999,
      background: v.bg,
      border: `1px solid ${v.bd}`,
      color: v.c,
      fontSize: 13,
      fontWeight: 500,
      whiteSpace: 'nowrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: '50%',
      border: `2px solid ${v.c}`,
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 3,
      height: 3,
      borderRadius: '50%',
      background: v.c
    }
  })), v.label);
}
function PillChip({
  icon = 'calendar',
  children,
  onClick
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClick,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      height: 40,
      padding: '0 16px',
      borderRadius: 999,
      border: '1.5px solid rgba(255,255,255,.95)',
      background: 'rgba(255,255,255,.55)',
      color: 'var(--text-strong)',
      fontFamily: 'inherit',
      fontSize: 15,
      fontWeight: 500,
      whiteSpace: 'nowrap',
      cursor: 'pointer',
      boxShadow: '0 4px 12px -8px rgba(23,73,170,.35)'
    }
  }, /*#__PURE__*/React.createElement(SIcon, {
    name: icon,
    size: 17,
    strokeWidth: 1.7
  }), children);
}
function CardTitle({
  children,
  right,
  size = 22
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontSize: size,
      fontWeight: 600,
      color: 'var(--text-strong)',
      letterSpacing: '-0.01em'
    }
  }, children), right);
}
function Legend({
  items
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      gap: 16
    }
  }, items.map(([l, c]) => /*#__PURE__*/React.createElement("span", {
    key: l,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 13,
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: c
    }
  }), l)));
}
function MonthGrid({
  today = 2,
  bold = [6, 7],
  startOffset = 4,
  days = 31,
  compact
}) {
  const cells = [...Array(startOffset).fill(null), ...Array.from({
    length: days
  }, (_, i) => i + 1)];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(7,1fr)',
      rowGap: compact ? 6 : 14,
      textAlign: 'center'
    }
  }, ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'].map(d => /*#__PURE__*/React.createElement("span", {
    key: d,
    style: {
      fontSize: 13,
      color: 'var(--text-body)',
      paddingBottom: compact ? 4 : 10
    }
  }, d)), cells.map((d, i) => d === null ? /*#__PURE__*/React.createElement("span", {
    key: 'e' + i
  }) : /*#__PURE__*/React.createElement("span", {
    key: d,
    style: {
      justifySelf: 'center',
      width: 40,
      height: 40,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 18,
      fontWeight: d === today || bold.includes(d) || d > 7 ? 600 : 400,
      color: d === today ? '#1F5EFF' : d < 6 ? 'var(--text-muted)' : 'var(--text-strong)',
      background: d === today ? '#fff' : 'transparent',
      boxShadow: d === today ? '0 4px 12px -6px rgba(23,73,170,.4)' : 'none'
    }
  }, d)));
}
function useNarrow(px = 1180) {
  const [n, setN] = React.useState(() => window.matchMedia('(max-width: ' + px + 'px)').matches);
  React.useEffect(() => {
    const mq = window.matchMedia('(max-width: ' + px + 'px)');
    const f = () => setN(mq.matches);
    mq.addEventListener('change', f);
    return () => mq.removeEventListener('change', f);
  }, [px]);
  return n;
}
Object.assign(window, {
  useNarrow,
  KIT_NAV,
  KIT_USER,
  PATIENTS,
  STATUS,
  glass,
  StatusBadge,
  PillChip,
  CardTitle,
  Legend,
  MonthGrid
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/kit-shared.jsx", error: String((e && e.message) || e) }); }

__ds_ns.BarChart = __ds_scope.BarChart;

__ds_ns.GaugeChart = __ds_scope.GaugeChart;

__ds_ns.SalesFunnel = __ds_scope.SalesFunnel;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.TrendPill = __ds_scope.TrendPill;

__ds_ns.KanbanCard = __ds_scope.KanbanCard;

__ds_ns.MessageBubble = __ds_scope.MessageBubble;

__ds_ns.Progress = __ds_scope.Progress;

__ds_ns.Table = __ds_scope.Table;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.SegmentedControl = __ds_scope.SegmentedControl;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.MobileBottomNav = __ds_scope.MobileBottomNav;

__ds_ns.PageHeader = __ds_scope.PageHeader;

__ds_ns.Sidebar = __ds_scope.Sidebar;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.TopBar = __ds_scope.TopBar;

__ds_ns.CardIcon = __ds_scope.CardIcon;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.StatCard = __ds_scope.StatCard;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

})();
