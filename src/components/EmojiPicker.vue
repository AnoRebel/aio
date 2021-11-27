<script>
import { onMounted, ref, computed, onBeforeUnmount } from "vue";
import { useDark } from "@vueuse/core";
import { VuemojiPicker } from "vuemoji-picker";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle,
} from "@headlessui/vue";

import { emitter } from "@/utils";

export default {
  name: "EmojiPicker",
  components: {
    VuemojiPicker,
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    DialogTitle,
  },
  emits: ["emoji-selected"],
  props: {
    class: {
      type: String,
      default: "bottom-18 right-24",
    },
  },
  setup(_, { emit }) {
    onMounted(async () => {
      emitter.on("openEmoji", e => {
        openEmoji.value = e;
      });
      customEmoji.value = await loadCustomEmoji();
    });
    const openEmoji = ref(false);
    const customEmoji = ref([]);
    const darkMode = ref("auto");
    const baseUrl =
      "https://raw.githubusercontent.com/nolanlawson/emoji-picker-element/master/docs";
    const loadCustomEmoji = async () => {
      const categoriesToCustomEmoji = await (await fetch(`${baseUrl}/custom.json`)).json();
      const customEmojiData = [];
      for (const [category, names] of Object.entries(categoriesToCustomEmoji)) {
        for (const name of names) {
          customEmojiData.push({
            category: category || undefined,
            name,
            shortcodes: [name],
            url: `${baseUrl}/custom/${name}.svg`,
          });
        }
      }
      return customEmojiData;
    };
    const style = ref({
      height: "300px",
      width: "100%",
    });
    // const isDark = useDark();
    const isDark = computed(() => {
      if (darkMode.value === "auto") return;
      return darkMode.value === "dark";
    });
    const onEmojiClick = detail => {
      emit(
        "emoji-selected",
        `Event: @skinToneChange\n\nData:\n\n${JSON.stringify(detail, null, 2)}`
      );
    };
    const onSkinToneChange = detail => {
      emit(
        "emoji-selected",
        `Event: @skinToneChange\n\nData:\n\n${JSON.stringify(detail, null, 2)}`
      );
    };
    onBeforeUnmount(() => {
      emitter.off("openEmoji");
    });
    return { style, openEmoji, onEmojiClick, onSkinToneChange, isDark, customEmoji };
  },
};
</script>

<template>
  <TransitionRoot appear :show="openEmoji" as="template">
    <Dialog as="div" @close="openEmoji = false">
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
            <div class="absolute bottom-18 right-24">
              <VuemojiPicker
                :picker-style="style"
                :is-dark="isDark"
                :custom-emoji="customEmoji"
                @emojiClick="onEmojiClick"
                @skinToneChange="onSkinToneChange"
              />
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
