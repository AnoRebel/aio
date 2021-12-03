<script>
import { ref } from "vue";
import VueEasyLightbox from "vue-easy-lightbox";
import { InformationCircleIcon } from "@heroicons/vue/outline";

import { EmojiPicker, VoicePlayer, VideoPlayer } from "@/components";

export default {
  name: "GroupMessage",
  components: {
    EmojiPicker,
    InformationCircleIcon,
    VueEasyLightbox,
    VoicePlayer,
    VideoPlayer,
  },
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const showPopup = ref(false);
    const showImagePopup = ref(false);
    const openEmoji = () => {
      emitter.emit("openEmoji", true);
    };
    const setEmoji = e => {
      console.log(e);
    };
    return { openEmoji, setEmoji, showPopup, showImagePopup };
  },
};
</script>

<template>
  <div class="group-message">
    <div class="flex items-start mb-4 text-sm">
      <img
        :src="message.profile"
        :alt="message.sender"
        class="w-10 h-10 rounded mr-3 object-cover cursor-pointer"
        @click="showImagePopup = true"
      />
      <VueEasyLightbox
        :visible="showImagePopup"
        :imgs="message.profile"
        @hide="showImagePopup = false"
      />
      <div class="flex flex-col max-w-xs order-2 items-start">
        <div class="flex items-center">
          <app-link to="#">
            <span class="font-bold">{{ message.sender }}</span>
          </app-link>
          <span class="text-grey text-xs ml-1">11:46</span>
        </div>
        <p class="text-black leading-normal">
          <app-link
            v-if="message.linked_user != ''"
            to="#"
            class="inline-block bg-blue-300 text-blue-600 no-underline px-1 rounded"
          >
            @{{ message.linked_user }}
          </app-link>
          {{ message.text }}
        </p>
        <div
          v-if="message.code != ''"
          class="
            max-w-124 max-h-74
            bg-gray-400
            border border-gray-300
            text-gray-900 text-sm
            font-mono
            rounded
            p-3
            mt-2
            whitespace-pre
            overflow-auto
          "
        >
          {{ message.code }}
        </div>
        <div v-if="message.type == 'image'">
          <app-link class="relative w-74 h-64 flex flex-shrink-0 max-w-xs lg:max-w-md my-1" to="#">
            <img
              class="absolute shadow-md w-full h-full object-cover rounded-lg"
              :src="message.image.src"
              :alt="message.image.name"
              @click="showPopup = true"
            />
            <VueEasyLightbox
              :visible="showPopup"
              :imgs="message.image.src"
              @hide="showPopup = false"
            />
            <InformationCircleIcon
              class="absolute top-2 h-6 w-6 text-white cursor-pointer z-10 right-2"
              @click="imgDetails"
            />
          </app-link>
        </div>
        <div
          v-if="message.type == 'video'"
          class="relative block w-94 flex flex-shrink-0 max-w-xs lg:max-w-md"
        >
          <VideoPlayer
            class="shadow-md w-full h-full object-cover my-1"
            :video="message.video"
            :title="message.video.name"
          />
          <InformationCircleIcon
            class="absolute top-2 h-6 w-6 text-white cursor-pointer z-10 right-2"
            @click="videoDetails"
          />
        </div>
      </div>
    </div>
  </div>
</template>
