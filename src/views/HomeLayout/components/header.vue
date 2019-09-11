<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-01 11:00:45
 * @LastEditTime: 2019-09-03 10:59:27
 * @LastEditors: Please set LastEditors
 -->
<template>
  <header>
    <div class="header_container">
      <div class="logo">
        <a href="javascript:;" @click.stop="getToPath('/')">233次元
          <!-- <img
          style="height:24px"
          src="http://47.101.145.67/wp-content/themes/lensnews2.2/images/about_img.jpg"
          alt=""
          />-->
        </a>
      </div>
      <!-- <div class="home_route">
        <ul>
          <li>
            <a href="//superlink.top">superLink</a>
      </li>-->
      <!-- <li>
            <a href="javascript:;"  @click.stop="getToPath('/driver-settled')">司机入驻</a>
      </li>-->
      <!-- <li>
            <a href="javascript:;"  @click.stop="getToPath('/signin','carrier')">服务商入驻</a>
          </li>
          <li>
            <a href="javascript:;"  @click.stop="getToPath('/')">解决方案</a>
          </li>
          <li>
            <a href="javascript:;"  @click.stop="getToPath('/')">关于我们</a>
      </li>-->
      <!-- </ul>
      </div>-->
      <div class="control_container">
        <ul>
          <li>
            <a v-if="token" @click="enterConsole">控制台</a>
          </li>
          <li>
            <a-popover placement="bottomRight">
              <template slot="content">
                <user-info/>
              </template>
              <span v-if="token" class="name">
                {{ userName ? userName : userAccount }}
                <a-icon type="caret-down"/>
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
@keyframes jello {
  from,
  11.1%,
  to {
    transform: translate3d(0, 0, 0);
  }

  22.2% {
    transform: skewX(-12.5deg) skewY(-12.5deg);
  }

  33.3% {
    transform: skewX(6.25deg) skewY(6.25deg);
  }

  44.4% {
    transform: skewX(-3.125deg) skewY(-3.125deg);
  }

  55.5% {
    transform: skewX(1.5625deg) skewY(1.5625deg);
  }

  66.6% {
    transform: skewX(-0.78125deg) skewY(-0.78125deg);
  }

  77.7% {
    transform: skewX(0.390625deg) skewY(0.390625deg);
  }

  88.8% {
    transform: skewX(-0.1953125deg) skewY(-0.1953125deg);
  }
}
header {
  height: 68px;
  line-height:68px;
  // padding: 0 150px;
  position: absolute;
  width: 100%;
  .header_container{
    width: 1240px;
    margin:0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  
  color: #E1244E;
  z-index: 10;
  background-color: #fff;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 0 0 20px 20px;
  box-shadow: 0 3px 20px 3px rgba(0, 64, 128, .2);
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
  color: #E1244E;
  font-size: 14px;
  text-decoration: none;
}
a:hover {
  text-decoration: none;
  animation: jello 1000ms both;
  color: #E1244EDD;
}
a:link {
  text-decoration: none;
}
.login_btn,
.sigin_btn {
  padding: 8px 25px;
}
.login_btn {
  border: 1px solid #E1244E;
  color: #E1244E;
  background: transparent;
}
.login_btn:hover {
  border: 1px solid transparent;
  color: var(--color-primary);
  background: #E1244E;
}
.sigin_btn {
  color: white;
  background: #E1244E;
}
.name {
  color: #E1244E;
}
</style>
