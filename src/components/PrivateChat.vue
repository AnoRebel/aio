<script>
import { onMounted } from "vue";
import { InformationCircleIcon } from "@heroicons/vue/outline";

import { SingleMessage, EmojiPicker, PrivateChatHeader } from "@/components";
import { emitter } from "@/utils";
import { users, messages } from "@/seed";

export default {
  name: "PrivateChat",
  components: { EmojiPicker, InformationCircleIcon, SingleMessage, PrivateChatHeader },
  setup() {
    onMounted(() => {
      const el = document.getElementById("messages");
      el.scrollTop = el.scrollHeight;
    });
    const openEmoji = () => {
      emitter.emit("openEmoji", true);
    };
    const setEmoji = e => {
      console.log(e);
    };
    return { openEmoji, setEmoji, users, messages };
  },
};
</script>

<template>
  <!-- component -->
  <div class="flex-1 sm:px-6 justify-between flex flex-col h-screen">
    <PrivateChatHeader :user="users[0]" />
    <div
      id="messages"
      class="
        flex flex-col
        space-y-4
        p-3
        overflow-y-auto
        scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2
        scrolling-touch
      "
    >
      <div class="chat-message">
        <div class="flex items-end">
          <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
            <div class="flex items-center group">
              <span
                class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600"
                >Can be verified on any platform using docker</span
              >
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
            src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
            alt="My profile"
            class="w-6 h-6 rounded-full order-1"
          />
        </div>
      </div>
      <p class="p-4 text-center text-sm text-gray-500">FRI 3:04 PM</p>
      <template v-for="message in messages" :key="message.id">
        <SingleMessage :message="message" />
      </template>
      <!-- <div class="chat-message">
        <div class="flex items-end justify-end">
          <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
            <div class="flex flex-row-reverse items-center group">
              <span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white"
                >Your error message says permission denied, npm global installs must be given root
                privileges.</span
              >
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
            src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
            alt="My profile"
            class="w-6 h-6 rounded-full order-2"
          />
        </div>
      </div>
      <div class="chat-message">
        <div class="flex items-end justify-end">
          <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
            <div class="flex flex-row-reverse items-center group">
              <a
                class="relative block w-64 h-64 relative flex flex-shrink-0 max-w-xs lg:max-w-md"
                href="#"
              >
                <img
                  class="absolute shadow-md w-full h-full rounded-lg rounded-br-none object-cover"
                  src="https://unsplash.com/photos/8--kuxbxuKU/download?force=true&w=640"
                  alt="hiking"
                />
                <InformationCircleIcon
                  class="absolute top-2 right-2 h-6 w-6 text-white cursor-pointer"
                  @click="imgDetails"
                />
              </a>
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
            src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
            alt="My profile"
            class="w-6 h-6 rounded-full order-2"
          />
        </div>
      </div>
      <div class="chat-message">
        <div class="flex items-end">
          <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
            <div>
              <span class="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600"
                >Command was run with root privileges. I'm sure about that.</span
              >
            </div>
            <div>
              <span class="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600"
                >I've update the description so it's more obviously now</span
              >
            </div>
            <div>
              <span class="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600"
                >FYI https://askubuntu.com/a/700266/510172</span
              >
            </div>
            <div>
              <span
                class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600"
              >
                Check the line above (it ends with a # so, I'm running it as root )
                <pre># npm install -g @vue/devtools</pre>
              </span>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
            alt="My profile"
            class="w-6 h-6 rounded-full order-1"
          />
        </div>
      </div>
      <div class="chat-message">
        <div class="flex items-end justify-end">
          <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
            <div>
              <span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white"
                >Any updates on this issue? I'm getting the same error when trying to install
                devtools. Thanks</span
              >
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
            alt="My profile"
            class="w-6 h-6 rounded-full order-2"
          />
        </div>
      </div>
      <div class="chat-message">
        <div class="flex items-end">
          <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
            <div>
              <span
                class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600"
                >Thanks for your message David. I thought I'm alone with this issue. Please, 👍 the
                issue to support it :)</span
              >
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
            alt="My profile"
            class="w-6 h-6 rounded-full order-1"
          />
        </div>
      </div>
      <div class="chat-message">
        <div class="flex items-end justify-end">
          <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
            <div>
              <span class="px-4 py-2 rounded-lg inline-block bg-blue-600 text-white"
                >Are you using sudo?</span
              >
            </div>
            <div>
              <span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white"
                >Run this command sudo chown -R `whoami` /Users/{{ your_user_profile }}/.npm-global/
                then install the package globally without using sudo</span
              >
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
            alt="My profile"
            class="w-6 h-6 rounded-full order-2"
          />
        </div>
      </div>
      <div class="chat-message">
        <div class="flex items-end">
          <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
            <div>
              <span class="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600"
                >It seems like you are from Mac OS world. There is no /Users/ folder on linux
                😄</span
              >
            </div>
            <div>
              <span
                class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600"
                >I have no issue with any other packages installed with root permission
                globally.</span
              >
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
            alt="My profile"
            class="w-6 h-6 rounded-full order-1"
          />
        </div>
      </div>
      <div class="chat-message">
        <div class="flex items-end justify-end">
          <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
            <div>
              <span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white"
                >yes, I have a mac. I never had issues with root permission as well, but this helped
                me to solve the problem</span
              >
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
            alt="My profile"
            class="w-6 h-6 rounded-full order-2"
          />
        </div>
      </div>
      <div class="chat-message">
        <div class="flex items-end">
          <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
            <div>
              <span class="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600"
                >I get the same error on Arch Linux (also with sudo)</span
              >
            </div>
            <div>
              <span class="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600"
                >I also have this issue, Here is what I was doing until now: #1076</span
              >
            </div>
            <div>
              <span
                class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600"
                >even i am facing</span
              >
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
            alt="My profile"
            class="w-6 h-6 rounded-full order-1"
          />
        </div>
      </div> -->
    </div>
    <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <div class="relative flex">
        <span class="absolute inset-y-0 flex items-center">
          <button
            type="button"
            class="
              inline-flex
              items-center
              justify-center
              rounded-full
              h-12
              w-12
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
              class="h-6 w-6 text-gray-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              ></path>
            </svg>
          </button>
        </span>
        <input
          type="text"
          placeholder="Write Something"
          class="
            w-full
            focus:outline-none focus:placeholder-gray-400
            text-gray-600
            placeholder-gray-600
            pl-12
            bg-gray-200
            rounded-full
            py-3
          "
        />
        <div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
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
              class="h-6 w-6 text-gray-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
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
              class="h-6 w-6 text-gray-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            class="
              relative
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
            @click="openEmoji"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="h-6 w-6 text-gray-600"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <EmojiPicker @emoji-selected="setEmoji" />
          </button>
          <button
            type="button"
            class="
              inline-flex
              items-center
              justify-center
              rounded-full
              h-12
              w-12
              transition
              duration-500
              ease-in-out
              text-white
              bg-blue-500
              hover:bg-blue-400
              focus:outline-none
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-6 w-6 transform rotate-90"
            >
              <path
                d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scrollbar-w-2::-webkit-scrollbar {
  width: 0.25rem;
  height: 0.25rem;
}

.scrollbar-track-blue-lighter::-webkit-scrollbar-track {
  --bg-opacity: 1;
  background-color: #f7fafc;
  background-color: rgba(247, 250, 252, var(--bg-opacity));
}

.scrollbar-thumb-blue::-webkit-scrollbar-thumb {
  --bg-opacity: 1;
  background-color: #edf2f7;
  background-color: rgba(237, 242, 247, var(--bg-opacity));
}

.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
  border-radius: 0.25rem;
}
</style>
