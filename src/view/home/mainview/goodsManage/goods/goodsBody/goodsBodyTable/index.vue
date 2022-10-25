<template>
  <div>
    <!-- 表格 -->
    <el-table :data="goodsList" border stripe>
        <!-- 后续编辑 :
            我在这里,首次使用了v-for的形式来完成表单 写了那么多次表单在这里觉得实在是,太多余了
            为什么会出现那么多高重复度的代码 我为什么不用v-for来完成,那样只用写一次
            很快就遇到问题了,因为我要插入组件 比如说,我要放两个button 我要怎么放?
            肯定不是用v-show,因为show只是隐藏实际东西还在那就占地方
            那就是v-if和v-else
            乍一想,太对了
            后面又发现我还得操作一次,那就是时间戳转具体格式的时间
            本身我的写法 两个button才是else的,结果现在得反着写,先把两个需要特殊操作的列出来 后面再v-for其他else的内容
            不过以后我又想到了新点子,我把普通的数据给正常v-for需要操作的数据呢,我单独写那就不会出现v-for里面的 if else的性能损耗了
            只渲染普通的属性,需要更改/其他功能的我单独拎出来
            不过已经是后话了,初次的v-for现在回首看过去还是有挺多的问题的
            不过就像之前说的一样,总归是一步一个脚印 起码现在已经开始用v-for精简代码了

            当然v-for也有它的问题所在,就是来回切换页面时,会出现抖动 毕竟是v-for遍历出来的有个过程 目前没有想好有什么办法解决 比如渲染好之前不显示?
        -->
      <template v-for="(row,k) in tableOption">
        <!--创建时间 -->
          <el-table-column
            :prop="row.prop"
            :type="row.type"
            :key="row.id"
            :align="row.align"
            :label="row.label"
            :width="row.width"
            v-if="k==4">
            <!-- 这里要把数据转换一下 从时间戳变成具体的时间 -->
            <template slot-scope="{row}">
                <div><!-- 时间戳变成时间,已完成 -->
                    <span>{{row.add_time | Format}}</span>
                </div>
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column
            :prop="row.prop"
            :type="row.type"
            :key="k"
            :align="row.align"
            :label="row.label"
            :width="row.width"
            v-else-if="k==5">
            <!-- 这里两个按钮 修改 和 删除 共用一个方法,然后区分类型走向不同的分支-->
            <!-- 后续编辑 :
                随着第一次表格的v-for,拆分的组件button也迎来了它的第一次 v-for 
            -->
            <template slot-scope="{row}">
                <div>
                    <MyButton @click.native="editOrDelete(row,button.name)" v-for="button in tableoperationButton" :key="button.index" :buttonData="button" />
                </div>
            </template>
          </el-table-column>
          <!-- 其他静态数据 排序 商品名称 商品价格 商品重量-->
          <el-table-column
            :prop="row.prop"
            :type="row.type"
            :key="row.index"
            :align="row.align"
            :label="row.label"
            :width="row.width"
            v-else>
          </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
//引入的外部 js 文件(作用是时间戳变为想要的时间格式),抄的 然后改了部分,达到能用的程度
import {Format} from '@/plugins/tool';
import MyButton from '@/components/myButton/index.vue';
export default {
    name: "goodsBodyTable",
    props: {
        goodsList: Array,
    },
    data() {
        return {
            //表格需要的数据
            tableOption: [
                {
                    type: "index",
                    label: "#",
                    align: "center",
                },
                {
                    label: "商品名称",
                    prop: "goods_name",
                },
                {
                    label: "商品价格(元)",
                    prop: "goods_price",
                    width: "120",
                },
                {
                    label: "商品重量",
                    prop: "goods_weight",
                    width: "100",
                },
                {
                    label: "创建时间",
                    prop: "add_time",
                    width: "130",
                },
                {
                    label: "操作",
                    width: "190",
                },
            ],
            //按钮需要的数据
            tableoperationButton: [
                {
                    name: "edit",
                    icon: "el-icon-edit",
                    type: "primary",
                },
                {
                    name: "delete",
                    icon: "el-icon-delete",
                    type: "danger",
                }
            ],
        };
    },
    methods:{
        //操作中的两个按钮对于的操作
        editOrDelete(row,type){
            let {goods_id} = row
            //这个时候才结构是一开始不确定需要什么数据,改也行 如果普遍都是使用 id 获取信息的话,以后也可以只接收 id
            //修改
            if(type=='edit'){
                this.getData(goods_id)
            }else{
            //删除 通过 id 删除 然后刷新页面 如果列表长度 == 1 当前页就 自减 1 我还是喜欢做删除,说实话特别的轻松 属于完成度比较高的时候才做的事情
            this.deleteNeedId(goods_id)
            }
        },
        // 编辑按钮通过 id 获取信息,然后渲染页面
        async getData(goods_id){
            let {data:res} = await this.$API.goods.getItemGoodsInfo(goods_id)
            if(res.meta.status==200){
                let data = res.data;
                this.$store.dispatch('editGoods',data);
                this.$router.push('/home/goods/addGoods');
                sessionStorage.setItem('childName','编辑页面')
            }

        },
        // 删除的逻辑
        async deleteNeedId(id){
            let {data:res} = await this.$API.goods.deleteItemGoods(id);
            if(res.meta.status==200){
                this.$emit('removeGetData');
                this.myalert('删除成功','success')
            }else{
                this.myalert()
            }
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
    components: { MyButton }
};
</script>

<style>
</style>