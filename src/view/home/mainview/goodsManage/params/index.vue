<template>
  <div>
    <!-- 面包屑 -->
    <MyHeaderBreadrumb/>
    <!-- 主要显示区域 -->
    <div class="params_body">
      <Params_box/>
    </div>
  </div>
</template>

<script>
import MyHeaderBreadrumb from '@/components/myHeaderBreadrumb/index.vue';
import Params_box from './params_box/index.vue';

export default {
    name: "params",
    components: { MyHeaderBreadrumb, Params_box }
}
</script>

<style>
.params_body{
  margin-top: 20px;
}
</style>