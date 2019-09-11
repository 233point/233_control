<template>
  <div>
    <!-- 查询 -->
    <common-wrapper>
      <el-form
        :inline="true"
        :model="searchForm"
        ref="searchForm"
        class="demo-form-inline"
      >
        <el-form-item label="查询时间" prop="notifyTime">
          <el-date-picker
            style="width:100%"
            v-model="searchForm.notifyTime"
            type="datetimerange"
            :picker-options="dateBefore"
            :default-time="[oftenTime, oftenTime]"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="search">查询</el-button>
          <el-button @click="resetForm('searchForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </common-wrapper>
    <common-wrapper>
      <common-table :flex="230">
        <template slot="table">
          <el-table
            ref="roleTable"
            height="100%"
            stripe
            v-loading="isListLoading"
            :data="tableData"
          >
            <el-table-column
              type="index"
              :index="indexMethod"
              label="序号"
              min-width="50"
            ></el-table-column>
            <el-table-column
              prop="xlsLogModel"
              label="功能模块"
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="xlsFilename"
              label="上传文件名"
              min-width="100"
            ></el-table-column>
            <el-table-column
              prop="xlsErrCode"
              label="错误码"
              min-width="100"
            ></el-table-column>
            <el-table-column prop="xlsErrMsg" label="错误日志">
              <template slot-scope="scope">
                <el-popover placement="top-start" width="300" trigger="hover">
                  {{ scope.row.xlsErrMsg }}
                  <div class="remark" slot="reference">
                    {{ scope.row.xlsErrMsg }}
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="xlsLogCreateTime"
              label="创建时间"
              :formatter="formatCreateDate"
            ></el-table-column>
            <el-table-column
              prop="xlsLogCreateUser"
              label="创建人"
            ></el-table-column>
          </el-table>
        </template>
        <template slot="pagination">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page="pagination.pageNum"
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
// 自定义组件
import CommonWrapper from "@/components/commonWrapper";
import CommonTable from "@/components/commonTable";

// api
import { checkImportLog } from "@/api/common.js";
export default {
  name: "UploadLog",
  props: {
    modelName: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      searchForm: {
        notifyTime: ["", ""],
        mdStartDate: "",
        mdEndDate: "",
        xlsLogModel: ""
      },
      pagination: {
        // 翻页数据
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      dateBefore: {
        disabledDate: time => {
          return time.getTime() > new Date().getTime();
        }
      },
      oftenTime: moment().format("HH:mm:ss"),
      tableData: [],
      isListLoading: false
    };
  },
  watch: {
    "searchForm.notifyTime": function(time) {
      if (time.length) {
        this.searchForm.mdStartDate = moment(time[0]) ? moment(time[0]) : "";
        this.searchForm.mdEndDate = moment(time[1]) ? moment(time[1]) : "";
      }
    }
  },
  mounted() {
    // 初始化后先根据默认条件查询数据
    this.initTime();
    this.search();
  },
  methods: {
    initTime() {
      const startTime = moment().subtract(1, "d");
      const endTime = moment().subtract(0, "d");
      this.searchForm.notifyTime = [startTime, endTime];
      this.searchForm.mdStartDate = startTime;
      this.searchForm.mdEndDate = endTime;
    },
    // 转换查询参数为后端需要的参数格式
    convertSearchParams() {},
    search() {
      const searchParams = {
        mdStartDate: this.searchForm.mdStartDate,
        mdEndDate: this.searchForm.mdEndDate,
        xlsLogModel: this.modelName,
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      };
      this.isListLoading = true;
      checkImportLog(searchParams).then(res => {
        this.tableData = res.list;
        this.pagination.total = res.total;
        this.pagination.pageNum = res.pageNum;
        this.pagination.pageSize = res.pageSize;
        this.isListLoading = false;
      });
    },
    resetForm(formName) {
      this.$refs.searchForm.resetFields();
      // this.initTime()
      this.searchForm.mdStartDate = "";
      this.searchForm.mdEndDate = "";
      this.pagination.pageNum = 1;
      this.search();
    },
    // 生成列表序号
    indexMethod(index) {
      return (
        index + 1 + (this.pagination.pageNum - 1) * this.pagination.pageSize
      );
    },
    // 列表日期格式化
    formatCreateDate(row) {
      if (row.xlsLogCreateTime) {
        return moment(row.xlsLogCreateTime).format("YYYY-MM-DD HH:mm:ss");
      }
    },
    // 列表翻页
    changePage(pageNum) {
      this.pagination.pageNum = pageNum;
      this.search();
    }
  },
  components: {
    CommonWrapper,
    CommonTable
  }
};
</script>

<style lang="scss" scoped>
.remark {
  width: 100%;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
