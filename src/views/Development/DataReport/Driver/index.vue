<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 10:08:32
 * @LastEditTime: 2019-08-16 14:57:23
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="distribute">
    <common-wrapper>
      <search
        @search="queryList"
        @tipsChange="tipsChange"
        @exportExcel="exportExcel"
        :merchantList="merchantList"
        :driverList="driverList"
      />
    </common-wrapper>
    <el-row class="order_search">
      <el-col :span="24" class="order_search_title">
        <div>
          <span class="title">司机统计</span>
        </div>
      </el-col>
    </el-row>
    <carrier
      v-if="$store.getters.roleType != 'merchant'"
      :tipsShow="tipsShow"
      :tableData="vehicleData"
      @gotoMerchant="gotoMerchant"
    />
    <merchant
      v-if="$store.getters.roleType == 'merchant'"
      @exportExcel="exportExcel"
      :tipsShow="tipsShow"
      :fromCarrier="false"
      :tableData="merchantData"
    />
    <el-drawer
      title="司机统计"
      size="100%"
      :visible.sync="showMerchant"
      :wrapperClosable="false"
      direction="rtl"
    >
      <merchant
        v-if="showMerchant"
        @exportExcel="exportExcel"
        :tipsShow="tipsShow"
        :fromCarrier="true"
        :tableData="merchantData"
        :selectInfo="selectInfo"
      />
    </el-drawer>
  </div>
</template>

<script>
import moment from "moment";
import CommonWrapper from "@/components/commonWrapper";
import CommonTable from "@/components/commonTable";

import Search from "./Components/Search";
import Carrier from "./Components/Carrier";
import Merchant from "./Components/Merchant";

import { getMerchantsByAssembly } from "@/api/order";

import {
  busWaybillLoading,
  driverWaybillLoadingExport,
  driverIdList
} from "@/api/datareport";

export default {
  name: "Exception",
  data() {
    return {
      vehicleData: [],
      merchantData: [],
      vehicleisListLoading: false,
      searchParams: {},
      merchantList: [],
      showMerchant: false,
      searchParams: {},
      tipsShow: false,
      selectInfo: {},
      driverList:[]
    };
  },
  mounted() {
    if (!this.$store.getters.roleType.includes("merchant")) {
      this.getMerchantList();
    }
    this.getDriverList()
  },
  methods: {
    getDriverList(){
      driverIdList({}).then(res => {
        if(!res.error){
          this.driverList = res
        }
      })
    },
    async getMerchantList() {
      await getMerchantsByAssembly().then(res => {
        if (!res.error) {
          this.merchantList = res;
        }
      });
    },
    queryList(params, type, merchantid) {
      this.searchParams = params;
      if (
        type == "merchant" ||
        this.$store.getters.roleType.includes("merchant")
      ) {
        if (!this.$store.getters.roleType.includes("merchant")) {
          params.merchantid = merchantid;
        }
        this.waybillStatOfMerchant(params);
      } else {
        this.waybillStatOfCarrier(params);
      }
    },
    //服务商
    waybillStatOfCarrier(params) {
      busWaybillLoading(params).then(res => {
        if (!res.error) {
          this.vehicleData = res;
        }
      });
    },
    //商户
    waybillStatOfMerchant(params) {
      busWaybillLoading(params).then(res => {
        if (!res.error) {
          this.merchantData = res;
        }
      });
    },
    gotoMerchant(row) {
      this.queryList(this.searchParams, "merchant", row.merchantid);
      this.selectInfo = row;
      this.showMerchant = true;
    },
    tipsChange(value) {
      this.tipsShow = value;
    },
    exportExcel(type,merchantid) {
      let params = this.searchParams;
      driverWaybillLoadingExport({
        type:type,
        data:type.includes('merchant')?this.merchantData:this.vehicleData
      }).then(res => {
        // 处理返回的文件流
        const content = res.data;
        const blob = new Blob([content], { type: "application/ms-excel" });
        const fileName =
          "司机统计" + moment(new Date()).format("YYYYMMDD") + ".xls";
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
    Merchant,
    Carrier
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
