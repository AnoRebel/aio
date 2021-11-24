<script>
import { onMounted, reactive, onBeforeUnmount } from "vue";

import { emitter } from "@/utils";

export default {
  name: "Notification",
  setup() {
    const note = reactive({
      show: false,
      title: "Title",
      message: "Notification",
    });
    onMounted(() => {
      emitter.on("toggle", e => {
        note.show = e.show;
        if (e.show) {
          note.title = e.title || "";
          note.message = e.message;
        }
      });
    });
    onBeforeUnmount(() => {
      emitter.off("toggle");
    });
    return { note };
  },
};
</script>

<template>
  <transition name="slide-fade">
    <div
      v-if="note.show"
      class="
        fixed
        bottom-0
        right-0
        m-6
        p-2
        rounded
        shadow-lg
        min-h-28 min-w-54
        z-50
        bg-gray-800
        text-white
      "
    >
      <div class="absolute right-0 top-0 m-2 cursor-pointer" @click="note.show = false">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div class="flex flex-col">
        <div class="font-semibold">{{ note.title }}</div>
        <div class="text-sm p-1">{{ note.message }}</div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.slide-fade-enter-active {
  // transition: all 0.3s ease-out;
  animation: bounce-in 0.5s;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  // animation: bounce-in 0.5s reverse;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(3rem);
  opacity: 0;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes zoom {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  100% {
    opacity: 1;
  }
}
</style>
