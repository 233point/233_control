<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 14:33:27
 * @LastEditTime: 2019-09-04 09:52:34
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="distribute">
    <common-wrapper>
      <search
        :merchantList="merchantList"
        @btnSearch="btnSearch"
        @search="search"
        @rest="rest"
      />
    </common-wrapper>
    <el-row class="order_search">
      <el-col :span="24" class="order_search_title">
        <div>
          <span class="title">订单分派</span>
          <el-button
            type="text"
            v-if="showBtn('handleOrderDisOne') || showBtn('handleOrderDis')"
            :disabled="
              !(!chooseMsg && !trusteeshipMsg)
            "
            @click.stop="handleOrderDis"
            >订单派单</el-button
          >
          <!-- <el-divider
            v-if="showBtn('handleOrderDisOne')"
            direction="vertical"
          ></el-divider>
          <el-button
            type="text"
            v-if="showBtn('handleOrderDis')"
            :disabled="!(selectRow.length > 1 && !chooseMsg && !trusteeshipMsg)"
            @click.stop="handleOrderDis"
            >并单派车</el-button
          > -->
          <el-divider
            v-if="showBtn('handleOrderDis')"
            direction="vertical"
          ></el-divider>
          <a
            href="javascript:;"
            v-if="showBtn('handleMap')"
            @click.stop="handleMap"
            >地图派单</a
          >
          <el-divider
            direction="vertical"
            v-if="showBtn('handleCarrier')"
          ></el-divider>
          <el-button
            type="text"
            v-if="showBtn('handleCarrier')"
            :disabled="!(selectRow.length > 0 && !chooseMsg && !trusteeshipMsg)"
            @click.stop="handleCarrier"
            >下发服务商</el-button
          >
        </div>
        <simple-tabs v-model="transStatus" @change="statusChange">
          <tab-item
            :label="item.label"
            v-for="(item, index) in statusList"
            :key="index"
            :value="item.value"
          />
        </simple-tabs>
      </el-col>
    </el-row>
    <choose-info :data="selectRow" @clear="clearChoose" />
    <el-alert
      v-if="chooseMsg"
      :closable="false"
      :title="chooseMsg"
      type="warning"
      show-icon
    ></el-alert>
    <el-alert
      v-if="trusteeshipMsg"
      :closable="false"
      :title="trusteeshipMsg"
      type="warning"
      show-icon
    ></el-alert>

    <el-table
      ref="vehicle"
      highlight-current-row
      tooltip-effect="light"
      v-loading="vehicleisListLoading"
      @row-click="clickRow"
      @selection-change="selected => (selectRow = selected)"
      :data="vehicleData"
    >
      <el-table-column
        type="selection"
        width="50"
        fixed="left"
      ></el-table-column>
      <el-table-column
        type="index"
        :index="indexMethod"
        label="序号"
        width="50"
        fixed="left"
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
          <span v-if="item.prop == 'isElevator'">{{
            scope.row[item.first][item.prop] == "0"
              ? "有"
              : scope.row[item.first][item.prop] == "1"
              ? "无"
              : "未知"
          }}</span>
          <span v-if="item.type == 'date' && !item.level">{{
            timeFormatter(scope.row[item.prop])
          }}</span>
          <span v-else-if="item.type == 'date' && item.level == 2">{{
            timeFormatter(scope.row[item.first][item.prop])
          }}</span>
          <span v-else-if="item.type == 'day' && !item.level">{{
            dateFormatter(scope.row[item.prop])
          }}</span>
          <span v-else-if="item.type == 'day' && item.level == 2">{{
            dateFormatter(scope.row[item.first][item.prop])
          }}</span>
          <span v-else-if="item.prop == 'orderType'">
            {{formatterOrderType(scope.row[item.first][item.prop])}}
          </span>
          <span v-else-if="item.prop == 'trusteeship'">{{
            scope.row[item.prop] == "0" ? "已下发" : "未下发"
          }}</span>
          <span v-else-if="item.prop == 'waitTime'">
            
            <el-popover
              v-if="scope.row.receiveStatus == '2'"
              placement="top"
              trigger="hover"
            >
              <div>司机姓名：{{ scope.row.driverName }}</div>
              <div>司机电话：{{ scope.row.driverPhone }}</div>
              <div>车牌号码：{{ scope.row.plateNo }}</div>
              <div>拒接原因：{{ scope.row.serviceRecordVoList[scope.row.serviceRecordVoList.length-1].refuseRemark }}</div>
              <el-button type="text" slot="reference">{{getWaitTime(scope.row)}}</el-button>
            </el-popover>
            <span v-else>{{getWaitTime(scope.row)}}</span>
          </span>
          <span v-else-if="item.prop == 'transStatus'">
            <el-popover
              v-if="scope.row.transStatus == '1'"
              placement="top"
              trigger="hover"
            >
              <div v-if="scope.row.orderType == 2">
                <div>安装工姓名：{{ scope.row.driverName }}</div>
                <div>安装工电话：{{ scope.row.driverPhone }}</div>
              </div>
              <div v-if="scope.row.orderType == 1">
                <div>司机姓名：{{ scope.row.driverName }}</div>
                <div>司机电话：{{ scope.row.driverPhone }}</div>
                <div>车牌号码：{{ scope.row.plateNo }}</div>
                <div>安装工姓名：{{ scope.row.driverName }}</div>
                <div>安装工电话：{{ scope.row.driverPhone }}</div>
              </div>
              <div v-else>
                <div>司机姓名：{{ scope.row.driverName }}</div>
                <div>司机电话：{{ scope.row.driverPhone }}</div>
                <div>车牌号码：{{ scope.row.plateNo }}</div>
              </div>
              
              <el-button type="text" slot="reference">{{
                transStatusFormatter(scope.row[item.prop])
              }}</el-button>
            </el-popover>
            <span v-else>{{ transStatusFormatter(scope.row[item.prop]) }}</span>
          </span>
          <span
            v-else
            >{{
              item.level == 2
                ? scope.row[item.first][item.prop]
                : scope.row[item.prop]
            }}</span
          >
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
                  >{{ row.label }}</el-checkbox
                >
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
    <el-drawer
      title="订单派车"
      :visible.sync="showOrderDis"
      :wrapperClosable="false"
      size="500"
      direction="rtl"
    >
      <order-dis
        v-if="showOrderDis"
        :isCreate="isCreate"
        :orderInfo="selectRow"
        @cancelOrderDis="cancelOrderDis"
        @updateTable="updateList"
      />
    </el-drawer>
    <el-drawer
      title="下发服务商"
      size="500"
      :visible.sync="showToCarrier"
      :wrapperClosable="false"
      direction="rtl"
    >
      <to-carrier
        v-if="showToCarrier"
        :isCreate="isCreate"
        :orderInfo="selectRow"
        @cancelOrderDis="cancelToCarrier"
        @updateTable="updateList"
      />
    </el-drawer>
    <el-drawer
      title="地图派单"
      size="100%"
      :visible.sync="showMapDis"
      :wrapperClosable="false"
      direction="rtl"
    >
      <map-dis
        v-if="showMapDis"
        :toCarrier="showBtn('handleCarrier')"
        @cancelOrderDis="cancelMap"
        @updateTable="updateList"
      />
    </el-drawer>
    <a-drawer
      title="详情"
      placement="right"
      width="100%"
      :closable="true"
      wrapClassName="xhe-header-menu"
      getContainer="main"
      @close="closeDetail"
      :visible="showMapDetail"
    >
      <div>
        <detail v-if="showMapDetail" :info="selectedOrderInfo" />
      </div>
    </a-drawer>
  </div>
