import http from "@/utils/http";

/**
 * 异常明细枚举
 *
 * @export
 * @param {any} params
 * @returns
 */
export function ExceptionStatusList(params) {
  return http.post("/bus/tree", params);
}

/**
 * 获取异常列表
 *
 * @export
 * @param {any} params
 * @returns
 */
export function getExceptionList(params) {
  return http.post("/abnormal/getList", params);
}

/**
 * 审核
 *
 * @export
 * @param {any} params
 * @returns
 */
export function auditException(params) {
  return http.post("/abnormal/audit", params);
}

/**
 * 异常明细
 *
 * @export
 * @param {any} params
 * @returns
 */
export function detailException(params) {
  return http.post("/abnormal/showDetail", params);
}

/**
 * 确认货品退回
 *
 * @export
 * @param {any} params
 * @returns
 */
export function returnException(params) {
  return http.post("/abnormal/returnProduct", params);
}
/**
 * 转至维修单
 *
 * @export
 * @param {any} params
 * @returns
 */
export function toRepair(params) {
  return http.post("/abnormal/turnToRepairInfo", params);
}
/**
 * 处理异常
 *
 * @export
 * @param {any} params
 * @returns
 */
export function saveAbnormalDeal(params) {
  return http.post("/abnormal/saveAbnormalDeal", params);
}
