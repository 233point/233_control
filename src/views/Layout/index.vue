<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-24 10:16:10
 * @LastEditTime: 2019-09-02 10:24:45
 * @LastEditors: Please set LastEditors
 -->
<template>
  <!-- <div class="layout">
    <sidebar v-bind:style="{width: sidebarState.width}"></sidebar>
    <div class="main-content" v-bind:style="{width:`calc(100% - ${sidebarState.width})`}">
      <headers></headers>
        <tag-tabs v-show="!windowMaxState"></tag-tabs>
        <app-main class="main-wrapper" id="mainWrapper"></app-main>
    </div>
  </div> -->
  <el-container>
    <el-header style="height:50px">
      <headers></headers>
    </el-header>
    <el-container style="height: calc(100% - 48px);">
      <el-aside
        :width="sidebarState.width"
        style="margin-top:3px;background:#fff;box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.08);min-height: calc(100vh - 60px);"
      >
        <sidebar></sidebar>
      </el-aside>
      <el-main>
        <div class="main-content">
          <!-- <headers></headers> -->
          <!-- <tag-tabs v-show="!windowMaxState"></tag-tabs> -->
          <app-main
            class="main-wrapper scrollTable"
            id="mainWrapper"
          ></app-main>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import headers from "./Components/header";
import sidebar from "./Components/Sidebar";
import tagTabs from "./Components/tagTabs";
import appMain from "./Components/main";

import { mapGetters } from "vuex";

export default {
  name: "Layout",
  components: {
    headers,
    sidebar,
    tagTabs,
    appMain
  },
  computed: {
    ...mapGetters(["sidebarState", "windowMaxState"])
  }
};
</script>

<style lang="scss">
.layout {
  display: flex;
  width: 100%;
  height: 100%;

  .main-content {
    flex: 1 auto;
    display: inherit;
    flex-direction: column;
    transition: all 0.3s ease-in-out 0s;
    // padding-top:1rem;

    .main-wrapper {
      flex: 1;
    }
  }
}
</style>
