<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-24 10:16:10
 * @LastEditTime: 2019-08-28 13:48:59
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div
    class="common-wrapper"
    v-bind:class="{ full: full, 'no-border': !border, radius: radius }"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "CommonWrapper",
  props: {
    full: Boolean,
    border: {
      type: Boolean,
      default: true
    },
    radius: {
      type: Boolean,
      default: true
    }
  }
};
</script>
<style lang="scss" scoped>
.radius {
  border-radius: 8px;
}
.common-wrapper {
  padding: 12px 16px;
  margin: 10px;
  box-sizing: border-box;
  // border-radius:8px;
  border: 1px solid #f2f2f2;
  background: white;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.13);
  &.full {
    padding: 0 !important;
    border: none !important;
  }
  &.no-border {
    border: none !important;
    transition: all 0.3s linear;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    // border-color: rgba(0, 0, 0, 0.05);
    &:hover {
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    }
  }
}
</style>
