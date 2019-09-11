import http from "@/utils/http";

/**
 * 获取订单列表
 *
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export function getOrderList(params) {
  return http.post("/repair/getList", params);
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
 * 获取维修工列表
 *
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export function getRepairManInfoWithProject(params) {
  return http.post("/repair/getRepairManInfoWithProject", params);
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
  return http.post("/repair/showRepairInfoDetail", params);
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
  return http.post("/repair/add", params);
}

/**
 * 新增货品
 *
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export function addProduct(params) {
  return http.post("/repair/addProduct", params);
}

/**
 * 编辑
 *
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export function updateWaybill(params) {
  return http.post("/repair/update ", params);
}

/**
 * 删除
 *
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export function deleteWaybill(params) {
  return http.post("/repair/del", params);
}

/**
 * 批量分配
 *
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export function batchDetach(params) {
  return http.post("/repair/batchDispatch", params);
}

/**
 * 批量完成
 *
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export function betachComplete(params) {
  return http.post("/repair/batchFinish", params);
}

/**
 * 上传文件模版
 * @param {*} params
 */
export function uploadTemplate(params) {
  return http.post("/repair/excelImport", params);
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
