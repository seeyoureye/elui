<template>
  <div class="roles_page">
    <!-- 顶部面包屑 -->
    <div class="roles_header">
      <MyHeaderBreadrumb/>
    </div>
    <!-- 容器-主要显示区域 -->
    <div class="roles_body">
      <MyList style="margin-top:20px"/>
    </div>
  </div>
</template>

<script>
import MyHeaderBreadrumb from '@/components/myHeaderBreadrumb/index.vue';
import MyList from './myList/index.vue';
export default {
    name: "roles",
    components: { MyHeaderBreadrumb, MyList }
}
</script>

<style>

</style>