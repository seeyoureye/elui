<template>
  <div>
    <!-- 三个交互按钮 编辑 删除 分配权限 -->
    <el-table-column label="操作" :width="labelwidth">
      <template slot-scope="{row}"
        ><!--  -->
        <div>
          <!-- 编辑按钮 -->
          <MyButton :buttonData="buttonData.edit"  @click.native="onclick(row,'edit')" />
          <!-- 删除 -->
          <el-popconfirm
            title="是否删除"
            confirmButtonText="确认"
            cancelButtonText="取消"
            confirmButtonType="primary"
            cancelButtonType="text"
            icon="el-icon-question"
            iconColor="#f90"
            @confirm="onclick(row,'delete')"
            :hideIcon="false">
          <MyButton  slot="reference" :buttonData="buttonData.delete"/>
          </el-popconfirm>
          <!-- 分配权限 -->
          <MyButton :buttonData="buttonData.setRole" @click.native="onclick(row,'setting')" />
        </div>
      </template>
    </el-table-column>
    <!-- 下拉 -->
    <el-table-column type="expand">
      <template slot-scope="{ row }"
        ><!-- slot-scope="{row}" -->
        <SubPage :item="row" :subPagedata="row.children" @ifRemoveRolesPower="ifRemoveRolesPower" />
      </template>
    </el-table-column>
    <!-- 序号 -->
    <el-table-column
      prop="prop"
      type="index"
      label="#"
      align="center"
      width="80px"
    >
    </el-table-column>
    <!-- 角色名称 -->
    <el-table-column
      prop="roleName"
      key="id"
      label="角色名称"
      :width="labelwidth"
    >
    </el-table-column>
    <!-- 角色描述 -->
    <el-table-column prop="roleDesc" label="角色描述" :width="labelwidth">
    </el-table-column>
  </div>
</template>

<script>
import MyButton from "@/components/myButton/index.vue";
import SubPage from "./subPage/index.vue";

export default {
  name: "listBody",
  data() {
    return {
      buttonData: {
        //button封装的信息
        edit: {
          type: "primary",
          icon: "el-icon-edit",
          text: "编辑",
          isDelete:false,

        },
        delete: {
          type: "danger",
          icon: "el-icon-delete",
          text: "删除",
          isDelete:true
        },
        setRole: {
          type: "warning",
          icon: "el-icon-setting",
          text: "分配权限",
          isDelete:false,
        },
      },
      labelwidth: "373px", //设置的统一宽度

    };
  },
  methods:{
    //响应三个按钮的回调
     onclick({id,children},action){
          //编辑 分配要打开弹出层 删除给个气泡提示信息即可
          if(action == 'edit'){
                this.$emit('queryRoleForId',id);
                //请求如果成功,才打开页面
                this.$emit('openAndCloseDialog','open','editRoleIsShow')
          }else if( action == 'setting'){
            this.$emit('getPowerTreeList',children,id)
            this.$emit('openAndCloseDialog','open','setRolesIsShow')
          }else if(action == 'delete'){
            //这里就是删除了 删除角色只需要 id
            this.sendReq(id)
          }
        },
    // 发送请求 删除角色
    async sendReq(id){
      let {data:res} = await this.$API.rights.deleteRole(id)
      if(res.meta.status==200){
        this.myalert(res.meta.msg,'success')
        this.$emit('openAndCloseDialog','delete')
      }else{
        this.myalert('网络异常,请稍后重试','danger')
      }
    },
      ifRemoveRolesPower(){
        this.$emit('openAndCloseDialog','update')
        
      }
  },
  props: {
    roleName: String,
    roleDesc: String,
  },
  components: { MyButton,SubPage },
};
</script>

<style>
</style>