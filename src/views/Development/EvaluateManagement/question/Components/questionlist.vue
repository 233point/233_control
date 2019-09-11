<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-02-18 13:42:25
 * @LastEditTime: 2019-02-18 13:42:25
 * @LastEditors: your name
 -->
<template>
  <el-dialog
    width="800px"
    top="5vh"
    title="选择关联问题"
    v-if="isVisible"
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :lock-scroll="true"
    @close="cancel"
    :append-to-body="true"
    center
  >
    <user-search
      :waybillTypeList="waybillTypeList"
      :linkTypeList="linkTypeList"
      @search="search"
    />
    <common-wrapper>
      <common-table :flex="400">
        <template slot="table">
          <el-table
            ref="tableData"
            height="100%"
            stripe
            tooltip-effect="light"
            v-loading="isListLoading"
            :data="tableData"
            highlight-current-row
            @current-change="handleCurrentChange"
          >
            <el-table-column label="选择" width="70" center>
              <template slot-scope="scope">
                <el-radio
                  class="radio"
                  v-model="radio"
                  :label="scope.$index"
                  @change.native="getCurrentRow(scope.$index)"
                  >&nbsp;</el-radio
                >
              </template>
            </el-table-column>
            <el-table-column
              type="index"
              :index="indexMethod"
              label="序号"
              width="50"
            ></el-table-column>
            <el-table-column
              prop="waybillType"
              label="配送方式"
              :formatter="WaybillTypeFormatter"
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
    <el-row style="margin-top:10px">
      <el-col :span="24" class="flex-right">
        <el-button type="primary" @click="save()">提交</el-button>
        <el-button @click="cancel()">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import NavButton from "@/components/navButton";
import CommonWrapper from "@/components/commonWrapper";
import CommonTable from "@/components/commonTable";
import UserSearch from "./Search";
import { getQuestionList } from "@/api/evaluate";
import QuestionDetail from "./detail";

import moment from "moment";

export default {
  name: "TemplateSelect",
  components: {
    NavButton,
    CommonWrapper,
    CommonTable,
    UserSearch,
    QuestionDetail
  },
  data() {
    return {
      isVisible: false,
      radio: false,
      isListLoading: false,
      selectRow: [],
      tableData: [],
      pagination: {
        // 翻页数据
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      searchParams: {}, // 查询参数
      currentRow: null,
      radio: false
    };
  },
  props: {
    show: {
      type: Boolean
    },
    modifyTemplate: {
      type: Object
    },
    waybillTypeList: {
      type: Array
    },
    linkTypeList: {
      type: Array
    }
  },
  watch: {
    show(isShow) {
      this.isVisible = isShow;
    }
  },
  mounted() {},
  methods: {
    // 查询和初始化查询
    // 查询/翻页公用方法
    search(params) {
      this.pagination.pageNum = 1;
      params.joinCalculation = "0";
      this.queryList(params);
      this.searchParams = Object.assign({}, params);
    },
    queryList(params) {
      const searchParams = (this.searchParams = params);
      this.radio = false;
      this.getProductTemplate({
        ...searchParams,
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      });
    },
    // 列表翻页
    changePage(pageNum) {
      this.pagination.pageNum = pageNum;
      this.queryList(this.searchParams);
      this.radio = false;
    },
    // 生成列表序号
    indexMethod(index) {
      return (
        index + 1 + (this.pagination.pageNum - 1) * this.pagination.pageSize
      );
    },
    // 获取模板列表
    getProductTemplate(params) {
      console.log(params);
      this.isListLoading = true;
      getQuestionList(params).then(res => {
        this.tableData = res.item;
        this.pagination.total = res.total;
        this.pagination.pageNum = res.pageNum;
        this.pagination.pageSize = res.pageSize;
        this.isListLoading = false;
      });
    },
    dataFormatter(row, col) {
      if (row[col.property]) {
        return moment(row[col.property]).format("YYYY-MM-DD HH:mm");
      }
    },
    handleCurrentChange(val) {
      this.currentRow = val;
      let index = this.tableData.indexOf(this.currentRow);
      if (index > -1) {
        this.radio = index;
      }
    },
    getCurrentRow(index) {
      console.log(index);
    },
    save() {
      if (!this.currentRow) {
        this.$message({
          type: "warning",
          message: "请选择前置问题"
        });
        return;
      }
      this.$emit("sendData", this.currentRow, this.searchParams);
      this.cancel();
    },
    cancel() {
      this.$emit("update:show", false);
      this.$refs.tableData.clearSelection();
      this.tableData = [];
      this.pagination.total = 0;
      this.pagination.pageNum = 1;
      this.currentRow = null;
      this.radio = false;
      this.isVisible = false;
    },
    WaybillTypeFormatter(row) {
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
    answerTypeFormatter(row) {
      return row.answerType == "radio"
        ? "单选"
        : row.answerType == "checkbox"
        ? "多选"
        : "用户填写";
    }
  }
};
</script>
<style></style>
