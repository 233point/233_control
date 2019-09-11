<template>
  <div class="user-info">
    <div>
      <div v-if="!editable"></div>
      <div v-if="!editable" class="trans_area">
        <div v-for="(item, index) in pzjlList" :key="index" class="trans_item">
          <span>{{ item.account + "(" + item.realName + ")" }}</span>
          <el-transfer
            v-model="item.merchantIds"
            :data="allLeft[index]"
            :props="transProps"
            :titles="['待绑定商户', '已绑定商户']"
            :button-texts="['解绑', '绑定']"
            @change="transferChange"
          >
          </el-transfer>
        </div>
        <div class="trans_button" v-if="pzjlList.length > 0">
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {
  peizhuangjlbindmerchants,
  getServicepersonal,
  carriersnotbinding
} from "@/api/user";
export default {
  name: "PzjlBind",
  data() {
    return {
      editable: false,
      pzjlList: [],
      allLeft: [],
      left: [],
      transProps: {
        key: "merchantId",
        label: "merchantName"
      }
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapGetters(["userAccount", "userName", "merchantInfo"])
  },
  methods: {
    getMerchants(params) {
      return new Promise((resolve, reject) => {
        carriersnotbinding(params).then(res => {
          this.left = res.allmerchant;
          resolve();
        });
      });
    },
    //获取配装经理
    getPzjl(params) {
      return new Promise((resolve, reject) => {
        getServicepersonal(params).then(res => {
          if (!res.error) {
            res.forEach(item => {
              item.merchantIds = [];
              if (!item.merchants) item.merchants = [];
              item.merchants.forEach(item2 => {
                item.merchantIds.push(item2.merchantId);
              });
            });
            this.pzjlList = res;
            resolve();
          }
        });
      });
    },
    async init() {
      this.allLeft = [];
      this.left = [];
      this.pzjlList = [];
      await Promise.all([
        this.getPzjl({
          scope: "0",
          type: "2",
          ownerId: this.$store.getters.userId
        }),
        this.getMerchants({ ownerId: this.$store.getters.userId })
      ]);
      this.dealAllleft();
    },
    save() {
      this.pzjlList.forEach(item => {
        item.merchants = [];
        item.merchantIds.forEach(item2 => {
          let result = this.left.find(item3 => {
            return item3.merchantId == item2;
          });
          if (result) {
            item.merchants.push(result);
          }
        });
      });
      peizhuangjlbindmerchants(this.pzjlList).then(res => {
        if (!res.error) {
          this.$message({
            type: "success",
            message: "绑定成功！"
          });
          this.$emit("closeBind");
          this.init();
        }
      });
    },
    dealAllleft() {
      this.pzjlList.forEach((item, index) => {
        let buyaoIndex = [];
        let jl = JSON.parse(JSON.stringify(this.pzjlList));
        jl.splice(index, 1);
        jl.forEach((item2, index2) => {
          buyaoIndex = buyaoIndex.concat(item2.merchantIds);
        });
        let result = this.left.filter(item2 => {
          return buyaoIndex.indexOf(item2.merchantId) < 0;
        });
        this.allLeft.push(result);
      });
    },
    changeEditable() {
      this.editable = !this.editable;
    },
    transferChange(value, direction, key) {
      this.allLeft = [];
      this.dealAllleft();
    },
    cancel() {
      this.$emit("closeBind");
      this.init();
    }
  }
};
</script>
<style lang="scss" scoped>
.trans_area {
  max-height: 600px;
  overflow-y: scroll;
  position: realtive;
  .trans_item {
    margin-bottom: 13px;
  }
  .trans_button {
    position: absolute;
    right: 55px;
    bottom: 10px;
  }
}
</style>
