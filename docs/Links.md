# ZTE MF295N / Links

## Command

```bash
cat src/js/config/cpe/MF283U/menu_4ggateway.js \
| grep -i hash \
| sed 's/: "/https:\/\/192.168.1.1\/index.html/g' \
| grep -o 'http.*"' \
| cut -d '"' -f1
```

Replace `192.168.1.1` with the router's IP address.

---

Hidden pages are in **bold**.
Removed pages are in ~~strikethrough~~.

- https://192.168.1.1/index.html#login
- https://192.168.1.1/index.html#key_log
- https://192.168.1.1/index.html#user_improv_switch
- **https://192.168.1.1/index.html#ussd**
- ~~https://192.168.1.1/index.html#change_password~~ (redirects to home page)
- https://192.168.1.1/index.html#home
- **https://192.168.1.1/index.html#status**
- https://192.168.1.1/index.html#sms
- https://192.168.1.1/index.html#phonebook
- https://192.168.1.1/index.html#parental_control
- https://192.168.1.1/index.html#setting
- **https://192.168.1.1/index.html#suggested_position**
- https://192.168.1.1/index.html#internet_setting
- https://192.168.1.1/index.html#net_setting
- https://192.168.1.1/index.html#wifi
- https://192.168.1.1/index.html#device_setting
- https://192.168.1.1/index.html#firewall
- https://192.168.1.1/index.html#router_setting
- https://192.168.1.1/index.html#bind_addr_lan
- **https://192.168.1.1/index.html#group_all**
- **https://192.168.1.1/index.html#group_common**
- **https://192.168.1.1/index.html#group_family**
- **https://192.168.1.1/index.html#group_friend**
- **https://192.168.1.1/index.html#group_colleague**
- **https://192.168.1.1/index.html#device_info** (same as [#status](https://192.168.1.1/index.html#status))
- https://192.168.1.1/index.html#traffic_statistics
- https://192.168.1.1/index.html#traffic_alert
- https://192.168.1.1/index.html#smslist
- https://192.168.1.1/index.html#sim_messages
- https://192.168.1.1/index.html#sms_setting
- https://192.168.1.1/index.html#voip_setting
- https://192.168.1.1/index.html#user_details
- https://192.168.1.1/index.html#supplement_service
- https://192.168.1.1/index.html#voip_settings
- https://192.168.1.1/index.html#voip_advanced_settings
- https://192.168.1.1/index.html#dial_setting
- https://192.168.1.1/index.html#net_select
- https://192.168.1.1/index.html#apn_setting
- https://192.168.1.1/index.html#wifi_basic
- https://192.168.1.1/index.html#wifi_main
- https://192.168.1.1/index.html#wifi_guest
- https://192.168.1.1/index.html#station_info
- https://192.168.1.1/index.html#wifi_advance
- https://192.168.1.1/index.html#black_list
- https://192.168.1.1/index.html#wps
- https://192.168.1.1/index.html#password_management
- https://192.168.1.1/index.html#pin_management
- https://192.168.1.1/index.html#restore
- https://192.168.1.1/index.html#restart
- https://192.168.1.1/index.html#network_info
- https://192.168.1.1/index.html#diagnosis
- https://192.168.1.1/index.html#SNTP
- **https://192.168.1.1/index.html#sys_log**
- **https://192.168.1.1/index.html#tr069config**
- https://192.168.1.1/index.html#port_filter
- https://192.168.1.1/index.html#port_forward
- https://192.168.1.1/index.html#url_filter
- https://192.168.1.1/index.html#system_security
- https://192.168.1.1/index.html#upnp
- https://192.168.1.1/index.html#dmz
- https://192.168.1.1/index.html#sleep_mode
- https://192.168.1.1/index.html#others
- https://192.168.1.1/index.html#pc_children_group
- https://192.168.1.1/index.html#pc_time_limited
- https://192.168.1.1/index.html#ota_update
- https://192.168.1.1/index.html#ping_log
- https://192.168.1.1/index.html#restart_schedule
- https://192.168.1.1/index.html#lock_band