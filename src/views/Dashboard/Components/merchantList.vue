<template>
  <div>
    <el-row>
      <el-radio-group v-model="searchForm.waybillType">
        <el-radio-button label="1" key="1">司机</el-radio-button>
        <el-radio-button label="2" key="2">车辆</el-radio-button>
      </el-radio-group>
    </el-row>
    <el-table
      class="merchants_list"
      ref="dataTable"
      height="270px"
      tooltip-effect="light"
      v-if="searchForm.waybillType == '1'"
      :data="driverData"
    >
      <el-table-column type="index" label="序号" width="50">
        <template slot-scope="scope">
          <span :class="scope.$index <= 2 ? 'serial_active' : 'serial'">
            <span>{{ Number(scope.$index) + 1 }}</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="driverName" label="姓名"></el-table-column>
      <el-table-column prop="city" label="城市"></el-table-column>
      <el-table-column prop="billNum" label="订单数"></el-table-column>
      <el-table-column prop="rate" label="占比" width="150">
        <template slot-scope="scope">
          <el-progress :percentage="scope.row.rate"> </el-progress>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      class="merchants_list"
      ref="dataTable"
      height="270px"
      tooltip-effect="light"
      :data="plateNoData"
      v-if="searchForm.waybillType == '2'"
    >
      <el-table-column type="index" label="序号" width="50">
        <template slot-scope="scope">
          <span :class="scope.$index <= 2 ? 'serial_active' : 'serial'">
            <span>{{ Number(scope.$index) + 1 }}</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="plateNo" label="车牌号"></el-table-column>
      <el-table-column prop="city" label="城市"></el-table-column>
      <el-table-column prop="billNum" label="订单数"></el-table-column>
      <el-table-column prop="rate" label="占比" width="150">
        <template slot-scope="scope">
          <el-progress :percentage="scope.row.rate"> </el-progress>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import CommonContent from "@/components/commonContent";

export default {
  name: "merchants-list",
  components: {
    CommonContent
  },
  data() {
    return {
      searchForm: {
        waybillType: "1"
      }
    };
  },
  props: {
    plateNoData: {
      type: Array
    },
    driverData: {
      type: Array
    },
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.$emit("initData");
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
@keyframes jello {
  from,
  11.1%,
  to {
    transform: translate3d(0, 0, 0);
  }

  22.2% {
    transform: skewX(-12.5deg) skewY(-12.5deg);
  }

  33.3% {
    transform: skewX(6.25deg) skewY(6.25deg);
  }

  44.4% {
    transform: skewX(-3.125deg) skewY(-3.125deg);
  }

  55.5% {
    transform: skewX(1.5625deg) skewY(1.5625deg);
  }

  66.6% {
    transform: skewX(-0.78125deg) skewY(-0.78125deg);
  }

  77.7% {
    transform: skewX(0.390625deg) skewY(0.390625deg);
  }

  88.8% {
    transform: skewX(-0.1953125deg) skewY(-0.1953125deg);
  }
}
.el-table__row {
  padding: 0.5rem;
  line-height: 24px;
  &:hover {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    .serial,
    .serial_active {
      animation: jello 1000ms both;
    }
  }
}
.serial {
  display: inline-block;
  text-align: center;
  height: 22px;
  width: 22px;
  border-radius: 22px;
  text-align: center;
  line-height: 22px !important;
  background-color: $base-light-color;
  display: inline-block;
}
.serial_active {
  position: relative;
  display: inline-block;
  color: white;
  width: 20px;
  height: 0;
  border-width: 0 0px 8px;
  border-style: solid;
  border-color: transparent transparent var(--color-primary);
  box-sizing: content-box;
  &:before {
    position: absolute;
    content: "";
    top: 8px;
    left: 0px;
    width: 8px;
    height: 0;
    border-width: 6px 6px 0;
    border-style: solid;
    border-color: var(--color-primary) transparent transparent;
    box-sizing: content-box;
  }
  &:after {
    position: absolute;
    content: "";
    top: -6px;
    left: 0px;
    width: 8px;
    height: 0;
    border-width: 0 6px 6px;
    background: none;
    border-style: solid;
    border-color: transparent transparent var(--color-primary);
    box-sizing: content-box;
  }
  span {
    position: absolute;
    z-index: 2;
    line-height: 19px;
    color: white;
    left: 0px;
    top: -5px;
    text-align: center;
    width: 20px;
    font-size: 12px;
  }
}
</style>
