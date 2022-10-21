<template>
    <!-- 首先,里面是个 elcard
          其次,一个 input 后面跟一个 icon 的 button
          底部是一个 table
          第一列是排序 第二列订单编号 第三列订单价格 第四列状态 第五列是否发货 第六列下单时间 第七列操作 两个按钮
          根据文档可以看出来 又是一大堆麻烦事
          请求需要的参数为分页器的基础数据 
          比如初始值 第一页,每一页展示多少条数据,我这一次统一一点 ,格式以请求的最终数据结构相同

          那么,分组件吧,顶部就两个东西和下面完全独立没有必要写在一块
          上下两部分,不 是上中下 3 部分 搜索框 中间的表格 底部的分页器 
          
          开始
          
          底部有一个分页器,还好分页器已经写了个组件

    -->
    <el-card shadow="always" :body-style="{ padding: '20px' }">
         <!-- 子组件  -->
        <div slot="header">
        <!-- input and button 一个搜索框和搜索按钮 触发的方式,为onclick点击 不应该是 blur? 我觉得 blur 有点奇怪 它明明没有搜索但是你自动处理了未完成的操作 -->
            <OrderBodyHeaderSearch @onclick='buttonOnclickQuery'/>
        </div>
        <!-- 表格 -->
        <div class="orderTable">
            <Table :goods="orderList" @openAndClose='openAndClose'/>
        </div>
        <!-- 分页器 -->
        <div class="orderPagination">
            <MyPagination :paginationData="returnData" @changeSize='changeSize' @changeCurrent="changeCurrent" />
        </div>
        <!-- dialog 弹出层 放外面 -->
        <div>
            <OrderDialogs :order_id="order_id" :editStatus="editStatus" :expressStatus="expressStatus" @openAndClose="openAndClose" />
        </div>
    </el-card>
</template>

<script>
import {goTop} from '@/plugins/tool';
import OrderBodyHeaderSearch from './orderBodyHeaderSearch/index.vue';
import Table from './Table/index.vue';
import MyPagination from '@/components/myPagination/index.vue';
import OrderDialogs from './orderDialogs/index.vue';
export default {
    name: "ordersTableForBody",
    components: { OrderBodyHeaderSearch, Table, MyPagination, OrderDialogs },
    data() {
        return {
            //请求所需数据
            requestNeedData:{
                query:'',//查询参数 可以为空
                pagenum:1,//当前页 初始页
                pagesize:15,//显示多少数据 默认 15
                user_id:'',//用户 id,可以为空 
                pay_status:'',//支付状态 可以为空 
                is_send:'',//是否发货 可以为空 
                order_fapiao_title:'',// 两个参数 个人,公司 可以为空 
                order_fapiao_company:'',// 公司名称 可以为空 
            },
            //数据返回时接受的容器
            orderList:[],
            total:'',//分页器所需数据
            editStatus:false,//控制修改地址是否显示的属性
            expressStatus:false,//统一一点,这个也一样不过是控制 物流信息的
            order_id:-1,//默认值
        }
    },
    methods:{
        //这个是搜索框按钮的回调
        buttonOnclickQuery(keyword){
            //这里只处理数据,实际发送请求交给另外的方法来执行
            this.requestNeedData.query = keyword;
            //搜索嘛,肯定是固定显示为首页的,就是第一页
            this.requestNeedData.pagenum = 1;
            //那这里就差不多该发送请求了,因为搜索框在顶部,或许就不需要回到顶部了
            this.getDataList()
        },
        //获取数据的请求
        async getDataList(){
            let {data:res} = await this.$API.order.getOrdersList(this.requestNeedData);
            if(res.meta.status==200){
                //获取实际列表数据,然后将返回的数据补正发送请求所需的数据中
                this.orderList = res.data.goods;
                this.requestNeedData.pagenum = res.data.pagenum;
                this.total = res.data.total;
                goTop()
            }else{
                this.myalert();
            }
        },
        //分页器的两个回调
        changeSize(size){//改变每一页多少个时,触发
            this.requestNeedData.pagesize=size;
            this.getDataList();
        },
        changeCurrent(page){//改变当前页的时,触发 就是下一页上一页这种东西
            this.requestNeedData.pagenum = page;
            this.getDataList();
        },
        //dialog开关的方法
        openAndClose(name,action,data){
            //接受两个参数,a 打开/关闭的是哪一个数据的名称, b 打开/关闭哪个动作
            if(action=='open'){
                //打开
                this[name] = true;
                if(data)this.order_id = data.order_id;
            }else{
                //其他都是关闭,如果是确认按键那就加上一个保存
                this[name] = false;
            }
        }
    },
    computed: {
        //返回一个对象,因为数据是变动的所以不能写死
        returnData(){
            return {//你要数字,我给你数字
                layout:"total, sizes, prev, pager, next, jumper",
                current:parseInt(this.requestNeedData.pagenum),
                size:parseInt(this.requestNeedData.pagesize),
                total:parseInt(this.total),
                pageSizes:[10,15,20],//这里是我自己随便写的,因为没有返回的数据
            }
        }
    },
    mounted() {
        //打开页面第一时间获取数据
        this.getDataList()
    },
}
</script>

<style>
.orderPagination{
    margin-top: 20px;
}
body{
    padding-right: 0 !important;
    overflow-y: auto !important;
}
</style>