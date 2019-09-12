<template>
  <div class="org-content">
    <div class="empty" v-if="!orgNodeData">
      <h3>请在左侧选择一个组织机构</h3>
      <h5>右击节点可进行操作</h5>
    </div>
    <div class="main-content" v-else>
      <div class="org-form">
        <el-row>
          <el-col :span="12">
            <span class="label">机构名称</span>
            <span class="content">{{ orgNodeData.orgName }}</span>
          </el-col>
          <el-col :span="12">
            <span class="label">机构简称</span>
            <span class="content">{{ orgNodeData.name }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span class="label">机构类型</span>
            <span class="content">{{ orgNodeData.orgType }}</span>
          </el-col>
          <el-col :span="12">
            <span class="label">上级机构</span>
            <span class="content">{{ orgNodeData.orgParentName }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span class="label">显示顺序</span>
            <span class="content">{{ orgNodeData.sortIndex }}</span>
          </el-col>
          <el-col :span="12">
            <span class="label">状态</span>
            <span class="content">{{
              orgNodeData.orgEnabled === 1 ? "启用" : "禁用"
            }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <span class="label">机构描述</span>
            <span class="content">{{ orgNodeData.orgDesc }}</span>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * Organization Detail Component
 * ----------------------
 * Author: zhou qi
 * Date: 2018.03.20
 */
// api
import { getOrgDetail } from "@/api/organization";

export default {
  name: "OrgDetail",
  data() {
    return {
      orgNodeData: null
    };
  },
  props: {
    nodeData: {
      type: Object,
      required: true
    }
  },
  watch: {
    nodeData: {
      handler(nodeData) {
        this.getDetail();
      },
      deep: true
    }
  },
  methods: {
    refresh(type) {
      this.getDetail();
    },
    initDetail() {
      this.orgNodeData = null;
    },
    getDetail() {
      if (this.nodeData) {
        this.orgNodeData = Object.assign({}, this.nodeData);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.org-content {
  display: flex;
  flex-direction: column;
  align-items: center;

  .empty {
    padding: 30px;
    font-size: 2rem;
    color: #f2f2f2;
  }

  .main-content {
    width: 100%;
    max-width: 1200px;

    .org-form {
      margin: 10px;
      padding: 10px;
      border: 1px solid #f2f2f2;
      border-radius: 8px;
      font-size: 1.2rem;
      box-sizing: border-box;

      .el-row {
        border-bottom: 1px solid #f2f2f2;

        span {
          display: inline-block;
          padding: 10px 5px;

          &.label {
            font-weight: 600;
          }
        }

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
