<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 10:08:32
 * @LastEditTime: 2019-08-16 14:57:23
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="merchant_area" :class="fromCarrier ? 'merchant_drawer' : ''">
    <section class="top_data">
      <div v-if="fromCarrier" class="border-r">
        <span class="title">商户</span>
        <span class="number">{{ selectInfo.merchantname }}</span>
      </div>
      <div class="border-r">
        <span class="title"
          >订单总数<el-tooltip
            class="item"
            effect="light"
            :content="itemTips.create_waybillcount_top"
            placement="top"
          >
            <i
              v-show="tipsShow"
              class="el-icon-warning-outline primary_color"
            ></i>
          </el-tooltip>
        </span>
        <span class="number">{{ merchantTopData.create_waybillcount }}</span>
      </div>
      <div class="border-r">
        <span class="title"
          >派单订单数<el-tooltip
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
        </span>
        <span class="number">{{ merchantTopData.distribute_billcount }}</span>
      </div>
      <div>
        <span class="title"
          >订单完成数<el-tooltip
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
        </span>
        <span class="number">{{ merchantTopData.finish_billcount }}</span>
      </div>
    </section>
    <el-button v-if="fromCarrier" class="export_btn" type="primary" @click="exportExcel">导出</el-button>
    <el-table
      ref="vehicle"
      highlight-current-row
      tooltip-effect="light"
      :data="tableData"
    >
      <el-table-column align="center" prop="day" label="时间">
      </el-table-column>
      <el-table-column align="center">
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
        <el-table-column align="center" prop="create_waybillcount" label="总数">
        </el-table-column>
        <el-table-column
          align="center"
          prop="create_waybillgrowth"
          label="比例"
        >
          <template slot-scope="scope">
            <span>{{
              !isNaN(Number(scope.row.create_waybillgrowth))
                ? scope.row.create_waybillgrowth + "%"
                : scope.row.create_waybillgrowth
            }}</span>
            <i
              class="growthType"
              :class="growthType(scope.row.create_waybillgrowth)"
            ></i>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center">
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
        <el-table-column
          align="center"
          prop="appoint_waybillcount"
          label="总数"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="appoint_waybillgrowth"
          label="比例"
        >
          <template slot-scope="scope">
            <span>{{
              !isNaN(Number(scope.row.appoint_waybillgrowth))
                ? scope.row.appoint_waybillgrowth + "%"
                : scope.row.appoint_waybillgrowth
            }}</span>
            <i
              class="growthType"
              :class="growthType(scope.row.appoint_waybillgrowth)"
            ></i>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center">
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
        <el-table-column
          align="center"
          prop="distribute_billcount"
          label="总数"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="distribute_billgrowth"
          label="比例"
        >
          <template slot-scope="scope">
            <span>{{
              !isNaN(Number(scope.row.distribute_billgrowth))
                ? scope.row.distribute_billgrowth + "%"
                : scope.row.distribute_billgrowth
            }}</span>
            <i
              class="growthType"
              :class="growthType(scope.row.distribute_billgrowth)"
            ></i>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center">
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
        <el-table-column align="center" prop="finish_billcount" label="总数">
        </el-table-column>
        <el-table-column align="center" prop="finish_billgrowth" label="比例">
          <template slot-scope="scope">
            <span>{{
              !isNaN(Number(scope.row.finish_billgrowth))
                ? scope.row.finish_billgrowth + "%"
                : scope.row.finish_billgrowth
            }}</span>
            <i
              class="growthType"
              :class="growthType(scope.row.finish_billgrowth)"
            ></i>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column align="center">
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
        <el-table-column align="center" prop="closecount" label="总数">
        </el-table-column>
        <el-table-column align="center" prop="closegrowth" label="比例">
          <template slot-scope="scope">
            <span>{{
              !isNaN(Number(scope.row.closegrowth))
                ? scope.row.closegrowth + "%"
                : scope.row.closegrowth
            }}</span>
            <i
              class="growthType"
              :class="growthType(scope.row.closegrowth)"
            ></i>
          </template>
        </el-table-column>
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
        create_waybillcount_top: "该月商户的所有创建订单总数，包括关闭的订单",
        distribute_billcount: "该月商户的所有司机接单的订单数量",
        finish_billcount:
          "服务完成的订单数，包含正常完成、客户拒收、异常完成的订单总数",
        create_waybillcount: "下单总数",
        //预约数
        appoint_waybillcount: "所有预约操作的订单总数",
        //派单数
        distribute_billcount: "司机接单总数",
        //完成
        finish_billcount:
          "订单服务完成订单总数，包括正常完成和拒收、异常完成总数",
        //关闭
        closecount: "下单后关闭的订单总数"
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
    },
    merchantTopData: {
      type: Object
    }
  },
  mounted() {},
  methods: {
    growthType(value) {
      let number = Number(value);
      if (isNaN(number)) {
        return "";
      } else {
        return number > 0
          ? "el-icon-caret-top success_color"
          : number < 0 ?"el-icon-caret-bottom error_color" : '';
      }
    },
    exportExcel() {
      this.$emit("exportExcel", 'merchant',this.selectInfo.merchantid);
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.merchant_area{
  position: relative;
  .export_btn{
    position: absolute;
    right: 55px;
    top: 60px;
  }
}
.top_data {
  padding: 15px 0;
  display: flex;
  > div {
    flex: 1 1 auto;
    text-align: center;
    span {
      display: block;
    }
    .title {
    }
    .number {
      margin-top: 10px;
      font-size: 24px;
      color: #000;
    }
  }
  .border-r {
    border-right: 1px solid #e7e7e7;
  }
  .growthType {
    font-size: 18px;
    vertical-align: middle;
  }
}
</style>
