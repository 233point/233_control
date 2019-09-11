<template>
  <div class="menu-content">
    <div class="empty" v-if="!menuNodeData">
      <h3>请在左侧选择一项菜单</h3>
      <h5>右击节点可进行操作</h5>
    </div>
    <div class="main-content" v-else>
      <div v-if="isMenu">
        <div class="org-form">
          <el-row>
            <el-col :span="12">
              <span class="label">标题</span>
              <span class="content">{{ menuNodeData.resourceTitle }}</span>
            </el-col>
            <el-col :span="12">
              <span class="label">名称</span>
              <span class="content">{{ menuNodeData.resourceName }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <span class="label">模块</span>
              <span class="content">{{ menuNodeData.resourceComponent }}</span>
            </el-col>

            <el-col :span="12">
              <span class="label">图示</span>
              <span class="content">{{ menuNodeData.resourceImage }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <span class="label">状态</span>
              <span class="content">{{
                menuNodeData.resourceEnable === 1 ? "启用" : "禁用"
              }}</span>
            </el-col>
            <el-col :span="12">
              <span class="label">顺序</span>
              <span class="content">{{ menuNodeData.resourceNumber }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <span class="label">路径</span>
              <span class="content">{{ menuNodeData.resourceUrl }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <span class="label">描述</span>
              <span class="content">{{ menuNodeData.resourceDesc }}</span>
            </el-col>
          </el-row>
        </div>
      </div>
      <div v-else>
        <div class="org-form">
          <el-row>
            <el-col :span="12">
              <span class="label">名称</span>
              <span class="content">{{ menuNodeData.resourceTitle }}</span>
            </el-col>
            <el-col :span="12">
              <span class="label">图示</span>
              <span class="content">{{ menuNodeData.resourceImage }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <span class="label">按钮大小</span>
              <span class="content">{{ menuNodeData.resourceSize }}</span>
            </el-col>
            <el-col :span="12">
              <span class="label">顺序</span>
              <span class="content">{{ menuNodeData.resourceNumber }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <span class="label">状态</span>
              <span class="content">{{
                menuNodeData.resourceEnable == "1" ? "启用" : "禁用"
              }}</span>
            </el-col>
            <el-col :span="12">
              <span class="label">事件名称</span>
              <span class="content">{{ menuNodeData.resourceUrl }}</span>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <span class="label">描述</span>
              <span class="content">{{ menuNodeData.resourceDesc }}</span>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * Menu/Button Detail Component
 * ----------------------
 * Author: zhou qi
 * Date: 2018.03.20
 */
// api
import { systemMenuDetail } from "@/api/systemparams";

export default {
  name: "MenuDetail",
  data() {
    return {
      isMenu: true,
      menuNodeData: null
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
      this.menuNodeData = null;
    },
    getDetail() {
      if (this.nodeData) {
        const params = {
          resourceUuid: this.nodeData.id
        };
        systemMenuDetail(params).then(res => {
          this.menuNodeData = res;
          this.isMenu = res.resourceLever === 2;
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.menu-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

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
