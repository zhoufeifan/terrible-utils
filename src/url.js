/**
 *
 * @desc 根据参数名获取url中对应的参数值
 * @param  {String} name url 中的参数名
 * @param  {String} url  链接的url地址 www.hahaha.com?name=abc&value=aaa
 * @return {String} g返回链接里的参数值
 */

function getQueryStringRegExp(name,url) {
    url = decodeURIComponent(url);
    //检测name是否是这个链接的参数，并且只出现一次
    if (url.match(new RegExp(`^(.*[?|&]${name}=){1}`, "i"))){
        let result = "";
        url.replace(new RegExp(`[?!&]${name}=(.*)&?`),(match,p1)=>{
            result = p1;
        });
        return result;
    }
    return "";
}
/**
 *
 * @desc   获取url中的所有参数以对象的形式返回
 * @param  {String} url  链接的url地址 www.hahaha.com?name=abc&value=aaa
 * @return {Object} 将链接里的参数以键值对的形式返回
 */

function getUrlParams(url){
    url = url ? url : window.location.href;
    var paramsString = url.replace(/(.+)\?/,""),
        paramsArray = paramsString.split('&'),
        result = {};
    paramsArray.map(function(item){
        var name = item.replace(/(.+)=.+/,"$1");
        var value = window.decodeURIComponent(item.replace(/.+=(.+)/,"$1"));
        result[name] = value;
    });
    return result;
}

module.exports = {
    getQueryStringRegExp,
    getUrlParams
};