/**
 * Vue Components Global Mixins
 */
import { getModuleButton } from "@/api/common";

export const mixins = {
  mounted() {
    // 后端获取自定义按钮
    const resourceUuid = this.$route.meta.resourceUuid;
    if (resourceUuid) {
      getModuleButton({ resourceUuid }).then(res => {
        this.buttonData = res;
      });
    }
  }
};
