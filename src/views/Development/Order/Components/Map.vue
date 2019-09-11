<template>
  <el-dialog
    width="900px"
    title="选择地址"
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    append-to-body
    @close="cancel"
  >
    <el-row style="margin-bottom:10px" type="flex" justify="end">
      <el-col :span="22">当前选择地址：{{ fullAddress }}</el-col>
      <el-col :span="2">
        <el-button type="primary" @click="save">确认</el-button>
      </el-col>
    </el-row>
    <div style="height:500px;">
      <g-map
        v-if="isVisible"
        :vid="vid"
        :center="center"
        :clickable="true"
        @click="choose"
      >
      </g-map>
    </div>
  </el-dialog>
</template>

<script>
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
      fullAddress: "",
      result: {}
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    addressInfo: {
      type: Object
    },
    chooseType: {
      type: Number
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
        this.fullAddress = e.result.formattedAddress;
        this.province = e.result.addressComponent.province;
        this.city = e.result.addressComponent.city;
        this.area = e.result.addressComponent.district;
        this.address =
          e.result.addressComponent.township +
          e.result.addressComponent.street +
          e.result.addressComponent.streetNumber +
          e.result.addressComponent.neighborhood;
        this.result = e.result;
      }
    },
    save() {
      this.$emit(
        "getAddress",
        this.lat,
        this.lng,
        this.result,
        this.chooseType
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
    GMap
  }
};
</script>

<style scoped>
.amap-demo {
  height: 300px;
}
</style>
