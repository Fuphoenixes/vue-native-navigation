module.exports = function (e) {
  var t = {};

  function n(r) {
    if (t[r]) return t[r].exports;
    var i = t[r] = {i: r, l: !1, exports: {}};
    return e[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports
  }

  return n.m = e, n.c = t, n.d = function (e, t, r) {
    n.o(e, t) || Object.defineProperty(e, t, {enumerable: !0, get: r})
  }, n.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(e, "__esModule", {value: !0})
  }, n.t = function (e, t) {
    if (1 & t && (e = n(e)), 8 & t) return e;
    if (4 & t && "object" == typeof e && e && e.__esModule) return e;
    var r = Object.create(null);
    if (n.r(r), Object.defineProperty(r, "default", {
      enumerable: !0,
      value: e
    }), 2 & t && "string" != typeof e) for (var i in e) n.d(r, i, function (t) {
      return e[t]
    }.bind(null, i));
    return r
  }, n.n = function (e) {
    var t = e && e.__esModule ? function () {
      return e.default
    } : function () {
      return e
    };
    return n.d(t, "a", t), t
  }, n.o = function (e, t) {
    return Object.prototype.hasOwnProperty.call(e, t)
  }, n.p = "", n(n.s = 6)
}([function (e, t, n) {
  "use strict";
  n.r(t);
  var r = n(1), i = n.n(r);
  for (var a in r) "default" !== a && function (e) {
    n.d(t, e, (function () {
      return r[e]
    }))
  }(a);
  t.default = i.a
}, function (e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {value: !0});
  var r = a(n(8)), i = a(n(9));

  function a(e) {
    return e && e.__esModule ? e : {default: e}
  }

  t.default = {
    name: "vue-native-navigation",
    components: {keepRouteAlive: i.default},
    props: {useRouteTransition: {type: Boolean, default: !0}, routeTransitionLimit: {type: Number, default: 8}},
    data: function () {
      return {transitionName: "", cachedViews: []}
    },
    watch: {
      $route: {
        handler: function (e, t) {
          this._setRouterTransition(e, t), this._changeCachedViews(e)
        }, immediate: !0
      }
    },
    methods: {
      _setRouterTransition: function (e, t) {
        if (this.useRouteTransition && !("Android" === r.default && r.default.version < this.routeTransitionLimit)) return window.__ROUTER_TRANSITION_NAME__ ? (this.transitionName = window.__ROUTER_TRANSITION_NAME__.transitionName, void (window.__ROUTER_TRANSITION_NAME__ = void 0)) : void (t && e.meta && t.meta && void 0 !== e.meta.depth && void 0 !== t.meta.depth && e.meta.depth !== t.meta.depth ? e.meta.depth > t.meta.depth ? this.transitionName = "slide-left" : e.meta.depth < t.meta.depth && (this.transitionName = "slide-right") : this.transitionName = "")
      }, _changeCachedViews: function (e) {
        e.meta && e.meta.depth && (this.cachedViews = this.cachedViews.filter((function (t) {
          return t.meta && t.meta.depth < e.meta.depth
        })), this.cachedViews.push(e))
      }, afterEnter: function () {
        this.$navigationBus.$emit("after-route-enter")
      }
    },
    render: function (e) {
      var t = this.cachedViews, n = this.transitionName, r = this.afterEnter;
      if (this.$slots.default) {
        var i = this.$slots.default[0].data.staticClass;
        this.$slots.default[0].data.staticClass = i ? i + " router" : "router"
      }
      return e("transition", {
        attrs: {name: n},
        on: {afterEnter: r}
      }, [e("keep-route-alive", {
        attrs: {
          include: t.map((function (e) {
            return e.fullPath
          }))
        }
      }, [this.$slots.default])])
    }
  }
}, function (e, t, n) {
  "use strict";
  var r = n(4), i = n.n(r)()((function (e) {
    return e[1]
  }));
  i.push([e.i, "\n.router {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  overflow: auto;\n  background: #f8f8f8;\n\n  /* -webkit-backface-visibility: hidden; */\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n}\n.slide-right-enter-active,\n.slide-right-leave-active,\n.slide-left-enter-active {\n  -webkit-transition: -webkit-transform 0.3s;\n  transition: -webkit-transform 0.3s;\n  transition: transform 0.3s;\n  transition: transform 0.3s, -webkit-transform 0.3s;\n  will-change: transform;\n}\n.slide-left-leave-active {\n  -webkit-transition: -webkit-transform 0.3s 0.1s;\n  transition: -webkit-transform 0.3s 0.1s;\n  transition: transform 0.3s 0.1s;\n  transition: transform 0.3s 0.1s, -webkit-transform 0.3s 0.1s;\n  will-change: transform;\n}\n.slide-left-enter,\n.slide-right-leave-active {\n  z-index: 1000000;\n}\n.slide-left-enter-to,\n.slide-left-leave-to {\n  z-index: inherit;\n}\n.slide-right-enter {\n  -webkit-transform: translate(-50%, 0);\n          transform: translate(-50%, 0);\n}\n.slide-right-enter-to {\n  -webkit-transform: translate(0, 0);\n          transform: translate(0, 0);\n}\n.slide-right-leave {\n  -webkit-transform: translate(0, 0);\n          transform: translate(0, 0);\n}\n.slide-right-leave-to {\n  -webkit-transform: translate(100%, 0);\n          transform: translate(100%, 0);\n}\n.slide-left-enter {\n  -webkit-transform: translate(100%, 0);\n          transform: translate(100%, 0);\n}\n.slide-left-enter-to {\n  -webkit-transform: translate(0, 0);\n          transform: translate(0, 0);\n}\n.slide-left-leave {\n  -webkit-transform: translate(0, 0);\n          transform: translate(0, 0);\n}\n.slide-left-leave-to {\n  -webkit-transform: translate(-50%, 0);\n          transform: translate(-50%, 0);\n}\n", ""]), t.a = i
}, function (e, t, n) {
  "use strict";
  var r, i = function () {
    var e;
    return function () {
      return void 0 === e && (e = Boolean(window && document && document.all && !window.atob)), e
    }
  }(), a = (r = {}, function (e) {
    if (void 0 === r[e]) {
      var t = document.querySelector(e);
      if (window.HTMLIFrameElement && t instanceof window.HTMLIFrameElement) try {
        t = t.contentDocument.head
      } catch (e) {
        t = null
      }
      r[e] = t
    }
    return r[e]
  }), o = [];

  function s(e) {
    for (var t = -1, n = 0; n < o.length; n++) if (o[n].identifier === e) {
      t = n;
      break
    }
    return t
  }

  function u(e, t) {
    for (var n = {}, r = [], i = 0; i < e.length; i++) {
      var a = e[i], u = t.base ? a[0] + t.base : a[0], c = n[u] || 0, f = "".concat(u, " ").concat(c);
      n[u] = c + 1;
      var l = s(f), d = {css: a[1], media: a[2], sourceMap: a[3]};
      -1 !== l ? (o[l].references++, o[l].updater(d)) : o.push({
        identifier: f,
        updater: v(d, t),
        references: 1
      }), r.push(f)
    }
    return r
  }

  function c(e) {
    var t = document.createElement("style"), r = e.attributes || {};
    if (void 0 === r.nonce) {
      var i = n.nc;
      i && (r.nonce = i)
    }
    if (Object.keys(r).forEach((function (e) {
      t.setAttribute(e, r[e])
    })), "function" == typeof e.insert) e.insert(t); else {
      var o = a(e.insert || "head");
      if (!o) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
      o.appendChild(t)
    }
    return t
  }

  var f = function () {
    var e = [];
    return function (t, n) {
      return e[t] = n, e.filter(Boolean).join("\n")
    }
  }();

  function l(e, t, n, r) {
    var i = n ? "" : r.media ? "@media ".concat(r.media, " {").concat(r.css, "}") : r.css;
    if (e.styleSheet) e.styleSheet.cssText = f(t, i); else {
      var a = document.createTextNode(i), o = e.childNodes;
      o[t] && e.removeChild(o[t]), o.length ? e.insertBefore(a, o[t]) : e.appendChild(a)
    }
  }

  function d(e, t, n) {
    var r = n.css, i = n.media, a = n.sourceMap;
    if (i ? e.setAttribute("media", i) : e.removeAttribute("media"), a && "undefined" != typeof btoa && (r += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a)))), " */")), e.styleSheet) e.styleSheet.cssText = r; else {
      for (; e.firstChild;) e.removeChild(e.firstChild);
      e.appendChild(document.createTextNode(r))
    }
  }

  var h = null, p = 0;

  function v(e, t) {
    var n, r, i;
    if (t.singleton) {
      var a = p++;
      n = h || (h = c(t)), r = l.bind(null, n, a, !1), i = l.bind(null, n, a, !0)
    } else n = c(t), r = d.bind(null, n, t), i = function () {
      !function (e) {
        if (null === e.parentNode) return !1;
        e.parentNode.removeChild(e)
      }(n)
    };
    return r(e), function (t) {
      if (t) {
        if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
        r(e = t)
      } else i()
    }
  }

  e.exports = function (e, t) {
    (t = t || {}).singleton || "boolean" == typeof t.singleton || (t.singleton = i());
    var n = u(e = e || [], t);
    return function (e) {
      if (e = e || [], "[object Array]" === Object.prototype.toString.call(e)) {
        for (var r = 0; r < n.length; r++) {
          var i = s(n[r]);
          o[i].references--
        }
        for (var a = u(e, t), c = 0; c < n.length; c++) {
          var f = s(n[c]);
          0 === o[f].references && (o[f].updater(), o.splice(f, 1))
        }
        n = a
      }
    }
  }
}, function (e, t, n) {
  "use strict";
  e.exports = function (e) {
    var t = [];
    return t.toString = function () {
      return this.map((function (t) {
        var n = e(t);
        return t[2] ? "@media ".concat(t[2], " {").concat(n, "}") : n
      })).join("")
    }, t.i = function (e, n, r) {
      "string" == typeof e && (e = [[null, e, ""]]);
      var i = {};
      if (r) for (var a = 0; a < this.length; a++) {
        var o = this[a][0];
        null != o && (i[o] = !0)
      }
      for (var s = 0; s < e.length; s++) {
        var u = [].concat(e[s]);
        r && i[u[0]] || (n && (u[2] ? u[2] = "".concat(n, " and ").concat(u[2]) : u[2] = n), t.push(u))
      }
    }, t
  }
}, function (e, t, n) {
  "use strict";

  function r(e, t, n, r, i, a, o, s) {
    var u, c = "function" == typeof e ? e.options : e;
    if (t && (c.render = t, c.staticRenderFns = n, c._compiled = !0), r && (c.functional = !0), a && (c._scopeId = "data-v-" + a), o ? (u = function (e) {
      (e = e || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) || "undefined" == typeof __VUE_SSR_CONTEXT__ || (e = __VUE_SSR_CONTEXT__), i && i.call(this, e), e && e._registeredComponents && e._registeredComponents.add(o)
    }, c._ssrRegister = u) : i && (u = s ? function () {
      i.call(this, (c.functional ? this.parent : this).$root.$options.shadowRoot)
    } : i), u) if (c.functional) {
      c._injectStyles = u;
      var f = c.render;
      c.render = function (e, t) {
        return u.call(t), f(e, t)
      }
    } else {
      var l = c.beforeCreate;
      c.beforeCreate = l ? [].concat(l, u) : [u]
    }
    return {exports: e, options: c}
  }

  n.d(t, "a", (function () {
    return r
  }))
}, function (e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {value: !0});
  var r = s(n(7)), i = s(n(10)), a = n(11), o = s(n(12));

  function s(e) {
    return e && e.__esModule ? e : {default: e}
  }

  var u = {
    install: function (e) {
      e.prototype.$navigationBus = new e({}), e.component("vue-native-navigation", r.default), e.mixin(i.default), e.prototype.$getCachedPages = a.getCachedPages, e.prototype.$getPreviousCachedPage = a.getPreviousCachedPage, e.prototype.$clearCachedPages = a.clearCachedPages, e.prototype.$clearCachedPagesByPath = a.clearCachedPagesByPath, e.prototype.$setRouteTransitionName = o.default
    }
  };
  t.default = u
}, function (e, t, n) {
  "use strict";
  n.r(t);
  var r = n(0);
  for (var i in r) "default" !== i && function (e) {
    n.d(t, e, (function () {
      return r[e]
    }))
  }(i);
  n(13);
  var a = n(5), o = Object(a.a)(r.default, void 0, void 0, !1, null, null, null);
  o.options.__file = "src/VueNativeNavigation.vue", t.default = o.exports
}, function (e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {value: !0});
  var r = null;
  if (/(iPhone|iPhone OS|Phone|iOS)/i.test(navigator.userAgent)) r = {type: "ios"}; else if (/Android/i.test(navigator.userAgent)) {
    var i = navigator.userAgent.indexOf("Android");
    r = {type: "Android", version: parseFloat(navigator.userAgent.slice(i + 8))}
  } else r = {type: "pc"};
  t.default = r
}, function (e, t, n) {
  "use strict";

  function r(e, t, n, r) {
    var i = e[t];
    !i || r && t === r.key || i.componentInstance.$destroy(), e[t] = null, s(n, t)
  }

  function i(e) {
    return null != e
  }

  function a(e) {
    return e.isComment && e.asyncFactory
  }

  function o(e) {
    if (Array.isArray(e)) for (var t = 0; t < e.length; t++) {
      var n = e[t];
      if (i(n) && (i(n.componentOptions) || a(n))) return n
    }
  }

  function s(e, t) {
    if (e.length) {
      var n = e.indexOf(t);
      if (n > -1) return e.splice(n, 1)
    }
  }

  Object.defineProperty(t, "__esModule", {value: !0}), t.default = {
    name: "keep-route-alive",
    abstract: !0,
    props: {include: [Array]},
    created: function () {
      this.cache = Object.create(null), this.keys = []
    },
    mounted: function () {
      var e = this;
      this.$watch("include", (function (t) {
        t && function (e, t) {
          var n = e.cache, i = e.keys, a = e._vnode;
          for (var o in n) {
            n[o] && (t(o) || r(n, o, i, a))
          }
        }(e, (function (e) {
          return t.some((function (t) {
            return t === e
          }))
        }))
      })), window.__KEEP_ROUTE_ALIVE__ = this
    },
    destroyed: function () {
      for (var e in this.cache) r(this.cache, e, this.keys)
    },
    render: function () {
      var e = this.$slots.default, t = o(e);
      if (t && t.componentOptions) {
        var n = this.cache, r = this.keys, i = this.$route.fullPath;
        if (t.key = i, this.include && !this.include.some((function (e) {
          return e === i
        }))) return t;
        n[i] ? (t.componentInstance = n[i].componentInstance, s(r, i), r.push(i)) : (n[i] = t, r.push(i)), t.data.keepAlive = !0
      }
      return t || e && e[0]
    }
  }
}, function (e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {value: !0}), t.default = {
    created: function () {
      var e = this;
      if (this.$vnode) {
        var t = this.$vnode.componentOptions.Ctor.extendOptions.afterRouteEnter;
        this.$navigationBus && this.$navigationBus.$once("after-route-enter", (function () {
          t && t.apply(e)
        }))
      }
    }
  }
}, function (e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {value: !0});
  t.getCachedPages = function () {
    var e = window.__KEEP_ROUTE_ALIVE__, t = e.cache;
    return e.keys.map((function (e) {
      return t[e]
    }))
  }, t.getPreviousCachedPage = function () {
    var e = window.__KEEP_ROUTE_ALIVE__, t = e.cache, n = e.keys, r = n[n.length - 2];
    return r && t[r]
  }, t.clearCachedPages = function () {
    window.__KEEP_ROUTE_ALIVE__.$parent.$parent.cachedViews = []
  }, t.clearCachedPagesByPath = function (e, t) {
    if (e) {
      var n = window.__KEEP_ROUTE_ALIVE__.$parent.$parent, r = n.cachedViews;
      "string" == typeof e && (n.cachedViews = r.filter((function (n) {
        return t ? n.fullPath !== e : n.path !== e
      }))), Array.isArray(e) && (n.cachedViews = r.filter((function (n) {
        return t ? e.every((function (e) {
          return n.fullPath !== e
        })) : e.every((function (e) {
          return n.path !== e
        }))
      })))
    }
  }
}, function (e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {value: !0});
  t.default = function (e, t) {
    window.__ROUTER_TRANSITION_NAME__ && window.__ROUTER_TRANSITION_NAME__.important || (window.__ROUTER_TRANSITION_NAME__ = {
      transitionName: e,
      important: t
    })
  }
}, function (e, t, n) {
  "use strict";
  var r = n(3), i = n.n(r), a = n(2), o = {insert: "head", singleton: !1};
  i()(a.a, o), a.a.locals
}]);
