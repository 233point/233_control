<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 15:39:25
 * @LastEditTime: 2019-09-03 10:20:21
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <el-row style="margin-bottom:1rem;text-align:center">
      <span style="font-size:16px"><b>商户类型:</b></span>
      <span>{{
        userType == "1" ? "个人" : userType == 0 ? "企业" : "未知"
      }}</span>
    </el-row>
    <!-- 个人商户 -->
    <el-form
      v-show="userType == '1'"
      class="login-form"
      ref="loginForm1"
      :model="loginForm1"
      size="mini"
      label-width="240px"
      label-position="right"
    >
      <el-form-item prop="contact" label="联系人:">
        <span>{{ loginForm1.contact }}</span>
      </el-form-item>
      <el-form-item prop="phone" label="电话:">
        <span>{{ loginForm1.phone }}</span>
      </el-form-item>
      <el-form-item prop="address" label="地址:">
        <span>{{ loginForm1.address }}</span>
      </el-form-item>
      <el-form-item prop="mail" label="邮箱:">
        <span>{{ loginForm1.mail }}</span>
      </el-form-item>
      <el-form-item prop="numOfID" label="证件号码:">
        <span>{{ loginForm1.numOfID }}</span>
      </el-form-item>
      <el-form-item prop="picOfID" label="证件照片:">
        <span>{{ loginForm1.picOfID }}</span>
        <a
          v-if="fileType3 == 'file' && loginForm1.picOfID"
          :href="loginForm1.picOfID"
          >证件照片</a
        >
        <img
          v-else-if="fileType3 == 'img' && loginForm1.picOfID"
          :src="loginForm1.picOfID"
          @click="showImg(loginForm1.picOfID)"
          class="imgScan"
        />
      </el-form-item>
      <el-form-item prop="city" label="所在城市:">
        <span>{{ loginForm1.city }}</span>
      </el-form-item>
      <el-form-item prop="managingGoods" label="经营货品:">
        <span>{{ loginForm1.managingGoods }}</span>
      </el-form-item>
      <el-form-item prop="logo" label="logo">
        <a v-if="fileType4 == 'file' && loginForm1.logo" :href="loginForm1.logo"
          >logo</a
        >
        <img
          v-else-if="fileType4 == 'img' && loginForm1.logo"
          :src="loginForm1.logo"
          @click="showImg(loginForm1.logo)"
          class="imgScan"
        />
      </el-form-item>
      <el-form-item prop="haveFleet" label="是否有车队:">
        <span>{{
          loginForm.haveFleet == "1"
            ? "是"
            : loginForm.haveFleet == "0"
            ? "否"
            : "未知"
        }}</span>
      </el-form-item>
    </el-form>
    <!-- 企业商户 -->
    <el-form
      v-show="userType == '0'"
      class="login-form"
      ref="loginForm"
      :model="loginForm"
      size="mini"
      label-width="240px"
      label-position="right"
    >
      <el-form-item prop="company" label="公司名称:">
        <span>{{ loginForm.company }}</span>
      </el-form-item>
      <el-form-item prop="compBrif" label="公司简称:">
        <span>{{ loginForm.compBrif }}</span>
      </el-form-item>
      <el-form-item prop="contact" label="联系人:">
        <span>{{ loginForm.contact }}</span>
      </el-form-item>
      <el-form-item prop="phone" label="电话:">
        <span>{{ loginForm.phone }}</span>
      </el-form-item>
      <el-form-item prop="address" label="地址:">
        <span>{{ loginForm.address }}</span>
      </el-form-item>
      <el-form-item prop="mail" label="邮箱:">
        <span>{{ loginForm.mail }}</span>
      </el-form-item>
      <el-form-item
        prop="unifiedSocialCCd"
        label="统一社会信用代码/营业执照注册号:"
      >
        <span>{{ loginForm.unifiedSocialCCd }}</span>
      </el-form-item>
      <el-form-item prop="businessLicensePic" label="营业执照:">
        <a
          v-if="fileType1 == 'file' && loginForm.businessLicensePic"
          :href="loginForm.businessLicensePic"
          >营业执照</a
        >
        <img
          v-else-if="fileType1 == 'img' && loginForm.businessLicensePic"
          :src="loginForm.businessLicensePic"
          @click="showImg(loginForm.businessLicensePic)"
          class="imgScan"
        />
      </el-form-item>
      <el-form-item prop="city" label="所在城市:">
        <span>{{ loginForm.city }}</span>
      </el-form-item>
      <el-form-item prop="managingGoods" label="经营货品:">
        <span>{{ loginForm.managingGoods }}</span>
      </el-form-item>
      <el-form-item prop="logo" label="logo">
        <a
          v-if="fileType2 == 'file' && loginForm.businessLicensePic"
          :href="loginForm.logo"
          >logo</a
        >
        <img
          v-else-if="fileType2 == 'img' && loginForm.businessLicensePic"
          :src="loginForm.logo"
          @click="showImg(loginForm.logo)"
          class="imgScan"
        />
      </el-form-item>
      <el-form-item prop="haveFleet" label="是否有车队:">
        <span>{{
          loginForm.haveFleet == "1"
            ? "是"
            : loginForm.haveFleet == "0"
            ? "否"
            : "未知"
        }}</span>
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="showImgDialog" width="700px" append-to-body>
      <img :src="imgUrl" class="dialogImg" />
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import { merchantCreate, merchantUpdate } from "@/api/user";
import Validator from "@/utils/extendValidate/extendValidate";
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth.js";
import { BASE_PER_FIX_URL } from "@/utils/baseUrlPerFix.js";

