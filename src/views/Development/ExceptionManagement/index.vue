<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 10:08:32
 * @LastEditTime: 2019-09-04 10:03:24
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="distribute">
    <common-wrapper>
      <search
        :merchantList="merchantList"
        @btnSearch="search"
        @search="search"
        @rest="rest"
      />
    </common-wrapper>
    <el-row class="order_search">
      <el-col :span="24" class="order_search_title">
        <div>
          <span class="title">异常订单</span>
        </div>
        <simple-tabs v-model="abnormalDealStatus" @change="statusChange">
          <tab-item
            :label="item.label"
            v-for="(item, index) in statusList"
            :key="index"
            :value="item.value"
          />
        </simple-tabs>
      </el-col>
    </el-row>

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
        v-for="item in rowList.filter(res => {
          return res.checked;
        })"
        :key="item.prop"
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
          <span v-else-if="item.type == 'date'">{{
            timeFormatter(scope.row[item.prop])
          }}</span>
          <span v-else-if="item.type == 'day'">{{
            dateFormatter(scope.row[item.prop])
          }}</span>
          <span v-else-if="item.prop == 'orderType'">
            {{formatterOrderType(scope.row[item.prop])}}
          </span>
          <span v-else-if="item.prop == 'trusteeship'">
            {{ scope.row[item.prop] == "0" ? "已下发" : "未下发" }}
          </span>
          <span v-else-if="item.prop == 'abnormalDealStatus'">
            <span
              :class="
                scope.row[item.prop] == '0'
                  ? 'primary_color'
                  : scope.row[item.prop] == '1'
                  ? 'success_color'
                  : ''
              "
              >{{
                scope.row[item.prop] == "0"
                  ? "● 待处理"
                  : scope.row[item.prop] == "1"
                  ? "● 已处理"
                  : "未知"
              }}</span
            >
          </span>
          <span v-else-if="item.prop == 'transStatus'">
            <el-popover
              v-if="
                scope.row.transStatus == '1' && scope.row.trusteeship !== '0'
              "
              placement="top"
              trigger="hover"
            >
              <div>司机姓名：{{ scope.row.driverName }}</div>
              <div>司机电话：{{ scope.row.driverPhone }}</div>
              <div>车牌号码：{{ scope.row.plateNo }}</div>
              <el-button type="text" slot="reference">{{
                transStatusFormatter(scope.row[item.prop])
              }}</el-button>
            </el-popover>
            <span v-else>{{ transStatusFormatter(scope.row[item.prop]) }}</span>
          </span>
          <span v-else>{{ scope.row[item.prop] }}</span>
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
                  v-for="row in rowList"
                  :label="row.prop"
                  :key="row.prop"
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
            v-if="
              scope.row.abnormalDealStatus == '0' &&
                showBtn('handleDealException') &&
                !isDealDisabled(scope.row)
            "
            direction="vertical"
          ></el-divider>
          <el-button
            size="mini"
            type="text"
            v-if="
              scope.row.abnormalDealStatus == '0' &&
                showBtn('handleDealException') &&
                !isDealDisabled(scope.row)
            "
            @click.stop="handleDealException(scope.row)"
            >处理</el-button
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
      <div v-if="showBtn('handleExport')">
        <el-dropdown @command="handleExport($event)">
          <a href="javascript:;" style="font-size:12px;">
            导出<i class="el-icon-arrow-down el-icon--right"></i>
          </a>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="current">当前页</el-dropdown-item>
            <el-dropdown-item command="all">所有</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <a-drawer
      title="详情"
      placement="right"
      width="100%"
      :closable="true"
      wrapClassName="xhe-header-menu"
      getContainer="main"
      @close="closeDetail"
      :visible="showDetail"
    >
      <div>
        <detail :info="selectedOrderInfo" />
      </div>
    </a-drawer>
    <el-drawer
      v-if="showDealException"
      size="500"
      title="异常处理"
      :visible.sync="showDealException"
      :wrapperClosable="false"
      direction="rtl"
    >
      <deal
        :exception="selectedOrderInfo"
        @cancelDeal="cancelDeal"
        @updateTable="search"
      />
    </el-drawer>
  </div>
</template>

