<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 15:39:25
 * @LastEditTime: 2019-09-03 11:08:45
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <!-- 服务商 -->
    <el-form
      class="login-form"
      ref="loginForm"
      :model="loginForm"
      size="mini"
      label-position="right"
      label-width="240px"
    >
      <el-form-item prop="company" label="公司名称:">
        <span>{{ loginForm.company }}</span>
      </el-form-item>
      <el-form-item prop="compBrif" label="公司简称:">
        <span>{{ loginForm.compBrif }}</span>
      </el-form-item>
      <el-form-item prop="contact" label="联系人:">
        <span>{{ loginForm.contact }}</span>
      </el-form-item>
      <el-form-item prop="phone" label="电话:">
        <span>{{ loginForm.phone }}</span>
      </el-form-item>
      <el-form-item prop="address" label="地址:">
        <span>{{ loginForm.address }}</span>
      </el-form-item>
      <el-form-item prop="mail" label="邮箱:">
        <span>{{ loginForm.mail }}</span>
      </el-form-item>
      <el-form-item
        prop="unifiedSocialCCd"
        label="统一社会信用代码/营业执照注册号:"
      >
        <span>{{ loginForm.unifiedSocialCCd }}</span>
      </el-form-item>
      <el-form-item prop="businessLicensePic" label="营业执照:">
        <a
          v-if="fileType1 == 'file' && loginForm.businessLicensePic"
          :href="loginForm.businessLicensePic"
          >营业执照扫描照片</a
        >
        <img
          v-if="fileType1 == 'img' && loginForm.businessLicensePic"
          :src="loginForm.businessLicensePic"
          @click="showImg(loginForm.businessLicensePic)"
          class="imgScan"
        />
      </el-form-item>
      <el-form-item prop="roadTrafficPermit" label="道路交通运输许可证:">
        <a
          v-if="fileType4 == 'file' && loginForm.roadTrafficPermit"
          :href="loginForm.roadTrafficPermit"
          >道路交通运输许可证</a
        >
        <img
          v-if="fileType4 == 'img' && loginForm.roadTrafficPermit"
          :src="loginForm.roadTrafficPermit"
          @click="showImg(loginForm.roadTrafficPermit)"
          class="imgScan"
        />
      </el-form-item>
      <el-form-item prop="businessType" label="业务类型:">
        <span>{{ loginForm.businessType }}</span>
      </el-form-item>
      <el-form-item prop="transportMode" label="运输模式:">
        <span>{{ loginForm.transportMode }}</span>
      </el-form-item>
      <el-form-item prop="city" label="所在城市:">
        <span>{{ loginForm.city }}</span>
      </el-form-item>
      <el-form-item prop="scopeOfTransport" label="服务区域:">
        <span class="areaList">{{
          loginForm.scopeOfTransport.join(",") || ""
        }}</span>
        <div class="scopeOfTransport">
          <div
            v-for="(item, index) in scopeOfTransport"
            :key="index"
            style="display:flex"
          >
            <div>
              <span class="label">{{ item[0] }}</span>
            </div>
            <div>
              <span
                class="area disabled"
                :class="item2.choose ? 'choose' : ''"
                v-for="(item2, index2) in item[1]"
                :key="index2"
              >
                {{ item2.name }}
              </span>
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item prop="industry" label="所属行业:">
        <span>{{ loginForm.industry }}</span>
      </el-form-item>
      <el-form-item prop="logo" label="logo:">
        <a v-if="fileType2 == 'file' && loginForm.logo" :href="loginForm.logo"
          >logo</a
        >
        <img
          v-if="fileType2 == 'img' && loginForm.logo"
          :src="loginForm.logo"
          @click="showImg(loginForm.logo)"
          class="imgScan"
        />
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="showImgDialog" width="700px" append-to-body>
      <img :src="imgUrl" class="dialogImg" />
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
import {
  merchantCreate,
  merchantUpdate,
  carriers,
  carriersUpdate
} from "@/api/user";
import Validator from "@/utils/extendValidate/extendValidate";
import { mapGetters } from "vuex";
import { getToken } from "@/utils/auth.js";
import { BASE_PER_FIX_URL } from "@/utils/baseUrlPerFix.js";

const token = getToken();

