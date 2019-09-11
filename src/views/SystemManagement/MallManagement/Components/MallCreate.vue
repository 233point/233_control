<template>
  <div>
    <el-dialog
      width="500px"
      :title="(isCreate ? '新增' : '编辑') + '商场'"
      :visible.sync="isVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="cancel"
    >
      <el-form
        ref="marketInfo"
        :model="marketInfo"
        :rules="formRules"
        label-width="100px"
      >
        <el-row>
          <el-col>
            <el-form-item label="名称" prop="name">
              <el-input
                maxlength="30"
                v-model="marketInfo.name"
                placeholder="请输入商场名称，最长30字符"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="所属城市" prop="cityCodeShow">
              <el-cascader
                class="w100p"
                ref="cascader"
                :options="cityOptions"
                v-model="marketInfo.cityCodeShow"
                change-on-select
                :props="cityProps"
                @change="selectCityChange"
              ></el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="pos-r">
            <el-form-item label="详细地址" prop="location">
              <el-input
                :disabled="!marketInfo.location"
                v-model="marketInfo.location"
                type="textarea"
                class="location"
                :autosize="{ maxRows: 7 }"
                maxlength="200"
                resize="none"
                ref="location"
                placeholder="请输入仓库详细地址，最长200字符"
              />
              <i
                class="el-icon-location pos-a posButton"
                @click="chooseAddress(marketInfo)"
              ></i>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="负责人" prop="personInCharge">
              <el-input
                maxlength="30"
                v-model="marketInfo.personInCharge"
                placeholder="请输入商场负责人姓名"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="负责人电话" prop="phone">
              <el-input
                maxlength="30"
                v-model="marketInfo.phone"
                placeholder="请输入商场负责人电话"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="描述" prop="remark">
              <el-input
                type="textarea"
                :autosize="{ maxRows: 7 }"
                maxlength="200"
                v-model="marketInfo.remark"
                resize="none"
                placeholder="请输入商场描述,最长200字符"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col class="btn-area">
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" :loading="isSaving" @click="save"
              >提交</el-button
            >
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
    <g-map
      :show.sync="isMapShow"
      :addressInfo="addressInfo"
      @getAddress="getAddress"
    />
  </div>
</template>

<script>
import GMap from "./Map";
import store from "@/store";
import areaTree from "@/assets/city_tree.json";
const addressTree = areaTree.children;
import { createMarket, updateMarket } from "@/api/warehouse";
import Validator from "@/utils/extendValidate/extendValidate";

export default {
  name: "marketCreate",
  data() {
    return {
      isSaving: false,
      cityOptions: addressTree,
      cityProps: {
        value: "adcode",
        label: "name",
        children: "children"
      },
      marketInfo: {
        name: "",
        cityCode: "",
        cityCodeShow: [],
        city: "",
        location: "",
        personInCharge: "",
        phone: "",
        remark: "",
        pointInfo: {
          lng: "",
          lat: ""
        }
      },
      isVisible: false,
      formRules: {
        name: [{ required: true, message: "请输入商场名称", trigger: "blur" }],
        cityCodeShow: [
          { required: true, message: "请选择商场所在城市", trigger: "blur" }
        ],
        location: [
          { required: true, message: "请选择详细地址", trigger: "blur" }
        ],
        personInCharge: [
          { required: true, message: "请填写商场负责人", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请填写商场负责人电话", trigger: "blur" },
          { validator: Validator.cellPhone, trigger: "blur" }
        ],
        remark: [
          {
            min: 0,
            max: 200,
            message: "描述长度请不要超过200字",
            trigger: "change"
          }
        ]
      },
      isMapShow: false,
      addressInfo: {},
      options: []
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    isCreate: {
      type: Boolean,
      required: true
    },
    market: {
      type: Object
    }
  },
  watch: {
    show(isShow) {
      if (isShow) {
        // 编辑
        if (!this.isCreate) {
          this.setToEditState();
        }
      }
      this.isVisible = isShow;
    },
    org(org) {
      this.options = org;
    }
  },
  methods: {
    setToEditState() {
      this.marketInfo = JSON.parse(JSON.stringify(this.market));
    },
    selectCityChange() {
      this.marketInfo.city = this.$refs.cascader
        .getCheckedNodes()[0]
        .pathLabels.join("");
    },
    chooseAddress(data) {
      this.isMapShow = true;
      this.addressInfo = {
        lat: data.pointInfo.lat || null,
        lng: data.pointInfo.lng || null,
        location: data.location
      };
    },
    getAddress(lat, lng, result) {
      this.marketInfo.cityCodeShow = [];
      let cityCodeShow = [];
      cityCodeShow.push(
        Number(result.addressComponent.adcode.substring(0, 2) + "0000")
      );
      if (
        result.addressComponent.adcode.indexOf("11") != 0 &&
        result.addressComponent.adcode.indexOf("12") != 0 &&
        result.addressComponent.adcode.indexOf("31") != 0 &&
        result.addressComponent.adcode.indexOf("50") != 0
      ) {
        let cityCode = Number(
          result.addressComponent.adcode.substring(0, 4) + "00"
        );
        cityCodeShow.push(cityCode);
      }
      this.marketInfo.city =
        result.addressComponent.province + result.addressComponent.city;
      this.marketInfo.cityCodeShow = cityCodeShow;
      if (this.marketInfo.city) {
        this.marketInfo.location = result.formattedAddress.substring(
          result.formattedAddress.indexOf(this.marketInfo.city) +
            this.marketInfo.city.length
        );
      } else {
        this.marketInfo.location = result.formattedAddress;
      }
      this.marketInfo.pointInfo.lat = lat;
      this.marketInfo.pointInfo.lng = lng;
    },
    save() {
      let that = this;
      this.$refs.marketInfo.validate(isValid => {
        if (isValid) {
          this.marketInfo.cityCode = this.marketInfo.cityCodeShow[
            this.marketInfo.cityCodeShow.length - 1
          ];
          let saveMethod = that.isCreate ? createMarket : updateMarket;
          this.isSaving = true;
          saveMethod(that.marketInfo).then(res => {
            this.isSaving = false;
            if (!res.error) {
              that.$message({
                message: (that.isCreate ? "新增" : "编辑") + "成功！",
                type: "success"
              });
            }
            this.$emit("queryList");
            that.cancel();
          });
        }
      });
    },
    cancel() {
      this.marketInfo = {
        name: "",
        cityCodeShow: "",
        city: "",
        location: "",
        personInCharge: "",
        phone: "",
        remark: "",
        pointInfo: {
          lng: "",
          lat: ""
        }
      };
      this.$refs.marketInfo.resetFields();
      this.$emit("update:show", false);
      this.isVisible = false;
    }
  },
  components: { GMap }
};
</script>

<style lang="scss" scoped>
.posButton {
  top: 5px;
  right: 0;
  font-size: 20px;
  cursor: pointer;
}
.w160 {
  width: 160px;
}
.location {
  width: calc(100% - 25px);
}
.btn-area {
  text-align: right;
}
</style>
