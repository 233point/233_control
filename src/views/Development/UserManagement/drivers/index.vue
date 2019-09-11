<template>
  <div>
    <common-wrapper>
      <sys-search class="search" @search="queryList" @rest="rest" />
    </common-wrapper>
    <nav-button>
      <el-button-group>
        <el-button icon="xhefont icon-add-new" @click="handleAdd"
          >新增</el-button
        >
      </el-button-group>
    </nav-button>
    <!-- 系统列表 -->
    <common-wrapper>
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
              prop="sys_name"
              label="系统名称"
              width="130"
            ></el-table-column>
            <el-table-column
              sortable
              prop="sys_identification"
              label="系统标识"
              width="130"
            ></el-table-column>
            <!-- <el-table-column sortable prop="roleCreateUser" label="创建人" width="120"></el-table-column> -->
            <el-table-column
              prop="sysEnable"
              label="状态"
              :formatter="formatStatus"
              width="80"
            ></el-table-column>
            <el-table-column
              sortable
              prop="sys_create_time"
              label="创建时间"
              :formatter="formatCreateDate"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="sys_remark"
              label="系统描述"
              min-width="150"
              :show-tooltip-when-overflow="true"
            ></el-table-column>
            <el-table-column label="操作" width="190">
              <template slot-scope="scope">
                <el-tooltip
                  class="item"
                  effect="light"
                  content="编辑"
                  placement="bottom"
                >
                  <el-button
                    size="mini"
                    round
                    icon="xhefont icon-modify"
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
                    icon="xhefont icon-delete"
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

    <!-- 系统新增/修改 -->
    <sys-update
      :show.sync="isShowRoleDialog"
      :sysData.sync="editRole"
      :isCreate="isCreate"
      @updateList="queryList"
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
import { merchantList, merchantDel } from "@/api/user";

export default {
  name: "SystemInfo",
  mixins: [mixins],
  data() {
    return {
      comp: this,
      buttonData: [],
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
      }
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
      merchantList(params).then(res => {
        if (!res.error) {
          this.tableData = res.item;
          this.pagination.total = res.total;
          this.pagination.pageNum = res.pageNum;
          this.pagination.pageSize = res.pageSize;
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
    // 单行删除
    handleDel(index, row) {
      this.$confirm("确认删除该系统吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          let params = {
            sys_uuid: row.sys_uuid
          };
          this.deleteRoles(params);
        })
        .catch(() => {});
    },
    // 删除接口方法
    deleteRoles(roleIds) {
      return merchantDel(roleIds).then(res => {
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
    }
  },
  components: {
    NavButton,
    NavPremissonButton,
    CommonWrapper,
    CommonTable,
    SysUpdate,
    SysSearch
  }
};
</script>
