<template>
  <el-dialog
    width="600px"
    :title="(isCreate ? '新增' : '编辑') + '参数'"
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancel"
  >
    <el-form
      ref="paramsForm"
      :model="paramsForm"
      :rules="formRules"
      label-width="80px"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="参数名称" prop="spName">
            <el-input v-model="paramsForm.spName" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="参数编码" prop="spCode">
            <el-input
              v-bind:disabled="disableSpCode"
              v-model="paramsForm.spCode"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="参数值" prop="spValue">
            <el-input v-model="paramsForm.spValue" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注" prop="spRemark">
            <el-input v-model="paramsForm.spRemark" />
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
// validate
import Validator from "@/utils/extendValidate/extendValidate";
// api
import { paramsCreate, paramsUpdate } from "@/api/systemparams";

//
const initParamsForm = {
  spName: "",
  spCode: "",
  spValue: "",
  spRemark: ""
};

export default {
  name: "ParmasUpdate",
  data() {
    return {
      disableSpCode: "",
      isVisible: false,
      paramsForm: Object.assign({}, initParamsForm),
      formRules: {
        spName: [
          { required: true, message: "请输入参数名称", trigger: "blur" },
          {
            validator: Validator.paramsOther,
            message: "50位以内任意字符",
            trigger: "blur"
          }
        ],
        spCode: [
          { required: true, message: "请输入参数编码", trigger: "blur" },
          {
            validator: Validator.paramsOther,
            message: "50位以内任意字符",
            trigger: "blur"
          }
        ],
        spValue: [{ required: true, message: "请输入参数值", trigger: "blur" }]
      }
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    paramsData: {
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
          this.disableSpCode = false;
          this.paramsForm = Object.assign({}, initParamsForm);
        } else {
          this.disableSpCode = true;
          this.paramsForm = Object.assign({}, this.paramsData);
        }
      }
      //
      this.isVisible = isShow;
    }
  },
  methods: {
    save() {
      this.$refs.paramsForm.validate(isValid => {
        if (isValid) {
          const params = Object.assign({}, this.paramsForm);
          const submitType = this.isCreate ? paramsCreate : paramsUpdate;
          const submitText = this.isCreate ? "新增" : "编辑";
          submitType(params).then(res => {
            if (res.error === true) {
            } else {
              this.$message({
                message: `${submitText}参数成功!`,
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
      this.paramsForm = Object.assign({}, initParamsForm);
      this.$refs.paramsForm.resetFields();
      this.$emit("update:show", false);
      this.$emit("update:paramsData", Object.create(null));
      this.isVisible = false;
    }
  }
};
</script>
