<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-24 10:16:32
 * @LastEditTime: 2019-09-02 18:44:27
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-header
    v-show="!windowMaxState"
    id="header"
    class="header"
    :height="headerHeight"
  >
    <!-- <div class="menu-control"      @mouseover="menuVisible = true" @click="menuVisible = true">
      <a-icon :type="menuVisible ? 'menu-fold' : 'menu-unfold'"/>
    </div> -->
    <div class="logo" @click="backTohome">
      <img :src="logoUrl" alt="xhe" />
    </div>
    <div class="center">
      <header-shortcut :menu="shortcutMenu" />
    </div>
    <div class="settings">
      <ul>
        <li>
          <a-popover placement="bottomRight">
            <template slot="content">
              <user-info />
            </template>
            <span class="name" id="userInfo">
              <img class="user_avater" v-if="userLogo" :src="userLogo" alt="" />
              {{ userName || userAccount }}
              <a-icon type="caret-down" />
            </span>
          </a-popover>
        </li>
        <li>
          <el-popover placement="bottom" width="300" trigger="hover">
            <el-alert title="暂无消息" type="info" :closable="false">
            </el-alert>
            <el-badge
              :value="num"
              class="item"
              :max="99"
              slot="reference"
              :hidden="num == 0"
            >
              <a-icon style="font-size:18px;" type="sound" />
            </el-badge>
          </el-popover>
        </li>
        <li>
          <el-tooltip
            class="item"
            effect="light"
            content="全屏"
            placement="bottom"
          >
            <screen-full id="screenfull" class="right-menu-item hover-effect" />
          </el-tooltip>
        </li>
        <li>
          <el-tooltip
            class="item"
            effect="light"
            content="系统引导"
            placement="bottom"
          >
            <a-icon
              style="font-size:18px;"
              type="question-circle"
              @click.prevent.stop="guide"
            />
          </el-tooltip>
        </li>
        <li>
          <el-tooltip
            class="item"
            effect="light"
            content="换肤"
            placement="bottom"
          >
            <theme-picker @change="themeChange" />
          </el-tooltip>
        </li>
      </ul>
    </div>
    <!-- <a-drawer
      placement="left"
      :closable="false"
      @close="menuVisible = false"
      :visible="menuVisible"
      getContainer="main"
      wrapClassName="xhe-header-menu"
      width="auto"
    >
      <sidebar v-bind:style="{width: sidebarState.width}"></sidebar>
    </a-drawer> -->
  </el-header>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";

import PersonalSetting from "./Settings";
import HeaderShortcut from "./HeaderShortcut";
import sidebar from "./Sidebar";

// api
import { commonLogout } from "@/api/my";

import Driver from "driver.js"; // import driver.js
import "driver.js/dist/driver.min.css"; // import driver.js css
import steps from "@/utils/step";
import ThemePicker from "@/components/ThemePicker";
import ScreenFull from "@/components/ScreenFull";
import UserInfo from "./UserInfo/index";

export default {
  name: "Headers",
  data() {
    return {
      num: 0,
      dayTime: "",
      commonDialog: null,
      driver: null,
      menuVisible: false,
      logoUrl: "http://superlink.top/web/com_logo_blue.png"
    };
  },
  computed: {
    ...mapGetters([
      "sidebarState",
      "windowMaxState",
      "userAccount",
      "userName",
      "avatar",
      "userLogo",
      "token",
      "shortcutMenu",
      "windowMaxState",
      "headerHeight"
    ])
  },
  watch: {
    $route() {
      this.menuVisible = false;
    }
  },
  mounted() {
    this.driver = new Driver({
      className: "scoped-class", // className to wrap driver.js popover
      animate: true, // Whether to animate or not
      allowClose: false, // Whether the click on overlay should close or not
      overlayClickNext: false, // Whether the click on overlay should move next
      doneBtnText: "完成", // Text on the final button
      closeBtnText: "关闭", // Text on the close button for this step
      nextBtnText: "下一页 ➡", // Next button text for this step
      prevBtnText: "⬅上一页", // Previous button text for this step
      keyboardControl: true // Allow controlling through keyboard (escape to close, arrow keys to move)
    });
    const now = parseInt(moment().format("HH"));
    if (now < 12) this.dayTime = "早上";
    else if (now >= 12 && now < 18) this.dayTime = "下午";
    else if (now >= 18 && now <= 23) this.dayTime = "晚上";
    else this.dayTime = "";
  },
  methods: {
    guide() {
      this.driver.defineSteps(steps);
      this.driver.start();
    },
    backTohome() {
      this.$router.push({ name: "Home" });
    },
    themeChange(val) {
      this.$store.dispatch("changeThemeVar", val);
    },
    settingPersonal() {
      this.$router.push({ name: "PersonalSettings" });
    },
    modifyPassword() {
      this.$router.replace({ path: "/modify-password" });
    },
    logout() {
      this.$confirm("确认要登出系统吗？", "提醒", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          // commonLogout({ token: this.token }).then(res => {
          this.$store.dispatch("userLogout").then(() => {
            location.reload();
          });
          // })
        })
        .catch(() => {});
    }
  },
  components: {
    PersonalSetting,
    HeaderShortcut,
    ThemePicker,
    ScreenFull,
    sidebar,
    UserInfo
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  padding: 0;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.08);
  background-color: #fff;
  // color: lighten($base-light-color, 100%);
  // border-bottom: 1px solid  darken($base-light-color, 10%);
  .menu-control {
    font-size: 18px;
    line-height: 50px;
    background: var(--color-primary);
    color: white;
    i {
      padding: 8px 21px;
    }
  }
  .logo {
    cursor: pointer;
    line-height: 49px;
    padding-left: 2rem;
    img {
      height: 24px;
      background: #fff;
    }
  }
  .center {
    flex: 1;
    position: relative;
  }

  .user {
    display: inherit;
    @include flexCenter();
    cursor: pointer;
    span {
      display: inline-block;
      &.avatar {
        width: 20px;
        height: 20px;
        margin-right: 10px;
        border-radius: 20px;
        background-color: lighten($base-dark-color, 15%);
        overflow: hidden;

        > img {
          width: 20px;
          height: 20px;
        }
      }
      &.name {
        .user_avater {
          height: 25px;
        }
      }
    }
  }

  .settings {
    ul {
      display: flex;
      flex-direction: row;
      height: 100%;

      li {
        font-size: 1rem;
        display: inherit;
        @include flexCenter;
        flex: 1 auto;
        padding: 0 15px;
        cursor: pointer;

        span:before {
          margin-right: 5px;
        }

        > div {
          font-size: 1rem;
          font-weight: 400;
          color: $base-dark-color;
        }
      }

      .zvpfont:before {
        margin-right: 5px;
      }
    }
  }
}
.user_avater {
  height: 25px;
  margin-right: 5px;
}
</style>
