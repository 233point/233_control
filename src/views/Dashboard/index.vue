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
      <order-stat :statData="statData" :pingfen="pingfen"/>
      <el-row>
        <el-col :span="16">
          <!-- 当日配装进度 -->
          <common-wrapper
            class="chart-container"
            :border="false"
            :radius="false"
          >
            <el-row>
              <p class="chart-title">订单信息</p>
            </el-row>
            <chart-install
              :getSeries="mulitstatData"
              @initDate="waybillmulitstat"
            ></chart-install>
          </common-wrapper>
        </el-col>
        <el-col :span="8">
          <!-- 区域订单量 -->
          <common-wrapper
            class="chart-container"
            :border="false"
            :radius="false"
          >
            <el-row>
              <p class="chart-title">服务排行榜</p>
            </el-row>
            <merchants-list
              :driverData="driverData"
              :plateNoData="plateNoData"
              @initData="serviceRankingList"
            >
            </merchants-list>
          </common-wrapper>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <!-- 配装进度 -->
          <common-wrapper
            class="chart-container"
            :border="false"
            :radius="false"
          >
            <el-row type="flex" align="center" justify="space-between">
              <el-col :span="24">
                <p class="chart-title">配装进度</p>
                <el-select v-model="waybillStat.merchantId" @change="merchantChange" v-if="!$store.getters.roleType.includes('merchant')" filterable placeholder="请选择商户">
                  <el-option
                    v-for="(item, index) in merchantList"
                    :key="index"
                    :label="item.merchantName"
                    :value="item.merchantId"
                  />
                </el-select>
              </el-col>
            </el-row>
            <Install-progress
              :getSeries="transProgressData"
            ></Install-progress>
          </common-wrapper>
        </el-col>
        <el-col :span="8">
          <!-- 订单分布情况 -->
          <common-wrapper
            class="chart-container"
            :border="false"
            :radius="false"
          >
            <el-row type="flex" align="center" justify="space-between">
              <el-col :span="24">
                <p class="chart-title">订单分布情况</p>
                <el-select v-model="waybillStat.merchantId" @change="merchantChange" v-if="!$store.getters.roleType.includes('merchant')" filterable placeholder="请选择商户">
                  <el-option
                    v-for="(item, index) in merchantList"
                    :key="index"
                    :label="item.merchantName"
                    :value="item.merchantId"
                  />
                </el-select>
              </el-col>
            </el-row>
            <chart-fenbu
              :getSeries="waybillStatByAreaData"
            ></chart-fenbu>
          </common-wrapper>
        </el-col>
        <el-col :span="8">
          <!-- 客户热力图 -->
          <common-wrapper
            class="chart-container"
            :border="false"
            :radius="false"
            v-if="$store.getters.roleType.includes('merchant')"
          >
            <el-row type="flex" align="center" justify="space-between">
              <el-col :span="24">
                <p class="chart-title">客户热力图</p>
              </el-col>
            </el-row>
            <div class="heat_map">
              <heat-map
                @initData="getHeartmapList"
                :heatmapData="heatmapData"
              ></heat-map>
            </div>
          </common-wrapper>
          <!-- 商户订单数 -->
          <common-wrapper v-else class="chart-container"  :border="false">
            <el-row
              type="flex"
              align="center"
              justify="space-between"
            >
              <el-col :span="24">
                <p class="chart-title">商户订单数</p>
              </el-col>
            </el-row>
            <div class="heat_map">
              <charts-category @initData="getMerchantsbills" :getSeries="categoryData"></charts-category>
            </div>
          </common-wrapper>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <!-- 客户评价 -->
          <common-wrapper
            class="chart-container"
            :border="false"
            :radius="false"
          >
            <el-row type="flex" align="center" justify="space-between">
              <el-col :span="24">
                <p class="chart-title customer_evalute">客户评价</p>
                <el-date-picker
                  v-model="customerSearch.date"
                  @change="cStatSatisfyByWaybillType"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
                <!-- <el-select v-model="customerSearch.merchantId" v-if="!$store.getters.roleType.includes('merchant')" filterable placeholder="请选择商户">
                  <el-option
                    v-for="(item, index) in merchantList"
                    :key="index"
                    :label="item.merchantName"
                    :value="item.merchantId"
                  />
                </el-select> -->
              </el-col>
            </el-row>
            <customer
              :questionData="questionData"
              :customerData="customerData"
              @initData="cStatSatisfyByWaybillType"
            ></customer>
          </common-wrapper>
        </el-col>
      </el-row>
    </common-content>
  </div>
