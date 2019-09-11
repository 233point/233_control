<!--
 * @Description: In User Settings Edit
 * @Author: Calamus
 * @Date: 2019-08-05 10:56:09
 * @LastEditTime: 2019-08-26 10:14:02
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="add">
    <a-steps class="auth_steps" :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title">
        <a-icon :type="item.icon" slot="icon" />
      </a-step>
    </a-steps>
    <div class="order_form">
      <div v-if="current == 0">
        <customer-template
          :merchantList="merchantList"
          :nexLoading.sync="nexLoading"
          @addCustomer="addCustomer"
          @cancel="cancel"
        />
      </div>
      <div v-if="current == 1">
        <product-template :templateType="currentTemplateType" :productList="currentProductList" @addProduct="addProduct" @cancel="cancel" />
      </div>
      <div v-if="current == 2" class="finish">
        <span
          ><a-icon type="smile"/>&emsp;&emsp;创建成功&emsp;&emsp;<a-icon
            type="smile"
        /></span>
        <br />
        <el-button @click="cancel">返回列表</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import customerTemplate from "./customer";
import productTemplate from "./product";
import { addCustomerInfo, addProductInfo } from "@/api/order";

export default {
  name: "OrderAdd",
  components: { customerTemplate, productTemplate },
  data() {
    return {
      current: 0,
      currentTemplateType:1,
      currentProductList:[],
      createId: "",
      nexLoading:false,
      steps: [
        {
          title: "订单信息",
          icon: "user"
        },
        {
          title: "货品信息",
          icon: "snippets"
        },
        {
          title: "下单完成",
          icon: "smile-o"
        }
      ]
    };
  },
  props: {
    merchantList: {
      type: Array
    }
  },
  methods: {
    addCustomer(data) {
      console.log("data", data);
      this.current = 1;
      this.nexLoading = true
      addCustomerInfo(data).then(res => {
        if (!res.error) {
          this.$message({
            message: "新增订单信息成功，请添加货品！",
            type: "success"
          });
          this.nexLoading = false
          this.createId = res.id;
          this.currentTemplateType = data.templateType
            ? Number(data.templateType)
            : 1;
          this.current = 1;
          this.currentProductList = data.currentProductList
        }
      });
    },
    addProduct(params) {
      if (this.createId) {
        addProductInfo({ id: this.createId, ...params }).then(res => {
          if (!res.error) {
            this.$message({
              message: "创建订单成功！",
              type: "success"
            });
            this.current = 2;
          }
        });
      } else {
        this.$message({
          message: "订单创建有误，请重新创建",
          type: "warning"
        });
        this.current = 1;
      }
    },
    cancel() {
      this.$emit("cancel");
    }
  }
};
</script>

<style lang="scss" scoped>
.auth_steps {
  width: 80%;
  margin: 1rem auto;
}
.finish {
  text-align: center;
  span:nth-child(1) {
    font-size: 20px;
    color: var(--color-primary);
    font-weight: 500;
    padding: 3rem;
    display: inline-block;
  }
}
</style>
