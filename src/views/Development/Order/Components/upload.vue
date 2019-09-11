<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-08 17:11:02
 * @LastEditTime: 2019-08-19 16:12:00
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-dialog
    width="600px"
    title="批量导入"
    class="tms__upload"
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancel"
    center
  >
    <el-form
      :inline="true"
      ref="templateForm"
      :model="templateForm"
      :rules="formRule"
    >
      <el-row v-if="!roleType.includes('merchant')">
        <el-col :span="24">
          <el-form-item label="商户" prop="merchantId">
            <el-select
              v-model="templateForm.merchantId"
              filterable
              placeholder="请选择商户"
            >
              <el-option
                v-for="(item, index) in merchantList"
                :key="index"
                :label="item.merchantName"
                :value="item.merchantId"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="上传模版">
            <el-upload
              ref="uploadFile"
              class="upload-demo"
              :action="actionUrl"
              :on-remove="handleRemove"
              :on-change="handleChange"
              :limit="1"
              :headers="myHeaders"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :auto-upload="false"
              :on-exceed="handleExceed"
              accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              :file-list="fileList"
            >
              <el-button size="mini" type="primary">选择文件</el-button>
              <el-button size="mini" @click.stop="downloadTemplate(importUrl1)"
                >模版1下载</el-button
              >
              <el-button size="mini" @click.stop="downloadTemplate(importUrl3)"
                >模版3下载</el-button
              >
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button
        size="small"
        :loading="saveLoading || checkLoading"
        type="primary"
        @click="save"
        :disabled="!templateForm.merchantId || fileList.length <= 0"
        >{{
          checkLoading ? "检查上传数据中" : saveLoading ? "导入中" : "上传"
        }}</el-button
      >
      <el-button size="small" @click="cancel">取消</el-button>
    </div>

    <el-dialog
      width="600px"
      title="导入检测结果"
      :visible.sync="isFailVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="isFailVisible = false"
      center
      append-to-body
    >
      <el-row>
        <el-alert
          :title="
            failReason
              ? '导入订单总数' +
                (Number(failReason.failCount) +
                  Number(failReason.successCount)) +
                '条。' +
                '可正常导入订单数' +
                failReason.successCount +
                '条,' +
                '失败' +
                failReason.failCount +
                '条数据。请修改订单内容后重新上传！'
              : '提示'
          "
          type="warning"
          :closable="false"
          style="margin-bottom:1rem"
        >
        </el-alert>
        <div style="max-height:400px;overflow:auto">
          <el-row
            v-for="(item, index) in failReason.fail"
            :key="index"
            style="margin-bottom:6px"
          >
            <el-col :span="24">
              <el-row>
                <el-col :span="6"><b>第三方单号：</b></el-col>
                <el-col :span="18">{{ item.importBatchNo }}</el-col>
              </el-row>
              <el-row>
                <el-col :span="6"><b>模版：</b></el-col>
                <el-col :span="18">{{ item.templateType }}</el-col>
              </el-row>
            </el-col>
            <el-col :span="24">
              <el-row>
                <el-col :span="6"><b>失败原因：</b></el-col>
                <el-col :span="18">
                  <div
                    style="display:flex;"
                    v-for="(key, reason, index2) in item.reason"
                    :key="index2"
                  >
                    <div style="word-break: keep-all;">{{ reason }}:</div>
                    <div>
                      <el-row
                        style="word-break:break-all"
                        v-for="(detail, index3) in key"
                        :key="index3"
                      >
                        {{ detail }}
                      </el-row>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </div>
      </el-row>
      <el-row slot="footer" class="dialog-footer">
        <el-button size="small" @click="isFailVisible = false"
          >知道了</el-button
        >
      </el-row>
    </el-dialog>
    <el-dialog
      width="600px"
      title="导入结果"
      :visible.sync="isSuccessVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="isSuccessVisible = false"
      center
      append-to-body
    >
      <el-row>
        <el-alert
          :title="'导入成功' + successReason.successCount + '条订单。'"
          type="success"
          :closable="false"
          style="margin-bottom:1rem"
        >
        </el-alert>
      </el-row>
      <div style="max-height:400px;overflow:auto">
        <el-row v-for="(item, index) in successReason.success" :key="index">
          <el-col :span="24">
            第三方单号:<b>{{ item.importBatchNo }} </b>
            <span style="padding-left:1rem"
              >{{ item.type }}{{ item.status }}</span
            >
          </el-col>
        </el-row>
      </div>
      <el-row slot="footer" class="dialog-footer">
        <el-button size="small" @click="successConfirm">确定</el-button>
      </el-row>
    </el-dialog>
  </el-dialog>
</template>
<script>
/**
 * User Add Component
 * ----------------------
 * Author: Calamus
 * Date: 2018.08.28
 */

// validate
import {
  uploadExcell,
  getImportUrl,
  getMerchantsByAssembly
} from "@/api/order";

