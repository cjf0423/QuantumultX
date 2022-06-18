module.exports = {
    "id": "elmapp",
    "name": "饿了么",
    "keys": ["elmbody", ],
    "author": "@ziye",
    "settings": [{
        "id": "elmSuffix",
        "name": "当前账号",
        "val": "1",
        "type": "number",
        "desc": "当前抓取ck记录的账号序号，如：1、2、3、"
    }, {
        "id": "elmCount",
        "name": "账号个数",
        "val": "1",
        "type": "number",
        "desc": "指定任务最多跑几个账号，根据抓取的账号数据个数来设值"
    }, {
        "id": "elmXH",
        "name": "循环获取CK",
        "val": "1",
        "type": "number",
        "desc": "关闭 1开启,默认关闭"
    }, {
        "id": "elmTX",
        "name": "超级会员兑换红包",
        "val": "10",
        "type": "number",
        "desc": "关闭 设置1自动兑换,设置10只兑换10"
    }, {
        "id": "elmXYZ",
        "name": "下单任务是否执行",
        "val": "100",
        "type": "number",
        "desc": "0不执行 100执行,默认100"
    }, {
        "id": "elmRW",
        "name": "其他任务是否执行",
        "val": "1",
        "type": "number",
        "desc": "0不执行,1执行，2强制执行，默认0"
    }, {
        "id": "elmSM",
        "name": "其他任务执行方式",
        "val": "0",
        "type": "number",
        "desc": "0立刻执行,1扫描执行,默认0"
    }, {
        "id": "elmHBTZ",
        "name": "红包通知",
        "val": "30&3",
        "type": "number",
        "desc": "格式 30&3 表示门槛小于等于30 红包大于等于3   默认100不通知"
    }, {
        "id": "elmYS",
        "name": "请求延时",
        "val": "100",
        "type": "number",
        "desc": "1000等于1秒 默认100 "
    }, {
        "id": "elmntfst",
        "name": "推送控制",
        "val": "0",
        "type": "number",
        "desc": "关闭，1推送,默认12点以及23点推送"
    }, {
        "id": "elmmsgst",
        "name": "通知控制",
        "val": "0",
        "type": "number",
        "desc": "关闭，1为 所有通知，2为 12，23 点通知，3为 6，12，18，23 点通知 "
    }, {
        "id": "elmmsgm",
        "name": "推送-通知 分钟控制",
        "val": "59",
        "type": "number",
        "desc": "推送以及通知控制在什么分钟段，可设置0-59,默认0到10"
    }],
    "repo": "https://cdn.jsdelivr.net/gh/ziye888/JavaScript@main/Task/elm.js",
    "icons": ["https://cdn.jsdelivr.net/gh/ziye888/JavaScript@main/Task/elm.png", "https://cdn.jsdelivr.net/gh/ziye888/JavaScript@main/Task/elm.png"],
    "script": "https://cdn.jsdelivr.net/gh/ziye888/JavaScript@main/Task/elm.js",
    "icon": "https://cdn.jsdelivr.net/gh/ziye888/JavaScript@main/Task/elm.png",
    "favIcon": "mdi-star",
    "favIconColor": "primary",
    "datas": [{
        "key": "elmbody",
        "val": "SID=XXXXXXXXXXXXXX;USERID=2222222222;longitude=111.11111111234;latitude=22.2222222222;"
    }, {
        "key": "elmbody2",
        "val": ""
    }, {
        "key": "elmbody3",
        "val": ""
    }, {
        "key": "elmbody4",
        "val": ""
    }],
    "sessions": [],
    "isLoaded": true
}