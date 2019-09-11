<template>
  <router-view />
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  height: 100%;
  font-size: 12px;
  font-family: "Helvetica Neue", "PingFang SC", "Hiragino Sans GB",
    "Microsoft Yahei", "STXihei" !important;
  overflow: auto;
  background: #dcdcdc29;
  background: url(http://www.sohomechina.cn/_nuxt/img/c33c34d.jpg) no-repeat 50%
    fixed;
  background-size: cover;
  ul,
  li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  > a {
    display: none;
  }
}
</style>