// api
import { BASE_PER_FIX_URL } from "@/utils/baseUrlPerFix.js";
import { setSession, getSession } from "@/utils/session";
import { getToken } from "@/utils/auth.js";
import { getTransInfoDetail } from "@/api/datareport";
import { mapGetters } from "vuex";

const token = getToken();

export default {
  name: "OrderUpload",
  data() {
    return {
      isVisible: false,
      templateType: 1,
      templateForm: {
        merchantId: ""
      },
      merchantName: "",
      isFailVisible: false,
      isSuccessVisible: false,
      successReason: {},
      failReason: {},
      myHeaders: { Authorization: token }, // 添加认证码
      // 上传文件
      fileList: [],
      // actionUrl: BASE_PER_FIX_URL+'/waybill/newExcelImport',
      actionUrl: BASE_PER_FIX_URL + "/waybill/ctms/checkExcelData",
      formRule: {
        merchantId: [
          { required: true, message: "请选择商户", trigger: "change" }
        ]
      },
      importUrl1:
        "http://xhe.oss-cn-hangzhou.aliyuncs.com/ims/2019-08-13/template1/8565b79bc576495f9ac0b9579389c073/模板1.xlsx",
      importUrl3:
        "http://xhe.oss-cn-hangzhou.aliyuncs.com/ims/2019-08-13/template3/d18202900c1e418ca76dcebba3c05fdc/模板3.xlsx",
      saveLoading: false,
      checkLoading: false
    };
  },
  computed: {
    ...mapGetters(["roleType"])
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    merchantList: {
      type: Array
    }
  },
  watch: {
    show(isShow) {
      this.isVisible = isShow;
      if (this.$store.getters.roleType.includes("merchant")) {
        this.templateForm.merchantId = this.$store.getters.userId;
      } else {
        this.templateForm.merchantId =
          this.merchantList &&
          this.merchantList.length > 0 &&
          this.merchantList[0].useruuid
            ? this.merchantList[0].useruuid
            : "";
      }
      this.fileList = [];
    }
  },
  methods: {
    save() {
      this.checkLoading = true;
      this.$refs.uploadFile.submit();
    },
    excellSuccess(data) {
      this.saveLoading = true;
      this.checkLoading = false;
      let merchantName = "";
      if (this.$store.getters.roleType.includes("merchant")) {
        merchantName =
          this.$store.getters.merchantInfo.userType == "0"
            ? this.$store.getters.merchantInfo.company
            : this.$store.getters.merchantInfo.contact;
      } else {
        let result = this.merchantList.find(item => {
          return item.merchantId === this.templateForm.merchantId;
        });
        merchantName = result && result.merchantName ? result.merchantName : "";
      }
      let params = {
        templateType: this.templateType || "",
        merchantId: this.templateForm.merchantId,
        merchantName: merchantName,
        data: data || []
      }
      if(this.$store.getters.roleType.includes("merchant")){
        delete params.merchantId
        delete params.merchantName
      }
      uploadExcell(params).then(res => {
        this.saveLoading = false;
        if (!res.error) {
          this.successReason = res;
          this.isSuccessVisible = true;
          setTimeout(() => {
            this.cancel();
            this.$emit("updateList");
          }, 100);
        } else {
          this.cancel();
        }
      });
    },
    successConfirm() {
      this.isSuccessVisible = false;
    },
    cancel() {
      this.$refs.templateForm.resetFields();
      this.$emit("update:show", false);
      this.isVisible = false;
      this.saveLoading = false;
      this.checkLoading = false;
    },
    uploadSuccess(res) {
      console.log("res", res, this.fileList);
      this.checkLoading = false;
      if (
        res.head.code == 200 &&
        res.head.success == "true" &&
        res.data.failCount == 0 &&
        res.data.successCount != 0
      ) {
        this.$confirm("文件上传成功，是否导入数据?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.templateType = res.data.templateType;
            this.excellSuccess(res.data.data);
          })
          .catch(() => {
            this.cancel();
            this.$emit("updateList");
          });
      } else if (res.head.code == 201 && res.head.success == "false") {
        this.$message({
          type: "warning",
          message: res.head.msg
        });
        this.$refs.uploadFile.clearFiles();
        this.cancel();
        this.$emit("updateList");
      } else {
        this.failReason = res.data;
        this.isFailVisible = true;
        this.$refs.uploadFile.clearFiles();
      }
    },
    uploadError(err) {
      this.$message({
        type: "error",
        message: "导入表格失败！"
      });
    },
    // 上传文件
    handleChange(file, fileList) {
      this.fileList = fileList;
      console.log("handleChange", file, fileList, this.fileList);
    },
    handleRemove(file, fileList) {
      this.fileList = fileList;
      console.log("11", file, fileList);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    // 下载模版
    downloadTemplate(importUrl) {
      this.templateType = importUrl == "importUrl1" ? "模板1" : "模板3";
      window.open(importUrl);
    }
  }
};
</script>

<style lang="scss" scoped>
.error_tips {
  font-size: 12px;
  color: orangered;
  display: none;
}
.error_tips.active {
  display: inline-block;
}
</style>
