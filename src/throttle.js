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
module.exports = throttle;