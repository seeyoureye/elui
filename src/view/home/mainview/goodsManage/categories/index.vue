<template>
  <div>
    <!-- 头部面包屑 -->
    <div class="categories_header">
      <MyHeaderBreadrumb/>
    </div>
    <!-- el-card 主体 -->
    <div class="categories_body">
      <Categories_card/>
    </div>
  </div>
</template>

<script>
import MyHeaderBreadrumb from '@/components/myHeaderBreadrumb/index.vue';
import Categories_card from './categories_card/index.vue';
export default {
    name: "categories",
    components: { MyHeaderBreadrumb, Categories_card }
}
</script>

<style>
.categories_body{
  margin-top: 20px;
}
</style>