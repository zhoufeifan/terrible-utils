require("babel-core/register");
require("babel-polyfill");

import {deepClone} from './src/object.js';

var aa = {
    a1:{
        b1:{
            "name": 1,
            "id": 2
        },
        b2:[{
            b:1
        },{
            b:2
        }]
    },
    a2: "1"
};

console.log(aa);
var bb = deepClone(aa);
aa.a1.b2 = null;
console.log(bb);
