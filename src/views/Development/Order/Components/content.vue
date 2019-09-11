<template>
  <el-dialog
    width="1000px"
    title="选择服务"
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancel"
  >
    <el-row>
      MercureDetail
    </el-row>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="save">确认</el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </span>
  </el-dialog>
</template>

<script>
import CommonWrapper from "@/components/commonWrapper";

export default {
  name: "Map",
  components: {
    CommonWrapper
  },
  data() {
    return {
      isVisible: false,
      content: null
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show(isShow) {
      this.isVisible = isShow;
    }
  },
  mounted() {},
  methods: {
    getContent(val) {
      this.content = val;
      console.log("content-this.content", this.content);
    },
    save() {
      console.log("save-this.content", this.content);
      this.$emit("getContent", this.content);
      this.cancel();
    },
    clear() {
      this.content = null;
      this.$refs.mercure.clearChoose();
    },
    cancel() {
      this.$emit("update:show", false);
      this.isVisible = false;
    }
  }
};
</script>

<style scoped>

</style>
