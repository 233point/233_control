<!--
 * @Description: In User Settings Edit
 * @Author: Calamus
 * @Date: 2019-08-13 14:35:59
 * @LastEditTime: 2019-08-22 18:05:13
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="login_container" id="login_container">
    <el-row class="approval">
      <el-popover
        placement="left"
        width="200"
        trigger="hover"
        content="点击查看审核日志"
        :disabled="
          !(merchantInfo.approvalList && merchantInfo.approvalList.length > 0)
        "
      >
        <el-button
          slot="reference"
          size="large"
          type="text"
          @click="authVisible = true"
          ><a-icon type="question-circle"
        /></el-button>
      </el-popover>
      <b>审核状态:</b>{{ approval ? approval : "暂无" }}
    </el-row>
    <el-row style="margin-bottom:1rem;text-align:center">
      <span style="font-size:16px"><b>商户类型:</b></span>
      <el-radio-group
        v-model="userType"
        @change="changeUserType"
        :disabled="!editable"
      >
        <el-radio label="1">个人</el-radio>
        <el-radio label="0">企业</el-radio>
      </el-radio-group>
    </el-row>
    <!-- 个人商户 -->
    <el-form
      v-show="userType == '1'"
      class="login-form"
      ref="loginForm1"
      :model="loginForm1"
      :rules="loginRules1"
      size="mini"
      label-position="top"
      validate-on-rule-change
    >
      <el-form-item prop="contact" label="联系人:">
        <el-input
          class="login-input"
          type="text"
          v-model="loginForm1.contact"
          placeholder="请输入联系人"
          maxlength="50"
          :disabled="!editable"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="phone" label="手机号码:">
        <el-input
          class="login-input"
          type="text"
          v-model.trim="loginForm1.phone"
          placeholder="请输入手机号码"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="cityCode" label="所在城市:">
        <el-cascader
          class="w100p"
          ref="cascader1"
          :options="cityOptions"
          v-model="loginForm1.cityCode"
          :props="cityProps"
        ></el-cascader>
      </el-form-item>
      <el-form-item prop="address" label="地址:">
        <el-input
          class="login-input"
          type="text"
          v-model="loginForm1.address"
          placeholder="请输入联系地址"
          maxlength="50"
          minlength="6"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="mail" label="邮箱:">
        <el-input
          class="login-input"
          type="text"
          v-model="loginForm1.mail"
          placeholder="请输入联系邮箱"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="numOfID" label="证件号码:">
        <el-input
          class="login-input"
          type="text"
          v-model="loginForm1.numOfID"
          placeholder="请输入证件号码"
          :disabled="!editable"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="picOfID" label="证件照片:">
        <div class="xhe_upload_container">
          <el-upload
            ref="picOfID"
            :before-upload="picOfIDChange"
            :on-change="picOfIDChange"
            :on-success="uploadSuccessPicOfID"
            :on-error="uploadError"
            :on-exceed="handleExceed"
            :on-remove="picOfIDRemove"
            :action="actionUrl"
            :multiple="false"
            :limit="1"
            accept="image/*,.pdf,.doc,.docx"
            :file-list="fileList3"
            :headers="myHeaders"
            :data="picOfIDData"
            :auto-upload="false"
            :disabled="!editable"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload('picOfID')"
              >上传</el-button
            >
            <div slot="tip" class="el-upload__tip">
              图片/pdf/word,且不超过1MB
            </div>
          </el-upload>
          <a
            v-if="fileType3 == 'file' && loginForm1.picOfID"
            :href="loginForm1.picOfID"
            >证件照片</a
          >
          <img
            v-if="fileType3 == 'img' && loginForm1.picOfID"
            :src="loginForm1.picOfID"
            @click="showImg(loginForm1.picOfID)"
            class="imgScan"
          />
        </div>
      </el-form-item>
      <el-form-item prop="managingGoods" label="经营货品:">
        <el-input
          class="login-input"
          type="textarea"
          v-model="loginForm1.managingGoods"
          placeholder="请输入经营货品，以逗号隔开"
          maxlength="50"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="logo" label="logo:">
        <div class="xhe_upload_container">
          <el-upload
            ref="uploadLogo1"
            :before-upload="logoCardChange1"
            :on-change="logoCardChange1"
            :on-success="uploadSuccessLogo1"
            :on-error="uploadError"
            :on-remove="logo1Remove"
            :on-exceed="handleExceed"
            :action="actionUrl"
            :multiple="false"
            :limit="1"
            accept="image/*"
            :file-list="fileList4"
            :headers="myHeaders"
            :data="logoData1"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取图片</el-button
            >
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload('uploadLogo1')"
              >上传</el-button
            >
            <div slot="tip" class="el-upload__tip">图片,且不超过1MB</div>
          </el-upload>
          <a
            v-if="fileType4 == 'file' && loginForm1.logo"
            :href="loginForm1.logo"
            >logo</a
          >
          <img
            v-if="fileType4 == 'img' && loginForm1.logo"
            :src="loginForm1.logo"
            @click="showImg(loginForm1.logo)"
            class="imgScan"
          />
        </div>
      </el-form-item>
      <el-form-item prop="haveFleet" label="是否有车队:">
        <el-radio-group v-model="loginForm1.haveFleet">
          <el-radio value="1" label="1">是</el-radio>
          <el-radio value="0" label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <div style="margin-top:8px;text-align:center;">
          <el-button
            class="login-button"
            type="primary"
            :loading="isLoginning"
            @click="signin('loginForm1')"
            >{{ !editable ? "提交修改" : "认证" }}</el-button
          >
          <el-button
            class="login-button"
            type="primary"
            :loading="isLoginning"
            @click="jumpAuth"
            >{{ !editable ? "取消" : "跳过" }}</el-button
          >
        </div>
      </el-form-item>
    </el-form>
    <!-- 企业商户 -->
    <el-form
      v-show="userType == '0'"
      class="login-form"
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules0"
      size="mini"
      label-position="top"
      validate-on-rule-change
    >
      <el-form-item prop="company" label="公司名称:">
        <el-input
          class="login-input"
          type="text"
          v-model="loginForm.company"
          placeholder="请输入公司名称"
          maxlength="50"
          minlength="1"
          :disabled="!editable"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="compBrif" label="公司简称:">
        <el-input
          class="login-input"
          type="text"
          v-model="loginForm.compBrif"
          placeholder="请输入公司简称"
          maxlength="25"
          minlength="1"
          :disabled="!editable"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="contact" label="联系人:">
        <el-input
          class="login-input"
          type="text"
          v-model="loginForm.contact"
          placeholder="请输入联系人"
          maxlength="50"
          :disabled="!editable"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="phone" label="联系电话:">
        <el-input
          class="login-input"
          type="text"
          v-model="loginForm.phone"
          placeholder="请输入联系电话"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="cityCode" label="所在城市:">
        <el-cascader
          class="w100p"
          ref="cascader"
          :options="cityOptions"
          v-model="loginForm.cityCode"
          :props="cityProps"
        ></el-cascader>
      </el-form-item>
      <el-form-item prop="address" label="地址:">
        <el-input
          class="login-input"
          type="text"
          v-model="loginForm.address"
          placeholder="请输入联系地址"
          maxlength="50"
          minlength="6"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="mail" label="邮箱:">
        <el-input
          class="login-input"
          type="text"
          v-model="loginForm.mail"
          placeholder="请输入联系邮箱"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        prop="unifiedSocialCCd"
        label="统一社会信用代码/营业执照注册号:"
      >
        <el-input
          class="login-input"
          type="text"
          v-model.trim="loginForm.unifiedSocialCCd"
          placeholder="请输入统一社会信用代码/营业执照注册号"
          :disabled="!editable"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="businessLicensePic" label="营业执照:">
        <div class="xhe_upload_container">
          <el-upload
            ref="businessLicensePic"
            :before-upload="idCardChange"
            :on-change="idCardChange"
            :on-success="uploadSuccessPic"
            :on-error="uploadError"
            :on-exceed="handleExceed"
            :on-remove="idCardRemove"
            :action="actionUrl"
            :multiple="false"
            :limit="1"
            accept="image/*,.pdf,.doc,.docx"
            :file-list="fileList1"
            :headers="myHeaders"
            :data="idCardData"
            :auto-upload="false"
            :disabled="!editable"
          >
            <el-button
              slot="trigger"
              size="small"
              type="primary"
              :disabled="!editable"
              >选取文件</el-button
            >
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload('businessLicensePic')"
              :disabled="!editable"
              >上传</el-button
            >
            <div slot="tip" class="el-upload__tip">
              图片/pdf/word,且不超过1MB
            </div>
          </el-upload>
          <a v-if="fileType1 == 'file'" :href="loginForm.businessLicensePic"
            >营业执照</a
          >
          <img
            v-if="fileType1 == 'img'"
            :src="loginForm.businessLicensePic"
            @click="showImg(loginForm.businessLicensePic)"
            class="imgScan"
          />
        </div>
      </el-form-item>

      <el-form-item prop="managingGoods" label="经营货品:">
        <el-input
          class="login-input"
          type="textarea"
          v-model="loginForm.managingGoods"
          placeholder="请输入经营货品，以逗号隔开"
          maxlength="50"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="logo" label="logo:">
        <div class="xhe_upload_container">
          <el-upload
            ref="uploadLogo"
            :before-upload="logoCardChange"
            :on-change="logoCardChange"
            :on-success="uploadSuccessLogo"
            :on-exceed="handleExceed"
            :on-error="uploadError"
            :on-remove="logoRemove"
            :action="actionUrl"
            :multiple="false"
            :limit="1"
            accept="image/*"
            :file-list="fileList2"
            :headers="myHeaders"
            :data="logoData"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取图片</el-button
            >
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload('uploadLogo')"
              >上传</el-button
            >
            <div slot="tip" class="el-upload__tip">图片,且不超过1MB</div>
          </el-upload>
          <a v-if="fileType2 == 'file'" :href="loginForm.logo">logo</a>
          <img
            v-if="fileType2 == 'img'"
            :src="loginForm.logo"
            @click="showImg(loginForm.logo)"
            class="imgScan"
          />
        </div>
      </el-form-item>
      <el-form-item prop="haveFleet" label="是否有车队:">
        <el-radio-group v-model="loginForm.haveFleet" :disabled="!editable">
          <el-radio value="1" label="1">是</el-radio>
          <el-radio value="0" label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <div style="margin-top:8px;text-align:center;">
          <el-button
            class="login-button"
            type="primary"
            :loading="isLoginning"
            @click="signin('loginForm')"
            >{{ !editable ? "提交修改" : "认证" }}</el-button
          >
          <el-button
            class="login-button"
            type="primary"
            :loading="isLoginning"
            @click="jumpAuth"
            >{{ !editable ? "取消" : "跳过" }}</el-button
          >
        </div>
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="showImgDialog" width="700px" append-to-body>
      <img :src="imgUrl" class="dialogImg" />
    </el-dialog>
    <a-drawer
      placement="right"
      :closable="true"
      @close="authVisible = false"
      :visible="authVisible"
      wrapClassName="xhe-header-menu"
      width="auto"
    >
      <div
        class="authLog"
        v-if="merchantInfo.approvalList && merchantInfo.approvalList.length > 0"
      >
        <a-timeline>
          <a-timeline-item
            v-for="(item, index) in merchantInfo.approvalList"
            :key="index"
          >
            <p class="time">{{ timeFormatter(item.date) }}</p>
            <p class="content">{{ item.result }}:{{ item.details }}</p>
          </a-timeline-item>
        </a-timeline>
      </div>
      <div v-else class="authLog tips">
        暂无审核信息
      </div>
    </a-drawer>
  </div>
