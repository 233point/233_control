<template>
  <div>
    <v-contextmenu ref="treeMenu">
      <v-contextmenu-item @click="createOrg">新增菜单</v-contextmenu-item>
      <v-contextmenu-item @click="editOrg">修改菜单</v-contextmenu-item>
      <v-contextmenu-item @click="deleteOrg">删除菜单</v-contextmenu-item>
    </v-contextmenu>
    <el-button @click="addRoot" class="addRoot">创建根节点</el-button>
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
 * System Menu Tree Component
 * ----------------------
 * Author: zhou qi
 * Date: 2018.06.13
 */
import { mapGetters } from "vuex";
import { baseTheme } from "@/utils/theme";
import { generateTree } from "@/utils/generateTree";
// api
import { systemMenuTreeList, systemMenuDelete } from "@/api/systemparams";

export default {
  name: "SystemMenuTree",
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
      systemMenuTreeList().then(res => {
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
      //   console.log('tree updated.')
    },
    // 新增根节点
    addRoot() {
      this.$emit("update:isCreate", true);
      this.$emit("openDialog", "MenuUpdate", { addRoot: true });
    },
    // 菜单 -- 新增
    createOrg() {
      this.$emit("update:isCreate", true);
      this.$emit("openDialog", "MenuUpdate", this.contextmenuSelectedNode);
    },
    // 菜单 -- 编辑
    editOrg() {
      this.$emit("update:isCreate", false);
      this.$emit("openDialog", "MenuUpdate", this.contextmenuSelectedNode);
    },
    // 菜单 -- 删除
    deleteOrg() {
      const { name, id } = this.contextmenuSelectedNode;
      if (id) {
        this.$confirm(`确认要删除:[${name}]菜单吗?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            systemMenuDelete({ resourceUuid: id }).then(res => {
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
  .addRoot {
    margin-left: 20px;
  }
}
</style>
