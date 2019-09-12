<template>
  <div id="tags-view-container" class="tags-view-container">
    <v-contextmenu ref="menu" @beforeShow="beforeShowContextmenu">
      <v-contextmenu-item
        :disabled="isDisableCloseItem"
        @click="closeTabByContextmenu"
        >关闭标签页</v-contextmenu-item
      >
    </v-contextmenu>
    <scroll-pane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        v-contextmenu:menu="tag"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="closeSelectedTag(tag)"
      >
        <span>
          <i :class="tag.meta.icon"></i>
          <span
            class="top-line"
            v-bind:style="{ background: systemThemeColor }"
          ></span>
          {{ tag.meta.title }}
        </span>
        <span
          v-if="isShowCloseBtn(tag)"
          class="close el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)"
        ></span>
      </router-link>
    </scroll-pane>
  </div>
</template>

<script>
import ScrollPane from "./scrollpane";
import { mapGetters } from "vuex";
import { baseTheme } from "@/utils/theme";

export default {
  components: { ScrollPane },
  data() {
    return {
      selectedTag: {},
      affixTags: [],
      isDisableCloseItem: false
    };
  },
  computed: {
    ...mapGetters(["visitedViews", "tagTabHeight", "systemTheme"]),
    systemThemeColor: function() {
      return baseTheme[this.systemTheme];
    }
    // routes() {
    //   return this.$store.state.permission.routes
    // }
  },
  watch: {
    $route() {
      this.addTags();
      this.moveToCurrentTag();
    }
  },
  mounted() {
    // this.initTags()
    this.addTags();
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path;
    },
    isShowCloseBtn(view) {
      return view.path !== "/dash";
    },
    filterAffixTags(routes, basePath = "/") {
      let tags = [];
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path);
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          });
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path);
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags];
          }
        }
      });
      return tags;
    },
    initTags() {
      const affixTags = (this.affixTags = this.filterAffixTags(this.routes));
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch("addVisitedViews", tag);
        }
      }
    },
    addTags() {
      const { name } = this.$route;
      if (name) {
        this.$store.dispatch("addVisitedViews", this.$route);
      }
      return false;
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag;
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag);
            // when query is different then update
            // if (tag.to.fullPath !== this.$route.fullPath) {
            //   this.$store.dispatch('tagsView/updateVisitedView', this.$route)
            // }
            break;
          }
        }
      });
    },
    // refreshSelectedTag(view) {
    //   this.$store.dispatch('tagsView/delCachedView', view).then(() => {
    //     const { fullPath } = view
    //     this.$nextTick(() => {
    //       this.$router.replace({
    //         path: '/redirect' + fullPath
    //       })
    //     })
    //   })
    // },
    closeSelectedTag(view) {
      this.$store.dispatch("removeVisitedViews", view).then(res => {
        this.$nextTick(() => {
          // 移除过后的visitedViews Array object
          const views = [...res.views];
          // 移除view的下一个view, 用于帮助自动Acitve下一个view
          const nextView = res.theNextView;
          // 如果移除的是已Active的View才需要协助触发一些后续操作
          if (this.isActive(view)) {
            // 如果没有下一个view,可能当前移除的已经是最后一个,那么需要返回 visitedViews的最后一个
            const lastView = nextView === null && views.slice(-1)[0];
            // 如果有下一个则直接跳转路由
            if (nextView) {
              this.$router.push(nextView.path);
              // 如果当前移除的已经是最后一个,则应该跳转至visitedViews的最后一个路由
            } else {
              if (lastView) {
                this.$router.push(lastView.path);
              } else {
                // 保证最后不能出现空visitedList
                // TODO 应该做一个可以默认无法关闭的首页view
                this.$router.push({
                  path: "/",
                  query: {
                    t: new Date().getTime()
                  }
                });
                // if (view.path === '/dash') this.$store.dispatch('addVisitedViewss', view)
              }
            }
          }
        });
        // 关闭标签时触发一个广播
        // TODO: 暂时不发送广播
        // eventBus.$emit('plateform.navTab.removed', { removed: view })
      });
    },
    // closeOthersTags() {
    //   this.$router.push(this.selectedTag)
    //   this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(() => {
    //     this.moveToCurrentTag()
    //   })
    // },
    // closeAllTags(view) {
    //   this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
    //     if (this.affixTags.some(tag => tag.path === view.path)) {
    //       return
    //     }
    //     this.toLastView(visitedViews, view)
    //   })
    // },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0];
      if (latestView) {
        this.$router.push(latestView);
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === "Dashboard") {
          // to reload home page
          this.$router.replace({ path: "/redirect" + view.fullPath });
        } else {
          this.$router.push("/");
        }
      }
    },
    beforeShowContextmenu(contextmenu, event, { name }) {
      this.isDisableCloseItem = name === "Dashboard";
    },
    closeTabByContextmenu(contextmenu, event, tabView) {
      this.closeSelectedTag(tabView);
    }
  }
};
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 30px;
  width: 100%;
  overflow: hidden;
  // background: #fff;
  // border-bottom: 1px solid #d8dce5;
  // box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  background-color: #f2f2f2;
  box-shadow: 10px 0 15px -6px rgba(0, 0, 0, 0.4) inset;
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      padding: 0 8px;
      background-color: #9e9e9e;
      border-right: 1px solid #9e9e9e;
      cursor: pointer;
      overflow: hidden;
      height: 30px;
      line-height: 30px;
      // border: 1px solid #d8dce5;
      color: #495060;
      user-select: none;
      overflow: hidden;
      font-size: 12px;
      &.isShowCloseBtn > span {
        padding-right: 10px;
      }
      > span {
        display: inline-block;
        white-space: nowrap;
        vertical-align: middle;

        > i {
          color: #777;
          position: relative;
          top: 1px;
          margin-right: 5px;
        }

        &.close {
          width: 12px;
          height: 12px;
          border-radius: 15px;
          margin: 1px 0 0 10px;

          &:before {
            position: relative;
            top: 1px;
          }

          &:hover {
            color: #f44336;
            font-weight: 600;
            background-color: #eecbc8;
          }
        }
      }
      &.active {
        position: relative;
        background-color: #f2f2f2;
        box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
          0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
        span.top-line {
          width: 100%;
          height: 3px;
          overflow: hidden;
          position: absolute;
          top: 0;
          left: 0;
        }
      }
      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>
