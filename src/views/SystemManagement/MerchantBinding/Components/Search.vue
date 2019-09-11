<template>
  <el-form :model="searchForm" ref="searchForm" class="searchForm" label-width="90px">
    <el-row>
      <el-col :span="6">
        <el-form-item label="仓库" prop="warehouseUuid">
          <el-select v-model="searchForm.warehouseUuid" clearable class="w100p" filterable
                     placeholder="请选择仓库">
            <el-option
                v-for="(item, index) in warehouseList"
                :key="index"
                :label="item.warehouseName"
                :value="item.warehouseUuid">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="仓库商户" prop="wmsMerchantName">
          <el-input v-model="searchForm.wmsMerchantName" placeholder="请输入仓库商户" clearable ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="服务商户" prop="customerName">
          <el-input v-model="searchForm.customerName" placeholder="请输入服务商户" clearable ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item>
          <el-button type="primary" @click.native="search">查询</el-button>
          <el-button @click="resetForm('searchForm')">重置</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
    import {setSession, getSession} from '@/utils/session'
    import { getTreeNode } from '@/utils/generateTree'
    import moment from 'moment'
    export default {
        name: 'Search',
        data() {
            return {
                searchForm: {
                    warehouseUuid: "",
                    wmsMerchantName:"",
                    customerName:""
                },
            }
        },
        props: {
          projectList:{
            type:Array
          },
            warehouseList:{
              type:Array
            }
        },
        mounted() {
            this.$emit('getWarehouse')
            this.search()
        },
        methods: {
            projectChange(value){
                this.searchForm.projectId = getTreeNode(this.projectList,this.searchForm.projectList)
                this.searchForm.projectIds = getTreeNode(this.projectList,this.searchForm.projectList).join(',')
                this.$emit('getWarehouse')
                this.search()
            },
            // 检索
            search() {
                this.$emit('search', Object.assign({}, this.searchForm))
            },
            // 重置
            resetForm(formName) {
                this.$refs[formName].resetFields()
                this.searchForm.projectId = getTreeNode(this.projectList,this.searchForm.projectList)
                this.searchForm.projectIds = getTreeNode(this.projectList,this.searchForm.projectList).join(',')
                this.$emit('getWarehouse',{orgUuid:this.searchForm.projectId[0]})
                this.$emit('rest', Object.assign({}, this.searchForm))
            }
        }
    }
</script>
<style lang="scss" scoped>
  .text-right {
    text-align: right;
    margin-left: 20px;
  }
  .el-icon-date {
    display: none !important;
  }
</style>
