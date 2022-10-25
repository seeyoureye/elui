<template>
  <el-dialog
    title="分配角色权限"
    :visible.sync="setRolesIsShow.isShow"
    width="30%"
    @close="closeDialog('close')">
    <!-- 一个树状结构,默认展开 -->
    <el-tree
      ref="tree"
      :data="powerListData.powerList"
      node-key="id"
      :props="defaultProps"
      :default-expand-all="true"
      :show-checkbox="true"
      :highlight-current="false"
      :default-checked-keys="defaultTree"
      @node-click="nodeClick"></el-tree>
    <span slot="footer">
      <el-button @click="closeDialog('close')">取消</el-button>
      <el-button type="primary" @click="onSubmit">确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "setRolePower",
  props: {
    setRolesIsShow: Object,
    powerListData: Object,
  },
  data() {
    return {
      defaultProps: {
        children: "children", //指定孩子节点的标签
        label: "authName", //指定孩子节点的数据变量名
      },
      defaultTree: [],//树状列表
      onClickData:[]
    };
  },
    mounted(){
        this.onClickData = this.powerListData.itemPowList
    },
  methods: {
    //关闭
    closeDialog(action) {
      //'close'
      this.$emit("openAndCloseDialog", action, "setRolesIsShow");
    },
    onSubmit(){
        // tree 自带的一个方法,可以一次性获取所有被点击的 不对 是被勾选 的所有 id 因为绑定的是 id 所以获取的自然也是 id
        //console.log(this.$refs.tree.getCheckedKeys());
        let id = this.powerListData.id
        let str = this.$refs.tree.getCheckedKeys().join(',')
        this.sendReq(id,str)
    },
    //发送请求 修改权限 
    async sendReq(id,str){//updataposition
        let {data:res} = await this.$API.rights.updataposition(id,str)
        if(res.meta.status==200){
            this.myalert('更新成功','success')
            this.closeDialog('success')
        }else{
            this.myalert('网络异常,请稍后重试','warning')
            this.closeDialog('close')
        }
    },
    //节点被点击的函数 
    // itemobj 被点击的数据对象
    // node 节点对应的 Node node 的 key 设置的是 id 所以可以从这里获取到 id
    nodeClick(itemobj, node) {
        //console.log(itemobj,node);
    },
    //获取勾选的节点
    getDefaultTree(arr){
        let temp = [];//临时变量
        function sum(arr){
            //这里是第一层的,第一层不需要
            arr.forEach(item=>{
                //temp.push(item.id)
                if(item.children){//递归
                    sum(item.children)
                }else{//没有 children 属性 就代表是最低层了,那就push id
                    return temp.push(item.id)}})
        }
        sum(arr)
        this.defaultTree = temp;
    },

    },
};
</script>

<style>
</style>