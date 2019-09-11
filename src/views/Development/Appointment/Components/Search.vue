<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-13 14:33:27
 * @LastEditTime: 2019-08-16 15:08:52
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-form :model="searchForm" position="left" inline ref="searchForm" class="searchForm">
      <el-row>
        <el-col :span="18">
          <el-form-item
              label="商户"
              v-if="$store.getters.roleType == 'carrier'"
              prop="merchantId"
            >
            <el-select
                v-model="searchForm.merchantId"
                filterable
                :clearable="roleType != '1'"
                placeholder="请选择商户"
                @change="search"
              >
                <el-option
                  v-for="(item, index) in merchantList"
                  :key="index"
                  :label="item.merchantName"
                  :value="item.merchantId"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="orderType" label="服务类型">
              <el-select
                  v-model="searchForm.orderType"
                  filterable
                  clearable
                  placeholder="请选择服务类型"
                  @change="search"
                >
                  <el-option
                    v-for="(item, index) in orderTypeList"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
            </el-form-item>
            <el-form-item prop="keyword">
              <el-input
                style="width: 450px;"
                v-model="searchForm.keyword"
                @change="search"
                maxlength="50"
                clearable
                placeholder="请输入关键字如:商户名称、订单号、客户名称、手机号、地址"
              ></el-input>
            </el-form-item>
            <el-form-item prop="time">
              <el-date-picker
                @change="search"
                v-model="searchForm.time"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-form-item>
        </el-col>
        <el-col :span="6">
            <el-form-item style="float: right;">
              <el-radio-group
                v-model="searchForm.appointStatus"
                @change="statusChange"
              >
                <el-radio-button label="0">待预约</el-radio-button>
                <el-radio-button label="1">已预约</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="批量预约"
              style="float: right;"
              v-if="showBtn('multipleAppoint') && searchForm.appointStatus == '0'" 
            >
              <el-switch @change="multipleChange" v-model="multiple"> </el-switch>
            </el-form-item>
        </el-col>
      </el-row>
  </el-form>
</template>

<script>
import { mapGetters } from "vuex";
import { Order_Search_list,Order_Type_list, Order_Status_List } from "@/utils/ENUM";

export default {
  name: "search",
  data() {
    return {
       orderTypeList:Order_Type_list,
      searchForm: {
        keyword: "",
        time: [
          new Date(),
          new Date(new Date().getTime() + 3600 * 1000 * 24 * 3)
        ],
        appointStatus: "0",
        orderType:'',
        startDate: "",
        endDate: "",
        merchantId: ""
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "未来三天",
            onClick: picker => {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 3);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "未来一周",
            onClick: picker => {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "未来一个月",
            onClick: picker => {
              const end = new Date();
              const start = new Date();
              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      multiple: false
    };
  },
  props: {
    merchantList: {
      type: Array
    },
    buttonData: {
      type: Array
    }
  },
  computed: {
    ...mapGetters(["roleType", "userId"])
  },
  mounted() {
    if (this.$store.getters.roleType.includes("merchant")) {
      this.searchForm.merchantId = this.$store.getters.userId;
    }
    this.search();
  },
  methods: {
    statusChange() {
      this.$emit("multipleChange", false);
      this.search();
    },
    multipleChange(value) {
      this.$emit("multipleChange", value);
    },
    // 检索
    search: function() {
      if (this.searchForm.time && this.searchForm.time.length) {
        this.searchForm.startDate = this.searchForm.time[0];
        this.searchForm.endDate = this.searchForm.time[1];
      } else {
        this.searchForm.startDate = "";
        this.searchForm.endDate = "";
      }
      this.$emit("search", Object.assign({}, this.searchForm));
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
// .el-form-item {
//   margin-bottom: 0;
// }
.searchForm {
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
}
</style>
