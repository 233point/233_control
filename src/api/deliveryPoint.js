import http from "@/utils/http";
/**
 * 提货点管理 API
 */

/**
 * 获取提货点列表树
 * @param {*} params
 */
export function getPointTree(params) {
  return http.post("/deliveryPoint/getListWithProject", params);
}

/**
 * 新增提货点
 * @param {*} params
 */
export function createPoint(params) {
  return http.post("/deliveryPoint/add", params);
}

/**
 * 编辑提货点
 * @param {*} params
 */
export function updatePoint(params) {
  return http.post("/deliveryPoint/update", params);
}

/**
 * 删除提货点
 * @param {*} params
 */
export function deletePonit(params) {
  return http.post("/deliveryPoint/del", params);
}
