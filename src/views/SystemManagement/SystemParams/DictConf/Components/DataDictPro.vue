<template>
  <div>
    <nav-button>
      <el-button-group>
        <el-button icon="fdddfont icon-add-new" @click="handleAdd"
          >新建</el-button
        >
      </el-button-group>
    </nav-button>
    <common-wrapper>
      <common-table :flex="230">
        <template slot="table">
          <el-table
            ref="dataDictTable"
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
              prop="value"
              label="数据字典编码"
            ></el-table-column>
            <el-table-column
              prop="display"
              label="数据字典名称"
            ></el-table-column>
            <el-table-column prop="sort" label="显示顺序"></el-table-column>
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
              <!--<template slot-scope='scope'>-->
              <!--<el-button size='mini' type='text' @click='dataDictStatus(scope.$index, scope.row)'>{{isvalid = 1 ? '启用' : '禁用'}}</el-button>-->
              <!--</template>-->
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  round
                  icon="fdddfont icon-modify"
                  @click.stop="handleEdit(scope.$index, scope.row)"
                ></el-button>
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
    <data-dict-update
      :show.sync="isShowDataDictDialog"
      :dataDict.sync="editDataDict"
      :isCreate="isCreate"
      :row="row"
      @updateList="getDictLists"
    />
  </div>
</template>
<script>
import NavButton from "@/components/navButton";
import CommonWrapper from "@/components/commonWrapper";
import CommonTable from "@/components/commonTable";
import DataDictUpdate from "./DictData/DataDictUpdate";

// api
import { datadictGet, datadictIsvalidUpdate } from "@/api/systemparams";
export default {
  name: "DataDictPro",
  components: { NavButton, CommonWrapper, CommonTable, DataDictUpdate },
  props: {
    row: Object
  },
  data() {
    return {
      tableData: [],
      editDataDict: {}, // 需要编辑的角色对象
      isShowDataDictDialog: false, // 新建/编辑窗口打开状态
      isListLoading: false, // 列表加载
      isCreate: true, // 编辑窗口展示新建or编辑
      pagination: {
        // 翻页数据
        pageNum: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  activated() {
    this.$refs.dataDictTable.doLayout();
  },
  mounted() {
    this.getDictLists();
  },
  methods: {
    // 获取列表
    getDictLists() {
      // this.isListLoading = true
      const params = {
        code: this.row.code,
        pageSize: this.pagination.pageSize,
        pageNum: this.pagination.pageNum
      };
      datadictGet(params).then(res => {
        this.tableData = res.list;
        this.pagination.total = res.total;
        this.pagination.pageNum = res.pageNum;
        this.pagination.pageSize = res.pageSize;
        this.isListLoading = false;
      });
    },
    formatStatus: function(row, column) {
      this.dictStatus = row.isvalid === "1" ? "启用" : "禁用";
      return this.dictStatus;
    },
    // 显示编辑界面
    handleEdit(index, row) {
      this.isCreate = false;
      this.editDataDict = {
        uuid: row.uuid,
        code: row.code,
        value: row.value,
        display: row.display,
        sort: row.sort,
        isvalid: row.isvalid
      };
      this.isShowDataDictDialog = true;
    },
    // 显示新增界面
    handleAdd() {
      this.isCreate = true;
      this.isShowDataDictDialog = true;
    },
    dataDictStatus(index, row) {
      const status = parseInt(row.isvalid) === 0 ? "启用" : "禁用";
      const validStatus = parseInt(row.isvalid) === 0 ? 1 : 0;
      const params = {
        isvalid: validStatus,
        uuid: row.uuid
      };
      this.$confirm("确认修改状态为" + status, "状态修改", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          datadictIsvalidUpdate(params).then(res => {
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
