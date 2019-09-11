<template>
  <el-dialog
    width="1100px"
    :title="title"
    :visible.sync="isVisible"
    @close="cancel"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    top="5vh"
  >
    <el-button
      type="primary"
      style="margin-bottom: 10px;"
      v-if="showDownload"
      size="mini"
      @click="downloadPdf"
      >下载<i class="el-icon-download el-icon--right"></i
    ></el-button>
    <div class="pdfViewDiv" v-loading="!pdfUrl" :style="{ height: flexHeight }">
      <iframe :src="pdfUrl" v-if="isVisible" class="pdfView"></iframe>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "PdfView",
  data() {
    const mh =
      document.documentElement.clientHeight * 0.9 - 130 > 0
        ? document.documentElement.clientHeight * 0.9 - 130
        : 0;
    return {
      flexHeight: mh + "px",
      isVisible: false,
      isCheckFormVisible: false
    };
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    title: {
      type: String,
      default: "pdf预览"
    },
    pdfUrl: {
      type: String,
      required: true
    },
    downloadUrl: {
      type: String
    },
    showDownload: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show(isShow) {
      this.isVisible = isShow;
      if (isShow) {
      }
      // 设置窗口显示状态
    }
  },
  methods: {
    downloadPdf() {
      window.open(this.downloadUrl);
    },
    cancel() {
      this.isVisible = false;
      this.$emit("update:show", false);
    }
  },
  components: {}
};
</script>

<style lang="scss" scoped>
.pdfView {
  width: 100%;
  height: 100%;
}
.pdfViewDiv {
  width: 100%;
}
</style>
