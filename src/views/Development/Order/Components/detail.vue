<!--
 * @Description: In User Settings Edit
 * @Author: Calamus
 * @Date: 2019-05-20 10:21:31
 * @LastEditTime: 2019-08-29 17:16:46
 * @LastEditors: Please set LastEditors
 -->
<template>
  <common-content class="mercure_template"
                  :flex="100">
    <el-form ref="form"
             :model="form"
             label-width="120px">
            <el-divider content-position="left">
            <h3>客户信息</h3>
          </el-divider>
          <el-row>
            <el-col :span="8">
              <el-form-item label="客户姓名"
                            prop="customerName">
                <span>{{form.customerName}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户电话"
                            prop="customerPhone">
                <span>{{form.customerPhone}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="地址"
                            prop="fullAddress">
                <!-- <span>{{form.city}}</span>
                <br /> -->
                <span>{{form.fullAddress}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="电梯"
                            prop="isElevator">
                <span>{{form.isElevator == '0' ? '有' : form.isElevator == '1' ? '无' : '未知'}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="楼层数"
                            prop="floor">
                <span>{{form.floor}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        <el-divider content-position="left" v-if="form.orderType != 2">
            <h3>提货信息</h3>
        </el-divider>
        <div v-if="form.orderType != 2">
          <el-row >
            <el-col :span="18">
              <el-form-item label="提货联系人"
                            prop="deliveryContactUser">
                <span>{{form.deliveryContactUser}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="提货电话"
                            prop="deliveryContactPhone">
                <span>{{form.deliveryContactPhone}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="地址"
                            prop="userGender">
                <span>{{form.deliveryFullAddress}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="期望提货时间"
                            prop="deliveryTime">
                <span>{{timeFormatter(form.deliveryTime)}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="包装件数"
                            prop="pkgNum">
                <span>{{form.pkgNum}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
          <el-divider content-position="left">
            <h3>货品信息</h3>
          </el-divider>
          <!-- 模版1 -->
          <el-row v-if="form.templateType == 1">
            <el-table ref="orderTable1"
                      style="min-height:150px"
                      stripe
                      :data="form.productList">
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
          <el-row v-if="form.templateType == 2">
            <div class="porduct_list_2_container">
              <div class="product_item"
                   v-for="(item,index) in form.productList"
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
              </div>
            </div>
          </el-row>
          <!-- 模版3 -->
          <el-row v-if="form.templateType == 3">
            <el-table ref="orderTable3"
                      style="min-height:150px"
                      stripe
                      :data="form.productList">
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
          <el-divider content-position="left">
            <h3>其他要求</h3>
          </el-divider>
          <el-row>
            <el-col :span="16">
              <el-form-item label="服务时间"
                            prop="expectFinishTime">
                <span>希望在 &nbsp;&nbsp;{{dateFormatter(form.expectFinishTime)}} &nbsp;&nbsp;前完成服务</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="预估费用"
                            prop="estimatedCost">
                <span>{{form.estimatedCost}}&nbsp;&nbsp;元</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item prop="waybillRemark"
                            label="备注">
                <span>{{form.waybillRemark}}</span>
              </el-form-item>
            </el-col>
          </el-row>
    </el-form>
  </common-content>
</template>
<script>
/**
 * MercureTemplate
 * ----------------------
 * Author: Calamus
 * Date: 2019.05.15
 */
// validate
import Validator from '@/utils/extendValidate/extendValidate';
import TransferHeader from '@/components/TransferHeader';
import CommonContent from '@/components/commonContent';
import OrderCompare from './compare';
import moment from 'moment';
// api
import { updateUser } from '@/api/user';
import { Order_Status_List } from '@/utils/ENUM';
import ChangeLog from './log';
import CommonTable from '@/components/commonTable';

const initFrom = {
  productName: '',
  productShortName: '',
  productOperLogs: [],
  productContent: '',
  disPrice: '',
  prePrice: '',
  productStatus: '',
  createUserId: '',
};

export default {
  name: 'Detail',
  components: {
    TransferHeader,
    CommonContent,
    CommonTable,
    ChangeLog,
    OrderCompare,
  },
  data() {
    return {
      isVisible: false,
      orgnization: [],
      form: {},
      options: [],
      statusList: Order_Status_List,
      customStyle:
        'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden',
      deliverItemType: [
        {
          value: '0',
          label: '小件',
        },
        {
          value: '1',
          label: '套件',
        },
        {
          value: '2',
          label: '单品',
        },
      ],
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'add',
    },
    info: {
      type: Object,
      default: null,
    },
  },
  watch: {
    info: {
      handler(newValue, oldValue) {
        this.form = JSON.parse(JSON.stringify(newValue));
        console.log('info');
      },
      deep: true,
    },
  },
  mounted() {
    this.form = JSON.parse(JSON.stringify(this.info));
    console.log('mountedinfo');
  },
  methods: {
    formatterStatus(status) {
      var msg = {
        label: '待接单',
        value: '0',
        percentage: 0,
        color: '',
      };
      this.statusList.map(item => {
        if (status == item.value) {
          msg = item;
        }
      });
      return msg;
    },
    formatterType(type) {
      let result = this.deliverItemType.find(item => {
        return item.value == type;
      });
      return result ? result.label : type || '未知';
    },
    timeFormatter(time) {
      if (time) {
        return moment(time).format('YYYY-MM-DD HH:00');
      } else {
        return '';
      }
    },
    dateFormatter(time) {
      if (time) {
        return moment(time).format('YYYY-MM-DD');
      } else {
        return '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.mercure_template {
  padding:0 30px;
}
.porduct_list_2_container {
  width: 100%;
  margin-bottom: 1rem;
  .product_item {
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #dcdcdc;
    .img,
    .action {
      width: 200px;
    }
    .img {
      text-align: center;
      img {
        width: 150px;
        padding: 2rem;
      }
    }
    .content {
      padding: 2rem;
      width: calc(100% - 400px);
    }
    .action {
      text-align: right;
    }
  }
}
</style>

