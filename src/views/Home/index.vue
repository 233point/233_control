<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-26 10:19:19
 * @LastEditTime: 2019-09-06 15:13:19
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="container">
    <section>
      <div class="title">
        <div class="tips">功能清单</div>
        <div class="hr"></div>
      </div>
      <div class="function_container">
        <div class="function_item" v-for="(item,key,index) in functionList" :key="index">
          <div class="item__title">{{key}}</div>
          <div class="item__detail" v-for="(detail,index2) in functionList[key]" :key="index2">
            <el-checkbox v-model="detail.status" disabled></el-checkbox>{{detail.name}}
          </div>
        </div>
      </div>
    </section>
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
      }
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
      margin: 2rem auto 5rem auto;
    }
  }
}

</style>

