<template>
    <div><!-- 基本页面是一整个表单结构 -->
        <!-- 商品分类 一个级联选择器 这个选择器,和页面 2 页面 3 有联动 它们需要这个 id-->
        <el-form :model="addGoodsData" ref="Basicsform" :rules="rules" label-position="top" label-width="80px" :inline="false" size="normal">
            <!-- 商品名称 -->
            <!-- 商品价格 -->
            <!-- 商品重量 -->
            <!-- 商品数量 四个基本的就用 v-for 写了,因为收集的数据比较简单--> 
            <el-form-item :label="item.label" :prop="item.name" v-for="item in formArr" :key="item.index">
                <el-input v-model="addGoodsData[item.name]"></el-input>
            </el-form-item>
            <!-- 商品分类 级联选择器 这个选择器,和页面 2 页面 3 有联动 它们需要这个 id-->
            <el-form-item label="商品分类" prop="goods_cat">
                <el-cascader :options="cascaderList" v-model="cascaderValue" 
                :props="cascaderOptions" @change="console">
                </el-cascader>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
//数据要传到最外层, 这里到 leftNav ,leftNav 再到顶层 有点麻烦 写个 vuex 吧 
export default {
    name:'essentialInformation',
    data() {
        return {
            // 基本页面搜集的所有数据 , 本页面只收集这个 5 个数据 
            // 以 elfrom 的方式 
            addGoodsData:{
                goods_name:'',// 名称
                goods_price:'',// 价格
                goods_number:'',// 数量
                goods_weight:'',// 重量
                goods_cat:'',//分类 就是级联选择器的选择的内容 join(',') 变成字符串 用计算属性
            },
            // 再写个基本的 rules 内容不能为空 触发方式均为 blur
            // 给一个 refs 切换页面时做个判断,验证成功就允许切换页面?
            // 真正的没有那么好写,不过这里只需要判断 promise 返回值是否为 true,不是就拦截即可
            // tabs 有个方法 before-leave 符合我想要的效果,为 false 阻止切换,其实自己写个 if(state) 也是相同的
            // 那么,每一页页面,离开之前都需要判断 , 写在 leftNav 中吧 
            // $emit 比较好, 条件判断的结果发给 leftNav 然后通过 t/f 来决定是否跳转
            rules:{
                goods_name:[{required:true,message:'内容不能为空',trigger:'blur'}],
                goods_price:[{required:true,message:'内容不能为空',trigger:'blur'}],
                goods_number:[{required:true,message:'内容不能为空',trigger:'blur'}],
                goods_weight:[{required:true,message:'内容不能为空',trigger:'blur'}],
                goods_cat:[{required:true,message:'内容不能为空',trigger:'blur'}],
            },
            // v-for 需要的配置项
            formArr:[
                {
                    name:'goods_name',
                    label:'商品名称',
                },
                {
                    name:'goods_price',
                    label:'商品价格',
                },
                {
                    name:'goods_number',
                    label:'商品重量',
                },
                {
                    name:'goods_weight',
                    label:'商品数量'
                },
            ],
            // 级联选择器的配置项 设置 value 和 label children
            cascaderOptions:{
                value:'cat_id',
                label:'cat_name',
                children:'children',
                expandTrigger:'hover',
            },
            // 级联选择器的展示列表
            cascaderList:[],
            // 级联选择器选中的数据
            cascaderValue:[],
        }
    },
    methods: {
        // 获取级联选择器需要的数据列表
        async getData(){
            let {data:res} = await this.$API.goods.getCategoriesList();
            if(res.meta.status==200){
                this.cascaderList = res.data;
            }else{
                this.myalert();
            }
        },
        // 级联选择器发送变化时,搜集选中的内容
        console(){
            this.addGoodsData.goods_cat = this.cascaderValue.join(',')
        },
        //设置属性,把数据交给 vuex 由父组件调用
        setData(){
            this.$store.dispatch('getBasicsData',this.addGoodsData);
        },
        //Basicsform 废弃,我以及在父组件调用 ref 来完成此功能
        /* async examineForm(){
            let state = await this.$refs.Basicsform.validate();
            if(state==true){
                this.$emit('temp',true);
                this.$store.dispatch('getBasicsData',this.addGoodsData)
                return true;
            }else{
                this.$emit('temp',true);
                return false
            }
        } */
    },
    props:{
        addObj:Object,
        addId:String
    },
    watch: {
        // 废弃,原因跨组件还是慢了点
        /* isChecked:async function(nowV,oldV){
            //代表离开当前页
            console.log(nowV);
            if(nowV[1]=='1'){
                let res = await this.examineForm();
                
            }
        }, */
        addObj: function(nowV,oldV){
            //监听外来的 props 属性,如果有变化,那么 就代表是编辑,而不是添加
            //我直接让数据等于现有的
            //这样的话,我实际上是用一个完整的对象顶替了原生的,我每一个页面都顶替一次就搞定了
            let {goods_name,goods_price,goods_number,goods_weight,goods_cat} = nowV;
            this.addGoodsData = {goods_name,goods_price,goods_number,goods_weight,goods_cat}
            if(goods_cat){
            let arr = this.addId.split(',')
            this.cascaderValue = arr.map(item=>item*1)
        }
            //级联选择器给一个默认值,如果它比异步请求快那也很麻烦
            //this.cascaderList = goods_cat.split(',');
            //那就写在请求后面?,先出请求后执行这个代码
        },

    },
    mounted() {
        this.getData()
    },

}
</script>

<style>

</style>