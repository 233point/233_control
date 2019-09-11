<!--
 * @Description: In User Settings Edit
 * @Author: Calamus
 * @Date: 2019-08-09 15:39:25
 * @LastEditTime: 2019-09-04 10:21:41
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <sys-search
      class="search"
      :buttonData="buttonData"
      @add="handleAdd"
      @addManager="handleAddManager"
      @search="search"
      @rest="rest"
    />

    <!-- 系统列表 -->
    <div class="table_container">
      <el-table
        ref="roleTable"
        stripe
        tooltip-effect="light"
        v-loading="isListLoading"
        :data="tableData"
      >
        <el-table-column
          type="index"
          :index="indexMethod"
          label="序号"
          width="50"
        ></el-table-column>
        <el-table-column
          prop="account"
          label="账号"
          min-width="130"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="realName"
          label="姓名"
          min-width="130"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="phone"
          label="手机号码"
          min-width="130"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="numOfID"
          label="身份证号"
          min-width="120"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <span>{{ idCardFormatter(scope.row.numOfID) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="职业"
          width="120"
          :show-overflow-tooltip="true"
          :formatter="typeFomatter"
        >
        </el-table-column>
        <el-table-column
          prop="skills"
          v-if="searchParams && searchParams.type != '2'"
          label="擅长品类"
          min-width="100"
        >
          <template slot-scope="scoped">
            <el-popover
              placement="left-start"
              width="320"
              trigger="hover"
              :disabled="!scoped.row.skills || scoped.row.skills.length <= 0"
            >
              <div class="skills_tags_container">
                <el-tag
                  class="skills_tags"
                  v-for="(tag, index) in scoped.row.skills"
                  :key="index"
                  size="medium"
                  :disable-transitions="false"
                >
                  {{ tag }}
                </el-tag>
              </div>

              <span
                class="skills_span"
                slot="reference"
                v-if="scoped.row.skills && scoped.row.skills.length > 0"
                >{{ scoped.row.skills.join("、") }}</span
              >
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180">
          <template slot-scope="scoped">
            <span>{{ timeFormatter(scoped.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="approval" label="审核状态" width="180">
          <template slot-scope="scope">
            <el-popover
              placement="left"
              width="250"
              trigger="hover"
              :disabled="
                !(scope.row.approvalList && scope.row.approvalList.length > 0)
              "
            >
              <div
                v-if="
                  scope.row.approvalList && scope.row.approvalList.length > 0
                "
              >
                <a-timeline>
                  <a-timeline-item
                    v-for="(item, index) in scope.row.approvalList"
                    :key="index"
                  >
                    <p class="time">{{ timeFormatter(item.date) }}</p>
                    <p class="content">{{ item.result }}:{{ item.details }}</p>
                  </a-timeline-item>
                </a-timeline>
              </div>
              <div class="status_container" slot="reference">
                <span>{{ scope.row.approval }}</span>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="190" fixed="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click.stop="handleDetail(scope.$index, scope.row)"
              >详情</el-button
            >
            <el-divider
              direction="vertical"
              v-if="showBtn('handleEdit')"
            ></el-divider>
            <el-button
              size="mini"
              type="text"
              v-if="showBtn('handleEdit')"
              :disabled="
                scope.row.approval && scope.row.approval.trim() == '审核成功'
              "
              @click.stop="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-divider
              v-if="
                $store.getters.roleType == 'assemblyManager' &&
                  showBtn('handleAudit')
              "
              direction="vertical"
            ></el-divider>
            <el-button
              size="mini"
              type="text"
              v-if="
                $store.getters.roleType == 'assemblyManager' &&
                  showBtn('handleAudit')
              "
              :disabled="
                scope.row.approval &&
                  (scope.row.approval.trim() == '审核成功' ||
                    scope.row.approval.trim() == '待提交')
              "
              @click.stop="handleAudit(scope.$index, scope.row)"
              >审核</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        style="text-align:right;margin-top: 1rem;"
        layout="total, prev, pager, next"
        :current-page.sync="pagination.pageNum"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @current-change="changePage"
      ></el-pagination>
    </div>

    <!-- 系统新增/修改 -->
    <sys-update
      :show.sync="isShowRoleDialog"
      :sysData.sync="editRole"
      :isCreate="isCreate"
      @updateList="updateList"
    />
    <manager-update
      :show.sync="isShowManagerDialog"
      :sysData.sync="editRole"
      :isCreate="isCreateManager"
      @updateList="updateList"
    />
    <!-- 系统详情 -->
    <servant-detail
      :show.sync="isShowServantDetail"
      :sysData.sync="editRole"
      @updateList="updateList"
    />
    <manager-detail
      :show.sync="isShowManagerDetail"
      :sysData.sync="editRole"
      @updateList="updateList"
    />

    <ensure-check
      :show.sync="isCheckFormVisible"
      :checkInfo="checkInfo"
      @updateTable="updateList"
    />
  </div>
</template>

<script>
import moment from "moment";
// 全局混入
import { mixins } from "@/mixins";
// 自定义组件
import NavButton from "@/components/navButton";
import NavPremissonButton from "@/components/navButton/navPremissonButton";
import CommonWrapper from "@/components/commonWrapper";
import CommonTable from "@/components/commonTable";
import SysSearch from "./Components/Search";
import SysUpdate from "./Components/SysUpdate";
import ManagerUpdate from "./Components/managerUpdate";
import ServantDetail from "./Components/servantDetail";
import ManagerDetail from "./Components/managerDetail";
import EnsureCheck from "./Components/check";
import {
  servicePersonalqueryWithpage,
  delServicepersonal,
  merchantApprove
} from "@/api/user";
import { Type_Status_List } from "@/utils/ENUM";

export default {
  name: "SystemInfo",
  mixins: [mixins],
  data() {
    return {
      tableData: [],
      editRole: {}, // 需要编辑的角色对象
      isShowRoleDialog: false, // 新增/编辑窗口打开状态
      isShowManagerDialog: false, // 新增/编辑窗口打开状态
      isShowServantDetail: false, // 新增/编辑窗口打开状态
      isShowManagerDetail: false, // 新增/编辑窗口打开状态
      isListLoading: false, // 列表加载
      isCreate: true, // 编辑窗口展示新增or编辑
      isCreateManager: true, // 编辑窗口展示新增or编辑
      pagination: {
        // 翻页数据
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      isCheckFormVisible: false,
      checkInfo: {},
      typeList: Type_Status_List,
      searchParams: {},
      buttonData: []
    };
  },
  activated() {
    this.$refs.roleTable.doLayout();
  },
  mounted() {},
  methods: {
    updateList(){
        this.search(this.searchParams)
    },
    // 查询和初始化查询
    search(params){
        this.pagination.pageNum = 1 ;
        const searchParams = params
          ? (this.searchParams = params)
          : this.searchParams;
        this.queryList(params);
    },
    rest(params) {
      this.pagination.pageNum = 1 ;
        const searchParams = params
          ? (this.searchParams = params)
          : this.searchParams;
        this.queryList(params);
    },
    // 查询/翻页公用方法
    queryList(params) {
      this.getRoles({
        ...params,
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      });
    },
    isButtonIsDisabled() {
      return !!this.selectRow.length;
    },
    // 获取列表
    getRoles(params) {
      this.isListLoading = true;
      servicePersonalqueryWithpage(params).then(res => {
        if (!res.error) {
          this.tableData = res.content;
          this.pagination.total = res.totalElements;
          this.isListLoading = false;
        }
      });
    },
    // 显示编辑界面
    handleEdit(index, row) {
      this.editRole = row;
      if (row.type == 2) {
        this.isCreateManager = false;
        this.isShowManagerDialog = true;
      } else {
        this.isCreate = false;
        this.isShowRoleDialog = true;
      }
    },
    // 显示编辑界面
    handleDetail(index, row) {
      this.editRole = row;
      if (row.type == 2) {
        this.isShowManagerDetail = true;
      } else {
        this.isShowServantDetail = true;
      }
    },
    // 显示新增界面
    handleAdd() {
      this.isCreate = true;
      this.isShowRoleDialog = true;
    },
    // 显示新增界面
    handleAddManager() {
      this.isCreateManager = true;
      this.isShowManagerDialog = true;
    },
    handleAudit(index, row) {
      this.isCheckFormVisible = true;
      this.checkInfo = row;
    },
    // 单行删除
    handleDel(index, row) {
      this.$confirm("确认删除该服务人员吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.deleteRoles(row.id);
        })
        .catch(() => {});
    },
    // 删除接口方法
    deleteRoles(roleIds) {
      return delServicepersonal(roleIds).then(res => {
        if (!res.error) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.search(this.searchParams);
        }
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
    // 列表状态显示格式化
    formatStatus(row) {
      return row.sys_enable === 1
        ? "启用"
        : row.sys_enable === 0
        ? "禁用"
        : "未知";
    },
    // 列表日期格式化
    formatCreateDate(row) {
      return moment(row.roleCreateTime).format("YYYY-MM-DD");
    },
    rest(params) {
      const searchParams = (this.searchParams = params);
      this.getRoles({
        ...searchParams,
        pageNum: 1,
        pageSize: this.pagination.pageSize
      });
    },
    timeFormatter(time) {
      if (time) {
        return moment(time).format("YYYY-MM-DD HH:mm:ss");
      } else {
        return "";
      }
    },
    typeFomatter(row) {
      let result = this.typeList.find(item => {
        return row.type == item.value;
      });
      if (result) {
        return result.label;
      } else {
        return "未知";
      }
    },
    idCardFormatter(num) {
      if (num) {
        return num.replace(/(\w)/g, function(a, b, c, d) {
          return num.length >= 10
            ? c > 3 && c < num.length - 4
              ? "*"
              : a
            : c > 1 && c < num.length - 2
            ? "*"
            : a;
        });
      } else {
        return "";
      }
    },
    showBtn(method) {
      return this.buttonData.some(item => {
        return item.resourceUrl == method;
      });
    }
  },
  components: {
    NavButton,
    NavPremissonButton,
    CommonWrapper,
    CommonTable,
    SysUpdate,
    ManagerUpdate,
    ServantDetail,
    ManagerDetail,
    SysSearch,
    EnsureCheck
  }
};
</script>

<style lang="scss" scoped>
.skills_tags_container {
  max-height: 400px;
  overflow: scroll;
  padding: 5px;
}
.skills_span {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100px;
}
.skills_tags {
  margin: 0.5rem;
}
</style>
