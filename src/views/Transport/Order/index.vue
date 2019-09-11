<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 09:06:54
 * @LastEditTime: 2019-09-04 10:31:49
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <!-- 查询 -->
    <common-wrapper>
      <template-search class="search"
                      :merchantList="merchantList"
                       @search="search"
                       @rest="rest"/>
    </common-wrapper>
    <common-wrapper>
            <a-list
                class="table_list"
                itemLayout="vertical"
                :dataSource="tableData"
                :loading="isListLoading"
                size="small"
                :locale="{emptyText: '暂无数据'}"
              >
                <a-list-item class="trans_item" slot="renderItem" slot-scope="item, index">
                <!-- <a-list-item class="trans_item" slot="renderItem" slot-scope="item, index"  @click.stop="showDetail(index,item)"> -->
                  <a-list-item-meta>
                    <div slot="description" class="des">
                      <div v-if="item.waybillNo">
                        <span>CTMS单号:</span>
                        <span>{{item.waybillNo}}</span>
                      </div>
                      <div v-if="item.thirdPartyNo">
                        <span>第三方单号:</span>
                        <span>{{item.thirdPartyNo}}</span>
                      </div>
                      <div v-if="item.merchantName">
                        <span>商户:</span>
                        <span>{{item.merchantName}}</span>
                      </div>
                      <div v-if="item.orderType">
                        <span>服务类型:</span>
                        <span>
                          {{formatterOrderType(item.orderType)}}
                        </span>
                      </div>
                      <div v-if="item.transStatus">
                        <span>订单状态:</span>
                        <span>{{formatterStatus(item.transStatus)}}</span>
                      </div>
                      <div>
                        <span>客户姓名:</span>
                        <span>{{item.customerName}}</span>
                      </div>
                    </div>
                    <a slot="title" href="javascript:;">
                      <span>
                        <el-button class="control_btn" type="text" @click.stop="showDetail(index,item)">
                          <a-icon :type="item.showDetail ? 'eye-invisible' : 'eye'" />
                        </el-button>
                      </span>
                    </a>
                  </a-list-item-meta>
                  <div class="content_container" :class="item.showDetail ? 'active' : 'hidden'">
                    <div class="detail_container">
                      <div class="time_line" v-if="transTimeLine.length">
                        <a-timeline>
                          <a-timeline-item v-for="(item,index) in transTimeLine"
                                          :key="index">
                            <p class="time">{{dateFormatter(item.trailTime)}}</p>
                            <p class="content">{{item.trailRemark}}</p>
                          </a-timeline-item>
                        </a-timeline>
                      </div>
                      <g-map
                          ref="gmap"
                          class="gmap"
                          v-if="item.showDetail && showMap"
                          :flex="200"
                          :vid="vid"
                          :showPlanTruck="activeIndex == index && item.showPlanTruck"
                          :drivingable="true"
                          :lineArr="lineArr"
                          :lineStart="lineStart"
                          :lineEnd="lineEnd"
                          :trackStop="true"
                          :chooseArea="false"
                          :searchArea="false"
                          :showCenter="false"
                        />
                        <div class='trans_info'>
                      <div>
                        <span>客户电话:</span>
                        <span>{{waybillInfo.customerPhone}}</span>
                      </div>
                      <div>
                        <span>客户地址:</span>
                        <span>{{waybillInfo.fullAddress}}</span>
                      </div>
                      <div>
                        <span>楼层:</span>
                        <span>{{waybillInfo.floor}}</span>
                      </div>
                      <div>
                        <span>电梯:</span>
                        <span>{{waybillInfo.isElevator == '1'? '无':waybillInfo.isElevator == '0'? '有' :''}}</span>
                      </div>
                      <div>
                        <span>运单状态:</span>
                        <span v-if="form.transStatus">{{formatterStatus(form.transStatus)}}</span>
                      </div>
                      <div>
                        <span>运单备注:</span>
                        <span>{{form.transRemark}}</span>
                      </div>
                      <div v-if="form.plateNo">
                        <span>车辆:</span>
                        <span>{{form.plateNo}}</span>
                      </div>
                      <div v-if="form.driverName">
                        <span>司机:</span>
                        <span>{{form.driverName}}</span>
                      </div>
                      <div v-if="form.orderType == '1' && form.installUserList">
                        <span>安装人员:</span>
                        <span>{{form.installUserList.map(item => item.realName).join('、')}} </span>
                      </div>
                      <div v-if="DeliveryInfo.pickRemark">
                        <span>提货时间:</span>
                        <span>{{dateFormatter(DeliveryInfo.takingDeliveryTime)}}</span>
                      </div>
                      <div v-if="DeliveryInfo.takingDeliveryRemark">
                        <span>提货备注:</span>
                        <span>{{DeliveryInfo.takingDeliveryRemark}}</span>
                      </div>
                      <div>
                        <span>发车时间:</span>
                        <span>{{dateFormatter(form.departTime)}}</span>
                      </div>
                      <div>
                        <span>回单时间:</span>
                        <span>{{dateFormatter(ReceiptInfo.receiptTime)}}</span>
                      </div>
                      <div>
                        <span>回单备注:</span>
                        <span>{{ReceiptInfo.receiptRemark}}</span>
                      </div>
                      <div v-if="ReceiptInfo.homeDecorationDemand">
                        <span>家装需求:</span>
                        <span>{{ReceiptInfo.homeDecorationDemand}}</span>
                      </div>
                      <div v-if="ReceiptInfo.deliveryNotePicList && ReceiptInfo.deliveryNotePicList.length">
                        <span>确认单:</span>
                        <el-button type="text" class="img_btn" @click="imgView(ReceiptInfo.deliveryNotePicList,0)">查看</el-button>
                        <span>共{{ReceiptInfo.deliveryNotePicList.length}}张照片</span>
                      </div>
                      <div v-if="ReceiptInfo.afterInstallPicList && ReceiptInfo.afterInstallPicList.length">
                        <span>回单照片:</span>
                        <el-button type="text" class="img_btn" @click="imgView(ReceiptInfo.afterInstallPicList,0)">查看</el-button>
                        <span>共{{ReceiptInfo.afterInstallPicList.length}}张照片</span>
                      </div>
                      
                      </div>
                    </div>
                  </div>
                </a-list-item>
            </a-list>
                <el-pagination   background   layout="total, prev, pager, next"
                :current-page.sync="pagination.pageNum"
                style="text-align:right;margin-top: 1rem;"
                :page-size="pagination.pageSize"
                :total="pagination.total"
                @current-change="changePage"
                ></el-pagination>
      </common-wrapper>
    <img-view
      :imgList="imgList"
      :show.sync="isImgViewVisible"
      :imgListIndex="imgListIndex"
    />
  </div>
