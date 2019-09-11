<template>
  <div class="amap-container">
    <el-amap-search-box
      v-show="searchArea"
      class="search-box"
      v-model="inputSearch"
      :default="$store.getters.merchantInfo.city"
      :city="$store.getters.merchantInfo.city"
      :search-option="searchOption"
      :on-search-result="onSearchResult"
    ></el-amap-search-box>
    <el-amap
      ref="amap"
      :vid="vid"
      :center="mapCenter"
      :zoom="zoom"
      :rotateEnable="rotateEnable"
      :resizeEnable="resizeEnable"
      :mapStyle="mapStyle"
      :amap-manager="amapManager"
      :plugin="plugin"
      :events="events"
    >
      <div v-show="false" id="panel"></div>
      <!-- 红色中心点 -->
      <el-amap-marker
        v-if="showCenter"
        zIndex="2000"
        class="aaaaa"
        icon="http://calamus-public.oss-cn-beijing.aliyuncs.com/xhe/default_2x-fs.png"
        :position="mapCenter"
      ></el-amap-marker>
      <!-- firstMarkers -->
      <el-amap-info-window
        :position="distributeWindow.position"
        :content="distributeWindow.content"
        :visible="distributeWindow.visible"
        :events="distributeWindow.events"
        :autoMove="distributeWindow.autoMove"
        :isCustom="true"
        showShadow
        :offset="[0, -20]"
      >
        <div
          style="display:flex;background:rgba(255,255,255,1);border-left: 1px solid rgba(233,16,16,1);border-radius: 5px;line-height: 20px;"
        >
          <div
            style="padding: 5px 10px;color: #333333;position: relative;word-break: break-all;max-height:400px;overflow-y:scroll;"
          >
            <div
              v-for="(item, index) in poi.info"
              :key="item.id"
              :class="index == 0 ? '' : 'lineTop'"
              style="width: 350px;"
            >
              <span>序号:{{ item.name }}</span>
              <br />
              <span>订单号:{{ item.waybillNo }}</span>
              <br />
              <span>客户姓名:{{ item.waybillInfo.customerName }}</span>
              <span style="float: right;"
                >电话:{{ item.waybillInfo.customerPhone }}</span
              >
              <br />
              <span>客户地址:{{ item.waybillInfo.fullAddress }}</span>
              <br />
              <span
                >期望送货时间:{{ dateFormatter(item.waybillInfo.deliveryTime)
                }}<br
              /></span>
              <span
                >预约送货时间:{{ dateFormatter(item.waybillInfo.appointTime)
                }}<br
              /></span>
              <span>预约备注:{{ item.waybillInfo.appointRemark }}<br /></span>
            </div>
          </div>
        </div>
      </el-amap-info-window>
      <!-- secondMarkers -->
      <!-- thirdMarkers -->
      <el-amap-info-window
        :bubble="true"
        :position="pointWindow.position"
        :content="pointWindow.content"
        :visible="pointWindow.visible"
        :events="pointWindow.events"
        :autoMove="pointWindow.autoMove"
        :isCustom="true"
        showShadow
        :offset="[0, -40]"
      >
        <div
          style="background:rgba(255,255,255,1);border-left: 1px solid rgba(233,16,16,1);border-radius: 5px;line-height: 20px;"
        >
          <div style="color: #333333;position: relative;word-break: break-all;">
            <div
              v-for="(item, index) in poi"
              :key="item.id"
              :class="index == 0 ? '' : 'lineTop'"
              style="display:flex;width: 350px;"
            >
              <div style="padding:5px 10px;width: 320px;">
                <span v-if="poi.length > 1">序号:{{ index + 1 }}</span>
                <br v-if="poi.length > 1" />
                <span>订单号:{{ item.waybillNo }}</span>
                <span style="float: right;"
                  >服务类型:{{ formatterOrderType(item.orderType) }}</span
                >
                <br />
                <span>客户姓名:{{ item.customerName }}</span>
                <span style="float: right;">电话:{{ item.customerPhone }}</span>
                <br />
                <span>客户地址:{{ item.fullAddress }}</span>
                <br />
                <span v-if="item.appointStatus == '0'"
                  >期望送货时间:{{ dateFormatter(item.deliveryTime) }}<br
                /></span>
                <span v-if="item.appointTime"
                  >预约送货时间:{{ dateFormatter(item.appointTime) }}<br
                /></span>
                <span v-if="item.appointStatus == '1'"
                  >预约备注:{{ item.appointRemark }}<br
                /></span>
              </div>
              <div v-if="item.appointStatus == '0' && showAppointBtn">
                <button
                  style="background:rgba(233,16,16,1);width:32px;height: 100%;color: #ffffff;border: none;cursor: pointer;border-radius: 0 5px 5px 0;"
                  @click="appointEmit(item)"
                >
                  预约
                </button>
              </div>
            </div>
          </div>
        </div>
      </el-amap-info-window>

      <el-amap-marker
        v-for="(marker, index) in firstMarkers"
        :key="index"
        :position="marker.poi"
        :content="setFirstMarkers(marker)"
        :title="marker.address"
        :events="marker.events"
        :zIndex="marker.info.length"
      ></el-amap-marker>
      <el-amap-marker
        zIndex="3000"
        v-for="(marker, index) in secondMarkers"
        :key="index"
        :position="[marker.lng, marker.lat]"
        :content="setSecondMarkers(marker)"
        :events="marker.events"
        :title="marker.plateNo"
      ></el-amap-marker>
      <el-amap-marker
        v-for="(marker, index) in thirdMarkers"
        :key="index"
        :position="marker.location"
        :content="setThirdMarkers(marker)"
        :events="marker.events"
        :zIndex="marker.info.length"
      ></el-amap-marker>
      <el-amap-marker
        cursor="pointer"
        :bubble="bubble"
        :clickable="clickable"
        v-for="(marker, index) in markers"
        :key="index"
        :position="marker.poi"
      ></el-amap-marker>
    </el-amap>
    <div class="input-card" v-if="customMarker">
      <h4>轨迹回放控制</h4>
      <div class="input-item">
        <input
          type="button"
          class="btn"
          value="开始动画"
          id="start"
          @click.stop="startAnimation"
        />
        <input
          type="button"
          class="btn"
          value="暂停动画"
          id="pause"
          @click.stop="pauseAnimation"
        />
      </div>
      <div class="input-item">
        <input
          type="button"
          class="btn"
          value="继续动画"
          id="resume"
          @click.stop="resumeAnimation"
        />
        <input
          type="button"
          class="btn"
          value="停止动画"
          id="stop"
          @click.stop="stopAnimation"
        />
      </div>
    </div>
    <!-- 实时监控 -->
    <div
      v-if="vehicleWindow.visible"
      class="venicle_window"
      :style="{
        left: vehicleWindow.position[0],
        top: vehicleWindow.position[1]
      }"
    >
      <div>
        <div class="vehicle_info">
          <span>{{ poi.plateNo }}车辆在线</span>
        </div>
        <swiper :options="swiperOption" class="vehicle_swiper">
          <swiper-slide
            v-for="(item, index) in poi.transInfos"
            :key="index"
            class="vehicle_swiper_item"
          >
            <span class="">亲，您的订单正在配送过程中，请耐心等待。</span><br />
            <span class="label">订单编号：</span
            ><span>{{ item.waybillNo }}</span
            ><br />
            <span class="label">客户姓名：</span
            ><span>{{ item.waybillInfo.customerName }}</span
            ><br />
            <span class="label">客户电话：</span
            ><span>{{ item.waybillInfo.customerPhone }}</span
            ><br />
            <span class="label">客户地址：</span
            ><span>{{ item.waybillInfo.fullAddress }}</span
            ><br />
            <span class="label">订单编号：</span
            ><span>{{ item.waybillNo }}</span
            ><br />
            <span class="label">司机：</span><span>{{ item.driverName }}</span
            ><br />
            <span v-if="item.installUserList && item.installUserList.length"
              ><span class="label">安装人员：</span
              ><span>{{
                item.installUserList.map(item => item.realName).join("、")
              }}</span
              ><br
            /></span>
            <span class="label">提货时间：</span
            ><span
              >{{ dateFormatter(item.waybillInfo.deliveryTime) }}<br
            /></span>
            <span class="label">订单状态：</span
            ><span>{{ statusFormatter(item.transStatus) }}<br /></span>
            <!-- <span class="label">距离目的地：</span><span>{{}}</span><br> -->
            <span class="label">订单轨迹：</span
            ><span
              class="primary_color"
              @click="goToTrans(item.waybillNo)"
              style="cursor: pointer;"
              >跳转</span
            >
          </swiper-slide>
          <div
            v-if="poi.transInfos.length > 1"
            class="swiper-pagination"
            slot="pagination"
          ></div>
          <div
            v-if="poi.transInfos.length > 1"
            class="swiper-button-prev"
            slot="button-prev"
          ></div>
          <div
            v-if="poi.transInfos.length > 1"
            class="swiper-button-next"
            slot="button-next"
          ></div>
        </swiper>
      </div>
    </div>
  </div>
