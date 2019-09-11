<!--
 * @Description: 配装信息
 * @Author: Calamus
 * @Date: 2019-08-09 15:39:25
 * @LastEditTime: 2019-09-04 09:55:20
 * @LastEditors: Please set LastEditors
 -->
<template>
  <common-content id="order-management" :flex="100">
    <!-- 统计展示 -->
    <!-- <order-stat /> -->
    <!-- 查询 -->
    <search
      class="search"
      @resetPage="resetPage"
      @search="search"
      @rest="rest"
      :merchantList="merchantList"
    />
    <!-- 列表 -->
    <div class="table_container">
      <el-table
        ref="orderTable"
        stripe
        tooltip-effect="light"
        v-loading="isListLoading"
        :data="tableData"
        highlight-current-row
        :cell-style="cellStyle"
      >
        <el-table-column
          type="index"
          :index="indexMethod"
          label="序号"
          width="50"
          fixed="left"
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
            <span v-else-if="item.prop == 'orderType'">
              {{formatterOrderType(scope.row[item.prop])}}
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
          prop="transStatus"
          label="订单状态"
          min-width="150"
          fixed="right"
        >
          <template slot-scope="scope">
            <span>
              {{ formatterStatus(scope.row.transStatus) }}
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
            <el-divider direction="vertical"></el-divider>
            <el-dropdown @command="handleCommand($event, scope.row)">
              <span class="el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  command="track"
                  :disabled="
                    scope.row.transStatus <= 1 || scope.row.transStatus >= 11 || scope.row.orderType == 2
                  "
                  >轨迹</el-dropdown-item
                >
                <el-dropdown-item
                  command="cancel"
                  v-if="showBtn('cancel')"
                  :disabled="scope.row.transStatus > 4"
                  >撤单</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
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
    <!-- 收货单详情 -->
    <a-drawer
      title="详情"
      placement="right"
      width="100%"
      :closable="true"
      wrapClassName="xhe-header-menu"
      getContainer="main"
      @close="closeDetail"
      :visible="isDetailFormVisible"
    >
      <detail :info="selectedOrderInfo" />
    </a-drawer>

    <!-- 收货单新增/编辑 -->
    <a-drawer
      title="轨迹"
      placement="right"
      width="100%"
      :closable="true"
      wrapClassName="xhe-header-menu"
      getContainer="main"
      @close="closeTrackDetail"
      :visible="isTrackFormVisible"
    >
      <div>
        <track-detail :info="selectedOrderInfo" />
      </div>
    </a-drawer>

    <install-cancel
      :show.sync="isCloseFormVisible"
      :checkInfo="selectedOrderInfo"
      @updateTable="search"
    />
  </common-content>
</template>

<script>
import CommonWrapper from "@/components/commonWrapper";
import CommonTable from "@/components/commonTable";
import CommonContent from "@/components/commonContent";
import NavButton from "@/components/navButton";
import Search from "./Components/Search";
import Detail from "./Components/detail";
import TrackDetail from "./Components/trackDetail";
import InstallCancel from "./Components/cancel";
import moment from "moment";
import { setSession, getSession } from "@/utils/session";
import {
  All_Status_List,
  Install_List_Label,
  Order_Appoint_Status_List,
  Order_Type_list
} from "@/utils/ENUM";
import {
  getInstallList,
  delMercure,
  orderClose,
  diyExportLoadingDatail,
  getMerchantsByAssembly
} from "@/api/order";
import { mixins } from "@/mixins";

