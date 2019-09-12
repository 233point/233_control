<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 10:19:19
 * @LastEditTime: 2019-09-06 15:13:19
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="container">
    <el-row>
      <el-col :span="16">
        <section class="shotScreen_container triangle">
          <div class="title">
            <div class="tips">部分截图</div>
            <div class="hr"></div>
          </div>
          <el-row>
            <el-col :span="8" v-for="item in shotScreenList" :key="item">
              <img class="shotScreen__item" :src="item" alt="">
            </el-col>
          </el-row>
        </section>
        <section class="triangle function_container">
          <div class="title">
            <div class="tips">功能清单</div>
            <div class="hr"></div>
          </div>
          <div class="function_body">
            <div class="function_item" v-for="(item,key,index) in functionList" :key="index">
              <div class="item__title">{{key}}</div>
              <div class="item__detail" v-for="(detail,index2) in functionList[key]" :key="index2">
                <el-checkbox v-model="detail.status" disabled></el-checkbox>
                {{detail.name}}
              </div>
            </div>
          </div>
        </section>
      </el-col>
      <el-col :span="8">
        <section class="triangle applet_container">
          <div class="title">
            <div class="tips">小程序体验</div>
            <div class="hr"></div>
          </div>
          <div>
            <img
              src="https://233.calamus.xyz/233%E6%AC%A1%E5%85%83%E5%B0%8F%E7%A8%8B%E5%BA%8F.jpg"
              alt=""
            >
          </div>
        </section>
        <section class="triangle">
          <div class="title">
            <div class="tips">更新日志</div>
            <div class="hr"></div>
          </div>
          <div class="changelog_container">
            <el-timeline>
              <el-timeline-item
                v-for="(activity, index) in logList"
                :key="index"
                :icon="activity.icon"
                :type="activity.type"
                :color="activity.color"
                :size="activity.size"
                :timestamp="activity.timestamp"
              >{{activity.content}}</el-timeline-item>
            </el-timeline>
          </div>
        </section>
      </el-col>
    </el-row>
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
      functionList:{
        '新番推荐':[
          {name:'首页轮播',status:true},
          {name:'广告',status:true},
          {name:'新番推荐',status:true},
          {name:'查看更多',status:false},
          {name:'追番',status:false},
          {name:'评分',status:false},
          {name:'时间轴',status:false},
        ],
        '番剧索引':[
          {name:'标签分类',status:true},
          {name:'搜索',status:false},
          {name:'查看详情',status:false},
          {name:'追番',status:false},
          {name:'评论',status:false},
          {name:'评分',status:false}
        ],
        '图片推荐':[
          {name:'首页轮播',status:true},
          {name:'广告',status:true},
          {name:'新番推荐',status:true},
          {name:'查看更多',status:false},
          {name:'追番',status:false},
          {name:'评分',status:false},
          {name:'时间轴',status:false},
        ],
        '图片展示':[
          {name:'轮播展示',status:true},
          {name:'作者分类',status:true},
          {name:'查看图片',status:true},
          {name:'收藏图片',status:false},
          {name:'下载图片',status:false},
          {name:'点赞',status:false}
        ],
        '漫画推荐':[
          {name:'首页轮播',status:true},
          {name:'广告',status:true},
          {name:'新番推荐',status:true},
          {name:'查看更多',status:false},
          {name:'追番',status:false},
          {name:'评分',status:false},
          {name:'时间轴',status:false},
        ],
        '漫画索引':[
          {name:'标签分类',status:true},
          {name:'搜索',status:false},
          {name:'查看详情',status:false},
          {name:'追番',status:false},
          {name:'评论',status:false},
          {name:'评分',status:false}
        ],
        '个人中心':[
          {name:'登录',status:false},
          {name:'注册',status:false},
          {name:'已追番',status:false},
          {name:'已收藏',status:false},
          {name:'漫画屋',status:false},
          {name:'个人主页',status:false},
          {name:'个人信息修改',status:false},
          {name:'动态信息',status:false}
        ],
      },
      logList: [{
          content: 'uni-app小程序端，node后端，数据维护',
          timestamp: 'v2.0.0',
          size: 'large',
          type: 'primary',
          icon: 'el-icon-more'
        }, {
          content: 'wepy云开发',
          timestamp: 'v1.0.0',
          color: '#0bbd87'
        }, {
          content: '小程序原生开发，纯静态',
          timestamp: 'v0.5.0',
          size: 'large'
        }],
      shotScreenList:['https://233.calamus.xyz/image/233/233show1.jpeg','https://233.calamus.xyz/image/233/233show2.jpeg','https://233.calamus.xyz/image/233/233show3.jpeg']
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
.container {
  min-height: calc(100vh - 66px);
  padding-top:80px;
  // color: #fff;
  margin: 0;
  background: url("https://cdn.calamus.xyz/blog_ali/calamus_02.png") no-repeat;
  background-size: cover;
  background-position: right top;
  background-attachment: fixed;
  background-repeat: no-repeat;
  .title {
    text-align: center;
    .tips {
      font-size: 18px;
    }
    .hr {
      display: inline-block;
      width: 48px;
      height: 2px;
      background: var(--color-primary);
      margin: 2rem auto 2rem auto;
    }
  }
  section{
    // background-color: #fff;
    padding: 20px;
    border: 1px #f2f2f2 solid;
    position: relative;
    font-size: 12px;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 3px 20px 3px rgba(0, 64, 128, .2);
    margin:1rem;
  }
  .triangle{
    &:before{
      position: absolute;
      top: 0;
      left: 0;
      content: '';
      height: 0;
      width: 0;
      display: block;
      border: 8px transparent solid;
      border-bottom-width: 0;
      border-left-width: 0;
      border-top-color: #e1244e;
      z-index: 10;
    }
  }
}
.applet_container{
  text-align:center;
  img{
    width:275px;
    padding-bottom:4rem;
  }
}
.shotScreen_container{
  .shotScreen__item{
    width: 100%;
    padding: 0 2rem;
  }
}
.function_container{
  .function_body{
    display: flex;
    justify-content: space-around;
    .function_item{
      .item__title{
        font-size:16px;
        color:#e07499;
      }
    }
  }
}
</style>

