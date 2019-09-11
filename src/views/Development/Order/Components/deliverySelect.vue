<!--
 * @Description: In User Settings Edit
 * @Author: Calamus
 * @Date: 2019-08-05 18:14:40
 * @LastEditTime: 2019-08-26 10:11:11
 * @LastEditors: Please set LastEditors
 -->
<template>
  <el-dialog
    width="600px"
    title="选择历史提货信息"
    v-if="isVisible"
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="cancel"
    :modal="false"
    center
  >
    <el-table
      ref="userInfoList"
      stripe
      tooltip-effect="light"
      v-loading="isListLoading"
      :data="deliverInfoList"
      highlight-current-row
      max-height="400px"
      @current-change="handleCurrentChange"
    >
      <el-table-column label="选择" width="70" center>
        <template slot-scope="scope">
          <el-radio
            class="radio"
            v-model="radio"
            :label="scope.$index"
            @change.native="getCurrentRow(scope.$index)"
            >&nbsp;</el-radio
          >
        </template>
      </el-table-column>
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <!-- <el-table-column prop="deliveryPointName"
                           label="提货点名称"
                           width="135"
                           :show-overflow-tooltip="true"></el-table-column> -->
      <el-table-column
        prop="contactUser"
        sortable
        label="提货联系人"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="contactPhone"
        label="提货联系电话"
        width="120"
        :show-tooltip-when-overflow="true"
      ></el-table-column>
      <el-table-column
        prop="fullAddress"
        label="提货点地址"
        :show-overflow-tooltip="true"
      ></el-table-column>
    </el-table>
    <el-row style="margin-top:10px">
      <el-col :span="24" class="flex-right">
        <el-button type="primary" @click="save()">提交</el-button>
        <el-button @click="cancel()">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import CommonTable from "@/components/commonTable";
import { getListNoPage } from "@/api/order";

export default {
  name: "SelectUserInfo",
  data() {
    return {
      isVisible: false,
      isListLoading: false,
      selectRow: [],
      tableData: [],
      pagination: {
        // 翻页数据
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      searchParams: {}, // 查询参数
      currentRow: null,
      radio: false,
      deliverInfoList: []
    };
  },
  props: {
    show: {
      type: Boolean
    },
    merchantId: {
      type: String
    }
  },
  mounted() {},
  watch: {
    show(isShow) {
      this.isVisible = isShow;
      if (isShow) {
        this.getDeliverList();
      }
    }
  },
  methods: {
    getDeliverList() {
      getListNoPage({ merchantId: this.merchantId }).then(res => {
        if (!res.error) {
          this.deliverInfoList = res;
        }
      });
    },
    elevatorFormatter(row) {
      if (row.isElevator != null || row.isElevator != undefined) {
        return row.isElevator == "0" ? "有" : row.isElevator == "1" ? "无" : "";
      }
    },
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    getCurrentRow(index) {
      console.log(index);
      // this.save();
    },
    save() {
      if (!this.currentRow) {
        this.$message({
          type: "warning",
          message: "请选择需要填充的提货点信息"
        });
        return;
      }
      this.$emit("sendData", this.currentRow);
      this.cancel();
    },
    cancel() {
      this.$emit("update:show", false);
      this.$refs.userInfoList.clearSelection();
      this.currentRow = null;
      this.radio = false;
      this.isVisible = false;
    }
  },
  components: {
    CommonTable
  }
};
</script>

<style scoped></style>
