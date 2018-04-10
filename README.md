# terrible-utils 使用文档
说明：在平时编写业务代码是常用到的一些工具类函数
使用方式：
```
  import {amount} from 'terrible-utils';
  const {parseCentToYuan} = amount;
  console.log(parseCentToYuan(200)); //2
```
## 目录
- [1. amount](amount)
  - [1.1 parseCentToYuan](parseCentToYuan)
  - [1.2 parseYuanToCent](parseYuanToCent)
  - [1.3 formatYuan](formatYuan)

- [2. dateTime](dateTime)
  - [2.1 dateTimeFormat](dateTimeFormat)
  - [2.2 getOffsetDateTime](getOffsetDateTime)
  - [2.3 formatPassTime](formatPassTime)

- [3. device](device)
  - [3.1 getExplore](getExplore)
  - [3.2 getOS](getOS)
  - [3.3 isWeichat](isWeichat)
  - [3.4 isAlipay](isAlipay)

- [4. keyCode](keyCode)
  - [4.1 getKeyName](getKeyName)

- [5. object](object)
  - [5.1 isEmptyObject](isEmptyObject)
  - [5.2 deepClone](deepClone)

- [6. url](url)
	- [6.1 getQueryStringRegExp](getQueryStringRegExp)
	- [6.2 urlParamsToObject](urlParamsToObject)
	- [6.3 objectToUrlParams](objectToUrlParams)
	
- [7. validate](validate)
	- [7.1 isEmail](isEmail)
	- [7.2 isIdCard](isIdCard)
	- [7.3 isPhoneNum](isPhoneNum)
	- [7.4 isUrl](isUrl)
	- [7.5 isIP](isIP)
	- [7.6 isMoneyAmount](isMoneyAmount)
	
- [其他](other)
   - [throttle](throttle)
   
## <a name="amount">1. amount</a>
### <a name="parseCentToYuan">1.1 parseCentToYuan</a> 
```
   /**
 * 
 * @desc 金额分转元
 * @param  {Number} amount 金额值（单位：分）
 * @return {Number} 
 */
function parseCentToYuan(amount){
    if(typeof amount === "number"){
       return (amount/100).toFixed(2);
    }else if(typeof amount === "string"){
       return (Number(amount)/100).toFixed(2);
    }
    console.warn('参数错误');
    return 0;
}
```
### <a name="parseYuanToCent">1.2 parseYuanToCent</a>
```
/**
 * 
 * @desc 金额分转元
 * @param  {Number} amount 金额值（单位：分）
 * @return {Number} 
 */
function parseCentToYuan(amount){
    if(typeof amount === "number"){
       return (amount/100).toFixed(2);
    }else if(typeof amount === "string"){
       return (Number(amount)/100).toFixed(2);
    }
    console.warn('参数错误');
    return 0;
}
```
### <a name="formatYuan">1.3 formatYuan</a> 
   ```
   /**
 * 
 * @desc 金额元转分
 * @param  {Number} amount 金额值（单位：元）
 * 正常的思路：从右边开始数，每次数3位数字，如果左边还要数字，就添加一个逗号。
 * 不过正则表达式总是从左到右开始工作的
 * 因此可以进行思路转换：逗号应该加在『左边有数字，右边的数字正好是3的倍数的位置上』。
 * @return {Number} 
 */

function formatYuan(amount){
    amount+="";
    return amount.replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1,');
}

   ```
   
## <a name="dateTime">2. dateTime</a>
### <a name="dateTimeFormat">2.1 dateTimeFormat</a> 
 
```
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
```

### <a name="getOffsetDateTime">2.2 getOffsetDateTime</a> 
 ```
 /**
 *
 * @desc 根据初始日期和偏移量获取新的日期
 * @param  {Number} offset 偏移量
 * @param  {String} type 偏移的类型 year, month, day, hours, minutes, seconds
 * @param  {Date} dateTime 初始的时间值
 * @return {Date} 以字符串的形式返回日期
 */
function getOffsetDateTime(offset = 0, type="day", dateTime) {
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
```

### <a name="formatPassTime">2.3 formatPassTime</a> 
```
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
```
### <a name="formatRemainTime">2.4 formatRemainTime</a> 
```
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
```

