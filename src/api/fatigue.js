/**
 * User Management Module
 * ----------------------
 * Author: luoxiaolei
 * Date: 2018.05.24
 */
import http from "@/utils/http";
/**
 * 通用接口定义
 */

/**
 * 疲劳检测列表接口
 *
 * @export
 * @param {any} params
 * @returns
 */
export function warnsGet(params) {
  return http.post("/warns/platfromPage/get", params);
}

/**
 * 查询线路列表
 *
 * @export
 * @param {any} params
 * @returns
 */
export function linesOrigidGet(params) {
  return http.post("/lines/orgid/get", params);
}

/**
 * 疲劳检测柱状图接口
 *
 * @export
 * @param {any} params
 * @returns
 */
export function warnsEchartGet(params) {
  return http.post("/warns/echart/get", params);
}

/**
 * 疲劳监测详情页面列表
 *
 * @export
 * @param {any} params
 * @returns
 */
export function warnsDriverGet(params) {
  return http.post("/warns/driver/get", params);
}

/**
 * 疲劳监测详情记录查看接口
 *
 * @export
 * @param {any} params
 * @returns
 */
export function warnsWarndetailGet(params) {
  return http.post("/warns/warndetail/get", params);
}

/**
 * 疲劳监测报警处理接口
 *
 * @export
 * @param {any} params
 * @returns
 */
export function warnWarntagUpdate(params) {
  return http.post("/warns/warntag/update", params);
}

/**
 *  查询行为标记通用接口
 *
 * @export
 * @param {any} params
 * @returns
 */
export function commonWarnMarksGet(params) {
  return http.post("/common/warnMarks/get", params);
}
