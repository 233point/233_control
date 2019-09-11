<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-09 15:39:25
 * @LastEditTime: 2019-08-16 15:42:07
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <common-wrapper>
      <sys-search class="search" @search="queryList" @rest="rest" />
    </common-wrapper>

    <!-- 系统列表 -->
    <common-wrapper>
      <common-table :flex="230">
        <template slot="table">
          <a-list
            class="table_list"
            itemLayout="vertical"
            :dataSource="tableData"
            :loading="isListLoading"
            size="small"
            :locale="{ emptyText: '暂无数据' }"
          >
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a-list-item-meta>
                <div slot="description" class="des">
                  <div>
                    <span>商户类型:</span>
                    <span>{{ item.usertype == 0 ? "企业" : "个人" }}</span>
                  </div>
                  <div v-if="item.company">
                    <span>公司名称:</span>
                    <span>{{ item.company }}</span>
                  </div>
                  <div v-if="item.compBrif">
                    <span>公司简称:</span>
                    <span>{{ item.compBrif }}</span>
                  </div>
                  <div v-if="item.contact">
                    <span>联系人:</span>
                    <span>{{ item.contact }}</span>
                  </div>
                  <div>
                    <span>审核状态:</span>
                    <span>{{ item.approval ? item.approval : "暂无" }}</span>
                  </div>
                  <div v-if="item.city">
                    <span>城市:</span>
                    <span>{{ item.city }}</span>
                  </div>
                </div>
                <a slot="title" href="javascript:;">
                  {{ item.userType == 0 ? item.company : item.contact }}
                  <span>
                    <el-button
                      class="control_btn"
                      type="text"
                      @click.stop="showDetail(index, item)"
                    >
                      <a-icon
                        :type="item.showDetail ? 'eye-invisible' : 'eye'"
                      />
                    </el-button>
                    <el-button
                      v-if="item.approval && item.approval.trim() == '审核中'"
                      icon="el-icon-setting"
                      class="control_btn"
                      type="text"
                      @click.stop="showDetail(index, item)"
                    ></el-button>
                  </span>
                </a>
                <a-avatar
                  slot="avatar"
                  shape="square"
                  size="large"
                  :src="
                    item.logo ||
                      'http://xhe.oss-cn-hangzhou.aliyuncs.com/ims/2019-07-31/picOfID/50a0eecd3b2c41789a49594280331a47/证件照片.jpg'
                  "
                  @click="
                    showImg(
                      item.logo ||
                        'http://xhe.oss-cn-hangzhou.aliyuncs.com/ims/2019-07-31/picOfID/50a0eecd3b2c41789a49594280331a47/证件照片.jpg'
                    )
                  "
                />
              </a-list-item-meta>
              <div
                class="content_container"
                :class="item.showDetail ? 'active' : 'hidden'"
              >
                <div class="detail_container">
                  <el-divider content-position="left">
                    <h3>{{ item.userType == 0 ? "企业信息" : "个人信息" }}</h3>
                  </el-divider>
                  <div v-if="item.company">
                    <span>公司名称:</span>
                    <span>{{ item.company }}</span>
                  </div>
                  <div v-if="item.compBrif">
                    <span>公司简称:</span>
                    <span>{{ item.compBrif }}</span>
                  </div>
                  <div v-if="item.contact">
                    <span>联系人:</span>
                    <span>{{ item.contact }}</span>
                  </div>
                  <div v-if="item.phone">
                    <span>电话:</span>
                    <span>{{ item.phone }}</span>
                  </div>
                  <div v-if="item.address">
                    <span>地址:</span>
                    <span>{{ item.address }}</span>
                  </div>
                  <div v-if="item.mail">
                    <span>邮箱:</span>
                    <span>{{ item.mail }}</span>
                  </div>
                  <div v-if="item.unifiedSocialCCd">
                    <span>统一社会信用代码/营业执照注册号:</span>
                    <span>{{ item.unifiedSocialCCd }}</span>
                  </div>
                  <div v-if="item.numOfID">
                    <span>证件号码:</span>
                    <span>{{ item.numOfID }}</span>
                  </div>
                  <div v-if="item.businessLicensePic">
                    <span>营业执照扫描照片:</span>
                    <span>
                      <a
                        v-if="getFileType(item.businessLicensePic) == 'file'"
                        :href="item.businessLicensePic"
                        >证件照片</a
                      >
                      <img
                        v-else
                        :src="item.businessLicensePic"
                        alt=""
                        @click="showImg(item.businessLicensePic)"
                      />
                    </span>
                  </div>
                  <div v-if="item.picOfID">
                    <span>证件照片:</span>
                    <span>
                      <a
                        v-if="getFileType(item.picOfID) == 'file'"
                        :href="item.picOfID"
                        >证件照片</a
                      >
                      <img
                        v-else
                        :src="item.picOfID"
                        alt=""
                        @click="showImg(item.picOfID)"
                      />
                    </span>
                  </div>
                  <div v-if="item.city">
                    <span>城市:</span>
                    <span>{{ item.city }}</span>
                  </div>
                  <div v-if="item.managingGoods">
                    <span>经营货品:</span>
                    <span>{{ item.managingGoods }}</span>
                  </div>
                  <div v-if="item.haveFleet">
                    <span>是否有车队:</span>
                    <span>{{ item.haveFleet == "1" ? "是" : "否" }}</span>
                  </div>
                </div>
                <div
                  class="approval_container"
                  v-if="item.approvalList && item.approvalList.length > 0"
                >
                  <el-divider content-position="left">
                    <h3>审批日志</h3>
                  </el-divider>
                  <div style="margin:1rem 0">
                    <span><b>当前状态:</b></span>
                    <span
                      ><b>{{ item.approval ? item.approval : "暂无" }}</b></span
                    >
                  </div>
                  <el-row
                    class="check"
                    v-if="item.approval && item.approval.trim() == '审核中'"
                  >
                    <el-col style="margin:1rem 0 0 0 " :span="24">
                      <el-input
                        v-model="ensureInfo.remark"
                        type="textarea"
                        maxlength="200"
                        placeholder="请输入您的审核意见,最长200字符"
                      ></el-input>
                    </el-col>
                    <el-col style="margin:1rem 0 " :span="24">
                      <el-button type="primary" @click="check(item, 'yes')"
                        >审核通过</el-button
                      >
                      <el-button type="warning" @click="check(item, 'no')"
                        >审核不通过</el-button
                      >
                      <el-button @click="checkCancel(index, item)"
                        >取消</el-button
                      >
                    </el-col>
                  </el-row>

                  <a-timeline :reverse="true">
                    <a-timeline-item
                      v-for="(log, index) in item.approvalList"
                      :key="index"
                    >
                      <p class="time">{{ timeFormatter(log.date) }}</p>
                      <p class="content">{{ log.result }}:{{ log.details }}</p>
                    </a-timeline-item>
                  </a-timeline>
                </div>
              </div>
            </a-list-item>
          </a-list>
        </template>
        <template slot="pagination">
          <el-pagination
            background
            layout="total, prev, pager, next"
            :current-page.sync="pagination.pageNum"
            :page-size="pagination.pageSize"
            :total="pagination.total"
            @current-change="changePage"
          ></el-pagination>
        </template>
      </common-table>
    </common-wrapper>

    <ensure-check
      :show.sync="isCheckFormVisible"
      :checkInfo="checkInfo"
      @updateTable="queryList"
    />
    <el-dialog :visible.sync="showImgDialog" width="700px" append-to-body>
      <img :src="imgUrl" class="dialogImg" />
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
// 全局混入
import { mixins } from "@/mixins";
// 自定义组件
import NavButton from "@/components/navButton";
import NavPremissonButton from "@/components/navButton/navPremissonButton";
import CommonWrapper from "@/components/commonWrapper";
import CommonTable from "@/components/commonTable";
import SysSearch from "./Components/Search";
import EnsureCheck from "./Components/check";
import { merchantList, merchantDel, merchantApprove } from "@/api/user";

