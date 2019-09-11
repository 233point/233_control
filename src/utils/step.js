const steps = [
  {
    element: "#breadcrumb-container",
    popover: {
      title: "菜单面包屑",
      description: "当前页面菜单",
      position: "bottom"
    }
  },
  {
    element: "#userInfo",
    popover: {
      title: "功能设置",
      description: "下拉菜单：个性化设置等",
      position: "left"
    }
  },
  {
    element: "#screenfull",
    popover: {
      title: "全屏",
      description: "设置页面全屏",
      position: "left"
    }
  },
  {
    element: "#theme-picker",
    popover: {
      title: "换肤",
      description: "切换整体布局颜色",
      position: "left"
    }
  },
  {
    element: "#slide-handler",
    popover: {
      title: "菜单缩放",
      description: "缩小/放大左侧菜单",
      position: "right"
    },
    padding: 0
  }
];

export default steps;
