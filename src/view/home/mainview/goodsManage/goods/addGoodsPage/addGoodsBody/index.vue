<template>
  <div>
    <!-- 那么这里就是主要渲染的页面了 -->
    <el-card shadow="always" :body-style="{ padding: '20px' }">
        <div slot="header">
            <!-- 提示信息 -->
            <el-alert title="添加商品信息" type="info" effect="light" show-icon :center="true"></el-alert>
            <!-- 步骤条 -->
            <AddGoodsSteps :stepsAndTabs="stepsAndTabs" :active="getNum"/>
        </div>
        <!-- card body 一个侧边栏以及内部的子组件-->
        <div class="addGoodsNav">
           <AddGoodsLeftNav :stepsAndTabs="stepsAndTabs" @tabClick="tabClick" />
        </div>
    </el-card>
  </div>
</template>
<script>
import AddGoodsSteps from './addGoodsSteps/index.vue';// 步骤条
import AddGoodsLeftNav from './addGoodsLeftNav/index.vue';
// OK 搭建的差不多了,之后就是收集所有的数据 统一给父组件
export default {
    name: "addGoodsBody",
    data() {
        return {
            //步骤条和侧边栏共用的数据
            stepsAndTabs: [
                {
                    key: '1',
                    title: "基本信息",
                    page:'EssentialInformation'
                },
                {
                    key: '2',
                    title: "商品参数",
                    page:'GoodsParams'

                },
                {
                    key: '3',
                    title: "商品属性",
                    page:'GoodsAttr'

                },
                {
                    key: '4',
                    title: "商品图片",
                    page:'GoodsImage'

                },
                {
                    key: '5',
                    title: "商品内容",
                    page:'GoodsDetails'

                },
                {
                    key: '6',
                    title: "完成",
                    page:''
                },
            ],
            //步骤条和侧边栏初始值
            active:1,
            activeTop:1
        };
    },
    methods: {
        //tabitem点击的回调,先写着,如果没用后面再删掉
        tabClick(page){
            //console.log(this.active);
          this.activeTop = page+1 > 5 ? 1 : page+1
        }
    },
    computed: {
        // 步骤条的初始值为 1 - 1 ,单击下一页时,上一页为完成状态
        getNum(){
            return parseInt(this.activeTop-1);
        },
    },
    components: { AddGoodsSteps, AddGoodsLeftNav }
}
</script>

<style>

</style>