<template>
  <div class="user-info">
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="自有司机: ">
        <el-switch v-model="form.hasDrivers"></el-switch>
      </el-form-item>
      <el-form-item label="司机列表: ">
        <el-table :data="tableData" highlight-current-row>
          <el-table-column property="name" label="姓名">
            <template slot-scope="scope">
              <el-input
                v-if="scope.row.editable"
                v-model="scope.row.name"
              ></el-input>
              <span v-else>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column property="phone" label="电话">
            <template slot-scope="scope">
              <el-input
                v-if="scope.row.editable"
                v-model="scope.row.phone"
              ></el-input>
              <span v-else>{{ scope.row.phone }}</span>
            </template>
          </el-table-column>
          <el-table-column property="cars" label="车辆">
            <template slot-scope="scope">
              <el-input
                v-if="scope.row.editable"
                v-model="scope.row.cars"
              ></el-input>
              <span v-else>{{ scope.row.cars }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot="header" slot-scope="scope">
              <el-button
                size="small"
                :disabled="addBtnDisabled"
                @click="addDrivers"
                >添加司机</el-button
              >
            </template>
            <template slot-scope="scope">
              <div v-if="scope.row.editable">
                <el-button
                  size="mini"
                  type="text"
                  @click="addSubmit(scope.$index, scope.row)"
                  >确定</el-button
                >
                <el-button
                  size="mini"
                  type="text"
                  @click="cancelAdd(scope.$index, scope.row)"
                  >取消</el-button
                >
              </div>
              <div v-else>
                <el-button
                  size="mini"
                  type="text"
                  @click="edit(scope.$index, scope.row)"
                  >编辑</el-button
                >
                <el-button
                  size="mini"
                  type="text"
                  @click="del(scope.$index, scope.row)"
                  >删除</el-button
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { driversDel } from "@/api/user";

export default {
  name: "DriverConfig",
  data() {
    return {
      form: {
        hasDrivers: true
      },
      tableData: [],
      addBtnDisabled: false
    };
  },
  computed: {
    ...mapGetters(["userAccount", "userName"])
  },
  mounted() {
    this.queryList();
  },
  methods: {
    queryList() {},
    addDrivers() {
      this.addBtnDisabled = true;
      let params = {
        id: "",
        phone: "",
        name: "",
        cars: "",
        editable: true
      };
      this.tableData.unshift(params);
    },
    addSubmit(index, row) {
      this.addBtnDisabled = false;
      this.tableData[index].editable = false;
    },
    cancelAdd(index, row) {
      this.tableData.splice(index, 1);
      this.addBtnDisabled = false;
    },
    edit(index, row) {
      this.tableData[index].editable = true;
    },
    del(index, row) {
      this.$confirm("确认删除该司机吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          let params = {
            id: row.id
          };
          driversDel(params).then(res => {
            if (!res.error) {
              this.$message({
                message: "删除成功",
                type: "success"
              });
              this.queryList();
            }
          });
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped></style>
