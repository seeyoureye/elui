<template>
  <el-dialog
    title="添加用户"
    :visible="addUserData.isShow"
    width="40%"
    @close="close"
  >
    <el-form
      :model="addUserInfo"
      ref="AddUserform"
      :rules="addUserRules"
      label-width="80px"
      :inline="false"
      size="normal"
    >
      <el-form-item label="用户名称" prop="username">
        <el-input v-model="addUserInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" prop="password">
        <el-input v-model="addUserInfo.password"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" :required="true">
        <el-input v-model="addUserInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" :required="true">
        <el-input v-model="addUserInfo.mobile"></el-input>
      </el-form-item>
    </el-form>

    <span slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="verificationInfo">确认</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "addUserDialog",
  props: {
    addUserData: Object,
  },
  data() {
    return {
      //收集所需的数据
      addUserInfo: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      //验证规则
      addUserRules: {
        username:[
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
        ],
        email:[
          { required: true, message: "请输入电子邮箱", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //关闭/取消
    close() {
      //清空数据
      this.$refs.AddUserform.resetFields();
      this.$emit("openOrCloseDialog",'close','addUserData');
    },
    // 验证规则是否通过
    async verificationInfo(){
      let res = await this.$refs.AddUserform.validate();
      if(res)this.addUser()

      return this.myalert('请重新输入','danger')
    },
    //添加 我直接在这里添加吧
    async addUser() {
        let {data:res} = await this.$API.users.addUser(this.addUserInfo)
        //成功的逻辑 发送请求,清空数据,关闭 dialog 页面
        if(res.meta.status==201){
            this.myalert(res.meta.msg,'success')
            this.$refs.AddUserform.resetFields();
            this.$emit('openOrCloseDialog','add','addUserData')
        }else{//如果失败了,弹出一个信息提示 并且清空数据 关闭 dialog 页面
            this.myalert('用户创建失败,请稍后重试','warning')
            this.close()
        }
    },
  },
};
</script>

<style>
</style>