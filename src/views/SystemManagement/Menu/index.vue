<template>
  <div class="system-menu">
    <!-- <header-breadcrumb :breadData="$route.matched" /> -->
    <div class="main">
      <div class="left-tree">
        <VuePerfectScrollbar class="scroll-area">
          <system-menu-tree
            ref="tree"
            :isCreate.sync="isCreate"
            :clickedNodeData="clickedNodeData"
            @nodeClick="handleNodeClick"
            @openDialog="openDialog"
            @updateTree="updateTree"
          />
        </VuePerfectScrollbar>
      </div>
      <div class="menu-content">
        <menu-detail ref="menuDetail" :nodeData="clickedNodeData" />
      </div>
    </div>
    <!-- update Dialog -->
    <menu-update
      :show.sync="showUpdateDialog"
      :isCreate="isCreate"
      :nodeData="clickedNodeData"
      @updateTree="updateTree"
    />
  </div>
</template>
<script>
/**
 * Menu Management Module
 * ----------------------
 * Author: zhou qi
 * Date: 2018.06.13
 */
import VuePerfectScrollbar from "vue-perfect-scrollbar";

import SystemMenuTree from "./Components/Tree";
import MenuDetail from "./Components/MenuDetail";
import MenuUpdate from "./Components/Update";

export default {
  name: "OrganizationManagement",
  data() {
    return {
      clickedNodeData: {},
      showUpdateDialog: false,
      isCreate: true // 当前是新增还是编辑
    };
  },
  methods: {
    handleNodeClick({ data, node, nodeCom }) {
      this.clickedNodeData = data;
    },
    updateTree(type) {
      this.$refs.tree.update();
      // 目前 当type 为'delete'时, 详情的内容会重置为空,而不是重新刷新当前数据
      type === "delete"
        ? this.$refs.menuDetail.initDetail()
        : this.$refs.menuDetail.refresh();
    },
    openDialog(componentName, nodeData) {
      this.clickedNodeData = nodeData;
      this.showUpdateDialog = true;
    }
  },
  components: { VuePerfectScrollbar, SystemMenuTree, MenuDetail, MenuUpdate }
};
</script>
<style lang="scss" scoped>
.system-menu {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .main {
    display: flex;
    height: 100%;
    flex-direction: row;

    .left-tree {
      min-width: 230px;
      padding: 15px 0;
      background: #fff;
      border-right: 2px solid darken($base-light-color, 5%);
      margin-bottom: 20px;
      .scroll-area {
        width: 100%;
        height: 100%;
      }
    }

    .menu-content {
      flex: 1 auto;
    }
  }
}
</style>
