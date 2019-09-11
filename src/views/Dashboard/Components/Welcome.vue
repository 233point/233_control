<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-27 19:02:36
 * @LastEditTime: 2019-09-05 11:07:55
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="wrapper">
    <div class="welcome_card">
      <div class="welcomt_title">
        <div>
          <img :src="logo" alt="">
        </div>
        <div>
          <div>{{ userName || '侍奉无上至尊的人' }}</div>
          <div>每一个不曾起舞的日子，都是对生命对辜负。</div>
        </div>
      </div>
      <div class="tongji_content">
        <div class="tongji_item">
          <div class="tongji_title">累计番剧</div>
          <div class="tongji_number">{{ statData.driverCount || 0}}</div>
        </div>
        <div class="shu_line"></div>
        <div class="tongji_item">
          <div class="tongji_title">本季新增</div>
          <div class="tongji_number">{{ statData.todayWaybillCount || 0 }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  props: {
    statData: {
      type: Object
    }
  },
  data() {
    return {
      logo: "https://cdn.calamus.xyz/leimu.jpeg"
    };
  },
  watch: {},
  computed: {
    ...mapGetters([
      "userAccount",
      "userName",
      "avatar",
      "userLogo",
      "token",
      "merchantInfo"
    ])
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
@keyframes rotateIn {
    from {
        transform: translate3d(0, 0, 0);
        opacity: 0;
    }
    to {
        transform: rotate3d(0, 0, 1, 360deg);
        opacity: 0.6;
    }
}
.wrapper {
  .welcome_card {
    transition: all 0.3s linear;
    padding: 40px 20px;
    margin: 10px;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    &:hover {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    }
    display: flex;
    .welcomt_title {
      display: flex;
      flex: 1 0 auto;
      > div {
        > div:nth-child(1) {
          font-size: 22px;
          color: #000;
          margin-bottom: 10px;
        }
      }
    }
    .tongji_content {
      display: flex;
      width: 420px;
      .tongji_item {
        width: 120px;
        text-align: center;
      }
      .shu_line {
        width: 1px;
        height: 45px;
        border-left: 1px solid rgba(233, 233, 233, 1);
      }
      .tongji_number {
        font-size: 22px;
        color: #000;
      }
      .total_number {
        font-size: 12px;
        color: #666;
      }
    }
    .user_logo {
      width: 55px;
      height: 55px;
      margin-right: 20px;
    }
    img {
      height: 60px;
      margin-right: 30px;
      border-radius: 100%;
      &:hover{
        animation: rotateIn 1000ms both
      }
    }
  }
}
</style>
