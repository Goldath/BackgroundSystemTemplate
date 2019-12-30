/* eslint-disable vue/no-parsing-error */
<template>
  <div class="login">
    <div class="login-form">
      <div class="sys-logo">
        <img src="../assets/logo.png" />
      </div>
      <div class="sys-name">可芽后台管理系统</div>
      <div class="sys-small">Bud Background Management System</div>
      <div class="input-form">
        <Form ref="ruleForm" :model="loginForm" :rules="ruleValidate">
          <FormItem prop="userName">
            <i-input v-model="loginForm.userName" placeholder="请输入用户名">
              <i class="iconfont loginicon" slot="prefix">&#xe623;</i>
            </i-input>
          </FormItem>

          <FormItem prop="password">
            <i-input
              v-model="loginForm.password"
              placeholder="请输入密码"
              type="password"
              password
              class="mt25"
            >
              <i class="iconfont loginicon" slot="prefix">&#xe63d;</i>
            </i-input>
          </FormItem>

          <FormItem>
            <Button type="success" long class="mt30" @click="handleSubmit">登录</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {},
      ruleValidate: {
        userName: [
          {
            required: true,
            message: "用户名不能为空，请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空，请输入密码",
            trigger: "blur"
          }
        ]
      },
      timer: 0,
      isGetToken: false
    };
  },
  mounted() {
    //2小时定时器，自动获取最新token
    this.timer = setInterval(() => {
      this.getServerToken(this.loginForm);
    }, 12000000);
  },
  methods: {
    /* 点击登录按钮事件 */
    handleSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.getServerToken(this.loginForm); //获取token
          /* 调取登录的接口 */
          if (this.isGetToken) {
            this.$http
              .get(
                `/api/sysAdmin/getAdminByLoginName/${this.loginForm.userName}`
              )
              .then(res => {
                if (res.data.code == 200) {
                  console.log(res.data.data);
                } else {
                  this.$Message.error(res.data.msg);
                  this.$router.redirect("/Login");
                }
              });
          }
        } else {
          this.$Message.error("信息验证失败！");
        }
      });
    },
    /* 获取服务器token */
    getServerToken(loginObject) {
      // 将对象序列化，多个对象之间用&拼接
      this.$http.post(`/token`, this.$qs.stringify(loginObject)).then(res => {
        if (res.data.code == 200) {
          // console.log(res.data.data);
          let tempData = res.data.data;
          localStorage.setItem("token", tempData.access_token);
          this.isGetToken = true;
        } else {
          /* 获取token失败或者过期的就重定向回登录页面 */
          this.$Message.error(res.data.msg);
          this.$router.redirect("/Login");
        }
      });
    }
  }
  // //销毁前清除定时器
  // beforeDestroy() {
  //   console.log("qingchu");
  //   clearInterval(this.timer);
  // }
};
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/backgroud/loginbg.png) no-repeat center;
  background-attachment: fixed;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  .login-form {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 365px;
    margin: -240px 0 0 -150px;
    // background: rgba(255, 255, 255, 0.3);
    //  border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-items: center;
    overflow: hidden;
    .sys-logo {
      img {
        width: 64px;
        height: 64px;
      }
    }
    .sys-name {
      padding-top: 10px;
      font-size: 30px;
      color: #ffffff;
    }
    .sys-small {
      color: #ffffff;
    }
    .input-form {
      margin-top: 25px;

      .loginicon {
        font-size: 24px;
        line-height: 45px;
        color: #808695;
      }

      ::v-deep .ivu-input {
        height: 45px;
        line-height: 45px;
        border-radius: 12px;
        font-size: 18px !important;
      }
      ::v-deep .ivu-input-with-prefix {
        padding-left: 55px;
      }
      ::v-deep .ivu-input-prefix {
        line-height: 45px;
        left: 15px;
      }
      ::v-deep .ivu-input-suffix {
        line-height: 45px;
      }
      ::v-deep .ivu-input-suffix .ivu-icon {
        font-size: 24px;
        line-height: 45px;
        color: #808695;
      }
      ::v-deep .ivu-btn-long {
        height: 45px;
        line-height: 45px;
        border-radius: 12px;
        font-size: 18px;
        font-weight: bold;
        border: none;
        background: linear-gradient(to right, #0d25b9, #fd6585);
      }

      ::v-deep .ivu-form-item {
        margin-bottom: 0px;
      }
    }
  }
}
</style>>
