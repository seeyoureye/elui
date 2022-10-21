<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <!-- 头部 -->
      <div slot="header">
        <el-button type="primary" size="default" @click="openAndCloseDialog('open','addRoleIsShow')">添加角色</el-button>
      </div>
      <!-- 主要显示区域 -->
      <el-table :data="rolesList" border stripe>
        <!-- 表格 -->
        <template>
            <ListBody @openAndCloseDialog="openAndCloseDialog"  @queryRoleForId="queryRoleForId" @getPowerTreeList="getPowerTreeList" />
        </template>
      </el-table>
    </el-card>
    <!-- 添加角色 -->
    <addRoleDialog :addRoleIsShow='addRoleIsShow' @openAndCloseDialog="openAndCloseDialog" />
    <!-- 编辑角色 -->
    <EditRoleDialog v-if="editRoleIsShow.isShow" :editRoleIsShow='editRoleIsShow' :roleForIdData="roleForId" @openAndCloseDialog="openAndCloseDialog" />
    <!-- 分配权限  v-if="setRolesIsShow.isShow" -->
    <SetRolePower v-if="setRolesIsShow.isShow" :setRolesIsShow="setRolesIsShow" :powerListData="powerListData"  @openAndCloseDialog="openAndCloseDialog" />
  </div>
</template>
<script>
import ListBody from "./listBody/index.vue";
import addRoleDialog from './addRoleDialog';
import EditRoleDialog from "./editRoleDialog/index.vue";
import SetRolePower from "./setRolePower/index.vue";
export default {
  name: "myList",
  mounted() {
    this.getdata();
  },
  data() {
    return {
      rolesList: [],//显示的列表
      addRoleIsShow:{isShow:false},//是否显示添加角色页面
      editRoleIsShow:{isShow:false},//是否显示编辑角色页面
      setRolesIsShow:{isShow:false},//是否显示配置权限页面
      roleForId:{},//用 id 查询到的角色信息 用于编辑界面的使用
      powerListData:{
        powerList:[],//权限树状结构数组
        itemPowList:[],
        id:''
    },
    };
  },
  methods: {
    // 获取信息
    async getdata() {
      let { data: res } = await this.$API.users.getRolesList();
      if (res.meta.status == 200) {
        this.rolesList = res.data;
      } else {
        this.myalert("网络异常,请稍后重试", "warning");
      }
    },
    //控制显示/隐藏的函数  a 动作 b 操作的数据
    openAndCloseDialog(action,data){
      //如果是删除,不需要做任何事情 直接删除即可 没有要开关的弹出层 
      if(action == 'delete' || action == 'update'){
          this.getdata()
          return
        }
        //不是打开就全都是关闭 然后再 关闭内部 再细分 是否需要获取最新的数据
        if(action == 'open'){
            this[data].isShow = true
        }else{
            this[data].isShow = false
            //请求成功,重新获取数据
            if(action == 'success'){
                this.getdata()
            }
        }
    },
    // 用 id 查询角色
    async queryRoleForId(id){
        let {data:res} = await this.$API.rights.queryRole(id)
        if(res.meta.status==200){
            this.roleForId = res.data
        }else{
            this.myalert("网络异常,请稍后重试", "warning");
        }
    },
    //权限列表所需的函数
    async getPowerTreeList(itemPowList,id){
      //先清空后获取
      this.powerListData.powerList =[]
      this.powerListData.itemPowList = []
        let {data:res} = await this.$API.rights.getRights('tree')
            if(res.meta.status==200){
                this.powerListData.powerList = res.data
                this.powerListData.itemPowList = itemPowList
                this.powerListData.id = id
                //父级调用子级方法,感觉不是很严谨 但是这种实现的最快
                this.$children[2].getDefaultTree(itemPowList)
            }else{
              this.myalert('网络异常,请稍后重试','warning')
            }
    }

  },
  components: { ListBody, addRoleDialog, EditRoleDialog, SetRolePower },
};
</script>

<style lang="less" scoped>
    .el-row {
        margin: 10px;

    }
    .bdbotton{
        border-bottom: 1px solid #eee;
    }
    .bdtop{
        border-top: 1px solid #eee;
    }
    .setLeft{
        padding-left: 50px;
    }
</style>