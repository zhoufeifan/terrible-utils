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

/**
 * 
 * @desc 金额元转分
 * @param  {Number} amount 金额值（单位：元）
 * @return {Number} 
 */

function parseYuanToCent(amount){
    if(typeof amount === "number"){
       return (amount*100).toFixed(0);
    }else if(typeof amount === "string"){
       return (Number(amount)*100).toFixed(0);
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

function formatYuan(amount){
    amount+="";
    return amount.replace(/(\d)(?=(\d{3})+(?!\d))/g,'$1,');
}

// module.exports = {
//     parseCentToYuan,
//     parseYuanToCent,
//     formatYuan
// };
export function nima (){
    console.log('1');
};

export function niba (){
    console.log('1');
};