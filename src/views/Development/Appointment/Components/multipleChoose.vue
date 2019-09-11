<template>
  <el-form
    class="multipleBox"
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
    <!-- <el-row>
        <el-form-item label="送货备注" prop="appointRemark">
          <el-input v-model="bookInfo.appointRemark" type="textarea" maxlength="200" placeholder="请输入送货备注,最长200字符"></el-input>
        </el-form-item>
      </el-row> -->
    <el-row>
      <el-form-item label="订单列表"></el-form-item>
      <div class="appoint_list">
        <div
          v-for="(item, index) in appointList"
          :class="index == 0 ? '' : 'appoint_item'"
          :key="index"
        >
          <el-checkbox
            v-model="item.isCheck"
            @change="chechboxChange($event, item)"
          >
            <div><span>{{ item.waybillNo }}</span><span style="margin-left:50px;">{{ item.customerName }}</span></div>
            <div class="customer_info">
              <span>{{ item.fullAddress }}</span>
            </div>
          </el-checkbox>
          <el-input
            v-model="item.appointRemark"
            style="display:block;width:380px;margin-top:10px;margin-left: 24px;"
            type="textarea"
            maxlength="200"
            :autosize="{ minRows: 2, maxRows: 6 }"
            placeholder="请输入预约备注,最长200字符"
          ></el-input>
        </div>
      </div>
    </el-row>
    <el-row>
      <el-col :span="24" class="flex-right">
        <el-button
          type="primary"
          @click="save()"
          :loading="isSaving"
          :disabled="appointList.length < 1"
          >提交</el-button
        >
      </el-col>
    </el-row>
    <el-dialog
      width="600px"
      title="预约结果"
      :visible.sync="isSuccessVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="isSuccessVisible = false"
      center
      append-to-body
    >
      <el-row> </el-row>
      <div style="max-height:400px;overflow:auto">
        <el-row v-for="(item, index) in successReason" :key="index">
          <el-col :span="24">
            <el-row>
              <el-col :span="6"><b>客户姓名：</b></el-col>
              <el-col :span="18">{{ item.customerName }}</el-col>
            </el-row>
          </el-col>
          <el-col :span="24">
            <el-row>
              <el-col :span="6"><b>预约结果：</b></el-col>
              <el-col :span="18">{{ item.msg }}</el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
      <el-row slot="footer" class="dialog-footer">
        <el-button size="small" @click="successConfirm">确定</el-button>
      </el-row>
    </el-dialog>
  </el-form>
</template>

<script>
import { appointOrder } from "@/api/order";
import moment from "moment";
export default {
  name: "multipleChoose",
  components: {},
  data() {
    return {
      swiperOption: {
        autoHeight: true,
        direction: "vertical",
        mousewheel: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
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
      },
      formRules: {
        appointTime: [
          { required: true, message: "请选择预约送货时间", trigger: "blur" }
        ],
        appointDate: [
          { required: true, message: "请选择预约送货日期", trigger: "blur" }
        ]
      },
      appointList: [],
      isSuccessVisible: false,
      successReason: [],
      isSaving:false
    };
  },
  props: {
    orderList: {
      type: Array
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    chechboxChange(value, item) {
      if (!value) {
        let index = this.appointList.indexOf(item);
        this.appointList.splice(index, 1);
        this.$emit("cancelTap", item);
      }
    },
    save() {
      this.$refs.bookInfo.validate(isValid => {
        if (isValid) {
          let params = [];
          this.appointList.forEach(item => {
            item.appointTime = this.bookInfo.appointTime;
            params.push({
              id: item.id,
              appointTime: item.appointTime,
              appointRemark: item.appointRemark,
              appointStatus: "1",
              customerName: item.customerName
            });
          });
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
              this.isSuccessVisible = true;
              this.successReason = res;
              // this.$message({
              //   message: '预约完成',
              //   type: 'success'
              // })
              // let result = ``
              // res.forEach(item => {
              //   result += `${item.customerName}:${item.msg}
              //   `
              // })
              // this.$alert(result, '预约结果', {
              //   dangerouslyUseHTMLString: true
              // });
            }
          });
        }
      });
    },
    successConfirm() {
      this.isSuccessVisible = false;
      this.$emit("updateList", true);
    }
  },
  mounted() {
    this.bookInfo.appointDate = 
      moment()
        .add(1, "days")
  }
};
</script>
<style lang="scss">
.appoint_list {
  .el-checkbox__input {
    vertical-align: top;
  }
}
.appont_time{
  width: 220px;
}
</style>

<style lang="scss" scoped>
.appoint_list {
  max-height: 300px;
  overflow-y: scroll;
  margin-bottom: 20px;
  .customer_info {
    white-space: normal;
    width: 400px;
    padding: 10px 20px 0 0;
  }
  .appoint_item {
    margin-top: 10px;
  }
}

</style>
