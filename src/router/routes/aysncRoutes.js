import Layout from "@/views/Layout";

const _import_ = file => () => import("@/views/" + file + ".vue");
/**
 * 静态路由表配置
 *
 * 可根据{role}字段来模拟权限访问. 用户登录后必须含有{role}字段, 与之匹配的路由会被最终过滤出来供访问.
 * 不匹配的则不会包含在内.
 * 具体字段表说明可以访问平台文档查看详细资料.
 */
export const aysncRoutesMap = [
  {
    path: "/user",
    component: Layout,
    name: "UserManagement",
    meta: {
      title: "数据管理",
      icon: "fdddfont icon-custom-settings",
      noCache: true
    },
    children: [
      {
        path: "merchants-management",
        name: "MerchantsManagement",
        component: _import_("Development/UserManagement/merchants/detail"),
        meta: {
          title: "用户管理",
          icon: "fdddfont icon-custom-settings",
          noCache: true
        }
      }
    ]
  },
  {
    path: "/order",
    component: Layout,
    name: "OrderManagement",
    meta: {
      title: "番剧管理",
      icon: "fdddfont icon-custom-settings",
      noCache: true
    },
    children: [
      {
        path: "list",
        name: "OrderList",
        component: _import_("Development/Order/index"),
        meta: {
          title: "番剧列表",
          icon: "fdddfont icon-custom-settings",
          noCache: true
        }
      },
      {
        path: "distribute",
        name: "Distribute",
        component: _import_("Development/Distribute/index"),
        meta: {
          title: "标签管理",
          icon: "fdddfont icon-custom-settings",
          noCache: true
        }
      }
    ]
  },
  {
    path: "/data",
    component: Layout,
    name: "DataManagement",
    meta: {
      title: "图片信息",
      icon: "fdddfont icon-custom-settings",
      noCache: true
    },
    children: [
      {
        path: "installData",
        name: "InstallData",
        component: _import_("Development/DataReport/OrderInstall/index"),
        meta: {
          title: "图片信息",
          icon: "fdddfont icon-custom-settings",
          noCache: true
        }
      }
    ]
  },
  {
    path: "",
    component: Layout,
    name: "Evaluate",
    meta: {
      title: "漫画管理",
      icon: "fdddfont icon-custom-settings",
      noCache: true
    },
    children: [
      {
        path: "evaluate",
        name: "Evaluate",
        component: _import_("Development/Evaluate/index"),
        meta: {
          title: "漫画数据",
          icon: "fdddfont icon-custom-settings",
          noCache: true
        }
      },
      {
        path: "evaluate",
        name: "Evaluate",
        component: _import_("Development/Evaluate/index"),
        meta: {
          title: "漫画标签",
          icon: "fdddfont icon-custom-settings",
          noCache: true
        }
      }
    ]
  }
];
