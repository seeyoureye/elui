<template>
    <!-- 弹出层,两个页面共用 -->
  <el-dialog
      :title="'编辑'+ (type == 'many' ? '动态参数' : '静态属性')"
      :visible.sync="mydialog"
      width="35%"
      @close="closeDialog"
     ><!--  @close="" -->
        <el-form :model="form" ref="editSharePageForm"  label-width="90px" :inline="false" size="normal">
            <el-form-item :label="type == 'many' ? '动态参数:' : '静态属性:'" prop="keyword">
                <el-input v-model="form.attr_name"></el-input>
            </el-form-item>
        </el-form>
      <span slot="footer">
        <el-button @click="closeDialog">取消</el-button><!-- @click=" = false" -->
        <el-button type="primary" @click="onSubmit">确认</el-button><!--  @click="" -->
      </span>
    </el-dialog>
</template>

<script>
export default {
    name:'pageShareDialog',
    props:{
        type:String,
        mydialog:Boolean,
        editItemData:Object
    },
    mounted(){
        this.form.attr_name = this.editItemData.attr_name;
    },
    data() {
        return {
            editData:{},
            form:{
                attr_name:''
            },
           
        }
    },
    methods: {
        // 确认 然后发送请求
        onSubmit(){
                // 收集所需数据
                let id = this.editItemData.cat_id;
                let {attr_id,attr_sel,attr_vals} = this.editItemData;
                let attr_name = this.form.attr_name;
                //方法在原型上 因为两个页面共用
                this.SharePageEdit(id,attr_id,{attr_name,attr_sel,attr_vals})

        },
        // 取消/关闭
        closeDialog(){
            this.$emit('SharePageDialogMethod','close','myEditDialog');
        }
    },
}
</script>

<style>

</style>