<template>
  <el-dialog
    width="600px"
    title="线路授权"
    :visible="isVisible"
    @close="cancel"
  >
    <div class="tree-content">
      <el-tree
        ref="tree"
        :data="treeData"
        node-key="id"
        :props="defaultProps"
        show-checkbox
        :default-checked-keys="checkedNodes"
        :default-expanded-keys="expandNodes"
        @check-change="handleCheckNode"
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
 * RolesLine Tree Resouces Component
 * ----------------------
 * Author: zhou qi
 * Date: 2018.03.20
 */
import { generateTree } from "@/utils/generateTree";
// api
import {
  getRolesLineRes,
  updateRolesLineRes,
  getRolesLineAuthRes
} from "@/api/role";

export default {
  name: "RoleLineRes",
  data() {
    return {
      isVisible: false,
      treeData: [],
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
      const roleParentId = this.roleData.roleParentId;
      getRolesLineRes({ roleParentId })
        .then(res => {
          this.treeData = generateTree(res);
          res.forEach(node => {
            // if (node.checked) this.checkedNodes.push(node.id)
            if (node.pId === "") this.expandNodes.push(node.id);
          });
        })
        .then(() => {
          // 查找已授权线路数据,并默认勾选
          const roleUuid = this.roleData.roleUuid;
          getRolesLineAuthRes({ roleUuid }).then(res => {
            if (res && res.length) {
              this.checkedNodes = res;
            } else {
              this.checkedNodes = [];
            }
            this.$refs.tree.setCheckedKeys(this.checkedNodes);
          });
        });
    },
    handleCheckNode(data, checked, indeterminate) {
      //   console.log(data, checked, indeterminate)
    },
    getCheckdNodesArr(Nodes) {
      let checkedNodesList = [];
      Nodes.forEach(node => {
        if (node.levelsType === "LINE") {
          checkedNodesList.push(node.id);
        }
      });
      return checkedNodesList;
    },
    save() {
      const checkedNodes = this.$refs.tree.getCheckedNodes();
      let checkdNodesArr = this.getCheckdNodesArr(checkedNodes);
      const parmas = {
        roleList: [this.roleData.rolesUuid],
        lineArr: checkdNodesArr
      };
      console.log("parmas", parmas);
      updateRolesLineRes(parmas).then(res => {
        this.$message({
          message: `授权线路成功!`,
          type: "success"
        });
        this.$emit("updateList");
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
