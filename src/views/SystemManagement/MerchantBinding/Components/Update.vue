<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-06 12:00:11
 * @LastEditTime: 2019-09-09 10:36:36
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-dialog
    width="700px"
    title="商户绑定"
    :visible.sync="isVisible"
    :close-on-click-modal = "false"
    :close-on-press-escape = "false"
    :append-to-body="true"
    lock-scroll
    class="partAUpdate"
    @close="cancel">
    <el-form ref="partAForm" label-position="top" :model="partAForm" :rules="formRules" label-width="100px">
      <el-row>
        <el-col :span="11" :offset="1">
          <!-- <el-form-item label="所属项目" prop="projectList">
            <el-cascader
              filterable
              class="w100p"
              placeholder="请选择项目"
              :options="projectList"
              v-model="partAForm.projectList"
              @change="projectChange">
            </el-cascader>
          </el-form-item> -->
          <el-form-item label="所属仓库" prop="warehouseUuid">
            <el-select v-model="partAForm.warehouseUuid" @change="warehouseChange" class="w100p" filterable
                       placeholder="请选择仓库">
              <el-option
                v-for="(item, index) in warehouseList"
                :key="index"
                :label="item.warehouseName"
                :value="item.warehouseUuid">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商户" prop="wmsMerchantId">
            <el-select v-model="partAForm.wmsMerchantId" class="w100p" filterable
                       placeholder="请选择商户">
              <el-option
                 v-for="(item, index) in merchantList"
                :key="index"
                :label="item.userName"
                :value="item.userUuid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="1">
          <el-divider direction="vertical"></el-divider>
        </el-col>
        <el-col :span="11">
          <el-form-item label="云配商户" prop="customerUuid">
            <el-select v-model="partAForm.customerUuid" class="w100p" filterable
                       placeholder="请选择云配商户">
              <el-option
                v-for="(item,index) in partBInfo"
                :key="index"
                :label="item.merchantName"
                :value="item.merchantId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="18">
          <el-button type="primary" @click="save" :loading="isSaving">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
  import { BASE_PER_FIX_URL } from '@/utils/baseUrlPerFix.js'
  import { getWareHouseByOrg,queryPartABInfo,getAllMerchantsList,bindMerchant } from '@/api/merchant'
  import { getMerchantsByAssembly } from '@/api/order'
  import Validator from '@/utils/extendValidate/extendValidate'

  export default {
    name: "Update",
    data() {
      return {
        isVisible: false,
        isSaving: false,
        partAForm: {
          // projectList:[],
          // projectId:'',
          warehouseUuid:'',
          warehouseName:'',
          customerUuid:'',
          customerName:'',
          wmsMerchantId:'',
          wmsMerchantName:'',
          // projectName:''
        },
        formRules: {
          // projectId: [{required: true, message: '请选择项目', trigger: 'change'}],
          warehouseUuid: [{required: true, message: '请选择仓库', trigger: 'change'}],
          wmsMerchantId: [{required: true, message: '请选择商户', trigger: 'change'}],
          customerUuid: [{required: true, message: '请选择云配商户', trigger: 'change'}]
        },
        warehouseList:[],
        partBInfo:[],
        merchantList:[]
      }
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      isCreate: {
        type: Boolean
      },
      bindInfo:{
        type:Object
      }
    },
    watch: {
      show(isShow) {
        this.isVisible = isShow
        if (isShow) {
          if (this.isCreate) {
            // this.$set(this.partAForm,'projectList',[])
            this.getWarehouse({orgUuid:''})
            this.getMerchantList({warehouseUuid:''})
            this.queryPartBInfo()
          } else {
              this.partAForm = JSON.parse(JSON.stringify(this.bindInfo))
              this.getWarehouse({orgUuid:''})
              this.getMerchantList({warehouseUuid:this.partAForm.warehouseUuid})
              this.queryPartBInfo()
            }
          }
      }
    },
    methods: {
      // projectChange(value){
      //   console.log("projectChange",value)
      //   // this.partAForm.projectId = this.partAForm.projectList[this.partAForm.projectList.length-1]
      //   this.partAForm.warehouseUuid = ''
      //   this.warehouseList = []
      //   this.merchantList = []
      //   this.partBInfo = []
      //   this.getWarehouse({orgUuid:''})
      // },
      //仓库列表
      async getWarehouse(params){
        await getWareHouseByOrg(params).then(res => {
          if(!res.error){
            this.warehouseList = res
          }
        })
      },
      warehouseChange(value){
        this.getMerchantList({warehouseUuid:value})
      },
      //根据仓库获取云配商户
      async queryPartBInfo(){
        await getMerchantsByAssembly({}).then(res => {
          if (!res.error && res.length > 0) {
            this.partBInfo = res
          }
        })
      },
      //根据仓库获取商户
      async getMerchantList(params) {
        this.merchantList = []
        await getAllMerchantsList(params).then(res => {
            this.merchantList = res
        })
      },
      save(){
        this.$refs.partAForm.validate((isValid, name) => {
          if(isValid){
            // this.partAForm.projectId = this.partAForm.projectList[this.partAForm.projectList.length-1]
            // this.partAForm.projectName = this.$store.getters.orgData.find(
            //         item => {
            //           return item.id == this.partAForm.projectId
            //         }
            //       ).orgName;
              this.partAForm.warehouseName = this.warehouseList.find(item => {
                return item.warehouseUuid == this.partAForm.warehouseUuid
              }).warehouseName
              this.partAForm.customerName = this.partBInfo.find(item => {
                return item.id == this.partAForm.customerUuid
              }).companyName
              this.partAForm.wmsMerchantName = this.merchantList.find(item => {
                return item.userUuid == this.partAForm.wmsMerchantId
              }).userName

              this.isSaving = true
            bindMerchant(this.partAForm).then(res => {
              this.isSaving = false
              if(!res.error){
                this.$message({
                  message:"绑定成功!",
                  type:"success",
                  duration:"2000"
                })
                this.cancel()
                this.$emit('updateTable')
              }
            })
         }
       })
     },
      cancel() {
        this.isSaving = false
        this.$refs.partAForm.resetFields()
        this.partAForm = {
          // projectList:[],
          // projectId:'',
          warehouseUuid:'',
          warehouseName:'',
          customerUuid:'',
          customerName:'',
          wmsMerchantId:'',
          wmsMerchantName:'',
          // projectName:''
        }
        this.$emit('update:show', false)
        this.isVisible = false
      },
    },
    components: {}
  }
</script>

<style lang="scss" scoped>
.el-divider--vertical {
  height: 120px !important;
  margin-top: 20px;
  margin-left:1rem;
}
</style>
