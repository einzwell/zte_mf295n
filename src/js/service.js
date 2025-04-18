define(["underscore", "jquery", "config/config"], function (e, t, n) {
    function r(e, t) {
        return o(e, null, null, !1, t)
    }

    function i(e, t, n, r) {
        o(e, t, n, !0, r)
    }

    function o(e, r, i, o, _) {
        var s = null;
        if (n.ACCESSIBLE_ID_SUPPORT && _ && "LOGIN" != e.goformId && "SET_WEB_LANGUAGE" != e.goformId) {
            var a = paswordAlgorithmsCookie(rd0 + rd1), u = lr({nv: "RD"}).RD, c = paswordAlgorithmsCookie(a + u);
            e.AD = c
        }
        return e.isTest ? (s = simulate.simulateRequest(e, r, i, o, _), o ? void setTimeout(function () {
            r(s)
        }, getRandomInt(120) + 50) : s) : (t.ajax({
            type: _ ? "POST" : "GET",
            url: _ ? "/goform/goform_set_cmd_process" : e.cmd ? "/goform/goform_get_cmd_process" : "/goform/goform_set_cmd_process",
            data: e,
            dataType: "json",
            async: !!o,
            cache: !1,
            error: function (e) {
                o ? i(e) : 200 == e.status && (s = jQuery.parseJSON("(" + e.responseText + ")"))
            },
            success: function (e) {
                o ? r(e) : s = e
            }
        }), o ? void 0 : s)
    }

    function _(e, n, o, _, s, a) {
        function u(e, t, n) {
            if (n = n || t, isErrorObject(e)) switch (e.errorType) {
                case"cellularNetworkError":
                case"deviceError":
                case"wifiConnectionError":
                    oi.receivedNonSpecificError(e);
                    break;
                default:
                    n(e)
            } else t(e)
        }

        var c, d = e[0], l = e[1], p = e[2];
        if (n && "string" == typeof n.errorType) {
            if (c = t.extend(_i, n), !l) return c;
            u(c, l, p)
        } else {
            c = t.extend({}, n);
            var m;
            if (m = o ? o(d, a) : d, !l) {
                if (m && (m.cmd || m.goformId)) {
                    var f = r(m, a);
                    c = _ ? t.extend({}, _(f)) : f
                }
                return c
            }
            m && (m.cmd || m.goformId) ? i(m, function (e) {
                c = _ ? t.extend({}, _(e)) : t.extend({}, e), m.notCallback || u(c, l, p)
            }, function () {
                c = s ? t.extend(_i, s) : t.extend(_i, {errorType: "Unknown"}), u(c, l, p)
            }, a) : u(c, l, p)
        }
    }

    function s() {
        function e(e, t) {
            var r = {};
            r.isTest = si;
            var i = n.PASSWORD_ENCODE_NEW ? "WPAPSK1_encode,m_WPAPSK1_encode," : "WPAPSK1,m_WPAPSK1,";
            return r.cmd = "m_ssid_enable,RadioOff,NoForwarding,m_NoForwarding," + i + "wifi_attr_max_station_number,SSID1,AuthMode,HideSSID,MAX_Access_num,EncrypType,m_SSID,m_AuthMode,m_HideSSID,wifi_guest_ssid_active_time,m_MAX_Access_num,m_EncrypType,qrcode_display_switch,m_qrcode_display_switch", r.multi_data = 1, r
        }

        function r(e) {
            if (e) {
                return {
                    wifi_enable: e.RadioOff,
                    multi_ssid_enable: e.m_ssid_enable,
                    MAX_Station_num: t.isNumeric(e.wifi_attr_max_station_number) ? e.wifi_attr_max_station_number : n.MAX_STATION_NUMBER,
                    showQrCode: e.qrcode_display_switch,
                    AuthMode: e.AuthMode,
                    SSID: e.SSID1,
                    broadcast: e.HideSSID,
                    apIsolation: e.NoForwarding,
                    passPhrase: n.PASSWORD_ENCODE_NEW ? Base64.decode(e.WPAPSK1_encode) : Base64.decode(e.WPAPSK1),
                    MAX_Access_num: e.MAX_Access_num,
                    cipher: "TKIP" == e.EncrypType ? "0" : "AES" == e.EncrypType ? 1 : 2,
                    m_showQrCode: e.m_qrcode_display_switch,
                    m_SSID: e.m_SSID,
                    m_broadcast: e.m_HideSSID,
                    m_apIsolation: e.m_NoForwarding,
                    m_MAX_Access_num: e.m_MAX_Access_num,
                    m_AuthMode: e.m_AuthMode,
                    m_passPhrase: n.PASSWORD_ENCODE_NEW ? Base64.decode(e.m_WPAPSK1_encode) : Base64.decode(e.m_WPAPSK1),
                    m_cipher: "TKIP" == e.m_EncrypType ? "0" : "AES" == e.m_EncrypType ? 1 : 2,
                    accessTime: e.wifi_guest_ssid_active_time
                }
            }
            return _i
        }

        return _(arguments, {}, e, r, null, !1)
    }

    function a() {
        function e(e) {
            var t = {
                goformId: "SET_WIFI_SSID1_SETTINGS",
                isTest: si,
                ssid: e.SSID,
                broadcastSsidEnabled: e.broadcast,
                MAX_Access_num: e.station,
                security_mode: e.AuthMode,
                cipher: e.cipher,
                NoForwarding: e.NoForwarding,
                qrcode_display_switch: e.showQrCode
            };
            return "WPAPSKWPA2PSK" == e.AuthMode || "WPA2PSK" == e.AuthMode ? (t.security_shared_mode = e.cipher, t.passphrase = n.PASSWORD_ENCODE ? Base64.encode(e.passPhrase) : e.passPhrase) : t.security_shared_mode = "NONE", t
        }

        function t(e) {
            return e || _i
        }

        qe(arguments, e, t)
    }

    function u() {
        function e(e) {
            var t = {
                goformId: "SET_WIFI_SSID2_SETTINGS",
                isTest: si,
                m_SSID: e.m_SSID,
                m_HideSSID: e.m_broadcast,
                m_MAX_Access_num: e.m_station,
                m_AuthMode: e.m_AuthMode,
                cipher: e.m_cipher,
                m_NoForwarding: e.m_NoForwarding,
                m_qrcode_display_switch: e.m_showQrCode
            };
            return "WPAPSKWPA2PSK" == e.m_AuthMode || "WPA2PSK" == e.m_AuthMode ? (t.m_EncrypType = e.m_cipher, t.m_WPAPSK1 = n.PASSWORD_ENCODE ? Base64.encode(e.m_passPhrase) : e.m_passPhrase) : t.m_EncrypType = "NONE", t
        }

        function t(e) {
            return e || _i
        }

        qe(arguments, e, t)
    }

    function c() {
        function e(e) {
            var n = e;
            return "0" == e.wifiEnabled && (n = {wifiEnabled: e.wifiEnabled}), t.extend({
                goformId: "SET_WIFI_INFO",
                isTest: si
            }, n)
        }

        function n(e) {
            return e || _i
        }

        qe(arguments, e, n)
    }

    function d() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "AuthMode,passPhrase", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.AuthMode = e.AuthMode, t.passPhrase = n.PASSWORD_ENCODE ? Base64.decode(e.passPhrase) : e.passPhrase, t
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function l() {
        function e(e, t) {
            var r = {};
            return r.isTest = si, r.goformId = "SET_WIFI_SECURITY_INFO", r.AuthMode = e.AuthMode, "WPAPSKWPA2PSK" == r.AuthMode && (r.passPhrase = n.PASSWORD_ENCODE ? Base64.encode(e.passPhrase) : e.passPhrase), r
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function p() {
        function e(e, t) {
            return {isTest: si, cmd: "station_list"}
        }

        function n(e) {
            for (var n = [], r = e.station_list, i = 0; r && i < r.length; i++) {
                var o = {};
                o.macAddress = r[i].mac_addr;
                var _ = r[i].hostname;
                o.hostName = "" == _ ? "-" : _, o.ipAddress = r[i].ip_addr;
                var s = r[i].ssid_index;
                o.ssid_index = "1" == s || "3" == s ? t.i18n.prop("multi_ssid_main") : t.i18n.prop("multi_ssid_guest"), n.push(o)
            }
            return {attachedDevices: n}
        }

        return _(arguments, {}, e, n, null, !1)
    }

    function m() {
        function e(e, t) {
            return {isTest: si, cmd: "lan_station_list"}
        }

        function t(e) {
            for (var t = [], n = e.lan_station_list || e.station_list, r = 0; n && r < n.length; r++) {
                var i = {};
                i.macAddress = n[r].mac_addr;
                var o = n[r].hostname;
                i.hostName = "" == o ? "-" : o, i.ipAddress = n[r].ip_addr, t.push(i)
            }
            return {attachedDevices: t}
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function f() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "Language,cr_version,wa_inner_version", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.Language = e && e.Language ? e.Language : "en", t.rd_params0 = e.wa_inner_version, t.rd_params1 = e.cr_version, t
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function g() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "SET_WEB_LANGUAGE", n.Language = e.Language, n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function v() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "current_network_mode,m_netselect_save,net_select_mode,m_netselect_contents,net_select,ppp_status,modem_main_state", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.current_network_mode = e.current_network_mode, t.net_select_mode = e.net_select_mode, t.m_netselect_save = e.m_netselect_save, t.m_netselect_contents = e.m_netselect_contents, t.net_select = e.net_select, t.ppp_status = e.ppp_status, t.modem_main_state = e.modem_main_state, t
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function w() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "SET_BEARER_PREFERENCE", n.BearerPreference = e.strBearerPreference, n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function T(e) {
        function r() {
            t.getJSON("/goform/goform_get_cmd_process", {
                cmd: "m_netselect_status",
                _: (new Date).getTime()
            }, function (n) {
                "manual_selecting" == n.m_netselect_status ? setTimeout(r, 1e3) : t.getJSON("/goform/goform_get_cmd_process", {
                    cmd: "m_netselect_contents",
                    _: (new Date).getTime()
                }, function (t) {
                    "" != trim(t.m_netselect_contents) ? i(t.m_netselect_contents) : e(!1, [])
                }).error(function () {
                    e(!1, [])
                })
            }).error(function () {
                e(!1, [])
            })
        }

        function i(t) {
            for (var n, r = /([^,;]*),([^,]*),([^,]*),([^,;]*)/g, i = []; n = r.exec(t);) null != n && i.push({
                strShortName: n[2].replace(/\"/g, ""),
                strNumeric: n[3].replace(/\D/g, ""),
                nRat: parseInt(n[4], 10),
                nState: parseInt(n[1], 10)
            });
            e(!0, i)
        }

        if (si) return void setTimeout(function () {
            i(simulate.m_netselect_contents)
        }, 500);
        var o = {};
        if (o.goformId = "SCAN_NETWORK", n.ACCESSIBLE_ID_SUPPORT) {
            var _ = paswordAlgorithmsCookie(rd0 + rd1), s = lr({nv: "RD"}).RD, a = paswordAlgorithmsCookie(_ + s);
            o.AD = a
        }
        t.post("/goform/goform_set_cmd_process", o, function (t) {
            "success" == t.result ? r() : e(!1, [])
        }, "json").error(function () {
            e(!1, [])
        })
    }

    function S() {
        if (void 0 === ci.isLoggedIn) {
            var e = ae();
            return {
                networkType: ci.networkType,
                signalImg: ci.signalImg,
                networkOperator: ci.networkOperator,
                spn_b1_flag: ci.spn_b1_flag,
                spn_name_data: ci.spn_name_data,
                spn_b2_flag: ci.spn_b2_flag,
                connectStatus: ci.connectStatus,
                attachedDevices: ci.curr_connected_devices,
                roamingStatus: ci.roamingStatus,
                wifiStatus: ci.wifiStatus,
                simStatus: ci.simStatus,
                pinStatus: ci.pinStatus,
                batteryStatus: ci.batteryStatus,
                batteryLevel: ci.batteryLevel,
                batteryPers: ci.batteryPers,
                batteryTime: ci.batteryTime,
                ssid: ci.ssid,
                authMode: ci.authMode,
                data_counter: ci.data_counter,
                isLoggedIn: "loggedIn" == e.status,
                newSmsReceived: ci.newSmsReceived,
                smsReportReceived: ci.smsReportReceived,
                smsUnreadCount: ci.smsUnreadCount,
                limitVolumeEnable: ci.limitVolumeEnable,
                limitVolumeType: ci.limitVolumeType,
                limitVolumePercent: ci.limitVolumePercent,
                limitVolumeSize: ci.limitVolumeSize,
                limitVolumeSizeSource: ci.limitVolumeSizeSource,
                connectWifiProfile: ci.connectWifiProfile,
                connectWifiSSID: ci.connectWifiSSID,
                connectWifiStatus: ci.connectWifiStatus,
                multi_ssid_enable: ci.multi_ssid_enable,
                roamMode: ci.roamMode,
                opms_wan_mode: ci.opms_wan_mode,
                opms_wan_auto_mode: ci.opms_wan_auto_mode,
                dhcp_wan_status: ci.dhcp_wan_status,
                current_upgrade_state: ci.current_upgrade_state,
                is_mandatory: ci.is_mandatory,
                new_version_state: ci.new_version_state,
                allowRoamingUpdate: ci.allowRoamingUpdate,
                wifi_dfs_status: ci.wifi_dfs_status,
                radio_off: ci.radio_off,
                wifi_5g_enable: ci.wifi_5g_enable,
                battery_value: ci.battery_value,
                ap_station_enable: ci.ap_station_enable,
                ap_station_mode: ci.ap_station_mode,
                dialMode: ci.dialMode,
                isCaStatus: ci.isCaStatus,
                privacy_read_flag: ci.privacy_read_flag,
                ppp_dial_conn_fail_counter: ci.ppp_dial_conn_fail_counter,
                pppoe_status: ci.pppoe_status,
                dhcp_wan_status: ci.dhcp_wan_status,
                static_wan_status: ci.static_wan_status,
                mode_main_state: ci.mode_main_state,
                battery_temp: ci.battery_temp,
                battery_customer_mode: ci.battery_customer_mode
            }
        }
        return {
            networkType: ci.networkType,
            signalImg: ci.signalImg,
            networkOperator: ci.networkOperator,
            spn_b1_flag: ci.spn_b1_flag,
            spn_name_data: ci.spn_name_data,
            spn_b2_flag: ci.spn_b2_flag,
            connectStatus: ci.connectStatus,
            attachedDevices: ci.curr_connected_devices,
            roamingStatus: ci.roamingStatus,
            wifiStatus: ci.wifiStatus,
            simStatus: ci.simStatus,
            pinStatus: ci.pinStatus,
            batteryStatus: ci.batteryStatus,
            batteryLevel: ci.batteryLevel,
            batteryPers: ci.batteryPers,
            batteryTime: ci.batteryTime,
            ssid: ci.ssid,
            authMode: ci.authMode,
            data_counter: ci.data_counter,
            isLoggedIn: ci.isLoggedIn,
            newSmsReceived: ci.newSmsReceived,
            smsReportReceived: ci.smsReportReceived,
            smsUnreadCount: ci.smsUnreadCount,
            limitVolumeEnable: ci.limitVolumeEnable,
            limitVolumeType: ci.limitVolumeType,
            limitVolumePercent: ci.limitVolumePercent,
            limitVolumeSize: ci.limitVolumeSize,
            limitVolumeSizeSource: ci.limitVolumeSizeSource,
            connectWifiProfile: ci.connectWifiProfile,
            connectWifiSSID: ci.connectWifiSSID,
            connectWifiStatus: ci.connectWifiStatus,
            multi_ssid_enable: ci.multi_ssid_enable,
            opms_wan_mode: ci.opms_wan_mode,
            opms_wan_auto_mode: ci.opms_wan_auto_mode,
            dhcp_wan_status: ci.dhcp_wan_status,
            roamMode: ci.roamMode,
            current_upgrade_state: ci.current_upgrade_state,
            is_mandatory: ci.is_mandatory,
            new_version_state: ci.new_version_state,
            allowRoamingUpdate: ci.allowRoamingUpdate,
            wifi_dfs_status: ci.wifi_dfs_status,
            radio_off: ci.radio_off,
            wifi_5g_enable: ci.wifi_5g_enable,
            battery_value: ci.battery_value,
            ap_station_enable: ci.ap_station_enable,
            ap_station_mode: ci.ap_station_mode,
            dialMode: ci.dialMode,
            isCaStatus: ci.isCaStatus,
            privacy_read_flag: ci.privacy_read_flag,
            ppp_dial_conn_fail_counter: ci.ppp_dial_conn_fail_counter,
            pppoe_status: ci.pppoe_status,
            dhcp_wan_status: ci.dhcp_wan_status,
            static_wan_status: ci.static_wan_status,
            mode_main_state: ci.mode_main_state,
            battery_temp: ci.battery_temp,
            battery_customer_mode: ci.battery_customer_mode
        }
    }

    function P() {
        var e = "1" == ci.limitVolumeType, t = {
            data_counter: ci.data_counter,
            connectStatus: ci.connectStatus,
            limitVolumeEnable: ci.limitVolumeEnable,
            limitVolumeType: ci.limitVolumeType,
            limitVolumePercent: ci.limitVolumePercent,
            networkType: ci.networkType,
            isCaStatus: ci.isCaStatus
        };
        return e ? (t.limitDataMonth = ci.limitVolumeSize, t.limitDataMonthSource = ci.limitVolumeSizeSource, t.limitTimeMonth = 0) : (t.limitTimeMonth = ci.limitVolumeSize, t.limitTimeMonthSource = ci.limitVolumeSizeSource, t.limitDataMonth = 0), t.opms_wan_mode = ci.opms_wan_mode, t.opms_wan_auto_mode = ci.opms_wan_auto_mode, t
    }

    function h() {
        ci.newSmsReceived = !1
    }

    function I() {
        ci.smsReportReceived = !1
    }

    function A() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "sms_capacity_info", n
        }

        function t(e) {
            return {
                nvTotal: parseInt(e.sms_nv_total, 10),
                nvUsed: parseInt(e.sms_nv_rev_total, 10) + parseInt(e.sms_nv_send_total, 10) + parseInt(e.sms_nv_draftbox_total, 10),
                simTotal: parseInt(e.sms_sim_total, 10),
                simUsed: parseInt(e.sms_sim_rev_total, 10) + parseInt(e.sms_sim_send_total, 10) + parseInt(e.sms_sim_draftbox_total, 10),
                nvReceive: parseInt(e.sms_nv_rev_total, 10),
                nvSend: parseInt(e.sms_nv_send_total, 10),
                nvDraft: parseInt(e.sms_nv_draftbox_total, 10),
                simReceive: parseInt(e.sms_sim_rev_total, 10),
                simSend: parseInt(e.sms_sim_send_total, 10),
                simDraft: parseInt(e.sms_sim_draftbox_total, 10)
            }
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function b() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.notCallback = !0, n.goformId = "CONNECT_NETWORK", n
        }

        function t(e) {
            "success" == e.result ? (i = (new Date).getTime(), x(n)) : r({result: !1})
        }

        function n(e) {
            "ppp_connecting" == e.ppp_status ? ci.connectStatus = "ppp_connecting" : checkConnectedStatus(e.ppp_status) ? (O(n), ci.connectStatus = "ppp_connected", r({
                result: !0,
                status: ci.connectStatus
            })) : (new Date).getTime() - i < 1e4 ? ci.connectStatus = "ppp_connecting" : (O(n), r({result: !1}))
        }

        var r = arguments[1], i = 0;
        return _(arguments, {}, e, t, null, !0)
    }

    function y() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.notCallback = !0, n.goformId = "DISCONNECT_NETWORK", n
        }

        function t(e) {
            "success" == e.result ? (i = (new Date).getTime(), x(n)) : r({result: !1})
        }

        function n(e) {
            "ppp_disconnecting" == e.ppp_status ? ci.connectStatus = "ppp_disconnecting" : "ppp_disconnected" == e.ppp_status ? (O(n), ci.connectStatus = "ppp_disconnected", r({
                result: !0,
                status: ci.connectStatus
            })) : (new Date).getTime() - i < 1e4 ? ci.connectStatus = "ppp_disconnecting" : (O(n), r({result: !1}))
        }

        var r = arguments[1], i = 0;
        return _(arguments, {}, e, t, null, !0)
    }

    function E() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "apn_interface_version,APN_config0,APN_config1,APN_config2,APN_config3,APN_config4,APN_config5,APN_config6,APN_config7,APN_config8,APN_config9,APN_config10,APN_config11,APN_config12,APN_config13,APN_config14,APN_config15,APN_config16,APN_config17,APN_config18,APN_config19,ipv6_APN_config0,ipv6_APN_config1,ipv6_APN_config2,ipv6_APN_config3,ipv6_APN_config4,ipv6_APN_config5,ipv6_APN_config6,ipv6_APN_config7,ipv6_APN_config8,ipv6_APN_config9,ipv6_APN_config10,ipv6_APN_config11,ipv6_APN_config12,ipv6_APN_config13,ipv6_APN_config14,ipv6_APN_config15,ipv6_APN_config16,ipv6_APN_config17,ipv6_APN_config18,ipv6_APN_config19,m_profile_name,profile_name,wan_dial,apn_select,pdp_type,pdp_select,pdp_addr,index,Current_index,apn_auto_config,ipv6_apn_auto_config,apn_mode,wan_apn,ppp_auth_mode,ppp_username,ppp_passwd,dns_mode,prefer_dns_manual,standby_dns_manual,ipv6_wan_apn,ipv6_pdp_type,ipv6_ppp_auth_mode,ipv6_ppp_username,ipv6_ppp_passwd,ipv6_dns_mode,ipv6_prefer_dns_manual,ipv6_standby_dns_manual,apn_num_preset,wan_apn_ui,profile_name_ui,pdp_type_ui,ppp_auth_mode_ui,ppp_username_ui,ppp_passwd_ui,dns_mode_ui,prefer_dns_manual_ui,standby_dns_manual_ui,ipv6_wan_apn_ui,ipv6_ppp_auth_mode_ui,ipv6_ppp_username_ui,ipv6_ppp_passwd_ui,ipv6_dns_mode_ui,ipv6_prefer_dns_manual_ui,ipv6_standby_dns_manual_ui", n.multi_data = 1, n
        }

        function t(e) {
            return e ? {
                APNs: e.APN_config0 + "||" + e.APN_config1 + "||" + e.APN_config2 + "||" + e.APN_config3 + "||" + e.APN_config4 + "||" + e.APN_config5 + "||" + e.APN_config6 + "||" + e.APN_config7 + "||" + e.APN_config8 + "||" + e.APN_config9 + "||" + e.APN_config10 + "||" + e.APN_config11 + "||" + e.APN_config12 + "||" + e.APN_config13 + "||" + e.APN_config14 + "||" + e.APN_config15 + "||" + e.APN_config16 + "||" + e.APN_config17 + "||" + e.APN_config18 + "||" + e.APN_config19,
                ipv6APNs: e.ipv6_APN_config0 + "||" + e.ipv6_APN_config1 + "||" + e.ipv6_APN_config2 + "||" + e.ipv6_APN_config3 + "||" + e.ipv6_APN_config4 + "||" + e.ipv6_APN_config5 + "||" + e.ipv6_APN_config6 + "||" + e.ipv6_APN_config7 + "||" + e.ipv6_APN_config8 + "||" + e.ipv6_APN_config9 + "||" + e.ipv6_APN_config10 + "||" + e.ipv6_APN_config11 + "||" + e.ipv6_APN_config12 + "||" + e.ipv6_APN_config13 + "||" + e.ipv6_APN_config14 + "||" + e.ipv6_APN_config15 + "||" + e.ipv6_APN_config16 + "||" + e.ipv6_APN_config17 + "||" + e.ipv6_APN_config18 + "||" + e.ipv6_APN_config19,
                apnMode: e.apn_mode,
                profileName: e.apn_interface_version >= 2 ? e.profile_name_ui : e.m_profile_name || e.profile_name,
                wanDial: e.wan_dial,
                apnSelect: e.apn_select,
                pdpType: e.apn_interface_version >= 2 ? e.pdp_type_ui : e.pdp_type,
                pdpSelect: e.pdp_select,
                pdpAddr: e.pdp_addr,
                index: e.index,
                currIndex: e.Current_index,
                autoApns: e.apn_auto_config,
                autoApnsV6: e.ipv6_apn_auto_config,
                wanApn: e.apn_interface_version >= 2 ? e.wan_apn_ui : e.wan_apn,
                authMode: e.apn_interface_version >= 2 ? e.ppp_auth_mode_ui.toLowerCase() : e.ppp_auth_mode.toLowerCase(),
                username: e.apn_interface_version >= 2 ? e.ppp_username_ui : e.ppp_username,
                password: e.apn_interface_version >= 2 ? e.ppp_passwd_ui : e.ppp_passwd,
                dnsMode: e.apn_interface_version >= 2 ? e.dns_mode_ui : e.dns_mode,
                dns1: e.apn_interface_version >= 2 ? e.prefer_dns_manual_ui : e.prefer_dns_manual,
                dns2: e.apn_interface_version >= 2 ? e.standby_dns_manual_ui : e.standby_dns_manual,
                wanApnV6: e.apn_interface_version >= 2 ? e.ipv6_wan_apn_ui : e.ipv6_wan_apn,
                authModeV6: e.apn_interface_version >= 2 ? e.ipv6_ppp_auth_mode_ui.toLowerCase() : e.ipv6_ppp_auth_mode.toLowerCase(),
                usernameV6: e.apn_interface_version >= 2 ? e.ipv6_ppp_username_ui : e.ipv6_ppp_username,
                passwordV6: e.apn_interface_version >= 2 ? e.ipv6_ppp_passwd_ui : e.ipv6_ppp_passwd,
                dnsModeV6: e.apn_interface_version >= 2 ? e.ipv6_dns_mode_ui : e.ipv6_dns_mode,
                dns1V6: e.apn_interface_version >= 2 ? e.ipv6_prefer_dns_manual_ui : e.ipv6_prefer_dns_manual,
                dns2V6: e.apn_interface_version >= 2 ? e.ipv6_standby_dns_manual_ui : e.ipv6_standby_dns_manual,
                apnNumPreset: e.apn_num_preset
            } : {result: !1}
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function R() {
        function e(e, t) {
            var r = {isTest: si, apn_action: "delete", apn_mode: "manual", index: e.index};
            return n.USE_IPV6_INTERFACE ? r.goformId = "APN_PROC_EX" : r.goformId = "APN_PROC", r
        }

        function t(e) {
            return "success" == e.result ? {result: !0} : {result: !1}
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function N() {
        function e(e, t) {
            if (n.USE_IPV6_INTERFACE) {
                var r = {isTest: si, goformId: "APN_PROC_EX", apn_mode: e.apnMode};
                return "manual" == e.apnMode && (r.apn_action = "set_default", r.set_default_flag = "1", r.pdp_type = e.pdpType, r.index = e.index), r
            }
            return {
                isTest: si,
                goformId: "APN_PROC",
                apn_action: "set_default",
                index: e.index,
                apn_mode: e.apnMode,
                profile_name: e.profileName,
                wan_apn: e.wanApn,
                dns_mode: e.dnsMode,
                prefer_dns_manual: e.dns1,
                w_standby_dns_manual: e.dns2,
                ppp_username: e.username,
                ppp_passwd: e.password,
                ppp_auth_mode: e.authMode,
                apn_select: "manual",
                wan_dial: "*99#",
                pdp_type: "PPP",
                pdp_select: "auto",
                pdp_addr: "",
                set_default_flag: "1"
            }
        }

        function t(e) {
            return "success" == e.result ? {result: !0} : {result: !1}
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function M() {
        function e(e, r) {
            if (n.USE_IPV6_INTERFACE) {
                var i = {
                    isTest: si,
                    goformId: "APN_PROC_EX",
                    apn_action: "save",
                    apn_mode: "manual",
                    profile_name: e.profileName,
                    wan_dial: "*99#",
                    apn_select: "manual",
                    pdp_type: e.pdpType,
                    pdp_select: "auto",
                    pdp_addr: "",
                    index: e.index
                };
                return "IP" == e.pdpType ? t.extend(i, {
                    wan_apn: e.wanApn,
                    ppp_auth_mode: e.authMode,
                    ppp_username: e.username,
                    ppp_passwd: e.password,
                    dns_mode: e.dnsMode,
                    prefer_dns_manual: e.dns1,
                    standby_dns_manual: e.dns2
                }) : "IPv6" == e.pdpType ? t.extend(i, {
                    ipv6_wan_apn: e.wanApnV6,
                    ipv6_ppp_auth_mode: e.authModeV6,
                    ipv6_ppp_username: e.usernameV6,
                    ipv6_ppp_passwd: e.passwordV6,
                    ipv6_dns_mode: e.dnsModeV6,
                    ipv6_prefer_dns_manual: e.dns1V6,
                    ipv6_standby_dns_manual: e.dns2V6
                }) : t.extend(i, {
                    wan_apn: e.wanApn,
                    ppp_auth_mode: e.authMode,
                    ppp_username: e.username,
                    ppp_passwd: e.password,
                    dns_mode: e.dnsMode,
                    prefer_dns_manual: e.dns1,
                    standby_dns_manual: e.dns2,
                    ipv6_wan_apn: e.wanApnV6,
                    ipv6_ppp_auth_mode: e.authModeV6,
                    ipv6_ppp_username: e.usernameV6,
                    ipv6_ppp_passwd: e.passwordV6,
                    ipv6_dns_mode: e.dnsModeV6,
                    ipv6_prefer_dns_manual: e.dns1V6,
                    ipv6_standby_dns_manual: e.dns2V6
                }), i
            }
            var i = {
                isTest: si,
                goformId: "APN_PROC",
                apn_action: "save",
                apn_mode: "manual",
                index: e.index,
                profile_name: e.profileName,
                wan_apn: e.wanApn,
                dns_mode: e.dnsMode,
                prefer_dns_manual: e.dns1,
                w_standby_dns_manual: e.dns2,
                ppp_auth_mode: e.authMode,
                ppp_username: e.username,
                ppp_passwd: e.password,
                wan_dial: "*99#",
                apn_select: "manual",
                pdp_type: "PPP",
                pdp_select: "auto",
                pdp_addr: ""
            };
            return i
        }

        function r(e) {
            return "success" == e.result ? {result: !0} : {result: !1}
        }

        return _(arguments, {}, e, r, null, !0)
    }

    function D() {
        if (!ai) return void setTimeout(function () {
            D()
        }, 1e3);
        i(C(), function (e) {
            for (var n = 0; n < mi.length; n++) "function" == typeof mi[n] && mi[n](e);
            t.merge(mi, pi), pi = [], setTimeout(function () {
                D()
            }, 1e3)
        }, function () {
            V(), setTimeout(function () {
                D()
            }, 1e3)
        }, !1)
    }

    function C() {
        var r = {multi_data: 1, isTest: si};
        return window.location.hash && "#login" != window.location.hash && ci.isLoggedIn ? (n.HAS_SMS && (r.sms_received_flag_flag = 0, r.sts_received_flag_flag = 0), li.length > 0 && -1 == e.indexOf(di, li[0]) && t.each(li, function (e, t) {
            di.push(t)
        })) : li.length > 0 && -1 != e.indexOf(di, li[0]) && (di = e.without(di, li)), r.cmd = di.join(","), r
    }

    function F(t, n) {
        if (e.isArray(t)) for (var r = 0; r < t.length; r++) L(t[r]); else L(t);
        x(n)
    }

    function k(t, n) {
        if (e.isArray(t)) for (var r = 0; r < t.length; r++) U(t[r]); else U(t);
        O(n)
    }

    function x(t) {
        -1 == e.indexOf(pi, t) && pi.push(t)
    }

    function O(t) {
        return mi = e.without(mi, t), 0 == mi.length && mi.push(W), pi
    }

    function L(t) {
        -1 == e.indexOf(di, t) && di.push(t)
    }

    function U(t) {
        return di = e.without(di, t)
    }

    function W(e) {
        ci.signalImg = void 0 === e.signalbar ? "0" : e.signalbar, ci.networkType = e.network_type ? e.network_type : "", -1 != ci.networkType.toLowerCase().indexOf("limited_service") || -1 != ci.networkType.toLowerCase().indexOf("limited service") ? ci.networkType = "limited_service" : -1 == ci.networkType.toLowerCase().indexOf("no_service") && -1 == ci.networkType.toLowerCase().indexOf("no service") || (ci.networkType = "no_service"), ci.networkOperator = e.network_provider ? e.network_provider : "", ci.spn_b1_flag = e.spn_b1_flag, ci.spn_b2_flag = e.spn_b2_flag, ci.spn_name_data = e.spn_name_data, "PPPOE" == e.opms_wan_mode || "AUTO" == e.opms_wan_mode && "AUTO_PPPOE" == e.opms_wan_auto_mode ? ci.connectStatus = void 0 === e.pppoe_status ? "ppp_disconnected" : e.pppoe_status : "DHCP" == e.opms_wan_mode || "AUTO" == e.opms_wan_mode && "AUTO_DHCP" == e.opms_wan_auto_mode ? "1" == e.dhcp_wan_status ? ci.connectStatus = "ppp_connected" : ci.connectStatus = "ppp_disconnected" : "STATIC" == e.opms_wan_mode || "AUTO" == e.opms_wan_mode && "AUTO_STATIC" == e.opms_wan_auto_mode ? "1" == e.static_wan_status && "1" == e.rj45_state ? ci.connectStatus = "ppp_connected" : ci.connectStatus = "ppp_disconnected" : ci.connectStatus = void 0 === e.ppp_status ? "ppp_disconnected" : e.ppp_status;
        var t = e.station_mac && "" != e.station_mac ? e.station_mac.split(";").slice(0, -1) : [];
        ci.curr_connected_devices = t, ci.roamingStatus = H(ci.networkType, e.modem_main_state, e.simcard_roam), ci.wifiStatus = "1" == e.RadioOff, ci.radio_off = e.RadioOff, ci.simStatus = e.modem_main_state, ci.pinStatus = e.pin_status;
        var r = e.battery_vol_percent && e.battery_vol_percent.length > 0 ? e.battery_vol_percent : 100;
        ci.batteryPers = e.battery_pers;
        var i = Math.round(10800 * (1 - r / 100));
        if (ci.batteryStatus = void 0 === e.battery_charging ? "0" : e.battery_charging, ci.battery_value = void 0 === e.battery_value ? "0" : e.battery_value, ci.batteryLevel = r, ci.batteryTime = i.toString(), ci.data_counter = {
            uploadRate: "" == e.realtime_tx_thrpt ? 0 : e.realtime_tx_thrpt,
            downloadRate: "" == e.realtime_rx_thrpt ? 0 : e.realtime_rx_thrpt,
            currentSent: "" == e.realtime_tx_bytes ? 0 : e.realtime_tx_bytes,
            currentReceived: "" == e.realtime_rx_bytes ? 0 : e.realtime_rx_bytes,
            currentConnectedTime: "" == e.realtime_time ? 0 : e.realtime_time,
            monthlySent: "" == e.monthly_tx_bytes ? 0 : e.monthly_tx_bytes,
            monthlyReceived: "" == e.monthly_rx_bytes ? 0 : e.monthly_rx_bytes,
            monthlyConnectedTime: "" == e.monthly_time ? 0 : e.monthly_time,
            month: "" == e.date_month ? 1 : e.date_month
        }, ci.ssid = e.SSID1, ci.authMode = e.AuthMode, ci.isLoggedIn && 1 == ci.isLoggedIn && "ok" != e.loginfo ? ui > 2 ? (ci.isLoggedIn = !n.HAS_LOGIN || "ok" == e.loginfo, ui = 0) : ui++ : ci.isLoggedIn = !n.HAS_LOGIN || "ok" == e.loginfo, n.HAS_SMS && (ci.newSmsReceived || (ci.newSmsReceived = e.sms_received_flag > 0), ci.smsReportReceived || (ci.smsReportReceived = e.sts_received_flag > 0), void 0 !== e.sms_dev_unread_num ? ci.smsUnreadCount = n.SMS_UNREAD_NUM_INCLUDE_SIM ? parseInt(0 | e.sms_dev_unread_num, 10) + parseInt(0 | e.sms_sim_unread_num, 10) : parseInt(0 | e.sms_dev_unread_num, 10) : ci.smsUnreadCount = parseInt(0 | e.sms_unread_num, 10)), "1" == e.data_volume_limit_switch) if (ci.limitVolumeEnable = !0, ci.limitVolumeType = "data" == e.data_volume_limit_unit ? "1" : "0", ci.limitVolumePercent = e.data_volume_alert_percent, "data" == e.data_volume_limit_unit) {
            var o = e.data_volume_limit_size.split("_");
            ci.limitVolumeSize = o[0] * o[1] * 1024 * 1024, ci.limitVolumeSizeSource = o[0] * o[1]
        } else ci.limitVolumeSize = 60 * e.data_volume_limit_size * 60, ci.limitVolumeSizeSource = e.data_volume_limit_size; else ci.limitVolumeEnable = !1, ci.limitVolumeType = "1", ci.limitVolumePercent = "100", ci.limitVolumeSize = "0";
        ci.connectWifiProfile = e.EX_wifi_profile, ci.connectWifiSSID = e.EX_SSID1, ci.connectWifiStatus = e.sta_ip_status, ci.multi_ssid_enable = e.m_ssid_enable, ci.roamMode = e.roam_setting_option, ci.opms_wan_mode = e.opms_wan_mode, ci.opms_wan_auto_mode = e.opms_wan_auto_mode, ci.dhcp_wan_status = e.dhcp_wan_status, ci.new_version_state = "1" == e.new_version_state || "version_has_new_critical_software" == e.new_version_state || "version_has_new_optional_software" == e.new_version_state || "upgrade_pack_redownload" == e.current_upgrade_state, ci.current_upgrade_state = e.current_upgrade_state, "downloading" == ci.current_upgrade_state ? ci.current_upgrade_state = "upgrading" : "verify_failed" == ci.current_upgrade_state && (ci.current_upgrade_state = "upgrade_pack_error"), ci.is_mandatory = "1" == e.is_mandatory || "version_has_new_critical_software" == e.new_version_state, ci.allowRoamingUpdate = e.upg_roam_switch, ci.wifi_dfs_status = e.wifi_dfs_status, ci.wifi_5g_enable = e.wifi_5g_enable, ci.dialMode = e.dial_mode, ci.ppp_dial_conn_fail_counter = e.ppp_dial_conn_fail_counter, ci.isCaStatus = "ca_activated" == e.wan_lte_ca || "ca_deactivated" == e.wan_lte_ca, ci.privacy_read_flag = e.privacy_read_flag, ci.pppoe_status = e.pppoe_status, ci.dhcp_wan_status = e.dhcp_wan_status, ci.static_wan_status = e.static_wan_status, ci.mode_main_state = e.mode_main_state, ci.battery_temp = e.battery_temp, ci.battery_customer_mode = e.battery_customer_mode
    }

    function V() {
        ci.batteryStatus = "0"
    }

    function H(e, n, r) {
        return "" != t.trim(e) && "no_service" != e.toLowerCase() && "limited_service" != e.toLowerCase() && "modem_sim_undetected" != n && "modem_waitpin" != n && "modem_waitpuk" != n && ("Internal" == r || "International" == r)
    }

    function B(e, t, n) {
        if (("string" != typeof e || "" === e || "number" != typeof t || isNaN(t)) && "function" == typeof n) return void n(!1);
        if (-1 === (0 === t ? 0 : 2 === t ? 2 : 7 == t ? 7 : -1) && "function" == typeof n) return void n(!1);
        i({isTest: si, goformId: "SET_NETWORK", NetworkNumber: e, Rat: t}, function (e) {
            if (e && "success" == e.result) var t, i = 0, o = setInterval(function () {
                var e = r({cmd: "m_netselect_result", isTest: si}, !1);
                e || n(!1), "manual_success" == e.m_netselect_result ? (t = "1", window.clearInterval(o), n(!0)) : "manual_fail" == e.m_netselect_result ? (t = "0", window.clearInterval(o), n(!1)) : i < 120 ? i++ : (window.clearInterval(o), n(!1))
            }, 1e3); else n(!1)
        }, function (e) {
            n(!1)
        }, !0)
    }

    function G() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "current_network", n
        }

        function t(e) {
            return e ? {
                strFullName: e.strFullName,
                strShortName: e.strShortName,
                strNumeric: e.strNumeric,
                nRat: "" == e.nRat ? "" : Number(e.nRat),
                strBearer: e.strBearer
            } : _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function K() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.notCallback = !0, n.goformId = "PBM_CONTACT_ADD", n.location = e.location, n.name = encodeMessage(e.name), n.mobilephone_num = e.mobile_phone_number, 1 == n.location ? (n.add_index_pc = e.index, n.homephone_num = e.home_phone_number, n.officephone_num = e.office_phone_number, n.email = encodeMessage(e.mail), n.groupchoose = e.group, n.groupchoose || (n.groupchoose = "common")) : n.edit_index = e.index, n
        }

        function t(e) {
            e && "success" == e.result ? F("pbm_write_flag", n) : r(e)
        }

        function n(e) {
            z(e, r, n)
        }

        var r = arguments[1];
        return _(arguments, {}, e, t, null, !0)
    }

    function z(e, t, n) {
        "0" == e.pbm_write_flag ? (k("pbm_write_flag", n), t({result: "success"})) : "6" != e.pbm_write_flag && "7" != e.pbm_write_flag && "8" != e.pbm_write_flag && "9" != e.pbm_write_flag && "10" != e.pbm_write_flag && "11" != e.pbm_write_flag && "14" != e.pbm_write_flag || (k("pbm_write_flag", n), t({result: "fail"}))
    }

    function X() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.notCallback = !0, n.goformId = "PBM_CONTACT_DEL", n.del_option = "delete_num", n.delete_id = e.indexs.join(","), n
        }

        function t(e) {
            e && "success" == e.result ? F("pbm_write_flag", n) : r(e)
        }

        function n(e) {
            z(e, r, n)
        }

        var r = arguments[1];
        return _(arguments, {}, e, t, null, !0)
    }

    function j() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.notCallback = !0, n.goformId = "PBM_CONTACT_DEL", n.del_option = "delete_all", n.del_all_location = e.location, n
        }

        function t(e) {
            e && "success" == e.result ? F("pbm_write_flag", n) : r(e)
        }

        function n(e) {
            z(e, r, n)
        }

        var r = arguments[1];
        return _(arguments, {}, e, t, null, !0)
    }

    function q() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.notCallback = !0, n.goformId = "PBM_CONTACT_DEL", n.del_option = "delete_all_by_group", n.del_all_location = 3, n.del_group = e.group, n
        }

        function t(e) {
            e && "success" == e.result ? F("pbm_write_flag", n) : r(e)
        }

        function n(e) {
            z(e, r, n)
        }

        var r = arguments[1];
        return _(arguments, {}, e, t, null, !0)
    }

    function Y() {
        function e(e, t) {
            var n = {};
            return n.goformId = "SET_CONNECTION_MODE", n.isTest = si, n.ConnectionMode = e.connectionMode, n.roam_setting_option = e.isAllowedRoaming, n
        }

        function t(e) {
            if (e) return e;
            callback(e)
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function Q() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "ConnectionMode", n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.connectionMode = e.connectionMode, t.isAllowedRoaming = e.autoConnectWhenRoaming, t
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Z(e, n) {
        function r(e, t) {
            var r = {};
            return r.isTest = si, r.mem_store = n, r.cmd = 2 == n ? "pbm_data_total" : "pbm_data_info", r.page = e.page, r.data_per_page = e.data_per_page, r.orderBy = e.orderBy, r.isAsc = e.isAsc, r
        }

        function i(e) {
            if (e && e.pbm_data) {
                var n = [];
                return t.each(e.pbm_data, function (t) {
                    n.push({
                        pbm_id: e.pbm_data[t].pbm_id,
                        pbm_location: e.pbm_data[t].pbm_location,
                        pbm_number: e.pbm_data[t].pbm_number,
                        pbm_anr: e.pbm_data[t].pbm_anr,
                        pbm_anr1: e.pbm_data[t].pbm_anr1,
                        pbm_group: e.pbm_data[t].pbm_group,
                        pbm_name: decodeMessage(e.pbm_data[t].pbm_name),
                        pbm_email: decodeMessage(e.pbm_data[t].pbm_email)
                    })
                }), {pbm_data: n}
            }
            return _i
        }

        return 0 == e[0].data_per_page ? {pbm_data: []} : _(e, {}, r, i, null, !1)
    }

    function J() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "pbm_data_total", n.mem_store = 3, n.pbm_group = e.group, n.page = e.page, n.data_per_page = e.data_per_page, n.orderBy = e.orderBy, n.isAsc = e.isAsc, n
        }

        function n(e) {
            if (e && e.pbm_data) {
                var n = [];
                return t.each(e.pbm_data, function (t) {
                    n.push({
                        pbm_id: e.pbm_data[t].pbm_id,
                        pbm_location: e.pbm_data[t].pbm_location,
                        pbm_number: e.pbm_data[t].pbm_number,
                        pbm_anr: e.pbm_data[t].pbm_anr,
                        pbm_anr1: e.pbm_data[t].pbm_anr1,
                        pbm_group: e.pbm_data[t].pbm_group,
                        pbm_name: decodeMessage(e.pbm_data[t].pbm_name),
                        pbm_email: decodeMessage(e.pbm_data[t].pbm_email)
                    })
                }), {pbm_data: n}
            }
            return _i
        }

        return 0 == arguments[0].data_per_page ? {pbm_data: []} : _(arguments, {}, e, n, null, !1)
    }

    function $() {
        return Z(arguments, 1)
    }

    function ee() {
        return Z(arguments, 0)
    }

    function te() {
        return Z(arguments, 2)
    }

    function ne() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "pbm_init_flag", n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function re(e, t) {
        function n(e, n) {
            var r = {};
            return r.isTest = si, r.cmd = "pbm_capacity_info", r.pbm_location = t ? "pbm_sim" : "pbm_native", r
        }

        function r(e) {
            return e || _i
        }

        return _(e, {}, n, r, null, !1)
    }

    function ie() {
        var e = re(arguments, !0);
        return {
            simPbmTotalCapacity: parseInt(e.pbm_sim_max_record_num),
            simPbmUsedCapacity: parseInt(e.pbm_sim_used_record_num),
            simType: e.pbm_sim_type,
            maxNameLen: parseInt(e.pbm_sim_max_name_len),
            maxNumberLen: parseInt(e.pbm_sim_max_number_len)
        }
    }

    function oe() {
        var e = re(arguments, !1);
        return {
            pcPbmTotalCapacity: parseInt(e.pbm_dev_max_record_num),
            pcPbmUsedCapacity: parseInt(e.pbm_dev_used_record_num)
        }
    }

    function _e() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "modem_main_state,puknumber,pinnumber,opms_wan_mode,psw_fail_num_str,login_lock_time,SleepStatusForSingleChipCpe", n.multi_data = 1, n
        }

        function t(e) {
            return e ? (e.psw_fail_num_str = "" == e.psw_fail_num_str ? n.MAX_LOGIN_COUNT : e.psw_fail_num_str, e.login_lock_time = "" == e.login_lock_time ? "300" : e.login_lock_time, e.curSleepStatus = "1" == e.SleepStatusForSingleChipCpe ? "1" : "2", e) : _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function se() {
        function e(e, t) {
            var r = lr({nv: "LD"}).LD;
            return {
                isTest: si, goformId: "LOGIN",
                password: "2" == n.WEB_ATTR_IF_SUPPORT_SHA256 ? paswordAlgorithmsCookie(paswordAlgorithmsCookie(e.password) + r) : "1" == n.WEB_ATTR_IF_SUPPORT_SHA256 ? paswordAlgorithmsCookie(Base64.encode(e.password)) : Base64.encode(e.password)
            }
        }

        function r(e) {
            if (!e || "0" != e.result && "4" != e.result) {
                if (e && "5" == e.result) return ci.isLoggedIn = !1, {result: "5"};
                var n = {};
                switch (e.result) {
                    case"1":
                        n = {errorType: "Login Fail"};
                        break;
                    case"2":
                        n = {errorType: "duplicateUser"};
                        break;
                    case"3":
                        n = {errorType: "badPassword"};
                        break;
                    default:
                        n = {errorType: "Login Fail"}
                }
                return ci.isLoggedIn = !1, t.extend(_i, n)
            }
            return ci.isLoggedIn = !0, {result: !0}
        }

        return _(arguments, {}, e, r, {errorType: "badPassword"}, !0)
    }

    function ae() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "loginfo", n.multi_data = 1, n
        }

        function r(e) {
            if (e && e.loginfo || "" == e.loginfo) {
                var n = {};
                switch (e.loginfo) {
                    case"ok":
                        ci.isLoggedIn = !0, n.status = "loggedIn";
                        break;
                    default:
                        ci.isLoggedIn = !1, n.status = "loggedOut"
                }
                return n
            }
            return ci.isLoggedIn = void 0, t.extend(_i, {errorType: "LoginStatusError"})
        }

        if (void 0 != ci.isLoggedIn) return _(arguments, {status: ci.isLoggedIn ? "loggedIn" : "loggedOut"});
        var i = {};
        return n.HAS_LOGIN || (i.status = "loggedIn", i.errorType = "no_login", ci.isLoggedIn = !0), _(arguments, i, e, r, null, !1)
    }

    function ue() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "ENTER_PIN", n.PinNumber = e.PinNumber, n
        }

        function t(e) {
            return e && "success" === e.result ? {result: !0} : {result: !1}
        }

        return _(arguments, {}, e, t, {}, !0)
    }

    function ce() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "ENTER_PUK", n.PUKNumber = e.PUKNumber, n.PinNumber = e.PinNumber, n
        }

        function t(e) {
            return e && "success" === e.result ? {result: !0} : {result: !1}
        }

        return _(arguments, {}, e, t, {}, !0)
    }

    function de() {
        function e(e, t) {
            return {
                isTest: si,
                cmd: "sms_data_total",
                page: e.page,
                data_per_page: n.SMS_DATABASE_SORT_SUPPORT ? e.smsCount : 500,
                mem_store: e.nMessageStoreType,
                tags: e.tags,
                order_by: e.orderBy
            }
        }

        function t(e) {
            return e && e.messages && e.messages.length > 0 ? {messages: le(e.messages)} : {messages: []}
        }

        return _(arguments, {}, e, t, {}, !1)
    }

    function le(r, i) {
        for (var o = [], _ = 0; _ < r.length; _++) if (n.SHOW_UN_COMPLETE_CONCAT_SMS || void 0 === r[_].received_all_concat_sms || "0" != r[_].received_all_concat_sms) {
            var s = {};
            s.id = r[_].id, s.number = r[_].number, s.content = i ? r[_].content : pe(r[_].content), s.timeOri = transTime("20" + r[_].date), s.time = transTime("20" + r[_].date, n.DATE_FORMAT, n.TIME_FORMAT), s.isNew = "1" == r[_].tag, s.groupId = r[_].draft_group_id, s.tag = r[_].tag, s.receivedAll = "1" == r[_].received_all_concat_sms, o.push(s)
        }
        if (n.SMS_DATABASE_SORT_SUPPORT) return o;
        for (var a = [], u = [], _ = o.length; _--;) {
            var c = o[_], d = t.inArray(c.id, a);
            -1 == d ? (a.push(c.id), u.push(c)) : c.content.length > u[d].content.length && (u[d] = c)
        }
        return e.sortBy(u, function (e) {
            return 0 - e.id
        })
    }

    function pe(e) {
        return decodeMessage(escapeMessage(e))
    }

    function me() {
        function e(e, t) {
            return {
                isTest: si,
                goformId: "SEND_SMS",
                notCallback: !0,
                Number: e.number,
                sms_time: getCurrentTimeString(),
                MessageBody: escapeMessage(encodeMessage(e.message)),
                ID: e.id,
                encode_type: getEncodeType(e.message).encodeType
            }
        }

        function n(e) {
            if (!e) return void i(t.extend(_i, {errorType: "sendFail", errorText: "send_fail_try_again"}));
            "success" == e.result ? setTimeout(function () {
                we({smsCmd: 4, errorType: "sendFail", errorText: "send_fail_try_again"}, r, i)
            }, 1e3) : i(t.extend(_i, {errorType: "sendFail", errorText: "send_fail_try_again"}))
        }

        var r = arguments[1], i = arguments[2] ? arguments[2] : r;
        return _(arguments, {}, e, n, null, !0)
    }

    function fe() {
        function e(e, t) {
            return {
                isTest: si,
                notCallback: !0,
                goformId: "SAVE_SMS",
                SMSMessage: escapeMessage(encodeMessage(e.message)),
                SMSNumber: e.numbers.join(";") + ";",
                Index: e.index,
                encode_type: getEncodeType(e.message).encodeType,
                sms_time: e.currentTimeString,
                draft_group_id: e.groupId
            }
        }

        function n(e) {
            if (!e) return void i(t.extend(_i, {errorType: "saveFail", errorText: "save_fail"}));
            "success" == e.result ? we({
                smsCmd: 5,
                errorType: "saveFail",
                errorText: "save_fail"
            }, r, i) : i(t.extend(_i, {errorType: "saveFail", errorText: "save_fail"}))
        }

        var r = arguments[1], i = arguments[2] ? arguments[2] : r;
        return _(arguments, {}, e, n, null, !0)
    }

    function ge() {
        function e(e, t) {
            return {isTest: si, goformId: "ALL_DELETE_SMS", notCallback: !0, which_cgi: e.location}
        }

        function n(e) {
            if (!e) return void o(t.extend(_i, {errorType: "deleteFail", errorText: "delete_fail_try_again"}));
            "success" == e.result ? F("sms_cmd_status_info", r) : o(t.extend(_i, {
                errorType: "deleteFail",
                errorText: "delete_fail_try_again"
            }))
        }

        function r(e) {
            var n = e.sms_cmd_status_info;
            "2" == n ? (k("sms_cmd_status_info", r), o(t.extend(_i, {
                errorType: "deleteFail",
                errorText: "delete_fail_try_again"
            }))) : "3" == n && (k("sms_cmd_status_info", r), i({result: !0}))
        }

        var i = arguments[1], o = arguments[2] ? arguments[2] : i;
        return _(arguments, {}, e, n, null, !0)
    }

    function ve() {
        function e(e, t) {
            var n = e.ids.join(";") + ";";
            return {isTest: si, goformId: "DELETE_SMS", msg_id: n, notCallback: !0}
        }

        function n(e) {
            if (!e) return void i(t.extend(_i, {errorType: "deleteFail", errorText: "delete_fail_try_again"}));
            "success" == e.result ? we({
                smsCmd: 6,
                errorType: "deleteFail",
                errorText: "delete_fail_try_again"
            }, r, i) : i(t.extend(_i, {errorType: "deleteFail", errorText: "delete_fail_try_again"}))
        }

        var r = arguments[1], i = arguments[2] ? arguments[2] : r;
        return _(arguments, {}, e, n, null, !0)
    }

    function we(e, n, r) {
        i({cmd: "sms_cmd_status_info", sms_cmd: e.smsCmd, isTest: si}, function (i) {
            if (i) {
                var o = i.sms_cmd_status_result;
                "2" == o ? r(t.extend(_i, {
                    errorType: e.errorType,
                    errorText: e.errorText
                })) : "3" == o ? n({result: "success"}) : window.setTimeout(function () {
                    we(e, n, r)
                }, 1e3)
            } else r(t.extend(_i, {errorType: e.errorType, errorText: e.errorText}))
        }, function (n) {
            r(t.extend(_i, {errorType: e.errorType, errorText: e.errorText}))
        }, !1)
    }

    function Te() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "sms_cmd_status_info", n.sms_cmd = 1, n
        }

        function t(e) {
            return e ? ("3" == e.sms_cmd_status_result && (n.smsIsReady = !0), e) : _i
        }

        if (n.smsIsReady) {
            var r = arguments[1];
            return r ? r({sms_cmd: "1", sms_cmd_status_result: "3"}) : {sms_cmd: "1", sms_cmd_status_result: "3"}
        }
        return _(arguments, {}, e, t, null, !1)
    }

    function Se() {
        function e(e, t) {
            var n = e.ids.join(";");
            return e.ids.length > 0 && (n += ";"), {isTest: si, goformId: "SET_MSG_READ", msg_id: n, tag: 0}
        }

        function t(e) {
            return "success" == e.result ? {result: !0} : {result: !1}
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function Pe() {
        function e(e, t) {
            return {isTest: si, cmd: "sms_status_rpt_data", page: e.page, data_per_page: e.smsCount}
        }

        function t(e) {
            return e ? {messages: le(e.messages, !0)} : _i
        }

        return _(arguments, {}, e, t, {}, !1)
    }

    function he() {
        function e(e, n) {
            var r = t.extend({}, e);
            return r.isTest = si, r.goformId = "LOGOUT", r
        }

        function n(e) {
            return e && "success" == e.result ? (ci.isLoggedIn = !1, {result: !0}) : t.extend(_i, {errorType: "loggedOutError"})
        }

        return _(arguments, {}, e, n, null, !0)
    }

    function Ie() {
        function e(e, t) {
            var r = {};
            return r.newPassword = "2" == n.WEB_ATTR_IF_SUPPORT_SHA256 ? paswordAlgorithmsCookie(e.newPassword) : (n.WEB_ATTR_IF_SUPPORT_SHA256, Base64.encode(e.newPassword)), r.oldPassword = "2" == n.WEB_ATTR_IF_SUPPORT_SHA256 ? paswordAlgorithmsCookie(e.oldPassword) : "1" == n.WEB_ATTR_IF_SUPPORT_SHA256 ? paswordAlgorithmsCookie(Base64.encode(e.oldPassword)) : Base64.encode(e.oldPassword), r.goformId = "CHANGE_PASSWORD", r.isTest = si, r
        }

        function r(e) {
            return e && "success" === e.result ? {result: !0} : t.extend(_i, {errorType: "badPassword"})
        }

        return _(arguments, {}, e, r, null, !0)
    }

    function Ae() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "pinnumber,pin_status,puknumber", n.multi_data = 1, n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function be() {
        function e(e, t) {
            var n = {};
            return n.goformId = "ENABLE_PIN", n.OldPinNumber = e.oldPin, n.isTest = si, n
        }

        function t(e) {
            return e && "success" === e.result ? {result: !0} : {result: !1}
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function ye() {
        function e(e, t) {
            var n = {};
            return n.goformId = "DISABLE_PIN", n.OldPinNumber = e.oldPin, n.isTest = si, n
        }

        function t(e) {
            return e && "success" === e.result ? {result: !0} : {result: !1}
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function Ee() {
        function e(e, t) {
            var n = {};
            return n.goformId = "ENABLE_PIN", n.OldPinNumber = e.oldPin, n.NewPinNumber = e.newPin, n.isTest = si, n
        }

        function t(e) {
            return e && "success" === e.result ? {result: !0} : {result: !1}
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function Re() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "lan_ipaddr,lan_netmask,mac_address,dhcpEnabled,dhcpStart,dhcpEnd,dhcpLease_hour,mtu,tcp_mss", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.ipAddress = e.lan_ipaddr, t.subnetMask = e.lan_netmask, t.macAddress = e.mac_address, t.dhcpServer = e.dhcpEnabled, t.dhcpStart = e.dhcpStart, t.dhcpEnd = e.dhcpEnd, t.dhcpLease = parseInt(e.dhcpLease_hour, 10), t.mtuValue = e.mtu, t.mssValue = e.tcp_mss, t
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Ne() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "DHCP_SETTING", n.lanIp = e.ipAddress, n.lanNetmask = e.subnetMask, n.lanDhcpType = "1" == e.dhcpServer ? "SERVER" : "DISABLE", "SERVER" == n.lanDhcpType && (n.dhcpStart = e.dhcpStart, n.dhcpEnd = e.dhcpEnd, n.dhcpLease = e.dhcpLease), n.dhcp_reboot_flag = 1, n.mac_ip_reset = e.mac_ip_reset, n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function Me() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "SET_DEVICE_MTU", n.mtu = e.mtuValue, n.tcp_mss = e.mssValue, n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function De() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "sms_parameter_info", n
        }

        function t(e) {
            if (e) {
                var t = {};
                switch (t.centerNumber = e.sms_para_sca, t.memStroe = e.sms_para_mem_store, t.deliveryReport = e.sms_para_status_report, parseInt(e.sms_para_validity_period)) {
                    case 143:
                        t.validity = "twelve_hours";
                        break;
                    case 167:
                        t.validity = "one_day";
                        break;
                    case 173:
                        t.validity = "one_week";
                        break;
                    case 244:
                    case 255:
                        t.validity = "largest";
                        break;
                    default:
                        t.validity = "twelve_hours"
                }
                return t
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Ce() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "SET_MESSAGE_CENTER", n.save_time = e.validity, n.MessageCenter = e.centerNumber, n.status_save = e.deliveryReport, n.save_location = "native", n.notCallback = !0, n
        }

        function n(e) {
            if (!e) return void i(t.extend(_i, {errorType: "smsSettingFail", errorText: "error_info"}));
            "success" == e.result ? we({
                smsCmd: 3,
                errorType: "smsSettingFail",
                errorText: "error_info"
            }, r, i) : i(t.extend(_i, {errorType: "deleteFail", errorText: "delete_fail_try_again"}))
        }

        var r = arguments[1], i = arguments[2] ? arguments[2] : r;
        return _(arguments, {}, e, n, null, !0)
    }

    function Fe() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "RESTORE_FACTORY_SETTINGS", n
        }

        function t(e) {
            return e || _i
        }

        var r = {};
        return n.HAS_PARENTAL_CONTROL && 0 != n.currentUserInChildGroup && (r = {errorType: "no_auth"}), _(arguments, r, e, t, null, !0)
    }

    function ke(e) {
        var t = {};
        t.isTest = si, t.cmd = "restore_flag", t.multi_data = 1, i(t, function (t) {
            t && "1" === t.restore_flag ? e() : setTimeout(function () {
                ke(e)
            }, 5e3)
        }, function () {
            setTimeout(function () {
                ke(e)
            }, 5e3)
        }, !1)
    }

    function xe() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "wifi_wps_index,WscModeOption,AuthMode,RadioOff,EncrypType,wps_mode,WPS_SSID,m_ssid_enable,SSID1,m_SSID,m_EncrypType,m_AuthMode", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.wpsFlag = e.WscModeOption, t.authMode = e.AuthMode, t.wpsType = e.wps_mode, t.radioFlag = e.RadioOff, t.encrypType = e.EncrypType, t.wpsSSID = e.WPS_SSID, t.ssidEnable = e.m_ssid_enable, t.ssid = e.SSID1, t.multiSSID = e.m_SSID, t.m_encrypType = e.m_EncrypType, t.wifi_wps_index = e.wifi_wps_index, t.AuthMode = e.AuthMode, t.m_AuthMode = e.m_AuthMode, t
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Oe() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "WIFI_WPS_SET", n.WPS_SSID = e.wpsSSID, n.wps_mode = e.wpsType, n.wifi_wps_index = e.wpsIndex, "PIN" == n.wps_mode && (n.wps_pin = e.wpsPin), n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function Le() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "sysIdleTimeToSleep", n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.sleepMode = e.sysIdleTimeToSleep, t
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Ue() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "SET_WIFI_SLEEP_INFO", n.sysIdleTimeToSleep = e.sleepMode, n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function We() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "RemoteManagement,WANPingFilter", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.remoteFlag = "1" == e.RemoteManagement ? "1" : "0", t.pingFlag = "1" == e.WANPingFilter ? "1" : "0", t
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Ve() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "FW_SYS", n.remoteManagementEnabled = e.remoteFlag, n.pingFrmWANFilterEnabled = e.pingFlag, n.RemoteManagement = e.remoteFlag, n.WANPingFilter = e.pingFlag, n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function He() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "PortForwardEnable,PortForwardRules_0,PortForwardRules_1,PortForwardRules_2,PortForwardRules_3,PortForwardRules_4,PortForwardRules_5,PortForwardRules_6,PortForwardRules_7,PortForwardRules_8,PortForwardRules_9", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                t.portForwardEnable = e.PortForwardEnable;
                var r = [];
                return "" != e.PortForwardRules_0 && r.push([0, e.PortForwardRules_0]), "" != e.PortForwardRules_1 && r.push([1, e.PortForwardRules_1]), "" != e.PortForwardRules_2 && r.push([2, e.PortForwardRules_2]), "" != e.PortForwardRules_3 && r.push([3, e.PortForwardRules_3]), "" != e.PortForwardRules_4 && r.push([4, e.PortForwardRules_4]), "" != e.PortForwardRules_5 && r.push([5, e.PortForwardRules_5]), "" != e.PortForwardRules_6 && r.push([6, e.PortForwardRules_6]), "" != e.PortForwardRules_7 && r.push([7, e.PortForwardRules_7]), "" != e.PortForwardRules_8 && r.push([8, e.PortForwardRules_8]), "" != e.PortForwardRules_9 && r.push([9, e.PortForwardRules_9]), t.portForwardRules = n(r), t
            }
            return _i
        }

        function n(e) {
            var t = [];
            if (e && e.length > 0) for (var n = 0; n < e.length; n++) {
                var r = {}, i = e[n][1].split(",");
                r.index = e[n][0], r.ipAddress = i[0], r.portRange = i[1] + " - " + i[2], r.protocol = transProtocol(i[3]), r.comment = i[4], t.push(r)
            }
            return t
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Be() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "FW_FORWARD_ADD", n.ipAddress = e.ipAddress, n.portStart = e.portStart, n.portEnd = e.portEnd, n.protocol = e.protocol, n.comment = e.comment, n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function Ge() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "FW_FORWARD_DEL", n.delete_id = e.indexs.join(";") + ";", n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function Ke() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "VIRTUAL_SERVER", n.PortForwardEnable = e.portForwardEnable, n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function ze() {
        function e(e, t) {
            var r = {};
            r.isTest = si;
            var i = n.PASSWORD_ENCODE_NEW ? ",WPAPSK1_encode" : ",WPAPSK1";
            return r.cmd = "pdp_type,ipv6_pdp_type,RadioOff,SSID1,HideSSID,AuthMode,WscModeOption,ppp_status,apn_index,ipv6_apn_index,ipv6_APN_index,m_profile_name,apn_mode" + i + ",APN_config0,APN_config1,APN_config2,APN_config3,APN_config4,APN_config5,APN_config6,APN_config7,APN_config8,APN_config9,APN_config10,APN_config11,APN_config12,APN_config13,APN_config14,APN_config15,APN_config16,APN_config17,APN_config18,APN_config19,ipv6_APN_config0,ipv6_APN_config1,ipv6_APN_config2,ipv6_APN_config3,ipv6_APN_config4,ipv6_APN_config5,ipv6_APN_config6,ipv6_APN_config7,ipv6_APN_config8,ipv6_APN_config9,ipv6_APN_config10,ipv6_APN_config11,ipv6_APN_config12,ipv6_APN_config13,ipv6_APN_config14,ipv6_APN_config15,ipv6_APN_config16,ipv6_APN_config17,ipv6_APN_config18,ipv6_APN_config19", r.multi_data = 1, r
        }

        function t(e) {
            return e ? (n.PASSWORD_ENCODE_NEW ? e.WPAPSK1 = Base64.decode(e.WPAPSK1_encode) : e.WPAPSK1 = Base64.decode(e.WPAPSK1), e) : _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Xe() {
        function e(e) {
            return {
                isTest: si,
                goformId: "QUICK_SETUP",
                apn_mode: e.apnMode,
                Profile_Name: e.Profile_Name,
                APN_name: e.APN_name,
                ppp_auth_mode: e.ppp_auth_mode,
                ppp_username: e.ppp_username,
                ppp_passwd: e.ppp_passwd,
                SSID_name: e.SSID_name,
                SSID_Broadcast: e.SSID_Broadcast,
                Encryption_Mode_hid: e.Encryption_Mode_hid,
                security_shared_mode: e.security_shared_mode,
                WPA_PreShared_Key: n.PASSWORD_ENCODE ? Base64.encode(e.WPA_PreShared_Key) : e.WPA_PreShared_Key,
                wep_default_key: e.wep_default_key,
                WPA_ENCRYPTION_hid: e.WPA_ENCRYPTION_hid
            }
        }

        function r(e) {
            return e || t.extend(_i, {errorType: "SetSetUpError"})
        }

        qe(arguments, e, r)
    }

    function je() {
        function e(e) {
            return {
                isTest: si,
                goformId: "QUICK_SETUP_EX",
                index: e.apn_index,
                pdp_type: e.pdp_type,
                apn_mode: e.apnMode,
                profile_name: e.profile_name,
                wan_apn: e.wan_apn,
                ppp_auth_mode: e.ppp_auth_mode,
                ppp_username: e.ppp_username,
                ppp_passwd: e.ppp_passwd,
                ipv6_wan_apn: e.ipv6_wan_apn,
                ipv6_ppp_auth_mode: e.ipv6_ppp_auth_mode,
                ipv6_ppp_username: e.ipv6_ppp_username,
                ipv6_ppp_passwd: e.ipv6_ppp_passwd,
                SSID_name: e.SSID_name,
                SSID_Broadcast: e.SSID_Broadcast,
                Encryption_Mode_hid: e.Encryption_Mode_hid,
                security_shared_mode: e.security_shared_mode,
                WPA_PreShared_Key: n.PASSWORD_ENCODE ? Base64.encode(e.WPA_PreShared_Key) : e.WPA_PreShared_Key,
                wep_default_key: e.wep_default_key,
                WPA_ENCRYPTION_hid: e.WPA_ENCRYPTION_hid
            }
        }

        function r(e) {
            return e || t.extend(_i, {errorType: "SetSetUpError"})
        }

        qe(arguments, e, r)
    }

    function qe(e, t, n) {
        var r = !1, o = !1, _ = t(e[0]), s = e[1], a = function (e) {
            r = !0, !o && s && s(n(e)), o = !0
        }, u = e[2];
        i(_, a, function () {
            r = !0, u && u()
        }, !0), addTimeout(function () {
            if (0 == r) var e = addInterval(function () {
                0 == r && f({}, function (t) {
                    window.clearInterval(e), a({result: "success"})
                })
            }, 1e3)
        }, 5e3)
    }

    function Ye() {
        function e(e, t) {
            return {
                isTest: si,
                cmd: "sdcard_mode_option,sd_card_state,HTTP_SHARE_STATUS,HTTP_SHARE_CARD_USER,HTTP_SHARE_WR_AUTH,HTTP_SHARE_FILE",
                multi_data: 1
            }
        }

        function t(e) {
            if (e) {
                var t;
                t = "mmc2" == e.HTTP_SHARE_FILE || "/mmc2" == e.HTTP_SHARE_FILE || "/mmc2/" == e.HTTP_SHARE_FILE ? "1" : "0";
                return {
                    sd_mode: "1" == e.sdcard_mode_option ? "0" : "1",
                    sd_status: e.sd_card_state,
                    share_status: "Enabled" == e.HTTP_SHARE_STATUS ? "1" : "0",
                    share_user: e.HTTP_SHARE_CARD_USER,
                    share_auth: "readWrite" == e.HTTP_SHARE_WR_AUTH ? "1" : "0",
                    file_to_share: t,
                    share_file: e.HTTP_SHARE_FILE
                }
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Qe() {
        function e(e, t) {
            return {
                isTest: si,
                goformId: "HTTPSHARE_MODE_SET",
                mode_set: "0" == e.mode ? "http_share_mode" : "usb_mode"
            }
        }

        function t(e) {
            return e && "success" == e.result ? {result: !0} : {result: !1}
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function Ze() {
        function e(e, t) {
            return {isTest: si, goformId: "GOFORM_HTTPSHARE_CHECK_FILE", path_SD_CARD: e.path}
        }

        function t(e) {
            return e ? "no_sdcard" == e.result ? {status: "no_sdcard"} : "noexist" == e.result ? {status: "noexist"} : {status: "exist"} : _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function Je() {
        function e(e, t) {
            return {isTest: si, goformId: "HTTPSHARE_ENTERFOLD", path_SD_CARD: e.path, indexPage: e.index}
        }

        function n(e) {
            return e ? "failure" == e.result ? t.extend(_i, {errorType: "get_file_list_failure"}) : "no_sdcard" == e.result ? t.extend(_i, {errorType: "no_sdcard"}) : r(e.result) : _i
        }

        function r(e) {
            var t = {};
            t.totalRecord = e.totalRecord;
            for (var n = [], r = e.fileInfo, i = 0; r && i < r.length; i++) if ("" != r[i].fileName) {
                var o = {};
                o.fileName = r[i].fileName, o.attribute = r[i].attribute, o.size = r[i].size, o.lastUpdateTime = r[i].lastUpdateTime, n.push(o)
            }
            return t.details = n, t
        }

        return _(arguments, {}, e, n, null, !0)
    }

    function $e() {
        function e(e, t) {
            var n = new Date, r = n.getTime(), i = 60 * n.getTimezoneOffset();
            return {
                isTest: si,
                goformId: "HTTPSHARE_FILE_RENAME",
                path_SD_CARD: e.path,
                OLD_NAME_SD_CARD: e.oldPath,
                NEW_NAME_SD_CARD: e.newPath,
                path_SD_CARD_time: transUnixTime(r),
                path_SD_CARD_time_unix: Math.round((r - 1e3 * i) / 1e3)
            }
        }

        function n(e) {
            return e ? "success" == e.result ? {result: !0} : "no_sdcard" == e.result ? t.extend(_i, {errorType: "no_sdcard"}) : {result: !1} : _i
        }

        return _(arguments, {}, e, n, null, !0)
    }

    function et() {
        function e(e, t) {
            return {isTest: si, cmd: "HTTPSHARE_GETCARD_VALUE"}
        }

        function n(e) {
            return !e || e.result && "no_sdcard" == e.result ? t.extend(_i, {errorType: "no_sdcard"}) : {
                totalMemorySize: "" == e.sd_card_total_size ? 0 : 32 * e.sd_card_total_size * 1024,
                availableMemorySize: "" == e.sd_card_avi_space ? 0 : 32 * e.sd_card_avi_space * 1024
            }
        }

        return _(arguments, {}, e, n, null, !1)
    }

    function tt() {
        function e(e, t) {
            var n = (new Date).getTime();
            return {
                isTest: si,
                goformId: "HTTPSHARE_DEL",
                path_SD_CARD: e.path,
                name_SD_CARD: e.names,
                path_SD_CARD_time: transUnixTime(n),
                path_SD_CARD_time_unix: Math.round(n / 1e3)
            }
        }

        function n(e) {
            return e.result && "failure" == e.result ? t.extend(_i, {errorType: "delete_folder_failure"}) : e.result && "no_sdcard" == e.result ? t.extend(_i, {errorType: "no_sdcard"}) : e.result && "success" == e.result ? {result: !0} : _i
        }

        return _(arguments, {}, e, n, null, !0)
    }

    function nt() {
        function e(e, t) {
            var n = new Date, r = n.getTime(), i = 60 * n.getTimezoneOffset();
            return {
                isTest: si,
                goformId: "HTTPSHARE_NEW",
                path_SD_CARD: e.path,
                path_SD_CARD_time: transUnixTime(r),
                path_SD_CARD_time_unix: Math.round((r - 1e3 * i) / 1e3)
            }
        }

        function n(e) {
            return e.result && "failure" == e.result ? t.extend(_i, {errorType: "create_folder_failure"}) : e.result && "no_sdcard" == e.result ? t.extend(_i, {errorType: "no_sdcard"}) : e.result && "success" == e.result ? {result: !0} : _i
        }

        return _(arguments, {}, e, n, null, !0)
    }

    function rt() {
        function e(e, t) {
            return {isTest: si, cmd: "CheckUploadFileStatus"}
        }

        function t(e) {
            return e ? "5" == e.result ? {result: !1} : "6" == e.result ? {result: !0} : {result: !1} : _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function it() {
        function e(e, t) {
            return {
                isTest: si,
                goformId: "HTTPSHARE_AUTH_SET",
                HTTP_SHARE_STATUS: "1" == e.share_status ? "Enabled" : "Disabled",
                HTTP_SHARE_WR_AUTH: "1" == e.share_auth ? "readWrite" : "readOnly",
                HTTP_SHARE_FILE: e.share_file
            }
        }

        function n(e) {
            return e ? "no_sdcard" == e.result ? t.extend(_i, {errorType: "no_sdcard"}) : {result: !0} : _i
        }

        return _(arguments, {}, e, n, null, !0)
    }

    function ot() {
        function t(e, t) {
            var r = {};
            return r.isTest = si, r.cmd = "IPPortFilterEnable,DefaultFirewallPolicy,IPPortFilterRules_0,IPPortFilterRules_1,IPPortFilterRules_2,IPPortFilterRules_3,IPPortFilterRules_4,IPPortFilterRules_5,IPPortFilterRules_6,IPPortFilterRules_7,IPPortFilterRules_8,IPPortFilterRules_9", n.USE_IPV6_INTERFACE && (r.cmd += ",IPPortFilterRulesv6_0,IPPortFilterRulesv6_1,IPPortFilterRulesv6_2,IPPortFilterRulesv6_3,IPPortFilterRulesv6_4,IPPortFilterRulesv6_5,IPPortFilterRulesv6_6,IPPortFilterRulesv6_7,IPPortFilterRulesv6_8,IPPortFilterRulesv6_9"), r.multi_data = 1, r
        }

        function r(t) {
            if (t) {
                var r = {};
                r.portFilterEnable = t.IPPortFilterEnable, r.defaultPolicy = t.DefaultFirewallPolicy;
                var o = [];
                if ("" != t.IPPortFilterRules_0 && o.push([0, t.IPPortFilterRules_0]), "" != t.IPPortFilterRules_1 && o.push([1, t.IPPortFilterRules_1]), "" != t.IPPortFilterRules_2 && o.push([2, t.IPPortFilterRules_2]), "" != t.IPPortFilterRules_3 && o.push([3, t.IPPortFilterRules_3]), "" != t.IPPortFilterRules_4 && o.push([4, t.IPPortFilterRules_4]), "" != t.IPPortFilterRules_5 && o.push([5, t.IPPortFilterRules_5]), "" != t.IPPortFilterRules_6 && o.push([6, t.IPPortFilterRules_6]), "" != t.IPPortFilterRules_7 && o.push([7, t.IPPortFilterRules_7]), "" != t.IPPortFilterRules_8 && o.push([8, t.IPPortFilterRules_8]), "" != t.IPPortFilterRules_9 && o.push([9, t.IPPortFilterRules_9]), r.portFilterRules = i(o, "IPv4"), n.USE_IPV6_INTERFACE) {
                    var _ = [];
                    "" != t.IPPortFilterRulesv6_0 && _.push([10, t.IPPortFilterRulesv6_0]), "" != t.IPPortFilterRulesv6_1 && _.push([11, t.IPPortFilterRulesv6_1]), "" != t.IPPortFilterRulesv6_2 && _.push([12, t.IPPortFilterRulesv6_2]), "" != t.IPPortFilterRulesv6_3 && _.push([13, t.IPPortFilterRulesv6_3]), "" != t.IPPortFilterRulesv6_4 && _.push([14, t.IPPortFilterRulesv6_4]), "" != t.IPPortFilterRulesv6_5 && _.push([15, t.IPPortFilterRulesv6_5]), "" != t.IPPortFilterRulesv6_6 && _.push([16, t.IPPortFilterRulesv6_6]), "" != t.IPPortFilterRulesv6_7 && _.push([17, t.IPPortFilterRulesv6_7]), "" != t.IPPortFilterRulesv6_8 && _.push([18, t.IPPortFilterRulesv6_8]), "" != t.IPPortFilterRulesv6_9 && _.push([19, t.IPPortFilterRulesv6_9]), r.portFilterRules = e.union(r.portFilterRules, i(_, "IPv6"))
                }
                return r
            }
            return _i
        }

        function i(e, t) {
            var n = [];
            if (e && e.length > 0) for (var r = 0; r < e.length; r++) {
                var i = {}, o = e[r][1].split(",");
                i.index = e[r][0], i.macAddress = o[11], i.destIpAddress = "any/0" == o[4] ? "" : o[4], i.sourceIpAddress = "any/0" == o[0] ? "" : o[0], i.destPortRange = "0" == o[6] ? "" : o[6] + " - " + o[7], i.sourcePortRange = "0" == o[2] ? "" : o[2] + " - " + o[3], i.action = 1 == o[9] ? "filter_accept" : "filter_drop", i.protocol = transProtocol(o[8]), i.comment = o[10], i.ipType = t, n.push(i)
            }
            return n
        }

        return _(arguments, {}, t, r, null, !1)
    }

    function _t() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "BASIC_SETTING", n.portFilterEnabled = e.portFilterEnable, n.defaultFirewallPolicy = e.defaultPolicy, n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function st() {
        function e(e, t) {
            var r = {};
            return r.isTest = si, n.USE_IPV6_INTERFACE ? (r.goformId = "ADD_IP_PORT_FILETER_V4V6", r.ip_version = e.ipType) : r.goformId = "ADD_IP_PORT_FILETER", r.mac_address = e.macAddress, r.dip_address = e.destIpAddress, r.sip_address = e.sourceIpAddress, r.dFromPort = e.destPortStart, r.dToPort = e.destPortEnd, r.sFromPort = e.sourcePortStart, r.sToPort = e.sourcePortEnd, r.action = e.action, r.protocol = e.protocol, r.comment = e.comment, r
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function at() {
        function t(t, r) {
            var i = {};
            i.isTest = si;
            var o = e.filter(t.indexs, function (e) {
                return 1 == e.length
            });
            if (n.USE_IPV6_INTERFACE) {
                i.goformId = "DEL_IP_PORT_FILETER_V4V6";
                var _ = [];
                e.each(t.indexs, function (e) {
                    2 == e.length && _.push(e.substring(1))
                }), i.delete_id_v6 = _.length > 0 ? _.join(";") + ";" : ""
            } else i.goformId = "DEL_IP_PORT_FILETER";
            return i.delete_id = o.length > 0 ? o.join(";") + ";" : "", i
        }

        function r(e) {
            return e || _i
        }

        return _(arguments, {}, t, r, null, !0)
    }

    function ut() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "WirelessMode,CountryCode,Channel,HT_MCS,wifi_band,wifi_11n_cap,MAX_Access_num,m_MAX_Access_num,wifi_attr_max_station_number", n.multi_data = 1, n
        }

        function r(e) {
            if (e) {
                return {
                    mode: e.WirelessMode,
                    countryCode: e.CountryCode,
                    channel: e.Channel,
                    rate: e.HT_MCS,
                    wifiBand: "a" == e.wifi_band ? "a" : "b",
                    bandwidth: e.wifi_11n_cap,
                    MAX_Station_num: t.isNumeric(e.wifi_attr_max_station_number) ? e.wifi_attr_max_station_number : n.MAX_STATION_NUMBER,
                    MAX_Access_num: e.MAX_Access_num,
                    m_MAX_Access_num: e.m_MAX_Access_num
                }
            }
            return _i
        }

        return _(arguments, {}, e, r, null, !1)
    }

    function ct() {
        function e(e) {
            var t = {
                goformId: "SET_WIFI_INFO",
                isTest: si,
                wifiMode: e.mode,
                countryCode: e.countryCode,
                MAX_Access_num: e.station,
                m_MAX_Access_num: e.m_station
            };
            return n.WIFI_BAND_SUPPORT && (t.wifi_band = e.wifiBand), t.selectedChannel = e.channel, n.WIFI_BAND_SUPPORT && "a" == e.wifiBand || (t.abg_rate = e.rate), n.WIFI_BANDWIDTH_SUPPORT && (t.wifi_11n_cap = e.bandwidth), t
        }

        function t(e) {
            return e || _i
        }

        qe(arguments, e, t)
    }

    function dt() {
        function e(e, t) {
            return {
                isTest: si,
                cmd: "apn_interface_version,wifi_coverage,m_ssid_enable,imei,network_type,rssi,rscp,lte_rsrp,imsi,sim_imsi,cr_version,wa_version,hardware_version,web_version,wa_inner_version,MAX_Access_num,SSID1,AuthMode,WPAPSK1_encode,m_SSID,m_AuthMode,m_HideSSID,m_WPAPSK1_encode,m_MAX_Access_num,lan_ipaddr,mac_address,msisdn,LocalDomain,wan_ipaddr,static_wan_ipaddr,ipv6_wan_ipaddr,ipv6_pdp_type,ipv6_pdp_type_ui,pdp_type,pdp_type_ui,opms_wan_mode,opms_wan_auto_mode,ppp_status",
                multi_data: 1
            }
        }

        function t(e) {
            return e ? {
                ssid: e.SSID1,
                authMode: e.AuthMode,
                passPhrase: Base64.decode(e.WPAPSK1_encode),
                m_ssid: e.m_SSID,
                m_authMode: e.m_AuthMode,
                m_passPhrase: Base64.decode(e.m_WPAPSK1_encode),
                m_max_access_num: e.m_MAX_Access_num,
                multi_ssid_enable: e.m_ssid_enable,
                ipAddress: e.lan_ipaddr,
                wanIpAddress: e.wan_ipaddr,
                staticWanIpAddress: e.static_wan_ipaddr,
                ipv6WanIpAddress: e.ipv6_wan_ipaddr,
                ipv6PdpType: e.ipv6_pdp_type,
                macAddress: e.mac_address,
                simSerialNumber: e.msisdn,
                lanDomain: e.LocalDomain,
                imei: e.imei,
                signal: convertSignal(e),
                imsi: e.imsi || e.sim_imsi,
                sw_version: e.wa_inner_version || e.cr_version,
                fw_version: e.wa_version,
                hw_version: e.hardware_version,
                max_access_num: e.MAX_Access_num,
                wifiRange: e.wifi_coverage,
                pdpType: e.apn_interface_version >= 2 ? e.pdp_type_ui : e.pdp_type,
                opms_wan_mode: e.opms_wan_mode,
                opms_wan_auto_mode: e.opms_wan_auto_mode,
                connectStatus: e.ppp_status
            } : _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function lt() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "wifi_coverage", n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.wifiRangeMode = e.wifi_coverage, t
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function pt() {
        function e(e, t) {
            var n = {};
            return n.goformId = "SET_WIFI_COVERAGE", n.isTest = si, n.wifi_coverage = e.wifiRangeMode, n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function mt() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "auto_power_save", n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.autoPowerSaveMode = e.auto_power_save, t
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function ft() {
        function e(e, t) {
            var n = {};
            return n.goformId = "SET_AUTO_POWER_SAVE", n.isTest = si, n.auto_power_save = e.autoPowerSaveMode, n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function gt() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "upnpEnabled", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.upnpSetting = "1" == e.upnpEnabled ? "1" : "0", t
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function vt() {
        function e(e, t) {
            var n = {};
            return n.goformId = "UPNP_SETTING", n.isTest = si, n.upnp_setting_option = e.upnpSetting, n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function wt() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "DMZEnable,DMZIPAddress,lan_ipaddr,lan_netmask", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.dmzSetting = "1" == e.DMZEnable ? "1" : "0", t.ipAddress = e.DMZIPAddress, t.gatewayIpAddress = e.lan_ipaddr, t.gatewaySubnetMask = e.lan_netmask, t
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Tt() {
        function e(e, t) {
            var n = {};
            return n.goformId = "DMZ_SETTING", n.isTest = si, n.DMZEnabled = e.dmzSetting, "1" == n.DMZEnabled && (n.DMZIPAddress = e.ipAddress), n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function St() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "PortMapEnable,PortMapRules_0,PortMapRules_1,PortMapRules_2,PortMapRules_3,PortMapRules_4,PortMapRules_5,PortMapRules_6,PortMapRules_7,PortMapRules_8,PortMapRules_9", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                t.portMapEnable = e.PortMapEnable;
                var r = [];
                return "" != e.PortMapRules_0 && r.push([0, e.PortMapRules_0]), "" != e.PortMapRules_1 && r.push([1, e.PortMapRules_1]), "" != e.PortMapRules_2 && r.push([2, e.PortMapRules_2]), "" != e.PortMapRules_3 && r.push([3, e.PortMapRules_3]), "" != e.PortMapRules_4 && r.push([4, e.PortMapRules_4]), "" != e.PortMapRules_5 && r.push([5, e.PortMapRules_5]), "" != e.PortMapRules_6 && r.push([6, e.PortMapRules_6]), "" != e.PortMapRules_7 && r.push([7, e.PortMapRules_7]), "" != e.PortMapRules_8 && r.push([8, e.PortMapRules_8]), "" != e.PortMapRules_9 && r.push([9, e.PortMapRules_9]), t.portMapRules = n(r), t
            }
            return _i
        }

        function n(e) {
            var t = [];
            if (e && e.length > 0) for (var n = 0; n < e.length; n++) {
                var r = {}, i = e[n][1].split(",");
                r.index = e[n][0], r.sourcePort = i[1], r.destIpAddress = i[0], r.destPort = i[2], r.protocol = transProtocol(i[3]), r.comment = i[4], t.push(r)
            }
            return t
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Pt() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "ADD_PORT_MAP", n.portMapEnabled = e.portMapEnable, n.fromPort = e.sourcePort, n.ip_address = e.destIpAddress, n.toPort = e.destPort, n.protocol = e.protocol, n.comment = e.comment, n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function ht() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "ADD_PORT_MAP", n.portMapEnabled = e.portMapEnable, n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function It() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "DEL_PORT_MAP", n.delete_id = e.indexs.join(";") + ";", n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function At() {
        function e(e, t) {
            return {
                isTest: si,
                cmd: "data_volume_limit_switch,data_volume_limit_unit,data_volume_limit_size,data_volume_alert_percent,monthly_tx_bytes,monthly_rx_bytes,monthly_time,wan_auto_clear_flow_data_switch,traffic_clear_date",
                multi_data: 1
            }
        }

        function t(e) {
            if (e) {
                var t = "data" == e.data_volume_limit_unit;
                return {
                    dataLimitChecked: e.data_volume_limit_switch,
                    dataLimitTypeChecked: t ? "1" : "0",
                    limitDataMonth: t ? e.data_volume_limit_size : "0",
                    alertDataReach: t ? e.data_volume_alert_percent : "0",
                    limitTimeMonth: t ? "0" : e.data_volume_limit_size,
                    alertTimeReach: t ? "0" : e.data_volume_alert_percent,
                    monthlySent: "" == e.monthly_tx_bytes ? 0 : e.monthly_tx_bytes,
                    monthlyReceived: "" == e.monthly_rx_bytes ? 0 : e.monthly_rx_bytes,
                    monthlyConnectedTime: "" == e.monthly_time ? 0 : e.monthly_time,
                    autoClearTraffic: e.wan_auto_clear_flow_data_switch,
                    traffic_clear_date: e.traffic_clear_date
                }
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function bt() {
        function e(e, t) {
            var r = "1" == e.dataLimitTypeChecked, i = {isTest: si, goformId: "DATA_LIMIT_SETTING"};
            return "1" == e.dataLimitChecked && (i.data_volume_limit_unit = r ? "data" : "time", i.data_volume_limit_size = r ? e.limitDataMonth : e.limitTimeMonth, i.data_volume_alert_percent = r ? e.alertDataReach : e.alertTimeReach), i.wan_auto_clear_flow_data_switch = e.wan_auto_clear_flow_data_switch, i.traffic_clear_date = e.traffic_clear_date,
                -1 != n.DEVICE.toLowerCase().indexOf("cpe") ? i.data_volume_limit_switch = e.dataLimitChecked : (i.data_volume_limit_switch = e.dataLimitChecked, i.notify_deviceui_enable = "0"), i
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function yt() {
        function e(e, t) {
            return "send" == e.sendOrReply ? {
                isTest: si,
                goformId: "USSD_PROCESS",
                USSD_operator: e.operator,
                USSD_send_number: e.strUSSDCommand,
                notCallback: !0
            } : "reply" == e.sendOrReply ? {
                isTest: si,
                goformId: "USSD_PROCESS",
                USSD_operator: e.operator,
                USSD_reply_number: e.strUSSDCommand,
                notCallback: !0
            } : void 0
        }

        function t(e) {
            if (!e) return void n(!1, "ussd_fail");
            "success" == e.result ? (callbackTemp = n, Et()) : n(!1, "ussd_fail")
        }

        var n = arguments[1];
        return _(arguments, {}, e, t, null, !0)
    }

    function Et() {
        t.ajax({
            url: "/goform/goform_get_cmd_process",
            data: {cmd: "ussd_write_flag"},
            cache: !1,
            async: !0,
            dataType: "json",
            success: function (e) {
                "1" == e.ussd_write_flag ? callbackTemp(!1, "ussd_no_service") : "4" == e.ussd_write_flag || "unknown" == e.ussd_write_flag || "3" == e.ussd_write_flag ? callbackTemp(!1, "ussd_timeout") : "15" == e.ussd_write_flag ? setTimeout(Et, 1e3) : "10" == e.ussd_write_flag ? callbackTemp(!1, "ussd_retry") : "99" == e.ussd_write_flag ? callbackTemp(!1, "ussd_unsupport") : "41" == e.ussd_write_flag ? callbackTemp(!1, "operation_not_supported") : "2" == e.ussd_write_flag ? callbackTemp(!1, "network_terminated") : "16" == e.ussd_write_flag ? t.ajax({
                    url: "/goform/goform_get_cmd_process",
                    data: {cmd: "ussd_data_info"},
                    dataType: "json",
                    async: !0,
                    cache: !1,
                    success: function (e) {
                        var t = {};
                        t.data = e.ussd_data, t.ussd_action = e.ussd_action, t.ussd_dcs = e.ussd_dcs, callbackTemp(!0, t)
                    },
                    error: function () {
                        callbackTemp(!1, "ussd_info_error")
                    }
                }) : callbackTemp(!1, "ussd_fail")
            },
            error: function () {
                callbackTemp(!1, "ussd_fail")
            }
        })
    }

    function Rt(e) {
        var r = {};
        if (r.goformId = "USSD_PROCESS", r.USSD_operator = "ussd_cancel", n.ACCESSIBLE_ID_SUPPORT) {
            var i = paswordAlgorithmsCookie(rd0 + rd1), o = lr({nv: "RD"}).RD, _ = paswordAlgorithmsCookie(i + o);
            r.AD = _
        }
        t.ajax({
            url: "/goform/goform_set_cmd_process", data: r, cache: !1, dataType: "json", success: function (t) {
                e("success" == t.result ? !0 : !1)
            }
        })
    }

    function Nt() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "dlna_language,dlna_name,dlna_share_audio,dlna_share_video,dlna_share_image,dlna_scan_state,sd_card_state,sdcard_mode_option,dlna_rescan_end", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                return {
                    language: e.dlna_language,
                    deviceName: e.dlna_name,
                    shareAudio: e.dlna_share_audio,
                    shareVideo: e.dlna_share_video,
                    shareImage: e.dlna_share_image,
                    needRescan: "1" == e.dlna_scan_state,
                    dlnaEnable: !0,
                    dlna_scan: e.dlna_rescan_end
                }
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Mt() {
        function e(e, t) {
            return {
                isTest: si,
                notCallback: !0,
                goformId: "DLNA_SETTINGS",
                dlna_language: e.language,
                dlna_name: e.deviceName,
                dlna_share_audio: e.shareAudio,
                dlna_share_video: e.shareVideo,
                dlna_share_image: e.shareImage
            }
        }

        function t(e) {
            e && "success" == e.result ? F("dlna_rescan_end", n) : r(e)
        }

        function n(e) {
            Ct(e, r, n)
        }

        var r = arguments[1];
        return _(arguments, {}, e, t, null, !0)
    }

    function Dt() {
        function e(e, t) {
            return {isTest: si, notCallback: !0, goformId: "DLNA_RESCAN"}
        }

        function t(e) {
            e && "success" == e.result ? F("dlna_rescan_end", n) : r(e)
        }

        function n(e) {
            Ct(e, r, n)
        }

        var r = arguments[1];
        return _(arguments, {}, e, t, null, !0)
    }

    function Ct(e, t, n) {
        "1" == e.dlna_rescan_end && (k("dlna_rescan_end", n), t({result: "success"}))
    }

    function Ft() {
        function e(e) {
            return {isTest: si, goformId: "UNLOCK_NETWORK", notCallback: !0, unlock_network_code: e.unlock_network_code}
        }

        function t(e) {
            e && "success" == e.result ? x(n) : r({result: "fail"})
        }

        function n() {
            i > 5 ? (O(n), r({result: "fail"})) : "modem_imsi_waitnck" != ci.simStatus && (O(n), r({result: "success"})), i++
        }

        var r = arguments[1], i = 0;
        return _(arguments, {}, e, t, null, !0)
    }

    function kt() {
        function e(e, t) {
            return {isTest: si, cmd: "unlock_nck_time"}
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function xt() {
        function e(e) {
            return {
                isTest: si,
                goformId: "SET_UPGRADE_NOTICE",
                upgrade_notice_flag: e.upgrade_notice_flag,
                notCallback: !0
            }
        }

        function t(e) {
            n("success" == e.result ? !0 : !1)
        }

        var n = arguments[1];
        return _(arguments, {}, e, t, null, !0)
    }

    function Ot() {
        function e(e, t) {
            return {isTest: si, cmd: "upgrade_notice_flag"}
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Lt() {
        function e(e, t) {
            return {isTest: si, multi_data: 1, cmd: "wifi_sta_connection,ap_station_mode"}
        }

        function t(e) {
            return e ? {ap_station_enable: e.wifi_sta_connection, ap_station_mode: e.ap_station_mode} : _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Ut() {
        function e(e) {
            return {
                isTest: si,
                goformId: "WIFI_STA_CONTROL",
                wifi_sta_connection: e.ap_station_enable,
                ap_station_mode: e.ap_station_mode
            }
        }

        function t(e) {
            return e && "success" == e.result ? (ci.ap_station_enable = 1 == n.ap_station_enable, ci.ap_station_mode = n.ap_station_mode, e) : _i
        }

        var n = arguments[0];
        return _(arguments, {}, e, t, null, !0)
    }

    function Wt() {
        return Lt({}, function (e) {
            ci.ap_station_enable = 1 == e.ap_station_enable, ci.ap_station_mode = e.ap_station_mode
        })
    }

    function Vt() {
        function e(e, t) {
            return {
                isTest: si,
                multi_data: 1,
                cmd: "wifi_profile,wifi_profile1,wifi_profile2,wifi_profile3,wifi_profile4,wifi_profile5,wifi_profile_num"
            }
        }

        function t(e) {
            if (e) {
                for (var t = [], n = 0; n <= 5; n++) {
                    var r = "";
                    r = 0 == n ? e.wifi_profile : e["wifi_profile" + n];
                    for (var i = r.split(";"), o = 0; o < i.length; o++) {
                        var _ = i[o].split(",");
                        if (!_[0]) break;
                        var s = {
                            profileName: _[0],
                            fromProvider: _[1],
                            connectStatus: _[2],
                            signal: _[3],
                            ssid: _[4],
                            authMode: _[5],
                            encryptType: _[6],
                            password: "0" == _[7] ? "" : _[7],
                            keyID: _[8]
                        };
                        t.push(s)
                    }
                }
                return {hotspotList: t}
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Ht() {
        function e(e) {
            return {isTest: si, goformId: "WLAN_SET_STA_REFRESH"}
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function Bt() {
        function e(e, t) {
            return {isTest: si, multi_data: 1, cmd: "scan_finish,EX_APLIST,EX_APLIST1"}
        }

        function t(e) {
            if (e) {
                if ("0" == e.scan_finish) return {scan_finish: !1, hotspotList: []};
                for (var t = [], n = 0; n <= 1; n++) {
                    var r;
                    r = 0 == n ? e.EX_APLIST : e.EX_APLIST1;
                    for (var i = r.split(";"), o = 0; o < i.length; o++) {
                        var _ = i[o].split(",");
                        if (!_[0]) break;
                        var s = {
                            fromProvider: _[0],
                            connectStatus: _[1],
                            ssid: _[2],
                            signal: _[3],
                            channel: _[4],
                            authMode: _[5],
                            encryptType: _[6]
                        };
                        t.push(s)
                    }
                }
                return {scan_finish: !0, hotspotList: t}
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Gt() {
        function e(e, t) {
            return {isTest: si, multi_data: 1, cmd: "EX_APLIST,EX_APLIST1"}
        }

        function t(e) {
            if (e) {
                for (var t = [], n = 0; n <= 1; n++) {
                    var r;
                    r = 0 == n ? e.EX_APLIST : e.EX_APLIST1;
                    for (var i = r.split(";"), o = 0; o < i.length; o++) {
                        var _ = i[o].split(",");
                        if (!_[0]) break;
                        var s = {
                            fromProvider: _[0],
                            connectStatus: _[1],
                            ssid: _[2],
                            signal: _[3],
                            channel: _[4],
                            authMode: _[5],
                            encryptType: _[6]
                        };
                        t.push(s)
                    }
                }
                return {hotspotList: t}
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Kt(e) {
        var t = [];
        return t.push(e.profileName), t.push(e.fromProvider || "0"), t.push(e.connectStatus || "0"), t.push(e.signal), t.push(e.ssid), t.push(e.authMode), t.push(e.encryptType), t.push(e.password || "0"), t.push(e.keyID), t.join(",")
    }

    function zt() {
        function e(e) {
            var t = e.apList, n = "modify";
            if ("2" == e.saveAddFlag) {
                n = "add", t.reverse();
                t.push({
                    profileName: e.profileName,
                    fromProvider: "0",
                    connectStatus: "0",
                    signal: e.signal,
                    ssid: e.ssid,
                    authMode: e.authMode,
                    encryptType: e.encryptType,
                    password: e.password || "0",
                    keyID: e.keyID
                }), t.reverse()
            }
            for (var r = {
                profile0: [],
                profile1: [],
                profile2: [],
                profile3: [],
                profile4: [],
                profile5: []
            }, i = "", o = 0; o < t.length; o++) {
                var _ = "";
                e.profileNameInit == t[o].profileName ? (_ = Kt(e), i = _) : _ = Kt(t[o]);
                r["profile" + parseInt(o / 5)].push(_)
            }
            return {
                isTest: si,
                goformId: "WIFI_SPOT_PROFILE_UPDATE",
                wifi_profile: r.profile0.join(";"),
                wifi_profile1: r.profile1.join(";"),
                wifi_profile2: r.profile2.join(";"),
                wifi_profile3: r.profile3.join(";"),
                wifi_profile4: r.profile4.join(";"),
                wifi_profile5: r.profile5.join(";"),
                wifi_profile_num: t.length,
                wifi_update_profile: i,
                action: n
            }
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function Xt() {
        function e(e) {
            for (var t = e.apList, n = {
                profile0: [],
                profile1: [],
                profile2: [],
                profile3: [],
                profile4: [],
                profile5: []
            }, r = !1, i = "", o = 0; o < t.length; o++) {
                var _ = Kt(t[o]);
                if (t[o].profileName != e.profileName) {
                    var s = o;
                    r && (s = o - 1);
                    n["profile" + parseInt(s / 5)].push(_)
                } else r = !0, i = _
            }
            var a = r ? t.length - 1 : t.length;
            return {
                isTest: si,
                goformId: "WIFI_SPOT_PROFILE_UPDATE",
                wifi_profile: n.profile0.join(";"),
                wifi_profile1: n.profile1.join(";"),
                wifi_profile2: n.profile2.join(";"),
                wifi_profile3: n.profile3.join(";"),
                wifi_profile4: n.profile4.join(";"),
                wifi_profile5: n.profile5.join(";"),
                wifi_profile_num: a,
                wifi_update_profile: i,
                action: "delete"
            }
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function jt() {
        function e(e) {
            return {
                isTest: si,
                goformId: "WLAN_SET_STA_CON",
                EX_SSID1: e.EX_SSID1,
                EX_AuthMode: e.EX_AuthMode,
                EX_EncrypType: e.EX_EncrypType,
                EX_DefaultKeyID: e.EX_DefaultKeyID,
                EX_WEPKEY: e.EX_WEPKEY,
                EX_WPAPSK1: e.EX_WPAPSK1,
                EX_wifi_profile: e.EX_wifi_profile
            }
        }

        function t(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function qt() {
        function e(e) {
            return {isTest: si, goformId: "WLAN_SET_STA_DISCON"}
        }

        function t(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function Yt() {
        function e(e, t) {
            return {isTest: si, multi_data: 1, cmd: "opms_wan_mode,opms_wan_auto_mode,loginfo,ppp_status"}
        }

        function t(e) {
            if (e) {
                var t = {};
                return "AUTO" == e.opms_wan_mode ? t.opms_wan_mode = e.opms_wan_auto_mode ? e.opms_wan_auto_mode : "" : t.opms_wan_mode = e.opms_wan_mode ? e.opms_wan_mode : "", t.loginfo = e.loginfo, t.ppp_status = e.ppp_status, t
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Qt(e, n) {
        function r(e) {
            return t.extend({isTest: si, goformId: "OPERATION_MODE"}, e)
        }

        function i(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, r, i, null, !0)
    }

    function Zt(e, n) {
        function r(e) {
            return t.extend({isTest: si}, e)
        }

        function i(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, r, i, null, !0)
    }

    function Jt() {
        function e(e, t) {
            return {
                isTest: si,
                multi_data: 1,
                cmd: "opms_wan_auto_mode,pppoe_username,pppoe_password,pppoe_dial_mode,ppp_status,static_wan_ipaddr,static_wan_netmask,static_wan_gateway,static_wan_primary_dns,static_wan_secondary_dns,dhcp_wan_status,static_wan_status"
            }
        }

        function t(e) {
            return e ? {
                opms_wan_auto_mode: e.opms_wan_auto_mode,
                pppoe_username: e.pppoe_username,
                pppoe_password: e.pppoe_password,
                pppoe_dial_mode: e.pppoe_dial_mode,
                ppp_status: e.ppp_status,
                static_wan_ipaddr: e.static_wan_ipaddr,
                static_wan_netmask: e.static_wan_netmask,
                static_wan_gateway: e.static_wan_gateway,
                static_wan_primary_dns: e.static_wan_primary_dns,
                static_wan_secondary_dns: e.static_wan_secondary_dns,
                dhcp_wan_status: e.dhcp_wan_status,
                static_wan_status: e.static_wan_status
            } : _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function $t(e, n) {
        function r(e) {
            return t.extend({isTest: si, notCallback: !0}, e)
        }

        function i(t) {
            "success" == t.result ? "WAN_GATEWAYMODE_PPPOE" == e.goformId && "connect" == e.action_link ? (showLoading("connecting"), x(o)) : "WAN_GATEWAYMODE_PPPOE" == e.goformId && "disconnect" == e.action_link ? x(s) : n({result: !0}) : n({result: !1})
        }

        function o(e) {
            "ppp_connecting" == e.pppoe_status ? ci.connectStatus = "ppp_connecting" : checkConnectedStatus(e.pppoe_status) ? (O(o), ci.connectStatus = "ppp_connected", n({
                result: !0,
                status: ci.connectStatus
            })) : (O(o), n({result: !1}))
        }

        function s(e) {
            "ppp_disconnecting" == e.pppoe_status ? ci.connectStatus = "ppp_disconnecting" : "ppp_disconnected" == e.pppoe_status ? (O(s), ci.connectStatus = "ppp_disconnected", n({
                result: !0,
                status: ci.connectStatus
            })) : (O(s), n({result: !1}))
        }

        return _(arguments, {}, r, i, null, !0)
    }

    function en(e, t) {
        function n(e, t) {
            return {
                isTest: si,
                multi_data: 1,
                cmd: "sntp_year,sntp_month_temp,sntp_day,sntp_hour,sntp_minute,sntp_second,sntp_time_set_mode,sntp_server_list1,sntp_server_list2,sntp_server_list3,sntp_server_list4,sntp_server_list5,sntp_server_list6,sntp_server_list7,sntp_server_list8,sntp_server_list9,sntp_server_list10,sntp_server0,sntp_server1,sntp_server2,sntp_other_server0,sntp_other_server1,sntp_other_server2,sntp_timezone,sntp_dst_enable,ppp_status,opms_wan_mode,syn_done"
            }
        }

        function r(e) {
            if (e) {
                var t = i(e);
                return {
                    sntp_year: e.sntp_year,
                    sntp_month: e.sntp_month_temp,
                    sntp_day: e.sntp_day,
                    sntp_hour: e.sntp_hour,
                    sntp_minute: e.sntp_minute,
                    sntp_second: e.sntp_second,
                    sntp_time_set_mode: e.sntp_time_set_mode,
                    sntp_servers: t,
                    sntp_server0: e.sntp_server0,
                    sntp_server1: e.sntp_server1,
                    sntp_server2: e.sntp_server2,
                    sntp_other_server0: e.sntp_other_server0,
                    sntp_other_server1: e.sntp_other_server1,
                    sntp_other_server2: e.sntp_other_server2,
                    sntp_timezone: e.sntp_timezone,
                    sntp_dst_enable: e.sntp_dst_enable,
                    ppp_status: e.ppp_status,
                    opms_wan_mode: e.opms_wan_mode,
                    syn_done: e.syn_done
                }
            }
            return _i
        }

        function i(e) {
            for (var t = [], n = 0; n < 10; n++) {
                var r = "sntp_server_list" + (n + 1).toString();
                if ("" != e[r]) {
                    var i = {};
                    i.name = e[r], i.value = e[r], t.push(i)
                }
            }
            for (var o = [{name: "Other", value: "Other"}, {name: "NONE", value: ""}], _ = 0; _ < 2; _++) t.push(o[_]);
            return t
        }

        return _(arguments, {}, n, r, null, !1)
    }

    function tn(e, n) {
        function r(e) {
            return t.extend({isTest: si}, e)
        }

        function i(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, r, i, null, !0)
    }

    function nn(e, r) {
        function i() {
            t.ajax({
                url: "/goform/goform_get_cmd_process",
                dataType: "json",
                data: {cmd: "syn_done,nitz_sync_flag", multi_data: "1"},
                cache: !1,
                async: !1,
                success: function (e) {
                    "1" == e.syn_done || "1" == e.nitz_sync_flag ? r(!0) : "0" == e.syn_done ? r(!1) : setTimeout(i, 2e3)
                },
                error: function () {
                    r(!1)
                }
            })
        }

        var o = t.extend({isTest: si}, e);
        if (o.isTest) result = simulate.simulateRequest(e, r, r, !0, !0), setTimeout(function () {
            r(result)
        }, getRandomInt(120) + 50); else {
            if (n.ACCESSIBLE_ID_SUPPORT) {
                var _ = paswordAlgorithmsCookie(rd0 + rd1), s = lr({nv: "RD"}).RD, a = paswordAlgorithmsCookie(_ + s);
                o.AD = a
            }
            t.post("goform/goform_set_cmd_process", o, function (t) {
                t && "success" == t.result ? "auto" == e.manualsettime ? setTimeout(i, 2e3) : r(!0) : r(!1)
            }, "json")
        }
    }

    function rn(e, n) {
        function r(e) {
            return t.extend({isTest: si}, e)
        }

        function i(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, r, i, null, !0)
    }

    function on() {
        function e(e, t) {
            return {isTest: si, cmd: "websURLFilters"}
        }

        function t(e) {
            var t = [];
            if (e) {
                if (0 == e.websURLFilters.length) return {urlFilterRules: []};
                for (var n = e.websURLFilters.split(";"), r = 0; r < n.length; r++) {
                    var i = {};
                    i.index = r, i.url = n[r], t.push(i)
                }
                return {urlFilterRules: t}
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function _n(e, n) {
        function r(e) {
            return t.extend({isTest: si}, e)
        }

        function i(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, r, i, null, !0)
    }

    function sn() {
        function e(e, t) {
            return {
                isTest: si,
                multi_data: "1",
                cmd: "wifi_wds_mode,wifi_wds_ssid,wifi_wds_AuthMode,wifi_wds_EncrypType,wifi_wds_WPAPSK1,RadioOff"
            }
        }

        function t(e) {
            return e ? {
                currentMode: e.wifi_wds_mode,
                wdsSSID: e.wifi_wds_ssid,
                wdsAuthMode: e.wifi_wds_AuthMode,
                wdsEncrypType: e.wifi_wds_EncrypType,
                wdsWPAPSK1: e.wifi_wds_WPAPSK1,
                RadioOff: e.RadioOff
            } : _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function an(e, n) {
        function r(e) {
            return t.extend({isTest: si}, e)
        }

        function i(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, r, i, null, !0)
    }

    function un() {
        function e(e, t) {
            return {isTest: si, multi_data: "1", cmd: "syslog_mode,debug_level"}
        }

        function t(e) {
            return e ? {currentMode: e.syslog_mode, debugLevel: e.debug_level} : _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function cn(e, n) {
        function r(e) {
            return t.extend({isTest: si}, e)
        }

        function i(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, r, i, null, !0)
    }

    function dn() {
        function e(e, t) {
            return {
                isTest: si,
                multi_data: "1",
                cmd: "tr069_ServerURL,tr069_CPEPortNo,tr069_ServerUsername,tr069_ServerPassword,tr069_ConnectionRequestUname,tr069_ConnectionRequestPassword,wan_ipaddr,tr069_PeriodicInformEnable,tr069_PeriodicInformInterval,tr069_CertEnable,tr069_DataModule"
            }
        }

        function t(e) {
            return e ? {
                serverUrl: e.tr069_ServerURL,
                tr069_CPEPortNo: e.tr069_CPEPortNo,
                serverUserName: e.tr069_ServerUsername,
                serverPassword: e.tr069_ServerPassword,
                requestUserName: e.tr069_ConnectionRequestUname,
                requestPassword: e.tr069_ConnectionRequestPassword,
                wanIpAddress: e.wan_ipaddr,
                tr069_PeriodicInformEnable: e.tr069_PeriodicInformEnable,
                tr069_PeriodicInformInterval: e.tr069_PeriodicInformInterval,
                tr069_CertEnable: e.tr069_CertEnable,
                tr069_DataModule: e.tr069_DataModule
            } : _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function ln(e, n) {
        function r(e) {
            return t.extend({isTest: si}, e)
        }

        function i(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, r, i, null, !0)
    }

    function pn() {
        function e(e, t) {
            return {
                isTest: si,
                multi_data: "1",
                cmd: "voip_display_name,voip_user_name,voip_authorization_user_name,voip_authorization_password,voip_registration_server,voip_registration_server_port,voip_proxy_server,voip_proxy_server_port,voip_outbound_proxy_enable,voip_outbound_proxy,voip_outbound_proxy_port,voip_register_status"
            }
        }

        function t(e) {
            return e ? {
                display_name: e.voip_display_name,
                user_name: e.voip_authorization_user_name,
                authorization_user_name: e.voip_user_name,
                authorization_password: e.voip_authorization_password,
                registration_server: e.voip_registration_server,
                registration_server_port: e.voip_registration_server_port,
                proxy_server: e.voip_proxy_server,
                proxy_server_port: e.voip_proxy_server_port,
                outboundEnable: e.voip_outbound_proxy_enable,
                outboundServer: e.voip_outbound_proxy,
                outboundPort: e.voip_outbound_proxy_port,
                voip_register_status: e.voip_register_status
            } : _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function mn(e, n) {
        function r(e) {
            return t.extend({isTest: si}, e)
        }

        function i(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, r, i, null, !0)
    }

    function fn() {
        function e(e, t) {
            return {
                isTest: si,
                multi_data: "1",
                cmd: "voip_sip_register_server1,voip_sip_domain1,voip_sip_realm1,voip_sip_proxy_enable1,voip_sip_proxy_server1,voip_account_display_account1,voip_account_auth1,voip_account_password1,voip_user1_register_status"
            }
        }

        function t(e) {
            return e ? {
                sipRegisterServer: e.voip_sip_register_server1,
                sipDomain: e.voip_sip_domain1,
                sipRealm: e.voip_sip_realm1,
                sipProxyMode: e.voip_sip_proxy_enable1,
                voipSipProxyServer: e.voip_sip_proxy_server1,
                displayName: e.voip_account_display_account1,
                authorizedUserName: e.voip_account_auth1,
                authorizedPassword: e.voip_account_password1,
                voipRegisterStatus: e.voip_user1_register_status
            } : _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function gn() {
        function e(e, t) {
            return {isTest: si, cmd: "voip_user1_register_status"}
        }

        function t(e) {
            return e ? {voipRegisterStatus: e.voip_user1_register_status} : _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function vn() {
        function e(e) {
            return t.extend({isTest: si}, e)
        }

        function n(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, e, n, null, !0)
    }

    function wn() {
        function e(e, t) {
            return {
                isTest: si,
                multi_data: "1",
                cmd: "voip_sip_t38_enable1,voip_sip_dtmf_method,voip_sip_encoder1,voip_sip_vad_enable1,voip_sip_cng_enable1"
            }
        }

        function t(e) {
            return e ? {
                sipT38Mode: e.voip_sip_t38_enable1,
                currentDtmfMethod: e.voip_sip_dtmf_method,
                currentVoipSipEncoderMethod: e.voip_sip_encoder1,
                sipVadMode: e.voip_sip_vad_enable1,
                sipCngMode: e.voip_sip_cng_enable1
            } : _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Tn() {
        function e(e) {
            return t.extend({isTest: si}, e)
        }

        function n(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, e, n, null, !0)
    }

    function Sn() {
        function e(e, t) {
            return {
                isTest: si,
                multi_data: "1",
                cmd: "voip_call_waiting_enable,voip_call_hold_enable,voip_three_way_talking_enable,voip_call_transfer_enable,voip_call_fwd_unconditional_enable,voip_call_fwd_unconditional_number,voip_call_fwd_busy_enable,voip_call_fwd_busy_number,voip_call_fwd_no_answer_enable,voip_call_fwd_no_answer_number"
            }
        }

        function t(e) {
            return e ? {
                voip_call_waiting_enable: e.voip_call_waiting_enable,
                voip_call_hold_enable: e.voip_call_hold_enable,
                voip_three_way_talking_enable: e.voip_three_way_talking_enable,
                voip_call_transfer_enable: e.voip_call_transfer_enable,
                voip_call_fwd_unconditional_enable: e.voip_call_fwd_unconditional_enable,
                voip_call_fwd_unconditional_number: e.voip_call_fwd_unconditional_number,
                voip_call_fwd_busy_enable: e.voip_call_fwd_busy_enable,
                voip_call_fwd_busy_number: e.voip_call_fwd_busy_number,
                voip_call_fwd_no_answer_enable: e.voip_call_fwd_no_answer_enable,
                voip_call_fwd_no_answer_number: e.voip_call_fwd_no_answer_number,
                selectedMode: "1" == e.voip_call_fwd_unconditional_enable ? 1 : 0
            } : _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Pn() {
        function e(e) {
            return t.extend({isTest: si}, e)
        }

        function n(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, e, n, null, !0)
    }

    function hn() {
        function e(e, t) {
            return {
                isTest: si,
                multi_data: "1",
                cmd: "ACL_mode,wifi_mac_black_list,wifi_hostname_black_list,RadioOff,user_ip_addr,wifi_mac_white_list,nick_name_white_list"
            }
        }

        function t(e) {
            return e ? {
                ACL_mode: e.ACL_mode,
                wifi_mac_black_list: e.wifi_mac_black_list,
                wifi_hostname_black_list: e.wifi_hostname_black_list,
                RadioOff: e.RadioOff,
                user_ip_addr: e.user_ip_addr,
                wifi_mac_white_list: e.wifi_mac_white_list,
                nick_name_white_list: e.nick_name_white_list
            } : _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function In() {
        function e(e) {
            return {
                goformId: "WIFI_MAC_FILTER",
                isTest: si,
                ACL_mode: e.ACL_mode,
                wifi_hostname_black_list: e.wifi_hostname_black_list,
                wifi_mac_black_list: e.wifi_mac_black_list,
                nick_name_white_list: e.nick_name_white_list,
                wifi_mac_white_list: e.wifi_mac_white_list
            }
        }

        function t(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function An() {
        function e(e) {
            return {isTest: si, cmd: "mgmt_quicken_power_on,need_hard_reboot", multi_data: 1}
        }

        function t(e) {
            return {fastbootEnabled: "1" == e.mgmt_quicken_power_on ? "1" : "0", need_hard_reboot: e.need_hard_reboot}
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function bn() {
        function e(e) {
            return {
                isTest: si,
                goformId: "MGMT_CONTROL_POWER_ON_SPEED",
                mgmt_quicken_power_on: e.fastbootEnabled,
                need_hard_reboot: e.need_hard_reboot
            }
        }

        function t(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function yn() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "REBOOT_DEVICE", n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function En() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "SHUTDOWN_DEVICE", n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function Rn() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "new_version_state", n
        }

        function t(e) {
            if (e) {
                var t = "1" == e.new_version_state || "version_has_new_critical_software" == e.new_version_state || "version_has_new_optional_software" == e.new_version_state;
                return e.hasNewVersion = t, e
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Nn() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "dm_new_version", n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Mn() {
        function e(e, t) {
            var r = {};
            return r.isTest = si, "OTA" == n.UPGRADE_TYPE ? r.cmd = "is_mandatory" : r.cmd = "new_version_state", r
        }

        function t(e) {
            return e ? "OTA" == n.UPGRADE_TYPE ? {is_mandatory: "1" == e.is_mandatory} : {is_mandatory: "version_has_new_critical_software" == e.new_version_state} : _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Dn() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "upgrade_result", n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Cn() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "current_upgrade_state", n
        }

        function t(e) {
            return e ? ("downloading" == e.current_upgrade_state && (e.current_upgrade_state = "upgrading"), e) : _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Fn() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "dm_update_package_file_exist", n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function kn() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "pack_size_info", n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function xn() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "if_has_select", n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function On() {
        function e(e, t) {
            var n = {};
            return n.goformId = "IF_UPGRADE", n.isTest = si, n.select_op = e.selectOp, "check" == n.select_op && (n.ota_manual_check_roam_state = 1), n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function Ln() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "GetUpgAutoSetting", n
        }

        function t(e) {
            return e ? {
                updateMode: e.UpgMode,
                updateIntervalDay: e.UpgIntervalDay,
                allowRoamingUpdate: e.UpgRoamPermission
            } : _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Un() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "SetUpgAutoSetting", n.UpgMode = e.updateMode, n.UpgIntervalDay = e.updateIntervalDay, n.UpgRoamPermission = e.allowRoamingUpdate, n
        }

        function t(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function Wn() {
        return lr({nv: ["dm_last_check_time"]}, arguments[1], arguments[2])
    }

    function Vn() {
        return lr({nv: ["dm_update_successful_time"]}, arguments[1], arguments[2])
    }

    function Hn() {
        return lr({nv: ["network_type", "rssi", "rscp", "lte_rsrp", "Z5g_snr", "Z5g_rsrp", "ZCELLINFO_band", "Z5g_dlEarfcn", "lte_ca_pcell_arfcn", "lte_ca_pcell_band", "lte_ca_scell_band", "lte_ca_pcell_bandwidth", "lte_ca_scell_info", "lte_ca_scell_bandwidth", "wan_lte_ca", "lte_pci", "Z5g_CELL_ID", "Z5g_SINR", "cell_id", "wan_lte_ca", "lte_ca_pcell_band", "lte_ca_pcell_bandwidth", "lte_ca_scell_band", "lte_ca_scell_bandwidth", "lte_ca_pcell_arfcn", "lte_ca_scell_arfcn", "lte_multi_ca_scell_info", "wan_active_band", "nr5g_pci", "nr5g_action_band", "nr5g_cell_id", "lte_snr", "ecio", "wan_active_channel", "nr5g_action_channel"]}, arguments[1], arguments[2])
    }

    function Bn() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "RESULT_RESTORE", n
        }

        function t(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function Gn() {
        function e(e) {
            return {isTest: si, goformId: "RESET_DATA_COUNTER"}
        }

        function t(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function Kn() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "CHANGE_MODE", n.change_mode = e.change_mode, n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function zn() {
        function e(e, t) {
            return {isTest: si, cmd: "childGroupList"}
        }

        function t(e) {
            return e && (e.childGroupList || e.devices) ? si ? e.childGroupList : e : {devices: []}
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Xn() {
        function e(e, t) {
            return {isTest: si, goformId: "ADD_DEVICE", mac: e.macAddress}
        }

        function t(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, 0 == n.currentUserInChildGroup ? {} : {errorType: "no_auth"}, e, t, null, !0)
    }

    function jn() {
        function e(e, t) {
            return {isTest: si, goformId: "DEL_DEVICE", mac: e.mac}
        }

        function t(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, 0 == n.currentUserInChildGroup ? {} : {errorType: "no_auth"}, e, t, null, !0)
    }

    function qn(t) {
        if (void 0 === n.currentUserInChildGroup) {
            var r = [];
            r = void 0 !== t ? t : zn({}).devices;
            var i = $n({}).get_user_mac_addr || $n({}).user_mac_addr, o = e.find(r, function (e) {
                return e.mac == i
            });
            return n.currentUserInChildGroup = void 0 !== o, {result: void 0 !== o}
        }
        return {result: n.currentUserInChildGroup}
    }

    function Yn() {
        function e(e, t) {
            return {isTest: si, cmd: "child_mac_rule_info", mac_addr: e.mac_addr}
        }

        function t(e) {
            return e && void 0 !== e.child_mac_rule_info ? e : {child_mac_rule_info: ""}
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Qn() {
        function e(e, t) {
            return {isTest: si, goformId: "CHILD_MAC_RULE_DELETE", mac_addr: e.mac}
        }

        function t(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, 0 == n.currentUserInChildGroup ? {} : {errorType: "no_auth"}, e, t, null, !0)
    }

    function Zn() {
        function e(e, t) {
            return {isTest: si, goformId: "CHILD_MAC_RULE_ADD", child_mac_rule_info: e.child_mac_rule_info}
        }

        function t(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, 0 == n.currentUserInChildGroup ? {} : {errorType: "no_auth"}, e, t, null, !0)
    }

    function Jn() {
        function e(e, t) {
            return {
                isTest: si,
                goformId: "CHILD_MAC_RULE_UPDATE",
                mac_addr: e.mac_addr,
                child_mac_rule_info: e.child_mac_rule_info
            }
        }

        function t(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, 0 == n.currentUserInChildGroup ? {} : {errorType: "no_auth"}, e, t, null, !0)
    }

    function $n() {
        return lr({nv: "get_user_mac_addr"}, arguments[1], arguments[2])
    }

    function er() {
        return $n({}).get_user_mac_addr || $n({}).user_mac_addr
    }

    function tr() {
        function e(e, t) {
            return {isTest: si, cmd: "hostNameList"}
        }

        function t(e) {
            return e && (e.hostNameList || e.devices) ? si ? e.hostNameList : e : {devices: []}
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function nr() {
        function e(e, t) {
            return {isTest: si, goformId: "EDIT_HOSTNAME", mac: e.mac, hostname: e.hostname}
        }

        function t(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function rr() {
        function e(e, t) {
            return {isTest: si, cmd: "site_white_list"}
        }

        function t(e) {
            return e && (e.site_white_list || e.siteList) ? si ? e.site_white_list : e : {siteList: []}
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function ir() {
        function e(e, t) {
            return {isTest: si, goformId: "REMOVE_WHITE_SITE", ids: e.ids.join(",")}
        }

        function t(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, 0 == n.currentUserInChildGroup ? {} : {errorType: "no_auth"}, e, t, null, !0)
    }

    function or() {
        function e(e, t) {
            return {isTest: si, goformId: "ADD_WHITE_SITE", name: e.name, site: e.site}
        }

        function t(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, 0 == n.currentUserInChildGroup ? {} : {errorType: "no_auth"}, e, t, null, !0)
    }

    function _r() {
        function t(e, t) {
            return {isTest: si, cmd: "time_limited"}
        }

        function n(e) {
            return e ? r(e) : i
        }

        function r(t) {
            if ("" == t.time_limited) return {time_limited: []};
            var n = t.time_limited.split(";");
            return e.each(n, function (e) {
                var t = e.split("+");
                2 == t.length && (i[t[0]] = t[1].split(","))
            }), i
        }

        var i = {0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: []};
        return _(arguments, {}, t, n, null, !1)
    }

    function sr() {
        function e(e, t) {
            return {isTest: si, goformId: "SAVE_TIME_LIMITED", time_limited: e.time}
        }

        function t(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, 0 == n.currentUserInChildGroup ? {} : {errorType: "no_auth"}, e, t, null, !0)
    }

    function ar() {
        function e(e, t) {
            return {isTest: si, cmd: "web_wake_switch,web_sleep_switch,web_wake_time,web_sleep_time", multi_data: "1"}
        }

        function t(e) {
            if (e) {
                if (-1 != e.web_wake_time.indexOf(":")) {
                    var t = e.web_wake_time.split(":");
                    e.openH = leftInsert(t[0], 2, "0"), e.openM = leftInsert(t[1], 2, "0")
                } else e.openH = "06", e.openM = "00";
                if (-1 != e.web_sleep_time.indexOf(":")) {
                    var n = e.web_sleep_time.split(":");
                    e.closeH = leftInsert(n[0], 2, "0"), e.closeM = leftInsert(n[1], 2, "0")
                } else e.closeH = "22", e.closeM = "00";
                return e
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function ur() {
        function e(e, t) {
            var n = {isTest: si, goformId: "SAVE_TSW", web_wake_switch: e.openEnable, web_sleep_switch: e.closeEnable};
            return "1" == e.openEnable && (n.web_wake_time = e.openTime, n.web_sleep_time = e.closeTime), n
        }

        function t(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function cr() {
        function e(e, t) {
            return {isTest: si, cmd: "systime_mode,syn_done,nitz_sync_flag", multi_data: "1"}
        }

        function t(e) {
            return !e || "sntp" != e.systime_mode && "nitz" != e.systime_mode && "manual" != e.systime_mode && "1" != e.syn_done && "1" != e.nitz_sync_flag ? {result: !1} : {result: !0}
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function dr() {
        function e(e, t) {
            return {
                isTest: si,
                goformId: "FLOW_CALIBRATION_MANUAL",
                calibration_way: e.way,
                time: "time" == e.way ? e.value : 0,
                data: "data" == e.way ? e.value : 0
            }
        }

        function t(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function lr() {
        function t(t, n) {
            var r = {};
            return r.isTest = si, e.isArray(t.nv) ? (r.cmd = t.nv.join(","), r.multi_data = 1) : r.cmd = t.nv, r
        }

        function n(e) {
            return e || _i
        }

        return _(arguments, {}, t, n, null, !1)
    }

    function pr() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "vwim_mc_state,traffic_overrun,detect_new_version", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.vwim_mc_state = e.vwim_mc_state, t.traffic_overrun = e.traffic_overrun, t.detect_new_version = e.detect_new_version, t.opms_wan_mode = "AUTO" == ci.opms_wan_mode ? ci.opms_wan_auto_mode : ci.opms_wan_mode, t
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function mr() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "CLEAR_REDIRECT_FLAG", n.flag_id = e.redirectFlags, n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function fr() {
        function e(e, n) {
            return t.extend({goformId: "DHCP_RESERVATION_TO_STATIC", isTest: si}, e)
        }

        function n(e) {
            return e || _i
        }

        return _(arguments, {}, e, n, null, !0)
    }

    function gr() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "host_name_web,mac_addr_web,ip_addr_web,lan_ipaddr,lan_netmask", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.ipAddress = e.lan_ipaddr, t.subnetMask = e.lan_netmask, t.host_name_web = e.host_name_web, t.mac_addr_web = e.mac_addr_web, t.ip_addr_web = e.ip_addr_web, t
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function vr(e, n) {
        function r(e) {
            return t.extend({isTest: si}, e)
        }

        function i(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, r, i, null, !0)
    }

    function wr() {
        function e(e, t) {
            return {isTest: si, cmd: "current_static_addr_list"}
        }

        function t(e) {
            var t = [];
            if (e) {
                if (null == e.current_static_addr_list || "" == e.current_static_addr_list) return {StaticAddressFilterRules: []};
                for (var n = e.current_static_addr_list, r = 0; r < n.length; r++) {
                    var i = {};
                    i.index = r, i.hostName = n[r].hostname, i.macAddress = n[r].mac, i.ipAddress = n[r].ip, i.domainName = n[r].domain, t.push(i)
                }
                return {StaticAddressFilterRules: t}
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Tr() {
        function e(e, t) {
            return {isTest: si, cmd: "current_static_addr_list"}
        }

        function t(e) {
            if (e) {
                var t = {};
                if (null == e.current_static_addr_list || "" == e.current_static_addr_list) t.bindStaticIPInfo = []; else {
                    for (var n = e.current_static_addr_list, r = [], i = 0; i < n.length; i++) r.push(n[i].ip);
                    t.bindStaticIPInfo = r
                }
                return t
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Sr() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "mac_ip_status", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.mac_ip_status = "1" == e.mac_ip_status ? "1" : "0", t
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Pr(e, n) {
        function r(e) {
            return t.extend({isTest: si}, e)
        }

        function i(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, r, i, null, !0)
    }

    function hr() {
        function e(e) {
            return t.extend({goformId: "WIFI_SPOT_PROFILE_UPDATE", isTest: si}, e)
        }

        function n(e) {
            return e || _i
        }

        return _(arguments, {}, e, n, null, !0)
    }

    function Ir() {
        function e(e, t) {
            return {
                isTest: si,
                multi_data: 1,
                cmd: "wifi_profile,wifi_profile1,wifi_profile2,wifi_profile3,wifi_profile4,wifi_profile5,wifi_profile_num"
            }
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Ar() {
        function e(e) {
            return t.extend({goformId: "SET_NV", isTest: si}, e)
        }

        function n(e) {
            return e || _i
        }

        return _(arguments, {}, e, n, null, !0)
    }

    function br() {
        function e(e) {
            return {goformId: "SET_WIFI_BAND", isTest: si, wifiEnabled: e.wifiEnabled, wifi_band: e.wifi_band}
        }

        function t(e) {
            return e || _i
        }

        qe(arguments, e, t)
    }

    function yr() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "stk_write_flag", n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.stk_write_flag = e.stk_write_flag, t
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Er() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "stk", n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.stk = e.stk, t
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Rr() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "stk_menu", n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.stk_menu = e.stk_menu, t
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Nr() {
        function e(e, t) {
            var n = {};
            return n.goformId = "STK_PROCESS", n.isTest = si, n.operator = e.operator, n.item_no = e.item_no, n.stk_content = e.stk_content, n.stk_encode_type = e.stk_encode_type, n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function Mr(e, n) {
        function r(e) {
            return t.extend({isTest: si}, e)
        }

        function i(e) {
            return e ? {
                sntp_dst_start: e.sntp_dst_start,
                sntp_dst_end: e.sntp_dst_end,
                sntp_dst_bias: e.sntp_dst_bias
            } : _i
        }

        return _(arguments, {}, r, i, null, !0)
    }

    function Dr(e, n) {
        function r(e, n) {
            return t.extend({goformId: "SET_BIND_STATIC_ADDRESS", isTest: si}, e)
        }

        function i(e) {
            return e || _i
        }

        return _(arguments, {}, r, i, null, !0)
    }

    function Cr() {
        function e(e) {
            return {goformId: "REDIRECT_REDIRECT_OFF"}
        }

        function t(e) {
            return e || _i
        }

        qe(arguments, e, t)
    }

    function Fr() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "SleepStatusForSingleChipCpe", n
        }

        function t(e) {
            return e ? (e.curSleepStatus = "1" == e.SleepStatusForSingleChipCpe ? "1" : "2", e) : _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function kr() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "SET_PRIVACY_NOTICE", n.privacy_read_flag = e.privacy_read_flag, n
        }

        function t(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function xr() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "modem_main_state,ppp_status,ipsec_status,RadioOff,puknumber,pinnumber,m_ssid_enable,HideSSID,m_HideSSID,wifi_start_fail,wifi_coverage,NoForwarding,m_NoForwarding,wan_apn,monthly_tx_bytes,monthly_rx_bytes,station_mac,opms_wan_mode,ACL_mode,network_type,ppp_dial_fail_times,RemoteManagement,WANPingFilter,dhcpEnabled,pdp_type,pdp_type_ui,web_wake_switch,upnpEnabled,apn_mode,IPPortFilterEnable,DefaultFirewallPolicy,PortForwardEnable,apn_interface_version,AuthMode,m_AuthMode", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.simCardStatus = e.modem_main_state, t.networkStatus = e.ppp_status, t.wifiSwitch = e.RadioOff, t.puknumber = e.puknumber, t.pinnumber = e.pinnumber, t.m_ssid_enable = e.m_ssid_enable, t.HideSSID = e.HideSSID, t.m_HideSSID = e.m_HideSSID, t.wifiDriverNormal = e.wifi_start_fail, t.wifi_coverage = e.wifi_coverage, t.NoForwarding = e.NoForwarding, t.m_NoForwarding = e.m_NoForwarding, t.wanAPN = e.wan_apn, t.monthlySent = "" == e.monthly_tx_bytes ? 0 : e.monthly_tx_bytes, t.monthlyReceived = "" == e.monthly_rx_bytes ? 0 : e.monthly_rx_bytes, t.curr_connected_devices = e.station_mac && "" != e.station_mac ? e.station_mac.split(";") : [], t.currMode = e.opms_wan_mode, t.networkType = e.network_type, t.ACL_mode = e.ACL_mode, -1 != t.networkType.toLowerCase().indexOf("limited_service") || -1 != t.networkType.toLowerCase().indexOf("limited service") ? t.networkType = "limited_service" : -1 == t.networkType.toLowerCase().indexOf("no_service") && -1 == t.networkType.toLowerCase().indexOf("no service") || (t.networkType = "no_service"), t.remoteFlag = e.RemoteManagement, t.pingFlag = e.WANPingFilter, t.dhcpEnabled = e.dhcpEnabled, t.wifiAwakeSwitch = "" == e.web_wake_switch ? "0" : e.web_wake_switch, t.upnpSwitch = e.upnpEnabled, t.portFilterEnable = e.IPPortFilterEnable, t.defaultPolicy = e.DefaultFirewallPolicy, t.PortForwardEnable = e.PortForwardEnable, t.AuthMode = e.AuthMode, t.m_AuthMode = e.m_AuthMode, t
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Or() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "CHANGE_DEFAULT_WIFI_OR_PASSWORD_REMIND", n.password_remind = "0", n.web_wifi_password_remind = "0", n
        }

        function t(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function Lr() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "USER_IMPROV_SET", n.tr069_user_improv_flag = e.tr069_user_improv_flag, n.tr069_user_improv_notify_flag = "1", n
        }

        function t(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function Ur() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "SIGNAL_QUALITY_DETECT_START", n
        }

        function t(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function Wr() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "SIGNAL_QUALITY_DETECT_CANCEL", n
        }

        function t(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function Vr() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "signal_detect_progress", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.signal_detect_progress = e.signal_detect_progress, t
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Hr() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "signal_detect_quality", n.multi_data = 1, n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.signal_detect_quality = e.signal_detect_quality, t
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Br() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "signal_detect_record_0,signal_detect_record_1,signal_detect_record_2,signal_detect_record_3,signal_detect_record_4,signal_detect_record_5,signal_detect_record_6,signal_detect_record_7,signal_detect_record_8,signal_detect_record_9", n.multi_data = 1, n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Gr() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "SIGNAL_QUALITY_RECORD_ADD", n.index = e.index, n.date = e.date, n.location = e.location, n.quality = e.quality, n
        }

        function t(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function Kr() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "SIGNAL_QUALITY_RECORD_DEL", n.index = e.index, n
        }

        function t(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function zr() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "SIGNAL_QUALITY_RECORD_CLEAR", n
        }

        function t(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function Xr() {
        function e(e, n) {
            return t.extend({
                goformId: "setGuestSsidCloseTimeNew",
                wifi_guest_ssid_active_time: e.guest_ssid_time,
                isTest: si
            }, e)
        }

        function n(e) {
            return e || _i
        }

        return _(arguments, {}, e, n, null, !0)
    }

    function jr() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.cmd = "web_guest_ssid_active_left_time,station_num_ssid2", n.multi_data = "1", n
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.WiFiGuestLeftTime = e.web_guest_ssid_active_left_time, t.station_num_ssid2 = e.station_num_ssid2, t
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function qr() {
        function e(e, t) {
            return {isTest: si, multi_data: "1", cmd: "DIAG_URL,DIAG_CHECK,traceroute_flag"}
        }

        function t(e) {
            return e ? {IpUrl: e.DIAG_URL, CheckPingMode: e.DIAG_CHECK, traceroute_flag: e.traceroute_flag} : _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Yr(e, n) {
        function r(e) {
            return t.extend({isTest: si}, e)
        }

        function i(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, r, i, null, !0)
    }

    function Qr() {
        function e(e, t) {
            return {
                isTest: si,
                multi_data: "1",
                cmd: "reboot_timeframe_hours1,reboot_timeframe_hours2,reboot_dow,reboot_dod,reboot_schedule_enable,reboot_schedule_mode,reboot_hour1,reboot_min1,reboot_hour2,reboot_min2"
            }
        }

        function t(e) {
            return e ? {
                reboot_dow: e.reboot_dow,
                reboot_dod: e.reboot_dod,
                reboot_schedule_enable: e.reboot_schedule_enable,
                reboot_schedule_mode: e.reboot_schedule_mode,
                reboot_hour1: e.reboot_hour1,
                reboot_min1: e.reboot_min1,
                reboot_hour2: e.reboot_hour2,
                reboot_min2: e.reboot_min2,
                reboot_threshold_hours1: e.reboot_timeframe_hours1,
                reboot_threshold_hours2: e.reboot_timeframe_hours2
            } : _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function Zr(e, n) {
        function r(e) {
            return t.extend({isTest: si}, e)
        }

        function i(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, r, i, null, !0)
    }

    function Jr() {
        function e(e, t) {
            return {
                isTest: si,
                cmd: "night_mode_switch,night_mode_start_time,night_mode_end_time,night_mode_close_all_led",
                multi_data: "1"
            }
        }

        function t(e) {
            if (e) {
                if (-1 != e.night_mode_start_time.indexOf(":")) {
                    var t = e.night_mode_start_time.split(":");
                    e.openH = leftInsert(t[0], 2, "0"), e.openM = leftInsert(t[1], 2, "0")
                } else e.openH = "22", e.openM = "00";
                if (-1 != e.night_mode_end_time.indexOf(":")) {
                    var n = e.night_mode_end_time.split(":");
                    e.closeH = leftInsert(n[0], 2, "0"), e.closeM = leftInsert(n[1], 2, "0")
                } else e.closeH = "07", e.closeM = "00";
                return e
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function $r() {
        function e(e, t) {
            var n = {isTest: si, goformId: "SET_DEVICE_LED", night_mode_switch: e.sleepProtectionEnable};
            return "1" == e.sleepProtectionEnable && (n.night_mode_start_time = e.openTime, n.night_mode_end_time = e.closeTime, n.night_mode_close_all_led = e.night_mode_close_all_led), n
        }

        function t(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function ei() {
        function e(e, t) {
            return {isTest: si, cmd: "websURLFiltersWhite"}
        }

        function t(e) {
            var t = [];
            if (e) {
                if (0 == e.websURLFiltersWhite.length) return {urlFilterRules: []};
                for (var n = e.websURLFiltersWhite.split(";"), r = 0; r < n.length; r++) {
                    var i = {};
                    i.index = r, i.url = n[r], t.push(i)
                }
                return {urlFilterRules: t}
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function ti() {
        function e(e, t) {
            var n = {};
            return n.isTest = si, n.goformId = "URL_FILTER_FLAG", n.url_filter_mode = e.url_filter_mode, n
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    function ni() {
        function e(e, t) {
            return {isTest: si, cmd: "url_filter_mode"}
        }

        function t(e) {
            if (e) {
                var t = {};
                return t.urlFlag = e.url_filter_mode, t
            }
            return _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function ri() {
        function e(e, t) {
            return {isTest: si, cmd: "lte_band_lock,wcdma_band_lock", multi_data: "1"}
        }

        function t(e) {
            return e || _i
        }

        return _(arguments, {}, e, t, null, !1)
    }

    function ii() {
        function e(e) {
            return {
                isTest: si,
                goformId: "SET_NETWORK_BAND_LOCK",
                lte_band_lock: e.lockBandType,
                wcdma_band_lock: e.wcdma_band_lock
            }
        }

        function t(e) {
            return e && "success" == e.result ? e : _i
        }

        return _(arguments, {}, e, t, null, !0)
    }

    var oi = window, _i = {errorType: "UnknownError", errorId: "123", errorText: "UnknownError"}, si = n.IS_TEST,
        ai = !0, ui = 0, ci = {
            networkType: "",
            signalImg: "0",
            spn_b1_flag: "1",
            spn_name_data: "",
            spn_b2_flag: "1",
            networkOperator: "",
            connectStatus: "ppp_disconnected",
            attachedDevices: [],
            curr_connected_devices: [],
            data_counter: {
                uploadRate: 0,
                downloadRate: 0,
                totalSent: 0,
                totalReceived: 0,
                totalConnectedTime: 0,
                currentSent: 0,
                currentReceived: 0,
                currentConnectedTime: 0,
                monthlySent: 0,
                monthlyReceived: 0,
                monthlyConnectedTime: 0,
                month: ""
            },
            newSmsReceived: !1,
            smsReportReceived: !1,
            smsUnreadCount: "0",
            isLoggedIn: void 0,
            limitVolumeEnable: !1,
            limitVolumeType: "1",
            limitVolumePercent: "100",
            limitVolumeSize: "0",
            limitVolumeSizeSource: "0",
            allowRoamingUpdate: "0",
            opms_wan_mode: "",
            ap_station_enable: void 0,
            ap_station_mode: void 0,
            dialMode: ""
        },
        di = ["modem_main_state", "pin_status", "opms_wan_mode", "opms_wan_auto_mode", "loginfo", "new_version_state", "current_upgrade_state", "is_mandatory", "wifi_dfs_status", "battery_value", "ppp_dial_conn_fail_counter"],
        li = ["signalbar", "network_type", "network_provider", "opms_wan_auto_mode", "dhcp_wan_status", "ppp_status", "EX_SSID1", "sta_ip_status", "EX_wifi_profile", "m_ssid_enable", "RadioOff", "SSID1", "simcard_roam", "lan_ipaddr", "station_mac", "battery_charging", "battery_vol_percent", "battery_pers", "spn_name_data", "spn_b1_flag", "spn_b2_flag", "realtime_tx_bytes", "realtime_rx_bytes", "realtime_time", "realtime_tx_thrpt", "realtime_rx_thrpt", "monthly_rx_bytes", "monthly_tx_bytes", "monthly_time", "date_month", "data_volume_limit_switch", "data_volume_limit_size", "data_volume_alert_percent", "data_volume_limit_unit", "roam_setting_option", "upg_roam_switch", "ssid", "wifi_enable", "wifi_5g_enable", "check_web_conflict", "dial_mode", "ppp_dial_conn_fail_counter", "wan_lte_ca", "privacy_read_flag", "pppoe_status", "dhcp_wan_status", "static_wan_status", "rj45_state", "mode_main_state", "battery_temp", "battery_customer_mode"];
    n.HAS_SMS && t.merge(li, ["sms_received_flag", "sts_received_flag", "sms_unread_num"]);
    var pi = [], mi = [W];
    return t(document).ready(function () {
        setTimeout(function () {
            D()
        }, n.IS_TEST ? 1e3 : 0)
    }), {
        setLockBandType: ii,
        getLockBandType: ri,
        getUrlFilterFlag: ni,
        setUrlFilterFlag: ti,
        getUrlFilterWhiteList: ei,
        getsleepProtection: Jr,
        saveSleepProtection: $r,
        getRebootInfo: Qr,
        setRebootScheduleFixTime: Zr,
        setGuestWifiTime: Xr,
        getWiFiGuestLeftTime: jr,
        setUserImprovNote: Lr,
        setSkipSetting: Or,
        getSleepModeStatus: Fr,
        setRedirectOff: Cr,
        setBindMacIpSwitch: Dr,
        clearRedirectFlag: mr,
        getRedirectData: pr,
        getSntpDSTByTimeZone: Mr,
        getBindIPInfo: gr,
        setBindIPInfo: fr,
        delStaticAddrRules: vr,
        addStaticAddress: Pr,
        getStaticMacIpAddressList: wr,
        getStaticIpAddrList: Tr,
        getWifiBasic: s,
        setWifiBasic: a,
        setWifiBasic4SSID2: u,
        setWifiBasicMultiSSIDSwitch: c,
        getSecurityInfo: d,
        setSecurityInfo: l,
        getCurrentlyAttachedDevicesInfo: p,
        getAttachedCableDevices: m,
        getLanguage: f,
        setLanguage: g,
        getNetSelectInfo: v,
        setBearerPreference: w,
        scanForNetwork: T,
        getConnectionInfo: P,
        getStatusInfo: S,
        connect: b,
        disconnect: y,
        setNetwork: B,
        getCurrentNetwork: G,
        savePhoneBook: K,
        deletePhoneBooks: X,
        deleteAllPhoneBooks: j,
        deleteAllPhoneBooksByGroup: q,
        getDevicePhoneBooks: $,
        getSIMPhoneBooks: ee,
        getPhoneBooks: te,
        getPhoneBookReady: ne,
        getPhoneBooksByGroup: J,
        getConnectionMode: Q,
        setConnectionMode: Y,
        getApnSettings: E,
        deleteApn: R,
        setDefaultApn: N,
        addOrEditApn: M,
        getSIMPhoneBookCapacity: ie,
        getDevicePhoneBookCapacity: oe,
        getLoginData: _e,
        login: se,
        logout: he,
        getLoginStatus: ae,
        enterPIN: ue,
        enterPUK: ce,
        getSMSReady: Te,
        getSMSMessages: de,
        sendSMS: me,
        saveSMS: fe,
        deleteAllMessages: ge,
        deleteMessage: ve,
        setSmsRead: Se,
        resetNewSmsReceivedVar: h,
        resetSmsReportReceivedVar: I,
        getSMSDeliveryReport: Pe,
        getSmsCapability: A,
        changePassword: Ie,
        getPinData: Ae,
        enablePin: be,
        disablePin: ye,
        changePin: Ee,
        getLanInfo: Re,
        setLanInfo: Ne,
        getSmsSetting: De,
        setSmsSetting: Ce,
        restoreFactorySettings: Fe,
        checkRestoreStatus: ke,
        getWpsInfo: xe,
        openWps: Oe,
        getSleepMode: Le,
        setSleepMode: Ue,
        getSysSecurity: We,
        setSysSecurity: Ve,
        getPortForward: He,
        setPortForward: Be,
        deleteForwardRules: Ge,
        enableVirtualServer: Ke,
        getSDConfiguration: Ye,
        setSdCardMode: Qe,
        checkFileExists: Ze,
        getFileList: Je,
        fileRename: $e,
        getSdMemorySizes: et,
        deleteFilesAndFolders: tt,
        createFolder: nt,
        checkUploadFileStatus: rt,
        setSdCardSharing: it,
        getQuickSettingInfo: ze,
        setQuickSetting: Xe,
        setQuickSetting4IPv6: je,
        getPortFilter: ot,
        setPortFilterBasic: _t,
        setPortFilter: st,
        deleteFilterRules: at,
        getWifiAdvance: ut,
        setWifiAdvance: ct,
        getWifiRange: lt,
        setWifiRange: pt,
        getUpnpSetting: gt,
        setUpnpSetting: vt,
        getDmzSetting: wt,
        setDmzSetting: Tt,
        getDeviceInfo: dt,
        getPortMap: St,
        setPortMap: Pt,
        enablePortMap: ht,
        deleteMapRules: It,
        getTrafficAlertInfo: At,
        setTrafficAlertInfo: bt,
        getDlnaSetting: Nt,
        setDlnaSetting: Mt,
        rescanDlna: Dt,
        getUSSDResponse: yt,
        USSDReplyCancel: Rt,
        getNetworkUnlockTimes: kt,
        unlockNetwork: Ft,
        setUpdateInfoWarning: xt,
        getUpdateInfoWarning: Ot,
        getAPStationBasic: Lt,
        setAPStationBasic: Ut,
        getHotspotList: Vt,
        searchHotspot: Ht,
        getSearchHotspotList: Bt,
        saveHotspot: zt,
        deleteHotspot: Xt,
        connectHotspot: jt,
        disconnectHotspot: qt,
        getOpMode: Yt,
        SetOperationMode: Qt,
        SendUpgradeMessage: Zt,
        getPppoeParams: Jt,
        setPppoeDialMode: $t,
        getSntpParams: en,
        setSntpSetting: nn,
        setSNTPDate: tn,
        addUrlFilterRule: rn,
        getUrlFilterList: on,
        deleteSelectedRules: _n,
        getWdsInfo: sn,
        setWDS: an,
        getSyslogInfo: un,
        setSysLog: cn,
        getTR069Config: dn,
        setTR069Configuration: ln,
        getVoipSettings: pn,
        setVoipSettings: mn,
        getVoipUserDetails: fn,
        getVoipUserRegisterStatus: gn,
        setVoipUserDetails: vn,
        setVoipAdvancedSettings: Tn,
        getVoipAdvancedSettings: wn,
        getVoipSupplementaryService: Sn,
        setVoipSupplementaryService: Pn,
        getMacFilterInfo: hn,
        setMacFilter: In,
        getFastbootSetting: An,
        setFastbootSetting: bn,
        restart: yn,
        shutdown: En,
        timerUpdaterEnable: ai,
        clearTraffic: Gn,
        switchPortForLog: Kn,
        childGroupList: zn,
        addChildGroup: Xn,
        removeChildGroup: jn,
        checkCurrentUserInChildGroup: qn,
        getChildMacRuleInfo: Yn,
        removeChildMacRule: Qn,
        addChildAccessTimeRule: Zn,
        updateChildAccessTimeRule: Jn,
        getCurretnMAC: er,
        editHostName: nr,
        getSiteWhiteList: rr,
        removeSiteWhite: ir,
        saveSiteWhite: or,
        getTimeLimited: _r,
        saveTimeLimited: sr,
        getHostNameList: tr,
        getTsw: ar,
        saveTsw: ur,
        getSysTimeMode: cr,
        trafficCalibration: dr,
        getParams: lr,
        getNewVersionState: Rn,
        getUpgradeResult: Dn,
        getCurrentUpgradeState: Cn,
        dmUpdatePackageExit: Fn,
        setUpgradeSelectOp: On,
        addTimerThings: F,
        removeTimerThings: k,
        getPackSizeInfo: kn,
        getNewVersionInfo: Nn,
        getMandatory: Mn,
        getUserChoice: xn,
        getOTAUpdateSetting: Ln,
        setOTAUpdateSetting: Un,
        getSignalStrength: Hn,
        getOTAlastCheckTime: Wn,
        getOTASuccessTime: Vn,
        clearUpdateResult: Bn,
        getSearchHotspotListWithoutScanFinish: Gt,
        setHotspotListSpan: hr,
        getHotspotListSort: Ir,
        setNV: Ar,
        setWifiBand: br,
        refreshAPStationStatus: Wt,
        getSTKFlagInfo: yr,
        getSTKInfo: Er,
        getSTKMenuInfo: Rr,
        setSTKMenuInfo: Nr,
        getAutoPowerSave: mt,
        setAutoPowerSave: ft,
        getDHCPStaticAddressRules: Sr,
        setMtuMss: Me,
        setHaveReadPrivacyNote: kr,
        diagnosisSettings: xr,
        setSuggestedPositionDetect: Ur,
        setSuggestedPositionCancel: Wr,
        getSuggestedPositionDetectProgress: Vr,
        getSuggestedPositionDetectResult: Hr,
        getSuggestedPositionDetectRecord: Br,
        addSuggestedPositionRecord: Gr,
        deleteSingleSuggestedPositionRecord: Kr,
        deleteAllSuggestedPositionRecord: zr,
        getPinglogInfo: qr,
        setPinglogInfo: Yr
    }
});
//# sourceMappingURL=../sourcemaps/service.js.map
