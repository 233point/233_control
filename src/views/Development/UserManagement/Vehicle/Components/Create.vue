<!--
 * @Description: In User Settings Edit
 * @Author: Calamus
 * @Date: 2019-08-12 10:16:32
 * @LastEditTime: 2019-09-03 13:35:45
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-dialog
    width="800px"
    :title="(isCreate ? '新增' : '编辑') + '车辆'"
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancel"
    class="venicle"
  >
    <el-form ref="form" :model="form" :rules="formRules" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="车牌号" prop="plateNo">
            <el-input
              v-model="form.plateNo"
              placeholder="填写车牌号：陕A11111"
              maxlength="50"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <!-- <el-col :span="12">
          <el-form-item label="车辆来源" prop="busSource">
            <el-select v-model="form.busSource"  placeholder="选择车辆来源" @change="changeBusSource">
              <el-option label="自有" value="0" />
              <el-option label="合作" value="1" />
            </el-select>
          </el-form-item>
        </el-col> -->
        <el-col :span="12">
          <el-form-item label="品牌" prop="busBrand">
            <el-input
              v-model="form.busBrand"
              placeholder="填写车辆品牌"
              maxlength="50"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="车型" prop="busType">
            <el-select
              v-model="form.busType"
              filterable=""
              maxlength="50"
              allow-create=""
              default-first-option
              placeholder="选择车型"
            >
              <el-option
                v-for="(item, index) in busTypeList"
                :key="index"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="载重(t)" prop="busLoad">
            <el-input-number
              v-model="form.busLoad"
              :min="0"
              :max="1000000"
              :step="1"
              :precision="2"
              controls-position="right"
              placeholder="选择车辆载重"
            ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="车长(m)" prop="busLength">
            <el-input-number
              v-model="form.busLength"
              :min="0"
              :max="1000000"
              :step="1"
              :precision="2"
              controls-position="right"
              placeholder="填写车辆长度"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车宽(m)" prop="busWidth">
            <el-input-number
              v-model="form.busWidth"
              :min="0"
              :max="1000000"
              :step="1"
              :precision="2"
              controls-position="right"
              placeholder="填写车辆宽度"
            ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="车高(m)" prop="busHeight">
            <el-input-number
              v-model="form.busHeight"
              :min="0"
              :max="1000000"
              :step="1"
              :precision="2"
              controls-position="right"
              placeholder="填写车辆高度"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="容量(m³)" prop="busCapacity">
            <el-input-number
              v-model="form.busCapacity"
              :min="0"
              :max="1000000"
              :step="1"
              :precision="2"
              controls-position="right"
              placeholder="填写车辆容量"
            ></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="所属司机" prop="useUserId">
            <el-select
              v-model="form.useUserId"
              filterable
              placeholder="选择车辆所属司机"
            >
              <el-option
                v-for="(item, index) in driverList"
                :key="index"
                :label="item.realName"
                :value="item.useruuid"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="备注" prop="remark">
            <el-input
              v-model="form.remark"
              type="textarea"
              :autosize="{ maxRows: 3 }"
              resize="none"
              placeholder="请填写备注,最长200字符"
              maxlength="200"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item label="车辆照片">
            <el-upload
              ref="uploadBusImg"
              :before-upload="logoCardChange"
              :on-change="logoCardChange"
              :on-success="uploadSuccess"
              :on-exceed="handleExceed"
              :on-error="uploadError"
              :on-remove="picRemove"
              :action="actionUrl"
              :multiple="false"
              :limit="1"
              accept="image/*"
              :file-list="fileList"
              :headers="myHeaders"
              :data="busData"
              :auto-upload="false"
            >
              <el-button slot="trigger" size="small" type="primary"
                >选择</el-button
              >
              <el-button
                style="margin-left: 10px;"
                size="small"
                type="success"
                @click="submitUpload('uploadBusImg')"
                >上传</el-button
              >
              <div slot="tip" class="el-upload__tip">图片,且不超过1MB</div>
            </el-upload>
            <img v-if="form.img" :src="form.img" class="imgScan" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20" class="flex-right">
          <el-button type="primary" :loading="isSaving" @click="save"
            >保存</el-button
          >
          <el-button @click="cancel">取消</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>
<script>
/**
 * User Add Component
 * ----------------------
 * Author: Calamus
 * Date: 2018.09.26
 */
// validate
import Validator from "@/utils/extendValidate/extendValidate";
import { BASE_PER_FIX_URL } from "@/utils/baseUrlPerFix.js";
import { getToken } from "@/utils/auth.js";
import { getTreeNode, findPath } from "@/utils/generateTree";
import { setSession, getSession } from "@/utils/session";
import { mapGetters } from "vuex";

// api
import { addVehicle, editVehicle } from "@/api/vehicleManagement";
import { getAllWithRoleType, getBusType, getPicAddress } from "@/api/common";
import { getServicepersonal } from "@/api/user";

