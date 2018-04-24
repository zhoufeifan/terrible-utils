/**
 * 
 * @desc 获取浏览器的宽度和高度
 * @return {Object} {width,height}
 */
function getViewport(){
　　if (document.compatMode == "BackCompat"){
　　　　return {
　　　　　　width: document.body.clientWidth,
　　　　　　height: document.body.clientHeight
　　　　}
　　} else {
　　　　return {
　　　　　　width:  document.documentElement.clientWidth,
　　　　　　height: document.documentElement.clientHeight
　　　　}
　　}
}


/**
 * 
 * @desc 获取整张网页的面积
 * @return {Object} {width,height}
 */
function getPagearea(){
　  if (document.compatMode == "BackCompat"){
　　　　return {
　　　　　　width: document.body.scrollWidth,
　　　　　　height: document.body.scrollHeight
　　　　}
　　} else {
　　　　return {
　　　　　　width: document.documentElement.scrollWidth,
　　　　　　height: document.documentElement.scrollHeight
　　　　}
　　}
}



/**
 * @param  {Element}  html dom
 * @desc 获取网页元素的绝对位置,即网页元素左上角坐标对于整张网页左上角的坐标
 * @return {Object} {x,y}
 */
function getElementAbsoultePosition(element){
    function getElementLeft(element){
　　　　var actualLeft = element.offsetLeft;
　　　　var current = element.offsetParent;

　　　　while (current !== null){
　　　　　　actualLeft += current.offsetLeft;
　　　　　　current = current.offsetParent;
　　　　}

　　　　return actualLeft;
　　}
        
　　function getElementTop(element){
　　　　var actualTop = element.offsetTop;
　　　　var current = element.offsetParent;

　　　　while (current !== null){
　　　　　　actualTop += current.offsetTop;
　　　　　　current = current.offsetParent;
　　　　}

　　　　return actualTop;
　　}

    return {
       x: getElementLeft(element),
       y: getElementTop(element)
    }
}

/**
 * @param  {Element}  html dom
 * @desc 获取网页的相对位置,即网页元素的左上角相对于浏览器窗口左上角的位置
 * @return {Object} {x,y}
 */
function getElementRelativePosition(element){
    function getElementViewLeft(element){
　　　　var actualLeft = element.offsetLeft;
　　　　var current = element.offsetParent;

　　　　while (current !== null){
　　　　　　actualLeft += current.offsetLeft;
　　　　　　current = current.offsetParent;
　　　　}

　　　　if (document.compatMode == "BackCompat"){
　　　　　　var elementScrollLeft=document.body.scrollLeft;
　　　　} else {
　　　　　　var elementScrollLeft=document.documentElement.scrollLeft; 
　　　　}

　　　　return actualLeft-elementScrollLeft;
　　}
        
　　function getElementViewTop(element){
　　　　var actualTop = element.offsetTop;
　　　　var current = element.offsetParent;

　　　　while (current !== null){
　　　　　　actualTop += current. offsetTop;
　　　　　　current = current.offsetParent;
　　　　}

　　　　if (document.compatMode == "BackCompat"){
　　　　　　var elementScrollTop=document.body.scrollTop;
　　　　} else {
　　　　　　var elementScrollTop=document.documentElement.scrollTop; 
　　　　}

　　　　return actualTop-elementScrollTop;
　　}

    return {
        x: getElementViewLeft(element),
        y: getElementViewTop(element)
    }
}

export{
    getViewport,
    getPagearea,
    getElementAbsoultePosition,
    getElementRelativePosition
}
// module.exports = {
//     getViewport,
//     getPagearea,
//     getElementAbsoultePosition,
//     getElementRelativePosition
// };