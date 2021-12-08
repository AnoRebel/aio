<template>
  <transition
    enter-active-class="transition ease-out duration-200 transform"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-in duration-200 transform"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div class="fixed z-10 inset-0 overflow-y-auto bg-black transition-all bg-opacity-10">
      <div class="flex items-start justify-center min-h-screen text-center pt-4">
        <transition
          enter-active-class="transition ease-out duration-300 transform"
          enter-from-class="opacity-0 translate-y-10 scale-95"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="ease-in duration-200"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 translate-y-10 translate-y-0 scale-95"
        >
          <vue-resizable
            ref="resizableComponent"
            class="resizable"
            drag-selector=".resizable"
            active="[]"
            width="auto"
            height="auto"
          >
            <div
              class="dragSelector relative rounded shadow-xl p-2 transition-all"
              role="dialog"
              ref="modal"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <slot />
            </div>
          </vue-resizable>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import { onMounted, ref, onBeforeUnmount } from "vue";
import { XCircleIcon } from "@heroicons/vue/outline";
import VueResizable from "vue-resizable";
import { onClickOutside } from "@vueuse/core";

export default {
  name: "BaseTopModal",
  props: {
    static: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    XCircleIcon,
    VueResizable,
  },
  emits: ["close"],
  setup(props, { emit }) {
    const modal = ref(null);
    const escFunction = event => {
      if (event.keyCode === 27) {
        emit("close");
      }
    };

    if (!props.static) {
      onClickOutside(modal, () => emit("close"));
    }

    onMounted(() => document.addEventListener("keydown", escFunction, false));
    onBeforeUnmount(() => document.removeEventListener("keydown", escFunction, false));

    return {
      modal,
    };
  },
};
</script>

<style scoped lang="scss"></style>
