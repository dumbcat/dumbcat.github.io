/* PrismJS 1.20.0
https://prismjs.com/download.html#themes=prism-tomorrow&languages=markup+css+clike+javascript+bash+c+csharp+cpp+erlang+git+haskell+vim&plugins=line-numbers+command-line */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {},
    Prism = function(u) {
        var c = /\blang(?:uage)?-([\w-]+)\b/i,
            n = 0,
            C = {
                manual: u.Prism && u.Prism.manual,
                disableWorkerMessageHandler: u.Prism && u.Prism.disableWorkerMessageHandler,
                util: {
                    encode: function e(n) {
                        return n instanceof _ ? new _(n.type, e(n.content), n.alias) : Array.isArray(n) ? n.map(e) : n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
                    },
                    type: function(e) {
                        return Object.prototype.toString.call(e).slice(8, -1)
                    },
                    objId: function(e) {
                        return e.__id || Object.defineProperty(e, "__id", {
                            value: ++n
                        }), e.__id
                    },
                    clone: function t(e, r) {
                        var a, n, l = C.util.type(e);
                        switch (r = r || {}, l) {
                            case "Object":
                                if (n = C.util.objId(e), r[n]) return r[n];
                                for (var i in a = {}, r[n] = a, e) e.hasOwnProperty(i) && (a[i] = t(e[i], r));
                                return a;
                            case "Array":
                                return n = C.util.objId(e), r[n] ? r[n] : (a = [], r[n] = a, e.forEach(function(e, n) {
                                    a[n] = t(e, r)
                                }), a);
                            default:
                                return e
                        }
                    },
                    getLanguage: function(e) {
                        for (; e && !c.test(e.className);) e = e.parentElement;
                        return e ? (e.className.match(c) || [, "none"])[1].toLowerCase() : "none"
                    },
                    currentScript: function() {
                        if ("undefined" == typeof document) return null;
                        if ("currentScript" in document) return document.currentScript;
                        try {
                            throw new Error
                        } catch (e) {
                            var n = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack) || [])[1];
                            if (n) {
                                var t = document.getElementsByTagName("script");
                                for (var r in t)
                                    if (t[r].src == n) return t[r]
                            }
                            return null
                        }
                    }
                },
                languages: {
                    extend: function(e, n) {
                        var t = C.util.clone(C.languages[e]);
                        for (var r in n) t[r] = n[r];
                        return t
                    },
                    insertBefore: function(t, e, n, r) {
                        var a = (r = r || C.languages)[t],
                            l = {};
                        for (var i in a)
                            if (a.hasOwnProperty(i)) {
                                if (i == e)
                                    for (var o in n) n.hasOwnProperty(o) && (l[o] = n[o]);
                                n.hasOwnProperty(i) || (l[i] = a[i])
                            } var s = r[t];
                        return r[t] = l, C.languages.DFS(C.languages, function(e, n) {
                            n === s && e != t && (this[e] = l)
                        }), l
                    },
                    DFS: function e(n, t, r, a) {
                        a = a || {};
                        var l = C.util.objId;
                        for (var i in n)
                            if (n.hasOwnProperty(i)) {
                                t.call(n, i, n[i], r || i);
                                var o = n[i],
                                    s = C.util.type(o);
                                "Object" !== s || a[l(o)] ? "Array" !== s || a[l(o)] || (a[l(o)] = !0, e(o, t, i, a)) : (a[l(o)] = !0, e(o, t, null, a))
                            }
                    }
                },
                plugins: {},
                highlightAll: function(e, n) {
                    C.highlightAllUnder(document, e, n)
                },
                highlightAllUnder: function(e, n, t) {
                    var r = {
                        callback: t,
                        container: e,
                        selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
                    };
                    C.hooks.run("before-highlightall", r), r.elements = Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)), C.hooks.run("before-all-elements-highlight", r);
                    for (var a, l = 0; a = r.elements[l++];) C.highlightElement(a, !0 === n, r.callback)
                },
                highlightElement: function(e, n, t) {
                    var r = C.util.getLanguage(e),
                        a = C.languages[r];
                    e.className = e.className.replace(c, "").replace(/\s+/g, " ") + " language-" + r;
                    var l = e.parentNode;
                    l && "pre" === l.nodeName.toLowerCase() && (l.className = l.className.replace(c, "").replace(/\s+/g, " ") + " language-" + r);
                    var i = {
                        element: e,
                        language: r,
                        grammar: a,
                        code: e.textContent
                    };

                    function o(e) {
                        i.highlightedCode = e, C.hooks.run("before-insert", i), i.element.innerHTML = i.highlightedCode, C.hooks.run("after-highlight", i), C.hooks.run("complete", i), t && t.call(i.element)
                    }
                    if (C.hooks.run("before-sanity-check", i), !i.code) return C.hooks.run("complete", i), void(t && t.call(i.element));
                    if (C.hooks.run("before-highlight", i), i.grammar)
                        if (n && u.Worker) {
                            var s = new Worker(C.filename);
                            s.onmessage = function(e) {
                                o(e.data)
                            }, s.postMessage(JSON.stringify({
                                language: i.language,
                                code: i.code,
                                immediateClose: !0
                            }))
                        } else o(C.highlight(i.code, i.grammar, i.language));
                    else o(C.util.encode(i.code))
                },
                highlight: function(e, n, t) {
                    var r = {
                        code: e,
                        grammar: n,
                        language: t
                    };
                    return C.hooks.run("before-tokenize", r), r.tokens = C.tokenize(r.code, r.grammar), C.hooks.run("after-tokenize", r), _.stringify(C.util.encode(r.tokens), r.language)
                },
                tokenize: function(e, n) {
                    var t = n.rest;
                    if (t) {
                        for (var r in t) n[r] = t[r];
                        delete n.rest
                    }
                    var a = new l;
                    return M(a, a.head, e),
                        function e(n, t, r, a, l, i, o) {
                            for (var s in r)
                                if (r.hasOwnProperty(s) && r[s]) {
                                    var u = r[s];
                                    u = Array.isArray(u) ? u : [u];
                                    for (var c = 0; c < u.length; ++c) {
                                        if (o && o == s + "," + c) return;
                                        var g = u[c],
                                            f = g.inside,
                                            h = !!g.lookbehind,
                                            d = !!g.greedy,
                                            v = 0,
                                            p = g.alias;
                                        if (d && !g.pattern.global) {
                                            var m = g.pattern.toString().match(/[imsuy]*$/)[0];
                                            g.pattern = RegExp(g.pattern.source, m + "g")
                                        }
                                        g = g.pattern || g;
                                        for (var y = a.next, k = l; y !== t.tail; k += y.value.length, y = y.next) {
                                            var b = y.value;
                                            if (t.length > n.length) return;
                                            if (!(b instanceof _)) {
                                                var x = 1;
                                                if (d && y != t.tail.prev) {
                                                    g.lastIndex = k;
                                                    var w = g.exec(n);
                                                    if (!w) break;
                                                    var A = w.index + (h && w[1] ? w[1].length : 0),
                                                        P = w.index + w[0].length,
                                                        S = k;
                                                    for (S += y.value.length; S <= A;) y = y.next, S += y.value.length;
                                                    if (S -= y.value.length, k = S, y.value instanceof _) continue;
                                                    for (var O = y; O !== t.tail && (S < P || "string" == typeof O.value && !O.prev.value.greedy); O = O.next) x++, S += O.value.length;
                                                    x--, b = n.slice(k, S), w.index -= k
                                                } else {
                                                    g.lastIndex = 0;
                                                    var w = g.exec(b)
                                                }
                                                if (w) {
                                                    h && (v = w[1] ? w[1].length : 0);
                                                    var A = w.index + v,
                                                        w = w[0].slice(v),
                                                        P = A + w.length,
                                                        E = b.slice(0, A),
                                                        N = b.slice(P),
                                                        j = y.prev;
                                                    E && (j = M(t, j, E), k += E.length), W(t, j, x);
                                                    var L = new _(s, f ? C.tokenize(w, f) : w, p, w, d);
                                                    if (y = M(t, j, L), N && M(t, y, N), 1 < x && e(n, t, r, y.prev, k, !0, s + "," + c), i) break
                                                } else if (i) break
                                            }
                                        }
                                    }
                                }
                        }(e, a, n, a.head, 0),
                        function(e) {
                            var n = [],
                                t = e.head.next;
                            for (; t !== e.tail;) n.push(t.value), t = t.next;
                            return n
                        }(a)
                },
                hooks: {
                    all: {},
                    add: function(e, n) {
                        var t = C.hooks.all;
                        t[e] = t[e] || [], t[e].push(n)
                    },
                    run: function(e, n) {
                        var t = C.hooks.all[e];
                        if (t && t.length)
                            for (var r, a = 0; r = t[a++];) r(n)
                    }
                },
                Token: _
            };

        function _(e, n, t, r, a) {
            this.type = e, this.content = n, this.alias = t, this.length = 0 | (r || "").length, this.greedy = !!a
        }

        function l() {
            var e = {
                    value: null,
                    prev: null,
                    next: null
                },
                n = {
                    value: null,
                    prev: e,
                    next: null
                };
            e.next = n, this.head = e, this.tail = n, this.length = 0
        }

        function M(e, n, t) {
            var r = n.next,
                a = {
                    value: t,
                    prev: n,
                    next: r
                };
            return n.next = a, r.prev = a, e.length++, a
        }

        function W(e, n, t) {
            for (var r = n.next, a = 0; a < t && r !== e.tail; a++) r = r.next;
            (n.next = r).prev = n, e.length -= a
        }
        if (u.Prism = C, _.stringify = function n(e, t) {
                if ("string" == typeof e) return e;
                if (Array.isArray(e)) {
                    var r = "";
                    return e.forEach(function(e) {
                        r += n(e, t)
                    }), r
                }
                var a = {
                        type: e.type,
                        content: n(e.content, t),
                        tag: "span",
                        classes: ["token", e.type],
                        attributes: {},
                        language: t
                    },
                    l = e.alias;
                l && (Array.isArray(l) ? Array.prototype.push.apply(a.classes, l) : a.classes.push(l)), C.hooks.run("wrap", a);
                var i = "";
                for (var o in a.attributes) i += " " + o + '="' + (a.attributes[o] || "").replace(/"/g, "&quot;") + '"';
                return "<" + a.tag + ' class="' + a.classes.join(" ") + '"' + i + ">" + a.content + "</" + a.tag + ">"
            }, !u.document) return u.addEventListener && (C.disableWorkerMessageHandler || u.addEventListener("message", function(e) {
            var n = JSON.parse(e.data),
                t = n.language,
                r = n.code,
                a = n.immediateClose;
            u.postMessage(C.highlight(r, C.languages[t], t)), a && u.close()
        }, !1)), C;
        var e = C.util.currentScript();

        function t() {
            C.manual || C.highlightAll()
        }
        if (e && (C.filename = e.src, e.hasAttribute("data-manual") && (C.manual = !0)), !C.manual) {
            var r = document.readyState;
            "loading" === r || "interactive" === r && e && e.defer ? document.addEventListener("DOMContentLoaded", t) : window.requestAnimationFrame ? window.requestAnimationFrame(t) : window.setTimeout(t, 16)
        }
        return C
    }(_self);
