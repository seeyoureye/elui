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
          <!-- 后续编辑 : 
            这个删除弹个气泡,然后是否确认是该做成个组件的,因为是有复用的必要
            当时确实是省事了,导致后续没有再出现这个东西因为我嫌麻烦
            而且这里面我有点强行了, 3个按钮都是我封装的,这很好 没什么问题 
            但是出现在 气泡组件的就有点没必要了,以后这里要注意 因为过度的封装就不便于阅读了
          -->
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
        // 后续编辑 : 这里是封装的第一次体验,我封装了3个button 其实已经有了雏形, 我都想到了用对象套对象 怎么不直接用数组呢,v-for直接生成3个不就行了
        // 后续编辑 : 不过后续就这样使用了,也算是一步一个脚印吧,只不过有点走偏执了
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