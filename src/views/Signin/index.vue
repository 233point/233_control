<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-06 15:11:42
 * @LastEditTime: 2019-09-05 09:28:41
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="main" :class="step == 1 ? 'step1' : 'step2'">
    <section v-if="step == 1" class="banner"></section>
    <div class="login-wrapper">
      <section class="signin_step1" v-if="step == 1">
        <h1>欢迎使用超链云配系统</h1>
        <div class="role_container">
          <div
            class="role_item"
            :class="role.roleUuid == item.roleUuid ? 'active' : ''"
            v-for="(item, index) in roleList"
            :key="index"
          >
            <img :src="item.img" alt="" />
            <div class="role_name">{{ item.roleName }}</div>
            <div class="tips">{{ item.des }}</div>
            <a
              class="signin_btn"
              href="javascript:;"
              @click.stop="chooseRole(item)"
              >我要入驻</a
            >
          </div>
        </div>
      </section>
      <section class="step2_wrapper" v-if="step == 2">
        <div class="signin">
          <div class="content">
            <div class="title">欢迎使用超链云配系统</div>
            <div class="hr"></div>
            <div class="tips">还没有账号么？点击下面进行注册！</div>
            <simple-tabs v-model="controlType" @change="changeControlType">
              <tab-item
                v-for="(item, index) in roleList"
                :key="index"
                :label="item.roleName"
                :value="item.roleUuid"
              ></tab-item>
            </simple-tabs>
          </div>
        </div>
        <div class="login-block">
          <div class="form-content">
            <div class="tabs_login">
              <div class="sys-logo">超链云配 | {{ role.roleName }}</div>
              <el-form
                class="login-form"
                ref="loginForm"
                :model="loginForm"
                :rules="loginRules"
                size="small"
              >
                <el-form-item prop="userAccount">
                  <el-input
                    class="login-input"
                    type="text"
                    v-model="loginForm.userAccount"
                    placeholder="用户名"
                    maxlength="50"
                  >
                    <i slot="prefix" class="el-icon-user"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="userPassword">
                  <el-input
                    class="login-input"
                    type="password"
                    v-model="loginForm.userPassword"
                    placeholder="密码"
                    maxlength="25"
                  >
                    <i slot="prefix" class="el-icon-goods"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="userRealName">
                  <el-input
                    class="login-input"
                    v-model="loginForm.userRealName"
                    placeholder="真实姓名"
                    maxlength="50"
                  >
                    <i slot="prefix" class="el-icon-document"></i>
                  </el-input>
                </el-form-item>
                <!-- <el-form-item  prop="userGender">
                  <el-radio-group v-model="loginForm.userGender">
                    <el-radio label="1">男</el-radio>
                    <el-radio label="0">女</el-radio>
                  </el-radio-group>
                </el-form-item> -->
                <el-form-item prop="userTelephone">
                  <el-input
                    class="login-input"
                    v-model="loginForm.userTelephone"
                    placeholder="座机:区号-号码"
                  >
                    <i slot="prefix" class="el-icon-phone-outline"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="userMobile">
                  <el-input
                    class="login-input"
                    v-model="loginForm.userMobile"
                    placeholder="请输入手机号"
                  >
                    <i slot="prefix" class="el-icon-mobile-phone"></i>
                  </el-input>
                </el-form-item>
                <el-form-item>
                  <div style="margin-top:8px;text-align:center;">
                    <el-button
                      class="login-button"
                      type="primary"
                      :loading="isLoginning"
                      @click="signin('loginForm')"
                      >注册</el-button
                    >
                  </div>
                  <div
                    v-if="controlType == 'merchant'"
                    style="font-size:12px;display: flex;justify-content: space-between;"
                  >
                    <el-popover
                      placement="top-start"
                      width="170"
                      trigger="hover"
                    >
                      <img
                        class="qrcode_img"
                        src="http://superlink.top/download/ctms_applet.jpg"
                        alt=""
                      />
                      <div slot="reference" class="btn ios">
                        <el-button type="text">
                          <i class="el-icon-back"></i>商户小程序</el-button
                        >
                      </div>
                    </el-popover>
                    <el-button type="text" @click="login"
                      >已有账号登录 <i class="el-icon-right"></i
                    ></el-button>
                  </div>
                  <div v-else style="font-size:12px;text-align:center">
                    <el-button type="text" @click="login"
                      >已有账号登录 <i class="el-icon-right"></i
                    ></el-button>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Validator from "@/utils/extendValidate/extendValidate";
import { encryptDes } from "@/utils/des";
import { signinUser, getRoleList } from "@/api/user";

import { simpleTabs, TabItem } from "@/components/simpleTabs";

