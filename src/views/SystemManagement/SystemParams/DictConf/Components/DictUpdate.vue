<template>
  <el-dialog
    width="600px"
    :title="(isCreate ? '新增' : '编辑') + '字典'"
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancel"
  >
    <el-form
      ref="dictForm"
      :model="dictForm"
      :rules="formRules"
      label-width="80px"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="数据字典类型编码"
            label-width="160px"
            prop="code"
          >
            <el-input v-bind:disabled="disabledCode" v-model="dictForm.code" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="数据字典类型名称"
            label-width="160px"
            prop="name"
          >
            <el-input v-model="dictForm.name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="isvalid">
            <el-radio-group v-model="dictForm.isvalid">
              <el-radio label="1">启用</el-radio>
              <el-radio label="0">禁用</el-radio>
            </el-radio-group>
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
import { dictCreate, dictUpdate } from "@/api/systemparams";

//
const initDictsForm = {
  code: "",
  name: "",
  isvalid: "1"
};

export default {
  name: "DictUpdate",
  components: { Validator },
  data() {
    return {
      disabledCode: "",
      isVisible: false,
      dictForm: Object.assign({}, initDictsForm),
      formRules: {
        code: [
          {
            required: true,
            message: "请输入数据字典类型编码",
            trigger: "blur"
          },
          {
            validator: Validator.dictTypeCode,
            message: "10位以内字母数字或者下划线",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "请输入数据字典类型名称",
            trigger: "blur"
          },
          {
            validator: Validator.dictOther,
            message: "20位以内任意字符",
            trigger: "blur"
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
    dictData: {
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
          this.disabledCode = false;
          this.dictForm = Object.assign({}, initDictsForm);
        } else {
          this.disabledCode = true;
          this.dictForm = Object.assign({}, this.dictData);
        }
      }
      //
      this.isVisible = isShow;
    }
  },
  methods: {
    save() {
      this.$refs.dictForm.validate(isValid => {
        if (isValid) {
          const params = Object.assign({}, this.dictForm);
          const submitType = this.isCreate ? dictCreate : dictUpdate;
          const submitText = this.isCreate ? "新增" : "编辑";
          submitType(params).then(res => {
            if (res.error === true) {
            } else {
              this.$message({
                message: `${submitText}字典成功!`,
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
      this.dictForm = Object.assign({}, initDictsForm);
      this.$refs.dictForm.resetFields();
      this.$emit("update:show", false);
      this.$emit("update:dictData", Object.create(null));
      this.isVisible = false;
    }
  }
};
</script>
