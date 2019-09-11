<template>
  <el-dialog
    width="700px"
    :title="isCreate ? '新增问题' : '编辑问题'"
    v-if="isVisible"
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :append-to-body="true"
    :lock-scroll="true"
    @close="cancel"
    center
  >
    <el-form ref="form" :model="form" :rules="formRules" label-width="120px">
      <transfer-header title="关联问题" />
      <el-form-item label="关联问题" prop="parentQuestionId">
        <el-row>
          <el-col :span="16" v-if="pQuestion && pQuestion.id">
            {{ pQuestion.question
            }}<span v-if="pQuestion.answerType"
              >({{
                pQuestion.answerType == "radio"
                  ? "单选"
                  : pQuestion.answerType == "checkbox"
                  ? "多选"
                  : "请填写"
              }})</span
            >
          </el-col>
          <el-col :span="8">
            <el-tooltip
              class="item"
              effect="light"
              content="添加/修改关联问题"
              placement="bottom"
            >
              <el-button
                size="mini"
                round
                icon="fdddfont icon-modify"
                @click.stop="handleAddParentQuestion"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              v-if="pQuestion && pQuestion.id"
              class="item"
              effect="light"
              content="删除关联问题"
              placement="bottom"
            >
              <el-button
                size="mini"
                round
                icon="el-icon-close"
                @click.stop="handleDelParentQuestion"
              ></el-button>
            </el-tooltip>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item
        v-if="pQuestion && pQuestion.id"
        label="关联答案"
        prop="parentAnswers"
      >
        <el-row>
          <el-col :span="16">
            <el-form-item
              v-if="
                pQuestion && pQuestion.answer && pQuestion.answer.length > 0
              "
            >
              <el-checkbox-group v-model="form.parentAnswers">
                <el-checkbox
                  v-for="(answer, aIndex) in pQuestion.answer"
                  :key="aIndex"
                  :value="answer"
                  :label="answer"
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <transfer-header title="新增问题详情" />
      <el-form-item label="回访对象" prop="type">
        <el-row>
          <el-col :span="16">
            <el-select
              :disabled="joinCalculationDisabled"
              v-model="form.type"
              class="w100p"
              clearable
              filterable
              placeholder="请选择回访对象"
              @change="changeLinkType"
            >
              <el-option label="顾客端" value="1"></el-option>
              <el-option label="商户端" value="2"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item v-if="form.type == '1'" label="配送方式" prop="waybillType">
        <el-row>
          <el-col :span="16">
            <el-select
              :disabled="joinCalculationDisabled"
              v-model="form.waybillType"
              :multiple="isCreate ? true : false"
              class="w100p"
              clearable
              filterable
              placeholder="请选择配送方式"
              @change="changeWaybillType"
            >
              <el-option
                v-for="(item, index) in waybillTypeList"
                :key="index"
                :label="item.msg"
                :value="item.code"
              />
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item v-if="form.type" label="环节类型" prop="linkType">
        <el-row>
          <el-col :span="16">
            <el-select
              :disabled="joinCalculationDisabled"
              v-model="form.linkType"
              class="w100p"
              clearable
              filterable
              placeholder="请选择环节类型"
            >
              <el-option
                v-for="(item, index) in dealedLinkTypeList"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="问题内容" prop="question">
        <el-row>
          <el-col :span="16">
            <el-input
              type="textarea"
              maxlength="200"
              :autosize="{ minRows: 1, maxRows: 4 }"
              v-model="form.question"
              clearable
              placeholder="请输入问题内容"
            />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="是否加入积分" prop="joinCalculation">
        <el-radio-group
          :disabled="joinCalculationDisabled"
          v-model="form.joinCalculation"
        >
          <el-radio value="0" label="0">是</el-radio>
          <el-radio value="1" label="1">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="答案回答形式" prop="answerType">
        <el-row>
          <el-col :span="16">
            <el-select
              v-model="form.answerType"
              class="w100p"
              placeholder="请选择问题回答形式"
            >
              <el-option label="单选" value="radio"></el-option>
              <el-option label="多选" value="checkbox"></el-option>
              <el-option label="输入" value="input"></el-option>
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item
        v-if="form.answerType && form.answerType != 'input'"
        label="问题答案"
        prop="answer"
      >
        <el-row>
          <el-col :span="16">
            <el-input
              maxlength="30"
              v-model="answerInput"
              @keyup.enter.native="addAnswer"
              placeholder="请输入问题备选答案"
            />
          </el-col>
          <el-col :span="1">
            <el-tooltip
              class="item"
              effect="light"
              content="添加答案"
              placement="right"
            >
              <el-button type="text" @click="addAnswer">
                <i class="fdddfont icon-add-new"></i>
              </el-button>
            </el-tooltip>
          </el-col>
        </el-row>
        <el-row v-if="form.answerType == 'radio'">
          <el-radio-group v-model="answer">
            <span v-for="(item, index) in form.answer" :key="index">
              <el-radio
                class="word_wrap"
                disabled
                :label="item"
                :value="item"
              ></el-radio
              >&nbsp;
              <el-button
                size="mini"
                type="text"
                @click="delQuestion(item, index)"
                ><i class="el-icon-close"></i>&nbsp;&nbsp;</el-button
              >
            </span>
          </el-radio-group>
        </el-row>
        <el-row v-if="form.answerType == 'checkbox'">
          <el-checkbox-group v-model="answer">
            <span v-for="(item, index) in form.answer" :key="index">
              <el-checkbox
                disabled
                class="word_wrap"
                :label="item"
                :value="item"
              ></el-checkbox>
              <el-button
                size="mini"
                type="text"
                @click="delQuestion(item, index)"
                ><i class="el-icon-close"></i>&nbsp;&nbsp;</el-button
              >
            </span>
          </el-checkbox-group>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" @click="save">提交</el-button>
        <el-button size="small" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
    <question-select
      :show.sync="isQuestionVisible"
      :waybillTypeList="waybillTypeList"
      :linkTypeList="linkTypeList"
      :modifyTemplate="modifyTemplate"
      @sendData="receiveData"
    />
  </el-dialog>
