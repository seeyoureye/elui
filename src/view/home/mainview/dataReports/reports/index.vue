<template>
  <div>
    <div class="reportsHeader">
      <MyHeaderBreadrumb/>
    </div>
    <div class="reportsBody">
      <ReportsBody/>
    </div>
  </div>
</template>

<script>
import MyHeaderBreadrumb from '@/components/myHeaderBreadrumb/index.vue';
import ReportsBody from './reportsBody/index.vue';
export default {
    name: "reports",
    components: { MyHeaderBreadrumb, ReportsBody }
}
</script>

<style>
.reportsBody{
  margin-top: 20px;
}
</style>