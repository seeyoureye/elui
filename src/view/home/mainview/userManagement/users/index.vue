<template>
  <div class="user_page">
    <!-- 默认显示的页面 -->
    <div class="page1" v-show="isShow == 1">
      <!-- 头部面包屑 -->
      <myHeaderBreadrumb />
      <!-- 中间的 el-card -->
      <MyBody />
    </div>
  </div>
</template>

<script>
import myHeaderBreadrumb from "@/components/myHeaderBreadrumb";
import MyBody from "./myBody/index.vue";
export default {
  name: "users",
  data() {
    return {
      isShow: "1", //默认值 切换时,切换数值来达到切换页面的效果
    };
  },
  components: { myHeaderBreadrumb, MyBody },
};
</script>

<style>
</style>