import http from "@/utils/http";

/**
 * 各状态订单数统计
 *
 * @export
 * @param {any} params
 * @returns
 */
export function getWaybillStat(params) {
  return http.post("/homePage/getCumulativeData", params);
}

/**
 * 区域订单量
 *
 * @export
 * @param {any} params
 * @returns
 */
export function getWaybillStatByArea(params) {
  return http.post("/home/waybillStatByArea",params);
}

/**
 * 客户热力图
 *
 * @export
 * @param {any} params
 * @returns
 */
export function getHeartmap() {
  return http.get("/home/heartmap");
}

/**
 * 订单总量
 *
 * @export
 * @param {any} params
 * @returns
 */
export function getWaybillStatByDay(params) {
  return http.post("/home/waybillStatByDay", params);
}

/**
 * 当日配装进度
 *
 * @export
 * @param {any} params
 * @returns
 */
export function getTransProgress(params) {
  return http.post("/home/transProgress", params);
}

/**
 * 主页前2个tab
 *
 * @export
 * @param {any} params
 * @returns
 */
export function userindicatorscollection() {
  return http.post("/homePage/getCumulativeData");
}
/**
 * 获取订单信息柱状图
 *
 * @export
 * @param {any} params
 * @returns
 */
export function waybillmulitstat(params) {
  return http.post("/exchange/home/waybillmulitstat", params);
}
/**
 * 服务排行榜
 *
 * @export
 * @param {any} params
 * @returns
 */
export function serviceRankingList() {
  return http.get("/exchange/home/serviceRankingList");
}
/**
 *
 * 客户满意度统计
 * @export
 * @param {any} params
 * @returns
 */
export function cStatSatisfyByWaybillType(params) {
  return http.post("/resultCustomer/cStatSatisfyByWaybillType", params);
}
/**
 *
 * 问题统计
 * @export
 * @param {any} params
 * @returns
 */
export function cQuestionPointStat(params) {
  return http.post("/resultCustomer/cQuestionPointStat", params);
}
/**
 *
 * 配装进度
 * @export
 * @param {any} params
 * @returns
 */
export function transProgress(params) {
  return http.post("/exchange/home/transProgress",params);
}
/**
 *
 * 商户订单数
 * @export
 * @param {any} params
 * @returns
 */
export function merchantsbills() {
  return http.get("/exchange/home/merchantsbills");
}
/**
 *
 * 服务评分
 * @export
 * @param {any} params
 * @returns
 */
export function getAverageSatisfactionByRoleType() {
  return http.post("/resultCustomer/getAverageSatisfactionByRoleType");
}
/**
 *
 *车辆排名
 * @export
 * @param {any} params
 * @returns
 */
export function plateNoList(params) {
  return http.post("/homePage/plateNoList",params);
}
/**
 *
 *司机排名
 * @export
 * @param {any} params
 * @returns
 */
export function driverList(params) {
  return http.post("/homePage/driverList",params);
}
