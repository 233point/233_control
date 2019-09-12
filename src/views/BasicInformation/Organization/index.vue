<template>
  <div class="organization">
    <!-- <header-breadcrumb :breadData="$route.matched" /> -->
    <div class="main">
      <div class="left-tree">
        <VuePerfectScrollbar class="scroll-area">
          <tree
            ref="tree"
            :isCreate.sync="isCreate"
            :clickedNodeData="clickedNodeData"
            @nodeClick="handleNodeClick"
            @openDialog="openDialog"
            @updateTree="updateTree"
          />
        </VuePerfectScrollbar>
      </div>
      <div class="org-content">
        <org-detail ref="orgDetail" :nodeData="clickedNodeData" />
      </div>
    </div>
    <!-- update Dialog -->
    <org-update
      :show.sync="showUpdateDialog"
      :isCreate="isCreate"
      :nodeData="clickedNodeData"
      @updateTree="updateTree"
    />
  </div>
</template>
<script>
/**
 * Organization Management Module
 * ----------------------
 * Author: zhou qi
 * Date: 2018.03.20
 */
import VuePerfectScrollbar from "vue-perfect-scrollbar";

import Tree from "./Components/Tree";
import OrgDetail from "./Components/OrgDetail";
import OrgUpdate from "./Components/OrgUpdate";

export default {
  name: "OrganizationManagement",
  data() {
    return {
      clickedNodeData: {},
      showUpdateDialog: false,
      isCreate: true // 当前是新建还是编辑
    };
  },
  methods: {
    handleNodeClick({ data, node, nodeCom }) {
      this.clickedNodeData = data;
    },
    // type 为子组件在调用该方法时传递的类型字符串,
    updateTree(type) {
      this.$refs.tree.update();
      // 目前 当type 为'delete'时, 组织机构详情的内容会重置为空,而不是重新刷新当前数据
      type === "delete"
        ? this.$refs.orgDetail.initDetail()
        : this.$refs.orgDetail.refresh();
    },
    openDialog(componentName, nodeData) {
      this.clickedNodeData = nodeData;
      this.showUpdateDialog = true;
    }
  },
  components: { VuePerfectScrollbar, Tree, OrgDetail, OrgUpdate }
};
</script>
<style lang="scss" scoped>
.organization {
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
      border-right: 2px solid #f2f2f2;
      margin-bottom: 20px;
      .scroll-area {
        width: 100%;
        height: 100%;
      }
    }

    .org-content {
      flex: 1 auto;
    }
  }
}
</style>
