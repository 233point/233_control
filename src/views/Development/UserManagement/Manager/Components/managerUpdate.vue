<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-08 09:24:53
 * @LastEditTime: 2019-09-06 11:27:05
 * @LastEditors: Please set LastEditors
 -->

<template>
  <el-dialog
    width="700px"
    :title="(isCreate ? '新增' : '编辑') + '配装经理'"
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancel"
  >
    <el-form
      ref="sysForm"
      size="small"
      :rules="rules"
      :model="sysForm"
      label-width="120px"
    >
      <el-form-item prop="account" label="账号">
        <div style="display:flex">
          <el-input
            class="login-input"
            type="text"
            v-model="sysForm.account"
            :disabled="!isCreate"
            style="width:350px;margin-right:1rem"
            placeholder="请输入账号"
            maxlength="14"
            clearable
            @blur="checkAccount"
          >
          </el-input>
          <el-alert
            :closable="false"
            v-if="isCreate"
            style="padding: 0 10px;"
            :title="message.message"
            :type="message.type"
            show-icon
          >
          </el-alert>
        </div>
      </el-form-item>
      <el-form-item prop="realName" label="姓名">
        <el-input
          class="login-input"
          type="text"
          clearable
          v-model="sysForm.realName"
          placeholder="请输入姓名"
          maxlength="50"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="phone" label="手机号码">
        <el-input
          class="login-input"
          type="text"
          clearable
          v-model="sysForm.phone"
          placeholder="请输入手机号码"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="numOfID" label="身份证号">
        <el-input
          class="login-input"
          type="text"
          clearable
          v-model="sysForm.numOfID"
          placeholder="请输入身份证号"
          maxlength="50"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="haveOrg" label="员工关系">
        <el-radio-group v-model="sysForm.haveOrg" disabled>
          <el-radio label="0">雇佣</el-radio>
          <el-radio label="1">非雇佣</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-row>
        <el-col :span="6" :offset="18">
          <el-button
            type="primary"
            @click="save"
            :disabled="message.type != 'success'"
            >保存</el-button
          >
          <el-button @click="cancel">取消</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>
<script>
import Validator from "@/utils/extendValidate/extendValidate";
import store from "@/store";

// api
import { addServicepersonal, updateServicepersonal } from "@/api/user";
import { mapGetters } from "vuex";
import { checkUniqueAccount } from "@/api/common";
import { getToken } from "@/utils/auth.js";
import { BASE_PER_FIX_URL } from "@/utils/baseUrlPerFix.js";
const token = getToken();

//
const initsyssForm = {
  userId: "",
  roleType: "",
  type: "2", // 0 司机  1安装工  2配装经理（只有服务商可以选择这个）
  account: "",
  haveOrg: "0",
  phone: "",
  realName: "",
  ownerId: ""

  // city:'',
  // cityCode:'',
  // numOfID: '',
  // picOfHead: '',
  // picOfBack: '',
  // picOfHold: '',
  // picOfDriving: '',
  // skills: [],
};

export default {
  name: "sysUpdate",
  data() {
    return {
      isVisible: false,
      sysForm: {},
      message: {
        type: "info",
        message: "请先输入账号校验是否可用！"
      },
      rules: {
        account: [
          { required: true, message: "请输入账号", trigger: "change" },
          { validator: Validator.account, trigger: "blur" },
          {
            min: 4,
            max: 14,
            message: "长度在 4 到 14 个字符",
            trigger: "blur"
          }
        ],
        realName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: Validator.cellPhone, trigger: "blur" }
        ],
        numOfID: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { validator: Validator.isIdCardOnly, trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["roleType", "userId"])
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    sysData: {
      type: Object
    },
    isCreate: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    show(isShow) {
      if (isShow) {
        if (this.isCreate) {
          this.sysForm = JSON.parse(JSON.stringify(initsyssForm));
          this.sysForm.ownerId = this.userId;
        } else {
          this.sysForm = JSON.parse(JSON.stringify(this.sysData));
          this.sysForm.haveOrg = this.sysForm.haveOrg == "0" ? "0" : "1";
        }
      }
      //
      this.isVisible = isShow;
    },
    "sysForm.account": {
      handler: function(newVal, oldVal) {
        console.log(newVal, "111", oldVal);
        if (!newVal) {
          this.message = {
            type: "info",
            message: "请先输入账号校验是否可用！"
          };
        }
        // do something
      }
    }
  },
  methods: {
    check() {
      return new Promise(resolve => {
        if (this.sysForm.account) {
          checkUniqueAccount({ userAccount: this.sysForm.account }).then(
            res => {
              if (!res.error) {
                resolve(res);
              } else {
                this.message = {
                  type: "error",
                  message: "该账号已被占用，请修改账号！"
                };
                resolve({ error: true });
              }
            }
          );
        } else {
          this.message = {
            type: "info",
            message: "请先输入账号校验是否可用！"
          };
          resolve({ error: "info" });
        }
      });
    },

    async checkAccount(val) {
      let res = await this.check();
      console.log("res", res);
      if (!res.error) {
        this.message = {
          type: "success",
          message: "账号未被占用"
        };
        return true;
      } else {
        if (res.error == "info") {
          this.message = {
            type: "info",
            message: "请先输入账号校验是否可用！"
          };
        } else {
          this.message = {
            type: "error",
            message: "该账号已被占用，请修改账号！"
          };
        }
        return false;
      }
    },

    async save() {
      if (this.isCreate) {
        let result = await this.checkAccount();
        this.$refs.sysForm.validate(isValid => {
          if (isValid && result) {
            this.submit();
          }
        });
      } else {
        this.$refs.sysForm.validate(isValid => {
          if (isValid) {
            this.submit();
          }
        });
      }
    },
    submit() {
      const params = JSON.parse(JSON.stringify(this.sysForm));
      params.roleType = this.roleType;
      params.userId = this.userId;
      const submitType = this.isCreate
        ? addServicepersonal
        : updateServicepersonal;
      const submitText = this.isCreate ? "新增" : "编辑";
      submitType(params).then(res => {
        if (!res.error) {
          // this.$message({
          //   message: `${submitText}成功!`,
          //   type: "success"
          // });
          this.$alert('默认密码为 <b style="color:orange">123456</b>', `${submitText}成功!`, {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确定',
            callback: action => {
              this.cancel();
              this.$emit("updateList");
            }
          });
        }
      });
    },
    cancel() {
      this.sysForm = JSON.parse(JSON.stringify(initsyssForm));
      this.$refs.sysForm.resetFields();
      this.$emit("update:show", false);
      this.$emit("update:sysData", Object.create(null));
      this.isVisible = false;
      this.message = {
        type: "info",
        message: "请先输入账号校验是否可用！"
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.imgScan {
  width: 300px;
}
.dialogImg {
  width: 560px;
}
</style>
