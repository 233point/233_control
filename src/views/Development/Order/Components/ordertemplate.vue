<template>
  <div class="mercure_template">
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
      <el-form-item label="客户名称" prop="productName">
        <el-input
          :disabled="type == 'edit'"
          v-model="form.productName"
          maxlength="50"
          placeholder="请输入客户名称"
        />
      </el-form-item>
      <el-form-item label="客户电话" prop="productShortName">
        <el-input
          :disabled="type == 'edit'"
          v-model="form.productShortName"
          placeholder="请输入客户电话"
          maxlength="50"
        />
      </el-form-item>
      <el-form-item label="客户地址" prop="fullAddress">
        <span class="pos-r">
          <el-input
            v-model="form.fullAddress"
            type="textarea"
            placeholder="请输入客户地址"
            ref="address"
            :autosize="{ minRows: 1, maxRows: 3 }"
            maxlength="200"
            resize="none"
          />
          <i class="el-icon-location posBtn" @click="chooseAddress(form)"></i>
        </span>
      </el-form-item>
      <el-form-item label="预约服务日期" prop="productContent">
        <el-input
          v-model="form.productContent"
          placeholder="请输入预约服务日期"
        />
      </el-form-item>
      <el-form-item label="服务内容" prop="productContent">
        <el-button size="mini" type="primary" @click="chooseProductContent"
          >请选择</el-button
        >
        <div
          class="choose_info"
          :class="form.productContent ? 'active' : 'hidden'"
        >
          <span color="info">{{ form.productContent }}</span>
          <span>
            <el-button
              class="info"
              type="text"
              icon="el-icon-close"
              @click="handleCloseContent"
            ></el-button>
          </span>
        </div>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          type="textarea"
          v-model="form.remark"
          placeholder="请输入备注"
        />
      </el-form-item>
      <el-form-item label="创建人" prop="createrName">
        <el-input v-model="form.createrName" disabled />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
    <g-map
      :show.sync="isMapShow"
      :addressInfo="addressInfo"
      @getAddress="getAddress"
    />

    <product-content
      ref="productContent"
      :show.sync="showProductContent"
      @getContent="getContent"
    />
  </div>
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
// api
import { addMercure, editMercure } from "@/api/order";
import GMap from "./Map";
import ProductContent from "./content";
import { mapGetters } from "vuex";

const initForm = {
  disPrice: 1,
  prePrice: 1,
  productCategory: "",
  productContent: "",
  productContentId: "",
  productDuration: 1,
  productName: "",
  productShortName: "",
  fullAddress: "",
  remark: "",
  createrId: "",
  createrName: ""
};

