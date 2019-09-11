<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-04 09:06:54
 * @LastEditTime: 2019-09-04 10:40:19
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <el-row>
      <el-form
        :model="searchForm"
        ref="searchForm"
        :inline="true"
        class="moniter_search"
        label-width="80px"
      >
        <el-form-item label-width="0" prop="waybillNo">
          <el-input :placeholder="searchForm.billType == 0 ? '请输入CTMS单号查询' : '请输入第三方单号查询'"  style="width:320px" v-model="searchForm.waybillNo">
            <el-select
              slot="prepend"
              v-model="searchForm.billType"
              placeholder="请选择"
              style="width:120px"
            >
              <el-option label="CTMS单号" value="0"></el-option>
              <el-option label="第三方单号" value="1"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label-width="0" prop="" class="multiple_search_box">
          <el-select
            class="multiple_select"
            v-model="searchForm.dateType"
            placeholder="请选择"
          >
            <el-option label="下单时间" value="0"></el-option>
            <el-option label="发车时间" value="1"></el-option>
            <el-option label="完成时间" value="2"></el-option>
          </el-select>
          <el-date-picker
            class="multiple_date"
            v-model="searchForm.startDate"
            placeholder="开始日期"
            :picker-options="pickerOptionsStart"
            size="mini"
          >
          </el-date-picker>
          <el-date-picker
            class="multiple_date"
            v-model="searchForm.endDate"
            placeholder="结束日期"
            :picker-options="pickerOptionsEnd"
            size="mini"
          >
          </el-date-picker>
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
            format="yyyy-MM-dd HH:mm"
            type="datetime"
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
            <el-button slot="reference" class="mar-r-10" icon="el-icon-s-unfold"
              >展开</el-button
            >
          </el-popover>
          <el-button type="primary" @click.native="search">查询</el-button>
          <el-button @click="resetForm('searchForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import CommonWrapper from "@/components/commonWrapper";
import { setSession, getSession } from "@/utils/session";
import moment from "moment";
import { simpleTabs, TabItem } from "@/components/simpleTabs/index.js";
import { getMerchantsByAssembly } from "@/api/order";
import { Moniter_Search_List,Order_Type_list } from "@/utils/ENUM";

export default {
  name: "Search",
  components: { CommonWrapper },
  data() {
    return {
      // 检索界面数据
      status: "",
      searchForm: {
        billType: "0",
        waybillNo: "",
        dateType: "0",
        startDate: null,
        endDate: null,
        transStatus: "",
        merchantId: "",
        carrierId: ""
      },
      isRowIndeterminate: true,
      rowCheckAll: false,
      rowChoosed: [],
      orderTypeList:Order_Type_list,
      rowList: Moniter_Search_List.filter(res => {
        return (
          !res.role || res.role.indexOf(this.$store.state.user.roleType) >= 0
        );
      }),
      canExport: false,
      merchantList: [],
      pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.searchForm.endDate;
          if (endDateVal) {
            return time.getTime() >= new Date(endDateVal).getTime();
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.searchForm.startDate;
          if (beginDateVal) {
            return time.getTime() < new Date(beginDateVal).getTime();
          }
        }
      }
    };
  },
  mounted() {
    if (this.$store.state.user.roleType != "merchant") {
      this.getMerchantsByAssembly();
    }
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
    this.searchForm.dateTime = this.searchForm.deliveryTime;
    if (this.$store.getters.roleType.includes("merchant")) {
      this.searchForm.merchantId = this.$store.getters.userId;
    } else {
      this.searchForm.carrierId = this.$store.getters.userId;
    }
    this.$emit("search", Object.assign({}, this.searchForm));
  },
  methods: {
    // 检索
    search() {
      let params = Object.assign({}, this.searchForm);
      this.$emit("search", Object.assign({}, params));
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.searchForm.startDate = null;
      this.searchForm.endDate = null;
      this.$emit("rest", Object.assign({}, this.searchForm));
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
    //获取商户
    getMerchantsByAssembly() {
      getMerchantsByAssembly({}).then(res => {
        if (!res.error) {
          this.merchantList = res;
        }
      });
    }
  }
};
</script>
<style lang="scss">
.moniter_search {
  .el-input-group__prepend {
    width: 120px;
  }
}
.multiple_search_box {
  .el-form-item__content {
    font-size: 0;
  }
  .multiple_select {
    width: 120px;
    .el-input__inner {
      background-color: #f5f7fa;
      color: #909399;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: none;
    }
  }
  .multiple_date.el-date-editor {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>
<style lang="scss" scoped>
.moniter_search {
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