<script>
import moment from "moment";
import CommonWrapper from "@/components/commonWrapper";
import CommonTable from "@/components/commonTable";
import ChooseInfo from "@/components/chooseInfo";
import { mixins } from "@/mixins";
import Search from "./Components/Search";
import Deal from "./Components/Deal";
import Detail from "../Distribute/Components/Detail";
import {
  getDistributionWaitList,
  getDeliveryList,
  delDelivery
} from "@/api/distribution";
import {
  getAbnormalList,
  getMerchantsByAssembly,
  diyExportAbnormalInfoDatail
} from "@/api/order";

import {
  Order_Status_List,
  Abnormal_Status_List,
  Abnormal_List_Label,
  All_Status_List,
  Order_Type_list
} from "@/utils/ENUM";
import { getInstallDetail } from "@/api/datareport";

export default {
  name: "ExceptionManagement",
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
      orderTypeList:Order_Type_list,
      rowList: Abnormal_List_Label.filter(item => {
        return (
          !item.role || item.role.indexOf(this.$store.getters.roleType) >= 0
        );
      }),
      statusList: Abnormal_Status_List,
      transStatusList: All_Status_List,
      abnormalDealStatus: "",
      showDealException: false,
      showDetail: false,
      selectedOrderInfo: {},
      merchantList: [],
      buttonData: []
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
  methods: {
    async getMerchantList() {
      await getMerchantsByAssembly().then(res => {
        if (!res.error) {
          this.merchantList = res;
        }
      });
    },
    statusChange() {
      if (!this.searchParams.billType) {
        return;
      }
      this.searchParams.abnormalDealStatus = this.abnormalDealStatus;
      this.search(this.searchParams);
    },
    // 查询和初始化查询
    // 查询/翻页公用方法
    search(params) {
      this.pagination.pageNum = 1 ;
      const searchParams = params
        ? (this.searchParams = params)
        : this.searchParams;
      this.queryList(params);
    },
    rest(params) {
      this.pagination.pageNum = 1 ;
      const searchParams = params
        ? (this.searchParams = params)
        : this.searchParams;
      this.queryList(params);
    },
    queryList(params) {
      this.getDeliveryList({
        ...params,
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
      getAbnormalList(params).then(res => {
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
    //获取订单详情
    getInstallDetail(params) {
      return new Promise((resolve, reject) => {
        getInstallDetail(params).then(res => {
          if (!res.error) {
            resolve(res);
          }
        });
      });
    },
    async handleDetail(row) {
      let res = await this.getInstallDetail({ waybillNo: row.waybillNo });
      this.selectedOrderInfo = res;
      this.showDetail = true;
    },
    closeDetail() {
      this.showDetail = false;
    },
    async handleDealException(row) {
      let res = await this.getInstallDetail({ waybillNo: row.waybillNo });
      this.selectedOrderInfo = res;
      this.showDealException = true;
    },
    cancelDeal() {
      this.showDealException = false;
    },
    //导出
    handleExport(command) {
      switch (command) {
        case "current":
          this.handleExportOrder("current");
          break;
        case "all":
          this.handleExportOrder("all");
          break;
      }
    },
    showBtn(method) {
      return this.buttonData.some(item => {
        return item.resourceUrl == method;
      });
    },
    isDealDisabled(row) {
      if (this.$store.getters.roleType.includes("merchant")) {
        if (row.carrierId) {
          return true;
        } else {
          return false;
        }
      } else {
        if (row.carrierId) {
          return false;
        } else {
          return true;
        }
      }
    },
    handleExportOrder(type) {
      let typeMsg =
        type == "current" ? "第" + this.pagination.pageNum + "页" : "全部";
      var params = this.searchParams;
      if (type == "current") {
        params.dataRange = "currentPage";
        params.pageNum = this.pagination.pageNum;
        params.pageSize = this.pagination.pageSize;
      } else {
        params.dataRange = "all";
      }
      params.exportMeta = [];
      let list = this.rowList.filter(res => {
        return res.checked;
      });
      list.map(item => {
        params.exportMeta.push(item.prop);
      });
      diyExportAbnormalInfoDatail(params).then(res => {
        // 处理返回的文件流
        const content = res.data;
        const blob = new Blob([content], { type: "application/ms-excel" });
        const fileName =
          typeMsg +
          "导出异常订单" +
          moment(new Date()).format("YYYYMMDD") +
          ".xls";
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
    }
  },
  components: {
    CommonWrapper,
    CommonTable,
    Search,
    ChooseInfo,
    Deal,
    Detail
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
