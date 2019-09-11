<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 10:08:32
 * @LastEditTime: 2019-08-29 17:22:37
 * @LastEditors: Please set LastEditors
 -->
<template>
  <common-content class="mercure_template" :flex="100">
    <el-form ref="form" :model="form" label-width="120px">
      <el-divider content-position="left">
        <h3>客户信息</h3>
      </el-divider>
      <el-row>
        <el-col :span="8">
          <el-form-item label="客户姓名" prop="customerName">
            <span>{{ form.waybillInfo.customerName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="客户电话" prop="customerPhone">
            <span>{{ form.waybillInfo.customerPhone }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="所属区域" prop="productShortName">
            <span>{{
              form.waybillInfo.city + "/" + form.waybillInfo.area
            }}</span>
            <br />
            <span>{{ form.waybillInfo.fullAddress }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="电梯" prop="isElevator">
            <span>{{
              form.waybillInfo.isElevator == "0"
                ? "有"
                : form.waybillInfo.isElevator == "1"
                ? "无"
                : "未知"
            }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="楼层数" prop="floor">
            <span>{{ form.waybillInfo.floor }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="left">
        <h3>提货信息</h3>
      </el-divider>
      <el-row>
        <el-col :span="18">
          <el-form-item label="提货联系人" prop="deliveryContactUser">
            <span>{{ form.waybillInfo.deliveryContactUser }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="提货电话" prop="deliveryContactPhone">
            <span>{{ form.waybillInfo.deliveryContactPhone }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="16">
          <el-form-item label="所属区域-地址" prop="userGender">
            <span>{{
              form.waybillInfo.deliveryCity +
                "/" +
                form.waybillInfo.deliveryArea
            }}</span>
            <br />
            <span>{{ form.waybillInfo.deliveryFullAddress }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="期望提货时间" prop="deliveryTime">
            <span>{{ form.waybillInfo.deliveryTime }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="包装件数" prop="pkgNum">
            <span>{{ form.waybillInfo.pkgNum }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="16">
          <el-form-item label="服务时间" prop="expectFinishTime">
            <span>{{ dateFormatter(form.waybillInfo.expectFinishTime) }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="预估费用" prop="estimatedCost">
            <span>{{ form.waybillInfo.estimatedCost }}&nbsp;&nbsp;元</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="left">
        <h3>货品信息</h3>
      </el-divider>
      <el-row>
        <el-table
          ref="orderTable1"
          height="100%"
          stripe
          :data="form.waybillInfo.productList"
        >
          <el-table-column
            type="index"
            label="序号"
            width="50"
            fixed="left"
          ></el-table-column>
          <el-table-column label="货品名称" prop="productName" min-width="130">
          </el-table-column>
          <el-table-column
            prop="productModel"
            label="货品规格型号"
            min-width="100"
          >
          </el-table-column>
          <el-table-column label="重量(公斤)" prop="weight" min-width="140">
          </el-table-column>
          <el-table-column label="体积(立方米)" min-width="140" prop="volume">
          </el-table-column>
          <el-table-column label="数量" min-width="100" prop="num">
          </el-table-column>
        </el-table>
      </el-row>
      <el-divider content-position="left">
        <h3>备注</h3>
      </el-divider>
      <el-row>
        <el-col :span="24">
          <el-form-item prop="waybillRemark" label-width="0">
            <span>{{ form.waybillInfo.waybillRemark }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="left">
        <h3>预约信息</h3>
      </el-divider>
      <el-row>
        <el-col :span="24">
          <el-form-item label="预约时间" prop="appointTime">
            <span>{{ timeFormatter(form.waybillInfo.appointTime) }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="预约备注" prop="appointRemark">
            <span>{{ form.waybillInfo.appointRemark }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider content-position="left">
        <h3>派单信息</h3>
      </el-divider>
      <el-row>
        <el-col :span="8">
          <el-form-item label="状态" prop="transStatus">
            <span>{{ transStatusFormatter(form.transStatus) }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.transStatus > '0'">
        <el-col :span="8">
          <el-form-item label="司机" prop="appointRemark">
            <span>{{ form.driverName }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="车牌号" prop="appointRemark">
            <span>{{ form.plateNo }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="安装人员" prop="departTime">
            <span>{{
              form.installUserList.map(item => item.realName).join("、")
            }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.transStatus > '0'">
        <el-col :span="8">
          <el-form-item label="发车时间" prop="departTime">
            <span>{{ timeFormatter(form.departTime) }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="form.transStatus > '0'">
        <el-col :span="8">
          <el-form-item label="派单备注" prop="transRemark">
            <span>{{ form.transRemark }}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
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
// api
import { updateUser } from "@/api/user";
import { Order_Status_List } from "@/utils/ENUM";
import CommonTable from "@/components/commonTable";

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
    CommonTable
  },
  data() {
    return {
      isVisible: false,
      orgnization: [],
      form: {},
      options: [],
      statusList: Order_Status_List,
      customStyle:
        "background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden"
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
        console.log("info");
      },
      deep: true
    }
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.info));
    console.log("mountedinfo");
  },
  methods: {
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
    },
    dateFormatter(time) {
      if (time) {
        return moment(time).format("YYYY-MM-DD");
      } else {
        return "";
      }
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
    }
  }
};
</script>

<style lang="scss" scoped>
.mercure_template {
  padding: 0 30px;
}
</style>
