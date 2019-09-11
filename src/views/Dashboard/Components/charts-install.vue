<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-05 08:49:00
 * @LastEditTime: 2019-09-05 10:13:20
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="install_container">
    <div class="control">
      <!-- <el-radio-group v-model="searchForm.waybillType">
        <el-radio-button label="0"
                         key="0">全部</el-radio-button>
        <el-radio-button label="1"
                         key="1">订单数</el-radio-button>
        <el-radio-button label="2"
                         key="2">接单数</el-radio-button>
        <el-radio-button label="3"
                         key="3">完成数</el-radio-button>
      </el-radio-group> -->
      <div class="date_container">
        <simple-tabs @change="initDate" v-model="searchForm.current">
          <tab-item label="今日" value="today" />
          <tab-item label="本周" value="currentweek" />
          <tab-item label="本月" value="currentmonth" />
          <tab-item label="自定义" value="custom" />
        </simple-tabs>
        <el-date-picker
          v-if="searchForm.current == 'custom'"
          v-model="searchForm.dateRange"
          type="daterange"
          size="mini"
          :clearable="false"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="initDate"
        >
        </el-date-picker>
      </div>
    </div>
    <chart :options="option" ref="chartsInstall" />
  </div>
</template>

<script>
import CommonWrapper from "@/components/commonWrapper";
import { simpleTabs, TabItem } from "@/components/simpleTabs/index.js";
import ECharts from "vue-echarts/components/ECharts";
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/component/polar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
import "echarts/lib/component/dataZoom";

export default {
  name: "chartsInstall",
  mounted() {
    if (
      (this.searchForm.current == "custom" &&
        this.searchForm.dateRange.length) ||
      this.searchForm.current != "custom"
    ) {
      this.initDate(this.searchForm);
    }
    this.selfAdaption();
  },
  data() {
    return {
      searchForm: {
        waybillType: "0",
        current: "currentweek",
        dateRange: "",
        start: null,
        end: null
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          }
        ],
        disabledDate: time => {
          return time.getTime() >= new Date().getTime();
        }
      },
      option: {
        color: ["#69D3FF", "#F5B366", "#4FDAD2", "#F3D38C", "#C9F0F4"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        dataZoom: [
          {
            id: "dataZoomX",
            type: "slider",
            xAxisIndex: [0],
            filterMode: "filter"
          }
        ],
        legend: {
          data: ["订单数", "接单数", "完成数"]
        },
        xAxis: [
          {
            type: "category",
            data: []
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "订单数",
            type: "bar",
            barMaxWidth:20,
            data: []
          },
          {
            name: "接单数",
            type: "bar",
            barMaxWidth:20,
            data: []
          },
          {
            name: "完成数",
            type: "bar",
            barMaxWidth:20,
            data: []
          }
        ]
      }
    };
  },
  props: {
    getSeries: {
      type: Array,
      default: []
    }
  },
  watch: {
    getSeries(newVal) {
      let that = this;
      this.option.xAxis[0].data = [];
      this.option.series[0].data = [];
      this.option.series[1].data = [];
      this.option.series[2].data = [];
      this.option.xAxis.show = false;
      this.option.yAxis.show = false;
      if (newVal && newVal.length > 0) {
        this.option.yAxis.data = [];
        this.option.series[0].data = [];
        this.option.series[1].data = [];
        this.option.xAxis.show = true;
        this.option.yAxis.show = true;
        if (newVal.length >= 8) {
          this.option.dataZoom[0].show = true;
        } else {
          this.option.dataZoom[0].show = false;
        }
        newVal.map(item => {
          that.option.xAxis[0].data.push(item.day);
          that.option.series[0].data.push(item.create_waybillcount);
          that.option.series[1].data.push(item.distribute_billcount);
          that.option.series[2].data.push(item.finish_billcount);
        });
      } else {
      }
    }
  },
  components: { CommonWrapper, chart: ECharts },
  methods: {
    initDate() {
      if (
        (this.searchForm.current == "custom" &&
          this.searchForm.dateRange.length) ||
        this.searchForm.current != "custom"
      ) {
        if (this.searchForm.current == "custom") {
          if (this.searchForm.dateRange.length) {
            this.searchForm.start = this.searchForm.dateRange[0];
            this.searchForm.end = this.searchForm.dateRange[1];
            this.$emit("initDate", this.searchForm);
          }
        } else {
          this.$emit("initDate", this.searchForm);
        }
      }
    },
    selfAdaption() {
      let _this = this;
      setTimeout(() => {
        window.addEventListener("resize", function() {
          if (_this.$refs.chartsInstall) {
            _this.$refs.chartsInstall.resize();
          }
        });
      }, 10);
    }
  }
};
</script>

<style scoped>
.install_container {
  width: 100%;
}
.echarts {
  width: 100%;
  height: 270px !important;
}
.control {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.date_container {
  height: 30px;
  display: flex;
  align-items: center;
}
</style>
