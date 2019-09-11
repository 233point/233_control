import http from "@/utils/http";
/**
 * ROUTE API
 */

/**
 * 获取各项目车辆列表树
 *
 * @export
 * @param {any} params
 * @returns
 */
export function getvehicleTree(params) {
  return http.post("/bus/tree", params);
}

/**
 * 获取车辆位置
 *
 * @export
 * @param {any} params
 * @returns
 */
export function getvehiclePos(params) {
  return http.post("/vehicle/pos", params);
}

/**
 * 获取订单信息
 *track
 * @export
 * @param {any} params
 * @returns
 */
export function getTransInfo(params) {
  return http.post("/trans/getTransInfo", params);
}

/**
 * 获取订单轨迹信息
 *track
 * @export
 * @param {any} params
 * @returns
 */
export function getTrailList(params, that) {
  return http.post("/ctmsapi/gps/getNewGpsList", params, null, null, that);
}

/**
 * 车辆管理查询
 *track
 * @export
 * @param {any} params
 * @returns
 */
export function getVehicleList(params) {
  return http.post("/bus/getList", params);
}

/**
 * 获取车牌号列表
 *track
 * @export
 * @param {any} params
 * @returns
 */
export function getPlateNoList(params) {
  return http.post("/bus/getPlateNoList", params);
}
/**
 * 获取车辆列表
 *track
 * @export
 * @param {any} params
 * @returns
 */
export function getListWithProject(params) {
  return http.post("/bus/getListWithProject", params);
}
/**
 * 新增车辆
 *track
 * @export
 * @param {any} params
 * @returns
 */
export function addVehicle(params) {
  return http.post("/bus/add", params);
}
/**
 * 编辑车辆
 *track
 * @export
 * @param {any} params
 * @returns
 */
export function editVehicle(params) {
  return http.post("/bus/update", params);
}
/**
 * 车辆状态修改
 *track
 * @export
 * @param {any} params
 * @returns
 */
export function changeVehicle(params) {
  return http.post("/bus/changeStatus", params);
}
/**
 * 油费管理
 *track
 * @export
 * @param {any} params
 * @returns
 */
export function getPostageList(params) {
  return http.post("/busOil/getList", params);
}

/**
 * 油费删除
 *track
 * @export
 * @param {any} params
 * @returns
 */
export function delPostage(params) {
  return http.post("/busOil/batchDel", params);
}

/**
 * 油费add
 *track
 * @export
 * @param {any} params
 * @returns
 */
export function addPostage(params) {
  return http.post("/busOil/add", params);
}

/**
 * 油费edit
 *track
 * @export
 * @param {any} params
 * @returns
 */
export function editPostage(params) {
  return http.post("/busOil/update", params);
}

/**
 * 油费提交审核
 *track
 * @export
 * @param {any} params
 * @returns
 */
export function auditPostage(params) {
  return http.post("/busOil/toAudit", params);
}

/**
 * 油费审核
 *track
 * @export
 * @param {any} params
 * @returns
 */
export function sendAuditPostage(params) {
  return http.post("/busOil/audit", params);
}

/**
 * 获取订单在途列表
 *track
 * @export
 * @param {any} params
 * @returns
 */
export function getMonitorList(params) {
  return http.post("/trans/getMonitorList", params);
}

/**
 * 获取车辆当前位置信息
 *track
 * @export
 * @param {any} params
 * @returns
 */
export function getDriverGps(params) {
  return http.post("/ctmsapi/gps/getDriverGps", params);
}
/**
 * 获取车辆列表
 *track
 * @export
 * @param {any} params
 * @returns
 */
export function getBusList(params) {
  return http.post("/trans/getBusList", params);
}
