/*
 * @Description: 评价管理相关接口
 * @Author: Calamus
 * @Date: 2019-08-16 10:47:46
 * @LastEditTime: 2019-08-20 18:09:56
 * @LastEditors: Please set LastEditors
 */
import http from "@/utils/http";
//,
// 问题管理接口

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
 * 获取商户列表
 *
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export function getMechantsList(params) {
  return http.post("/customer/Evaluation/getMerchantList", params);
}
/**
 * 获取项目列表
 *
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export function getProjectList(params) {
  return http.post("/customer/Evaluation/getProjectList", params);
}
/**
 * 分页获取问题列表
 *
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export function getQuestionList(params) {
  return http.post("/question/getList", params);
}

/**
 * 新增问题
 *
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export function addQuestion(params) {
  return http.post("/question/add", params);
}

/**
 * 修改问题
 *
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export function updateQuestion(params) {
  return http.post("/question/update", params);
}

/**
 * 删除问题
 *
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export function delQuestion(params) {
  return http.post("/question/del", params);
}

// 客户评价列表
/**
 * 分页获取评价列表
 *
 * @export
 * @param {any} params
 * @returns
 */
export function getEvaluationList(params) {
  return http.post("/customerEvaluation/getCustomerEvaluationList", params);
}

/**
 * 删除评价
 *
 * @export
 * @param {any} params
 * @returns
 */
export function deleteEvaluation(params) {
  return http.post("/customer/Evaluation/deleteCustomerEvaluation", params);
}

/**
 * 删除评价
 *
 * @export
 * @param {any} params
 * @returns
 */
export function editEvaluation(params) {
  return http.post("/customerEvaluation/customerEvaluation", params);
}
/**
 * 删除评价
 *
 * @export
 * @param {any} params
 * @returns
 */
export function addWaybill(params) {
  return http.post("/evaluation/addWaybillInfo", params);
}

/**
 * 删除评价
 *
 * @export
 * @param {any} params
 * @returns
 */
export function editWaybill(params) {
  return http.post("/customer/Evaluation/updateCustomerEvaluation ", params);
}
/**
 * 根据配送方式和对象类型获取问题列表
 *
 * @export
 * @param {any} params
 * @returns
 */
export function getQuestionCMList(params) {
  return http.post("/question/getListByType", params);
}

/**
 * 获取环节列表
 *
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export function getLinkTypeList(params) {
  return http.post("/customerEvaluation/getLinkTypeByWay", params);
}

/**
 * 批量导入
 *
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export function uploadTemplate(params) {
  return http.post("/evaluation/excelImport", params);
}
/**
 * 批量导出
 *
 * @param params
 * @returns {*|AxiosPromise<any>|void}
 */
export function exportTemplate(params) {
  return http.download("/customerEvaluation/exportCustomerEvaluation", params);
}

// 客户评价列表

/**
 * 删除评价
 *
 * @export
 * @param {any} params
 * @returns
 */
export function customerFailReason(params) {
  return http.post("/customerEvaluation/failEvaluaion", params);
}

/**
 * 根据配送方式和对象类型获取问题列表
 *
 * @export
 * @param {any} params
 * @returns
 */
export function getEvaluationDetail(params) {
  return http.post("/customerEvaluation/showDetail", params);
}

/**
 * 根据配送方式和对象类型获取问题列表
 *
 * @export
 * @param {any} params
 * @returns
 */
export function evaluateFollowUp(params) {
  return http.post("/customerEvaluation/followUp", params);
}
