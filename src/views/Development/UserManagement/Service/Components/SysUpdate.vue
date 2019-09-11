<!--
 * @Description: In User Settings Edit
 * @Author: Calamus
 * @Date: 2019-06-24 15:15:12
 * @LastEditTime: 2019-09-05 11:25:09
 * @LastEditors: Please set LastEditors
 -->

<template>
  <el-dialog
    width="1000px"
    :title="(isCreate ? '新增' : '编辑') + '服务人员'"
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancel"
  >
    <el-form
      ref="sysForm"
      :model="sysForm"
      :rules="rules"
      size="small"
      label-width="150px"
    >
      <el-form-item prop="type" label="用户职业">
        <el-radio-group v-model="sysForm.type" :disabled="!isCreate">
          <el-radio label="0">司机</el-radio>
          <el-radio label="1">安装工</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item prop="account" label="手机号">
        <div style="display:flex">
          <el-input
            class="login-input"
            type="text"
            :disabled="!isCreate"
            style="width:300px;margin-right:1rem"
            v-model="sysForm.account"
            placeholder="请输入手机号作为登录账号"
            maxlength="25"
            clearable
            @blur="checkAccount"
          >
          </el-input>
          <el-alert
            :closable="false"
            v-if="isCreate"
            style="padding: 0 10px;"
            :title="message.message"
            :type="message.type"
            show-icon
          >
          </el-alert>
        </div>
      </el-form-item>
      <el-form-item prop="realName" label="姓名">
        <el-input
          class="login-input"
          type="text"
          v-model="sysForm.realName"
          placeholder="请输入姓名"
          maxlength="50"
        >
        </el-input>
      </el-form-item>
      <!-- <el-form-item prop="phone"
                    label="手机号码">
        <el-input class="login-input"
                  type="text"
                  v-model="sysForm.phone"
                  clearable
                  placeholder="请输入手机号码">
        </el-input>
      </el-form-item> -->
      <el-form-item prop="cityCode" label="城市">
        <el-cascader
          class="w100p"
          ref="cascader"
          :options="cityOptions"
          v-model="sysForm.cityCode"
          disabled
          change-on-select
          :props="cityProps"
        ></el-cascader>
        <!-- <el-input class="login-input"
                  type="text"
                  v-model="sysForm.city"
                  placeholder="请输入城市"
                  clearable
                  maxlength="25">
        </el-input> -->
      </el-form-item>
      <el-form-item prop="numOfID" label="身份证号">
        <el-input
          class="login-input"
          type="text"
          v-model="sysForm.numOfID"
          clearable
          placeholder="请输入身份证号"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="picOfHead" label="身份证（正面照）">
        <div class="xhe_upload_container">
          <el-upload
            ref="picOfHead"
            :before-upload="picOfHeadChange"
            :on-change="picOfHeadChange"
            :on-success="uploadSuccesspicOfHead"
            :on-error="uploadError"
            :on-remove="picOfHeadRemove"
            :action="actionUrl"
            :multiple="false"
            :limit="1"
            accept="image/*,.pdf,.doc,.docx"
            :file-list="fileList1"
            :headers="myHeaders"
            :data="picOfHeadData"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload('picOfHead')"
              >上传</el-button
            >
            <div slot="tip" class="el-upload__tip">图片,且不超过1MB</div>
          </el-upload>
          <div class="img_show">
            <div class="upload_img_container">
              <img
                :src="sysForm.picOfHead"
                @click="showImg(sysForm.picOfHead)"
                class="imgScan"
              />
            </div>
            <a
              class="example_img"
              href="javascript:;"
              @click="showImg(exampleImg.picOfHead)"
            >
              <img :src="exampleImg.picOfHead" />
              <p>示例图</p>
            </a>
          </div>
        </div>
      </el-form-item>
      <el-form-item
        v-if="sysForm.type == 1"
        prop="picOfBack"
        label="身份证（反面照）"
      >
        <div class="xhe_upload_container">
          <el-upload
            ref="picOfBack"
            :before-upload="picOfBackChange"
            :on-change="picOfBackChange"
            :on-success="uploadSuccesspicOfBack"
            :on-error="uploadError"
            :on-remove="picOfBackRemove"
            :action="actionUrl"
            :multiple="false"
            :limit="1"
            accept="image/*"
            :file-list="fileList2"
            :headers="myHeaders"
            :data="picOfBackData"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload('picOfBack')"
              >上传</el-button
            >
            <div slot="tip" class="el-upload__tip">图片,且不超过1MB</div>
          </el-upload>
          <div class="img_show">
            <div class="upload_img_container">
              <img
                :src="sysForm.picOfBack"
                @click="showImg(sysForm.picOfBack)"
                class="imgScan"
              />
            </div>
            <a
              class="example_img"
              href="javascript:;"
              @click="showImg(exampleImg.picOfBack)"
            >
              <img :src="exampleImg.picOfBack" />
              <p>示例图</p>
            </a>
          </div>
        </div>
      </el-form-item>
      <el-form-item
        v-if="sysForm.type == 1"
        prop="picOfHold"
        label="本人手持身份证照片"
      >
        <div class="xhe_upload_container">
          <el-upload
            ref="picOfHold"
            :before-upload="picOfHoldChange"
            :on-change="picOfHoldChange"
            :on-success="uploadSuccesspicOfHold"
            :on-error="uploadError"
            :on-remove="picOfHoldRemove"
            :action="actionUrl"
            :multiple="false"
            :limit="1"
            accept="image/*,.pdf,.doc,.docx"
            :file-list="fileList3"
            :headers="myHeaders"
            :data="picOfHoldData"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload('picOfHold')"
              >上传</el-button
            >
            <div slot="tip" class="el-upload__tip">图片,且不超过1MB</div>
          </el-upload>
          <div class="img_show">
            <div class="upload_img_container">
              <img
                :src="sysForm.picOfHold"
                @click="showImg(sysForm.picOfHold)"
                class="imgScan"
              />
            </div>
            <a
              class="example_img"
              href="javascript:;"
              @click="showImg(exampleImg.picOfHold)"
            >
              <img :src="exampleImg.picOfHold" />
              <p>示例图</p>
            </a>
          </div>
        </div>
      </el-form-item>
      <el-form-item
        v-if="sysForm.type == 0"
        prop="picOfDriving"
        label="行驶证照片"
      >
        <div class="xhe_upload_container">
          <el-upload
            ref="picOfDriving"
            :before-upload="picOfDrivingChange"
            :on-change="picOfDrivingChange"
            :on-success="uploadSuccesspicOfDriving"
            :on-error="uploadError"
            :on-remove="picOfDrivingRemove"
            :action="actionUrl"
            :multiple="false"
            :limit="1"
            accept="image/*"
            :file-list="fileList4"
            :headers="myHeaders"
            :data="picOfDrivingData"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload('picOfDriving')"
              >上传</el-button
            >
            <div slot="tip" class="el-upload__tip">图片,且不超过1MB</div>
          </el-upload>
          <div class="img_show">
            <div class="upload_img_container">
              <img
                :src="sysForm.picOfDriving"
                @click="showImg(sysForm.picOfDriving)"
                class="imgScan"
              />
            </div>
            <a
              class="example_img"
              href="javascript:;"
              @click="showImg(exampleImg.picOfDriving)"
            >
              <img :src="exampleImg.picOfDriving" />
              <p>示例图</p>
            </a>
          </div>
        </div>
      </el-form-item>
      <el-form-item prop="skills" label="擅长品类">
        <el-tag
          class="skills_tags"
          v-for="(tag, index) in sysForm.skills"
          :key="index"
          closable
          size="medium"
          :disable-transitions="false"
          @close="handleClose(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          style="width:140px"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="mini"
          placeholder="添加品类"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
          maxlength="20"
        >
        </el-input>
        <el-button
          v-else
          class="button-new-tag"
          size="mini"
          :disabled="!sysForm.skills || sysForm.skills.length >= 20"
          @click="showInput"
          >+ 品类</el-button
        >
      </el-form-item>
      <el-form-item prop="haveOrg" label="员工关系">
        <el-radio-group v-model="sysForm.haveOrg" disabled>
          <el-radio label="0">雇佣</el-radio>
          <el-radio label="1">非雇佣</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-row>
        <el-col :span="6" :offset="18">
          <el-button
            type="primary"
            :disabled="message.type != 'success'"
            @click="save"
            >保存</el-button
          >
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
import { addServicepersonal, updateServicepersonal } from "@/api/user";
import { checkUniqueAccount } from "@/api/common";
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth.js";
import { BASE_PER_FIX_URL } from "@/utils/baseUrlPerFix.js";
import areaTree from "@/assets/city_tree.json";
const token = getToken();

