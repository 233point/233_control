<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-19 11:33:01
 * @LastEditTime: 2019-09-04 14:07:52
 * @LastEditors: Please set LastEditors
 -->
<template>
  <common-content class="mercure_template" :flex="100" style="padding:2rem">
    <div>
      <el-form
        v-loading="isCustomerListLoading"
        ref="form"
        :model="{ customerQuestionList: customerQuestionList }"
        :rules="formRules"
        label-width="20px"
        size="small"
      >
        <el-row>
          <el-col :span="7">
            <el-form-item label="客户姓名" label-width="120px">
              <span>{{ form.customerName }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="客户电话" label-width="120px">
              <span>{{ form.customerPhone }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row
          v-for="(type, index1) in DeallinkTypeList"
          :key="index1"
          :class="type.value == 12 ? 'comments_detail' : 'default'"
        >
          <el-col :span="24">
            <el-row>
              <el-col :span="2" style="color:#f56c6c" class="linkType__label">{{
                type.label
              }}</el-col>
              <el-col
                :span="22"
                v-if="customerQuestionList && customerQuestionList.length > 0"
              >
                <el-row
                  v-for="(item, index) in customerQuestionList"
                  :key="index"
                >
                  <el-col
                    :span="24"
                    v-if="
                      item.linkType != undefined && item.linkType == type.value
                    "
                  >
                    <el-form-item>
                      <el-row>
                        <el-col :span="24">
                          <span>{{ item.question }}</span>
                        </el-col>
                      </el-row>
                    </el-form-item>
                    <el-form-item
                      v-if="item.answerType == 'radio'"
                      :prop="
                        'customerQuestionList.' + index + '.evaluationAnwser'
                      "
                      :rules="
                        item.joinCalculation == '0' ? formRules.check : []
                      "
                    >
                      <el-row v-if="item.answer && item.answer.length > 0">
                        <el-radio-group
                          v-model="item.evaluationAnwser"
                          @change="changeParents(item, index)"
                        >
                          <el-radio
                            :disabled="!isEdit"
                            v-for="(answer, aIndex) in item.answer"
                            :key="aIndex"
                            :value="answer"
                            :label="answer"
                          />
                        </el-radio-group>
                      </el-row>
                    </el-form-item>
                    <el-form-item
                      v-if="item.answerType == 'checkbox'"
                      :prop="
                        'customerQuestionList.' + index + '.evaluationAnwser'
                      "
                      :rules="
                        item.joinCalculation == '0' ? formRules.check : []
                      "
                    >
                      <el-row v-if="item.answer && item.answer.length > 0">
                        <el-checkbox-group
                          @change="changeParents(item, index)"
                          v-model="item.evaluationAnwser"
                          class="w100p"
                          clearable
                          filterable
                          placeholder="请选择答案"
                        >
                          <el-checkbox
                            :disabled="!isEdit"
                            v-for="(answer, answerIndex) in item.answer"
                            :key="answerIndex"
                            :label="answer"
                            :value="answer"
                          />
                        </el-checkbox-group>
                      </el-row>
                    </el-form-item>
                    <el-form-item
                      v-else-if="item.answerType == 'input'"
                      :prop="
                        'customerQuestionList.' + index + '.evaluationAnwser'
                      "
                      :rules="
                        item.joinCalculation == '0' ? formRules.check : []
                      "
                    >
                      <span v-if="!isEdit">{{ item.evaluationAnwser }}</span>
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: type.value == 12 ? 4 : 1 }"
                        :maxlength="200"
                        v-else
                        v-model="item.evaluationAnwser"
                        placeholder="请输入答案"
                      ></el-input>
                    </el-form-item>
                    <el-form-item
                      v-else-if="item.answerType == 'star'"
                      :prop="
                        'customerQuestionList.' + index + '.evaluationAnwser'
                      "
                    >
                      <span v-if="!isEdit">{{ item.evaluationAnwser }}</span>
                      <el-rate
                        v-else
                        v-model="item.evaluationAnwser"
                        :max="10"
                        :colors="colors"
                      >
                      </el-rate>
                    </el-form-item>
                  </el-col>
                  <el-col
                    :span="24"
                    v-if="
                      item.linkType != undefined &&
                        item.linkType == type.value &&
                        item.children &&
                        item.children.length > 0
                    "
                    class="child_question_container"
                  >
                    <div v-for="(child, index2) in item.children" :key="index2">
                      <div
                        v-if="
                          item.evaluationAnwser &&
                            includesAnswers(
                              child.parentAnswers,
                              item.evaluationAnwser,
                              item.answerType
                            )
                        "
                        class="child_question_item"
                      >
                        <el-form-item label>
                          <el-row>
                            <el-col :span="24">
                              <span>{{ child.question }}</span>
                            </el-col>
                          </el-row>
                        </el-form-item>
                        <el-form-item v-if="child.answerType == 'radio'">
                          <el-row
                            v-if="child.answer && child.answer.length > 0"
                          >
                            <el-radio-group v-model="child.evaluationAnwser">
                              <el-radio
                                :disabled="!isEdit"
                                v-for="(answer, aIndex) in child.answer"
                                :key="aIndex"
                                :value="answer"
                                :label="answer"
                                @click.native.prevent="clickitem(answer,index,index2)"
                              />
                            </el-radio-group>
                          </el-row>
                        </el-form-item>
                        <el-form-item v-if="child.answerType == 'checkbox'">
                          <el-row
                            v-if="child.answer && child.answer.length > 0"
                          >
                            <el-checkbox-group
                              v-model="child.evaluationAnwser"
                              class="w100p"
                              clearable
                              filterable
                              placeholder="请选择答案"
                            >
                              <el-checkbox
                                :disabled="!isEdit"
                                v-for="(answer, answerIndex) in child.answer"
                                :key="answerIndex"
                                :label="answer"
                                :value="answer"
                              />
                            </el-checkbox-group>
                          </el-row>
                        </el-form-item>
                        <el-form-item v-if="child.answerType == 'input'">
                          <span v-if="!isEdit">{{
                            child.evaluationAnwser
                          }}</span>
                          <el-input
                            v-else
                            type="textarea"
                            :autosize="{ minRows: 1, maxRows: 1 }"
                            resize="none"
                            :maxlength="200"
                            v-model="child.evaluationAnwser"
                            placeholder="请输入答案"
                          ></el-input>
                        </el-form-item>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- 失败 -->
    <document-fail
      :show.sync="isFailVisible"
      :waybillTypeList="waybillTypeList"
      :reasonFailList="reasonFailList"
      :queryInfo.sync="queryInfo"
      @updateList="updateFailStatus"
    />
    <span class="dialog-footer">
      <el-button type="primary" @click="save()">提交</el-button>
      <el-button @click="cancel()">取消</el-button>
    </span>
  </common-content>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import NavButton from "@/components/navButton";
import CommonWrapper from "@/components/commonWrapper";
import CommonContent from "@/components/commonContent";
import CommonTable from "@/components/commonTable";
import { setSession, getSession } from "@/utils/session";
import {
  getEvaluationList,
  getEvaluationDetail,
  editEvaluation,
  getQuestionCMList
} from "@/api/evaluate";
import DocumentFail from "./fail";
import { generateTree, disGenerateTree } from "@/utils/generateTree";
import { contains } from "@/utils/includes";

export default {
  name: "CustomerQuery",
  components: {
    VuePerfectScrollbar,
    NavButton,
    CommonWrapper,
    CommonContent,
    CommonTable,
    DocumentFail
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false
    },
    queryInfo: {
      type: Object
    },
    show: {
      type: Boolean,
      default: false
    },
    waybillTypeList: {
      type: Array
    },
    linkTypeList: {
      type: Array
    },
    reasonFailList: {
      type: Array
    }
  },
  computed: {
    DeallinkTypeList() {
      let waybillType = this.from.orderType == '0' ? '2' : '1';
      return this.linkTypeList.filter(item => {
        return item.type != waybillType;
      });
    }
  },
  data() {
    return {
      isVisible: false,
      isFailVisible: false,
      customerQuestionList: [],
      isCustomerListLoading: true,
      colors: {
        6: "#99A9BF",
        7: { value: "#F7BA2A", excluded: true },
        10: "#FF9900"
      },
      form: {
        waybillType: "",
        linkType: "",
        customerType: ""
      },
      formRules: {
        check: [
          { required: true, message: "请选择问题答案", trigger: "change" }
        ]
      }
    };
  },
  watch: {
    show(isShow) {
      this.isVisible = isShow;
      console.log("isShow");
      if (isShow) {
        this.form = Object.assign({}, this.queryInfo);
        this.getQuestion();
      }
    },
    queryInfo(newVal) {
      if (newVal) {
        let params = {
          type: newVal.type,
          waybillType: newVal.waybillType
        };
      }
    }
  },
  mounted() {
    this.form = Object.assign({}, this.queryInfo);
    this.getQuestion();
  },
  methods: {
    clickitem(e,index1,index2){
      // var modelValue = _this.customerQuestionList[index1].children[index2].evaluationAnwser
      e === this.customerQuestionList[index1].children[index2].evaluationAnwser ? this.customerQuestionList[index1].children[index2].evaluationAnwser = '' : this.customerQuestionList[index1].children[index2].evaluationAnwser = e
    },
    includesAnswers(child, parent, answerType) {
      if (child && parent && answerType) {
        let oChild = child.concat([]);
        let oParent =
          answerType == "checkbox" ? parent.concat([]) : parent.split(",");
        return contains(oChild, oParent);
      } else {
        return false;
      }
    },
    handleEvationFail() {
      this.isFailVisible = true;
    },
    includeAnswers(child, parent) {
      if (parent) {
        return child.join(",").indexOf(parent) >= 0;
      } else {
        return false;
      }
    },
    getQuestion() {
      this.isCustomerListLoading = true;
      let waybillType = this.from.orderType == '0' ? '2' : '1';
      let params = {
        waybillType: waybillType,
        id: this.form.id,
        type: "1"
      };
      getQuestionCMList(params).then(res => {
        if (!res.error) {
          let list = res.questionInfoList ;
          list.map(function (item) {
                item.evaluationAnwser = item.answerType == "checkbox" ? item.evaluationAnwser != "" ? item.evaluationAnwser.split(",") : [] : item.answerType == 'star' ?  item.evaluationAnwser ? Number(item.evaluationAnwser) : 0: item.evaluationAnwser;
          });
          this.customerQuestionList = generateTree(list, "parentQuestionId");
          this.isCustomerListLoading = false;
        }
      });
    },
    changeParents(parent, index) {
      if (parent.children) {
        this.customerQuestionList[index].children.map(item => {
          item.evaluationAnwser = item.answerType == "checkbox" ? [] : "";
        });
      }
    },
    updateFailStatus() {
      this.cancel();
      this.$emit("updateList");
    },
    save() {
      this.$refs.form.validate(isValid => {
        console.log("isValid", isValid);
        if (isValid) {
          let list = JSON.parse(JSON.stringify(this.customerQuestionList));
          var params = {
            id: this.queryInfo.id,
            type: "2",

            customerQuestionList: list.sort((a, b) => {
              return parseInt(a.linkType) - parseInt(b.linkType);
            })
          };

          editEvaluation(params).then(res => {
            if (!res.error) {
              this.$message({
                message: "评价完成",
                type: "success"
              });
              this.cancel();
              this.$emit("save");
              this.$emit("updateList");
            } else {
              this.getQuestion();
            }
          });
        }
      });
    },
    reset() {
      this.resetForm("form");
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    cancel() {
      this.reset();
      this.$emit("update:show", false);
      this.$emit("updateList");
      this.$emit("update:queryInfo", null);
      this.isVisible = false;
    }
  }
};
</script>

<style scoped lang="scss">
.tree-map {
  display: flex;
  flex-direction: row;
}
.scroll-area {
  width: 230px;
}
.point-content {
  flex: 1 1 auto;
}
.el-radio {
  margin-right: 30px !important;
  margin-left: 0px !important;
}
/* 子问题样式 */
.child_question_container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  background-color: #eee;
  // border:1px dashed white ;
  border-right: none;
  transition: all 0.5s ease 0s;
  .child_question_item {
    border-right: 1px dashed white;
    padding-right: 20px;
    padding-top: 5px;
    .el-form-item {
      margin-bottom: 0px !important;
    }
  }
}
.default {
  width: calc(100% - 500px);
}
.comments_detail {
  position: fixed;
  width: 500px;
  top: calc(5vh + 120px);
  right: 0px;
  background-color: white;
  padding: 5px;
  .linkType__label {
    width: 100% !important;
    display: block;
    margin-left: 20px;
  }
}
</style>
