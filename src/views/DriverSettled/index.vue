<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-01 11:00:45
 * @LastEditTime: 2019-09-02 14:43:42
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="main">
    <!-- <swiper class="driver_swiper"
            :options="swiperOption">
      <swiper-slide class="first_swiper"> -->
    <div class="driver_banner">
      <div class="container">
        <div class="phone">
          <img src="http://superlink.top/web/driver/iphone1.png" alt="" />
          <img src="http://superlink.top/web/driver/iphone1.png" alt="" />
        </div>
        <div class="content">
          <span class="title">CTMS移动端司机接单APP</span>
          <br />
          <span class="easy"
            >自助注册，一键接单，海量订单池，高效配送如此简单！</span
          >
          <div>
            <el-popover placement="top-start" width="170" trigger="hover">
              <img
                class="qrcode_img"
                src="http://superlink.top/download/ctms_ios.png"
                alt=""
              />
              <div slot="reference" class="btn ios">
                <div>
                  <div class="iosImg icon"></div>
                  <span>App Store</span>
                </div>
              </div>
            </el-popover>
            <el-popover placement="top-start" width="170" trigger="hover">
              <img
                class="qrcode_img"
                src="http://superlink.top/download/ctms_android.png"
                alt=""
              />
              <div slot="reference" class="btn android">
                <div>
                  <div class="androidImg icon"></div>
                  <span>Android</span>
                </div>
              </div>
            </el-popover>
          </div>
          <div class="app_download">
            <div class="ctms">
              <div>
                C&nbsp;T
                <br />
                MS
              </div>
              <div>
                <span class="title">超链云配移动端APP</span>
                <br />
                <span class="detail">自助注册，一键接单，海量订单池！</span>
              </div>
            </div>
            <div class="qrcode">
              <img
                src="http://superlink.top/download/ctms_android.png"
                alt=""
              />
              <div>
                <span class="span1">扫码下载</span>
                <br />
                <span class="span2">超链云配APP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- </swiper-slide> -->
    <!-- 首页 -->
    <!-- <swiper-slide class="second_swiper"> -->
    <div
      class="driver_banner_info"
      style="background-image:url('http://superlink.top/web/driver/app_bg1.png')"
    >
      <div class="container">
        <div class="content">
          <img
            class="icon"
            src="http://superlink.top/web/driver/app_icon_home.png"
            alt=""
          />
          <div class="icon_des">首页</div>
          <div class="des">服务订单，一键接单<br />好接单、快接单</div>
        </div>
        <img
          class="phone"
          src="http://superlink.top/web/driver/iphone1.png"
          alt=""
        />
      </div>
    </div>
    <!-- </swiper-slide> -->
    <!-- 订单 -->
    <!-- <swiper-slide class="third_swiper"> -->
    <div
      class="driver_banner_info"
      style="background-image:url('http://superlink.top/web/driver/app_bg2.png')"
    >
      <div class="container">
        <img
          class="phone"
          src="http://superlink.top/web/driver/iphone2.png"
          alt=""
        />
        <div class="content">
          <img
            class="icon"
            src="http://superlink.top/web/driver/app_icon_order.png"
            alt=""
          />
          <div class="icon_des">订单</div>
          <div class="des">
            提货、回单，司机操作更加简单<br />异常问题随时上报，实时反馈
          </div>
        </div>
      </div>
    </div>
    <!-- </swiper-slide> -->
    <!-- 我的 -->
    <!-- <swiper-slide class="forth_swiper"> -->
    <div
      class="driver_banner_info"
      style="background-image:url('http://superlink.top/web/driver/app_bg3.png')"
    >
      <div class="container">
        <div class="content">
          <img
            class="icon"
            src="http://superlink.top/web/driver/app_icon_my.png"
            alt=""
          />
          <div class="icon_des">我的</div>
          <div class="des">个人中心，数据统计<br />订单管理，一目了然</div>
        </div>
        <img
          class="phone"
          src="http://superlink.top/web/driver/iphone3.png"
          alt=""
        />
      </div>
    </div>
    <!-- </swiper-slide> -->
    <!-- </swiper> -->
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";

