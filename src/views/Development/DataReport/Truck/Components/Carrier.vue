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
    <el-table-column prop="busplateno" label="车辆"> </el-table-column>
    <el-table-column prop="receivecount">
      <template slot="header" slot-scope="scope">
        <span>服务订单数</span>
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
    <!-- <el-table-column
          prop="finished">
          <template slot="header" slot-scope="scope">
            <span>日平均订单</span>
            <el-tooltip class="item" effect="light" :content="itemTips.servicetimecount"  placement="top">               <i v-show="tipsShow" class="el-icon-warning-outline primary_color"></i>             </el-tooltip>
          </template>
        </el-table-column> -->
    <el-table-column prop="finishmileagecount">
      <template slot="header" slot-scope="scope">
        <span>总里程(km)</span>
        <el-tooltip
          class="item"
          effect="light"
          :content="itemTips.finishmileagecount"
          placement="top"
        >
          <i
            v-show="tipsShow"
            class="el-icon-warning-outline primary_color"
          ></i>
        </el-tooltip>
      </template>
    </el-table-column>
    <!-- <el-table-column
          prop="negativecommentcount">
          <template slot="header" slot-scope="scope">
            <span>日平均里程(km)</span>
            <el-tooltip class="item" effect="light" :content="itemTips.servicetimecount"  placement="top">               <i v-show="tipsShow" class="el-icon-warning-outline primary_color"></i>             </el-tooltip>
          </template>
        </el-table-column> -->
    <el-table-column prop="busservicetimecount">
      <template slot="header" slot-scope="scope">
        <span>日平均时长</span>
        <el-tooltip
          class="item"
          effect="light"
          :content="itemTips.busservicetimecount"
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
</template>

<script>
import moment from "moment";

export default {
  name: "Carrier",
  data() {
    return {
      itemTips: {
        receivecount: "车辆时间段内服务的订单总数",
        finishmileagecount: "时间段内的订单总里程",
        busservicetimecount:
          "每日服务时长（最后一单完成的时间-第一单的提货时间）"
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