## <a name="device">3. device</a>
### <a name="getExplore">3.1 getExplore</a> 
```
/**
 * 
 * @desc 获取浏览器类型和版本
 * @return {String} 
 */
function getExplore() {
    let sys = {},
        ua = navigator.userAgent.toLowerCase(),
        s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]:
        (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] :
        (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] :
        (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] :
        (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] :
        (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] :
        (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
    // 根据关系进行判断
    if (sys.ie) return ('IE: ' + sys.ie)
    if (sys.edge) return ('EDGE: ' + sys.edge)
    if (sys.firefox) return ('Firefox: ' + sys.firefox)
    if (sys.chrome) return ('Chrome: ' + sys.chrome)
    if (sys.opera) return ('Opera: ' + sys.opera)
    if (sys.safari) return ('Safari: ' + sys.safari)
    return 'Unkonwn'
}
```
### <a name="getOS">3.2 getOS</a>
```
/**
 * 
 * @desc 获取操作系统类型
 * @return {String} 
 */
function getOS() {
    let userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
    let vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
    let appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

    if (/mac/i.test(appVersion)) return 'MacOSX'
    if (/win/i.test(appVersion)) return 'windows'
    if (/linux/i.test(appVersion)) return 'linux'
    if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) 'ios'
    if (/android/i.test(userAgent)) return 'android'
    if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone'
}
```
### <a name="isWeichat">3.3 isWeichat</a>
```
/**
 * 
 * @desc 判断网页是否在微信的webView中运行
 * @return {Boolean} 
 */
function isWeichat() {
    return !!navigator.userAgent.toLowerCase().match(/MicroMessenger/i);
    return false;
}
```
### <a name="isAlipay">3.4 isAlipay</a>
```
/**
 * 
 * @desc 判断网页是否在支付宝的webView中运行
 * @return {Boolean} 
 */
function isAlipay() {
    return !!navigator.userAgent.toLowerCase().match(/AlipayClient/i);
}
```

## <a name="keycode">4. keycode</a>
### <a name="isEmptyObject">4.1 isEmptyObject</a> 
   ```
   let keyCodeMap = {
    8: 'Backspace',
    9: 'Tab',
    13: 'Enter',
    16: 'Shift',
    17: 'Ctrl',
    18: 'Alt',
    19: 'Pause',
    20: 'Caps Lock',
    27: 'Escape',
    32: 'Space',
    33: 'Page Up',
    34: 'Page Down',
    35: 'End',
    36: 'Home',
    37: 'Left',
    38: 'Up',
    39: 'Right',
    40: 'Down',
    42: 'Print Screen',
    45: 'Insert',
    46: 'Delete',

    48: '0',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',

    65: 'A',
    66: 'B',
    67: 'C',
    68: 'D',
    69: 'E',
    70: 'F',
    71: 'G',
    72: 'H',
    73: 'I',
    74: 'J',
    75: 'K',
    76: 'L',
    77: 'M',
    78: 'N',
    79: 'O',
    80: 'P',
    81: 'Q',
    82: 'R',
    83: 'S',
    84: 'T',
    85: 'U',
    86: 'V',
    87: 'W',
    88: 'X',
    89: 'Y',
    90: 'Z',

    91: 'Windows',
    93: 'Right Click',

    96: 'Numpad 0',
    97: 'Numpad 1',
    98: 'Numpad 2',
    99: 'Numpad 3',
    100: 'Numpad 4',
    101: 'Numpad 5',
    102: 'Numpad 6',
    103: 'Numpad 7',
    104: 'Numpad 8',
    105: 'Numpad 9',
    106: 'Numpad *',
    107: 'Numpad +',
    109: 'Numpad -',
    110: 'Numpad .',
    111: 'Numpad /',

    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',

    144: 'Num Lock',
    145: 'Scroll Lock',
    182: 'My Computer',
    183: 'My Calculator',
    186: ';',
    187: '=',
    188: ',',
    189: '-',
    190: '.',
    191: '/',
    192: '`',
    219: '[',
    220: '\\',
    221: ']',
    222: '\''
};
/**
 * @desc 根据keycode获得键名
 * @param  {Number} keycode
 * @return {String}
 */
function getKeyName(keycode) {
    if (keyCodeMap[keycode]) {
        return keyCodeMap[keycode];
    } else {
        console.log('Unknow Key(Key Code:' + keycode + ')');
        return '';
    }
};
```
---

## <a name="object">5. object</a>
### <a name="isEmptyObject">5.1 isEmptyObject</a> 
```
/**
 *
 * @desc   判断`obj`是否为空
 * @param  {Object} obj
 * @return {Boolean}
 */
function isEmptyObject(obj) {
    if (!obj || typeof obj !== 'object' || Array.isArray(obj))
        return false;
    return !Object.keys(obj).length
}
```

### <a name="deepClone">5.2 deepClone</a> 
```
/**
 * @desc 深拷贝，支持常见类型
 * @param {Any} values
 */
