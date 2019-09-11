<template>
  <chart :options="option" ref="echartsWaybill" />
</template>

<script>
import CommonWrapper from "@/components/commonWrapper";
import ECharts from "vue-echarts/components/ECharts";
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/component/polar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";

export default {
  name: "echartsWaybill",
  mounted() {
    this.selfAdaption();
  },
  data() {
    return {
      option: {
        color: [
          "#4FDAD2",
          "#F5B366",
          "#F3D38C",
          "#3EAFF7",
          "#C9F0F4",
          "#FAE6C4"
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: []
        },
        series: [
          {
            name: "区域订单量",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
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
      type: Array
    }
  },
  watch: {
    getSeries(newVal) {
      if (newVal && newVal.length > 0) {
        this.option.legend.data = [];
        this.option.series[0].data = [];
        newVal.map(item => {
          this.option.legend.data.push(item.area);
          this.option.series[0].data.push({
            value: item.count,
            name: item.area
          });
        });
      } else {
        this.option.legend.data = [];
        this.option.series[0].data = [];
      }
    }
  },
  components: { CommonWrapper, chart: ECharts },
  methods: {
    selfAdaption() {
      let _this = this;
      setTimeout(() => {
        window.addEventListener("resize", function() {
          if (_this.$refs.echartsWaybill) {
            _this.$refs.echartsWaybill.resize();
          }
        });
      }, 10);
    }
  }
};
</script>

<style scoped></style>
