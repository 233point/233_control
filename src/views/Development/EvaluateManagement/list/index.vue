<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-14 17:52:53
 * @LastEditTime: 2019-09-04 09:59:48
 * @LastEditors: Please set LastEditors
 -->
<template>
  <common-content id="order-management" :flex="100">
      <search
        @btnSearch="btnSearch"
        @search="search"
        @rest="rest"
        :merchantList="merchantList"
      />

    <el-table
      ref="vehicle"
      highlight-current-row
      tooltip-effect="light"
      v-loading="vehicleisListLoading"
      :data="vehicleData"
    >
      <el-table-column
        type="index"
        :index="indexMethod"
        label="序号"
        fixed="left"
        width="50"
      ></el-table-column>
      <el-table-column
        v-for="(item, index) in rowList.filter(res => {
          return res.checked;
        })"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :fixed="item.fixed"
        :show-overflow-tooltip="true"
        :min-width="item.minwidth || 90"
      >
        <template slot-scope="scope">
          <span v-if="item.prop == 'isElevator'">
            {{
              scope.row[item.prop] == "0"
                ? "有"
                : scope.row[item.prop] == "1"
                ? "无"
                : "未知"
            }}
          </span>
          <span v-else-if="item.prop == 'orderType'">
            {{formatterOrderType(scope.row[item.prop])}}
          </span>
          <span v-else-if="item.prop == 'isAbnormal'">
            {{
              scope.row[item.prop] == "0"
                ? "是"
                : scope.row[item.prop] == "1"
                ? "否"
                : "未知"
            }}
          </span>
          <span v-else>
            <span v-if="item.type == 'date'">{{
              timeFormatter(scope.row[item.prop])
            }}</span>
            <span v-else-if="item.type == 'day'">{{
              dateFormatter(scope.row[item.prop])
            }}</span>
            <span v-else>{{ scope.row[item.prop] }}</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        prop="customerEvaluationStatus"
        label="状态"
        min-width="150"
        fixed="right"
      >
        <template slot-scope="scope">
          <span>
            {{ formatterStatus(scope.row.customerEvaluationStatus) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column width="190" fixed="right">
        <template slot="header" slot-scope="scope">
          <el-popover
            placement="left"
            popper-class="row_list"
            width="300"
            trigger="click"
          >
            <div class="choose_row_list">
              <div class="head">
                <el-checkbox
                  :indeterminate="isRowIndeterminate"
                  v-model="rowCheckAll"
                  @change="handleCheckAllRowChange"
                  >全选</el-checkbox
                >
                <span>{{ rowChoosed.length }} / {{ rowList.length }}</span>
              </div>
              <el-checkbox-group
                v-model="rowChoosed"
                @change="handleCheckedRowChange"
              >
                <el-checkbox
                  v-for="(row, index) in rowList"
                  :label="row.prop"
                  :key="index"
                  :disabled="row.disabled"
                >
                  {{ row.label }}
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <el-button
              size="large"
              slot="reference"
              icon="el-icon-s-unfold"
              type="text"
            ></el-button>
          </el-popover>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click.stop="handleDetail(scope.row)"
            >查看</el-button
          >
          <el-divider
            direction="vertical"
            v-if="showBtn('handleCommont') && !isDealDisabled(scope.row)"
          ></el-divider>
          <!-- <el-button size="mini"
                     type="text"
                     @click.stop="handleCommont(scope.row)">跟进</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button size="mini"
                     type="text"
                     @click.stop="handleEvaluate(scope.row)">评价</el-button> -->
          <el-button
            size="mini"
            type="text"
            v-if="showBtn('handleCommont') && !isDealDisabled(scope.row)"
            :disabled="
              !(
                scope.row.followDealStatus == '0' &&
                scope.row.customerEvaluationStatus == '1'
              )
            "
            @click.stop="handleCommont(scope.row)"
            >跟进</el-button
          >
          <el-divider
            v-if="showBtn('handleEvaluate') && !isDealDisabled(scope.row)"
            direction="vertical"
          ></el-divider>
          <el-button
            size="mini"
            type="text"
            v-if="showBtn('handleEvaluate') && !isDealDisabled(scope.row)"
            :disabled="scope.row.customerEvaluationStatus != 0"
            @click.stop="handleEvaluate(scope.row)"
            >评价</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="xhe-page">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :current-page.sync="pagination.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @current-change="changePage"
        @size-change="handleSizeChange"
      ></el-pagination>
    </div>
    <a-drawer
      title="评价"
      :visible.sync="showCreateEva"
      placement="right"
      width="100%"
      wrapClassName="xhe-header-menu"
      getContainer="main"
      @close="cancelCreateEva"
    >
      <Star
        :isEdit="isCreate"
        :show.sync="showCreateEva"
        @cancelCreateEva="cancelCreateEva"
        @updateTable="search"
        :waybillTypeList="waybillTypeList"
        :linkTypeList="linkTypeList"
        :searchParams="searchParams"
        :queryInfo.sync="selectedOrderInfo"
        @updateList="search"
        @save="starSave"
      />
    </a-drawer>
    <a-drawer
      title="差评跟进"
      :visible.sync="showCommontEva"
      placement="right"
      width="100%"
      wrapClassName="xhe-header-menu"
      getContainer="main"
      @close="cancelCommontEva"
    >
      <commont
        v-if="showCommontEva"
        :orderInfo="selectedOrderInfo"
        @cancelCreateEva="cancelCommontEva"
        @updateTable="search"
      />
    </a-drawer>

    <a-drawer
      title="评价详情"
      placement="right"
      @close="closeDetail"
      width="100%"
      wrapClassName="xhe-header-menu"
      getContainer="main"
      :visible.sync="showDetail"
    >
      <detail
        :queryInfo="selectedOrderInfo"
        v-if="showDetail"
        :orderInfo="selectedOrderInfo"
        :linkTypeList="linkTypeList"
      />
    </a-drawer>
  </common-content>
</template>

<script>
import moment from "moment";
import CommonWrapper from "@/components/commonWrapper";
import CommonTable from "@/components/commonTable";
import CommonContent from "@/components/commonContent";
import ChooseInfo from "@/components/chooseInfo";

import Search from "./Components/Search";
import Detail from "./Components/Detail";
import Star from "./Components/star";
import Commont from "./Components/Commont";
import Create from "./Components/Create";
import {
  getDistributionWaitList,
  getDeliveryList,
  delDelivery
} from "@/api/distribution";
import { getMerchantsByAssembly } from "@/api/order";
import { getEvaluationList } from "@/api/evaluate";
import { mixins } from "@/mixins";
import {
  Evaluate_Status_List,
  Evaluate_List_Label,
  Waybill_Type_List,
  linkTypeList,
  Install_Status_List,
  Order_Type_list
} from "@/utils/ENUM";

export default {
  name: "Evaluate",
  mixins: [mixins],
  data() {
    return {
      vid: "amap",
      vehicleData: [],
      merchantList: [],
      selectRow: [], // 列表选中列
      waybillTypeList: Waybill_Type_List,
      linkTypeList: linkTypeList,
      customerMarker: [],
      customerMarkerStyle: {
        name:
          "position: absolute;color: #fff;top: 3px;width: 28px;text-align: center;font-size: 18px;"
      },
      tableData: [],
      vehicleisListLoading: false,
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      chooseMsg: "",
      searchParams: {},
      orderInfo: {},
      isCreateFormVisible: false,
      isCreate: true,
      isCheckFormVisible: false,
      checkInfo: {},
      isDetailFormVisible: false,
      driverList: [],
      isRowIndeterminate: true,
      rowCheckAll: false,
      rowChoosed: [],
      orderTypeList:Order_Type_list,
      rowList: Evaluate_List_Label.filter(item => {
        return (
          !item.role || item.role.indexOf(this.$store.getters.roleType) >= 0
        );
      }),
      statusList: Evaluate_Status_List,
      transStatusList: Install_Status_List,
      transStatus: "",
      showCreateEva: false,
      showCommontEva: false,
      showDetail: false,
      selectedOrderInfo: {},
      buttonData: []
    };
  },
  mounted() {
    if (
      !this.$store.getters.roleType.includes("merchant") &&
      this.$store.getters.roleType != "assemblyManager"
    ) {
      this.getMerchantList();
    }
    this.rowList.forEach(item => {
      if (item.checked) {
        this.rowChoosed.push(item.prop);
      }
    });
  },
  methods: {
    async getMerchantList() {
      await getMerchantsByAssembly().then(res => {
        if (!res.error) {
          this.merchantList = res;
        }
      });
    },
    btnSearch(params) {
      this.pagination.pageNum = 1;
      this.search(params);
    },
    // 查询和初始化查询
    // 查询/翻页公用方法
    search(params) {
      this.pagination.pageNum = 1 ;
      const searchParams = params
        ? (this.searchParams = params)
        : this.searchParams;
      this.queryList(this.searchParams);
    },
    queryList(params) {
      this.getDeliveryList({
        ...params,
        carrierId: this.$store.getters.userId,
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      });
    },
    rest(params) {
      const searchParams = (this.searchParams = params);
      this.getDeliveryList({
        ...searchParams,
        carrierId: this.$store.getters.userId,
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      });
    },
    // 列表翻页
    changePage(pageNum) {
      this.pagination.pageNum = pageNum;
      this.queryList(this.searchParams);
    },
    // 生成列表序号
    indexMethod(index) {
      return (
        index + 1 + (this.pagination.pageNum - 1) * this.pagination.pageSize
      );
    },
    // 获取配送列表
    getDeliveryList(params) {
      this.$store.getters.roleType != "carrier" ? delete params.carrierId : "";
      this.vehicleisListLoading = true;
      getEvaluationList(params).then(res => {
        this.pagination.total = res.total;
        this.pagination.pageNum = res.pageNum;
        this.pagination.pageSize = res.pageSize;

        let list = res.item.map(item => {
          let params = new Object();
          params.id = item.id;
          params.waybillNo = item.waybillNo || "";
          params.followDealStatus = item.followDealStatus || "";
          params.followDealResult = item.followDealResult || "";
          params.followDealRemark = item.followDealRemark || "";
          params.customerEvaluationStatus = item.customerEvaluationStatus;
          params.thirdPartyNo = item.transInfo.waybillInfo.thirdPartyNo || "";
          params.orderType = item.orderType || "";
          params.customerName = item.transInfo.waybillInfo.customerName || "";
          params.customerPhone = item.transInfo.waybillInfo.customerPhone || "";
          params.fullAddress = item.transInfo.waybillInfo.fullAddress || "";
          params.floor = item.transInfo.waybillInfo.floor || "";
          params.isElevator = item.transInfo.waybillInfo.isElevator || "";
          params.deliveryContactUser =
            item.transInfo.waybillInfo.deliveryContactUser || "";
          params.deliveryContactPhone =
            item.transInfo.waybillInfo.deliveryContactPhone || "";
          params.deliveryFullAddress =
            item.transInfo.waybillInfo.deliveryFullAddress || "";
          params.expectMileage = item.transInfo.waybillInfo.expectMileage || "";
          params.deliveryTime = item.transInfo.waybillInfo.deliveryTime || null;
          params.pkgNum = item.transInfo.waybillInfo.pkgNum || "";
          params.expectFinishTime =
            item.transInfo.waybillInfo.expectFinishTime || null;
          params.waybillRemark = item.transInfo.waybillInfo.waybillRemark || "";
          params.totalNum = item.transInfo.waybillInfo.totalNum || "";
          params.receiptTime = item.transInfo.receiptInfoVo.receiptTime || null;
          params.receiptRemark =
            item.transInfo.receiptInfoVo.receiptRemark || "";
          params.homeDecorationDemand =
            item.transInfo.receiptInfoVo.homeDecorationDemand || "";
          params.deliveryNotePicList =
            item.transInfo.receiptInfoVo.deliveryNotePicList || [];
          params.afterInstallPicList =
            item.transInfo.receiptInfoVo.afterInstallPicList || [];
          params.evaluationDate = item.evaluationDate || null;
          params.evaluationResult = item.evaluationResult || "";
          params.evaluateRemark = item.transInfo.evaluateRemark || "";
          params.carrierName = item.transInfo.carrierName || "";
          params.driverName = item.transInfo.driverName || "";
          params.driverPhone = item.transInfo.driverPhone || "";
          params.installUserList =
            item.transInfo.installUserList &&
            item.transInfo.installUserList.length > 0
              ? item.transInfo.installUserList
                  .map(item => {
                    return item.realName;
                  })
                  .join(",")
              : "";
          params.plateNo = item.transInfo.plateNo || "";
          params.merchantName = item.transInfo.waybillInfo.merchantName || "";
          return params;
        });
        console.log("list", list);
        this.vehicleData = list;

        this.vehicleisListLoading = false;
      });
    },
    clickRow(row) {
      this.$refs.vehicle.toggleRowSelection(row);
    },
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
    diffChecked(value) {
      this.rowList.map(item => {
        item.checked = item.disabled ? item.checked : false;
        if (value.indexOf(item.prop) > -1) {
          item.checked = true;
        }
      });
    },
    handleCheckedRowChange(value) {
      this.diffChecked(value);
      let checkedCount = value.length;
      this.rowCheckAll =
        checkedCount ===
        this.rowList.filter(res => {
          return !res.disabled;
        }).length;
      this.isRowIndeterminate =
        checkedCount > 0 &&
        checkedCount <
          this.rowList.filter(res => {
            return !res.disabled;
          }).length;
    },
    handleCheckAllRowChange(val) {
      let allChecked = this.rowList
        .filter(res => {
          return !res.disabled || (res.disabled && res.checked);
        })
        .map(item => {
          return item.prop;
        });
      let defaultList = this.rowList
        .filter(res => {
          return res.disabled;
        })
        .map(item => {
          return item.prop;
        });
      this.rowChoosed = val ? allChecked : defaultList;
      this.diffChecked(this.rowChoosed);
      this.isRowIndeterminate = false;
    },
    handleSizeChange(pageSize) {
      this.pagination.pageSize = pageSize;
      this.queryList(this.searchParams);
    },
    clearChoose() {
      this.$refs.vehicle.clearSelection();
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
    handleDetail(row) {
      this.selectedOrderInfo = row;
      this.showDetail = true;
    },
    handleCommont(row) {
      this.selectedOrderInfo = row;
      this.showCommontEva = true;
    },
    closeDetail() {
      this.showDetail = false;
    },
    closeCommont() {
      this.showCommontEva = false;
    },
    handleEvaluate(row) {
      this.selectedOrderInfo = row;
      this.showCreateEva = true;
    },
    starSave() {
      this.showCreateEva = false;
    },
    cancelCreateEva() {
      this.showCreateEva = false;
      this.search(this.searchParams);
    },
    cancelCommontEva() {
      this.showCommontEva = false;
    },
    formatterStatus(status) {
      let result = this.statusList.find(item => {
        return status.toString() == item.value;
      });
      return result ? result.label : "未知";
    },
    formatterOrderType(orderType){
      var msg = "";
      let result = this.orderTypeList.find(item => {
        return orderType == item.value;
      });
      return result ? result.label : "";
    },
    showBtn(method) {
      return this.buttonData.some(item => {
        return item.resourceUrl == method;
      });
    },
    isDealDisabled(row) {
      if (this.$store.getters.roleType.includes("merchant")) {
        if (row.carrierName) {
          return true;
        } else {
          return false;
        }
      } else {
        if (row.carrierName) {
          return false;
        } else {
          return true;
        }
      }
    }
  },
  components: {
    CommonWrapper,
    CommonContent,
    CommonTable,
    Search,
    ChooseInfo,
    Detail,
    Commont,
    Star,
    Create
  }
};
</script>

<style lang="scss" scoped>
.xhe-page {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
}
.order_search {
  margin: 0.5rem 1rem;
  border-bottom: 1px solid #ebeef5;
  .order_search_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      color: var(--color-primary);
      font-size: 16px;
      font-weight: 500;
      border-bottom: 2px solid var(--color-primary);
      padding: 0.5rem 2rem 0.5rem 1rem;
    }
    .el-icon-refresh,
    .el-icon-circle-plus-outline,
    .el-icon-folder-opened {
      font-size: 18px;
    }
  }
}
</style>
<style lang="scss">
.row_list {
  padding: 0px !important;
  .choose_row_list {
    width: 100%;
    height: 100%;
    .head {
      padding: 8px 12px;
      background: #dcdcdc;
      display: flex;
      justify-content: space-between;
    }
    .el-checkbox-group {
      min-height: 100px;
      max-height: 300px;
      overflow: auto;
      padding: 8px 12px;
      label {
        display: block !important;
      }
    }
  }
}
</style>
