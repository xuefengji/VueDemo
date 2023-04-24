import axios from "axios";
import config from "@/config/index";
import type { AxiosRequestConfig,AxiosResponse } from "axios";
import store from '@/store'
import type { StateAll } from "@/store";

const instance = axios.create({
    baseURL: process.env.NODE_ENV === 'development'? config.baseUrl.dev: config.baseUrl.pro,
    timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (config.headers) {
        config.headers.authorization = (store.state as StateAll).users.token
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});


// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

interface Data {
    [index: string]: unknown
}

interface HTTP {
    get: (url: string, data?: Data, config?:AxiosRequestConfig) => Promise<AxiosResponse>
    post: (url: string, data?: Data, config?:AxiosRequestConfig) => Promise<AxiosResponse>
    put: (url: string, data?: Data, config?:AxiosRequestConfig) => Promise<AxiosResponse>
    patch: (url: string, data?: Data, config?:AxiosRequestConfig) => Promise<AxiosResponse>
    delete: (url: string, data?: Data, config?:AxiosRequestConfig) => Promise<AxiosResponse>
}

const http: HTTP = {
    get(url, data,config){
        return instance.get(url, {
            params: data,
            ...config
        })
    },
    post(url, data, config){
        return instance.post(url, data, config)
    },
    put(url, data, config){
        return instance.put(url, data, config)
    },
    patch(url, data, config){
        return instance.patch(url, data, config)
    },
    delete(url, data, config){
        return instance.delete(url, {
            data,
            ...config
        })
    },
}

export default http;