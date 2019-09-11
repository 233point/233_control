<template>
  <div>
    <!-- <header-breadcrumb :breadData="$route.matched" /> -->
    <nav-button>
      <el-button-group>
        <nav-premisson-button
          :comp="comp"
          :buttonData="buttonData"
        ></nav-premisson-button>
      </el-button-group>
    </nav-button>
    <!--<nav-button>-->
    <!--<el-button-group>-->
    <!--<el-button icon="fdddfont icon-add-new" @click="handleAdd">新建</el-button>-->
    <!--<el-button icon="fdddfont icon-delete" :disabled="!selectRow.length" @click="batchRemove">删除</el-button>-->
    <!--</el-button-group>-->
    <!--</nav-button>-->
    <!-- 查询 -->
    <common-wrapper>
      <params-conf-search class="search" @search="queryList" @rest="rest" />
    </common-wrapper>
    <!-- 用户列表 -->
    <common-wrapper>
      <common-table :flex="230">
        <template slot="table">
          <el-table
            ref="paramsTable"
            height="100%"
            stripe
            v-loading="isListLoading"
            :data="tableData"
            @selection-change="selected => (selectRow = selected)"
          >
            <el-table-column type="selection" width="30"></el-table-column>
            <el-table-column
              type="index"
              :index="indexMethod"
              label="序号"
            ></el-table-column>
            <el-table-column prop="spName" label="参数名称"></el-table-column>
            <el-table-column prop="spCode" label="参数编码"></el-table-column>
            <el-table-column prop="spValue" label="参数值"></el-table-column>
            <el-table-column prop="spRemark" label="备注"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  round
                  icon="fdddfont icon-modify"
                  @click.stop="handleEdit(scope.$index, scope.row)"
                ></el-button>
                <!--<el-button size="mini" round icon="fdddfont icon-delete" @click.stop="handleDel(scope.$index, scope.row)"></el-button>-->
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
    </common-wrapper>
    <!-- 参数新建/修改 -->
    <params-update
      :show.sync="isShowParamsDialog"
      :paramsData.sync="editParams"
      :isCreate="isCreate"
      @updateList="queryList"
    />
  </div>
</template>
<script>
// 全局混入
import { mixins } from "@/mixins";
// 自定义组件
import NavButton from "@/components/navButton";
import NavPremissonButton from "@/components/navButton/navPremissonButton";
import CommonWrapper from "@/components/commonWrapper";
import CommonTable from "@/components/commonTable";
import ParamsConfSearch from "./Components/Search";
import ParamsUpdate from "./Components/ParamsUpdate";
// api
import { paramsListGet, paramsDelete } from "@/api/systemparams";
export default {
  name: "ParamsConf",
  mixins: [mixins],
  components: {
    NavButton,
    NavPremissonButton,
    CommonWrapper,
    CommonTable,
    ParamsConfSearch,
    ParamsUpdate
  },
  data() {
    return {
      comp: this,
      buttonData: [],
      tableData: [],
      selectRow: [], // 列表选中列
      editParams: {}, // 需要编辑的参数对象
      isShowParamsDialog: false, // 新建/编辑窗口打开状态
      isListLoading: false, // 列表加载
      isCreate: true, // 编辑窗口展示新建or编辑
      pagination: {
        // 翻页数据
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      searchParams: {} // 查询参数
    };
  },
  activated() {
    this.$refs.paramsTable.doLayout();
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
      this.isListLoading = true;
      paramsListGet(params).then(res => {
        this.tableData = res.list;
        this.pagination.total = res.total;
        this.pagination.pageNum = res.pageNum;
        this.pagination.pageSize = res.pageSize;
        this.isListLoading = false;
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
    // 显示编辑界面
    handleEdit(index, row) {
      this.isCreate = false;
      this.editParams = row;
      this.isShowParamsDialog = true;
    },
    // 显示新增界面
    handleAdd() {
      this.isCreate = true;
      this.isShowParamsDialog = true;
    },
    // 单行删除
    handleDel(index, row) {
      this.$confirm("确认删除该参数吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.paramsDeletes([row.id]);
        })
        .catch(() => {});
    },
    // 批量删除
    batchRemove() {
      this.$confirm("确认删除选中的参数吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          let paramIds = [];
          this.selectRow.map(row => paramIds.push(row.id));
          this.isListLoading = true;
          this.paramsDeletes(paramIds).then(() => {
            this.isListLoading = false;
          });
        })
        .catch(() => {});
    },
    // 删除接口方法
    paramsDeletes(paramIds) {
      return paramsDelete(paramIds).then(res => {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.queryList();
      });
    },
    // 列表翻页
    changePage(pageNum) {
      this.pagination.pageNum = pageNum;
      this.getParamsList({
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      });
    },
    // 生成列表序号
    indexMethod(index) {
      return (
        index + 1 + (this.pagination.pageNum - 1) * this.pagination.pageSize
      );
    }
  }
};
</script>
