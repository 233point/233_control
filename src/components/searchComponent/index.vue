<template>
  <div class="wrapper">
    <el-form inline :model="searchForm" label-width="80px">
      <!-- <el-form-item label="城市">
			  <el-cascader class="w100p"
                                 ref="cascader"
                                 :options="cityOptions"
                                 v-model="searchForm.cityCode"
                                 change-on-select
                                 @change="selectCityChange($event)"
                                 :props="cityProps">
				</el-cascader>
		  </el-form-item> -->
      <el-form-item label="商场">
        <el-select
          class="w100p"
          v-model="searchForm.marketId"
          @change="marketChange"
          filterable
          clearable
          placeholder="请选择商场"
        >
          <el-option
            v-for="item in marketList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { queryNoPage } from "@/api/warehouse";
// import areaTree from '@/assets/city_tree.json';
// const addressTree = areaTree.children;
export default {
  components: {},
  props: {},
  data() {
    return {
      //  cityOptions: addressTree,
      //     cityProps: {
      //       value: 'adcode',
      //       label: 'name',
      //       children: 'children',
      //       checkStrictly: false
      // },
      searchForm: {
        cityCode: [],
        marketId: ""
      },
      marketList: []
    };
  },
  watch: {},
  computed: {},
  methods: {
    selectCityChange(flag) {
      // if(!flag){
      this.searchForm.marketId = "";
      this.marketList = [];
      this.$emit("update:searchParams", this.searchForm);
      if (
        this.$store.getters.roleType == "merchant" ||
        this.$store.getters.roleType == "regionMarcketManager" ||
        this.$store.getters.roleType == "marcketManager"
      ) {
        let params = [];
        params.push(
          this.searchForm.cityCode[this.searchForm.cityCode.length - 1] + ""
        );
        queryNoPage({ cityCode: params }).then(res => {
          this.marketList = res;
        });
      }
      // }
    },
    marketChange() {
      this.$emit("update:searchParams", this.searchForm);
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.wrapper {
}
</style>