</template>
<script>
import VueAMap from "vue-amap";
import { lazyAMapApiLoaderInstance, AMapManager } from "vue-amap";
import moment from "moment";
const amapManager = new VueAMap.AMapManager();
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { All_Status_List,Order_Type_list } from "@/utils/ENUM";

/**
 * 高德地图组件
 * ----------------------
 * @Author: Calamus
 * @Date: 2018.09.13
 *
 * @prop {string} [vid= 'amap-demo'] - 地图id，调用多个地图id不能重复
 * @prop {Number} [flex= 0] - 地图高度，默认0为自动填满屏幕
 * @prop {Array}  [center=  [121.59996, 31.197646]] - 中心坐标经纬度
 * @prop {Number} [zoom= 16] - 默认放大比例
 * @prop {Boolean} [rotateEnable= true] - 是否可旋转
 * @prop {Boolean} [resizeEnable= true] - 大小是否根据容器变化自动变化
 * @prop {string} [mapStyle= 'normal'] - 地图风格
 * @prop {Boolean} [chooseArea= true] - 是否展示选择区域范围
 * @event {function} click - 获取点击地图后的坐标和地址中文
 */
function appointEmit() {
  console.log(123123);
}
export default {
  name: "GMap",
  props: {
    // 地图id，调用多个地图id不能重复
    vid: {
      type: String,
      default: "amap-demo"
    },
    flex: {
      type: Number,
      default: 0
    },
    center: {
      type: Array,
      default: () => {
        return [121.59996, 31.197646];
      }
    },
    zoom: {
      type: Number,
      default: 16
    },
    rotateEnable: {
      type: Boolean,
      default: true
    },
    resizeEnable: {
      type: Boolean,
      default: true
    },
    mapStyle: {
      type: String,
      default: "normal"
    },
    chooseArea: {
      type: Boolean,
      default: true
    },
    searchArea: {
      type: Boolean,
      default: true
    },
    showCenter: {
      type: Boolean,
      default: true
    },
    firstMarkers: {
      type: Array,
      default: () => []
    },
    secondMarkers: {
      type: Array,
      default: () => []
    },
    multipleChoose: {
      type: Boolean,
      default: false
    },
    thirdMarkers: {
      type: Array,
      default: () => []
    },
    showAppointBtn: {
      type: Boolean,
      default: false
    },
    drivingable: {
      type: Boolean,
      default: false
    },
    // 途经坐标
    lineArr: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 起点
    lineStart: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 终点
    lineEnd: {
      type: Array,
      default: () => {
        return [];
      }
    },
    showPlanTruck: {
      type: Boolean,
      default: false
    },
    trackStop: {
      type: Boolean,
      default: true
    },
    firstMarkerStyle: {
      // type:Object,
      // default: ()=>{
      //   return {
      //     width:'30px',
      //     color: '#000',
      //     top:'0',
      //     left:'0'
      //   }
      // }
    },
    secondMarkerStyle: {
      type: Object,
      default: () => {
        return {
          width: "30px",
          color: "#000",
          top: "0",
          left: "0"
        };
      }
    },
    heatMapVisible: {
      type: Boolean,
      default: false
    },
    heatmapData: {
      type: Array
    },
    clickable: {
      type: Boolean,
      default: false
    },
    setCity: {
      type: String,
      default: "西安市"
    }
  },
  data() {
    let self = this;
    return {
      statusList: All_Status_List,
      orderTypeList:Order_Type_list,
      swiperOption: {
        autoHeight: true,
        mousewheel: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      amapManager,
      map: null,
      geocoder: null,
      ruler: null,
      mouseTool: null,
      mPolygon: null,
      driving: null, // 轨迹
      fenceArr: [],
      // mapCenter:[],
      myCenter: this.center,
      svgChoose: "",
      bubble: true,
      minHeight: 300,
      loaded: false,
      heatmap: null,
      markers: [],
      inputSearch: "",
      ellipse: {},
      rectangle: {},
      searchOption: {},
      trackArr: [],
      planTruckPath: [],
      customMarker: undefined,
      startMarker: undefined,
      endMarker: undefined,
      pointWindow: {
        position: [0, 0],
        content: "",
        events: {},
        visible: false,
        autoMove: true
      },
      distributeWindow: {
        position: [0, 0],
        content: "",
        events: {},
        visible: false,
        autoMove: true
      },
      vehicleWindow: {
        position: [0, 0],
        visible: false,
        autoMove: true
      },
      poi: {},
      events: {
        init: map => {
          map.getCity(result => {
            console.log("init map", result);
          });

          //热力图
          if (self.heatMapVisible) {
            //初始化heatmap对象
            self.heatmap = new AMap.Heatmap(map, {
              radius: 25, //给定半径
              opacity: [0, 0.8],
              gradient: {
                0.5: "blue",
                0.65: "rgb(117,211,248)",
                0.7: "rgb(0, 255, 0)",
                0.9: "#ffea00",
                1.0: "red"
              }
            });
            self.heatmap.setDataSet({
              data: self.heatmapData
            });
            setTimeout(() => {
              map.setFitView();
            }, 100);
          }
          if (self.drivingable) {
            let len = self.lineArr.length;
            var lineStart = self.lineStart;
            var lineEnd = self.lineEnd;
            // 创建一个 Icon
            var busIcon = new AMap.Icon({
              // 图标尺寸
              size: new AMap.Size(52, 26),
              // 图标的取图地址
              image: "http://superlink.top/bus.png",
              // 图标所用图片大小
              imageSize: new AMap.Size(52, 26)
            });
            if (lineStart.length) {
              self.startMarker = new AMap.Marker({
                map: map,
                position: lineStart,
                icon: "http://superlink.top/startMarker.png",
                offset: new AMap.Pixel(-26, -13)
              });
            }

            if (lineEnd.length) {
              self.endMarker = new AMap.Marker({
                map: map,
                position: lineEnd,
                icon: "http://superlink.top/endMarker.png",
                offset: new AMap.Pixel(-26, -13)
              });
            }

            self.lineArr.forEach(item => {
              let point = new AMap.LngLat(item.lng, item.lat);
              self.trackArr.push(point);
            });
            if (self.trackArr.length && lineStart.length && lineEnd.length) {
              self.customMarker = new AMap.Marker({
                map: map,
                position: lineStart,
                icon: busIcon,
                offset: new AMap.Pixel(-26, -13),
                autoRotation: true
              });
              var passedPolyline = new AMap.Polyline({
                map: map,
                isOutline: true,
                outlineColor: "#ffeeee",
                borderWeight: 2,
                strokeWeight: 5,
                strokeColor: "#3167FF ",
                lineJoin: "round"
              });
              self.customMarker.on("moving", function(e) {
                passedPolyline.setPath(e.passedPath);
              });
              // 开始运动
              if (self.trackStop) {
                console.log("start");
                if (self.lineArr.length > 0) {
                  self.customMarker.moveAlong(self.trackArr, 5000);
                }
              } else {
                console.log("resetStop");
                self.customMarker.stopMove();
              }
              setTimeout(() => {
                map.setFitView();
              }, 100);
            } else {
              setTimeout(() => {
                map.setFitView();
              }, 100);
            }
          }
        },
        movestart: () => {
          this.vehicleWindow.visible = false;
        },
        moveend: () => {},
        zoomchange: e => {},
        click: e => {
          if (this.clickable) {
            this.pointWindow.visible = false;
            let { lng, lat } = e.lnglat;
            this.mapCenter = [lng, lat];
            this.getAddress([lng, lat]);
            let message = self.getAddress([lng, lat]);
            this.$nextTick(() => {});
          }
        }
      },
      plugin: ["DistrictSearch", "Geocoder"]
    };
  },
  mounted() {
    this.initMap();
  },
  computed: {
    flexHeight() {
      var mh =
        document.documentElement.clientHeight - this.flex > this.minHeight
          ? document.documentElement.clientHeight - this.flex
          : this.minHeight;
      return mh + "px";
    },
    mapCenter: {
      get() {
        return this.myCenter;
      },
      set(value) {
        this.myCenter = value;
      }
    }
  },
  watch: {
    center(val) {
      this.myCenter = val;
    },
    firstMarkers(val) {
      let self = this;
      if (val.length) {
        if (val.length == 1) {
          this.myCenter = val[0].poi;
          val[0].events = {
            mouseover: e => {
              if (val[0].info && val[0].info.length) {
                self.poi = val[0];
                self.distributeWindow.position = [e.lnglat.lng, e.lnglat.lat];
                self.distributeWindow.visible = true;
              }
            },
            mouseout: e => {
              self.distributeWindow.visible = false;
            }
          };
        } else {
          let latSum = 0;
          let lngSum = 0;
          val.forEach(poi => {
            let lng = poi.poi[0];
            let lat = poi.poi[1];
            lngSum += lng;
            latSum += lat;
            poi.events = {
              mouseover: e => {
                console.log(e);
                if (poi.info && poi.info.length) {
                  console.log(poi.info);
                  self.poi = poi;
                  self.distributeWindow.position = [e.lnglat.lng, e.lnglat.lat];
                  self.distributeWindow.visible = true;
                }
              },
              mouseout: e => {
                self.distributeWindow.visible = false;
              }
            };
          });
          // this.mapCenter = [lngSum / val.length,latSum / val.length];
        }
        setTimeout(function() {
          let map = amapManager.getMap();
          let markers = map.getAllOverlays("marker");
          map.setFitView(markers);
        }, 100);
      }
    },
    secondMarkers(val) {
      this.vehicleWindow.visible = false;
      if (val.length) {
        val.forEach(item => {
          item.events = {
            click: e => {
              this.vehicleWindow.position = [
                e.pixel.x + "px",
                e.pixel.y + "px"
              ];
              this.vehicleWindow.visible = true;
              this.poi = item;
            }
          };
        });
        if (val.length == 1) {
          this.myCenter = [val[0].lng, val[0].lat];
        } else {
          let latSum = 0;
          let lngSum = 0;
          val.forEach(poi => {
            let lng = poi.lng;
            let lat = poi.lat;
            lngSum += lng;
            latSum += lat;
          });
          // this.mapCenter = [lngSum / val.length,latSum / val.length];
        }
        setTimeout(function() {
          let map = amapManager.getMap();
          let markers = map.getAllOverlays("marker");
          map.setFitView(markers);
        }, 100);
      }
    },
    thirdMarkers(val) {
      this.pointWindow.visible = false;
      let self = this;
      if (val.length) {
        if (val.length == 1) {
          this.myCenter = val[0].location;
          val[0].events = {
            click: e => {
              if (self.multipleChoose) {
                val[0].choose = !val[0].choose;
                val[0].info.forEach(item => {
                  item.choose = val[0].choose;
                });
                this.$forceUpdate();
                this.$emit("choose", [val[0].info, val[0].id]);
              } else {
                self.pointWindow.position = val[0].location;
                self.pointWindow.visible = true;
                self.poi = val[0].info;
              }
            },
            mouseout: e => {
              // self.distributeWindow.visible = false
            }
          };
        } else {
          let latSum = 0;
          let lngSum = 0;
          val.forEach(poi => {
            if (poi.location && poi.location.length) {
              let lng = poi.location[0];
              let lat = poi.location[1];
              lngSum += lng;
              latSum += lat;
              poi.events = {
                click: e => {
                  if (self.multipleChoose) {
                    poi.choose = !poi.choose;
                    poi.info.forEach(item => {
                      item.choose = poi.choose;
                    });
                    this.$forceUpdate();
                    this.$emit("choose", [poi.info, poi.id]);
                  } else {
                    self.pointWindow.position = [lng, lat];
                    self.pointWindow.visible = true;
                    self.poi = poi.info;
                  }
                },
                mouseout: e => {
                  // self.distributeWindow.visible = false
                }
              };
            }
          });
          this.mapCenter = [lngSum / val.length, latSum / val.length];
        }
        setTimeout(function() {
          let map = amapManager.getMap();
          let markers = map.getAllOverlays("marker");
          map.setFitView(markers);
        }, 100);
      }
    },
    lineArr(val) {
      let map = amapManager.getMap();
      val.forEach(item => {
        let point = new AMap.LngLat(item.lng, item.lat);
        this.trackArr.push(point);
      });

      if (
        this.trackArr.length &&
        this.lineStart.length &&
        this.lineEnd.length
      ) {
        var busIcon = new AMap.Icon({
          // 图标尺寸
          size: new AMap.Size(52, 26),
          // 图标的取图地址
          image: "./static/bus.png",
          // 图标所用图片大小
          imageSize: new AMap.Size(52, 26)
        });
        this.customMarker = new AMap.Marker({
          map: map,
          position: this.lineStart,
          icon: busIcon,
          offset: new AMap.Pixel(-26, -13),
          autoRotation: true
        });
        var passedPolyline = new AMap.Polyline({
          map: map,
          isOutline: true,
          outlineColor: "#ffeeee",
          borderWeight: 2,
          strokeWeight: 5,
          strokeColor: "#3167FF ",
          lineJoin: "round"
        });
        this.customMarker.on("moving", function(e) {
          passedPolyline.setPath(e.passedPath);
        });
        // 开始运动
        if (this.trackStop) {
          console.log("start");
          if (this.lineArr.length > 0) {
            this.customMarker.moveAlong(this.trackArr, 5000);
          }
        } else {
          console.log("resetStop");
          this.customMarker.stopMove();
        }
        setTimeout(() => {
          map.setFitView();
        }, 100);
      }
    },
    heatmapData(val) {
      let map = amapManager.getMap();
      if (val) {
        this.heatmap.setDataSet({
          data: val,
          max: 100
        });
        setTimeout(() => {
          map.setFitView();
        }, 100);
      }
    }
  },
  methods: {
    initMap() {
      let self = this;
      // this.mapCenter = this.center ;
      this.geocoder = new AMap.Geocoder({
        radius: 1000,
        extensions: "all"
      });
      // this.getAddress(this.mapCenter,true)
      if (!self.drivingable) {
        this.getLocation(this.$store.getters.merchantInfo.city);
      }
      if (this.firstMarkers.length) {
        let map = amapManager.getMap();
        // setTimeout(() => { map.setFitView() }, 100)
        if (this.firstMarkers.length == 1) {
          this.myCenter = this.firstMarkers[0].poi;
          this.firstMarkers[0].events = {
            mouseover: e => {
              console.log(e);
              if (
                this.firstMarkers[0].info &&
                this.firstMarkers[0].info.length
              ) {
                self.poi = this.firstMarkers[0];
                self.distributeWindow.position = [e.lnglat.lng, e.lnglat.lat];
                self.distributeWindow.visible = true;
              }
            },
            mouseout: e => {
              self.distributeWindow.visible = false;
            }
          };
        } else {
          let latSum = 0;
          let lngSum = 0;
          this.firstMarkers.forEach(poi => {
            let lng = poi.poi[0];
            let lat = poi.poi[1];
            lngSum += lng;
            latSum += lat;
            poi.events = {
              mouseover: e => {
                console.log(e);
                if (poi.info && poi.info.length) {
                  self.poi = poi;
                  self.distributeWindow.position = [e.lnglat.lng, e.lnglat.lat];
                  self.distributeWindow.visible = true;
                }
              },
              mouseout: e => {
                self.distributeWindow.visible = false;
              }
            };
          });
          this.mapCenter = [
            lngSum / this.firstMarkers.length,
            latSum / this.firstMarkers.length
          ];
        }
      }
      if (this.secondMarkers.length) {
        this.vehicleWindow.visible = false;
        let map = amapManager.getMap();
        setTimeout(() => {
          map.setFitView();
        }, 100);
        val.length.forEach(item => {
          item.events = {
            click: e => {
              self.vehicleWindow.position = [
                e.pixel.x + "px",
                e.pixel.y + "px"
              ];
              self.vehicleWindow.visible = true;
              self.poi = item;
            }
          };
        });
        if (this.secondMarkers.length == 1) {
          this.myCenter = [
            this.secondMarkers[0].lng,
            this.secondMarkers[0].lat
          ];
        } else {
          let latSum = 0;
          let lngSum = 0;
          this.secondMarkers.forEach(poi => {
            let lng = poi.lng;
            let lat = poi.lat;
            lngSum += lng;
            latSum += lat;
          });
          this.mapCenter = [
            lngSum / this.secondMarkers.length,
            latSum / this.secondMarkers.length
          ];
        }
      }
      if (this.thirdMarkers.length) {
        this.pointWindow.visible = false;
        let map = amapManager.getMap();
        // setTimeout(() => { map.setFitView() }, 100)
        if (this.thirdMarkers.length == 1) {
          this.myCenter = this.thirdMarkers[0].location;
          this.firstMarkers[0].events = {
            click: e => {
              if (self.multipleChoose) {
                this.firstMarkers[0].choose = !this.firstMarkers[0].choose;
                this.firstMarkers[0].info.forEach(item => {
                  item.choose = this.firstMarkers[0].choose;
                });
                this.$forceUpdate();
                this.$emit("choose", [
                  this.firstMarkers[0].info,
                  this.firstMarkers[0].id
                ]);
              } else {
                self.pointWindow.position = this.thirdMarkers[0].location;
                self.pointWindow.visible = true;
                self.poi = this.thirdMarkers[0].info;
              }
            },
            mouseout: e => {
              // self.distributeWindow.visible = false
            }
          };
        } else {
          let latSum = 0;
          let lngSum = 0;
          this.thirdMarkers.forEach(poi => {
            if (poi.location && poi.location.length) {
              let lng = poi.location[0];
              let lat = poi.location[1];
              lngSum += lng;
              latSum += lat;
              poi.events = {
                click: e => {
                  if (self.multipleChoose) {
                    poi.choose = !poi.choose;
                    poi.info.forEach(item => {
                      item.choose = poi.choose;
                    });
                    this.$forceUpdate();
                    this.$emit("choose", [poi.info, poi.id]);
                  } else {
                    self.pointWindow.position = poi.location;
                    self.pointWindow.visible = true;
                    self.poi = poi.info;
                  }
                },
                mouseout: e => {
                  // self.distributeWindow.visible = false
                }
              };
            }
          });
          this.mapCenter = [
            lngSum / this.firstMarkers.length,
            latSum / this.firstMarkers.length
          ];
        }
      }
      // if(this.setCity){
      //     new AMap.DistrictSearch({
      //         extensions:'all',
      //         subdistrict:0
      //     }).search(this.setCity,function(status,result){
      //         var outer = [
      //             new AMap.LngLat(-360,90,true),
      //             new AMap.LngLat(-360,-90,true),
      //             new AMap.LngLat(360,-90,true),
      //             new AMap.LngLat(360,90,true),
      //         ];
      //         var holes = result.districtList[0].boundaries

      //         var pathArray = [
      //             outer
      //         ];
      //         pathArray.push.apply(pathArray,holes)
      //         var polygon = new AMap.Polygon( {
      //             pathL:pathArray,
      //             //线条颜色，使用16进制颜色代码赋值。默认值为#006600
      //             strokeColor: 'rgb(20,164,173)',
      //             strokeWeight: 4,
      //             //轮廓线透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
      //             strokeOpacity:0.5,
      //             //多边形填充颜色，使用16进制颜色代码赋值，如：#FFAA00
      //             fillColor: 'rgba(0,0,0)',
      //             //多边形填充透明度，取值范围[0,1]，0表示完全透明，1表示不透明。默认为0.9
      //             fillOpacity: 1,
      //             //轮廓线样式，实线:solid，虚线:dashed
      //             strokeStyle:'dashed',
      //             /*勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在
      //             ie9+浏览器有效 取值：
      //             实线：[0,0,0]
      //             虚线：[10,10] ，[10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线
      //             点画线：[10,2,10]， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实
      //             线和10个像素的空白 （如此反复）组成的虚线*/
      //             strokeDasharray:[10,2,10]
      //         });
      //         polygon.setPath(pathArray);
      //         amapManager.getMap().add(polygon);
      //     })
      // }
      setTimeout(() => {
        let map = amapManager.getMap();
        let markers = map.getAllOverlays("marker");
        map.setFitView(markers);
      }, 100);
    },
    // 经纬度返回地址
    getAddress(location, noClicked) {
      var address;
      this.geocoder.getAddress(location, (status, result) => {
        if (status === "complete" && result.info === "OK") {
          if (result && result.regeocode) {
            this.currentAddress = result.regeocode.formattedAddress;
            if (!noClicked) {
              this.$emit("click", {
                lng: location[0],
                lat: location[1],
                result: result.regeocode
              });
            }
            this.$nextTick();
          }
        }
      });
      return this.currentAddress;
    },
    // 地址返回经纬度列表
    getLocation(address) {
      this.geocoder.getLocation(address, (status, result) => {
        if (status === "complete" && result.info === "OK") {
          // result中对应详细地理坐标信息
          let { lng, lat } = result.geocodes[0].location;
          this.currentPosition = [lng, lat];
          this.mapCenter = this.currentPosition;
        }
      });
      return this.currentPosition;
    },
    addMarker: function() {
      let lng = 121.5 + Math.round(Math.random() * 1000) / 10000;
      let lat = 31.197646 + Math.round(Math.random() * 500) / 10000;
      this.markers = [];
      this.markers.push([lng, lat]);
    },
    onSearchResult(pois) {
      console.log("po", this.inputSearch, pois);
      let latSum = 0;
      let lngSum = 0;
      if (pois.length > 0) {
        pois.forEach(poi => {
          let { lng, lat } = poi;
          let address = poi.address;
          lngSum += lng;
          latSum += lat;
          // this.markers = []
          // this.markers.push({'poi': [poi.lng, poi.lat], 'address': address})
        });
        let center = {
          lng: lngSum / pois.length,
          lat: latSum / pois.length
        };
        this.mapCenter = [pois[0].lng, pois[0].lat];
        this.getAddress([pois[0].lng, pois[0].lat]);
        // this.$emit('click', {'lat': pois[0].lng, 'lng': pois[0].lat, 'address': pois[0].name})
      }
      console.log("mar", this.markers);
    },

    setFirstMarkers(marker) {
      return (
        '<div style="position: relative"><img src="https://webapi.amap.com/theme/v1.3/markers/b/mark_bs.png" width="28px" ><div style=' +
        '"' +
        this.firstMarkerStyle.name +
        '"' +
        ">" +
        marker.name +
        "</div><div style=" +
        '"' +
        this.firstMarkerStyle.title +
        '"' +
        ">" +
        marker.title +
        "</div></div>"
      );
    },
    setSecondMarkers(marker) {
      return (
        '<div style="position: relative"><img src="http://superlink.top/busTag.jpg" width="28px" ><div style=' +
        '"' +
        this.secondMarkerStyle.name +
        '"' +
        ">" +
        marker.plateNo +
        "</div><div style=" +
        '"' +
        this.secondMarkerStyle.title +
        '"' +
        "></div></div>"
      );
    },
    setThirdMarkers(marker) {
      let iconImg = marker.choose
        ? "http://calamus-public.oss-cn-beijing.aliyuncs.com/xhe/default_2x-fs.png"
        : "https://webapi.amap.com/theme/v1.3/markers/b/mark_bs.png";
      return `<div style="position: relative"><img src="${iconImg}" width="28px" ><div style="transform: translateX(-50%);margin-left: 14px;word-break: keep-all;border: 1px solid;background: #fff;padding: 2px 5px;">${marker.info[0].customerName}</div></div>`;
    },
    startAnimation() {
      if (this.trackArr.length > 0) {
        this.customMarker.moveAlong(this.trackArr, 5000);
      }
    },
    pauseAnimation() {
      if (this.trackArr.length > 0) {
        this.customMarker.pauseMove();
      }
    },
    resumeAnimation() {
      if (this.trackArr.length > 0) {
        this.customMarker.resumeMove();
      }
    },
    stopAnimation() {
      if (this.trackArr.length > 0) {
        this.customMarker.stopMove();
      }
    },
    dateFormatter(date) {
      return moment(date).format("YYYY-MM-DD HH:mm");
    },
    appointEmit(poi) {
      this.$emit("appoint", poi);
    },
    closeAppointWindow() {
      this.pointWindow.visible = false;
    },
    cancelthirdMarker(marker) {
      let parentId = marker.parentId;
      let parentIndex;
      let parent = this.thirdMarkers.find((item, index) => {
        parentIndex = index;
        return item.id === parentId;
      });
      parent.info.forEach(item => {
        if (item.id == marker.id) {
          item.choose = !item.choose;
        }
      });
      let chooseFlag = parent.info.find(item => {
        return item.choose == true;
      });
      let parentChoose = chooseFlag ? true : false;
      parent.choose = parentChoose;
      this.$set(this.thirdMarkers, parentIndex, parent);
    },
    cancelAllthirdMarker() {
      this.thirdMarkers.forEach((item, index) => {
        item.choose = false;
        item.info.forEach(item2 => {
          item2.choose = false;
        });
        this.$set(this.thirdMarkers, index, item);
      });
    },
    clearAppointWindow() {
      this.pointWindow.visible = false;
    },
    goToTrans(waybillNo) {
      this.$emit("goToTrans", waybillNo);
    },
    statusFormatter(status) {
      var msg = {};
      this.statusList.forEach(item => {
        if (status == item.value) {
          msg = item;
        }
      });
      return msg.label;
    },
    formatterOrderType(orderType){
      var msg = "";
      let result = this.orderTypeList.find(item => {
        return orderType == item.value;
      });
      return result ? result.label : "未知" ;
    },
  },
  components: {
    swiperSlide,
    swiper
  }
};
</script>
<style lang="scss" scoped>
.amap-container {
  position: relative;
  height: 100%;
}
.amap-demo {
  height: 514px;
}
.search-box {
  position: absolute;
  top: 15px;
  left: 70px;
}
.market-choose {
  width: 25px;
  height: 34px;
  color: #e90000;
  background: url(https://www.amap.com/assets/img/poi-marker.png) no-repeat;
  cursor: pointer;
  background-size: 437px 267px;
  background-position: -359px -3px;
}
.svgBtn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 10000;
}
#panel {
  position: fixed;
  top: 10px;
  right: 10px;
  width: 300px;
}
.input-card {
  position: absolute;
  bottom: 10px;
  right: 10px;
}
.amap-info {
  width: 380px;
}
.lineTop {
  border-top: 1px solid;
}
.venicle_window {
  position: absolute;
  width: 400px;
  background: #fff;
  border-left: 1px solid rgba(233, 16, 16, 1);
  border-radius: 5px;
  line-height: 20px;
  color: #333333;
  word-break: break-all;
  .vehicle_info {
    padding-left: 25px;
    color: #409eff;
  }
  .vehicle_swiper {
    .vehicle_swiper_item {
      width: 300px;
      padding: 0 25px;
      .label {
        display: inline-block;
        width: 75px;
      }
    }
    .swiper-button-prev,
    .swiper-button-next {
      width: 25px;
      height: 20px;
    }
  }
}
</style>
