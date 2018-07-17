require("babel-core/register");
require("babel-polyfill");

import {compress} from './src/image.js';

let input = document.getElementById('fileInput');
let image = document.getElementById('image');
input.addEventListener('change', async(e)=>{
    let file = e.target.files[0];
    try{
        let blob = await compress(file,{
            width: 1600,
            height: 1600,
            quality: 0.8,
            maxSize: 100*1024,
            type: 'file',
        });
        debugger
        image.onload = function(e) {
            window.URL.revokeObjectURL(img.src); // 清除释放
        };
        console.log(blob);
        image.src = window.URL.createObjectURL(blob);
    }catch(e){
        console.log(e);
    }
});