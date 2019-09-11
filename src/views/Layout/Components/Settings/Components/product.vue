<template>
  <div class="user-info">
    <el-form ref="form" :model="form">
      <el-form-item label="货品模板: ">
        <el-radio-group v-model="form.templateId">
          <el-radio v-for="item in 3" :label="item" :key="item">{{
            "模版" + item
          }}</el-radio>
        </el-radio-group>
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
        templateId: 1
      }
    };
  },
  computed: {
    ...mapGetters(["userAccount", "userName"])
  }
};
</script>
<style lang="scss" scoped></style>
