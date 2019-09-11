<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 17:00:09
 * @LastEditTime: 2019-08-16 18:37:15
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="form_box">
    <el-form
      ref="orderForm"
      :model="orderForm"
      :rules="orderRule"
      label-width="80px"
    >
      <el-row>
        <el-form-item v-if="showDriveruser" label="司机" prop="driverId" class="multiple_search_box">
          <el-select
            class="multiple_select1"
            @change="driverTypeChange"
            v-model="driverType"
            placeholder="请选择"
          >
            <el-option label="自有司机" value="0"></el-option>
            <el-option
              v-if="$store.getters.roleType == 'carrier'"
              label="社会司机"
              value="1"
            ></el-option>
            <!-- <el-option v-if="$store.getters.roleType == 'merchant'" label="合作司机" value="1"></el-option> -->
          </el-select>
          <el-select
            v-model="orderForm.driverId"
            @change="driverChange"
            class="multiple_select2"
            filterable
            placeholder="请选择司机"
          >
            <el-option
              v-for="item in driverList[driverType]"
              :key="item.id"
              :label="item.realName"
              :value="item.useruuid"
            />
          </el-select>
        </el-form-item>
      </el-row>
      <el-row v-if="showDriveruser">
        <el-form-item label="车辆" prop="busId">
          <el-select
            class="w100p"
            v-model="orderForm.busId"
            filterable
            placeholder="请选择车辆"
          >
            <el-option
              v-for="item in truckList"
              :key="item.id"
              :label="item.plateNo"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
      </el-row>
      <el-row v-if="showInstalluser">
        <el-form-item label="安装人员" prop="installUserList">
          <el-select
            class="w100p"
            v-model="orderForm.installUserList"
            :multiple-limit="1"
            value-key="id"
            multiple
            filterable
            placeholder="请选择安装人员"
          >
            <el-option
              v-for="item in installUserList"
              :key="item.id"
              :label="item.realName"
              :value="item"
            />
          </el-select>
        </el-form-item>
      </el-row>
      <el-row v-if="showDriveruser">
        <el-form-item label="发车时间" prop="departTime">
          <el-date-picker
            class="w100p"
            placeholder="请选择发车时间"
            v-model="orderForm.departTime"
            align="right"
            format="yyyy-MM-dd HH:mm"
            type="datetime"
            size="mini"
            :picker-options="pickerOptions"
            clearable
          >
          </el-date-picker>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="备注" prop="transRemark">
          <el-input
            class="w100p"
            v-model="orderForm.transRemark"
            type="textarea"
            :autosize="{ maxRows: 2 }"
            maxlength="200"
            resize="none"
          ></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="订单列表" prop="waybillList"> </el-form-item>
        <div class="appoint_list">
          <el-divider
            v-if="
              disList.filter(order => {
                return order.waybillInfo.orderType == '0';
              }).length > 0
            "
            content-position="left"
          >
            <p>配送订单</p>
          </el-divider>
          <div
            v-for="(item, index) in disList.filter(order => {
              return order.waybillInfo.orderType == '0';
            })"
            :class="index == 0 ? '' : 'appoint_item'"
            :key="index"
          >
            <el-checkbox v-model="item.choose"> </el-checkbox>
            <div class="check_content">
              <div>
                <span>{{ item.waybillNo }}</span
                ><span
                  class="transStatus"
                  :class="item.transStatus == '0' ? 'fenpai' : 'jiedan'"
                  >●{{ transStatusFormatter(item.transStatus) }}</span
                ><span>
                  {{formatterOrderType(item.waybillInfo.orderType)}}
                </span>
              </div>
              <div class="customer_info">
                <span class="customer_name">{{
                  item.waybillInfo.customerName
                }}</span
                ><span>{{ item.waybillInfo.fullAddress }}</span>
              </div>
            </div>
          </div>
          <el-divider
            v-if="
              disList.filter(order => {
                return order.waybillInfo.orderType == '1';
              }).length > 0
            "
            content-position="left"
          >
            <p>配送及安装订单</p>
          </el-divider>
          <div
            v-for="(item, index) in disList.filter(order => {
              return order.waybillInfo.orderType == '1';
            })"
            :class="index == 0 ? '' : 'appoint_item'"
            :key="index"
          >
            <el-checkbox v-model="item.choose"> </el-checkbox>
            <div class="check_content">
              <div>
                <span>{{ item.waybillNo }}</span
                ><span
                  class="transStatus"
                  :class="item.transStatus == '0' ? 'fenpai' : 'jiedan'"
                  >●{{ transStatusFormatter(item.transStatus) }}</span
                ><span>
                  {{formatterOrderType(item.waybillInfo.orderType)}}
                </span>
              </div>
              <div class="customer_info">
                <span class="customer_name">{{
                  item.waybillInfo.customerName
                }}</span
                ><span>{{ item.waybillInfo.fullAddress }}</span>
              </div>
            </div>
          </div>
          <el-divider
            v-if="
              disList.filter(order => {
                return order.waybillInfo.orderType == '2';
              }).length > 0
            "
            content-position="left"
          >
            <p>安装订单</p>
          </el-divider>
          <div
            v-for="(item, index) in disList.filter(order => {
              return order.waybillInfo.orderType == '2';
            })"
            :class="index == 0 ? '' : 'appoint_item'"
            :key="index"
          >
            <el-checkbox v-model="item.choose"> </el-checkbox>
            <div class="check_content">
              <div>
                <span>{{ item.waybillNo }}</span
                ><span
                  class="transStatus"
                  :class="item.transStatus == '0' ? 'fenpai' : 'jiedan'"
                  >●{{ transStatusFormatter(item.transStatus) }}</span
                ><span>
                  {{formatterOrderType(item.waybillInfo.orderType)}}
                </span>
              </div>
              <div class="customer_info">
                <span class="customer_name">{{
                  item.waybillInfo.customerName
                }}</span
                ><span>{{ item.waybillInfo.fullAddress }}</span>
              </div>
            </div>
          </div>
        </div>
      </el-row>
      <el-row>
        <el-button type="primary" size="mini" :loading="isSaving" @click="save"
          >保存</el-button
        >
        <el-button size="mini" @click="cancel">取消</el-button>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import moment from "moment";
