<template>
    <div>
        <!--  后续编辑 : 
            这个组件中我做了一件,之前没有想过的事情
            就是把这些dialog,都整合起来
            然后单独引入一个组件即可
            而不是零零散散的多个dialog
            那它有没有他的问题呢,也是有的,乱嘛 对吧
            两个dialog都出现在一个地方,污染了 data区域, prop区域..等等
            所以以后应该如何应对呢
            这些dialog,依然是单独的 然后引入到一个容器之中,再在需要的地方引入容器?
            这样实际虽然只引入了一个容器,但是内部有多个dialog,各个dialog独立且不冲突
            再用容器像各个dialog组件传递所需的数据,以及向外传递/响应dialog的数据或者是自定义事件
            完美
        -->
        <!-- 我不确定是不是只有一个 dialog
                这还用问?后面还有一个按钮肯定也是了
                    干脆分离出来一个组件专门用来显示 dialog
            既然里面有个级联选择器,那么就需要一个值来接受 还有一个 input 也需要 
         这个,是第一个 dialog 是不是该给个名字 
            点击修改地址-->
        <div class="editAddress">
            <el-dialog
                title="修改地址"
                :visible.sync="editStatus"
                width="35%"
                @close="closeDialog('editStatus','close')">
                <el-form :model="editForm" ref="editAddressForm" :rules="editRules" label-width="85px" :inline="false" size="normal">
                    <el-form-item label="省市区/县" prop="detailedAddress">
                        <el-cascader style="width:100%" :options="editCityData" v-model="editForm.detailedAddress"   :show-all-levels="true"
                            :props="editSet">
                        </el-cascader>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="address">
                        <el-input v-model="editForm.address"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer">
                    <el-button @click="closeDialog('editStatus','close')">取消</el-button>
                    <el-button type="primary" @click="closeDialog('editStatus','edit')">确认</el-button>
                </span>
            </el-dialog>
        </div>
        <!-- 第二个,显示物流信息 -->
        <div class="expressInfo">
            <!-- 让我想想 这个东西怎么显示 得一列一列 从上到下 
                 steps 竖着的那个 v-for 里面的每一个 ok 
                 也得是一个 dialog,否则没地方显示
                 点击获取 id,通过 id 发送请求

                 我发现另外一个东西也有相同的效果 叫 timeline
            -->
            <el-dialog
                title="查看物流信息"
                :visible.sync="expressStatus"
                width="40%"
                @close="closeDialog('expressStatus','close')">
                <el-timeline :reverse="true">
                    <el-timeline-item v-for="item in expressInfoList"
                        :key="item.index"
                        :timestamp="item.time"
                        placement="top"
                        color="#67c23a"
                        icon="el-icon-check"
                        size="normal">
                        {{item.text}}
                    </el-timeline-item>
                </el-timeline>
                <span slot="footer">
                    <el-button @click="closeDialog('expressStatus','close')">Cancel</el-button>
                    <el-button type="primary" @click="closeDialog('expressStatus','close')">OK</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import cityData from '@/plugins/city.js';
export default {
    name:'orderDialogs',
    props:{
        editStatus:Boolean,
        expressStatus:Boolean,
        order_id:Number,//id 没有 id 用什么获取信息 watch 只要不等于默认值 -1 就发送请求
    },
    data() {
        return {
            //修改的收集数据的地方
            editForm:{
                detailedAddress:[],
                address:''
            },
            editRules:{//form 的规则
                detailedAddress:[
                //以后弄个记事本那种东西放一边,这类常用的东西搜集起来
                    {required:true,message:'请选择省市区/县',trigger:'blur'},
                ],
                address:[
                    {required:true,message:'详细地址不能为空',trigger:'blur'},
                ],
            },
            editCityData:cityData,//这也解决了,剩下就是 rules 了
            editSet:{ expandTrigger: 'hover',value:'code',label:'name',childer:'children'},//级联选择器的格式
            expressInfoList:[]
        }
    },
    methods:{
        //都是用一个来关闭,无非是关闭/确定
        closeDialog(name,type){//type对于外面的 action
            this.$emit('openAndClose',name,type);
            //然后清空设置
            if(name=='editStatus'){
                this.$refs.editAddressForm.resetFields();
            }else{
            //这里只是展示,也就是说 不需要修改只是展示给人看 仅此而已 不需要修改任何东西
            }
        },
        getExpressInfo(id){
            //出现问题了 这个东西请求地址,总是报错,所以只好用假的数据了
            // 选自于我之前买的一瓶洗发水
            // 格式是 时间 + 文本 我不知道真的是什么样的
                //let fakeNo2 = '804909574412544580';
                //let {data:res} = await this.$API.order.getExpressInfo(fakeNo);
                //console.log(res);
        }
    },
    mounted(){
        let fakeExpress = [
                    {
                        time:'2022.09.07 05:22-星期三',//既然数据都是弄得虚拟的,就不搞什么时间戳再转格式了之前已经玩过两次了
                        text:'[东莞大岭山接货仓]您的快件在【东莞大岭山接货仓】分拣完成',
                    },
                    {
                        time:`2022.09.07 05:22`,
                        text:`[东莞大岭山接货仓]您的快件由【东莞大岭山接货仓】准备发往【深圳龙华分拣中心`,
                    },
                    {
                        time:`2022.09.07 09:11`,
                        text:`[东莞大岭山接货仓]您的快件已发车`,
                    },
                    {
                        time:`2022.09.07 11:04`,
                        text:`[深圳龙华分拣中心]您的快件已到达【深圳龙华分拣中心】`,
                    },
                    {
                        time:`2022.09.07 11:40`,
                        text:`[深圳龙华分拣中心]您的快件在【深圳龙华分拣中心】分拣完成`,
                    },
                    {
                        time:`2022.09.07 11:41`,
                        text:`[深圳龙华分拣中心]您的快件由【深圳龙华分拣中心】准备发往【深圳华南城营业部】`,
                    },
                    {
                        time:`2022.09.07 11:52`,
                        text:`[深圳龙华分拣中心]您的快件已发车`,
                    },
                    {
                        time:`2022.09.07 15:57`,
                        text:`[深圳华南城营业部]您的快件在【深圳华南城营业部】收货完成`,
                    },
                    {
                        time:`2022.09.07 15:57`,
                        text:`[深圳华南城营业部]您的快件已到达【深圳华南城营业部】`,
                    },
                    {
                        time:`2022.09.07 16:49`,
                        text:`[深圳华南城营业部]【华南众包站】您的快件正在派送中，请您准备签收（快递员：杜宇新，联系电话：13623993073）。`,
                    },
                    {
                        time:`2022.09.07 19:04  星期三`,
                        text:`[华南众包站]您的快件已由便利店代收，感谢您使用京东物流，期待再次为您服务`,
                    },

        ];
        this.expressInfoList = fakeExpress;
        
    },
    watch: {
        order_id:function(NowV,oldV){
            this.getExpressInfo(NowV)
        }
    },
}
</script>

<style>
    
</style>