export default {
  name: "merchantLogin",
  data() {
    return {
      approval: "暂无",
      authVisible: false,
      showImgDialog: false,
      imgUrl: "",
      fileType1: "",
      fileType2: "",
      fileType3: "",
      fileType4: "",
      loginForm: {
        account: "",
        company: "",
        compBrif: "",
        contact: "",
        phone: "",
        address: "",
        mail: "",
        unifiedSocialCCd: "",
        businessLicensePic: "",
        managingGoods: "",
        city: "",
        haveFleet: "1",
        logo: "",
        roadTrafficPermit: "",
        businessType: "",
        transportMode: "",
        scopeOfTransport: [],
        industry: ""
      },
      merchantInfo: {},
      scopeOfTransport: [
        [
          "华东",
          [
            { name: "安徽省", choose: false },
            { name: "福建省", choose: false },
            { name: "江西省", choose: false },
            { name: "江苏省", choose: false },
            { name: "山东省", choose: false },
            { name: "上海市", choose: false },
            { name: "浙江省", choose: false }
          ]
        ],
        [
          "华南",
          [
            { name: "广东省", choose: false },
            { name: "广西壮族自治区", choose: false },
            { name: "海南省", choose: false }
          ]
        ],
        [
          "华中",
          [
            { name: "河南省", choose: false },
            { name: "湖北省", choose: false },
            { name: "湖南省", choose: false }
          ]
        ],
        [
          "华北",
          [
            { name: "北京市", choose: false },
            { name: "天津市", choose: false },
            { name: "河北区", choose: false },
            { name: "山西省", choose: false },
            { name: "内蒙古自治区", choose: false }
          ]
        ],
        [
          "东北",
          [
            { name: "辽宁省", choose: false },
            { name: "吉林省", choose: false },
            { name: "黑龙江省", choose: false }
          ]
        ],
        [
          "西北",
          [
            { name: "陕西省", choose: false },
            { name: "甘肃省", choose: false },
            { name: "青海省", choose: false },
            { name: "宁夏回族自治区", choose: false },
            { name: "新疆维吾尔自治区", choose: false }
          ]
        ],
        [
          "西南",
          [
            { name: "重庆市", choose: false },
            { name: "四川省", choose: false },
            { name: "贵州省", choose: false },
            { name: "云南省", choose: false },
            { name: "西藏自治区", choose: false }
          ]
        ],
        [
          "港澳台",
          [
            { name: "香港特别行政区", choose: false },
            { name: "澳门特别行政区", choose: false }
          ]
        ]
      ]
    };
  },
  computed: {
    ...mapGetters(["userAccount", "roleType", "userId"])
  },
  mounted() {
    this.$nextTick(() => {
      this.$store
        .dispatch("getMerchantInfo", this.roleType)
        .then(merchantInfo => {
          this.merchantInfo = Object.assign({}, merchantInfo);
          if (this.merchantInfo && this.merchantInfo.id) {
            this.approval = this.merchantInfo.approval;
            this.loginForm = Object.assign({}, this.merchantInfo);
            this.scopeOfTransport.forEach(item => {
              item[1].forEach(item2 => {
                if (this.loginForm.scopeOfTransport.indexOf(item2.name) > -1) {
                  item2.choose = true;
                }
              });
            });
            this.loginForm.scopeOfTransport = this.loginForm.scopeOfTransport.split(
              ","
            );
            let oFileType4 = this.getFileType(
              this.merchantInfo.roadTrafficPermit
            );
            this.fileType4 =
              oFileType4 == "pdf" || oFileType4 == "pdf" || oFileType4 == "pdf"
                ? "file"
                : "img";
            let oFileType1 = this.getFileType(
              this.merchantInfo.businessLicensePic
            );
            this.fileType1 =
              oFileType1 == "pdf" || oFileType1 == "pdf" || oFileType1 == "pdf"
                ? "file"
                : "img";
            let oFileType2 = this.getFileType(this.merchantInfo.logo);
            this.fileType2 =
              oFileType2 == "pdf" || oFileType2 == "pdf" || oFileType2 == "pdf"
                ? "file"
                : "img";
          }
        });
    });
  },
  methods: {
    // 获取文件格式
    getFileType(url) {
      let fileType = url.substring(url.lastIndexOf(".") + 1, url.length);
      return fileType;
    },
    timeFormatter(time) {
      if (time) {
        return moment(time).format("YYYY-MM-DD HH:mm:ss");
      } else {
        return "";
      }
    },

    showImg(url) {
      this.showImgDialog = true;
      this.imgUrl = url;
    }
  }
};
</script>

<style lang="scss" scoped>
.login_container {
  width: 50%;
  margin: 2rem auto 0 25%;
  padding: 25px 15px 25px 15px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.15);
  .approval {
    width: 100%;
    text-align: center;
    font-size: 16px;
    margin-bottom: 1rem;
  }
}
.imgScan {
  width: 180px;
  margin-top: 10px;
}
.dialogImg {
  width: 650px;
}
.xhe_upload_container {
  margin-top: 0.5rem;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}
.authLog {
  padding: 2rem 5rem 3rem 3rem;
}
.authLog.tips {
  font-size: 2rem;
  color: #f2f2f2;
}
.scopeOfTransport {
  padding: 20px;
  .label {
    font-weight: bold;
    font-size: 16px;
    display: inline-block;
    width: 55px;
  }
  .area {
    display: inline-block;
    border: 1px solid grey;
    margin: 5px 10px;
    border-radius: 10px;
    padding: 0px 15px;
    cursor: pointer;
  }
  .choose {
    color: var(--color-primary);
    border-color: var(--color-primary);
  }
  .area:hover {
    color: var(--color-primary);
    border-color: var(--color-primary);
  }
}
.areaList {
  padding-left: 20px;
  font-weight: bold;
}
</style>
