<template>
  <a
    class="tab__item"
    href="javascript:;"
    @click.stop="handleChange"
    :class="{ item__active: check == value, disabled: disabled }"
  >
    {{ label }}
    <slot />
  </a>
</template>

<script>
import Emitter from "@/mixins/emitter.js";
import EventBus from "@/components/eventBus";

export default {
  name: "TabItem",
  componentName: "TabItem",
  mixins: [Emitter],
  data() {
    return {};
  },
  props: {
    label: {},
    disabled: Boolean,
    value: {}
  },
  computed: {
    check: {
      get() {
        return this._simpleTabs.value;
      },
      set(value) {
        this._simpleTabs.$emit("input", value);
      }
    },
    _simpleTabs() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== "simpleTabs") {
          parent = parent.$parent;
        } else {
          return parent;
        }
      }
      return false;
    }
  },
  methods: {
    handleChange() {
      if (!this.disabled) {
        this.$nextTick(() => {
          this.dispatch("simpleTabs", "handleChange", this.value);
        });
      }
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.tab__item {
  transition: all 0.2s linear;
  &:hover {
    color: var(--color-primary-hover);
  }
}
.item__active {
  color: var(--color-primary) !important;
}
.disabled {
  cursor: not-allowed;
}
</style>
