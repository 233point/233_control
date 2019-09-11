<template>
  <div class="form_box">
    <el-form
      ref="orderForm"
      :model="orderForm"
      :rules="orderRule"
      label-width="80px"
    >
      <el-row>
        <el-form-item label="服务商" prop="carrierId">
          <el-select
            class="w100p"
            v-model="orderForm.carrierId"
            value-key="id"
            filterable
            placeholder="请选择服务商"
          >
            <el-option
              v-for="item in carrierList"
              :key="item.id"
              :label="item.company"
              :value="item.useruuid"
            />
          </el-select>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="订单列表" prop="waybillList">
          <div class="appoint_list">
            <div
              v-for="(item, index) in disList"
              :class="index == 0 ? '' : 'appoint_item'"
              :key="index"
            >
              <el-checkbox v-model="item.choose"></el-checkbox>
              <div class="check_content">
                <div>
                  <span>{{ item.waybillNo }}</span
                  ><span
                    class="transStatus"
                    :class="item.transStatus == '0' ? 'fenpai' : 'jiedan'"
                    >●{{ transStatusFormatter(item.transStatus) }}</span
                  ><span>
                    {{formatterOrderType(item.orderType)}}
                  </span>
                </div>
                <div class="customer_info">
                  <span class="customer_name">{{
                    item.customerName
                  }}</span
                  ><span>{{ item.fullAddress }}</span>
                </div>
              </div>
            </div>
          </div>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="下发备注" prop="dispatchRemark">
          <el-input
            class="w100p"
            v-model="orderForm.dispatchRemark"
            type="textarea"
            :autosize="{ maxRows: 2 }"
            maxlength="200"
            resize="none"
          ></el-input>
        </el-form-item>
      </el-row>
      <el-alert
        title="注意"
        :closable="false"
        type="warning"
        description="确认下发后，订单将交由服务商进行调度服务，您依然可以查看订单服务情况"
      >
      </el-alert>
      <el-row style="margin-top:20px;">
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
import { waybillbatchwaybilldistributetocarrier } from "@/api/order";
import { getAllCarrier } from "@/api/user";
import { Order_Type_list } from "@/utils/ENUM";
export default {
  name: "ToCarrier",
  data() {
    return {
      isSaving: false,
      orderTypeList:Order_Type_list,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      orderForm: {
        carrierId: "",
        dispatchRemark: "" //  调度备注、
      },
      orderRule: {
        carrierId: [
          { required: true, message: "请选择服务商", trigger: "change" }
        ]
      },
      carrierList: [],
      disList: []
    };
  },
  props: {
    orderInfo: {
      type: Array
    }
  },
  mounted() {
    this.getAllCarrier();
    this.disList = JSON.parse(JSON.stringify(this.orderInfo));

  },
  methods: {
    getAllCarrier() {
      getAllCarrier({}).then(res => {
        if (!res.error) {
          this.carrierList = res;
          let defaultCarrier = this.$store.getters.merchantInfo.carriers;
          if (defaultCarrier && defaultCarrier.length) {
            this.orderForm.carrierId = defaultCarrier[0].id;
          }
        }
      });
    },
    save() {
      let that = this;
      this.$refs.orderForm.validate(isValid => {
        if (isValid) {
          let common = {
            carrierId: that.orderForm.carrierId,
            carrierName:
              this.carrierList.find(
                item => item.useruuid === that.orderForm.carrierId
              ).company || "",
            dispatchRemark: that.orderForm.dispatchRemark
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
          waybillbatchwaybilldistributetocarrier(params).then(res => {
            that.isSaving = false
            if (!res.error) {
              this.$message({
                type: "success",
                message: "下发服务商成功"
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
      switch (status) {
        case "0":
          return "待分派";
          break;
        case "1":
          return "待接单";
          break;
        case "2":
          return "司机拒接";
          break;
        case "3":
          return "超时未接";
          break;
      }
    },
    formatterOrderType(orderType){
      var msg = "";
      let result = this.orderTypeList.find(item => {
        return orderType == item.value;
      });
      return result ? result.label : "";
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
