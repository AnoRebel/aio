<script>
import { ref } from "vue";
import VueEasyLightbox from "vue-easy-lightbox";

export default {
  name: "PrivateChatHeader",
  components: { VueEasyLightbox },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const showPopup = ref(false);
    return { showPopup };
  },
};
</script>

<template>
  <div class="flex sm:items-center justify-between py-1 shadow">
    <div class="flex items-center space-x-4">
      <img
        :src="user.image"
        alt=""
        class="w-10 sm:w-12 h-10 sm:h-12 rounded-full transition-all cursor-pointer"
        @click="showPopup = true"
      />
      <div class="flex flex-col leading-tight">
        <div class="text-xl mt-1 flex items-center">
          <span class="text-gray-700 mr-3">{{ user.name }}</span>
          <span class="text-green-500">
            <svg width="10" height="10">
              <circle cx="5" cy="5" r="5" fill="currentColor"></circle>
            </svg>
          </span>
        </div>
        <span class="text-base text-gray-600">{{ user.details }}</span>
      </div>
    </div>
    <VueEasyLightbox :visible="showPopup" :imgs="user.image" @hide="showPopup = false" />
    <div class="flex items-center space-x-2">
      <button
        type="button"
        class="
          inline-flex
          items-center
          justify-center
          rounded-full
          h-10
          w-10
          transition
          duration-500
          ease-in-out
          text-gray-500
          hover:bg-gray-300
          focus:outline-none
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </button>
      <button
        type="button"
        class="
          inline-flex
          items-center
          justify-center
          rounded-full
          h-10
          w-10
          transition
          duration-500
          ease-in-out
          text-gray-500
          hover:bg-gray-300
          focus:outline-none
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          ></path>
        </svg>
      </button>
      <button
        type="button"
        class="
          inline-flex
          items-center
          justify-center
          rounded-full
          h-10
          w-10
          transition
          duration-500
          ease-in-out
          text-gray-500
          hover:bg-gray-300
          focus:outline-none
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</template>
