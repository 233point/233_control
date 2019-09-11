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
        <!-- <div class="user_logo" :style="{background:'url('+userLogo+')'}"></div> -->
        <div>
          <img :src="logo" alt="" />
        </div>
        <div>
          <div>早安，{{ userName || userAccount }}，祝你开心每一天！</div>
          <div>
            <span v-if="merchantInfo.compBrif">{{ merchantInfo.compBrif }}</span>
            <span v-if="merchantInfo.compBrif && merchantInfo.city">|</span>
            <span v-if="merchantInfo.city">{{ merchantInfo.city }}</span>
          </div>
        </div>
      </div>
      <div class="tongji_content">
        <div
          class="tongji_item"
          v-if="$store.getters.roleType.includes('merchant')"
        >
          <div class="tongji_title">服务司机</div>
          <div class="tongji_number">{{ statData.driverCount }}</div>
        </div>
        <div class="tongji_item" v-else-if="!($store.getters.roleType.includes('regionMarcketManager') || $store.getters.roleType.includes('regionManager') || $store.getters.roleType.includes('marcketManager') || $store.getters.roleType.includes('cityManager'))">
          <div class="tongji_title">服务商户</div>
          <div class="tongji_number">{{ statData.merchantCount }}</div>
        </div>
        <div class="shu_line" v-if="$store.getters.roleType.includes('merchant') || ($store.getters.roleType.includes('regionMarcketManager') || $store.getters.roleType.includes('regionManager') || $store.getters.roleType.includes('marcketManager') || $store.getters.roleType.includes('cityManager'))"></div>
        <!-- <div class="tongji_item">
              <div class="tongji_title">单量排名</div>
              <div class="tongji_number"><span>3</span><span class="total_number">/510</span></div>
          </div>
          <div class="shu_line"></div> -->
        <div class="tongji_item">
          <div class="tongji_title">今日订单</div>
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
      logo: "http://superlink.top/web/Gradual_change.png"
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
      height: 40px;
      margin-right: 30px;
      border-radius: 20px;
    }
  }
}
</style>
