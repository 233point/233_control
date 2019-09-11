import http from "@/utils/http";

/**
 * 获取未分配订单列表
 * @param {*} params
 */
export function getDistributionWaitList(params) {
  return http.post("/waybill/getWaitList", params);
}

/**
 * 获取送货单列表
 * @param {*} params
 */
export function getDeliveryList(params) {
  return http.post("/delivery/getList", params);
}

/**
 * 新增配送任务
 * @param {*} params
 */
export function addDelivery(params) {
  return http.post("/delivery/add", params);
}
/**
 * 修改配送任务(送货单)
 * @param {*} params
 */
export function updateDelivery(params) {
  return http.post("/delivery/update", params);
}
/**
 * 修改配送任务(发车时刻表)
 * @param {*} params
 */
export function updateTimeTableDelivery(params) {
  return http.post("/delivery/changeDelivery", params);
}

/**
 * 删除配送任务
 * @param {*} params
 */
export function delDelivery(params) {
  return http.post("/delivery/del", params);
}

/**
 * 修改今日配送任务(发车时刻表)
 * @param {*} params
 */
export function getTodayList(params) {
  return http.post("/delivery/getTodayList", params);
}

/**
 * 查看送货单详细
 * @param {*} params
 */
export function getDeliveryDetail(params) {
  return http.post("/delivery/detail", params);
}

/**
 * 查看送货单详细
 * @param {*} params
 */
export function returnDistribute(params) {
  return http.post("/trans/backDispatch", params);
}
