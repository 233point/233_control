<template>
  <!-- 订单总数 -->
  <chart :options="option" ref="chartsAll" />
</template>

<script>
import CommonWrapper from "@/components/commonWrapper";
import ECharts from "vue-echarts/components/ECharts";
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/component/polar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
import "echarts/lib/component/dataZoom";

export default {
  name: "chartsAll",
  mounted() {
    this.selfAdaption();
  },
  data() {
    return {
      option: {
        color: ["#69D3FF"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            show: false,
            data: [],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            show: false
          }
        ],
        dataZoom: [
          {
            show: false,
            id: "dataZoomX",
            type: "slider",
            xAxisIndex: [0],
            filterMode: "filter"
          }
        ],
        series: [
          {
            name: "订单总数",
            type: "bar",
            barMaxWidth: "30",
            itemStyle: {
              color: "#FDC97A"
            },
            data: []
          }
        ]
      }
    };
  },
  props: {
    getSeries: {
      type: Array
    }
  },

  watch: {
    getSeries(newVal) {
      if (newVal && newVal.length > 0) {
        this.option.xAxis[0].data = [];
        this.option.xAxis[0].show = true;
        this.option.yAxis[0].show = true;
        this.option.series[0].data = [];
        if (newVal.length >= 6) {
          this.option.dataZoom[0].show = true;
        } else {
          this.option.dataZoom[0].show = false;
        }
        newVal.map(item => {
          this.option.xAxis[0].data.push(item.day);
          this.option.series[0].data.push(item.count);
        });
      } else {
        this.option.xAxis[0].data = [];
        this.option.series[0].data = [];
        this.option.xAxis[0].show = false;
        this.option.yAxis[0].show = false;
        this.option.dataZoom[0].show = false;
      }
    }
  },
  components: { CommonWrapper, chart: ECharts },
  methods: {
    selfAdaption() {
      let _this = this;
      setTimeout(() => {
        window.addEventListener("resize", function() {
          if (_this.$refs.chartsAll) {
            _this.$refs.chartsAll.resize();
          }
        });
      }, 10);
    }
  }
};
</script>

<style scoped>
.chartsAll {
  height: 100%;
  width: 100%;
}
</style>
