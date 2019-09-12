<template>
  <div class="choose_info" :class="data.length > 0 ? 'active' : 'hidden'">
    <span><i class="el-icon-warning"/></span>
    <span>
      已选择<span class="info">&nbsp;{{ data.length }}&nbsp;</span>项
    </span>
    <span color="info">{{ chooseMsg }}</span>
    <span>
      <el-button class="info" type="text" @click="clearSelected"
        >清空</el-button
      >
    </span>
  </div>
</template>

<script>
export default {
  name: "chooseInfo",
  props: {
    chooseMsg: {
      type: String,
      default: ""
    },
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  },
  watch: {
    chooseMsg: (newval, oldval) => {
      console.log(newval);
    }
  },
  methods: {
    clearSelected() {
      this.$emit("clear", this.data);
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes flipOutX {
  from {
    transform: perspective(400px);
  }

  30% {
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    opacity: 1;
  }

  to {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    opacity: 0;
  }
}
@keyframes flipInX {
  from {
    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);
    animation-timing-function: ease-in;
    opacity: 0;
  }

  40% {
    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);
    animation-timing-function: ease-in;
  }

  60% {
    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);
    opacity: 1;
  }

  80% {
    transform: perspective(400px) rotate3d(1, 0, 0, -5deg);
  }

  to {
    transform: perspective(400px);
  }
}
.choose_info {
  transition: all 0.2s linear;
  color: var(--color-text);
  .info {
    color: var(--color-primary) !important;
  }
  span:nth-child(1) {
  }
  span:nth-child(2) {
    padding-left: 0.5rem;
  }
  span:nth-child(3) {
    padding-left: 1rem;
    font-size: 12px;
  }
}
.choose_info.active {
  background-color: var(--color-primary-hover);
  border: 1px solid var(--color-primary);
  border-radius: 5px;
  margin: 1rem 0.6rem;
  padding: 0.3rem 1rem;
  height: auto;
  animation: flipInX 600ms both;
}
.choose_info.hidden {
  animation: flipOutX 600ms both;
  padding: 0;
  height: 0;
  border: none;
  overflow: hidden;
}
</style>