</template>

<script>
  import moment from 'moment'
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'
  import CommonWrapper from '@/components/commonWrapper'
  import TemplateSearch from './components/search'
  import ImgView from './components/ImgView'
  import GMap from '@/components/gMap'
  // import GMap from '@/components/mapMoveAlong'
  import {getTransInfo, getTrailList} from '@/api/vehicleManagement'
  import { converMile,getAllWithRoleType } from '@/api/common'
  import { getMerchantsByAssembly,getInstallList } from '@/api/order'
  import { All_Status_List,Order_Type_list } from '@/utils/ENUM';
import { getInstallDetail, getTransInfoDetail } from '@/api/datareport';

  export default {
    name: 'TrackOrder',
    components: {VuePerfectScrollbar, CommonWrapper, TemplateSearch, GMap,ImgView},
    data() {
      return {
        showMap: false,
        dataEmpty: false,
        activeName: "0",
        merchantList: [],
        vid: 'amap-vue',
        poi: {lat: '', lng: ''},
        address: '',
        tableData: [],
        pagination: { // 翻页数据
          pageNum: 1,
          pageSize: 10,
          total: 0
        },
        waybillTypeList: [],
        showMessage: false,
        lineEnd: [],
        lineStart: [],
        lineArr: [],
        chooseIndex: '',
        imgList: [],
        imgListIndex: 0,
        isImgViewVisible: false,
        showPlanTruck:false,
        isListLoading:false,
        statusList: All_Status_List,
        orderTypeList:Order_Type_list,
        DeliveryInfo:{},
        starInfo:{},
        productList:{},
        waybillInfo:{},
        form:{},
        transTimeLine:[],
        ReceiptInfo:{},
        cancel:null
      }
    },
    mounted() {
      
    },
    methods: {
      async showDetail(index,row){
        this.activeIndex = index
          this.lineEnd = [],
          this.lineStart = [],
          this.lineArr = [],
          this.DeliveryInfo = {}
          this.starInfo = {}
          this.productList = {}
          this.waybillInfo = {}
          this.form = {}
          this.transTimeLine = []
          this.ReceiptInfo = {}
        this.showMap = false
        this.tableData.forEach((item,index2) => index != index2?item.showDetail = false:'')
        this.tableData[index].showDetail = !this.tableData[index].showDetail;
        if(this.tableData[index].showDetail){
          let params = {
              waybillNo: row.waybillNo
            }
            this.getInstall(params)
            let transDetail = await this.getTransDetail(params)
            this.getTrailList(params,index)
        }
      },
      // 查询和初始化查询
      // 查询/翻页公用方法
      queryList (params) {
        this.getTransInfo(
          {
            ...params,
            pageNum: this.pagination.pageNum,
            pageSize: this.pagination.pageSize
          }
        )
      },
      getTransInfo(params){
        this.isListLoading = true
        getInstallList(params).then(res => {
          this.isListLoading = false
          if (!res.error) {
            res.item.forEach(item => {
              item.showDetail = false
              item.showPlanTruck = false
            })
            this.tableData = res.item
            this.pagination.total = res.total
            if(this.searchParams.fromOther){
              this.showDetail(0,this.tableData[0])
            }
          }
        })
      },
      // 列表翻页
      changePage (pageNum) {
        this.pagination.pageNum = pageNum
        this.queryList(this.searchParams)
      },
      getTrailList(params, index) {
        if (typeof this.cancel === 'function') {
                console.log(1)
                    this.cancel('终止请求'); //取消请求
                    this.cancel = null
                    console.log(2)
                }
        this.chooseIndex = index
        this.tableData[index].showPlanTruck = false
        this.lineArr = []
        getTrailList(params,this).then(res => {
          if (!res.error) {
              if(index == this.activeIndex){
                this.tableData[index].showPlanTruck = true
            
                let lineArr = []
                res.forEach(item => {
                  lineArr.push(item)
                })
                this.lineArr = [].concat(lineArr)
              }
              
          }else if(res.error){
            this.$message({
            message: '获取订单轨迹失败',
            type: 'error',
          });
          }
        })
      },
      formatterStatus(status) {
      var msg = {
        label: '待接单',
        value: '0',
        percentage: 0,
        color: '',
      };
      this.statusList.forEach(item => {
        if (status == item.value) {
          msg = item;
        }
      });
      return msg.label;
    },
    formatterOrderType(orderType){
      var msg = "";
      let result = this.orderTypeList.find(item => {
        return orderType == item.value;
      });
      return result ? result.label : "";
    },
      dateFormatter(date) {
        if (date) {
          return moment(date).format('YYYY-MM-DD HH:mm')
        }
      },
      search(params){
        this.pagination.pageNum = 1 ;
        const searchParams = params
          ? (this.searchParams = params)
          : this.searchParams;
        this.queryList(params);
        this.showMessage = false;
      },
      rest(params) {
        this.pagination.pageNum = 1 ;
        const searchParams = params
          ? (this.searchParams = params)
          : this.searchParams;
        this.queryList(params);
        this.showMessage = false;
      },
      resetMap() {
        this.lineArr = [];
        this.lineStart = [];
        this.lineEnd = [];
      },
      imgView(list,index) {
        this.isImgViewVisible = true
        this.imgList = list
        this.imgListIndex = index
      },
      dealKm(km){
        let okm = ''
        if(km && km != 'null'){
          okm = (Number(km)/1000).toFixed(2) + 'km'
        }else{
          okm = ''
        }
        return okm
      },
      getTransDetail(params) {
        return new Promise((resolve, reject) => {
          getInstallDetail(params).then(res => {
          if (!res.error) {
            resolve(res)
            this.form = JSON.parse(JSON.stringify(res));
            this.waybillInfo = JSON.parse(JSON.stringify(res.waybillInfo));
            this.lineStart = [Number(this.waybillInfo.deliveryPointInfo.lng), Number(this.waybillInfo.deliveryPointInfo.lat)]
            this.lineEnd = [Number(this.waybillInfo.lng), Number(this.waybillInfo.lat)]
            this.showMap = true
            this.productList = JSON.parse(
              JSON.stringify(res.waybillInfo.productList),
            );
            this.starInfo = res.evaluateModel && res.evaluateModel.length > 0 ? res.evaluateModel : {};
            console.log("res.receiptInfoVo",Object.keys(this.starInfo).length === 0)
            this.ReceiptInfo = res.receiptInfoVo && Object.keys(res.receiptInfoVo).length > 0  ? res.receiptInfoVo : {};
            console.log("res.receiptInfoVo",this.ReceiptInfo)

            this.DeliveryInfo = res.takingDeliveryInfoVo.length > 0 ? res.takingDeliveryInfoVo[0] : {};
          } else {
            reject()
            this.$message({
              message: '获取订单详情失败',
              type: 'error',
            });
            setTimeout(() => {
              this.cancel();
            }, 500);
          }
        });
        })
        
    },
     getInstall(params) {
      getTransInfoDetail(params).then(res => {
        if (!res.error) {
          this.transTimeLine = res.trailInfos
        } else {
          this.$message({
            message: '获取配装进度失败',
            type: 'error',
          });
          setTimeout(() => {
            this.cancel();
          }, 500);
        }
      });
    },
    }
  }