export default {
  name: "getInstallList",
  mixins: [mixins],
  data() {
    return {
      merchantsList: [],
      tableData: [],
      selectedOrderInfo: {},
      isListLoading: false, // 列表加载
      pagination: {
        // 翻页数据
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      searchParams: {}, // 查询参数
      visible: false,
      isDetailFormVisible: false,
      isTrackFormVisible: false,
      isCloseFormVisible: false,
      statusList: All_Status_List,
      orderTypeList:Order_Type_list,
      isRowIndeterminate: true,
      rowCheckAll: false,
      rowChoosed: [],
      merchantList: [],
      buttonData: [],
      rowList: Install_List_Label.filter(item => {
        return (
          !item.role || item.role.indexOf(this.$store.getters.roleType) >= 0
        );
      })
    };
  },
  mounted() {
    if (!this.$store.getters.roleType.includes("merchant")) {
      this.getMerchantList();
    }
    this.rowChoosed = this.rowList
      .map(item => {
        if (item.checked) {
          return item.prop;
        }
      })
      .filter(item => {
        return item != undefined;
      });
  },
  activated() {
    if (Object.keys(this.$route.params).length > 0) {
      if (this.$route.params.refresh) {
        this.queryList(this.searchParams);
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
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (row.isException == 1 || row.isDException == 1) {
        return "background:#FBFF4F";
      } else {
        return "";
      }
    },
    search(params){
      const searchParams = params
        ? (this.searchParams = params)
        : this.searchParams;
      this.pagination.pageNum = 1
      this.queryList(searchParams)
    },
    // 查询和初始化查询
    queryList(params) {
      this.getOrders({
        ...params,
        ownerId: this.$store.getters.userId,
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      });
    },
    rest(params) {
      const searchParams = (this.searchParams = params);
      this.getOrders({
        ...searchParams,
        ownerId: this.$store.getters.userId,
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      });
    },
    // 列表翻页
    changePage(pageNum) {
      this.pagination.pageNum = pageNum;
      this.queryList(this.searchParams);
    },
    handleSizeChange(pageSize) {
      this.pagination.pageSize = pageSize;
      this.queryList(this.searchParams);
    },
    // 生成列表序号
    indexMethod(index) {
      return (
        index + 1 + (this.pagination.pageNum - 1) * this.pagination.pageSize
      );
    },
    resetPage() {
      this.pagination = {
        // 翻页数据
        pageNum: 1,
        pageSize: 10,
        total: 0
      };
    },
    // 获取收货单列表
    getOrders(params) {
      this.isListLoading = true;
      getInstallList(params).then(res => {
        this.tableData = res.item;
        this.pagination.total = res.total;
        this.isListLoading = false;
      });
    },
    detach(type, params) {
      let submitText = type == "shangjia" ? "批量上架" : "批量下架";
      this.$confirm(`确认${submitText}选中服务吗?`, "提示", {
        type: "warning"
      })
        .then(() => {
          delMercure(params).then(res => {
            if (!res.error) {
              this.$message({
                message: `${submitText}成功`,
                type: "success"
              });
              this.search();
            }
          });
        })
        .catch(() => {});
    },
    handleDetail(data) {
      // this.selectedOrderInfo = data;
      // this.isDetailFormVisible = true;
      this.$router.push({
        path: "/detail/install",
        query: {
          waybillNo: data.waybillNo
        }
      });
    },
    closeDetail() {
      this.isDetailFormVisible = false;
    },
    handleTrackDetail(data) {
      // this.selectedOrderInfo = data;
      // this.isTrackFormVisible = true;
      this.$router.push({
        name: "Transport",
        params: { waybillNo: data.waybillNo }
      });
    },
    closeTrackDetail() {
      this.isTrackFormVisible = false;
      this.isTrackFormVisible = true;
    },
    handleCancel(row) {
      this.isCloseFormVisible = true;
      this.selectedOrderInfo = row;
    },
    handleCommand(command, row) {
      switch (command) {
        // 撤单
        case "cancel":
          this.handleCancel(row);
          break;
        // 轨迹
        case "track":
          this.handleTrackDetail(row);
          break;
      }
    },
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
      params.exportMeta = ["transStatus"];
      let list = this.rowList.filter(res => {
        return res.checked;
      });
      list.map(item => {
        params.exportMeta.push(item.prop);
      });
      diyExportLoadingDatail(params).then(res => {
        // 处理返回的文件流
        const content = res.data;
        const blob = new Blob([content], { type: "application/ms-excel" });
        const fileName =
          typeMsg +
          "导出配装信息" +
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
    },
    formatterStatus(status) {
      var msg = "";
      let result = this.statusList.find(item => {
        return status == item.value;
      });
      return result ? result.label : "";
    },
    formatterAppointStatus(status) {
      var msg = "";
      let result = this.appointstatusList.find(item => {
        return status == item.value;
      });
      return result ? result.label : "";
    },
    timeFormatter(time) {
      if (time) {
        return moment(time).format("YYYY-MM-DD HH:mm");
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
    showBtn(method) {
      return this.buttonData.some(item => {
        return item.resourceUrl == method;
      });
    }
  },
  components: {
    CommonWrapper,
    CommonTable,
    CommonContent,
    NavButton,
    Search,
    InstallCancel,
    Detail,
    TrackDetail
  }
};
</script>

<style lang="scss" scoped>
@keyframes flipOutX {
  from {
    transform: perspective(400px);
  }

  30% {
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    opacity: 1;
  }

  to {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    opacity: 0;
  }
}
@keyframes flipInX {
  from {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }

  40% {
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    animation-timing-function: ease-in;
  }

  60% {
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }

  80% {
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }

  to {
    transform: perspective(400px);
  }
}
.choose_info {
  transition: all 0.2s linear;
  color: var(--color-text);
  .info {
    color: var(--color-primary) !important;
  }
  span:nth-child(2) {
    padding-left: 0.5rem;
  }
  span:nth-child(3) {
    padding-left: 1rem;
    font-size: $base-font-xs;
  }
}
.choose_info.active {
  background-color: var(--color-primary-hover);
  border: 1px solid var(--color-primary);
  border-radius: 5px;
  margin: 1rem 0.6rem;
  padding: 0.3rem 1rem;
  height: auto;
  animation: flipInX 600ms both;
}
.choose_info.hidden {
  animation: flipOutX 600ms both;
  padding: 0;
  height: 0;
  border: none;
  overflow: hidden;
}
.table_container {
  margin: 0.5rem 0.6rem;
}
.status_container {
  .circle_li {
    width: 10px;
    height: 10px;
    border-radius: 10px;
    display: inline-block;
  }
  .circle_li.info {
    background-color: var(--color-info);
  }
  .circle_li.success {
    background-color: var(--color-success);
  }
  .circle_li.warning {
    background-color: var(--color-warning);
  }
}
.el-dropdown {
  color: var(--color-primary) !important;
  font-size: 12px !important;
  font-weight: 500;
}
.xhe-page {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
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
