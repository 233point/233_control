<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2018-11-19 09:10:17
 * @LastEditTime: 2019-09-04 13:54:34
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <!-- 查询 -->
    <common-wrapper>
      <template-search
        class="search"
        :waybillTypeList="waybillTypeList"
        :linkTypeList="linkTypeList"
        @search="search"
        @rest="rest"
      />
    </common-wrapper>
    <el-row class="order_search">
      <el-col :span="24" class="order_search_title">
        <div>
          <span class="title">问题列表</span>
          <!-- <a href="javascript:;" @click.stop="handleAdd">新增问题</a> -->
        </div>
      </el-col>
    </el-row>
    <!-- 产品列表 -->
    <el-table
      ref="userTable"
      tooltip-effect="light"
      v-loading="isListLoading"
      :data="tableData"
      @row-click="getTemplateDetail"
      @selection-change="selected => (selectRow = selected)"
    >
      <el-table-column
        type="index"
        :index="indexMethod"
        label="序号"
        width="50"
      ></el-table-column>
      <el-table-column
        prop="waybillType"
        label="配送方式"
        :formatter="wayBillTypeFormatter"
      ></el-table-column>
      <el-table-column
        prop="type"
        label="回访对象"
        max-width="100"
        :formatter="typeFormatter"
      ></el-table-column>
      <el-table-column
        prop="linkType"
        label="环节"
        :formatter="linkTypeFormatter"
      ></el-table-column>
      <el-table-column
        prop="question"
        label="问题"
        max-width="200"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column type="expand" label="问题详情" width="120">
        <template slot-scope="scope">
          <div style="width:60%;margin-right:25%">
            <question-detail :info="scope.row"></question-detail>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="answerType"
        label="答案类型"
        :formatter="answerTypeFormatter"
      ></el-table-column>
      <el-table-column
        label="答案"
        max-width="160"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.answerType != 'input'">{{
            scope.row.answer.join("、")
          }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" width="190" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            @click.stop="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-divider direction="vertical"></el-divider>
          <el-button
            size="mini"
            type="text"
            @click.stop="handleDel(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column> -->
    </el-table>
    <div class="xhe-page">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :current-page.sync="pagination.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @current-change="changePage"
        @size-change="handleSizeChange"
      ></el-pagination>
    </div>

    <template-edit
      :show.sync="isEditFormVisible"
      :isCreate="isCreate"
      :waybillTypeList="waybillTypeList"
      :linkTypeList="linkTypeList"
      :searchParams="searchParams"
      :modifyTemplate.sync="modifyTemplate"
      @updateList="queryList"
    />
  </div>
</template>

<script>
/**
 * Product Template Module
 * ----------------------
 * Author: Calamus
 * Date: 2018.08.28
 */
import moment from "moment";
// 全局混入
import { mixins } from "@/mixins";
// 自定义组件
import NavButton from "@/components/navButton";
import CommonWrapper from "@/components/commonWrapper";
import CommonTable from "@/components/commonTable";
import TemplateSearch from "./Components/Search";
import TemplateEdit from "./Components/TemplateEdit";
import QuestionDetail from "./Components/detail";
import { setSession, getSession } from "@/utils/session";

// API
import { getAllWithRoleType } from "@/api/common";
import { linkTypeList, Waybill_Type_List } from "@/utils/ENUM";
import {
  getQuestionList,
  delQuestion,
  updateQuestion,
  addQuestion
} from "@/api/evaluate";

// import {   downloadTemplate, uploadTemplate } from '@/api/warehouse'

