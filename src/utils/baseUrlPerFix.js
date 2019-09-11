/*
 * @Description: In User Settings Edit
 * @Author: Calamus
 * @Date: 2019-08-06 15:11:42
 * @LastEditTime: 2019-09-06 15:17:31
 * @LastEditors: Please set LastEditors
 */
/**
 * BASE PER FIX URL
 */
const baseUrl = {
  prod: "http://192.168.0.138:2195",
  dev: "http://192.168.0.139:2199",
  // test 账号 ytest    ytestf
  ali: "http://47.102.124.64:2199"
  // prod: 'http://117.34.118.17:8083'
};
//
// export const BASE_PER_FIX_URL = process.env.NODE_ENV === 'production' ? baseUrl.prod : baseUrl.dev
export const BASE_PER_FIX_URL = baseUrl.prod;
