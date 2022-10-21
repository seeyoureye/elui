<template>
  <div>
    <el-row
      :gutter="0"
      type="flex"
      align="middle"
      v-for="(firstRole, index) in item.children"
      :key="firstRole.id"
      class="bdbotton"
      :class="{ bdtop: index == 0 }"
    >
      <!-- 一级权限 -->
      <el-col :span="5">
        <div class="setLeft">
          <el-tag
            size="normal"
            closable
            @close="closeItemTag(firstRole, item)"
            >{{ firstRole.authName }}</el-tag
          >
          <i class="el-icon-caret-right"></i>
        </div>
      </el-col>
      <!-- 二级权限 跟 三级权限 
                    必须嵌套,因为这一层级,只能获取 1 级的 和 2 级的
                    3 级所需要的内容不嵌套,无法获取 secondRole.children
                -->
      <el-col :span="19">
        <el-row v-for="(secondRole, index) in firstRole.children" :key="index">
          <el-col :span="6">
            <el-tag
              type="success"
              size="normal"
              closable
              @close="closeItemTag(secondRole, item)"
              >{{ secondRole.authName }}</el-tag
            >
            <i class="el-icon-caret-right"></i>
          </el-col>
          <el-col :span="18">
            <el-tag
              style="margin: 10px"
              closable
              @close="closeItemTag(threeRole, item)"
              type="warning"
              size="normal"
              v-for="(threeRole, index) in secondRole.children"
              :key="index"
            >
              {{ threeRole.authName }} </el-tag
            ><!-- closable @close="" -->
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "subPage",
  props: {
    subPagedata: Array,
    item: Object, //完整的对象
  },
  methods: {
    //删除指定的权限 第一次参数是 被点击的元素 id 第二个参数 是角色自身的 整体
    closeItemTag(item, full) {
      //console.log(item);
     /*  if(item.children){
        item.children.forEach(item=>{
            //console.log(item);
            this.closeItemTag(item,full)
            })
        }else{
             //let res = []
            this.sendReq(item,full)
            //let result = Promise.all(res)
            //if(result){
            //}
        } */
        this.sendReq(item,full)
    },
    async sendReq(item,full){
        let { data: res } = await this.$API.rights.removeRolePower(
        full.id,
        item.id
      );
      if (res.meta.status == 200) {
        //可以通过这种方式,改变本身的数据
        full.children = res.data
      }
    },
    alertAndUpdateData(){
        //this.$emit("ifRemoveRolesPower");
        //this.myalert("更新权限信息成功", "success");
    }
  },
};
</script>

<style scoped>
.el-row {
  margin: 10px;
}
.bdbotton {
  border-bottom: 1px solid #eee;
}
.bdtop {
  border-top: 1px solid #eee;
}
.setLeft {
  padding-left: 50px;
}
</style>