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
})({4:[function(require,module,exports) {
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
},{}],6:[function(require,module,exports) {
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
},{}],7:[function(require,module,exports) {
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
},{}],2:[function(require,module,exports) {
"use strict";

var _url = require("./src/url");

var _url2 = _interopRequireDefault(_url);

var _throttle = require("./src/throttle");

var _throttle2 = _interopRequireDefault(_throttle);

var _validate = require("./src/validate");

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// let result = Url.getQueryStringRegExp("name","www.baidu.com?key=fsdf&name=fsfd");
// let result = Url.getUrlParams("www.baidu.com?key=fsdf&name=fsfd");
// let result = Url.objectToUrlParams({aa:[{aa:"ss"},{aa:"ff"}]});
// let result = DateTime.formatPassTime(new  Date("2017-12-30"));
// let result = DateTime.formatPassTime(new  Date("2017-12-30"));

// console.log(result);
// alert('nima');

// window.onmousemove = throttle(function () {
//    console.log('nima');
// },300,1000);

// console.log(Validate.isMoneyAmount("323232.4"));
console.log(_validate2.default.isIP("10.0.0.2"));
},{"./src/url":4,"./src/throttle":6,"./src/validate":7}],0:[function(require,module,exports) {
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
  var ws = new WebSocket('ws://localhost:54616/');
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
},{}]},{},[0,2])