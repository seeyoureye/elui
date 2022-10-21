<template>
  <div class="header_box">
    <span><i class="el-icon-position" style="margin-right:10px"></i>后台管理系统</span>
    <el-button size="small" style="background-color: #909399;color: #fff; border: none;" @click="exit">退出登陆</el-button>
  </div>
</template>

<script>
export default {
  name: "myHeader",
  methods: {
    //退出登陆 叫 logout 也行
    exit() {
            //清空 会话存储,并且路由跳转到 login
            sessionStorage.removeItem("token");
            //正常来说应该接受返回值,true 就跳转 但是一般也没有说会删除失败的情况 除非没有 没有这个数据就不会出现在 home 页面
            this.$router.push("/login");
        },
  },
};
</script>

<style lang="less" scoped>
  
.header_box {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  span{
    font-size: 24px;
  }
}
</style>