<template>
  <el-dialog
    width="600px"
    title="编辑用户"
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancel"
  >
    <el-form
      :inline="true"
      ref="userForm"
      :model="userForm"
      :rules="formRules"
      label-width="80px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="账号" prop="userAccount">
            <el-input v-model="userForm.userAccount" maxlength="50" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="姓名" prop="userRealName">
            <el-input v-model="userForm.userRealName" maxlength="50" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="机构" prop="userOrgUuid">
            <!--<el-select v-model="userForm.userOrgUuid" style="width:178px">-->
            <!--<el-option-->
            <!--v-for="(org,index) in org"-->
            <!--:key="index"-->
            <!--:label="org.orgName"-->
            <!--:value="org.orgUuid"-->
            <!--/>-->
            <!--</el-select>-->
            <el-cascader
              style="width:178px"
              :options="options"
              change-on-select
              v-model="userForm.userOrgUuidList"
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="userGender">
            <el-radio-group v-model="userForm.userGender">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="座机" prop="userTelephone">
            <el-input
              v-model="userForm.userTelephone"
              placeholder="座机:区号-号码"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="userEnable">
            <el-radio-group v-model="userForm.userEnable">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="手机" prop="userMobile">
            <el-input v-model="userForm.userMobile" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="18">
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>
<script>
/**
 * User Edit Component
 * ----------------------
 * Author: zhou qi
 * Date: 2018.03.20
 */
// validate
import Validator from "@/utils/extendValidate/extendValidate";
// api
import { updateUser } from "@/api/user";

export default {
  name: "UserEdit",
  data() {
    return {
      isVisible: false,
      orgnization: [],
      userForm: {
        userAccount: "",
        userRealName: "",
        userGender: "1",
        userOrgUuid: "",
        userOrgUuidList: [],
        userEnable: "1",
        userTelephone: "",
        userMobile: "",
        userUuid: ""
      },
      formRules: {
        userAccount: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { validator: Validator.account, trigger: "blur" }
        ],
        userRealName: [
          { required: true, message: "请输入姓名", trigger: "blur" }
        ],
        userOrgId: [{ required: true, message: "请选择机构", trigger: "blur" }],
        userMobile: [{ validator: Validator.cellPhone, trigger: "blur" }],
        userTelephone: [{ validator: Validator.isTelephone, trigger: "blur" }]
      },
      options: []
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    org: {
      type: Array,
      required: true
    },
    orgList: {
      type: Array,
      required: true
    },
    modifyUser: {
      type: Object
    }
  },
  watch: {
    show(isShow) {
      this.isVisible = isShow;
    },
    org(org) {
      this.options = org;
    },
    modifyUser(user) {
      // 显示对话框后,如果为编辑状态(有用户数据传入),则合并表单数据
      // console.log('user', user)
      if (user) {
        const formData = Object.create(null);
        for (let [key, value] of Object.entries(user)) {
          if (this.userForm[key] !== undefined) formData[key] = value;
        }
        this.userForm.userUuid = user.userUuid;
        this.userForm = Object.assign({}, this.userForm, formData);
        this.userForm.userOrgUuidList = [];
        this.findPid(this.userForm.userOrgUuid);
        console.log(this.userForm.userOrgUuidList);
      }
    }
  },
  methods: {
    save() {
      this.$refs.userForm.validate(isValid => {
        if (isValid) {
          const params = Object.assign({}, this.userForm);
          params.userOrgUuid =
            params.userOrgUuidList[params.userOrgUuidList.length - 1];
          updateUser(params).then(res => {
            if (!res.error) {
              this.$message({
                message: "修改用户成功!",
                type: "success"
              });
              this.cancel();
              this.$emit("updateList");
            }
          });
        }
      });
    },
    cancel() {
      this.$refs.userForm.resetFields();
      this.$emit("update:show", false);
      this.$emit("update:modifyUser", null);
      this.isVisible = false;
    },
    // 寻找用户所属机构的上级机构，组成数组供级联选择框使用
    findPid(orgUuid) {
      let lastLevel = this.orgList.find(item => {
        return item.id == orgUuid;
      });
      if (lastLevel) {
        this.userForm.userOrgUuidList.unshift(lastLevel.id);
      }
      if (lastLevel.pId != "" && !lastLevel.root) {
        this.findPid(lastLevel.pId);
      }
    }
  }
};
</script>
