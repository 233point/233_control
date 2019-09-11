<template>
  <div class="add">
    <a-steps class="auth_steps" :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title">
        <a-icon :type="item.icon" slot="icon" />
      </a-step>
    </a-steps>
    <div class="order_form">
      <div v-show="current == 0">
        <customer-template
          v-if="!!customerInfo"
          :isEdit="true"
          :info="customerInfo"
          :merchantList="merchantList"
          @addCustomer="addCustomer"
          @cancel="cancel"
        />
      </div>
      <div v-show="current == 1">
        <product-template
          v-if="!!customerInfo"
          :isEdit="true"
          :info="customerInfo"
          @addProduct="addProduct"
          @cancel="cancel"
        />
      </div>
      <div v-if="current == 2" class="finish">
        <span
          ><a-icon type="smile"/>&emsp;&emsp;编辑成功&emsp;&emsp;<a-icon
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
import { addCustomerInfo, addProductInfo, updateOrder } from "@/api/order";

export default {
  name: "OrderAdd",
  components: { customerTemplate, productTemplate },
  props: {
    info: {
      type: Object
    },
    merchantList: {
      type: Array
    }
  },
  mounted() {
    console.log("info", this.info);
    this.$nextTick(() => {
      this.customerInfo = JSON.parse(JSON.stringify(this.info));
    });
  },
  watch: {
    info: {
      handler(newValue, oldValue) {
        console.log("watch", newValue);
        this.customerInfo = JSON.parse(JSON.stringify(newValue));
      },
      deep: true
    }
  },
  data() {
    return {
      current: 0,
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
      ],
      customerInfo: {}
    };
  },
  methods: {
    addCustomer(data) {
      this.customerInfo = JSON.parse(JSON.stringify(data));
      this.current = 1;
    },
    addProduct(data) {
      updateOrder({ ...this.customerInfo, ...data }).then(res => {
        if (!res.error) {
          this.$message({
            message: "编辑订单成功！",
            type: "success"
          });
          this.current = 2;
          this.$emit("cancel");
        }
      });
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
