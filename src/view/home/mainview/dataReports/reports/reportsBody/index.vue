<template>
  <el-card shadow="always" :body-style="{ padding: '20px' }">
    <div slot="header">
      <span><!-- card title --></span>
    </div>
    <div ref="echartsBox" style="width: 900px; height: 500px"></div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "reportsBody",
  data() {
    return {
      option: {},
      box: "",
      tooltip :{
        //提示框组件
        trigger:'axis',
        axisPointer:{
            type:'cross',
            label:{
                backgroundColor:'#6a7985'
            }
        }
      }
    };
  },
  methods: {
    async getData() {
      let { data: res } = await this.$API.reports.getReports();
      this.option = res.data;
    },
  },
  created(){
    },
  mounted() {
    this.getData();
    this.box = echarts.init(this.$refs.echartsBox);
    this.box.setOption(this.option);
  },
  watch: {
    option: function (nowV) {
      this.option.title = {
        text: "用户来源",
      };
      this.option.xAxis[0].boundaryGap=false;
      this.option.tooltip = this.tooltip;
      this.box.setOption(this.option);
    },
  },
};
</script>

<style>
</style>