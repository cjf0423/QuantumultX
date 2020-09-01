/ *
自述文件：https：//github.com/yichahucha/surge/tree/master
 * /

const $ tool =新Tool（）
const path1 =“ / amdc / mobileDispatch”
const path2 =“ /gw/mtop.taobao.detail.getdetail”
const consoleLog = false
const url = $ request.url

如果（url.indexOf（path1）！= -1）{
    如果（$ tool.isResponse）{
        const $ base64 =新的Base64（）
        让正文= $ response.body
        让obj = JSON.parse（$ base64.decode（body））
        让dns = obj.dns
        如果（dns && dns.length> 0）{
            让我= dns.length;
            当我 - ） {
                const element = dns [i];
                让主机=“ trade-acs.m.taobao.com”
                如果（element.host == host）{
                    element.ips = []
                    如果（consoleLog）console.log（JSON.stringify（element））
                }
            }
        }
        正文= $ base64.encode（JSON.stringify（obj））
        $ done（{body}）
    }其他{
        让标题= $ request.headers
        让正文= $ request.body
        如果（headers [“ User-Agent”]。indexOf（“％E6％89％8B％E6％9C％BA％E6％B7％98％E5％AE％9D”）！= -1）{
            让json = Qs2Json（body）
            让domain = json.domain.split（“”）
            让我= domain.length;
            当我 - ） {
                const block =“ trade-acs.m.taobao.com”
                const element = domain [i];
                if（element == block）{
                    domain.splice（i，1）;
                }
            }
            json.domain = domain.join（“”）
            正文= Json2Qs（json）
        }
        $ done（{body}）
    }
}

如果（url.indexOf（path2）！= -1）{
    const body = $ response.body
    让obj = JSON.parse（body）
    让item = obj.data.item
    让shareUrl =`https://item.taobao.com/item.htm?id=$ {item.itemId}`
    requestPrice（shareUrl，函数（数据）{
        如果（数据）{
            如果（obj.data.apiStack）{
                让apiStack = obj.data.apiStack [0]
                让值= JSON.parse（apiStack.value）
                让tradeConsumerProtection = null
                让ConsumerProtection = null
                让交易=空
                让vertical = null
                如果（value.global）{
                    tradeConsumerProtection = value.global.data.tradeConsumerProtection
                    ConsumerProtection = value.global.data.consumerProtection
                    交易= value.global.data.trade
                    垂直= value.global.data.vertical
                }其他{
                    tradeConsumerProtection = value.tradeConsumerProtection
                    ConsumerProtection = value.consumerProtection
                    交易=价值。交易
                    垂直=值。垂直
                }
                如果（trade && trade.useWap ==“ true”）{
                    $ done（{body}）
                    sendNotify（data，shareUrl）
                }其他{
                    如果（垂直&& vertical.hasOwnProperty（“ tmallhkDirectSale”））{
                        //如果（value.global）{
                        // value.global.data [“ tradeConsumerProtection”] = customTradeConsumerProtection（）
                        // value.global.data.tradeConsumerProtection = setTradeConsumerProtection（data，value.global.data.tradeConsumerProtection）
                        //}其他{
                        // value [“ tradeConsumerProtection”] = customTradeConsumerProtection（）
                        // value.tradeConsumerProtection = setTradeConsumerProtection（data，value.tradeConsumerProtection）
                        //}
                        $ done（{body}）
                        sendNotify（data，shareUrl）
                    } else if（tradeConsumerProtection）{
                        tradeConsumerProtection = setTradeConsumerProtection（数据，tradeConsumerProtection）
                    }其他{
                        ConsumerProtection = setConsumerProtection（数据，ConsumerProtection）
                    }
                    apiStack.value = JSON.stringify（值）
                    $ done（{body：JSON.stringify（obj）}）
                }
            }其他{
                $ done（{body}）
                sendNotify（data，shareUrl）
            }
        }其他{
            $ done（{body}）
        }
    }）
}

