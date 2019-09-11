<template>
  <el-dialog
    width="600px"
    :title="isCreate ? '新增用户' : '编辑用户'"
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancel"
  >
    <el-form
      ref="userForm"
      :model="userForm"
      :rules="formRules"
      label-width="80px"
    >
      <el-row>
        <el-col>
          <el-form-item v-if="isCreate" label="用户名" prop="account">
            <div class="account_area">
              <el-input
                v-model="userForm.account"
                :disabled="!isCreate"
                maxlength="20"
                @blur="checkAccount"
              />
              <el-alert
                :closable="false"
                v-if="isCreate"
                style="padding: 0 10px;margin-left: 10px;"
                :title="message.message"
                :type="message.type"
                show-icon
              >
              </el-alert>
            </div>
          </el-form-item>
          <el-form-item v-else label="用户名">
            <span>{{ userForm.account }}</span>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
          <el-form-item label="密码" prop="userPassword">
            <el-input type="password" v-model="userForm.userPassword"  />
          </el-form-item>
        </el-col> -->
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="真实姓名" prop="realName">
            <el-input v-model="userForm.realName" maxlength="50" />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
          <el-form-item label="性别" prop="userGender">
            <el-radio-group v-model="userForm.userGender">
              <el-radio label="1">男</el-radio>
              <el-radio label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col> -->
      </el-row>
      <el-row v-if="isCreate">
        <el-col>
          <el-form-item label="角色" prop="type">
            <el-select
              class="w100p"
              v-model="userForm.type"
              filterable
              placeholder="请选择角色"
            >
              <el-option
                v-for="item in roleList"
                :key="item.id"
                :label="item.roleName"
                :value="item.type"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="!isCreate">
        <el-col>
          <el-form-item label="角色">
            <span>{{ userForm.roleTypeMessage }}</span>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="12">
          <el-form-item label="状态" prop="userEnable">
            <el-radio-group v-model="userForm.userEnable">
              <el-radio label="1">启用</el-radio>
              <el-radio label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col> -->
      </el-row>
      <el-row>
        <!-- <el-col :span="12">
          <el-form-item label="座机" prop="userTelephone">
            <el-input v-model="userForm.userTelephone" placeholder="座机:区号-号码" />
          </el-form-item>
        </el-col> -->
        <el-col>
          <el-form-item label="手机" prop="phone">
            <el-input v-model="userForm.phone" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="18">
          <el-button type="primary" @click="save" :loading="isSaving"
            >保存</el-button
          >
          <el-button @click="cancel">取消</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>
<script>
/**
 * User Add Component
 * ----------------------
 * Author: zhou qi
 * Date: 2018.03.20
 */
// validate
import Validator from "@/utils/extendValidate/extendValidate";
import { checkUniqueAccount } from "@/api/common";

// api
import { addCtmsUser, usermodiy } from "@/api/user";

export default {
  name: "UserEdit",
  data() {
    return {
      isSaving: false,
      isVisible: false,
      orgnization: [],
      userForm: {
        account: "",
        realName: "",
        phone: "",
        type: ""
      },
      message: {
        type: "info",
        message: "请先输入账号校验是否可用！"
      },
      formRules: {
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { validator: Validator.account, trigger: "blur" }
        ],
        realName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        userPassword: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码最小长度6位", trigger: "blur" },
          { max: 18, message: "密码最大长度18位", trigger: "change" },
          { validator: Validator.simplePassword, trigger: "blur" }
        ],
        type: [{ required: true, message: "请选择角色", trigger: "blur" }],
        phone: [{ validator: Validator.cellPhone, trigger: "blur" }],
        userTelephone: [{ validator: Validator.isTelephone, trigger: "blur" }]
      },
      options: [],
      roleList: [
        {
          type: "marcketManager",
          roleName: "商场负责人"
        },
        {
          type: "cityManager",
          roleName: "城市负责人"
        },
        {
          type: "regionMarcketManager",
          roleName: "商场区域负责人"
        },
        {
          type: "regionManager",
          roleName: "区域负责人"
        }
      ]
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    isCreate: {
      type: Boolean,
      required: true
    },
    modifyUser: {
      type: Object
    }
  },
  watch: {
    show(isShow) {
      this.isVisible = isShow;
      if (isShow) {
        if (this.isCreate) {
        } else {
          // this.message = {
          //   type: 'success',
          //   message: '',
          // }
          this.userForm = JSON.parse(JSON.stringify(this.modifyUser));
        }
      }
    },
    "sysForm.account": {
      handler: function(newVal, oldVal) {
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
        if (this.userForm.account) {
          checkUniqueAccount({ userAccount: this.userForm.account }).then(
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
        this.$refs.userForm.validate(isValid => {
          if (isValid && result) {
            this.submit();
          }
        });
      } else {
        this.$refs.userForm.validate(isValid => {
          if (isValid) {
            this.submit();
          }
        });
      }
    },
    submit() {
      let { account, realName, phone } = this.userForm;
      let type;
      if (this.isCreate) {
        type = this.userForm.type;
      } else {
        type = this.userForm.roleType;
      }
      this.inSaving = true;
      if (this.isCreate) {
        addCtmsUser({
          account: account,
          realName: realName,
          phone: phone,
          type: type
        }).then(res => {
          this.inSaving = false;
          if (!res.error) {
            this.$message({
              message: "添加用户成功!",
              type: "success"
            });
            this.cancel();
            this.$emit("updateList");
          }
        });
      } else {
        usermodiy({
          id: this.userForm.id,
          realName: this.userForm.realName,
          phone: this.userForm.phone
        }).then(res => {
          this.inSaving = false;
          if (!res.error) {
            this.$message({
              message: "编辑用户成功!",
              type: "success"
            });
            this.cancel();
            this.$emit("updateList");
          }
        });
      }
    },
    cancel() {
      this.$refs.userForm.resetFields();
      (this.userForm = {
        account: "",
        realName: "",
        phone: "",
        type: ""
      }),
        (this.message = {
          type: "info",
          message: "请先输入账号校验是否可用！"
        });
      this.$emit("update:show", false);
      this.isVisible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.account_area {
  display: flex;
  .el-input {
    flex: 0 0 200px;
  }
}
</style>
