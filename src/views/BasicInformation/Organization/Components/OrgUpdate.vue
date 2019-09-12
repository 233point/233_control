<template>
  <el-dialog
    width="670px"
    :title="(isCreate ? '新建' : '编辑') + '组织机构'"
    :visible.sync="isVisible"
    @close="cancel"
  >
    <div class="org-form">
      <el-form
        :inline="true"
        ref="orgForm"
        :model="orgForm"
        :rules="orgFormRules"
        :disabled="isFormDisabled"
        label-width="100px"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构全称" prop="orgName">
              <el-input v-model="orgForm.orgName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构简称" prop="orgShortName">
              <el-input v-model="orgForm.orgShortName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="机构类型" prop="orgType">
              <el-select v-model="orgForm.orgType" style="width:178px">
                <el-option
                  v-for="(org, index) in organization"
                  :key="index"
                  :value="org.orgType"
                  :label="org.orgTypeName"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级机构" prop="orgParentName">
              <el-input v-model="orgForm.orgParentName" :readonly="true" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="显示顺序" prop="orgSortIndex">
              <el-input v-model="orgForm.orgSortIndex" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="orgEnabled">
              <el-radio-group v-model="orgForm.orgEnabled">
                <el-radio :label="1">启用</el-radio>
                <el-radio :label="0">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="机构描述" prop="orgDesc" style="width:100%">
              <el-input
                type="textarea"
                style="width:495px"
                v-model="orgForm.orgDesc"
                :rows="5"
                placeholder="填写机构描述"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="flex-right">
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="cancel">取消</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </el-dialog>
</template>
<script>
/**
 * Organization Detail Add/Edit Component
 * ----------------------
 * Author: zhou qi
 * Date: 2018.03.20
 */
import Validator from "@/utils/extendValidate/extendValidate";
// api
import { getOrgList } from "@/api/common";
import { createOrgNode, getOrgDetail, updateOrgNode } from "@/api/organization";

// init Form Data
const initFormState = {
  orgName: "",
  orgShortName: "",
  orgType: "",
  orgParentName: "",
  orgParentUuid: "",
  orgSortIndex: "1",
  orgEnabled: 1,
  orgDesc: ""
};

export default {
  name: "OrgUpdate",
  data() {
    return {
      showDetailMode: true,
      isVisible: false,
      isFormDisabled: false,
      organization: [],
      orgForm: Object.assign({}, initFormState),
      orgFormRules: {
        orgName: [
          { required: true, message: "请填写机构名称", trigger: "blur" },
          { max: 30, message: "最大长度为30字符", trigger: "blur" }
        ],
        orgShortName: [
          { required: true, message: "请填写机构简称", trigger: "blur" },
          { max: 30, message: "最大长度为30字符", trigger: "blur" }
        ],
        orgType: [
          { required: true, message: "请选择机构类型", trigger: "blur" }
        ],
        orgSortIndex: [
          { required: true, message: "请输入顺序号", trigger: "blur" },
          { validator: Validator.strNumber, trigger: "blur" },
          { max: 3, message: "不能超过3位数字", trigger: "blur" }
        ]
      }
    };
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    nodeData: {
      type: Object,
      required: true
    },
    isCreate: {
      type: Boolean,
      required: true
    }
  },
  mounted() {},
  watch: {
    show(isShow) {
      if (isShow) {
        getOrgList().then(res => {
          this.organization = res.item;
        });
        // 新建
        if (this.isCreate) {
          this.setToCreateState();
          // 编辑
        } else {
          this.setToEditState();
        }
      }

      // 设置窗口显示状态
      this.isVisible = isShow;
    }
  },
  methods: {
    setToCreateState() {
      const parentNode = this.nodeData;
      if (parentNode) {
        this.orgForm = Object.assign({}, initFormState);
        this.orgForm.orgParentName = this.nodeData.name;
        this.orgForm.orgParentUuid = this.nodeData.id;
      } else {
        this.$message({
          message: "未找到父节点,无法在此情况下创建组织结构.",
          type: "error"
        });
        this.isFormDisabled = true;
      }
    },
    setToEditState() {
      const params = {
        orgUuid: this.nodeData.id
      };
      getOrgDetail(params).then(res => {
        this.orgForm = Object.assign({}, res);
      });
    },
    save() {
      this.$refs.orgForm.validate(isValid => {
        if (isValid) {
          const submitType = this.isCreate ? createOrgNode : updateOrgNode;
          const submitText = this.isCreate ? "新建" : "修改";
          submitType(this.orgForm).then(res => {
            if (!res.error) {
              this.$message({
                message: `${submitText}成功!`,
                type: "success"
              });
              // 重新读取tree
              this.$emit("updateTree");
              this.cancel();
            }
          });
        }
      });
    },
    cancel() {
      this.isVisible = false;
      this.$emit("update:show", false);
      this.orgForm = Object.assign({}, initFormState);
      this.$refs.orgForm.resetFields();
    }
  }
};
</script>
<style lang="scss" scoped>
.org-content {
  display: flex;
  flex-direction: column;
  align-items: center;

  .org-form {
    width: 80%;
    max-width: 1000px;
    min-width: 600px;
    margin: 10px;
    padding: 10px;
    border: 1px solid #f2f2f2;
    border-radius: 8px;
  }
}
</style>
