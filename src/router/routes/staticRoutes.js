/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 15:39:25
 * @LastEditTime: 2019-08-30 11:18:09
 * @LastEditors: Please set LastEditors
 */
import Layout from "@/views/Layout";
import HomeLayout from "@/views/HomeLayout";

const _import_ = file => () => import("@/views/" + file + ".vue");
/*
 * 公共路由表, 一般情况这里无需任何修改.
 * 除非你需要配置更多任何角色或权限下都可以访问的路由
 */
export const constantRouterMap = [
  {
    path: "/",
    component: HomeLayout,
    redirect: "home",
    hidden: true,
    children: [
      {
        path: "home",
        name: "Home",
        component: _import_("Home/index"),
        meta: { title: "主页", icon: "el-icon-cold-drink", noCache: false }
      },
      {
        path: "/login",
        name: "login",
        component: _import_("Login/index"),
        meta: { title: "登录", icon: "el-icon-cold-drink", noCache: false }
      },
      {
        path: "/signin",
        name: "signin",
        component: _import_("Signin/index"),
        meta: { title: "注册", icon: "el-icon-cold-drink", noCache: false }
      }
    ],
    hidden: true
  },
  {
    path: "",
    component: Layout,
    children: [
      {
        path: "dash",
        name: "Dashboard",
        component: _import_("Dashboard/index"),
        meta: { title: "主页", icon: "el-icon-cold-drink", noCache: false }
      }
    ]
  },
  {
    path: "",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "personal-settings",
        name: "PersonalSettings",
        component: _import_("Layout/Components/Settings/index"),
        meta: {
          title: "个性化配置",
          icon: "fdddfont icon-custom-settings",
          noCache: true
        }
      },
      {
        path: "modify-password",
        name: "modifyPassword",
        component: _import_("Layout/Components/ModifyPassword/index"),
        hidden: true,
        meta: { title: "修改密码", icon: "fdddfont icon-home", noCache: true }
      },
      {
        path: "modify-detail",
        name: "modifyDetail",
        component: _import_("Layout/Components/UserInfo/detail"),
        hidden: true,
        meta: { title: "基本信息", icon: "fdddfont icon-home", noCache: true }
      },
    ]
  },
  { path: "/401", component: _import_("others/401"), hidden: true },
  { path: "*", component: _import_("others/404"), hidden: true }
];
