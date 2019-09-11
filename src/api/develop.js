import http from "@/utils/http";
/**
 * Develop API
 */

/**
 * 获取用户列表
 * @param {*} params
 */
export function getDevelopList(params) {
  return http.post("/develop/contracts/get", params);
}
