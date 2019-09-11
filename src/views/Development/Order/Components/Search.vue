<!--
 * @Description: In User Settings Edit
 * @Author: Calamus
 * @Date: 2019-04-29 10:31:43
 * @LastEditTime: 2019-09-04 10:33:51
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <el-row>
      <common-wrapper>
        <el-form
          :model="searchForm"
          ref="searchForm"
          :inline="true"
          label-width="120px"
        >
          <!-- <search-component :searchParams.sync="searchParams"></search-component> -->
          <el-form-item>
            <el-input
              v-model="contentId"
              :placeholder="
                billType == 0 ? '请输入CTMS单号查询' : '请输入第三方单号查询'
              "
              :clearable="true"
              style="width:320px"
            >
              <el-select
                style="width:120px"
                v-model="billType"
                slot="prepend"
                placeholder="请选择搜索类型"
              >
                <el-option label="CTMS单号" :value="0"></el-option>
                <el-option label="第三方单号" :value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item
            :label="item.label"
            :prop="item.prop"
            v-for="(item, index) in rowList.filter(res => {
              return res.checked;
            })"
            :key="index"
          >
            <el-select
              v-if="item.prop == 'merchantId'"
              v-model="searchForm[item.prop]"
              filterable
              clearable
              placeholder="请选择商户"
            >
              <el-option
                v-for="(item, index) in merchantList"
                :key="index"
                :label="item.merchantName"
                :value="item.merchantId"
              />
            </el-select>
            <el-select
              v-else-if="item.prop == 'orderType'"
              v-model="searchForm[item.prop]"
              filterable
              clearable
              placeholder="请选择服务类型"
            >
              <el-option
                v-for="(item, index) in orderTypeList"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-date-picker
              v-else-if="item.type == 'date'"
              style="width:173px"
              :placeholder="item.placeholder"
              v-model="searchForm[item.prop]"
              align="right"
              format="yyyy-MM-dd"
              type="date"
              size="mini"
              :clearable="item.clearable"
            >
            </el-date-picker>
            <el-input
              v-else
              v-model="searchForm[item.prop]"
              :placeholder="item.placeholder || '请输入查询内容'"
              :clearable="item.clearable || true"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-popover
              placement="left"
              popper-class="row_list"
              width="300"
              trigger="click"
            >
              <div class="choose_row_list">
                <div class="head">
                  <el-checkbox
                    :indeterminate="isRowIndeterminate"
                    v-model="rowCheckAll"
                    @change="handleCheckAllRowChange"
                    >全选</el-checkbox
                  >
                  <span>{{ rowChoosed.length }} / {{ rowList.length }}</span>
                </div>
                <el-checkbox-group
                  v-model="rowChoosed"
                  @change="handleCheckedRowChange"
                >
                  <el-checkbox
                    v-for="row in rowList"
                    :label="row.prop"
                    :key="row.prop"
                    :disabled="row.disabled"
                  >
                    {{ row.label }}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
              <el-button
                slot="reference"
                class="mar-r-10"
                icon="el-icon-s-unfold"
                >展开</el-button
              >
            </el-popover>
            <el-button type="primary" @click.native="search">查询</el-button>
            <el-button @click="resetForm('searchForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </common-wrapper>
    </el-row>
    <el-row class="order_search">
      <el-col :span="24" class="order_search_title">
        <div>
          <span class="title">订单列表</span>
          <el-button
            type="text"
            v-if="showBtn('handleAdd')"
            @click.stop="handleAdd"
          >
            创建订单
          </el-button>
          <el-divider
            v-if="showBtn('handleAdd')"
            direction="vertical"
          ></el-divider>
          <el-button
            type="text"
            v-if="showBtn('handleExport')"
            @click.stop="handleExport"
          >
            订单导入
          </el-button>
          <el-divider
            v-if="showBtn('handleExport')"
            direction="vertical"
          ></el-divider>
          <el-button type="text"
            v-if="showBtn('toCarrier')"
            :disabled="choose.length == 0 || chooseMsg.length>0"
             @click.stop="toCarrier">
            下发服务商
          </el-button>
          <el-divider v-if="showBtn('toCarrier')" direction="vertical"></el-divider>
          <el-dropdown
            @command="handleCommand"
            v-if="showBtn('cancel') || showBtn('print')"
          >
            <a href="javascript:;" style="font-size:12px;">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </a>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                command="cancel"
                :disabled="choose.length <= 0 || !upLen"
                v-if="showBtn('cancel')"
                >批量取消</el-dropdown-item
              >
              <el-dropdown-item
                command="print"
                :disabled="choose.length <= 0"
                v-if="showBtn('print')"
                >批量打印</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <simple-tabs v-model="status">
          <tab-item
            :label="item.label"
            v-for="(item, index) in statusList"
            :key="index"
            :value="item.value"
          />
        </simple-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CommonWrapper from "@/components/commonWrapper";
