<template>
  <el-dialog
    width="400px"
    :title="(isCreate ? '新建' : '编辑') + '字典管理'"
    :visible.sync="isVisible"
    @close="cancel"
  >
    <div class="org-form">
      <el-form
        :inline="true"
        ref="dicForm"
        :model="dicForm"
        :rules="dicFormRules"
        :disabled="isFormDisabled"
        label-width="120px"
      >
        <el-row>
          <el-col v-if="!isCreate" :span="24">
            <el-form-item label="字典ID" prop="dicUuid">
              <el-input disabled v-model="dicForm.dicUuid" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="字典编码" prop="dicNumber">
              <el-input v-model="dicForm.dicNumber" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="字典中文名称" prop="dicName">
              <el-input v-model="dicForm.dicName" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="父节点" prop="dicPname">
              <el-input v-model="dicForm.dicPname" :readonly="true" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
                    <el-col :span="12">
                        <el-form-item label="显示顺序" prop="orgSortIndex">
                            <el-input v-entity="dicForm.orgSortIndex" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="状态" prop="orgEnabled">
                            <el-radio-group v-entity="dicForm.orgEnabled" >
                                <el-radio :label="1">启用</el-radio>
                                <el-radio :label="0">禁用</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="机构描述" prop="orgDesc" style="width:100%">
                            <el-input type="textarea"
                                style="width:495px"
                                v-entity="dicForm.orgDesc"
                                :rows="5"
                                placeholder="填写机构描述"
                            />
                        </el-form-item>
                    </el-col>
                </el-row> -->
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
 * Dic Detail Component
 * ----------------------
 * Author: Calamus
 * Date: 2018.09.03
 */
import Validator from "@/utils/extendValidate/extendValidate";
// api
import { getDicDetail, createDicNode, updateDicNode } from "@/api/systemparams";

// init Form Data
const initFormState = {
  dicName: "",
  dicUuid: "",
  dicNumber: "",
  dicPid: "",
  dicPname: ""
};

export default {
  name: "DicUpdate",
  data() {
    return {
      showDetailMode: true,
      isVisible: false,
      isFormDisabled: false,
      dicForm: Object.assign({}, initFormState),
      dicFormRules: {
        dicName: [
          { required: true, message: "请填写字典中文名称", trigger: "change" },
          { max: 30, message: "最大长度为30字符", trigger: "change" }
        ],
        dicNumber: [
          { required: true, message: "请填写字典编号", trigger: "change" },
          { max: 30, message: "最大长度为30字符", trigger: "change" }
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
        this.dicForm = Object.assign({}, initFormState);
        this.dicForm.dicPname = this.nodeData.name;
        this.dicForm.dicPid = this.nodeData.id;
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
        dicUuid: this.nodeData.id
      };
      getDicDetail(params).then(res => {
        this.dicForm = Object.assign({}, res);
      });
    },
    save() {
      this.$refs.dicForm.validate(isValid => {
        if (isValid) {
          const submitType = this.isCreate ? createDicNode : updateDicNode;
          const submitText = this.isCreate ? "新建" : "修改";
          submitType(this.dicForm).then(res => {
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
      this.dicForm = Object.assign({}, initFormState);
      this.$refs.dicForm.resetFields();
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
    border: 1px solid $base-light-color;
    border-radius: 8px;
  }
}
</style>
