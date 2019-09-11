/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-16 17:00:09
 * @LastEditTime: 2019-08-21 14:58:55
 * @LastEditors: Please set LastEditors
 */
import http from "@/utils/http";

/**
 * 获取订单列表
 *
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export function getOrderList(params) {
  return http.post("/waybill/getList", params);
}

/**
 * 获取订单列表
 *
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export function getMainOrderList(params) {
  return http.post("/waybill/getMainList", params);
}

/**
 * 获取商户列表
 *
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export function getMerchantList(params) {
  return http.post("/user/getMerchantList", params);
}

/**
 * 获取客户列表
 *
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export function getCustomerList(params) {
  return http.post("/customer/getList", params);
}

/**
 * 获取订单类型
 *
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export function getWaybillTypeList(params) {
  return http.post("/waybill/getWaybillTypeList", params);
}

/**
 * 获取订单详情
 *
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export function getOrderDetail(params) {
  return http.post("/waybill/showDetail", params);
}

/**
 * 获取货物列表
 *
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export function getProductList(params) {
  return http.post("/product/getTemplateList", params);
}

/**
 * 获取货物品牌列表
 *
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export function getBrandList(params) {
  return http.post("/product/getBrandList", params);
}

/**
 * 获取货物型号列表
 *
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export function getModelList(params) {
  return http.post("/product/getProductModelList", params);
}

/**
 * 新增订单
 *
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export function addWaybill(params) {
  return http.post("/waybill/add", params);
}

/**
 * 新增货品
 *
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export function addProduct(params) {
  return http.post("/waybill/addProduct", params);
}

/**
 * 编辑
 *
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export function updateWaybill(params) {
  return http.post("/waybill/update", params);
}

/**
 * 删除
 *
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export function deleteWaybill(params) {
  return http.post("/waybill/del", params);
}

/**
 * 上传文件模版
 * @param {*} params
 */
export function uploadTemplate(params) {
  return http.post("/waybill/excelImport", params);
}

/**
 * 预约送货
 * @param {*} params
 */
export function appointOrder(params) {
  return http.post("/waybill/appoint", params);
}

/**
 * 一键派单
 * @param {*} params
 */
export function quickAddOrder(params) {
  return http.post("/waybill/excelImport", params);
}

/**
 * 审核送货单
 * @param {*} params
 */
export function deliveryAudit(params) {
  return http.post("/delivery/audit", params);
}

/**
 * 根据品牌型号获取货品模板
 * @param {*} params
 */
export function getTemplate(params) {
  return http.post("/waybill/getTemplate", params);
}

/**
 * 获取订单预约列表
 * @param {*} params
 */
export function getAppointList(params) {
  return http.post("/waybill/getAppointList", params);
}
/**
 * 同步模板
 * @param {*} params
 */
export function syncProductTemplate(params) {
  return http.post("/sync/syncProductTemplate", params);
}

/**
 * 同步模板
 * @param {*} params
 */
export function getImportUrl(params) {
  return http.post("/waybill/excelImportTemplate", params);
}

// 订单管理
/**
 * 登录
 *
 * @export
 * @param {any} params
 * @returns
 */
export function mercureList(params) {
  return http.post("/mercure/product/query", params);
}

/**
 * 分页查询订单列表
 *
 * @export
 * @param {any} params
 * @returns
 */
export function orderList(params) {
  return http.post("/waybill/ctms/getList", params);
}

/**
 * 分页查询安装绑定单
 *
 * @export
 * @param {any} params
 * @returns
 */
export function installOrderList(params) {
  return http.post("/ctms/getWaybillListWithOrderType", params);
}

/**
 * 新增订单客户
 *
 * @export
 * @param {any} params
 * @returns
 */
export function orderAddProduct(params) {
  return http.post("/waybill/ctms/addProduct", params);
}
/**
 * 编辑订单
 *
 * @export
 * @param {any} params
 * @returns
 */
export function updateOrder(params) {
  return http.post("/waybill/ctms/update", params);
}

/**
 * 登录
 *
 * @export
 * @param {any} params
 * @returns
 */
export function delMercure(params) {
  return http.post("/mercure/product/del", params);
}

/**
 * 登录
 *
 * @export
 * @param {any} params
 * @returns
 */
export function addMercure(params) {
  return http.post("/mercure/product/add", params);
}

