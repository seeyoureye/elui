<template>
  <div>
    <!-- 表格 用的是 treeTabel 找的插件 -->
    <tree-table 
            :data="categoriesList" 
            :columns="columns"
            :selection-type="false"
            :expand-type="false"
            show-index
            index-text="#"
            :show-row-hover="false"
            border
            >
            <!-- 是否有效 里面有一个 icon 用动态 class 控制样式 填充了一个绿色作为背景色-->
            <template slot="Valid" slot-scope="{row}">
                <i class="i_success" :class="iconClass[row.cat_deleted ==false ? 1 :0]"></i>
            </template>
            <!-- 排序  显示 1 级 2 级 3 级 分类-->
            <template slot="sort" slot-scope="{row}">
                <MyTag :myTagData='tagArr[row.cat_level]' />
            </template>
            <!-- 操作 -->
            <template slot="myButton" slot-scope="{row}">
                    <!-- 修改 点击弹一个 dialog 然后使用 id 获取数据 修改数据 发送请求 重新获取数据 渲染页面-->
                    <MyButton style="margin-left:15px" :buttonData="buttonData[0]" @click.native='editItem(row)'/>
                    <!-- 删除 弹一个气泡是否确认 确认后删除-->
                    <el-popconfirm
                        title="是否删除这个商品分类?"
                        confirmButtonText="确认"
                        cancelButtonText="取消"
                        confirmButtonType="primary"
                        cancelButtonType="text"
                        icon="el-icon-question"
                        iconColor="#f90"
                        @confirm="deleteItem(row)"
                        :hideIcon="false">
                        <MyButton slot="reference" :buttonData="buttonData[1]"/><!--  @click.native='deleteItem(row)' -->
                    </el-popconfirm>
            </template>
    </tree-table>
  </div>
</template>

<script>
import MyTag from '@/components/myTag/index.vue';
import MyButton from '@/components/myButton/index.vue';
export default {
    name: "categoriesTable",
    props: {
        categoriesList: Array
    },
    data() {
        return {
            //每一列的宽度
            tableWidth:'320px',
            //显示的数据
            dataList: [],
            //树状结构
            columns:[
                {
                    label:'分类名称',
                    prop:'cat_name',

                },
                {
                    label:'是否有效',
                    type:'template',
                    template:'Valid'
                },
                {
                    label:'排序',
                    type:'template',
                    template:'sort'
                },
                {
                    label:'操作',
                    type:'template',
                    template:'myButton'
                }
            ],
            //传递给子组件所需的数据
            tagArr: [
                {
                    type: "primary",
                    size: "small",
                    text: "一级"
                },
                {
                    type: "success",
                    size: "small",
                    text: "二级"
                },
                {
                    type: "warning",
                    size: "small",
                    text: "三级"
                },
            ],
            //按钮需要的数据
            buttonData:[
                {
                    type:'primary',
                    icon:'el-icon-edit',
                    text:'编辑'
                },
                {
                    type:'danger',
                    icon:'el-icon-delete',
                    text:'删除'
                },
            ],
            //icon状态的切换
            iconClass:[
                'el-icon-error',
                'el-icon-success'
            ]

        };
    },
    methods: {
        // 编辑某一个
        editItem({cat_id}){
            this.$emit('responseInfo',cat_id)
        },
        // 删除 某一个 
        async deleteItem({cat_id}){
            let {data:res} = await this.$API.goods.deleteCategoriesForId(cat_id);
            if(res.meta.status==200){
                this.myalert('删除成功','success')
                this.$emit('closeOropen','delete')
            }else{
                this.myalert('网络异常,请稍后重试','success')
            }
        },
    },
    mounted() {
        //this.dataList = this.categoriesList;
    },
    components: { MyTag, MyButton }
}
</script>

<style>
.i_success{
    color:green;
}
</style>