// 订单管理的网络请求页面
import requests from './request';

let url=`http://127.0.0.1:8888/api/private/v1`;

// 获取订单数据列表 get请求
export const getOrdersList = (data)=>requests({url:`${url}/orders`,params:data})
// 获取物流信息 通过 id 商品的 id
export const getExpressInfo = (id)=>requests({url:`${url}/kuaidi/${id}`})