<template>
  <router-view />
</template>

<script>
//TODO:
//1. 登录区分管理员，进入后台管理系统或者前台项目
//2. 前台项目做适配
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