函数sendNotify（data，shareUrl）{
    如果（data.ok == 1 && data.single）{
        constlower = lowerMsgs（data.single）[0]
        const detail = priceSummary（data）[1]
        const tip = data.PriceRemark.Tip +“（适当参考）”
        $ tool.notify（“”，“”，`〽️历史$ {lower} $ {tip} \ n $ {detail} \ n \n👉查看详情：http：//tool.manmanbuy.com/historyLowest.aspx？ url = $ {encodeURI（shareUrl）}`）
    }
    如果（data.ok == 0 && data.msg.length> 0）{
        $ tool.notify（“”，“”，`⚠️$ {data.msg}`）
    }
}

函数setConsumerProtection（data，ConsumerProtection）{
    让basicService = ConsumerProtection.serviceProtection.basicService
    让项目= ConsumerProtection.items
    如果（data.ok == 1 && data.single）{
        const lower = lowerMsgs（data.single）
        const tip = data.PriceRemark.Tip
        const summary = priceSummary（data）[1]
        const item = customItem（lower [1]，[`$ {lower [0]} $ {tip}（足以参考）\ n $ {summary}`]）
        basicService.services.unshift（项目）
        items.unshift（项目）
    }
    如果（data.ok == 0 && data.msg.length> 0）{
        让item = customItem（“暂无历史价格”，[data.msg]）
        basicService.services.unshift（项目）
        items.unshift（项目）
    }
    返回消费者保护
}

函数setTradeConsumerProtection（data，tradeConsumerProtection）{
    让服务= tradeConsumerProtection.tradeConsumerService.service
    如果（data.ok == 1 && data.single）{
        const lower = lowerMsgs（data.single）
        const tip = data.PriceRemark.Tip
        const tbitems = priceSummary（data）[0]
        const item = customItem（lower [1]，`$ {lower [0]} $ {tip}（足以参考）`）
        让nonService = tradeConsumerProtection.tradeConsumerService.nonService
        service.items = service.items.concat（nonService.items）
        nonService.title =“价格详情”
        nonService.items = tbitems
        service.items.unshift（项目）
    }
    如果（data.ok == 0 && data.msg.length> 0）{
        service.items.unshift（customItem（“暂无历史价格”，data.msg））
    }
    退回tradeConsumerProtection
}

函数LowerMsgs（data）{
    const lower = data.lowerPriceyh
    const lowerDate = dateFormat（data.lowerDateyh）
    const lowerMsg =“最低到手价：¥” +字符串（下）+`（$ {lowerDate}）`
    constlowerMsg1 =“历史最低¥” +字符串（较低）
    返回[lowerMsg，lowerMsg1]
}

函数priceSummary（data）{
    让tbitems = []
    让summary =“”
    让listPriceDetail = data.PriceRemark.ListPriceDetail
    listPriceDetail.pop（）
    让列表= listPriceDetail.concat（historySummary（data.single））
    list.forEach（（item，index）=> {
        if（item.Name ==“双11价格”）{
            item.Name =“双十一价格”
        } else if（item.Name ==“ 618价格”）{
            item.Name =“六一八价格”
        } else if（item.Name ==“ 30天最低价”）{
            item.Name =“三十天最低”
        }
        summary + =`\ n $ {item.Name} $ {getSpace（4）} $ {item.Price} $ {getSpace（4）} $ {item.Date} $ {getSpace（4）} $ {item.Diffference }`
        let summaryItem =`$ {item.Name} $ {getSpace（4）} $ {item.Price} $ {getSpace（4）} $ {item.Date} $ {getSpace（4）} $ {item.Difference}`
        tbitems.push（customItem（summaryItem））
    }）
    返回[tbitems，摘要]
}

