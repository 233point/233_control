/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-24 10:16:32
 * @LastEditTime: 2019-07-24 10:16:32
 * @LastEditors: your name
 */
import http from "@/utils/http";
/**
 * USER API
 */

/**
 * 获取装配数据统计
 * @param {*} params
 */
export function getInstallData(params) {
  return http.post("/trans/transData", params);
}

/**
 * 获取装配订单详情
 * @param {*} params
 */
export function getInstallDetail(params) {
  return http.post("/trans/transDetail", params);
}

/**
 * 获取获取配装详细
 * @param {*} params
 */
export function getTransInfoDetail(params) {
  return http.post("/trans/transInfo", params);
}

/**
 * 获取司机运营统计
 * @param {*} params
 */
export function QueryDriverOper(params) {
  return http.post("/stat/queryDriverOper", params);
}

/**
 * 获取司机运营统计详情
 * @param {*} params
 */
export function QueryDriverOperDetail(params) {
  return http.post("/stat/driverReportInfoDetail", params);
}

/**
 * 获取品牌配送统计
 * @param {*} params
 */
export function QueryBrandStat(params) {
  return http.post("/stat/queryBrandStat", params);
}
/**
 * 获取品牌配送统计详情
 * @param {*} params
 */
export function QueryBrandStatDetail(params) {
  return http.post("/stat/productBrandOperInfoDetail", params);
}

/**
 * 获取品牌列表
 * @param {*} params
 */
export function getBrandList(params) {
  return http.post("/stat/getBrandList", params);
}

/**
 * 获取油耗比统计
 * @param {*} params
 */
export function AnalysisOis(params) {
  return http.post("/stat/analysisOis", params);
}

/**
 * 获取油耗比统计详情
 * @param {*} params
 */
export function BusOilDailyInfoDetail(params) {
  return http.post("/stat/busOilDailyInfoDetail", params);
}

/**
 * 获取车辆运营统计
 * @param {*} params
 */
export function QueryBusOper(params) {
  return http.post("/stat/queryBusOper", params);
}
/**
 * 获取车辆运营统计详情
 * @param {*} params
 */
export function QueryBusOperDetail(params) {
  return http.post("/stat/busOprDailyInfoDetail", params);
}

/**
 * 订单明细统计
 * @param {*} params
 */
export function waybillDetailStat(params) {
  return http.post("/waybillStat/waybillDetailStat", params);
}

/**
 * 订单明细统计导出
 * @param {*} params
 */
export function exportWaybillDatail(params) {
  return http.download("/waybillStat/exportWaybillDatail", params);
}

/**
 * 订单发货统计
 * @param {*} params
 */
export function waybillDeliveryStat(params) {
  return http.post("/waybillStat/waybillDeliveryStat", params);
}

/**
 * 订单发货统计导出
 * @param {*} params
 */
export function exportWaybillDelivery(params) {
  return http.download("/waybillStat/exportWaybillDelivery", params);
}
/**
 * 订单统计
 * @param {*} params
 */
export function waybillTongji(params) {
  return http.post("/exchange/waybillstat/query", params);
}
/**
 * 订单统计获取商户信息
 * @param {*} params
 */
export function queryTomerchant(params) {
  return http.post("/exchange/waybillstat/queryTomerchant", params);
}

/**
 * 订单统计导出
 * @param {*} params
 */
export function waybillTongjiExport(params) {
  return http.download("/exchange/waybillstat/newexportExcel", params);
}
/**
 * 配装统计
 * @param {*} params
 */
export function waybillLoading(params) {
  return http.post("/exchange/waybillLoading/query", params);
}
/**
 * 配装统计导出
 * @param {*} params
 */
export function waybillLoadingExport(params) {
  return http.download("/exchange/waybillLoading/newexportExcel", params);
}

/**
 * 异常统计
 * @param {*} params
 */
export function waybillAbnormal(params) {
  return http.post("/exchange/waybillAbnormal/query", params);
}
/**
 * 异常统计导出
 * @param {*} params
 */
export function waybillAbnormalExport(params) {
  return http.download("/exchange/waybillAbnormal/newexportExcel", params);
}
/**
 * 满意度统计
 * @param {*} params
 */
export function waybillSatisfaction(params) {
  return http.post("/exchange/waybillSatisfaction/query", params);
}
/**
 * 满意度统计导出
 * @param {*} params
 */
export function waybillSatisfactionExport(params) {
  return http.download("/exchange/waybillSatisfaction/newexportExcel", params);
}
/**
 * 车辆统计
 * @param {*} params
 */
export function busWaybillLoading(params) {
  return http.post("/exchange/driverWaybillLoading/querybus", params);
}
/**
 * 车辆统计查看单个
 * @param {*} params
 */
export function pointTosingle(params) {
  return http.post("/exchange/driverWaybillLoading/pointTosingle", params);
}

/**
 * cheliang统计导出
 * @param {*} params
 */
export function driverWaybillLoadingExport(params) {
  return http.download("/exchange/driverWaybillLoading/newexportExcel", params);
}
/**
 * 司机统计
 * @param {*} params
 */
export function driverWaybillLoading(params) {
  return http.post("/exchange/driverWaybillLoading/queryDriver", params);
}
/**
 * 车辆统计获取车辆列表
 * @param {*} params
 */
export function driverIdList(params) {
  return http.post("/exchange/driverWaybillLoading/driverIdList", params);
}
// /**
//  * 司机统计导出
//  * @param {*} params
//  */
// export function driverWaybillLoadingExport(params) {
//   return http.download("/exchange/driverWaybillLoading/newexportExcel", params);
// }
