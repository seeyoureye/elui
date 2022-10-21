import requests from './request';

let url=`http://127.0.0.1:8888/api/private/v1`;

// 最后一个了 表格页面
export const getReports = ()=>requests({url:`${url}/reports/type/1`})