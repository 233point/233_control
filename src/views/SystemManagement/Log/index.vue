<template>
  <div>
    <common-wrapper>
      <log-search class="search" @search="queryList" @rest="rest" />
    </common-wrapper>
    <common-wrapper v-loading="!isListLoading">
      <common-table :flex="230">
        <template slot="table">
          <el-table ref="paramsTable" height="100%" stripe :data="tableData">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column
              prop="logUserAccount"
              label="用户"
            ></el-table-column>
            <el-table-column prop="logModule" label="模块"></el-table-column>
            <el-table-column prop="logFunction" label="方法"></el-table-column>
            <el-table-column prop="logOperation" label="操作"></el-table-column>
            <el-table-column prop="logDesc" label="描述"></el-table-column>
            <el-table-column prop="logIp" label="IP地址"></el-table-column>
            <el-table-column prop="logType" label="日志类型"></el-table-column>
            <el-table-column
              prop="logCreateTime"
              :formatter="formatTime"
              label="时间"
            ></el-table-column>
          </el-table>
        </template>
        <template slot="pagination">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page.sync="pagination.pageNum"
            :page-size="pagination.pageSize"
            :total="pagination.total"
            @current-change="changePage"
          ></el-pagination>
        </template>
      </common-table>
    </common-wrapper>
  </div>
</template>

<script>
import moment from "moment";
import CommonWrapper from "@/components/commonWrapper";
import CommonTable from "@/components/commonTable";

import LogSearch from "./Components/Search";
// api
import { logpageGet } from "@/api/systemparams";
export default {
  name: "LogManagement",
  components: { CommonWrapper, CommonTable, LogSearch },
  data() {
    return {
      tableData: [],
      isListLoading: false, // 列表加载
      pagination: {
        // 翻页数据
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      searchParams: {} // 查询参数
    };
  },
  methods: {
    // 查询和初始化查询
    // 查询/翻页公用方法
    queryList(params) {
      const searchParams = (this.searchParams = params);
      this.getParamsList({
        ...searchParams,
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      });
    },
    // 获取列表
    getParamsList(params) {
      this.isListLoading = false;
      logpageGet(params).then(res => {
        this.tableData = res.list;
        this.pagination.total = res.total;
        this.pagination.pageNum = res.pageNum;
        this.pagination.pageSize = res.pageSize;
        this.isListLoading = true;
      });
    },
    rest(params) {
      const searchParams = (this.searchParams = params);
      this.getParamsList({
        ...searchParams,
        pageNum: 1,
        pageSize: this.pagination.pageSize
      });
    },
    formatTime: function(row, column) {
      return moment(row.logCreateTime).format("YYYY-MM-DD");
    },
    // 列表翻页
    changePage(pageNum) {
      this.pagination.pageNum = pageNum;
      this.getParamsList({
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      });
    }
  }
};
</script>
