<!--
 * @Description: In User Settings Edit
 * @Author: Calamus
 * @Date: 2019-08-05 14:38:22
 * @LastEditTime: 2019-09-04 09:43:53
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-dialog width="980px"
             title="订单打印"
             :visible.sync="isVisible"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             @close="cancel"
             class="printTable"
             center>
    <el-button @click="print"
               type="primary"
               style="margin-bottom:20px;">打印</el-button>
    <div id="print-area">
      <table border="1"
             v-for="(selectedOrderInfo,index) in selectedOrderlist"
             :key="index"
             style="color:#000;
                width: 900px;
                border-collapse: collapse;padding: 0;
    margin: 0;
    margin-bottom:24px;
    font-size: 12px;
    overflow: hidden;">
        <tr style="border: 1px solid #000;">
          <td style="border: 1px solid #000;padding:0 5px;"
              colspan="6"><span style="display:flex;align-items:center;"><img :src="userLogo"
                   alt=""
                   style="height: 50px;
            display: inline-block;
            vertical-align: bottom;" />
              <div style="display: inline-block;
            width: calc(100% - 135px);
            line-height: 50px;
            font-size: 22px;
            font-weight: bold;
            text-align: center;">{{selectedOrderInfo.merchantName}}送货通知单</div>
            </span></td>
          <td style="border: 1px solid #000;padding:0 5px;"
              colspan="4">编号{{selectedOrderInfo.waybillNo}}</td>
        </tr>
        <tr style="border: 1px solid #000;">
          <td style="border: 1px solid #000;padding:0 5px;width:70px;"
              class="firstCol">顾客姓名</td>
          <td style="border: 1px solid #000;padding:0 5px;width:80px;text-align: center;"
              class="secondCol text-a-c">{{selectedOrderInfo.customerName}}</td>
          <td style="border: 1px solid #000;padding:0 5px;"
              colspan="4">电话：{{selectedOrderInfo.customerPhone}}</td>
          <td style="border: 1px solid #000;padding:0 5px;"
              colspan="2">送货日期</td>
          <td style="border: 1px solid #000;padding:0 5px;text-align: center;"
              class="text-a-c"
              colspan="2">{{formatDate(selectedOrderInfo.deliveryTime)}}</td>
        </tr>
        <tr style="border: 1px solid #000;">
          <td style="border: 1px solid #000;padding:0 5px;width:70px;"
              class="firstCol">送货地址</td>
          <td style="border: 1px solid #000;padding:0 5px;text-align: center;font-size:16px;"
              class="text-a-c"
              colspan="9">{{selectedOrderInfo.fullAddress}}</td>
        </tr>
        <tr style="border: 1px solid #000;font-size: 12px;text-align: center;"
            class="middlesize">
          <td style="border: 1px solid #000;padding:0 5px;width:70px;"
              class="firstCol"
              rowspan="2">品牌名称</td>
          <td style="border: 1px solid #000;padding:0 5px;width:80px;"
              class="secondCol text-a-c"
              rowspan="2">商品名称</td>
          <td style="border: 1px solid #000;padding:0 5px;"
              class="text-a-c"
              rowspan="2">型号规格</td>
          <td style="border: 1px solid #000;padding:0 5px;"
              class="text-a-c"
              rowspan="2">颜色</td>
          <td style="border: 1px solid #000;padding:0 5px;"
              class="text-a-c"
              rowspan="2">套数</td>
          <td style="border: 1px solid #000;padding:0 5px;"
              class="text-a-c"
              rowspan="2">件数</td>
          <td style="border: 1px solid #000;padding:0 5px;"
              class="text-a-c"
              colspan="3">包装尺寸(CM)</td>
          <td style="border: 1px solid #000;padding:0 5px;"
              class="text-a-c"
              rowspan="2">体积(M3)</td>
        </tr>
        <tr style="border: 1px solid #000;font-size: 12px;text-align: center;"
            class="middlesize">
          <td style="border: 1px solid #000;padding:0 5px;width:46px;"
              class="text-a-c">长</td>
          <td style="border: 1px solid #000;padding:0 5px;width:46px;"
              class="text-a-c">宽</td>
          <td style="border: 1px solid #000;padding:0 5px;width:46px;"
              class="text-a-c">高</td>
        </tr>
        <tr style="border: 1px solid #000;"
            v-for="(item,index) in selectedOrderInfo.productList"
            :key="index">
          <td style="border: 1px solid #000;padding:0 5px;text-align: center;">{{item.productBrand}}</td>
          <td style="border: 1px solid #000;padding:0 5px;text-align: center;">{{item.productName}}</td>
          <td style="border: 1px solid #000;padding:0 5px;">
            <span v-if="item.productModel">{{item.productModel}}</span>
            <span v-if="item.spec">
              {{'~~'+item.spec}}
            </span>
          </td>
          <td style="border: 1px solid #000;padding:0 5px;">{{item.color}}</td>
          <td style="border: 1px solid #000;padding:0 5px;"></td>
          <td style="border: 1px solid #000;padding:0 5px;text-align: center;">{{item.num}}</td>
          <td style="border: 1px solid #000;padding:0 5px;text-align: center;"></td>
          <td style="border: 1px solid #000;padding:0 5px;text-align: center;"></td>
          <td style="border: 1px solid #000;padding:0 5px;text-align: center;"></td>
          <td style="border: 1px solid #000;padding:0 5px;text-align: center;">{{item.volume}}</td>
        </tr>
        <tr style="border: 1px solid #000;font-size: 12px;"
            class="middlesize">
          <td style="border: 1px solid #000;padding:0 5px;width:70px;text-align: center;"
              class="firstCol">总金额</td>
          <td style="border: 1px solid #000;padding:0 5px;"
              colspan="9">&emsp;&emsp;佰&emsp;&emsp;拾&emsp;&emsp;万&emsp;&emsp;仟&emsp;&emsp;佰&emsp;&emsp;拾&emsp;&emsp;元&emsp;&emsp;角&emsp;&emsp;分&emsp;&emsp;¥：</td>
        </tr>
        <tr style="border: 1px solid #000;font-size: 12px;"
            class="middlesize">
          <td style="border: 1px solid #000;padding:0 5px;text-align: center;"
              class="text-a-c"
              colspan="10">配送安装服务监督</td>
        </tr>
        <tr style="border: 1px solid #000;font-size: 12px;"
            class="middlesize">
          <td style="border: 1px solid #000;padding:0 5px;"
              colspan="10">
            <div style="display:inline-block;width:33%;">1、按预约时间上门 □是□否</div>
            <div style="display:inline-block;width:33%;">2、商品外包装完好无损 □是□否</div>
            <div style="display:inline-block;width:33%;">3、产品零配件签收 □是□无</div>
          </td>
        </tr>
        <tr style="border: 1px solid #000;font-size: 12px;"
            class="middlesize">
          <td style="border: 1px solid #000;padding:0 5px;"
              colspan="10">
            <div style="display:inline-block;width:33%;">4、安装位置征得同意 □是□否</div>
            <div style="display:inline-block;width:33%;">5、产品质量完好 □是□否</div>
            <div style="display:inline-block;width:33%;">6、现场清理完毕并无任何损坏 □是□否</div>
          </td>
        </tr>
        <tr style="border: 1px solid #000;font-size: 12px;"
            class="middlesize">
          <td style="border: 1px solid #000;padding:0 5px;">总体评价：</td>
          <td style="border: 1px solid #000;padding:0 5px;"
              colspan="2"> □非常满意 □满意 □一般 □不满意 </td>
          <td style="border: 1px solid #000;padding:0 5px;"
              colspan="7"
              rowspan="3">备注：</td>
        </tr>
        <tr style="border: 1px solid #000;font-size: 12px;"
            class="middlesize">
          <td style="border: 1px solid #000;padding:0 5px;"
              colspan="2">顾客签字：</td>
          <td style="border: 1px solid #000;padding:0 5px;">回访电话：021-60571070</td>
        </tr>
        <tr style="border: 1px solid #000;font-size: 12px;"
            class="middlesize">
          <td style="border: 1px solid #000;padding:0 5px;text-align: center;"
              colspan="3"><span style="font-weight:bold;">签字前请开箱验收货物，签字验收后本公司概不负责，请自行承担</span></td>
        </tr>
        <tr style="border: 1px solid #000;font-size: 12px;"
            class="middlesize">
          <td style="border: 1px solid #000;padding:0 5px;"
              colspan="3">
            <div style="display:inline-block;width:33%;">制单签字：</div>
            <div style="display:inline-block;width:33%;">仓管签字：</div>
            <div style="display:inline-block;width:33%;">司机车牌：</div>
          </td>
          <td style="border: 1px solid #000;padding:0 5px;"
              colspan="7">安装技师：</td>
        </tr>
      </table>
    </div>
  </el-dialog>
</template>
<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
export default {
  name: 'Export',
  components: {},
  computed: {
    ...mapGetters(['userLogo']),
  },
  data() {
    return {
      isVisible: false,
      selectedOrderInfo: {},
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    selectedOrderlist: {
      type: Array,
    },
  },
  watch: {
    show(isShow) {
      this.isVisible = isShow;
      this.selectedOrderInfo = this.selectedOrderlist[0];
      console.log('print', this.selectedOrderlist);
    },
  },
  methods: {
    formatDate(date) {
      return moment(date).format('YYYY-MM-DD HH');
    },
    print() {
      var headhtml =
        "<!DOCTYPE html><html><head><title></title><style>body{padding:20px;70px;}</style></head><body id='printWindow'>";
      let foothtml = '</body></html>';
      let printHtml = document.getElementById('print-area').innerHTML;
      printHtml = headhtml + printHtml + foothtml;
      let printer = window.open(
        '',
        'printPage',
        'height=700,width=750,top=50,left=200,toolbar=no,menubar=no,resizable=no,location=no, status=no',
      );
      printer.document.write(printHtml);
      printer.document.close();
      printer.print();
    },
    cancel() {
      this.$emit('update:show', false);
      this.isVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.printTable {
  table {
  }
}
</style>

