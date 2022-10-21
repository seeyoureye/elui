// 权限
import requests from './request';

let url=`http://127.0.0.1:8888/api/private/v1`;
// 获得权限列表
export const getRights = (type)=>requests({url:`${url}/rights/${type}`})
// 添加角色
export const addRoles = (data)=>requests({method:'POST',url:`${url}/roles`,data})
// 查询角色
export const queryRole = (id)=>requests({url:`${url}/roles/${id}`})
// 提交编辑角色
export const submitEditRole = (id,data)=>requests({method:"PUT",url:`${url}/roles/${id}`,data})
// 角色授权
export const updataposition = (roleid,rids)=>requests({method:'POST',url:`${url}/roles/${roleid}/rights`,data:{rids}})
// 删除角色
export const deleteRole = (id)=>requests({method:'DELETE',url:`${url}/roles/${id}`})
// 删除角色指定权限
export const removeRolePower = (roleId,rightId)=>requests({method:'DELETE',url:`${url}/roles/${roleId}/rights/${rightId}`})