const token = getToken();

export default {
  name: "merchantLogin",
  data() {
    return {
      approval: "暂无",
      userType: "0",
      isLoginning: false,
      editable: false,
      authVisible: false,
      myHeaders: { Authorization: token },
      actionUrl: BASE_PER_FIX_URL + "/oss/Upload",
      showImgDialog: false,
      imgUrl: "",
      fileType1: "",
      fileType2: "",
      fileType3: "",
      fileType4: "",
      loginForm: {
        account: "",
        userType: "0",
        company: "",
        compBrif: "",
        contact: "",
        phone: "",
        address: "",
        mail: "",
        unifiedSocialCCd: "",
        businessLicensePic: "",
        managingGoods: "",
        city: "",
        haveFleet: "1",
        logo: ""
      },
      //person
      loginForm1: {
        account: "",
        contact: "",
        phone: "",
        address: "",
        mail: "",
        numOfID: "",
        picOfID: "",
        managingGoods: "",
        city: "",
        haveFleet: "1",
        logo: ""
      },
      merchantInfo: {}
    };
  },
  computed: {
    ...mapGetters(["userAccount", "roleType", "userId"])
  },
  props: {
    edit: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    edit(val) {
      this.editable = val;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.editable = this.edit;
      this.$store.dispatch("getMerchantInfo").then(merchantInfo => {
        this.merchantInfo = Object.assign({}, merchantInfo);
        if (this.merchantInfo && this.merchantInfo.id) {
          this.approval = this.merchantInfo.approval;
          this.userType = this.merchantInfo.userType;
          if (this.userType == 0) {
            this.loginForm = Object.assign({}, this.merchantInfo);
            let oFileType1 = this.getFileType(
              this.merchantInfo.businessLicensePic
            );
            this.fileType1 =
              oFileType1 == "pdf" || oFileType1 == "pdf" || oFileType1 == "pdf"
                ? "file"
                : "img";
            let oFileType2 = this.getFileType(this.merchantInfo.logo);
            this.fileType2 =
              oFileType2 == "pdf" || oFileType2 == "pdf" || oFileType2 == "pdf"
                ? "file"
                : "img";
          } else {
            this.loginForm1 = Object.assign({}, this.merchantInfo);
            let oFileType3 = this.getFileType(this.merchantInfo.picOfID);
            this.fileType3 =
              oFileType3 == "pdf" || oFileType3 == "pdf" || oFileType3 == "pdf"
                ? "file"
                : "img";
            let oFileType4 = this.getFileType(this.merchantInfo.logo);
            this.fileType4 =
              oFileType4 == "pdf" || oFileType4 == "pdf" || oFileType4 == "pdf"
                ? "file"
                : "img";
          }
        }
      });
    });
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    //获取文件格式
    getFileType(url) {
      let fileType = url.substring(url.lastIndexOf(".") + 1, url.length);
      return fileType;
    },
    timeFormatter(time) {
      if (time) {
        return moment(time).format("YYYY-MM-DD HH:mm:ss");
      } else {
        return "";
      }
    },
    showImg(url) {
      this.showImgDialog = true;
      this.imgUrl = url;
    }
  }
};
</script>

<style lang="scss" scoped>
.login_container {
  width: 50%;
  margin: 2rem auto 0 25%;
  padding: 25px 15px 25px 15px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.15);
  .approval {
    width: 100%;
    text-align: center;
    font-size: 16px;
    margin-bottom: 1rem;
  }
}
.imgScan {
  width: 180px;
  margin-top: 10px;
}
.dialogImg {
  width: 650px;
}
.xhe_upload_container {
  margin-top: 0.5rem;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}
.authLog {
  padding: 2rem 5rem 3rem 3rem;
}
.authLog.tips {
  font-size: 2rem;
  color: #f2f2f2;
}
</style>
