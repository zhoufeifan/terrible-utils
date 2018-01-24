//引入babel-polyfill
require("babel-core/register");
require("babel-polyfill");

const axios = require('axios');
const qs = require('qs');

/**
 *
 * @desc   基于axios的请求类封装
 * @param  {Object} baseConfig 设置Request对象初始化时的配置
 *                  {Function}onLoadingStart 请求之前的动作
 *                  {Function}onLoadingEnd 请求结束的动作
 *                  {Function}onError 请求错误的处理
 *                  {Function}isSuccess 配置业务请求是否成功的规则
 *                  {Function}getData 配置从response中获取数据的规则
 *                  {Function}getError 配置生成错误对象形式的规则
 *                  {String}baseURL 基础的URL,通常都是domain
 * @return {Function} 返回一个执行请求的函数
 */

class Request {
    constructor(baseConfig) {
        baseConfig = Object.assign({
            withCredentials: true,
            headers: {post: {"Content-Type": 'application/x-www-form-urlencoded'}},
            timeout: 60 * 1000,
            onLoadingStart: null,
            onLoadingEnd: null,
            onError: null,
            isSuccess: (response)=>{
                return response && response.result && response.result.success;
            },
            getData: (response)=>{
                return response ? response.data : null;
            },
            getError: (response) => {
                return response.result;
            },
            baseURL: '',
        }, baseConfig);
        const {onLoadingStart, onLoadingEnd, onError} = baseConfig;
        const http = axios.create(baseConfig);


        /**
         * @desc   基于axios的请求类封装
         * @param  {Object} option 设置执行请求时需要设置的参数
         *                 {String} url 请求配置的url地址，如果已经配置了baseURL，则只需写额外的url
         *                 {Object} data 请求带上的参数
         *                 {Object} config 设置其他参数配置
         *                 {Boolean} showLoading 是否显示请求等待动画,
         *                 {Boolean} showError 是否显示请求错误信息,
         *                 {Boolean} rawData 返回的值是否是原生的response
         * @return {Object} 返回请求的response
         */
        async function request(option) {
            let {url, data, config = {}} = option;
            config = Object.assign(baseConfig, {method: 'post'}, config, {url, data});
            config = {...config};
            if (data instanceof FormData) {
                config.contentType = false; // 上传文件时必要参数
                config.processData = false; // 上传文件时必要参数
                // 用qs序列化之后, 后台才可以取到
            } else {
                config = Object.assign(config, {data: qs.stringify(data)});
            }

            const {showLoading = true, showError = true, rawData = false} = config;
            const handleError = (error) => {
                onError && showError && onError(error);
                throw error;
            };

            showLoading && onLoadingStart && onLoadingStart();
            let response = null;

            try {
                response = await http(config);
            } catch (error) {
                showLoading && onLoadingEnd && onLoadingEnd();
                handleError(error)
            }

            showLoading && onLoadingEnd && onLoadingEnd();

            if (rawData) {
                return response;
            }

            response = response.data;
            if (!response) {
                handleError({errorCode: 'No_Response', errorMsg: '无返回数据'});
            }
            if (!config.isSuccess(response)) {
                handleError(config.getError(response));
            }
            return config.getData(response);
        }

        return request;
    }
}

module.exports = Request;