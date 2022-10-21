<template>
  <el-row :gutter="20">
        <el-col :span="16" :offset="0">
        <span>选择商品分类:</span>
        <el-cascader :options="goodsList" ref="goodsRef" v-model="selectOfGoods" clearable filterable :show-all-levels="false"
            :props="cascaderData" @change="cascaderChange"><!--  @change="cascaderChange" 改变的时候发送请求获取信息 -->
        </el-cascader>
        </el-col>
       </el-row>
</template>

<script>
export default {
    name:'goodsSelect',
    props:{
        goodsList:Array,
        cascaderData:Object,
    },
    data() {
        return {
            selectOfGoods:[]
        }
    },
    methods: {
        cascaderChange(){
            this.$refs.goodsRef.dropDownVisible=false;
            this.$emit('cascaderChange',this.selectOfGoods)
        }
    },
}
</script>

<style>

</style>