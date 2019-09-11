<template>
  <div>
    <!-- 服务对比照片 -->
    <a-steps :current="0" size="small">
      <a-step status="finish" title="服务开始">
        <a-icon type="fast-backward" slot="icon" />
        <div slot="description" class="img_container">
          <span v-show="type !== 'detail'" class="des"
            >请上传服务开始前的照片</span
          >
          <span v-show="urls.length <= 0">暂无对比照片</span>

          <div v-if="type == 'edit'">
            <a-upload
              action="//jsonplaceholder.typicode.com/posts/"
              listType="picture-card"
              :fileList="fileList"
              @preview="handlePreview"
              @change="handleChange"
            >
              <div v-if="fileList.length < 3">
                <a-icon type="plus" />
                <div class="ant-upload-text">上传</div>
              </div>
            </a-upload>
            <a-modal
              :visible="previewVisible"
              :footer="null"
              @cancel="handleCancel"
            >
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </div>

          <el-image
            v-else
            v-for="url in urls"
            :key="url"
            :src="url"
            lazy
          ></el-image>
        </div>
      </a-step>
      <a-step status="wait" title="服务完成">
        <a-icon type="fast-forward" slot="icon" />
        <div slot="description" class="img_container">
          <span v-show="type !== 'detail'" class="des"
            >请上传服务开始前的照片</span
          >
          <span v-show="urls.length <= 0">暂无对比照片</span>
          <div v-if="type == 'edit'">
            <a-upload
              action="//jsonplaceholder.typicode.com/posts/"
              listType="picture-card"
              :fileList="fileList"
              @preview="handlePreview"
              @change="handleChange"
            >
              <div v-if="fileList.length < 3">
                <a-icon type="plus" />
                <div class="ant-upload-text">上传</div>
              </div>
            </a-upload>
            <a-modal
              :visible="previewVisible"
              :footer="null"
              @cancel="handleCancel"
            >
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </div>

          <el-image
            v-else
            v-for="url in urls"
            :key="url"
            :src="url"
            lazy
          ></el-image>
        </div>
      </a-step>
    </a-steps>
  </div>
</template>

<script>
export default {
  name: "compare",
  data() {
    return {
      urls: [
        "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg",
        "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg",
        "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg",
        "https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg",
        "https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg",
        "https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg",
        "https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg"
      ],
      // upload
      previewVisible: false,
      previewImage: "",
      fileList: [
        {
          uid: "-1",
          name: "xxx.png",
          status: "done",
          url:
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        }
      ]
    };
  },
  props: {
    info: {
      type: Object
    },
    type: {
      type: String,
      default: "detail"
    }
  },
  methods: {
    // upload
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    }
  }
};
</script>

<style lang="scss" scoped>
.img_container {
  width: 180px !important;
}
</style>
