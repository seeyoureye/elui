//引入 vuex
import Vuex from 'vuex';
//引入要外部的子文件
import Vue from 'vue';
import user from './user';
import addGoods from './addGoods';
Vue.use(Vuex)
export default new Vuex.Store({
    modules:{
        user,
        addGoods,
        //注册
    }
})