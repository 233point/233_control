import http from "@/utils/http";
/**
 * 仓库管理
 */
/**
 * 获取仓库列表(分页)
 * @param {*} params
 */
export function getWarehouseTable(params) {
  return http.post("/warehouse/table", params);
}

/**
 * 仓库管理
 */
/**
 * 获取仓库列表(不分页）
 * @param {*} params
 */
export function getProjectList(params) {
  return http.post("/org/getList", params);
}

/**
 * 获取仓库详情
 * @param params
 * @returns {*}
 */
export function getWarehouseDetail(params) {
  return http.post("/warehouse/detail", params);
}

/**
 * 新建仓库
 * @param params
 * @returns {*}
 */
export function updateWarehouse(params) {
  return http.post("/warehouse/update", params);
}

/**
 * 删除仓库
 * @param params
 * @returns {*}
 */
export function deleteWarehouse(params) {
  return http.post("/warehouse/delete", params);
}

/**
 * 库位管理
 */

/**
 * 获取一个仓库下的所有库位
 * @param params
 * @returns {*}
 */
export function getShelvesTree(params) {
  return http.post("/warehouse/shelvestree/get", params);
}

/**
 * 新增/修改库位
 * @param params
 * @returns {*}
 */
export function updateShelves(params) {
  return http.post("/warehouse/shelvestree/update", params);
}

/**
 * 删除库位
 * @param params
 * @returns {*}
 */
export function deleteShelves(params) {
  return http.post("/warehouse/shelvestree/delete", params);
}

/**
 * 批量删除库位
 * @param params
 * @returns {*}
 */
export function deleteShelvesList(params) {
  return http.post("/warehouse/shelvestree/delete", params);
}

/**
 * 多库位生成
 * @param params
 * @returns {*}
 */
export function createMoreShelves(params) {
  return http.post("/warehouse/shelvestree/createMore", params);
}

/**
 * 产品模版相关接口
 */
/**
 * 获取模版列表
 * @param {*} params
 */
export function getProducetTemplateList(params) {
  return http.post("/warehouse/template", params);
}

/**
 * 新增/编辑模版
 * @param {*} params
 */
export function editTemplate(params) {
  return http.post("/warehouse/template/edit", params);
}

/**
 * 删除模版
 * @param {*} params
 */
export function delTemplate(params) {
  return http.post("/warehouse/template/del", params);
}

/**
 * 下载模版
 * @param {*} params
 */
export function downloadTemplate(params) {
  return http.post("/warehouse/download", params);
}

/**
 * 上传文件模版
 * @param {*} params
 */
export function uploadTemplate(params) {
  return http.post("/warehouse/upload", params);
}

/** 维修管理**/
/**
 *  获取维修数据信息
 * @param {*} params
 */
export function maintenanceList(params) {
  return http.post("/warehouse/maintenance/get", params);
}
/**
 * 维修方式列表
 * @param {*} params
 */
export function maintenanceMethodsList(params) {
  return http.post("/warehouse/maintence/methodsList", params);
}
/**
 * 状态列表
 * @param {*} params
 */
export function maintenanceStatusList(params) {
  return http.post("/warehouse/maintence/statusList", params);
}
/**
 * 修改维修状态
 * @param {*} params
 */
export function maintenanceUpdate(params) {
  return http.post("/warehouse/maintence/update", params);
}

/** *******质检管理**********/
/**
 * 获取待质检数据
 * @param {*} params
 */
export function qualityList(params) {
  return http.post("/warehouse/quality/get", params);
}
/**
 * 获取待质检状态列表
 * @param {*} params
 */
export function qualityStatusList(params) {
  return http.post("/warehouse/quality/statusList", params);
}
/**
 * 质检来源
 * @param {*} params
 */
export function qualityOrigin(params) {
  return http.post("/warehouse/quality/origin", params);
}
/**
 * 质检不通过
 * @param {*} params
 */
export function qualityFail(params) {
  return http.post("/warehouse/quality/fail", params);
}
/**
 * 质检通过
 * @param {*} params
 */
export function qualityPass(params) {
  return http.post("/warehouse/quality/pass", params);
}

/**
 * 查询库位中货物信息
 * @param {*} params
 */
export function getGoodsList(params) {
  return http.post("/shelves/goods/get", params);
}

/**
 * 获取任务池任务
 * @param {*} params
 */
export function getTask(params) {
  return http.post("/task/get", params);
}

/** *************交易明细接口***************/
/**
 * 获取交易明细列表
 * @param {*} params
 */
export function transactionList(params) {
  return http.post("/warehouse/transactionDetail/get", params);
}

/**
 * 导出交易明细列表
 * @param {*} params
 */
export function transactionExport(params) {
  return http.post("/warehouse/transactionDetail/download", params);
}

/** *************库存管理接口***************/
/**
 * 获取库存明细列表
 * @param {*} params
 */
export function stockManagementList(params) {
  return http.post("/warehouse/stockManagement/get", params);
}
/**
 * 获取库存明细
 * @param {*} params
 */
export function stockManagementDetail(params) {
  return http.post("/warehouse/stockManagement/getDetail", params);
}

/**
 * 导出库存明细列表
 * @param {*} params
 */
export function stockManagemenExport(params) {
  return http.post("/warehouse/stockManagement/download", params);
}

/** *************库存盘点接口***************/
/**
 * 获取库存盘点列表
 * @param {*} params
 */
export function stockCheckedList(params) {
  return http.post("/warehouse/stockChecked/get", params);
}

/**
 * 获取库存盘点详情
 * @param {*} params
 */
export function stockCheckedtDetail(params) {
  return http.post("/warehouse/stockChecked/getDetail", params);
}
/**
 * 新增库存盘点
 * @param {*} params
 */
export function stockCheckedAdd(params) {
  return http.post("/warehouse/stockChecked/add", params);
}
/**
 * 修改库存盘点详情
 * @param {*} params
 */
export function stockCheckedEdit(params) {
  return http.post("/warehouse/stockChecked/edit", params);
}
/**
 * 删除库存盘点
 * @param {*} params
 */
export function stockCheckedDel(params) {
  return http.post("/warehouse/stockChecked/del", params);
}

/**
 * 导出库存盘点详情
 * @param {*} params
 */
export function stockCheckedExport(params) {
  return http.post("/warehouse/stockChecked/download", params);
}
/**
 * 获取项目列表
 * @param {*} params
 */
export function getOrgTree() {
  return http.post("/org/orgtree/get");
}
/**
 * 新增商场
 * @param {*} params
 */
export function createMarket(params) {
  return http.post("/api/markets", params);
}
/**
 * 编辑商场
 * @param {*} params
 */
export function updateMarket(params) {
  return http.put("/api/markets", params);
}
/**
 * 删除商场
 * @param {*} params
 */
export function deleteMarket(params) {
  return http.delete("/api/markets", "/" + params);
}
/**
 * 获取商场
 * @param {*} params
 */
export function getMarket(params) {
  return http.post("/api/markets/queryWithPage", params);
}
/**
 * 获取城市下的商场
 * @param {*} params
 */
export function queryNoPage(params) {
  return http.post("/api/markets/queryNoPage", params);
}
