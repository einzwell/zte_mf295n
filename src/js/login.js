define(["jquery", "knockout", "config/config", "service", "underscore", "config/menu", "logout", "status/statusBar"], function (e, n, t, o, i, r, a, s) {
    function u() {
        return setInterval(function () {
            if (!o.getStatusInfo().isLoggedIn) return void d();
            lastLoginStatus = o.getStatusInfo().isLoggedIn ? "1" : "0"
        }, 1e3)
    }

    function l() {
        function i() {
            var e = o.getLoginData(), n = o.getLoginStatus(), t = l(n, e);
            t == _.LOADING ? addTimeout(i, 500) : (I.pageState(t), I.pinNumber(e.pinnumber), I.pukNumber(e.puknumber)), r()
        }

        function r() {
            setTimeout(function () {
                var n = e("#txtPwd:visible"), t = e("#txtPIN:visible"), o = e("#txtPUK:visible");
                n.length > 0 ? n.focus() : t.length > 0 ? t.focus() : o.length > 0 && o.focus()
            }, 100)
        }

        function l(e, n) {
            return t.LOGIN_THEN_CHECK_PIN ? c(e, n) : d(e, n)
        }

        function c(n, o) {
            if ("loggedIn" == n.status) return "modem_waitpin" == i ? _.WAIT_PIN : "modem_waitpuk" != i && 0 != o.pinnumber || 0 == o.puknumber ? 0 != o.puknumber && "modem_sim_destroy" != i || "modem_sim_undetected" == i || "modem_undetected" == i ? _.LOGGEDIN : _.PUK_LOCKED : _.WAIT_PUK;
            var i = o.modem_main_state;
            return -1 != e.inArray(i, t.TEMPORARY_MODEM_MAIN_STATE) ? _.LOADING : _.LOGIN
        }

        function d(n, o) {
            if ("loggedIn" == n.status) return _.LOGGEDIN;
            var i = o.modem_main_state;
            return -1 != e.inArray(i, t.TEMPORARY_MODEM_MAIN_STATE) ? _.LOADING : "modem_waitpin" == i ? _.WAIT_PIN : "modem_waitpuk" != i && 0 !== parseInt(o.pinnumber) || 0 == parseInt(o.puknumber) ? 0 !== parseInt(o.puknumber) && "modem_sim_destroy" != i || "modem_sim_undetected" == i || "modem_undetected" == i ? _.LOGIN : _.PUK_LOCKED : _.WAIT_PUK
        }

        var I = this;
        I.visibility = t.INCLUDE_MOBILE ? "visible" : "hidden";
        var f = o.getLoginData(), L = o.getLoginStatus();
        I.password = n.observable(), I.PIN = n.observable(), I.PUK = n.observable(), I.newPIN = n.observable(), I.confirmPIN = n.observable(), I.pinNumber = n.observable(f.pinnumber), I.pukNumber = n.observable(f.puknumber), I.loginCount = n.observable(0), I.loginSecuritySupport = n.observable(t.LOGIN_SECURITY_SUPPORT), I.leftSeconds = n.observable(0), I.accountLocked = n.computed(function () {
            return I.loginCount() == t.MAX_LOGIN_COUNT && "-1" != I.leftSeconds()
        }), I.uiLoginTimer = n.observable(300), I.leftUnlockTime = n.computed(function () {
            I.leftSeconds();
            var e = transSecond2Time(I.uiLoginTimer());
            return e.substring(e.indexOf(":") + 1, e.length)
        }), I.showEntrance = n.observable(!1), I.sharePathInvalid = n.observable(!1), I.redirectCause = n.observable(""), s.setRedirectTips(!1), t.SD_CARD_SUPPORT && o.getSDConfiguration({}, function (e) {
            I.showEntrance("1" == e.sd_status && "1" == e.share_status && "0" == e.sd_mode), I.showEntrance() && o.checkFileExists({path: e.share_file}, function (e) {
                "exist" == e.status ? I.sharePathInvalid(!1) : I.sharePathInvalid(!0)
            })
        });
        var N = l(L, f);
        I.pageState = n.observable(N), N == _.LOADING && addTimeout(i, 500), r(), I.showPassword = n.observable(!1), I.showPasswordHandler = function () {
            e("#txtPwdShow").parent().find(".error").hide();
            var n = e("#showPasswordLogin:checked");
            n && 0 == n.length ? I.showPassword(!0) : I.showPassword(!1)
        }, I.login = function () {
            if (t.ACCESSIBLE_ID_SUPPORT && ("" == rd0 || "" == rd1)) {
                var n = o.getLanguage();
                rd0 = n.rd_params0, rd1 = n.rd_params1
            }
            if (t.LOGIN_SECURITY_SUPPORT && I.accountLocked()) return showAlert("password_error_account_lock_time", function () {
                r()
            }), !1;
            I.pageState(_.LOADING), window.clearInterval(g), o.login({password: I.password()}, function (n) {
                setTimeout(function () {
                    g = u()
                }, 1300), "5" == n.result ? (showAlert("lcd_loginfo", function () {
                    r()
                }), I.pageState(_.LOGIN)) : n.result ? (I.pageState(_.LOGGEDIN), t.LOGIN_SECURITY_SUPPORT && (I.loginCount(0), I.uiLoginTimer(300), clearInterval(m)), e("#container").empty(), s.gotoRelevantHashByFlag(), a.init()) : (I.password(""), t.LOGIN_SECURITY_SUPPORT ? I.checkLoginData(function () {
                    I.loginCount() == t.MAX_LOGIN_COUNT ? (showAlert("password_error_five_times", function () {
                        r()
                    }), I.startLoginLockInterval()) : showAlert({
                        msg: "password_error_left",
                        params: [t.MAX_LOGIN_COUNT - I.loginCount()]
                    }, function () {
                        r()
                    })
                }) : showAlert("password_error", function () {
                    r()
                }), I.pageState(_.LOGIN))
            })
        }, I.startLoginLockInterval = function () {
            m = setInterval(function () {
                o.getLoginData({}, function (e) {
                    (e.login_lock_time <= 0 || 5 == e.psw_fail_num_str) && (I.loginCount(0), clearInterval(m)), I.leftSeconds() != e.login_lock_time ? (I.leftSeconds(e.login_lock_time), I.uiLoginTimer(e.login_lock_time)) : I.uiLoginTimer(I.uiLoginTimer() > 0 ? I.uiLoginTimer() - 1 : 0)
                })
            }, 1e3)
        }, I.checkLoginData = function (n) {
            o.getLoginData({}, function (o) {
                var i = parseInt(o.psw_fail_num_str, 10);
                I.loginCount(t.MAX_LOGIN_COUNT - i), I.leftSeconds(o.login_lock_time), I.uiLoginTimer(o.login_lock_time), e.isFunction(n) ? n() : I.loginCount() == t.MAX_LOGIN_COUNT && I.startLoginLockInterval()
            })
        }, I.checkLoginData(), I.enterPIN = function () {
            I.pageState(_.LOADING);
            var e = I.PIN();
            o.enterPIN({PinNumber: e}, function (e) {
                e.result ? i() : (showAlert("pin_error", function () {
                    i()
                }), I.PIN(""))
            })
        }, I.enterPUK = function () {
            I.pageState(_.LOADING);
            var e = I.newPIN(), n = (I.confirmPIN(), {});
            n.PinNumber = e, n.PUKNumber = I.PUK(), o.enterPUK(n, function (e) {
                e.result ? i() : (showAlert("puk_error", function () {
                    i()
                }), I.PUK(""), I.newPIN(""), I.confirmPIN(""))
            })
        }
    }

    function c() {
        if (o.getStatusInfo().isLoggedIn) return void (window.location.hash = "#home");
        var t = e("#container")[0];
        n.cleanNode(t);
        var i = new l;
        n.applyBindings(i, t), e("#frmLogin").validate({
            submitHandler: function () {
                i.login()
            }
        }), e("#frmPIN").validate({
            submitHandler: function () {
                i.enterPIN()
            }, rules: {txtPIN: "pin_check"}
        }), e("#frmPUK").validate({
            submitHandler: function () {
                i.enterPUK()
            }, rules: {txtNewPIN: "pin_check", txtConfirmPIN: {equalToPin: "#txtNewPIN"}, txtPUK: "puk_check"}
        })
    }

    function d() {
        if (window.location.hash != t.defaultRoute && -1 == i.indexOf(t.GUEST_HASH, window.location.hash)) if (manualLogout || "1" != lastLoginStatus) {
            if ("UNREAL" == lastLoginStatus) return;
            window.location = "index.html"
        } else manualLogout = !1, lastLoginStatus = "UNREAL", showAlert("need_login_again", function () {
            window.location = "index.html"
        })
    }

    var _ = {LOGIN: 0, WAIT_PIN: 1, WAIT_PUK: 2, PUK_LOCKED: 3, LOGGEDIN: 4, LOADING: 5}, g = u(), m = 0;
    return {init: c, gotoLogin: d}
});
//# sourceMappingURL=../sourcemaps/login.js.map
