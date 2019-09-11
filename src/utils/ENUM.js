/*
 * @Description: In User Settings Edit
 * @Author: Calamus
 * @Date: 2019-08-09 15:39:25
 * @LastEditTime: 2019-09-04 10:40:59
 * @LastEditors: Please set LastEditors
 */
export const Role_Type_list = [
  {
    label: "商户",
    value: "merchant"
  },
  {
    label: "服务商(自营)",
    value: "carrier"
  },
  {
    label: "商户(半托管)",
    value: "merchanthalf"
  },
  {
    label: "商户(全托管)",
    value: "merchantall"
  },
  {
    label: "司机",
    value: "driver"
  },
  {
    label: "配装经理",
    value: "transManager"
  },
  {
    label: "系统管理员",
    value: "assemblyManager"
  },
  {
    label: "安装工",
    value: "installer"
  },
  {
    value: "marcketManager",
    label: "商场负责人"
  },
  {
    value: "cityManager",
    label: "城市负责人"
  },
  {
    value: "regionMarcketManager",
    label: "商场区域负责人"
  },
  {
    value: "regionManager",
    label: "区域负责人"
  }
];
export const Order_Status_List = [
  {
    label: "全部",
    value: "",
    percentage: 0,
    color: ""
  },
  {
    label: "待预约",
    value: "0",
    percentage: 25,
    color: ""
  },
  {
    label: "服务中",
    value: "1",
    percentage: 50,
    color: ""
  },
  {
    label: "完成",
    value: "3",
    percentage: 75,
    color: "",
    status: "exception"
  },
  {
    label: "关闭",
    value: "5",
    percentage: 100,
    color: "",
    status: "success"
  }
];

export const Install_Status_List = [
  {
    label: "全部",
    value: "",
    percentage: 0,
    color: ""
  },
  {
    label: "待分派",
    value: "0",
    percentage: 50,
    color: ""
  },
  {
    label: "待接单",
    value: "1",
    percentage: 50,
    color: ""
  },
  {
    label: "待上门",
    value: "2",
    percentage: 75,
    color: "",
    status: "exception"
  },
  {
    label: "待提货",
    value: "3",
    percentage: 75,
    color: "",
    status: "exception"
  },
  {
    label: "待回单",
    value: "4",
    percentage: 75,
    color: "",
    status: "exception"
  },
  {
    label: "待评价",
    value: "5",
    percentage: 75,
    color: "",
    status: "exception"
  },
  {
    label: "已完成",
    value: "7",
    percentage: 100,
    color: "",
    status: "success"
  },
  {
    label: "异常",
    value: "9",
    percentage: 100,
    color: "",
    status: "success"
  },
  {
    label: "异常完成",
    value: "10",
    percentage: 100,
    color: "",
    status: "success"
  },
  {
    label: "已撤单",
    value: "11",
    percentage: 100,
    color: "",
    status: "success"
  }
];

export const All_Status_List = [
  {
    label: "全部",
    value: "",
    percentage: 0,
    color: ""
  },
  {
    label: "待分派",
    value: "0",
    percentage: 25,
    color: ""
  },
  {
    label: "待接单",
    value: "1",
    percentage: 50,
    color: ""
  },
  {
    label: "待上门",
    value: "2",
    percentage: 75,
    color: "",
    status: "exception"
  },
  {
    label: "待提货",
    value: "3",
    percentage: 75,
    color: "",
    status: "exception"
  },
  {
    label: "待回单",
    value: "4",
    percentage: 75,
    color: "",
    status: "exception"
  },
  {
    label: "待评价",
    value: "5",
    percentage: 75,
    color: "",
    status: "exception"
  },
  {
    label: "已完成",
    value: "7",
    percentage: 100,
    color: "",
    status: "success"
  },
  {
    label: "客户拒收",
    value: "8",
    percentage: 100,
    color: "",
    status: "success"
  },
  {
    label: "异常",
    value: "9",
    percentage: 100,
    color: "",
    status: "success"
  },
  {
    label: "异常完成",
    value: "10",
    percentage: 100,
    color: "",
    status: "success"
  },
  {
    label: "已撤单",
    value: "11",
    percentage: 100,
    color: "",
    status: "success"
  }
];

