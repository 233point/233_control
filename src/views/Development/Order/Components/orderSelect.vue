<template>
  <el-dialog
    width="800px"
    title="绑定配送单"
    v-if="isVisible"
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancel"
    :modal="false"
    center
  >
    <el-row v-if="!isDetail">
      <el-form :model="searchForm" ref="searchForm" :inline="true" label-width="120px">
        <el-form-item>
          <el-input
            v-model="searchForm.waybillNo"
            :placeholder="
                searchForm.billType == 0 ? '请输入CTMS单号查询' : '请输入第三方单号查询'
              "
            :clearable="true"
            style="width:320px"
          >
            <el-select
              style="width:120px"
              v-model="searchForm.billType"
              slot="prepend"
              placeholder="请选择搜索类型"
            >
              <el-option label="CTMS单号" :value="0"></el-option>
              <el-option label="第三方单号" :value="1"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="searchForm.customerInfo"
            placeholder="请输入客户姓名/电话/地址"
            style="width:300px"
            :clearable="true"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="search">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        ref="userInfoList"
        stripe
        tooltip-effect="light"
        v-loading="isListLoading"
        :data="userInfoList"
        max-height="400px"
        @row-click="handleDetailChoose"
      >
        <el-table-column type="index" label="序号" fixed="left" width="50"></el-table-column>
        <el-table-column prop="waybillNo" fixed="left" label="CTMS单号" width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDetailChoose(scope.row)">{{scope.row.waybillNo}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="thirdPartyNo"  label="第三方单号" width="120"></el-table-column>
        <el-table-column prop="orderType"  label="服务类型" width="120">
          <template slot-scope="scope">
            <span>{{formatterOrderType(scope.row.orderType)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="customerName"
          label="客户姓名"
          width="120"
          :show-tooltip-when-overflow="true"
        ></el-table-column>
        <el-table-column
          prop="customerPhone"
          
          label="客户电话"
          width="110"
          :show-tooltip-when-overflow="true"
        ></el-table-column>
        <el-table-column prop="fullAddress"  label="收货地址" width="110" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="floor"  label="楼层数" width="110"></el-table-column>
        <el-table-column
          prop="isElevator"
          
          label="电梯"
          width="110"
          :formatter="elevatorFormatter"
        ></el-table-column>
        <el-table-column prop="status" label="订单状态" min-width="150" fixed="right">
          <template slot-scope="scope">
            <span>{{ formatterStatus(scope.row.status) }}</span>
          </template>
        </el-table-column>
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
    </el-row>
    <el-row v-if="isDetail && currentRow" class="detail_container">
      <!-- 按钮 -->
      <el-row class="detail_control__header">
        <a href="javascript:;" @click.stop="clearChoose">
          <i class="el-icon-back"></i>
        </a>
        <span>{{currentRow.waybillNo}}</span>
      </el-row>
      <!-- detail -->
      <el-row class="detail_content__body">
        <el-form ref="detail"
             :model="currentRow"
             label-width="120px">
            <h4>客户信息</h4>
            <el-form-item label="客户姓名"
                          prop="customerName">
              <span>{{currentRow.customerName}}</span>
            </el-form-item>
            <el-form-item label="手机号码"
                          prop="customerPhone">
              <span>{{currentRow.customerPhone}}</span>
            </el-form-item>
            <el-form-item label="所属区域"
                                prop="selectCityCode">
              {{currentRow.selectCity}}
            </el-form-item>
            <el-form-item label="地址"
                                prop="fullAddress">
              <span>{{currentRow.address}}</span>
            </el-form-item>
            <h4>其他要求</h4>
            <el-form-item label="服务时间"
                                prop="expectFinishTime">
              <span>希望在&nbsp;&nbsp;{{dateFormatter(currentRow.expectFinishTime)}}&nbsp;&nbsp;前完成服务</span>
            </el-form-item>
            <el-form-item label="预估费用"
                                prop="estimatedCost">
              <span>{{currentRow.estimatedCost}}&nbsp;&nbsp;元</span>
            </el-form-item>
            <el-form-item label="备注"
                                prop="waybillRemark">
              <span>{{currentRow.waybillRemark}}</span>
            </el-form-item>
            <h4 v-if="!isEdit">
              <span>货品</span>
              <el-checkbox style="float:right" v-if="currentRow.templateType == 2 && currentRow.productList && currentRow.productList.length > 0" v-model="checkedAll" @change="checkAllProductList">&nbsp;</el-checkbox>
            </h4>
            <!-- 模版1 -->
          <el-row v-if="currentRow.templateType == 1 && !isEdit" >
            <el-table ref="orderTable1"
                      style="min-height:150px"
                      stripe
                      :data="currentRow.productList"
                      highlight-current-row
        max-height="400px"
        @selection-change="handleCurrentChange">
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column type="index"
                               label="序号"
                               width="50"
                               fixed="left"></el-table-column>
              <el-table-column label="货品名称"
                               prop="productName"
                               min-width="130"
                               :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column prop="productModel"
                               label="货品规格型号"
                               min-width="100"
                               :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column label="重量(公斤)"
                               prop="weight"
                               min-width="140"
                               :show-overflow-tooltip="true">
              </el-table-column>
              <el-table-column label="体积(立方米)"
                               min-width="100"
                               :show-overflow-tooltip="true"
                               prop="volume">
              </el-table-column>
              <el-table-column label="数量"
                               min-width="100"
                               prop="num"
                               :show-overflow-tooltip="true">
              </el-table-column>
            </el-table>
          </el-row>
          <!-- 模版2 -->
          <el-row v-if="currentRow.templateType == 2 && !isEdit">
            <div class="porduct_list_2_container">
              <div class="product_item"
                   v-for="(item,index) in currentRow.productList"
                   :key="index">
                <div class="img">
                  <img v-if="item.img"
                       :src="item.img"
                       alt="">
                </div>
                <div class="content">
                  <el-form label-position="right"
                           label-width="100px">
                    <el-row>
                      <el-col :span="14">
                        <el-form-item label="商品名称:">
                          <span>{{item.productName}}</span>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="数量:">
                          <span>{{item.num}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-form-item label="商品型号:">
                      <span>{{item.productModel}}</span>
                    </el-form-item>
                    <el-form-item label="特殊要求:">
                      <span>{{item.specialReq}}</span>
                    </el-form-item>
                  </el-form>
                </div>
                <div class="action">
                  <el-checkbox v-model="item.checked" @change="changeProductList($event,index)">&nbsp;</el-checkbox>
                </div>
              </div>
            </div>
          </el-row>
          <!-- 模版3 -->
          <el-row v-if="currentRow.templateType == 3 && !isEdit">
            <el-table ref="orderTable3"
                      style="min-height:150px"
                      stripe
                      :data="currentRow.productList"
                      highlight-current-row
                      max-height="400px"
                       @selection-change="handleCurrentChange">
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column type="index"
                               label="序号"
                               width="50"
                               fixed="left"
                               key="orderTable3_index"></el-table-column>
              <el-table-column label="货品名称"
                               min-width="150"
                               prop="productName"
                               key="orderTable3_productName">
              </el-table-column>
              <el-table-column label="品牌"
                               min-width="120"
                               prop="productBrand"
                               key="orderTable3_productBrand">
              </el-table-column>
              <el-table-column label="型号"
                               min-width="140"
                               prop="productModel"
                               key="orderTable3_productModel">
              </el-table-column>
              <el-table-column label="规格"
                               min-width="120"
                               prop="spec"
                               key="orderTable3_spec">
              </el-table-column>
              <el-table-column label="重量(公斤)"
                               min-width="140"
                               prop="weight"
                               key="orderTable3_weight">
              </el-table-column>
              <el-table-column label="颜色"
                               min-width="120"
                               prop="color"
                               key="orderTable3_color">
              </el-table-column>
              <el-table-column label="货品类型"
                               min-width="120"
                               prop="productType"
                               key="orderTable3_productType">
                <template slot-scope="scope">
                  <span>{{formatterType(scope.row.productType)}}</span>
                </template>
              </el-table-column>
              <el-table-column label="子件名"
                               min-width="150"
                               prop="subProItem"
                               key="orderTable3_subProItem">
              </el-table-column>
              <el-table-column label="数量"
                               min-width="140"
                               prop="num"
                               key="orderTable3_num">
              </el-table-column>
              <el-table-column label="备注"
                               min-width="140"
                               prop="remark"
                               key="orderTable3_remark">
              </el-table-column>
            </el-table>
          </el-row>

        </el-form>
      </el-row>
      <el-row  class="detail_control__footer">
        <el-col :span="24" style="text-align: center;">
          <el-button type="primary" @click="save()">绑定</el-button>
          <el-button @click="cancel()">取消</el-button>
        </el-col>
      </el-row>
    </el-row>

    
  </el-dialog>
</template>

<script>
import moment from 'moment';
import CommonTable from "@/components/commonTable";
import CommonWrapper from "@/components/commonWrapper";
import { installOrderList } from "@/api/order";
import {
  Order_Status_List,
  Order_Type_list
} from "@/utils/ENUM";

export default {
  name: "SelectUserInfo",
  data() {
    return {
      isVisible: false,
      checkedAll:true,
      isListLoading: false,
      selectRow: [],
      tableData: [],
      pagination: {
        // 翻页数据
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      searchForm: {
        billType:0,
        waybillNo:'',
        customerInfo:'',
        orderType: "0",    
        queryWaybillStatus: ["1","3"]
      }, // 查询参数
      currentRow: null,
      currentList:[],
      radio: false,
      userInfoList: [],
      statusList: Order_Status_List,
      orderTypeList:Order_Type_list,
      isDetail:false
    };
  },
  props: {
    show: {
      type: Boolean
    },
    merchantId: {
      type: String
    },
    isEdit:{
      type:Boolean,
      default:false
    }
  },
  watch: {
    show(isShow) {
      this.isVisible = isShow;
      if (isShow) {
        this.getUserInfoList();
      }
    }
  },
  methods: {
    search(){
        this.pagination.pageNum = 1
        this.getUserInfoList()
    },
    getUserInfoList() {
      this.isDetail = false
      installOrderList({ 
        ...this.searchForm,
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize,
        }).then(res => {
        if (!res.error) {
            this.userInfoList = res.item;
            this.pagination.total = res.total;
            this.isListLoading = false;
        }
      });
    },
    elevatorFormatter(row) {
      if (row.isElevator != null || row.isElevator != undefined) {
        return row.isElevator == "0" ? "有" : row.isElevator == "1" ? "无" : "";
      }
    },
    handleCurrentChange(val) {
      this.currentList = val;
    },
    handleDetailChoose(row){
      this.currentRow = row
      if(this.currentRow.productList && this.currentRow.productList.length > 0){
          this.currentRow.productList.map( item=>{
            this.$set(item,'checked', true);
          })
      }
      this.isDetail = true
    },
    checkAllProductList(val){
        if(val){
          this.currentRow.productList.map( item=>{
              this.$set(item,'checked', true);
          })
        }else{
          this.currentRow.productList.map( item=>{
              this.$set(item,'checked', false);
          })
        }
        this.currentList = []
        this.currentList = this.currentRow.productList && this.currentRow.productList.length > 0 ? this.currentRow.productList.filter(item =>{ return item.checked}) : []
    },
    changeProductList(val,index){
      this.currentList = []
      this.currentList = this.currentRow.productList && this.currentRow.productList.length > 0 ? this.currentRow.productList.filter(item =>{ return item.checked}) : []
    },
    clearChoose(){
      this.currentRow = null
      this.isDetail = false
    },
    getCurrentRow(index) {
      // this.save();
    },
    // 列表翻页
    changePage(pageNum) {
      this.pagination.pageNum = pageNum;
      this.radio = false
      this.getUserInfoList();
    },
    handleSizeChange(pageSize) {
      this.pagination.pageSize = pageSize;
      this.radio = false
      this.getUserInfoList()
    },
    save() {
      if (!this.currentRow) {
        this.$message({
          type: "warning",
          message: "请选择需要绑定的配送单！"
        });
        return;
      }
      let params = JSON.parse(JSON.stringify(this.currentRow))
      params.currentProductList = this.currentList
      this.$emit("sendData", params);
      this.cancel();
    },
    cancel() {
      this.$emit("update:show", false);
      this.currentRow = null;
      this.currentList = null;
      this.radio = false;
      this.isVisible = false;
      this.isDetail = false
    },
    formatterStatus(status) {
      var msg = "";
      let result = this.statusList.find(item => {
        return status == item.value;
      });
      return result ? result.label : "";
    },
    formatterOrderType(orderType){
      var msg = "";
      let result = this.orderTypeList.find(item => {
        return orderType == item.value;
      });
      return result ? result.label : "";
    },
    dateFormatter(time) {
      if (time) {
        return moment(time).format('YYYY-MM-DD');
      } else {
        return '';
      }
    },
  },
  components: {
    CommonTable,
    CommonWrapper
  }
};
</script>

<style lang="scss" scoped>
.detail_container{
  height:400px;
  .detail_control__header{
    line-height:20px;
    text-align:center;
    margin-bottom:1rem;
    a{
      font-size:20px;
      float:left;
    }
  }
  .detail_content__body{
    height:350px;
    overflow:auto;
  }
  .detail_control__footer{
    margin-top:10px;
    text-align:center;
  }
}
.porduct_list_2_container {
  width: 100%;
  margin-bottom: 1rem;
  .product_item {
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #dcdcdc;
    .el-form-item{
      margin-bottom:2px !important;
    }
    .img,
    .action {
      width: 150px;
    }
    .img {
      text-align: center;
      img {
        width: 130px;
        padding: 2rem;
      }
    }
    .content {
      padding: 2rem;
      width: calc(100% - 300px);
    }
    .action {
      text-align: right;
    }
  }
}
</style>
