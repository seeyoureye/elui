<template>
      <el-dialog
        title="添加角色"
        :visible="addRoleIsShow.isShow"
        width="30%"
        @close="closeDialog">
        <!-- 中间的填写部分 -->
        <el-form :model="data" ref="form"  label-width="80px" :inline="false" size="normal">
            <el-form-item label="角色名称" :required="true">
                <el-input v-model="data.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" :required="true">
                <el-input v-model="data.roleDesc"></el-input>
            </el-form-item>
        </el-form>
        <!-- 底部 -->
        <span slot="footer">
            <el-button @click="closeDialog">取消</el-button>
            <el-button type="primary" @click="onsubmit">添加</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name:'addRoleDialog',
    props:{
        addRoleIsShow:Object
    },
    data() {
        return {
            data:{
                roleDesc:'',
                roleName:''
            }
        }
    },
    methods:{
        //关闭 dialog
        closeDialog(){
            this.$emit('openAndCloseDialog','close','addRoleIsShow');
            this.data = {
                roleDesc:'',
                roleName:''
            }
        },
        //确认 简单校验一下是否填写内容
        onsubmit(){
            let {roleDesc,roleName} = this.data
            if(!roleDesc && !roleName){
                this.myalert('用户名和角色描述不能为空','warning')
            }else if(!roleDesc){
                this.myalert('角色描述不能为空','warning')
                
            }else if(!roleName){
                this.myalert('角色名称不能为空','warning')
                
            }else{
                this.sendReq(roleDesc,roleName)
            }
            //addRoles
        },
        //发送请求
        async sendReq(roleDesc,roleName){
            let {data:res} = await this.$API.rights.addRoles({roleDesc,roleName})
            if(res.meta.status==201){
                this.myalert('添加角色成功','success')
                this.$emit('openAndCloseDialog','success','addRoleIsShow');
            }else{
                this.myalert('网络异常,请稍后重试','danger')
                this.closeDialog()
            }
        }
    }

}
</script>

<style>

</style>