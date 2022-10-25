<template>
  <div>
    <!-- 后续编辑 : 子页面,说实话挺难的
      当时是 row 里面套row 虽然解决了横向展示,但是我不知道怎么展示出第三级的内容 后面使用了非常蠢的方法
      我又一次遍历了一次,
      因为我只能在第一次 v-for的时候,获取第一层及和第二层级所需的信息,第三层级的我拿不到手,为什么?写的地方不对啊,我不是直接在里面写的,我是想要横着展示
      所以我把 第二级,和第三级嵌套了 用row里面套了一个row的方式来完成这种横向展示,说实话与我一开始的想法是背道而驰的
      我当时第一时间是想着直接一层一层的v-for循环,然后再调整数据的位置,发现基本办不到,因为row的,也可以说我熟练度太低
      反正最终的解决方案是等同于 第一层一样的获取方式
      嵌套了第二层和第三层 达到类似的效果通过v-for 获取到item,再item.的children进行遍历
     -->
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
      }else{
        this.myalert();
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