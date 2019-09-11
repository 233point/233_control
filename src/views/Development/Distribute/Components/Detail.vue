<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 09:34:03
 * @LastEditTime: 2019-08-29 17:28:13
 * @LastEditors: Please set LastEditors
 -->
<template>
  <common-content class="mercure_template" :flex="100">
    <el-form ref="form" :model="form" label-width="120px">
      <el-divider content-position="left">
        <h3>客户信息</h3>
      </el-divider>
      <el-row>
        <el-col :span="8">
          <el-form-item label="客户姓名" prop="customerName">
            <span>{{ form.waybillInfo.customerName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户电话" prop="customerPhone">
            <span>{{ form.waybillInfo.customerPhone }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="地址" prop="productShortName">
            <span>{{ form.waybillInfo.fullAddress }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="电梯" prop="isElevator">
            <span>{{
              form.waybillInfo.isElevator == "0"
                ? "有"
                : form.waybillInfo.isElevator == "1"
                ? "无"
                : "未知"
            }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="楼层数" prop="floor">
            <span>{{ form.waybillInfo.floor }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="left">
        <h3>提货信息</h3>
      </el-divider>
      <el-row>
        <el-col :span="18">
          <el-form-item label="提货联系人" prop="deliveryContactUser">
            <span>{{ form.waybillInfo.deliveryContactUser }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="提货电话" prop="deliveryContactPhone">
            <span>{{ form.waybillInfo.deliveryContactPhone }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="地址" prop="userGender">
            <span>{{ form.waybillInfo.deliveryFullAddress }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="期望提货时间" prop="deliveryTime">
            <span>{{ timeFormatter(form.waybillInfo.deliveryTime) }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="包装件数" prop="pkgNum">
            <span>{{ form.waybillInfo.pkgNum }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="left">
        <h3>货品信息</h3>
      </el-divider>
      <!-- 模版1 -->
      <el-row v-if="form.waybillInfo.templateType == 1">
        <el-table
          ref="orderTable1"
          style="min-height:150px"
          stripe
          :data="form.waybillInfo.productList"
        >
          <el-table-column
            type="index"
            label="序号"
            width="50"
            fixed="left"
          ></el-table-column>
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
            label="重量(公斤)"
            prop="weight"
            min-width="140"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
          <el-table-column
            label="体积(立方米)"
            min-width="140"
            :show-overflow-tooltip="true"
            prop="volume"
          >
          </el-table-column>
          <el-table-column
            label="数量"
            min-width="100"
            prop="num"
            :show-overflow-tooltip="true"
          >
          </el-table-column>
        </el-table>
      </el-row>
      <!-- 模版2 -->
      <el-row v-if="form.waybillInfo.templateType == 2">
        <div class="porduct_list_2_container">
          <div
            class="product_item"
            v-for="(item, index) in form.waybillInfo.productList"
            :key="index"
          >
            <div class="img">
              <img v-if="item.img" :src="item.img" alt="" />
            </div>
            <div class="content">
              <el-form label-position="right" label-width="100px">
                <el-row>
                  <el-col :span="14">
                    <el-form-item label="商品名称:">
                      <span>{{ item.productName }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="数量:">
                      <span>{{ item.num }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="商品型号:">
                  <span>{{ item.productModel }}</span>
                </el-form-item>
                <el-form-item label="特殊要求:">
                  <span>{{ item.specialReq }}</span>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </el-row>
      <!-- 模版3 -->
      <el-row v-if="form.waybillInfo.templateType == 3">
        <el-table
          ref="orderTable3"
          style="min-height:150px"
          stripe
          :data="form.waybillInfo.productList"
        >
          <el-table-column
            type="index"
            label="序号"
            width="50"
            fixed="left"
            key="orderTable3_index"
          ></el-table-column>
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
            label="重量(公斤)"
            min-width="140"
            prop="weight"
            key="orderTable3_weight"
          >
          </el-table-column>
          <el-table-column
            label="颜色"
            min-width="120"
            prop="color"
            key="orderTable3_color"
          >
          </el-table-column>
          <el-table-column
            label="货品类型"
            min-width="120"
            prop="productType"
            key="orderTable3_productType"
          >
            <template slot-scope="scope">
              <span>{{ typeFormatter(scope.row.productType) }}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="子件名"
            min-width="150"
            prop="subProItem"
            key="orderTable3_subProItem"
          >
          </el-table-column>
          <el-table-column
            label="数量"
            min-width="140"
            prop="num"
            key="orderTable3_num"
          >
          </el-table-column>
          <el-table-column
            label="备注"
            min-width="140"
            prop="remark"
            key="orderTable3_remark"
          >
          </el-table-column>
        </el-table>
      </el-row>
      <el-divider content-position="left">
        <h3>备注</h3>
      </el-divider>
      <el-row>
        <el-col :span="24">
          <el-form-item prop="waybillRemark" label-width="0">
            <span>{{ form.waybillInfo.waybillRemark }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="left">
        <h3>预约信息</h3>
      </el-divider>
      <el-row>
        <el-col :span="24">
          <el-form-item label="预约时间" prop="appointTime">
            <span>{{ timeFormatter(form.waybillInfo.appointTime) }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="预约备注" prop="appointRemark">
            <span>{{ form.waybillInfo.appointRemark }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="left">
        <h3>派单信息</h3>
      </el-divider>
      <el-row>
        <el-col :span="8">
          <el-form-item label="状态" prop="transStatus">
            <span>{{ transStatusFormatter(form.transStatus) }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.transStatus > '0'">
        <el-col :span="8">
          <el-form-item label="司机" prop="appointRemark">
            <span>{{ form.driverName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="车牌号" prop="appointRemark">
            <span>{{ form.plateNo }}</span>
          </el-form-item>
        </el-col>
        <el-col v-if="form.installUserList.length" :span="8">
          <el-form-item label="安装人员" prop="departTime">
            <span>{{
              form.installUserList.map(item => item.realName).join("、")
            }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.transStatus > '0'">
        <el-col :span="8">
          <el-form-item label="发车时间" prop="departTime">
            <span>{{ timeFormatter(form.departTime) }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.transStatus > '0'">
        <el-col :span="8">
          <el-form-item label="派单备注" prop="transRemark">
            <span>{{ form.transRemark }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider
        v-if="form.haveReported == '1'"
        content-position="left"
      >
        <h3>
          异常信息
        </h3>
      </el-divider>
      <div v-if="form.haveReported == '1'">
        <el-row
          v-for="(exception, index) in form.abnormalReportInfoVo"
          :key="index"
        >
          <el-col>
            <el-form-item label="上报时间">
              <span>{{ timeFormatter(exception.abnormalReportTime) }}</span>
            </el-form-item>
          </el-col>
          <el-col>
            <el-row v-if="form.waybillInfo.templateType == 1">
              <el-table
                ref="orderTable1"
                style="min-height:150px"
                stripe
                :data="exception.productInfoList"
              >
                <el-table-column
                  type="index"
                  label="序号"
                  width="50"
                  fixed="left"
                ></el-table-column>
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
                  label="重量(公斤)"
                  prop="weight"
                  min-width="140"
                  :show-overflow-tooltip="true"
                >
                </el-table-column>
                <el-table-column
                  label="体积(立方米)"
                  min-width="140"
                  :show-overflow-tooltip="true"
                  prop="volume"
                >
                </el-table-column>
                <el-table-column
                  label="数量"
                  min-width="100"
                  prop="num"
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
            <el-row v-if="form.waybillInfo.templateType == 2">
              <div class="porduct_list_2_container">
                <div
                  class="product_item"
                  v-for="(item, index) in exception.productInfoList"
                  :key="index"
                >
                  <div class="img">
                    <img v-if="item.img" :src="item.img" alt="" />
                  </div>
                  <div class="content">
                    <el-form label-position="right" label-width="100px">
                      <el-row>
                        <el-col :span="14">
                          <el-form-item label="商品名称:">
                            <span>{{ item.productName }}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="10">
                          <el-form-item label="数量:">
                            <span>{{ item.num }}</span>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-form-item label="商品型号:">
                        <span>{{ item.productModel }}</span>
                      </el-form-item>
                      <el-form-item label="特殊要求:">
                        <span>{{ item.specialReq }}</span>
                      </el-form-item>
                      <el-form-item label="异常备注:">
                        <span>{{ item.abnormalRemark }}</span>
                      </el-form-item>
                      <el-form-item label="异常状态:">
                        <span>{{
                          item.abnormalStatus == "0"
                            ? "正常"
                            : item.abnormalStatus == "1"
                            ? "异常"
                            : "未知"
                        }}</span>
                      </el-form-item>
                      <el-form-item label="异常数量:">
                        <span>{{ item.abnormaledNum }}</span>
                      </el-form-item>
                      <el-form-item label="异常图片:">
                        <el-button
                          v-if="item.abnormalPictureList.length > 0"
                          @click="imgScan(item.abnormalPictureList)"
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
            <el-row v-if="form.waybillInfo.templateType == 3">
              <el-table
                ref="orderTable3"
                style="min-height:150px"
                stripe
                :data="exception.productInfoList"
              >
                <el-table-column
                  type="index"
                  label="序号"
                  width="50"
                  fixed="left"
                  key="orderTable3_index"
                ></el-table-column>
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
                  label="重量(公斤)"
                  min-width="140"
                  prop="weight"
                  key="orderTable3_weight"
                >
                </el-table-column>
                <el-table-column
                  label="颜色"
                  min-width="120"
                  prop="color"
                  key="orderTable3_color"
                >
                </el-table-column>
                <el-table-column
                  label="货品类型"
                  min-width="120"
                  prop="productType"
                  key="orderTable3_productType"
                >
                  <template slot-scope="scope">
                    <span>{{ typeFormatter(scope.row.productType) }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="子件名"
                  min-width="150"
                  prop="subProItem"
                  key="orderTable3_subProItem"
                >
                </el-table-column>
                <el-table-column
                  label="数量"
                  min-width="140"
                  prop="num"
                  key="orderTable3_num"
                >
                </el-table-column>
                <el-table-column
                  label="备注"
                  min-width="140"
                  prop="remark"
                  key="orderTable3_remark"
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
        <el-row>
          <el-col>
            <el-form-item label="处理状态">
              <span>{{
                form.abnormalDealStatus == "0"
                  ? "待处理"
                  : form.abnormalDealStatus == "1"
                  ? "已处理"
                  : "未知"
              }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="处理结果">
              <span>{{ form.abnormalDealResult }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="处理备注">
              <span>{{ form.abnormalDealRemark }}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
    <img-view
      :imgList="imgList"
      :show.sync="showImgDialog"
      :imgListIndex="imgListIndex"
    />
  </common-content>
</template>
<script>
/**
 * MercureTemplate
 * ----------------------
 * Author: Calamus
 * Date: 2019.05.15
 */
// validate
import Validator from "@/utils/extendValidate/extendValidate";
import TransferHeader from "@/components/TransferHeader";
import CommonContent from "@/components/commonContent";
import moment from "moment";
import ImgView from "@/components/ImgView";

// api
import { updateUser } from "@/api/user";
import { Order_Status_List, All_Status_List } from "@/utils/ENUM";
import CommonTable from "@/components/commonTable";

const initFrom = {
  productName: "",
  productShortName: "",
  productOperLogs: [],
  productContent: "",
  disPrice: "",
  prePrice: "",
  productStatus: "",
  createUserId: ""
};

export default {
  name: "Detail",
  components: {
    TransferHeader,
    CommonContent,
    CommonTable,
    ImgView
  },
  data() {
    return {
      showImgDialog: false,
      imgList: [],
      imgListIndex: 0,
      isVisible: false,
      orgnization: [],
      form: {},
      options: [],
      statusList: Order_Status_List,
      transStatusList: All_Status_List,
      customStyle:
        "background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden",
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
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "add"
    },
    info: {
      type: Object,
      default: null
    }
  },
  watch: {
    info: {
      handler(newValue, oldValue) {
        this.form = JSON.parse(JSON.stringify(newValue));
        console.log("info");
      },
      deep: true
    }
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.info));
    console.log("mountedinfo");
  },
  methods: {
    formatterStatus(status) {
      var msg = {
        label: "待接单",
        value: "0",
        percentage: 0,
        color: ""
      };
      this.statusList.map(item => {
        if (status == item.value) {
          msg = item;
        }
      });
      return msg;
    },
    timeFormatter(time) {
      if (time) {
        return moment(time).format("YYYY-MM-DD HH:mm");
      } else {
        return "";
      }
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
    transStatusFormatter(status) {
      let result = this.transStatusList.find(item => {
        return item.value === status;
      });
      if (result) {
        return result.label;
      } else {
        return "";
      }
    },
    imgScan(list) {
      this.imgList = list;
      this.imgListIndex = 0;
      this.showImgDialog = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.mercure_template {
  padding: 0 30px;
}
.porduct_list_2_container {
  width: 100%;
  margin-bottom: 1rem;
  .product_item {
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #dcdcdc;
    .img,
    .action {
      width: 200px;
    }
    .img {
      text-align: center;
      img {
        width: 150px;
        padding: 2rem;
      }
    }
    .content {
      padding: 2rem;
      width: calc(100% - 400px);
    }
    .action {
      text-align: right;
    }
  }
}
</style>
