<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-24 11:25:09
 * @LastEditTime: 2019-08-30 10:12:54
 * @LastEditors: Please set LastEditors
 -->
<template>
  <footer>
    <div class="foot_container">
      <span
              >&#169;版权所有：&nbsp;
              <a href="//www.calamus.xyz"
                >Calamus</a
              >&nbsp;@2015-2019&nbsp;&nbsp;
              <a href="//www.miitbeian.gov.cn">陕ICP备18021115号-1</a>
      </span>
    </div>
  </footer>
</template>
<script>
export default {
  name: "XheFoot",
  data() {
    return {};
  },
  props: {
    isShowEnterBtn: {
      type: Boolean,
      default: true
    }
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
footer {
  box-sizing: border-box;
}
.foot_container {
  width: -webkit-fill-available;
  color: #323236;
  width: 1240px;
  height:66px;
  line-height:66px;
  text-align:center;
  margin: 0 auto;
}
</style>
