// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      function localRequire(x) {
        return newRequire(localRequire.resolve(x));
      }

      localRequire.resolve = function (x) {
        return modules[name][1][x] || x;
      };

      var module = cache[name] = new newRequire.Module;
      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({2:[function(require,module,exports) {
"use strict";

/**
 *
 * @desc 根据参数名获取url中对应的参数值
 * @param  {String} name url 中的参数名
 * @param  {String} url  链接的url地址 www.hahaha.com?name=abc&value=aaa
 * @return {String} g返回链接里的参数值
 */

function getQueryStringRegExp(name, url) {
  url = decodeURIComponent(url);
  //检测name是否是这个链接的参数，并且只出现一次
  if (url.match(new RegExp("^(.*[?|&]" + name + "=){1}", "i"))) {
    var result = "";
    url.replace(new RegExp("[?!&]" + name + "=(.*)&?"), function (match, p1) {
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

function urlParamsToObject(url) {
  url = url ? url : window.location.href;
  var paramsString = url.replace(/(.+)\?/, ""),
      paramsArray = paramsString.split('&'),
      result = {};
  paramsArray.map(function (item) {
    var name = item.replace(/(.+)=.+/, "$1");
    var value = window.decodeURIComponent(item.replace(/.+=(.+)/, "$1"));
    result[name] = value;
  });
  return result;
}

/**
 *
 * @desc   对象序列化成url的形式
 * @param  {String} url  链接的url地址 www.hahaha.com?name=abc&value=aaa
 * @return {Object} 将链接里的参数以键值对的形式返回
 */

function objectToUrlParams(data) {
  var result = "";
  for (var key in data) {
    var value = data[key];
    if (Object.prototype.toString.call(value) === '[object Object]' || Object.prototype.toString.call(value) === '[object Array]') {
      value = JSON.stringify(value);
    }
    result += key + "=" + value + "&";
  }
  return result.replace(/.$/, "");
}

module.exports = {
  getQueryStringRegExp: getQueryStringRegExp,
  urlParamsToObject: urlParamsToObject,
  objectToUrlParams: objectToUrlParams
};
},{}],3:[function(require,module,exports) {
"use strict";

/**
 *
 * @desc  函数节流
 * @param  {Function} fn 执行的目标函数
 * @param  {Number} delay 节流的的时间间隔
 * @param  {Number} maxDelay 触发行数执行的最大时间
 * @return {Function} 返回节流过的函数
 */
function throttle(fn, delay, maxDelay) {
  var timer = null;
  var startTime = void 0;
  return function () {
    var context = this,
        args = arguments,
        currentTime = +new Date();
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
module.exports = throttle;
},{}],4:[function(require,module,exports) {
"use strict";

/**
 *
 * @desc   判断是否为邮箱地址
 * @param  {String}  str
 * @return {Boolean}
 */
function isEmail(str) {
  return (/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(str)
  );
}
/**
 *
 * @desc  判断是否为身份证号
 * @param  {String|Number} str
 * @return {Boolean}
 */
function isIdCard(str) {
  return (/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
  );
}

/**
 *
 * @desc   判断是否为手机号
 * @param  {String|Number} str
 * @return {Boolean}
 */
function isPhoneNum(str) {
  return (/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
  );
}

/**
 *
 * @desc   判断是否为URL地址
 * @param  {String} str
 * @return {Boolean}
 */
function isUrl(str) {
  return (/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str)
  );
}

/**
 *
 * @desc   判断是否为IP地址
 * @param  {String} str
 * @return {Boolean}
 */
function isIP(str) {
  return (/(?:(?:25[0-5]|2[0-4]\d|[01]?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d?\d)/i.test(str)
  );
}

/**
 *
 * @desc   判断是否为金额的格式
 * @param  {String} str
 * @return {Boolean}
 */
function isMoneyAmount(str) {
  return (/^(([1-9]{1,9})|0)(\.\d{0,2})?$/.test(str)
  );
}

module.exports = {
  isUrl: isUrl,
  isIP: isIP,
  isMoneyAmount: isMoneyAmount
};
},{}],5:[function(require,module,exports) {
"use strict";

var keyCodeMap = {
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

module.exports = {
  getKeyName: getKeyName
};
},{}],6:[function(require,module,exports) {
"use strict";

/**
 * 
 * @desc 金额分转元
 * @param  {Number} amount 金额值（单位：分）
 * @return {Number} 
 */
function parseCentToYuan(amount) {
  if (typeof amount === "number") {
    return (amount / 100).toFixed(2);
  } else if (typeof amount === "string") {
    return (Number(amount) / 100).toFixed(2);
  }
  console.warn('参数错误');
  return 0;
}

/**
 * 
 * @desc 金额元转分
 * @param  {Number} amount 金额值（单位：元）
 * @return {Number} 
 */

function parseYuanToCent(amount) {
  if (typeof amount === "number") {
    return (amount * 100).toFixed(0);
  } else if (typeof amount === "string") {
    return (Number(amount) * 100).toFixed(0);
  }
  console.warn('参数错误');
  return 0;
}

/**
 * 
 * @desc 金额元转分
 * @param  {Number} amount 金额值（单位：元）
 * 正常的思路：从右边开始数，每次数3位数字，如果左边还要数字，就添加一个逗号。
 * 不过正则表达式总是从左到右开始工作的
 * 因此可以进行思路转换：逗号应该加在『左边有数字，右边的数字正好是3的倍数的位置上』。
 * @return {Number} 
 */

function formatYuan(amount) {
  amount += "";
  return amount.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

module.exports = {
  parseCentToYuan: parseCentToYuan,
  parseYuanToCent: parseYuanToCent,
  formatYuan: formatYuan
};
},{}],7:[function(require,module,exports) {
"use strict";

/**
 * 
 * @desc 获取浏览器类型和版本
 * @return {String} 
 */
function getExplore() {
  var sys = {},
      ua = navigator.userAgent.toLowerCase(),
      s;
  (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1] : (s = ua.match(/msie ([\d\.]+)/)) ? sys.ie = s[1] : (s = ua.match(/edge\/([\d\.]+)/)) ? sys.edge = s[1] : (s = ua.match(/firefox\/([\d\.]+)/)) ? sys.firefox = s[1] : (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys.opera = s[1] : (s = ua.match(/chrome\/([\d\.]+)/)) ? sys.chrome = s[1] : (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys.safari = s[1] : 0;
  // 根据关系进行判断
  if (sys.ie) return 'IE: ' + sys.ie;
  if (sys.edge) return 'EDGE: ' + sys.edge;
  if (sys.firefox) return 'Firefox: ' + sys.firefox;
  if (sys.chrome) return 'Chrome: ' + sys.chrome;
  if (sys.opera) return 'Opera: ' + sys.opera;
  if (sys.safari) return 'Safari: ' + sys.safari;
  return 'Unkonwn';
}

/**
 * 
 * @desc 获取操作系统类型
 * @return {String} 
 */
function getOS() {
  var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
  var vendor = 'navigator' in window && 'vendor' in navigator && navigator.vendor.toLowerCase() || '';
  var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';

  if (/mac/i.test(appVersion)) return 'MacOSX';
  if (/win/i.test(appVersion)) return 'windows';
  if (/linux/i.test(appVersion)) return 'linux';
  if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) 'ios';
  if (/android/i.test(userAgent)) return 'android';
  if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone';
}

module.exports = {
  getExplore: getExplore,
  getOS: getOS
};
},{}],8:[function(require,module,exports) {
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 *
 * @desc   判断`obj`是否为空
 * @param  {Object} obj
 * @return {Boolean}
 */
function isEmptyObject(obj) {
  if (!obj || (typeof obj === "undefined" ? "undefined" : _typeof(obj)) !== 'object' || Array.isArray(obj)) return false;
  return !Object.keys(obj).length;
}

/**
 * @desc 深拷贝，支持常见类型
 * @param {Any} values
 */
function deepClone(values) {
  var copy = void 0;

  // handle the 3 simple types, and null or undefined
  if (!values || "object" !== (typeof values === "undefined" ? "undefined" : _typeof(values))) return values;

  // handle Date
  if (values instanceof Date) {
    copy = new Date();
    copy.setTime(values.getTime());
    return copy;
  }

  // Handle Array
  if (values instanceof Array) {
    copy = [];
    for (var i = 0, len = values.length; i < len; i++) {
      copy[i] = deepClone(values[i]);
    }
    return copy;
  }

  // Handle Object
  if (values instanceof Object) {
    copy = {};
    for (var attr in values) {
      if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr]);
    }
    return copy;
  }

  //不能解决有环的问题

  throw new Error("Unable to copy values! Its type isn't supported.");
}

module.exports = {
  isEmptyObject: isEmptyObject,
  deepClone: deepClone
};
},{}],9:[function(require,module,exports) {
"use strict";
},{}],1:[function(require,module,exports) {
"use strict";

var _url = require("./src/url");

var _url2 = _interopRequireDefault(_url);

var _throttle = require("./src/throttle");

var _throttle2 = _interopRequireDefault(_throttle);

var _validate = require("./src/validate");

var _validate2 = _interopRequireDefault(_validate);

var _keyCode = require("./src/keyCode");

var _keyCode2 = _interopRequireDefault(_keyCode);

var _amount = require("./src/amount");

var _amount2 = _interopRequireDefault(_amount);

var _device = require("./src/device");

var _device2 = _interopRequireDefault(_device);

var _object = require("./src/object");

var _object2 = _interopRequireDefault(_object);

var _utils = require("./src/utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  url: _url2.default,
  throttle: _throttle2.default,
  validate: _validate2.default,
  keyCode: _keyCode2.default,
  dateTime: _amount2.default,
  device: _device2.default,
  object: _object2.default,
  utils: _utils2.default,
  amount: _amount2.default
};
},{"./src/url":2,"./src/throttle":3,"./src/validate":4,"./src/keyCode":5,"./src/amount":6,"./src/device":7,"./src/object":8,"./src/utils":9}],0:[function(require,module,exports) {
var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent) {
  var ws = new WebSocket('ws://localhost:63155/');
  ws.onmessage = function(event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = () => {
        window.location.reload();
      }
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id)
  });
}
},{}]},{},[0,1])