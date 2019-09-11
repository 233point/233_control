import http from "@/utils/http";

/**
 * 根据订单查询
 *
 * @export
 * @param {any} params
 * @returns
 */
export function settledInfoStat(params) {
  return http.post("/website/settledInfoStat", params);
}
/**
 * 获取订单时间轴
 *
 * @export
 * @param {any} params
 * @returns
 */
export function tranInfo(params) {
  return http.post("/trans/transInfo", params);
}