/**
 * 登录
 *
 * @export
 * @param {any} params
 * @returns
 */
export function editMercure(params) {
  return http.post("/mercure/product/edit", params);
}

/**
 * 同步模板
 * @param {*} params
 */
export function uploadExcell(params) {
  return http.post("/waybill/ctms/newExcelImportV2", params);
}

/**
 * 订单关闭
 * @param {*} params
 */
export function orderClose(params) {
  return http.post("/waybill/ctms/close", params);
}

/**
 * 订单撤销
 * @param {*} params
 */
export function orderCancel(params) {
  return http.post("/trans/withdraw", params);
}

/**
 * 查询商户列表
 * @param {*} params
 */
export function getMerchantsByAssembly(params) {
  return http.get("/api/carrierservicemerchants", params);
}
/**
 * 查询商户相关客户
 * @param {*} params
 */
export function getCustomerByMerchant(params) {
  return http.post("/customer/customers", params);
}
/**
 * 查询提货点
 * @param {*} params
 */
export function getListNoPage(params) {
  return http.post("/deliveryPoint/getListNoPage", params);
}

/**
 * 查询提货点
 * @param {*} params
 */
export function addCustomerInfo(params) {
  return http.post("/waybill/ctms/add", params);
}

/**
 * 查询提货点
 * @param {*} params
 */
export function addProductInfo(params) {
  return http.post("/waybill/ctms/addProduct", params);
}

/**
 * 查询提货点
 * @param {*} params
 */
export function diyExportWaybillDatail(params) {
  return http.download("/waybill/ctms/diyExportWaybillDatail", params);
}
/**
 * 商户查询司机列表
 * @param {*} params
 */
export function merchantsQuerydrivers(params) {
  return http.post("/api/merchants/querydrivers", params);
}

/**
 * 商户查询车辆列表
 * @param {*} params
 */
export function merchantsQuerybus(params) {
  return http.post("/api/merchants/querybus", params);
}

/**
 * 商户根据订单匹配技能相符的安装工
 * @param {*} params
 */
export function queryinstaller(params) {
  return http.post("/api/merchants/queryinstaller", params);
}
/**
 * 提交订单派车
 * @param {*} params
 */
export function transSubmit(params) {
  return http.post("/trans/waybilldistribute", params);
}
/**
 * 批量提交订单派车
 * @param {*} params
 */
export function batchwaybilldistribute(params) {
  return http.post("/trans/batchwaybilldistribute", params);
}
/**
 * 服务商提交订单派车
 * @param {*} params
 */
export function waybilldistributetocarrier(params) {
  return http.post("/trans/waybilldistributetocarrier", params);
}
/**
 * 服务商批量提交订单派车提交订单派车
 * @param {*} params
 */
export function batchwaybilldistributetocarrier(params) {
  return http.post("/trans/batchwaybilldistributetocarrier", params);
}
/**
 * 服务商查询司机列表
 * @param {*} params
 */
export function carriesQuerydrivers(params) {
  return http.post("/api/carriers/querydrivers", params);
}
/**
 * 查询商户的可用服务商列表
 * @param {*} params
 */
export function querycarriers(params) {
  return http.post("/api/merchants/querycarriers", params);
}
/**
 * 查询可派单订单列表
 * @param {*} params
 */
export function getTransInfoList(params) {
  return http.post("/trans/getTransInfoList", params);
}

/**
 * 配装管理相关接口
 */
/**
 * 查询配装列表
 * @param {*} params
 */
export function getInstallList(params) {
  return http.post("/trans/getTranInfoLoadingVoList", params);
}

/**
 * 异常管理相关接口
 */
/**
 * 查询配装列表
 * @param {*} params
 */
export function getAbnormalList(params) {
  return http.post("/abnormal/getAbnormalList", params);
}
/**
 * 配装列表导出
 * @param {*} params
 */
export function diyExportLoadingDatail(params) {
  return http.download("/trans/ctms/diyExportLoadingDatail", params);
}
/**
 * 异常列表导出
 * @param {*} params
 */
export function diyExportAbnormalInfoDatail(params) {
  return http.download("/abnormal/ctms/diyExportAbnormalInfoDatail", params);
}
/**
 * 运单列表下发服务商
 * @param {*} params
 */
export function waybillbatchwaybilldistributetocarrier(params) {
  return http.post("/waybill/batchwaybilldistributetocarrier", params);
}