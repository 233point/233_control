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
      <span>司机：{{ selectInfo.drivername }}</span>
      <!-- <div v-if="fromCarrier">
        <el-button type="primary" @click="exportExcel">导出</el-button>
      </div> -->
    </el-row>
    <el-row v-if="false">
      <div v-if="fromCarrier">
        <span>商户</span><br />
        <span></span>
      </div>
      <div>
        <span>订单总数</span><br />
        <span></span>
      </div>

      <div>
        <span>派单订单数</span><br />
        <span></span>
      </div>

      <div>
        <span>订单总数</span><br />
        <span></span>
      </div>
    </el-row>
    <el-table
      ref="vehicle"
      highlight-current-row
      tooltip-effect="light"
      :data="tableData"
    >
      <el-table-column prop="day" label="时间"> </el-table-column>
      <el-table-column prop="receivecount">
        <template slot="header" slot-scope="scope">
          <span>接单数</span>
          <el-tooltip
            class="item"
            effect="light"
            :content="itemTips.receivecount"
            placement="top"
          >
            <i
              v-show="tipsShow"
              class="el-icon-warning-outline primary_color"
            ></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="finished">
        <template slot="header" slot-scope="scope">
          <span>完成订单</span>
          <el-tooltip
            class="item"
            effect="light"
            :content="itemTips.finished"
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
          <span>上报异常数</span>
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
      <el-table-column prop="negativecommentcount">
        <template slot="header" slot-scope="scope">
          <span>差评订单</span>
          <el-tooltip
            class="item"
            effect="light"
            :content="itemTips.negativecommentcount"
            placement="top"
          >
            <i
              v-show="tipsShow"
              class="el-icon-warning-outline primary_color"
            ></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="deliveryOnTimeRate">
        <template slot="header" slot-scope="scope">
          <span>提货准时率</span>
          <el-tooltip
            class="item"
            effect="light"
            :content="itemTips.deliveryOnTimeRate"
            placement="top"
          >
            <i
              v-show="tipsShow"
              class="el-icon-warning-outline primary_color"
            ></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="receivebilltimecount">
        <template slot="header" slot-scope="scope">
          <span>平均接单时长</span>
          <el-tooltip
            class="item"
            effect="light"
            :content="itemTips.receivebilltimecount"
            placement="top"
          >
            <i
              v-show="tipsShow"
              class="el-icon-warning-outline primary_color"
            ></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="servicetimecount">
        <template slot="header" slot-scope="scope">
          <span>平均服务时长</span>
          <el-tooltip
            class="item"
            effect="light"
            :content="itemTips.servicetimecount"
            placement="top"
          >
            <i
              v-show="tipsShow"
              class="el-icon-warning-outline primary_color"
            ></i>
          </el-tooltip>
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
        receivecount: "司机在时间段内完成的接单数量",
        finished: "司机在时间段内完成的订单数",
        errorcount: "司机在时间段内上报的订单异常数量",
        negativecommentcount: "时间段内统计差评的反馈结果",
        deliveryOnTimeRate:
          "司机提货时间与期望提货时间的对比，分按时、不按时，进行统计",
        receivebilltimecount: "订单下发司机到司机接单操作的服务时长",
        servicetimecount: "订单回单完成到提货的平均时长"
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
      this.$emit("exportExcel",'driver');
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped></style>
