<template>
  <div class="user-info">
    <simple-tabs v-model="controlType" @change="changeControlType">
      <tab-item
        v-for="(item, index) in tabList"
        :key="index"
        :label="item.name"
        :value="item.index"
      ></tab-item>
    </simple-tabs>
    <div class="control_container">
      <a-row :gutter="16">
        <a-col v-for="(item, index) in controlList" :key="index" :span="8">
          <!-- status = 1 已配置项 -->
          <a-card class="xhe_card finished" v-if="item.status == 1">
            <div class="content_container">
              <div class="status_img">
                <div class="img active">已</div>
              </div>
              <div class="content">
                <div>{{ item.title }}</div>
                <div>{{ item.des }}</div>
              </div>
            </div>
            <div class="control_status">
              <div>
                <span></span>
                <span>通过</span>
                <span>2019-07-29</span>
              </div>
              <div>
                <a-icon type="ellipsis" />
              </div>
            </div>
          </a-card>
          <!-- 未配置项 -->
          <a-card class="xhe_card" v-else>
            <div class="content_container">
              <div class="status_img">
                <div class="img">
                  未
                </div>
              </div>
              <div class="content">
                <div>{{ item.title }}</div>
                <div>{{ item.des }}</div>
              </div>
            </div>
            <div class="control_status finished">
              <el-button type="text">添加</el-button>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { simpleTabs, TabItem } from "@/components/simpleTabs";

const list = [
  {
    title: "功能 1",
    status: 1,
    des: "说明功能"
  },
  {
    title: "功能 2",
    status: 2,
    des: "说明功能"
  },
  {
    title: "功能 3",
    status: 1,
    des: "说明功能"
  },
  {
    title: "功能 4",
    status: 1,
    des: "说明功能"
  }
];

export default {
  name: "ControlConfig",
  computed: {
    ...mapGetters(["userAccount", "userName"]),
    controlList() {
      switch (this.tabList) {
        case "finished":
          return list.filter(res => {
            res.status == 1;
          });
          break;
        case "not":
          return list.filter(res => {
            res.status == 2;
          });
          break;
        case "all":
          return list;
          break;
        default:
          return list;
      }
    }
  },
  mounted() {
    this.controlType = "finished";
  },
  data() {
    return {
      controlType: "finished",
      tabList: [
        {
          name: "已添加",
          index: "finished"
        },
        {
          name: "未添加",
          index: "not"
        },
        {
          name: "全部",
          index: "all"
        }
      ]
    };
  },
  methods: {
    changeControlType(val) {
      console.log("val", this.controlType);
    }
  }
};
</script>
<style lang="scss" scoped>
.control_container {
  margin-bottom: 1.5rem;
}
.user-info {
  padding-top: 1rem;
  .control_container {
    .xhe_card {
      margin-top: 1rem;
      .content_container {
        display: flex;
        align-items: flex-start;
        .status_img {
          padding: 0 1rem;
          .img {
            font-size: 16px;
            height: 34px;
            width: 34px;
            line-height: 34px;
            background-color: #e6ebf5;
            color: white;
            text-align: center;
          }
          .img.active {
            background-color: var(--color-primary) !important;
          }
        }
        .content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          div:nth-child(1) {
            font-size: 14px;
            color: #333;
          }
          div:nth-child(2) {
            font-size: 12px;
            color: #909399;
            padding-top: 0.2rem;
          }
        }
      }
      .control_status.finished {
        justify-content: center !important;
      }
      .control_status {
        margin-top: 1rem;
        padding: 1rem;
        border-top: 1px solid #dcdcdc;
        height: 18px;
        line-height: 18px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        div:nth-child(1) {
          font-size: 12px;
          span:nth-child(1) {
            background-color: var(--color-primary);
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 100%;
          }
          span:nth-child(3) {
            color: #dcdcdc;
          }
        }
        div:nth-child(2) {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