export default {
  name: "ProductTemplate",
  components: {
    NavButton,
    CommonWrapper,
    CommonTable,
    TemplateSearch,
    TemplateEdit,
    QuestionDetail
  },
  data() {
    return {
      comp: this,
      buttonData: [],
      tableData: [],
      selectRow: [], // 列表选中列
      isListLoading: false, // 列表加载
      merchantsList: [], // 公用商户列表
      waybillTypeList: Waybill_Type_List,
      linkTypeList: linkTypeList,
      isCreate: true,
      isEditFormVisible: false, // 编辑界面是否显示
      isRoleAuthVisible: false, // 用户角色授权窗口是否展示
      importVisible: false, // 产品导入界面是否展示
      modifyTemplate: null, // 弹出框编辑时存放的临时行数据
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
    this.$refs.userTable.doLayout();
  },
  mounted() {},
  methods: {
    // 查询和初始化查询
    // 查询/翻页公用方法
    search(params) {
      this.pagination.pageNum = 1;
      this.queryList(params);
      this.searchParams = Object.assign({}, params);
    },
    handleSizeChange(pageSize) {
      this.pagination.pageSize = pageSize;
      this.queryList(this.searchParams);
    },
    queryList(params) {
      var searchParams = this.searchParams;
      if (params) {
        searchParams = params;
      }
      this.getProductTemplate({
        ...searchParams,
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      });
    },
    // 获取模板列表
    getProductTemplate(params) {
      this.isListLoading = true;
      getQuestionList(params).then(res => {
        this.tableData = res.item;
        this.pagination.total = res.total;
        this.pagination.pageNum = res.pageNum;
        this.pagination.pageSize = res.pageSize;
        this.isListLoading = false;
      });
    },
    rest(params) {
      const searchParams = (this.searchParams = params);
      this.getProductTemplate({
        ...searchParams,
        pageNum: 1,
        pageSize: this.pagination.pageSize
      });
    },
    // 显示编辑界面
    handleEdit(index, row) {
      this.modifyTemplate = row;
      this.isEditFormVisible = true;
      this.isCreate = false;
    },
    // 显示新增界面
    handleAdd() {
      this.isEditFormVisible = true;
      this.isCreate = true;
    },
    // 显示产品导入界面
    handleImport() {
      this.importVisible = true;
    },
    // 单行点击查看详情
    getTemplateDetail(row, event) {
      // console.log(row)
    },
    // 单行删除
    handleDel(index, row) {
      this.$confirm("确认删除该问题吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.delQuestion({ id: row.id });
        })
        .catch(() => {});
    },
    // 批量删除
    batchRemove() {
      this.$confirm("确认删除选中的问题吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          let userIds = [];
          this.selectRow.map(row => userIds.push(row.userUuid));
          this.isListLoading = true;
          this.delQuestion(userIds).then(() => {
            this.isListLoading = false;
          });
        })
        .catch(() => {});
    },
    // 删除接口封装
    delQuestion(id) {
      return delQuestion(id).then(res => {
        this.$message({
          message: "删除成功",
          type: "success"
        });
        this.queryList(this.searchParams);
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
    answerTypeFormatter(row) {
      return row.answerType == "radio"
        ? "单选"
        : row.answerType == "checkbox"
        ? "多选"
        : "用户填写";
    },
    wayBillTypeFormatter(row) {
      let msg = "";
      this.waybillTypeList.map(item => {
        if (item.code == row.waybillType) {
          msg = item.msg;
        }
      });
      return msg;
    },
    typeFormatter(row) {
      return row.type == "1" ? "顾客端" : "商户端";
    },
    linkTypeFormatter(row) {
      let msg = "";
      this.linkTypeList.map(item => {
        if (item.value == row.linkType) {
          msg = item.label;
        }
      });
      return msg;
    },
    dealAnswer(row) {
      console.log(row);
      let labelList = [];
      row.map(item => {
        // item = JSON.parse(item)
        labelList.push(item.label);
      });
      return labelList.join("、");
    }
  }
};
</script>

<style lang="scss" scoped>
.xhe-page {
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
}
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
<style lang="scss">
.row_list {
  padding: 0px !important;
  .choose_row_list {
    width: 100%;
    height: 100%;
    .head {
      padding: 8px 12px;
      background: #dcdcdc;
      display: flex;
      justify-content: space-between;
    }
    .el-checkbox-group {
      min-height: 100px;
      max-height: 300px;
      overflow: auto;
      padding: 8px 12px;
      label {
        display: block !important;
      }
    }
  }
}
</style>
