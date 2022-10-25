<template>
  <el-table :data="userList" border stripe>
            <!-- 索引列 -->
            <el-table-column 
                prop="prop"
                label="#"
                width="50px"
                type="index"
            >
            </el-table-column>
            <!-- 名称 -->
            <el-table-column 
                prop="username"
                label="姓名">
            </el-table-column>
            <!-- 邮箱 -->
            <el-table-column 
                prop="email"
                label="邮箱">
            </el-table-column>
            <!-- 电话 -->
            <el-table-column 
                prop="mobile"
                label="电话">
            </el-table-column>
            <!-- 权限 -->
            <el-table-column 
                prop="role_name"
                label="角色">
            </el-table-column>
            <!-- 一个是否勾选是展示 -->
            <el-table-column 
                prop="prop"
                label="状态">
                <template slot-scope="{row}">
                    <el-switch v-model="row.mg_state" :active-value="true" :inactive-value="false" @change="setState(row)">
                    </el-switch>
                </template>
            </el-table-column>
            <!-- 编辑 删除 重新分配权限的设置 -->
            <el-table-column 
                prop="prop"
                label="操作">
                <template slot-scope="{row}">
                    <div>
                        <el-button title="编辑角色" type="primary" size="mini" @click="editUseritem(row)" class="el-icon-edit"></el-button>
                        <el-button title="删除角色" type="danger" size="mini" @click="deleteUser(row)" class="el-icon-delete"></el-button>
                        <el-button title="分配角色" type="warning" size="mini" @click="setRoles(row)" class="el-icon-setting"></el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
</template>

<script>
export default {
    name:'myTable',
    props:{
        userList:Array
    },
    methods:{
        //编辑用户信息
        editUseritem({id}){
            //点击打开页面
            this.$emit('openOrCloseDialog','open','editUserData');
            this.$store.dispatch('getId',id)
        },
        //修改状态
        async setState(row){
            let {id,mg_state} = row
            // 要的值 居然是 true /false 不需要转数值
            //let state = mg_state ? 1 : 0
            let {data:res} = await this.$API.users.setUserItemState(id,mg_state)
                //修改成功弹一个提示
                if(res.meta.status==200){
                    //封装的 $message(a,b) a 是 text b 是 type
                    this.myalert(res.meta.msg,'success')
                }else{
                this.myalert();
                }

        },
        //删除用户,删除之后重新获取数据
        async deleteUser({id}){
            //因为组件包了好几层 直接使用 $parent 已经不是指向父级了 那还是自定义属性吧
            let {data:res} = await this.$API.users.deleteUser(id)
            if(res.meta.status==200){
                this.myalert(res.meta.msg,'success')
                //this.$parent.getData()
                this.$emit('deleteUserMethod')
            }else{
                this.myalert('网络异常,请稍后重试','warning')
            }

        },
        //分配用户角色
        setRoles({id}){
            //同样,往 vuex 里面放,然后根据 id 获取数据
            this.$store.dispatch('setroles',id)
            this.$emit('openOrCloseDialog','open','setUserRolesData')
        }

    }
}
</script>

<style>

</style>