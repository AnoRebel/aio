<template>
  <TransitionRoot appear :show="show" as="template">
    <Dialog as="div" @close="$emit('close')">
      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div class="min-h-screen px-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0" />
          </TransitionChild>

          <span class="inline-block h-screen align-middle" aria-hidden="true"> &#8203; </span>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <vue-resizable
              ref="resizableComponent"
              class="resizable"
              drag-selector=".dragSelector"
              active="[]"
              width="auto"
              height="auto"
            >
              <div
                class="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg"
              >
                <DialogTitle
                  as="h3"
                  class="dragSelector text-lg font-medium leading-6 text-gray-900"
                >
                  <slot name="header" />
                  <button class="absolute top-3 right-3">
                    <XCircleIcon class="h-5 w-5" @click="$emit('close')" />
                  </button>
                </DialogTitle>
                <slot />
              </div>
            </vue-resizable>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { onMounted, onBeforeUnmount } from "vue";
import VueResizable from "vue-resizable";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from "@headlessui/vue";

export default {
  name: "BaseCenterModal",
  components: { TransitionRoot, TransitionChild, Dialog, DialogOverlay, DialogTitle, VueResizable },
  props: {
    show: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["close"],
  setup(_, { emit }) {
    const escFunction = event => {
      if (event.keyCode === 27) {
        emit("close");
      }
    };

    onMounted(() => document.addEventListener("keydown", escFunction, false));
    onBeforeUnmount(() => document.removeEventListener("keydown", escFunction, false));

    return {};
  },
};
</script>

<style lang="scss" scoped>
.dragSelector {
  cursor: grab;
}
</style>
