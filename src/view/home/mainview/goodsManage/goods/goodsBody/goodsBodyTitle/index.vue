<template>
<!-- goodsBody的顶部 一个搜索框 一个按钮 -->
  <div class="goodsBodyBox">
    <div class="inputAndButton" style="width:400px">
        <el-input style="width:320px" v-model="keyword" placeholder="请输入内容" size="normal" clearable @clear="reGetData"></el-input>
    <!-- 和搜索框配套的icon按钮 -->
    <MyButton :buttonData='headerButton1' @click.native="getKeyword"/>
    </div>
    <div style="width:100px">
        <!-- 另外一个按钮 添加 -->
        <MyButton  :buttonData="addButton" @click.native="addGoodsButton" />
    </div>
  </div>
</template>

<script>
import MyButton from '@/components/myButton/index.vue';
export default {
    name: "goodsBodyTitle",
    data() {
        return {
            keyword: "",
            //头部按钮的样式对象
            headerButton1: {
                plain:true,
                type:'info',
                icon:'el-icon-search',
                disabled:false,
            },
            //添加按钮
            addButton: {
                plain:false,
                type:'primary',
                disabled:false,
                text:'添加商品'
            },
        };
    },
    methods: {
        //向外传递关键字
        getKeyword(){
            this.$emit('queryGoodsForList',this.keyword)
        },
        // 添加按钮的回调
        addGoodsButton(){
            // 同样向上穿透吧,这只是个子组件. 关键字拿到手就行了 不写那么多
            this.$emit('addGoddsButton');
        },
        // 清楚 input文本后的回调
        reGetData(){
            this.$emit('reGetData')
        }
    },
    components: { MyButton }
}
</script>

<style>
.goodsBodyBox{
    display: flex;
}
</style>