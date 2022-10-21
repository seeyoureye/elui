import Vue from 'vue';
import App from './App.vue';//子页面
import router from '@/router';//路由
import store from './store';//vuex
//import ElementUI from 'element-ui';完整引入
import '@/plugins/element-ui';//按需引入/同时写了小部分的原型方法
import 'element-ui/lib/theme-chalk/index.css';//样式
import TreeTable from 'vue-table-with-tree-grid';//引入插件 树状结构表格
import API from '@/api/index';// 所有的axios请求
import VueQuillEditor from 'vue-quill-editor';//富文本编辑器
//导入样式 富文本编辑器 
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
//导入进度条,发请求的时候需要的东西 想了一下,还是写在 axios 的封装中
//import Nprogress from 'nprogress';
//import 'nprogress/nprogress.css';
Vue.component('tree-table',TreeTable);
// 注册富文本编辑器
Vue.use(VueQuillEditor);
Vue.prototype.$API = API;//挂载到原型链上
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
