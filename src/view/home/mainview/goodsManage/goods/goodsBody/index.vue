<template>
  <el-card shadow="always" :body-style="{ padding: '20px' }">
    <!-- 顶部搜索框带个按钮 icon 的 搜索 然后还有一个 普通按钮 添加商品 -->
    <div class="goodsbodyheader">
        <GoodsBodyTitle @queryGoodsForList='queryGoodsForList' @addGoddsButton='addGoddsButton' @reGetData='reGetData'/>
    </div>
    <!-- 主要显示区域  是个表格 从左到右 索引 商品名称 商品价格 商品重量 创建时间 操作(两个按钮,编辑/删除)-->
    <div class="bodyMain">
        <GoodsBodyTable :goodsList='goodsList' @removeGetData='removeGetData'/>
    </div>
    <!-- 分页器,位于内部 所以就写在一起了 -->
    <div class="footer">
        <MyPagination :paginationData='goodsPaginationData' @changeCurrent="changeCurrent" @changeSize='changeSize'  />
    </div>
  </el-card>
</template>

<script>
import GoodsBodyTitle from './goodsBodyTitle/index.vue';
import GoodsBodyTable from './goodsBodyTable/index.vue';
import MyPagination from '@/components/myPagination/index.vue';
export default {
    name: "goodsBody",
    data() {
        return {
            //分页器要的属性
            goodsPaginationData: {
                current: 1,
                pageSizes: [10, 15, 20],
                size: 10,
                layout: "total, sizes, prev, pager, next, jumper",
                total: 50, //总数
            },
            goodsList:[],//渲染所需数据
        };
    },
    methods: {
        //分页器所需的两个方法 每一页显示多少个,以及点击时页面跳转
        changeSize(size) {
            this.goodsPaginationData.size = size;
            this.getData();
        },
        //点击后,回到顶部 还是要回到顶部
        changeCurrent(page) {
            this.goodsPaginationData.current = page;
            this.getData();
        },
        //头部搜索框关键字响应函数
        queryGoodsForList(keyword){
            //搜索需要修正,搜索时,永远是第一页,因为搜索按钮本身就在顶部,就不需要回到顶部了
            this.goodsPaginationData.current = 1;
            this.getData(keyword);
        },
        // 响应添加按钮的回调
        addGoddsButton(){
            sessionStorage.setItem('childName','添加页面');//设置子页面面包屑的文本
            //这有问题,我是写在 mounted 中的 也就是如果页面不刷新是不会改变的
            //那就路由跳转
            this.$router.push('/home/goods/addGoods');//成功
        },
        // 获取数据列表
        async getData(query){
            let pagenum = this.goodsPaginationData.current;//当前页
            let pagesize = this.goodsPaginationData.size;//每一页多少数据
            let obj;
            //没有关键字时
            if(!query){
                 obj = {pagenum,pagesize}
            }else{
                //有的话 我一开始是想用三元表达式 但是 三元该怎么写呢
                 obj = {pagenum,pagesize,query}
                // 后续编辑 : 我告诉你 obj = query ? {pagenum,pagesize,query} : {pagenum,pagesize}; 这样写
            }
            let {data:res} = await this.$API.goods.getGoodsList(obj);
            if(res.meta.status==200){
                //校准当前数据,之前都是初始化之前的数据
                this.goodsPaginationData.current = parseInt(res.data.pagenum);
                this.goodsPaginationData.total = res.data.total;
                this.goodsList = res.data.goods;
            } else{
                this.myalert();
            }
            //回到顶部
            this.$emit('goTop');
        },
        // input搜索框清空的回调 应该让 当前页回到初始值 第一页
        reGetData(){
            this.goodsPaginationData.current = 1;
            this.getData()
        },
        // 响应子组件表单的删除按钮 如果删除了重新渲染页面
        removeGetData(){
            if(this.goodsList.length==1){
                this.goodsPaginationData.current = this.goodsPaginationData.current - 1;
                // 后续编辑 : 这里和上一次一样,出现了相同的问题,没有考虑如果当前页是第一页的情况
                // 后续编辑 : 试着用三元进行修正,小于1等于1,大于1保持不变
                this.goodsPaginationData.current < 1 ? this.goodsPaginationData.current = 1 : this.goodsPaginationData.current = this.goodsPaginationData.current;
            }
            this.getData()
            
        }
    },
    mounted() {
        this.getData();
    },
    components: { GoodsBodyTitle, GoodsBodyTable, MyPagination }
};
</script>

<style>
</style>