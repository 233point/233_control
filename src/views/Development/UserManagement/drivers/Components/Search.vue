<template>
  <el-form :model="searchForm" ref="searchForm" label-width="80px">
    <el-row>
      <el-col :span="6">
        <el-form-item label="名称" prop="sys_name">
          <el-input v-model="searchForm.sys_name" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6" class="flex-right">
        <el-button type="primary" @click.native="search">查询</el-button>
        <el-button @click="resetForm('searchForm')">重置</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
export default {
  name: "SysSearch",
  data() {
    return {
      // 检索界面数据
      orgList: [],
      searchForm: {
        sys_name: ""
      }
    };
  },
  props: {},
  mounted() {
    this.search();
  },
  methods: {
    // 检索
    search: function() {
      this.$emit("search", Object.assign({}, this.searchForm));
    },
    // 关闭查询框
    closeSearch: function(formName) {
      this.$emit("closeSearch");
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$emit("rest", Object.assign({}, this.searchForm));
    }
  }
};
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 10px;
}
</style>
