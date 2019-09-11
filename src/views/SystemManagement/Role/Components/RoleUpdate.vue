<template>
  <el-dialog
    width="600px"
    :title="(isCreate ? '新增' : '编辑') + '角色'"
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancel"
  >
    <el-form
      ref="roleForm"
      :model="roleForm"
      :rules="formRules"
      label-width="80px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="roleForm.roleName" maxlength="50" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="类型" prop="roleType">
            <el-select v-model="roleForm.roleType" placeholder="请选择角色类型">
              <el-option
                v-for="(item, index) in roleTypeList"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="roleEnable">
            <el-radio-group v-model="roleForm.roleEnable">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="角色描述" prop="roleRemark">
            <el-input
              type="textarea"
              :rows="2"
              v-model="roleForm.roleRemark"
              maxlength="200"
              placeholder="请输入角色描述，最长200字符"
            />
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
 * Roles Add/Edit Component
 * ----------------------
 * Author: zhou qi
 * Date: 2018.03.20
 */
// api
import { createRole, updateRole } from "@/api/role";

//
const initRolesForm = {
  roleName: "",
  roleEnable: 1,
  roleRemark: "",
  roleType: ""
};

export default {
  name: "RoleUpdate",
  data() {
    return {
      isVisible: false,
      roleForm: Object.assign({}, initRolesForm),
      formRules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "change" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "change"
          }
        ],
        roleRemark: [
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "change"
          }
        ],
        roleType: [
          { required: true, message: "请选择角色类型", trigger: "change" }
        ],
        roleEnable: [
          { required: true, message: "请选择角色状态", trigger: "change" }
        ]
      },
      roleTypeList: [
        {
          value: "0",
          label: "系统管理员"
        },
        {
          value: "1",
          label: "商户"
        },
        {
          value: "2",
          label: "仓库管理员"
        },
        {
          value: "3",
          label: "财务管理"
        },
        {
          value: "4",
          label: "招商管理"
        },
        {
          value: "5",
          label: "调度管理员"
        },
        {
          value: "6",
          label: "配送管理员"
        },
        {
          value: "7",
          label: "司机"
        },
        {
          value: "11",
          label: "安装人员"
        },
        {
          value: "8",
          label: "招商经理"
        },
        {
          value: "9",
          label: "财务"
        },
        {
          value: "10",
          label: "项目总监"
        },
        {
          value: "12",
          label: "商户"
        },
        {
          value: "13",
          label: "维修工"
        }
      ]
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    roleData: {
      type: Object
    },
    isCreate: {
      type: Boolean,
      required: true
    },
    searchParams: {
      type: Object
    }
  },
  watch: {
    show(isShow) {
      if (isShow) {
        if (this.isCreate) {
          this.roleForm = Object.assign({}, initRolesForm);
        } else {
          this.roleForm = Object.assign({}, this.roleData);
        }
      }
      //
      this.isVisible = isShow;
    }
  },
  methods: {
    save() {
      this.$refs.roleForm.validate(isValid => {
        if (isValid) {
          const params = Object.assign({}, this.roleForm);
          const submitType = this.isCreate ? createRole : updateRole;
          const submitText = this.isCreate ? "新增" : "编辑";
          submitType(params).then(res => {
            this.$message({
              message: `${submitText}角色成功!`,
              type: "success"
            });
            this.cancel();
            this.$emit("updateList", this.searchParams);
          });
        }
      });
    },
    cancel() {
      this.roleForm = Object.assign({}, initRolesForm);
      this.$refs.roleForm.resetFields();
      this.$emit("update:show", false);
      this.$emit("update:roleData", Object.create(null));
      this.isVisible = false;
    }
  }
};
</script>
