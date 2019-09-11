<template>
  <div class="wrapper">
    <el-row :gutter="40">
      <el-col :span="12">
        <!-- <el-table
                ref="dataTableAll"
                :height="300"
                v-loading="isAllListLoading"
                stripe
                highlight-current-row
                :data="tableDataAll"
                @row-dblclick="chartDetail"
                @current-change="chartDetail"
              > -->
        <el-table ref="dataTableAll" max-height="285" :data="customerData">
          <el-table-column prop="serviceType" label="业务分类">
            <template slot-scope="scope">
              <span>{{ scope.row.serviceType == 3 ? "配送" :  scope.row.serviceType == 4 ?"配装": scope.row.serviceType == 10000 ?"合计":"" }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="satisfyNum" label="满意评价"></el-table-column>
          <el-table-column prop="commonNum" label="一般评价"></el-table-column>
          <el-table-column
            prop="unSatisfyNum"
            label="不满意评价"
          ></el-table-column>
          <el-table-column
            prop="satisfyDegree"
            label="满意度"
          ></el-table-column>
        </el-table>
      </el-col>
      <el-col :span="12">
        <el-table :data="questionData" max-height="285" :cell-style="cellStyle">
          <el-table-column prop="question" label="项目"></el-table-column>
          <el-table-column
            prop="questionNum"
            label="不满统计"
          ></el-table-column>
          <el-table-column
            prop="questionDegree"
            label="问题占比"
          ></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import chartBar from "./chartBar";
export default {
  components: { chartBar },
  props: {
    customerData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    questionData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (row.question == "合计" || row.question == "总计") {
        return "background:#F5B366";
      } else if (!row.linkType) {
        return "background:#f1f387";
      } else {
        return "";
      }
    }
  },
  created() {},
  mounted() {
    this.$emit("initData");
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>