</template>

<script>
import moment from "moment";
import { merchantCreate, merchantUpdate } from "@/api/user";
import Validator from "@/utils/extendValidate/extendValidate";
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth.js";
import { BASE_PER_FIX_URL } from "@/utils/baseUrlPerFix.js";
import cityTree from "@/assets/city_tree.json";
const token = getToken();
const provinceTree = cityTree.children;
export default {
  name: "merchantLogin",
  data() {
    return {
      cityOptions: provinceTree,
      cityProps: {
        value: "adcode",
        label: "name",
        children: "children"
      },
      approval: "暂无",
      userType: "0",
      isLoginning: false,
      editable: false,
      authVisible: false,
      myHeaders: { Authorization: token },
      actionUrl: BASE_PER_FIX_URL + "/oss/Upload",
      showImgDialog: false,
      imgUrl: "",
      idCardData: {
        fileEnName: "businessLicensePic",
        fileCnName: "营业执照扫描照片",
        fileType: "png,jpg,jpeg,bmp,gif,pdf,PDF,doc,docx"
      },
      logoData: {
        fileEnName: "logo",
        fileCnName: "logo",
        fileType: "png,jpg,jpeg,bmp,gif"
      },
      picOfIDData: {
        fileEnName: "picOfID",
        fileCnName: "证件照片",
        fileType: "png,jpg,jpeg,bmp,gif,pdf,PDF,doc,docx"
      },
      logoData1: {
        fileEnName: "logo1",
        fileCnName: "logo1",
        fileType: "png,jpg,jpeg,bmp,gif"
      },
      fileList1: [],
      fileList2: [],
      fileList3: [],
      fileList4: [],
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
        cityCode: [],
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
      //merchant
      loginRules0: {
        personType: [
          { required: true, message: "请选择商户类型", trigger: "change" }
        ],
        company: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          { min: 1, max: 50, message: "长度在 1 到 50 个字符", trigger: "blur" }
        ],
        compBrif: [
          { required: true, message: "请输入公司简称", trigger: "blur" },
          { min: 1, max: 25, message: "长度在 1 到 25 个字符", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入联系地址", trigger: "blur" },
          { min: 6, max: 50, message: "长度在 6 到 50 个字符", trigger: "blur" }
        ],
        contact: [{ required: true, message: "请输入联系人", trigger: "blur" }],
        phone: [
          {
            required: true,
            message: "请输入联系电话,座机或手机号",
            trigger: "blur"
          },
          { validator: Validator.isCellAndTel, trigger: "blur" }
        ],
        mail: [{ type: "email", message: "请输入正确的邮箱", trigger: "blur" }],
        cityCode: [
          { required: true, message: "请选择所在城市", trigger: "blur" }
        ],
        unifiedSocialCCd: [
          {
            required: true,
            message: "请输入统一社会信用代码/营业执照注册号",
            trigger: "blur"
          },
          { validator: Validator.isUnifiedSocialCCd, trigger: "blur" }
        ],
        businessLicensePic: [
          { required: true, message: "请上传营业执照扫描照片", trigger: "blur" }
        ]
      },
      //person
      loginRules1: {
        address: [
          { required: true, message: "请输入联系地址", trigger: "blur" },
          { min: 6, max: 50, message: "长度在 6 到 50 个字符", trigger: "blur" }
        ],
        contact: [{ required: true, message: "请输入联系人", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: Validator.cellPhone, trigger: "blur" }
        ],
        mail: [{ type: "email", message: "请输入正确的邮箱", trigger: "blur" }],
        picOfID: [
          { required: true, message: "请上传证件照片", trigger: "blur" }
        ],
        numOfID: [
          {
            required: true,
            message: "请输入有效的证件号码，身份证号或护照",
            trigger: "blur"
          },
          { validator: Validator.isIdCard, trigger: "change" }
        ],
        cityCode: [
          { required: true, message: "请选择所在城市", trigger: "blur" }
        ]
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
      console.log("editable", val);
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
            this.fileList1 = this.merchantInfo.businessLicensePic
              ? [
                  {
                    name: "营业执照扫描照片",
                    url: this.merchantInfo.businessLicensePic
                  }
                ]
              : [];
            let oFileType2 = this.getFileType(this.merchantInfo.logo);
            this.fileType2 =
              oFileType2 == "pdf" || oFileType2 == "pdf" || oFileType2 == "pdf"
                ? "file"
                : "img";
            this.fileList2 = this.merchantInfo.logo
              ? [{ name: "logo", url: this.merchantInfo.logo }]
              : [];
          } else {
            this.loginForm1 = Object.assign({}, this.merchantInfo);
            let oFileType3 = this.getFileType(this.merchantInfo.picOfID);
            this.fileType3 =
              oFileType3 == "pdf" || oFileType3 == "pdf" || oFileType3 == "pdf"
                ? "file"
                : "img";
            this.fileList3 = this.merchantInfo.picOfID
              ? [{ name: "证件照片", url: this.merchantInfo.picOfID }]
              : [];
            let oFileType4 = this.getFileType(this.merchantInfo.logo);
            this.fileType4 =
              oFileType4 == "pdf" || oFileType4 == "pdf" || oFileType4 == "pdf"
                ? "file"
                : "img";
            this.fileList4 = this.merchantInfo.logo
              ? [{ name: "logo", url: this.merchantInfo.logo }]
              : [];
          }
        }
      });
    });
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    jumpAuth() {
      this.$router.push("/dash");
    },
    showAuthDetail() {},
    changeUserType() {
      this.$nextTick(() => {
        this.$refs.loginForm.clearValidate();
        this.$refs.loginForm1.clearValidate();
      });
    },
    signin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.merchantLogin();
        } else {
          return false;
        }
      });
    },
    reset() {
      this.$refs.loginForm.resetFields();
      this.$refs.loginForm1.resetFields();
      this.fileList1 = [];
      this.fileList2 = [];
      this.fileList3 = [];
      this.fileList4 = [];
    },
    //获取文件格式
    getFileType(url) {
      let fileType = url.substring(url.lastIndexOf(".") + 1, url.length);
      return fileType;
    },
    merchantLogin() {
      this.isLoginning = true;
      let params =
        this.userType == 1
          ? JSON.parse(JSON.stringify(this.loginForm1))
          : JSON.parse(JSON.stringify(this.loginForm));
      params.account = this.userAccount;
      params.useruuid = this.userId;
      params.userType = this.userType;
      params.id = this.loginForm.id || this.loginForm1.id;
      if (this.userType == 1) {
        params.city =
          this.$refs.cascader1.getCheckedNodes() &&
          this.$refs.cascader1.getCheckedNodes().length > 0
            ? this.$refs.cascader1.getCheckedNodes()[0].pathLabels.join("")
            : "";
      } else {
        params.city =
          this.$refs.cascader.getCheckedNodes() &&
          this.$refs.cascader.getCheckedNodes().length > 0
            ? this.$refs.cascader.getCheckedNodes()[0].pathLabels.join("")
            : "";
      }
      // params.city = this.userType == 1?this.$refs.cascader1.getCheckedNodes()[0].pathLabels.join(''):this.$refs.cascader.getCheckedNodes()[0].pathLabels.join('')
      let message = this.editable
        ? "商户认证信息提交成功,请耐心等待审核结果"
        : "商户编辑成功";
      let url = params.id
        ? merchantUpdate
        : this.editable
        ? merchantCreate
        : merchantUpdate;
      url(params).then(res => {
        this.isLoginning = false;
        if (!res.error) {
          this.$message({
            message: message,
            type: "success"
          });
          setTimeout(() => {
            this.$router.push("/dash");
            this.$store.dispatch("getMerchantInfo");
          }, 500);
          this.reset();
        }
      });
    },
    timeFormatter(time) {
      if (time) {
        return moment(time).format("YYYY-MM-DD HH:mm:ss");
      } else {
        return "";
      }
    },
    //文件上传相关操作 TODO：封装组件
    uploadSuccess(res, prop, fileType) {
      if (res.head.code == 200 && res.head.success == "true") {
        this.$message({
          type: "success",
          message: "上传成功！"
        });
        let oFileType = this.getFileType(res.data.url);
        if (this.userType == "0") {
          this.loginForm[prop] = res.data.url;
        } else {
          this.loginForm1[prop] = res.data.url;
        }
        if (oFileType == "doc" || oFileType == "pdf" || oFileType == "docx") {
          switch (fileType) {
            case "fileType1":
              this.fileType1 = "file";
              break;
            case "fileType2":
              this.fileType2 = "file";
              break;
            case "fileType3":
              this.fileType3 = "file";
              break;
            case "fileType4":
              this.fileType4 = "file";
              break;
          }
        } else {
          switch (fileType) {
            case "fileType1":
              this.fileType1 = "img";
              break;
            case "fileType2":
              this.fileType2 = "img";
              break;
            case "fileType3":
              this.fileType3 = "img";
              break;
            case "fileType4":
              this.fileType4 = "img";
              break;
          }
        }
      } else if (res.head.code == 201 && res.head.success == "false") {
        this.$message({
          type: "warning",
          message: res.head.msg
        });
        if (res.data.Name == "businessLicensePic") {
          this.fileList1 = filelist.slice(-1);
        } else if (res.data.Name == "uploadLogo") {
          this.fileList2 = filelist.slice(-1);
        } else if (res.data.Name == "picOfID") {
          this.fileList3 = filelist.slice(-1);
        } else if (res.data.Name == "uploadLogo1") {
          this.fileList4 = filelist.slice(-1);
        }
      }
    },
    uploadError(err) {
      this.$message({
        type: "error",
        message: "上传失败！"
      });
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    //营业执照相关
    idCardChange(file, filelist) {
      let fileType = "";
      try {
        let fileName = file.name.split(".");
        fileType = fileName[fileName.length - 1];
      } catch (err) {
        fileType = "";
      }
      if (!fileType) {
        this.$message({
          type: "warning",
          message: "请选择正确的文件"
        });
        this.fileList1 = [];
        return false;
      }
      let imglist = [
        "png",
        "jpg",
        "jpeg",
        "bmp",
        "gif",
        "pdf",
        "PDF",
        "doc",
        "docx"
      ];
      // 进行图片匹配
      let result = imglist.some(item => {
        return item == fileType;
      });
      if (!result) {
        this.$message({
          type: "warning",
          message: "请选择正确的文件"
        });
        this.fileList1 = [];
        return false;
      }
      if (file.size / 1024 / 1024 > 1) {
        this.$message({
          type: "warning",
          message: "请选择小于1M的文件"
        });
        this.fileList1 = [];
        return false;
      }
    },
    uploadSuccessPic(res) {
      this.uploadSuccess(res, "businessLicensePic", "fileType1");
    },
    //logo
    logoCardChange(file, filelist) {
      let fileType = "";
      try {
        let fileName = file.name.split(".");
        fileType = fileName[fileName.length - 1];
      } catch (err) {
        fileType = "";
      }
      if (!fileType) {
        this.$message({
          type: "warning",
          message: "请选择正确的文件"
        });
        this.fileList2 = [];
        return false;
      }
      let imglist = ["png", "jpg", "jpeg", "bmp", "gif"];
      // 进行图片匹配
      let result = imglist.some(item => {
        return item == fileType;
      });
      if (!result) {
        this.$message({
          type: "warning",
          message: "请选择正确的文件"
        });
        this.fileList2 = [];
        return false;
      }
      if (file.size / 1024 / 1024 > 1) {
        this.$message({
          type: "warning",
          message: "请选择小于1M的文件"
        });
        this.fileList2 = [];
        return false;
      }
    },
    uploadSuccessLogo(res) {
      this.uploadSuccess(res, "logo", "fileType2");
    },
    //个人证件照
    picOfIDChange(file, filelist) {
      let fileType = "";
      try {
        let fileName = file.name.split(".");
        fileType = fileName[fileName.length - 1];
      } catch (err) {
        fileType = "";
      }
      if (!fileType) {
        this.$message({
          type: "warning",
          message: "请选择正确的文件"
        });
        this.fileList1 = [];
        return false;
      }
      let imglist = [
        "png",
        "jpg",
        "jpeg",
        "bmp",
        "gif",
        "pdf",
        "PDF",
        "doc",
        "docx"
      ];
      // 进行图片匹配
      let result = imglist.some(item => {
        return item == fileType;
      });
      if (!result) {
        this.$message({
          type: "warning",
          message: "请选择正确的文件"
        });
        this.fileList1 = [];
        return false;
      }
      if (file.size / 1024 / 1024 > 1) {
        this.$message({
          type: "warning",
          message: "请选择小于1M的文件"
        });
        this.fileList1 = [];
        return false;
      }
    },
    uploadSuccessPicOfID(res) {
      this.uploadSuccess(res, "picOfID", "fileType3");
    },
    //个人logo
    logoCardChange1(file, filelist) {
      let fileType = "";
      try {
        let fileName = file.name.split(".");
        fileType = fileName[fileName.length - 1];
      } catch (err) {
        fileType = "";
      }
      if (!fileType) {
        this.$message({
          type: "warning",
          message: "请选择正确的文件"
        });
        this.fileList3 = [];
        return false;
      }
      let imglist = ["png", "jpg", "jpeg", "bmp", "gif"];
      // 进行图片匹配
      let result = imglist.some(item => {
        return item == fileType;
      });
      if (!result) {
        this.$message({
          type: "warning",
          message: "请选择正确的文件"
        });
        this.fileList3 = [];
        return false;
      }
      if (file.size / 1024 / 1024 > 1) {
        this.$message({
          type: "warning",
          message: "请选择小于1M的文件"
        });
        this.fileList3 = [];
        return false;
      }
    },
    uploadSuccessLogo1(res) {
      this.uploadSuccess(res, "logo", "fileType4");
    },
    idCardRemove() {
      this.loginForm.businessLicensePic = "";
      this.fileType1 = "";
    },
    logoRemove() {
      this.loginForm.logo = "";
      this.fileType2 = "";
    },
    picOfIDRemove() {
      this.loginForm1.businessLicensePic = "";
      this.fileType3 = "";
    },
    logo1Remove() {
      this.loginForm1.logo = "";
      this.fileType4 = "";
    },
    showImg(url) {
      this.showImgDialog = true;
      this.imgUrl = url;
    },
    submitUpload(type) {
      this.$refs[type].submit();
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
  color: darken($base-light-color, 15%);
}
</style>
