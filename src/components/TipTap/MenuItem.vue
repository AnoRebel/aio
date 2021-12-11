<script>
import remixiconUrl from "remixicon/fonts/remixicon.symbol.svg";

export default {
  name: "MenuItem",
  props: {
    icon: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    action: {
      type: Function,
      required: true,
    },

    isActive: {
      type: Function,
      default: null,
    },
  },
  setup() {
    return {
      remixiconUrl,
    };
  },
};
</script>

<template>
  <button
    class="w-7 h-7 border-none text-gray-900 bg-transparent hover:(bg-gray-900 text-white) rounded p-1 mr-1"
    :class="{
      '!bg-gray-900 text-white': isActive ? isActive() : null,
    }"
    @click="action"
    :title="title"
  >
    <svg class="remix w-full h-full fill-current">
      <use :xlink:href="`${remixiconUrl}#ri-${icon}`" />
    </svg>
  </button>
</template>

<style lang="scss" scoped>
.menu-item {
  width: 1.75rem;
  height: 1.75rem;
  color: #0d0d0d;
  border: none;
  background-color: transparent;
  border-radius: 0.4rem;
  padding: 0.25rem;
  margin-right: 0.25rem;

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }

  &.is-active,
  &:hover {
    color: #fff;
    background-color: #0d0d0d;
  }
}
</style>
