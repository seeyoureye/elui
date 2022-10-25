<template>
  <el-card shadow="always" :body-style="{ padding: '20px' }">
    <!-- 头部 -->
    <div slot="header">
        <!-- el-alert -->
        <el-alert :title="warnData.text" :type="warnData.type" effect="light" show-icon closable></el-alert>
        <!-- 级联选择器 -->
        <GoodsSelect style="margin-top:20px" :cascaderData="cascaderData" :goodsList="goodsList" @cascaderChange="cascaderChange" />
    </div>
    <!-- 再插入一个子组件 里面放入两个页面 动态参数/静态属性 -->
    <div class="paramsBoxBody">
        <el-tabs v-model="tabsFirst"  tab-position="top">
            <!-- 后续编辑 :
                就是从这里开始,才会萌生双v-for来完成不现实的事情
                这里其实也有一样的问题,就是之前页面提过的,就是页面来回切换时,v-for会出现抖动 那种老老实实写的就不会
                我的理解为,v-for有过程,这个抖动不可避免 除非我不让它显示,渲染完毕之前我一片空白
                如果允许这一点,那我可以修复一下,不然的话唯一能做的可能只有 不使用v-for来写了
            -->
            <!--  新的发现 可以动态添加子页面  这一段代码保留
            <el-tab-pane 
                :key="TabsList[0].key"
                :label="TabsList[0].label"
                :name="TabsList[0].name">
                <component :is="TabsList[0].page"></component>
            </el-tab-pane> -->
            <el-tab-pane v-for="itemPage in TabsList" :key="itemPage.key"
                :label="itemPage.label"
                :name="itemPage.name">
                    <component :is="itemPage.page"  :type="itemPage.name" :id="selectOfGoods ? selectOfGoods : -1"></component>
            </el-tab-pane>
        </el-tabs>
    </div>
    
  </el-card>
</template>

<script>
import GoodsSelect from './goodsSelect/index.vue';
import OnlyPage from './onlyPage/index.vue';
import ManyPage from './manyPage/index.vue';
export default {
    name: "paramsBox",
    data() {
        return {
            //顶部 alert 需要的数据
            warnData: {
                text: "注意: 只允许为第三级分类设置相关参数!",
                type: "warning",
            },
            // 级联选择器的接受值
            selectOfGoods:'',
            // 级联选择器的配置对象
            cascaderData: {
                expandTrigger: "hover",
                checkStrictly: true,
                label: "cat_name",
                value: "cat_id",
                children: "children",
                checkStrictly: false,
            },
            // 商品分类的列表
            goodsList: [],
            tabsFirst:'many',
            // 显示的默认页面为 动态参数
            TabsList:[
                {
                    name:'many',
                    key:0,
                    label:'动态参数',
                    page:'ManyPage',
                },
                {
                    name:'only',
                    key:1,
                    label:'静态属性',
                    page:'OnlyPage'
                },
            ]
        };
    },
    methods: {
        // 获取数据
        async getData() {
            let { data: res } = await this.$API.goods.getCategoriesList();
            if (res.meta.status == 200) {
                this.goodsList = res.data;
            }
            else {
                this.myalert("网络异常,请稍后重试", "danger");
            }
        },
        // 级联选择器发送变化时触发 , 获取 id  给动态参数页面用于获取列表
        cascaderChange(idIsArr) {
            // 因为级联选择器绑定的是数组,所以想要获取最后一个数据
            // 要么 length -1,不然就是 pop() 弹出最后一个 直接获取 怎么得到都一样
            // 后续编辑 : 不一样,我他妈一开始还真是使用pop();结果越切换里面的东西越少
            // 后续编辑 : 真他妈奇怪 每一次点击都是获取一个新的数组 新的数组又是新的3个数字
            // 后续编辑 : 怎么会出现一开始是3位数 后面是2位数 最后1位数的,没道理 所以我最后使用的是最后一位数,而不是pop()
            //let id = idIsArr.pop();
            let temp  = idIsArr[idIsArr.length-1];
            //我直接给子元素发好了
            this.selectOfGoods = temp;
        },
        
    },
    mounted() {
        this.getData();
    },
    components: { GoodsSelect, OnlyPage, ManyPage }
}
</script>

<style>

</style>