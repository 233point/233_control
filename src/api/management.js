import http from "@/utils/http";
/**
 * 线路管理通用接口定义
 */
/**
 * 线路管理---列表信息查询
 *
 * @export
 * @param {any} params
 * @returns
 */
export function linepageSearch(params) {
  return http.post("/lines/linepage/get", params);
}
/**
 * 线路管理---新增
 *
 * @export
 * @param {any} params
 * @returns
 */
export function createLine(params) {
  return http.post("/lines/create", params);
}
/**
 * 线路管理---编辑
 *
 * @export
 * @param {any} params
 * @returns
 */
export function updateLine(params) {
  return http.post("/lines/update", params);
}
/**
 * 线路管理---删除
 *
 * @export
 * @param {any} params
 * @returns
 */
export function deleteLine(params) {
  return http.post("/lines/delete", params);
}
/**
 * 线路管理---启用禁用
 *
 * @export
 * @param {any} params
 * @returns
 */
export function isvalidLine(params) {
  return http.post("/lines/isvalid/update", params);
}
/**
 * 车辆管理通用接口定义
 */
/**
 * 车辆管理---列表信息查询
 *
 * @export
 * @param {any} params
 * @returns
 */
export function buspageSearch(params) {
  return http.post("/buses/buspage/get", params);
}
/**
 * 车辆管理---新增
 *
 * @export
 * @param {any} params
 * @returns
 */
export function createBus(params) {
  return http.post("/buses/create", params);
}
/**
 * 车辆管理---编辑
 *
 * @export
 * @param {any} params
 * @returns
 */
export function updateBus(params) {
  return http.post("/buses/update", params);
}
/**
 * 车辆管理---删除
 *
 * @export
 * @param {any} params
 * @returns
 */
export function deleteBus(params) {
  return http.post("/buses/delete", params);
}
/**
 * 车辆管理---批量导入
 *
 * @export
 * @param {any} params
 * @returns
 */
export function exportsBus(params) {
  return http.post("/TsysExcel/add", params);
}
/**
 * 车辆管理---启用/禁用
 *
 * @export
 * @param {any} params
 * @returns
 */
export function isvalidBus(params) {
  return http.post("/buses/isvalid/update", params);
}
/**
 * 设备管理通用接口定义
 */
/**
 * 设备管理---列表信息查询
 *
 * @export
 * @param {any} params
 * @returns
 */
export function devicepageSearch(params) {
  return http.post("/devices/devicepage/get", params);
}
/**
 * 设备管理---新增
 *
 * @export
 * @param {any} params
 * @returns
 */
export function createDevice(params) {
  return http.post("/devices/create", params);
}
/**
 * 设备管理---编辑
 *
 * @export
 * @param {any} params
 * @returns
 */
export function updateDevice(params) {
  return http.post("/devices/update", params);
}
/**
 * 设备管理---删除
 *
 * @export
 * @param {any} params
 * @returns
 */
export function deleteDevice(params) {
  return http.post("/devices/delete", params);
}
/**
 * 设备管理---设备启用禁用
 *
 * @export
 * @param {any} params
 * @returns
 */
export function isvalidDevice(params) {
  return http.post("/devices/isvalid/update", params);
}

/**
 * 司机管理通用接口定义
 */
/**
 * 司机管理---列表信息查询
 *
 * @export
 * @param {any} params
 * @returns
 */
export function driverpageSearch(params) {
  return http.post("/drivers/driverpage/get", params);
}
/**
 * 司机管理---新增
 *
 * @export
 * @param {any} params
 * @returns
 */
export function createDriver(params) {
  return http.post("/drivers/create", params);
}
/**
 * 司机管理---编辑
 *
 * @export
 * @param {any} params
 * @returns
 */
export function updateDriver(params) {
  return http.post("/drivers/update", params);
}
/**
 * 司机管理---删除
 *
 * @export
 * @param {any} params
 * @returns
 */
export function deleteDriver(params) {
  return http.post("/drivers/delete", params);
}
/**
 * 司机管理---启用禁用
 *
 * @export
 * @param {any} params
 * @returns
 */
export function isvalidDriver(params) {
  return http.post("/drivers/isvalid/update", params);
}
/**
 * 3-6-6运营信息
 *
 * @export
 * @param {any} params
 * @returns
 */
export function operatSearch(params) {
  return http.post("/operat/operatpage/get", params);
}