export const Install_Search_label = [
  // {
  //   label: '商场',
  //   prop: 'marketId',
  //   checked: false,
  //   carrierChecked: false,
  //   type: 'select',
  //   disabled: false,
  //   minwidth: '173px',
  //   placeholder: '请选择商场',
  //   role: ['regionManager','cityManager','regionMarcketManager'],
  // },
  {
    label: "客户信息",
    prop: "customerInfo",
    checked: true,
    disabled: false,
    minwidth: "173px",
    placeholder: "请输入客户信息搜索"
  },
  {
    label: "商户",
    prop: "merchantId",
    checked: false,
    type: "select",
    disabled: false,
    minwidth: "173px",
    placeholder: "请选择商户",
    role: [
      "carrier",
      "transManager",
      "assemblyManager",
      "regionManager",
      "cityManager",
      "regionMarcketManager",
      "marcketManager"
    ]
  },
  {
    label: "服务类型",
    prop: "orderType",
    checked: true,
    type: "select",
    disabled: false,
    minwidth: "173px",
    placeholder: "请选择服务类型",
    role: [
      "merchant",
      "carrier",
      "transManager",
      "assemblyManager",
      "regionManager",
      "cityManager",
      "regionMarcketManager",
      "marcketManager"
    ]
  },
  {
    label: "提货信息",
    prop: "deliveryInfo",
    checked: false,
    disabled: false,
    minwidth: "300px",
    placeholder: "请输入提货信息搜索"
  },
  {
    label: "司机信息",
    prop: "deriverInfo",
    checked: false,
    disabled: false,
    minwidth: "300px",
    placeholder: "请输入司机信息搜索"
  },
  {
    label: "车辆",
    prop: "plateNo",
    checked: false,
    disabled: false,
    minwidth: "173px",
    placeholder: "请输入车牌号搜索"
  },
  {
    label: "备注",
    prop: "remark",
    checked: false,
    disabled: false,
    minwidth: "400px",
    placeholder: "请输入订单备注、预约搜索、回单备注等备注查询"
  }
];

export const Order_List_Label = [
  {
    label: "CTMS单号",
    prop: "waybillNo",
    checked: true,
    fixed: "left",
    disabled: true,
    minwidth: "150"
  },
  {
    label: "第三方单号",
    prop: "thirdPartyNo",
    checked: true,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "服务类型",
    prop: "orderType",
    checked: true,
    disabled: false,
    minwidth: "100"
  },
  {
    label: "商户名称",
    prop: "merchantName",
    checked: true,
    disabled: true,
    minwidth: "120",
    role: [
      "carrier",
      "transManager",
      "assemblyManager",
      "regionManager",
      "cityManager",
      "regionMarcketManager",
      "marcketManager"
    ]
  },
  {
    label: "客户姓名",
    prop: "customerName",
    checked: true,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "客户电话",
    prop: "customerPhone",
    checked: true,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "收货地址",
    prop: "fullAddress",
    checked: true,
    disabled: false,
    minwidth: "150"
  },
  {
    label: "楼层数",
    prop: "floor",
    checked: false,
    disabled: false,
    minwidth: "80"
  },
  {
    label: "电梯",
    prop: "isElevator",
    checked: false,
    disabled: false,
    minwidth: "80"
  },
  {
    label: "提货联系人",
    prop: "deliveryContactUser",
    checked: false,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "提货电话",
    prop: "deliveryContactPhone",
    checked: false,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "提货地址",
    prop: "deliveryFullAddress",
    checked: false,
    disabled: false,
    minwidth: "150"
  },
  {
    label: "期望提货日期",
    prop: "deliveryTime",
    type: "date",
    checked: true,
    disabled: false,
    minwidth: "180"
  },
  {
    label: "期望完成日期",
    prop: "expectFinishTime",
    type: "day",
    checked: true,
    disabled: false,
    minwidth: "180"
  },
  {
    label: "订单备注",
    prop: "waybillRemark",
    checked: false,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "数量",
    prop: "totalNum",
    checked: false,
    disabled: false,
    minwidth: "90"
  },
  {
    label: "包装件数",
    prop: "pkgNum",
    checked: false,
    disabled: false,
    minwidth: "90"
  }
];

