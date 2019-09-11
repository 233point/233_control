<!--
 * @Description: In User Settings Edit
 * @Author: Calamus
 * @Date: 2019-08-14 11:45:53
 * @LastEditTime: 2019-09-04 10:04:25
 * @LastEditors: Please set LastEditors
 -->
<template>
  <common-content class="mercure_template" :flex="100">
    <div class="title">
      <div class="detail_title">配装详情</div>
      <div>
        <i class="el-icon-close" @click="cancel"></i>
      </div>
    </div>
    <div class="btn_fixed">
      <el-button
        type="primary"
        plain
        :disabled="form.haveReported != 1"
        @click="
          gotoPath({
            name: 'ExceptionManagement',
            params: { waybillNo: waybillNo }
          })
        "
        >查看异常</el-button
      >
      <el-button
        type="primary"
        plain
        :disabled="form.transStatus <= 1 || form.transStatus >= 11 || form.orderType == 2"
        @click="
          gotoPath({ name: 'Transport', params: { waybillNo: waybillNo } })
        "
        >查看轨迹</el-button
      >
    </div>
    <el-form
      ref="form"
      :model="form"
      v-loading="isListLoading"
      label-width="120px"
      class="detail_container"
    >
      <el-row>
        <el-col :span="16">
          <el-row>
            <el-col :span="16" class="title_show">
              <p class="main_title">CTMS单号:{{ form.waybillNo }}</p>
              <p class="sub_title">第三方单号:{{ waybillInfo.thirdPartyNo }}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="商户" prop="merchantName">
                <span>{{ waybillInfo.merchantName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="服务类型" prop="orderType">
                <span>
                  {{formatterOrderType(waybillInfo.orderType)}}
                </span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="服务时间" prop="appointTime">
                <span>{{ timeFormatter(waybillInfo.appointTime) }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建时间" prop="createTime">
                <span>{{ timeFormatter(waybillInfo.createTime) }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="订单备注" prop="remark">
                <span>{{ waybillInfo.waybillRemark }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="form.transStatus == '11'">
            <el-col :span="24">
              <el-form-item label="撤单备注" prop="remark">
                <span>{{ form.withdrawRemark }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="form.transStatus == '8'">
            <el-col :span="24">
              <el-form-item label="客户拒收备注" prop="remark">
                <span>{{ form.rejectDocumentRemark }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="24">
              <el-form-item label="状态" prop="status">
                <span>{{ formatterStatus(form.transStatus) }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <el-row style="padding:1rem 2rem">
        <el-col :span="24">
          <el-tabs v-model="activeName">
            <el-tab-pane label="详情" name="detail">
              <el-divider content-position="left">
                <h3>客户信息</h3>
              </el-divider>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="客户姓名" prop="customerName">
                    <span>{{ waybillInfo.customerName }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="客户电话" prop="customerPhone">
                    <span>{{ waybillInfo.customerPhone }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="楼层" prop="floor">
                    <span>{{ waybillInfo.floor }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="电梯" prop="isElevator">
                    <span>{{
                      waybillInfo.isElevator == 0
                        ? "有"
                        : waybillInfo.isElevator == 1
                        ? "无"
                        : "未知"
                    }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="地址" prop="fullAddress">
                    <span>{{ waybillInfo.fullAddress }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-row>
                <el-col :span="8">
                  <el-form-item label="包装件数" prop="pkgNum">
                    <span>{{ waybillInfo.pkgNum }}</span>
                  </el-form-item>
                </el-col>
              </el-row> -->

              <el-divider content-position="left">
                <h3>提货信息</h3>
              </el-divider>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="提货联系人" prop="deliveryContactUser">
                    <span>{{ waybillInfo.deliveryContactUser }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="提货电话" prop="deliveryContactPhone">
                    <span>{{ waybillInfo.deliveryContactPhone }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="地址" prop="userGender">
                    <span>{{ waybillInfo.deliveryFullAddress }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="16">
                  <el-form-item label="期望提货时间" prop="deliveryTime">
                    <span>{{ timeFormatter(waybillInfo.deliveryTime) }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="16">
                  <el-form-item label="包装件数" prop="deliveryTime">
                    <span>{{ waybillInfo.pkgNum }}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-divider content-position="left">
                <h3>其他要求</h3>
              </el-divider>
              <el-row>
                <el-col :span="16">
                  <el-form-item label="服务时间" prop="expectFinishTime">
                    <span
                      >希望在 &nbsp;&nbsp;{{
                        dateFormatter(waybillInfo.expectFinishTime)
                      }}
                      &nbsp;&nbsp;前完成服务</span
                    >
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="预估费用" prop="estimatedCost">
                    <span>{{ waybillInfo.estimatedCost }}&nbsp;&nbsp;元</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="备注" prop="waybillRemark">
                    <span>{{ waybillInfo.waybillRemark }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-divider content-position="left">
                <h3>货品信息</h3>
              </el-divider>

              <!-- 模版1 -->
              <el-row v-if="waybillInfo.templateType == 1">
                <el-table
                  ref="orderTable1"
                  style="min-height:150px"
                  stripe
                  :data="productList"
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
                    label="重量"
                    prop="weight"
                    min-width="100"
                    :show-overflow-tooltip="true"
                  >
                  </el-table-column>
                  <el-table-column
                    label="体积"
                    min-width="100"
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
              <el-row v-if="waybillInfo.templateType == 2">
                <div class="porduct_list_2_container">
                  <div
                    class="product_item"
                    v-for="(item, index) in productList"
                    :key="index"
                  >
                    <div class="img">
                      <img
                        v-if="item.img"
                        :src="item.img"
                        @click="imgScan(item.img)"
                        alt=""
                      />
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
              <el-row v-if="waybillInfo.templateType == 3">
                <el-table
                  ref="orderTable3"
                  style="min-height:150px"
                  stripe
                  :data="productList"
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
                    label="重量"
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
            </el-tab-pane>
            <el-tab-pane label="配装" name="install">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="车牌号" prop="plateNo">
                    <span>{{ form.plateNo }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="发车时间" prop="departTime">
                    <span>{{ timeFormatter(form.departTime) }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="司机" prop="driverName">
                    <span>{{ form.driverName }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="安装人员" prop="installUserList">
                    <span
                      v-if="
                        form.installUserList && form.installUserList.length > 0
                      "
                      >{{
                        form.installUserList
                          .map(item => item.realName)
                          .join("、")
                      }}</span
                    >
                  </el-form-item>
                </el-col>
              </el-row>

              <el-divider content-position="left">
                <h3>提货信息</h3>
              </el-divider>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="提货时间" prop="deliveryTime">
                    <span>{{
                      timeFormatter(DeliveryInfo.takingDeliveryTime)
                    }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="提货图片" prop="serviceRecordVoList">
                    <div
                      class="picture_container"
                      v-for="(item, index) in DeliveryInfo.pictureList"
                      :key="index"
                    >
                      <img
                        :src="item"
                        class="picture_item"
                        @click="imgScan(item)"
                      />
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="提货备注" prop="transRemark">
                    <span>{{ DeliveryInfo.takingDeliveryRemark }}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-divider content-position="left" v-if="form.orderType == 2">
                <h3>上门信息</h3>
              </el-divider>
              <el-row v-if="form.orderType == 2">
                <el-col :span="24">
                  <el-form-item label="上门时间" prop="deliveryTime">
                    <span>{{
                      timeFormatter(DeliveryInfo.takingDeliveryTime)
                    }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="form.orderType == 2">
                <el-col :span="24">
                  <el-form-item label="上门备注" prop="transRemark">
                    <span>{{ DeliveryInfo.takingDeliveryRemark }}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-divider content-position="left">
                <h3>回单信息</h3>
              </el-divider>
              <!-- <el-row>
                <el-col :span="24">
                  <el-form-item label="操作人"
                                prop="installUser">
                    <span>{{ReceiptInfo.createrName}}</span>
                  </el-form-item>
                </el-col>
              </el-row> -->
              <el-row>
                <el-col :span="24">
                  <el-form-item label="回单时间" prop="installUser">
                    <span>{{ timeFormatter(ReceiptInfo.receiptTime) }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="确认单" prop="confirmationSheet">
                    <div
                      class="picture_container"
                      v-for="(item, index) in ReceiptInfo.deliveryNotePicList"
                      :key="index"
                    >
                      <img
                        :src="item"
                        class="picture_item"
                        @click="imgScan(item)"
                      />
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="回单照片" prop="deliveryNotePicList">
                    <div
                      class="picture_container"
                      v-for="(item, index) in ReceiptInfo.afterInstallPicList"
                      :key="index"
                    >
                      <img
                        :src="item"
                        class="picture_item"
                        @click="imgScan(item)"
                      />
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="回单备注" prop="receiptRemark">
                    <span>{{ ReceiptInfo.receiptRemark }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="家装需求" prop="installUser">
                    <span>{{ ReceiptInfo.homeDecorationDemand }}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-divider
                content-position="left"
                v-if="Object.keys(starInfo).length > 0"
              >
                <h3>评价信息</h3>
              </el-divider>
              <el-row v-if="Object.keys(starInfo).length > 0">
                <el-col :span="24">
                  <el-form-item label="服务评分" prop="installUser">
                    <el-rate v-model="starInfo.star" :colors="colors" disabled>
                    </el-rate>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="Object.keys(starInfo).length > 0">
                <el-col :span="24">
                  <el-form-item label="评分备注" prop="starRemark">
                    <span>{{ starInfo.starRemark }}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-divider content-position="left">
                <h3>配装进度</h3>
              </el-divider>
              <el-row>
                <el-col :span="22" :offset="2">
                  <a-timeline v-loading="timeLoading">
                    <a-timeline-item
                      v-for="(item, index) in transTimeLine"
                      :key="index"
                    >
                      <p class="time">{{ timeFormatter(item.trailTime) }}</p>
                      <p class="content">{{ item.trailRemark }}</p>
                    </a-timeline-item>
                  </a-timeline>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog :visible.sync="showImgDialog" width="700px" append-to-body>
      <img :src="imgUrl" class="dialogImg" />
    </el-dialog>
  </common-content>
</template>

<script>
import CommonContent from "@/components/commonContent";
import TransferHeader from "@/components/TransferHeader";
import CommonTable from "@/components/commonTable";
import moment from "moment";
import { All_Status_List,Order_Type_list } from "@/utils/ENUM";
import { getInstallDetail, getTransInfoDetail } from "@/api/datareport";

export default {
  name: "InstallDetail",
  components: {
    TransferHeader,
    CommonContent,
    CommonTable
  },
  data() {
    return {
      waybillNo: "",
      activeName: "detail",
      isVisible: false,
      showImgDialog: false,
      imgUrl: "",
      orgnization: [],
      form: {},
      waybillInfo: {},
      ReceiptInfo: {},
      DeliveryInfo: {},
      starInfo: {},
      productList: [],
      transTimeLine: [],
      isListLoading: false,
      timeLoading: false,
      options: [],
      statusList: All_Status_List,
      orderTypeList:Order_Type_list,
      icons: ["icon-rate-face-1", "icon-rate-face-2", "icon-rate-face-3"],
      colors: {
        6: "#99A9BF",
        7: { value: "#F7BA2A", excluded: true },
        10: "#FF9900"
      }
    };
  },
  watch: {
    $route() {
      this.waybillNo = this.$route.query.waybillNo;
    },
    waybillNo(newVal, oldVal) {
      console.log(newVal, "newVal", oldVal);
      if (newVal) {
        this.getInstall({ waybillNo: this.$route.query.waybillNo });
        this.getTransInfo({ waybillNo: this.$route.query.waybillNo });
      } else {
        this.$message({
          message: "获取订单详情失败",
          type: "error"
        });
        setTimeout(() => {
          this.cancel();
        }, 500);
      }
    }
  },
  mounted() {
    this.waybillNo = this.$route.query.waybillNo;
    console.log(this.waybillNo);
  },
  methods: {
    getInstall(params) {
      this.timeLoading = true;
      getTransInfoDetail(params).then(res => {
        this.timeLoading = false;
        if (!res.error) {
          this.transTimeLine = res.trailInfos;
        } else {
          this.$message({
            message: "获取配装进度失败",
            type: "error"
          });
          setTimeout(() => {
            this.cancel();
          }, 500);
        }
      });
    },
    getTransInfo(params) {
      this.isListLoading = true;
      getInstallDetail(params).then(res => {
        if (!res.error) {
          this.isListLoading = false;
          this.form = JSON.parse(JSON.stringify(res));
          this.waybillInfo = JSON.parse(JSON.stringify(res.waybillInfo));
          this.productList = JSON.parse(
            JSON.stringify(res.waybillInfo.productList)
          );
          this.starInfo =
            res.evaluateModel && res.evaluateModel.length > 0
              ? res.evaluateModel
              : {};
          console.log(
            "res.receiptInfoVo",
            Object.keys(this.starInfo).length === 0
          );
          this.ReceiptInfo =
            res.receiptInfoVo && Object.keys(res.receiptInfoVo).length > 0
              ? res.receiptInfoVo
              : {};
          console.log("res.receiptInfoVo", this.ReceiptInfo);

          this.DeliveryInfo =
            res.takingDeliveryInfoVo.length > 0
              ? res.takingDeliveryInfoVo[0]
              : {};
        } else {
          this.$message({
            message: "获取订单详情失败",
            type: "error"
          });
          setTimeout(() => {
            this.cancel();
          }, 500);
        }
      });
    },
    cancel() {
      this.$router.push({
        name: "InstallData"
      });
    },
    gotoPath(obj) {
      this.$router.push(obj);
    },
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
      return msg.label;
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
    timeFormatter(time) {
      if (time) {
        return moment(time).format("YYYY-MM-DD HH:mm");
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
    formatterOrderType(orderType){
      var msg = "";
      let result = this.orderTypeList.find(item => {
        return orderType == item.value;
      });
      return result ? result.label : "";
    },
    imgScan(img) {
      if (img) {
        this.imgUrl = img;
        this.showImgDialog = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mercure_template {
  width: 100%;
  padding: 1rem 2rem;
}
.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
  margin-bottom: 5px !important;
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
.title {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  border-bottom: 1px solid #dcdcdc;
  height: 40px;
  align-items: center;
  .detail_title {
    color: black;
    font-weight: 500;
  }
  .el-icon-close {
    cursor: pointer;
  }
}
.detail_container {
  margin: 1rem;
  width: 90%;
  .title_show {
    .main_title {
      font-size: 15px;
      font-weight: 500;
      color: black;
    }
    .sub_title {
      font-size: 14px;
      color: #909399;
    }
  }
}
.btn_fixed {
  position: fixed;
  top: 35%;
  right: 3rem;
  button {
    display: block;
    margin: 0.5rem 0 !important;
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
