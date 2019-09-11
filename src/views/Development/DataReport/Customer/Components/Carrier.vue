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
    <el-table-column prop="create_evaluatecount">
      <template slot="header" slot-scope="scope">
        <span>新增评价订单数</span>
        <el-tooltip
          class="item"
          effect="light"
          :content="itemTips.create_evaluatecount"
          placement="top"
        >
          <i
            v-show="tipsShow"
            class="el-icon-warning-outline primary_color"
          ></i>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="needevaluatecount">
      <template slot="header" slot-scope="scope">
        <span>待评价数量</span>
        <el-tooltip
          class="item"
          effect="light"
          :content="itemTips.needevaluatecount"
          placement="top"
        >
          <i
            v-show="tipsShow"
            class="el-icon-warning-outline primary_color"
          ></i>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="haveevaluatecount">
      <template slot="header" slot-scope="scope">
        <span>评价数量</span>
        <el-tooltip
          class="item"
          effect="light"
          :content="itemTips.haveevaluatecount"
          placement="top"
        >
          <i
            v-show="tipsShow"
            class="el-icon-warning-outline primary_color"
          ></i>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="addNegativecomment">
      <template slot="header" slot-scope="scope">
        <span>新增差评数</span>
        <el-tooltip
          class="item"
          effect="light"
          :content="itemTips.addNegativecomment"
          placement="top"
        >
          <i
            v-show="tipsShow"
            class="el-icon-warning-outline primary_color"
          ></i>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="needNegativecomment">
      <template slot="header" slot-scope="scope">
        <span>待处理差评数</span>
        <el-tooltip
          class="item"
          effect="light"
          :content="itemTips.needNegativecomment"
          placement="top"
        >
          <i
            v-show="tipsShow"
            class="el-icon-warning-outline primary_color"
          ></i>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="dealNegativecomment">
      <template slot="header" slot-scope="scope">
        <span>差评处理</span>
        <el-tooltip
          class="item"
          effect="light"
          :content="itemTips.dealNegativecomment"
          placement="top"
        >
          <i
            v-show="tipsShow"
            class="el-icon-warning-outline primary_color"
          ></i>
        </el-tooltip>
      </template>
    </el-table-column>
    <!-- <el-table-column prop="evaluateFinishRate">
      <template slot="header" slot-scope="scope">
        <span>评价完成率</span>
        <el-tooltip
          class="item"
          effect="light"
          :content="itemTips.evaluateFinishRate"
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
          !isNaN(Number(scope.row.evaluateFinishRate))
            ? scope.row.evaluateFinishRate + "%"
            : scope.row.evaluateFinishRate
        }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="satisfaction">
      <template slot="header" slot-scope="scope">
        <span>满意度</span>
        <el-tooltip
          class="item"
          effect="light"
          :content="itemTips.satisfaction"
          placement="top"
        >
          <i
            v-show="tipsShow"
            class="el-icon-warning-outline primary_color"
          ></i>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="dealBadEvaluateRate">
      <template slot="header" slot-scope="scope">
        <span>差评处理率</span>
        <el-tooltip
          class="item"
          effect="light"
          :content="itemTips.dealBadEvaluateRate"
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
          !isNaN(Number(scope.row.dealBadEvaluateRate))
            ? scope.row.dealBadEvaluateRate + "%"
            : scope.row.dealBadEvaluateRate
        }}</span>
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
        create_evaluatecount:
          "对应日期的商户该日配装订单完成，需要进行评价订单总数",
        needevaluatecount: "当日尚未完成评价的订单总数",
        haveevaluatecount: "当日完成评价的订单总数",
        addNegativecomment: "当日评价为差评的订单数",
        needNegativecomment: "当日尚未完成差评处理的订单数",
        evaluateFinishRate: "评价数量/（新增订单数+待评价数量）",
        satisfaction: "（评价数量-差评数量）/评价数量",
        dealNegativecomment: "当日处理的差评订单数量",
        dealBadEvaluateRate: "差评处理/（差评数量+待处理差评数）"
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
