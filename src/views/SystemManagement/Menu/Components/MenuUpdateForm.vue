<template>
  <el-form
    inline
    ref="sysMenuForm"
    :model="sysMenuForm"
    :rules="sysMenuFormRules"
    :disabled="isFormDisabled"
    label-width="70px"
  >
    <el-row>
      <el-col :span="12">
        <el-form-item label="标题" prop="resourceTitle">
          <el-input
            v-model="sysMenuForm.resourceTitle"
            placeholder="菜单的中文标题"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="名称" prop="resourceName">
          <el-input
            v-model="sysMenuForm.resourceName"
            placeholder="菜单路由的属性名称"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="模块" prop="resourceComponent">
          <el-input
            v-model="sysMenuForm.resourceComponent"
            :disabled="nodeData.addRoot"
            placeholder="菜单的模块名称"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="图示" prop="resourceImage">
          <el-input
            v-model="sysMenuForm.resourceImage"
            placeholder="菜单的前缀图标"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="状态" prop="resourceEnable">
          <el-radio-group v-model="sysMenuForm.resourceEnable">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="顺序" prop="resourceNumber">
          <el-input v-model="sysMenuForm.resourceNumber" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="路径" prop="resourceUrl">
          <el-input
            v-model="sysMenuForm.resourceUrl"
            placeholder="菜单对应的路由访问路径"
            style="width:550px"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="描述" prop="resourceDesc" style="width:100%">
          <el-input
            type="textarea"
            style="width:550px"
            v-model="sysMenuForm.resourceDesc"
            :rows="5"
            maxlength="200"
            placeholder="填写菜单描述，最长200字符"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" class="flex-right">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import Validator from "@/utils/extendValidate/extendValidate";
// api
import { systemMenuCreate, systemMenuEdit } from "@/api/systemparams";

// init Form Data
const initFormState = {
  // 菜单等级
  resourceLever: 2,
  // 上级菜单编号
  resourceParentUuid: "",
  // title资源标题
  resourceTitle: "",
  // 名称
  resourceName: "",
  // 组件名称
  resourceComponent: "",
  // icon
  resourceImage: "",
  // 状态
  resourceEnable: 1,
  // 顺序
  resourceNumber: "1",
  // 资源链接
  resourceUrl: "",
  // 描述
  resourceDesc: "",
  // 按钮大小
  resourceSize: "",
  // 系统类型
  sysType: "ctms"
};

export default {
  name: "MenuUpdateForm",
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    isCreate: {
      type: Boolean,
      default: true
    },
    nodeData: {
      type: Object,
      required: true
    },
    data: {
      type: Object
    }
  },

  data() {
    return {
      isFormDisabled: false,
      sysMenuForm: Object.assign({}, initFormState),
      sysMenuFormRules: {
        resourceTitle: [
          { required: true, message: "请填写菜单名称", trigger: "blur" },
          { max: 30, message: "最大长度为30字符", trigger: "blur" }
        ],
        resourceName: [
          { max: 30, message: "最大长度为30字符", trigger: "blur" }
        ],
        resourceNumber: [
          {
            validator: Validator.dictNum,
            message: "最大长度为3字符",
            trigger: "blur"
          }
        ],
        resourceDesc: [
          { max: 150, message: "最大长度为150字符", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    isVisible(newVal) {
      if (!newVal) {
        this.sysMenuForm = Object.assign({}, initFormState);
      }
    },
    data(d) {
      this.sysMenuForm = d || Object.assign({}, initFormState);
    }
  },
  methods: {
    save() {
      this.$refs.sysMenuForm.validate(isValid => {
        if (isValid) {
          // 必须获取到当前节点的数据, 因为这里需要节点ID
          if (this.nodeData) {
            if (!this.nodeData.addRoot) {
              this.sysMenuForm.resourceParentUuid = this.isCreate
                ? this.nodeData.id
                : this.nodeData.pId;
            } else if (this.nodeData.addRoot) {
              this.sysMenuForm.resourceParentUuid = null;
            }
            const submitType = this.isCreate
              ? systemMenuCreate
              : systemMenuEdit;
            const submitText = this.isCreate ? "新增" : "修改";
            submitType(this.sysMenuForm).then(res => {
              if (!res.error) {
                this.$message({
                  message: `${submitText}成功!`,
                  type: "success"
                });
                this.$emit("save");
              }
            });
          } else {
            this.$alert("未找到父节点的ID.");
          }
        }
      });
    },
    cancel() {
      this.sysMenuForm = Object.assign({}, initFormState);
      this.$refs.sysMenuForm.resetFields();
      this.$emit("cancel");
    }
  }
};
</script>
