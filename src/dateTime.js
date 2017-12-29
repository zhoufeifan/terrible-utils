/**
 * 
 * @desc 时间格式化
 * @param  {Date} dateTime 时间值
 * @param  {String} fmtStr 格式 例如）
 * 整体思路：根据正则表达是替换fmtStr中的匹配字符 例如以年份替换连续的'Y'
 * @return {String} 以字符串的形式返回日期 
 */

function dateTimeFormat(dateTime,fmtStr){
    if(!dateTime)dateTime = new Date();
    var result = fmtStr || "YYYY-MM-DD";
    var dateValueMap = {
        Y: dateTime.getFullYear(),
        M: dateTime.getMonth() + 1,
        D: dateTime.getDate(),
        h: dateTime.getHours(),
        m: dateTime.getMinutes(),
        s: dateTime.getSeconds()
    }
    var markArray = ['Y','M','D','h','m','s'];
    markArray.map(function(item){
        if(~fmtStr.indexOf(item)){
            var rep = new RegExp("("+item+"+"+")"); 
            // rep = /(Y+)/
            result = result.replace(rep,function(match){
                if(!match) 
                    return "";
                    // 如果有2个占位符的话就要补0，如：2012-09-09
                return match.length === 2 ? dateValueMap[item].toString().padStart(2,"0") : dateValueMap[item];
            });
        }
    });
    console.log(result);
    return result;
}