<template>
  <el-dialog
    width="600px"
    title="菜单授权"
    :visible="isVisible"
    @close="cancel"
  >
    <div class="tree-content">
      <el-tree
        ref="tree"
        :data="treeData"
        node-key="id"
        :props="defaultProps"
        :show-checkbox="true"
        :default-checked-keys="checkedNodes"
        :default-expanded-keys="expandNodes"
        @check="handleCheckNode"
      ></el-tree>
    </div>
    <template slot="footer" class="flex-right">
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </template>
  </el-dialog>
</template>
<script>
/**
 * RolesMenu Tree Resouces Component
 * ----------------------
 * Author: zhou qi
 * Date: 2018.03.20
 */
import { generateTree } from "@/utils/generateTree";
// api
import {
  getRolesMenuRes,
  updateRolesMenuRes,
  getRolesMenuAuthRes
} from "@/api/role";

export default {
  name: "RoleMenuRes",
  data() {
    return {
      isVisible: false,
      treeData: [],
      originalTreeData: null,
      checkedNodes: [],
      expandNodes: [],
      defaultProps: {
        label: "name"
      }
    };
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    roleData: {
      type: Object,
      required: true
    },
    searchParams: {
      type: Object
    }
  },
  watch: {
    show(isShow) {
      if (isShow) {
        this.initLineTree();
      }
      this.isVisible = isShow;
    }
  },

  methods: {
    initLineTree() {
      this.checkedNodes = [];
      this.originalTreeData = [];
      this.treeData = [];
      const roleParentId = this.roleData.roleUuid;
      getRolesMenuRes({ roleParentId })
        .then(res => {
          this.originalTreeData = res;
          this.treeData = generateTree(res);
          let checkedNodes = [];
          let checkedNodesId = [];
          res.forEach(node => {
            // if (node.checked) this.checkedNodes.push(node.id)
            if (node.pId === "") this.expandNodes.push(node.id);
            if (node.checked === true) checkedNodes.push(node);
          });
          const needToCheckedNodes = this.getOnlyChildrenNodes(checkedNodes);
          for (let item of needToCheckedNodes) {
            checkedNodesId.push(item.id);
          }
          this.$refs.tree.setCheckedKeys(checkedNodesId, true);
        })
        .then(() => {
          //   // 查找已授权菜单数据,并默认勾选/my/info/get/my/info/get
          //   const roleUuid = this.roleData.roleUuid
          //   getRolesMenuAuthRes({roleUuid}).then(res => {
          //     // if (res && res.length) {
          //     //   this.checkedNodes = res
          //     // } else {
          //     //   this.checkedNodes = []
          //     // }
          //     const needToCheckedNodes = this.getOnlyChildrenNodes(res)
          //     this.$refs.tree.setCheckedKeys(needToCheckedNodes)
          //     // console.log('needToCheckedNodes', needToCheckedNodes)
          //   })
        });
    },
    /**
     * 过滤后端获取到的所有节点中，仅为最末子节点的节点数据
     * @param {nodeIds}
     * @return [Array]
     */
    getOnlyChildrenNodes(nodeIds) {
      return nodeIds.filter(nodeId => !nodeId.children.length);
    },
    handleCheckNode(data, checked, indeterminate) {
      // console.log(data, checked, indeterminate)
      const checkedNodes = this.$refs.tree.getCheckedKeys();
      const halfCheckedNodes = this.$refs.tree.getHalfCheckedKeys();
      const allCheckedNodes = checkedNodes.concat(halfCheckedNodes);
      this.checkedNodes = allCheckedNodes;
      // console.log('checkedNodes', this.checkedNodes)
    },
    save() {
      this.handleCheckNode();
      const params = {
        roleResourceRoleId: this.roleData.roleUuid,
        roleResourceResourceId: this.checkedNodes.join(",")
      };
      updateRolesMenuRes(params).then(res => {
        this.$message({
          message: `菜单授权成功!`,
          type: "success"
        });
        this.$emit("updateList", this.searchParams);
        this.cancel();
      });
    },
    cancel() {
      this.$emit("update:show", false);
      this.$emit("update:roleData", Object.create(null));
      this.isVisible = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.tree-content {
  max-height: 400px;
  overflow-y: auto;
}
</style>
