<template>
  <el-form
    :model="searchForm"
    :inline="true"
    ref="searchForm"
    label-width="80px"
    class="searchForm"
  >
    <el-form-item label="问题名称" prop="question">
      <el-input
        class="search-label"
        v-model="searchForm.question"
        placeholder="请输入问题名称"
      ></el-input>
    </el-form-item>
    <el-form-item label="回访对象" prop="type">
      <el-select
        class="search-label"
        v-model="searchForm.type"
        clearable
        filterable
        placeholder="请选择回访对象"
        @change="changeType"
      >
        <el-option label="顾客端" :value="1" />
        <el-option label="商户端" :value="2" />
      </el-select>
    </el-form-item>
    <el-form-item label="配送方式" prop="waybillType">
      <el-select
        class="search-label"
        v-model="searchForm.waybillType"
        clearable
        filterable
        placeholder="请选择配送方式"
        @change="changeWaybillType"
      >
        <el-option
          v-for="(item, index) in waybillTypeList"
          :key="index"
          :label="item.msg"
          :value="item.code"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="环节类型" prop="linkType">
      <el-select
        v-model="searchForm.linkType"
        class="search-label"
        clearable
        filterable
        placeholder="请选择环节类型"
        @change="changeLinkType"
      >
        <el-option
          v-for="(item, index) in dealedLinkTypeList"
          :key="index"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>

    <div class="button-group">
      <el-button type="primary" @click.native="search">查询</el-button>
      <el-button @click="resetForm('searchForm')">重置</el-button>
    </div>
  </el-form>
</template>

<script>
import { setSession, getSession } from "@/utils/session";
export default {
  name: "search",
  data() {
    return {
      searchForm: {
        projectId: "",
        merchantId: "",
        waybillType: "",
        question: "",
        type: "",
        linkType: ""
      }
    };
  },
  props: {
    projectList: {
      type: Array
    },
    merchantList: {
      type: Array
    },
    waybillTypeList: {
      type: Array
    },
    linkTypeList: {
      type: Array
    }
  },
  mounted() {
    this.searchForm.projectId = getSession("projectId");
    this.search();
  },
  computed: {
    dealedLinkTypeList() {
      return this.linkTypeList;
    }
  },
  methods: {
    projectChange(value) {
      setSession("projectId", value);
      this.resetForm("searchForm");
      this.$emit("getMerchantList", { projectId: value });
    },
    changeType(val) {
      if (val) {
        this.searchForm.linkType = "";
      }
    },
    changeWaybillType(val) {
      if (val) {
        this.searchForm.linkType = "";
      }
    },
    changeLinkType(val) {
      console.log("linkType", val);
    },
    // 检索
    search: function() {
      this.$emit("search", Object.assign({}, this.searchForm));
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.searchForm.projectId = getSession("projectId");
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
