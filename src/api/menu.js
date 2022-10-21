// 左侧菜单栏
import requests from './request';

let url=`http://127.0.0.1:8888/api/private/v1`;

// 左侧菜单栏的请求 
export const getNavMenus = ()=>requests({url:`${url}/menus`})