函数历史记录摘要（单个）{
    const rexMatch = /\[.*?\]/g;
    const rexExec = /\[(.*),(.*),"(.*)"\]/;
    让当前价格，最低60，最低180，最低360
    让列表= single.jiagequshiyh.match（rexMatch）;
    list = list.reverse（）。slice（0，360）;
    list.forEach（（item，index）=> {
        如果（item.length> 0）{
            const结果= rexExec.exec（item）;
            const dateUTC = new Date（eval（result [1]））;
            const date = dateUTC.format（“ yyyy-MM-dd”）;
            设价格= parseFloat（result [2]）;
            如果（索引== 0）{
                currentPrice =价格
                minimum60 = {名称：“六十天最低”，价格：¥¥{String（price）}，日期：日期，差异：差异（currentPrice，价格），价格}
                minimum180 = {名称：“一百八最低”，价格：`¥$ {String（price）}`，日期：date，差异：差异（currentPrice，price），价格}
                minimum360 = {名称：“三百六最低”，价格：¥¥{String（price）}，日期：日期，差异：差异（currentPrice，价格），价格}
            }
            如果（索引<60 &&价格<= lower60.price）{
                lower60.price =价格
                lower60.Price =`¥$ {String（price）}`
                最低60.日期=日期
                最低60.差异=差异（currentPrice，price）
            }
            如果（索引<180 &&价格<= lower180.price）{
                minimum180.price =价格
                minimum180.Price =`¥$ {String（price）}`
                180.Date =日期
                最低180.差异=差异（currentPrice，price）
            }
            如果（索引<360 &&价格<= minimum360.price）{
                minimum360.price =价格
                minimum360.Price =`¥$ {String（price）}`
                360.Date =日期
                lower360.Difference =差异（currentPrice，价格）
            }
        }
    }）;
    返回[lowest60，lower180，lowest360]；
}

函数差（currentPrice，价格）{
    让差=子（currentPrice，价格）
    如果（差异== 0）{
        返回“-”
    }其他{
        返回`$ {difference> 0？“↑”：“↓”} $ {String（difference）}`
    }
}

函数sub（arg1，arg2）{
    返回add（arg1，-Number（arg2），arguments [2]）;
}

函数add（arg1，arg2）{
    arg1 = arg1.toString（），arg2 = arg2.toString（）;
    var arg1Arr = arg1.split（“。”），arg2Arr = arg2.split（“。”），d1 = arg1Arr.length == 2？arg1Arr [1]：“”，d2 = arg2Arr.length == 2？arg2Arr [1]：“”;
    var maxLen = Math.max（d1.length，d2.length）;
    var m = Math.pow（10，maxLen）;
    var result = Number（（（（arg1 * m + arg2 * m）/ m）.toFixed（maxLen））;
    var d = arguments [2];
    返回typeof d ===“数字”吗？Number（（result）.toFixed（d））：结果;
}

函数requestPrice（share_url，callback）{
    const options = {
        网址：“ https://apapia-history.manmanbuy.com/ChromeWidgetServices/WidgetServices.ashx”，
        标头：{
            “ Content-Type”：“ application / x-www-form-urlencoded; charset = utf-8”，
            “用户代理”：“ Mozilla / 5.0（iPhone； CPU iPhone OS 13_1_3，例如Mac OS X）AppleWebKit / 605.1.15（KHTML，例如Gecko）移动/ 15E148-mmbWebBrowse-ios”
        }，
        正文：“ methodName = getHistoryTrend＆p_url =” + encodeURIComponent（share_url）
    }
    $ tool.post（选项，函数（错误，响应，数据）{
        如果（！错误）{
            callback（JSON.parse（data））;
            如果（consoleLog）console.log（“ Data：\ n” + data）;
        }其他{
            callback（null，null）;
            如果（consoleLog）console.log（“错误：\ n” +错误）；
        }
    }）
}

函数dateFormat（cellval）{
    const date = new Date（parseInt（cellval.replace（“ / Date（”，“”）.replace（“）/”，“”），10））;
    const month = date.getMonth（）+ 1 <10吗？“ 0” +（date.getMonth（）+1）：date.getMonth（）+1;
    const currentDate = date.getDate（）<10吗？“ 0” + date.getDate（）：date.getDate（）;
    返回date.getFullYear（）+“-” +月+“-” + currentDate;
}

函数getSpace（length）{
    让blank =“”;
    for（让index = 0; index <length; index ++）{
        空白+ =“”;
    }
    返回空白；
}

函数customItem（title，desc）{
    返回{
        图标：“ https://s2.ax1x.com/2020/02/16/3STeIJ.png”，
        标题：标题，
        名称：标题，
        desc：desc
    }
}

函数customTradeConsumerProtection（）{
    返回{
        “ tradeConsumerService”：{
            “服务”：{
                “项目”：[
                ]，
                “ icon”：“”，
                标题：基础服务
            }，
            “ nonService”：{
                “项目”：[
                ]，
                “ title”：“其他”
            }
        }，
        “ passValue”：“全部”，
        “ url”：“ https://h5.m.taobao.com/app/detailsubpage/consumer/index.js”，
        “ type”：“ 0”
    }
}

