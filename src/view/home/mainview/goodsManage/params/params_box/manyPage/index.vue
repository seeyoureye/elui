<template>
  <!-- 动态参数子页面 -->
  <div class="manyPage" >
    <ChildrenPage 
      :data="{
        myHeaderButtonData,
        formData,
        columns,
        editAndDelete,
        myAddDialog,
        myEditDialog,
        editNeedData
      }"
      :type="type"
      @SharePageDialogMethod="SharePageDialogMethod"
      @onClick="onClick"
    />
  </div>
</template>

<script>
import ChildrenPage from '../childrenPage/index.vue';
export default {
    name: "manyPage",
    props: {
        type: String,
        id:Number
    },
    data() {
        return {
            //一般来说,肯定是知道这个页面是什么类型的,不然怎么开发
            //但是既然可以从父组件传递进来,那就多此一举一次吧,
            //type:''
            //传入 button 需要的  数据 这是顶部的单独一个按钮的数据
            myHeaderButtonData: {
                type: "primary",
                icon: "",
                text: "添加参数",
                disabled:true,//一开始是不能点的,如果获得了数据 在 watch 中 让它变成 false 可以点击
            },
            // 表格数据
            formData:[],
            //表格 v-for 要的信息
            columns:[
              {
                label:'#',
                type:'index',
              },
              {
                label:'参数名称',
                prop:'attr_name',

              },
              {
                label:'操作',
                template:'template',
                id:'cat_id'

              },
            ],
            // 表格中的按钮
            editAndDelete:[
              {
                type: "primary",
                icon: "el-icon-edit",
                text: "修改"
              },
              {
                type: "danger",
                icon: "el-icon-delete",
                text: "删除"
              },
            ],
            myAddDialog:false,//控制弹出层添加
            myEditDialog:false,
            editNeedData:{},
        };
    },
    methods:{
      onClick(itemInfo,type){
        if(type=='删除'){
          let {cat_id,attr_id} = itemInfo
          this.pageShareRemoveItem(cat_id,attr_id);
        }else if(type=='修改'){
          this.editNeedData = itemInfo;
          this.myEditDialog = true;
        }
      },
      //两个子页面的 dialog 共用一个关闭和开启的方法 因为只能同时打开一个页面所以是可以共用的
      SharePageDialogMethod(action,obj,value){
        if(action=='open'){
          this[obj] = true;
        }else{
          if(action=='add'){
            this.pageShareDialogAdd(value);
          }else if(action == 'edit'){
            this.getDataList(this.id)
          }
          this[obj] = false
        }
      },
    },
    watch: {
      //监听传入的 prop 属性 如果发生变化,发送请求获取数据
      id:function(nowV,oldV){
        //没有值不做反应
        if(!nowV){
          return
        }
        this.getDataList(nowV)
      }
    },
    components: {ChildrenPage }
}
</script>

<style>

</style>