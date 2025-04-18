function log(t, e) {
    _printLog("log", t, e)
}

function debug(t, e) {
    _printLog("debug", t, e)
}

function _printLog(t, e, n) {
    if (!$.browser.msie && window.console) {
        if (n && "object" == typeof e && "object" == typeof n) {
            var r = e;
            $.extend(r, n)
        }
        "debug" == t ? window.console.debug ? window.console.debug(e) : window.console.warn && window.console.warn(e) : window.console.info(e)
    }
}

function isErrorObject(t) {
    return "string" == typeof t.errorType
}

function clearValidateMsg(t) {
    t = t || "*", $(t + " label.error").remove()
}

function transOption(t, e) {
    return e ? function (e) {
        if (0 != e.value) {
            var n = e.value.split("_");
            return n[1] + "MHz " + $.i18n.prop(t + "_" + n[0])
        }
        return $.i18n.prop(t + "_0")
    } : function (e) {
        return $.i18n.prop(t + "_" + e.value)
    }
}

function successOverlay(t, e) {
    showOverLay(t || "success_info", "overlay-success", !e)
}

function errorOverlay(t, e) {
    showOverLay(t || "error_info", "overlay-error", !e)
}

function showOverLay(t, e, n) {
    $.modal.close(), t && ($("#result-image", "#result-overlay").removeClass().addClass(e), $("#result_wording").html("<h2>" + $.i18n.prop(t) + "</h2>")), $("#result-overlay").modal({
        zIndex: 3e3,
        position: ["30%"],
        overlayId: "confirm-overlay",
        containerId: "confirm-container",
        minHeight: 140,
        persist: !0,
        focus: !1,
        escClose: !1
    });
    var r = 3, o = setInterval(function () {
        0 == --r && (clearInterval(o), $("#result-overlay:visible").length > 0 && ($("#confirm-overlay").css("cursor", "default"), $.modal.close()))
    }, 1e3)
}

function showProgressBar(t, e) {
    t && $("#barMsg").html($.i18n.prop(t)), $("#progress").modal({
        zIndex: 3e3,
        position: ["30%"],
        overlayId: "confirm-overlay",
        containerId: "confirm-container",
        minHeight: 140,
        persist: !0,
        focus: !1,
        escClose: !1
    }), e ? $("#progress #progress_container").html(e) : $("#progress #progress_container").html("")
}

function setProgressBar(t) {
    jQuery("#bar").width(400 * t / 100), jQuery("#barValue").text(t + "%")
}

function hideProgressBar() {
    $.modal.close(), setProgressBar(0), $("#barMsg").html("")
}

function showLoading(t, e, n) {
    t ? $("#loadMsg").html($.i18n.prop(t)) : $("#loadMsg").html(""), $("#loading").modal({
        zIndex: 3e3,
        position: ["30%"],
        overlayId: "confirm-overlay",
        containerId: "confirm-container",
        minHeight: 140,
        persist: !0,
        focus: !1,
        escClose: !1
    });
    var r = $("#loading #loading_container"), o = "<a href='javascript:void(0)'>&nbsp;</a>";
    e ? r.html(e + o) : r.html(o), n ? $("#loading #loading_wording").html($.i18n.prop(n)) : $("#loading #loading_wording").html(""), $("a:last", r).focus().hide()
}

function loadingMsgChange(t) {
    $("#loadMsg").html($.i18n.prop(t))
}

function hideLoading() {
    $("#confirm-overlay").css("cursor", "default"), $.modal.close(), $("#loadMsg").html("")
}

function getRandomInt(t) {
    return Math.round(Math.random() * t)
}

function getCurrentDatetime() {
    var t = new Date;
    return t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate() + " " + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds()
}

function getRandomDatetime() {
    var t = new Date;
    return t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate() + " " + getRandomInt(24) + ":" + getRandomInt(60) + ":" + getRandomInt(60)
}

function getRandomDatetimeSep() {
    var t = new Date;
    return t.getFullYear() + "," + (t.getMonth() + 1) + "," + t.getDate() + "," + getRandomInt(24) + "," + getRandomInt(60) + "," + getRandomInt(60)
}

function getCurrentTimeString(t) {
    var e = "", n = t || new Date;
    return e += (n.getFullYear() + "").substring(2) + ";", e += getTwoDigit(n.getMonth() + 1) + ";" + getTwoDigit(n.getDate()) + ";" + getTwoDigit(n.getHours()) + ";" + getTwoDigit(n.getMinutes()) + ";" + getTwoDigit(n.getSeconds()) + ";", n.getTimezoneOffset() < 0 ? e += "+" + (0 - n.getTimezoneOffset() / 60) : e += 0 - n.getTimezoneOffset() / 60, e
}

function getTwoDigit(t) {
    for (t += ""; t.length < 2;) t = "0" + t;
    return t
}

function showConfirm(t, e, n, r, o) {
    r ? $("#yesbtn").attr("data-trans", r) : $("#yesbtn").attr("data-trans", "yes"), o ? $("#nobtn").attr("data-trans", o) : $("#nobtn").attr("data-trans", "no"), $("#yesbtn, #nobtn").translate(), popup({
        title: "confirm",
        img: "img/confirm.png",
        msg: t,
        minHeight: n
    }), $("#yesbtn, #nobtn").show(), $("#okbtn").hide();
    var i = $.isFunction(e), a = $.isPlainObject(e);
    $("#yesbtn").unbind("click").click(function () {
        $.modal.close(), i ? e() : a && $.isFunction(e.ok) && e.ok()
    }), $("#nobtn").unbind("click").click(function () {
        $.modal.close(), a && $.isFunction(e.no) && e.no()
    })
}

function showPrompt(t, e, n, r) {
    popup({
        title: "prompt",
        img: "img/confirm.png",
        msg: t,
        minHeight: n,
        showInput: !0,
        defaultValue: r
    }), $("#yesbtn, #nobtn").unbind("click").show(), $("#okbtn").hide(), $("#yesbtn").click(function () {
        $.isFunction(e) && e() && $.modal.close()
    }), $("#nobtn").click(function () {
        $.modal.close()
    }), $("#promptInput", "#confirm").unbind("keypress").bind("keypress", function (t) {
        13 == t.keyCode && $("#yesbtn").trigger("click")
    })
}

