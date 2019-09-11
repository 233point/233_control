<template>
  <div>
    <!-- 查询 -->
    <common-wrapper>
      <user-management-search
        class="search"
        :org="orgnization"
        :roleList="roleList"
        @search="queryList"
        @rest="rest"
      />
    </common-wrapper>
    <!-- <header-breadcrumb :breadData="$route.matched" /> -->
    <nav-button>
      <el-button-group>
        <el-button icon="fdddfont icon-add-new" @click="handleAdd"
          >新增用户</el-button
        >
      </el-button-group>
    </nav-button>

    <!-- 用户列表 -->
    <common-table :flex="230">
      <template slot="table">
        <el-table
          ref="userTable"
          height="100%"
          stripe
          highlight-current-row
          tooltip-effect="light"
          v-loading="isListLoading"
          @sort-change="sortChange"
          :data="tableData"
        >
          <el-table-column
            type="index"
            :index="indexMethod"
            label="序号"
            width="50"
          ></el-table-column>
          <el-table-column
            sortable="custom"
            prop="account"
            label="用户名"
          ></el-table-column>
          <el-table-column
            sortable="custom"
            prop="realName"
            label="真实姓名"
          ></el-table-column>
          <el-table-column
            sortable="custom"
            prop="city"
            label="城市"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.city && scope.row.city.length">{{
                scope.row.city.join("、")
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            sortable="custom"
            prop="marketListShow"
            label="商场"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">
              <span
                v-if="
                  divisionMerchant(scope.row.roleType) &&
                    scope.row.marketListShow &&
                    scope.row.marketListShow.length
                "
                >{{ scope.row.marketListShow.join("、") }}</span
              >
              <span v-if="!divisionMerchant(scope.row.roleType)">{{
                scope.row.marketName
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            sortable="custom"
            prop="phone"
            label="联系电话"
            width="100"
          ></el-table-column>
          <!--<el-table-column prop="userOrgName" label="仓库"></el-table-column>-->
          <el-table-column
            prop="roleTypeMessage"
            label="角色"
          ></el-table-column>
          <el-table-column
            prop="createTime"
            :formatter="formatCreateDate"
            label="创建时间"
          ></el-table-column>
          <!-- <el-table-column sortable="custom" prop="userOrgUuid" label="所属机构" :formatter="formatOrg"></el-table-column> -->
          <el-table-column label="操作" fixed="right" width="190">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                v-if="divisionMerchant(scope.row.roleType)"
                @click.stop="handelRoleAuth(scope.row)"
                >授权</el-button
              >
              <el-button
                size="mini"
                type="text"
                v-if="!divisionMerchant(scope.row.roleType)"
                @click.stop="handelBindMarket(scope.row)"
                >绑定商场</el-button
              >
              <el-button
                size="mini"
                type="text"
                @click.stop="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <!-- <el-button size="mini" type="text" @click.stop="handle(scope.$index, scope.row)">删除</el-button> -->
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

    <!-- 新增、修改用户, 因二者格式不同,故分开两个组件调用 -->
    <user-create
      :show.sync="isCreateFormVisible"
      :isCreate="isCreate"
      :modifyUser="modifyUser"
      @updateList="queryList"
    />

    <!-- 四种其他角色角色授权 -->
    <other-role-auth
      :selectedUsers="selectRow"
      :isCreate="isCreate"
      :roleList="roleList"
      :show.sync="isOtherRoleAuthVisible"
      @updateList="queryList"
    />
    <!-- 商户等角色授权 -->
    <merchant-role-auth
      :selectedUsers="selectRow"
      :isCreate="isCreate"
      :roleList="roleList"
      :show.sync="isMerchantRoleAuthVisible"
      @updateList="queryList"
    />
  </div>
</template>

<script>
/**
 * User Management Module
 * ----------------------
 * Author: zhou qi
 * Date: 2018.03.20
 */
import moment from "moment";
import { generateTree } from "@/utils/generateTree";

// 全局混入
import { mixins } from "@/mixins";
// 自定义组件
import NavButton from "@/components/navButton";
import NavPremissonButton from "@/components/navButton/navPremissonButton";
import CommonWrapper from "@/components/commonWrapper";
import CommonTable from "@/components/commonTable";
import UserManagementSearch from "./Components/Search";
import UserCreate from "./Components/UserCreate";
import UserEdit from "./Components/UserEdit";
import OtherRoleAuth from "./Components/otherRoleAuth";
import MerchantRoleAuth from "./Components/merchantRoleAuth";
// API
import { getOrgTree } from "@/api/organization";
import { getCtmsUserList, deleteUser, resetPassword } from "@/api/user";

export default {
  name: "UserManagement",
  mixins: [mixins],
  data() {
    return {
      comp: this,
      buttonData: [],
      tableData: [],
      selectRow: {}, // 列表选中列
      isListLoading: false, // 列表加载
      orgnization: [], // 公用组织机构
      cascaderOrg: [],
      isCreateFormVisible: false, // 新增界面是否显示
      isEditFormVisible: false, // 编辑界面是否显示
      isMerchantRoleAuthVisible: false, // 用户角色授权窗口是否展示
      isOtherRoleAuthVisible: false, // 用户角色授权窗口是否展示
      modifyUser: null, // 弹出框编辑时存放的临时行数据
      pagination: {
        // 翻页数据
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      searchParams: {}, // 查询参数
      isCreate: true,
      roleList: [
        {
          type: "marcketManager",
          roleName: "商场负责人"
        },
        {
          type: "cityManager",
          roleName: "城市负责人"
        },
        {
          type: "regionMarcketManager",
          roleName: "商场区域负责人"
        },
        {
          type: "regionManager",
          roleName: "区域负责人"
        }
      ]
    };
  },
  activated() {
    this.$refs.userTable.doLayout();
  },
  mounted() {},
  methods: {
    // 查询和初始化查询
    // 查询/翻页公用方法
    queryList(params) {
      let searchParams = {};
      if (params) {
        searchParams = this.searchParams = params;
      } else {
        searchParams = this.searchParams;
      }
      this.getUsers({
        ...searchParams,
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      });
    },
    // 获取用户列表
    getUsers(params) {
      this.isListLoading = true;
      getCtmsUserList(params).then(res => {
        this.isListLoading = false;
        if (!res.error) {
          if (res.item.length == 0 && res.pageNum > 1) {
            this.pagination.pageNum = 1;
            params.pageNum = 1;
            this.getUsers(params);
            return;
          }
          this.tableData = res.item;
          this.pagination.total = res.total;
          this.pagination.pageNum = res.pageNum;
          this.pagination.pageSize = res.pageSize;
        }
      });
    },
    rest(params) {
      const searchParams = (this.searchParams = params);
      this.getUsers({
        ...searchParams,
        pageNum: 1,
        pageSize: this.pagination.pageSize
      });
    },
    sortChange(name, sort) {
      console.log(name, sort);
    },
    formatSex(row) {
      return row.userGender == 1 ? "男" : row.userGender == 0 ? "女" : "未知";
    },
    formatOrg(row) {
      let org = this.orgnization.find(item => item.id === row.userOrgUuid);
      if (org) {
        return org.orgName;
      } else {
        return "";
      }
    },
    isButtonIsDisabled() {
      return !!this.selectRow.userUuid;
    },
    // 显示编辑界面
    handleEdit(index, row) {
      this.modifyUser = row;
      this.isCreateFormVisible = true;
      this.isCreate = false;
    },
    // 显示新增界面
    handleAdd() {
      this.isCreateFormVisible = true;
      this.isCreate = true;
    },
    handelRoleAuth(row) {
      this.selectRow = row;
      this.isOtherRoleAuthVisible = true;
    },
    handelBindMarket(row) {
      this.selectRow = row;
      this.isMerchantRoleAuthVisible = true;
    },
    isButtonDisabled() {
      return this.selectRow.userUuid;
    },
    divisionMerchant(type) {
      return this.roleList.some(item => item.type == type);
    },
    // 重置密码
    resetPassword(index, row) {
      this.$confirm(`确认要重置 ${row.userRealName} 的密码吗?`, "提示", {
        type: "warning"
      })
        .then(() => {
          let params = {
            userId: row.userUuid
          };
          resetPassword(params).then(res => {
            if (!res.error) {
              this.$message({
                message: "用户密码重置成功",
                type: "success"
              });
              this.queryList();
            }
          });
        })
        .catch(() => {});
    },
    // 查询详情
    getUserDetail(row, event) {
      // console.log(row)
    },
    // 单行删除
    handleDel(index, row) {
      this.$confirm("确认删除该用户吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          let params = {
            userUuid: row.userUuid
          };
          this.deleteUsers(params);
        })
        .catch(() => {});
    },
    // 批量删除
    batchRemove() {
      this.$confirm("确认删除选中的用户吗？", "提示", {
        type: "warning"
      })
        .then(() => {
          let userIds = [];
          this.selectRow.map(row => userIds.push(row.userUuid));
          this.isListLoading = true;
          this.deleteUsers(userIds).then(() => {
            this.isListLoading = false;
          });
        })
        .catch(() => {});
    },
    // 删除接口方法
    deleteUsers(userIds) {
      return deleteUser(userIds).then(res => {
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
      this.queryList(this.searchParams);
    },
    // 生成列表序号
    indexMethod(index) {
      return (
        index + 1 + (this.pagination.pageNum - 1) * this.pagination.pageSize
      );
    },
    // 列表状态显示格式化
    formatStatus(row, column) {
      return row.userEnable === "1"
        ? "启用"
        : row.userEnable === "0"
        ? "禁用"
        : "未知";
    },
    // 列表日期格式化
    formatCreateDate(row) {
      return moment(row.createTime).format("YYYY-MM-DD");
    },
    deleteNullChildren(data) {
      data.forEach(item => {
        if (item.children && item.children.length > 0) {
          this.deleteNullChildren(item.children);
        } else if (item.children && item.children.length == 0) {
          delete item.children;
        }
      });
    }
  },
  components: {
    NavButton,
    NavPremissonButton,
    CommonWrapper,
    CommonTable,
    UserManagementSearch,
    UserCreate,
    UserEdit,
    OtherRoleAuth,
    MerchantRoleAuth
  }
};
</script>
