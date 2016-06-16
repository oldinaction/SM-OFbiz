/*
 * LIGHTSTREAMER - www.lightstreamer.com
 * Lightstreamer Web Client
 * Version 7.0.2 build 1710
 * Copyright (c) Lightstreamer Srl. All Rights Reserved.
 * Contains: LightstreamerClient, Subscription, ConnectionSharing, DynaGrid
 *   StaticGrid, FlashBridge, Chart, SimpleChartListener
 *   StatusWidget, SimpleLoggerProvider, AlertAppender, BufferAppender
 *   ConsoleAppender, DOMAppender, FunctionAppender, RemoteAppender
 *   LogMessages
 * AMD
 */
(function() {
    define("IllegalStateException", [],
    function() {
        function e(e) {
            this.name = "IllegalStateException";
            this.message = e
        }
        e.prototype = {
            toString: function() {
                return ["[", this.name, this.message, "]"].join("|")
            }
        };
        return e
    });
    define("Environment", ["IllegalStateException"],
    function(e) {
        var g = "undefined" !== typeof window && "undefined" !== typeof navigator && "undefined" !== typeof document,
        d = "undefined" !== typeof importScripts,
        c = "object" == typeof process && (/node(\.exe)?$/.test(process.execPath) || process.node && process.v8 || process.versions && process.versions.node && process.versions.v8);
        if (g && !document.getElementById) throw new e("Not supported browser");
        var b = {
            isBrowserDocument: function() {
                return g
            },
            isBrowser: function() {
                return ! c && (g || d)
            },
            isNodeJS: function() {
                return ! g && c
            },
            isWebWorker: function() {
                return ! g && !c && d
            },
            fx: function() {
                return ! g && !c && !d
            },
            browserDocumentOrDie: function() {
                if (!this.isBrowserDocument()) throw new e("Trying to load a browser-only module on non-browser environment");
            }
        };
        b.isBrowserDocument = b.isBrowserDocument;
        b.isBrowser = b.isBrowser;
        b.isNodeJS = b.isNodeJS;
        b.isWebWorker = b.isWebWorker;
        b.browserDocumentOrDie = b.browserDocumentOrDie;
        return b
    });
    define("Helpers", ["Environment"],
    function(e) {
        var g = /^\s*([\s\S]*?)\s*$/,
        d = /,/,
        c = /\./,
        b = {
            getTimeStamp: function() {
                return (new Date).getTime()
            },
            randomG: function(b) {
                return Math.round(Math.random() * (b || 1E3))
            },
            trim: function(b) {
                return b.replace(g, "$1")
            },
            getNumber: function(b, f) {
                if (b) {
                    if (!b.replace) return b;
                    f ? (b = b.replace(c, ""), b = b.replace(d, ".")) : b = b.replace(d, "");
                    return new Number(b)
                }
                return 0
            },
            isArray: function(b) {
                return b && b.join && "function" == typeof b.join
            },
            addEvent: function(b, c, a) {
                if (!e.isBrowserDocument()) return ! 1;
                "undefined" != typeof b.addEventListener ? b.addEventListener(c, a, !1) : "undefined" != typeof b.attachEvent && b.attachEvent("on" + c, a);
                return ! 0
            },
            removeEvent: function(b, c, a) {
                if (!e.isBrowserDocument()) return ! 1;
                "undefined" != typeof b.removeEventListener ? b.removeEventListener(c, a, !1) : "undefined" != typeof b.detachEvent && b.detachEvent("on" + c, a);
                return ! 0
            }
        };
        b.getTimeStamp = b.getTimeStamp;
        b.randomG = b.randomG;
        b.trim = b.trim;
        b.getNumber = b.getNumber;
        b.isArray = b.isArray;
        b.addEvent = b.addEvent;
        b.removeEvent = b.removeEvent;
        return b
    });
    define("BrowserDetection", ["Environment"],
    function(e) {
        function g(b) {
            var c = f;
            return function() {
                null === c && (c = -1 < a.indexOf(b));
                return c
            }
        }
        function d(a) {
            var b = f;
            return function() {
                if (null === b) {
                    b = !0;
                    for (var c = 0; c < a.length; c++) b = b && a[c]()
                }
                return b
            }
        }
        function c(a, b) {
            var c = f,
            d = f;
            return function(f, e) {
                null === c && (d = (c = a()) ? b() : null);
                return c ? f && d ? !0 === e ? d <= f: !1 === e ? d >= f: d == f: !0 : !1
            }
        }
        function b(b) {
            return function() {
                var c = b.exec(a);
                return c && 2 <= c.length ? c[1] : null
            }
        }
        function h(a) {
            return function() {
                return ! a()
            }
        }
        var f = e.isBrowser() ? null: !1,
        a = e.isBrowser() ? navigator.userAgent.toLowerCase() : null,
        l = f;
        e = {
            isProbablyRekonq: g("rekonq"),
            isProbablyAWebkit: g("webkit"),
            isProbablyPlaystation: g("playstation 3"),
            isProbablyChrome: c(g("chrome/"), b(RegExp("chrome/([0-9]+)", "g"))),
            isProbablyAKhtml: function() {
                null === l && (l = document.childNodes && !document.all && !navigator.DB && !navigator.nB);
                return l
            },
            isProbablyKonqueror: c(g("konqueror"), b(RegExp("konqueror/([0-9.]+)", "g"))),
            isProbablyIE: function(a, d) {
                return c(g("msie"), b(RegExp("msie\\s([0-9]+)[.;]", "g")))(a, d) ? !0 : 11 == a ? g("rv:11.0")() : !1
            },
            kx: g("Edge"),
            isProbablyFX: c(g("firefox"), b(/firefox\/(\d+\.?\d*)/)),
            isProbablyOldOpera: c(function() {
                return "undefined" != typeof opera
            },
            function() {
                if (opera.version) {
                    var a = opera.version(),
                    a = a.replace(RegExp("[^0-9.]+", "g"), "");
                    return parseInt(a)
                }
                return 7
            })
        };
        e.isProbablyAndroidBrowser = d([g("android"), e.isProbablyAWebkit, h(e.isProbablyChrome)]);
        e.isProbablyOperaMobile = d([e.isProbablyOldOpera, g("opera mobi")]);
        e.isProbablyApple = c(d([g("safari"),
        function(a) {
            var b = f;
            return function() {
                if (null === b) {
                    b = !1;
                    for (var c = 0; c < a.length; c++) b = b || a[c]()
                }
                return b
            }
        } ([g("ipad"), g("iphone"), g("ipod"), d([h(e.isProbablyAndroidBrowser), h(e.isProbablyChrome), h(e.isProbablyRekonq)])])]), b(/version\/(\d+\.?\d*)/));
        e.isProbablyRekonq = e.isProbablyRekonq;
        e.isProbablyChrome = e.isProbablyChrome;
        e.isProbablyAWebkit = e.isProbablyAWebkit;
        e.isProbablyPlaystation = e.isProbablyPlaystation;
        e.isProbablyAndroidBrowser = e.isProbablyAndroidBrowser;
        e.isProbablyOperaMobile = e.isProbablyOperaMobile;
        e.isProbablyApple = e.isProbablyApple;
        e.isProbablyAKhtml = e.isProbablyAKhtml;
        e.isProbablyKonqueror = e.isProbablyKonqueror;
        e.isProbablyIE = e.isProbablyIE;
        e.isProbablyEdge = e.kx;
        e.isProbablyFX = e.isProbablyFX;
        e.isProbablyOldOpera = e.isProbablyOldOpera;
        return e
    });
    define("List", [],
    function() {
        function e() {
            this.data = []
        }
        e.prototype = {
            add: function(e) {
                this.data.push(e)
            },
            remove: function(e) {
                e = this.find(e);
                if (0 > e) return ! 1;
                this.data.splice(e, 1);
                return ! 0
            },
            contains: function(e) {
                return 0 <= this.find(e)
            },
            find: function(e) {
                for (var d = 0; d < this.data.length; d++) if (this.data[d] === e) return d;
                return - 1
            },
            forEach: function(e) {
                for (var d = 0; d < this.data.length; d++) e(this.data[d])
            },
            asArray: function() {
                return [].concat(this.data)
            },
            clean: function() {
                this.data = []
            }
        };
        e.prototype.add = e.prototype.add;
        e.prototype.remove = e.prototype.remove;
        e.prototype.forEach = e.prototype.forEach;
        e.prototype.asArray = e.prototype.asArray;
        e.prototype.clean = e.prototype.clean;
        return e
    });
    define("EnvironmentStatus", ["Helpers", "BrowserDetection", "Environment", "List"],
    function(e, g, d, c) {
        function b(a, b, c, d, f) {
            return function() {
                a[b] || (a[c] = !0, d.forEach(function(a) {
                    try {
                        if (a[f]) a[f]();
                        else a()
                    } catch(b) {}
                }), "preunloading" != b && d.clean(), a[b] = !0, a[c] = !1)
            }
        }
        function h(a, b) {
            setTimeout(function() {
                if (a[b]) a[b]();
                else a()
            },
            0)
        }
        function f(a, b, c, d) {
            setTimeout(function() {
                c ? d ? a.apply(c, d) : a.apply(c) : d ? a.apply(null, d) : a()
            },
            b)
        }
        function a() {
            n = !0
        }
        var l = new c,
        m = new c,
        k = new c,
        n = !1,
        q = {
            Zg: "onloadDone",
            Ar: "onloadInprogress",
            Kh: "unloaded",
            Mn: "unloading",
            Lr: "preunloading"
        };
        c = {};
        for (var p in q) c[q[p]] = p;
        p = {
            Zg: !1,
            Ar: !1,
            Kh: !1,
            Mn: !1,
            Lr: !1,
            isLoaded: function() {
                return this.Zg
            },
            isUnloaded: function() {
                return this.Kh
            },
            isUnloading: function() {
                return this.Mn
            },
            addOnloadHandler: function(a) {
                this.hx() ? m.add(a) : h(a, "onloadEvent")
            },
            addUnloadHandler: function(a) {
                this.ix() ? l.add(a) : h(a, "unloadEvent")
            },
            addBeforeUnloadHandler: function(a) {
                k.add(a);
                this.Lr && h(a, "preUnloadEvent")
            },
            removeOnloadHandler: function(a) {
                m.remove(a)
            },
            removeUnloadHandler: function(a) {
                l.remove(a)
            },
            removeBeforeUnloadHandler: function(a) {
                k.remove(a)
            },
            hx: function() {
                return ! (this.Zg || this.Ar)
            },
            ix: function() {
                return ! (this.Kh || this.Mn)
            },
            Yt: function() {
                e.addEvent(window, "unload", this.uu);
                e.addEvent(window, "beforeunload", this.$t);
                if (document && "undefined" != typeof document.readyState) {
                    if ("COMPLETE" == document.readyState.toUpperCase()) {
                        this.di();
                        return
                    }
                    f(this.jp, 1E3, this)
                } else if (this.Gq()) {
                    this.di();
                    return
                }
                if (!e.addEvent(window, "load", this.zj)) this.di();
                else if (g.isProbablyOldOpera()) {
                    var b = !1;
                    g.isProbablyOldOpera(9, !1) && (b = !0, e.addEvent(document, "DOMContentLoaded", a));
                    f(this.ip, 1E3, this, [b])
                }
            },
            di: function() {
                f(this.zj, 0)
            },
            jp: function() {
                this.Zg || ("COMPLETE" == document.readyState.toUpperCase() ? this.zj() : f(this.jp, 1E3, this))
            },
            ip: function(a) {
                this.Zg || (n || !a && this.Gq() ? this.zj() : f(this.ip, 1E3, this, [a]))
            },
            Gq: function() {
                return "undefined" != typeof document.getElementsByTagName && "undefined" != typeof document.getElementById && (null != document.getElementsByTagName("body")[0] || null != document.body)
            }
        };
        p.zj = b(p, c.onloadDone, c.onloadInprogress, m, "onloadEvent");
        p.uu = b(p, c.unloaded, c.unloading, l, "unloadEvent");
        p.$t = b(p, c.preunloading, c.preunloading, k, "preUnloadEvent");
        d.isBrowserDocument() ? p.Yt() : p.di();
        p.addOnloadHandler = p.addOnloadHandler;
        p.addUnloadHandler = p.addUnloadHandler;
        p.addBeforeUnloadHandler = p.addBeforeUnloadHandler;
        p.removeOnloadHandler = p.removeOnloadHandler;
        p.removeUnloadHandler = p.removeUnloadHandler;
        p.removeBeforeUnloadHandler = p.removeBeforeUnloadHandler;
        p.isLoaded = p.isLoaded;
        p.isUnloaded = p.isUnloaded;
        p.isUnloading = p.isUnloading;
        return p
    });
    define("Promise", [],
    function() {
        "undefined" == typeof Promise &&
        function() {
            function e(b, f) {
                G[F] = b;
                G[F + 1] = f;
                F += 2;
                2 === F && (w ? w(a) : L())
            }
            function g(a) {
                return "function" === typeof a
            }
            function d() {
                return function() {
                    process.nextTick(a)
                }
            }
            function c() {
                return function() {
                    H(a)
                }
            }
            function b() {
                var b = 0,
                f = new I(a),
                c = document.createTextNode("");
                f.observe(c, {
                    characterData: !0
                });
                return function() {
                    c.data = b = ++b % 2
                }
            }
            function h() {
                var b = new MessageChannel;
                b.port1.onmessage = a;
                return function() {
                    b.port2.postMessage(0)
                }
            }
            function f() {
                return function() {
                    setTimeout(a, 1)
                }
            }
            function a() {
                for (var a = 0; a < F; a += 2)(0, G[a])(G[a + 1]),
                G[a] = void 0,
                G[a + 1] = void 0;
                F = 0
            }
            function l() {
                try {
                    var a = require("vertx");
                    H = a.AB || a.zB;
                    return c()
                } catch(b) {
                    return f()
                }
            }
            function m() {}
            function k(a, b, f, c) {
                try {
                    a.call(b, f, c)
                } catch(h) {
                    return h
                }
            }
            function n(a, b, f) {
                e(function(a) {
                    var c = !1,
                    h = k(f, b,
                    function(f) {
                        c || (c = !0, b !== f ? p(a, f) : u(a, f))
                    },
                    function(b) {
                        c || (c = !0, r(a, b))
                    }); ! c && h && (c = !0, r(a, h))
                },
                a)
            }
            function q(a, b) {
                1 === b.Fa ? u(a, b.Na) : 2 === b.Fa ? r(a, b.Na) : z(b, void 0,
                function(b) {
                    p(a, b)
                },
                function(b) {
                    r(a, b)
                })
            }
            function p(a, b) {
                if (a === b) r(a, new TypeError("You cannot resolve a promise with itself"));
                else if ("function" === typeof b || "object" === typeof b && null !== b) if (b.constructor === a.constructor) q(a, b);
                else {
                    var f;
                    try {
                        f = b.then
                    } catch(c) {
                        J.error = c,
                        f = J
                    }
                    f === J ? r(a, J.error) : void 0 === f ? u(a, b) : g(f) ? n(a, b, f) : u(a, b)
                } else u(a, b)
            }
            function t(a) {
                a.xk && a.xk(a.Na);
                x(a)
            }
            function u(a, b) {
                void 0 === a.Fa && (a.Na = b, a.Fa = 1, 0 !== a.Zh.length && e(x, a))
            }
            function r(a, b) {
                void 0 === a.Fa && (a.Fa = 2, a.Na = b, e(t, a))
            }
            function z(a, b, f, c) {
                var h = a.Zh,
                d = h.length;
                a.xk = null;
                h[d] = b;
                h[d + 1] = f;
                h[d + 2] = c;
                0 === d && a.Fa && e(x, a)
            }
            function x(a) {
                var b = a.Zh,
                f = a.Fa;
                if (0 !== b.length) {
                    for (var c, h, d = a.Na,
                    l = 0; l < b.length; l += 3) c = b[l],
                    h = b[l + f],
                    c ? B(f, c, h, d) : h(d);
                    a.Zh.length = 0
                }
            }
            function D() {
                this.error = null
            }
            function B(a, b, f, c) {
                var h = g(f),
                d,
                l,
                k,
                n;
                if (h) {
                    try {
                        d = f(c)
                    } catch(e) {
                        M.error = e,
                        d = M
                    }
                    d === M ? (n = !0, l = d.error, d = null) : k = !0;
                    if (b === d) {
                        r(b, new TypeError("A promises callback cannot return that same promise."));
                        return
                    }
                } else d = c,
                k = !0;
                void 0 === b.Fa && (h && k ? p(b, d) : n ? r(b, l) : 1 === a ? u(b, d) : 2 === a && r(b, d))
            }
            function v(a, b) {
                try {
                    b(function(b) {
                        p(a, b)
                    },
                    function(b) {
                        r(a, b)
                    })
                } catch(f) {
                    r(a, f)
                }
            }
            function y(a, b) {
                this.xt = a;
                this.Gf = new a(m);
                this.Ft(b) ? (this.wt = b, this.Xh = this.length = b.length, this.vt(), 0 === this.length ? u(this.Gf, this.Na) : (this.length = this.length || 0, this.tt(), 0 === this.Xh && u(this.Gf, this.Na))) : r(this.Gf, this.Gt())
            }
            function C(a) {
                this.Zc = K++;
                this.Na = this.Fa = void 0;
                this.Zh = [];
                if (m !== a) {
                    if (!g(a)) throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
                    if (! (this instanceof C)) throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
                    v(this, a)
                }
            }
            var N = Array.isArray ? Array.isArray: function(a) {
                return "[object Array]" === Object.prototype.toString.call(a)
            },
            F = 0,
            H,
            w,
            A = "undefined" !== typeof window ? window: void 0,
            E = A || {},
            I = E.MutationObserver || E.WebKitMutationObserver,
            E = "undefined" !== typeof Uint8ClampedArray && "undefined" !== typeof importScripts && "undefined" !== typeof MessageChannel,
            G = Array(1E3),
            L;
            L = "undefined" !== typeof process && "[object process]" === {}.toString.call(process) ? d() : I ? b() : E ? h() : void 0 === A && "function" === typeof require ? l() : f();
            var J = new D,
            M = new D;
            y.prototype.Ft = function(a) {
                return N(a)
            };
            y.prototype.Gt = function() {
                return Error("Array Methods must be provided an Array")
            };
            y.prototype.vt = function() {
                this.Na = Array(this.length)
            };
            y.prototype.tt = function() {
                for (var a = this.length,
                b = this.Gf,
                f = this.wt,
                c = 0; void 0 === b.Fa && c < a; c++) this.st(f[c], c)
            };
            y.prototype.st = function(a, b) {
                var f = this.xt;
                "object" === typeof a && null !== a ? a.constructor === f && void 0 !== a.Fa ? (a.xk = null, this.yk(a.Fa, b, a.Na)) : this.Ht(f.resolve(a), b) : (this.Xh--, this.Na[b] = a)
            };
            y.prototype.yk = function(a, b, f) {
                var c = this.Gf;
                void 0 === c.Fa && (this.Xh--, 2 === a ? r(c, f) : this.Na[b] = f);
                0 === this.Xh && u(c, this.Na)
            };
            y.prototype.Ht = function(a, b) {
                var f = this;
                z(a, void 0,
                function(a) {
                    f.yk(1, b, a)
                },
                function(a) {
                    f.yk(2, b, a)
                })
            };
            var K = 0;
            C.all = function(a) {
                return (new y(this, a)).Gf
            };
            C.race = function(a) {
                function b(a) {
                    p(c, a)
                }
                function f(a) {
                    r(c, a)
                }
                var c = new this(m);
                if (!N(a)) return r(c, new TypeError("You must pass an array to race.")),
                c;
                for (var h = a.length,
                d = 0; void 0 === c.Fa && d < h; d++) z(this.resolve(a[d]), void 0, b, f);
                return c
            };
            C.resolve = function(a) {
                if (a && "object" === typeof a && a.constructor === this) return a;
                var b = new this(m);
                p(b, a);
                return b
            };
            C.reject = function(a) {
                var b = new this(m);
                r(b, a);
                return b
            };
            C.mB = function(a) {
                w = a
            };
            C.lB = function(a) {
                e = a
            };
            C.jB = e;
            C.prototype = {
                constructor: C,
                then: function(a, b) {
                    var f = this.Fa;
                    if (1 === f && !a || 2 === f && !b) return this;
                    var c = new this.constructor(m),
                    h = this.Na;
                    if (f) {
                        var d = arguments[f - 1];
                        e(function() {
                            B(f, c, d, h)
                        })
                    } else z(this, c, a, b);
                    return c
                },
                "catch": function(a) {
                    return this.then(null, a)
                }
            }; (function() {
                var a;
                if ("undefined" !== typeof global) a = global;
                else if ("undefined" !== typeof self) a = self;
                else try {
                    a = Function("return this")()
                } catch(b) {
                    throw Error("polyfill failed because global object is unavailable in this environment");
                }
                var f = a.Promise;
                if (!f || "[object Promise]" !== Object.prototype.toString.call(f.resolve()) || f.pB) C.all = C.all,
                C.race = C.race,
                C.reject = C.reject,
                C.resolve = C.resolve,
                C.prototype.constructor = C.prototype.constructor,
                C.prototype.then = C.prototype.then,
                a.Promise = C
            })()
        }.call(this);
        return Promise
    });
    define("Global", ["EnvironmentStatus", "Environment", "Promise"],
    function(e, g) {
        var d = {
            Xs: e,
            toString: function() {
                return "[Lightstreamer " + this.yB + " client version " + this.version + " build " + this.build + "]"
            },
            ia: function(c, b, h, f) {
                c = (f || "_") + c;
                this[c] || (this[c] = {});
                this[c][b] = h;
                return "Lightstreamer." + c + "." + b
            },
            Pi: function(c, b, h) {
                c = (h || "_") + c;
                return this[c] && this[c][b]
            },
            bq: function(c, b, h) {
                c = (h || "_") + c;
                return this[c] ? this[c][b] : null
            },
            mi: function(c, b, h) {
                c = (h || "_") + c;
                if (this[c] && this[c][b]) {
                    delete this[c][b];
                    for (var f in this[c]) return;
                    delete this[c]
                }
            },
            ou: function(c, b) {
                var h = (b || "_") + c;
                this[h] && delete this[h]
            },
            bj: {},
            Pt: function(c, b) {
                var h = this.bj;
                h[c] || (h[c] = []);
                h[c].push(b)
            },
            gz: function(c, b) {
                var h = this.bj[c];
                if (h) {
                    for (var f = 0; f < h.length; f++) h[f] == b && h.splice(f, 1);
                    0 == h.length && delete h[c]
                }
            },
            rq: function(c) {
                return this.bj[c] && (c = this.bj[c]) && 0 < c.length ? c[0] : null
            }
        };
        g.isBrowserDocument() && (window.OpenAjax && OpenAjax.hub && OpenAjax.hub.registerLibrary("Lightstreamer", "http://www.lightstreamer.com/", d.version), window.Lightstreamer = d);
        d.library = "javascript";
        d.version = "7.0.2";
        d.build = "1710";
        return d
    });
    define("Executor", ["Helpers", "EnvironmentStatus", "Environment"],
    function(e, g, d) {
        function c() {}
        function b(a, b) {
            return a.time === b.time ? a.Nm - b.Nm: a.time - b.time
        }
        function h() {
            z = !1;
            a()
        }
        function f() {
            if (p) clearInterval(p);
            else if (d.isBrowserDocument() && "undefined" != typeof postMessage) {
                r = function() {
                    window.postMessage("Lightstreamer.run", u)
                };
                var b = function(a) { ("Lightstreamer.run" == a.data && "*" == u || a.origin == u) && h()
                };
                e.addEvent(window, "message", b);
                z || (z = !0, r());
                0 == z && (e.removeEvent(window, "message", b), r = c)
            } else d.isNodeJS() && "undefined" != typeof process && process.nextTick && (r = function() {
                process.nextTick(h)
            });
            p = setInterval(a, 50)
        }
        function a() {
            if (g.Kh) clearInterval(p);
            else {
                k = e.getTimeStamp();
                if (0 < m.length) {
                    l && (m.sort(b), l = !1);
                    for (var a; 0 < m.length && m[0].time <= k && !g.Kh;) a = m.shift(),
                    a.Te && (x.executeTask(a), a.step && q.push(a))
                }
                for (0 >= m.length && (t = 0); 0 < q.length;) a = q.shift(),
                a.step && (a.Nm = t++, x.addPackedTimedTask(a, a.step, !0));
                k >= n && (n = k + 108E5, m = [].concat(m))
            }
        }
        var l = !1,
        m = [],
        k = e.getTimeStamp(),
        n = k + 108E5,
        q = [],
        p = null,
        t = 0,
        u = !d.isBrowserDocument() || "http:" != document.location.protocol && "https:" != document.location.protocol ? "*": document.location.protocol + "//" + document.location.hostname + (document.location.port ? ":" + document.location.port: ""),
        r = c,
        z = !1,
        x = {
            toString: function() {
                return ["[", "Executor", 50, m.length, "]"].join("|")
            },
            getQueueLength: function() {
                return m.length
            },
            packTask: function(a, b, c) {
                return {
                    Te: a,
                    context: b || null,
                    Mb: c || null,
                    Nm: t++
                }
            },
            addPackedTimedTask: function(a, b, c) {
                a.step = c ? b: null;
                a.time = k + parseInt(b);
                if (isNaN(a.time)) try {
                    throw Error();
                } catch(d) {
                    throw a = "Executor error for time: " + b,
                    d.stack && (a += " " + d.stack),
                    a;
                }
                m.push(a);
                l = !0
            },
            addRepetitiveTask: function(a, b, c, d) {
                return this.addTimedTask(a, b, c, d, !0)
            },
            stopRepetitiveTask: function(a) {
                a && (a.Te = null, a.step = null)
            },
            addTimedTask: function(a, b, c, d, f) {
                a = this.packTask(a, c, d);
                this.addPackedTimedTask(a, b, f);
                0 != b || z || (z = !0, r());
                return a
            },
            modifyTaskParam: function(a, b, c) {
                a.Mb[b] = c
            },
            modifyAllTaskParams: function(a, b) {
                a.Mb = b
            },
            delayTask: function(a, b) {
                a.time += b;
                l = !0
            },
            executeTask: function(a, b) {
                try {
                    var c = b || a.Mb;
                    a.context ? c ? a.Te.apply(a.context, c) : a.Te.apply(a.context) : c ? a.Te.apply(null, c) : a.Te()
                } catch(d) {}
            }
        };
        d.isWebWorker() ? setTimeout(f, 1) : f();
        x.getQueueLength = x.getQueueLength;
        x.packTask = x.packTask;
        x.addPackedTimedTask = x.addPackedTimedTask;
        x.addRepetitiveTask = x.addRepetitiveTask;
        x.stopRepetitiveTask = x.stopRepetitiveTask;
        x.addTimedTask = x.addTimedTask;
        x.modifyTaskParam = x.modifyTaskParam;
        x.modifyAllTaskParams = x.modifyAllTaskParams;
        x.delayTask = x.delayTask;
        x.executeTask = x.executeTask;
        return x
    });
    define("LoggerProxy", ["Helpers"],
    function(e) {
        function g(b) {
            this.on(b)
        }
        function d() {
            return ! 1
        }
        var c = {
            error: d,
            warn: d,
            info: d,
            debug: d,
            fatal: d,
            isDebugEnabled: d,
            isInfoEnabled: d,
            isWarnEnabled: d,
            isErrorEnabled: d,
            isFatalEnabled: d
        };
        g.prototype = {
            on: function(b) {
                this.Ma = b || c
            },
            logFatal: function(b) {
                this.ax() && (b += this.Yd(arguments, 1), this.fatal(b))
            },
            fatal: function(b, c) {
                this.Ma.fatal(b, c)
            },
            ax: function() {
                return ! this.Ma.isFatalEnabled || this.Ma.isFatalEnabled()
            },
            logError: function(b) {
                this.Fq() && (b += this.Yd(arguments, 1), this.error(b))
            },
            logErrorExc: function(b, c) {
                this.Fq() && (c += this.Yd(arguments, 2), this.error(c, b))
            },
            error: function(b, c) {
                this.Ma.error(b, c)
            },
            Fq: function() {
                return ! this.Ma.isErrorEnabled || this.Ma.isErrorEnabled()
            },
            logWarn: function(b) {
                this.vx() && (b += this.Yd(arguments, 1), this.warn(b))
            },
            warn: function(b, c) {
                this.Ma.warn(b, c)
            },
            vx: function() {
                return ! this.Ma.isWarnEnabled || this.Ma.isWarnEnabled()
            },
            logInfo: function(b) {
                this.isInfoLogEnabled() && (b += this.Yd(arguments, 1), this.info(b))
            },
            info: function(b, c) {
                this.Ma.info(b, c)
            },
            isInfoLogEnabled: function() {
                return ! this.Ma.isInfoEnabled || this.Ma.isInfoEnabled()
            },
            logDebug: function(b) {
                this.isDebugLogEnabled() && (b += this.Yd(arguments, 1), this.debug(b))
            },
            debug: function(b, c) {
                this.Ma.debug(b, c)
            },
            isDebugLogEnabled: function() {
                return ! this.Ma.isDebugEnabled || this.Ma.isDebugEnabled()
            },
            Yd: function(b, c) {
                for (var d = " {",
                a = c ? c: 0; a < b.length; a++) try {
                    var g = b[a];
                    null === g ? d += "NULL": 0 > g.length ? d += "*": null != g.charAt ? d += g: g.message ? (d += g.message, g.stack && (d += "\n" + g.stack + "\n")) : g[0] == g ? d += g: e.isArray(g) ? (d += "(", d += this.Yd(g), d += ")") : d += g;
                    d += " "
                } catch(m) {
                    d += "missing-parameter "
                }
                return d + "}"
            }
        };
        g.prototype.debug = g.prototype.debug;
        g.prototype.isDebugLogEnabled = g.prototype.isDebugLogEnabled;
        g.prototype.logDebug = g.prototype.logDebug;
        g.prototype.info = g.prototype.info;
        g.prototype.isInfoLogEnabled = g.prototype.isInfoLogEnabled;
        g.prototype.logInfo = g.prototype.logInfo;
        g.prototype.warn = g.prototype.warn;
        g.prototype.isWarnEnabled = g.prototype.isWarnEnabled;
        g.prototype.logWarn = g.prototype.logWarn;
        g.prototype.error = g.prototype.error;
        g.prototype.isErrorEnabled = g.prototype.isErrorEnabled;
        g.prototype.logError = g.prototype.logError;
        g.prototype.logErrorExc = g.prototype.logErrorExc;
        g.prototype.fatal = g.prototype.fatal;
        g.prototype.isFatalEnabled = g.prototype.isFatalEnabled;
        g.prototype.logFatal = g.prototype.logFatal;
        return g
    });
    define("IllegalArgumentException", [],
    function() {
        function e(e) {
            this.name = "IllegalArgumentException";
            this.message = e
        }
        e.prototype = {
            toString: function() {
                return ["[", this.name, this.message, "]"].join("|")
            }
        };
        return e
    });
    define("LoggerManager", ["LoggerProxy", "IllegalArgumentException"],
    function(e, g) {
        var d = {},
        c = null,
        b = {
            setLoggerProvider: function(b) {
                if (b && !b.getLogger) throw new g("The given object is not a LoggerProvider");
                c = b;
                for (var f in d) c ? d[f].on(c.getLogger(f)) : d[f].on(null)
            },
            getLoggerProxy: function(b) {
                d[b] || (d[b] = c ? new e(c.getLogger(b)) : new e);
                return d[b]
            },
            resolve: function(b) {
                return b
            }
        };
        b.setLoggerProvider = b.setLoggerProvider;
        b.getLoggerProxy = b.getLoggerProxy;
        b.resolve = b.resolve;
        return b
    });
    define("lscAe", ["Environment"],
    function(e) {
        return {
            ve: 1E3,
            lo: 200,
            kt: 1E4,
            ct: 1,
            Rh: 0,
            eB: 2,
            Zn: 3,
            ko: 4,
            Yn: 5,
            Vb: "N",
            Zs: 200,
            jo: "MAIN",
            Sh: "wbridge",
            Oh: "fbridge",
            ht: 1,
            gt: 2,
            jk: "1710",
            $f: !e.isBrowserDocument() || "http:" != document.location.protocol && "https:" != document.location.protocol ? "file:": document.location.protocol,
            Za: "lightstreamer.stream",
            ue: "lightstreamer.protocol",
            Cd: "lightstreamer.session",
            cg: "lightstreamer.subscriptions",
            hk: "lightstreamer.actions",
            Dd: "lightstreamer.sharing",
            ho: "lightstreamer.flash",
            hB: "lightstreamer.stats",
            Ed: "Lightstreamer_",
            nk: "lightstreamer",
            rc: "UNORDERED_MESSAGES",
            xe: {
                length: -1,
                toString: function() {
                    return "[UNCHANGED]"
                }
            },
            CONNECTING: "CONNECTING",
            Ea: "CONNECTED:",
            bg: "STREAM-SENSING",
            eg: "WS-STREAMING",
            se: "HTTP-STREAMING",
            we: "STALLED",
            ye: "WS-POLLING",
            Xc: "HTTP-POLLING",
            Ub: "DISCONNECTED",
            dg: "DISCONNECTED:WILL-RETRY",
            tk: "WS",
            Ph: "HTTP",
            qk: "RAW",
            lk: "DISTINCT",
            Yf: "COMMAND",
            pk: "MERGE",
            Qh: "MASTER"
        }
    });
    define("lscAi", ["Environment", "lscAe", "Helpers"],
    function(e, g, d) {
        var c = RegExp("\\.", "g"),
        b = RegExp("-", "g"),
        h = {
            ".": !0,
            " ": !0,
            0 : !0
        },
        f = {
            Hq: function() {
                return e.isBrowser() ? !1 === navigator.onLine: !1
            },
            Qo: function() {
                try {
                    return "undefined" != typeof localStorage && null !== localStorage && localStorage.getItem && localStorage.setItem ? (localStorage.setItem("__canUseLocalStorage_test__", "true"), localStorage.removeItem("__canUseLocalStorage_test__"), !0) : !1
                } catch(a) {
                    return ! 1
                }
            },
            Ec: function() {
                try {
                    return document.domain
                } catch(a) {
                    return ""
                }
            },
            $l: function() {
                if (!e.isBrowserDocument()) return ! 0;
                try {
                    return - 1 < document.location.host.indexOf("[") ? !0 : f.Ec() == document.location.hostname
                } catch(a) {
                    return ! 1
                }
            },
            dc: function(a) {
                if ("undefined" != typeof a) {
                    if (!0 === a || !1 === a) return ! 0 === a;
                    if (null != a) {
                        if (isNaN(a) || "" === a) {
                            if (d.isArray(a)) {
                                for (var b = [], f = 0; f < a.length; f++) b[f] = this.dc(a[f]);
                                return b
                            }
                            if ((a || "" == a) && ("string" === typeof a || a instanceof String)) return a.toString();
                            if ( - 1 === a.length) return g.xe;
                            if (isNaN(a) && "number" === typeof a) return NaN;
                            b = {};
                            for (f in a) b[this.dc(f)] = this.dc(a[f]);
                            return b
                        }
                        return (f = a.charAt ? a.charAt(0) in h: !1) && a.toString ? "0" === f && 1 == a.length ? "0": a.toString() : a == Math.round(a) ? parseInt(a) : parseFloat(a, 10)
                    }
                }
                return null
            },
            lj: function(a) {
                return require.lj ? require.lj(a) : require(a)
            },
            sa: function(a, b) {
                a = a || {};
                if (b) for (var f in b) a[f] = b[f];
                return a
            },
            Hj: function(a) {
                return a.replace(c, "_").replace(b, "__")
            },
            getReverse: function(a) {
                var b = {},
                f;
                for (f in a) b[a[f]] = f;
                return b
            },
            ci: function(a) {
                if (a && !a.pop) {
                    for (var b = [], f = 0; f < a.length; f++) b.push(a[f]);
                    return b
                }
                return a
            }
        };
        return f
    });
    define("Inheritance", ["IllegalStateException"],
    function(e) {
        function g(c, b, d) {
            if (b) return d ? b.apply(c, d) : b.apply(c)
        }
        var d = {
            dt: function(c, b, g, f) {
                for (var a in b.prototype) if (!c.prototype[a]) c.prototype[a] = b.prototype[a];
                else if (f) {
                    var l;
                    a: {
                        l = b.prototype;
                        var m = void 0;
                        for (m in l) if (l[a] == l[m] && a != m) {
                            l = m;
                            break a
                        }
                        l = null
                    }
                    if (l) {
                        if (c.prototype[l] && c.prototype[l] !== c.prototype[a] && b.prototype[l] !== b.prototype[l]) throw new e("Can't solve alias collision, try to minify the classes again (" + l + ", " + a + ")");
                        c.prototype[l] = c.prototype[a]
                    }
                }
                g || (c.prototype._super_ = b, c.prototype._callSuperConstructor = d._callSuperConstructor, c.prototype._callSuperMethod = d._callSuperMethod);
                return c
            },
            _callSuperMethod: function(c, b, d) {
                return g(this, c.prototype._super_.prototype[b], d)
            },
            _callSuperConstructor: function(c, b) {
                g(this, c.prototype._super_, b)
            }
        };
        return d.dt
    });
    define("Setter", ["IllegalArgumentException"],
    function(e) {
        function g() {}
        g.prototype.checkPositiveNumber = function(d, c, b) {
            var g = new Number(d);
            if (isNaN(g)) throw new e("The given value is not valid. Use a number");
            if (!b && g != Math.round(g)) throw new e("The given value is not valid. Use an integer");
            if (c) {
                if (0 > d) throw new e("The given value is not valid. Use a positive number or 0");
            } else if (0 >= d) throw new e("The given value is not valid. Use a positive number");
            return g
        };
        g.prototype.checkBool = function(d, c) {
            if (!0 === d || !1 === d || c && !d) return ! 0 === d;
            throw new e("The given value is not valid. Use true or false");
        };
        return g
    });
    define("lscA", ["LoggerManager", "lscAi", "Inheritance", "Setter", "lscAe"],
    function(e, g, d, c, b) {
        function h(a) {
            this.V = "lscA";
            this.parent = null;
            this.Lo = !1;
            a && this.Bu(a)
        }
        var f = e.getLoggerProxy(b.hk),
        a = e.getLoggerProxy(b.Dd);
        h.prototype = {
            Li: function(a) {
                return this.Vf[a]
            },
            S: function(a, b) {
                var c = this.Li(a),
                h = this[c];
                this[c] = g.dc(b);
                f.logDebug(e.resolve(1), this.parent, a, this.Oi(c));
                this.parent && this.Lo && this.Ee(a);
                h != this[c] && this.fr(a)
            },
            Oi: function(a) {
                return this.up && this.up[a] ? "[...]": this[a]
            },
            G: function(a, b) {
                var c = this.Li(a);
                b != this[c] && (this[c] = b, f.logInfo(e.resolve(0), a, this.Oi(c)), this.Ee(a), this.fr(a))
            },
            Mf: function(a, b) {
                this.parent = a;
                this.Lo = b
            },
            Ee: function(b) {
                var f = this.Li(b);
                a.logDebug(e.resolve(2), b, this.Oi(f));
                return this.parent && this.parent.Ee && !this.parent.Ee(this.V, b, g.dc(this[f])) ? !1 : !0
            },
            fr: function(a) {
                var b = this.Li(a); ! this.parent || !this.parent.hr || this.dr && this.dr[b] || (f.logDebug(e.resolve(3), a, this.Oi(b)), this.parent.hr(a, this))
            },
            Bu: function(a) {
                var b = this.Vf,
                f;
                for (f in b) this.S(f, a[b[f]])
            },
            Ll: function(a) {
                for (var b in this.Vf) a(b, this[this.Vf[b]])
            }
        };
        d(h, c, !1, !0);
        return h
    });
    define("lscC", ["lscA", "Inheritance", "lscAi"],
    function(e, g, d) {
        function c(f) {
            this.ug = !1;
            this.cd = 0;
            this.dr = b;
            this.Vf = h;
            this._callSuperConstructor(c, arguments);
            this.V = "lscC"
        }
        var b = {},
        h = {
            ug: "connectionRequested",
            cd: "clientsCount"
        },
        h = d.getReverse(h);
        c.prototype = {};
        g(c, e);
        return c
    });
    define("lscE", "IllegalArgumentException lscAe lscA Inheritance Global Environment lscAi".split(" "),
    function(e, g, d, c, b, h, f) {
        function a() {
            this.ll = 2E6;
            this.Ti = 19E3;
            this.ie = this.Jc = this.jf = 0;
            this.od = 3E3;
            this.Xj = 2E3;
            this.He = 0;
            this.Ke = 4E3;
            this.Ej = 5E3;
            this.Jl = 100;
            this.sn = !0;
            this.Nl = null;
            this.lp = this.jn = !1;
            this.Nb = 0;
            this.xl = !0;
            this.tn = 5E3;
            this.Qg = this.Wj = null;
            this.Si = !1;
            this.pi = this.Tn = !0;
            this.Ci = 2E3;
            this.Cn = 4E3;
            this.Vf = m;
            this._callSuperConstructor(a, arguments);
            this.V = "lscE"
        }
        var l = {};
        l[g.se] = !0;
        l[g.ye] = !0;
        l[g.Xc] = !0;
        l[g.eg] = !0;
        l[g.tk] = !0;
        l[g.Ph] = !0;
        var m = {
            ll: "contentLength",
            Ti: "idleTimeout",
            jf: "keepaliveInterval",
            Jc: "maxBandwidth",
            ie: "pollingInterval",
            od: "reconnectTimeout",
            Xj: "stalledTimeout",
            Ke: "currentConnectTimeout",
            He: "connectTimeout",
            Ej: "retryDelay",
            Jl: "firstRetryMaxDelay",
            sn: "slowingEnabled",
            Nl: "forcedTransport",
            jn: "serverInstanceAddressIgnored",
            lp: "cookieHandlingRequired",
            Nb: "reverseHeartbeatInterval",
            xl: "earlyWSOpenEnabled",
            tn: "spinFixTimeout",
            Wj: "spinFixEnabled",
            Tn: "xDomainStreamingEnabled",
            pi: "corsXHREnabled",
            Ci: "forceBindTimeout",
            Cn: "switchCheckTimeout",
            Qg: "httpExtraHeaders",
            Si: "httpExtraHeadersOnSessionCreationOnly"
        },
        m = f.getReverse(m);
        a.prototype = {
            Hz: function(a) {
                this.G("contentLength", this.checkPositiveNumber(a))
            },
            Jv: function() {
                return this.ll
            },
            us: function(a) {
                this.G("idleTimeout", this.checkPositiveNumber(a, !0))
            },
            eq: function() {
                return this.Ti
            },
            ws: function(a) {
                this.G("keepaliveInterval", this.checkPositiveNumber(a, !0))
            },
            fq: function() {
                return this.jf
            },
            Sz: function(a) {
                a = "unlimited" == (new String(a)).toLowerCase() ? 0 : this.checkPositiveNumber(a, !1, !0);
                this.G("maxBandwidth", a)
            },
            $v: function() {
                return 0 >= this.Jc ? "unlimited": this.Jc
            },
            xs: function(a) {
                this.G("pollingInterval", this.checkPositiveNumber(a, !0))
            },
            mq: function() {
                return this.ie
            },
            kw: function() {
                return this.od
            },
            hA: function(a) {
                this.G("stalledTimeout", this.checkPositiveNumber(a))
            },
            tq: function() {
                return this.Xj
            },
            Fz: function(a) {
                "auto" == a ? (this.G("connectTimeout", 0), a = 4E3) : this.G("connectTimeout", this.checkPositiveNumber(a));
                this.qs(a)
            },
            Gv: function() {
                return 0 == this.He ? "auto": this.He
            },
            qs: function(a) {
                0 != this.He && a != this.He || this.G("currentConnectTimeout", this.checkPositiveNumber(a))
            },
            Tp: function() {
                return this.Ke
            },
            ys: function(a) {
                this.G("retryDelay", this.checkPositiveNumber(a))
            },
            oq: function() {
                return this.Ej
            },
            Lz: function(a) {
                this.G("firstRetryMaxDelay", this.checkPositiveNumber(a))
            },
            Qv: function() {
                return this.Jl
            },
            dA: function(a) {
                this.G("slowingEnabled", this.checkBool(a))
            },
            nx: function() {
                return this.sn
            },
            Nz: function(a) {
                if (null !== a && !l[a]) throw new e("The given value is not valid. Use one of: HTTP-STREAMING, HTTP-POLLING, WS-STREAMING, WS-POLLING, WS, HTTP or null");
                this.G("forcedTransport", a)
            },
            Vv: function() {
                return this.Nl
            },
            aA: function(a) {
                this.G("serverInstanceAddressIgnored", this.checkBool(a))
            },
            mx: function() {
                return this.jn
            },
            Iz: function(a) {
                if (a && !h.isBrowser() && !h.isNodeJS()) throw new e("cookieHandlingRequired is only supported on Browsers");
                this.G("cookieHandlingRequired", this.checkBool(a))
            },
            Ib: function() {
                return this.lp
            },
            Kz: function(a) {
                this.G("earlyWSOpenEnabled", this.checkBool(a))
            },
            $w: function() {
                return this.xl
            },
            zs: function(a) {
                this.G("reverseHeartbeatInterval", this.checkPositiveNumber(a, !0))
            },
            pq: function() {
                return this.Nb
            },
            Oz: function(a) {
                if (a) {
                    var b = "",
                    f;
                    for (f in a) b += f + "\n" + a[f] + "\n";
                    this.G("httpExtraHeaders", b)
                } else this.G("httpExtraHeaders", null)
            },
            cq: function() {
                if (!this.Qg) return this.Qg;
                for (var a = {},
                b = this.Qg.split("\n"), f = 0; f < b.length - 1; f += 2) a[b[f]] = b[f + 1];
                return a
            },
            Pz: function(a) {
                this.G("httpExtraHeadersOnSessionCreationOnly", this.checkBool(a))
            },
            cx: function() {
                return this.Si
            },
            Pg: function(a) {
                return this.Qg ? a ? !0 : !this.Si: !1
            },
            Eg: function(a) {
                return ! a && this.Si ? null: this.cq()
            },
            lA: function(a) {
                this.G("xDomainStreamingEnabled", this.checkBool(a))
            },
            wx: function() {
                return this.Tn
            },
            Jz: function(a) {
                this.G("corsXHREnabled", this.checkBool(a))
            },
            Yw: function() {
                return this.pi
            },
            Mz: function(a) {
                this.G("forceBindTimeout", this.checkPositiveNumber(a))
            },
            Tv: function() {
                return this.Ci
            },
            iA: function(a) {
                this.G("switchCheckTimeout", this.checkPositiveNumber(a))
            },
            xw: function() {
                return this.Cn
            },
            gA: function(a) {
                this.G("spinFixTimeout", this.checkPositiveNumber(a))
            },
            vw: function() {
                return this.tn
            },
            fA: function(a) {
                this.G("spinFixTimeout", null === this.kB ? null: this.checkBool(a))
            },
            uw: function() {
                return this.Wj
            },
            Dq: function() {
                return 0 == this.He
            },
            Lw: function() {
                if (this.Dq()) {
                    var a = this.Tp() + 2E3;
                    14E3 < a ? this.Zr() : this.S("currentConnectTimeout", a)
                }
            },
            Zr: function() {
                this.Dq() && this.S("currentConnectTimeout", 4E3)
            }
        };
        a.prototype.setContentLength = a.prototype.Hz;
        a.prototype.getContentLength = a.prototype.Jv;
        a.prototype.setIdleTimeout = a.prototype.us;
        a.prototype.getIdleTimeout = a.prototype.eq;
        a.prototype.setKeepaliveInterval = a.prototype.ws;
        a.prototype.getKeepaliveInterval = a.prototype.fq;
        a.prototype.setMaxBandwidth = a.prototype.Sz;
        a.prototype.getMaxBandwidth = a.prototype.$v;
        a.prototype.setPollingInterval = a.prototype.xs;
        a.prototype.getPollingInterval = a.prototype.mq;
        a.prototype.setReconnectTimeout = a.prototype.tq;
        a.prototype.getReconnectTimeout = a.prototype.kw;
        a.prototype.setStalledTimeout = a.prototype.hA;
        a.prototype.getStalledTimeout = a.prototype.tq;
        a.prototype.setConnectTimeout = a.prototype.Fz;
        a.prototype.getConnectTimeout = a.prototype.Gv;
        a.prototype.setCurrentConnectTimeout = a.prototype.qs;
        a.prototype.getCurrentConnectTimeout = a.prototype.Tp;
        a.prototype.setRetryDelay = a.prototype.ys;
        a.prototype.getRetryDelay = a.prototype.oq;
        a.prototype.setFirstRetryMaxDelay = a.prototype.Lz;
        a.prototype.getFirstRetryMaxDelay = a.prototype.Qv;
        a.prototype.setSlowingEnabled = a.prototype.dA;
        a.prototype.isSlowingEnabled = a.prototype.nx;
        a.prototype.setForcedTransport = a.prototype.Nz;
        a.prototype.getForcedTransport = a.prototype.Vv;
        a.prototype.setServerInstanceAddressIgnored = a.prototype.aA;
        a.prototype.isServerInstanceAddressIgnored = a.prototype.mx;
        a.prototype.setCookieHandlingRequired = a.prototype.Iz;
        a.prototype.isCookieHandlingRequired = a.prototype.Ib;
        a.prototype.setEarlyWSOpenEnabled = a.prototype.Kz;
        a.prototype.isEarlyWSOpenEnabled = a.prototype.$w;
        a.prototype.setReverseHeartbeatInterval = a.prototype.zs;
        a.prototype.getReverseHeartbeatInterval = a.prototype.pq;
        a.prototype.setHttpExtraHeaders = a.prototype.Oz;
        a.prototype.getHttpExtraHeaders = a.prototype.cq;
        a.prototype.setHttpExtraHeadersOnSessionCreationOnly = a.prototype.Pz;
        a.prototype.isHttpExtraHeadersOnSessionCreationOnly = a.prototype.cx;
        a.prototype.setXDomainStreamingEnabled = a.prototype.lA;
        a.prototype.isXDomainStreamingEnabled = a.prototype.wx;
        a.prototype.setCorsXHREnabled = a.prototype.Jz;
        a.prototype.isCorsXHREnabled = a.prototype.Yw;
        a.prototype.setForceBindTimeout = a.prototype.Mz;
        a.prototype.getForceBindTimeout = a.prototype.Tv;
        a.prototype.setSwitchCheckTimeout = a.prototype.iA;
        a.prototype.getSwitchCheckTimeout = a.prototype.xw;
        a.prototype.setSpinFixTimeout = a.prototype.gA;
        a.prototype.getSpinFixTimeout = a.prototype.vw;
        a.prototype.setSpinFixEnabled = a.prototype.fA;
        a.prototype.getSpinFixEnabled = a.prototype.uw;
        a.prototype.setRetryTimeout = a.prototype.ys;
        a.prototype.getRetryTimeout = a.prototype.oq;
        a.prototype.setIdleMillis = a.prototype.us;
        a.prototype.getIdleMillis = a.prototype.eq;
        a.prototype.setKeepaliveMillis = a.prototype.ws;
        a.prototype.getKeepaliveMillis = a.prototype.fq;
        a.prototype.setPollingMillis = a.prototype.xs;
        a.prototype.getPollingMillis = a.prototype.mq;
        a.prototype.setReverseHeartbeatMillis = a.prototype.zs;
        a.prototype.getReverseHeartbeatMillis = a.prototype.pq;
        c(a, d);
        return a
    });
    define("lscAf", [],
    function() {
        return {
            uB: function() {
                var e = 3,
                g, d = 6,
                c = "",
                b;
                b = "document".toString();
                var h = 0;
                g = b.length;
                for (var f = 0; f < g; f++) h += b.charCodeAt(f);
                b = parseInt(h);
                if (0 < b) for (h = 0; 184 >= d + e - h; h += 3) g = h,
                g = parseInt("2844232422362353182342452312352492633183053182412392513042362492412532492362342352342462472452423042312312313182482393182292342362492382392362383182422532332342512492422422492342402770".substring(h, e - 1)) - parseInt("2844232422362353182342452312352492633183053182412392513042362492412532492362342352342462472452423042312312313182482393182292342362492382392362383182422532332342512492422422492342402770".substring(g, g + 2)) + 350 - parseInt("2844232422362353182342452312352492633183053182412392513042362492412532492362342352342462472452423042312312313182482393182292342362492382392362383182422532332342512492422422492342402770".substring(d, d + e - h)),
                c = unescape("%" + g.toString(16)) + c,
                e += 3,
                d += 3,
                b += g;
                return c
            }
        }
    });
    define("ASSERT", ["LoggerManager"],
    function(e) {
        var g = e.getLoggerProxy("weswit.test"),
        d = 0,
        c = {},
        b = {
            VOID: c,
            getFailures: function() {
                return d
            },
            compareArrays: function(b, c, a) {
                if (b.length != c.length) return this.Bb(),
                g.logError(e.resolve(381), b, c),
                !1;
                if (a) for (d = 0; d < b.length; d++) {
                    if (b[d] != c[d]) return g.logError(e.resolve(384), b[d], c[d]),
                    this.Bb(),
                    !1
                } else {
                    a = {};
                    for (var d = 0; d < b.length; d++) a[b[d]] = 1;
                    for (d = 0; d < c.length; d++) if (a[c[d]]) a[c[d]]++;
                    else return g.logError(e.resolve(382), c[d]),
                    this.Bb(),
                    !1;
                    for (d in a) if (1 == a[d]) return g.logError(e.resolve(383), a[d]),
                    this.Bb(),
                    !1
                }
                return ! 0
            },
            verifySuccess: function(b, c, a, d, e) {
                return this.verify(b, c, a, d, !1, e)
            },
            verifyException: function(b, c, a) {
                return this.verify(b, c, a, null, !0)
            },
            verifyNotNull: function(b) {
                return null === b ? (this.Bb(), g.logError(e.resolve(385), b), !1) : !0
            },
            verifyValue: function(b, c, a) {
                var d = !1; ! 0 === a ? d = b === c: a ? d = a(b, c) : isNaN(b) ? d = b == c: (a = b && b.charAt ? b.charAt(0) : null, d = c && c.charAt ? c.charAt(0) : null, d = "." == a || " " == a || "0" == a || "." == d || " " == d || "0" == d ? String(b) == String(c) : b == c);
                return d ? !0 : (this.Bb(), g.logError(e.resolve(386), b, c), !1)
            },
            verifyDiffValue: function(b, c, a) {
                return (a ? b === c: b == c) ? (this.Bb(), g.logError(e.resolve(387), b, c), !1) : !0
            },
            verifyOk: function(b) {
                return b ? !0 : (this.Bb(), g.logError(e.resolve(388)), !1)
            },
            verifyNotOk: function(b) {
                return b ? (this.Bb(), g.logError(e.resolve(389)), !1) : !0
            },
            fail: function() {
                g.logError(e.resolve(390));
                this.Bb();
                return ! 1
            },
            Bb: function() {
                d++
            },
            verify: function(b, d, a, l, m, k) {
                var n = !1,
                q = null,
                p = null;
                try {
                    q = a !== c ? b[d].apply(b, a) : b[d]()
                } catch(t) {
                    n = !0,
                    p = t
                }
                b = m ? "succes": "failure";
                return m != n ? (this.Bb(), g.logError(e.resolve(391), b, "for", d, a, l, p), !1) : m || l === c ? !0 : this.verifyValue(q, l, k)
            }
        };
        b.getFailures = b.getFailures;
        b.fail = b.fail;
        b.verifyNotOk = b.verifyNotOk;
        b.verifyOk = b.verifyOk;
        b.verifyDiffValue = b.verifyDiffValue;
        b.verifyNotNull = b.verifyNotNull;
        b.verifyValue = b.verifyValue;
        b.verifyException = b.verifyException;
        b.verifySuccess = b.verifySuccess;
        b.compareArrays = b.compareArrays;
        return b
    });
    define("lscq", "LoggerManager lscAi lscAf Environment ASSERT lscAe".split(" "),
    function(e, g, d, c, b, h) {
        var f = e.getLoggerProxy(h.ue),
        a = /^[a-z][a-z0-9-]+$/,
        l = /^((?:[a-z][a-z.0-9-]+).(?:[a-z][a-z-]+))(?![\w.])/,
        m = /^((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))(?![d])/,
        k = /^[a-f0-9:]+$/;
        return {
            XA: function(b) {
                b = b.toLowerCase();
                var f = 0 == b.indexOf("http://") ? 7 : 0 == b.indexOf("https://") ? 8 : -1;
                if ( - 1 == f) return "The given server address has not a valid scheme";
                var c = b.lastIndexOf(":"),
                c = c > f ? c: b.length,
                h = this.Ep(b, b.indexOf("://"));
                if (null != h && isNaN(h.substring(1))) return "The given server address has not a valid port";
                h = b.indexOf("/", f);
                h = h < c ? h: c;
                if ("[" == b.charAt(f)) {
                    if (b = b.substring(f + 1, b.lastIndexOf("]")), !k.test(b)) return "The given server address is not a valid IPv6"
                } else if (b = b.substring(f, h), -1 < b.indexOf(".")) {
                    if (!l.test(b) && !m.test(b)) return "The given server address is not a valid URL"
                } else if (!a.test(b)) return "The given server address is not a valid machine name";
                return ! 0
            },
            Ep: function(a, b) {
                var f = a.indexOf(":", b + 1);
                if ( - 1 >= f) return null;
                if ( - 1 < a.indexOf("]")) {
                    f = a.indexOf("]:");
                    if ( - 1 >= f) return null;
                    f += 1
                } else if (f != a.lastIndexOf(":")) return null;
                var c = a.indexOf("/", b + 3);
                return - 1 < c ? a.substring(f, c) : a.substring(f)
            },
            vu: function(a, b) {
                var f = this.Ep(a, a.indexOf("://"));
                if (f) {
                    var c = b.indexOf("/");
                    b = -1 >= c ? b + f: b.substring(0, c) + f + b.substring(c)
                }
                b = 0 == a.toLowerCase().indexOf("https://") ? "https://" + b: "http://" + b;
                "/" != b.substr(b.length - 1) && (b += "/");
                return b
            },
            iw: function(a, h, d, l, k, r, m, x, D, B, v) {
                v = v && c.isBrowserDocument() && !g.$l() ? "LS_domain\x3d" + g.Ec() + "\x26": "";
                a = "LS_phase\x3d" + a + "\x26" + v + (x ? "LS_cause\x3d" + x + "\x26": "");
                k || r ? (a += "LS_polling\x3dtrue\x26", x = B = 0, r && (B = Number(d.ie), null == D || isNaN(D) || (B += D), x = d.Ti), isNaN(B) || (a += "LS_polling_millis\x3d" + B + "\x26"), isNaN(x) || (a += "LS_idle_millis\x3d" + x + "\x26")) : (0 < d.jf && (a += "LS_keepalive_millis\x3d" + d.jf + "\x26"), B && (a += "LS_content_length\x3d" + d.ll + "\x26"));
                if (k) return h = "",
                0 < d.Jc && (h += "LS_requested_max_bandwidth\x3d" + d.Jc + "\x26"),
                null != l.ai && (h += "LS_adapter_set\x3d" + encodeURIComponent(l.ai) + "\x26"),
                null != l.dk && (h += "LS_user\x3d" + encodeURIComponent(l.dk) + "\x26"),
                d = "LS_op2\x3dcreate\x26" + a + "LS_cid\x3dpcYgxn8m8 feOojyA1T661h3g2.pz479g6i\x26" + h,
                m && (d += "LS_old_session\x3d" + m + "\x26"),
                f.logDebug(e.resolve(6), d),
                null != l.password && (d += "LS_password\x3d" + encodeURIComponent(l.password) + "\x26"),
                d;
                b.verifyOk(h) || f.logError(e.resolve(4));
                l = "LS_session\x3d" + h + "\x26" + a;
                f.logDebug(e.resolve(5), l);
                return l
            },
            Nv: function(a, b) {
                var c = {
                    LS_op: "destroy",
                    LS_session: a
                };
                b && (c.LS_cause = b);
                f.logDebug(e.resolve(7));
                return c
            },
            Uv: function(a, b) {
                var c = {
                    LS_op: "force_rebind"
                };
                a && (c.LS_cause = a);
                null == b || isNaN(b) || (c.LS_polling_millis = b);
                f.logDebug(e.resolve(8));
                return c
            },
            Zv: function(a, b, f) {
                b.LS_build = f;
                b.LS_phase = a;
                return b
            },
            Hv: function(a) {
                return {
                    LS_op: "constrain",
                    LS_requested_max_bandwidth: 0 < a.Jc ? a.Jc: 0
                }
            },
            nq: function(a, b, c) {
                a = b || ".js" == c || "" == c ? (a ? this.Ql() + "create_session": "bind_session") + c: (a ? this.Ql() : "") + "STREAMING_IN_PROGRESS";
                f.logDebug(e.resolve(9), a);
                return a
            },
            Ql: function() {
                return ""
            }
        }
    });
    define("lscD", "IllegalArgumentException lscA Inheritance Environment Global lscq lscAi".split(" "),
    function(e, g, d, c, b, h, f) {
        function a() {
            this.rh = k;
            this.sessionId = this.ns = this.ms = this.password = this.dk = this.ai = null;
            this.up = m;
            this.Vf = l;
            this._callSuperConstructor(a, arguments);
            this.V = "lscD"
        }
        var l = {
            rh: "serverAddress",
            ai: "adapterSet",
            dk: "user",
            password: "password",
            ms: "serverInstanceAddress",
            ns: "serverSocketName",
            sessionId: "sessionId"
        },
        l = f.getReverse(l),
        m = {
            password: !0
        },
        k = !c.isBrowser() || "http:" != location.protocol && "https:" != location.protocol ? null: location.protocol + "//" + location.hostname + (location.port ? ":" + location.port: "") + "/";
        a.prototype = {
            As: function(a) {
                if (null === a) a = k;
                else {
                    "/" != a.substr(a.length - 1) && (a += "/");
                    var b = h.XA(a);
                    if (!0 !== b) throw new e(b);
                }
                this.G("serverAddress", a)
            },
            qq: function() {
                return this.rh
            },
            os: function(a) {
                this.G("adapterSet", a)
            },
            wv: function() {
                return this.ai
            },
            kA: function(a) {
                this.G("user", a)
            },
            Cw: function() {
                return this.dk
            },
            Uz: function(a) {
                this.G("password", a)
            },
            rw: function() {
                return this.ms
            },
            sw: function() {
                return this.ns
            },
            Ud: function() {
                return this.sessionId
            }
        };
        a.prototype.setServerAddress = a.prototype.As;
        a.prototype.getServerAddress = a.prototype.qq;
        a.prototype.setAdapterSet = a.prototype.os;
        a.prototype.getAdapterSet = a.prototype.wv;
        a.prototype.setUser = a.prototype.kA;
        a.prototype.getUser = a.prototype.Cw;
        a.prototype.setPassword = a.prototype.Uz;
        a.prototype.getServerInstanceAddress = a.prototype.rw;
        a.prototype.getServerSocketName = a.prototype.sw;
        a.prototype.getSessionId = a.prototype.Ud;
        d(a, g);
        return a
    });
    define("lscY", ["Promise", "lscAi"],
    function(e, g) {
        return {
            wg: function(d, c) {
                return c.Rn ? c.Dk ?
                function() {
                    try {
                        var b = this.target[d].apply(this.target, [this.Va].concat(g.ci(arguments)));
                        return e.resolve(b)
                    } catch(c) {
                        return e.reject(c)
                    }
                }: function() {
                    try {
                        var b = this.target[d].apply(this.target, arguments);
                        return e.resolve(b)
                    } catch(c) {
                        return e.reject(c)
                    }
                }: c.Dk ?
                function() {
                    try {
                        this.target[d].apply(this.target, [this.Va].concat(g.ci(arguments)))
                    } catch(b) {}
                }: function() {
                    try {
                        this.target[d].apply(this.target, arguments)
                    } catch(b) {}
                }
            }
        }
    });
    define("lscP", [],
    function() {
        function e(e, d, c) {
            this.Rn = e;
            this.Dk = d;
            this.bs = c || !1
        }
        e.Cs = new e(!1, !1);
        e.CB = new e(!0, !1);
        e.Ds = new e(!0, !1, 2E3);
        e.c = new e(!1, !0);
        e.zz = new e(!0, !0);
        e.BB = new e(!0, !0, 4E3);
        return e
    });
    define("lscAP", ["lscY", "lscP"],
    function(e, g) {
        function d(b) {
            this.client = b;
            this.sb = !1;
            this.Va = -1;
            this.Qa = null
        }
        var c = g.Cs,
        b = g.c,
        c = {
            lr: c,
            Mo: b,
            No: b,
            Gr: g.Ds,
            pe: g.zz,
            wd: b,
            Wc: b,
            Hg: b,
            Np: c,
            bp: c
        };
        d.methods = c;
        d.prototype = {
            Xz: function(b) {
                this.target = b
            },
            ss: function(b) {
                this.Qa = b
            },
            gd: function() {
                return this.Qa
            },
            w: function() {
                this.client = null
            },
            cA: function(b) {
                this.Va = b
            },
            Wg: function(b, a, c) { ("lscD" == b ? this.client.ub: "lscE" == b ? this.client.xb: this.client.ga).S(a, c)
            },
            fe: function(b) {
                this.sb && this.Kj(b)
            },
            Kj: function(b) {
                this.Va = b;
                this.sb = !1;
                this.client.Kj()
            },
            Oc: function(b) {
                this.Va = b;
                this.sb = !0;
                this.client.yz()
            },
            Xg: function(b) {
                this.Kj( - 1);
                this.client.Xu(b)
            },
            Uk: function() {
                var b = this;
                this.Gr().then(function() {},
                function() {
                    b.client && b.Xg()
                })
            },
            or: function() {
                this.Uk();
                Executor.addTimedTask(this.Uk, 1E3, this)
            },
            zf: function(b, a) {
                this.client.xz(b, a)
            },
            onStatusChange: function(b) {
                this.client.Hk(b)
            },
            onSubscription: function(b, a, c, h, d) {
                this.client.v.DA(b, a, c, h, d)
            },
            Af: function(b, a, c) {
                this.client.v.Zu(b, a, c)
            },
            onUnsubscription: function() {},
            onEndOfSnapshot: function(b, a) {
                this.client.v.ce(b, a)
            },
            Yg: function(b, a) {
                this.client.v.TA(b, a)
            },
            onLostUpdates: function(b, a, c) {
                this.client.v.de(b, a, c)
            },
            onClearSnapshot: function(b, a) {
                this.client.v.be(b, a)
            },
            ee: function(b) {
                this.client.I.Kx(b)
            },
            tr: function(b, a, c) {
                this.client.I.Jx(b, a, c)
            },
            yf: function(b, a, c) {
                this.client.I.Lx(b, a, c)
            },
            sr: function(b) {
                this.client.I.Ix(b)
            },
            ur: function(b) {
                this.client.I.Nx(b)
            },
            ping: function() {
                if (null === this.client) throw "net";
                return ! 0
            }
        };
        for (var h in c) d.prototype[h] = e.wg(h, c[h]);
        return d
    });
    define("lscAO", ["ASSERT", "Executor", "List"],
    function(e, g, d) {
        function c(b) {
            this.lf = -1;
            this.dh = {};
            this.uj = {};
            this.eh = {};
            this.tj = 0;
            this.T = b;
            this.kh = new d
        }
        c.prototype = {
            Dh: function(b) {
                this.T = b
            },
            bw: function(b, c) {
                this.lf++;
                this.dh[this.lf] = c;
                this.uj[this.lf] = b;
                this.eh[this.lf] = !1;
                this.tj++;
                return this.lf
            },
            lb: function(b) {
                return this.dh[b]
            },
            Ng: function(b) {
                return this.uj[b]
            },
            ZA: function(b) {
                return this.eh[b]
            },
            pu: function() {
                this.ru();
                var b = [],
                c;
                for (c in this.dh) b.push(c);
                b.sort(function(b, a) {
                    return b - a
                });
                for (c = 0; c < b.length; c++) this.Hx(b[c]);
                e.verifyValue(this.tj, 0);
                this.lf = -1;
                this.dh = {};
                this.uj = {};
                this.eh = {};
                this.tj = 0
            },
            clean: function(b) {
                delete this.dh[b];
                delete this.uj[b];
                delete this.eh[b];
                this.tj--
            },
            Nx: function(b) {
                this.lb(b) && (this.eh[b] = !0)
            },
            Yu: function(b, c, f, a) {
                this.kh.add({
                    Zq: b,
                    Ij: c,
                    listener: f,
                    timeout: a
                })
            },
            ru: function() {
                var b = this;
                this.kh.forEach(function(c) {
                    b.fireEvent("onAbort", c.listener, [c.Zq, !1])
                });
                this.kh.clean()
            },
            Gw: function() {
                var b = this;
                this.kh.forEach(function(c) {
                    b.Hg(c.Zq, c.Ij, c.listener, c.timeout)
                });
                this.kh.clean()
            },
            Hg: function(b, c, f, a) {
                var d = null;
                f && (d = this.bw(b, f));
                this.T.Hg(b, c, d, a)
            },
            fireEvent: function(b, c, f) {
                c && c[b] && g.addTimedTask(c[b], 0, c, f)
            },
            Ix: function(b) {
                this.fireEvent("onProcessed", this.lb(b), [this.Ng(b)]);
                this.clean(b)
            },
            Lx: function(b) {
                this.fireEvent("onError", this.lb(b), [this.Ng(b)]);
                this.clean(b)
            },
            Jx: function(b, c, f) {
                this.fireEvent("onDeny", this.lb(b), [this.Ng(b), c, f]);
                this.clean(b)
            },
            Kx: function(b) {
                this.fireEvent("onDiscarded", this.lb(b), [this.Ng(b)]);
                this.clean(b)
            },
            Hx: function(b) {
                this.fireEvent("onAbort", this.lb(b), [this.Ng(b), this.ZA(b)]);
                this.clean(b)
            }
        };
        return c
    });
    define("lscAd", ["lscAe"],
    function(e) {
        return function(g, d) {
            var c = d ? g: [];
            c.yc = [];
            d || (c[0] = parseInt(g[0]), c[1] = parseInt(g[1]));
            for (var b = 2,
            h = g.length; b < h; b++) g[b] ? -1 == g[b].length ? c[b] = e.xe: (d || (c[b] = g[b].toString()), c.yc.push(b - 1)) : (d || (c[b] = "" === g[b] ? "": null), c.yc.push(b - 1));
            return c
        }
    });
    define("lscAc", ["Executor", "LoggerManager", "ASSERT", "lscAe", "lscAd"],
    function(e, g, d, c, b) {
        function h(a) {
            this.Tx = 0;
            this.pc = {};
            this.Eh = {};
            this.vv = 1;
            this.ih = {};
            this.jb = null;
            this.b = a
        }
        var f = g.getLoggerProxy(c.cg);
        h.prototype = {
            toString: function() {
                return "[SubscriptionsHandler]"
            },
            Dh: function(a) {
                this.jb = a
            },
            Ye: function(a) {
                return this.pc[this.Eh[a]] || null
            },
            zo: function(a) {
                var b = ++this.Tx;
                f.logInfo(g.resolve(10), a);
                a.gy(b, ++this.vv, this);
                this.pc[b] = a;
                this.Cr(a)
            },
            Sr: function(a) {
                if (this.jb && this.jb.sb) {
                    var b = a.Sf; (a.Mq() || a.ef()) && b && (this.jb.wd(b), delete this.Eh[b])
                }
                f.logInfo(g.resolve(11), a);
                b = a.Zc;
                a.zy();
                delete this.pc[b];
                return a
            },
            Wc: function(a, b) {
                if (this.jb && this.jb.sb && a.af()) {
                    d.verifyOk(a.af());
                    var c = a.Sf;
                    if (c) this.jb.Wc(c, b);
                    else if (c = a.Zc, this.ih[c]) {
                        var f = this;
                        this.ih[c].then(function(a) {
                            f.jb.Wc(a, b)
                        })
                    }
                }
            },
            Cr: function(a) {
                if (this.jb && this.jb.sb && a.gx()) {
                    var b = a.Zc;
                    f.logDebug(g.resolve(12));
                    var c = this,
                    d = this.jb.pe(a.mw());
                    d.then(function(f) {
                        delete c.ih[b];
                        c.pc[b] ? null != f && (a.Iy(f), c.Eh[f] = b) : null != f && c.jb.wd(f)
                    },
                    function() {
                        delete c.ih[b]
                    });
                    a.Gy();
                    this.ih[b] = d
                }
            },
            Hw: function() {
                f.logDebug(g.resolve(13));
                for (var a in this.pc) this.Cr(this.pc[a])
            },
            Sy: function(a) {
                d.verifyNotOk(a.ex());
                f.logDebug(g.resolve(14), a);
                delete this.Eh[a.Sf];
                a.vy();
                a.Hs && delete this.pc[a.Zc]
            },
            Ry: function() {
                f.logDebug(g.resolve(15));
                for (var a in this.pc) this.Sy(this.pc[a]);
                this.Eh = {}
            },
            TA: function(a, c) {
                var f = this.Ye(a[0]);
                if (!f) return ! 0;
                f.update(b(a, !0), c, !1)
            },
            de: function(a, b, c) {
                a = this.Ye(a);
                if (!a) return ! 1;
                a.Ex(b, c)
            },
            ce: function(a, b) {
                var c = this.Ye(a);
                if (!c) return ! 1;
                c.Wu(b)
            },
            be: function(a, b) {
                var c = this.Ye(a);
                if (!c) return ! 1;
                c.su(b)
            },
            Zu: function(a, b, c) { (a = this.Ye(a)) && a.wz(b, c)
            },
            DA: function(a, b, c, f, d) { (a = this.Ye(a)) && a.Ey(b, c, f, d)
            }
        };
        return h
    });
    define("EventDispatcher", ["Executor", "List", "Inheritance"],
    function(e, g, d) {
        function c() {
            this._callSuperConstructor(c)
        }
        function b() {
            this.initDispatcher()
        }
        b.prototype = {
            initDispatcher: function() {
                this.Gh = new c;
                this.Is = !1
            },
            addListener: function(b) {
                b && !this.Gh.contains(b) && (b = {
                    f: b,
                    Wq: !0
                },
                this.Gh.add(b), this.sl("onListenStart", [this], b, !0))
            },
            removeListener: function(b) {
                b && (b = this.Gh.remove(b)) && this.sl("onListenEnd", [this], b, !0)
            },
            getListeners: function() {
                return this.Gh.asArray()
            },
            useSynchEvents: function(b) {
                this.Is = !0 === b
            },
            sl: function(b, c, a, d) {
                this.Is ? this.sp(b, c, a, !0) : e.addTimedTask(this.sp, 0, this, [b, c, a, d])
            },
            sp: function(b, c, a, d) {
                if (a && a.f[b] && (d || a.Wq)) try {
                    c ? a.f[b].apply(a.f, c) : a.f[b].apply(a.f)
                } catch(e) {}
            },
            dispatchEvent: function(b, c) {
                var a = this;
                this.Gh.forEach(function(d) {
                    a.sl(b, c, d, !1)
                })
            }
        };
        b.prototype.initDispatcher = b.prototype.initDispatcher;
        b.prototype.addListener = b.prototype.addListener;
        b.prototype.removeListener = b.prototype.removeListener;
        b.prototype.getListeners = b.prototype.getListeners;
        b.prototype.useSynchEvents = b.prototype.useSynchEvents;
        b.prototype.dispatchEvent = b.prototype.dispatchEvent;
        c.prototype = {
            remove: function(b) {
                b = this.find(b);
                if (0 > b) return ! 1;
                var c = this.data[b];
                c.Wq = !1;
                this.data.splice(b, 1);
                return c
            },
            find: function(b) {
                for (var c = 0; c < this.data.length; c++) if (this.data[c].f == b) return c;
                return - 1
            },
            asArray: function() {
                var b = [];
                this.forEach(function(c) {
                    b.push(c.f)
                });
                return b
            }
        };
        d(c, g);
        return b
    });
    define("lsco", ["Global", "LoggerManager", "EnvironmentStatus", "ASSERT", "lscAe"],
    function(e, g, d, c, b) {
        function h(a, b) {
            this.JA = b;
            this.cv(a)
        }
        var f = g.getLoggerProxy(b.ue),
        a = !1;
        h.qA = function(b) {
            a = b
        };
        h.prototype = {
            Jd: function(a) {
                f.logDebug(g.resolve(17), a);
                this.g = a
            },
            cv: function(a) {
                var b = this;
                e.ia(a, "LS_e",
                function(a, c, f, d, h, l, r, e) {
                    b.wy(a, c, f, d, h, l, r, e)
                });
                e.ia(a, "LS_t",
                function() {});
                e.ia(a, "LS_u",
                function(a, c, f) {
                    b.Yg(a, c, f)
                });
                e.ia(a, "LS_v",
                function(a, c) {
                    b.Yg(a, c, !0)
                });
                e.ia(a, "LS_o",
                function(a, c) {
                    b.de(a, c)
                });
                e.ia(a, "LS_n",
                function(a, c) {
                    b.ce(a, c)
                });
                e.ia(a, "LS_s",
                function(a, c) {
                    b.be(a, c)
                });
                e.ia(a, "LS_l",
                function(a, c, f, d) {
                    b.la(a, c, f, d)
                });
                e.ia(a, "LS_w",
                function(a, c, f, d, h, l, r) {
                    b.jy(a, c, f, d, h, l, r)
                });
                e.ia(a, "setTimeout",
                function(a, b) {
                    setTimeout(a, b)
                });
                e.ia(a, "alert",
                function(a) {
                    "undefined" != typeof alert ? alert(a) : "undefined" != typeof console && console.log(a)
                })
            },
            lc: function(b, c, h, e) {
                var q = !a && !d.isUnloaded() && null != this.g;
                q && b && (q &= this.g.bc(b));
                q && c && (q &= this.JA.bc(c));
                q && !e && (q = h ? q & this.g.rx() : q & this.g.Iq());
                f.isDebugLogEnabled() && f.logDebug(g.resolve(18), q);
                return q
            },
            wy: function(a, b, c, f, d, h, e, g) {
                if (this.lc(b, null, 1 == a, 3 == a || 4 == a)) if (1 == a) this.g.ty(c, f, h, d, e, g);
                else if (2 == a) this.g.qy(c);
                else if (3 == a) this.g.Im("syncerror");
                else if (4 == a) {
                    a = 30;
                    if (null != c) {
                        a = c;
                        if (41 == a) {
                            this.g.ly();
                            return
                        }
                        if (48 == a) {
                            this.g.Im("expired");
                            return
                        }
                        if (0 < a && 30 > a || 39 < a) a = 39
                    }
                    this.la(a, b, null, "The session has been forcibly closed by the Server")
                } else 5 == a ? this.g.Ay(c) : this.g.mr("Unsupported Server version")
            },
            Yg: function(a, b, c) {
                2 > b.length ? this.lc(a) && this.g.py() : this.lc(null, a) && this.g.Km(b, c || !1)
            },
            ce: function(a, b) {
                this.lc(null, a) && this.g.ce(b)
            },
            be: function(a, b) {
                this.lc(null, a) && this.g.be(b)
            },
            de: function(a, b) {
                this.lc(null, a) && this.g.de(b)
            },
            ry: function(a, b, d, h) {
                if (this.lc()) if (c.verifyValue(d.substring(0, 3), "MSG") || f.logError(g.resolve(16), d), d = d.substr(3), 39 == a) for (a = parseInt(h), b = parseInt(b), a = b - a + 1; a <= b; a++) this.g.ee(d, a);
                else 38 == a ? this.g.ee(d, b) : 0 >= a ? this.g.Bm(d, a, h, b) : this.g.yf(d, a, h, b)
            },
            la: function(a, b, c, f) {
                null != c && isNaN(c) ? this.ry(a, b, c, f) : null != c ? this.lc(null, b) && this.g.Jm(c, a, f) : this.lc(b, null, null, !0) && this.g.zf(a, f)
            },
            jy: function(a, b, c, d, h, e, t) {
                if (this.lc(null, 4 == a || 5 == a || 9 == a ? null: b)) if (4 == a) this.g.Am(c, b);
                else if (5 == a) this.g.Dm(c, b);
                else if (8 == a) this.g.onUnsubscription(c);
                else if (6 == a) this.g.onSubscription(c, d, h, e + 1, t + 1);
                else 9 == a ? this.g.Bf(c, b) : f.logDebug(g.resolve(19), a)
            }
        };
        return h
    });
    define("lscN", ["Executor"],
    function(e) {
        function g(d, c) {
            this.Ge = d;
            this.bk = this.Rv ? this.Ge.Ci: c ? 2 * c: 4E3
        }
        g.prototype = {
            Lc: function(d) {
                d ? this.Ne() : e.addTimedTask(this.kd, this.bk + Number(this.Ge.ie), this)
            },
            kd: function() {
                this.verifySuccess() || this.Ne()
            }
        };
        return g
    });
    define("lscO", ["Inheritance", "lscN"],
    function(e, g) {
        function d(c, b, h, f, a) {
            this._callSuperConstructor(d, [c, a]);
            this.oc = b;
            this.Ba = h;
            this.fc = f
        }
        d.prototype = {
            verifySuccess: function() {
                return ! this.Ba.ux(this.oc)
            },
            Ne: function() {
                this.Ba.wd(this.oc, this.fc + 1, this.bk)
            },
            Vg: function() {
                this.Ba.onUnsubscription(this.oc)
            }
        };
        e(d, g);
        return d
    });
    define("lscL", ["Inheritance", "lscN", "ASSERT"],
    function(e, g) {
        function d(b, c, a, e, g) {
            this._callSuperConstructor(d, [b, g]);
            this.oc = c;
            this.Ba = a;
            this.fc = e
        }
        var c, b;
        for (b in {
            Lc: !0
        }) c = b;
        d.prototype = {
            verifySuccess: function() {
                return ! this.Ba.sx(this.oc)
            },
            Ne: function() {
                this.Ba.pe(this.oc, this.fc + 1, this.bk)
            },
            Lc: function(b) {
                b || this.Ba.EA(this.oc);
                this._callSuperMethod(d, c, arguments)
            },
            Vg: function() {}
        };
        e(d, g);
        return d
    });
    define("lscM", ["Inheritance", "lscN", "ASSERT"],
    function(e, g, d) {
        function c(b, d, f, a, e, g, k) {
            this._callSuperConstructor(c, [b, k]);
            this.oc = d;
            this.Dr = f;
            this.Ba = a;
            this.fu = e;
            this.fc = g
        }
        c.prototype = {
            verifySuccess: function() {
                return ! this.Ba.tx(this.oc, this.Dr)
            },
            Ne: function() {
                this.Ba.ks(this.oc, this.Dr, this.fu, this.fc + 1, this.bk)
            },
            Vg: function() {
                d.fail()
            }
        };
        e(c, g);
        return c
    });
    define("lscp", "LoggerManager lscAe Executor EnvironmentStatus lscAi lscO lscL lscM".split(" "),
    function(e, g, d, c, b, h, f, a) {
        function l(a, b, f, h) {
            this.Xr = 1;
            this.o = a;
            this.il = b;
            this.Lu = f;
            this.options = h;
            this.Va = 0;
            this.sb = !1;
            this.Vx = 1;
            this.M = {};
            this.cd = 0;
            this.m = {};
            this.ld = {};
            this.qu = d.addRepetitiveTask(this.$o, 5E3, this);
            c.addBeforeUnloadHandler(this);
            c.addUnloadHandler(this)
        }
        function m(a, b, c) {
            this.Pm = this.ls = this.Qm = !1;
            this.bh = 0;
            this.vj = !1;
            this.Gu = c;
            this.Lt = b;
            this.md = a
        }
        var k = e.getLoggerProxy(g.Dd);
        l.prototype = {
            toString: function() {
                return "[|PushPageCollectionHandler|]"
            },
            Gc: function() {
                return this.Va
            },
            bc: function(a) {
                return a == this.Va
            },
            Tk: function(a) {
                var b = this.o.mc;
                b && b.hw(this.o.g.mb()) > a && k.logWarn(e.resolve(21))
            },
            Wo: function() {
                this.m = {};
                for (var a in this.ld) this.ld[a] = {}
            },
            Od: function(a) {
                for (var b in this.M) a(this.M[b], b)
            },
            vr: function(a, b) {
                this.M[a] = b;
                this.ld[a] = {};
                this.cd++;
                this.il.S("clientsCount", this.cd);
                k.logDebug(e.resolve(22), this);
                a !== g.jo && (this.Lu.Ll(function(a, c) {
                    b.Wg("lscD", a, c)
                }), this.options.Ll(function(a, c) {
                    b.Wg("lscE", a, c)
                }), this.il.Ll(function(a, c) {
                    b.Wg("lscC", a, c)
                }), b.onStatusChange(this.o.Gb()), this.sb ? b.Oc(this.Va) : b.fe(this.Va))
            },
            wr: function(a) {
                k.logDebug(e.resolve(23), this, a);
                if (this.M[a]) {
                    var b = this.ld[a],
                    c;
                    for (c in b) this.Vr(c);
                    this.M[a].w();
                    delete this.M[a];
                    delete this.ld[a];
                    this.cd--;
                    this.il.S("clientsCount", this.cd)
                }
            },
            Td: function(a) {
                a = this.m[a];
                return a ? this.Xe(a.md) : (k.logDebug(e.resolve(24)), null)
            },
            Xe: function(a) {
                return this.M[a] ? this.M[a] : (k.logDebug(e.resolve(25)), null)
            },
            by: function(a) {
                this.Od(function(b) {
                    b.onStatusChange(a)
                });
                return ! 0
            },
            Oc: function() {
                this.Wo();
                this.sb = !0;
                var a = ++this.Va;
                this.Od(function(b) {
                    b.Oc(a)
                })
            },
            fe: function() {
                this.Wo();
                this.sb = !1;
                var a = ++this.Va;
                this.Od(function(b) {
                    b.fe(a)
                })
            },
            onSubscription: function(a) {
                this.m[a] && (this.m[a].Qm = !1)
            },
            Af: function(a) {
                this.onUnsubscription(a)
            },
            sx: function(a) {
                return this.m[a] ? this.m[a].Qm && !this.m[a].vj: !1
            },
            EA: function(a) {
                this.m[a] && (this.m[a].ls = !0)
            },
            onUnsubscription: function(a) {
                if (this.m[a]) {
                    var b = this.m[a].md;
                    delete this.m[a];
                    this.ld[b] && delete this.ld[b][a]
                }
            },
            ux: function(a) {
                return this.m[a] ? this.m[a].ls && this.m[a].vj: !1
            },
            tx: function(a, b) {
                return this.m[a] ? this.m[a].Pm && this.m[a].bh == b: !1
            },
            Bf: function(a, b) {
                this.m[a] && b == this.m[a].bh && (this.m[a].Pm = !1)
            },
            Jw: function(a, b) {
                if (this.M[a] && this.o.gm()) {
                    var c = this.Vx++;
                    this.ld[a][c] = !0;
                    var f = this.Lv(b, c);
                    this.m[c] = new m(a, f.add, f.remove);
                    k.logDebug(e.resolve(26));
                    this.pe(c, 1);
                    return c
                }
                k.logError(e.resolve(20), this, a);
                ASSERT.fail()
            },
            pe: function(a, b, c) {
                this.m[a] && (3 <= b && this.Tk(1), this.m[a].Qm = !0, c = new f(this.options, a, this, b, c), this.o.g.rz(a, this.m[a].Lt, this, 2 <= b, c))
            },
            Vr: function(a) {
                this.m[a] && !this.m[a].vj && this.wd(a, 1)
            },
            wd: function(a, b, c) {
                this.m[a] && (3 <= b && this.Tk(1), this.m[a].vj = !0, c = new h(this.options, a, this, b, c), this.o.g.tz(a, this.m[a].Gu, this, 2 <= b, c))
            },
            Wc: function(a, b) {
                if (this.m[a]) {
                    var c = ++this.m[a].bh;
                    this.ks(a, c, b, 1)
                }
            },
            ks: function(c, f, d, h, e) {
                if (this.m[c] && this.m[c].bh == f) {
                    3 <= h && this.Tk(1);
                    this.m[c].Pm = !0;
                    var r = this.m[c].bh;
                    f = b.sa({
                        LS_table: c,
                        LS_op: "reconf",
                        LS_win_phase: r
                    },
                    d);
                    d = new a(this.options, c, r, this, d, h, e);
                    this.o.g.sz(c, f, d)
                }
            },
            Zx: function() {
                this.Od(function(a) {
                    a.or()
                })
            },
            gr: function(a) {
                var b = this.M;
                this.M = {};
                for (var c in b) b[c].Xg(a)
            },
            cy: function(a, b) {
                this.Od(function(c) {
                    c.zf(a, b)
                })
            },
            w: function() {
                d.stopRepetitiveTask(this.qu);
                c.removeBeforeUnloadHandler(this);
                c.removeUnloadHandler(this)
            },
            unloadEvent: function() {
                this.gr(!1)
            },
            preUnloadEvent: function() {
                this.Zx()
            },
            $o: function() {
                var a = this;
                this.Od(function(b, c) {
                    b.ping().then(function() {},
                    function() {
                        a.wr(c)
                    })
                })
            },
            Lv: function(a, c) {
                this.Xr++;
                var f = {
                    LS_table: c,
                    LS_req_phase: this.Xr,
                    LS_win_phase: this.Va
                };
                b.sa(a, f);
                return {
                    add: b.sa(a, {
                        LS_op: "add"
                    }),
                    remove: b.sa(f, {
                        LS_op: "delete"
                    })
                }
            }
        };
        l.prototype.onPushPageLost = l.prototype.wr;
        l.prototype.onNewPushPage = l.prototype.vr;
        l.prototype.unloadEvent = l.prototype.unloadEvent;
        l.prototype.preUnloadEvent = l.prototype.preUnloadEvent;
        return l
    });
    define("lscl", ["LoggerManager", "BrowserDetection", "Helpers", "lscAe"],
    function(e, g, d, c) {
        var b = g.isProbablyFX(1.5, !0) ? 10 : 50,
        h = b,
        f = 0,
        a = 0,
        l = 0,
        m = null,
        k = null,
        n = null,
        q = e.getLoggerProxy(c.Cd);
        return {
            Hc: function() {
                h = b;
                l = a = f = 0;
                n = k = m = null
            },
            Kw: function() {
                m = f;
                k = a;
                n = l;
                var b = d.getTimeStamp();
                l || (l = b);
                6E4 <= b - l && (f = 0, l = b);
                a && 1E3 > b - a && f++;
                a = b
            },
            Fj: function() {
                k != a && (f = m, a = k, l = n)
            },
            Po: function() {
                if (0 != a) {
                    if (!h) return ! 1;
                    if (f >= h) return q.logError(e.resolve(27)),
                    h = 0,
                    !1
                }
                return ! 0
            }
        }
    });
    define("lscAH", ["Environment", "lscAi"],
    function(e, g) {
        function d(c, b, d, f, a, e) {
            this.Vz(c);
            this.Nf(b);
            this.setData(d);
            this.Pj(f);
            this.th(a);
            this.vh(e)
        }
        d.nt = "GET";
        d.Th = "POST";
        d.prototype = {
            toString: function() {
                return ["[", this.wb, this.fg, this.ib, this.Ae, "]"].join("|")
            },
            Vz: function(c) {
                for (; c && "/" == c.substring(c.length - 1);) c = c.substring(0, c.length - 1);
                this.wb = c
            },
            Nf: function(c) {
                for (; c && "/" == c.substring(0, 1);) c = c.substring(1);
                this.fg = c
            },
            Pj: function(c) {
                this.Ae = c || d.Th
            },
            th: function(c) {
                this.kp = c || !1
            },
            vh: function(c) {
                this.Fl = c || null
            },
            setData: function(c) {
                this.ib = c || null
            },
            xi: function(c) {
                this.ib ? this.yu(c) || (this.ib += c) : this.setData(c)
            },
            yu: function(c) {
                return this.ib && -1 < this.ib.indexOf(c)
            },
            getFile: function() {
                return this.fg
            },
            Sa: function() {
                return this.fg ? this.wb + "/" + this.fg: this.wb
            },
            getData: function() {
                return this.ib
            },
            Bw: function() {
                return this.ib ? this.Sa() + "?" + this.ib: this.Sa()
            },
            clone: function() {
                return new d(this.wb, this.fg, this.ib, this.Ae, this.kp, this.Fl)
            },
            Jq: function() {
                return ! (0 == this.wb.indexOf("http://") || 0 == this.wb.indexOf("https://") || 0 == this.wb.indexOf("file:///"))
            },
            lx: function(c, b) {
                if (!e.isBrowser()) return ! 1;
                if (this.Jq()) return e.isWebWorker() ? location.hostname == c: g.Ec() == c;
                if (b) {
                    if (!this.Lq(b)) return ! 1;
                    if ("file:" == b) return "" == c
                }
                c = c.replace(".", ".");
                return (new RegExp("^https?://(?:[a-z][a-z0-9-]+.)*" + c + "(?:/|$|:)", "i")).test(this.wb)
            },
            Lq: function(c) {
                return e.isBrowser() && c.indexOf(":") == c.length - 1 ? this.Jq() ? location.protocol == c: 0 == this.wb.indexOf(c) : !1
            },
            va: function() {
                if (!e.isBrowser()) return ! 0;
                var c = e.isWebWorker() ? location.hostname: g.Ec();
                return ! this.lx(c, location.protocol)
            },
            ua: function() {
                return e.isBrowser() ? !this.Lq(location.protocol) : !0
            }
        };
        d.Jt = new d("about:blank");
        return d
    });
    define("lscG", [],
    function() {
        function e(e, d, c, b, h) {
            this.request = e;
            this.bz = d;
            this.Qr = b;
            this.ig = c;
            this.ke = h
        }
        e.Lh = 1;
        e.rk = 2;
        e.kk = 3;
        e.te = 4;
        e.Yc = 5;
        e.Bd = 6;
        e.mk = 7;
        e.re = 8;
        e.$n = 9;
        e.prototype = {
            toString: function() {
                return ["[|ControlRequest", this.Qr, this.ig, this.ke, this.request, "]"].join("|")
            },
            Hi: function() {
                return this.bz
            },
            getKey: function() {
                return this.Qr
            }
        };
        return e
    });
    define("lscc", ["lscAH", "lscG", "lscAi"],
    function(e, g, d) {
        function c() {}
        c.prototype = {
            toString: function() {
                return "[Encoder]"
            },
            Pw: function(b, c, f) {
                var a = new e;
                b = b.Ue();
                a.Nf((b == g.te ? "msg": b == g.Yc ? "send_log": b == g.re ? "heartbeat": "control") + this.Kg());
                a.Pj(e.Th);
                a.th(c);
                a.vh(f);
                return a
            },
            encode: function(b, c, f) {
                for (f = f ? "": "\r\n"; 0 < b.getLength();) {
                    var a = b.Gg(),
                    d = a.Hi(),
                    e = a.ig;
                    if (d && d.verifySuccess()) d.Vg(),
                    b.shift();
                    else return b = a.request,
                    e == g.te ? f + this.Dl(b, d, c) : e == g.Bd ? f + this.Al(b, d, c) : e == g.re ? f + this.Bl(b, d, c) : e == g.Yc ? f + this.Cl(b, d, c) : f + this.zl(b, d, c)
                }
                return null
            },
            expand: function(b, c) {
                var f = "";
                if (b) for (var a in b) a !== c && (f += a + "\x3d" + b[a] + "\x26");
                return f
            },
            Cg: function(b, c) {
                var f = this.expand(b);
                return f += this.expand(c)
            },
            yp: function(b, c, f) {
                var a = this.expand(b, f),
                a = a + this.expand(c, f);
                b[f] ? a += f + "\x3d" + b[f] : c && (a += f + "\x3d" + c[f]);
                return "LS_unq\x3d" + a.length + "\x26" + a
            },
            Sn: function(b) {
                return b
            },
            Kg: function() {
                return ".js"
            },
            Tl: function() {
                return 0
            },
            Wl: function() {
                return 2
            },
            zl: function(b, c, f, a) {
                a = d.sa(a, {
                    LS_session: f
                });
                return this.Cg(b, a)
            },
            Al: function(b, c, f, a) {
                return this.Cg(b, a)
            },
            Bl: function(b, c, f, a) {
                return this.Cg(b, a)
            },
            Cl: function(b, c, f, a) {
                return f ? (a = d.sa(a, {
                    LS_session: f
                }), this.Cg(b, a)) : this.Cg(b)
            },
            Dl: function(b, c, f, a) {
                return this.yp(b, a, "LS_message")
            }
        };
        return c
    });
    define("lscd", ["lscc", "Inheritance", "lscAi"],
    function(e, g, d) {
        function c() {}
        var b = 1,
        h = {
            Dl: "encodeMessageRequest",
            zl: "encodeControlRequest",
            Al: "encodeDestroyRequest",
            Bl: "encodeHeartbeatRequest",
            Cl: "encodeLogRequest"
        },
        h = d.getReverse(h);
        c.prototype = {
            Dl: function(b, a, e, g) {
                g = d.sa(g, {
                    LS_session: e
                });
                a.Qn ? g.LS_msg_prog || b.LS_msg_prog || (g = d.sa(g, {
                    LS_ack: "",
                    LS_msg_prog: a.vb.ev(a.Lb)
                })) : (a.Vu(!0), g = d.sa(g, {
                    LS_ack: "",
                    LS_msg_prog: a.vb.Yq(a.Lb)
                }));
                return this._callSuperMethod(c, h.encodeMessageRequest, [b, a, e, g])
            },
            zl: function(f, a, e, g) {
                g = d.sa(g, {
                    LS_unique: b++
                });
                return this._callSuperMethod(c, h.encodeControlRequest, [f, a, e, g])
            },
            Al: function(f, a, e, g) {
                g = d.sa(g, {
                    LS_unique: b++
                });
                return this._callSuperMethod(c, h.encodeDestroyRequest, [f, a, e, g])
            },
            Bl: function(f, a, e, g) {
                g = d.sa(g, {
                    LS_unique: b++
                });
                return this._callSuperMethod(c, h.encodeHeartbeatRequest, [f, a, e, g])
            },
            Cl: function(f, a, e, g) {
                g = d.sa(g, {
                    LS_unique: b++
                });
                return this._callSuperMethod(c, h.encodeLogRequest, [f, a, e, g])
            },
            expand: function(b, a) {
                var c = "";
                if (b) for (var d in b) c = d !== a ? c + (d + "\x3d" + b[d] + "\x26") : c + (d + "\x3d" + encodeURIComponent(b[d]) + "\x26");
                return c
            },
            yp: function(b, a, c) {
                b = this.expand(b, c);
                return b += this.expand(a, c)
            }
        };
        g(c, e);
        return c
    });
    define("lscAI", ["lscd"],
    function(e) {
        function g() {
            for (var b in {
                pa: !0
            }) this.Vh = b;
            this.V = g
        }
        function d() {
            return ! 1
        }
        function c() {
            return ! 0
        }
        var b = new e;
        g.bo = "LS_container\x3dlsc\x26";
        g.Yb = function(b, f) {
            for (var a in f) b[a] = !0 === f[a] ? c: !1 === f[a] ? d: f[a]
        };
        g.Yb(g, {
            ta: !1,
            va: !1,
            ua: !1,
            Wb: !1,
            Xb: !1,
            ff: !1,
            $b: !1
        });
        g.prototype = {
            da: function() {},
            Lj: function(b, c, a, d, e, k) {
                this.V.Xb() ? b.xi("LS_eng\x3d" + k + "\x26") : b.xi(g.bo);
                return this.pa(b, c, a, d, e)
            },
            pa: function() {
                return ! 1
            },
            Rd: function() {
                return b
            }
        };
        return g
    });
    define("lsch", ["lscc", "Inheritance"],
    function(e, g) {
        function d() {}
        d.prototype = {
            toString: function() {
                return "[WSEncoder]"
            },
            Tl: function(c) {
                return c.length + 2
            },
            Kg: function() {
                return ""
            }
        };
        g(d, e);
        return d
    });
    define("lscAK", "lscAI Inheritance EnvironmentStatus Executor Environment LoggerManager lscAi ASSERT lsch lscAe".split(" "),
    function(e, g, d, c, b, h, f, a, l, m) {
        function k(a) {
            this._callSuperConstructor(k);
            this.i = !1;
            this.Xa = this.rj = this.Ka = this.wi = null;
            this.kc = this.Cf = !1;
            this.sh = null;
            this.Lm = !1;
            this.bB = a;
            this.V = k
        }
        function n(a) {
            a = a.toLowerCase();
            a = 0 == a.indexOf("http://") ? a.replace("http://", "ws://") : a.replace("https://", "wss://");
            if (p) return new p(a, "js.lightstreamer.com");
            if ("undefined" != typeof WebSocket) return new WebSocket(a, "js.lightstreamer.com");
            if ("undefined" != typeof MozWebSocket) return new MozWebSocket(a, "js.lightstreamer.com");
            k.rl();
            return null
        }
        var q = h.getLoggerProxy(m.Za),
        p = null;
        b.isNodeJS() && (p = f.lj("faye-websocket").Client);
        var t = new l,
        u = !1,
        r = {};
        k.rl = function(a) {
            a ? r[a] = !0 : u = !0
        };
        k.nz = function() {
            u = !1;
            r = {}
        };
        k.Zw = function() {
            for (var a in r) return ! 0;
            return u
        };
        e.Yb(k, {
            ta: function(a) {
                if (u || a && r[a]) return ! 1;
                a = null;
                "undefined" != typeof WebSocket ? a = WebSocket: "undefined" != typeof MozWebSocket && (a = MozWebSocket);
                return a && 2 == a.prototype.CLOSED ? !1 : p || a
            },
            va: !0,
            ua: function() {
                return ! b.isBrowser() || "https:" != location.protocol
            },
            Wb: function() {
                return ! b.isNodeJS()
            },
            Xb: !1,
            ff: !0,
            $b: !1
        });
        k.prototype = {
            toString: function() {
                return ["[|WebSocketConnection", this.i, this.Ka, this.wi, this.fm(), "]"].join("|")
            },
            da: function() {
                if (this.Xa) {
                    q.logDebug(h.resolve(32));
                    this.Ka = null;
                    if (this.Xa) try {
                        this.Xa.close(1E3)
                    } catch(a) {
                        q.logDebug(h.resolve(33), a)
                    }
                    this.Ja()
                }
            },
            Jy: function(a, b, f, d, r) {
                if (this.i) q.logError(h.resolve(28));
                else if (u) return ! 1;
                this.kc = !1;
                this.sh = a.wb;
                this.Ka = b;
                try {
                    this.Xa = n(this.sh)
                } catch(e) {
                    return q.logDebug(h.resolve(34), e),
                    !1
                }
                c.addTimedTask(this.Ky, 6E3, this, [this.Ka]);
                var g = this;
                this.Xa.onmessage = function(a) {
                    g.Fm(a, b, f)
                };
                this.Xa.onerror = function() {
                    g.ny(b, d)
                };
                this.Xa.onclose = function(a) {
                    g.iy(a, b, r, d)
                };
                this.Xa.onopen = function() {
                    g.uy(b)
                };
                return ! 0
            },
            Ky: function(a) {
                if (a == this.Ka && this.Xa && !this.Lm) try {
                    q.logDebug(h.resolve(35)),
                    this.Xa.close(1E3)
                } catch(b) {
                    q.logDebug(h.resolve(36))
                }
            },
            pa: function(a, b) {
                if (this.i) return q.logError(h.resolve(29)),
                null;
                if (u) return ! 1;
                this.rj = a;
                this.wi = b;
                q.logDebug(h.resolve(37), a.Sa());
                this.fm() && this.hs(b);
                return ! 0
            },
            Ww: function(b) {
                return a.verifyOk(this.sh) ? 0 == this.sh.indexOf(b) : (q.logError(h.resolve(30)), !1)
            },
            fm: function() {
                return null != this.Xa && 1 == this.Xa.readyState
            },
            gg: function(a, b) {
                if (!this.fm()) return null;
                b && (this.Ps(b), a.xi(e.bo));
                q.isDebugLogEnabled() && q.logDebug(h.resolve(38), a.getFile());
                try {
                    this.Xa.send(a.getFile() + "\r\n" + a.getData())
                } catch(c) {
                    return q.logDebug(h.resolve(39), c),
                    !1
                }
                return ! 0
            },
            hs: function(b) {
                var c = this.gg(this.rj, b);
                a.verifyOk(null !== c) || q.logError(h.resolve(31), b);
                c && (this.i = !0, this.bB.kv(this.Ka))
            },
            Ps: function(a) {
                this.wi = a
            },
            Fm: function(a, b, f) {
                this.Ka != b || d.isUnloaded() || (q.isDebugLogEnabled() && q.logDebug(h.resolve(40), a.data), this.Cf = !0, c.executeTask(f, [a.data, this.wi]))
            },
            ny: function(a, b) {
                this.Ka != a || d.isUnloaded() || (q.logDebug(h.resolve(41)), this.kc |= !this.Cf, c.executeTask(b, ["wsc.unknown", this.Ka, !0, this.kc, !1]))
            },
            uy: function(a) {
                this.Ka != a || d.isUnloaded() || (this.Lm = !0, q.logDebug(h.resolve(42)), this.rj && this.hs())
            },
            iy: function(a, b, f, r) {
                this.Ka != b || d.isUnloaded() || (a = a ? a.code: -1, q.logDebug(h.resolve(43), a, this.Cf), 1E3 == a || 1001 == a ? (c.modifyAllTaskParams(f, [this.Ka, !0]), c.addPackedTimedTask(f, 300), this.Ja()) : 1011 == a ? (this.kc |= !this.Cf, f = this.Ka, this.Ja(), c.executeTask(r, ["wsc.server", f, !0, this.kc, !0])) : (this.kc |= !this.Cf, f = this.Ka, this.Ja(), c.executeTask(r, ["wsc." + a, f, !0, this.kc, !1])))
            },
            Ja: function() {
                this.Lm = this.i = !1;
                this.rj = this.Ka = null;
                this.Cf = !1;
                this.sh = this.Xa = null
            },
            Rd: function() {
                return t
            }
        };
        g(k, e);
        return k
    });
    define("lscI", ["Inheritance", "lscN"],
    function(e, g) {
        function d(c, b, h, f) {
            this._callSuperConstructor(d, [f]);
            this.ot = c;
            this.Dt = h;
            this.c = b
        }
        d.prototype = {
            verifySuccess: function() {
                return ! this.c.bc(this.Dt)
            },
            Ne: function() {
                this.c.Di(this.ot)
            },
            Rv: function() {
                return this.Ge.Ci
            },
            Vg: function() {}
        };
        e(d, g);
        return d
    });
    define("lscr", "EnvironmentStatus Helpers LoggerManager Executor lscl lscAe lscI lscG lscq ASSERT BrowserDetection lscAK".split(" "),
    function(e, g, d, c, b, h, f, a, l, m, k) {
        function n(a, b, f, d, h) {
            this.Pk = c.packTask(this.Fy, this);
            this.Ok = c.packTask(this.Hm, this);
            this.Nk = c.packTask(this.Gm, this);
            this.P = a;
            this.Pd = b;
            this.a = 1;
            this.na = 0;
            this.La = 100 * g.randomG(100);
            this.f = f;
            this.R = d;
            this.nc = f.nc;
            this.b = f.b;
            this.Pa = f.Pa;
            this.ea = null;
            this.W = f.W;
            this.Qa = f.gd();
            this.Qq = this.Wf = this.Lf = 0;
            this.me = this.od = this.km = null;
            this.reset();
            h && (this.De = h.De, this.sessionId = h.sessionId, this.rd = h.rd, this.La = h.La, this.Lf = h.Lf, this.Jj = h.Jj, this.cm = h.cm)
        }
        var q = d.getLoggerProxy(h.Cd),
        p = d.getLoggerProxy(h.ue);
        n.uk = 1;
        n.Ad = 2;
        n.co = 3;
        n.fo = 4;
        n.eo = 5;
        n.$s = 7;
        n.it = 8;
        n.gB = 9;
        n.iB = 10;
        n.ft = 6;
        n.sk = 11;
        n.prototype = {
            reset: function() {
                this.De = 0;
                this.sessionId = this.rd = null;
                this.Lf = 0;
                this.Rf = this.Tc = this.Ik = !1;
                this.Bn = "";
                this.Sc = !1
            },
            If: function() {},
            xc: function(a) {
                var b = this.a;
                this.a = a;
                this.na++;
                a = this.na;
                this.a != b && this.f.wA(this.R);
                return a == this.na
            },
            Vi: function() {
                this.La++
            },
            bc: function(a) {
                return this.La == a
            },
            Vl: function() {
                var a = this.a;
                return 1 == a ? h.Ub: 11 == a ? h.dg: 2 == a ? h.CONNECTING: 3 == a || 4 == a || 5 == a ? h.Ea + this.Xp() : 10 == a ? h.we: h.Ea + this.Sp()
            },
            i: function() {
                return 1 != this.a && 2 != this.a && 11 != this.a
            },
            rx: function() {
                return 2 == this.a || 7 == this.a || 5 == this.a
            },
            Iq: function() {
                return 3 == this.a || 8 == this.a || 9 == this.a || 10 == this.a
            },
            px: function() {
                return ! this.P
            },
            mb: function() {
                return this.i() ? this.rd: this.Jj
            },
            Ud: function() {
                return this.sessionId
            },
            yb: function(a, c) {
                var f = 1 != this.a && 11 != this.a ? !1 : !0;
                if (!b.Po()) return q.logDebug(d.resolve(60), this),
                this.ra("mad", f, !0),
                !1;
                0 == f && (q.logDebug(d.resolve(61), this), this.ra("new." + (c || ""), !1, !1));
                q.logInfo(d.resolve(55), this);
                this.reset();
                this.Kr();
                this.Pa.S("sessionId", null);
                this.Pa.S("serverSocketName", null);
                this.Pa.S("serverInstanceAddress", null);
                this.Jj = this.Pa.rh;
                this.cm = this.b.jn;
                this.Vi();
                return ! 0
            },
            Id: function() {
                if (!b.Po()) return this.ra("madb", !1, !0),
                !1;
                this.De++;
                m.verifyOk(6 == this.a || 4 == this.a || 1 == this.a) || q.logError(d.resolve(44));
                if (1 == this.a) {
                    if (!this.xc(4)) return ! 1;
                    this.Kr();
                    this.Vd()
                }
                this.Vi();
                this.P ? q.logDebug(d.resolve(62), this) : q.logInfo(d.resolve(56), this);
                return ! 0
            },
            Yr: function(a, b, c) {
                this.R = a;
                this.Tc || (q.logDebug(d.resolve(63), this), this.Sc = !1, 2 == this.a || 11 == this.a || 1 == this.a ? this.f.Je(this.R, b, c) : 6 == this.a || 4 == this.a ? this.f.Dn(this.R, b, c) : (this.Tc = !0, this.Rf = c, this.Bn = b, this.Di(b)))
            },
            kz: function(a) {
                this.R = a;
                this.Sc || (q.logDebug(d.resolve(64), this), m.verifyOk(2 != this.a && 11 != this.a && 1 != this.a) || q.logError(d.resolve(45)), 6 == this.a || 4 == this.a ? this.f.Es(this.R) : (this.Sc = !0, this.Di("slow")))
            },
            Kr: function() {
                1 != this.a && 11 != this.a || this.nc.Wy();
                this.P && this.Pd && this.nc.as()
            },
            Vd: function() {},
            ra: function(a, b, c) {
                1 != this.a && 2 != this.a && 11 != this.a && (this.f.pj(this.mb()), b || this.pz(a), this.R = this.f.By(this.R, c), this.Pa.S("sessionId", null), this.Pa.S("serverSocketName", null), this.Pa.S("serverInstanceAddress", null), this.b.Zr(), q.logInfo(d.resolve(57), this, a));
                this.Of(!c)
            },
            Of: function(a) {
                this.Vi();
                this.reset();
                this.xc(a ? 11 : 1);
                q.logDebug(d.resolve(65), this)
            },
            Ru: function(a) {
                if (this.xc(3 == this.a ? 4 : 6)) {
                    this.Vi();
                    var b = a;
                    this.P && (a >= this.b.ie || this.b.S("pollingInterval", a), b = this.jw());
                    4 != this.a && b && 0 < b ? (q.logDebug(d.resolve(66)), this.nb(b)) : this.kd(this.na)
                }
            },
            kd: function(a, b, c) {
                a == this.na && (q.logDebug(d.resolve(67), this), a = "timeout." + this.a + "." + this.De, 11 == this.a && c && (a = c), 2 == this.a ? (this.ra("create.timeout", !0, !1), this.b.Lw(), this.nb(this.hi(), "create.timeout")) : 3 == this.a || 7 == this.a || 10 == this.a || 11 == this.a ? this.Sc || this.Tc ? this.f.Je(this.R, a + ".switch", this.Rf) : !this.P || this.Pd ? this.yb(this.sessionId, a) : this.f.Je(this.R, a, !1) : 5 == this.a ? (this.Wf--, this.Sc || this.Tc ? this.f.Je(this.R, a + ".switch", this.Rf) : 0 < this.Wf || this.Pd ? this.yb(this.sessionId, a) : this.P ? this.f.Je(this.R, a + ".switch", this.Rf) : this.Nc(this.R, a)) : 6 == this.a ? (this.P && this.nc.LA(b), this.Id("loop")) : 4 == this.a ? this.Id("loop1") : 8 == this.a ? this.PA() : 9 == this.a ? this.OA() : (q.logError(d.resolve(46), this), m.fail()))
            },
            rn: function() {
                return this.Pd || this.f.rn()
            },
            Nc: function(a, b) {
                var c = this.rn();
                c && this.ra("giveup", 1 != this.a && 11 != this.a ? !1 : !0, !0);
                this.f.Nc(a, b, c)
            },
            la: function(a, b, c, f, h, e) {
                h ? (this.ra(a, b, !1), this.nb(this.hi(), a)) : f ? (this.ra(a, b, !1), this.kd(this.na, 0, "openfail")) : 8 == this.a || 10 == this.a || 9 == this.a || 7 == this.a || 6 == this.a ? (this.ra(a, b, !1), e ? this.nb(this.hi(), a) : this.nb(g.randomG(this.b.Jl), a)) : 2 == this.a || 3 == this.a || 5 == this.a ? this.Tc && !this.Pd || k.isProbablyAndroidBrowser() ? this.f.Je(this.R, this.Bn + ".error", this.Rf) : (this.ra(a, b, !1), this.nb(this.hi(), a)) : (q.logError(d.resolve(47), a, this), m.fail())
            },
            zm: function(a) {
                this.ea && this.ea.Op && this.ea.Op();
                8 == this.a || 9 == this.a || 10 == this.a || 3 == this.a ? this.Tc ? this.f.Dn(this.R, this.Bn, this.Rf) : this.Sc ? this.f.Es(this.R) : this.Ru(a) : (q.logError(d.resolve(48), this), m.fail())
            },
            ma: function() {
                2 == this.a ? this.xc(3) && this.NA() : 3 != this.a && (7 == this.a || 5 == this.a || 9 == this.a || 10 == this.a || 8 == this.a ? this.xc(8) && this.QA() : (q.logError(d.resolve(49), this), m.fail()))
            },
            nl: function() {
                b.Kw();
                this.me = g.getTimeStamp();
                m.verifyOk(1 == this.a || 11 == this.a) || q.logError(d.resolve(50));
                if (!this.xc(2)) return ! 1;
                this.nb(this.b.Ke);
                this.ea = this.f.Up()
            },
            og: function() {
                this.me = g.getTimeStamp();
                m.verifyOk(6 == this.a || 4 == this.a) || q.logError(d.resolve(51), this);
                if (!this.xc(6 == this.a ? 7 : 5)) return ! 1;
                this.nb(this.zv());
                this.ea = this.f.Up()
            },
            nb: function(a, b) {
                return c.addTimedTask(this.kd, a, this, [this.na, a, b])
            },
            QA: function() {
                if (0 < this.b.jf) {
                    var a = g.getTimeStamp();
                    50 > a - this.Qq && this.km ? c.modifyTaskParam(this.km, 0, this.na) : (this.Qq = a, this.km = this.nb(this.b.jf))
                }
            },
            PA: function() {
                this.xc(9) && this.nb(this.b.Xj)
            },
            OA: function() {
                this.xc(10) && this.nb(this.b.od)
            },
            NA: function() {
                m.verifyValue(this.a, 3) || q.logError(d.resolve(52));
                this.nb(this.b.Xj)
            },
            zv: function() {
                return this.P ? this.b.Ke + this.b.Ti: 0 < this.Wf && null != this.od ? this.od: this.b.Ke
            },
            jw: function() {
                if (4 == this.a) return this.b.ie;
                var a = this.b.ie;
                if (this.me) var b = g.getTimeStamp() - this.me,
                a = a > b ? a - b: 0;
                return a
            },
            hi: function() {
                var a = g.getTimeStamp() - this.me;
                return a > this.b.Ej ? 0 : this.b.Ej - a
            },
            cu: function() {
                this.me || (q.logError(d.resolve(53), this), m.fail(), this.od = null);
                var a = g.getTimeStamp() - this.me,
                b = this.b.Ke;
                this.od = (a > b ? b: a) + b
            },
            Fy: function(a, c) { ! e.isUnloaded() && this.bc(c) && "" !== a && (null == a ? (b.Fj(), this.la("nullresp")) : this.ea.ro(c, a))
            },
            Hm: function(a, c, f, d, h) { ! e.isUnloaded() && this.bc(c) && (b.Fj(), this.la("failure." + a, !1, f, d, h))
            },
            Gm: function(a, c) {
                this.bc(a) && (b.Fj(), this.la("wrongend", null, c))
            },
            zp: function() {
                this.la("eval")
            },
            Cy: function() {
                this.Tc || this.Sc || this.f.Dy(this.R)
            },
            Hy: function() {
                p.isDebugLogEnabled() && p.logDebug(d.resolve(68));
                this.ma();
                8 == this.a && (this.Wf = 1)
            },
            Ay: function(a) {
                p.isDebugLogEnabled() && p.logDebug(d.resolve(69), a);
                this.Lf = a;
                this.b.S("maxBandwidth", a)
            },
            ly: function() {
                p.isDebugLogEnabled() && p.logDebug(d.resolve(70));
                this.la("error41", !0)
            },
            py: function() {
                p.isDebugLogEnabled() && p.logDebug(d.resolve(71));
                this.ma()
            },
            ty: function(a, b, c, f, h, e) {
                p.isDebugLogEnabled() && p.logDebug(d.resolve(72));
                var g = this.Jj;
                null == b || this.cm || (g = b = l.vu(g, b));
                g != this.rd && (this.f.pj(this.rd), this.rd = g, this.f.Em(this.rd));
                f && (this.P ? this.b.S("idleTimeout", f) : this.b.S("keepaliveInterval", f));
                2 == this.a ? this.sessionId = a: (m.verifyValue(this.sessionId, a) || q.logError(d.resolve(54)), this.cu());
                this.nc.vA(this.P);
                this.ma();
                3 == this.a ? (this.f.Oc(c), this.Pa.S("sessionId", a), this.Pa.S("serverSocketName", h), this.Pa.S("serverInstanceAddress", this.rd), this.Ik && (this.ji(), this.Ik = !1)) : this.f.yr(c);
                e && this.f.oy(e)
            },
            qy: function(a) {
                p.isDebugLogEnabled() && p.logDebug(d.resolve(73));
                this.zm(a)
            },
            Im: function(a) {
                b.Fj();
                this.la(a, !0)
            },
            mr: function(a) {
                p.isDebugLogEnabled() && p.logDebug(d.resolve(74), a);
                this.ra("end", !0, !0)
            },
            Km: function(a, b) {
                this.ma();
                this.f.Km(a, b)
            },
            ce: function(a) {
                this.ma();
                this.f.ce(a)
            },
            be: function(a) {
                this.ma();
                this.f.be(a)
            },
            de: function(a) {
                this.ma();
                this.f.de(a)
            },
            Am: function(a, b) {
                this.ma();
                this.f.Am(a, b)
            },
            Dm: function(a, b) {
                this.ma();
                this.f.Dm(a, b)
            },
            Bm: function(a, b, c, f) {
                this.ma();
                this.f.Bm(a, b, f, c)
            },
            ee: function(a, b) {
                this.ma();
                this.f.ee(a, b)
            },
            yf: function(a, b, c, f) {
                this.ma();
                this.f.yf(a, b, f, c)
            },
            Jm: function(a, b, c) {
                this.ma();
                this.f.Jm(a, b, c)
            },
            zf: function(a, b) {
                this.mr(b);
                this.f.zf(a, b)
            },
            onUnsubscription: function(a) {
                this.ma();
                this.f.onUnsubscription(a)
            },
            onSubscription: function(a, b, c, f, d) {
                this.ma();
                this.f.onSubscription(a, b, c, f, d)
            },
            Bf: function(a, b) {
                this.ma();
                this.f.Bf(a, b)
            },
            Di: function(b) {
                q.logInfo(d.resolve(58), this);
                var c = l.Uv(b, this.nc.Rl());
                b = new f(b, this, this.La, this.b);
                this.W.uc(this.sessionId, c, a.mk, b)
            },
            pz: function(b) {
                q.logInfo(d.resolve(59), this);
                b = l.Nv(this.sessionId, b);
                this.W.uc(this.sessionId, b, a.Bd, null, this.mb())
            },
            ji: function() {
                1 != this.a && 11 != this.a && (2 == this.a ? this.Ik = !0 : 0 >= this.Lf && 0 >= this.b.Jc || this.Lf != this.b.Jc && this.W.uc(null, l.Hv(this.b), a.kk, null))
            }
        };
        return n
    });
    define("lscAJ", [],
    function() {
        function e() {
            this.Um = !1;
            this.xj = 0;
            this.Vn = !1
        }
        e.prototype = {
            Dp: function(e, d) {
                if (!d && !this.jx(e)) return null;
                0 == this.xj && "/*" == e.substring(0, 2) && (this.Vn = !0);
                var c = -1;
                if (d && !this.Vn) c = e.length;
                else {
                    c = e.lastIndexOf(";\n");
                    if (0 > c) return null;
                    c += 2
                }
                var b = e.substring(this.xj, c);
                0 == this.xj && this.Vn && (b = b.substring(2, b.length));
                this.xj = c;
                return b
            },
            yn: function(e) {
                return this.Dp(e, !1)
            },
            xn: function(e) {
                return this.Dp(e, !0)
            },
            jx: function(e) {
                if (this.Um) return ! 0;
                var d = e.indexOf("setPhase("),
                c = e.indexOf("setPhase(ph)");
                if ( - 1 < d) {
                    if ( - 1 >= c) return this.Um = !0;
                    d = e.indexOf("setPhase(", d + 1);
                    if ( - 1 < d && e.lastIndexOf(";\n") > d) return this.Um = !0
                }
                return ! 1
            }
        };
        return e
    });
    define("lscAN", "lscAI Inheritance Executor BrowserDetection EnvironmentStatus lscAJ Environment LoggerManager lscAi lscAe".split(" "),
    function(e, g, d, c, b, h, f, a, l, m) {
        function k() {
            this._callSuperConstructor(k);
            this.i = !1;
            this.qb = this.Y = this.Zb = this.J = null;
            this.wn = !1;
            this.V = k
        }
        function n(a) {
            return function() {
                d.executeTask(a)
            }
        }
        var q = a.getLoggerProxy(m.Za),
        p = f.isBrowser() ? 2 : 3,
        t = !0,
        u;
        f.isNodeJS() && (u = l.lj("xmlhttprequest-cookie").XMLHttpRequest);
        var r = null;
        e.Yb(k, {
            ta: function() {
                if (null !== r) return r;
                c.isProbablyIE(9, !0) ? r = !1 : "undefined" != typeof XMLHttpRequest ? "undefined" != typeof(new XMLHttpRequest).withCredentials ? r = !0 : f.fx() && (r = !0) : !f.isBrowser() && u && (r = !0);
                null === r && (r = !1);
                return r
            },
            ff: function() {
                return ! c.isProbablyOldOpera() && !c.isProbablyPlaystation()
            },
            va: !0,
            ua: !0,
            Wb: function() {
                return f.isNodeJS() ? !0 : "file:" != m.$f ? !0 : f.isBrowserDocument() ? !1 : !0
            },
            Xb: !1,
            $b: !0
        });
        k.prototype = {
            toString: function() {
                return ["[|XSXHRConnection", this.i, this.J, this.Zb, "]"].join("|")
            },
            da: function() {
                if (this.i) {
                    q.logDebug(a.resolve(75));
                    this.J = null;
                    if (this.Y) try {
                        this.Y.abort()
                    } catch(b) {
                        q.logDebug(a.resolve(76))
                    }
                    this.Ja()
                }
            },
            pa: function(b, c, f, e, r) {
                if (this.i) return null;
                this.Y = u ? new u: new XMLHttpRequest;
                this.qb = new h;
                f = d.packTask(this.Fm, this, [c, f, r, e]);
                this.Y.onreadystatechange = n(f);
                this.J = c;
                this.Zb = null;
                q.logDebug(a.resolve(77), b.Sa());
                try {
                    this.Y.open(b.Ae, b.Sa(), !0);
                    this.Y.withCredentials = b.kp;
                    var g = b.Fl;
                    if (g) for (var k in g) this.Y.setRequestHeader(k, g[k]);
                    this.Y.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    this.Y.send(b.getData());
                    this.i = !0
                } catch(l) {
                    return q.logDebug(a.resolve(78), l),
                    !1
                }
                return ! 0
            },
            Fm: function(c, f, h, e) {
                this.J != c || b.isUnloaded() || (c = null, this.cf() && f && (3 == this.Y.readyState ? c = this.qb.yn(this.Y.responseText) : 4 == this.Y.readyState && (c = this.qb.xn(this.Y.responseText)), q.isDebugLogEnabled() && q.logDebug(a.resolve(79), c), null != c && d.executeTask(f, [c, this.J])), 4 == this.Y.readyState && (this.cf() || (this.wn ? (e && d.executeTask(e, ["status0", this.J, !1, t, !1]), t = !t, this.wn = !1) : f && d.executeTask(f, [null, this.J])), q.logDebug(a.resolve(80)), 4 != this.Y.readyState && "" != c || !h || d.addTimedTask(this.uf, 100, this, [this.J, h]), this.Ja()))
            },
            uf: function(a, b) {
                d.executeTask(b, [a])
            },
            Ja: function() {
                this.i = !1;
                this.J = null;
                this.Y && (delete this.Y.onreadystatechange, delete this.Y)
            },
            cf: function() {
                try {
                    if (null === this.Zb) {
                        if (this.Y.readyState < p) return ! 1;
                        this.Zb = 200 <= this.Y.status && 299 >= this.Y.status;
                        0 == this.Y.status && (this.wn = !0)
                    }
                    return this.Zb
                } catch(b) {
                    return q.logDebug(a.resolve(81), b),
                    !1
                }
            }
        };
        g(k, e);
        return k
    });
    define("lscAE", "lscAI Inheritance Executor EnvironmentStatus lscAJ LoggerManager lscAe".split(" "),
    function(e, g, d, c, b, h, f) {
        function a() {
            this._callSuperConstructor(a);
            this.i = !1;
            this.oa = this.qb = this.J = null;
            this.hh = 0;
            this.V = a
        }
        function l(a) {
            return function() {
                d.executeTask(a)
            }
        }
        var m = h.getLoggerProxy(f.Za),
        k = null;
        e.Yb(a, {
            ta: function() {
                return null !== k ? k: k = "undefined" != typeof XDomainRequest ? !0 : !1
            },
            ff: !0,
            va: !0,
            ua: !1,
            Wb: !1,
            Xb: !1,
            $b: !1
        });
        a.prototype = {
            toString: function() {
                return ["[|IEXSXHRConnection", this.i, this.J, "]"].join("|")
            },
            da: function() {
                if (this.i) {
                    m.logDebug(h.resolve(82));
                    this.J = null;
                    if (this.oa) try {
                        this.oa.abort()
                    } catch(a) {
                        m.logDebug(h.resolve(83))
                    }
                    this.Ja()
                }
            },
            pa: function(a, c, f, e, g) {
                if (this.i) return null;
                this.hh = 0;
                this.oa = new XDomainRequest;
                this.qb = new b;
                g = d.packTask(this.mz, this, [c, f, g, e]);
                var r = d.packTask(this.Io, this, [c, e, "xdr.err"]);
                e = d.packTask(this.Io, this, [c, e, "xdr.timeout"]);
                f = d.packTask(this.Mr, this, [c, f, !1]);
                this.oa.onload = l(g);
                this.oa.onerror = l(r);
                this.oa.ontimeout = l(e);
                this.oa.onprogress = l(f);
                this.J = c;
                m.logDebug(h.resolve(84), a.Sa());
                try {
                    this.oa.open(a.Ae, a.Sa()),
                    this.oa.send(a.getData()),
                    this.i = !0
                } catch(k) {
                    return m.logDebug(h.resolve(85), k),
                    !1
                }
                return ! 0
            },
            Io: function(a, b, f) {
                this.J != a || c.isUnloaded() || (m.logDebug(h.resolve(86)), d.executeTask(b, [f, a, !1, 0 == this.hh, !1]))
            },
            Mr: function(a, b, f) {
                this.J != a || c.isUnloaded() || (this.hh++, b && (a = f ? this.qb.xn(String(this.oa.responseText)) : this.qb.yn(String(this.oa.responseText)), m.isDebugLogEnabled() && m.logDebug(h.resolve(87), a), null != a && d.executeTask(b, [a, this.J])))
            },
            mz: function(a, b, f, e) {
                this.J != a || c.isUnloaded() || (0 == this.hh && -1 < String(this.oa.responseText).indexOf("LS_window.alert('License not valid for this Client version');") ? e && d.executeTask(e, ["license", a, !1, !0, !1]) : this.Mr(a, b, !0), this.Ja(), m.logDebug(h.resolve(88)), f && d.addTimedTask(this.uf, 100, this, [f, a]))
            },
            uf: function(a, b) {
                d.executeTask(a, [b])
            },
            Ja: function() {
                this.i = !1;
                this.qb = this.J = null;
                this.hh = 0;
                this.oa && (this.oa.onload = null, this.oa.onerror = null, this.oa.ontimeout = null, this.oa = this.oa.onprogress = null)
            }
        };
        g(a, e);
        return a
    });
    define("lscAA", ["lscAI", "Inheritance", "Executor"],
    function(e, g, d) {
        function c() {
            this._callSuperConstructor(c)
        }
        e.Yb(c, {
            ta: !1,
            va: !1,
            ua: !1,
            Wb: !1,
            Xb: !1,
            $b: !1
        });
        c.prototype = {
            pa: function(b, c, f) {
                f && d.addTimedTask(this.Lc, 1E3, this, [f, c]);
                return ! 0
            },
            Lc: function(b, c) {
                d.executeTask(b, ["", c])
            }
        };
        g(c, e);
        return c
    });
    define("IFrameHandler", ["BrowserDetection", "EnvironmentStatus", "Environment"],
    function(e, g, d) {
        var c = e.isProbablyAWebkit() && e.isProbablyChrome(32, !0) ? null: "about:blank",
        b = {},
        h = {
            createFrame: function(f, a) {
                if (!d.isBrowserDocument()) return null;
                var g = document.getElementsByTagName("BODY")[0];
                if (!g) return null;
                a = a || c;
                var h = document.createElement("iframe");
                h.style.visibility = "hidden";
                h.style.height = "0px";
                h.style.width = "0px";
                h.style.display = "none";
                h.name = f;
                h.id = f;
                e.isProbablyIE() || e.isProbablyOldOpera() ? (h.src = a, g.appendChild(h)) : (g.appendChild(h), h.src = a);
                try {
                    if (h.contentWindow) {
                        try {
                            h.contentWindow.name = f
                        } catch(k) {}
                        b[f] = h.contentWindow;
                        return b[f]
                    }
                    return document.frames && document.frames[f] ? (b[f] = document.frames[f], b[f]) : null
                } catch(k) {
                    return null
                }
            },
            getFrameWindow: function(c, a, d) {
                a && !b[c] && this.createFrame(c, d);
                return b[c] || null
            },
            disposeFrame: function(c) {
                if (b[c]) {
                    try {
                        document.getElementsByTagName("BODY")[0].removeChild(document.getElementById(c))
                    } catch(a) {}
                    delete b[c]
                }
            },
            removeFrames: function() {
                for (var c in b) try {
                    document.getElementsByTagName("BODY")[0].removeChild(document.getElementById(c))
                } catch(a) {}
                b = {}
            }
        };
        h.createFrame = h.createFrame;
        h.getFrameWindow = h.getFrameWindow;
        h.disposeFrame = h.disposeFrame;
        h.removeFrames = h.removeFrames;
        g.addUnloadHandler(h.removeFrames);
        return h
    });
    define("lscg", ["lscd", "Inheritance"],
    function(e, g) {
        function d() {}
        d.prototype = {
            Tl: function() {
                return 15
            },
            Wl: function(c) {
                return c ? encodeURIComponent(c).length - c.length: 0
            },
            Sn: function(c) {
                return "LS_querystring\x3d" + encodeURIComponent(c)
            }
        };
        g(d, e);
        return d
    });
    define("lscf", ["lscg", "Inheritance"],
    function(e, g) {
        function d() {}
        d.prototype = {
            toString: function() {
                return "[LegacyEncoder]"
            },
            Kg: function() {
                return ".html"
            },
            Sn: function(c) {
                return c
            }
        };
        g(d, e);
        return d
    });
    define("lscAB", "lscAI lscAA Inheritance IFrameHandler Executor Environment LoggerManager lscf lscAe lscAi".split(" "),
    function(e, g, d, c, b, h, f, a, l, m) {
        function k(a) {
            this._callSuperConstructor(k);
            a && (this.target = m.Hj(a), c.getFrameWindow(a, !0));
            this.i = !1;
            this.V = k;
            this.aj = 0
        }
        var n = new a,
        q = f.getLoggerProxy(l.Za);
        e.Yb(k, {
            ta: function() {
                return h.isBrowserDocument()
            },
            va: !0,
            ua: !0,
            Wb: !0,
            Xb: !0,
            $b: !1
        });
        k.prototype = {
            toString: function() {
                return ["[|FormConnection", this.target, "]"].join("|")
            },
            da: function() {
                q.logDebug(f.resolve(89));
                this.i = !1;
                this.aj++
            },
            pa: function(a, c, d, h) {
                if (this.i) return null;
                this._callSuperMethod(k, this.Vh, [a, c, d, h]);
                try {
                    this.aj++;
                    var e = this.tv();
                    if (!e) return ! 1;
                    q.logDebug(f.resolve(90), a.Sa());
                    e.Dc.method = a.Ae;
                    e.Dc.target = this.target;
                    e.Dc.action = a.Sa();
                    e.yj.value = a.getData();
                    e.Dc.submit();
                    b.addTimedTask(this.Hu, 1E3, this, [e.Dc, this.aj]);
                    return this.i = !0
                } catch(g) {
                    return q.logDebug(f.resolve(91), g),
                    !1
                }
            },
            tv: function() {
                var a = document.getElementsByTagName("BODY")[0];
                if (!a) return null;
                var b = {};
                b.Dc = document.createElement("FORM");
                try {
                    b.Dc.acceptCharset = "utf-8"
                } catch(c) {}
                b.Dc.style.display = "none";
                b.yj = document.createElement("INPUT");
                b.yj.type = "hidden";
                b.yj.name = "LS_querystring";
                b.Dc.appendChild(b.yj);
                a.appendChild(b.Dc);
                return b
            },
            Hu: function(a, b) {
                a.parentNode.removeChild(a);
                b == this.aj && (this.i = !1)
            },
            Rd: function() {
                return n
            }
        };
        d(k, g);
        return k
    });
    define("lscAC", "lscAI lscAA lscAH Inheritance IFrameHandler Executor EnvironmentStatus Environment lscAB LoggerManager lscf lscAe lscAi".split(" "),
    function(e, g, d, c, b, h, f, a, l, m, k, n, q) {
        function p(a) {
            this._callSuperConstructor(p);
            this.target = q.Hj(a);
            this.vc = 0;
            this.i = !1;
            this.Ei = null;
            b.getFrameWindow(this.target, !0);
            this.V = p
        }
        var t = new k,
        u = m.getLoggerProxy(n.Za);
        e.Yb(p, {
            ta: function() {
                return a.isBrowserDocument()
            },
            va: !1,
            ua: !1,
            Wb: !0,
            Xb: !0,
            ff: !0,
            $b: !1
        });
        p.prototype = {
            toString: function() {
                return ["[|FrameConnection", this.i, this.target, this.vc, this.Ei, "]"].join("|")
            },
            pt: function(a) {
                a == this.vc && (this.vc++, this.i && (this.to(this.vc, d.Jt), this.i = !1))
            },
            da: function() {
                u.logDebug(m.resolve(92));
                var a = ++this.vc;
                h.addTimedTask(this.pt, 0, this, [a])
            },
            to: function(a, c, d, h, e) {
                if (a == this.vc && !f.isUnloading()) {
                    this._callSuperMethod(p, this.Vh, [c, d, h, e]);
                    this.vc++;
                    u.logDebug(m.resolve(93), c.Sa());
                    try {
                        b.getFrameWindow(this.target).location.replace(c.Bw()),
                        this.i = !0
                    } catch(g) {
                        return u.logDebug(m.resolve(94), g),
                        !1
                    }
                    return ! 0
                }
            },
            Cx: function(a, b, c, f) {
                this.Ei || (this.Ei = new l(this.target));
                this.vc++;
                if (a = this.Ei.pa(a, b, c, f)) this.i = !0;
                return a
            },
            pa: function(a, b, c, f) {
                if (a.method == d.Th) return this.Cx(a, b, c, f);
                var e = ++this.vc;
                h.addTimedTask(this.to, 0, this, [e, a, b, c, f]);
                return ! 0
            },
            Rd: function() {
                return t
            }
        };
        c(p, g);
        return p
    });
    define("Dismissable", ["Executor"],
    function(e) {
        function g() {
            this.initTouches()
        }
        g.prototype = {
            clean: function() {},
            initTouches: function(d) {
                this.In = this.$e = 0;
                this.timeout = d || 5E3
            },
            YA: function(d) {
                d == this.In && 0 >= this.$e && this.clean()
            },
            dismiss: function() {
                this.$e--;
                0 >= this.$e && e.addTimedTask(this.YA, this.timeout, this, [this.In])
            },
            touch: function() {
                this.In++;
                0 > this.$e && (this.$e = 0);
                this.$e++
            }
        };
        g.prototype.touch = g.prototype.touch;
        g.prototype.dismiss = g.prototype.dismiss;
        g.prototype.clean = g.prototype.clean;
        g.prototype.initTouches = g.prototype.initTouches;
        return g
    });
    define("lscy", "LoggerManager lscAC lscAH lscAi Executor EnvironmentStatus IFrameHandler Global Environment Inheritance Dismissable lscAe Helpers".split(" "),
    function(e, g, d, c, b, h, f, a, l, m, k, n, q) {
        function p(a) {
            this.path = a;
            this.kg = q.randomG();
            this.status = l.isBrowserDocument() && (window.ActiveXObject || "undefined" != typeof XMLHttpRequest) ? 2 : -1;
            this.bi = ++u;
            this.Ra = "LS_AJAXFRAME_" + this.bi;
            this.initTouches();
            this.Xt()
        }
        var t = e.getLoggerProxy(n.Za),
        u = 0,
        r = {};
        p.xv = function(a) {
            r[a] || (r[a] = new p(a), r[a].pa(!1));
            return r[a]
        };
        p.prototype = {
            toString: function() {
                return ["[|AjaxFrameHandler", this.status, "]"].join("|")
            },
            Xt: function() {
                var b = this;
                a.ia(this.bi, "LS_a",
                function(a) {
                    b.hy(a)
                },
                "A")
            },
            clean: function() {
                this.status = -1;
                a.mi(this.bi, "LS_a", "A");
                var b = this.path;
                r[b] && delete r[b];
                f.disposeFrame(this.Ra)
            },
            Hc: function(a) {
                this.kg++;
                this.status = a ? 3 : 0
            },
            pa: function(a) {
                if ( - 1 != this.status && (t.logDebug(e.resolve(95)), !this.Aa())) {
                    this.Hc(a);
                    a = this.kg;
                    c.Hq() && t.logDebug(e.resolve(96));
                    var f = "id\x3d" + this.bi + "\x26";
                    c.$l() || (f += "domain\x3d" + c.Ec() + "\x26");
                    f = new d(this.path, "xhr.html", f); (new g(this.Ra)).pa(f);
                    b.addTimedTask(this.qv, 1E4, this, [a]);
                    b.addTimedTask(this.Fw, 2E3, this, [a])
                }
            },
            hy: function() {
                h.isUnloaded() || 1 == this.status || (t.logDebug(e.resolve(97)), this.status = 1)
            },
            qv: function(a) { - 1 == this.status || this.kg != a || this.Aa() || (t.logDebug(e.resolve(98)), this.pa(!0))
            },
            Fw: function(a) { - 1 == this.status || this.kg != a || this.Aa() || (t.logDebug(e.resolve(99)), this.status = 4)
            },
            disable: function() {
                this.status = -1;
                this.kg++
            },
            Aa: function() {
                return 1 === this.status
            },
            Eq: function() {
                return - 1 === this.status || 3 === this.status || 4 === this.status
            },
            uz: function(a, b, c, d) {
                if (this.Eq()) return ! 1;
                if (1 !== this.status) return null;
                t.logDebug(e.resolve(100), a);
                var h;
                try {
                    h = !1 !== f.getFrameWindow(this.Ra).sendRequest(a, b, c, d)
                } catch(r) {
                    h = !1,
                    t.logDebug(e.resolve(101), r)
                } ! 1 === h && this.disable();
                return h
            }
        };
        m(p, k, !0, !0);
        return p
    });
    define("lscAL", "lscAI Inheritance lscy EnvironmentStatus Executor Environment LoggerManager lscAe".split(" "),
    function(e, g, d, c, b, h, f, a) {
        function l() {
            this._callSuperConstructor(l);
            this.error = this.response = this.Zb = this.sender = this.J = null;
            this.i = !1;
            this.a = 0;
            this.LS_x = this.my;
            this.Kc = null;
            this.V = l
        }
        var m = f.getLoggerProxy(a.Za);
        e.Yb(l, {
            ta: function() {
                return h.isBrowserDocument() && (window.ActiveXObject || "undefined" != typeof XMLHttpRequest)
            },
            va: !1,
            ua: !1,
            Wb: !0,
            Xb: !1,
            $b: !0
        });
        l.prototype = {
            toString: function() {
                return ["[|XHRConnection", this.i, this.a, this.J, "]"].join("|")
            },
            pa: function(a, b, c, h, e) {
                this.Kc = d.xv(a.wb);
                if (this.Kc.Eq()) return this.Kc.dismiss(),
                !1;
                if (!this.Kc.Aa() || this.i) return null;
                this.Kc.touch();
                this.J = b;
                this.Zb = null;
                this.response = c;
                this.error = h;
                this.gp = e;
                this.a++;
                var g = this,
                r = this.a;
                this.LS_h = function() {
                    g.xr(r)
                };
                this.i = !0;
                m.logDebug(f.resolve(102), a.Sa());
                return this.Kc.uz(a.Sa(), a.getData(), this, a.Fl)
            },
            da: function() {
                if (this.i) {
                    this.Ja();
                    m.logDebug(f.resolve(103));
                    try {
                        this.sender && this.sender.abort && this.sender.abort()
                    } catch(a) {
                        m.logDebug(f.resolve(104), a)
                    }
                    this.ni()
                }
            },
            cf: function() {
                try {
                    if (null === this.Zb) {
                        if (2 > this.sender.readyState) return ! 1;
                        this.Zb = 200 <= this.sender.status && 299 >= this.sender.status
                    }
                    return this.Zb
                } catch(a) {
                    return m.logDebug(f.resolve(105), a),
                    !1
                }
            },
            xr: function(a) {
                c.isUnloaded() || a != this.a || !this.sender || 4 != this.sender.readyState && "complete" != this.sender.readyState || (a = null, this.cf() && (a = this.sender.responseText, a = a.toString(), "/*" == a.substring(0, 2) && (a = a.substring(2, a.length - 2))), m.isDebugLogEnabled() && m.logDebug(f.resolve(106), a), this.response && b.executeTask(this.response, [a, this.J]), b.addTimedTask(this.uf, 100, this, [this.J]), this.Ja(), this.ni())
            },
            uf: function(a) {
                b.executeTask(this.gp, [a])
            },
            my: function() {
                c.isUnloaded() || (this.Kc.disable(), m.logDebug(f.resolve(107)), this.Ja(), this.error && b.executeTask(this.error, ["xhr.unknown", this.J, !1, !1, !1]), this.ni())
            },
            ni: function() {
                try {
                    delete this.sender.onreadystatechange
                } catch(a) {
                    m.logDebug(f.resolve(108), a)
                }
                try {
                    delete this.sender
                } catch(a) {
                    m.logDebug(f.resolve(109), a)
                }
                this.response = this.error = null;
                this.Kc && this.Kc.dismiss()
            },
            Ja: function() {
                this.i = !1;
                this.a++
            }
        };
        g(l, e);
        return l
    });
    define("lscAM", "lscAI lscAL Inheritance EnvironmentStatus Executor BrowserDetection lscAJ Environment LoggerManager lscAe".split(" "),
    function(e, g, d, c, b, h, f, a, l, m) {
        function k() {
            this._callSuperConstructor(k);
            this.qb = null;
            this.V = k
        }
        var n = l.getLoggerProxy(m.Za),
        q = null;
        e.Yb(k, {
            ta: function() {
                return null !== q ? q: q = a.isBrowserDocument() ? h.isProbablyIE() ? !1 : "undefined" != typeof XMLHttpRequest ? "undefined" != typeof(new XMLHttpRequest).addEventListener: !1 : !1
            },
            ff: function() {
                return ! h.isProbablyOldOpera()
            },
            va: !1,
            ua: !1,
            Wb: !0,
            Xb: !1,
            $b: !0
        });
        k.prototype = {
            toString: function() {
                return ["[|XHRStreamingConnection", this.i, this.a, this.J, "]"].join("|")
            },
            pa: function(a, b, c, d, h) {
                a = this._callSuperMethod(k, this.Vh, [a, b, c, d, h]);
                n.logDebug(l.resolve(110));
                a && (this.qb = new f);
                return a
            },
            xr: function(a) { ! c.isUnloaded() && a == this.a && this.sender && (a = null, this.cf() && this.response && (3 == this.sender.readyState ? a = this.qb.yn(this.sender.responseText) : 4 == this.sender.readyState && (a = this.qb.xn(this.sender.responseText)), n.isDebugLogEnabled() && n.logDebug(l.resolve(111), a), null != a && b.executeTask(this.response, [a, this.J])), 4 == this.sender.readyState && (!this.cf() && this.response && b.executeTask(this.response, [null, this.J]), n.isDebugLogEnabled() && n.logDebug(l.resolve(112)), 4 != this.sender.readyState && "" != a || !this.gp || b.addTimedTask(this.uf, 100, this, [this.J]), this.Ja(), this.ni()))
            }
        };
        d(k, g);
        return k
    });
    define("lscAg", ["Executor", "IFrameHandler", "Global", "BrowserDetection", "lscAi"],
    function(e, g, d, c, b) {
        function h(a) {
            this.Gl = a;
            this.ready = !1;
            this.om = b.Ec();
            this.tp = this.Ai = !1;
            this.gj = -1;
            this.wp = a = b.Hj(this.$p() + "_" + this.om);
            e.addTimedTask(this.nu, 3E3, this);
            var c = "about:blank";
            this.jj() && (this.gj = ++f, c = d.ia(this.gj, "EQCallback_" + a, this.Dw(), "Q"), c = "javascript:(function(){document.open();" + ("document.domain\x3d'" + b.Ec() + "';") + ("parent." + c + "(window);") + "document.close();})()");
            try {
                this.ec = g.getFrameWindow(a, !0, c),
                this.Qx() ? e.addTimedTask(this.vl, 1, this) : this.jj() || this.vl()
            } catch(h) {}
        }
        var f = 0;
        h.prototype = {
            Zp: function() {
                return null
            },
            verify: function() {
                return ! 0
            },
            w: function() {
                e.addTimedTask(g.disposeFrame, 0, g, [this.wp]);
                null !== this.gj && d.mi(this.gj, "EQCallback_" + this.wp, "Q");
                this.tp = !0
            },
            Qf: function() {
                return this.Ai || this.tp ? !1 : b.Ec() == this.om ? !0 : this.wm() ? !1 : !0
            },
            Aa: function() {
                return this.ready
            },
            vl: function() {
                var a = this.Zp();
                this.jj() ? this.ec.document.write("\x3cscript\x3edocument.domain\x3d'" + this.om + "';\x3c/script\x3e") : c.isProbablyOldOpera() && !a || this.ec.document.open();
                a && this.ec.document.write(a);
                this.jj() || c.isProbablyOldOpera() && !a || this.ec.document.close();
                this.ready = this.verify()
            },
            Dw: function() {
                var a = this;
                return function(b) {
                    a.ec = b;
                    a.vl()
                }
            },
            jj: function() {
                return c.isProbablyIE() && !b.$l()
            },
            wm: function() {
                return c.isProbablyIE() || c.isProbablyOldOpera() || c.isProbablyKonqueror(4.4, !0)
            },
            Qx: function() {
                return c.isProbablyKonqueror()
            },
            ut: function(a, b) {
                this.Ai = !0;
                this.Gl && (this.Gl.Mb = [a, b], e.executeTask(this.Gl))
            },
            nu: function() {
                this.ready || this.ut(5)
            }
        };
        return h
    });
    define("lscAG", "LoggerManager Executor lscAg Inheritance Dismissable lscAe Helpers".split(" "),
    function(e, g, d, c, b, h, f) {
        function a(b, c) {
            this.At = b;
            this._callSuperConstructor(a, [c]);
            this.vg = null;
            this.initTouches()
        }
        function l(a, b, c) {
            try {
                a.appendChild(b),
                b.src = c
            } catch(f) {}
        }
        var m = e.getLoggerProxy(h.Za);
        a.prototype = {
            toString: function() {
                return "[JSONPFrame]"
            },
            Wt: function(a, b) {
                try {
                    var c = this.Iv();
                    if (!c) return c;
                    var f = this.ec.document.createElement("script");
                    f.id = a;
                    f.type = "text/javascript";
                    g.addTimedTask(l, 50, null, [c, f, b])
                } catch(d) {
                    return m.logDebug(e.resolve(113), d),
                    !1
                }
                return ! 0
            },
            Ku: function(a) {
                var b = this.ec.document.getElementById(a);
                g.addTimedTask(function() {
                    b && b.parentNode && b.parentNode.removeChild(b)
                },
                4E3)
            },
            clean: function() {
                this.w()
            },
            Iv: function() {
                if (this.vg) return this.vg;
                this.vg = this.ec.document.getElementsByTagName("BODY")[0];
                if (!this.vg) {
                    if (this.fc) return 2E3 < f.getTimeStamp() - this.fc ? !1 : null;
                    this.fc = f.getTimeStamp();
                    return null
                }
                return this.vg
            },
            $p: function() {
                return "LS6__JF_" + this.At
            }
        };
        c(a, d);
        c(a, b, !0, !0);
        return a
    });
    define("lsce", ["lscg", "Inheritance"],
    function(e, g) {
        function d() {}
        d.prototype = {
            toString: function() {
                return "[JSONPEncoder]"
            }
        };
        g(d, e);
        return d
    });
    define("lscAF", "lscAI lscAA Inheritance Helpers Environment lscAG Executor LoggerManager lsce lscAe".split(" "),
    function(e, g, d, c, b, h, f, a, l, m) {
        function k(a) {
            this._callSuperConstructor(k);
            this.originalTarget = a;
            this.target = a + c.randomG();
            this.Ab = new h(this.target, f.packTask(this.cr, this));
            this.vi = 0;
            this.cn = "script_" + c.randomG();
            this.fc = null;
            this.Fo = !1;
            this.Ip = !0;
            this.V = k
        }
        var n, q;
        for (q in {
            Lj: !0
        }) n = q;
        var p = a.getLoggerProxy(m.Za),
        t = /(^|&)LS_domain=[^&]*/,
        u = new l;
        e.Yb(k, {
            ta: function() {
                return b.isBrowserDocument()
            },
            va: !0,
            ua: !0,
            Wb: !0,
            Xb: !0,
            $b: !1
        });
        k.prototype = {
            toString: function() {
                return ["[|JSONPConnection", this.target, this.cn, this.fc, "]"].join("|")
            },
            cr: function() {
                this.Fo = !0
            },
            Lj: function(a, b, c, f, d, h) { (this.Ip || 10 == this.vi) && a.xi("LS_force_head\x3dtrue\x26");
                this.Ip = !1;
                var e = a.getData(),
                e = e.replace(t, "");
                0 == e.indexOf("\x26") && (e = e.substring(1));
                a.setData(e);
                return this._callSuperMethod(k, n, [a, b, c, f, d, h])
            },
            pa: function(b, d, e, g) {
                this.da();
                if (this.Fo) return ! 1;
                if (!this.Ab.Qf() && this.Ab.wm() || 10 == this.vi) this.Ab.w(),
                this.vi = 0,
                this.target = this.originalTarget + c.randomG(),
                this.Ab = new h(this.target, f.packTask(this.cr, this));
                if (!this.Ab.Aa()) return null;
                this.vi++;
                p.logDebug(a.resolve(114), b.Sa());
                var l = b.Sa(),
                m = b.getData(),
                l = this.Ab.Wt(this.cn, l + "?" + m);
                if (!l) return l;
                this.Ab.touch();
                this._callSuperMethod(k, this.Vh, [b, d, e, g]);
                return ! 0
            },
            da: function() {
                this.Ab.dismiss();
                if (this.Ab.Qf() || !this.Ab.wm()) {
                    p.logDebug(a.resolve(115));
                    try {
                        this.Ab.Ku(this.cn)
                    } catch(b) {}
                }
            },
            Rd: function() {
                return u
            }
        };
        d(k, g);
        return k
    });
    define("lscz", "LoggerManager lscAN lscAE lscAM lscAL lscAC lscAF lscAB lscAA lscAK lscAe".split(" "),
    function(e, g, d, c, b, h, f, a, l, m, k) {
        function n(a, b, c) {
            this.pm = a;
            this.bu = b;
            this.Ko = c;
            this.wj = -1
        }
        function q() {
            return ! 1
        }
        var p = e.getLoggerProxy(k.Za);
        n.sB = function() {
            m.ta = q
        };
        n.tB = function() {
            g.ta = q;
            d.ta = q;
            c.ta = q;
            b.ta = q
        };
        n.rB = function() {
            a.ta = q;
            h.ta = q
        };
        n.mo = [];
        k = [g, d, c, h];
        for (var t = 0; t < k.length; t++) k[t].ff() && n.mo.push(k[t]);
        n.at = [g, d, b, f, a];
        n.ag = [g, d, b, f, h];
        n.bx = function(a) {
            return a.V === h
        };
        n.EB = function(a) {
            return a.V.prototype.Lc != l.prototype.Lc
        };
        n.bf = function(a, b, c, f, d, h, g) {
            p.logDebug(e.resolve(116), b);
            if (!b.ta(a)) return p.logDebug(e.resolve(117)),
            !1;
            if (c && !b.va()) return p.logDebug(e.resolve(118)),
            !1;
            if (f && !b.Wb()) return p.logDebug(e.resolve(119)),
            !1;
            if (d && !b.ua()) return p.logDebug(e.resolve(120)),
            !1;
            if (h && !b.$b()) return p.logDebug(e.resolve(121)),
            !1;
            if (a = g) {
                a: {
                    for (a = 0; a < g.length; a++) if (g[a] == b) {
                        b = !0;
                        break a
                    }
                    b = !1
                }
                a = !b
            }
            if (a) return p.logDebug(e.resolve(122)),
            !1;
            p.logDebug(e.resolve(123));
            return ! 0
        };
        n.prototype = {
            am: function() {
                return this.wj < this.pm.length - 1
            },
            kq: function(a, b, c, f, h) {
                for (p.logDebug(e.resolve(124), a, b, c, f, h); this.am();) {
                    this.wj++;
                    var l = this.pm[this.wj];
                    if (! ((this.Ko || this.bu) && l === d || this.Ko && l === g) && this.bf(a, l, b, c, f, h)) return l
                }
                return null
            },
            bf: function(a, b, c, f, d, h) {
                return n.bf(a, b, c, f, d, h, this.pm)
            },
            sc: function() {
                p.logDebug(e.resolve(125));
                this.wj = -1
            }
        };
        return n
    });
    define("lscAD", ["lscAC", "BrowserDetection", "IFrameHandler", "Executor"],
    function(e, g, d, c) {
        function b() {
            this.ij = !1
        }
        b.prototype = {
            Uy: function(b) { (this.ij = b === e) && d.getFrameWindow("LS6__HOURGLASS", !0)
            },
            yA: function() {
                c.addTimedTask(this.zA, 900, this)
            },
            zA: function() {
                if (this.ij && (this.ij = !1, !g.isProbablyAKhtml() && !g.isProbablyIE(6, !0) && !g.isProbablyIE(9, !1))) try {
                    window.open("about:blank", "LS6__HOURGLASS", null, !0)
                } catch(b) {}
            }
        };
        return b
    });
    define("lsct", "lscAe Inheritance lscr lscz lscAD lscAH lscAi lscq Executor LoggerManager BrowserDetection EnvironmentStatus lscAE lscAN".split(" "),
    function(e, g, d, c, b, h, f, a, l, m, k, n, q, p) {
        function t(a, b, c, f, d, h) {
            this._callSuperConstructor(t, arguments);
            this.Be = this.hj = this.cc = this.qa = this.mp = null;
            this.If(h)
        }
        function u(a) {
            a && a != x || (x++, z = 1)
        }
        var r = {
            yb: "createSession",
            Id: "bindSession",
            Of: "shutdown",
            og: "bindSent",
            ma: "onEvent",
            la: "onErrorEvent"
        },
        r = f.getReverse(r),
        z = 1,
        x = 1,
        D = m.getLoggerProxy(e.Cd),
        B = m.getLoggerProxy(e.ue);
        t.prototype = {
            If: function(a) {
                a = a || !this.b.pi;
                this.mp = new c(c.ag, !1, a);
                this.cc = this.P ? new c(c.ag, !1, a) : new c(c.mo, !this.b.Tn, a);
                this.qa = null
            },
            Sp: function() {
                return this.P ? e.Xc: e.se
            },
            Xp: function() {
                return this.P ? e.Xc: e.bg
            },
            toString: function() {
                return ["[|SessionHTTP", this.P, this.Pd, this.a, this.na, this.La, this.Wf, this.sessionId, this.Tc, this.Sc, "]"].join("|")
            },
            yb: function(a, b) {
                if (!this._callSuperMethod(t, r.createSession, [a, b])) return ! 1;
                this.ol(this.na, b, a);
                return ! 0
            },
            ol: function(a, b, c) {
                if (a == this.na) {
                    this.f.rp();
                    if (f.Hq()) {
                        if (0 >= z) {
                            D.logDebug(m.resolve(127));
                            l.addTimedTask(this.ol, 3E3, this, [a, c, "offline"]);
                            return
                        }
                        z--;
                        0 == z && l.addTimedTask(u, 2E4, null, [x])
                    }
                    a = this.Ap(c, this.ol, b);
                    null !== a && (a ? this.nl() : !1 === a && (D.logWarn(m.resolve(126)), this.la("no_impl_available", !0, !1, !1, !0)))
                }
            },
            Id: function(a) {
                if (!this._callSuperMethod(t, r.bindSession, [a])) return ! 1;
                this.Be && this.Be.da();
                this.lv();
                this.fi(this.na, a);
                return ! 0
            },
            lv: function() {
                if (!n.isLoaded() && (null === this.b.Wj && (k.isProbablyAndroidBrowser() || k.isProbablyApple()) || !0 === this.b.Wj)) {
                    var a = this.De,
                    b = this;
                    n.addOnloadHandler(function() {
                        l.addTimedTask(function() {
                            a == b.De && b.a == d.it && b.Di("spinfix")
                        },
                        b.b.tn)
                    })
                }
            },
            fi: function(a, c) {
                if (a == this.na) {
                    this.hj || this.P || (this.hj = new b);
                    var f = this.Ap(null, this.fi, c);
                    null !== f && (f ? this.og() : !1 !== f || this.P || this.Nc(this.R, "streaming.unavailable"))
                }
            },
            Vd: function() {
                this.a != d.uk && this.a != d.Ad && this.a != d.sk && (0 < this.b.Nb && !this.P ? this.W.uA(this.b.Nb) : this.W.Gs())
            },
            Of: function(a) {
                this._callSuperMethod(t, r.shutdown, [a]);
                this.Be && this.Be.da()
            },
            Gi: function(b, c, f) {
                var r = this.a == d.uk || this.a == d.sk,
                g = this.mb(),
                g = new h(g + e.nk);
                g.th(this.b.Ib());
                g.vh(this.b.Eg(r));
                var l = !g.ua() && !g.va();
                b = a.iw(this.La, this.sessionId, this.b, this.Pa, r, this.P, b, c, this.nc.Rl(), f, l);
                g.setData(b);
                B.logDebug(m.resolve(128), g);
                return g
            },
            Ap: function(b, f, e) {
                var r = this.a == d.uk || this.a == d.sk,
                g = !r,
                k = this.Gi(b, e, !0),
                t = this.mb();
                this.W.Ek(null);
                this.qa && this.qa.V == q && (this.qa = null);
                var u = r ? this.mp: this.cc;
                this.qa && !u.bf(t, this.qa.V, k.va(), this.b.Ib(), k.ua(), this.b.Pg(r)) && (u.sc(), this.qa = null);
                for (var z = !1,
                n = (this.P ? "LS6__POLLFRAME": "LS6__PUSHFRAME") + "_" + this.Qa; (this.qa || u.am()) && !1 === z;) {
                    if (!this.qa) {
                        z = u.kq(t, k.va(), this.b.Ib(), k.ua(), this.b.Pg(r));
                        if (!z) return u.sc(),
                        !1;
                        this.qa = new z(n)
                    }
                    k.Pj(c.bx(this.qa) && g ? h.nt: h.Th);
                    k.Nf(a.nq(r, this.P, this.qa.Rd().Kg()));
                    z = this.qa.Lj(k, this.La, this.Pk, this.Ok, this.Nk, this.Qa);
                    if (null === z) return D.logDebug(m.resolve(129)),
                    l.addTimedTask(f, 50, this, [this.na, e, b]),
                    null; ! 1 === z ? this.qa = null: (D.logDebug(m.resolve(130)), u.sc(), this.Be = this.qa)
                }
                return z
            },
            og: function() {
                this._callSuperMethod(t, r.bindSent);
                this.vm() && this.hj.Uy(this.Be.V)
            },
            vm: function() {
                return ! this.P
            },
            la: function(a, b, c, f, d, h) { ! f || this.qa.V != p && this.qa.V != q || this.f.ky(this.R);
                this._callSuperMethod(t, r.onErrorEvent, arguments)
            },
            ma: function() {
                this.a == d.eo && u(); ! this.vm() || this.a != d.$s && this.a != d.eo || this.hj.yA();
                this._callSuperMethod(t, r.onEvent)
            }
        };
        g(t, d);
        return t
    });
    define("lscu", "lscAe lscr lsct Inheritance lscAK lscz lscq Executor LoggerManager ASSERT lscAH lscAi".split(" "),
    function(e, g, d, c, b, h, f, a, l, m, k, n) {
        function q(a, b, c, f, d, h) {
            this._callSuperConstructor(q, arguments);
            this.X = null;
            this.Sb = 1;
            this.Df = null;
            this.Se = !1
        }
        var p = {
            nl: "createSent",
            kd: "onTimeout",
            zm: "onLoop",
            Hm: "onStreamError",
            Gm: "onStreamEnd",
            la: "onErrorEvent",
            Of: "shutdown"
        },
        p = n.getReverse(p),
        t = l.getLoggerProxy(e.Cd);
        q.prototype = {
            toString: function() {
                return ["[|SessionWS", this.P, this.Pd, this.a, this.na, this.La, this.Sb, this.Wf, this.sessionId, this.X, this.Tc, this.Sc, "]"].join("|")
            },
            Kd: function(a) {
                this.Sb = a
            },
            Sp: function() {
                return this.P ? e.ye: e.eg
            },
            Xp: function() {
                return e.bg
            },
            Mm: function() {
                m.verifyValue(this.Sb, 1) || t.logError(l.resolve(131));
                this.Df = this.La;
                this.X = new b(this);
                var a = this.mb(),
                c = new k(a + e.nk);
                c.th(this.b.Ib());
                c.vh(this.b.Eg(!1));
                if (h.bf(a, b, c.va(), this.b.Ib(), c.ua(), this.b.Pg(!1)) && (t.logDebug(l.resolve(138)), this.X.Jy(c, this.Df, this.Pk, this.Ok, this.Nk))) return this.W.Ek(this.X),
                this.Kd(2),
                !0;
                this.Kd(5);
                return ! 1
            },
            nl: function() {
                this._callSuperMethod(q, p.createSent);
                this.b.xl && !this.Se && this.Mm()
            },
            fi: function(c, d) {
                if (c == this.na) if (this.Se = !1, 1 == this.Sb ? this.Mm() : 2 != this.Sb || this.X.Ww(this.mb()) || (t.logWarn(l.resolve(136)), this.X.da(), this.Kd(1), this.Mm()), 6 == this.Sb) this.Nc(this.R, "ws.early.closed");
                else if (5 == this.Sb) this.Nc(this.R, "ws.notgood");
                else if (3 == this.Sb) b.rl(this.mb()),
                this.Nc(this.R, "ws.early.openfail");
                else {
                    var h = this.Gi(null, d, !1),
                    e = !1;
                    h.Nf(f.nq(!1, this.P, this.X.Rd().Kg()));
                    var g = !1;
                    2 == this.Sb ? (e = this.X.Lj(h, this.La, this.Pk, this.Ok, this.Nk, this.Qa), g = !0) : 4 == this.Sb ? e = this.X.gg(h, this.La) : (m.fail(), t.logError(l.resolve(132), this));
                    null === e ? (t.logDebug(l.resolve(139)), a.addTimedTask(this.fi, 50, this, [c, d])) : !1 === e ? (t.logWarn(l.resolve(137)), this.Nc(this.R, "ws.false")) : g || (t.logDebug(l.resolve(140)), this.og())
                }
            },
            kv: function(a) {
                this.Df == a && (t.logDebug(l.resolve(141)), this.og(), this.Kd(4))
            },
            kd: function(a, b, c) {
                a == this.na && (this.a == g.Ad && (this.Se = !0), this._callSuperMethod(q, p.onTimeout, [a, b, c]))
            },
            zm: function(a) {
                this._callSuperMethod(q, p.onLoop, [a]);
                this.X && this.X.Ps(this.La)
            },
            Hm: function(a, b, c, f, d) {
                c ? b == this.Df && this._callSuperMethod(q, p.onStreamError, [a, this.La, c, f, d]) : (this.a == g.Ad && (this.Se = !0), this._callSuperMethod(q, p.onStreamError, arguments))
            },
            Gm: function(a, b) {
                b ? a == this.Df && (this.a == g.et || this.a == g.Ad || this.a == g.co ? this.la("ws.early.end", !1, !0) : (m.verifyDiffValue(this.a, g.fo) || t.logError(l.resolve(133), this), this._callSuperMethod(q, p.onStreamEnd, [this.La, b]))) : (this.a == g.Ad && (this.Se = !0), this._callSuperMethod(q, p.onStreamEnd, arguments))
            },
            la: function(a, c, f, d, h, e) {
                f ? (m.verifyDiffValue(this.Sb, 1) || t.logError(l.resolve(134), this), d ? this.Kd(3) : this.Kd(6), this.a == g.et || this.a == g.Ad || this.a == g.co ? t.logDebug(l.resolve(142), this) : this.a == g.fo ? (t.logDebug(l.resolve(143), this), d && b.rl(this.mb()), this.Nc(this.R, "ws.error." + a)) : this.P && this.a == g.ft ? (m.verifyNotOk(d) || t.logError(l.resolve(135), this), t.logDebug(l.resolve(144), this), this.ra(a, c, !1), this.kd(this.na, 0, "ws.broken.wait")) : this._callSuperMethod(q, p.onErrorEvent, arguments)) : (this.a == g.Ad && (this.Se = !0), this._callSuperMethod(q, p.onErrorEvent, arguments))
            },
            Of: function(a) {
                this._callSuperMethod(q, p.shutdown, [a]);
                this.X && (this.Df = null, this.X.da(), this.X = null, this.W.Ek(null));
                this.Kd(1)
            },
            vm: function() {
                return ! 1
            },
            Vd: function() {
                this.W.Gs()
            }
        };
        c(q, d);
        return q
    });
    define("lscv", ["LoggerManager", "Global", "Helpers", "ASSERT", "lscAe"],
    function(e, g, d, c, b) {
        function h(a, b) {
            this.Aj = 0;
            this.Ia = null;
            this.Rg = !1;
            this.b = a;
            this.c = null;
            this.au(b)
        }
        var f = e.getLoggerProxy(b.ue),
        a = e.getLoggerProxy(b.Cd);
        h.prototype = {
            toString: function() {
                return ["[", "lscv", this.Ia, this.Aj, .5, 7E3, "]"].join("|")
            },
            dx: function(a) {
                return null != this.Ia && this.Ia > a
            },
            Jd: function(a) {
                this.c = a
            },
            Rl: function() {
                return null != this.Ia && 0 < this.Ia ? Math.round(this.Ia) : null
            },
            as: function() {
                this.Ia = null;
                this.Rg = !1
            },
            Wy: function() {
                this.Rg = !1
            },
            LA: function(a) {
                this.Ks(a)
            },
            GA: function(a, b) {
                f.logDebug(e.resolve(148));
                this.c && this.c.bc(a) && (c.verifyOk(this.c.Iq()) || f.logError(e.resolve(145)), this.c.px() && (this.Ks(1E3 * b) ? this.b.sn && this.c.Cy() : this.c.Hy()))
            },
            au: function(a) {
                var b = this;
                g.ia(a, "LS_s",
                function(a, c) {
                    b.GA(a, c)
                })
            },
            vA: function(a) {
                a || this.as();
                this.Aj = d.getTimeStamp()
            },
            Ks: function(b) {
                var c = d.getTimeStamp();
                if (!this.Aj) return ! 0;
                b = c - this.Aj - b;
                if (null == this.Ia) return this.Ia = b,
                a.logDebug(e.resolve(149)),
                !1;
                if (2E4 < b && b > 2 * this.Ia && (this.Rg = !this.Rg)) return a.logInfo(e.resolve(146)),
                7E3 < this.Ia;
                this.Ia = .5 * this.Ia + .5 * b;
                if (60 > this.Ia) return this.Ia = 0,
                a.logDebug(e.resolve(150)),
                !1;
                if (this.dx(7E3)) return a.logInfo(e.resolve(147)),
                !0;
                a.logDebug(e.resolve(151));
                return ! 1
            }
        };
        return h
    });
    define("lscH", ["LoggerManager", "lscG", "ASSERT", "lscAe"],
    function(e, g, d, c) {
        function b(b) {
            this.rb = [];
            this.keys = {};
            this.ei = b;
            this.Mx = 0
        }
        var h = e.getLoggerProxy(c.cg);
        b.prototype = {
            toString: function() {
                return ["[|ControlRequestBatch", this.ei, this.rb.length, "]"].join("|")
            },
            Bo: function(b, a) {
                this.keys[b] = a;
                this.rb.push(b)
            },
            Ce: function(b, a) {
                var c = b.ig;
                if (c == g.te || c == g.Yc || c == g.re) {
                    if (this.ei != c) return h.logError(e.resolve(152), this),
                    d.fail(),
                    !1;
                    this.Bo(this.Mx++, b);
                    return ! 0
                }
                if (this.ei != g.Lh) return h.logError(e.resolve(153), this),
                d.fail(),
                !1;
                var m;
                switch (c) {
                case g.kk:
                    m = "C";
                    break;
                case g.mk:
                    m = "F";
                    break;
                case g.$n:
                    m = "X" + b.getKey();
                    break;
                default:
                    m = b.getKey()
                }
                var k = this.keys[m];
                h.logDebug(e.resolve(157), this, m, b);
                if (k) {
                    if (c == g.kk || c == g.mk) {
                        a || (h.logDebug(e.resolve(158)), this.zn(m, b));
                        return
                    }
                    if (c == g.rk) {
                        k.ke ? (h.logDebug(e.resolve(159)), a || this.zn(m, b)) : k.ig == g.rk ? h.logDebug(e.resolve(160)) : (h.logDebug(e.resolve(161)), d.verifyNotOk(a) || h.logError(e.resolve(154), this), a || this.fz(m));
                        return
                    }
                    if (c == g.Bd) {
                        for (; k && b.ke != k.ke;) h.logDebug(e.resolve(162)),
                        m += "_",
                        k = this.keys[m];
                        if (k) {
                            h.logDebug(e.resolve(163));
                            return
                        }
                    } else {
                        a || (h.logDebug(e.resolve(164)), this.zn(m, b));
                        return
                    }
                }
                h.logDebug(e.resolve(165));
                this.Bo(m, b)
            },
            getLength: function() {
                return this.rb.length
            },
            zn: function(b, a) {
                this.keys[b] = a
            },
            Zm: function(b) {
                if (this.rb.length <= b) return h.logError(e.resolve(155)),
                null;
                var a = this.rb[b];
                this.rb.splice(b, 1);
                b = this.keys[a];
                delete this.keys[a];
                return b
            },
            fz: function(b) {
                if (!this.keys[b]) return h.logError(e.resolve(156)),
                null;
                for (var a = 0; a < this.rb.length; a++) if (this.rb[a] == b) return this.Zm(a)
            },
            shift: function() {
                return this.Zm(0)
            },
            pop: function() {
                return this.Zm(this.rb.length - 1)
            },
            kf: function() {
                return this.Yl(this.rb.length - 1)
            },
            Gg: function() {
                return this.Yl(0)
            },
            Yl: function(b) {
                return 0 >= this.rb.length ? null: this.keys[this.rb[b]]
            },
            Ue: function() {
                return this.ei
            }
        };
        return b
    });
    define("lscF", "lscG lscH LoggerManager lscAH Executor lscz lscAe ASSERT".split(" "),
    function(e, g, d, c, b, h, f, a) {
        function l() {
            this.a = this.request = this.Ac = this.ya = null
        }
        function m(a, b, c, f) {
            this.bm = this.ti = this.cj = this.ml = this.rm = this.Ga = this.cc = null;
            this.mh = this.Nb = 0;
            this.a = this.status = this.N = 1;
            this.Jh = 0;
            this.s = null;
            this.hv = !1;
            this.vb = a;
            this.b = b;
            this.El = c;
            this.X = null;
            this.If(f);
            this.sc()
        }
        var k = d.getLoggerProxy(f.cg),
        n = {
            1 : "IDLE",
            2 : "STAND BY",
            3 : "WAITING RESP"
        };
        m.prototype = {
            toString: function() {
                return ["[|ControlConnectionHandler", n[this.status], this.s, this.mh, "]"].join("|")
            },
            Yz: function(a) {
                this.mh = a;
                k.logDebug(d.resolve(183), this)
            },
            uA: function(a) {
                this.Nb = a;
                k.logInfo(d.resolve(173), this);
                1 == this.status && this.js(this.N)
            },
            js: function(a) {
                1 == this.status && this.N == a && 0 != this.Nb && (k.logDebug(d.resolve(184), this), this.uc(null, "", e.re))
            },
            Gs: function() {
                k.logInfo(d.resolve(174), this);
                this.Nb = 0
            },
            If: function(a) {
                this.cc = new h(h.at, !1, !this.b.pi || a);
                this.Ga = null
            },
            da: function() {
                k.logDebug(d.resolve(185));
                this.Ga && this.Ga.da()
            },
            ha: function(a) {
                this.N++;
                1 == a && 0 < this.Nb && b.addTimedTask(this.js, this.Nb, this, [this.N]);
                this.status = a
            },
            sc: function() {
                k.logDebug(d.resolve(186), this);
                this.mh = 0;
                this.rm = new g(e.te);
                this.ml = new g(e.Lh);
                this.bm = new g(e.re);
                this.X = null;
                this.Nb = 0;
                this.cj || (this.cj = new g(e.Yc));
                this.ti || (this.ti = new g(e.Lh));
                this.Cj = [this.rm, this.ml, this.cj, this.ti, this.bm];
                this.a++;
                var b = this.s ? this.s.Ue() : null;
                null !== b && b !== e.Bd && b !== e.Yc ? (a.verifyDiffValue(this.status, 1) || k.logError(d.resolve(166)), this.da(), this.s = null, this.ha(1), this.zc(!1, "reset1")) : null === b && (a.verifyValue(this.status, 1) || k.logError(d.resolve(167)), a.verifyValue(this.s, null) || k.logError(d.resolve(168)), this.zc(!1, "reset2"))
            },
            Ek: function(a) {
                a ? k.logDebug(d.resolve(187), this) : this.X && k.logDebug(d.resolve(188), this);
                this.X = a
            },
            uc: function(a, c, f, d, h) {
                b.addTimedTask(this.Ot, 0, this, [this.a, a, c, f, d, h])
            },
            mu: function(a, b) {
                return b == e.Bd || b == e.Yc ? !0 : this.a === a
            },
            Do: function(a, b) {
                a == e.te ? this.rm.Ce(b) : a == e.Yc ? this.cj.Ce(b) : a == e.Bd ? this.ti.Ce(b) : a == e.re ? this.bm.Ce(b) : this.ml.Ce(b)
            },
            Ot: function(a, b, c, f, h, g) {
                this.mu(a, f) && (k.logInfo(d.resolve(175), this, c), a = new e(c, h, f, b, g), this.Do(f, a), 1 == this.status ? this.zc(!0, "add") : k.logDebug(d.resolve(189), this))
            },
            zc: function(a, c) { ! 0 === a ? (k.logDebug(d.resolve(190), a, this), this.pp(this.N, c)) : b.addTimedTask(this.pp, !1 === a ? 0 : a, this, [this.N, "async." + c])
            },
            pp: function(a, b) {
                if (a == this.N) {
                    for (var c = 0; 1 > c;) {
                        c++;
                        this.ha(2);
                        k.logDebug(d.resolve(191), b, this);
                        var f = null;
                        null != this.s ? (k.logDebug(d.resolve(192)), f = this.gs(this.s)) : (k.logDebug(d.resolve(193)), f = this.oz());
                        if (1 == f) k.logInfo(d.resolve(176)),
                        this.s = null;
                        else {
                            if (2 == f) {
                                k.logInfo(d.resolve(177));
                                this.zc(200, "later");
                                return
                            }
                            if (3 == f) {
                                k.logWarn(d.resolve(170));
                                this.s && this.s.ym(!0);
                                this.s = null;
                                this.zc(!1, "no");
                                return
                            }
                            if (4 == f) {
                                k.logInfo(d.resolve(178));
                                this.ha(3);
                                this.s.ym();
                                this.zc(4E3, "http");
                                return
                            }
                            if (5 == f) k.logInfo(d.resolve(179)),
                            this.ha(3),
                            this.s.ym(),
                            this.s = null,
                            this.ha(1);
                            else {
                                k.logInfo(d.resolve(180));
                                this.da();
                                this.ha(1);
                                return
                            }
                        }
                    }
                    this.zc(!1, "limit")
                }
            },
            oz: function() {
                for (var a = 0; a < this.Cj.length;) {
                    this.Jh = this.Jh < this.Cj.length - 1 ? this.Jh + 1 : 0;
                    if (0 < this.Cj[this.Jh].getLength()) return this.gs(this.Cj[this.Jh]);
                    a++
                }
                return null
            },
            gs: function(h) {
                var e = this.vb.mb(),
                g;
                g = this.b.Ib();
                var l = this.b.Eg(!1),
                r = h.Gg();
                r ? (r = new c((r.ke && !0 !== r.ke ? r.ke: e) + f.nk), r.th(g), r.vh(l), g = r) : g = null;
                if (null == g) return k.logDebug(d.resolve(194)),
                1;
                k.logDebug(d.resolve(195));
                l = !1;
                if (this.X) {
                    k.logDebug(d.resolve(196));
                    l = this.np(h, this.X);
                    if (null == l) return k.logDebug(d.resolve(197)),
                    1;
                    g.Nf(l.getFile());
                    g.setData(l.getData());
                    l = this.X.gg(g);
                    if (!1 === l) this.X = null;
                    else return null === l ? 2 : 5
                }
                this.Ga && !this.cc.bf(e, this.Ga.V, g.va(), this.b.Ib(), g.ua(), this.b.Pg(!1)) && (this.cc.sc(), this.Ga = null);
                for (; this.Ga || this.cc.am();) {
                    if (!this.Ga) {
                        l = this.cc.kq(e, g.va(), this.b.Ib(), g.ua(), this.b.Pg(!1));
                        if (!l) return k.logWarn(d.resolve(171), this.Ga),
                        a.fail(),
                        this.cc.sc(),
                        3;
                        this.Ga = new l("LS6__CONTROLFRAME");
                        k.logDebug(d.resolve(198), this.Ga)
                    }
                    l = this.np(h, this.Ga);
                    if (null == l) return k.logDebug(d.resolve(199)),
                    1;
                    g.Nf(l.getFile());
                    g.setData(l.getData());
                    g.Pj(l.Ae);
                    this.s.Wz(this.N);
                    this.Ga.da();
                    this.hv && (g.ib = g.ib.replace(/LS_session=.*&/g, "LS_session\x3dFAKE\x26"));
                    l = this.Ga.pa(g, this.s.a, b.packTask(this.xy, this), b.packTask(this.la, this));
                    if (!1 === l) k.logDebug(d.resolve(200)),
                    this.Ga = null;
                    else {
                        if (null === l) return k.logDebug(d.resolve(201)),
                        2;
                        this.cc.sc();
                        return 4
                    }
                } ! 1 !== l && (k.logError(d.resolve(169)), a.fail());
                return 3
            },
            np: function(a, b) {
                var c = b.Rd();
                if (null == this.s) this.s = new l,
                this.s.rs(c),
                this.s.fill(a, this.mh, this.vb.Ud(), this.b.Ib(), this.b.Eg(!1));
                else if (this.s.Rx(c) && (this.s.rs(c), c = this.s.$y(this.mh, this.vb.Ud(), this.b.Ib(), this.b.Eg(!1)))) for (var f = c.Ue(); 0 < c.getLength();) this.Do(f, c.shift());
                return this.s.isEmpty() ? this.s = null: this.s.request
            },
            xy: function(a, b) {
                if (this.s && b == this.s.a) {
                    k.logInfo(d.resolve(181), b);
                    this.ha(1);
                    var c = this.s.Gg().ig;
                    this.s = null;
                    c == e.Bd || this.Xw(a) ? this.zc(!1, "ready4next") : this.vb.HA()
                }
            },
            Xw: function(a) {
                return "" === a ? !0 : null === a.match(/^window.LS_lastError\[\d+] = "sync error";$/m)
            },
            la: function(a, b) {
                this.s && b == this.s.a && (k.logInfo(d.resolve(182), this, a), this.ha(1), this.s = null, this.zc(!1, "error"))
            }
        };
        l.prototype = {
            toString: function() {
                return this.ya ? this.ya.toString() : null
            },
            Ue: function() {
                return this.ya ? this.ya.Ue() : null
            },
            Gg: function() {
                return this.ya ? this.ya.Gg() : null
            },
            getLength: function() {
                return this.ya ? this.ya.getLength() : 0
            },
            shift: function() {
                return this.ya ? this.ya.shift() : null
            },
            Rx: function(a) {
                return a != this.Ac
            },
            rs: function(a) {
                this.Ac = a
            },
            fill: function(a, b, c, f, h) {
                if (! (0 >= a.getLength())) if (this.ya = new g(a.Ue()), this.request = this.Ac.Pw(a, f, h), f = "", h = this.Ac.encode(a, c, !0), null === h) this.request = this.ya = null;
                else {
                    var e = this.Ac.Tl(this.request.getFile()),
                    l = this.Ac.Wl(h) + h.length;
                    0 < b && l + e > b && k.logWarn(d.resolve(172), f);
                    do f += h,
                    this.ya.Ce(a.shift()),
                    e += l,
                    0 < a.getLength() && (h = this.Ac.encode(a, c)) && (l = this.Ac.Wl(h) + h.length);
                    while (h && (0 == b || e + l < b) && 0 < a.getLength());
                    f ? this.request.setData(this.Ac.Sn(f)) : this.request = null
                }
            },
            $y: function(a, b, c, f) {
                var d = this.ya;
                this.ya = null;
                this.fill(d, a, b, c, f);
                return 0 < d.getLength() ? d: null
            },
            Wz: function(a) {
                this.a = a
            },
            isEmpty: function() {
                return 0 >= this.getLength()
            },
            ym: function(a) {
                for (var c = 0,
                f = null; f = this.ya.Yl(c);)(f = f.Hi()) && b.addTimedTask(f.Lc, 0, f, [a]),
                c++
            }
        };
        return m
    });
    define("lscJ", ["Inheritance", "lscN", "lscAi"],
    function(e, g) {
        function d(b, c, a, e, g, k, n) {
            this._callSuperConstructor(d, [c]);
            this.hn = e;
            this.Lb = g;
            this.Ij = k;
            this.a = a;
            this.vb = b;
            this.Qn = n
        }
        var c, b;
        for (b in {
            Lc: !0
        }) c = b;
        d.prototype = {
            Lc: function(b) {
                this._callSuperMethod(d, c, [b]);
                b || (this.vb.vz(this.Ij, this.Lb), this.Qn || this.vb.Wx(this.Ij, this.Lb))
            },
            verifySuccess: function() {
                return this.vb.lu(this.a) && this.hn.I[this.Lb] && null != this.hn.I[this.Lb].jh ? !1 : !0
            },
            Ne: function() {
                this.vb.lz(this.Lb, this)
            },
            Vg: function() {},
            Vu: function(b) {
                this.Qn = b
            }
        };
        e(d, g);
        return d
    });
    define("lscK", ["lscJ", "lscG", "LoggerManager", "lscAe"],
    function(e, g, d, c) {
        function b(b, a, c) {
            this.active = !1;
            this.ej = 0;
            this.qd = {};
            this.Uc = {};
            this.Ns = 0;
            this.W = b;
            this.ca = a;
            this.Ge = c
        }
        var h = d.getLoggerProxy(c.cg);
        b.prototype = {
            da: function() {
                this.active = !1;
                this.qd = {};
                this.Ns = 0;
                this.Uc = {};
                this.ej++;
                h.logDebug(d.resolve(207))
            },
            Ak: function() {
                h.logDebug(d.resolve(208));
                if (!this.active) {
                    for (var b in this.qd) {
                        var a = this.qd[b],
                        c;
                        for (c in a.I) if (null != a.I[c].jh) {
                            var g = new e(this, this.Ge, this.ej, a, c);
                            this.gn(c, query, g)
                        }
                    }
                    this.active = !0
                }
            },
            gg: function(b, a, g, m) {
                h.logDebug(d.resolve(209));
                var k = this.qd[a];
                null == k && (k = {
                    qf: 0,
                    I: {}
                },
                this.qd[a] = k);
                k.qf++;
                b = {
                    LS_message: b
                };
                var n = !1;
                g && (b.LS_outcome = "", n = !0);
                a != c.rc && (b.LS_sequence = encodeURIComponent(a), n = !0);
                m && (b.LS_max_wait = m, n = !0);
                n && (b.LS_ack = "", b.LS_msg_prog = a == c.rc ? this.Yq(k.qf) : k.qf);
                m = {};
                m.jh = b;
                m.listener = g;
                k.I[k.qf] = m;
                this.active && (h.logDebug(d.resolve(210), b), a = new e(this, this.Ge, this.ej, k, k.qf, a, n), this.gn(k.qf, b, a))
            },
            Yq: function(b) {
                var a = ++this.Ns;
                this.Uc[a] = b;
                return a
            },
            nh: function(b) {
                return this.Uc[b] ? this.Uc[b] : b
            },
            cz: function(b) {
                for (var a in this.Uc) if (this.Uc[a] == b) {
                    delete this.Uc[a];
                    break
                }
            },
            ev: function(b) {
                for (var a in this.Uc) if (this.Uc[a] == b) return a
            },
            lu: function(b) {
                return b == this.ej
            },
            lz: function(b, a) {
                var c = a.hn.I[b].jh;
                h.logDebug(d.resolve(211), c);
                this.gn(b, c, a)
            },
            gn: function(b, a, c) {
                this.W.uc(b, a, g.te, c)
            },
            Kt: function(b, a) {
                a = b == c.rc ? this.nh(a) : a;
                h.logInfo(d.resolve(202), b, a);
                var e = this.qd[b];
                e.I[a] && (null != e.I[a].jh && (h.logDebug(d.resolve(212)), e.I[a].jh = null), null == e.I[a].listener && (h.logDebug(d.resolve(213)), this.ze(b, a)))
            },
            Wx: function(b, a) {
                h.logDebug(d.resolve(214), b, a);
                this.ze(b, a)
            },
            ze: function(b, a) {
                h.logDebug(d.resolve(215));
                var e = this.qd[b];
                e && e.I[a] && (delete e.I[a], b == c.rc && this.cz(a))
            },
            lb: function(b, a) {
                var c = this.qd[b];
                return c && c.I[a] && c.I[a].listener ? c.I[a].listener: null
            },
            vz: function(b, a) {
                h.logDebug(d.resolve(216), b, a);
                var c = this.lb(b, a);
                if (c) {
                    var e = this.ca.Xe(c.md);
                    e && e.ur(c.gh)
                }
            },
            qt: function(b, a) {
                a = b == c.rc ? this.nh(a) : a;
                h.logInfo(d.resolve(203), b, a);
                var e = this.lb(b, a);
                if (e) {
                    var g = this.ca.Xe(e.md);
                    g && g.sr(e.gh)
                }
                this.ze(b, a)
            },
            Yx: function(b, a) {
                a = b == c.rc ? this.nh(a) : a;
                h.logInfo(d.resolve(204), b, a);
                var e = this.lb(b, a);
                if (e) {
                    var g = this.ca.Xe(e.md);
                    g && g.ee(e.gh)
                }
                this.ze(b, a)
            },
            Xx: function(b, a, e, g) {
                g = b == c.rc ? this.nh(g) : g;
                h.logInfo(d.resolve(205), b, g);
                var k = this.lb(b, g);
                if (k) {
                    var n = this.ca.Xe(k.md);
                    n && n.tr(k.gh, a, e)
                }
                this.ze(b, g)
            },
            $x: function(b, a, e, g) {
                g = b == c.rc ? this.nh(g) : g;
                h.logInfo(d.resolve(206), b, g);
                var k = this.lb(b, g);
                if (k) {
                    var n = this.ca.Xe(k.md);
                    n && n.yf(k.gh, a, e)
                }
                this.ze(b, g)
            }
        };
        return b
    });
    define("lscj", ["LoggerManager", "Executor", "Global", "ASSERT", "lscAe"],
    function(e, g, d, c, b) {
        function h(a) {
            this.El = a;
            this.kb = [];
            this.wq = !1;
            this.lsc = {};
            this.lsc.LS_window = d["_" + a];
            this.lsc.window = this.lsc.LS_window;
            this.Ju = this.sv(this.lsc)
        }
        var f = e.getLoggerProxy(b.Za);
        h.prototype = {
            toString: function() {
                return "[EvalQueue|" + this.kb.length + "]"
            },
            sv: function() {
                eval("var lsc \x3d arguments[0]");
                return function(a) {
                    with(lsc) eval(a)
                }
            },
            ro: function(a, b) {
                this.Qf() && (this.kb.push({
                    p: a,
                    d: b
                }), f.isDebugLogEnabled() && f.logDebug(e.resolve(218)), g.addTimedTask(this.si, 0, this))
            },
            Jd: function(a) {
                this.c = a
            },
            si: function() {
                for (f.isDebugLogEnabled() && f.logDebug(e.resolve(219), this.kb.length); 0 < this.kb.length;) {
                    var a = this.kb.shift();
                    if (this.c && this.c.bc(a.p)) try {
                        this.Ju(a.d)
                    } catch(b) {
                        this.wq = !0,
                        this.kb = [],
                        c.fail(),
                        console.log(b),
                        f.logError(e.resolve(217), b, a.d),
                        this.c.zp()
                    } else f.isDebugLogEnabled() && f.logDebug(e.resolve(220), a.p, this.c)
                }
            },
            Qf: function() {
                return ! this.wq
            },
            w: function() {}
        };
        return h
    });
    define("lsci", [],
    function() {
        function e(e) {
            this.lsc = {};
            this.lsc.LS_window = e;
            this.ready = !1
        }
        e.prototype = {
            Aa: function() {
                return this.ready
            },
            Kv: function() {
                return this.lsc
            },
            $u: function(e) {
                eval("var lsc \x3d this.lsc");
                with(lsc) eval(e);
                this.ready = !0
            }
        };
        return e
    });
    define("lscw", "LoggerManager Executor lscAg Inheritance Global lsci lscAe".split(" "),
    function(e, g, d, c, b, h, f) {
        function a(c, f) {
            this.El = c;
            this._callSuperConstructor(a, [g.packTask(this.pr, this)]);
            this.kb = [];
            this.ui = f ? f: new h(b["_" + c])
        }
        var l = e.getLoggerProxy(f.Za),
        m = 0;
        a.prototype = {
            toString: function() {
                return "[WrappedEvalQueue|" + this.kb.length + "]"
            },
            ro: function(a, b) {
                this.Qf() && (this.kb.push({
                    p: a,
                    d: b
                }), l.isDebugLogEnabled() && l.logDebug(e.resolve(222)), g.addTimedTask(this.si, 0, this))
            },
            Op: function() {
                this.Ai = !0
            },
            Jd: function(a) {
                this.c = a
            },
            Zp: function() {
                return "\x3cscript\x3ewindow.evalProxy \x3d function(lsc,_p){with(lsc){eval(_p);}};\x3c/script\x3e"
            },
            verify: function() {
                return this.ec.evalProxy ? !0 : !1
            },
            $p: function() {
                return "LS6__EQ_" + this.El + "_" + ++m
            },
            si: function() {
                if (this.ready) for (l.isDebugLogEnabled() && l.logDebug(e.resolve(223)); 0 < this.kb.length;) {
                    var a = this.kb.shift();
                    if (this.c && this.c.bc(a.p)) {
                        var b = null,
                        c = null;
                        if (!this.ui.Aa() && ( - 1 < (b = a.d.indexOf("// END OF HEADER")) || -1 < (c = a.d.indexOf("myEnv.LS_window \x3d LS_window;")))) {
                            var f; - 1 < b ? (f = a.d.substring(0, b), b = a.d.substring(b)) : (f = a.d.substring(0, c + 28), b = a.d.substring(c + 28));
                            a.d = b;
                            this.ui.$u(f)
                        }
                        try {
                            this.ec.evalProxy(this.ui.Kv(), a.d)
                        } catch(d) {
                            this.pr(a.d, d);
                            break
                        }
                    }
                } else g.addTimedTask(this.si, 100, this)
            },
            pr: function(a, b) {
                this.Ai = !0;
                this.kb = [];
                l.logError(e.resolve(221), b, a);
                this.c && this.c.zp()
            }
        };
        c(a, d);
        return a
    });
    define("lscs", "Executor BrowserDetection ASSERT LoggerManager Helpers lscq lscl lscAK lsct lscu EnvironmentStatus Global lsco lscG lscAe lscv lscF lscK lscj lscw".split(" "),
    function(e, g, d, c, b, h, f, a, l, m, k, n, q, p, t, u, r, z, x, D) {
        function B(a, b) {
            this.status = 1;
            this.N = 0;
            this.al = this.c = null;
            this.Qd = "";
            this.Ba = a;
            this.ca = b;
            this.b = a.xb;
            this.Pa = a.ub;
            this.Qa = a.gd();
            this.nc = new u(this.b, this.Qa);
            this.Oy = new q(this.Qa, b);
            k.addUnloadHandler(this);
            this.bv();
            this.Me = null;
            this.W = new r(this, a.xb, this.Qa, !1);
            this.pd = new z(this.W, this.ca, this.b)
        }
        function v(a) {
            switch (a) {
            case 1:
                return "No session";
            case 2:
                return "WS Streaming";
            case 3:
                return "prepare WS Streaming";
            case 4:
                return "WS Polling";
            case 5:
                return "prepare WS Polling";
            case 6:
                return "HTTP Streaming";
            case 7:
                return "prepare HTTP Streaming";
            case 8:
                return "HTTP Polling";
            case 9:
                return "prepare HTTP Polling";
            case 10:
                return "Shutting down"
            }
        }
        var y = {
            2 : 7,
            6 : 9,
            4 : 3,
            8 : 3,
            _2: 3,
            _6: 9,
            _4: 3,
            _8: 7
        },
        C = {
            2 : 7,
            6 : 9,
            4 : 3,
            8 : 3,
            _2: 3,
            _6: 9,
            _4: 3,
            _8: 9
        },
        N = {
            2 : 3,
            6 : 7,
            4 : 5,
            8 : 9
        },
        F = {
            2 : 5,
            6 : 9,
            7 : 9,
            9 : 9
        },
        H = {
            3 : !0,
            5 : !0,
            7 : !0,
            9 : !0
        },
        w = c.getLoggerProxy(t.ue),
        A = c.getLoggerProxy(t.Cd);
        B.prototype = {
            bv: function() {
                var a = this;
                n.ia(this.Qa, "LS_forceReload",
                function() {
                    a.c && a.c.la("server.exit", !0)
                })
            },
            ha: function(a) {
                this.status = a;
                this.N++
            },
            ra: function(a, b, c) {
                1 != this.status && 10 != this.status && this.c && this.c.ra(a ? "api": b, !1, c)
            },
            HA: function() {
                1 != this.status && 10 != this.status && this.c && this.c.Im("control.syncerror")
            },
            Uw: function() {
                return 1 != this.status && 10 != this.status
            },
            yb: function(a, b, c, d, h, e, g) {
                a && f.Hc();
                this.rp();
                a = a ? "api": e;
                this.Qd = b ? "_": ""; ! g && this.Uw() ? (this.ha(d ? h ? 9 : 5 : h ? 7 : 3), this.vn(a), this.c.Yr(this.N, a, c)) : (this.$r(), b = this.c ? this.c.Ud() : null, a = "new." + a, this.ra(!1, a, !1), this.ha(d ? h ? 8 : 4 : h ? 6 : 2), this.Ir(d, c, h), this.c.yb(b, a))
            },
            Ir: function(a, b, c, f) {
                this.c = new(c ? l: m)(a, b, this, this.N, f, null !== this.Me);
                f && f.Of();
                this.nc.Jd(this.c);
                this.ea && this.ea.Jd(this.c);
                this.Oy.Jd(this.c)
            },
            Id: function(a, b, c, f) {
                this.ha(b ? c ? 8 : 4 : c ? 6 : 2);
                this.Ir(b, a, c, this.c);
                this.c.Id(f)
            },
            rn: function() {
                return "_" == this.Qd && N[this.status] == C[this.Qd + this.status]
            },
            Nc: function(a, b, f) {
                a == this.N && (f ? (A.logInfo(c.resolve(229)), this.ha(1)) : (a = C[this.status] || this.status, A.logInfo(c.resolve(230), v(this.status), v(a)), 1 == a || 10 == a ? (A.logError(c.resolve(224)), d.fail()) : (this.ha(a), this.vn(b), this.c.Yr(this.N, b, !1))))
            },
            Dy: function(a) {
                a == this.N && (a = F[this.status], A.logInfo(c.resolve(231), v(this.status), v(a)), a ? (this.ha(a), this.vn("slow"), this.c.kz(this.N)) : (A.logError(c.resolve(225), v(this.status), this.c), d.fail()))
            },
            Je: function(a, b, f) {
                a == this.N && (a = y[this.Qd + this.status] || this.status, A.logInfo(c.resolve(232), v(this.status), v(a)), 1 == a || 10 == a ? (A.logError(c.resolve(226)), d.fail()) : this.yb(!1, "_" == this.Qd, f, 3 == a || 7 == a ? !1 : !0, 3 == a || 5 == a ? !1 : !0, b, !0))
            },
            Dn: function(a, b, f) {
                a == this.N && (a = this.status, A.logInfo(c.resolve(233), v(this.status)), H[a] ? this.Id(f, 3 == a || 7 == a ? !1 : !0, 3 == a || 5 == a ? !1 : !0, b) : (A.logError(c.resolve(227)), d.fail()))
            },
            Es: function(a) {
                A.logInfo(c.resolve(234));
                this.Dn(a, "slow", !1)
            },
            FA: function(a, b) {
                if (a == this.N) {
                    var f = this.status;
                    A.logInfo(c.resolve(235), v(this.status));
                    H[f] ? this.yb(!1, "_" == this.Qd, !1, 3 == f || 7 == f ? !1 : !0, 3 == f || 5 == f ? !1 : !0, "switch.timeout." + b, !0) : (A.logError(c.resolve(228)), d.fail())
                }
            },
            vn: function(a) {
                e.addTimedTask(this.FA, this.b.Cn + (this.nc.Rl() || 0), this, [this.N, a])
            },
            $r: function() {
                this.W.sc();
                this.pd.da()
            },
            kl: function() {
                var a = null !== this.Me;
                this.c && this.c.If(a);
                this.W && this.W.If(a)
            },
            ky: function(a) {
                a == this.N && (this.Me = b.getTimeStamp(), this.kl())
            },
            rp: function() {
                null !== this.Me && 1E3 < b.getTimeStamp() - this.Me && (this.Me = null, this.kl())
            },
            gm: function() {
                return this.c ? this.c.i() : null
            },
            Vl: function() {
                return this.c ? this.c.Vl() : t.Ub
            },
            mb: function() {
                return this.c ? this.c.mb() : this.Pa.rh
            },
            Ud: function() {
                return this.c ? this.c.Ud() : null
            },
            Up: function() {
                if (!this.ea || !this.ea.Qf()) {
                    if (g.isProbablyIE(9, !0)) {
                        var a = null;
                        this.ea && (a = this.ea.ui, this.ea.w());
                        this.ea = new D(this.Qa, a)
                    } else this.ea = new x(this.Qa);
                    this.ea.Jd(this.c)
                }
                return this.ea
            },
            w: function() {
                this.ea && this.ea.w();
                k.removeUnloadHandler(this)
            },
            unloadEvent: function() {
                this.ra(!1, "unload", !0);
                this.ha(10)
            },
            gd: function() {
                return this.Qa
            },
            wA: function(a) {
                a == this.N && this.Ba.ay()
            },
            Oc: function(a) {
                A.logInfo(c.resolve(236), this);
                this.yr(a);
                this.pd.Ak();
                this.Ba.Oc();
                this.Vd()
            },
            yr: function(a) {
                A.logDebug(c.resolve(237), this);
                a && this.W.Yz(a)
            },
            By: function(a, b) {
                if (a != this.N) return null;
                A.logDebug(c.resolve(238), this);
                this.$r();
                this.Ba.fe();
                b ? this.ha(1) : this.ha(this.status);
                return this.N
            },
            Km: function(a, b) {
                var f = this.ca.Td(a[0]);
                f ? (w.isDebugLogEnabled() && w.logDebug(c.resolve(240), a), f.Yg(a, b)) : w.logDebug(c.resolve(239), this)
            },
            de: function(a) {
                var b = this.ca.Td(a[0]);
                b ? (w.isDebugLogEnabled() && w.logDebug(c.resolve(242), a), b.onLostUpdates(a[0], a[1], a[2])) : w.logDebug(c.resolve(241), this)
            },
            ce: function(a) {
                var b = this.ca.Td(a[0]);
                b ? (w.isDebugLogEnabled() && w.logDebug(c.resolve(244), a), b.onEndOfSnapshot(a[0], a[1])) : w.logDebug(c.resolve(243), this)
            },
            be: function(a) {
                var b = this.ca.Td(a[0]);
                b ? (w.isDebugLogEnabled() && w.logDebug(c.resolve(246), a), b.onClearSnapshot(a[0], a[1])) : w.logDebug(c.resolve(245), this)
            },
            zf: function(a, b) {
                w.isDebugLogEnabled() && w.logDebug(c.resolve(247), a, b);
                this.ca.cy(a, b)
            },
            Jm: function(a, b, f) {
                var d = this.ca.Td(a);
                d ? (w.isDebugLogEnabled() && w.logDebug(c.resolve(248), a, b, f), d.Af(a, b, f)) : w.logDebug(c.resolve(249), this);
                this.ca.Af(a)
            },
            onUnsubscription: function(a) {
                var b = this.ca.Td(a);
                b ? (w.isDebugLogEnabled() && w.logDebug(c.resolve(250), a), b.onUnsubscription(a)) : w.logDebug(c.resolve(251), this);
                this.ca.onUnsubscription(a)
            },
            Bf: function(a, b) {
                this.ca.Bf(a, b);
                w.isDebugLogEnabled() && w.logDebug(c.resolve(252), a, b);
                this.ca.Bf(a, b)
            },
            onSubscription: function(a, b, f, d, h) {
                this.ca.onSubscription(a);
                var e = this.ca.Td(a);
                e ? (w.isDebugLogEnabled() && w.logDebug(c.resolve(254), a, b, f, d, h), e.onSubscription(a, d, h, b, f)) : w.logDebug(c.resolve(253), this)
            },
            Am: function(a, b) {
                w.isDebugLogEnabled() && w.logDebug(c.resolve(255), a, b);
                this.pd.Kt(a, b)
            },
            Dm: function(a, b) {
                w.isDebugLogEnabled() && w.logDebug(c.resolve(256), a, b);
                this.pd.qt(a, b)
            },
            Bm: function(a, b, f, d) {
                w.isDebugLogEnabled() && w.logDebug(c.resolve(257), a, d, b, f);
                this.pd.Xx(a, b, d, f)
            },
            ee: function(a, b) {
                w.isDebugLogEnabled() && w.logDebug(c.resolve(258), a, b);
                this.pd.Yx(a, b)
            },
            yf: function(a, b, f, d) {
                w.isDebugLogEnabled() && w.logDebug(c.resolve(259), a, d, b, f);
                this.pd.$x(a, b, d, f)
            },
            pj: function(a) {
                this.Ba.pj(a)
            },
            Em: function(a) {
                w.isDebugLogEnabled() && w.logDebug(c.resolve(260), a);
                this.Ba.Em(a)
            },
            oy: function(b) {
                this.al && b != this.al && a.Zw() && (a.nz(), this.yb(!1, "_" == this.Qd, !1, !1, !1, "ip", !1));
                this.al = b
            },
            fn: function(a, b, c, f) {
                this.pd.gg(a, b, c, f)
            },
            qh: function(a, b) {
                var c = h.Zv(this.N, a, b);
                this.W.uc(null, c, p.Yc, null)
            },
            ji: function() {
                this.c && this.c.ji()
            },
            rz: function(a, b, c, f, d) {
                this.W.uc(a, b, p.Lh, d, f)
            },
            tz: function(a, b, c, f, d) {
                this.W.uc(a, b, p.rk, d, f)
            },
            sz: function(a, b, c) {
                this.W.uc(a, b, p.$n, c)
            },
            Vd: function() {
                this.c && this.c.Vd()
            }
        };
        B.prototype.unloadEvent = B.prototype.unloadEvent;
        return B
    });
    define("lscm", ["lscY", "lscP", "Executor"],
    function(e, g, d) {
        function c(b, a) {
            this.o = b;
            this.id = a
        }
        var b = g.Cs;
        g = {
            Wg: b,
            Xg: b,
            onStatusChange: b,
            Oc: b,
            fe: b,
            or: b,
            zf: b,
            ping: g.Ds,
            onSubscription: b,
            onUnsubscription: b,
            onEndOfSnapshot: b,
            Yg: b,
            onLostUpdates: b,
            onClearSnapshot: b,
            Af: b,
            ee: b,
            tr: b,
            yf: b,
            sr: b,
            ur: b
        };
        c.methods = g;
        c.prototype = {
            Nj: function(b) {
                this.target = b
            },
            lr: function(b, a, c) { ("lscD" == b ? this.o.ub: "lscE" == b ? this.o.xb: this.o.ga).S(a, c)
            },
            Mo: function(b) {
                b == this.o.Gc() && this.o.ul()
            },
            No: function(b) {
                b == this.o.Gc() && this.o.Pu()
            },
            Gr: function() {
                if (null === this.o) throw "net";
                return ! 0
            },
            bp: function() {
                d.addTimedTask(this.o.Uo, 0, this.o);
                d.addTimedTask(this.o.Uo, 1E3, this.o)
            },
            pe: function(b, a) {
                return b != this.o.Gc() ? null: this.o.subscribe(this.id, a)
            },
            wd: function(b, a) {
                return b != this.o.Gc() ? null: this.o.unsubscribe(a)
            },
            Wc: function(b, a, c) {
                return b != this.o.Gc() ? null: this.o.Wc(a, c)
            },
            Hg: function(b, a, c, d, h) {
                if (b != this.o.Gc()) return null;
                this.o.fn(a, c, null == d ? null: {
                    gh: d,
                    md: this.id
                },
                h)
            },
            Np: function(b) {
                this.o.qh(b)
            },
            w: function() {
                this.o = null
            }
        };
        for (var h in g) c.prototype[h] = e.wg(h, g[h]);
        return c
    });
    define("lsck", "Global lscAe LoggerManager lscC lscD lscE lscp lscs lscG Executor lscm Helpers".split(" "),
    function(e, g, d, c, b, h, f, a, l, m, k, n) {
        function q(d, k, l, t, n, q) {
            this.ga = new c(d);
            this.ga.Mf(this, !0);
            this.ub = new b(l);
            this.ub.Mf(this, !0);
            this.xb = new h(k);
            this.xb.Mf(this, !0);
            this.lm = null;
            this.M = new f(this, this.ga, this.ub, this.xb);
            if (t) this.mc = t.Du(this, m.packTask(this.w, this), q),
            d = this.mc.Hi(),
            null != d && (this.Sk = t.Cu(this, d), this.Sk.addListener(this.M)),
            this.id = this.mc.fa();
            else {
                this.mc = null;
                do this.id = "NS" + p++;
                while (e.Pi(this.id, "lsEngine"))
            }
            e.ia(this.id, "lsEngine", this);
            this.g = new a(this, this.M);
            this.Jo(n, g.jo);
            this.ga.ug && this.ul()
        }
        var p = n.randomG(),
        t = "1710";
        isNaN(t) && (t = 0);
        var u = d.getLoggerProxy(g.Cd);
        q.prototype = {
            toString: function() {
                return "[LightstreamerEngine " + this.id + "]"
            },
            Jo: function(a, b) {
                b || (b = "LOCAL" + p++);
                var c = new k(this, b);
                c.Nj(a);
                a.Xz(c);
                this.M.vr(b, c)
            },
            gd: function() {
                return this.id
            },
            gm: function() {
                return this.g.gm()
            },
            Gc: function() {
                return this.M.Gc()
            },
            fe: function() {
                this.M.fe()
            },
            Oc: function() {
                this.M.Oc()
            },
            w: function() {
                this.g.ra(!1, "suicide", !0);
                this.g.w();
                e.ou(this.id);
                this.mc && this.mc.w();
                this.M.gr(!0);
                this.M.w();
                this.Sk && this.Sk.w()
            },
            Pu: function() {
                u.logInfo(d.resolve(261));
                this.ga.S("connectionRequested", !1);
                this.g.ra(!0, "api", !0)
            },
            ul: function() {
                u.logInfo(d.resolve(262));
                this.ga.S("connectionRequested", !0);
                var a = this.xb.Nl;
                null === a ? this.g.yb(!0, !1, !1, !1, !1) : this.Ou(a)
            },
            Ou: function(a) {
                var b = a == g.tk || a == g.Ph;
                this.g.yb(!0, b, !b, a == g.ye || a == g.Xc, a == g.Xc || a == g.se || a == g.Ph)
            },
            Ee: function(a, b, c) {
                this.M.Od(function(f) {
                    f.Wg(a, b, c)
                });
                "maxBandwidth" == b ? this.g.ji(c) : "forcedTransport" == b ? this.ga.ug && this.ul() : "reverseHeartbeatInterval" == b ? this.g.Vd() : "corsXHREnabled" != b && "xDomainStreamingEnabled" != b || this.g.kl();
                return ! 0
            },
            pj: function(a) {
                this.mc && this.mc.Tr(a)
            },
            Em: function(a) {
                this.mc && this.mc.Mt(a)
            },
            Gb: function() {
                return this.g.Vl()
            },
            ay: function() {
                var a = this.Gb();
                if (this.lm != a) {
                    var b = this.lm;
                    this.lm = a;
                    this.M.by(a, b);
                    if (this.onStatusChange) this.onStatusChange(a)
                }
            },
            fn: function(a, b, c, f) {
                var d = this.Gb();
                if (d == g.Ub || d == g.dg) return ! 1;
                this.g.fn(a, b, c, f);
                return ! 0
            },
            qh: function(a) {
                this.g.qh(a, t);
                return ! 0
            },
            subscribe: function(a, b) {
                return this.M.Jw(a, b)
            },
            unsubscribe: function(a) {
                this.M.Vr(a)
            },
            Wc: function(a, b) {
                this.M.Wc(a, b)
            },
            Uo: function() {
                this.M.$o()
            }
        };
        return q
    });
    define("lscAX", ["lscAe"],
    function(e) {
        function g(d, c, b) {
            this.id = d;
            this.H = c;
            this.status = b
        }
        g.prototype = {
            Gb: function() {
                return this.status
            }
        };
        return {
            Hf: function(d, c) {
                return this.Xm(c + "_" + d)
            },
            aB: function(d, c, b) {
                b = b.join("|");
                this.write(e.Ed + c + "_" + d, b)
            },
            Zk: function(d, c) {
                this.clean(e.Ed + c + "_" + d)
            },
            Ym: function(d) {
                return this.Xm(d)
            },
            Yy: function(d) {
                d = this.Xm(d);
                if (!d) return null;
                for (var c = [], b = 0; b < d.length; b++) {
                    var h = d[b].split("_");
                    if (2 == h.length) {
                        var f = this.Hf(h[1], h[0]);
                        null != f && c.push(new g(h[0], h[1], f))
                    }
                }
                return c
            },
            Bk: function(d, c, b) {
                d = e.Ed + d;
                c += b ? "_" + b: "";
                b = this.read(d);
                if (!b) b = "|";
                else if ( - 1 < b.indexOf("|" + c + "|")) return ! 1;
                this.write(d, b + (c + "|"));
                return ! 0
            },
            lh: function(d, c, b) {
                d = e.Ed + d;
                c += b ? "_" + b: "";
                if (b = this.read(d)) c = "|" + c + "|",
                -1 < b.indexOf(c) && (b = b.replace(c, "|"), "|" == b ? this.clean(d) : this.write(d, b))
            },
            yv: function() {
                for (var d = this.keys(), c = [], b = 0; b < d.length; b++) 0 == d[b].indexOf(e.Ed) && (d[b] = d[b].substring(e.Ed.length), c.push(d[b]));
                return c
            },
            Xm: function(d) {
                d = e.Ed + d;
                d = this.read(d);
                if (!d) return null;
                d = d.split("|");
                "" == d[0] && d.shift();
                "" == d[d.length - 1] && d.pop();
                return 0 < d.length ? d: null
            }
        }
    });
    define("lscAY", ["lscAi", "lscAX"],
    function(e, g) {
        return e.sa({
            read: function(d) {
                return localStorage.getItem(d)
            },
            write: function(d, c) {
                localStorage.setItem(d, c)
            },
            clean: function(d) {
                localStorage.removeItem(d)
            },
            keys: function() {
                for (var d = [], c = 0; c < localStorage.length; c++) d.push(localStorage.key(c));
                return d
            }
        },
        g)
    });
    define("CookieManager", ["Helpers", "Environment"],
    function(e, g) {
        var d = !1,
        c = {
            areCookiesEnabled: function() {
                return d
            },
            getAllCookiesAsSingleString: function() {
                return this.areCookiesEnabled() ? document.cookie.toString() : null
            },
            writeCookie: function(b, c) {
                this.Ws(b, c, "")
            },
            Ws: function(b, c, d) {
                this.areCookiesEnabled() && (document.cookie = encodeURIComponent(b) + "\x3d" + c + "; " + d + "path\x3d/;")
            },
            readCookie: function(b) {
                if (!this.areCookiesEnabled()) return null;
                b = encodeURIComponent(b) + "\x3d";
                for (var c = this.getAllCookiesAsSingleString(), c = c.split(";"), d = 0; d < c.length; d++) if (c[d] = e.trim(c[d]), 0 == c[d].indexOf(b)) return c[d].substring(b.length, c[d].length);
                return null
            },
            removeCookie: function(b) {
                if (this.areCookiesEnabled()) {
                    var c = new Date;
                    c.setTime(c.getTime() - 864E5);
                    this.Ws(b, "deleting", "expires\x3d" + c.toGMTString() + "; ")
                }
            },
            ju: function() {
                if (g.isBrowserDocument() && ("http:" == document.location.protocol || "https:" == document.location.protocol)) {
                    d = !0;
                    var b = "LS__cookie_test" + e.randomG();
                    this.writeCookie(b, "testing");
                    var c = this.readCookie(b);
                    if ("testing" == c && (this.removeCookie(b), c = this.readCookie(b), null == c)) return;
                    d = !1
                }
            }
        };
        c.ju();
        c.areCookiesEnabled = c.areCookiesEnabled;
        c.getAllCookiesAsSingleString = c.getAllCookiesAsSingleString;
        c.writeCookie = c.writeCookie;
        c.removeCookie = c.removeCookie;
        c.readCookie = c.readCookie;
        return c
    });
    define("lscAV", ["CookieManager", "lscAX", "lscAi", "Helpers"],
    function(e, g, d, c) {
        return d.sa({
            read: function(b) {
                return e.readCookie(b)
            },
            write: function(b, c) {
                e.writeCookie(b, c)
            },
            clean: function(b) {
                e.removeCookie(b)
            },
            keys: function() {
                for (var b = [], b = e.getAllCookiesAsSingleString().split(";"), d = 0; d < b.length; d++) b[d] = c.trim(b[d]),
                b[d] = b[d].substring(0, b[d].indexOf("\x3d")),
                b[d] = decodeURIComponent(b[d]);
                return b
            }
        },
        g)
    });
    define("lscAU", "lscAY lscAV Executor Dismissable Inheritance lscAe Helpers lscAi".split(" "),
    function(e, g, d, c, b, h, f, a) {
        function l(a) {
            this._callSuperConstructor(l);
            this.ba = a;
            this.ak = null
        }
        var m = [],
        k = h.ve + h.lo,
        n = 6E4;
        l.prototype = {
            start: function() {
                this.ak && d.stopRepetitiveTask(this.ak);
                this.ak = d.addRepetitiveTask(this.ep, n, this);
                d.addTimedTask(this.ep, 0, this)
            },
            clean: function() {
                d.stopRepetitiveTask(this.ak);
                for (var a = 0; a < m.length; a++) if (m[a] == this) {
                    m.splice(a, 1);
                    break
                }
            },
            ep: function() {
                for (var a = f.getTimeStamp(), b = this.ba.yv(), c = 0; c < b.length; c++) 0 < b[c].indexOf("_") && this.Vk(b[c], null, a);
                for (c = 0; c < b.length; c++) - 1 >= b[c].indexOf("_") && this.ku(b[c])
            },
            Vk: function(a, b, c) {
                if (!b) {
                    b = a.split("_");
                    if (2 != b.length) return ! 1;
                    a = b[0];
                    b = b[1]
                }
                var f = this.ba.Hf(b, a);
                return f ? c ? c - f[h.Rh] > k ? (this.ba.Zk(b, a), !1) : !0 : !0 : !1
            },
            ku: function(a) {
                for (var b = this.ba.Ym(a), c = 0; c < b.length; c++) 0 < b[c].indexOf("_") ? this.Vk(b[c]) || this.ba.lh(a, b[c]) : this.Vk(b[c], a) || this.ba.lh(a, b[c])
            }
        };
        b(l, c, !1, !0);
        e = new l(e);
        var q = new l(g),
        p = a.Qo() ? e: q;
        return {
            start: function(a) {
                a = a ? q: p;
                for (var b = 0; b < m.length; b++) if (m[b] == a) {
                    a.touch();
                    return
                }
                m.push(a);
                a.touch();
                a.start()
            },
            stop: function(a) {
                a = a ? q: p;
                for (var b = 0; b < m.length; b++) m[b] == a && a.dismiss()
            },
            qB: function(a) {
                n = a;
                for (a = 0; a < m.length; a++) m[a].start()
            }
        }
    });
    define("lscAR", ["lscAi", "lscAX"],
    function(e, g) {
        var d = {};
        return e.sa({
            read: function(c) {
                return d[c]
            },
            write: function(c, b) {
                d[c] = b
            },
            clean: function(c) {
                delete d[c]
            },
            keys: function() {
                var c = [],
                b;
                for (b in d) c.push(b);
                return c
            }
        },
        g)
    });
    define("lscX", ["Environment"],
    function(e) {
        return {
            du: function() {
                return e.isBrowserDocument() && "undefined" !== typeof SharedWorker && "undefined" !== typeof Blob && window.URL
            },
            Fu: function(e) {
                return window.URL.createObjectURL(new Blob([e]))
            },
            iz: function(e) {
                window.URL.revokeObjectURL(e)
            }
        }
    });
    define("lscW", ["EventDispatcher", "Inheritance", "lscAe"],
    function(e, g, d) {
        function c() {
            this._callSuperConstructor(c);
            this.Ob = this.zd = null
        }
        var b = d.Qh;
        c.mt = 'var listeners\x3d{},nextId\x3d0,MASTER\x3d"MASTER",REMOTE\x3d"REMOTE",INITIALIZATION\x3d"INITIALIZATION",REMOVE\x3d"REMOVE",ALL\x3d"ALL",FAILED\x3d"FAILED",KILL\x3d"KILL";onconnect\x3dfunction(a){var b\x3da.ports[0];a\x3dnextId++;listeners[MASTER]||(a\x3dMASTER);listeners[a]\x3db;b.addEventListener("message",function(a){a\x3da.data;if(a.type\x3d\x3dREMOVE)delete listeners[a.target];else if(a.type\x3d\x3dKILL)terminate();else if(a.target\x3d\x3d\x3dALL)for(var c in listeners)listeners[c]!\x3db\x26\x26sendMessage(c,a,b);else sendMessage(a.target,a,b)});b.start();b.postMessage({type:INITIALIZATION,id:a});a!\x3d\x3dMASTER\x26\x26listeners[MASTER].postMessage({type:REMOTE,id:a})};function sendMessage(a,b,d){(a\x3dlisteners[a])?a.postMessage(b):(b.type\x3dFAILED,d.postMessage(b))}function terminate(){self.close();for(var a in listeners)listeners[a].close()};';
        c.prototype = {
            Aa: function() {
                return null !== this.Ob
            },
            start: function(b) {
                this.zd = (new SharedWorker(b)).port;
                var c = this;
                this.zd.onmessage = function(a) {
                    c.oj(a.data)
                };
                this.zd.start()
            },
            w: function() {
                try {
                    this.Ob == b && this.zd.postMessage({
                        type: "KILL"
                    }),
                    this.zd.close()
                } catch(c) {}
                this.zd = null
            },
            oj: function(b) {
                "INITIALIZATION" == b.type ? (this.Ob = b.id, this.dispatchEvent("onReady")) : "REMOTE" == b.type ? this.dispatchEvent("onRemote", [b.id]) : "FAILED" == b.type ? this.dispatchEvent("onMessageFail", [b.target, b.qm]) : this.dispatchEvent("onMessage", [b])
            },
            Wr: function(b) {
                b || (b = this.Ob);
                try {
                    this.zd.postMessage({
                        type: "REMOVE",
                        target: b
                    })
                } catch(c) {}
            },
            sendMessage: function(b, c, a, d) {
                if (!this.Aa()) return ! 1;
                var e = this.Ob;
                try {
                    this.zd.postMessage({
                        type: c,
                        sender: e,
                        target: b,
                        qm: a,
                        Mb: d
                    })
                } catch(g) {
                    this.dispatchEvent("onMessageFail", [b, a])
                }
                return ! 0
            }
        };
        g(c, e);
        return c
    });
    define("lscT", "Executor EventDispatcher Inheritance LoggerManager lscAi lscAe".split(" "),
    function(e, g, d, c, b, h) {
        function f() {
            this._callSuperConstructor(f);
            this.Ld = {};
            this.Ob = null;
            this.My = 1
        }
        var a = c.getLoggerProxy(h.Dd),
        l = h.Qh;
        f.prototype = {
            Aa: function() {
                return null !== this.Ob
            },
            start: function(b) {
                this.ready = !0;
                if (b) {
                    this.Ld[l] = b;
                    var f = this;
                    e.addTimedTask(function() {
                        try {
                            b.connect(f)
                        } catch(d) { - 2147467260 != d.ir && a.logError(c.resolve(263), d)
                        }
                    },
                    0)
                } else this.Ob = l,
                this.dispatchEvent("onReady")
            },
            w: function() {},
            connect: function(a) {
                e.addTimedTask(this.rt, 0, this, [a])
            },
            rt: function(a) {
                var b = this.My++;
                this.Ld[b] = a;
                this.dispatchEvent("onRemote", [b]);
                this.sendMessage(b, "INITIALIZATION", -1, [b])
            },
            Wr: function(a) {
                delete this.Ld[a]
            },
            sendMessage: function(a, b, c, f) {
                if (!this.Aa()) return ! 1;
                if ("ALL" == a) for (var d in this.Ld) this.vo(d, b, c, f);
                else this.vo(a, b, c, f);
                return ! 0
            },
            vo: function(b, f, d, h) {
                try {
                    if (this.Ld[b] && this.Ld[b].oj) {
                        var g = this;
                        e.addTimedTask(function() {
                            try {
                                g.Ld[b].oj(b, g.Ob, f, d, h)
                            } catch(e) { - 2147467260 != e.ir && (a.logError(c.resolve(264), e), g.dispatchEvent("onMessageFail", [b, d]))
                            }
                        },
                        0)
                    } else this.dispatchEvent("onMessageFail", [b, d])
                } catch(l) {
                    this.dispatchEvent("onMessageFail", [b, d])
                }
            },
            oj: function(a, c, f, d, h) {
                a = {
                    target: b.dc(a),
                    type: b.dc(f),
                    qm: b.dc(d),
                    sender: b.dc(c)
                };
                if (h) for (a.Mb = [], c = 0; c < h.length; c++) a.Mb[c] = b.dc(h[c]);
                this.Ct(a)
            },
            Ct: function(b) {
                try {
                    "INITIALIZATION" == b.type ? (this.Ob = b.Mb[0], this.dispatchEvent("onReady")) : this.dispatchEvent("onMessage", [b])
                } catch(f) { - 2147467260 != f.ir && a.logError(c.resolve(265), f)
                }
            }
        };
        d(f, g, !1, !0);
        return f
    });
    define("lscAW", "Global Executor lscAe lscAU lscAY lscAV lscAR Helpers EnvironmentStatus IFrameHandler LoggerManager lscAi lscX lscW lscT".split(" "),
    function(e, g, d, c, b, h, f, a, l, m, k, n, q, p, t) {
        function u(a, b) {
            this.H = a;
            this.o = b;
            this.K = this.id = null;
            this.ba = f
        }
        var r = k.getLoggerProxy(d.Dd),
        z = n.Qo() ? b: h,
        x = a.randomG(),
        D = d.Rh;
        u.hq = function() {
            return z
        };
        u.prototype = {
            toString: function() {
                return ["[SharedStatus", this.id, this.H, "]"].join("|")
            },
            Hi: function() {
                return this.K
            },
            hg: function() {
                this.es = !0;
                l.addBeforeUnloadHandler(this);
                l.addUnloadHandler(this)
            },
            nA: function(a, b, f, e) {
                if (this.es) return ! 1;
                this.Su = b || {};
                this.Zi = null;
                this.Tj = 500;
                this.An = a;
                this.Le = null;
                this.host = location.host;
                this.pg = this.Ra = d.Vb;
                this.Tm = !1;
                this.Jp = 0;
                f ? (this.ba = h, c.start(!0)) : (this.ba = z, c.start());
                this.ov = f;
                this.Hn = this.Yj = null;
                this.Uh();
                this.wo();
                this.K = null;
                e || !q.du() ? this.Ra = this.Pp() : this.pg = this.uv();
                this.Ug = {};
                r.logInfo(k.resolve(267));
                this.hg();
                return ! 0
            },
            oA: function() {
                if (this.es) return ! 1;
                this.Uh(!0);
                this.wo();
                r.logInfo(k.resolve(268));
                this.hg();
                return ! 0
            },
            wo: function() {
                e.Pt(this.H, this.o)
            },
            Uh: function(a) {
                do this.id = x++;
                while (e.Pi(this.id, "lsEngine"));
                a || (this.ba.Bk(this.H, this.id) ? this.ba.Hf(this.H, this.id) && this.Uh() : this.Uh())
            },
            Et: function() {
                this.Hn = g.addRepetitiveTask(this.az, d.ve, this);
                r.logInfo(k.resolve(269), this)
            },
            Pp: function() {
                var a = this.Ra;
                a == d.Vb && (a = n.Hj("LSF__" + n.Ec() + "_" + this.id + "_" + this.H), this.K = new t, e.ia(this.id, d.Oh, this.K));
                m.getFrameWindow(a, !0) ? (this.Tj = 500, this.xo()) : (this.Yj = g.addTimedTask(this.Pp, this.Tj, this), this.Tj *= 2);
                return a
            },
            uv: function() {
                var a = q.Fu(p.mt);
                this.K = new p;
                this.xo(a);
                e.ia(this.id, d.Sh, a);
                return a
            },
            xo: function(a) {
                var b = this;
                this.K.addListener({
                    onReady: function() {
                        b.Pr();
                        b.Yj = g.addTimedTask(b.Et, 0, b);
                        b.K.removeListener(this)
                    }
                });
                this.K.start(a)
            },
            fa: function() {
                return this.id
            },
            Mt: function(a) {
                a != this.Le && (this.Le = a, this.ba.Bk(a, this.id, this.H))
            },
            Tr: function(a) {
                this.Le != a ? r.logError(k.resolve(266), this.Le, a) : this.Le = null;
                this.ba.lh(a, this.id, this.H)
            },
            hw: function(b) {
                b = this.ba.Yy(b);
                if (!b) return 0;
                for (var c = 0,
                f = 0; f < b.length; f++) a.getTimeStamp() - b[f].Gb()[D] > d.ve || c++;
                return c
            },
            Pr: function() {
                this.Zi = a.getTimeStamp() + this.Jp;
                this.ba.aB(this.H, this.id, [this.Zi, this.Ra, this.host, d.jk, d.$f, this.pg])
            },
            az: function() {
                if (this.Tm) r.logDebug(k.resolve(272)),
                this.Tm = !1;
                else {
                    var b = !1;
                    if (this.An) {
                        r.logDebug(k.resolve(273), this);
                        var c = this.ba.Ym(this.H);
                        if (c) {
                            r.logDebug(k.resolve(275), this.H);
                            for (var f = 0; f < c.length; f++) if (c[f] != this.id) {
                                var h = this.ba.Hf(this.H, c[f]);
                                h ? h[d.Zn] != d.jk || h[d.ko] != d.$f ? r.logDebug(k.resolve(277), c[f]) : (h[D] == this.Zi && (this.Jp = a.randomG(5)), h[D] > this.Zi ? b |= this.Sx(c[f], h[D]) : this.Ug[c[f]] && delete this.Ug[c[f]]) : r.logDebug(k.resolve(276), c[f])
                            }
                        } else r.logDebug(k.resolve(274), this)
                    }
                    b || (r.logDebug(k.resolve(278)), this.ba.Bk(this.H, this.id), this.Pr())
                }
            },
            Sx: function(a, b) {
                r.logDebug(k.resolve(279), a, b);
                if (this.Ug[a]) {
                    if (this.Ug[a] == b || this.Su[a]) return ! 1;
                    r.logInfo(k.resolve(270));
                    this.av()
                }
                this.Ug[a] = b;
                return ! 0
            },
            av: function() {
                this.clean();
                this.An && g.executeTask(this.An)
            },
            Tq: function() {
                this.ba.Zk(this.H, this.id);
                this.ba.lh(this.H, this.id);
                this.Tm = !0
            },
            clean: function() {
                r.logInfo(k.resolve(271), this);
                g.stopRepetitiveTask(this.Hn);
                g.stopRepetitiveTask(this.Yj);
                this.Yj = this.Hn = null;
                this.Ra != d.Vb ? m.disposeFrame(this.Ra) : this.pg != d.Vb && q.iz(this.pg);
                this.pg = this.Ra = d.Vb;
                this.Tr(this.Le);
                this.H && e.gz(this.H, this.o);
                this.K && (e.mi(this.id, d.Oh), e.mi(this.id, d.Sh));
                this.K = null;
                this.Tq()
            },
            unloadEvent: function() {
                this.clean()
            },
            preUnloadEvent: function() {
                this.Tq()
            },
            w: function() {
                this.clean();
                l.removeBeforeUnloadHandler(this);
                l.removeUnloadHandler(this);
                c.stop(this.ov)
            }
        };
        u.prototype.unloadEvent = u.prototype.unloadEvent;
        u.prototype.preUnloadEvent = u.prototype.preUnloadEvent;
        return u
    });
    define("lscU", ["Executor", "lscAe", "lscAi"],
    function(e, g, d) {
        function c(c, f, a) {
            this.Nr = c;
            this.target = a;
            this.id = b++;
            this.buffer = [];
            this.ready = !1;
            this.nd = {};
            this.Ux = 0;
            f && this.Bz(f)
        }
        var b = 0;
        c.prototype = {
            Bz: function(b) {
                this.K = b;
                b.addListener(this);
                if (b.Aa()) this.onReady()
            },
            w: function(b) {
                this.K && !b && this.K.w()
            },
            onListenStart: function() {
                if (this.K.Aa()) this.onReady()
            },
            onReady: function() {
                if (!this.ready) {
                    this.ready = !0;
                    for (var b = 0; b < this.buffer.length; b++) {
                        var c = this.buffer[b],
                        a = this.call(c.method, c.Mb, c.Bp);
                        c.Bp && c.Xy(a)
                    }
                    this.buffer = []
                }
            },
            onMessage: function(b) {
                this.Bt(b.sender, b.qm, b.type, b.Mb)
            },
            Bt: function(b, c, a, d) {
                "RESPONSE" == a ? this.nd[c] && (this.nd[c].ok(d[0]), delete this.nd[c]) : b === this.target && (a = this.Nr[a].apply(this.Nr, d), "undefined" !== typeof a && this.qz(b, c, a))
            },
            Cm: function(b, c) {
                this.nd[c] && (this.nd[c].kj(g.gt), delete this.nd[c])
            },
            qz: function(b, c, a) {
                this.K.sendMessage(b, "RESPONSE", c, [a])
            },
            call: function(b, c, a, l) {
                c = d.ci(c);
                if (this.ready) {
                    var m = this.id + "_" + this.Ux++;
                    this.K.sendMessage(this.target, b, m, c);
                    if (a) {
                        var k = this;
                        return new Promise(function(a, b) {
                            k.nd[m] = {
                                ok: a,
                                kj: b
                            };
                            l && e.addTimedTask(function() {
                                k.nd[m] && b(g.ht)
                            },
                            l)
                        })
                    }
                } else {
                    var n = {
                        target: this.target,
                        method: b,
                        Mb: c,
                        Bp: a,
                        oB: l
                    };
                    this.buffer.push(n);
                    if (a) return new Promise(function(a) {
                        n.Xy = a
                    })
                }
            }
        };
        c.prototype.onReady = c.prototype.onReady;
        c.prototype.onMessageFail = c.prototype.Cm;
        c.prototype.onMessage = c.prototype.onMessage;
        c.prototype.onListenStart = c.prototype.onListenStart;
        return c
    });
    define("lscQ", ["lscU", "lscAi"],
    function(e, g) {
        function d(c, b) {
            this.em(c, b)
        }
        d.wg = function(c, b) {
            return b.Dk ?
            function() {
                return this.channel.call(c, [this.Va].concat(g.ci(arguments)), b.Rn, b.bs)
            }: function() {
                return this.channel.call(c, arguments, b.Rn, b.bs)
            }
        };
        d.prototype = {
            em: function(c, b) {
                this.channel = new e(this, c, b)
            },
            Js: function(c) {
                this.channel.w(c)
            }
        };
        return d
    });
    define("lscn", ["Inheritance", "lscm", "lscQ"],
    function(e, g, d) {
        function c(a, b, f) {
            this._callSuperConstructor(c, [a, f]);
            this.em(b, f)
        }
        var b, h;
        for (h in {
            w: !0
        }) b = h;
        c.prototype = {
            w: function() {
                this._callSuperMethod(c, b);
                this.Js(!0)
            }
        };
        var f = g.methods;
        for (h in f) c.prototype[h] = d.wg(h, f[h]);
        e(c, g);
        e(c, d, !0);
        return c
    });
    define("lscR", ["EventDispatcher", "Inheritance", "lscn"],
    function(e, g, d) {
        function c(b, d) {
            this._callSuperConstructor(c);
            this.K = d;
            this.o = b;
            this.K.addListener(this)
        }
        c.prototype = {
            yy: function(b) {
                var c = new d(this.o, this.K, b);
                this.dispatchEvent("onNewPushPage", [b, c])
            },
            Cm: function(b) {
                this.K.Wr(b);
                this.dispatchEvent("onPushPageLost", [b])
            },
            w: function() {
                this.K.w()
            }
        };
        c.prototype.onRemote = c.prototype.yy;
        c.prototype.onMessageFail = c.prototype.Cm;
        g(c, e);
        return c
    });
    define("lscAS", [],
    function() {
        return {
            ik: "ATTACH",
            Nh: "ATTACH:FAST",
            Zf: "IGNORE",
            Xf: "ABORT",
            Mh: "CREATE",
            no: "WAIT"
        }
    });
    define("lscAQ", ["Inheritance", "lscAP", "lscQ", "lscAe", "Executor"],
    function(e, g, d, c, b) {
        function h(a, b) {
            this._callSuperConstructor(h, [a]);
            this.em(b, c.Qh);
            this.VA(b)
        }
        var f, a;
        for (a in {
            w: !0
        }) f = a;
        var l = 2E3;
        h.prototype = {
            VA: function(a) {
                var c = this;
                a.Aa() ? this.Rr(a) : (a.addListener({
                    onReady: function() {
                        c.Rr(a)
                    }
                }), b.addTimedTask(this.WA, l, this))
            },
            WA: function(a) {
                a.Aa() || (l *= 2, this.Xg())
            },
            Rr: function(a) {
                a.Ob == c.Qh && b.addTimedTask(this.Xg, 0, this)
            },
            w: function() {
                this._callSuperMethod(h, f);
                this.Js()
            }
        };
        var m = g.methods;
        for (a in m) h.prototype[a] = d.wg(a, m[a]);
        e(h, g);
        e(h, d, !0);
        return h
    });
    define("lscAh", ["LoggerManager", "Helpers", "lscAe"],
    function(e, g, d) {
        function c() {
            this.Or = null
        }
        function b(a, b) {
            return "var callFun \x3d " +
            function(a, b) {
                window.name != a || window != top || window.Lightstreamer && window.Lightstreamer.Xs || (window.name = b, window.close())
            }.toString() + "; callFun('" + a + "', '" + b + "');"
        }
        var h = 0,
        f = 0,
        a = !1,
        l = !1,
        m = e.getLoggerProxy(d.Dd),
        k = [];
        c.prototype = {
            Bx: function(c, d) {
                var g = null;
                try {
                    k[c] && (g = k[c])
                } catch(z) {
                    g = null
                }
                if (g && (delete k[c], this.Vq(g, c, d))) return ! 0;
                a: {
                    var g = "javascript:" + ('eval("' + b(c, c + "__TRASH") + '; ")'),
                    t = null;
                    m.logDebug(e.resolve(281));
                    if (l) g = !1;
                    else {
                        try {
                            try {
                                var u;
                                if (window.SymError) {
                                    var r = !0; - 5 > f - h && (r = !1);
                                    window.SymRealWinOpen && r ? (h++, u = checkTimes(_force, authTime) ? window.SymRealWinOpen(g, c, "height\x3d100,width\x3d100", !0) : !1) : (a || (a = !0, m.logWarn(e.resolve(280))), h = 0, u = null)
                                } else u = window.open(g, c, "height\x3d100,width\x3d100", !0);
                                t = u
                            } catch(z) {
                                t = null
                            }
                        } catch(z) {
                            m.logDebug(e.resolve(282), z);
                            g = !1;
                            break a
                        }
                        if (t) try {
                            f++
                        } catch(z) {
                            l = !0
                        }
                        g = t
                    }
                }
                if (!1 === g) return m.logDebug(e.resolve(283)),
                !1;
                if (!g) return m.logDebug(e.resolve(284)),
                !0;
                m.logDebug(e.resolve(285));
                this.Vq(g, c, d);
                return ! 0
            },
            Vq: function(a, b, c) {
                try {
                    m.logDebug(e.resolve(286));
                    if (a.closed) return m.logDebug(e.resolve(287)),
                    !1;
                    var f = a;
                    if (c) {
                        if (a == a.top && !a.Lightstreamer) {
                            m.logDebug(e.resolve(288));
                            try {
                                a.name != b && a.name != b + "__TRASH" || a.close()
                            } catch(d) {
                                m.logDebug(e.resolve(289), d)
                            }
                            return ! 1
                        }
                        f = a.parent;
                        if (null == f) return m.logDebug(e.resolve(290)),
                        !1
                    }
                    if (!f.Lightstreamer) return m.logDebug(e.resolve(291)),
                    !1;
                    if (!f.Lightstreamer.Xs) return m.logDebug(e.resolve(292)),
                    !1;
                    m.logDebug(e.resolve(293));
                    this.Or = f;
                    k[b] = a
                } catch(d) {
                    return m.logDebug(e.resolve(294), d),
                    !1
                }
                return ! 0
            }
        };
        return c
    });
    define("lscV", ["Promise", "lscAh"],
    function(e, g) {
        function d(b) {
            this.Ra = b
        }
        var c = {};
        d.prototype = {
            lw: function() {
                if (c[this.Ra]) return e.resolve(null);
                var b = new g;
                return b.Bx(this.Ra, !0) ? (b = b.Or, null == b ? (c[this.Ra] = !0, e.resolve(null)) : e.resolve(b)) : e.resolve(null)
            }
        };
        return d
    });
    define("lscAT", "LoggerManager Global lscAe Promise Helpers Executor lscAP lscAQ lscAS lscAW lscT lscW lscV".split(" "),
    function(e, g, d, c, b, h, f, a, l, m, k, n, q) {
        function p(a, b) {
            var c = m.hq();
            c.Zk(b, a);
            c.lh(b, a)
        }
        function t(a, b, c, f, h, e, g) {
            this.H = b;
            this.Dx = h;
            this.Sm = c;
            this.Fr = f;
            this.ne = e;
            this.Lg = 0;
            this.sg = {};
            this.le = 0;
            this.client = a;
            this.bn = !1;
            this.lg = g || d.Zs;
            this.kj = this.ok = null
        }
        var u = e.getLoggerProxy(d.Dd);
        t.yo = 0;
        t.prototype = {
            stop: function() {
                u.logInfo(e.resolve(296));
                this.le++;
                this.bn || this.vk()
            },
            find: function(a) {
                u.logInfo(e.resolve(297));
                this.sg = a || {};
                a = this.zt();
                this.Fd(this.le);
                return a
            },
            Ol: function() {
                return this.sg
            },
            oo: function(a) {
                this.bn = !0;
                this.ok(a);
                this.stop()
            },
            vk: function() {
                this.bn = !0;
                this.kj();
                this.stop()
            },
            uo: function() {
                this.Fr == l.Mh ? (u.logInfo(e.resolve(298)), this.oo(null)) : this.Fr == l.no ? (u.logInfo(e.resolve(299), 1E3), h.addTimedTask(this.Fd, 1E3, this, [this.le])) : (u.logInfo(e.resolve(300)), this.vk())
            },
            Wh: function(b, c, d) {
                this.Sm == l.Xf ? (u.logInfo(e.resolve(301)), this.vk()) : this.Sm != l.Zf ? (u.logInfo(e.resolve(302)), 1 == b ? (b = new f(this.client), c.Jo(b)) : (b = 2 == b ? new k: new n, b.start(c), b = new a(this.client, b)), b.ss(d), this.oo(b)) : (u.logInfo(e.resolve(303)), this.stop())
            },
            Fd: function(a) {
                if (this.le == a) {
                    a = ++this.le;
                    u.logDebug(e.resolve(307));
                    var b = g.rq(this.H);
                    if (b) u.logDebug(e.resolve(308)),
                    this.Wh(1, b, b.gd());
                    else if (this.Dx) u.logDebug(e.resolve(309)),
                    this.uo();
                    else if (this.ne) {
                        u.logDebug(e.resolve(310));
                        try {
                            var c = this.ne.Lightstreamer,
                            f = c.rq(this.H);
                            if (null != f) {
                                var l = f.gd();
                                if (c.Pi(l, d.Sh)) {
                                    this.Wh(3, c.bq(l, d.Sh), l);
                                    return
                                }
                                if (c.Pi(l, d.Oh)) {
                                    this.Wh(2, c.bq(l, d.Oh), l);
                                    return
                                }
                            }
                        } catch(k) {
                            u.logDebug(e.resolve(311) + k)
                        }
                        this.ne = null;
                        this.Fd(this.le)
                    } else {
                        u.logDebug(e.resolve(312));
                        var m = this,
                        y = ++this.Lg;
                        h.addTimedTask(function() {
                            y == m.Lg && m.Lg++
                        },
                        d.kt);
                        t.yo++;
                        this.wk(this.Lg).then(function(b) {
                            t.yo--;
                            if (a == m.le) if (u.logDebug(e.resolve(313)), null == b) u.logDebug(e.resolve(314)),
                            m.uo();
                            else {
                                u.logInfo(e.resolve(304));
                                var c = b.values,
                                f = c[d.Yn],
                                h = c[d.ct];
                                if (f !== d.Vb) try {
                                    u.logDebug(e.resolve(315)),
                                    m.Wh(3, f, b.id)
                                } catch(g) {
                                    m.Fd(a)
                                } else h !== d.Vb ? (u.logDebug(e.resolve(316)), b = (new q(h)).lw(), null != b ? b.then(function(b) {
                                    m.ne = b;
                                    m.Fd(a)
                                }) : m.Fd(a)) : (u.logInfo(e.resolve(305), c), m.Fd(a))
                            }
                        })
                    }
                }
            },
            zt: function() {
                var a = this;
                return new c(function(b, c) {
                    a.ok = b;
                    a.kj = c
                })
            },
            wk: function(a, f) {
                if (this.Lg != a) return c.resolve(null);
                var g = this,
                k = d.ve,
                q = d.ve + d.lo,
                t = m.hq();
                return new c(function(c) {
                    if (f) for (var m in f) {
                        var n = t.Hf(g.H, m);
                        if (n && n[d.Rh] != f[m]) {
                            g.sg[m] = !0;
                            c({
                                id: m,
                                values: n
                            });
                            return
                        }
                    }
                    var F = {};
                    if (m = t.Ym(g.H)) for (var H = !1,
                    w = 0; w < m.length; w++) if (!g.sg[m[w]]) if (n = t.Hf(g.H, m[w]), !n || 5 > n.length) p(m[w], g.H),
                    u.logDebug(e.resolve(317), m[w]);
                    else if (n[d.Zn] != d.jk || n[d.ko] != d.$f) u.logDebug(e.resolve(318), n);
                    else {
                        var A = b.getTimeStamp(),
                        E = parseInt(n[d.Rh]),
                        A = A - E,
                        I = n[d.Yn] != d.Vb || g.Sm == l.Nh;
                        if (A <= (I ? k: q)) {
                            if (I) {
                                g.sg[m[w]] = !0;
                                c({
                                    id: m[w],
                                    values: n
                                });
                                return
                            }
                            H = !0;
                            F[m[w]] = E
                        } else I && A <= q ? (H = !0, F[m[w]] = E) : 6E4 < A && (u.logInfo(e.resolve(306)), p(m[w], g.H))
                    }
                    H ? (u.logDebug(e.resolve(319)), h.addTimedTask(function() {
                        g.wk(a, F).then(function(a) {
                            c(a)
                        })
                    },
                    d.ve)) : f ? (u.logDebug(e.resolve(320)), c(null)) : (u.logDebug(e.resolve(321), g.lg), h.addTimedTask(function() {
                        g.wk(a, {}).then(function(a) {
                            c(a)
                        })
                    },
                    g.lg))
                })
            }
        };
        t.gv = {
            stop: function() {},
            find: function() {
                return c.resolve(null)
            },
            Ol: function() {
                return {}
            }
        };
        t.It = {
            stop: function() {},
            find: function() {
                return c.reject(null)
            },
            Ol: function() {
                return {}
            }
        };
        return t
    });
    define("ConnectionSharing", "lscAe LoggerManager Inheritance Setter Environment IllegalArgumentException lscAW lscR lscAS lscAT".split(" "),
    function(e, g, d, c, b, h, f, a, l, m) {
        function k(a, c, f, d, l) {
            if (!a) throw new h("The share name is missing");
            if (!n.test(a)) throw new h("The given share name is not valid, use only alphanumeric characters");
            if (!p[f]) throw new h("sharePolicyOnNotFound must be one of: CREATE, ABORT, WAIT");
            if (!q[c]) throw new h("sharePolicyOnFound must be one of: ATTACH, ATTACH:FAST, IGNORE, ABORT");
            this.fh = this.checkBool(d, !0);
            if (!b.isBrowserDocument()) {
                if (t[c]) throw new h("ATTACH* can only be used if the LightstreamerClient is loaded inside a browser document");
                this.fh = !0
            }
            "file:" != e.$f || d || (u.logWarn(g.resolve(322)), d = !0);
            this.fh = d;
            this.H = a;
            this.td = c;
            this.Uj = f;
            this.ne = l;
            this.lg = null
        }
        var n = /^[a-zA-Z0-9]*$/,
        q = {};
        q[l.ik] = !0;
        q[l.Nh] = !0;
        q[l.Zf] = !0;
        q[l.Xf] = !0;
        var p = {};
        p[l.Mh] = !0;
        p[l.Xf] = !0;
        p[l.no] = !0;
        var t = {};
        t[l.ik] = !0;
        t[l.Nh] = !0;
        var u = g.getLoggerProxy(e.Dd);
        k.prototype = {
            Du: function(a, b, c) {
                a = new f(this.H, a);
                this.fh ? a.oA() : (b = this.Zt() ? null: b, a.nA(b, c));
                return a
            },
            Cu: function(b, c) {
                return new a(b, c)
            },
            Zt: function() {
                return this.td === l.Zf
            },
            Au: function(a) {
                var b = new k(this.H, this.td, this.td == l.ik || this.td == l.Nh ? l.Mh: this.Uj, this.fh, this.ne);
                b.lg = a;
                return b
            },
            jv: function(a) {
                if (this.td == l.Zf && this.Uj == l.Mh) return u.logInfo(g.resolve(323)),
                m.gv;
                if (this.td != l.Zf && this.td != l.Xf || this.Uj != l.Xf) return u.logInfo(g.resolve(325)),
                new m(a, this.H, this.td, this.Uj, this.fh, this.ne, this.lg);
                u.logInfo(g.resolve(324));
                return m.It
            },
            tw: function() {
                return this.H
            }
        };
        k.prototype.getShareName = k.prototype.tw;
        d(k, c, !0, !0);
        return k
    });
    define("ls_sbc", ["ConnectionSharing"],
    function(e) {
        return function(g) {
            return {
                enableSharing: function(d, c, b, h, f) {
                    c == b && "ABORT" == c ? g.yl(null) : g.yl(new e(d, c, b, h, f))
                },
                isMaster: function() {
                    return g.df()
                }
            }
        }
    });
    define("LightstreamerClient", "Helpers Global Executor lscC lscE lscD lscAP lscAO lscAc Inheritance Setter EventDispatcher lscAe EnvironmentStatus IllegalArgumentException Environment LoggerManager IllegalStateException ASSERT lsco lsck ls_sbc".split(" "),
    function(e, g, d, c, b, h, f, a, l, m, k, n, q, p, t, u, r, z, x, D, B, v) {
        function y(f, d) {
            this.C = y;
            this._callSuperConstructor(y);
            this.hp = new b;
            this.jl = new h;
            this.connectionOptions = this.hp;
            this.connectionDetails = this.jl;
            this.connectionSharing = v(this);
            this.ga = new c;
            this.xb = this.hp;
            this.ub = this.jl;
            f && this.ub.As(f);
            d && this.ub.os(d);
            this.ga.Mf(this);
            this.xb.Mf(this);
            this.ub.Mf(this);
            this.v = new l(this.xb);
            this.yh = this.T = null;
            this.Bg = this.zh = 0;
            this.SA = ++N;
            this.I = new a;
            this.Xd = q.Ub;
            this.li = null;
            this.Ss = {};
            p.addUnloadHandler(this)
        }
        var C = r.getLoggerProxy(q.hk),
        N = 0,
        F = /^[a-zA-Z0-9_]*$/;
        y.setLoggerProvider = function(a) {
            r.setLoggerProvider(a)
        };
        y.LIB_NAME = "javascript_client";
        y.LIB_VERSION = "7.0.2 build 1710";
        y.simulateSilence = function(a) {
            D.qA(a)
        };
        y.prototype = {
            toString: function() {
                return ["[|LightstreamerClient", this.SA, this.N, this.wB, "]"].join("|")
            },
            Nj: function(a) {
                this.T = a;
                this.v.Dh(a);
                this.I.Dh(a);
                this.ts = this.Bg;
                this.li = d.addRepetitiveTask(a.Uk, 5E3, a)
            },
            ap: function() {
                this.T && (this.Ss[this.T.gd()] = !0, this.v.Dh(null), this.I.Dh(null), this.li && (d.stopRepetitiveTask(this.li), this.li = null), this.T.w(), this.T = null, this.Zd && (this.Zd.w(), this.Zd = null), this.ga.ug ? this.Hk(q.dg) : this.Hk(q.Ub));
                this.search && (this.search.stop(), this.search = null)
            },
            Ee: function(a, b, c) {
                this.T && this.T.lr(a, b, c);
                return ! 0
            },
            hr: function(a, b) {
                b != this.ga && this.dispatchEvent("onPropertyChange", [a])
            },
            yl: function(a) {
                this.Bg++;
                d.addTimedTask(this.xp, 0, this, [a, this.Bg])
            },
            xp: function(a, b) {
                if (b == this.Bg) if (this.zh++, this.ap(), this.yh = a) {
                    b = this.zh;
                    var c = this,
                    f = a.jv(this);
                    this.search = f;
                    this.search.find(this.Ss).then(function(a) {
                        b == c.zh && (null === a ? c.pn(b, f.Ol()) : c.Nj(a))
                    },
                    function() {
                        b == c.zh && c.dispatchEvent("onShareAbort")
                    })
                } else this.ga.ug && this.pn()
            },
            Xu: function(a) {
                if (this.ts == this.Bg) if (this.ap(), p.isUnloading() || p.isUnloaded()) C.logInfo(r.resolve(327));
                else if (this.yh) {
                    C.logInfo(r.resolve(328));
                    var b = null;
                    2 >= this.ga.cd || (a ? b = 1E4: (b = 200 + 500 * e.randomG(this.ga.cd), 5E3 < b && (b = 5E3)));
                    a = this.yh.Au(b);
                    this.xp(a, this.ts)
                } else x.fail(),
                C.logError(r.resolve(326))
            },
            unloadEvent: function() {
                this.T && this.T.bp()
            },
            pn: function(a, b) {
                if (!a || a == this.zh) return this.Nj(new f(this)),
                this.Zd = new B(this.ga, this.xb, this.ub, this.yh, this.T, b),
                this.T.ss(this.Zd.gd()),
                this.T.cA(this.Zd.Gc()),
                this.T
            },
            df: function() {
                return null != this.Zd
            },
            connect: function() {
                if (!this.ub.rh) throw new z("Configure the server address before trying to connect");
                C.logInfo(r.resolve(329));
                d.addTimedTask(this.Ut, 0, this)
            },
            Ut: function() {
                if (!this.Xd || this.Xd != q.CONNECTING && this.Xd != q.we && 0 != this.Xd.indexOf(q.Ea)) {
                    this.yh || this.Zd || this.pn();
                    C.logDebug(r.resolve(331));
                    this.ga.S("connectionRequested", !0);
                    var a = this.T;
                    a && a.Mo()
                }
            },
            disconnect: function() {
                C.logInfo(r.resolve(330));
                d.addTimedTask(this.Vt, 0, this)
            },
            Vt: function() {
                C.logDebug(r.resolve(332));
                this.ga.S("connectionRequested", !1);
                var a = this.T;
                a && a.No()
            },
            Gb: function() {
                return this.Xd
            },
            sendMessage: function(a, b, c, f, h) {
                if (!b) b = q.rc;
                else if (!F.test(b)) throw new t("The given sequence name is not valid, use only alphanumeric characters plus underscore, or null");
                c = c ? this.checkPositiveNumber(c) : null;
                h = this.checkBool(h, !0);
                d.addTimedTask(this.Tt, 0, this, [a, b, f, c, h])
            },
            Tt: function(a, b, c, f, d) {
                this.T && this.T.sb ? this.I.Hg(a, b, c, f) : d ? this.I.Yu(a, b, c, f) : c && this.I.fireEvent("onAbort", c, [a, !1])
            },
            xz: function(a, b) {
                this.dispatchEvent("onServerError", [a, b])
            },
            Kj: function() {
                this.v.Ry();
                this.I.pu()
            },
            yz: function() {
                this.v.Hw();
                this.I.Gw()
            },
            Hk: function(a) {
                a != this.Xd && (this.Xd = a, this.dispatchEvent("onStatusChange", [a]))
            },
            qh: function(a) {
                return this.T && this.T.sb ? (this.T.Np(a), !0) : !1
            },
            ww: function() {
                var a = [],
                b = this.v.pc,
                c;
                for (c in b) b[c].Hs || a.push(b[c]);
                return a
            },
            subscribe: function(a) {
                this.v.zo(a)
            },
            unsubscribe: function(a) {
                this.v.Sr(a)
            },
            addListener: function(a) {
                this._callSuperMethod(y, "addListener", [a])
            },
            removeListener: function(a) {
                this._callSuperMethod(y, "removeListener", [a])
            },
            getListeners: function() {
                return this._callSuperMethod(y, "getListeners")
            }
        };
        y.setLoggerProvider = y.setLoggerProvider;
        y.prototype.connect = y.prototype.connect;
        y.prototype.disconnect = y.prototype.disconnect;
        y.prototype.getStatus = y.prototype.Gb;
        y.prototype.sendMessage = y.prototype.sendMessage;
        y.prototype.getSubscriptions = y.prototype.ww;
        y.prototype.subscribe = y.prototype.subscribe;
        y.prototype.unsubscribe = y.prototype.unsubscribe;
        y.prototype.addListener = y.prototype.addListener;
        y.prototype.removeListener = y.prototype.removeListener;
        y.prototype.getListeners = y.prototype.getListeners;
        y.prototype.enableSharing = y.prototype.yl;
        y.prototype.isMaster = y.prototype.df;
        y.prototype.unloadEvent = y.prototype.unloadEvent;
        y.prototype.preUnloadEvent = y.prototype.unloadEvent;
        m(y, n, !1, !0);
        m(y, k, !0, !0);
        return y
    });
    define("lscAa", ["lscAe", "ASSERT"],
    function(e, g) {
        function d(c, b, d) {
            this.Ef = c;
            this.Oq = b;
            this.Bj = d
        }
        d.prototype = {
            qr: function(c, b, d) {
                this.qn() && (g.verifyValue(b, 1), this.Ef.rA(this.Bj, d))
            },
            Af: function(c, b) {
                this.qn() && this.Ef.sA(c, b, this.Bj)
            },
            onItemUpdate: function(c) {
                if (this.qn()) return g.verifyValue(c.Ii(), 1),
                c = c.yd,
                this.Ef.$z(c.length - 2),
                c = this.zu(c),
                this.Ef.update(c, !1, !0)
            },
            qn: function() {
                return this.Ef.xq(this.Oq, this.Bj)
            },
            zu: function(c) {
                var b = this.Ef,
                d = this.Oq,
                f = [];
                f[0] = b.Sf;
                f[1] = d;
                f.yc = [];
                for (var d = b.aq() + 2, a = 2, g = 2; g < d; g++) g == b.keyCode + 1 ? f[g] = this.Bj: g == b.ab + 1 ? f[g] = "UPDATE": g <= b.ja.ob + 1 ? f[g] = e.xe: (f[g] = c[a], c.Kn[a] ? f[g] = e.xe: f.yc.push(g - 1), a++);
                return f
            }
        };
        d.prototype.onSubscriptionError = d.prototype.Af;
        d.prototype.onItemUpdate = d.prototype.onItemUpdate;
        d.prototype.onItemLostUpdates = d.prototype.qr;
        return d
    });
    define("lscAZ", ["LoggerManager", "IllegalArgumentException", "lscAe"],
    function(e, g, d) {
        function c(b, c, a, d, e) {
            this.zx = c;
            this.yx = b;
            this.yt = d;
            this.ja = a;
            this.yd = e
        }
        var b = e.getLoggerProxy(d.hk);
        c.prototype = {
            Xl: function() {
                return this.yx
            },
            Ii: function() {
                return this.zx
            },
            getValue: function(b) {
                b = this.Ih(b);
                return (b = this.yd[b]) && b.xB ? b.value: b
            },
            Nq: function(b) {
                b = this.Ih(b);
                return ! this.yd.Kn[b]
            },
            ox: function() {
                return this.yt
            },
            forEachChangedField: function(c) {
                for (var f = this.yd.yc,
                a = 0; a < f.length; a++) {
                    var d = this.ja.getName(f[a]),
                    g = this.yd[f[a] + 1];
                    try {
                        c(d, f[a], g)
                    } catch(k) {
                        b.logErrorExc(k, e.resolve(333))
                    }
                }
            },
            Lp: function(c) {
                for (var f = 2; f < this.yd.length; f++) {
                    var a = f - 1,
                    d = this.ja.getName(a),
                    g = this.yd[f];
                    try {
                        c(d, a, g)
                    } catch(k) {
                        b.logErrorExc(k, e.resolve(334))
                    }
                }
            },
            Ih: function(b) {
                b = isNaN(b) ? this.ja.Sd(b) : b;
                if (null == b) throw new g("the specified field does not exist");
                if (0 >= b || b > this.ja.Ul() + 1) throw new g("the specified field position is out of bounds");
                return b + 1
            },
            gw: function() {
                return this.yd.length - 2
            },
            Ov: function(b) {
                return this.ja.getName(b)
            }
        };
        c.prototype.getItemName = c.prototype.Xl;
        c.prototype.getItemPos = c.prototype.Ii;
        c.prototype.getValue = c.prototype.getValue;
        c.prototype.isValueChanged = c.prototype.Nq;
        c.prototype.isSnapshot = c.prototype.ox;
        c.prototype.forEachChangedField = c.prototype.forEachChangedField;
        c.prototype.forEachField = c.prototype.Lp;
        return c
    });
    define("lscZ", [],
    function() {
        function e() {
            this.Pb = null;
            this.ob = 0
        }
        e.prototype = {
            Bs: function(e) {
                this.Pb = e
            },
            Ul: function() {
                return this.Pb ? this.ob + this.Pb.ob: this.ob
            },
            sd: function(e) {
                this.ob = e
            }
        };
        return e
    });
    define("lsca", ["Inheritance", "lscZ"],
    function(e, g) {
        function d(c) {
            this._callSuperConstructor(d);
            this.list = c;
            for (var b = {},
            e = 0; e < c.length; e++) b[c[e]] = e + 1;
            this.cs = b;
            this.ob = c.length
        }
        d.prototype = {
            sd: function() {},
            Pl: function() {
                return this.list.join(" ")
            },
            Sd: function(c) {
                return this.cs[c] ? this.cs[c] : this.Pb ? (c = this.Pb.Sd(c), null !== c ? c + this.ob: null) : null
            },
            getName: function(c) {
                return c > this.ob && this.Pb ? this.Pb.getName(c - this.ob) : this.list[c - 1] || null
            },
            Fc: function() {
                return this.list
            }
        };
        e(d, g);
        return d
    });
    define("lscb", ["Inheritance", "lscZ"],
    function(e, g) {
        function d(c) {
            this._callSuperConstructor(d);
            this.name = c
        }
        d.prototype = {
            Pl: function() {
                return this.name
            },
            Sd: function(c) {
                return this.Pb ? (c = this.Pb.Sd(c), null !== c ? c + this.ob: null) : null
            },
            getName: function(c) {
                return this.Pb ? this.Pb.getName(c - this.ob) : null
            },
            Fc: function() {
                return this.name
            }
        };
        e(d, g);
        return d
    });
    define("Matrix", [],
    function() {
        function e(e) {
            this.$ = e || {}
        }
        e.prototype = {
            insert: function(e, d, c) {
                d in this.$ || (this.$[d] = {});
                this.$[d][c] = e
            },
            get: function(e, d) {
                return e in this.$ && d in this.$[e] ? this.$[e][d] : null
            },
            del: function(e, d) {
                if (! (!e in this.$)) {
                    d in this.$[e] && delete this.$[e][d];
                    for (var c in this.$[e]) return;
                    delete this.$[e]
                }
            },
            insertRow: function(e, d) {
                this.$[d] = e
            },
            getRow: function(e) {
                return e in this.$ ? this.$[e] : null
            },
            delRow: function(e) {
                e in this.$ && delete this.$[e]
            },
            getEntireMatrix: function() {
                return this.$
            },
            isEmpty: function() {
                for (var e in this.$) return ! 1;
                return ! 0
            },
            forEachElement: function(e) {
                for (var d in this.$) this.forEachElementInRow(d, e)
            },
            forEachRow: function(e) {
                for (var d in this.$) e(d)
            },
            forEachElementInRow: function(e, d) {
                var c = this.$[e],
                b;
                for (b in c) d(c[b], e, b)
            }
        };
        e.prototype.insert = e.prototype.insert;
        e.prototype.get = e.prototype.get;
        e.prototype.del = e.prototype.del;
        e.prototype.insertRow = e.prototype.insertRow;
        e.prototype.getRow = e.prototype.getRow;
        e.prototype.delRow = e.prototype.delRow;
        e.prototype.getEntireMatrix = e.prototype.getEntireMatrix;
        e.prototype.forEachElement = e.prototype.forEachElement;
        e.prototype.forEachElementInRow = e.prototype.forEachElementInRow;
        e.prototype.forEachRow = e.prototype.forEachRow;
        e.prototype.isEmpty = e.prototype.isEmpty;
        return e
    });
    define("Subscription", "lscAa lscAZ lsca lscb Inheritance Setter Matrix Executor lscAe EventDispatcher IllegalArgumentException IllegalStateException LoggerManager lscAi ASSERT Helpers".split(" "),
    function(e, g, d, c, b, h, f, a, l, m, k, n, q, p, t, u) {
        function r(a, b, c) {
            this._callSuperConstructor(r);
            a = (new String(a)).toUpperCase();
            if (!a || !D[a]) throw new k("The given value is not a valid subscription mode. Admitted values are MERGE, DISTINCT, RAW, COMMAND");
            this.$c = a;
            this.ja = this.Bc = this.Cb = this.Jb = this.gf = this.hf = null;
            this.gc = "RAW" === a ? null: "yes";
            this.Dj = this.Sf = this.ri = this.Yh = this.qo = this.hg = this.je = this.Ua = null;
            this.ae = new f;
            this.Mc = new f;
            this.f = null;
            this.Wa = 1;
            this.IA = 0;
            this.Zc = null;
            this.Fn = 0;
            this.um = null;
            this.Gj = this.nj = 0;
            this.behavior = this.$c == l.Yf ? 2 : 1;
            this.Ln = this.keyCode = this.ab = null;
            this.vd = new f;
            this.Bh = this.oe = this.ud = null;
            this.CA = l.pk;
            if (b) {
                if (!c || !u.isArray(c)) throw new k("Please specify a valid field list");
                u.isArray(b) ? this.wh(b) : this.wh([b]);
                this.Oj(c)
            } else if (c) throw new k("Please specify a valid item or item list");
        }
        function z(a, b) {
            for (var c = 0; c < a.length; c++) if (a[c]) {
                if ( - 1 < a[c].indexOf(" ")) throw new k(b + " name cannot contain spaces");
                if (!isNaN(a[c])) throw new k(b + " name cannot be a number");
            } else throw new k(b + " name cannot be empty");
        }
        function x(a, b) {
            return a - b
        }
        var D = {
            COMMAND: !0,
            RAW: !0,
            MERGE: !0,
            DISTINCT: !0
        },
        B = l.xe,
        v = q.getLoggerProxy(l.cg);
        r.prototype = {
            toString: function() {
                return ["[|Subscription", this.Wa, this.IA, this.Zc, this.Fn, this.um, "]"].join("|")
            },
            Xo: function() {
                this.Sf = null;
                this.ae = new f;
                this.Mc = new f;
                this.ja.sd(0);
                this.Jb.sd(0);
                3 == this.behavior && (this.ja.Bs(null), this.vd = new f);
                v.logDebug(q.resolve(339), this)
            },
            gy: function(a, b, c) {
                this.pb();
                if (!this.Jb) throw new k("Invalid Subscription, please specify an item list or item group");
                if (!this.ja) throw new k("Invalid Subscription, please specify a field list or field schema");
                this.Wa = 5;
                this.um = b;
                this.Zc = a;
                this.f = c;
                this.Fn++;
                this.nj++;
                t.verifyValue(this.nj, 1);
                v.logInfo(q.resolve(336), this);
                return ! 0
            },
            Gy: function() {
                this.Fn++;
                this.Wa = 2;
                v.logDebug(q.resolve(340), this)
            },
            Iy: function(a) {
                this.Sf = a;
                this.Wa = 3;
                v.logDebug(q.resolve(341), this)
            },
            vy: function() {
                var a = this.ef();
                this.Wa = 5;
                this.Xo();
                a && this.nr();
                v.logDebug(q.resolve(342), this)
            },
            zy: function() {
                this.Vw();
                var a = this.ef();
                this.Wa = 1;
                this.Zc = this.um = null;
                delete this.Dj;
                3 == this.behavior && this.hz();
                this.Xo();
                this.nj--;
                t.verifyValue(this.nj, 0);
                a && this.nr();
                this.f = null;
                v.logDebug(q.resolve(343), this)
            },
            Ey: function(a, b, c, f) {
                this.Wa = 4;
                this.Gj++;
                t.verifyValue(this.Gj, 1);
                v.logInfo(q.resolve(337), this);
                3 == this.behavior && this.ja.Bs(this.Bh);
                this.Bc && 1 != this.behavior && this.bA(b, a);
                this.Jb.sd(c);
                this.ja.sd(f);
                this.dispatchEvent("onSubscription")
            },
            nr: function() {
                this.Gj--;
                t.verifyValue(this.Gj, 0);
                v.logInfo(q.resolve(338), this);
                this.dispatchEvent("onUnsubscription")
            },
            hz: function() {
                var a = this;
                this.vd.forEachElement(function(b, c, f) {
                    a.$m(c, f)
                })
            },
            dz: function() {
                var a = this;
                this.vd.forEachElementInRow(function(b, c, f) {
                    a.$m(c, f)
                })
            },
            mw: function() {
                this.Gi();
                return this.Dj
            },
            Qp: function() {
                if (null != this.Ua) {
                    var a = this.Ua;
                    return {
                        LS_requested_max_frequency: "unlimited" == a ? 0 : a
                    }
                }
                return {}
            },
            Gi: function() {
                var a = {
                    LS_mode: this.$c,
                    LS_id: encodeURIComponent(this.Jb.Pl()),
                    LS_schema: encodeURIComponent(this.ja.Pl())
                };
                null != this.ri && (a.LS_data_adapter = encodeURIComponent(this.ri));
                null != this.Yh && (a.LS_selector = encodeURIComponent(this.Yh));
                null != this.hg && (a.LS_start = this.hg);
                null != this.qo && (a.LS_end = this.qo);
                null != this.gc && (a.LS_snapshot = "yes" === this.gc ? "true": "no" === this.gc ? "false": this.gc);
                p.sa(a, this.Qp());
                if (null != this.je) {
                    var b = this.je;
                    "unlimited" != b && 0 < b && (a.LS_requested_buffer_size = b)
                }
                v.logDebug(q.resolve(344), this);
                return this.Dj = a
            },
            Zz: function() {
                if (this.$c == l.Yf && null != this.Cb && (this.ab = this.Cb.Sd("command"), this.keyCode = this.Cb.Sd("key"), !this.ab || !this.keyCode)) throw new k("A field list for a COMMAND subscription must contain the key and command fields");
            },
            bA: function(a, b) {
                v.logDebug(q.resolve(345), this, a, b);
                this.ab = a;
                this.keyCode = b
            },
            pb: function() {
                if (this.af()) throw new n("Cannot modify an active Subscription, please unsubscribe before applying any change");
            },
            Vw: function() {
                if (!this.af()) throw new n("Subscription is not active");
            },
            en: function() {
                if (this.$c != l.Yf) throw new n("Second level field list is only available on COMMAND Subscriptions");
            },
            fl: function() {
                if (this.$c != l.Yf) throw new n("This method can only be used on COMMAND subscriptions");
            },
            ex: function() {
                return 1 == this.Wa
            },
            qx: function() {
                return 2 == this.Wa
            },
            Mq: function() {
                return 3 == this.Wa
            },
            ef: function() {
                return 4 == this.Wa
            },
            gx: function() {
                return 5 == this.Wa
            },
            af: function() {
                return 1 != this.Wa
            },
            hm: function() {
                return this.ef()
            },
            wh: function(a) {
                this.pb();
                if (!u.isArray(a)) throw new k(" Please specifiy a valid array");
                z(a, "An item");
                this.hf = null == a ? null: new d(a);
                this.gf = null;
                this.Jb = this.hf
            },
            Yv: function() {
                if (!this.hf) {
                    if (this.gf) throw new n("This Subscription was initiated using an item group, use getItemGroup instead of using getItems");
                    throw new n("The  item list/item group of this Subscription was not initiated");
                }
                return this.hf.Fc()
            },
            vs: function(a) {
                this.pb();
                this.hf = null;
                this.Jb = this.gf = null == a ? null: new c(a)
            },
            Xv: function() {
                if (!this.gf) {
                    if (this.hf) throw new n("This Subscription was initiated using an item list, use getItems instead of using getItemGroup");
                    throw new n("The  item list/item group of this Subscription was not initiated");
                }
                return this.gf.Fc()
            },
            Oj: function(a) {
                this.pb();
                if (!u.isArray(a)) throw new k(" Please specifiy a valid array");
                z(a, "A field");
                this.Cb = null == a ? null: new d(a);
                this.Bc = null;
                this.ja = this.Cb;
                this.Zz()
            },
            Wp: function() {
                if (!this.Cb) {
                    if (this.Bc) throw new n("This Subscription was initiated using a field schema, use getFieldSchema instead of using getFields");
                    throw new IllegalStateExceptio("The field list/field schema of this Subscription was not initiated");
                }
                return this.Cb.Fc()
            },
            kn: function(a) {
                this.pb();
                this.Cb = null;
                this.ja = this.Bc = null == a ? null: new c(a)
            },
            Pv: function() {
                if (!this.Bc) {
                    if (this.Cb) throw new n("This Subscription was initiated using a field list, use getFields instead of using getFieldSchema");
                    throw new IllegalStateExceptio("The field list/field schema of this Subscription was not initiated");
                }
                return this.Bc.Fc()
            },
            Ki: function() {
                return this.$c
            },
            uh: function(a) {
                this.pb();
                this.ri = a;
                v.logDebug(q.resolve(346), this, a)
            },
            Mv: function() {
                return this.ri
            },
            Sj: function(a) {
                this.pb();
                this.Yh = a;
                v.logDebug(q.resolve(347), this, a)
            },
            qw: function() {
                return this.Yh
            },
            xh: function(a) {
                a && (a = new String(a), a = a.toLowerCase());
                var b = this.Ua;
                if (this.af()) {
                    if (!a && 0 != a || null == this.Ua) throw new n("Can't change the frequency from/to 'unfiltered' or null while the Subscription is active");
                    if ("unfiltered" == a || "unfiltered" == this.Ua) throw new n("Can't change the frequency from/to 'unfiltered' or null while the Subscription is active");
                }
                if (a || 0 == a) if ("unfiltered" == a || "unlimited" == a) this.Ua = a;
                else try {
                    this.Ua = this.checkPositiveNumber(a, !1, !0)
                } catch(c) {
                    throw new k("The given value is not valid for this setting; use null, 'unlimited', 'unfiltered' or a positive number instead");
                } else this.Ua = null;
                if ((this.qx() || this.Mq() || this.ef()) && String(b) != String(this.Ua) && (this.f.Wc(this, this.Qp()), 3 == this.behavior)) {
                    var f = this;
                    this.vd.forEachElement(function(a) {
                        t.verifyOk(f.ef());
                        a.xh(f.Ua)
                    })
                }
                v.logDebug(q.resolve(348), this, this.Ua)
            },
            ow: function() {
                return this.Ua
            },
            Rj: function(a) {
                this.pb();
                if (a || 0 == a) if (a = new String(a), a = a.toLowerCase(), "unlimited" == a) this.je = a;
                else try {
                    this.je = this.checkPositiveNumber(a)
                } catch(b) {
                    throw new k("The given value is not valid for this setting; use null, 'unlimited' or a positive number instead");
                } else this.je = null;
                v.logDebug(q.resolve(349), this, this.je)
            },
            nw: function() {
                return this.je
            },
            nn: function(a) {
                this.pb();
                if (a || 0 == a) if (a = new String(a), a = a.toLowerCase(), "no" == a) this.gc = a;
                else {
                    if (this.$c == l.qk) throw new n("Snapshot is not permitted if RAW was specified as mode");
                    if ("yes" == a) this.gc = a;
                    else {
                        if (isNaN(a)) throw new k("The given value is not valid for this setting; use null, 'yes', 'no' or a positive number instead");
                        if (this.$c != l.lk) throw new n("Numeric values are only allowed when the subscription mode is DISTINCT");
                        try {
                            this.gc = this.checkPositiveNumber(a)
                        } catch(b) {
                            throw new k("The given value is not valid for this setting; use null, 'yes', 'no' or a positive number instead");
                        }
                    }
                } else this.gc = null;
                v.logDebug(q.resolve(350), this, this.gc)
            },
            pw: function() {
                return this.gc
            },
            Ez: function(a) {
                this.pb();
                this.en();
                if (!u.isArray(a)) throw new k(" Please specifiy a valid array");
                z(a, "A field");
                this.ud = null == a ? null: new d(a);
                this.oe = null;
                this.Bh = this.ud;
                this.Jr()
            },
            Ev: function() {
                if (!this.ud) {
                    if (this.oe) throw new n("The second level of this Subscription was initiated using a field schema, use getCommandSecondLevelFieldSchema instead of using getCommandSecondLevelFields");
                    throw new n("The second level of this Subscription was not initiated");
                }
                return this.ud.Fc()
            },
            Dz: function(a) {
                this.pb();
                this.en();
                this.ud = null;
                this.Bh = this.oe = null == a ? null: new c(a);
                this.Jr()
            },
            Dv: function() {
                if (!this.oe) {
                    if (this.ud) throw new n("The second level of this Subscription was initiated using a field list, use getCommandSecondLevelFields instead of using getCommandSecondLevelFieldSchema");
                    throw new n("The second level of this Subscription was not initiated");
                }
                return this.oe.Fc()
            },
            Cz: function(a) {
                this.pb();
                this.en();
                this.Ln = a;
                v.logDebug(q.resolve(351), this, a)
            },
            Cv: function() {
                return this.Ln
            },
            getValue: function(a, b) {
                return this.ae.get(this.Ms(a), this.Ls(b))
            },
            Fv: function(a, b, c) {
                this.fl();
                return this.Mc.get(this.Ms(a) + " " + b, this.Ls(c, !0))
            },
            gq: function() {
                this.fl();
                if (!this.Bc && this.Cb) throw new n("This Subscription was initiated using a field list, key field is always 'key'");
                if (null == this.keyCode) throw new n("The position of the key field is currently unknown");
                return this.keyCode
            },
            Rp: function() {
                this.fl();
                if (!this.Bc && this.Cb) throw new n("This Subscription was initiated using a field list, command field is always 'command'");
                if (null == this.ab) throw new n("The position of the command field is currently unknown");
                return this.ab
            },
            Ls: function(a, b) {
                var c = this.Ih(a, this.ja, b);
                if (null === c) throw new k("the specified field does not exist");
                if (!1 === c) throw new k("the specified field position is out of bounds");
                return c
            },
            Ms: function(a) {
                a = this.Ih(a, this.Jb);
                if (null === a) throw new k("the specified item does not exist");
                if (!1 === a) throw new k("the specified item position is out of bounds");
                return a
            },
            Ih: function(a, b, c) {
                a = isNaN(a) ? b.Sd(a) : a;
                return null == a ? null: 0 >= a || a > (c ? b.Ul() : b.ob) ? !1 : a
            },
            Jr: function() {
                this.behavior = null == this.Bh ? 2 : 3
            },
            Wu: function(a) {
                this.dispatchEvent("onEndOfSnapshot", [this.Jb.getName(a), a])
            },
            su: function(a) {
                var b = this.Jb.getName(a);
                2 == this.behavior ? this.Mc = new f: 3 == this.behavior && (this.Mc = new f, this.dz(a));
                this.dispatchEvent("onClearSnapshot", [b, a])
            },
            Ex: function(a, b) {
                this.dispatchEvent("onItemLostUpdates", [this.Jb.getName(a), a, b])
            },
            rA: function(a, b) {
                this.dispatchEvent("onCommandSecondLevelItemLostUpdates", [b, a])
            },
            wz: function(a, b) {
                this.dispatchEvent("onSubscriptionError", [a, b])
            },
            sA: function(a, b, c) {
                this.dispatchEvent("onCommandSecondLevelSubscriptionError", [a, b, c])
            },
            update: function(a, b, c) {
                t.verifyValue(4, this.Wa);
                var f = a[1],
                d = new String(f);
                1 != this.behavior && (d = this.Ly(a, f, c));
                3 != this.behavior || c || this.Iw(a);
                1 == this.behavior ? this.Qs(this.ae, f, a, !0) : this.Qs(this.Mc, d, a, !0);
                a = new g(this.Jb.getName(f), f, this.ja, b, a);
                this.dispatchEvent("onItemUpdate", [a]);
                "DELETE" == this.Mc.get(d, this.ab) && this.Mc.delRow(d)
            },
            Qs: function(a, b, c, f) {
                var d = c.length - 2,
                e = 1,
                h = 2;
                for (c.Kn = {}; e <= d; e++, h++) c[h] !== B ? a.insert(c[h], b, e) : f && (c[h] = a.get(b, e), c.Kn[h] = !0)
            },
            Ly: function(a, b, c) {
                var f;
                if ("undefined" == typeof a[this.keyCode + 1] || "undefined" == typeof a[this.ab + 1]) return v.logWarn(q.resolve(335)),
                null;
                f = a[this.keyCode + 1] == B ? b + " " + this.ae.get(b, this.keyCode) : b + " " + a[this.keyCode + 1];
                if (c) a[this.keyCode + 1] = B,
                a[this.ab + 1] == this.Mc.get(f, this.ab) ? a[this.ab + 1] = B: (a.yc.push(this.ab), a.yc.sort(x));
                else {
                    a.yc = [];
                    for (c = 2; c < a.length; c++) a[c] && a[c] == B ? a[c] = this.ae.get(b, c - 1) : this.ae.insert(a[c], b, c - 1),
                    a[c] == this.Mc.get(f, c - 1) ? a[c] = B: a.yc.push(c - 1);
                    if (3 == this.behavior && (b = this.aq() + 2, b > a.length)) for (c = a.length; c < b; c++) a[c] = B
                }
                return f
            },
            Iw: function(a) {
                var b = a[1],
                c = a[this.keyCode + 1] == B ? this.ae.get(b, this.keyCode) : a[this.keyCode + 1];
                a = a[this.ab + 1];
                var f = this.xq(b, c);
                "DELETE" == a ? f && this.$m(b, c) : f || this.Qt(b, c)
            },
            Fx: function() {
                this.Hs = !0
            },
            xq: function(a, b) {
                return null !== this.vd.get(a, b)
            },
            $m: function(a, b) {
                this.f.Sr(this.vd.get(a, b));
                this.vd.del(a, b)
            },
            Qt: function(a, b) {
                var c = new r(this.CA);
                c.Fx();
                this.vd.insert(c, a, b);
                try {
                    c.wh([b])
                } catch(f) {
                    this.dispatchEvent("onCommandSecondLevelSubscriptionError", [14, "The received key value is not a valid name for an Item", b]);
                    return
                }
                this.ud ? c.Oj(this.ud.Fc()) : c.kn(this.oe.Fc());
                c.uh(this.Ln);
                c.nn("yes");
                c.Ua = this.Ua;
                var d = new e(this, a, b);
                c.addListener(d);
                this.f.zo(c)
            },
            $z: function(a) {
                this.Bh.sd(a)
            },
            aq: function() {
                return this.ja.Ul()
            },
            addListener: function(a) {
                this._callSuperMethod(r, "addListener", [a])
            },
            removeListener: function(a) {
                this._callSuperMethod(r, "removeListener", [a])
            },
            getListeners: function() {
                return this._callSuperMethod(r, "getListeners")
            }
        };
        r.prototype.isActive = r.prototype.af;
        r.prototype.isSubscribed = r.prototype.hm;
        r.prototype.setItems = r.prototype.wh;
        r.prototype.getItems = r.prototype.Yv;
        r.prototype.setItemGroup = r.prototype.vs;
        r.prototype.getItemGroup = r.prototype.Xv;
        r.prototype.setFields = r.prototype.Oj;
        r.prototype.getFields = r.prototype.Wp;
        r.prototype.setFieldSchema = r.prototype.kn;
        r.prototype.getFieldSchema = r.prototype.Pv;
        r.prototype.getMode = r.prototype.Ki;
        r.prototype.setDataAdapter = r.prototype.uh;
        r.prototype.getDataAdapter = r.prototype.Mv;
        r.prototype.setSelector = r.prototype.Sj;
        r.prototype.getSelector = r.prototype.qw;
        r.prototype.setRequestedMaxFrequency = r.prototype.xh;
        r.prototype.getRequestedMaxFrequency = r.prototype.ow;
        r.prototype.setRequestedBufferSize = r.prototype.Rj;
        r.prototype.getRequestedBufferSize = r.prototype.nw;
        r.prototype.setRequestedSnapshot = r.prototype.nn;
        r.prototype.getRequestedSnapshot = r.prototype.pw;
        r.prototype.setCommandSecondLevelFields = r.prototype.Ez;
        r.prototype.getCommandSecondLevelFields = r.prototype.Ev;
        r.prototype.setCommandSecondLevelFieldSchema = r.prototype.Dz;
        r.prototype.getCommandSecondLevelFieldSchema = r.prototype.Dv;
        r.prototype.setCommandSecondLevelDataAdapter = r.prototype.Cz;
        r.prototype.getCommandSecondLevelDataAdapter = r.prototype.Cv;
        r.prototype.getValue = r.prototype.getValue;
        r.prototype.getCommandValue = r.prototype.Fv;
        r.prototype.getKeyPosition = r.prototype.gq;
        r.prototype.getCommandPosition = r.prototype.Rp;
        r.prototype.addListener = r.prototype.addListener;
        r.prototype.removeListener = r.prototype.removeListener;
        r.prototype.getListeners = r.prototype.getListeners;
        b(r, m, !1, !0);
        b(r, h, !0, !0);
        return r
    });
    define("Cell", ["Environment"],
    function(e) {
        function g(b, c) {
            this.h = b;
            this.ka = !0;
            this.yi = 0;
            c || (c = this.Aw());
            if (c) if (0 == c.toLowerCase().indexOf("style.")) {
                var d = c.slice(6);
                this.Uf = h(d);
                this.Jf = f(d)
            } else this.Uf = n(c),
            this.Jf = q(c);
            else b.nodeName.toLowerCase() in t ? (this.Uf = a, this.Jf = l) : (this.Uf = m, this.Jf = k);
            this.rg = u++;
            this.Vc = 0;
            this.hc = this.ic = this.$d = null;
            this.Sw = this.Jf(!0);
            this.Qw = this.h.className;
            this.Rw = this.Fp()
        }
        function d(a, b) {
            if (!1 === g.ck) return a.dataset ? a.dataset[b] : a.getAttribute("data-" + b);
            if (!0 === g.ck) return a.getAttribute(b);
            var c = a.dataset ? a.dataset[b] : a.getAttribute("data-" + b);
            if (c) return g.ck = !1,
            c;
            if (c = a.getAttribute(b)) g.ck = !0;
            return c
        }
        function c(a, b) {
            if (!a) return b;
            for (var c in b) a[c] || null === a[c] || "" === a[c] || (a[c] = b[c]);
            return a
        }
        function b(a) {
            return (a = d(a, "source")) && "lightstreamer" == a.toLowerCase()
        }
        function h(a) {
            return function(b) {
                this.h.style[a] = "\u00a0" === b ? null: b
            }
        }
        function f(a) {
            return function() {
                return this.h.style[a] || ""
            }
        }
        function a(a) {
            this.h.value = a && "\u00a0" !== a ? a: ""
        }
        function l() {
            return this.h.value
        }
        function m(a, b) {
            b ? this.h.innerHTML = a: 1 != this.h.childNodes.length || 3 != this.h.firstChild.nodeType ? (null != this.h.firstChild && (this.h.innerHTML = ""), this.h.appendChild(document.createTextNode(a))) : this.h.firstChild.nodeValue = a
        }
        function k(a) {
            return a ? this.h.innerHTML: this.h.firstChild ? this.h.firstChild.nodeValue: ""
        }
        function n(b) {
            return "value" === b ? a: function(a) {
                a && "\u00a0" !== a ? this.h.setAttribute(b, a) : this.h.removeAttribute(b)
            }
        }
        function q(a) {
            return "value" === a ? l: function() {
                return this.h.getAttribute(a)
            }
        }
        e.browserDocumentOrDie();
        var p = {
            extra: !0,
            "first-level": !0,
            "second-level": !0
        },
        t = {
            input: !0,
            textarea: !0
        },
        u = 0;
        g.fB = 1;
        g.ao = 2;
        g.bt = "first-level";
        g.jt = "second-level";
        g.ck = null;
        g.Ji = function(a, c) {
            var d = [];
            c || (c = ["*"]);
            for (var e = 0; e < c.length; e++) for (var f = a.getElementsByTagName(c[e]), h = 0; h < f.length; h++) b(f[h]) && d.push(new g(f[h]));
            return d
        };
        g.Ts = b;
        g.hd = function(a) {
            for (var b = null; null != a && a != document;) b = a,
            a = a.parentNode;
            return null == a ? null != b && "HTML" == b.nodeName ? !0 : !1 : !0
        };
        g.prototype = {
            dn: function(a, b) {
                this.Uf(a.Jf(), b);
                this.$d = a.$d;
                this.ic = a.ic;
                this.hc = a.hc;
                this.Vc = a.Vc;
                this.Mj(a.Fp());
                this.Nn(a.h.className);
                this.yi = a.yi
            },
            Jg: function() {
                return this.h
            },
            Fp: function() {
                var a = {},
                b;
                for (b in this.h.style) a[b] = this.h.style[b];
                return a
            },
            Nn: function(a) {
                null !== a && this.h.className != a && (this.h.className = a)
            },
            Mj: function(a) {
                if (a) for (var b in a) {
                    "CLASS" == b && this.Nn(a[b]);
                    try {
                        null !== a[b] && (this.h.style[b] = a[b])
                    } catch(c) {}
                }
            },
            ng: function(a, b) {
                a == this.Vc && (1 == b ? (this.Mj(this.ic), this.ic = null) : (this.Mj(this.hc), this.hc = null))
            },
            Gd: function(a, b) {
                a == this.Vc && (this.Uf(this.$d, b), this.$d = null, this.ng(a, 1))
            },
            jA: function() {
                this.Vc++;
                return this.Vc
            },
            We: function() {
                var a = d(this.h, "field");
                return a ? a: null
            },
            Fb: function() {
                var a = d(this.h, "replica");
                return a ? a: null
            },
            Vp: function() {
                var a = d(this.h, "fieldtype");
                if (!a) return "first-level";
                a = a.toLowerCase();
                return p[a] ? a: "first-level"
            },
            uq: function() {
                return d(this.h, "grid")
            },
            getRow: function() {
                var a = d(this.h, "item");
                a || (a = d(this.h, "row"));
                return a
            },
            Aw: function() {
                return d(this.h, "update")
            },
            dm: function() {
                return++this.yi
            },
            Sl: function() {
                return this.yi
            },
            Kq: function(a) {
                return a.h === this.h
            },
            hd: function() {
                return g.hd(this.h)
            },
            Cq: function() {
                return this.h.id ? document.getElementById(this.h.id) === this.h: this.hd(this.h)
            },
            mn: function(a) {
                this.$d = "" === a ? "\u00a0": a
            },
            jg: function(a, b, c) {
                this.ic || (this.ic = {});
                this.hc || (this.hc = {});
                this.ic[c] = a || "";
                this.hc[c] = b || ""
            },
            fw: function(a) {
                a && (this.ic = c(this.ic, a));
                return this.ic
            },
            ew: function(a) {
                a && (this.hc = c(this.hc, a));
                return this.hc
            },
            clean: function() {
                this.Uf(this.Sw, !0);
                this.Nn(this.Qw);
                this.Mj(this.Rw)
            }
        };
        return g
    });
    define("CellMatrix", ["Matrix", "Inheritance", "Cell"],
    function(e, g, d) {
        function c(b) {
            this._callSuperConstructor(c, [b])
        }
        function b(b, a) {
            var c = new d(document.createElement("p"));
            c.dn(b, a);
            var e = b.Fb();
            c.Fb = function() {
                return e
            };
            return c
        }
        function h(b) {
            if (b.ka) b.clean();
            else for (var a = 0; a < b.length; a++) b[a].clean()
        }
        c.Kf = function(c, a, d) {
            var e = {},
            g;
            for (g in c) e[g] = !0;
            if (a) for (g in a) e[g] = !0;
            else a = {};
            for (var n in e) if (c[n]) if (a[n]) if (a[n].ka && c[n].ka) a[n].dn(c[n], d);
            else {
                e = c[n].ka ? [c[n]] : c[n];
                a[n].ka && (a[n] = [a[n]]);
                g = [].concat(a[n]);
                for (var q = 0; q < e.length; q++) {
                    for (var p = !1,
                    t = 0; t < g.length; t++) if (g[t].Fb() === e[q].Fb()) {
                        g[t].dn(e[q], d);
                        p = !0;
                        g.splice(t, 1);
                        break
                    }
                    p || a[n].push(b(e[q], d))
                }
                h(g)
            } else {
                e = a;
                g = n;
                q = c[n];
                p = d;
                if (q.ka) q = b(q, p);
                else {
                    for (var t = [], u = 0; u < q.length; u++) t[u] = b(q[u], p);
                    q = t
                }
                e[g] = q
            } else h(a[n]);
            return a
        };
        c.prototype = {
            Rt: function(b) {
                var a = this.Ve(b.getRow(), b.We());
                if (!a) return ! 1;
                if (a.ka) return a.Kq(b);
                for (var c = 0; c < a.length; c++) if (a[c].Kq(b)) return ! 0;
                return ! 1
            },
            addCell: function(b, a, c) {
                a = a || b.getRow();
                c = c || b.We();
                var d = this.Ve(a, c);
                d ? d.ka ? this.insert([d, b], a, c) : d.push(b) : this.insert(b, a, c)
            },
            mv: function(b) {
                var a = this;
                this.forEachElement(function(c, d, e) {
                    a.Kl(c, d, e, b)
                })
            },
            Kp: function(b, a) {
                var c = this;
                this.forEachElementInRow(b,
                function(b, d, e) {
                    c.Kl(b, d, e, a)
                })
            },
            nv: function(b, a, c) {
                var d = this.get(b, a);
                d && this.Kl(d, b, a, c)
            },
            Kl: function(b, a, c, d) {
                if (b.ka) d(b, a, c);
                else for (var e = 0; e < b.length; e++) d(b[e], a, c, b[e].Fb())
            },
            Ve: function(b, a, c) {
                if (c) {
                    if (b = this.get(b, a)) if (!b.ka) for (a = 0; a < b.length; a++) {
                        if (b[a].Fb() == c) return b[a]
                    } else if (b.Fb() == c) return b;
                    return null
                }
                return this.get(b, a)
            },
            eu: function() {
                var b = this.getEntireMatrix(),
                a;
                for (a in b) {
                    var c = b[a],
                    d = !1,
                    e = void 0;
                    for (e in c) {
                        var g;
                        g = c[e];
                        if (g.ka) g = g.Cq();
                        else {
                            for (var h = !1,
                            p = 0; p < g.length;) g[p].Cq() ? (h = !0, p++) : g.splice(p, 1);
                            g = h
                        }
                        g ? d = !0 : delete c[e]
                    }
                    d || delete b[a]
                }
            }
        };
        g(c, e, !1, !0);
        return c
    });
    define("ColorConverter", ["Environment", "LoggerManager", "BrowserDetection", "IFrameHandler"],
    function(e, g, d, c) {
        function b(a) {
            0 == a.indexOf("#") && (a = a.substring(1, a.length));
            if (3 == a.length) a = a.charAt(0) + a.charAt(0) + a.charAt(1) + a.charAt(1) + a.charAt(2) + a.charAt(2);
            else if (6 != a.length) return n.warn("A hexadecimal color value must be 3 or 6 character long. An invalid value was specified, will be ignored"),
            null;
            var b = a.substring(2, 4),
            c = a.substring(4, 6);
            numR = f(a.substring(0, 2));
            numG = f(b);
            numB = f(c);
            return null == numR || null == numG || null == numB ? null: [numR, numG, numB]
        }
        function h(a) {
            if (0 <= a && 9 >= a) return new Number(a);
            a = a.toUpperCase();
            if (q[a]) return q[a];
            n.warn("A hexadecimal number must contain numbers between 0 and 9 and letters between A and F. An invalid value was specified, will be ignored");
            return null
        }
        function f(a) {
            var b = 0,
            c = 0,
            d;
            for (d = a.length; 1 <= d; d--) {
                var e = h(a.substring(d - 1, d));
                if (null == e) return null;
                var f;
                for (f = 1; f <= c; f++) e *= 16;
                c++;
                b += e
            }
            return b
        }
        function a(a) {
            if (a.indexOf("%") == a.length - 1) {
                a = parseFloat(a.substring(0, a.length - 1));
                if (100 < a || 0 > a) return n.warn("A RGB element must be a number \x3e\x3d0 and \x3c\x3d255 or a percentile \x3e\x3d0 and \x3c\x3d100. An invalid value was specified, will be ignored"),
                null;
                a *= 2.55
            }
            return a
        }
        function l(a, b) {
            return a && "" != a ? b ? a != b ? !0 : !1 : !0 : !1
        }
        function m(a) {
            var b = document.createElement("DIV");
            b.style.backgroundColor = a;
            var c = r.Og(b, p, a);
            if (255 == c[0] && 255 == c[1] && 255 == c[2] && "WHITE" != a.toUpperCase()) {
                var d = document.getElementsByTagName("BODY")[0];
                d && (d.appendChild(b), c = r.Og(b, p, a), d.removeChild(b))
            }
            t[a] = c;
            return t[a]
        }
        function k(a) {
            var e = "";
            if (t[a]) return t[a];
            if (d.isProbablyIE()) try {
                if (u = c.getFrameWindow("weswit__ColorFrame", !0)) u.document.bgColor = a,
                e = u.document.bgColor
            } catch(f) {
                e = null
            } else return m(a);
            if (!e || e == a) {
                var g = document.bgColor;
                document.bgColor = a;
                e = document.bgColor;
                document.bgColor = g
            }
            if (!e || e == a) return m(a);
            t[a] = b(e);
            return t[a]
        }
        e.browserDocumentOrDie();
        var n = g.getLoggerProxy("lightstreamer.grids"),
        q = {
            A: 10,
            B: 11,
            C: 12,
            D: 13,
            E: 14,
            F: 15
        },
        p = "backgroundColor",
        t = {},
        u = null,
        r = {
            Jn: function(c) {
                if (0 == c.indexOf("rgb")) a: {
                    var d, e;
                    if (0 == c.indexOf("rgb(")) d = 4,
                    e = ")";
                    else if (0 == c.indexOf("rgba(")) d = 5,
                    e = ",";
                    else {
                        n.warn("A RGB color value must be in the form 'rgb(x, y, z)' or 'rgba(x, y, z, a)'. An invalid value was specified, will be ignored");
                        c = null;
                        break a
                    }
                    c = c.substring(d, c.length);
                    var f = c.indexOf(",");
                    d = a(c.substring(0, f));
                    var g = c.indexOf(",", f + 1),
                    f = a(c.substring(f + 1, g));
                    c = a(c.substring(g + 1, c.indexOf(e, g + 1)));
                    c = null == d || null == f || null == c ? null: [d, f, c]
                } else c = 0 == c.indexOf("#") ? b(c) : k(c);
                return c
            },
            Og: function(a, b, c) {
                if (null == a) return [255, 255, 255];
                var d = "";
                try {
                    if (window.getComputedStyle || document.defaultView && document.defaultView.getComputedStyle) {
                        var e = document.defaultView.getComputedStyle(a, null);
                        if (e) var f = b == p ? "background-color": b,
                        d = e.getPropertyValue(f)
                    }
                } catch(g) {}
                try { ! l(d, c) && a.currentStyle && (f = "background-color" == b ? p: b, d = a.currentStyle[f])
                } catch(g) {}
                try {
                    if (!l(d, c)) if (e = "background-color" == b ? p: b, "" != a.style[e]) d = a.style[e];
                    else return [255, 255, 255]
                } catch(g) {}
                return "transparent" == d && a.parentNode ? this.Og(a.parentNode, b) : "transparent" == d ? [255, 255, 255] : l(d, c) ? this.Jn(d) : [255, 255, 255]
            }
        };
        return r
    });
    define("FadersHandler", ["ColorConverter", "Executor", "Helpers", "Cell", "Environment"],
    function(e, g, d, c, b) {
        function h(a, b, c, d, e, f, g) {
            this.Hc(a, b, c, d, e, f, g)
        }
        function f() {
            this.length = 0;
            this.Er = {}
        }
        function a(a) {
            this.ed = a;
            this.Fi = new f;
            this.Hp = 0;
            this.Re = {};
            this.zi = !1;
            this.Qc = {}
        }
        function l(a) {
            return function() {
                a.style.backgroundColor = "transparent"
            }
        }
        b.browserDocumentOrDie();
        a.prototype = {
            jq: function(a, b, c, d, e, f) {
                e = this.Wv(e);
                var g = a.dm();
                if (g) {
                    var r = this.Fi.get();
                    if (null == r) return this.Re[this.Hp] = new h(a, b, c, d, e, g, f),
                    this.Hp++;
                    this.Re[r].Hc(a, b, c, d, e, g, f);
                    return r
                }
            },
            Wv: function(a) {
                a /= this.ed;
                return 1 < a ? a: 1
            },
            Rq: function(a) {
                var b = this.Re[a],
                c = b.wc.Sl();
                if (!c) this.Zj(b.wc);
                else if (! (b.a < c)) {
                    var c = this.Qc[b.wc.rg],
                    d = this.Re[c];
                    d && (d.vq || (b.vq ? d.Pe && g.executeTask(d.Pe) : (b.xa = d.xa, b.Ca < d.Ca && (b.Ca = d.Ca))), this.Fi.put(c));
                    this.Qc[b.wc.rg] = a;
                    b.Oe && (b.Pf = e.Og(b.wc.Jg(), "backgroundColor"));
                    b.Dg && (b.un = e.Og(b.wc.Jg(), "color"));
                    this.zi || this.fv(this.ed)
                }
            },
            Zj: function(a) {
                var b = this.Qc[a.rg];
                if (b || 0 == b) delete this.Qc[a.rg],
                this.Fi.put(b)
            },
            Qu: function(a) {
                var b = d.getTimeStamp(),
                c = 0;
                a && (c = b - (a + this.ed));
                a = !1;
                for (var e in this.Qc) {
                    var f = this.Qc[e],
                    h = this.Re[f];
                    if (h.xa > h.Ca) this.Fi.put(f),
                    delete this.Qc[e],
                    h.Pe && g.addPackedTimedTask(h.Pe, 0);
                    else {
                        f = h.wc.Jg();
                        if (!f) {
                            this.Zj(h.wc);
                            continue
                        }
                        if ("transparent" == h.Oe) try {
                            f.style.backgroundColor = "rgba(" + h.Pf[0] + "," + h.Pf[1] + "," + h.Pf[2] + "," + this.Nd(100, 0, h.Ca, h.xa) / 100 + ")"
                        } catch(r) {
                            var u = (h.Ca - h.xa) * this.ed;
                            g.addTimedTask(l(f), u);
                            h.Pe && g.addPackedTimedTask(h.Pe, u);
                            this.Zj(h.wc);
                            continue
                        } else h.Oe && (f.style.backgroundColor = "rgb(" + this.Nd(h.Pf[0], h.Oe[0], h.Ca, h.xa) + "," + this.Nd(h.Pf[1], h.Oe[1], h.Ca, h.xa) + "," + this.Nd(h.Pf[2], h.Oe[2], h.Ca, h.xa) + ")");
                        h.Dg && (f.style.color = "rgb(" + this.Nd(h.un[0], h.Dg[0], h.Ca, h.xa) + "," + this.Nd(h.un[1], h.Dg[1], h.Ca, h.xa) + "," + this.Nd(h.un[2], h.Dg[2], h.Ca, h.xa) + ")");
                        a = !0
                    }
                    h.xa++
                }
                a ? (e = d.getTimeStamp(), b = e - b + c, b > this.ed && (c = b / this.ed, b = Math.floor(c), c -= b, this.Zy(b), b = this.ed * c), this.ar(this.ed - b, e)) : this.zi = !1
            },
            ar: function(a, b) {
                g.addTimedTask(this.Qu, a, this, [b])
            },
            Zy: function(a) {
                for (var b in this.Qc) {
                    var c = this.Re[this.Qc[b]];
                    c.xa > c.Ca || (c.xa = c.xa + a < c.Ca ? c.xa + a: c.Ca)
                }
            },
            fv: function(a) {
                1 != this.zi && (this.zi = !0, this.ar(a))
            },
            Nd: function(a, b, c, d) {
                a = new Number(a);
                b = new Number(b);
                return Math.ceil(a + 1 / c * d * (b - a))
            }
        };
        f.prototype = {
            put: function(a) {
                this.Er[this.length] = a;
                this.length++
            },
            get: function() {
                if (0 >= this.length) return null;
                this.length--;
                return this.Er[this.length]
            }
        };
        h.prototype = {
            Hc: function(a, b, c, d, f, g, h) {
                this.Pe = h ? h: null;
                this.vq = b;
                this.wc = a;
                this.Oe = "" === c || "transparent" == c ? "transparent": c ? e.Jn(c) : null;
                this.Dg = d ? e.Jn(d) : null;
                this.Ca = f;
                this.a = g;
                this.xa = 0
            }
        };
        return a
    });
    define("LightstreamerConstants", [],
    function() {
        return {
            CONNECTING: "CONNECTING",
            Ea: "CONNECTED:",
            bg: "STREAM-SENSING",
            eg: "WS-STREAMING",
            se: "HTTP-STREAMING",
            we: "STALLED",
            ye: "WS-POLLING",
            Xc: "HTTP-POLLING",
            Ub: "DISCONNECTED",
            dg: "DISCONNECTED:WILL-RETRY",
            tk: "WS",
            Ph: "HTTP",
            qk: "RAW",
            lk: "DISTINCT",
            Yf: "COMMAND",
            pk: "MERGE"
        }
    });
    define("DoubleKeyMatrix", ["Inheritance", "Matrix"],
    function(e, g) {
        function d() {
            this._callSuperConstructor(d);
            this.oh = {}
        }
        d.prototype = {
            insert: function(c, b, e) {
                "undefined" == typeof this.oh[e] && (this.oh[e] = b, this._callSuperMethod(d, "insert", [c, b, e]))
            },
            del: function(c, b) {
                this._callSuperMethod(d, "del", [c, b]);
                delete this.oh[b]
            },
            delReverse: function(c) {
                var b = this.oh[c];
                "undefined" != typeof b && this.del(b, c)
            },
            delRow: function(c) {
                var b = this.getRow(c),
                e;
                for (e in b) delete this.oh[e];
                this._callSuperMethod(d, "delRow", [c])
            }
        };
        d.prototype.insert = d.prototype.insert;
        d.prototype.del = d.prototype.del;
        d.prototype.delReverse = d.prototype.delReverse;
        d.prototype.delRow = d.prototype.delRow;
        e(d, g);
        return d
    });
    define("AbstractWidget", "Inheritance Matrix LoggerManager Setter EventDispatcher IllegalStateException LightstreamerConstants DoubleKeyMatrix".split(" "),
    function(e, g, d, c, b, h, f, a) {
        function l(b) {
            this._callSuperConstructor(l);
            this.kind = "ITEM_IS_KEY";
            this.gl = this.Yi = null;
            this.Vc = 0;
            this.Hl = null;
            this.values = new g;
            this.parsed = !1;
            this.id = b;
            this.useSynchEvents(!0);
            this.Zo = this.Yo = !1;
            this.$h = 0;
            this.nf = null;
            this.Ml = !1;
            this.xd = null;
            this.$j = [];
            this.Db = [];
            this.Fg = {};
            this.Cc = this.Bi = 0;
            this.Xi = new a
        }
        var m = d.getLoggerProxy("lightstreamer.grids");
        l.io = "ITEM_IS_KEY";
        l.lt = "UPDATE_IS_KEY";
        l.prototype = {
            fa: function() {
                return this.id
            },
            Wk: function() {
                if (!this.parsed) throw new h("Please parse html before calling this method");
            },
            onItemUpdate: function(a) {
                var b = a.Xl(),
                c = a.Ii();
                this.Vc++;
                var c = null == b ? c: b,
                b = this.xx() ? c: this.wa() ? this.Vc: c + " " + a.getValue(this.Yi),
                d = {};
                this.wa() ? a.Lp(this.Yp(d)) : a.forEachChangedField(this.Yp(d));
                this.Pq() && "DELETE" == d[this.gl] ? this.removeRow(b) : (this.updateRow(b, d), this.Xi.insert(!0, c, b))
            },
            onClearSnapshot: function(a, b) {
                var c = null == a ? b: a,
                d = this.Xi.getRow(c);
                this.Xi.delRow(c);
                for (var e in d) this.removeRow(e)
            },
            onSubscription: function() {
                0 == this.$h && this.Yo && this.clean();
                this.Pq() && !this.Yi && (this.Yi = this.nf.gq(), this.gl = this.nf.Rp());
                this.$h++
            },
            onUnsubscription: function() {
                this.$h--;
                0 == this.$h && this.Zo && this.clean()
            },
            onListenStart: function(a) {
                this.nf || (this.nf = a, this.Ml || this.Vo());
                if (a.hm()) this.onSubscription()
            },
            onListenEnd: function(a) {
                if (a.hm()) this.onUnsubscription()
            },
            Vo: function() {
                if (this.nf) {
                    var a = this.nf;
                    if (a.Ki() == f.pk || a.Ki() == f.qk) this.kind = "ITEM_IS_KEY";
                    else if (a.Ki() == f.lk) this.kind = "UPDATE_IS_KEY";
                    else {
                        this.kind = "KEY_IS_KEY";
                        try {
                            a.Wp(),
                            this.Yi = "key",
                            this.gl = "command"
                        } catch(b) {}
                    }
                } else this.kind = "ITEM_IS_KEY"
            },
            Yp: function(a) {
                var b = this;
                return function(c, d, e) {
                    null === b.Hl && (b.Hl = null == c);
                    a[b.Hl ? d: c] = e
                }
            },
            xx: function() {
                return "ITEM_IS_KEY" == this.kind
            },
            wa: function() {
                return "UPDATE_IS_KEY" == this.kind
            },
            Pq: function() {
                return "KEY_IS_KEY" == this.kind
            },
            lq: function() {
                return this.Cc >= this.Db.length ? null: this.Db[this.Cc]
            },
            Ur: function(a) {
                var b = this.Fg[a];
                delete this.Fg[a];
                this.Db[b] = null;
                this.Bi++;
                if (b == this.Cc) {
                    for (; null === this.Db[this.Cc] && this.Cc < this.Db.length;) this.Cc++;
                    if (this.Cc >= this.Db.length) {
                        this.Db = [];
                        this.Fg = {};
                        this.Cc = this.Bi = 0;
                        return
                    }
                }
                if (100 <= this.Bi) for (this.Fg = {},
                a = this.Db, this.Db = [], b = this.Bi = this.Cc = 0; b < a.length; b++) null !== a[b] && this.$q(a[b])
            },
            $q: function(a) {
                this.Fg[a] = this.Db.length;
                this.Db.push(a)
            },
            removeRow: function(a) {
                this.Wk();
                if (this.xd) this.Iu(a);
                else if (this.values.getRow(a)) {
                    m.isDebugLogEnabled() && m.logDebug(d.resolve(396), a, this);
                    this.xd = {};
                    var b = null;
                    try {
                        this.removeRowExecution(a),
                        this.values.delRow(a),
                        this.Xi.delReverse(a),
                        this.wa() && this.Ur(a)
                    } catch(c) {
                        b = c
                    }
                    this.xd = null;
                    this.qp();
                    if (null !== b) throw b;
                } else m.logWarn(d.resolve(394), a, this)
            },
            Os: function(a, b) {
                m.isDebugLogEnabled() && m.logDebug(d.resolve(397), this);
                this.$j.push({
                    type: 2,
                    key: a,
                    dy: b
                })
            },
            Iu: function(a) {
                m.isDebugLogEnabled() && m.logDebug(d.resolve(398), this);
                this.$j.push({
                    type: 1,
                    key: a
                })
            },
            qp: function() {
                for (; 0 < this.$j.length;) {
                    var a = this.$j.shift();
                    1 == a.type ? this.removeRow(a.key) : this.updateRow(a.key, a.dy)
                }
            },
            updateRow: function(a, b) {
                this.Wk();
                if (this.xd) a == this.xd ? this.mergeUpdate(a, b) : this.Os(a, b);
                else {
                    this.xd = a;
                    var c = null;
                    try {
                        if (this.updateRowExecution(a, b), this.values.getRow(a)) {
                            m.isDebugLogEnabled() && m.logDebug(d.resolve(400), a, this);
                            for (var e in b) this.values.insert(b[e], a, e)
                        } else m.isDebugLogEnabled() && m.logDebug(d.resolve(399), a, this),
                        this.wa() && this.$q(a),
                        this.values.insertRow(b, a)
                    } catch(f) {
                        c = f
                    }
                    this.xd = null;
                    this.qp();
                    if (null !== c) throw c;
                }
            },
            clean: function() {
                m.logInfo(d.resolve(395), this);
                var a = [];
                this.values.forEachRow(function(b) {
                    a.push(b)
                });
                for (var b = 0; b < a.length; b++) this.removeRow(a[b])
            },
            getValue: function(a, b) {
                return this.values.get(a, b)
            },
            setAutoCleanBehavior: function(a, b) {
                this.Yo = this.checkBool(a);
                this.Zo = this.checkBool(b)
            },
            parseHtml: function() {},
            updateRowExecution: function() {},
            removeRowExecution: function() {},
            mergeUpdate: function() {}
        };
        l.prototype.onItemUpdate = l.prototype.onItemUpdate;
        l.prototype.onClearSnapshot = l.prototype.onClearSnapshot;
        l.prototype.onSubscription = l.prototype.onSubscription;
        l.prototype.onUnsubscription = l.prototype.onUnsubscription;
        l.prototype.onListenStart = l.prototype.onListenStart;
        l.prototype.onListenEnd = l.prototype.onListenEnd;
        l.prototype.removeRow = l.prototype.removeRow;
        l.prototype.updateRow = l.prototype.updateRow;
        l.prototype.clean = l.prototype.clean;
        l.prototype.getValue = l.prototype.getValue;
        l.prototype.setAutoCleanBehavior = l.prototype.setAutoCleanBehavior;
        l.prototype.parseHtml = l.prototype.parseHtml;
        l.prototype.updateRowExecution = l.prototype.updateRowExecution;
        l.prototype.removeRowExecution = l.prototype.removeRowExecution;
        l.prototype.mergeUpdate = l.prototype.mergeUpdate;
        e(l, b, !1, !0);
        e(l, c, !0, !0);
        return l
    });
    define("AbstractGrid", "Inheritance CellMatrix Executor Cell Helpers FadersHandler AbstractWidget IllegalArgumentException IllegalStateException LoggerManager Environment".split(" "),
    function(e, g, d, c, b, h, f, a, l, m, k) {
        function n() {
            this._callSuperConstructor(n, arguments);
            this.Da = !1;
            this.Fh = q;
            this.tc = !1;
            this.u = null;
            this.el = this.mj = this.Ag = !1;
            this.Qe = new h(50);
            this.zg = this.yg = null;
            this.j = this.l = 0;
            this.O = new g
        }
        k.browserDocumentOrDie();
        var q = ["div", "span", "input"],
        p = m.getLoggerProxy("lightstreamer.grids");
        n.prototype = {
            mergeUpdate: function(a, b) {
                p.isDebugLogEnabled() && p.logDebug(m.resolve(402), this);
                for (var c in b) this.zg[c] = b[c];
                this.Il(this.yg, b)
            },
            Il: function(a, b) {
                for (var c in b) this.O.nv(a, c,
                function(d) {
                    p.isDebugLogEnabled() && p.logDebug(m.resolve(403), a, c);
                    var e = b[c];
                    d.mn(null === e ? "": e)
                })
            },
            Wd: function(a, b) {
                return null != a && null != b || a == b ? this.Ag ? a > b: a < b: null == a ? !this.Ag: this.Ag
            },
            setHtmlInterpretationEnabled: function(a) {
                this.Da = this.checkBool(a)
            },
            isHtmlInterpretationEnabled: function() {
                return this.Da
            },
            setNodeTypes: function(b) {
                if (b && 0 < b.length) this.Fh = b;
                else throw new a("The given array is not valid or empty");
            },
            getNodeTypes: function() {
                return this.Fh
            },
            setAddOnTop: function(a) {
                null != this.u && p.logWarn(m.resolve(401));
                this.tc = this.checkBool(a)
            },
            isAddOnTop: function() {
                return this.tc
            },
            setSort: function(a, b, c, d) {
                a ? (this.u = a, this.Ag = this.checkBool(b, !0), this.mj = this.checkBool(c, !0), this.el = this.checkBool(d, !0), this.Vj()) : this.u = null
            },
            getSortField: function() {
                return this.u
            },
            isDescendingSort: function() {
                return null === this.u ? null: this.Ag
            },
            isNumericSort: function() {
                return null === this.u ? null: this.mj
            },
            isCommaAsDecimalSeparator: function() {
                return null !== this.u && this.mj ? this.el: null
            },
            extractFieldList: function() {
                return this.Gp(c.bt)
            },
            extractCommandSecondLevelFieldList: function() {
                return this.Gp(c.jt)
            },
            parseHtml: function() {},
            forceSubscriptionInterpretation: function(b) {
                if (0 < this.l) throw new l("This method can only be called while the grid is empty.");
                if (b) {
                    if (b != f.lt && b != f.io) throw new a("The given value is not valid, use UPDATE_IS_KEY or ITEM_IS_KEY.");
                    this.kind = b;
                    this.Ml = !0
                } else this.Ml = !1,
                this.Vo()
            },
            Gp: function(a) {
                a = this.hl(a);
                var b = [],
                c;
                for (c in a) b.push(c);
                return b
            },
            cb: function(a) {
                return this.mj ? b.getNumber(a, this.el) : null === a ? a: (new String(a)).toUpperCase()
            },
            Us: function(a, b, e) {
                e = e || a;
                var f = b.cp,
                g = f + b.zq,
                h = g + b.Ri,
                l = b.Qi,
                k = b.dl,
                m = [];
                a = this.O.getRow(a);
                for (var q in a) for (var p = -1,
                n = a[q], H = 0; n && (n.ka || H < n.length); H++) {
                    var w = n.ka ? n: n[H],
                    n = n.ka ? null: n;
                    null === w.Fb() && p++;
                    var A = this.sq ? this.sq(w, e, q, w.Fb(), p) : w;
                    if (null != w.$d) {
                        var E = w.jA(),
                        I = w.ew(k),
                        G = w.fw(l);
                        if (G) {
                            var L = !1,
                            J = !1,
                            w = !1,
                            M = null,
                            K = null,
                            O = null,
                            P = null;
                            G && (G.backgroundColor && (L = !0, M = G.backgroundColor, K = I.backgroundColor), G.color && (L = !0, O = G.color, P = I.color));
                            L && (0 < f ? (J = d.packTask(A.Gd, A, [E, this.Da]), I = this.Qe.jq(A, !1, M, O, f, J), this.Qe.Rq(I), J = !0) : this.Qe.Zj(A), 0 < b.Ri && (w = d.packTask(A.ng, A, [E, c.ao]), I = this.Qe.jq(A, !0, K, P, b.Ri, w), d.addTimedTask(this.Qe.Rq, g, this.Qe, [I]), w = !0));
                            J || (0 < f ? d.addTimedTask(A.Gd, f, A, [E, this.Da]) : (K = d.packTask(A.Gd, A, [E, this.Da]), m.push(K)));
                            w || d.addTimedTask(A.ng, h, A, [E, c.ao])
                        } else 0 < f ? d.addTimedTask(A.Gd, f, A, [E, this.Da]) : (K = d.packTask(A.Gd, A, [E, this.Da]), m.push(K))
                    }
                }
                for (b = 0; b < m.length; b++) d.executeTask(m[b])
            },
            updateRowExecution: function() {},
            removeRowExecution: function() {},
            Vj: function() {},
            hl: function() {}
        };
        n.prototype.setHtmlInterpretationEnabled = n.prototype.setHtmlInterpretationEnabled;
        n.prototype.isHtmlInterpretationEnabled = n.prototype.isHtmlInterpretationEnabled;
        n.prototype.setNodeTypes = n.prototype.setNodeTypes;
        n.prototype.getNodeTypes = n.prototype.getNodeTypes;
        n.prototype.setAddOnTop = n.prototype.setAddOnTop;
        n.prototype.isAddOnTop = n.prototype.isAddOnTop;
        n.prototype.setSort = n.prototype.setSort;
        n.prototype.getSortField = n.prototype.getSortField;
        n.prototype.isDescendingSort = n.prototype.isDescendingSort;
        n.prototype.isNumericSort = n.prototype.isNumericSort;
        n.prototype.isCommaAsDecimalSeparator = n.prototype.isCommaAsDecimalSeparator;
        n.prototype.extractFieldList = n.prototype.extractFieldList;
        n.prototype.extractCommandSecondLevelFieldList = n.prototype.extractCommandSecondLevelFieldList;
        n.prototype.parseHtml = n.prototype.parseHtml;
        n.prototype.forceSubscriptionInterpretation = n.prototype.forceSubscriptionInterpretation;
        n.prototype.updateRowExecution = n.prototype.updateRowExecution;
        n.prototype.removeRowExecution = n.prototype.removeRowExecution;
        e(n, f);
        return n
    });
    define("AbstractParent", [],
    function() {
        function e() {}
        e.prototype = {
            Hc: function() {
                this.length = 0;
                this.Ta = {};
                this.zr || (this.map = {})
            }
        };
        return e
    });
    define("VisibleParent", ["AbstractParent", "Inheritance"],
    function(e, g) {
        function d(c, b, e) {
            this._callSuperConstructor(d);
            this.dd = c;
            this.Hh = b;
            this.fy = e;
            this.zr = !0;
            this.Tf = this.Hh;
            this.Hc()
        }
        d.prototype = {
            removeChild: function(c) {
                if (! (0 >= this.length)) {
                    this.length--;
                    delete this.Ta[c.fa()];
                    var b = c.element();
                    b == this.Tf && (this.Tf = b.nextSibling);
                    this.dd.removeChild(b);
                    c.Qj(null)
                }
            },
            insertBefore: function(c, b) {
                b != c && c && (b ? null == this.Ta[b.fa()] ? this.appendChild(c, !0) : (this.Sg(c), this.dd.insertBefore(c.element(), b.element())) : this.appendChild(c, !0))
            },
            appendChild: function(c, b) {
                if (c) {
                    this.Sg(c);
                    var d = c.element();
                    b ? (this.Tf || (this.Tf = d), this.Hh ? this.dd.insertBefore(d, this.Hh) : this.dd.appendChild(d)) : (this.dd.insertBefore(d, this.Tf), this.Tf = d)
                }
            },
            Sg: function(c) {
                c.Wi(this) || (this.length++, this.Ta[c.fa()] = c, c.jm(), c.Qj(this))
            },
            Eb: function(c) {
                if (this.length <= c) return null;
                c += this.fy;
                c = this.dd.childNodes[c].getAttribute("id");
                return this.getElementById(c)
            },
            getElementById: function(c) {
                return this.Ta[c]
            },
            clean: function() {
                this.dd && delete this.dd;
                this.Hh && delete this.Hh;
                for (var c in this.Ta) this.Ta[c].clean()
            }
        };
        g(d, e);
        return d
    });
    define("InvisibleParent", ["AbstractParent", "Inheritance"],
    function(e, g) {
        function d() {
            this._callSuperConstructor(d);
            this.zr = !1;
            this.Hc()
        }
        d.prototype = {
            removeChild: function(c) {
                if (! (0 >= this.length)) {
                    this.length--;
                    var b;
                    for (b = this.Ta[c.fa()]; b < this.length; b++) this.map[b] = this.map[b + 1],
                    this.Ta[this.map[b].fa()] = b;
                    this.Ta[c.fa()] = null;
                    this.map[this.length] = null;
                    c.Qj(null)
                }
            },
            insertBefore: function(c, b) {
                if (b != c && c) if (b) if (null == this.Ta[b.fa()]) this.appendChild(c, !0);
                else {
                    c.jm();
                    for (var d = this.Ta[b.fa()], e = this.length; e >= d + 1; e--) this.map[e] = this.map[e - 1],
                    this.Ta[this.map[e].fa()] = e;
                    this.Sg(c, d)
                } else this.appendChild(c, !0)
            },
            appendChild: function(c, b) {
                c && (c.jm(), b || 0 == this.length ? this.Sg(c, this.length) : this.insertBefore(c, this.map[0]))
            },
            Sg: function(c, b) {
                this.length++;
                this.Ta[c.fa()] = b;
                this.map[b] = c;
                c.Qj(this)
            },
            Eb: function(c) {
                return this.map[c]
            },
            getElementById: function(c) {
                return this.map[this.Ta[c]]
            },
            clean: function() {
                for (var c = 0; c < this.length; c++) this.map[c].clean()
            }
        };
        g(d, e);
        return d
    });
    define("DynaElement", ["Cell"],
    function(e) {
        function g(d, c) {
            this.key = d;
            this.Om = c;
            this.node = this.tf = null;
            this.id = "hc6|" + c.fa() + "|" + d
        }
        g.prototype = {
            Qj: function(d) {
                this.tf = d
            },
            jm: function() {
                this.tf && this.tf.removeChild(this)
            },
            Wi: function(d) {
                return this.tf == d
            },
            getKey: function() {
                return this.key
            },
            fa: function() {
                return this.id
            },
            element: function() {
                if (null != this.node) return this.node;
                this.node = this.Om.yw();
                this.node.setAttribute("id", this.id);
                for (var d = e.Ji(this.node, this.Om.getNodeTypes()), c = 0; c < d.length; c++) {
                    var b = d[c],
                    g = b.We();
                    g && this.Om.sy(b, this.key, g)
                }
                return this.node
            },
            clean: function() {
                this.node && delete this.node
            }
        };
        return g
    });
    define("VisualUpdate", ["LoggerManager", "Inheritance", "Setter", "IllegalArgumentException"],
    function(e, g, d, c) {
        function b(b, a, c) {
            this.Qk = b;
            this.Pn = a;
            this.key = c;
            this.Ri = this.cp = 0;
            this.zq = 1200;
            this.dl = this.Qi = null
        }
        var h = e.getLoggerProxy("lightstreamer.grids");
        b.prototype = {
            getCellValue: function(b, a) {
                var d = this.Qk.Ve(this.key, b, a);
                if (!d) throw new c("No cell defined for this field");
                d.ka || (d = d[0]);
                return d.$d || d.Jf()
            },
            setCellValue: function(b, a, d) {
                b = this.Qk.Ve(this.key, b, d);
                if (!b) throw new c("No cell defined for this field");
                if (b.ka) b.mn(a);
                else for (d = 0; d < b.length; d++) b[d].mn(a)
            },
            getChangedFieldValue: function(b) {
                return this.Pn[b] || null
            },
            setHotTime: function(b) {
                this.zq = this.checkPositiveNumber(b, !0)
            },
            setColdToHotTime: function(b) {
                this.cp = this.checkPositiveNumber(b, !0)
            },
            setHotToColdTime: function(b) {
                this.Ri = this.checkPositiveNumber(b, !0)
            },
            jg: function(b, a, d, e, g) {
                b = this.Qk.Ve(this.key, b, g);
                if (!b) throw new c("No cell defined for this field");
                if (b.ka) b.jg(a, d, e);
                else for (g = 0; g < b.length; g++) b[g].jg(a, d, e)
            },
            Co: function(b, a, c) {
                this.Qi || (this.Qi = {},
                this.dl = {});
                this.Qi[c] = b || "";
                this.dl[c] = a || ""
            },
            setAttribute: function(b, a, c) {
                this.Co(b, a, c)
            },
            setStyle: function(b, a) {
                this.Co(b, a, "CLASS")
            },
            setCellAttribute: function(b, a, c, d, e) {
                this.jg(b, a, c, d, e)
            },
            setCellStyle: function(b, a, c, d) {
                this.jg(b, a, c, "CLASS", d)
            },
            forEachChangedField: function(b) {
                for (var a in this.Pn) try {
                    b(a, this.Pn[a])
                } catch(c) {
                    h.logError(e.resolve(438), c)
                }
            }
        };
        b.prototype.getCellValue = b.prototype.getCellValue;
        b.prototype.setCellValue = b.prototype.setCellValue;
        b.prototype.getChangedFieldValue = b.prototype.getChangedFieldValue;
        b.prototype.setHotTime = b.prototype.setHotTime;
        b.prototype.setColdToHotTime = b.prototype.setColdToHotTime;
        b.prototype.setHotToColdTime = b.prototype.setHotToColdTime;
        b.prototype.setAttribute = b.prototype.setAttribute;
        b.prototype.setStyle = b.prototype.setStyle;
        b.prototype.setCellAttribute = b.prototype.setCellAttribute;
        b.prototype.setCellStyle = b.prototype.setCellStyle;
        b.prototype.forEachChangedField = b.prototype.forEachChangedField;
        g(b, d, !0, !0);
        return b
    });
    define("DynaGrid", "Inheritance AbstractGrid Cell VisibleParent InvisibleParent DynaElement BrowserDetection VisualUpdate IllegalArgumentException IllegalStateException LoggerManager ASSERT Environment".split(" "),
    function(e, g, d, c, b, h, f, a, l, m, k, n, q) {
        function p(a, b) {
            this._callSuperConstructor(p, [a]);
            this.Pc = 1;
            this.xg = 0;
            this.ad = null;
            this.Hd = "OFF";
            this.Bq(); (b = this.checkBool(b, !0)) && this.parseHtml()
        }
        q.browserDocumentOrDie();
        var t = k.getLoggerProxy("lightstreamer.grids");
        p.prototype = {
            toString: function() {
                return ["[", this.id, this.l, this.xg, "]"].join("|")
            },
            setMaxDynaRows: function(a) {
                this.j = a && "unlimited" != (new String(a)).toLowerCase() ? this.checkPositiveNumber(a, !0) : 0;
                this.wa() ? this.Uq() : (this.Lk(), this.Vj(), this.So(1))
            },
            getMaxDynaRows: function() {
                return 0 == this.j ? "unlimited": this.j
            },
            goToPage: function(a) {
                if (this.wa()) throw new m("This grid is configured to no support pagination");
                if (0 == this.j) throw new m("Can't switch pages while 'no-page mode' is used");
                a = this.checkPositiveNumber(a);
                this.So(a)
            },
            getCurrentPages: function() {
                return 0 == this.j ? 1 : this.xg
            },
            setAutoScroll: function(a, b) {
                if (!a) throw new l("The given value is not a valid scroll type. Admitted values are OFF, ELEMENT, PAGE");
                a = (new String(a)).toUpperCase();
                if ("ELEMENT" == a) if (b) this.ad = b;
                else throw new l("Please specify an element id in order to use ELEMENT autoscroll");
                else if ("PAGE" != a && "OFF" != a) throw new l("The given value is not a valid scroll type. Admitted values are OFF, ELEMENT, PAGE");
                this.Hd = a;
                this.Vy()
            },
            parseHtml: function() {
                this.parsed = !0;
                var a = this.bl;
                if (a) {
                    if (d.hd(a)) return ! 0;
                    this.Bq()
                }
                a = document.getElementById(this.id);
                if (!this.KA(a)) return ! 1;
                this.Gn = a.cloneNode(!0);
                this.Gn.removeAttribute("id");
                this.bl = a;
                var e = a.parentNode;
                a.style.display = "none";
                for (var f = e.childNodes,
                g = 0,
                h = 0,
                k = null,
                g = 0; g < f.length; g++) if (f[g] == a) {
                    f[g + 1] && (k = f[g + 1]);
                    h = g + 1;
                    break
                }
                this.aa = new c(e, k, h);
                this.jc = new b;
                this.eb = new b;
                return ! 0
            },
            hl: function(a) {
                for (var b = d.Ji(this.bl, this.Fh), c = {},
                e = 0; e < b.length; e++) if (b[e].Vp() == a) {
                    var f = b[e].We();
                    f && (c[f] = !0)
                }
                return c
            },
            KA: function(a) {
                if (!a) throw new l("No template defined");
                if (!d.Ts(a)) throw new l("The template defined for the grid does not define the 'data-source' attribute");
                var b = [];
                a = d.Ji(a, this.Fh);
                for (var c = 0; c < a.length; c++) a[c].We() && b.push(a[c]);
                if (0 >= b.length) throw new l("No valid cells defined for grid");
                return ! 0
            },
            Vy: function() {
                if (! ("ELEMENT" != this.Hd || this.ad && this.ad.appendChild)) {
                    var a = document.getElementById(this.ad);
                    a ? this.ad = a: (t.logError(k.resolve(439), this), this.Hd = "OFF")
                }
            },
            Bq: function() {
                this.eb = this.jc = this.aa = this.Gn = this.bl = null;
                this.oi = {}
            },
            yw: function() {
                return this.Gn.cloneNode(!0)
            },
            sy: function(a, b, c) {
                this.O.addCell(a, b, c)
            },
            clean: function() {
                this._callSuperMethod(p, "clean")
            },
            $A: function() {
                if ("OFF" == this.Hd) return ! 1;
                if (this.wa()) {
                    var a = "ELEMENT" == this.Hd ? this.ad: document.body;
                    return this.tc ? 0 == a.scrollTop: f.isProbablyOldOpera() ? !0 : 1 >= Math.abs(a.clientHeight + a.scrollTop - a.scrollHeight)
                }
                return ! 0
            },
            dw: function(a) {
                var b = "PAGE" == this.Hd ? document.body: this.ad;
                return this.wa() ? this.tc ? 0 : b.scrollHeight - b.clientHeight: a.offsetTop - b.offsetTop
            },
            Mu: function(a) {
                t.isDebugLogEnabled() && t.logDebug(k.resolve(441), this, a);
                "PAGE" == this.Hd ? window.scrollTo(0, a) : this.ad.scrollTop = a
            },
            Vj: function() {
                for (var a = this.u,
                c = new b,
                d = 1; 0 < this.l;) {
                    var e = this.Mg(d);
                    if (e) if (null == a) c.appendChild(e, !0),
                    this.l--;
                    else {
                        var f = e.getKey();
                        if ("" == f) this.l--,
                        d++;
                        else {
                            for (var f = this.cb(this.values.get(f, this.u)), g = 0, h = c.length - 1; g < h;) {
                                var l = Math.floor((g + h) / 2),
                                m = c.Eb(l); (m = this.cb(this.values.get(m.getKey(), this.u))) || t.logWarn(k.resolve(440), this);
                                this.Wd(f, m) ? h = l - 1 : g = l + 1
                            }
                            m = c.Eb(g);
                            g == h ? (g = this.cb(this.values.get(m.getKey(), this.u)), this.Wd(f, g) ? c.insertBefore(e, m) : (f = c.Eb(h + 1)) ? c.insertBefore(e, f) : c.appendChild(e, !0)) : m ? c.insertBefore(e, m) : c.appendChild(e, !0);
                            this.l--
                        }
                    } else this.l--,
                    d++
                }
                for (; 0 < c.length;) this.l++,
                a = c.Eb(0),
                this.l <= this.j * (this.Pc - 1) ? this.eb.appendChild(a, !0) : 0 >= this.j || this.l <= this.j * this.Pc ? this.aa.appendChild(a, !0) : this.jc.appendChild(a, !0)
            },
            So: function(a) {
                if (! (0 >= this.l)) {
                    if (this.Pc >= a) for (; this.Ah(this.eb, this.aa, (a - 1) * this.j);) this.Ah(this.aa, this.jc, this.j);
                    else for (; this.fd(this.aa, this.eb, (a - 1) * this.j, !1);) this.fd(this.jc, this.aa, this.j, !1);
                    this.Pc = a
                }
            },
            Lk: function() {
                t.isDebugLogEnabled() && t.logDebug(k.resolve(442), this);
                var a = 0,
                a = 0 >= this.j ? 1 : Math.ceil(this.l / this.j);
                this.xg != a && (this.xg = a, this.dispatchEvent("onCurrentPagesChanged", [this.xg]));
                return a
            },
            removeRowExecution: function(a) {
                var b = this.oi[a];
                if (b) {
                    this.l--;
                    this.Lk();
                    var c = !1,
                    d = this.eb,
                    e = this.jc;
                    this.dispatchEvent("onVisualUpdate", [a, null, b.element()]);
                    this.wa() && this.tc && null == this.u && (c = this.tc, d = this.jc, e = this.eb);
                    b.Wi(this.aa) ? (this.aa.removeChild(b), this.fd(e, this.aa, this.j, c)) : b.Wi(e) ? e.removeChild(b) : (this.eb.removeChild(b), this.fd(this.aa, d, this.j * (this.Pc - 1), c) && this.fd(e, this.aa, this.j, c));
                    this.O.delRow(a);
                    delete this.oi[a]
                }
            },
            updateRowExecution: function(a, b) {
                var c = !1,
                d = this.oi[a];
                d || (d = new h(a, this), this.oi[a] = d, d.element());
                n.verifyOk(d);
                this.Il(a, b);
                var e = this.tl(a, b, d),
                f = this.$A(),
                g = !this.values.getRow(a),
                k = null != this.u ? this.cb(this.values.get(a, this.u)) : null,
                l = null != this.u ? this.cb(b[this.u]) : null,
                m = k == l || !b[this.u] && null !== b[this.u];
                null != this.u && 0 == m ? (k = this.Mk(d, k, l), this.Tw(k, d), g && (this.l++, c = !0)) : g && (this.Go(d, !this.tc), this.l++, c = !0);
                this.Us(a, e);
                this.xd = null;
                g && this.wa() && this.Uq();
                f && d.Wi(this.aa) && (d = this.dw(d.element()), this.Mu(d));
                c && this.Lk()
            },
            tl: function(b, c, d) {
                this.yg = b;
                this.zg = c;
                c = new a(this.O, c, b);
                this.dispatchEvent("onVisualUpdate", [b, c, d.element()]);
                this.zg = this.yg = null;
                return c
            },
            Mk: function(a, b, c) {
                for (var d = 1,
                e = this.l,
                f = -1; d < e;) {
                    var f = Math.floor((d + e) / 2),
                    g = null;
                    f <= this.l && (g = this.Mg(f), g = g == a ? b: this.cb(this.values.get(g.getKey(), this.u)));
                    this.Wd(c, g) ? e = f - 1 : d = f + 1
                }
                return d == e ? (g = this.Mg(d), a = this.cb(this.values.get(g.getKey(), this.u)), this.Wd(c, a) ? d: d + 1) : d
            },
            Mg: function(a) {
                if (a > this.l || 0 >= a) return null;
                if (a <= this.eb.length) return this.eb.Eb(a - 1);
                a -= this.eb.length;
                if (a <= this.aa.length) return this.aa.Eb(a - 1);
                a -= this.aa.length;
                return this.jc.Eb(a - 1)
            },
            Go: function(a, b) {
                var c = b ? this.eb: this.jc,
                d = b ? this.jc: this.eb;
                if (0 < d.length || this.aa.length == this.j && 0 < this.j) return d.appendChild(a, b),
                d;
                if (0 < this.aa.length || c.length == this.j * (this.Pc - 1)) return this.aa.appendChild(a, b),
                this.aa;
                c.appendChild(a, b);
                return c
            },
            Tw: function(a, b) {
                if (! (a > this.l + 1 || 0 >= a) && b != this.Mg(a)) {
                    var c = b.tf,
                    d, e = this.aa,
                    f = this.jc,
                    g = this.eb,
                    h = this.Mg(a);
                    null == h ? d = this.Go(b, !0) : (d = h.tf, d.insertBefore(b, h));
                    d == e ? c && c != f ? c == g && this.fd(e, g, this.j * (this.Pc - 1), !1) : this.Ah(e, f, this.j) : d == g ? c != g && this.Ah(g, e, this.j * (this.Pc - 1)) && this.Ah(e, f, this.j) : d == f && (c == g && this.fd(e, g, this.j * (this.Pc - 1), !1), this.fd(f, e, this.j, !1))
                }
            },
            fd: function(a, b, c, d) {
                return 0 >= this.j ? !1 : b.length < c && 0 < a.length ? (a = a.Eb(0), b.appendChild(a, !d), !0) : !1
            },
            Ah: function(a, b, c) {
                return 0 >= this.j ? !1 : a.length > c ? (a = a.Eb(a.length - 1), b.insertBefore(a, b.Eb(0)), !0) : !1
            },
            Uq: function() {
                for (; 0 < this.j && this.l > this.j;) this.removeRow(this.lq())
            },
            addListener: function(a) {
                this._callSuperMethod(p, "addListener", [a])
            },
            removeListener: function(a) {
                this._callSuperMethod(p, "removeListener", [a])
            },
            getListeners: function() {
                return this._callSuperMethod(p, "getListeners")
            }
        };
        p.prototype.setMaxDynaRows = p.prototype.setMaxDynaRows;
        p.prototype.getMaxDynaRows = p.prototype.getMaxDynaRows;
        p.prototype.goToPage = p.prototype.goToPage;
        p.prototype.getCurrentPages = p.prototype.getCurrentPages;
        p.prototype.setAutoScroll = p.prototype.setAutoScroll;
        p.prototype.parseHtml = p.prototype.parseHtml;
        p.prototype.clean = p.prototype.clean;
        p.prototype.addListener = p.prototype.addListener;
        p.prototype.removeListener = p.prototype.removeListener;
        p.prototype.getListeners = p.prototype.getListeners;
        p.prototype.updateRowExecution = p.prototype.updateRowExecution;
        p.prototype.removeRowExecution = p.prototype.removeRowExecution;
        e(p, g);
        return p
    });
    define("SlidingCell", [],
    function() {
        function e(d, c, b, e, f) {
            this.Ny = d;
            this.key = c;
            this.iv = b;
            this.Lb = e || null;
            this.er = f;
            this.rg = "s" + g++
        }
        var g = 0;
        e.prototype = {
            Ig: function() {
                var d = this.Ny.Av(this.key, this.iv, this.Lb);
                if (!d) return null;
                if (d.ka) {
                    if (this.Lb === d.Fb() && 0 >= this.er) return d
                } else for (var c = -1,
                b = 0; b < d.length; b++) {
                    var e = d[b].Fb();
                    null === e && c++;
                    if (this.Lb === e && this.er == c) return d[b]
                }
                return null
            },
            dm: function() {
                var d = this.Ig();
                return d ? d.dm() : null
            },
            Sl: function() {
                var d = this.Ig();
                return d ? d.Sl() : null
            },
            Jg: function() {
                var d = this.Ig();
                return d ? d.Jg() : null
            },
            ng: function(d, c) {
                var b = this.Ig();
                b && b.ng(d, c)
            },
            Gd: function(d, c) {
                var b = this.Ig();
                b && b.Gd(d, c)
            }
        };
        return e
    });
    define("DoubleKeyMap", ["IllegalArgumentException"],
    function(e) {
        function g() {
            this.map = {};
            this.ph = {}
        }
        function d(b) {
            return null !== b && "undefined" != typeof b
        }
        function c(b, c, a) {
            var e = b[a];
            d(e) && (delete b[a], delete c[e])
        }
        function b(b, c) {
            for (var a in b) c(a, b[a])
        }
        g.prototype = {
            set: function(b, c) {
                var a = this.map,
                g = this.ph;
                if (!d(b) || !d(c)) throw new e("values can't be null nor missing");
                var m = a[b],
                k = g[c];
                d(m) ? m !== c && (d(k) ? (a[k] = m, a[b] = c, g[c] = b, g[m] = k) : (delete g[a[b]], a[b] = c, g[c] = b)) : d(k) ? (delete a[g[c]], g[c] = b, a[b] = c) : (a[b] = c, g[c] = b)
            },
            remove: function(b) {
                c(this.map, this.ph, b)
            },
            removeReverse: function(b) {
                c(this.ph, this.map, b)
            },
            get: function(b) {
                return this.map[b]
            },
            getReverse: function(b) {
                return this.ph[b]
            },
            exist: function(b) {
                return "undefined" != typeof this.get(b)
            },
            existReverse: function(b) {
                return "undefined" != typeof this.getReverse(b)
            },
            forEach: function(c) {
                b(this.map, c)
            },
            forEachReverse: function(c) {
                b(this.ph, c)
            }
        };
        g.prototype.set = g.prototype.set;
        g.prototype.remove = g.prototype.remove;
        g.prototype.removeReverse = g.prototype.removeReverse;
        g.prototype.get = g.prototype.get;
        g.prototype.getReverse = g.prototype.getReverse;
        g.prototype.exist = g.prototype.exist;
        g.prototype.existReverse = g.prototype.existReverse;
        g.prototype.forEach = g.prototype.forEach;
        g.prototype.forEachReverse = g.prototype.forEachReverse;
        return g
    });
    define("StaticGrid", "Inheritance AbstractGrid VisualUpdate Cell SlidingCell CellMatrix IllegalArgumentException IllegalStateException Helpers ASSERT LoggerManager DoubleKeyMap Environment".split(" "),
    function(e, g, d, c, b, h, f, a, l, m, k, n, q) {
        function p(a, b, c, d) {
            this._callSuperConstructor(p, [a]);
            this.Cp = !1;
            this.ds = null;
            this.setRootNode(c || document);
            this.En = [];
            d && this.addCell(d);
            this.U = new n;
            this.Rb = null; (b = this.checkBool(b, !0)) && this.parseHtml()
        }
        function t(a, b, c) {
            var d = a[b];
            a[b] = a[c];
            a[c] = d
        }
        q.browserDocumentOrDie();
        var u = k.getLoggerProxy("lightstreamer.grids");
        p.prototype = {
            toString: function() {
                return ["[", this.id, "]"].join("|")
            },
            addCell: function(a) {
                if (!a) throw new f("The given cell is null or undefined");
                if (l.isArray(a)) for (var b = 0; b < a.length; b++) this.addCell(a[b]);
                else {
                    a = new c(a);
                    b = a.uq();
                    if (!b || b != this.id) throw new f("The cell does not belong to the Grid");
                    this.Cp = !0;
                    this.En.push(a)
                }
            },
            setRootNode: function(a) {
                if (a && a.getElementsByTagName) this.ds = a;
                else throw new f("The given root element is not valid");
            },
            extractItemList: function() {
                this.Wk();
                if (!1 === this.Rb) throw new a("Can\u0092t extract schema from cells declared with the data-row property; use data-item instead.");
                var b = this.wu(),
                c = [],
                d;
                for (d in b) c.push(d);
                return c
            },
            parseHtml: function() {
                this.parsed = !0;
                this.O.eu();
                var b;
                this.Cp ? (b = this.En, this.En = []) : b = c.Ji(this.ds, this.Fh);
                for (var d = 0; d < b.length; d++) {
                    var e = b[d].uq();
                    if (e && e == this.id && (e = b[d].getRow())) {
                        isNaN(e) || (e = Number(e));
                        if (null === this.Rb) this.Rb = isNaN(e);
                        else if (this.Rb != isNaN(e)) throw a("Can\u0092t mix data-item and data-row declarations on the same grid");
                        this.Rb || (this.j = e > this.j ? e: this.j);
                        b[d].We() && (this.O.Rt(b[d]) || this.O.addCell(b[d]))
                    }
                }
                if (this.O.isEmpty()) throw new a("Please specify at least one cell");
            },
            hl: function(a) {
                var b = {};
                this.O.mv(function(c, d, e) {
                    c.Vp() == a && (b[e] = !0)
                });
                return b
            },
            wu: function() {
                var a = {};
                this.O.forEachRow(function(b) {
                    a[b] = !0
                });
                return a
            },
            updateRowExecution: function(a, b) {
                var c = !this.values.getRow(a),
                d;
                if (this.Rb) d = a;
                else {
                    d = null != this.u ? this.cb(this.values.get(a, this.u)) : null;
                    var e = null != this.u ? this.cb(b[this.u]) : null,
                    f = d == e || "undefined" == typeof b[this.u];
                    d = null != this.u && 0 == f ? this.Mk(a, d, e) : c ? this.tc ? 1 : this.wa() ? this.l == this.j ? this.l: this.l + 1 : this.l + 1 : this.U.get(a);
                    this.wa() && this.j == this.l && c && null != this.u && (c = this.fs(this.lq()), c < d && d--, this.U.set(a, c), this.l++, c = !1);
                    this.U.existReverse(d) && this.U.getReverse(d) != a && this.Xq(d, a);
                    this.U.set(a, d)
                }
                c && this.l++; ! this.wa() && d > this.j && !this.O.getRow(d) && (c = this.O.getRow(d - 1), c = h.Kf(c, null, this.Da), this.O.insertRow(c, d));
                this.Il(d, b);
                c = this.tl(a, d, b);
                this.Us(d, c, a)
            },
            tl: function(a, b, c) {
                this.yg = b;
                this.zg = c;
                c = new d(this.O, c, b);
                this.dispatchEvent("onVisualUpdate", [a, c, b]);
                this.zg = this.yg = null;
                return c
            },
            sq: function(a, c, d, e, f) {
                return this.Rb ? a: new b(this, c, d, e, f)
            },
            Av: function(a, b, c) {
                a = this.U.get(a);
                return this.O.Ve(a, b, c)
            },
            removeRowExecution: function(a) {
                var b = this.Rb ? a: this.U.get(a);
                this.dispatchEvent("onVisualUpdate", [a, null, b]);
                this.Rb || (b != this.l && (this.Xq(this.l, a), b = this.U.get(a)), m.verifyValue(this.l, b) || u.logError(k.resolve(443)));
                this.O.Kp(b,
                function(a) {
                    a.clean()
                });
                this.l--;
                this.Rb || this.U.remove(a)
            },
            fs: function(a) {
                var b = this.U.get(a);
                this.U.remove(a);
                this.l--;
                this.values.delRow(a);
                this.wa() && this.Ur(a);
                return b
            },
            Xq: function(a, b) {
                var c = this.U.get(b);
                if (a != c) {
                    var d = c ? h.Kf(this.O.getRow(c), null, this.Da) : null,
                    e = c ? this.U.getReverse(c) : null,
                    f,
                    g,
                    k;
                    c ? c > a ? (g = c - 1, k = a, f = -1) : (g = c + 1, k = a, f = 1) : null != this.u || this.tc ? (k = a, g = this.l, f = -1) : (g = 1, k = a, f = 1);
                    for (var l = g; l - f != k; l += f) {
                        var n = l - f,
                        p = this.O.getRow(l),
                        q = this.O.getRow(n);
                        q || this.wa() || (q = {},
                        this.O.insertRow(q, n), m.verifyNotOk(c));
                        q ? (h.Kf(p, q, this.Da), p = this.U.getReverse(l), this.U.set(p, n)) : (m.verifyOk(this.wa()), m.verifyValue(l, g), p = this.U.getReverse(l), this.fs(p))
                    }
                    d ? (h.Kf(d, this.O.getRow(a), this.Da), this.U.set(e, a)) : this.O.Kp(a,
                    function(a) {
                        a.clean()
                    })
                }
            },
            Mk: function(a, b, c) {
                for (var d = 1,
                e = this.l,
                f = -1; d < e;) {
                    var f = Math.floor((d + e) / 2),
                    g = null;
                    f <= this.l && (g = this.U.getReverse(f), g = g == a ? b: this.cb(this.values.get(g, this.u)));
                    this.Wd(c, g) ? e = f - 1 : d = f + 1
                }
                return d == e ? (g = this.U.getReverse(d), a = this.cb(this.values.get(g, this.u)), this.Wd(c, a) ? d: d + 1) : d
            },
            Qy: function(a, b, c, d) {
                var e = this.cb(this.values.get(a[d], this.u));
                t(a, c, d);
                for (d = b; b < c; b++) {
                    var f = this.cb(this.values.get(a[b], this.u));
                    this.Wd(e, f) || (t(a, b, d), d++)
                }
                t(a, d, c);
                return d
            },
            Wm: function(a, b, c) {
                if (b < c) {
                    var d = this.Qy(a, b, c, Math.round(b + (c - b) / 2));
                    this.Wm(a, b, d - 1);
                    this.Wm(a, d + 1, c)
                }
            },
            Vj: function() {
                if (!this.Rb) {
                    var a = {};
                    this.U.forEachReverse(function(b, c) {
                        a[b] = c
                    });
                    this.Wm(a, 1, this.l);
                    var b = {},
                    c = new n,
                    d;
                    for (d in a) if (c.set(a[d], d), oldKeyPerPos = this.U.getReverse(d), a[d] != oldKeyPerPos) {
                        var e = this.O.getRow(d);
                        b[oldKeyPerPos] = h.Kf(e, null, this.Da);
                        var f = a[d],
                        f = b[f] ? b[f] : this.O.getRow(this.U.get(f));
                        h.Kf(f, e, this.Da)
                    }
                    this.U = c
                }
            },
            addListener: function(a) {
                this._callSuperMethod(p, "addListener", [a])
            },
            removeListener: function(a) {
                this._callSuperMethod(p, "removeListener", [a])
            },
            getListeners: function() {
                return this._callSuperMethod(p, "getListeners")
            }
        };
        p.prototype.addCell = p.prototype.addCell;
        p.prototype.setRootNode = p.prototype.setRootNode;
        p.prototype.extractItemList = p.prototype.extractItemList;
        p.prototype.parseHtml = p.prototype.parseHtml;
        p.prototype.addListener = p.prototype.addListener;
        p.prototype.removeListener = p.prototype.removeListener;
        p.prototype.getListeners = p.prototype.getListeners;
        p.prototype.updateRowExecution = p.prototype.updateRowExecution;
        p.prototype.removeRowExecution = p.prototype.removeRowExecution;
        e(p, g);
        return p
    });
    define("lscx", ["LoggerManager", "lscAe"],
    function(e, g) {
        function d(b, c) {
            this.K = b;
            this.Ch = c
        }
        var c = e.getLoggerProxy(g.ho);
        d.prototype = {
            onItemUpdate: function(b) {
                var d = {};
                d.length = b.gw();
                for (var f = 1; f <= d.length; f++) {
                    d[f + "_old"] = b.getValue(f);
                    b.Nq(f) ? d[f] = b.getValue(f) : d[f] = g.xe;
                    var a = b.Ov(f);
                    null != a && (d[a + "_pos"] = f)
                }
                f = b.Ii();
                b = b.Xl();
                try {
                    this.K.flashObj.onItemUpdate(this.Ch, f, d, b)
                } catch(l) {
                    c.logWarn(e.resolve(352), l)
                }
            },
            qr: function(b, d, f) {
                try {
                    this.K.flashObj.onLostUpdates(this.Ch, d, f, b)
                } catch(a) {
                    c.logWarn(e.resolve(353), a)
                }
            },
            onEndOfSnapshot: function() {
                try {
                    this.K.flashObj.onEndOfSnapshot(this.Ch)
                } catch(b) {
                    c.logWarn(e.resolve(354), b)
                }
            },
            onClearSnapshot: function() {
                try {
                    this.K.flashObj.onClearSnapshot(this.Ch)
                } catch(b) {
                    c.logWarn(e.resolve(355), b)
                }
            },
            onSubscription: function() {
                try {
                    this.K.flashObj.onStart(this.Ch)
                } catch(b) {
                    c.logWarn(e.resolve(356), b)
                }
            }
        };
        return d
    });
    define("FlashBridge", "LoggerManager EnvironmentStatus lscx Global Subscription Environment Helpers IllegalArgumentException lscAe Executor".split(" "),
    function(e, g, d, c, b, h, f, a, l, m) {
        function k(b, c, f) {
            this.ge = this.flashObj = null;
            this.xf = b;
            this.v = {};
            this.Ck = {};
            this.kr = !1;
            this.jr = f;
            p[b] = this;
            g.isLoaded() && this.rr();
            if (!c || !c.subscribe) throw new a("A LightstreamerClient instance is need for a FlashBridge to feed real-time data to a Flash object");
            this.Rz(c)
        }
        h.browserDocumentOrDie();
        var n = e.getLoggerProxy(l.ho);
        k.prototype = {
            rr: function() { - 1 != navigator.appName.indexOf("Microsoft") ? (this.flashObj = eval("window." + this.xf), this.flashObj.onStatusChange || this.Aq()) : this.flashObj = eval("window.document." + this.xf);
                this.flashObj ? this.ii() : n.logError(e.resolve(357), this.xf)
            },
            ii: function(a) {
                if (this.ge) if (this.flashObj) if (q[this.xf]) {
                    if (!this.flashObj.onStatusChange && ( - 1 != navigator.appName.indexOf("Microsoft") && this.Aq(), !this.hu())) {
                        n.logWarn(e.resolve(359), this, a);
                        a = a ? 3E3 < 2 * a ? 3E3: 2 * a: 50;
                        m.addTimedTask(this.ii, a, this, [a]);
                        return
                    }
                    n.logWarn(e.resolve(360), this);
                    if (!this.kr) {
                        try {
                            this.flashObj.onReady()
                        } catch(b) {
                            n.logWarn(e.resolve(361), b)
                        }
                        this.Oo(this.ge.Gb());
                        if (this.jr) try {
                            this.jr(this.flashObj)
                        } catch(b) {}
                        this.kr = !0
                    }
                } else n.logDebug(e.resolve(366), this);
                else n.logDebug(e.resolve(365), this);
                else n.logDebug(e.resolve(364), this)
            },
            Aq: function() {
                if (this.flashObj.length) for (var a = 0; a < this.flashObj.length; a++) if (this.flashObj[a].onStatusChange) {
                    this.flashObj = this.flashObj[a];
                    break
                }
            },
            hu: function() {
                return this.flashObj.onStatusChange && this.flashObj.onReady
            },
            Oo: function(a) {
                if (this.flashObj) if (q[this.xf]) if (this.flashObj.onStatusChange) try {
                    this.flashObj.onStatusChange(a)
                } catch(b) {
                    n.logWarn(e.resolve(362), b)
                } else n.logDebug(e.resolve(369), this);
                else n.logDebug(e.resolve(368), this);
                else n.logDebug(e.resolve(367), this)
            },
            Rz: function(a) {
                this.ge = a;
                var b = this;
                a.addListener({
                    onStatusChange: function(a) {
                        b.Oo(a)
                    }
                });
                this.ii()
            },
            Sv: function() {
                return this.flashObj ? this.flashObj: null
            },
            Eu: function(a, c, d, h) {
                n.logDebug(e.resolve(370));
                this.v[h] = new b(d);
                f.isArray(a) ? this.v[h].wh(a) : this.v[h].vs(a);
                f.isArray(c) ? this.v[h].Oj(c) : this.v[h].kn(c)
            },
            pe: function(a, b) {
                n.logDebug(e.resolve(371));
                if (this.flashObj) if (this.ge) if (this.v[a]) {
                    var c = new d(p[this.xf], b);
                    this.v[a].addListener(c);
                    this.Ck[b] = this.v[a];
                    this.ge.subscribe(this.v[a])
                } else n.logDebug(e.resolve(373));
                else n.logDebug(e.resolve(372));
                else n.logError(e.resolve(358))
            },
            wd: function(a) {
                n.logDebug(e.resolve(374));
                this.ge ? (this.ge.unsubscribe(this.Ck[a]), delete this.Ck[a]) : n.logDebug(e.resolve(375))
            },
            Qz: function() {},
            eA: function(a, b) {
                this.v[a] ? this.v[a].nn(!0 === b ? "yes": !1 === b ? "no": b) : n.logDebug(e.resolve(376))
            },
            xh: function(a, b) {
                this.v[a] ? this.v[a].xh(b) : n.logDebug(e.resolve(377))
            },
            Rj: function(a, b) {
                this.v[a] ? this.v[a].Rj(b) : n.logDebug(e.resolve(378))
            },
            Sj: function(a, b) {
                this.v[a] ? this.v[a].Sj(b) : n.logDebug(e.resolve(379))
            },
            uh: function(a, b) {
                this.v[a] ? this.v[a].uh(b) : n.logDebug(e.resolve(380))
            }
        };
        var q = {},
        p = {};
        k.bridges = p;
        k.flashIsReady = function(a) {
            q[a] = !0;
            n.logInfo(e.resolve(363), a);
            null != p[a] && p[a].ii()
        };
        k.prototype.createTable = k.prototype.Eu;
        k.prototype.subscribeTable = k.prototype.pe;
        k.prototype.unsubscribeTable = k.prototype.wd;
        k.prototype.setItemsRange = k.prototype.Qz;
        k.prototype.setSnapshotRequired = k.prototype.eA;
        k.prototype.setRequestedMaxFrequency = k.prototype.xh;
        k.prototype.setRequestedBufferSize = k.prototype.Rj;
        k.prototype.setSelector = k.prototype.Sj;
        k.prototype.setDataAdapter = k.prototype.uh;
        c.FlashBridge = k;
        k.prototype.getFlashObject = k.prototype.Sv;
        g.addOnloadHandler(function() {
            for (var a in p) p[a].rr()
        });
        return k
    });
    define("ChartLine", ["LoggerManager", "Setter", "Inheritance", "Cell", "IllegalArgumentException"],
    function(e, g, d, c, b) {
        function h(b, c, d, g) {
            this.parent = c;
            this.dB = g;
            this.nm = this.Rm = "black";
            this.$i = this.Ff = 1;
            this.gk = this.Tb = this.tb = null;
            this.wf = 0;
            this.Ha = null;
            this.ek = [];
            this.Wn = [];
            this.labels = [];
            this.gu = a++;
            f.logDebug(e.resolve(404), this)
        }
        var f = e.getLoggerProxy("lightstreamer.charts"),
        a = 0;
        h.prototype = {
            toString: function() {
                return ["[|ChartLine", this.parent, "]"].join("|")
            },
            fa: function() {
                return this.gu
            },
            Uu: function() {
                f.logDebug(e.resolve(405), this);
                this.Wn = [];
                this.ek = []
            },
            isEmpty: function() {
                return 0 >= this.ek.length
            },
            reset: function() {
                this.Uu();
                this.parent.$k(this)
            },
            an: function() {
                f.logDebug(e.resolve(406), this);
                var a = this.ek,
                b = this.Wn;
                for (this.reset(); 0 < a.length;)(1 < a.length && a[1] >= this.parent.Ya || a[0] >= this.parent.Ya) && this.Ao(a[0], b[0]),
                a.shift(),
                b.shift();
                f.logDebug(e.resolve(407), this)
            },
            Ao: function(a, b) {
                this.ek.push(a);
                this.Wn.push(b);
                this.parent.Tu(a, b, this)
            },
            gi: function() {
                this.gk = (this.Tb - this.tb) / this.parent.screenY;
                f.logDebug(e.resolve(408), this, this.gk)
            },
            im: function() {
                return null !== this.Tb
            },
            isPointInRange: function(a) {
                return a < this.Tb && a > this.tb
            },
            ah: function() {
                this.tg();
                var a = "",
                b = -1;
                if (! (0 >= this.wf)) {
                    0 < this.wf && (a = this.Ha ? this.Ha(this.tb) : this.tb, b = this.Ni(this.tb), this.labels[this.labels.length] = this.parent.Ie(this.Yk, a, b, "Y"));
                    1 < this.wf && (a = this.Ha ? this.Ha(this.Tb) : this.Tb, b = this.Ni(this.Tb), this.labels[this.labels.length] = this.parent.Ie(this.Yk, a, b, "Y"));
                    if (2 < this.wf) for (var c = this.wf - 1,
                    d = (this.Tb - this.tb) / c, g = this.tb, h = 1; h < c; h++) g += d,
                    a = this.Ha ? this.Ha(g) : g,
                    b = this.Ni(g),
                    this.labels[this.labels.length] = this.parent.Ie(this.Yk, a, b, "Y");
                    f.logDebug(e.resolve(409), this)
                }
            },
            Ni: function(a) {
                return Math.round((new Number(a) - this.tb) / this.gk)
            },
            tg: function() {
                for (var a = 0; a < this.labels.length; a++) this.labels[a] && c.hd(this.labels[a]) && this.labels[a].parentNode.removeChild(this.labels[a]);
                this.labels = [];
                f.logDebug(e.resolve(410), this)
            },
            mA: function(a, b, c) {
                this.wf = this.checkPositiveNumber(a, !0);
                this.Yk = b;
                this.Ha = c || null;
                f.logDebug(e.resolve(411), this);
                null != this.gk && this.parent && this.parent.L && this.ah()
            },
            setStyle: function(a, b, c, d) {
                this.Rm = a;
                this.nm = b;
                this.Ff = this.checkPositiveNumber(c);
                this.$i = this.checkPositiveNumber(d);
                f.logDebug(e.resolve(412), this)
            },
            Hr: function(a, c) {
                this.Tb = Number(c);
                this.tb = Number(a);
                if (isNaN(this.Tb) || isNaN(this.tb)) throw new b("Min and max must be numbers");
                if (this.tb > this.Tb) throw new b("The maximum value must be greater than the minimum value");
                this.parent && null != this.parent.screenY && this.parent.L && (this.gi(), this.ah(), this.isEmpty() || this.an());
                f.logDebug(e.resolve(413), this)
            },
            Ew: function() {
                return this.dB
            }
        };
        h.prototype.setYLabels = h.prototype.mA;
        h.prototype.setStyle = h.prototype.setStyle;
        h.prototype.positionYAxis = h.prototype.Hr;
        h.prototype.getYField = h.prototype.Ew;
        d(h, g, "O");
        return h
    });
    define("ChartPainter", ["Cell", "ASSERT"],
    function(e) {
        function g(b, c) {
            this.$a = b;
            this.Kb = this.bb = null;
            this.L = c;
            this.he = []
        }
        function d(b, c) {
            this.$a = b;
            this.Kb = this.bb = null;
            this.L = c;
            this.bd = this.ac = null
        }
        function c(b) {
            var c = !1;
            if (!b) try {
                document.createElement("canvas").getContext && (c = !0)
            } catch(d) {}
            this.UA = c;
            this.za;
            this.jd = {}
        }
        c.prototype = {
            Gz: function(b) {
                this.za = document.createElement("div");
                this.za.style.position = "absolute";
                this.za.style.overflow = "hidden";
                b.appendChild(this.za)
            },
            clean: function() {
                this.za && e.hd(this.za) && this.za.parentNode.removeChild(this.za)
            },
            sd: function(b, c) {
                this.za.style.width = b + "px";
                this.za.style.height = c + "px";
                this.mg = c;
                this.St = b
            },
            Tz: function(b, c) {
                this.za.style.top = c + "px";
                this.za.style.left = b + "px"
            },
            Az: function(b) {
                this.za.className = b
            },
            Nt: function(b) {
                this.jd[b.fa()] = this.UA ? new d(b, this) : new g(b, this)
            },
            ez: function(b) {
                b = b.fa();
                this.jd[b] && (this.jd[b].remove(), delete this.jd[b])
            },
            $k: function(b) {
                b = b.fa();
                this.jd[b] && this.jd[b].clear()
            },
            Py: function(b, c, d) {
                var a = b.fa();
                this.jd[a] || this.Nt(b);
                this.jd[a].vp(c, d)
            }
        };
        d.prototype = {
            Mw: function() {
                if (!this.bd) {
                    var b = document.createElement("canvas");
                    b.style.position = "absolute";
                    b.style.overflow = "hidden";
                    var c = b.getContext("2d");
                    this.L.za.appendChild(b);
                    this.bd = b;
                    this.ac = c
                }
                this.bd.width = this.L.St;
                this.bd.height = this.L.mg
            },
            vp: function(b, c) {
                c = this.L.mg - c;
                null === this.bb ? this.Mw() : (this.ac.beginPath(), this.ac.strokeStyle = this.$a.nm, this.ac.lineWidth = this.$a.$i, this.ac.moveTo(this.bb, this.Kb), this.ac.lineTo(b, c), this.ac.stroke());
                this.wl(b, c)
            },
            wl: function(b, c) {
                this.bb = b;
                this.Kb = c;
                var d = Math.round(this.$a.Ff / 2);
                this.ac.fillStyle = this.$a.Rm;
                this.ac.fillRect(b - d, c - d, this.$a.Ff, this.$a.Ff)
            },
            clear: function() {
                this.Kb = this.bb = null;
                this.ac.clearRect(0, 0, this.bd.width, this.bd.height)
            },
            remove: function() {
                this.Kb = this.bb = null;
                this.L.za.removeChild(this.bd);
                this.bd = null
            }
        };
        g.prototype = {
            vp: function(b, c) {
                if (null !== this.bb) {
                    var d = b - this.bb,
                    a = c - this.Kb,
                    e = Math.abs(d),
                    g = Math.abs(a),
                    k = null,
                    n = 0,
                    q = 0,
                    p = 0;
                    e >= g ? (p = a / d, n = d, q = 0 <= d ? 1 : -1) : (p = d / a, n = a, q = 0 <= a ? 1 : -1);
                    var a = d = 0,
                    t = null,
                    u = null,
                    r = !0,
                    z = !0;
                    e < g && (z = !1);
                    for (e = 0; e != n; e += q) {
                        var x = g = 0,
                        D = 0,
                        B = 0,
                        v = !1;
                        e + q == n && (r = v = !0);
                        k = document.createElement("div");
                        v ? (k.style.backgroundColor = this.$a.Rm, k.style.width = this.$a.Ff + "px", k.style.height = this.$a.Ff + "px") : (k.style.backgroundColor = this.$a.nm, k.style.width = this.$a.$i + "px", k.style.height = this.$a.$i + "px");
                        k.style.position = "absolute";
                        k.style.fontSize = "0px";
                        this.L.za.appendChild(k);
                        this.he.push(k);
                        r && (r = !1, t = Math.ceil(k.offsetWidth / 2), u = Math.ceil(k.offsetHeight / 2), d = k.offsetWidth, a = k.offsetHeight);
                        D = d;
                        B = a;
                        if (z) {
                            if (g = Math.round(e + this.bb), x = Math.round(this.L.mg - (p * e + this.Kb)), !v) {
                                for (v = 0; e + q != n - q && x == Math.round(this.L.mg - (p * (e + q) + this.Kb));) e += q,
                                v++;
                                v *= t;
                                D = d + v;
                                0 > q && (g -= v)
                            }
                        } else if (g = Math.round(p * e + this.bb), x = Math.round(this.L.mg - (e + this.Kb)), !v) {
                            for (v = 0; e + q != n - q && g == Math.round(p * (e + q) + this.bb);) e += q,
                            v++;
                            v *= u;
                            B = a + v;
                            0 < q && (x -= v)
                        }
                        g -= Math.floor(t / 2);
                        x -= Math.floor(u / 2);
                        k.style.left = g + "px";
                        k.style.top = x + "px";
                        k.style.width = D + "px";
                        k.style.height = B + "px"
                    }
                }
                this.wl(b, c)
            },
            wl: function(b, c) {
                this.bb = b;
                this.Kb = c
            },
            clear: function() {
                if (this.he[0] && e.hd(this.he[0])) for (var b = 0; b < this.he.length; b++) this.he[b].parentNode.removeChild(this.he[b]);
                this.he = [];
                this.Kb = this.bb = null
            },
            remove: function() {
                this.clear()
            }
        };
        return c
    });
    define("Chart", "AbstractWidget Cell LoggerManager Inheritance Helpers Environment ChartLine ChartPainter IllegalStateException IllegalArgumentException".split(" "),
    function(e, g, d, c, b, h, f, a, l, m) {
        function k(a) {
            this._callSuperConstructor(k, arguments);
            this.Fe = document.createElement("div");
            this.Fe.style.position = "relative";
            this.Fe.style.overflow = "visible";
            this.Ho = "";
            this.offsetX = this.offsetY = 0;
            this.screenY = this.screenX = null;
            this.labels = [];
            this.Ha = null;
            this.vf = 0;
            this.Ys = this.fk = this.hb = this.Ya = this.Un = null;
            this.Z = {};
            this.Xn = {};
            this.pv = !1;
            this.L = null;
            this.parseHtml()
        }
        h.browserDocumentOrDie();
        var n = d.getLoggerProxy("lightstreamer.charts");
        k.prototype = {
            toString: function() {
                return ["[|Chart", this.id, "]"].join("|")
            },
            Ow: function() {
                this.L = new a(this.pv);
                this.L.Gz(this.Fe);
                this.fp()
            },
            fp: function() {
                this.L && (this.L.sd(this.screenX, this.screenY), this.L.Tz(this.offsetX, this.offsetY), this.L.Az(this.Ho), n.logDebug(d.resolve(419)))
            },
            ps: function(a, b) {
                if (!this.L) if (a && a.appendChild) {
                    a.appendChild(this.Fe);
                    null == this.screenX && (this.screenX = a.offsetWidth);
                    null == this.screenY && (this.screenY = a.offsetHeight);
                    this.Ow();
                    null != this.hb && (this.Kk(), this.sj());
                    for (var c in this.Z) for (var e in this.Z[c]) {
                        var f = this.Z[c][e];
                        f && f.im() && (f.gi(), f.ah())
                    }
                    n.logInfo(d.resolve(416), this, a)
                } else b || n.logError(d.resolve(414), this)
            },
            Ie: function(a, b, c, e) {
                n.logDebug(d.resolve(420), this);
                var f = document.createElement("div");
                null != a && (f.className = a);
                f.style.position = "absolute";
                f.appendChild(document.createTextNode(b));
                this.Fe.appendChild(f);
                a = f.offsetWidth;
                "X" == e.toUpperCase() ? (f.style.top = this.screenY + 5 + this.offsetY + "px", f.style.left = c - f.offsetWidth / 2 + this.offsetX + "px") : "Y" == e.toUpperCase() && (f.style.left = this.offsetX - a + "px", f.style.top = this.screenY - c - f.offsetHeight / 2 + this.offsetY + "px");
                return f
            },
            $k: function(a) {
                this.L.$k(a)
            },
            Tu: function(a, b, c) {
                n.isDebugLogEnabled() && n.logDebug(d.resolve(421), this);
                a = this.Mi(a);
                b = c.Ni(b);
                n.isDebugLogEnabled() && n.logDebug(d.resolve(422), a, b);
                this.L.Py(c, a, b);
                n.isDebugLogEnabled() && n.logDebug(d.resolve(423))
            },
            jz: function() {
                n.logDebug(d.resolve(424));
                for (var a in this.Z) for (var b in this.Z[a]) {
                    var c = this.Z[a][b];
                    c && !c.isEmpty() && c.an()
                }
            },
            Kk: function() {
                this.fk = (this.hb - this.Ya) / this.screenX;
                n.isDebugLogEnabled() && n.logDebug(d.resolve(425), this, this.fk)
            },
            sj: function() {
                this.tg();
                var a = "",
                b = -1;
                if (! (0 >= this.vf)) {
                    0 < this.vf && (a = this.Ha ? this.Ha(this.Ya) : this.Ya, b = this.Mi(this.Ya), this.labels[this.labels.length] = this.Ie(this.Xk, a, b, "X"));
                    1 < this.vf && (a = this.Ha ? this.Ha(this.hb) : this.hb, b = this.Mi(this.hb), this.labels[this.labels.length] = this.Ie(this.Xk, a, b, "X"));
                    if (2 < this.vf) for (var c = this.vf - 1,
                    e = (this.hb - this.Ya) / c, f = this.Ya, g = 1; g < c; g++) f += e,
                    a = this.Ha ? this.Ha(f) : f,
                    b = this.Mi(f),
                    this.labels[this.labels.length] = this.Ie(this.Xk, a, b, "X");
                    n.logDebug(d.resolve(426), this)
                }
            },
            Mi: function(a) {
                return Math.round((new Number(a) - this.Ya) / this.fk)
            },
            tg: function() {
                for (var a = 0; a < this.labels.length; a++) this.labels[a] && g.hd(this.labels[a]) && this.labels[a].parentNode.removeChild(this.labels[a]);
                this.labels = [];
                n.logDebug(d.resolve(427), this)
            },
            onListenStart: function(a) {
                this._callSuperMethod(k, "onListenStart", [a]);
                this.wa() && (this.kind = e.io)
            },
            Br: function(a, c, d, e) {
                c = null === c[d] || "undefined" == typeof c[d] ? this.values.get(a, d) : c[d];
                c = e ? e(c, a) : c;
                return null === c ? null: b.getNumber(c)
            },
            mergeUpdate: function(a, b) {
                this.Os(a, b)
            },
            updateRowExecution: function(a, b) {
                var c = this.Br(a, b, this.Un, this.Ys);
                if (null !== c && !(isNaN(c) || null !== c && c < this.Ya)) {
                    c > this.hb && this.dispatchEvent("onXOverflow", [a, c, this.Ya, this.hb]);
                    for (var e in this.Z) {
                        var g = this.Br(a, b, e, this.Xn[e]);
                        if (!isNaN(g)) {
                            var h = this.Z[e][a];
                            if (null == c || null == g) h && null == c && null == g ? (n.logInfo(d.resolve(417), this, h), h.reset()) : n.logDebug(d.resolve(428), this, h);
                            else {
                                if (!h) {
                                    h = new f(a, this, this.Un, e);
                                    this.dispatchEvent("onNewLine", [a, h, c, g]);
                                    if (!h.im()) {
                                        n.logError(d.resolve(415), this);
                                        break
                                    }
                                    h.gi();
                                    h.ah();
                                    this.Z[e][a] = h
                                }
                                h.isPointInRange(g) || this.dispatchEvent("onYOverflow", [a, h, g, h.tb, h.Tb]);
                                h.Ao(c, g)
                            }
                        }
                    }
                }
            },
            removeRowExecution: function(a) {
                for (var b in this.Z) this.op(a, b)
            },
            op: function(a, b) {
                if (this.Z[b]) {
                    var c = this.Z[b][a];
                    c.reset();
                    c.tg();
                    this.L.ez(c);
                    delete this.Z[b][a];
                    this.dispatchEvent("onRemovedLine", [a, c]);
                    n.logDebug(d.resolve(429), this, a, b)
                }
            },
            clean: function() {
                this._callSuperMethod(k, "clean");
                this.tg();
                this.L && this.L.clean();
                delete this.L;
                this.ps(this.Fe.parentNode, !0);
                n.logDebug(d.resolve(430), this)
            },
            parseHtml: function() {
                n.logInfo(d.resolve(418), this);
                var a = document.getElementById(this.id);
                if (a) {
                    if (!g.Ts(a)) throw new l("A DOM element must be provided as an anchor for the chart");
                    this.ps(a);
                    this.parsed = !0
                }
            },
            configureArea: function(a, b, c, d, e) {
                a && (this.Ho = a);
                d && (this.offsetY = this.checkPositiveNumber(d, !0));
                e && (this.offsetX = this.checkPositiveNumber(e, !0));
                b && (this.screenY = this.checkPositiveNumber(b, !0));
                c && (this.screenX = this.checkPositiveNumber(c, !0));
                this.fp();
                if (c || b) {
                    c && null != this.hb && (this.Kk(), this.sj());
                    for (var f in this.Z) for (var g in this.Z[f])(a = this.Z[f][g]) && a.im() && null != this.hb && (b && (a.gi(), a.ah()), a && !a.isEmpty() && a.an())
                }
            },
            setXAxis: function(a, b) {
                this.Un = a;
                this.Ys = b;
                this.clean();
                n.logDebug(d.resolve(431), a, this)
            },
            addYAxis: function(a, c) {
                if (b.isArray(a)) {
                    n.logDebug(d.resolve(432), this);
                    for (var e = 0; e < a.length; e++) b.isArray(c) ? this.addYAxis(a[e], c[e]) : this.addYAxis(a[e], c)
                } else this.Z[a] || (this.Z[a] = {}),
                this.Xn[a] = c,
                n.logDebug(d.resolve(433), a, this)
            },
            removeYAxis: function(a) {
                if (b.isArray(a)) {
                    n.logDebug(d.resolve(434), this);
                    for (var c = 0; c < a.length; c++) this.removeYAxis(a[c])
                } else if (this.Z[a]) {
                    for (c in this.Z[a]) this.op(c, a);
                    delete this.Z[a];
                    delete this.Xn[a];
                    n.logDebug(d.resolve(435), a, this)
                }
            },
            positionXAxis: function(a, b) {
                this.hb = Number(b);
                this.Ya = Number(a);
                if (isNaN(this.hb) || isNaN(this.Ya)) throw new m("Min and max must be numbers");
                if (this.Ya > this.hb) throw new m("The maximum value must be greater than the minimum value");
                null != this.screenX && (this.Kk(), this.sj());
                this.jz();
                n.logDebug(d.resolve(436), this)
            },
            setXLabels: function(a, b, c) {
                this.vf = this.checkPositiveNumber(a, !0);
                this.Xk = b;
                this.Ha = c || null;
                null != this.fk && this.sj();
                n.logDebug(d.resolve(437), this)
            },
            addListener: function(a) {
                this._callSuperMethod(k, "addListener", [a])
            },
            removeListener: function(a) {
                this._callSuperMethod(k, "removeListener", [a])
            },
            getListeners: function() {
                return this._callSuperMethod(k, "getListeners")
            }
        };
        k.prototype.parseHtml = k.prototype.parseHtml;
        k.prototype.configureArea = k.prototype.configureArea;
        k.prototype.setXAxis = k.prototype.setXAxis;
        k.prototype.addYAxis = k.prototype.addYAxis;
        k.prototype.removeYAxis = k.prototype.removeYAxis;
        k.prototype.positionXAxis = k.prototype.positionXAxis;
        k.prototype.setXLabels = k.prototype.setXLabels;
        k.prototype.addListener = k.prototype.addListener;
        k.prototype.removeListener = k.prototype.removeListener;
        k.prototype.getListeners = k.prototype.getListeners;
        k.prototype.clean = k.prototype.clean;
        k.prototype.onListenStart = k.prototype.onListenStart;
        k.prototype.updateRowExecution = k.prototype.updateRowExecution;
        k.prototype.removeRowExecution = k.prototype.removeRowExecution;
        c(k, e);
        return k
    });
    define("SimpleChartListener", ["List"],
    function(e) {
        function g(d, c) {
            this.cB = d || 60;
            c = (c || 20) / 100;
            this.Px = 1 + c;
            this.Ax = 1 - c;
            this.Zl = new e;
            this.sf;
            this.pf
        }
        g.prototype = {
            onListenStart: function(d) {
                this.To = d
            },
            onYOverflow: function(d, c, b, e, f) {
                d = (f - e) / 2;
                b > f ? (f += d, b > f && (f = b), this.pf = f, this.On(e, f)) : b < e && (e -= d, b < e && (e = b), this.sf = e, this.On(e, f))
            },
            onXOverflow: function(d, c, b, e) {
                c > e && (d = (e + b) / 2, this.To.positionXAxis(d, d + (e - b)))
            },
            onNewLine: function(d, c, b, e) {
                this.To.positionXAxis(b, b + this.cB);
                d = e * this.Ax;
                e *= this.Px;
                this.Zl.add(c);
                this.sf = null !== this.sf && this.sf <= d ? this.sf: d;
                this.pf = null !== this.pf && this.pf >= e ? this.pf: e;
                this.On(this.sf, this.pf)
            },
            onRemovedLine: function(d, c) {
                this.Zl.remove(c)
            },
            On: function(d, c) {
                this.Zl.forEach(function(b) {
                    b.Hr(d, c)
                })
            }
        };
        g.prototype.onListenStart = g.prototype.onListenStart;
        g.prototype.onYOverflow = g.prototype.onYOverflow;
        g.prototype.onXOverflow = g.prototype.onXOverflow;
        g.prototype.onNewLine = g.prototype.onNewLine;
        g.prototype.onRemovedLine = g.prototype.onRemovedLine;
        return g
    });
    define("StatusWidget", "Environment IllegalArgumentException Helpers LightstreamerConstants Executor BrowserDetection".split(" "),
    function(e, g, d, c, b, h) {
        function f(a, c, e, f) {
            if (!q) {
                this.ready = !1;
                this.Ic = this.Jk = null;
                a = a || "left";
                if (!z[a]) throw new g("The given value is not valid. Admitted values are no, left and right");
                f = f || "closed";
                if (!x[f]) throw new g("The given value is not valid. Admitted values are open, closed and dyna");
                var h = e ? c: "auto";
                e = e ? "auto": c;
                this.gb = k("div");
                c = k("div");
                this.fb = k("div");
                m(this.gb, {
                    zIndex: "99999"
                });
                m(c, {
                    width: "42px",
                    height: "42px",
                    opacity: "0.95",
                    filter: "alpha(opacity\x3d95)",
                    backgroundColor: "#135656",
                    zIndex: "99999",
                    position: "relative"
                });
                m(this.fb, {
                    width: "245px",
                    height: "42px",
                    backgroundColor: "#ECE981",
                    fontFamily: "'Open Sans',Arial,sans-serif",
                    fontSize: "11px",
                    color: "#3E5B3E",
                    position: "absolute",
                    zIndex: "99998",
                    visibility: "hidden",
                    opacity: "0",
                    filter: "alpha(opacity\x3d0)",
                    transition: "all 0.5s",
                    MozTransition: "all 0.5s",
                    "-webkit-transition": "all 0.5s",
                    OTransition: "all 0.5s",
                    "-ms-transition": "all 0.5s"
                });
                "no" == a ? (m(this.gb, {
                    position: "absolute"
                }), m(c, {
                    borderRadius: "4px",
                    "float": "left"
                }), m(this.fb, {
                    borderTopRightRadius: "4px",
                    borderBottomRightRadius: "4px",
                    left: "38px"
                })) : (m(this.gb, {
                    position: "fixed",
                    top: h,
                    bottom: e
                }), "left" == a ? (m(this.gb, {
                    left: "0px"
                }), m(c, {
                    borderTopRightRadius: "4px",
                    borderBottomRightRadius: "4px",
                    "float": "left"
                }), m(this.fb, {
                    borderTopRightRadius: "4px",
                    borderBottomRightRadius: "4px",
                    left: "38px"
                })) : (m(this.gb, {
                    right: "0px"
                }), m(c, {
                    borderTopLeftRadius: "4px",
                    borderBottomLeftRadius: "4px",
                    "float": "right"
                }), m(this.fb, {
                    borderTopLeftRadius: "4px",
                    borderBottomLeftRadius: "4px",
                    right: "38px"
                })));
                this.gb.appendChild(c);
                this.gb.appendChild(this.fb);
                a = k("div");
                m(a, {
                    position: "absolute",
                    top: "2px",
                    left: "5px",
                    width: "32px",
                    height: "32px"
                });
                c.appendChild(a);
                this.Nw(a);
                this.RA = new n(c, 1);
                this.BA = new n(c, 2);
                this.Gx = new n(c, 3);
                this.ql = k("div");
                m(this.ql, {
                    position: "absolute",
                    top: "7px",
                    left: "13px"
                });
                this.fb.appendChild(this.ql);
                this.statusText = k("div");
                m(this.statusText, {
                    position: "absolute",
                    top: "21px",
                    left: "13px"
                });
                this.fb.appendChild(this.statusText);
                this.Qb(v, v, v, "Ready", "DATA STREAMING", this.Hb);
                this.Ak();
                this.Md = 2;
                this.pinned = !1;
                "closed" != f && (this.qj(!0), "dyna" == f ? b.addTimedTask(this.iq(), 1E3) : this.pinned = !0);
                f = this.zw();
                d.addEvent(this.fb, "transitionend", f);
                d.addEvent(this.fb, "webkitTransitionEnd", f);
                d.addEvent(this.fb, "MSTransitionEnd", f);
                d.addEvent(this.fb, "oTransitionEnd", f);
                d.addEvent(this.gb, "click", this.Bv());
                d.addEvent(this.gb, "mouseover", this.cw());
                d.addEvent(this.gb, "mouseout", this.iq())
            }
        }
        function a(a) {
            var b = k("img");
            b.src = a;
            m(b, {
                display: "none"
            });
            return b
        }
        function l() {
            for (var a = {},
            b = 0; b < arguments.length; b++) a[arguments[b]] = !0;
            return a
        }
        function m(a, b) {
            for (var c in b) a.style[c] = b[c]
        }
        function k(a) {
            a = document.createElement(a);
            m(a, {
                backgroundColor: "transparent"
            });
            return a
        }
        function n(a, b) {
            this.mm = k("div");
            m(this.mm, {
                position: "absolute",
                bottom: "3px",
                left: 5 + 11 * (b - 1) + "px",
                width: "10px",
                height: "3px",
                borderRadius: "2px",
                backgroundColor: v
            });
            a.appendChild(this.mm)
        }
        e.browserDocumentOrDie();
        var q = h.isProbablyIE(6, !0),
        p = a("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALDwAACw8BkvkDpQAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuN6eEncwAAAQDSURBVFhH7ZZtaJVlGMet1IpcgZHVF6XQCAJBxVkUEeGG7KzlS8xe9PiyM888vnBg7gyXExbOkmDH3M7mmmVDK9nOKJ2bw41UfJ3tKCgOF80PRUUvREQQZNvd7/9wP3US5vN4Zh8CBz/uc3au+3/9n+u5X64xY279/Z8r0Hn+zXGQDWGogRbohuNwFNqhCabftOdEbAK8BltgLzRbkozH4ApchSE4CE/dlOQITYZqWAUTXdGSd0smQR6UQR20RHatPrz+/chJPidhJ1TAQph8w2ZIlmXL+wvjLAkgNAPegjdgAUyDh+BReAZC0AAXYRiM5U/GJpjgywgJp8KXYCDOxBzotWIhifz0fVUWPAshSyljHbRA8+XByo8/ORk719xTumff0Q1P+EqsIBLeCZdtcrOlrfQz92miuyM9iEfhNPwOG+HedHG+T4IF0AQ/goFhuARvQ/Z1zZC40E2++1iFWdawzCljuLHIdJ2NSkiCotjrqYgZB/Ohy5r4gzGlio04l+RVroGK1mJTWFuIgbBZmSgw3Z+vd5MPInKbl4FrKnMfc8Z7ziH5q66B2L4ikx/PN8HEYrOiLs/s7FzuGvjUUyjTAJKPh/Mykegucwzkx+eZxe/kmlB9wFz8olwmzmSq72seyR+GlEys2xPEQMDk1TxnCuLPm5KmfHNhoHwIE4/5Ess0yO6GzQf6qn+NNC81gZocx4R4qXau2d6x5Pi2jkV3Z6rve55Ov/bU1opNyVXfvLB97t8mZOSVhrzv4l3RGDH3+BbMNFBro3p/JLhwR06/WwmNMrW5LfzDwdTWTelHdaZ5POd19K65q7Zz6YlFO/6phl7PGl6TXhcmKvX6PIVGE8ACfDzVXzZU3BhwFqYqoYWqBWu3cJ8W8mhyeM7FRN+5/jJTlAg4W1RbVVtWW9ea0Fb2Png8M40QgIEOHcm17UHnkAomXnYM6PByDzIdar70ERrrK9AGEX87fC0Dh3rXcky/6NwXOrY3thSnG6gaUZfJy+Ew/Ay6JFohF+7wMkPMOvdS6jwTvRpuDDkGdHHpAkurQOH1DIxFZB7o2vzKFWT8FuqhAB645kK5n/9VwW/W/Iq1763usn3CMFf3kbTkAze0Gw71ls/+6MiG5IFTsUsDVyqTJPgQNKrJULOhxkNVywZnm5G4yCY/y5hLQjWoqoCamWlelXR+V5tk2yW1TW4LpXbqAtTbJE8zPgIPwlSYD2rLtsFM6ZBwJqh9i8O/mhS/RqYgpgbydWiENjWYNJrdfG6FBMQgICOuqE4/UMOqxnWKr2ReQQg9Cert1WKr1R4E9fut8IFFrbla9CWQ5aXp+3fEpsMuUG+vRSV6bHKVtwTmwH93yPh2eytwFBX4C/nwkj6r2tmsAAAAAElFTkSuQmCC"),
        t = a("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALDgAACw4BQL7hQQAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAD00lEQVRYR+2WWWhUVxzG1bq0aBQsbi+KoiIIgpbGFsW3SmlB1AcfVEQxLi9CFjohZt/IIlRCJqNmAnGIEsjEENCEyczEKCpGM9rEYqlQ81BpCy2IlEJBTa6/73JOSYV4rxP7UHDgx5lkzvm+7557lv+0ae8//+cZGBgYmAWZcAy+hQ5IwA24BpchDBve2XMiNg/2QRVcgIihk/Y6jMILGIMr8Pk7MUdoOVTDUVhoRaurqxfDV/ANBKGjpqYmXldXd4vvnXAWTsJuWP7WYTDLMNP7jPYTCSC0EWqhAnbBGlgKq2ArZMEZ+B7GwTG8pA3DPF9BMFwNP4EDpxn4BdwxYlkSGR0dzYBtkGXIow1CB0SGh4fbe3p67kej0bbu7u71vozVCcM58KMxd5qbm6/ap6mvr08ing234W8ogPkTxfl7MeyCMPwBDozDQzgFmW8Mg/Eea97V1eWUlpa601hZWenE43EJSVAc8Xoq+syCnRAzIZ7T3tOMTToW83IbIBgMOgUFBW6A4uJiJ5FIWPPHiEz3CvDazCxgzGzPMZjvtQEaGhqcvLw817yoqMhpa2uzAbo9hdLtgPls+E4h2tvb3QC5ublOfn6+U1JS4qRSKYUYTFff1zjMl8E9hWDhuSGys7PdIBUVFc7Q0NAYIdb6Eku3k9kNJclk8s/a2lonJyfHDSE0G62trTdaWlo+Slff9zidfv39/Sebmpp+sTNhgxQWFv7GugjQZ65vwXQ7am2Ew+EDgUDgBxtArUKFQqHfCVk08ahO18dzXCwW+zASidwkyD+vRK+HO8DR6yJEsV6fp9BUOrAA1w0ODo6VlZW5C9POhBas2cIpLeSpeHiOJUSKEO4ZoUWpIHod2romhLay98Hj6TRJBwL06EhmN7iHlIIogA4ve5DpUPOlj9BMXx1NJ/rPgCcK0NfX55rruNax3djYODFA+aS6DD4IcXgKuiSisB0+8ApDnxP2UmJRvqiqqnID6OLSBTZhBva8KcBMRL4EXZs/W0HaXyEEO2DRaxfKx/yvHP4y4Q9xSMVMnTDO1Y23W0OIR2+1G7hqPyV9Z29v78ORkZFODC6CWhUZKjZUeGjWMsHdZhgfNuZ3abdjqAJV5ipm1njNpPu7yiRTLqlssiWUyqkHEDImW2hXwhJYDTtBZVkdbJIOhptA5dtp+FeR4jfICsRUQBbCObikApNCM8H3KDRBAL5WECuK2UJQwarCdYUvM69OCH0Gqu1VYqvUfgyq96Nw3qDSXCX6fsjw0vT9O2IboAVU29tP0phreo/DZvjvDhnfad93nMIMvAIArtySMI7UCwAAAABJRU5ErkJggg\x3d\x3d"),
        u = a("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALDgAACw4BQL7hQQAAABp0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuMTAw9HKhAAAECElEQVRYR+2WX2hbZRjGp9uq4qqguOnNhrKJIAycWJWJdw5RkM2LXaiIYnXeCMLYwLkJFQeK4G5mVOqFQ0VoK+iyxJg2bZrEpK3LRpqky9iyLq3705b9UcSBs/38PWffGWfV5JxOxxC8+PGlzTnv++T9vvf9nnmhUGje1eSqJtcP/28LqE3tWwgtsAE+gA7ohjQkIQztsLLeNs+5AgRbBM/CO/AF7LJ0sfbDETgP07AHHm50xgILINBS2A6vwC1u0P6R/sXwBGyCndCRGknFMwdSP/C5Cz6GLfA0LJ0txlcAyZptec+y3q8ABLoP3oW3YR2sgNvhLngEWuEjKMIMGMsfrO2wyBXSUAAJl8NhMLCDFx+DQRusVUHO/fZjMzwKrZaNrDuhA3ad+XnoqyMncvsqP2U/P3Qse2/gCpDwOqjY5CZfzfa6vyZTSfUQ/HXIwTl4A27yBufvxbAO2mEKDMxAGd6HloZtSOL1bvLK8QGTKCUulLHcZ8YmMgqkgOJlv0HGMwthLcSsiN9Z86pY3S0geZsrYKCaNPFi3BHQV4qa8cmMm7xKkGv8BMyqzM280+R7Bkj+jCsgd6jPRAtRqhA3vcWIKdd6XQHfzCX53z3bqAJNCNgvEaXxrCMgWthj4sNhqhAxp87mJGLgiglQYJLfAXmJSB9MICBiIoVvWXezHVFz6kxuGhF3/xMRQeaAuuGt0cn8L6lKAgFhR4T4vrjbFGo96f212A2XK8JXgBtY0+/oVH7LYDV5TBVwRWjtLkVOFMYym3nmxrkKCSzAI6QpP5p6PjYcHvGKkKihav8kIrd6R7WfoDkLuChkInV9sZbIxIa91QgbbZO2CxHbNMyumAA7hu+ZOp2dTpYjzsG8cEAjzoG1LbxXB/lfuQ3rBaEL9iLCaU21qFpVLavWtSLUyhcHT+C7wK907vcIiGgkF48mnCGVKHU7AjS83EGmoVYv3iVngEALgia2W3At74xLQG0iTRW+c8a1xvbA4aRXQFtdAbz8AsThNOiS6IQ1MN9PDM+85l5KtZOZ87qoJEAXly4wTwXWNxKwgCCPg67NMc8td5zPIXgKbpt1odzK/9rgVyv+xfSBVMz6hBmu7j5P8oONuuEvbVibyD2AcegaPZkrYya6SPAlaJXJkNmQ8VDVWsBpMxK/ZJMPsa4hoQyqKiAzsyJQF8gmWbsk2+RaKNmpYQjZJKtZ74QlsBzWgmzZe7DK3h+rSCr7tgMuMSmBbkMCLQMZyDfhE/haBhOj2c3nTvgQNsOTEuId1SSUYZVxXeZ3ftzv/TzhQwSTt5fFltWugvx+J3xmkTWXRX8OmoMm9hVAsJXwKcjb61CJHptc5X0VHoS6QyaImMu+C4IED/LM/wL+BDxNDVItZyFPAAAAAElFTkSuQmCC"),
        r = !1,
        z = l("no", "left", "right"),
        x = l("dyna", "open", "closed");
        f.prototype = {
            getDomNode: function() {
                return this.gb
            },
            Nw: function(a) {
                this.Hb = t.cloneNode(!0);
                a.appendChild(this.Hb);
                if (!r && 32 != this.Hb.height && h.isProbablyIE(7)) {
                    a.removeChild(this.Hb);
                    var b = k("div");
                    m(b, {
                        textAlign: "center",
                        textOverflow: "ellipsis",
                        fontFamily: "Arial, Helvetica, sans-serif",
                        fontSize: "10px",
                        color: "#333333",
                        verticalAlign: "middle",
                        paddingTop: "3px",
                        width: "32px",
                        height: "32px",
                        display: "none"
                    });
                    b.innerHTML = "Net\x3cbr/\x3eState";
                    t = p = u = b;
                    r = !0;
                    this.Hb = t.cloneNode(!0);
                    a.appendChild(this.Hb)
                }
                this.Ze = p.cloneNode(!0);
                a.appendChild(this.Ze);
                this.Sq = u.cloneNode(!0);
                a.appendChild(this.Sq)
            },
            Ak: function() {
                if (!this.ready) {
                    var a = document.getElementsByTagName("body");
                    if (a && 0 != a.length) a[0].appendChild(this.gb),
                    this.ready = !0;
                    else {
                        var b = this;
                        d.addEvent(document, "DOMContentLoaded",
                        function() {
                            document.getElementsByTagName("body")[0].appendChild(b.gb);
                            b.ready = !0;
                            if (b.Jk) b.onStatusChange(b.Jk);
                            0 == b.Md ? b.qj() : b.cl()
                        })
                    }
                }
            },
            onListenStart: function(a) {
                q || (this.onStatusChange(a.Gb()), this.Ic = a)
            },
            onListenEnd: function() {
                q || (this.Qb(v, v, v, "Ready", "DATA STREAMING"), this.Ic = null)
            },
            Qb: function(a, b, c, d, e, f) {
                this.RA.Rk(a);
                this.BA.Rk(b);
                this.Gx.Rk(c);
                this.statusText.innerHTML = d;
                this.ql.innerHTML = e;
                this.Rs(f, !0)
            },
            Rs: function(a, b) {
                b && this.xA();
                this.Vs && (this.Vs.style.display = "none");
                a.style.display = "";
                this.Vs = a
            },
            xA: function() {
                this.Gk && (this.Fk = !1, b.stopRepetitiveTask(this.Gk), this.Gk = null)
            },
            Fs: function() {
                this.Gk = b.addRepetitiveTask(this.Nu, 500, this)
            },
            Nu: function() {
                this.Rs(this.Fk ? this.Hb: this.Ze);
                this.Fk = !this.Fk
            },
            onStatusChange: function(a) {
                if (!this.ready || q) this.Jk = a;
                else {
                    var b = this.Ic && (this.Ic.df && this.Ic.df() || this.Ic.xu && this.Ic.xu.df()),
                    d = b ? D: B,
                    b = b ? "DATA STREAMING": "DATA STREAMING (attached)";
                    if (a == c.Ub) this.Qb(v, v, v, "Disconnected", "DATA STREAMING", this.Hb);
                    else if (a == c.CONNECTING) this.Qb(v, v, d, "Connecting...", b, this.Hb),
                    this.Fs();
                    else if (0 == a.indexOf(c.Ea)) {
                        var e = this.Ic && 0 == this.Ic.jl.qq().indexOf("https") ? "S in ": " in ";
                        a == c.Ea + c.bg ? (this.Qb(B, B, d, "Connected Stream-sensing...", b, this.Hb), this.Fs()) : a == c.Ea + c.eg ? this.Qb(D, D, d, "Connected over WS" + e + "streaming mode", b, this.Ze) : a == c.Ea + c.se ? this.Qb(B, D, d, "Connected over HTTP" + e + "streaming mode", b, this.Ze) : a == c.Ea + c.ye ? this.Qb(D, B, d, "Connected over WS" + e + "polling mode", b, this.Ze) : a == c.Ea + c.Xc && this.Qb(B, B, d, "Connected over HTTP" + e + "polling mode", b, this.Ze)
                    } else a == c.we ? this.Qb(v, v, d, "Stalled", b, this.Sq) : this.Qb(v, v, d, "Disconnected (will retry)", b, this.Hb)
                }
            },
            qj: function() {
                0 != this.Md && 1 != this.Md && (this.Md = 1, m(this.fb, {
                    visibility: "",
                    opacity: "1",
                    filter: "alpha(opacity\x3d100)"
                }))
            },
            cl: function() {
                2 != this.Md && 3 != this.Md && (this.Md = 3, m(this.fb, {
                    visibility: "hidden",
                    opacity: "0",
                    filter: "alpha(opacity\x3d0)"
                }), this.pinned = !1)
            },
            cw: function() {
                var a = this;
                return function() {
                    a.qj()
                }
            },
            iq: function() {
                var a = this;
                return function() {
                    a.pinned || a.cl()
                }
            },
            Bv: function() {
                var a = this;
                return function() {
                    a.tu()
                }
            },
            tu: function() {
                this.pinned ? this.cl() : (this.pinned = !0, this.qj())
            },
            zw: function() {
                return function() {}
            }
        };
        var D = "#709F70",
        B = "#ECE981",
        v = "#135656";
        n.prototype.Rk = function(a) {
            m(this.mm, {
                backgroundColor: a
            })
        };
        f.prototype.onStatusChange = f.prototype.onStatusChange;
        f.prototype.onListenStart = f.prototype.onListenStart;
        f.prototype.onListenEnd = f.prototype.onListenEnd;
        f.prototype.getDomNode = f.prototype.getDomNode;
        return f
    });
    define("SimpleLogLevels", [],
    function() {
        var e = {
            FATAL: 5,
            ERROR: 4,
            WARN: 3,
            INFO: 2,
            DEBUG: 1
        },
        g = {
            priority: function(d) {
                return e[d] || 0
            }
        };
        g.priority = g.priority;
        return g
    });
    define("SimpleLogger", ["SimpleLogLevels"],
    function(e) {
        function g(d, c) {
            this.Tg = d;
            this.qg = c;
            this.rf = "DEBUG"
        }
        g.prototype = {
            fatal: function(d) {
                this.isFatalEnabled() && this.Tg.dispatchLog(this.qg, "FATAL", d)
            },
            isFatalEnabled: function() {
                return e.priority("FATAL") >= e.priority(this.rf)
            },
            error: function(d) {
                this.isErrorEnabled() && this.Tg.dispatchLog(this.qg, "ERROR", d)
            },
            isErrorEnabled: function() {
                return e.priority("ERROR") >= e.priority(this.rf)
            },
            warn: function(d) {
                this.isWarnEnabled() && this.Tg.dispatchLog(this.qg, "WARN", d)
            },
            isWarnEnabled: function() {
                return e.priority("WARN") >= e.priority(this.rf)
            },
            info: function(d) {
                this.isInfoEnabled() && this.Tg.dispatchLog(this.qg, "INFO", d)
            },
            isInfoEnabled: function() {
                return e.priority("INFO") >= e.priority(this.rf)
            },
            debug: function(d) {
                this.isDebugEnabled() && this.Tg.dispatchLog(this.qg, "DEBUG", d)
            },
            isDebugEnabled: function() {
                return e.priority("DEBUG") >= e.priority(this.rf)
            },
            setLevel: function(d) {
                this.rf = e.priority(d) ? d: "DEBUG"
            }
        };
        g.prototype.fatal = g.prototype.fatal;
        g.prototype.isFatalEnabled = g.prototype.isFatalEnabled;
        g.prototype.error = g.prototype.error;
        g.prototype.isErrorEnabled = g.prototype.isErrorEnabled;
        g.prototype.warn = g.prototype.warn;
        g.prototype.isWarnEnabled = g.prototype.isWarnEnabled;
        g.prototype.info = g.prototype.info;
        g.prototype.isInfoEnabled = g.prototype.isInfoEnabled;
        g.prototype.debug = g.prototype.debug;
        g.prototype.isDebugEnabled = g.prototype.isDebugEnabled;
        g.prototype.setLevel = g.prototype.setLevel;
        return g
    });
    define("SimpleLoggerProvider", ["SimpleLogger", "SimpleLogLevels"],
    function(e, g) {
        function d() {
            this.Oa = [];
            this.mf = {}
        }
        d.prototype = {
            fj: function() {
                var c = 100,
                b = 0;
                if (0 < this.Oa.length) {
                    for (var d = 0; d < this.Oa.length; d++) g.priority(this.Oa[d].getLevel()) < c && (c = g.priority(this.Oa[d].getLevel()), b = d);
                    return this.Oa[b].getLevel()
                }
                return null
            },
            ln: function(c) {
                for (var b in this.mf) this.mf[b].setLevel(c)
            },
            iu: function(c, b) {
                var d = [];
                if ("*" === c.getCategoryFilter()) return ! 0;
                for (var d = c.getCategoryFilter().split(" "), f = 0; f < d.length; f++) if (d[f] == b) return ! 0;
                return ! 1
            },
            addLoggerAppender: function(c) {
                c && c.log && c.getLevel && (this.Oa.push(c), c.setLoggerProvider && c.setLoggerProvider(this));
                this.ln(this.fj())
            },
            removeLoggerAppender: function(c) {
                for (var b = 0; b < this.Oa.length; b++) if (this.Oa[b] === c) {
                    this.Oa.splice(b, 1);
                    this.ln(this.fj());
                    break
                }
            },
            Mp: function() {
                this.ln(this.fj())
            },
            getLogger: function(c) {
                this.mf[c] || (this.mf[c] = new e(this, c), 0 < this.Oa.length && this.mf[c].setLevel(this.fj()));
                return this.mf[c]
            },
            dispatchLog: function(c, b, d) {
                var f;
                f = "undefined" != typeof window ? window.name: "";
                var a = 0,
                e = new Date,
                a = e.getHours();
                10 > a && (f += "0");
                f = f + a + ":";
                a = e.getMinutes();
                10 > a && (f += "0");
                f += a;
                f += ":";
                a = e.getSeconds();
                10 > a && (f += "0");
                f += a;
                f += ",";
                f += e.getMilliseconds();
                a = g.priority(b);
                for (e = 0; e < this.Oa.length; e++) g.priority(this.Oa[e].getLevel()) <= a && this.iu(this.Oa[e], c) && this.Oa[e].log(c, b, d, f)
            }
        };
        d.prototype.addLoggerAppender = d.prototype.addLoggerAppender;
        d.prototype.removeLoggerAppender = d.prototype.removeLoggerAppender;
        d.prototype.getLogger = d.prototype.getLogger;
        d.prototype.dispatchLog = d.prototype.dispatchLog;
        return d
    });
    define("SimpleLogAppender", ["SimpleLogLevels"],
    function(e) {
        function g(d, c) {
            this.sm = e.priority(d) ? d: "INFO";
            this.Ro = c || "*";
            this.tm = null
        }
        g.prototype = {
            setLoggerProvider: function(d) {
                d && d.getLogger && d.Mp && (this.tm = d)
            },
            log: function() {},
            composeLine: function(d, c, b, e) {
                return d + " | " + c + " | " + e + " | " + b
            },
            getLevel: function() {
                return this.sm
            },
            setLevel: function(d) {
                this.sm = d = e.priority(d) ? d: "INFO";
                null != this.tm && this.tm.Mp()
            },
            getCategoryFilter: function() {
                return this.Ro
            },
            setCategoryFilter: function(d) {
                this.Ro = d || "*"
            }
        };
        g.prototype.log = g.prototype.log;
        g.prototype.setLoggerProvider = g.prototype.setLoggerProvider;
        g.prototype.composeLine = g.prototype.composeLine;
        g.prototype.getLevel = g.prototype.getLevel;
        g.prototype.setLevel = g.prototype.setLevel;
        g.prototype.getCategoryFilter = g.prototype.getCategoryFilter;
        g.prototype.setCategoryFilter = g.prototype.setCategoryFilter;
        return g
    });
    define("BufferAppender", ["Inheritance", "SimpleLogAppender", "SimpleLogLevels"],
    function(e, g, d) {
        function c(b, d, f) {
            this._callSuperConstructor(c, [b, d]);
            this.yq = !f || 0 > f ? 0 : f;
            this.first = 0;
            this.kf = -1;
            this.buffer = {}
        }
        c.prototype = {
            reset: function() {
                this.first = 0;
                this.kf = -1;
                this.buffer = {}
            },
            extractLog: function(b) {
                res = this.getLog(null, b);
                this.reset();
                return res
            },
            getLog: function(b, c, f) {
                var a = "";
                b ? (b = this.kf - b + 1, b < this.first && (b = this.first)) : b = this.first;
                c = c || "\n";
                for (f = d.priority(f || "DEBUG"); b <= this.kf;) d.priority(this.buffer[b].level) >= f && (a += this.buffer[b].Ox),
                a += c,
                b++;
                return a
            },
            log: function(b, c, d, a) {
                var e = ++this.kf;
                0 != this.yq && e >= this.yq && (this.buffer[this.first] = null, this.first++);
                d = this.composeLine(b, c, d, a);
                this.buffer[e] = {
                    level: c,
                    Ox: d
                }
            },
            getLength: function() {
                return this.kf - this.first + 1
            }
        };
        c.prototype.reset = c.prototype.reset;
        c.prototype.getLog = c.prototype.getLog;
        c.prototype.extractLog = c.prototype.extractLog;
        c.prototype.log = c.prototype.log;
        c.prototype.getLength = c.prototype.getLength;
        e(c, g);
        return c
    });
    define("AlertAppender", ["Inheritance", "SimpleLogAppender", "BufferAppender", "Executor", "Environment"],
    function(e, g, d, c, b) {
        function h(b, a, c) {
            this._callSuperConstructor(h, [b, a]);
            this.Eo = !c || 0 > c ? 5 : c;
            this.zk = 0;
            this.buffer = new d(b, a)
        }
        b.browserDocumentOrDie();
        h.prototype = {
            pA: function(b) {
                alert(b)
            },
            log: function(b, a, e, g) {
                this.zk++;
                this.buffer.log(b, a, e, g);
                this.zk >= this.Eo && (this.zk = 0, c.addTimedTask(this.pA, 0, this, [this.buffer.getLog(this.Eo, "\n", "", !1, this.sm)]), this.buffer = new d)
            }
        };
        h.prototype.log = h.prototype.log;
        e(h, g);
        return h
    });
    define("ConsoleAppender", ["Inheritance", "SimpleLogAppender", "IllegalStateException"],
    function(e, g, d) {
        function c(b, e) {
            if ("undefined" == typeof console) throw new d("This appender can't work if a console is not available. Enable the Browser console if possible or change appender.");
            this._callSuperConstructor(c, [b, e])
        }
        c.prototype = {
            log: function(b, c, d, a) {
                d = this.composeLine(b, c, d, a);
                switch (c) {
                case "DEBUG":
                    if (console.debug) {
                        console.debug(d);
                        return
                    }
                    break;
                case "INFO":
                    if (console.info) {
                        console.info(d);
                        return
                    }
                    break;
                case "WARN":
                    if (console.warn) {
                        console.warn(d);
                        return
                    }
                default:
                    if (console.error) {
                        console.error(d);
                        return
                    }
                }
                console.log(d)
            }
        };
        c.prototype.log = c.prototype.log;
        e(c, g);
        return c
    });
    define("DOMAppender", ["Inheritance", "SimpleLogAppender", "IllegalArgumentException", "Environment"],
    function(e, g, d, c) {
        function b(c, f, a) {
            this._callSuperConstructor(b, [c, f]);
            if (!a) throw new d("a DOMElement instance is necessary for a DOMAppender to work.");
            this.qc = a;
            this.Da = this.xm = !1
        }
        c.browserDocumentOrDie();
        b.prototype = {
            setUseInnerHtml: function() {
                this.Da = !0 === useInner
            },
            setNextOnTop: function(b) {
                this.xm = !0 === b
            },
            log: function(b, c, a, d) {
                b = this.composeLine(b, c, a, d);
                this.Da ? this.qc.innerHTML = this.xm ? b + "\x3cbr\x3e" + this.qc.innerHTML: this.qc.innerHTML + (b + "\x3cbr\x3e") : this.xm ? (b = document.createTextNode(b), c = document.createElement("br"), this.qc.insertBefore(c, this.qc.firstChild), this.qc.insertBefore(b, this.qc.firstChild)) : (b = document.createTextNode(b), c = document.createElement("br"), this.qc.appendChild(b), this.qc.appendChild(c))
            }
        };
        b.prototype.setUseInnerHtml = b.prototype.setUseInnerHtml;
        b.prototype.setNextOnTop = b.prototype.setNextOnTop;
        b.prototype.log = b.prototype.log;
        e(b, g);
        return b
    });
    define("FunctionAppender", ["Inheritance", "SimpleLogAppender"],
    function(e, g) {
        function d(c, b, e, f) {
            this._callSuperConstructor(d, [c, b]);
            this.rv = e;
            this.ey = f || null
        }
        d.prototype = {
            log: function(c, b, d, f) {
                var a = this.rv;
                if (a.apply) {
                    c = this.composeLine(c, b, d, f);
                    try {
                        a.apply(this.ey, [c])
                    } catch(e) {}
                }
            }
        };
        d.prototype.log = d.prototype.log;
        e(d, g);
        return d
    });
    define("RemoteAppender", ["Inheritance", "BufferAppender", "Executor", "IllegalArgumentException", "SimpleLogLevels"],
    function(e, g, d, c) {
        function b(d, f, a) {
            this._callSuperConstructor(b, [d, f, 10]);
            this.waiting = !1;
            if (!a) throw new c("a LightstreamerClient instance is necessary for a RemoteAppender to work.");
            this.po = a
        }
        b.prototype = {
            log: function(c, f, a, d) {
                this._callSuperMethod(b, "log", [c, f, a, d]);
                this.so(!0)
            },
            so: function(b) {
                if (! (0 >= this.getLength())) {
                    if (0 == this.po.Gb().indexOf("CONNECTED")) {
                        var c = this.dv();
                        if (this.po.qh(c)) {
                            this.reset();
                            this.waiting = !1;
                            return
                        }
                    }
                    this.waiting && b || (this.waiting = !0, d.addTimedTask(this.so, 2E3, this))
                }
            },
            dv: function(c, f) {
                var a = this._callSuperMethod(b, "extractLog", ["LS_log"]),
                a = a.split("LS_log");
                f = "LS_log";
                for (var d = {},
                e = 0; e < a.length; e++) 0 != a[e].length && (d[f + (e + 1)] = encodeURIComponent(a[e].replace(/[\n\r\f]/g, "||")));
                return d
            },
            extractLog: function() {
                return null
            }
        };
        b.prototype.extractLog = b.prototype.extractLog;
        b.prototype.log = b.prototype.log;
        e(b, g, !1, !0);
        return b
    });
    define("LogMessages", ["LoggerManager"],
    function(e) {
        function g() {}
        var d = [],
        d = "New value for setting received from API{New value for setting received from internal settings{Broadcasting setting to shared LightstreamerClient instances{Setting changed, firing notification{Unexpectedly missing session id{Bind request generated{Create request generated{Destroy request generated{Force rebind request generated{Path selected{Subscribing subscription{Unsubscribing subscription{sending Subscription to the engine{Restoring all pending Subscriptions{Pausing active Subscription{Pausing all active Subscriptions{Unexpected message outcome sequence{Changing reference session{Command phase check{Unexpected command received, ignoring{Client or session unexpectedly disappeared while handling subscription{There is probably another web application connected to the same Lightstreamer Server within this browser instance. That could prevent the current application from connecting to the Server. Please close the other application to unblock the current one{New client attached to engine{Dismissing client{Can't find subscription anymore{Can't find page anymore{Notify back to the client that the subscription was handled{It has been detected that the JavaScript engine of this browser is not respecting the timeouts in setTimeout method calls. The Client has been disconnected from the Server in order to avoid reconnection loops. To try again, just refresh the page.{Unexpected openSocket call{Unexpected WebSocket _load call{Open path is disappeared{Unexpected send outcome while websocket is ready-to-send{Closing WebSocket connection{Error closing WebSocket connection{Error opening WebSocket connection{timeout on WS open{error on closing a timed out WS{Preparing to bind on WebSocket connection{Sending data over WebSocket{Error sending data over WebSocket{New data received on connection opened using WebSocket{Error on WebSocket connection{WebSocket connection ready{WebSocket connection close event received{Unexpected phase during binding of session{Unexpected phase during slow handling{Unexpected timeout event while session is _OFF{Unexpected error event while session is an non-active status{Unexpected loop event while session is an non-active status{Unexpected push event while session is an non-active status{Unexpected phase after create request sent{Unexpected phase after bind request sent{Unexpected phase during OK execution{Unexpected empty start time{Unexpected session id received on bind OK{Opening new session{Binding session{Closing session{Sending request to the server to force a rebind on the current connection{Sending request to the server to destroy the current session{Mad timeouts? Avoid connection{Opening on server, send destroy{Binding session{Switch requested{Slow requested{Session shutdown{Make pause before next bind{Timeout event{Synch event received{Available bandwidth event received{Error41 event received{Keepalive event received{OK event received{Loop event received{End event received{Closing connection opened using CORS-XHR{Error non closing connection opened using CORS-XHR{Sending request using CORS-XHR{Error opening connection using CORS-XHR{New data received on connection opened using CORS-XHR{Connection opened using CORS-XHR completed{Error reading CORS-XHR status{Closing connection opened using XDomainRequest{Error non closing connection opened using XDomainRequest{Sending request using XDomainRequest{Error opening connection using XDomainRequest{Error on connection opened using XDomainRequest{New data received on connection opened using XDomainRequest{Connection opened using XDomainRequest completed{Closing connection opened using html form; actually doing nothing{Sending request using html form{Error while sending request using html form{Closing connection opened using replace on forever-frame{Sending request using replace on forever-frame{Error while sending request using  replace on forever-frame{Loading XHR frame to perform non-cross-origin requests{Client is offline, will retry later to load XHR frame{XHR frame loaded{XHR frame loading timeout expired, try to reload{XHR frame loading timeout expired again, will not try again{Passing request to the XHR frame{Error passing request to the XHR frame{Sending request using XHR{Closing connection opened using XHR{Error closing connection opened using XHR{Error reading XHR status{XHR response complete{Error on connection opened using XHR{Error on disposing XHR's callback{Error on disposing XHR{Streaming enabled on XHR{New data received on connection opened using XHR{XHR response complete{Error opening connection using JSONP technique{Sending request using JSONP technique{Closing connection opened using JSONP technique{Verify if a connection class is appropriate{This class is not available on the current environment{Cross-origin request is needed, this class is not able to make cross-origin requests{Cookies on request are required, this class can't guarantee that cookies will be actually sent{Cross-protocol request is needed, this class is not able to make cross-protocol requests{Extra headers are given, this class is not able to send requests containing extra headers{This class can't be used in the current context{This class is good{Searching for an appropriate connection class{Restart connection selector{Unable to use available connections to connect to server{Client is offline, delaying connection to server{Connection request generated{Connection currently unavailable, delaying connection{Connection open to the server{Unexpected ws phase while opening connection{Unexpected ws phase during binding{Unexpected phase for an clean end of a WS{Unexpected connection error on a connection that was not yet open{can't be unable-to-open since the connection is already open{A control link was received while earlyWSOpenEnabled is set to true, a WebSocket was wasted.{Unexpected WebSocket failure{Open WebSocket to server{WebSockets currently unavailable, delaying connection{Connection to server bound upon WebSocket{Connection to server open upon WebSocket{WebSocket was broken before it was used{WebSocket was broken while we were waiting the first bind{WebSocket was broken while we were waiting{Sync message received while session wasn't in receiving status{Huge delay detected by sync signals. Restored from standby/hibernation?{Delay detected by sync signals{Sync message received{First sync message, check not performed{No delay detected by sync signals{No delay detected by sync signals{Unexpected request type was given to this batch{Unexpected request type was given to this batch; expecting ADD REMOVE DESTROY or CONSTRAIN{ADD after REMOVE?{Trying to remove by index non-existent request{Trying to remove by key non-existent request{Storing request{Substituting CONSTRAINT or FORCE_REBIND request{Replacing 'second' ADD request with a REMOVE request for the same subscription{REMOVE request already stored, skipping{ADD request for the involved subscription was not yet sent; there is no need to send the related REMOVE request or the original ADD one, removing both{Same session id on different servers, store two different DESTROY requests{Verified duplicated DESTROY request, skipping{Duplicated ADD or CHANGE_SUB request, substitute the old one with the new one{Storing confirmed{Batch handler unexpectedly idle; a batch was waiting{Batch handler unexpectedly not idle; nothing ready to be sent was found{Batch object not null{Unexpected sending outcome{Can't find an appropriate connection to send control batch{Unable to find a connection for control requests, will try again later{A single request size exceeds the \x3crequest_limit\x3e configuration setting for the Server. Trying to send it anyway although it will be refused{Start sending reverse heartbeat to the server{Stop sending reverse heartbeat to the server{New request to be sent to server{Some controls don't need to be sent anymore, keep on dequeing{Delaying control requests; waiting for a connection to become available{Control request sent through HTTP connection{Control request sent through WebSocket, keep on dequeuing{Control requests queue is now empty{Control request got answer{Error from network{Batch length limit changed{Preparing reverse heartbeat{Close current connection if any and applicable{Reset Controls handler status{Enabling control requests over WebSocket now{Disabling control requests over WebSocket now{Still waiting previous control request batch to return{Ready to dequeue control requests to be sent to server{starting dequeuing{Send previously composed batch{Generate and send new batch{Empty batch, exit{Ready to send batch on net, choosing connection{WebSocket should be available, try to send through it{Empty request was generated, exit{Connection for control batch chosen{Empty request for HTTP was generated, exit{Connection failed, will try a different connection{Connection temporarily unavailable, will try later{Ack received for message{OK outcome received{DISCARDED outcome received{DENIED outcome received{ERROR outcome received{Closing message handler{Activating message handler{Preparing message request{Forward prepared message to control handler{No ack was received for a message; forwarding it again to the control handler{Ack received, stopping automatic retransmissions{Ack received, no outcome expected, clean structures{Not waiting for ack, purging{Message handled, clean structures{Message on the net notification{Unexpected error occurred while executing server-sent commands!{Enqueuing received data{Dequeuing received data{Data can't be handled{Unexpected error occurred while executing server-sent commands!{Enqueuing received data{Dequeuing received data{Unexpected fallback type; switching because the current session type cannot be established{Unexpected fallback type; switching because of a slow connection was detected{Unexpected fallback type switching with new session{Unexpected fallback type switching with a force rebind{Unexpected fallback type switching because of a failed force rebind{Can't initiate session, giving up, disabling automatic reconnections{Unable to establish session of the current type. Switching session type{Slow session detected. Switching session type{Setting up new session type{Switching current session type{Slow session switching{Failed to switch session type. Starting new session{Session started{Session bound{Session closed{Discarding update for dismissed page{Received new update{Discarding lost updates notification for dismissed page{Received lost updates event{Discarding end of snapshot notification for dismissed page{Received end of snapshot event{Discarding snapshot clearing notification for dismissed page{Received snapshot clearing event{Received server error event{Received subscription error event{Discarding subscription error notification for dismissed page{Received unsubscription event{Discarding unsubscription notification for dismissed page{Received reconfiguration OK event{Discarding subscription notification for dismissed page{Received subscription event{Received message ack{Received message-ok notification{Received message-deny notification{Received message-discarded notification{Received message-error notification{New control link received{Dismissing current session and stopping automatic reconnections.{Opening a new session and starting automatic reconnections.{Unexpected sharing error{Unexpected dispatching error{Unexpected error on dispatching{Removing wrong address?{SharedStatus remote sharing is ready{SharedStatus local sharing is ready{Started refresh thread{There is a concurrent engine. Close this one{Stopped refresh thread{Engine is probably dying, skip one cookie refresh{Checking status{No engines{Checking shared status to verify if there are similar engines alive{Engine found, no values though{Engine found, not compatible though{Write engine shared status{Found an engine with a newer status{You have Norton Internet Security or Norton\nPersonal Firewall installed on this computer.\nIf no real-time data show up, then you need\nto disable Ad Blocking in Norton Internet\nSecurity and then refresh this page{Trying to attach to a cross-page engine{Exception while trying to attach to a cross-page engine{Cross-page engine not found{Probably blocked popup detected: firefox-safari case{Cross-page engine attached{Verify if the found cross-page engine can be used{can't use found cross-page engine: page is now closed{can't use found cross-page engine: uneffective popup detected, chrome case{problem closing the generated popup{Probably blocked popup detected: opera common case{can't use found cross-page engine: Lightstreamer singleton not available{can't use found cross-page engine: Lightstreamer singleton content unavailable{Ready to use found cross-page engine: looks ok{can't use found cross-page engine: exception throw while accessing it{Skipping already-used cookie{Stop search for an engine{Start search for an engine{No sharing was found, a new sharing will be created{No sharing was found, will keep on searching after a pause{No sharing was found, no sharing will be created, this client will fail{A sharing was found but attaching is disabled, this client will fail{A sharing was found, this will attach to it{A sharing was found, but accordingly with the configuration it will be ignored{valid engine values found, will try to connect to it{invalid values{Found a likely dead engine{Searching for available sharing{local engine found{local engine not found, can't search on other pages because of the current sharing configuration{trying to access engine on other page{cant access reference {check shared storage to find a valid engine{storage inspection complete{no valid engine found{sharing through shared worker{sharing through direct communication{Unexpected missing values in sharing cookie{Skipping not compatible engine{valid engine values found, wait popup-protection timeout{No compatible sharing detected{no valid engine values found, check again in {Forcing preventCrossWindowShare because page is on file:///{A new sharing will be immediately created{No way to obtain a sharing, this client will fail immediately{A sharing will now be searched{no sharing on mourning room?{Page is closing, won't search a new engine{Sharing lost, trying to obtain a new one{Connect requested{Disconnect requested{Executing connect{Executing disconnect{An exception was thrown while executing the Function passed to the forEachChangedField method{An exception was thrown while executing the Function passed to the forEachField method{key and/or command position not correctly configured{Subscription entered the active state{Subscription is now subscribed to{Subscription is not subscribed to anymore{Subscription reset{Subscription waiting to be sent to server{Subscription queued to be sent to server{Subscription is now on hold{Subscription exits the active status; it can now be modified{Subscription request generated{Received position of COMMAND and KEY fields from server{Adapter Set assigned{Selector assigned{Requested Max Frequency assigned{Requested Buffer Size assigned{Snapshot Required assigned{Second level Data Adapter Set assigned{Problem calling event on Flash object{Problem calling event on Flash object{Problem calling event on Flash object{Problem calling event on Flash object{Problem calling event on Flash object{Unable to get the Flash movie object reference{The flash object is unexpectedly disappeared{Notification from the flash object received, the object is still incomplete though; will check again later{Ready to make the bridge{Problem calling event on Flash object{Problem calling event on Flash object{Flash object is ready{Waiting a LightstreamerClient instance to create bridge{Waiting the flash object instance to create bridge{Waiting notification from the flash object to create bridge{Flash object disappeared or not yet found{Flash object disappeared or not yet ready{Flash object disappeared or not yet ready{Preparing subscription for flash{Subscribing subscription for flash{The LightstreamerClient is unexpectedly disappeared{The referenced Subscription does not exist{Unsubscribing subscription for flash{The LightstreamerClient is unexpectedly disappeared{The referenced Subscription does not exist{The referenced Subscription does not exist{The referenced Subscription does not exist{The referenced Subscription does not exist{The referenced Subscription does not exist{Wong length!{Missing from first array{Missing from second array{Wrong  element{Not expecting a NULL{Expecting a different value{Expecting 2 different values{Expecting a valid value{Expecting a not valid value{ASSERT failed{Unexpected{An error occurred while executing an event on a listener{Dispatching event on listeners{Can't remove row that does not exist{Cleaning the model{Removing row{Postpone new update until the current update/remove is completed{Postpone new remove until the current update/remove is completed{Inserting new row{Updating row{Scroll direction is ignored if sort is enabled{Merging this update values with the values of the current update{Filling formatted values in cell{New ChartLine{Clearing ChartLine{Repainting ChartLine{ChartLine re-painted{Calculated Y unit{Y labels generated{Y labels cleared{Y labels now configured{Line style configured{Y axis is now positioned{A DOM element must be provided as an anchor for the chart{Cannot create line. Please declare the Y axis{Chart is now ready to be used{Got double nulls, clear line{Parse html for Chart{Painter configured{Creating a new label for the chart{Drawing line on the chart{New line coordinates{New line was drawn{Repaint All{Calculated X unit{X labels generated{X labels cleared{Got a null, ignore point{Line removed{Cleaned all{X axis is now configured on field{Configuring multiple Y axis{Y axis is now configured on field{removing multiple Y axis{Y axis is now removed{X axis is now positioned{X labels now configured{Exception thrown while executing the iterator Function{Cannot find the scroll element{Can't find value for sort key field{Perform auto-scroll{Calculate number of pages{Unexpected position of row to be wiped".split("{");
        e.resolve = function(c) {
            return c + "] " + d[c]
        };
        g.aw = function(c) {
            return e.resolve(c)
        };
        e.resolve = e.resolve;
        g.getMessage = g.aw;
        return g
    });
} ());