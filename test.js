const Request = require('./src/request');


const request = new Request({
    baseURL: "http://openapi.daily.heyean.com",
    onLoadingStart: () => {
        console.log('startLoading');
    },
    onLoadingEnd: () => {
        console.log('endLoading');
    },
    onError: (error)=>{
        if(error && error.errorMsg){
            console.log(error.errorMsg);
        }else {
            console.log(error || "未知错误");
        }
    }
});

request({
    url:"/gateway.htm?command=version_check_update",
    data:{
        version:"3.9.2"
    }
}).then((data)=>{

},(error)=>{
    console.log(error)
});