<template>
  <chart :options="option" ref="installProgress" />
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
  name: "installProgress",
  mounted() {
    this.selfAdaption();
    this.$emit("initData");
  },
  data() {
    return {
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["待配装", "已完成"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          show: false
        },
        yAxis: {
          data: [],
          show: false
        },
        dataZoom: [
          {
            show: false,
            id: "dataZoomY",
            type: "slider",
            left: "35",
            yAxisIndex: [0],
            filterMode: "filter"
          }
        ],
        series: [
          {
            name: "待配装",
            type: "bar",
            stack: "总量",
            barMaxWidth: "30",
            label: {
              normal: {
                show: true,
                position: "insideLeft"
              }
            },
            itemStyle: {
              color: "#FDC97A"
            },
            data: []
          },
          {
            name: "已完成",
            type: "bar",
            stack: "总量",
            barMaxWidth: "30",
            label: {
              normal: {
                show: true,
                position: "insideRight"
              }
            },

            itemStyle: {
              color: "#69D3FF"
            },
            data: []
          }
        ],
        animationDuration: 2000
      }
    };
  },
  props: {
    getSeries: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  watch: {
    getSeries(newVal) {
      if (newVal && newVal.length > 0) {
        this.option.yAxis.data = [];
        this.option.series[0].data = [];
        this.option.series[1].data = [];
        this.option.xAxis.show = true;
        this.option.yAxis.show = true;
        if (newVal.length >= 4) {
          this.option.dataZoom[0].show = true;
        } else {
          this.option.dataZoom[0].show = false;
        }
        newVal.map(item => {
          this.option.yAxis.data.push(item.name);
          this.option.series[0].data.push(item.transNum);
          this.option.series[1].data.push(item.finishNum);
        });
      } else {
        this.option.yAxis.data = [];
        this.option.series[0].data = [];
        this.option.series[1].data = [];
        this.option.xAxis.show = false;
        this.option.yAxis.show = false;
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
          if(_this.$refs.installProgress){
            _this.$refs.installProgress.resize();
          }
        });
      }, 10);
    }
  }
};
</script>

<style scoped></style>
