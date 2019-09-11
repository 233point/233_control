<template>
  <el-dialog
    width="600px"
    :title="(isCreate ? '新增' : '编辑') + '商户'"
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancel"
  >
    <el-form
      ref="sysForm"
      :rules="loginForm.userType == 0 ? loginRules0 : loginRules1"
      :model="sysForm"
      size="small"
      validate-on-rule-change
      label-width="240px"
    >
      <el-form-item prop="userType" label="商户类型">
        <el-radio-group v-model="sysForm.userType">
          <el-radio label="1">个人</el-radio>
          <el-radio label="0">企业</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="company" label="公司名称">
        <el-input
          class="login-input"
          type="text"
          v-model="sysForm.company"
          placeholder="请输入公司名称"
          maxlength="50"
          minlength="6"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="compBrif" label="公司简称">
        <el-input
          class="login-input"
          type="text"
          v-model="sysForm.compBrif"
          placeholder="请输入公司简称"
          maxlength="25"
          minlength="3"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="contact" label="联系人">
        <el-input
          class="login-input"
          type="text"
          v-model="sysForm.contact"
          placeholder="请输入联系人"
          maxlength="50"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="phone" label="电话">
        <el-input
          class="login-input"
          type="text"
          v-model="sysForm.phone"
          placeholder="请输入联系电话"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="address" label="地址">
        <el-input
          class="login-input"
          type="text"
          v-model="sysForm.address"
          placeholder="请输入联系地址"
          maxlength="50"
          minlength="6"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="mail" label="邮箱">
        <el-input
          class="login-input"
          type="text"
          v-model="sysForm.mail"
          placeholder="请输入联系邮箱"
        >
        </el-input>
      </el-form-item>
      <el-form-item
        prop="unifiedSocialCCd"
        :label="
          loginForm.userType == 0
            ? '统一社会信用代码/营业执照注册号'
            : '证件号码'
        "
      >
        <el-input
          class="login-input"
          type="text"
          v-model="sysForm.unifiedSocialCCd"
          :placeholder="
            loginForm.userType == 0
              ? '请输入统一社会信用代码/营业执照注册号'
              : '证件号码'
          "
        >
        </el-input>
      </el-form-item>
      <el-form-item
        prop="businessLicensePic"
        :label="loginForm.userType == 0 ? '营业执照扫描照片' : '证件照片'"
      >
        <el-upload
          ref="businessLicensePic"
          :before-upload="idCardChange"
          :on-change="idCardChange"
          :on-success="uploadSuccessPic"
          :on-error="uploadError"
          :on-remove="idCardRemove"
          :action="actionUrl"
          :multiple="false"
          :limit="1"
          accept="image/*,.pdf,.doc,.docx"
          :file-list="fileList3"
          :headers="myHeaders"
          :data="idCardData"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
          >
          <el-button
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload('businessLicensePic')"
            >上传</el-button
          >
          <div slot="tip" class="el-upload__tip">图片,且不超过1MB</div>
        </el-upload>
        <img
          :src="loginForm.businessLicensePic"
          @click="showImg(loginForm.businessLicensePic)"
          class="imgScan"
        />
      </el-form-item>
      <el-form-item prop="hfDeliveryPoint" label="常用提货点">
        <el-input
          class="login-input"
          type="text"
          v-model="sysForm.hfDeliveryPoint"
          placeholder="请输入常用提货点"
          maxlength="50"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="dContact" label="提货联系人">
        <el-input
          class="login-input"
          type="text"
          v-model="sysForm.dContact"
          placeholder="请输入提货联系人"
          maxlength="50"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="dPhone" label="提货联系人电话">
        <el-input
          class="login-input"
          type="text"
          v-model="sysForm.dPhone"
          placeholder="请输入提货联系人电话"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="dAddress" label="提货地址">
        <el-input
          class="login-input"
          type="text"
          v-model="sysForm.dAddress"
          placeholder="请输入提货联系人电话"
          maxlength="50"
          minlength="6"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="managingGoods" label="经营货品">
        <el-input
          class="login-input"
          type="textarea"
          v-model="sysForm.managingGoods"
          placeholder="请输入经营货品，以逗号隔开"
          maxlength="50"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="city" label="所在城市">
        <el-input
          class="login-input"
          type="text"
          v-model="sysForm.city"
          placeholder="请输入所在城市"
          maxlength="25"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="logo" label="logo">
        <!-- <el-input class="login-input"
                  type="text"
                  v-model="sysForm.logo"
                  placeholder="请输入logo链接"
                  >
        </el-input> -->
        <el-upload
          ref="uploadLogo"
          :before-upload="logoCardChange"
          :on-change="logoCardChange"
          :on-success="uploadSuccessLogo"
          :on-error="uploadError"
          :on-remove="logoRemove"
          :action="actionUrl"
          :multiple="false"
          :limit="1"
          accept="image/*"
          :file-list="fileList1"
          :headers="myHeaders"
          :data="logoData"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
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
        <img
          :src="loginForm.logo"
          @click="showImg(loginForm.logo)"
          class="imgScan"
        />
      </el-form-item>
      <el-form-item prop="haveFleet" label="是否有车队">
        <el-radio-group v-model="sysForm.haveFleet">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item v-if="sysForm.haveFleet == 1" prop="carrier" label="车队">
        <el-input class="login-input"
                  type="textarea"
                  v-model="sysForm.carrier"
                  placeholder="请输入车队，以逗号隔开"
                  >
        </el-input>
      </el-form-item> -->
      <el-row>
        <el-col :span="6" :offset="18">
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog :visible.sync="showImgDialog" width="700px" append-to-body>
      <img :src="imgUrl" class="dialogImg" />
    </el-dialog>
  </el-dialog>
