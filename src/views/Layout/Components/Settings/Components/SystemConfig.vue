<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-24 10:16:10
 * @LastEditTime: 2019-09-02 18:50:25
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="system-config">
    <el-form v-model="systemCfgForm" label-width="120px">
      <el-form-item label="侧边栏折叠">
        <el-switch v-model="systemCfgForm.isShowSidebar"></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "SystemConfig",
  data() {
    return {
      systemCfgForm: {
        isShowSidebar: true
      }
    };
  },
  computed: {
    ...mapGetters(["sidebarState"])
  },
  watch: {
    "systemCfgForm.isShowSidebar": {
      handler: function(isHidden) {
        this.$store.dispatch("collapseSidebar", !isHidden);
      }
    }
  },
  beforeMount() {
    this.systemCfgForm.isShowSidebar = this.sidebarState.isHidden;
  },
  methods: {}
};
</script>