</template>

<script>
import moment from "moment";
import CommonWrapper from "@/components/commonWrapper";
import CommonTable from "@/components/commonTable";
import ChooseInfo from "@/components/chooseInfo";

import Search from "./Components/Search";
import Detail from "./Components/Detail";
import OrderDis from "./Components/OrderDis";
import ToCarrier from "./Components/ToCarrier";
import MapDis from "./Components/MapDis";
import {
  getDistributionWaitList,
  getDeliveryList,
  delDelivery
} from "@/api/distribution";
import { getTransInfoList, getMerchantsByAssembly } from "@/api/order";

import {
  Distribute_Status_List,
  Distribute_List_Label,
  All_Status_List,
  Order_Type_list
} from "@/utils/ENUM";
import { mixins } from "@/mixins";
export default {
  name: "Distribute",
  mixins: [mixins],
  data() {
    return {
      vid: "amap",
      vehicleData: [],
      selectRow: [], // 列表选中列
      waybillTypeList: [],
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
      rowList: Distribute_List_Label.filter(item => {
        return (
          !item.role || item.role.indexOf(this.$store.getters.roleType) >= 0
        );
      }),
      statusList: Distribute_Status_List,
      transStatusList: All_Status_List,
      orderTypeList:Order_Type_list,
      transStatus: "",
      showOrderDis: false,
      showToCarrier: false,
      showMapDis: false,
      showMapDetail: false,
      selectedOrderInfo: {},
      merchantList: [],
      buttonData: [],
      trusteeshipMsg: ""
    };
  },
  mounted() {
    if (!this.$store.getters.roleType.includes("merchant")) {
      this.getMerchantList();
    }
    this.rowList.forEach(item => {
      if (item.checked) {
        this.rowChoosed.push(item.prop);
      }
    });
  },
  watch: {
    selectRow(newVal, oldVal) {
      if (newVal.length) {
        let orders = [],
          trusteeshipOrders = [];
        newVal.forEach(item => {
          console.log(moment().diff(moment(item.deliveryTime)));
          if (
            item.transStatus == "1" &&
            moment().diff(moment(item.deliveryTime)) < 1200000
          ) {
            orders.push(item.waybillNo);
          }
          if (item.trusteeship == "0" && this.showBtn("handleCarrier")) {
            trusteeshipOrders.push(item.waybillNo);
          }
        });
        if (orders.length > 0) {
          this.chooseMsg = `单号${orders.join(
            "、"
          )}已分派司机，请耐心等待接单，您也可以电话联系司机快速接单。`;
        } else {
          this.chooseMsg = "";
        }
        if (trusteeshipOrders.length > 0) {
          this.trusteeshipMsg = `单号${trusteeshipOrders.join(
            "、"
          )}已下发服务商，请耐心等待
          
          。`;
        } else {
          this.trusteeshipMsg = "";
        }
      } else {
        this.chooseMsg = "";
        this.trusteeshipMsg = "";
      }
    }
  },
  methods: {
    async getMerchantList() {
      await getMerchantsByAssembly().then(res => {
        if (!res.error) {
          this.merchantList = res;
        }
      });
    },
    statusChange() {
      if (!this.searchParams.orderType) {
        return;
      }
      this.searchParams.transStatus = this.transStatus;
      this.search(this.searchParams);
    },
    btnSearch(params) {
      this.pagination.pageNum = 1;
      this.search(params);
    },
    updateList() {
      this.search(this.searchParams);
    },
    rest(params) {
      const searchParams = (this.searchParams = params);
      this.queryList(searchParams)
    },
    // 查询和初始化查询
    // 查询/翻页公用方法
    search(params) {
      this.pagination.pageNum = 1 ;
      this.queryList(params);
    },
    queryList(params) {
      const searchParams = (this.searchParams = params);
      this.getDeliveryList({
        ...searchParams,
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
      this.vehicleisListLoading = true;
      getTransInfoList(params).then(res => {
        this.vehicleData = res.item;
        this.pagination.total = res.total;
        this.pagination.pageNum = res.pageNum;
        this.pagination.pageSize = res.pageSize;
        this.vehicleisListLoading = false;
      });
    },
    clickRow(row) {
      this.$refs.vehicle.toggleRowSelection(row);
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
    handleOrderDis() {
      this.selectRow.forEach(item => {
        item.choose = true;
      });
      this.showOrderDis = true;
    },
    cancelOrderDis(update) {
      this.showOrderDis = false;
      if (update) {
        this.updateList();
      }
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
      this.showMapDetail = true;
    },
    closeDetail() {
      this.showMapDetail = false;
    },
    handleCarrier() {
      this.selectRow.forEach(item => {
        item.choose = true;
      });
      this.showToCarrier = true;
    },
    cancelToCarrier(update) {
      this.showToCarrier = false;
      if (update) {
        this.updateList();
      }
    },
    handleMap() {
      this.showMapDis = true;
    },
    cancelMap(update) {
      this.showMapDis = false;
      if (update) {
        this.updateList();
      }
    },
    getWaitTime(row) {
      if (row.transStatus == "1") {
        let waitTime = moment().diff(moment(row.deliveryTime)) / 1000 / 60;
        if (waitTime > 60) {
          let result = moment().diff(moment(row.deliveryTime), "hours");

          // return `<span>${result}小时</span>`
          return `已超时`;
        } else {
          let result = moment().diff(moment(row.deliveryTime), "minutes");
          if (result > 20) {
            return `已超时`;
          } else {
            return result + "分钟";
          }
        }
      } else if (row.receiveStatus == '2'){
        return "司机拒接";
      }
        else {
        return "未派单";
      }
    },
    showBtn(method) {
      return this.buttonData.some(item => {
        return item.resourceUrl == method;
      });
    }
  },
  components: {
    CommonWrapper,
    CommonTable,
    Search,
    OrderDis,
    ChooseInfo,
    Detail,
    ToCarrier,
    MapDis
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
