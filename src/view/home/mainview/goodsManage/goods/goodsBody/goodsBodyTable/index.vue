<template>
  <div>
    <!-- 表格 -->
    <el-table :data="goodsList" border stripe>
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