</template>
<script>
import Validator from "@/utils/extendValidate/extendValidate";
import store from "@/store";

// api
import { merchantCreate, merchantUpdate } from "@/api/user";
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth.js";
import { BASE_PER_FIX_URL } from "@/utils/baseUrlPerFix.js";
const token = getToken();

//
const initsyssForm = {
  account: "",
  userType: null,
  userType: "",
  company: "0",
  compBrif: "",
  contact: "",
  phone: "",
  address: "",
  mail: "",
  unifiedSocialCCd: "",
  businessLicensePic: "",
  hfDeliveryPoint: "",
  dContact: "",
  dPhone: "",
  dAddress: "",
  managingGoods: "",
  city: "",
  haveFleet: "1",
  logo: ""
  // carrier: null,
};

export default {
  name: "sysUpdate",
  data() {
    return {
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
      fileList1: [],
      fileList2: [],
      fileList3: [],
      fileList4: [],
      isVisible: false,
      sysForm: Object.assign({}, initsyssForm),
      //merchant
      loginRules0: {
        personType: [
          { required: true, message: "请选择商户类型", trigger: "change" }
        ],
        company: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          { min: 6, max: 50, message: "长度在 6 到 50 个字符", trigger: "blur" }
        ],
        compBrif: [
          { required: true, message: "请输入公司简称", trigger: "blur" },
          { min: 3, max: 25, message: "长度在 3 到 25 个字符", trigger: "blur" }
        ],
        address: [
          { min: 6, max: 50, message: "长度在 6 到 50 个字符", trigger: "blur" }
        ],
        dAddress: [
          { min: 6, max: 50, message: "长度在 6 到 50 个字符", trigger: "blur" }
        ],
        contact: [{ required: true, message: "请输入联系人", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { validator: Validator.cellPhone, trigger: "blur" }
        ],
        mail: [
          {
            required: true,
            type: "email",
            message: "请输入联系邮箱",
            trigger: "blur"
          }
        ],
        city: [{ required: true, message: "请输入所在城市", trigger: "blur" }],
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
        personType: [
          { required: true, message: "请选择商户类型", trigger: "change" }
        ],
        company: [
          { required: true, message: "请输入公司名称", trigger: "blur" },
          { min: 6, max: 50, message: "长度在 6 到 50 个字符", trigger: "blur" }
        ],
        compBrif: [
          { required: true, message: "请输入公司简称", trigger: "blur" },
          { min: 3, max: 25, message: "长度在 3 到 25 个字符", trigger: "blur" }
        ],
        address: [
          { min: 6, max: 50, message: "长度在 6 到 50 个字符", trigger: "blur" }
        ],
        dAddress: [
          { min: 6, max: 50, message: "长度在 6 到 50 个字符", trigger: "blur" }
        ],
        contact: [{ required: true, message: "请输入联系人", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入联系电话", trigger: "blur" },
          { validator: Validator.cellPhone, trigger: "blur" }
        ],
        mail: [
          {
            required: true,
            type: "email",
            message: "请输入联系邮箱",
            trigger: "blur"
          }
        ],
        businessLicensePic: [
          { required: true, message: "请上传营业执照扫描照片", trigger: "blur" }
        ],
        city: [{ required: true, message: "请输入所在城市", trigger: "blur" }],
        unifiedSocialCCd: [
          { required: true, message: "请输入证件号码", trigger: "blur" },
          { validator: Validator.isIdCard, trigger: "change" }
        ]
      }
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    sysData: {
      type: Object
    },
    isCreate: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    show(isShow) {
      if (isShow) {
        if (this.isCreate) {
          this.sysForm = Object.assign({}, initsyssForm);
        } else {
          this.sysForm = Object.assign({}, this.sysData);
        }
      }
      //
      this.isVisible = isShow;
    }
  },
  methods: {
    save() {
      this.$refs.sysForm.validate(isValid => {
        if (isValid) {
          const params = Object.assign({}, this.sysForm);
          const submitType = this.isCreate ? merchantCreate : merchantUpdate;
          const submitText = this.isCreate ? "新增" : "编辑";
          submitType(params).then(res => {
            this.$message({
              message: `${submitText}成功!`,
              type: "success"
            });
            this.cancel();
            this.$emit("updateList");
            store.dispatch("getSysList");
          });
        }
      });
    },
    cancel() {
      this.sysForm = Object.assign({}, initsyssForm);
      this.$refs.sysForm.resetFields();
      this.$emit("update:show", false);
      this.$emit("update:sysData", Object.create(null));
      this.isVisible = false;
      this.imgUrl = false;
      this.fileList1 = [];
      this.fileList3 = [];
    },
    //文件上传相关操作 TODO：封装组件
    uploadSuccess(res, prop) {
      if (res.head.code == 200 && res.head.success == "true") {
        this.$message({
          type: "success",
          message: "上传成功！"
        });
        this.loginForm[prop] = res.data.url;
      } else if (res.head.code == 201 && res.head.success == "false") {
        this.$message({
          type: "warning",
          message: res.head.msg
        });
        if (res.data.Name == "businessLicensePic") {
          this.fileList1 = filelist.slice(-1);
        } else if (res.data.Name == "logo") {
          this.fileList3 = filelist.slice(-1);
        }
      }
    },
    uploadError(err) {
      this.$message({
        type: "error",
        message: "上传失败！"
      });
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
        this.fileList3 = [];
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
    uploadSuccessPic(res) {
      this.uploadSuccess(res, "businessLicensePic");
    },
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
        this.fileList1 = [];
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
    uploadSuccessLogo(res) {
      this.uploadSuccess(res, "logo");
    },
    idCardRemove() {
      this.loginForm.businessLicensePic = "";
    },
    logoRemove() {
      this.loginForm.logo = "";
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
