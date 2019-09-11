<template>
  <div class="org-content">
    <div class="empty" v-if="!orgNodeData">
      <h3>请在左侧选择一个字典</h3>
      <h5>右击节点可进行操作</h5>
    </div>
    <div class="main-content" v-else>
      <div class="org-form">
        <el-row>
          <el-col :span="12">
            <span class="label">字典Id</span>
            <span class="content">{{ orgNodeData.dicUuid }}</span>
          </el-col>
          <el-col :span="12">
            <span class="label">字典编码</span>
            <span class="content">{{ orgNodeData.dicNumber }}</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <span class="label">中文名称</span>
            <span class="content">{{ orgNodeData.dicName }}</span>
          </el-col>
          <el-col :span="12">
            <span class="label">父节点</span>
            <span class="content">{{ orgNodeData.dicPid }}</span>
          </el-col>
        </el-row>
        <!-- <el-row>
                    <el-col :span="12">
                        <span class="label">显示顺序</span>
                        <span class="content">{{ orgNodeData.orgSortIndex }}</span>
                    </el-col>
                    <el-col :span="12">
                        <span class="label">状态</span>
                        <span class="content">{{ orgNodeData.orgEnabled === 1 ? '启用' : '禁用' }}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <span class="label">字典描述</span>
                        <span class="content">{{ orgNodeData.orgDesc }}</span>
                    </el-col>
                </el-row> -->
      </div>
    </div>
  </div>
</template>
<script>
/**
 * Dic Detail Component
 * ----------------------
 * Author: Calamus
 * Date: 2018.09.03
 */
// api
import { getDicDetail } from "@/api/systemparams";

export default {
  name: "DicDetail",
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
        const params = {
          orgUuid: this.nodeData.id
        };
        getDicDetail(params).then(res => {
          this.orgNodeData = res;
        });
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
    color: darken($base-light-color, 15%);
  }

  .main-content {
    width: 100%;
    max-width: 1200px;

    .org-form {
      margin: 10px;
      padding: 10px;
      border: 1px solid darken($base-light-color, 5%);
      border-radius: 8px;
      font-size: 1.2rem;
      box-sizing: border-box;

      .el-row {
        border-bottom: 1px solid darken($base-light-color, 5%);

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