export default {
  name: "Signin",
  data() {
    return {
      isLoginning: false,
      step: 1,
      controlType: "merchant",
      roleList: [
        {
          roleUuid: "merchant",
          roleName: "商户入驻",
          des: "我有货有仓，需要一个平台",
          img: require("@/assets/images/home/shanghuruzhu.png")
        },
        {
          roleUuid: "carrier",
          roleName: "服务商入驻",
          disabled: true,
          des: "我有人有车，需要一个平台",
          img: require("@/assets/images/home/chengyunshangruzhu.png")
        },
        {
          roleUuid: "driver",
          roleName: "司机入驻",
          des: "我也有车，需要更多钱",
          img: require("@/assets/images/home/sijiruzhu.png")
        }
      ],
      role: {
        roleUuid: "",
        roleName: ""
      },
      tabs: "login",
      loginForm: {
        userAccount: "",
        userPassword: "",
        userRealName: "",
        userGender: "1",
        userEnable: "1",
        userTelephone: "",
        userMobile: "",
        userOrgUuid: "1"
      },
      loginRules: {
        userAccount: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { validator: Validator.account, trigger: "blur" }
        ],
        userPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码最小长度6位", trigger: "blur" },
          { max: 18, message: "密码最大长度18位", trigger: "change" },
          {
            validator: Validator.simplePassword,
            message: "请包含大,小写字母,数字,特殊字符至少2项",
            trigger: "blur"
          }
        ],
        userMobile: [{ validator: Validator.cellPhone, trigger: "blur" }],
        userTelephone: [{ validator: Validator.isTelephone, trigger: "blur" }]
      },
      roleName: ""
    };
  },
  watch: {
    $route() {
      this.roleName = this.$route.query.roleType;
    },
    roleName() {
      let result = this.roleList.find(item => {
        return item.roleUuid == this.$route.query.roleType;
      });
      if (result && result.roleUuid) {
        this.step = 2;
        this.role = result;
      } else {
        this.step = 1;
      }
    }
  },
  mounted() {
    this.controlType = this.$route.query.roleType;
    let result = this.roleList.find(item => {
      return item.roleUuid == this.$route.query.roleType;
    });
    if (result && result.roleUuid) {
      this.step = 2;
      this.role = result;
    } else {
      this.step = 1;
    }
  },
  destroyed() {
    this.role = {
      roleUuid: "merchant",
      roleName: "商户"
    };
    this.step = 1;
  },
  methods: {
    getRoles() {
      getRoleList({ sys_identification: "ctms" }).then(res => {
        this.roleList = res.sys_roles;
      });
    },
    chooseRole(role) {
      if (role.roleUuid) {
        if (role.roleUuid == "driver") {
          this.$router.push("/driver-settled");
        } else {
          this.role = role;
          this.controlType = role.roleUuid;
          this.step = 2;
        }
      }
    },
    changeControlType(val) {
      if (val) {
        if (val == "driver") {
          this.$router.push("/driver-settled");
        } else {
          this.$router.push({ path: "/signin", query: { roleType: val } });
        }
      }
    },
    login() {
      this.$router.push("/login");
    },
    signin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isLoginning = true;
          const params = Object.assign({}, this.loginForm);
          params.userPassword = encryptDes(params.userPassword);
          params.roleType = this.role.roleUuid;
          params.sysType = "ctms";
          signinUser(params)
            .then(res => {
              this.isLoginning = false;
              if (!res.error) {
                this.$message({
                  message: "注册成功!",
                  type: "success"
                });
                this.$store
                  .dispatch("userLogin", {
                    userAccount: this.loginForm.userAccount,
                    userPassword: this.loginForm.userPassword,
                    sysType: "ctms"
                  })
                  .then(() => {
                    this.$router.push("/auth");
                  })
                  .finally(() => {
                    this.isLoginning = false;
                    this.resetForm(formName);
                  });
              }
            })
            .catch(() => {
              this.isLoginning = false;
            });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
  position: relative;
  .banner {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 600px;
    color: #fff;
    margin: 0;
    background: url("../../assets/images/home/banner@2x.png") no-repeat;
    background-size: cover;
    background-position: 100% 100%;
  }
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
  }
  .step2_wrapper {
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
      background: url("../../../assets/login/login_left.png");
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
          color: white;
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
        padding: 2rem 5rem;
        z-index: 10;
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
.main.step1 {
  // background: url('../../assets/images/home/banner@2x.png');
  background-color: white;
  min-height: 1080px;
}
.main.step2 {
  min-height: calc(100vh - 68px);
  background: url("../../../assets/login/banner.png");
  background-size: cover;
}
.signin_step1 {
  text-align: center;
  h1 {
    font-size: 48px;
    color: rgba(255, 255, 255, 1);
    line-height: 67px;
  }
}
.role_container {
  display: flex;
  width: 1220px;
  text-align: center;
  justify-content: space-around;
  margin: 0 auto;
  .role_item {
    text-align: center;
    width: 360px;
    height: 480px;
    background: #fff;
    padding-top: 40px;
    cursor: pointer;
    transition: all 0.2s;
    box-shadow: 0px 20px 20px 2px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    img {
      height: 80px;
      margin: 30px;
    }
  }
  .role_name {
    font-size: 20px;
    color: rgba(51, 51, 51, 1);
    line-height: 28px;
    margin: 30px;
  }
  .tips {
    font-size: 16px;
    color: rgba(51, 51, 51, 1);
    margin: 30px;
  }
  .signin_btn {
    width: 200px;
    display: inline-block;
    height: 48px;
    line-height: 48px;
    background: rgba(36, 169, 240, 1);
    color: white;
    &:hover {
      box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.08),
        2px 5px 10px 8px rgba(36, 169, 240, 0.23);
    }
    border-radius: 28px;
  }
  .content {
    font-size: 12px;
    color: rgba(51, 51, 51, 1);
    line-height: 20px;
    width: 280px;
    margin-top: 30px;
  }
  .reason {
    img.icon {
      height: 130px;
    }
    .role_name {
      margin-top: 50px;
    }
    .content {
      width: 250px;
      margin-top: 10px;
    }
  }
  .role_item.active {
    border: 3px solid blue;
    box-shadow: 0 1px 6px 0 rgba(72, 79, 128, 0.45);
  }
}
.qrcode_img {
  width: 150px;
  height: 100%;
}
</style>
