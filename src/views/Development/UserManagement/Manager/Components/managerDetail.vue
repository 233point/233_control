<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-08 11:56:42
 * @LastEditTime: 2019-08-19 16:24:16
 * @LastEditors: Please set LastEditors
 -->

<template>
  <el-dialog width="600px"
             title="配装经理详情"
             :visible.sync="isVisible"
             :close-on-click-modal="false"
             :close-on-press-escape="false"
             @close="cancel">
    <el-form ref="sysForm"
             size="small"
             :model="sysForm"
             label-width="120px">
      <el-form-item prop="account"
                    label="账号">
                  <span>{{sysForm.account}}</span>
        </el-input>
      </el-form-item>
      <el-form-item prop="realName"
                    label="姓名">
                    <span>{{sysForm.realName}}</span>
      </el-form-item>
      <el-form-item prop="phone"
                    label="电话">
                    <span>{{sysForm.phone}}</span>
      </el-form-item>
      <el-form-item prop="numOfID"
                    label="身份证号">
                    <span>{{sysForm.numOfID}}</span>
      </el-form-item>
      <el-form-item prop="haveOrg"
                    label="员工关系">
                    <span>{{sysForm.haveOrg == '0' ? '雇佣' : '非雇佣'}}</span>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import Validator from '@/utils/extendValidate/extendValidate';
import store from '@/store';

// api
import { addServicepersonal, updateServicepersonal } from '@/api/user';
import { mapGetters } from 'vuex';
import { checkUniqueAccount } from '@/api/common';
import { getToken } from '@/utils/auth.js';
import { BASE_PER_FIX_URL } from '@/utils/baseUrlPerFix.js';
const token = getToken();

//
const initsyssForm = {
  userId:'',
  roleType:'',
  type: '2', // 0 司机  1安装工  2配装经理（只有服务商可以选择这个）
  account: '',
  haveOrg:'0',
  phone: '',
  realName: '',
};

export default {
  name: 'sysUpdate',
  data() {
    return {
      isVisible: false,
      sysForm: Object.assign({}, initsyssForm),
    };
  },
  computed: {
    ...mapGetters(['roleType','userId']),
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    sysData: {
      type: Object,
    },
  },
  watch: {
    show(isShow) {
      if (isShow) {
          this.sysForm = Object.assign({}, this.sysData);
      }
      //
      this.isVisible = isShow;
    },
  },
  methods: {
    cancel() {
      this.sysForm = Object.assign({}, initsyssForm);
      this.$refs.sysForm.resetFields();
      this.$emit('update:show', false);
      this.$emit('update:sysData', Object.create(null));
      this.isVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.imgScan{
  width:300px;
}
.dialogImg{
  width:560px;
}
</style>