//
const initsyssForm = {
  userId: "",
  ownerId: "",
  roleType: "",
  type: "0", // 0 司机  1安装工  2配装经理（只有服务商可以选择这个）
  account: "",
  phone: "",
  realName: "",
  city: "",
  cityCode: "",
  numOfID: "",
  picOfHead: "",
  picOfBack: "",
  picOfHold: "",
  picOfDriving: "",
  haveOrg: "0",
  skills: []
};
const addressTree = areaTree.children;

export default {
  name: "sysUpdate",
  data() {
    return {
      exampleImg: {
        picOfHead: "http://superlink.top/web/picOfHeadData.jpeg",
        picOfBack: "http://superlink.top/web/picOfBackData.jpeg",
        picOfHold: "http://superlink.top/web/picOfHoldData.jpeg",
        picOfDriving: "http://superlink.top/web/picOfDrivingData.jpeg"
      },
      cityOptions: addressTree,
      cityProps: {
        value: "adcode",
        label: "name",
        children: "children"
      },
      message: {
        type: "info",
        message: "请先输入账号校验是否可用！"
      },
      inputVisible: false,
      inputValue: "",
      myHeaders: { Authorization: token },
      actionUrl: BASE_PER_FIX_URL + "/oss/Upload",
      showImgDialog: false,
      imgUrl: "",
      picOfHeadData: {
        fileEnName: "businessLicensePic",
        fileCnName: "身份证正面照片",
        fileType: "png,jpg,jpeg,bmp,gif"
      },
      picOfBackData: {
        fileEnName: "picOfBackData",
        fileCnName: "身份证反面照片",
        fileType: "png,jpg,jpeg,bmp,gif"
      },
      picOfHoldData: {
        fileEnName: "picOfHoldData",
        fileCnName: "手持身份证照片",
        fileType: "png,jpg,jpeg,bmp,gif"
      },
      picOfDrivingData: {
        fileEnName: "picOfDrivingData",
        fileCnName: "行驶证照片",
        fileType: "png,jpg,jpeg,bmp,gif"
      },
      fileList1: [],
      fileList2: [],
      fileList3: [],
      fileList4: [],
      isVisible: false,
      sysForm: {},
      rules: {
        type: [{ required: true, message: "请选择用户职业", trigger: "blur" }],
        // cityCode: [{ required: true, message: '请输入城市', trigger: 'blur' }],
        account: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: Validator.cellPhone, trigger: "blur" }
        ],
        realName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        // phone: [
        //   { required: true, message: '请输入手机号码', trigger: 'blur' },
        //   { validator: Validator.cellPhone, trigger: 'blur' },
        // ],
        numOfID: [
          { required: true, message: "请输入身份证号", trigger: "blur" },
          { validator: Validator.isIdCardOnly, trigger: "blur" }
        ],
        picOfHead: [
          {
            required: true,
            message: "请上传身份证正面照片",
            trigger: "blur"
          }
        ],
        picOfBack: [
          {
            required: true,
            message: "请上传身份证反面照片",
            trigger: "blur"
          }
        ],
        picOfHold: [
          {
            required: true,
            message: "请上传本人手持身份证照片",
            trigger: "blur"
          }
        ],
        picOfDriving: [
          {
            required: true,
            message: "请上传行驶证照片",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["roleType", "userId", "merchantInfo"])
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
          this.sysForm = JSON.parse(JSON.stringify(initsyssForm));
          this.sysForm.ownerId = this.userId;
          this.sysForm.cityCode = this.merchantInfo.cityCode;
          console.log(
            "this.merchantInfo.cityCode",
            this.merchantInfo.cityCode,
            this.merchantInfo
          );
        } else {
          this.sysForm = JSON.parse(JSON.stringify(this.sysData));
          this.sysForm.haveOrg = this.sysForm.haveOrg == "0" ? "0" : "1";
          this.sysForm.cityCode =
            this.sysForm.cityCode && this.sysForm.cityCode.length > 0
              ? this.sysForm.cityCode
              : this.merchantInfo.cityCode;
          this.fileList1 = this.sysData.picOfHead
            ? [{ name: "身份证正面照", url: this.sysData.picOfHead }]
            : [];
          this.fileList2 = this.sysData.picOfBack
            ? [{ name: "身份证反面照", url: this.sysData.picOfBack }]
            : [];
          this.fileList3 = this.sysData.picOfHold
            ? [{ name: "手持身份证照片", url: this.sysData.picOfHold }]
            : [];
          this.fileList4 = this.sysData.picOfDriving
            ? [{ name: "行驶证照片", url: this.sysData.picOfDriving }]
            : [];
        }
      }
      //
      this.isVisible = isShow;
    }
  },
  methods: {
    check() {
      return new Promise(resolve => {
        if (this.sysForm.account) {
          checkUniqueAccount({ userAccount: this.sysForm.account }).then(
            res => {
              if (!res.error) {
                resolve(res);
              } else {
                this.message = {
                  type: "error",
                  message: "该账号已被占用，请修改账号！"
                };
                resolve({ error: true });
              }
            }
          );
        } else {
          this.message = {
            type: "info",
            message: "请先输入账号校验是否可用！"
          };
          resolve({ error: "info" });
        }
      });
    },
    async checkAccount(val) {
      let res = await this.check();
      console.log("res", res);
      if (!res.error) {
        this.message = {
          type: "success",
          message: "账号未被占用"
        };
        return true;
      } else {
        if (res.error == "info") {
          this.message = {
            type: "info",
            message: "请先输入账号校验是否可用！"
          };
        } else {
          this.message = {
            type: "error",
            message: "该账号已被占用，请修改账号！"
          };
        }
        return false;
      }
    },
    async save() {
      if (this.isCreate) {
        let result = await this.checkAccount();
        this.$refs.sysForm.validate(isValid => {
          if (isValid && result) {
            this.submit();
          }
        });
      } else {
        this.$refs.sysForm.validate(isValid => {
          if (isValid) {
            this.submit();
          }
        });
      }
    },
    submit() {
      const params = JSON.parse(JSON.stringify(this.sysForm));
      params.roleType = this.roleType;
      params.userId = this.userId;
      params.phone = params.account;
      // params.city = this.$refs.cascader.getCheckedNodes()[0].pathLabels.join('')
      params.city =
        this.$refs.cascader.getCheckedNodes() &&
        this.$refs.cascader.getCheckedNodes().length > 0
          ? this.$refs.cascader.getCheckedNodes()[0].pathLabels.join("")
          : "";
      const submitType = this.isCreate
        ? addServicepersonal
        : updateServicepersonal;
      const submitText = this.isCreate ? "新增" : "编辑";
      submitType(params).then(res => {
        if (!res.error) {
          // this.$message({
          //   message: `${submitText}成功!`,
          //   type: "success"
          // });
           this.$alert('默认密码为 <b style="color:orange">123456</b>', `${submitText}成功!`, {
              dangerouslyUseHTMLString: true,
              confirmButtonText: '确定',
              callback: action => {
                this.cancel();
                this.$emit("updateList");
              }
            });
        }
      });
    },
    cancel() {
      this.sysForm = JSON.parse(JSON.stringify(initsyssForm));
      this.$refs.sysForm.resetFields();
      this.$emit("update:show", false);
      this.$emit("update:sysData", Object.create(null));
      this.isVisible = false;
      this.imgUrl = false;
      this.fileList1 = [];
      this.fileList2 = [];
      this.fileList3 = [];
      this.fileList4 = [];
      this.message = {
        type: "info",
        message: "请先输入账号校验是否可用！"
      };
    },
    // 新增品类
    handleClose(tag) {
      this.sysForm.skills.splice(this.sysForm.skills.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue.trim()) {
        this.sysForm.skills.push(inputValue.trim());
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    // 文件上传相关操作 TODO：封装组件
    uploadSuccess(res, prop) {
      if (res.head.code == 200 && res.head.success == "true") {
        this.$message({
          type: "success",
          message: "上传成功！"
        });
        this.sysForm[prop] = res.data.url;
      } else if (res.head.code == 201 && res.head.success == "false") {
        this.$message({
          type: "warning",
          message: res.head.msg
        });
        if (res.data.Name == "picOfHead") {
          this.fileList1 = filelist.slice(-1);
        } else if (res.data.Name == "picOfBack") {
          this.fileList2 = filelist.slice(-1);
        } else if (res.data.Name == "picOfHold") {
          this.fileList3 = filelist.slice(-1);
        } else if (res.data.Name == "picOfDriving") {
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
    // 身份证（正面照）相关
    picOfHeadChange(file, filelist) {
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
    uploadSuccesspicOfHead(res) {
      this.uploadSuccess(res, "picOfHead");
    },
    // 身份证（反面照）
    picOfBackChange(file, filelist) {
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
    uploadSuccesspicOfBack(res) {
      this.uploadSuccess(res, "picOfBack");
    },
    // 本人手持身份证照片
    picOfHoldChange(file, filelist) {
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
    uploadSuccesspicOfHold(res) {
      this.uploadSuccess(res, "picOfHold", "fileType3");
    },
    // 行驶证照片
    picOfDrivingChange(file, filelist) {
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
    uploadSuccesspicOfDriving(res) {
      this.uploadSuccess(res, "picOfDriving");
    },
    picOfHeadRemove() {
      this.sysForm.picOfHead = "";
    },
    picOfBackRemove() {
      this.sysForm.picOfBack = "";
    },
    picOfHoldRemove() {
      this.sysForm.picOfHold = "";
    },
    picOfDrivingRemove() {
      this.sysForm.picOfDriving = "";
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
.dialogImg {
  width: 560px;
}
.skills_tags {
  margin: 0 0.5rem;
}
.xhe_upload_container {
  margin-top: 0.5rem;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  .img_show {
    display: flex;
    justify-content: space-between;
    .imgScan {
      width: 200px;
    }
    .example_img {
      padding: 10px 10px 0 10px;
      width: 220px;
      border: 1px dashed #dcdcdc;
      text-align: center;
      img {
        width: 100%;
      }
      p {
        color: #909399;
      }
    }
  }
}
</style>
