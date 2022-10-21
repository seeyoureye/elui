<template>
 <el-container class="home_box">
      <!-- 头部 -->
      <el-header>
        <MyHeader/>
      </el-header>
      <el-container>
        <!-- 左侧导航菜单 -->
        <NavMenu/>
        <!-- 主要显示区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
import MyHeader from './myHeader/index.vue';
import NavMenu from './NavMenu/index.vue';
export default {
    name: "home",
    components: { MyHeader, NavMenu },
    data() {
      return {

      }
    },
   
   
    
    
};
</script>

<style lang="less">
.home_box{
height: 100%;
}
.el-header,
.el-footer {
  background-color: #363d3f;
  color: #fff;
  line-height: 50px;
}



.el-main {
  background-color: #e9eef3;
  color: #333;
}

body > .el-container {
  margin-bottom: 40px;
  height: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 100%;
}
</style>