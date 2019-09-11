<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 12:00:11
 * @LastEditTime: 2019-09-09 10:25:54
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <!-- 查询 -->
    <common-wrapper>
      <search
        :projectList="projectList"
        :warehouseList="warehouseList"
        @getWarehouse="getWarehouse"
        @search="btnSearch"
        @rest="rest" />
    </common-wrapper>
    <!-- 按钮 -->
    <nav-button>
      <el-button-group>
        <el-button icon="fdddfont icon-add-new" @click="addPartA">新增绑定信息</el-button>
      </el-button-group>
    </nav-button>
    <!-- 甲方列表 -->
          <el-table
            ref="dataTable"
            height="100%"
            stripe
            v-loading="isListLoading"
            tooltip-effect="light"
            :data="tableData">
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="projectName" label="项目" :show-tooltip-when-overflow="true">
              <template slot-scope="scope">
                {{`${scope.row.projectName}(${scope.row.projectId})`}}
              </template>
            </el-table-column>
            <el-table-column prop="warehouseName" label="仓库" :show-tooltip-when-overflow="true">
              <template slot-scope="scope">
                {{`${scope.row.warehouseName}(${scope.row.warehouseUuid})`}}
              </template>
            </el-table-column>
            <el-table-column prop="wmsMerchantName" label="wms商户" :show-tooltip-when-overflow="true">
              <template slot-scope="scope">
                {{`${scope.row.wmsMerchantName}(${scope.row.wmsMerchantId})`}}
              </template>
            </el-table-column>
            <el-table-column prop="customerName" label="云配商户" :show-tooltip-when-overflow="true">
              <template slot-scope="scope">
                {{`${scope.row.customerName}(${scope.row.customerUuid})`}}
              </template>
              </el-table-column>           
            <el-table-column label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button size="mini" round @click.stop="handleEdit(scope.row)">编辑</el-button>
                <el-button size="mini" round @click.stop="handleDelete(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
    <update
      :projectList="projectList"
      :show.sync="showUpdateDialog"
      :bindInfo="partAInfo"
      :isCreate="isCreate"
      @updateTable="updateTable"
    />
  </div>
</template>

<script>
  import moment from 'moment'
  import CommonWrapper from '@/components/commonWrapper'
  import NavButton from '@/components/navButton'
  import Search from './Components/Search'
  import Update from './Components/Update'
  import { getWareHouseByOrg } from '@/api/merchant'
  import { bindMerchantQuery,bindingMerchantRemove } from '@/api/merchant'
  import { mapGetters } from 'vuex'
  import {mixins} from '@/mixins'

  export default {
    name: 'index',
      mixins:[mixins],
      data () {
      return {
        projectList:[],
        warehouseList: [],
        selectWarehouse: '',
        tableData: [],
        isListLoading: false, // 列表加载
        pagination: { // 翻页数据
          pageNum: 1,
          pageSize: 10,
          total: 0
        },
        partAInfo: {},
        searchParams: {}, // 查询参数
        showUpdateDialog: false,
        isCreate: true,
          verifyLoading:[],
          fddLoading:[],
          showDetailDialog:false,
          menuWidth:0,
          buttonData:[]
      }
    },
    mounted () {
    },
      computed:{
      },
    methods: {
      //仓库列表
      getWarehouse(params){
        getWareHouseByOrg(params).then(res => {
          if(!res.error){
            this.warehouseList = res
          }
        })
      },
      //更新列表
      updateTable () {
        this.queryList(this.searchParams)
      },
        btnSearch(params){
            const searchParams = this.searchParams = params
            this.queryPartABInfo({
                ...searchParams,
                effectSwitch:'off',
                pageNum: 1,
                pageSize: this.pagination.pageSize
            })
        },
      // 查询和初始化查询
      queryList (params) {
        const searchParams = this.searchParams = params
        this.queryPartABInfo({
          ...searchParams,
          effectSwitch:'off',
          pageNum: this.pagination.pageNum,
          pageSize: this.pagination.pageSize
        })
      },
      rest (params) {
        const searchParams = this.searchParams = params
        this.queryPartABInfo({
          ...searchParams,
          effectSwitch:'off',
          pageNum: 1,
          pageSize: this.pagination.pageSize
        })
      },
      // 列表翻页
      changePage (pageNum) {
        this.pagination.pageNum = pageNum
        this.queryList(this.searchParams)
      },
      // 生成列表序号
      indexMethod (index) {
        return (index + 1) + (this.pagination.pageNum - 1) * this.pagination.pageSize
      },
      queryPartABInfo (params) {
        this.isListLoading = true
        bindMerchantQuery(params).then( res => {
            this.isListLoading = false
          if (!res.error) {
            this.tableData = res.item
            this.pagination.total = res.total
            this.pagination.pageNum = res.pageNum
            this.pagination.pageSize = res.pageSize
          }
        })
      },
      handleEdit (row) {
        this.isCreate = false
        this.partAInfo = Object.assign({},row)
        this.showUpdateDialog = true
      },
      addPartA(){
        this.isCreate = true
        this.showUpdateDialog = true
      },
      handleDelete(row){
        this.$confirm(`确定删除该绑定关系吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          bindingMerchantRemove(row).then(res => {
            if (!res.error) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.updateTable()
            }
          })
        }).catch(() => {})
      }
    },
    components: {
      Search,
      CommonWrapper,
      NavButton,
      Update
    }
  }
</script>

<style lang="scss" scoped>

</style>
