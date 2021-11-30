<script>
import { ref } from "vue";
import VueEasyLightbox from "vue-easy-lightbox";
import { InformationCircleIcon } from "@heroicons/vue/outline";

import { EmojiPicker, VoicePlayer, AudioPlayer, VideoPlayer } from "@/components";

export default {
  name: "SingleMessage",
  components: {
    EmojiPicker,
    InformationCircleIcon,
    VueEasyLightbox,
    VoicePlayer,
    AudioPlayer,
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
  <div class="chat-message">
    <div :class="['flex items-end', message.isSender ? 'justify-end' : '']">
      <div
        :class="[
          'flex flex-col space-y-2 text-xs max-w-xs mx-2',
          message.isSender ? 'order-1 items-end' : 'order-2 items-start',
        ]"
      >
        <div :class="['flex items-center group', message.isSender ? 'flex-row-reverse' : '']">
          <app-link
            v-if="message.type == 'image'"
            class="relative block w-64 h-64 flex flex-shrink-0 max-w-xs lg:max-w-md"
            to="#"
          >
            <img
              :class="[
                'absolute shadow-md w-full h-full rounded-lg object-cover',
                message.isSender ? 'rounded-br-none' : 'rounded-bl-none',
              ]"
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
              :class="[
                'absolute top-2 h-6 w-6 text-white cursor-pointer z-10',
                message.isSender ? 'right-2' : 'left-2',
              ]"
              @click="imgDetails"
            />
          </app-link>
          <div
            v-if="message.type == 'audio'"
            class="relative block w-64 flex flex-shrink-0 max-w-xs lg:max-w-md"
          >
            <VoicePlayer
              :class="[
                'shadow-md w-full rounded-lg',
                message.isSender ? 'rounded-br-none bg-green-600' : 'rounded-bl-none bg-gray-300',
              ]"
              :audio="message.audio"
            />
          </div>
          <div
            v-if="message.type == 'video'"
            class="relative block w-74 flex flex-shrink-0 max-w-xs lg:max-w-md"
          >
            <VideoPlayer
              :class="[
                'shadow-md w-full h-full rounded-lg object-cover',
                message.isSender ? 'rounded-br-none' : 'rounded-bl-none',
              ]"
              :video="message.video"
              :title="message.video.name"
            />
            <InformationCircleIcon
              :class="[
                'absolute top-2 h-6 w-6 text-white cursor-pointer z-10',
                message.isSender ? 'right-2' : 'left-2',
              ]"
              @click="videoDetails"
            />
          </div>
          <span
            v-if="message.type == 'text'"
            :class="[
              'px-4 py-2 rounded-lg inline-block',
              message.isSender
                ? 'rounded-br-none bg-green-600 text-white'
                : 'rounded-bl-none bg-gray-300 text-gray-600',
            ]"
          >
            {{ message.text }}
          </span>
          <button
            type="button"
            class="
              hidden
              group-hover:block
              flex flex-shrink-0
              focus:outline-none
              mx-2
              block
              rounded-full
              text-gray-500
              hover:text-gray-900 hover:bg-gray-700
              bg-gray-800
              w-8
              h-8
              p-2
            "
          >
            <svg viewBox="0 0 20 20" class="w-full h-full fill-current">
              <path
                d="M10.001,7.8C8.786,7.8,7.8,8.785,7.8,10s0.986,2.2,2.201,2.2S12.2,11.215,12.2,10S11.216,7.8,10.001,7.8z
 M3.001,7.8C1.786,7.8,0.8,8.785,0.8,10s0.986,2.2,2.201,2.2S5.2,11.214,5.2,10S4.216,7.8,3.001,7.8z M17.001,7.8
C15.786,7.8,14.8,8.785,14.8,10s0.986,2.2,2.201,2.2S19.2,11.215,19.2,10S18.216,7.8,17.001,7.8z"
              />
            </svg>
          </button>
          <button
            type="button"
            class="
              hidden
              group-hover:block
              flex flex-shrink-0
              focus:outline-none
              mx-2
              block
              rounded-full
              text-gray-500
              hover:text-gray-900 hover:bg-gray-700
              bg-gray-800
              w-8
              h-8
              p-2
            "
          >
            <svg viewBox="0 0 20 20" class="w-full h-full fill-current">
              <path
                d="M19,16.685c0,0-2.225-9.732-11-9.732V2.969L1,9.542l7,6.69v-4.357C12.763,11.874,16.516,12.296,19,16.685z"
              />
            </svg>
          </button>
          <button
            type="button"
            class="
              hidden
              group-hover:block
              flex flex-shrink-0
              focus:outline-none
              mx-2
              block
              rounded-full
              text-gray-500
              hover:text-gray-900 hover:bg-gray-700
              bg-gray-800
              w-8
              h-8
              p-2
            "
          >
            <svg viewBox="0 0 24 24" class="w-full h-full fill-current">
              <path
                d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
              />
            </svg>
          </button>
        </div>
      </div>
      <img
        :src="message.profile"
        alt="Profile Image"
        :class="['w-6 h-6 rounded-full cursor-pointer', message.isSender ? 'order-2' : 'order-1']"
        @click="showImagePopup = true"
      />
      <VueEasyLightbox
        :visible="showImagePopup"
        :imgs="message.profile"
        @hide="showImagePopup = false"
      />
    </div>
  </div>
</template>
