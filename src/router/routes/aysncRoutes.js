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
          title: "商户管理",
          icon: "fdddfont icon-custom-settings",
          noCache: true
        }
      },
      {
        path: "carriers-management",
        name: "CarriersManagement",
        component: _import_("Development/UserManagement/carriers/detail"),
        meta: {
          title: "服务商管理",
          icon: "fdddfont icon-custom-settings",
          noCache: true
        }
      },
      {
        path: "service-management",
        name: "ServiceManagement",
        component: _import_("Development/UserManagement/Service/index"),
        meta: {
          title: "服务人员管理",
          icon: "fdddfont icon-custom-settings",
          noCache: true
        }
      },
      {
        path: "vehicle-management",
        name: "VehicleManagement",
        component: _import_("Development/UserManagement/Vehicle/index"),
        meta: {
          title: "车辆管理",
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
      title: "订单管理",
      icon: "fdddfont icon-custom-settings",
      noCache: true
    },
    children: [
      {
        path: "list",
        name: "OrderList",
        component: _import_("Development/Order/index"),
        meta: {
          title: "订单列表",
          icon: "fdddfont icon-custom-settings",
          noCache: true
        }
      },
      {
        path: "appointment",
        name: "Appointment",
        component: _import_("Development/Appointment/index"),
        meta: {
          title: "订单预约",
          icon: "fdddfont icon-custom-settings",
          noCache: true
        }
      },
      {
        path: "distribute",
        name: "Distribute",
        component: _import_("Development/Distribute/index"),
        meta: {
          title: "订单分配",
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
      title: "配装信息",
      icon: "fdddfont icon-custom-settings",
      noCache: true
    },
    children: [
      {
        path: "installData",
        name: "InstallData",
        component: _import_("Development/DataReport/OrderInstall/index"),
        meta: {
          title: "配装信息",
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
      title: "评价管理",
      icon: "fdddfont icon-custom-settings",
      noCache: true
    },
    children: [
      {
        path: "evaluate",
        name: "Evaluate",
        component: _import_("Development/Evaluate/index"),
        meta: {
          title: "评价管理",
          icon: "fdddfont icon-custom-settings",
          noCache: true
        }
      }
    ]
  },
  {
    path: "",
    component: Layout,
    name: "ExceptionManagement",
    meta: {
      title: "异常管理",
      icon: "fdddfont icon-custom-settings",
      noCache: true
    },
    children: [
      {
        path: "exceptionManagement",
        name: "ExceptionManagement",
        component: _import_("Development/ExceptionManagement/index"),
        meta: {
          title: "异常管理",
          icon: "fdddfont icon-custom-settings",
          noCache: true
        }
      }
    ]
  },
  {
    path: "",
    component: Layout,
    name: "VehicleMonitoring",
    meta: {
      title: "在途监控",
      icon: "fdddfont icon-custom-settings",
      noCache: true
    },
    children: [
      {
        path: "vehicleMonitoring",
        name: "VehicleMonitoring",
        component: _import_("Development/VehicleMonitoring/index"),
        meta: {
          title: "在途监控",
          icon: "fdddfont icon-custom-settings",
          noCache: true
        }
      }
    ]
  },
  {
    path: "/DataReport",
    component: Layout,
    name: "DataReport",
    meta: {
      title: "数据报表",
      icon: "fdddfont icon-custom-settings",
      noCache: true
    },
    children: [
      {
        path: "orderTongji",
        name: "OrderTongji",
        component: _import_("Development/DataReport/Order/index"),
        meta: {
          title: "订单统计",
          icon: "fdddfont icon-custom-settings",
          noCache: true
        }
      },
      {
        path: "customer",
        name: "Customer",
        component: _import_("Development/DataReport/Customer/index"),
        meta: {
          title: "客户满意度",
          icon: "fdddfont icon-custom-settings",
          noCache: true
        }
      },
      {
        path: "install",
        name: "Install",
        component: _import_("Development/DataReport/Install/index"),
        meta: {
          title: "装配统计",
          icon: "fdddfont icon-custom-settings",
          noCache: true
        }
      },
      {
        path: "exception",
        name: "Exception",
        component: _import_("Development/DataReport/Exception/index"),
        meta: {
          title: "异常统计",
          icon: "fdddfont icon-custom-settings",
          noCache: true
        }
      },
      {
        path: "driver",
        name: "Driver",
        component: _import_("Development/DataReport/Driver/index"),
        meta: {
          title: "司机统计",
          icon: "fdddfont icon-custom-settings",
          noCache: true
        }
      },
      {
        path: "truck",
        name: "Truck",
        component: _import_("Development/DataReport/Truck/index"),
        meta: {
          title: "车辆统计",
          icon: "fdddfont icon-custom-settings",
          noCache: true
        }
      }
    ]
  }
];
