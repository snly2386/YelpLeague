! function(a) {
    "use strict";
    a.fn.fitVids = function(b) {
        var c = {
            customSelector: null,
            ignore: null
        };
        if (!document.getElementById("fit-vids-style")) {
            var d = document.head || document.getElementsByTagName("head")[0],
                e = ".fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}",
                f = document.createElement("div");
            f.innerHTML = '<p>x</p><style id="fit-vids-style">' + e + "</style>", d.appendChild(f.childNodes[1])
        }
        return b && a.extend(c, b), this.each(function() {
            var b = ["iframe[src*='player.vimeo.com']", "iframe[src*='youtube.com']", "iframe[src*='youtube-nocookie.com']", "iframe[src*='kickstarter.com'][src*='video.html']", "object", "embed"];
            c.customSelector && b.push(c.customSelector);
            var d = ".fitvidsignore";
            c.ignore && (d = d + ", " + c.ignore);
            var e = a(this).find(b.join(","));
            e = e.not("object object"), e = e.not(d), e.each(function() {
                var b = a(this);
                if (!(b.parents(d).length > 0 || "embed" === this.tagName.toLowerCase() && b.parent("object").length || b.parent(".fluid-width-video-wrapper").length)) {
                    b.css("height") || b.css("width") || !isNaN(b.attr("height")) && !isNaN(b.attr("width")) || (b.attr("height", 9), b.attr("width", 16));
                    var c = "object" === this.tagName.toLowerCase() || b.attr("height") && !isNaN(parseInt(b.attr("height"), 10)) ? parseInt(b.attr("height"), 10) : b.height(),
                        e = isNaN(parseInt(b.attr("width"), 10)) ? b.width() : parseInt(b.attr("width"), 10),
                        f = c / e;
                    if (!b.attr("id")) {
                        var g = "fitvid" + Math.floor(999999 * Math.random());
                        b.attr("id", g)
                    }
                    b.wrap('<div class="fluid-width-video-wrapper"></div>').parent(".fluid-width-video-wrapper").css("padding-top", 100 * f + "%"), b.removeAttr("height").removeAttr("width")
                }
            })
        })
    }
}(window.jQuery || window.Zepto),
function(a) {
    var b, c, d, e, f, g, h, i = "Close",
        j = "AfterClose",
        k = "BeforeAppend",
        l = "MarkupParse",
        m = "Open",
        n = "Change",
        o = "mfp",
        p = "." + o,
        q = "mfp-ready",
        r = "mfp-removing",
        s = "mfp-prevent-close",
        t = function() {},
        u = !!window.jQuery,
        v = a(window),
        w = function(a, c) {
            b.ev.on(o + a + p, c)
        },
        x = function(b, c, d, e) {
            var f = document.createElement("div");
            return f.className = "mfp-" + b, d && (f.innerHTML = d), e ? c && c.appendChild(f) : (f = a(f), c && f.appendTo(c)), f
        },
        y = function(c, d) {
            b.ev.triggerHandler(o + c, d), b.st.callbacks && (c = c.charAt(0).toLowerCase() + c.slice(1), b.st.callbacks[c] && b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]))
        },
        z = function() {
            (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus()
        },
        A = function(c) {
            return c === h && b.currTemplate.closeBtn || (b.currTemplate.closeBtn = a(b.st.closeMarkup.replace("%title%", b.st.tClose)), h = c), b.currTemplate.closeBtn
        },
        B = function() {
            a.magnificPopup.instance || (b = new t, b.init(), a.magnificPopup.instance = b)
        },
        C = function(c) {
            if (!a(c).hasClass(s)) {
                var d = b.st.closeOnContentClick,
                    e = b.st.closeOnBgClick;
                if (d && e) return !0;
                if (!b.content || a(c).hasClass("mfp-close") || b.preloader && c === b.preloader[0]) return !0;
                if (c === b.content[0] || a.contains(b.content[0], c)) {
                    if (d) return !0
                } else if (e) return !0;
                return !1
            }
        };
    t.prototype = {
        constructor: t,
        init: function() {
            var c = navigator.appVersion;
            b.isIE7 = -1 !== c.indexOf("MSIE 7."), b.isIE8 = -1 !== c.indexOf("MSIE 8."), b.isLowIE = b.isIE7 || b.isIE8, b.isAndroid = /android/gi.test(c), b.isIOS = /iphone|ipad|ipod/gi.test(c), b.probablyMobile = b.isAndroid || b.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent), d = a(document.body), e = a(document), b.popupsCache = {}
        },
        open: function(c) {
            var f;
            if (c.isObj === !1) {
                b.items = c.items.toArray(), b.index = 0;
                var h, i = c.items;
                for (f = 0; i.length > f; f++)
                    if (h = i[f], h.parsed && (h = h.el[0]), h === c.el[0]) {
                        b.index = f;
                        break
                    }
            } else b.items = a.isArray(c.items) ? c.items : [c.items], b.index = c.index || 0;
            if (b.isOpen) return void b.updateItemHTML();
            b.types = [], g = "", b.ev = c.mainEl || e, c.key ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}), b.currTemplate = b.popupsCache[c.key]) : b.currTemplate = {}, b.st = a.extend(!0, {}, a.magnificPopup.defaults, c), b.fixedContentPos = "auto" === b.st.fixedContentPos ? !b.probablyMobile : b.st.fixedContentPos, b.bgOverlay || (b.bgOverlay = x("bg").on("click" + p, function() {
                b.close()
            }), b.wrap = x("wrap").attr("tabindex", -1).on("click" + p, function(a) {
                C(a.target) && b.close()
            }), b.container = x("container", b.wrap)), b.contentContainer = x("content"), b.st.preloader && (b.preloader = x("preloader", b.container, b.st.tLoading));
            var j = a.magnificPopup.modules;
            for (f = 0; j.length > f; f++) {
                var k = j[f];
                k = k.charAt(0).toUpperCase() + k.slice(1), b["init" + k].call(b)
            }
            y("BeforeOpen"), b.st.closeBtnInside ? (w(l, function(a, b, c, d) {
                c.close_replaceWith = A(d.type)
            }), g += " mfp-close-btn-in") : b.wrap.append(A()), b.st.alignTop && (g += " mfp-align-top"), b.fixedContentPos ? b.wrap.css({
                overflow: b.st.overflowY,
                overflowX: "hidden",
                overflowY: b.st.overflowY
            }) : b.wrap.css({
                top: v.scrollTop(),
                position: "absolute"
            }), (b.st.fixedBgPos === !1 || "auto" === b.st.fixedBgPos && !b.fixedContentPos) && b.bgOverlay.css({
                height: e.height(),
                position: "absolute"
            }), e.on("keyup" + p, function(a) {
                27 === a.keyCode && b.close()
            }), v.on("resize" + p, function() {
                b.updateSize()
            }), b.st.closeOnContentClick || (g += " mfp-auto-cursor"), g && b.wrap.addClass(g);
            var n = b.wH = v.height(),
                o = {};
            if (b.fixedContentPos && b._hasScrollBar(n)) {
                var r = b._getScrollbarSize();
                r && (o.paddingRight = r)
            }
            b.fixedContentPos && (b.isIE7 ? a("body, html").css("overflow", "hidden") : o.overflow = "hidden");
            var s = b.st.mainClass;
            b.isIE7 && (s += " mfp-ie7"), s && b._addClassToMFP(s), b.updateItemHTML(), y("BuildControls"), d.css(o), b.bgOverlay.add(b.wrap).prependTo(document.body), b._lastFocusedEl = document.activeElement, setTimeout(function() {
                b.content ? (b._addClassToMFP(q), z()) : b.bgOverlay.addClass(q), e.on("focusin" + p, function(c) {
                    return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target) ? void 0 : (z(), !1)
                })
            }, 16), b.isOpen = !0, b.updateSize(n), y(m)
        },
        close: function() {
            b.isOpen && (b.isOpen = !1, b.st.removalDelay && !b.isLowIE ? (b._addClassToMFP(r), setTimeout(function() {
                b._close()
            }, b.st.removalDelay)) : b._close())
        },
        _close: function() {
            y(i);
            var c = r + " " + q + " ";
            if (b.bgOverlay.detach(), b.wrap.detach(), b.container.empty(), b.st.mainClass && (c += b.st.mainClass + " "), b._removeClassFromMFP(c), b.fixedContentPos) {
                var f = {
                    paddingRight: ""
                };
                b.isIE7 ? a("body, html").css("overflow", "") : f.overflow = "", d.css(f)
            }
            e.off("keyup" + p + " focusin" + p), b.ev.off(p), b.wrap.attr("class", "mfp-wrap").removeAttr("style"), b.bgOverlay.attr("class", "mfp-bg"), b.container.attr("class", "mfp-container"), b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0 || b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach(), b._lastFocusedEl && a(b._lastFocusedEl).focus(), b.currItem = null, b.content = null, b.currTemplate = null, b.prevHeight = 0, y(j)
        },
        updateSize: function(a) {
            if (b.isIOS) {
                var c = document.documentElement.clientWidth / window.innerWidth,
                    d = window.innerHeight * c;
                b.wrap.css("height", d), b.wH = d
            } else b.wH = a || v.height();
            b.fixedContentPos || b.wrap.css("height", b.wH), y("Resize")
        },
        updateItemHTML: function() {
            var c = b.items[b.index];
            b.contentContainer.detach(), b.content && b.content.detach(), c.parsed || (c = b.parseEl(b.index));
            var d = c.type;
            if (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]), b.currItem = c, !b.currTemplate[d]) {
                var e = b.st[d] ? b.st[d].markup : !1;
                y("FirstMarkupParse", e), b.currTemplate[d] = e ? a(e) : !0
            }
            f && f !== c.type && b.container.removeClass("mfp-" + f + "-holder");
            var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](c, b.currTemplate[d]);
            b.appendContent(g, d), c.preloaded = !0, y(n, c), f = c.type, b.container.prepend(b.contentContainer), y("AfterChange")
        },
        appendContent: function(a, c) {
            b.content = a, a ? b.st.closeBtnInside && b.currTemplate[c] === !0 ? b.content.find(".mfp-close").length || b.content.append(A()) : b.content = a : b.content = "", y(k), b.container.addClass("mfp-" + c + "-holder"), b.contentContainer.append(b.content)
        },
        parseEl: function(c) {
            var d = b.items[c],
                e = d.type;
            if (d = d.tagName ? {
                    el: a(d)
                } : {
                    data: d,
                    src: d.src
                }, d.el) {
                for (var f = b.types, g = 0; f.length > g; g++)
                    if (d.el.hasClass("mfp-" + f[g])) {
                        e = f[g];
                        break
                    }
                d.src = d.el.attr("data-mfp-src"), d.src || (d.src = d.el.attr("href"))
            }
            return d.type = e || b.st.type || "inline", d.index = c, d.parsed = !0, b.items[c] = d, y("ElementParse", d), b.items[c]
        },
        addGroup: function(a, c) {
            var d = function(d) {
                d.mfpEl = this, b._openClick(d, a, c)
            };
            c || (c = {});
            var e = "click.magnificPopup";
            c.mainEl = a, c.items ? (c.isObj = !0, a.off(e).on(e, d)) : (c.isObj = !1, c.delegate ? a.off(e).on(e, c.delegate, d) : (c.items = a, a.off(e).on(e, d)))
        },
        _openClick: function(c, d, e) {
            var f = void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
            if (f || 2 !== c.which) {
                var g = void 0 !== e.disableOn ? e.disableOn : a.magnificPopup.defaults.disableOn;
                if (g)
                    if (a.isFunction(g)) {
                        if (!g.call(b)) return !0
                    } else if (g > v.width()) return !0;
                c.type && (c.preventDefault(), b.isOpen && c.stopPropagation()), e.el = a(c.mfpEl), e.delegate && (e.items = d.find(e.delegate)), b.open(e)
            }
        },
        updateStatus: function(a, d) {
            if (b.preloader) {
                c !== a && b.container.removeClass("mfp-s-" + c), d || "loading" !== a || (d = b.st.tLoading);
                var e = {
                    status: a,
                    text: d
                };
                y("UpdateStatus", e), a = e.status, d = e.text, b.preloader.html(d), b.preloader.find("a").click(function(a) {
                    a.stopImmediatePropagation()
                }), b.container.addClass("mfp-s-" + a), c = a
            }
        },
        _addClassToMFP: function(a) {
            b.bgOverlay.addClass(a), b.wrap.addClass(a)
        },
        _removeClassFromMFP: function(a) {
            this.bgOverlay.removeClass(a), b.wrap.removeClass(a)
        },
        _hasScrollBar: function(a) {
            return (b.isIE7 ? e.height() : document.body.scrollHeight) > (a || v.height())
        },
        _parseMarkup: function(b, c, d) {
            var e;
            d.data && (c = a.extend(d.data, c)), y(l, [b, c, d]), a.each(c, function(a, c) {
                if (void 0 === c || c === !1) return !0;
                if (e = a.split("_"), e.length > 1) {
                    var d = b.find(p + "-" + e[0]);
                    if (d.length > 0) {
                        var f = e[1];
                        "replaceWith" === f ? d[0] !== c[0] && d.replaceWith(c) : "img" === f ? d.is("img") ? d.attr("src", c) : d.replaceWith('<img src="' + c + '" class="' + d.attr("class") + '" />') : d.attr(e[1], c)
                    }
                } else b.find(p + "-" + a).html(c)
            })
        },
        _getScrollbarSize: function() {
            if (void 0 === b.scrollbarSize) {
                var a = document.createElement("div");
                a.id = "mfp-sbm", a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;", document.body.appendChild(a), b.scrollbarSize = a.offsetWidth - a.clientWidth, document.body.removeChild(a)
            }
            return b.scrollbarSize
        }
    }, a.magnificPopup = {
        instance: null,
        proto: t.prototype,
        modules: [],
        open: function(a, b) {
            return B(), a || (a = {}), a.isObj = !0, a.index = b || 0, this.instance.open(a)
        },
        close: function() {
            return a.magnificPopup.instance.close()
        },
        registerModule: function(b, c) {
            c.options && (a.magnificPopup.defaults[b] = c.options), a.extend(this.proto, c.proto), this.modules.push(b)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            alignTop: !1,
            removalDelay: 0,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading..."
        }
    }, a.fn.magnificPopup = function(c) {
        B();
        var d = a(this);
        if ("string" == typeof c)
            if ("open" === c) {
                var e, f = u ? d.data("magnificPopup") : d[0].magnificPopup,
                    g = parseInt(arguments[1], 10) || 0;
                f.items ? e = f.items[g] : (e = d, f.delegate && (e = e.find(f.delegate)), e = e.eq(g)), b._openClick({
                    mfpEl: e
                }, d, f)
            } else b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
        else u ? d.data("magnificPopup", c) : d[0].magnificPopup = c, b.addGroup(d, c);
        return d
    };
    var D, E, F, G = "inline",
        H = function() {
            F && (E.after(F.addClass(D)).detach(), F = null)
        };
    a.magnificPopup.registerModule(G, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                b.types.push(G), w(i + "." + G, function() {
                    H()
                })
            },
            getInline: function(c, d) {
                if (H(), c.src) {
                    var e = b.st.inline,
                        f = a(c.src);
                    if (f.length) {
                        var g = f[0].parentNode;
                        g && g.tagName && (E || (D = e.hiddenClass, E = x(D), D = "mfp-" + D), F = f.after(E).detach().removeClass(D)), b.updateStatus("ready")
                    } else b.updateStatus("error", e.tNotFound), f = a("<div>");
                    return c.inlineElement = f, f
                }
                return b.updateStatus("ready"), b._parseMarkup(d, {}, c), d
            }
        }
    });
    var I, J = "ajax",
        K = function() {
            I && d.removeClass(I)
        };
    a.magnificPopup.registerModule(J, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                b.types.push(J), I = b.st.ajax.cursor, w(i + "." + J, function() {
                    K(), b.req && b.req.abort()
                })
            },
            getAjax: function(c) {
                I && d.addClass(I), b.updateStatus("loading");
                var e = a.extend({
                    url: c.src,
                    success: function(d, e, f) {
                        var g = {
                            data: d,
                            xhr: f
                        };
                        y("ParseAjax", g), b.appendContent(a(g.data), J), c.finished = !0, K(), z(), setTimeout(function() {
                            b.wrap.addClass(q)
                        }, 16), b.updateStatus("ready"), y("AjaxContentAdded")
                    },
                    error: function() {
                        K(), c.finished = c.loadError = !0, b.updateStatus("error", b.st.ajax.tError.replace("%url%", c.src))
                    }
                }, b.st.ajax.settings);
                return b.req = a.ajax(e), ""
            }
        }
    });
    var L, M = function(c) {
        if (c.data && void 0 !== c.data.title) return c.data.title;
        var d = b.st.image.titleSrc;
        if (d) {
            if (a.isFunction(d)) return d.call(b, c);
            if (c.el) return c.el.attr(d) || ""
        }
        return ""
    };
    a.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><div class="mfp-img"></div><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var a = b.st.image,
                    c = ".image";
                b.types.push("image"), w(m + c, function() {
                    "image" === b.currItem.type && a.cursor && d.addClass(a.cursor)
                }), w(i + c, function() {
                    a.cursor && d.removeClass(a.cursor), v.off("resize" + p)
                }), w("Resize" + c, b.resizeImage), b.isLowIE && w("AfterChange", b.resizeImage)
            },
            resizeImage: function() {
                var a = b.currItem;
                if (a.img && b.st.image.verticalFit) {
                    var c = 0;
                    b.isLowIE && (c = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)), a.img.css("max-height", b.wH - c)
                }
            },
            _onImageHasSize: function(a) {
                a.img && (a.hasSize = !0, L && clearInterval(L), a.isCheckingImgSize = !1, y("ImageHasSize", a), a.imgHidden && (b.content && b.content.removeClass("mfp-loading"), a.imgHidden = !1))
            },
            findImageSize: function(a) {
                var c = 0,
                    d = a.img[0],
                    e = function(f) {
                        L && clearInterval(L), L = setInterval(function() {
                            return d.naturalWidth > 0 ? void b._onImageHasSize(a) : (c > 200 && clearInterval(L), c++, void(3 === c ? e(10) : 40 === c ? e(50) : 100 === c && e(500)))
                        }, f)
                    };
                e(1)
            },
            getImage: function(c, d) {
                var e = 0,
                    f = function() {
                        c && (c.img[0].complete ? (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("ready")), c.hasSize = !0, c.loaded = !0) : (e++, 200 > e ? setTimeout(f, 100) : g()))
                    },
                    g = function() {
                        c && (c.img.off(".mfploader"), c === b.currItem && (b._onImageHasSize(c), b.updateStatus("error", h.tError.replace("%url%", c.src))), c.hasSize = !0, c.loaded = !0, c.loadError = !0)
                    },
                    h = b.st.image,
                    i = d.find(".mfp-img");
                if (i.length) {
                    var j = new Image;
                    j.className = "mfp-img", c.img = a(j).on("load.mfploader", f).on("error.mfploader", g), j.src = c.src, i.is("img") && (c.img = c.img.clone())
                }
                return b._parseMarkup(d, {
                    title: M(c),
                    img_replaceWith: c.img
                }, c), b.resizeImage(), c.hasSize ? (L && clearInterval(L), c.loadError ? (d.addClass("mfp-loading"), b.updateStatus("error", h.tError.replace("%url%", c.src))) : (d.removeClass("mfp-loading"), b.updateStatus("ready")), d) : (b.updateStatus("loading"), c.loading = !0, c.hasSize || (c.imgHidden = !0, d.addClass("mfp-loading"), b.findImageSize(c)), d)
            }
        }
    });
    var N = "iframe",
        O = "//about:blank",
        P = function(a) {
            if (b.currTemplate[N]) {
                var c = b.currTemplate[N].find("iframe");
                c.length && (a || (c[0].src = O), b.isIE8 && c.css("display", a ? "block" : "none"))
            }
        };
    a.magnificPopup.registerModule(N, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                b.types.push(N), w("BeforeChange", function(a, b, c) {
                    b !== c && (b === N ? P() : c === N && P(!0))
                }), w(i + "." + N, function() {
                    P()
                })
            },
            getIframe: function(c, d) {
                var e = c.src,
                    f = b.st.iframe;
                a.each(f.patterns, function() {
                    return e.indexOf(this.index) > -1 ? (this.id && (e = "string" == typeof this.id ? e.substr(e.lastIndexOf(this.id) + this.id.length, e.length) : this.id.call(this, e)), e = this.src.replace("%id%", e), !1) : void 0
                });
                var g = {};
                return f.srcAction && (g[f.srcAction] = e), b._parseMarkup(d, g, c), b.updateStatus("ready"), d
            }
        }
    });
    var Q = function(a) {
            var c = b.items.length;
            return a > c - 1 ? a - c : 0 > a ? c + a : a
        },
        R = function(a, b, c) {
            return a.replace("%curr%", b + 1).replace("%total%", c)
        };
    a.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var c = b.st.gallery,
                    d = ".mfp-gallery",
                    f = Boolean(a.fn.mfpFastClick);
                return b.direction = !0, c && c.enabled ? (g += " mfp-gallery", w(m + d, function() {
                    c.navigateByImgClick && b.wrap.on("click" + d, ".mfp-img", function() {
                        return b.items.length > 1 ? (b.next(), !1) : void 0
                    }), e.on("keydown" + d, function(a) {
                        37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next()
                    })
                }), w("UpdateStatus" + d, function(a, c) {
                    c.text && (c.text = R(c.text, b.currItem.index, b.items.length))
                }), w(l + d, function(a, d, e, f) {
                    var g = b.items.length;
                    e.counter = g > 1 ? R(c.tCounter, f.index, g) : ""
                }), w("BuildControls" + d, function() {
                    if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                        var d = c.arrowMarkup,
                            e = b.arrowLeft = a(d.replace("%title%", c.tPrev).replace("%dir%", "left")).addClass(s),
                            g = b.arrowRight = a(d.replace("%title%", c.tNext).replace("%dir%", "right")).addClass(s),
                            h = f ? "mfpFastClick" : "click";
                        e[h](function() {
                            b.prev()
                        }), g[h](function() {
                            b.next()
                        }), b.isIE7 && (x("b", e[0], !1, !0), x("a", e[0], !1, !0), x("b", g[0], !1, !0), x("a", g[0], !1, !0)), b.container.append(e.add(g))
                    }
                }), w(n + d, function() {
                    b._preloadTimeout && clearTimeout(b._preloadTimeout), b._preloadTimeout = setTimeout(function() {
                        b.preloadNearbyImages(), b._preloadTimeout = null
                    }, 16)
                }), void w(i + d, function() {
                    e.off(d), b.wrap.off("click" + d), b.arrowLeft && f && b.arrowLeft.add(b.arrowRight).destroyMfpFastClick(), b.arrowRight = b.arrowLeft = null
                })) : !1
            },
            next: function() {
                b.direction = !0, b.index = Q(b.index + 1), b.updateItemHTML()
            },
            prev: function() {
                b.direction = !1, b.index = Q(b.index - 1), b.updateItemHTML()
            },
            goTo: function(a) {
                b.direction = a >= b.index, b.index = a, b.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var a, c = b.st.gallery.preload,
                    d = Math.min(c[0], b.items.length),
                    e = Math.min(c[1], b.items.length);
                for (a = 1;
                    (b.direction ? e : d) >= a; a++) b._preloadItem(b.index + a);
                for (a = 1;
                    (b.direction ? d : e) >= a; a++) b._preloadItem(b.index - a)
            },
            _preloadItem: function(c) {
                if (c = Q(c), !b.items[c].preloaded) {
                    var d = b.items[c];
                    d.parsed || (d = b.parseEl(c)), y("LazyLoad", d), "image" === d.type && (d.img = a('<img class="mfp-img" />').on("load.mfploader", function() {
                        d.hasSize = !0
                    }).on("error.mfploader", function() {
                        d.hasSize = !0, d.loadError = !0
                    }).attr("src", d.src)), d.preloaded = !0
                }
            }
        }
    });
    var S = "retina";
    a.magnificPopup.registerModule(S, {
            options: {
                replaceSrc: function(a) {
                    return a.src.replace(/\.\w+$/, function(a) {
                        return "@2x" + a
                    })
                },
                ratio: 1
            },
            proto: {
                initRetina: function() {
                    if (window.devicePixelRatio > 1) {
                        var a = b.st.retina,
                            c = a.ratio;
                        c = isNaN(c) ? c() : c, c > 1 && (w("ImageHasSize." + S, function(a, b) {
                            b.img.css({
                                "max-width": b.img[0].naturalWidth / c,
                                width: "100%"
                            })
                        }), w("ElementParse." + S, function(b, d) {
                            d.src = a.replaceSrc(d, c)
                        }))
                    }
                }
            }
        }),
        function() {
            var b = 1e3,
                c = "ontouchstart" in window,
                d = function() {
                    v.off("touchmove" + f + " touchend" + f)
                },
                e = "mfpFastClick",
                f = "." + e;
            a.fn.mfpFastClick = function(e) {
                return a(this).each(function() {
                    var g, h = a(this);
                    if (c) {
                        var i, j, k, l, m, n;
                        h.on("touchstart" + f, function(a) {
                            l = !1, n = 1, m = a.originalEvent ? a.originalEvent.touches[0] : a.touches[0], j = m.clientX, k = m.clientY, v.on("touchmove" + f, function(a) {
                                m = a.originalEvent ? a.originalEvent.touches : a.touches, n = m.length, m = m[0], (Math.abs(m.clientX - j) > 10 || Math.abs(m.clientY - k) > 10) && (l = !0, d())
                            }).on("touchend" + f, function(a) {
                                d(), l || n > 1 || (g = !0, a.preventDefault(), clearTimeout(i), i = setTimeout(function() {
                                    g = !1
                                }, b), e())
                            })
                        })
                    }
                    h.on("click" + f, function() {
                        g || e()
                    })
                })
            }, a.fn.destroyMfpFastClick = function() {
                a(this).off("touchstart" + f + " click" + f), c && v.off("touchmove" + f + " touchend" + f)
            }
        }()
}(window.jQuery || window.Zepto),
function(a, b, c, d) {
    "use strict";

    function e(b, c, d) {
        this.element = a(b), this._defaults = g, this._name = f, this.settings = a.extend({}, g, d), this.path = c, this.init()
    }
    var f = "vide",
        g = {
            volume: 1,
            playbackRate: 1,
            muted: !0,
            loop: !0,
            autoplay: !0,
            position: "50% 50%"
        },
        h = /iPad|iPhone|iPod/i.test(d.userAgent),
        i = /Android/i.test(d.userAgent);
    a[f] = {
        lookup: []
    };
    var j = function(a) {
            var b, c, d = {};
            b = a.replace(/\s*:\s*/g, ":").replace(/\s*,\s*/g, ","), c = b.split(",");
            var e, f, g;
            for (e = 0, f = c.length; f > e; e++) c[e] = c[e].split(":"), g = c[e][1], ("string" == typeof g || g instanceof String) && (g = "true" === g || ("false" === g ? !1 : g)), ("string" == typeof g || g instanceof String) && (g = isNaN(g) ? g : +g), d[c[e][0]] = g;
            return d
        },
        k = function(a) {
            var b = a.split(" ");
            switch (b[0]) {
                case "left":
                    b[0] = "0%";
                    break;
                case "center":
                    b[0] = "50%";
                    break;
                case "right":
                    b[0] = "100%"
            }
            switch (b[1]) {
                case "top":
                    b[1] = "0";
                    break;
                case "middle":
                    b[1] = "50%";
                    break;
                case "bottom":
                    b[1] = "100%"
            }
            return {
                x: b[0],
                y: b[1]
            }
        };
    e.prototype.init = function() {
        var b = this;
        if (this.wrapper = a("<div>"), this.wrapper.css({
                position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                overflow: "hidden",
                "-webkit-background-size": "cover",
                "-moz-background-size": "cover",
                "-o-background-size": "cover",
                "background-size": "cover",
                "background-repeat": "no-repeat",
                "background-position": "center center"
            }), "static" === this.element.css("position") && this.element.css("position", "relative"), this.element.prepend(this.wrapper), !h && !i) {
            this.video = a(".homepage-cover video"), this.wrapper.append(this.video);
            var c = k(this.settings.position);
            this.video.css({
                margin: "auto",
                position: "absolute",
                top: c.y,
                left: c.x,
                "-webkit-transform": "translate(-" + c.x + ", -" + c.y + ")",
                "-ms-transform": "translate(-" + c.x + ", -" + c.y + ")",
                transform: "translate(-" + c.x + ", -" + c.y + ")"
            }), this.video.bind("loadedmetadata." + f, function() {
                b.video.css("visibility", "visible"), b.resize()
            }), a(this.element).bind("resize." + f, function() {
                b.resize()
            })
        }
    }, e.prototype.getVideoObject = function() {
        return this.video ? this.video[0] : null
    }, e.prototype.resize = function() {
        if (this.video) {
            var a = this.video[0].videoHeight,
                b = this.video[0].videoWidth,
                c = this.wrapper.height(),
                d = this.wrapper.width();
            d / b > c / a ? this.video.css({
                width: d + 2,
                height: "auto"
            }) : this.video.css({
                width: "auto",
                height: c + 2
            })
        }
    }, e.prototype.destroy = function() {
        this.element.unbind(f), this.video.unbind(f), delete a[f].lookup[this.index], this.element.removeData(f), this.wrapper.remove()
    }, a.fn[f] = function(b, c) {
        var d;
        return this.each(function() {
            d = a.data(this, f), d && d.destroy(), d = new e(this, b, c), d.index = a[f].lookup.push(d) - 1, a.data(this, f, d)
        }), this
    }, a(c).ready(function() {
        a(b).bind("resize." + f, function() {
            for (var b, c = a[f].lookup.length, d = 0; c > d; d++) b = a[f].lookup[d], b && b.resize()
        }), a(c).find("[data-" + f + "-bg]").each(function(b, c) {
            var d = a(c),
                e = d.data(f + "-options"),
                g = d.data(f + "-bg");
            e = e ? j(e) : {}, d[f](g, e)
        })
    })
}(jQuery || Zepto, window, document, navigator), jQuery(document).ready(function(a) {
        function b(a) {
            a.wrap("<div class='table-wrapper' />");
            var b = a.clone();
            b.find("td:not(:first-child), th:not(:first-child)").css("display", "none"), b.removeClass("responsive"), a.closest(".table-wrapper").append(b), b.wrap("<div class='pinned' />"), a.wrap("<div class='scrollable' />"), d(a, b)
        }

        function c(a) {
            a.closest(".table-wrapper").find(".pinned").remove(), a.unwrap(), a.unwrap()
        }

        function d(b, c) {
            var d = b.find("tr"),
                e = c.find("tr"),
                f = [];
            d.each(function(b) {
                var c = a(this),
                    d = c.find("th, td");
                d.each(function() {
                    var c = a(this).outerHeight(!0);
                    f[b] = f[b] || 0, c > f[b] && (f[b] = c)
                })
            }), e.each(function(b) {
                a(this).height(f[b])
            }), d.each(function(b) {
                a(this).height(f[b])
            })
        }
        var e = !1,
            f = function() {
                return a(window).width() < 767 && !e ? (e = !0, a("table.responsive").each(function(c, d) {
                    b(a(d))
                }), !0) : void(e && a(window).width() > 767 && (e = !1, a("table.responsive").each(function(b, d) {
                    c(a(d))
                })))
            };
        a(window).load(f), a(window).on("redraw", function() {
            e = !1, f()
        }), a(window).on("resize", f)
    }), ! function(a) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery)
    }(function(a) {
        "use strict";
        var b = window.Slick || {};
        b = function() {
            function b(b, d) {
                var e, f, g, h = this;
                if (h.defaults = {
                        accessibility: !0,
                        adaptiveHeight: !1,
                        appendArrows: a(b),
                        appendDots: a(b),
                        arrows: !0,
                        asNavFor: null,
                        prevArrow: '<button type="button" data-role="none" class="slick-prev">Previous</button>',
                        nextArrow: '<button type="button" data-role="none" class="slick-next">Next</button>',
                        autoplay: !1,
                        autoplaySpeed: 3e3,
                        centerMode: !1,
                        centerPadding: "50px",
                        cssEase: "ease",
                        customPaging: function(a, b) {
                            return '<button type="button" data-role="none">' + (b + 1) + "</button>"
                        },
                        dots: !1,
                        dotsClass: "slick-dots",
                        draggable: !0,
                        easing: "linear",
                        edgeFriction: .35,
                        fade: !1,
                        focusOnSelect: !1,
                        infinite: !0,
                        initialSlide: 0,
                        lazyLoad: "ondemand",
                        mobileFirst: !1,
                        pauseOnHover: !0,
                        pauseOnDotsHover: !1,
                        respondTo: "window",
                        responsive: null,
                        rtl: !1,
                        slide: "",
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        speed: 500,
                        swipe: !0,
                        swipeToSlide: !1,
                        touchMove: !0,
                        touchThreshold: 5,
                        useCSS: !0,
                        variableWidth: !1,
                        vertical: !1,
                        waitForAnimate: !0
                    }, h.initials = {
                        animating: !1,
                        dragging: !1,
                        autoPlayTimer: null,
                        currentDirection: 0,
                        currentLeft: null,
                        currentSlide: 0,
                        direction: 1,
                        $dots: null,
                        listWidth: null,
                        listHeight: null,
                        loadIndex: 0,
                        $nextArrow: null,
                        $prevArrow: null,
                        slideCount: null,
                        slideWidth: null,
                        $slideTrack: null,
                        $slides: null,
                        sliding: !1,
                        slideOffset: 0,
                        swipeLeft: null,
                        $list: null,
                        touchObject: {},
                        transformsEnabled: !1
                    }, a.extend(h, h.initials), h.activeBreakpoint = null, h.animType = null, h.animProp = null, h.breakpoints = [], h.breakpointSettings = [], h.cssTransitions = !1, h.hidden = "hidden", h.paused = !1, h.positionProp = null, h.respondTo = null, h.shouldClick = !0, h.$slider = a(b), h.$slidesCache = null, h.transformType = null, h.transitionType = null, h.visibilityChange = "visibilitychange", h.windowWidth = 0, h.windowTimer = null, e = a(b).data("slick") || {}, h.options = a.extend({}, h.defaults, e, d), h.currentSlide = h.options.initialSlide, h.originalSettings = h.options, f = h.options.responsive || null, f && f.length > -1) {
                    h.respondTo = h.options.respondTo || "window";
                    for (g in f) f.hasOwnProperty(g) && (h.breakpoints.push(f[g].breakpoint), h.breakpointSettings[f[g].breakpoint] = f[g].settings);
                    h.breakpoints.sort(function(a, b) {
                        return h.options.mobileFirst === !0 ? a - b : b - a
                    })
                }
                "undefined" != typeof document.mozHidden ? (h.hidden = "mozHidden", h.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.msHidden ? (h.hidden = "msHidden", h.visibilityChange = "msvisibilitychange") : "undefined" != typeof document.webkitHidden && (h.hidden = "webkitHidden", h.visibilityChange = "webkitvisibilitychange"), h.autoPlay = a.proxy(h.autoPlay, h), h.autoPlayClear = a.proxy(h.autoPlayClear, h), h.changeSlide = a.proxy(h.changeSlide, h), h.clickHandler = a.proxy(h.clickHandler, h), h.selectHandler = a.proxy(h.selectHandler, h), h.setPosition = a.proxy(h.setPosition, h), h.swipeHandler = a.proxy(h.swipeHandler, h), h.dragHandler = a.proxy(h.dragHandler, h), h.keyHandler = a.proxy(h.keyHandler, h), h.autoPlayIterator = a.proxy(h.autoPlayIterator, h), h.instanceUid = c++, h.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, h.init(), h.checkResponsive(!0)
            }
            var c = 0;
            return b
        }(), b.prototype.addSlide = b.prototype.slickAdd = function(b, c, d) {
            var e = this;
            if ("boolean" == typeof c) d = c, c = null;
            else if (0 > c || c >= e.slideCount) return !1;
            e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.append(e.$slides), e.$slides.each(function(b, c) {
                a(c).attr("data-slick-index", b)
            }), e.$slidesCache = e.$slides, e.reinit()
        }, b.prototype.animateHeight = function() {
            var a = this;
            if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
                var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
                a.$list.animate({
                    height: b
                }, a.options.speed)
            }
        }, b.prototype.animateSlide = function(b, c) {
            var d = {},
                e = this;
            e.animateHeight(), e.options.rtl === !0 && e.options.vertical === !1 && (b = -b), e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({
                left: b
            }, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({
                top: b
            }, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft), a({
                animStart: e.currentLeft
            }).animate({
                animStart: b
            }, {
                duration: e.options.speed,
                easing: e.options.easing,
                step: function(a) {
                    a = Math.ceil(a), e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d))
                },
                complete: function() {
                    c && c.call()
                }
            })) : (e.applyTransition(), b = Math.ceil(b), d[e.animType] = e.options.vertical === !1 ? "translate3d(" + b + "px, 0px, 0px)" : "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function() {
                e.disableTransition(), c.call()
            }, e.options.speed))
        }, b.prototype.asNavFor = function(b) {
            var c = this,
                d = null !== c.options.asNavFor ? a(c.options.asNavFor).slick("getSlick") : null;
            null !== d && d.slideHandler(b, !0)
        }, b.prototype.applyTransition = function(a) {
            var b = this,
                c = {};
            c[b.transitionType] = b.options.fade === !1 ? b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : "opacity " + b.options.speed + "ms " + b.options.cssEase, b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
        }, b.prototype.autoPlay = function() {
            var a = this;
            a.autoPlayTimer && clearInterval(a.autoPlayTimer), a.slideCount > a.options.slidesToShow && a.paused !== !0 && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed))
        }, b.prototype.autoPlayClear = function() {
            var a = this;
            a.autoPlayTimer && clearInterval(a.autoPlayTimer)
        }, b.prototype.autoPlayIterator = function() {
            var a = this;
            a.options.infinite === !1 ? 1 === a.direction ? (a.currentSlide + 1 === a.slideCount - 1 && (a.direction = 0), a.slideHandler(a.currentSlide + a.options.slidesToScroll)) : (0 === a.currentSlide - 1 && (a.direction = 1), a.slideHandler(a.currentSlide - a.options.slidesToScroll)) : a.slideHandler(a.currentSlide + a.options.slidesToScroll)
        }, b.prototype.buildArrows = function() {
            var b = this;
            b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow = a(b.options.prevArrow), b.$nextArrow = a(b.options.nextArrow), b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.appendTo(b.options.appendArrows), b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows), b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled"))
        }, b.prototype.buildDots = function() {
            var b, c, d = this;
            if (d.options.dots === !0 && d.slideCount > d.options.slidesToShow) {
                for (c = '<ul class="' + d.options.dotsClass + '">', b = 0; b <= d.getDotCount(); b += 1) c += "<li>" + d.options.customPaging.call(this, d, b) + "</li>";
                c += "</ul>", d.$dots = a(c).appendTo(d.options.appendDots), d.$dots.find("li").first().addClass("slick-active")
            }
        }, b.prototype.buildOut = function() {
            var b = this;
            b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slides.each(function(b, c) {
                a(c).attr("data-slick-index", b)
            }), b.$slidesCache = b.$slides, b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), (b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.updateDots(), b.options.accessibility === !0 && b.$list.prop("tabIndex", 0), b.setSlideClasses("number" == typeof this.currentSlide ? this.currentSlide : 0), b.options.draggable === !0 && b.$list.addClass("draggable")
        }, b.prototype.checkResponsive = function(b) {
            var c, d, e, f = this,
                g = f.$slider.width(),
                h = window.innerWidth || a(window).width();
            if ("window" === f.respondTo ? e = h : "slider" === f.respondTo ? e = g : "min" === f.respondTo && (e = Math.min(h, g)), f.originalSettings.responsive && f.originalSettings.responsive.length > -1 && null !== f.originalSettings.responsive) {
                d = null;
                for (c in f.breakpoints) f.breakpoints.hasOwnProperty(c) && (f.originalSettings.mobileFirst === !1 ? e < f.breakpoints[c] && (d = f.breakpoints[c]) : e > f.breakpoints[c] && (d = f.breakpoints[c]));
                null !== d ? null !== f.activeBreakpoint ? d !== f.activeBreakpoint && (f.activeBreakpoint = d, "unslick" === f.breakpointSettings[d] ? f.unslick() : (f.options = a.extend({}, f.originalSettings, f.breakpointSettings[d]), b === !0 && (f.currentSlide = f.options.initialSlide), f.refresh())) : (f.activeBreakpoint = d, "unslick" === f.breakpointSettings[d] ? f.unslick() : (f.options = a.extend({}, f.originalSettings, f.breakpointSettings[d]), b === !0 && (f.currentSlide = f.options.initialSlide), f.refresh())) : null !== f.activeBreakpoint && (f.activeBreakpoint = null,
                    f.options = f.originalSettings, b === !0 && (f.currentSlide = f.options.initialSlide), f.refresh())
            }
        }, b.prototype.changeSlide = function(b, c) {
            var d, e, f, g = this,
                h = a(b.target);
            switch (h.is("a") && b.preventDefault(), f = 0 !== g.slideCount % g.options.slidesToScroll, d = f ? 0 : (g.slideCount - g.currentSlide) % g.options.slidesToScroll, b.data.message) {
                case "previous":
                    e = 0 === d ? g.options.slidesToScroll : g.options.slidesToShow - d, g.slideCount > g.options.slidesToShow && g.slideHandler(g.currentSlide - e, !1, c);
                    break;
                case "next":
                    e = 0 === d ? g.options.slidesToScroll : d, g.slideCount > g.options.slidesToShow && g.slideHandler(g.currentSlide + e, !1, c);
                    break;
                case "index":
                    var i = 0 === b.data.index ? 0 : b.data.index || a(b.target).parent().index() * g.options.slidesToScroll;
                    g.slideHandler(g.checkNavigable(i), !1, c);
                    break;
                default:
                    return
            }
        }, b.prototype.checkNavigable = function(a) {
            var b, c, d = this;
            if (b = d.getNavigableIndexes(), c = 0, a > b[b.length - 1]) a = b[b.length - 1];
            else
                for (var e in b) {
                    if (a < b[e]) {
                        a = c;
                        break
                    }
                    c = b[e]
                }
            return a
        }, b.prototype.clickHandler = function(a) {
            var b = this;
            b.shouldClick === !1 && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault())
        }, b.prototype.destroy = function() {
            var b = this;
            b.autoPlayClear(), b.touchObject = {}, a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && "object" != typeof b.options.prevArrow && b.$prevArrow.remove(), b.$nextArrow && "object" != typeof b.options.nextArrow && b.$nextArrow.remove(), b.$slides.removeClass("slick-slide slick-active slick-center slick-visible").removeAttr("data-slick-index").css({
                position: "",
                left: "",
                top: "",
                zIndex: "",
                opacity: "",
                width: ""
            }), b.$slider.removeClass("slick-slider"), b.$slider.removeClass("slick-initialized"), b.$list.off(".slick"), a(window).off(".slick-" + b.instanceUid), a(document).off(".slick-" + b.instanceUid), b.$slider.html(b.$slides)
        }, b.prototype.disableTransition = function(a) {
            var b = this,
                c = {};
            c[b.transitionType] = "", b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c)
        }, b.prototype.fadeSlide = function(a, b) {
            var c = this;
            c.cssTransitions === !1 ? (c.$slides.eq(a).css({
                zIndex: 1e3
            }), c.$slides.eq(a).animate({
                opacity: 1
            }, c.options.speed, c.options.easing, b)) : (c.applyTransition(a), c.$slides.eq(a).css({
                opacity: 1,
                zIndex: 1e3
            }), b && setTimeout(function() {
                c.disableTransition(a), b.call()
            }, c.options.speed))
        }, b.prototype.filterSlides = b.prototype.slickFilter = function(a) {
            var b = this;
            null !== a && (b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit())
        }, b.prototype.getCurrent = b.prototype.slickCurrentSlide = function() {
            var a = this;
            return a.currentSlide
        }, b.prototype.getDotCount = function() {
            var a = this,
                b = 0,
                c = 0,
                d = 0;
            if (a.options.infinite === !0) d = Math.ceil(a.slideCount / a.options.slidesToScroll);
            else if (a.options.centerMode === !0) d = a.slideCount;
            else
                for (; b < a.slideCount;) ++d, b = c + a.options.slidesToShow, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow;
            return d - 1
        }, b.prototype.getLeft = function(a) {
            var b, c, d, e = this,
                f = 0;
            return e.slideOffset = 0, c = e.$slides.first().outerHeight(), e.options.infinite === !0 ? (e.slideCount > e.options.slidesToShow && (e.slideOffset = -1 * e.slideWidth * e.options.slidesToShow, f = -1 * c * e.options.slidesToShow), 0 !== e.slideCount % e.options.slidesToScroll && a + e.options.slidesToScroll > e.slideCount && e.slideCount > e.options.slidesToShow && (a > e.slideCount ? (e.slideOffset = -1 * (e.options.slidesToShow - (a - e.slideCount)) * e.slideWidth, f = -1 * (e.options.slidesToShow - (a - e.slideCount)) * c) : (e.slideOffset = -1 * e.slideCount % e.options.slidesToScroll * e.slideWidth, f = -1 * e.slideCount % e.options.slidesToScroll * c))) : a + e.options.slidesToShow > e.slideCount && (e.slideOffset = (a + e.options.slidesToShow - e.slideCount) * e.slideWidth, f = (a + e.options.slidesToShow - e.slideCount) * c), e.slideCount <= e.options.slidesToShow && (e.slideOffset = 0, f = 0), e.options.centerMode === !0 && e.options.infinite === !0 ? e.slideOffset += e.slideWidth * Math.floor(e.options.slidesToShow / 2) - e.slideWidth : e.options.centerMode === !0 && (e.slideOffset = 0, e.slideOffset += e.slideWidth * Math.floor(e.options.slidesToShow / 2)), b = e.options.vertical === !1 ? -1 * a * e.slideWidth + e.slideOffset : -1 * a * c + f, e.options.variableWidth === !0 && (d = e.slideCount <= e.options.slidesToShow || e.options.infinite === !1 ? e.$slideTrack.children(".slick-slide").eq(a) : e.$slideTrack.children(".slick-slide").eq(a + e.options.slidesToShow), b = d[0] ? -1 * d[0].offsetLeft : 0, e.options.centerMode === !0 && (d = e.options.infinite === !1 ? e.$slideTrack.children(".slick-slide").eq(a) : e.$slideTrack.children(".slick-slide").eq(a + e.options.slidesToShow + 1), b = d[0] ? -1 * d[0].offsetLeft : 0, b += (e.$list.width() - d.outerWidth()) / 2)), b
        }, b.prototype.getOption = b.prototype.slickGetOption = function(a) {
            var b = this;
            return b.options[a]
        }, b.prototype.getNavigableIndexes = function() {
            var a, b = this,
                c = 0,
                d = 0,
                e = [];
            for (b.options.infinite === !1 ? (a = b.slideCount - b.options.slidesToShow + 1, b.options.centerMode === !0 && (a = b.slideCount)) : (c = -1 * b.slideCount, d = -1 * b.slideCount, a = 2 * b.slideCount); a > c;) e.push(c), c = d + b.options.slidesToScroll, d += b.options.slidesToScroll <= b.options.slidesToShow ? b.options.slidesToScroll : b.options.slidesToShow;
            return e
        }, b.prototype.getSlick = function() {
            return this
        }, b.prototype.getSlideCount = function() {
            var b, c, d, e = this;
            return d = e.options.centerMode === !0 ? e.slideWidth * Math.floor(e.options.slidesToShow / 2) : 0, e.options.swipeToSlide === !0 ? (e.$slideTrack.find(".slick-slide").each(function(b, f) {
                return f.offsetLeft - d + a(f).outerWidth() / 2 > -1 * e.swipeLeft ? (c = f, !1) : void 0
            }), b = Math.abs(a(c).attr("data-slick-index") - e.currentSlide) || 1) : e.options.slidesToScroll
        }, b.prototype.goTo = b.prototype.slickGoTo = function(a, b) {
            var c = this;
            c.changeSlide({
                data: {
                    message: "index",
                    index: parseInt(a)
                }
            }, b)
        }, b.prototype.init = function() {
            var b = this;
            a(b.$slider).hasClass("slick-initialized") || (a(b.$slider).addClass("slick-initialized"), b.buildOut(), b.setProps(), b.startLoad(), b.loadSlider(), b.initializeEvents(), b.updateArrows(), b.updateDots()), b.$slider.trigger("init", [b])
        }, b.prototype.initArrowEvents = function() {
            var a = this;
            a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.on("click.slick", {
                message: "previous"
            }, a.changeSlide), a.$nextArrow.on("click.slick", {
                message: "next"
            }, a.changeSlide))
        }, b.prototype.initDotEvents = function() {
            var b = this;
            b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", {
                message: "index"
            }, b.changeSlide), b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && b.options.autoplay === !0 && a("li", b.$dots).on("mouseenter.slick", function() {
                b.paused = !0, b.autoPlayClear()
            }).on("mouseleave.slick", function() {
                b.paused = !1, b.autoPlay()
            })
        }, b.prototype.initializeEvents = function() {
            var b = this;
            b.initArrowEvents(), b.initDotEvents(), b.$list.on("touchstart.slick mousedown.slick", {
                action: "start"
            }, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", {
                action: "move"
            }, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", {
                action: "end"
            }, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", {
                action: "end"
            }, b.swipeHandler), b.$list.on("click.slick", b.clickHandler), b.options.autoplay === !0 && (a(document).on(b.visibilityChange, function() {
                b.visibility()
            }), b.options.pauseOnHover === !0 && (b.$list.on("mouseenter.slick", function() {
                b.paused = !0, b.autoPlayClear()
            }), b.$list.on("mouseleave.slick", function() {
                b.paused = !1, b.autoPlay()
            }))), b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, function() {
                b.checkResponsive(), b.setPosition()
            }), a(window).on("resize.slick.slick-" + b.instanceUid, function() {
                a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function() {
                    b.windowWidth = a(window).width(), b.checkResponsive(), b.setPosition()
                }, 50))
            }), a("*[draggable!=true]", b.$slideTrack).on("dragstart", function(a) {
                a.preventDefault()
            }), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition)
        }, b.prototype.initUI = function() {
            var a = this;
            a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show(), a.options.autoplay === !0 && a.autoPlay()
        }, b.prototype.keyHandler = function(a) {
            var b = this;
            37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({
                data: {
                    message: "previous"
                }
            }) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({
                data: {
                    message: "next"
                }
            })
        }, b.prototype.lazyLoad = function() {
            function b(b) {
                a("img[data-lazy]", b).each(function() {
                    var b = a(this),
                        c = a(this).attr("data-lazy");
                    b.load(function() {
                        b.animate({
                            opacity: 1
                        }, 200)
                    }).css({
                        opacity: 0
                    }).attr("src", c).removeAttr("data-lazy").removeClass("slick-loading")
                })
            }
            var c, d, e, f, g = this;
            g.options.centerMode === !0 ? g.options.infinite === !0 ? (e = g.currentSlide + (g.options.slidesToShow / 2 + 1), f = e + g.options.slidesToShow + 2) : (e = Math.max(0, g.currentSlide - (g.options.slidesToShow / 2 + 1)), f = 2 + (g.options.slidesToShow / 2 + 1) + g.currentSlide) : (e = g.options.infinite ? g.options.slidesToShow + g.currentSlide : g.currentSlide, f = e + g.options.slidesToShow, g.options.fade === !0 && (e > 0 && e--, f <= g.slideCount && f++)), c = g.$slider.find(".slick-slide").slice(e, f), b(c), g.slideCount <= g.options.slidesToShow ? (d = g.$slider.find(".slick-slide"), b(d)) : g.currentSlide >= g.slideCount - g.options.slidesToShow ? (d = g.$slider.find(".slick-cloned").slice(0, g.options.slidesToShow), b(d)) : 0 === g.currentSlide && (d = g.$slider.find(".slick-cloned").slice(-1 * g.options.slidesToShow), b(d))
        }, b.prototype.loadSlider = function() {
            var a = this;
            a.setPosition(), a.$slideTrack.css({
                opacity: 1
            }), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad()
        }, b.prototype.next = b.prototype.slickNext = function() {
            var a = this;
            a.changeSlide({
                data: {
                    message: "next"
                }
            })
        }, b.prototype.pause = b.prototype.slickPause = function() {
            var a = this;
            a.autoPlayClear(), a.paused = !0
        }, b.prototype.play = b.prototype.slickPlay = function() {
            var a = this;
            a.paused = !1, a.autoPlay()
        }, b.prototype.postSlide = function(a) {
            var b = this;
            b.$slider.trigger("afterChange", [b, a]), b.animating = !1, b.setPosition(), b.swipeLeft = null, b.options.autoplay === !0 && b.paused === !1 && b.autoPlay()
        }, b.prototype.prev = b.prototype.slickPrev = function() {
            var a = this;
            a.changeSlide({
                data: {
                    message: "previous"
                }
            })
        }, b.prototype.progressiveLazyLoad = function() {
            var b, c, d = this;
            b = a("img[data-lazy]", d.$slider).length, b > 0 && (c = a("img[data-lazy]", d.$slider).first(), c.attr("src", c.attr("data-lazy")).removeClass("slick-loading").load(function() {
                c.removeAttr("data-lazy"), d.progressiveLazyLoad()
            }).error(function() {
                c.removeAttr("data-lazy"), d.progressiveLazyLoad()
            }))
        }, b.prototype.refresh = function() {
            var b = this,
                c = b.currentSlide;
            b.destroy(), a.extend(b, b.initials), b.init(), b.changeSlide({
                data: {
                    message: "index",
                    index: c
                }
            }, !0)
        }, b.prototype.reinit = function() {
            var b = this;
            b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"), b.slideCount = b.$slides.length, b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll), b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0), b.setProps(), b.setupInfinite(), b.buildArrows(), b.updateArrows(), b.initArrowEvents(), b.buildDots(), b.updateDots(), b.initDotEvents(), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), b.setSlideClasses(0), b.setPosition(), b.$slider.trigger("reInit", [b])
        }, b.prototype.removeSlide = b.prototype.slickRemove = function(a, b, c) {
            var d = this;
            return "boolean" == typeof a ? (b = a, a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a, d.slideCount < 1 || 0 > a || a > d.slideCount - 1 ? !1 : (d.unload(), c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(), d.$slides = d.$slideTrack.children(this.options.slide), d.$slideTrack.children(this.options.slide).detach(), d.$slideTrack.append(d.$slides), d.$slidesCache = d.$slides, void d.reinit())
        }, b.prototype.setCSS = function(a) {
            var b, c, d = this,
                e = {};
            d.options.rtl === !0 && (a = -a), b = "left" == d.positionProp ? Math.ceil(a) + "px" : "0px", c = "top" == d.positionProp ? Math.ceil(a) + "px" : "0px", e[d.positionProp] = a, d.transformsEnabled === !1 ? d.$slideTrack.css(e) : (e = {}, d.cssTransitions === !1 ? (e[d.animType] = "translate(" + b + ", " + c + ")", d.$slideTrack.css(e)) : (e[d.animType] = "translate3d(" + b + ", " + c + ", 0px)", d.$slideTrack.css(e)))
        }, b.prototype.setDimensions = function() {
            var a = this;
            if (a.options.vertical === !1 ? a.options.centerMode === !0 && a.$list.css({
                    padding: "0px " + a.options.centerPadding
                }) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow), a.options.centerMode === !0 && a.$list.css({
                    padding: a.options.centerPadding + " 0px"
                })), a.listWidth = a.$list.width(), a.listHeight = a.$list.height(), a.options.vertical === !1 && a.options.variableWidth === !1) a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow), a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length));
            else if (a.options.variableWidth === !0) {
                var b = 0;
                a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow), a.$slideTrack.children(".slick-slide").each(function() {
                    b += a.listWidth
                }), a.$slideTrack.width(Math.ceil(b) + 1)
            } else a.slideWidth = Math.ceil(a.listWidth), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length));
            var c = a.$slides.first().outerWidth(!0) - a.$slides.first().width();
            a.options.variableWidth === !1 && a.$slideTrack.children(".slick-slide").width(a.slideWidth - c)
        }, b.prototype.setFade = function() {
            var b, c = this;
            c.$slides.each(function(d, e) {
                b = -1 * c.slideWidth * d, c.options.rtl === !0 ? a(e).css({
                    position: "relative",
                    right: b,
                    top: 0,
                    zIndex: 800,
                    opacity: 0
                }) : a(e).css({
                    position: "relative",
                    left: b,
                    top: 0,
                    zIndex: 800,
                    opacity: 0
                })
            }), c.$slides.eq(c.currentSlide).css({
                zIndex: 900,
                opacity: 1
            })
        }, b.prototype.setHeight = function() {
            var a = this;
            if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) {
                var b = a.$slides.eq(a.currentSlide).outerHeight(!0);
                a.$list.css("height", b)
            }
        }, b.prototype.setOption = b.prototype.slickSetOption = function(a, b, c) {
            var d = this;
            d.options[a] = b, c === !0 && (d.unload(), d.reinit())
        }, b.prototype.setPosition = function() {
            var a = this;
            a.setDimensions(), a.setHeight(), a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), a.$slider.trigger("setPosition", [a])
        }, b.prototype.setProps = function() {
            var a = this,
                b = document.body.style;
            a.positionProp = a.options.vertical === !0 ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0), void 0 !== b.OTransform && (a.animType = "OTransform", a.transformType = "-o-transform", a.transitionType = "OTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition", void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)), void 0 !== b.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.msTransform && (a.animType = "msTransform", a.transformType = "-ms-transform", a.transitionType = "msTransition", void 0 === b.msTransform && (a.animType = !1)), void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = null !== a.animType && a.animType !== !1
        }, b.prototype.setSlideClasses = function(a) {
            var b, c, d, e, f = this;
            f.$slider.find(".slick-slide").removeClass("slick-active").removeClass("slick-center"), c = f.$slider.find(".slick-slide"), f.options.centerMode === !0 ? (b = Math.floor(f.options.slidesToShow / 2), f.options.infinite === !0 && (a >= b && a <= f.slideCount - 1 - b ? f.$slides.slice(a - b, a + b + 1).addClass("slick-active") : (d = f.options.slidesToShow + a, c.slice(d - b + 1, d + b + 2).addClass("slick-active")), 0 === a ? c.eq(c.length - 1 - f.options.slidesToShow).addClass("slick-center") : a === f.slideCount - 1 && c.eq(f.options.slidesToShow).addClass("slick-center")), f.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= f.slideCount - f.options.slidesToShow ? f.$slides.slice(a, a + f.options.slidesToShow).addClass("slick-active") : c.length <= f.options.slidesToShow ? c.addClass("slick-active") : (e = f.slideCount % f.options.slidesToShow, d = f.options.infinite === !0 ? f.options.slidesToShow + a : a, f.options.slidesToShow == f.options.slidesToScroll && f.slideCount - a < f.options.slidesToShow ? c.slice(d - (f.options.slidesToShow - e), d + e).addClass("slick-active") : c.slice(d, d + f.options.slidesToShow).addClass("slick-active")), "ondemand" === f.options.lazyLoad && f.lazyLoad()
        }, b.prototype.setupInfinite = function() {
            var b, c, d, e = this;
            if (e.options.fade === !0 && (e.options.centerMode = !1), e.options.infinite === !0 && e.options.fade === !1 && (c = null, e.slideCount > e.options.slidesToShow)) {
                for (d = e.options.centerMode === !0 ? e.options.slidesToShow + 1 : e.options.slidesToShow, b = e.slideCount; b > e.slideCount - d; b -= 1) c = b - 1, a(e.$slides[c]).clone(!0).attr("id", "").attr("data-slick-index", c - e.slideCount).prependTo(e.$slideTrack).addClass("slick-cloned");
                for (b = 0; d > b; b += 1) c = b, a(e.$slides[c]).clone(!0).attr("id", "").attr("data-slick-index", c + e.slideCount).appendTo(e.$slideTrack).addClass("slick-cloned");
                e.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                    a(this).attr("id", "")
                })
            }
        }, b.prototype.selectHandler = function(b) {
            var c = this,
                d = parseInt(a(b.target).parents(".slick-slide").attr("data-slick-index"));
            return d || (d = 0), c.slideCount <= c.options.slidesToShow ? (c.$slider.find(".slick-slide").removeClass("slick-active"), c.$slides.eq(d).addClass("slick-active"), c.options.centerMode === !0 && (c.$slider.find(".slick-slide").removeClass("slick-center"), c.$slides.eq(d).addClass("slick-center")), void c.asNavFor(d)) : void c.slideHandler(d)
        }, b.prototype.slideHandler = function(a, b, c) {
            var d, e, f, g, h = null,
                i = this;
            return b = b || !1, i.animating === !0 && i.options.waitForAnimate === !0 || i.options.fade === !0 && i.currentSlide === a || i.slideCount <= i.options.slidesToShow ? void 0 : (b === !1 && i.asNavFor(a), d = a, h = i.getLeft(d), g = i.getLeft(i.currentSlide), i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft, i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll) ? void(i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function() {
                i.postSlide(d)
            }) : i.postSlide(d))) : i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll) ? void(i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function() {
                i.postSlide(d)
            }) : i.postSlide(d))) : (i.options.autoplay === !0 && clearInterval(i.autoPlayTimer), e = 0 > d ? 0 !== i.slideCount % i.options.slidesToScroll ? i.slideCount - i.slideCount % i.options.slidesToScroll : i.slideCount + d : d >= i.slideCount ? 0 !== i.slideCount % i.options.slidesToScroll ? 0 : d - i.slideCount : d, i.animating = !0, i.$slider.trigger("beforeChange", [i, i.currentSlide, e]), f = i.currentSlide, i.currentSlide = e, i.setSlideClasses(i.currentSlide), i.updateDots(), i.updateArrows(), i.options.fade === !0 ? (c !== !0 ? i.fadeSlide(e, function() {
                i.postSlide(e)
            }) : i.postSlide(e), void i.animateHeight()) : void(c !== !0 ? i.animateSlide(h, function() {
                i.postSlide(e)
            }) : i.postSlide(e))))
        }, b.prototype.startLoad = function() {
            var a = this;
            a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading")
        }, b.prototype.swipeDirection = function() {
            var a, b, c, d, e = this;
            return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), 0 > d && (d = 360 - Math.abs(d)), 45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : "vertical"
        }, b.prototype.swipeEnd = function() {
            var a, b = this;
            if (b.dragging = !1, b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0, void 0 === b.touchObject.curX) return !1;
            if (b.touchObject.edgeHit === !0 && b.$slider.trigger("edge", [b, b.swipeDirection()]), b.touchObject.swipeLength >= b.touchObject.minSwipe) switch (b.swipeDirection()) {
                case "left":
                    a = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide + b.getSlideCount()) : b.currentSlide + b.getSlideCount(), b.slideHandler(a), b.currentDirection = 0, b.touchObject = {}, b.$slider.trigger("swipe", [b, "left"]);
                    break;
                case "right":
                    a = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide - b.getSlideCount()) : b.currentSlide - b.getSlideCount(), b.slideHandler(a), b.currentDirection = 1, b.touchObject = {}, b.$slider.trigger("swipe", [b, "right"])
            } else b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide), b.touchObject = {})
        }, b.prototype.swipeHandler = function(a) {
            var b = this;
            if (!(b.options.swipe === !1 || "ontouchend" in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))) switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, a.data.action) {
                case "start":
                    b.swipeStart(a);
                    break;
                case "move":
                    b.swipeMove(a);
                    break;
                case "end":
                    b.swipeEnd(a)
            }
        }, b.prototype.swipeMove = function(a) {
            var b, c, d, e, f, g = this;
            return f = void 0 !== a.originalEvent ? a.originalEvent.touches : null, !g.dragging || f && 1 !== f.length ? !1 : (b = g.getLeft(g.currentSlide), g.touchObject.curX = void 0 !== f ? f[0].pageX : a.clientX, g.touchObject.curY = void 0 !== f ? f[0].pageY : a.clientY, g.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(g.touchObject.curX - g.touchObject.startX, 2))), c = g.swipeDirection(), "vertical" !== c ? (void 0 !== a.originalEvent && g.touchObject.swipeLength > 4 && a.preventDefault(), e = (g.options.rtl === !1 ? 1 : -1) * (g.touchObject.curX > g.touchObject.startX ? 1 : -1), d = g.touchObject.swipeLength, g.touchObject.edgeHit = !1, g.options.infinite === !1 && (0 === g.currentSlide && "right" === c || g.currentSlide >= g.getDotCount() && "left" === c) && (d = g.touchObject.swipeLength * g.options.edgeFriction, g.touchObject.edgeHit = !0), g.swipeLeft = g.options.vertical === !1 ? b + d * e : b + d * (g.$list.height() / g.listWidth) * e, g.options.fade === !0 || g.options.touchMove === !1 ? !1 : g.animating === !0 ? (g.swipeLeft = null, !1) : void g.setCSS(g.swipeLeft)) : void 0)
        }, b.prototype.swipeStart = function(a) {
            var b, c = this;
            return 1 !== c.touchObject.fingerCount || c.slideCount <= c.options.slidesToShow ? (c.touchObject = {}, !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (b = a.originalEvent.touches[0]), c.touchObject.startX = c.touchObject.curX = void 0 !== b ? b.pageX : a.clientX, c.touchObject.startY = c.touchObject.curY = void 0 !== b ? b.pageY : a.clientY, void(c.dragging = !0))
        }, b.prototype.unfilterSlides = b.prototype.slickUnfilter = function() {
            var a = this;
            null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit())
        }, b.prototype.unload = function() {
            var b = this;
            a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && "object" != typeof b.options.prevArrow && b.$prevArrow.remove(), b.$nextArrow && "object" != typeof b.options.nextArrow && b.$nextArrow.remove(), b.$slides.removeClass("slick-slide slick-active slick-visible").css("width", "")
        }, b.prototype.unslick = function() {
            var a = this;
            a.destroy()
        }, b.prototype.updateArrows = function() {
            var a, b = this;
            a = Math.floor(b.options.slidesToShow / 2), b.options.arrows === !0 && b.options.infinite !== !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow.removeClass("slick-disabled"), b.$nextArrow.removeClass("slick-disabled"), 0 === b.currentSlide ? (b.$prevArrow.addClass("slick-disabled"), b.$nextArrow.removeClass("slick-disabled")) : b.currentSlide >= b.slideCount - b.options.slidesToShow && b.options.centerMode === !1 ? (b.$nextArrow.addClass("slick-disabled"), b.$prevArrow.removeClass("slick-disabled")) : b.currentSlide >= b.slideCount - 1 && b.options.centerMode === !0 && (b.$nextArrow.addClass("slick-disabled"), b.$prevArrow.removeClass("slick-disabled")))
        }, b.prototype.updateDots = function() {
            var a = this;
            null !== a.$dots && (a.$dots.find("li").removeClass("slick-active"), a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active"))
        }, b.prototype.visibility = function() {
            var a = this;
            document[a.hidden] ? (a.paused = !0, a.autoPlayClear()) : (a.paused = !1, a.autoPlay())
        }, a.fn.slick = function() {
            var a, c = this,
                d = arguments[0],
                e = Array.prototype.slice.call(arguments, 1),
                f = c.length,
                g = 0;
            for (g; f > g; g++)
                if ("object" == typeof d || "undefined" == typeof d ? c[g].slick = new b(c[g], d) : a = c[g].slick[d].apply(c[g].slick, e), "undefined" != typeof a) return a;
            return c
        }, a(function() {
            a("[data-slick]").slick()
        })
    }), ! function(a) {
        "object" == typeof exports && exports && "object" == typeof module && module && module.exports === exports ? a(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
    }(function(a) {
        function b(a) {
            var b = a[0];
            return b.offsetWidth > 0 && b.offsetHeight > 0
        }

        function c(b) {
            if (b.minTime && (b.minTime = t(b.minTime)), b.maxTime && (b.maxTime = t(b.maxTime)), b.durationTime && "function" != typeof b.durationTime && (b.durationTime = t(b.durationTime)), "now" == b.scrollDefault ? b.scrollDefault = t(new Date) : b.scrollDefault ? b.scrollDefault = t(b.scrollDefault) : b.minTime && (b.scrollDefault = b.minTime), b.scrollDefault && (b.scrollDefault = b.roundingFunction(b.scrollDefault, b)), "string" === a.type(b.timeFormat) && b.timeFormat.match(/[gh]/) && (b._twelveHourTime = !0), b.disableTimeRanges.length > 0) {
                for (var c in b.disableTimeRanges) b.disableTimeRanges[c] = [t(b.disableTimeRanges[c][0]), t(b.disableTimeRanges[c][1])];
                b.disableTimeRanges = b.disableTimeRanges.sort(function(a, b) {
                    return a[0] - b[0]
                });
                for (var c = b.disableTimeRanges.length - 1; c > 0; c--) b.disableTimeRanges[c][0] <= b.disableTimeRanges[c - 1][1] && (b.disableTimeRanges[c - 1] = [Math.min(b.disableTimeRanges[c][0], b.disableTimeRanges[c - 1][0]), Math.max(b.disableTimeRanges[c][1], b.disableTimeRanges[c - 1][1])], b.disableTimeRanges.splice(c, 1))
            }
            return b
        }

        function d(b) {
            var c = b.data("timepicker-settings"),
                d = b.data("timepicker-list");
            if (d && d.length && (d.remove(), b.data("timepicker-list", !1)), c.useSelect) {
                d = a("<select />", {
                    "class": "ui-timepicker-select"
                });
                var g = d
            } else {
                d = a("<ul />", {
                    "class": "ui-timepicker-list"
                });
                var g = a("<div />", {
                    "class": "ui-timepicker-wrapper",
                    tabindex: -1
                });
                g.css({
                    display: "none",
                    position: "absolute"
                }).append(d)
            }
            if (c.noneOption)
                if (c.noneOption === !0 && (c.noneOption = c.useSelect ? "Time..." : "None"), a.isArray(c.noneOption)) {
                    for (var h in c.noneOption)
                        if (parseInt(h, 10) == h) {
                            var j = e(c.noneOption[h], c.useSelect);
                            d.append(j)
                        }
                } else {
                    var j = e(c.noneOption, c.useSelect);
                    d.append(j)
                }
            c.className && g.addClass(c.className), null === c.minTime && null === c.durationTime || !c.showDuration || ("function" == typeof c.step ? "function" : c.step, g.addClass("ui-timepicker-with-duration"), g.addClass("ui-timepicker-step-" + c.step));
            var l = c.minTime;
            "function" == typeof c.durationTime ? l = t(c.durationTime()) : null !== c.durationTime && (l = c.durationTime);
            var m = null !== c.minTime ? c.minTime : 0,
                o = null !== c.maxTime ? c.maxTime : m + v - 1;
            m > o && (o += v), o === v - 1 && "string" === a.type(c.timeFormat) && c.show2400 && (o = v);
            var p = c.disableTimeRanges,
                u = 0,
                w = p.length,
                y = c.step;
            "function" != typeof y && (y = function() {
                return c.step
            });
            for (var h = m, z = 0; o >= h; z++, h += 60 * y(z)) {
                var A = h,
                    B = s(A, c);
                if (c.useSelect) {
                    var C = a("<option />", {
                        value: B
                    });
                    C.text(B)
                } else {
                    var C = a("<li />");
                    C.data("time", 86400 >= A ? A : A % 86400), C.text(B)
                }
                if ((null !== c.minTime || null !== c.durationTime) && c.showDuration) {
                    var D = r(h - l, c.step);
                    if (c.useSelect) C.text(C.text() + " (" + D + ")");
                    else {
                        var E = a("<span />", {
                            "class": "ui-timepicker-duration"
                        });
                        E.text(" (" + D + ")"), C.append(E)
                    }
                }
                w > u && (A >= p[u][1] && (u += 1), p[u] && A >= p[u][0] && A < p[u][1] && (c.useSelect ? C.prop("disabled", !0) : C.addClass("ui-timepicker-disabled"))), d.append(C)
            }
            if (g.data("timepicker-input", b), b.data("timepicker-list", g), c.useSelect) b.val() && d.val(f(t(b.val()), c)), d.on("focus", function() {
                a(this).data("timepicker-input").trigger("showTimepicker")
            }), d.on("blur", function() {
                a(this).data("timepicker-input").trigger("hideTimepicker")
            }), d.on("change", function() {
                n(b, a(this).val(), "select")
            }), n(b, d.val(), "initial"), b.hide().after(d);
            else {
                var F = c.appendTo;
                "string" == typeof F ? F = a(F) : "function" == typeof F && (F = F(b)), F.append(g), k(b, d), d.on("mousedown", "li", function(c) {
                    b.off("focus.timepicker"), b.on("focus.timepicker-ie-hack", function() {
                        b.off("focus.timepicker-ie-hack"), b.on("focus.timepicker", x.show)
                    }), i(b) || b[0].focus(), d.find("li").removeClass("ui-timepicker-selected"), a(this).addClass("ui-timepicker-selected"), q(b) && (b.trigger("hideTimepicker"), d.on("mouseup.timepicker", "li", function(a) {
                        d.off("mouseup.timepicker"), g.hide()
                    }))
                })
            }
        }

        function e(b, c) {
            var d, e, f;
            return "object" == typeof b ? (d = b.label, e = b.className, f = b.value) : "string" == typeof b ? d = b : a.error("Invalid noneOption value"), c ? a("<option />", {
                value: f,
                "class": e,
                text: d
            }) : a("<li />", {
                "class": e,
                text: d
            }).data("time", f)
        }

        function f(a, b) {
            return a = b.roundingFunction(a, b), null !== a ? s(a, b) : void 0
        }

        function g() {
            return new Date(1970, 1, 1, 0, 0, 0)
        }

        function h(b) {
            var c = a(b.target),
                d = c.closest(".ui-timepicker-input");
            0 === d.length && 0 === c.closest(".ui-timepicker-wrapper").length && (x.hide(), a(document).unbind(".ui-timepicker"), a(window).unbind(".ui-timepicker"))
        }

        function i(a) {
            var b = a.data("timepicker-settings");
            return (window.navigator.msMaxTouchPoints || "ontouchstart" in document) && b.disableTouchKeyboard
        }

        function j(b, c, d) {
            if (!d && 0 !== d) return !1;
            var e = b.data("timepicker-settings"),
                f = !1,
                d = e.roundingFunction(d, e);
            return c.find("li").each(function(b, c) {
                var e = a(c);
                return "number" == typeof e.data("time") && e.data("time") == d ? (f = e, !1) : void 0
            }), f
        }

        function k(a, b) {
            b.find("li").removeClass("ui-timepicker-selected");
            var c = t(m(a), a.data("timepicker-settings"));
            if (null !== c) {
                var d = j(a, b, c);
                if (d) {
                    var e = d.offset().top - b.offset().top;
                    (e + d.outerHeight() > b.outerHeight() || 0 > e) && b.scrollTop(b.scrollTop() + d.position().top - d.outerHeight()), d.addClass("ui-timepicker-selected")
                }
            }
        }

        function l(b, c) {
            if ("" !== this.value && "timepicker" != c) {
                var d = a(this);
                if (!d.is(":focus") || b && "change" == b.type) {
                    var e = d.data("timepicker-settings"),
                        f = t(this.value, e);
                    if (null === f) return void d.trigger("timeFormatError");
                    var g = !1;
                    null !== e.minTime && f < e.minTime ? g = !0 : null !== e.maxTime && f > e.maxTime && (g = !0), a.each(e.disableTimeRanges, function() {
                        return f >= this[0] && f < this[1] ? (g = !0, !1) : void 0
                    }), e.forceRoundTime && (f = e.roundingFunction(f, e));
                    var h = s(f, e);
                    g ? n(d, h, "error") && d.trigger("timeRangeError") : n(d, h)
                }
            }
        }

        function m(a) {
            return a.is("input") ? a.val() : a.data("ui-timepicker-value")
        }

        function n(a, b, c) {
            if (a.is("input")) {
                a.val(b);
                var d = a.data("timepicker-settings");
                d.useSelect && "select" != c && "initial" != c && a.data("timepicker-list").val(f(b, d))
            }
            return a.data("ui-timepicker-value") != b ? (a.data("ui-timepicker-value", b), "select" == c ? a.trigger("selectTime").trigger("changeTime").trigger("change", "timepicker") : "error" != c && a.trigger("changeTime"), !0) : (a.trigger("selectTime"), !1)
        }

        function o(c) {
            var d = a(this),
                e = d.data("timepicker-list");
            if (!e || !b(e)) {
                if (40 != c.keyCode) return !0;
                x.show.call(d.get(0)), e = d.data("timepicker-list"), i(d) || d.focus()
            }
            switch (c.keyCode) {
                case 13:
                    return q(d) && x.hide.apply(this), c.preventDefault(), !1;
                case 38:
                    var f = e.find(".ui-timepicker-selected");
                    return f.length ? f.is(":first-child") || (f.removeClass("ui-timepicker-selected"), f.prev().addClass("ui-timepicker-selected"), f.prev().position().top < f.outerHeight() && e.scrollTop(e.scrollTop() - f.outerHeight())) : (e.find("li").each(function(b, c) {
                        return a(c).position().top > 0 ? (f = a(c), !1) : void 0
                    }), f.addClass("ui-timepicker-selected")), !1;
                case 40:
                    return f = e.find(".ui-timepicker-selected"), 0 === f.length ? (e.find("li").each(function(b, c) {
                        return a(c).position().top > 0 ? (f = a(c), !1) : void 0
                    }), f.addClass("ui-timepicker-selected")) : f.is(":last-child") || (f.removeClass("ui-timepicker-selected"), f.next().addClass("ui-timepicker-selected"), f.next().position().top + 2 * f.outerHeight() > e.outerHeight() && e.scrollTop(e.scrollTop() + f.outerHeight())), !1;
                case 27:
                    e.find("li").removeClass("ui-timepicker-selected"), x.hide();
                    break;
                case 9:
                    x.hide();
                    break;
                default:
                    return !0
            }
        }

        function p(c) {
            var d = a(this),
                e = d.data("timepicker-list");
            if (!e || !b(e)) return !0;
            if (!d.data("timepicker-settings").typeaheadHighlight) return e.find("li").removeClass("ui-timepicker-selected"), !0;
            switch (c.keyCode) {
                case 96:
                case 97:
                case 98:
                case 99:
                case 100:
                case 101:
                case 102:
                case 103:
                case 104:
                case 105:
                case 48:
                case 49:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 57:
                case 65:
                case 77:
                case 80:
                case 186:
                case 8:
                case 46:
                    k(d, e);
                    break;
                default:
                    return
            }
        }

        function q(a) {
            var b = a.data("timepicker-settings"),
                c = a.data("timepicker-list"),
                d = null,
                e = c.find(".ui-timepicker-selected");
            if (e.hasClass("ui-timepicker-disabled")) return !1;
            if (e.length && (d = e.data("time")), null !== d)
                if ("string" == typeof d) a.val(d), a.trigger("selectTime").trigger("changeTime").trigger("change", "timepicker");
                else {
                    var f = s(d, b);
                    n(a, f, "select")
                }
            return !0
        }

        function r(a, b) {
            a = Math.abs(a);
            var c, d, e = Math.round(a / 60),
                f = [];
            return 60 > e ? f = [e, w.mins] : (c = Math.floor(e / 60), d = e % 60, 30 == b && 30 == d && (c += w.decimal + 5), f.push(c), f.push(1 == c ? w.hr : w.hrs), 30 != b && d && (f.push(d), f.push(w.mins))), f.join(" ")
        }

        function s(b, c) {
            if (null !== b) {
                var d = new Date(u.valueOf() + 1e3 * b);
                if (!isNaN(d.getTime())) {
                    if ("function" === a.type(c.timeFormat)) return c.timeFormat(d);
                    for (var e, f, g = "", h = 0; h < c.timeFormat.length; h++) switch (f = c.timeFormat.charAt(h)) {
                        case "a":
                            g += d.getHours() > 11 ? w.pm : w.am;
                            break;
                        case "A":
                            g += d.getHours() > 11 ? w.PM : w.AM;
                            break;
                        case "g":
                            e = d.getHours() % 12, g += 0 === e ? "12" : e;
                            break;
                        case "G":
                            e = d.getHours(), b === v && (e = 24), g += e;
                            break;
                        case "h":
                            e = d.getHours() % 12, 0 !== e && 10 > e && (e = "0" + e), g += 0 === e ? "12" : e;
                            break;
                        case "H":
                            e = d.getHours(), b === v && (e = 24), g += e > 9 ? e : "0" + e;
                            break;
                        case "i":
                            var i = d.getMinutes();
                            g += i > 9 ? i : "0" + i;
                            break;
                        case "s":
                            b = d.getSeconds(), g += b > 9 ? b : "0" + b;
                            break;
                        case "\\":
                            h++, g += c.timeFormat.charAt(h);
                            break;
                        default:
                            g += f
                    }
                    return g
                }
            }
        }

        function t(a, b) {
            if ("" === a) return null;
            if (!a || a + 0 == a) return a;
            if ("object" == typeof a) return 3600 * a.getHours() + 60 * a.getMinutes() + a.getSeconds();
            a = a.toLowerCase().replace(".", ""), ("a" == a.slice(-1) || "p" == a.slice(-1)) && (a += "m");
            var c = "(" + w.am.replace(".", "") + "|" + w.pm.replace(".", "") + "|" + w.AM.replace(".", "") + "|" + w.PM.replace(".", "") + ")?",
                d = new RegExp("^" + c + "\\s*([0-2]?[0-9])\\W?([0-5][0-9])?\\W?([0-5][0-9])?\\s*" + c + "$"),
                e = a.match(d);
            if (!e) return null;
            var f = parseInt(1 * e[2], 10),
                g = e[1] || e[5],
                h = f;
            if (12 >= f && g) {
                var i = g == w.pm || g == w.PM;
                h = 12 == f ? i ? 12 : 0 : f + (i ? 12 : 0)
            }
            var j = 1 * e[3] || 0,
                k = 1 * e[4] || 0,
                l = 3600 * h + 60 * j + k;
            if (!g && b && b._twelveHourTime && b.scrollDefault) {
                var m = l - b.scrollDefault;
                0 > m && m >= v / -2 && (l = (l + v / 2) % v)
            }
            return l
        }
        var u = g(),
            v = 86400,
            w = {
                am: "am",
                pm: "pm",
                AM: "AM",
                PM: "PM",
                decimal: ".",
                mins: "mins",
                hr: "hr",
                hrs: "hrs"
            },
            x = {
                init: function(b) {
                    return this.each(function() {
                        var e = a(this),
                            f = [];
                        for (var g in a.fn.timepicker.defaults) e.data(g) && (f[g] = e.data(g));
                        var h = a.extend({}, a.fn.timepicker.defaults, f, b);
                        h.lang && (w = a.extend(w, h.lang)), h = c(h), e.data("timepicker-settings", h), e.addClass("ui-timepicker-input"), h.useSelect ? d(e) : (e.prop("autocomplete", "off"), e.on("click.timepicker focus.timepicker", x.show), e.on("change.timepicker", l), e.on("keydown.timepicker", o), e.on("keyup.timepicker", p), l.call(e.get(0)))
                    })
                },
                show: function(c) {
                    var e = a(this),
                        f = e.data("timepicker-settings");
                    if (c) {
                        if (!f.showOnFocus) return !0;
                        c.preventDefault()
                    }
                    if (f.useSelect) return void e.data("timepicker-list").focus();
                    i(e) && e.blur();
                    var g = e.data("timepicker-list");
                    if (!e.prop("readonly") && (g && 0 !== g.length && "function" != typeof f.durationTime || (d(e), g = e.data("timepicker-list")), !b(g))) {
                        x.hide(), g.show();
                        var k = {};
                        f.orientation.match(/r/) ? k.left = e.offset().left + e.outerWidth() - g.outerWidth() + parseInt(g.css("marginLeft").replace("px", ""), 10) : k.left = e.offset().left + parseInt(g.css("marginLeft").replace("px", ""), 10);
                        var l;
                        l = f.orientation.match(/t/) ? "t" : f.orientation.match(/b/) ? "b" : e.offset().top + e.outerHeight(!0) + g.outerHeight() > a(window).height() + a(window).scrollTop() ? "t" : "b", "t" == l ? (g.addClass("ui-timepicker-positioned-top"), k.top = e.offset().top - g.outerHeight() + parseInt(g.css("marginTop").replace("px", ""), 10)) : (g.removeClass("ui-timepicker-positioned-top"), k.top = e.offset().top + e.outerHeight() + parseInt(g.css("marginTop").replace("px", ""), 10)), g.offset(k);
                        var n = g.find(".ui-timepicker-selected");
                        if (n.length || (m(e) ? n = j(e, g, t(m(e))) : f.scrollDefault && (n = j(e, g, f.scrollDefault))), n && n.length) {
                            var o = g.scrollTop() + n.position().top - n.outerHeight();
                            g.scrollTop(o)
                        } else g.scrollTop(0);
                        return a(document).on("touchstart.ui-timepicker mousedown.ui-timepicker", h), a(window).on("resize.ui-timepicker", h), f.closeOnWindowScroll && a(document).on("scroll.ui-timepicker", h), e.trigger("showTimepicker"), this
                    }
                },
                hide: function(c) {
                    var d = a(this),
                        e = d.data("timepicker-settings");
                    return e && e.useSelect && d.blur(), a(".ui-timepicker-wrapper").each(function() {
                        var c = a(this);
                        if (b(c)) {
                            var d = c.data("timepicker-input"),
                                e = d.data("timepicker-settings");
                            e && e.selectOnBlur && q(d), c.hide(), d.trigger("hideTimepicker")
                        }
                    }), this
                },
                option: function(b, e) {
                    return this.each(function() {
                        var f = a(this),
                            g = f.data("timepicker-settings"),
                            h = f.data("timepicker-list");
                        if ("object" == typeof b) g = a.extend(g, b);
                        else if ("string" == typeof b && "undefined" != typeof e) g[b] = e;
                        else if ("string" == typeof b) return g[b];
                        g = c(g), f.data("timepicker-settings", g), h && (h.remove(), f.data("timepicker-list", !1)), g.useSelect && d(f)
                    })
                },
                getSecondsFromMidnight: function() {
                    return t(m(this))
                },
                getTime: function(a) {
                    var b = this,
                        c = m(b);
                    if (!c) return null;
                    a || (a = new Date);
                    var d = t(c),
                        e = new Date(a);
                    return e.setHours(d / 3600), e.setMinutes(d % 3600 / 60), e.setSeconds(d % 60), e.setMilliseconds(0), e
                },
                setTime: function(a) {
                    var b = this,
                        c = b.data("timepicker-settings");
                    if (c.forceRoundTime) var d = f(t(a), c);
                    else var d = s(t(a), c);
                    return n(b, d), b.data("timepicker-list") && k(b, b.data("timepicker-list")), this
                },
                remove: function() {
                    var a = this;
                    if (a.hasClass("ui-timepicker-input")) {
                        var b = a.data("timepicker-settings");
                        return a.removeAttr("autocomplete", "off"), a.removeClass("ui-timepicker-input"), a.removeData("timepicker-settings"), a.off(".timepicker"), a.data("timepicker-list") && a.data("timepicker-list").remove(), b.useSelect && a.show(), a.removeData("timepicker-list"), this
                    }
                }
            };
        a.fn.timepicker = function(b) {
            return this.length ? x[b] ? this.hasClass("ui-timepicker-input") ? x[b].apply(this, Array.prototype.slice.call(arguments, 1)) : this : "object" != typeof b && b ? void a.error("Method " + b + " does not exist on jQuery.timepicker") : x.init.apply(this, arguments) : this
        }, a.fn.timepicker.defaults = {
            className: null,
            minTime: null,
            maxTime: null,
            durationTime: null,
            step: 30,
            showDuration: !1,
            showOnFocus: !0,
            timeFormat: "g:ia",
            scrollDefault: null,
            selectOnBlur: !1,
            disableTouchKeyboard: !1,
            forceRoundTime: !1,
            roundingFunction: function(a, b) {
                if (null === a) return null;
                var c = a % (60 * b.step);
                return c >= 30 * b.step ? a += 60 * b.step - c : a -= c, a
            },
            appendTo: "body",
            orientation: "l",
            disableTimeRanges: [],
            closeOnWindowScroll: !1,
            typeaheadHighlight: !0,
            noneOption: !1,
            show2400: !1
        }
    }),
    function(a) {
        "use strict";
        var b = {
            cache: {
                $document: a(document),
                $window: a(window)
            },
            init: function() {
                this.bindEvents()
            },
            bindEvents: function() {
                var b = this;
                this.cache.$document.on("ready", function() {
                    b.cache.$target = a(".job_listings"), b.initHeader(), b.initFilters(), b.initSearch(), b.submitButton(), b.initTimePickers(), b.initTabbedListings(), b.initBusinessHours(), b.initApply(), b.previewListing(), b.filterTags()
                }), this.cache.$window.on("resize", function() {
                    b.initHeader()
                })
            },
            initHeader: function() {
                var b = a("body").hasClass("fixed-header"),
                    c = a("body").hasClass("fixed-map"),
                    d = a("body").hasClass("admin-bar"),
                    e = (a("body"), parseInt(a(".primary-header").outerHeight())),
                    f = parseInt(a(".main-navigation").outerHeight()),
                    g = parseInt(a("#wpadminbar").outerHeight());
                if (a("html").outerWidth() < 992) return a("body").css("padding-top", 0), a(".site-content").css("margin-top", 0), void a("body.fixed-map.admin-bar .job_listings-map-wrapper").css("top", 0);
                if (b && !c && a(".fixed-header").css("padding-top", e), b && c && d ? a(".site-header").css("top", parseInt(e) + parseInt(g)) : b && c && a(".site-header").css("top", e), c && (a("body").hasClass("archive") || a("body").hasClass("job-manager-archive"))) {
                    var h = e + f;
                    a("body.fixed-map.admin-bar .job_listings-map-wrapper").css("top", h), a(".site-content").css("margin-top", h), d && a("body.fixed-map.admin-bar .job_listings-map-wrapper").css("top", h + g)
                }
            },
            initSearch: function() {
                a(".search-overlay-toggle[data-toggle]").click(function(b) {
                    b.preventDefault(), a(a(this).data("toggle")).toggleClass("active")
                }), a(".listify_widget_search_listings form.job_filters").removeClass("job_filters").addClass("job_search_form").prop("action", listifySettings.archiveurl), a("button.update_results").on("click", function() {
                    a(this).parent("form").submit()
                }), a("form.job_search_form input").keypress(function(b) {
                    13 == b.which && (b.preventDefault(), a("form.job_search_form").submit())
                }), a("form.job_search_form").on("submit", function(b) {
                    var c = a(this).serialize();
                    window.location.href = listifySettings.archiveurl + "?" + c
                })
            },
            initFilters: function() {
                var b = [a("ul.job_types"), a(".filter_by_tag")];
                a.each(b, function(a, b) {
                    b.outerHeight() > 140 && b.addClass("too-tall")
                }), a(".home").find(".job_types") && !a(".home .job_types").is(":visible") && a('.home input[name="filter_job_type[]"]').remove()
            },
            submitButton: function() {
                a(".update_results").on("click", function(b) {
                    b.preventDefault(), a("div.job_listings").trigger("update_results", [1, !1])
                })
            },
            initTimePickers: function() {
                a(".timepicker").timepicker({
                    timeFormat: listifySettings.l10n.timeFormat,
                    noneOption: {
                        label: listifySettings.l10n.closed,
                        value: listifySettings.l10n.closed
                    }
                })
            },
            initTabbedListings: function() {
                var b = a(".tabbed-listings-tabs-wrapper"),
                    c = a(".tabbed-listings-tabs");
                b.find("> div").hide().filter(":first-child").show(), c.find("li:first-child a").addClass("active"), c.on("click", "li:not(:last-child) a", function(d) {
                    d.preventDefault(), c.find("li a").removeClass("active"), a(this).addClass("active");
                    var e = a(this).attr("href");
                    b.find("> div").hide().filter(e).show()
                })
            },
            initBusinessHours: function() {
                a(".fieldset-job_hours label").click(function(b) {
                    b.preventDefault(), a(this).parent().toggleClass("open").end().next().toggle()
                })
            },
            initApply: function() {
                a(".job_application.application").addClass("popup")
            },
            previewListing: function() {
                a(".job_listing_preview").length && (a("#main").addClass("preview-listing"), a(".job_listing_preview.single_job_listing").removeClass("single_job_listing").addClass("single-job_listing"))
            },
            filterTags: function() {
                a(".filter_by_tag").contents().filter(function() {
                    return 3 === this.nodeType
                }).each(function() {
                    this.nodeValue = a.trim(this.nodeValue)
                }).wrap('<span class="filter-label"></span>')
            }
        };
        b.init(), window.cSwitcher = window.cSwitcher || {};
        var c = c || {};
        cSwitcher.Buttons = function() {
            this.bindEvents()
        }, cSwitcher.Buttons.prototype.bindEvents = function() {
            var b = this;
            a(".archive-job_listing-layout").click(function(d) {
                return d.preventDefault(), b.toggle(a(this)), c.user.savePreference(), c.results.updateStyle()
            }), c.dom.target.on("updated_results", function(a, b) {
                return c.results.updateStyle()
            })
        }, cSwitcher.Buttons.prototype.toggle = function(a) {
            var b = a,
                d = b.data("style");
            c.dom.buttons.find("a").removeClass("active"), b.addClass("active"), c.results.setStyle(d)
        }, cSwitcher.Buttons.prototype.getActiveStyle = function() {
            return c.dom.buttons.find(".active").data("style")
        }, cSwitcher.Results = function(a) {
            this.setStyle(a)
        }, cSwitcher.Results.prototype.setStyle = function(a) {
            a ? this.style = a : this.style = c.buttons.getActiveStyle()
        }, cSwitcher.Results.prototype.updateStyle = function() {
            var b = a(".type-job_listing").data("grid-columns"),
                c = a(".type-job_listing");
            c.removeClass("style-grid style-list").addClass("style-" + this.style).removeClass(function(a, b) {
                return (b.match(/\bcol-\S+/g) || []).join(" ")
            }), "grid" == this.style ? c.addClass(b) : c.addClass("col-xs-12")
        }, cSwitcher.User = function() {}, cSwitcher.User.prototype.savePreference = function() {
            var b = {
                action: "listify_save_archive_style",
                style: c.results.style
            };
            a.ajax({
                url: listifySettings.ajaxurl,
                data: b,
                dataType: "json",
                type: "POST"
            }).done(function(a) {})
        }, a(document).on("ready", function() {
            c.dom = {
                target: a(".job_listings"),
                buttons: a(".archive-job_listing-layout-wrapper")
            }, a("body").hasClass("job-manager-archive") && (c.buttons = new cSwitcher.Buttons, c.results = new cSwitcher.Results, c.user = new cSwitcher.User, a(window).on("resize", function() {
                a(window).width() < 786 ? c.dom.buttons.find("a").filter(":first-child").trigger("click").end().hide() : c.dom.buttons.show()
            }))
        })
    }(jQuery),
    function(a) {
        window.cGallery = window.cGallery || {};
        var b = b || {
            archive: null
        };
        cGallery.Archive = function() {
            if (a(".gallery-overlay-trigger").magnificPopup({
                    type: "ajax",
                    ajax: {
                        settings: {
                            type: "GET",
                            data: {
                                view: "singular"
                            }
                        }
                    },
                    gallery: {
                        enabled: !0,
                        preload: [1, 1]
                    },
                    callbacks: {
                        open: function() {
                            a("body").addClass("gallery-overlay")
                        },
                        close: function() {
                            a("body").removeClass("gallery-overlay")
                        },
                        lazyLoad: function(b) {
                            a(b.el).data("src")
                        },
                        parseAjax: function(b) {
                            b.data = a(b.data).find("#main")
                        }
                    }
                }), window.location.hash) {
                var b = window.location.hash.substring(1);
                a('a[href="' + b + '"]:first').length && a(a('a[href="' + b + '"]:first')).trigger("click")
            }
        }, a(document).on("ready", function() {
            b.archive = new cGallery.Archive
        })
    }(jQuery),
    function(a) {
        "use strict";
        var b = {
            cache: {
                $document: a(document),
                $window: a(window)
            },
            init: function() {
                this.bindEvents()
            },
            bindEvents: function() {
                var b = this;
                a(document).on("ready", function() {
                    b.megamenu(), b.sorting()
                })
            },
            megamenu: function() {
                a("body.facetwp .category-list a").click(function() {
                    window.location.hash = "", window.location.href = a(this).attr("href"), window.location.reload()
                }), a("body.facetwp #job_listing_tax_mobile select").change(function(b) {
                    if (FWP.length) {
                        var c = a(this).find(":selected").val();
                        if ("get" == FWP.permalink_type) var d = listifySettings.archiveurl + "?" + listifySettings.megamenu.facet + "=" + c;
                        else var d = listifySettings.archiveurl + "#!/" + listifySettings.megamenu.facet + "=" + c;
                        window.location.href = d
                    }
                })
            },
            sorting: function() {
                this.cache.$document.on("facetwp-loaded facetwp-refresh", function() {
                    a("select").wrap('<span class="select"></span>')
                })
            }
        };
        b.init()
    }(jQuery),
    function(a) {
        "use strict";
        var b = {
            cache: {
                $document: a(document),
                $window: a(window)
            },
            init: function() {
                this.bindEvents()
            },
            bindEvents: function() {
                var b = this;
                this.cache.$document.on("ready", function() {
                    b.initRatings(), b.initSocialLogin(!1), b.initPackageSelection(), a("body").on("popup-trigger-ajax", function() {
                        b.initSocialLogin(a(".popup"))
                    })
                })
            },
            initRatings: function() {
                a(".comment-form-rating").on("hover click", ".stars span a", function() {
                    a(this).siblings().removeClass("hover").end().prevAll().addClass("hover")
                })
            },
            initSocialLogin: function(b) {
                b || (b = a("body"));
                var c = b.find(a(".woocommerce:not(body) .wc-social-login"));
                if (!c.length) return !0;
                if (c.hasClass("wc-social-login-link-account")) return !0;
                var d = c.clone(),
                    e = c.parents(".woocommerce:not(body)");
                c.remove(), e.append(d)
            },
            initPackageSelection: function() {
                var b = a("#listify_selected_package");
                if (0 != b.length) {
                    var c = b.val();
                    a(".job_listing_packages").find("#package-" + c).attr("checked", "checked")
                }
            }
        };
        b.init()
    }(jQuery),
    function() {
        jQuery(function(a) {
            return a(".share-email").click(function(b) {
                return a.magnificPopup.close()
            })
        })
    }.call(this),
    function(a) {
        "use strict";
        var b = {
            cache: {
                $document: a(document),
                $window: a(window),
                firefox: navigator.userAgent.toLowerCase().indexOf("firefox") > -1
            },
            init: function() {
                this.bindEvents()
            },
            bindEvents: function() {
                var a = this;
                this.cache.$document.on("ready", function() {
                    a.initMenu(), a.initPopups(), a.initVideos(), a.initTables(), a.cache.firefox || (a.initSelects(), a.cache.$document.on("facetwp-loaded facetwp-refresh update_results", function() {
                        a.initSelects()
                    }))
                })
            },
            initMenu: function() {
                a(".navigation-bar-toggle, .js-toggle-area-trigger").click(function(b) {
                    b.preventDefault(), a(this).toggleClass("active").next().toggleClass("active")
                }), a(".current-account-avatar").click(function(b) {
                    b.preventDefault();
                    var c = a(this).data("href");
                    window.location = c
                })
            },
            initPopups: function() {
                var b = this;
                b.cache.$document.on("click", ".popup-trigger-ajax", function(c) {
                    c.preventDefault();
                    var d = a(this).attr("class");
                    d = d.replace("popup-trigger-ajax", ""), b.triggerPopup({
                        items: {
                            src: a(this).attr("href"),
                            type: "ajax"
                        },
                        callbacks: {
                            parseAjax: function(b) {
                                b.data = '<div class="popup ' + d + '"><h2 class="popup-title">' + a(b.data).find(".page-title").text() + "</h2>" + a(b.data).find("#main").html()
                            },
                            ajaxContentAdded: function() {
                                a("body").trigger("popup-trigger-ajax"), b.initForms(), b.initRecaptcha()
                            }
                        }
                    })
                }), b.cache.$document.on("click", ".popup-trigger", function(c) {
                    c.preventDefault();
                    var d = a(this).data("mfp-src");
                    "undefined" == typeof d && (d = a(this).attr("href")), b.triggerPopup({
                        items: {
                            src: d
                        }
                    })
                })
            },
            initRecaptcha: function() {
                a(".g-recaptcha").each(function(b, c) {
                    if (a(this).is(":empty")) {
                        var d = a(this).attr("data-sitekey"),
                            e = a(this).attr("data-theme"),
                            c = a(this).get(0);
                        grecaptcha.render(c, {
                            sitekey: d,
                            theme: e
                        })
                    }
                })
            },
            triggerPopup: function(b) {
                return a.magnificPopup.close(), a.magnificPopup.open(a.extend(b, {
                    type: "inline",
                    fixedContentPos: !1,
                    fixedBgPos: !0,
                    overflowY: "scroll"
                }))
            },
            initSelects: function() {
                var b = [".country_select", ".state_select", ".feedFormField", ".job-manager-category-dropdown[multiple]", ".job-manager-multiselect", ".job-manager-chosen-select", ".intl-tel-mobile-select", "#job_region"];
                a("select").each(function() {
                    if (!a(this).parent().hasClass("select") && !a(this).is(b.join(","))) {
                        var c = null;
                        if (a(this).attr("class")) var c = a(this).attr("class").split(" ")[0];
                        a(this).wrap('<span class="select ' + c + '-wrapper"></span>')
                    }
                }), a("body:not(.facetwp) #job_listing_tax_mobile select").change(function(b) {
                    a("#job_listing_tax_mobile").submit()
                })
            },
            initVideos: function() {
                function b() {
                    a(window).width() < 768 ? a(c).hide() : a(c).show()
                }
                a(".site-content").fitVids();
                var c = a(".homepage-cover .wp-video video").get(0);
                if ("undefined" != typeof c) {
                    var d = a(".homepage-cover .wp-video").vide();
                    c.play(), d.resize(), b(), a(window).resize(function() {
                        b()
                    })
                }
            },
            initTables: function() {},
            initForms: function() {
                this.cache.$document.on("submit", ".popup form.login, .popup form.register", function(b) {
                    var c = a(this),
                        d = !1,
                        e = a(this).serialize(),
                        f = a(this).find("input[type=submit]"),
                        g = e + "&" + f.attr("name") + "=" + f.val();
                    a.ajax({
                        url: listifySettings.homeurl,
                        data: g,
                        type: "POST",
                        cache: !1,
                        async: !1
                    }).done(function(e) {
                        c.find(a(".woocommerce-error")).remove();
                        var f = a("#ajax-response"),
                            g = a.parseHTML(e);
                        f.append(g), d = f.find(a(".woocommerce-error")), d.length > 0 && (c.prepend(d.clone()), f.html(""), b.preventDefault())
                    })
                })
            }
        };
        b.init()
    }(jQuery);
//# sourceMappingURL=app.min.map