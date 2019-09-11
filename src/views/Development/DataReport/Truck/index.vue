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
      />
    </common-wrapper>
    <el-row class="order_search">
      <el-col :span="24" class="order_search_title">
        <div>
          <span class="title">车辆统计</span>
        </div>
      </el-col>
    </el-row>
    <carrier
      :tipsShow="tipsShow"
      :tableData="vehicleData"
      @gotoMerchant="gotoMerchant"
    />
  </div>
</template>

<script>
import moment from "moment";
import CommonWrapper from "@/components/commonWrapper";
import CommonTable from "@/components/commonTable";

import Search from "./Components/Search";
import Carrier from "./Components/Carrier";

import { getMerchantsByAssembly } from "@/api/order";

import {
  driverWaybillLoading,
  driverWaybillLoadingExport
} from "@/api/datareport";

export default {
  name: "Truck",
  data() {
    return {
      vehicleData: [],
      merchantData: [],
      vehicleisListLoading: false,
      searchParams: {},
      merchantList: [],
      showMerchant: false,
      searchParams: {},
      tipsShow: false
    };
  },
  mounted() {
    if (!this.$store.getters.roleType.includes("merchant")) {
      this.getMerchantList();
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
    queryList(params, type, merchantid) {
      this.searchParams = params;
      if (type == "merchant") {
        params.merchantid = merchantid;
        this.waybillStatOfMerchant(params);
      } else {
        this.waybillStatOfCarrier(params);
      }
    },
    //服务商
    waybillStatOfCarrier(params) {
      driverWaybillLoading(params).then(res => {
        if (!res.error) {
          this.vehicleData = res;
        }
      });
    },
    //商户
    waybillStatOfMerchant(params) {
      driverWaybillLoading(params).then(res => {
        if (!res.error) {
          this.merchantData = res;
        }
      });
    },
    gotoMerchant(row) {
      this.queryList(this.searchParams, "merchant", row.merchantid);
      this.showMerchant = true;
    },
    tipsChange(value) {
      this.tipsShow = value;
    },
    exportExcel() {
      let params = this.searchParams;
      driverWaybillLoadingExport({ ...this.searchParams }).then(res => {
        // 处理返回的文件流
        const content = res.data;
        const blob = new Blob([content], { type: "application/ms-excel" });
        const fileName =
          "车辆统计" + moment(new Date()).format("YYYYMMDD") + ".xls";
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
