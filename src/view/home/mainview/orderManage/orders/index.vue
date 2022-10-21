<template>
  <div>
    <!-- 老三样 顶部面包屑 中间 elcard 包裹一个表格
       这一次,就不用 v-for 来写表格了也写过两次了 
       一次确实带来了便利,第二次反而是麻烦事
        以后表格得注意,不能随便 v-for 来执行,不是什么时候都适合的
      -->
      <MyHeaderBreadrumb/>
      <!-- 还是之前的那种,有个 margin-top: 20px; 既然都是相同的为什么不用同一个? 
        既然当初写的时候是分开写的那就风格统一吧 都分开写,如果有下一次,那就试试同名 class 写全局样式 -->
      <div class="orderBody">
        <OrdersTableForBody/>
      </div>
  </div>
</template>

<script>
import MyHeaderBreadrumb from '@/components/myHeaderBreadrumb/index.vue';
import OrdersTableForBody from './ordersTableForBody';
export default {
    name: "orders",
    components: { MyHeaderBreadrumb, OrdersTableForBody }
}
</script>

<style>
.orderBody{
  margin-top: 20px;
}
</style>