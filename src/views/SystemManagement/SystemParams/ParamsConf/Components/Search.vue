<template>
  <el-form :model="searchForm" ref="searchForm" label-width="80px">
    <el-row>
      <el-col :span="6">
        <el-form-item label="参数名称" prop="spName">
          <el-input v-model="searchForm.spName"></el-input>
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
  name: "ParamsConfSearch",
  data() {
    return {
      searchForm: {
        spName: ""
      }
    };
  },
  mounted() {
    this.search();
  },
  methods: {
    // 检索
    search: function() {
      this.$emit("search", Object.assign({}, this.searchForm));
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
