<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 17:00:09
 * @LastEditTime: 2019-09-02 18:45:48
 * @LastEditors: Please set LastEditors
 -->
<template>
  <transition name="scale-left">
    <div
      class="sidebar"
      id="breadcrumb-container"
      :class="{ width: sidebarState.width }"
      v-show="!sidebarState.isHidden"
      style="background: #fff"
    >
      <!-- <div class="logo">System LOGO</div> -->
      <div
        id="slide-handler"
        class="slide-handler"
        :class="sidebarState.isOpen ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
        @click="slideSidebar"
      ></div>
      <VuePerfectScrollbar :settings="scrollOption">
        <el-menu
          mode="vertical"
          class="vertical-menu"
          :default-active="$route.path"
          :router="true"
          background-color="white"
          :collapse="!sidebarState.isOpen"
          text-color="#333"
        >
          <template
            v-for="item in asyncRouter"
            v-if="!item.hidden && item.children"
          >
            <!-- no children -->
            <template
              v-if="item.children.length === 1 && !item.children[0].children"
            >
              <el-menu-item
                :index="item.path + '/' + item.children[0].path"
                :key="item.path + '/' + item.children[0].path"
              >
                <i
                  v-if="!sidebarState.isOpen"
                  :class="item.children[0].meta.icon"
                ></i>
                <i v-else :class="item.children[0].meta.icon"></i>
                <span class="mar-l-5" slot="title">{{
                  item.children[0].meta.title
                }}</span>
              </el-menu-item>
            </template>
            <!-- have children -->
            <el-submenu v-else :index="item.name || item.path" :key="item.name">
              <template slot="title">
                <i
                  v-if="item.meta && item.meta.icon"
                  :class="item.meta.icon"
                ></i>
                <span class="mar-l-5" v-if="item.meta && item.meta.title">{{
                  item.meta.title
                }}</span>
              </template>
              <template v-for="child in item.children" v-if="!child.hidden">
                <sidebar-menu-item
                  v-if="child.children && child.children.length > 0"
                  :is-nest="true"
                  class="nest-menu"
                  :routes="[child]"
                  :key="child.path"
                ></sidebar-menu-item>
                <template v-else>
                  <el-menu-item
                    :index="item.path + '/' + child.path"
                    :key="item.path + '/' + child.path"
                  >
                    <i
                      v-if="child.meta && child.meta.icon"
                      :class="child.meta.icon"
                    ></i>
                    <span
                      class="mar-l-5"
                      v-if="child.meta && child.meta.title"
                      >{{ child.meta.title }}</span
                    >
                  </el-menu-item>
                </template>
              </template>
            </el-submenu>
          </template>
        </el-menu>
      </VuePerfectScrollbar>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import SidebarMenuItem from "./SidebarMenuItem";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  name: "Sidebar",
  data() {
    return {
      scrollOption: {
        suppressScrollX: true
      }
    };
  },
  computed: {
    ...mapGetters(["asyncRouter", "sidebarState", "systemTheme"]),
    // 这里必须根据条件结合ElementUI的sidebar来调整颜色,保证自定义主题和sidebar的内置颜色一致.
    systemThemeColor: function() {
      switch (this.systemTheme) {
        case "batman":
        case "belles":
          return "#37474F";
        default:
          return "#304156";
      }
    }
  },
  methods: {
    slideSidebar() {
      this.$store.dispatch("collapseSidebar", !this.sidebarState.isOpen);
    }
  },
  components: { SidebarMenuItem, VuePerfectScrollbar }
};
</script>

<style lang="scss" scoped>
$sidebar-background-color: white;

.sidebar {
  display: flex;
  flex-direction: column;
  flex: none;
  transition: all 0.3s ease-in-out 0s;
  overflow: hidden;
  // box-shadow: 1px 1px 4px 1px rgba(0, 0, 0, 0.08);
  .slide-handler {
    padding: 3px 0;
    background: white;
    text-align: center;
    color: var(--color-primary);
    cursor: pointer;
  }

  .logo {
    padding: 10px 0;
    color: #304156;
    font-size: 1.6rem;
    font-weight: 300;
    display: inherit;
    @include flexCenter;
    background-color: white;
  }

  // sidebar menu css override
  .vertical-menu:not(.el-menu--collapse) {
    width: 180px;
    border-right: none;
    padding-bottom: 50px;
  }

  .el-menu--collapse i {
    font-size: 1.6rem;
  }
}
</style>
