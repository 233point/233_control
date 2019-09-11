<!--
 * @Description: In User Settings Edit
 * @Author: Calamus
 * @Date: 2019-08-05 10:56:46
 * @LastEditTime: 2019-09-04 09:43:11
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="product">
    <div class="template_container">
      <div class="choose_template">
        <span class="template_title">货品模板：</span>
        <el-radio-group v-model="templateId"
                        @change="changeTemplate">
          <el-radio v-for="item in 3"
                    :label="item"
                    :key="item"
                    :disabled="isEdit">{{'标准模板' + item}}</el-radio>
        </el-radio-group>
      </div>
      <div class="total_show">
        <span v-if="templateId == 1"
              :span="24">
          <span>数量：{{totalNum}}</span>
          <span>总重量：{{totalWeight}}公斤</span>
          <span>总体积：{{totalVolume}}立方米</span>
        </span>
        <span v-if="templateId == 2"
              :span="24">
          <span>数量：{{totalNum}}</span>
        </span>
        <span v-if="templateId ==3"
              :span="24">
          <span>数量：{{totalNum}}</span>
          <span>总重量：{{totalWeight}}公斤</span>
        </span>
      </div>
    </div>

    <el-row v-if="templateId == 1">
      <el-col :span="24">
        <div class="add_btn">
          <el-button type="primary"
                     plain
                     @click="addRow">添加货品</el-button>
        </div>
      </el-col>
      <el-col :span="24">
        <el-table ref="orderTable1"
                  stripe
                  style="min-height:50px;"
                  v-loading="isListLoading"
                  :data="tableData"
                  tooltip-effect="light">
          <el-table-column type="index"
                           key='orderTable1_index'
                           label="序号"
                           width="50"
                           fixed="left"></el-table-column>
          <el-table-column label="货品名称"
                           prop="productName"
                           key="orderTable1_productName"
                           min-width="150">
            <template slot-scope="scope">
              <el-input v-model="scope.row.productName"
                        maxlength="50"
                        placeholder="请输入货品名称"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="货品规格型号"
                           min-width="140"
                           prop="productModel"
                           key="orderTable1_productModel">
            <template slot-scope="scope">
              <el-input v-model="scope.row.productModel"
                        maxlength="50"
                        placeholder="请输入货品规格型号"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="重量(公斤)"
                           min-width="140"
                           prop="weight"
                           key="orderTable1_weight">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.weight"
                               controls-position="right"
                               :min="0"
                               :max="99999"
                               :precision="2"
                               :step="0.01"
                               placeholder="请输入重量"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="体积(立方米)"
                           min-width="140"
                           prop="volume"
                           key="orderTable1_volume">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.volume"
                               maxlength="50"
                               placeholder="请输入体积"
                               controls-position="right"
                               :min="0"
                               :max="99999"
                               :precision="0"
                               :step="1"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="数量"
                           min-width="140"
                           prop="num"
                           key="orderTable1_num">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.num"
                               class="productCount"
                               controls-position="right"
                               :min="1"
                               :max="99999"
                               :precision="0"
                               :step="1"
                               size="mini"
                               placeholder="请输入货品数量"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column width="100"
                           label="操作"
                           fixed="right"
                           key="orderTable1_control">
            <template slot-scope="scope">
              <el-button @click.native.prevent="deleteRow(scope.row,scope.$index)"
                         type="text"
                         rules="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row v-if="templateId == 2">
      <el-col :span="24">
        <div class="add_btn">
          <el-button type="primary"
                     plain
                     @click="addRow">添加货品</el-button>
        </div>
        <div class="porduct_list_2_container">
          <div class="product_item"
               v-for="(item,index) in tableData"
               :key="index">
            <div class="img">
              <img v-if="item.img"
                   :src="item.img"
                   alt="">
              <el-button @click="addImg(item,index)">添加/修改图片</el-button>
            </div>
            <div class="content">
              <el-form label-position="right"
                       label-width="100px">
                <el-row>
                  <el-col :span="14">
                    <el-form-item label="商品名称:">
                      <el-input v-model="item.productName"
                                placeholder="请输入商品名称"
                                style="width:173px"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="数量:">
                      <el-input-number controls-position="right"
                                       :min="1"
                                       :max="99999"
                                       :precision="0"
                                       :step="1"
                                       size="mini"
                                       v-model="item.num"
                                       placeholder="请输入数量"></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="商品型号:">
                  <el-input v-model="item.productModel"
                            placeholder="请输入商品型号"></el-input>
                </el-form-item>
                <el-form-item label="特殊要求:">
                  <el-input type="textarea"
                            :autosize="{minRows:2,maxRows:4}"
                            maxlength="200"
                            resize="none"
                            v-model="item.specialReq"
                            placeholder="请输入特殊要求"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="action">
              <el-button @click.native.prevent="deleteRow(item,index)"
                         type="text"
                         rules="small">
                删除
              </el-button>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row v-if="templateId == 3">
      <el-col :span="24">
        <div class="add_btn">
          <el-button type="primary"
                     plain
                     @click="addRow">添加货品</el-button>
        </div>
      </el-col>
      <el-col :span="24">
        <el-table ref="orderTable3"
                  stripe

                  v-loading="isListLoading"
                  :data="tableData">
          <el-table-column type="index"
                           label="序号"
                           width="50"
                           fixed="left"
                           key="orderTable3_index"></el-table-column>
          <el-table-column label="货品名称"
                           min-width="150"
                           prop="productName"
                           key="orderTable3_productName">
            <template slot-scope="scope">
              <el-input v-model="scope.row.productName"
                        maxlength="50"
                        placeholder="请输入货品名称"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="品牌"
                           min-width="120"
                           prop="productBrand"
                           key="orderTable3_productBrand">
            <template slot-scope="scope">
              <el-input v-model="scope.row.productBrand"
                        maxlength="50"
                        placeholder="请输入品牌"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="型号"
                           min-width="140"
                           prop="productModel"
                           key="orderTable3_productModel">
            <template slot-scope="scope">
              <el-input v-model="scope.row.productModel"
                        maxlength="50"
                        :disabled="scope.row.fromTemplate"
                        placeholder="请输入型号"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="规格"
                           min-width="120"
                           prop="spec"
                           key="orderTable3_spec">
            <template slot-scope="scope">
              <el-input v-model="scope.row.spec"
                        maxlength="50"
                        resize="none"
                        placeholder="请输入规格"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="重量(公斤)"
                           min-width="140"
                           prop="weight"
                           key="orderTable3_weight">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.weight"
                               placeholder="请输入重量"
                               controls-position="right"
                               :min="0"
                               :max="999999"
                               :precision="2"
                               :step="0.01"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="颜色"
                           min-width="120"
                           prop="color"
                           key="orderTable3_color">
            <template slot-scope="scope">
              <el-input v-model="scope.row.color"
                        maxlength="50"
                        placeholder="请输入颜色"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="货品类型"
                           min-width="120"
                           prop="productType"
                           key="orderTable3_productType">
            <template slot-scope="scope">
              <el-select v-model="scope.row.productType"
                         placeholder="请选择货品类型">
                <el-option v-for="(item,index) in deliverItemType"
                           :key="index"
                           :label="item.label"
                           :value="item.value"
                           :disabled="item.label=='未知'">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="子件名"
                           min-width="150"
                           prop="subProItem"
                           key="orderTable3_subProItem">
            <template slot-scope="scope">
              <el-input v-model="scope.row.subProItem"
                        maxlength="50"
                        v-if="scope.row.productType == '1'"
                        placeholder="请输入子件名"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="数量"
                           min-width="140"
                           prop="num"
                           key="orderTable3_num">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.num"
                               class="productCount"
                               controls-position="right"
                               :min="1"
                               :max="99999"
                               :precision="0"
                               :step="1"
                               size="mini"
                               placeholder="请输入数量"></el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="备注"
                           min-width="140"
                           prop="remark"
                           key="orderTable3_remark">
            <template slot-scope="scope">
              <el-input v-model="scope.row.remark"
                        type="textarea"
                        :autosize="{minRows:1,maxRows:2}"
                        maxlength="200"
                        resize="none"
                        class="create_textarea"
                        placeholder="请输入备注"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="100"
                           label="操作"
                           fixed="right">
            <template slot-scope="scope">
              <el-button @click.native.prevent="deleteRow(scope.row,scope.$index)"
                         type="text"
                         rules="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-row style="min-height:100px;text-align:center;margin-top:1rem;">
      <el-col :span="24">
        <el-button-group>
          <el-button size="small"
                    type="primary"
                    @click="submit">完成</el-button>
          <el-button size="small"
                    @click="cancel">取消</el-button>
        </el-button-group>
      </el-col>
    </el-row>

    <img-add :show.sync="importVisible"
             @receiveData="receiveUpload" />
  </div>
