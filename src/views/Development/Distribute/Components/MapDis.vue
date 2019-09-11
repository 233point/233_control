<template>
  <div class="distribute">
    <div class="distribute_left">
      <el-form :model="searchParams">
        <el-form-item label="预约日期">
          <el-date-picker
            @change="queryList"
            v-model="searchParams.startDate"
            placeholder="开始日期"
            :picker-options="pickerOptionsStart"
            size="mini"
          >
          </el-date-picker>
          <el-date-picker
            @change="queryList"
            v-model="searchParams.endDate"
            placeholder="结束日期"
            :picker-options="pickerOptionsEnd"
            size="mini"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>

      <span style="margin-right: 20px;">待分配订单池</span>
      <el-button
        type="primary"
        size="mini"
        class="disBtn"
        @click="handleOrderDis"
        :disabled="trusteeshipMsg || chooseMsg || selectRow.length < 1"
        >分配</el-button
      >
      <choose-info :data="selectRow" @clear="clearChoose" />
      <el-alert
        v-if="chooseMsg"
        :closable="false"
        :title="chooseMsg"
        type="warning"
        show-icon
      >
      </el-alert>
      <el-alert
        v-if="trusteeshipMsg"
        :closable="false"
        :title="trusteeshipMsg"
        type="warning"
        show-icon
      >
      </el-alert>
      <div style="height:calc(100vh - 320px);">
        <el-table
          height="100%"
          ref="vehicle"
          highlight-current-row
          v-loading="vehicleisListLoading"
          @row-click="clickRow"
          @selection-change="selected => (selectRow = selected)"
          :data="vehicleData"
        >
          <el-table-column type="selection" width="30"></el-table-column>
          <el-table-column
            type="index"
            :index="indexMethod"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column label="类型" prop="orderType">
            <template slot-scope="scope">
              <span v-if="scope.row.waybillInfo">
                {{formatterOrderType(scope.row.waybillInfo.orderType)}}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="客户姓名" prop="customerName">
            <template slot-scope="scope">
              <span v-if="scope.row.waybillInfo">{{
                scope.row.waybillInfo.customerName
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="预约时间" prop="appointTime">
            <template slot-scope="scope">
              <span v-if="scope.row.waybillInfo">{{
                timeFormatter(scope.row.waybillInfo.appointTime)
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="transStatus">
            <template slot-scope="scope">
              <span :class="scope.row.transStatus == '0' ? 'fenpai' : 'jiedan'"
                >●{{ transStatusFormatter(scope.row.transStatus) }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="等待时间">
            <template slot-scope="scope"><el-popover
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
            <span v-else>{{getWaitTime(scope.row)}}</span></template>
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
      </div>
    </div>
    <div class="distribute_right">
      <div class="distributeMap">
        <g-map
          :vid="vid"
          :flex="100"
          :firstMarkers="customerMarker"
          :firstMarkerStyle="customerMarkerStyle"
          :chooseArea="false"
          :searchArea="false"
          :showCenter="false"
        />
      </div>
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
        @updateTable="queryList"
      />
    </el-drawer>
  </div>
</template>

<script>
import moment from "moment";
import GMap from "@/components/gMap";
import CommonWrapper from "@/components/commonWrapper";
import ChooseInfo from "@/components/chooseInfo";
import OrderDis from "./OrderDis";
import { getTransInfoList } from "@/api/order";

import { All_Status_List,Order_Type_list } from "@/utils/ENUM";
export default {
  name: "MapDis",
  data() {
    return {
      vid: "amap",
      customerMarker: [],
      selectRow: [],
      orderTypeList:Order_Type_list,
      pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.searchParams.endDate;
          if (endDateVal) {
            return time.getTime() >= new Date(endDateVal).getTime();
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.searchParams.startDate;
          if (beginDateVal) {
            return time.getTime() < new Date(beginDateVal).getTime();
          }
        }
      },
      customerMarkerStyle: {
        name:
          "position: absolute;color: #fff;top: 3px;width: 28px;text-align: center;font-size: 18px;",
        title:
          "position:absolute;border:1px solid;background:#fff;text-align:center;font-size:12px;left:50%;transform:translate(-50%,0);word-break:keep-all;white-space: nowrap;"
      },
      vehicleData: [],
      searchParams: {
        startDate: null,
        endData: null,
        billType: "0",
        waybillNo: "",
        dateType: "0",
        transStatus: "",
        carrierId: "",
        merchantId: ""
      },
      orderInfo: {},
      isCreate: true,
      vehicleisListLoading: false,
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      chooseMsg: "",
      showOrderDis: false,
      trusteeshipMsg: "",
      transStatusList: All_Status_List,
    };
  },
  mounted() {
    if (this.$store.getters.roleType.includes("merchant")) {
      this.searchParams.merchantId = this.$store.getters.userId;
    } else {
      this.searchParams.carrierId = this.$store.getters.userId;
    }
    this.queryList();
  },
  watch: {
    selectRow(newVal, oldVal) {
      if (newVal.length) {
        let orders = [],
          trusteeshipOrders = [];
        newVal.forEach(item => {
          if (moment().diff(moment(item.deliveryTime)) < 1200000 && item.transStatus == '1') {
            orders.push(item.waybillNo);
          }
          if (item.trusteeship == "0" && this.toCarrier) {
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
  props: {
    toCarrier: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 查询和初始化查询
    // 查询/翻页公用方法
    queryList() {
      this.getDeliveryList({
        ...this.searchParams,
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
        this.vehicleisListLoading = false;
        if (!res.error) {
          // for(let i=0;i<30;i++){
          //   this.vehicleData.push(res.item)
          // }
          this.vehicleData = res.item;
          this.pagination.total = res.total;
          this.pagination.pageNum = res.pageNum;
          this.pagination.pageSize = res.pageSize;

          this.customerMarker = [];
          let allMarkers = [];
          res.item.forEach((item, index) => {
            item.index = index + 1;
            if (
              item.waybillInfo &&
              item.waybillInfo.pointInfo &&
              item.waybillInfo.pointInfo.lat &&
              item.waybillInfo.pointInfo.lng
            ) {
              allMarkers.push({
                id: item.id,
                poi: [
                  item.waybillInfo.pointInfo.lng,
                  item.waybillInfo.pointInfo.lat
                ],
                name: index + 1 + "",
                title: item.waybillInfo.customerName,
                address: item.waybillInfo.fullAddress,
                info: [{ ...item, name: index + 1 + "" }]
              });
            }
          });
          let messageList = [];
          for (let i = 0; i < allMarkers.length; i++) {
            for (let j = i + 1; j < allMarkers.length; j++) {
              if (
                allMarkers[i].poi[0] === allMarkers[j].poi[0] &&
                allMarkers[i].poi[1] === allMarkers[j].poi[1] &&
                allMarkers[i].id != allMarkers[j].id
              ) {
                allMarkers[i].info = allMarkers[i].info.concat(
                  allMarkers[j].info
                );
              }
            }
          }
          let self = this;
          setTimeout(function() {
            self.customerMarker = [].concat(allMarkers);
          }, 100);
        }
      });
    },
    handleSizeChange(pageSize) {
      this.pagination.pageSize = pageSize;
      this.queryList();
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
    formatterOrderType(orderType){
      var msg = "";
      let result = this.orderTypeList.find(item => {
        return orderType == item.value;
      });
      return result ? result.label : "";
    },
    clearChoose() {
      this.$refs.vehicle.clearSelection();
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
        this.queryList();
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
    }
  },
  components: {
    GMap,
    CommonWrapper,
    ChooseInfo,
    OrderDis
  }
};
</script>

<style lang="scss" scoped>
.distributeMap {
  height: calc(100vh - 100px);
}
.jiedan {
  color: #0066ff;
}
.fenpai {
  color: #fe5500;
}
.distribute {
  height: 100%;
  padding: 0 20px;
  display: flex;
  .distribute_left {
    flex: 0 0 650px;
    margin-right: 15px;
  }
  .distribute_right {
    flex: 1 1 auto;
  }
  .xhe-page {
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
  }
  .disBtn {
    width: calc(100% - 100px);
  }
}
</style>