export default {
  name: "MercureTemplate",
  components: { GMap, ProductContent },
  data() {
    return {
      isVisible: false,
      form: {},
      formRules: {
        productName: [
          { required: true, message: "请输入服务名称", trigger: "blur" }
        ],
        productShortName: [
          { required: true, message: "请输入服务简称", trigger: "blur" }
        ],
        productCategory: [
          { required: true, message: "请选择服务分类", trigger: "blur" }
        ],
        productDuration: [
          { required: true, message: "请选择服务时长", trigger: "blur" }
        ],
        productShortName: [
          {
            required: true,
            message: "请在地图上选择客户地址",
            trigger: "blur"
          }
        ],
        productContent: [
          { required: true, message: "请输入服务内容", trigger: "blur" }
        ],
        disPrice: [
          { required: true, message: "请输入优惠价", trigger: "blur" }
        ],
        prePrice: [{ required: true, message: "请输入原价", trigger: "blur" }]
      },
      options: [
        {
          label: "江苏",
          cities: []
        },
        {
          label: "浙江",
          cities: []
        }
      ],
      props: {
        value: "label",
        children: "cities"
      },
      isMapShow: false,
      addressInfo: {},
      showProductContent: false
    };
  },
  props: {
    type: {
      type: String,
      default: "add"
    },
    editInfo: {
      type: Object,
      default: null
    }
  },
  computed: {
    ...mapGetters(["userName"])
  },
  mounted() {
    if (this.editInfo) {
      this.form = JSON.parse(JSON.stringify(info));
    } else {
      this.form = JSON.parse(JSON.stringify(initForm));
      console.log("this.userName", this.userName);
      this.form.createrName = this.userName;
    }
  },
  methods: {
    handleItemChange(val) {
      console.log("active item:", val);
      setTimeout(_ => {
        if (val.indexOf("江苏") > -1 && !this.options[0].cities.length) {
          this.options[0].cities = [
            {
              label: "南京"
            }
          ];
        } else if (val.indexOf("浙江") > -1 && !this.options[1].cities.length) {
          this.options[1].cities = [
            {
              label: "杭州"
            }
          ];
        }
      }, 300);
    },
    chooseAddress(data) {
      this.isMapShow = true;
      if (data.lng && data.lat) {
        this.addressInfo = {
          lat: data.lat,
          lng: data.lng,
          address: data.fullAddress
        };
      }
    },
    getAddress(lat, lng, address, fullAddress, province, city, area) {
      this.form.lat = lat;
      this.form.lng = lng;
      this.form.location = [lng, lat];
      this.form.address = address;
      this.form.fullAddress = fullAddress;
      this.form.province = province;
      this.form.city = city;
      this.form.area = area;
      // this.$refs.address.$el.children[0].focus();
      // this.$refs.address.$el.children[0].blur();
    },
    chooseProductContent() {
      this.showProductContent = true;
    },
    handleCloseContent(tag) {
      this.form.productContent = "";
      this.$refs.productContent.clear();
    },
    getContent(val) {
      this.form.productContent = val.productName;
      this.form.productContentId = val.id;
    },

    save() {
      this.$refs.form.validate(isValid => {
        if (isValid) {
          const params = Object.assign({}, this.form);
          const oUrl = this.type == "add" ? addMercure : editMercure;
          oUrl(params).then(res => {
            if (!res.error) {
              let submitText = this.type == "add" ? "新增" : "编辑";
              this.$message({
                message: `${submitText}成功!`,
                type: "success"
              });
              this.resetData();
              this.$store.dispatch("delView", this.$route);
              this.$emit("save");
            }
          });
        }
      });
    },
    cancel() {
      this.resetData();
      this.$store.dispatch("delView", this.$route);
      this.$emit("cancel");
    },
    resetData() {
      if (this.type == "add") {
        this.form = JSON.parse(JSON.stringify(initForm));
      } else {
        this.form = JSON.parse(JSON.stringify(this.editInfo));
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mercure_template {
  width: 60%;
  max-width: 560px;
  margin: 0 auto;
  margin-top: 3rem;
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.15);
}
.pos-r {
  display: flex;
  align-items: center;
  .posBtn {
    padding-left: 0.5rem;
  }
}
.choose_info {
  width: 100%;
  transition: all 0.2s linear;
  color: var(--color-text);
  display: flex;
  align-items: center;
  justify-content: space-between;
  .info {
    color: var(--color-primary) !important;
  }
  span:nth-child(1) {
    font-size: 12px;
    display: inline-block;
    word-break: break-all;
    padding-left: 0.5rem;
  }
  span:nth-child(2) {
    padding: 0 0.8rem;
    font-size: $base-font-xs;
    float: right;
    font-weight: 500;
  }
}
.choose_info.active {
  background-color: var(--color-primary-hover);
  border: 1px solid var(--color-primary);
  border-radius: 5px;
  font-size: 12px;
  margin: 1rem 0rem;
  height: auto;
  animation: flipInX 600ms both;
}
.choose_info.hidden {
  animation: flipOutX 600ms both;
  padding: 0;
  height: 0;
  border: none;
  overflow: hidden;
}
</style>
