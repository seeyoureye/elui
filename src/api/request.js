//引入 axios 不然用什么封装
import axios from 'axios';
//导入进度条
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
//名字
let requests = axios.create({
    baseURl:'',
    timeout:3000
})
//还要写拦截器的
requests.interceptors.request.use(config=>{
    Nprogress.start();
    let token = sessionStorage.getItem('token')
    if(token){//有 token 就携带
        config.headers['Authorization'] = token
    }
    return config;
},err=>{
    return Promise.reject(err)

})
//拦截目前没有做任何处理,其实可以监测返回状态码的,但是不同函数返回的状态码也各不相同 不是很好写
requests.interceptors.response.use(function(response){
    Nprogress.done();
    return response
},err=>{
    return Promise.reject(err)
})
//暴露
export default requests
