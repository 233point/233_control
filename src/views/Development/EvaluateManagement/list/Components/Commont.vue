<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-15 13:51:00
 * @LastEditTime: 2019-08-23 15:30:18
 * @LastEditors: Please set LastEditors
 -->
<template>
  <common-content class="form_box" style="padding:2rem" :flex="100">
    <el-form
      ref="DealForm"
      :model="DealForm"
      :rules="evaluateRule"
      label-width="80px"
    >
      <el-row>
        <el-form-item label="司机" prop="driverId">
          <span>{{ orderInfo.driverName }}</span>
          <span>{{ orderInfo.driverPhone }}</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="安装工" prop="installUserList">
          <span>{{ orderInfo.installUserList }}</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="确认单" prop="">
          <div
            class="picture_container"
            v-for="(item, index) in EvaluateForm.deliveryNotePicList"
            :key="index"
          >
            <img :src="item" class="picture_item" @click="imgScan(item)" />
          </div>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="回单照片" prop="">
          <div
            v-for="(item, index) in EvaluateForm.afterInstallPicList"
            :key="index"
          >
            <img :src="item" class="picture_item" @click="imgScan(item)" />
          </div>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="回单备注" prop="">
          <span>{{ EvaluateForm.receiptRemark }}</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="家装需求" prop="">
          <span>{{ EvaluateForm.homeDecorationDemand }}</span>
        </el-form-item>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-form-item label="服务评分" prop="">
          <el-rate v-model="EvaluateForm.bb" :colors="colors" disabled>
          </el-rate>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="评分备注" prop="">
          <span>{{ EvaluateForm.aa }}</span>
        </el-form-item>
      </el-row>
      <el-divider></el-divider>
      <el-row v-if="EvaluateForm.customerEvaluationStatus != '0'">
        <document-detail
          :isEdit="false"
          :show.sync="showDetailEva"
          :waybillTypeList="waybillTypeList"
          :linkTypeList="DeallinkTypeList"
          :queryInfo.sync="orderInfo"
        />
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <el-form-item label="处理结果" prop="evaluateResult">
          <el-radio-group v-model="DealForm.evaluateResult">
            <el-radio label="0">满意</el-radio>
            <el-radio label="1">不满意</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="处理备注" prop="evaluateRemark">
          <el-input
            v-model="DealForm.evaluateRemark"
            type="textarea"
            maxlength="200"
            placeholder="请输入处理备注,最长200字符"
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
    <el-dialog :visible.sync="showImgDialog" width="700px" append-to-body>
      <img :src="imgUrl" class="dialogImg" />
    </el-dialog>
  </common-content>
</template>

<script>
import moment from "moment";
import DocumentDetail from "./documentDetail";
import CommonContent from "@/components/commonContent";
import { evaluateFollowUp } from "@/api/evaluate";
import {
  Evaluate_Status_List,
  Evaluate_List_Label,
  Waybill_Type_List,
  linkTypeList
} from "@/utils/ENUM";

export default {
  name: "Create",
  components: { DocumentDetail, CommonContent },
  data() {
    return {
      isSaving: false,
      colors: {
        6: "#99A9BF",
        7: { value: "#F7BA2A", excluded: true },
        10: "#FF9900"
      },
      EvaluateForm: {},
      DealForm: {
        evaluateResult: "0",
        evaluateRemark: ""
      },
      evaluateRule: {
        evaluateResult: [
          { required: true, message: "请选择处理结果", trigger: "change" }
        ],
        evaluateRemark: [
          { required: true, message: "请填写处理备注", trigger: "change" }
        ]
      },
      isCreate: false,
      waybillTypeList: Waybill_Type_List,
      linkTypeList: linkTypeList,
      showDetailEva: false,
      showImgDialog: false,
      imgUrl: ""
    };
  },
  props: {
    orderInfo: {
      type: Object
    }
  },
  computed: {
    DeallinkTypeList() {
      let waybillType = this.orderInfo.orderType == '0' ? '2' : '1';
      return this.linkTypeList.filter(item => {
        return item.type != waybillType;
      });
    }
  },
  mounted() {
    console.log("111");
    this.EvaluateForm = JSON.parse(JSON.stringify(this.orderInfo));
    this.DealForm.evaluateResult = "0";
    // this.EvaluateForm.evaluateResult = this.EvaluateForm.evaluateResult ? this.EvaluateForm.evaluateResult : '';
    // this.EvaluateForm.evaluateResult = '0'
  },
  methods: {
    imgScan(img) {
      if (img) {
        this.imgUrl = img;
        this.showImgDialog = true;
      }
    },
    save() {
      this.$refs.DealForm.validate(isValid => {
        if (isValid) {
          let params = {
            waybillNo: this.EvaluateForm.waybillNo,
            followDealResult: this.DealForm.evaluateResult,
            followDealRemark: this.DealForm.evaluateRemark
          };
          evaluateFollowUp(params).then(res => {
            if (!res.error) {
              this.$message({
                type: "success",
                message: "处理成功"
              });
              this.cancel();
              this.$emit("updateTable");
            }
          });
        }
      });
    },
    cancel() {
      this.$refs.DealForm.resetFields();
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
.picture_container {
  width: 200px;
  height: 200px;
  overflow: hidden;
  margin-bottom: 1rem;
}
.picture_item {
  width: 200px;
}
.dialogImg {
  width: 650px;
}
</style>
