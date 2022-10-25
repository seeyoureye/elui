<template>
  <div>
    <!-- 搜索框 按钮 -->
    <el-input style="width:330px" v-model="keyword" placeholder="请输入搜索信息" size="normal"></el-input>
    <!-- 要不要用封装的按钮呢? 说实话有点多此一举 毕竟这里只是个 icon 的 button 又不是 v-for 什么的-->
    <!-- 后续编辑 : 我为什么用它呢,不是像我说的那样多此一举吗?确实是,但是我认为这样写更好,契合vue的思想,操作数据而不是操作dom -->
    <MyButton :buttonData="buttonData" @click.native='onSumbit'/>
  </div>
</template>

<script>
import MyButton from '@/components/myButton/index.vue';
export default {
    name: "orderBodyHeaderSearch",
    data() {
        return {
            //需要一个数据来保存 v-model 的值 不然怎么搜索呢
            keyword: "",
            buttonData:{
                type:'info',//类型 让它是蓝色的 不对 这个按钮是白色的是 info
                plain:true,//什么朴素按钮 不就是反色?
                icon:'el-icon-search',//关键来了,这个按钮除开颜色就是 icon 了没有其他任何元素
                disabled:true
            },
        };
    },
    methods: {
        //然后是按钮的回调,把数据交给父组件.然后请求时 query 出来新的数据列表 
        onSumbit() {
            //this.keyword 
            // 做个判断? 没有不发请求 不做 我直接设置 keyword 为空不能按
            // 可是这样,样子不好看 写一个 watch 监听 keyword,为空 就不能按
            // 好像更加麻烦了,无所谓每个写法都试试吧
            this.$emit('onclick',this.keyword.trim());
            // 搜索之后搜索框要不要清空? 不清空 毕竟没有跳转页面什么的
            // trim()? 补上吧
        }
    },
    watch: {
        //监听 keyword 来实现 button 是否允许点击的切换
        keyword:function(nowV,oldV){
            //如果有值就可以点击 没有则不能
            if(nowV){
                //console.log(nowV,'有值');
                this.buttonData.disabled = false;
            }else{
                //console.log(nowV,'为空');
                this.buttonData.disabled = true;
            }
        }
    },
    components: { MyButton }
}
</script>

<style>

</style>