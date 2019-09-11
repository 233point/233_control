<template>
  <div>
    <v-contextmenu ref="treeMenu">
      <v-contextmenu-item @click="createOrg">新建字典</v-contextmenu-item>
      <v-contextmenu-item @click="editOrg">修改字典</v-contextmenu-item>
      <v-contextmenu-item
        @click="deleteOrg"
        :disabled="
          contextmenuSelectedNode && contextmenuSelectedNode.pId === ''
        "
        >删除字典</v-contextmenu-item
      >
    </v-contextmenu>

    <el-tree
      ref="tree"
      :data="orgTreeData"
      node-key="id"
      :props="defaultProps"
      default-expand-all
      :expand-on-click-node="false"
      @node-contextmenu="showContextMenu"
      @node-click="handleNodeClick"
      :render-content="customRender"
    >
    </el-tree>
  </div>
</template>
<script>
/**
 * Organization Tree Component
 * ----------------------
 * Author: zhou qi
 * Date: 2018.03.20
 */
import { mapGetters } from "vuex";
import { baseTheme } from "@/utils/theme";
import { generateTree } from "@/utils/generateTree";
// api
import { getDicTree, deleteDicNode } from "@/api/systemparams";

export default {
  name: "OrganizationTree",
  data() {
    return {
      orgTreeData: [],
      contextmenuSelectedNode: null,
      defaultProps: {
        label: "name"
      }
    };
  },
  props: {
    clickedNodeData: {
      type: Object
    }
  },
  computed: {
    ...mapGetters(["systemTheme"]),
    selectedNode() {
      return this.clickedNodeData;
    },
    systemColor() {
      return baseTheme[this.systemTheme];
    }
  },
  mounted() {
    this.initOrgTree();
  },
  methods: {
    initOrgTree() {
      getDicTree().then(res => {
        this.orgTreeData = generateTree(res);
      });
    },
    // 节点点击事件
    handleNodeClick(data, node, nodeCom) {
      this.$emit("nodeClick", { data, node, nodeCom });
    },
    // 节点右键弹出菜单
    showContextMenu(event, data, node, nodeCom) {
      if (node) {
        const tree = this.$refs.tree;
        const contextMenu = this.$refs.treeMenu;
        // 右键设置当前树节点为选中状态
        this.contextmenuSelectedNode = data;
        tree.setCurrentKey(data.id);
        // 弹出菜单
        contextMenu.show({ top: event.clientY, left: event.clientX });
      }
    },
    update() {
      this.initOrgTree();
      // console.log('tree updated.')
    },
    // 菜单 -- 新建
    createOrg() {
      this.$emit("update:isCreate", true);
      this.$emit("openDialog", "OrgUpdate", this.contextmenuSelectedNode);
    },
    // 菜单 -- 编辑
    editOrg() {
      this.$emit("update:isCreate", false);
      this.$emit("openDialog", "OrgUpdate", this.contextmenuSelectedNode);
    },
    // 菜单 -- 删除
    deleteOrg() {
      const { name, id } = this.contextmenuSelectedNode;
      if (id) {
        this.$confirm(`此操作将删除字典:[${name}], 确认要删除吗?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            deleteDicNode({ orgUuid: id }).then(res => {
              if (!res.error) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.initOrgTree();
                this.$emit("updateTree", "delete");
              }
            });
          })
          .catch(() => {});
      }
    },
    // 树节点自定义渲染格式 (JSX)
    customRender(createElement, { node, data, store }) {
      // directive 参数参考指令钩子函数中的定义: https://cn.vuejs.org/v2/guide/custom-directive.html
      const directives = [{ name: "contextmenu", arg: "treeMenu" }];
      return (
        <span class="custom-tree-node" {...{ directives }}>
          <span>{node.label}</span>
          {this.$refs.tree.getCurrentNode() &&
            data.id === this.$refs.tree.getCurrentNode().id && (
              <span
                class="active"
                style={{ backgroundColor: this.systemColor }}
              ></span>
            )}
        </span>
      );
    }
  }
};
</script>
<style lang="scss" scoped>
.custom-tree-node {
  position: relative;
  width: 100%;

  .active {
    position: absolute;
    display: inline-block;
    width: 10px;
    height: 10px;
    right: 10px;
    top: 3px;
    border-radius: 10px;
  }
}
</style>