"undefined" != typeof module && module.exports && (module.exports = Prism), "undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = {
    comment: /<!--[\s\S]*?-->/,
    prolog: /<\?[\s\S]+?\?>/,
    doctype: {
        pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: !0,
        inside: {
            "internal-subset": {
                pattern: /(\[)[\s\S]+(?=\]>$)/,
                lookbehind: !0,
                greedy: !0,
                inside: null
            },
            string: {
                pattern: /"[^"]*"|'[^']*'/,
                greedy: !0
            },
            punctuation: /^<!|>$|[[\]]/,
            "doctype-tag": /^DOCTYPE/,
            name: /[^\s<>'"]+/
        }
    },
    cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
    tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: !0,
        inside: {
            tag: {
                pattern: /^<\/?[^\s>\/]+/,
                inside: {
                    punctuation: /^<\/?/,
                    namespace: /^[^\s>\/:]+:/
                }
            },
            "attr-value": {
                pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                inside: {
                    punctuation: [{
                        pattern: /^=/,
                        alias: "attr-equals"
                    }, /"|'/]
                }
            },
            punctuation: /\/?>/,
            "attr-name": {
                pattern: /[^\s>\/]+/,
                inside: {
                    namespace: /^[^\s>\/:]+:/
                }
            }
        }
    },
    entity: [{
        pattern: /&[\da-z]{1,8};/i,
        alias: "named-entity"
    }, /&#x?[\da-f]{1,8};/i]
}, Prism.languages.markup.tag.inside["attr-value"].inside.entity = Prism.languages.markup.entity, Prism.languages.markup.doctype.inside["internal-subset"].inside = Prism.languages.markup, Prism.hooks.add("wrap", function(a) {
    "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"))
}), Object.defineProperty(Prism.languages.markup.tag, "addInlined", {
    value: function(a, e) {
        var s = {};
        s["language-" + e] = {
            pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
            lookbehind: !0,
            inside: Prism.languages[e]
        }, s.cdata = /^<!\[CDATA\[|\]\]>$/i;
        var n = {
            "included-cdata": {
                pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                inside: s
            }
        };
        n["language-" + e] = {
            pattern: /[\s\S]+/,
            inside: Prism.languages[e]
        };
        var t = {};
        t[a] = {
            pattern: RegExp("(<__[^]*?>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g, function() {
                return a
            }), "i"),
            lookbehind: !0,
            greedy: !0,
            inside: n
        }, Prism.languages.insertBefore("markup", "cdata", t)
    }
}), Prism.languages.html = Prism.languages.markup, Prism.languages.mathml = Prism.languages.markup, Prism.languages.svg = Prism.languages.markup, Prism.languages.xml = Prism.languages.extend("markup", {}), Prism.languages.ssml = Prism.languages.xml, Prism.languages.atom = Prism.languages.xml, Prism.languages.rss = Prism.languages.xml;
! function(s) {
    var e = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/;
    s.languages.css = {
        comment: /\/\*[\s\S]*?\*\//,
        atrule: {
            pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
            inside: {
                rule: /^@[\w-]+/,
                "selector-function-argument": {
                    pattern: /(\bselector\s*\((?!\s*\))\s*)(?:[^()]|\((?:[^()]|\([^()]*\))*\))+?(?=\s*\))/,
                    lookbehind: !0,
                    alias: "selector"
                }
            }
        },
        url: {
            pattern: RegExp("url\\((?:" + e.source + "|[^\n\r()]*)\\)", "i"),
            greedy: !0,
            inside: {
                function: /^url/i,
                punctuation: /^\(|\)$/
            }
        },
        selector: RegExp("[^{}\\s](?:[^{};\"']|" + e.source + ")*?(?=\\s*\\{)"),
        string: {
            pattern: e,
            greedy: !0
        },
        property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
        important: /!important\b/i,
        function: /[-a-z0-9]+(?=\()/i,
        punctuation: /[(){};:,]/
    }, s.languages.css.atrule.inside.rest = s.languages.css;
    var t = s.languages.markup;
    t && (t.tag.addInlined("style", "css"), s.languages.insertBefore("inside", "attr-value", {
        "style-attr": {
            pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
            inside: {
                "attr-name": {
                    pattern: /^\s*style/i,
                    inside: t.tag.inside
                },
                punctuation: /^\s*=\s*['"]|['"]\s*$/,
                "attr-value": {
                    pattern: /.+/i,
                    inside: s.languages.css
                }
            },
            alias: "language-css"
        }
    }, t.tag))
}(Prism);
Prism.languages.clike = {
    comment: [{
        pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
        lookbehind: !0
    }, {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: !0,
        greedy: !0
    }],
    string: {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0
    },
    "class-name": {
        pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: !0,
        inside: {
            punctuation: /[.\\]/
        }
    },
    keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    boolean: /\b(?:true|false)\b/,
    function: /\w+(?=\()/,
    number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
    punctuation: /[{}[\];(),.:]/
};
Prism.languages.javascript = Prism.languages.extend("clike", {
    "class-name": [Prism.languages.clike["class-name"], {
        pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
        lookbehind: !0
    }],
    keyword: [{
        pattern: /((?:^|})\s*)(?:catch|finally)\b/,
        lookbehind: !0
    }, {
        pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|(?:get|set)(?=\s*[\[$\w\xA0-\uFFFF])|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
        lookbehind: !0
    }],
    number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
    function: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    operator: /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
}), Prism.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/, Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
        pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
        lookbehind: !0,
        greedy: !0
    },
    "function-variable": {
        pattern: /#?[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
        alias: "function"
    },
    parameter: [{
        pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
        lookbehind: !0,
        inside: Prism.languages.javascript
    }, {
        pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
        inside: Prism.languages.javascript
    }, {
        pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
        lookbehind: !0,
        inside: Prism.languages.javascript
    }, {
        pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
        lookbehind: !0,
        inside: Prism.languages.javascript
    }],
    constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
}), Prism.languages.insertBefore("javascript", "string", {
    "template-string": {
        pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
        greedy: !0,
        inside: {
            "template-punctuation": {
                pattern: /^`|`$/,
                alias: "string"
            },
            interpolation: {
                pattern: /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
                lookbehind: !0,
                inside: {
                    "interpolation-punctuation": {
                        pattern: /^\${|}$/,
                        alias: "punctuation"
                    },
                    rest: Prism.languages.javascript
                }
            },
            string: /[\s\S]+/
        }
    }
}), Prism.languages.markup && Prism.languages.markup.tag.addInlined("script", "javascript"), Prism.languages.js = Prism.languages.javascript;
! function(e) {
    var t = "\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b",
        n = {
            environment: {
                pattern: RegExp("\\$" + t),
                alias: "constant"
            },
            variable: [{
                pattern: /\$?\(\([\s\S]+?\)\)/,
                greedy: !0,
                inside: {
                    variable: [{
                        pattern: /(^\$\(\([\s\S]+)\)\)/,
                        lookbehind: !0
                    }, /^\$\(\(/],
                    number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,
                    operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
                    punctuation: /\(\(?|\)\)?|,|;/
                }
            }, {
                pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
                greedy: !0,
                inside: {
                    variable: /^\$\(|^`|\)$|`$/
                }
            }, {
                pattern: /\$\{[^}]+\}/,
                greedy: !0,
                inside: {
                    operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
                    punctuation: /[\[\]]/,
                    environment: {
                        pattern: RegExp("(\\{)" + t),
                        lookbehind: !0,
                        alias: "constant"
                    }
                }
            }, /\$(?:\w+|[#?*!@$])/],
            entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/
        };
    e.languages.bash = {
        shebang: {
            pattern: /^#!\s*\/.*/,
            alias: "important"
        },
        comment: {
            pattern: /(^|[^"{\\$])#.*/,
            lookbehind: !0
        },
        "function-name": [{
            pattern: /(\bfunction\s+)\w+(?=(?:\s*\(?:\s*\))?\s*\{)/,
            lookbehind: !0,
            alias: "function"
        }, {
            pattern: /\b\w+(?=\s*\(\s*\)\s*\{)/,
            alias: "function"
        }],
        "for-or-select": {
            pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
            alias: "variable",
            lookbehind: !0
        },
        "assign-left": {
            pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
            inside: {
                environment: {
                    pattern: RegExp("(^|[\\s;|&]|[<>]\\()" + t),
                    lookbehind: !0,
                    alias: "constant"
                }
            },
            alias: "variable",
            lookbehind: !0
        },
        string: [{
            pattern: /((?:^|[^<])<<-?\s*)(\w+?)\s*(?:\r?\n|\r)[\s\S]*?(?:\r?\n|\r)\2/,
            lookbehind: !0,
            greedy: !0,
            inside: n
        }, {
            pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s*(?:\r?\n|\r)[\s\S]*?(?:\r?\n|\r)\3/,
            lookbehind: !0,
            greedy: !0
        }, {
            pattern: /(^|[^\\](?:\\\\)*)(["'])(?:\\[\s\S]|\$\([^)]+\)|`[^`]+`|(?!\2)[^\\])*\2/,
            lookbehind: !0,
            greedy: !0,
            inside: n
        }],
        environment: {
            pattern: RegExp("\\$?" + t),
            alias: "constant"
        },
        variable: n.variable,
        function: {
            pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
            lookbehind: !0
        },
        keyword: {
            pattern: /(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,
            lookbehind: !0
        },
        builtin: {
            pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,
            lookbehind: !0,
            alias: "class-name"
        },
        boolean: {
            pattern: /(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/,
            lookbehind: !0
        },
        "file-descriptor": {
            pattern: /\B&\d\b/,
            alias: "important"
        },
        operator: {
            pattern: /\d?<>|>\||\+=|==?|!=?|=~|<<[<-]?|[&\d]?>>|\d?[<>]&?|&[>&]?|\|[&|]?|<=?|>=?/,
            inside: {
                "file-descriptor": {
                    pattern: /^\d/,
                    alias: "important"
                }
            }
        },
        punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
        number: {
            pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,
            lookbehind: !0
        }
    };
    for (var a = ["comment", "function-name", "for-or-select", "assign-left", "string", "environment", "function", "keyword", "builtin", "boolean", "file-descriptor", "operator", "punctuation", "number"], r = n.variable[1].inside, s = 0; s < a.length; s++) r[a[s]] = e.languages.bash[a[s]];
    e.languages.shell = e.languages.bash
}(Prism);
Prism.languages.c = Prism.languages.extend("clike", {
    comment: {
        pattern: /\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,
        greedy: !0
    },
    "class-name": {
        pattern: /(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+/,
        lookbehind: !0
    },
    keyword: /\b(?:__attribute__|_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
    function: /[a-z_]\w*(?=\s*\()/i,
    operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/,
    number: /(?:\b0x(?:[\da-f]+\.?[\da-f]*|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)[ful]*/i
}), Prism.languages.insertBefore("c", "string", {
    macro: {
        pattern: /(^\s*)#\s*[a-z]+(?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,
        lookbehind: !0,
        greedy: !0,
        alias: "property",
        inside: {
            string: [{
                pattern: /^(#\s*include\s*)<[^>]+>/,
                lookbehind: !0
            }, Prism.languages.c.string],
            comment: Prism.languages.c.comment,
            directive: {
                pattern: /^(#\s*)[a-z]+/,
                lookbehind: !0,
                alias: "keyword"
            }
        }
    },
    constant: /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/
}), delete Prism.languages.c.boolean;
! function(s) {
    function a(e, s) {
        return e.replace(/<<(\d+)>>/g, function(e, n) {
            return "(?:" + s[+n] + ")"
        })
    }

    function t(e, n, s) {
        return RegExp(a(e, n), s || "")
    }

    function e(e, n) {
        for (var s = 0; s < n; s++) e = e.replace(/<<self>>/g, function() {
            return "(?:" + e + ")"
        });
        return e.replace(/<<self>>/g, "[^\\s\\S]")
    }
    var n = "bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void",
        r = "class enum interface struct",
        i = "add alias and ascending async await by descending from get global group into join let nameof not notnull on or orderby partial remove select set unmanaged value when where where",
        o = "abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield";

    function l(e) {
        return "\\b(?:" + e.trim().replace(/ /g, "|") + ")\\b"
    }
    var d = l(r),
        p = RegExp(l(n + " " + r + " " + i + " " + o)),
        c = l(r + " " + i + " " + o),
        u = l(n + " " + r + " " + o),
        g = e("<(?:[^<>;=+\\-*/%&|^]|<<self>>)*>", 2),
        b = e("\\((?:[^()]|<<self>>)*\\)", 2),
        h = "@?\\b[A-Za-z_]\\w*\\b",
        f = a("<<0>>(?:\\s*<<1>>)?", [h, g]),
        m = a("(?!<<0>>)<<1>>(?:\\s*\\.\\s*<<1>>)*", [c, f]),
        k = "\\[\\s*(?:,\\s*)*\\]",
        y = a("<<0>>(?:\\s*(?:\\?\\s*)?<<1>>)*(?:\\s*\\?)?", [m, k]),
        w = a("(?:<<0>>|<<1>>)(?:\\s*(?:\\?\\s*)?<<2>>)*(?:\\s*\\?)?", [a("\\(<<0>>+(?:,<<0>>+)+\\)", [a("[^,()<>[\\];=+\\-*/%&|^]|<<0>>|<<1>>|<<2>>", [g, b, k])]), m, k]),
        v = {
            keyword: p,
            punctuation: /[<>()?,.:[\]]/
        },
        x = "'(?:[^\r\n'\\\\]|\\\\.|\\\\[Uux][\\da-fA-F]{1,8})'",
        $ = '"(?:\\\\.|[^\\\\"\r\n])*"';
    s.languages.csharp = s.languages.extend("clike", {
        string: [{
            pattern: t("(^|[^$\\\\])<<0>>", ['@"(?:""|\\\\[^]|[^\\\\"])*"(?!")']),
            lookbehind: !0,
            greedy: !0
        }, {
            pattern: t("(^|[^@$\\\\])<<0>>", [$]),
            lookbehind: !0,
            greedy: !0
        }, {
            pattern: RegExp(x),
            greedy: !0,
            alias: "character"
        }],
        "class-name": [{
            pattern: t("(\\busing\\s+static\\s+)<<0>>(?=\\s*;)", [m]),
            lookbehind: !0,
            inside: v
        }, {
            pattern: t("(\\busing\\s+<<0>>\\s*=\\s*)<<1>>(?=\\s*;)", [h, w]),
            lookbehind: !0,
            inside: v
        }, {
            pattern: t("(\\busing\\s+)<<0>>(?=\\s*=)", [h]),
            lookbehind: !0
        }, {
            pattern: t("(\\b<<0>>\\s+)<<1>>", [d, f]),
            lookbehind: !0,
            inside: v
        }, {
            pattern: t("(\\bcatch\\s*\\(\\s*)<<0>>", [m]),
            lookbehind: !0,
            inside: v
        }, {
            pattern: t("(\\bwhere\\s+)<<0>>", [h]),
            lookbehind: !0
        }, {
            pattern: t("(\\b(?:is(?:\\s+not)?|as)\\s+)<<0>>", [y]),
            lookbehind: !0,
            inside: v
        }, {
            pattern: t("\\b<<0>>(?=\\s+(?!<<1>>)<<2>>(?:\\s*[=,;:{)\\]]|\\s+(?:in|when)\\b))", [w, u, h]),
            inside: v
        }],
        keyword: p,
        number: /(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:ul|lu|[dflmu])?\b/i,
        operator: />>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/,
        punctuation: /\?\.?|::|[{}[\];(),.:]/
    }), s.languages.insertBefore("csharp", "number", {
        range: {
            pattern: /\.\./,
            alias: "operator"
        }
    }), s.languages.insertBefore("csharp", "punctuation", {
        "named-parameter": {
            pattern: t("([(,]\\s*)<<0>>(?=\\s*:)", [h]),
            lookbehind: !0,
            alias: "punctuation"
        }
    }), s.languages.insertBefore("csharp", "class-name", {
        namespace: {
            pattern: t("(\\b(?:namespace|using)\\s+)<<0>>(?:\\s*\\.\\s*<<0>>)*(?=\\s*[;{])", [h]),
            lookbehind: !0,
            inside: {
                punctuation: /\./
            }
        },
        "type-expression": {
            pattern: t("(\\b(?:default|typeof|sizeof)\\s*\\(\\s*)(?:[^()\\s]|\\s(?!\\s*\\))|<<0>>)*(?=\\s*\\))", [b]),
            lookbehind: !0,
            alias: "class-name",
            inside: v
        },
        "return-type": {
            pattern: t("<<0>>(?=\\s+(?:<<1>>\\s*(?:=>|[({]|\\.\\s*this\\s*\\[)|this\\s*\\[))", [w, m]),
            inside: v,
            alias: "class-name"
        },
        "constructor-invocation": {
            pattern: t("(\\bnew\\s+)<<0>>(?=\\s*[[({])", [w]),
            lookbehind: !0,
            inside: v,
            alias: "class-name"
        },
        "generic-method": {
            pattern: t("<<0>>\\s*<<1>>(?=\\s*\\()", [h, g]),
            inside: {
                function: t("^<<0>>", [h]),
                generic: {
                    pattern: RegExp(g),
                    alias: "class-name",
                    inside: v
                }
            }
        },
        "type-list": {
            pattern: t("\\b((?:<<0>>\\s+<<1>>|where\\s+<<2>>)\\s*:\\s*)(?:<<3>>|<<4>>)(?:\\s*,\\s*(?:<<3>>|<<4>>))*(?=\\s*(?:where|[{;]|=>|$))", [d, f, h, w, p.source]),
            lookbehind: !0,
            inside: {
                keyword: p,
                "class-name": {
                    pattern: RegExp(w),
                    greedy: !0,
                    inside: v
                },
                punctuation: /,/
            }
        },
        preprocessor: {
            pattern: /(^\s*)#.*/m,
            lookbehind: !0,
            alias: "property",
            inside: {
                directive: {
                    pattern: /(\s*#)\b(?:define|elif|else|endif|endregion|error|if|line|pragma|region|undef|warning)\b/,
                    lookbehind: !0,
                    alias: "keyword"
                }
            }
        }
    });
    var _ = $ + "|" + x,
        B = a("/(?![*/])|//[^\r\n]*[\r\n]|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>", [_]),
        E = e(a("[^\"'/()]|<<0>>|\\(<<self>>*\\)", [B]), 2),
        R = "\\b(?:assembly|event|field|method|module|param|property|return|type)\\b",
        P = a("<<0>>(?:\\s*\\(<<1>>*\\))?", [m, E]);
    s.languages.insertBefore("csharp", "class-name", {
        attribute: {
            pattern: t("((?:^|[^\\s\\w>)?])\\s*\\[\\s*)(?:<<0>>\\s*:\\s*)?<<1>>(?:\\s*,\\s*<<1>>)*(?=\\s*\\])", [R, P]),
            lookbehind: !0,
            greedy: !0,
            inside: {
                target: {
                    pattern: t("^<<0>>(?=\\s*:)", [R]),
                    alias: "keyword"
                },
                "attribute-arguments": {
                    pattern: t("\\(<<0>>*\\)", [E]),
                    inside: s.languages.csharp
                },
                "class-name": {
                    pattern: RegExp(m),
                    inside: {
                        punctuation: /\./
                    }
                },
                punctuation: /[:,]/
            }
        }
    });
    var z = ":[^}\r\n]+",
        S = e(a("[^\"'/()]|<<0>>|\\(<<self>>*\\)", [B]), 2),
        j = a("\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}", [S, z]),
        A = e(a("[^\"'/()]|/(?!\\*)|/\\*(?:[^*]|\\*(?!/))*\\*/|<<0>>|\\(<<self>>*\\)", [_]), 2),
        F = a("\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}", [A, z]);

    function U(e, n) {
        return {
            interpolation: {
                pattern: t("((?:^|[^{])(?:\\{\\{)*)<<0>>", [e]),
                lookbehind: !0,
                inside: {
                    "format-string": {
                        pattern: t("(^\\{(?:(?![}:])<<0>>)*)<<1>>(?=\\}$)", [n, z]),
                        lookbehind: !0,
                        inside: {
                            punctuation: /^:/
                        }
                    },
                    punctuation: /^\{|\}$/,
                    expression: {
                        pattern: /[\s\S]+/,
                        alias: "language-csharp",
                        inside: s.languages.csharp
                    }
                }
            },
            string: /[\s\S]+/
        }
    }
    s.languages.insertBefore("csharp", "string", {
        "interpolation-string": [{
            pattern: t('(^|[^\\\\])(?:\\$@|@\\$)"(?:""|\\\\[^]|\\{\\{|<<0>>|[^\\\\{"])*"', [j]),
            lookbehind: !0,
            greedy: !0,
            inside: U(j, S)
        }, {
            pattern: t('(^|[^@\\\\])\\$"(?:\\\\.|\\{\\{|<<0>>|[^\\\\"{])*"', [F]),
            lookbehind: !0,
            greedy: !0,
            inside: U(F, A)
        }]
    })
}(Prism), Prism.languages.dotnet = Prism.languages.cs = Prism.languages.csharp;
! function(e) {
    var t = /\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char8_t|char16_t|char32_t|class|compl|concept|const|consteval|constexpr|constinit|const_cast|continue|co_await|co_return|co_yield|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|float|for|friend|goto|if|inline|int|int8_t|int16_t|int32_t|int64_t|uint8_t|uint16_t|uint32_t|uint64_t|long|mutable|namespace|new|noexcept|nullptr|operator|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/;
    e.languages.cpp = e.languages.extend("c", {
        "class-name": [{
            pattern: RegExp("(\\b(?:class|enum|struct|typename)\\s+)(?!<keyword>)\\w+".replace(/<keyword>/g, function() {
                return t.source
            })),
            lookbehind: !0
        }, /\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/, /\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i, {
            pattern: /\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/,
            inside: null
        }],
        keyword: t,
        number: {
            pattern: /(?:\b0b[01']+|\b0x(?:[\da-f']+\.?[\da-f']*|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+\.?[\d']*|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]*/i,
            greedy: !0
        },
        operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,
        boolean: /\b(?:true|false)\b/
    }), e.languages.insertBefore("cpp", "string", {
        "raw-string": {
            pattern: /R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,
            alias: "string",
            greedy: !0
        }
    }), e.languages.insertBefore("cpp", "class-name", {
        "base-clause": {
            pattern: /(\b(?:class|struct)\s+\w+\s*:\s*)(?:[^;{}"'])+?(?=\s*[;{])/,
            lookbehind: !0,
            greedy: !0,
            inside: e.languages.extend("cpp", {})
        }
    }), e.languages.insertBefore("inside", "operator", {
        "class-name": /\b[a-z_]\w*\b(?!\s*::)/i
    }, e.languages.cpp["base-clause"])
}(Prism);
Prism.languages.erlang = {
    comment: /%.+/,
    string: {
        pattern: /"(?:\\.|[^\\"\r\n])*"/,
        greedy: !0
    },
    "quoted-function": {
        pattern: /'(?:\\.|[^\\'\r\n])+'(?=\()/,
        alias: "function"
    },
    "quoted-atom": {
        pattern: /'(?:\\.|[^\\'\r\n])+'/,
        alias: "atom"
    },
    boolean: /\b(?:true|false)\b/,
    keyword: /\b(?:fun|when|case|of|end|if|receive|after|try|catch)\b/,
    number: [/\$\\?./, /\d+#[a-z0-9]+/i, /(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i],
    function: /\b[a-z][\w@]*(?=\()/,
    variable: {
        pattern: /(^|[^@])(?:\b|\?)[A-Z_][\w@]*/,
        lookbehind: !0
    },
    operator: [/[=\/<>:]=|=[:\/]=|\+\+?|--?|[=*\/!]|\b(?:bnot|div|rem|band|bor|bxor|bsl|bsr|not|and|or|xor|orelse|andalso)\b/, {
        pattern: /(^|[^<])<(?!<)/,
        lookbehind: !0
    }, {
        pattern: /(^|[^>])>(?!>)/,
        lookbehind: !0
    }],
    atom: /\b[a-z][\w@]*/,
    punctuation: /[()[\]{}:;,.#|]|<<|>>/
};
Prism.languages.git = {
    comment: /^#.*/m,
    deleted: /^[-–].*/m,
    inserted: /^\+.*/m,
    string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,
    command: {
        pattern: /^.*\$ git .*$/m,
        inside: {
            parameter: /\s--?\w+/m
        }
    },
    coord: /^@@.*@@$/m,
    commit_sha1: /^commit \w{40}$/m
};
Prism.languages.haskell = {
    comment: {
        pattern: /(^|[^-!#$%*+=?&@|~.:<>^\\\/])(?:--[^-!#$%*+=?&@|~.:<>^\\\/].*|{-[\s\S]*?-})/m,
        lookbehind: !0
    },
    char: /'(?:[^\\']|\\(?:[abfnrtv\\"'&]|\^[A-Z@[\]^_]|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|\d+|o[0-7]+|x[0-9a-fA-F]+))'/,
    string: {
        pattern: /"(?:[^\\"]|\\(?:[abfnrtv\\"'&]|\^[A-Z@[\]^_]|NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|\d+|o[0-7]+|x[0-9a-fA-F]+)|\\\s+\\)*"/,
        greedy: !0
    },
    keyword: /\b(?:case|class|data|deriving|do|else|if|in|infixl|infixr|instance|let|module|newtype|of|primitive|then|type|where)\b/,
    import_statement: {
        pattern: /((?:\r?\n|\r|^)\s*)import\s+(?:qualified\s+)?(?:[A-Z][\w']*)(?:\.[A-Z][\w']*)*(?:\s+as\s+(?:[A-Z][_a-zA-Z0-9']*)(?:\.[A-Z][\w']*)*)?(?:\s+hiding\b)?/m,
        lookbehind: !0,
        inside: {
            keyword: /\b(?:import|qualified|as|hiding)\b/
        }
    },
    builtin: /\b(?:abs|acos|acosh|all|and|any|appendFile|approxRational|asTypeOf|asin|asinh|atan|atan2|atanh|basicIORun|break|catch|ceiling|chr|compare|concat|concatMap|const|cos|cosh|curry|cycle|decodeFloat|denominator|digitToInt|div|divMod|drop|dropWhile|either|elem|encodeFloat|enumFrom|enumFromThen|enumFromThenTo|enumFromTo|error|even|exp|exponent|fail|filter|flip|floatDigits|floatRadix|floatRange|floor|fmap|foldl|foldl1|foldr|foldr1|fromDouble|fromEnum|fromInt|fromInteger|fromIntegral|fromRational|fst|gcd|getChar|getContents|getLine|group|head|id|inRange|index|init|intToDigit|interact|ioError|isAlpha|isAlphaNum|isAscii|isControl|isDenormalized|isDigit|isHexDigit|isIEEE|isInfinite|isLower|isNaN|isNegativeZero|isOctDigit|isPrint|isSpace|isUpper|iterate|last|lcm|length|lex|lexDigits|lexLitChar|lines|log|logBase|lookup|map|mapM|mapM_|max|maxBound|maximum|maybe|min|minBound|minimum|mod|negate|not|notElem|null|numerator|odd|or|ord|otherwise|pack|pi|pred|primExitWith|print|product|properFraction|putChar|putStr|putStrLn|quot|quotRem|range|rangeSize|read|readDec|readFile|readFloat|readHex|readIO|readInt|readList|readLitChar|readLn|readOct|readParen|readSigned|reads|readsPrec|realToFrac|recip|rem|repeat|replicate|return|reverse|round|scaleFloat|scanl|scanl1|scanr|scanr1|seq|sequence|sequence_|show|showChar|showInt|showList|showLitChar|showParen|showSigned|showString|shows|showsPrec|significand|signum|sin|sinh|snd|sort|span|splitAt|sqrt|subtract|succ|sum|tail|take|takeWhile|tan|tanh|threadToIOResult|toEnum|toInt|toInteger|toLower|toRational|toUpper|truncate|uncurry|undefined|unlines|until|unwords|unzip|unzip3|userError|words|writeFile|zip|zip3|zipWith|zipWith3)\b/,
    number: /\b(?:\d+(?:\.\d+)?(?:e[+-]?\d+)?|0o[0-7]+|0x[0-9a-f]+)\b/i,
    operator: /\s\.\s|[-!#$%*+=?&@|~.:<>^\\\/]*\.[-!#$%*+=?&@|~.:<>^\\\/]+|[-!#$%*+=?&@|~.:<>^\\\/]+\.[-!#$%*+=?&@|~.:<>^\\\/]*|[-!#$%*+=?&@|~:<>^\\\/]+|`(?:[A-Z][\w']*\.)*[_a-z][\w']*`/,
    hvariable: /\b(?:[A-Z][\w']*\.)*[_a-z][\w']*\b/,
    constant: /\b(?:[A-Z][\w']*\.)*[A-Z][\w']*\b/,
    punctuation: /[{}[\];(),.:]/
}, Prism.languages.hs = Prism.languages.haskell;
Prism.languages.vim = {
    string: /"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\r\n]|'')*'/,
    comment: /".*/,
    function: /\w+(?=\()/,
    keyword: /\b(?:ab|abbreviate|abc|abclear|abo|aboveleft|al|all|arga|argadd|argd|argdelete|argdo|arge|argedit|argg|argglobal|argl|arglocal|ar|args|argu|argument|as|ascii|bad|badd|ba|ball|bd|bdelete|be|bel|belowright|bf|bfirst|bl|blast|bm|bmodified|bn|bnext|bN|bNext|bo|botright|bp|bprevious|brea|break|breaka|breakadd|breakd|breakdel|breakl|breaklist|br|brewind|bro|browse|bufdo|b|buffer|buffers|bun|bunload|bw|bwipeout|ca|cabbrev|cabc|cabclear|caddb|caddbuffer|cad|caddexpr|caddf|caddfile|cal|call|cat|catch|cb|cbuffer|cc|ccl|cclose|cd|ce|center|cex|cexpr|cf|cfile|cfir|cfirst|cgetb|cgetbuffer|cgete|cgetexpr|cg|cgetfile|c|change|changes|chd|chdir|che|checkpath|checkt|checktime|cla|clast|cl|clist|clo|close|cmapc|cmapclear|cnew|cnewer|cn|cnext|cN|cNext|cnf|cnfile|cNfcNfile|cnorea|cnoreabbrev|col|colder|colo|colorscheme|comc|comclear|comp|compiler|conf|confirm|con|continue|cope|copen|co|copy|cpf|cpfile|cp|cprevious|cq|cquit|cr|crewind|cuna|cunabbrev|cu|cunmap|cw|cwindow|debugg|debuggreedy|delc|delcommand|d|delete|delf|delfunction|delm|delmarks|diffg|diffget|diffoff|diffpatch|diffpu|diffput|diffsplit|diffthis|diffu|diffupdate|dig|digraphs|di|display|dj|djump|dl|dlist|dr|drop|ds|dsearch|dsp|dsplit|earlier|echoe|echoerr|echom|echomsg|echon|e|edit|el|else|elsei|elseif|em|emenu|endfo|endfor|endf|endfunction|endfun|en|endif|endt|endtry|endw|endwhile|ene|enew|ex|exi|exit|exu|exusage|f|file|files|filetype|fina|finally|fin|find|fini|finish|fir|first|fix|fixdel|fo|fold|foldc|foldclose|folddoc|folddoclosed|foldd|folddoopen|foldo|foldopen|for|fu|fun|function|go|goto|gr|grep|grepa|grepadd|ha|hardcopy|h|help|helpf|helpfind|helpg|helpgrep|helpt|helptags|hid|hide|his|history|ia|iabbrev|iabc|iabclear|if|ij|ijump|il|ilist|imapc|imapclear|in|inorea|inoreabbrev|isearch|isp|isplit|iuna|iunabbrev|iu|iunmap|j|join|ju|jumps|k|keepalt|keepj|keepjumps|kee|keepmarks|laddb|laddbuffer|lad|laddexpr|laddf|laddfile|lan|language|la|last|later|lb|lbuffer|lc|lcd|lch|lchdir|lcl|lclose|let|left|lefta|leftabove|lex|lexpr|lf|lfile|lfir|lfirst|lgetb|lgetbuffer|lgete|lgetexpr|lg|lgetfile|lgr|lgrep|lgrepa|lgrepadd|lh|lhelpgrep|l|list|ll|lla|llast|lli|llist|lmak|lmake|lm|lmap|lmapc|lmapclear|lnew|lnewer|lne|lnext|lN|lNext|lnf|lnfile|lNf|lNfile|ln|lnoremap|lo|loadview|loc|lockmarks|lockv|lockvar|lol|lolder|lop|lopen|lpf|lpfile|lp|lprevious|lr|lrewind|ls|lt|ltag|lu|lunmap|lv|lvimgrep|lvimgrepa|lvimgrepadd|lw|lwindow|mak|make|ma|mark|marks|mat|match|menut|menutranslate|mk|mkexrc|mks|mksession|mksp|mkspell|mkvie|mkview|mkv|mkvimrc|mod|mode|m|move|mzf|mzfile|mz|mzscheme|nbkey|new|n|next|N|Next|nmapc|nmapclear|noh|nohlsearch|norea|noreabbrev|nu|number|nun|nunmap|omapc|omapclear|on|only|o|open|opt|options|ou|ounmap|pc|pclose|ped|pedit|pe|perl|perld|perldo|po|pop|popu|popup|pp|ppop|pre|preserve|prev|previous|p|print|P|Print|profd|profdel|prof|profile|promptf|promptfind|promptr|promptrepl|ps|psearch|pta|ptag|ptf|ptfirst|ptj|ptjump|ptl|ptlast|ptn|ptnext|ptN|ptNext|ptp|ptprevious|ptr|ptrewind|pts|ptselect|pu|put|pw|pwd|pyf|pyfile|py|python|qa|qall|q|quit|quita|quitall|r|read|rec|recover|redi|redir|red|redo|redr|redraw|redraws|redrawstatus|reg|registers|res|resize|ret|retab|retu|return|rew|rewind|ri|right|rightb|rightbelow|rub|ruby|rubyd|rubydo|rubyf|rubyfile|ru|runtime|rv|rviminfo|sal|sall|san|sandbox|sa|sargument|sav|saveas|sba|sball|sbf|sbfirst|sbl|sblast|sbm|sbmodified|sbn|sbnext|sbN|sbNext|sbp|sbprevious|sbr|sbrewind|sb|sbuffer|scripte|scriptencoding|scrip|scriptnames|se|set|setf|setfiletype|setg|setglobal|setl|setlocal|sf|sfind|sfir|sfirst|sh|shell|sign|sil|silent|sim|simalt|sla|slast|sl|sleep|sm|smagic|sm|smap|smapc|smapclear|sme|smenu|sn|snext|sN|sNext|sni|sniff|sno|snomagic|snor|snoremap|snoreme|snoremenu|sor|sort|so|source|spelld|spelldump|spe|spellgood|spelli|spellinfo|spellr|spellrepall|spellu|spellundo|spellw|spellwrong|sp|split|spr|sprevious|sre|srewind|sta|stag|startg|startgreplace|star|startinsert|startr|startreplace|stj|stjump|st|stop|stopi|stopinsert|sts|stselect|sun|sunhide|sunm|sunmap|sus|suspend|sv|sview|syncbind|t|tab|tabc|tabclose|tabd|tabdo|tabe|tabedit|tabf|tabfind|tabfir|tabfirst|tabl|tablast|tabm|tabmove|tabnew|tabn|tabnext|tabN|tabNext|tabo|tabonly|tabp|tabprevious|tabr|tabrewind|tabs|ta|tag|tags|tc|tcl|tcld|tcldo|tclf|tclfile|te|tearoff|tf|tfirst|th|throw|tj|tjump|tl|tlast|tm|tm|tmenu|tn|tnext|tN|tNext|to|topleft|tp|tprevious|tr|trewind|try|ts|tselect|tu|tu|tunmenu|una|unabbreviate|u|undo|undoj|undojoin|undol|undolist|unh|unhide|unlet|unlo|unlockvar|unm|unmap|up|update|verb|verbose|ve|version|vert|vertical|vie|view|vim|vimgrep|vimgrepa|vimgrepadd|vi|visual|viu|viusage|vmapc|vmapclear|vne|vnew|vs|vsplit|vu|vunmap|wa|wall|wh|while|winc|wincmd|windo|winp|winpos|win|winsize|wn|wnext|wN|wNext|wp|wprevious|wq|wqa|wqall|w|write|ws|wsverb|wv|wviminfo|X|xa|xall|x|xit|xm|xmap|xmapc|xmapclear|xme|xmenu|XMLent|XMLns|xn|xnoremap|xnoreme|xnoremenu|xu|xunmap|y|yank)\b/,
    builtin: /\b(?:autocmd|acd|ai|akm|aleph|allowrevins|altkeymap|ambiwidth|ambw|anti|antialias|arab|arabic|arabicshape|ari|arshape|autochdir|autoindent|autoread|autowrite|autowriteall|aw|awa|background|backspace|backup|backupcopy|backupdir|backupext|backupskip|balloondelay|ballooneval|balloonexpr|bdir|bdlay|beval|bex|bexpr|bg|bh|bin|binary|biosk|bioskey|bk|bkc|bomb|breakat|brk|browsedir|bs|bsdir|bsk|bt|bufhidden|buflisted|buftype|casemap|ccv|cdpath|cedit|cfu|ch|charconvert|ci|cin|cindent|cink|cinkeys|cino|cinoptions|cinw|cinwords|clipboard|cmdheight|cmdwinheight|cmp|cms|columns|com|comments|commentstring|compatible|complete|completefunc|completeopt|consk|conskey|copyindent|cot|cpo|cpoptions|cpt|cscopepathcomp|cscopeprg|cscopequickfix|cscopetag|cscopetagorder|cscopeverbose|cspc|csprg|csqf|cst|csto|csverb|cuc|cul|cursorcolumn|cursorline|cwh|debug|deco|def|define|delcombine|dex|dg|dict|dictionary|diff|diffexpr|diffopt|digraph|dip|dir|directory|dy|ea|ead|eadirection|eb|ed|edcompatible|ef|efm|ei|ek|enc|encoding|endofline|eol|ep|equalalways|equalprg|errorbells|errorfile|errorformat|esckeys|et|eventignore|expandtab|exrc|fcl|fcs|fdc|fde|fdi|fdl|fdls|fdm|fdn|fdo|fdt|fen|fenc|fencs|fex|ff|ffs|fileencoding|fileencodings|fileformat|fileformats|fillchars|fk|fkmap|flp|fml|fmr|foldcolumn|foldenable|foldexpr|foldignore|foldlevel|foldlevelstart|foldmarker|foldmethod|foldminlines|foldnestmax|foldtext|formatexpr|formatlistpat|formatoptions|formatprg|fp|fs|fsync|ft|gcr|gd|gdefault|gfm|gfn|gfs|gfw|ghr|gp|grepformat|grepprg|gtl|gtt|guicursor|guifont|guifontset|guifontwide|guiheadroom|guioptions|guipty|guitablabel|guitabtooltip|helpfile|helpheight|helplang|hf|hh|hi|hidden|highlight|hk|hkmap|hkmapp|hkp|hl|hlg|hls|hlsearch|ic|icon|iconstring|ignorecase|im|imactivatekey|imak|imc|imcmdline|imd|imdisable|imi|iminsert|ims|imsearch|inc|include|includeexpr|incsearch|inde|indentexpr|indentkeys|indk|inex|inf|infercase|insertmode|isf|isfname|isi|isident|isk|iskeyword|isprint|joinspaces|js|key|keymap|keymodel|keywordprg|km|kmp|kp|langmap|langmenu|laststatus|lazyredraw|lbr|lcs|linebreak|lines|linespace|lisp|lispwords|listchars|loadplugins|lpl|lsp|lz|macatsui|magic|makeef|makeprg|matchpairs|matchtime|maxcombine|maxfuncdepth|maxmapdepth|maxmem|maxmempattern|maxmemtot|mco|mef|menuitems|mfd|mh|mis|mkspellmem|ml|mls|mm|mmd|mmp|mmt|modeline|modelines|modifiable|modified|more|mouse|mousef|mousefocus|mousehide|mousem|mousemodel|mouses|mouseshape|mouset|mousetime|mp|mps|msm|mzq|mzquantum|nf|nrformats|numberwidth|nuw|odev|oft|ofu|omnifunc|opendevice|operatorfunc|opfunc|osfiletype|pa|para|paragraphs|paste|pastetoggle|patchexpr|patchmode|path|pdev|penc|pex|pexpr|pfn|ph|pheader|pi|pm|pmbcs|pmbfn|popt|preserveindent|previewheight|previewwindow|printdevice|printencoding|printexpr|printfont|printheader|printmbcharset|printmbfont|printoptions|prompt|pt|pumheight|pvh|pvw|qe|quoteescape|readonly|remap|report|restorescreen|revins|rightleft|rightleftcmd|rl|rlc|ro|rs|rtp|ruf|ruler|rulerformat|runtimepath|sbo|sc|scb|scr|scroll|scrollbind|scrolljump|scrolloff|scrollopt|scs|sect|sections|secure|sel|selection|selectmode|sessionoptions|sft|shcf|shellcmdflag|shellpipe|shellquote|shellredir|shellslash|shelltemp|shelltype|shellxquote|shiftround|shiftwidth|shm|shortmess|shortname|showbreak|showcmd|showfulltag|showmatch|showmode|showtabline|shq|si|sidescroll|sidescrolloff|siso|sj|slm|smartcase|smartindent|smarttab|smc|smd|softtabstop|sol|spc|spell|spellcapcheck|spellfile|spelllang|spellsuggest|spf|spl|splitbelow|splitright|sps|sr|srr|ss|ssl|ssop|stal|startofline|statusline|stl|stmp|su|sua|suffixes|suffixesadd|sw|swapfile|swapsync|swb|swf|switchbuf|sws|sxq|syn|synmaxcol|syntax|tabline|tabpagemax|tabstop|tagbsearch|taglength|tagrelative|tagstack|tal|tb|tbi|tbidi|tbis|tbs|tenc|term|termbidi|termencoding|terse|textauto|textmode|textwidth|tgst|thesaurus|tildeop|timeout|timeoutlen|title|titlelen|titleold|titlestring|toolbar|toolbariconsize|top|tpm|tsl|tsr|ttimeout|ttimeoutlen|ttm|tty|ttybuiltin|ttyfast|ttym|ttymouse|ttyscroll|ttytype|tw|tx|uc|ul|undolevels|updatecount|updatetime|ut|vb|vbs|vdir|verbosefile|vfile|viewdir|viewoptions|viminfo|virtualedit|visualbell|vop|wak|warn|wb|wc|wcm|wd|weirdinvert|wfh|wfw|whichwrap|wi|wig|wildchar|wildcharm|wildignore|wildmenu|wildmode|wildoptions|wim|winaltkeys|window|winfixheight|winfixwidth|winheight|winminheight|winminwidth|winwidth|wiv|wiw|wm|wmh|wmnu|wmw|wop|wrap|wrapmargin|wrapscan|writeany|writebackup|writedelay|ww|noacd|noai|noakm|noallowrevins|noaltkeymap|noanti|noantialias|noar|noarab|noarabic|noarabicshape|noari|noarshape|noautochdir|noautoindent|noautoread|noautowrite|noautowriteall|noaw|noawa|nobackup|noballooneval|nobeval|nobin|nobinary|nobiosk|nobioskey|nobk|nobl|nobomb|nobuflisted|nocf|noci|nocin|nocindent|nocompatible|noconfirm|noconsk|noconskey|nocopyindent|nocp|nocscopetag|nocscopeverbose|nocst|nocsverb|nocuc|nocul|nocursorcolumn|nocursorline|nodeco|nodelcombine|nodg|nodiff|nodigraph|nodisable|noea|noeb|noed|noedcompatible|noek|noendofline|noeol|noequalalways|noerrorbells|noesckeys|noet|noex|noexpandtab|noexrc|nofen|nofk|nofkmap|nofoldenable|nogd|nogdefault|noguipty|nohid|nohidden|nohk|nohkmap|nohkmapp|nohkp|nohls|noic|noicon|noignorecase|noim|noimc|noimcmdline|noimd|noincsearch|noinf|noinfercase|noinsertmode|nois|nojoinspaces|nojs|nolazyredraw|nolbr|nolinebreak|nolisp|nolist|noloadplugins|nolpl|nolz|noma|nomacatsui|nomagic|nomh|noml|nomod|nomodeline|nomodifiable|nomodified|nomore|nomousef|nomousefocus|nomousehide|nonu|nonumber|noodev|noopendevice|nopaste|nopi|nopreserveindent|nopreviewwindow|noprompt|nopvw|noreadonly|noremap|norestorescreen|norevins|nori|norightleft|norightleftcmd|norl|norlc|noro|nors|noru|noruler|nosb|nosc|noscb|noscrollbind|noscs|nosecure|nosft|noshellslash|noshelltemp|noshiftround|noshortname|noshowcmd|noshowfulltag|noshowmatch|noshowmode|nosi|nosm|nosmartcase|nosmartindent|nosmarttab|nosmd|nosn|nosol|nospell|nosplitbelow|nosplitright|nospr|nosr|nossl|nosta|nostartofline|nostmp|noswapfile|noswf|nota|notagbsearch|notagrelative|notagstack|notbi|notbidi|notbs|notermbidi|noterse|notextauto|notextmode|notf|notgst|notildeop|notimeout|notitle|noto|notop|notr|nottimeout|nottybuiltin|nottyfast|notx|novb|novisualbell|nowa|nowarn|nowb|noweirdinvert|nowfh|nowfw|nowildmenu|nowinfixheight|nowinfixwidth|nowiv|nowmnu|nowrap|nowrapscan|nowrite|nowriteany|nowritebackup|nows|invacd|invai|invakm|invallowrevins|invaltkeymap|invanti|invantialias|invar|invarab|invarabic|invarabicshape|invari|invarshape|invautochdir|invautoindent|invautoread|invautowrite|invautowriteall|invaw|invawa|invbackup|invballooneval|invbeval|invbin|invbinary|invbiosk|invbioskey|invbk|invbl|invbomb|invbuflisted|invcf|invci|invcin|invcindent|invcompatible|invconfirm|invconsk|invconskey|invcopyindent|invcp|invcscopetag|invcscopeverbose|invcst|invcsverb|invcuc|invcul|invcursorcolumn|invcursorline|invdeco|invdelcombine|invdg|invdiff|invdigraph|invdisable|invea|inveb|inved|invedcompatible|invek|invendofline|inveol|invequalalways|inverrorbells|invesckeys|invet|invex|invexpandtab|invexrc|invfen|invfk|invfkmap|invfoldenable|invgd|invgdefault|invguipty|invhid|invhidden|invhk|invhkmap|invhkmapp|invhkp|invhls|invhlsearch|invic|invicon|invignorecase|invim|invimc|invimcmdline|invimd|invincsearch|invinf|invinfercase|invinsertmode|invis|invjoinspaces|invjs|invlazyredraw|invlbr|invlinebreak|invlisp|invlist|invloadplugins|invlpl|invlz|invma|invmacatsui|invmagic|invmh|invml|invmod|invmodeline|invmodifiable|invmodified|invmore|invmousef|invmousefocus|invmousehide|invnu|invnumber|invodev|invopendevice|invpaste|invpi|invpreserveindent|invpreviewwindow|invprompt|invpvw|invreadonly|invremap|invrestorescreen|invrevins|invri|invrightleft|invrightleftcmd|invrl|invrlc|invro|invrs|invru|invruler|invsb|invsc|invscb|invscrollbind|invscs|invsecure|invsft|invshellslash|invshelltemp|invshiftround|invshortname|invshowcmd|invshowfulltag|invshowmatch|invshowmode|invsi|invsm|invsmartcase|invsmartindent|invsmarttab|invsmd|invsn|invsol|invspell|invsplitbelow|invsplitright|invspr|invsr|invssl|invsta|invstartofline|invstmp|invswapfile|invswf|invta|invtagbsearch|invtagrelative|invtagstack|invtbi|invtbidi|invtbs|invtermbidi|invterse|invtextauto|invtextmode|invtf|invtgst|invtildeop|invtimeout|invtitle|invto|invtop|invtr|invttimeout|invttybuiltin|invttyfast|invtx|invvb|invvisualbell|invwa|invwarn|invwb|invweirdinvert|invwfh|invwfw|invwildmenu|invwinfixheight|invwinfixwidth|invwiv|invwmnu|invwrap|invwrapscan|invwrite|invwriteany|invwritebackup|invws|t_AB|t_AF|t_al|t_AL|t_bc|t_cd|t_ce|t_Ce|t_cl|t_cm|t_Co|t_cs|t_Cs|t_CS|t_CV|t_da|t_db|t_dl|t_DL|t_EI|t_F1|t_F2|t_F3|t_F4|t_F5|t_F6|t_F7|t_F8|t_F9|t_fs|t_IE|t_IS|t_k1|t_K1|t_k2|t_k3|t_K3|t_k4|t_K4|t_k5|t_K5|t_k6|t_K6|t_k7|t_K7|t_k8|t_K8|t_k9|t_K9|t_KA|t_kb|t_kB|t_KB|t_KC|t_kd|t_kD|t_KD|t_ke|t_KE|t_KF|t_KG|t_kh|t_KH|t_kI|t_KI|t_KJ|t_KK|t_kl|t_KL|t_kN|t_kP|t_kr|t_ks|t_ku|t_le|t_mb|t_md|t_me|t_mr|t_ms|t_nd|t_op|t_RI|t_RV|t_Sb|t_se|t_Sf|t_SI|t_so|t_sr|t_te|t_ti|t_ts|t_ue|t_us|t_ut|t_vb|t_ve|t_vi|t_vs|t_WP|t_WS|t_xs|t_ZH|t_ZR)\b/,
    number: /\b(?:0x[\da-f]+|\d+(?:\.\d+)?)\b/i,
    operator: /\|\||&&|[-+.]=?|[=!](?:[=~][#?]?)?|[<>]=?[#?]?|[*\/%?]|\b(?:is(?:not)?)\b/,
    punctuation: /[{}[\](),;:]/
};
! function() {
    if ("undefined" != typeof self && self.Prism && self.document) {
        var l = "line-numbers",
            c = /\n(?!$)/g,
            m = function(e) {
                var t = a(e)["white-space"];
                if ("pre-wrap" === t || "pre-line" === t) {
                    var n = e.querySelector("code"),
                        r = e.querySelector(".line-numbers-rows");
                    if (!n || !r) return;
                    var s = e.querySelector(".line-numbers-sizer"),
                        i = n.textContent.split(c);
                    s || ((s = document.createElement("span")).className = "line-numbers-sizer", n.appendChild(s)), s.style.display = "block", i.forEach(function(e, t) {
                        s.textContent = e || "\n";
                        var n = s.getBoundingClientRect().height;
                        r.children[t].style.height = n + "px"
                    }), s.textContent = "", s.style.display = "none"
                }
            },
            a = function(e) {
                return e ? window.getComputedStyle ? getComputedStyle(e) : e.currentStyle || null : null
            };
        window.addEventListener("resize", function() {
            Array.prototype.forEach.call(document.querySelectorAll("pre." + l), m)
        }), Prism.hooks.add("complete", function(e) {
            if (e.code) {
                var t = e.element,
                    n = t.parentNode;
                if (n && /pre/i.test(n.nodeName) && !t.querySelector(".line-numbers-rows")) {
                    for (var r = !1, s = /(?:^|\s)line-numbers(?:\s|$)/, i = t; i; i = i.parentNode)
                        if (s.test(i.className)) {
                            r = !0;
                            break
                        } if (r) {
                        t.className = t.className.replace(s, " "), s.test(n.className) || (n.className += " line-numbers");
                        var l, a = e.code.match(c),
                            o = a ? a.length + 1 : 1,
                            u = new Array(o + 1).join("<span></span>");
                        (l = document.createElement("span")).setAttribute("aria-hidden", "true"), l.className = "line-numbers-rows", l.innerHTML = u, n.hasAttribute("data-start") && (n.style.counterReset = "linenumber " + (parseInt(n.getAttribute("data-start"), 10) - 1)), e.element.appendChild(l), m(n), Prism.hooks.run("line-numbers", e)
                    }
                }
            }
        }), Prism.hooks.add("line-numbers", function(e) {
            e.plugins = e.plugins || {}, e.plugins.lineNumbers = !0
        }), Prism.plugins.lineNumbers = {
            getLine: function(e, t) {
                if ("PRE" === e.tagName && e.classList.contains(l)) {
                    var n = e.querySelector(".line-numbers-rows"),
                        r = parseInt(e.getAttribute("data-start"), 10) || 1,
                        s = r + (n.children.length - 1);
                    t < r && (t = r), s < t && (t = s);
                    var i = t - r;
                    return n.children[i]
                }
            },
            resize: function(e) {
                m(e)
            }
        }
    }
}();
! function() {
    if ("undefined" != typeof self && self.Prism && self.document) {
        var f = /(?:^|\s)command-line(?:\s|$)/;
        Prism.hooks.add("before-highlight", function(e) {
            var t = e.vars = e.vars || {},
                a = t["command-line"] = t["command-line"] || {};
            if (!a.complete && e.code) {
                var n = e.element.parentNode;
                if (n && /pre/i.test(n.nodeName) && (f.test(n.className) || f.test(e.element.className))) {
                    var r = e.element.querySelector(".command-line-prompt");
                    r && r.remove();
                    var s = e.code.split("\n");
                    a.numberOfLines = s.length;
                    var o = a.outputLines = [],
                        i = n.getAttribute("data-output"),
                        l = n.getAttribute("data-filter-output");
                    if (i || "" === i) {
                        i = i.split(",");
                        for (var m = 0; m < i.length; m++) {
                            var d = i[m].split("-"),
                                p = parseInt(d[0], 10),
                                c = 2 === d.length ? parseInt(d[1], 10) : p;
                            if (!isNaN(p) && !isNaN(c)) {
                                p < 1 && (p = 1), c > s.length && (c = s.length), c--;
                                for (var u = --p; u <= c; u++) o[u] = s[u], s[u] = ""
                            }
                        }
                    } else if (l)
                        for (m = 0; m < s.length; m++) 0 === s[m].indexOf(l) && (o[m] = s[m].slice(l.length), s[m] = "");
                    e.code = s.join("\n")
                } else a.complete = !0
            } else a.complete = !0
        }), Prism.hooks.add("before-insert", function(e) {
            var t = e.vars = e.vars || {},
                a = t["command-line"] = t["command-line"] || {};
            if (!a.complete) {
                for (var n = e.highlightedCode.split("\n"), r = 0, s = (a.outputLines || []).length; r < s; r++) a.outputLines.hasOwnProperty(r) && (n[r] = a.outputLines[r]);
                e.highlightedCode = n.join("\n")
            }
        }), Prism.hooks.add('complete', function(env) {
    var vars = env.vars = env.vars || {};
    var commandLine = vars['command-line'] = vars['command-line'] || {};
    if (commandLine.complete) {
      return;
    }

    var pre = env.element.parentNode;
    if (clsReg.test(env.element.className)) { // Remove the class "command-line" from the <code>
      env.element.className = env.element.className.replace(clsReg, ' ');
    }
    if (!clsReg.test(pre.className)) { // Add the class "command-line" to the <pre>
      pre.className += ' command-line';
    }

    var getAttribute = function(key, defaultValue) {
      return (pre.getAttribute(key) || defaultValue).replace(/"/g, '&quot');
    };

    // Create the "rows" that will become the command-line prompts. -- cwells
    var promptLines = new Array(commandLine.numberOfLines + 1);
    var promptText = getAttribute('data-prompt', '');
    // if (promptText !== '') {
    //  promptLines = promptLines.join('<span data-prompt="' + promptText + '"></span>');
    // } else {
    //  var user = getAttribute('data-user', 'user');
    //  var host = getAttribute('data-host', 'localhost');
    //  promptLines = promptLines.join('<span data-user="' + user + '" data-host="' + host + '"></span>');
    // }

    if (promptText !== '') {
      if (promptText.includes('|')) {
        // promptText format : 1|myPromptText;2-3|myOtherPrompt;4,8|myThirdPrompt
        // promptChunks: an array of
        var promptChunks = promptText.split(';');
        // prompts: an array of line number => prompt text
        var prompts = [];
        for (var i = 0; i < promptChunks.length; i++) {
          // promptSections: 0 - line range; 1 - prompt value
          var promptSections = promptChunks[i].split('|');
          var promptValue = promptSections[1];
          var promptRanges = promptSections[0].split(',');
          for (var p = 0; p < promptRanges.length; p++) {
            var promptRange = promptRanges[p].split('-');
            var promptStart = parseInt(promptRange[0]);
            var promptEnd = promptStart;
            if (promptRange.length === 2) {
              promptEnd = parseInt(promptRange[1]);
            }
            if (!isNaN(promptStart) && !isNaN(promptEnd)) {
              for (var j = promptStart; j <= promptEnd; j++) {
                var index = j - 1;
                prompts[index] = promptValue;
              }
            }
          }
        }
        for (var i = 0; i < promptLines.length - 1; i++) {
          var promptText = typeof prompts[i] === "undefined" ? ": >" : prompts[i];
          promptLines[i] = '<span data-prompt="' + promptText + '"></span>';
        }
        promptLines = promptLines.join('');
      } else {
        promptLines = promptLines.join('<span data-prompt="' + promptText + '"></span>');
      }
    } else {
      var user = getAttribute('data-user', 'user');
      var host = getAttribute('data-host', 'localhost');
      promptLines = promptLines.join('<span data-user="' + user + '" data-host="' + host + '"></span>');
    }

    // Create the wrapper element. -- cwells
    var prompt = document.createElement('span');
    prompt.className = 'command-line-prompt';
    prompt.innerHTML = promptLines;

    // Remove the prompt from the output lines. -- cwells
    for (var i = 0; i < commandLine.outputLines.length; i++) {
      if (commandLine.outputLines.hasOwnProperty(i)) {
        var node = prompt.children[i];
        node.removeAttribute('data-user');
        node.removeAttribute('data-host');
        node.removeAttribute('data-prompt');
      }
    }

    env.element.insertBefore(prompt, env.element.firstChild);
    commandLine.complete = true;
  })
    }
}();