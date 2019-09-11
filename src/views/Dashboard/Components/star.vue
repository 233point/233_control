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
        color: ["#3EAFF7", "#F5B366", "#4FDAD2", "#F3D38C", "#C9F0F4"],
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar"
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
    // getSeries(newVal) {
    //   if(newVal && newVal.length > 0){
    //     this.option.xAxis[0].data = []
    //     this.option.xAxis[0].show = true
    //     this.option.yAxis[0].show = true
    //     this.option.series[0].data = []
    //     if(newVal.length >= 6){
    //       this.option.dataZoom[0].show = true ;
    //     }else{
    //       this.option.dataZoom[0].show = false ;
    //     }
    //     newVal.map(item => {
    //       this.option.xAxis[0].data.push(item.day)
    //       this.option.series[0].data.push(item.count)
    //     })
    //   }else{
    //     this.option.xAxis[0].data = []
    //     this.option.series[0].data = []
    //     this.option.xAxis[0].show = false
    //     this.option.yAxis[0].show = false
    //     this.option.dataZoom[0].show = false ;
    //   }
    // }
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
