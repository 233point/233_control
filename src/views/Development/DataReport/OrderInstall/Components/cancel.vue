<!--
 * @Description: In User Settings Edit
 * @Author: Calamus
 * @Date: 2019-08-12 15:03:20
 * @LastEditTime: 2019-08-21 15:14:56
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-dialog
    width="500px"
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :lock-scroll="true"
    @close="cancel"
  >
    <template slot="title">
      <div class="dialog_title">
        <i class="info_icon el-icon-info"></i>
        <span>您正在进行撤回订单操作！</span>
      </div>
    </template>
    <el-form
      ref="ensureInfo"
      :model="ensureInfo"
      :rules="formRules"
      label-width="80px"
    >
      <el-row class="error_info">
        请提前与配送人员沟通确认！
        <br />
        撤单成功，配装人员将无法继续提供服务！
      </el-row>
      <el-row>
        <el-form-item label="撤回说明" prop="remark">
          <el-input
            v-model="ensureInfo.remark"
            type="textarea"
            maxlength="200"
            placeholder="请输入撤回说明"
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
import { orderCancel } from "@/api/order";

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
        remark: [
          // { required: true, message: '请输入撤回说明', trigger: 'blur' },
          // { min:3,max:200, message: '至少3个字', trigger: 'blur' },
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
            remark: this.ensureInfo.remark
          };
          // this.$message({
          //   message:'功能暂未开发',
          //   type:'info'
          // })
          orderCancel(params).then(res => {
            if (!res.error) {
              this.$message({
                message: "撤单成功",
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

<style scoped>
.info_icon {
  color: orange;
  font-size: 20px;
  padding-right: 5px;
}
.error_info {
  color: red;
  margin-bottom: 1rem;
}
.dialog_title {
  font-size: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
}
</style>
