<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-26 13:45:12
 * @LastEditTime: 2019-08-16 16:11:47
 * @LastEditors: Please set LastEditors
 -->
<template>
  <common-content :flex="110">
    <div class="detail_container">
      <el-row class="title">
        <span>基本信息</span>
        <!-- <a-icon v-if="!editable" type="edit" @click.native="editForm"/> -->
      </el-row>
      <el-form
        ref="userForm"
        :model="userForm"
        :rules="formRules"
        label-width="85px"
      >
        <el-form-item label="账号" prop="userAccount">
          <span>{{ userForm.userAccount }}</span>
        </el-form-item>
        <el-form-item label="所属角色" prop="roleType">
          <span>{{ formatterRoleType(userForm.roleType) }}</span>
        </el-form-item>
        <el-form-item label="姓名" prop="userRealName">
          <el-input
            v-if="editable"
            class="login-input"
            v-model="userForm.userRealName"
            maxlength="50"
          />
          <span v-else>{{ userForm.userRealName }}</span>
        </el-form-item>
        <el-form-item
          v-if="
            userForm.roleType == 'merchant' || userForm.roleType == 'carrier'
          "
          label="座机"
          prop="userTelephone"
        >
          <el-input
            v-if="editable"
            class="login-input"
            v-model="userForm.userTelephone"
            placeholder="座机:区号-号码"
          />
          <span v-else>{{ userForm.userTelephone }}</span>
        </el-form-item>
        <el-form-item label="手机" prop="userMobile">
          <el-input
            v-if="editable"
            class="login-input"
            v-model="userForm.userMobile"
          />
          <span v-else>{{ userForm.userMobile }}</span>
        </el-form-item>
        <el-form-item v-if="editable" label-width="0" style="text-align:center">
          <el-button @click="cancel">取消</el-button>
          <el-button type="primary" @click="confirm">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </common-content>
</template>

<script>
// API
import { editPassword, getUserInfo } from "@/api/my";
import { updateUser } from "@/api/user";
import Validator from "@/utils/extendValidate/extendValidate";
import { getToken } from "@/utils/auth.js";
import CommonContent from "@/components/commonContent";
import { Role_Type_list } from "@/utils/ENUM";

export default {
  name: "ModifDetail",
  components: { CommonContent },
  data() {
    return {
      editable: false,
      userForm: {
        userAccount: "",
        userRealName: "",
        userOrgUuid: "1",
        userOrgUuidList: [],
        userEnable: "1",
        userTelephone: "",
        userMobile: "",
        userUuid: ""
      },
      formRules: {
        userOrgId: [{ required: true, message: "请选择机构", trigger: "blur" }],
        userMobile: [{ validator: Validator.cellPhone, trigger: "blur" }],
        userTelephone: [{ validator: Validator.isTelephone, trigger: "blur" }]
      },
      roleList: Role_Type_list
    };
  },
  mounted() {
    this.getDetail();
  },
  methods: {
    editForm() {
      this.editable = true;
    },
    getDetail() {
      getUserInfo({ token: getToken() }).then(res => {
        this.userForm = Object.assign(this.userForm, res);
      });
    },
    confirm() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          const params = Object.assign({}, this.userForm);
          params.userId = this.$store.getters.userId;
          updateUser(params).then(res => {
            if (!res.error) {
              this.$store.dispatch("getUserInfo").then(() => {
                this.$message({
                  message: "个人信息修改成功！",
                  type: "success"
                });
                this.$router.push("/dash");
              });
            }
          });
        }
      });
    },
    cancel() {
      this.$refs.userForm.resetFields();
      this.$router.push("/dash");
    },
    formatterRoleType(role) {
      let result = this.roleList.find(item => {
        return item.value == role;
      });
      return result ? result.label : "未知";
    }
  }
};
</script>
<style lang="scss" scoped>
.detail_container {
  width: 50% !important;
  margin: 2rem auto 0 25%;
  padding: 25px 15px 25px 15px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.15);
  .title {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 1.5rem;
    }
    i {
      font-size: 16px;
      cursor: pointer;
      &:hover {
        color: var(--color-primary);
      }
    }
  }
}
</style>