</script>

<style lang="scss" scoped>
.trans_item{
  // cursor: pointer;
}
  .table_list{
  min-height:400px;
  width: 100%;
  overflow: auto;
  border-top: 2px solid transparent;
  .control_btn{
    float:right;
    font-size:20px;
    padding:0 1rem;
  }
  .des{
    display:flex;
    div{
      margin-right:1.5rem;
      span:nth-child(1){
        color:rgba(0, 0, 0, 0.75) !important;
        word-break: keep-all;
      }
    }
  }
}
.content_container{
  transition: all 0.3s linear;
  display:flex;
  img{
    max-width:200px;
  }
  h3{
    margin-bottom:1rem;
  }
  .detail_container{
      position: relative;
      display: flex;
      width:100%;
      .amap-container.gmap{
        flex: 1 1 auto;
      }
      .trans_info{
        flex: 0 0 400px;
        >div{
          display: flex;
        }
      }
      div{
        margin-bottom:1rem;
        span:nth-child(1){
              display: inline-block;
                  width: 100px;
                  text-align: right;
                  font-weight: 450;
        }
        span:nth-child(2){
            padding-left:5px;
        }
      }
  }
  .approval_container{
    padding:1rem 5rem;
    border-left:1px solid #dcdcdc;
        min-width: 400px;
    .check{
      margin:1rem 0 ;
    }
  }
}
.content_container.active {
  height: auto;
  max-height:2000px;
  overflow:auto;
}
.content_container.hidden {
  height: 0;
  max-height:0px;
  overflow: hidden;
  display: none;
}
.dialogImg{
  width: 650px;
}
.time_line{
  position: absolute;
  height: calc( 100% - 1rem);
  overflow: scroll;
  padding:10px;
  z-index: 1000;
  background: rgba(0,0,0,0.5);
  .ant-timeline{
    color: #fff;
  }
}
.time_line::-webkit-scrollbar {
        display: none;
    }
.img_btn{
  padding: 0;
  font-size: 14px;
}
</style>