</template>
<script>
/**
 * Template Edit Component
 * ----------------------
 * Author: Calamus
 * Date: 2018.08.28
 */
// validate
import Validator from "@/utils/extendValidate/extendValidate";
// api
import { addQuestion, updateQuestion } from "@/api/evaluate";
import { setSession, getSession } from "@/utils/session";
import QuestionSelect from "./questionlist";
import TransferHeader from "@/components/TransferHeader";

const initForm = {
  parentQuestionId: "",
  parentAnswers: [],
  parentQuestion: "",
  parentAnswerList: [],
  type: "",
  id: "",
  waybillType: [],
  linkType: "",
  question: "",
  answerType: "radio",
  answer: [],
  joinCalculation: "0",
  upDateTime: new Date()
};
const initQuestion = {
  id: "",
  question: "",
  answer: []
};
export default {
  name: "TemplateEdit",
  components: {
    QuestionSelect,
    TransferHeader
  },
  data() {
    return {
      isVisible: false,
      isQuestionVisible: false,
      answer: null,
      answerInput: "",
      pQuestion: null,
      joinCalculationDisabled: false,
      form: {},
      formRules: {
        type: [
          { required: true, message: "请选择回访对象", trigger: "change" }
        ],
        waybillType: [
          { required: true, message: "请选择配送方式", trigger: "change" }
        ],
        parentAnswers: [
          {
            required: true,
            message: "请选择关联问题的相关答案",
            trigger: "change"
          }
        ],
        joinCalculation: [
          { required: true, message: "请选择是否加入积分", trigger: "change" }
        ],
        linkType: [
          { required: true, message: "请选择环节", trigger: "change" }
        ],
        question: [
          { required: true, message: "请输入问题内容", trigger: "change" },
          {
            min: 1,
            max: 200,
            message: "问题内容不要超过200字",
            trigger: "change"
          }
        ],
        answerType: [
          { required: true, message: "请选择问题回答形式", trigger: "change" }
        ],
        answer: [
          { required: true, message: "请输入问题备选答案", trigger: "blur" }
        ]
      }
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    isCreate: {
      type: Boolean,
      default: true
    },
    modifyTemplate: {
      type: Object
    },
    waybillTypeList: {
      type: Array
    },
    linkTypeList: {
      type: Array
    }
  },
  computed: {
    dealedLinkTypeList() {
      if (this.form.type == 1) {
        return this.linkTypeList.filter(item => {
          return item.type == "all" || item.type == "customer";
        });
      } else {
        return this.linkTypeList.filter(item => {
          return item.type == "all" || item.type == "merchants";
        });
      }
    }
  },
  watch: {
    show(isShow) {
      this.isVisible = isShow;
      if (isShow) {
        if (this.isCreate) {
          this.form = JSON.parse(JSON.stringify(initForm));
          this.form.answer = [];
          this.form.joinCalculation = "0";
        } else {
          this.form = JSON.parse(JSON.stringify(this.modifyTemplate));
          console.log();
          this.form.answer = this.modifyTemplate.answer.concat([]);
          this.form.parentAnswers = JSON.parse(
            JSON.stringify(this.modifyTemplate.parentAnswers)
          );
          this.pQuestion = JSON.parse(JSON.stringify(initQuestion));
          this.pQuestion.answer = JSON.parse(
            JSON.stringify(this.modifyTemplate.parentAnswerList)
          );
          this.pQuestion.question = this.modifyTemplate.parentQuestion;
          this.pQuestion.id = this.modifyTemplate.parentQuestionId;
        }
      }
    },
    "form.parentQuestionId"(newVal, oldVal) {
      console.log("form.parentQuestionId", newVal, "11", oldVal);
      if (newVal) {
        this.joinCalculationDisabled = true;
        this.form.joinCalculation = "1";
        if (oldVal && newVal !== oldVal) {
          this.form.parentAnswers = [];
        }
      }
    }
  },
  methods: {
    changeWaybillType(val) {
      console.log("wayBillType", val);
    },
    changeLinkType(val) {
      this.form.linkType = "";
      this.form.waybillType = [];
    },
    handleAddParentQuestion() {
      this.isQuestionVisible = true;
    },
    handleDelParentQuestion() {
      this.form.parentQuestionId = "";
      this.form.parentQuestion = "";
      this.form.parentAnswers = [];
      this.joinCalculationDisabled = false;
      this.form.joinCalculation = "0";
      this.pQuestion = null;
    },
    receiveData(row, search) {
      console.log("rec", row, "search=>", search);
      this.form.parentQuestionId = row.id;
      this.form.parentQuestion = row.question;
      this.form.parentAnswerList = row.answer;
      this.form.type = row.type;
      this.form.waybillType = this.isCreate
        ? row.waybillType.split(",")
        : row.waybillType;
      console.log(row.waybillType, row.waybillType.split(","));
      this.form.linkType = row.linkType;
      this.pQuestion = JSON.parse(JSON.stringify(row));
      this.pQuestion = row;
    },
    save() {
      this.$refs.form.validate(isValid => {
        if (this.form.answerType != "input" && this.form.answer.length <= 0) {
          this.$message({
            message: "请添加至少一个答案选项！",
            type: "warning"
          });
        } else {
          if (isValid) {
            var params = Object.assign({}, this.form);
            if (this.isCreate) {
              params.waybillType = params.waybillType.join(",");
              addQuestion(params).then(res => {
                if (!res.error) {
                  this.$message({
                    message: "新建问题成功!",
                    type: "success"
                  });
                  this.cancel();
                  this.$emit("updateList");
                }
              });
            } else {
              updateQuestion(params).then(res => {
                if (!res.error) {
                  this.$message({
                    message: "编辑问题成功!",
                    type: "success"
                  });
                  this.cancel();
                  this.$emit("updateList");
                }
              });
            }
          }
        }
      });
    },
    cancel() {
      this.reset();
      this.$emit("update:show", false);
      this.$emit("updateList");
      this.$emit("update:modifyTemplate", null);
      this.isVisible = false;
    },
    reset() {
      this.answerInput = "";
      this.$refs.form.resetFields();
      this.form.parentQuestionId = "";
      this.form.parentQuestion = "";
      this.form.parentAnswers = [];
      (this.joinCalculationDisabled = false), (this.pQuestion = null);
      this.form.answerType = "radio";
      this.form.joinCalculation = 0;
      this.form.answer = [];
    },
    //新增答案
    addAnswer() {
      console.log("enter");
      let len = this.form.answer.length;
      if (this.answerInput) {
        this.form.answer.push(this.answerInput);
      }
      this.answerInput = "";
    },
    //删除答案
    delQuestion(item, index) {
      this.form.answer.splice(index, 1);
    }
  }
};
</script>
<style lang="scss" scoped>
.mar-l-80 {
  margin-left: 80px;
}
.el-radio {
  margin-right: 30px !important;
  margin-left: 0px !important;
}
</style>
