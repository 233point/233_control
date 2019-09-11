<!--
 * @Description: In User Settings Edit
 * @Author: Calamus
 * @Date: 2019-08-12 14:24:00
 * @LastEditTime: 2019-08-14 15:35:08
 * @LastEditors: Please set LastEditors
 -->
<template>
  <common-content class="mercure_template" :flex="100">
    <el-row>
      <el-col :span="8">
        <time-line :list="trailInfos"></time-line>
      </el-col>
      <el-col :span="16">
        <g-map
          class="gmap"
          v-if="mapVisible"
          :flex="270"
          vid="trackMap"
          :drivingable="true"
          :lineArr="lineArr"
          :lineStart="lineStart"
          :lineEnd="lineEnd"
          :trackStop="showMap"
          :chooseArea="false"
          :searchArea="false"
          :showCenter="false"
        />
      </el-col>
    </el-row>
  </common-content>
</template>
<script>
/**
 * MercureTemplate
 * ----------------------
 * Author: Calamus
 * Date: 2019.05.15
 */
// validate
import Validator from "@/utils/extendValidate/extendValidate";
import TransferHeader from "@/components/TransferHeader";
import CommonContent from "@/components/commonContent";
import moment from "moment";
import TimeLine from "@/components/timeline";
import GMap from "@/components/gMap";
// api
import { updateUser } from "@/api/user";
import { Order_Status_List } from "@/utils/ENUM";
import CommonTable from "@/components/commonTable";
import { getInstallDetail, getTransInfoDetail } from "@/api/datareport";

const initFrom = {
  productName: "",
  productShortName: "",
  productOperLogs: [],
  productContent: "",
  disPrice: "",
  prePrice: "",
  productStatus: "",
  createUserId: ""
};

export default {
  name: "Detail",
  components: {
    TransferHeader,
    CommonContent,
    CommonTable,
    TimeLine,
    GMap
  },
  data() {
    return {
      isVisible: false,
      orgnization: [],
      form: {},
      options: [],
      statusList: Order_Status_List,
      trailInfos: [],
      // map
      showMap: true,
      mapVisible: true,
      lineEnd: [],
      lineStart: [],
      lineArr: []
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "add"
    },
    info: {
      type: Object,
      default: null
    }
  },
  watch: {
    info: {
      handler(newValue, oldValue) {
        this.form = JSON.parse(JSON.stringify(newValue));
        this.getTransInfo({ waybillNo: this.form.waybillNo });
      },
      deep: true
    }
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.info));
    this.getTransInfo({ waybillNo: this.form.waybillNo });
  },
  methods: {
    getTransInfo(params) {
      this.isTransListLoading = true;
      getTransInfoDetail(params).then(res => {
        if (!res.error) {
          this.isTransListLoading = false;
          this.transInfoData = res.transInfo;
          console.log(this.transInfoData.deliveryInfo);
          this.trailInfos = res.trailInfos;
          this.trailGps = res.gpsInfos;

          let lineArr = [];
          this.lineArr = [];
          if (
            this.transInfoData.waybillInfo &&
            this.transInfoData.waybillInfo.productList.length > 0
          ) {
            // this.lineStart = [Number(this.transInfoData.pickPointInfo.lng), Number(this.transInfoData.pickPointInfo.lat)]
            this.lineStart = [
              Number(
                this.transInfoData.waybillInfo.productList[0].deliveryPoint.lng
              ),
              Number(
                this.transInfoData.waybillInfo.productList[0].deliveryPoint.lat
              )
            ];
          }
          if (this.transInfoData.customerPointInfo) {
            this.lineEnd = [
              Number(this.transInfoData.customerPointInfo.lng),
              Number(this.transInfoData.customerPointInfo.lat)
            ];
          }
          if (res.gpsInfos.length >= 1) {
            res.gpsInfos.forEach(item => {
              lineArr.push(item);
            });
            this.lineArr = [].concat(lineArr);
          }
        }
      });
    },
    formatterStatus(status) {
      var msg = {
        label: "待接单",
        value: "0",
        percentage: 0,
        color: ""
      };
      this.statusList.map(item => {
        if (status == item.value) {
          msg = item;
        }
      });
      return msg;
    },
    timeFormatter(time) {
      if (time) {
        return moment(time).format("YYYY-MM-DD HH:mm");
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mercure_template {
  width: 100%;
}
</style>
