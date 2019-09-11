<template>
  <div class="merchants_config">
    <common-content :flex="110">
      <el-form :model="searchForm" ref="searchForm" :inline="true">
        <el-form-item label="商户名称" prop="company">
          <el-input
            v-model="searchForm.company"
            maxlength="200"
            placeholder="请输入商户名称"
            clearable
            filterable
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="getAllProjectList"
            >查询</el-button
          >
        </el-form-item>
      </el-form>

      <div style="margin: 15px 0;"></div>
      <el-row>
        <el-col :span="18">
          <p class="check_title">全部商户</p>
          <el-checkbox-group v-model="checkedProjects" v-loading="itemsLoading">
            <el-col v-for="item in projectList" :key="item.id" :span="6">
              <el-checkbox :label="item.id">
                <el-tooltip effect="light" placement="top-start">
                  <div slot="content">
                    <div class="item_tootip">
                      {{ item.account }}:{{ item.company }}
                    </div>
                  </div>
                  <el-button>{{ item.account }}:{{ item.company }}</el-button>
                </el-tooltip>
                <!-- <el-tooltip :content="item.name" placement="top" effect="light">{{item.name}}</el-tooltip> -->
              </el-checkbox>
            </el-col>
          </el-checkbox-group>
          <el-pagination
            small
            layout="total, prev, pager, next"
            :current-page.sync="pagination.pageNum"
            :page-size="pagination.pageSize"
            :total="pagination.total"
            @current-change="changePage"
          ></el-pagination>
        </el-col>
        <el-col :span="1">
          <el-divider direction="vertical"></el-divider>
        </el-col>
        <el-col :span="5">
          <p class="check_title">已选中商户</p>
          <el-checkbox-group v-model="checkedProjects" v-loading="itemsLoading">
            <el-col v-for="item in checkedList" :key="item.id" :span="24">
              <el-checkbox :label="item.id">
                <!-- <el-popover placement="top-start" width="400" trigger="hover">
                <el-table tooltip-effect="light" :data="[...item]" height="90">
                  <el-table-column
                    prop="cupboardCode"
                    label="橱柜"
                    min-width="90"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="wardrobeCode"
                    label="衣柜"
                    min-width="90"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="bathroomCode"
                    label="卫浴"
                    min-width="90"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="doorCode"
                    label="木门"
                    min-width="90"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="city"
                    label="地级市"
                    min-width="90"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="brand"
                    label="经营品牌"
                    min-width="150"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="marketType"
                    label="商场类型"
                    min-width="100"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="level"
                    label="级别"
                    min-width="60"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                  <el-table-column
                    prop="contacts"
                    label="联系人"
                    min-width="90"
                    :show-overflow-tooltip="true"
                  ></el-table-column>
                </el-table>
                <el-button slot="reference">{{ item.marketName }}</el-button>
              </el-popover> -->
                <el-tooltip effect="light" placement="top-start">
                  <div slot="content">
                    <div class="item_tootip">
                      {{ item.account }}:{{ item.company }}
                    </div>
                  </div>
                  <el-button>{{ item.account }}:{{ item.company }}</el-button>
                </el-tooltip>
              </el-checkbox>
            </el-col>
          </el-checkbox-group>
        </el-col>
      </el-row>

      <el-row class="dialog-footer">
        <el-col :span="24">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </el-col>
      </el-row>
    </common-content>
  </div>
</template>

<script>
import { merchantList, setUserMerchants } from "@/api/user";
import { uniqueArray } from "@/utils/utilFun";
import { mapGetters } from "vuex";
import CommonContent from "@/components/commonContent";

export default {
  name: "",
  components: { CommonContent },
  data() {
    return {
      checkAll: false,
      checkedProjects: [],
      checkedList: [],
      isIndeterminate: true,
      projectOptions: [],
      projectList: [], //所有商场
      searchForm: {
        company: "" //search
      },
      itemsLoading: true,
      pagination: {
        // 翻页数据
        pageNum: 1,
        pageSize: 20,
        total: 0
      },
      maxPageSize: 20
    };
  },
  computed: {
    ...mapGetters(["userId"])
  },
  mounted() {
    console.log("userUuid", this.userId);
    this.getAllProjectList();
    this.getHasProjects();
    this.projectList.forEach(item => {
      this.projectOptions.push(item.id);
    });
  },
  watch: {
    checkedProjects: {
      handler: function(newVal, oldVal) {
        if (newVal.length > 0 && newVal.length >= oldVal.length) {
          //增加了
          let item = this.projectList.filter(item => {
            return item.id == newVal[newVal.length - 1];
          });
          this.checkedList = uniqueArray(this.checkedList.concat(item));
        } else {
          //删除了
          this.checkedList = uniqueArray(
            this.checkedList.filter(item => {
              return newVal.indexOf(item.id) >= 0;
            })
          );
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    async getAllProjectList() {
      this.itemsLoading = true;
      await merchantList({
        company: this.searchForm.company,
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      }).then(res => {
        if (!res.error) {
          this.projectList = res.content;
          this.pagination.total = res.totalElements;
          this.maxPageSize = res.totalElements;
          this.itemsLoading = false;
        }
      });
    },
    // 列表翻页
    changePage(pageNum) {
      this.pagination.pageNum = pageNum;
      this.getAllProjectList();
    },
    handleCheckAllChange(val) {
      this.checkedProjects = val ? this.projectOptions : [];
      this.isIndeterminate = false;
    },
    cancel() {
      this.$router.push("/dash");
      this.searchForm.company = "";
      this.checkedProjects = [];
      this.checkedList = [];
      this.projectOptions = [];
      this.projectList = [];
      this.pagination.pageNum = 1;
    },
    save() {
      let params = this.checkedProjects;
      setUserMerchants(params).then(res => {
        if (!res.error) {
          this.$message({
            message: "绑定商户成功!",
            type: "success"
          });
          this.$emit("updateProjects");
          this.cancel();
        }
      });
    },
    async getHasProjects() {
      this.itemsLoading = true;
      await merchantList({
        assemblyManagerId: this.userId,
        pageNum: this.pagination.pageNum,
        pageSize: this.maxPageSize
      }).then(res => {
        if (!res.error) {
          this.checkedProjects = [];
          this.checkedList = uniqueArray(res.content.concat([]));
          res.content.map(item => {
            this.checkedProjects.push(item.id);
          });
          this.itemsLoading = false;
        }
      });
    }
  }
};
</script>
<style scoped>
.merchants_config {
  width: 90% !important;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.15);
  padding: 25px 15px 0 15px;
}
.el-checkbox-group {
  height: 200px;
  overflow-y: auto !important;
}
.check_title {
  color: #304156;
}
.el-col-6,
.el-col-24 {
  margin-bottom: 10px;
}
.el-checkbox {
  display: flex;
  align-items: center;
}
.el-checkbox > span:last-child {
  display: inline-block;
  width: calc(100% - 14px);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.el-checkbox > span:last-child button {
  width: calc(100% - 15px);
  overflow: hidden;
  text-overflow: ellipsis;
}
.el-divider--vertical {
  height: 240px !important;
}
</style>
