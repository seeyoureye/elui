<template>
  <div>
    <!-- 头顶面包屑 -->
    <div class="addGoodsPageHeader">
      <MyHeaderBreadrumb/>
    </div>
    <!-- 同样是一个 elcard  是主要的显示区域-->
    <div class="addGoodsPageBody">
      <AddGoodsBody/>
    </div>
  </div>
</template>

<script>
import MyHeaderBreadrumb from '@/components/myHeaderBreadrumb/index.vue';
import AddGoodsBody from './addGoodsBody/index.vue';
export default {
    name: "addGoodsPage",
    components: { MyHeaderBreadrumb, AddGoodsBody }
}
</script>

<style lang="less">
.addGoodsPageBody{
  margin-top: 20px;//以后这里可以注意,既然样式统一可以用相同的 class 名
}
</style>