export default {
  name: "SystemInfo",
  mixins: [mixins],
  data() {
    return {
      tableData: [],
      editRole: {}, // 需要编辑的角色对象
      isShowRoleDialog: false, // 新增/编辑窗口打开状态
      isListLoading: false, // 列表加载
      isCreate: true, // 编辑窗口展示新增or编辑
      pagination: {
        // 翻页数据
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      ensureInfo: {
        remark: ""
      },
      isCheckFormVisible: false,
      checkInfo: {},
      showImgDialog: false,
      imgUrl: ""
    };
  },
  activated() {
    this.$refs.roleTable.doLayout();
  },
  mounted() {},
  methods: {
    // 查询和初始化查询
    // 查询/翻页公用方法
    queryList(params) {
      const searchParams = (this.searchParams = params);
      this.getRoles({
        ...searchParams,
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize
      });
    },
    getFileType(url) {
      let oFileType = url.substring(url.lastIndexOf(".") + 1, url.length);
      if (oFileType == "doc" || oFileType == "pdf" || oFileType == "docx") {
        return "file";
      }
      return "";
    },
    isButtonIsDisabled() {
      return !!this.selectRow.length;
    },
    // 获取列表
    getRoles(params) {
      this.isListLoading = true;
      merchantList(params).then(res => {
        if (!res.error) {
          res.content.map(item => {
            item.showDetail = false;
          });
          this.tableData = res.content;
          this.pagination.total = res.totalElements;
          this.isListLoading = false;
        }
      });
    },
    showDetail(index, row) {
      this.tableData[index].showDetail = !this.tableData[index].showDetail;
      this.ensureInfo.remark = "";
    },
    // 显示编辑界面
    handleEdit(index, row) {
      this.isCreate = false;
      this.editRole = row;
      this.isShowRoleDialog = true;
    },
    // 显示新增界面
    handleAdd() {
      this.isCreate = true;
      this.isShowRoleDialog = true;
    },
    handleAudit(index, row) {
      this.isCheckFormVisible = true;
      this.checkInfo = row;
    },
    // 单行删除
    handleDel(index, row) {
      this.$confirm("确认删除该商户吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.deleteRoles(row.id);
        })
        .catch(() => {});
    },
    // 删除接口方法
    deleteRoles(roleIds) {
      return merchantDel(roleIds).then(res => {
        if (!res.error) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.queryList(this.searchParams);
        }
      });
    },
    // 列表翻页
    changePage(pageNum) {
      this.pagination.pageNum = pageNum;
      this.queryList(this.searchParams);
    },
    // 生成列表序号
    indexMethod(index) {
      return (
        index + 1 + (this.pagination.pageNum - 1) * this.pagination.pageSize
      );
    },
    // 列表状态显示格式化
    formatStatus(row) {
      return row.sys_enable === 1
        ? "启用"
        : row.sys_enable === 0
        ? "禁用"
        : "未知";
    },
    // 列表日期格式化
    formatCreateDate(row) {
      return moment(row.roleCreateTime).format("YYYY-MM-DD");
    },
    rest(params) {
      const searchParams = (this.searchParams = params);
      this.getRoles({
        ...searchParams,
        pageNum: 1,
        pageSize: this.pagination.pageSize
      });
    },
    timeFormatter(time) {
      if (time) {
        return moment(time).format("YYYY-MM-DD HH:mm:ss");
      } else {
        return "";
      }
    },
    showImg(url) {
      this.showImgDialog = true;
      this.imgUrl = url;
    },
    checkCancel(index, item) {
      this.ensureInfo.remark = "";
      this.showDetail(index, item);
    },
    check(item, result) {
      let params = {
        id: item.id,
        remark: this.ensureInfo.remark,
        result: result
      };
      merchantApprove(params).then(res => {
        if (!res.error) {
          this.$message({
            message: "审核完成",
            type: "success"
          });
          this.queryList(this.searchParams);
          this.pagination.pageNum = 1;
        }
      });
    }
  },
  components: {
    NavButton,
    NavPremissonButton,
    CommonWrapper,
    CommonTable,
    SysSearch,
    EnsureCheck
  }
};
</script>

