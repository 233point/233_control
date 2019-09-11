<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 10:19:19
 * @LastEditTime: 2019-09-06 15:13:19
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="container">
    <section class="banner">
      <!-- <el-row type="flex"
              align="middle">
        <div class="search_box">
          <el-input size="large"
          class="waybillno_search"
                    placeholder="查询单号"
                    v-model.trim="searchWord">
            <el-button slot="append"
                       icon="el-icon-search" @click.stop="waybillSearch"></el-button>
          </el-input>
          <div class="search_result" v-if="searchResult.waybillNo">
            <div>
            <span class="close_btn" @click="searchResult = {}">x</span>
            <a-timeline style="max-height:200px;overflow:auto" v-if="searchResult.transInfo && searchResult.transInfo.waybillNo">
              <a-timeline-item v-for="(item,index) in searchResult.trailInfos"
                                          :key="index">
                  <p class="time">{{dateFormatter(item.trailTime)}}</p>
                  <p class="content">{{item.trailRemark}}</p>
              </a-timeline-item>
            </a-timeline>
            <span class="time" v-else>查询不到运单信息</span>
          </div>
          </div>
        </div>
      </el-row> -->
      <el-row type="flex" align="middle">
        <div class="search_box">
          <div class="title">超链云配 家居物流信息管家</div>
          <div class="des">
            下单，调度，服务，回单，评价全流程系统化平台等你来！
          </div>
        </div>
      </el-row>
    </section>
    <section class="signin video">
      <div class="title">
          <div class="hr"></div>
          <div class="tips">系统介绍视频</div>
        </div>
      <div class="video_content">
        <div class="img_container">
          <img src="http://superlink.top/web/font_video.png" alt="">
        </div>
        <div class="ctms_video">
          <video-player class="video-player-box"
                    ref="videoPlayer"
                :playsinline="true"
                @play="onPlayerPlay($event)"
                @pause="onPlayerPause($event)"
                @ended="onPlayerEnded($event)"
                @loadeddata="onPlayerLoadeddata($event)"
                @waiting="onPlayerWaiting($event)"
                @playing="onPlayerPlaying($event)"
                @timeupdate="onPlayerTimeupdate($event)"
                @canplay="onPlayerCanplay($event)"
                @canplaythrough="onPlayerCanplaythrough($event)"
                @ready="playerReadied"
                @statechanged="playerStateChanged($event)"
                :options="playerOptions">
          </video-player>
        </div>
        
      </div>
    </section>
    <section class="signin">
      <div class="title">
        <div class="tips">三大解决方案</div>
        <div class="hr"></div>
      </div>
      <div class="role_container">
        <div
          class="role_item"
          v-for="(item, index) in roleList"
          :key="index"
          @click.stop="chooseRole(item)"
        >
          <img :src="item.img" alt="" />
          <div class="role_name">{{ item.roleName }}</div>
          <div class="content">{{ item.content }}</div>
        </div>
      </div>
    </section>
    <section class="join_number">
      <div>
        <div
          v-for="(item, index) in joinList"
          class="number_box"
          :class="index != joinList.length - 1 ? 'right_border' : ''"
          :key="index"
        >
          <div class="name">
            {{ item.name }}
          </div>
          <div>
            <span class="number">{{ countInfo[item.number] }}</span>
            <span>{{ item.unit }}</span>
          </div>
        </div>
      </div>
    </section>
    <div class="infomation_container">
      <div class="info_item">
        <div class="img_container">
          <img src="http://superlink.top/web/ctms1.png" alt="" />
        </div>
        <div class="content_container">
          <h1>部署在云端的TMS</h1>
          <p>
            资源共享：云平台服务，为商户、服务商、司机、安装工、技师以及收货人提供共享资源与服务网络，让企业通过生态圈的互联互通实现物流管理升级。
          </p>
          <p>
            灵活切换：平台由SaaS系统部署，可完成纯软件或者线上软件+线下服务的灵活切换，按需配置，切换成本低。
          </p>
          <a class="common_btn info">预约演示</a>
        </div>
      </div>
      <div class="info_item">
        <div class="content_container">
          <h1>从发货到客户评价，配送全流程透明可视</h1>
          <p>
            物流运输的全程监控从派单、配装、监控、口碑到服务商等运输全流程协同与管理，快速上线，提高客户服务水平。
          </p>
          <p>
            通过提供APP和小程序技术，全程连接商户、服务商、司机与客户，实现多方实时协同，智能计划调度，节省运输费用。
          </p>
          <a class="common_btn info">预约演示</a>
        </div>
        <div class="img_container">
          <img src="http://superlink.top/web/ctms2.png" alt="" />
        </div>
      </div>
    </div>
    <!-- <section class="signin reason">
          <div class="title">
            <div class="tips">为什么选择超链云配</div>
            <div class="hr"></div>
          </div>
          <div class="role_container">
            <div class="role_item"  v-for="(item,index) in reasonList"  :key="index">
              <img style="height:130px;" :src="item.img" alt="">
              <div class="role_name">{{item.roleName}}</div>
              <div class="content">{{item.content}}</div>
            </div>
          </div>
        </section> -->
    <section class="signin reason">
      <div class="title">
        <div class="tips">主要模块</div>
        <div class="hr"></div>
      </div>
      <div class="model_container">
        <div class="model_item" v-for="(item, index) in modelList" :key="index">
          <i :class="item.icon"></i>
          <div class="model_name">{{ item.name }}</div>
        </div>
      </div>
    </section>
    <div class="result_mask" v-if="searchResult.waybillNo"></div>
  </div>
