/**
 * User Management Module
 * ----------------------
 * Author: luoxiaolei
 * Date: 2018.05.24
 */
import http from "@/utils/http";
/**
 * SYSTEM-MANAGER API
 */

/**
 *
 * 字典维护
 *
 */
/**
 * 数据字典-列表信息查询
 * @param {*} params
 */
export function dataDictListGet(params) {
  return http.post("/datadict/datadicttypepage/get", params);
}

/**
 * 数据字典-启用禁用
 * @param {*} params
 */
export function isvalidUpdate(params) {
  return http.post("/datadict/datadicttype/isvalid/update", params);
}

/**
 * 数据字典-新增
 * @param {*} params
 */
export function dictCreate(params) {
  return http.post("/datadict/datadicttype/create", params);
}

/**
 * 数据字典-编辑
 * @param {*} params
 */
export function dictUpdate(params) {
  return http.post("/datadict/datadicttype/update", params);
}

/**
 * 数据字典项-列表
 * @param {*} params
 */
export function datadictGet(params) {
  return http.post("/datadict/datadictpage/get", params);
}

/**
 * 数据字典项-启用禁用
 * @param {*} params
 */
export function datadictIsvalidUpdate(params) {
  return http.post("/datadict/isvalid/update", params);
}

/**
 * 数据字典-新增
 * @param {*} params
 */
export function datadictCreate(params) {
  return http.post("/datadict/create", params);
}

/**
 * 数据字典-编辑
 * @param {*} params
 */
export function datadictUpdate(params) {
  return http.post("/datadict/update", params);
}

/**
 *
 * 字典管理
 *
 */
/**
 * 字典管理-树结构列表
 * @param {*} params
 */
export function getDicTree() {
  return http.post("/dic/dictree/get");
}

/**
 * 字典管理-查看单个菜单节点详情
 * @param {*} params
 */
export function getDicDetail(params) {
  return http.post("/dic/dicdetail/get", params);
}

/**
 * 字典管理-新建字典节点
 * @param {*} params
 */
export function createDicNode(params) {
  return http.post("/dic/create", params);
}

/**
 * 字典管理-编辑字典节点
 * @param {*} params
 */
export function updateDicNode(params) {
  return http.post("/dic/update", params);
}

/**
 * 字典管理-移除字典节点
 * @param {*} params
 */
export function deleteDicNode(params) {
  return http.post("/dic/delete", params);
}

/**
 *
 * 参数设置
 *
 */
/**
 * 参数设置-列表
 * @param {*} params
 */
export function paramsListGet(params) {
  return http.post("/param/parampage/get", params);
}

/**
 * 参数设置-新增
 * @param {*} params
 */
export function paramsCreate(params) {
  return http.post("/param/create", params);
}

/**
 * 参数设置-编辑
 * @param {*} params
 */
export function paramsUpdate(params) {
  return http.post("/param/update", params);
}

/**
 * 参数设置-删除
 * @param {*} params
 */
export function paramsDelete(params) {
  return http.post("/param/delete", params);
}

/**
 *
 * 菜单管理
 *
 */
/**
 * 菜单管理-树结构列表
 * @param {*} params
 */
export function systemMenuTreeList() {
  return http.post("/resources/resourcestree/get");
}

/**
 * 菜单管理-查看单个菜单节点详情
 * @param {*} params
 */
export function systemMenuDetail(params) {
  return http.post("/resources/get", params);
}

/**
 * 菜单管理-新建菜单节点
 * @param {*} params
 */
export function systemMenuCreate(params) {
  return http.post("/resources/create", params);
}

/**
 * 菜单管理-编辑菜单节点
 * @param {*} params
 */
export function systemMenuEdit(params) {
  return http.post("/resources/update", params);
}

/**
 * 菜单管理-移除菜单节点
 * @param {*} params
 */
export function systemMenuDelete(params) {
  return http.post("/resources/delete", params);
}

/**
 *
 * 日志管理
 *
 */
/**
 * 日志
 * @param {*} params
 */
export function logpageGet(params) {
  return http.post("/log/logpage/get", params);
}

/**
 * 日志类型
 * @param {*} params
 */
export function logtypesGet(params) {
  return http.post("/common/logtypes/get", params);
}
