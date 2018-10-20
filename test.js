require("babel-core/register");
require("babel-polyfill");

import {throttleFirstInvoke,throttleLastInvoke} from './src/other.js';

var myFun = throttleFirstInvoke(()=>{
    console.log('aa');
},1000);

var myFun1 = throttleLastInvoke(()=>{
    console.log('bb');
},1000);

// window.onresize = myFun;
window.onresize = myFun1;