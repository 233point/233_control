<template>
  <el-dialog
    width="600px"
    title="上传图片"
    class="tms__upload"
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="reset"
    :append-to-body="true"
    :lock-scroll="true"
    center
  >
    <div class="xhe_upload_container">
      <el-upload
        ref="uploadLogo1"
        :before-upload="imgChange"
        :on-change="imgChange"
        :on-success="uploadSuccessLogo1"
        :on-error="uploadError"
        :on-remove="logo1Remove"
        :action="actionUrl"
        :multiple="false"
        :limit="1"
        accept="image/*"
        :file-list="fileList"
        :headers="myHeaders"
        :data="imgData"
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
      <img v-if="imgUrl" :src="imgUrl" class="imgScan" />
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="reset">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getToken } from "@/utils/auth.js";
import { BASE_PER_FIX_URL } from "@/utils/baseUrlPerFix.js";

const token = getToken();

export default {
  name: "uploadImg",
  data() {
    return {
      isVisible: false,
      myHeaders: { Authorization: token },
      actionUrl: BASE_PER_FIX_URL + "/oss/Upload",
      showImgDialog: false,
      imgUrl: "",
      imgData: {
        fileEnName: "logo1",
        fileCnName: "logo1",
        fileType: "png,jpg,jpeg,bmp,gif"
      },
      fileList: []
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    img: {
      type: String,
      default: ""
    }
  },
  watch: {
    show(isShow) {
      this.isVisible = isShow;
      this.fileList = [];
    }
  },
  methods: {
    save() {
      this.$emit("receiveData", this.imgUrl);
      this.reset();
    },
    reset() {
      this.fileList = [];
      this.isVisible = false;
      this.imgUrl = "";
      this.$emit("update:show", false);
    },
    //个人logo
    imgChange(file, filelist) {
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
      this.uploadSuccess(res, "logo");
    },
    uploadSuccess(res, prop, fileType) {
      if (res.head.code == 200 && res.head.success == "true") {
        this.$message({
          type: "success",
          message: "上传成功！"
        });
        this.imgUrl = res.data.url;
      } else if (res.head.code == 201 && res.head.success == "false") {
        this.$message({
          type: "warning",
          message: res.head.msg
        });
        this.fileList = filelist.slice(-1);
      }
    },
    uploadError(err) {
      this.$message({
        type: "error",
        message: "上传失败,请重新上传！"
      });
    },
    logo1Remove() {
      this.imgUrl = "";
    },
    submitUpload(type) {
      this.$refs[type].submit();
    }
  }
};
</script>

<style lang="scss" scoped>
.imgScan {
  width: 560px;
}
</style>