function showPromptNoImg(t, e, n, r) {
    popup({
        title: "prompts",
        img: "img/alert.png",
        msg: t,
        minHeight: n
    }), $("#yesbtn, #nobtn").hide(), $("#okbtn").unbind("click").click(function () {
        $.modal.close(), $.isFunction(e) && e()
    }).show()
}

function showAlert(t, e, n) {
    popup({
        title: "alert",
        img: "img/alert.png",
        msg: t,
        minHeight: n
    }), $("#yesbtn, #nobtn").hide(), $("#okbtn").unbind("click").click(function () {
        $.modal.close(), $.isFunction(e) && e()
    }).show()
}

function showSettingWindow(t, e, n, r, o, i) {
    var a = {title: t, htmlPath: e, jsPath: n, minHeight: o, minWidth: r};
    $.isFunction(i), $.isPlainObject(i);
    popupSettingWindow(a)
}

function popupSettingWindow(t) {
    $.modal.close();
    var e = t.minHeight || 140, n = t.minWidth || 400, r = $("#htmlContainer"), o = "text!tmpl/" + t.htmlPath + ".html";
    require([o, t.jsPath], function (t, e) {
        r.stop(!0, !0), r.hide(), r.html(t), e.init(), $("#htmlContainer").translate(), r.show(), $("#htmlContainer").css("opacity", 50)
    }), $("#popupSettingWindow").modal({
        zIndex: 3e3,
        position: ["30%"],
        escClose: !1,
        minWidth: n,
        minHeight: e,
        maxWidth: 400,
        opacity: 50
    })
}

function hidePopupSettingWindow() {
    $("#popupSettingWindow").remove(), $.modal.close()
}

function showInfo(t, e) {
    popup({
        title: "info",
        img: "img/info.png",
        msg: t,
        minHeight: e
    }), $("#yesbtn, #nobtn").hide(), $("#okbtn").unbind("click").click(function () {
        $.modal.close()
    }).show()
}

function popup(t) {
    if ($("#popupModifyFotaSetWindow").is(":visible")) return !1;
    $.modal.close();
    var e = t.minHeight || 140;
    $("#confirm").modal({
        zIndex: 3e3,
        position: ["30%"],
        overlayId: "confirm-overlay",
        containerId: "confirm-container",
        escClose: !1,
        minHeight: e
    });
    var n = $("div#confirm");
    if ($("#confirmImg", n).attr("src", t.img), $("#popTitle", n).html($.i18n.prop(t.title)), "string" == typeof t.msg) $(".message", n).html($.i18n.prop(t.msg)); else {
        var r = [t.msg.msg];
        r.push(t.msg.params), $(".message", n).html($.i18n.prop.apply(null, _.flatten(r)))
    }
    var o = $("div.promptDiv", n);
    !0 === t.showInput ? (o.show(), $("input#promptInput", o).val(t.defaultValue ? t.defaultValue : ""), $(".promptErrorLabel", o).empty()) : o.hide(), window.setTimeout(function () {
        $(":input:enabled:visible:first", "#confirm-container").focus()
    }, 0)
}

function addTimeout(t, e) {
    var n = window.setTimeout(t, e);
    return _timeoutStack.push(n), n
}

function addInterval(t, e) {
    var n = window.setInterval(t, e);
    return _intervalStack.push(n), n
}

function clearTimer() {
    clearTimeoutTimer(), clearIntervalTimer()
}

function clearTimeoutTimer() {
    for (var t = 0; t < _timeoutStack.length; t++) window.clearTimeout(_timeoutStack[t]);
    _timeoutStack = []
}

function clearIntervalTimer() {
    for (var t = 0; t < _intervalStack.length; t++) window.clearInterval(_intervalStack[t]);
    _intervalStack = []
}

function renderCheckbox() {
    var t = $(".checkboxToggle");
    t.each(function () {
        checkBoxesSize($(this))
    });
    var e = $(".checkbox").not("[class*='checkboxToggle']").find("input:checkbox");
    0 == e.length ? disableCheckbox(t) : enableCheckbox(t), e.each(function () {
        checkCheckbox($(this))
    })
}

function checkBoxesSize(t) {
    var e = t.attr("target"), n = $("#" + e + " .checkbox input:checkbox").length,
        r = $("#" + e + " .checkbox input:checkbox:checked").length, o = t.find("input:checkbox");
    0 != n && n == r ? o.attr("checked", "checked") : o.removeAttr("checked"), checkP(o)
}

function checkSelectAll(t, e) {
    var n = $("#" + e + " .checkbox input:checkbox");
    t.attr("checked") ? n.attr("checked", "checked") : n.removeAttr("checked"), n.each(function () {
        checkCheckbox($(this))
    })
}

function checkCheckbox(t) {
    t.closest("p.checkbox").hasClass("checkboxToggle") && checkSelectAll(t, t.closest("p.checkbox").attr("target")), checkP(t), checkBoxesSize($("#" + t.attr("target")))
}

function checkP(t) {
    t.attr("checked") ? t.closest("p.checkbox").addClass("checkbox_selected") : t.closest("p.checkbox").removeClass("checkbox_selected")
}

function removeChecked(t) {
    $("#" + t).removeClass("checkbox_selected").find("input:checkbox").removeAttr("checked")
}

function disableCheckbox(t) {
    t.find("input:checkbox").attr("checked") ? t.addClass("checked_disable") : t.addClass("disable")
}

function enableCheckbox(t) {
    t.removeClass("disable").removeClass("checked_disable")
}

function tryToDisableCheckAll(t, e) {
    0 == e ? disableCheckbox(t) : enableCheckbox(t)
}

function getEncodeType(t) {
    var e = "GSM7_default", n = 0;
    if (!t) return {encodeType: e, extendLen: n};
    for (var r = 0; r < t.length; r++) {
        for (var o = t.charCodeAt(r).toString(16).toUpperCase(); 4 != o.length;) o = "0" + o;
        if (-1 != $.inArray(o, GSM7_Table_Extend) && n++, -1 == $.inArray(o, GSM7_Table)) {
            e = "UNICODE", n = 0;
            break
        }
    }
    return {encodeType: e, extendLen: n}
}

