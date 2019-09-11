<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2018-12-06 17:39:34
 * @LastEditTime: 2019-08-16 11:01:57
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <el-form ref="form" :model="form" label-width="110px">
      <el-form-item>
        <span
          >{{ info.question }}({{
            info.answerType == "radio"
              ? "单选"
              : info.answerType == "checkbox"
              ? "多选"
              : "请填写"
          }})</span
        >
      </el-form-item>
      <el-form-item
        v-if="
          info.answerType == 'radio' && info.answer && info.answer.length > 0
        "
      >
        <el-radio-group disabled v-model="radio">
          <el-radio
            v-for="(answer, aIndex) in info.answer"
            :key="aIndex"
            :value="answer"
            :label="answer"
          ></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-if="
          info.answerType == 'checkbox' && info.answer && info.answer.length > 0
        "
      >
        <el-checkbox-group
          disabled
          v-model="checkbox"
          class="w100p"
          clearable
          filterable
        >
          <el-checkbox
            v-for="(answer, aIndex) in info.answer"
            :key="aIndex"
            :label="answer"
            :value="answer"
          />
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import NavButton from "@/components/navButton";
import CommonWrapper from "@/components/commonWrapper";
import CommonTable from "@/components/commonTable";
import { setSession, getSession } from "@/utils/session";
import { getWaybillTypeList } from "@/api/evaluate";

export default {
  name: "CustomerQueryDetail",
  components: {
    VuePerfectScrollbar,
    NavButton,
    CommonWrapper,
    CommonTable
  },
  data() {
    return {
      inputAnswer: "",
      checkbox: [],
      radio: "",
      form: {
        waybillType: "",
        linkType: "",
        customerType: "",
        id: "16464313564514",
        waybillType: "展厅上样",
        linkType: "配送",
        question: "您对我们的配送服务满意吗",
        answerType: "input",
        answer: []
      },
      formRules: {}
    };
  },
  props: {
    info: {
      type: Object
    }
  },
  mounted() {},
  methods: {
    addQuestion() {
      this.documentList.push({
        id: "",
        question: "",
        answerType: "",
        answer: [],
        defaulyAnswer: null,
        editable: true
      });
    },
    editQuestion(item, index) {
      this.documentList[index].editable = true;
    },
    delQuestion(item, index) {
      this.$confirm("确认删除问题" + (index + 1) + "吗?", "警告", {
        type: "warning"
      })
        .then(() => {
          this.documentList.splice(index, 1);
        })
        .catch(() => {});
    },
    addAnswer(item, index) {
      if (this.inputAnswer) {
        this.documentList[index].answer.push(this.inputAnswer);
        this.inputAnswer = "";
      }
    },
    reset() {
      this.$refs.form.resetFields();
    },
    cancel() {
      this.$emit("back");
    }
  }
};
</script>

<style scoped>
.el-radio {
  margin-right: 30px !important;
  margin-left: 0px !important;
}
</style>
