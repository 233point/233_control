<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-24 10:16:32
 * @LastEditTime: 2019-09-04 10:39:32
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <!-- 查询 -->
    <common-wrapper>
      <vehicle-search class="search" @search="search" @rest="rest" />
    </common-wrapper>

    <!-- 用户列表 -->
    <common-wrapper>
      <nav-button>
        <el-button-group>
          <el-button
            icon="fdddfont icon-add-new"
            v-if="showBtn('handleAdd')"
            @click="handleAdd"
            >新增车辆</el-button
          >
        </el-button-group>
      </nav-button>
      <common-table :flex="250">
        <template slot="table">
          <el-table
            ref="userTable"
            height="100%"
            stripe
            highlight-current-row
            v-loading="isListLoading"
            :data="tableData"
            tooltip-effect="light"
            @row-click="getUserDetail"
            @current-change="selected => (selectRow = selected)"
          >
            <el-table-column type="current" width="30"></el-table-column>
            <el-table-column
              type="index"
              :index="indexMethod"
              label="序号"
              width="50"
            ></el-table-column>
            <el-table-column prop="plateNo" label="车牌号"></el-table-column>
            <el-table-column
              prop="busBrand"
              label="品牌"
              :show-tooltip-when-overflow="true"
            ></el-table-column>
            <el-table-column prop="busLoad" label="载重"></el-table-column>
            <el-table-column
              prop="busType"
              label="车型"
              :show-tooltip-when-overflow="true"
            ></el-table-column>
            <el-table-column
              prop="busStatus"
              label="状态"
              :formatter="formattStatus"
            ></el-table-column>
            <el-table-column label="车辆照片">
              <template slot-scope="scope">
                <span v-if="!scope.row.img">无</span>
                <el-button
                  v-else
                  @click="imgScan(scope.row.img)"
                  type="text"
                  size="small"
                  >查看</el-button
                >
              </template>
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注"
              min-width="150"
              :show-tooltip-when-overflow="true"
            ></el-table-column>
            <el-table-column label="操作" min-width="180" fixed="right">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click.stop="handleDetail(scope.$index, scope.row)"
                  >查看</el-button
                >
                <el-divider
                  direction="vertical"
                  v-if="showBtn('handleEdit')"
                ></el-divider>
                <el-button
                  size="mini"
                  type="text"
                  v-if="showBtn('handleEdit')"
                  @click.stop="handleEdit(scope.$index, scope.row)"
                  >编辑</el-button
                >
                <el-divider
                  direction="vertical"
                  v-if="showBtn('handleChange')"
                ></el-divider>
                <el-button
                  size="mini"
                  type="text"
                  v-if="showBtn('handleChange')"
                  @click.stop="handleChange(scope.$index, scope.row)"
                  >{{ scope.row.busStatus == 1 ? "停用" : "启用" }}</el-button
                >
                <!-- <el-tooltip class="item"
                            effect="light"
                            content="详情"
                            placement="bottom">
                  <el-button size="mini"
                             round
                             icon="el-icon-view"
                             @click.stop="handleDetail(scope.$index, scope.row)"></el-button>
                </el-tooltip> -->
                <!-- <el-tooltip class="item"
                            effect="light"
                            content="编辑"
                            placement="bottom">
                  <el-button size="mini"
                             round
                             icon="el-icon-edit"
                             @click.stop="handleEdit(scope.$index, scope.row)"></el-button>
                </el-tooltip>
                <el-tooltip class="item"
                            effect="light"
                            :content="scope.row.busStatus == 1?'停用':'启用'"
                            placement="bottom">
                  <el-button size="mini"
                             round
                             :icon="scope.row.busStatus == 1 ? 'el-icon-microphone' : 'el-icon-turn-off-microphone'"
                             @click.stop="handleChange(scope.$index, scope.row)"></el-button>
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

    <vehicle-create
      :show.sync="isCreateFormVisible"
      :isCreate="isCreate"
      :busInfo="busInfo"
      @updateList="updateList"
    />
    <vehicle-detail
      :show.sync="isDetailFormVisible"
      :busInfo="busInfo"
      @updateList="updateList"
    />

    <el-dialog :visible.sync="showImgDialog" width="700px" append-to-body>
      <img :src="imgUrl" class="dialogImg" />
    </el-dialog>
  </div>
</template>

<script>
/**
 * User Add Component
 * ----------------------
 * Author: Calamus
 * Date: 2018.09.26
 */
