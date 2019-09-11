<template>
  <el-dialog
    width="600px"
    :title="(isCreate ? '新增' : '编辑') + '系统'"
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancel"
  >
    <el-form
      ref="sysForm"
      :model="sysForm"
      :rules="formRules"
      label-width="80px"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="系统名称" prop="sys_name">
            <el-input
              v-model="sysForm.sys_name"
              placeholder="最长50字符"
              maxlength="50"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="系统标识" prop="sys_identification">
            <el-input
              v-model="sysForm.sys_identification"
              placeholder="最长20字符"
              maxlength="20"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="状态" prop="sys_enable">
            <el-radio-group v-model="sysForm.sys_enable">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="系统描述" prop="sys_remark">
            <el-input
              type="textarea"
              :rows="2"
              v-model="sysForm.sys_remark"
              maxlength="200"
              placeholder="请输入系统描述，最长50字符"
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
import Validator from "@/utils/extendValidate/extendValidate";
import store from "@/store";

// api
import { busesCreate, busesUpdate } from "@/api/user";

//
const initsyssForm = {
  sys_name: "",
  sys_enable: 1,
  sys_remark: "",
  sys_identification: ""
};

export default {
  name: "sysUpdate",
  data() {
    return {
      isVisible: false,
      sysForm: Object.assign({}, initsyssForm),
      formRules: {
        sys_name: [
          { required: true, message: "请输入系统名称", trigger: "change" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "change"
          }
        ],
        sys_remark: [
          {
            min: 1,
            max: 200,
            message: "长度在 1 到 200 个字符",
            trigger: "change"
          }
        ],
        sys_enable: [
          { required: true, message: "请选择系统状态", trigger: "change" }
        ],
        sys_identification: [
          { required: true, message: "请输入系统标识", trigger: "change" },
          {
            validator: Validator.isString,
            message: "请输入1到20位英文字母",
            trigger: "change"
          }
        ]
      }
    };
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
          this.sysForm = Object.assign({}, initsyssForm);
        } else {
          this.sysForm = Object.assign({}, this.sysData);
        }
      }
      //
      this.isVisible = isShow;
    }
  },
  methods: {
    save() {
      this.$refs.sysForm.validate(isValid => {
        if (isValid) {
          const params = Object.assign({}, this.sysForm);
          const submitType = this.isCreate ? busesCreate : busesUpdate;
          const submitText = this.isCreate ? "新增" : "编辑";
          submitType(params).then(res => {
            this.$message({
              message: `${submitText}系统成功!`,
              type: "success"
            });
            this.cancel();
            this.$emit("updateList");
            store.dispatch("getSysList");
          });
        }
      });
    },
    cancel() {
      this.sysForm = Object.assign({}, initsyssForm);
      this.$refs.sysForm.resetFields();
      this.$emit("update:show", false);
      this.$emit("update:sysData", Object.create(null));
      this.isVisible = false;
    }
  }
};
</script>
