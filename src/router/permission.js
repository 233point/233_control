/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-06 15:11:42
 * @LastEditTime: 2019-08-16 14:32:36
 * @LastEditors: Please set LastEditors
 */
import { router } from "./index";
import { getToken } from "@/utils/auth";
import store from "@/store";

const whiteList = [
  "/login",
  "/home",
  "/",
  "/signin",
  "/search",
  "/driver-settled",
  "/superlink",
  "/superlink/product"
];
const tokenWhiteList = [
  "/dash",
  "/search",
  "/home",
  "/superlink",
  "/superlink/product"
];

router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === "/login" || to.path === "/signin") {
      next("/");
    } else {
      /**
       * 首次进入系统，刷新页面会需要重新获取用户权限信息
       * 如果没有获取到当前用户的权限数据则需要远程获取用户权限
       */
      if (!store.getters.roles) {
        // TODO 还没有权限部分 获取权限列表
        store.dispatch("getUserInfo").then(userInfo => {
          // 根据获取到的用户权限来构建动态路由表,或者做其他事情;
          if (
            userInfo.roleType == "merchant" ||
            userInfo.roleType == "carrier"
          ) {
            store
              .dispatch("getMerchantInfo", userInfo.roleType)
              .then(merchants => {
                if (merchants && merchants.id) {
                  if (
                    !merchants.approval ||
                    merchants.approval.trim() !== "审核成功"
                  ) {
                    next({ path: "/auth", replace: true });
                  } else {
                    store.dispatch("generateRouters", userInfo).then(() => {
                      router.addRoutes(store.getters.addRouters);
                      next({ ...to, replace: true });
                    });
                  }
                } else {
                  if (tokenWhiteList.indexOf(to.path) !== -1) {
                    next({ path: "/auth", replace: true });
                  } else {
                    next({ ...to, replace: true });
                  }
                }
              });
          } else if (
            userInfo.roleType == "assemblyManager" ||
            userInfo.roleType == "transManager" ||
            userInfo.roleType == "merchanthalf" ||
            userInfo.roleType == "merchantall" ||
            userInfo.roleType == "regionManager" ||
            userInfo.roleType == "cityManager" ||
            userInfo.roleType == "marcketManager" ||
            userInfo.roleType == "regionMarcketManager"
          ) {
            store.dispatch("generateRouters", userInfo).then(() => {
              router.addRoutes(store.getters.addRouters);
              next({ ...to, replace: true });
            });
          } else {
            console.log("path", to.path, tokenWhiteList.indexOf(to.path) == -1);

            // 每次刷新页面都回到home页面
            if (tokenWhiteList.indexOf(to.path) == -1) {
              next({ path: "/dash", replace: true });
            } else {
              next({ ...to, replace: true });
            }
          }
        });
        // 未刷新页面,在系统中跳转路由
      } else {
        console.log("1111", to.path, tokenWhiteList.indexOf(to.path) == -1);
        if (to.name === null) {
          next({ path: "*", replace: true });
        } else {
          next();
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
    }
  }
  // 在切换路由时,为了保证不出现忘记回复窗口大小导致看不到标签页问题
  if (store.getters.windowMaxState) {
    store.dispatch("maxWindow", false);
  }
});
