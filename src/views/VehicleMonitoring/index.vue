<template>
  <div class="vehicle_moniter">
    <common-wrapper>
      <search
        class="search"
        @search="getVehicleAndPosition"
        @rest="getVehicleAndPosition"
      />
    </common-wrapper>
    <div class="vehicle_content">
      <div class="vehicle_map">
        <g-map
          :vid="vid"
          :center="center"
          :secondMarkers="markers"
          :secondMarkerStyle="markerStyle"
          :chooseArea="false"
          :searchArea="false"
          :showCenter="false"
          @goToTrans="goToTrans"
        />
      </div>

      <div class="vehicle_list">
        <div>
          <el-form>
            <el-form-item label="定时刷新">
              <el-select v-model="timerDuration">
                <el-option
                  v-for="item in timerOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div
          v-for="item in vehicleList"
          :key="item.busId"
          class="vehicle_item"
          :class="selectVehicle == item.busId ? 'vehicle_choosed' : ''"
          @click="chooseVehicle(item)"
        >
          <span
            :class="item.isRunning == '0' ? 'running' : 'stopping'"
            class="vehicle_state"
            >●</span
          >
          <span>{{ item.plateNo }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import GMap from "@/components/gMap";
import CommonWrapper from "@/components/commonWrapper";
import CommonTable from "@/components/commonTable";
import Search from "./Components/Search";
import { setSession, getSession } from "@/utils/session";
import { generateTree, getTreeNode } from "@/utils/generateTree";
import { getBusList, getDriverGps } from "@/api/vehicleManagement";

export default {
  name: "VehicleMonitoring",
  data() {
    return {
      tableData: [],
      isLoading: false,
      center: undefined,
      vid: "amap",
      markers: [],
      markerStyle: {
        name:
          "position:absolute;left:50%;transform:translate(-50%,0);white-space:nowrap;border:1px solid;padding:3px;background-color:#fff;"
      },
      pagination: {
        // 翻页数据
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      vehicleList: [],
      selectVehicle: "",
      allMarkers: [],
      time: null,
      getDriverGpsParams: [],
      refreshCondation: "all",
      timerDuration: 60,
      timerOptions: [
        {
          value: 5,
          label: "每5秒"
        },
        {
          value: 10,
          label: "每10秒"
        },
        {
          value: 60,
          label: "每分钟"
        },
        {
          value: 300,
          label: "每5分钟"
        },
        {
          value: false,
          label: "不刷新"
        }
      ]
    };
  },
  watch: {
    timerDuration(val) {
      clearInterval(this.time);
      if (!val) {
      } else {
        if (this.refreshCondation == "all") {
          this.time = setInterval(() => {
            this.getVehiclePosition();
          }, val * 1000);
        } else {
          this.time = setInterval(() => {
            this.getDriverGps(this.getDriverGpsParams);
          }, val * 1000);
        }
      }
    }
  },
  mounted() {},
  beforeDestroy() {
    //清除定时器
    clearInterval(this.time);
  },
  methods: {
    async getVehicleAndPosition(params) {
      clearInterval(this.time);
      await this.getvehicleList(params);
      this.getVehiclePosition();
      this.refreshCondation = "all";
      this.time = setInterval(() => {
        this.getVehiclePosition();
      }, this.timerDuration * 1000);
    },
    // 获取车辆列表
    getvehicleList(params) {
      return new Promise((resolve, reject) => {
        getBusList(params).then(res => {
          if (!res.error) {
            this.vehicleList = res;
            resolve();
          }
        });
      });
    },
    //获取车辆位置
    getVehiclePosition() {
      let params = [];
      this.vehicleList.forEach(item => {
        if (item.isRunning == "0") {
          params.push({
            driverId: item.driverId,
            driverName: item.driverName,
            plateNo: item.plateNo
          });
        }
      });
      this.updateParams = params;
      this.getDriverGps(params);
    },
    getDriverGps(params) {
      // this.updateParams = params
      getDriverGps({ driverIds: params }).then(res => {
        if (!res.error) {
          let righttrucks = res.filter(item => {
            return item.lng && item.lat;
          });
          righttrucks.forEach(item => {
            this.vehicleList.forEach(item2 => {
              if (item2.driverId == item.driverId && item.lng && item.lat) {
                item.transInfos = item2.transInfos;
              }
            });
          });
          this.markers = righttrucks;
        }
      });
      // setInterval(this.getDriverGps(params),5000)
    },
    chooseVehicle(bus) {
      if (bus.isRunning == "0") {
        this.getDriverGpsParams = [];
        if (bus.isRunning && this.selectVehicle != bus.busId) {
          this.selectVehicle == bus.busId;
          // this.markers = this.allMarkers.filter( item => item.driverId == bus.driverId)
          let params = [
            {
              driverId: bus.driverId,
              driverName: bus.driverName,
              plateNo: bus.plateNo
            }
          ];
          this.getDriverGpsParams = params;
          this.getDriverGps(params);
          clearInterval(this.time);
          this.refreshCondation = "one";
          this.time = setInterval(() => {
            this.getDriverGps(params);
          }, this.timerDuration * 1000);
        }
      } else {
      }
    },
    goToTrans(waybillNo) {
      this.$router.push({
        name: "Transport",
        params: { waybillNo: waybillNo }
      });
    }
  },
  components: {
    VuePerfectScrollbar,
    Search,
    GMap,
    CommonWrapper,
    CommonTable
  }
};
</script>

<style lang="scss" scoped>
.vehicle_moniter {
  .vehicle_content {
    display: flex;
    .vehicle_map {
      height: calc(100vh - 250px);
      flex: 1 1 auto;
    }
    .vehicle_list {
      flex: 0 0 200px;
      padding: 0 10px;
      .vehicle_item {
        line-height: 20px;
        .vehicle_state {
          font-size: 20px;
        }
      }
      > div {
        cursor: pointer;
        padding: 2px 0;
      }
      > div:hover {
        background: #f5f7fa;
      }
      div.vehicle_choosed {
        background: #f5f7fa;
      }
      .running {
        color: #67c23a;
      }
      .stopping {
        color: #909399;
      }
    }
  }
}
</style>
