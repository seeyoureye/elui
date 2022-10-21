<template>
  <el-dialog
    title="编辑角色"
    :visible.sync="editRoleIsShow.isShow"
    width="40%"
    @close="closeDialog('close')">
    <el-form :model="roleForIdData" ref="form" label-width="80px" :inline="false" size="normal">
        <el-form-item label="角色名称">
            <el-input v-model="roleForIdData.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
            <el-input v-model="roleForIdData.roleDesc"></el-input>
        </el-form-item>
    </el-form>
    <span slot="footer">
        <el-button @click="closeDialog('close')">取消</el-button>
        <el-button type="primary" @click="onSubmit">OK</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
    name:'editRoleDialog',
    props:{
        editRoleIsShow:Object,
        roleForIdData:Object,
    },
    data() {
        return {
            data:{},
        }
    },
    mounted() {
        this.data = this.roleForIdData
    },
    methods:{
        //关闭 dialog
        closeDialog(action){
            this.$emit('openAndCloseDialog',action,'editRoleIsShow')
        },
        onSubmit(){
            let {roleId,roleName,roleDesc} = this.roleForIdData
            this.sendReq(roleId,{roleName,roleDesc})
        },
        async sendReq(id,data){
            let {data:res} = await this.$API.rights.submitEditRole(id,data)
            if(res.meta.status==200){
                this.myalert('更新角色信息成功','success')
                this.closeDialog('success')
            }else{
                this.myalert('网络异常,请稍后重试','danger')
                this.closeDialog('close')
            }
        }
    }
}
</script>

<style>

</style>