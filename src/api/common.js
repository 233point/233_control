/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-24 10:16:32
 * @LastEditTime: 2019-07-24 10:16:32
 * @LastEditors: your name
 */
import http from "@/utils/http";
/**
 * 通用接口定义
 */

/**
 * 获取对应模块的自定义权限按钮
 *
 * @export
 * @param {any} params
 * @returns
 */
export function getModuleButton(params) {
  return http.post("/menu/funList", params);
}

/**
 * 设备在线状态
 *
 * @export
 * @param {any} params
 * @returns
 */
export function deviceOnlineState() {
  return http.post("/deviceStatus/online/get");
}

/**
 * 报警类型/疲劳类型
 *getAllUserWithProject
 * @export
 * @param {any} params
 * @returns
 */
export function behaviorAlarmType() {
  return http.post("/common/warntypes/get");
}

/**
 * 组织机构类型
 *
 * @export
 * @returns
 */
export function getOrgList() {
  return http.post("/common/orgtypes/get");
}

/**
 * 查询组织机构下的线路
 *
 * @export
 * @param {any} params
 * @returns
 */
export function linesList(params) {
  return http.post("/lines/orgid/get", params);
}

/**
 * 查询线路下的车辆
 *
 * @export
 * @param {any} params
 * @returns
 */
export function busesList(params) {
  return http.post("/buses/line/get", params);
}

/**
 * 查询行为标记通用接口
 *
 * @export
 * @param {any} params
 * @returns
 */
export function warnMarksList() {
  return http.post("/common/warnMarks/get");
}
/**
 * 查询所有组织机构
 *
 * @export
 * @returns
 */
export function getAllOrgList() {
  return http.post("/org/orglist/get");
}

/**
 * 查询所有项目
 *
 * @export
 * @returns
 */
export function getAllProjectList() {
  return http.post("/org/getList");
}
/**
 * 查询所有商户
 *
 * @export
 * @returns
 */
export function getAllMerchantsList(params) {
  return http.post("/user/getUserByWarehouseId", params);
}
/**
 * 查询所有品牌
 *
 * @export
 * @returns
 */
export function getAllBrandList(params) {
  return http.post("/warehouse/brandlist", params);
}
/**
 * 获取可用设备下拉列表
 *
 * @export
 * @returns
 */
export function deviceList(params) {
  return http.post("/devices/devicelist/get", params);
}
/**
 * Excel导入---导入---模板下载
 *
 * @export
 * @returns
 */
export function downloadFile(params) {
  return http.post("/excel/template/download", params);
}
/**
 * Excel导入---导入---excel文件上传
 *
 * @export
 * @returns
 */
export function uploadFile(params) {
  return http.post("/excel/uploadFile", params);
}

/**
 * Excel导入---导入---保存
 *
 * @export
 * @returns
 */
export function uploadFileSave(params) {
  return http.post("/excel/create", params);
}

/**
 * Excel导入日志查看
 *
 * @export
 * @returns
 */
export function checkImportLog(params) {
  return http.post("/excel/log/logpage/get", params);
}
/**
 * 获取所有人员列表
 * @param {*} params
 */
export function getAllUserWithProject(params) {
  return http.post("/user/getAllWithProject", params);
}

/**
 * 获取指定角色的用户
 * @param {*} params
 */
export function getAllWithRoleType(params) {
  return http.post("/user/getListWithRoleType", params);
}

/**
 * 获取车型列表
 * @param {*} params
 */
export function getBusType(params) {
  return http.post("/bus/findBusType", params);
}

/**
 * 根据ID获取车辆信息
 * @param {*} params
 */
export function findOneByBusId(params) {
  return http.post("/bus/findOneByBusId", params);
}

/**
 * 根据ID获取车辆信息
 * @param {*} params
 */
export function converMile(params) {
  return http.post("/tool/converMile", params);
}

/**
 * 获取图片预览地址
 * @param {*} params
 */
export function getPicAddress(params) {
  return http.imgDownload("/bus/server/findImgByPath", params);
}

/**
 * 获取图片预览地址
 * @param {*} params
 */
export function ossUpload(params) {
  return http.post("/oss/Upload", params);
}

/**
 * 获取图片预览地址
 * @param {*} params
 */
export function checkUniqueAccount(params) {
  return http.post("/user/checkaccountavailability", params, "", "check201");
}
