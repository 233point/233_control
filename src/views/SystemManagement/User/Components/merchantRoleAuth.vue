<template>
  <el-dialog
    width="600px"
    :title="'用户授权：' + selectedUsers.roleTypeMessage"
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancel"
  >
    <el-row>
      <el-col>
        <el-form
          :model="userForm"
          ref="userForm"
          :rules="formRules"
          label-width="120px"
        >
          <el-form-item label="城市" prop="">
            <span v-if="userForm.city && userForm.city.length">{{
              userForm.city.join("、")
            }}</span>
          </el-form-item>
          <el-form-item label="商场" prop="marketId">
            <el-select
              class="w100p"
              v-model="userForm.marketId"
              filterable
              clearable
              placeholder="请选择商场"
            >
              <el-option
                v-for="item in marketList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col class="btn-area">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
/**
 * User Role Authorization Component
 * ----------------------
 * Author: zhou qi
 * Date: 2018.03.20
 */
import moment from "moment";
import CommonWrapper from "@/components/commonWrapper";
import CommonTable from "@/components/commonTable";
// api
import { marketMerchantBinding } from "@/api/user";
import { queryNoPage } from "@/api/warehouse";

export default {
  name: "MerchantRoleAuth",
  data() {
    return {
      userForm: {
        id: "",
        marketId: "",
        marketName: ""
      },
      formRules: {
        marketId: [{ required: true, message: "请选择商场", trigger: "change" }]
      },
      isVisible: false,
      marketList: []
    };
  },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    selectedUsers: {
      type: Object,
      required: true
    },
    roleList: {
      type: Array
    }
  },
  watch: {
    show(isShow) {
      if (isShow) {
        this.userForm = JSON.parse(JSON.stringify(this.selectedUsers));
        if (this.userForm.cityCode) {
          this.selectCityChange(1, true);
        }
      }
      this.isVisible = isShow;
    }
  },
  methods: {
    save() {
      this.$refs.userForm.validate(isValid => {
        if (isValid) {
          let result = this.marketList.find(item => {
            return item.id == this.userForm.marketId;
          });
          if (result) {
            this.userForm.marketName = result.name;
          }
          let { id, marketId, marketName } = { ...this.userForm };
          marketMerchantBinding({
            id: id,
            marketId: marketId,
            marketName: marketName
          }).then(res => {
            if (!res.error) {
              this.$message({
                message: "商场绑定成功!",
                type: "success"
              });
              this.cancel();
              this.$emit("updateList");
            }
          });
        }
      });
    },
    cancel() {
      this.$emit("update:show", false);
      this.isVisible = false;
    },
    selectCityChange(value, flag) {
      return new Promise((resolve, reject) => {
        let params = [];
        params.push(
          this.userForm.cityCode[this.userForm.cityCode.length - 1] + ""
        );
        queryNoPage({ cityCode: params }).then(res => {
          this.marketList = res;
          resolve(res.length);
        });
      });
    }
  },
  components: {
    CommonWrapper,
    CommonTable
  }
};
</script>
<style lang="scss" scoped>
.btn-area {
  text-align: right;
}
</style>
