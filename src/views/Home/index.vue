<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 10:19:19
 * @LastEditTime: 2019-09-06 15:13:19
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="container">
    <section class="banner"></section>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "home",
  components: {
    
  },
  data() {
    return {
    };
  },
  methods: {
    dateFormatter(date) {
      if (date) {
        return moment(date).format("YYYY-MM-DD HH:mm");
      }
    },
  }
};
</script>

<style lang="scss" scoped>
.container .search_box {
  z-index: 1000;
  color: white;
  text-align: center;
  .title {
    font-size: 32px;
  }
  .des {
    font-size: 22px;
    padding: 20px 0;
  }
}
</style>
<style lang="scss" scoped>
.container {
  user-select: none;
  margin: 0 auto;
}
section {
  // padding: 0 10%;
  padding-top: 60px;
  padding-bottom: 80px;
}
section > h3 {
  font-size: 2rem;
  color: rgba(31, 31, 31, 1);
  text-align: center;
  margin: 0;
  margin-bottom: 80px;
}
.banner {
  height: calc(100vh - 66px);
  color: #fff;
  margin: 0;
  background: url("https://cdn.calamus.xyz/blog_ali/calamus_02.png") no-repeat;
  background-size: cover;
  background-position: top center;
}
section:nth-child(1) p,
section:nth-child(1) a {
  font-size: 1.4rem;
  color: #fff;
  text-decoration: none;
  color: #eceded;
  line-height: 30px;
}
section:nth-child(1) .el-row {
  height: 100%;
}
section:nth-child(1) .el-col:nth-child(3) {
  display: flex;
  align-items: center;
  height: 100%;
}
section:nth-child(1) .el-col:nth-child(3) img {
  height: 60%;
}
.search_box {
  width: 780px;
  height: 56px;
  margin: 0 auto;
  .el-input {
    height: 100%;
  }
}
.signin {
  .title {
    text-align: center;
    .tips {
      font-size: 24px;
    }
    .hr {
      display: inline-block;
      width: 48px;
      height: 2px;
      background: rgba(37, 165, 201, 1);
      margin: 2rem auto 5rem auto;
    }
  }
}
</style>

