<template>
  <div class="header">
    <!-- 顶部 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-if="fatherName">{{fatherName}}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="fatherName">{{childName}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
    name:'myHeaderBreadrumb',
    data() {
      return {
        fatherName:'',
        childName:''
      }
    },
    mounted(){
    //我把这两个数据,放入了会话存储之中,这样刷新就不会丢失 
    //这个组件可能,很多地方都会用到 可以变成全局组件
    this.fatherName = sessionStorage.getItem('fatherName')
    this.childName = sessionStorage.getItem('childName')
    }
    
}
</script>

<style>

</style>