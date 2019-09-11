<template>
  <el-dialog
    width="900px"
    title="选择地址"
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancel"
  >
    <el-row style="margin-bottom:10px" type="flex" justify="end">
      <el-col :span="22">当前选择地址：{{ fullAddress }}</el-col>
      <el-col :span="2">
        <el-button type="primary" @click="save">确认</el-button>
      </el-col>
    </el-row>
    <g-map
      v-if="isVisible"
      :vid="vid"
      :center="center"
      :flex="350"
      @click="choose"
    >
    </g-map>
  </el-dialog>
</template>

<script>
import CommonWrapper from "@/components/commonWrapper";
import GMap from "@/components/gMap";
export default {
  name: "Map",
  data() {
    return {
      vid: "amap-vue",
      address: "",
      isVisible: false,
      poi: [],
      lng: null,
      lat: null,
      center: undefined,
      province: "",
      city: "",
      area: "",
      fullAddress: ""
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    addressInfo: {
      type: Object
    }
  },
  watch: {
    show(isShow) {
      this.isVisible = isShow;
      if (isShow && this.addressInfo) {
        this.center = this.poi =
          this.addressInfo.lat && this.addressInfo.lng
            ? [this.addressInfo.lng, this.addressInfo.lat]
            : undefined;
        this.fullAddress = this.addressInfo.address;
      }
    }
  },
  mounted() {},
  methods: {
    choose(e) {
      if (e.lng && e.lat) {
        this.lat = e.lat;
        this.lng = e.lng;
        this.fullAddress = e.address;
        this.province = e.addressComponent.province;
        this.city = e.addressComponent.city;
        this.area = e.addressComponent.district;
        this.address =
          e.addressComponent.township +
          e.addressComponent.street +
          e.addressComponent.streetNumber +
          e.addressComponent.neighborhood;
      }
    },
    save() {
      this.$emit(
        "getAddress",
        this.lat,
        this.lng,
        this.address,
        this.fullAddress,
        this.province,
        this.city,
        this.area
      );
      this.cancel();
    },
    cancel() {
      this.$emit("update:show", false);
      this.center = [];
      this.isVisible = false;
    }
  },
  components: {
    CommonWrapper,
    GMap
  }
};
</script>

<style scoped>
.amap-demo {
  height: 300px;
}
</style>
