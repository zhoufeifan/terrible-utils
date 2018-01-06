// import Url from './src/url';
// import throttle from './src/throttle';
// import Validate from './src/validate';
import keyCode from './src/keyCode';

// let result = Url.getQueryStringRegExp("name","www.baidu.com?key=fsdf&name=fsfd");
// let result = Url.getUrlParams("www.baidu.com?key=fsdf&name=fsfd");
// let result = Url.objectToUrlParams({aa:[{aa:"ss"},{aa:"ff"}]});
// let result = DateTime.formatPassTime(new  Date("2017-12-30"));
// let result = DateTime.formatPassTime(new  Date("2017-12-30"));

// console.log(result);
// alert('nima');

// window.onmousemove = throttle(function () {
//    console.log('nima');
// },300,1000);

// console.log(Validate.isMoneyAmount("323232.4"));
document.addEventListener('keydown',function (e) {
    console.log(e.keyCode);
   console.log(keyCode.getKeyName(e.keyCode));
});