<template>
  <div>
    <!-- <header-breadcrumb :breadData="$route.matched" /> -->
    <nav-button>
      <el-button-group>
        <el-button icon="fdddfont icon-add-new" @click="handleAdd"
          >新增</el-button
        >
      </el-button-group>
    </nav-button>
    <!-- 查询 -->
    <common-wrapper>
      <role-management-search class="search" @search="queryList" @rest="rest" />
    </common-wrapper>
    <!-- 用户列表 -->
    <common-wrapper>
      <common-table :flex="230">
        <template slot="table">
          <el-table
            ref="roleTable"
            height="100%"
            stripe
            tooltip-effect="light"
            v-loading="isListLoading"
            :data="tableData"
            @selection-change="selected => (selectRow = selected)"
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
              prop="roleName"
              label="角色名称"
              width="130"
            ></el-table-column>
            <!-- <el-table-column sortable prop="roleCreateUser" label="创建人" width="120"></el-table-column> -->
            <el-table-column
              prop="roleEnable"
              label="状态"
              :formatter="formatStatus"
              width="80"
            ></el-table-column>
            <el-table-column
              sortable
              prop="roleCreateTime"
              label="创建时间"
              :formatter="formatCreateDate"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="roleRemark"
              label="角色描述"
              min-width="150"
              :show-tooltip-when-overflow="true"
            ></el-table-column>
            <el-table-column label="操作" width="190">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="light"
                  content="菜单授权"
                  placement="bottom"
                >
                  <el-button
                    size="mini"
                    round
                    icon="fdddfont icon-shouquan"
                    @click.stop="menuAuth(scope.$index, scope.row)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="light"
                  content="编辑"
                  placement="bottom"
                >
                  <el-button
                    size="mini"
                    round
                    icon="fdddfont icon-modify"
                    @click.stop="handleEdit(scope.$index, scope.row)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="light"
                  content="删除"
                  placement="bottom"
                >
                  <el-button
                    size="mini"
                    round
                    icon="fdddfont icon-delete"
                    @click.stop="handleDel(scope.$index, scope.row)"
                  ></el-button>
                </el-tooltip>
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

    <!-- 角色新增/修改 -->
    <role-update
      :show.sync="isShowRoleDialog"
      :roleData.sync="editRole"
      :isCreate="isCreate"
      :searchParams="searchParams"
      @updateList="queryList"
    />

    <!-- 菜单授权 -->
    <role-menu-res
      :show.sync="isShowRoleMenuDialog"
      :roleData.sync="editRole"
      :searchParams="searchParams"
      @updateList="queryList"
    />

    <!-- 角色线路授权 -->
    <role-line-res
      :show.sync="isShowRoleLineDialog"
      :roleData.sync="editRole"
      @updateList="queryList"
    />
  </div>
</template>

<script>
/**
 * Role Management Module
 * ----------------------
 * Author: zhou qi
 * Date: 2018.03.20
 */
import moment from "moment";
// 全局混入
import { mixins } from "@/mixins";
// 自定义组件
import NavButton from "@/components/navButton";
import NavPremissonButton from "@/components/navButton/navPremissonButton";
import CommonWrapper from "@/components/commonWrapper";
import CommonTable from "@/components/commonTable";
import RoleManagementSearch from "./Components/Search";
import RoleUpdate from "./Components/RoleUpdate";
import RoleLineRes from "./Components/RoleLineRes";
import RoleMenuRes from "./Components/RoleMenuRes";

import { getRoleList, deleteRole } from "@/api/role";

export default {
  name: "RoleManagement",
  mixins: [mixins],
  data() {
    return {
      comp: this,
      buttonData: [],
      tableData: [],
      selectRow: [], // 列表选中列
      editRole: {}, // 需要编辑的角色对象
      isShowRoleDialog: false, // 新增/编辑窗口打开状态
      isShowRoleLineDialog: false,
      isShowRoleMenuDialog: false,
      isListLoading: false, // 列表加载
      isCreate: true, // 编辑窗口展示新增or编辑
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
    this.$refs.roleTable.doLayout();
  },
  mounted() {},
  methods: {
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
      getRoleList(params).then(res => {
        if (!res.error) {
          if (res.item.length == 0 && res.pageNum > 1) {
            this.pagination.pageNum = 1;
            params.pageNum = 1;
            this.getRoles(params);
            return;
          }
          this.tableData = res.item;
          this.pagination.total = res.total;
          this.pagination.pageNum = res.pageNum;
          this.pagination.pageSize = res.pageSize;
          this.isListLoading = false;
        }
      });
    },
    rest(params) {
      const searchParams = (this.searchParams = params);
      this.getRoles({
        ...searchParams,
        pageNum: 1,
        pageSize: this.pagination.pageSize
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
    // 菜单授权
    menuAuth(index, row) {
      this.editRole = row;
      this.isShowRoleMenuDialog = true;
    },
    // 线路授权
    lineAuth(index, row) {
      this.editRole = row;
      this.isShowRoleLineDialog = true;
    },
    // 单行删除
    handleDel(index, row) {
      this.$confirm("确认删除该角色吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          let params = {
            roleUuid: row.roleUuid
          };
          this.deleteRoles(params);
        })
        .catch(() => {});
    },
    // 批量删除
    batchRemove() {
      this.$confirm("确认删除选中的角色吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          let roleIds = [];
          this.selectRow.map(row => roleIds.push(row.rolesUuid));
          this.isListLoading = true;
          this.deleteRoles(roleIds).then(() => {
            this.isListLoading = false;
          });
        })
        .catch(() => {});
    },
    // 删除接口方法
    deleteRoles(roleIds) {
      return deleteRole(roleIds).then(res => {
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
      return row.roleEnable === 1
        ? "启用"
        : row.roleEnable === 0
        ? "禁用"
        : "未知";
    },
    // 列表日期格式化
    formatCreateDate(row) {
      return moment(row.roleCreateTime).format("YYYY-MM-DD");
    }
  },
  components: {
    NavButton,
    NavPremissonButton,
    CommonWrapper,
    CommonTable,
    RoleManagementSearch,
    RoleUpdate,
    RoleLineRes,
    RoleMenuRes
  }
};
</script>
