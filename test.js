require("babel-core/register");
require("babel-polyfill");

import {compress} from './src/image.js';

let input = document.getElementById('fileInput');
let image = document.getElementById('image');
input.addEventListener('change', async(e)=>{
    let file = e.target.files[0];
    try{
        let blob = await compress(file,{
            maxSize: 200*1024,
            type: 'file'
        });
        image.onload = function(e) {
            window.URL.revokeObjectURL(image.src); // 清除释放
        };
        console.log(blob);
        image.src = window.URL.createObjectURL(blob);
    }catch(e){
        console.log(e);
    }
});