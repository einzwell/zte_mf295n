define(["config/menu", "jquery", "config/config", "service", "underscore"], function (o, n, a, i, e) {
    function t() {
        s(), window.location.hash = window.location.hash || "#home", "onhashchange" in window && (void 0 === document.documentMode || 8 == document.documentMode) ? (window.onhashchange = r, r()) : setInterval(r, 200), n("a[href^='#']").die("click").live("click", function () {
            var o = n(this);
            return a.CONTENT_MODIFIED.checkChangMethod(), checkFormContentModify(o.attr("href"))
        })
    }

    function s() {
        setInterval(function () {
            var a = i.getStatusInfo(), e = o.findMenu();
            if (0 == e.length) return !1;
            var t = ["phonebook/phonebook", "sms/smslist"], s = -1 != n.inArray(e[0].path, t);
            if (!0 === e[0].checkSIMStatus) {
                var d = "modem_sim_undetected" == a.simStatus || "modem_sim_destroy" == a.simStatus || "modem_waitpin" == a.simStatus || "modem_waitpuk" == a.simStatus,
                    r = "modem_imsi_waitnck" == a.simStatus;
                a.isLoggedIn && (void 0 == n("#div-nosimcard")[0] && d || void 0 == n("#div-network-lock")[0] && r || (void 0 != n("#div-nosimcard")[0] || void 0 != n("#div-network-lock")[0]) && "modem_init_complete" == a.simStatus) && c(e[0], a.simStatus, s)
            }
        }, 1e3)
    }

    function d() {
        var o = window.location.hash;
        if ("#login" == o || -1 != e.indexOf(a.GUEST_HASH, o) ? n("#themeContainer").attr("style", "margin-top:-36px;") : n("#themeContainer").attr("style", "margin-top:0px;"), "#login" == window.location.hash) n("#mainContainer").addClass("loginBackgroundBlue"); else {
            var i = n("#mainContainer");
            i.hasClass("loginBackgroundBlue") && (n("#container").css({margin: 0}), i.removeClass("loginBackgroundBlue").height("auto"))
        }
    }

    function r() {
        function t() {
            var o = i.getStatusInfo();
            void 0 == o.simStatus || -1 != n.inArray(o.simStatus, a.TEMPORARY_MODEM_MAIN_STATE) ? addTimeout(t, 500) : (c(u[0], o.simStatus, f), hideLoading())
        }

        if (window.location.hash != m) {
            var s = i.getStatusInfo(), r = i.getParams({nv: ["privacy_read_flag"]}),
                l = i.getParams({nv: ["password_remind", "web_wifi_password_remind"]});
            if (s.isLoggedIn && ("0" == r.privacy_read_flag && s.isLoggedIn && a.HAS_GDPR ? "1" == l.password_remind || "1" == l.web_wifi_password_remind ? window.location.hash = "#change_password" : window.location.hash = "#home" : "1" == l.password_remind || "1" == l.web_wifi_password_remind ? window.location.hash = "#change_password" : "#change_password" == window.location.hash && (window.location.hash = "#home")), (window.location.hash == a.defaultRoute || -1 != e.indexOf(a.GUEST_HASH, window.location.hash)) && s.isLoggedIn) return void (window.location.hash = "" == m ? "#home" : m);
            var u = o.findMenu();
            if (0 == u.length) window.location.hash = a.defaultRoute; else {
                var w = o.findMenu(m);
                if (m = u[0].hash, "#login" == m ? (n("#indexContainer").addClass("login-page-bg"), o.rebuild()) : n("#indexContainer").removeClass("login-page-bg"), 0 != w.length && u[0].path == w[0].path && u[0].level != w[0].level && "1" != u[0].level && "1" != w[0].level) return;
                d();
                var _ = ["phonebook/phonebook", "sms/smslist"], f = -1 != n.inArray(u[0].path, _);
                !0 === u[0].checkSIMStatus || f ? void 0 == s.simStatus ? (showLoading("waiting"), t()) : c(u[0], s.simStatus, f) : h(u[0])
            }
        }
    }

    function c(o, a, i) {
        var e = {};
        n.extend(e, o), "modem_sim_undetected" == a || "modem_sim_destroy" == a ? i || (e.path = "nosimcard") : "modem_waitpin" == a || "modem_waitpuk" == a ? e.path = "nosimcard" : "modem_imsi_waitnck" == a && (e.path = "network_lock"), h(e)
    }

    function h(a) {
        var i = a.path.replace(/\//g, "_"), e = n("body").removeClass();
        "nosimcard" == i || "network_lock" == i ? e.addClass("beautiful_bg page_" + i) : e.addClass("page_" + i), clearTimer(), hideLoading();
        var t = "text!tmpl/" + a.path + ".html";
        require([t, a.path], function (a, i) {
            l.stop(!0, !0), l.hide(), l.html(a), i.init(), o.refreshMenu(), n("#container").translate(), o.activeSubMenu(), n("form").attr("autocomplete", "off"), l.fadeIn()
        })
    }

    var m = "", l = n("#container");
    return checkFormContentModify = function (o) {
        return !a.CONTENT_MODIFIED.modified || window.location.hash == o || ("sms_to_save_draft" == a.CONTENT_MODIFIED.message ? (a.CONTENT_MODIFIED.callback.ok(a.CONTENT_MODIFIED.data), a.resetContentModifyValue(), window.location.hash = o) : showConfirm(a.CONTENT_MODIFIED.message, {
            ok: function () {
                a.CONTENT_MODIFIED.callback.ok(a.CONTENT_MODIFIED.data), a.resetContentModifyValue(), window.location.hash = o
            }, no: function () {
                a.CONTENT_MODIFIED.callback.no(a.CONTENT_MODIFIED.data) || (window.location.hash = o, a.resetContentModifyValue())
            }
        }), !1)
    }, {init: t}
});
//# sourceMappingURL=../sourcemaps/router.js.map
