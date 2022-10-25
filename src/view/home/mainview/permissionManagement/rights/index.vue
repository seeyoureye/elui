<template>
  <div class="rights_box">
    <!-- 页面的头部 面包屑 -->
    <div class="right_header">
      <MyHeaderBreadrumb/>
    </div>
    <!-- 容器 主要显示区域 -->
    <div class="right_body">
      <el-card shadow="always" :body-style="{ padding: '20px'}" style="margin-top:20px">
        <!-- 列表 -->
        <div class="card body">
          <MyList :dataList='dataList'/>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import MyHeaderBreadrumb from '@/components/myHeaderBreadrumb/index.vue';
import MyList from './myList/index.vue';
export default {
    name: "rights",
    mounted() {
        this.getData();
    },
    data() {
      return {
        dataList:[]
      }
    },
    methods: {
        async getData() {
            let { data: res } = await this.$API.rights.getRights("list");
            if(res.meta.status==200){
              this.dataList = res.data
            }else{
              this.myalert('网络异常,请稍后重试','warning')
            }
        }
    },
    components: { MyHeaderBreadrumb, MyList }
}
</script>

<style>

</style>