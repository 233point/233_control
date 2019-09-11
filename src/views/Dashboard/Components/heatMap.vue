<template>
  <g-map
    vid="mapHeat"
    :zoom="9"
    :chooseArea="false"
    :searchArea="false"
    :showCenter="false"
    :heatMapVisible="true"
    :heatmapData="heatmapData"
  />
</template>

<script>
import GMap from "@/components/gMap";

export default {
  name: "HeatMap",
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
      // mapZoom:3,
      heatmapDataList: [],
      heatMapVisible: false
    };
  },
  props: {
    heatmapData: {
      type: Array
    },
    mapCenter: {
      type: Array,
      default: () => {
        return [108.95, 34.26667];
      }
    }
  },
  watch: {
    heatmapData(val) {
      this.heatmapDataList = val;
      this.heatMapVisible = true;
    }
  },
  mounted() {
    this.$emit("initData");
  },
  methods: {},
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
