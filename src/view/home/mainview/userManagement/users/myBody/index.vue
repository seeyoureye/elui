<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <!-- 搜索框 以及添加用户按钮-->
      <div slot="header">
        <BodyHeader @toQuery="toQuery" @openOrCloseDialog="openOrCloseDialog" />
      </div>
      <!-- card body 表格-->
      <div class="card_body">
        <!-- 数据展示区域 -->
        <MyTable :userList="userList"  @deleteUserMethod='deleteUserMethod' @openOrCloseDialog="openOrCloseDialog" />
      </div>
      <!-- 底部 分页器-->
      <div class="card_footer">
        <!-- 分页器 -->
        <MyPagination
          :paginationData="paginationData"
          @changeSize="sizeChange"
          @changeCurrent="currentChange"
        />
      </div>
    </el-card>
    <!-- 添加用户的界面 -->
    <addUserDialog :addUserData='addUserData' @openOrCloseDialog='openOrCloseDialog'/>
    <!-- 编辑用户的界面 -->
    <EditUserInfoDialog v-if="editUserData.isShow" :editUserData='editUserData' @openOrCloseDialog="openOrCloseDialog" />
    <!-- 分配用户角色的界面 -->
    <SetUserRoles v-if="setUserRolesData.isShow" :setUserRolesData="setUserRolesData" @openOrCloseDialog="openOrCloseDialog" />
  </div>
</template>

<script>
import MyTable from "./myTable/index.vue";
import MyPagination from "@/components/myPagination/index.vue";
import BodyHeader from "./bodyHeader/index.vue";
import addUserDialog from "./addUserDialog/index.vue";
import EditUserInfoDialog from "./editUserInfoDialog/index.vue";
import SetUserRoles from "./setUserRoles/index.vue";
export default {
  name: "myBody",
  data() {
    return {
        //users 表格数据
      userList: [],
      //分页器的数据
      paginationData: {
        current: 1,
        pageSizes: [2, 3, 4],
        size: 2,
        layout: "total, sizes, prev, pager, next, jumper",
        total: 0, //总数
      },
      //添加用户的配置信息
      addUserData:{
        //添加 user 的弹出层是否显示
        isShow:false
        },
      //修改用户
      editUserData:{
        isShow:false
      },
      //分配用户权限
      setUserRolesData:{
        isShow:false
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    //发送请求获取数据
    async getData(query) {
      let { current, size } = this.paginationData;
      let params ;
      if(query){
         params = {pagenum:current,pagesize:size,query}
      }else{
         params = {pagenum:current,pagesize:size}
      }
      let { data: res } = await this.$API.users.getUserPageInfo(params);
      if (res.meta.status == 200) this.setData(res.data);
    },
    //设置请求返回过来的数据
    setData(data) {
      this.paginationData.current = data.pagenum; //设置当前页
      this.paginationData.total = data.total; //总共多少数据
      this.userList = data.users;
    },
    //响应分页器的两个回调 变化时,发起请求
    sizeChange(size) {
      this.paginationData.size = size;
      this.getData();
    },
    currentChange(current) {
      this.paginationData.current = current;
      this.getData();
    },
    //自定义方法,父子通信 传递 input 的关键字
    toQuery(keyword) {
      //有关键字
      if (keyword) {
        this.getData(keyword);
      } else {
        //没有关键字
        this.paginationData.current = 1; //回到第一页
        this.getData(); //获取数据
      }
    },
    //打开或者关闭的回调,用 string 的不同数据 0 1 也可以,总之用来判断是打开还是关闭
    // type 用来判断是什么 动作 obj 则是改变哪个 dialog 的显示/隐藏
    openOrCloseDialog(type,obj){
        //点击添加的时候,打开
        if(type=='open'){
            this[obj].isShow=true
        //取消/确认的时候关闭, 除了打开其实都是关闭 所以可以在 else 直接写,但是在 add 的时候是需要发送请求的
        }else{
          this[obj].isShow = false
        //如果是 添加 或者是 修改
        if(type=='add' || type=='edit'){
            //拉取新的数据
            this.getData()
        }
        }
    },
    //删除时重新发送请求,如果当前显示小于 1 删除时 让当前页 自减 1 是不是可以用 num-- 算了
    deleteUserMethod(){
        if(this.userList.length==1){
            this.paginationData.current = this.paginationData.current-1
        }
        this.getData()
    }
  },
  //组件
  components: { MyTable, MyPagination, BodyHeader, addUserDialog, EditUserInfoDialog, SetUserRoles },
};
</script>

<style scoped>
.el-card {
  margin-top: 30px;
}
</style>