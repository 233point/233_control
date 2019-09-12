<!--
 * @Description: In User Settings Edit
 * @Author: Calamus
 * @Date: 2019-08-09 15:39:25
 * @LastEditTime: 2019-09-04 09:41:39
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
      @add="handleAdd"
      @cancel="handleCancel"
      @print="handleDatchPrint"
      @import="handleImport"
      @toCarrier="toCarrier"
      :buttonData="buttonData"
      :merchantList="merchantList"
      :upLen="upLen"
      :choose="selectRow"
      :chooseMsg="chooseMsg"
    />
    <!-- 选择的操作 -->
    <!-- <choose-info
      :data="selectRow"
      :chooseMsg="chooseMsg"
      @clear="clearChoose"
    /> -->
    <el-alert
      v-if="chooseMsg && showBtn('toCarrier')"
      :closable="false"
      :title="chooseMsg"
      type="warning"
      show-icon
    ></el-alert>

    <el-alert
      style="margin-top:5px;"
      v-if="chooseCancelMsg && showBtn('cancel')"
      :closable="false"
      :title="chooseCancelMsg"
      type="warning"
      show-icon
    ></el-alert>
    <!-- 列表 -->
    <div class="table_container">

      <el-table
        ref="orderTable"
        stripe
        tooltip-effect="light"
        v-loading="isListLoading"
        :data="tableData"
        highlight-current-row
        @selection-change="handleSelectChange"
        :cell-style="cellStyle"
      >
        <el-table-column type="selection" width="50"></el-table-column>
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
          :fixed="item.fixed"
          :label="item.label"
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
          prop="status"
          label="订单状态"
          min-width="150"
          fixed="right"
        >
          <template slot-scope="scope">
            <!-- <el-popover placement="left"
                        width="250"
                        trigger="hover">
              <div>
                <ul>
                  <li><b>预约状态:</b>{{formatterAppointStatus(scope.row.appointStatus)}}</li>
                </ul>
              </div>
              <div class="status_container"
                   slot="reference"> -->
            <span>
              {{ formatterStatus(scope.row.status) }}
            </span>
            <!-- </div>
            </el-popover> -->
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
            <el-button
              size="mini"
              type="text"
              v-if="showBtn('handleEdit')"
              :disabled="
                scope.row.status == 1 ||
                  scope.row.status == 3 ||
                  scope.row.status == 5 ||
                  scope.row.carrierId
              "
              @click.stop="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-divider
              v-if="showBtn('handleEdit')"
              direction="vertical"
            ></el-divider>
            <el-dropdown @command="handleCommand($event, scope.row)">
              <span class="el-dropdown-link">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  command="cancel"
                  :disabled="scope.row.status != 0"
                  v-if="showBtn('cancel')"
                  >取消订单</el-dropdown-item
                >
                <el-dropdown-item command="print">打印</el-dropdown-item>
                <el-dropdown-item 
                 v-if="showBtn('install')"
                :disabled="!((scope.row.status == 1 || scope.row.status == 3 ) && scope.row.orderType == 0 )"                
                                  command="install"
                                  >转安装单</el-dropdown-item>
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
        <div v-if="showBtn('handleExportOut')">
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
      title="详情"
      placement="right"
      width="100%"
      :closable="true"
      wrapClassName="xhe-header-menu"
      getContainer="main"
      @close="closeDetail"
      :visible="isDetailFormVisible"
    >
      <div>
        <detail :info="selectedOrderInfo" />
      </div>
    </a-drawer>

    <a-drawer
      :title="isCreate ? '创建订单' : '编辑订单'"
      placement="right"
      width="100%"
      :closable="true"
      wrapClassName="xhe-header-menu"
      getContainer="main"
      @close="closeCreateAndEdit"
      :visible="isCreateFormVisible"
    >
      <div>
        <order-add
          v-if="isCreateFormVisible && isCreate"
          :merchantList="merchantList"
          @cancel="cancelAddOrEdit"
        />
        <order-edit
          :info="selectedOrderInfo"
          :merchantList="merchantList"
          v-if="isCreateFormVisible && !isCreate"
          @cancel="cancelAddOrEdit"
        />
      </div>
    </a-drawer>
    <!-- pdf预览 -->
    <pdf-view
      :show.sync="showPdfDialog"
      :pdfUrl="pdfUrl"
      :downloadUrl="downloadUrl"
      :showDownload="showDownload"
    />
    <!-- 导入订单 -->
    <order-upload
      :merchantList="merchantList"
      :show.sync="importVisible"
      @updateList="receiveUpload"
    />
    <!-- 打印 -->
    <order-print
      :show.sync="isPrintFormVisible"
      :selectedOrderlist="printList"
    />
    <el-drawer
      title="下发服务商"
      size="500"
      :visible.sync="showToCarrier"
      :wrapperClosable="false"
      direction="rtl"
    >
      <to-carrier
        v-if="showToCarrier"
        :orderInfo="selectRow"
        @cancelOrderDis="cancelToCarrier"
        @updateTable="receiveUpload"
      />
    </el-drawer>
  </common-content>
