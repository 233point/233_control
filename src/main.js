/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-24 10:16:32
 * @LastEditTime: 2019-08-14 09:41:23
 * @LastEditors: Please set LastEditors
 */
// initialize base framework
import Vue from "vue";
// vuex store
import store from "./store";
import ElementUI from "element-ui";
// import { loadCurrentTheme } from '@/utils/theme'
// loadCurrentTheme()
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
// vue router
import { router } from "./router";
import "./router/permission";
// initialize custom theme
import "@/common/theme/theme-chalk.scss";
import "@/common/style/color.css";
// 兼容css变量
import cssVars from "css-vars-ponyfill";

// load custom theme
// Element UI module & style

import VueAMap from "vue-amap";
// custom zhx-vue-plateform icons
import "@/assets/plateform-font/iconfont.css";
import "@/assets/tms-icon/iconfont.css";
/**
 * custom vue plugins
 */
// contextmenu
import contextmenu from "./components/contextmenu";
// nextPage
// import NextPage from './components/nextPage/'
// breadcrumb
import breadcrumb from "./components/breadcrumb";
// import app
import App from "./App";

// config to use Staic router or dynamic one
// Vue.useStaticRouter = false;
Vue.useStaticRouter = false;

// apply plugins

// Vue.use(NextPage, { router, store })
Vue.use(Antd);
Vue.use(ElementUI, { size: "mini" });
Vue.use(contextmenu);
Vue.use(breadcrumb);
cssVars();
Vue.config.productionTip = false;

Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  key: "8703164b6d9a53e64195238e3e17b1f3",
  plugin: [
    "AMap.ToolBar",
    "AMap.Heatmap",
    "AMap.GraspRoad",
    "AMap.TruckDriving",
    "AMap.RangingTool",
    "AMap.MouseTool",
    "AMap.PolyEditor",
    "AMap.CircleEditor",
    "AMap.Autocomplete",
    "AMap.EllipseEditor",
    "AMap.RectangleEditor",
    "AMap.PlaceSearch",
    "AMap.Scale",
    "AMap.OverView",
    "AMap.MapType",
    "AMap.PolyEditor",
    "AMap.CircleEditor",
    "AMap.Geocoder",
    "Geolocation",
    "DistrictSearch"
  ],
  uiVersion: "1.0",
  v: "1.4.11"
});

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
