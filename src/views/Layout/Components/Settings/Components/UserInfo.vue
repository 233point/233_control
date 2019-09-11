<template>
  <div class="user-info">
    <el-form label-width="100px">
      <el-form-item label="用户名: ">
        {{ userAccount }}
      </el-form-item>
      <el-form-item label="用户昵称: ">
        {{ userName }}
      </el-form-item>
      <el-form-item label="所属角色: ">
        {{ userRoles }}
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { Role_Type_list } from "@/utils/ENUM";

export default {
  name: "UserInfo",
  data() {
    return {
      roleList: Role_Type_list
    };
  },
  computed: {
    ...mapGetters(["userAccount", "userName", "roleType"]),
    userRoles() {
      const roles = this.$store.getters.roles;
      let result = this.roleList.find(item => {
        return item.value == this.roleType;
      });
      return result ? result.label : "未知";
    }
  }
};
</script>
<style lang="scss" scoped>
.user-info {
  .el-form-item {
    border-bottom: 1px solid $base-light-color;
  }
}
</style>