</template>

<script>
/**
 * Dashboard Module
 * ----------------------
 * Author: zhou qi
 * Date: 2018.03.20
 */
import store from "@/store";
import moment from "moment";
import { mapGetters } from "vuex";
import { baseTheme } from "@/utils/theme";
import CommonWrapper from "@/components/commonWrapper";
import CommonTable from "@/components/commonTable";
import CommonContent from "@/components/commonContent";
import ChartAll from "./Components/charts-all";
import ChartInstall from "./Components/charts-install";
import InstallProgress from "./Components/install-progress";
import ChartWaybill from "./Components/charts-waybill";
import ChartFenbu from "./Components/fenbu";
import ChartFinish from "./Components/finish";
import ChartStar from "./Components/star";
import OrderStat from "./Components/stat";
import MerchantsList from "./Components/merchantList";
import Welcome from "./Components/Welcome";
import HeatMap from "./Components/heatMap";
import Customer from "./Components/customer";
import ChartsCategory from "./Components/charts-category";

// api
import {
  userindicatorscollection,
  waybillmulitstat,
  serviceRankingList,
  cStatSatisfyByWaybillType,
  cQuestionPointStat,
  getHeartmap,
  transProgress,
  getWaybillStatByArea,
  merchantsbills,
  getAverageSatisfactionByRoleType,
  getTransProgress,
  plateNoList,
  driverList

} from "@/api/dashboard";
import { setSession, getSession } from "@/utils/session";
import { getTreeNode } from "@/utils/generateTree";
import { getMerchantsByAssembly } from "@/api/order";
export default {
  name: "Dashboard",
  components: {
    Welcome,
    OrderStat,
    MerchantsList,
    CommonWrapper,
    CommonTable,
    Customer,
    HeatMap,
    CommonContent,
    ChartWaybill,
    ChartInstall,
    InstallProgress,
    ChartAll,
    ChartFenbu,
    ChartFinish,
    ChartStar,
    ChartsCategory
  },
  data() {
    return {
      waybillCount: 0,
      statData: {
        abnormalCount: 0,
        distributeCount: 0,
        finishedCount: 0,
        receiveCount: 0,
        cumulativeOrder: 0,
        driverCount: 0,
        serviceScore: 0,
        waybillOfToday: 0,
        waybillRank: "",
        merchantCount: 0,
        accumulatedReceipt: 0,
        todayWaybillCount:0
      },
      pingfen:"0",
      customerSearch: {
        date: null,
        startTime: '',
        endTime: ''
      },
      waybillStat:{
        merchantId:''
      },
      transProgress:{
        merchantId:''
      },
      questionData: [],
      customerData: [],
      transProgressData: [],
      merchantList: [],
      mulitstatData: [],
      heatmapData: [],
      serviceRankingData: [],
      mapCenter: [121.59996, 31.197646],
      waybillAllList: {},
      waybillStatByAreaData: {},
      transProgressList: [],
      categoryData:[],
      plateNoData:[],
      driverData:[],
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
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["systemTheme"]),
    systemColor() {
      return baseTheme[this.systemTheme];
    }
  },
  mounted() {
    this.getWaybillStatList()
    this.initStat();
  },
  activated() {
    this.initStat();
  },
  methods: {
    //获取商户
    getMerchantsByAssembly() {
      return new Promise((resolve, reject) => {
        getMerchantsByAssembly({}).then(res => {
           if(!res.error) {
              this.merchantList = res;
              resolve()
            }
        })
      })
    },
    async initStat() {
       if (!this.$store.getters.roleType.includes("merchant")) {
        await this.getMerchantsByAssembly();
        if(this.merchantList && this.merchantList.length>0){
          this.waybillStat.merchantId = this.merchantList[0].merchantId
        }
      }else{
        this.waybillStat.merchantId = this.$store.getters.userId
      }
      this.getTransProgressList()
      this.getWaybillStatByAreaList()
    },
    merchantChange(){
      this.getTransProgressList()
      this.getWaybillStatByAreaList()
    },
    //司机、今日订单和各状态订单数统计
    getWaybillStatList() {
      userindicatorscollection().then(res => {
        if (!res.error) {
          this.statData = res;
        }
      });
      getAverageSatisfactionByRoleType().then(res => {
        if (!res.error) {
          this.pingfen = res.averageSatisfaction;
        }
      })
    },
    //订单信息柱状图
    waybillmulitstat(params) {
      waybillmulitstat(params).then(res => {
        if (!res.error) {
          this.mulitstatData = res;
        }
      });
    },
    //服务排行榜
    serviceRankingList() {
      plateNoList().then(res => {
        if(!res.error){
          this.plateNoData = res;
        }
      })
      driverList().then(res => {
        if(!res.error){
          this.driverData = res;
        }
      })
    },
    //客户满意度，问题统计
    cStatSatisfyByWaybillType() {
      let params = this.customerSearch;
      if (params.date && params.date.length) {
        params.startTime = params.date[0];
        params.endTime = params.date[1];
      } else {
        params.startTime = params.endTime = '';
      }
      cStatSatisfyByWaybillType({ ...params }).then(res => {
        if (!res.error) {
          this.customerData = res;
        }
      });
      cQuestionPointStat({ ...params }).then(res => {
        if (!res.error) {
          this.questionData = res;
        }
      });
    },

    // 获取客户热力图
    getHeartmapList(params) {
      getHeartmap(params).then(res => {
        if (!res.error) {
          this.heatmapData = res.customerLocationVoList;
          let a = res.location[0];
          let b = res.location[1];
          this.mapCenter = [Math.max(a, b), Math.min(a, b)];
        }
      });
    },
    // 获取当日配装进度
    getTransProgressList() {
      getTransProgress(this.waybillStat).then(res => {
        if (!res.error) {
          this.transProgressData = res;
        }
      });
    },
    // 获取订单总量  this.waybillCount   countType
    getWaybillStatByDayList(params) {
      let data = {
        countType: this.waybillCount
      };
      params = Object.assign(params, data);
      getWaybillStatByDay(params).then(res => {
        if (!res.error) {
          this.waybillAllList = res;
        }
      });
    },
    // 区域订单量
    getWaybillStatByAreaList() {
      getWaybillStatByArea(this.waybillStat).then(res => {
        if (!res.error) {
          this.waybillStatByAreaData = res;
        }
      });
    },
    getMerchantsbills(){
      merchantsbills().then(res => {
        if (!res.error) {
          this.categoryData = res;
        }
      });
    },
    waybillAllChange() {
      this.getWaybillStatByDayList(params);
    },
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
    background: $base-light-color;
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
    border: 1px solid darken($base-light-color, 12%);
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
        border-right: 1px solid darken($base-light-color, 12%);
        border-bottom: 1px solid darken($base-light-color, 12%);
        box-sizing: border-box;
        height: 35px;

        &:last-child {
          border-bottom: none;
        }
        &.header {
          height: 35px;
          background: $base-light-color;
        }

        &.yesterday,
        &.today {
          padding: 10px 0;
          font-size: 1.4rem;
        }

        &.yesterday {
          font-size: 1.3rem;
          color: lighten($base-dark-color, 25%);
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
  border-bottom: 1px solid $base-light-color;

  .last-uppdate-time {
    display: inline-block;
    margin-left: 8px;
    font-size: 0.9rem;
    color: $base-gray-color;
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
