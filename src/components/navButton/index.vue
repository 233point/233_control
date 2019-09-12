<template>
  <div class="nav-button">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "NavButton"
};
</script>

<style lang="scss" scoped>
.nav-button {
  padding: 5px;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid #f2f2f2;
}
</style>
