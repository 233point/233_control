import http from "@/utils/http";
/**
 * DEVICE API
 */

/**
 * 设备在线状态接口
 * @param {*} params
 */
export function deviceStatus(params) {
  return http.post("/deviceStatus/online/get", params);
}
/**
 * 设备状态列表接口
 * @param {*} params
 */
export function deviceStatusList(params) {
  return http.post("/deviceStatus/statusPage/get", params);
}

/**
 * 统计查询列表
 * @param {*} params
 */
export function warnsQueryList(params) {
  return http.post("/query/warns/query/get", params);
}

/**
 * 疲劳检测详情记录查看接口
 * @param {*} params
 */
export function warndetailData(params) {
  return http.post("/warn/warndetail/get", params);
}
/**
 * 疲劳监测详情页面列表
 * @param {*} params
 */
export function warndetailList(params) {
  return http.post("/warns/driver/get", params);
}
