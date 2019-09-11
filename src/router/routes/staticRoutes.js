/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 15:39:25
 * @LastEditTime: 2019-08-30 11:18:09
 * @LastEditors: Please set LastEditors
 */
import Layout from "@/views/Layout";
import HomeLayout from "@/views/HomeLayout";
import DriverLayout from "@/views/HomeLayout/driverIndex";

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
        meta: { title: "主页", icon: "xhefont xhe-line", noCache: false }
      },
      {
        path: "/driver-settled",
        name: "driver-settled",
        component: _import_("DriverSettled/index"),
        hidden: true,
        meta: { title: "司机入驻", icon: "fdddfont icon-home", noCache: true }
      },
      {
        path: "/login",
        name: "login",
        component: _import_("Login/index"),
        meta: { title: "登录", icon: "fdddfont icon-home", noCache: false }
      },
      {
        path: "/signin",
        name: "signin",
        component: _import_("Signin/index"),
        meta: { title: "注册", icon: "fdddfont icon-home", noCache: false }
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
        meta: { title: "主页", icon: "xhefont xhe-line", noCache: false }
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
      {
        path: "/auth",
        name: "LoginAuth",
        component: _import_("Signin/auth"),
        hidden: true,
        meta: { title: "资格认证", icon: "fdddfont icon-home", noCache: true }
      },
      {
        path: "/merchants-settings",
        name: "MerchantsSettings",
        component: _import_("Layout/Components/Merchants/index"),
        hidden: true,
        meta: { title: "绑定商户", icon: "fdddfont icon-home", noCache: true }
      }
    ]
  },
  {
    path: "/detail",
    component: Layout,
    name: "DetailManagement",
    meta: {
      title: "详情",
      icon: "fdddfont icon-custom-settings",
      noCache: true
    },
    hidden: true,
    children: [
      {
        path: "install",
        name: "InstallDetail",
        component: _import_("Development/DataReport/OrderInstall/detail"),
        meta: {
          title: "配装详情",
          icon: "fdddfont icon-custom-settings",
          noCache: true
        }
      }
    ]
  },
  { path: "/401", component: _import_("others/401"), hidden: true },
  { path: "*", component: _import_("others/404"), hidden: true }
  // {
  //   path: '',
  //   component: Layout,
  //   name: 'DataReport',
  //   meta: {
  //     title: '数据报表',
  //     icon: 'fdddfont icon-custom-settings',
  //     noCache: true,
  //   },
  //   children: [
  //     {
  //       path: 'orderTongji',
  //       name: 'OrderTongji',
  //       component: _import_('Development/DataReport/Order/index'),
  //       meta: {
  //         title: '订单统计',
  //         icon: 'fdddfont icon-custom-settings',
  //         noCache: true,
  //       },
  //     },
  //     {
  //       path: 'customer',
  //       name: 'Customer',
  //       component: _import_('Development/DataReport/Customer/index'),
  //       meta: {
  //         title: '客户满意度',
  //         icon: 'fdddfont icon-custom-settings',
  //         noCache: true,
  //       },
  //     },
  //     {
  //       path: 'install',
  //       name: 'Install',
  //       component: _import_('Development/DataReport/Install/index'),
  //       meta: {
  //         title: '装配统计',
  //         icon: 'fdddfont icon-custom-settings',
  //         noCache: true,
  //       },
  //     },
  //     {
  //       path: 'exception',
  //       name: 'Exception',
  //       component: _import_('Development/DataReport/Exception/index'),
  //       meta: {
  //         title: '异常统计',
  //         icon: 'fdddfont icon-custom-settings',
  //         noCache: true,
  //       },
  //     },
  //     {
  //       path: 'driver',
  //       name: 'Driver',
  //       component: _import_('Development/DataReport/Driver/index'),
  //       meta: {
  //         title: '司机统计',
  //         icon: 'fdddfont icon-custom-settings',
  //         noCache: true,
  //       },
  //     },
  //     {
  //       path: 'truck',
  //       name: 'Truck',
  //       component: _import_('Development/DataReport/Truck/index'),
  //       meta: {
  //         title: '车辆统计',
  //         icon: 'fdddfont icon-custom-settings',
  //         noCache: true,
  //       },
  //     }
  //   ],
  // },
];
