require("babel-core/register");
require("babel-polyfill");

import {cloneForce} from './src/object.js';

var aa = {};
aa.a = aa;

console.log(aa);
var bb = cloneForce(aa);
console.log(bb);
