<template>
  <div>
    <!-- <header-breadcrumb :breadData="$route.matched" /> -->
    <h2>AuthConf</h2>
    <el-input v-model="input"></el-input>
  </div>
</template>
<script>
export default {
  name: "AuthConf",
  data() {
    return {
      input: ""
    };
  },
  mounted() {
    // console.log(this.$route)
  }
};
</script>
