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


const toString = Object.prototype.toString;
/**
 *
 * @desc   判断对象的类型
 * @param  {Object} obj
 * @return {Boolean}
 */
function getType(x) {
    if(x === null){
        return 'null';
    }

    const t= typeof x;

    if(t !== 'object'){
        return t;
    }

    let c;
    try {
        c = toString.call(x).slice(8, -1).toLowerCase();
    } catch(e) {
        return 'object';
    }

    if(c !== 'object'){
        return c;
    }

    if(x.constructor == Object){
        return c;
    }

    try {
        // Object.create(null)
        if (Object.getPrototypeOf(x) === null || x.__proto__ === null) {
            return 'object';
        }

        return 'unknown';
    } catch(e) {
        // ie下无Object.getPrototypeOf
        return 'unknown';
    }
}

/**
 * @desc 深拷贝，支持常见类型
 * @param {Any} values
 */
function deepClone1(values) {
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

//深拷贝改进版，使用循环代替递归
function deepClone(data){
    // 仅对对象和数组进行深拷贝，其他类型，直接返回
    function isClone(x) {
        const t = getType(x);
        return t === 'object' || t === 'array';
    }

    let result;
    const type = getType(data);
    if(type === 'array'){
        result = [];
    }else if(type === 'object'){
        result = {}
    }else{
        result = data;
    }
    // 循环栈
    const loopList = [
        {
            parent: result,
            key: undefined,
            data,
        }
    ]
    while(loopList.length){
        const node = loopList.pop();
        const {parent, data, key} = node;
        const dataType = getType(data);
        let target = parent;
        // 初始化赋值目标，key为 undefined 则拷贝到父元素，否则拷贝到子元素
        if(typeof key !== 'undefined'){
            parent[key] = dataType === 'array' ? [] : {};
            //用target保持引用链
            target = parent[key];
        }
        if(dataType === 'array'){
            let length = data.length;
            for(let i = 0; i<length; i++){
                if(data[i] === data){
                    target[i] = target;
                }
                else if(isClone(data[i])){
                    //将要克隆的对象放入循环栈
                    loopList.push({
                        parent: target,
                        key: i,
                        data: data[i]
                    });
                }else{
                    target[i] = data[i];
                }
            }
        }else if(dataType === 'object'){
            for(let key in data){
                if(data.hasOwnProperty(key)){
                    if(data[key] === data){
                        target[key] = target;
                    }
                    else if(isClone(data[key])){
                        //将要克隆的对象放入循环栈
                        loopList.push({
                            parent: target,
                            key,
                            data: data[key]
                        });
                    }else{
                        target[key] = data[key];
                    }
                }
            }
        }
    }

    return result;
}

module.exports = {
    isEmptyObject,
    deepClone
};