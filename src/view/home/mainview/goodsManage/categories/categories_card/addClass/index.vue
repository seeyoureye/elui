<template>
  <el-dialog
      title="添加分类"
      :visible.sync="addClassData.isShow"
      width="40%"
      @close="closeButton('close')">
        <el-form :model="addClassForm" ref="form" :rules="addClassRules" label-width="80px" :inline="false" size="normal">
            <el-form-item label="分类名称" prop="name" >
                <el-input v-model="addClassForm.cat_name"></el-input>
            </el-form-item>
            <el-form-item label="父级分类" >
                <el-cascader style="width:100%" ref="cascaderRef"  :options="addClassData.dataList" v-model="selectedKeys" clearable filterable 
                    :props="defaultParams" @change="$refs.cascaderRef.dropDownVisible=false" ><!-- @change="" -->
                </el-cascader>
            </el-form-item>
        </el-form>
      <span slot="footer">
        <el-button @click="closeButton('close')">取消</el-button>
        <el-button type="primary" @click="AddClassOnSubmit">确认</el-button>
      </span>
    </el-dialog>
</template>

<script>
export default {
    name:'addClass',
    props:{
        addClassData:Object
    },
    data() {
        return {
            defaultParams:{
                label:'cat_name',
                value:'cat_id',
                children:'children',
                expandTrigger: 'hover',
                checkStrictly:true
            },
            addClassForm:{
                cat_name:'',//要添加的分类名称
                cat_pid:0,//父级分类的 id
                cat_level:0,
            },
            selectedKeys:[],//级联选择器,收集的数据
            addClassRules:{
                name:[
                ]
            }
        }
    },
    methods:{
        AddClassOnSubmit(){
            let {cat_name,cat_pid,cat_level} = this.addClassForm;
            //只选中了 1 级
            if(this.selectedKeys.length == 1){
                //获取1 级分类的 id
                cat_pid = this.selectedKeys[0];
            }else if(this.selectedKeys.length == 2){
                cat_pid = this.selectedKeys[1];
            }
            //分类层级,空 是 length = 0 一级, length = 1 是二级 length = 2 是三级
            cat_level = this.selectedKeys.length;// 完成
            if(cat_level==0){
                cat_pid = 0;
            }
            this.sendReq({cat_name,cat_pid,cat_level})
        },
        async sendReq(dataobj){
            let {data:res} = await this.$API.goods.addClass(dataobj)
            if(res.meta.status==201){
                this.myalert('创建成功','success')
                this.closeButton('success')
            }else{
                this.myalert(' 网络异常,请稍后重试','warning')
                this.closeButton('close')
            }
        },
        closeButton(action){
            this.$emit('closeOropen',action,'addClass')
        
        }
    },
    watch: {
        
    },

}
</script>

<style lang="less">
.el-cascader-panel .el-radio {
    width: 100%;
    height: 100%;
    z-index: 10;
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .el-cascader-panel .el-radio__input {
    visibility: hidden;
  }
    /* 这个样式针对IE有用，不考虑IE的可以不用管*/
  .el-cascader-panel .el-cascader-node__postfix {
    top: 10px;
  }
</style>