import SearchComponent from "@/components/searchComponent";
import { setSession, getSession } from "@/utils/session";
import moment from "moment";
import { simpleTabs, TabItem } from "@/components/simpleTabs/index.js";
import { Order_Search_list,Order_Type_list, Order_Status_List } from "@/utils/ENUM";

export default {
  name: "Search",
  components: { CommonWrapper, SearchComponent },
  data() {
    return {
      searchParams: {},
      // 检索界面数据
      contentId: "",
      billType: 0,
      status: "",
      searchForm: {},
      isRowIndeterminate: true,
      rowCheckAll: false,
      rowChoosed: [],
      orderTypeList:Order_Type_list,
      rowList: Order_Search_list.filter(res => {
        return (
          !res.role || res.role.indexOf(this.$store.state.user.roleType) >= 0
        );
      }),
      statusList: Order_Status_List,
      canExport: false
    };
  },
  props: {
    upLen: {
      type: Boolean,
      default: true
    },
    choose: {
      type: Array
    },
    merchantList: {
      type: Array
    },
    buttonData: {
      type: Array
    },
    chooseMsg:{
      type:String
    }
  },
  mounted() {
    this.rowList.forEach(item => {
      if (item.checked) {
        this.rowChoosed.push(item.prop);
      }
      if (
        item.role &&
        item.role.indexOf(this.$store.getters.roleType) >= 0 &&
        item.prop == "merchantId"
      ) {
        item.checked = true;
        this.rowChoosed.push(item.prop);
      }
    });
    this.rowList.map(item => {
      this.$set(this.searchForm, item.prop, "");
    });
    if (this.$store.getters.roleType.includes("merchant")) {
      this.searchForm.merchantId = this.$store.getters.userId;
    }
    let params = Object.assign({}, this.searchForm);
    params.status = "";
    params.billType = this.billType;
    params.waybillNo = "";
    this.$emit("search", Object.assign({}, params));
  },
  watch: {
    status(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.search();
      }
    },
    searchParams(val) {
      this.searchForm = Object.assign(this.searchForm, val);
    }
  },
  methods: {
    handleAdd() {
      this.$emit("add");
    },
    handleExport() {
      this.$emit("import");
    },
    toCarrier(){
      this.$emit("toCarrier");
    },
    // 检索
    search() {
      // if(!this.searchForm.merchantId){
      //   return
      // }
      let params = Object.assign({}, this.searchForm);
      params.status = this.status;
      params.billType = this.billType;
      params.waybillNo = this.contentId;
      this.$emit("search", Object.assign({}, params));
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$emit("rest", Object.assign({}, this.searchForm));
      this.status = "";
      this.billType = 0;
      this.contentId = "";
    },
    diffChecked(value) {
      this.rowList.map(item => {
        item.checked = item.disabled ? item.checked : false;
        if (value.indexOf(item.prop) > -1) {
          item.checked = true;
        } else {
          this.searchForm[item.prop] == "";
        }
      });
    },
    handleCheckedRowChange(value) {
      this.diffChecked(value);
      let checkedCount = value.length;
      this.rowCheckAll =
        checkedCount ===
        this.rowList.filter(res => {
          return !res.disabled;
        }).length;
      this.isRowIndeterminate =
        checkedCount > 0 &&
        checkedCount <
          this.rowList.filter(res => {
            return !res.disabled;
          }).length;
    },
    handleCheckAllRowChange(val) {
      let allChecked = this.rowList
        .filter(res => {
          return !res.disabled || (res.disabled && res.checked);
        })
        .map(item => {
          return item.prop;
        });
      let defaultList = this.rowList
        .filter(res => {
          return res.disabled;
        })
        .map(item => {
          return item.prop;
        });
      this.rowChoosed = val ? allChecked : defaultList;
      this.diffChecked(this.rowChoosed);
      this.isRowIndeterminate = false;
    },
    handleCommand(command) {
      switch (command) {
        case "cancel":
          this.$emit("cancel");
          break;
        case "print":
          this.$emit("print");
          break;
      }
    },
    showBtn(method) {
      return this.buttonData.some(item => {
        return item.resourceUrl == method;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.order_search {
  margin: 0.5rem 1rem;
  border-bottom: 1px solid #ebeef5;
  .order_search_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      color: var(--color-primary);
      font-size: 16px;
      font-weight: 500;
      border-bottom: 2px solid var(--color-primary);
      padding: 0.5rem 2rem 0.5rem 1rem;
    }
    .el-icon-refresh,
    .el-icon-circle-plus-outline,
    .el-icon-folder-opened {
      font-size: 18px;
    }
  }
}
</style>
