<template>
  <div ref="border" class="border">
    <el-form
      style="margin-top: 50px"
      :model="loginInfo"
      :rules="loginRules"
      ref="loginForm"
      label-width="80px"
      :inline="false"
      size="normal"
    >
      <el-form-item label="账号" style="width: 450px" prop="username">
        <el-input
          prefix-icon="el-icon-user-solid"
          placeholder="请输入账号"
          v-model="loginInfo.username"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" style="width: 450px" prop="password">
        <el-input
          type="password"
          prefix-icon="el-icon-lock"
          placeholder="请输入密码"
          v-model="loginInfo.password"
        ></el-input>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="primary" @click="onSubmit">登陆</el-button>
        <el-button style="margin-right: 30px" @click="clear">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="logo">
      <img src="@/assets/logo.png" alt="" class="img" />
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      loginInfo: {
        username: "admin", //用户名
        password: "123456", //密码
      },
      //验证规则 遇上对应
      loginRules: {
        //required 是否必选 message 错误的提示信息 trigger 触发的条件
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 10 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 6, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //收集用户数据
    async onSubmit() {
      //this.$router.push("/home");
      // 结构获取两个需要的数据
      //let { username, password } = this.loginInfo;
      //验证规则 true 就发送请求 返回的是一个 promise 说要语法统一 都用 语法糖吧
      let res = await this.$refs.loginForm.validate();
      if (res) {
        //收集数据,其实收集可以省略了 一开始写的太零碎 留着吧,就当做过程了
       /* let data = {
          username,
          password,
        }; */
        this.sendData(this.loginInfo);
      }
    },
    //发送请求,成功进行跳转
    async sendData(data) {
      let { data: res } = await this.$API.login.reqLogin(data);
      // status 200 是成功,其他是失败
      if (res.meta.status == 200) {
        this.myalert("登陆成功", "success");
        //会返回一个 token 值那么放在哪里保存呢
        sessionStorage.setItem("token", res.data.token);
        this.$router.push("/home");
      } else {
        this.myalert("登陆失败", "error");
      }
    },
    //重置,清空数据
    clear() {
      //form 有更好的清空方式,下面那种 不能清空错误信息
      this.$refs.loginForm.resetFields();
      /* this.loginInfo = {
            username:'',
            password:'',
        } */
    },
  },
  //这两个函数无实际意义,进入 login 页面时设置一个背景颜色 也不是,设置了一个登陆了禁止进入登陆的拦截
  beforeRouteEnter(to, from, next) {
    let token = sessionStorage.getItem("token");
    if (token) {
      return next(false);
    }
    document.body.style.backgroundColor = "#264a69";
    next();
  },
  // 离开的时候重置为默认的 white
  beforeRouteLeave(to, from, next) {
    document.body.style.backgroundColor = "";
    next();
  },
};
</script>

<style lang="less">
.border {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 250px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  background-color: white;
  z-index: 999;
}
.logo {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  top: -45%;
  border: 1px solid #eee;
  border-radius: 50%;
  //overflow: hidden;
  box-shadow: 0 0 10px #ddd;
  background-color: #eee;

  width: 130px;
  height: 130px;
  padding: 10px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
//作用是响应 input 表单验证,如果验证通过则边框默认变成绿色
.el-form-item.is-success .el-input__inner,
.el-form-item.is-success .el-input__inner:focus,
.el-form-item.is-success .el-textarea__inner,
.el-form-item.is-success .el-textarea__inner:focus {
  border-color: #67c23a;
}

.el-form-item.is-success .el-input-group__append .el-input__inner,
.el-form-item.is-success .el-input-group__prepend .el-input__inner {
  border-color: transparent;
}

.el-form-item.is-success .el-input__validateIcon {
  color: #67c23a;
}
</style>