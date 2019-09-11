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
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["未央区", "雁塔区", "莲湖区", "碑林区", "长安区"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 335, name: "未央区" },
              { value: 310, name: "雁塔区" },
              { value: 234, name: "莲湖区" },
              { value: 135, name: "碑林区" },
              { value: 1548, name: "长安区" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
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
