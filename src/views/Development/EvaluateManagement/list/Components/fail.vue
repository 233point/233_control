<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-19 11:34:24
 * @LastEditTime: 2019-08-19 11:44:36
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-dialog
    width="650px"
    title="调研失败"
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :lock-scroll="true"
    :append-to-body="true"
    @close="cancel"
    center
  >
    <el-form
      ref="checkInfo"
      :model="checkInfo"
      :rules="formRules"
      label-width="80px"
    >
      <el-row
        v-if="queryInfo && queryInfo.customerName"
        style="text-align:center"
      >
        <b> {{ queryInfo.customerName }}:{{ queryInfo.customerPhone }} </b>
      </el-row>
      <el-row>
        <el-form-item label="原因" prop="evaluationResult">
          <el-radio-group
            v-model="checkInfo.evaluationResult"
            placeholder="请选择调研失败原因"
          >
            <el-radio
              v-for="(item, index) in reasonFailList"
              :key="index"
              :label="item.value"
              :value="item.label"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
      </el-row>
      <!-- <el-row>
        <el-form-item label="备注" prop="detail">
          <el-input v-model="checkInfo.detail" type="textarea" maxlength="200"
                    placeholder="请输入备注"></el-input>
        </el-form-item>
      </el-row> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save()">提交</el-button>
      <el-button @click="cancel()">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { customerFailReason } from "@/api/evaluate";

export default {
  name: "ContractCheck",
  data() {
    return {
      isVisible: false,
      checkInfo: {
        evaluationResult: "",
        detail: ""
      },
      formRules: {
        evaluationResult: [
          { required: true, message: "请选择调研失败原因", trigger: "blur" }
        ]
      }
    };
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    queryInfo: {
      type: Object
    },
    reasonFailList: {
      type: Array
    }
  },
  methods: {
    save() {
      this.$refs.checkInfo.validate(isValid => {
        if (isValid) {
          let params = {
            id: this.queryInfo.id,
            evaluationResult: this.checkInfo.evaluationResult
            // detail: this.checkInfo.detail
          };
          customerFailReason(params).then(res => {
            if (!res.error) {
              this.$message({
                message: "顾客满意度调查失败，失败原因添加成功",
                type: "warning"
              });
              this.$emit("updateList");
              this.cancel();
            }
          });
        }
      });
    },
    cancel() {
      this.isVisible = false;
      this.$refs.checkInfo.resetFields();
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

<style lang="scss" scoped>
.el-radio {
  margin-right: 30px !important;
  margin-left: 0px !important;
}
.is-checked + .el-radio__label {
  color: rgba(190, 214, 46, 1) !important;
}
.is-checked .el-radio__inner {
  border-color: rgba(190, 214, 46, 1);
}
.el-radio {
  margin-bottom: 10px;
}
</style>
