<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 10:08:32
 * @LastEditTime: 2019-08-16 14:57:23
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-table
    ref="vehicle"
    highlight-current-row
    tooltip-effect="light"
    :data="tableData"
  >
    <el-table-column prop="" label="商户">
      <template slot-scope="scope">
        <el-button type="text" @click="gotoMerchant(scope.row)">{{
          scope.row.merchantname
        }}</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="create_Loadingcount">
      <template slot="header" slot-scope="scope">
        <span>服务订单总数</span>
        <el-tooltip
          class="item"
          effect="light"
          :content="itemTips.create_Loadingcount"
          placement="top"
        >
          <i
            v-show="tipsShow"
            class="el-icon-warning-outline primary_color"
          ></i>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="errorcount">
      <template slot="header" slot-scope="scope">
        <span>异常订单数</span>
        <el-tooltip
          class="item"
          effect="light"
          :content="itemTips.errorcount"
          placement="top"
        >
          <i
            v-show="tipsShow"
            class="el-icon-warning-outline primary_color"
          ></i>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="errorproductcount">
      <template slot="header" slot-scope="scope">
        <span>异常货品数</span>
        <el-tooltip
          class="item"
          effect="light"
          :content="itemTips.errorproductcount"
          placement="top"
        >
          <i
            v-show="tipsShow"
            class="el-icon-warning-outline primary_color"
          ></i>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="needdealcount">
      <template slot="header" slot-scope="scope">
        <span>待处理异常数</span>
        <el-tooltip
          class="item"
          effect="light"
          :content="itemTips.needdealcount"
          placement="top"
        >
          <i
            v-show="tipsShow"
            class="el-icon-warning-outline primary_color"
          ></i>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="havedealcount">
      <template slot="header" slot-scope="scope">
        <span>异常单处理数</span>
        <el-tooltip
          class="item"
          effect="light"
          :content="itemTips.havedealcount"
          placement="top"
        >
          <i
            v-show="tipsShow"
            class="el-icon-warning-outline primary_color"
          ></i>
        </el-tooltip>
      </template>
    </el-table-column>
    <!-- <el-table-column prop="abnormalReportRate">
      <template slot="header" slot-scope="scope">
        <span>异常上报率</span>
        <el-tooltip
          class="item"
          effect="light"
          :content="itemTips.abnormalReportRate"
          placement="top"
        >
          <i
            v-show="tipsShow"
            class="el-icon-warning-outline primary_color"
          ></i>
        </el-tooltip>
      </template>
      <template slot-scope="scope">
        <span>{{
          !isNaN(Number(scope.row.abnormalReportRate))
            ? scope.row.abnormalReportRate + "%"
            : scope.row.abnormalReportRate
        }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="abnormalDealRate">
      <template slot="header" slot-scope="scope">
        <span>异常处理率</span>
        <el-tooltip
          class="item"
          effect="light"
          :content="itemTips.abnormalDealRate"
          placement="top"
        >
          <i
            v-show="tipsShow"
            class="el-icon-warning-outline primary_color"
          ></i>
        </el-tooltip>
      </template>
      <template slot-scope="scope">
        <span>{{
          !isNaN(Number(scope.row.abnormalDealRate))
            ? scope.row.abnormalDealRate + "%"
            : scope.row.abnormalDealRate
        }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="avgdealtime">
      <template slot="header" slot-scope="scope">
        <span>平均处理时长</span>
        <el-tooltip
          class="item"
          effect="light"
          :content="itemTips.avgdealtime"
          placement="top"
        >
          <i
            v-show="tipsShow"
            class="el-icon-warning-outline primary_color"
          ></i>
        </el-tooltip>
      </template>
    </el-table-column> -->
  </el-table>
</template>

<script>
import moment from "moment";

export default {
  name: "Carrier",
  data() {
    return {
      itemTips: {
        create_Loadingcount:
          "对应日期的商户该日配装订单总数，即司机服务订单总数",
        errorcount: "当日服务的上报异常操作的订单总数",
        errorproductcount: "当日异常订单上报的货品异常总数异常",
        needdealcount: "当日剩余未处理异常订单数",
        havedealcount: "当日处理的异常订单总数",
        abnormalReportRate: "异常订单数/服务订单总数",
        abnormalDealRate: "异常处理数/（新增异常数+待处理异常数）",
        avgdealtime: "当日处理异常单从上报到处理完成的平均耗时"
      }
    };
  },
  props: {
    tableData: {
      type: Array,
      default: []
    },
    tipsShow: {
      type: Boolean,
      default: false
    }
  },
  mounted() {},
  methods: {
    gotoMerchant(row) {
      this.$emit("gotoMerchant", row);
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped></style>
