<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-05 08:49:00
 * @LastEditTime: 2019-09-05 10:13:39
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="install_container">
    <chart :options="option"
           ref="chartsCategory" />
  </div>
</template>


<script>
import CommonWrapper from '@/components/commonWrapper';
import ECharts from 'vue-echarts/components/ECharts';

import 'echarts/lib/component/polar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/title';
import 'echarts/lib/component/dataZoom';
export default {
  components: { CommonWrapper,chart: ECharts },
  props: {
    getSeries: {
      type: Array,
      default:[]
    },
  },
  data() {
    return {
        option: {
          color: ["#69D3FF","#d3adf7","#adc6ff","#ffadd2", "#b7eb8f", "#87e8de","#91d5ff"],
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:[]
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: {
                type: 'value'
            },
            series: []
        }

    };
  },
  watch: {
    getSeries(newVal) {
      let that = this
        this.option.series = []
        this.option.legend.data = []
        this.option.xAxis.show = false
        this.option.yAxis.show = false
      if(newVal && newVal.length >0){
        this.option.xAxis.show = true
        this.option.yAxis.show = true
        newVal.map(item=>{
          that.option.legend.data.push(item.name)
          that.option.series.push({
                    name:item.name,
                    type:'line',
                    stack: '总量',
                    data:item.data
                })
        })
      }else{

      }
    }
  },
  computed: {},
  methods: {
    initDate(){
            this.$emit('initData',this.searchForm)
    },
    selfAdaption() {
      let _this = this;
      setTimeout(() => {
        window.addEventListener("resize", function() {
          if (_this.$refs.chartsCategory) {
            _this.$refs.chartsCategory.resize();
          }
        });
      }, 10);
    }
  },
  created() {},
  mounted() {
    this.initDate(this.searchForm)
    // this.selfAdaption();
  },
};

</script>
//
<style lang="scss" scoped>
.install_container{
  width:100%;
  height: 100%;
}
.echarts {
  width: 100%;
  height: 100%;
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