export const Install_List_Label = [
  {
    label: "CTMS单号",
    prop: "waybillNo",
    checked: true,
    fixed: "left",
    disabled: true,
    minwidth: "150"
  },
  {
    label: "第三方单号",
    prop: "thirdPartyNo",
    checked: true,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "商户名称",
    prop: "merchantName",
    checked: true,
    disabled: true,
    minwidth: "120",
    role: [
      "carrier",
      "transManager",
      "assemblyManager",
      "regionManager",
      "cityManager",
      "regionMarcketManager",
      "marcketManager"
    ]
  },
  {
    label: "服务类型",
    prop: "orderType",
    checked: true,
    disabled: false,
    minwidth: "100"
  },
  {
    label: "客户姓名",
    prop: "customerName",
    checked: true,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "客户电话",
    prop: "customerPhone",
    checked: false,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "收货地址",
    prop: "fullAddress",
    checked: false,
    disabled: false,
    minwidth: "150"
  },
  {
    label: "楼层数",
    prop: "floor",
    checked: false,
    disabled: false,
    minwidth: "80"
  },
  {
    label: "电梯",
    prop: "isElevator",
    checked: false,
    disabled: false,
    minwidth: "80"
  },
  {
    label: "提货联系人",
    prop: "deliveryContactUser",
    checked: false,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "提货电话",
    prop: "deliveryContactPhone",
    checked: false,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "提货地址",
    prop: "deliveryFullAddress",
    checked: false,
    disabled: false,
    minwidth: "150"
  },
  {
    label: "预计里程",
    prop: "expectMileage",
    checked: false,
    disabled: false,
    minwidth: "90"
  },
  {
    label: "期望提货日期",
    prop: "expectdeliveryTime",
    type: "date",
    checked: false,
    disabled: false,
    minwidth: "180"
  },
  {
    label: "上门时间",
    prop: "installDollTime",
    type: "date",
    checked: false,
    disabled: false,
    minwidth: "180"
  },
  {
    label: "包装件数",
    prop: "pkgNum",
    checked: false,
    disabled: false,
    minwidth: "90"
  },
  {
    label: "期望完成日期",
    prop: "expectFinishTime",
    type: "day",
    checked: false,
    disabled: false,
    minwidth: "180"
  },
  {
    label: "订单备注",
    prop: "waybillRemark",
    checked: false,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "货品数量",
    prop: "totalNum",
    checked: false,
    disabled: false,
    minwidth: "90"
  },
  {
    label: "预约时间",
    prop: "appointTime",
    type: "date",
    checked: false,
    disabled: false,
    minwidth: "180"
  },
  {
    label: "预约备注",
    prop: "appointRemark",
    checked: false,
    disabled: false,
    minwidth: "90"
  },
  {
    label: "服务商",
    prop: "carrierName",
    checked: true,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "司机",
    prop: "driverName",
    checked: true,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "安装工",
    prop: "installUserList",
    checked: true,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "车辆",
    prop: "plateNo",
    checked: true,
    disabled: false,
    minwidth: "90"
  },
  {
    label: "发车时间",
    prop: "departTime",
    type: "date",
    checked: false,
    disabled: false,
    minwidth: "180"
  },
  {
    label: "接单时间",
    prop: "acceptanceTime",
    type: "date",
    checked: false,
    disabled: false,
    minwidth: "180"
  },
  {
    label: "提货时间",
    prop: "deliveryTime",
    type: "date",
    checked: true,
    disabled: false,
    minwidth: "180"
  },
  // {
  //   label: '提货备注',
  //   prop: 'deliveryRemark',
  //   checked: false,
  //   disabled: false,
  //   minwidth: '90',
  // },
  // {
  //   label: '提货照片',
  //   prop: 'deliveryPicList',
  //   type: 'img',
  //   checked: false,
  //   disabled: false,
  //   minwidth: '90',
  // },
  {
    label: "回单时间",
    prop: "receiptTime",
    type: "date",
    checked: true,
    disabled: false,
    minwidth: "180"
  },
  // {
  //   label: '确认单',
  //   prop: 'confirmationSheet',
  //   type: 'date',
  //   checked: false,
  //   disabled: false,
  //   minwidth: '120',
  // },
  // {
  //   label: '回单照片',
  //   prop: 'deliveryNotePicList',
  //   type: 'img',
  //   checked: false,
  //   disabled: false,
  //   minwidth: '90',
  // },
  {
    label: "回单备注",
    prop: "receiptRemark",
    checked: false,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "家装需求",
    prop: "homeDecorationDemand",
    checked: false,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "服务时长",
    prop: "serviceDuration",
    checked: false,
    disabled: false,
    minwidth: "90"
  },
  {
    label: "实际里程",
    prop: "actualMileage",
    checked: false,
    disabled: false,
    minwidth: "90"
  },
  {
    label: "是否异常",
    prop: "isAbnormal",
    checked: false,
    disabled: false,
    minwidth: "90"
  },
  {
    label: "最近上报时间",
    prop: "abnormalReportTime",
    type: "date",
    checked: false,
    disabled: false,
    minwidth: "180"
  },
  {
    label: "服务评分",
    prop: "evaluateStatus",
    type: "star",
    checked: false,
    disabled: false,
    minwidth: "90"
  },
  {
    label: "评价时间",
    prop: "evaluateTime",
    type: "date",
    checked: false,
    disabled: false,
    minwidth: "180"
  },
  {
    label: "评价备注",
    prop: "evaluateRemark",
    type: "date",
    checked: false,
    disabled: false,
    minwidth: "120"
  }
];

