import { getToken, setToken, removeToken } from "@/utils/auth";
import { commonLogin, getUserInfo } from "@/api/my";
import { getMerchantInfo, getCarrierInfo } from "@/api/user";
import { getOrgTree } from "@/api/warehouse";
import { encryptDes } from "@/utils/des";
import { getWaybillTypeList } from "@/api/order";
import { setSession, getSession } from "@/utils/session";
import { Message, MessageBox } from "element-ui";
import { generateTree } from "@/utils/generateTree";
import { changLogo } from "@/utils/logo";

let deleteNullChildren = function(data) {
  data.forEach(item => {
    if (item.children && item.children.length > 0) {
      deleteNullChildren(item.children);
    } else if (item.children && item.children.length == 0) {
      delete item.children;
    }
  });
  return data;
};
/**
 * User STORE
 */

const store = {
  state: {
    userId: "",
    userAccount: "",
    userName: "",
    userStatus: "",
    userLogo: "",
    avatar: "../static/myAvatar200.png", // static
    token: getToken(),
    roles: null, // 权限应该是返回个数组对象吧?
    projectList: [],
    waybillTypeList: [],
    merchantInfo: {},
    roleType: ""
  },

  mutations: {
    SET_TOKEN(state, token) {
      if (token) {
        state.token = token;
        setToken(token);
      }
    },
    REMOVE_TOKEN(state, data) {
      state.token = null;
      removeToken();
    },
    SET_USERINFO(state, data) {
      state.userId = data.userUuid;
      state.userAccount = data.userAccount;
      state.userName = data.userRealName;
      state.userStatus = data.userStatus;
      state.roles = data.roles; // static roles
      state.roleType = data.roleType;
      state.merchantId = data.roleType; // static roles
      // state.avatar = data.avatar
      // state.roles = data.roles
    },
    SET_MERCHANTINFO(state, data) {
      state.merchantInfo = data;
    },
    RESET_MERCHANTINFO(state, data) {
      state.merchantInfo = {};
    },
    RESET_USERINFO(state, data) {
      state.userId = "";
      state.userAccount = "";
      state.userName = "";
      state.userStatus = "";
      state.avatar = "";
      state.roles = null;
    },
    SET_PROJECT(state, data) {
      state.projectList = data[0];
      state.orgData = data[1];
      setSession("projectList", [data[0][0].id]);
    },
    SET_WAYBILLTYPE(state, data) {
      state.waybillTypeList = data;
    },
    SET_LOGO(state, data) {
      state.userLogo = data;
    }
  },

  actions: {
    /**
     * 用户登录
     * 需要通过mutation在浏览器中创建Token cookie保证一定的登录实效性;
     *
     * @param {any} {commit}
     * @param {any} params
     * @returns
     */
    userLogin({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        params.userPassword = encryptDes(params.userPassword);
        params.sysType = "ctms";
        commonLogin(params)
          .then(res => {
            // if(false){
            // 假装有TOKEN, 将Token暂时存为userId
            commit("SET_TOKEN", res.token);
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    /**
     * 用户注销
     * 需要通过mutations移除浏览器的Token cookie,并做一些相关注销处理
     *
     * @param {any} {commit}
     * @returns
     */
    userLogout({ commit }) {
      return new Promise((resolve, reject) => {
        // 重置用户相关信息
        commit("REMOVE_TOKEN");
        // 重置用户信息
        commit("RESET_USERINFO");
        // 重置商户注册认证信息
        commit("RESET_MERCHANTINFO");
        // 重置浏览记录以及tab页面记录等,该mutation访问 store/views.js
        commit("REMOVE_ALL_VISITED");
        // 重置权限路由表, 该mutation 访问 store/asyncRouter.js
        commit("RESET_ROUTERS");
        //
        resolve();
      });
    },
    /**
     * 获取用户信息
     * 返回当前用户的基础信息
     *
     * @param {any} {commit}
     * @param {any} params
     * @returns
     */
    getUserInfo({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        getUserInfo({ token: state.token })
          .then(userInfo => {
            // TODO: 暂时这里把权限写死, 用户暂时无权限列表
            // TODO: 需要暂时配置一个最高管理员权限
            userInfo.roles =
              userInfo.userAccount === "admin" ? ["admin"] : ["user"];
            commit("SET_USERINFO", userInfo);
            resolve(userInfo);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getMerchantInfo({ commit, state }, userType) {
      let oUserType = userType || "merchant";
      let url = oUserType == "carrier" ? getCarrierInfo : getMerchantInfo;
      return new Promise((resolve, reject) => {
        url()
          .then(merchantInfo => {
            // TODO: 暂时这里把权限写死, 用户暂时无权限列表
            // TODO: 需要暂时配置一个最高管理员权限
            commit("SET_MERCHANTINFO", merchantInfo);
            if (
              merchantInfo &&
              merchantInfo.approval &&
              merchantInfo.approval.trim() == "审核成功"
            ) {
              if (merchantInfo.logo) {
                // changLogo(merchantInfo.logo);
                commit("SET_LOGO", merchantInfo.logo);
              }
            }
            resolve(merchantInfo);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    /**
     * 获取用户所属权限的仓库
     *
     * @param {any} {commit}
     * @param {any} params
     * @returns
     */
    getProjectList({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        getOrgTree()
          .then(res => {
            if (!res.error) {
              // 级联选择机构数据
              res.forEach(item => {
                item.value = item.id;
                item.label = item.orgName;
              });
              let cascaderOrg = generateTree(res);
              // 删除children为空的数据
              let projectList = deleteNullChildren(cascaderOrg);
              commit("SET_PROJECT", [projectList, res]);
              resolve(projectList);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    // 获取订单类型
    getWaybillTypeList({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        getWaybillTypeList()
          .then(res => {
            if (!res.error) {
              commit("SET_WAYBILLTYPE", res);
              resolve(res);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
export default store;