</template>

<script>
import { settledInfoStat, tranInfo } from "@/api/home";
import moment from "moment";
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'

export default {
  name: "home",
  components: {
    videoPlayer
  },
  data() {
    return {
      playerOptions: {
        muted: true,
        language: 'zh-CN',
        fluid:true,
        aspectRatio: '16:9',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: "video/mp4",
          src: 'http://superlink.top/web/video.mp4'
        }],
        poster: 'http://superlink.top/web/video_post.png'
      },
      searchWord: "",
      searchResult: {},
      countInfo: {
        carrierCount: 0,
        installerCount: 0,
        merchantCount: 0,
        driverCount: 0
      },
      modelList: [
        {
          name: "订单管理",
          icon: "xhefont xhe-dingdanguanli"
        },
        {
          name: "预约服务",
          icon: "xhefont xhe-yuyuefuwu"
        },
        {
          name: "调度派单",
          icon: "xhefont xhe-tiaodupaidan"
        },
        {
          name: "配装信息",
          icon: "xhefont xhe-peizhuangxinxi"
        },
        {
          name: "评价管理",
          icon: "xhefont xhe-pingfen"
        },
        {
          name: "异常管理",
          icon: "xhefont xhe-yichangguanli"
        },
        {
          name: "配装经理",
          icon: "xhefont xhe-peizhuangjingli"
        },
        {
          name: "商户信息",
          icon: "xhefont xhe-shanghuxinxi"
        },
        {
          name: "服务商",
          icon: "xhefont xhe-fuwushang"
        },
        {
          name: "车辆信息",
          icon: "xhefont xhe-cheliangxinxi"
        },
        {
          name: "服务人员",
          icon: "xhefont xhe-fuwurenyuan"
        },
        {
          name: "在途跟踪",
          icon: "xhefont xhe-zaitugenzong"
        },
        {
          name: "订单轨迹",
          icon: "xhefont xhe-dingdanguiji"
        },
        {
          name: "订单统计",
          icon: "xhefont xhe-dingdantongji"
        },
        {
          name: "客户满意度",
          icon: "xhefont xhe-kehumanyidu"
        },
        {
          name: "装配统计",
          icon: "xhefont xhe-zhuangpeitongji"
        },
        {
          name: "司机统计",
          icon: "xhefont xhe-sijitongji"
        },
        {
          name: "车辆统计",
          icon: "xhefont xhe-cheliangtongji"
        }
      ],
      roleList: [
        {
          roleUuid: "merchant",
          roleName: "商户入驻",
          content:
            "自主注册，高效入驻，下单、派单、配装、评价全流程可视化，更有派单、配装服务托管，使配装更智能，更高效。",
          img: "http://superlink.top/web/icon_merchant.png"
        },
        {
          roleUuid: "carrier",
          roleName: "服务商入驻",
          disabled: true,
          content:
            "提供多服务商协同作业平台，自主注册，根据服务商配送区域和实际运输能力，智能推荐订单，实现利益最大化。",
          img: "http://superlink.top/web/icon_carrier.png"
        },
        {
          roleUuid: "driver",
          roleName: "司机入驻",
          content:
            "车队、个体司机均可注册平台，海量订单池，支持智能分单、在线抢单等多种模式，司机APP简单易用，使配送更简单。",
          img: "http://superlink.top/web/icon_driver.png"
        }
      ],
      reasonList: [
        {
          roleUuid: "zhuanye",
          roleName: "专业",
          content: "专业的服务平台，专业的服务商，资质认证的司机。",
          img: require("@/assets/images/home/zhuanye.png")
        },
        {
          roleUuid: "zhineng",
          roleName: "智能",
          content: "排线算法智能分单，商户托管无忧派单，配送线路智能规划。",
          img: require("@/assets/images/home/zhineng.png")
        },
        {
          roleUuid: "gaoxiao",
          roleName: "高效",
          content:
            "注册认证快速，商户下单便捷，在途监控透明，司机APP简单易用。",
          img: require("@/assets/images/home/gaoxiao.png")
        },
        {
          roleUuid: "shengxin",
          roleName: "省心",
          content: "省自购车辆管理，省配装人员管理，降低配送成本，货损必赔。",
          img: require("@/assets/images/home/shengxin.png")
        }
      ],
      joinList: [
        {
          name: "入驻商户",
          number: "merchantCount",
          unit: "家"
        },
        {
          name: "入驻服务商",
          number: "carrierCount",
          unit: "家"
        },
        {
          name: "入驻司机",
          number: "driverCount",
          unit: "名"
        },
        {
          name: "入驻安装工",
          number: "installerCount",
          unit: "名"
        }
      ]
    };
  },
  mounted() {
    settledInfoStat({}).then(res => {
      if (!res.error) {
        this.countInfo = res;
      }
    });
  },
  methods: {
    dateFormatter(date) {
      if (date) {
        return moment(date).format("YYYY-MM-DD HH:mm");
      }
    },
    waybillSearch() {
      if (this.searchWord) {
        tranInfo({ waybillNo: this.searchWord }).then(res => {
          if (!res.error) {
            this.searchResult = res;
          }
        });
      }
    },
    chooseRole(route) {
      if (val) {
        this.$router.push({
          path: "/signin",
          query: { roleType: route.roleUuid }
        });
      }
    },
      // listen event
      onPlayerPlay(player) {
        console.log('player play!', player)
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      onPlayerEnded(player) {
        // console.log('player ended!', player)
      },
      onPlayerLoadeddata(player) {
        // console.log('player Loadeddata!', player)
      },
      onPlayerWaiting(player) {
        // console.log('player Waiting!', player)
      },
      onPlayerPlaying(player) {
        // console.log('player Playing!', player)
      },
      onPlayerTimeupdate(player) {
        // console.log('player Timeupdate!', player.currentTime())
      },
      onPlayerCanplay(player) {
        // console.log('player Canplay!', player)
      },
      onPlayerCanplaythrough(player) {
        // console.log('player Canplaythrough!', player)
      },

      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },

      // player is ready
      playerReadied(player) {
        console.log('example 01: the player is readied', player)
      }
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
  height: 600px;
  color: #fff;
  margin: 0;
  background: url("../../assets/images/home/banner@2x.png") no-repeat;
  background-size: cover;
  background-position: 100% 100%;
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
.role_container {
  display: flex;
  width: 1240px;
  text-align: center;
  justify-content: space-around;
  margin: 0 auto;
  .role_name {
    font-size: 20px;
    color: rgba(51, 51, 51, 1);
    line-height: 28px;
    margin-top: 30px;
  }
  .content {
    font-size: 12px;
    color: rgba(51, 51, 51, 1);
    line-height: 20px;
    width: 280px;
    margin-top: 30px;
  }
  .reason {
    img.icon {
      height: 130px;
    }
    .role_name {
      margin-top: 50px;
    }
    .content {
      width: 250px;
      margin-top: 10px;
    }
  }
  .role_item {
    img {
      width: 72px;
    }
  }
  .role_item.active {
    border: 3px solid blue;
    box-shadow: 0 1px 6px 0 rgba(72, 79, 128, 0.45);
  }
}
.join_number {
  height: 300px;
  background: url("../../assets/images/home/bg@2x.png") no-repeat;
  background-size: cover;
  background-position: 100% 100%;
  > div {
    display: flex;
    width: 1240px;
    margin: 30px auto 10px auto;
    justify-content: space-around;
    color: rgba(255, 255, 255, 1);
  }
  .number_box {
    width: 300px;
    text-align: center;
  }
  .right_border {
    border-right: 1px solid #fff;
  }
  .name {
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 25px;
  }
  .number {
    font-size: 48px;
    font-weight: 600;
    line-height: 67px;
  }
}
.model_container {
  display: flex;
  flex-wrap: wrap;
  width: 1240px;
  margin: 0 auto;
  .model_item {
    padding: 0.8rem;
    width: 200px;
    text-align: center;
    margin-bottom: 1rem;
    i {
      font-size: 44px;
    }
    .model_name {
      font-size: 16px;
      color: #333333;
      padding: 8px;
    }
  }
}

.infomation_container {
  color: $base-white-color;
  .info_item:nth-child(2) {
    background: #f6f6f6;
  }
  .info_item {
    padding: 3rem 0;
    display: flex;
    justify-content: center;
    .img_container {
      padding: 3rem;
      width: 40%;
      img {
        width: 100%;
      }
    }
    .content_container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 3rem;
      width: 40%;
      p {
        padding-top: 0.8rem;
        margin-bottom: 0;
        width: 100%;
        font-size: 14px;
        color: #333;
      }
    }
  }
  .common_btn {
    display: block;
    cursor: pointer;
    margin-top: 2rem;
    text-decoration: none;
    text-align: center;
    width: 118px;
    height: 36px;
    line-height: 36px;
    background: #24a9f0;
    box-shadow: 0px 4px 7px 0px rgba(0, 0, 0, 0.08),
      2px 5px 10px 8px rgba(36, 169, 240, 0.23);
    border-radius: 28px;
    color: white;
  }
}
.result_mask {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
}
.search_result {
  background: #fff;
  margin-top: 10px;
  padding: 20px;
  // outline: 10000px solid #00000099;
  position: relative;
  .close_btn {
    position: absolute;
    cursor: pointer;
    font-size: 20px;
    color: #000;
    right: 10px;
    top: 0px;
  }
  .ant-timeline-item-content {
    display: flex;
  }
  .time,
  .content {
    color: #666;
    display: inline-block;
    margin-right: 20px;
    font-size: 14px;
  }
}
.video{
  background: rgba(244,244,244,1);
  position: relative;
  .title{
      position: absolute;
      // top:0;
      left:calc((100% - 1240px)/2);
      text-align:left;
      .hr{
        margin: 2rem auto 1rem auto;
      }
    }
  .video_content{
    display:flex;
    width: 1240px;
    margin: 0 auto;
    .img_container{
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      img{
        width: 344px;
      }
    }
    .ctms_video{
      width: 50%;
      padding: 20px;
    }
  }
}
</style>

<style lang="scss">
.vjs-big-play-button{
    left: 50% !important;
    top: 50% !important;
    transform: translate(-50%,-50%);
}
</style>
