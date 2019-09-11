/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-01 09:22:43
 * @LastEditTime: 2019-08-22 17:58:17
 * @LastEditors: Please set LastEditors
 */
export const changLogo = logoUrl => {
  var link =
    document.querySelector("link[rel*='icon']") ||
    document.createElement("link");
  link.type = "image/x-icon";
  link.rel = "shortcut icon";
  link.href = logoUrl;
  document.getElementsByTagName("head")[0].appendChild(link);
};
