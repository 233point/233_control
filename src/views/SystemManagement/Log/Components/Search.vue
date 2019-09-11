<template>
  <el-form
    :model="searchForm"
    ref="searchForm"
    :rules="searchRule"
    label-width="100px"
    size="mini"
  >
    <el-row>
      <!--<el-col :span="4">-->
      <!--<el-form-item label="日志类型" prop="logType">-->
      <!--<el-select v-entity="searchForm.logType" placeholder="请选择">-->
      <!--<el-option-->
      <!--v-for="log in logTypes"-->
      <!--:key="log.id"-->
      <!--:label="log.value"-->
      <!--:value="log.code">-->
      <!--</el-option>-->
      <!--</el-select>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <el-col :span="4">
        <el-form-item label="登录名" prop="logUserAccount">
          <el-input
            v-model="searchForm.logUserAccount"
            placeholder="请输入登录名"
          ></el-input>
        </el-form-item>
      </el-col>
      <!--<el-col :span="4">-->
      <!--<el-form-item label="来源IP" prop="logIP">-->
      <!--<el-input v-entity="searchForm.logIP" placeholder="请输入登录名"></el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <el-col :span="8">
        <el-form-item label="起止时间" prop="logTime">
          <el-date-picker
            style="width:100%"
            v-model="searchForm.logTime"
            type="datetimerange"
            :default-time="['00:00:00', '23:59:59']"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <div class="ctrl-buttons">
          <el-button type="primary" size="mini" @click="onSubmit('searchForm')"
            >查询</el-button
          >
          <el-button size="mini" @click="resetForm('searchForm')"
            >重置</el-button
          >
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
import moment from "moment";
// api
// import { logtypesGet } from '@/api/systemparams'
export default {
  name: "LogSearch",
  data() {
    return {
      logTypes: [],
      searchForm: {
        // logType: '',
        logUserAccount: "",
        // logIP: '',
        logTime: ["", ""]
      },
      searchRule: {}
    };
  },
  watch: {
    "searchForm.logTime": function(time) {
      if (time.length) {
        this.searchForm.startTime = time[0];
        this.searchForm.endTime = time[1];
      }
    }
  },
  mounted() {
    this.initTime();
    // logtypesGet({}).then(res => {
    // console.log(res)
    // this.logTypes = res
    // })
    this.search();
  },
  methods: {
    initTime() {
      this.searchForm.logTime[0] = moment()
        .hours(0)
        .minutes(0)
        .seconds(0)
        .toDate();
      this.searchForm.logTime[1] = moment()
        .hours(23)
        .minutes(59)
        .seconds(59)
        .toDate();
      this.searchForm = {
        // logType: this.searchForm.logType,
        // logIP: this.searchForm.logIP,
        logTime: [this.searchForm.logTime[0], this.searchForm.logTime[1]],
        logUserAccount: this.searchForm.logUserAccount
      };
    },
    // 转换查询参数为后端需要的参数格式
    convertSearchParams() {
      const searchParams = {
        // logType: this.searchForm.logType,
        // logIP: this.searchForm.logIP,
        logUserAccount: this.searchForm.logUserAccount,
        startTime: this.searchForm.logTime[0],
        endTime: this.searchForm.logTime[1]
      };
      return searchParams;
    },
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        this.search();
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$emit("rest", this.convertSearchParams());
    },
    search() {
      this.$emit("search", this.convertSearchParams());
    }
  }
};
</script>
<style lang="scss" scoped>
.ctrl-buttons {
  display: flex;
  justify-content: flex-end;
  padding-bottom: 10px;
}
</style>
