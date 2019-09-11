/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-24 10:16:32
 * @LastEditTime: 2019-08-22 17:55:44
 * @LastEditors: Please set LastEditors
 */
import axios from "axios";
// import { getToken } from './auth'
import store from "@/store";
import { Message, MessageBox } from "element-ui";
import { BASE_PER_FIX_URL } from "./baseUrlPerFix.js";
import { commonLogout } from "@/api/my";
// Per fix url
const basePerfix = BASE_PER_FIX_URL;
const SYSTYPE = "ctms";
const CancelToken = axios.CancelToken;
// request interceptors
axios.interceptors.request.use(
  config => {
    // 配置全局请求token
    if (store.getters.token) {
      config.headers["Authorization"] = store.getters.token;
    }
    // config.data = {
    //   ...config.data,
    //   ownerId: store.getters.userId,
    // };
    config.headers.sysType = SYSTYPE;
    return config;
  },
  error => Promise.reject(error)
);

// response interceptors
axios.interceptors.response.use(
  response => {
    // do sth befor response

    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        // 401 code
        case 401:
          logoutWithResponse();
      }
    }
    return Promise.reject(error.response.data);
  }
);

function logoutWithResponse() {
  MessageBox.alert("您的登录已过期，点击确认后重新登录.", "提醒", {
    confirmButtonText: "确定",
    callback: action => {
      commonLogout(store.getters.token).then(res => {
        store.dispatch("userLogout").then(() => {
          location.reload();
        });
      });
    }
  });
}

// check response code
function checkResponseStatus(response) {
  if (response.status === 200 || response.status === 304) {
    return response.data;
  }
  return response;
}

function cactchError(error) {
  if (error.status === 400 || error.status === 404 || error.status === 500) {
    Message({
      message: `服务器访问出错. Error:${error.error},Message:${error.message}`,
      type: "error",
      duration: 5000
    });
    return { error: true };
  }
}

// check server response
function checkResponseCode(response, type) {
  const header = response.head;
  if (header && header.success === "true") {
    return response.data || { error: false };
  } else {
    if (header.code === "401" || header.code === "300") {
      logoutWithResponse();
    } else {
      if (type == "check201") {
        return { message: header.msg, error: true };
      } else {
        Message({
          message: header.msg,
          type: "error",
          duration: 2000
        });
        return { error: true };
      }
    }
  }
}

/*
 * 这里定义的接口都应该符合RESTFul规范
 */
export default {
  // normal method
  get(url, params, rest) {
    if (!url) return;
    return axios
      .get(basePerfix + url, { params: params })
      .then(checkResponseStatus)
      .then(checkResponseCode)
      .catch(res => cactchError(res, rest));
  },
  // post request
  post(url, data, uniqueUrl, type, that) {
    if (!url) return;
    return axios
      .post(uniqueUrl ? uniqueUrl + url : basePerfix + url, data, {
        cancelToken: new CancelToken(function executor(c) {
          that ? (that.cancel = c) : null;
          // 这个参数 c 就是CancelToken构造函数里面自带的取消请求的函数，这里把该函数当参数用
        })
      })
      .then(checkResponseStatus)
      .then(res => checkResponseCode(res, type))
      .catch(cactchError);
  },
  async awaitPost(url, data) {
    if (!url) return;
    return await axios
      .post(basePerfix + url, data)
      .then(checkResponseStatus)
      .then(checkResponseCode)
      .catch(cactchError);
  },
  // downloadFile
  download(url, data) {
    if (!url) return;
    return axios.post(basePerfix + url, data, { responseType: "blob" });
  },
  imgDownload(url, data) {
    if (!url) return;
    return axios.post(basePerfix + url, data, { responseType: "arraybuffer" });
  },
  // update request for All data
  put(url, data, uniqueUrl) {
    if (!url) return;
    return axios
      .put(uniqueUrl ? uniqueUrl + url : basePerfix + url, data)
      .then(checkResponseStatus)
      .then(checkResponseCode)
      .catch(cactchError);
  },
  // update request path data
  patch(url, data, uniqueUrl) {
    if (!url) return;
    return axios
      .patch(uniqueUrl ? uniqueUrl + url : basePerfix + url, data)
      .then(checkResponseStatus)
      .then(checkResponseCode)
      .catch(cactchError);
  },
  // delete request
  delete(url, params, uniqueUrl) {
    if (!url) return;
    return axios
      .delete(basePerfix + url + params)
      .then(checkResponseStatus)
      .then(checkResponseCode)
      .catch(cactchError);
  },
  // head
  head(url, data, uniqueUrl) {},
  cancelHttp() {
    cancel();
  }
};
