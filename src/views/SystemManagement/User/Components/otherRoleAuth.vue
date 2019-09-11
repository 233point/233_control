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
          <!-- <el-form-item label="角色" prop="userOrgUuid">
            <el-select class="w100p" v-model="userForm.busId" filterable placeholder="请选择角色">
              <el-option
                v-for="(item) in roleList"
                :key="item.id"
                :label="item.roleName"
                :value="item.type"
              />
            </el-select>
          </el-form-item> -->
          <el-form-item label="管理城市范围" prop="cityCode">
            <el-cascader
              class="w100p"
              ref="cascader"
              :options="cityOptions"
              v-model="userForm.cityCode"
              :props="cityProps"
              @change="selectCityChange($event)"
            ></el-cascader>
          </el-form-item>
          <el-form-item
            label="管理商场范围"
            v-if="
              selectedUsers.roleType == 'merchant' ||
                selectedUsers.roleType == 'regionMarcketManager' ||
                selectedUsers.roleType == 'marcketManager'
            "
            prop="marketList"
          >
            <el-select
              class="w100p"
              v-model="userForm.marketList"
              :multiple-limit="
                selectedUsers.roleType == 'regionMarcketManager' ? 0 : 1
              "
              multiple
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
import areaTree from "@/assets/city_tree.json";
const addressTree = areaTree.children;
// api
import { authorizationCustomer, marketMerchantBinding } from "@/api/user";
import { queryNoPage } from "@/api/warehouse";
import { getRoleList } from "@/api/role";

export default {
  name: "OtherRoleAuth",
  data() {
    return {
      cityOptions: addressTree,
      cityProps: {
        value: "adcode",
        label: "name",
        children: "children",
        multiple: false
      },
      userForm: {
        // cityCodeShow:[],
        cityCode: [],
        marketList: [],
        marketListShow: []
      },
      formRules: {
        cityCode: [
          { required: true, message: "请选择管理城市", trigger: "change" }
        ],
        marketList: [
          { required: true, message: "请选择管理商场", trigger: "change" }
        ]
      },
      isVisible: false,
      tableData: [],
      currentId: "",
      selectRow: {}, // 列表选中列
      isListLoading: false,
      pagination: {
        // 翻页数据
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      roleList: [
        {
          type: "marcketManager",
          roleName: "商场负责人"
        },
        {
          type: "cityManager",
          roleName: "城市负责人"
        },
        {
          type: "regionMarcketManager",
          roleName: "商场区域负责人"
        },
        {
          type: "regionManager",
          roleName: "区域负责人"
        }
      ],
      marketList: [],
      marketListShow: []
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
    }
  },
  watch: {
    show(isShow) {
      if (isShow) {
        this.userForm = JSON.parse(JSON.stringify(this.selectedUsers));
        console.log(this.userForm.cityCode);
        //   let cityCode = []
        if (this.userForm.cityCode) {
          this.userForm.cityCode.forEach((item, index) => {
            item = item.split(",");
            let item2 = [];
            item.forEach(item3 => {
              item2.push(Number(item3));
            });
            this.$set(this.userForm.cityCode, index, item2);
          });
        }
        console.log(this.userForm.cityCode);
        if (
          this.selectedUsers.roleType == "regionManager" ||
          this.selectedUsers.roleType == "regionMarcketManager" ||
          this.selectedUsers.roleType == "carrier"
        ) {
          this.cityProps.multiple = true;
        } else {
          if (this.userForm.cityCode) {
            this.userForm.cityCode = this.userForm.cityCode[0];
          }
          this.cityProps.multiple = false;
        }

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
          this.userForm.city = [];
          let citys = this.$refs.cascader.getCheckedNodes();
          citys.forEach(item => {
            this.userForm.city.push(item.pathLabels.join(""));
          });
          if (
            this.selectedUsers.roleType == "regionManager" ||
            this.selectedUsers.roleType == "regionMarcketManager" ||
            this.selectedUsers.roleType == "carrier"
          ) {
          } else {
            this.userForm.cityCode = [this.userForm.cityCode];
          }
          let marketListShow = [];
          this.userForm.marketList &&
            this.userForm.marketList.forEach(item => {
              let marketName = this.marketList.find(item2 => {
                return item2.id == item;
              }).name;
              marketListShow.push(marketName);
            });
          this.userForm.marketListShow = marketListShow;
          let params = { ...this.userForm };
          authorizationCustomer(params).then(res => {
            if (!res.error) {
              this.$message({
                message: "用户授权成功!",
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
        if (!flag) {
          this.userForm.marketList = [];
        }
        if (
          this.selectedUsers.roleType == "merchant" ||
          this.selectedUsers.roleType == "regionMarcketManager" ||
          this.selectedUsers.roleType == "marcketManager"
        ) {
          let params = [];
          if (
            this.selectedUsers.roleType == "regionManager" ||
            this.selectedUsers.roleType == "regionMarcketManager" ||
            this.selectedUsers.roleType == "carrier"
          ) {
            this.userForm.cityCode.forEach(item => {
              params.push(item[item.length - 1] + "");
            });
          } else {
            params.push(
              this.userForm.cityCode[this.userForm.cityCode.length - 1] + ""
            );
          }
          queryNoPage({ cityCode: params }).then(res => {
            this.marketList = res;
            resolve(res.length);
          });
        }
        // }
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