function encodeMessage(t) {
    var e = 0, n = "";
    if (!t) return n;
    for (var r = 0; r < t.length; r++) {
        var o = t.charCodeAt(r);
        if (0 != e) {
            if (56320 <= o && o <= 57343) {
                n += dec2hex(65536 + (e - 55296 << 10) + (o - 56320)), e = 0;
                continue
            }
            e = 0
        }
        if (55296 <= o && o <= 56319) e = o; else {
            for (cp = dec2hex(o); cp.length < 4;) cp = "0" + cp;
            n += cp
        }
    }
    return n
}

function decodeMessage(t, e) {
    if (!t) return "";
    var n = specialCharsIgnoreWrap;
    return t.replace(/([A-Fa-f0-9]{1,4})/g, function (t, e) {
        return -1 == $.inArray(e, n) ? hex2char(e) : ""
    })
}

function dec2hex(t) {
    return (t + 0).toString(16).toUpperCase()
}

function hex2char(t) {
    var e = "", n = parseInt(t, 16);
    return n <= 65535 ? e += String.fromCharCode(n) : n <= 1114111 && (n -= 65536, e += String.fromCharCode(55296 | n >> 10) + String.fromCharCode(56320 | 1023 & n)), e
}

function escapeMessage(t) {
    return t
}

function parseTime(t) {
    t.indexOf("+") > -1 && (t = t.substring(0, t.lastIndexOf("+")));
    var e;
    return e = t.indexOf(",") > -1 ? t.split(",") : t.split(";"), 0 == e.length ? "" : e[0] + "/" + e[1] + "/" + e[2] + " " + leftInsert(e[3], 2, "0") + ":" + leftInsert(e[4], 2, "0") + ":" + leftInsert(e[5], 2, "0")
}

function transTime(t, e, n) {
    var r = t.split(",");
    if (0 == r.length || -1 != ("," + t + ",").indexOf(",,")) return "";
    var o;
    o = "1" == e ? r[2] + "/" + r[1] + "/" + r[0] + " " : "2" == e ? r[1] + "/" + r[2] + "/" + r[0] + " " : r[0] + "/" + r[1] + "/" + r[2] + " ";
    var i;
    if ("12" == n) {
        var a = trans12hourTime(leftInsert(r[3], 2, "0"));
        i = a[0] + ":" + leftInsert(r[4], 2, "0") + ":" + leftInsert(r[5], 2, "0") + " " + a[1]
    } else i = leftInsert(r[3], 2, "0") + ":" + leftInsert(r[4], 2, "0") + ":" + leftInsert(r[5], 2, "0");
    return o + i
}

function trans12hourTime(t) {
    var e, n;
    return t > 12 ? (e = "PM", n = t - 12) : 12 == t ? (e = "PM", n = 12) : 0 == t ? (e = "AM", n = 12) : (e = "AM", n = t), [n, e]
}

function getSmsCount(t) {
    var e = getEncodeType(t), n = t.length, r = "UNICODE" != e.encodeType, o = !1, i = 0;
    return r ? (o = n + e.extendLen > 160, i = 153) : (o = n > 70, i = 67), o ? Math.ceil((n + e.extendLen) / i) : 1
}

function getInsertPos(t) {
    var e = 0;
    if (t.selectionStart || "0" == t.selectionStart) e = t.selectionStart; else if (document.selection) {
        t.focus();
        var n = document.selection.createRange(), r = n.duplicate();
        for (r.moveToElementText(t); n.compareEndPoints("StartToStart", r) > 0;) n.moveStart("character", -1), e++
    }
    return e
}

function setInsertPos(t, e) {
    if (t.focus(), t.selectionStart || "0" == t.selectionStart) t.selectionStart = e, t.selectionEnd = e; else if (document.selection) {
        var n = t.createTextRange();
        n.moveStart("character", e), n.collapse(!0), n.select()
    }
}

function isIntNum(t, e) {
    for (var n = 1; n < 6; n++) if (t == n * e) return !0;
    return !1
}

function updateLength(t) {
    for (var e, n = 0, r = 0, o = 0; o < t.length && (e = t.charAt(o), n += 1, "[" != e && "]" != e && "{" != e && "}" != e && "|" != e && "\\" != e && "^" != e && "~" != e && "€" != e || (n += 1), r = o, 765 != n); o++) if (n > 765) {
        r = o - 1, n -= 2;
        break
    }
    return {index: r, length: n}
}

function transProtocol(t) {
    var e = "ALL";
    return "1" == t ? e = "TCP" : "2" == t ? e = "UDP" : "3" == t ? e = "TCP+UDP" : "4" == t ? e = "ICMP" : "5" == t && (e = "ALL"), e
}

function transProtocolValue(t) {
    switch (t) {
        case"TCP":
        case"UDP":
        case"ICMP":
            return t;
        case"TCP&UDP":
            return "TCP+UDP";
        case"None":
        default:
            return "ALL"
    }
}

function checkRange(t, e, n) {
    var r = parseInt(t, 10);
    return !(r > n || r < e)
}

function getFileType(t) {
    var e = t.split(".").pop().toLowerCase();
    for (type in extMap) if (-1 != $.inArray(e, extMap[type])) return type;
    return "file"
}

function transUnixTime(t) {
    var e = new Date(parseInt(t, 10));
    return e.getFullYear() + "/" + leftPad(e.getMonth() + 1, 2, "0") + "/" + leftPad(e.getDate(), 2, "0") + " " + leftPad(e.getHours(), 2, "0") + ":" + leftPad(e.getMinutes(), 2, "0") + ":" + leftPad(e.getSeconds(), 2, "0")
}

function leftPad(t, e, n) {
    for (var r = t.toString().length; r < e; r++) t = n + t;
    return t
}

