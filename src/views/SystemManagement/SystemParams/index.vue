<template>
  <keep-alive :include="cachedViews">
    <router-view></router-view>
  </keep-alive>
</template>
<script>
/*
 * Third Level for Router
 * 手动将本级主路由组件名称添加至缓存列表中,以便子路由开启缓存
 */
import { mapGetters } from "vuex";
export default {
  name: "SystemParams",
  computed: {
    ...mapGetters(["cachedViews"])
  },
  beforeMount() {
    this.$store.dispatch("addCachedView", "SystemParams");
  },
  beforeDestroy() {
    this.$store.dispatch("removeCachedView", "SystemParams");
  }
};
</script>
