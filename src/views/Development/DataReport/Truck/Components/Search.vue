<template>
  <div>
    <el-row>
      <el-form
        :model="searchForm"
        ref="searchForm"
        :inline="true"
        class="distribute_search"
        label-width="80px"
      >
        <el-form-item prop="" label="统计时间" class="multiple_search_box">
          <el-date-picker
            class="multiple_date"
            v-model="searchForm.start"
            placeholder="开始日期"
            :picker-options="pickerOptionsStart"
            value-format="timestamp"
            :clearable="false"
            size="mini"
          >
          </el-date-picker>
          <el-date-picker
            class="multiple_date"
            v-model="searchForm.end"
            placeholder="结束日期"
            :picker-options="pickerOptionsEnd"
            value-format="timestamp"
            :clearable="false"
            size="mini"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="车牌号" prop="plateNo">
          <el-input v-model="searchForm.plateNo" />
        </el-form-item>
        <!-- <el-form-item label-width="0" style="float: right;">
          <el-button @click.stop="exportExcel">导出</el-button>
        </el-form-item> -->
        <el-form-item label-width="0" style="float: right;">
          <el-button @click.stop="resetForm('searchForm')">重置</el-button>
        </el-form-item>
        <el-form-item label-width="0" style="float: right;">
          <el-button @click="search" type="primary">查询</el-button>
        </el-form-item>
        <el-form-item label="统计说明" style="float: right;">
          <el-switch @change="tipsChange" v-model="tips"> </el-switch>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import CommonWrapper from "@/components/commonWrapper";
import moment from "moment";
import { getMerchantsByAssembly } from "@/api/order";

export default {
  name: "Search",
  components: { CommonWrapper },
  data() {
    return {
      // 检索界面数据
      tips: false,
      searchForm: {
        start: null,
        end: null,
        type: "bus",
        plateNo: ""
      },
      status: "0",
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() >= new Date().getTime();
        }
      },
      pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.searchForm.end;
          if (endDateVal) {
            return time.getTime() >= new Date(endDateVal).getTime();
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.searchForm.start;
          if (beginDateVal) {
            return (
              time.getTime() < new Date(beginDateVal).getTime() ||
              time.getTime() > new Date().getTime()
            );
          } else {
            return time.getTime() > new Date().getTime();
          }
        }
      }
    };
  },
  props: {
    merchantList: {
      type: Array,
      default: []
    }
  },
  mounted() {
    this.searchForm.start = new Date(moment().set("date", 1)).getTime();
    this.searchForm.end = new Date(moment().subtract(1, "days")).getTime();

    this.$emit("search", Object.assign({}, this.searchForm));
  },
  methods: {
    // 检索
    search() {
      this.$emit("search", Object.assign({}, this.searchForm));
    },
    // 重置
    resetForm(formName) {
       this.searchForm.start = new Date(moment().set("date", 1)).getTime();
        this.searchForm.end = new Date(moment().subtract(1, "days")).getTime();
        this.searchForm.plateNo = ''
      this.$emit("search", Object.assign({}, this.searchForm));
    },
    //获取商户
    getMerchantsByAssembly() {
      getMerchantsByAssembly({}).then(res => {
        if (!res.error) {
          this.merchantList = [];
        }
      });
    },
    tipsChange(value) {
      this.$emit("tipsChange", value);
    },
    getStopDate() {
      if (this.status == "0" && this.searchForm.month) {
        if (moment().isSame(moment(this.searchForm.month), "month")) {
          return moment()
            .subtract(1, "days")
            .format("YYYY-MM-DD HH:mm");
        } else {
          return moment(this.searchForm.month)
            .add(1, "months")
            .set("date", 1)
            .format("YYYY-MM-DD HH:mm");
        }
      } else if (this.status == "1" && this.searchForm.year) {
        if (moment().isSame(moment(this.searchForm.year), "year")) {
          return moment()
            .subtract(1, "days")
            .format("YYYY-MM-DD HH:mm");
        } else {
          return moment(this.searchForm.year)
            .add(1, "years")
            .set("month", 0)
            .set("date", 1)
            .format("YYYY-MM-DD HH:mm");
        }
      } else {
        return "";
      }
    },
    statusChange(value) {
      if (value == "0") {
        this.searchForm.year = null;
        this.searchForm.month = moment().format("YYYY-MM");
      } else if (value == "1") {
        this.searchForm.month = null;
        this.searchForm.year = moment().format("YYYY");
      }
    },
    exportExcel() {
      this.$emit("exportExcel");
    }
  }
};
</script>
<style lang="scss">
.distribute_search {
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
