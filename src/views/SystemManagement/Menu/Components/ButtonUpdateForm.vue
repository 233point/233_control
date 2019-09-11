<template>
  <el-form
    inline
    ref="sysButtonForm"
    :model="sysButtonForm"
    :rules="sysButtonFormRules"
    :disabled="isFormDisabled"
    label-width="70px"
  >
    <el-row>
      <el-col :span="12">
        <el-form-item label="名称" prop="resourceTitle">
          <el-input
            v-model="sysButtonForm.resourceTitle"
            placeholder="按钮的名称"
          />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="图示" prop="resourceImage">
          <el-input
            v-model="sysButtonForm.resourceImage"
            placeholder="按钮的前缀图标"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="按钮大小" prop="resourceSize">
          <el-select v-model="sysButtonForm.resourceSize">
            <el-option label="大" value="medium" />
            <el-option label="中" value="small" />
            <el-option label="小" value="mini" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="顺序" prop="resourceNumber">
          <el-input v-model="sysButtonForm.resourceNumber" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="状态" prop="resourceEnable">
          <el-radio-group v-model="sysButtonForm.resourceEnable">
            <el-radio label="1">启用</el-radio>
            <el-radio label="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="禁用方法" prop="isDisabled">
          <el-input
            v-model="sysButtonForm.isDisabled"
            placeholder="按钮禁用的方法名称"
          />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-form-item label="事件" prop="resourceUrl">
          <el-input
            v-model="sysButtonForm.resourceUrl"
            placeholder="按钮对应事件方法名"
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
            v-model="sysButtonForm.resourceDesc"
            :rows="5"
            maxlength="200"
            placeholder="填写菜单描述,最长200字符"
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
  resourceLever: 3,
  // 上级菜单编号
  resourceParentUuid: "",
  // title资源标题
  resourceTitle: "",
  // icon
  resourceImage: "",
  // 顺序
  resourceNumber: "1",
  // 状态
  resourceEnable: "1",
  // 事件
  resourceUrl: "",
  // 描述
  resourceDesc: "",
  // 按钮大小
  resourceSize: "mini",
  // 按钮是否禁用（传入FuncName）
  isDisabled: "",
  // 系统类型
  sysType: "ctms"
};

export default {
  name: "ButtonUpdateForm",
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
      sysButtonForm: Object.assign({}, initFormState),
      sysButtonFormRules: {
        resourceTitle: [
          { required: true, message: "请填写按钮名称", trigger: "blur" },
          { max: 30, message: "最大长度为30字符", trigger: "blur" }
        ],
        resourceNumber: [
          {
            validator: Validator.dictNum,
            message: "最大长度为3字符",
            trigger: "blur"
          }
        ],
        resourceUrl: [
          {
            required: true,
            message: "请填写按钮的点击事件名称",
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
        this.sysButtonForm = Object.assign({}, initFormState);
      }
    },
    data(d) {
      this.sysButtonForm = d || Object.assign({}, initFormState);
    }
  },
  methods: {
    save() {
      this.$refs.sysButtonForm.validate(isValid => {
        if (isValid) {
          // 必须获取到当前节点的数据, 因为这里需要节点ID
          if (this.nodeData) {
            this.sysButtonForm.resourceParentUuid = this.isCreate
              ? this.nodeData.id
              : this.nodeData.pId;
            const submitType = this.isCreate
              ? systemMenuCreate
              : systemMenuEdit;
            const submitText = this.isCreate ? "新增" : "修改";
            submitType(this.sysButtonForm).then(res => {
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
      //   this.$emit('save', this.sysButtonForm)
    },
    cancel() {
      this.sysButtonForm = Object.assign({}, initFormState);
      this.$refs.sysButtonForm.resetFields();
      this.$emit("cancel");
    }
  }
};
</script>
