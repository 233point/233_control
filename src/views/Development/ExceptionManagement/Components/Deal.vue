<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-20 18:28:27
 * @LastEditTime: 2019-08-21 15:25:59
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="form_box" v-if="exception">
    <el-row>
      <el-col :span="18">
        <img class="ctmsImg" src="@/assets/images/u4126.png" />
        <span class="ctmsNo">CTSM单号：{{ exception.waybillNo }}</span>
      </el-col>
      <el-col :span="6">
        <span class="ctmsStatus">{{
          formatterStatus(exception.waybillInfo.status)
        }}</span>
      </el-col>
    </el-row>
    <el-form
      ref="ExceptionForm"
      class="exception_form"
      :model="ExceptionForm"
      :rules="exceptionRule"
      label-width="120px"
    >
      <el-form-item label="商户：">
        <span>{{ exception.waybillInfo.merchantName }}</span>
      </el-form-item>
      <el-form-item label="期望完成时间:">
        <span>{{ dateFormatter(exception.waybillInfo.expectFinishTime) }}</span>
      </el-form-item>
      <el-form-item label="服务类型:">
        <span>
          {{formatterOrderType(exception.waybillInfo.orderType)}}
        </span>
      </el-form-item>
      <el-form-item label="订单备注:">
        <span>{{ exception.waybillInfo.waybillRemark }}</span>
      </el-form-item>
      <el-form-item label="最新上报时间:">
        <span>{{ timeFormatter(exception.abnormalReportInfoVo[exception.abnormalReportInfoVo.length-1].abnormalReportTime) }}</span>
      </el-form-item>
      <el-form-item label="司机:">
        <span>{{ exception.driverName }}</span
        ><span style="margin-left:50px;">{{ exception.driverPhone }}</span>
      </el-form-item>
      <el-form-item
        v-if="exception.waybillInfo.orderType == '1'"
        label="安装工:"
      >
        <div v-for="item in exception.installUserList" :key="item.id">
          <span>{{ item.realName }}</span
          ><span style="margin-left:50px;">{{ exception.phone }}</span>
        </div>
      </el-form-item>
      <el-row
        v-for="(item, index) in exception.abnormalReportInfoVo"
        :key="index"
      >
        <el-col>
          <el-form-item label="上报时间:">
            <span>{{ timeFormatter(item.abnormalReportTime) }}</span>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="异常货品:"> </el-form-item>
          <el-row v-if="exception.waybillInfo.templateType == 1">
            <el-table
              ref="orderTable1"
              style="min-height:150px;width:700px;"
              stripe
              :data="item.productInfoList"
            >
              <el-table-column
                label="货品名称"
                prop="productName"
                min-width="130"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                prop="productModel"
                label="货品规格型号"
                min-width="100"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                label="异常备注"
                min-width="100"
                prop="abnormalRemark"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                label="异常状态"
                min-width="100"
                prop="abnormalStatus"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <span>{{
                    scope.row.abnormalStatus == "0"
                      ? "正常"
                      : scope.row.abnormalStatus == "1"
                      ? "异常"
                      : "未知"
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="异常数量"
                min-width="100"
                prop="abnormaledNum"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                label="异常图片"
                min-width="100"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.abnormalPictureList.length > 0"
                    @click="imgScan(scope.row.abnormalPictureList)"
                    type="text"
                    >查看</el-button
                  >
                  <span v-else>无</span>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <!-- 模版2 -->
          <el-row v-if="exception.waybillInfo.templateType == 2">
            <div class="porduct_list_2_container">
              <div
                class="product_item"
                v-for="(item2, index) in item.productInfoList"
                :key="index"
              >
                <div class="img">
                  <img v-if="item2.img" :src="item2.img" alt="" />
                </div>
                <div class="content">
                  <el-form label-position="right" label-width="100px">
                    <el-row>
                      <el-col :span="14">
                        <el-form-item label="商品名称:">
                          <span>{{ item2.productName }}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-form-item label="商品型号:">
                      <span>{{ item2.productModel }}</span>
                    </el-form-item>
                    <el-form-item label="异常备注:">
                      <span>{{ item2.abnormalRemark }}</span>
                    </el-form-item>
                    <el-form-item label="异常状态:">
                      <span>{{
                        item2.abnormalStatus == "0"
                          ? "正常"
                          : item.abnormalStatus == "1"
                          ? "异常"
                          : "未知"
                      }}</span>
                    </el-form-item>
                    <el-form-item label="异常数量:">
                      <span>{{ item2.abnormaledNum }}</span>
                    </el-form-item>
                    <el-form-item label="异常图片:">
                      <el-button
                        v-if="item2.abnormalPictureList.length > 0"
                        @click="imgScan(item2.abnormalPictureList)"
                        type="text"
                        >查看</el-button
                      >
                      <span v-else>无</span>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </el-row>
          <!-- 模版3 -->
          <el-row v-if="exception.waybillInfo.templateType == 3">
            <el-table
              ref="orderTable3"
              style="min-height:150px;width:700px;"
              stripe
              :data="item.productInfoList"
            >
              <el-table-column
                label="货品名称"
                min-width="150"
                prop="productName"
                key="orderTable3_productName"
              >
              </el-table-column>
              <el-table-column
                label="品牌"
                min-width="120"
                prop="productBrand"
                key="orderTable3_productBrand"
              >
              </el-table-column>
              <el-table-column
                label="型号"
                min-width="140"
                prop="productModel"
                key="orderTable3_productModel"
              >
              </el-table-column>
              <el-table-column
                label="规格"
                min-width="120"
                prop="spec"
                key="orderTable3_spec"
              >
              </el-table-column>
              <el-table-column
                label="异常备注"
                min-width="100"
                prop="abnormalRemark"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                label="异常状态"
                min-width="100"
                prop="abnormalStatus"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <span>{{
                    scope.row.abnormalStatus == "0"
                      ? "正常"
                      : scope.row.abnormalStatus == "1"
                      ? "异常"
                      : "未知"
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="异常数量"
                min-width="100"
                prop="abnormaledNum"
                :show-overflow-tooltip="true"
              >
              </el-table-column>
              <el-table-column
                label="异常图片"
                min-width="100"
                :show-overflow-tooltip="true"
              >
                <template slot-scope="scope">
                  <el-button
                    v-if="scope.row.abnormalPictureList.length > 0"
                    @click="imgScan(scope.row.abnormalPictureList)"
                    type="text"
                    >查看</el-button
                  >
                  <span v-else>无</span>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-col>
      </el-row>
      <el-form-item
        label="处理结果:"
        class="deal_from"
        prop="abnormalDealResult"
      >
        <el-input
          v-model="ExceptionForm.abnormalDealResult"
          maxlength="50"
          placeholder="请输入处理结果"
        ></el-input>
      </el-form-item>
      <el-form-item label="处理备注:" prop="abnormalDealRemark">
        <el-input
          v-model="ExceptionForm.abnormalDealRemark"
          type="textarea"
          maxlength="200"
          placeholder="请输入处理备注,最长200字符"
        ></el-input>
      </el-form-item>
      <el-row>
        <el-button type="primary" size="mini" :loading="isSaving" @click="save"
          >确定</el-button
        >
        <el-button size="mini" @click="cancel">取消</el-button>
      </el-row>
    </el-form>
    <img-view
      :imgList="imgList"
      :show.sync="showImgDialog"
      :imgListIndex="imgListIndex"
    />
  </div>
</template>

<script>
import moment from "moment";
import ImgView from "@/components/ImgView";
import { saveAbnormalDeal } from "@/api/exception";
import { Order_Status_List,Order_Type_list } from "@/utils/ENUM";

export default {
  name: "Deal",
  components: {
    ImgView
  },
  data() {
    return {
      showImgDialog: false,
      imgList: [],
      imgListIndex: 0,
      isSaving: false,
      ExceptionForm: {
        abnormalDealResult: "",
        abnormalDealRemark: ""
      },
      exceptionRule: {
        abnormalDealResult: [
          { required: true, message: "请输入异常处理结果", trigger: "change" }
        ]
      },
      isCreate: false,
      statusList: Order_Status_List,
      orderTypeList:Order_Type_list,
      deliverItemType: [
        {
          value: "0",
          label: "小件"
        },
        {
          value: "1",
          label: "套件"
        },
        {
          value: "2",
          label: "单品"
        }
      ]
    };
  },
  props: {
    exception: {
      type: Object
    }
  },
  methods: {
    timeFormatter(time) {
      if (time) {
        return moment(time).format("YYYY-MM-DD HH:mm:ss");
      } else {
        return "";
      }
    },
    dateFormatter(time) {
      if (time) {
        return moment(time).format("YYYY-MM-DD");
      } else {
        return "";
      }
    },
    formatterStatus(status) {
      var msg = "";
      let result = this.statusList.find(item => {
        return status == item.value;
      });
      return result ? result.label : "";
    },
    formatterType(type) {
      let result = this.deliverItemType.find(item => {
        return item.value == type;
      });
      return result ? result.label : type || "未知";
    },
    imgScan(list) {
      this.imgList = list;
      this.imgListIndex = 0;
      this.showImgDialog = true;
    },
    save() {
      let that = this;
      this.$refs.ExceptionForm.validate(isValid => {
        if (isValid) {
          this.ExceptionForm.id = this.exception.id;
          that.isSaving = true
          saveAbnormalDeal(this.ExceptionForm).then(res => {
            that.isSaving = false
            if (!res.error) {
              this.$message({
                type: "success",
                message: "异常处理成功！"
              });
              this.cancel();
              this.$emit("updateTable");
            }
          });
        }
      });
    },
    cancel() {
      this.$emit("cancelDeal");
    },
    typeFormatter(type) {
      let deliverItemType = [
        {
          value: "0",
          label: "小件"
        },
        {
          value: "1",
          label: "套件"
        },
        {
          value: "2",
          label: "单品"
        }
      ];
      if (type) {
        let result = deliverItemType.find(item => {
          return item.value == type;
        });
        if (result) {
          return result.label;
        }
      }
    },
    formatterOrderType(orderType){
      var msg = "";
      let result = this.orderTypeList.find(item => {
        return orderType == item.value;
      });
      return result ? result.label : "";
    },
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
  padding: 0 20px;
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
.ctmsImg {
  width: 20px;
  vertical-align: sub;
}
.ctmsNo {
  font-size: 20px;
  font-weight: bold;
}
.ctmsStatus {
  font-size: 20px;
  line-height: 20px;
}
.exception_form {
  margin-top: 20px;
}
.deal_from {
  margin-top: 20px;
}
</style>
