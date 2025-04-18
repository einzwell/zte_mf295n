define(["knockout", "service", "jquery", "config/config", "underscore"], function (o, n, t, i, u) {
    function e() {
        var u = this, e = s();
        u.loggedIn = o.observable(e), u.isUfi = o.observable(-1 != i.DEVICE.toLowerCase().indexOf("ufi")), u.showLogout = function () {
            return 0 != i.HAS_LOGIN && u.loggedIn()
        }, u.shutdown = function () {
            showConfirm("shutdown_confirm", function () {
                showLoading("processing"), n.shutdown({}, function (o) {
                    o && "success" == o.result ? (successOverlay(), n.logout({}, function () {
                        window.location = "index.html"
                    })) : errorOverlay()
                }, t.noop)
            })
        }, u.logout = function () {
            showConfirm("confirm_logout", function () {
                manualLogout = !0, n.logout({}, function () {
                    window.location = "index.html"
                })
            })
        }
    }

    function s() {
        return "loggedIn" == n.getLoginStatus().status
    }

    function c() {
        o.applyBindings(new e, t("#logout")[0])
    }

    return {init: c}
});
//# sourceMappingURL=../sourcemaps/logout.js.map
