import http from "@/utils/http";
/**
 * ORGANIZATION API
 */

/**
 * 组织机构 Tree
 *
 * @export
 * @param {any} params
 * @returns
 */
export function getOrgTree() {
  return http.post("/org/orgtree/get");
}

/**
 * 组织机构 节点详情
 *
 * @export
 * @param {any} params
 * @returns
 */
export function getOrgDetail(orgId) {
  return http.post("/org/orgdetail/get", orgId);
}

/**
 * 组织机构 创建节点
 *
 * @export
 * @param {any} params
 * @returns
 */
export function createOrgNode(params) {
  return http.post("/org/create", params);
}

/**
 * 组织机构 修改节点
 *
 * @export
 * @param {any} params
 * @returns
 */
export function updateOrgNode(orgNode) {
  return http.post("/org/update", orgNode);
}

/**
 * 组织机构 删除节点
 *
 * @export
 * @param {any} params
 * @returns
 */
export function deleteOrgNode(orgId) {
  return http.post("/org/delete", orgId);
}