export const Order_Search_list = [
  {
    label: "商户",
    prop: "merchantId",
    checked: false,
    type: "select",
    disabled: false,
    minwidth: "173px",
    placeholder: "请选择商户",
    role: [
      "carrier",
      "transManager",
      "assemblyManager",
      "regionManager",
      "cityManager",
      "regionMarcketManager",
      "marcketManager"
    ]
  },
  {
    label: "服务类型",
    prop: "orderType",
    checked: true,
    type: "select",
    disabled: false,
    minwidth: "173px",
    placeholder: "请选择服务类型",
    role: [
      "merchant",
      "carrier",
      "transManager",
      "assemblyManager",
      "regionManager",
      "cityManager",
      "regionMarcketManager",
      "marcketManager"
    ]
  },
  {
    label: "客户信息",
    prop: "customerInfo",
    checked: true,
    disabled: false,
    minwidth: "250px",
    placeholder: "请输入客户信息搜索"
  },
  {
    label: "提货信息",
    prop: "deliveryInfo",
    checked: false,
    disabled: false,
    minwidth: "250px",
    placeholder: "请输入提货信息搜索"
  },
  {
    label: "期望提货日期",
    prop: "deliveryTime",
    type: "date",
    checked: false,
    disabled: false,
    minwidth: "200px",
    placeholder: "请输入期望提货日期搜索"
  },
  {
    label: "期望完成日期",
    prop: "expectFinishTime",
    type: "date",
    checked: false,
    disabled: false,
    minwidth: "200px",
    placeholder: "请输入期望完成日期搜索"
  },
  {
    label: "备注",
    prop: "waybillRemark",
    checked: false,
    disabled: false,
    minwidth: "300px",
    placeholder: "请输入备注搜索"
  }
];
export const Distribute_Search_list = [
  {
    label: "商户",
    prop: "merchantId",
    checked: false,
    type: "select",
    disabled: false,
    minwidth: "120",
    placeholder: "请选择商户",
    role: [
      "carrier",
      "transManager",
      "assemblyManager",
      "regionManager",
      "cityManager",
      "regionMarcketManager",
      "marcketManager"
    ]
  },
  {
    label: "服务类型",
    prop: "orderType",
    checked: true,
    type: "select",
    disabled: false,
    minwidth: "173px",
    placeholder: "请选择服务类型",
    role: [
      "merchant",
      "carrier",
      "transManager",
      "assemblyManager",
      "regionManager",
      "cityManager",
      "regionMarcketManager",
      "marcketManager"
    ]
  },
  {
    label: "客户信息",
    prop: "customerInfo",
    checked: false,
    disabled: false,
    minwidth: "120",
    placeholder: "请输入客户信息搜索"
  },
  {
    label: "提货信息",
    prop: "deliveryInfo",
    checked: false,
    disabled: false,
    minwidth: "120",
    placeholder: "请输入提货信息搜索"
  },
  {
    label: "备注",
    prop: "remark",
    checked: false,
    disabled: false,
    minwidth: "120",
    placeholder: "请输入订单备注/预约备注搜索"
  },
  {
    label: "司机",
    prop: "driverInfo",
    checked: false,
    disabled: false,
    minwidth: "120",
    placeholder: "请输入司机信息搜索"
  },
  {
    label: "车牌号",
    prop: "plateNo",
    checked: false,
    disabled: false,
    minwidth: "120",
    placeholder: "请输入车牌号搜索"
  }
];
export const Distribute_Status_List = [
  {
    label: "全部",
    value: "",
    percentage: 0,
    color: ""
  },
  {
    label: "待分派",
    value: "0",
    percentage: 25,
    color: ""
  },
  {
    label: "待接单",
    value: "1",
    percentage: 50,
    color: ""
  }
];
export const Distribute_List_Label = [
  {
    label: "CTMS单号",
    prop: "waybillNo",
    fixed: "left",
    checked: true,
    disabled: false,
    minwidth: "150"
  },
  {
    label: "第三方单号",
    prop: "thirdPartyNo",
    level: 2,
    first: "waybillInfo",
    checked: true,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "服务类型",
    prop: "orderType",
    level: 2,
    first: "waybillInfo",
    checked: true,
    disabled: false,
    minwidth: "100"
  },
  {
    label: "商户名称",
    prop: "merchantName",
    level: 2,
    first: "waybillInfo",
    checked: true,
    disabled: true,
    minwidth: "120",
    role: ["carrier", "transManager", "assemblyManager"]
  },
  {
    label: "客户姓名",
    prop: "customerName",
    level: 2,
    first: "waybillInfo",
    checked: true,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "客户电话",
    prop: "customerPhone",
    level: 2,
    first: "waybillInfo",
    checked: true,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "下发状态",
    prop: "trusteeship",
    checked: false,
    disabled: false,
    minwidth: "80"
  },
  {
    label: "状态",
    prop: "transStatus",
    fixed: "right",
    checked: true,
    disabled: false,
    minwidth: "80"
  },
  {
    label: "等待时间",
    prop: "waitTime",
    fixed: "right",
    checked: true,
    disabled: false,
    minwidth: "80"
  },
  {
    label: "收货地址",
    prop: "fullAddress",
    level: 2,
    first: "waybillInfo",
    checked: true,
    disabled: false,
    minwidth: "150"
  },
  {
    label: "楼层数",
    prop: "floor",
    level: 2,
    first: "waybillInfo",
    checked: false,
    disabled: false,
    minwidth: "80"
  },
  {
    label: "电梯",
    prop: "isElevator",
    level: 2,
    first: "waybillInfo",
    checked: false,
    disabled: false,
    minwidth: "80"
  },
  {
    label: "提货联系人",
    prop: "deliveryContactUser",
    level: 2,
    first: "waybillInfo",
    checked: false,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "提货电话",
    prop: "deliveryContactPhone",
    level: 2,
    first: "waybillInfo",
    checked: false,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "提货地址",
    prop: "deliveryFullAddress",
    level: 2,
    first: "waybillInfo",
    checked: false,
    disabled: false,
    minwidth: "150"
  },
  {
    label: "派单时间",
    prop: "deliveryTime",
    type: "date",
    checked: true,
    disabled: false,
    minwidth: "180"
  },
  {
    label: "期望提货日期",
    prop: "deliveryTime",
    level: 2,
    first: "waybillInfo",
    type: "date",
    checked: false,
    disabled: false,
    minwidth: "180"
  },
  {
    label: "期望完成日期",
    prop: "expectFinishTime",
    level: 2,
    first: "waybillInfo",
    type: "day",
    checked: false,
    disabled: false,
    minwidth: "180"
  },
  {
    label: "订单备注",
    prop: "waybillRemark",
    first: "waybillInfo",
    level: 2,
    checked: false,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "数量",
    prop: "totalNum",
    level: 2,
    first: "waybillInfo",
    checked: false,
    disabled: false,
    minwidth: "90"
  },
  {
    label: "包装件数",
    prop: "pkgNum",
    level: 2,
    first: "waybillInfo",
    checked: false,
    disabled: false,
    minwidth: "90"
  },
  {
    label: "预约时间",
    prop: "appointTime",
    level: 2,
    first: "waybillInfo",
    type: "date",
    checked: false,
    disabled: false,
    minwidth: "180"
  },
  {
    label: "预约备注",
    prop: "appointRemark",
    level: 2,
    first: "waybillInfo",
    checked: false,
    disabled: false,
    minwidth: "90"
  },
  {
    label: "服务商",
    prop: "num",
    checked: false,
    disabled: false,
    minwidth: "90"
  },
  {
    label: "司机",
    prop: "driverName",
    checked: false,
    disabled: false,
    minwidth: "90"
  },
  {
    label: "车辆",
    prop: "plateNo",
    checked: false,
    disabled: false,
    minwidth: "90"
  }
];