函数Qs2Json（url）{
    var search = url.substring（url.lastIndexOf（“？”）+1）;
    var obj = {};
    var reg = /（[[^？＆=] +）=（[^？＆=] *）/ g;
    search.replace（reg，function（rs，$ 1，$ 2）{
        var name =解码URIComponent（$ 1）;
        var val = encodeURIComponent（$ 2）;
        val = String（val）;
        obj [name] = val;
        返回rs；
    }）;
    返回obj;
}

函数Json2Qs（json）{
    var temp = [];
    用于（json中的var k）{
        temp.push（k +“ =” + json [k]）;
    }
    返回temp.join（“＆”）;
}

Array.prototype.insert =函数（索引，项目）{
    this.splice（index，0，item）;
};

Date.prototype.format =函数（fmt）{
    var o = {
        “ y +”：this.getFullYear（），
        “ M +”：this.getMonth（）+ 1
        “ d +”：this.getDate（），
        “ h +”：this.getHours（），
        “ m +”：this.getMinutes（），
        “ s +”：this.getSeconds（），
        “ q +”：Math.floor（（this.getMonth（）+ 3）/ 3），
        “ S +”：this.getMilliseconds（）
    };
    对于（var k in o）{
        if（new RegExp（“（” + k +“）”）。test（fmt））{
            如果（k ==“ y +”）{
                fmt = fmt.replace（RegExp。$ 1，（“” + o [k]）。substr（4-RegExp。$ 1.length））;
            }
            否则（k ==“ S +”）{
                var lens = RegExp。$ 1.length;
                镜片=镜片== 1？3：镜头；
                fmt = fmt.replace（RegExp。$ 1，（“ 00” + o [k]）。substr（（“” + o [k]）。length-1，lens））;
            }
            其他{
                fmt = fmt.replace（RegExp。$ 1，（RegExp。$ 1.length == 1）？（o [k]）：（（“” 00“ + o [k]）。substr（（”“ + o [k] ）。长度）））;
            }
        }
    }
    返回fmt;
}

函数Tool（）{
    _node =（（）=> {
        if（typeof require ==“ function”）{
            const request = require（'request'）
            返回（{请求}）
        }其他{
            返回（空）
        }
    }）（）
    _isSurge = typeof $ httpClient！=“未定义”
    _isQuanX = typeof $ task！=“未定义”
    this.isSurge = _isSurge
    this.isQuanX = _isQuanX
    this.isResponse = typeof $ response！=“未定义”
    this.notify =（标题，字幕，消息）=> {
        如果（_isQuanX）$ notify（标题，副标题，消息）
        如果（_isSurge）$ notification.post（标题，副标题，消息）
        如果（_node）console.log（JSON.stringify（{title，subtitle，message}））;
    }
    this.write =（值，键）=> {
        如果（_isQuanX）返回$ prefs.setValueForKey（值，键）
        如果（_isSurge）返回$ persistentStore.write（值，键）
    }
    this.read =（key）=> {
        如果（_isQuanX）返回$ prefs.valueForKey（key）
        如果（_isSurge）返回$ persistentStore.read（key）
    }
    this.get =（选项，回调）=> {
        如果（_isQuanX）{
            if（typeof options ==“ string”）options = {url：options}
            options [“方法”] =“获取”
            $ task.fetch（options）.then（response => {callback（null，_status（response），response.body）}，原因=> callback（reason.error，null，null））
        }
        如果（_isSurge）$ httpClient.get（选项，（错误，响应，正文）=> {回调（错误，_status（响应），正文）}）
        如果（_node）_node.request（选项，（错误，响应，正文）=> {回调（错误，_status（响应），正文）}）
    }
    this.post =（选项，回调）=> {
        如果（_isQuanX）{
            if（typeof options ==“ string”）options = {url：options}
            options [“方法”] =“开机自检”
            $ task.fetch（options）.then（response => {callback（null，_status（response），response.body）}，原因=> callback（reason.error，null，null））
        }
        如果（_isSurge）$ httpClient.post（options，（error，response，body）=> {callback（error，_status（response），body）}）
        如果（_node）_node.request.post（选项，（错误，响应，正文）=> {回调（错误，_status（响应），正文）}）
    }
    _status =（响应）=> {
        如果（回应）{
            如果（response.status）{
                response [“ statusCode”] = response.status
            }否则，如果（response.statusCode）{
                response [“ status”] = response.statusCode
            }
        }
        返回响应
    }
}

函数Base64（）{
    // 私人财产
    _keyStr =“ ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 + / =”
    //编码的公共方法
    this.encode =函数（输入）{
        var output =“”;
        var chr1，chr2，chr3，enc1，enc2，enc3，enc4;
        var i = 0;
        输入= _utf8_encode（输入）;
        而（i <input.length）{
            chr1 = input.charCodeAt（i ++）;
            chr2 = input.charCodeAt（i ++）;
            chr3 = input.charCodeAt（i ++）;
            enc1 = chr1 >> 2;
            enc2 =（（chr1＆3）<< 4）| （chr2 >> 4）;
            enc3 =（（chr2＆15）<< 2）| （chr3 >> 6）;
            enc4 = chr3＆63;
            如果（isNaN（chr2））{
                enc3 = enc4 = 64;
            } else if（isNaN（chr3））{
                enc4 = 64;
            }
            输出=输出+
                _keyStr.charAt（enc1）+ _keyStr.charAt（enc2）+
                _keyStr.charAt（enc3）+ _keyStr.charAt（enc4）;
        }
        返回输出；
    }
    //解码的公共方法
    this.decode =函数（输入）{
        var output =“”;
        var chr1，chr2，chr3;
        var enc1，enc2，enc3，enc4;
        var i = 0;
        输入= input.replace（/ [^ A-Za-z0-9 \ + \ / \ =] / g，“”）;
        而（i <input.length）{
            enc1 = _keyStr.indexOf（input.charAt（i ++））;
            enc2 = _keyStr.indexOf（input.charAt（i ++））;
            enc3 = _keyStr.indexOf（input.charAt（i ++））;
            enc4 = _keyStr.indexOf（input.charAt（i ++））;
            chr1 =（enc1 << 2）| （enc2 >> 4）;
            chr2 =（（enc2＆15）<< 4）| （enc3 >> 2）;
            chr3 =（（enc3＆3）<< 6）| enc4;
            输出=输出+ String.fromCharCode（chr1）;
            如果（enc3！= 64）{
                输出=输出+ String.fromCharCode（chr2）;
            }
            如果（enc4！= 64）{
                输出=输出+ String.fromCharCode（chr3）;
            }
        }
        输出= _utf8_decode（输出）;
        返回输出；
    }
    //用于UTF-8编码的私有方法
    _utf8_encode =函数（字符串）{
        字符串= string.replace（/ \ r \ n / g，“ \ n”）;
        var utftext =“”;
        for（var n = 0; n <string.length; n ++）{
            var c = string.charCodeAt（n）;
            如果（c <128）{
                utftext + = String.fromCharCode（c）;
            } else if（（（c> 127）&&（c <2048））{
                utftext + = String.fromCharCode（（c >> 6）| 192）;
                utftext + = String.fromCharCode（（c＆63）| 128）;
            }其他{
                utftext + = String.fromCharCode（（c >> 12）| 224）;
                utftext + = String.fromCharCode（（（（c >> 6）＆63）| 128）;
                utftext + = String.fromCharCode（（c＆63）| 128）;
            }

        }
        返回utftext;
    }
    //用于UTF-8解码的私有方法
    _utf8_decode =函数（utftext）{
        var string =“”;
        var i = 0;
        var c = c1 = c2 = 0;
        而（i <utftext.length）{
            c = utftext.charCodeAt（i）;
            如果（c <128）{
                字符串+ = String.fromCharCode（c）;
                i ++;
            } else if（（（c> 191）&&（c <224））{
                c2 = utftext.charCodeAt（i + 1）;
                字符串+ = String.fromCharCode（（（（c＆31）<< << 6）|（c2＆63）））;
                我+ = 2;
            }其他{
                c2 = utftext.charCodeAt（i + 1）;
                c3 = utftext.charCodeAt（i + 2）;
                字符串+ = String.fromCharCode（（（（c＆15）<< 12）|（（c2＆63）<< 6）|（c3＆63））;
                我+ = 3;
            }
        }
        返回字符串；
    }
}
