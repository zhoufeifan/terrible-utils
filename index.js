import Url from './src/url';


console.log(Url);
// let result = Url.getQueryStringRegExp("name","www.baidu.com?key=fsdf&name=fsfd");
let result = Url.getUrlParams("www.baidu.com?key=fsdf&name=fsfd");

console.log(result);
// alert('nima');
