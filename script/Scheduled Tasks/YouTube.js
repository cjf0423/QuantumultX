/*
此为YouTube去广告的脚本
Surge的使用方式
[Script]
# 如果您是 YouTube Premium，请不要开启此模块。
YouTube去广告 = type=http-request,pattern=^https?:\/\/.+?\.googlevideo\.com\/.+&(oad|ctier)=(?!A),script-path=https://choler.github.io/Surge/Script/YouTube.js,script-update-interval=0

[MITM]
hostname = *.googlevideo.com

*/
if ($request.url.indexOf("&oad") != -1) {
  $done({ response: {body: ""} });
} else if ($request.url.indexOf("&ctier") != -1) {
  let url = $request.url.replace(/ctier=[A-Z]/, "ctier=A");
  $done({ response: { status: 302, headers: { Location: url } } });
} else {
  $done({})
}