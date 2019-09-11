<!--
 * @Description: In User Settings Edit
 * @Author: Calamus
 * @Date: 2019-08-08 16:15:58
 * @LastEditTime: 2019-09-02 11:59:40
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="user-info">
    <div>
      <el-row v-if="!editable">
        <el-col :span="24">
          <span>
            商户类型:
            <span style="padding-left:5px;">{{ formatType(roleType) }}</span>
          </span>
          <el-button style="padding:10px" type="text" @click="changeEditable"
            >修改</el-button
          >
        </el-col>
      </el-row>
      <el-row v-if="editable">
        <el-col :span="24">
          <span>
            商户类型:
          </span>
          <el-select v-model="choosed" placeholder="请选择">
            <el-option
              v-for="item in roleTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <el-button-group>
            <el-button
              style="padding:10px"
              type="text"
              :disabled="!choosed"
              @click="save"
              >绑定</el-button
            >
            <el-button style="padding:10px" type="text" @click="refresh"
              >取消</el-button
            >
          </el-button-group>
        </el-col>
      </el-row>

      <!-- <el-transfer
      style="text-align: left; display: inline-block"
      v-model="choosed"
      :props="{
        key:'useruuid',
        label:'contact',
        disabled:'disabled'
      }"
      filterable
      :left-default-checked="leftDefaultChecked"
      :right-default-checked="defaultChecked"
      :titles="['服务商', '绑定服务商']"
      :button-texts="['取消选择', '选择']"
      :format="{
        noChecked: '${total}',
        hasChecked: '${checked}/${total}'
      }"
      @change="handleChange"
      :data="carrierList">
      <span slot-scope="{option}">{{ option.contact }}</span>
      <el-button class="transfer-footer" slot="left-footer" size="small" @click="refresh">刷新</el-button>
      <el-button class="transfer-footer" :disabled="choosed.length <= 0" slot="right-footer" size="small" @click="save">绑定</el-button>
    </el-transfer> -->
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getAllCarrier, merchantsbindcarrier } from "@/api/user";

export default {
  name: "ProductConfig",
  data() {
    return {
      editable: false,
      leftDefaultChecked: [],
      defaultChecked: [],
      carrierList: [],
      choosed: this.roleType,
      choosedName: "",
      roleTypes: [
        {
          label: "自营商户",
          value: "merchant"
        },
        {
          label: "半托管商户",
          value: "merchanthalf"
        },
        {
          label: "全托管商户",
          value: "merchantall"
        }
      ]
    };
  },
  mounted() {},
  computed: {
    ...mapGetters(["userAccount", "userName", "merchantInfo", "roleType"])
  },
  methods: {
    formatType(value) {
      let result = this.roleTypes.find(item => {
        return item.value == value;
      });
      if (result) {
        return result.label;
      } else {
        return "";
      }
    },
    handleChange(value, direction, movedKeys) {
      console.log(this.choosed, "111", value, direction, movedKeys);
    },
    refresh() {
      this.refreshMerchantInfo();
      this.editable = false;
    },
    changeEditable() {
      this.editable = !this.editable;
    },
    save() {
      let list = this.carrierList.filter(item => {
        return this.choosed == item.useruuid;
      });
      if (list.length > 0) {
        list = list.map(item => {
          return {
            id: item.useruuid,
            name: item.company,
            account: item.account
          };
        });
      }
      merchantsbindcarrier(list).then(res => {
        if (!res.error) {
          this.$message({
            message: "修改成功！",
            type: "success"
          });
          this.editable = false;
          this.refreshMerchantInfo();
        }
      });
    },
    refreshMerchantInfo() {
      this.$store.dispatch("getMerchantInfo").then(res => {
        this.choosed = res.carriers
          ? res.carriers
              .map(item => {
                return item.id;
              })
              .join("")
          : "";
        this.choosedName = res.carriers
          ? res.carriers
              .map(item => {
                return item.name;
              })
              .join("")
          : "";
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>
