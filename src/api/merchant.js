/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-09 10:13:37
 * @LastEditTime: 2019-09-09 10:24:44
 * @LastEditors: Please set LastEditors
 */
import http from "@/utils/http";

/**
 * 根据订单查询
 *
 * @export
 * @param {any} params
 * @returns
 */
export function bindMerchant(params) {
  return http.post("/bindMerchant/settledInfoStat", params);
}

/**
 * 根据订单查询
 *
 * @export
 * @param {any} params
 * @returns
 */
export function getAllMerchantsList(params) {
    return http.post("/getAllMerchantsList/settledInfoStat", params);
  }

/**
 * 根据订单查询
 *
 * @export
 * @param {any} params
 * @returns
 */
export function getWareHouseByOrg(params) {
    return http.post("/getAllMerchantsList/settledInfoStat", params);
  }

/**
 * 根据订单查询
 *
 * @export
 * @param {any} params
 * @returns
 */
export function queryPartABInfo(params) {
    return http.post("/getAllMerchantsList/settledInfoStat", params);
  }
  
/**
 * 根据订单查询
 *
 * @export
 * @param {any} params
 * @returns
 */
export function bindMerchantQuery(params) {
    return http.post("/getAllMerchantsList/settledInfoStat", params);
  }

/**
 * 根据订单查询
 *
 * @export
 * @param {any} params
 * @returns
 */
export function bindingMerchantRemove(params) {
    return http.post("/getAllMerchantsList/settledInfoStat", params);
  }