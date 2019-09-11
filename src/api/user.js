/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-19 10:44:33
 * @LastEditTime: 2019-08-19 17:11:22
 * @LastEditors: Please set LastEditors
 */
import http from "@/utils/http";
/**
 * USER API
 */

/**
 * 获取用户列表
 * @param {*} params
 */
export function getUsersList(params) {
  return http.post("/user/userpage/get", params);
}

/**
 * 用户详情
 * @param {*} params
 */
export function getUserDetail(userId) {
  return http.post("/user/userdetail/get", userId);
}

/**
 * 新建用户
 * @param {*} params
 */
export function createUser(params) {
  return http.post("/user/createUser", params);
}
/**
 * 注册用户
 * @param {*} params
 */
export function signinUser(params) {
  return http.post("/user/rest/createUser", params);
}

/**
 * 修改用户
 * @param {*} params
 */
export function updateUser(params) {
  return http.post("/user/editUser", params);
}

/**
 * 删除用户
 * @param {*} params
 */
export function deleteUser(userIds) {
  return http.post("/user/deleteUser", userIds);
}

/**
 * 重置密码
 * @param {*} params
 */
export function resetPassword(userId) {
  return http.post("/user/resetpassword/update", userId);
}

/**
 * 设置用户角色
 * @param {*} params
 */
export function setUserRole(params) {
  return http.post("/userRole/rolegrant", params);
}

/**
 * 获取角色列表
 * @param {*} params
 */
export function getRoleList(params) {
  return http.post("/sys/getRoleListBySys", params);
}

// 商户管理相关接口
/**
 * 创建商户
 * @param {*} params
 */
export function merchantCreate(params) {
  return http.post("/api/merchants", params);
}
/**
 * 删除商户
 * @param {*} params
 */
export function merchantDel(params) {
  return http.delete("/api/merchants", "/" + params);
}

/**
 * 更新商户
 * @param {*} params
 */
export function merchantUpdate(params) {
  return http.put("/api/merchants", params);
}

/**
 * 查询全部商户
 * 根据id查询商户 /{id}
 * @param {*} params
 */
export function merchantList(params) {
  return http.post("/api/merchants/queryWithPage", params);
}

/**
 * 查询全部商户
 * 根据id查询商户 /{id}
 * @param {*} params
 */
export function getMerchantInfo(params) {
  return http.get("/api/merchant", params);
}
/**
 * 商户审批
 * @param {*} params
 */
export function merchantApprove(params) {
  return http.post("/api/merchantsApproval", params);
}

/**
 * 服务人员审批
 * @param {*} params
 */
export function serviceApprove(params) {
  return http.post("/api/servicePersonalApproval", params);
}
/**
 * 绑定商户
 * @param {*} params
 */
export function setUserMerchants(params) {
  return http.post("/api/merchantsbind", params);
}

// 承运人相关接口
/**
 * 创建承运人
 * @param {*} params
 */
export function carriersCreate(params) {
  return http.post("/api/carriers", params, true);
}
/**
 * 删除承运人
 * @param {*} params
 */
export function carriersDel(params) {
  return http.delete("/api/carriers", params);
}
/**
 * 更新服务商
 * @param {*} params
 */
export function carriersUpdate(params) {
  return http.put("/api/carriers", params);
}

/**
 * 更新服务商
 * @param {*} params
 */
export function getAllCarrier(params) {
  return http.post("/api/carrier/queryNoPage", params);
}

/**
 * 查询全部承运人
 * 根据id查询承运人 /{id}
 * @param {*} params
 */
export function carriersList(params) {
  return http.post("/api/carrier/queryWithPage", params);
}

/**
 * 查询承运人
 * 根据id查询承运人 /{id}
 * @param {*} params
 */
export function getCarrierInfo(params) {
  return http.get("/api/carrier", params);
}
/**
 * 审核承运人
 * 根据id查询承运人 /{id}
 * @param {*} params
 */
export function carrierApprove(params) {
  return http.post("/api/carrierApproval", params);
}

// 司机相关接口
/**
 * 创建司机
 * @param {*} params
 */
export function driversCreate(params) {
  return http.post("/api/drivers", params);
}
/**
 * 删除司机
 * @param {*} params
 */
export function driversDel(params) {
  return http.delete("/api/drivers", params);
}
/**
 * 更新司机
 * @param {*} params
 */
export function driversUpdate(params) {
  return http.put("/api/drivers", params);
}

/**
 * 查询全部司机
 * 根据id查询司机 /{id}
 * @param {*} params
 */
export function driversList(params) {
  return http.get("/api/drivers", params);
}

// 配装经理/司机/安装工新增
export function addServicepersonal(params) {
  return http.post("/api/addservicepersonal", params);
}
// 不分页查询服务人员
export function getServicepersonal(params) {
  return http.post("/api/servicePersonalqueryNopage", params);
}
// 删除
export function delServicepersonal(params) {
  return http.delete("/api/servicePersonals", params);
}
// 分页查询服务人员
export function servicePersonalqueryWithpage(params) {
  return http.post("/api/servicePersonalqueryWithpage", params);
}
// 配装经理/司机/安装工编辑
export function updateServicepersonal(params) {
  return http.put("/api/servicePersonals", params);
}

// 车辆相关接口
/**
 * 创建车辆
 * @param {*} params
 */
export function busesCreate(params) {
  return http.post("/api/buses", params);
}
/**
 * 删除车辆
 * @param {*} params
 */
export function busesDel(params) {
  return http.delete("/api/buses", params);
}
/**
 * 更新车辆
 * @param {*} params
 */
export function busesUpdate(params) {
  return http.put("/api/buses", params);
}

/**
 * 查询全部车辆
 * 根据id查询车辆 /{id}
 * @param {*} params
 */
export function busesList(params) {
  return http.get("/api/buses", params);
}
/**
 * 认证服务商
 * 根据id查询车辆 /{id}
 * @param {*} params
 */
export function carriers(params) {
  return http.post("/api/carriers", params);
}
/**
 * 绑定默认服务商
 * 根据id查询车辆 /{id}
 * @param {*} params
 */
export function merchantsbindcarrier(params) {
  return http.post("/api/merchantsbindcarrier", params);
}
/**
 *
 * 配装经理绑定商户/{id}
 * @param {*} params
 */
export function peizhuangjlbindmerchants(params) {
  return http.post("/api/peizhuangjlbindmerchants", params);
}
/**
 *
 *
 * @param {*} params
 */
export function carriersnotbinding(params) {
  return http.post("/api/carriersnotbinding", params);
}
/**
 *
 * 根据用户id获取车辆
 * @param {*} params
 */
export function getbusByuserId(params) {
  return http.post("/api/getbusByuserId", params);
}
/**
 *
 * 获取用户列表
 * @param {*} params
 */
export function getCtmsUserList(params) {
  return http.post("/api/ctmsuser/getList", params);
}
/**
 *
 * 新增用户
 * @param {*} params
 */
export function addCtmsUser(params) {
  return http.post("/api/ctmsuser/add", params);
}
/**
 *
 * 高级用户授权
 * @param {*} params
 */
export function authorizationCustomer(params) {
  return http.post("/api/ctmsuser/authorization", params);
}
/**
 *
 * 普通用户授权
 * @param {*} params
 */
export function marketMerchantBinding(params) {
  return http.post("/api/ctmsuser/marketMerchantBinding", params);
}
/**
 *
 * 用户编辑
 * @param {*} params
 */
export function usermodiy(params) {
  return http.post("/api/ctmsuser/modiy", params);
}
