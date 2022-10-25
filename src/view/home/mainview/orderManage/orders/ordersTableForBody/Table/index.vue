<template>
  <el-table :data="goods" border stripe>
    <!--  后续编辑 : 
        现在回头看,应该头三个用v-for 剩下的手写
    -->
    <!-- 排序 -->
    <el-table-column 
        align="center"
        type="index"
        prop="prop"
        label="#"
        :width="indexWidth">
    </el-table-column>
    <!-- 订单编号 -->
    <el-table-column 
        prop="order_number"
        label="订单编号"
        width="width">
    </el-table-column>
    <!-- 订单价格 -->
    <el-table-column 
        prop="order_price"
        label="订单价格"
        :width="publicWidth">
    </el-table-column>
    <!-- 是否付款 这里需要做个判断 值是 0 和 1      0 应该是 false  1 是 true 不同值不同状态的 tag-->
    <el-table-column 
        prop="prop"
        label="是否付款"
        :width="publicWidth">
        <template slot-scope="{row}">
            <MyTag :myTagData='orderPayStatus[row.order_pay]'/>
        </template>
    </el-table-column>
    <!-- 是否发货 -->
    <el-table-column 
        prop="is_send"
        label="是否发货"
        :width="publicWidth">
    </el-table-column>
    <!-- 下单时间 得处理一下,和上一次一样 过滤-->
    <el-table-column 
        prop="prop"
        label="下单时间"
        :width="OrderTimewidth">
        <template slot-scope="{row}">
            <span>{{row.create_time | Format}}</span>
        </template>
    </el-table-column>
    <!-- 操作 与上相同,只不过换成了两个按钮-->
    <el-table-column 
        prop="prop"
        label="操作"
        :width="buttonWidth">
        <template slot-scope="{row}">
            <!--  我传入的内容是这一行的全部数据,
                    还有当前的 k 值 
                k == 0 是第一个按钮, k == 1 是第二个  -->
            <MyButton 
                @click.native="buttonOnclick(row,k)" 
                :buttonData="(item)" 
                v-for="(item,k) in buttonDatas" 
                :key="item.index"/>
        </template>
    </el-table-column>
    <!-- 我确实觉得这样写,有点太重复了 
        但是这里面需要插入两次 template 
        一个是是否付款的 另一个是 操作 
        我两个都用什么判断 肯定是 v-if
        3 次 第一次是 k(索引)==是否付款的 k 第二次是 k==操作的 k
        第三次是 v-else 其他正常显示的数据 不是,下单时间那个还得用时间戳转一次格式 更加麻烦了...
        虽然这样确实重复,目前我没有什么好办法,
        是 4 次 
        我只知道用 v-for 避免重复,但是 v-for 我得处理 4 次那么也是不合常理的 
        并且连续多次的 v-for 显示页面也会变慢
        就连本地的数据都慢,更别提以后如果是工作中的实际网络请求了...
        本来就不怎么喜欢表格,以后得多花点时间在表格上了,多看看其他人怎么处理表格上的业务

        起码现在看来最清晰的反而是这样写,然后跟上完整注释的最清晰

    -->
  </el-table>
</template>

<script>
import {Format} from '@/plugins/tool';
import MyTag from '@/components/myTag/index.vue';
import MyButton from '@/components/myButton/index.vue';
export default {
    name: "Table",
    props: {
        goods: Array,
    },
    data() {
        return {
            indexWidth: "80px",
            publicWidth: "130px",
            buttonWidth: "200px",
            //OrderNoWidth:'400px',//订单编号的宽度 让他默认撑开
            OrderTimewidth: "250px",
            //是否付款列中的的 tag 的样式,我根据 返回值的 0 和 1 两个索引值来一一对应 0 呢,让他是失败的样式, 1 是成功的
            orderPayStatus: [
                {
                    type: "danger",
                    text: "未付款",
                    close: false
                },
                {
                    type: "success",
                    text: "已支付",
                    close: false
                }
            ],
            //操作列中两个按钮的样式结构
            buttonDatas:[
                {
                    type:'primary',
                    plain:false,
                    icon:'el-icon-edit',
                    title:'修改订单地址'
                },
                {
                    type:'success',
                    plain:false,
                    icon:'el-icon-location-outline',
                }
            ]
        };
    },
    methods: {
        //data是一整行的数据, type,用来区分是哪个按钮的
        buttonOnclick(data,type){
            //为真是第二个,觉得怪也可以取反
            if(type){
                this.expressButton(data)
            }else{
                // 这里是第一个按钮,修改地址 三级联动的省市区/县,以及底下一个 input 写详细地址 
                this.editButton()
            }
        },
        //修改地址按钮的回调
        editButton(){
            // 上面说了这里是一个三级联动,首先打开一个 dialog,打开也得有一个先 放哪里呢
            // 放哪里有区别吗? 反正都是直接覆盖到最顶层
            // 虽然我认为应该放在最外层 
            // 放外面吧,让内部纯粹点,表格就只是个表格
            this.$emit('openAndClose','editStatus','open')
        },
        //显示物流信息的回调
        expressButton(data){
            this.$emit('openAndClose','expressStatus','open',data)
        }
    },
    filters: {
        //年-月-日 时:分:秒
        Format(time) {
            time = time * 1000;
            let date = new Date(time);
            return Format(date, "yyyy-MM-dd hh:mm");
        }
    },
    components: { MyTag, MyButton }
}
</script>

<style>

</style>