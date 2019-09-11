<!--
 * @Description: In User Settings Edit
 * @Author: Calamus
 * @Date: 2019-08-05 10:56:41
 * @LastEditTime: 2019-09-04 09:33:09
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="customer_container">
    <el-form ref="customerInfo"
             :model="customerInfo"
             label-width="120px"
             :rules="formRules">
      <!-- 商户信息 -->
      <el-row>
        <el-col :span="24">
          <el-row v-if="roleType != 'merchant'">
            <el-col :span="24">
              <el-form-item label="商户"
                            prop="merchantId">
                <el-select v-model="customerInfo.merchantId"
                           filterable
                           clearable
                           placeholder="请选择商户">
                  <el-option v-for="(item, index) in merchantList"
                             :key="index"
                             :label="item.merchantName"
                             :value="item.merchantId" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="服务类型"
                            prop="orderType">
                <el-radio-group v-model="customerInfo.orderType" @change="changeOrderType">
                  <el-radio v-for="(item,index) in orderTypeList" :key="index" :label="item.value">{{item.label}}</el-radio>
                </el-radio-group>
                <el-button v-if="customerInfo.orderType == 2" size="mini"
                         @click="chooseOrder">绑定配送订单</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" >
              <el-form-item label="第三方单号"
                            prop="thirdPartyNo">
                <el-input v-model="customerInfo.thirdPartyNo"
                          placeholder="请输入第三方单号"
                          maxlength="50"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- 客户信息 -->
      <el-row>
        <el-col :span="24">
          <el-row>
            <h2>
              <span class="mar-r-10" >客户信息</span>
              <el-button size="mini"
                         :disabled="!customerInfo.merchantId"
                         @click="chooseCustomer">选择历史客户</el-button>
            </h2>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item label="客户姓名"
                            prop="customerName">
                <el-input v-model="customerInfo.customerName"
                          placeholder="请输入客户姓名"
                          maxlength="50"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="手机号码"
                            prop="customerPhone">
                <el-input v-model="customerInfo.customerPhone"
                          placeholder="请输入手机号码"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-row>
                <el-col :span="14">
                  <el-form-item label="所属区域"
                                prop="selectCityCode">
                    <el-cascader class="w100p"
                                 ref="cascader"
                                 :options="cityOptions"
                                 v-model="customerInfo.selectCityCode"
                                 change-on-select
                                 :props="cityProps"
                                 @change="selectCityChange"
                                 ></el-cascader>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row class="pos-r">
                <el-col :span="16">
                  <el-form-item label="地址"
                                prop="address">
                    <el-input v-model="customerInfo.address"
                              placeholder="请输入详细地址"
                              maxlength="50"></el-input>
                    <i class="el-icon-location posBtn" @click="chooseAddress(customerInfo,1)"></i>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="楼层电梯"
                            prop="isElevator">
                <el-radio-group v-model="customerInfo.isElevator">
                  <el-radio label="0">有</el-radio>
                  <el-radio label="1">无</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="楼层数"
                            prop="floor">
                <el-input-number v-model="customerInfo.floor"
                                 :min="1"
                                 :max="99999"
                                 :precision="0"
                                 :step="1"
                                 placeholder="请输入楼层数"> </el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- 提货信息 -->
      <el-row v-if="customerInfo.orderType != 2">
        <h2>
          <span class="mar-r-10">提货信息</span>
          <el-button size="mini"
                     :disabled="!customerInfo.merchantId"
                     @click="chooseDelivery">选择历史提货点</el-button>
        </h2>
        <el-col :span="24">
          <el-row>
            <el-col :span="24">
              <el-form-item label="提货联系人"
                            prop="deliveryContactUser">
                <el-input v-model="customerInfo.deliveryContactUser"
                          placeholder="请输入提货联系人"
                          maxlength="25"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="提货电话"
                            prop="deliveryContactPhone">
                <el-input v-model="customerInfo.deliveryContactPhone"
                          placeholder="请输入提货联系人手机号码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-form-item label="所属区域"
                            prop="deliveryselectCityCode">
                <el-cascader class="w100p"
                             ref="cascader2"
                             :options="cityOptions"
                             v-model="customerInfo.deliveryselectCityCode"
                             change-on-select
                             :props="cityProps"></el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="16" class="pos-r">
              <el-form-item label="详细地址"
                            prop="deliveryAddress">
                <el-input v-model="customerInfo.deliveryAddress"
                          placeholder="请输入提货点详细地址"
                          maxlength="50"> </el-input>
                <i class="el-icon-location posBtn" @click="chooseAddress(customerInfo,2)"></i>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="期望提货时间"
                            prop="deliveryTime">
                <el-date-picker style="width: 173px;"
                                placeholder="选择日期"
                                v-model="customerInfo.deliveryDate"
                                align="right"
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                type="date"
                                size="mini"
                                @change="changeDeliveryTime"
                                clearable>
                </el-date-picker>
                <el-time-select style="margin-left:5px;width: 120px;display:inline-block;"
                                v-model="customerInfo.deliveryHour"
                                :picker-options="{
                                    start: '00:00',
                                    step: '01:00',
                                    end: '23:00'
                                  }"
                                @change="changeDeliveryTime"
                                size="mini"
                                align="right"
                                format="HH:00"
                                value-format="HH:00:00"
                                placeholder="选择时间">
                </el-time-select>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="包装件数"
                            prop="pkgNum">
                <el-input-number :min="1"
                                 :max="99999"
                                 :precision="0"
                                 :step="1"
                                 v-model="customerInfo.pkgNum"
                                 placeholder="请输入包装件数"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <!-- 其他要求 -->
      <el-row>
        <h2>其他要求</h2>
        <el-col :span="24">
          <el-row>
            <el-col :span="24">
              <el-form-item label="服务时间"
                            prop="expectFinishTime">
                <span>
                  希望在
                  <el-date-picker style="width: 173px;display:inline-block;"
                                  placeholder="日期"
                                  format="yyyy-MM-dd"
                                  v-model="customerInfo.expectFinishTime"
                                  align="right"
                                  type="date"
                                  size="mini"
                                  value-format="yyyy-MM-dd"
                                  clearable>
                  </el-date-picker>
                  <!-- <el-time-select style="margin-left:5px;width: 120px;display:inline-block;"
                                  v-model="customerInfo.expectFinishHour"
                                  :picker-options="{
                                    start: '00:00',
                                    step: '01:00',
                                    end: '23:00'
                                  }"
                                  @change="changeExpectFinishTime"
                                  size="mini"
                                  align="right"
                                  format="HH:00"
                                  value-format="HH:00:00"
                                  placeholder="选择时间">
                  </el-time-select> -->
                  前完成服务
                </span>

              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="预估费用"
                            prop="estimatedCost">
                <el-input-number v-model="customerInfo.estimatedCost"
                                 placeholder="请输入预估费用"
                                 :min="0"
                                 :max="99999"
                                 :precision="0"
                                 :step="1"> </el-input-number>
                                 &nbsp;&nbsp;元
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="备注"
                            prop="waybillRemark">
                <el-input v-model="customerInfo.waybillRemark"
                          style="z-index:10"
                          type="textarea"
                          :rows="12"
                          :autosize="false"
                          maxlength="200"
                          class="create_textarea"
                          resize="none"
                          @focus="placeholderFocus"
                          @blur="placeholderBlur" />
                <div style="z-index:9"
                     class="diy_placeholder"
                     v-show="showPlaceHolder">
                  <el-row>
                    请填写关于客户以及提货的备注信息，以及其他需要司机注意的内容。
                  </el-row>
                  <el-row class="example">
                    <div class="title">
                      示例:
                    </div>
                    <ul class="content">
                      <li>1.提货前请先打电话和提货联系人确认货物详情</li>
                      <li>2.请尽早与客户预约上门时间，并在上门前1小时再次电话确认</li>
                      <li>3.服务时请尽量保持友好的态度</li>
                      <li>4.服务过程中有任何问题请及时与商户联系</li>
                      <li>5.服务完成时请上传真实的服务完工图片和客户签收单</li>
                    </ul>
                  </el-row>

                </div>
              </el-form-item>
            </el-col>
          </el-row>

        </el-col>
      </el-row>
      <el-row style="min-height:100px;text-align:center">
        <el-col :span="24">
          <el-button-group>
            <el-button size="small"
                      type="primary"
                      :loading="nexLoading"
                      @click="next">下一步</el-button>
            <el-button size="small"
                      @click="cancel">取消</el-button>
          </el-button-group>
        </el-col>
      </el-row>
    </el-form>
    <select-user-info :show.sync="showCustomer"
                      @sendData="receiveUserInfo"
                      :merchantId="customerInfo.merchantId" />

    <select-order-info :show.sync="showOrder"
                      :isEdit="isEdit"
                      @sendData="receiveOrderInfo"
                      :merchantId="customerInfo.merchantId" />

    <select-deliver-info :show.sync="showDeliver"
                         @sendData="receiveDeliverInfo"
                         :merchantId="customerInfo.merchantId" />

  </div>
