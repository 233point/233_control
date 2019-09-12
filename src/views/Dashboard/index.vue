<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 15:50:15
 * @LastEditTime: 2019-09-05 11:08:56
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="behavior-list">
    <common-content :flex="100">
      <welcome :statData="statData" />
      <Banner  />
      <order-stat :statData="statData" />
    </common-content>
  </div>
</template>

<script>
import store from "@/store";
import moment from "moment";
import { mapGetters } from "vuex";
import CommonWrapper from "@/components/commonWrapper";
import CommonTable from "@/components/commonTable";
import CommonContent from "@/components/commonContent";
import OrderStat from "./Components/stat";
import Welcome from "./Components/Welcome";
import Banner from "./Components/Banner";

export default {
  name: "Dashboard",
  components: {
    Welcome,
    OrderStat,
    CommonWrapper,
    CommonTable,
    CommonContent,
    Banner
  },
  data() {
    return {
      statData: {
        abnormalCount: 233,
        distributeCount: 233,
        finishedCount: 233,
        receiveCount: 233,
        cumulativeOrder: 233,
        driverCount: 233,
        serviceScore: 233,
        waybillOfToday: 233,
        waybillRank: "",
        merchantCount: 233,
        accumulatedReceipt: 233,
        todayWaybillCount:233
      },
    };
  },
  computed: {
  },
  mounted() {
  },
  activated() {
  },
  methods: {
    formatTime: function(row) {
      return moment(row.updateTime).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>
<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 270px !important;
}
.behavior-list {
  position: relative;

  .clear {
    clear: both;
    height: 2px;
    overflow: hidden;
    background: #f2f2f2;
    margin-bottom: 10px;
  }

  #progressbar {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 28px;
    height: 28px;
  }
  .dash-table {
    display: flex;
    margin-bottom: 10px;
    border: 1px solid #f2f2f2;
    border-radius: 8px;
    overflow: hidden;
    ul {
      min-width: 100px;
      flex: 1 auto;
      display: inherit;
      flex-direction: column;
      &:last-child {
        li {
          border-right: none;
        }
      }

      li {
        display: inherit;
        justify-content: center;
        align-items: center;
        border-right: 1px solid #f2f2f2;
        border-bottom: 1px solid #f2f2f2;
        box-sizing: border-box;
        height: 35px;

        &:last-child {
          border-bottom: none;
        }
        &.header {
          height: 35px;
          background: #f2f2f2;
        }

        &.yesterday,
        &.today {
          padding: 10px 0;
          font-size: 1.4rem;
        }

        &.yesterday {
          font-size: 1.3rem;
          color: #777;
        }

        &.today {
          font-weight: 600;
        }
      }
    }
  }
}
.mid-content {
  font-size: 1.1rem;
  padding: 5px 0 20px 0;

  .el-col {
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      display: inline-block;
      margin-left: 10px;
      font-size: 1.6rem;
      font-weight: 600;
    }
  }
}
.table-header {
  display: flex;
  align-items: center;
  padding: 5px 0 15px 0;
  border-bottom: 1px solid #f2f2f2;

  .last-uppdate-time {
    display: inline-block;
    margin-left: 8px;
    font-size: 0.9rem;
    color: #9e9e9e;
  }

  i {
    font-size: 1.5rem;
    margin-right: 5px;
  }

  span {
    font-size: 1.1rem;
    font-weight: 600;
  }
}
.stat-num-container {
  margin: 0.5rem auto;
  .liner-blue {
    background: linear-gradient(
      -35deg,
      rgba(105, 211, 255, 1),
      rgba(23, 165, 247, 1)
    );
  }
  .liner-green {
    background: linear-gradient(
      -35deg,
      rgba(61, 241, 235, 1),
      rgba(53, 213, 208, 1)
    );
  }
  .liner-orange {
    background: linear-gradient(
      -35deg,
      rgba(253, 201, 122, 1),
      rgba(236, 163, 47, 1)
    );
  }
  .liner-lightgreen {
    background: linear-gradient(
      -35deg,
      rgba(163, 245, 122, 1),
      rgba(89, 202, 34, 1)
    );
  }
  .liner-paper {
    background: linear-gradient(
      -35deg,
      rgba(105, 137, 255, 1),
      rgba(97, 42, 221, 1)
    );
  }
  .liner-red {
    background: linear-gradient(
      -35deg,
      rgba(245, 149, 122, 1),
      rgba(240, 107, 73, 1)
    );
  }
  .stat-num {
    height: 100px;
    border-radius: 10px;
    p {
      color: white;
      font-weight: 300;
    }
    p:nth-child(1) {
      padding: 10px 0px 0 10px;
      font-size: 18px;
      font-weight: bold;
    }
    p:nth-child(2) {
      font-size: 24px;
      text-align: center;
    }
  }
}

.chart-container {
  height: 400px;
  // width:600px;
  .chart-title {
    font-size: 16px;
    font-weight: bold;
    color: rgba(51, 51, 51, 1);
    line-height: 41px;
    display: inline-block;
    margin-right: 10px;
  }
}
.heat_map {
  height: calc(100% - 70px);
}
.customer_evalute {
  display: inline-block;
  margin-right: 20px;
}
</style>
