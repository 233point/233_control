<template>
  <a-timeline v-if="info && info.length > 0">
    <a-timeline-item
      :color="
        item.operStatus == '0'
          ? '#dfe4ed'
          : item.operStatus == '1'
          ? '#13ce66'
          : item.operStatus == '2'
          ? '#ffba00'
          : '#dfe4ed'
      "
      v-for="item in info"
      :key="item.id"
    >
      <p class="time">{{ timeFormatter(item.updateTime) }}</p>
      <p class="content">{{ item.operUserName }}:{{ item.operContent }}</p>
    </a-timeline-item>
  </a-timeline>
</template>

<script>
import moment from "moment";
export default {
  name: "ChangeLog",
  data() {
    return {
      listLoading: true
    };
  },
  props: {
    info: {
      type: Array
    }
  },
  activated() {},
  mounted() {},
  methods: {
    timeFormatter(time) {
      if (time) {
        return moment(time).format("YYYY-MM-DD HH:mm:ss");
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
p {
  margin: 0px !important;
  word-wrap: break-word;
}
.time {
  color: $base-gray-color;
  font-size: $base-font-xs;
}
</style>
