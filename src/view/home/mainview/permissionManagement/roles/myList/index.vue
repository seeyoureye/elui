<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <!-- 头部 -->
      <div slot="header">
        <el-button type="primary" size="default" @click="openAndCloseDialog('open','addRoleIsShow')">添加角色</el-button>
      </div>
      <!-- 主要显示区域 -->
      <!-- 后续编辑 : 
        这里其实写的不对,我应该是子页面里面有个el-table,而不是表格里面套一个子组件这样挺乱的,作为早期拆分的结果,不是很成熟 不过居然他妈实现了
      -->
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
      // 后续编辑 : 现在让我弄,我会把这3个弄成一个数组,使用时就是 RoleInfo[0], RoleInfo[1], RoleInfo[2] 这样更加简洁
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
    // 后续编辑 : 这是又一次出现了高度相似的方法,其实我当时就有想过,要不要放在原型上 但是实在是不同页面上,不一样,比如现在关闭的是个dialog 以后关闭的就是其他内容了,未必有个 show 需要你去开关, 或者是否获取请求...这我也考虑过,因为再怎么样你写两个一个关闭dialog一个关闭其他的也比重复出现要好,再说有几个人会翻你那些工具方法代码 当时的我并不知道应该怎么处理,所以我就搁置了
    openAndCloseDialog(action,data){
      //如果是删除,不需要做任何事情 直接删除即可 没有要开关的弹出层 
      // 后续编辑 : 早期这个代码内部和之前一模一样,后续又多增加了一个功能,当动作是 delete / update ,我就得做出其他行为 所以我并不知道如何复用
      // 后续编辑 : 这个 delete / update ,大部分是用不上的 仅仅在这里而已
      // 后续编辑 : 复用的时候有完全用不上的代码真的很奇怪,或许应该把底下那一段复用,然后本地化的处理单独出来
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