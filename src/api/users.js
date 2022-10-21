import requests from './request';

let url=`http://127.0.0.1:8888/api/private/v1`;

// 用户界面
// user 页面的请求 包含搜索
export const getUserPageInfo = (params)=>requests({url:`${url}/users`,params:{...params}})
// 修改 单个用户 状态
export const setUserItemState = (id,type)=>requests({method:'PUT',url:`${url}/users/${id}/state/${type}`})
// 根据 id 查询用户信息
export const searchUser = (id)=>requests({url:`${url}/users/${id}`})
// 添加用户 
export const addUser = (data)=>requests({method:'POST',url:`${url}/users`,data})
// 编辑用户
export const editUser = (id,data)=>requests({method:'PUT',url:`${url}/users/${id}`,data})
// 删除用户
export const deleteUser = (id)=>requests({method:'DELETE',url:`${url}/users/${id}`})
// 分配用户角色
export const setUsePower = (id,rid)=>requests({method:'PUT',url:`${url}/users/${id}/role`,data:{rid}})
// 获取权限信息
export const getRolesList = ()=>requests({url:`${url}/roles`})