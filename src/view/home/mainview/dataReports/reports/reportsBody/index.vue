<template>
  <el-card shadow="always" :body-style="{ padding: '20px' }">
    <div slot="header">
      <span><!-- card title --></span>
    </div>
    <!-- 后续编辑 : 
      这个页面其实啥也没干,他这里就让你显示一个表格 
      然后表格的数据也直接准备好了,什么xaxis,yaxis 等等
      y坐标 x坐标都有数据
      我做的只有几个小事,给了个title 标题 然后鼠标移入给点反应显示一个tooltip
    -->
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