import {
  transSubmit,
  carriesQuerydrivers,
  querycarriers,
  batchwaybilldistribute
} from "@/api/order";
import { getServicepersonal, getbusByuserId } from "@/api/user";
import { getVehicleList } from "@/api/vehicleManagement";
import { All_Status_List,Order_Type_list } from "@/utils/ENUM";
export default {
  name: "MapDis",
  data() {
    return {
      isSaving: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      orderForm: {
        type: "0",
        busId: "", // 车辆Model
        driverId: "", // 司机model、
        installUserList: [], // 安装工信息列表、
        departTime: "", // 调度发车时间、
        transRemark: "" //  调度备注、
      },
      orderRule: {
        busId: [{ required: true, message: "请选择车辆", trigger: "change" }],
        departTime: [
          { required: true, message: "请选择发车时间", trigger: "change" }
        ],
        driverId: [{ required: true, message: "请选择司机", trigger: "blur" }],
        installUserList: [
          { required: true, message: "请选择安装人员", trigger: "change" }
        ]
      },
      driverType: "0",
      driverList: {
        "0": null,
        "1": null
      },
      installUserList: [],
      truckList: [],
      transStatusList: All_Status_List,
      orderTypeList:Order_Type_list,
      isCreate: false,
      showOrderDis: false,
      showInstalluser: false,
      showDriveruser:true,
      disList: []
    };
  },
  props: {
    orderInfo: {
      type: Array
    }
  },
  watch: {
    disList(newval, oldval) {
      let resultInstall= newval.find(item => {
        return item.waybillInfo.orderType != "0";
      });
      let resultDriver= newval.find(item => {
        return item.waybillInfo.orderType == "0" || item.waybillInfo.orderType == "1";
      });
      if (resultInstall) {
        this.showInstalluser = true;
      } else {
        this.showInstalluser = false;
      }
      if (resultDriver) {
        this.showDriveruser = true;
      } else {
        this.showDriveruser = false;
      }
    }
  },
  mounted() {
    this.orderForm.departTime = moment()
      .add(1, "days")
      .set("hour", 9)
      .set("minute", 0);
    this.disList = JSON.parse(JSON.stringify(this.orderInfo));
    this.getServicepersonal({
      type: "1",
      ownerId: this.$store.state.user.userId
    });
    this.getDriverAndTruck();
    if (this.isCreate) {
    } else {
    }
  },
  methods: {
    getServicepersonal(params) {
      return new Promise((resolve, reject) => {
        if (!this.driverList[params.scope] && params.type == "0") {
          this.driverType = params.scope;
          getServicepersonal(params).then(res => {
            if (!res.error) {
              this.driverList[params.scope] = res;
              resolve();
            }
          });
        } else if (params.type == "1") {
          getServicepersonal(params).then(res => {
            if (!res.error) {
              this.installUserList = res;
              resolve();
            }
          });
        }
      });
    },
    //获取司机和车辆
    async getDriverAndTruck() {
      await Promise.all([
        this.getServicepersonal({
          type: "0",
          scope: this.driverType,
          ownerId: this.$store.state.user.userId
        }),
        this.gettruckList({
          ownerId: this.$store.getters.userId,
          pageNum: 1,
          pageSize: 100,
          busStatus: "1"
        })
      ]);
    },
    gettruckList(params) {
      return new Promise((resolve, reject) => {
        getVehicleList(params).then(res => {
          if (!res.error) {
            this.truckList = res.item;
            resolve();
          }
        });
      });
    },
    //根据用户id获取车辆
    getbusByuserId(params) {
      getbusByuserId(params).then(res => {
        if (!res.error) {
          if (res.id) {
            this.truckList = [res];
            this.orderForm.busId = res.id;
          } else {
            this.truckList = [];
          }
        }
      });
    },
    driverTypeChange(value) {
      this.orderForm.driverId = "";
      this.$refs.orderForm.clearValidate(["driverId"]);
      this.getServicepersonal({
        type: "0",
        scope: value,
        ownerId: this.$store.state.user.userId
      });
    },
    save() {
      let that = this;
      this.$refs.orderForm.validate(isValid => {
        if (isValid) {
          let plateNo, driverName, driverPhone;
          let busInfo = that.truckList.find(
            item => item.id == that.orderForm.busId
          );
          if (busInfo) {
            plateNo = busInfo.plateNo;
          }
          let driverInfo = that.driverList[that.driverType].find(
            item => item.useruuid == that.orderForm.driverId
          );
          if (driverInfo) {
            driverName = driverInfo.realName;
            driverPhone = driverInfo.phone;
          }
          let common = {
            busId: that.orderForm.busId,
            plateNo: plateNo,
            driverId: that.orderForm.driverId,
            driverName: driverName,
            driverPhone: driverPhone,
            departTime: that.orderForm.departTime,
            installUserList: that.orderForm.installUserList,
            transRemark: that.orderForm.transRemark
          };
          let difference = [];
          that.disList.forEach(item => {
            if (item.choose) {
              difference.push({ id: item.id });
            }
          });
          if (difference.length < 1) {
            this.$message({
              type: "warning",
              message: "订单不能为空！"
            });
            return;
          }
          let params = {
            common: common,
            difference: difference
          };
          that.isSaving = true
          batchwaybilldistribute(params).then(res => {
            that.isSaving = false
            if (!res.error) {
              this.$message({
                type: "success",
                message: "派单成功"
              });
              this.cancel();
              this.$emit("updateTable");
            }
          });
        }
      });
    },
    cancel() {
      this.$emit("cancelOrderDis");
    },
    transStatusFormatter(status) {
      let result = this.transStatusList.find(item => {
        return item.value === status;
      });
      if (result) {
        return result.label;
      } else {
        return "";
      }
    },
    driverChange(value) {
      this.$refs.orderForm.clearValidate(["driverId"]);
      if (this.$store.getters.roleType == "carrier" && this.driverType == "1") {
        this.truckList = [];
        this.driverId = "";
        this.getbusByuserId({ id: value });
      }
    },
    formatterOrderType(orderType){
      var msg = "";
      let result = this.orderTypeList.find(item => {
        return orderType == item.value;
      });
      return result ? result.label : "未知";
    },
  }
};
</script>
<style lang="scss">
.form_box {
  .el-checkbox__input {
    vertical-align: top;
  }
}
.distribute_search {
  .el-input-group__prepend {
    width: 120px;
  }
}
.multiple_search_box {
  .el-form-item__content {
    font-size: 0;
  }
  .multiple_select1 {
    width: 120px;
    .el-input__inner {
      background-color: #f5f7fa;
      color: #909399;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: none;
    }
  }
  .multiple_select2 {
    .el-input__inner {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
}
</style>
<style lang="scss" scoped>
.appoint_list {
  max-height: 300px;
  overflow-y: scroll;
  .customer_info {
    display: flex;
    white-space: normal;
    width: 400px;
  }
  .appoint_item {
    margin-top: 10px;
  }
}
.form_box {
  padding: 0 20px;
}
.check_content {
  display: inline-block;
  vertical-align: -webkit-baseline-middle;
  .transStatus {
    margin: 0 20px;
  }
  .jiedan {
    color: #0066ff;
  }
  .fenpai {
    color: #fe5500;
  }
  .customer_name {
    display: inline-block;
    min-width: 140px;
  }
}
</style>
