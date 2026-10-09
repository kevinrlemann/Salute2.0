# Ajustes no design system feitos no momento do build:
# avatar abre Minha conta (onUser), a seta de sair fica logo depois dele (afterAvatar / afterUser)
# e as abas sem permissão aparecem com cadeado (barra lateral e barra de baixo do celular).
def _rep(ds, a, b):
    assert ds.count(a) == 1, a[:120]
    return ds.replace(a, b)

def _av_btn(size, ring):
    return ('user ? /*#__PURE__*/React.createElement("button", {\n'
            '      type: "button",\n'
            '      onClick: onUser,\n'
            '      "aria-label": "Minha conta",\n'
            '      title: user.name,\n'
            "      style: { border: 0, padding: 0, background: 'none', cursor: onUser ? 'pointer' : 'default', borderRadius: '50%', display: 'flex', flexShrink: 0 }\n"
            '    }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {\n'
            '      name: user.name,\n'
            '      src: user.avatar,\n'
            '      size: ' + str(size) + (',\n      ring: true' if ring else '') + '\n'
            '    })) : null')

def aplicar(ds):
    ds = _rep(ds, "  compact = false,\n  logoMarkSrc,\n  beforeAvatar,\n  style\n}) {", "  compact = false,\n  logoMarkSrc,\n  beforeAvatar,\n  afterAvatar,\n  onUser,\n  style\n}) {")
    t1 = ('}), beforeAvatar || null, user ? /*#__PURE__*/React.createElement(__ds_scope.Avatar, {\n'
          '      name: user.name,\n      src: user.avatar,\n      size: 40,\n      ring: true\n    }) : null);\n  }')
    ds = _rep(ds, t1, '}), beforeAvatar || null, ' + _av_btn(40, True) + ', afterAvatar || null);\n  }')
    t2 = ('}), beforeAvatar || null, user ? /*#__PURE__*/React.createElement(__ds_scope.Avatar, {\n'
          '    name: user.name,\n    src: user.avatar,\n    size: 40\n  }) : null));\n}')
    ds = _rep(ds, t2, '}), beforeAvatar || null, ' + _av_btn(40, False) + ', afterAvatar || null));\n}')
    ds = _rep(ds, '  user,\n  onLogo,\n  style\n}) {\n  return /*#__PURE__*/React.createElement("aside", {',
                  '  user,\n  onLogo,\n  onUser,\n  afterUser,\n  style\n}) {\n  return /*#__PURE__*/React.createElement("aside", {')
    t4 = ('  }), user ? /*#__PURE__*/React.createElement(__ds_scope.Avatar, {\n'
          '    name: user.name,\n    src: user.avatar,\n    size: 56,\n    ring: true\n  }) : null);\n}\nObject.assign(__ds_scope, { Sidebar });')
    ds = _rep(ds, t4, '  }), ' + _av_btn(56, True) + ', afterUser || null);\n}\nObject.assign(__ds_scope, { Sidebar });')
    # barra lateral: cadeado
    ds = _rep(ds, '    title: item.label,\n    "aria-label": item.label,',
                  "    title: item.locked ? item.label + ' (sem acesso)' : item.label,\n    \"aria-label\": item.locked ? item.label + ', sem acesso' : item.label,")
    ds = _rep(ds, "      background: active ? 'linear-gradient(180deg,#1D5BFF 0%,#0B3FD9 100%)' : hover ? '#fff' : 'rgba(255,255,255,.82)',\n      color: active ? '#fff' : '#5A6B8C',",
                  "      background: active ? 'linear-gradient(180deg,#1D5BFF 0%,#0B3FD9 100%)' : hover ? '#fff' : item.locked ? 'rgba(255,255,255,.55)' : 'rgba(255,255,255,.82)',\n      color: active ? '#fff' : item.locked ? '#A3B0C6' : '#5A6B8C',")
    ds = _rep(ds, '  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {\n    name: item.icon,\n    size: 22,\n    strokeWidth: 1.6\n  }), item.badge ?',
                  '  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {\n    name: item.icon,\n    size: 22,\n    strokeWidth: 1.6\n  }), item.locked ? /*#__PURE__*/React.createElement("span", {\n'
                  '    "aria-hidden": "true",\n'
                  "    style: { position: 'absolute', right: 4, bottom: 4, width: 22, height: 22, borderRadius: '50%', background: '#fff', color: active ? '#0B3FD9' : '#6B7A93', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 3px 8px -2px rgba(23,73,170,.35)' }\n"
                  "  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, { name: 'lock', size: 12, strokeWidth: 2.4 })) : null, item.badge ?")
    # barra de baixo do celular: cadeado
    ds = _rep(ds, "        color: active ? 'var(--primary)' : 'var(--text-muted)',\n        fontFamily: 'inherit',\n        fontSize: 11,",
                  "        color: active ? 'var(--primary)' : it.locked ? 'var(--text-subtle)' : 'var(--text-muted)',\n        opacity: it.locked && !active ? .75 : 1,\n        fontFamily: 'inherit',\n        fontSize: 11,")
    ds = _rep(ds, '    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {\n      name: it.icon,\n      size: 21,\n      strokeWidth: active ? 2.2 : 1.8\n    }), count ?',
                  '    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {\n      name: it.icon,\n      size: 21,\n      strokeWidth: active ? 2.2 : 1.8\n    }), it.locked ? /*#__PURE__*/React.createElement("span", {\n'
                  '      "aria-hidden": "true",\n'
                  "      style: { position: 'absolute', right: active ? 4 : -2, bottom: -3, width: 15, height: 15, borderRadius: '50%', background: '#fff', color: '#6B7A93', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 5px -1px rgba(23,73,170,.35)' }\n"
                  "    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, { name: 'lock', size: 9, strokeWidth: 2.6 })) : null, count ?")
    ds = _rep(ds, "      \"aria-current\": active ? 'page' : undefined,\n      onClick: () => onSelect && onSelect(it.id, it),",
                  "      \"aria-current\": active ? 'page' : undefined,\n      \"aria-label\": it.locked ? it.label + ', sem acesso' : undefined,\n      onClick: () => onSelect && onSelect(it.id, it),")
    assert 'afterUser || null' in ds and ds.count('afterAvatar || null') == 2 and ds.count("name: 'lock'") == 2
    return ds

