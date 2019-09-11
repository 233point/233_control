<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-01 11:00:45
 * @LastEditTime: 2019-08-30 09:57:02
 * @LastEditors: Please set LastEditors
 -->
<template>
  <header>
    <div class="logo">
      <a href="javascript:;" @click.stop="getToPath('/')">
        <img
          style="height:24px"
          src="http://superlink.top/web/com_logo_white.png"
          alt=""
        />
      </a>
    </div>
    <!-- <div class="home_route">
        <ul>
          <li>
            <a href="//superlink.top">superLink</a>
          </li> -->
    <!-- <li>
            <a href="javascript:;"  @click.stop="getToPath('/driver-settled')">司机入驻</a>
          </li> -->
    <!-- <li>
            <a href="javascript:;"  @click.stop="getToPath('/signin','carrier')">服务商入驻</a>
          </li>
          <li>
            <a href="javascript:;"  @click.stop="getToPath('/')">解决方案</a>
          </li>
          <li>
            <a href="javascript:;"  @click.stop="getToPath('/')">关于我们</a>
          </li> -->
    <!-- </ul>
      </div> -->
    <div class="control_container">
      <ul>
        <li>
          <a v-if="token" @click="enterConsole">控制台</a>
        </li>
        <li>
          <a-popover placement="bottomRight">
            <template slot="content">
              <user-info />
            </template>
            <span v-if="token" class="name">
              {{ userName ? userName : userAccount }}
              <a-icon type="caret-down" />
            </span>
          </a-popover>
        </li>
        <li v-if="!showLoginBtn">
          <a class="login_btn" v-if="!token" @click="login">登录</a>
        </li>
        <li v-if="!showSigninBtn">
          <a class="sigin_btn" v-if="!token" @click="signin">注册</a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import UserInfo from "../../Layout/Components/UserInfo/index";

export default {
  name: "XheHeader",
  components: { UserInfo },
  computed: {
    ...mapGetters([
      "token",
      "systemTheme",
      "userName",
      "userAccount",
      "userAccount"
    ]),
    showLoginBtn() {
      return this.$route.name == "login";
    },
    showSigninBtn() {
      return this.$route.name == "signin";
    }
  },
  data() {
    return {};
  },
  methods: {
    getToPath(path, params) {
      this.$router.push({ path: path, query: { roleType: params } });
    },
    enterConsole() {
      this.$router.push("/dash");
    },
    login() {
      this.$router.push("/login");
    },
    signin() {
      this.$router.push("/signin");
    }
  }
};
</script>
<style scoped lang="scss">
header {
  height: 68px;
  // padding: 0 150px;
  position: absolute;
  // width: -webkit-fill-available;
  width: 1240px;
  left: calc((100% - 1240px) / 2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #0e1a28;
  z-index: 10;
  // box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.08);
  // background-color: #fff;
  // border-bottom: 1px solid #d9d9d9;
  .logo {
    a {
      font-size: 22px !important;
    }
    padding: 0 2rem;
  }
  .home_route {
    flex: 1;
  }
  .control_container,
  .home_route {
    ul {
      display: flex;
      flex-direction: row;
      height: 100%;
      li {
        font-size: 1rem;
        display: inherit;
        @include flexCenter;
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
    }
  }
}
header > span {
  font-size: 2rem;
}
header a {
  color: #fff;
  font-size: 14px;
  text-decoration: none;
}
a:hover {
  text-decoration: none;
}
a:link {
  text-decoration: none;
}
.login_btn,
.sigin_btn {
  padding: 8px 25px;
}
.login_btn {
  border: 1px solid rgba(255, 255, 255, 1);
  color: white;
  background: transparent;
}
.login_btn:hover {
  border: 1px solid transparent;
  color: var(--color-primary);
  background: white;
}
.sigin_btn {
  // border:1px solid var(--color-primary);
  color: var(--color-primary);
  background: white;
}
.name {
  color: white;
}
</style>