function convertNumberToId(t) {
    return t.replace(/[\+\*#]/g, "_")
}

function getLast8Number(t) {
    return convertNumberToId(t.length > 8 ? t.substring(t.length - 8, t.length) : t)
}

function fixTableHeight() {
    if ($.browser.msie) var t = setInterval(function () {
        var e = $(".fixTableScroll")[0];
        if (e) {
            var n = e.scrollHeight;
            0 != n && (e.style.height = n + 20, window.clearInterval(t))
        } else window.clearInterval(t)
    }, 300)
}

function refreshTableHeight() {
    $.browser.msie && ($(".fixTableScroll")[0].style.height = $(".fixTableScroll .ko-grid-container")[0].scrollHeight + 35)
}

function transUnit(t, e) {
    var n = getDisplayVolume(t, e);
    return "" == n && (n = e ? "0b" : "0MB"), e && (n += "/s"), n
}

function transSecond2Time(t) {
    var e = !1;
    t < 0 && (e = !0, t = 0 - t);
    var n = Math.floor(t / 3600);
    t %= 3600;
    var r = Math.floor(t / 60);
    return t = Math.round(t % 60), (e ? "-" : "") + leftInsert(n, 2, "0") + ":" + leftInsert(r, 2, "0") + ":" + leftInsert(t, 2, "0")
}

function leftInsert(t, e, n) {
    for (var r = t.toString().length; r < e; r++) t = n + t;
    return t
}

function getDisplayVolume(t, e) {
    if ("" == (t = parseInt(t, 10)) || "0" == t) return "";
    var n = !1;
    t < 0 && (n = !0, t = 0 - t);
    var r = e ? "b" : "B", o = e ? "Kb" : "KB", i = e ? "Mb" : "MB", a = e ? "Gb" : "GB", c = e ? "Tb" : "TB";
    e && (t *= 8);
    var s = t / 1099511627776, u = roundToTwoDecimalNumber(s) + c;
    return s < .5 && (s = t / 1073741824, u = roundToTwoDecimalNumber(s) + a, s < .5 && (s = t / 1048576, u = roundToTwoDecimalNumber(s) + i, e && s < .5 && (s = t / 1024, u = roundToTwoDecimalNumber(s) + o, s < .5 && (s = t, u = roundToTwoDecimalNumber(s) + r)))), n && (u = "-" + u), u
}

function roundToTwoDecimalNumber(t) {
    return Math.round(100 * t) / 100
}

function HTMLEncode(t) {
    return Escape.html(t)
}

function HTMLDecode(t) {
    var e = document.createElement("div");
    e.innerHTML = t;
    var n = e.innerText || e.textContent;
    return n = n.replace(new RegExp("&nbsp;", "gm"), " "), e = null, n
}

function getPercent(t, e, n) {
    return n ? n *= 10 : n = 100, roundToTwoDecimalNumber(t / e * n) + "%"
}

function checkConnectedStatus(t) {
    return "ppp_connected" == t || "ipv6_connected" == t || "ipv4_ipv6_connected" == t
}

function checkConnectingOrDisconnectingStatus(t) {
    return "ppp_connecting" == t || "ppp_disconnecting" == t
}

function disableBtn(t) {
    t.attr("disabled", "disabled").removeClass("focusIn").addClass("disabled")
}

function enableBtn(t) {
    t.removeAttr("disabled").removeClass("disabled")
}

function replaceSpaceWithNbsp(t) {
    return t.replace(/ /g, "&nbsp;")
}

function syncSelectAndChosen(t, e) {
    return getSelectValFromChosen(e)
}

function getSelectValFromChosen(t) {
    var e = [];
    return $.each(t, function (t, n) {
        var r = $(n).text().split("/");
        e.push(r[r.length - 1])
    }), e
}

function trim(t) {
    return t.replace(/^\s+|\s+$/g, "")
}

function isWifiConnected(t, e) {
    return !!_.find(e, function (e) {
        return e.ip_addr == t
    })
}

function verifyDeviceInfo(t) {
    return t && "" != t && "0.0.0.0" != t ? t : "— —"
}

function signalFormat(t) {
    return t ? t > 0 ? "-" + t + " dBm" : t + " dBm" : "— —"
}

function signalFormat_sinr(t) {
    return t && "" != t ? t + " dB" : "— —"
}

function frequencyFormat(t) {
    return t && "" != t ? t : "— —"
}

function convertSignal(t) {
    var e = ["GSM", "GPRS", "EDGE"], n = ["UMTS", "HSDPA", "HSUPA", "HSPA", "HSPA+", "DC", "DC-HSPA", "DC-HSPA+"],
        r = ["LTE", "LTE_CA", "LTE_A"];
    return -1 != $.inArray(t.network_type, e) ? t.rssi : -1 != $.inArray(t.network_type, n) ? t.rscp : -1 != $.inArray(t.network_type, r) ? t.lte_rsrp : void 0
}

function convertSignal4g(t) {
    return -1 != $.inArray(t.network_type, type_2g) ? t.rssi : -1 != $.inArray(t.network_type, type_3g) ? t.rscp : -1 != $.inArray(t.network_type, type_4g) ? t.lte_rsrp : -1 != $.inArray(t.network_type, type_5g) ? t.lte_rsrp : -1 != $.inArray(t.network_type, type_5g_sa) ? "" : void 0
}

function convertSignal5g(t) {
    if (-1 != $.inArray(t.network_type, type_5g) || -1 != $.inArray(t.network_type, type_5g_sa)) return t.Z5g_rsrp
}

function RndNum(t) {
    for (var e = "", n = 0; n < t; n++) e += Math.floor(10 * Math.random());
    return e
}

function checkPassword(t, e) {
    var n = !0;
    if ("" == $.trim(t)) n = "login_password_required"; else if ("WPAPSK" == e.authMode || "WPA2PSK" == e.authMode || "WPAPSKWPA2PSK" == e.authMode) {
        var r = /^([0-9A-Fa-f]{8,64}|[0-9a-zA-Z!#\(\)\-\.\/=@\^_\{|\}~ ]{8,63})$/.test(t);
        0 == r && (n = "wifi_password_check")
    } else if ("SHARED" == e.authMode || "WEP" == e.encryptType) {
        var r = /^([0-9A-Fa-f]{10}|[0-9A-Fa-f]{26}|[0-9a-zA-Z!#\(\)\+\-\.\/%=\?@\^_\{|\}~ ]{5}|[0-9a-zA-Z!#\(\)\+\-\.\/%=\?@\^_\{|\}~ ]{13})$/.test(t);
        0 == r && (n = "wifi_wep_password_check")
    }
    return n
}

function showConfirm_sbm(t, e, n, r, o) {
    r ? $("#yesbtn_sbm").attr("trans", r) : $("#yesbtn_sbm").attr("trans", "yes"), o ? $("#nobtn_sbm").attr("trans", o) : $("#nobtn_sbm").attr("trans", "no"), $("#yesbtn_sbm, #nobtn_sbm").translate(), popup_sbm({
        title: t.title,
        img: t.img,
        msg: t.msg,
        minHeight: n
    }), $("#yesbtn_sbm, #nobtn_sbm").show(), $("#okbtn_sbm").hide();
    var i = $.isFunction(e), a = $.isPlainObject(e);
    $("#yesbtn_sbm").unbind("click").click(function () {
        inputContext = $("#current_pin_sbm").val(), currentKeyID = $("#current_key_id").val(), $.modal.close(), i ? e() : a && $.isFunction(e.ok) && e.ok()
    }), $("#nobtn_sbm").unbind("click").click(function () {
        $.modal.close(), a && $.isFunction(e.no) && e.no()
    }), $("#current_pin_sbm").unbind("keypress").bind("keypress", function () {
        inputContext = $("#current_pin_sbm").val(), currentKeyID = $("#current_key_id").val()
    }).bind("keyup", function () {
        inputContext = $("#current_pin_sbm").val(), currentKeyID = $("#current_key_id").val()
    }), $("#confirm_sbm").translate()
}

function popup_sbm(t) {
    $.modal.close();
    var e = t.minHeight || 140;
    $("#confirm_sbm").modal({
        position: ["30%"],
        overlayId: "confirm-overlay",
        containerId: "confirm-container",
        escClose: !1,
        minHeight: e
    });
    var n = $("div#confirm_sbm");
    if ("" == t.img ? $("#confirmImg_sbm", n).hide() : $("#confirmImg_sbm", n).attr("src", t.img), $("#popTitle_sbm", n).html($.i18n.prop(t.title)), "string" == typeof t.msg) $(".message", n).html($.i18n.prop(t.msg)); else {
        var r = [t.msg.msg];
        r.push(t.msg.params), $(".message", n).html($.i18n.prop.apply(null, _.flatten(r)))
    }
    var o = $("div.promptDiv", n);
    !0 === t.showInput ? (o.show(), $("input#promptInput_sbm", o).val(t.defaultValue ? t.defaultValue : ""), $(".promptErrorLabel", o).empty()) : o.hide(), window.setTimeout(function () {
        $(":input:enabled:visible:first", "#confirm-container").focus()
    }, 0)
}

function getDataInfo(t) {
    return {data: /\d+(.\d+)?/.exec(t)[0], unit: /[A-Z]{1,2}/.exec(t)[0]}
}

function shortenLongName(t, e) {
    return t.length > e ? t.substring(0, e) + "..." : t
}

function getNetworkType(t, e) {
    var n = t.toLowerCase();
    return "" != n && "limited service" != n || (n = "limited_service"), "no service" == n && (n = "no_service"), "limited_service" == n || "no_service" == n ? ($("#networkType", "#statusBar").attr("data-trans", "network_type_" + n), $.i18n.prop("network_type_" + n)) : ($("#networkType", "#statusBar").removeAttr("data-trans"), -1 != n.indexOf("lte") && e ? "LTE+" : t)
}

function showModifyFotaWindow(t, e, n, r, o, i) {
    var a = {title: t, htmlPath: e, jsPath: n, minHeight: o, minWidth: r};
    $.isFunction(i), $.isPlainObject(i);
    popupModifyFotaWindow(a)
}

function popupModifyFotaWindow(t) {
    $.modal.close();
    var e = t.minHeight || 140, n = t.minWidth || 400, r = $("#fotaSetContainer"),
        o = "text!tmpl/" + t.htmlPath + ".html";
    require([o, t.jsPath], function (t, e) {
        r.stop(!0, !0), r.hide(), r.html(t), e.init(), $("#fotaSetContainer").translate(), r.show(), $("#fotaSetContainer").css("opacity", 50), $("#txtCurrentPassword").focus()
    }), $("#popupModifyFotaSetWindow").modal({
        zIndex: 3e3,
        position: ["20%"],
        escClose: !1,
        minWidth: n,
        minHeight: e,
        maxWidth: 700,
        opacity: 50,
        fixed: !1,
        autoResize: !0
    })
}

function hidePopupModifyFotaSetWindow() {
    $("#popupModifyFotaSetWindow").remove(), $.modal.close()
}

function ip_to_binary(t) {
    if (ip_reg.test(t)) {
        for (var e = "", n = t.split("."), r = 0; r < 4; r++) {
            curr_num = n[r], number_bin = parseInt(curr_num), number_bin = number_bin.toString(2), count = 8 - number_bin.length;
            for (var o = 0; o < count; o++) number_bin = "0" + number_bin;
            e += number_bin
        }
        return e
    }
    return ""
}

function binary_to_ip(t) {
    return 32 == t.length ? (a = parseInt(t.substr(0, 8), 2), b = parseInt(t.substr(8, 8), 2), c = parseInt(t.substr(16, 8), 2), d = parseInt(t.slice(-8), 2), a + "." + b + "." + c + "." + d) : ""
}

function get_network_broadcast_addr(t, e) {
    network_broadcast = [], network_addr = "", mask_arr = t.split("."), ip_arr = e.split(".");
    for (var n = 0; n < 4; n++) number1 = parseInt(mask_arr[n]), number2 = parseInt(ip_arr[n]), network_addr += number1 & number2, n < 3 && (network_addr += ".");
    return network_broadcast.push(network_addr), mask_binary = ip_to_binary(t), gateway_binary = ip_to_binary(e), mask_zero = mask_binary.split(0).length - 1, one_number = new Array(mask_zero + 1).join("1"), gateway_hou_wei_bu_yi = gateway_binary.slice(0, -mask_zero) + one_number, network_broadcast.push(binary_to_ip(gateway_hou_wei_bu_yi)), network_broadcast
}

function paswordAlgorithmsCookie(t) {
    return SHA256(t)
}

function SHA256(t) {
    function e(t, e) {
        var n = (65535 & t) + (65535 & e);
        return (t >> 16) + (e >> 16) + (n >> 16) << 16 | 65535 & n
    }

    function n(t, e) {
        return t >>> e | t << 32 - e
    }

    function r(t, e) {
        return t >>> e
    }

    function o(t, e, n) {
        return t & e ^ ~t & n
    }

    function i(t, e, n) {
        return t & e ^ t & n ^ e & n
    }

    function a(t) {
        return n(t, 2) ^ n(t, 13) ^ n(t, 22)
    }

    function c(t) {
        return n(t, 6) ^ n(t, 11) ^ n(t, 25)
    }

    function s(t) {
        return n(t, 7) ^ n(t, 18) ^ r(t, 3)
    }

    function u(t) {
        return n(t, 17) ^ n(t, 19) ^ r(t, 10)
    }

    var l = 8, p = 1;
    return t = function (t) {
        t = t.replace(/\r\n/g, "\n");
        for (var e = "", n = 0; n < t.length; n++) {
            var r = t.charCodeAt(n);
            r < 128 ? e += String.fromCharCode(r) : r > 127 && r < 2048 ? (e += String.fromCharCode(r >> 6 | 192), e += String.fromCharCode(63 & r | 128)) : (e += String.fromCharCode(r >> 12 | 224), e += String.fromCharCode(r >> 6 & 63 | 128), e += String.fromCharCode(63 & r | 128))
        }
        return e
    }(t), function (t) {
        for (var e = p ? "0123456789ABCDEF" : "0123456789abcdef", n = "", r = 0; r < 4 * t.length; r++) n += e.charAt(t[r >> 2] >> 8 * (3 - r % 4) + 4 & 15) + e.charAt(t[r >> 2] >> 8 * (3 - r % 4) & 15);
        return n
    }(function (t, n) {
        var r, l, p, d, f, m, g, h, _, b, v, $,
            w = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298),
            y = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225),
            k = new Array(64);
        t[n >> 5] |= 128 << 24 - n % 32, t[15 + (n + 64 >> 9 << 4)] = n;
        for (var _ = 0; _ < t.length; _ += 16) {
            r = y[0], l = y[1], p = y[2], d = y[3], f = y[4], m = y[5], g = y[6], h = y[7];
            for (var b = 0; b < 64; b++) k[b] = b < 16 ? t[b + _] : e(e(e(u(k[b - 2]), k[b - 7]), s(k[b - 15])), k[b - 16]), v = e(e(e(e(h, c(f)), o(f, m, g)), w[b]), k[b]), $ = e(a(r), i(r, l, p)), h = g, g = m, m = f, f = e(d, v), d = p, p = l, l = r, r = e(v, $);
            y[0] = e(r, y[0]), y[1] = e(l, y[1]), y[2] = e(p, y[2]), y[3] = e(d, y[3]), y[4] = e(f, y[4]), y[5] = e(m, y[5]), y[6] = e(g, y[6]), y[7] = e(h, y[7])
        }
        return y
    }(function (t) {
        for (var e = Array(), n = (1 << l) - 1, r = 0; r < t.length * l; r += l) e[r >> 5] |= (t.charCodeAt(r / l) & n) << 24 - r % 32;
        return e
    }(t), t.length * l))
}

function convertCAStatus(t) {
    var e;
    switch (t) {
        case"ca_activated":
            e = $.i18n.prop("ca_active");
            break;
        case"ca_deactivated":
            e = $.i18n.prop("ca_inactive");
            break;
        default:
            e = $.i18n.prop("no_ca")
    }
    return e
}

function checkVpnConnectedStatus(t) {
    return "connected" == t
}

function getFrequency5g(t) {
    return -1 != $.inArray(t.network_type, type_5g) || -1 != $.inArray(t.network_type, type_5g_sa) ? t.nr5g_action_band.toUpperCase() : "— —"
}

function PasswordStrength(t, e) {
    var n = this, r = $("#" + t).val();
    "" != r && n.checkStrength(r, e), document.getElementById(t).onkeyup = function () {
        n.checkStrength(this.value, e)
    }
}

function updateCustomRadio() {
    $(":radio").each(function (t, e) {
        var n = $(e);
        n.is(":checked") ? n.siblings("span.AttRadio").addClass("AttRadioSelected") : n.siblings("span.AttRadio").removeClass("AttRadioSelected"), n.hasClass("hide_sbm") ? n.siblings("span.AttRadio").addClass("hide") : n.siblings("span.AttRadio").removeClass("hide")
    })
}

function setProgressBar_datausage(t) {
    jQuery("#bar_datausage").width(800 * t / 100)
}

function setProgressBar_datausage_alertLine(t) {
    jQuery("#bar_datausage_alertLine").width(800 * t / 100)
}

function fixLength(t, e) {
    return /^[1-9]\d*$/.test(e) ? (t += "", t.length > e && (t = t.substr(0, e), /\.$/.test(t) && (t = t.substr(0, t.length - 1))), t) : t
}

function padLeft(t, e) {
    return (Math.pow(10, e) + t + "").substr(1)
}

function handleWifiChipStatus(t, e, n) {
    return "0" == t ? "0" : "1" == e && "1" == n ? "chip1_2" : "1" == e && "1" != n ? "chip1" : "1" != e && "1" == n ? "chip2" : "chip1_2"
}

function handleWifiGuestStatus(t, e) {
    return "1" == t || "1" == e ? "1" : "0"
}

function numRound(t) {
    var e = t + "";
    return e.length < 2 ? "0" + e : e
}

function showAlertCustomIcon(t, e, n, r, o, i) {
    var a = "alert", c = "img/alert.png";
    r && (a = r), o && (c = o), popup({
        title: a,
        img: c,
        msg: t,
        minHeight: n,
        style: i
    }), "mesh_device_list_search" == t ? $("#confirm-container").addClass("meshList") : $("#confirm-container").removeClass("meshList"), $("#yesbtn, #nobtn").hide(), $("#okbtn").unbind("click").click(function () {
        $.modal.close(), $.isFunction(e) && e()
    }).show()
}

function IsPC() {
    for (var t = window.navigator.userAgent, e = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"), n = !0, r = 0; r < e.length; r++) if (t.indexOf(e[r]) > 0) {
        n = !1;
        break
    }
    return n
}

function convertMacAddr(t) {
    var e = "", n = t.split(":");
    if (n.length < 5) return e = t;
    if ("00" == n[4]) {
        var r = "0x" + n[5];
        r = (r - 1).toString(16);
        for (var o = 0; o < n.length; o++) e = 5 == o ? e + numRound(r) + ":" : e + n[o] + ":"
    } else {
        var r = "0x" + n[4];
        r = (r - 1).toString(16);
        for (var o = 0; o < n.length; o++) e = 4 == o ? e + numRound(r) + ":" : e + n[o] + ":"
    }
    return e.slice(0, 17)
}

function convertConnectStatusImg(t) {
    return checkConnectedStatus(t) ? "img/img_wp_connect.png" : "img/img_wp_disconnect.png"
}

function convertConnectStatusInfo(t) {
    return checkConnectedStatus(t) ? $.i18n.prop("guide_connect_status_connect_info") : $.i18n.prop("guide_connect_status_disconnect_info")
}

function fixLength(t, e) {
    return /^[1-9]\d*$/.test(e) ? (t += "", t.length > e && (t = t.substr(0, e), /\.$/.test(t) && (t = t.substr(0, t.length - 1))), t) : t
}

function isIPv4(t) {
    return new RegExp("^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$").test(t)
}

function isIPv6(t) {
    return new RegExp("^((([0-9A-Fa-f]{1,4}:){7}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}:[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){5}:([0-9A-Fa-f]{1,4}:)?[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){4}:([0-9A-Fa-f]{1,4}:){0,2}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){3}:([0-9A-Fa-f]{1,4}:){0,3}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){2}:([0-9A-Fa-f]{1,4}:){0,4}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){6}((\b((25[0-5])|(1d{2})|(2[0-4]d)|(d{1,2}))\b).){3}(\b((25[0-5])|(1d{2})|(2[0-4]d)|(d{1,2}))\b))|(([0-9A-Fa-f]{1,4}:){0,5}:((\b((25[0-5])|(1d{2})|(2[0-4]d)|(d{1,2}))\b).){3}(\b((25[0-5])|(1d{2})|(2[0-4]d)|(d{1,2}))\b))|(::([0-9A-Fa-f]{1,4}:){0,5}((\b((25[0-5])|(1d{2})|(2[0-4]d)|(d{1,2}))\b).){3}(\b((25[0-5])|(1d{2})|(2[0-4]d)|(d{1,2}))\b))|([0-9A-Fa-f]{1,4}::([0-9A-Fa-f]{1,4}:){0,5}[0-9A-Fa-f]{1,4})|(::([0-9A-Fa-f]{1,4}:){0,6}[0-9A-Fa-f]{1,4})|(([0-9A-Fa-f]{1,4}:){1,7}:))$").test(t)
}

function padLeft(t, e) {
    return (Math.pow(10, e) + t + "").substr(1)
}

function getWanModeTrans(t) {
    return "PPPOE" == t ? "pppoe_mode_type_PPPOE" : "DHCP" == t ? "pppoe_mode_type_DHCP" : "STATIC" == t ? "pppoe_mode_type_STATIC" : "pppoe_mode_type_NONE"
}

function getSingleWanPortStatus(t, e) {
    return "0" == t.substring(0, 1) ? "wan_port_status_not_plug" : "1" == e ? "wan_port_status_connected" : "wan_port_status_not_connected"
}

function getMultiWanPortStatus(t, e, n, r) {
    return "port_out" == t ? "wan_port_status_not_plug" : "PPPOE" == e && "ppp_connected" == n ? "wan_port_status_connected" : "DHCP" == e && "1" == r ? "wan_port_status_connected" : "wan_port_status_not_connected"
}

function isShowOfflineInfo(t, e, n) {
    var r = !1;
    return "1" != t ? r : r = parseInt(e) < parseInt(n)
}

function getVpnConnectStatus(t, e, n, r, o) {
    return "l2tp" == t ? e : "pptp" == t ? n : "ipsec" == t ? "ipsec_" + r : "gre" == t ? o : "vpn_disconnected"
}

function padLeft(t, e) {
    return (Math.pow(10, e) + t + "").substr(1)
}

function convertConnectStatusImg(t) {
    return checkConnectedStatus(t) ? "img/img_wp_connect.png" : "img/img_wp_disconnect.png"
}

function convertConnectStatusInfo(t) {
    return checkConnectedStatus(t) ? $.i18n.prop("guide_connect_status_connect_info") : $.i18n.prop("guide_connect_status_disconnect_info")
}

function getWanModeTrans(t) {
    return "PPPOE" == t ? "pppoe_mode_type_PPPOE" : "DHCP" == t ? "pppoe_mode_type_DHCP" : "STATIC" == t ? "pppoe_mode_type_STATIC" : "pppoe_mode_type_NONE"
}

function getSingleWanPortStatus(t, e) {
    return "0" == t.substring(0, 1) ? "wan_port_status_not_plug" : "1" == e ? "wan_port_status_connected" : "wan_port_status_not_connected"
}

function getMultiWanPortStatus(t, e, n, r) {
    return "port_out" == t ? "wan_port_status_not_plug" : "PPPOE" == e && "ppp_connected" == n ? "wan_port_status_connected" : "DHCP" == e && "1" == r ? "wan_port_status_connected" : "wan_port_status_not_connected"
}

function checkWanlan1ConnectStatus(t) {
    return "PPPOE" == t.mwan_wanlan1_link_mode ? void 0 === t.mwan_wanlan1_pppoe_status ? "ppp_disconnected" : t.mwan_wanlan1_pppoe_status : "DHCP" == t.mwan_wanlan1_link_mode ? "1" == t.mwan_wanlan1_dhcp_status ? "ppp_connected" : "ppp_disconnected" : void 0
}

var lastLoginStatus = "UNREAL", manualLogout = !1, type_2g = ["GSM", "GPRS", "EDGE"],
    type_3g = ["UMTS", "HSDPA", "HSUPA", "HSPA", "HSPA+", "DC", "DC-HSPA", "DC-HSPA+", "DC-HSDPA"],
    type_4g = ["LTE", "LTE_CA", "LTE_A", "LTE-NSA"], type_5g = ["ENDC"], type_5g_sa = ["SA"], _timeoutStack = [],
    _intervalStack = [];
$(document).ready(function () {
    $("[manualControl!=true].checkbox").live("click", function (t) {
        var e = $(this);
        if (e.hasClass("disable")) return !1;
        var n = e.find("input:checkbox");
        return n.attr("checked") ? n.removeAttr("checked") : n.attr("checked", "checked"), checkCheckbox(n), t.stopPropagation(), !0
    }), $('input[type="text"][noAction!="true"],input[type="password"][noAction!="true"],select').live("focusin", function (t) {
        $(this).addClass("focusIn")
    }).live("focusout", function (t) {
        $(this).removeClass("focusIn")
    }), $(".form-note .notes-title").live("click", function () {
        var t = $(this);
        t.siblings("ul.notes-content:first").slideToggle(), t.toggleClass("notes-dot")
    })
});
var GSM7_Table = ["000A", "000C", "000D", "0020", "0021", "0022", "0023", "0024", "0025", "0026", "0027", "0028", "0029", "002A", "002B", "002C", "002D", "002E", "002F", "0030", "0031", "0032", "0033", "0034", "0035", "0036", "0037", "0038", "0039", "003A", "003A", "003B", "003C", "003D", "003E", "003F", "0040", "0041", "0042", "0043", "0044", "0045", "0046", "0047", "0048", "0049", "004A", "004B", "004C", "004D", "004E", "004F", "0050", "0051", "0052", "0053", "0054", "0055", "0056", "0057", "0058", "0059", "005A", "005B", "005C", "005D", "005E", "005F", "0061", "0062", "0063", "0064", "0065", "0066", "0067", "0068", "0069", "006A", "006B", "006C", "006D", "006E", "006F", "0070", "0071", "0072", "0073", "0074", "0075", "0076", "0077", "0078", "0079", "007A", "007B", "007C", "007D", "007E", "00A0", "00A1", "00A3", "00A4", "00A5", "00A7", "00BF", "00C4", "00C5", "00C6", "00C7", "00C9", "00D1", "00D6", "00D8", "00DC", "00DF", "00E0", "00E4", "00E5", "00E6", "00E8", "00E9", "00EC", "00F1", "00F2", "00F6", "00F8", "00F9", "00FC", "0393", "0394", "0398", "039B", "039E", "03A0", "03A3", "03A6", "03A8", "03A9", "20AC"],
    GSM7_Table_Extend = ["007B", "007D", "005B", "005D", "007E", "005C", "005E", "20AC", "007C"],
    specialChars = ["000D", "000A", "0009", "0000"], specialCharsIgnoreWrap = ["0009", "0000"], extMap = {
        mp3: ["mp3", "wma", "wav"],
        film: ["mp4", "avi", "rm", "rmvb", "3gp", "mpeg"],
        picture: ["jpeg", "jpg", "gif", "bmp", "png"],
        pdf: ["pdf"],
        rar: ["rar", "7z", "zip", "gzip", "gz", "tar"],
        doc: ["doc", "docx"],
        ppt: ["ppt", "pptx"],
        xls: ["xls", "xlsx"],
        xml: ["xml"]
    }, Escape = {
        html: function (t) {
            return (t + "").replace(/[&<>"'\/`]/g, Escape._htmlReplacer)
        }, regex: function (t) {
            return (t + "").replace(/[\-$\^*()+\[\]{}|\\,.?\s]/g, "\\$&")
        }, _htmlReplacer: function (t) {
            return Escape.HTML_CHARS[t]
        }, HTML_CHARS: {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "/": "&#x2F;", "`": "&#x60;"}
    }, popover = {
        popoverEle: null, _init: function () {
            null == this.popoverEle && ($("body").append('<div class="popover"></div>'), this.popoverEle = $(".popover"))
        }, open: function (t) {
            this._init();
            var e = t.target.offset(), n = e.top + t.target.outerHeight();
            this.popoverEle.html(t.html).css({
                width: t.width,
                left: e.left,
                top: n
            }).data({source: t.target[0].id}).translate(), setTimeout(function () {
                popover.popoverEle.show()
            }, 100), this.popoverEle.translate(), t.validation && t.validation.apply()
        }, close: function () {
            this.popoverEle && this.popoverEle.fadeOut()
        }, show: function () {
            this.popoverEle && this.popoverEle.show()
        }, hide: function () {
            this.popoverEle && this.popoverEle.hide()
        }
    };
$(document).ready(function () {
    $("body").click(function (t) {
        var e = $(".popover"), n = $(t.target);
        (t.target.id != e.data("source") && 0 == n.parents(".popover").length || n.hasClass("popover-close")) && popover.close()
    })
})
;var ip_reg = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    mask_reg = /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/;
checkStrength = function (t, e) {
    var n = 0;
    t.match(/[a-z]/g) && n++, t.match(/[0-9]/g) && n++, t.match(/[A-Z]/g) && n++, t.match(/[^A-Za-z0-9]/g) && n++, t.length < 8 && (n = 0), n > 3 && (n = 3), document.getElementById(e).className = "passStrength" + n, n >= 0 ? $("#" + e).removeAttr("data-trans").attr("data-trans", "password_strength_" + n).translate() : $("#" + e).removeAttr("data-trans").html("password_strength_0")
}, $(document).ready(function () {
    $("input:radio").die().live("change", function () {
        var t = $(this);
        $("p.radiobox", t.closest("div").parent()).removeClass("radiobox_selected"), t.parent("p.radiobox").addClass("radiobox_selected"), t.focus()
    }).live("focus", function (t) {
        $(this).parent("p").addClass("radiobox_selected")
    }).live("blur", function (t) {
        $(this).parent("p").removeClass("radiobox_selected")
    }), $("p.radiobox").die().live("click", function () {
        var t = $(this);
        if (t.hasClass("disable") || t.hasClass("checked_disable")) return !1;
        for (var e = t.attr("for"), n = ($("p.radiobox[for=" + e + "]"), $("input:radio[name=" + e + "]")), r = t.find("input"), o = 0; o < n.length; o++) if (r.attr("id") == n[o].id) {
            var i = n[o].id;
            $("#" + i).attr("checked", !0), $("#" + i)[0].click(), $("#" + i).parent("p.radiobox").addClass("radiobox_selected"), t.focus()
        } else {
            var i = n[o].id;
            $("#" + i).attr("checked", !1), $("#" + i).parent("p.radiobox").removeClass("radiobox_selected")
        }
    })
});
//# sourceMappingURL=../sourcemaps/util.js.map
