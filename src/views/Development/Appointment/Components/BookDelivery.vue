<template>
  <el-dialog
    width="400px"
    title="预约送货"
    :visible.sync="isVisible"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :lock-scroll="true"
    @close="cancel"
  >
    <el-form
      ref="bookInfo"
      :model="bookInfo"
      :rules="formRules"
      label-width="80px"
    >
      <!--<el-row>-->
      <!--<el-form-item label="预约结果" prop="appointStatus">-->
      <!--<el-radio v-model="bookInfo.appointStatus" label="1">成功</el-radio>-->
      <!--<el-radio v-model="bookInfo.appointStatus" label="2">失败</el-radio>-->
      <!--</el-form-item>-->
      <!--</el-row>-->
       <el-row>
      <el-form-item label="送货日期" prop="appointDate">
        <el-date-picker
          v-model="bookInfo.appointDate"
          type="date"
          align="right"
          placeholder="请选择送货日期"
          format="yyyy-MM-dd"
          size="mini"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </el-form-item>
    </el-row>
    <el-row>
      <el-form-item label="送货时间" prop="appointTime">
       <el-select v-model="bookInfo.appointTime" class="appont_time">
          <el-option
            v-for="item in timeList"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
    </el-row>
      <el-row>
        <el-form-item label="预约备注" prop="appointRemark">
          <el-input
            v-model="bookInfo.appointRemark"
            type="textarea"
            maxlength="200"
            placeholder="请输入预约备注,最长200字符"
          ></el-input>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :span="24" class="flex-right">
          <el-button type="primary" @click="save()" :loading="isSaving">提交</el-button>
          <el-button @click="cancel()">取消</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
import { appointOrder } from "@/api/order";
import moment from "moment";
export default {
  name: "BookDelivery",
  data() {
    let that = this;
    return {
      pickerOptions: {
        // shortcuts: [
        //   {
        //     text: "上午",
        //     onClick(picker) {
        //       that.bookInfo.duration = "上午";
        //       // picker.$emit('pick', new Date());
        //     }
        //   },
        //   {
        //     text: "下午",
        //     onClick(picker) {
        //       that.bookInfo.duration = "下午";
        //       // const date = new Date();
        //       // date.setTime(date.getTime() - 3600 * 1000 * 24);
        //       // picker.$emit('pick', date);
        //     }
        //   }
        // ],
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      isVisible: false,
      timeList:[
        '上午',
        '下午',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',
        '00:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
      ],
      bookInfo: {
        appointTime: "09:00",
        appointDate: "",
        appointRemark: "",
        appointStatus: "1"
      },
      formRules: {
        appointTime: [
          { required: true, message: "请选择预约送货时间", trigger: "blur" }
        ],
        appointDate: [
          { required: true, message: "请选择预约送货日期", trigger: "blur" }
        ]
      },
      isSaving:false
    };
  },
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    orderInfo: {
      type: Object
    }
  },
  methods: {
    save() {
      this.$refs.bookInfo.validate(isValid => {
        if (isValid) {
          let params = [
            {
              id: this.orderInfo.id,
              ...this.bookInfo,
              customerName: this.orderInfo.customerName
            }
          ];
          this.isSaving = true
          appointOrder(params).then(res => {
            this.isSaving = false
            if (!res.error) {
              if (res.code == 0) {
                this.$message({
                  message: res.msg,
                  type: "warning"
                });
                return;
              }
              // this.$message({
              //   message: '预约完成',
              //   type: 'success'
              // })
              this.cancel();
              this.$emit("updateList", true);
              let result = ``;
              res.forEach(item => {
                result += `${item.msg}
                  `;
              });
              this.$alert(result, "预约结果", {
                dangerouslyUseHTMLString: true
              });
            }
          });
        }
      });
    },
    cancel() {
      this.isVisible = false;
      this.$refs.bookInfo.resetFields();
      this.$emit("update:show", false);
    },
    // appointTimeChange(value) {
    //   if (this.bookInfo.duration != "") {
    //     this.bookInfo.duration = "";
    //   }
    //   // this.bookInfo.duration = ''
    // }
  },
  watch: {
    show(isShow) {
      this.isVisible = isShow;
      if (isShow) {
        this.bookInfo.appointDate = moment()
          .add(1, "days")
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
