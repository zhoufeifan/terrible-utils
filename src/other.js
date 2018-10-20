/**
 *
 * @desc  先行函数节流
 * @param  {Function} fn 执行的目标函数
 * @param  {Number} delay 节流的时间间隔
 * @return {Function} 返回节流过的函数
 */
function throttleFirstInvoke(fn, delay) {
    let startTime;
    return function () {
        let context = this, args = arguments, currentTime = +new Date();
        //如果不存触发时间，那么当前的时间就是触发时间
        if (!startTime) {
            startTime = currentTime;
            fn.apply(context, args);
        }
        //控制在规定时间内只触发一次
        if (currentTime - startTime >= delay) {
            fn.apply(context, args);
            startTime = currentTime;
        }
    };
}

/**
 *
 * @desc  后置函数节流
 * @param  {Function} fn 执行的目标函数
 * @param  {Number} delay 节流的时间间隔
 * @param  {Number} maxDelay 触发函数执行的最大延迟时间，默认为0即立即执行
 * @return {Function} 返回节流过的函数
 */
function throttleLastInvoke(fn, delay, maxDelay) {
    let startTime;
    let timer = null;
    maxDelay = maxDelay || delay
    return function () {
        let context = this, args = arguments, currentTime = +new Date();
        //先清理上一次的调用触发（上一次调用触发事件不执行）
        clearTimeout(timer);
        //如果不存触发时间，那么当前的时间就是触发时间
        if (!startTime) {
            startTime = currentTime;
        }
        //如果当前时间-触发时间大于maxDelay，触发一次函数运行函数
        if (currentTime - startTime >= maxDelay) {
            fn.apply(context, args);
            startTime = currentTime;
        }
        //否则延迟执行,即在maxDelay时间间隔内只触发一次函数执行
        else {
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        }
    };
}


module.exports = {
    throttleFirstInvoke,
    throttleLastInvoke
};