</template>

<script>
import CommonWrapper from "@/components/commonWrapper";
import CommonTable from "@/components/commonTable";
import CommonContent from "@/components/commonContent";
import ChooseInfo from "@/components/chooseInfo";
import NavButton from "@/components/navButton";
import PdfView from "@/components/pdfView";
import Search from "./Components/Search";
import OrderStat from "./Components/stat";
import OrderUpload from "./Components/upload";
import Detail from "./Components/detail";
import OrderAdd from "./Components/create";
import OrderEdit from "./Components/edit";
import OrderPrint from "./Components/print";
import ChangeLog from "./Components/log";
import ToCarrier from "./Components/ToCarrier";
import moment from "moment";
import { setSession, getSession } from "@/utils/session";
import {
  Order_Status_List,
  Order_List_Label,
  Order_Appoint_Status_List,
  Order_Type_list
} from "@/utils/ENUM";
import {
  orderList,
  delMercure,
  orderClose,
  diyExportWaybillDatail,
  getMerchantsByAssembly,
  updateOrder
} from "@/api/order";
import { mixins } from "@/mixins";

export default {
  name: "orderList",
  mixins: [mixins],
  data() {
    return {
      merchantsList: [],
      brandList: [],
      modelBrand: [],
      modelList: [],
      tableData: [],
      selectRow: [], // 列表选中列
      selectedOrderInfo: {},
      printList: [],
      message: "",
      isListLoading: false, // 列表加载
      pagination: {
        // 翻页数据
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      searchParams: {}, // 查询参数
      isPrintFormVisible: false,
      isCreateFormVisible: false,
      visible: false,
      isDetailFormVisible: false,
      isUpdateFormVisible: false,
      importVisible: false,
      isCreate: true,
      flag: 2,
      statusList: Order_Status_List,
      appointstatusList: Order_Appoint_Status_List,
      orderTypeList:Order_Type_list,
      chooseMsg: "",
      chooseCancelMsg:"",
      upLen: true,
      showPdfDialog: false,
      pdfUrl:
        "http://others.calamus.xyz/%E6%A2%81%E7%B4%A0%E5%A8%85-13572115470.pdf",
      downloadUrl:
        "http://others.calamus.xyz/%E6%A2%81%E7%B4%A0%E5%A8%85-13572115470.pdf",
      showDownload: true,
      isRowIndeterminate: true,
      rowCheckAll: false,
      rowChoosed: [],
      rowList: Order_List_Label.filter(item => {
        return (
          !item.role || item.role.indexOf(this.$store.getters.roleType) >= 0
        );
      }),
      merchantList: [],
      buttonData: [],
      showToCarrier:false
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
  activated() {
    if (Object.keys(this.$route.params).length > 0) {
      if (this.$route.params.refresh) {
        this.search(this.searchParams);
      }
    }
  },
  destroyed() {
    console.log("goout", this.$route);
  },
  watch: {
    selectRow(newVal, oldVal) {
      if (newVal.length) {
        let orders = []
        newVal.forEach(item => {
          if (item.status != "0") {
            orders.push(item.waybillNo);
          }
        });
        if (orders.length > 0) {
          this.chooseMsg = `单号${orders.join(
            "、"
          )}已预约，不能下发服务商`;
        } else {
          this.chooseMsg = "";
        }
      } else {
        this.chooseMsg = "";
      }
    }
  },
  computed: {
    isButtonIsDisabled() {
      this.flag = 2;
      if (this.selectRow.length) {
        try {
          this.selectRow.forEach(item => {
            if (item.goodsReceviceAuditing == "2") {
              this.flag = 1;
              throw new Error("selectErr");
            } else {
              this.flag = 0;
            }
          });
        } catch (e) {
          if (e.message != "selectErr") throw e;
        }
      } else {
        this.flag = 2;
      }
      if (this.flag == 0) {
        return false;
      } else {
        return true;
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
    toCarrier(){
      this.selectRow.forEach(item => {
        item.choose = true;
      });
      this.showToCarrier = true;
    },
    cancelToCarrier(update) {
      this.showToCarrier = false;
      if (update) {
        this.receiveUpload();
      }
    },
    search(params){
      this.pagination.pageNum = 1
      this.queryList(params)
    },
    // 查询和初始化查询
    queryList(params) {
      const searchParams = (this.searchParams = params);
      this.getOrders({
        ...searchParams,
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      });
    },
    rest(params) {
      const searchParams = (this.searchParams = params);
      this.getOrders({
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
    handleSizeChange(pageSize) {
      this.pagination.pageSize = pageSize;
      this.queryList(this.searchParams);
    },
    clearChoose() {
      this.$refs.orderTable.clearSelection();
    },
    handleSelectChange(selected) {
      this.selectRow = selected;
      this.upLen =
        selected.length > 0 &&
        selected.filter(item => {
          return item.status != 0;
        }).length == 0;
      if (!this.upLen && selected.length > 0) {
        this.chooseCancelMsg = "注意:仅待预约的订单可以进行订单取消操作";
      } else {
        this.chooseCancelMsg = "";
      }
    },
    clearSelected() {
      this.$refs.orderTable.clearSelection();
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
    updateTable() {
      this.search(this.searchParams);
    },
    // 获取收货单列表
    getOrders(params) {
      this.isListLoading = true;
      orderList(params).then(res => {
        this.tableData = res.item;
        this.pagination.total = res.total;
        this.isListLoading = false;
      });
    },
    cancelAddOrEdit() {
      this.search(this.searchParams);
      this.isCreateFormVisible = false;
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
              this.updateTable();
            }
          });
        })
        .catch(() => {});
    },
    handleDetachOn() {
      let params = {
        opType: "shangjia",
        productIds: this.selectRow.map(item => {
          return item.id;
        })
      };
      this.detach("shangjia", params);
    },

    handleDetachDown() {
      let params = {
        opType: "xiajia",
        productIds: this.selectRow.map(item => {
          return item.id;
        })
      };
      this.detach("xiajia", params);
    },
    handleDel(row) {
      this.$confirm("确认删除选中的服务吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          delMercure({ id: row.id }).then(res => {
            if (!res.error) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.updateTable();
            }
          });
        })
        .catch(() => {});
    },
    handleDetail(data) {
      this.selectedOrderInfo = data;
      this.isDetailFormVisible = true;
    },
    closeDetail() {
      this.isDetailFormVisible = false;
    },
    closeCreateAndEdit() {
      this.isCreateFormVisible = false;
      this.isCreate = false;
      this.selectedOrderInfo = {};
    },
    handleAdd() {
      this.isCreateFormVisible = true;
      this.isCreate = true;
    },
    handleEdit(row) {
      this.selectedOrderInfo = row;
      this.$nextTick(() => {
        this.isCreateFormVisible = true;
      });
      this.isCreate = false;
    },
    handlePdf(row) {
      this.showPdfDialog = true;
    },
    handleRevoke(row) {
      let mseeage =
        row.productStatus == "1"
          ? `订单：${row.productStatus} 已分配服务师傅 ${row.productStatus},电话 ${row.productStatus},`
          : "";
      // 撤单
      this.$confirm(mseeage + "确认进行撤单操作吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          delMercure({ id: row.id }).then(res => {
            if (!res.error) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.updateTable();
            }
          });
        })
        .catch(() => {});
    },
    handleClose(row) {
      // 关闭
      this.$confirm("确认关闭该订单吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          delMercure({ id: row.id }).then(res => {
            if (!res.error) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.updateTable();
            }
          });
        })
        .catch(() => {});
    },
    handleImport() {
      this.importVisible = true;
    },
    receiveUpload() {
      this.search(this.searchParams);
    },
    handleInstall(row, type){
      let params = JSON.parse(JSON.stringify(row))
      params.orderType = 2;
      params.deliveryContactUser ='';
      params.deliveryContactPhone = '';
      params.deliveryAddress = '';
      params.deliverySelectCity = '';
      params.deliveryselectCityCode = [];
      params.deliveryLat = '';
      params.deliveryLng = '';
      this.$confirm(`确定要将该运单转安装单吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(()=>{
        updateOrder(params).then(res => {
          if (!res.error) {
            this.$message({
              message: "转安装单成功！",
              type: "success"
            });
            this.search(this.searchParams);
          }
        });
      })
    },
    handleCancel(row, type) {
      this.$confirm(`确定要取消该订单吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (type == "single") {
            let ids = [];
            ids.push(row.id);
            if (ids.length > 0) {
              orderClose(ids).then(res => {
                if (!res.error) {
                  this.$message({
                    message: "订单取消成功",
                    type: "success"
                  });
                  this.search(this.searchParams);
                }
              });
            }
          } else {
            let ids = [];
            this.selectRow.map(item => {
              ids.push(item.id);
            });
            if (ids.length > 0) {
              orderClose(ids).then(res => {
                if (!res.error) {
                  this.$message({
                    message: "订单批量取消成功",
                    type: "success"
                  });
                  this.search(this.searchParams);
                }
              });
            }
          }
        })
        .catch(() => {});
    },
    handleDatchPrint() {
      if (this.selectRow.length > 0) {
        this.isPrintFormVisible = true;
        this.printList = this.selectRow.concat([]);
      } else {
        this.$message({
          message: "请选择要打印的订单",
          type: "warning"
        });
      }
    },
    handlePrint(row) {
      this.isPrintFormVisible = true;
      this.printList = [];
      this.printList.push(row);
    },
    handleCommand(command, row) {
      switch (command) {
        case "cancel":
          this.handleCancel(row, "single");
          break;
        case "print":
          this.handlePrint(row);
          break;
        case "Revoke":
          this.handleRevoke(row);
          break;
        case "pdf":
          this.handlePdf(row);
          break;
        case "close":
          this.handleClose(row);
          break;
        case "del":
          this.handleDel(row);
        case "install":
          this.handleInstall(row);
          break;
      }
    },
    handleExport(command) {
      console.log("common", command);
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
      params.exportMeta = [];
      let list = this.rowList.filter(res => {
        return res.checked;
      });
      list.map(item => {
        params.exportMeta.push(item.prop);
      });
      console.log("params", params);
      diyExportWaybillDatail(params).then(res => {
        // 处理返回的文件流
        const content = res.data;
        const blob = new Blob([content], { type: "application/ms-excel" });
        const fileName =
          typeMsg + "导出订单" + moment(new Date()).format("YYYYMMDD") + ".xls";
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
        return moment(time).format("YYYY-MM-DD HH:00");
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
      console.log("val", value);
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
    ChooseInfo,
    NavButton,
    PdfView,
    Search,
    OrderStat,
    OrderUpload,
    Detail,
    ChangeLog,
    OrderAdd,
    OrderEdit,
    OrderPrint,
    ToCarrier
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
    font-size: 12px;
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
