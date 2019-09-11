<template>
  <el-form
    :model="searchForm"
    ref="searchForm"
    class="searchForm"
    label-width="80px"
  >
    <el-form-item label="车牌号" prop="plateNo">
      <el-input
        v-model="searchForm.plateNo"
        clearable
        maxlength="50"
        placeholder="请输入车牌号"
      ></el-input>
    </el-form-item>
    <el-form-item label="状态" prop="busStatus">
      <el-select v-model="searchForm.busStatus" clearable>
        <el-option class="radio" value="1" label="运营"></el-option>
        <el-option class="radio" value="0" label="停用"></el-option>
      </el-select>
    </el-form-item>
    <div class="button-group">
      <el-button type="primary" @click.native="search">查询</el-button>
      <el-button @click="resetForm('searchForm')">重置</el-button>
    </div>
  </el-form>
</template>

<script>
/**
 * User Add Component
 * ----------------------
 * Author: Calamus
 * Date: 2018.09.26
 */
import { setSession, getSession } from "@/utils/session";
import { getTreeNode } from "@/utils/generateTree";
import { mapGetters } from "vuex";

export default {
  name: "UserManagementSearch",
  data() {
    return {
      // 检索界面数据
      orgList: [],
      searchForm: {
        plateNo: "",
        status: "",
        ownerId: ""
      }
    };
  },
  props: {},
  computed: {
    ...mapGetters(["roleType", "userId"])
  },
  mounted() {
    this.searchForm.ownerId = this.userId;
    this.search();
  },
  methods: {
    // 检索
    search: function() {
      this.searchForm.ownerId = this.userId;
      this.$emit("search", Object.assign({}, this.searchForm));
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.searchForm.ownerId = this.userId;
      this.$emit("rest", Object.assign({}, this.searchForm));
    },
    projectChange(value) {
      this.$emit("search", Object.assign({}, this.searchForm));
    }
  }
};
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 10px;
}
.searchForm {
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
}
.button-group {
  margin-left: 20px;
  margin-bottom: 10px;
}
</style>
