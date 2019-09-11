<template>
  <div class="personal-setting">
    <common-content :flex="100">
      <a-tabs defaultActiveKey="1" tabPosition="left">
        <a-tab-pane tab="功能设置" key="1">
          <section>
            <div v-if="roleType.includes('merchant')" class="setting-block">
              <h4>绑定服务商</h4>
              <div class="settings">
                <merchant-config />
              </div>
            </div>
            <!-- <div v-if="roleType.includes('merchant')" class="setting-block">
              <h4>商户类型</h4>
              <div class="settings">
                <merchant-type />
              </div>
            </div> -->
            <div class="setting-block">
              <h4>货品模板</h4>
              <div class="settings">
                <product-config />
              </div>
            </div>
            <div
              class="setting-block"
              v-if="$store.getters.roleType == 'carrier'"
            >
              <h4>配装经理分配商户</h4>
              <div class="settings">
                <pzjl-bind />
              </div>
            </div>
            <div class="setting-block">
              <h4>待接单超时时间</h4>
              <div class="settings">
                <time-config />
                <div class="info">
                  注意:该功能开发中，暂时默认20分钟
                </div>
              </div>
            </div>
            <!-- <div class="setting-block">
              <h4>司机信息</h4>
              <div class="settings">
                <driver-config />
              </div>
            </div> -->
            <!-- <div class="setting-block">
              <h4>功能配置</h4>
              <div class="settings">
                <control-config />
              </div>
            </div> -->
          </section>
        </a-tab-pane>
        <a-tab-pane tab="系统设置" key="2">
          <section>
            <div class="setting-block">
              <h4>个人资料</h4>
              <div class="settings">
                <user-info />
              </div>
            </div>
            <div class="setting-block">
              <h4>系统配置</h4>
              <div class="settings">
                <system-config />
              </div>
            </div>
            <div class="setting-block">
              <h4>主题</h4>
              <div class="settings">
                <el-form label-width="120px">
                  <el-form-item label="主题色选择">
                    <theme-picker @change="themeChange" />
                  </el-form-item>
                </el-form>
                <div class="info">
                  注意:主题色仅会在保证正常显示与配色的前提下调整部分色彩,而非全部色彩.
                </div>
              </div>
            </div>
            <div class="setting-block">
              <h4>快捷菜单</h4>
              <div class="settings">
                <shortcut-menu :menuList="menuList" />
                <div class="info">
                  最多只能添加<strong>15</strong>枚快捷菜单!
                  建议只选择最常用的功能.
                </div>
              </div>
            </div>
          </section>
        </a-tab-pane>
      </a-tabs>
    </common-content>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { baseTheme } from "@/utils/theme";

import UserInfo from "./Components/UserInfo";
import DriverConfig from "./Components/driver";
import ControlConfig from "./Components/control";
import ProductConfig from "./Components/product";
import MerchantConfig from "./Components/merchant";
import TimeConfig from "./Components/time";
import theme from "./Components/Theme";
import ShortcutMenu from "./Components/ShortcutMenu";
import SystemConfig from "./Components/SystemConfig";
import ThemePicker from "@/components/ThemePicker";
import CommonContent from "@/components/commonContent";
import pzjlBind from "./Components/pzjlBind";
import merchantType from "./Components/merchantType";

export default {
  name: "PersonalSettings",
  components: {
    DriverConfig,
    ControlConfig,
    ProductConfig,
    UserInfo,
    theme,
    ShortcutMenu,
    SystemConfig,
    ThemePicker,
    CommonContent,
    MerchantConfig,
    TimeConfig,
    pzjlBind,
    merchantType
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["systemTheme", "roleType"]),
    menuList() {
      return this.$store.getters.asyncRouter;
    },
    headerColor: () => baseTheme[this.systemTheme]
  },
  methods: {
    themeChange(val) {
      this.$store.dispatch("changeThemeVar", val);
    }
  }
};
</script>
<style lang="scss" scoped>
.personal-setting {
  position: relative;
  height: 100%;
  background: mix($base-gray-color, #fff, 5%);

  header {
    color: #fff;
    padding: 10px;
    font-size: 1.3rem;
    opacity: 0.5;
  }

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 15px 0;
    background: mix($base-gray-color, #fff, 5%);

    .setting-block {
      width: 80%;
      position: relative;
      max-width: 980px;
      margin-bottom: 15px;
      z-index: 1;

      &:last-child {
        margin-bottom: 0;
      }

      h4 {
        font-size: 1.1rem;
        color: darken($base-gray-color, 10%);
      }

      .settings {
        padding: 10px;
        border-radius: 8px;
        background: #fff;
        box-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);

        .info {
          clear: both;
          margin: 5px;
          padding: 5px 5px 0 5px;
          color: darken($base-gray-color, 5%);
          border-top: 1px solid darken($base-light-color, 5%);
        }
      }
    }
  }
}
</style>
