<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-05 08:49:00
 * @LastEditTime: 2019-09-05 11:13:25
 * @LastEditors: Please set LastEditors
 -->
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
    this.$emit("initData");
  },
  data() {
    return {
      option: {
        color: ["#69D3FF","#d3adf7","#adc6ff","#ffadd2", "#b7eb8f", "#87e8de","#91d5ff"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        title: {
          text: this.getSeries.total,
          subtext: "总计(单)",
          left: "center",
          top: "50%",
          textStyle: {
            color: "#989898",
            fontSize: 24,
            align: "center"
          },
          subtextStyle: {
            color: "#666666",
            fontSize: 16,
            align: "center"
          }
        },
        legend: {
          // orient: "vertical",
          // align: "left",
          // x: "right",
          // y: "bottom",
          top: 0,
          left:'center',
          formatter: name => {
            return this.getNameCount(name);
          },
          data: []
        },
        series: [
          {
            name: "订单量",
            type: "pie",
            radius: ["50%", "70%"],
            center : ['50%', '60%'],
            avoidLabelOverlap: true,
            label: {
              normal: {
                show: false,
                position: "center",
                formatter: "{b}: {d}"
              },
              emphasis: {
                show: false,
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
        ]
      }
    };
  },
  props: {
    getSeries: {
      type: Object
    }
  },

  watch: {
    getSeries(newVal) {
      let that = this;
      that.option.legend.data = [];
      that.option.series[0].data = [];
      if (newVal.data && newVal.data.length > 0) {
        that.option.title.text = newVal.total;
        newVal.data.map(item => {
          that.option.legend.data.push(item.area);
          that.option.series[0].data.push({
            value: item.count,
            name: item.area
          });
        });
      } else {
      }
    }
  },
  components: { CommonWrapper, chart: ECharts },
  methods: {
    getNameCount(name) {
      let result = this.getSeries.data.find(item => {
        return item.area == name;
      });
      if (result) {
        return name + "  " + result.count + "单  " + result.rate + "%";
      } else {
        return name;
      }
    },
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
