<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 10:08:32
 * @LastEditTime: 2019-08-16 14:57:23
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div :class="fromCarrier ? 'merchant_drawer' : ''">
    <el-row v-if="fromCarrier">
      <span>商户：{{ selectInfo.merchantname }}</span>
      <div v-if="fromCarrier">
        <el-button type="primary" @click="exportExcel">导出</el-button>
      </div>
    </el-row>
    <el-table
      ref="vehicle"
      highlight-current-row
      tooltip-effect="light"
      :data="tableData"
    >
      <el-table-column prop="day" label="时间"> </el-table-column>
      <el-table-column prop="create_Loadingcount">
        <template slot="header" slot-scope="scope">
          <span>服务订单数</span>
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
      <el-table-column prop="pickcount">
        <template slot="header" slot-scope="scope">
          <span>提货数量</span>
          <el-tooltip
            class="item"
            effect="light"
            :content="itemTips.pickcount"
            placement="top"
          >
            <i
              v-show="tipsShow"
              class="el-icon-warning-outline primary_color"
            ></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="intimepickcount">
        <template slot="header" slot-scope="scope">
          <span>准时提货数</span>
          <el-tooltip
            class="item"
            effect="light"
            :content="itemTips.intimepickcount"
            placement="top"
          >
            <i
              v-show="tipsShow"
              class="el-icon-warning-outline primary_color"
            ></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="backbillcount">
        <template slot="header" slot-scope="scope">
          <span>回单数量</span>
          <el-tooltip
            class="item"
            effect="light"
            :content="itemTips.backbillcount"
            placement="top"
          >
            <i
              v-show="tipsShow"
              class="el-icon-warning-outline primary_color"
            ></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="intimebackbillcount">
        <template slot="header" slot-scope="scope">
          <span>准时回单数</span>
          <el-tooltip
            class="item"
            effect="light"
            :content="itemTips.intimebackbillcount"
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
      <el-table-column prop="withdrawcount">
        <template slot="header" slot-scope="scope">
          <span>商户撤回数</span>
          <el-tooltip
            class="item"
            effect="light"
            :content="itemTips.withdrawcount"
            placement="top"
          >
            <i
              v-show="tipsShow"
              class="el-icon-warning-outline primary_color"
            ></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="refusecount">
        <template slot="header" slot-scope="scope">
          <span>客户拒收数</span>
          <el-tooltip
            class="item"
            effect="light"
            :content="itemTips.refusecount"
            placement="top"
          >
            <i
              v-show="tipsShow"
              class="el-icon-warning-outline primary_color"
            ></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="error_rate">
        <template slot="header" slot-scope="scope">
          <span>接单率</span>
          <el-tooltip
            class="item"
            effect="light"
            :content="itemTips.error_rate"
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
            !isNaN(Number(scope.row.error_rate))
              ? scope.row.error_rate + "%"
              : scope.row.error_rate
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="intimedelivery_rate">
        <template slot="header" slot-scope="scope">
          <span>提货准时率</span>
          <el-tooltip
            class="item"
            effect="light"
            :content="itemTips.intimedelivery_rate"
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
            !isNaN(Number(scope.row.intimedelivery_rate))
              ? scope.row.intimedelivery_rate + "%"
              : scope.row.intimedelivery_rate
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="intimeback_rate">
        <template slot="header" slot-scope="scope">
          <span>回单准时率</span>
          <el-tooltip
            class="item"
            effect="light"
            :content="itemTips.intimeback_rate"
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
            !isNaN(Number(scope.row.intimeback_rate))
              ? scope.row.intimeback_rate + "%"
              : scope.row.intimeback_rate
          }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
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
        pickcount: "当日操作提货的订单总数",
        intimepickcount:
          "当日司机准时提货的订单总数，提货完成时间在期望提货时间之前",
        backbillcount: "当日司机完成回单操作的订单总数",
        intimebackbillcount:
          "当日完成回单操作的订单总数，回单完成时间在期望完成时间之前为准时",
        errorcount: "当日配送上报过异常的订单总数",
        withdrawcount: "商户派单成功后又撤回订单的数量",
        refusecount: "司机配送后客户拒收的订单数量",
        error_rate: "异常订单数量/服务订单数量",
        intimedelivery_rate: "准时提货数/提货数量",
        intimeback_rate: "回单准时数/回单数"
      }
    };
  },
  props: {
    fromCarrier: {
      type: Boolean,
      default: false
    },
    tableData: {
      type: Array,
      default: []
    },
    tipsShow: {
      type: Boolean,
      default: false
    },
    selectInfo: {
      type: Object
    }
  },
  mounted() {},
  methods: {
    exportExcel() {
      this.$emit("exportExcel",'merchant',this.selectInfo.merchantid);
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped></style>
