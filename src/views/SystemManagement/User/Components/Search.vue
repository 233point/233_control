<template>
  <el-form :model="searchForm" ref="searchForm" label-width="80px">
    <el-row>
      <el-col :span="6">
        <el-form-item label="账号" prop="userAccount">
          <el-input v-model="searchForm.userAccount" clearable></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="角色" prop="roleType">
          <el-select v-model="searchForm.roleType">
            <el-option
              v-for="(org, index) in allRoleList"
              :key="index"
              :label="org.roleName"
              :value="org.type"
            />
          </el-select>
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
/**
 * User Search Component
 * ----------------------
 * Author: zhou qi
 * Date: 2018.03.20
 */
export default {
  name: "UserManagementSearch",
  data() {
    return {
      // 检索界面数据
      allRoleList: [
        {
          roleName: "自营商户",
          type: "merchant"
        },
        {
          roleName: "半托管商户",
          type: "merchanthalf"
        },
        {
          roleName: "全托管商户",
          type: "merchantall"
        }
      ],
      searchForm: {
        userAccount: "",
        roleType: ""
      }
    };
  },
  props: {
    org: {
      type: Array,
      required: true
    },
    roleList: {
      type: Array
    }
  },
  mounted() {
    this.allRoleList = this.allRoleList.concat(this.roleList);
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
  margin-bottom: 10px !important;
}
</style>
