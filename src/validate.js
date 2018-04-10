/**
 *
 * @desc   判断是否为邮箱地址
 * @param  {String}  str
 * @return {Boolean}
 */
function isEmail(str) {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
}

/**
 *
 * @desc  判断是否为身份证号
 * @param  {String|Number} str
 * @return {Boolean}
 */
function isIdCard(str) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str);
}

/**
 *
 * @desc   判断是否为手机号
 * @param  {String|Number} str
 * @return {Boolean}
 */
function isPhoneNum(str) {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
}


/**
 *
 * @desc   判断是否为URL地址
 * @param  {String} str
 * @return {Boolean}
 */
function isUrl(str) {
    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
}

/**
 *
 * @desc   判断是否为IP地址
 * @param  {String} str
 * @return {Boolean}
 */
function isIP(str) {
    return /(?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d)/i.test(str);
}

/**
 *
 * @desc   判断是否为金额的格式
 * @param  {String} str
 * @return {Boolean}
 */
function isMoneyAmount(str) {
    return /^(([1-9]{1,9})|0)(\.\d{0,2})?$/.test(str);
}

module.exports = {
    isEmail,
    isIdCard,
    isPhoneNum,    
    isUrl,
    isIP,
    isMoneyAmount,
};