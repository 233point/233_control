<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-07 11:20:15
 * @LastEditTime: 2019-08-14 11:38:57
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-dialog
    width="800px"
    title="车辆详情"
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancel"
    class="venicle"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="车牌号" prop="plateNo">
            <span>{{ form.plateNo }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="车辆来源" prop="busSource">
            <span>{{
              form.busSource == "0"
                ? "自有"
                : form.busSource == "1"
                ? "合作"
                : "未知"
            }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="品牌" prop="busBrand">
            <span>{{ form.busBrand }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="车型" prop="busType">
            <span>{{ form.busType }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="载重(t)" prop="busLoad">
            <span>{{ form.busLoad }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="车长(m)" prop="busLength">
            <span>{{ form.busLength }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车宽(m)" prop="busWidth">
            <span>{{ form.busWidth }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="车高(m)" prop="busHeight">
            <span>{{ form.busHeight }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="容量(m³)" prop="busCapacity">
            <span>{{ form.busCapacity }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="所属司机" prop="useUserId">
            <span>{{ form.useUserName }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="备注" prop="remark">
            <span>{{ form.remark }}</span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="车辆照片">
            <img v-if="form.img" :src="form.img" class="imgScan" />
            <span v-else>无</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>
<script>
/**
 * User Add Component
 * ----------------------
 * Author: Calamus
 * Date: 2018.09.26
 */
// validate
import Validator from "@/utils/extendValidate/extendValidate";
import { BASE_PER_FIX_URL } from "@/utils/baseUrlPerFix.js";
import { getToken } from "@/utils/auth.js";
import { setSession, getSession } from "@/utils/session";

// api
import { getListWithProject } from "@/api/vehicleManagement";
import { getBusType } from "@/api/common";

const token = getToken();
const initForm = {
  plateNo: "",
  busBrand: "",
  busLoad: "",
  busType: "",
  remark: "",
  busSource: "",
  busLength: "",
  busWidth: "",
  busHeight: "",
  busCapacity: "",
  busBirthday: "",
  drivingLicense: "",
  useUserId: "",
  useUserName: "",
  img: ""
};
export default {
  name: "UserCreate",
  data() {
    return {
      isSaving: false,
      isVisible: false,
      orgnization: [],
      form: {},
      driverList: [],
      busTypeList: []
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    isCreate: {
      type: Boolean,
      default: true
    },
    busInfo: {
      type: Object
    }
  },
  watch: {
    show(isShow) {
      this.isVisible = isShow;
      this.form = Object.assign({}, this.busInfo);
      // this.getBusType()
    }
  },
  methods: {
    // 获取车型
    getBusType() {
      getBusType().then(res => {
        if (!res.error) {
          this.busTypeList = res;
        }
      });
    },
    cancel() {
      this.$refs.form.resetFields();
      this.$emit("update:show", false);
      this.isVisible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.venicle {
  .imgScan {
    width: 350px;
    margin-top: 10px;
  }
  .el-select {
    width: 220px !important;
  }
}
</style>
