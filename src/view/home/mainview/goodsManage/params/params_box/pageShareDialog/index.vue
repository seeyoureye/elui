<template>
    <!-- 弹出层,两个页面共用 -->
  <el-dialog
      :title="type == 'many' ? '添加动态参数' : '添加静态属性'"
      :visible.sync="mydialog"
      width="35%"
      @close="closeDialog"
     ><!--  @close="" -->
        <el-form :model="form" ref="SharePageform" :rules="rules" label-width="90px" :inline="false" size="normal">
            <el-form-item :label="type == 'many' ? '动态参数:' : '静态属性:'" prop="keyword">
                <el-input v-model="form.keyword"></el-input>
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
        mydialog:Boolean
    },
    data() {
        return {
            form:{
                keyword:''
            },
            rules:{
                keyword:[{required:true,message:'内容不能为空',trigger:'blur'}],
            }
        }
    },
    methods: {
        // 确认
        async onSubmit(){
            //验证规则
            let res = await this.$refs.SharePageform.validate()
            if(res){//没问题之后,把数据传过去
            this.$emit('SharePageDialogMethod','add','myAddDialog',this.form.keyword);
            }

        },
        // 取消/关闭
        closeDialog(){
            this.$refs.SharePageform.resetFields();
            this.$emit('SharePageDialogMethod','close','myAddDialog');
        }
    },
}
</script>

<style>

</style>