const token = getToken();
const initForm = {
  plateNo: "",
  busBrand: "",
  busLoad: "",
  busType: "",
  remark: "",
  busSource: "0",
  busLength: "",
  busWidth: "",
  busHeight: "",
  busCapacity: "",
  busBirthday: "",
  drivingLicense: "",
  useUserId: "",
  useUserName: "",
  img: "",
  ownerId: ""
};
export default {
  name: "UserCreate",
  data() {
    return {
      isSaving: false,
      isVisible: false,
      orgnization: [],
      form: {},
      formRules: {
        plateNo: [
          { required: true, message: "请填写车牌号", trigger: "change" },
          { validator: Validator.isVehicleNumber, trigger: "blur" }
        ],
        busBrand: [
          { required: true, message: "请填写车辆品牌", trigger: "change" }
        ],
        busLoad: [
          { required: true, message: "请填写车辆载重", trigger: "change" }
        ],
        busType: [{ required: true, message: "请填写车型", trigger: "change" }]
        // pic: [{required: true, message: '请上传车辆照片', trigger: 'change'}],
      },
      driverList: [],
      busTypeList: [],
      busData: {
        fileEnName: "bus",
        fileCnName: "bus",
        fileType: "png,jpg,jpeg,bmp,gif"
      },
      fileList: [],
      myHeaders: { Authorization: token },
      actionUrl: BASE_PER_FIX_URL + "/oss/Upload",
      picUrl: ""
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    isCreate: {
      type: Boolean,
      default: true
    },
    busInfo: {
      type: Object
    }
  },
  computed: {
    ...mapGetters(["userId"])
  },
  watch: {
    show(isShow) {
      this.isVisible = isShow;
      this.getBusType();
      if (isShow) {
        // 新建
        if (this.isCreate) {
          this.form = JSON.parse(JSON.stringify(initForm));
          this.form.ownerId = this.userId;
          this.getDriver();
          // 编辑
        } else {
          this.setToEditState();
        }
      }
    }
  },
  methods: {
    // 获取司机列表
    async getDriver() {
      await getServicepersonal({
        type: "0",
        scope: this.form.busSource,
        ownerId: this.$store.state.user.userId
      }).then(res => {
        if (!res.error) {
          this.driverList = res;
        }
      });
    },
    changeBusSource(val) {
      if (val) {
        this.form.useUserId = "";
        this.form.useUserName = "";
        this.getDriver();
      }
    },
    // 获取车型
    getBusType() {
      // getBusType().then(res => {
      //   if(!res.error) {
      //     this.busTypeList = res
      //   }
      // })
      this.busTypeList = ["全封闭", "卡车", "半挂", "轻卡", "全挂", "轿车"];
    },
    setToEditState() {
      this.form = Object.assign({}, this.busInfo);
      this.getDriver();
      this.fileList = this.form.img
        ? [{ name: "车辆照片", url: this.busInfo.img }]
        : [];
    },
    vehiclePicChange(file, filelist) {
      let fileType = "";
      this.picUrl = "";
      if (file.size && file.size > 1 * 1024 * 1024) {
        this.$message({
          type: "warning",
          message: "请上传小于1m的图片"
        });
        this.fileList = [];
        return false;
      }
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
        this.fileList = [];
        return false;
      }
      let imglist = ["png", "JPG", "jpg", "jpeg", "bmp", "gif"];
      // 进行图片匹配
      let result = imglist.some(item => {
        return item == fileType;
      });
      if (!result) {
        this.$message({
          type: "warning",
          message: "请选择正确的文件"
        });
        this.fileList = [];
        return false;
      }
    },
    uploadSuccess(result) {
      if (result.head.code == 200 && result.head.success == "true") {
        this.form.img = result.data.url;
        this.picUrl = result.data.url;
      } else if (res.head.code == 201 && res.head.success == "false") {
        this.$message({
          type: "warning",
          message: res.head.msg
        });
      }
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      if (fileList.length) {
        this.$message({
          message: `最多可上传1个文件`,
          type: "warning"
        });
      }
    },
    submitUpload(type) {
      this.$refs[type].submit();
    },
    uploadError(err) {
      this.$message({
        type: "error",
        message: "图片上传失败！"
      });
    },
    picRemove() {
      this.picUrl = "";
      this.form.img = "";
    },
    save() {
      this.$refs.form.validate(isValid => {
        if (isValid) {
          const submitType = this.isCreate ? addVehicle : editVehicle;
          const submitText = this.isCreate ? "新增" : "编辑";
          const params = Object.assign({}, this.form);
          let result = this.driverList.find(item => {
            return item.useruuid == this.form.useUserId;
          });
          params.useUserName = result ? result.realName : "";
          this.isSaving = true;
          submitType(params).then(res => {
            if (!res.error) {
              this.isSaving = false;
              if (res.code == 11) {
                this.$message({
                  message: res.msg,
                  type: "warning"
                });
                return;
              }
              this.$message({
                message: `${submitText}车辆成功!`,
                type: "success"
              });
              this.cancel();
              this.$emit("updateList");
            }
          });
        }
      });
    },
    cancel() {
      this.form = JSON.parse(JSON.stringify(initForm));
      this.$refs.form.resetFields();
      this.$emit("update:show", false);
      this.isVisible = false;
      this.fileList = [];
      this.picUrl = "";
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
        this.fileList = [];
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
        this.fileList = [];
        return false;
      }
      if (file.size / 1024 / 1024 > 1) {
        this.$message({
          type: "warning",
          message: "请选择小于1M的文件"
        });
        this.fileList = [];
        return false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.venicle {
  .imgScan {
    width: 350px;
    margin-top: 10px;
  }
  .el-select {
    width: 220px !important;
  }
}
</style>
