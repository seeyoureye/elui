<template>
  <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page="paginationData.current"
        :page-sizes="paginationData.pageSizes"
        :page-size="paginationData.size"
        :layout=paginationData.layout
        :total="paginationData.total" background>
        :pager-count="paginationData.count">
    </el-pagination>
    <!-- 
        标准的格式
        "total, sizes, prev, pager, next, jumper" 

        changeSize
        changeCurrent 函数名不能写错
    -->
</template>
<script>
export default {
    name:'myPagination',
    props:{
        paginationData:Object,
    },
    methods:{
        //向外传递数据
        sizeChange(size){
            this.$emit('changeSize',size)
        },
        currentChange(page){
            this.$emit('changeCurrent',page)
        },
    }
}
</script>

<style>

</style>