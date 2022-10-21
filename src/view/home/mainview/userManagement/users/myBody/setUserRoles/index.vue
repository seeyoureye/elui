<template>
  <el-dialog
    title="修改用户权限"
    :visible.sync="setUserRolesData.isShow"
    width="40%"
    @close="closeDialog('close')"
    >
    <span>用户名称:</span><span style="margin-left:10px">{{userDataobj.username}}</span>
    <p></p>
    <el-select  style="margin:50px" v-model="userDataobj.rid" value-key="userDataobj.rid" placeholder=" 请选择角色" clearable filterable>
        <el-option v-for="item in rolesList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id">
        </el-option>
    </el-select>
    <span slot="footer">
        <el-button @click="closeDialog('close')">取消</el-button>
        <el-button type="primary" @click="onSubmit">确认</el-button>
    </span>
  </el-dialog>
  
</template>

<script>
export default {
    name:'setUserRoles',
    props:{
        setUserRolesData:Object
    },
    data() {
        return {
            userDataobj:{},
            rolesList:[]
        }
    },
    mounted() {
        let id = this.$store.getters.setRolesId;
        this.getData(id)
    },
    methods:{
        //获取数据 用户和 roles 的信息
        getData(id){
            this.userData(id);
            this.rolesData()
        },
        //获取用户信息
        async userData(id){
            let {data:res} = await this.$API.users.searchUser(id)
            if(res.meta.status == 200){
                this.userDataobj = res.data
            }else{
                this.myalert('获取信息失败,请稍后重试','danger')
            }
        },
        //获取 roles 信息
        async rolesData(){
            let {data:res} = await this.$API.users.getRolesList()
            if(res.meta.status==200){
                this.rolesList = res.data
            }else{
                this.myalert('获取失败,请稍后重试','warning')
            }
        },
        //关闭
        closeDialog(action){
            this.$emit('openOrCloseDialog',action,'setUserRolesData')
        },
        //确认/提交
        async onSubmit(){
            let {id,rid} = this.userDataobj
            let {data:res} = await this.$API.users.setUsePower(id,rid)
            if(res.meta.status==200){
                this.myalert('修改用户权限成功','success')
                this.closeDialog('edit')
            }else{
                this.myalert('网络异常,请稍后重试','danger')
                this.closeDialog('close')
            }
        },
    }

}
</script>

<style>

</style>