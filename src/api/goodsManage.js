// 商品分类
import requests from './request';

let url=`http://127.0.0.1:8888/api/private/v1`
// 获取 商品分类列表
export const getCategoriesList = (pagenum,pagesize,type)=>requests({url:`${url}/categories`,params:{pagenum,pagesize,type}})
// 添加分类 
export const addClass = (data)=>requests({method:'POST',url:`${url}/categories`,data});
// 删除分类
export const deleteCategoriesForId = (id,type='DELETE',data)=>requests({method:type,url:`${url}/categories/${id}`,data})
// 通过 id 获取商品分类 因为获取地址和上面删除一样 
// 只是 method 请求方法不同,所以小改一下 让删除原封不动,但是下面可以复用 复用的时候只需要修改 type
export const getClassForId =(id,type)=>deleteCategoriesForId(id,type);
// 提交编辑分类
export const submitEditInfo = (id,type,data)=>deleteCategoriesForId(id,type,data);

// 分类参数
// 参数列表
export const onlyOrManyforTpye = (id,sel)=>requests({url:`${url}/categories/${id}/attributes`,params:{sel:sel}})
// 添加属性 动态/静态 分类 id , data{ 参数名称,参数类型,参数内容 }
export const addAttributeForType = (id,data)=>requests({method:'POST',url:`${url}/categories/${id}/attributes`,data})
// 删除参数 只需要两个参数 分类 id 和参数 id 
export const removeParam = (id,attr_id)=>requests({method:'DELETE',url:`${url}/categories/${id}/attributes/${attr_id}`})
// 编辑参数
export const editAttrParams = (id,attrId,data)=>requests({method:'PUT',url:`${url}/categories/${id}/attributes/${attrId}`,data})

// 商品管理
// 商品列表数据
export const getGoodsList = ({pagenum,pagesize,query})=>requests({url:`${url}/goods`,params:{pagenum,pagesize,query}})
// 添加商品 
export const getAddGoods = (data)=>requests({method:"POST",url:`${url}/goods`,data})
// 根据 id 获取商品信息
export const getItemGoodsInfo =(id)=>requests({url:`${url}/goods/${id}`})
// 删除商品
export const deleteItemGoods = (id) =>requests({method:'DELETE',url:`${url}/goods/${id}`})
// 编辑商品
export const editItemGoods = (id) => requests({method:`PUT`,url:`${url}/goods/${id}`})

