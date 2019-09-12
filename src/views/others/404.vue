<template>
  <el-container class="main">
    <section>
      <img :src="imgUrl" alt="" />
      <div class="content">Error，页面出错了！！！请返回首页或者刷新页面～</div>
      <el-button type="primary" class="gohome" @click="backToHome"
        >返回首页</el-button
      >
    </section>
  </el-container>
</template>

<script>
export default {
  name: "Page404",
  data() {
    return {
      imgUrl: "http://superlink.top/Group404.png"
    };
  },
  methods: {
    backToHome() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  @include flexCenter;

  > section {
    display: inherit;
    @include flexCenter;
    flex-direction: column;
    width: 600px;
    height: 200px;
    margin-top: 15%;
    background-color: #f2f2f2;
    border-radius: 15px;

    .content {
      font-size: 1.7rem;
    }

    .gohome {
      margin-top: 15px;
    }
  }
}
</style>
