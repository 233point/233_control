<template>
  <div>
    <chart v-if="isVisible" :options="option" ref="chartsAll" />

    <p class="echarts_empty">
      <span style="color:rgba(190,214,46,1)"></span>
      <br />
      <span class="echarts_empty_text">暂无数据</span>
    </p>
  </div>
</template>

<script>
import CommonWrapper from "@/components/commonWrapper";
import moment from "moment";
import ECharts from "vue-echarts/components/ECharts";
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/component/polar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/legend";
import "echarts/lib/component/title";
import "echarts/lib/component/dataZoom";

export default {
  name: "InstallDetail",
  data() {
    const mh =
      document.documentElement.clientHeight - this.flex > this.minHeight
        ? document.documentElement.clientHeight - this.flex
        : 200;
    return {
      flexHeight: mh + "px",
      isVisible: true,
      option: {
        color: [
          "#11bbcc",
          "#444487",
          "#99557b",
          "#d3565a",
          "#66bbaa",
          "#ee7963"
        ],
        toolbox: {
          show: true,
          right: 20,
          feature: {
            saveAsImage: { show: true }
          }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(params) {
            var tar = params[0];
            return tar.name + " : " + tar.value + "%";
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: []
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [],
            type: "bar",
            barWidth: 50,
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: "{c}%"
              }
            }
          }
        ]
      }
    };
  },
  props: {
    show: {
      type: Boolean
    },
    getSeries: {
      type: Array
    },
    searchParams: {
      type: Object
    },
    flex: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    this.selfAdaption();
  },
  watch: {
    getSeries: {
      handler(newVal, oldVal) {
        let params = JSON.parse(JSON.stringify(newVal));
        this.option.xAxis.data = ["配送", "安装", "售后维修", "总计"];
        let arr = [];
        params.forEach((item, index) => {
          arr.push(Number(item.satisfyDegree.replace(/%/, "")));
        });
        this.option.series[0].data = arr;
      }
    }
  },
  methods: {
    dealDate(date) {
      if (date) {
        return moment(date).format("YYYY-MM-DD");
      } else {
        return "";
      }
    },
    dealTime(date) {
      return moment(date).format("YYYY-MM-DD HH:mm");
    },
    dealNum(num) {
      if (num != "") {
        return parseFloat(num).toFixed(2);
      } else {
        return 0;
      }
    },
    timeFormatter(time) {
      if (time) {
        return moment(time).format("YYYY-MM-DD HH:mm");
      }
    },
    selfAdaption() {
      let _this = this;
      setTimeout(() => {
        window.addEventListener("resize", function() {
          if(_this.$refs.chartsAll){
            _this.$refs.chartsAll.resize();
          }
        });
      }, 10);
    }
  },
  components: {
    CommonWrapper,
    chart: ECharts
  }
};
</script>

<style lang="scss" scoped>
.echarts {
  width: 100;
  height: 300px;
}
.echarts_empty {
  position: relative;
  width: 100;
  height: 300px;
  .echarts_empty_text {
    position: absolute;
    left: 50;
    top: 50;
    -webkit-transform: translate(-50, -50);
    transform: translate(-50, -50);
    color: #909399;
  }
}
</style>
