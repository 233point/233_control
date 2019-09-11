<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-24 15:15:12
 * @LastEditTime: 2019-08-14 17:55:48
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <el-row>
      <common-wrapper>
        <el-form
          :model="searchForm"
          ref="searchForm"
          :inline="true"
          label-width="120px"
        >
          <el-form-item>
            <el-input
              style="width:380px"
              v-model="searchForm.servicePersonalInfo"
              placeholder="请输入账号/姓名/手机号码查询"
              :clearable="true"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native="search">查询</el-button>
            <el-button @click="resetForm('searchForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </common-wrapper>
    </el-row>

    <el-row class="order_search">
      <el-col :span="24" class="order_search_title">
        <div>
          <span class="title">配装经理列表</span>
          <el-button
            size="mini"
            v-if="showBtn('handleAddManager')"
            @click.stop="handleAddManager"
          >
            新增配装经理
          </el-button>
          <el-button
            size="mini"
            v-if="$store.getters.roleType == 'carrier' && showBtn('handleBind')"
            @click.stop="handleBind"
          >
            绑定商户
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CommonWrapper from "@/components/commonWrapper";
import { setSession, getSession } from "@/utils/session";
import moment from "moment";
import { simpleTabs, TabItem } from "@/components/simpleTabs/index.js";
import { Order_Search_list, Order_Status_List } from "@/utils/ENUM";
import { mapGetters } from "vuex";

export default {
  name: "Search",
  components: { CommonWrapper },
  data() {
    return {
      // 检索界面数据
      searchForm: {
        type: "2",
        servicePersonalInfo: "",
        ownerId: ""
      },
      isRowIndeterminate: true,
      rowCheckAll: false,
      rowChoosed: [],
      canExport: false
    };
  },
  props: {
    upLen: {
      type: Boolean,
      default: true
    },
    choose: {
      type: Array
    },
    buttonData: {
      type: Array
    }
  },
  watch: {
    "searchForm.type": function(newVal, oldVal) {
      if (newVal != oldVal) {
        this.search();
      }
    }
  },
  mounted() {
    this.searchForm.type =
      this.roleType == "carrier" || this.roleType == "assemblyManager"
        ? "2"
        : "0";
    this.searchForm.ownerId = this.userId;
    this.$emit("search", Object.assign({}, this.searchForm));
  },
  computed: {
    ...mapGetters(["roleType", "userId"])
  },
  methods: {
    handleAdd() {
      this.$emit("add");
    },
    handleAddManager() {
      this.$emit("addManager");
    },
    handleBind() {
      this.$emit("bind");
    },
    handleExport() {
      this.$emit("import");
    },
    // 检索
    search() {
      this.searchForm.ownerId = this.userId;
      this.$emit("search", Object.assign({}, this.searchForm));
    },
    // 重置
    resetForm(formName) {
      (this.searchForm = {
        type:
          this.roleType == "carrier" || this.roleType == "assemblyManager"
            ? "2"
            : "0",
        servicePersonalInfo: "",
        ownerId: this.userId
      }),
        this.$emit("rest", Object.assign({}, this.searchForm));
    },
    handleCommand(command) {
      switch (command) {
        case "cancel":
          this.$emit("cancel");
          break;
        case "print":
          this.$emit("print");
          break;
      }
    },
    showBtn(method) {
      return this.buttonData.some(item => {
        return item.resourceUrl == method;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.order_search {
  margin: 0.5rem 1rem;
  border-bottom: 1px solid #ebeef5;
  .order_search_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      color: var(--color-primary);
      font-size: 16px;
      font-weight: 500;
      border-bottom: 2px solid var(--color-primary);
      padding: 0.5rem 2rem 0.5rem 1rem;
    }
    .el-icon-refresh,
    .el-icon-circle-plus-outline,
    .el-icon-folder-opened {
      font-size: 18px;
    }
  }
}
</style>
