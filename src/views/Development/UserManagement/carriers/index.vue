<template>
  <div>
    <common-wrapper>
      <sys-search class="search" @search="queryList" @rest="rest" />
    </common-wrapper>

    <!-- 系统列表 -->
    <common-wrapper>
      <!-- <nav-button>
          <el-button-group>
            <el-button icon="el-icon-plus" @click="handleAdd">新增</el-button>
          </el-button-group>
        </nav-button> -->
      <common-table :flex="230">
        <template slot="table">
          <el-table
            ref="roleTable"
            height="100%"
            stripe
            :border="true"
            tooltip-effect="light"
            v-loading="isListLoading"
            :data="tableData"
          >
            <!-- <el-table-column type="selection" width="30"></el-table-column> -->
            <el-table-column
              type="index"
              :index="indexMethod"
              label="序号"
              width="50"
            ></el-table-column>
            <el-table-column
              sortable
              prop="company"
              label="公司名称"
              min-width="130"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              sortable
              prop="compBrif"
              label="公司简称"
              min-width="130"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              sortable
              prop="contact"
              label="联系人"
              min-width="120"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              sortable
              prop="city"
              label="城市"
              width="120"
              :show-overflow-tooltip="true"
            ></el-table-column>
            <el-table-column
              prop="authorized"
              label="授权状态"
              width="100"
            ></el-table-column>
            <el-table-column prop="approval" label="状态" width="100">
              <template slot-scope="scope">
                <el-popover
                  placement="left"
                  width="250"
                  trigger="hover"
                  :disabled="
                    !(
                      scope.row.approvalList &&
                      scope.row.approvalList.length > 0
                    )
                  "
                >
                  <div
                    v-if="
                      scope.row.approvalList &&
                        scope.row.approvalList.length > 0
                    "
                  >
                    <a-timeline>
                      <a-timeline-item
                        v-for="(item, index) in scope.row.approvalList"
                        :key="index"
                      >
                        <p class="time">{{ timeFormatter(item.date) }}</p>
                        <p class="content">
                          {{ item.result }}:{{ item.details }}
                        </p>
                      </a-timeline-item>
                    </a-timeline>
                  </div>
                  <div class="status_container" slot="reference">
                    <span
                      class="circle_li"
                      :class="
                        scope.row.productStatus == '0'
                          ? 'info'
                          : scope.row.productStatus == '1'
                          ? 'success'
                          : scope.row.productStatus == '2'
                          ? 'warning'
                          : 'info'
                      "
                    ></span>
                    <span>{{ scope.row.approval }}</span>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="190" fixed="right">
              <template slot-scope="scope">
                <!-- <el-tooltip class="item" effect="light" content="编辑"  placement="bottom">
                      <el-button size="mini" round icon="el-icon-edit" @click.stop="handleEdit(scope.$index, scope.row)"></el-button>
                    </el-tooltip> -->
                <el-tooltip
                  class="item"
                  effect="light"
                  content="审核"
                  v-if="scope.row.approval != ' 审核成功'"
                  placement="bottom"
                >
                  <el-button
                    size="mini"
                    round
                    icon="el-icon-setting"
                    @click.stop="handleAudit(scope.$index, scope.row)"
                  ></el-button>
                </el-tooltip>
                <!-- <el-tooltip class="item" effect="light" content="删除"  placement="bottom">
                      <el-button size="mini" round icon="el-icon-delete" @click.stop="handleDel(scope.$index, scope.row)"></el-button>
                    </el-tooltip> -->
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
    <ensure-check
      :show.sync="isCheckFormVisible"
      :checkInfo="checkInfo"
      @updateTable="updateTable"
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
import EnsureCheck from "./Components/check";
import { carriersList, carriersDel, carrierApprove } from "@/api/user";

export default {
  name: "SystemInfo",
  mixins: [mixins],
  data() {
    return {
      tableData: [],
      editRole: {}, // 需要编辑的角色对象
      isShowRoleDialog: false, // 新增/编辑窗口打开状态
      isListLoading: false, // 列表加载
      isCreate: true, // 编辑窗口展示新增or编辑
      pagination: {
        // 翻页数据
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      isCheckFormVisible: false,
      checkInfo: {}
    };
  },
  activated() {
    this.$refs.roleTable.doLayout();
  },
  mounted() {},
  methods: {
    updateTable() {
      this.queryList(this.searchParams);
    },
    // 查询和初始化查询
    // 查询/翻页公用方法
    queryList(params) {
      const searchParams = (this.searchParams = params);
      this.getRoles({
        ...searchParams,
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
      carriersList(params).then(res => {
        if (!res.error) {
          this.tableData = res.content;
          this.pagination.total = res.totalElements;
          this.isListLoading = false;
        }
      });
    },
    // 显示编辑界面
    handleEdit(index, row) {
      this.isCreate = false;
      this.editRole = row;
      this.isShowRoleDialog = true;
    },
    // 显示新增界面
    handleAdd() {
      this.isCreate = true;
      this.isShowRoleDialog = true;
    },
    handleAudit(index, row) {
      this.isCheckFormVisible = true;
      this.checkInfo = row;
    },
    // 单行删除
    handleDel(index, row) {
      this.$confirm("确认删除该商户吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.deleteRoles(row.id);
        })
        .catch(() => {});
    },
    // 删除接口方法
    deleteRoles(roleIds) {
      return carriersDel(roleIds).then(res => {
        if (!res.error) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.queryList(this.searchParams);
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
    }
  },
  components: {
    NavButton,
    NavPremissonButton,
    CommonWrapper,
    CommonTable,
    SysSearch,
    EnsureCheck
  }
};
</script>
