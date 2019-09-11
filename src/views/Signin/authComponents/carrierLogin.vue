<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-02 14:00:02
 * @LastEditTime: 2019-09-03 11:08:38
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
    <!-- 服务商 -->
    <el-form
      class="login-form"
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
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
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="phone" label="电话:">
        <el-input
          class="login-input"
          type="text"
          v-model="loginForm.phone"
          placeholder="请输入联系电话"
        >
        </el-input>
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
        label="统一社会信用代码/营业执照注册号"
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
      <el-form-item prop="businessLicensePic" label="营业执照">
        <div class="xhe_upload_container">
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
          <a
            v-if="fileType1 == 'file' && loginForm.businessLicensePic"
            :href="loginForm.businessLicensePic"
            >营业执照扫描照片</a
          >
          <img
            v-if="fileType1 == 'img' && loginForm.businessLicensePic"
            :src="loginForm.businessLicensePic"
            @click="showImg(loginForm.businessLicensePic)"
            class="imgScan"
          />
        </div>
      </el-form-item>
      <el-form-item prop="roadTrafficPermit" label="道路交通运输许可证">
        <div class="xhe_upload_container">
          <el-upload
            ref="roadTrafficPermit"
            :before-upload="roadTrafficPermitChange"
            :on-change="roadTrafficPermitChange"
            :on-success="uploadSuccessroadTrafficPermit"
            :on-error="uploadError"
            :on-remove="roadTrafficPermitRemove"
            :action="actionUrl"
            :multiple="false"
            :limit="1"
            accept="image/*,.pdf,.doc,.docx"
            :file-list="fileList4"
            :headers="myHeaders"
            :data="roadTrafficPermitData"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload('roadTrafficPermit')"
              >上传</el-button
            >
            <div slot="tip" class="el-upload__tip">
              图片/pdf/word,且不超过1MB
            </div>
          </el-upload>
          <a
            v-if="fileType4 == 'file' && loginForm.roadTrafficPermit"
            :href="loginForm.roadTrafficPermit"
            >道路交通运输许可证</a
          >
          <img
            v-if="fileType4 == 'img' && loginForm.roadTrafficPermit"
            :src="loginForm.roadTrafficPermit"
            @click="showImg(loginForm.roadTrafficPermit)"
            class="imgScan"
          />
        </div>
      </el-form-item>
      <el-form-item prop="businessType" label="业务类型:">
        <el-select
          class="w100p"
          v-model="loginForm.businessType"
          placeholder="请选择业务类型"
        >
          <el-option label="整车" value="整车"></el-option>
          <el-option label="零担" value="零担"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="transportMode" label="运输模式:">
        <el-select
          class="w100p"
          v-model="loginForm.transportMode"
          placeholder="请选择业务类型"
        >
          <el-option label="干线" value="干线"></el-option>
          <el-option label="城配" value="城配"></el-option>
          <el-option label="支线" value="支线"></el-option>
        </el-select>
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
      <el-form-item prop="scopeOfTransport" label="服务区域:">
        <span class="areaList">{{
          loginForm.scopeOfTransport.join(",") || ""
        }}</span>
        <div class="scopeOfTransport">
          <div v-for="(item, index) in scopeOfTransport" :key="index">
            <span class="label">{{ item[0] }}</span>
            <span
              class="area"
              :class="item2.choose ? 'choose' : ''"
              v-for="(item2, index2) in item[1]"
              :key="index2"
              @click="chooseScope(item2, index, index2)"
            >
              {{ item2.name }}
            </span>
          </div>
        </div>
      </el-form-item>
      <el-form-item prop="industry" label="所属行业:">
        <el-select
          class="w100p"
          v-model="loginForm.industry"
          placeholder="请选择所属行业"
        >
          <el-option label="家居" value="家居"></el-option>
          <el-option label="建材" value="建材"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="logo" label="logo">
        <div class="xhe_upload_container">
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
          <a v-if="fileType2 == 'file' && loginForm.logo" :href="loginForm.logo"
            >logo</a
          >
          <img
            v-if="fileType2 == 'img' && loginForm.logo"
            :src="loginForm.logo"
            @click="showImg(loginForm.logo)"
            class="imgScan"
          />
        </div>
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
import {
  merchantCreate,
  merchantUpdate,
  carriers,
  carriersUpdate
} from "@/api/user";
import Validator from "@/utils/extendValidate/extendValidate";
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth.js";
import { BASE_PER_FIX_URL } from "@/utils/baseUrlPerFix.js";
import cityTree from "@/assets/city_tree.json";
const provinceTree = cityTree.children;
const token = getToken();

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
      roadTrafficPermitData: {
        fileEnName: "roadTrafficPermit",
        fileCnName: "道路交通运输许可证",
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
        logo: "",
        roadTrafficPermit: "",
        businessType: "",
        transportMode: "",
        scopeOfTransport: [],
        industry: ""
      },
      loginRules: {
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
        ],
        // roadTrafficPermit:[
        //   { required: true, message: '请上传道路交通用运输许可证扫描照片', trigger: 'blur' },
        // ],
        // businessType:[
        //   { required: true, message: '请选择业务类型', trigger: 'blur' },
        // ],
        // transportMode:[
        //   { required: true, message: '请选择运输模式', trigger: 'blur' },
        // ],
        scopeOfTransport: [
          { required: true, message: "请选择服务区域", trigger: "blur" }
        ]
        // industry:[
        //   { required: true, message: '请选择所属行业', trigger: 'blur' },
        // ],
      },
      merchantInfo: {},
      scopeOfTransport: [
        [
          "华东",
          [
            { name: "安徽省", choose: false },
            { name: "福建省", choose: false },
            { name: "江西省", choose: false },
            { name: "江苏省", choose: false },
            { name: "山东省", choose: false },
            { name: "上海市", choose: false },
            { name: "浙江省", choose: false }
          ]
        ],
        [
          "华南",
          [
            { name: "广东省", choose: false },
            { name: "广西壮族自治区", choose: false },
            { name: "海南省", choose: false }
          ]
        ],
        [
          "华中",
          [
            { name: "河南省", choose: false },
            { name: "湖北省", choose: false },
            { name: "湖南省", choose: false }
          ]
        ],
        [
          "华北",
          [
            { name: "北京市", choose: false },
            { name: "天津市", choose: false },
            { name: "河北区", choose: false },
            { name: "山西省", choose: false },
            { name: "内蒙古自治区", choose: false }
          ]
        ],
        [
          "东北",
          [
            { name: "辽宁省", choose: false },
            { name: "吉林省", choose: false },
            { name: "黑龙江省", choose: false }
          ]
        ],
        [
          "西北",
          [
            { name: "陕西省", choose: false },
            { name: "甘肃省", choose: false },
            { name: "青海省", choose: false },
            { name: "宁夏回族自治区", choose: false },
            { name: "新疆维吾尔自治区", choose: false }
          ]
        ],
        [
          "西南",
          [
            { name: "重庆市", choose: false },
            { name: "四川省", choose: false },
            { name: "贵州省", choose: false },
            { name: "云南省", choose: false },
            { name: "西藏自治区", choose: false }
          ]
        ],
        [
          "港澳台",
          [
            { name: "香港特别行政区", choose: false },
            { name: "澳门特别行政区", choose: false }
          ]
        ]
      ]
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
      this.$store
        .dispatch("getMerchantInfo", this.roleType)
        .then(merchantInfo => {
          this.merchantInfo = Object.assign({}, merchantInfo);
          if (this.merchantInfo && this.merchantInfo.id) {
            this.approval = this.merchantInfo.approval;
            this.loginForm = Object.assign({}, this.merchantInfo);
            this.scopeOfTransport.forEach(item => {
              item[1].forEach(item2 => {
                if (this.loginForm.scopeOfTransport.indexOf(item2.name) > -1) {
                  item2.choose = true;
                }
              });
            });
            this.loginForm.scopeOfTransport = this.loginForm.scopeOfTransport.split(
              ","
            );
            let oFileType4 = this.getFileType(
              this.merchantInfo.roadTrafficPermit
            );
            this.fileType4 =
              oFileType4 == "pdf" || oFileType4 == "pdf" || oFileType4 == "pdf"
                ? "file"
                : "img";
            this.fileList4 = this.merchantInfo.roadTrafficPermit
              ? [
                  {
                    name: "道路交通运输许可证",
                    url: this.merchantInfo.roadTrafficPermit
                  }
                ]
              : [];
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
      let params = JSON.parse(JSON.stringify(this.loginForm));
      params.account = this.userAccount;
      params.useruuid = this.userId;
      params.id = this.loginForm.id || null;
      if (params.scopeOfTransport.length < 1) {
        this.$message({
          message: "请选择服务区域！",
          type: "warning"
        });
        return;
      }
      params.scopeOfTransport = params.scopeOfTransport.join(",");
      params.city =
        this.$refs.cascader.getCheckedNodes() &&
        this.$refs.cascader.getCheckedNodes().length > 0
          ? this.$refs.cascader.getCheckedNodes()[0].pathLabels.join("")
          : "";
      let message = this.editable
        ? "服务商认证信息提交成功,请耐心等待审核结果"
        : "服务商编辑成功";
      let url = params.id
        ? carriersUpdate
        : this.editable
        ? carriers
        : carriersUpdate;
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
        this.loginForm[prop] = res.data.url;
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
        }
      } else if (res.data.Name == "roadTrafficPermit") {
        this.fileList4 = filelist.slice(-1);
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
    //道路交通许可证
    roadTrafficPermitChange(file, filelist) {
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
        this.fileList4 = [];
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
        this.fileList4 = [];
        return false;
      }
      if (file.size / 1024 / 1024 > 1) {
        this.$message({
          type: "warning",
          message: "请选择小于1M的文件"
        });
        this.fileList4 = [];
        return false;
      }
    },
    uploadSuccessroadTrafficPermit(res) {
      this.uploadSuccess(res, "roadTrafficPermit", "fileType4");
    },
    roadTrafficPermitRemove() {
      this.loginForm.roadTrafficPermit = "";
      this.fileType4 = "";
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
      this.loginForm.businessLicensePic = "";
      this.fileType3 = "";
    },
    showImg(url) {
      this.showImgDialog = true;
      this.imgUrl = url;
    },
    submitUpload(type) {
      this.$refs[type].submit();
    },
    chooseScope(area, index, index2) {
      this.scopeOfTransport[index][1][index2].choose = !this.scopeOfTransport[
        index
      ][1][index2].choose;
      let areaindex = this.loginForm.scopeOfTransport.indexOf(area.name);
      if (areaindex > -1) {
        this.loginForm.scopeOfTransport.splice(areaindex, 1);
      } else {
        this.loginForm.scopeOfTransport.push(area.name);
      }
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
.scopeOfTransport {
  padding: 20px;
  .label {
    font-weight: bold;
    font-size: 16px;
    display: inline-block;
    width: 55px;
  }
  .area {
    display: inline-block;
    border: 1px solid grey;
    margin: 5px 10px;
    border-radius: 10px;
    padding: 0px 15px;
    cursor: pointer;
  }
  .choose {
    color: var(--color-primary);
    border-color: var(--color-primary);
  }
  .area:hover {
    color: var(--color-primary);
    border-color: var(--color-primary);
  }
}
.areaList {
  padding-left: 20px;
  font-weight: bold;
}
</style>
