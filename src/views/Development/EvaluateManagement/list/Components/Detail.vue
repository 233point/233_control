<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 17:52:53
 * @LastEditTime: 2019-09-04 10:09:36
 * @LastEditors: Please set LastEditors
 -->
<template>
  <common-content class="form_box" :flex="100" style="padding:2rem">
    <el-form ref="EvaluateForm" :model="EvaluateForm" label-width="80px">
      <el-row>
        <el-form-item label="司机" prop="driverId">
          <span>{{ EvaluateForm.driverName }}</span>
          <span style="padding-left:10px">{{ EvaluateForm.driverPhone }}</span>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="安装工" prop="installUserList">
          <span>{{ EvaluateForm.installUserList }}</span>
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
      <el-row v-if="EvaluateForm.customerEvaluationStatus != '0'">
        <document-detail
          :isEdit="false"
          :show.sync="showDetailEva"
          :waybillTypeList="waybillTypeList"
          :linkTypeList="DeallinkTypeList"
          :queryInfo.sync="orderInfo"
        />
      </el-row>
      <el-divider
        v-if="EvaluateForm.customerEvaluationStatus == '1'"
      ></el-divider>
      <el-row v-if="EvaluateForm.followDealStatus == '1'">
        <!-- 已处理 -->
        <el-form-item label="处理结果" prop="">
          <span>{{
            EvaluateForm.followDealResult == "0"
              ? "满意"
              : EvaluateForm.followDealResult == "1"
              ? "不满意"
              : "未知"
          }}</span>
        </el-form-item>
      </el-row>
      <el-row v-if="EvaluateForm.customerEvaluationStatus == '1'">
        <el-form-item label="处理备注" prop="">
          <span>{{ EvaluateForm.followDealRemark }}</span>
        </el-form-item>
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

import {
  Evaluate_Status_List,
  Evaluate_List_Label,
  Waybill_Type_List,
  linkTypeList
} from "@/utils/ENUM";

export default {
  name: "Detail",
  components: {
    DocumentDetail,
    CommonContent
  },
  computed: {
    DeallinkTypeList() {
      let waybillType = this.orderInfo.orderType == '0' ? '2' : '1'
      console.log("orderInfo", waybillType);
      return this.linkTypeList.filter(item => {
        return item.type != waybillType;
      });
    }
  },
  data() {
    return {
      isSaving: false,
      colors: {
        6: "#99A9BF",
        7: { value: "#F7BA2A", excluded: true },
        10: "#FF9900"
      },
      EvaluateForm: {},
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
  mounted() {
    this.EvaluateForm = JSON.parse(JSON.stringify(this.orderInfo));
    console.log("orderInfo", this.EvaluateForm);
  },
  methods: {
    imgScan(img) {
      if (img) {
        this.imgUrl = img;
        this.showImgDialog = true;
      }
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