function deepClone(values) {
    let copy;

    // handle the 3 simple types, and null or undefined
    if (!values || "object" !== typeof values) return values;

    // handle Date
    if (values instanceof Date) {
        copy = new Date();
        copy.setTime(values.getTime());
        return copy;
    }

    // Handle Array
    if (values instanceof Array) {
        copy = [];
        for (let i = 0, len = values.length; i < len; i++) {
            copy[i] = deepClone(values[i]);
        }
        return copy;
    }

    // Handle Object
    if (values instanceof Object) {
        copy = {};
        for (let attr in values) {
            if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr]);
        }
        return copy;
    }

    //不能解决有环的问题

    throw new Error("Unable to copy values! Its type isn't supported.");
}

```

## <a name="url">6.url</a>

### <a name="getQueryStringRegExp">6.1 getQueryStringRegExp</a> 

```
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
```
### <a name="urlParamsToObject">6.2 urlParamsToObject</a> 

```
/**
 *
 * @desc   获取url中的所有参数以对象的形式返回
 * @param  {String} url  链接的url地址 www.hahaha.com?name=abc&value=aaa
 * @return {Object} 将链接里的参数以键值对的形式返回
 */

function urlParamsToObject(url){
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
```

### <a name="objectToUrlParams">6.3 objectToUrlParams</a> 

```
/**
 *
 * @desc   对象系列化成url参数的形式
 * @param  {String} domain  域名地址 www.hahaha.com
 * @param  {Object} data  对象数据{key:value}
 * @return {String} 返回一个完整的url地址，即域名加参数
 */

function objectToUrlParams(url,data){
    let result = "";
    for(let key in data) {
        let value = data[key];
        if(Object.prototype.toString.call(value) === '[object Object]' || Object.prototype.toString.call(value) === '[object Array]'){
            value = JSON.stringify(value);
        }
        result+=`${key}=${value}&`;
    }
    return url + "?" + result.replace(/.$/,"");
}
```

---
## <a name=validate>7. validate</a>
### <a name=isEmail>7.1 isEmail</a>
```
/**
 *
 * @desc   判断是否为邮箱地址
 * @param  {String}  str
 * @return {Boolean}
 */
function isEmail(str) {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str);
}
```
### <a name=isIdCard>7.2 isIdCard</a>
```
/**
 *
 * @desc  判断是否为身份证号
 * @param  {String|Number} str
 * @return {Boolean}
 */
function isIdCard(str) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str);
}
```
### <a name=isIdCard>7.3 isPhoneNum</a>
```
/**
 *
 * @desc   判断是否为手机号
 * @param  {String|Number} str
 * @return {Boolean}
 */
function isPhoneNum(str) {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
}
```
### <a name=isUrl>7.4 isUrl</a>
```
/**
 *
 * @desc   判断是否为URL地址
 * @param  {String} str
 * @return {Boolean}
 */
function isUrl(str) {
    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
}

```
### <a name=isIP>7.5 isIP</a>
```
/**
 *
 * @desc   判断是否为IP地址
 * @param  {String} str
 * @return {Boolean}
 */
function isIP(str) {
    return /(?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d)/i.test(str);
}
```
### <a name=isIP>7.6 isIP</a>
```
/**
 *
 * @desc   判断是否为金额的格式
 * @param  {String} str
 * @return {Boolean}
 */
function isMoneyAmount(str) {
    return /^(([1-9]{1,9})|0)(\.\d{0,2})?$/.test(str);
}
```

## <a name="other">其他</a>
### <a name="throttle">throttle</a>
```
/**
 *
 * @desc  函数节流
 * @param  {Function} fn 执行的目标函数
 * @param  {Number} delay 节流的的时间间隔
 * @param  {Number} maxDelay 触发行数执行的最大时间
 * @return {Function} 返回节流过的函数
 */
function throttle(fn, delay, maxDelay) {
    let timer = null;
    let startTime;
    return function () {
        let context = this, args = arguments, currentTime = +new Date();
        //先清理上一次的调用触发（上一次调用触发事件不执行）
        clearTimeout(timer);
        //如果不存触发时间，那么当前的时间就是触发时间
        if (!startTime) {
            startTime = currentTime;
        }
        //如果当前时间-触发时间大于最大的间隔时间（maxDelay），触发一次函数运行函数
        if (currentTime - startTime >= maxDelay) {
            fn.apply(context, args);
            startTime = currentTime;
        }
        //否则延迟执行
        else {
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        }
    };
}
```





