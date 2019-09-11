<template>
  <el-form :model="searchForm" ref="searchForm" label-width="80px">
    <el-row>
      <el-col :span="6">
        <el-form-item label="角色名称" prop="rolesName">
          <el-input v-model="searchForm.rolesName" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="状态" prop="rolesEnable">
          <el-select filterable clearable v-model="searchForm.rolesEnable">
            <el-option class="radio" value="1" label="启用"></el-option>
            <el-option class="radio" value="0" label="禁用"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <!-- <el-col :span="6">
          <el-form-item label="描述"  prop="rolesRemark">
            <el-input v-model="searchForm.rolesRemark"></el-input>
          </el-form-item>
      </el-col> -->
      <el-col :span="6" class="flex-right">
        <el-button type="primary" @click.native="search">查询</el-button>
        <el-button @click="resetForm('searchForm')">重置</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
/**
 * Roles Search Component
 * ----------------------
 * Author: zhou qi
 * Date: 2018.03.20
 */
export default {
  name: "RoleManagementSearch",
  data() {
    return {
      searchForm: {
        rolesName: "",
        rolesEnable: "",
        rolesRemark: ""
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
  margin-bottom: 10px !important;
}
</style>