# App: abas sem permissão com cadeado, tela de sem acesso, faixa do suporte e menu da conta
def app(_a):
    _a = _rep(_a, "  const navItems = KIT_NAV.filter((n) => can(n.id));",
                  "  const permitidos = KIT_NAV.filter((n) => can(n.id));\n  const navItems = KIT_NAV.map((n) => (can(n.id) ? n : { ...n, locked: true }));\n  const [bloq, setBloq] = React.useState(null);")
    _a = _rep(_a, "  const route = can(route0) ? route0 : (navItems[0] || { id: 'painel' }).id;",
                  "  const route = can(route0) ? route0 : (permitidos[0] || { id: 'painel' }).id;\n  const navegar = (id) => { if (!can(id)) { setBloq(id); return; } setBloq(null); setRoute(id); };\n  const semNada = !permitidos.length, abaBloq = bloq ? KIT_NAV.find((n) => n.id === bloq) : null;")
    _a = _rep(_a, "<AppShell items={navItems} active={route} onNavigate={setRoute} topExtra=",
                  "<AppShell items={navItems} active={bloq || route} onNavigate={navegar} banner={<AvisoSuporte mobile={mobile} />} topExtra=")
    _a = _rep(_a, "title={mobile ? r.mobileTitle || r.title : r.title} subtitle={mobile ? undefined : r.subtitle}>",
                  "title={abaBloq ? abaBloq.label : mobile ? r.mobileTitle || r.title : r.title} subtitle={abaBloq || mobile ? undefined : r.subtitle}>")
    _a = _rep(_a, "        <Screen mobile={mobile} onNavigate={setRoute} onNew={() => setNovo(true)} />",
                  "        {abaBloq || semNada ? <SemAcesso titulo={abaBloq ? abaBloq.label : 'nenhuma aba'} /> : <Screen mobile={mobile} onNavigate={navegar} onNew={() => setNovo(true)} />}")
    _a = _rep(_a, "      <AvisoDemo mobile={mobile} />\n", "      <AvisoDemo mobile={mobile} />\n      <ContaMenu mobile={mobile} onNavigate={navegar} />\n      <NotifMenu mobile={mobile} />\n")
    _a = _rep(_a, "if (!ROUTES[t] || !can(t)) return false; setRoute(t);", "if (!ROUTES[t] || !can(t)) return false; navegar(t);")
    return _a
