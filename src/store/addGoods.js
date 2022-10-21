const state ={
    dataObj:{
        goods_name:'',//名称
        guuds_cat:'',//3级分类
        goods_price:'',//价格
        goods_number:'',//数量
        goods_weight:'',//重量
        goods_introduce:'',//描述
        pics:[],//图片
        attrs:[],//属性
    },//一整个对象,里面放所有的内容,然后到时候拆分,如果过大 再拆分吧,一个方便传输
    //goNext:false,//默认状态禁止跳转  sb你没用了
}

const mutations={
    //修改状态,为 true 就允许跳转,跳转完毕再 重置 比如说 mounted?反正初始值一定得是 false 不能不做验证就跳转
    /* SETSTATE(state,value){
        state.goNext = value
    }, */
    // 设置全部对象属性
    GETBASICSDATA(state,value){
       Object.assign(state.dataObj,value);
       //用合并是为了不破坏结构,覆盖
    },
    //push 上传成功的图片
    GETIMGURL(state,value){
        state.dataObj.pics.push(value);
    },
    // push 商品参数
    GETGOODSATTRLIST(state,value){
        state.dataObj.attrs.push(...value);
    },
    // 富文本编辑器的内容添加
    GETTEXTBOX(state,value){
        state.dataObj.goods_introduce = value;
    },
    // 如果是编辑 
    EDITGOODS(state,value){
        state.dataObj = value
    }
}

const actions = {
    //修改状态,为 true 就允许跳转,跳转完毕再改为 false
   /*  setGoNextPage({commit},value){
        commit('SETSTATE',value)
    }, */
    // 第一个页面 五个基础信息
    getBasicsData({commit},obj){
        commit('GETBASICSDATA',obj)
    },
    // 图片链接
    getImgUrl({commit},obj){
        commit('GETIMGURL',{pic:obj.tmp_path})
    },
    // 属性列表
    getGoodsAttrList({commit},arr){
        commit('GETGOODSATTRLIST',arr)
    },
    // 富文本编辑器
    getTextBox({commit},value){
        commit('GETTEXTBOX',value)
    },
    // 编辑的时候
    editGoods({commit},value){
        commit('EDITGOODS',value)
    }
}

const getters = {
    /* getNavState(state){
        return state.goNext
    }, */
}
// 暴露
export default  {
    state,
    mutations,
    actions,
    getters
}
