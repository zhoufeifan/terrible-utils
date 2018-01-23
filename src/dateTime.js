/**
 *
 * @desc 时间格式化
 * @param  {Date} dateTime 时间值
 * @param  {String} fmtStr 格式 例如）
 * 整体思路：根据正则表达是替换fmtStr中的匹配字符 例如以年份替换连续的'Y'
 * @return {String} 以字符串的形式返回日期
 */

function dateTimeFormat(dateTime, fmtStr = "YYYY-MM-DD") {
    if (!dateTime) dateTime = new Date();
    let result = fmtStr;
    let dateValueMap = {
        Y: dateTime.getFullYear(),
        M: dateTime.getMonth() + 1,
        D: dateTime.getDate(),
        h: dateTime.getHours(),
        m: dateTime.getMinutes(),
        s: dateTime.getSeconds()
    };
    let markArray = ['Y', 'M', 'D', 'h', 'm', 's'];
    markArray.map(function (item) {
        if (~fmtStr.indexOf(item)) {
            let rep = new RegExp("(" + item + "+" + ")");
            // rep = /(Y+)/
            result = result.replace(rep, function (match) {
                if (!match)
                    return "";
                // 如果有2个占位符的话就要补0，如：2012-09-09
                return match.length === 2 ? dateValueMap[item].toString().padStart(2, "0") : dateValueMap[item];
            });
        }
    });
    return result;
}

/**
 *
 * @desc 根据当前日期和偏移量获取新的日期
 * @param  {Number} offset 偏移量
 * @param  {String} type 偏移的类型 year, month, day, hours, minutes, seconds
 * @param  {Date} dateTime 初始的时间值
 * @return {Date} 以字符串的形式返回日期
 */
function getOffsetDateTime(offset, type, dateTime) {
    if (!dateTime) dateTime = new Date();
    switch (type) {
        case 'year':
            dateTime.setFullYear(dateTime.getFullYear() + offset);
            break;
        case 'month':
            dateTime.setMonth(dateTime.getMonth() + offset);
            break;
        case 'day':
            dateTime.setDate(dateTime.getDate() + offset);
            break;
        case 'hours':
            dateTime.setHours(dateTime.getHours() + offset);
            break;
        case 'minutes':
            dateTime.setMinutes(dateTime.getMinutes() + offset);
            break;
        case 'seconds':
            dateTime.setSeconds(dateTime.getSeconds() + offset);
            break;
        default:
            break;
    }
    return dateTime;
}

/**
 * @desc   计算现在时间相对于{targetTime}已过的时间
 * @param  {Date} targetTime 参考的时间
 * @return {String}
 */
function formatPassTime(targetTime) {
    // 根据相差的秒数来换算出当前相差的时间
    let currentTime = Date.parse(new Date());
    let time = currentTime - targetTime;
    let isBefore = time > 0;
    time = time > 0 ? time : time * -1;
    let day = parseInt(time / (1000 * 60 * 60 * 24)),
        hour = parseInt(time / (1000 * 60 * 60)),
        min = parseInt(time / (1000 * 60)),
        month = parseInt(day / 30),
        year = parseInt(month / 12);
    if (year) return `${year}年${isBefore ? "前" : "后"}`;
    if (month) return `${month}个月${isBefore ? "前" : "后"}`;
    if (day) return `${day}天${isBefore ? "前" : "后"}`;
    if (hour) return `${hour}小时${isBefore ? "前" : "后"}`;
    if (min) return `${min}分钟${isBefore ? "前" : "后"}`;
    else return `${isBefore ? '刚刚' : '马上'}`;
}


/**
 *
 * @desc   格式化现在距{deadline}的剩余时间
 * @param  {string} deadline 截止日期 "2012-12-20"
 * @return {String}
 */
function formatRemainTime(deadline) {
    let startDate = new Date(); //开始时间
    let endDate = new Date(deadline); //结束时间
    let t = endDate.getTime() - startDate.getTime(); //时间差
    let d = 0,
        h = 0,
        m = 0,
        s = 0;
    if (t >= 0) {
        d = Math.floor(t / 1000 / 3600 / 24);
        h = Math.floor(t / 1000 / 60 / 60 % 24);
        m = Math.floor(t / 1000 / 60 % 60);
        s = Math.floor(t / 1000 % 60);
    }
    return d + "天 " + h + "小时 " + m + "分钟 " + s + "秒";
}


module.exports = {
    dateTimeFormat,
    getOffsetDateTime,
    formatPassTime,
    formatRemainTime
};
