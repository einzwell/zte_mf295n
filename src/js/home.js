define(["knockout", "service", "jquery", "config/config", "underscore", "status/statusBar", "echarts", "echarts/chart/pie"], function (e, t, n, a, i, o, s) {
    function r() {
        function s() {
            var e = t.getDeviceInfo();
            return d.simSerialNumber(verifyDeviceInfo(e.simSerialNumber)), d.imei(verifyDeviceInfo(e.imei)), d.imsi(verifyDeviceInfo(e.imsi)), d.wifiLongMode("wifi_des_" + e.wifiRange), e
        }

        function r() {
            var e = s();
            m.initShownStatus(e);
            var t = m.getWanIpAddr(e), o = i.template(n("#detailInfoTmpl").html()), r = o({
                simSerialNumber: verifyDeviceInfo(e.simSerialNumber),
                imei: verifyDeviceInfo(e.imei),
                imsi: verifyDeviceInfo(e.imsi),
                signal: signalFormat(e.signal),
                hasWifi: a.HAS_WIFI,
                isCPE: -1 != a.DEVICE.toLowerCase().indexOf("cpe"),
                showMultiSsid: a.HAS_MULTI_SSID && "1" == e.multi_ssid_enable,
                ssid: verifyDeviceInfo(e.ssid),
                max_access_num: verifyDeviceInfo(e.max_access_num),
                m_ssid: verifyDeviceInfo(e.m_ssid),
                m_max_access_num: verifyDeviceInfo(e.m_max_access_num),
                wifi_long_mode: "wifi_des_" + e.wifiRange,
                lanDomain: verifyDeviceInfo(e.lanDomain),
                ipAddress: verifyDeviceInfo(e.ipAddress),
                showMacAddress: a.SHOW_MAC_ADDRESS,
                macAddress: verifyDeviceInfo(e.macAddress),
                showIpv4WanIpAddr: m.initStatus.showIpv4WanIpAddr,
                wanIpAddress: t.wanIpAddress,
                showIpv6WanIpAddr: m.initStatus.showIpv6WanIpAddr,
                ipv6WanIpAddress: t.ipv6WanIpAddress,
                sw_version: verifyDeviceInfo(e.sw_version),
                fw_version: verifyDeviceInfo(e.fw_version),
                hw_version: verifyDeviceInfo(e.hw_version)
            });
            return n(r).translate()
        }

        var d = this;
        d.cpeMode = null, d.isSupportSD = a.SD_CARD_SUPPORT, d.showUSSD = a.HAS_USSD, d.visibility = a.INCLUDE_MOBILE ? "visible" : "hidden", d.isCPE = "CPE" == a.PRODUCT_TYPE, d.supportModeChange = !(void 0 !== a.OPMODE_CHANGE_SUPPORT && !a.OPMODE_CHANGE_SUPPORT);
        var l = t.getWifiBasic();
        if (d.showQrCode = e.observable("1" == l.wifi_enable), d.qrcodeSrc = a.WIFI_SUPPORT_QR_CODE ? "./img/qrcode_ssid_wifikey.png?_=" + n.now() : "", d.isCPE) {
            var p = t.getOpMode();
            d.cpeMode = p.opms_wan_mode, d.isShowHomeConnect = e.observable(m.showHomeConnect(p.opms_wan_mode)), d.isWirelessMode = e.observable(m.showHomeConnect(p.opms_wan_mode))
        } else d.isShowHomeConnect = e.observable(!0), d.isWirelessMode = e.observable(!0);
        var u = t.getConnectionInfo();
        d.networkType = e.observable(getNetworkType(u.networkType, u.isCaStatus)), d.connectStatus = e.observable(u.connectStatus), d.canConnect = e.observable(!1), d.cStatus = e.computed(function () {
            return -1 != d.connectStatus().indexOf("_connected") ? c.CONNECTED : -1 != d.connectStatus().indexOf("_disconnecting") ? c.DISCONNECTING : -1 != d.connectStatus().indexOf("_connecting") ? c.CONNECTING : c.DISCONNECTED
        }), d.current_Flux = e.observable(transUnit(0, !1)), d.connected_Time = e.observable(transSecond2Time(0)), d.up_Speed = e.observable(transUnit(0, !0)), d.down_Speed = e.observable(transUnit(0, !0)), d.isLoggedIn = e.observable(!1), d.enableFlag = e.observable(!1), d.simSerialNumber = e.observable(""), d.imei = e.observable(""), d.imsi = e.observable(""), d.wifiLongMode = e.observable(""), d.trafficAlertEnable = e.observable(!1), d.trafficUsed = e.observable(""), d.trafficLimited = e.observable(""), d.wireDeviceNum = e.observable(0), d.wirelessDeviceNum = e.observable(0), d.showOpModeWindow = function () {
            showSettingWindow("change_mode", "opmode/opmode_popup", "opmode/opmode_popup", 400, 300, function () {
            })
        }, d.currentOpMode = e.observable("0");
        var v = !1;
        n("#showDetailInfo").popover({
            html: !0, placement: "top", trigger: "focus", title: function () {
                return n.i18n.prop("device_info")
            }, content: function () {
                return r()
            }
        }).on("shown.bs.popover", function () {
            v = !0;
            var e = n("#topContainer").outerHeight();
            n(window).scrollTop() > e && n(window).scrollTop(e)
        }).on("hidden.bs.popover", function () {
            v = !1
        }), s(), setTimeout(function () {
            var e = t.getParams({nv: ["privacy_read_flag", "loginfo"]});
            "0" == e.privacy_read_flag && "ok" == e.loginfo && a.HAS_GDPR ? showModifyFotaWindow("change_mode", "privacy_policy", "privacy_policy", 700, 400, function () {
            }) : o.setRedirectTips(!0)
        }, 1e3), d.isCPE && t.getOpMode({}, function (e) {
            d.isLoggedIn("ok" == e.loginfo), "DHCP" == e.opms_wan_mode || "AUTO_DHCP" == e.opms_wan_mode ? d.enableFlag(!0) : "ppp_disconnected" != e.ppp_status ? d.enableFlag(!1) : d.enableFlag(!0), "DHCP" == e.opms_wan_mode || "STATIC" == e.opms_wan_mode ? mode = "PPPOE" : "AUTO_DHCP" == e.opms_wan_mode || "AUTO_PPPOE" == e.opms_wan_mode || "AUTO_LTE_GATEWAY" == e.opms_wan_mode ? mode = "AUTO" : mode = e.opms_wan_mode;
            var t = "";
            switch (mode) {
                case"LTE_BRIDGE":
                    t = "opmode_bridge";
                    break;
                case"AUTO":
                    t = "opmode_auto";
                    break;
                case"PPPOE":
                    t = "opmode_cable";
                    break;
                case"PPP":
                    t = "opmode_gateway"
            }
            n("#opmode").attr("data-trans", t).text(n.i18n.prop(t))
        }), d.connectHandler = function () {
            checkConnectedStatus(d.connectStatus()) ? (showLoading("disconnecting"), t.disconnect({}, function (e) {
                e.result ? successOverlay() : errorOverlay()
            })) : t.getStatusInfo().roamingStatus ? showConfirm("dial_roaming_connect", function () {
                d.connect()
            }) : d.connect()
        }, d.connect = function () {
            var e = t.getStatusInfo(), n = o.getTrafficResult(e);
            if (e.limitVolumeEnable && n.showConfirm) {
                var a = null;
                n.usedPercent > 100 ? (a = {msg: "traffic_beyond_connect_msg"}, o.setTrafficAlertPopuped(!0)) : (a = {
                    msg: "traffic_limit_connect_msg",
                    params: [n.limitPercent]
                }, o.setTrafficAlert100Popuped(!1)), showConfirm(a, function () {
                    m.doConnect()
                })
            } else m.doConnect()
        }, d.isCPE && addInterval(function () {
            var e = t.getConnectionInfo();
            "DHCP" == e.opms_wan_mode || "AUTO" == e.opms_wan_mode && "AUTO_DHCP" == e.opms_wan_auto_mode ? d.enableFlag(!0) : "ppp_disconnected" != e.connectStatus ? d.enableFlag(!1) : d.enableFlag(!0)
        }, 1e3), addInterval(function () {
            t.getSignalStrength({}, function (e) {
                var t = signalFormat(convertSignal(e));
                n("#fresh_signal_strength").text(t), v && n("#popoverSignalTxt").text(t)
            }), m.refreshHomeData(d)
        }, 1e3)
    }

    function d() {
        p = 0, m.oldUsedData = null, m.oldAlarmData = null, l = s.init(n("#traffic_graphic")[0]);
        var i = n("#container")[0];
        e.cleanNode(i);
        var o = new r;
        if (e.applyBindings(o, i), a.ACCESSIBLE_ID_SUPPORT) {
            var d = t.getLanguage();
            rd0 = d.rd_params0, rd1 = d.rd_params1
        }
    }

    var c = {CONNECTED: 1, DISCONNECTED: 2, CONNECTING: 3, DISCONNECTING: 4}, l = null, p = 0, u = {
        title: {
            text: "",
            x: "center",
            y: "center",
            itemGap: 0,
            textStyle: {color: "#D8D8D8", fontFamily: "微软雅黑", fontSize: 20, fontWeight: "bolder"},
            subtextStyle: {color: "#D8D8D8", fontFamily: "微软雅黑", fontSize: 16, fontWeight: "bolder"}
        },
        animation: !1,
        series: [{
            name: "流量控制",
            type: "pie",
            radius: ["65", "93"],
            itemStyle: {normal: {label: {show: !1}, labelLine: {show: !1}}},
            data: [],
            selectedOffset: 3
        }],
        color: ["red", "red", "red", "red", "red"]
    }, m = {
        initStatus: null,
        initShownStatus: function (e) {
            this.initStatus = {}, "CPE" == a.PRODUCT_TYPE ? "LTE_BRIDGE" == e.opms_wan_mode ? (this.initStatus.showIpv6WanIpAddr = !1, this.initStatus.showIpv4WanIpAddr = !1) : "DHCP" == e.opms_wan_mode || "PPPOE" == e.opms_wan_mode || "AUTO" == e.opms_wan_mode && ("AUTO_PPPOE" == e.opms_wan_auto_mode || "AUTO_DHCP" == e.opms_wan_auto_mode) ? (this.initStatus.showIpv6WanIpAddr = !1, this.initStatus.showIpv4WanIpAddr = !0) : "STATIC" == e.opms_wan_mode ? (this.initStatus.showIpv6WanIpAddr = !1, this.initStatus.showIpv4WanIpAddr = !0) : a.IPV6_SUPPORT ? "IP" == e.pdpType ? (this.initStatus.showIpv6WanIpAddr = !1, this.initStatus.showIpv4WanIpAddr = !0) : "IPv6" == e.pdpType ? (this.initStatus.showIpv6WanIpAddr = !0, this.initStatus.showIpv4WanIpAddr = !1) : "IPv4v6" == e.pdpType && (this.initStatus.showIpv6WanIpAddr = !0, this.initStatus.showIpv4WanIpAddr = !0) : (this.initStatus.showIpv6WanIpAddr = !1, this.initStatus.showIpv4WanIpAddr = !0) : a.IPV6_SUPPORT ? "IP" == e.pdpType ? (this.initStatus.showIpv6WanIpAddr = !1, this.initStatus.showIpv4WanIpAddr = !0) : "IPv6" == e.pdpType ? (this.initStatus.showIpv6WanIpAddr = !0, this.initStatus.showIpv4WanIpAddr = !1) : "IPv4v6" == e.pdpType && (this.initStatus.showIpv6WanIpAddr = !0, this.initStatus.showIpv4WanIpAddr = !0) : (this.initStatus.showIpv6WanIpAddr = !1, this.initStatus.showIpv4WanIpAddr = !0)
        },
        getWanIpAddr: function (e) {
            var t = {wanIpAddress: "", ipv6WanIpAddress: ""};
            if ("DHCP" == e.opms_wan_mode || "PPPOE" == e.opms_wan_mode || "AUTO" == e.opms_wan_mode && "AUTO_LTE_GATEWAY" != e.opms_wan_auto_mode) t.wanIpAddress = verifyDeviceInfo(e.wanIpAddress); else if ("STATIC" == e.opms_wan_mode) t.wanIpAddress = verifyDeviceInfo(e.staticWanIpAddress); else {
                var n = this.getConnectStatus(e.connectStatus);
                1 == n ? (t.wanIpAddress = verifyDeviceInfo(e.wanIpAddress), t.ipv6WanIpAddress = "— —") : 2 == n ? (t.wanIpAddress = "— —", t.ipv6WanIpAddress = verifyDeviceInfo(e.ipv6WanIpAddress)) : 3 == n ? (t.wanIpAddress = verifyDeviceInfo(e.wanIpAddress), t.ipv6WanIpAddress = verifyDeviceInfo(e.ipv6WanIpAddress)) : (t.wanIpAddress = "— —", t.ipv6WanIpAddress = "— —")
            }
            return t
        },
        getConnectStatus: function (e) {
            return "ppp_disconnected" == e || "ppp_connecting" == e || "ppp_disconnecting" == e ? 0 : "ppp_connected" == e ? 1 : "ipv6_connected" == e ? 2 : "ipv4_ipv6_connected" == e ? 3 : void 0
        },
        showHomeConnect: function (e) {
            return "PPP" == e || "AUTO_LTE_GATEWAY" == e || "LTE_BRIDGE" == e
        },
        cachedAPStationBasic: null,
        cachedConnectionMode: null,
        getCanConnectNetWork: function () {
            var e = t.getStatusInfo();
            if ("modem_init_complete" != e.simStatus) return !1;
            var n = e.networkType.toLowerCase();
            return "" != n && "limited service" != n || (n = "limited_service"), "no service" == n && (n = "no_service"), "limited_service" != n && "no_service" != n && ((!checkConnectedStatus(e.connectStatus) || !a.AP_STATION_SUPPORT || 1 != e.ap_station_enable || "auto_dial" != e.dialMode) && (!a.AP_STATION_SUPPORT || "connect" != e.connectWifiStatus || "wifi_pref" != e.ap_station_mode))
        },
        doConnect: function () {
            showLoading("connecting"), t.connect({}, function (e) {
                e.result ? successOverlay() : errorOverlay()
            })
        },
        refreshHomeData: function (e) {
            var n = t.getConnectionInfo();
            e.connectStatus(n.connectStatus), e.canConnect(this.getCanConnectNetWork()), e.networkType(getNetworkType(n.networkType, n.isCaStatus)), checkConnectedStatus(n.connectStatus) ? (e.current_Flux(transUnit(parseInt(n.data_counter.currentReceived, 10) + parseInt(n.data_counter.currentSent, 10), !1)), e.connected_Time(transSecond2Time(n.data_counter.currentConnectedTime)), e.up_Speed(transUnit(n.data_counter.uploadRate, !0)), e.down_Speed(transUnit(n.data_counter.downloadRate, !0))) : (e.current_Flux(transUnit(0, !1)), e.connected_Time(transSecond2Time(0)), e.up_Speed(transUnit(0, !0)), e.down_Speed(transUnit(0, !0))), e.trafficAlertEnable(n.limitVolumeEnable), n.limitVolumeEnable && ("1" == n.limitVolumeType ? (e.trafficUsed(transUnit(parseInt(n.data_counter.monthlySent, 10) + parseInt(n.data_counter.monthlyReceived, 10), !1)), e.trafficLimited(transUnit(n.limitDataMonth, !1))) : (e.trafficUsed(transSecond2Time(n.data_counter.monthlyConnectedTime)), e.trafficLimited(transSecond2Time(n.limitTimeMonth)))), !e.isCPE || e.isCPE && ("PPP" == e.cpeMode || "AUTO_LTE_GATEWAY" == e.cpeMode) ? m.updateEcharts(n) : m.allFreeEcharts(), m.refreshStationInfo(e)
        },
        allFreeEcharts: function () {
            var e = m.data.free;
            e.value = 1, e.selected = !1, u.series[0].data = [e], u.title.text = "", m.setEcharts(u)
        },
        data: {
            start: {value: 50, name: "提醒值内未使用", itemStyle: {normal: {color: "#D8D8D8"}}},
            alarm: {value: 19.7, name: "警戒区", itemStyle: {normal: {color: "#8CC916"}}},
            alert: {value: 1, name: "提醒值", itemStyle: {normal: {color: "#FF5500"}}},
            free: {value: 50, name: "未使用", itemStyle: {normal: {color: "#D8D8D8"}}},
            left1: {value: 50, name: "提醒值内未使用", itemStyle: {normal: {color: "#D8D8D8"}}},
            used: {value: 30, name: "已使用", itemStyle: {normal: {color: "#8CC916"}}},
            full: {value: 30, name: "流量超出", itemStyle: {normal: {color: "#DF4313"}}}
        },
        oldUsedData: null,
        oldAlarmData: null,
        updateEcharts: function (e) {
            if (++p % 10 != 2) return !1;
            var t = 0, a = 0, o = 0, s = 0, r = 0, d = 0;
            if (e.limitVolumeEnable) if (u.series[0].data = [], "1" == e.limitVolumeType) {
                var c = transUnit(e.limitDataMonth, !1);
                if (u.title.text = c, u.series[0].data = [], 0 == e.limitDataMonth) {
                    var l = m.data.used;
                    l.value = 1, l.selected = !1, u.series[0].data.push(l)
                } else {
                    var v = m.getDataInfo(c);
                    if (t = v.data * m.getUnitValue(v.unit) * 1048576, a = parseInt(e.data_counter.monthlySent, 10) + parseInt(e.data_counter.monthlyReceived, 10), o = t * e.limitVolumePercent / 100, a >= t) {
                        var _ = m.data.full;
                        _.value = 100, u.series[0].data.push(_)
                    } else {
                        o - a > 0 ? (d = o - a, s = t - o) : (r = a - o, s = t - a);
                        var f = m.data.free;
                        if (f.value = s, u.series[0].data.push(f), r > 0) {
                            var I = m.data.alarm;
                            I.value = r, u.series[0].data.push(I)
                        }
                        var h = m.data.alert;
                        if (h.value = t / 200, u.series[0].data.push(h), d > 0) {
                            var S = m.data.left1;
                            S.value = d, u.series[0].data.push(S)
                        }
                        var l = m.data.used;
                        l.value = o - a > 0 ? a : o, u.series[0].data.push(l)
                    }
                }
            } else if (u.title.text = e.limitTimeMonthSource + n.i18n.prop("hours"), u.series[0].data = [], 0 == e.limitTimeMonth) {
                var l = m.data.used;
                l.value = 1, l.selected = !1, u.series[0].data.push(l)
            } else if (t = e.limitTimeMonth, a = e.data_counter.monthlyConnectedTime, o = t * e.limitVolumePercent / 100, a >= t) {
                var w = m.data.full;
                w.value = 100, u.series[0].data.push(w)
            } else {
                o - a > 0 ? (d = o - a, s = t - o) : (r = a - o, s = t - a);
                var A = m.data.free;
                if (A.value = s, u.series[0].data.push(A), r > 0) {
                    var D = m.data.alarm;
                    D.value = r, u.series[0].data.push(D)
                }
                var T = m.data.alert;
                if (T.value = t / 200, u.series[0].data.push(T), d > 0) {
                    var g = m.data.left1;
                    g.value = d, u.series[0].data.push(g)
                }
                var C = m.data.used;
                C.value = o - a > 0 ? a : o, u.series[0].data.push(C)
            } else {
                var l = m.data.used;
                l.value = 0, l.selected = !1, u.series[0].data = [l], u.title.text = ""
            }
            var P = i.find(u.series[0].data, function (e) {
                return "已使用" == e.name
            }), b = i.find(u.series[0].data, function (e) {
                return "警戒区" == e.name
            });
            b || (b = {value: 0}), void 0 === P ? m.setEcharts(u) : m.oldUsedData == P.value && m.oldAlarmData == b.value || (m.oldUsedData = P.value, m.oldAlarmData = b.value, m.setEcharts(u))
        },
        setEcharts: function (e) {
            var t = m.data.start;
            t.value = .001, t.selected = !1;
            var n = [t].concat(e.series[0].data);
            e.series[0].data = n, l.setOption(e, !0), addTimeout(function () {
                l.resize()
            }, 1e3)
        },
        getUnit: function (e) {
            return "1024" == e ? "GB" : "1048576" == e ? "TB" : "MB"
        },
        getUnitValue: function (e) {
            return e = e.toUpperCase(), "GB" == e ? "1024" : "TB" == e ? "1048576" : "1"
        },
        getDataInfo: function (e) {
            return {data: /\d+(.\d+)?/.exec(e)[0], unit: /[A-Z]{1,2}/.exec(e)[0]}
        },
        refreshStationInfo: function (e) {
            e.wirelessDeviceNum(t.getStatusInfo().attachedDevices.length), p % 10 == 2 && t.getAttachedCableDevices({}, function (t) {
                e.wireDeviceNum(t.attachedDevices.length)
            })
        }
    };
    return {init: d}
});
//# sourceMappingURL=../sourcemaps/home.js.map
