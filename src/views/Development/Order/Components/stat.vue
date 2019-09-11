<template>
  <div class="order_stat">
    <el-row :gutter="40" class="panel-group">
      <el-col :span="8" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
          <div class="card-panel-icon-wrapper icon-people">
            <i class="peoples el-icon-goods"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              今日下单
            </div>
            <div class="card-panel-num">102400</div>
          </div>
        </div>
      </el-col>
      <el-col :span="8" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('messages')">
          <div class="card-panel-icon-wrapper icon-message">
            <i class="peoples el-icon-goods"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              累计下单
            </div>
            <div class="card-panel-num">81212</div>
            <!-- <count-to :start-val="0" :end-val="81212" :duration="3000" class="card-panel-num" /> -->
          </div>
        </div>
      </el-col>
      <el-col :span="8" class="card-panel-col">
        <div class="card-panel" @click="handleSetLineChartData('purchases')">
          <div class="card-panel-icon-wrapper icon-money">
            <i class="peoples el-icon-goods"></i>
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text">
              累计服务完成
            </div>
            <div class="card-panel-num">9280</div>
            <!-- <count-to :start-val="0" :end-val="9280" :duration="3200" class="card-panel-num" /> -->
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "OrderStat",
  components: {},
  methods: {
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes textExpandIn {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }

  40% {
    opacity: 0.6;
  }

  100% {
    opacity: 1;
  }
}

.panel-group {
  margin-top: 18px;
  margin-left: 0px !important;
  margin-right: 0px !important ;
  .card-panel-col {
    margin-bottom: 1.5rem;
  }
  .card-panel {
    transition: all 0.3s linear;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    &:hover {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
        background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #f4516c;
      }
      .icon-shopping {
        background: #34bfa3;
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shopping {
      color: #34bfa3;
    }
    .card-panel-icon-wrapper {
      margin: 0 1.5rem;
      padding: 16px;

      transition: all 0.38s ease-out;
      border-radius: 6px;
      i {
        font-size: 32px !important ;
      }
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
        animation: textExpandIn 500ms both;
      }
    }
  }
}
</style>
