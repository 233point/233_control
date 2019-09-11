<template>
  <el-dialog
    width="400px"
    title="审核意见"
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :lock-scroll="true"
    @close="cancel"
  >
    <el-form
      ref="ensureInfo"
      :model="ensureInfo"
      :rules="formRules"
      label-width="80px"
    >
      <el-row>
        <el-form-item label="审核结果" prop="result">
          <el-radio-group v-model="ensureInfo.result">
            <el-radio label="yes">通过</el-radio>
            <el-radio label="no">不通过</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="审核意见" prop="remark">
          <el-input
            v-model="ensureInfo.remark"
            type="textarea"
            maxlength="200"
            placeholder="请输入您的审核意见,最长200字符"
          ></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="24" class="flex-right">
          <el-button type="primary" @click="save()">提交</el-button>
          <el-button @click="cancel()">取消</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import { merchantApprove } from "@/api/user";

export default {
  name: "EnsureCheck",
  data() {
    return {
      isVisible: false,
      ensureInfo: {
        result: "yes",
        remark: ""
      },
      formRules: {
        result: [{ required: true, message: "请选择审核结果", trigger: "blur" }]
      }
    };
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    checkInfo: {
      type: Object
    }
  },
  methods: {
    save() {
      this.$refs.ensureInfo.validate(isValid => {
        if (isValid) {
          let params = {
            id: this.checkInfo.id,
            remark: this.ensureInfo.remark,
            result: this.ensureInfo.result
          };
          merchantApprove(params).then(res => {
            if (!res.error) {
              this.$message({
                message: "审核完成",
                type: "success"
              });
              this.cancel();
              this.$emit("updateTable");
            }
          });
        }
      });
    },
    cancel() {
      this.isVisible = false;
      this.$refs.ensureInfo.resetFields();
      this.$emit("update:show", false);
    }
  },
  watch: {
    show(isShow) {
      this.isVisible = isShow;
    }
  }
};
</script>

<style scoped></style>
