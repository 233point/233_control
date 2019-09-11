<template>
  <el-dialog
    width="600px"
    :modal-append-to-body="false"
    :title="(isCreate ? '新增' : '编辑') + '字典项'"
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancel"
  >
    <el-form
      ref="dataDictForm"
      :model="dataDictForm"
      :rules="formRules"
      label-width="80px"
    >
      <el-row>
        <el-col :span="24">
          <el-form-item label="数据字典类型" label-width="160px" prop="code">
            <el-input
              v-bind:disabled="disabledcCode"
              :placeholder="row.name"
              v-model="dataDictForm.code"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="数据字典编码" label-width="160px" prop="value">
            <el-input v-model="dataDictForm.value" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="数据字典名称" label-width="160px" prop="display">
            <el-input v-model="dataDictForm.display" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="数据字典显示顺序"
            label-width="160px"
            prop="sort"
          >
            <el-input v-model="dataDictForm.sort" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="isvalid">
            <el-radio-group v-model="dataDictForm.isvalid">
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
import { datadictCreate, datadictUpdate } from "@/api/systemparams";

//
const initDictsForm = {
  value: "",
  display: "",
  code: "",
  sort: "",
  isvalid: "1"
};

export default {
  sort: "DataDictUpdate",
  components: { Validator },
  data() {
    return {
      disabledcCode: true,
      isVisible: false,
      dataDictForm: Object.assign({}, initDictsForm),
      formRules: {
        value: [
          { required: true, message: "请输入数据字典编码", trigger: "blur" },
          {
            validator: Validator.dictOther,
            message: "30位以内任意字符",
            trigger: "blur"
          }
        ],
        display: [
          { required: true, message: "请输入数据字典名称", trigger: "blur" },
          {
            validator: Validator.dictOther,
            message: "30位以内任意字符",
            trigger: "blur"
          }
        ],
        sort: [
          {
            required: true,
            message: "请输入数据字典显示顺序",
            trigger: "blur"
          },
          {
            validator: Validator.dictNum,
            message: "只能输入3位以内数字",
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
    dataDict: {
      type: Object
    },
    isCreate: {
      type: Boolean,
      required: true
    },
    row: Object
  },
  watch: {
    show(isShow) {
      if (isShow) {
        if (this.isCreate) {
          this.dataDictForm = Object.assign({}, initDictsForm);
          this.dataDictForm.code = this.row.code;
        } else {
          this.dataDictForm = Object.assign({}, this.dataDict);
        }
      }
      //
      this.isVisible = isShow;
    }
  },
  methods: {
    save() {
      this.$refs.dataDictForm.validate(isValid => {
        if (isValid) {
          const params = Object.assign({}, this.dataDictForm);
          const submitType = this.isCreate ? datadictCreate : datadictUpdate;
          const submitText = this.isCreate ? "新增" : "编辑";
          submitType(params).then(res => {
            if (res.error === true) {
            } else {
              this.$message({
                message: `${submitText}字典项成功!`,
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
      this.dataDictForm = Object.assign({}, initDictsForm);
      this.$refs.dataDictForm.resetFields();
      this.$emit("update:show", false);
      this.$emit("update:dataDict", Object.create(null));
      this.isVisible = false;
    }
  }
};
</script>