import moment from "moment";
import { mixins } from "@/mixins";
// 自定义组件
import NavButton from "@/components/navButton";
import NavPremissonButton from "@/components/navButton/navPremissonButton";
import CommonWrapper from "@/components/commonWrapper";
import CommonTable from "@/components/commonTable";
import VehicleSearch from "./Components/Search";
import VehicleCreate from "./Components/Create";
import VehicleDetail from "./Components/Detail";
// API
import { getPicAddress } from "@/api/common";
import { deleteUser, resetPassword } from "@/api/user";
import { getVehicleList, changeVehicle } from "@/api/vehicleManagement";

export default {
  name: "UserManagement",
  mixins: [mixins],
  components: {
    NavButton,
    NavPremissonButton,
    CommonWrapper,
    CommonTable,
    VehicleSearch,
    VehicleCreate,
    VehicleDetail
  },
  data() {
    return {
      comp: this,
      buttonData: [],
      tableData: [],
      isCreate: true,
      selectRow: {}, // 列表选中列
      isListLoading: false, // 列表加载
      orgnization: [], // 公用组织机构
      isCreateFormVisible: false, // 新建界面是否显示
      isDetailFormVisible: false,
      modifyUser: null, // 弹出框编辑时存放的临时行数据
      pagination: {
        // 翻页数据
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      searchParams: {}, // 查询参数
      vehicleProjectList: [],
      plateNoList: [],
      busInfo: {},
      imgUrl: "",
      showImgDialog: false,
      buttonData: []
    };
  },
  activated() {
    this.$refs.userTable.doLayout();
  },
  mounted() {},
  methods: {
    updateList(){
      this.search(this.searchParams)
    },
    // 查询和初始化查询
    // 查询/翻页公用方法
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
    queryList(params) {
      if (params.busStatus != this.searchParams.busStatus) {
        this.pagination.pageNum = 1;
      }
      this.getVehicle({
        ...params,
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      });
    },
    // 获取用户列表
    getVehicle(params) {
      this.isListLoading = true;
      getVehicleList(params).then(res => {
        this.tableData = res.item;
        this.pagination.total = res.total;
        this.pagination.pageNum = res.pageNum;
        this.pagination.pageSize = res.pageSize;
        this.isListLoading = false;
        if (res.item.length == 0 && res.pageNum > 1) {
          this.pagination.pageNum = 1;
          params.pageNum = 1;
          this.getVehicleList(params);
        }
      });
    },
    rest(params) {
      const searchParams = (this.searchParams = params);
      this.getVehicle({
        ...searchParams,
        pageNum: 1,
        pageSize: this.pagination.pageSize
      });
    },
    isButtonIsDisabled() {
      return !!this.selectRow.userUuid;
    },
    // 显示新增界面
    handleAdd() {
      this.isCreate = true;
      this.busInfo = {};
      this.isCreateFormVisible = true;
    },
    handleEdit(index, row) {
      this.isCreate = false;
      this.busInfo = row;
      this.isCreateFormVisible = true;
    },
    handleDetail(index, row) {
      this.busInfo = row;
      this.isDetailFormVisible = true;
    },
    isButtonDisabled() {
      return this.selectRow.userUuid;
    },
    // 查询详情
    getUserDetail(row, event) {
      // console.log(row)
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
    // 列表日期格式化
    formatCreateDate(row) {
      return moment(row.userCreateTime).format("YYYY-MM-DD");
    },
    formattStatus(row) {
      return row.busStatus == 1 ? "运营" : row.busStatus == 0 ? "停用" : "未知";
    },
    handleChange(index, row) {
      let params = {
        id: row.id,
        busStatus: row.busStatus
      };
      let message = row.busStatus == "1" ? "停用" : "启用";
      this.$confirm(message + "该车辆?", "提示", {
        type: "info"
      })
        .then(() => {
          changeVehicle(params).then(res => {
            if (!res.error) {
              this.$message({
                message: message + "成功！",
                type: "success"
              });
              this.queryList(this.searchParams);
            }
          });
        })
        .catch(() => {});
    },
    imgScan(img) {
      if (img) {
        this.imgUrl = img;
        this.showImgDialog = true;
      }
    },
    showBtn(method) {
      return this.buttonData.some(item => {
        return item.resourceUrl == method;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.dialogImg {
  width: 650px;
}
</style>
