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
    <!--</el-button-group>-->
    <!--</nav-button>-->
    <!-- 查询 -->
    <common-wrapper>
      <dict-management-search class="search" @search="queryList" @rest="rest" />
    </common-wrapper>
    <common-wrapper>
      <common-table :flex="230">
        <template slot="table">
          <el-table
            ref="dictTable"
            height="100%"
            stripe
            :data="tableData"
            @selection-change="selected => (selectRow = selected)"
          >
            <el-table-column type="selection" width="30"></el-table-column>
            <el-table-column
              type="index"
              :index="indexMethod"
              label="序号"
            ></el-table-column>
            <el-table-column
              prop="code"
              label="数据字典类型编码"
            ></el-table-column>
            <el-table-column
              prop="name"
              label="数据字典类型名称"
            ></el-table-column>
            <el-table-column
              prop="isvalid"
              :formatter="formatStatus"
              label="状态"
            >
              <template slot-scope="scope">
                <div v-if="scope.row.isvalid == 0">
                  <el-button
                    size="mini"
                    type="text"
                    @click="dataDictStatus(scope.$index, scope.row)"
                    >禁用</el-button
                  >
                </div>
                <div v-if="scope.row.isvalid == 1">
                  <el-button
                    size="mini"
                    type="text"
                    @click="dataDictStatus(scope.$index, scope.row)"
                    >启用</el-button
                  >
                </div>
              </template>
              <!--<template slot-scope="scope">-->
              <!--<el-button size="mini" type="text" @click="dataDictStatus(scope.$index, scope.row)">{{dictStatus}}</el-button>-->
              <!--</template>-->
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  round
                  type="text"
                  icon="fdddfont icon-modify"
                  @click.stop="handleEdit(scope.$index, scope.row)"
                ></el-button>
                <el-button
                  size="mini"
                  round
                  type="text"
                  @click="openDict(scope.row)"
                  >数据字典项</el-button
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
    </common-wrapper>
    <dict-update
      :show.sync="isShowDictDialog"
      :dictData.sync="editDict"
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
import DictManagementSearch from "./Components/Search";
import DictUpdate from "./Components/DictUpdate";
import DataDictPro from "./Components/DataDictPro";

// api
import { dataDictListGet, isvalidUpdate } from "@/api/systemparams";
export default {
  name: "DictConf",
  mixins: [mixins],
  components: {
    DictManagementSearch,
    NavButton,
    NavPremissonButton,
    CommonWrapper,
    CommonTable,
    DictUpdate
  },
  data() {
    return {
      comp: this,
      buttonData: [],
      tableData: [],
      selectRow: [], // 列表选中列
      editDict: {}, // 需要编辑的角色对象
      isShowDictDialog: false, // 新建/编辑窗口打开状态
      isListLoading: false, // 列表加载
      isCreate: true, // 编辑窗口展示新建or编辑
      dictStatus: "",
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
    this.$refs.dictTable.doLayout();
  },
  methods: {
    // 查询和初始化查询
    // 查询/翻页公用方法
    queryList(params) {
      const searchParams = (this.searchParams = params);
      this.getDictLists({
        ...searchParams,
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      });
    },
    // 获取列表
    getDictLists(params) {
      // this.isListLoading = true
      dataDictListGet(params).then(res => {
        this.tableData = res.list;
        this.pagination.total = res.total;
        this.pagination.pageNum = res.pageNum;
        this.pagination.pageSize = res.pageSize;
        this.isListLoading = false;
      });
    },
    rest(params) {
      const searchParams = (this.searchParams = params);
      this.getDictLists({
        ...searchParams,
        pageNum: 1,
        pageSize: this.pagination.pageSize
      });
    },
    formatStatus: function(row, column) {
      this.dictStatus = row.isvalid === "1" ? "启用" : "禁用";
      return this.dictStatus;
    },
    // 显示编辑界面
    handleEdit(index, row) {
      this.isCreate = false;
      this.editDict = {
        code: row.code,
        name: row.name,
        isvalid: row.isvalid
      };
      this.isShowDictDialog = true;
    },
    // 显示新增界面
    handleAdd() {
      this.isCreate = true;
      this.isShowDictDialog = true;
    },
    openDict(row) {
      this.$nextPage({
        title: "数据字典项",
        props: {
          row: row
        },
        component: DataDictPro, // 该组件会通过Webpack分开打包,并异步加载
        cache: true
      });
    },
    dataDictStatus(index, row) {
      const status = parseInt(row.isvalid) === 0 ? "启用" : "禁用";
      const validStatus = parseInt(row.isvalid) === 0 ? 1 : 0;
      const params = {
        isvalid: validStatus,
        code: row.code
      };
      this.$confirm("确认修改状态为" + status, "状态修改", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          isvalidUpdate(params).then(res => {
            this.getDictLists({
              pageNum: this.pagination.pageNum,
              pageSize: this.pagination.pageSize
            });
          });
          this.$message({
            type: "success",
            message: "修改成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },
    // 列表翻页
    changePage(pageNum) {
      this.pagination.pageNum = pageNum;
      this.getDictLists({
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
