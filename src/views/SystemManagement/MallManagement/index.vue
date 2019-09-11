<template>
  <div>
    <nav-button>
      <el-button-group>
        <el-button icon="xhefont icon-add-new" @click.native="handleAdd()"
          >新增</el-button
        >
        <!--<el-button icon="xhefont icon-cancel-new" @click.native="cancel()" :disabled="!isButtonIsDisabled()">删除</el-button>-->
      </el-button-group>
    </nav-button>
    <common-table :flex="230">
      <template slot="table">
        <el-table
          ref="roleTable"
          height="100%"
          stripe
          v-loading="isListLoading"
          :data="tableData"
          tooltip-effect="light"
          @selection-change="selected => (selectRow = selected)"
        >
          <el-table-column
            type="index"
            :index="indexMethod"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column
            prop="name"
            sortable
            label="名称"
            width="150"
            :show-tooltip-when-overflow="true"
          ></el-table-column>
          <el-table-column
            prop="city"
            sortable
            label="所属城市"
            width="150"
            :show-tooltip-when-overflow="true"
          ></el-table-column>
          <el-table-column
            prop="location"
            label="详细地址"
            min-width="200"
            :show-tooltip-when-overflow="true"
          ></el-table-column>
          <el-table-column
            prop="personInCharge"
            label="负责人"
            min-width="200"
            :show-tooltip-when-overflow="true"
          ></el-table-column>
          <el-table-column
            prop="phone"
            label="负责人电话"
            min-width="200"
            :show-tooltip-when-overflow="true"
          ></el-table-column>
          <el-table-column
            prop="remark"
            label="描述"
            min-width="200"
            :show-tooltip-when-overflow="true"
          ></el-table-column>
          <el-table-column label="操作" fixed="right" width="150">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click.stop="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                type="text"
                @click.stop="handleDel(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
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
    <!-- 新增仓库-->
    <mall-create
      :show.sync="isCreateFormVisible"
      :isCreate="isCreate"
      :market="clickedNodeData"
      @queryList="queryList"
    />
  </div>
</template>

<script>
import NavButton from "@/components/navButton";
import NavPremissonButton from "@/components/navButton/navPremissonButton";
import CommonWrapper from "@/components/commonWrapper";
import CommonTable from "@/components/commonTable";
import MallCreate from "./Components/MallCreate";
import { mixins } from "@/mixins";
import { getMarket, deleteMarket } from "@/api/warehouse";

export default {
  name: "MallManagement",
  mixins: [mixins],
  data() {
    return {
      tableData: [],
      orgnization: [], // 公用组织机构
      cascaderOrg: [],
      selectRow: [], // 列表选中列
      isListLoading: false, // 列表加载
      isCreateFormVisible: false,
      clickedNodeData: {},
      pagination: {
        // 翻页数据
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      searchParams: {}, // 查询参数
      isCreate: true
    };
  },
  mounted() {
    this.queryList();
  },
  methods: {
    // 查询/翻页公用方法
    queryList() {
      this.updateTable({
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      });
    },
    // 列表翻页
    changePage(pageNum) {
      this.pagination.pageNum = pageNum;
      this.queryList(this.searchParams);
    },
    // 生成列表序号
    indexMethod(index) {
      return (
        index + 1 + (this.pagination.pageNum - 1) * this.pagination.pageSize
      );
    },
    updateTable(params) {
      this.isListLoading = true;
      getMarket(params).then(res => {
        this.tableData = res.content;
        this.pagination.total = res.totalElements;
        this.pagination.pageNum = res.number + 1;
        this.pagination.pageSize = res.size;
        this.isListLoading = false;
      });
    },
    formatOrgName(row) {
      let org = this.orgnization.find(item => item.id === row.warehouseOrgUuid);
      if (org) {
        return org.orgName;
      } else {
        return "";
      }
    },
    handleAdd() {
      this.isCreate = true;
      this.isCreateFormVisible = true;
      this.clickedNodeData = {};
    },
    isButtonIsDisabled() {
      return !!this.selectRow.length;
    },
    // 列表翻页
    changePage(pageNum) {
      this.pagination.pageNum = pageNum;
      this.queryList(this.searchParams);
    },
    handleEdit(index, row) {
      this.clickedNodeData = row;
      this.isCreate = false;
      this.isCreateFormVisible = true;
    },
    handleDel(index, row) {
      this.$confirm("确定删除该商场吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          deleteMarket(row.id).then(res => {
            if (!res.error) {
              this.$message({
                message: "删除成功！",
                type: "success"
              });
              this.queryList();
            }
          });
        })
        .catch(() => {});
    }
  },
  components: {
    NavButton,
    NavPremissonButton,
    CommonWrapper,
    CommonTable,
    MallCreate
  }
};
</script>

<style scoped></style>