export const Type_Status_List = [
  {
    label: "司机",
    value: "0"
  },
  {
    label: "安装工",
    value: "1"
  },
  {
    label: "配装经理",
    value: "2"
  }
];
export const Order_Appoint_Status_List = [
  {
    label: "待预约",
    value: "0"
  },
  {
    label: "预约成功",
    value: "1"
  },
  {
    label: "预约失败",
    value: "2"
  }
];

export const Order_Type_list = [
  {
    label: "配送",
    value: "0"
  },
  {
    label: "配送及安装",
    value: "1"
  },
  {
    label: "安装",
    value: "2"
  }
];

export const Evaluate_Status_List = [
  {
    label: "全部",
    value: ""
  },
  {
    label: "待评价",
    value: "0"
  },
  {
    label: "差评",
    value: "1"
  },
  {
    label: "好评",
    value: "2"
  },
  {
    label: "一般",
    value: "3"
  }
];
export const Evaluate_Search_List = [
  {
    label: "商户",
    prop: "merchantId",
    checked: false,
    disabled: false,
    minwidth: "120",
    placeholder: "请选择商户",
    role: [
      "carrier",
      "transManager",
      "assemblyManager",
      "regionManager",
      "cityManager",
      "regionMarcketManager",
      "marcketManager"
    ]
  },
  {
    label: "服务类型",
    prop: "orderType",
    checked: true,
    type: "select",
    disabled: false,
    minwidth: "173px",
    placeholder: "请选择服务类型",
    role: [
      "merchant",
      "carrier",
      "transManager",
      "assemblyManager",
      "regionManager",
      "cityManager",
      "regionMarcketManager",
      "marcketManager"
    ]
  },
  {
    label: "客户信息",
    prop: "customerInfo",
    checked: false,
    disabled: false,
    minwidth: "120",
    placeholder: "请输入客户信息搜索"
  },
  // {
  //   label: '服务商',
  //   prop: 'carrierId',
  //   checked: false,
  //   disabled: false,
  //   minwidth: '120',
  //   placeholder: '请输入服务商信息搜索',
  //   role: ['merchant', 'transManager', 'assemblyManager'],
  // },
  {
    label: "司机",
    prop: "driverInfo",
    checked: false,
    disabled: false,
    minwidth: "120",
    placeholder: "请输入司机信息搜索"
  },
  {
    label: "车牌号",
    prop: "plateNo",
    checked: false,
    disabled: false,
    minwidth: "120",
    placeholder: "请输入车牌号搜索"
  }
];
export const Evaluate_List_Label = [
  {
    label: "CTMS单号",
    prop: "waybillNo",
    fixed: "left",
    checked: true,
    disabled: true,
    minwidth: "150"
  },
  {
    label: "第三方单号",
    prop: "thirdPartyNo",
    level: 2,
    first: "waybillInfo",
    checked: true,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "商户",
    prop: "merchantName",
    checked: true,
    disabled: false,
    minwidth: "120",
    role: [
      "carrier",
      "transManager",
      "assemblyManager",
      "regionManager",
      "cityManager",
      "regionMarcketManager",
      "marcketManager"
    ]
  },
  {
    label: "服务类型",
    prop: "orderType",
    level: 2,
    first: "waybillInfo",
    checked: true,
    disabled: false,
    minwidth: "100"
  },
  {
    label: "客户姓名",
    prop: "customerName",
    level: 2,
    first: "waybillInfo",
    checked: true,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "客户电话",
    prop: "customerPhone",
    level: 2,
    first: "waybillInfo",
    checked: true,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "收货地址",
    prop: "fullAddress",
    level: 2,
    first: "waybillInfo",
    checked: true,
    disabled: false,
    minwidth: "150"
  },
  {
    label: "楼层数",
    prop: "floor",
    level: 2,
    first: "waybillInfo",
    checked: false,
    disabled: false,
    minwidth: "80"
  },
  {
    label: "电梯",
    prop: "isElevator",
    level: 2,
    first: "waybillInfo",
    checked: false,
    disabled: false,
    minwidth: "80"
  },
  {
    label: "提货联系人",
    prop: "deliveryContactUser",
    level: 2,
    first: "waybillInfo",
    checked: false,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "提货电话",
    prop: "deliveryContactPhone",
    level: 2,
    first: "waybillInfo",
    checked: false,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "提货地址",
    prop: "deliveryFullAddress",
    level: 2,
    first: "waybillInfo",
    checked: false,
    disabled: false,
    minwidth: "150"
  },
  {
    label: "预计里程",
    prop: "expectMileage",
    level: 2,
    first: "waybillInfo",
    checked: false,
    disabled: false,
    minwidth: "150"
  },
  {
    label: "期望提货日期",
    prop: "deliveryTime",
    level: 2,
    first: "waybillInfo",
    type: "date",
    checked: true,
    disabled: false,
    minwidth: "180"
  },
  {
    label: "包装件数",
    prop: "pkgNum",
    level: 2,
    first: "waybillInfo",
    checked: false,
    disabled: false,
    minwidth: "90"
  },
  {
    label: "期望完成日期",
    prop: "expectFinishTime",
    level: 2,
    first: "waybillInfo",
    type: "day",
    checked: true,
    disabled: false,
    minwidth: "180"
  },
  {
    label: "订单备注",
    prop: "waybillRemark",
    level: 2,
    checked: true,
    disabled: false,
    minwidth: "180"
  },
  {
    label: "货品数量",
    prop: "totalNum",
    level: 2,
    checked: true,
    disabled: false,
    minwidth: "180"
  },
  {
    label: "评价时间",
    prop: "evaluationDate",
    level: 2,
    first: "waybillInfo",
    type: "date",
    checked: true,
    disabled: false,
    minwidth: "180"
  },
  {
    label: "评价结果",
    prop: "evaluationResult",
    checked: false,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "服务商",
    prop: "carrierName",
    checked: false,
    disabled: false,
    minwidth: "90"
  },
  {
    label: "司机",
    prop: "driverName",
    checked: false,
    disabled: false,
    minwidth: "90"
  },
  {
    label: "安装工",
    prop: "installUserList",
    checked: false,
    disabled: false,
    minwidth: "90"
  },
  {
    label: "车辆",
    prop: "plateNo",
    checked: false,
    disabled: false,
    minwidth: "90"
  },
  {
    label: "回单时间",
    prop: "receiptTime",
    type: "date",
    checked: false,
    disabled: false,
    minwidth: "180"
  },
  {
    label: "回单备注",
    prop: "receiptRemark",
    checked: false,
    disabled: false,
    minwidth: "120"
  }
];
export const Abnormal_List_Label = [
  {
    label: "CTMS单号",
    prop: "waybillNo",
    fixed: "left",
    checked: true,
    disabled: true,
    minwidth: "150"
  },
  {
    label: "第三方单号",
    prop: "thirdPartyNo",
    checked: true,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "服务类型",
    prop: "orderType",
    checked: true,
    disabled: false,
    minwidth: "100"
  },
  {
    label: "商户名称",
    prop: "merchantName",
    checked: true,
    disabled: false,
    minwidth: "100",
    role: [
      "carrier",
      "transManager",
      "assemblyManager",
      "regionManager",
      "cityManager",
      "regionMarcketManager",
      "marcketManager"
    ]
  },
  {
    label: "提货时间",
    prop: "deliveryTime",
    type: "date",
    checked: true,
    disabled: false,
    minwidth: "180"
  },
  {
    label: "客户姓名",
    prop: "customerName",
    checked: true,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "客户电话",
    prop: "customerPhone",
    checked: true,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "收货地址",
    prop: "fullAddress",
    checked: false,
    disabled: false,
    minwidth: "150"
  },
  {
    label: "楼层数",
    prop: "floor",
    checked: false,
    disabled: false,
    minwidth: "80"
  },
  {
    label: "电梯",
    prop: "isElevator",
    checked: false,
    disabled: false,
    minwidth: "80"
  },
  {
    label: "提货联系人",
    prop: "deliveryContactUser",
    checked: false,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "提货电话",
    prop: "deliveryContactPhone",
    checked: false,
    disabled: false,
    minwidth: "120"
  },
  {
    label: "提货地址",
    prop: "deliveryFullAddress",
    checked: false,
    disabled: false,
    minwidth: "150"
  },
  {
    label: "预计里程(km)",
    prop: "expectMileage",
    checked: false,
    disabled: false,
    minwidth: "150"
  },
  {
    label: "期望提货日期",
    prop: "expectdeliveryTime",
    type: "date",
    checked: true,
    disabled: false,
    minwidth: "180"
  },
  {
    label: "期望完成日期",
    prop: "expectFinishTime",
    type: "day",
    checked: true,
    disabled: false,
    minwidth: "180"
  },
  // {
  //   label: '预约时间',
  //   prop: 'appointTime',
  //   type: 'date',
  //   checked: true,
  //   disabled: false,
  //   minwidth: '180',
  // },
  {
    label: "包装件数",
    prop: "pkgNum",
    checked: false,
    disabled: false,
    minwidth: "90"
  },
  {
    label: "订单备注",
    prop: "waybillRemark",
    checked: true,
    disabled: false,
    minwidth: "180"
  },
  {
    label: "货品数量",
    prop: "totalNum",
    checked: true,
    disabled: false,
    minwidth: "180"
  },
  {
    label: "服务商",
    prop: "carrierName",
    checked: false,
    disabled: false,
    minwidth: "90"
  },
  {
    label: "司机",
    prop: "driverName",
    checked: false,
    disabled: false,
    minwidth: "90"
  },
  {
    label: "安装工",
    prop: "installUserList",
    checked: false,
    disabled: false,
    minwidth: "90"
  },
  {
    label: "车辆",
    prop: "plateNo",
    checked: false,
    disabled: false,
    minwidth: "90"
  },
  {
    label: "最近上报时间",
    prop: "abnormalReportTime",
    type: "date",
    checked: true,
    disabled: false,
    minwidth: "180"
  },
  {
    label: "异常数量",
    prop: "abnormaledNum",
    checked: true,
    disabled: false,
    minwidth: "80"
  },
  {
    label: "异常备注",
    prop: "abnormalRemark",
    checked: false,
    disabled: false,
    minwidth: "180"
  },
  {
    label: "异常状态",
    prop: "abnormalDealStatus",
    checked: true,
    fixed: "right",
    disabled: false,
    minwidth: "80"
  }
];
export const Abnormal_Status_List = [
  {
    label: "全部",
    value: ""
  },
  {
    label: "待处理",
    value: "0"
  },
  {
    label: "已处理",
    value: "1"
  }
];
// 在途跟踪查询条件
export const Moniter_Search_List = [
  {
    label: "商户",
    prop: "merchantId",
    checked: false,
    type: "select",
    disabled: false,
    minwidth: "80",
    placeholder: "请选择商户",
    role: [
      "carrier",
      "transManager",
      "assemblyManager",
      "regionManager",
      "cityManager",
      "regionMarcketManager",
      "marcketManager"
    ]
  },
  {
    label: "服务类型",
    prop: "orderType",
    checked: true,
    type: "select",
    disabled: false,
    minwidth: "173px",
    placeholder: "请选择服务类型",
    role: [
      "merchant",
      "carrier",
      "transManager",
      "assemblyManager",
      "regionManager",
      "cityManager",
      "regionMarcketManager",
      "marcketManager"
    ]
  },
  {
    label: "客户信息",
    prop: "customerInfo",
    checked: false,
    disabled: false,
    minwidth: "80",
    placeholder: "请输入客户信息"
  },
  {
    label: "司机信息",
    prop: "driverInfo",
    checked: false,
    disabled: false,
    minwidth: "80",
    placeholder: "请输入司机姓名/电话"
  },
  {
    label: "车牌号",
    prop: "plateNo",
    checked: false,
    disabled: false,
    minwidth: "80",
    placeholder: "请输入车牌号"
  }
];

// 评价管理枚举数据
export const linkTypeList = [
  {
    label: "预约",
    value: "2",
    type: "1,2",
    waybillType: "12"
  },
  {
    label: "配送",
    value: "3",
    type: "1,2",
    waybillType: "12"
  },
  {
    label: "安装",
    value: "4",
    type: "2",
    waybillType: "2"
  },
  {
    label: "产品质量",
    value: "5",
    type: "1,2",
    waybillType: "23"
  },
  {
    label: "NPS",
    value: "11",
    type: "1,2",
    waybillType: ""
  },
  {
    label: "反馈建议",
    value: "12",
    type: "1,2",
    waybillType: ""
  }
];

export const Waybill_Type_List = [
  {
    msg: "配送",
    code: "1"
  },
  {
    msg: "配装",
    code: "2"
  }
];
