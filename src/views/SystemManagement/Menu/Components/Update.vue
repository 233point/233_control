<template>
  <el-dialog
    width="670px"
    :title="(isCreate ? '新增' : '编辑') + (isMenuTab ? '菜单' : '按钮')"
    :visible.sync="isVisible"
    @close="cancel"
  >
    <div class="tabs" v-if="isCreate">
      <div
        class="pane"
        @click="createMenu('menu')"
        :style="isMenuTab && activeMenuStyle"
      >
        菜单
      </div>
      <div
        class="pane"
        @click="createMenu('button')"
        :style="!isMenuTab && activeMenuStyle"
      >
        按钮
      </div>
    </div>
    <div class="form">
      <!-- 菜单级别表单 -->
      <div v-show="(isCreate && isMenuTab) || (!isCreate && isEditMenu)">
        <menu-update-form
          :isVisible="isVisible"
          :isCreate="isCreate"
          :nodeData="nodeData"
          :data="formData"
          @save="save"
          @cancel="cancel"
        />
      </div>
      <!-- 按钮级别表单 -->
      <div v-show="(isCreate && !isMenuTab) || (!isCreate && !isEditMenu)">
        <button-update-form
          :isVisible="isVisible"
          :isCreate="isCreate"
          :nodeData="nodeData"
          :data="formData"
          @save="save"
          @cancel="cancel"
        />
      </div>
    </div>
  </el-dialog>
</template>
<script>
/**
 * Menu/Button Add/Edit Component
 * ----------------------
 * Author: zhou qi
 * Date: 2018.03.20
 */
import { mapGetters } from "vuex";
import { baseTheme } from "@/utils/theme";
// api
import { systemMenuDetail } from "@/api/systemparams";

import MenuUpdateForm from "./MenuUpdateForm";
import ButtonUpdateForm from "./ButtonUpdateForm";

export default {
  name: "MenuUpdate",
  data() {
    return {
      isMenuTab: true,
      isEditMenu: true,
      showDetailMode: true,
      isVisible: false,
      formData: null
    };
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    nodeData: {
      type: Object,
      required: true
    },
    isCreate: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(["systemTheme"]),
    systemThemeColor() {
      return baseTheme[this.systemTheme];
    },
    activeMenuStyle() {
      return { borderColor: this.systemThemeColor };
    }
  },
  watch: {
    show(isShow) {
      // 编辑的时候需要获取当前节点信息并传给FORM展现
      if (isShow && !this.isCreate) {
        this.getNodeData();
      }
      // 设置窗口显示状态
      this.isVisible = isShow;
    }
  },
  methods: {
    // 通过当前节点ID获取节点数据
    getNodeData() {
      const params = {
        resourceUuid: this.nodeData.id
      };
      systemMenuDetail(params).then(res => {
        this.formData = this.isCreate ? null : res;
        this.isEditMenu = res.resourceLever === 2;
      });
    },
    createMenu(type) {
      this.isMenuTab = type === "menu";
    },
    save() {
      // 重新读取tree
      this.$emit("updateTree");
      this.cancel();
    },
    cancel() {
      this.isVisible = false;
      this.$emit("update:show", false);
    }
  },
  components: {
    MenuUpdateForm,
    ButtonUpdateForm
  }
};
</script>
<style lang="scss" scoped>
.tabs {
  display: flex;
  position: relative;
  top: -15px;
  margin-bottom: 5px;

  .pane {
    flex: 1 auto;
    text-align: center;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: lighten($base-gray-color, 20%);
    cursor: pointer;
  }
}
// .form {

// }
</style>