<style lang="scss" scoped>
.table_list {
  height: 100%;
  width: 100%;
  overflow: auto;
  border-top: 2px solid transparent;
  .control_btn {
    float: right;
    font-size: 20px;
    padding: 0 1rem;
  }
  .des {
    display: flex;
    div {
      margin-right: 1.5rem;
      span:nth-child(1) {
        color: rgba(0, 0, 0, 0.75) !important;
        word-break: keep-all;
      }
    }
  }
}
.content_container {
  transition: all 0.3s linear;
  display: flex;
  img {
    max-width: 400px;
  }
  h3 {
    margin-bottom: 1rem;
  }
  .detail_container {
    padding: 1rem 5rem;
    min-width: 50%;
    div {
      span:nth-child(1) {
        display: inline-block;
        width: 220px;
        text-align: right;
        font-weight: 450;
      }
      span:nth-child(2) {
        padding-left: 5px;
      }
    }
  }
  .approval_container {
    padding: 1rem 5rem;
    border-left: 1px solid #dcdcdc;
    .check {
      margin: 1rem 0;
    }
  }
}
.content_container.active {
  height: auto;
  max-height: 2000px;
  overflow: auto;
}
.content_container.hidden {
  height: 0;
  max-height: 0px;
  overflow: hidden;
  display: none;
}
.dialogImg {
  width: 650px;
}
</style>
