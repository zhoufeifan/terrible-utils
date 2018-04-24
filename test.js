// require("babel-core/register");
// require("babel-polyfill");

import {getViewport,getPagearea,getElementAbsoultePosition,getElementRelativePosition} from './src/browser.js';
// const url = require('./src/url');

console.log(getViewport());
console.log(getPagearea());
let ele = document.querySelector('.children');

console.log(getElementAbsoultePosition(ele));
console.log(getElementRelativePosition(ele));