</template>

<script>
import { getMerchantsByAssembly } from '@/api/order';
import SelectUserInfo from './customerSelect';
import SelectDeliverInfo from './deliverySelect';
import SelectOrderInfo from './orderSelect';
import Validator from '@/utils/extendValidate/extendValidate';
import areaTree from '@/assets/area_tree.json';
import moment from 'moment';
import { mapGetters } from 'vuex';
import {
  Order_Status_List,
  Order_List_Label,
  Order_Appoint_Status_List,
  Order_Type_list
} from "@/utils/ENUM";
const addressTree = areaTree.children;
export default {
  name: 'customerTemplate',
  components: {
    SelectUserInfo,
    SelectDeliverInfo,
    SelectOrderInfo
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    info: {
      type: Object,
    },
    merchantList: {
      type: Array,
    },
    nexLoading:{
      type:Boolean,
      default:false
    }
  },
  computed: {
    ...mapGetters(['roleType']),
  },
  data() {
    return {
      orderTypeList:Order_Type_list,
      // nexLoading: false,
      cityOptions: addressTree,
      cityProps: {
        value: 'adcode',
        label: 'name',
        children: 'children'
      },
      showPlaceHolder: true,
      customerInfo: {
        address: '',
        customerId: '',
        customerName: '',
        customerPhone: '',
        selectCityCode: '',
        deliveryContactPhone: '',
        deliveryContactUser: '',
        deliveryAddress: '',
        deliveryPointId: '',
        deliveryselectCityCode: '',
        deliveryPointName: '',
        estimatedCost: '',
        deliveryTime: null,
        deliveryDate: null,
        deliveryHour: '00:00',
        expectFinishTime: null,
        expectFinishDate: null,
        expectFinishHour: '00:00',
        floor: 1,
        address: '',
        isBack: '',
        isElevator: '0',
        isInstall: '',
        isScan: '',
        isUrgent: '',
        mainWaybillNo: '',
        merchantId: '',
        merchantName: '',
        orderType: '0',
        remark: '',
        thirdPartyNo: '',
        totalNum: 0,
        pkgNum: 0,
        transType: '',
        waybillRemark: '',
        waybillType: '',
        // waybillSource: 0,
        price: 0,
      },
      formRules: {
        merchantId: [
          { required: true, message: '请选择商户', trigger: 'blur' },
        ],
        orderType: [
          { required: true, message: '请选择服务类型', trigger: 'blur' },
        ],
        customerName: [
          { required: true, message: '请输入客户姓名', trigger: 'blur' },
        ],
        customerPhone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: Validator.cellPhone, trigger: 'blur' },
        ],
        selectCityCode: [
          { required: true, message: '请选择地区', trigger: 'blur' },
        ],
        deliveryselectCityCode: [
          { required: true, message: '请选择地区', trigger: 'blur' },
        ],
        address: [
          { required: true, message: '请输入详细地址', trigger: 'blur' },
        ],
        deliveryContactUser: [
          { required: true, message: '请输入提货联系人', trigger: 'blur' },
        ],
        deliveryContactPhone: [
          {
            required: true,
            message: '请输入提货联系人手机号码',
            trigger: 'blur',
          },
          { validator: Validator.cellPhone, trigger: 'blur' },
        ],
        deliveryAddress: [
          { required: true, message: '请输入提货点详细地址', trigger: 'blur' },
        ],
        deliveryTime: [
          { required: true, message: '请选择期望提货时间', trigger: 'blur' },
        ],
        expectFinishTime: [
          { required: true, message: '请选择期望完成时间', trigger: 'blur' },
        ],
      },
      showOrder:false,
      showCustomer: false,
      showDeliver: false,
      isMapShow:false,
      addressInfo:{},
      productList:[],
        chooseType:1
    };
  },
  mounted() {
    if (this.isEdit) {
      if (this.info && this.info.id) {
        this.customerInfo = JSON.parse(JSON.stringify(this.info));
        this.initEdit();
      }
    } else {
      this.showPlaceHolder = true;
      if (this.$store.getters.roleType.includes('merchant')) {
        this.customerInfo.merchantId = this.$store.getters.userId;
      } else {
        this.customerInfo.merchantId =
          this.merchantList &&
          this.merchantList.length > 0 &&
          this.merchantList[0].useruuid
            ? this.merchantList[0].useruuid
            : '';
      }
    }
  },
  watch: {
    info: {
      handler(newValue, oldValue) {
        console.log('watch', newValue);
        if (this.isEdit) {
          if (this.info && this.info.id) {
            this.customerInfo = JSON.parse(JSON.stringify(this.info));
            this.initEdit();
          }
        } else {
          if (this.$store.getters.roleType.includes('merchant')) {
            this.customerInfo.merchantId = this.$store.getters.userId;
          } else {
            this.customerInfo.merchantId =
              this.merchantList &&
              this.merchantList.length > 0 &&
              this.merchantList[0].useruuid
                ? this.merchantList[0].useruuid
                : '';
          }
        }
      },
      deep: true,
    },
    'customerInfo.waybillRemark': function(val) {
      if (val) {
        this.showPlaceHolder = false;
      } else {
        this.showPlaceHolder = true;
      }
    },
  },
  methods: {
    initEdit() {
      if (this.info.waybillRemark) {
        this.showPlaceHolder = false;
      }
      // 日期时间选择
      // this.$set(
      //   this.customerInfo,
      //   'expectFinishDate',
      //   this.customerInfo.expectFinishTime
      //     ? moment(this.customerInfo.expectFinishTime).format('YYYY-MM-DD')
      //     : null,
      // );
      // this.$set(
      //   this.customerInfo,
      //   'expectFinishHour',
      //   this.customerInfo.expectFinishTime
      //     ? moment(this.customerInfo.expectFinishTime).format('HH:mm')
      //     : '00:00',
      // );
      this.$set(
        this.customerInfo,
        'deliveryDate',
        this.customerInfo.deliveryTime
          ? moment(this.customerInfo.deliveryTime).format('YYYY-MM-DD')
          : null,
      );
      this.$set(
        this.customerInfo,
        'deliveryHour',
        this.customerInfo.deliveryTime
          ? moment(this.customerInfo.deliveryTime).format('HH:mm')
          : '00:00',
      );
    },
    changeOrderType(){
      // let orderType = this.customerInfo.orderType
      // this.$refs.customerInfo.resetFields();
      // this.customerInfo.orderType = orderType
      // this.productList = []
      // this.showPlaceHolder = true;
    },
    changeExpectFinishTime() {
      if (
        this.customerInfo.expectFinishDate
      ) {
        this.customerInfo.expectFinishTime = new Date(
          this.customerInfo.expectFinishDate +
            ' ' +
            this.customerInfo.expectFinishHour,
        );
      } else {
        this.customerInfo.expectFinishTime = null;
      }
    },
    changeDeliveryTime() {
      if (this.customerInfo.deliveryDate && this.customerInfo.deliveryHour) {
        this.customerInfo.deliveryTime = new Date(
          this.customerInfo.deliveryDate + ' ' + this.customerInfo.deliveryHour,
        );
      } else {
        this.customerInfo.deliveryTime = null;
      }
    },
    next() {
      this.$refs.customerInfo.validate(isValid => {
        if (isValid) {
          if(this.customerInfo.orderType == 2){
            this.clearDeliveryInfo()
          }else{
            this.customerInfo.deliverySelectCity = this.$refs.cascader2
              .getCheckedNodes()[0]
              .pathLabels.join('');
          }
          let merchantName = '';
          if (this.$store.getters.roleType.includes('merchant')) {
            merchantName =
              this.$store.getters.merchantInfo.userType == '0'
                ? this.$store.getters.merchantInfo.company
                : this.$store.getters.merchantInfo.contact;
          } else {
            let result = this.merchantList.find(item => {
              return item.merchantId === this.customerInfo.merchantId;
            });
            merchantName =
              result && result.merchantName ? result.merchantName : '';
          }
          this.$emit('addCustomer', {
            ...this.customerInfo,
            merchantName: merchantName,
            currentProductList:this.productList
          });
        }
      });
    },
    cancel() {
      this.$refs.customerInfo.resetFields();
      this.showPlaceHolder = true;
      this.$emit('cancel');
    },
    chooseOrder(){
      this.showOrder = true
    },
    chooseCustomer() {
      this.showCustomer = true;
    },
    chooseDelivery() {
      this.showDeliver = true;
    },
    receiveUserInfo(selectInfo) {
      console.log('receiveUserInfo', selectInfo);
      // this.customerInfo.customerId = selectInfo.id;
      this.customerInfo.customerName = selectInfo.customerName;
      this.customerInfo.customerPhone = selectInfo.customerPhone;
      this.customerInfo.address = selectInfo.address;
      this.customerInfo.selectCityCode = selectInfo.selectCityCode || [];
      this.customerInfo.selectCity = selectInfo.selectCity;
      this.customerInfo.isElevator = selectInfo.isElevator;
      this.customerInfo.lat = selectInfo.pointInfo.lat;
      this.customerInfo.lng = selectInfo.pointInfo.lng;
    },
    receiveOrderInfo(selectInfo) {
      console.log('receiveUserInfo', selectInfo);
      let orderType = this.customerInfo.orderType
      this.customerInfo =  JSON.parse(JSON.stringify(selectInfo))
      this.customerInfo.orderType = orderType ;
      this.customerInfo.orderInstallId = selectInfo.id ;
      delete this.customerInfo.id
      this.productList = selectInfo.productList && selectInfo.productList.length > 0 ?  selectInfo.productList : []
      this.clearDeliveryInfo()
    },
    clearDeliveryInfo(){
      this.customerInfo.deliveryContactUser ='';
      this.customerInfo.deliveryContactPhone = '';
      this.customerInfo.deliveryAddress = '';
      this.customerInfo.deliverySelectCity = '';
      this.customerInfo.deliveryselectCityCode = [];
      this.customerInfo.deliveryLat = '';
      this.customerInfo.deliveryLng = ''
    },
    receiveDeliverInfo(selectInfo) {
      console.log('receiveDeliverInfo', selectInfo);
      this.customerInfo.deliveryContactUser = selectInfo.contactUser;
      this.customerInfo.deliveryContactPhone = selectInfo.contactPhone;
      this.customerInfo.deliveryAddress = selectInfo.address;
      this.customerInfo.deliverySelectCity = selectInfo.selectCity;
      this.customerInfo.deliveryselectCityCode =
        selectInfo.selectCityCode || [];
        this.customerInfo.deliveryLat = selectInfo.lat;
      this.customerInfo.deliveryLng = selectInfo.lng;
    },
    placeholderFocus(e) {
      if (this.customerInfo.waybillRemark) {
        this.showPlaceHolder = false;
      } else {
        this.showPlaceHolder = true;
      }
    },
    placeholderBlur(e) {
      if (this.customerInfo.waybillRemark) {
        this.showPlaceHolder = false;
      } else {
        this.showPlaceHolder = true;
      }
    },
    chooseAddress(info,type){
      this.chooseType = type
      if(type == 1){
        this.addressInfo = {
          lng:this.customerInfo.lng,
          lat:this.customerInfo.lat,
          address:this.customerInfo.address,
        }
      }else if(type ==2){
        this.addressInfo = {
          lng:this.customerInfo.deliveryLng,
          lat:this.customerInfo.deliveryLat,
          address:this.customerInfo.deliveryAddress,
        }
      }
      this.isMapShow = true
    },
    selectCityChange(){
      this.customerInfo.selectCity = this.$refs.cascader
            .getCheckedNodes()[0]
            .pathLabels.join('');
    },
    getAddress (lat,lng,result,type) {
      if(type==1){
        this.customerInfo.selectCityCode = []
           let cityCode = []
           cityCode.push(Number(result.addressComponent.adcode.substring(0,2)+'0000'))
           if(result.addressComponent.adcode.indexOf('11')!=0&&result.addressComponent.adcode.indexOf('12')!=0&&result.addressComponent.adcode.indexOf('31')!=0&&result.addressComponent.adcode.indexOf('50')!=0){
             cityCode.push(Number(result.addressComponent.adcode.substring(0,4)+'00'))
           }
           cityCode.push(Number(result.addressComponent.adcode))
           this.customerInfo.selectCity = result.addressComponent.province+result.addressComponent.city+result.addressComponent.district
          this.customerInfo.selectCityCode = cityCode
            if(this.customerInfo.selectCity){
              this.customerInfo.address = result.formattedAddress.substring(result.formattedAddress.indexOf(this.customerInfo.selectCity)+this.customerInfo.selectCity.length);
            }else{
              this.customerInfo.address = result.formattedAddress
            }
           this.customerInfo.lat = lat
           this.customerInfo.lng = lng
      }else if(type==2){
        this.customerInfo.deliveryselectCityCode = []
           let cityCode = []
           cityCode.push(Number(result.addressComponent.adcode.substring(0,2)+'0000'))
           if(result.addressComponent.adcode.indexOf('11')!=0&&result.addressComponent.adcode.indexOf('12')!=0&&result.addressComponent.adcode.indexOf('31')!=0&&result.addressComponent.adcode.indexOf('50')!=0){
             cityCode.push(Number(result.addressComponent.adcode.substring(0,4)+'00'))
           }
           cityCode.push(Number(result.addressComponent.adcode))
           this.customerInfo.deliveryCity = result.addressComponent.province+result.addressComponent.city+result.addressComponent.district
          this.customerInfo.deliveryselectCityCode = cityCode
            if(this.customerInfo.deliveryCity){
              this.customerInfo.deliveryAddress = result.formattedAddress.substring(result.formattedAddress.indexOf(this.customerInfo.deliveryCity)+this.customerInfo.deliveryCity.length);
            }else{
              this.customerInfo.deliveryAddress = result.formattedAddress
            }
           this.customerInfo.deliveryLat = lat
           this.customerInfo.deliveryLng = lng
      }
           
        },
  },
};
</script>


<style lang="scss" scoped>
.customer_container {
  width: 60%;
  margin: 1rem auto;
}
.diy_placeholder {
  position: absolute;
  top: 1px;
  left: 15px;
  font-size: 12px;
  color: #c0c4cc;
  .example {
    display: flex;
    .title {
      text-align: right;
    }
  }
}
.posBtn{
  position: absolute;
  top: 0;
  right: -30px;
  font-size: 28px;
  cursor: pointer;
}
</style>

