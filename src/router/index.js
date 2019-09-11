import Vue from "vue";
import Router from "vue-router";
import { constantRouterMap } from "./routes/staticRoutes";
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router);

export const router = new Router({
  routes: constantRouterMap
});
