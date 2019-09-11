import http from "@/utils/http";
/**
 * My API
 */

/**
 * 登录
 *
 * @export
 * @param {any} params
 * @returns
 */
export function commonLogin(params) {
  return http.post("/user/my/login", params);
}

export function commonLogout(token) {
  return http.post("/user/my/logout", token);
}

/**
 * 获取个人信息
 *
 * @export
 * @param {any} params
 * @returns
 */
export function getUserInfo(params) {
  return http.post("/user/my/info/get", params);
}

/**
 * 修改密码
 * @param {*} params
 */
export function editPassword(params) {
  return http.post("/user/my/password/update", params);
}
