<template>
  <el-table :data="dataList" border stripe>
    <!-- 左侧第一列 -->
    <el-table-column
      prop="prop"
      type="index"
      label="#"
      align="center"
      :width="80"
    >
    </el-table-column>
    <!-- 第二列 -->
    <el-table-column prop="authName" label="权限名称" :width="widthNum">
    </el-table-column>
    <!-- 第三列 -->
    <el-table-column prop="path" label="路径" :width="widthNum">
    </el-table-column>
    <!-- 第四列 -->
    <el-table-column prop="prop" label="权限等级" :width="widthNum">
      <template slot-scope="{ row }">
        <!-- 子组件,封装的 tag -->
        <MyTag :myTagData="myTagData(row.level)" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import MyTag from "@/components/myTag/index.vue";
export default {
  name: "myList",
  props: {
    // 传入的数据
    dataList: Array,
  },
  data() {
    return {
        //给表格设置统一的宽度,其实这种属性可以更加细致 不仅仅只是设置一个固定的宽度
      widthNum: 389,
    };
  },
  methods: {
    // 根据传入的不同数值,返回不同的信息
    myTagData(levelNum) {
      let obj =  {
        type: "",
        size: "medium",
        text: "",
      }
      if (levelNum == 0) {
        obj.type = "primary";
        obj.text = "一级";
        return obj;
      } else if (levelNum == 1) {
        obj.type = "success";
        obj.text = "二级";
      } else if (levelNum == 2) {
        obj.type = "warning";
        obj.text = "三级";
      }
        return obj;
    },
  },
  components: { MyTag },
};
</script>

<style>
</style>