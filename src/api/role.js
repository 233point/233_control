import http from "@/utils/http";
/**
 * ROLE API
 */

/**
 * 获取角色列表
 * @param {*} params
 */
export function getRoleList(params) {
  return http.post("/role/rolepage/get", params);
}

/**
 * 新增角色 * @param {*} params
 */
export function createRole(params) {
  return http.post("/role/create", params);
}

/**
 * 修改角色 * @param {*} params
 */
export function updateRole(params) {
  return http.post("/role/edit", params);
}

/**
 * 删除角色 * @param {*} params
 */
export function deleteRole(roleIds) {
  return http.post("/role/delete", roleIds);
}

/**
 * 获取角色菜单权限 * @param {*} params
 */
export function getRolesMenuRes(roleId) {
  return http.post("/role/roleresouse/get", roleId);
}

/**
 * 获取角色菜单已授权数据(ids) * @param {*} params
 */
export function getRolesMenuAuthRes(roleId) {
  return http.post("/role/roleAuthorizeResouse/get", roleId);
}

/**
 * 角色菜单权限保存 * @param {*} params
 */
export function updateRolesMenuRes(params) {
  return http.post("/role/roleresouse/create", params);
}

/**
 * 获取角色线路权限
 */
export function getRolesLineRes(roleId) {
  return http.post("/role/rolelinetree/get", roleId);
}

/**
 * 获取角色已授权线路数据(ids)
 */
export function getRolesLineAuthRes(roleId) {
  return http.post("/role/roleAuthorizeLine/get", roleId);
}

/**
 * 角色线路权限保存 * @param {*} params
 */
export function updateRolesLineRes(params) {
  return http.post("/role/rolelineprivileges/create", params);
}
