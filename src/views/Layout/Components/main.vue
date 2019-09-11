<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-24 10:16:10
 * @LastEditTime: 2019-08-14 14:21:22
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-main class="main"  id="contentMain" style="padding:0px">
    <!-- custom scroll bar for main area -->
    <VuePerfectScrollbar class="scroll-area" :settings="scrollOptions">
      <keep-alive :include="cachedViews">
        <router-view />
      </keep-alive>
    </VuePerfectScrollbar>
  </el-main>
</template>

<script>
import { mapGetters } from "vuex";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  name: "Main",
  data() {
    return {
      scrollOptions: {
        maxScrollbarLength: 500
      }
    };
  },
  computed: {
    ...mapGetters(["cachedViews"])
  },
  components: {
    VuePerfectScrollbar
  }
};
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 800px;
  padding:0px !important;
  .scroll-area {
    width: 100%;
    height: 100%;

    > div {
      width: 100%;
    }
  }
}
</style>
