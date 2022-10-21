<template>
  <el-dialog
    title="编辑用户信息"
    :visible.sync="editUserData.isShow"
    width="40%"
    @close="closeDialog"
  >
    <el-form
      :model="editUserInfo"
      ref="form"
      :rules="UserRules"
      label-width="80px"
      :inline="false"
      size="normal"
    >
      <el-form-item label="用户名称" style="width: 500px">
        <el-input v-model="editUserInfo.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" style="width: 500px">
        <el-input v-model="editUserInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" style="width: 500px">
        <el-input v-model="editUserInfo.mobile"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button @click="closeDialog">Cancel</el-button>
      <el-button type="primary" @click="onSubmit">OK</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "EditUserInfoDialog",
  props: {
    editUserData: Object,
  },
  mounted() {
    // id
    let id = this.$store.getters.getUserId;
    this.getUserData(id);
  },
  data() {
    return {
      editUserInfo: {
        username: "",
        mobile: "",
        email: "",
      },
      UserRules: {},
      userId: "", //id
      usermobile: "",
      useremail: "",
    };
  },
  methods: {
    //关闭时的逻辑
    closeDialog() {
      // 自定义方法, name , 关闭 , 关闭的对象名称
      this.$emit("openOrCloseDialog", "close", "editUserData");
      this.editUserInfo = {
        username: "",
        mobile: "",
        email: "",
      };
    },
    //确认按钮, 提取数据,发送请求 重新获取数据
    onSubmit() {
      let { id, email, mobile } = this.editUserInfo;
      let { userId, useremail, usermobile } = this;
      //做个判断,是否相等 相等的话 值为空,不相等 以新值为准
      email = useremail == email ? "" : email;
      mobile = usermobile == mobile ? "" : mobile;
      this.checkInfo(userId, email, mobile);
    },
    //做判断
    checkInfo(id, email, mobile) {
      //完全没有修改
      if (!email && !mobile) {
        //那我,不发请求了 直接退出 dialog 清空 数据
        this.$emit("openOrCloseDialog", "close", "editUserData");
        this.editUserInfo = {
          username: "",
          mobile: "",
          email: "",
        };
        this.myalert("修改成功", "success");
      } else if (!email) {//邮箱没有修改
        this.sendData(id,{ mobile ,email:this.useremail});
      } else if (!mobile) {//手机号没有修改
        this.sendData(id,{ email ,mobile:this.usermobile});
      } else {//全部修改了
        this.sendData(id,{  email, mobile });}
    },
    //发送请求
    async sendData(id,data) {
      let { data: res } = await this.$API.users.editUser(id,data);
        if(res.meta.status==200){
            this.myalert('更新用户信息成功','success');
            this.$emit('openOrCloseDialog','edit','editUserData')
        }else{
            this.myalert('网络异常,请稍后重试','danger');
            //上方的关闭函数复用
            this.closeDialog()
        }
    },
    //根据 id 获取数据 方法是 vuex  getter获取参数
    async getUserData(id) {
      let { data: res } = await this.$API.users.searchUser(id);
      if (res.meta.status == 200) {
        this.editUserInfo = res.data;
        //同时收集一份数据,作为对比 如果提交的时候  a1 == a2 那么 值为 ''/不传值 等等
        this.userId = res.data.id;
        this.usermobile = res.data.mobile;
        this.useremail = res.data.email;
      } else {
        this.myalert("网络异常,请稍后重试", "warning");
      }
    },
  },
};
</script>

<style>
</style>