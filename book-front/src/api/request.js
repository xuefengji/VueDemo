import axios from "axios";
import config from '@/config/index';

const instance = axios.create({
  baseURL: config.baseApi,
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use( (response)=> {
    const {code, msg, data} = response.data
    if (code === 200){
        return data;
    }else{
        const NETWORK_ERROR = "网络错误...."
        ElMessage.error(msg || NETWORK_ERROR);
        return Promise.reject(msg || NETWORK_ERROR);
    }
  });

function request (options) {
    options.method = options.method || 'get';
    if(options.method.toLowerCase() === 'get'){
      options.params = options.data;
    }
    //对mock 的开关做个处理
    let isMock = config.mock;
    if(typeof options.mock !== "undefined"){
      isMock = options.mock
    }
    
    //对环境做个处理
    if(config.env === 'prod'){
      instance.defaults.baseURL = config.baseApi;
    }else{
      instance.defaults.baseURL = isMock ? config.mockApi:config.baseApi;
    }

    return instance(options)
}

export default request