<template>
  <el-aside :width="NavWidth">
    <div class="Nav_header_icon" @click="Collapse"><span>|||</span></div>
    <!-- router 是 router='router'的缩写  collapse 显示/隐藏 click 切换 transition = 动画 -->
    <el-menu
      :collapse="isShow"
      :collapse-transition="false"
      :default-active="defaultActive"
      class="el-menu-vertical-demo NavMenu"
      background-color="#313743"
      text-color="#fff"
      active-text-color="#409eff"
      :unique-opened="true"
    >
      <!-- 左侧菜单 传入服务器请求的数据-->
      <MyMenuItem :menuList='menuList'/>
    </el-menu>
  </el-aside>
</template>

<script>
import MyMenuItem from "./myMenuItem/index.vue";
export default {
    name: "NavMenu",
    data() {
        return {
            menuList: [],
            isShow: false,
            NavWidth: "200px",
            defaultActive:'',
        };
    },
    mounted() {
        //发送请求获取数据
        this.getNavMenusInfo();
        this.defaultActive = sessionStorage.getItem('moon')
    },
    methods: {
        //获取菜单的信息
        async getNavMenusInfo() {
            let { data: res } = await this.$API.menu.getNavMenus();
            if (res.meta.status == 200) {
                this.menuList = res.data;
            }
        },
        Collapse() {
            this.isShow = !this.isShow;
            this.NavWidth = this.isShow ? "65px" : "200px";
            // .el-aside 直接给它设置一个动态值吧 refs真的好麻烦
            //if(this.isShow){
            //true 是折叠,开启动画
            //}else{
            //false 是宽度变成默认值 200 这里用三元都行了吧? 只有 t/f 那不写 if了
            //}
            /* if(this.isShow){
                  this.$refs.myAside.style.width = '100px'
              }else{
                  this.$refs.myAside.style.width = '200px'
                  
              } */
        },
    },
    components: { MyMenuItem }
};
</script>

<style lang="less">
.el-aside {
  background-color: #313743;
  color: #fff;
  border-right: none;
  .el-menu {
    //给每一个子元素设置不行,给父元素就可以
    border-right: none;
  }
  svg {
    //间距
    margin-right: 10px;
  }
}
.Nav_header_icon {
  width: 100%;
  text-align: center;
  background-color: #4a5064;
  span {
    display: block;
  }
}
</style>