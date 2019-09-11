<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-08 17:00:15
 * @LastEditTime: 2019-08-16 16:54:32
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="user-info">
    <el-form ref="form" :model="form">
      <el-form-item label="">
        <div style="display:flex">
          <el-select
            v-model="form.time"
            placeholder="请选择"
            @change="changeTime"
          >
            <el-option
              v-for="item in options"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
          <span>分钟</span>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "ProductConfig",
  data() {
    return {
      form: {
        time: 20
      },
      options: [10, 20, 30, 60, 120]
    };
  },
  computed: {
    ...mapGetters(["userAccount", "userName"])
  },
  methods: {
    changeTime(val) {
      console.log("val", val);
    }
  }
};
</script>
<style lang="scss" scoped></style>
