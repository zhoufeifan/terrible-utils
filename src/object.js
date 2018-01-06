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

module.exports = {
    isEmptyObject,
    deepClone
};