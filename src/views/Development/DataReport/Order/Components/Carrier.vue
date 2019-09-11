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
    <el-table-column prop="create_waybillcount">
      <template slot="header" slot-scope="scope">
        <span>订单数</span>
        <el-tooltip
          class="item"
          effect="light"
          :content="itemTips.create_waybillcount"
          placement="top"
        >
          <i
            v-show="tipsShow"
            class="el-icon-warning-outline primary_color"
          ></i>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="appoint_waybillcount">
      <template slot="header" slot-scope="scope">
        <span>预约数</span>
        <el-tooltip
          class="item"
          effect="light"
          :content="itemTips.appoint_waybillcount"
          placement="top"
        >
          <i
            v-show="tipsShow"
            class="el-icon-warning-outline primary_color"
          ></i>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="distribute_billcount">
      <template slot="header" slot-scope="scope">
        <span>派单数</span>
        <el-tooltip
          class="item"
          effect="light"
          :content="itemTips.distribute_billcount"
          placement="top"
        >
          <i
            v-show="tipsShow"
            class="el-icon-warning-outline primary_color"
          ></i>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="finish_billcount">
      <template slot="header" slot-scope="scope">
        <span>完成</span>
        <el-tooltip
          class="item"
          effect="light"
          :content="itemTips.finish_billcount"
          placement="top"
        >
          <i
            v-show="tipsShow"
            class="el-icon-warning-outline primary_color"
          ></i>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="closecount">
      <template slot="header" slot-scope="scope">
        <span>关闭</span>
        <el-tooltip
          class="item"
          effect="light"
          :content="itemTips.closecount"
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
        create_waybillcount: "时间段内商户订单总数",
        appoint_waybillcount: "时间段内商户订单预约总数",
        distribute_billcount: "时间段内商户订单司机接单总数",
        finish_billcount: "时间段内商户订单完成总数",
        closecount: "时间段内商户订单关闭总数"
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
