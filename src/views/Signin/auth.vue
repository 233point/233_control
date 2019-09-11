<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 15:39:25
 * @LastEditTime: 2019-08-30 11:10:55
 * @LastEditors: Please set LastEditors
 -->
<template>
  <common-content :flex="100">
    <a-steps class="auth_steps" :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title">
        <a-icon :type="item.icon" slot="icon" />
      </a-step>
    </a-steps>
    <div class="login_detail">
      <div v-if="current == 0">
        {{ roleType == "carrier" ? "服务商入驻" : "商户入驻" }}
      </div>
      <div v-else class="finish" v-loading="loadingMerchants">
        <div class="tips" v-if="!showEdit">
          <span> <a-icon type="smile-o" />审核成功 </span>
          <div class="log">
            <a-collapse defaultActiveKey="1" :bordered="false">
              <a-collapse-panel
                v-if="
                  merchantInfo.approvalList &&
                    merchantInfo.approvalList.length > 0
                "
                header="审核日志"
                key="1"
              >
                <a-timeline :reverse="true">
                  <a-timeline-item
                    v-for="(item, index) in merchantInfo.approvalList"
                    :key="index"
                  >
                    <p class="time">{{ timeFormatter(item.date) }}</p>
                    <p class="content">{{ item.result }}:{{ item.details }}</p>
                  </a-timeline-item>
                </a-timeline>
              </a-collapse-panel>
              <a-collapse-panel header="认证信息" key="2">
                <carrier-detail v-if="roleType == 'carrier'" />
                <merchant-detail v-else />
              </a-collapse-panel>
            </a-collapse>
          </div>
          <br />
          <br />
          <div class="flex">
            <a href="javascript:;" class="login_btn" @click.stop="editAgain"
              >编辑{{
                $store.state.user.roleType == "merchant" ? "商户" : "服务商"
              }}信息</a
            >
            <a href="javascript:;" class="login_btn" @click.stop="toDash"
              >回首页</a
            >
          </div>
        </div>
        <div v-else>
          <carrier-login
            v-if="roleType == 'carrier'"
            :edit="editable"
          ></carrier-login>
          <merchant-login v-else :edit="editable"></merchant-login>
        </div>
      </div>
    </div>
  </common-content>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";
import { getRoleList } from "@/api/user";
import CommonContent from "@/components/commonContent";
import MerchantLogin from "./authComponents/merchantLogin.vue";
import MerchantDetail from "./authComponents/merchantDetail.vue";
import CarrierLogin from "./authComponents/carrierLogin.vue";
import CarrierDetail from "./authComponents/carrierDetail.vue";

export default {
  name: "LoginAuth",
  components: {
    MerchantLogin,
    CommonContent,
    CarrierLogin,
    MerchantDetail,
    CarrierDetail
  },
  data() {
    return {
      roleList: [],
      role: "",
      current: 1,
      editable: false,
      showEdit: false,
      loadingMerchants: false,
      authorizedStatus: "",
      steps: [
        {
          title: "商户入驻",
          status: "finish",
          icon: "user",
          content: "First-content"
        },
        {
          title: "资质审核",
          status: "process",
          icon: "snippets",
          content: "Second-content"
        },
        {
          title: "完成",
          status: "wait",
          icon: "smile-o",
          content: "Last-content"
        }
      ],
      merchantInfo: {}
    };
  },
  mounted() {
    this.steps[0].title =
      this.$store.state.user.roleType == "merchant" ? "商户入驻" : "服务商入驻";
    this.loadingMerchants = true;
    this.$store
      .dispatch("getMerchantInfo", this.$store.state.user.roleType)
      .then(merchantInfo => {
        this.loadingMerchants = false;
        this.merchantInfo = Object.assign({}, merchantInfo);
        if (
          this.merchantInfo &&
          this.merchantInfo.approval &&
          this.merchantInfo.approval.trim() == "审核成功"
        ) {
          this.current = 2;
          this.editable = false;
          this.showEdit = false;
        } else {
          this.current = 1;
          if (
            this.merchantInfo &&
            this.merchantInfo.approval &&
            this.merchantInfo.approval.trim() == "审核中"
          ) {
            this.editable = false;
            this.showEdit = true;
          } else if (
            this.merchantInfo &&
            this.merchantInfo.approval &&
            this.merchantInfo.approval.trim() == "待提交"
          ) {
            this.editable = true;
            this.showEdit = true;
          } else {
            this.editable = true;
            this.showEdit = true;
          }
        }
      });
  },
  computed: {
    ...mapGetters(["roleType"])
  },
  methods: {
    toDash() {
      this.$router.push("/dash");
    },
    editAgain() {
      this.editable = false;
      this.showEdit = true;
    },
    timeFormatter(time) {
      if (time) {
        return moment(time).format("YYYY-MM-DD HH:mm:ss");
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.auth_steps {
  width: 50%;
  margin: 2rem auto;
}
.login_detail {
  .finish {
    .tips {
      text-align: center;
      min-height: 200px;
    }
    .log {
      text-align: left;
      width: 50%;
      margin: 0 auto;
      .ant-collapse-header {
        font-size: 16px !important;
      }
    }
    span {
      font-size: 20px;
    }
  }
}
.login_btn,
.sigin_btn {
  padding: 8px 25px;
}
.login_btn {
  border: 1px solid rgba(255, 255, 255, 1);
  color: white;
  background: var(--color-primary);
  &:hover {
    border: 1px solid transparent;
    color: var(--color-primary);
    background: white;
  }
}
</style>
