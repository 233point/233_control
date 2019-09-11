/**
 * EXTEND PATTERN
 */
const stringNumber = /^[0-9]*$/;
const normalNumber = /^\d+(\.\d+)?$/;
const account = /^[a-zA-Z0-9_-]{4,}$/;
const cellPhone = /^1[3456789]\d{9}$/;
const complexPassword = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
const simplePassword = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-z]|[A-Z]|[0-9]){6,}$/;
const qq = /^[a-zA-Z0-9_-]{4,16}$/;
const dictTypeCode = /^[0-9a-zA-Z_]{1,10}$/;
const dictOther = /^[\s\S]{1,30}$/;
const dictNum = /^[0-9]{1,3}$/;
const paramsOther = /^[\s\S]{1,50}$/;
const vehicleNumber = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4,5}[A-Z0-9挂学警港澳]{1}$/;
const telPhone = /^((0\d{2,3})-?)(\d{7,8})(-(\d{3,}))?$/;
const positiveInteger = /^[1-9]{1,}[\d]*$/;
const price = /^\d+(\.\d{1,2})?$/;
const unifiedSocialCCd = /^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g;
const company = /^[A-Za-z0-9]\w{14}$/g;
const patternTaiwan = /^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/; // 台湾
const patternMacao = /^([A-Z]\d{6,10}(\(\w{1}\))?)$/; // 澳门
const patternHongkong = /^((\s?[A-Za-z])|([A-Za-z]{2}))\d{6}(\([0−9aA]\)|[0-9aA])$/; // 香港
const patternPostCard = /^([a-zA-z]|[0-9]){5,17}$/; // 护照

export default {
  stringNumber,
  normalNumber,
  account,
  cellPhone,
  complexPassword,
  simplePassword,
  qq,
  dictTypeCode,
  dictOther,
  dictNum,
  paramsOther,
  vehicleNumber,
  telPhone,
  positiveInteger,
  price,
  unifiedSocialCCd,
  company,
  patternTaiwan,
  patternMacao,
  patternHongkong,
  patternPostCard
};
