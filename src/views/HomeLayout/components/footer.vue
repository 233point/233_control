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
      <div class="content">
        <div class="footer_top res">
          <a href="//www.superlink.top">SUPERLINK</a>
        </div>
        <div class="footer_middle res">
          <div>
            <span>产品服务</span>
            <span>超链云配</span>
            <span>服务保障</span>
          </div>
          <div>
            <span>行业案例</span>
            <span>关于我们</span>
            <span>联系我们</span>
          </div>
        </div>
        <div class="fooer_bottom">
          <div class="res">
            <span>操作问题请资讯：4008-009-008</span>
            <span>
              <a href="http://www.sohomechina.cn">http://www.sohomechina.cn</a>
            </span>
            <span
              >&#169;版权所有：&nbsp;
              <a href="http://www.sohomechina.cn"
                >上海星和宅配家居服务有限公司</a
              >&nbsp;@2018&nbsp;&nbsp;
              <a href="//www.miitbeian.gov.cn">沪ICP备18002873号-3</a>
            </span>
          </div>
        </div>
      </div>
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
  background: #323236;
  padding: 57px 0 0px 0;
  .content {
    width: 100%;
    color: #fff;
    .footer_top,
    .footer_middle {
      // padding:0 2rem;
    }
    .footer_top {
      height: 24px;
      font-size: 24px;
      line-height: 27px;
    }
    .footer_middle {
      margin-top: 35px;
      // width: 400px;
      // display: flex;
      // flex-wrap: wrap;
      span {
        margin-right: 65px;
        line-height: 40px;
      }
    }
    .fooer_bottom {
      background: #19191e;
      display: flex;
      margin-top: 40px;
      justify-content: space-between;
      padding: 2rem;
    }
  }
}
a {
  color: white;
  text-decoration: none;
}
.res {
  width: 1240px;
  margin: 0 auto;
}
</style>
