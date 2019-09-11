import regPattern from "./pattern";
/**
 * 针对ELEMENT UI 基础的验证规则 扩展项目常用验证内容
 * Author: zhou qi
 * Date: 2018/05/16
 */

/**
 * Validate normal string number
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const strNumber = (rule, value, callback) => {
  if (value) {
    const errors = [];
    if (!regPattern.stringNumber.test(Number(value))) {
      errors.push(new Error("只能输入数字"));
      callback(errors);
    } else {
      callback();
    }
  } else {
    callback();
  }
};

/**
 * Validate normal string number
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const normalNumber = (rule, value, callback) => {
  if (value) {
    const errors = [];
    if (!regPattern.normalNumber.test(Number(value))) {
      errors.push(new Error("请输入正确的数字"));
      callback(errors);
    } else {
      callback();
    }
  } else {
    callback();
  }
};

/**
 * Validate normal account
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const account = (rule, value, callback) => {
  if (value) {
    const errors = [];
    if (!regPattern.account.test(value)) {
      errors.push(new Error("大于4位的字母数字或下划线"));
      callback(errors);
    } else {
      callback();
    }
  } else {
    callback();
  }
};

/**
 * Validate cellPhone
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const cellPhone = (rule, value, callback) => {
  if (value) {
    const errors = [];
    if (!regPattern.cellPhone.test(value)) {
      errors.push(new Error("手机号填写有误"));
      callback(errors);
    } else {
      callback();
    }
  } else {
    callback();
  }
};

/**
 * Validate complex password
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const complexPassword = (rule, value, callback) => {
  if (value) {
    const errors = [];
    if (!regPattern.complexPassword.test(value)) {
      errors.push(new Error("至少6位且包含大写,小写数字和特殊字符"));
      callback(errors);
    } else {
      callback();
    }
  } else {
    callback();
  }
};

/**
 * Validate complex password
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const simplePassword = (rule, value, callback) => {
  if (value) {
    const errors = [];
    if (!regPattern.simplePassword.test(value)) {
      errors.push(
        new Error("请至少包含大写字母,小写字母,数字和特殊字符中的2项")
      );
      callback(errors);
    } else {
      callback();
    }
  } else {
    callback();
  }
};

/**
 * Validate QQ
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const tencentQQ = (rule, value, callback) => {
  if (value) {
    const errors = [];
    if (!regPattern.qq.test(value)) {
      errors.push(new Error("必须符合字母数字下划线规则"));
      callback(errors);
    } else {
      callback();
    }
  } else {
    callback();
  }
};

/**
 * Validate dictTypeCode
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const dictTypeCode = (rule, value, callback) => {
  if (value) {
    const errors = [];
    if (!regPattern.dictTypeCode.test(value)) {
      errors.push(new Error("必须符合字母数字下划线规则"));
      callback(errors);
    } else {
      callback();
    }
  } else {
    callback();
  }
};

/**
 * Validate dictTypeCode
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const dictOther = (rule, value, callback) => {
  if (value) {
    const errors = [];
    if (!regPattern.dictOther.test(value)) {
      errors.push(new Error("必须符合字母数字下划线规则"));
      callback(errors);
    } else {
      callback();
    }
  } else {
    callback();
  }
};

/**
 * Validate dictTypeCode
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const dictNum = (rule, value, callback) => {
  if (value) {
    const errors = [];
    if (!regPattern.dictNum.test(value)) {
      errors.push(new Error("必须符合仅能输入3位以内数字规则"));
      callback(errors);
    } else {
      callback();
    }
  } else {
    callback();
  }
};

/**
 * Validate dictTypeCode
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const paramsOther = (rule, value, callback) => {
  if (value) {
    const errors = [];
    if (!regPattern.paramsOther.test(value)) {
      errors.push(new Error("必须符合字母数字下划线规则"));
      callback(errors);
    } else {
      callback();
    }
  } else {
    callback();
  }
};

/**
 * Validate dictTypeCode
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const isVehicleNumber = (rule, value, callback) => {
  if (value) {
    const errors = [];
    if (!regPattern.vehicleNumber.test(value)) {
      errors.push(new Error("车牌号码有误"));
      callback(errors);
    } else {
      callback();
    }
  } else {
    callback();
  }
};

/**
 * Validate cellAndTel
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const isCellAndTel = (rule, value, callback) => {
  if (value) {
    const errors = [];
    if (!regPattern.telPhone.test(value) && !regPattern.cellPhone.test(value)) {
      errors.push(new Error("电话号码填写有误"));
      callback(errors);
    } else {
      callback();
    }
  } else {
    callback();
  }
};
/**
 * Validate Telephone
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const isTelephone = (rule, value, callback) => {
  if (value) {
    const errors = [];
    if (!regPattern.telPhone.test(value)) {
      errors.push(new Error("座机号码填写有误"));
      callback(errors);
    } else {
      callback();
    }
  } else {
    callback();
  }
};

/**
 * Validate cellAndTel
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const isPositiveInteger = (rule, value, callback) => {
  if (value) {
    const errors = [];
    if (!regPattern.positiveInteger.test(value)) {
      errors.push(new Error("请输入正整数"));
      callback(errors);
    } else {
      callback();
    }
  } else {
    callback();
  }
};
/**
 * Validate cellAndTel
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const isPrice = (rule, value, callback) => {
  if (value) {
    const errors = [];
    if (!regPattern.price.test(value)) {
      errors.push(new Error("请输入正确的价格"));
      callback(errors);
    } else {
      callback();
    }
  } else {
    callback();
  }
};

/**
 * Validate cellAndTel
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const isOrgCode = (rule, value, callback) => {
  if (value) {
    const errors = [];
    if (
      !regPattern.unifiedSocialCCd.test(value) &&
      !regPattern.company.test(value)
    ) {
      errors.push(new Error("请输入正确的统一社会信用代码/营业执照注册号"));
      callback(errors);
    } else {
      callback();
    }
  } else {
    callback();
  }
};

/**
 * Validate IdNo
 * @param {*} rulepercent
 * @param {*} value
 * @param {*} callback
 */
