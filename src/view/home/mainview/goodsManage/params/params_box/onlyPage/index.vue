<template>
  <!-- 静态属性页面  做了个判断,我给 id 的初始值是 -1 其实是不严谨的 应该乱写一个什么时间戳之类的 然后只要不等于它都是 true 反正是要获取数据的-->
  <div class="onlyPage" >
    <!-- 复用了两次,好别扭 -->
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
import MyButton from '@/components/myButton/index.vue';
import TableInItemTree from '../manyPage/tableInItemTree/index.vue';
import PageShareDialog from '../pageShareDialog/index.vue';
import EditPageShare from '../editPageShare/index.vue';
import ChildrenPage from '../childrenPage/index.vue';
export default {
    name: "onlyPage",
    props: {
        type: String,
        id:Number
    },
    data() {
      return {
            //顶部按钮
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
      }
    },
    methods: {
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
      onClick(itemInfo,type){
        if(type=='删除'){
          let {cat_id,attr_id} = itemInfo
          this.pageShareRemoveItem(cat_id,attr_id);
        }else if(type=='修改'){
          this.editNeedData = itemInfo;
          this.myEditDialog = true;
        }
      },
    },
    watch:{
      id:function(nowV,oldV){
        this.getDataList(nowV);
      }
    },
    components: { MyButton, TableInItemTree, PageShareDialog, EditPageShare, ChildrenPage }
}
</script>

<style>

</style>