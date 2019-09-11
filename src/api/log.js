import http from "@/utils/http";
/**
 * LOG API
 */

/**
 * 获取日志列表
 * @param {*} params
 */
export function getLogList(params) {
  return http.post("/logpage/get", params);
}
