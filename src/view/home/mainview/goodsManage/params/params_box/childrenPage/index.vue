<template>
  <div>
     <!-- 头部 -->
     <div class="onlyPageHeader">
      <MyButton :buttonData="data.myHeaderButtonData" @click.native="SharePageDialogMethod('open','myAddDialog')"  />
    </div>
    <!-- 表格 -->
    <div class="onlyPageBody">
     <el-table ref="tableTree" :data="data.formData" border stripe>
      <!-- 一个展开列,写在外面 不影响内部的索引顺序,也可以说最开始没想好怎么写吧 -->
      <el-table-column type="expand" align="center">
        <!-- tree 这里写一个子组件,不然容易乱 -->
        <template slot-scope="{row}">
          <div>
            <!-- 表格中的树形结构 -->
            <TableInItemTree @SharePageDialogMethod="SharePageDialogMethod" :itemData="row" :DataList="row.attr_vals.split(',')"/> <!-- /[\s\n]/ -->
          </div>
        </template>
      </el-table-column>
      <!-- 我是用 v-for 写的,写的表格 所以在切换时会出现抖动,说实话想不到解决的办法什么渲染完之前不显示页面也不合理 本身应该是展示的 只不过是空白 现在切换页面会 或许应该加个什么延时? 0.5s 后再切换页面? -->
      <template v-for="(col,k) in data.columns">
        <!-- 如果不是, v-else 正常显示 还有个树形结构怎么写  不写在循环里面,在外面写-->
      <el-table-column 
        :prop="col.prop"
        :key="k"
        :type="col.type"
        :label="col.label"
        :width="col.width"
        v-if="k<2">
      </el-table-column>
        <!-- 如果是操作,就是 索引 = 2 最后一列  显示两个按钮-->
        <el-table-column 
        :prop="col.prop"
        :key="col.id"
        :type="col.type"
        :label="col.label"
        :width="col.width"
        v-if="k==2"
        > <!-- 两个按钮 编辑/删除 -->
        <template slot-scope="{row}">
          <div>
            <MyButton v-for="(item,k) in data.editAndDelete" :key="k" :buttonData="item" @click.native="$emit('onClick',row,item.text)"/>
          </div>
        </template>
      </el-table-column>
      </template>
     </el-table>
    </div>
    <!-- 弹出层 添加的界面 -->
    <PageShareDialog :mydialog='data.myAddDialog' :type="type" @SharePageDialogMethod="SharePageDialogMethod"/>
    <!-- 弹出层 编辑的页面 -->
    <EditPageShare v-if="data.myEditDialog" :editItemData="data.editNeedData" :mydialog='data.myEditDialog' :type="type" @SharePageDialogMethod="SharePageDialogMethod"/>
  </div>
</template>

<script>
import MyButton from '@/components/myButton/index.vue';
import TableInItemTree from '../manyPage/tableInItemTree'
import PageShareDialog from '../pageShareDialog';
import EditPageShare from '../editPageShare';
export default {
    name:'childrenPage',
    props:{
        data:Object,
        type:String
    },
    methods:{
        //两个方法没什么用处,就是向上穿透参数 这个组件是后改的
        // 写完才发现两个页面高度相似 所以改的有点小毛病
        SharePageDialogMethod(action,obj,value){
            this.$emit('SharePageDialogMethod',action,obj,value)
        },
        onClick(itemInfo,type){
            this.$emit('onClick',itemInfo,type)
        }
    },
    components: { MyButton, TableInItemTree, PageShareDialog, EditPageShare }

}
</script>

<style>

</style>