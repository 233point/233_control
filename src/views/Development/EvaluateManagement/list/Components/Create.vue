<template>
  <div class="form_box">
    <el-form
      ref="EvaluateForm"
      :model="EvaluateForm"
      :rules="evaluateRule"
      label-width="80px"
    >
      <el-row>
        <el-form-item label="司机" prop="driverId">
          <span>{{ orderInfo.waybillInfo.driverName }}</span>
          <span>{{ orderInfo.waybillInfo.driverPhone }}</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="安装工" prop="installUserList">
          <span>{{
            orderInfo.waybillInfo.installUserList
              .map(item => item.realName)
              .join("、")
          }}</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="验收单" prop=""> </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="完工照片" prop=""> </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="完工备注" prop=""> </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="家装需求" prop="">
          <span>{{ EvaluateForm.aa }}</span>
        </el-form-item>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-form-item label="服务评分" prop="">
          <el-rate v-model="EvaluateForm.bb" :colors="colors"> </el-rate>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="评分备注" prop="">
          <el-input
            v-model="EvaluateForm.remark"
            type="textarea"
            maxlength="200"
            placeholder="请输入评分备注,最长200字符"
          ></el-input>
        </el-form-item>
      </el-row>
      <el-row style="text-align:center">
        <el-button type="primary" size="mini" :loading="isSaving" @click="save"
          >确定</el-button
        >
        <el-button size="mini" @click="cancel">取消</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Create",
  data() {
    return {
      isSaving: false,
      colors: {
        6: "#99A9BF",
        7: { value: "#F7BA2A", excluded: true },
        10: "#FF9900"
      },
      EvaluateForm: {
        type: "0",
        busId: "", // 车辆Model
        driverId: "", // 司机model、
        installUserList: [], // 安装工信息列表、
        departTime: "", // 调度发车时间、
        dispatchRemark: "" //  调度备注、
      },
      evaluateRule: {
        busId: [{ required: true, message: "请选择车辆", trigger: "change" }],
        departTime: [
          { required: true, message: "请选择发车时间", trigger: "change" }
        ],
        driverId: [
          { required: true, message: "请选择司机", trigger: "change" }
        ],
        installUserList: [
          { required: true, message: "请选择安装人员", trigger: "change" }
        ]
      },
      isCreate: false
    };
  },
  props: {
    orderInfo: {
      type: Object
    }
  },
  mounted() {},
  methods: {
    save() {
      let that = this;
      this.$refs.EvaluateForm.validate(isValid => {
        if (isValid) {
          //   batchwaybilldistribute(params).then(res => {
          //     if(!res.error){
          this.$message({
            type: "success",
            message: "评价成功"
          });
          this.cancel();
          this.$emit("updateTable");
          // }
          // })
        }
      });
    },
    cancel() {
      this.$refs.EvaluateForm.resetFields();
      this.$emit("cancelCreateEva");
    }
  }
};
</script>
<style lang="scss">
.form_box {
  .el-checkbox__input {
    vertical-align: top;
  }
}
.distribute_search {
  .el-input-group__prepend {
    width: 120px;
  }
}
.multiple_search_box {
  .el-form-item__content {
    font-size: 0;
  }
  .multiple_select1 {
    width: 120px;
    .el-input__inner {
      background-color: #f5f7fa;
      color: #909399;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: none;
    }
  }
  .multiple_select2 {
    .el-input__inner {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
</style>
<style lang="scss" scoped>
.el-rate {
  line-height: 40px !important;
}
.appoint_list {
  max-height: 300px;
  overflow-y: scroll;
  .customer_info {
    white-space: normal;
    width: 400px;
  }
  .appoint_item {
    margin-top: 10px;
  }
}
.form_box {
  padding: 0 20px 20px 20px;
  min-width: 500px;
}
.check_content {
  display: inline-block;
  vertical-align: -webkit-baseline-middle;
  .transStatus {
    margin: 0 20px;
  }
  .jiedan {
    color: #0066ff;
  }
  .fenpai {
    color: #fe5500;
  }
  .customer_name {
    display: inline-block;
    min-width: 140px;
  }
}
</style>
