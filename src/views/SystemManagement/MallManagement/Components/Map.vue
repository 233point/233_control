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
      <el-col :span="22">当前选择地址：{{ address }}</el-col>
      <el-col :span="2">
        <el-button type="primary" @click="save">确认</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
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
      </el-col>
    </el-row>
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
      center: [],
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
    }
  },
  watch: {
    show(isShow) {
      this.isVisible = isShow;
      if (isShow) {
        this.center = this.poi =
          this.addressInfo.lat && this.addressInfo.lng
            ? [this.addressInfo.lng, this.addressInfo.lat]
            : undefined;
        this.address = this.addressInfo.address;
      }
    }
  },
  mounted() {},
  methods: {
    choose(e) {
      if (e.lng && e.lat) {
        this.lat = e.lat;
        this.lng = e.lng;
        this.address =
          // e.result.addressComponent.township +
          // e.result.addressComponent.street +
          // e.result.addressComponent.streetNumber +
          // e.result.addressComponent.neighborhood;
          e.result.formattedAddress;
        this.result = e.result;
      }
    },
    save() {
      this.$emit("getAddress", this.lng, this.lat, this.result);
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
