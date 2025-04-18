define(["jquery"], function (t) {
    function o() {
        t(".statusItem", "#statusBar").each(function (o, e) {
            var i = t(this);
            i.attr("tipTitle", i.attr("title")).removeAttr("title")
        }).hover(function () {
            var o = t(this), i = o.attr("tipTitle"), r = void 0 != o.attr("tipTitle2") ? o.attr("tipTitle2") : "",
                n = t("<div>").addClass("tooltip in").appendTo(document.body).hide().append(o.attr("i18n") ? t.i18n.prop(i) + r : i);
            o.attr("i18n") && n.attr("data-trans", i).attr("id", "tooltip_" + o.attr("id"));
            var a = e(o, n, {position: ["bottom", "center"], offset: [0, 0]});
            n.css({position: "absolute", top: a.top, left: a.left}).show()
        }, function () {
            t(".tooltip").hide().remove()
        })
    }

    function e(o, e, i) {
        var r = o.offset().top, n = o.offset().left, a = i.position[0];
        r -= e.outerHeight() - i.offset[0], n += o.outerWidth() + i.offset[1], /iPad/i.test(navigator.userAgent) && (r -= t(window).scrollTop());
        var s = e.outerHeight() + o.outerHeight();
        "center" == a && (r += s / 2), "bottom" == a && (r += s), a = i.position[1];
        var f = e.outerWidth() + o.outerWidth();
        return "center" == a && (n -= f / 2), "left" == a && (n -= f), {top: r, left: n}
    }

    return {init: o}
});
//# sourceMappingURL=../sourcemaps/tooltip.js.map