import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  name: "DriverSettled",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        direction: "vertical",
        mousewheel: true
      }
    };
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.main {
  .driver_swiper {
    height: 100vh;
  }
  // .first_swiper {
  .driver_banner {
    background-repeat: no-repeat;
    // background-size: cover;
    // background-position: center;
    height: 100vh;
    background-image: url(/static/img/banner.0d40e33.png);
    background-size: 100% 78vh;
    background-position-y: 0;
    background-image: url("../../assets/images/driverSteeled/banner.png");
    .container {
      width: max-content;
      margin: 0 auto;
      display: flex;
      .content {
        position: relative;
        padding-top: 33vh;
        box-sizing: border-box;
        height: 100vh;
        .title {
          font-size: 50px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 70px;
        }
        .easy {
          display: inline-block;
          margin-top: 18px;
          font-size: 18px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 25px;
        }
        .btn > div {
          width: max-content;
          margin: 10px auto;
        }
        .btn {
          .icon {
            display: inline-block;
            width: 32px;
            height: 32px;
            background-repeat: no-repeat;
          }
          .iosImg {
            background-image: url("../../assets/images/driverSteeled/apple.png");
          }
          .androidImg {
            background-image: url("../../assets/images/driverSteeled/iconandroid.png");
          }
        }
        .btn {
          margin-top: 35px;
          margin-right: 40px;
          display: inline-block;
          span {
            vertical-align: super;
          }
          width: 168px;
          height: 56px;
          border-radius: 33px;
          border: 1px solid rgba(255, 255, 255, 1);
          font-size: 16px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 22px;
          cursor: pointer;
        }
        .btn:hover {
          box-shadow: 0px 3px 6px 4px rgba(64, 54, 54, 0.14);
          background: rgba(255, 255, 255, 1);
          border-color: rgba(255, 255, 255, 1);
          color: rgba(37, 165, 201, 1);
          .iosImg {
            background-image: url("../../assets/images/driverSteeled/appleclick.png");
          }
          .androidImg {
            background-image: url("../../assets/images/driverSteeled/iconandroidclick.png");
          }
        }
        .app_download {
          position: absolute;
          bottom: 0;
          height: 22vh;
          display: flex;
          align-items: center;
          .ctms {
            display: flex;
          }
          .ctms div:nth-child(1) {
            width: 68px;
            height: 68px;
            background: rgba(37, 165, 201, 1);
            border-radius: 6px;
            font-size: 20px;
            font-family: PingFangSC-Semibold;
            font-weight: 600;
            color: rgba(255, 238, 134, 1);
            line-height: 28px;
            box-sizing: border-box;
            padding: 7px 12px;
          }
          .ctms div:nth-child(2) {
            margin-left: 20px;
          }
          .title {
            display: inline-block;
            margin-top: 6px;
            font-size: 22px;
            font-family: PingFangSC-Regular;
            color: rgba(51, 51, 51, 1);
            line-height: 30px;
          }
          .detail {
            display: inline-block;
            margin-top: 6px;
            font-size: 14px;
            font-family: PingFangSC-Regular;
            color: rgba(51, 51, 51, 1);
            line-height: 20px;
          }
          .qrcode {
            display: flex;
            align-items: center;
            margin-left: 40px;
            img {
              width: 66px;
              height: 100%;
            }
          }
          .qrcode > div {
            margin-left: 35px;
            width: 108px;
            font-size: 14px;
            font-family: PingFangSC-Regular;
            color: rgba(51, 51, 51, 1);
            line-height: 20px;
            border-top: 1px solid rgba(51, 51, 51, 1);
            border-bottom: 1px solid rgba(51, 51, 51, 1);
            padding: 12px 0;
            .span1 {
              letter-spacing: 13px;
            }
            .span2 {
              letter-spacing: 6px;
            }
          }
        }
      }
    }
    .phone img {
      vertical-align: text-top;
    }
    .phone img:nth-child(1) {
      height: 62vh;
      margin-top: 30vh;
    }
    .phone img:nth-child(2) {
      height: 74vh;
      margin-top: 23vh;
      margin-left: -20vh;
    }
  }
  // }
  // .second_swiper{
  //   .driver_banner {
  //     height: 100vh;
  //     background-image: url('http://superlink.top/web/driver/app_bg1.png');
  //     background-position: 100%;
  //   }
  // }
  // .second_swiper,.forth_swiper {
  //   .container {
  //     height: 100%;
  //     width: 1220px;
  //     margin: 0 auto;
  //     position: relative;
  //   }
  //   .phone {
  //     position: absolute;
  //     height: 82vh;
  //     top: 11vh;
  //     left: 651px;
  //   }
  //   .content{
  //         width: 250px;
  //         position: absolute;
  //         top: 25vh;
  //         left: 200px;
  //         text-align: center;
  //         .icon{
  //           height:100px;
  //         }
  //         .icon_des{
  //           font-size:24px;
  //           color:rgba(51,51,51,1);
  //           padding: 1rem 0;
  //         }
  //         .des{
  //           font-size:16px;
  //           color:rgba(51,51,51,1);
  //           line-height:28px;
  //           padding: 1rem 0;
  //         }
  //   }
  // }
  // .third_swiper {
  //   .driver_banner {
  //     height: 100vh;
  //     background-image: url('http://superlink.top/web/driver/app_bg2.png');
  //   }
  //   .container {
  //     height: 100%;
  //     width: 1220px;
  //     margin: 0 auto;
  //     position: relative;
  //   }
  //   .phone {
  //     position: absolute;
  //     height: 82vh;
  //     top: 11vh;
  //     left: 200px;
  //   }
  //   .content{
  //         width: 250px;
  //         position: absolute;
  //         top: 25vh;
  //         left: 651px;
  //         text-align: center;
  //         .icon{
  //           height:100px;
  //         }
  //         .icon_des{
  //           font-size:24px;
  //           color:rgba(51,51,51,1);
  //           padding: 1rem 0;
  //         }
  //         .des{
  //           font-size:16px;
  //           color:rgba(51,51,51,1);
  //           line-height:28px;
  //           padding: 1rem 0;
  //         }
  //   }
  // }
  // .forth_swiper{
  //   .driver_banner {
  //     height: 100vh;
  //     background-image: url('http://superlink.top/web/driver/app_bg3.png');
  //   }
  // }
}
.qrcode_img {
  width: 150px;
  height: 100%;
}
.driver_banner_info {
  background-size: 100% 100%;
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    .phone,
    .content {
      margin: 0 80px;
    }
    .phone {
      height: 82vh;
    }
    .content {
      width: 250px;
      text-align: center;
      .icon {
        height: 100px;
      }
      .icon_des {
        font-size: 24px;
        color: rgba(51, 51, 51, 1);
        padding: 1rem 0;
      }
      .des {
        font-size: 16px;
        color: rgba(51, 51, 51, 1);
        line-height: 28px;
        padding: 1rem 0;
      }
    }
  }
}
</style>