</template>

<script>
import CommonTable from '@/components/commonTable';
import ImgAdd from './uploadImg';

let productItem = {
  color: '',
  img: '',
  num: '1',
  packageType: '',
  productBrand: '',
  productMain: '',
  productModel: '',
  productName: '',
  productType: '',
  remark: '',
  spec: '',
  specialReq: '',
  subPro: '',
  subProItem: '',
  updateUserId: '',
  volume: '',
  weight: '',
};
export default {
  name: 'productTemplate',
  components: { CommonTable, ImgAdd },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    info: {
      type: Object,
    },
    templateType:{
      type: Number,
      default:1
    },
    productList:{
      type:Array
    }
  },
  data() {
    return {
      importVisible: false,
      currentIndex: null,
      tableData: [],
      templateId: 1,
      isListLoading: false,
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
  mounted(){
    console.log("productList",this.productList)
    if(!this.isEdit){
      this.tableData = JSON.parse(JSON.stringify(this.productList));
      this.templateId = this.templateType
      this.templateId = this.templateType
    }
  },
  watch: {
    info: {
      handler(newValue, oldValue) {
        if (newValue && newValue.id) {
          if (newValue.productList && newValue.productList.length > 0) {
            this.tableData = JSON.parse(JSON.stringify(this.info.productList));
          } else {
            this.tableData = [];
          }
          this.templateId = this.info.templateType
            ? Number(this.info.templateType)
            : 1;
        }
      },
      deep: true,
    },
    productList: {
      handler(newValue, oldValue) {
        console.log("productList",newValue, oldValue)
        this.tableData = JSON.parse(JSON.stringify(newValue));
        this.templateId = this.templateType
        // if (newValue && newValue.id) {
        //   if (newValue.productList && newValue.productList.length > 0) {
        //     this.tableData = JSON.parse(JSON.stringify(this.info.productList));
        //   } else {
        //     this.tableData = [];
        //   }
        //   this.templateId = this.info.templateType
        //     ? Number(this.info.templateType)
        //     : 1;
        // }
      },
      deep: true,
    },
  },
  computed: {
    totalNum() {
      let result = 0;
      this.tableData.map(item => {
        result += Number(item.num);
      });
      return result;
    },
    totalWeight() {
      let result = 0;
      this.tableData.map(item => {
        result = Number(item.weight) + result;
      });
      return result.toFixed(2);
    },
    totalVolume() {
      let result = 0;
      this.tableData.map(item => {
        result += Number(item.volume);
      });
      return result;
    },
  },
  methods: {
    changeTemplate(val) {
      console.log('val', val);
      if(val == 1){
        this.$nextTick(() =>{
        this.$refs.orderTable1.doLayout()
        })
      }else if(val == 3){
        this.$nextTick(() =>{
        this.$refs.orderTable3.doLayout()
        })
      }
    },
    validTableData(type) {
      console.log('type', type);
      let len = this.tableData.length;
      if (len > 0) {
        for (let i = 0; i < len; i++) {
          let item = this.tableData[i];
          if (type == 1) {
            if (item.productName == '') {
              this.$message({
                message: '货品名称不能为空！',
                type: 'warning',
              });
              return false;
            }
            if (item.productModel == '') {
              this.$message({
                message: '货品规格型号不能为空！',
                type: 'warning',
              });
              return false;
            }
            if (item.volume == '') {
              this.$message({
                message: '体积不能为空！',
                type: 'warning',
              });
              return false;
            }
            if (item.num == '') {
              this.$message({
                message: '数量不能为空！',
                type: 'warning',
              });
              return false;
            }
            if (i == len - 1) {
              return true;
            }
          } else if (type == 2) {
            if (item.productName == '') {
              this.$message({
                message: '商品名称不能为空！',
                type: 'warning',
              });
              return false;
            }
            if (item.productModel == '') {
              this.$message({
                message: '商品型号不能为空！',
                type: 'warning',
              });
              return false;
            }
            if (item.num == '') {
              this.$message({
                message: '数量不能为空！',
                type: 'warning',
              });
              return false;
            }
            if (i == len - 1) {
              return true;
            }
          } else if (type == 3) {
            if (item.productName == '') {
              this.$message({
                message: '货品名称不能为空！',
                type: 'warning',
              });
              return false;
            }
            if (item.productBrand == '') {
              this.$message({
                message: '品牌不能为空！',
                type: 'warning',
              });
              return false;
            }
            if (item.productModel == '') {
              this.$message({
                message: '型号不能为空！',
                type: 'warning',
              });
              return false;
            }
            if (item.productType == '') {
              this.$message({
                message: '货品类型不能为空！',
                type: 'warning',
              });
              return false;
            }
            if (item.num == '') {
              this.$message({
                message: '数量不能为空！',
                type: 'warning',
              });
              return false;
            }
            if (item.productType == '1' && item.subProItem == '') {
              this.$message({
                message: '子件不能为空！',
                type: 'warning',
              });
              return false;
            }
            if (i == len - 1) {
              return true;
            }
          } else {
            return true;
          }
        }
      } else {
        return true;
      }
    },
    submit() {
      let productValid = this.validTableData(this.templateId);
      console.log('productValid', productValid);
      if (productValid) {
        this.$emit('addProduct', {
          templateType: this.templateId,
          productList: this.tableData,
        });
      }
    },
    cancel() {
      this.$emit('cancel');
    },
    renderHeader1(createElement, {}) {
      return createElement('el-button', {
        class: ['addBtn', 'el-button--primary'],
        domProps: {
          innerHTML: '添加货品',
        },
        on: {
          click: () => {
            this.addRow();
          },
        },
      });
    },
    renderHeader3(createElement, {}) {
      return createElement('el-button', {
        class: ['addBtn', 'el-button--primary'],
        domProps: {
          innerHTML: '添加货品',
        },
        on: {
          click: () => {
            this.addRow();
          },
        },
      });
    },
    addRow() {
      this.tableData.push(JSON.parse(JSON.stringify(productItem)));
    },
    deleteRow(row, index) {
      this.tableData.splice(index, 1);
    },
    addImg(item, index) {
      this.importVisible = true;
      this.currentIndex = index;
    },
    closeImageAdd() {
      this.importVisible = false;
    },
    receiveUpload(data) {
      this.tableData[this.currentIndex].img = data;
    },
  },
};
</script>

<style lang="scss" scoped>
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
.image-slot {
  width: 200px;
}
.product {
  width: 80%;
  margin: 1rem auto;
  .template_container {
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;
    .choose_template {
      padding: 0 2rem;
      .template_title {
        font-weight: 500;
        font-size: 14px;
      }
    }
    .total_show {
      span {
        padding-right: 1rem;
      }
    }
  }
  .add_btn {
    width: 100%;
    button {
      width: 100% !important;
      padding: 1rem !important;
      margin: 1rem !important;
    }
  }
}
</style>

