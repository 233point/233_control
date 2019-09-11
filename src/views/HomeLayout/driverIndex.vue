<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-30 11:14:19
 * @LastEditTime: 2019-08-30 11:14:32
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div style="position:relative">
    <xhe-head />
    <router-view />
    <xhe-foot />
  </div>
</template>

<script>
import XheFoot from "./components/footer";
import XheHead from "./components/driverHeader";
export default {
  name: "home",
  components: {
    XheFoot,
    XheHead
  }
};
</script>

<style scoped>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
