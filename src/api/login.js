// 登陆
import requests from './request';

let url=`http://127.0.0.1:8888/api/private/v1`

export const reqLogin = (data)=>requests({method:'POST',url:`${url}/login`,data})
