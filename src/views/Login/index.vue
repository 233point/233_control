<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-06 15:11:42
 * @LastEditTime: 2019-08-28 18:07:32
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="main">
    <div class="login-wrapper">
      <div class="signin">
        <div class="content">
          <div class="title">欢迎使用233次元系统</div>
          <div class="hr"></div>
          <div class="tips">还没有账号么？点击下面进行注册！</div>
          <simple-tabs v-model="controlType" @change="changeControlType">
            <tab-item
              v-for="(item, index) in tabList"
              :key="index"
              :label="item.name"
              :value="item.index"
            ></tab-item>
          </simple-tabs>
        </div>
      </div>
      <div class="login-block">
        <div class="form-content">
          <div class="tabs_login">
            <div class="sys-logo">登录233次元控制台</div>
            <el-form
              class="login-form"
              ref="loginForm"
              :model="loginForm"
              :rules="loginRules"
              size="medium"
            >
              <el-form-item prop="userAccount">
                <el-input
                  class="login-input"
                  type="text"
                  maxlength="50"
                  minlength="1"
                  v-model="loginForm.userAccount"
                  placeholder="用户名"
                >
                  <i slot="prefix" class="el-icon-user"></i>
                </el-input>
              </el-form-item>
              <el-form-item prop="userPassword">
                <el-input
                  class="login-input"
                  type="password"
                  maxlength="25"
                  minlength="1"
                  v-model="loginForm.userPassword"
                  @keyup.enter.native="login('loginForm')"
                  placeholder="密码"
                >
                  <i slot="prefix" class="el-icon-goods"></i>
                </el-input>
                <a
                  href="javascript:;"
                  class="forgetPassword"
                  @click.stop="forgetPassword"
                  >忘记密码？</a
                >
              </el-form-item>
              <el-form-item>
                <div style="margin-top:8px;text-align:center;">
                  <el-button
                    class="login-button"
                    type="primary"
                    :loading="isLoginning"
                    @click="login('loginForm')"
                    >登录</el-button
                  >
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { simpleTabs, TabItem } from "@/components/simpleTabs";

export default {
  name: "Login",
  data() {
    return {
      isLoginning: false,
      loginForm: {
        userAccount: "",
        userPassword: "",
        sysType: "ctms"
      },
      loginRules: {
        userAccount: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        userPassword: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      },
      controlType: "",
      tabList: [
        {
          name: "商户入驻",
          index: "merchant"
        },
        {
          name: "司机入驻",
          index: "driver"
        },
        {
          name: "服务商入驻",
          index: "carrier",
          disabled: true
        }
      ]
    };
  },
  mounted() {},
  methods: {
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isLoginning = true;
          this.$store
            .dispatch("userLogin", { ...this.loginForm })
            .then(() => {
              this.$router.push("/dash");
            })
            .finally(() => {
              this.isLoginning = false;
            });
        } else {
          return false;
        }
      });
    },
    forgetPassword() {
      this.$message({
        message: "请联系系统管理员修改密码",
        type: "warning"
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    changeControlType(val) {
      if (val) {
        if (val == "driver") {
          this.$router.push("/driver-settled");
        } else {
          this.$router.push({ path: "/signin", query: { roleType: val } });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: url("https://cdn.calamus.xyz/blog_ali/calamus_02.png");
  background-size: cover;
  // background-size: cover;
  // background:linear-gradient(333deg,rgba(37,165,201,1) 0%,rgba(121,139,255,1) 100%);;
  min-height: calc(100vh - 68px);
  position: relative;
  .logo {
    width: 100%;
    border-bottom: 1px solid white;
    color: white;
    height: 4rem;
    line-height: 4rem;
    text-align: left;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding-left: 2rem;
    span {
      margin-left: 2rem;
      font-size: 1.6rem;
    }
    img {
      height: 2rem;
    }
  }
  .login-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-height: 300px;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 7rem 7.5rem;
    .signin {
      position: relative;
      color: white;
      margin-right: -5px;
      min-height: 300px;
      background: url("https://233.calamus.xyz/3.jpg");
      padding: 10px;
      padding: 10px;
      display: flex;
      align-items: flex-end;
      .content {
        padding-bottom: 2rem;
        .title {
          color: white !important;
          padding-left: 1rem;
          font-size: 16px;
        }
        .tab__item {
          color: white !important;
        }
        .tips {
          padding: 1rem 0 1rem 1rem;
        }
        .hr {
          background: white !important;
          margin-left: 1rem;
          margin-top: 1rem;
          height: 2px;
          width: 20%;
          text-align: left;
        }
      }
    }
    .login-block {
      display: flex;
      justify-content: center;
      flex-direction: column;
      position: relative;
      .scan-btn {
        text-align: center;
        display: inline-block;
        width: 100%;
        text-decoration: none;
        font-size: 1.2rem;
      }
      .scan-back-btn {
        text-decoration: none;
        font-size: 1.2rem;
        margin-bottom: 25px;
        display: inline-block;
      }
      .form-content {
        box-shadow: 0 0 45px rgba(0, 0, 0, 0.18);
        background-color: white;
        border-radius: 10px;
        z-index: 10;
        height: 340px;
        .tabs_login {
          height: 220px;
          margin: 60px 50px;
        }
        .sys-logo {
          font-size: 1.5rem;
          text-align: center;
          color: rgba(51, 51, 51, 1);
        }
        .login-form {
          padding-top: 25px;

          .login-input {
            width: 220px;
          }

          .login-button {
            border-radius: 18px;
            background-color: var(--color-primary) !important;
            color: white !important;
            width: 100%;
          }
          .forgetPassword {
            font-size: 0.8rem;
            display: block;
            color: rgba(154, 154, 154, 1);
          }
        }
      }
    }
  }
}
</style>
