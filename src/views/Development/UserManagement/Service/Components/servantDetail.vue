<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-08 11:56:22
 * @LastEditTime: 2019-08-20 17:24:09
 * @LastEditors: Please set LastEditors
 -->

<template>
  <el-dialog
    width="1000px"
    title="服务人员详情"
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancel"
  >
    <el-form ref="sysForm" :model="sysForm" size="small" label-width="150px">
      <el-form-item prop="type" label="用户职业">
        <span>{{
          sysForm.type == "0"
            ? "司机"
            : sysForm.type == "1"
            ? "安装工"
            : sysForm.type == "2"
            ? "配装经理"
            : "未知"
        }}</span>
      </el-form-item>
      <el-form-item prop="account" label="账号">
        <span>{{ sysForm.account }}</span>
      </el-form-item>
      <el-form-item prop="realName" label="姓名">
        <span>{{ sysForm.realName }}</span>
      </el-form-item>
      <!-- <el-form-item prop="phone"
                    label="电话">
        <span>{{sysForm.phone}}</span>
      </el-form-item> -->
      <el-form-item prop="city" label="城市">
        <span>{{ sysForm.city }}</span>
      </el-form-item>
      <el-form-item prop="numOfID" label="身份证号">
        <span>{{ sysForm.numOfID }}</span>
      </el-form-item>
      <el-form-item prop="picOfHead" label="身份证（正面照）">
        <img
          v-if="sysForm.picOfHead"
          :src="sysForm.picOfHead"
          @click="showImg(sysForm.picOfHead)"
          class="imgScan"
        />
      </el-form-item>
      <el-form-item
        v-if="sysForm.type == 1"
        prop="picOfBack"
        label="身份证（反面照）"
      >
        <img
          v-if="sysForm.picOfBack"
          :src="sysForm.picOfBack"
          @click="showImg(sysForm.picOfBack)"
          class="imgScan"
        />
      </el-form-item>
      <el-form-item
        v-if="sysForm.type == 1"
        prop="picOfHold"
        label="本人手持身份证照片"
      >
        <img
          v-if="sysForm.picOfHold"
          :src="sysForm.picOfHold"
          @click="showImg(sysForm.picOfHold)"
          class="imgScan"
        />
      </el-form-item>
      <el-form-item
        v-if="sysForm.type == 0"
        prop="driverLicense"
        label="行驶证照片"
      >
        <img
          v-if="sysForm.picOfDriving"
          :src="sysForm.picOfDriving"
          @click="showImg(sysForm.picOfDriving)"
          class="imgScan"
        />
      </el-form-item>
      <el-form-item prop="skills" label="擅长品类">
        <el-tag
          class="skills_tags"
          v-for="(tag, index) in sysForm.skills"
          :key="index"
          :closable="false"
          size="medium"
          :disable-transitions="false"
        >
          {{ tag }}
        </el-tag>
      </el-form-item>
      <el-form-item prop="haveOrg" label="员工关系">
        <span>{{ sysForm.haveOrg == "0" ? "雇佣" : "非雇佣" }}</span>
      </el-form-item>
    </el-form>

    <el-dialog :visible.sync="showImgDialog" width="700px" append-to-body>
      <img :src="imgUrl" class="dialogImg" />
    </el-dialog>
  </el-dialog>
</template>
<script>
import Validator from "@/utils/extendValidate/extendValidate";
import store from "@/store";

// api
import { addServicepersonal, updateServicepersonal } from "@/api/user";
import { mapGetters } from "vuex";

//
const initsyssForm = {
  userId: "",
  roleType: "",
  type: "0", // 0 司机  1安装工  2配装经理（只有服务商可以选择这个）
  account: "",
  phone: "",
  realName: "",
  numOfID: "",
  picOfHead: "",
  picOfBack: "",
  picOfHold: "",
  driverLicense: "",
  haveOrg: "0",
  skills: []
};

export default {
  name: "sysUpdate",
  data() {
    return {
      showImgDialog: false,
      imgUrl: "",
      isVisible: false,
      sysForm: {}
    };
  },
  computed: {
    ...mapGetters(["roleType", "userId"])
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    sysData: {
      type: Object
    }
  },
  watch: {
    show(isShow) {
      if (isShow) {
        console.log("this.sysData", this.sysData);
        this.sysForm = Object.assign({}, this.sysData);
        console.log("this.sysData", this.sysForm);
      }
      //
      this.isVisible = isShow;
    }
  },
  methods: {
    cancel() {
      this.sysForm = Object.assign({}, initsyssForm);
      this.$refs.sysForm.resetFields();
      this.$emit("update:show", false);
      this.$emit("update:sysData", Object.create(null));
      this.isVisible = false;
      this.imgUrl = false;
    },
    showImg(url) {
      this.showImgDialog = true;
      this.imgUrl = url;
    }
  }
};
</script>

<style lang="scss" scoped>
.imgScan {
  width: 300px;
}
.dialogImg {
  width: 560px;
}
.skills_tags {
  margin: 0 0.5rem;
}
</style>
