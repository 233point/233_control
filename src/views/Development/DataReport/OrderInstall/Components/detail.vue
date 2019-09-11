<!--
 * @Description: In User Settings Edit
 * @Author: Calamus
 * @Date: 2019-05-20 10:21:31
 * @LastEditTime: 2019-08-14 15:37:03
 * @LastEditors: Please set LastEditors
 -->
<template>
  <common-content class="mercure_template" :flex="100">
    <el-form
      ref="form"
      :model="form"
      v-loading="isListLoading"
      label-width="120px"
    >
      <el-row>
        <el-col :span="16">
          <el-row>
            <el-col :span="16" class="title_show">
              <p class="main_title">CTMS单号:{{ form.waybillNo }}</p>
              <p class="sub_title">第三方单号:{{ form.thirdPartyNo }}</p>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="商户" prop="merchantName">
                <span>{{ form.merchantName }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="服务类型" prop="orderType">
                <span>
                  {{formatterOrderType(form.orderType)}}
                </span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="服务时间" prop="eppointTime">
                <span>{{ timeFormatter(form.eppointTime) }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="创建时间" prop="createTime">
                <span>{{ timeFormatter(form.createTime) }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注" prop="waybillRemark">
                <span>{{ form.waybillRemark }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="24">
              <el-form-item label="状态" prop="status">
                <span>{{ formatterStatus(form.status) }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-button-group>
                <el-button>查看异常</el-button>
                <el-button @click="activeName == 'install'">查看轨迹</el-button>
              </el-button-group>
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
                    <span>{{ form.customerName }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="客户电话" prop="customerPhone">
                    <span>{{ form.customerPhone }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="楼层" prop="floor">
                    <span>{{ form.floor }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="电梯" prop="isElevator">
                    <span>{{
                      form.isElevator == 0
                        ? "有"
                        : form.isElevator == 1
                        ? "无"
                        : "未知"
                    }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="地址" prop="fullAddress">
                    <span>{{ form.fullAddress }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="包装件数" prop="pkgNum">
                    <span>{{ form.pkgNum }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item label="备注" prop="waybillRemark">
                    <span>{{ form.waybillRemark }}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-divider content-position="left">
                <h3>提货信息</h3>
              </el-divider>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="提货联系人" prop="deliveryContactUser">
                    <span>{{ form.deliveryContactUser }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="提货电话" prop="deliveryContactPhone">
                    <span>{{ form.deliveryContactPhone }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="地址" prop="userGender">
                    <span>{{ form.deliveryFullAddress }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="16">
                  <el-form-item label="期望提货时间" prop="deliveryTime">
                    <span>{{ timeFormatter(form.deliveryTime) }}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-divider content-position="left">
                <h3>其他要求</h3>
              </el-divider>
              <el-row>
                <el-col :span="16">
                  <el-form-item label="服务时间" prop="expectFinishTime">
                    <span>{{ dateFormatter(form.expectFinishTime) }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="预估费用" prop="estimatedCost">
                    <span>{{ form.estimatedCost }}&nbsp;&nbsp;元</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-divider content-position="left">
                <h3>货品信息</h3>
              </el-divider>

              <!-- 模版1 -->
              <el-row v-if="form.templateType == 1">
                <el-table
                  ref="orderTable1"
                  style="min-height:150px"
                  stripe
                  :data="form.productList"
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
              <el-row v-if="form.templateType == 2">
                <div class="porduct_list_2_container">
                  <div
                    class="product_item"
                    v-for="(item, index) in form.productList"
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
              <el-row v-if="form.templateType == 3">
                <el-table
                  ref="orderTable3"
                  style="min-height:150px"
                  stripe
                  :data="form.productList"
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
                  <el-form-item label="安装人员" prop="installUser">
                    <span>{{ form.installUser }}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-divider content-position="left">
                <h3>提货信息</h3>
              </el-divider>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="提货时间" prop="deliveryTime">
                    <span>{{ timeFormatter(form.deliveryTime) }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="提货图片" prop="installUser">
                    <span>{{ form.installUser }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="提货备注" prop="installUser">
                    <span>{{ form.installUser }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-divider content-position="left">
                <h3>回单轨迹</h3>
              </el-divider>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="操作人" prop="installUser">
                    <span>{{ form.installUser }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="回单时间" prop="installUser">
                    <span>{{ form.installUser }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="确认单" prop="installUser">
                    <span>{{ form.installUser }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="回单照片" prop="installUser">
                    <span>{{ form.installUser }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="回单备注" prop="installUser">
                    <span>{{ form.installUser }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="家装需求" prop="installUser">
                    <span>{{ form.installUser }}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-divider content-position="left">
                <h3>评价信息</h3>
              </el-divider>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="服务评分" prop="installUser">
                    <el-rate v-model="star" :colors="colors"> </el-rate>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item label="评分备注" prop="installUser">
                    <span>{{ form.installUser }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-divider content-position="left">
                <h3>配装进度</h3>
              </el-divider>
              <el-row>
                <el-col :span="24">
                  <track-detail :info="info" />
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-form>
  </common-content>
</template>
<script>
// validate
import Validator from "@/utils/extendValidate/extendValidate";
import TransferHeader from "@/components/TransferHeader";
import CommonContent from "@/components/commonContent";
import moment from "moment";
// api
import { updateUser } from "@/api/user";
import { All_Status_List,Order_Type_list } from "@/utils/ENUM";
import CommonTable from "@/components/commonTable";
import TrackDetail from "./trackDetail";
import { getInstallDetail, getTransInfoDetail } from "@/api/datareport";

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
    TrackDetail
  },
  data() {
    return {
      activeName: "detail",
      isVisible: false,
      orgnization: [],
      form: {},
      isListLoading: false,
      options: [],
      statusList: All_Status_List,
      orderTypeList:Order_Type_list,
      star: 4,
      icons: ["icon-rate-face-1", "icon-rate-face-2", "icon-rate-face-3"],
      colors: {
        6: "#99A9BF",
        7: { value: "#F7BA2A", excluded: true },
        10: "#FF9900"
      },
      customStyle:
        "background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden"
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
        this.form.star = 3;
      },
      deep: true
    }
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.info));
    this.form.star = 3;
  },
  methods: {
    getInstallInfo(params) {
      this.isListLoading = true;
      getInstallDetail(params).then(res => {
        if (!res.error) {
          this.isListLoading = false;
          this.form = JSON.parse(JSON.stringify(res));
        }
      });
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
</style>
