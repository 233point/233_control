<template>
  <el-dialog
    v-if="isVisible"
    width="800px"
    title="图片查看"
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancel"
    top="5vh"
  >
    <el-carousel
      indicator-position="outside"
      class="carousel"
      :initial-index="imgListIndex"
      :autoplay="false"
    >
      <el-carousel-item v-for="(item, index) in imgList" :key="index">
        <img class="imgView" :src="item" />
      </el-carousel-item>
    </el-carousel>
  </el-dialog>
</template>

<script>
export default {
  name: "ImgView",
  data() {
    return {
      isVisible: false
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    imgList: {
      type: Array
    },
    imgListIndex: {
      type: Number
    }
  },
  watch: {
    show(isShow) {
      this.isVisible = isShow;
    }
  },
  methods: {
    cancel() {
      this.$emit("update:show", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.imgView {
  height: 100%;
  max-width: 100%;
}
.carousel {
  text-align: center;
}
</style>
