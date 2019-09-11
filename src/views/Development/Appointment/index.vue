<template>
  <div>
    <div>
      <common-wrapper>
        <search
          :merchantList="merchantList"
          :buttonData="buttonData"
          @search="search"
          @multipleChange="multipleChange"
        />
      </common-wrapper>
      <div class="appoint_content">
        <g-map
          ref="gmap"
          :vid="vid"
          :flex="220"
          :thirdMarkers="customerMarker"
          :chooseArea="false"
          :searchArea="false"
          :showCenter="false"
          :multipleChoose="multiple"
          :showAppointBtn="showAppointBtn"
          @appoint="handleBook"
          @choose="handleChoose"
        />
        <div v-if="multiple" class="multipleChoose">
          <multiple-choose
            ref="multipleChoose"
            :show.sync="multiple"
            :orderList="chooseList"
            @updateList="updateList"
            @cancelTap="cancelTap"
          />
        </div>
      </div>
    </div>
    <book-delivery
      :show.sync="isBookFormVisible"
      :orderInfo="selectedOrderInfo"
      @updateList="updateList"
    />
  </div>
</template>

<script>
import moment from "moment";
import CommonWrapper from "@/components/commonWrapper";
import CommonTable from "@/components/commonTable";
import Search from "./Components/Search";
import BookDelivery from "./Components/BookDelivery";
import multipleChoose from "./Components/multipleChoose";
import { setSession, getSession } from "@/utils/session";
import { getAllWithRoleType } from "@/api/common";
import {
  getOrderList,
  getCustomerList,
  getMerchantList,
  getWaybillTypeList,
  getAppointList,
  getMerchantsByAssembly
} from "@/api/order";
import GMap from "@/components/gMap";
import { mixins } from "@/mixins";

export default {
  name: "index",
  mixins: [mixins],
  data() {
    return {
      merchantList: [],
      isListLoading: false,
      tableData: [],
      selectedOrderInfo: {},
      isBookFormVisible: false,
      vid: "appoint",
      customerMarker: [],
      showEmpty: true,
      multiple: false,
      chooseList: [],
      buttonData: [],
      showAppointBtn: false,
      buttonData: []
    };
  },
  mounted() {
    if (!this.$store.getters.roleType.includes("merchant")) {
      this.getMerchantList();
    }
  },
  watch: {
    buttonData: function(newVal, oldVal) {
      if (oldVal.length == 0 && newVal.length) {
        let result = this.buttonData.some(item => {
          return item.resourceUrl == "appointBtn";
        });
        if (result) {
          this.showAppointBtn = true;
        } else {
          this.showAppointBtn = false;
        }
      }
    }
  },
  methods: {
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (row.isException == 1) {
        return "background:#FBFF4F";
      } else {
        return "";
      }
    },
    // 获取订单列表
    getOrderList(params) {
      if (this.multiple) {
        this.chooseList = [];
        this.$refs.multipleChoose.appointList = [];
        this.cancelAllTap();
      }
      this.isListLoading = true;
      getAppointList(params).then(res => {
        if (!res.error) {
          this.customerMarker = [];
          if (!res.length && this.showEmpty) {
            this.$message({
              message: "查询不到订单数据！"
            });
          }
          this.showEmpty = true;
          let markers = [];
          let result = res.map(item => {
            return {
              id: item.id,
              poi: item.location,
              info: [item]
            };
          });
          for (let i = 0; i < result.length; i++) {
            if (result[i]) {
              let marker = {
                id: result[i].id,
                location: result[i].poi,
                info: [{ ...result[i].info[0], parentId: result[i].id }]
              };
              for (let j = i + 1; j < result.length; j++) {
                if (
                  result[i].poi[0] === result[j].poi[0] &&
                  result[i].poi[1] === result[j].poi[1] &&
                  result[i].id != result[j].id
                ) {
                  marker.info = marker.info.concat({
                    ...result[j].info[0],
                    parentId: result[i].id
                  });
                }
              }
              this.customerMarker.push(marker);
            }
          }
        }
      });
    },
    async getMerchantList() {
      await getMerchantsByAssembly().then(res => {
        if (!res.error) {
          this.merchantList = res;
        }
      });
    },
    updateList(show) {
      if (show) {
        this.showEmpty = false;
      } else {
        this.showEmpty = true;
      }
      this.queryList(this.searchParams);
    },
    // 查询和初始化查询
    // 查询/翻页公用方法
    search(params) {
      this.queryList(params);
      this.searchParams = Object.assign({}, params);
    },
    queryList(params) {
      const searchParams = (this.searchParams = params);
      this.getOrderList({
        ...searchParams
      });
    },
    handleBook(row) {
      this.isBookFormVisible = true;
      const { id, projectId } = row;
      this.selectedOrderInfo = { id: id, projectId: projectId };
    },
    typeFormatter(row) {
      let result = this.waybillTypeList.find(item => {
        return row.waybillType == item.code;
      });
      if (result) {
        return result.msg;
      }
    },
    dataFormatter(row, col) {
      if (row[col.property]) {
        return moment(row[col.property]).format("YYYY-MM-DD HH:mm");
      }
    },
    bookFormatter(row) {
      if (row.appointStatus) {
        return row.appointStatus == "0"
          ? "待预约"
          : row.appointStatus == "1"
          ? "预约成功"
          : row.appointStatus == "2"
          ? "预约失败"
          : "未知";
      }
    },
    distributeFormatter(row) {
      if (row.isDistribute) {
        return row.isDistribute == "0"
          ? "待分配"
          : row.isDistribute == "1"
          ? "已分配"
          : "未知";
      }
    },
    multipleChange(value) {
      this.multiple = value;
      if (!value) {
        this.chooseList = [];
        this.cancelAllTap();
      } else {
        this.clearAppointWindow();
      }
    },
    handleChoose(dataList) {
      dataList[0].forEach(data => {
        if (data.choose) {
          data.isCheck = true;
          data.appointRemark = "";
          this.$refs.multipleChoose.$set(
            this.$refs.multipleChoose.appointList,
            this.$refs.multipleChoose.appointList.length,
            data
          );
        } else {
          let list = this.$refs.multipleChoose.appointList;
          let index = list.indexOf(data);
          this.$refs.multipleChoose.appointList.splice(index, 1);
        }
      });
    },
    cancelTap(item) {
      this.$refs.gmap.cancelthirdMarker(item);
    },
    cancelAllTap() {
      this.$refs.gmap.cancelAllthirdMarker();
    },
    clearAppointWindow() {
      this.$refs.gmap.clearAppointWindow();
    }
  },
  components: {
    CommonWrapper,
    CommonTable,
    Search,
    BookDelivery,
    GMap,
    multipleChoose
  }
};
</script>

<style lang="scss" scoped>
.appoint_content {
  height: calc(100vh - 220px);
}
.multipleChoose {
  position: absolute;
  top: 120px;
  left: 90px;
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 25px -10px;
}
</style>
