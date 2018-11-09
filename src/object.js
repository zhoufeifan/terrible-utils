import getType from './type.js';
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


/**
 * @desc 判断这个数据类型是否需要克隆
 * @param {*} x 
 */
function isClone(x) {
    const t = getType(x);
    return t === 'object' || t === 'array';
}


/**
 * @desc 简易版深拷贝，支持常见类型，不能解决循环引用和递归爆栈
 * @param {Any} values
 */
function simpleDeepClone(values) {
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
function cloneLoop(data){
    // 仅对对象和数组进行深拷贝，其他类型，直接返回
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
                //防止第一级出现循环引用，导致死循环
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



const UNIQUE_KEY = 'terrible-utils' + (new Date).getTime();

// weakMap：处理对象关联引用
function SimpleWeakMap (){
    this.cacheArray = [];
}

SimpleWeakMap.prototype.set = function(key, value){
    this.cacheArray.push(key);
    key[UNIQUE_KEY] = value;
};
SimpleWeakMap.prototype.get = function(key){
    return key[UNIQUE_KEY];
};
SimpleWeakMap.prototype.clear = function(){
    for (let i = 0; i < this.cacheArray.length; i++) {
        let key = this.cacheArray[i];
        delete key[UNIQUE_KEY];
    }
    this.cacheArray.length = 0;
};

function getWeakMap(){
    let result;
    if(typeof WeakMap !== 'undefined' && getType(WeakMap)== 'function'){
        result = new WeakMap();
        if(getType(result) == 'weakmap'){
            return result;
        }
    }
    result = new SimpleWeakMap();

    return result;
}



// 改进版，能解决循环引用和递归爆栈的问题
function cloneForce(data){
    const uniqueData = getWeakMap();// 使用weakMap用来做数据缓存
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
    ];

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

        // 复杂数据需要缓存操作
        if (isClone(data)) {
            // 命中缓存，直接返回缓存数据
            let uniqueTarget = uniqueData.get(data);
            if (uniqueTarget) {
                parent[key] = uniqueTarget;
                continue; // 中断本次循环
            }

            // 未命中缓存，保存到缓存
            uniqueData.set(data, target);
        }

        if(dataType === 'array'){
            let length = data.length;
            for(let i = 0; i<length; i++){
                //防止第一级出现循环引用，导致死循环
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
    //拷贝结束完要对map做个清理
    uniqueData.clear && uniqueData.clear();
    return result;

}
module.exports = {
    isEmptyObject,
    simpleDeepClone,
    cloneForce
};