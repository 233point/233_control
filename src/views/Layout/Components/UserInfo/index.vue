<template>
  <div class="userinfo">
    <section class="control">
      <a href="javascript:;" @click="detail">基本信息</a>
      <a-divider type="vertical" />
      <a
        v-if="roleType == 'merchant' || roleType == 'carrier'"
        href="javascript:;"
        @click="auth"
        >资格认证</a
      >
      <a-divider
        v-if="roleType == 'merchant' || roleType == 'carrier'"
        type="vertical"
      />
      <a href="javascript:;" @click="modifyPassword">修改密码</a>
    </section>
    <section class="ad">
      <ul>
        <!-- <li v-if="roleType == 'assemblyManager'">
          <a href="#" @click="settingMerchants">
            <a-icon type="hdd" />
            绑定商户</a
          >
        </li> -->
        <li>
          <a href="#" v-if="roleType != 'assemblyManager'" @click="settingPersonal">
            <i class="xhefont xhe-set" />
            个性化设置</a
          >
        </li>
      </ul>
    </section>
    <section class="logout" :class="roleType != 'assemblyManager'?'border-t':''">
      <a href="javascript:;" @click="logout">
        <i class="fdddfont icon-logout" />
        退出登录</a
      >
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UserInfo",
  computed: {
    ...mapGetters(["roleType"])
  },
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$confirm("确认要登出系统吗？", "提醒", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          this.$store.dispatch("userLogout").then(() => {
            location.reload();
          });
        })
        .catch(() => {});
    },
    settingPersonal() {
      this.$router.push({ name: "PersonalSettings" });
    },
    settingMerchants() {
      this.$router.push({ name: "MerchantsSettings" });
    },
    modifyPassword() {
      this.$router.replace({ path: "/modify-password" });
    },
    detail() {
      this.$router.replace({ path: "/modify-detail" });
    },
    auth() {
      this.$router.replace({ path: "/auth" });
    }
  }
};
</script>

<style lang="scss" scoped>
.userinfo {
  a {
    font-size: 1rem;
    color: #333;
    &:hover {
      color: var(--color-primary);
    }
  }
  section {
    padding: 8px 0;
  }
  .ad {
    ul {
      li {
        padding: 0.5rem 0;
        i {
          color: var(--color-primary) !important;
          font-size: 16px;
          padding-right: 3px;
        }
      }
    }
  }
  .control {
    border-bottom: 1px solid #e8e8e8;
  }
  .border-t{
    border-top: 1px solid #e8e8e8;
  }
  .logout {
    width: 100%;
    text-align: center;
    .fdddfont {
      font-size: 12px;
      line-height: 1rem;
    }
  }
}
</style>