const isUnifiedSocialCCd = (rule, value, callback) => {
  if (value) {
    const errors = [];
    let patrn = /^[0-9A-Z]+$/;
    if (value.length != 18 || patrn.test(value) == false) {
      errors.push(new Error("不是有效的统一社会信用编码"));
      callback(errors);
    } else {
      let Ancode; // 统一社会信用代码的每一个值
      let Ancodevalue; // 统一社会信用代码每一个值的权重
      let total = 0;
      let weightedfactors = [
        1,
        3,
        9,
        27,
        19,
        26,
        16,
        17,
        20,
        29,
        25,
        13,
        8,
        24,
        10,
        30,
        28
      ]; // 加权因子
      let str = "0123456789ABCDEFGHJKLMNPQRTUWXY";
      // 不用I、O、S、V、Z
      for (let i = 0; i < value.length - 1; i++) {
        Ancode = value.substring(i, i + 1);
        Ancodevalue = str.indexOf(Ancode);
        total = total + Ancodevalue * weightedfactors[i];
        // 权重与加权因子相乘之和
      }
      let logiccheckcode = 31 - (total % 31);
      if (logiccheckcode == 31) {
        logiccheckcode = 0;
      }
      let Str = "0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,J,K,L,M,N,P,Q,R,T,U,W,X,Y";
      let Array_Str = Str.split(",");
      logiccheckcode = Array_Str[logiccheckcode];

      let checkcode = value.substring(17, 18);
      if (logiccheckcode != checkcode) {
        errors.push(new Error("不是有效的统一社会信用编码"));
        callback(errors);
      } else {
        callback();
      }
      callback();
    }
  } else {
    callback();
  }
};

/**
 *
 * Validate 身份证
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const isIdCard = (rule, value, callback) => {
  if (value) {
    const errors = [];
    let weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 校验码
    let check_code = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
    let code = value + "";
    let last = value[17]; // 最后一个
    let seventeen = code.substring(0, 17);
    // ISO 7064:1983.MOD 11-2
    // 判断最后一位校验码是否正确
    let arr = seventeen.split("");
    let len = arr.length;
    let num = 0;
    for (let i = 0; i < len; i++) {
      num = num + arr[i] * weight_factor[i];
    }
    // 获取余数
    let resisue = num % 11;
    let last_no = check_code[resisue];
    // 格式的正则
    // 正则思路
    /*
      第一位不可能是0
      第二位到第六位可以是0-9
      第七位到第十位是年份，所以七八位为19或者20
      十一位和十二位是月份，这两位是01-12之间的数值
      十三位和十四位是日期，是从01-31之间的数值
      十五，十六，十七都是数字0-9
      十八位可能是数字0-9，也可能是X
      */
    let idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
    // 判断格式是否正确
    let format = idcard_patter.test(value);
    let otherCard =
      regPattern.patternTaiwan.test(value) ||
      regPattern.patternMacao.test(value) ||
      regPattern.patternHongkong.test(value) ||
      regPattern.patternPostCard.test(value);
    // 返回验证结果，校验码和格式同时正确才算是合法的身份证号
    if ((last === last_no && format) || otherCard) {
      callback();
    } else {
      errors.push(new Error("请输入正确的证件号码"));
      callback(errors);
    }
  } else {
    callback();
  }
};

/**
 *
 * Validate 身份证
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const isIdCardOnly = (rule, value, callback) => {
  if (value) {
    const errors = [];
    let weight_factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    // 校验码
    let check_code = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
    let code = value + "";
    let last = value[17]; // 最后一个
    let seventeen = code.substring(0, 17);
    // ISO 7064:1983.MOD 11-2
    // 判断最后一位校验码是否正确
    let arr = seventeen.split("");
    let len = arr.length;
    let num = 0;
    for (let i = 0; i < len; i++) {
      num = num + arr[i] * weight_factor[i];
    }
    // 获取余数
    let resisue = num % 11;
    let last_no = check_code[resisue];
    // 格式的正则
    // 正则思路
    /*
      第一位不可能是0
      第二位到第六位可以是0-9
      第七位到第十位是年份，所以七八位为19或者20
      十一位和十二位是月份，这两位是01-12之间的数值
      十三位和十四位是日期，是从01-31之间的数值
      十五，十六，十七都是数字0-9
      十八位可能是数字0-9，也可能是X
      */
    let idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;
    // 判断格式是否正确
    let format = idcard_patter.test(value);
    let otherCard =
      regPattern.patternTaiwan.test(value) ||
      regPattern.patternMacao.test(value) ||
      regPattern.patternHongkong.test(value);
    // 返回验证结果，校验码和格式同时正确才算是合法的身份证号
    if ((last === last_no && format) || otherCard) {
      callback();
    } else {
      errors.push(new Error("请输入正确的证件号码"));
      callback(errors);
    }
  } else {
    callback();
  }
};

export default {
  strNumber,
  normalNumber,
  account,
  cellPhone,
  complexPassword,
  simplePassword,
  tencentQQ,
  dictTypeCode,
  dictOther,
  dictNum,
  paramsOther,
  isVehicleNumber,
  isTelephone,
  isCellAndTel,
  isPositiveInteger,
  isPrice,
  isUnifiedSocialCCd,
  isOrgCode,
  isIdCard,
  isIdCardOnly
};
